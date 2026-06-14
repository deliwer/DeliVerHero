import { motion } from "framer-motion";
import { Flame, Clock, CheckCircle2, ChevronRight, Trophy } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CHALLENGES = [
  {
    emoji: "💧", title: "Drink Sustainably Challenge", pts: 150, duration: "30 days",
    desc: "Switch to an AquaCafe refillable bottle for the entire month. Log each refill on WhatsApp.",
    steps: ["Get an AquaCafe bottle", "Refill at any partner location", "Log via WhatsApp daily"],
    tag: "Popular", color: "cyan",
  },
  {
    emoji: "🚶", title: "Walk to Work Challenge", pts: 200, duration: "7 days",
    desc: "Walk your commute for 5 out of 7 days and share your route. Great for Dubai Marina & JVC residents.",
    steps: ["Pick 5 workdays this week", "Walk & snap a photo", "Share to Planet Heroes feed"],
    tag: "Active", color: "emerald",
  },
  {
    emoji: "🤝", title: "Referral Challenge", pts: 500, duration: "Ongoing",
    desc: "Refer 3 friends, colleagues, or brokers to Planet Heroes. Each verified sign-up earns you 500 pts.",
    steps: ["Get your referral link", "Share with your network", "Earn when they join"],
    tag: "High Value", color: "amber",
  },
  {
    emoji: "🙋", title: "Volunteer Challenge", pts: 300, duration: "1 event",
    desc: "Join a community clean-up, sustainability drive, or league support day. One event = 300 Planet Points.",
    steps: ["Browse upcoming events", "Register via WhatsApp", "Attend & earn points"],
    tag: "Impact", color: "violet",
  },
  {
    emoji: "🌿", title: "Plastic-Free Week", pts: 400, duration: "7 days",
    desc: "Go completely single-use plastic free for 7 days. Document your journey and inspire the community.",
    steps: ["Commit via WhatsApp", "Track plastic-free days", "Post your story"],
    tag: "Challenge", color: "green",
  },
  {
    emoji: "🏘️", title: "Community Support Challenge", pts: 250, duration: "2 weeks",
    desc: "Help a neighbour with a DeliWer service — moving, DEWA, Ejari, or home setup. Report it and earn.",
    steps: ["Help a neighbour move in", "Share their story", "Claim your points"],
    tag: "Community", color: "blue",
  },
];

const COLOR_MAP: Record<string, string> = {
  cyan: "border-cyan-500/30 text-cyan-400 bg-cyan-500/8",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/8",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/8",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/8",
  green: "border-green-500/30 text-green-400 bg-green-500/8",
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/8",
};

export default function PlanetHeroesChallenges() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-rose-500/6 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/25 rounded-full text-rose-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Flame className="w-3.5 h-3.5" /> Active Challenges
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Hero<br /><span className="text-rose-400">Challenges</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
              Every challenge earns Planet Points and builds your community impact. Complete challenges to climb the leaderboard.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-6">

        <div className="flex items-center gap-3 justify-center mb-2">
          <div className="h-px flex-1 bg-white/5" />
          <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" /> 6 Active Challenges
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {CHALLENGES.map((c, i) => {
            const cls = COLOR_MAP[c.color];
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`bg-white/3 border ${cls} rounded-2xl p-5 space-y-4`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`}>{c.tag}</span>
                      <p className="text-white font-black text-sm mt-1 leading-snug">{c.title}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-emerald-400 font-black text-base">+{c.pts} pts</p>
                    <p className="flex items-center gap-1 text-gray-500 text-[10px] justify-end">
                      <Clock className="w-3 h-3" /> {c.duration}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">{c.desc}</p>
                <div className="space-y-1.5">
                  {c.steps.map((s, si) => (
                    <div key={s} className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span className={`w-4 h-4 rounded-full border text-[8px] flex items-center justify-center font-black shrink-0 ${cls}`}>{si + 1}</span>
                      {s}
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/971523906019?text=I%20want%20to%20join%20the%20${encodeURIComponent(c.title)}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`btn-challenge-${c.color}`}
                >
                  <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-xl h-9 text-[10px] uppercase tracking-widest transition-all">
                    Join Challenge <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* LEADERBOARD TEASER */}
        <div className="bg-white/3 border border-amber-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Trophy className="w-8 h-8 text-amber-400 shrink-0" />
          <div className="flex-1">
            <p className="text-white font-black text-sm">Challenge winners top the Leaderboard</p>
            <p className="text-gray-500 text-[11px]">Complete challenges to earn points and rise in the monthly and annual rankings.</p>
          </div>
          <Link href="/planetheroes/leaderboard" data-testid="link-challenges-leaderboard">
            <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-xl h-9 px-5 text-[10px] uppercase tracking-widest shrink-0">
              View Rankings
            </Button>
          </Link>
        </div>

        <div className="text-center pt-2">
          <Link href="/planetheroes"><Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Planet Heroes Hub</Button></Link>
        </div>
      </div>
    </div>
  );
}
