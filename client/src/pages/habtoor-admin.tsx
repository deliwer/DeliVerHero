import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Lock, CheckCircle2, AlertTriangle, BanIcon, X,
  Video, ClipboardCheck, Users, TrendingUp, Building,
  MapPin, Phone, Mail, Calendar, BarChart2, RefreshCw,
  Eye, FileText, ChevronDown, Banknote, UserX, ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_TOKEN = "deliwer-admin-2026";

function adminFetch(url: string, token: string) {
  return fetch(url, { headers: { "x-admin-token": token } }).then(r => {
    if (!r.ok) throw new Error("Unauthorized");
    return r.json();
  });
}

function formatM(n?: number | null) {
  if (!n) return "—";
  return n >= 1_000_000 ? `AED ${(n / 1_000_000).toFixed(2)}M` : `AED ${n.toLocaleString()}`;
}
function fmtDate(d?: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-AE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function statusPill(s: string) {
  const map: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    closed: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    expired: "bg-gray-700 text-gray-400 border-white/10",
    disputed: "bg-red-500/15 text-red-400 border-red-500/30",
    blacklisted: "bg-red-900/40 text-red-300 border-red-500/40",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    verified: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    fraud: "bg-red-900/40 text-red-300 border-red-500/40",
    scheduled: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    cancelled: "bg-gray-700 text-gray-400 border-white/10",
  };
  return map[s] || "bg-slate-700 text-gray-400 border-white/10";
}

type Tab = "overview" | "claims" | "deals" | "tours" | "ndas" | "blacklist";

