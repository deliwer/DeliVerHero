import { motion } from "framer-motion";
import { Trophy, Crown, Star, Users, Building2, ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Top Heroes", "Top Brokers", "Top Agencies", "Top Teams", "Top Referrers", "Top AquaCafe", "Top Volunteers"];

const MOCK_HEROES = [
  { rank: 1, name: "Ahmad Al Rashid", badge: "Hall of Heroes", pts: 48200, avatar: "AR", country: "🇦🇪" },
  { rank: 2, name: "Priya Sharma", badge: "Planet Hero Elite", pts: 39500, avatar: "PS", country: "🇮🇳" },
  { rank: 3, name: "James Okonkwo", badge: "Planet Hero Elite", pts: 34800, avatar: "JO", country: "🇳🇬" },
  { rank: 4, name: "Maria Santos", badge: "Sustainability Ambassador", pts: 28600, avatar: "MS", country: "🇧🇷" },
  { rank: 5, name: "Chen Wei", badge: "Sustainability Ambassador", pts: 24100, avatar: "CW", country: "🇨🇳" },
  { rank: 6, name: "Fatima Al Mansoori", badge: "Community Champion", pts: 19800, avatar: "FM", country: "🇦🇪" },
  { rank: 7, name: "Daniel Kovač", badge: "Community Champion", pts: 17200, avatar: "DK", country: "🇨🇿" },
  { rank: 8, name: "Aisha Bello", badge: "Hero Member", pts: 14500, avatar: "AB", country: "🇿🇦" },
];

const MOCK_BROKERS = [
  { rank: 1, name: "Tariq Hassan", agency: "Bloom Real Estate", pts: 62400, avatar: "TH", country: "🇦🇪" },
  { rank: 2, name: "Sofia Petrov", agency: "Prime Dubai Realty", pts: 51800, avatar: "SP", country: "🇷🇺" },
  { rank: 3, name: "Rajesh Kumar", agency: "AMS Properties", pts: 43200, avatar: "RK", country: "🇮🇳" },
  { rank: 4, name: "Nadia El Fassi", agency: "Gulf Estates", pts: 38700, avatar: "NF", country: "🇲🇦" },
  { rank: 5, name: "Marcus Webb", agency: "Metropolitan Dubai", pts: 31500, avatar: "MW", country: "🇬🇧" },
];

const BADGE_COLORS: Record<string, string> = {
  "Hall of Heroes": "text-amber-400 bg-amber-500/15 border-amber-500/30",
  "Planet Hero Elite": "text-violet-400 bg-violet-500/15 border-violet-500/30",
  "Sustainability Ambassador": "text-blue-400 bg-blue-500/15 border-blue-500/30",
  "Community Champion": "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  "Hero Member": "text-gray-400 bg-gray-500/15 border-gray-500/30",
};

const RANK_COLORS = ["text-amber-400", "text-gray-300", "text-orange-400"];

type Period = "monthly" | "annual" | "alltime";

export default function PlanetHeroesLeaderboard() {
  const [activeCategory, setActiveCategory] = useState("Top Heroes");
  const [period, setPeriod] = useState<Period>("monthly");

  const data = activeCategory === "Top Brokers" ? MOCK_BROKERS : MOCK_HEROES;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/6 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Trophy className="w-3.5 h-3.5" /> Planet Heroes Rankings
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              Hero<br /><span className="text-amber-400">Leaderboard</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
              Rankings across Heroes, Brokers, Teams & Agencies. Monthly, Annual & All-Time.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-8">

        {/* PERIOD TOGGLE */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/8 rounded-xl">
            {(["monthly", "annual", "alltime"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${
                  period === p ? "bg-amber-500 text-slate-950 shadow" : "text-gray-400 hover:text-white"
                }`}
                data-testid={`period-${p}`}
              >
                {p === "alltime" ? "All-Time" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all ${
                activeCategory === cat
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                  : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
              }`}
              data-testid={`tab-${cat.toLowerCase().replace(/\s/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PODIUM TOP 3 */}
        <div className="grid grid-cols-3 gap-3">
          {data.slice(0, 3).map((hero, i) => (
            <motion.div
              key={hero.rank}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`bg-white/3 border rounded-xl p-4 text-center space-y-2 ${
                i === 0 ? "border-amber-500/40 bg-amber-500/5" : i === 1 ? "border-gray-500/30" : "border-orange-500/30"
              }`}
            >
              <div className={`text-2xl font-black ${RANK_COLORS[i] ?? "text-gray-400"}`}>
                {i === 0 ? "👑" : i === 1 ? "🥈" : "🥉"}
              </div>
              <div className={`w-10 h-10 mx-auto rounded-full bg-slate-700 flex items-center justify-center font-black text-sm text-white`}>
                {hero.avatar}
              </div>
              <p className="text-white font-black text-xs leading-tight">{hero.name}</p>
              {(hero as any).agency && <p className="text-gray-500 text-[9px]">{(hero as any).agency}</p>}
              {(hero as any).badge && (
                <span className={`inline-flex text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${BADGE_COLORS[(hero as any).badge] ?? ""}`}>
                  {(hero as any).badge}
                </span>
              )}
              <p className="text-amber-400 font-black text-sm">{hero.pts.toLocaleString()} pts</p>
            </motion.div>
          ))}
        </div>

        {/* FULL LIST */}
        <div className="space-y-2">
          {data.slice(3).map((hero, i) => (
            <motion.div
              key={hero.rank}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/3 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <span className="text-gray-600 font-black text-sm w-6 text-center">#{hero.rank}</span>
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-black text-xs text-white shrink-0">
                {hero.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-sm">{hero.name} <span className="ml-1">{hero.country}</span></p>
                {(hero as any).agency && <p className="text-gray-500 text-[10px]">{(hero as any).agency}</p>}
              </div>
              {(hero as any).badge && (
                <span className={`hidden sm:inline-flex text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${BADGE_COLORS[(hero as any).badge] ?? ""}`}>
                  {(hero as any).badge}
                </span>
              )}
              <span className="text-amber-400 font-black text-sm shrink-0">{hero.pts.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-3 pt-4">
          <a href="https://wa.me/971523906019?text=I%20want%20to%20join%20Planet%20Heroes%20and%20climb%20the%20leaderboard!" target="_blank" rel="noopener noreferrer" data-testid="btn-join-leaderboard">
            <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl px-8 h-11 text-sm shadow-lg">
              Claim Your Spot <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
          <div className="mt-4">
            <Link href="/community"><Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Community Hub</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
