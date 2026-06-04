import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Clock, ChevronRight, CheckCircle2, AlertCircle,
  Globe, Shield, TrendingUp, Boxes, Building2, ArrowRight
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

const EVENT_SLUG = "iphone17-pro-max-usa-jun2025";

interface StockItem {
  id: string;
  model: string;
  color: string;
  qty: number;
  refPriceUsd: number;
  requested: number;
}

interface AuctionEvent {
  id: string;
  slug: string;
  title: string;
  campaignName: string;
  description: string;
  deadline: string;
  stockItems: StockItem[];
  status: string;
  whatsapp: string;
  telegram: string;
  demand?: Record<string, { totalQty: number; bidCount: number }>;
}

const COUNTRIES = [
  "UAE", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman",
  "Pakistan", "India", "Kazakhstan", "Russia", "Ukraine", "Uzbekistan",
  "Georgia", "Azerbaijan", "Egypt", "Nigeria", "Kenya",
  "UK", "Germany", "USA", "Other",
];

function useCountdown(deadline: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (!deadline) return;
    const target = new Date(deadline).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);
  return t;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl text-2xl md:text-3xl font-bold font-mono text-white"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

function DemandBar({ available, requested, color }: { available: number; requested: number; color: string }) {
  const pct = Math.min(100, Math.round((requested / available) * 100));
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function AnimatedBidCount({ count }: { count: number }) {
  const [displayed, setDisplayed] = useState(count);
  const prevRef = useEffect(() => {
    if (displayed === count) return;
    const start = displayed;
    const diff = count - start;
    const duration = 800;
    const startTime = performance.now();
    let raf: number;
    function step(now: number) {
      const elapsed = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (elapsed < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [count]);
  void prevRef;
  return <>{displayed}</>;
}

const COLOR_HEX: Record<string, string> = {
  "Desert Silver": "#C8C8C8",
  "Deep Blue": "#1E3A5F",
  "Cosmic Orange": "#D4631A",
};

export default function ReverseAuctionPage() {
  const { toast } = useToast();

  const { data: event, isLoading, error } = useQuery<AuctionEvent>({
    queryKey: ["/api/reverse-auction/events", EVENT_SLUG],
    queryFn: async () => {
      const res = await fetch(`/api/reverse-auction/events/${EVENT_SLUG}`);
      if (!res.ok) throw new Error("Event not found");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const countdown = useCountdown(event?.deadline || "");

  const [form, setForm] = useState({
    companyName: "", contactName: "", whatsapp: "", email: "",
    country: "", modelRequired: "", preferredColor: "", quantity: "",
    targetPrice: "", destination: "", notes: "", acknowledged: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const submitBid = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/reverse-auction/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit bid");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: "Bid submitted", description: "ChainTrack will contact you after the Friday deadline." });
    },
    onError: (err: any) => {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acknowledged || !event) return;
    submitBid.mutate({
      eventId: event.id,
      companyName: form.companyName,
      contactName: form.contactName,
      whatsapp: form.whatsapp,
      email: form.email,
      country: form.country,
      modelRequired: form.modelRequired,
      preferredColor: form.preferredColor || undefined,
      quantityRequired: parseInt(form.quantity),
      targetUnitPriceUsd: parseInt(form.targetPrice),
      destinationCountry: form.destination,
      notes: form.notes || undefined,
    });
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const totalQty = event?.stockItems.reduce((s, i) => s + i.qty, 0) || 0;
  const totalBidCount = event?.demand
    ? Object.values(event.demand).reduce((s, d) => s + d.bidCount, 0)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0E1A" }}>
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white" style={{ background: "#0A0E1A" }}>
        <AlertCircle className="w-12 h-12 text-slate-500" />
        <div className="text-slate-400">No active bidding event found.</div>
        <a href="/buy" className="text-blue-400 text-sm hover:underline">← Return to Buy Portal</a>
      </div>
    );
  }

  const stockItems = event.stockItems as StockItem[];

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0E1A" }}>

      {/* ── Top Bar ── */}
      <div className="w-full px-6 py-2 flex items-center justify-between text-xs" style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live Bidding Event
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">ChainTrack Procurement Network · Dubai, UAE</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <a href={`https://wa.me/${event.whatsapp?.replace(/\D/g, "")}`} className="hover:text-white">
            {event.whatsapp}
          </a>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="w-full px-6 md:px-8 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <a href="/chaintrack" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm" style={{ background: "linear-gradient(135deg, #2563EB, #1E40AF)" }}>CT</div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide">ChainTrack</div>
            <div className="text-slate-500 text-xs">buy.chaintrack.com</div>
          </div>
        </a>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <button onClick={() => scrollTo("inventory")} className="hidden md:inline hover:text-white transition-colors">Inventory</button>
          <button onClick={() => scrollTo("how-it-works")} className="hidden md:inline hover:text-white transition-colors">How It Works</button>
          <button onClick={() => scrollTo("bid-form")} className="hidden md:inline hover:text-white transition-colors">Submit Bid</button>
          <button
            onClick={() => scrollTo("bid-form")}
            className="px-4 py-2 rounded text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2563EB" }}
          >
            Submit Reverse Bid →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="w-full px-6 md:px-8 py-16" style={{ background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#60A5FA" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
            {event.campaignName}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
            Submit Your Price<br />
            <span style={{ color: "#60A5FA" }}>Before Friday</span>
          </h1>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {event.description}
          </p>

          {/* Countdown */}
          <div className="inline-flex flex-col items-center mb-10">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Bidding closes in</div>
            <div className="flex items-center gap-3 md:gap-4">
              <CountdownUnit value={countdown.days} label="Days" />
              <span className="text-slate-600 text-2xl font-light mb-4">:</span>
              <CountdownUnit value={countdown.hours} label="Hours" />
              <span className="text-slate-600 text-2xl font-light mb-4">:</span>
              <CountdownUnit value={countdown.minutes} label="Mins" />
              <span className="text-slate-600 text-2xl font-light mb-4">:</span>
              <CountdownUnit value={countdown.seconds} label="Secs" />
            </div>
            <div className="mt-3 text-xs text-slate-500">Closing Friday at 18:00 Dubai Time (UTC+4)</div>
          </div>

          {/* Live bid counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-sm font-semibold text-white">
              <AnimatedBidCount count={totalBidCount} />
              <span className="text-slate-400 font-normal ml-1">
                {totalBidCount === 1 ? "buyer competing" : "buyers competing"} · live
              </span>
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("bid-form")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
            >
              Submit Your Bid
            </button>
            <button
              onClick={() => scrollTo("inventory")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold transition-all hover:bg-slate-800"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8" }}
            >
              View Available Inventory
            </button>
          </div>
        </div>
      </section>

      {/* ── Inventory ── */}
      <section id="inventory" className="px-6 md:px-8 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Current Available Stock</h2>
              <p className="text-slate-400 text-sm mt-1">Reference prices shown — submit your target purchase price below</p>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-white">{totalQty} <span className="text-slate-400 text-base font-normal">Units Total</span></div>
              <div className="text-xs text-slate-500 mt-1">USA Origin · New Sealed</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stockItems.map((item) => {
              const hex = COLOR_HEX[item.color] || "#64748B";
              const bidDemand = event.demand?.[item.color];
              const requested = bidDemand?.totalQty || item.requested || 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-5 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border-2 flex-shrink-0"
                      style={{ background: hex, borderColor: "rgba(255,255,255,0.2)" }} />
                    <div>
                      <div className="text-white font-semibold text-sm">{item.model}</div>
                      <div className="text-slate-400 text-xs">{item.color}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="text-slate-500 text-xs uppercase tracking-wide">Quantity</div>
                      <div className="text-white font-bold mt-0.5">{item.qty} <span className="text-slate-400 font-normal text-xs">units</span></div>
                    </div>
                    <div className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="text-slate-500 text-xs uppercase tracking-wide">Ref. Price</div>
                      <div className="text-white font-bold mt-0.5">USD {item.refPriceUsd.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
                      ● Accepting Bids
                    </span>
                    <span className="text-xs text-slate-500">{requested} qty bid</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Live Demand Meter */}
          <div className="mt-6 rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Live Demand Meter</h3>
              <span className="text-xs text-slate-500">Updates from submitted bids · refreshes every 30s</span>
            </div>
            <div className="space-y-4">
              {stockItems.map((item) => {
                const hex = COLOR_HEX[item.color] || "#64748B";
                const bidDemand = event.demand?.[item.color];
                const requested = bidDemand?.totalQty || item.requested || 0;
                return (
                  <div key={item.id}>
                    <div className="flex items-center justify-between mb-1.5 text-sm">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full inline-block border"
                          style={{ background: hex, borderColor: "rgba(255,255,255,0.2)" }} />
                        {item.color}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {item.qty} available · <span className="text-blue-400 font-medium">{requested} requested</span>
                      </span>
                    </div>
                    <DemandBar available={item.qty} requested={requested} color={hex} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="px-6 md:px-8 py-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-slate-400 mb-10">Six steps from bid to allocation offer</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-0">
            {[
              { n: "01", title: "Select Inventory", desc: "Choose model & colour variant" },
              { n: "02", title: "Enter Quantity", desc: "Units your business needs" },
              { n: "03", title: "Submit Target Price", desc: "Your target USD per unit" },
              { n: "04", title: "Demand Aggregated", desc: "ChainTrack consolidates demand" },
              { n: "05", title: "Supplier Reviews", desc: "Bids reviewed after Friday" },
              { n: "06", title: "Allocation Offer", desc: "Accepted buyers receive offer" },
            ].map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-center text-center md:px-3">
                {i < 5 && (
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-px"
                    style={{ background: "rgba(37,99,235,0.3)" }} />
                )}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-blue-400 mb-3 z-10 relative"
                  style={{ background: "#0D1525", border: "2px solid rgba(37,99,235,0.5)" }}>
                  {s.n}
                </div>
                <div className="text-white text-xs font-semibold mb-1">{s.title}</div>
                <div className="text-slate-500 text-xs leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bid Form ── */}
      <section id="bid-form" className="px-6 md:px-8 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Submit Your Reverse Bid</h2>
            <p className="text-slate-400 text-sm">Submission does not guarantee allocation. ChainTrack will contact you after the Friday deadline.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-10 text-center"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <div className="text-white font-bold text-xl mb-2">Bid Submitted</div>
              <div className="text-slate-400 text-sm max-w-sm mx-auto">
                Your requirement has been received. ChainTrack will review allocations after Friday 18:00 Dubai Time and contact you directly via WhatsApp or email.
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a href={`https://wa.me/${event.whatsapp?.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium"
                  style={{ background: "#25D366" }}>
                  <SiWhatsapp className="w-4 h-4" /> WhatsApp us
                </a>
                <a href={`https://${event.telegram}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium"
                  style={{ background: "#229ED9" }}>
                  <SiTelegram className="w-4 h-4" /> Telegram
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Company Name", key: "companyName", placeholder: "Your trading company" },
                  { label: "Contact Name", key: "contactName", placeholder: "Full name" },
                  { label: "WhatsApp Number", key: "whatsapp", placeholder: "+971 50 XXX XXXX" },
                  { label: "Email Address", key: "email", placeholder: "procurement@company.com", type: "email" },
                ].map(({ label, key, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">{label} *</label>
                    <input
                      type={type || "text"}
                      required
                      placeholder={placeholder}
                      value={(form as any)[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Country *</label>
                  <select required value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.country ? "white" : "#475569" }}>
                    <option value="" disabled>Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c} style={{ background: "#1E293B", color: "white" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Model Required *</label>
                  <select required value={form.modelRequired} onChange={e => {
                    const sel = stockItems.find(i => `${i.model} — ${i.color}` === e.target.value);
                    setForm(f => ({ ...f, modelRequired: e.target.value, preferredColor: sel?.color || "" }));
                  }}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.modelRequired ? "white" : "#475569" }}>
                    <option value="" disabled>Select model</option>
                    {stockItems.map(i => (
                      <option key={i.id} value={`${i.model} — ${i.color}`} style={{ background: "#1E293B", color: "white" }}>
                        {i.model} — {i.color}
                      </option>
                    ))}
                    <option value="Any Available" style={{ background: "#1E293B", color: "white" }}>Any Available</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Quantity Required *</label>
                  <input type="number" required min="1" placeholder="e.g. 50"
                    value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Target Unit Price (USD) *</label>
                  <input type="number" required min="1" placeholder="e.g. 1100"
                    value={form.targetPrice} onChange={e => setForm(f => ({ ...f, targetPrice: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Destination Country *</label>
                  <select required value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.destination ? "white" : "#475569" }}>
                    <option value="" disabled>Destination</option>
                    {COUNTRIES.map(c => <option key={c} value={c} style={{ background: "#1E293B", color: "white" }}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Additional Notes</label>
                <textarea placeholder="Preferred incoterms, shipping requirements, or any other information..."
                  value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.acknowledged}
                  onChange={e => setForm(f => ({ ...f, acknowledged: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-blue-500" />
                <span className="text-sm text-slate-400 leading-snug">
                  I understand that submission of a bid does not guarantee allocation. ChainTrack will contact me with the outcome after the Friday deadline.
                </span>
              </label>

              <button type="submit"
                disabled={!form.acknowledged || submitBid.isPending}
                className="w-full py-4 rounded-lg font-semibold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: form.acknowledged ? "linear-gradient(135deg, #2563EB, #1D4ED8)" : "#1E2A3A" }}>
                {submitBid.isPending ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Reverse Bid <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Market Advantage ── */}
      <section className="px-6 md:px-8 py-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(37,99,235,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Let Suppliers Compete For Your Business</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Traditional procurement requires buyers to continuously monitor supplier portals and auctions. ChainTrack allows buyers to submit one requirement and receive supplier responses through a centralised sourcing process.
              </p>
              <div className="space-y-2.5">
                {["Save procurement time", "Access multiple suppliers", "Submit your target price", "Reduce sourcing uncertainty", "Centralised negotiations", "Export logistics support"].map(b => (
                  <div key={b} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(16,185,129,0.15)" }}>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Building2, title: "Dubai-Based", desc: "Trade facilitation from the UAE's premier electronics hub" },
                { Icon: Shield, title: "Independent", desc: "Sourcing support with no supplier-side commission conflicts" },
                { Icon: Globe, title: "Supplier Network", desc: "Relationships with vetted global electronics suppliers" },
                { Icon: TrendingUp, title: "Export Logistics", desc: "International logistics and clearance experience" },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Icon className="w-6 h-6 text-blue-400 mb-2" />
                  <div className="text-white text-sm font-semibold mb-1">{title}</div>
                  <div className="text-slate-500 text-xs leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Deadline Banner ── */}
      <section className="px-6 md:px-8 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0D1525" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-5">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-slate-600 text-2xl font-light mb-4">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="text-slate-600 text-2xl font-light mb-4">:</span>
            <CountdownUnit value={countdown.minutes} label="Mins" />
            <span className="text-slate-600 text-2xl font-light mb-4">:</span>
            <CountdownUnit value={countdown.seconds} label="Secs" />
          </div>
          <div className="text-white font-semibold text-lg mb-2">Bidding closes Friday at 18:00 Dubai Time</div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Supplier allocation decisions reviewed after the deadline. Late submissions may not be considered.</p>
          <button onClick={() => scrollTo("bid-form")}
            className="mt-6 px-8 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
            Submit Reverse Bid →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-8 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080C17" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded flex items-center justify-center text-white font-black text-xs"
              style={{ background: "linear-gradient(135deg, #2563EB, #1E40AF)" }}>CT</div>
            <div>
              <div className="text-white font-semibold text-sm">ChainTrack Procurement Network</div>
              <div className="text-slate-500 text-xs">Dubai, UAE · buy.chaintrack.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href={`https://wa.me/${event.whatsapp?.replace(/\D/g, "")}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium"
              style={{ background: "#25D366" }}>
              <SiWhatsapp className="w-4 h-4" /> {event.whatsapp}
            </a>
            <a href={`https://${event.telegram}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium"
              style={{ background: "#229ED9" }}>
              <SiTelegram className="w-4 h-4" /> Telegram
            </a>
          </div>
        </div>
      </footer>

      {/* ── Sticky Footer CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{ background: "#0D1525", borderTop: "1px solid rgba(37,99,235,0.3)" }}>
        <div className="text-sm text-slate-400 hidden sm:block flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-400 font-semibold tabular-nums"><AnimatedBidCount count={totalBidCount} /></span>
            <span>{totalBidCount === 1 ? "buyer" : "buyers"} competing</span>
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-white font-medium">{totalQty} units · Closes Friday 18:00 Dubai</span>
        </div>
        <button onClick={() => scrollTo("bid-form")}
          className="ml-auto px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
          Submit Reverse Bid →
        </button>
      </div>
      <div className="h-16" />
    </div>
  );
}
