import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import heroCargoImg from "@assets/stock_images/hero_cargo_plane.jpg";
import dubaiHubImg from "@assets/stock_images/dubai_air_hub.jpg";
import gwadarPortImg from "@assets/stock_images/gawadar_port.jpg";
import instcRailImg from "@assets/stock_images/instc_rail.jpg";
import shippingPortImg from "@assets/stock_images/hero_shipping_port.jpg";
import brokerHandshakeImg from "@assets/stock_images/broker_handshake_dubai.jpg";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane, Ship, Globe, ArrowRight, Zap, Shield, Package, Anchor, Route,
  CheckCircle2, RefreshCw, Activity, ChevronRight, MessageSquare,
  Handshake, TrendingUp, Clock, Star, Users, DollarSign, Truck,
  Radio, MapPin, Network, Layers, BarChart3, Lock, Wifi, Smartphone,
  AlertTriangle, Wind, Target, Building2, Warehouse, Gavel,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";

// ─── Animation helpers ──────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >{children}</motion.div>
  );
}

// ─── Live intelligence ticker ────────────────────────────────────────────────

const TICKERS = [
  { label: "INTEL", text: "iPhone 15 Pro Max 256GB Grade A — DAFZA landed $489 · Almaty retail $720 · margin window ~47%", color: "text-cyan-400" },
  { label: "ROUTE", text: "DXB → GYD (Baku) electronics air corridor: <4h transit · 0% re-export duty · lot clearance under 48h", color: "text-emerald-400" },
  { label: "DEMAND", text: "CIS demand up 34% on Grade A/B iPhone 13–15 Pro — Kazakhstan & Uzbekistan lead absorption", color: "text-violet-400" },
  { label: "INTEL", text: "India RODTEP scheme: 2% export rebate on IMEI-verified refurb devices — lowest landed cost in corridor", color: "text-amber-400" },
  { label: "ALERT", text: "China refurb iPhone re-export tightening — US & India ITAD supply preferred through Dubai hub", color: "text-red-400" },
  { label: "ROUTE", text: "DAFZA → Karachi sea lane: 40k units/mo Pakistani demand active · 2-day customs window", color: "text-emerald-400" },
  { label: "INTEL", text: "Grade C iPhone 12 mix lots trading $89–$105/unit at Commercity — $40 above secondary breakout floor", color: "text-sky-400" },
  { label: "NEW",   text: "US carrier ITAD lots airfreighted to DAFZA within 72h of IMEI clearance — pipeline now open", color: "text-violet-400" },
];

function LiveTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TICKERS.length), 4500);
    return () => clearInterval(t);
  }, []);
  const item = TICKERS[idx];
  return (
    <div className="bg-[#0d1117] border-b border-white/8 px-4 py-2.5 flex items-center gap-3">
      <span className={`text-[9px] font-black uppercase tracking-widest border px-2 py-0.5 rounded shrink-0 ${
        item.color === "text-red-400" ? "border-red-500/40 text-red-400" :
        item.color === "text-amber-400" ? "border-amber-500/40 text-amber-400" :
        item.color === "text-sky-400" ? "border-sky-500/40 text-sky-400" :
        item.color === "text-violet-400" ? "border-violet-500/40 text-violet-400" :
        "border-emerald-500/40 text-emerald-400"
      }`}>{item.label}</span>
      <AnimatePresence mode="wait">
        <motion.p key={idx}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3 }}
          className="text-xs text-white/60 font-medium truncate"
        >
          <span className={`font-bold mr-1 ${item.color}`}>·</span>{item.text}
        </motion.p>
      </AnimatePresence>
      <span className="ml-auto shrink-0 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest hidden sm:block">Live</span>
      </span>
    </div>
  );
}

// ─── Shipment tracker ─────────────────────────────────────────────────────────

const DEMO_IDS = ["CT-DXB-4821", "CT-DWC-7734", "CT-GWD-9901"];
const STAGES = [
  { key: "intake",   label: "DWC Cargo Intake",         sub: "Dubai World Central · air cargo apron",      icon: Package },
  { key: "airborne", label: "Air Charter in Transit",   sub: "Dubai → Gawadar · Hormuz-free corridor",     icon: Plane   },
  { key: "port",     label: "Gawadar CPEC FZ Customs",  sub: "Deep-sea port · 0% re-export duty",          icon: Anchor  },
  { key: "onward",   label: "Onward Delivery",          sub: "INSTC rail / road · last-mile destination",  icon: Truck   },
];