export default function HabtoorAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [token, setToken] = useState(() => localStorage.getItem("hpv_admin_token") || "");
  const [tokenInput, setTokenInput] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [blacklistForm, setBlacklistForm] = useState({ phone: "", name: "", reason: "bypass_deliwer", notes: "" });

  const authed = !!token;

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (tokenInput === ADMIN_TOKEN) {
      localStorage.setItem("hpv_admin_token", tokenInput);
      setToken(tokenInput);
    } else {
      toast({ title: "Invalid token", variant: "destructive" });
    }
  }

  function logout() { localStorage.removeItem("hpv_admin_token"); setToken(""); }

  const statsQ = useQuery({ queryKey: ["/api/habtoor/admin/stats", token], queryFn: () => adminFetch("/api/habtoor/admin/stats", token), enabled: authed });
  const claimsQ = useQuery({ queryKey: ["/api/habtoor/admin/claims", token], queryFn: () => adminFetch("/api/habtoor/admin/claims", token), enabled: authed && tab === "claims" });
  const dealsQ = useQuery({ queryKey: ["/api/habtoor/admin/deal-reports", token], queryFn: () => adminFetch("/api/habtoor/admin/deal-reports", token), enabled: authed && tab === "deals" });
  const toursQ = useQuery({ queryKey: ["/api/habtoor/admin/vr-requests", token], queryFn: () => adminFetch("/api/habtoor/admin/vr-requests", token), enabled: authed && tab === "tours" });
  const ndasQ = useQuery({ queryKey: ["/api/habtoor/admin/ndas", token], queryFn: () => adminFetch("/api/habtoor/admin/ndas", token), enabled: authed && tab === "ndas" });
  const blacklistQ = useQuery({ queryKey: ["/api/habtoor/admin/blacklist", token], queryFn: () => adminFetch("/api/habtoor/admin/blacklist", token), enabled: authed && tab === "blacklist" });

  async function adminApi(method: string, url: string, body?: any) {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  const patchClaimMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminApi("PATCH", `/api/habtoor/admin/claims/${id}`, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/habtoor/admin/claims"] }); toast({ title: "Claim updated" }); },
  });

  const patchDealMut = useMutation({
    mutationFn: ({ id, verificationStatus }: { id: string; verificationStatus: string }) => adminApi("PATCH", `/api/habtoor/admin/deal-reports/${id}`, { verificationStatus }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/habtoor/admin/deal-reports"] }); toast({ title: "Deal updated" }); },
  });

  const addBlacklistMut = useMutation({
    mutationFn: (body: any) => adminApi("POST", "/api/habtoor/blacklist", body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/habtoor/admin/blacklist"] }); toast({ title: "Broker blacklisted" }); setBlacklistForm({ phone: "", name: "", reason: "bypass_deliwer", notes: "" }); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const removeBlacklistMut = useMutation({
    mutationFn: (phone: string) => adminApi("DELETE", `/api/habtoor/admin/blacklist/${encodeURIComponent(phone)}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/habtoor/admin/blacklist"] }); toast({ title: "Broker removed from blacklist" }); },
  });

  const inputCls = "bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-9 text-sm";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-amber-400";

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-slate-900 border-amber-500/20 rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-amber-400" />
              </div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">HPV Admin</h1>
              <p className="text-gray-500 text-xs">Al Habtoor Polo — DeliWer Operations</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Admin Token</label>
                <Input
                  data-testid="input-admin-token"
                  type="password"
                  placeholder="Enter admin token"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value)}
                  className={inputCls}
                  autoFocus
                />
              </div>
              <Button type="submit" data-testid="button-admin-login" className="w-full h-10 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase rounded-xl text-sm">
                <Shield className="w-4 h-4 mr-2" /> Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = statsQ.data;

  const TABS: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "claims", label: "Claims", icon: ClipboardCheck },
    { id: "deals", label: "Deals", icon: Banknote },
    { id: "tours", label: "VR Tours", icon: Video },
    { id: "ndas", label: "NDAs", icon: FileText },
    { id: "blacklist", label: "Blacklist", icon: BanIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── Header ── */}
      <div className="border-b border-white/8 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="font-black text-white text-sm uppercase tracking-tight">Al Habtoor Polo — Admin</p>
              <p className="text-gray-600 text-[10px]">DeliWer Operations Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => { qc.invalidateQueries(); }} className="text-gray-500 hover:text-white h-8 text-xs gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button size="sm" variant="ghost" onClick={logout} className="text-gray-500 hover:text-red-400 h-8 text-xs gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>
        {/* Tab bar */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0">
          {TABS.map(t => (
            <button
              key={t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-black uppercase tracking-wide border-b-2 whitespace-nowrap transition-colors ${tab === t.id ? "border-amber-500 text-amber-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
            >
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ── Overview Tab ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {statsQ.isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-2xl animate-pulse" />)}
              </div>
            ) : stats ? (
              <>
                {/* ── KPI Grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Properties", value: stats.inventory.total, sub: `${stats.inventory.vacant} vacant · ${stats.inventory.rented} rented`, icon: Building, color: "text-amber-400" },
                    { label: "NDA Accepted", value: stats.brokers.nda, sub: `${stats.brokers.blacklisted} blacklisted`, icon: ShieldCheck, color: "text-emerald-400" },
                    { label: "Active Claims", value: stats.claims.active, sub: `${stats.claims.total} total · ${stats.claims.closed} closed`, icon: ClipboardCheck, color: "text-purple-400" },
                    { label: "Deal Reports", value: stats.deals.total, sub: `${stats.deals.verified} verified · ${stats.deals.pending} pending`, icon: Banknote, color: "text-sky-400" },
                    { label: "VR Requests", value: stats.tours.total, sub: `${stats.tours.pending} pending · ${stats.tours.live} live`, icon: Video, color: "text-pink-400" },
                    { label: "Blacklisted", value: stats.brokers.blacklisted, sub: "Permanent ban", icon: BanIcon, color: "text-red-400" },
                    { label: "DeliWer Commission", value: formatM(stats.revenue.deliwerCommissionAed), sub: "From closed deals", icon: TrendingUp, color: "text-emerald-400" },
                    { label: "Hotel Units", value: stats.inventory.hotel, sub: "Stable view · HPV 123-131", icon: Eye, color: "text-sky-400" },
                  ].map(({ label, value, sub, icon: Icon, color }) => (
                    <Card key={label} className="bg-slate-900 border-white/8 rounded-2xl">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <p className={`text-2xl font-black ${color}`}>{value}</p>
                        <p className="text-white text-xs font-bold mt-1">{label}</p>
                        <p className="text-gray-600 text-[10px] mt-0.5">{sub}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ── Property breakdown ── */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "4BR Semi-Detached", count: 24, range: "AED 5.65M – 6.7M", color: "border-amber-500/30" },
                    { label: "5BR Villa (Polo Field 3)", count: 20, range: "AED 12.9M – 14.9M", color: "border-purple-500/30" },
                    { label: "6BR Villa (Stick & Ball)", count: 2, range: "AED 26M", color: "border-sky-500/30" },
                    { label: "4BR Villa (Stable View)", count: 9, range: "AED 17M (Hotel)", color: "border-pink-500/30" },
                  ].map(p => (
                    <div key={p.label} className={`bg-slate-900 border ${p.color} rounded-2xl p-4`}>
                      <p className="font-black text-white text-lg">{p.count}</p>
                      <p className="text-gray-300 text-xs font-bold mt-0.5">{p.label}</p>
                      <p className="text-gray-600 text-[10px] mt-1">{p.range}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* ── Claims Tab ── */}
        {tab === "claims" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-bold">{claimsQ.data?.length || 0} claims total</p>
            </div>
            {claimsQ.isLoading && <div className="h-40 bg-slate-800 rounded-2xl animate-pulse" />}
            {claimsQ.data?.map((c: any) => (
              <div key={c.id} data-testid={`admin-claim-${c.id}`} className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
                <div className="p-4 flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-[10px] font-black border px-2 py-0.5 ${statusPill(c.status)}`}>{c.status}</Badge>
                      <span className="text-white font-black text-sm">{c.brokerName}</span>
                      <span className="text-gray-500 text-xs">{c.brokerPhone}</span>
                    </div>
                    <p className="text-amber-400 text-xs font-bold mt-1">{c.property?.unitType} {c.property?.structureType} · {c.property?.views} · {formatM(c.property?.salePrice)}</p>
                    <p className="text-gray-600 text-[10px] font-mono mt-0.5">{c.deliwerRefCode}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-500 text-[10px]">{fmtDate(c.claimedAt)}</p>
                    <p className="text-gray-700 text-[10px]">Expires {fmtDate(c.expiresAt)}</p>
                    <ChevronDown className={`w-4 h-4 text-gray-600 mt-1 ml-auto transition-transform ${expandedId === c.id ? "rotate-180" : ""}`} />
                  </div>
                </div>
                {expandedId === c.id && (
                  <div className="border-t border-white/8 p-4 bg-slate-950/50 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div><p className={labelCls}>Client</p><p className="text-gray-300">{c.clientName || "—"}</p></div>
                      <div><p className={labelCls}>Client Phone</p><p className="text-gray-300">{c.clientPhone || "—"}</p></div>
                      <div><p className={labelCls}>Nationality</p><p className="text-gray-300">{c.clientNationality || "—"}</p></div>
                      <div><p className={labelCls}>Budget</p><p className="text-gray-300">{c.clientBudget || "—"}</p></div>
                      <div><p className={labelCls}>RERA</p><p className="text-gray-300">{c.reraLicense || "—"}</p></div>
                      <div><p className={labelCls}>Brokerage</p><p className="text-gray-300">{c.brokerage || "—"}</p></div>
                      <div><p className={labelCls}>IP Address</p><p className="text-gray-300 font-mono">{c.ipAddress || "—"}</p></div>
                      <div><p className={labelCls}>Notes</p><p className="text-gray-300">{c.claimNotes || "—"}</p></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["active", "closed", "expired", "disputed", "blacklisted"].map(s => (
                        <Button key={s} size="sm" variant="outline" disabled={c.status === s || patchClaimMut.isPending} onClick={() => patchClaimMut.mutate({ id: c.id, status: s })}
                          className={`h-7 text-xs font-black border rounded-lg ${c.status === s ? "border-amber-500/40 text-amber-400" : "border-white/10 text-gray-500"}`}>
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {claimsQ.data?.length === 0 && <p className="text-gray-600 text-sm text-center py-12">No claims yet.</p>}
          </div>
        )}

        {/* ── Deals Tab ── */}
        {tab === "deals" && (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm font-bold">{dealsQ.data?.length || 0} deal reports</p>
            {dealsQ.isLoading && <div className="h-40 bg-slate-800 rounded-2xl animate-pulse" />}
            {dealsQ.data?.map((d: any) => (
              <div key={d.id} data-testid={`admin-deal-${d.id}`} className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
                <div className="p-4 flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-[10px] font-black border px-2 py-0.5 ${statusPill(d.verificationStatus)}`}>{d.verificationStatus}</Badge>
                      <span className="text-white font-black text-sm">{d.brokerName}</span>
                      <span className="text-gray-500 text-xs">{d.brokerPhone}</span>
                    </div>
                    <p className="text-emerald-400 text-xs font-bold mt-1">{d.property?.unitType} {d.property?.structureType} · {d.property?.views} · Closed: {formatM(d.closingPrice)}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">DeliWer commission: {formatM(d.deliwerCommissionAed)} · Broker: {formatM(d.brokerCommissionAed)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-500 text-[10px]">{fmtDate(d.reportedAt)}</p>
                    <ChevronDown className={`w-4 h-4 text-gray-600 mt-1 ml-auto transition-transform ${expandedId === d.id ? "rotate-180" : ""}`} />
                  </div>
                </div>
                {expandedId === d.id && (
                  <div className="border-t border-white/8 p-4 bg-slate-950/50 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div><p className={labelCls}>Tenant</p><p className="text-gray-300">{d.tenantName || "—"}</p></div>
                      <div><p className={labelCls}>Tenant Phone</p><p className="text-gray-300">{d.tenantPhone || "—"}</p></div>
                      <div><p className={labelCls}>Tenant Email</p><p className="text-gray-300">{d.tenantEmail || "—"}</p></div>
                      <div><p className={labelCls}>Nationality</p><p className="text-gray-300">{d.tenantNationality || "—"}</p></div>
                      <div><p className={labelCls}>RERA Txn No.</p><p className="text-gray-300 font-mono">{d.reraTransactionNo || "—"}</p></div>
                      <div><p className={labelCls}>Channel</p><p className="text-gray-300">{d.closingChannel}</p></div>
                      <div><p className={labelCls}>Claim ID</p><p className="text-gray-300 font-mono text-[10px]">{d.claimId?.slice(0, 12)}...</p></div>
                      <div><p className={labelCls}>Notes</p><p className="text-gray-300">{d.notes || "—"}</p></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["pending", "verified", "disputed", "fraud"].map(s => (
                        <Button key={s} size="sm" variant="outline" disabled={d.verificationStatus === s || patchDealMut.isPending} onClick={() => patchDealMut.mutate({ id: d.id, verificationStatus: s })}
                          className={`h-7 text-xs font-black border rounded-lg ${d.verificationStatus === s ? "border-emerald-500/40 text-emerald-400" : "border-white/10 text-gray-500"}`}>
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {dealsQ.data?.length === 0 && <p className="text-gray-600 text-sm text-center py-12">No deal reports yet.</p>}
          </div>
        )}

        {/* ── VR Tours Tab ── */}
        {tab === "tours" && (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm font-bold">{toursQ.data?.length || 0} VR tour requests</p>
            {toursQ.isLoading && <div className="h-40 bg-slate-800 rounded-2xl animate-pulse" />}
            {toursQ.data?.map((t: any) => (
              <div key={t.id} data-testid={`admin-tour-${t.id}`} className="bg-slate-900 border border-white/8 rounded-2xl p-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`text-[10px] font-black border px-2 py-0.5 ${statusPill(t.status)}`}>{t.status}</Badge>
                    <Badge className="text-[10px] font-black border px-2 py-0.5 bg-purple-500/15 text-purple-400 border-purple-500/30">
                      {t.tourType === "live" ? "🔴 Live" : "📹 Recorded"}
                    </Badge>
                    <span className="text-white font-black text-sm">{t.brokerName}</span>
                    <span className="text-gray-500 text-xs">{t.brokerPhone}</span>
                  </div>
                  <p className="text-purple-400 text-xs font-bold mt-1">{t.property?.unitType} {t.property?.structureType} · {t.property?.views}</p>
                  <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-gray-500">
                    {t.clientName && <span>Client: {t.clientName}</span>}
                    {t.clientPhone && <span>{t.clientPhone}</span>}
                    {t.preferredDate && <span>📅 {t.preferredDate} {t.preferredTime}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gray-500 text-[10px]">{fmtDate(t.requestedAt)}</p>
                  <a
                    href={`https://wa.me/${t.brokerPhone}?text=${encodeURIComponent(`Hi ${t.brokerName}, your VR tour request for the ${t.property?.unitType} ${t.property?.structureType} (${t.property?.views}) has been received. We'll confirm the ${t.tourType === "live" ? "live video call" : "recorded walkthrough"} shortly. — DeliWer`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-[10px] font-bold"
                  >
                    WhatsApp Broker →
                  </a>
                </div>
              </div>
            ))}
            {toursQ.data?.length === 0 && <p className="text-gray-600 text-sm text-center py-12">No VR requests yet.</p>}
          </div>
        )}

        {/* ── NDAs Tab ── */}
        {tab === "ndas" && (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm font-bold">{ndasQ.data?.length || 0} NDA acceptances</p>
            {ndasQ.isLoading && <div className="h-40 bg-slate-800 rounded-2xl animate-pulse" />}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/8 text-gray-600 text-[10px] uppercase tracking-widest">
                    <th className="text-left py-2 pr-4 font-black">Broker</th>
                    <th className="text-left py-2 pr-4 font-black">Phone</th>
                    <th className="text-left py-2 pr-4 font-black">RERA</th>
                    <th className="text-left py-2 pr-4 font-black">Agency</th>
                    <th className="text-left py-2 pr-4 font-black">IP</th>
                    <th className="text-left py-2 font-black">Accepted At</th>
                  </tr>
                </thead>
                <tbody>
                  {ndasQ.data?.map((n: any) => (
                    <tr key={n.id} data-testid={`admin-nda-${n.id}`} className="border-b border-white/5 hover:bg-white/3">
                      <td className="py-2.5 pr-4 text-white font-bold">{n.brokerName}</td>
                      <td className="py-2.5 pr-4 text-gray-400 font-mono">{n.brokerPhone}</td>
                      <td className="py-2.5 pr-4 text-gray-500">{n.reraLicense || "—"}</td>
                      <td className="py-2.5 pr-4 text-gray-500">{n.brokerage || "—"}</td>
                      <td className="py-2.5 pr-4 text-gray-600 font-mono text-[10px]">{n.ipAddress || "—"}</td>
                      <td className="py-2.5 text-gray-500">{fmtDate(n.acceptedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {ndasQ.data?.length === 0 && <p className="text-gray-600 text-sm text-center py-12">No NDA acceptances yet.</p>}
          </div>
        )}

        {/* ── Blacklist Tab ── */}
        {tab === "blacklist" && (
          <div className="space-y-6">
            {/* Add form */}
            <Card className="bg-slate-900 border-red-500/20 rounded-2xl">
              <CardContent className="p-5 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Add to Blacklist</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className={labelCls}>Phone *</label>
                    <Input data-testid="input-blacklist-phone" placeholder="+971 ..." value={blacklistForm.phone} onChange={e => setBlacklistForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls}>Name</label>
                    <Input data-testid="input-blacklist-name" placeholder="Broker name" value={blacklistForm.name} onChange={e => setBlacklistForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls}>Reason *</label>
                    <select value={blacklistForm.reason} onChange={e => setBlacklistForm(p => ({ ...p, reason: e.target.value }))} className="w-full bg-slate-900 border border-white/10 text-white rounded-md h-9 px-3 text-sm">
                      <option value="bypass_deliwer">Bypass DeliWer</option>
                      <option value="poaching">Anti-poaching</option>
                      <option value="fraud">Fraud</option>
                      <option value="nda_breach">NDA breach</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls}>Evidence notes</label>
                    <Input data-testid="input-blacklist-notes" placeholder="Optional notes" value={blacklistForm.notes} onChange={e => setBlacklistForm(p => ({ ...p, notes: e.target.value }))} className={inputCls} />
                  </div>
                </div>
                <Button data-testid="button-add-blacklist" disabled={!blacklistForm.phone || !blacklistForm.reason || addBlacklistMut.isPending} onClick={() => addBlacklistMut.mutate({ brokerPhone: blacklistForm.phone, brokerName: blacklistForm.name || undefined, reason: blacklistForm.reason, evidenceNotes: blacklistForm.notes || undefined })}
                  className="h-9 bg-red-700 hover:bg-red-600 text-white font-black uppercase rounded-xl text-xs px-6">
                  <BanIcon className="w-3.5 h-3.5 mr-1.5" /> Blacklist Broker
                </Button>
              </CardContent>
            </Card>

            {/* Blacklist table */}
            <div className="space-y-3">
              <p className="text-gray-400 text-sm font-bold">{blacklistQ.data?.length || 0} blacklisted brokers</p>
              {blacklistQ.isLoading && <div className="h-24 bg-slate-800 rounded-2xl animate-pulse" />}
              {blacklistQ.data?.map((b: any) => (
                <div key={b.id} data-testid={`admin-blacklist-${b.id}`} className="bg-slate-900 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <UserX className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="text-white font-black text-sm">{b.brokerName || "Unknown"}</span>
                      <span className="text-gray-400 font-mono text-xs">{b.brokerPhone}</span>
                      <Badge className="text-[10px] font-black border px-2 py-0.5 bg-red-900/40 text-red-300 border-red-500/30">
                        {b.reason}
                      </Badge>
                    </div>
                    {b.evidenceNotes && <p className="text-gray-500 text-[10px] mt-1">{b.evidenceNotes}</p>}
                    <p className="text-gray-700 text-[10px] mt-0.5">Added by {b.addedBy} · {fmtDate(b.blacklistedAt)}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => removeBlacklistMut.mutate(b.brokerPhone)} disabled={removeBlacklistMut.isPending}
                    className="h-8 border-white/10 text-gray-500 hover:text-emerald-400 hover:border-emerald-500/30 text-xs font-black rounded-xl shrink-0">
                    <X className="w-3.5 h-3.5 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              {blacklistQ.data?.length === 0 && <p className="text-gray-600 text-sm text-center py-8">No blacklisted brokers.</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
