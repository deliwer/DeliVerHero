import { useEffect, useState } from "react";
import { Link } from "wouter";
import { initTracker, getTracking, buildWhatsAppURL, submitLead, LeadPayload } from "@/lib/marketing-tracker";

export default function MarketingHub() {
  const [form, setForm] = useState({ name: "", phone: "", intent: "move" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const tracking = getTracking();

  useEffect(() => {
    initTracker();
    document.title = "DeliWer Marketing Hub | Command Center";
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
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
            <Link href="/marketing/control" className="text-xs px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all" data-testid="nav-control">Control</Link>
          </nav>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "🏠", label: "Move In", intent: "move", href: "/" },
            { icon: "📄", label: "Ejari", intent: "ejari", href: "/ejari-registration" },
            { icon: "⚡", label: "DEWA", intent: "dewa", href: "/dewa-activation" },
            { icon: "🚪", label: "Move Out", intent: "exit", href: "/move-out-package" },
          ].map((item) => (
            <a
              key={item.label}
              href={buildWhatsAppURL(item.intent, tracking.ref)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/40 transition-all group cursor-pointer"
              data-testid={`quick-action-${item.intent}`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
            </a>
          ))}
        </div>

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
              <h3 className="font-bold mb-4 text-sm text-gray-400 uppercase tracking-wider">Marketing Hub</h3>
              <div className="space-y-3">
                {[
                  { icon: "📊", label: "Partner Dashboard", desc: "Track your leads & earnings", href: "/marketing/dashboard", testid: "link-dashboard" },
                  { icon: "🏆", label: "Leaderboard", desc: "Top partners this week", href: "/marketing/leaderboard", testid: "link-leaderboard" },
                  { icon: "🤝", label: "Become a Partner", desc: "Earn up to 35% per lead", href: "/marketing/partners", testid: "link-partners" },
                  { icon: "🎛️", label: "Founder Control", desc: "Command center overview", href: "/marketing/control", testid: "link-control" },
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
      </section>

      <section className="border-t border-white/10 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
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
      </section>
    </div>
  );
}
