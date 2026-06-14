import { motion } from "framer-motion";
import { Users, Calendar, Star, MapPin, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TABS = ["Members", "Brokers", "Partners", "Events", "Stories"];

const MEMBERS = [
  { name: "Ahmad Al Rashid", badge: "Hall of Heroes", country: "🇦🇪", role: "Sustainability Lead", avatar: "AR" },
  { name: "Priya Sharma", badge: "Planet Hero Elite", country: "🇮🇳", role: "Community Volunteer", avatar: "PS" },
  { name: "Maria Santos", badge: "Sustainability Ambassador", country: "🇧🇷", role: "AquaCafe Member", avatar: "MS" },
  { name: "James Okonkwo", badge: "Community Champion", country: "🇳🇬", role: "League Captain", avatar: "JO" },
  { name: "Fatima Al Mansoori", badge: "Community Champion", country: "🇦🇪", role: "Broker Partner", avatar: "FM" },
  { name: "Daniel Kovač", badge: "Hero Member", country: "🇨🇿", role: "New Resident", avatar: "DK" },
];

const BROKERS = [
  { name: "Tariq Hassan", agency: "Bloom Real Estate", area: "JVC", pts: 62400, avatar: "TH", country: "🇦🇪" },
  { name: "Sofia Petrov", agency: "Prime Dubai Realty", area: "Marina", pts: 51800, avatar: "SP", country: "🇷🇺" },
  { name: "Rajesh Kumar", agency: "AMS Properties", area: "Downtown", pts: 43200, avatar: "RK", country: "🇮🇳" },
  { name: "Nadia El Fassi", agency: "Gulf Estates", area: "Business Bay", pts: 38700, avatar: "NF", country: "🇲🇦" },
];

const EVENTS = [
  { emoji: "🏏", title: "Planet Heroes League — Majan Ground", date: "Every Friday", area: "Majan Community Ground", open: true },
  { emoji: "🌱", title: "Dubai Sustainability Day", date: "Jul 5, 2026", area: "Jumeirah Beach", open: true },
  { emoji: "🧹", title: "Community Clean-Up Drive", date: "Jul 12, 2026", area: "Al Barsha", open: true },
  { emoji: "🤝", title: "Broker Networking Night", date: "Jul 18, 2026", area: "Downtown Dubai", open: false },
];

const STORIES = [
  { name: "Sara H.", quote: "Joined Planet Heroes when I moved to Marina. Set up my whole apartment AND earned 1,200 points in week one. The community is real.", flag: "🇩🇪" },
  { name: "Khalid A.", quote: "As a broker, the Planet Points for every referral I make to DeliWer actually motivated me to collaborate more. Win-win.", flag: "🇦🇪" },
  { name: "James M.", quote: "Played in the League and within two weeks I've met people across JVC, Marina, and Business Bay. Dubai's best kept secret.", flag: "🇺🇸" },
];

const BADGE_COLORS: Record<string, string> = {
  "Hall of Heroes": "text-amber-400 bg-amber-500/15 border-amber-500/30",
  "Planet Hero Elite": "text-violet-400 bg-violet-500/15 border-violet-500/30",
  "Sustainability Ambassador": "text-blue-400 bg-blue-500/15 border-blue-500/30",
  "Community Champion": "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  "Hero Member": "text-gray-400 bg-gray-500/15 border-gray-500/30",
};

export default function PlanetHeroesCommunity() {
  const [tab, setTab] = useState("Members");

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="relative pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/40 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/6 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5" /> Planet Heroes Community
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Community<br /><span className="text-cyan-400">Hub</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
              Members, brokers, partners, volunteers — everyone building a better Dubai together.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-8">

        {/* TABS */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all ${
                tab === t
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                  : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
              }`}
              data-testid={`community-tab-${t.toLowerCase()}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* MEMBERS */}
        {tab === "Members" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MEMBERS.map((m) => (
              <div key={m.name} className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-black text-sm text-white shrink-0">{m.avatar}</div>
                  <div>
                    <p className="text-white font-black text-sm">{m.name} {m.country}</p>
                    <p className="text-gray-500 text-[10px]">{m.role}</p>
                  </div>
                </div>
                <span className={`inline-flex text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${BADGE_COLORS[m.badge]}`}>{m.badge}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* BROKERS */}
        {tab === "Brokers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {BROKERS.map((b) => (
              <div key={b.name} className="bg-white/3 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-black text-xs text-white shrink-0">{b.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-sm">{b.name} {b.country}</p>
                  <p className="text-gray-500 text-[10px]">{b.agency} · {b.area}</p>
                </div>
                <span className="text-amber-400 font-black text-sm shrink-0">{b.pts.toLocaleString()} pts</span>
              </div>
            ))}
            <div className="pt-2 text-center">
              <Link href="/broker-onboard" data-testid="link-become-broker">
                <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-black rounded-xl h-9 px-6 text-[10px] uppercase tracking-widest">
                  Join as a Broker <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* EVENTS */}
        {tab === "Events" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {EVENTS.map((e) => (
              <div key={e.title} className={`bg-white/3 border rounded-xl p-4 flex items-center gap-4 ${e.open ? "border-emerald-500/20" : "border-white/8"}`}>
                <span className="text-2xl shrink-0">{e.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-sm">{e.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-gray-500 text-[10px]"><Calendar className="w-3 h-3" /> {e.date}</span>
                    <span className="flex items-center gap-1 text-gray-500 text-[10px]"><MapPin className="w-3 h-3" /> {e.area}</span>
                  </div>
                </div>
                {e.open ? (
                  <a href="https://wa.me/971523906019?text=I%20want%20to%20join%20this%20Planet%20Heroes%20event!" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg h-8 text-[10px] uppercase tracking-widest shrink-0">
                      Register
                    </Button>
                  </a>
                ) : (
                  <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest shrink-0">Full</span>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* STORIES */}
        {tab === "Stories" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-3 gap-4">
            {STORIES.map((s) => (
              <div key={s.name} className="bg-white/3 border border-cyan-500/15 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-black text-xs">{s.name.split(" ").map(n => n[0]).join("")}</div>
                  <p className="text-white font-black text-sm">{s.name} {s.flag}</p>
                </div>
                <p className="text-gray-400 text-[11px] italic leading-relaxed">"{s.quote}"</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "Partners" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-12">
            <p className="text-gray-400 text-sm">Partner directory coming soon. Join as a partner to get listed.</p>
            <a href="https://wa.me/971523906019?text=I%20want%20to%20become%20a%20Planet%20Heroes%20partner!" target="_blank" rel="noopener noreferrer">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl px-8 h-11 text-sm">
                Become a Partner <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </motion.div>
        )}

        <div className="flex justify-center gap-3 pt-4">
          <a href="https://wa.me/971523906019?text=I%20want%20to%20join%20the%20Planet%20Heroes%20community!" target="_blank" rel="noopener noreferrer" data-testid="btn-join-community">
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl px-8 h-11 text-sm">
              <MessageCircle className="w-4 h-4 mr-2" /> Join Community
            </Button>
          </a>
          <Link href="/community"><Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">← Hub</Button></Link>
        </div>
      </div>
    </div>
  );
}
