import { motion } from "framer-motion";
import { Award, Building2, ChevronRight, Download, Users, TrendingUp, Star, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { emoji: "🏗️", label: "Developers", examples: "DAMAC, Emaar, Meraas" },
  { emoji: "🏦", label: "Banks", examples: "Emirates NBD, Mashreq" },
  { emoji: "🏠", label: "Mortgage Providers", examples: "ADCB, RAKBANK" },
  { emoji: "🛡️", label: "Insurance", examples: "AXA, Daman" },
  { emoji: "📱", label: "Telecom", examples: "Du, Etisalat" },
  { emoji: "🏨", label: "Hospitality", examples: "Hotels & Restaurants" },
  { emoji: "🔧", label: "Maintenance", examples: "Home & AC services" },
  { emoji: "🚛", label: "Moving Services", examples: "Movers & Packers" },
  { emoji: "📋", label: "Business Setup", examples: "PRO & Visa services" },
];

const PACKAGES = [
  {
    name: "Community Partner", price: "AED 5,000/mo", color: "border-emerald-500/30 bg-emerald-500/5",
    badgeColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    features: ["Logo on Planet Heroes Hub", "1 Community Event sponsor slot", "Member newsletter mention", "Social media tag"],
  },
  {
    name: "Impact Sponsor", price: "AED 15,000/mo", color: "border-violet-500/30 bg-violet-500/5",
    badgeColor: "text-violet-400 bg-violet-500/15 border-violet-500/30",
    features: ["Prominent banner on all PH pages", "3 Event sponsor slots", "Leaderboard branding", "WhatsApp campaign mention", "Impact metrics report"],
    featured: true,
  },
  {
    name: "League Title Sponsor", price: "AED 30,000/season", color: "border-amber-500/30 bg-amber-500/5",
    badgeColor: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    features: ["League name rights", "Jersey branding", "Stadium-level visibility", "All-season social coverage", "Hall of Heroes recognition", "CEO speaking opportunity"],
  },
];

const METRICS = [
  { val: "36,000+", label: "Target Members", icon: "🎯" },
  { val: "UAE-wide", label: "Geographic Reach", icon: "🌍" },
  { val: "8", label: "Earn Categories", icon: "⚡" },
  { val: "5", label: "Hero Badge Levels", icon: "🏅" },
];

export default function PlanetHeroesSponsors() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/40 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-500/6 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/25 rounded-full text-orange-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Award className="w-3.5 h-3.5" /> Sponsorship Opportunities
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Planet Heroes<br /><span className="text-orange-400">Sponsors</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
              Put your brand at the heart of Dubai's most engaged community ecosystem. Real reach. Real impact.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-14">

        {/* REACH METRICS */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-slate-900/80 px-5 py-6 text-center space-y-1.5">
                <span className="text-2xl">{m.icon}</span>
                <p className="text-white font-black text-2xl">{m.val}</p>
                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SPONSOR CATEGORIES */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Who Should Sponsor</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((c) => (
              <div key={c.label} className="bg-white/3 border border-white/8 rounded-xl p-3 space-y-1 text-center">
                <span className="text-2xl">{c.emoji}</span>
                <p className="text-white font-black text-xs">{c.label}</p>
                <p className="text-gray-600 text-[9px] leading-snug">{c.examples}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PACKAGES */}
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center">Sponsorship Packages</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {PACKAGES.map((p) => (
              <div key={p.name} className={`relative bg-white/3 border ${p.color} rounded-2xl p-5 space-y-4 ${p.featured ? "ring-1 ring-violet-500/40" : ""}`}>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500 text-white">
                    Most Popular
                  </div>
                )}
                <div>
                  <span className={`inline-flex text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${p.badgeColor}`}>{p.name}</span>
                  <p className="text-white font-black text-xl mt-2">{p.price}</p>
                </div>
                <div className="space-y-2">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-[11px] text-gray-300">
                      <span className="text-emerald-400 shrink-0">✓</span> {f}
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/971523906019?text=I%20want%20to%20discuss%20Planet%20Heroes%20sponsorship!" target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full font-black rounded-xl h-9 text-[10px] uppercase tracking-widest ${p.featured ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"}`}>
                    Get Started <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* DOWNLOAD DECK */}
        <div className="bg-gradient-to-r from-orange-950/60 via-slate-900 to-orange-950/40 border border-orange-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <Download className="w-8 h-8 text-orange-400 shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-black text-sm">Download Sponsor Deck</p>
            <p className="text-gray-500 text-[11px]">Full community stats, reach metrics, and package details in one PDF.</p>
          </div>
          <a href="https://wa.me/971523906019?text=Please%20send%20me%20the%20Planet%20Heroes%20Sponsor%20Deck!" target="_blank" rel="noopener noreferrer" data-testid="btn-sponsor-deck">
            <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl px-6 h-10 text-sm shrink-0">
              <MessageCircle className="w-4 h-4 mr-2" /> Request Deck
            </Button>
          </a>
        </div>

        <div className="text-center">
          <Link href="/planetheroes"><Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Planet Heroes Hub</Button></Link>
        </div>
      </div>
    </div>
  );
}
