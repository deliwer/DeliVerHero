import { useState, useEffect } from "react";

const DEADLINE = new Date("2025-06-20T14:00:00Z"); // Friday 18:00 Dubai (UTC+4) = 14:00 UTC

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

const INVENTORY = [
  { id: "silver", model: "iPhone 17 Pro Max 256GB", color: "Desert Silver", qty: 84, refPrice: 1200, requested: 32, status: "Accepting Bids", hex: "#C0C0C0" },
  { id: "blue",   model: "iPhone 17 Pro Max 256GB", color: "Deep Blue",     qty: 67, refPrice: 1170, requested: 45, status: "Accepting Bids", hex: "#1E3A5F" },
  { id: "orange", model: "iPhone 17 Pro Max 256GB", color: "Cosmic Orange", qty: 53, refPrice: 1160, requested: 21, status: "Accepting Bids", hex: "#D4631A" },
];

const TOTAL_QTY = INVENTORY.reduce((s, i) => s + i.qty, 0);

const COUNTRIES = [
  "UAE", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman",
  "Pakistan", "India", "Kazakhstan", "Russia", "Ukraine", "Egypt",
  "Nigeria", "Kenya", "UK", "Germany", "USA", "Other",
];

const MODELS = INVENTORY.map(i => `${i.model} — ${i.color}`);

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 flex items-center justify-center rounded-lg text-3xl font-bold font-mono text-white"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

