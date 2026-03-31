import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import { useEffect, useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { RelocationFunnel, FunnelScenario } from "@/components/relocation-funnel";

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


export default function LandingPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelScenario, setFunnelScenario] = useState<FunnelScenario | undefined>(undefined);

  const openFunnel = (scenario?: FunnelScenario) => {
    setFunnelScenario(scenario);
    setFunnelOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Move-In Services Dubai | Ejari, DEWA & Home Setup | DeliWer"
        description="Move into your Dubai home stress-free. DeliWer handles Ejari registration, DEWA activation, water setup, and full relocation support. Pay only normal vendor rates. Also: free emergency evacuation exit plans and UAE crisis readiness for Dubai expats."
        keywords="move in Dubai, Ejari registration Dubai, DEWA activation Dubai, Dubai relocation services, Dubai expat services, Dubai tenant support, home setup Dubai, moving to Dubai, UAE emergency exit plan, Dubai crisis preparedness, wartime readiness UAE, expat evacuation Dubai"
      />
      <Navigation />

      {/* ============================================
          MAIN HERO — Are You Overpaying Rent?
         ============================================ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-40 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_LIFESTYLE_IMG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Dubai Relocation · One WhatsApp Away
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
              Found a Home?{" "}
              <span className="text-emerald-400" style={{ textShadow: "0 0 40px rgba(16,185,129,0.45)" }}>
                Complete Your Move-In
              </span>
              {" "}in 24 Hours.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto leading-relaxed">
              Ejari, movers, DEWA, internet, cleaning — everything handled for you in one place.
            </p>
            <p className="text-sm text-emerald-400 font-black uppercase tracking-widest">
              Move now. Pay only when services are executed. No upfront coordination fees.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://wa.me/971523946311?text=I%20found%20a%20property%20in%20Dubai.%20I%20want%20full%20move-in%20support%20(Ejari%2C%20movers%2C%20setup)."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp-main-hero"
              >
                <Button className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-base rounded-2xl shadow-2xl shadow-emerald-900/50 transition-all">
                  <MessageCircle className="w-6 h-6 mr-3" /> Start Move-In on WhatsApp
                </Button>
              </a>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="cta-see-how-it-works"
                className="h-16 px-8 border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/5 transition-all"
              >
                See How It Works
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
              {["Serving tenants across Dubai", "Verified partner network", "Fast WhatsApp support"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[11px] text-gray-300 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-3 gap-2 max-w-2xl mx-auto w-full"
          >
            <button
              data-testid="funnel-btn-moving-in"
              onClick={() => openFunnel("moving-in")}
              className="group flex flex-col items-center gap-2 p-3 bg-white/10 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-500 rounded-xl transition-all text-center"
            >
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <Home className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-white uppercase text-[10px] tracking-tight leading-tight">Moving In</div>
                <div className="text-[9px] text-gray-400 font-medium leading-tight">Ejari, DEWA & setup</div>
              </div>
            </button>

            <button
              data-testid="funnel-btn-moving-within"
              onClick={() => openFunnel("moving-within")}
              className="group flex flex-col items-center gap-2 p-3 bg-white/10 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500 rounded-xl transition-all text-center"
            >
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <TrendingDown className="w-4 h-4 text-blue-400" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-white uppercase text-[10px] tracking-tight leading-tight">Cheaper Rent</div>
                <div className="text-[9px] text-gray-400 font-medium leading-tight">Full relocation</div>
              </div>
            </button>

            <button
              data-testid="funnel-btn-leaving"
              onClick={() => openFunnel("leaving")}
              className="group flex flex-col items-center gap-2 p-3 bg-white/10 backdrop-blur-sm border border-amber-500/30 hover:border-amber-500 rounded-xl transition-all text-center"
            >
              <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                <LogOut className="w-4 h-4 text-amber-400" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-white uppercase text-[10px] tracking-tight leading-tight">Leaving Dubai</div>
                <div className="text-[9px] text-gray-400 font-medium leading-tight">Exit from 900 AED</div>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION 2 — PROBLEM / PAIN
         ============================================ */}
      <section className="py-20 px-6 bg-slate-900/70 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              Moving in Dubai is <span className="text-red-400">fragmented,</span> slow, and stressful.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { icon: "📄", text: "Ejari delays and unclear steps" },
              { icon: "🚛", text: "Multiple vendors for moving, utilities, cleaning" },
              { icon: "💸", text: "Hidden costs and last-minute surprises" },
              { icon: "📞", text: "No single point of coordination" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3 bg-red-500/5 border border-red-500/15 rounded-xl p-4">
                <span className="text-xl shrink-0">{item.icon}</span>
                <span className="text-gray-300 font-bold text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 font-black uppercase tracking-widest text-sm">
            You've found your home. Now comes the hard part.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3 (UNIFIED) — WHAT DELIVERWER HANDLES
         ============================================ */}
      <section className="relative py-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
            alt="Home setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/80 to-slate-950/90" />
        </div>
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              One coordinator. Everything sorted.
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              What DeliWer handles for you
            </h2>
            <p className="text-gray-400 font-medium max-w-lg mx-auto">
              One conversation. Full move-in coordination. We coordinate everything — our partners execute.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: "📄", label: "Ejari Registration" },
              { icon: "🚛", label: "Movers & Packing" },
              { icon: "⚡", label: "DEWA & Utility Setup" },
              { icon: "📶", label: "Internet Connection" },
              { icon: "🧹", label: "Cleaning & Preparation" },
              { icon: "📦", label: "Storage & Logistics" },
            ].map((s) => (
              <div key={s.label} className="group flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/15 hover:border-emerald-400/50 hover:bg-white/15 rounded-xl transition-all">
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="text-white font-black text-xs uppercase tracking-tight leading-tight">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/971523946311?text=I%20found%20a%20property%20in%20Dubai.%20I%20want%20full%20move-in%20support%20(Ejari%2C%20movers%2C%20setup)."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-bundle-start"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-11 text-sm shadow-lg shadow-emerald-900/30 transition-all">
                <MessageCircle className="w-4 h-4 mr-2" /> Start My Move-In on WhatsApp
              </Button>
            </a>
            <Link href="/concierge-pricing">
              <Button variant="outline" className="border-white/20 text-gray-400 hover:text-white hover:border-white/40 font-black rounded-xl px-6 h-11 text-sm transition-all">
                View Pricing →
              </Button>
            </Link>
          </div>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No hidden fees · You pay vendors directly at market rates</p>
        </div>
      </section>

      {/* ============================================
          SECTION 4 — HOW IT WORKS
         ============================================ */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-900/50 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">How your move-in gets done</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Tell us your property", desc: "WhatsApp us in seconds — property details, move date, what you need.", color: "emerald" },
              { step: "02", title: "We plan your move", desc: "Ejari, movers, DEWA, internet — we sequence everything perfectly.", color: "blue" },
              { step: "03", title: "Pay only when confirmed", desc: "No upfront fees to us. You pay vendors directly at market rates.", color: "violet" },
              { step: "04", title: "Move in stress-free", desc: "Walk into a ready home. Everything sorted before you arrive.", color: "emerald" },
            ].map((s) => (
              <div key={s.step} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-white/20 transition-all">
                <div className={`text-4xl font-black ${s.color === "emerald" ? "text-emerald-500/30" : s.color === "blue" ? "text-blue-500/30" : "text-violet-500/30"}`}>{s.step}</div>
                <h3 className="text-white font-black text-sm uppercase tracking-tight leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-emerald-400 font-black uppercase tracking-widest text-sm">No coordination fees. No confusion. No back-and-forth.</p>
          </div>
        </div>
      </section>

      {/* ============================================
          DUBAI RENTAL INTELLIGENCE + COST CLARITY
         ============================================ */}
      <section className="relative py-16 px-4 border-b border-white/5 overflow-hidden">
        {/* Lifestyle image background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80"
            alt="Dubai skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950/95" />
        </div>

        <div className="max-w-4xl mx-auto space-y-10 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              <BarChart3 className="w-3 h-3" /> Dubai Rental Intelligence
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Are You <span className="text-violet-400">Overpaying Rent</span> in Dubai?
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto font-medium">
              Dubai rents shifted 18–35% in 2024. DeliWer benchmarks your contract against RERA and finds your cheapest legal move — at zero markup.
            </p>
          </motion.div>

          {/* Key stats — compact 4-col */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Avg rent increase", value: "+26%", icon: <TrendingUp className="w-3.5 h-3.5" />, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
              { label: "Avg mover saving", value: "18K AED", icon: <TrendingDown className="w-3.5 h-3.5" />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "Cheaper districts", value: "14+", icon: <MapPin className="w-3.5 h-3.5" />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "DeliWer fee", value: "0 AED", icon: <Calculator className="w-3.5 h-3.5" />, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border p-3 flex flex-col gap-1 ${s.bg}`} data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
                <div className={s.color}>{s.icon}</div>
                <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-[10px] font-bold text-white/70 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Renew vs Move — simplified two-column */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-red-400">Renew Blind</span>
              </div>
              {[
                { label: "Rent hike risk", value: "Up to 20%" },
                { label: "RERA check", value: "Skipped" },
                { label: "Annual overpay", value: "6–22K AED" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-xs">{row.label}</span>
                  <span className="text-xs font-bold text-red-400">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-violet-400">Move Smart</span>
              </div>
              {[
                { label: "RERA benchmark", value: "Free" },
                { label: "District scan", value: "14+ options" },
                { label: "Net annual saving", value: "12–22K AED" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center border-b border-violet-500/10 pb-2">
                  <span className="text-gray-400 text-xs">{row.label}</span>
                  <span className="text-xs font-bold text-violet-300">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest text-center">Typical move-in cost estimates</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
              {[
                { service: "Ejari Registration", range: "AED 200–300", icon: "📄" },
                { service: "Movers (depends on size)", range: "AED 800–2,500", icon: "🚛" },
                { service: "Utility Setup (DEWA)", range: "Varies by property", icon: "⚡" },
                { service: "Cleaning (optional)", range: "AED 250–600", icon: "🧹" },
              ].map((row) => (
                <div key={row.service} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span>{row.icon}</span>
                    <span className="text-gray-300 font-bold text-xs">{row.service}</span>
                  </div>
                  <span className="text-emerald-400 font-black text-xs">{row.range}</span>
                </div>
              ))}
              <div className="px-5 py-3 bg-emerald-500/5">
                <p className="text-emerald-300 font-black text-xs text-center">DeliWer coordination fee: AED 0 to you</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/971523946311?text=I%20want%20to%20get%20my%20move-in%20plan%20and%20cost%20estimate."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-900/30"
              data-testid="cta-get-move-in-plan"
            >
              <MessageCircle className="w-4 h-4" /> Get My Move-In Plan
            </a>
            <a
              href="https://wa.me/971523946311?text=Hello%20DeliWer,%20I%20want%20a%20free%20rental%20analysis%20for%20my%20apartment"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-rental-analysis"
            >
              <Button variant="outline" className="border-violet-500/40 text-violet-400 hover:bg-violet-500/10 font-black rounded-2xl px-6 h-10 text-sm transition-all">
                <Calculator className="w-4 h-4 mr-2" /> Analyse My Rent Free
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* JUST GOT KEYS - HIGH-INTENT TRIGGER */}
      <section className="py-20 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
              <img src={lifestyleImages.justGotKeys} alt="New apartment keys" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">High Priority</div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Just Received Your Apartment Keys?</h3>
                <p className="text-gray-300 font-bold text-lg">Most new residents discover the same problems on day one:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    "No drinking water ready",
                    "No shower filter installed",
                    "Utilities not activated"
                  ].map((issue, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                        <span className="text-red-400 text-xs font-black">!</span>
                      </div>
                      <span className="text-gray-200 font-medium">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-emerald-500/20 pt-6">
                <p className="text-gray-300 font-bold mb-4">Let DeliWer prepare your home so your first night is stress-free.</p>
                <Button 
                  size="lg" 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-16 text-lg shadow-2xl transition-all group"
                  onClick={() => window.open('https://wa.me/971523946311?text=Hello%20DeliWer,%20I%20just%20received%20my%20apartment%20keys%20and%20need%20home%20setup', '_blank')}
                  data-testid="button-just-got-keys"
                >
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  WhatsApp: I Just Got My Keys
                </Button>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest text-center mt-3">Response within 10 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Ejari Registration Assistance From Home</h2>
            <p className="text-gray-400 font-medium text-lg">
              DeliWer simplifies the process by helping tenants complete Ejari registration easily from the comfort of their home.
            </p>
            <div className="space-y-4">
              {[
                "Guidance on required documents",
                "Support completing online process",
                "Convenient assistance from home",
                "Faster move-in progress"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span className="text-white font-bold uppercase text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            <Link href="/ejari-dubai">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl transition-all w-full md:w-auto mt-4" data-testid="button-ejari-solution">
                Start Your Ejari Registration
              </Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden border border-white/10">
            <img src={lifestyleImages.process} alt="Ejari process assistance" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6 — TRUST / SOCIAL PROOF
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
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              Trusted by Dubai Tenants
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Built for tenants moving across Dubai</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📍", title: "JVC, Marina, Al Nahda & more", desc: "Used by tenants in the most popular Dubai districts." },
              { icon: "🤝", title: "Partner network for execution", desc: "Vetted moving, cleaning, and utility service partners." },
              { icon: "⚡", title: "Fast WhatsApp response", desc: "We respond within minutes — not hours." },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 text-center hover:border-violet-500/30 transition-all">
                <span className="text-3xl block">{item.icon}</span>
                <h3 className="text-white font-black text-sm uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-8 space-y-4 max-w-2xl mx-auto text-center">
            <p className="text-2xl">"</p>
            <p className="text-gray-200 font-bold leading-relaxed italic">
              "DeliWer handled everything — Ejari, movers, DEWA — I just moved in stress-free. Didn't deal with a single vendor call."
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs">S</div>
              <div className="text-left">
                <p className="text-white font-black text-xs">Sarah K.</p>
                <p className="text-gray-500 text-[10px]">Moved to JVC · Recent move-in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7 — BROKER HOOK
         ============================================ */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-10 md:p-14 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              For Real Estate Agents
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Are you a real estate agent?</h2>
            <p className="text-gray-300 font-medium max-w-lg mx-auto text-lg">
              Help your clients move in faster — and earn on every referral.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/broker-partner" data-testid="cta-broker-partner">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-2xl h-14 px-10 text-sm shadow-xl shadow-purple-900/30 transition-all">
                  <ArrowRight className="w-5 h-5 mr-2" /> Generate My Referral Link
                </Button>
              </Link>
              <a
                href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I'm%20a%20real%20estate%20agent%20and%20I%20want%20to%20join%20as%20a%20broker%20partner."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-broker-partner-wa"
              >
                <Button variant="outline" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest rounded-2xl h-14 px-8 text-sm">
                  <MessageCircle className="w-5 h-5 mr-2" /> Join via WhatsApp
                </Button>
              </a>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Free to join · Earn AED 150–800+ per client</p>
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

      {/* FINAL CTA — SECTION 8 */}
      <section className="relative py-24 px-6 text-center space-y-8 bg-emerald-600 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={lifestyleImages.finalCTA} alt="Happy resident in home" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-600/80 to-emerald-600" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950">Ready to move into your new home?</h2>
          <p className="text-lg text-emerald-950 font-bold">Tell us your property and we'll handle the rest.</p>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <a
            href="https://wa.me/971523946311?text=I%20found%20a%20property%20in%20Dubai.%20I%20want%20full%20move-in%20support%20(Ejari%2C%20movers%2C%20setup)."
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-final-cta"
          >
            <Button
              size="lg"
              className="bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl transition-all group"
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start on WhatsApp
            </Button>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 text-emerald-950 text-sm font-bold">
            <span>WhatsApp: +971 52 394 6311</span>
            <span>·</span>
            <span>info@deliwer.com</span>
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
          <OperationalBadges variant="dark" />
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
          href="https://wa.me/971523946311?text=I%20found%20a%20property%20and%20need%20move-in%20support"
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
