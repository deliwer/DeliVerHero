import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Users, Search, RefreshCw, Zap, Trash2, Play, Pause,
  RotateCcw, ChevronLeft, ChevronRight, Building2, Mail,
  Phone, BadgeCheck, X, BarChart2, Send, Clock, CheckCircle2,
  AlertCircle, Download, TrendingUp, Square, CheckSquare,
  MinusSquare, Tag, ShieldOff,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Broker {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  license: string | null;
  status: string;
  source: string;
  followUpCount: number;
  createdAt: string;
}

interface BrokerMasterResponse {
  brokers: Broker[];
  total: number;
  page: number;
  limit: number;
  statusCounts: { status: string; count: number }[];
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  totalBrokers: number;
  sentCount: number;
  failedCount: number;
  createdAt: string;
  completedAt: string | null;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; badge: string }> = {
  new:          { label: "New",         badge: "bg-blue-500/15 border-blue-500/30 text-blue-300" },
  sent:         { label: "Sent",        badge: "bg-amber-500/15 border-amber-500/30 text-amber-300" },
  followed_up:  { label: "Followed Up", badge: "bg-purple-500/15 border-purple-500/30 text-purple-300" },
  converted:    { label: "Converted",   badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" },
  unsubscribed: { label: "Unsub'd",     badge: "bg-slate-700/50 border-white/10 text-gray-500" },
};

const BULK_STATUSES = [
  { value: "new",          label: "New",          color: "text-blue-300" },
  { value: "sent",         label: "Sent",         color: "text-amber-300" },
  { value: "followed_up",  label: "Followed Up",  color: "text-purple-300" },
  { value: "converted",    label: "Converted",    color: "text-emerald-300" },
  { value: "unsubscribed", label: "Unsubscribed", color: "text-gray-500" },
];

const CAMPAIGN_STATUS_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  idle:      { label: "Idle",    icon: Clock,        color: "text-gray-400" },
  running:   { label: "Running", icon: Play,         color: "text-emerald-400" },
  paused:    { label: "Paused",  icon: Pause,        color: "text-amber-400" },
  completed: { label: "Done",    icon: CheckCircle2, color: "text-emerald-300" },
  failed:    { label: "Failed",  icon: AlertCircle,  color: "text-red-400" },
};

