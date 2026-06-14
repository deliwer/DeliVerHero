import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Globe, Trophy, Zap, Users, Star, Shield, Leaf, ArrowRight,
  Droplets, Target, Award, Flame, ChevronRight, Sparkles, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BADGE_LEVELS = [
  { level: 1, name: "Hero Member", color: "from-slate-600 to-slate-500", border: "border-slate-500/40", icon: Shield },
  { level: 2, name: "Community Champion", color: "from-emerald-700 to-emerald-500", border: "border-emerald-500/40", icon: Users },
  { level: 3, name: "Sustainability Ambassador", color: "from-blue-700 to-blue-500", border: "border-blue-500/40", icon: Leaf },
  { level: 4, name: "Planet Hero Elite", color: "from-violet-700 to-violet-500", border: "border-violet-500/40", icon: Star },
  { level: 5, name: "Hall of Heroes", color: "from-amber-600 to-yellow-400", border: "border-amber-400/60", icon: Crown },
];

const SUB_SECTIONS = [
  { path: "/community/impact", label: "Impact Center", icon: Globe, color: "emerald", desc: "Live sustainability metrics & progress" },
  { path: "/community/leaderboard", label: "Leaderboard", icon: Trophy, color: "amber", desc: "Top Heroes, Brokers & Teams" },
  { path: "/community/league", label: "PH League", icon: Target, color: "blue", desc: "Play. Network. Impact." },
  { path: "/community/rewards", label: "Rewards", icon: Zap, color: "violet", desc: "DXBs & Hero Rewards" },
  { path: "/community/challenges", label: "Challenges", icon: Flame, color: "rose", desc: "Earn points through actions" },
  { path: "/community/members", label: "Members", icon: Users, color: "cyan", desc: "Members, brokers & events" },
  { path: "/community/sponsors", label: "Sponsors", icon: Award, color: "orange", desc: "Brand visibility & packages" },
  { path: "/community/hall-of-heroes", label: "Hall of Heroes", icon: Crown, color: "yellow", desc: "Annual recognition platform" },
];

const COLOR_MAP: Record<string, string> = {
  emerald: "border-emerald-500/30 hover:border-emerald-400/60 text-emerald-400 bg-emerald-500/10",
  amber: "border-amber-500/30 hover:border-amber-400/60 text-amber-400 bg-amber-500/10",
  blue: "border-blue-500/30 hover:border-blue-400/60 text-blue-400 bg-blue-500/10",
  violet: "border-violet-500/30 hover:border-violet-400/60 text-violet-400 bg-violet-500/10",
  rose: "border-rose-500/30 hover:border-rose-400/60 text-rose-400 bg-rose-500/10",
  cyan: "border-cyan-500/30 hover:border-cyan-400/60 text-cyan-400 bg-cyan-500/10",
  orange: "border-orange-500/30 hover:border-orange-400/60 text-orange-400 bg-orange-500/10",
  yellow: "border-yellow-500/30 hover:border-yellow-400/60 text-yellow-400 bg-yellow-500/10",
};

const EARN_ACTIONS = [
  { icon: "💧", label: "AquaCafe Orders", pts: "+50 DXBs" },
  { icon: "♻️", label: "Reusable Packaging", pts: "+30 DXBs" },
  { icon: "🤝", label: "Referrals", pts: "+200 DXBs" },
  { icon: "🏏", label: "League Participation", pts: "+100 DXBs" },
  { icon: "🌱", label: "Environmental Actions", pts: "+75 DXBs" },
  { icon: "🏙️", label: "Broker Referrals", pts: "+500 DXBs" },
  { icon: "🎯", label: "Challenges Completed", pts: "+150 DXBs" },
  { icon: "📢", label: "Social Sharing", pts: "+25 DXBs" },
];

export default function PlanetHeroesHub() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* HERO SECTION */}
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-slate-950 to-violet-950/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Earn. Impact. Play.
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88]">
              Planet<br />
              <span className="text-emerald-400">Heroes</span>
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              A unified ecosystem bringing together 36,000 brokers, AquaCafe members, DeliWer customers, and community volunteers — all earning <span className="text-emerald-400 font-black">DXBs</span>, Dubai's loyalty currency for real-world impact.
            </p>

            {/* Founding Member CTA */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border border-emerald-500/30 rounded-2xl p-6 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                36,000 Founding Members Wanted
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">Join the Planet Heroes Movement</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Free Membership", "Lifetime Founding Status", "Priority Access", "Exclusive Rewards"].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-bold">
                    <span className="text-emerald-400 shrink-0">✓</span> {b}
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/971523906019?text=I%20want%20to%20become%20a%20Planet%20Heroes%20Founding%20Member!"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-become-founding-member"
              >
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-8 h-11 text-sm shadow-lg shadow-emerald-900/40 transition-all w-full sm:w-auto">
                  Become a Founding Member <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-16">

        {/* NAV GRID */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUB_SECTIONS.map((s) => {
              const Icon = s.icon;
              const cls = COLOR_MAP[s.color];
              return (
                <Link key={s.path} href={s.path} data-testid={`ph-nav-${s.color}`}>
                  <div className={`group flex flex-col gap-3 p-4 bg-white/3 border rounded-xl transition-all cursor-pointer ${cls}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${cls}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm leading-tight">{s.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.section>

        {/* BADGES SYSTEM */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Hero Progression System
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">Climb the Ranks</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Every action earns DXBs. Level up your badge and unlock exclusive access.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {BADGE_LEVELS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.level} className={`flex-1 bg-white/3 border ${b.border} rounded-xl p-4 text-center space-y-2`}>
                  <div className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Level {b.level}</p>
                  <p className="text-white font-black text-xs leading-snug">{b.name}</p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* EARN PLANET POINTS */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" /> DXBs Engine
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">Earn DXBs Everywhere</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EARN_ACTIONS.map((a) => (
              <div key={a.label} className="bg-white/3 border border-white/8 rounded-xl p-4 flex flex-col gap-2">
                <span className="text-2xl">{a.icon}</span>
                <p className="text-white font-black text-xs leading-snug">{a.label}</p>
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">{a.pts}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* STATS ROW */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
            {[
              { val: "36,000+", label: "Founding Members Target", icon: "🎯" },
              { val: "5", label: "Badge Levels", icon: "🏅" },
              { val: "8", label: "Earn Categories", icon: "⚡" },
              { val: "∞", label: "DXBs to Earn", icon: "💎" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900/80 px-5 py-6 text-center space-y-1.5">
                <span className="text-2xl">{s.icon}</span>
                <p className="text-white font-black text-2xl md:text-3xl">{s.val}</p>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <div className="text-center space-y-4">
          <a
            href="https://wa.me/971523906019?text=I%20want%20to%20join%20Planet%20Heroes!"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-ph-join-final"
          >
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-12 h-12 text-sm shadow-lg shadow-emerald-900/30 transition-all">
              Join Planet Heroes Free <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Free membership · No investment required · Earn from day one</p>
        </div>
      </div>
    </div>
  );
}
