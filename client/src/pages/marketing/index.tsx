import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { initTracker, getTracking, buildWhatsAppURL, submitLead, fetchSheetData, DEMO_LEADS, LeadPayload } from "@/lib/marketing-tracker";

export default function MarketingHub() {
  const [form, setForm] = useState({ name: "", phone: "", intent: "move" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [copied, setCopied] = useState("");
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
    return {
      todayLeads: todayLeads.length,
      totalLeads: leads.length,
      closed: closed.length,
      convRate,
      totalRevenue,
      totalPartnerShare,
      netRevenue: totalRevenue - totalPartnerShare,
      activePartners: partners.size,
    };
  }, [leads, today]);

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

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tight">DELIWER</span>
            <span className="hidden sm:inline text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Marketing Hub</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing/partners" className="text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" data-testid="nav-partners">Partners</Link>
            <Link href="/marketing/leaderboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" data-testid="nav-leaderboard">Leaderboard</Link>
            <Link href="/marketing/dashboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" data-testid="nav-dashboard">Dashboard</Link>
            <Link href="/marketing/recruit" className="text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" data-testid="nav-recruit">Recruit</Link>
            <Link href="/marketing/control" className="text-xs px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all" data-testid="nav-control">Control</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

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
            Open WhatsApp
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

        {/* Lead Form + Hub Links */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-1">Submit a Lead</h2>
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
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ahmed Hassan"
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
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
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all"
                  data-testid="button-submit-lead"
                >
                  {loading ? "Sending..." : "Submit & Open WhatsApp →"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4 text-sm text-gray-400 uppercase tracking-wider">Command Center</h3>
              <div className="space-y-3">
                {[
                  { icon: "📡", label: "Broker Recruit Engine", desc: "Upload list → auto-email → track responses", href: "/marketing/recruit", testid: "link-recruit" },
                  { icon: "📊", label: "Partner Dashboard", desc: "Track leads & earnings per partner", href: "/marketing/dashboard", testid: "link-dashboard" },
                  { icon: "🏆", label: "Leaderboard", desc: "Top partners this week", href: "/marketing/leaderboard", testid: "link-leaderboard" },
                  { icon: "🤝", label: "Partner Onboarding", desc: "Earn up to 35% per closed deal", href: "/marketing/partners", testid: "link-partners" },
                  { icon: "🎛️", label: "Founder Control", desc: "Full command center with lead table", href: "/marketing/control", testid: "link-control" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 bg-white/3 hover:bg-white/8 border border-white/8 hover:border-emerald-500/30 rounded-xl transition-all group"
                    data-testid={item.testid}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold group-hover:text-emerald-400 transition-colors">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <span className="text-gray-600 group-hover:text-emerald-400 transition-colors">→</span>
                  </Link>
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
