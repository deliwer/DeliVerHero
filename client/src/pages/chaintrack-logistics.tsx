import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import heroCargoImg from "@assets/stock_images/hero_cargo_plane.jpg";
import dubaiHubImg from "@assets/stock_images/dubai_air_hub.jpg";
import gwadarPortImg from "@assets/stock_images/gawadar_port.jpg";
import instcRailImg from "@assets/stock_images/instc_rail.jpg";
import shippingPortImg from "@assets/stock_images/hero_shipping_port.jpg";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane, Ship, Globe, ArrowRight, MapPin, Zap, Shield, Package,
  Anchor, Route, CheckCircle2, RefreshCw, Activity, ChevronRight,
  MessageSquare, Handshake, TrendingUp, Clock, Star, Users,
  DollarSign, Truck, Wind, Radio, AlertTriangle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";

// ─── Animation helpers ──────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Live ticker ────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "Dubai → Gawadar air corridor — fully Hormuz-free",
  "Jebel Ali war-risk surcharges now +340% — alternative routing available",
  "CPEC Free Zone: zero re-export duty on bonded cargo",
  "INSTC rail: Central Asia & Russia connected via Gawadar",
  "Air charter: Dubai to Gawadar under 4 hours",
  "Broker commissions paid on every confirmed shipment",
];

function LiveTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TICKER_ITEMS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-3 overflow-hidden">
      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] font-black uppercase tracking-widest shrink-0 gap-1">
        <Radio className="w-2.5 h-2.5 animate-pulse" /> Live
      </Badge>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-amber-200/80 font-medium truncate"
        >
          {TICKER_ITEMS[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ─── Shipment tracker ────────────────────────────────────────────────────────

const DEMO_IDS = ["CT-DXB-4821", "CT-DWC-7734", "CT-GWD-9901"];
const STAGES = [
  { key: "intake",   label: "DWC Cargo Intake",       sub: "Dubai World Central · cargo apron",          icon: Package },
  { key: "airborne", label: "Air Charter in Transit",  sub: "Dubai → Gawadar · Hormuz-free corridor",     icon: Plane },
  { key: "port",     label: "Gawadar Port Processing", sub: "CPEC Free Zone customs clearance",           icon: Anchor },
  { key: "onward",   label: "Onward Delivery",         sub: "INSTC rail / last-mile to destination",      icon: Truck },
];

function seededInt(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

function buildShipment(id: string) {
  const progress = seededInt(id, 4);
  const kg = 200 + seededInt(id + "kg", 800);
  const cbm = (0.3 + seededInt(id + "cbm", 80) / 100).toFixed(1);
  const broker = ["AL-Rashid Freight", "Gulf Link FWD", "Falcon Cargo WLL", "Silk Route Brokers"][seededInt(id + "b", 4)];
  const ago = [2, 6, 14, 38][progress];
  const etaDays = [3, 2, 1, 0][progress];
  return { progress, kg, cbm, broker, ago, etaDays };
}

function ShipmentTracker() {
  const [input, setInput] = useState("");
  const [tracking, setTracking] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  function track(id: string) {
    setInput(id);
    setAnimating(true);
    setTimeout(() => { setTracking(id.trim().toUpperCase()); setAnimating(false); }, 600);
  }

  const ship = tracking ? buildShipment(tracking) : null;
  const isDemo = DEMO_IDS.includes(tracking ?? "");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input.trim() && track(input)}
          placeholder="Enter tracking ID  ·  e.g. CT-DXB-4821"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
          data-testid="input-tracking-number"
        />
        <Button
          onClick={() => input.trim() && track(input)}
          disabled={!input.trim() || animating}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 rounded-xl gap-2 shrink-0"
          data-testid="button-track-shipment"
        >
          {animating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Route className="w-4 h-4" />}
          Track
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-[11px] text-white/30 font-semibold">Try demo:</span>
        {DEMO_IDS.map((n) => (
          <button key={n} onClick={() => track(n)}
            className="text-[11px] font-bold text-amber-400 border border-amber-500/25 rounded-lg px-3 py-1 hover:bg-amber-500/10 transition-colors"
            data-testid={`chip-demo-${n}`}>{n}</button>
        ))}
      </div>

      {ship && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">ChainTrack Logistics</p>
              <p className="text-lg font-black text-white">{tracking}</p>
            </div>
            <div className="text-right">
              {ship.etaDays === 0
                ? <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Delivered</Badge>
                : <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">In Transit · ETA {ship.etaDays}d</Badge>}
              <p className="text-xs text-white/30 mt-1">{ship.kg} kg · {ship.cbm} CBM</p>
            </div>
          </div>
          <div className="px-6 py-2.5 bg-amber-500/5 border-b border-amber-500/10 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-300 font-semibold">{ship.broker}</span>
            <span className="text-white/30 text-xs">· Handling broker</span>
            {isDemo && <Badge className="ml-auto bg-white/5 text-white/30 border-white/10 text-[10px]">Demo</Badge>}
          </div>
          <div className="px-6 py-6">
            {STAGES.map((stage, i) => {
              const done = i < ship.progress;
              const active = i === ship.progress;
              return (
                <div key={stage.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${done ? "bg-emerald-500 border-emerald-500" : active ? "bg-amber-500 border-amber-500" : "bg-white/5 border-white/10"}`}>
                      {done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <stage.icon className={`w-4 h-4 ${active ? "text-slate-950" : "text-white/30"}`} />}
                    </div>
                    {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 min-h-[28px] my-1 ${done ? "bg-emerald-500/40" : "bg-white/10"}`} />}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-bold ${done ? "text-white" : active ? "text-amber-400" : "text-white/30"}`}>{stage.label}</p>
                        <p className="text-xs text-white/30 mt-0.5">{stage.sub}</p>
                      </div>
                      {done && <span className="text-[10px] text-white/30 shrink-0">{ship.ago + i * 2}h ago</span>}
                      {active && <span className="text-[10px] font-black text-amber-400 shrink-0 animate-pulse">ACTIVE</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-6 pb-5 pt-2 border-t border-white/10 flex items-center justify-between gap-4">
            <p className="text-xs text-white/30">Live tracking available to registered network brokers.</p>
            <Link href="/logistics-funnel">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-1.5 shrink-0">
                Join to Track Live <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ChainTrackLogistics() {
  const WHATSAPP = "https://wa.me/971523946311?text=ChainTrack%20Logistics%20enquiry";

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white font-sans">
      <Helmet>
        <title>ChainTrack Logistics — Dubai Air, Sea & Land Freight | Alternative to Traditional Forwarders</title>
        <meta name="description" content="ChainTrack Logistics: Air charter, sea and land freight across GCC, South Asia, Central Asia and CIS. Broker network with commissions. Hormuz-free routing via Gawadar." />
      </Helmet>

      <LiveTicker />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <img src={heroCargoImg} alt="ChainTrack cargo" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12]/60 via-[#0a0d12]/40 to-[#0a0d12]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 mb-6 text-xs font-bold px-3 py-1">
              <Plane className="w-3.5 h-3.5" /> Dubai · Air · Sea · Land Freight
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            Move Cargo Faster.<br />
            <span className="text-amber-400">Pay Less. Earn More.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Air charters, sea freight, and overland routes connecting Dubai to South Asia, Central Asia, and CIS — without the delays, markups, or single-point failures of traditional freight forwarders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 h-12 text-base">
                <MessageSquare className="w-5 h-5" /> Get a Quote on WhatsApp
              </Button>
            </a>
            <Link href="/logistics-funnel">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 gap-2 h-12 text-base">
                <Handshake className="w-5 h-5" /> Join as Freight Broker
              </Button>
            </Link>
          </motion.div>

          {/* Quick stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-3"
          >
            {[
              { value: "< 4 hrs", label: "Dubai to Gawadar by air" },
              { value: "Hormuz-free", label: "Zero dependency on the Strait" },
              { value: "5% commission", label: "Paid to freight brokers" },
              { value: "Air · Sea · Road", label: "All three modes active" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ROUTES ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Badge className="bg-sky-500/15 text-sky-400 border-sky-500/25 mb-4">Active Routes</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Where We Move Cargo Today
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              Established corridors — not aspirational plans. Bookings open.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Plane,
                mode: "Air Charter",
                route: "Dubai (DWC) → Gawadar",
                time: "Under 4 hours",
                ideal: "Electronics, pharma, time-critical",
                color: "amber",
                img: dubaiHubImg,
              },
              {
                icon: Ship,
                mode: "Sea Freight",
                route: "Jebel Ali / Karachi → CIS ports",
                time: "12–22 days",
                ideal: "Bulk, FMCG, machinery",
                color: "sky",
                img: shippingPortImg,
              },
              {
                icon: Anchor,
                mode: "Air-Sea Multimodal",
                route: "DWC → Gawadar → Central Asia",
                time: "6–10 days total",
                ideal: "Refurb electronics, mixed cargo",
                color: "emerald",
                img: gwadarPortImg,
              },
              {
                icon: Truck,
                mode: "Overland / INSTC",
                route: "Gawadar → Kazakhstan · Russia",
                time: "8–14 days",
                ideal: "Heavy goods, project cargo",
                color: "violet",
                img: instcRailImg,
              },
            ].map((r) => {
              const colorMap: Record<string, string> = {
                amber: "border-amber-500/30 bg-amber-500/5",
                sky: "border-sky-500/30 bg-sky-500/5",
                emerald: "border-emerald-500/30 bg-emerald-500/5",
                violet: "border-violet-500/30 bg-violet-500/5",
              };
              const iconMap: Record<string, string> = {
                amber: "bg-amber-500/20 text-amber-400",
                sky: "bg-sky-500/20 text-sky-400",
                emerald: "bg-emerald-500/20 text-emerald-400",
                violet: "bg-violet-500/20 text-violet-400",
              };
              const badgeMap: Record<string, string> = {
                amber: "bg-amber-500/15 text-amber-300 border-amber-500/25",
                sky: "bg-sky-500/15 text-sky-300 border-sky-500/25",
                emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
                violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
              };
              return (
                <FadeUp key={r.route}>
                  <div className={`border ${colorMap[r.color]} rounded-2xl overflow-hidden h-full flex flex-col`}>
                    <div className="relative h-36 overflow-hidden">
                      <img src={r.img} alt={r.route} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-[#0a0d12]/40 to-transparent" />
                      <div className={`absolute top-3 left-3 w-9 h-9 rounded-xl ${iconMap[r.color]} flex items-center justify-center`}>
                        <r.icon className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <Badge className={`text-[10px] self-start ${badgeMap[r.color]}`}>{r.mode}</Badge>
                      <p className="font-bold text-white text-sm leading-snug">{r.route}</p>
                      <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <Clock className="w-3.5 h-3.5 shrink-0" /> {r.time}
                      </div>
                      <p className="text-xs text-white/40 mt-auto pt-2 border-t border-white/5">{r.ideal}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Destination grid */}
          <FadeUp className="mt-10">
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-4">Destinations served</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "🇵🇰 Pakistan", "🇦🇿 Azerbaijan", "🇰🇿 Kazakhstan", "🇺🇿 Uzbekistan",
                  "🇷🇺 Russia", "🇬🇪 Georgia", "🇰🇬 Kyrgyzstan", "🇹🇯 Tajikistan",
                  "🇨🇳 China (Xinjiang)", "🇮🇳 India (select)", "🇦🇫 Afghanistan (transit)",
                  "🇮🇷 Iran INSTC", "🇺🇦 Ukraine (routed)", "🇸🇦 Saudi Arabia",
                ].map((d) => (
                  <span key={d} className="text-xs text-white/60 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BROKER PROGRAM ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/8 bg-gradient-to-br from-amber-950/30 via-[#0a0d12] to-[#0a0d12]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 mb-4">
                  <Handshake className="w-3.5 h-3.5" /> Freight Broker Network
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                  Earn on Every Shipment<br />
                  <span className="text-amber-400">You Bring In</span>
                </h2>
                <p className="text-white/50 max-w-lg text-base leading-relaxed">
                  No investment. No stock. No warehouse. Connect shippers to ChainTrack's corridors and collect a commission on every confirmed booking — air, sea, or overland.
                </p>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 gap-2">
                  <MessageSquare className="w-5 h-5" /> Apply as Broker
                </Button>
              </a>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              {
                icon: DollarSign,
                title: "5% Gross Commission",
                desc: "On every shipment you introduce — air charter, sea freight, or multimodal. Paid monthly, no cap.",
                accent: "text-amber-400",
                bg: "bg-amber-500/8",
              },
              {
                icon: TrendingUp,
                title: "Recurring Revenue",
                desc: "Regular shippers keep moving cargo. Your commission becomes a steady monthly income stream — not a one-off.",
                accent: "text-emerald-400",
                bg: "bg-emerald-500/8",
              },
              {
                icon: Globe,
                title: "No Logistics Experience Needed",
                desc: "You bring the enquiry. ChainTrack handles quoting, routing, customs, docs, and delivery end-to-end.",
                accent: "text-sky-400",
                bg: "bg-sky-500/8",
              },
            ].map((b) => (
              <FadeUp key={b.title}>
                <div className={`${b.bg} border border-white/8 rounded-2xl p-6 h-full`}>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4`}>
                    <b.icon className={`w-5 h-5 ${b.accent}`} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* How it works */}
          <FadeUp>
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-5">How it works</p>
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { step: "01", label: "Register", desc: "Join free on WhatsApp or web. No contract, no fee." },
                  { step: "02", label: "Send Enquiry", desc: "Share a shipper's requirements — origin, destination, weight, cargo type." },
                  { step: "03", label: "We Quote & Close", desc: "ChainTrack sends a competitive quote. You get CC'd on every step." },
                  { step: "04", label: "Earn Commission", desc: "5% of gross freight value, paid within 30 days of cargo delivery." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <span className="text-2xl font-black text-amber-500/30 leading-none shrink-0 w-8">{s.step}</span>
                    <div>
                      <p className="font-bold text-white text-sm mb-1">{s.label}</p>
                      <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY CHAINTRACK ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Badge className="bg-rose-500/15 text-rose-400 border-rose-500/25 mb-4">Why ChainTrack Wins</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Built to Beat Traditional Forwarders
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Legacy freight forwarders are slow, opaque, and Hormuz-dependent. ChainTrack is none of those things.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Zap,
                title: "Air Charter on Demand",
                desc: "Dedicated charter capacity on the Dubai–Gawadar corridor — bypassing the Strait of Hormuz entirely. Move what needs to move, when it needs to move, without being subject to liner schedules.",
                badge: "Hormuz-free · <4 hrs",
                color: "amber",
              },
              {
                icon: Shield,
                title: "Alternative When Others Fail",
                desc: "Jebel Ali disrupted. Carrier blank sailings. War-risk surcharges at +340%. ChainTrack's multimodal model means your cargo always has a viable route — air if sea fails, road if ports close.",
                badge: "Crisis-resilient routing",
                color: "rose",
              },
              {
                icon: Activity,
                title: "Full Digital Track & Trace",
                desc: "Every shipment tracked across all corridor nodes from DWC intake to final-mile delivery. Brokers and shippers both get live visibility — no black holes, no 'we'll check and call you back'.",
                badge: "Live across all legs",
                color: "sky",
              },
              {
                icon: Globe,
                title: "CPEC Free Zone Access",
                desc: "Cargo transiting Gawadar under CPEC Free Zone status avoids re-export duty and benefits from expedited customs handling. That's a cost advantage no traditional sea carrier out of Jebel Ali can match.",
                badge: "Zero re-export duty",
                color: "emerald",
              },
              {
                icon: Users,
                title: "Broker-Powered Distribution",
                desc: "An army of freight brokers across the GCC, South Asia, and CIS markets source enquiries and route them into ChainTrack. This is how we grow volume faster than a traditional sales team ever could.",
                badge: "Commission-incentivised",
                color: "violet",
              },
              {
                icon: Package,
                title: "One Contract, All Modes",
                desc: "Air, sea, multimodal, overland — unified under a single contract, single track-and-trace number, and single point of accountability. No finger-pointing between air and sea agents.",
                badge: "Unified documentation",
                color: "amber",
              },
            ].map((c) => {
              const colorMap: Record<string, { border: string; icon: string; badge: string }> = {
                amber: { border: "border-amber-500/20", icon: "text-amber-400 bg-amber-500/10", badge: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
                rose: { border: "border-rose-500/20", icon: "text-rose-400 bg-rose-500/10", badge: "bg-rose-500/15 text-rose-300 border-rose-500/25" },
                sky: { border: "border-sky-500/20", icon: "text-sky-400 bg-sky-500/10", badge: "bg-sky-500/15 text-sky-300 border-sky-500/25" },
                emerald: { border: "border-emerald-500/20", icon: "text-emerald-400 bg-emerald-500/10", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
                violet: { border: "border-violet-500/20", icon: "text-violet-400 bg-violet-500/10", badge: "bg-violet-500/15 text-violet-300 border-violet-500/25" },
              };
              const cm = colorMap[c.color];
              return (
                <FadeUp key={c.title}>
                  <div className={`border ${cm.border} bg-white/2 rounded-2xl p-7 h-full flex flex-col gap-4 hover:bg-white/4 transition-colors`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-10 h-10 rounded-xl ${cm.icon} flex items-center justify-center shrink-0`}>
                        <c.icon className="w-5 h-5" />
                      </div>
                      <Badge className={`text-[10px] ${cm.badge}`}>{c.badge}</Badge>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2">{c.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CARGO TYPES ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/8 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">What We Move</h2>
            <p className="text-white/40 text-sm">Commercial and relocation cargo across every category</p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📱", title: "Refurbished Electronics", sub: "iPhones · Laptops · Tablets" },
              { icon: "🏠", title: "Relocation Cargo", sub: "Household · Personal effects" },
              { icon: "💊", title: "Pharma & Cold-Chain", sub: "GDP-compliant · Reefer" },
              { icon: "📦", title: "FMCG & Consumer Goods", sub: "Bulk consolidation · LCL/FCL" },
              { icon: "⚙️", title: "Machinery & Spares", sub: "Project cargo · Breakbulk" },
              { icon: "🚗", title: "Vehicles", sub: "Bonded transit · CPEC FZ" },
              { icon: "🌿", title: "Perishables", sub: "Fresh produce · Reefer chain" },
              { icon: "🏗️", title: "Construction Materials", sub: "Bulk · Heavy lift available" },
            ].map((g) => (
              <FadeUp key={g.title}>
                <div className="border border-white/8 rounded-xl p-4 flex items-start gap-3 hover:bg-white/4 transition-colors">
                  <span className="text-xl shrink-0 mt-0.5">{g.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{g.title}</p>
                    <p className="text-xs text-white/35 mt-0.5">{g.sub}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISRUPTION ADVANTAGE (compact) ─────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-red-400">Route Disruption Status</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                  Jebel Ali Disrupted. DWC Open.<br />Hormuz Contested. Gawadar Clear.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                  War-risk surcharges on Hormuz-routed vessels now exceed +340%. Blank sailings from major lines. 180+ vessels rerouted. ChainTrack's air charter and Gawadar corridor was built for exactly this — and it's operational now.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {[
                  { label: "Jebel Ali", status: "disrupted" },
                  { label: "Strait of Hormuz", status: "disrupted" },
                  { label: "Dubai World Central", status: "clear" },
                  { label: "Gawadar Port", status: "clear" },
                ].map((r) => (
                  <div key={r.label} className={`rounded-xl border px-4 py-3 text-center ${r.status === "disrupted" ? "border-red-500/30 bg-red-500/8" : "border-emerald-500/30 bg-emerald-500/8"}`}>
                    <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${r.status === "disrupted" ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`} />
                    <p className={`text-[11px] font-black uppercase ${r.status === "disrupted" ? "text-red-300" : "text-emerald-300"}`}>
                      {r.status === "disrupted" ? "Disrupted" : "Operational"}
                    </p>
                    <p className="text-[10px] text-white/40 mt-0.5">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TRACKER ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/8 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-8">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-3 gap-1.5 text-xs">
              <Route className="w-3.5 h-3.5" /> Shipment Tracker
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Track Your Cargo</h2>
            <p className="text-white/40 text-sm">Live across all four corridor nodes — intake to delivery</p>
          </FadeUp>
          <FadeUp>
            <ShipmentTracker />
          </FadeUp>
        </div>
      </section>

      {/* ── PARTNER TIERS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Badge className="bg-violet-500/15 text-violet-400 border-violet-500/25 mb-4">Partnership Tiers</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Choose Your Role</h2>
            <p className="text-white/50 max-w-lg mx-auto text-sm">Every tier earns. Pick the one that fits your business.</p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                tier: "Freight Broker",
                tagline: "Refer & Earn",
                desc: "Bring us enquiries. We handle everything else. Best for individuals, travel agents, and relocation consultants.",
                items: ["5% commission on every shipment", "No logistics expertise required", "WhatsApp-based workflow", "Instant onboarding"],
                cta: "Join Free",
                highlight: false,
              },
              {
                tier: "Freight Forwarder",
                tagline: "Block-Space Partner",
                desc: "Access our charter slots and port handling. Resell to your existing client base with your own margins.",
                items: ["Block-space agreement on charter flights", "Port handling at Gawadar included", "API track & trace integration", "Dedicated account manager"],
                cta: "Apply as Partner",
                highlight: true,
              },
              {
                tier: "Origin Consolidator",
                tagline: "Dubai-Based",
                desc: "Collect and consolidate cargo in Dubai or other UAE hubs. ChainTrack handles everything from the cargo gate onward.",
                items: ["DXB / DWC cargo acceptance", "Consolidation & palletisation", "Same-day uplift access", "Customs clearance support"],
                cta: "Apply as Consolidator",
                highlight: false,
              },
            ].map((t) => (
              <FadeUp key={t.tier}>
                <div className={`rounded-2xl p-7 h-full flex flex-col gap-4 ${t.highlight ? "border border-amber-500/50 bg-amber-500/8" : "border border-white/8 bg-white/3"}`}>
                  {t.highlight && <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] self-start">Most Popular</Badge>}
                  <div>
                    <p className="text-xs text-white/40 font-semibold mb-1">{t.tagline}</p>
                    <h3 className="text-lg font-black text-white">{t.tier}</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{t.desc}</p>
                  <ul className="space-y-2 flex-1">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/60">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${t.highlight ? "text-amber-400" : "text-white/30"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full font-bold gap-2 ${t.highlight ? "bg-amber-500 hover:bg-amber-400 text-slate-950" : "bg-white/8 hover:bg-white/12 text-white border border-white/10"}`}
                      data-testid={`button-tier-${t.tier.toLowerCase().replace(/\s+/g, "-")}`}>
                      {t.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/8 bg-gradient-to-b from-[#0a0d12] to-amber-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-5 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Move Cargo<br />or Earn as a Broker?
            </h2>
            <p className="text-white/50 mb-8 text-base leading-relaxed">
              One WhatsApp message is all it takes. Tell us your cargo details or ask about joining the broker network — we respond within the hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 text-base"
                  data-testid="button-final-whatsapp">
                  <MessageSquare className="w-5 h-5" /> WhatsApp Us Now
                </Button>
              </a>
              <a href="mailto:logistics@chaintrack.com">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 gap-2 h-12 text-base"
                  data-testid="button-final-email">
                  logistics@chaintrack.com
                </Button>
              </a>
            </div>
            <p className="text-white/25 text-xs mt-6">
              Dubai World Central · Gawadar CPEC Free Zone · INSTC Corridor · Available 7 days
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
