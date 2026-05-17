import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Plane,
  Ship,
  Globe,
  ArrowRight,
  MapPin,
  TrendingUp,
  Zap,
  Shield,
  Building2,
  Package,
  Network,
  Anchor,
  Route,
  Target,
  ChevronDown,
  Star,
  Clock,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Navigation,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: "4,800km", label: "Dubai → Gawadar Air Corridor", icon: Plane },
  { value: "62%", label: "Cost Savings vs. Strait of Hormuz Routes", icon: TrendingUp },
  { value: "48hr", label: "Door-to-Port Delivery Window", icon: Clock },
  { value: "$62B", label: "CPEC Infrastructure Investment", icon: Building2 },
];

const ROUTE_MILESTONES = [
  {
    city: "Dubai",
    role: "Air Freight Hub",
    detail: "DXB & DWC as the world's largest cargo transit airports — the nerve centre of the new trade arc.",
    icon: Plane,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    city: "Air Charter Bridge",
    role: "Bypass Corridor",
    detail: "Dedicated charter lanes circumvent the Strait of Hormuz entirely — zero dependency on the contested waterway.",
    icon: Wind,
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
  },
  {
    city: "Gawadar Port",
    role: "Deep-Sea Anchor",
    detail: "Pakistan's CPEC-built deep-sea port rises as the successor to Jebel Ali — now the primary Indian Ocean gateway.",
    icon: Anchor,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    city: "INSTC Network",
    role: "Inland Distribution",
    detail: "International North–South Transport Corridor onward connections to Central Asia, Russia and Europe.",
    icon: Route,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
  },
];

