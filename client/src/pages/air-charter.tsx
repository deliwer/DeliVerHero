import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane, Clock, Globe, Shield, MessageSquare, ArrowRight, CheckCircle2,
  Zap, Route, Package, Anchor, Users, Star, MapPin, Wind,
} from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >{children}</motion.div>
  );
}

const WA = "https://wa.me/971523906019?text=Air%20Charter%20freight%20enquiry%20via%20ChainTrack";

export default function AirCharterPage() {
  return (
    <div className="min-h-screen bg-[#080b10] text-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      <Helmet>
        <title>Air Charter Freight — Dubai DWC to Gawadar · Hormuz-Free | ChainTrack Logistics × 1FLT</title>
        <meta name="description" content="ChainTrack Logistics and 1FLT operate dedicated air cargo charter flights from Dubai World Central (DWC) to Gawadar CPEC Free Zone — under 4 hours, Hormuz-free, with zero re-export duty. Book freight from anywhere via WhatsApp." />
        <meta name="keywords" content="air charter freight Dubai, Dubai Gawadar air cargo, Hormuz-free air freight, CPEC Free Zone air charter, cargo charter Dubai Pakistan, 1FLT charter flights, ChainTrack air freight, Dubai World Central cargo, air freight broker Dubai" />
        <link rel="canonical" href="https://logistics.chaintrack.com/air-charter" />
        <meta property="og:title" content="Air Charter Freight — Dubai to Gawadar · ChainTrack × 1FLT" />
        <meta property="og:description" content="Dedicated cargo charter corridor. Dubai DWC → Gawadar CPEC FZ. Under 4 hrs. Hormuz-free. Book via WhatsApp." />
        <meta property="og:url" content="https://logistics.chaintrack.com/air-charter" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-[#080b10]/70 to-[#080b10]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(245,158,11,0.08),transparent)]" />

        {/* Animated plane line */}
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-7">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 text-xs font-bold px-3 py-1">
                <Plane className="w-3.5 h-3.5" /> Air Charter Freight
              </Badge>
              <Badge className="bg-white/8 text-white/60 border-white/10 text-xs font-bold px-3 py-1">
                ChainTrack Logistics × 1FLT
              </Badge>
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/25 text-xs font-bold px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />Corridor Active
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.04] tracking-tight mb-6">
              Above the Strait.<br />
              <span className="text-amber-400">Below the Radar.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/55 max-w-2xl mb-3 leading-relaxed">
              ChainTrack Logistics and <strong className="text-white/80">1FLT</strong> operate dedicated cargo charter flights from Dubai World Central (DWC) to Gawadar CPEC Free Zone — the only air freight corridor that completely bypasses the Strait of Hormuz.
            </p>
            <p className="text-sm text-white/35 max-w-xl mb-10 leading-relaxed">
              Under 4 hours gate-to-gate. 0% re-export duty in CPEC Free Zone. Direct connection to INSTC rail and CPEC road network. Onward delivery to Kazakhstan, Uzbekistan, Russia, and China.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 h-12 text-base w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" /> Request Charter Quote
                </Button>
              </a>
              <a href="mailto:logistics@chaintrack.com">
                <Button size="lg" variant="outline" className="border-white/15 text-white/70 hover:bg-white/5 px-8 gap-2 h-12 w-full sm:w-auto">
                  logistics@chaintrack.com
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.55 }}
            className="mt-16 pt-10 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { v: "< 4 hrs",    l: "Dubai DWC → Gawadar" },
              { v: "0%",         l: "Re-export duty (CPEC FZ)" },
              { v: "Hormuz-Free",l: "No Strait dependency" },
              { v: "24/7",       l: "Charter slot availability" },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl md:text-3xl font-black text-amber-400">{s.v}</p>
                <p className="text-xs text-white/35 mt-1 leading-snug">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why air charter now */}
      <section className="py-16 px-6 border-y border-white/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-red-500/15 text-red-400 border-red-500/25 mb-4">Why Now</Badge>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Sea Freight Is Broken.<br />
                <span className="text-amber-400">Air Charter Is the Fix.</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">
                Jebel Ali war-risk surcharges have surged +340%. Blank sailings are redirecting 180+ vessels per month. For time-critical cargo or any shipment where insurance costs rival freight rates, air charter is no longer a luxury — it's the rational choice.
              </p>
              <p className="text-white/35 text-sm leading-relaxed">
                The ChainTrack × 1FLT corridor removes the last obstacle: Gawadar's CPEC Free Zone offers 0% re-export duty, making the total landed cost competitive even against pre-crisis sea freight rates.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "+340%",       desc: "Jebel Ali war-risk surcharge increase",     color: "border-red-500/25 bg-red-500/5 text-red-400" },
                { label: "180+",        desc: "Monthly vessel reroutings away from Hormuz", color: "border-red-500/25 bg-red-500/5 text-red-400" },
                { label: "< 4 hrs",     desc: "Dubai DWC to Gawadar by air charter",       color: "border-amber-500/25 bg-amber-500/5 text-amber-400" },
                { label: "0% duty",     desc: "CPEC Free Zone re-export advantage",         color: "border-emerald-500/25 bg-emerald-500/5 text-emerald-400" },
              ].map(s => (
                <div key={s.label} className={`border ${s.color} rounded-2xl p-5`}>
                  <p className={`text-2xl font-black mb-1 ${s.color.split(" ")[2]}`}>{s.label}</p>
                  <p className="text-xs text-white/40 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* The 1FLT partnership */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Badge className="bg-sky-500/15 text-sky-400 border-sky-500/25 mb-4">Strategic Partnership</Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              ChainTrack Logistics × <span className="text-amber-400">1FLT</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
              1FLT brings dedicated aircraft, crew, and AOC compliance. ChainTrack brings the corridor intelligence, customs handling, and broker network. Together: the region's only fully digital, Hormuz-free cargo charter service.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Plane,   title: "1FLT — Aircraft & Crew",        desc: "Dedicated freighter capacity, AOC-compliant operations, flexible charter scheduling from Dubai World Central (DWC). Charter slots confirmed within hours.", badge: "1FLT" },
              { icon: Anchor,  title: "ChainTrack — Corridor & Customs", desc: "Gawadar port handling, CPEC Free Zone customs clearance, INSTC onward booking, and broker commission management. Full documentation digital.", badge: "ChainTrack" },
              { icon: Globe,   title: "Combined — End-to-End Solution",  desc: "Single booking. Single point of contact. Dubai to Gawadar to anywhere in Central Asia, Russia, or China. Coordinated via WhatsApp.", badge: "Joint" },
            ].map(c => (
              <FadeUp key={c.title} delay={0.08}>
                <div className="border border-white/8 bg-white/2 rounded-2xl p-6 h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <Badge className="bg-white/6 text-white/40 border-white/10 text-[10px]">{c.badge}</Badge>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug">{c.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed flex-1">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* The corridor */}
      <section className="py-16 px-6 border-y border-white/8 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <h2 className="text-2xl font-black text-white mb-2">The Corridor — Node by Node</h2>
          </FadeUp>
          <div className="max-w-3xl mx-auto">
            {[
              { num: "01", loc: "Dubai World Central (DWC)",  note: "Cargo intake, documentation, IATA AWB issued. Charter departs on same-day basis for urgent loads.",        icon: Package, color: "text-amber-400 bg-amber-500/10" },
              { num: "02", loc: "Air Transit — Hormuz-Free",  note: "4-hour corridor over Pakistan airspace. No Strait of Hormuz. No war-risk. Real-time ADS-B tracking available.", icon: Plane,   color: "text-sky-400 bg-sky-500/10" },
              { num: "03", loc: "Gawadar CPEC Free Zone",     note: "Port handling, customs clearance, 0% re-export duty applied. Physical delivery or onward booking confirmed.",  icon: Anchor,  color: "text-emerald-400 bg-emerald-500/10" },
              { num: "04", loc: "INSTC / CPEC Onward",        note: "Rail, road or multimodal delivery to Kazakhstan, Uzbekistan, Russia, China. Consolidated or full-load.",       icon: Route,   color: "text-violet-400 bg-violet-500/10" },
            ].map((n, i) => (
              <FadeUp key={n.num} delay={i * 0.08}>
                <div className="flex gap-5 mb-0 last:mb-0">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${n.color}`}>
                      <n.icon className="w-5 h-5" />
                    </div>
                    {i < 3 && <div className="w-0.5 flex-1 min-h-[32px] my-1 bg-white/8" />}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-start gap-3 flex-wrap">
                      <span className="text-[10px] font-black text-white/20 mt-1">{n.num}</span>
                      <div>
                        <p className="font-bold text-white text-sm">{n.loc}</p>
                        <p className="text-xs text-white/40 mt-1 leading-relaxed max-w-lg">{n.note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Best cargo types */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-8">
            <h2 className="text-2xl font-black text-white mb-2">What Flies Best on This Corridor</h2>
            <p className="text-white/35 text-sm">Not everything makes sense by air — but these categories almost always do</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { e: "📱", t: "Refurbished Electronics",    s: "iPhones, laptops, tablets — time-to-market matters" },
              { e: "💊", t: "Pharma & Cold-Chain",        s: "GDP-compliant, reefer containers available" },
              { e: "💎", t: "High-Value Parcels",          s: "Insured, priority handling, chain of custody" },
              { e: "⚡", t: "Stranded Sea Cargo",          s: "Rerouted same-day when port disruption hits" },
              { e: "🏗️", t: "Spare Parts & Machinery",   s: "Critical spares for oil, gas, construction" },
              { e: "🌿", t: "Perishables",                 s: "Fresh produce, floriculture, live seafood" },
              { e: "🎮", t: "E-Commerce Fast Delivery",    s: "B2C batches, Amazon FBA-style micro-fulfilment" },
              { e: "🧰", t: "Humanitarian Aid",            s: "NGO/UN priority lanes, rapid deployment" },
              { e: "🔒", t: "Diplomatic & Sensitive",      s: "Bonded, customs-sealed, discreet handling" },
            ].map(g => (
              <FadeUp key={g.t}>
                <div className="border border-white/8 rounded-xl p-4 flex items-start gap-3 hover:bg-white/3 transition-colors">
                  <span className="text-xl shrink-0">{g.e}</span>
                  <div>
                    <p className="font-semibold text-white text-xs leading-snug">{g.t}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{g.s}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Earn as broker */}
      <section className="py-14 px-6 border-y border-amber-500/15 bg-amber-950/20">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 mb-3">
                <Users className="w-3.5 h-3.5" /> Freight Brokers
              </Badge>
              <h2 className="text-2xl font-black text-white mb-2">
                Refer an Air Charter Shipment — <span className="text-amber-400">Earn 5%</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed max-w-lg">
                Any broker who introduces a shipper using the DWC–Gawadar air charter corridor earns 5% of the gross charter value — paid within 30 days of delivery. Operate from anywhere. No Dubai presence required.
              </p>
            </div>
            <div className="shrink-0">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 h-12 whitespace-nowrap">
                  <MessageSquare className="w-5 h-5" /> Join Free on WhatsApp
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <Plane className="w-10 h-10 text-amber-500/40 mx-auto mb-5" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Ready to Book a Charter?
            </h2>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              WhatsApp us the origin, destination, cargo weight, and time requirement. We confirm a slot within the hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" /> WhatsApp Charter Request
                </Button>
              </a>
              <a href="mailto:logistics@chaintrack.com">
                <Button size="lg" variant="outline" className="border-white/15 text-white/60 hover:bg-white/5 px-8 h-12 w-full sm:w-auto">
                  logistics@chaintrack.com
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
