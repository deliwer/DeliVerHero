import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, DollarSign, Copy, Check, ArrowRight,
  BarChart3, Clock, CheckCircle2, AlertCircle, Search,
  MessageCircle, Star, Zap, BookOpen,
  Shield, Lock, BanIcon, X,
  Video, ClipboardCheck,
  Building, MapPin, Phone, Mail, Calendar, BarChart2, RefreshCw,
  Eye, FileText, ChevronDown, Banknote, UserX, ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

/* ─── Shared utils ─── */
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

/* ─── Partner Dashboard types ─── */
interface DashboardData {
  code: string;
  name: string;
  totalLeads: number;
  confirmedLeads: number;
  totalEarnings: number;
  pendingEarnings: number;
  commissionPercent: number;
  referralLink: string;
  leads: Array<{
    id: string;
    tenantName: string;
    unitSize: string;
    serviceValue: number;
    affiliateCommission: number;
    status: string;
    createdAt: string;
  }>;
}
const STATUS_CONFIG: Record<string, { color: string; label: string; icon: typeof Clock }> = {
  pending: { color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10", label: "Pending", icon: Clock },
  confirmed: { color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10", label: "Confirmed", icon: CheckCircle2 },
  paid: { color: "border-blue-500/30 text-blue-400 bg-blue-500/10", label: "Paid", icon: Star },
};
const TOP_PAGES = [
  { page: "/ejari-dubai", label: "Ejari Registration", conversions: 42 },
  { page: "/start", label: "Move-In Start", conversions: 31 },
  { page: "/move-in-package", label: "Move-In Package", conversions: 19 },
  { page: "/exit-dubai", label: "Exit Dubai", conversions: 11 },
];
function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className={`bg-slate-900 border rounded-2xl p-6 space-y-2 ${color}`}>
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-xs font-medium text-gray-500">{sub}</p>}
    </div>
  );
}

/* ─── HPV Admin tab types ─── */
type HpvTab = "overview" | "claims" | "deals" | "tours" | "ndas" | "blacklist";
const HPV_TABS: { id: HpvTab; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "claims", label: "Claims", icon: ClipboardCheck },
  { id: "deals", label: "Deals", icon: Banknote },
  { id: "tours", label: "VR Tours", icon: Video },
  { id: "ndas", label: "NDAs", icon: FileText },
  { id: "blacklist", label: "Blacklist", icon: BanIcon },
];

/* ─── Top-level mode ─── */
type Mode = "partner" | "hpv";