const ADMIN_SECRET = "deliwer-admin-2026";
const LIMIT = 50;

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminBrokerMasterPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Auth
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("bm_auth") === ADMIN_SECRET);
  const [pwInput, setPwInput] = useState("");

  // Filters & pagination
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Selection
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatusPicker, setBulkStatusPicker] = useState(false);
  const [bulkStatusTarget, setBulkStatusTarget] = useState("unsubscribed");

  // Campaign modal
  const [showCampaign, setShowCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignTarget, setCampaignTarget] = useState<"new" | "all" | "followed_up" | "selected">("new");
  const [launching, setLaunching] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // Clear selection on page/filter change
  useEffect(() => { setSelected(new Set()); }, [page, statusFilter, debouncedSearch]);

  // ── Queries ──────────────────────────────────────────────────────────────────

  const brokerQuery = useQuery<BrokerMasterResponse>({
    queryKey: ["/api/marketing/broker-master", page, LIMIT, debouncedSearch, statusFilter],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
      });
      return fetch(`/api/marketing/broker-master?${params}`).then(r => r.json());
    },
    enabled: authed,
    refetchInterval: 30000,
  });

  const campaignsQuery = useQuery<Campaign[]>({
    queryKey: ["/api/marketing/broker-campaigns"],
    queryFn: () => fetch("/api/marketing/broker-campaigns").then(r => r.json()),
    enabled: authed,
    refetchInterval: 15000,
  });

  // ── Mutations ────────────────────────────────────────────────────────────────

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/marketing/broker-master/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing/broker-master"] });
      toast({ title: "Broker removed" });
    },
  });

  const bulkStatusMutation = useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: string }) =>
      apiRequest("PATCH", "/api/marketing/broker-master/bulk-status", { ids, status }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing/broker-master"] });
      setSelected(new Set());
      setBulkStatusPicker(false);
      toast({ title: `Updated ${data.updated} broker${data.updated !== 1 ? "s" : ""}`, description: `Status set to "${BULK_STATUSES.find(s => s.value === bulkStatusTarget)?.label}"` });
    },
    onError: (e: any) => toast({ title: "Update failed", description: e.message, variant: "destructive" }),
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => apiRequest("PATCH", "/api/marketing/broker-master/bulk-delete", { ids }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing/broker-master"] });
      setSelected(new Set());
      toast({ title: `Removed ${data.deleted} broker${data.deleted !== 1 ? "s" : ""}` });
    },
    onError: (e: any) => toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });

  const campaignControlMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: string }) =>
      apiRequest("POST", `/api/marketing/broker-campaign/${id}/${action}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/marketing/broker-campaigns"] }),
  });

  const triggerDailyMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/marketing/broker-daily/run"),
    onSuccess: () => toast({ title: "Daily cycle started", description: "Up to 300 emails will be sent." }),
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  // ── Selection helpers ─────────────────────────────────────────────────────

  const brokers = brokerQuery.data?.brokers ?? [];
  const pageIds = brokers.map(b => b.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const somePageSelected = pageIds.some(id => selected.has(id)) && !allPageSelected;

  function toggleAll() {
    if (allPageSelected) {
      setSelected(prev => { const n = new Set(prev); pageIds.forEach(id => n.delete(id)); return n; });
    } else {
      setSelected(prev => { const n = new Set(prev); pageIds.forEach(id => n.add(id)); return n; });
    }
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  // ── Launch campaign ───────────────────────────────────────────────────────

  async function launchCampaign() {
    if (!campaignName.trim()) {
      toast({ title: "Enter a campaign name", variant: "destructive" });
      return;
    }
    setLaunching(true);
    try {
      let targetBrokers: Pick<Broker, "name" | "email" | "phone" | "license">[] = [];

      if (campaignTarget === "selected") {
        // Use currently selected brokers from current page view
        targetBrokers = brokers
          .filter(b => selected.has(b.id))
          .map(b => ({ name: b.name, email: b.email, phone: b.phone, license: b.license }));
      } else {
        // Fetch all matching brokers (up to 5000)
        const params = new URLSearchParams({ page: "1", limit: "5000" });
        if (campaignTarget !== "all") params.set("status", campaignTarget);
        const data: BrokerMasterResponse = await fetch(`/api/marketing/broker-master?${params}`).then(r => r.json());
        targetBrokers = data.brokers.map(b => ({ name: b.name, email: b.email, phone: b.phone, license: b.license }));
      }

      if (!targetBrokers.length) {
        toast({ title: "No brokers in this selection", variant: "destructive" });
        return;
      }

      const result = await apiRequest("POST", "/api/marketing/broker-campaign", {
        name: campaignName.trim(),
        brokers: targetBrokers,
      }) as any;

      toast({ title: "Campaign launched!", description: `${result.total} brokers queued.` });
      setCampaignName("");
      setShowCampaign(false);
      queryClient.invalidateQueries({ queryKey: ["/api/marketing/broker-campaigns"] });
    } catch (e: any) {
      toast({ title: "Launch failed", description: e.message, variant: "destructive" });
    } finally {
      setLaunching(false);
    }
  }

  // ── Auth gate ─────────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 bg-slate-900 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-white font-black uppercase tracking-widest text-sm">Admin Access</h1>
          </div>
          <p className="text-gray-500 text-xs">Enter admin secret to access the broker master database.</p>
          <Input
            type="password"
            placeholder="Admin secret"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && pwInput === ADMIN_SECRET) {
                sessionStorage.setItem("bm_auth", ADMIN_SECRET);
                setAuthed(true);
              }
            }}
            className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 h-11 rounded-xl"
            data-testid="input-admin-password"
          />
          <Button
            data-testid="button-admin-login"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-11"
            onClick={() => {
              if (pwInput === ADMIN_SECRET) {
                sessionStorage.setItem("bm_auth", ADMIN_SECRET);
                setAuthed(true);
              } else {
                toast({ title: "Incorrect secret", variant: "destructive" });
              }
            }}
          >
            Enter
          </Button>
        </div>
      </div>
    );
  }

  // ── Derived data ──────────────────────────────────────────────────────────

  const statusCounts: Record<string, number> = {};
  (brokerQuery.data?.statusCounts || []).forEach(({ status, count }) => {
    statusCounts[status] = Number(count);
  });
  const total = brokerQuery.data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);
  const campaigns = campaignsQuery.data ?? [];
  const selectedArr = Array.from(selected);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── Header ── */}
      <div className="border-b border-white/8 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-widest text-white">Broker Master DB</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">DeliWer Admin · RERA Recruitment</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              data-testid="button-trigger-daily"
              size="sm"
              variant="outline"
              className="border-white/10 text-gray-400 hover:bg-white/5 font-black rounded-xl h-9 text-xs"
              onClick={() => triggerDailyMutation.mutate()}
              disabled={triggerDailyMutation.isPending}
            >
              <Play className="w-3.5 h-3.5 mr-1.5" />
              {triggerDailyMutation.isPending ? "Starting…" : "Run Daily Emails"}
            </Button>
            <Button
              data-testid="button-open-campaign"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-9 text-xs shadow-lg shadow-emerald-900/30"
              onClick={() => { setCampaignTarget(selected.size > 0 ? "selected" : "new"); setShowCampaign(true); }}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" /> Launch Campaign
            </Button>
            <button
              onClick={() => { sessionStorage.removeItem("bm_auth"); setAuthed(false); }}
              className="text-gray-600 hover:text-white transition-colors"
              title="Sign out"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total",       value: Object.values(statusCounts).reduce((a, b) => a + b, 0) || 36151, icon: Users,        color: "text-white" },
            { label: "New",         value: statusCounts["new"] ?? 0,         icon: TrendingUp,   color: "text-blue-400" },
            { label: "Sent",        value: statusCounts["sent"] ?? 0,        icon: Send,         color: "text-amber-400" },
            { label: "Followed Up", value: statusCounts["followed_up"] ?? 0, icon: RotateCcw,    color: "text-purple-400" },
            { label: "Converted",   value: statusCounts["converted"] ?? 0,   icon: CheckCircle2, color: "text-emerald-400" },
            { label: "Campaigns",   value: campaigns.length,                 icon: BarChart2,    color: "text-white" },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-900 border border-white/8 rounded-2xl px-4 py-3 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
              <div className="flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color} shrink-0`} />
                <p className={`text-xl font-black tabular-nums ${stat.color}`}>{stat.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              data-testid="input-broker-search"
              placeholder="Search name, email, company…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-10 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "sent", "followed_up", "converted"].map(s => (
              <button
                key={s}
                data-testid={`filter-status-${s}`}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide border transition-all ${
                  statusFilter === s
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-slate-900 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                {s === "all" ? "All" : STATUS_CONFIG[s]?.label ?? s}
                {s !== "all" && statusCounts[s] ? ` · ${Number(statusCounts[s]).toLocaleString()}` : ""}
              </button>
            ))}
          </div>
          <button
            data-testid="button-refresh"
            onClick={() => brokerQuery.refetch()}
            className="text-gray-500 hover:text-white transition-colors shrink-0"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${brokerQuery.isFetching ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* ── Bulk Action Bar (appears when rows are selected) ── */}
        {selected.size > 0 && (
          <div className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-in slide-in-from-top-2 duration-200">
            <p className="text-emerald-300 font-black text-sm shrink-0">
              {selected.size.toLocaleString()} broker{selected.size !== 1 ? "s" : ""} selected
            </p>
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {/* Status picker */}
              <div className="relative">
                <button
                  data-testid="button-bulk-status"
                  onClick={() => setBulkStatusPicker(v => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-xs font-black text-gray-300 hover:border-white/25 transition-all"
                >
                  <Tag className="w-3.5 h-3.5" />
                  Set Status
                </button>
                {bulkStatusPicker && (
                  <div className="absolute top-full left-0 mt-1.5 z-30 bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden w-44">
                    {BULK_STATUSES.map(s => (
                      <button
                        key={s.value}
                        data-testid={`bulk-status-option-${s.value}`}
                        onClick={() => {
                          setBulkStatusTarget(s.value);
                          setBulkStatusPicker(false);
                          bulkStatusMutation.mutate({ ids: selectedArr, status: s.value });
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-black hover:bg-white/5 transition-colors ${s.color}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Launch campaign for selected */}
              <button
                data-testid="button-bulk-launch-campaign"
                onClick={() => { setCampaignTarget("selected"); setShowCampaign(true); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-xs font-black text-emerald-300 hover:bg-emerald-600/30 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Campaign these {selected.size}
              </button>

              {/* Bulk delete */}
              <button
                data-testid="button-bulk-delete"
                onClick={() => {
                  if (confirm(`Remove ${selected.size} broker${selected.size !== 1 ? "s" : ""} from active list?`)) {
                    bulkDeleteMutation.mutate(selectedArr);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-black text-red-400 hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove {selected.size}
              </button>

              {/* Deselect all */}
              <button
                data-testid="button-deselect-all"
                onClick={() => setSelected(new Set())}
                className="ml-auto text-[10px] font-black uppercase tracking-wide text-gray-500 hover:text-white transition-colors"
              >
                Clear selection
              </button>
            </div>
            {(bulkStatusMutation.isPending || bulkDeleteMutation.isPending) && (
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
            )}
          </div>
        )}

        {/* ── Broker Table ── */}
        <div className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
          {/* Table meta */}
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between gap-2">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">
              {brokerQuery.isFetching ? "Loading…" : `${total.toLocaleString()} brokers`}
            </p>
            <p className="text-[10px] text-gray-600 font-bold">Page {page} of {totalPages || 1}</p>
          </div>

          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-[auto_2fr_2fr_1.5fr_1fr_1fr_1fr_auto] gap-3 px-4 py-2 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-600">
            {/* Select-all checkbox */}
            <button
              data-testid="checkbox-select-all"
              onClick={toggleAll}
              className="text-gray-500 hover:text-white transition-colors"
              title={allPageSelected ? "Deselect all on page" : "Select all on page"}
            >
              {allPageSelected
                ? <CheckSquare className="w-4 h-4 text-emerald-400" />
                : somePageSelected
                  ? <MinusSquare className="w-4 h-4 text-emerald-400/60" />
                  : <Square className="w-4 h-4" />}
            </button>
            <span>Name</span>
            <span>Company</span>
            <span>Email</span>
            <span>Phone</span>
            <span>RERA #</span>
            <span>Status</span>
            <span></span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/5">
            {brokerQuery.isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="px-4 py-3 flex gap-3 animate-pulse">
                  <div className="w-4 h-4 bg-slate-800 rounded shrink-0" />
                  <div className="h-4 bg-slate-800 rounded flex-1" />
                  <div className="h-4 bg-slate-800 rounded w-32" />
                  <div className="h-4 bg-slate-800 rounded w-40" />
                </div>
              ))
            ) : brokers.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-600 text-sm">No brokers found.</div>
            ) : brokers.map(broker => {
              const sc = STATUS_CONFIG[broker.status] ?? { label: broker.status, badge: "bg-slate-700/50 border-white/10 text-gray-500" };
              const isSelected = selected.has(broker.id);
              return (
                <div
                  key={broker.id}
                  data-testid={`broker-row-${broker.id}`}
                  onClick={() => toggleOne(broker.id)}
                  className={`grid grid-cols-1 sm:grid-cols-[auto_2fr_2fr_1.5fr_1fr_1fr_1fr_auto] gap-2 sm:gap-3 px-4 py-3 transition-colors cursor-pointer items-center ${
                    isSelected ? "bg-emerald-950/30 border-l-2 border-emerald-500" : "hover:bg-white/2 border-l-2 border-transparent"
                  }`}
                >
                  {/* Checkbox */}
                  <div className="hidden sm:block" onClick={e => { e.stopPropagation(); toggleOne(broker.id); }}>
                    {isSelected
                      ? <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      : <Square className="w-4 h-4 text-gray-700 hover:text-gray-400 shrink-0 transition-colors" />}
                  </div>

                  <div className="min-w-0">
                    <p className={`text-sm font-bold truncate ${isSelected ? "text-emerald-100" : "text-white"}`}>{broker.name}</p>
                    <p className="text-gray-600 text-[10px] sm:hidden truncate">{broker.email}</p>
                  </div>

                  <p className="text-gray-400 text-xs truncate hidden sm:block">
                    {broker.company
                      ? <span className="flex items-center gap-1"><Building2 className="w-3 h-3 shrink-0" />{broker.company}</span>
                      : <span className="text-gray-700">—</span>}
                  </p>

                  <p className="text-gray-400 text-xs truncate hidden sm:block">
                    <a
                      href={`mailto:${broker.email}`}
                      onClick={e => e.stopPropagation()}
                      className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 shrink-0" />{broker.email}
                    </a>
                  </p>

                  <p className="text-gray-500 text-xs truncate hidden sm:block">
                    {broker.phone
                      ? <span className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" />{broker.phone}</span>
                      : <span className="text-gray-700">—</span>}
                  </p>

                  <p className="text-gray-500 text-xs hidden sm:block">{broker.license || "—"}</p>

                  <div className="hidden sm:block">
                    <span className={`text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border ${sc.badge}`}>
                      {sc.label}
                    </span>
                  </div>

                  <button
                    data-testid={`button-delete-broker-${broker.id}`}
                    onClick={e => { e.stopPropagation(); deleteMutation.mutate(broker.id); }}
                    disabled={deleteMutation.isPending}
                    className="text-gray-700 hover:text-red-400 transition-colors shrink-0"
                    title="Remove from active list"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
              <button
                data-testid="button-prev-page"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 font-black uppercase tracking-wide transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <p className="text-[10px] text-gray-600 font-bold">
                Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, total)} of {total.toLocaleString()}
              </p>
              <button
                data-testid="button-next-page"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 font-black uppercase tracking-wide transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── Campaign History ── */}
        {campaigns.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Campaign History</p>
            <div className="space-y-2">
              {campaigns.map(c => {
                const cs = CAMPAIGN_STATUS_CONFIG[c.status] ?? { label: c.status, icon: Clock, color: "text-gray-400" };
                const pct = c.totalBrokers > 0 ? Math.round((c.sentCount / c.totalBrokers) * 100) : 0;
                return (
                  <div
                    key={c.id}
                    data-testid={`campaign-row-${c.id}`}
                    className="bg-slate-900 border border-white/8 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-black text-sm">{c.name}</p>
                        <cs.icon className={`w-3.5 h-3.5 ${cs.color} shrink-0`} />
                        <span className={`text-[9px] font-black uppercase tracking-wide ${cs.color}`}>{cs.label}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-500 font-bold">
                        <span>{c.totalBrokers.toLocaleString()} brokers</span>
                        <span className="text-emerald-400">{c.sentCount.toLocaleString()} sent</span>
                        {c.failedCount > 0 && <span className="text-red-400">{c.failedCount} failed</span>}
                        <span>{new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      {c.status === "running" && (
                        <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden w-full max-w-xs">
                          <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {c.status === "idle" && (
                        <Button
                          data-testid={`button-start-campaign-${c.id}`}
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-8 px-4 text-xs"
                          onClick={() => campaignControlMutation.mutate({ id: c.id, action: "start" })}
                          disabled={campaignControlMutation.isPending}
                        >
                          <Play className="w-3 h-3 mr-1" /> Start
                        </Button>
                      )}
                      {c.status === "running" && (
                        <Button
                          data-testid={`button-pause-campaign-${c.id}`}
                          size="sm"
                          variant="outline"
                          className="border-white/10 text-amber-400 hover:bg-amber-500/10 font-black rounded-xl h-8 px-4 text-xs"
                          onClick={() => campaignControlMutation.mutate({ id: c.id, action: "pause" })}
                        >
                          <Pause className="w-3 h-3 mr-1" /> Pause
                        </Button>
                      )}
                      {c.status === "paused" && (
                        <Button
                          data-testid={`button-resume-campaign-${c.id}`}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-8 px-4 text-xs"
                          onClick={() => campaignControlMutation.mutate({ id: c.id, action: "resume" })}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" /> Resume
                        </Button>
                      )}
                      <a
                        href={`/api/marketing/broker-campaign/${c.id}/export`}
                        download
                        onClick={e => e.stopPropagation()}
                        data-testid={`button-export-campaign-${c.id}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-white border border-white/10 rounded-xl px-3 h-8 font-black transition-colors"
                      >
                        <Download className="w-3 h-3" /> Export
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Launch Campaign Modal ── */}
      {showCampaign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={e => { if (e.target === e.currentTarget) setShowCampaign(false); }}
        >
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div>
                <p className="text-white font-black uppercase tracking-widest text-sm">Launch Email Campaign</p>
                <p className="text-gray-500 text-xs mt-0.5">Sends a personalised referral link to each broker</p>
              </div>
              <button onClick={() => setShowCampaign(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Campaign Name</label>
                <Input
                  data-testid="input-campaign-name"
                  placeholder="e.g. RERA May Outreach Wave 1"
                  value={campaignName}
                  onChange={e => setCampaignName(e.target.value)}
                  className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: "new",         label: `New · ${(statusCounts["new"] ?? 0).toLocaleString()}` },
                    { value: "followed_up", label: `Follow-up · ${(statusCounts["followed_up"] ?? 0).toLocaleString()}` },
                    { value: "all",         label: `All · ${Object.values(statusCounts).reduce((a, b) => a + b, 0).toLocaleString()}` },
                    ...(selected.size > 0 ? [{ value: "selected", label: `Selected · ${selected.size.toLocaleString()}` }] : []),
                  ] as { value: string; label: string }[]).map(t => (
                    <button
                      key={t.value}
                      data-testid={`target-${t.value}`}
                      onClick={() => setCampaignTarget(t.value as any)}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-black transition-all ${
                        campaignTarget === t.value
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "bg-slate-800 border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-gray-400 leading-relaxed space-y-1">
                <p className="font-black text-white text-[11px] uppercase tracking-wide mb-1">What happens</p>
                <p>• Each broker gets a personalised email with their unique referral link</p>
                <p>• Sent from <span className="text-emerald-300">partners@deliwer.com</span> in batches of 300/day</p>
                <p>• Status updates to <span className="text-amber-300">sent</span> after delivery</p>
              </div>

              <Button
                data-testid="button-launch-campaign-confirm"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl text-sm shadow-xl shadow-emerald-900/30"
                onClick={launchCampaign}
                disabled={launching}
              >
                {launching
                  ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Creating campaign…</>
                  : <><Zap className="w-4 h-4 mr-2" /> Launch Campaign</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Close status picker on outside click */}
      {bulkStatusPicker && (
        <div className="fixed inset-0 z-20" onClick={() => setBulkStatusPicker(false)} />
      )}
    </div>
  );
}
