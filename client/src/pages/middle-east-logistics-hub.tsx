import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown, MessageSquare, CheckCircle2, ArrowRight, Plane, Ship,
  Anchor, Route, Globe, Shield, Users, DollarSign, Clock, Zap,
  TrendingUp, MapPin, Package, Truck, BarChart3, Network, AlertTriangle,
} from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        data-testid={`faq-logistics-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}>
        <span className="font-semibold text-white/85 text-sm leading-snug group-hover:text-white transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-sm text-white/50 leading-relaxed pb-5 pr-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FAQS = [
  { q: "Why is Dubai the logistics capital of the Middle East?", a: "Dubai sits at the intersection of Europe, Asia, and Africa — within 8 hours of 2/3 of the world's population. Jebel Ali Port is the world's 9th busiest container port. Dubai World Central (DWC) is the world's largest cargo airport by design capacity. Dubai's logistics GDP contribution exceeds 14%. The UAE has signed bilateral trade agreements with 189 countries. And uniquely, when sea routes are disrupted, Dubai's aviation infrastructure provides a fully operable air freight alternative — which no other Middle East city can offer at scale." },
  { q: "What is the Gawadar logistics hub and why does it matter?", a: "Gawadar is a Pakistani deep-sea port on the Arabian Sea backed by $62 billion in Chinese CPEC (China-Pakistan Economic Corridor) investment. It sits outside the Strait of Hormuz — meaning cargo transiting Gawadar has zero Hormuz risk exposure. The CPEC Free Zone within Gawadar offers 0% re-export duty, direct CPEC rail connectivity to China, and INSTC connectivity northbound to Russia and Central Asia. ChainTrack Logistics operates the only digital, Hormuz-free air charter corridor from Dubai DWC to Gawadar CPEC FZ." },
  { q: "What is CPEC and how does it affect Middle East freight?", a: "CPEC (China-Pakistan Economic Corridor) is a $62B collection of infrastructure projects linking China's Xinjiang province to Pakistan's Gawadar port via road and rail. For Middle East freight operators, CPEC creates a non-Hormuz, non-Suez routing alternative to China — bypassing Western-controlled chokepoints. ChainTrack's Dubai-Gawadar corridor connects directly to CPEC, allowing shippers to route Dubai → Gawadar → China by air-sea multimodal in 6–10 days." },
  { q: "What is the INSTC corridor?", a: "The INSTC (International North–South Transport Corridor) is a 7,200km multimodal transport route connecting the Arabian Sea (via India/Pakistan) to Russia's ports on the Baltic Sea and Caspian Sea — passing through Iran, Azerbaijan, and Kazakhstan. For Middle East logistics, INSTC provides a Russia and Central Asia routing alternative that bypasses the Suez Canal and NATO-adjacent shipping lanes. ChainTrack uses Gawadar as the southern INSTC entry point, with rail and road connections northbound to Kazakhstan, Uzbekistan, Russia, and Georgia." },
  { q: "How do I ship cargo from Dubai to Central Asia?", a: "Three main routes: (1) Air Charter (Dubai DWC → Gawadar CPEC FZ → INSTC rail, 6–10 days total, premium speed); (2) Sea Freight (Jebel Ali → Karachi → overland, 15–25 days, lowest cost); (3) Air Direct (Dubai → Almaty/Tashkent/Baku, 1–3 days, highest cost). ChainTrack's Dubai-Gawadar air charter corridor is the optimal balance for time-sensitive or high-value cargo. WhatsApp +971523946311 for a quote." },
  { q: "What is Hormuz-free routing and why does it matter?", a: "The Strait of Hormuz is a 33km-wide waterway through which approximately 30% of global oil and 20% of global LNG transits. During geopolitical tensions, war-risk insurance surcharges on Hormuz-transiting vessels can increase freight costs by 200–400%. Hormuz-free routing — like the ChainTrack DWC-Gawadar air corridor — bypasses the Strait entirely, eliminating war-risk insurance exposure, blank sailing risks, and port congestion at Jebel Ali during conflict periods." },
  { q: "How can I become a freight broker for ChainTrack?", a: "Register free via WhatsApp (+971523946311). No logistics experience, UAE residency, or upfront investment required. The process: (1) Register on WhatsApp. (2) Find a shipper (anyone moving cargo to/from ChainTrack's corridors). (3) Send the enquiry (origin, destination, weight, cargo type). (4) ChainTrack quotes, routes, handles customs, and delivers. (5) You earn 5% gross commission within 30 days of delivery. Corridor Captains who build a sub-broker network earn an additional 1% override." },
  { q: "What is the difference between a freight broker and a freight forwarder?", a: "A freight forwarder physically arranges transport, customs clearance, and documentation — often owning or leasing assets (warehouses, cargo space). A freight broker is an intermediary: they connect shippers with carriers and earn a commission on the transaction without holding assets. ChainTrack's model lets anyone become a freight broker — earn 5% by introducing shippers, while ChainTrack handles all the logistics operations." },
  { q: "How much can a freight broker earn per month in Dubai?", a: "ChainTrack freight brokers earn 5% of gross freight value per confirmed shipment. A single 10-tonne air charter from Dubai to Gawadar might cost $8,000–15,000, generating $400–750 per booking. Active brokers closing 4–8 shipments per month can earn $2,000–6,000 USD monthly. Corridor Captains with a sub-broker network compound this with 1% overrides — 10 active sub-brokers each closing 5 shipments/month generates significant passive override income." },
  { q: "What cargo can be shipped via the Dubai-Gawadar air corridor?", a: "The DWC-Gawadar air charter corridor is optimised for: refurbished electronics (iPhones, laptops, tablets), pharma and cold-chain cargo (GDP-compliant reefer), time-critical FMCG, high-value parcels, stranded sea cargo rerouted in an emergency, spare parts and machinery, perishables and fresh produce, e-commerce batches, humanitarian aid (NGO/UN). Prohibited items follow UAE GCAA and IATA DGR regulations." },
  { q: "What is air-sea multimodal freight?", a: "Air-sea multimodal combines air freight for the initial high-speed leg with sea freight for the cost-effective onward leg (or vice versa). Example: cargo flies Dubai DWC to Gawadar (4 hours) to beat the Hormuz disruption, then transfers to a sea vessel for Karachi-to-Colombo-to-Singapore routing. This is 40–60% cheaper than pure air freight while maintaining 50% better speed than pure sea from Jebel Ali during disruption periods." },
  { q: "How does ChainTrack compare to traditional freight forwarders?", a: "Traditional forwarders: office-dependent, asset-heavy, Hormuz-routed by default, slow to pivot during disruptions, phone/email-first. ChainTrack: 100% digital, WhatsApp-first, asset-light (pure coordination), Hormuz-free corridor by design, real-time route status updates, 5% broker commission program, Gawadar CPEC FZ advantage (0% duty). ChainTrack is not a competitor to forwarders — it offers wholesale access to its corridors for forwarders wanting Gawadar and INSTC routing." },
  { q: "What is Dubai World Central (DWC) and why is it important for freight?", a: "Dubai World Central (Al Maktoum International Airport) is a purpose-built cargo and aviation city in southern Dubai. Designed to become the world's largest airport by capacity (160M passengers, 12M tonnes cargo at full build). Currently operational for cargo: handles 1M+ tonnes annually. Key advantage for ChainTrack: DWC is 100% land-side — unlike Jebel Ali, it has zero maritime exposure. When port disruptions hit, DWC remains fully operational." },
  { q: "Can I ship from Pakistan to the UAE via Gawadar?", a: "Yes — Gawadar is an export hub for Pakistan-origin cargo destined for the UAE and onward. ChainTrack operates the reverse corridor: Gawadar → Dubai DWC for Pakistan exports. Gawadar CPEC Free Zone bonding allows cargo to transit with deferred duty, making it a cost-efficient re-export hub for Pakistan textile, agricultural, and manufactured goods heading to UAE and GCC markets." },
  { q: "What documentation is needed for cargo shipped via ChainTrack?", a: "Air charter: Air Waybill (eAWB — fully digital), commercial invoice, packing list, IATA DGR declaration (if applicable), country-specific import permits. Gawadar transit: CPEC Free Zone transit declaration, bonding certificate. INSTC rail: CMR/CIM railway consignment note. ChainTrack handles all documentation preparation digitally — brokers and shippers do not need to manage paperwork." },
];

const WA = "https://wa.me/971523946311?text=Middle%20East%20Logistics%20Hub%20enquiry%20via%20ChainTrack";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://logistics.chaintrack.com/middle-east-logistics-hub#article",
      "headline": "Middle East Logistics Hub 2026 — Dubai, Gawadar, INSTC, CPEC & Post-War Trade Routes",
      "description": "The definitive guide to Middle East logistics in 2026. Covers Dubai's freight advantage, Gawadar CPEC hub, INSTC corridor, Hormuz-free routing, air charter opportunities, and how to become a freight broker earning 5% commission.",
      "author": { "@type": "Organization", "name": "ChainTrack Logistics", "url": "https://logistics.chaintrack.com" },
      "publisher": { "@type": "Organization", "name": "DeliWer", "logo": { "@type": "ImageObject", "url": "https://www.deliwer.com/deliwer-logo.png" } },
      "datePublished": "2026-05-25",
      "dateModified": "2026-05-25",
      "mainEntityOfPage": "https://logistics.chaintrack.com/middle-east-logistics-hub",
      "keywords": "Middle East logistics hub, Dubai freight hub, Gawadar port logistics, CPEC corridor freight, INSTC transport, Hormuz-free routing, air charter Dubai, freight broker Dubai, ChainTrack logistics"
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    {
      "@type": "Dataset",
      "name": "Middle East Trade Corridor Disruption Index 2026",
      "description": "Live route status and disruption metrics for key Middle East freight corridors including Strait of Hormuz, Jebel Ali, Suez Canal, and ChainTrack Gawadar alternatives.",
      "creator": { "@type": "Organization", "name": "ChainTrack Logistics" },
      "dateModified": "2026-05-25"
    }
  ]
};

const CORRIDORS = [
  { name: "Dubai DWC → Gawadar (Air Charter)", status: "operational", transit: "< 4 hrs", duty: "0% CPEC FZ", risk: "Zero Hormuz", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
  { name: "Jebel Ali → Karachi (Sea)",          status: "disrupted",   transit: "5–8 days", duty: "Standard",   risk: "Hormuz zone", badge: "text-red-400 bg-red-500/10 border-red-500/25" },
  { name: "Gawadar → Kazakhstan (INSTC Rail)",  status: "operational", transit: "8–12 days", duty: "INSTC bonded", risk: "None", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
  { name: "Gawadar → China (CPEC Road/Rail)",   status: "operational", transit: "10–18 days", duty: "CPEC FZ", risk: "None", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
  { name: "Strait of Hormuz (Sea transit)",     status: "risk",        transit: "Variable",  duty: "+340% surcharge", risk: "HIGH", badge: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
];

export default function MiddleEastLogisticsHub() {
  const [activeMode, setActiveMode] = useState<"air" | "sea" | "multi">("air");

  return (
    <div className="min-h-screen bg-[#080b10] text-white" style={{ fontFamily: "'Inter','DM Sans',sans-serif" }}>
      <Helmet>
        <title>Middle East Logistics Hub 2026 — Dubai, Gawadar, INSTC & CPEC | ChainTrack Logistics</title>
        <meta name="description" content="The definitive guide to Middle East freight and logistics in 2026. Dubai air charter to Gawadar (Hormuz-free, 4hrs), INSTC corridor to Russia and Central Asia, CPEC freight to China. Freight brokers earn 5% commission. ChainTrack Logistics × DeliWer." />
        <meta name="keywords" content="Middle East logistics hub 2026, Dubai logistics capital, Gawadar port freight, CPEC logistics corridor, INSTC transport corridor, Hormuz alternative routing, air charter Dubai Pakistan, freight broker Middle East, ChainTrack logistics, post-war trade routes Middle East, Dubai World Central cargo, DWC air freight" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href="https://logistics.chaintrack.com/middle-east-logistics-hub" />
        <meta property="og:title" content="Middle East Logistics Hub 2026 — ChainTrack Logistics" />
        <meta property="og:description" content="Dubai air charter to Gawadar (Hormuz-free). INSTC rail to Russia. CPEC to China. Freight brokers earn 5% commission." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://logistics.chaintrack.com/middle-east-logistics-hub" />
        <meta property="og:image" content="https://logistics.chaintrack.com/chaintrack-og.png" />
        <meta property="og:site_name" content="ChainTrack Logistics" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Middle East Logistics Hub 2026 — ChainTrack Logistics" />
        <meta name="twitter:description" content="Post-war trade routes. Dubai → Gawadar → Central Asia / China. Earn 5% as a freight broker." />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, United Arab Emirates" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.07),transparent)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-bold px-3 py-1">
                <Globe className="w-3 h-3 mr-1" /> Middle East Logistics Hub
              </Badge>
              <Badge className="bg-white/6 text-white/50 border-white/10 text-xs font-bold px-3 py-1">Updated May 2026</Badge>
              <Badge className="bg-red-500/12 text-red-400 border-red-500/20 text-xs font-bold px-3 py-1 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />Post-War Trade Reset
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.06] tracking-tight mb-5">
              The Middle East<br />
              <span className="text-amber-400">Logistics Hub 2026</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mb-3 leading-relaxed">
              Dubai, Gawadar, INSTC, CPEC — the complete guide to the new trade architecture emerging from post-war Middle East disruption. Written by ChainTrack Logistics, operators of the region's only digital, Hormuz-free air charter corridor.
            </p>
            <p className="text-sm text-white/30 max-w-xl mb-8 leading-relaxed">
              14 FAQs · Live corridor status · Freight mode comparison · Broker commission calculator
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 h-12">
                  <MessageSquare className="w-5 h-5" /> Get a Freight Quote
                </Button>
              </a>
              <Link href="/logistics">
                <Button size="lg" variant="outline" className="border-white/12 text-white/60 hover:bg-white/4 px-8 gap-2 h-12">
                  ChainTrack Corridor <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Key stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 pt-10 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "#9",     l: "Jebel Ali global container port rank" },
              { v: "$62B",   l: "CPEC infrastructure investment (China)" },
              { v: "7,200km",l: "INSTC corridor length (Arabian Sea → Baltic)" },
              { v: "5%",     l: "Broker commission on every ChainTrack shipment" },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl md:text-3xl font-black text-amber-400">{s.v}</p>
                <p className="text-xs text-white/30 mt-1 leading-snug">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live corridor status */}
      <section className="py-14 px-6 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-black text-white">Live Corridor Status</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Real-time</span>
              </div>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="rounded-2xl border border-white/8 overflow-hidden">
              <div className="hidden md:grid grid-cols-5 px-5 py-3 bg-white/4 border-b border-white/8">
                {["Corridor", "Status", "Transit", "Duty", "Risk"].map(h => (
                  <span key={h} className="text-[10px] font-black uppercase tracking-widest text-white/25">{h}</span>
                ))}
              </div>
              {CORRIDORS.map((c, i) => (
                <div key={c.name} className={`flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-0 px-5 py-4 ${i % 2 === 0 ? "" : "bg-white/[0.012]"} border-b border-white/5 last:border-0`}>
                  <span className="text-sm font-semibold text-white col-span-1 pr-2">{c.name}</span>
                  <span className="col-span-1">
                    <Badge className={`text-[10px] font-black ${c.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${c.status === "operational" ? "bg-emerald-400" : c.status === "risk" ? "bg-amber-400 animate-pulse" : "bg-red-400 animate-pulse"}`} />
                      {c.status}
                    </Badge>
                  </span>
                  <span className="text-xs text-white/50">{c.transit}</span>
                  <span className="text-xs text-white/40">{c.duty}</span>
                  <span className={`text-xs font-bold ${c.risk === "None" ? "text-emerald-400" : c.risk === "HIGH" ? "text-red-400" : c.risk === "Zero Hormuz" ? "text-emerald-400" : "text-amber-400"}`}>{c.risk}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* The three nodes */}
      <section className="py-16 px-6 border-b border-white/8 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10 text-center">
            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/25 mb-4">The Strategic Architecture</Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Dubai · Gawadar · INSTC — Three Nodes, One System</h2>
            <p className="text-white/35 text-sm max-w-xl mx-auto">Why no other operator can replicate this in the short term</p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                node: "Dubai (DWC)",
                icon: Plane,
                color: "border-amber-500/25 bg-amber-500/5",
                badge: "text-amber-400",
                facts: [
                  "World's largest cargo airport (design capacity)",
                  "100% land-side — zero Hormuz exposure",
                  "Emirates connects to 250+ destinations",
                  "DWC Free Zone: 0% corporate tax",
                  "Same-day charter slot availability",
                ],
                why: "Dubai provides the aviation infrastructure, global connectivity, and financial gateway that makes ChainTrack's model unique."
              },
              {
                node: "Gawadar CPEC FZ",
                icon: Anchor,
                color: "border-emerald-500/25 bg-emerald-500/5",
                badge: "text-emerald-400",
                facts: [
                  "Outside the Strait of Hormuz — zero risk",
                  "0% re-export duty in CPEC Free Zone",
                  "$62B CPEC infrastructure investment",
                  "Deep-water port: 60,000 DWT vessels",
                  "Direct CPEC rail to China Xinjiang",
                ],
                why: "Gawadar is the permanent infrastructure that makes the Hormuz bypass viable for large-scale commercial cargo."
              },
              {
                node: "INSTC Corridor",
                icon: Route,
                color: "border-violet-500/25 bg-violet-500/5",
                badge: "text-violet-400",
                facts: [
                  "7,200km — Arabian Sea to St Petersburg",
                  "Connects 13 countries across 3 regions",
                  "30% shorter than Suez Canal routing to Russia",
                  "Kazakhstan, Uzbekistan, Azerbaijan bonded",
                  "Operational since 2014, expanding post-2022",
                ],
                why: "INSTC provides the northbound distribution network that makes the Dubai-Gawadar corridor commercially viable for Central Asia and CIS."
              },
            ].map(n => (
              <FadeUp key={n.node} delay={0.06}>
                <div className={`border ${n.color} rounded-2xl p-6 h-full flex flex-col gap-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${n.color}`}>
                      <n.icon className={`w-4.5 h-4.5 ${n.badge}`} />
                    </div>
                    <h3 className={`font-black text-sm ${n.badge}`}>{n.node}</h3>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {n.facts.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/30 italic border-t border-white/8 pt-3 leading-relaxed">{n.why}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Freight mode comparison */}
      <section className="py-16 px-6 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Freight Mode Comparison</h2>
            <p className="text-white/35 text-sm">For Dubai-origin cargo to Central Asia — May 2026 conditions</p>
          </FadeUp>

          {/* Mode selector */}
          <FadeUp>
            <div className="flex gap-2 p-1 bg-white/4 rounded-xl border border-white/8 w-fit mb-6">
              {(["air", "sea", "multi"] as const).map(m => (
                <button key={m} onClick={() => setActiveMode(m)}
                  className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${activeMode === m ? "bg-amber-500 text-slate-950" : "text-white/40 hover:text-white"}`}
                  data-testid={`mode-tab-${m}`}>
                  {m === "air" ? "Air Charter" : m === "sea" ? "Sea Freight" : "Multimodal"}
                </button>
              ))}
            </div>
          </FadeUp>

          <AnimatePresence mode="wait">
            {activeMode === "air" && (
              <motion.div key="air" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Transit Time",   value: "< 4 hrs DWC→GWD", sub: "+ onward INSTC" },
                    { label: "Hormuz Risk",    value: "None",  sub: "Bypasses entirely" },
                    { label: "Duty",           value: "0% CPEC FZ", sub: "Re-export bonded" },
                    { label: "Best For",       value: "Electronics, Pharma", sub: "High-value time-critical" },
                  ].map(s => (
                    <div key={s.label} className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/60 mb-1">{s.label}</p>
                      <p className="font-black text-white text-base">{s.value}</p>
                      <p className="text-xs text-white/30 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeMode === "sea" && (
              <motion.div key="sea" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Transit Time",   value: "12–22 days", sub: "Jebel Ali or Karachi→CIS" },
                    { label: "Hormuz Risk",    value: "HIGH",  sub: "War-risk +340% surcharge" },
                    { label: "Cost",           value: "Lowest",    sub: "Best for bulk FCL" },
                    { label: "Best For",       value: "FMCG, Bulk", sub: "Non-urgent, high-volume" },
                  ].map(s => (
                    <div key={s.label} className={`border rounded-2xl p-5 ${s.label === "Hormuz Risk" ? "border-red-500/25 bg-red-500/5" : "border-sky-500/20 bg-sky-500/5"}`}>
                      <p className="text-[10px] font-black uppercase tracking-widest text-sky-400/60 mb-1">{s.label}</p>
                      <p className={`font-black text-base ${s.label === "Hormuz Risk" ? "text-red-400" : "text-white"}`}>{s.value}</p>
                      <p className="text-xs text-white/30 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeMode === "multi" && (
              <motion.div key="multi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Transit Time",   value: "6–10 days", sub: "Air to GWD + sea or rail onward" },
                    { label: "Hormuz Risk",    value: "None",  sub: "Air leg bypasses Strait" },
                    { label: "Cost vs Air",    value: "40–60% cheaper", sub: "vs pure air freight" },
                    { label: "Best For",       value: "Electronics, Mixed", sub: "Value + speed balance" },
                  ].map(s => (
                    <div key={s.label} className="border border-violet-500/20 bg-violet-500/5 rounded-2xl p-5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-violet-400/60 mb-1">{s.label}</p>
                      <p className="font-black text-white text-base">{s.value}</p>
                      <p className="text-xs text-white/30 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Broker commission calculator */}
      <section className="py-16 px-6 border-b border-white/8 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 mb-5">
                <DollarSign className="w-3.5 h-3.5" /> Broker Earnings
              </Badge>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                How Much Can a<br /><span className="text-amber-400">ChainTrack Broker Earn?</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-4">
                5% gross commission on every confirmed shipment. No cap. Paid within 30 days of delivery. No UAE residency or logistics experience required. Operate via WhatsApp from anywhere.
              </p>
              <div className="space-y-3">
                {[
                  { scenario: "1 air charter/month", value: "AED 1,500–3,000", note: "Single 5-tonne DWC→GWD booking" },
                  { scenario: "4 bookings/month",    value: "AED 6,000–12,000", note: "Active broker target" },
                  { scenario: "Corridor Captain",    value: "AED 15,000–40,000", note: "Own bookings + 1% sub-broker override" },
                ].map(s => (
                  <div key={s.scenario} className="border border-white/8 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-white">{s.scenario}</p>
                      <p className="text-[11px] text-white/30">{s.note}</p>
                    </div>
                    <p className="text-sm font-black text-amber-400 shrink-0">{s.value}/mo</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-amber-500/25 bg-amber-950/20 rounded-2xl p-7">
              <p className="text-xs font-black uppercase tracking-widest text-amber-400/60 mb-4">How to join</p>
              {[
                { step: "1", act: "WhatsApp +971523946311", note: "Free. No form. 2 minutes." },
                { step: "2", act: "Find a shipper",         note: "Any trade contact moving cargo." },
                { step: "3", act: "Send enquiry",            note: "Origin, destination, weight. That's it." },
                { step: "4", act: "We close & deliver",      note: "ChainTrack handles everything else." },
                { step: "5", act: "You get paid",            note: "5% within 30 days of delivery." },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-lg font-black text-amber-500/30 w-5 shrink-0">{s.step}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{s.act}</p>
                    <p className="text-xs text-white/35">{s.note}</p>
                  </div>
                </div>
              ))}
              <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-5 block">
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2">
                  <MessageSquare className="w-4 h-4" /> Join Free on WhatsApp
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Post-war context */}
      <section className="py-16 px-6 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-8">
            <Badge className="bg-red-500/12 text-red-400 border-red-500/20 mb-4 gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Post-War Trade Context
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              Why the Old Routes Are Broken — and What Replaces Them
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Suez Canal disruptions",     desc: "Houthi attacks rerouted 80+ vessels/month around Cape of Good Hope in 2024–2026, adding 10–14 days and 20–30% fuel costs to Europe-Asia routes.", impact: "INSTC becomes Suez alternative", color: "border-red-500/20" },
              { title: "Hormuz war-risk surge",       desc: "War-risk insurance for Hormuz-transiting vessels reached +340% above base rates. Container lines began blank-sailing Jebel Ali calls in conflict periods.", impact: "Air charter becomes cost-competitive", color: "border-red-500/20" },
              { title: "CPEC completion phase",       desc: "Phase 2 CPEC projects ($30B+) are completing 2025–2028, adding Gwadar-China rail capacity and industrial zones. Gawadar handling capacity expanding 10x.", impact: "Gawadar becomes viable at scale", color: "border-amber-500/20" },
              { title: "UAE-India CEPA effect",       desc: "UAE-India Comprehensive Economic Partnership Agreement (2022) reduced tariffs on 80%+ of goods. UAE-India trade hit $83B in 2025 — growing Jebel Ali-India lanes.", impact: "India corridor volume surge", color: "border-sky-500/20" },
              { title: "Russia INSTC rerouting",      desc: "Sanctioned from Suez-routed services, Russia accelerated INSTC development. Russia-Iran-India trade via INSTC grew 45% YoY in 2025.", impact: "INSTC northbound fully commercial", color: "border-violet-500/20" },
              { title: "Afghan reconstruction lanes", desc: "Post-conflict Afghanistan reconstruction demand for building materials, machinery, and consumer goods creates first-mover opportunity for Gawadar-routed cargo.", impact: "New high-margin cargo category", color: "border-emerald-500/20" },
            ].map(c => (
              <FadeUp key={c.title} delay={0.05}>
                <div className={`border ${c.color} bg-white/2 rounded-2xl p-5 h-full`}>
                  <p className="font-bold text-white text-sm mb-2">{c.title}</p>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">{c.desc}</p>
                  <p className="text-[11px] font-black text-amber-400/80">→ {c.impact}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 border-b border-white/8">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="mb-8">
            <Badge className="bg-white/8 text-white/50 border-white/10 mb-4">14 Expert-Level FAQs</Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Middle East Logistics FAQs</h2>
            <p className="text-white/35 text-sm">Structured for Google rich results and AI search citations</p>
          </FadeUp>
          <FadeUp>
            <div className="border border-white/8 rounded-2xl px-5 bg-white/2">
              {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* DeliWer relocation crosslink */}
      <section className="py-10 px-6 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/12 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <Badge className="bg-emerald-500/12 text-emerald-300 border-emerald-500/20 text-[10px] mb-1.5">Also by DeliWer</Badge>
                  <h3 className="font-bold text-white text-sm mb-1">Relocating to Dubai?</h3>
                  <p className="text-xs text-white/40 leading-relaxed max-w-md">
                    DeliWer handles the ground side: Ejari registration (AED 320), DEWA activation, movers, cleaning, and flexible monthly rooms. Same founders. Same WhatsApp number.
                  </p>
                </div>
              </div>
              <Link href="/dubai-relocation-guide" className="shrink-0">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 whitespace-nowrap">
                  Dubai Relocation Guide <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/12 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
              <Network className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Ready to Move Cargo — or Earn From It?
            </h2>
            <p className="text-white/40 mb-6 text-sm leading-relaxed max-w-md mx-auto">
              One WhatsApp. Freight quote within an hour. Broker commission confirmed on every booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" /> WhatsApp Now
                </Button>
              </a>
              <Link href="/logistics">
                <Button size="lg" variant="outline" className="border-white/12 text-white/55 hover:bg-white/4 px-8 h-12 w-full sm:w-auto">
                  View the Corridor <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
