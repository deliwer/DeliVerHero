import { motion } from "framer-motion";
import { Zap, Gift, Star, ShoppingBag, Droplets, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const EARN_LIST = [
  { emoji: "💧", label: "AquaCafe Orders", pts: 50, desc: "Every water refill or filter order" },
  { emoji: "🔁", label: "Water Refills", pts: 30, desc: "Bring your own bottle" },
  { emoji: "📦", label: "Reusable Packaging", pts: 40, desc: "Opt in at checkout" },
  { emoji: "🤝", label: "Referrals", pts: 200, desc: "Per new Hero Member" },
  { emoji: "🏙️", label: "Broker Referrals", pts: 500, desc: "Verified broker onboardings" },
  { emoji: "🏏", label: "League Participation", pts: 100, desc: "Per match attended" },
  { emoji: "🌱", label: "Environmental Actions", pts: 75, desc: "Challenges & volunteer work" },
  { emoji: "💼", label: "Partner Transactions", pts: 60, desc: "DeliWer services booked" },
  { emoji: "🎉", label: "Community Events", pts: 80, desc: "Events attended" },
  { emoji: "📢", label: "Social Sharing", pts: 25, desc: "Share your Hero journey" },
];

const REDEEM_ITEMS = [
  { name: "AquaCafe Filter Upgrade", pts: 2000, emoji: "💧", tag: "Popular" },
  { name: "DeliWer Move-In Credit", pts: 5000, emoji: "🏠", tag: "Best Value" },
  { name: "Private Jet Upgrade", pts: 25000, emoji: "✈️", tag: "Elite" },
  { name: "Restaurant Dining Credit", pts: 1500, emoji: "🍽️", tag: "" },
  { name: "League VIP Seat", pts: 3000, emoji: "🏏", tag: "Sport" },
  { name: "Broker Listing Boost", pts: 8000, emoji: "🏙️", tag: "Pro" },
];

export default function PlanetHeroesRewards() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-violet-500/6 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full text-violet-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" /> Planet Heroes Rewards
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Hero<br /><span className="text-violet-400">Rewards</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
              Earn Planet Points across everything DeliWer. Redeem for real-world perks, upgrades, and exclusive access.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <a href="https://wa.me/971523906019?text=I%20want%20to%20check%20my%20Planet%20Points%20balance!" target="_blank" rel="noopener noreferrer" data-testid="btn-check-points">
                <Button className="bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl px-8 h-11 text-sm">
                  Check My Points <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <Link href="/aquacafe" data-testid="link-aquacafe-store">
                <Button variant="outline" className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10 font-black rounded-xl px-8 h-11 text-sm">
                  AquaCafe Store <ShoppingBag className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-14">

        {/* EARN TABLE */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Earn Planet Points</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {EARN_LIST.map((e) => (
              <div key={e.label} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                <span className="text-xl shrink-0">{e.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-sm">{e.label}</p>
                  <p className="text-gray-500 text-[10px]">{e.desc}</p>
                </div>
                <span className="text-emerald-400 font-black text-sm shrink-0">+{e.pts} pts</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* REDEEM SECTION */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Redeem Hero Rewards</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {REDEEM_ITEMS.map((r) => (
              <div key={r.name} className="relative bg-white/3 border border-violet-500/20 rounded-xl p-4 space-y-2">
                {r.tag && (
                  <span className="absolute top-3 right-3 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                    {r.tag}
                  </span>
                )}
                <span className="text-2xl">{r.emoji}</span>
                <p className="text-white font-black text-sm leading-snug">{r.name}</p>
                <p className="text-violet-400 font-black text-base">{r.pts.toLocaleString()} pts</p>
                <a href="https://wa.me/971523906019?text=I%20want%20to%20redeem%20Hero%20Rewards!" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="w-full bg-violet-600/50 hover:bg-violet-600 text-white font-black rounded-lg h-8 text-[10px] uppercase tracking-widest transition-all">
                    Redeem
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* BENEFITS LIST */}
        <div className="bg-white/3 border border-violet-500/20 rounded-2xl p-6 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-white font-black text-lg text-center">Why Planet Points Beat Loyalty Points</h3>
          <div className="space-y-2">
            {[
              "Points never expire while you're active",
              "Earn across the entire DeliWer ecosystem",
              "Redeem for tangible UAE services",
              "Unlock badge levels and exclusive access",
              "Share your impact with a Hero Certificate",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="text-gray-300 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/planetheroes"><Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Planet Heroes Hub</Button></Link>
        </div>
      </div>
    </div>
  );
}
