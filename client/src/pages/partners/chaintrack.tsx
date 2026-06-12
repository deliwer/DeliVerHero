import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor, Plane, Route, ArrowRight, CheckCircle2, Globe,
  Package, Truck, Building2, DollarSign, Zap, Shield, Layers,
  MapPin, BarChart3, Ship, Star, Clock, Warehouse,
  RefreshCw, ChevronDown, MessageCircle, Smartphone,
  Users, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { useToast } from "@/hooks/use-toast";

const WA_NUMBER = "971523906019";

// ── Corridors ─────────────────────────────────────────────────────────────────
const CORRIDORS = [
  {
    id: "dubai-south",
    label: "Dubai South · DWC",
    sub: "Air-freight consolidation at Al Maktoum International",
    icon: Plane,
    color: "border-amber-500/50 bg-amber-500/6",
    iconBg: "from-amber-400 to-orange-500",
    accent: "text-amber-400",
    cbmRate: 42,
    unit: "per CBM / air",
  },
  {
    id: "gawadar",
    label: "Gawadar Port · CPEC",
    sub: "Deep-sea aggregation, CPEC Free Zone, inland rail",
    icon: Anchor,
    color: "border-emerald-500/50 bg-emerald-500/6",
    iconBg: "from-emerald-400 to-teal-600",
    accent: "text-emerald-400",
    cbmRate: 28,
    unit: "per CBM / sea",
  },
  {
    id: "instc",
    label: "INSTC Corridor",
    sub: "Iran · Caspian · Russia · Central Asia rail link",
    icon: Route,
    color: "border-sky-500/50 bg-sky-500/6",
    iconBg: "from-sky-400 to-blue-600",
    accent: "text-sky-400",
    cbmRate: 35,
    unit: "per CBM / rail",
  },
  {
    id: "both",
    label: "Full Network",
    sub: "All corridors — air, sea & rail modes",
    icon: Globe,
    color: "border-purple-500/50 bg-purple-500/6",
    iconBg: "from-purple-400 to-fuchsia-600",
    accent: "text-purple-400",
    cbmRate: 38,
    unit: "per CBM avg",
  },
];

const BROKER_TYPES = [
  { id: "forwarder",  label: "Freight Forwarder",  desc: "I arrange cargo movement for clients",         icon: Truck     },
  { id: "customs",   label: "Customs Broker",      desc: "I handle customs clearance & compliance",      icon: Shield    },
  { id: "trading",   label: "Trading Company",     desc: "I import/export goods directly",               icon: Globe     },
  { id: "logistics", label: "Logistics Company",   desc: "I operate warehousing or distribution",        icon: Warehouse },
  { id: "carrier",   label: "Carrier / Operator",  desc: "I own or operate transport assets",            icon: Ship      },
  { id: "other",     label: "Other / Not Sure",    desc: "Tell us more when we connect on WhatsApp",     icon: Star      },
];

const CARGO_TYPES = [
  { id: "general",     label: "General Cargo",     icon: Package },
  { id: "electronics", label: "Electronics",       icon: Smartphone },
  { id: "pharma",      label: "Pharma / Medical",  icon: Shield },
  { id: "ecommerce",   label: "E-commerce",        icon: Layers },
  { id: "industrial",  label: "Industrial Goods",  icon: Building2 },
  { id: "mixed",       label: "Mixed / Other",     icon: Star },
];

