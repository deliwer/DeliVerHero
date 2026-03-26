import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Upload, FileSpreadsheet, Play, Pause, CheckCircle2, XCircle,
  AlertCircle, Users, Send, TrendingUp, ArrowRight, Loader2,
  RefreshCw, Copy, Check, BarChart3, ChevronDown, ChevronUp,
  Mail, Phone, Briefcase, Link2, Download, Zap, Clock, Globe,
  Activity, Database, ChevronRight, CircleDot, Inbox
} from "lucide-react";
import * as XLSX from "xlsx";
import { SiWhatsapp } from "react-icons/si";

interface BrokerRow {
  name: string;
  email: string;
  phone?: string;
  license?: string;
}

interface CampaignEntry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  refCode: string;
  partnerLink: string;
  status: "pending" | "sent" | "failed" | "skipped";
  sentAt?: string;
  errorMessage?: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "idle" | "running" | "paused" | "completed";
  totalBrokers: number;
  sentCount: number;
  failedCount: number;
  createdAt: string;
  completedAt?: string;
}

interface AutomationStatus {
  isRunning: boolean;
  isDailyRunning: boolean;
  isFollowUpRunning: boolean;
  lastDailyRun?: string;
  lastFollowUpRun?: string;
  totalInMaster: number;
  newToday: number;
  sentTotal: number;
  followedUpTotal: number;
  convertedTotal: number;
  pendingFollowUp1: number;
  pendingFollowUp2: number;
  pendingFollowUp3: number;
  recentLogs: AutomationLog[];
}

interface AutomationLog {
  id: string;
  runType: string;
  status: string;
  brokersFound: number;
  newBrokers: number;
  emailsSent: number;
  followUpsSent: number;
  errors?: string;
  startedAt: string;
  completedAt?: string;
}

interface LocalFileStats {
  exists: boolean;
  totalBrokers: number;
  fileSizeKB: number;
  lastModified?: string;
  xlsExists: boolean;
  xlsSizeKB: number;
}

interface BrokerMasterEntry {
  id: string;
  email: string;
  name: string;
  phone?: string;
  license?: string;
  refCode?: string;
  partnerLink?: string;
  status: string;
  followUpCount: number;
  firstContactedAt?: string;
  lastContactedAt?: string;
  source: string;
  createdAt: string;
}

const COLUMN_ALIASES: Record<string, keyof BrokerRow> = {
  name: "name", fullname: "name", full_name: "name", broker_name: "name", "agent name": "name",
  email: "email", email_address: "email", emailaddress: "email", "e-mail": "email",
  phone: "phone", mobile: "phone", phonenumber: "phone", phone_number: "phone", whatsapp: "phone",
  license: "license", licence: "license", "license no": "license", rera: "license", rera_no: "license",
};

function normalizeKey(raw: string): keyof BrokerRow | null {
  const k = raw.toLowerCase().trim().replace(/\s+/g, "_");
  return COLUMN_ALIASES[k] || COLUMN_ALIASES[raw.toLowerCase().trim()] || null;
}

