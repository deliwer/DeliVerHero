import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

const PARTNER_SUBNAV = [
  { label: "Overview", href: "/partners" },
  { label: "Broker Partner", href: "/brokers", aliases: ["/broker-partner", "/partners/join"] },
  { label: "Career Path", href: "/partners/career" },
  { label: "How It Works", href: "/transaction-support", aliases: ["/partners/how-it-works"] },
  { label: "Resources", href: "/partners/resources" },
];

const BROKER_ANCHORS = [
  { id: "get-link", label: "Get My Link" },
  { id: "communities", label: "Communities" },
  { id: "opportunities", label: "Opportunities" },
  { id: "what-you-earn", label: "What You Earn" },
  { id: "inner-circle", label: "Inner Circle" },
  { id: "damac", label: "DAMAC Track" },
  { id: "scripts", label: "Scripts" },
  { id: "apply", label: "Apply" },
];

const BROKER_ROUTES = ["/brokers", "/broker-partner", "/partners/join"];

export function PartnerSubNav() {
  const [location] = useLocation();
  const [navHeight, setNavHeight] = useState(104);
  const isBrokerRoute = BROKER_ROUTES.includes(location);

  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    const update = () => setNavHeight(nav.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="sticky z-[90] bg-slate-900/95 backdrop-blur border-b border-white/10"
      style={{ top: navHeight }}
      data-testid="partner-subnav"
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
                data-testid={`subnav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>

      {isBrokerRoute && (
        <div className="border-t border-emerald-500/15 bg-slate-950/60" data-testid="broker-anchor-row">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <div className="flex gap-1 flex-1">
              {BROKER_ANCHORS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToAnchor(item.id)}
                  className="px-3 py-2.5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-gray-400 hover:text-emerald-400 border-b-2 border-transparent hover:border-emerald-500 transition-all"
                  data-testid={`anchor-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Link href="/career" className="shrink-0">
              <button
                type="button"
                className="border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-lg text-[10px] uppercase tracking-widest h-7 px-3 whitespace-nowrap transition-colors"
                data-testid="button-broker-career-path-banner"
              >
                Full Career Path →
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