const ADVANTAGES = [
  {
    title: "Hormuz-Free Routing",
    desc: "The Strait of Hormuz handles ~21% of global oil and a significant share of cargo. Ongoing Middle East conflict has made shippers acutely aware of this single point of failure. The Dubai–Gawadar corridor makes it irrelevant.",
    icon: Shield,
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Jebel Ali Succession",
    desc: "With Jebel Ali's regular commercial operations severely disrupted by regional hostilities, Gawadar — backed by $62B in Chinese CPEC investment — has emerged as the ready-built alternative deep-water port on the Arabian Sea.",
    icon: Anchor,
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "CPEC & INSTC Convergence",
    desc: "The China–Pakistan Economic Corridor and the International North–South Transport Corridor converge at Gawadar — creating the first multi-modal interchange directly linking East Asia, South Asia, Central Asia, and the Gulf in a single logistics chain.",
    icon: Network,
    accent: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    title: "Air-to-Sea Feeder Model",
    desc: "High-value, time-sensitive cargo flies Dubai–Gawadar via dedicated charter. At Gawadar it transfers to deep-sea vessels for onward routing at ocean-freight cost. A two-speed supply chain that was never possible before.",
    icon: Layers,
    accent: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
];

const PIONEER_POINTS = [
  "First-mover logistics operator on the Dubai–Gawadar air charter corridor",
  "Exclusive feeder service agreements with Gawadar Port Authority partners",
  "Integrated ChainTrack digital track-and-trace across air and sea legs",
  "DeliWer concierge last-mile delivery at both origin (Dubai) and destination (GWD hinterland)",
  "Unified pricing and documentation — one contract, two transport modes",
  "Compliance-ready for Pakistani customs, CPEC Free Zone regulations, and UAE re-export rules",
];

const PARTNER_TIERS = [
  {
    tier: "Freight Forwarder",
    desc: "Connect your existing client base to the corridor with zero infrastructure investment. Use our charter slots and port handling on demand.",
    features: ["Block-space agreement on charter flights", "Port handling included", "API-connected track & trace", "Dedicated account manager"],
    cta: "Apply as Freight Partner",
    highlight: false,
  },
  {
    tier: "Trade Route Anchor",
    desc: "Commit to a monthly volume threshold and unlock guaranteed slot priority, bonded warehousing at Gawadar Free Zone, and co-branded documentation.",
    features: ["Priority charter slot allocation", "Bonded warehouse in Gawadar FZ", "Co-branded shipping documentation", "24/7 operations desk", "Monthly market intelligence briefs"],
    cta: "Apply as Anchor Partner",
    highlight: true,
  },
  {
    tier: "Origin Consolidator",
    desc: "Collect, consolidate, and hand off cargo in Dubai or other UAE hubs. ChainTrack handles everything from the cargo gate onward.",
    features: ["Dubai DXB/DWC cargo acceptance", "Consolidation & palletisation", "Same-day uplift access", "Customs clearance support"],
    cta: "Apply as Consolidator",
    highlight: false,
  },
];

export default function ChainTrackLogisticsPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Fixed Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-950/95 backdrop-blur border-b border-slate-800" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/logistics" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
              <Anchor className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-none">
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-white text-base tracking-tight">DeliWer</span>
                <span className="font-black text-amber-400 text-base tracking-widest">LOGISTICS</span>
              </div>
              <p className="text-[9px] text-amber-500/60 font-black uppercase tracking-widest mt-0.5">Powered by ChainTrack · Dubai–Gawadar</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#corridor" className="hover:text-white transition-colors">The Corridor</a>
            <a href="#opportunity" className="hover:text-white transition-colors">Why Now</a>
            <a href="#pioneer" className="hover:text-white transition-colors">Our Edge</a>
            <a href="#partners" className="hover:text-white transition-colors">Partners</a>
            <Link href="/freight-broker" className="hover:text-amber-400 transition-colors">Freight Brokers</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/logistics-funnel">
              <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 hidden md:flex gap-1.5 text-xs font-bold">
                Join Network
              </Button>
            </Link>
            <Link href="/logistics-funnel">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5">
                Apply as Freight Broker
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        {/* World map grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <AnimatedItem>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-4 py-1.5 text-sm font-medium mb-6 inline-flex">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                The Post-Hormuz Trade Era Begins
              </Badge>
            </AnimatedItem>

            <AnimatedItem>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
                <span className="block text-white">Dubai ↔ Gawadar</span>
                <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent mt-2">
                  The New Trade Spine
                </span>
              </h1>
            </AnimatedItem>

            <AnimatedItem>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
                Jebel Ali has ceased regular commercial operations. The Strait of Hormuz is a contested chokepoint.
                Gawadar — backed by CPEC and INSTC — is the world's next great deep-sea port.
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <p className="text-lg text-amber-300 font-semibold max-w-3xl mx-auto mb-10">
                ChainTrack Logistics is the first integrated air-charter-to-deep-sea feeder operator on this corridor — launching now.
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/logistics-funnel">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2">
                    Join as Freight Broker
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#corridor">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 gap-2">
                    Explore the Corridor
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          {/* Route Visual */}
          <AnimatedSection className="mt-20">
            <AnimatedItem>
              <div className="relative flex items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
                    <Plane className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">DUBAI</p>
                  <p className="text-xs text-amber-400">DXB / DWC</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 max-w-xs">
                  <div className="flex items-center w-full gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500 to-sky-500" />
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <div className="flex-1 h-px bg-gradient-to-r from-sky-500 to-emerald-500" />
                  </div>
                  <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-xs px-3">
                    Air Charter Bypass
                  </Badge>
                  <p className="text-xs text-slate-500">Hormuz-free corridor</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                    <Anchor className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">GAWADAR</p>
                  <p className="text-xs text-emerald-400">GWD Deep Sea</p>
                </div>
                <div className="hidden md:flex flex-col items-center gap-1 max-w-xs flex-1">
                  <div className="flex items-center w-full gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-violet-500" />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-500 to-slate-500" />
                  </div>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs px-3">
                    CPEC / INSTC
                  </Badge>
                  <p className="text-xs text-slate-500">Inland distribution</p>
                </div>
                <div className="hidden md:block text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-violet-500/30">
                    <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">WORLD</p>
                  <p className="text-xs text-violet-400">Asia · EU · CIS</p>
                </div>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          <div className="mt-16 flex justify-center">
            <a href="#stats" className="text-slate-500 hover:text-slate-300 transition-colors animate-bounce">
              <ChevronDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="py-16 px-6 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <AnimatedItem key={s.label}>
                <div className="text-center">
                  <s.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                  <p className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-sm text-slate-400 leading-tight">{s.label}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── THE CORRIDOR ── */}
      <section id="corridor" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30 mb-4">
                The Route Architecture
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Four Nodes. One Unbreakable Chain.
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Each node is a precision-engineered handoff point. Together they form a logistics arc that no other operator has yet connected end-to-end.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-6">
            {ROUTE_MILESTONES.map((m) => (
              <AnimatedItem key={m.city}>
                <div className={`rounded-2xl border p-8 ${m.bg} ${m.border} h-full`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-5`}>
                    <m.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{m.city}</h3>
                  <Badge className="bg-white/10 text-slate-300 border-white/10 text-xs mb-4">{m.role}</Badge>
                  <p className="text-slate-300 leading-relaxed">{m.detail}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY NOW ── */}
      <section id="opportunity" className="py-24 px-6 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4 gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                The Geopolitical Shift
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why This Window Is Opening Now
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                A confluence of four structural forces has permanently altered the global trade map — and created the single largest logistics opportunity of the decade.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-6">
            {ADVANTAGES.map((a) => (
              <AnimatedItem key={a.title}>
                <Card className="bg-slate-900 border-slate-700 p-8 h-full hover:border-slate-600 transition-colors">
                  <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center mb-5`}>
                    <a.icon className={`w-6 h-6 ${a.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{a.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{a.desc}</p>
                </Card>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          {/* The big quote */}
          <AnimatedSection className="mt-16">
            <AnimatedItem>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-10 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-4xl mx-auto">
                  "For the first time in history, Dubai's aviation supremacy and Gawadar's deep-water access can be fused into a single, Hormuz-independent supply chain that is faster, cheaper, and more resilient than anything that has come before."
                </p>
                <p className="text-amber-400 mt-6 font-semibold">— ChainTrack Logistics Founding Strategy, 2025</p>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PIONEER EDGE ── */}
      <section id="pioneer" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedItem>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                First Mover Advantage
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                DeliWer & ChainTrack — The Pioneer Pair
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                The Dubai–Gawadar corridor is nascent. Standards are unwritten, slots are unclaimed, and partnerships are unmade. ChainTrack Logistics is positioning now — before incumbents arrive — to define the rules of engagement on the world's most strategically important new trade lane.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                Backed by DeliWer's last-mile concierge network in Dubai and a growing partner ecosystem spanning freight forwarding, customs brokerage, warehousing, and digital track-and-trace, we are building the operating infrastructure before demand peaks — a classic pioneer position.
              </p>
              <a href="#partners">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                  Secure Your Position
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </AnimatedItem>

            <AnimatedItem>
              <div className="space-y-4">
                {PIONEER_POINTS.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900/60 to-slate-950 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 mb-4">The Model</Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Air-to-Sea Feeder — How It Works
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Origin Consolidation",
                desc: "Cargo collected across UAE warehouses and consolidated at DXB or DWC cargo terminals through DeliWer's last-mile network.",
                icon: Package,
                color: "text-amber-400",
              },
              {
                step: "02",
                title: "Charter Air Bridge",
                desc: "Dedicated freighter operates the Dubai–Gawadar sector. Block-space for partners on scheduled uplift. Sub-24-hour transit.",
                icon: Plane,
                color: "text-sky-400",
              },
              {
                step: "03",
                title: "Port Feeder & Onward",
                desc: "Cargo transfers at Gawadar to deep-sea vessel or CPEC rail. Full track-and-trace handoff via ChainTrack platform.",
                icon: Ship,
                color: "text-emerald-400",
              },
            ].map((s, i) => (
              <AnimatedItem key={s.step} className="relative">
                <div className="p-8 text-center">
                  <div className="text-6xl font-black text-slate-800 mb-4">{s.step}</div>
                  <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-5`}>
                    <s.icon className={`w-8 h-8 ${s.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-0 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── PARTNER TIERS ── */}
      <section id="partners" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">Partner Network</Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Join the Corridor
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Three entry points. One network. Become part of the infrastructure that will define Middle East–South Asia logistics for the next generation.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-6">
            {PARTNER_TIERS.map((t) => (
              <AnimatedItem key={t.tier}>
                <div className={`rounded-2xl border p-8 h-full flex flex-col transition-all duration-300 ${
                  t.highlight
                    ? "border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-slate-900 shadow-lg shadow-amber-500/10"
                    : "border-slate-700 bg-slate-900 hover:border-slate-600"
                }`}>
                  {t.highlight && (
                    <Badge className="bg-amber-500 text-slate-950 font-bold self-start mb-4 px-3">
                      Most Strategic
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3">{t.tier}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.desc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Star className={`w-4 h-4 flex-shrink-0 mt-0.5 ${t.highlight ? "text-amber-400" : "text-slate-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:logistics@chaintrack.com">
                    <Button
                      className={`w-full font-semibold gap-2 ${
                        t.highlight
                          ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                          : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                      }`}
                    >
                      {t.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── DELIWER INTEGRATION ── */}
      <section className="py-24 px-6 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <AnimatedItem>
              <Badge className="bg-slate-700 text-slate-300 border-slate-600 mb-4">Ecosystem Integration</Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl font-black text-white mb-4">
                Powered by the DeliWer Ecosystem
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                ChainTrack Logistics is not a standalone operator. It is the international freight layer of a fully integrated urban and global services platform — giving every shipment access to concierge-grade handling at origin and destination.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "DeliWer Express", desc: "Last-mile pickup & delivery in Dubai", icon: Navigation },
              { name: "ChainTrack B2B", desc: "Wholesale procurement & track-and-trace", icon: BarChart3 },
              { name: "Fulfillment Hub", desc: "Dubai warehousing & order management", icon: Package },
              { name: "Partner Network", desc: "500+ freight & logistics professionals", icon: Users },
            ].map((item) => (
              <AnimatedItem key={item.name}>
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center hover:border-slate-700 transition-colors">
                  <item.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white text-sm mb-2">{item.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <AnimatedItem>
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber-500/30">
                <Target className="w-10 h-10 text-white" />
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                The window is open.<br />
                <span className="text-amber-400">Be first through it.</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                History's most significant logistics corridor realignment happens once. ChainTrack Logistics is building the operating system for it — and we are looking for the partners who move first.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:logistics@chaintrack.com">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-10 gap-2">
                    Contact the Logistics Team
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <Link href="/chaintrack">
                  <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:text-white gap-2">
                    Visit ChainTrack B2B Platform
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-md shadow-amber-500/20">
                <Anchor className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-white text-sm">DeliWer</span>
                  <span className="font-black text-amber-400 text-sm tracking-wider">LOGISTICS</span>
                </div>
                <p className="text-slate-500 text-xs">Powered by ChainTrack · DeliWer Group</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="mailto:logistics@chaintrack.com" className="hover:text-slate-300 transition-colors">
                logistics@chaintrack.com
              </a>
              <span>·</span>
              <Link href="/chaintrack" className="hover:text-slate-300 transition-colors">
                ChainTrack B2B
              </Link>
              <span>·</span>
              <Link href="/" className="hover:text-slate-300 transition-colors">
                DeliWer
              </Link>
            </div>
            <p className="text-slate-600 text-xs">
              © 2025 ChainTrack Logistics · DeliWer Group
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
