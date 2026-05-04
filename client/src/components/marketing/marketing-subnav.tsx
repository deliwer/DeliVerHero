import { Link, useLocation } from "wouter";
import { Lock, ArrowLeft } from "lucide-react";

const TABS = [
  { href: "/marketing", label: "Hub" },
  { href: "/marketing/dashboard", label: "Dashboard" },
  { href: "/marketing/leaderboard", label: "Leaderboard" },
  { href: "/marketing/partners", label: "Partners" },
  { href: "/marketing/recruit", label: "Recruit" },
  { href: "/marketing/social", label: "Social" },
  { href: "/marketing/control", label: "Control" },
  { href: "/marketing/tenant-leads", label: "Tenant Leads", highlight: true as const },
  { href: "/marketing/referral-engine", label: "Referral Engine", highlight: true as const },
  { href: "/marketing/founder-dashboard", label: "Command" },
  { href: "/marketing/attribution", label: "Attribution", accent: true as const },
];

export function MarketingSubNav() {
  const [location] = useLocation();

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-rose-950/40 via-slate-950 to-slate-950 border-b border-rose-500/20 backdrop-blur shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/">
            <button
              className="text-gray-500 hover:text-white inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"
              data-testid="marketing-subnav-back"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site
            </button>
          </Link>
          <Lock className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">
            Founder Console · Private · Not Indexed
          </span>
        </div>

        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mb-px">
          {TABS.map((t) => {
            const active = location === t.href || (t.href !== "/marketing" && location.startsWith(t.href));
            const isAccent = (t as any).accent;
            const isHighlight = (t as any).highlight;
            return (
              <Link key={t.href} href={t.href}>
                <span
                  data-testid={`marketing-subnav-${t.label.toLowerCase().replace(/ /g, "-")}`}
                  className={`px-3.5 h-10 inline-flex items-center text-[11px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap cursor-pointer transition-all border ${
                    active
                      ? isAccent
                        ? "bg-rose-500/20 text-rose-200 border-rose-500/50 shadow shadow-rose-500/20"
                        : "bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow shadow-emerald-500/20"
                      : isAccent
                      ? "text-rose-300 border-rose-500/30 hover:bg-rose-500/15"
                      : isHighlight
                      ? "text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/10"
                      : "text-gray-300 border-slate-700 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
