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

      <section className="relative overflow-hidden px-4 pt-20 pb-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-emerald-900/20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          {tracking.ref !== "organic" && (
            <div className="inline-flex items-center gap-2 mb-6 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Referred by <strong className="ml-1">{tracking.ref}</strong>
            </div>
          )}
          <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">
            Are You{" "}
            <span className="text-emerald-400 neon-text-green">Overpaying</span>{" "}
            Rent in Dubai?
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl mb-8 max-w-xl mx-auto">
            Moving soon? We handle everything — Ejari, DEWA, movers, cleaning. One WhatsApp away.
          </p>
          <a
            href={buildWhatsAppURL("general", tracking.ref)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] mb-3"
            data-testid="cta-whatsapp-hero"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Start Your Move
          </a>
          <p className="text-gray-500 text-sm">No signup. WhatsApp-first. 24h response.</p>
        </div>
      </section>

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
