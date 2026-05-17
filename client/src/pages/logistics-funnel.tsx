import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Anchor, Plane, Route, ArrowRight, ArrowLeft, CheckCircle2, Globe,
  Package, Truck, Building2, Users, DollarSign, Zap, Shield, Layers,
  MapPin, BarChart3, FileText, Ship, Star, Clock, Target, ChevronRight,
  Warehouse, TrendingUp, Radio,
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
                  <span className="font-black text-white text-xl tracking-tight">DeliWer</span>
                  <span className="font-black text-amber-400 text-xl tracking-wider">Logistics</span>
                </div>
                <p className="text-[10px] text-amber-500/70 font-bold uppercase tracking-widest">Powered by ChainTrack · Dubai–Gawadar Corridor</p>
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
                      <p className="text-slate-400 mb-8">You can access both hubs after onboarding — pick your primary starting point.</p>
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
                    Welcome to the DeliWer Logistics Freight Broker Network.
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

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-8 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Anchor className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="font-black text-white text-xs">DeliWer</span>
              <span className="text-amber-400 font-black text-xs ml-1">Logistics</span>
              <span className="text-slate-600 text-xs ml-1">· ChainTrack · DeliWer Group</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <Link href="/logistics" className="hover:text-slate-400 transition-colors">Corridor Overview</Link>
            <span>·</span>
            <Link href="/freight-broker" className="hover:text-slate-400 transition-colors">Freight Broker Hub</Link>
            <span>·</span>
            <Link href="/" className="hover:text-slate-400 transition-colors">DeliWer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
