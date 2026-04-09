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
import NicoleImg from "@assets/Nicole_Oliver.jpeg";
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
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto w-full"
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

            <Link href="/transaction-support" data-testid="funnel-btn-just-signed">
              <div className="group flex flex-col items-center gap-2 p-3 bg-white/10 backdrop-blur-sm border border-violet-500/30 hover:border-violet-500 rounded-xl transition-all text-center h-full">
                <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center group-hover:bg-violet-500/20 transition-all">
                  <CheckCircle2 className="w-4 h-4 text-violet-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-black text-white uppercase text-[10px] tracking-tight leading-tight">Just Signed?</div>
                  <div className="text-[9px] text-gray-400 font-medium leading-tight">Post-deal support</div>
                </div>
              </div>
            </Link>
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
          SECTION 4 — TRANSACTION SUPPORT
         ============================================ */}
      <section id="how-it-works" className="relative py-20 px-6 bg-slate-900/50 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80"
            alt="Dubai apartment move-in"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/95" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              Transaction Support
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              From Agreement to Move-In —<br />
              <span className="text-emerald-400">Handled</span>
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
              DeliWer works alongside your broker, developer, or landlord to ensure everything after the deal is executed seamlessly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Client chooses property", desc: "Any source — broker, developer, or self-found.", color: "slate" },
              { step: "02", title: "Agreement confirmed", desc: "Tenancy signed or purchase confirmed with your broker.", color: "slate" },
              { step: "03", title: "DeliWer activates", desc: "Ejari, DEWA, movers, setup — coordinated in one flow.", color: "emerald", highlight: true },
            ].map((s) => (
              <div key={s.step} className={`relative bg-white/5 border rounded-2xl p-6 space-y-3 transition-all ${s.highlight ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/10 hover:border-white/20"}`}>
                {s.highlight && (
                  <div className="absolute -top-2.5 left-4 bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                    DeliWer Starts Here
                  </div>
                )}
                <div className={`text-4xl font-black ${s.highlight ? "text-emerald-500/40" : "text-white/10"}`}>{s.step}</div>
                <h3 className="text-white font-black text-sm uppercase tracking-tight leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/transaction-support">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-11 text-sm shadow-lg shadow-emerald-900/30 transition-all" data-testid="cta-transaction-support">
                <ArrowRight className="w-4 h-4 mr-2" /> See How It Works
              </Button>
            </Link>
            <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest">DeliWer is not part of the deal — we make it real.</p>
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

          {/* ── DISTRESS DEALS HIGHLIGHT ── */}
          <div className="relative bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="shrink-0 w-12 h-12 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-center justify-center text-2xl relative z-10">
              🔥
            </div>
            <div className="flex-1 text-center sm:text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Distress Deals Available
              </div>
              <p className="text-white font-black text-sm leading-snug">Landlords offering rapid-move vacancies — Ejari, DEWA &amp; setup coordinated within 24 hrs.</p>
              <p className="text-gray-500 text-[11px] mt-1">Ask us about current availability when you start your move-in on WhatsApp.</p>
            </div>
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%27d%20like%20to%20know%20about%20distress%20deal%20vacancies%20available%20now."
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

          {/* ── Trust Signals anchor — more reviews will be added here ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Customer Reviews</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white/3 border border-violet-500/20 rounded-2xl p-8 space-y-5 text-center flex flex-col items-center relative" data-testid="trust-anchor-nicole">
                {/* Verified badge */}
                <div className="absolute top-3 right-4 flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </div>

                <img
                  src={NicoleImg}
                  alt="Nicole Oliver"
                  data-testid="img-testimonial-nicole-landing"
                  className="w-16 h-16 rounded-full object-cover border-2 border-violet-400/30 shadow-lg shadow-violet-900/30"
                />

                {/* 5-star row */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>

                <p className="text-gray-200 font-bold leading-relaxed italic text-sm max-w-lg">
                  "Just moved into my new place at Marina and DeliWer set up the complete water system — including a free hair shower filter! The difference is incredible. Fast, professional, zero hassle."
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="text-center">
                    <p className="text-white font-black text-xs">Nicole Oliver</p>
                    <p className="text-gray-500 text-[10px]">Dubai Marina · Germany 🇩🇪</p>
                  </div>
                </div>

                {/* Google review CTA */}
                <a
                  href="https://g.page/r/CRptmgoZmDxSEBI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-google-review-trust"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-[10px] font-black uppercase tracking-widest border-t border-white/5 pt-4 w-full justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  Leave a Google Review — Help others find us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============================================
          SECTION 7 — BROKER HOOK
         ============================================ */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Transaction Support teaser */}
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Just Finalized a Property?</p>
              <p className="text-white font-black text-base">From Agreement to Move-In — Handled.</p>
              <p className="text-gray-500 text-xs">DeliWer activates after the deal. We don't participate in transactions — we make them real.</p>
            </div>
            <Link href="/transaction-support" data-testid="cta-transaction-support-hook">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-6 h-10 text-sm shrink-0 transition-all">
                <ArrowRight className="w-4 h-4 mr-2" /> Learn More
              </Button>
            </Link>
          </div>

          {/* Broker CTA */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-10 md:p-14 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              For Real Estate Agents
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Are you a real estate agent?</h2>
            <p className="text-gray-300 font-medium max-w-lg mx-auto text-lg">
              Deliver a complete client experience — without the operational burden. Earn on every referral.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/broker-partner" data-testid="cta-broker-partner">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-2xl h-14 px-10 text-sm shadow-xl shadow-purple-900/30 transition-all">
                  <ArrowRight className="w-5 h-5 mr-2" /> Generate My Referral Link
                </Button>
              </Link>
              <Link href="/transaction-support" data-testid="cta-broker-transaction-support">
                <Button variant="outline" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest rounded-2xl h-14 px-8 text-sm">
                  <ArrowRight className="w-5 h-5 mr-2" /> Transaction Support
                </Button>
              </Link>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">DeliWer does not participate in property transactions — we enhance what happens after.</p>
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
