import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Gift, Star, ShoppingBag, ChevronRight, CheckCircle2, Crown, Utensils,
  Ticket, Droplets, Building2, Plane, Trophy, Users, ChevronDown, ExternalLink,
  Sparkles, Shield, ArrowRight, Coffee
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const EARN_LIST = [
  { emoji: "💧", label: "AquaCafe Orders", pts: 50, desc: "Every water/filter order" },
  { emoji: "🔁", label: "Water Refills", pts: 30, desc: "Bring your own bottle" },
  { emoji: "📦", label: "Reusable Packaging", pts: 40, desc: "Opt in at checkout" },
  { emoji: "🤝", label: "Member Referrals", pts: 200, desc: "Per new Hero Member" },
  { emoji: "🏙️", label: "Broker Referrals", pts: 500, desc: "Verified broker onboardings" },
  { emoji: "🏏", label: "League Participation", pts: 100, desc: "Per match attended" },
  { emoji: "🌱", label: "Environmental Actions", pts: 75, desc: "Challenges & volunteer work" },
  { emoji: "💼", label: "DeliWer Bookings", pts: 60, desc: "Move-in/out services booked" },
  { emoji: "🍽️", label: "Dining with Partners", pts: 45, desc: "At any partner restaurant" },
  { emoji: "🎯", label: "Challenges Completed", pts: 150, desc: "Monthly impact challenges" },
  { emoji: "🎉", label: "Community Events", pts: 80, desc: "Events attended & hosted" },
  { emoji: "📢", label: "Social Sharing", pts: 25, desc: "Share your Hero journey" },
];

const RESTAURANT_PARTNERS = [
  {
    id: "emily-chilly",
    name: "Emily Chilly",
    cuisine: "Lebanese & Middle Eastern",
    location: "Dubai Marina, JBR",
    emoji: "🥙",
    accent: "amber",
    rewards: [
      { pts: 400, label: "Mezze Platter Voucher", value: "AED 25" },
      { pts: 800, label: "Lebanese Feast for One", value: "AED 65" },
      { pts: 1800, label: "Dinner Date Experience", value: "AED 150" },
      { pts: 4500, label: "Private Cooking Class", value: "AED 300" },
    ],
  },
  {
    id: "al-hadheerah",
    name: "Al Hadheerah Desert",
    cuisine: "Traditional Emirati",
    location: "Al Sahra Desert Resort",
    emoji: "🏜️",
    accent: "orange",
    rewards: [
      { pts: 600, label: "Emirati BBQ Platter", value: "AED 35" },
      { pts: 1500, label: "Desert Dinner for One", value: "AED 120" },
      { pts: 3500, label: "Sunset Desert Feast", value: "AED 280" },
      { pts: 7000, label: "Private Majlis Dinner", value: "AED 600" },
    ],
  },
  {
    id: "karachi-grill",
    name: "Karachi Grill",
    cuisine: "Pakistani BBQ & Grill",
    location: "Deira, Dubai",
    emoji: "🔥",
    accent: "red",
    rewards: [
      { pts: 350, label: "Seekh Kebab Set", value: "AED 20" },
      { pts: 700, label: "Mixed Grill Platter", value: "AED 55" },
      { pts: 1600, label: "Family Grill Feast", value: "AED 130" },
      { pts: 4000, label: "Full BBQ Night for 4", value: "AED 350" },
    ],
  },
  {
    id: "nobu-dubai",
    name: "Nobu Dubai",
    cuisine: "Japanese-Peruvian Fusion",
    location: "Atlantis The Palm",
    emoji: "🍣",
    accent: "blue",
    rewards: [
      { pts: 1200, label: "Signature Maki Set", value: "AED 85" },
      { pts: 2800, label: "Nobu Lunch for One", value: "AED 220" },
      { pts: 6500, label: "Omakase Experience", value: "AED 550" },
      { pts: 15000, label: "Chef's Private Table", value: "AED 1,400" },
    ],
  },
  {
    id: "pai-thai",
    name: "Pai Thai",
    cuisine: "Authentic Thai",
    location: "Madinat Jumeirah",
    emoji: "🌿",
    accent: "emerald",
    rewards: [
      { pts: 500, label: "Spring Roll & Tom Yum", value: "AED 40" },
      { pts: 1000, label: "Riverside Dinner Set", value: "AED 85" },
      { pts: 2500, label: "Romantic Thai Dinner", value: "AED 200" },
      { pts: 6000, label: "Boat Dinner Experience", value: "AED 500" },
    ],
  },
  {
    id: "tresind-studio",
    name: "Tresind Studio",
    cuisine: "Modern Indian Tasting",
    location: "DIFC, Dubai",
    emoji: "✨",
    accent: "violet",
    rewards: [
      { pts: 2000, label: "Signature Tasting Amuse", value: "AED 120" },
      { pts: 4500, label: "4-Course Tasting Menu", value: "AED 380" },
      { pts: 9000, label: "Full Tresind Tasting Journey", value: "AED 750" },
      { pts: 20000, label: "Private Tasting for Two", value: "AED 1,600" },
    ],
  },
  {
    id: "la-petite-maison",
    name: "La Petite Maison",
    cuisine: "French Riviera",
    location: "DIFC, Dubai",
    emoji: "🥂",
    accent: "rose",
    rewards: [
      { pts: 900, label: "Entrée & Dessert Set", value: "AED 75" },
      { pts: 2200, label: "French Bistro Lunch", value: "AED 180" },
      { pts: 5000, label: "Dinner for One",value: "AED 420" },
      { pts: 12000, label: "Full Riviera Dinner for Two", value: "AED 950" },
    ],
  },
  {
    id: "prime68",
    name: "Prime68",
    cuisine: "Premium Steakhouse",
    location: "JW Marriott Marquis",
    emoji: "🥩",
    accent: "yellow",
    rewards: [
      { pts: 1500, label: "Wagyu Slider Set", value: "AED 100" },
      { pts: 3500, label: "Prime Lunch for One", value: "AED 280" },
      { pts: 7500, label: "Steak Night Dinner", value: "AED 620" },
      { pts: 18000, label: "Ultra-Premium for Two", value: "AED 1,500" },
    ],
  },
];

