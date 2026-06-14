import { motion } from "framer-motion";
import { Crown, Star, Trophy, Award, ChevronRight, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const TOP_HEROES = [
  { name: "Ahmad Al Rashid", country: "🇦🇪", category: "Sustainability", pts: 48200, year: 2025, avatar: "AR", quote: "Impact is built one action at a time." },
  { name: "Priya Sharma", country: "🇮🇳", category: "Community Building", pts: 39500, year: 2025, avatar: "PS", quote: "Dubai gave me home. I give back through DeliWer." },
  { name: "Tariq Hassan", country: "🇦🇪", category: "Top Broker", pts: 62400, year: 2025, avatar: "TH", quote: "Brokers who care create communities that thrive." },
];

const ANNUAL_CATEGORIES = [
  { emoji: "🌍", title: "Environmental Champion", desc: "Highest impact sustainability actions", winner: "Ahmad Al Rashid", country: "🇦🇪" },
  { emoji: "🤝", title: "Community Builder", desc: "Most community events organized", winner: "Priya Sharma", country: "🇮🇳" },
  { emoji: "🏙️", title: "Broker of the Year", desc: "Top referrals & broker impact", winner: "Tariq Hassan", country: "🇦🇪" },
  { emoji: "🏏", title: "League MVP", desc: "Most valuable league player", winner: "James Okonkwo", country: "🇳🇬" },
  { emoji: "💧", title: "AquaCafe Champion", desc: "Most sustainable water consumption", winner: "Maria Santos", country: "🇧🇷" },
  { emoji: "⭐", title: "Rising Hero", desc: "Fastest rising new member", winner: "Aisha Bello", country: "🇿🇦" },
];

const SPONSORS_OF_YEAR = [
  { name: "Bloom Real Estate", category: "Top Developer Sponsor", emoji: "🏗️" },
  { name: "Emirates NBD", category: "Top Finance Sponsor", emoji: "🏦" },
  { name: "AquaCafe Partners", category: "Sustainability Sponsor", emoji: "💧" },
];

export default function PlanetHeroesHallOfHeroes() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-950/50 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/6 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/25 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Crown className="w-3.5 h-3.5" /> Annual Recognition
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Hall of<br /><span className="text-yellow-400">Heroes</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
              The highest recognition in the Planet Heroes ecosystem. Honoring top contributors, sponsors, teams, and champions annually.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-14">

        {/* TOP 3 HEROES */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              2025 Inductees
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {TOP_HEROES.map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gradient-to-b from-yellow-950/40 to-slate-900/80 border border-yellow-500/30 rounded-2xl p-6 text-center space-y-4"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {i === 0 ? <span className="text-2xl">👑</span> : i === 1 ? <span className="text-xl">🥈</span> : <span className="text-xl">🥉</span>}
                </div>
                <div className="pt-2">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-yellow-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg">
                    {h.avatar}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-white font-black text-sm">{h.name} {h.country}</p>
                  <span className="inline-flex text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">{h.category}</span>
                </div>
                <p className="text-gray-400 text-[10px] italic leading-relaxed">"{h.quote}"</p>
                <p className="text-yellow-400 font-black text-base">{h.pts.toLocaleString()} pts</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AWARD CATEGORIES */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Annual Awards</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {ANNUAL_CATEGORIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white/3 border border-white/8 rounded-xl px-4 py-4 flex items-center gap-4"
              >
                <span className="text-2xl shrink-0">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-sm">{c.title}</p>
                  <p className="text-gray-500 text-[10px]">{c.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-yellow-400 font-black text-xs">{c.winner}</p>
                  <p className="text-gray-600 text-[9px]">{c.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TOP SPONSORS */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Top Sponsors of 2025</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {SPONSORS_OF_YEAR.map((s) => (
              <div key={s.name} className="bg-white/3 border border-yellow-500/20 rounded-xl p-4 text-center space-y-2">
                <span className="text-2xl">{s.emoji}</span>
                <p className="text-white font-black text-sm">{s.name}</p>
                <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">{s.category}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* NOMINATE */}
        <div className="bg-gradient-to-r from-yellow-950/60 via-slate-900 to-yellow-950/40 border border-yellow-500/30 rounded-2xl p-6 text-center space-y-4">
          <Crown className="w-8 h-8 text-yellow-400 mx-auto" />
          <h3 className="text-white font-black text-xl">Nominate a Hero</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">Know someone making a real difference in the community? Nominate them for the 2026 Hall of Heroes.</p>
          <a href="https://wa.me/971523906019?text=I%20want%20to%20nominate%20someone%20for%20the%20Planet%20Heroes%20Hall%20of%20Heroes!" target="_blank" rel="noopener noreferrer" data-testid="btn-nominate-hero">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl px-8 h-11 text-sm shadow-lg">
              Submit Nomination <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>

        <div className="text-center">
          <Link href="/community"><Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Community Hub</Button></Link>
        </div>
      </div>
    </div>
  );
}
