import { Link, useLocation } from "wouter";

const PARTNER_SUBNAV = [
  { label: "Overview", href: "/partners" },
  { label: "Join", href: "/partners/join" },
  { label: "How It Works", href: "/partners/how-it-works" },
  { label: "Earnings", href: "/partners/earnings" },
  { label: "Resources", href: "/partners/resources" },
];

export function PartnerSubNav() {
  const [location] = useLocation();
  return (
    <div className="sticky top-[100px] z-40 bg-slate-900/95 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-none">
        {PARTNER_SUBNAV.map((item) => (
          <Link key={item.href} href={item.href}>
            <button
              className={`px-4 py-3.5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                location === item.href
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {item.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