const LEAGUE_TICKETS = [
  { emoji: "🎟️", label: "General Admission", desc: "Any league match day", pts: 500, badge: "" },
  { emoji: "⭐", label: "VIP Match Seat", desc: "Reserved front row + welcome drink", pts: 2000, badge: "Popular" },
  { emoji: "🏆", label: "Team Sponsorship Slot", desc: "Brand visible on team kit for 1 match", pts: 5000, badge: "Pro" },
  { emoji: "👑", label: "VIP Season Pass", desc: "All matches + networking lounge access", pts: 12000, badge: "Elite" },
  { emoji: "🤝", label: "Corporate Box Night", desc: "12-person private box with catering", pts: 25000, badge: "Ultimate" },
];

const AQUACAFE_PERKS = [
  { emoji: "💧", label: "1-Month AquaCafe Refills", desc: "Unlimited bottle refills", pts: 800 },
  { emoji: "🚿", label: "Ionic Shower Filter", desc: "Reduce chlorine 98%, AED 399 value", pts: 2500 },
  { emoji: "🔬", label: "Countertop Water Filter", desc: "6-stage purification system", pts: 4000 },
  { emoji: "🏠", label: "Whole-Home Filter Install", desc: "Full installation by DeliWer team", pts: 8500 },
  { emoji: "♾️", label: "AquaCafe Lifetime Membership", desc: "Permanent Hero Level 2 status", pts: 15000 },
];

const PARTNER_PERKS = [
  { emoji: "🏠", label: "Move-In Service Credit", desc: "AED 200 off any DeliWer move-in package", pts: 3000, tag: "Best Value" },
  { emoji: "📋", label: "Ejari Fast Track", desc: "Priority Ejari processing, skip the queue", pts: 1500, tag: "" },
  { emoji: "💡", label: "DEWA Setup Fee Waiver", desc: "Cover the DEWA connection admin fee", pts: 2000, tag: "" },
  { emoji: "🧹", label: "Deep Clean Session", desc: "Professional 3-room deep clean", pts: 4500, tag: "Popular" },
  { emoji: "🏙️", label: "Broker Listing Boost", desc: "Featured placement for 30 days", pts: 6000, tag: "Pro" },
  { emoji: "✈️", label: "Private Jet Seat Upgrade", desc: "One-way upgrade on DeliWer Air partner", pts: 20000, tag: "Elite" },
];

const TIER_LEVELS = [
  { level: 1, name: "Hero Member", min: 0, color: "from-slate-600 to-slate-500", border: "border-slate-500/40", icon: Shield, perks: ["Access to earn system", "Restaurant vouchers unlocked", "Basic league tickets"] },
  { level: 2, name: "Community Champion", min: 2000, color: "from-emerald-700 to-emerald-500", border: "border-emerald-500/40", icon: Users, perks: ["2× points on AquaCafe", "VIP league match access", "Priority move-in booking"] },
  { level: 3, name: "Sustainability Ambassador", min: 8000, color: "from-blue-700 to-blue-500", border: "border-blue-500/40", icon: Trophy, perks: ["Exclusive restaurant invites", "Season pass priority", "Brand partnership deals"] },
  { level: 4, name: "Planet Hero Elite", min: 25000, color: "from-violet-700 to-violet-500", border: "border-violet-500/40", icon: Star, perks: ["Concierge redemptions", "Corporate box access", "Private chef experiences"] },
  { level: 5, name: "Hall of Heroes", min: 75000, color: "from-amber-600 to-yellow-400", border: "border-amber-400/60", icon: Crown, perks: ["Annual Hall of Heroes award", "Lifetime elite membership", "Named impact contribution"] },
];

