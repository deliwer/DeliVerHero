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
  Sparkles,
  Zap,
  Users,
  Shield,
  Crown,
  Leaf,
  Copy,
  Check,
  Link2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiTelegram } from "react-icons/si";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import NicoleImg from "@assets/Nicole_Oliver.jpeg";
import BeckyImg from "@assets/Becky_Choi_1776889041274.jpeg";
import DubaiApartmentImg from "@assets/Dubai_Creek_Apartment.jpg";
import DubaiCreekImg from "@assets/Dubai_Creek_1765884931780.jpg";
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

function useDxbCounter() {
  const seed = (() => {
    const now = new Date();
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    return Math.floor(secondsSinceMidnight * 2.3) + 12400;
  })();
  const [count, setCount] = useState(seed);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 2;
      setCount(c => c + increment);
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return { count, flash };
}

const EARNER_POOL = [
  { name: "Ahmed R.",    action: "referral bonus",        dxb: 25 },
  { name: "Priya S.",    action: "AquaCafe order",         dxb: 8  },
  { name: "James K.",    action: "move-in booking",        dxb: 40 },
  { name: "Fatima A.",   action: "recycling drop-off",     dxb: 12 },
  { name: "Liu W.",      action: "community challenge",    dxb: 15 },
  { name: "Omar M.",     action: "venue check-in",         dxb: 6  },
  { name: "Sarah L.",    action: "water filter order",     dxb: 20 },
  { name: "Ravi P.",     action: "DXB quiz",               dxb: 10 },
  { name: "Nour H.",     action: "referral bonus",         dxb: 25 },
  { name: "Elena V.",    action: "AquaCafe order",         dxb: 7  },
  { name: "Khalid B.",   action: "move-out booking",       dxb: 35 },
  { name: "Mei T.",      action: "recycling drop-off",     dxb: 11 },
  { name: "Carlos D.",   action: "community challenge",    dxb: 18 },
  { name: "Aisha N.",    action: "DEWA registration",      dxb: 30 },
  { name: "Tom W.",      action: "venue check-in",         dxb: 5  },
  { name: "Divya K.",    action: "water filter order",     dxb: 22 },
  { name: "Hassan F.",   action: "referral bonus",         dxb: 25 },
  { name: "Sophie R.",   action: "Ejari completion",       dxb: 50 },
  { name: "Yusuf A.",    action: "DXB quiz",               dxb: 9  },
  { name: "Ananya M.",   action: "AquaCafe order",         dxb: 6  },
];

function useRecentEarners() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * EARNER_POOL.length));
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % EARNER_POOL.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);
  return { earner: EARNER_POOL[index], visible };
}

