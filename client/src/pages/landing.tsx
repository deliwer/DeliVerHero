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
  MapPin
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

const BUNDLE_SERVICES = [
  { icon: "🚛", label: "Movers" },
  { icon: "📄", label: "Ejari" },
  { icon: "⚡", label: "DEWA" },
  { icon: "💧", label: "Water Check" },
  { icon: "🚿", label: "Shower Filter" },
  { icon: "🗓️", label: "Scheduling" },
];

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
        title="Move-In Services Dubai | Water, Ejari & Home Setup | DeliWer"
        description="Move into your Dubai home stress-free. DeliWer handles water setup, Ejari registration, DEWA activation, and move-in readiness. Pay only normal vendor rates — no extra charges."
      />
      <Navigation />

      {/* ============================================
          MAIN HERO — Are You Overpaying Rent?
         ============================================ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-4 overflow-hidden">
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] text-white uppercase">
              Are You{" "}
              <span className="text-emerald-400" style={{ textShadow: "0 0 40px rgba(16,185,129,0.45)" }}>
                Overpaying
              </span>
              <br />Rent in Dubai?
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto leading-relaxed">
              Moving soon? We handle everything — Ejari, DEWA, movers, cleaning. One message away.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20help%20with%20my%20move."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-main-hero"
            >
              <Button className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-base rounded-2xl shadow-2xl shadow-emerald-900/50 transition-all">
                <MessageCircle className="w-6 h-6 mr-3" /> Start Your Move
              </Button>
            </a>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">No signup · No account · 24h WhatsApp response</p>
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
          DUBAI RENTAL INTELLIGENCE — Comparison Hub
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              <BarChart3 className="w-3 h-3" /> Dubai Rental Intelligence
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Is Your Rent Still <span className="text-violet-400">Competitive?</span>
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

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/971523946311?text=Hello%20DeliWer,%20I%20want%20a%20free%20rental%20analysis%20for%20my%20apartment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-lg shadow-violet-900/30"
              data-testid="cta-rental-analysis"
            >
              <MessageCircle className="w-4 h-4" /> Analyse My Rent
            </a>
            <Link href="/move-vs-renew-dubai">
              <Button variant="outline" className="border-violet-500/40 text-violet-400 hover:bg-violet-500/10 font-black rounded-2xl px-6 h-10 text-sm transition-all" data-testid="cta-move-vs-renew">
                <Calculator className="w-4 h-4 mr-2" /> Move vs Renew Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED — concise services strip */}
      <section className="relative py-14 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
            alt="Home setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/97 via-slate-950/95 to-slate-950" />
        </div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">One coordinator. Everything sorted.</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">What DeliWer handles for you</h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {BUNDLE_SERVICES.map((service, i) => (
              <div key={i} className="group flex flex-col items-center gap-2 py-3 px-2 bg-slate-800 border border-slate-600/60 hover:border-emerald-500/70 hover:bg-slate-700 rounded-xl transition-all text-center">
                <span className="text-xl group-hover:scale-110 transition-transform">{service.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-tight text-gray-200 group-hover:text-emerald-400 transition-colors leading-tight">{service.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: "🏠", label: "Move In", href: "/move-in-package", testid: "tile-move-in" },
              { icon: "📄", label: "Ejari", href: "/ejari-registration", testid: "tile-ejari" },
              { icon: "⚡", label: "DEWA", href: "/dewa-activation", testid: "tile-dewa" },
              { icon: "🚪", label: "Move Out", href: "/move-out-package", testid: "tile-move-out" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-2 py-3 px-3 bg-slate-800 border border-slate-600/60 hover:border-emerald-500/70 hover:bg-slate-700 rounded-xl transition-all"
                data-testid={item.testid}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tight text-gray-200 group-hover:text-emerald-400 transition-colors">{item.label}</span>
                <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link href="/start">
              <Button
                data-testid="button-bundle-start"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-11 text-sm shadow-lg shadow-emerald-900/30 transition-all"
              >
                Start My Move-In Plan
              </Button>
            </Link>
            <Link href="/concierge-pricing">
              <Button variant="outline" className="border-white/20 text-gray-400 hover:text-white hover:border-white/40 font-black rounded-xl px-6 h-11 text-sm transition-all">
                View Pricing →
              </Button>
            </Link>
          </div>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No hidden fees · You pay vendors directly at market rates</p>
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

      {/* FINAL CTA */}
      <section className="relative py-20 px-6 text-center space-y-8 bg-emerald-600 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={lifestyleImages.finalCTA} alt="Happy resident in home" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-600/80 to-emerald-600" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950">Ready to move in stress-free?</h2>
          <p className="text-lg text-emerald-950 font-bold uppercase italic">Pay only vendor rates. DeliWer handles everything else.</p>
        </div>
        <Link href="/start">
          <Button 
            size="lg" 
            className="relative z-10 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl transition-all active-elevate-2 group"
            data-testid="button-final-cta"
          >
            <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Start Your Move-In Plan
          </Button>
        </Link>
      </section>

      {/* DISTRIBUTION PARTNERS */}
      <section className="py-14 px-4 bg-slate-900 text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Distribution Partners</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Property Managers & Brokers</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1">
                {["Reduce admin overhead", "Happier tenants", "Faster apartment turnaround"].map((item, i) => (
                  <span key={i} className="text-gray-400 text-sm font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />{item}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/partners" className="shrink-0">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-8 h-12 text-sm shadow-xl">
                Partner With DeliWer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM PARTNERS */}
      <section className="py-10 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0 space-y-1">
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Ecosystem Partners</p>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Service delivery network</p>
            </div>
            <div className="flex-1 border-l border-white/10 pl-6 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm">TC</div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/50">Trustee Centers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm">SGM</div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/50">Smart Global Movers</span>
              </div>
            </div>
          </div>
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
    </div>
  );
}
