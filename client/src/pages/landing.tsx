import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Zap, 
  LogOut,
  Key,
  MessageCircle,
  CheckCircle2,
  Shield,
  FileText,
  Truck,
  Droplets,
  ShieldCheck,
  Package,
  Clock,
  Star,
  Building2,
  PhoneCall,
  Users,
  ChevronDown,
  Home,
  ArrowLeftRight,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import { useEffect, useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { RelocationFunnel, FunnelScenario } from "@/components/relocation-funnel";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const HERO_LIFESTYLE_IMG = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80";

// Unused local import removed; heroBg replaced by HERO_LIFESTYLE_IMG above

// Lifestyle images for cards and sections
const lifestyleImages = {
  moveIn: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80",
  moveOut: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  brokers: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
  tenants: "https://images.unsplash.com/photo-1554995207-c18fa93d128d?w=800&q=80",
  landlords: "https://images.unsplash.com/photo-1512918766671-ed6a99be0211?w=800&q=80",
  process: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  justGotKeys: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  finalCTA: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
};

const SIZE_OPTIONS = [
  { key: "studio", label: "Studio", range: "AED 2,800 – 3,600" },
  { key: "1br", label: "1 Bedroom", range: "AED 3,200 – 4,200" },
  { key: "2br", label: "2 Bedrooms", range: "AED 3,800 – 5,200" },
  { key: "3br", label: "3 Bedrooms", range: "AED 4,500 – 6,500" },
];

const BUNDLE_SERVICES = [
  { icon: <Truck className="w-4 h-4" />, label: "Movers coordination" },
  { icon: <FileText className="w-4 h-4" />, label: "Ejari registration" },
  { icon: <Zap className="w-4 h-4" />, label: "DEWA activation support" },
  { icon: <Shield className="w-4 h-4" />, label: "Water / air readiness check" },
  { icon: <Droplets className="w-4 h-4" />, label: "Welcome shower filter & installation" },
  { icon: <Clock className="w-4 h-4" />, label: "Move-in vendor scheduling" },
];

const TRUST_BADGES = [
  { icon: <ShieldCheck className="w-4 h-4" />, label: "No Hidden Fees" },
  { icon: <Package className="w-4 h-4" />, label: "No Vendor Hassle" },
  { icon: <PhoneCall className="w-4 h-4" />, label: "One Contact For Everything" },
];

// Vendor fee splits — never shown to tenants
const VENDOR_SPLITS = {
  movers: { min: 10, max: 15 },
  ejari: { min: 10, max: 20 },
  waterFilter: { min: 15, max: 20 },
  dewa: { min: 10, max: 10 },
};

// Affiliate commission tiers — never shown to tenants
const AFFILIATE_TIERS: Record<string, number> = {
  influencer: 20,
  agent: 25,
  corporate: 30,
  strategic: 35,
};

export default function LandingPage() {
  const [selectedSize, setSelectedSize] = useState("1br");
  const [refCode, setRefCode] = useState<string | null>(null);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelScenario, setFunnelScenario] = useState<FunnelScenario | undefined>(undefined);

  const openFunnel = (scenario?: FunnelScenario) => {
    setFunnelScenario(scenario);
    setFunnelOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Referral tracking: read ?ref= param and persist to sessionStorage
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setRefCode(ref);
      sessionStorage.setItem("deliwer_ref", ref);
      sessionStorage.setItem("deliwer_ref_ts", Date.now().toString());
      // Fire a lightweight tracking event
      fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateCode: ref, event: "page_visit" }),
      }).catch(() => {});
    } else {
      const stored = sessionStorage.getItem("deliwer_ref");
      if (stored) setRefCode(stored);
    }
  }, []);

  const handleBundleWhatsApp = () => {
    const size = SIZE_OPTIONS.find(s => s.key === selectedSize) ?? SIZE_OPTIONS[1];
    openWhatsApp(buildWhatsAppMessage({
      intro: `Hi DeliWer, I'd like to book the Starter Move-In Bundle for a ${size.label} apartment. Estimated cost: ${size.range}. Please coordinate everything for me.`,
    }));
  };

  const currentSize = SIZE_OPTIONS.find(s => s.key === selectedSize) ?? SIZE_OPTIONS[1];

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Move-In Services Dubai | Water, Ejari & Home Setup | DeliWer"
        description="Move into your Dubai home stress-free. DeliWer handles water setup, Ejari registration, DEWA activation, and move-in readiness. Pay only normal vendor rates — no extra charges."
      />
      <Navigation />

      {/* ============================================
          RELOCATION DECISION FUNNEL — Above the Fold
         ============================================ */}
      <section className="py-16 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" /> UAE Relocation Concierge
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase">
              Moving Home in Dubai?<br />
              <span className="text-emerald-400">Relax. We Handle It.</span>
            </h2>
            <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
              From Ejari to movers, cleaning, utilities and water readiness — everything coordinated in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            <button
              data-testid="funnel-btn-moving-in"
              onClick={() => openFunnel("moving-in")}
              className="group flex flex-col items-center gap-3 p-6 bg-slate-900 border-2 border-emerald-500/30 hover:border-emerald-500 rounded-2xl transition-all text-left"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <Home className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <div className="font-black text-white uppercase text-sm tracking-tight">Moving Into a New Home</div>
                <div className="text-[11px] text-gray-500 font-medium">Ejari, DEWA, movers & setup</div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 ml-auto" />
            </button>

            <button
              data-testid="funnel-btn-moving-within"
              onClick={() => openFunnel("moving-within")}
              className="group flex flex-col items-center gap-3 p-6 bg-slate-900 border-2 border-blue-500/30 hover:border-blue-500 rounded-2xl transition-all text-left"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <ArrowLeftRight className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-1">
                <div className="font-black text-white uppercase text-sm tracking-tight">Moving to a Cheaper Rent</div>
                <div className="text-[11px] text-gray-500 font-medium">Full relocation coordination</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400 ml-auto" />
            </button>

            <button
              data-testid="funnel-btn-leaving"
              onClick={() => openFunnel("leaving")}
              className="group flex flex-col items-center gap-3 p-6 bg-slate-900 border-2 border-amber-500/30 hover:border-amber-500 rounded-2xl transition-all text-left"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                <LogOut className="w-6 h-6 text-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="font-black text-white uppercase text-sm tracking-tight">Leaving Dubai / Exit Service</div>
                <div className="text-[11px] text-gray-500 font-medium">Exit concierge from 900 AED</div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 ml-auto" />
            </button>
          </motion.div>

          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">
            Trusted relocation partners across Dubai, Sharjah & Ajman · Coordinator confirms within 10 minutes
          </p>
        </div>
      </section>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden text-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_LIFESTYLE_IMG})` }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl w-full space-y-8 relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase text-center drop-shadow-2xl">
              Move Into Your New Home<br />
              <span className="text-emerald-500">Without the Setup Stress</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white font-bold max-w-2xl mx-auto leading-tight uppercase tracking-tight text-center drop-shadow-lg">
              Pay only what movers and utilities normally cost.<br />
              <span className="text-emerald-400">DeliWer coordinates everything for you.</span>
            </p>

            {/* Price anchor */}
            <div className="inline-block bg-black/40 border border-emerald-500/30 rounded-2xl px-8 py-4 mx-auto">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-1">Typical Dubai Move-In Cost</p>
              <p className="text-3xl font-black text-white" data-testid="text-hero-price-anchor">AED 3,250 – 4,500</p>
              <p className="text-emerald-400 font-black uppercase text-xs tracking-widest mt-1">Your cost with DeliWer is exactly the same.</p>
            </div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/start">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 group border-2 border-emerald-400/20"
                data-testid="button-hero-start-plan"
              >
                Start Your Move-In Plan
              </Button>
            </Link>
          </div>
          <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-sm text-center mt-6 drop-shadow-md bg-black/20 py-2 rounded-full inline-block px-8 mx-auto">
            We handle everything — you pay only vendor market rates.
          </p>
        </div>
      </section>

      {/* AUDIENCE CARDS — immediately below fold */}
      <section className="py-16 px-6 bg-slate-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">What Do You Need Help With?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="bg-white/5 border-emerald-500/30 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition-all group relative overflow-hidden ring-1 ring-emerald-500/20">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>
              <div className="relative h-44 overflow-hidden rounded-t-3xl">
                <img src={lifestyleImages.tenants} alt="Tenant move-in" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
              </div>
              <div className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-black uppercase text-emerald-400">For Tenants</h3>
                <p className="text-gray-400 font-medium text-sm">Ejari, DEWA, movers, cleaning — all coordinated from one WhatsApp message.</p>
              </div>
              <Link href="/start" className="px-6 pb-6">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm h-11 shadow-lg shadow-emerald-900/40" data-testid="button-router-tenants">
                  Get Started →
                </Button>
              </Link>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-3xl flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="relative h-44 overflow-hidden rounded-t-3xl">
                <img src={lifestyleImages.landlords} alt="Landlord support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
              </div>
              <div className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-black uppercase text-white">For Landlords</h3>
                <p className="text-gray-400 font-medium text-sm">Streamline tenant transitions, Ejari cancellations, and property handovers.</p>
              </div>
              <Link href="/exit" className="px-6 pb-6">
                <Button className="w-full border-white/10 hover:bg-white/5 text-white font-black rounded-xl text-sm h-11" variant="outline" data-testid="button-router-landlords">
                  Manage Property →
                </Button>
              </Link>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-3xl flex flex-col justify-between hover:border-purple-500/50 transition-all group relative overflow-hidden">
              <div className="relative h-44 overflow-hidden rounded-t-3xl">
                <img src={lifestyleImages.brokers} alt="Broker partnership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
              </div>
              <div className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-black uppercase text-white">For Brokers</h3>
                <p className="text-gray-400 font-medium text-sm">Earn commission referring tenants. DeliWer handles everything — you get paid.</p>
              </div>
              <Link href="/partners" className="px-6 pb-6">
                <Button className="w-full border-white/10 hover:bg-white/5 text-white font-black rounded-xl text-sm h-11" variant="outline" data-testid="button-router-brokers">
                  Partner With Us →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================
          STARTER BUNDLE CARD
         ============================================ */}
      <section id="starter-bundle" className="py-20 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Section label */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" /> DeliWer Move-In Starter
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.92]">
              One Bundle. <span className="text-emerald-400">Everything Handled.</span>
            </h2>
          </div>

          {/* Main bundle card */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">

            {/* Left — What's included + trust */}
            <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl shadow-emerald-500/5">
              <div className="p-8 space-y-6 flex-1">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    Move Into Your New Home — Without the Setup Stress
                  </h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Pay only what movers and utilities normally cost. DeliWer coordinates everything for you.
                  </p>
                </div>

                {/* Price anchor block */}
                <div className="bg-emerald-950/50 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Typical Dubai Move-In Cost</p>
                      <p className="text-2xl font-black text-white" data-testid="text-bundle-price-anchor">AED 3,250 – 4,500</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Cost with DeliWer</p>
                      <p className="text-emerald-400 font-black text-sm uppercase tracking-tight">Exactly the same —<br />we handle everything.</p>
                    </div>
                  </div>
                </div>

                {/* Services list */}
                <div className="space-y-2.5">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">What's included</p>
                  {BUNDLE_SERVICES.map((service, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-emerald-400 shrink-0">{service.icon}</span>
                      <span className="text-gray-200 font-medium text-sm">{service.label}</span>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {TRUST_BADGES.map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-wider" data-testid={`badge-bundle-${i}`}>
                      {badge.icon} {badge.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <div className="px-8 pb-8">
                <Link href="/start">
                  <Button
                    data-testid="button-bundle-start"
                    size="lg"
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl text-sm shadow-xl shadow-emerald-500/20 transition-all"
                  >
                    Start Your Move-In Plan
                  </Button>
                </Link>
                <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-3">No hidden fees · No DeliWer markup · Just vendor market rates</p>
                <Link href="/concierge-pricing" className="block text-center mt-3">
                  <span className="text-[10px] text-emerald-600 hover:text-emerald-400 font-black uppercase tracking-widest transition-colors">View concierge plan options →</span>
                </Link>
              </div>
            </div>

            {/* Right — Cost estimator */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col">
              <div className="p-8 space-y-6 flex-1">
                <div className="space-y-1">
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Optional Cost Guide</p>
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">Estimate by Apartment Size</h3>
                  <p className="text-gray-500 text-xs font-medium">Estimates only — based on typical Dubai market rates. Not final vendor quotes.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      key={size.key}
                      data-testid={`btn-size-${size.key}`}
                      onClick={() => setSelectedSize(size.key)}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all font-black text-sm uppercase tracking-tight text-center ${
                        selectedSize === size.key
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/25"
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      {size.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic estimate */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-3">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Estimated Market Cost Range</p>
                  <p className="text-3xl font-black text-emerald-400" data-testid="text-estimate-range">{currentSize.range}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    Your cost with DeliWer: the same. We coordinate — vendors quote directly.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    "Movers: market rate from vetted suppliers",
                    "Ejari: standard government + trustee fee",
                    "DEWA: official activation + security deposit",
                    "Water filter: AquaCafe standard supply price",
                  ].map((note, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-8 pb-8">
                <Button
                  data-testid="button-bundle-whatsapp"
                  size="lg"
                  className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl text-sm transition-all"
                  onClick={handleBundleWhatsApp}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp for a Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              "✔ Pay only normal vendor rates",
              "✔ DeliWer coordination at no extra charge",
              "✔ One WhatsApp contact manages everything",
              "✔ Verified & insured vendors",
            ].map((item, i) => (
              <span key={i} className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">{item}</span>
            ))}
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

      {/* PROBLEM SECTION */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">The Real Frustration of Ejari</h2>
            <div className="h-1 w-24 bg-emerald-500 mx-auto" />
            <p className="text-gray-300 font-bold text-xl max-w-3xl mx-auto leading-relaxed">
              Ejari registration often requires understanding complex documentation, coordinating with landlords or busy agents, navigating confusing online portals, or spending hours visiting trustee centers.
            </p>
            <div className="bg-emerald-500/10 border-2 border-emerald-500/20 p-8 rounded-[2rem] transform hover:scale-[1.02] transition-transform">
              <p className="text-emerald-400 font-black uppercase text-2xl tracking-tighter">Without an Ejari certificate, you cannot activate utilities or move into your new home.</p>
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

      {/* PROCESS VISUALIZATION */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Your Move-In Journey</h2>
            <p className="text-emerald-500 font-black uppercase tracking-widest text-sm">DeliWer simplifies Step 1 for a faster move-in</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "Step 1", title: "Register Ejari", icon: FileText, highlight: true },
              { step: "Step 2", title: "Activate Utilities", icon: Zap },
              { step: "Step 3", title: "Prepare Your Home", icon: Key },
              { step: "Step 4", title: "Move In Comfortably", icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className={`text-center space-y-4 p-6 rounded-3xl transition-all ${item.highlight ? 'bg-emerald-500/10 border border-emerald-500/30 ring-1 ring-emerald-500/20' : 'bg-white/5 border border-white/10'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 ${item.highlight ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className={`font-black uppercase text-xs tracking-widest ${item.highlight ? 'text-emerald-500' : 'text-gray-500'}`}>{item.step}</span>
                  <h3 className="font-black uppercase text-white text-sm">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIEF BENEFITS */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: MessageCircle, title: "Convenience from Home", desc: "No need to visit service centers" },
              { icon: FileText, title: "Reduced Paperwork", desc: "Clear guidance on requirements" },
              { icon: Zap, title: "Faster Completion", desc: "Skip the move-in delays" },
              { icon: Shield, title: "Smoother Transition", desc: "Professional coordination" }
            ].map((benefit, i) => (
              <div key={i} className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <benefit.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-black uppercase text-white text-sm tracking-tight">{benefit.title}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">{benefit.desc}</p>
              </div>
            ))}
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

      {/* Partner Strip */}
      <section className="px-4 py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-6">
          <PartnerStrip />
          <div className="text-center">
            <Link href="/partners">
              <Button 
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase text-xs px-6 py-3 rounded-xl"
              >
                Become a Partner →
              </Button>
            </Link>
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
