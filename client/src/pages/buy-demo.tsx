import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Package, Gavel, BarChart3, Clock, CheckCircle2, ChevronRight, ChevronLeft,
  Play, Pause, ArrowRight, Globe, ShoppingCart, Shield, TrendingDown, Users,
  MapPin, Phone, Mail, Building2, Lock, ExternalLink, Award
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const PHASES = [
  { id: 1, label: "Discover", title: "Live Auction Event Goes Live", icon: Zap, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
  { id: 2, label: "Inventory", title: "Browse Available Stock", icon: Package, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
  { id: 3, label: "Submit Bid", title: "Enter Your Price Target", icon: Gavel, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  { id: 4, label: "Aggregate", title: "ChainTrack Pools All Demand", icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  { id: 5, label: "Review", title: "Supplier Responds to Offers", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { id: 6, label: "Allocation", title: "Accepted Buyers Receive Offer", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
];

const STOCK = [
  { color: "Natural Titanium", hex: "#C8B89A", qty: 120, ref: 890, requested: 480, flag: "🇺🇸" },
  { color: "Desert Titanium", hex: "#B5A48F", qty: 80, ref: 890, requested: 320, flag: "🇺🇸" },
  { color: "Black Titanium", hex: "#3D3D3D", qty: 60, ref: 885, requested: 280, flag: "🇺🇸" },
  { color: "White Titanium", hex: "#E8E4DC", qty: 40, ref: 885, requested: 180, flag: "🇺🇸" },
];

const SAMPLE_BIDS = [
  { buyer: "Gulf Mobile Trading LLC", country: "UAE", qty: 50, price: 790 },
  { buyer: "CIS Tech Wholesale", country: "Kazakhstan", qty: 100, price: 782 },
  { buyer: "Al Rawabi Electronics", country: "UAE", qty: 30, price: 795 },
  { buyer: "Baku Import House", country: "Azerbaijan", qty: 60, price: 778 },
  { buyer: "Orient Mobiles Ltd", country: "Uzbekistan", qty: 80, price: 785 },
];

function CountdownBadge() {
  const [secs, setSecs] = useState(4 * 3600 + 22 * 60 + 14);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return (
    <span className="font-mono text-orange-300 text-xs font-bold">
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}

function AnimatedDemandBar({ available, requested, color }: { available: number; requested: number; color: string }) {
  const pct = Math.min(100, Math.round((requested / (available * 3)) * 100));
  const oversubscribed = requested > available;
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ background: oversubscribed ? "#F97316" : color }}
      />
    </div>
  );
}

function Phase1() {
  const [bidCount, setBidCount] = useState(47);
  useEffect(() => {
    const t = setInterval(() => setBidCount(c => c + Math.floor(Math.random() * 2)), 12000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse inline-block" />
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Live Auction · Open Now</span>
            </div>
            <h2 className="text-white font-black text-lg leading-tight">iPhone 17 Pro Max — USA Factory Unlocked</h2>
            <p className="text-slate-400 text-xs mt-1">A-grade · IMEI clean · All carriers · T-Mobile / AT&T / Verizon stock</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Closes in</div>
            <CountdownBadge />
            <div className="text-[10px] text-slate-500 mt-0.5">Fri 18:00 Dubai Time</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-orange-500/20">
          <div className="text-center">
            <div className="text-white font-black text-xl">{bidCount}</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-widest">Active Bids</div>
          </div>
          <div className="text-center border-x border-orange-500/20">
            <div className="text-white font-black text-xl">300</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-widest">Units Available</div>
          </div>
          <div className="text-center">
            <div className="text-white font-black text-xl">$890</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-widest">Ref. Price / Unit</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Why Reverse Auction?</div>
        <div className="space-y-2">
          {[
            { icon: TrendingDown, text: "Buyers submit price targets — ChainTrack negotiates with suppliers on your behalf" },
            { icon: Users, text: "Combined demand (300+ units) gives leverage no single buyer has alone" },
            { icon: Shield, text: "DAFZA escrow protects payment — released only after delivery confirmed" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <Icon className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
              <span className="text-slate-300 text-xs leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Phase2() {
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">4 variants available · All 🇺🇸 USA factory unlocked · A-grade</div>
      {STOCK.map((s) => (
        <div key={s.color} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ background: s.hex }} />
              <span className="text-white font-semibold text-sm">{s.color}</span>
              <span className="text-slate-500 text-xs">{s.flag} USA</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">${s.ref}<span className="text-slate-500 text-xs font-normal">/unit</span></div>
              <div className="text-slate-500 text-[10px]">reference price</div>
            </div>
          </div>
          <AnimatedDemandBar available={s.qty} requested={s.requested} color="#06B6D4" />
          <div className="flex justify-between mt-1.5 text-[10px] text-slate-500">
            <span>{s.qty} available</span>
            <span className="text-orange-400 font-medium">{s.requested} requested by buyers</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Phase3() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  };
  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
        <div className="text-white font-black text-lg mb-1">Bid Received</div>
        <div className="text-slate-400 text-sm max-w-xs mx-auto">
          Your requirement has been logged. ChainTrack will contact you after the Friday deadline with an allocation offer.
        </div>
        <div className="mt-4 inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/20 rounded-xl px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-xs font-semibold">Your bid is now live in the pool</span>
        </div>
        <button onClick={() => setSubmitted(false)} className="block mx-auto mt-3 text-slate-500 text-xs hover:text-slate-400 transition-colors">
          ← Reset demo
        </button>
      </motion.div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Company Name", val: "Gulf Mobile Trading LLC" },
          { label: "Contact Name", val: "Ahmed Al-Rashid" },
          { label: "WhatsApp", val: "+971 50 123 4567" },
          { label: "Email", val: "procurement@gulfmobile.ae" },
        ].map(({ label, val }) => (
          <div key={label}>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</div>
            <div className="px-3 py-2 rounded-lg text-sm text-white font-mono bg-slate-800/60 border border-slate-700/60">{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Model Required</div>
          <div className="px-3 py-2 rounded-lg text-sm text-white bg-slate-800/60 border border-slate-700/60">iPhone 17 Pro Max — Natural Titanium</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Quantity (units)</div>
          <div className="px-3 py-2 rounded-lg text-sm text-white font-mono bg-slate-800/60 border border-slate-700/60">50</div>
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Target Price (USD / unit)</div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-lg text-orange-300 font-black text-lg font-mono bg-orange-500/10 border border-orange-500/30 flex-1">$790</div>
          <div className="text-xs text-slate-400 max-w-[160px] leading-relaxed">11% below reference — competitive with current pool</div>
        </div>
      </div>
      <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl px-4 py-3 flex items-start gap-2">
        <BarChart3 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-blue-300 text-xs leading-relaxed">Your target of <strong>$790/unit</strong> is within the competitive range. 68% of current bids are between $775–$795.</p>
      </div>
      <button type="submit" disabled={submitting}
        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black uppercase tracking-widest text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2">
        {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</> : <><Gavel className="w-4 h-4" /> Submit Reverse Bid</>}
      </button>
      <p className="text-[10px] text-slate-600 text-center">This is a demo simulation — no real bid is submitted</p>
    </form>
  );
}

function Phase4() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s < 2 ? s + 1 : s)), 1200);
    return () => clearInterval(t);
  }, []);
  const total = SAMPLE_BIDS.reduce((a, b) => a + b.qty, 0);
  return (
    <div className="space-y-4">
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Individual bids → combined demand pool</div>
      <div className="space-y-2">
        {SAMPLE_BIDS.map((b, i) => (
          <motion.div key={b.buyer} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-slate-500" />
              <span className="text-white font-medium">{b.buyer}</span>
              <span className="text-slate-500">{b.country}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{b.qty} units</span>
              <span className="text-orange-400 font-bold font-mono">${b.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
        className="rounded-xl border border-orange-500/30 bg-orange-500/8 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-orange-400 text-xs font-black uppercase tracking-widest">ChainTrack aggregates demand</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><div className="text-white font-black text-2xl">47</div><div className="text-slate-500 text-[10px]">Buyers</div></div>
          <div className="border-x border-orange-500/20"><div className="text-white font-black text-2xl">2,340</div><div className="text-slate-500 text-[10px]">Units pooled</div></div>
          <div><div className="text-orange-300 font-black text-2xl">$783</div><div className="text-slate-500 text-[10px]">Pool avg. price</div></div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 2 ? 1 : 0 }}
        className="rounded-xl border border-blue-500/25 bg-blue-500/5 p-3 text-xs text-blue-300 leading-relaxed">
        <strong className="text-blue-400">Result:</strong> ChainTrack presents a single purchase offer of 2,340 units to the US supplier at an aggregated price the supplier cannot refuse from a single buyer.
      </motion.div>
    </div>
  );
}

function Phase5() {
  const TIMELINE = [
    { time: "Friday 18:00 DT", event: "Bid window closes", detail: "All submitted bids are locked in the pool", color: "text-orange-400", dot: "bg-orange-400" },
    { time: "Mon – Tue", event: "ChainTrack reviews bids", detail: "Bids ranked by price, qty, and buyer verification status", color: "text-blue-400", dot: "bg-blue-400" },
    { time: "Wednesday", event: "Supplier responds", detail: "Supplier accepts, counters, or passes on the aggregated offer", color: "text-purple-400", dot: "bg-purple-400" },
    { time: "Wed Evening", event: "Allocation offers sent", detail: "Accepted buyers receive WhatsApp + email notification with offer details", color: "text-amber-400", dot: "bg-amber-400" },
    { time: "Thursday–Friday", event: "Payment window", detail: "DAFZA escrow funded — shipment arranged upon confirmation", color: "text-emerald-400", dot: "bg-emerald-400" },
  ];
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">What happens after the bid deadline</div>
      <div className="relative">
        <div className="absolute left-3.5 top-4 bottom-4 w-px bg-gradient-to-b from-orange-400/50 via-blue-400/30 to-emerald-400/50" />
        <div className="space-y-4 ml-8">
          {TIMELINE.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="absolute -left-4.5 mt-1">
                <div className={`w-3 h-3 rounded-full border-2 border-[#0A0E1A] ${t.dot}`} style={{ marginLeft: "-1.25rem" }} />
              </div>
              <div className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-0.5">{t.time}</div>
              <div className={`font-bold text-sm ${t.color}`}>{t.event}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{t.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Phase6() {
  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-emerald-400 text-xs font-black uppercase tracking-widest">Allocation Confirmed</div>
            <div className="text-white font-black text-base">Your bid has been accepted</div>
          </div>
        </div>
        <div className="space-y-3 text-sm border-t border-emerald-500/20 pt-4">
          {[
            { label: "Product", value: "iPhone 17 Pro Max — Natural Titanium" },
            { label: "Quantity Allocated", value: "50 units (full request)" },
            { label: "Confirmed Price", value: "$783 / unit  (vs. $890 reference)", highlight: true },
            { label: "Total Order Value", value: "$39,150 USD" },
            { label: "Savings vs. Reference", value: "$5,350 USD (11.9%)", highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex items-start justify-between gap-2">
              <span className="text-slate-400 text-xs">{label}</span>
              <span className={`text-xs font-semibold text-right ${highlight ? "text-emerald-300" : "text-white"}`}>{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400 leading-relaxed">
        <strong className="text-white">Next steps:</strong> DAFZA escrow invoice sent to your email. Fund within 48h → ChainTrack arranges logistics → shipment dispatched with inspection report and IMEI manifest.
      </div>
      <div className="flex gap-2">
        <a href="/buy/reverse-auction" className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-black uppercase tracking-widest text-xs text-center hover:bg-orange-400 transition-colors">
          Join Live Auction →
        </a>
        <a href="https://wa.me/971523906019?text=ChainTrack%20Reverse%20Auction%20-%20I%20want%20to%20register%20as%20a%20buyer"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-white text-xs font-bold transition-colors" style={{ background: "#25D366" }}>
          <SiWhatsapp className="w-4 h-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

const PHASE_COMPONENTS = [Phase1, Phase2, Phase3, Phase4, Phase5, Phase6];

export default function BuyDemoPage() {
  const [phase, setPhase] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [dir, setDir] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoPlay) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setDir(1);
      setPhase(p => (p + 1) % 6);
    }, 9000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoPlay]);

  const go = (next: number) => {
    setDir(next > phase ? 1 : -1);
    setPhase(next);
    setAutoPlay(false);
  };

  const PhaseComponent = PHASE_COMPONENTS[phase];
  const p = PHASES[phase];

  return (
    <div className="min-h-screen text-white" style={{ background: "#070B14" }}>
      {/* Header */}
      <header className="border-b border-slate-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">buy.chaintrack</span>
              <span className="text-slate-500 text-sm">.com</span>
            </div>
            <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-500/15 border border-amber-500/30 text-amber-400">
              Demo Mode
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/buy" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> Sign In →
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
            <span className="text-orange-300 text-[10px] font-black uppercase tracking-widest">Interactive Reverse Auction Walkthrough</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">How ChainTrack Reverse Auctions Work</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Buyers name their price. ChainTrack pools demand across verified buyers and presents a single consolidated offer to the supplier — unlocking prices no individual buyer could access alone.
          </p>
        </div>

        {/* Phase Stepper */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-1 gap-1">
          {PHASES.map((ph, i) => {
            const Icon = ph.icon;
            const active = i === phase;
            const done = i < phase;
            return (
              <button key={ph.id} onClick={() => go(i)} data-testid={`step-${i + 1}`}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all shrink-0 ${active ? "bg-slate-800 border border-slate-700" : "opacity-50 hover:opacity-80"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all
                  ${active ? "border-orange-500 bg-orange-500/20 text-orange-400" : done ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-slate-700 bg-slate-900 text-slate-500"}`}>
                  {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight max-w-[52px]"
                  style={{ color: active ? "#fff" : "#64748B" }}>
                  {ph.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phase Content */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden mb-5">
          <div className={`px-5 py-3.5 border-b border-slate-800 flex items-center gap-2.5 ${p.bg}`}>
            <p.icon className={`w-4 h-4 ${p.color}`} />
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Step {phase + 1} of 6</span>
              <div className={`font-black text-sm ${p.color}`}>{p.title}</div>
            </div>
          </div>
          <div className="p-5">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={phase}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 32 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <PhaseComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => go(Math.max(0, phase - 1))} disabled={phase === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm disabled:opacity-30">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <button onClick={() => setAutoPlay(a => !a)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all
              ${autoPlay ? "border-orange-500/40 bg-orange-500/10 text-orange-400" : "border-slate-700 text-slate-500 hover:text-slate-300"}`}>
            {autoPlay ? <><Pause className="w-3 h-3" /> Auto-playing</> : <><Play className="w-3 h-3" /> Auto-play</>}
          </button>

          {phase < 5 ? (
            <button onClick={() => go(phase + 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-all">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <a href="/buy/reverse-auction"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all">
              Join Live Auction <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {PHASES.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`h-1 rounded-full transition-all ${i === phase ? "w-6 bg-orange-400" : "w-2 bg-slate-700 hover:bg-slate-600"}`} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-center">
          <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="font-black text-white mb-1">Ready to submit a real bid?</div>
          <p className="text-slate-400 text-sm mb-4">Register your company on buy.chaintrack.com and access live wholesale auctions.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="/buy" className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black text-sm transition-all flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Register / Sign In
            </a>
            <a href="/buy/reverse-auction" className="px-5 py-2.5 rounded-xl border border-slate-600 hover:border-slate-500 text-slate-300 font-bold text-sm transition-all flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Live Auction
            </a>
          </div>
          <p className="text-[10px] text-slate-600 mt-3">Minimum 25 units · Verified buyers only · DAFZA escrow on every deal</p>
        </div>
      </div>
    </div>
  );
}
