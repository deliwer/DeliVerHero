import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Anchor, Plane, Route, ArrowRight, ArrowLeft, CheckCircle2, Globe,
  Package, Truck, Building2, Users, DollarSign, Zap, Shield, Layers,
  MapPin, BarChart3, FileText, Ship, Star, Clock, Target, ChevronRight,
  Warehouse, TrendingUp, Radio, RefreshCw, AlertCircle, CalendarDays,
  Wind, Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 5;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25 } }),
};

type BrokerType = "" | "forwarder" | "customs" | "trading" | "logistics" | "carrier" | "other";
type HubPref = "" | "dubai-south" | "gawadar" | "both";
type CargoType = "" | "general" | "perishable" | "industrial" | "ecommerce" | "pharma" | "hazmat" | "mixed";
type VolumeBand = "" | "under10" | "10to50" | "50to200" | "200plus" | "unsure";

interface FunnelData {
  brokerType: BrokerType;
  hubPref: HubPref;
  cargoType: CargoType;
  volume: VolumeBand;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
}

const BROKER_TYPES = [
  { id: "forwarder", label: "Freight Forwarder", desc: "I arrange cargo movement for clients", icon: Truck },
  { id: "customs", label: "Customs Broker", desc: "I handle customs clearance & compliance", icon: Shield },
  { id: "trading", label: "Trading Company", desc: "I import/export goods directly", icon: Globe },
  { id: "logistics", label: "Logistics Company", desc: "I operate warehousing or distribution", icon: Warehouse },
  { id: "carrier", label: "Carrier / Operator", desc: "I own or operate transport assets", icon: Ship },
  { id: "other", label: "Other / Not Sure", desc: "Tell us more after you apply", icon: Star },
];

const HUB_PREFS = [
  {
    id: "dubai-south",
    label: "Dubai South · DWC",
    sub: "Air-freight consolidation at Al Maktoum International",
    icon: Plane,
    color: "border-amber-500/50 bg-amber-500/5",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    accent: "text-amber-400",
  },
  {
    id: "gawadar",
    label: "Gawadar Port · GWD",
    sub: "Deep-sea aggregation, CPEC Free Zone, inland rail",
    icon: Anchor,
    color: "border-emerald-500/50 bg-emerald-500/5",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
    accent: "text-emerald-400",
  },
  {
    id: "both",
    label: "Both Hubs",
    sub: "Full corridor access — air & sea modes",
    icon: Route,
    color: "border-sky-500/50 bg-sky-500/5",
    iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
    accent: "text-sky-400",
  },
];

const CARGO_TYPES = [
  { id: "general", label: "General Merchandise", icon: Package },
  { id: "perishable", label: "Perishables / Cold Chain", icon: Zap },
  { id: "industrial", label: "Industrial / Machinery", icon: Building2 },
  { id: "ecommerce", label: "E-Commerce Parcels", icon: Globe },
  { id: "pharma", label: "Pharmaceuticals", icon: Shield },
  { id: "hazmat", label: "Hazmat (IATA/IMDG)", icon: Layers },
  { id: "mixed", label: "Mixed / Multiple", icon: BarChart3 },
];

const VOLUME_BANDS = [
  { id: "under10", label: "Under 10 CBM/mo", tier: "Starter" },
  { id: "10to50", label: "10–50 CBM/mo", tier: "Silver" },
  { id: "50to200", label: "50–200 CBM/mo", tier: "Gold" },
  { id: "200plus", label: "200+ CBM/mo", tier: "Platinum" },
  { id: "unsure", label: "Not sure yet", tier: "" },
];

