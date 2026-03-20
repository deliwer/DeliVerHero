import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getReferralLink } from "@/lib/marketing-tracker";

export default function PartnerOnboarding() {
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Become a DeliWer Partner | Earn Up to 35%";
  }, []);

  function generate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const link = getReferralLink(name.trim());
    setGenerated(link);
    localStorage.setItem("dw_partner", name.trim());
    localStorage.setItem("dw_ref", name.trim().toLowerCase().replace(/\s+/g, "-"));
  }

  function copy() {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tiers = [
    { min: 1, max: 5, pct: "15%", label: "Starter", color: "border-gray-500/30 bg-gray-500/5" },
    { min: 6, max: 15, pct: "25%", label: "Active", color: "border-blue-500/30 bg-blue-500/5" },
    { min: 16, max: 999, pct: "35%", label: "Top Partner", color: "border-emerald-500/40 bg-emerald-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing" className="text-xl font-black tracking-tight hover:text-emerald-400 transition-colors">DELIWER</Link>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Partner Program</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing/leaderboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Leaderboard</Link>
            <Link href="/marketing/dashboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Dashboard</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full mb-4">Zero Risk · Zero Upfront · Pure Commission</span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Earn From Every<br />
            <span className="text-emerald-400">Tenant You Know</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Share a link. We handle everything. You get paid up to 35% of every closed deal — automatically.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: "01", icon: "🔗", title: "Get Your Link", desc: "Generate your unique referral link below. Takes 10 seconds." },
            { step: "02", icon: "📲", title: "Share It", desc: "Send it via WhatsApp, Instagram, or anywhere your clients are." },
            { step: "03", icon: "💰", title: "You Earn", desc: "We close the deal. You receive your commission within 7 days." },
          ].map((s) => (
            <div key={s.step} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden" data-testid={`step-${s.step}`}>
              <span className="absolute top-4 right-4 text-5xl font-black text-white/5">{s.step}</span>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-black mb-1">Generate Your Partner Link</h2>
            <p className="text-gray-400 text-sm mb-5">Your name becomes your tracking ID — no account needed.</p>
            {!generated ? (
              <form onSubmit={generate} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Your Name or Company</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marina Brokers"
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                    data-testid="input-partner-name"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all"
                  data-testid="button-generate-link"
                >
                  Generate My Link →
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="text-xs text-emerald-400 mb-2 font-semibold">Your unique referral link:</p>
                  <code className="text-sm text-white break-all leading-relaxed">{generated}</code>
                </div>
                <button
                  onClick={copy}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all"
                  data-testid="button-copy-link"
                >
                  {copied ? "✅ Copied to Clipboard!" : "📋 Copy Link"}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`🏠 Moving in Dubai? Let DeliWer handle everything — Ejari, DEWA, movers & more.\n\nGet started: ${generated}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[#25D366] font-semibold py-3 rounded-xl text-sm transition-all"
                  data-testid="button-share-whatsapp"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Share on WhatsApp
                </a>
                <Link href="/marketing/dashboard" className="block text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors" data-testid="link-view-dashboard">
                  View My Dashboard →
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Commission Tiers</h3>
              <div className="space-y-3">
                {tiers.map((t) => (
                  <div key={t.label} className={`rounded-xl p-4 border ${t.color} flex items-center justify-between`} data-testid={`tier-${t.label.toLowerCase()}`}>
                    <div>
                      <div className="font-bold text-sm">{t.label}</div>
                      <div className="text-xs text-gray-500">
                        {t.max === 999 ? `${t.min}+ leads/month` : `${t.min}–${t.max} leads/month`}
                      </div>
                    </div>
                    <div className="text-2xl font-black text-emerald-400">{t.pct}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-3">Example Earnings</h3>
              <div className="space-y-2">
                {[
                  { deal: "Move-In Package", value: "1,200 AED", cut: "420 AED" },
                  { deal: "Full Relocation", value: "3,500 AED", cut: "1,225 AED" },
                  { deal: "Move-Out Bundle", value: "900 AED", cut: "315 AED" },
                ].map((ex) => (
                  <div key={ex.deal} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-400">{ex.deal}</span>
                    <div className="text-right">
                      <span className="text-gray-500 text-xs line-through mr-2">{ex.value}</span>
                      <span className="text-emerald-400 font-semibold">→ {ex.cut} yours</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: "🏘️", label: "Real Estate Brokers", desc: "Earn on every tenant you place" },
            { icon: "🏢", label: "Building Managers", desc: "Refer move-ins and move-outs" },
            { icon: "📋", label: "Typing Centers", desc: "Add Ejari services to your revenue" },
          ].map((t) => (
            <div key={t.label} className="bg-white/3 border border-white/8 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{t.icon}</div>
              <div className="font-semibold text-sm mb-1">{t.label}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