function DemandBar({ available, requested, color }: { available: number; requested: number; color: string }) {
  const pct = Math.min(100, Math.round((requested / available) * 100));
  return (
    <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function ReverseAuctionPortal() {
  const countdown = useCountdown(DEADLINE);
  const [form, setForm] = useState({
    companyName: "", contactName: "", whatsapp: "", country: "", email: "",
    model: "", quantity: "", targetPrice: "", destination: "", notes: "",
    acknowledged: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeInventory, setActiveInventory] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acknowledged) return;
    setSubmitted(true);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const isDeadlinePassed = (countdown.days + countdown.hours + countdown.minutes + countdown.seconds) === 0;

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0E1A" }}>
      
      {/* ── Top Bar ── */}
      <div className="w-full px-6 py-2 flex items-center justify-between text-xs" style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live Event Active
          </span>
          <span className="text-slate-600">|</span>
          <span>ChainTrack Procurement Network — Dubai, UAE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>WhatsApp: +971 52 394 6311</span>
          <span className="text-slate-600">|</span>
          <a href="#" className="text-blue-400 hover:text-blue-300">t.me/chaintracklogistics</a>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="w-full px-8 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm" style={{ background: "linear-gradient(135deg, #2563EB, #1E40AF)" }}>
            CT
          </div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide">ChainTrack</div>
            <div className="text-slate-500 text-xs">buy.chaintrack.com</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <button onClick={() => scrollTo("inventory")} className="hover:text-white transition-colors">Inventory</button>
          <button onClick={() => scrollTo("how")} className="hover:text-white transition-colors">How It Works</button>
          <button onClick={() => scrollTo("bid-form")} className="hover:text-white transition-colors">Submit Bid</button>
          <div className="w-px h-4 bg-slate-700" />
          <button
            onClick={() => scrollTo("bid-form")}
            className="px-4 py-2 rounded text-sm font-semibold text-white transition-all"
            style={{ background: "#2563EB" }}
          >
            Submit Reverse Bid →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="w-full px-8 py-16" style={{ background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#60A5FA" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
            USA iPhone 17 Pro Max — Reverse Bidding Event
          </div>

          <h1 className="text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
            Submit Your Price<br />
            <span style={{ color: "#60A5FA" }}>Before Friday</span>
          </h1>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Available USA inventory is being allocated this week. Submit your quantity requirement and target purchase price. ChainTrack will aggregate demand and negotiate allocations with the supplier.
          </p>

          {/* Countdown */}
          <div className="inline-flex flex-col items-center mb-10">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Bidding closes in</div>
            <div className="flex items-center gap-4">
              <CountdownBlock value={countdown.days} label="Days" />
              <span className="text-slate-600 text-2xl font-light mb-4">:</span>
              <CountdownBlock value={countdown.hours} label="Hours" />
              <span className="text-slate-600 text-2xl font-light mb-4">:</span>
              <CountdownBlock value={countdown.minutes} label="Minutes" />
              <span className="text-slate-600 text-2xl font-light mb-4">:</span>
              <CountdownBlock value={countdown.seconds} label="Seconds" />
            </div>
            <div className="mt-3 text-xs text-slate-500">Closing Friday at 18:00 Dubai Time (UTC+4)</div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("bid-form")}
              className="px-8 py-3.5 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
            >
              Submit Your Bid
            </button>
            <button
              onClick={() => scrollTo("inventory")}
              className="px-8 py-3.5 rounded-lg font-semibold transition-all hover:bg-slate-700"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8" }}
            >
              View Available Inventory
            </button>
          </div>
        </div>
      </section>

      {/* ── Inventory ── */}
      <section id="inventory" className="px-8 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Current Available Stock</h2>
              <p className="text-slate-400 text-sm mt-1">Reference prices shown — submit your target purchase price below</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{TOTAL_QTY} <span className="text-slate-400 text-base font-normal">Units Total</span></div>
              <div className="text-xs text-slate-500 mt-1">USA Origin · New Sealed</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {INVENTORY.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveInventory(activeInventory === item.id ? null : item.id)}
                className="rounded-xl p-5 cursor-pointer transition-all"
                style={{
                  background: activeInventory === item.id ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeInventory === item.id ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 flex-shrink-0" style={{ background: item.hex }} />
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
                    <div className="text-white font-bold mt-0.5">USD {item.refPrice.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
                    ● {item.status}
                  </span>
                  <span className="text-xs text-slate-500">{item.requested} bids submitted</span>
                </div>
              </div>
            ))}
          </div>

          {/* Demand Meter */}
          <div className="mt-6 rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Live Demand Meter</h3>
              <span className="text-xs text-slate-500">Updates from submitted bids</span>
            </div>
            <div className="space-y-4">
              {INVENTORY.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ background: item.hex }} />
                      {item.color}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {item.qty} available · <span className="text-blue-400 font-medium">{item.requested} requested</span>
                    </span>
                  </div>
                  <DemandBar available={item.qty} requested={item.requested} color={item.hex} />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>0 units</span>
                    <span>{item.qty} units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how" className="px-8 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-slate-400 mb-10">Six steps from bid submission to allocation offer</p>
          <div className="grid grid-cols-6 gap-0">
            {[
              { step: "01", title: "Select Inventory", desc: "Choose the model and colour variant you want" },
              { step: "02", title: "Enter Quantity", desc: "Specify how many units your business requires" },
              { step: "03", title: "Submit Target Price", desc: "Enter your target unit purchase price in USD" },
              { step: "04", title: "Demand Aggregated", desc: "ChainTrack consolidates all buyer requirements" },
              { step: "05", title: "Supplier Reviews", desc: "Bids reviewed by supplier after Friday deadline" },
              { step: "06", title: "Allocation Offer", desc: "Accepted buyers receive allocation + logistics support" },
            ].map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center px-3">
                {i < 5 && (
                  <div className="absolute top-5 left-1/2 w-full h-px" style={{ background: "rgba(37,99,235,0.3)" }} />
                )}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-blue-400 mb-3 z-10 relative" style={{ background: "#0D1525", border: "2px solid rgba(37,99,235,0.5)" }}>
                  {s.step}
                </div>
                <div className="text-white text-xs font-semibold mb-1 leading-tight">{s.title}</div>
                <div className="text-slate-500 text-xs leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bid Form ── */}
      <section id="bid-form" className="px-8 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Submit Your Reverse Bid</h2>
            <p className="text-slate-400 text-sm">Submission does not guarantee allocation. ChainTrack will contact you with results after the Friday deadline.</p>
          </div>

          {submitted ? (
            <div className="rounded-xl p-10 text-center" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.15)" }}>
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="text-white font-bold text-xl mb-2">Bid Submitted</div>
              <div className="text-slate-400 text-sm max-w-sm mx-auto">Your requirement has been received. ChainTrack will review allocations after Friday 18:00 Dubai Time and contact you directly.</div>
              <div className="mt-4 text-xs text-slate-500">For urgent enquiries: WhatsApp +971 52 394 6311</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
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

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Country *</label>
                  <select
                    required
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.country ? "white" : "#475569" }}
                  >
                    <option value="" disabled>Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c} style={{ background: "#1E293B", color: "white" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Model Required *</label>
                  <select
                    required
                    value={form.model}
                    onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.model ? "white" : "#475569" }}
                  >
                    <option value="" disabled>Select model</option>
                    {MODELS.map(m => <option key={m} value={m} style={{ background: "#1E293B", color: "white" }}>{m}</option>)}
                    <option value="Any" style={{ background: "#1E293B", color: "white" }}>Any Available</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Quantity Required *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 50"
                    value={form.quantity}
                    onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Target Unit Price (USD) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1100"
                    value={form.targetPrice}
                    onChange={e => setForm(f => ({ ...f, targetPrice: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Destination Country *</label>
                  <select
                    required
                    value={form.destination}
                    onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: form.destination ? "white" : "#475569" }}
                  >
                    <option value="" disabled>Select destination</option>
                    {COUNTRIES.map(c => <option key={c} value={c} style={{ background: "#1E293B", color: "white" }}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Additional Notes</label>
                <textarea
                  placeholder="Preferred incoterms, shipping requirements, or any other relevant information..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acknowledged}
                  onChange={e => setForm(f => ({ ...f, acknowledged: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 rounded accent-blue-500 flex-shrink-0"
                />
                <span className="text-sm text-slate-400 leading-snug">
                  I understand that submission of a bid does not guarantee allocation. ChainTrack will contact me with the outcome after the Friday deadline.
                </span>
              </label>

              <button
                type="submit"
                disabled={!form.acknowledged}
                className="w-full py-4 rounded-lg font-semibold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: form.acknowledged ? "linear-gradient(135deg, #2563EB, #1D4ED8)" : "#1E2A3A" }}
              >
                Submit Reverse Bid →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Market Advantage ── */}
      <section className="px-8 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(37,99,235,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Let Suppliers Compete For Your Business</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Traditional procurement requires buyers to continuously monitor supplier portals and auctions. ChainTrack allows buyers to submit one requirement and receive supplier responses through a centralised sourcing process.
              </p>
              <div className="space-y-2.5">
                {[
                  "Save procurement time",
                  "Access multiple suppliers",
                  "Submit your target price",
                  "Reduce sourcing uncertainty",
                  "Centralised negotiations",
                  "Export logistics support",
                ].map(b => (
                  <div key={b} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)" }}>
                      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏢", title: "Dubai-Based", desc: "Trade facilitation from the UAE's premier electronics hub" },
                { icon: "🔍", title: "Independent", desc: "Sourcing support with no supplier-side commission conflicts" },
                { icon: "🤝", title: "Supplier Network", desc: "Relationships with vetted global electronics suppliers" },
                { icon: "🚢", title: "Export Logistics", desc: "International logistics and clearance experience" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-white text-sm font-semibold mb-1">{title}</div>
                  <div className="text-slate-500 text-xs leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Deadline Banner ── */}
      <section className="px-8 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0D1525" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-slate-500 text-xs uppercase tracking-widest mb-4">Bid Deadline</div>
          <div className="flex items-center justify-center gap-4 mb-5">
            <CountdownBlock value={countdown.days} label="Days" />
            <span className="text-slate-600 text-2xl font-light mb-4">:</span>
            <CountdownBlock value={countdown.hours} label="Hours" />
            <span className="text-slate-600 text-2xl font-light mb-4">:</span>
            <CountdownBlock value={countdown.minutes} label="Minutes" />
            <span className="text-slate-600 text-2xl font-light mb-4">:</span>
            <CountdownBlock value={countdown.seconds} label="Seconds" />
          </div>
          <div className="text-white font-semibold text-lg mb-2">Reverse bidding closes Friday at 18:00 Dubai Time</div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Supplier allocation decisions will be reviewed after the deadline. Late submissions may not be considered.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-8 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080C17" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded flex items-center justify-center text-white font-black text-xs" style={{ background: "linear-gradient(135deg, #2563EB, #1E40AF)" }}>CT</div>
            <div>
              <div className="text-white font-semibold text-sm">ChainTrack Procurement Network</div>
              <div className="text-slate-500 text-xs">Dubai, UAE · buy.chaintrack.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://wa.me/971523946311" className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium" style={{ background: "#25D366" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.107 1.523 5.823L.057 23.882l6.22-1.427C7.886 23.434 9.9 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.518-5.176-1.418l-.37-.22-3.846.881.948-3.77-.24-.383A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              +971 52 394 6311
            </a>
            <a href="https://t.me/chaintracklogistics" className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium" style={{ background: "#229ED9" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </a>
          </div>
        </div>
      </footer>

      {/* ── Sticky Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-8 py-3 flex items-center justify-between" style={{ background: "#0D1525", borderTop: "1px solid rgba(37,99,235,0.3)" }}>
        <div className="text-sm text-slate-400">
          Ready to submit your requirement?
          <span className="ml-2 text-white font-medium">{TOTAL_QTY} units available · Closes Friday 18:00 Dubai</span>
        </div>
        <button
          onClick={() => scrollTo("bid-form")}
          className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
        >
          Submit Reverse Bid →
        </button>
      </div>

      <div className="h-16" /> {/* Spacer for sticky bar */}
    </div>
  );
}
