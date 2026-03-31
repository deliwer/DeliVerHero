import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

const PARTNER_SUBNAV = [
  { label: "Overview", href: "/partners" },
  { label: "Brokers", href: "/brokers", aliases: ["/broker-partner"] },
  { label: "Join", href: "/partners/join" },
  { label: "How It Works", href: "/partners/how-it-works" },
  { label: "Earnings", href: "/partners/earnings" },
  { label: "Resources", href: "/partners/resources" },
];

export function PartnerSubNav() {
  const [location] = useLocation();
  const [navHeight, setNavHeight] = useState(104);

  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    const update = () => setNavHeight(nav.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="sticky z-[90] bg-slate-900/95 backdrop-blur border-b border-white/10"
      style={{ top: navHeight }}
    >
      <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-none">
        {PARTNER_SUBNAV.map((item) => {
          const isActive = location === item.href || (item.aliases ?? []).includes(location);
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`px-4 py-3.5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
