import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { initTracker, getTracking, buildWhatsAppURL, submitLead, fetchSheetData, DEMO_LEADS, LeadPayload } from "@/lib/marketing-tracker";

type TabId = "overview" | "leads" | "partners";

export default function MarketingHub() {
  const [form, setForm] = useState({ name: "", phone: "", intent: "move" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [copied, setCopied] = useState("");
  const [tab, setTab] = useState<TabId>("overview");
  const [filter, setFilter] = useState("all");
  const tracking = getTracking();

  useEffect(() => {
    initTracker();
    document.title = "DeliWer Marketing Hub | Founder Command";
    fetchSheetData().then((data) => {
      setLeads(data.length > 0 ? data : DEMO_LEADS);
    });
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const todayLeads = leads.filter((l) => String(l.timestamp).slice(0, 10) === today);
    const closed = leads.filter((l) => l.status === "Closed");
    const totalRevenue = leads.reduce((s, l) => s + (Number(l.revenue) || 0), 0);
    const totalPartnerShare = leads.reduce((s, l) => s + (Number(l.partnerShare) || 0), 0);
    const partners = new Set(leads.map((l) => l.source).filter((s) => s && s !== "organic"));
    const convRate = leads.length > 0 ? Math.round((closed.length / leads.length) * 100) : 0;
    const revenuePerLead = leads.length > 0 ? Math.round(totalRevenue / leads.length) : 0;
    return {
      todayLeads: todayLeads.length,
      totalLeads: leads.length,
      closed: closed.length,
      convRate,
      totalRevenue,
      totalPartnerShare,
      netRevenue: totalRevenue - totalPartnerShare,
      activePartners: partners.size,
      revenuePerLead,
    };
  }, [leads, today]);

  const partnerBreakdown = useMemo(() => {
    const map: Record<string, { name: string; leads: number; closed: number; revenue: number; partnerShare: number }> = {};
    for (const l of leads) {
      const src = l.source || "organic";
      if (!map[src]) map[src] = { name: src, leads: 0, closed: 0, revenue: 0, partnerShare: 0 };
      map[src].leads++;
      if (l.status === "Closed") map[src].closed++;
      map[src].revenue += Number(l.revenue) || 0;
      map[src].partnerShare += Number(l.partnerShare) || 0;
    }
    return Object.values(map).sort((a, b) => b.leads - a.leads);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((l) => l.status === filter);
  }, [leads, filter]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload: LeadPayload = {
      name: form.name,
      phone: form.phone,
      intent: form.intent,
      ref: tracking.ref,
      utm_source: tracking.utmSource,
      utm_campaign: tracking.utmCampaign,
    };
    await submitLead(payload);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = buildWhatsAppURL(form.intent, tracking.ref, form.name);
    }, 1200);
  }

  function copyLink(ref: string) {
    const url = `${window.location.origin}/marketing?ref=${ref}`;
    navigator.clipboard.writeText(url);
    setCopied(ref);
    setTimeout(() => setCopied(""), 2000);
  }

  const dateStr = new Date().toLocaleDateString("en-AE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "leads", label: "Leads" },
    { id: "partners", label: "Partners" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tight">DELIWER</span>
            <span className="hidden sm:inline text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Marketing Hub
            </span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing/leaderboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" data-testid="nav-leaderboard">Leaderboard</Link>
            <Link href="/marketing/recruit" className="text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" data-testid="nav-recruit">Recruit</Link>
            <Link href="/marketing/founder-dashboard" className="text-xs px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all" data-testid="nav-command">Command</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Founder Overview</h1>
            <p className="text-gray-500 text-sm">{dateStr}</p>
          </div>
          <a
            href={buildWhatsAppURL("general", "hub")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition-all shrink-0"
            data-testid="button-open-whatsapp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Leads Today", value: stats.todayLeads, sub: "new enquiries", icon: "📥", color: "text-white" },
            { label: "Total Leads", value: stats.totalLeads, sub: "all time", icon: "👥", color: "text-blue-400" },
            { label: "Conversion", value: `${stats.convRate}%`, sub: `${stats.closed} closed`, icon: "📈", color: "text-emerald-400" },
            { label: "Partners", value: stats.activePartners, sub: "active sources", icon: "🤝", color: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid={`kpi-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs font-medium mt-0.5 text-white/70">{s.label}</div>
              <div className="text-xs text-gray-600">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Revenue Strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Gross Revenue", value: `${stats.totalRevenue.toLocaleString()} AED`, color: "text-white" },
            { label: "Partner Payouts", value: `${stats.totalPartnerShare.toLocaleString()} AED`, color: "text-amber-400" },
            { label: "Net Revenue", value: `${stats.netRevenue.toLocaleString()} AED`, color: "text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/10 pb-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                tab === t.id
                  ? "text-white border-emerald-500"
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
              data-testid={`tab-${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Recruit Banner */}
            <Link href="/marketing/recruit" data-testid="section-recruit-cta">
              <div className="group relative bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent group-hover:from-emerald-500/10 transition-all" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-2xl">📡</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full">Founder Only</span>
                      </div>
                      <h3 className="font-black text-white text-lg leading-tight">Broker Recruitment Engine</h3>
                      <p className="text-slate-400 text-sm mt-0.5">
                        Auto-import &amp; email <strong className="text-emerald-400">32,302 licensed RERA brokers</strong> — Day-2 &amp; Day-5 follow-ups run automatically
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-500 group-hover:bg-emerald-400 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap">
                    Open →
                  </span>
                </div>
              </div>
            </Link>

            {/* Partner Funnel Map */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full">Partner Funnel</span>
                  <h3 className="font-black text-white text-lg mt-2">End-to-End Earning Path</h3>
                  <p className="text-slate-400 text-sm mt-1">From cold broker → activated partner → recurring commission across DeliWer + DAMAC.</p>
                </div>
                <Link href="/partners" className="text-xs px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg font-bold transition-all" data-testid="link-funnel-partners">
                  Public Funnel →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { step: "01", title: "Recruit", desc: "Auto-email 32k RERA brokers", href: "/marketing/recruit", color: "emerald", icon: "📡" },
                  { step: "02", title: "Activate", desc: "Onboard via /partners funnel", href: "/partners", color: "cyan", icon: "🤝" },
                  { step: "03", title: "Equip", desc: "Broker desk + DAMAC inventory", href: "/broker-partner", color: "amber", icon: "🏢" },
                  { step: "04", title: "Earn", desc: "Move-in + DAMAC commissions", href: "/marketing/leaderboard", color: "purple", icon: "💸" },
                ].map((s) => (
                  <Link key={s.step} href={s.href} data-testid={`funnel-step-${s.step}`}>
                    <div className="bg-slate-950/70 hover:bg-slate-900 border border-white/10 hover:border-emerald-500/40 rounded-xl p-4 h-full transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{s.icon}</span>
                        <span className="text-[10px] font-black text-gray-600 tracking-widest">{s.step}</span>
                      </div>
                      <div className="text-white font-black text-sm mb-1">{s.title}</div>
                      <div className="text-xs text-gray-500 leading-snug">{s.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* DAMAC Distress Earning Source */}
            <div className="relative bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative grid lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">🔥 Live Earning Source</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-300 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full">Reset Market</span>
                  </div>
                  <h3 className="font-black text-white text-xl mb-2">DAMAC Distress Inventory — Plug Brokers Into the Highest-Ticket Funnel</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Route recruited brokers from the partner funnel directly into DAMAC distress deals — villas, branded apartments and Business Bay commercial. Pre-portal access, motivated sellers, AED 25k+ avg payout per close.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-3 text-center">
                      <div className="text-xl font-black text-amber-300">120+</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Live distress units</div>
                    </div>
                    <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-3 text-center">
                      <div className="text-xl font-black text-amber-300">70%</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Top broker split</div>
                    </div>
                    <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-3 text-center">
                      <div className="text-xl font-black text-amber-300">25k+</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">AED per close</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/realestate#career" className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-lg text-xs transition-all" data-testid="link-damac-broker-opp">
                      🏆 Broker Opportunity →
                    </Link>
                    <Link href="/realestate#offers" className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold px-4 py-2 rounded-lg text-xs transition-all" data-testid="link-damac-inventory">
                      📋 Live Inventory
                    </Link>
                    <a href={buildWhatsAppURL("damac", "marketing-hub")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold px-4 py-2 rounded-lg text-xs transition-all" data-testid="link-damac-whatsapp">
                      💬 WhatsApp Recruiter
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-4">
                    <div className="text-[10px] uppercase tracking-widest text-amber-300 font-black mb-3">Inventory Snapshot</div>
                    {[
                      { name: "DAMAC Hills 2 Villas", count: 38, tag: "-22%" },
                      { name: "DAMAC Lagoons TH", count: 27, tag: "-18%" },
                      { name: "Bay by Cavalli", count: 19, tag: "Excl." },
                      { name: "Business Bay Comm.", count: 41, tag: "Lease" },
                    ].map((row) => (
                      <div key={row.name} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-b-0">
                        <div>
                          <div className="text-xs text-white font-semibold">{row.name}</div>
                          <div className="text-[10px] text-gray-600">{row.count} units live</div>
                        </div>
                        <span className="text-[10px] font-black text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-full px-2 py-0.5">{row.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Breakdown + Lead Form side by side */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <h3 className="font-bold text-sm">Lead Status Breakdown</h3>
                {(["New", "Contacted", "Closed"] as const).map((status) => {
                  const count = leads.filter((l) => l.status === status).length;
                  const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                  return (
                    <div key={status} className="mb-3" data-testid={`status-bar-${status.toLowerCase()}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{status}</span>
                        <span className="font-semibold">{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            status === "Closed" ? "bg-emerald-500" :
                            status === "Contacted" ? "bg-blue-500" : "bg-gray-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <h3 className="font-bold text-sm pt-2">Intent Breakdown</h3>
                {["move", "renew", "exit", "ejari", "dewa"].map((intent) => {
                  const count = leads.filter((l) => l.intent === intent).length;
                  const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                  const icons: Record<string, string> = { move: "🏠", renew: "🔄", exit: "🚪", ejari: "📄", dewa: "⚡" };
                  return count > 0 ? (
                    <div key={intent} className="flex items-center gap-3 mb-2" data-testid={`intent-${intent}`}>
                      <span className="text-base">{icons[intent]}</span>
                      <div className="flex-1">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 w-20 text-right capitalize">{intent} — {count}</span>
                    </div>
                  ) : null;
                })}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-1">Submit a Lead</h2>
                <p className="text-gray-400 text-sm mb-5">Fill in details and we'll send them straight to WhatsApp</p>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="text-emerald-400 font-semibold">Lead captured! Redirecting to WhatsApp...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
                      <input
                        type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Ahmed Hassan"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Phone (WhatsApp)</label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+971 50 000 0000"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Intent</label>
                      <select
                        value={form.intent}
                        onChange={(e) => setForm({ ...form, intent: e.target.value })}
                        className="w-full bg-[#0a0f1e] border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-colors"
                        data-testid="select-intent"
                      >
                        <option value="move">Moving In</option>
                        <option value="renew">Renewing / Cheaper Rent</option>
                        <option value="exit">Leaving Dubai</option>
                        <option value="ejari">Ejari Registration</option>
                        <option value="dewa">DEWA Activation</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <span className="text-xs text-blue-300">Source: <strong>{tracking.ref}</strong></span>
                    </div>
                    <button
                      type="submit" disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all"
                      data-testid="button-submit-lead"
                    >
                      {loading ? "Sending..." : "Submit & Open WhatsApp →"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Referral Link Generator */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-1">Referral Link Generator</h3>
              <p className="text-gray-400 text-sm mb-5">Copy a tracking link for each partner or campaign to share.</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {["broker", "whatsapp", "instagram", "tiktok", "email", "custom"].map((ref) => {
                  const url = `${typeof window !== "undefined" ? window.location.origin : "https://deliwer.com"}/marketing?ref=${ref}`;
                  return (
                    <div key={ref} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white capitalize">{ref}</div>
                        <div className="text-[10px] text-gray-600 truncate">?ref={ref}</div>
                      </div>
                      <button
                        onClick={() => copyLink(ref)}
                        className="text-xs px-2.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 rounded-lg transition-all shrink-0 font-semibold"
                        data-testid={`copy-link-${ref}`}
                      >
                        {copied === ref ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── LEADS TAB ── */}
        {tab === "leads" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2 flex-wrap">
              {["all", "New", "Contacted", "Closed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                    filter === f ? "bg-emerald-500 text-black font-semibold" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                  data-testid={`filter-${f.toLowerCase()}`}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-500">{filteredLeads.length} leads</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Date", "Name", "Phone", "Intent", "Source", "Status", "Revenue"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors" data-testid={`lead-${i}`}>
                      <td className="px-4 py-3 text-gray-500 text-xs">{String(lead.timestamp).slice(0, 10)}</td>
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{lead.phone}</td>
                      <td className="px-4 py-3 capitalize text-gray-400 text-xs">{lead.intent}</td>
                      <td className="px-4 py-3 text-blue-400 text-xs">{lead.source}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          lead.status === "Closed" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" :
                          lead.status === "Contacted" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" :
                          "bg-gray-500/15 text-gray-400 border-gray-500/30"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-amber-400 font-semibold text-xs">
                        {lead.revenue ? `${Number(lead.revenue).toLocaleString()} AED` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PARTNERS TAB ── */}
        {tab === "partners" && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10">
                <h3 className="font-bold text-sm">Partner Performance Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Partner", "Leads", "Closed", "Conv %", "Revenue", "Their Cut", "Net"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {partnerBreakdown.map((p, i) => (
                      <tr key={p.name} className="border-b border-white/5 hover:bg-white/3 transition-colors" data-testid={`partner-row-${i}`}>
                        <td className="px-4 py-3 font-semibold">{p.name}</td>
                        <td className="px-4 py-3">{p.leads}</td>
                        <td className="px-4 py-3 text-emerald-400">{p.closed}</td>
                        <td className="px-4 py-3 text-blue-400">
                          {p.leads > 0 ? Math.round((p.closed / p.leads) * 100) : 0}%
                        </td>
                        <td className="px-4 py-3 text-white">{p.revenue.toLocaleString()} AED</td>
                        <td className="px-4 py-3 text-amber-400">{p.partnerShare.toLocaleString()} AED</td>
                        <td className="px-4 py-3 text-emerald-400 font-semibold">
                          {(p.revenue - p.partnerShare).toLocaleString()} AED
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Commission Tiers */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-1">Partner Commission Tiers</h3>
              <p className="text-gray-400 text-sm mb-5">Tiered payouts to incentivise volume referrals.</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { tier: "Starter", range: "1–5 leads", rate: "15%", color: "border-gray-500/30 text-gray-400" },
                  { tier: "Growth", range: "6–15 leads", rate: "25%", color: "border-blue-500/30 text-blue-400" },
                  { tier: "Elite", range: "16+ leads", rate: "35%", color: "border-emerald-500/30 text-emerald-400" },
                ].map((t) => (
                  <div key={t.tier} className={`border rounded-xl p-5 text-center ${t.color}`}>
                    <div className="text-3xl font-black mb-1">{t.rate}</div>
                    <div className="text-sm font-bold uppercase tracking-widest">{t.tier}</div>
                    <div className="text-xs mt-1 opacity-70">{t.range}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-400 mb-1">Earn With DeliWer</h3>
              <p className="text-gray-400 text-sm mb-3">Know someone moving? Share your link and earn up to 35% per closed deal.</p>
              <Link href="/marketing/partners" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-all" data-testid="cta-become-partner">
                Become a Partner →
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Footer Stats */}
      <div className="border-t border-white/10 py-10 px-4 mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: "900 AED", label: "from", sub: "Move-Out Package" },
            { value: "35%", label: "partner commission", sub: "per closed deal" },
            { value: "24h", label: "response time", sub: "WhatsApp-first" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
