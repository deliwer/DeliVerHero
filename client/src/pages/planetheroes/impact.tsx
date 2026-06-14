import { motion } from "framer-motion";
import { Globe, Droplets, Leaf, Wind, Clock, Users, Trophy, TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const step = target / 60;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setVal(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 24);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
}

const METRICS = [
  { icon: Droplets, label: "Plastic Bottles Saved", value: 142800, suffix: "", color: "blue", unit: "bottles" },
  { icon: Droplets, label: "Water Delivered (L)", value: 892000, suffix: "", color: "cyan", unit: "litres" },
  { icon: Leaf, label: "Carbon Reduction (kg)", value: 28500, suffix: "", color: "emerald", unit: "kg CO₂" },
  { icon: Leaf, label: "Trees Supported", value: 1240, suffix: "", color: "green", unit: "trees" },
  { icon: Clock, label: "Volunteer Hours", value: 6800, suffix: "", color: "violet", unit: "hours" },
  { icon: Users, label: "Community Events", value: 47, suffix: "", color: "amber", unit: "events" },
  { icon: Trophy, label: "Sports Participants", value: 1800, suffix: "", color: "rose", unit: "players" },
  { icon: TrendingUp, label: "Broker Engagements", value: 4300, suffix: "", color: "orange", unit: "brokers" },
];

const COLOR_MAP: Record<string, string> = {
  blue: "text-blue-400 border-blue-500/30 bg-blue-500/8",
  cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/8",
  emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8",
  green: "text-green-400 border-green-500/30 bg-green-500/8",
  violet: "text-violet-400 border-violet-500/30 bg-violet-500/8",
  amber: "text-amber-400 border-amber-500/30 bg-amber-500/8",
  rose: "text-rose-400 border-rose-500/30 bg-rose-500/8",
  orange: "text-orange-400 border-orange-500/30 bg-orange-500/8",
};

const MILESTONES = [
  { label: "100K Bottles Saved", progress: 100, done: true },
  { label: "1M Litres Delivered", progress: 89, done: false },
  { label: "500 Volunteer Heroes", progress: 76, done: false },
  { label: "2,000 League Players", progress: 90, done: false },
  { label: "50 Community Events", progress: 94, done: false },
];

const CHALLENGES = [
  { emoji: "🧴", title: "Drink Sustainably", desc: "Switch to refillable this month", pts: "+150 pts" },
  { emoji: "🚶", title: "Walk to Work Week", desc: "Log 5 walks via WhatsApp", pts: "+200 pts" },
  { emoji: "🌿", title: "Plastic-Free Week", desc: "Zero single-use for 7 days", pts: "+300 pts" },
];

export default function PlanetHeroesImpact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Globe className="w-3.5 h-3.5" /> Live Impact Dashboard
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              Planet Heroes<br /><span className="text-emerald-400">Impact Center</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Real-time sustainability metrics from our community. Every action tracked, every hero counted.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-14">

        {/* LIVE METRICS GRID */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-4">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-px flex-1 bg-white/5" />
            <span className="flex items-center gap-2 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Counters — Updated Daily
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {METRICS.map((m) => {
              const Icon = m.icon;
              const cls = COLOR_MAP[m.color];
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`bg-white/3 border ${cls} rounded-xl p-4 space-y-2`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cls}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className={`text-2xl font-black ${cls.split(" ")[0]}`}>
                    <AnimatedCounter target={m.value} />
                  </p>
                  <p className="text-white font-black text-[10px] uppercase tracking-wide leading-snug">{m.label}</p>
                  <p className="text-gray-600 text-[9px] font-bold">{m.unit}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* COMMUNITY MILESTONES */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Community Milestones</h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            {MILESTONES.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold text-white">
                    {m.done && <span className="text-emerald-400">✓</span>} {m.label}
                  </span>
                  <span className={`text-[10px] font-black ${m.done ? "text-emerald-400" : "text-gray-500"}`}>{m.progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${m.done ? "bg-emerald-500" : "bg-emerald-500/60"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ACTIVE CHALLENGES */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Active Sustainability Challenges</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {CHALLENGES.map((c) => (
              <div key={c.title} className="bg-white/3 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                <span className="text-2xl">{c.emoji}</span>
                <p className="text-white font-black text-sm">{c.title}</p>
                <p className="text-gray-500 text-[11px] leading-relaxed">{c.desc}</p>
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">{c.pts}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/community/challenges" data-testid="link-view-all-challenges">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest rounded-xl h-9 px-6 text-[10px]">
                View All Challenges <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </motion.section>

        <div className="text-center">
          <Link href="/community" data-testid="link-back-ph-hub">
            <Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Planet Heroes Hub</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