const TIER_COLORS: Record<string, string> = {
  Starter: "text-slate-300",
  Silver: "text-sky-400",
  Gold: "text-amber-400",
  Platinum: "text-violet-400",
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 w-full max-w-md mx-auto">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="flex items-center flex-1 gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-300 ${
            i < step ? "bg-amber-500 text-slate-950" :
            i === step ? "bg-amber-500/20 border-2 border-amber-500 text-amber-400" :
            "bg-slate-800 border border-slate-700 text-slate-600"
          }`}>
            {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-slate-800">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: i < step ? "100%" : "0%" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const STEP_LABELS = ["Broker Type", "Hub Preference", "Cargo Profile", "Volume", "Contact"];

// ─── Slot Availability Types & Data ──────────────────────────────────────────

interface CharterSlot {
  id: string;
  dep: string; // ISO date string
  depLabel: string;
  route: string;
  aircraftType: string;
  totalCBM: number;
  bookedCBM: number;
  status: "open" | "filling" | "critical" | "full";
  flightNum: string;
}

interface VesselSlot {
  id: string;
  vesselName: string;
  depLabel: string;
  route: string;
  totalTEU: number;
  bookedTEU: number;
  eta: string;
  status: "open" | "filling" | "critical";
}

function generateSlots(seed: number): { charter: CharterSlot[]; vessel: VesselSlot[] } {
  const base = new Date("2026-05-17T00:00:00Z");
  const vary = (base: number, range: number) => Math.max(0, base + Math.round((Math.sin(seed * 7.3 + base) * range)));

  const charter: CharterSlot[] = [
    {
      id: "ct-1",
      dep: new Date(base.getTime() + 2 * 86400000).toISOString(),
      depLabel: "Sun 19 May · 03:45 GST",
      route: "DWC → GWD",
      aircraftType: "B747-8F",
      totalCBM: 840,
      bookedCBM: vary(520, 60),
      status: "filling",
      flightNum: "XY4801",
    },
    {
      id: "ct-2",
      dep: new Date(base.getTime() + 5 * 86400000).toISOString(),
      depLabel: "Wed 22 May · 01:15 GST",
      route: "DWC → GWD",
      aircraftType: "B777F",
      totalCBM: 650,
      bookedCBM: vary(190, 80),
      status: "open",
      flightNum: "XY4803",
    },
    {
      id: "ct-3",
      dep: new Date(base.getTime() + 9 * 86400000).toISOString(),
      depLabel: "Sun 26 May · 03:45 GST",
      route: "DWC → GWD",
      aircraftType: "B747-8F",
      totalCBM: 840,
      bookedCBM: vary(780, 40),
      status: "critical",
      flightNum: "XY4805",
    },
  ].map((s) => {
    const pct = s.bookedCBM / s.totalCBM;
    return { ...s, status: pct >= 0.95 ? "full" : pct >= 0.80 ? "critical" : pct >= 0.45 ? "filling" : "open" };
  });

  const vessel: VesselSlot[] = [
    {
      id: "vs-1",
      vesselName: "MV Gawadar Star",
      depLabel: "Wed 21 May · Jebel Ali / Khor Fakkan",
      route: "UAE → GWD",
      totalTEU: 480,
      bookedTEU: vary(290, 50),
      eta: "ETA Gawadar 28 May",
      status: "filling",
    },
    {
      id: "vs-2",
      vesselName: "MV CPEC Pride",
      depLabel: "Sat 31 May · Sharjah Port",
      route: "UAE → GWD",
      totalTEU: 620,
      bookedTEU: vary(110, 60),
      eta: "ETA Gawadar 7 Jun",
      status: "open",
    },
  ].map((s) => {
    const pct = s.bookedTEU / s.totalTEU;
    return { ...s, status: pct >= 0.80 ? "critical" : pct >= 0.40 ? "filling" : "open" };
  });

  return { charter, vessel };
}

const STATUS_META = {
  open:     { label: "Open",     dot: "bg-emerald-400", bar: "bg-emerald-500", text: "text-emerald-400", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  filling:  { label: "Filling",  dot: "bg-amber-400",   bar: "bg-amber-500",   text: "text-amber-400",   badge: "bg-amber-500/15 text-amber-300 border-amber-500/30"     },
  critical: { label: "Critical", dot: "bg-red-400 animate-pulse", bar: "bg-red-500", text: "text-red-400", badge: "bg-red-500/15 text-red-300 border-red-500/30"       },
  full:     { label: "Full",     dot: "bg-slate-500",   bar: "bg-slate-600",   text: "text-slate-500",   badge: "bg-slate-700/50 text-slate-500 border-slate-600/30"     },
};

function CapacityBar({ booked, total, color }: { booked: number; total: number; color: string }) {
  const pct = Math.min(1, booked / total) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-[10px] text-slate-500 font-bold tabular-nums w-8 text-right">{Math.round(pct)}%</span>
    </div>
  );
}

function SlotAvailabilityChecker({ hubPref }: { hubPref: HubPref }) {
  const [seed, setSeed] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [tab, setTab] = useState<"air" | "sea">(hubPref === "gawadar" ? "sea" : "air");

  const slots = generateSlots(seed);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setSeed((s) => s + 1);
      setLastRefreshed(new Date());
      setRefreshing(false);
    }, 900);
  }, []);

  // Auto-refresh every 18 seconds
  useEffect(() => {
    const interval = setInterval(refresh, 18000);
    return () => clearInterval(interval);
  }, [refresh]);

  // When hub changes, switch to relevant tab
  useEffect(() => {
    if (hubPref === "gawadar") setTab("sea");
    else if (hubPref === "dubai-south") setTab("air");
  }, [hubPref]);

  const timeAgo = Math.round((Date.now() - lastRefreshed.getTime()) / 1000);
  const showAir = tab === "air" || hubPref === "both" && tab === "air";
  const showSea = tab === "sea" || hubPref === "both" && tab === "sea";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mt-6 rounded-2xl border border-slate-700/60 bg-slate-900/70 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs font-black uppercase tracking-widest text-white">Live Slot Availability</span>
          <span className="text-[10px] text-slate-600 font-medium hidden sm:block">
            · Dubai ↔ Gawadar Corridor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-600 hidden sm:block">
            {refreshing ? "Refreshing…" : `Updated ${timeAgo}s ago`}
          </span>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-40"
            data-testid="btn-slot-refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Tab bar — only if hub is "both" or either single */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setTab("air")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
            tab === "air"
              ? "text-amber-400 border-b-2 border-amber-500 bg-amber-500/5"
              : "text-slate-500 hover:text-slate-300"
          }`}
          data-testid="tab-slot-air"
        >
          <Plane className="w-3 h-3" /> Air Charter · DWC
        </button>
        <button
          onClick={() => setTab("sea")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
            tab === "sea"
              ? "text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/5"
              : "text-slate-500 hover:text-slate-300"
          }`}
          data-testid="tab-slot-sea"
        >
          <Waves className="w-3 h-3" /> Deep-Sea · Gawadar
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === "air" ? (
          <motion.div
            key="air"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-3"
          >
            {slots.charter.map((s, i) => {
              const meta = STATUS_META[s.status];
              const avail = s.totalCBM - s.bookedCBM;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`rounded-xl border p-4 ${s.status === "full" ? "border-slate-800 opacity-50" : "border-slate-700/80 bg-slate-800/40"}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{s.flightNum}</span>
                        <span className="text-[9px] text-slate-600">·</span>
                        <span className="text-[9px] font-bold text-slate-400">{s.route}</span>
                        <span className="text-[9px] text-slate-600">·</span>
                        <span className="text-[9px] font-bold text-slate-400">{s.aircraftType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <CalendarDays className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="text-xs font-semibold text-slate-300">{s.depLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} shrink-0`} />
                      <Badge className={`text-[9px] font-black border px-2 py-0 h-5 ${meta.badge}`}>
                        {meta.label}
                      </Badge>
                    </div>
                  </div>
                  <CapacityBar booked={s.bookedCBM} total={s.totalCBM} color={meta.bar} />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-slate-600">{s.bookedCBM} CBM booked</span>
                    <span className={`text-[10px] font-bold ${meta.text}`}>
                      {s.status === "full" ? "No space available" : `${avail} CBM available`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
            <div className="flex items-center gap-2 pt-1">
              <AlertCircle className="w-3 h-3 text-slate-600 shrink-0" />
              <p className="text-[10px] text-slate-600">
                Charter slots are reserved on first-come basis after onboarding. Figures update in real-time.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sea"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-3"
          >
            {slots.vessel.map((v, i) => {
              const meta = STATUS_META[v.status];
              const availTEU = v.totalTEU - v.bookedTEU;
              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-xl border border-slate-700/80 bg-slate-800/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Ship className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="text-xs font-black text-white">{v.vesselName}</span>
                        <span className="text-[9px] font-bold text-slate-500">{v.route}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <CalendarDays className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="text-[10px] font-semibold text-slate-300">{v.depLabel}</span>
                      </div>
                      <p className="text-[9px] text-emerald-600 mt-0.5 font-medium">{v.eta}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} shrink-0`} />
                      <Badge className={`text-[9px] font-black border px-2 py-0 h-5 ${meta.badge}`}>
                        {meta.label}
                      </Badge>
                    </div>
                  </div>
                  <CapacityBar booked={v.bookedTEU} total={v.totalTEU} color={meta.bar} />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-slate-600">{v.bookedTEU} TEU booked</span>
                    <span className={`text-[10px] font-bold ${meta.text}`}>
                      {availTEU} TEU available
                    </span>
                  </div>
                </motion.div>
              );
            })}
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3 flex gap-2.5 items-start">
              <Anchor className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-emerald-300/70 leading-relaxed">
                Gawadar Port operates the CPEC Free Zone bonded warehouse. Cargo handed off at Gawadar enters the INSTC/CPEC network with no re-export duty.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-slate-600 shrink-0" />
              <p className="text-[10px] text-slate-600">
                Vessel TEU counts are indicative. Final booking confirmed after onboarding.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="px-5 py-2.5 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between">
        <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">
          Data refreshes every 18s
        </p>
        <a href="mailto:logistics@chaintrack.com" className="text-[9px] text-amber-600 hover:text-amber-400 font-bold transition-colors">
          Reserve a slot → logistics@chaintrack.com
        </a>
      </div>
    </motion.div>
  );
}