function seeded(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

function buildShipment(id: string) {
  const progress = seeded(id, 4);
  return {
    progress,
    kg: 200 + seeded(id + "kg", 800),
    cbm: (0.3 + seeded(id + "cbm", 80) / 100).toFixed(1),
    broker: ["AL-Rashid Freight", "Gulf Link FWD", "Falcon Cargo WLL", "Silk Route Brokers"][seeded(id + "b", 4)],
    ago: [2, 6, 14, 38][progress],
    etaDays: [3, 2, 1, 0][progress],
  };
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-2 mb-3">
        <input type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && input.trim() && track(input)}
          placeholder="Enter tracking ID  ·  e.g. CT-DXB-4821"
          className="flex-1 bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-500/40 transition-colors"
          data-testid="input-tracking-number" />
        <Button onClick={() => input.trim() && track(input)} disabled={!input.trim() || animating}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 rounded-xl gap-2 shrink-0"
          data-testid="button-track-shipment">
          {animating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Route className="w-4 h-4" />}
          Track
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-[11px] text-white/25 font-medium">Demo:</span>
        {DEMO_IDS.map(n => (
          <button key={n} onClick={() => track(n)}
            className="text-[11px] font-bold text-amber-400 border border-amber-500/20 rounded-lg px-3 py-1 hover:bg-amber-500/10 transition-colors"
            data-testid={`chip-demo-${n}`}>{n}</button>
        ))}
      </div>

      {ship && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}
          className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-0.5">ChainTrack Logistics</p>
              <p className="text-lg font-black text-white">{tracking}</p>
            </div>
            <div className="text-right">
              {ship.etaDays === 0
                ? <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Delivered</Badge>
                : <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">In Transit · ETA {ship.etaDays}d</Badge>}
              <p className="text-xs text-white/25 mt-1">{ship.kg} kg · {ship.cbm} CBM</p>
            </div>
          </div>
          <div className="px-6 py-2 bg-amber-500/5 border-b border-amber-500/10 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-300 font-semibold">{ship.broker}</span>
            <span className="text-white/25 text-xs">· Network broker</span>
          </div>
          <div className="px-6 py-5">
            {STAGES.map((stage, i) => {
              const done = i < ship.progress, active = i === ship.progress;
              return (
                <div key={stage.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${done ? "bg-emerald-500 border-emerald-500" : active ? "bg-amber-500 border-amber-500" : "bg-white/4 border-white/10"}`}>
                      {done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <stage.icon className={`w-4 h-4 ${active ? "text-slate-950" : "text-white/25"}`} />}
                    </div>
                    {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 min-h-[24px] my-1 ${done ? "bg-emerald-500/35" : "bg-white/8"}`} />}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-bold ${done ? "text-white" : active ? "text-amber-400" : "text-white/30"}`}>{stage.label}</p>
                        <p className="text-xs text-white/25 mt-0.5">{stage.sub}</p>
                      </div>
                      {done && <span className="text-[10px] text-white/25 shrink-0">{ship.ago + i * 2}h ago</span>}
                      {active && <span className="text-[10px] font-black text-amber-400 shrink-0 animate-pulse">ACTIVE</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-6 pb-5 pt-1 border-t border-white/8 flex items-center justify-between gap-4">
            <p className="text-xs text-white/25">Full live tracking available to registered network brokers.</p>
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ChainTrackLogistics() {
  const WA = "https://wa.me/971523906019?text=ChainTrack%20Logistics%20enquiry";

  const SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://logistics.chaintrack.com/#organization",
        "name": "ChainTrack Logistics",
        "url": "https://logistics.chaintrack.com",
        "parentOrganization": { "name": "DeliWer", "url": "https://www.deliwer.com" },
        "description": "ChainTrack Logistics is a digital-first, asset-light freight coordination platform operating the Dubai–Gawadar air charter corridor and multimodal INSTC/CPEC routes connecting the Middle East, South Asia, Central Asia and CIS markets. No physical office required. Remote freight brokers earn 5% commission on every shipment.",
        "telephone": "+971523946311",
        "email": "logistics@chaintrack.com",
        "areaServed": [
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Pakistan" },
          { "@type": "Country", "name": "Kazakhstan" },
          { "@type": "Country", "name": "Uzbekistan" },
          { "@type": "Country", "name": "Azerbaijan" },
          { "@type": "Country", "name": "Russia" },
          { "@type": "Country", "name": "China" },
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "Georgia" }
        ],
        "sameAs": ["https://www.deliwer.com/logistics", "https://chaintrack.com"]
      },
      {
        "@type": "Service",
        "name": "ChainTrack Dubai–Gawadar Air Charter Corridor",
        "serviceType": "Air Freight",
        "provider": { "@id": "https://logistics.chaintrack.com/#organization" },
        "description": "Dedicated air charter corridor from Dubai World Central (DWC) to Gawadar CPEC Free Zone, bypassing the Strait of Hormuz entirely. Transit under 4 hours.",
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "Contact for quote" },
        "areaServed": ["UAE", "Pakistan", "Central Asia", "CIS"]
      },
      {
        "@type": "Service",
        "name": "ChainTrack Freight Broker Network",
        "serviceType": "Freight Brokerage Partner Program",
        "provider": { "@id": "https://logistics.chaintrack.com/#organization" },
        "description": "Remote freight broker programme. 5% gross commission on every confirmed shipment. Corridor Captains earn additional override on sub-broker network. Operate from anywhere via WhatsApp.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free to join. Earn 5% commission per shipment." }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the Dubai to Gawadar air charter route?", "acceptedAnswer": { "@type": "Answer", "text": "ChainTrack Logistics operates dedicated air charter flights from Dubai World Central (DWC) to Gawadar CPEC Free Zone in Pakistan. The transit takes under 4 hours, bypasses the Strait of Hormuz entirely, and connects to the INSTC and CPEC corridors for onward delivery to Central Asia, China, and Russia." } },
          { "@type": "Question", "name": "How do I become a ChainTrack freight broker?", "acceptedAnswer": { "@type": "Answer", "text": "Join free via WhatsApp at +971523906019. No logistics experience required. Send us a shipper enquiry and earn 5% gross commission on every confirmed shipment. Corridor Captains who build a sub-broker network earn an additional 1% override on all sub-broker shipments." } },
          { "@type": "Question", "name": "What is the CPEC Free Zone advantage for cargo?", "acceptedAnswer": { "@type": "Answer", "text": "Cargo transiting through the Gawadar CPEC Free Zone benefits from zero re-export duty, expedited customs handling, and direct connectivity to the INSTC (International North–South Transport Corridor) and CPEC rail network to China. This eliminates cost disadvantages compared to Hormuz-routed sea freight." } },
          { "@type": "Question", "name": "Can I operate as a freight broker without being in Dubai?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. ChainTrack Logistics is built as a fully remote, asset-light model. Brokers operate via WhatsApp from anywhere in the world — Tashkent, London, Toronto, or Karachi. You send us the shipper enquiry; we handle quoting, routing, customs, documentation, and delivery." } }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#080b10] text-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      {/* ── HELMET — comprehensive SEO ──────────────────────────────────────── */}
      <Helmet>
        <title>ChainTrack Logistics — Dubai Electronics Logistics · Recommerce · DXB & DWC Cargo Coordination | logistics.chaintrack.com</title>
        <meta name="description" content="ChainTrack: Remote sourcing, inspections, escrow coordination, and global logistics support for refurbished electronics, recommerce inventory, household goods, and reverse supply chains moving through Dubai's DXB & DWC gateways across Europe, Asia, Africa, CIS, and emerging trade corridors." />
        <meta name="keywords" content="Dubai electronics logistics, refurbished iPhone sourcing, recommerce logistics Dubai, DXB cargo coordination, DWC logistics Dubai, CIS electronics trade, reverse logistics Dubai, remote sourcing Dubai, electronics cargo coordination, refurbished electronics export, recommerce supply chain, Dubai DWC freight, Azerbaijan electronics trade, household goods Dubai logistics, broker-powered trade network, escrow coordination logistics, remote inspection electronics, certified grading Dubai, cargo consolidation Dubai, cross-border electronics distribution, ChainTrack logistics" />
        <meta name="author" content="ChainTrack Logistics by DeliWer" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* GEO — multi-region targeting */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, United Arab Emirates" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <meta http-equiv="content-language" content="en" />

        {/* Open Graph — chaintrack.com */}
        <meta property="og:title" content="ChainTrack Logistics — Dubai Electronics Logistics · Recommerce · DXB & DWC Cargo" />
        <meta property="og:description" content="Remote sourcing, inspections, escrow coordination, and global logistics support for refurbished electronics, recommerce inventory, and reverse supply chains via Dubai's DXB & DWC gateways." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://logistics.chaintrack.com" />
        <meta property="og:image" content="https://logistics.chaintrack.com/chaintrack-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="ChainTrack Logistics" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ChainTrackLog" />
        <meta name="twitter:title" content="ChainTrack Logistics — Dubai Electronics Logistics · Recommerce · DXB & DWC Cargo" />
        <meta name="twitter:description" content="Remote sourcing, inspections, escrow coordination, and logistics for refurbished electronics and recommerce inventory moving through Dubai's DXB & DWC gateways." />
        <meta name="twitter:image" content="https://logistics.chaintrack.com/chaintrack-og.png" />

        <link rel="canonical" href="https://logistics.chaintrack.com" />
        <link rel="sitemap" type="application/xml" href="/sitemap-chaintrack.xml" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>
      <LiveTicker />
      {/* ── Pipeline indicator ── */}
      <div className="bg-[#080b10] border-b border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          <Link href="/chaintrack">
            <span className="text-white/35 hover:text-amber-400 transition-colors cursor-pointer">① Source on ChainTrack</span>
          </Link>
          <span className="text-white/15 mx-2">→</span>
          <span className="text-white/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            ② Ship
          </span>
        </div>
      </div>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroCargoImg} alt="ChainTrack cargo plane Dubai" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b10]/50 via-[#080b10]/30 to-[#080b10]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(245,158,11,0.06),transparent)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="flex flex-wrap items-center gap-2 mb-7">
                <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/25 gap-1.5 text-xs font-bold px-3 py-1">
                  <Smartphone className="w-3.5 h-3.5" /> Recommerce Logistics
                </Badge>
                <Badge className="bg-sky-500/15 text-sky-300 border-sky-500/25 gap-1.5 text-xs font-bold px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> DXB & DWC Cargo Active
                </Badge>
                <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/25 text-xs font-bold px-3 py-1">
                  Broker-Powered Trade Network
                </Badge>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-5xl md:text-7xl font-black leading-[1.04] tracking-tight mb-6"
            >
              From Devices<br />
              <span className="text-amber-400">to Destinations.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg md:text-xl text-white/55 max-w-2xl mb-4 leading-relaxed"
            >
              Escrow coordination, cargo consolidation, and global logistics for refurbished electronics moving through Dubai's DXB & DWC gateways — to Europe, CIS, Africa, and Central Asia.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="text-base text-white/40 max-w-xl mb-10 leading-relaxed"
            >
              From DAFZA intake to last-mile delivery. We handle customs, escrow release, and freight — you focus on the trade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 h-12 text-base w-full sm:w-auto" data-testid="button-request-logistics">
                  <MessageSquare className="w-5 h-5" /> Request Logistics Support
                </Button>
              </a>
              <Link href="/logistics-funnel">
                <Button size="lg" variant="outline" className="border-white/15 text-white hover:bg-white/5 px-8 gap-2 h-12 text-base w-full sm:w-auto" data-testid="button-broker-partner">
                  <Handshake className="w-5 h-5" /> Become a Broker Partner
                </Button>
              </Link>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.44 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {["Cargo Consolidation", "Charter Logistics", "Escrow Coordination", "Customs Clearance", "Reverse Supply Chains", "Cross-Border Distribution", "Last-Mile Delivery"].map(pill => (
                <span key={pill} className="text-[11px] font-semibold text-white/45 border border-white/10 rounded-full px-3 py-1 bg-white/3">
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/8 overflow-hidden"
          >
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
              {[
                { icon: Plane,      label: "DXB & DWC Cargo Coordination" },
                { icon: Smartphone, label: "Refurbished Electronics Logistics" },
                { icon: Target,     label: "Remote Inspections" },
                { icon: Lock,       label: "Escrow Coordination" },
                { icon: Network,    label: "Broker-Powered Trade Network" },
                { icon: Package,    label: "Household Goods Shipments" },
                { icon: RefreshCw,  label: "Recommerce & Reverse Logistics" },
                { icon: MapPin,     label: "Azerbaijan Local Coordination" },
                { icon: Globe,      label: "CIS & Central Asia Trade Support" },
                { icon: Route,      label: "Emerging Air-Sea Corridor Access" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 shrink-0 text-white/40 hover:text-white/70 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                  <span className="text-xs font-semibold whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── LOGISTICS FLOW ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/8">
        <div className="max-w-6xl mx-auto">

          <FadeUp className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/25 gap-1.5 mb-5">
                  <Truck className="w-3.5 h-3.5" /> Logistics Services
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Intake. Escrow. Deliver.<br />
                  <span className="text-amber-400">End to end.</span>
                </h2>
              </div>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                From DAFZA bonded intake to last-mile delivery across 30+ markets. Every step coordinated — you close the deal.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              {
                step: "01",
                icon: Warehouse,
                title: "DAFZA / DWC Intake",
                desc: "Electronics lots received at Dubai freezone. Manifest reconciliation and grade compliance check against auction specification. Bonded storage — zero UAE import duty.",
                tags: ["DAFZA Bonded", "DWC Freezone", "Grade Compliance"],
                color: "amber",
              },
              {
                step: "02",
                icon: Lock,
                title: "Escrow & Customs",
                desc: "Funds held until buyer confirms delivery. Zero-duty re-export processing. AWB, COO, and packing list issued. Same-day customs clearance at DAFZA.",
                tags: ["Escrow Protected", "0% Re-export Duty", "Full Docs"],
                color: "sky",
              },
              {
                step: "03",
                icon: Globe,
                title: "Global Delivery",
                desc: "Air freight via DXB or DWC. 1FLT charter for bulk lots. DDP or EXW terms. CIS, Europe, Africa, and South Asia — same-week delivery from intake.",
                tags: ["1FLT Charter", "DDP / EXW", "30+ Markets"],
                color: "emerald",
              },
            ].map((s, i) => {
              const cm: Record<string, { num: string; icon: string; tag: string }> = {
                amber:   { num: "text-amber-400",   icon: "bg-amber-500/10 text-amber-400",    tag: "bg-amber-500/8 border-amber-500/20 text-amber-300" },
                sky:     { num: "text-sky-400",     icon: "bg-sky-500/10 text-sky-400",        tag: "bg-sky-500/8 border-sky-500/20 text-sky-300" },
                emerald: { num: "text-emerald-400", icon: "bg-emerald-500/10 text-emerald-400", tag: "bg-emerald-500/8 border-emerald-500/20 text-emerald-300" },
              };
              const c = cm[s.color];
              return (
                <FadeUp key={s.step} delay={i * 0.08}>
                  <div className="border border-white/8 rounded-2xl p-6 h-full flex flex-col gap-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.icon}`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-black ${c.num} opacity-40`}>{s.step}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base mb-2">{s.title}</h3>
                      <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/6">
                      {s.tags.map(tag => (
                        <span key={tag} className={`text-[10px] font-semibold border rounded-full px-2.5 py-0.5 ${c.tag}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp>
            <Link href="/chaintrack">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-cyan-500/40 transition-colors group" data-testid="bridge-to-chaintrack">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Gavel className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">Don't have inventory yet?</p>
                    <p className="text-white/45 text-xs mt-0.5">Browse live lots on the ChainTrack marketplace — source, win, then we ship it.</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-cyan-400 font-black text-xs uppercase tracking-widest shrink-0 group-hover:gap-2.5 transition-all">
                  Browse Live Lots <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </FadeUp>

        </div>
      </section>

      {/* ── THE STRATEGIC OPPORTUNITY ────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/25 gap-1.5 mb-5">
                <Activity className="w-3.5 h-3.5" /> Global Trade Reset
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                Where Supply Chains Break,<br />
                <span className="text-amber-400">Recommerce Wins.</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-4">
                Sanctions, port disruptions, and shifting trade alliances have fractured traditional electronics supply chains — creating a vacuum that recommerce networks and independent brokers are rushing to fill. Dubai sits at the exact intersection of every emerging corridor: Europe, Africa, CIS, South Asia, and the Gulf.
              </p>
              <p className="text-white/40 leading-relaxed text-sm mb-6">
                ChainTrack connects verified refurbished electronics suppliers to wholesale buyers across 30+ markets — using Dubai's DXB and DWC gateways as the central redistribution hub for the global recommerce economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2" data-testid="button-opportunity-sourcing">
                    <Smartphone className="w-4 h-4" /> Source Electronics Now
                  </Button>
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/15 text-white hover:bg-white/5 gap-2" data-testid="button-opportunity-broker">
                    <Handshake className="w-4 h-4" /> Become a Trade Broker
                  </Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { stat: "$100B+", desc: "Global recommerce electronics market by 2027", color: "border-amber-500/25 bg-amber-500/5", badge: "text-amber-400" },
                { stat: "40M+",   desc: "Used iPhones traded annually across MENA, CIS & Asia", color: "border-amber-500/25 bg-amber-500/5", badge: "text-amber-400" },
                { stat: "DXB/DWC", desc: "Dual Dubai gateways connecting 240+ destinations", color: "border-sky-500/25 bg-sky-500/5", badge: "text-sky-400" },
                { stat: "30+",    desc: "Active recommerce destination markets via ChainTrack", color: "border-emerald-500/25 bg-emerald-500/5", badge: "text-emerald-400" },
              ].map(s => (
                <div key={s.stat} className={`border ${s.color} rounded-2xl p-5`}>
                  <p className={`text-2xl font-black ${s.badge} mb-1`}>{s.stat}</p>
                  <p className="text-xs text-white/45 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Crisis → corridor cards */}
          <FadeUp>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-5">How global disruptions unlock new electronics trade routes</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "🚢",
                  crisis: "Red Sea & Suez Disruption",
                  opp: "European buyers now source refurbished iPhones via Dubai air corridors — faster and cheaper than rerouted container shipping.",
                  cta: "Source from Europe via Dubai",
                  color: "border-red-500/20 bg-red-500/4",
                },
                {
                  icon: "🌍",
                  crisis: "CIS Sanctions Squeeze",
                  opp: "Azerbaijan, Kazakhstan, and Georgia have emerged as the primary redistribution hubs for refurbished electronics entering Russia and Central Asia.",
                  cta: "Open CIS Trade Lane",
                  color: "border-violet-500/20 bg-violet-500/4",
                },
                {
                  icon: "📱",
                  crisis: "China Export Restrictions",
                  opp: "Recommerce fills the gap — certified refurbished iPhones and Samsung units replace new device supply across Africa and South Asia at 30–50% lower cost.",
                  cta: "Access Africa & Asia",
                  color: "border-sky-500/20 bg-sky-500/4",
                },
                {
                  icon: "✈️",
                  crisis: "Air Cargo Capacity Surplus",
                  opp: "DWC freighter availability means express electronics shipments — same-week delivery from inspection to buyer doorstep across 30+ markets.",
                  cta: "Book Air Cargo Slot",
                  color: "border-emerald-500/20 bg-emerald-500/4",
                },
              ].map(c => (
                <FadeUp key={c.crisis}>
                  <div className={`border ${c.color} rounded-2xl p-5 h-full flex flex-col gap-3`}>
                    <span className="text-2xl">{c.icon}</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{c.crisis}</p>
                    <p className="text-sm text-white/60 leading-relaxed flex-1">{c.opp}</p>
                    <a href={WA} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="w-full border-white/10 text-white/55 hover:bg-white/5 text-xs gap-1.5 mt-1" data-testid={`button-crisis-${c.crisis.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`}>
                        {c.cta} <ArrowRight className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE FOUR-NODE CORRIDOR ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Badge className="bg-sky-500/15 text-sky-400 border-sky-500/25 mb-4">The Corridor Architecture</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Four Nodes. One Unbreakable Chain.
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
              Each node is a precision-engineered handoff. Together they form a logistics arc that bypasses every Western-controlled chokepoint.
            </p>
          </FadeUp>

          {/* Node connector visual */}
          <div className="grid md:grid-cols-4 gap-0 mb-10">
            {[
              { num: "01", city: "Dubai (DWC)", role: "Air Freight Hub", desc: "World's largest cargo airport by capacity. 100% land-side — zero Hormuz exposure.", icon: Plane, img: dubaiHubImg, color: "amber" },
              { num: "02", city: "Air Charter", role: "Hormuz Bypass", desc: "Dedicated charter lanes fly direct Dubai→Gawadar. Under 4 hours. No Strait dependency.", icon: Wind, img: heroCargoImg, color: "sky" },
              { num: "03", city: "Gawadar CPEC FZ", role: "Deep-Sea Anchor", desc: "Pakistani deep-sea port backed by $62B CPEC. 0% re-export duty. Outside Hormuz.", icon: Anchor, img: gwadarPortImg, color: "emerald" },
              { num: "04", city: "INSTC / CPEC", role: "Inland Distribution", desc: "North-South corridor to Russia, Central Asia, China. New Silk Road — fully operational.", icon: Route, img: instcRailImg, color: "violet" },
            ].map((n, i) => {
              const cm: Record<string, { badge: string; dot: string; num: string }> = {
                amber: { badge: "bg-amber-500/15 text-amber-300 border-amber-500/25", dot: "bg-amber-500", num: "text-amber-400" },
                sky: { badge: "bg-sky-500/15 text-sky-300 border-sky-500/25", dot: "bg-sky-500", num: "text-sky-400" },
                emerald: { badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25", dot: "bg-emerald-500", num: "text-emerald-400" },
                violet: { badge: "bg-violet-500/15 text-violet-300 border-violet-500/25", dot: "bg-violet-500", num: "text-violet-400" },
              };
              const c = cm[n.color];
              return (
                <FadeUp key={n.city} delay={i * 0.1} className="relative">
                  {/* Connector line */}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-[90px] right-0 w-full h-[1px] bg-gradient-to-r from-white/10 to-white/5 z-10" />
                  )}
                  <div className="relative overflow-hidden rounded-2xl mx-1 group">
                    <div className="h-[180px] relative overflow-hidden">
                      <img src={n.img} alt={n.city} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/50 to-transparent" />
                      <div className={`absolute top-3 left-3 w-8 h-8 rounded-xl ${c.dot}/20 flex items-center justify-center`}>
                        <n.icon className={`w-4 h-4 ${c.num}`} />
                      </div>
                      <span className={`absolute top-3 right-3 text-xs font-black ${c.num} opacity-60`}>{n.num}</span>
                    </div>
                    <div className="p-4">
                      <Badge className={`text-[10px] mb-2 ${c.badge}`}>{n.role}</Badge>
                      <p className="font-bold text-white text-sm mb-1">{n.city}</p>
                      <p className="text-xs text-white/40 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Destinations */}
          <FadeUp>
            <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <p className="text-xs font-black uppercase tracking-widest text-white/30">Active destination markets</p>
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-[10px] self-start sm:self-auto">Bookings open</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "🇦🇪 UAE (origin)", "🇵🇰 Pakistan", "🇦🇿 Azerbaijan",
                  "🇰🇿 Kazakhstan", "🇺🇿 Uzbekistan", "🇷🇺 Russia",
                  "🇬🇪 Georgia", "🇰🇬 Kyrgyzstan", "🇹🇯 Tajikistan",
                  "🇨🇳 China (Xinjiang–CPEC)", "🇮🇳 India (select lanes)",
                  "🇦🇫 Afghanistan (transit)", "🇸🇦 Saudi Arabia", "🇮🇷 Iran (INSTC only)",
                ].map(d => (
                  <span key={d} className="text-xs text-white/55 bg-white/4 border border-white/8 rounded-lg px-3 py-1.5 font-medium">{d}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      {/* ── SYNDICATE BROKER NETWORK ─────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/8 bg-gradient-to-br from-amber-950/25 via-[#080b10] to-[#080b10]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 mb-5">
                <Users className="w-3.5 h-3.5" /> Worldwide Syndicate Network
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                An Army of Freight Brokers.<br />
                <span className="text-amber-400">You Command It from Anywhere.</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-4">
                ChainTrack's growth engine is not a sales team. It's a worldwide network of freight brokers and Corridor Captains — each earning on every shipment they introduce, regardless of where they sit on earth.
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                From Tashkent to Toronto. Karachi to Kuala Lumpur. If you know a shipper, you earn. No logistics degree. No Dubai residency. No upfront investment. WhatsApp is your office.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 lg:h-full min-h-[240px]">
              <img src={brokerHandshakeImg} alt="Freight broker network" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-black uppercase tracking-widest text-amber-400 mb-1">Syndicate model</p>
                <p className="text-white text-sm font-semibold">Refer once. Earn every time they ship.</p>
              </div>
            </div>
          </FadeUp>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              {
                icon: MessageSquare,
                tier: "Freight Broker",
                tagline: "Join Free · Earn Immediately",
                commission: "5% gross",
                how: "Send a shipper enquiry via WhatsApp. We quote, route, and close. You get 5% of the gross freight value — paid within 30 days of delivery.",
                ideal: "Anyone with trade contacts: travel agents, relocation consultants, expat advisors, trade fair attendees, bank trade-finance officers",
                items: ["No logistics experience required", "WhatsApp-only workflow", "Commission on air, sea & multimodal", "Paid monthly, no cap"],
                cta: "Join as Broker",
                highlight: false,
                color: "border-white/10",
              },
              {
                icon: Star,
                tier: "Corridor Captain",
                tagline: "Build Your Sub-Broker Army",
                commission: "5% + 1% override",
                how: "Recruit sub-brokers in your region. Earn your own 5% on direct shipments plus a 1% override on every shipment your sub-brokers close. The network compounds.",
                ideal: "Freight industry veterans, trade association members, chamber of commerce contacts, logistics company directors, import/export agents",
                items: ["5% on own shipments", "1% override on sub-broker network", "Priority charter slot access", "Named in ChainTrack corridor reports", "Market intelligence briefings"],
                cta: "Apply as Captain",
                highlight: true,
                color: "border-amber-500/40",
              },
              {
                icon: Building2,
                tier: "Freight Forwarder",
                tagline: "White-Label the Corridor",
                commission: "Block-space margin",
                how: "Access ChainTrack's charter slots and Gawadar port handling at wholesale rates. Resell to your existing clients under your own brand and margin.",
                ideal: "Established freight companies wanting Hormuz-free routing, UAE-based forwarders needing Gawadar access, CIS forwarders needing Dubai gateway",
                items: ["Wholesale block-space pricing", "Gawadar port handling included", "API track & trace integration", "Dedicated account manager", "Co-branded documentation"],
                cta: "Apply as Forwarder",
                highlight: false,
                color: "border-white/10",
              },
            ].map(t => (
              <FadeUp key={t.tier}>
                <div className={`border ${t.color} ${t.highlight ? "bg-amber-500/6" : "bg-white/2"} rounded-2xl p-7 h-full flex flex-col gap-4`}>
                  {t.highlight && (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] self-start">Most Lucrative</Badge>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.highlight ? "bg-amber-500/15 text-amber-400" : "bg-white/5 text-white/50"}`}>
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 font-semibold mb-0.5">{t.tagline}</p>
                    <h3 className="text-lg font-black text-white">{t.tier}</h3>
                    <p className={`text-sm font-black mt-1 ${t.highlight ? "text-amber-400" : "text-white/60"}`}>{t.commission} commission</p>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">{t.how}</p>
                  <p className="text-[11px] text-white/30 italic leading-relaxed border-t border-white/8 pt-3">{t.ideal}</p>
                  <ul className="space-y-2">
                    {t.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/55">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${t.highlight ? "text-amber-400" : "text-white/25"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button className={`w-full font-bold gap-2 ${t.highlight ? "bg-amber-500 hover:bg-amber-400 text-slate-950" : "bg-white/6 hover:bg-white/10 text-white border border-white/10"}`}
                      data-testid={`button-tier-${t.tier.toLowerCase().replace(/\s+/g, "-")}`}>
                      {t.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* How it works row */}
          <FadeUp>
            <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/25 mb-5">How a broker closes their first shipment</p>
              <div className="grid sm:grid-cols-5 gap-4">
                {[
                  { step: "1", act: "Register",       desc: "WhatsApp +971523906019. Free. 2 minutes." },
                  { step: "2", act: "Find a shipper", desc: "Anyone moving cargo from/to our corridors." },
                  { step: "3", act: "Send enquiry",   desc: "Origin, destination, weight, cargo type. That's all." },
                  { step: "4", act: "We close it",    desc: "ChainTrack quotes, routes, clears customs, delivers." },
                  { step: "5", act: "You get paid",   desc: "5% within 30 days of cargo delivery. No delays." },
                ].map((s, i) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <span className="text-xl font-black text-amber-500/30 shrink-0 w-6 leading-none mt-0.5">{s.step}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{s.act}</p>
                      <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                    {i < 4 && <ChevronRight className="w-4 h-4 text-white/15 shrink-0 hidden sm:block mt-1" />}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      {/* ── WORK FROM ANYWHERE ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Badge className="bg-violet-500/15 text-violet-400 border-violet-500/25 gap-1.5 mb-4">
              <Wifi className="w-3.5 h-3.5" /> Remote-First Logistics
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              No Visa. No Office. No Inventory.<br />
              <span className="text-violet-400">Just Connections That Pay.</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
              Traditional freight companies need warehouses, staff, and local licences. ChainTrack runs as pure coordination intelligence — the physical assets are already in place. You plug in your network and earn.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Wifi,        title: "WhatsApp Is Your Office",        desc: "Every deal, every update, every commission confirmation happens on WhatsApp. No CRM. No email threads. No login required.", color: "violet" },
              { icon: Globe,       title: "Operate in Any Time Zone",        desc: "Route a Dubai-to-Tashkent shipment from a café in Tbilisi. Confirm a charter booking from your phone in London. Geography is irrelevant.", color: "sky" },
              { icon: Lock,        title: "No UAE Residency Needed",         desc: "You don't need a UAE visa, Emirates ID, or local company to earn as a ChainTrack broker. Your network is your licence.", color: "amber" },
              { icon: Layers,      title: "Asset-Light, Network-Heavy",      desc: "We own zero aircraft and zero warehouses. The value is in the connections — between charter operators, port authorities, and shippers. That's where you come in.", color: "emerald" },
              { icon: Smartphone,  title: "Digital Documentation",           desc: "eAWB, eFBL, digital customs manifests. No paper trail. No courier delays. Documentation moves as fast as the cargo.", color: "rose" },
              { icon: BarChart3,   title: "Commission Compounds Over Time",  desc: "Recurring shippers keep shipping. Your first client becomes a monthly income line. Corridor Captains see exponential growth as their sub-network grows.", color: "amber" },
            ].map(c => {
              const cm: Record<string, string> = {
                violet: "bg-violet-500/8 border-violet-500/20 text-violet-400",
                sky: "bg-sky-500/8 border-sky-500/20 text-sky-400",
                amber: "bg-amber-500/8 border-amber-500/20 text-amber-400",
                emerald: "bg-emerald-500/8 border-emerald-500/20 text-emerald-400",
                rose: "bg-rose-500/8 border-rose-500/20 text-rose-400",
              };
              return (
                <FadeUp key={c.title}>
                  <div className={`border rounded-2xl p-6 h-full ${cm[c.color]}`} style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${cm[c.color]}`} style={{ background: "rgba(255,255,255,0.04)" }}>
                      <c.icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-sm">{c.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{c.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
      {/* ── FREIGHT MODES ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/8 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Three Modes. Every Cargo Category.</h2>
            <p className="text-white/40 text-sm">Mix and match based on urgency, weight, and cost.</p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Plane, mode: "Air Charter", img: heroCargoImg,
                time: "Under 4 hours DXB→GWD", cost: "Premium speed, competitive vs war-risk sea",
                best: ["Time-critical cargo", "Refurbished electronics", "Pharma & cold-chain", "High-value parcels", "Stranded sea cargo rerouted"],
                badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",
              },
              {
                icon: Ship, mode: "Sea Freight", img: shippingPortImg,
                time: "12–22 days Jebel Ali / Karachi → CIS", cost: "Lowest cost for bulk volume",
                best: ["Bulk FMCG", "Construction materials", "Machinery & project cargo", "Non-urgent full containers", "Karachi overflow routing"],
                badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
              },
              {
                icon: Truck, mode: "Overland / INSTC Rail", img: instcRailImg,
                time: "8–16 days Gawadar → Central Asia", cost: "Mid-range, INSTC-bonded",
                best: ["Heavy goods", "Post-Gawadar onward delivery", "Kazakhstan & Uzbekistan", "Russia northbound", "Afghan reconstruction lanes"],
                badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
              },
            ].map(m => (
              <FadeUp key={m.mode}>
                <div className="rounded-2xl overflow-hidden border border-white/8 h-full flex flex-col">
                  <div className="relative h-36">
                    <img src={m.img} alt={m.mode} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className={`text-[10px] gap-1 ${m.badge}`}><m.icon className="w-3 h-3" />{m.mode}</Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock className="w-3.5 h-3.5 shrink-0" />{m.time}
                    </div>
                    <p className="text-xs text-white/30 italic">{m.cost}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/25 pt-2 border-t border-white/8">Best for</p>
                    <ul className="space-y-1.5">
                      {m.best.map(b => (
                        <li key={b} className="flex items-center gap-2 text-xs text-white/50">
                          <CheckCircle2 className="w-3 h-3 text-white/20 shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                    <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-auto pt-3">
                      <Button size="sm" variant="outline" className="w-full border-white/10 text-white/60 hover:bg-white/5 text-xs gap-1.5">
                        Get Quote <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      {/* ── CONFLICT-TO-OPPORTUNITY ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge className="bg-rose-500/15 text-rose-400 border-rose-500/25 gap-1.5 mb-4">
                  <Target className="w-3.5 h-3.5" /> Crisis to Opportunity
                </Badge>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  When Trade Breaks — We Find the Route
                </h2>
              </div>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">Each disruption creates a window. ChainTrack turns windows into corridors.</p>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { crisis: "Hormuz blockade", opp: "Air charter becomes price-competitive vs war-risk sea insurance", icon: "🚁", color: "border-red-500/20 bg-red-500/4" },
              { crisis: "Jebel Ali blank sailings", opp: "Stranded cargo rerouted via DWC air in 24 hours — premium fees, premium margins", icon: "⚡", color: "border-amber-500/20 bg-amber-500/4" },
              { crisis: "Sanctions compliance squeeze", opp: "CPEC Free Zone offers legal, sanctions-clear routing alternatives with full compliance documentation", icon: "🛡️", color: "border-emerald-500/20 bg-emerald-500/4" },
              { crisis: "Reconstruction demand surge", opp: "Post-conflict reconstruction cargo floods — ChainTrack brokers first in line for Afghanistan, Sudan, Yemen lanes", icon: "🏗️", color: "border-sky-500/20 bg-sky-500/4" },
            ].map(c => (
              <FadeUp key={c.crisis}>
                <div className={`border ${c.color} rounded-2xl p-5 h-full`}>
                  <span className="text-2xl mb-3 block">{c.icon}</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{c.crisis}</p>
                  <p className="text-sm text-white/60 leading-relaxed">{c.opp}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Live route status */}
          <FadeUp className="mt-8">
            <div className="rounded-2xl border border-white/8 bg-white/2 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-white/25 mb-4">Current route status</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Jebel Ali", status: "disrupted" },
                  { label: "Strait of Hormuz", status: "disrupted" },
                  { label: "Dubai World Central", status: "clear" },
                  { label: "Gawadar Port (CPEC FZ)", status: "clear" },
                ].map(r => (
                  <div key={r.label} className={`rounded-xl border px-4 py-3 text-center ${r.status === "disrupted" ? "border-red-500/25 bg-red-500/5" : "border-emerald-500/25 bg-emerald-500/5"}`}>
                    <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${r.status === "disrupted" ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`} />
                    <p className={`text-[11px] font-black uppercase ${r.status === "disrupted" ? "text-red-300" : "text-emerald-300"}`}>
                      {r.status === "disrupted" ? "Disrupted" : "Operational"}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      {/* ── SHIPMENT TRACKER ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/8 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-8">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-3 gap-1.5 text-xs">
              <Route className="w-3.5 h-3.5" /> Live Shipment Tracker
            </Badge>
            <h2 className="text-2xl font-black text-white mb-2">Track Across All Four Nodes</h2>
            <p className="text-white/35 text-sm">From DWC intake to last-mile delivery — full corridor visibility</p>
          </FadeUp>
          <FadeUp><ShipmentTracker /></FadeUp>
        </div>
      </section>
      {/* ── WHAT WE MOVE ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Every Cargo Category. One Corridor.</h2>
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { e: "📱", t: "Refurbished Electronics", s: "iPhones, laptops, tablets" },
              { e: "🏠", t: "Relocation Cargo",        s: "Household, personal effects" },
              { e: "💊", t: "Pharma & Cold-Chain",     s: "GDP-compliant, reefer" },
              { e: "📦", t: "FMCG & Consumer Goods",   s: "LCL / FCL consolidation" },
              { e: "⚙️", t: "Machinery & Spares",      s: "Project cargo, breakbulk" },
              { e: "🚗", t: "Vehicles",                 s: "Bonded CPEC FZ transit" },
              { e: "🌿", t: "Perishables",              s: "Reefer, fresh produce" },
              { e: "🏗️", t: "Construction Materials",  s: "Reconstruction lanes" },
              { e: "💎", t: "High-Value Parcels",       s: "Insured, priority handling" },
              { e: "🛢️", t: "Industrial Chemicals",    s: "Compliant tanker routing" },
              { e: "🎮", t: "E-Commerce Batches",       s: "Micro-fulfilment, B2C" },
              { e: "🧰", t: "Humanitarian Aid",         s: "NGO & UN supply chains" },
            ].map(g => (
              <FadeUp key={g.t}>
                <div className="border border-white/8 rounded-xl p-4 flex items-start gap-3 hover:bg-white/4 transition-colors">
                  <span className="text-xl shrink-0">{g.e}</span>
                  <div>
                    <p className="font-semibold text-white text-xs leading-snug">{g.t}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{g.s}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/8 bg-gradient-to-b from-[#080b10] to-amber-950/15">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center mx-auto mb-6">
              <Network className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Move Cargo. Earn Commissions.<br />
              <span className="text-amber-400">Change the Trade Map.</span>
            </h2>
            <p className="text-white/45 mb-8 text-base leading-relaxed max-w-lg mx-auto">
              One WhatsApp message. Freight quote within the hour. Broker commission confirmed on every booking. The post-war trade corridor is open. Get on it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 text-base w-full sm:w-auto"
                  data-testid="button-final-whatsapp">
                  <MessageSquare className="w-5 h-5" /> WhatsApp Now
                </Button>
              </a>
              <a href="mailto:logistics@chaintrack.com">
                <Button size="lg" variant="outline" className="border-white/15 text-white/70 hover:bg-white/5 px-8 gap-2 h-12 text-base w-full sm:w-auto"
                  data-testid="button-final-email">
                  logistics@chaintrack.com
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/25">
              {["Dubai World Central", "Gawadar CPEC Free Zone", "INSTC Corridor", "CPEC Rail Network", "Remote-first · No office needed"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />{t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
