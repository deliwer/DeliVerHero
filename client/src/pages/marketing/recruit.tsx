import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Upload, FileSpreadsheet, Play, Pause, CheckCircle2, XCircle,
  AlertCircle, Users, Send, TrendingUp, ArrowRight, Loader2,
  RefreshCw, Copy, Check, BarChart3, ChevronDown, ChevronUp,
  Mail, Phone, Briefcase, Link2, Download
} from "lucide-react";
import * as XLSX from "xlsx";

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

export default function RecruitPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [brokers, setBrokers] = useState<BrokerRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [entries, setEntries] = useState<CampaignEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [pastCampaigns, setPastCampaigns] = useState<Campaign[]>([]);
  const [showPast, setShowPast] = useState(false);
  const [exporting, setExporting] = useState(false);

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
        if (c.status === "completed") {
          toast({ title: "Campaign complete!", description: `Sent ${c.sentCount} of ${c.totalBrokers} emails.` });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [activeCampaignId, polling, fetchCampaignStatus, toast]);

  const fetchPastCampaigns = async () => {
    try {
      const res = await fetch("/api/marketing/broker-campaigns");
      const data = await res.json();
      setPastCampaigns(Array.isArray(data) ? data : []);
    } catch {}
  };

  useEffect(() => {
    fetchPastCampaigns();
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing">
              <span className="text-slate-400 hover:text-white text-sm cursor-pointer">← Marketing</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold text-sm">Broker Recruit Engine</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={downloadLatest}
              disabled={exporting}
              variant="outline"
              size="sm"
              className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 h-8"
              data-testid="button-download-latest"
            >
              {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Download className="w-3.5 h-3.5 mr-1.5" />}
              Download Latest
            </Button>
            <button
              onClick={() => { setShowPast(!showPast); if (!showPast) fetchPastCampaigns(); }}
              className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
              data-testid="button-toggle-past"
            >
              <BarChart3 className="w-4 h-4" /> Past Campaigns
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Hero */}
        <div className="text-center space-y-3">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Partner Recruitment Engine</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Activate the network.</h1>
          <p className="text-slate-400 text-lg">Let partners drive growth.</p>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
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
                  {showPreview ? "Hide" : "Show"} preview ({Math.min(brokers.length, 10)} of {brokers.length} rows)
                </button>
                {showPreview && (
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
                        {brokers.slice(0, 10).map((b, i) => (
                          <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/30">
                            <td className="px-4 py-2 text-slate-500">{i + 1}</td>
                            <td className="px-4 py-2 text-white">{b.name || <span className="text-slate-600 italic">—</span>}</td>
                            <td className="px-4 py-2 text-emerald-400">{b.email}</td>
                            <td className="px-4 py-2 text-slate-400">{b.phone || "—"}</td>
                            <td className="px-4 py-2 text-slate-400">{b.license || "—"}</td>
                          </tr>
                        ))}
                        {brokers.length > 10 && (
                          <tr className="border-t border-slate-800 bg-slate-800/20">
                            <td colSpan={5} className="px-4 py-2 text-center text-slate-500 text-xs">
                              + {brokers.length - 10} more brokers not shown
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
              <h2 className="text-lg font-semibold">Name & Launch Campaign</h2>
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

              {/* Progress bar */}
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

              {/* Stats row */}
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

              {/* Pause / Resume */}
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

              {/* Entry list (sent/failed) */}
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
            { icon: BarChart3, title: "Full Tracking", desc: "Every send logged — review history, pause, or resume any campaign." },
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

      </div>
    </div>
  );
}
