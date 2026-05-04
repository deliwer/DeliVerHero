import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import {
  UserPlus, Send, ShieldCheck, Copy, Check, ExternalLink,
  ChevronDown, Download, TrendingUp, Users, DollarSign, Star,
  Phone, MapPin, StickyNote, Eye, EyeOff,
} from "lucide-react";

type Referrer = { id: string; name: string; phone: string; role: string; refCode: string; createdAt: string };
type Lead = { id: string; refCode: string; clientName: string; phone: string; location: string | null; type: string | null; notes: string | null; status: string; commissionAmount: number; payoutStatus: string; createdAt: string };
type Stats = { total: number; closed: number; contacted: number; totalCommission: number; pendingPayout: number; referrerCount: number };

const STATUS_DARK: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  contacted: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  closed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

const PAYOUT_DARK: Record<string, string> = {
  pending: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  paid: "bg-purple-500/20 text-purple-300 border-purple-500/40",
};

const ROLES = ["agent", "broker", "tenant", "guard", "developer", "other"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Building", "Project"];

function useAdminMode() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("admin") === "true";
}

type ActiveTab = "join" | "submit" | "admin";

export default function ReferralEngine() {
  const isAdminParam = useAdminMode();
  const [activeTab, setActiveTab] = useState<ActiveTab>(isAdminParam ? "admin" : "join");

  // ── Join form state ────────────────────────────────────────────────────────
  const [joinForm, setJoinForm] = useState({ name: "", phone: "", role: "agent" });
  const [joinResult, setJoinResult] = useState<{ referrer: Referrer; waUrl: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // ── Lead form state ────────────────────────────────────────────────────────
  const [leadForm, setLeadForm] = useState({ refCode: "", clientName: "", phone: "", location: "", type: "", notes: "" });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [codeError, setCodeError] = useState("");

  // ── Admin state ────────────────────────────────────────────────────────────
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // ── Queries ────────────────────────────────────────────────────────────────
  const { data: stats } = useQuery<Stats>({ queryKey: ["/api/marketing-referral/stats"] });
  const { data: leads = [], isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/marketing-referral/leads"],
    enabled: adminAuthed,
  });

  // ── Mutations ──────────────────────────────────────────────────────────────
  const joinMutation = useMutation({
    mutationFn: (body: typeof joinForm) => apiRequest("POST", "/api/marketing-referral/referrers", body),
    onSuccess: async (res) => {
      const data = await res.json();
      setJoinResult(data);
      showToast("🎉 Code generated!");
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (body: typeof leadForm) => {
      setCodeError("");
      const res = await apiRequest("POST", "/api/marketing-referral/leads", body);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }
      return res.json();
    },
    onSuccess: () => {
      setLeadSuccess(true);
      setLeadForm({ refCode: "", clientName: "", phone: "", location: "", type: "", notes: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-referral/stats"] });
      showToast("✅ Lead submitted!");
    },
    onError: (err: Error) => setCodeError(err.message),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/marketing-referral/leads/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-referral/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-referral/stats"] });
      showToast("Status updated");
    },
  });

  const payoutMutation = useMutation({
    mutationFn: ({ id, payoutStatus }: { id: string; payoutStatus: string }) =>
      apiRequest("PATCH", `/api/marketing-referral/leads/${id}/status`, { status: leads.find(l => l.id === id)?.status || "new", payoutStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-referral/leads"] });
      showToast("Payout status updated");
    },
  });

  const verifyAdmin = async () => {
    const res = await apiRequest("POST", "/api/marketing-referral/admin/verify", { password: adminPassword });
    if (res.ok) { setAdminAuthed(true); setAuthError(""); }
    else setAuthError("Incorrect password");
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const TABS: { id: ActiveTab; label: string }[] = [
    { id: "join", label: "Join & Get Code" },
    { id: "submit", label: "Submit Lead" },
    { id: "admin", label: "Admin Panel" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black text-sm font-black px-5 py-2.5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black">Referral Engine</h1>
            <p className="text-gray-500 text-sm mt-0.5">DeliWer Marketing — powered by PostgreSQL</p>
          </div>
          <a
            href="/marketing/referral-engine?admin=true"
            className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-white/20 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Referrers", value: stats?.referrerCount ?? "—", icon: "🤝", color: "text-white" },
            { label: "Total Leads", value: stats?.total ?? "—", icon: "📥", color: "text-blue-400" },
            { label: "Deals Closed", value: stats?.closed ?? "—", icon: "✅", color: "text-emerald-400" },
            { label: "Commission", value: stats ? `${stats.totalCommission.toLocaleString()} AED` : "—", icon: "💰", color: "text-amber-400" },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {TABS.map(t => (
            <button
              key={t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition ${activeTab === t.id ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: JOIN ── */}
        {activeTab === "join" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {!joinResult ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-black text-lg">Join & Get Your Referral Code</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      data-testid="input-join-name"
                      value={joinForm.name}
                      onChange={e => setJoinForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Ahmed Al Rashid"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      data-testid="input-join-phone"
                      value={joinForm.phone}
                      onChange={e => setJoinForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+971 50 000 0000"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 text-sm transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Your Role *</label>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map(r => (
                      <button
                        key={r}
                        data-testid={`role-${r}`}
                        onClick={() => setJoinForm(f => ({ ...f, role: r }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black capitalize transition border ${joinForm.role === r ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300" : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  data-testid="button-join-submit"
                  onClick={() => joinMutation.mutate(joinForm)}
                  disabled={!joinForm.name.trim() || !joinForm.phone.trim() || joinMutation.isPending}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-black text-sm transition flex items-center justify-center gap-2"
                >
                  {joinMutation.isPending
                    ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    : <><UserPlus className="w-4 h-4" /> Generate My Code</>}
                </button>
              </div>
            ) : (
              <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Welcome, {joinResult.referrer.name}! Your referral code is:</p>
                  <div className="mt-3 py-4 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl inline-block">
                    <span className="text-4xl font-black text-emerald-400 tracking-widest font-mono">{joinResult.referrer.refCode}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Use this code when submitting leads or share it with clients</p>
                </div>

                {/* WhatsApp link */}
                <div className="bg-[#075E54]/20 border border-[#25D366]/20 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-bold text-[#25D366]">Your personalised WhatsApp link</p>
                  <p className="text-[11px] text-gray-500 font-mono break-all">{joinResult.waUrl}</p>
                  <div className="flex gap-2">
                    <button
                      data-testid="button-copy-waurl"
                      onClick={() => copyText(joinResult.waUrl, "waurl")}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition flex items-center justify-center gap-2 ${copied === "waurl" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"}`}
                    >
                      {copied === "waurl" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === "waurl" ? "Copied!" : "Copy Link"}
                    </button>
                    <a
                      href={joinResult.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-share-whatsapp"
                      className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] text-black text-xs font-black transition flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Share on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyText(joinResult.referrer.refCode, "code")}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition flex items-center justify-center gap-2 ${copied === "code" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"}`}
                  >
                    {copied === "code" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === "code" ? "Copied!" : "Copy Code"}
                  </button>
                  <button
                    onClick={() => { setJoinResult(null); setJoinForm({ name: "", phone: "", role: "agent" }); setActiveTab("submit"); }}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-black transition"
                  >
                    Submit a Lead →
                  </button>
                </div>
              </div>
            )}

            {/* Commission info */}
            <div className="bg-white/3 border border-white/5 rounded-xl p-4">
              <p className="text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">Commission Structure</p>
              <div className="flex gap-3">
                {[
                  { status: "Contacted", amount: "100 AED", color: "text-amber-400" },
                  { status: "Closed", amount: "500 AED", color: "text-emerald-400" },
                ].map(c => (
                  <div key={c.status} className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                    <div className={`text-xl font-black ${c.color}`}>{c.amount}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">When {c.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: SUBMIT LEAD ── */}
        {activeTab === "submit" && (
          <div className="animate-in fade-in duration-200">
            {leadSuccess ? (
              <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Lead Submitted!</h3>
                  <p className="text-sm text-gray-400 mt-1">Our team will follow up within 24 hours. Commission will be added when the deal is closed.</p>
                </div>
                <button
                  onClick={() => setLeadSuccess(false)}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-black rounded-xl transition"
                >
                  Submit Another Lead
                </button>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-black text-lg">Submit a Lead</h2>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Your Referral Code *</label>
                  <input
                    type="text"
                    data-testid="input-ref-code"
                    value={leadForm.refCode}
                    onChange={e => { setLeadForm(f => ({ ...f, refCode: e.target.value.toUpperCase() })); setCodeError(""); }}
                    placeholder="DLW-1001"
                    className={`w-full px-3 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 outline-none text-sm transition font-mono ${codeError ? "border-red-500/50" : "border-white/10 focus:border-emerald-500/50"}`}
                  />
                  {codeError && <p className="text-xs text-red-400 mt-1">{codeError}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Client Name *</label>
                    <input
                      type="text"
                      data-testid="input-client-name"
                      value={leadForm.clientName}
                      onChange={e => setLeadForm(f => ({ ...f, clientName: e.target.value }))}
                      placeholder="Mohammed Al Ali"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Client Phone *
                    </label>
                    <input
                      type="tel"
                      data-testid="input-client-phone"
                      value={leadForm.phone}
                      onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+971 55 000 0000"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 text-sm transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Location
                    </label>
                    <input
                      type="text"
                      data-testid="input-location"
                      value={leadForm.location}
                      onChange={e => setLeadForm(f => ({ ...f, location: e.target.value }))}
                      placeholder="Downtown Dubai"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Property Type</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {PROPERTY_TYPES.map(t => (
                        <button
                          key={t}
                          data-testid={`type-${t.toLowerCase()}`}
                          onClick={() => setLeadForm(f => ({ ...f, type: t }))}
                          className={`px-3 py-2 rounded-lg text-xs font-black transition border ${leadForm.type === t ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block flex items-center gap-1">
                    <StickyNote className="w-3 h-3" /> Notes
                  </label>
                  <textarea
                    data-testid="input-notes"
                    value={leadForm.notes}
                    onChange={e => setLeadForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any relevant details about the client..."
                    rows={3}
                    className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 text-sm transition resize-none"
                  />
                </div>

                <button
                  data-testid="button-submit-lead"
                  onClick={() => leadMutation.mutate(leadForm)}
                  disabled={!leadForm.refCode.trim() || !leadForm.clientName.trim() || !leadForm.phone.trim() || leadMutation.isPending}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-black text-sm transition flex items-center justify-center gap-2"
                >
                  {leadMutation.isPending
                    ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    : <><Send className="w-4 h-4" /> Submit Lead</>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: ADMIN ── */}
        {activeTab === "admin" && (
          <div className="animate-in fade-in duration-200 space-y-4">
            {!adminAuthed ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-sm mx-auto text-center space-y-4">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                <div>
                  <h2 className="font-black text-lg">Admin Access</h2>
                  <p className="text-gray-500 text-sm mt-1">Enter your admin password to view the lead dashboard</p>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    data-testid="input-admin-password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && verifyAdmin()}
                    placeholder="Enter password"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 outline-none text-sm transition pr-10 ${authError ? "border-red-500/50" : "border-white/10 focus:border-emerald-500/50"}`}
                  />
                  <button onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && <p className="text-xs text-red-400">{authError}</p>}
                <button
                  data-testid="button-admin-login"
                  onClick={verifyAdmin}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition"
                >
                  Unlock Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Admin stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Leads", value: stats?.total ?? 0, color: "text-white" },
                    { label: "Closed Deals", value: stats?.closed ?? 0, color: "text-emerald-400" },
                    { label: "Total Commission", value: `${(stats?.totalCommission ?? 0).toLocaleString()} AED`, color: "text-amber-400" },
                  ].map(s => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Pending payout alert */}
                {(stats?.pendingPayout ?? 0) > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-amber-300">⏳ Pending payouts: {stats!.pendingPayout.toLocaleString()} AED</p>
                    <a href="/api/marketing-referral/leads/export" target="_blank" className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 transition">
                      <Download className="w-3.5 h-3.5" /> Export
                    </a>
                  </div>
                )}

                {/* Leads table */}
                {leadsLoading ? (
                  <div className="bg-white/5 rounded-xl p-12 text-center">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : leads.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>No leads yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {leads.map(lead => (
                      <div key={lead.id} data-testid={`admin-lead-${lead.id}`}
                        className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 flex items-center gap-3 flex-wrap transition">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black text-xs text-white flex-shrink-0">
                          {lead.clientName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-white text-sm">{lead.clientName}</p>
                            <span className="font-mono text-[10px] font-black bg-white/5 border border-white/10 text-gray-400 px-1.5 py-0.5 rounded">{lead.refCode}</span>
                            {lead.commissionAmount > 0 && (
                              <span className="text-[10px] font-black text-amber-400">+{lead.commissionAmount} AED</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-xs text-gray-500">{lead.phone}</span>
                            {lead.location && <span className="text-xs text-gray-500">· {lead.location}</span>}
                            {lead.type && <span className="text-xs text-gray-500">· {lead.type}</span>}
                          </div>
                          {lead.notes && <p className="text-xs text-gray-600 mt-0.5 truncate">{lead.notes}</p>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_DARK[lead.status]}`}>
                            {lead.status.toUpperCase()}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PAYOUT_DARK[lead.payoutStatus]}`}>
                            {lead.payoutStatus}
                          </span>
                          <div className="relative">
                            <select
                              data-testid={`status-select-${lead.id}`}
                              value={lead.status}
                              onChange={e => statusMutation.mutate({ id: lead.id, status: e.target.value })}
                              className="appearance-none pl-2 pr-6 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-200 outline-none focus:border-emerald-500/50 cursor-pointer transition"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted (+100)</option>
                              <option value="closed">Closed (+500)</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select
                              data-testid={`payout-select-${lead.id}`}
                              value={lead.payoutStatus}
                              onChange={e => payoutMutation.mutate({ id: lead.id, payoutStatus: e.target.value })}
                              className="appearance-none pl-2 pr-6 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-200 outline-none focus:border-emerald-500/50 cursor-pointer transition"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid ✓</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.clientName}, this is DeliWer. We'd like to follow up on your home setup enquiry.`)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="px-2 py-1.5 bg-[#25D366]/80 hover:bg-[#25D366] text-black rounded-lg text-[10px] font-black transition"
                          >
                            WA
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