export default function LandingPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelScenario, setFunnelScenario] = useState<FunnelScenario | undefined>(undefined);
  const [calcRent, setCalcRent] = useState("");
  const [calcDistrict, setCalcDistrict] = useState("");
  const [calcEmail, setCalcEmail] = useState("");
  const [calcSubmitting, setCalcSubmitting] = useState(false);
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const { count: dxbToday, flash: dxbFlash } = useDxbCounter();
  const [refName, setRefName] = useState("");
  const [refCode, setRefCode] = useState("");
  const [refCopied, setRefCopied] = useState(false);
  const generateRefCode = (name: string) => {
    const code = name.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    setRefCode(code || "");
  };
  const copyRefLink = () => {
    const link = `https://deliwer.com/move-in?ref=${refCode}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setRefCopied(true);
    setTimeout(() => setRefCopied(false), 2000);
  };
  const { earner, visible } = useRecentEarners();
  const [dxbName, setDxbName] = useState("");
  const [dxbResult, setDxbResult] = useState<{ score: number; level: number; badge: string; color: string } | null>(null);
  const [dxbAnimating, setDxbAnimating] = useState(false);

  const calcDxbScore = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    let hash = 0;
    for (let i = 0; i < clean.length; i++) hash = (hash * 31 + clean.charCodeAt(i)) >>> 0;
    const score = 150 + (hash % 2651);
    const levels = [
      { min: 0,    badge: "Hero Member",              color: "from-slate-600 to-slate-500",    level: 1 },
      { min: 500,  badge: "Community Champion",       color: "from-emerald-700 to-emerald-500", level: 2 },
      { min: 1000, badge: "Sustainability Ambassador",color: "from-blue-700 to-blue-500",       level: 3 },
      { min: 1800, badge: "Planet Hero Elite",        color: "from-violet-700 to-violet-500",   level: 4 },
      { min: 2400, badge: "Hall of Heroes",           color: "from-amber-600 to-yellow-400",    level: 5 },
    ];
    const { badge, color, level } = [...levels].reverse().find(l => score >= l.min)!;
    setDxbAnimating(true);
    setTimeout(() => { setDxbResult({ score, level, badge, color }); setDxbAnimating(false); }, 320);
  };

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
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 px-4 overflow-hidden">
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
      <section id="how-it-works" className="relative py-20 px-6 border-b border-white/5 overflow-hidden">
        {/* Section background — Dubai creek at low opacity */}
        <div className="absolute inset-0">
          <img src={DubaiCreekImg} alt="" className="w-full h-full object-cover object-center" style={{ opacity: 0.12 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              One coordinator. Everything sorted.
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              From Keys to Kettle{" "}
              <span className="text-emerald-400">in 24 Hours.</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              One WhatsApp message. We handle Ejari, movers, DEWA, cleaning, and water — you just show up.
            </p>
          </motion.div>

          {/* 3-step image cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                icon: "💬",
                title: "Message Us",
                body: "Send your move-in date and apartment size. Takes 60 seconds.",
                tag: "60 seconds",
                tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80",
                accent: "from-blue-600/40 to-blue-900/80",
                border: "border-blue-500/20 hover:border-blue-400/40",
              },
              {
                step: "02",
                icon: "📋",
                title: "We Coordinate",
                body: "Your assigned concierge briefs every vendor and manages the full schedule.",
                tag: "Zero chasing",
                tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80",
                accent: "from-amber-700/40 to-amber-950/80",
                border: "border-amber-500/20 hover:border-amber-400/40",
              },
              {
                step: "03",
                icon: "🏠",
                title: "Arrive Ready",
                body: "Walk in to a connected, clean, registered home. AED 0 coordination fee.",
                tag: "AED 0 fee",
                tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                img: DubaiApartmentImg,
                accent: "from-emerald-800/40 to-emerald-950/80",
                border: "border-emerald-500/20 hover:border-emerald-400/40",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden border ${s.border} transition-all duration-300 group cursor-default`}
                style={{ height: 280 }}
              >
                {/* Background photo */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay — heavier at bottom for text legibility */}
                <div className={`absolute inset-0 bg-gradient-to-t ${s.accent} via-slate-900/60 to-slate-900/30`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top — step number + tag */}
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">{s.step}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.tagColor}`}>
                      {s.tag}
                    </span>
                  </div>

                  {/* Bottom — icon + text */}
                  <div className="space-y-1.5">
                    <span className="text-2xl block">{s.icon}</span>
                    <h3 className="text-white font-black text-lg leading-tight">{s.title}</h3>
                    <p className="text-gray-300 text-xs font-medium leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Services included — visual 2-row grid */}
          <div className="space-y-3">
            <p className="text-center text-[9px] font-black uppercase tracking-[0.25em] text-gray-600">Everything included in one coordination</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { emoji: "📄", label: "Ejari",       sub: "Registration" },
                { emoji: "🚛", label: "Movers",       sub: "Vetted crew" },
                { emoji: "⚡", label: "DEWA",         sub: "Activation" },
                { emoji: "📶", label: "Internet",     sub: "Setup" },
                { emoji: "🧹", label: "Cleaning",     sub: "Deep clean" },
                { emoji: "💧", label: "Water Filter", sub: "Installed" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1 bg-white/[0.04] border border-white/8 rounded-xl py-3 px-2 text-center hover:bg-white/[0.07] hover:border-emerald-500/20 transition-all"
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-white font-black text-[10px] leading-none">{s.label}</span>
                  <span className="text-gray-600 text-[9px] font-medium">{s.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Just Got Keys — image-backed urgency CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden border border-emerald-500/25"
          >
            <img
              src={DubaiApartmentImg}
              alt="Dubai apartment ready to move in"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ opacity: 0.25 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
            <div className="relative flex flex-col sm:flex-row items-center gap-5 px-6 py-6">
              {/* Key icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl">
                🔑
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Just received your keys?</p>
                <p className="text-white font-black text-base leading-snug">Day 1 sorted — before you even arrive.</p>
                <p className="text-gray-500 text-xs mt-1">WhatsApp us now and we'll have everything ready when you walk in.</p>
              </div>
              <Button
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl h-11 px-6 text-sm shrink-0 gap-2 transition-all shadow-lg shadow-emerald-900/30"
                onClick={() => window.open('https://wa.me/971523906019?text=Hello%20DeliWer,%20I%20just%20received%20my%20apartment%20keys%20and%20need%20home%20setup', '_blank')}
                data-testid="button-just-got-keys"
              >
                <MessageCircle className="w-4 h-4" /> I Just Got My Keys
              </Button>
            </div>
          </motion.div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-gray-700 font-bold uppercase tracking-widest">
            No hidden fees · <Link href="/concierge-pricing"><span className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">See pricing →</span></Link>
          </p>

        </div>
      </section>
      {/* FINAL CTA — SECTION 8 */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Full-bleed real photo */}
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85"
          alt="Dubai luxury apartment living room"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950/95" />

        <div className="relative py-20 px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-1.5 bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                Trusted by Dubai Tenants
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                Ready to move into<br className="hidden sm:block" /> your new home?
              </h2>
            </motion.div>

            {/* ── Social Trust Block ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5"
              data-testid="trust-anchor-final-cta"
            >
              {/* Avatar cluster + star rating */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex -space-x-2.5">
                  <img src={NicoleImg} alt="Nicole" className="w-10 h-10 rounded-full object-cover border-2 border-slate-950 shadow-lg" />
                  <img src={BeckyImg} alt="Becky" className="w-10 h-10 rounded-full object-cover border-2 border-slate-950 shadow-lg" />
                  {["ZA", "SG", "AH"].map((init) => (
                    <div key={init} className="w-10 h-10 rounded-full bg-violet-600/60 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-white shadow-lg">{init}</div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-white font-black text-xs">5.0 · 1,200+ residents served</p>
                  <p className="text-gray-400 text-[10px]">Verified Google Reviews</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8" />

              {/* Featured quote */}
              <div className="flex items-start gap-3 text-left">
                <img src={NicoleImg} alt="Nicole Oliver" data-testid="img-testimonial-nicole-landing"
                  className="w-9 h-9 rounded-full object-cover border border-violet-400/40 shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-200 text-sm italic leading-relaxed font-medium">
                    "Fast, professional, zero hassle. DeliWer set up our complete water system before I even arrived — the difference is incredible."
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-white font-black text-xs">Nicole Oliver</p>
                    <span className="text-gray-600">·</span>
                    <p className="text-gray-500 text-[10px]">Dubai Marina 🇩🇪</p>
                    <div className="ml-auto flex items-center gap-1 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="https://wa.me/971523906019?text=I%20found%20a%20property%20and%20need%20move-in%20support"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-final-whatsapp"
              >
                <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-12 text-sm shadow-xl shadow-emerald-900/40 transition-all gap-2">
                  <MessageCircle className="w-4 h-4" /> Start Move-In on WhatsApp
                </Button>
              </a>
              <Link href="/reviews" data-testid="link-see-all-reviews">
                <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white/80 hover:bg-white/10 font-black rounded-xl px-8 h-12 text-sm transition-all">
                  See all reviews <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {["📍 All Dubai districts", "🤝 Vetted partner network", "⚡ Reply in minutes", "AED 0 coordination fee"].map((b) => (
                <span key={b} className="text-[11px] text-gray-500 font-semibold">{b}</span>
              ))}
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
      {/* ── PLANET HEROES BANNER ── */}
      <section className="bg-gradient-to-br from-emerald-950/60 via-slate-950 to-slate-950 border-b border-emerald-500/15 relative overflow-hidden">
        {/* Live DXB ticker strip */}
        <div className="border-b border-emerald-500/15 px-6 py-2.5 flex items-center justify-center gap-3 bg-emerald-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">DXBs earned today</span>
          <motion.span
            key={dxbToday}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`text-sm font-black tabular-nums transition-colors duration-300 ${dxbFlash ? "text-emerald-300" : "text-emerald-400"}`}
            data-testid="dxb-today-counter"
          >
            {dxbToday.toLocaleString()}
          </motion.span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">DXBs</span>
          <span className="hidden sm:inline text-[10px] text-gray-700 font-semibold">— resets at midnight</span>
        </div>

        {/* Recent earners live feed */}
        <div className="border-b border-emerald-500/10 px-6 py-2 flex items-center justify-center gap-2 overflow-hidden" style={{ minHeight: 32 }}>
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 shrink-0">Just earned</span>
          <div className="relative h-5 overflow-hidden flex-1 max-w-sm" data-testid="ph-earner-feed">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.div
                  key={earner.name + earner.action}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[8px] font-black text-emerald-400 shrink-0 select-none">
                    {earner.name[0]}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 truncate">
                    <span className="text-white font-black">{earner.name}</span>
                    {" "}via {earner.action}
                  </span>
                  <span className="text-[10px] font-black text-emerald-400 shrink-0">+{earner.dxb} DXBs</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="w-1 h-1 rounded-full bg-emerald-500/40 shrink-0 animate-pulse" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/5 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-5xl mx-auto relative px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left — branding + copy */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Earn. Impact. Play.
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                Planet<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Heroes</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Join Dubai's unified rewards ecosystem. Earn <span className="text-emerald-400 font-black">DXBs</span> — Dubai's loyalty currency — through everyday actions: AquaCafe orders, referrals, recycling, and more. 5 badge levels. Free to join.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  { icon: Shield, label: "5 Badge Levels" },
                  { icon: Zap, label: "8 Ways to Earn" },
                  { icon: Users, label: "36,000+ Members" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold">
                    <Icon className="w-3.5 h-3.5 text-emerald-500" />
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
                <Link href="/community" data-testid="btn-planet-heroes-banner">
                  <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-7 h-11 text-sm shadow-lg shadow-emerald-900/30 transition-all">
                    Explore Planet Heroes <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/971523906019?text=I%20want%20to%20become%20a%20Planet%20Heroes%20Founding%20Member!"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="btn-ph-founding-member-landing"
                >
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl px-7 h-11 text-sm transition-all">
                    <Crown className="w-3.5 h-3.5 mr-1.5" />
                    Become a Founding Member
                  </Button>
                </a>
              </div>
            </div>

            {/* Right — badge level cards */}
            <div className="flex flex-col gap-2 w-full md:w-64 shrink-0">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 text-center md:text-left mb-1">Badge Progression</p>
              {[
                { level: 1, name: "Hero Member",              color: "from-slate-600 to-slate-500",   icon: Shield },
                { level: 2, name: "Community Champion",       color: "from-emerald-700 to-emerald-500", icon: Users },
                { level: 3, name: "Sustainability Ambassador",color: "from-blue-700 to-blue-500",      icon: Leaf },
                { level: 4, name: "Planet Hero Elite",        color: "from-violet-700 to-violet-500",  icon: Sparkles },
                { level: 5, name: "Hall of Heroes",           color: "from-amber-600 to-yellow-400",   icon: Crown },
              ].map(({ level, name, color, icon: Icon }) => (
                <div key={level} className="flex items-center gap-3 px-3 py-2 bg-white/3 border border-white/8 rounded-xl">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Level {level}</p>
                    <p className="text-xs font-black text-white leading-tight">{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUR DXB SCORE WIDGET ── */}
      <section className="py-8 px-6 bg-slate-950 border-b border-emerald-500/10">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] overflow-hidden">
            {/* Header row */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-emerald-500/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3 text-slate-950" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white">What's your DXB Score?</p>
              <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-emerald-600">Free · Instant</span>
            </div>

            <div className="px-5 py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Input + button */}
              {!dxbResult ? (
                <>
                  <p className="text-sm text-gray-400 shrink-0 hidden sm:block">Enter your first name →</p>
                  <form
                    className="flex gap-2 flex-1 w-full"
                    onSubmit={e => { e.preventDefault(); calcDxbScore(dxbName); }}
                    data-testid="form-dxb-score"
                  >
                    <input
                      type="text"
                      value={dxbName}
                      onChange={e => setDxbName(e.target.value)}
                      placeholder="Your first name…"
                      maxLength={32}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 h-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      data-testid="input-dxb-name"
                    />
                    <Button
                      type="submit"
                      disabled={!dxbName.trim() || dxbAnimating}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-5 h-10 text-sm shrink-0 transition-all disabled:opacity-40"
                      data-testid="btn-dxb-calculate"
                    >
                      {dxbAnimating ? "…" : "Calculate →"}
                    </Button>
                  </form>
                </>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full"
                    data-testid="dxb-score-result"
                  >
                    {/* Badge */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dxbResult.color} flex flex-col items-center justify-center shrink-0 shadow-lg`}>
                      <Crown className="w-5 h-5 text-white" />
                      <span className="text-[8px] font-black text-white/80 mt-0.5">LVL {dxbResult.level}</span>
                    </div>

                    {/* Score info */}
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                        {dxbName.trim()}'s starting score
                      </p>
                      <p className="text-3xl font-black text-white tabular-nums leading-tight">
                        {dxbResult.score.toLocaleString()}
                        <span className="text-emerald-400 text-lg ml-1.5">DXBs</span>
                      </p>
                      <p className="text-xs text-emerald-400 font-black">{dxbResult.badge}</p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link href="/community" data-testid="btn-dxb-result-cta">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl px-5 h-10 text-sm w-full transition-all">
                          Start earning real DXBs →
                        </Button>
                      </Link>
                      <button
                        onClick={() => { setDxbResult(null); setDxbName(""); }}
                        className="text-[10px] text-gray-600 hover:text-gray-400 font-bold transition-colors text-center"
                        data-testid="btn-dxb-retry"
                      >
                        Try another name
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer hint */}
            {!dxbResult && (
              <div className="px-5 pb-3 flex items-center gap-2">
                <span className="text-[9px] text-gray-700">Score is calculated from your name — join Planet Heroes to build your real score through actions.</span>
              </div>
            )}
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
      {/* EMERGENCY PREPAREDNESS CTA */}
      <section className="relative py-14 px-6 border-y border-red-900/30 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80"
          alt="Dubai city skyline"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-slate-950/85 to-amber-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
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
      {/* ── BROKER REFERRAL LINK GENERATOR ── */}
      <section className="py-10 px-6 bg-slate-950 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/8">
              <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <Link2 className="w-3 h-3 text-emerald-400" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white">Broker Referral Link Generator</p>
              <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-gray-600">Track every click</span>
            </div>
            <div className="px-5 py-5 space-y-4">
              <p className="text-xs text-gray-500">Enter your name or brokerage to generate your personal tracking link. Share it — every client who books through it is credited to you.</p>
              {!refCode ? (
                <form
                  className="flex gap-2"
                  onSubmit={e => { e.preventDefault(); generateRefCode(refName); }}
                  data-testid="form-ref-generator"
                >
                  <input
                    type="text"
                    value={refName}
                    onChange={e => setRefName(e.target.value)}
                    placeholder="Your name or brokerage…"
                    maxLength={40}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 h-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    data-testid="input-ref-name"
                  />
                  <Button
                    type="submit"
                    disabled={!refName.trim()}
                    className="bg-white text-slate-950 hover:bg-gray-100 font-black rounded-xl px-5 h-10 text-sm shrink-0 disabled:opacity-40 transition-all"
                    data-testid="btn-generate-ref"
                  >
                    Generate →
                  </Button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-slate-900 border border-emerald-500/20 rounded-xl px-4 h-11 overflow-hidden">
                    <span className="text-[10px] font-black text-gray-600 shrink-0 uppercase tracking-widest">Link</span>
                    <span className="text-xs text-gray-400 font-mono flex-1 truncate">
                      deliwer.com/move-in?ref=<span className="text-emerald-400 font-black">{refCode}</span>
                    </span>
                    <button
                      onClick={copyRefLink}
                      className="shrink-0 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
                      data-testid="btn-copy-ref-link"
                    >
                      {refCopied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Clicks", value: "0", note: "last 7 days" },
                      { label: "Leads",  value: "0", note: "submitted" },
                      { label: "Earned", value: "AED 0", note: "commission" },
                    ].map(({ label, value, note }) => (
                      <div key={label} className="bg-slate-900 border border-white/8 rounded-xl px-3 py-2.5 text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">{label}</p>
                        <p className="text-lg font-black text-white">{value}</p>
                        <p className="text-[9px] text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] text-gray-700">Stats update after your first client booking. <a href="/partners" className="text-emerald-600 hover:text-emerald-400 transition-colors">Full dashboard →</a></p>
                    <button
                      onClick={() => { setRefCode(""); setRefName(""); }}
                      className="text-[10px] text-gray-600 hover:text-gray-400 font-bold transition-colors"
                      data-testid="btn-reset-ref"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
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