export default function PartnerDashboard() {
  const { toast } = useToast();
  const qc = useQueryClient();

  /* ── mode switcher ── */
  const [mode, setMode] = useState<Mode>("partner");

  /* ── Partner Dashboard state ── */
  const [code, setCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [copied, setCopied] = useState(false);

  /* ── HPV Admin state ── */
  const [hpvToken, setHpvToken] = useState(() => localStorage.getItem("hpv_admin_token") || "");
  const [hpvTokenInput, setHpvTokenInput] = useState("");
  const [hpvTab, setHpvTab] = useState<HpvTab>("overview");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [blacklistForm, setBlacklistForm] = useState({ phone: "", name: "", reason: "bypass_deliwer", notes: "" });

  const hpvAuthed = !!hpvToken;

  function hpvLogin(e: React.FormEvent) {
    e.preventDefault();
    if (hpvTokenInput === ADMIN_TOKEN || hpvTokenInput === (import.meta.env.VITE_ADMIN_SECRET || "")) {
      localStorage.setItem("hpv_admin_token", hpvTokenInput);
      setHpvToken(hpvTokenInput);
    } else {
      toast({ title: "Invalid token", variant: "destructive" });
    }
  }
  function hpvLogout() { localStorage.removeItem("hpv_admin_token"); setHpvToken(""); }

  /* ── Partner queries ── */
  const { data, isLoading: partnerLoading, isError: partnerError } = useQuery<DashboardData>({
    queryKey: ["/api/affiliate/dashboard", enteredCode],
    enabled: !!enteredCode,
  });

  /* ── HPV queries ── */
  const statsQ   = useQuery({ queryKey: ["/api/habtoor/admin/stats", hpvToken],        queryFn: () => adminFetch("/api/habtoor/admin/stats", hpvToken),               enabled: hpvAuthed });
  const claimsQ  = useQuery({ queryKey: ["/api/habtoor/admin/claims", hpvToken],       queryFn: () => adminFetch("/api/habtoor/admin/claims", hpvToken),              enabled: hpvAuthed && hpvTab === "claims" });
  const dealsQ   = useQuery({ queryKey: ["/api/habtoor/admin/deal-reports", hpvToken], queryFn: () => adminFetch("/api/habtoor/admin/deal-reports", hpvToken),        enabled: hpvAuthed && hpvTab === "deals" });
  const toursQ   = useQuery({ queryKey: ["/api/habtoor/admin/vr-requests", hpvToken],  queryFn: () => adminFetch("/api/habtoor/admin/vr-requests", hpvToken),         enabled: hpvAuthed && hpvTab === "tours" });
  const ndasQ    = useQuery({ queryKey: ["/api/habtoor/admin/ndas", hpvToken],         queryFn: () => adminFetch("/api/habtoor/admin/ndas", hpvToken),                enabled: hpvAuthed && hpvTab === "ndas" });
  const blacklistQ = useQuery({ queryKey: ["/api/habtoor/admin/blacklist", hpvToken],  queryFn: () => adminFetch("/api/habtoor/admin/blacklist", hpvToken),           enabled: hpvAuthed && hpvTab === "blacklist" });

  async function adminApi(method: string, url: string, body?: any) {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-admin-token": hpvToken },
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

  /* ── Partner helpers ── */
  const handleLookup = () => {
    const trimmed = code.trim().toLowerCase().replace(/\s+/g, "");
    if (!trimmed) return;
    setEnteredCode(trimmed);
  };
  const handleCopy = async () => {
    if (!data?.referralLink) return;
    await navigator.clipboard.writeText(data.referralLink);
    setCopied(true);
    toast({ title: "Link Copied", description: "Share this link to earn commission." });
    setTimeout(() => setCopied(false), 2000);
  };

  const estimatedEarnings = data ? data.totalEarnings : 0;
  const pendingEarnings   = data ? data.pendingEarnings : 0;
  const conversionRate    = data && data.totalLeads > 0 ? Math.round((data.confirmedLeads / data.totalLeads) * 100) : 0;

  const inputCls = "bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-9 text-sm";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-amber-400";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Partner Operations Dashboard | DeliWer Dubai"
        description="Unified partner operations dashboard — track referral leads, earnings, Al Habtoor Polo inventory claims, deal reports, and VR tour requests."
      />
      <Navigation />

      {/* ── Hero + Mode Switcher ── */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/10 to-slate-950" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-black text-xs uppercase tracking-wider">Partner Operations Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              Unified Partner<br />
              <span className="text-emerald-400">Dashboard</span>
            </h1>

            {/* Mode switcher */}
            <div className="flex gap-2 flex-wrap pt-2">
              <button
                data-testid="mode-partner"
                onClick={() => setMode("partner")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${mode === "partner" ? "bg-emerald-600 border-emerald-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}
              >
                <Users className="w-3.5 h-3.5" /> Partner Dashboard
              </button>
              <button
                data-testid="mode-hpv"
                onClick={() => setMode("hpv")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${mode === "hpv" ? "bg-amber-600 border-amber-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}
              >
                <Shield className="w-3.5 h-3.5" /> HPV Operations
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNER DASHBOARD MODE
      ══════════════════════════════════════════ */}
      {mode === "partner" && (
        <>
          {/* Lookup */}
          <section className="py-12 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-black uppercase tracking-tight text-white">Look Up Your Stats</h2>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Your referral code is the short identifier after <span className="text-emerald-400 font-mono">?ref=</span> in your link (e.g. <span className="text-emerald-400 font-mono">debacci</span>, <span className="text-emerald-400 font-mono">johnsmith</span>).
                </p>
                <div className="flex gap-3">
                  <Input
                    data-testid="input-partner-code"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLookup()}
                    placeholder="Enter your referral code..."
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12 flex-1"
                  />
                  <Button
                    data-testid="button-lookup-code"
                    onClick={handleLookup}
                    disabled={!code.trim() || partnerLoading}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 px-6"
                  >
                    {partnerLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Look Up <ArrowRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </div>
                {!enteredCode && (
                  <p className="text-[11px] text-gray-600 font-medium">
                    Don't have a code yet?{" "}
                    <Link href="/partners/join" className="text-emerald-400 hover:underline">Join as a partner →</Link>
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Results */}
          {enteredCode && (
            <section className="pb-20 px-4">
              <div className="max-w-4xl mx-auto space-y-8">
                {partnerError && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center space-y-3">
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
                    <h3 className="text-xl font-black text-white uppercase">Code Not Found</h3>
                    <p className="text-gray-400 font-medium text-sm">
                      No partner account found for <span className="text-red-400 font-mono">"{enteredCode}"</span>. Check your code or{" "}
                      <Link href="/partners/join" className="text-emerald-400 hover:underline">register as a partner</Link>.
                    </p>
                  </motion.div>
                )}

                {data && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
                    {/* Partner ID strip */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-4">
                      <div className="flex-1">
                        <p className="text-[11px] font-black uppercase tracking-widest text-emerald-500 mb-1">Partner Account</p>
                        <p className="text-white font-black text-xl">{data.name || enteredCode}</p>
                        <p className="text-emerald-300 font-mono text-xs mt-1">Code: {data.code || enteredCode}</p>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-black px-3 py-1.5 text-xs uppercase">
                        {data.commissionPercent || 20}% Commission Tier
                      </Badge>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard label="Total Leads"     value={String(data.totalLeads)}    sub="All time referrals"  color="border-slate-700" />
                      <StatCard label="Confirmed"       value={String(data.confirmedLeads)} sub="Converted to jobs"  color="border-emerald-500/30" />
                      <StatCard label="Conversion Rate" value={`${conversionRate}%`}        sub="Leads → Bookings"   color="border-blue-500/20" />
                      <StatCard label="Est. Earnings"   value={`AED ${estimatedEarnings}`}  sub={`AED ${pendingEarnings} pending`} color="border-amber-500/20" />
                    </div>

                    {/* Referral Link */}
                    {data.referralLink && (
                      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Your Referral Link</p>
                        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-4 border border-slate-600">
                          <code className="text-sm text-emerald-300 font-mono flex-1 break-all">{data.referralLink}</code>
                          <Button data-testid="button-dashboard-copy-link" size="sm" onClick={handleCopy} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-[11px] text-gray-600 font-medium">Share this link with your network. Every lead is automatically attributed to your account.</p>
                      </div>
                    )}

                    {/* Top Performing Pages */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Top Performing Landing Pages</h3>
                      </div>
                      <div className="space-y-3">
                        {TOP_PAGES.map((pg, i) => (
                          <div key={i} className="flex items-center gap-4" data-testid={`top-page-${i}`}>
                            <div className="text-[11px] font-black text-gray-600 w-4">{i + 1}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-black text-white uppercase">{pg.label}</span>
                                <span className="text-xs font-black text-emerald-400">{pg.conversions} leads</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(pg.conversions / TOP_PAGES[0].conversions) * 100}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-600 font-medium">Platform-wide averages — individual partner data tracked separately via WhatsApp attribution.</p>
                    </div>

                    {/* Lead Table */}
                    {data.leads && data.leads.length > 0 && (
                      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-700 flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <h3 className="text-sm font-black uppercase tracking-widest text-white">Your Leads</h3>
                        </div>
                        <div className="divide-y divide-slate-800">
                          {data.leads.map((lead, i) => {
                            const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG.pending;
                            const Icon = sc.icon;
                            return (
                              <div key={lead.id} className="px-6 py-4 flex items-center gap-4" data-testid={`lead-row-${i}`}>
                                <div className="flex-1 min-w-0">
                                  <p className="font-black text-white text-sm truncate">{lead.tenantName || "Anonymous Lead"}</p>
                                  <p className="text-[11px] text-gray-500 font-medium">{lead.unitSize} · {new Date(lead.createdAt).toLocaleDateString("en-GB")}</p>
                                </div>
                                <div className="text-right space-y-1 shrink-0">
                                  <p className="text-sm font-black text-emerald-400">AED {lead.affiliateCommission}</p>
                                  <p className="text-[10px] text-gray-600">of AED {lead.serviceValue}</p>
                                </div>
                                <Badge className={`${sc.color} border text-[10px] font-black uppercase tracking-wider px-2 py-1 shrink-0`}>
                                  <Icon className="w-3 h-3 mr-1 inline" />{sc.label}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {data.leads && data.leads.length === 0 && (
                      <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-12 text-center space-y-4">
                        <TrendingUp className="w-10 h-10 text-gray-600 mx-auto" />
                        <h3 className="text-lg font-black text-white uppercase">No Leads Yet</h3>
                        <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
                          Share your referral link with tenants and your first lead will appear here.
                        </p>
                        <Link href="/partner-growth-kit">
                          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl mt-2">
                            <BookOpen className="w-4 h-4 mr-2" /> Open Growth Kit
                          </Button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </section>
          )}

          {/* Payout Info */}
          <section className="py-16 px-4 border-t border-white/5 bg-slate-900/30">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: "Monthly Payouts", desc: "Commissions are calculated and paid out at the end of each calendar month.", color: "text-emerald-400" },
                { icon: CheckCircle2, title: "Transparent Attribution", desc: "Every lead is tagged with your referral code automatically — no manual tracking needed.", color: "text-blue-400" },
                { icon: MessageCircle, title: "Questions?", desc: "Message DeliWer on WhatsApp for payout queries, code issues, or account help.", color: "text-purple-400" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                    <h3 className="font-black text-white uppercase text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Footer */}
          <section className="py-16 px-4 text-center border-t border-emerald-500/10 bg-emerald-950/10">
            <div className="max-w-2xl mx-auto space-y-5">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Need More Tools?</h2>
              <p className="text-gray-400 font-medium">Access ready-to-send WhatsApp scripts and sharing templates in the Partner Growth Kit.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/partner-growth-kit">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 px-8" data-testid="button-go-growth-kit">
                    <BookOpen className="w-4 h-4 mr-2" /> Partner Growth Kit
                  </Button>
                </Link>
                <Button size="lg" variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-800 font-black rounded-xl h-12 px-8"
                  onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hi DeliWer, I have a question about my partner dashboard."), "_blank")}
                  data-testid="button-dashboard-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Support
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════
          HPV OPERATIONS MODE
      ══════════════════════════════════════════ */}
      {mode === "hpv" && (
        <>
          {/* Token gate */}
          {!hpvAuthed ? (
            <div className="flex items-center justify-center py-24 px-4">
              <Card className="w-full max-w-sm bg-slate-900 border-amber-500/20 rounded-2xl">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto">
                      <Lock className="w-7 h-7 text-amber-400" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">HPV Operations</h2>
                    <p className="text-gray-500 text-xs">Al Habtoor Polo — DeliWer Admin</p>
                  </div>
                  <form onSubmit={hpvLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className={labelCls}>Admin Token</label>
                      <Input
                        data-testid="input-hpv-token"
                        type="password"
                        placeholder="Enter admin token"
                        value={hpvTokenInput}
                        onChange={e => setHpvTokenInput(e.target.value)}
                        className={inputCls}
                        autoFocus
                      />
                    </div>
                    <Button type="submit" data-testid="button-hpv-login" className="w-full h-10 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase rounded-xl text-sm">
                      <Shield className="w-4 h-4 mr-2" /> Access HPV Admin
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* HPV sub-nav */}
              <div className="border-b border-white/8 bg-slate-950/95 backdrop-blur-md sticky top-[72px] z-30">
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="font-black text-amber-400 text-xs uppercase tracking-widest">Al Habtoor Polo Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => qc.invalidateQueries()} className="text-gray-500 hover:text-white h-7 text-xs gap-1.5">
                      <RefreshCw className="w-3 h-3" /> Refresh
                    </Button>
                    <Button size="sm" variant="ghost" onClick={hpvLogout} className="text-gray-500 hover:text-red-400 h-7 text-xs gap-1.5">
                      <Lock className="w-3 h-3" /> Logout
                    </Button>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
                  {HPV_TABS.map(t => (
                    <button
                      key={t.id}
                      data-testid={`hpv-tab-${t.id}`}
                      onClick={() => setHpvTab(t.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-black uppercase tracking-wide border-b-2 whitespace-nowrap transition-colors ${hpvTab === t.id ? "border-amber-500 text-amber-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
                    >
                      <t.icon className="w-3.5 h-3.5" /> {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Overview */}
                {hpvTab === "overview" && (
                  <div className="space-y-6">
                    {statsQ.isLoading ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-2xl animate-pulse" />)}
                      </div>
                    ) : statsQ.data ? (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: "Total Properties",     value: statsQ.data.inventory.total,           sub: `${statsQ.data.inventory.vacant} vacant · ${statsQ.data.inventory.rented} rented`,         icon: Building,     color: "text-amber-400" },
                            { label: "NDA Accepted",         value: statsQ.data.brokers.nda,               sub: `${statsQ.data.brokers.blacklisted} blacklisted`,                                           icon: ShieldCheck,  color: "text-emerald-400" },
                            { label: "Active Claims",        value: statsQ.data.claims.active,             sub: `${statsQ.data.claims.total} total · ${statsQ.data.claims.closed} closed`,                  icon: ClipboardCheck, color: "text-purple-400" },
                            { label: "Deal Reports",         value: statsQ.data.deals.total,               sub: `${statsQ.data.deals.verified} verified · ${statsQ.data.deals.pending} pending`,            icon: Banknote,     color: "text-sky-400" },
                            { label: "VR Requests",          value: statsQ.data.tours.total,               sub: `${statsQ.data.tours.pending} pending · ${statsQ.data.tours.live} live`,                    icon: Video,        color: "text-pink-400" },
                            { label: "Blacklisted",          value: statsQ.data.brokers.blacklisted,       sub: "Permanent ban",                                                                             icon: BanIcon,      color: "text-red-400" },
                            { label: "DeliWer Commission",   value: formatM(statsQ.data.revenue.deliwerCommissionAed), sub: "From closed deals",                                                             icon: TrendingUp,   color: "text-emerald-400" },
                            { label: "Hotel Units",          value: statsQ.data.inventory.hotel,           sub: "Stable view · HPV 123-131",                                                                icon: Eye,          color: "text-sky-400" },
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: "4BR Semi-Detached",        count: 24, range: "AED 5.65M – 6.7M",  color: "border-amber-500/30" },
                            { label: "5BR Villa (Polo Field 3)", count: 20, range: "AED 12.9M – 14.9M", color: "border-purple-500/30" },
                            { label: "6BR Villa (Stick & Ball)", count: 2,  range: "AED 26M",            color: "border-sky-500/30" },
                            { label: "4BR Villa (Stable View)",  count: 9,  range: "AED 17M (Hotel)",    color: "border-pink-500/30" },
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

                {/* Claims */}
                {hpvTab === "claims" && (
                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm font-bold">{claimsQ.data?.length || 0} claims total</p>
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
                                <Button key={s} size="sm" variant="outline" disabled={c.status === s || patchClaimMut.isPending}
                                  onClick={() => patchClaimMut.mutate({ id: c.id, status: s })}
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

                {/* Deals */}
                {hpvTab === "deals" && (
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
                                <Button key={s} size="sm" variant="outline" disabled={d.verificationStatus === s || patchDealMut.isPending}
                                  onClick={() => patchDealMut.mutate({ id: d.id, verificationStatus: s })}
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

                {/* VR Tours */}
                {hpvTab === "tours" && (
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
                            target="_blank" rel="noopener noreferrer"
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

                {/* NDAs */}
                {hpvTab === "ndas" && (
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

                {/* Blacklist */}
                {hpvTab === "blacklist" && (
                  <div className="space-y-6">
                    <Card className="bg-slate-900 border-red-500/20 rounded-2xl">
                      <CardContent className="p-5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Add to Blacklist</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label className={labelCls}>Phone *</label>
                            <Input data-testid="input-blacklist-phone" placeholder="+971 ..." value={blacklistForm.phone}
                              onChange={e => setBlacklistForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Name</label>
                            <Input data-testid="input-blacklist-name" placeholder="Broker name" value={blacklistForm.name}
                              onChange={e => setBlacklistForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Reason *</label>
                            <select value={blacklistForm.reason} onChange={e => setBlacklistForm(p => ({ ...p, reason: e.target.value }))}
                              className="w-full bg-slate-900 border border-white/10 text-white rounded-md h-9 px-3 text-sm">
                              <option value="bypass_deliwer">Bypass DeliWer</option>
                              <option value="poaching">Anti-poaching</option>
                              <option value="fraud">Fraud</option>
                              <option value="nda_breach">NDA breach</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Evidence notes</label>
                            <Input data-testid="input-blacklist-notes" placeholder="Optional notes" value={blacklistForm.notes}
                              onChange={e => setBlacklistForm(p => ({ ...p, notes: e.target.value }))} className={inputCls} />
                          </div>
                        </div>
                        <Button data-testid="button-add-blacklist"
                          disabled={!blacklistForm.phone || !blacklistForm.reason || addBlacklistMut.isPending}
                          onClick={() => addBlacklistMut.mutate({ brokerPhone: blacklistForm.phone, brokerName: blacklistForm.name || undefined, reason: blacklistForm.reason, evidenceNotes: blacklistForm.notes || undefined })}
                          className="h-9 bg-red-700 hover:bg-red-600 text-white font-black uppercase rounded-xl text-xs px-6">
                          <BanIcon className="w-3.5 h-3.5 mr-1.5" /> Blacklist Broker
                        </Button>
                      </CardContent>
                    </Card>
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
                              <Badge className="text-[10px] font-black border px-2 py-0.5 bg-red-900/40 text-red-300 border-red-500/30">{b.reason}</Badge>
                            </div>
                            {b.evidenceNotes && <p className="text-gray-500 text-[10px] mt-1">{b.evidenceNotes}</p>}
                            <p className="text-gray-700 text-[10px] mt-0.5">Added by {b.addedBy} · {fmtDate(b.blacklistedAt)}</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => removeBlacklistMut.mutate(b.brokerPhone)}
                            disabled={removeBlacklistMut.isPending}
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
            </>
          )}
        </>
      )}
    </div>
  );
}
