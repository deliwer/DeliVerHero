import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SmartChannelCTA, ChannelStatusBar } from "@/components/smart-channel-cta";
import { 
  LogOut,
  MessageCircle,
  CheckCircle2,
  Home,
  ArrowRight,
  Calculator,
  TrendingDown,
  TrendingUp,
  BarChart3,
  MapPin,
  AlertTriangle,
  Radio,
  ShieldCheck,
  Building2,
  Key,
  Waves,
} from "lucide-react";
import { motion } from "framer-motion";
import { SiTelegram } from "react-icons/si";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import NicoleImg from "@assets/Nicole_Oliver.jpeg";
import BeckyImg from "@assets/Becky_Choi_1776889041274.jpeg";
import { useEffect, useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { RelocationFunnel, FunnelScenario } from "@/components/relocation-funnel";
import { FindAHomeBanner } from "@/components/find-a-home-banner";

const HERO_LIFESTYLE_IMG = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80";

const lifestyleImages = {
  moveIn: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80",
  moveOut: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  brokers: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
  tenants: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  landlords: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  process: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  justGotKeys: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  finalCTA: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
};

const DUBAI_BENCHMARKS = [
  { area: "Dubai Marina",          min: 8000,  max: 12000 },
  { area: "Business Bay",          min: 7500,  max: 11000 },
  { area: "JVC",                   min: 4500,  max: 7000  },
  { area: "Downtown Dubai",        min: 10000, max: 16000 },
  { area: "Deira",                 min: 3500,  max: 6000  },
  { area: "Al Barsha",             min: 4000,  max: 7000  },
  { area: "JLT",                   min: 5500,  max: 8500  },
  { area: "Dubai Hills Estate",    min: 7000,  max: 10000 },
  { area: "International City",    min: 2500,  max: 4000  },
  { area: "Palm Jumeirah",         min: 12000, max: 20000 },
  { area: "Silicon Oasis",         min: 3500,  max: 5500  },
  { area: "Mirdif",                min: 4000,  max: 6500  },
  { area: "Bur Dubai",             min: 3500,  max: 6000  },
  { area: "Al Nahda",              min: 3000,  max: 5500  },
  { area: "Karama",                min: 3500,  max: 6000  },
  { area: "Al Furjan",             min: 5000,  max: 8000  },
  { area: "Motor City",            min: 4500,  max: 7000  },
  { area: "Sports City",           min: 4000,  max: 6500  },
];

export default function LandingPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelScenario, setFunnelScenario] = useState<FunnelScenario | undefined>(undefined);
  const [calcRent, setCalcRent] = useState("");
  const [calcDistrict, setCalcDistrict] = useState("");
  const [calcEmail, setCalcEmail] = useState("");
  const [calcSubmitting, setCalcSubmitting] = useState(false);
  const [calcSubmitted, setCalcSubmitted] = useState(false);

  const openFunnel = (scenario?: FunnelScenario) => {
    setFunnelScenario(scenario);
    setFunnelOpen(true);
  };

  const submitRentAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcEmail || !calcRent || !calcDistrict) return;
    setCalcSubmitting(true);
    try {
      const bm = DUBAI_BENCHMARKS.find(d => d.area === calcDistrict);
      const overpayEstimate = bm ? Math.max(0, Math.round(parseFloat(calcRent) - bm.max)) : undefined;
      await fetch("/api/rent-analysis-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: calcEmail,
          district: calcDistrict,
          monthlyRent: Math.round(parseFloat(calcRent)),
          overpayEstimate,
        }),
      });
      setCalcSubmitted(true);
    } catch {
      setCalcSubmitted(true);
    } finally {
      setCalcSubmitting(false);
    }
  };

  const getCalcResult = () => {
    const rent = parseFloat(calcRent) || 0;
    const bm = DUBAI_BENCHMARKS.find(d => d.area === calcDistrict);
    if (!rent || !bm) return null;
    if (rent > bm.max * 1.05) {
      const overpay = Math.round(rent - bm.max);
      return {
        overpaying: true,
        message: `Market range for ${bm.area}: AED ${bm.min.toLocaleString()}–${bm.max.toLocaleString()}/mo. You may be overpaying ~AED ${overpay.toLocaleString()}/mo — that's AED ${Math.round(overpay * 12 / 1000)}K/year.`
      };
    }
    if (rent < bm.min * 0.95) {
      return {
        overpaying: false,
        message: `You're below market for ${bm.area} (AED ${bm.min.toLocaleString()}–${bm.max.toLocaleString()}/mo). Strong position — negotiate your renewal from strength.`
      };
    }
    return {
      overpaying: false,
      message: `You're within market range for ${bm.area} (AED ${bm.min.toLocaleString()}–${bm.max.toLocaleString()}/mo). Still worth RERA-checking before your next renewal.`
    };
  };
  const calcResult = getCalcResult();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="DeliWer | Move-In Concierge, Ejari, DEWA & Flex Living — Dubai"
        description="DeliWer is Dubai's all-in-one move-in platform. We coordinate Ejari registration, DEWA activation, movers, cleaning, internet, and flexible monthly rooms — all via one WhatsApp. No annual contract on rooms. No complicated forms. Every Dubai area."
        canonical="https://www.deliwer.com/"
        keywords="move in Dubai, Ejari registration Dubai, DEWA activation Dubai, flex living Dubai, monthly rooms Dubai no annual contract, Dubai relocation services, Dubai expat services, home setup Dubai, moving to Dubai, room for rent Dubai monthly, DeliWer Dubai"
        webPageType="WebPage"
        breadcrumbs={[]}
        faqs={[
          { question: "What does DeliWer do?", answer: "DeliWer is Dubai's all-in-one move-in and relocation platform. We coordinate Ejari registration through RERA-authorized Trustee Centers, DEWA activation, professional movers, cleaning, internet setup, water filtration, and flexible monthly accommodation — all via WhatsApp. One contact, no complicated forms." },
          { question: "How much does Ejari registration cost in Dubai?", answer: "The official RERA Ejari registration fee is AED 220 including VAT. DeliWer coordinates the full process — document collection, submission, and digital delivery — so you never have to visit a Trustee Center yourself." },
          { question: "Can I find a monthly room in Dubai without an annual contract?", answer: "Yes. DeliWer's Flex Living service offers rooms, shared villas, studios, and bed spaces in Dubai on a month-to-month basis with no annual contract. Prices from AED 550/month. Available in JVC, Al Barsha, Deira, International City, and more." },
          { question: "How do I start with DeliWer?", answer: "WhatsApp DeliWer at +971523906019. Tell us what you need — Ejari, DEWA, movers, a monthly room, or business setup — and we'll coordinate everything on your behalf. Most requests receive a response within minutes." },
          { question: "What areas of Dubai does DeliWer cover?", answer: "DeliWer covers all Dubai areas including JVC, Dubai Marina, Business Bay, Downtown Dubai, Al Barsha, Al Nahda, Deira, JLT, Dubai Hills, Palm Jumeirah, International City, Karama, Bur Dubai, Mirdif, Silicon Oasis, Al Furjan, and 35+ more neighbourhoods." },
          { question: "Does DeliWer help with business setup in Dubai?", answer: "Yes. DeliWer coordinates Dubai Free Zone and mainland company formation, PRO services, trade license applications, visa assistance, and document clearing. Popular options include DAFZA, Dubai South, and IFZA Free Zones." },
        ]}
        dateModified="2026-05-25"
      />
      {/* ============================================
          MAIN HERO — Are You Overpaying Rent?
         ============================================ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pb-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_LIFESTYLE_IMG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.92] text-white">
              Are You{" "}
              <span className="text-violet-400" style={{ textShadow: "0 0 32px rgba(139,92,246,0.4)" }}>
                Overpaying Rent
              </span>
              {" "}in Dubai?
            </h1>
            <p className="text-base text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
              Rents shifted 18–35% in 2024. We benchmark your contract against RERA and find your cheapest legal move — free.
            </p>

            {/* Google reviews ribbon */}
            <Link href="/reviews" data-testid="link-hero-reviews">
              <div className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 rounded-full px-3 py-1.5 transition-all cursor-pointer group">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-2.5 h-2.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <span className="text-white font-black text-xs">5.0</span>
                <span className="text-gray-600 text-xs">·</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider group-hover:text-gray-300 transition-colors">Verified Google Reviews</span>
              </div>
            </Link>
          </motion.div>

          {/* RERA Rent Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <div className="bg-white/5 border border-violet-500/20 rounded-xl p-4 space-y-3 text-left">
              <div className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[9px] font-black uppercase tracking-wider text-violet-400">RERA Rent Checker — Is Your Rent Fair?</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">Monthly rent (AED)</label>
                  <input
                    type="number"
                    value={calcRent}
                    onChange={(e) => setCalcRent(e.target.value)}
                    placeholder="e.g. 8500"
                    className="w-full bg-white/5 border border-white/10 focus:border-violet-500/50 rounded-lg px-3 py-2 text-white font-bold text-sm placeholder-gray-600 focus:outline-none transition-colors"
                    data-testid="input-calc-rent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">Your area</label>
                  <select
                    value={calcDistrict}
                    onChange={(e) => setCalcDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 focus:border-violet-500/50 rounded-lg px-3 py-2 text-white font-bold text-sm focus:outline-none transition-colors"
                    data-testid="select-calc-district"
                  >
                    <option value="">Select area…</option>
                    {DUBAI_BENCHMARKS.map(d => (
                      <option key={d.area} value={d.area}>{d.area}</option>
                    ))}
                  </select>
                </div>
              </div>

              {calcResult ? (
                <div className={`rounded-lg border transition-all ${calcResult.overpaying ? "bg-red-500/10 border-red-500/25" : "bg-emerald-500/10 border-emerald-500/25"}`}>
                  <div className="p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-wider mb-1 ${calcResult.overpaying ? "text-red-400" : "text-emerald-400"}`}>
                        {calcResult.overpaying ? "⚠ Potential Overpayment Detected" : "✓ Within Market Range"}
                      </p>
                      <p className="text-white/80 font-medium text-xs leading-relaxed">{calcResult.message}</p>
                    </div>
                    <a
                      href={`https://wa.me/971523906019?text=I'm paying AED ${calcRent}/mo in ${calcDistrict}. Is this fair? I want a free rent analysis.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg px-3 py-2 transition-colors whitespace-nowrap"
                      data-testid="link-calc-whatsapp"
                    >
                      {calcResult.overpaying ? "Fix It →" : "Chat →"}
                    </a>
                  </div>
                  {calcResult.overpaying && (
                    <div className="border-t border-red-500/15 px-3 pb-3 pt-2">
                      {calcSubmitted ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <p className="text-emerald-400 text-[11px] font-bold">Report saved — advisor will reach out within 24 hrs.</p>
                        </div>
                      ) : (
                        <form onSubmit={submitRentAnalysis} className="flex gap-2">
                          <input
                            type="email"
                            value={calcEmail}
                            onChange={(e) => setCalcEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="flex-1 min-w-0 bg-white/5 border border-white/10 focus:border-violet-500/50 rounded-lg px-3 py-2 text-white text-xs font-bold placeholder-gray-600 focus:outline-none transition-colors"
                            data-testid="input-calc-email"
                          />
                          <button
                            type="submit"
                            disabled={calcSubmitting}
                            className="shrink-0 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-[10px] font-black uppercase tracking-wider rounded-lg px-3 py-2 transition-colors whitespace-nowrap"
                            data-testid="btn-calc-save"
                          >
                            {calcSubmitting ? "Saving…" : "Get Free Report"}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest text-center">
                  18 Dubai areas · RERA market rates · Zero DeliWer fee
                </p>
              )}
            </div>
          </motion.div>

          {/* Scenario shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="grid grid-cols-4 gap-1.5 max-w-xl mx-auto w-full"
          >
            {[
              { testId: "funnel-btn-moving-in", onClick: () => openFunnel("moving-in"), icon: <Home className="w-3.5 h-3.5" />, label: "Moving In", sub: "Ejari, DEWA", color: "border-emerald-500/25 hover:border-emerald-500/60", iconBg: "bg-emerald-500/10 text-emerald-400" },
              { testId: "funnel-btn-moving-within", onClick: () => openFunnel("moving-within"), icon: <TrendingDown className="w-3.5 h-3.5" />, label: "Cheaper Rent", sub: "Relocate", color: "border-blue-500/25 hover:border-blue-500/60", iconBg: "bg-blue-500/10 text-blue-400" },
              { testId: "funnel-btn-leaving", onClick: () => openFunnel("leaving"), icon: <LogOut className="w-3.5 h-3.5" />, label: "Leaving", sub: "From 900 AED", color: "border-amber-500/25 hover:border-amber-500/60", iconBg: "bg-amber-500/10 text-amber-400" },
            ].map((btn) => (
              <button
                key={btn.testId}
                data-testid={btn.testId}
                onClick={btn.onClick}
                className={`group flex flex-col items-center gap-1.5 py-3 px-2 bg-white/5 border rounded-xl transition-all text-center ${btn.color}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${btn.iconBg}`}>{btn.icon}</div>
                <div>
                  <div className="font-black text-white text-[9px] uppercase tracking-tight leading-tight">{btn.label}</div>
                  <div className="text-[8px] text-gray-500 leading-tight mt-0.5">{btn.sub}</div>
                </div>
              </button>
            ))}
            <Link href="/transaction-support" data-testid="funnel-btn-just-signed">
              <div className="group flex flex-col items-center gap-1.5 py-3 px-2 bg-white/5 border border-violet-500/25 hover:border-violet-500/60 rounded-xl transition-all text-center h-full">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-violet-500/10 text-violet-400"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <div>
                  <div className="font-black text-white text-[9px] uppercase tracking-tight leading-tight">Just Signed</div>
                  <div className="text-[8px] text-gray-500 leading-tight mt-0.5">Post-deal</div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>
      <FindAHomeBanner />
      {/* ============================================
          VALUE PROP — FROM KEYS TO KETTLE IN 24 HOURS
         ============================================ */}
      <section id="how-it-works" className="relative py-14 px-6 border-b border-white/5 overflow-hidden bg-slate-950">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              One coordinator. Everything sorted.
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
              From Keys to Kettle{" "}
              <span className="text-emerald-400">in 24 Hours.</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              One message. Ejari, movers, DEWA, cleaning, water — you just show up.
            </p>
          </motion.div>

          {/* 3-step flow */}
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/8">
            {[
              { step: "01", icon: "💬", title: "Message Us", body: "Move-in date + apartment size. 60 seconds." },
              { step: "02", icon: "📋", title: "We Coordinate", body: "Vendors briefed, schedule managed." },
              { step: "03", icon: "🏠", title: "Arrive Ready", body: "Connected, clean, registered. AED 0 fee." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="bg-slate-900/80 px-4 py-5 space-y-2 flex flex-col"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/50">{s.step}</span>
                <span className="text-xl">{s.icon}</span>
                <p className="text-white font-black text-sm leading-snug">{s.title}</p>
                <p className="text-gray-500 text-xs font-medium leading-relaxed flex-1">{s.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Services + urgency — single row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {["📄 Ejari", "🚛 Movers", "⚡ DEWA", "📶 Internet", "🧹 Cleaning", "💧 Water Filter"].map((s) => (
              <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-gray-500 text-[10px] font-bold">
                {s}
              </span>
            ))}
          </div>

          {/* Just Got Keys urgency strip */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/25 px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Just received your keys?</p>
              <p className="text-white font-black text-sm leading-snug">Day 1 sorted — before you arrive.</p>
            </div>
            <Button
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg h-9 px-5 text-xs shrink-0 gap-1.5 transition-all"
              onClick={() => window.open('https://wa.me/971523906019?text=Hello%20DeliWer,%20I%20just%20received%20my%20apartment%20keys%20and%20need%20home%20setup', '_blank')}
              data-testid="button-just-got-keys"
            >
              <MessageCircle className="w-3.5 h-3.5" /> I Just Got My Keys
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-gray-700 font-bold uppercase tracking-widest">
            No hidden fees · <Link href="/concierge-pricing"><span className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">See pricing →</span></Link>
          </p>

        </div>
      </section>
      {/* FINAL CTA — SECTION 8 */}
      <section className="overflow-hidden">
        <div className="py-12 px-6 bg-slate-950 border-b border-white/5">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-2"
            >
              <div className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/25 text-violet-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Trusted by Dubai Tenants
              </div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">Ready to move into your new home?</h2>
            </motion.div>

            <div className="grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/8">
              {[
                { icon: "📍", title: "JVC, Marina, Al Nahda & more", desc: "Popular Dubai districts covered." },
                { icon: "🤝", title: "Partner network", desc: "Vetted movers, cleaners, utilities." },
                { icon: "⚡", title: "Fast response", desc: "WhatsApp reply within minutes." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="bg-slate-900/80 px-4 py-5 space-y-1.5 text-center"
                >
                  <span className="text-xl block">{item.icon}</span>
                  <h3 className="text-white font-black text-xs uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-[10px] font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Reviews */}
            <div className="space-y-5">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em]">Customer Reviews · 5.0★ on Google</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white/3 border border-violet-500/20 rounded-xl p-6 space-y-4 text-center flex flex-col items-center relative" data-testid="trust-anchor-nicole">
                  <div className="absolute top-3 right-4 flex items-center gap-1 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </div>
                  <img src={NicoleImg} alt="Nicole Oliver" data-testid="img-testimonial-nicole-landing"
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-400/30 shadow-lg shadow-violet-900/30" />
                  <div className="flex items-center justify-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-gray-300 font-medium leading-relaxed italic text-xs max-w-md">
                    "Just moved into my new place at Marina and DeliWer set up the complete water system — including a free hair shower filter! The difference is incredible. Fast, professional, zero hassle."
                  </p>
                  <div>
                    <p className="text-white font-black text-xs">Nicole Oliver</p>
                    <p className="text-gray-500 text-[10px]">Dubai Marina · Germany 🇩🇪</p>
                  </div>
                  <a href="https://g.page/r/CRptmgoZmDxSEBI/review" target="_blank" rel="noopener noreferrer"
                    data-testid="link-google-review-trust"
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-3 w-full justify-center transition-colors">
                    <svg className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    Leave a Google Review — Help others find us
                  </a>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
                {[
                  { id: "zoya-abassi", initials: "ZA", name: "Zoya Abassi", meta: "Dubai · 10 reviews", quote: "Shower filters installed smoothly and hassle-free. Water feels noticeably cleaner and gentler on skin and hair. Definitely recommend.", date: "1 week ago" },
                  { id: "becky-choi", initials: "BC", name: "Becky Choi", meta: "Dubai · Local Guide · 23 reviews", quote: "Great service and professional people.", date: "1 year ago", image: BeckyImg },
                  { id: "syed-ghayoor", initials: "SG", name: "Syed Ghayoor Hassan", meta: "Dubai · 3 reviews", quote: "Best service in town.", date: "2 years ago" },
                ].map((r) => (
                  <div key={r.id} className="bg-white/3 border border-blue-500/20 rounded-xl p-4 space-y-2.5 relative" data-testid={`landing-review-${r.id}`}>
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 text-blue-300 text-[9px] font-black uppercase tracking-widest">
                      <svg className="w-3 h-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                      Google
                    </div>
                    <div className="flex items-center gap-2.5">
                      {(r as any).image ? (
                        <img src={(r as any).image} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-blue-500/40 shadow shrink-0" data-testid={`img-landing-review-${r.id}`} />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-300 font-black text-[10px] shrink-0">{r.initials}</div>
                      )}
                      <div>
                        <p className="text-white font-black text-xs">{r.name}</p>
                        <p className="text-gray-500 text-[10px]">{r.meta}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <p className="text-gray-300 text-[11px] italic leading-relaxed">"{r.quote}"</p>
                    <p className="text-gray-600 text-[9px] uppercase tracking-widest font-black">{r.date}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Link href="/reviews" data-testid="link-see-all-reviews">
                  <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-black uppercase tracking-widest rounded-xl h-9 px-6 text-[10px]">
                    See all reviews <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* WELCOME BONUS SECTION */}
      <section className="py-12 px-6 bg-white/[0.03] border-b border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 text-[9px] font-black uppercase tracking-widest">
              🎁 The Welcome Bonus Deal
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white leading-tight">
              Welcome to your new home.{" "}
              <span className="text-amber-400">Lunch is on us.</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Start your move-in with DeliWer and unlock dining credits, partner vouchers, and welcome perks — at zero cost.
            </p>
            <div className="space-y-2">
              {[
                "Free dining credit on move-in start",
                "Partner vouchers to your WhatsApp",
                "Exclusive perks for new residents",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            <Link href="/earn" data-testid="btn-welcome-bonus">
              <Button className="bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl px-7 h-11 text-sm shadow-lg transition-all">
                Claim Your Welcome Reward →
              </Button>
            </Link>
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden border border-amber-500/15">
            <img src={lifestyleImages.justGotKeys} alt="Welcome to your new Dubai home" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-amber-500/15 backdrop-blur-sm border border-amber-500/25 rounded-lg px-3 py-2">
                <p className="text-amber-300 font-black text-xs uppercase tracking-wider">🎉 New residents get rewarded</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── WHAT DELIWER IS NOT ── */}
      <section className="py-8 px-6 bg-slate-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/[0.025] border border-white/8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-white/10 text-lg">🚫</div>
            <div className="flex-1 text-center sm:text-left space-y-3">
              <p className="text-gray-300 font-black text-sm uppercase tracking-wide">DeliWer is not a real estate agency</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1.5">
                {[
                  ["We do not", "list, sell, or rent properties"],
                  ["We do not", "hold or negotiate lease agreements"],
                  ["We do not", "act as a landlord or RERA-licensed agent"],
                  ["We do", "coordinate everything that happens after you sign"],
                ].map(([prefix, text]) => (
                  <span key={text} className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <span className={`font-black ${prefix === "We do" ? "text-emerald-400" : "text-red-400/80"}`}>{prefix}</span>
                    <span className="text-gray-500">{text}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 hidden md:flex flex-col items-end gap-1 text-right">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-700">Regulated clarity</span>
              <span className="text-[9px] text-gray-700 font-semibold">Post-deal operations only</span>
            </div>
          </div>
        </div>
      </section>
      {/* ── ADDITIONAL REAL ESTATE OFFERS ── */}
      <section className="py-10 px-6 bg-slate-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-gray-700 text-[9px] font-black uppercase tracking-[0.2em] shrink-0">Additional Offers — Not a Property Agency</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Distress Deals */}
          <div className="relative bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="shrink-0 w-12 h-12 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-center justify-center text-2xl relative z-10">🔥</div>
            <div className="flex-1 text-center sm:text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Distress Deals Available
              </div>
              <p className="text-white font-black text-sm leading-snug">Landlords offering rapid-move vacancies — Ejari, DEWA &amp; setup coordinated within 24 hrs.</p>
              <p className="text-gray-500 text-[11px] mt-1">Ask us about current availability when you start your move-in on WhatsApp. DeliWer is not a real estate agency — we coordinate what happens after the deal.</p>
            </div>
            <a
              href="https://wa.me/971523906019?text=Hi%20DeliWer%2C%20I%27d%20like%20to%20know%20about%20distress%20deal%20vacancies%20available%20now."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 relative z-10"
              data-testid="cta-distress-deals"
            >
              <Button className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl px-5 h-9 text-xs shadow-lg shadow-amber-900/30 transition-all whitespace-nowrap">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Ask on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
      {/* ── DELIWER LIFESTYLE GATEWAY ── */}
      <section className="relative py-16 px-6 overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-950 border-y border-cyan-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: copy */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                <Waves className="w-3.5 h-3.5" /> DeliWer Lifestyle
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                Beachfront Living.<br />
                <span className="text-cyan-400">Pre-Launch Prices.</span>
              </h2>
              <p className="text-slate-400 font-medium text-base max-w-md">
                Alef Linar — 325m of private beachfront on Mamzar, Sharjah.
                6 towers, 1 BR from <span className="text-white font-bold">AED 849K</span>, 30/70 payment plan.
                EOI open now — public launch coming soon.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> Beachfront</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> 30/70 Plan</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> Broker Priority</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> EOI Now Open</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/mamzar" data-testid="cta-lifestyle-gateway">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl h-12 px-8 text-sm shadow-lg shadow-cyan-900/30 transition-all">
                    <ArrowRight className="w-4 h-4 mr-2" /> Explore Alef Linar
                  </Button>
                </Link>
                <a
                  href="https://t.me/+971523946311"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="cta-lifestyle-telegram"
                >
                  <Button className="bg-sky-500 hover:bg-sky-400 text-white font-black uppercase tracking-widest rounded-2xl h-12 px-7 text-sm">
                    <SiTelegram className="w-4 h-4 mr-2" /> Telegram
                  </Button>
                </a>
                <a
                  href={`https://wa.me/971523906019?text=${encodeURIComponent("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach pre-launch.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="cta-lifestyle-whatsapp"
                >
                  <Button variant="outline" className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-black uppercase tracking-widest rounded-2xl h-12 px-7 text-sm">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                </a>
              </div>
              <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest pt-1">
                Telegram preferred for CIS · Russia · Asia · Europe
              </p>
            </div>

            {/* Right: stats card */}
            <div className="bg-slate-900/60 border border-cyan-900/40 rounded-3xl p-8 space-y-5 backdrop-blur-sm">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Pre-Launch Snapshot</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "AED 849K", l: "Starting price", c: "text-cyan-400" },
                  { v: "325m", l: "Beach frontage", c: "text-white" },
                  { v: "30/70", l: "Payment plan", c: "text-emerald-400" },
                  { v: "6", l: "Towers", c: "text-white" },
                ].map(({ v, l, c }) => (
                  <div key={l} className="bg-slate-950/60 rounded-2xl p-4 text-center space-y-1">
                    <div className={`text-2xl font-black ${c}`}>{v}</div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{l}</div>
                  </div>
                ))}
              </div>
              <Link href="/mamzar" data-testid="cta-lifestyle-gateway-card">
                <Button className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-black uppercase tracking-widest rounded-2xl h-11 text-xs transition-all">
                  View All Units & Register EOI →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* EMERGENCY PREPAREDNESS CTA */}
      <section className="relative py-14 px-6 bg-gradient-to-r from-red-950/80 via-slate-950 to-amber-950/40 border-y border-red-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">Free for All UAE Residents</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Are you prepared for an emergency in Dubai?
              </h2>
              <p className="text-slate-400 text-sm max-w-lg">
                Register your household exit plan, join the UAE crisis readiness network, and get your
                personalized evacuation strategy — completely free.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link href="/wartime-readiness">
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-black font-black uppercase tracking-wider px-6 py-3 w-full sm:w-auto md:w-full"
                  data-testid="cta-wartime-readiness"
                >
                  <Radio className="w-4 h-4 mr-2" />
                  Crisis Readiness Network
                </Button>
              </Link>
              <Link href="/emergency-exit">
                <Button
                  variant="outline"
                  className="border-red-500/50 text-red-300 hover:bg-red-500/10 font-black uppercase tracking-wider px-6 py-3 w-full sm:w-auto md:w-full"
                  data-testid="cta-emergency-exit"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Register Exit Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ============================================
          SECTION 7 — UNIFIED BROKER / LANDLORD (moved down)
         ============================================ */}
      <section className="py-20 px-6 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Building2 className="w-3.5 h-3.5" /> For Partners — Not Tenants
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Are you a real estate agent?
            </h2>
            <p className="text-gray-500 font-medium max-w-sm mx-auto">
              Earn on every referral. We handle what happens after the deal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">

            {/* Broker card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-slate-900/90 px-8 py-9 space-y-6 flex flex-col"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Brokers & Agents</span>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">
                  Your clients need Ejari.{" "}
                  <span className="text-emerald-400">You get paid.</span>
                </h3>
                <p className="text-gray-500 text-sm">Refer once. Zero extra work.</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">AED 150–800+</span>
                <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">per client</span>
              </div>

              <Link href="/broker-onboard" data-testid="cta-broker-partner" className="mt-auto">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl h-11 text-xs transition-all">
                  <ArrowRight className="w-4 h-4 mr-2" /> Generate My Referral Link
                </Button>
              </Link>
            </motion.div>

            {/* Landlord card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-slate-900/90 px-8 py-9 space-y-6 flex flex-col"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Landlords & Property Owners</span>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">
                  Just finalized a property?{" "}
                  <span className="text-purple-400">We handle the rest.</span>
                </h3>
                <p className="text-gray-500 text-sm">From agreement to move-in — all coordinated.</p>
              </div>

              <div className="space-y-2.5">
                {["Ejari & DEWA activation", "Move-in coordination", "Post-handover setup"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/transaction-support" data-testid="cta-transaction-support-hook" className="mt-auto">
                <Button className="w-full bg-purple-700 hover:bg-purple-600 text-white font-black uppercase tracking-widest rounded-xl h-11 text-xs transition-all">
                  <ArrowRight className="w-4 h-4 mr-2" /> Transaction Support
                </Button>
              </Link>
            </motion.div>

          </div>

          <p className="text-center text-gray-700 text-[10px] font-bold uppercase tracking-widest">
            DeliWer does not participate in property transactions — we enhance what happens after.
          </p>

        </div>
      </section>
      {/* PARTNER NETWORK */}
      <section className="bg-slate-950 border-t border-white/5 px-4">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </section>
      <footer className="py-20 px-4 border-t border-white/5 text-center bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] max-w-xl mx-auto">
            DeliWer is an operational back-office for Dubai residents and brokers, focused on relocation, settlement, and daily living journeys.
          </p>
        </div>
      </footer>
      <RelocationFunnel
        open={funnelOpen}
        onClose={() => setFunnelOpen(false)}
        initialScenario={funnelScenario}
      />
      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 p-4 pb-safe">
        <a
          href="https://wa.me/971523906019?text=I%20found%20a%20property%20and%20need%20move-in%20support"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cta-mobile-sticky"
        >
          <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-sm shadow-2xl shadow-emerald-900/50 flex items-center justify-center gap-2 transition-all">
            <MessageCircle className="w-5 h-5" /> Start Move-In Now
          </Button>
        </a>
      </div>
    </div>
  );
}