const ACCENT_MAP: Record<string, { card: string; badge: string; dot: string }> = {
  amber: { card: "border-amber-500/25 hover:border-amber-400/50", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", dot: "bg-amber-400" },
  orange: { card: "border-orange-500/25 hover:border-orange-400/50", badge: "bg-orange-500/15 text-orange-400 border-orange-500/30", dot: "bg-orange-400" },
  red: { card: "border-red-500/25 hover:border-red-400/50", badge: "bg-red-500/15 text-red-400 border-red-500/30", dot: "bg-red-400" },
  blue: { card: "border-blue-500/25 hover:border-blue-400/50", badge: "bg-blue-500/15 text-blue-400 border-blue-500/30", dot: "bg-blue-400" },
  emerald: { card: "border-emerald-500/25 hover:border-emerald-400/50", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
  violet: { card: "border-violet-500/25 hover:border-violet-400/50", badge: "bg-violet-500/15 text-violet-400 border-violet-500/30", dot: "bg-violet-400" },
  rose: { card: "border-rose-500/25 hover:border-rose-400/50", badge: "bg-rose-500/15 text-rose-400 border-rose-500/30", dot: "bg-rose-400" },
  yellow: { card: "border-yellow-500/25 hover:border-yellow-400/50", badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30", dot: "bg-yellow-400" },
};

type TabKey = "dining" | "league" | "aquacafe" | "partner";

const TABS: { key: TabKey; label: string; icon: typeof Utensils; count: number }[] = [
  { key: "dining", label: "Dining Partners", icon: Utensils, count: RESTAURANT_PARTNERS.length },
  { key: "league", label: "League Tickets", icon: Ticket, count: LEAGUE_TICKETS.length },
  { key: "aquacafe", label: "AquaCafe Perks", icon: Droplets, count: AQUACAFE_PERKS.length },
  { key: "partner", label: "Partner Perks", icon: Building2, count: PARTNER_PERKS.length },
];

/* ─── SUBCOMPONENTS ──────────────────────────────────────────────────────── */

function RedeemButton({ pts, label }: { pts: number; label: string }) {
  const { toast } = useToast();
  const msg = encodeURIComponent(`I'd like to redeem ${pts.toLocaleString()} Planet Points for: ${label}`);
  return (
    <a
      href={`https://wa.me/971523906019?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`redeem-${label.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
    >
      <Button
        size="sm"
        className="w-full bg-emerald-600/40 hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-400 text-white font-black rounded-lg h-8 text-[10px] uppercase tracking-widest transition-all"
      >
        Redeem {pts.toLocaleString()} pts
      </Button>
    </a>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function PlanetHeroesRewards() {
  const [activeTab, setActiveTab] = useState<TabKey>("dining");
  const [expandedRestaurant, setExpandedRestaurant] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative pt-36 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-violet-950/20 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-emerald-500/6 rounded-full blur-[120px]" />
        <div className="absolute top-24 left-1/4 w-[300px] h-[200px] bg-violet-500/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Planet Heroes Loyalty Hub
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88]">
              Hero<br /><span className="text-emerald-400">Rewards</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              One loyalty universe. Earn Planet Points across AquaCafe, DeliWer services, league matches,
              and partner restaurants — then redeem for real-world perks across the entire ecosystem.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-3xl mx-auto"
          >
            {[
              { val: "8", label: "Restaurant Partners", icon: "🍽️" },
              { val: "12", label: "Earn Categories", icon: "⚡" },
              { val: "5", label: "Loyalty Tiers", icon: "🏅" },
              { val: "50+", label: "Redemption Options", icon: "🎁" },
            ].map((s) => (
              <div key={s.label} className="bg-white/3 border border-white/8 rounded-xl px-3 py-4 text-center">
                <span className="text-xl">{s.icon}</span>
                <p className="text-white font-black text-xl mt-1">{s.val}</p>
                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-wider leading-tight mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <a
              href="https://wa.me/971523906019?text=I%20want%20to%20check%20my%20Planet%20Points%20balance!"
              target="_blank" rel="noopener noreferrer"
              data-testid="btn-check-points"
            >
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-8 h-12 text-sm shadow-lg shadow-emerald-900/40 transition-all">
                <Zap className="w-4 h-4 mr-2" /> Check My Points Balance
              </Button>
            </a>
            <a
              href="https://wa.me/971523906019?text=I%20want%20to%20become%20a%20Planet%20Heroes%20Founding%20Member!"
              target="_blank" rel="noopener noreferrer"
              data-testid="btn-join-free"
            >
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl px-8 h-12 text-sm">
                Join Free — Founding Member <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-20">

        {/* ── EARN POINTS ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              <Zap className="w-3 h-3" /> Points Engine
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Earn Points Everywhere</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Every interaction with the DeliWer ecosystem adds to your Planet Points balance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {EARN_LIST.map((e) => (
              <div key={e.label} className="flex items-center gap-3 bg-white/3 border border-white/8 hover:border-white/15 rounded-xl px-4 py-3 transition-colors">
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

        {/* ── REDEEM TABS ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              <Gift className="w-3 h-3" /> Redemption Hub
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Redeem Your Rewards</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">All partner categories under one roof. Choose your track to redeem.</p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  data-testid={`tab-${tab.key}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    active
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                      : "bg-white/3 border-white/8 text-gray-500 hover:text-gray-300 hover:border-white/15"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black ${active ? "bg-emerald-500/30 text-emerald-300" : "bg-white/8 text-gray-500"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab panels */}
          <AnimatePresence mode="wait">

            {/* DINING PARTNERS */}
            {activeTab === "dining" && (
              <motion.div
                key="dining"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  {RESTAURANT_PARTNERS.map((r) => {
                    const ac = ACCENT_MAP[r.accent];
                    const isOpen = expandedRestaurant === r.id;
                    return (
                      <div
                        key={r.id}
                        className={`bg-white/3 border rounded-xl overflow-hidden transition-all ${ac.card}`}
                      >
                        {/* Header */}
                        <button
                          className="w-full flex items-center gap-4 p-4 text-left"
                          onClick={() => setExpandedRestaurant(isOpen ? null : r.id)}
                          data-testid={`restaurant-${r.id}`}
                        >
                          <span className="text-3xl shrink-0">{r.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-black text-sm leading-tight">{r.name}</p>
                            <p className="text-gray-500 text-[10px] mt-0.5">{r.cuisine}</p>
                            <p className="text-gray-600 text-[9px] flex items-center gap-1 mt-0.5">
                              📍 {r.location}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${ac.badge}`}>
                              from {r.rewards[0].pts} pts
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </div>
                        </button>

                        {/* Expanded rewards */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-2 border-t border-white/6 pt-3">
                                {r.rewards.map((rw) => (
                                  <div key={rw.label} className="flex items-center gap-3 bg-black/20 rounded-lg px-3 py-2.5">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-white text-xs font-bold">{rw.label}</p>
                                      <p className="text-gray-500 text-[9px]">Value: {rw.value}</p>
                                    </div>
                                    <RedeemButton pts={rw.pts} label={`${rw.label} at ${r.name}`} />
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                <p className="text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest pt-2">
                  More restaurant partners joining regularly · Message us to nominate a restaurant
                </p>
              </motion.div>
            )}

            {/* LEAGUE TICKETS */}
            {activeTab === "league" && (
              <motion.div
                key="league"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-blue-950/60 border border-blue-500/20 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-3xl">🏏</span>
                  <div>
                    <p className="text-white font-black text-sm">Brokers Night Cricket League UAE 2026</p>
                    <p className="text-blue-400 text-[10px] font-bold">16 Teams · Dubai · Planet Heroes Presenting Sponsor</p>
                  </div>
                  <Link href="/league" className="ml-auto shrink-0">
                    <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-black rounded-lg h-8 text-[10px] uppercase tracking-widest">
                      League Info <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {LEAGUE_TICKETS.map((t) => (
                    <div key={t.label} className="relative bg-white/3 border border-blue-500/20 hover:border-blue-400/40 rounded-xl p-4 space-y-3 transition-all">
                      {t.badge && (
                        <span className="absolute top-3 right-3 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {t.badge}
                        </span>
                      )}
                      <span className="text-3xl">{t.emoji}</span>
                      <div>
                        <p className="text-white font-black text-sm">{t.label}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{t.desc}</p>
                      </div>
                      <p className="text-blue-400 font-black text-base">{t.pts.toLocaleString()} pts</p>
                      <RedeemButton pts={t.pts} label={t.label} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AQUACAFE PERKS */}
            {activeTab === "aquacafe" && (
              <motion.div
                key="aquacafe"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-cyan-950/60 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-3xl">💧</span>
                  <div>
                    <p className="text-white font-black text-sm">AquaCafe by DeliWer</p>
                    <p className="text-cyan-400 text-[10px] font-bold">Water purification · Shower filters · Lifestyle wellness</p>
                  </div>
                  <Link href="/aquacafe" className="ml-auto shrink-0">
                    <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-black rounded-lg h-8 text-[10px] uppercase tracking-widest">
                      AquaCafe Store <ShoppingBag className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {AQUACAFE_PERKS.map((p) => (
                    <div key={p.label} className="bg-white/3 border border-cyan-500/20 hover:border-cyan-400/40 rounded-xl p-4 space-y-3 transition-all">
                      <span className="text-3xl">{p.emoji}</span>
                      <div>
                        <p className="text-white font-black text-sm">{p.label}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{p.desc}</p>
                      </div>
                      <p className="text-cyan-400 font-black text-base">{p.pts.toLocaleString()} pts</p>
                      <RedeemButton pts={p.pts} label={p.label} />
                    </div>
                  ))}
                </div>

                {/* Starter Kit upsell */}
                <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-emerald-950/70 border border-emerald-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">
                      <Crown className="w-3 h-3" /> Fast-track Option
                    </div>
                    <p className="text-white font-black text-base">AquaCafe Lifetime Starter Kit</p>
                    <p className="text-gray-400 text-xs mt-1">Skip points for the ionic shower filter — buy the AED 99 kit and unlock Planet Hero Level 2 instantly.</p>
                  </div>
                  <a href="https://wa.me/971523906019?text=I%20want%20to%20order%20the%20AquaCafe%20Starter%20Kit%20for%20AED%2099!" target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-6 h-11 text-sm shadow-lg shadow-emerald-900/30">
                      Buy Kit — AED 99 <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            )}

            {/* PARTNER PERKS */}
            {activeTab === "partner" && (
              <motion.div
                key="partner"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PARTNER_PERKS.map((p) => (
                    <div key={p.label} className="relative bg-white/3 border border-violet-500/20 hover:border-violet-400/40 rounded-xl p-4 space-y-3 transition-all">
                      {p.tag && (
                        <span className="absolute top-3 right-3 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                          {p.tag}
                        </span>
                      )}
                      <span className="text-3xl">{p.emoji}</span>
                      <div>
                        <p className="text-white font-black text-sm">{p.label}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{p.desc}</p>
                      </div>
                      <p className="text-violet-400 font-black text-base">{p.pts.toLocaleString()} pts</p>
                      <RedeemButton pts={p.pts} label={p.label} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.section>

        {/* ── TIER BENEFITS ───────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Hero Progression
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Unlock as You Rise</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Every tier unlocks new reward categories and exclusive access.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TIER_LEVELS.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.level} className={`bg-white/3 border ${t.border} rounded-xl p-4 space-y-3`}>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Level {t.level}</p>
                    <p className="text-white font-black text-xs leading-snug mt-0.5">{t.name}</p>
                    <p className="text-[9px] text-gray-600 mt-0.5">{t.min.toLocaleString()}+ pts</p>
                  </div>
                  <ul className="space-y-1">
                    {t.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500/70 shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-[9px] leading-snug">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ── WHY PLANET POINTS ───────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <div className="bg-white/3 border border-emerald-500/15 rounded-2xl p-6 max-w-3xl mx-auto space-y-4">
            <h3 className="text-white font-black text-lg text-center">Why Planet Points Beat Ordinary Loyalty Points</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Points never expire while you're active",
                "Earn across the entire DeliWer ecosystem",
                "Redeem at 8 restaurant partners and growing",
                "League tickets, sport events, and VIP nights",
                "Physical product rewards from AquaCafe",
                "Real-estate and home services built-in",
                "Unlock badge levels and exclusive access",
                "Share your impact with a Hero Certificate",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-gray-300 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── FINAL CTA ───────────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Free to join · No investment required · Earn from day one</p>
          <a
            href="https://wa.me/971523906019?text=I%20want%20to%20join%20Planet%20Heroes%20and%20start%20earning%20Planet%20Points!"
            target="_blank" rel="noopener noreferrer"
            data-testid="btn-join-final"
          >
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-12 h-12 text-sm shadow-lg shadow-emerald-900/30 transition-all">
              Join Planet Heroes Free <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/planetheroes">
              <Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">
                ← Planet Heroes Hub
              </Button>
            </Link>
            <Link href="/restaurant-rewards">
              <Button variant="ghost" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest">
                Full Dining Portal →
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
