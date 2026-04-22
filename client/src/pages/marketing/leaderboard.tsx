import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { fetchSheetData, DEMO_LEADERBOARD } from "@/lib/marketing-tracker";
import { BrokerAccessBanner, StickyBrokerWhatsApp } from "@/components/marketing/broker-enhancement-bar";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";

export default function Leaderboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week");

  useEffect(() => {
    document.title = "Partner Leaderboard | DeliWer Marketing";
    fetchSheetData().then(setLeads);
  }, []);

  const leaderboard = useMemo(() => {
    if (leads.length === 0) return DEMO_LEADERBOARD;

    const now = new Date();
    const filtered = leads.filter((l) => {
      if (timeframe === "all") return true;
      const date = new Date(l.timestamp);
      const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      return timeframe === "week" ? diff <= 7 : diff <= 30;
    });

    const map: Record<string, { name: string; leads: number; closed: number; earnings: number }> = {};
    for (const l of filtered) {
      const src = l.source || "organic";
      if (!map[src]) map[src] = { name: src, leads: 0, closed: 0, earnings: 0 };
      map[src].leads++;
      if (l.status === "Closed") {
        map[src].closed++;
        map[src].earnings += Number(l.partnerShare) || 0;
      }
    }

    const sorted = Object.values(map).sort((a, b) => b.leads - a.leads);
    return sorted.map((p, i) => ({
      ...p,
      badge: i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "⭐",
    }));
  }, [leads, timeframe]);

  const totalLeads = leaderboard.reduce((s, p) => s + p.leads, 0);
  const totalEarnings = leaderboard.reduce((s, p) => s + p.earnings, 0);

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />
      <BrokerAccessBanner compact />
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing" className="text-xl font-black tracking-tight hover:text-emerald-400 transition-colors">DELIWER</Link>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">🏆 Leaderboard</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing/dashboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Dashboard</Link>
            <Link href="/marketing/partners" className="text-xs px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all">Join</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2">
            🏆 Top Partners
          </h1>
          <p className="text-gray-400">Earn from every tenant you know. Real rankings, real earnings.</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {(["week", "month", "all"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeframe === t
                  ? "bg-emerald-500 text-black"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              data-testid={`filter-${t}`}
            >
              {t === "week" ? "This Week" : t === "month" ? "This Month" : "All Time"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-emerald-400">{totalLeads}</div>
            <div className="text-xs text-gray-500 mt-0.5">Total Leads This Period</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-amber-400">{totalEarnings.toLocaleString()} AED</div>
            <div className="text-xs text-gray-500 mt-0.5">Partner Earnings Paid</div>
          </div>
        </div>

        {leaderboard.slice(0, 3).length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[leaderboard[1], leaderboard[0], leaderboard[2]].filter(Boolean).map((partner, i) => {
              const isFirst = partner.badge === "🥇";
              return (
                <div
                  key={partner.name}
                  className={`rounded-2xl p-5 text-center border transition-all ${
                    isFirst
                      ? "bg-gradient-to-b from-amber-500/20 to-amber-900/10 border-amber-500/40 -mt-4"
                      : "bg-white/5 border-white/10"
                  }`}
                  data-testid={`podium-${partner.badge}`}
                >
                  <div className="text-3xl mb-2">{partner.badge}</div>
                  <div className={`font-bold text-sm leading-tight mb-1 ${isFirst ? "text-amber-300" : "text-white"}`}>
                    {partner.name}
                  </div>
                  <div className={`text-2xl font-black ${isFirst ? "text-amber-400" : "text-white"}`}>
                    {partner.leads}
                  </div>
                  <div className="text-xs text-gray-500">leads</div>
                  {partner.earnings > 0 && (
                    <div className="mt-2 text-xs text-emerald-400 font-semibold">{partner.earnings.toLocaleString()} AED</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="font-bold text-sm">Full Rankings</h2>
          </div>
          <div className="divide-y divide-white/5">
            {leaderboard.map((partner, i) => (
              <div
                key={partner.name}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors"
                data-testid={`rank-row-${i}`}
              >
                <div className="w-8 text-center">
                  {i < 3 ? (
                    <span className="text-xl">{partner.badge}</span>
                  ) : (
                    <span className="text-gray-500 font-bold text-sm">#{i + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{partner.name}</div>
                  <div className="text-xs text-gray-500">{partner.closed} closed / {partner.leads} leads</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-lg">{partner.leads}</div>
                  <div className="text-xs text-gray-500">leads</div>
                </div>
                {partner.earnings > 0 && (
                  <div className="text-right min-w-[80px]">
                    <div className="text-emerald-400 font-semibold text-sm">{partner.earnings.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">AED earned</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-emerald-900/30 to-blue-900/20 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-black mb-2">Want to be on this list?</h3>
          <p className="text-gray-400 text-sm mb-4">Share your unique link. Every tenant you send earns you up to 35%.</p>
          <Link href="/marketing/partners" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all" data-testid="cta-join-leaderboard">
            Get Your Partner Link →
          </Link>
        </div>
      </div>
      <StickyBrokerWhatsApp />
    </div>
  );
}