function parseWorkbook(buffer: ArrayBuffer): BrokerRow[] {
  const wb = XLSX.read(buffer, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const raw: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
  if (raw.length < 2) return [];

  const headers = (raw[0] as string[]).map((h) => h?.toString() || "");
  const fieldMap: Record<number, keyof BrokerRow> = {};
  headers.forEach((h, i) => {
    const field = normalizeKey(h);
    if (field) fieldMap[i] = field;
  });

  return raw.slice(1).map((row) => {
    const obj: any = {};
    Object.entries(fieldMap).forEach(([i, field]) => {
      obj[field] = row[+i]?.toString().trim() || "";
    });
    return obj as BrokerRow;
  }).filter((r) => r.email && r.email.includes("@"));
}

function formatRelative(dateStr?: string): string {
  if (!dateStr) return "Never";
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-slate-700 text-slate-300",
  sent: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  followed_up: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  converted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function RecruitPage() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [brokers, setBrokers] = useState<BrokerRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [brokerSearch, setBrokerSearch] = useState("");
  const [brokerPage, setBrokerPage] = useState(1);
  const BROKERS_PER_PAGE = 25;
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [entries, setEntries] = useState<CampaignEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [pastCampaigns, setPastCampaigns] = useState<Campaign[]>([]);
  const [showPast, setShowPast] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showMaster, setShowMaster] = useState(false);
  const [masterPage, setMasterPage] = useState(1);
  const hasAutoPreloaded = useRef(false);

  const filteredBrokers = brokers.filter((b) => {
    if (!brokerSearch.trim()) return true;
    const q = brokerSearch.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.phone?.toLowerCase().includes(q) ||
      b.license?.toLowerCase().includes(q)
    );
  });
  const brokerPageCount = Math.max(1, Math.ceil(filteredBrokers.length / BROKERS_PER_PAGE));
  const pagedBrokers = filteredBrokers.slice(
    (brokerPage - 1) * BROKERS_PER_PAGE,
    brokerPage * BROKERS_PER_PAGE
  );

  useEffect(() => { setBrokerPage(1); }, [brokerSearch]);
  useEffect(() => { setBrokerPage(1); setBrokerSearch(""); }, [brokers]);

  const { data: automationStatus, refetch: refetchStatus } = useQuery<AutomationStatus>({
    queryKey: ["/api/marketing/automation/status"],
    refetchInterval: 10000,
  });

  const { data: reraFileStats } = useQuery<LocalFileStats>({
    queryKey: ["/api/marketing/rera-file/stats"],
    refetchInterval: false,
  });

  const { data: masterData } = useQuery<{ brokers: BrokerMasterEntry[]; total: number }>({
    queryKey: ["/api/marketing/broker-master", masterPage],
    queryFn: () => fetch(`/api/marketing/broker-master?page=${masterPage}&limit=50`).then((r) => r.json()),
    enabled: showMaster,
  });

  const fetchMutation = useMutation({
    mutationFn: () => fetch("/api/marketing/broker-fetch", { method: "POST" }).then((r) => r.json()),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["/api/marketing/automation/status"] });
      qc.invalidateQueries({ queryKey: ["/api/marketing/broker-master"] });
      if (data.success) {
        const sourceLabel = data.source === 'local_file' ? 'RERA_Brokers.xls (local)' : 'RERA API';
        toast({
          title: `Import complete — ${sourceLabel}`,
          description: `${data.brokersFound.toLocaleString()} brokers in file · ${data.newBrokers.toLocaleString()} new added to master · ${data.alreadyInMaster?.toLocaleString() ?? 0} already tracked`,
        });
      } else {
        toast({
          title: "Import failed",
          description: data.errors || "Could not load broker list. Upload manually below.",
          variant: "destructive",
        });
      }
    },
    onError: () => toast({ title: "Import failed", variant: "destructive" }),
  });

  const followUpMutation = useMutation({
    mutationFn: () => fetch("/api/marketing/broker-followup/run", { method: "POST" }).then((r) => r.json()),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["/api/marketing/automation/status"] });
      toast({
        title: "Follow-up engine complete",
        description: `FU#1: ${data.fu1Sent} sent · FU#2: ${data.fu2Sent} sent · FU#3: ${data.fu3Sent} sent · Failed: ${data.failed}`,
      });
    },
    onError: () => toast({ title: "Follow-up run failed", variant: "destructive" }),
  });

  const dailyCampaignMutation = useMutation({
    mutationFn: () => fetch("/api/marketing/broker-daily/run", { method: "POST" }).then((r) => r.json()),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["/api/marketing/automation/status"] });
      if (data.started) {
        toast({ title: "Campaign launched!", description: "Sending up to 300 partner invites from partners@deliwer.com — check status in a few minutes." });
      } else {
        toast({ title: "Could not start", description: data.error, variant: "destructive" });
      }
    },
    onError: () => toast({ title: "Campaign launch failed", variant: "destructive" }),
  });

  const seedMutation = useMutation({
    mutationFn: () => fetch("/api/marketing/broker-master/seed", { method: "POST" }).then((r) => r.json()),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["/api/marketing/automation/status"] });
      qc.invalidateQueries({ queryKey: ["/api/marketing/broker-master"] });
      toast({ title: `Synced ${data.added} brokers from past campaigns into master` });
    },
  });

  const fetchCampaignStatus = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/marketing/broker-campaign/${id}`);
      const data = await res.json();
      setCampaign(data.campaign);
      setEntries(data.entries || []);
      return data.campaign;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!activeCampaignId || !polling) return;
    const interval = setInterval(async () => {
      const c = await fetchCampaignStatus(activeCampaignId);
      if (c && (c.status === "completed" || c.status === "paused")) {
        setPolling(false);
        qc.invalidateQueries({ queryKey: ["/api/marketing/automation/status"] });
        if (c.status === "completed") {
          toast({ title: "Campaign complete!", description: `Sent ${c.sentCount} of ${c.totalBrokers} emails.` });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [activeCampaignId, polling, fetchCampaignStatus, toast, qc]);

  const fetchPastCampaigns = async () => {
    try {
      const res = await fetch("/api/marketing/broker-campaigns");
      const data = await res.json();
      setPastCampaigns(Array.isArray(data) ? data : []);
    } catch {}
  };

  useEffect(() => { fetchPastCampaigns(); }, []);

  // Auto-preload: import RERA list as soon as the page loads and master is empty
  useEffect(() => {
    if (
      hasAutoPreloaded.current ||
      fetchMutation.isPending ||
      !reraFileStats?.exists ||
      automationStatus === undefined
    ) return;
    if (automationStatus.totalInMaster === 0) {
      hasAutoPreloaded.current = true;
      fetchMutation.mutate();
    }
  }, [automationStatus?.totalInMaster, reraFileStats?.exists]);

  function downloadTemplate() {
    const sampleData = [
      { Name: "Ahmed Al Mansoori", Email: "ahmed@example.com", Phone: "+971501234567", License: "RERA-12345" },
      { Name: "Sara Johnson", Email: "sara@brokers.ae", Phone: "+971509876543", License: "RERA-67890" },
      { Name: "Khalid Ibrahim", Email: "khalid@realestate.ae", Phone: "+971551234567", License: "" },
    ];
    const ws = XLSX.utils.json_to_sheet(sampleData);
    ws["!cols"] = [{ wch: 22 }, { wch: 30 }, { wch: 18 }, { wch: 14 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Brokers");
    XLSX.writeFile(wb, "deliwer_broker_list_template.xlsx");
  }

  async function downloadCampaign(id: string, name: string) {
    setExporting(true);
    try {
      const res = await fetch(`/api/marketing/broker-campaign/${id}/export`);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/[^a-z0-9]/gi, "_").substring(0, 40)}_brokers.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  }

  async function downloadLatest() {
    setExporting(true);
    try {
      const res = await fetch("/api/marketing/broker-campaigns/latest/export");
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const disp = res.headers.get("Content-Disposition") || "";
      const match = disp.match(/filename="(.+?)"/);
      a.download = match ? match[1] : "latest_brokers.xlsx";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Download started", description: "Latest broker list exported to Excel." });
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  }

  function readFile(file: File) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const buffer = ev.target?.result as ArrayBuffer;
      const rows = parseWorkbook(buffer);
      setBrokers(rows);
      if (rows.length === 0) {
        toast({ title: "No valid rows found", description: "Make sure the file has Name, Email columns.", variant: "destructive" });
      } else {
        toast({ title: `Loaded ${rows.length} brokers`, description: `${rows.filter((r) => r.email).length} with valid emails` });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function startCampaign() {
    if (!brokers.length) return;
    if (!campaignName.trim()) {
      toast({ title: "Name your campaign first", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/marketing/broker-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: campaignName.trim(), brokers }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to start");
      setActiveCampaignId(data.campaignId);
      setPolling(true);
      await fetchCampaignStatus(data.campaignId);
      setBrokers([]);
      setFileName("");
      setCampaignName("");
      fetchPastCampaigns();
      toast({ title: "Campaign started!", description: `Sending to ${data.total} brokers...` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function pauseCampaign() {
    if (!activeCampaignId) return;
    await fetch(`/api/marketing/broker-campaign/${activeCampaignId}/pause`, { method: "POST" });
    setPolling(false);
    await fetchCampaignStatus(activeCampaignId);
    fetchPastCampaigns();
  }

  async function resumeCampaign() {
    if (!activeCampaignId) return;
    await fetch(`/api/marketing/broker-campaign/${activeCampaignId}/resume`, { method: "POST" });
    setPolling(true);
    await fetchCampaignStatus(activeCampaignId);
  }

  function copyLink(partnerLink: string, refCode: string) {
    navigator.clipboard.writeText(partnerLink);
    setCopiedCode(refCode);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  const sentPct = campaign
    ? Math.round(((campaign.sentCount + campaign.failedCount) / Math.max(campaign.totalBrokers, 1)) * 100)
    : 0;

  const as = automationStatus;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 sticky top-[100px] z-10 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing">
              <span className="text-slate-400 hover:text-white text-sm cursor-pointer">← Marketing</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold text-sm">Broker Recruit Engine</span>
            {as?.isRunning && (
              <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full animate-pulse">
                <CircleDot className="w-2.5 h-2.5" /> Running
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={downloadLatest}
              disabled={exporting}
              variant="outline"
              size="sm"
              className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 h-8"
              data-testid="button-download-latest"
            >
              {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Download className="w-3.5 h-3.5 mr-1.5" />}
              Export
            </Button>
            <button
              onClick={() => { setShowPast(!showPast); if (!showPast) fetchPastCampaigns(); }}
              className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
              data-testid="button-toggle-past"
            >
              <BarChart3 className="w-4 h-4" /> History
            </button>
          </div>
        </div>
      </div>
      {/* Auto-preload banner */}
      {fetchMutation.isPending && (automationStatus?.totalInMaster ?? 0) === 0 && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/30">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <Loader2 className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
            <div>
              <span className="text-emerald-300 font-semibold text-sm">
                Preloading {reraFileStats?.totalBrokers?.toLocaleString() ?? "32,302"} RERA brokers into master database…
              </span>
              <span className="text-emerald-500 text-xs ml-2">This runs once automatically — do not close this tab.</span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* ── AUTOMATION ENGINE STATUS ─────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Automation Engine</h2>
            <button onClick={() => refetchStatus()} className="text-slate-600 hover:text-white ml-auto" data-testid="button-refresh-status">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {[
              { label: "In Master", value: as?.totalInMaster ?? "—", color: "text-white" },
              { label: "New Today", value: as?.newToday ?? "—", color: "text-emerald-400" },
              { label: "Emailed", value: as?.sentTotal ?? "—", color: "text-blue-400" },
              { label: "Followed Up", value: as?.followedUpTotal ?? "—", color: "text-yellow-400" },
              { label: "Converted", value: as?.convertedTotal ?? "—", color: "text-emerald-400" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center" data-testid={`stat-${s.label.toLowerCase().replace(/ /g, "-")}`}>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Follow-up queue */}
          {((as?.pendingFollowUp1 ?? 0) > 0 || (as?.pendingFollowUp2 ?? 0) > 0 || (as?.pendingFollowUp3 ?? 0) > 0) && (
            <div className="flex flex-wrap gap-3 mb-4">
              {(as?.pendingFollowUp1 ?? 0) > 0 && (
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2 text-sm text-yellow-400">
                  <Clock className="w-3.5 h-3.5" />
                  {as?.pendingFollowUp1} brokers ready for Follow-up #1 (Day 2)
                </div>
              )}
              {(as?.pendingFollowUp2 ?? 0) > 0 && (
                <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 text-sm text-orange-400">
                  <Clock className="w-3.5 h-3.5" />
                  {as?.pendingFollowUp2} brokers ready for Follow-up #2 (Day 5)
                </div>
              )}
              {(as?.pendingFollowUp3 ?? 0) > 0 && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-sm text-red-400">
                  <Clock className="w-3.5 h-3.5" />
                  {as?.pendingFollowUp3} brokers ready for Follow-up #3 (Day 10)
                </div>
              )}
            </div>
          )}

          {/* Primary Campaign Launch */}
          <Card className="bg-emerald-950/40 border-emerald-500/30">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm text-emerald-300">Send Partner Invites — Daily Batch</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-[10px]">partners@deliwer.com</Badge>
                </div>
                <p className="text-xs text-slate-400">
                  Sends up to 300 personalised partner invite emails to new RERA brokers. Safe to run daily — never re-sends to the same broker.
                  {(as?.sentTotal ?? 0) > 0 && <span className="text-emerald-400 font-semibold"> · {as?.sentTotal.toLocaleString()} sent so far</span>}
                </p>
              </div>
              <Button
                onClick={() => dailyCampaignMutation.mutate()}
                disabled={dailyCampaignMutation.isPending || as?.isRunning}
                className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-9 px-5 text-sm"
                data-testid="button-run-daily-campaign"
              >
                {dailyCampaignMutation.isPending || as?.isRunning ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> Running…</>
                ) : (
                  <><Send className="w-3.5 h-3.5 mr-1.5" /> Launch Campaign</>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Control buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* RERA Auto-Fetch */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-sm text-[#ffffff]">RERA Broker List</span>
                  {reraFileStats?.exists && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-[10px] py-0 px-1.5 ml-auto">LOCAL FILE</Badge>
                  )}
                </div>
                {reraFileStats?.exists ? (
                  <div className="bg-slate-800 rounded p-2 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> RERA_Brokers.xls — Saved Permanently
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="text-white font-semibold">{reraFileStats.totalBrokers.toLocaleString()}</span> licensed brokers · {Math.round(reraFileStats.fileSizeKB / 1024 * 10) / 10} MB
                    </div>
                    <a
                      href="/api/marketing/rera-file/download"
                      className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-emerald-400 transition-colors mt-0.5"
                      data-testid="link-download-rera"
                    >
                      <Download className="w-2.5 h-2.5" /> Download RERA_Brokers.xls
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 mb-3">Load saved RERA broker list into master database.</p>
                )}
                <div className="text-xs text-slate-600 mb-3">
                  Last imported: {as?.lastDailyRun ? formatRelative(as.lastDailyRun) : "Never"}
                </div>
                <Button
                  onClick={() => fetchMutation.mutate()}
                  disabled={fetchMutation.isPending}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-8 text-xs font-semibold"
                  data-testid="button-rera-fetch"
                >
                  {fetchMutation.isPending ? (
                    <><Loader2 className="w-3 h-3 animate-spin mr-1.5" /> Importing…</>
                  ) : (
                    <><Download className="w-3 h-3 mr-1.5" /> Import RERA Brokers ({reraFileStats?.totalBrokers ? reraFileStats.totalBrokers.toLocaleString() : "…"})</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Follow-up Engine */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="font-semibold text-sm text-[#ffffff]">Follow-up Engine</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Send Day-2 and Day-5 follow-ups to unresponsive brokers automatically.</p>
                <div className="text-xs text-slate-600 mb-3">
                  Last run: {as?.lastFollowUpRun ? formatRelative(as.lastFollowUpRun) : "Never"}
                </div>
                <Button
                  onClick={() => followUpMutation.mutate()}
                  disabled={followUpMutation.isPending}
                  variant="outline"
                  className="w-full border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 h-8 text-xs font-semibold"
                  data-testid="button-run-followup"
                >
                  {followUpMutation.isPending ? (
                    <><Loader2 className="w-3 h-3 animate-spin mr-1.5" /> Running…</>
                  ) : (
                    <><Zap className="w-3 h-3 mr-1.5" /> Run Follow-ups Now</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Master DB */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-sm text-[#ffffff]">Broker Master DB</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">View all brokers tracked across campaigns. Sync past campaigns into master.</p>
                <div className="text-xs text-slate-600 mb-3">
                  {as?.totalInMaster ?? 0} total brokers tracked
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowMaster(!showMaster)}
                    variant="outline"
                    className="flex-1 border-blue-500/40 text-blue-400 hover:bg-blue-500/10 h-8 text-xs"
                    data-testid="button-toggle-master"
                  >
                    <Inbox className="w-3 h-3 mr-1.5" /> {showMaster ? "Hide" : "View"}
                  </Button>
                  <Button
                    onClick={() => seedMutation.mutate()}
                    disabled={seedMutation.isPending}
                    variant="outline"
                    className="border-slate-700 text-slate-400 hover:text-white h-8 text-xs px-2"
                    title="Sync past campaigns into master"
                    data-testid="button-seed-master"
                  >
                    {seedMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cron schedule info */}
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-600">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Daily: Auto-fetch + email new brokers</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Every 6h: Follow-up engine runs</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Max 300 emails/day limit enforced</span>
          </div>
        </div>

        {/* ── BROKER MASTER TABLE ──────────────────────────────────── */}
        {showMaster && masterData && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-[#fcfdff]">
                  <Database className="w-5 h-5 text-blue-400" />
                  Broker Master — {masterData.total} total
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    disabled={masterPage <= 1}
                    onClick={() => setMasterPage((p) => p - 1)}
                    className="text-slate-400 hover:text-white disabled:opacity-30 text-sm"
                    data-testid="button-master-prev"
                  >← Prev</button>
                  <span className="text-xs text-slate-500">Page {masterPage}</span>
                  <button
                    disabled={masterPage * 50 >= masterData.total}
                    onClick={() => setMasterPage((p) => p + 1)}
                    className="text-slate-400 hover:text-white disabled:opacity-30 text-sm"
                    data-testid="button-master-next"
                  >Next →</button>
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800/60">
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">Name</th>
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">Email</th>
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><SiWhatsapp className="w-3 h-3 text-green-400" /> Phone</span>
                      </th>
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">Status</th>
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">Follow-ups</th>
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">Last Contact</th>
                      <th className="px-4 py-2 text-left text-slate-400 font-medium">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterData.brokers.map((b) => (
                      <tr key={b.id} className="border-t border-slate-800 hover:bg-slate-800/30" data-testid={`master-row-${b.id}`}>
                        <td className="px-4 py-2 text-white font-medium">{b.name}</td>
                        <td className="px-4 py-2 text-emerald-400 text-xs">{b.email}</td>
                        <td className="px-4 py-2">
                          {b.phone ? (
                            <a
                              href={(() => {
                                const digits = b.phone!.replace(/[^0-9]/g, '');
                                // Normalize to E.164 UAE format
                                const n = digits
                                  .replace(/^00971/, '971')  // 00971xx → 971xx
                                  .replace(/^9710(\d)/, '971$1') // 9710[5/4/2]xx → 971[5/4/2]xx
                                  .replace(/^0(\d)/, '971$1'); // 05x / 04x → 971-5x / 971-4x
                                return `https://wa.me/${n}`;
                              })()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors text-xs group"
                              data-testid={`whatsapp-${b.id}`}
                              title={`WhatsApp ${b.name}`}
                            >
                              <SiWhatsapp className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                              {b.phone}
                            </a>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <Badge className={`text-xs ${STATUS_COLORS[b.status] || "bg-slate-700 text-slate-400"}`}>
                            {b.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-slate-400 text-center">{b.followUpCount}</td>
                        <td className="px-4 py-2 text-slate-500 text-xs">{formatRelative(b.lastContactedAt)}</td>
                        <td className="px-4 py-2">
                          <span className={`text-xs ${b.source === 'rera_auto' ? 'text-blue-400' : 'text-slate-500'}`}>
                            {b.source === 'rera_auto' ? '🌐 RERA' : '📁 Manual'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {masterData.brokers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                          No brokers in master yet. Upload a list below or fetch from RERA.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── RECENT AUTOMATION LOGS ──────────────────────────────── */}
        {as?.recentLogs && as.recentLogs.length > 0 && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Automation Log (recent 10)
              </h3>
              <div className="space-y-1.5">
                {as.recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 text-xs bg-slate-800/40 rounded-lg px-3 py-2" data-testid={`log-${log.id}`}>
                    <span className={`shrink-0 font-mono px-1.5 py-0.5 rounded text-xs ${
                      log.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      log.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>{log.status}</span>
                    <span className="text-slate-400">{log.runType.replace(/_/g, " ")}</span>
                    <span className="text-slate-600 ml-auto">{formatRelative(log.startedAt)}</span>
                    {log.newBrokers > 0 && <span className="text-emerald-400">+{log.newBrokers} new</span>}
                    {log.emailsSent > 0 && <span className="text-blue-400">{log.emailsSent} sent</span>}
                    {log.followUpsSent > 0 && <span className="text-yellow-400">{log.followUpsSent} FU</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── DIVIDER ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs text-slate-600 uppercase tracking-widest">Manual Campaign</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Hero */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Upload & Launch a Campaign</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Upload a broker list → System generates personalised partner links → Emails sent one-by-one with DeliWer's referral template.
          </p>
        </div>

        {/* Step 1 — Upload */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">1</div>
              <h2 className="text-lg font-semibold">Upload Broker List</h2>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-10 text-center cursor-pointer transition-all group"
              data-testid="upload-broker-file"
            >
              <FileSpreadsheet className="w-10 h-10 text-slate-600 group-hover:text-emerald-500 mx-auto mb-3 transition-colors" />
              {fileName ? (
                <div>
                  <p className="text-emerald-400 font-semibold">{fileName}</p>
                  <p className="text-slate-400 text-sm mt-1">{brokers.length} valid brokers loaded</p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-300 font-medium">Drop your .xlsx or .csv file here</p>
                  <p className="text-slate-500 text-sm mt-1">Expected columns: <span className="text-slate-400">Name · Email · Phone · License</span></p>
                  <button
                    onClick={(e) => { e.stopPropagation(); downloadTemplate(); }}
                    className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mx-auto"
                    data-testid="button-download-template"
                  >
                    <Download className="w-3 h-3" /> Download sample template
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
                data-testid="input-broker-file"
              />
            </div>

            {/* Preview */}
            {brokers.length > 0 && (
              <div>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-3"
                  data-testid="button-toggle-preview"
                >
                  {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showPreview ? "Hide" : "Show"} preview ({brokers.length.toLocaleString()} brokers)
                </button>
                {showPreview && (
                  <div className="space-y-3">
                    {/* Search */}
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
                      </span>
                      <input
                        type="text"
                        value={brokerSearch}
                        onChange={(e) => setBrokerSearch(e.target.value)}
                        placeholder="Search by name, email, phone or license…"
                        className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
                        data-testid="input-broker-search"
                      />
                      {brokerSearch && (
                        <button
                          onClick={() => setBrokerSearch("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                          data-testid="button-clear-broker-search"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>

                    {/* Results count */}
                    <p className="text-xs text-slate-500">
                      {brokerSearch
                        ? `${filteredBrokers.length.toLocaleString()} match${filteredBrokers.length !== 1 ? "es" : ""} · page ${brokerPage} of ${brokerPageCount}`
                        : `${brokers.length.toLocaleString()} brokers · page ${brokerPage} of ${brokerPageCount}`}
                    </p>

                    <div className="rounded-lg border border-slate-800 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-800/60">
                            <th className="px-4 py-2 text-left text-slate-400 font-medium">#</th>
                            <th className="px-4 py-2 text-left text-slate-400 font-medium"><span className="flex items-center gap-1"><Users className="w-3 h-3" /> Name</span></th>
                            <th className="px-4 py-2 text-left text-slate-400 font-medium"><span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email</span></th>
                            <th className="px-4 py-2 text-left text-slate-400 font-medium"><span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</span></th>
                            <th className="px-4 py-2 text-left text-slate-400 font-medium"><span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> License</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pagedBrokers.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-4 py-6 text-center text-slate-500 text-xs">
                                No brokers match your search.
                              </td>
                            </tr>
                          ) : (
                            pagedBrokers.map((b, i) => {
                              const globalIdx = (brokerPage - 1) * BROKERS_PER_PAGE + i + 1;
                              return (
                                <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/30">
                                  <td className="px-4 py-2 text-slate-500">{globalIdx}</td>
                                  <td className="px-4 py-2 text-white">{b.name || <span className="text-slate-600 italic">—</span>}</td>
                                  <td className="px-4 py-2 text-emerald-400">{b.email}</td>
                                  <td className="px-4 py-2 text-slate-400">{b.phone || "—"}</td>
                                  <td className="px-4 py-2 text-slate-400">{b.license || "—"}</td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {brokerPageCount > 1 && (
                      <div className="flex items-center justify-between pt-1">
                        <button
                          disabled={brokerPage <= 1}
                          onClick={() => setBrokerPage((p) => p - 1)}
                          className="text-sm text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1"
                          data-testid="button-broker-prev"
                        >
                          ← Prev
                        </button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(brokerPageCount, 7) }, (_, i) => {
                            let page: number;
                            if (brokerPageCount <= 7) {
                              page = i + 1;
                            } else if (brokerPage <= 4) {
                              page = i + 1;
                            } else if (brokerPage >= brokerPageCount - 3) {
                              page = brokerPageCount - 6 + i;
                            } else {
                              page = brokerPage - 3 + i;
                            }
                            return (
                              <button
                                key={page}
                                onClick={() => setBrokerPage(page)}
                                className={`w-7 h-7 text-xs rounded ${page === brokerPage ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                                data-testid={`button-broker-page-${page}`}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          disabled={brokerPage >= brokerPageCount}
                          onClick={() => setBrokerPage((p) => p + 1)}
                          className="text-sm text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1"
                          data-testid="button-broker-next"
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2 — Name & Launch */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">2</div>
              <h2 className="text-lg font-semibold text-[#ffffff]">Name & Launch Campaign</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="text-sm text-slate-400 mb-1.5 block">Campaign name</label>
                <Input
                  placeholder="e.g. Dubai Broker Blitz – March 2026"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
                  data-testid="input-campaign-name"
                />
              </div>
              <Button
                onClick={startCampaign}
                disabled={loading || brokers.length === 0}
                className="bg-emerald-500 hover:bg-emerald-600 text-white h-10 font-semibold"
                data-testid="button-start-campaign"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {loading ? "Starting…" : `Start Campaign (${brokers.length})`}
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Duplicate emails removed automatically</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> 1.5s delay between sends (anti-spam)</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Max 300 emails/day limit</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Campaign Progress */}
        {campaign && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{campaign.name}</h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {new Date(campaign.createdAt).toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      campaign.status === "running"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30 animate-pulse"
                        : campaign.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : campaign.status === "paused"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                        : "bg-slate-700 text-slate-400"
                    }
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                  <button
                    onClick={() => downloadCampaign(campaign.id, campaign.name)}
                    disabled={exporting}
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                    title="Download as Excel"
                    data-testid="button-download-active-campaign"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => fetchCampaignStatus(campaign.id)}
                    className="text-slate-500 hover:text-white"
                    data-testid="button-refresh-campaign"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    {campaign.status === "running"
                      ? `Sending email ${campaign.sentCount + campaign.failedCount + 1} of ${campaign.totalBrokers}…`
                      : campaign.status === "completed"
                      ? "Campaign complete"
                      : campaign.status === "paused"
                      ? "Paused"
                      : "Queued"}
                  </span>
                  <span className="text-slate-400">{sentPct}%</span>
                </div>
                <Progress value={sentPct} className="h-2 bg-slate-800" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{campaign.sentCount}</div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1"><Send className="w-3 h-3" /> Sent</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-red-400">{campaign.failedCount}</div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1"><XCircle className="w-3 h-3" /> Failed</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-slate-300">{campaign.totalBrokers - campaign.sentCount - campaign.failedCount}</div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" /> Pending</div>
                </div>
              </div>

              {(campaign.status === "running" || campaign.status === "paused") && (
                <div className="flex gap-3">
                  {campaign.status === "running" ? (
                    <Button
                      onClick={pauseCampaign}
                      variant="outline"
                      className="border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
                      data-testid="button-pause-campaign"
                    >
                      <Pause className="w-4 h-4 mr-2" /> Pause
                    </Button>
                  ) : (
                    <Button
                      onClick={resumeCampaign}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      data-testid="button-resume-campaign"
                    >
                      <Play className="w-4 h-4 mr-2" /> Resume
                    </Button>
                  )}
                </div>
              )}

              {entries.length > 0 && (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  <p className="text-sm text-slate-400 font-medium">Delivery Log</p>
                  {entries.filter((e) => e.status !== "pending").map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between bg-slate-800/40 rounded-lg px-3 py-2 text-sm"
                      data-testid={`entry-${e.refCode}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {e.status === "sent" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : e.status === "failed" ? (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate">{e.name}</p>
                          <p className="text-slate-500 text-xs truncate">{e.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-500 font-mono">{e.refCode}</span>
                        <button
                          onClick={() => copyLink(e.partnerLink, e.refCode)}
                          className="text-slate-600 hover:text-emerald-400 transition-colors"
                          data-testid={`button-copy-${e.refCode}`}
                        >
                          {copiedCode === e.refCode ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                  {entries.filter((e) => e.status === "pending").length > 0 && (
                    <div className="text-center py-2 text-xs text-slate-600">
                      {entries.filter((e) => e.status === "pending").length} pending in queue…
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Past Campaigns */}
        {showPast && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Campaign History
                </h2>
                <button onClick={fetchPastCampaigns} className="text-slate-500 hover:text-white" data-testid="button-refresh-history">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              {pastCampaigns.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">No campaigns yet.</p>
              ) : (
                <div className="space-y-3">
                  {pastCampaigns.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-800 transition-colors"
                      onClick={() => { setActiveCampaignId(c.id); fetchCampaignStatus(c.id); }}
                      data-testid={`campaign-history-${c.id}`}
                    >
                      <div>
                        <p className="text-white font-medium">{c.name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {new Date(c.createdAt).toLocaleDateString("en-AE")} · {c.totalBrokers} brokers
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-emerald-400 font-semibold">{c.sentCount} sent</span>
                        {c.failedCount > 0 && <span className="text-red-400">{c.failedCount} failed</span>}
                        <Badge
                          className={
                            c.status === "completed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : c.status === "running"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {c.status}
                        </Badge>
                        <button
                          onClick={(e) => { e.stopPropagation(); downloadCampaign(c.id, c.name); }}
                          className="text-slate-500 hover:text-emerald-400 transition-colors"
                          title="Download as Excel"
                          data-testid={`button-download-campaign-${c.id}`}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Info strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            { icon: Link2, title: "Personalised Links", desc: "Every broker gets a unique /broker-partner?ref=... link automatically." },
            { icon: Send, title: "1 Email at a Time", desc: "1.5s delay between sends keeps deliverability high and avoids spam filters." },
            { icon: Zap, title: "Autonomous Loop", desc: "Fetch → Email → Follow-up → Repeat. Your network grows even when you're not working." },
          ].map((item) => (
            <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3">
              <item.icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final system message */}
        <div className="text-center py-4">
          <p className="text-slate-600 text-sm italic">"Your network is growing — even when you're not working."</p>
        </div>

      </div>
    </div>
  );
}
