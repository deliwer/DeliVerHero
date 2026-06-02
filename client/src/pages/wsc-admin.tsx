import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, ClipboardList, Package, Users, LogIn, RefreshCw,
  CheckCircle2, XCircle, ArrowLeftRight, ChevronRight, X, Upload,
  Download, Search, Eye, Edit2, ShieldCheck, ShieldAlert, AlertTriangle,
  TrendingUp, Clock, Sparkles, Building2, Send, MoreHorizontal, Filter,
  Layers, BarChart3, ChevronLeft
} from "lucide-react";

const API = "/api/wsc";
const ADMIN_TOKEN_KEY = "wsc_admin_token";

function getAdminToken() { return localStorage.getItem(ADMIN_TOKEN_KEY) || ""; }
function setAdminToken(t: string) { localStorage.setItem(ADMIN_TOKEN_KEY, t); }
function clearAdminToken() { localStorage.removeItem(ADMIN_TOKEN_KEY); }

async function adminFetch(path: string, opts: RequestInit = {}) {
  const token = getAdminToken();
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "x-wsc-admin-token": token,
      ...((opts.headers as object) || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function fmt(cents: number) {
  return `$${((cents || 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtShort(cents: number) {
  const v = (cents || 0) / 100;
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
  return `$${v.toFixed(0)}`;
}

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-blue-900/30 text-blue-400 border-blue-700/40",
  accepted: "bg-emerald-900/30 text-emerald-400 border-emerald-700/40",
  rejected: "bg-red-900/30 text-red-400 border-red-700/40",
  processing: "bg-amber-900/30 text-amber-400 border-amber-700/40",
  partial: "bg-purple-900/30 text-purple-400 border-purple-700/40",
  pending: "bg-slate-800 text-slate-400 border-slate-700",
  counter: "bg-violet-900/30 text-violet-400 border-violet-700/40",
  withdrawn: "bg-slate-800 text-slate-500 border-slate-700",
};

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border font-medium capitalize ${cls}`}>{status}</span>;
}

const SOURCE_COLORS: Record<string, string> = {
  WSC: "bg-blue-600/20 text-blue-300 border-blue-600/40",
  ITOCHU: "bg-purple-600/20 text-purple-300 border-purple-600/40",
  SUPPLIERDIRECT: "bg-emerald-600/20 text-emerald-300 border-emerald-600/40",
};

function SourceTag({ source }: { source: string }) {
  return <span className={`text-xs px-1.5 py-0.5 rounded border ${SOURCE_COLORS[source] || "bg-slate-800 text-slate-400 border-slate-700"}`}>{source}</span>;
}

// ── Login Gate ─────────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [pw, setPw] = useState("");
  const { toast } = useToast();
  const mut = useMutation({
    mutationFn: () => adminFetch("/admin/login", { method: "POST", body: JSON.stringify({ password: pw }) }),
    onSuccess: (d) => { setAdminToken(d.token); onSuccess(d.token); },
    onError: (e: Error) => toast({ title: "Access denied", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black">W</div>
          <div>
            <p className="text-white font-bold">WSC Admin Panel</p>
            <p className="text-slate-400 text-xs">Seller Operations Dashboard</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Admin Password</Label>
            <Input type="password" value={pw} onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === "Enter" && mut.mutate()}
              className="bg-slate-800 border-slate-700 text-white" placeholder="••••••••"
              data-testid="input-admin-pw" />
          </div>
          <Button onClick={() => mut.mutate()} disabled={mut.isPending || !pw}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-admin-login">
            {mut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
            Sign In
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Dashboard Tab ──────────────────────────────────────────────────────────────
function DashboardTab() {
  const { data: stats } = useQuery({
    queryKey: ["/api/wsc/admin/stats"],
    queryFn: () => adminFetch("/admin/stats"),
    refetchInterval: 30000,
  });

  const sessions: any[] = stats?.sessions || [];
  const stock: any[] = stats?.stock || [];
  const buyers: any[] = stats?.buyers || [];

  const pending = sessions.find(s => s.status === "submitted") || { count: 0, totalValue: 0 };
  const accepted = sessions.find(s => s.status === "accepted") || { count: 0, totalValue: 0 };
  const rejected = sessions.find(s => s.status === "rejected") || { count: 0, totalValue: 0 };
  const totalSessions = sessions.reduce((s, x) => s + Number(x.count), 0);
  const totalOfferValue = sessions.reduce((s, x) => s + Number(x.totalValue), 0);

  const pendingBuyers = buyers.find(b => b.kycStatus === "pending") || { count: 0 };
  const verifiedBuyers = buyers.find(b => b.kycStatus === "verified") || { count: 0 };

  const totalStock = stock.reduce((s, x) => s + Number(x.totalItems), 0);
  const totalQty = stock.reduce((s, x) => s + Number(x.totalQty), 0);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pending Reviews", value: Number(pending.count), sub: fmtShort(Number(pending.totalValue)), color: "text-amber-400", icon: Clock, bg: "bg-amber-900/10 border-amber-800/30" },
          { label: "Offers Accepted", value: Number(accepted.count), sub: fmtShort(Number(accepted.totalValue)), color: "text-emerald-400", icon: CheckCircle2, bg: "bg-emerald-900/10 border-emerald-800/30" },
          { label: "Total Sessions", value: totalSessions, sub: fmtShort(totalOfferValue) + " pipeline", color: "text-blue-400", icon: ClipboardList, bg: "bg-blue-900/10 border-blue-800/30" },
          { label: "KYC Pending", value: Number(pendingBuyers.count), sub: Number(verifiedBuyers.count) + " verified", color: "text-purple-400", icon: ShieldAlert, bg: "bg-purple-900/10 border-purple-800/30" },
        ].map(k => (
          <div key={k.label} className={`bg-slate-900 border ${k.bg} rounded-xl p-4`} data-testid={`kpi-${k.label.toLowerCase().replace(/ /g,'-')}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-400">{k.label}</p>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-500 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Stock by source */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-semibold text-sm">Stock Inventory by Source</h3>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stock.map((s: any) => (
            <div key={s.source} className="bg-slate-800 rounded-xl p-4">
              <SourceTag source={s.source} />
              <p className="text-white font-bold text-xl mt-2">{Number(s.totalItems).toLocaleString()} <span className="text-xs font-normal text-slate-400">SKUs</span></p>
              <p className="text-slate-400 text-xs">{Number(s.totalQty).toLocaleString()} total units</p>
              <p className="text-xs text-slate-500 mt-1">{Number(s.available).toLocaleString()} available</p>
            </div>
          ))}
          {stock.length === 0 && <p className="text-slate-500 text-sm col-span-3 py-4 text-center">No stock data</p>}
        </div>
      </div>

      {/* Session pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-semibold text-sm">Offer Session Pipeline</h3>
        </div>
        <div className="p-4 flex flex-wrap gap-3">
          {sessions.map((s: any) => (
            <div key={s.status} className="bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <StatusBadge status={s.status} />
              <span className="text-white font-bold">{Number(s.count)}</span>
              <span className="text-slate-400 text-xs">{fmtShort(Number(s.totalValue))}</span>
            </div>
          ))}
          {sessions.length === 0 && <p className="text-slate-500 text-sm py-2">No sessions yet</p>}
        </div>
      </div>
    </div>
  );
}

// ── Session Detail Modal ────────────────────────────────────────────────────────
function SessionDetail({ sessionId, onClose }: { sessionId: string; onClose: () => void }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [counterInputs, setCounterInputs] = useState<Record<string, string>>({});

  const { data: session, isLoading } = useQuery({
    queryKey: ["/api/wsc/admin/sessions", sessionId],
    queryFn: () => adminFetch(`/admin/sessions/${sessionId}`),
  });

  const itemMut = useMutation({
    mutationFn: ({ id, ...body }: any) => adminFetch(`/admin/offer-items/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/wsc/admin/sessions", sessionId] }),
    onError: (e: Error) => toast({ title: "Update failed", description: e.message, variant: "destructive" }),
  });

  const bulkMut = useMutation({
    mutationFn: (body: any) => adminFetch(`/admin/sessions/${sessionId}/bulk`, { method: "POST", body: JSON.stringify(body) }),
    onSuccess: (_, vars) => {
      toast({ title: `All items ${vars.action === "accept" ? "accepted" : "rejected"}` });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/sessions", sessionId] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/sessions"] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stats"] });
    },
    onError: (e: Error) => toast({ title: "Bulk update failed", description: e.message, variant: "destructive" }),
  });

  const statusMut = useMutation({
    mutationFn: (status: string) => adminFetch(`/admin/sessions/${sessionId}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/sessions", sessionId] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/sessions"] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stats"] });
      toast({ title: "Session status updated" });
    },
  });

  const handleCounterSubmit = (itemId: string) => {
    const p = parseFloat(counterInputs[itemId] || "");
    if (!p) return;
    itemMut.mutate({ id: itemId, status: "counter", counterPrice: p });
    setCounterInputs(prev => { const n = { ...prev }; delete n[itemId]; return n; });
  };

  if (isLoading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
    </div>
  );
  if (!session) return null;

  const items: any[] = session.items || [];
  const pending = items.filter(i => i.status === "pending").length;
  const totalOffer = items.reduce((s: number, i: any) => s + i.offerPrice * i.offerQty, 0);
  const totalList = items.reduce((s: number, i: any) => s + i.listPrice * i.offerQty, 0);
  const savings = totalList - totalOffer;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-[#0d1422] border border-slate-700 rounded-t-2xl sm:rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SourceTag source={session.source} />
              <StatusBadge status={session.status} />
            </div>
            <p className="text-white font-bold font-mono text-lg">{session.sessionRef}</p>
            <p className="text-slate-400 text-sm">{session.buyerCompany} · {session.buyerEmail}</p>
            <p className="text-xs text-slate-500 mt-0.5">{new Date(session.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right mr-2 hidden sm:block">
              <p className="text-xs text-slate-400">Offer Total</p>
              <p className="text-white font-bold text-lg">{fmt(totalOffer)}</p>
              {savings > 0 && <p className="text-xs text-red-400">–{fmt(savings)} vs list</p>}
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1" data-testid="button-close-session-detail">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        {pending > 0 && (
          <div className="bg-amber-950/20 border-b border-amber-900/30 px-5 py-2.5 flex items-center justify-between shrink-0">
            <span className="text-amber-400 text-sm font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {pending} lines awaiting review
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => bulkMut.mutate({ action: "accept" })} disabled={bulkMut.isPending}
                className="bg-emerald-700 hover:bg-emerald-600 text-white h-7 text-xs" data-testid="button-bulk-accept">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkMut.mutate({ action: "reject" })} disabled={bulkMut.isPending}
                className="border-red-800/60 text-red-400 hover:bg-red-900/20 h-7 text-xs" data-testid="button-bulk-reject">
                <XCircle className="w-3 h-3 mr-1" /> Reject All
              </Button>
            </div>
          </div>
        )}

        {/* Offer items table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-800/90">
              <tr className="border-b border-slate-700">
                {["SKU", "Manufacturer", "Model", "Grade", "Cap", "Color", "Qty", "List Price", "Offer Price", "Savings", "Counter", "Status", "Actions"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-slate-300 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => {
                const saving = item.listPrice * item.offerQty - item.offerPrice * item.offerQty;
                const savingPct = item.listPrice > 0 ? ((saving / (item.listPrice * item.offerQty)) * 100).toFixed(1) : "0";
                const isCountering = counterInputs[item.id] !== undefined;
                return (
                  <tr key={item.id} className={`border-b border-slate-800/50 ${item.status === "pending" ? "hover:bg-slate-800/30" : "opacity-70"}`}
                    data-testid={`row-offer-item-${item.id}`}>
                    <td className="px-3 py-2 font-mono text-slate-300">{item.sku}</td>
                    <td className="px-3 py-2 text-white">{item.manufacturer}</td>
                    <td className="px-3 py-2 text-white font-medium">{item.model}</td>
                    <td className="px-3 py-2 text-slate-300">{item.grade}</td>
                    <td className="px-3 py-2 text-slate-300">{item.capacity}</td>
                    <td className="px-3 py-2 text-slate-300">{item.color}</td>
                    <td className="px-3 py-2 font-bold text-center text-white">{item.offerQty}</td>
                    <td className="px-3 py-2 text-slate-400">{fmt(item.listPrice)}</td>
                    <td className="px-3 py-2 font-bold text-blue-400">{fmt(item.offerPrice)}</td>
                    <td className="px-3 py-2 text-red-400 whitespace-nowrap">
                      {saving > 0 ? <span className="flex items-center gap-0.5">–{savingPct}%</span> : "–"}
                    </td>
                    <td className="px-3 py-2">
                      {item.counterPrice ? (
                        <span className="text-violet-400 font-bold">{fmt(item.counterPrice)}</span>
                      ) : isCountering ? (
                        <div className="flex items-center gap-1">
                          <span className="text-slate-400">$</span>
                          <input type="number" step="0.01" value={counterInputs[item.id]}
                            onChange={e => setCounterInputs(p => ({ ...p, [item.id]: e.target.value }))}
                            className="w-16 bg-slate-700 border border-violet-700 rounded px-1 py-0.5 text-white text-xs focus:outline-none"
                            autoFocus data-testid={`input-counter-${item.id}`} />
                          <button onClick={() => handleCounterSubmit(item.id)}
                            className="text-violet-400 hover:text-violet-300" data-testid={`button-counter-submit-${item.id}`}>
                            <Send className="w-3 h-3" />
                          </button>
                          <button onClick={() => setCounterInputs(p => { const n = {...p}; delete n[item.id]; return n; })}
                            className="text-slate-500 hover:text-slate-300">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-2"><StatusBadge status={item.status} /></td>
                    <td className="px-3 py-2">
                      {item.status === "pending" && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => itemMut.mutate({ id: item.id, status: "accepted" })}
                            title="Accept" className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20 rounded"
                            data-testid={`button-accept-item-${item.id}`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => setCounterInputs(p => ({ ...p, [item.id]: (item.offerPrice / 100 * 1.05).toFixed(2) }))}
                            title="Counter" className="p-1 text-violet-400 hover:text-violet-300 hover:bg-violet-900/20 rounded"
                            data-testid={`button-counter-item-${item.id}`}>
                            <ArrowLeftRight className="w-4 h-4" />
                          </button>
                          <button onClick={() => itemMut.mutate({ id: item.id, status: "rejected" })}
                            title="Reject" className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                            data-testid={`button-reject-item-${item.id}`}>
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-5 py-3 flex items-center justify-between shrink-0 bg-slate-900">
          <p className="text-xs text-slate-400">{items.length} lines · {fmt(totalOffer)} total offered</p>
          <div className="flex gap-2">
            {session.status === "submitted" && (
              <>
                <Button size="sm" onClick={() => statusMut.mutate("processing")} disabled={statusMut.isPending}
                  className="bg-amber-700 hover:bg-amber-600 text-white h-7 text-xs" data-testid="button-mark-processing">
                  Mark Processing
                </Button>
                <Button size="sm" onClick={() => statusMut.mutate("accepted")} disabled={statusMut.isPending}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white h-7 text-xs" data-testid="button-mark-accepted">
                  Mark Accepted
                </Button>
              </>
            )}
            <Button size="sm" variant="outline" onClick={onClose}
              className="border-slate-700 text-slate-300 h-7 text-xs" data-testid="button-close-detail">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Offer Sessions Tab ──────────────────────────────────────────────────────────
function OfferSessionsTab() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["/api/wsc/admin/sessions", statusFilter],
    queryFn: () => adminFetch(`/admin/sessions${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`),
    refetchInterval: 15000,
  });

  const pendingCount = (sessions as any[]).filter(s => s.status === "submitted").length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
          {["all", "submitted", "processing", "accepted", "rejected"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-all
                ${statusFilter === s ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              data-testid={`filter-sessions-${s}`}>
              {s === "all" ? "All" : s}
              {s === "submitted" && pendingCount > 0 && (
                <span className="ml-1 bg-amber-500 text-white text-xs rounded-full px-1">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-slate-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (sessions as any[]).length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No offer sessions found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {(sessions as any[]).map((s: any) => {
            const savings = 0;
            return (
              <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedId(s.id)} data-testid={`row-session-${s.id}`}>
                <div className="px-4 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <SourceTag source={s.source} />
                    <div className="min-w-0">
                      <p className="font-mono text-blue-400 text-sm font-bold truncate">{s.sessionRef}</p>
                      <p className="text-xs text-slate-400 truncate">{s.buyerCompany} · {s.buyerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:block text-right">
                      <p className="text-white font-bold text-sm">{fmt(s.totalValue)}</p>
                      <p className="text-xs text-slate-400">{s.totalItems} items</p>
                    </div>
                    <StatusBadge status={s.status} />
                    <p className="text-xs text-slate-500 hidden md:block whitespace-nowrap">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selectedId && <SessionDetail sessionId={selectedId} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ── Stock Management Tab ────────────────────────────────────────────────────────
function StockTab() {
  const [sourceFilter, setSourceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVals, setEditVals] = useState<any>({});
  const [importSource, setImportSource] = useState("WSC");
  const [importResult, setImportResult] = useState<any>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const qc = useQueryClient();

  const params = new URLSearchParams({
    ...(sourceFilter !== "all" ? { source: sourceFilter } : {}),
    ...(search ? { search } : {}),
  });

  const { data: stockData, isLoading } = useQuery({
    queryKey: ["/api/wsc/admin/stock", params.toString()],
    queryFn: () => adminFetch(`/admin/stock?${params}`),
    staleTime: 30000,
  });

  const updateMut = useMutation({
    mutationFn: ({ id, ...body }: any) => adminFetch(`/admin/stock/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stock"] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stats"] });
      setEditingId(null);
      toast({ title: "Stock item updated" });
    },
    onError: (e: Error) => toast({ title: "Update failed", description: e.message, variant: "destructive" }),
  });

  const importMut = useMutation({
    mutationFn: (data: any) => adminFetch("/admin/stock/import", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (d) => {
      setImportResult(d);
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stock"] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stats"] });
      toast({ title: `Import complete: ${d.added} added, ${d.updated} updated` });
    },
    onError: (e: Error) => toast({ title: "Import failed", description: e.message, variant: "destructive" }),
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const b64 = btoa(String.fromCharCode(...new Uint8Array(ev.target!.result as ArrayBuffer)));
      importMut.mutate({ fileBase64: b64, source: importSource, markMissingDiscontinued: false });
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = `/api/wsc/stock/download${sourceFilter !== "all" ? `?source=${sourceFilter}` : ""}`;
    a.download = `WSC_Stock_${sourceFilter}_${new Date().toISOString().slice(0,10)}.xlsx`;
    a.click();
  };

  const items: any[] = stockData?.items || [];

  return (
    <div className="space-y-5">
      {/* Import panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-400" /> Import Daily Stock Report
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={importSource} onValueChange={setImportSource}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-slate-300 text-xs h-8" data-testid="select-import-source">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="WSC" className="text-white text-xs">WeSellCellular</SelectItem>
              <SelectItem value="ITOCHU" className="text-white text-xs">Itochu Sourced</SelectItem>
              <SelectItem value="SUPPLIERDIRECT" className="text-white text-xs">Supplier Direct</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => uploadRef.current?.click()} disabled={importMut.isPending}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 h-8 text-xs" data-testid="button-import-xlsx">
            {importMut.isPending ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <Upload className="w-3 h-3 mr-1" />}
            Upload XLSX
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 h-8 text-xs" data-testid="button-export-xlsx">
            <Download className="w-3 h-3 mr-1" /> Export Current Stock
          </Button>
          <input ref={uploadRef} type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
          {importResult && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {importResult.added} added · {importResult.updated} updated
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKU, model, brand…"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            data-testid="input-stock-search" />
        </div>
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
          {["all", "WSC", "ITOCHU", "SUPPLIERDIRECT"].map(s => (
            <button key={s} onClick={() => setSourceFilter(s)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all
                ${sourceFilter === s ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              data-testid={`filter-stock-${s}`}>
              {s === "all" ? "All" : s === "SUPPLIERDIRECT" ? "SD" : s}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500">{stockData?.total || 0} items</span>
      </div>

      {/* Stock table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              {["Source", "SKU", "Manufacturer", "Model", "Grade", "Cap", "Color", "Carrier", "Qty", "List Price", "New Today", "Status", ""].map(h => (
                <th key={h} className="px-2.5 py-2 text-left text-slate-300 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  {[...Array(13)].map((_, j) => <td key={j} className="px-2.5 py-2"><div className="h-3 bg-slate-800 rounded animate-pulse" /></td>)}
                </tr>
              ))
            ) : items.map((item: any) => {
              const isEditing = editingId === item.id;
              return (
                <tr key={item.id}
                  className={`border-b border-slate-800/50 ${item.hasQtyAddedToday ? "bg-emerald-950/10" : ""} ${item.status !== "available" ? "opacity-50" : "hover:bg-slate-800/20"}`}
                  data-testid={`row-admin-stock-${item.sku}`}>
                  <td className="px-2.5 py-2"><SourceTag source={item.source} /></td>
                  <td className="px-2.5 py-2 font-mono text-slate-300">{item.sku}</td>
                  <td className="px-2.5 py-2 text-white">{item.manufacturer}</td>
                  <td className="px-2.5 py-2 text-white">{item.model}</td>
                  <td className="px-2.5 py-2 text-slate-300">{item.grade}</td>
                  <td className="px-2.5 py-2 text-slate-300">{item.capacity}</td>
                  <td className="px-2.5 py-2 text-slate-300">{item.color}</td>
                  <td className="px-2.5 py-2 text-slate-400">{item.carrier}</td>
                  <td className="px-2.5 py-2">
                    {isEditing ? (
                      <input type="number" min="0" value={editVals.qtyAvailable ?? item.qtyAvailable}
                        onChange={e => setEditVals((p: any) => ({ ...p, qtyAvailable: e.target.value }))}
                        className="w-14 bg-slate-700 border border-blue-600 rounded px-1 py-0.5 text-white text-xs focus:outline-none"
                        data-testid={`input-edit-qty-${item.id}`} />
                    ) : (
                      <span className="font-bold text-white">{item.qtyAvailable}</span>
                    )}
                  </td>
                  <td className="px-2.5 py-2">
                    {isEditing ? (
                      <div className="flex items-center">
                        <span className="text-slate-400 mr-0.5">$</span>
                        <input type="number" step="0.01" value={editVals.listPrice ?? (item.listPrice / 100).toFixed(2)}
                          onChange={e => setEditVals((p: any) => ({ ...p, listPrice: e.target.value }))}
                          className="w-16 bg-slate-700 border border-blue-600 rounded px-1 py-0.5 text-white text-xs focus:outline-none"
                          data-testid={`input-edit-price-${item.id}`} />
                      </div>
                    ) : (
                      <span className="text-blue-400 font-bold">{fmt(item.listPrice)}</span>
                    )}
                  </td>
                  <td className="px-2.5 py-2 text-center">
                    {item.hasQtyAddedToday && <Sparkles className="w-3.5 h-3.5 text-emerald-400 mx-auto" />}
                  </td>
                  <td className="px-2.5 py-2">
                    {isEditing ? (
                      <Select value={editVals.status ?? item.status}
                        onValueChange={v => setEditVals((p: any) => ({ ...p, status: v }))}>
                        <SelectTrigger className="h-6 w-24 bg-slate-700 border-blue-600 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {["available", "out_of_stock", "reserved", "discontinued"].map(v => (
                            <SelectItem key={v} value={v} className="text-white text-xs">{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <StatusBadge status={item.status} />
                    )}
                  </td>
                  <td className="px-2.5 py-2">
                    {isEditing ? (
                      <div className="flex gap-1">
                        <button onClick={() => updateMut.mutate({ id: item.id, ...editVals })}
                          className="text-emerald-400 hover:text-emerald-300 p-0.5" data-testid={`button-save-stock-${item.id}`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setEditingId(null); setEditVals({}); }}
                          className="text-slate-400 hover:text-white p-0.5">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingId(item.id); setEditVals({ qtyAvailable: item.qtyAvailable, listPrice: (item.listPrice / 100).toFixed(2), status: item.status }); }}
                        className="text-slate-400 hover:text-blue-400 p-0.5" data-testid={`button-edit-stock-${item.id}`}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!isLoading && items.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No stock items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Buyers Tab ─────────────────────────────────────────────────────────────────
function BuyersTab() {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: buyers = [], isLoading } = useQuery({
    queryKey: ["/api/wsc/admin/buyers"],
    queryFn: () => adminFetch("/admin/buyers"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, ...body }: any) => adminFetch(`/admin/buyers/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/buyers"] });
      qc.invalidateQueries({ queryKey: ["/api/wsc/admin/stats"] });
      toast({ title: "Buyer updated" });
    },
    onError: (e: Error) => toast({ title: "Update failed", description: e.message, variant: "destructive" }),
  });

  const pendingKyc = (buyers as any[]).filter(b => b.kycStatus === "pending");
  const verified = (buyers as any[]).filter(b => b.kycStatus === "verified");

  return (
    <div className="space-y-5">
      {/* KYC queue */}
      {pendingKyc.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-amber-900/30 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">{pendingKyc.length} buyer{pendingKyc.length !== 1 ? "s" : ""} awaiting KYC verification</span>
          </div>
          <div className="divide-y divide-amber-900/20">
            {pendingKyc.map((b: any) => (
              <div key={b.id} className="px-4 py-3 flex items-center justify-between" data-testid={`row-pending-kyc-${b.id}`}>
                <div>
                  <p className="text-white font-semibold text-sm">{b.companyName}</p>
                  <p className="text-slate-400 text-xs">{b.contactName} · {b.email} · {b.phone}</p>
                  <p className="text-slate-500 text-xs">{b.country} · Registered {new Date(b.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" onClick={() => updateMut.mutate({ id: b.id, kycStatus: "verified", buyerTier: "verified" })}
                    disabled={updateMut.isPending}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white h-7 text-xs" data-testid={`button-approve-buyer-${b.id}`}>
                    <ShieldCheck className="w-3 h-3 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateMut.mutate({ id: b.id, kycStatus: "rejected", status: "suspended" })}
                    disabled={updateMut.isPending}
                    className="border-red-800/60 text-red-400 hover:bg-red-900/20 h-7 text-xs" data-testid={`button-reject-buyer-${b.id}`}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All buyers table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              {["Company", "Contact", "Email", "Phone", "Country", "KYC", "Tier", "Status", "Joined", "Actions"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left text-slate-300 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  {[...Array(10)].map((_, j) => <td key={j} className="px-3 py-2"><div className="h-3 bg-slate-800 rounded animate-pulse" /></td>)}
                </tr>
              ))
            ) : (buyers as any[]).map((b: any) => (
              <tr key={b.id} className="border-b border-slate-800/50 hover:bg-slate-800/20" data-testid={`row-buyer-${b.id}`}>
                <td className="px-3 py-2 text-white font-medium">{b.companyName}</td>
                <td className="px-3 py-2 text-slate-300">{b.contactName}</td>
                <td className="px-3 py-2 text-slate-300">{b.email}</td>
                <td className="px-3 py-2 text-slate-400">{b.phone}</td>
                <td className="px-3 py-2 text-slate-400">{b.country}</td>
                <td className="px-3 py-2"><StatusBadge status={b.kycStatus} /></td>
                <td className="px-3 py-2">
                  <Select value={b.buyerTier}
                    onValueChange={v => updateMut.mutate({ id: b.id, buyerTier: v })}>
                    <SelectTrigger className="h-6 w-24 bg-slate-800 border-slate-700 text-xs capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {["standard", "verified", "premium", "vip"].map(t => (
                        <SelectItem key={t} value={t} className="text-white text-xs capitalize">{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-2"><StatusBadge status={b.status} /></td>
                <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-1">
                    {b.kycStatus === "pending" && (
                      <button onClick={() => updateMut.mutate({ id: b.id, kycStatus: "verified" })}
                        className="text-emerald-400 hover:text-emerald-300 p-0.5" title="Verify KYC"
                        data-testid={`button-verify-${b.id}`}>
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                    )}
                    {b.status === "active" ? (
                      <button onClick={() => updateMut.mutate({ id: b.id, status: "suspended" })}
                        className="text-red-400 hover:text-red-300 p-0.5" title="Suspend"
                        data-testid={`button-suspend-${b.id}`}>
                        <XCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => updateMut.mutate({ id: b.id, status: "active" })}
                        className="text-emerald-400 hover:text-emerald-300 p-0.5" title="Reactivate"
                        data-testid={`button-reactivate-${b.id}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && (buyers as any[]).length === 0 && (
          <div className="text-center py-10 text-slate-500">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No buyers registered yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Admin Layout ──────────────────────────────────────────────────────────
export default function WscAdmin() {
  const [token, setToken] = useState(() => getAdminToken());
  const [tab, setTab] = useState<"dashboard" | "sessions" | "stock" | "buyers">("dashboard");

  if (!token) return <AdminLogin onSuccess={(t) => setToken(t)} />;

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "sessions", label: "Offer Sessions", icon: ClipboardList },
    { key: "stock", label: "Stock", icon: Package },
    { key: "buyers", label: "Buyers", icon: Users },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0f1a]/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-full px-4 h-13 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center font-black text-white text-sm">W</div>
            <div>
              <span className="text-white font-bold text-sm">WSC Admin</span>
              <span className="text-slate-400 text-xs ml-2 hidden sm:inline">Seller Operations</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all
                  ${tab === t.key ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                data-testid={`tab-admin-${t.key}`}>
                <t.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:block">{t.label}</span>
              </button>
            ))}
            <button onClick={() => { clearAdminToken(); setToken(""); }}
              className="ml-1 px-2 py-1.5 text-xs text-slate-500 hover:text-red-400 rounded-lg transition-colors"
              data-testid="button-admin-logout">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-full px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {tab === "dashboard" && <DashboardTab />}
            {tab === "sessions" && <OfferSessionsTab />}
            {tab === "stock" && <StockTab />}
            {tab === "buyers" && <BuyersTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