// ── Sub-navigation ─────────────────────────────────────────────────────────────
function SubNav() {
  const items = [
    { label: "Freight Broker", id: "freight-broker-track" },
    { label: "Phone Flipper",  id: "phone-flipper-track"  },
    { label: "CBM Calculator", id: "cbm-calculator"       },
    { label: "Apply Now",      id: "apply-form"           },
  ];
  return (
    <div className="sticky top-[72px] z-30 bg-amber-950/95 backdrop-blur border-b border-amber-500/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-12 gap-1 overflow-x-auto no-scrollbar">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="px-4 h-12 text-[10px] font-black uppercase tracking-widest text-amber-300/70 hover:text-amber-200 hover:bg-amber-500/10 transition-all whitespace-nowrap border-b-2 border-transparent hover:border-amber-400 shrink-0"
              data-testid={`subnav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="ml-auto shrink-0">
            <Link href="/partners">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-500/50 hover:text-amber-400 transition-colors px-3 py-2 cursor-pointer whitespace-nowrap">
                ← All Tracks
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CBM Earnings Calculator ────────────────────────────────────────────────────
function CBMCalculator() {
  const [corridor, setCorridor] = useState(CORRIDORS[0]);
  const [cbmPerMonth, setCbmPerMonth] = useState(50);
  const [shipments, setShipments] = useState(3);

  const monthlyEarning = useMemo(
    () => Math.round(cbmPerMonth * corridor.cbmRate * shipments * 0.08),
    [cbmPerMonth, corridor.cbmRate, shipments]
  );
  const annualEarning = monthlyEarning * 12;

  return (
    <div className="bg-slate-900 border border-amber-500/25 rounded-3xl overflow-hidden" id="cbm-calculator">
      <div className="px-6 py-4 border-b border-amber-500/15 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-black uppercase tracking-widest text-amber-300">CBM Earnings Estimator</span>
      </div>
      <div className="p-6 space-y-6">
        {/* Corridor picker */}
        <div>
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Select Corridor</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CORRIDORS.map((c) => {
              const Icon = c.icon;
              const selected = corridor.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCorridor(c)}
                  data-testid={`corridor-${c.id}`}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                    selected ? `${c.color} border-current` : "border-slate-700 bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.iconBg} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wide leading-tight ${selected ? c.accent : "text-slate-400"}`}>
                    {c.label.split(" · ")[0]}
                  </span>
                  <span className={`text-[9px] font-bold ${selected ? c.accent : "text-slate-600"}`}>
                    AED {c.cbmRate} {c.unit}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* CBM per shipment */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">CBM per Shipment</Label>
              <span className="text-amber-400 font-black text-sm">{cbmPerMonth} CBM</span>
            </div>
            <input
              type="range" min={5} max={500} step={5}
              value={cbmPerMonth}
              onChange={(e) => setCbmPerMonth(Number(e.target.value))}
              className="w-full accent-amber-500"
              data-testid="slider-cbm"
            />
            <div className="flex justify-between text-[9px] text-slate-600 mt-1">
              <span>5 CBM</span><span>500 CBM</span>
            </div>
          </div>

          {/* Shipments per month */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shipments / Month</Label>
              <span className="text-amber-400 font-black text-sm">{shipments}</span>
            </div>
            <input
              type="range" min={1} max={20}
              value={shipments}
              onChange={(e) => setShipments(Number(e.target.value))}
              className="w-full accent-amber-500"
              data-testid="slider-shipments"
            />
            <div className="flex justify-between text-[9px] text-slate-600 mt-1">
              <span>1</span><span>20</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-amber-500/25 bg-amber-950/30 p-5">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/70 mb-1">Est. Monthly Commission</p>
              <p className="text-4xl font-black text-white">
                AED <span className="text-amber-400">{monthlyEarning.toLocaleString()}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                AED {annualEarning.toLocaleString()} / year · based on {cbmPerMonth} CBM × {shipments} shipments @ AED {corridor.cbmRate} {corridor.unit}
              </p>
            </div>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi ChainTrack! I'm interested in joining as a Freight Broker on the ${corridor.label} corridor. I expect ~${cbmPerMonth} CBM per shipment, ${shipments} shipments/month.`)}`}
              target="_blank" rel="noopener noreferrer"
              data-testid="link-calculator-wa-cta"
            >
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black gap-2 whitespace-nowrap">
                <MessageCircle className="w-4 h-4" /> Lock In This Rate
              </Button>
            </a>
          </div>
        </div>
        <p className="text-[9px] text-slate-600 text-center">Illustrative estimate based on standard broker referral rates. Actual commissions vary by cargo type, contract terms, and volume. Rates quoted in AED.</p>
      </div>
    </div>
  );
}

// ── Freight Broker Application Form ───────────────────────────────────────────
function FreightBrokerForm() {
  const [step, setStep] = useState(1);
  const [brokerType, setBrokerType] = useState("");
  const [corridor, setCorridor] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [form, setForm] = useState({ name: "", company: "", phone: "", country: "" });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const selectedCorridor = CORRIDORS.find((c) => c.id === corridor);

  const handleSubmit = () => {
    const brokerLabel = BROKER_TYPES.find((b) => b.id === brokerType)?.label ?? brokerType;
    const corridorLabel = selectedCorridor?.label ?? corridor;
    const cargoLabel = CARGO_TYPES.find((c) => c.id === cargoType)?.label ?? cargoType;
    const msg = [
      `Hi ChainTrack! I want to join as a *Freight Broker* on the ChainTrack Partners network.`,
      ``,
      `*Broker Type:* ${brokerLabel}`,
      `*Corridor:* ${corridorLabel}`,
      `*Cargo Type:* ${cargoLabel}`,
      `*Name:* ${form.name}`,
      `*Company:* ${form.company}`,
      `*Phone:* ${form.phone}`,
      `*Country:* ${form.country}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    toast({ title: "Opening WhatsApp…", description: "Send the message to complete your application." });
  };

  const canNext1 = !!brokerType;
  const canNext2 = !!corridor && !!cargoType;
  const canSubmit = !!form.name && !!form.phone;

  if (submitted) {
    return (
      <div className="rounded-3xl border border-amber-500/30 bg-amber-950/20 p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <p className="text-xl font-black text-white mb-2">Application Sent!</p>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          Our ChainTrack corridor team will review your profile and respond within 24 hours on WhatsApp.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(1); setBrokerType(""); setCorridor(""); setCargoType(""); setForm({ name: "", company: "", phone: "", country: "" }); }}
          className="mt-5 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 underline underline-offset-2"
          data-testid="button-reset-form"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-amber-500/25 rounded-3xl overflow-hidden" id="apply-form">
      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="px-6 py-4 border-b border-amber-500/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-300">Freight Broker Application</span>
        </div>
        <span className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest">Step {step} of 3</span>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1 — Broker type */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-black text-white mb-1">What type of freight operator are you?</h3>
              <p className="text-slate-500 text-xs mb-5">Select the option that best describes your business today.</p>
              <div className="grid sm:grid-cols-2 gap-2 mb-6">
                {BROKER_TYPES.map((bt) => {
                  const Icon = bt.icon;
                  const sel = brokerType === bt.id;
                  return (
                    <button
                      key={bt.id}
                      onClick={() => setBrokerType(bt.id)}
                      data-testid={`broker-type-${bt.id}`}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        sel ? "border-amber-500 bg-amber-500/10" : "border-slate-700 bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${sel ? "bg-amber-500/20" : "bg-slate-700"}`}>
                        <Icon className={`w-4.5 h-4.5 ${sel ? "text-amber-400" : "text-slate-400"}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-black ${sel ? "text-amber-300" : "text-white"}`}>{bt.label}</p>
                        <p className="text-[10px] text-slate-500 leading-snug">{bt.desc}</p>
                      </div>
                      {sel && <CheckCircle2 className="w-4 h-4 text-amber-400 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!canNext1}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black h-12 rounded-2xl"
                data-testid="button-step1-next"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Step 2 — Corridor + cargo */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-black text-white mb-1">Choose your corridor &amp; cargo</h3>
              <p className="text-slate-500 text-xs mb-5">This determines which ChainTrack corridor team we connect you with.</p>

              <div className="mb-5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Trade Corridor *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {CORRIDORS.map((c) => {
                    const Icon = c.icon;
                    const sel = corridor === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCorridor(c.id)}
                        data-testid={`select-corridor-${c.id}`}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${
                          sel ? `${c.color} border-current` : "border-slate-700 bg-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className={`text-[11px] font-black ${sel ? c.accent : "text-white"}`}>{c.label.split(" · ")[0]}</p>
                          <p className={`text-[9px] ${sel ? c.accent : "text-slate-500"}`}>AED {c.cbmRate} {c.unit}</p>
                        </div>
                        {sel && <CheckCircle2 className="w-3.5 h-3.5 ml-auto shrink-0 text-current" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Primary Cargo Type *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {CARGO_TYPES.map((ct) => {
                    const Icon = ct.icon;
                    const sel = cargoType === ct.id;
                    return (
                      <button
                        key={ct.id}
                        onClick={() => setCargoType(ct.id)}
                        data-testid={`cargo-type-${ct.id}`}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                          sel ? "border-amber-500 bg-amber-500/10" : "border-slate-700 bg-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${sel ? "text-amber-400" : "text-slate-400"}`} />
                        <span className={`text-[9px] font-black leading-tight ${sel ? "text-amber-300" : "text-slate-400"}`}>{ct.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="border-slate-700 text-slate-300 font-black h-12 rounded-2xl flex-1" data-testid="button-step2-back">
                  ← Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canNext2} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black h-12 rounded-2xl flex-1" data-testid="button-step2-next">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Contact */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-black text-white mb-1">Your contact details</h3>
              <p className="text-slate-500 text-xs mb-5">We'll send your application directly to our corridor desk via WhatsApp.</p>

              {/* Summary pill */}
              {selectedCorridor && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${selectedCorridor.color} mb-5`}>
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${selectedCorridor.accent}`} />
                  <span className={`text-[10px] font-black ${selectedCorridor.accent}`}>{selectedCorridor.label}</span>
                  <span className="text-slate-500 text-[10px] mx-1">·</span>
                  <span className="text-[10px] text-slate-400">{BROKER_TYPES.find((b) => b.id === brokerType)?.label}</span>
                  <span className="text-slate-500 text-[10px] mx-1">·</span>
                  <span className="text-[10px] text-slate-400">{CARGO_TYPES.find((c) => c.id === cargoType)?.label}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="John Smith"
                    className="mt-1 bg-slate-800 border-slate-700 text-white h-10 text-sm"
                    data-testid="input-freight-name"
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp *</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+971 / any country"
                    className="mt-1 bg-slate-800 border-slate-700 text-white h-10 text-sm"
                    data-testid="input-freight-phone"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company</Label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    placeholder="Your company name"
                    className="mt-1 bg-slate-800 border-slate-700 text-white h-10 text-sm"
                    data-testid="input-freight-company"
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country / Base</Label>
                  <Input
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    placeholder="UAE, Pakistan, UK…"
                    className="mt-1 bg-slate-800 border-slate-700 text-white h-10 text-sm"
                    data-testid="input-freight-country"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="border-slate-700 text-slate-300 font-black h-12 rounded-2xl flex-1" data-testid="button-step3-back">
                  ← Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black h-12 rounded-2xl flex-1 gap-2"
                  data-testid="button-freight-submit"
                >
                  <MessageCircle className="w-4 h-4" /> Apply via WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ChainTrackPartnersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-500/30">
      <SEOMeta
        title="ChainTrack Partners — Freight Broker & Phone Flipper Network Dubai | CBM Commission"
        description="Join the ChainTrack Partners network. Freight brokers earn per CBM on Dubai·CPEC·INSTC corridors. Phone flippers access B2B wholesale pricing. Free to join. Apply via WhatsApp."
        keywords="ChainTrack Partners, freight broker Dubai, CBM commission, CPEC corridor broker, INSTC freight, phone flipper Dubai, ChainTrack logistics career"
        canonical="https://www.deliwer.com/partners/chaintrack"
      />
      <Navigation />
      <SubNav />

      {/* ── Hero ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-amber-200 font-black text-[10px] uppercase tracking-widest">ChainTrack Partners — Career Gateway</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-5">
                  Freight.
                  <br />
                  <span className="text-amber-400">Trade.</span>
                  <br />
                  Your Network.
                </h1>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
                  Two tracks under the <span className="font-black text-amber-300">ChainTrack Partners</span> umbrella.
                  Earn per CBM on Dubai's busiest trade corridors — or flip electronics B2B through ChainTrack's wholesale platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => document.getElementById("freight-broker-track")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black h-12 px-6 rounded-2xl gap-2"
                    data-testid="button-hero-freight-cta"
                  >
                    <Anchor className="w-4 h-4" /> Freight Broker Track
                  </Button>
                  <Button
                    onClick={() => document.getElementById("phone-flipper-track")?.scrollIntoView({ behavior: "smooth" })}
                    variant="outline"
                    className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-black h-12 px-6 rounded-2xl gap-2"
                    data-testid="button-hero-flipper-cta"
                  >
                    <RefreshCw className="w-4 h-4" /> Phone Flipper Track
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Active Corridors", value: "4", sub: "Dubai · CPEC · INSTC · Air", icon: Route, color: "amber" },
                  { label: "CBM Rates From", value: "AED 28", sub: "per CBM sea freight", icon: DollarSign, color: "emerald" },
                  { label: "Network Brokers", value: "120+", sub: "active in network", icon: Users, color: "sky" },
                  { label: "Cargo Types", value: "6", sub: "incl. electronics & pharma", icon: Package, color: "purple" },
                ].map(({ label, value, sub, icon: Icon, color }) => {
                  const colorMap: Record<string, string> = {
                    amber:   "border-amber-500/25 bg-amber-500/5",
                    emerald: "border-emerald-500/25 bg-emerald-500/5",
                    sky:     "border-sky-500/25 bg-sky-500/5",
                    purple:  "border-purple-500/25 bg-purple-500/5",
                  };
                  const iconMap: Record<string, string> = {
                    amber:   "text-amber-400",
                    emerald: "text-emerald-400",
                    sky:     "text-sky-400",
                    purple:  "text-purple-400",
                  };
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`rounded-2xl border ${colorMap[color]} p-4`}
                    >
                      <Icon className={`w-5 h-5 ${iconMap[color]} mb-2`} />
                      <p className="text-2xl font-black text-white">{value}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${iconMap[color]} mb-0.5`}>{label}</p>
                      <p className="text-[9px] text-slate-500">{sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Freight Broker Track ── */}
      <section id="freight-broker-track" className="py-16 px-4 bg-amber-950/10 border-y border-amber-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Anchor className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 mb-1">Sub-Track A</Badge>
              <h2 className="text-2xl font-black text-white">Freight Broker Track</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: DollarSign, title: "Earn Per CBM",     desc: "Commission on every cubic metre you move through ChainTrack corridors. Sea from AED 28, air from AED 42.",                            color: "amber"   },
              { icon: Route,      title: "4 Live Corridors", desc: "Dubai South (DWC) · Gawadar CPEC · INSTC Rail · Air Charter — pick one or run all four.",                                           color: "emerald" },
              { icon: Shield,     title: "Escrow Protected", desc: "ChainTrack escrow holds cargo payment until delivery confirmed. Zero counterparty risk for your clients.",                            color: "sky"     },
              { icon: Clock,      title: "24-hr Onboarding", desc: "Submit your WhatsApp application → corridor desk responds within 24 hours → first cargo booking within a week.",                     color: "purple"  },
              { icon: Layers,     title: "Multi-Modal",      desc: "Air consolidation at DWC, sea aggregation at Gawadar, inland rail via INSTC. Mix modes per shipment.",                              color: "rose"    },
              { icon: TrendingUp, title: "Volume Bonuses",   desc: "Unlock tier 2 rates at 200 CBM/month and tier 3 at 500 CBM/month. Top brokers earn AED 40K+/month.",                              color: "amber"   },
            ].map(({ icon: Icon, title, desc, color }) => {
              const cm: Record<string, string> = {
                amber:   "border-amber-500/25 bg-amber-500/5 text-amber-400",
                emerald: "border-emerald-500/25 bg-emerald-500/5 text-emerald-400",
                sky:     "border-sky-500/25 bg-sky-500/5 text-sky-400",
                purple:  "border-purple-500/25 bg-purple-500/5 text-purple-400",
                rose:    "border-rose-500/25 bg-rose-500/5 text-rose-400",
              };
              return (
                <div key={title} className={`rounded-xl border p-4 ${cm[color].split(" ").slice(0, 2).join(" ")}`}>
                  <Icon className={`w-5 h-5 ${cm[color].split(" ")[2]} mb-2`} />
                  <p className="font-black text-white text-sm mb-1">{title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>

          {/* Corridor strip */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 mb-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Active Trade Corridors</p>
            <div className="grid sm:grid-cols-4 gap-3">
              {CORRIDORS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.id} className={`rounded-xl border p-3 ${c.color}`}>
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.iconBg} flex items-center justify-center mb-2`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className={`text-[10px] font-black uppercase ${c.accent}`}>{c.label.split(" · ")[0]}</p>
                    <p className="text-[9px] text-slate-500 leading-snug mt-0.5">{c.sub}</p>
                    <p className={`text-[10px] font-black mt-1 ${c.accent}`}>AED {c.cbmRate} {c.unit}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CBM Calculator */}
          <CBMCalculator />
        </div>
      </section>

      {/* ── Phone Flipper Track ── */}
      <section id="phone-flipper-track" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 mb-1">Sub-Track B</Badge>
              <h2 className="text-2xl font-black text-white">Phone Flipper Track</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              {[
                { icon: Smartphone,  title: "B2B Wholesale Pricing",  desc: "Access DAFZA-landed devices at distributor price. iPhone, Samsung, Xiaomi and more at margins regular buyers can't touch." },
                { icon: RefreshCw,   title: "Reverse-Bid Auctions",   desc: "List what you want to buy — suppliers compete to match your price. Buy low without hunting supplier by supplier." },
                { icon: DollarSign,  title: "Fast Cash Cycle",        desc: "Short inventory cycle — source, verify, and resell within days. Margin windows are time-sensitive; ChainTrack Intel alerts you first." },
                { icon: Shield,      title: "Escrow-Safe Deals",      desc: "Every device transaction on ChainTrack is escrow-protected. Funds release on inspection confirmation." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">{title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-purple-400" />
                <span className="font-black text-white text-sm">Live Intel Example</span>
              </div>
              {[
                { label: "iPhone 15 Pro Max 256GB · Grade A",  buy: "DAFZA $489",  sell: "Almaty $720",  margin: "~47%" },
                { label: "Samsung S24 Ultra 512GB · Grade B",  buy: "DWC $310",    sell: "Tbilisi $490", margin: "~58%" },
                { label: "Xiaomi 14 Pro 512GB · Sealed",       buy: "Jebel Ali $220", sell: "Riyadh $370", margin: "~68%" },
              ].map(({ label, buy, sell, margin }) => (
                <div key={label} className="rounded-xl bg-slate-900 border border-slate-800 p-3">
                  <p className="text-xs font-bold text-white mb-2">{label}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-slate-500">Buy:</span>
                    <span className="text-slate-300 font-bold">{buy}</span>
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span className="text-slate-500">Sell:</span>
                    <span className="text-slate-300 font-bold">{sell}</span>
                    <span className="ml-auto px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-black">{margin}</span>
                  </div>
                </div>
              ))}
              <Link href="/chaintrack">
                <Button className="w-full bg-purple-600 hover:bg-purple-500 font-black h-10 rounded-xl gap-2 mt-2" data-testid="button-open-chaintrack">
                  <RefreshCw className="w-4 h-4" /> Open ChainTrack Platform <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Freight Broker Application Form ── */}
      <section className="py-16 px-4 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 mb-3">3-Step Application</Badge>
            <h2 className="text-3xl font-black text-white">Apply as a Freight Broker</h2>
            <p className="text-slate-400 mt-2 text-sm">Takes 2 minutes. Corridor desk responds within 24 hours on WhatsApp.</p>
          </div>
          <FreightBrokerForm />
        </div>
      </section>

      {/* ── Back to partner gateway ── */}
      <section className="py-10 px-4 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Looking for real estate or home services?</p>
            <p className="text-white font-bold">Head over to <span className="text-emerald-400">DeliWer Partners</span> — the broker track for relocation &amp; move-in services.</p>
          </div>
          <Link href="/partners">
            <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black gap-2 shrink-0" data-testid="button-back-to-partners">
              <Building2 className="w-4 h-4" /> DeliWer Partners →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
