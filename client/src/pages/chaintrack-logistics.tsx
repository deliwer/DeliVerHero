import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import dubaiHubImg from "@assets/stock_images/dubai_air_hub.jpg";
import airCharterImg from "@assets/stock_images/air_charter_bridge.jpg";
import gwadarPortImg from "@assets/stock_images/gawadar_port.jpg";
import instcRailImg from "@assets/stock_images/instc_rail.jpg";
import heroLogisticsBg from "@assets/stock_images/hero_cargo_plane.jpg";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane,
  Ship,
  Globe,
  ArrowRight,
  MapPin,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Building2,
  Package,
  Network,
  Anchor,
  Route,
  Target,
  ChevronDown,
  Star,
  Clock,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Navigation,
  Wind,
  RefreshCw,
  Radio,
  Newspaper,
  Activity,
  AlertCircle,
  Waves,
  ChevronRight,
  ExternalLink,
  Gauge,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const DEMO_NUMBERS = ["CT-DXB-4821", "CT-DWC-7734", "CT-GWD-9901"];

const STAGES = [
  { key: "intake",    label: "DWC Cargo Intake",         sub: "Dubai World Central cargo apron",      icon: Package },
  { key: "airborne",  label: "Air Charter in Transit",   sub: "Dubai → Gawadar · Hormuz-free lane",   icon: Plane },
  { key: "port",      label: "GWD Port Processing",      sub: "Gawadar CPEC Free Zone customs",       icon: Anchor },
  { key: "onward",    label: "Onward Delivery",          sub: "INSTC rail / last-mile to destination",icon: Route },
];