export default function LogisticsFunnelPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FunnelData>({
    brokerType: "", hubPref: "", cargoType: "", volume: "",
    name: "", company: "", email: "", phone: "", country: "",
  });

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canAdvance = () => {
    if (step === 0) return !!data.brokerType;
    if (step === 1) return !!data.hubPref;
    if (step === 2) return !!data.cargoType;
    if (step === 3) return !!data.volume;
    if (step === 4) return !!(data.name && data.email && data.company);
    return true;
  };

  const handleSubmit = async () => {
    if (!data.name || !data.email || !data.company) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const selectedHub = HUB_PREFS.find((h) => h.id === data.hubPref);
  const selectedTier = VOLUME_BANDS.find((v) => v.id === data.volume)?.tier || "";

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/97 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/logistics" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-white text-sm tracking-tight">DeliWer</span>
                <span className="font-black text-amber-400 text-sm tracking-wider">LOGISTICS</span>
              </div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Freight Broker Onboarding</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/freight-broker">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hidden sm:flex gap-1.5 text-xs">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Broker Hub
              </Button>
            </Link>
            <a href="https://wa.me/971523946311" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">
                Talk to Us
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="pt-16 min-h-screen flex flex-col">
        {/* ── Brand Hero Strip ── */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950 border-b border-amber-500/10 py-10 px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-0 w-64 h-64 bg-amber-500/6 rounded-full blur-3xl" />
            <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-orange-500/6 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-amber-400 text-xl tracking-tight">ChainTrack</span>
                  <span className="font-black text-white text-xl tracking-wider">Logistics</span>
                </div>
                <p className="text-[10px] text-amber-500/70 font-bold uppercase tracking-widest">Dubai–Gawadar · Relocation &amp; Commercial Charter</p>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
              Join the Freight Broker Network
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
              Complete this 2-minute profile and our freight team will send your personalised onboarding kit within 24 hours.
            </p>
          </div>
        </div>

        {/* ── Progress ── */}
        <div className="sticky top-16 z-40 bg-slate-950/97 backdrop-blur border-b border-slate-800 py-4 px-6">
          <div className="max-w-2xl mx-auto">
            <ProgressBar step={step} />
            <div className="flex justify-between mt-2 max-w-md mx-auto">
              {STEP_LABELS.map((l, i) => (
                <span key={l} className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                  i === step ? "text-amber-400" : i < step ? "text-slate-500" : "text-slate-700"
                }`}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Step Content ── */}
        <div className="flex-1 flex items-start justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait" custom={dir}>
              {!submitted ? (
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* STEP 0 — Broker Type */}
                  {step === 0 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-2">What type of freight operator are you?</h2>
                      <p className="text-slate-400 mb-8">Select the option that best describes your business.</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {BROKER_TYPES.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setData({ ...data, brokerType: t.id as BrokerType })}
                            data-testid={`btn-broker-type-${t.id}`}
                            className={`flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                              data.brokerType === t.id
                                ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                                : "border-slate-700 bg-slate-900 hover:border-slate-600"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              data.brokerType === t.id ? "bg-amber-500/20" : "bg-slate-800"
                            }`}>
                              <t.icon className={`w-5 h-5 ${data.brokerType === t.id ? "text-amber-400" : "text-slate-500"}`} />
                            </div>
                            <div>
                              <p className={`font-bold text-sm ${data.brokerType === t.id ? "text-white" : "text-slate-300"}`}>{t.label}</p>
                              <p className="text-slate-500 text-xs mt-0.5 leading-snug">{t.desc}</p>
                            </div>
                            {data.brokerType === t.id && (
                              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 ml-auto mt-0.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 1 — Hub Preference */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-2">Which hub would you primarily use?</h2>
                      <p className="text-slate-400 mb-6">You can access both hubs after onboarding — pick your primary starting point.</p>
                      <div className="flex flex-col gap-4">
                        {HUB_PREFS.map((h) => (
                          <button
                            key={h.id}
                            onClick={() => setData({ ...data, hubPref: h.id as HubPref })}
                            data-testid={`btn-hub-${h.id}`}
                            className={`flex items-center gap-5 p-6 rounded-2xl border text-left transition-all ${
                              data.hubPref === h.id ? h.color + " shadow-lg" : "border-slate-700 bg-slate-900 hover:border-slate-600"
                            }`}
                          >
                            <div className={`w-14 h-14 rounded-2xl ${h.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                              <h.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className={`font-black text-lg ${data.hubPref === h.id ? "text-white" : "text-slate-200"}`}>{h.label}</p>
                              <p className={`text-sm mt-0.5 ${data.hubPref === h.id ? h.accent : "text-slate-500"}`}>{h.sub}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              data.hubPref === h.id ? "border-current bg-current/20" : "border-slate-700"
                            }`}>
                              {data.hubPref === h.id && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Live slot availability checker */}
                      <SlotAvailabilityChecker hubPref={data.hubPref} />
                    </div>
                  )}

                  {/* STEP 2 — Cargo Type */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-2">What type of cargo do you move?</h2>
                      <p className="text-slate-400 mb-8">We'll match you to the right handling protocols and documentation.</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {CARGO_TYPES.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setData({ ...data, cargoType: c.id as CargoType })}
                            data-testid={`btn-cargo-${c.id}`}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                              data.cargoType === c.id
                                ? "border-emerald-500 bg-emerald-500/8 shadow"
                                : "border-slate-700 bg-slate-900 hover:border-slate-600"
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              data.cargoType === c.id ? "bg-emerald-500/20" : "bg-slate-800"
                            }`}>
                              <c.icon className={`w-4.5 h-4.5 ${data.cargoType === c.id ? "text-emerald-400" : "text-slate-500"}`} />
                            </div>
                            <span className={`font-semibold text-sm ${data.cargoType === c.id ? "text-white" : "text-slate-300"}`}>{c.label}</span>
                            {data.cargoType === c.id && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — Volume */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-2">Estimated monthly volume?</h2>
                      <p className="text-slate-400 mb-8">This determines your commission tier — you can scale up later.</p>
                      <div className="flex flex-col gap-3">
                        {VOLUME_BANDS.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setData({ ...data, volume: v.id as VolumeBand })}
                            data-testid={`btn-vol-${v.id}`}
                            className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${
                              data.volume === v.id
                                ? "border-sky-500 bg-sky-500/8 shadow"
                                : "border-slate-700 bg-slate-900 hover:border-slate-600"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                              data.volume === v.id ? "border-sky-400 bg-sky-400" : "border-slate-600"
                            }`} />
                            <span className={`font-bold flex-1 text-left ${data.volume === v.id ? "text-white" : "text-slate-300"}`}>{v.label}</span>
                            {v.tier && (
                              <Badge className={`text-xs font-black border-0 ${TIER_COLORS[v.tier]} bg-transparent`}>
                                {v.tier} tier
                              </Badge>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                        <p className="text-amber-400 text-xs font-bold mb-1">Commission Preview</p>
                        <p className="text-slate-400 text-xs">
                          {data.volume === "under10" && "Starter tier · AED 28–35 per CBM"}
                          {data.volume === "10to50" && "Silver tier · AED 35–45 per CBM + milestone bonus"}
                          {data.volume === "50to200" && "Gold tier · AED 45–58 per CBM + AED 2,000 milestone"}
                          {data.volume === "200plus" && "Platinum tier · Negotiated rate + dedicated ops desk"}
                          {data.volume === "unsure" && "We'll place you in the best tier based on actual volumes."}
                          {!data.volume && "Select a volume band to see your earning potential."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 — Contact */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-2xl font-black text-white mb-2">Almost there — your contact details</h2>
                      <p className="text-slate-400 mb-6">We'll send your personalised onboarding kit and connect you with our freight desk.</p>

                      {/* Summary card */}
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        {[
                          { label: "Type", val: BROKER_TYPES.find((b) => b.id === data.brokerType)?.label || "—" },
                          { label: "Hub", val: selectedHub?.label || "—" },
                          { label: "Cargo", val: CARGO_TYPES.find((c) => c.id === data.cargoType)?.label || "—" },
                          { label: "Volume", val: VOLUME_BANDS.find((v) => v.id === data.volume)?.label || "—" },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-wider mb-0.5">{item.label}</p>
                            <p className="text-xs text-slate-300 font-semibold leading-tight">{item.val}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-300 text-sm mb-1.5 block">Full Name *</Label>
                            <Input
                              value={data.name}
                              onChange={(e) => setData({ ...data, name: e.target.value })}
                              placeholder="Your name"
                              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                              data-testid="input-funnel-name"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300 text-sm mb-1.5 block">Company *</Label>
                            <Input
                              value={data.company}
                              onChange={(e) => setData({ ...data, company: e.target.value })}
                              placeholder="Company name"
                              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                              data-testid="input-funnel-company"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-300 text-sm mb-1.5 block">Email Address *</Label>
                            <Input
                              type="email"
                              value={data.email}
                              onChange={(e) => setData({ ...data, email: e.target.value })}
                              placeholder="you@company.com"
                              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                              data-testid="input-funnel-email"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300 text-sm mb-1.5 block">Phone / WhatsApp</Label>
                            <Input
                              value={data.phone}
                              onChange={(e) => setData({ ...data, phone: e.target.value })}
                              placeholder="+971 ..."
                              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                              data-testid="input-funnel-phone"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-slate-300 text-sm mb-1.5 block">Country / Operating Region</Label>
                          <Input
                            value={data.country}
                            onChange={(e) => setData({ ...data, country: e.target.value })}
                            placeholder="UAE, Pakistan, India, UK..."
                            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                            data-testid="input-funnel-country"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-800">
                    {step > 0 ? (
                      <Button
                        variant="ghost"
                        onClick={() => go(step - 1)}
                        className="text-slate-400 hover:text-white gap-2"
                        data-testid="btn-funnel-back"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < TOTAL_STEPS - 1 ? (
                      <Button
                        onClick={() => go(step + 1)}
                        disabled={!canAdvance()}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 disabled:opacity-40"
                        data-testid="btn-funnel-next"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canAdvance() || submitting}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 gap-2 disabled:opacity-40"
                        data-testid="btn-funnel-submit"
                      >
                        {submitting ? (
                          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                        ) : (
                          <>Get My Onboarding Kit <ArrowRight className="w-4 h-4" /></>
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* ── SUCCESS SCREEN ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">You're In.</h2>
                  <p className="text-slate-400 text-lg mb-2">
                    Welcome to the ChainTrack Logistics Freight Broker Network.
                  </p>
                  <p className="text-slate-500 mb-8">
                    Your onboarding kit will be sent to <span className="text-white font-semibold">{data.email}</span> within 24 hours.
                  </p>

                  {/* Summary */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 mb-8 text-left">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Your Freight Profile</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Operator Type", val: BROKER_TYPES.find((b) => b.id === data.brokerType)?.label },
                        { label: "Primary Hub", val: selectedHub?.label },
                        { label: "Cargo Type", val: CARGO_TYPES.find((c) => c.id === data.cargoType)?.label },
                        { label: "Volume Tier", val: selectedTier ? `${selectedTier} — ${VOLUME_BANDS.find((v) => v.id === data.volume)?.label}` : VOLUME_BANDS.find((v) => v.id === data.volume)?.label },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[9px] text-slate-600 font-black uppercase tracking-wider mb-0.5">{item.label}</p>
                          <p className={`text-sm font-bold ${selectedTier && item.label === "Volume Tier" ? TIER_COLORS[selectedTier] : "text-white"}`}>{item.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://wa.me/971523946311" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                        WhatsApp Our Freight Desk <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                    <Link href="/logistics">
                      <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                        Back to Logistics Overview
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}
