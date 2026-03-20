import { Link } from "wouter";

const LEGACY_PAGES = [
  {
    title: "Affiliate & Partner Command Center",
    path: "/marketing/legacy/affiliate-management",
    desc: "Original partner hub — live market signals, 4-tier commission structure, WhatsApp scripts, referral link generator, and performance table.",
    tags: ["Affiliate", "Live Signals", "WhatsApp Scripts"],
    icon: "🤝",
  },
  {
    title: "Founder Marketing Dashboard",
    path: "/marketing/legacy/founder-dashboard",
    desc: "Original founder view — Instagram intent sniffer, lead pipeline management, campaign launcher, and LinkedIn/social outreach tools.",
    tags: ["Instagram", "Leads", "Campaigns"],
    icon: "📊",
  },
  {
    title: "Affiliate Dashboard (Self-Serve)",
    path: "/affiliate-dashboard",
    desc: "Code-based affiliate dashboard — enter referral code to view leads, earnings, conversion status, and referral link.",
    tags: ["Affiliate Code", "Earnings", "Self-Serve"],
    icon: "💳",
    external: true,
  },
  {
    title: "Planet Hero Affiliates",
    path: "/planet-hero-affiliates",
    desc: "Sustainability-linked affiliate program — share referral codes, earn rewards for eco-friendly tenant referrals, social sharing tools.",
    tags: ["Planet Hero", "Eco", "Referral Code"],
    icon: "🌍",
    external: true,
  },
];

export default function MarketingLegacy() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing" className="text-xl font-black tracking-tight hover:text-emerald-400 transition-colors">
              DELIWER
            </Link>
            <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full border border-gray-500/30">
              Legacy Reference
            </span>
          </div>
          <Link
            href="/marketing"
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all"
            data-testid="nav-back-to-hub"
          >
            ← Back to Hub
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Legacy Reference — Preserved for future use
          </div>
          <h1 className="text-3xl font-black mb-2">Previous Marketing Pages</h1>
          <p className="text-gray-400 max-w-xl">
            These are the original marketing and affiliate pages from before the new Command Center was built.
            All pages are fully intact — none have been modified or deleted. They are preserved here as a reference
            and can be promoted back to primary routes at any time.
          </p>
        </div>

        <div className="space-y-4">
          {LEGACY_PAGES.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="block group"
              data-testid={`legacy-link-${page.title.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
            >
              <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/8 rounded-2xl transition-all">
                <span className="text-3xl shrink-0 mt-0.5">{page.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-sm group-hover:text-amber-300 transition-colors">
                      {page.title}
                    </h2>
                    {page.external && (
                      <span className="text-[10px] text-gray-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                        existing route
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{page.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {page.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-amber-400 transition-colors text-lg shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-5 bg-white/3 border border-white/8 rounded-2xl">
          <h3 className="font-bold text-sm text-gray-400 mb-3">Route Map</h3>
          <div className="space-y-2 font-mono text-xs">
            {[
              { route: "/marketing", label: "→ New Hub (active)" },
              { route: "/marketing/dashboard", label: "→ New Partner Dashboard (active)" },
              { route: "/marketing/leaderboard", label: "→ New Leaderboard (active)" },
              { route: "/marketing/partners", label: "→ New Partner Onboarding (active)" },
              { route: "/marketing/control", label: "→ New Founder Control (active)" },
              { route: "/marketing/legacy", label: "→ This page" },
              { route: "/marketing/legacy/affiliate-management", label: "→ Legacy: Affiliate Command Center" },
              { route: "/marketing/legacy/founder-dashboard", label: "→ Legacy: Founder Marketing Dashboard" },
              { route: "/affiliate-dashboard", label: "→ Legacy: Self-Serve Affiliate Dashboard" },
              { route: "/planet-hero-affiliates", label: "→ Legacy: Planet Hero Affiliates" },
            ].map((r) => (
              <div key={r.route} className="flex gap-3 items-center">
                <span className="text-emerald-500 shrink-0">{r.route}</span>
                <span className="text-gray-600">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