function seededInt(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

function buildShipment(id: string) {
  const progress = seededInt(id, 4);
  const kg      = 200 + seededInt(id + "kg", 800);
  const cbm     = (0.3 + seededInt(id + "cbm", 80) / 100).toFixed(1);
  const broker  = ["AL-Rashid Freight", "Gulf Link FWD", "Falcon Cargo WLL", "Silk Route Brokers"][seededInt(id + "b", 4)];
  const ago     = [2, 6, 14, 38][progress];
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
    setTimeout(() => {
      setTracking(id.trim().toUpperCase());
      setAnimating(false);
    }, 700);
  }

  const ship = tracking ? buildShipment(tracking) : null;
  const isDemo = DEMO_NUMBERS.includes(tracking ?? "");

  return (
    <div className="max-w-3xl mx-auto">
      {/* Input row */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input.trim() && track(input)}
          placeholder="Enter tracking number (e.g. CT-DXB-4821)"
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
          data-testid="input-tracking-number"
        />
        <Button
          onClick={() => input.trim() && track(input)}
          disabled={!input.trim() || animating}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 rounded-xl gap-2"
          data-testid="button-track-shipment"
        >
          {animating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Route className="w-4 h-4" />}
          Track
        </Button>
      </div>

      {/* Demo chips */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Try demo:</span>
        {DEMO_NUMBERS.map((n) => (
          <button
            key={n}
            onClick={() => track(n)}
            className="text-xs font-black text-amber-400 border border-amber-500/30 rounded-lg px-3 py-1 hover:bg-amber-500/10 transition-colors"
            data-testid={`chip-demo-${n}`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Result */}
      {ship && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">ChainTrack Logistics</p>
              <p className="text-lg font-black text-white">{tracking}</p>
            </div>
            <div className="text-right">
              {ship.etaDays === 0 ? (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Delivered</Badge>
              ) : (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">In Transit · ETA {ship.etaDays}d</Badge>
              )}
              <p className="text-xs text-slate-500 mt-1">{ship.kg} kg · {ship.cbm} CBM</p>
            </div>
          </div>

          {/* Broker strip */}
          <div className="px-6 py-2.5 bg-amber-500/5 border-b border-amber-500/10 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="text-xs text-amber-300 font-semibold">{ship.broker}</span>
            <span className="text-slate-600 text-xs">· Handling broker</span>
            {isDemo && <Badge className="ml-auto bg-slate-800 text-slate-400 border-slate-700 text-[10px]">Demo shipment</Badge>}
          </div>

          {/* Timeline */}
          <div className="px-6 py-6 space-y-0">
            {STAGES.map((stage, i) => {
              const done    = i < ship.progress;
              const active  = i === ship.progress;
              const pending = i > ship.progress;
              return (
                <div key={stage.key} className="flex gap-4">
                  {/* Spine */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                      done    ? "bg-emerald-500 border-emerald-500" :
                      active  ? "bg-amber-500 border-amber-500 animate-pulse" :
                                "bg-slate-900 border-slate-700"
                    }`}>
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <stage.icon className={`w-4 h-4 ${active ? "text-slate-950" : "text-slate-600"}`} />
                      )}
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[32px] mt-1 mb-1 ${done ? "bg-emerald-500/50" : "bg-slate-800"}`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-black ${done ? "text-white" : active ? "text-amber-400" : "text-slate-500"}`}>
                          {stage.label}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">{stage.sub}</p>
                      </div>
                      {done && (
                        <span className="text-[10px] font-bold text-slate-500 shrink-0">{ship.ago + i * 2}h ago</span>
                      )}
                      {active && (
                        <span className="text-[10px] font-black text-amber-400 shrink-0 animate-pulse">NOW</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="px-6 pb-5 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500">Full real-time track &amp; trace available to registered network brokers.</p>
            <Link href="/logistics-funnel">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-1.5 shrink-0">
                Join to Track Live
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: "4,800km", label: "Dubai → Gawadar Air Corridor", icon: Plane },
  { value: "62%", label: "Cost Savings vs. Strait of Hormuz Routes", icon: TrendingUp },
  { value: "48hr", label: "Door-to-Port Delivery Window", icon: Clock },
  { value: "$62B", label: "CPEC Infrastructure Investment", icon: Building2 },
];

const ROUTE_MILESTONES = [
  {
    city: "Dubai",
    role: "Air Freight Hub",
    detail: "DXB & DWC as the world's largest cargo transit airports — the nerve centre of the new trade arc.",
    icon: Plane,
    color: "from-amber-500 to-orange-600",
    overlay: "from-amber-950/80 via-slate-950/70 to-slate-950/90",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    img: dubaiHubImg,
  },
  {
    city: "Air Charter Bridge",
    role: "Bypass Corridor",
    detail: "Dedicated charter lanes circumvent the Strait of Hormuz entirely — zero dependency on the contested waterway.",
    icon: Wind,
    color: "from-sky-500 to-blue-600",
    overlay: "from-sky-950/80 via-slate-950/70 to-slate-950/90",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    img: airCharterImg,
  },
  {
    city: "Gawadar Port",
    role: "Deep-Sea Anchor",
    detail: "Pakistan's CPEC-built deep-sea port rises as the successor to Jebel Ali — now the primary Indian Ocean gateway.",
    icon: Anchor,
    color: "from-emerald-500 to-teal-600",
    overlay: "from-emerald-950/80 via-slate-950/70 to-slate-950/90",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    img: gwadarPortImg,
  },
  {
    city: "INSTC Network",
    role: "Inland Distribution",
    detail: "International North–South Transport Corridor onward connections to Central Asia, Russia and Europe.",
    icon: Route,
    color: "from-violet-500 to-purple-600",
    overlay: "from-violet-950/80 via-slate-950/70 to-slate-950/90",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    img: instcRailImg,
  },
];

const ADVANTAGES = [
  {
    title: "Hormuz-Free Routing",
    desc: "The Strait of Hormuz handles ~21% of global oil and a significant share of cargo. Ongoing Middle East conflict has made shippers acutely aware of this single point of failure. The Dubai–Gawadar corridor makes it irrelevant.",
    icon: Shield,
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Jebel Ali Succession",
    desc: "With Jebel Ali's regular commercial operations severely disrupted by regional hostilities, Gawadar — backed by $62B in Chinese CPEC investment — has emerged as the ready-built alternative deep-water port on the Arabian Sea.",
    icon: Anchor,
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "CPEC & INSTC Convergence",
    desc: "The China–Pakistan Economic Corridor and the International North–South Transport Corridor converge at Gawadar — creating the first multi-modal interchange directly linking East Asia, South Asia, Central Asia, and the Gulf in a single logistics chain.",
    icon: Network,
    accent: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    title: "Air-to-Sea Feeder Model",
    desc: "High-value, time-sensitive cargo flies Dubai–Gawadar via dedicated charter. At Gawadar it transfers to deep-sea vessels for onward routing at ocean-freight cost. A two-speed supply chain that was never possible before.",
    icon: Layers,
    accent: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
];

const PIONEER_POINTS = [
  "First-mover logistics operator on the Dubai–Gawadar air charter corridor",
  "Exclusive feeder service agreements with Gawadar Port Authority partners",
  "Integrated ChainTrack digital track-and-trace across air and sea legs",
  "DeliWer concierge last-mile delivery at both origin (Dubai) and destination (GWD hinterland)",
  "Unified pricing and documentation — one contract, two transport modes",
  "Compliance-ready for Pakistani customs, CPEC Free Zone regulations, and UAE re-export rules",
];

const PARTNER_TIERS = [
  {
    tier: "Freight Forwarder",
    desc: "Connect your existing client base to the corridor with zero infrastructure investment. Use our charter slots and port handling on demand.",
    features: ["Block-space agreement on charter flights", "Port handling included", "API-connected track & trace", "Dedicated account manager"],
    cta: "Apply as Freight Partner",
    highlight: false,
  },
  {
    tier: "Trade Route Anchor",
    desc: "Commit to a monthly volume threshold and unlock guaranteed slot priority, bonded warehousing at Gawadar Free Zone, and co-branded documentation.",
    features: ["Priority charter slot allocation", "Bonded warehouse in Gawadar FZ", "Co-branded shipping documentation", "24/7 operations desk", "Monthly market intelligence briefs"],
    cta: "Apply as Anchor Partner",
    highlight: true,
  },
  {
    tier: "Origin Consolidator",
    desc: "Collect, consolidate, and hand off cargo in Dubai or other UAE hubs. ChainTrack handles everything from the cargo gate onward.",
    features: ["Dubai DXB/DWC cargo acceptance", "Consolidation & palletisation", "Same-day uplift access", "Customs clearance support"],
    cta: "Apply as Consolidator",
    highlight: false,
  },
];

// ─── Types (mirrored from backend) ───────────────────────────────────────────

interface CorridorItem {
  id: string;
  category: "geopolitical" | "infrastructure" | "trade" | "rates";
  urgency: "critical" | "update" | "watch";
  headline: string;
  summary: string;
  source: string;
  region: string;
  tsLabel: string;
  tsOffset: number;
  icon: string;
  link: string | null;
}

interface RouteStatus {
  id: string;
  label: string;
  status: "operational" | "disrupted" | "limited";
  note: string;
}

interface FreightRate {
  lane: string;
  rate: string;
  change: number;
  unit: string;
}

interface CorridorNewsResponse {
  items: CorridorItem[];
  routeStatus: RouteStatus[];
  freightRates: FreightRate[];
  generatedAt: string;
}

// ─── Category / Urgency meta ─────────────────────────────────────────────────

const CATEGORY_META = {
  geopolitical: { label: "Geopolitical", color: "bg-red-500/15 text-red-300 border-red-500/30" },
  infrastructure: { label: "Infrastructure", color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  trade: { label: "Trade", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  rates: { label: "Rates", color: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
};

const URGENCY_META = {
  critical: { label: "Breaking", dot: "bg-red-400 animate-pulse", badge: "bg-red-500/20 text-red-300 border-red-500/30" },
  update: { label: "Update", dot: "bg-amber-400", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  watch: { label: "Watch", dot: "bg-slate-500", badge: "bg-slate-700/50 text-slate-400 border-slate-600/30" },
};

const ROUTE_STATUS_META = {
  operational: { label: "Operational", dot: "bg-emerald-400", text: "text-emerald-400", bar: "bg-emerald-500" },
  disrupted: { label: "Disrupted", dot: "bg-red-400 animate-pulse", text: "text-red-400", bar: "bg-red-500" },
  limited: { label: "Limited", dot: "bg-amber-400", text: "text-amber-400", bar: "bg-amber-500" },
};

// ─── Ticker component ────────────────────────────────────────────────────────

function NewsTicker({ items }: { items: CorridorItem[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);
  if (!items.length) return null;
  const item = items[idx];
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className={`w-2 h-2 rounded-full shrink-0 ${URGENCY_META[item.urgency].dot}`} />
      <AnimatePresence mode="wait">
        <motion.p
          key={item.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="text-xs text-slate-300 font-medium truncate"
        >
          <span className={`font-black mr-2 ${item.urgency === "critical" ? "text-red-400" : "text-amber-400"}`}>
            {item.region} ·
          </span>
          {item.headline}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ─── Intelligence Feed ───────────────────────────────────────────────────────

function CorridorIntelligence() {
  const [filter, setFilter] = useState<"all" | CorridorItem["category"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [secondsAgo, setSecondsAgo] = useState(0);

  const { data, isLoading, refetch, isFetching } = useQuery<CorridorNewsResponse>({
    queryKey: ["/api/logistics/corridor-news"],
    refetchInterval: 60000,
  });

  // Tick up "updated X seconds ago"
  useEffect(() => {
    if (!data) return;
    setSecondsAgo(0);
    const t = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [data]);

  const items = data?.items ?? [];
  const routeStatus = data?.routeStatus ?? [];
  const freightRates = data?.freightRates ?? [];

  const filteredItems = filter === "all" ? items : items.filter((i) => i.category === filter);

  const categoryTabs: Array<{ id: "all" | CorridorItem["category"]; label: string }> = [
    { id: "all", label: "All" },
    { id: "geopolitical", label: "Geopolitical" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "trade", label: "Trade" },
    { id: "rates", label: "Rates" },
  ];

  return (
    <section id="intelligence" className="py-24 px-6 border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <AnimatedSection className="mb-12">
          <AnimatedItem>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
              <div>
                <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 gap-1.5 mb-4">
                  <Radio className="w-3 h-3 animate-pulse" />
                  Live Corridor Intelligence
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  Market Intel &amp;{" "}
                  <span className="text-amber-400">Route Signals</span>
                </h2>
                <p className="text-slate-400 mt-3 max-w-xl text-lg leading-relaxed">
                  Curated geopolitical, infrastructure, and freight rate intelligence for the Dubai–Gawadar corridor. Updated continuously.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] text-slate-600 hidden sm:block">
                  {isFetching ? "Refreshing…" : `Updated ${secondsAgo}s ago`}
                </span>
                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="p-2 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-500 hover:text-slate-300 transition-all disabled:opacity-40"
                  data-testid="btn-intel-refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>
          </AnimatedItem>

          {/* Live ticker bar */}
          {!isLoading && items.length > 0 && (
            <AnimatedItem>
              <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 mb-8 overflow-hidden">
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] font-black uppercase tracking-widest shrink-0 gap-1">
                  <Activity className="w-2.5 h-2.5" />
                  Live
                </Badge>
                <NewsTicker items={items} />
              </div>
            </AnimatedItem>
          )}
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── LEFT: News cards (2/3 width) ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Category filter tabs */}
            <div className="flex items-center gap-1.5 flex-wrap mb-6">
              {categoryTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id)}
                  data-testid={`btn-intel-filter-${t.id}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filter === t.id
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <span className="ml-auto text-[10px] text-slate-600 font-medium">
                {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
              </span>
            </div>

            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 animate-pulse h-28" />
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => {
                  const cat = CATEGORY_META[item.category];
                  const urg = URGENCY_META[item.urgency];
                  const isOpen = expanded === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors overflow-hidden"
                    >
                      <button
                        className="w-full text-left p-5"
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                        data-testid={`btn-intel-item-${item.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
                            <span className={`w-2 h-2 rounded-full ${urg.dot}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              <Badge className={`text-[9px] font-black border px-2 py-0 h-4 ${urg.badge}`}>
                                {urg.label}
                              </Badge>
                              <Badge className={`text-[9px] font-bold border px-2 py-0 h-4 ${cat.color}`}>
                                {cat.label}
                              </Badge>
                              <span className="text-[9px] text-slate-600 font-medium">{item.region}</span>
                            </div>
                            <p className="text-sm font-bold text-white leading-snug pr-4">{item.headline}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-[10px] text-slate-600">{item.source}</span>
                              <span className="text-[10px] text-slate-700">·</span>
                              <span className="text-[10px] text-slate-600">{item.tsLabel}</span>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-slate-600 shrink-0 mt-1 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 border-t border-slate-800 mt-0">
                              <p className="text-sm text-slate-400 leading-relaxed pt-4">{item.summary}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <AlertCircle className="w-3 h-3 text-slate-600 shrink-0" />
                                <p className="text-[10px] text-slate-600">Source: {item.source}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          {/* ── RIGHT: Status board + rates (1/3 width) ─────────────────── */}
          <div className="space-y-5">

            {/* Route Status Board */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Route Status</span>
              </div>
              <div className="divide-y divide-slate-800">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="px-4 py-3 animate-pulse">
                        <div className="h-3 bg-slate-800 rounded w-3/4 mb-1.5" />
                        <div className="h-2 bg-slate-800 rounded w-1/2" />
                      </div>
                    ))
                  : routeStatus.map((rs) => {
                      const meta = ROUTE_STATUS_META[rs.status];
                      return (
                        <div key={rs.id} className="px-4 py-3" data-testid={`status-route-${rs.id}`}>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-bold text-slate-300 leading-tight">{rs.label}</span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                              <span className={`text-[9px] font-black uppercase ${meta.text}`}>{meta.label}</span>
                            </div>
                          </div>
                          <p className="text-[9px] text-slate-600">{rs.note}</p>
                        </div>
                      );
                    })}
              </div>
            </div>

            {/* Freight Rates */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Freight Rates</span>
              </div>
              <div className="divide-y divide-slate-800">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="px-4 py-3 animate-pulse">
                        <div className="h-3 bg-slate-800 rounded w-2/3 mb-1.5" />
                        <div className="h-2 bg-slate-800 rounded w-1/3" />
                      </div>
                    ))
                  : freightRates.map((fr, i) => (
                      <div key={i} className="px-4 py-3" data-testid={`rate-lane-${i}`}>
                        <p className="text-[10px] font-bold text-slate-300 mb-0.5">{fr.lane}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white">{fr.rate}</span>
                          <div className={`flex items-center gap-0.5 text-[9px] font-black ${
                            fr.change < 0 ? "text-emerald-400" : "text-red-400"
                          }`}>
                            {fr.change < 0
                              ? <TrendingDown className="w-3 h-3" />
                              : <TrendingUp className="w-3 h-3" />}
                            {Math.abs(fr.change)}% {fr.unit}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* CPEC Info Box */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-black text-emerald-300">CPEC Free Zone Access</span>
              </div>
              <p className="text-[10px] text-emerald-300/60 leading-relaxed">
                Cargo entering Gawadar via DeliWer Logistics receives bonded CPEC Free Zone status — no re-export duty on UAE-origin goods onward to Central Asia.
              </p>
              <Link href="/logistics-funnel">
                <button className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 hover:text-emerald-300 transition-colors mt-1">
                  Apply for access <ChevronRight className="w-3 h-3" />
                </button>
              </Link>
            </div>

            {/* Subscribe CTA */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <Newspaper className="w-5 h-5 text-amber-400 mb-2" />
              <p className="text-xs font-black text-white mb-1">Get the Weekly Brief</p>
              <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
                Monday morning corridor intelligence digest for active freight partners.
              </p>
              <a href="mailto:intelligence@chaintrack.com?subject=Weekly Brief Subscription">
                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold gap-1.5 h-8">
                  Subscribe to Weekly Brief
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ChainTrackLogisticsPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Fixed Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-950/95 backdrop-blur border-b border-slate-800" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/logistics" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
              <Anchor className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-none">
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-amber-400 text-base tracking-tight">ChainTrack</span>
                <span className="font-black text-white text-base tracking-widest">Logistics</span>
              </div>
              <p className="text-[9px] text-amber-500/60 font-black uppercase tracking-widest mt-0.5">Relocation &amp; Commercial Charter · Dubai–Gawadar</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm text-slate-400">
            <a href="#corridor" className="hover:text-white transition-colors">Corridor</a>
            <a href="#use-cases" className="hover:text-sky-400 transition-colors">Charter Use Cases</a>
            <a href="#opportunity" className="hover:text-white transition-colors">Why Now</a>
            <a href="#partners" className="hover:text-white transition-colors">Partners</a>
            <a href="#intelligence" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-amber-500 animate-pulse" />
              Intel
            </a>
            <Link href="/freight-broker" className="hover:text-amber-400 transition-colors font-semibold">Freight Hub</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/logistics-funnel">
              <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 hidden md:flex gap-1.5 text-xs font-bold">
                Join Network
              </Button>
            </Link>
            <Link href="/logistics-funnel">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5">
                Apply as Freight Broker
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
        {/* Real photo background */}
        <img
          src={heroLogisticsBg}
          alt="Cargo aircraft over trade corridor"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layered dark overlay — heavier at bottom so text reads clean */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950" />
        {/* Amber tint on left to preserve brand colour */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/40 via-transparent to-transparent" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
        </div>

        {/* World map grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <AnimatedItem>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-4 py-1.5 text-sm font-medium mb-6 inline-flex">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                The Post-Hormuz Trade Era Begins
              </Badge>
            </AnimatedItem>

            <AnimatedItem>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
                <span className="block text-white">Dubai ↔ Gawadar</span>
                <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent mt-2">
                  The New Trade Spine
                </span>
              </h1>
            </AnimatedItem>

            <AnimatedItem>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
                Jebel Ali has ceased regular commercial operations. The Strait of Hormuz is a contested chokepoint.
                Gawadar — backed by CPEC and INSTC — is the world's next great deep-sea port.
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <p className="text-lg text-amber-300 font-semibold max-w-3xl mx-auto mb-10">
                ChainTrack Logistics is the first integrated air-charter-to-deep-sea feeder operator on this corridor — launching now.
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/logistics-funnel">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2">
                    Join as Freight Broker
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#corridor">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 gap-2">
                    Explore the Corridor
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          {/* Route Visual */}
          <AnimatedSection className="mt-20">
            <AnimatedItem>
              <div className="relative flex items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
                    <Plane className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">DUBAI</p>
                  <p className="text-xs text-amber-400">DXB / DWC</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 max-w-xs">
                  <div className="flex items-center w-full gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500 to-sky-500" />
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <div className="flex-1 h-px bg-gradient-to-r from-sky-500 to-emerald-500" />
                  </div>
                  <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs px-3">
                    Air Charter Bypass
                  </Badge>
                  <p className="text-xs text-slate-500">Hormuz-free corridor</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                    <Anchor className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">GAWADAR</p>
                  <p className="text-xs text-emerald-400">GWD Deep Sea</p>
                </div>
                <div className="hidden md:flex flex-col items-center gap-1 max-w-xs flex-1">
                  <div className="flex items-center w-full gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-violet-500" />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-500 to-slate-500" />
                  </div>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs px-3">
                    CPEC / INSTC
                  </Badge>
                  <p className="text-xs text-slate-500">Inland distribution</p>
                </div>
                <div className="hidden md:block text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-violet-500/30">
                    <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">WORLD</p>
                  <p className="text-xs text-violet-400">Asia · EU · CIS</p>
                </div>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          <div className="mt-16 flex justify-center">
            <a href="#stats" className="text-slate-500 hover:text-slate-300 transition-colors animate-bounce">
              <ChevronDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="py-16 px-6 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <AnimatedItem key={s.label}>
                <div className="text-center">
                  <s.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                  <p className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-sm text-slate-400 leading-tight">{s.label}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── SHIPMENT TRACKER ── */}
      <section id="tracker" className="py-20 px-6 border-b border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <AnimatedItem>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4 gap-1.5">
                <Route className="w-3.5 h-3.5" />
                Live Corridor Tracking
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Track Your Shipment
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 max-w-xl mx-auto">
                Every ChainTrack Logistics shipment is tracked across all four corridor nodes — from Dubai intake to onward delivery.
              </p>
            </AnimatedItem>
          </AnimatedSection>
          <AnimatedItem>
            <ShipmentTracker />
          </AnimatedItem>
        </div>
      </section>

      {/* ── THE CORRIDOR ── */}
      <section id="corridor" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30 mb-4">
                The Route Architecture
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Four Nodes. One Unbreakable Chain.
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Each node is a precision-engineered handoff point. Together they form a logistics arc that no other operator has yet connected end-to-end.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-6">
            {ROUTE_MILESTONES.map((m) => (
              <AnimatedItem key={m.city}>
                <div className="relative rounded-2xl overflow-hidden h-64 group">
                  <img
                    src={m.img}
                    alt={m.city}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${m.overlay}`} />
                  <div className="relative z-10 h-full flex flex-col justify-end p-7">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <m.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge className={`text-xs border self-start mb-2 ${m.badge}`}>{m.role}</Badge>
                    <h3 className="text-xl font-black text-white mb-1.5 leading-tight">{m.city}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{m.detail}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY NOW ── */}
      <section id="opportunity" className="py-24 px-6 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4 gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                The Geopolitical Shift
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why This Window Is Opening Now
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                A confluence of four structural forces has permanently altered the global trade map — and created the single largest logistics opportunity of the decade.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-6">
            {ADVANTAGES.map((a) => (
              <AnimatedItem key={a.title}>
                <Card className="bg-slate-900 border-slate-700 p-8 h-full hover:border-slate-600 transition-colors">
                  <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center mb-5`}>
                    <a.icon className={`w-6 h-6 ${a.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{a.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{a.desc}</p>
                </Card>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          {/* The big quote */}
          <AnimatedSection className="mt-16">
            <AnimatedItem>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-10 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-4xl mx-auto">
                  "For the first time in history, Dubai's aviation supremacy and Gawadar's deep-water access can be fused into a single, Hormuz-independent supply chain that is faster, cheaper, and more resilient than anything that has come before."
                </p>
                <p className="text-amber-400 mt-6 font-semibold">— ChainTrack Logistics Founding Strategy, 2025</p>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CHARTER USE CASES ── */}
      <section id="use-cases" className="py-24 px-6 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <AnimatedItem>
              <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30 mb-4 gap-1.5">
                <Plane className="w-3.5 h-3.5" />
                What Moves on the Corridor
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Relocation &amp; Commercial Freight —<br />
                <span className="text-amber-400">One Corridor, Every Category</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Whether you're moving a household, clearing a warehouse, or shipping
                time-sensitive industrial goods — the Dubai–Gawadar air charter lane
                handles every cargo category faster and cheaper than Hormuz-routed alternatives.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: Building2,
                title: "Relocation Cargo",
                sub: "Household · Personal Effects · Vehicles",
                desc: "The corridor is the fastest route for expats relocating between Dubai and Central/South Asia. Full-container household moves, air-freight personal effects, and bonded vehicle transit all move under CPEC Free Zone status — no re-export duty, door-to-door tracking.",
                highlights: ["Household goods — FCL & LCL", "Personal effects — air priority", "Vehicles — bonded transit via GWD", "Unaccompanied baggage — same-day uplift", "Corporate relocation packages"],
                accent: "from-sky-500 to-blue-600",
                border: "border-sky-500/30",
                bg: "bg-sky-500/5",
                badgeCls: "bg-sky-500/20 text-sky-300 border-sky-500/30",
              },
              {
                icon: Package,
                title: "Commercial Freight",
                sub: "FMCG · Electronics · Industrial Goods",
                desc: "Dubai is the world's largest re-export hub. ChainTrack bridges DWC's air-cargo supremacy with Gawadar's deep-sea access — giving UAE traders a Hormuz-free route to Central Asian, South Asian, and Chinese markets at ocean-freight cost.",
                highlights: ["Consumer goods & FMCG — bulk consolidation", "Electronics & smartphones — air express", "Machinery & spare parts — project cargo", "Perishables — reefer-trailer DWC intake", "E-commerce batches — micro-fulfilment"],
                accent: "from-amber-500 to-orange-600",
                border: "border-amber-500/30",
                bg: "bg-amber-500/5",
                badgeCls: "bg-amber-500/20 text-amber-300 border-amber-500/30",
              },
              {
                icon: Shield,
                title: "Diplomatic & Institutional",
                sub: "Embassies · NGOs · Government Bodies",
                desc: "Consular shipments, diplomatic pouches, UN supply chains, and government institutional freight benefit from ChainTrack's direct Gawadar Port Authority relationships and priority charter lane access.",
                highlights: ["Diplomatic pouch & consular freight", "UN / NGO humanitarian supply chains", "Government institutional cargo", "Priority customs clearance", "Discreet handling & documentation"],
                accent: "from-violet-500 to-purple-600",
                border: "border-violet-500/30",
                bg: "bg-violet-500/5",
                badgeCls: "bg-violet-500/20 text-violet-300 border-violet-500/30",
              },
              {
                icon: Zap,
                title: "Time-Critical & Cold-Chain",
                sub: "Pharma · Perishables · High-Value Parcels",
                desc: "The air charter lane delivers Dubai-to-Gawadar in under 4 hours with full cold-chain continuity. DWC's reefer apron to Gawadar's bonded pharmaceutical handling zone is a single unbroken cold chain — the first in the region.",
                highlights: ["Pharmaceutical cold-chain — GDP-compliant", "Fresh produce & perishables — reefer", "High-value parcels — insured handling", "Biological samples & medical devices", "Urgent industrial spares — 24hr door"],
                accent: "from-emerald-500 to-teal-600",
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/5",
                badgeCls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
              },
            ].map((uc) => (
              <AnimatedItem key={uc.title}>
                <Card className={`${uc.bg} border ${uc.border} p-8 h-full hover:border-opacity-60 transition-all`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${uc.accent} flex items-center justify-center mb-5 shadow-lg`}>
                    <uc.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={`text-xs border mb-3 ${uc.badgeCls}`}>{uc.sub}</Badge>
                  <h3 className="text-xl font-black text-white mb-3">{uc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{uc.desc}</p>
                  <ul className="space-y-1.5">
                    {uc.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Card>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          {/* Speed comparison bar */}
          <AnimatedSection>
            <AnimatedItem>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
                <p className="text-center text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Transit Time Comparison — Dubai → Gawadar Hinterland</p>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { mode: "Air Charter (DWC → GWD)", time: "4–6 hours", note: "Door-to-port, Hormuz-free", color: "text-amber-400", bar: "bg-amber-500", pct: 10 },
                    { mode: "Sea Feeder (Jebel Ali → GWD)", time: "5–7 days", note: "Via Hormuz — disrupted", color: "text-red-400", bar: "bg-red-600", pct: 45 },
                    { mode: "Traditional Silk Road (Air)", time: "2–3 days", note: "Legacy routing, no port access", color: "text-slate-400", bar: "bg-slate-600", pct: 25 },
                  ].map((row) => (
                    <div key={row.mode}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-300 leading-tight">{row.mode}</span>
                        <span className={`text-sm font-black ${row.color}`}>{row.time}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                        <motion.div
                          className={`h-full rounded-full ${row.bar}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-600">{row.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PIONEER EDGE ── */}
      <section id="pioneer" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedItem>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                First Mover Advantage
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                DeliWer & ChainTrack — The Pioneer Pair
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                The Dubai–Gawadar corridor is nascent. Standards are unwritten, slots are unclaimed, and partnerships are unmade. ChainTrack Logistics is positioning now — before incumbents arrive — to define the rules of engagement on the world's most strategically important new trade lane.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                Backed by DeliWer's last-mile concierge network in Dubai and a growing partner ecosystem spanning freight forwarding, customs brokerage, warehousing, and digital track-and-trace, we are building the operating infrastructure before demand peaks — a classic pioneer position.
              </p>
              <a href="#partners">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                  Secure Your Position
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </AnimatedItem>

            <AnimatedItem>
              <div className="space-y-4">
                {PIONEER_POINTS.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900/60 to-slate-950 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 mb-4">The Model</Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Air-to-Sea Feeder — How It Works
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Origin Consolidation",
                desc: "Cargo collected across UAE warehouses and consolidated at DXB or DWC cargo terminals through DeliWer's last-mile network.",
                icon: Package,
                color: "text-amber-400",
              },
              {
                step: "02",
                title: "Charter Air Bridge",
                desc: "Dedicated freighter operates the Dubai–Gawadar sector. Block-space for partners on scheduled uplift. Sub-24-hour transit.",
                icon: Plane,
                color: "text-sky-400",
              },
              {
                step: "03",
                title: "Port Feeder & Onward",
                desc: "Cargo transfers at Gawadar to deep-sea vessel or CPEC rail. Full track-and-trace handoff via ChainTrack platform.",
                icon: Ship,
                color: "text-emerald-400",
              },
            ].map((s, i) => (
              <AnimatedItem key={s.step} className="relative">
                <div className="p-8 text-center">
                  <div className="text-6xl font-black text-slate-800 mb-4">{s.step}</div>
                  <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-5`}>
                    <s.icon className={`w-8 h-8 ${s.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-0 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── PARTNER TIERS ── */}
      <section id="partners" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">Partner Network</Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Join the Corridor
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Three entry points. One network. Become part of the infrastructure that will define Middle East–South Asia logistics for the next generation.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-6">
            {PARTNER_TIERS.map((t) => (
              <AnimatedItem key={t.tier}>
                <div className={`rounded-2xl border p-8 h-full flex flex-col transition-all duration-300 ${
                  t.highlight
                    ? "border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-slate-900 shadow-lg shadow-amber-500/10"
                    : "border-slate-700 bg-slate-900 hover:border-slate-600"
                }`}>
                  {t.highlight && (
                    <Badge className="bg-amber-500 text-slate-950 font-bold self-start mb-4 px-3">
                      Most Strategic
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3">{t.tier}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.desc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${t.highlight ? "text-amber-400" : "text-slate-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:logistics@chaintrack.com">
                    <Button
                      className={`w-full font-semibold gap-2 ${
                        t.highlight
                          ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                          : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                      }`}
                    >
                      {t.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── DELIWER INTEGRATION ── */}
      <section className="py-24 px-6 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <AnimatedItem>
              <Badge className="bg-slate-700 text-slate-300 border-slate-600 mb-4">Ecosystem Integration</Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl font-black text-white mb-4">
                Powered by the DeliWer Ecosystem
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                ChainTrack Logistics is not a standalone operator. It is the international freight layer of a fully integrated urban and global services platform — giving every shipment access to concierge-grade handling at origin and destination.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "DeliWer Express", desc: "Last-mile pickup & delivery in Dubai", icon: Navigation },
              { name: "ChainTrack B2B", desc: "Wholesale procurement & track-and-trace", icon: BarChart3 },
              { name: "Fulfillment Hub", desc: "Dubai warehousing & order management", icon: Package },
              { name: "Partner Network", desc: "500+ freight & logistics professionals", icon: Users },
            ].map((item) => (
              <AnimatedItem key={item.name}>
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center hover:border-slate-700 transition-colors">
                  <item.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white text-sm mb-2">{item.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── CORRIDOR INTELLIGENCE FEED ── */}
      <CorridorIntelligence />

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <AnimatedItem>
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber-500/30">
                <Target className="w-10 h-10 text-white" />
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                The window is open.<br />
                <span className="text-amber-400">Be first through it.</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                History's most significant logistics corridor realignment happens once. ChainTrack Logistics is building the operating system for it — and we are looking for the partners who move first.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:logistics@chaintrack.com">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-10 gap-2">
                    Contact the Logistics Team
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <Link href="/chaintrack">
                  <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:text-white gap-2">
                    Visit ChainTrack B2B Platform
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-md shadow-amber-500/20">
                <Anchor className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-amber-400 text-sm tracking-tight">ChainTrack</span>
                  <span className="font-black text-white text-sm tracking-wider">Logistics</span>
                </div>
                <p className="text-slate-500 text-xs">Dubai–Gawadar Corridor · DeliWer Group</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="mailto:logistics@chaintrack.com" className="hover:text-slate-300 transition-colors">
                logistics@chaintrack.com
              </a>
              <span>·</span>
              <Link href="/chaintrack" className="hover:text-slate-300 transition-colors">
                ChainTrack B2B
              </Link>
              <span>·</span>
              <Link href="/" className="hover:text-slate-300 transition-colors">
                DeliWer
              </Link>
            </div>
            <p className="text-slate-600 text-xs">
              © 2025 ChainTrack Logistics · DeliWer Group
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
