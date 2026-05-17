import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Anchor,
  Plane,
  Truck,
  Package,
  ArrowRight,
  CheckCircle2,
  Globe,
  Route,
  Building2,
  BarChart3,
  Users,
  DollarSign,
  Clock,
  ChevronDown,
  Zap,
  Shield,
  Network,
  MapPin,
  Star,
  FileText,
  Layers,
  TrendingUp,
  Warehouse,
  Ship,
  Target,
  AlertTriangle,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Anim({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}
function Item({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>;
}

const HUBS = [
  {
    rank: "Primary Hub",
    name: "Gawadar Port",
    country: "Pakistan · CPEC Free Zone",
    role: "Deep-Sea Aggregation Centre",
    desc: "All ocean-freight bulk consolidates here. CPEC-backed infrastructure, bonded warehousing, and direct rail connections to Central Asia and China make Gawadar the nerve centre of the new trade arc.",
    highlights: ["Bonded CPEC Free Zone warehouse", "Deep-water vessel berthing to 100,000 DWT", "Rail link: CPEC corridor northward", "INSTC connection westward to Iran & Russia"],
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/5",
    iconColor: "text-emerald-400",
    badgeCls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    icon: Anchor,
  },
  {
    rank: "Secondary Hub",
    name: "Dubai South — DWC",
    country: "UAE · Dubai World Central",
    role: "Air-Freight Aggregation Centre",
    desc: "Al Maktoum International Airport (DWC) within Dubai South Free Zone is the world's largest cargo-ready airport footprint. All air-mode freight stages here before charter uplift to Gawadar.",
    highlights: ["Al Maktoum ICAO-certified cargo aprons", "Dubai South Free Zone bonded storage", "Same-day consolidation & uplift", "DeliWer Express last-mile pickup integration"],
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-400",
    badgeCls: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    icon: Plane,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "You Aggregate",
    desc: "Source cargo from your client base — importers, exporters, manufacturers, e-commerce merchants. Collect shipments across your region.",
    icon: Users,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    step: "02",
    title: "You Deliver to Hub",
    desc: "Deliver consolidated cargo to either Dubai South (DWC) for air-mode, or directly to Gawadar Port for sea-mode. ChainTrack accepts at the gate.",
    icon: Truck,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    step: "03",
    title: "ChainTrack Moves It",
    desc: "We handle charter uplift (air) or deep-sea vessel loading (sea), customs documentation, CPEC Free Zone clearance, and onward distribution.",
    icon: Route,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    step: "04",
    title: "You Earn Commission",
    desc: "Earn per-CBM or per-kg aggregation fees plus tiered performance bonuses. Monthly settlement. Full track-and-trace visibility via the ChainTrack Broker Portal.",
    icon: DollarSign,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const EARNINGS = [
  { tier: "Starter", vol: "Up to 10 CBM/mo", rate: "AED 28–35 / CBM", bonus: "—", color: "border-slate-700 bg-slate-900" },
  { tier: "Silver", vol: "10–50 CBM/mo", rate: "AED 35–45 / CBM", bonus: "+ AED 500 milestone", color: "border-sky-700/60 bg-sky-950/30" },
  { tier: "Gold", vol: "50–200 CBM/mo", rate: "AED 45–58 / CBM", bonus: "+ AED 2,000 milestone", color: "border-amber-700/60 bg-amber-950/20", highlight: true },
  { tier: "Platinum", vol: "200+ CBM/mo", rate: "Negotiated rate", bonus: "Dedicated desk + priority slot", color: "border-violet-700/60 bg-violet-950/30" },
];

const CARGO_TYPES = [
  { name: "General Merchandise", desc: "Consumer goods, FMCG, apparel, electronics", icon: Package },
  { name: "Perishables", desc: "Cold-chain cargo with reefer-trailer pickup at DWC", icon: Zap },
  { name: "Industrial Freight", desc: "Machinery, spare parts, project cargo", icon: Warehouse },
  { name: "E-Commerce Parcels", desc: "Micro-fulfilment batches from UAE sellers to GWD hinterland", icon: Globe },
  { name: "Pharmaceuticals", desc: "GMP-compliant handling, temperature logs", icon: Shield },
  { name: "Hazmat (Class 1–9)", desc: "IATA/IMDG certified lanes on request", icon: AlertTriangle },
];

const BROKER_TOOLS = [
  "Live shipment dashboard with CBM & weight tracking",
  "Digital AWB / BL generation per consignment",
  "Automated customs pre-clearance filing (UAE & Pakistan)",
  "Client-facing tracking portal (white-label optional)",
  "Monthly performance reports & commission statements",
  "Direct line to ChainTrack Gawadar ops desk (WhatsApp)",
];

export default function FreightBrokerPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", country: "", cargoType: "", monthlyVol: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    toast({ title: "Application received!", description: "Our freight team will contact you within 24 hours." });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Fixed Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Route className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-wide">ChainTrack</span>
              <span className="text-amber-400 font-semibold text-sm ml-1 tracking-wider">FREIGHT BROKER</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm text-slate-400">
            <a href="#hubs" className="hover:text-white transition-colors">The Hubs</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#earnings" className="hover:text-white transition-colors">Earnings</a>
            <a href="#apply" className="hover:text-white transition-colors">Apply</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/logistics">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hidden md:flex gap-1.5">
                <Plane className="w-3.5 h-3.5" /> Logistics Overview
              </Button>
            </Link>
            <a href="#apply">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                Apply Now
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <Anim>
            <Item>
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 px-4 py-1.5 text-sm mb-6 inline-flex gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Freight Broker Network — Now Recruiting
              </Badge>
            </Item>
            <Item>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
                <span className="block text-white">Aggregate.</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent mt-1">
                  Consolidate. Ship.
                </span>
              </h1>
            </Item>
            <Item>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
                Become a ChainTrack Freight Broker — aggregate cargo from your market, deliver to our dual hubs, and earn commission on every cubic metre that moves through the Dubai–Gawadar corridor.
              </p>
            </Item>
            <Item>
              <p className="text-lg text-amber-300 font-semibold max-w-3xl mx-auto mb-10">
                Gawadar Port (Primary) · Dubai South DWC (Secondary) · No infrastructure investment required.
              </p>
            </Item>
            <Item>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 gap-2">
                    Apply as Freight Broker
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href="#hubs">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white gap-2">
                    See the Hubs
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </Item>
          </Anim>

          {/* Hub pill indicators */}
          <Anim className="mt-16">
            <Item>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Anchor className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Primary Hub</p>
                    <p className="text-white font-bold">Gawadar Port · GWD</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-8 h-px bg-slate-700" />
                  <span className="text-xs font-bold uppercase tracking-wider">+</span>
                  <div className="w-8 h-px bg-slate-700" />
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-amber-500/30 bg-amber-500/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Secondary Hub</p>
                    <p className="text-white font-bold">Dubai South · DWC</p>
                  </div>
                </div>
              </div>
            </Item>
          </Anim>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="py-12 px-6 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <Anim className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "AED 28–58", sub: "Per CBM commission", icon: DollarSign },
              { val: "48hr", sub: "Hub-to-hub transit", icon: Clock },
              { val: "2 Hubs", sub: "Gawadar + Dubai South", icon: MapPin },
              { val: "Zero CAPEX", sub: "No warehouse investment", icon: TrendingUp },
            ].map((s) => (
              <Item key={s.sub}>
                <s.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-3xl font-black text-white mb-0.5">{s.val}</p>
                <p className="text-sm text-slate-500">{s.sub}</p>
              </Item>
            ))}
          </Anim>
        </div>
      </section>

      {/* ── THE TWO HUBS ── */}
      <section id="hubs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Anim className="text-center mb-16">
            <Item>
              <Badge className="bg-sky-500/15 text-sky-400 border-sky-500/30 mb-4">The Dual-Hub Architecture</Badge>
            </Item>
            <Item>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Two Hubs. One Unbroken Chain.</h2>
            </Item>
            <Item>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Freight brokers feed cargo into either hub. ChainTrack handles the inter-hub bridge and onward distribution — you never touch the air charter or deep-sea logistics.
              </p>
            </Item>
          </Anim>

          <div className="grid md:grid-cols-2 gap-8">
            {HUBS.map((hub) => (
              <Anim key={hub.name}>
                <Item>
                  <div className={`rounded-2xl border ${hub.border} ${hub.bg} p-8 h-full shadow-xl ${hub.glow}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${hub.color} flex items-center justify-center shadow-lg`}>
                        <hub.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge className={`${hub.badgeCls} font-bold text-xs px-3`}>{hub.rank}</Badge>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-1">{hub.name}</h3>
                    <p className={`text-sm font-semibold mb-1 ${hub.iconColor}`}>{hub.country}</p>
                    <p className="text-slate-400 text-xs mb-4 uppercase tracking-wider font-bold">{hub.role}</p>
                    <p className="text-slate-300 leading-relaxed mb-6">{hub.desc}</p>
                    <div className="space-y-2.5">
                      {hub.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${hub.iconColor}`} />
                          <span className="text-slate-300 text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Item>
              </Anim>
            ))}
          </div>

          {/* Flow diagram */}
          <Anim className="mt-12">
            <Item>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <p className="text-center text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Cargo Flow</p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                  {[
                    { label: "Your Clients", sub: "Origin market", color: "text-slate-300 bg-slate-800 border-slate-700" },
                    null,
                    { label: "Dubai South DWC", sub: "Air mode staging", color: "text-amber-300 bg-amber-950/40 border-amber-800/50" },
                    null,
                    { label: "Air Charter Bridge", sub: "DXB/DWC → GWD", color: "text-sky-300 bg-sky-950/40 border-sky-800/50" },
                    null,
                    { label: "Gawadar Port", sub: "Deep-sea feeder", color: "text-emerald-300 bg-emerald-950/40 border-emerald-800/50" },
                    null,
                    { label: "World Markets", sub: "CPEC · INSTC · Ocean", color: "text-violet-300 bg-violet-950/40 border-violet-800/50" },
                  ].map((node, i) =>
                    node === null ? (
                      <ArrowRight key={i} className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    ) : (
                      <div key={i} className={`px-4 py-2.5 rounded-xl border text-center ${node.color}`}>
                        <p className="font-bold text-xs">{node.label}</p>
                        <p className="text-[10px] opacity-60 mt-0.5">{node.sub}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Item>
          </Anim>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <Anim className="text-center mb-16">
            <Item>
              <Badge className="bg-violet-500/15 text-violet-400 border-violet-500/30 mb-4">The Broker Model</Badge>
            </Item>
            <Item>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Four Steps. That's It.</h2>
            </Item>
          </Anim>
          <Anim className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s) => (
              <Item key={s.step}>
                <div className="text-center p-6 rounded-2xl border border-slate-800 bg-slate-900 h-full hover:border-slate-700 transition-colors">
                  <div className="text-5xl font-black text-slate-800 mb-3">{s.step}</div>
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-4`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Item>
            ))}
          </Anim>
        </div>
      </section>

      {/* ── CARGO TYPES ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Anim className="text-center mb-16">
            <Item>
              <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 mb-4">Accepted Cargo</Badge>
            </Item>
            <Item>
              <h2 className="text-4xl font-black text-white mb-4">What You Can Aggregate</h2>
            </Item>
            <Item>
              <p className="text-slate-400 max-w-xl mx-auto">
                The corridor handles general cargo, perishables, and specialist freight. If you aggregate it, we can move it.
              </p>
            </Item>
          </Anim>
          <Anim className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CARGO_TYPES.map((c) => (
              <Item key={c.name}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{c.name}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Anim>
        </div>
      </section>

      {/* ── EARNINGS ── */}
      <section id="earnings" className="py-24 px-6 border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <Anim className="text-center mb-16">
            <Item>
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 mb-4">Commission Structure</Badge>
            </Item>
            <Item>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The More You Move, The More You Earn</h2>
            </Item>
          </Anim>
          <Anim className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {EARNINGS.map((t) => (
              <Item key={t.tier}>
                <div className={`rounded-2xl border p-6 h-full flex flex-col ${t.color} ${(t as any).highlight ? "ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/10" : ""}`}>
                  {(t as any).highlight && (
                    <Badge className="bg-amber-500 text-slate-950 font-bold self-start mb-3 text-xs">Most Popular</Badge>
                  )}
                  <h3 className="text-lg font-black text-white mb-3">{t.tier}</h3>
                  <div className="space-y-2 flex-1">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Volume</p>
                      <p className="text-sm text-slate-300 font-semibold">{t.vol}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Rate</p>
                      <p className="text-sm text-emerald-300 font-bold">{t.rate}</p>
                    </div>
                    {t.bonus !== "—" && (
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Bonus</p>
                        <p className="text-xs text-amber-300 font-semibold">{t.bonus}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Item>
            ))}
          </Anim>

          {/* Broker Tools */}
          <Anim>
            <Item>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Broker Portal — Included Free</h3>
                    <p className="text-slate-500 text-sm">Every registered broker gets access to:</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {BROKER_TOOLS.map((t) => (
                    <div key={t} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Item>
          </Anim>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Anim className="text-center mb-12">
            <Item>
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 mb-4">
                <FileText className="w-3.5 h-3.5 mr-1" /> Apply Now
              </Badge>
            </Item>
            <Item>
              <h2 className="text-4xl font-black text-white mb-4">Register as a Freight Broker</h2>
            </Item>
            <Item>
              <p className="text-slate-400 text-lg">Our freight operations team reviews all applications within 24 hours.</p>
            </Item>
          </Anim>

          <Anim>
            <Item>
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Application Received</h3>
                  <p className="text-slate-400 mb-6">Our freight team will contact you at <span className="text-white font-semibold">{form.email}</span> within 24 hours.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/logistics">
                      <Button variant="outline" className="border-slate-700 text-slate-300">
                        View Logistics Overview
                      </Button>
                    </Link>
                    <a href="https://wa.me/971523946311" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                        WhatsApp Our Team
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-slate-300 text-sm mb-2 block">Full Name *</Label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                        data-testid="input-freight-name"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm mb-2 block">Company Name *</Label>
                      <Input
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Your company"
                        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                        data-testid="input-freight-company"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-slate-300 text-sm mb-2 block">Email Address *</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                        data-testid="input-freight-email"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm mb-2 block">Phone / WhatsApp</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+971 ..."
                        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                        data-testid="input-freight-phone"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-slate-300 text-sm mb-2 block">Country / Region</Label>
                      <Input
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        placeholder="UAE, Pakistan, India..."
                        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                        data-testid="input-freight-country"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm mb-2 block">Primary Cargo Type</Label>
                      <Select value={form.cargoType} onValueChange={(v) => setForm({ ...form, cargoType: v })}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white" data-testid="select-freight-cargo">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Merchandise</SelectItem>
                          <SelectItem value="perishable">Perishables / Cold Chain</SelectItem>
                          <SelectItem value="industrial">Industrial / Machinery</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce Parcels</SelectItem>
                          <SelectItem value="pharma">Pharmaceuticals</SelectItem>
                          <SelectItem value="hazmat">Hazmat</SelectItem>
                          <SelectItem value="mixed">Mixed / Multiple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block">Estimated Monthly Volume</Label>
                    <Select value={form.monthlyVol} onValueChange={(v) => setForm({ ...form, monthlyVol: v })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white" data-testid="select-freight-volume">
                        <SelectValue placeholder="Select volume range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under10">Under 10 CBM/month</SelectItem>
                        <SelectItem value="10to50">10–50 CBM/month</SelectItem>
                        <SelectItem value="50to200">50–200 CBM/month</SelectItem>
                        <SelectItem value="200plus">200+ CBM/month</SelectItem>
                        <SelectItem value="unknown">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 gap-2"
                    disabled={submitting}
                    data-testid="button-freight-submit"
                  >
                    {submitting ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>
                    ) : (
                      <>Submit Broker Application <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                  <p className="text-center text-slate-600 text-xs">We respond within 24 hours · No commitment required</p>
                </form>
              )}
            </Item>
          </Anim>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-10 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Route className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">ChainTrack</span>
              <span className="text-amber-400 font-semibold text-sm ml-1">FREIGHT BROKER</span>
              <p className="text-slate-500 text-xs">A ChainTrack Logistics vertical · DeliWer Group</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link href="/logistics" className="hover:text-slate-300 transition-colors">Logistics Overview</Link>
            <span>·</span>
            <Link href="/chaintrack" className="hover:text-slate-300 transition-colors">ChainTrack B2B</Link>
            <span>·</span>
            <Link href="/" className="hover:text-slate-300 transition-colors">DeliWer</Link>
          </div>
          <p className="text-slate-600 text-xs">© 2025 ChainTrack Logistics · DeliWer Group</p>
        </div>
      </footer>
    </div>
  );
}
