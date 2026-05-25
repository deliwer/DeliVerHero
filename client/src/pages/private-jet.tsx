import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane, Crown, MessageSquare, CheckCircle2, ArrowRight, Star,
  Shield, Clock, Globe, MapPin, Users, Zap, Wind,
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

const WA = "https://wa.me/971523946311?text=Private%20Jet%20enquiry%20via%20DeliWer%20%C3%97%201FLT";

export default function PrivateJetPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      <Helmet>
        <title>Private Jet Dubai — DeliWer Relocation × 1FLT | Arrive in Style, Move In Same Day</title>
        <meta name="description" content="DeliWer and 1FLT bring together private jet arrivals with instant move-in concierge in Dubai. Land. Keys ready. Ejari registered. DEWA active. Your home is live before you touch down." />
        <meta name="keywords" content="private jet Dubai, 1FLT Dubai, private aviation Dubai relocation, luxury move-in Dubai, Ejari same day private jet, DEWA activation Dubai VIP, Dubai concierge private jet, move-in Dubai airport, DeliWer private jet, VIP relocation Dubai" />
        <link rel="canonical" href="https://www.deliwer.com/private-jet" />
        <meta property="og:title" content="Private Jet Dubai — DeliWer Relocation × 1FLT" />
        <meta property="og:description" content="Land in Dubai on a 1FLT charter. DeliWer has your keys, Ejari, and DEWA ready before you touch down." />
        <meta property="og:url" content="https://www.deliwer.com/private-jet" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, United Arab Emirates" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#06080d]/80 to-[#06080d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_40%,rgba(245,158,11,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_60%,rgba(16,185,129,0.04),transparent)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex flex-wrap gap-2 mb-7">
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/25 gap-1.5 text-xs font-bold px-3 py-1">
                <Crown className="w-3.5 h-3.5" /> Private Jet · VIP Relocation
              </Badge>
              <Badge className="bg-white/6 text-white/50 border-white/10 text-xs font-bold px-3 py-1">
                DeliWer Relocation × 1FLT
              </Badge>
              <Badge className="bg-emerald-500/12 text-emerald-300 border-emerald-500/20 text-xs font-bold px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />Dubai Slots Available
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.04] tracking-tight mb-6">
              Land in Dubai.<br />
              <span className="text-amber-400">Move In Same Day.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-3 leading-relaxed">
              DeliWer Relocation and <strong className="text-white/80">1FLT</strong> have united the two moments that matter most: the private arrival into Dubai, and the instant, frictionless move-in. Your apartment is live before you touch down.
            </p>
            <p className="text-sm text-white/30 max-w-xl mb-10 leading-relaxed">
              Ejari registered. DEWA connected. Movers cleared. Internet active. Keys waiting. All coordinated while your charter is airborne — via one WhatsApp thread.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 gap-2 h-13 text-base w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" /> Plan My Arrival
                </Button>
              </a>
              <a href="mailto:info@deliwer.com">
                <Button size="lg" variant="outline" className="border-white/12 text-white/60 hover:bg-white/4 px-8 gap-2 h-12 w-full sm:w-auto">
                  info@deliwer.com
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-14 pt-10 border-t border-white/6 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { v: "Same Day",    l: "Keys, Ejari & DEWA on landing" },
              { v: "1 Thread",    l: "WhatsApp handles everything" },
              { v: "Dubai-wide",  l: "All areas, any property type" },
              { v: "1FLT + DeliWer", l: "Air + ground, one coordination" },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl md:text-3xl font-black text-amber-400">{s.v}</p>
                <p className="text-xs text-white/30 mt-1 leading-snug">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The partnership */}
      <section className="py-16 px-6 border-y border-white/6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Badge className="bg-sky-500/12 text-sky-400 border-sky-500/20 mb-4">How It Works</Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              Air × Ground. <span className="text-amber-400">Seamlessly Synchronised.</span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
              The moment your 1FLT charter is confirmed, DeliWer starts the ground clock. By wheels-down, everything is done.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {[
              {
                brand: "1FLT",
                role: "Private Aviation",
                color: "border-amber-500/25 bg-amber-500/5",
                badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
                points: [
                  "Charter booking and aircraft selection",
                  "Flexible departure from any regional airport",
                  "DXB / DWC / Sharjah arrival slots",
                  "VIP airside and ground handling",
                  "Immigration fast-track coordination",
                ],
              },
              {
                brand: "DeliWer",
                role: "Move-In Concierge",
                color: "border-emerald-500/20 bg-emerald-500/4",
                badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
                points: [
                  "Ejari registration before you land",
                  "DEWA electricity & water activation",
                  "Professional deep-clean and move-in prep",
                  "Internet setup (eand / du)",
                  "Furniture, groceries, and any errand on request",
                ],
              },
            ].map(b => (
              <FadeUp key={b.brand} delay={0.06}>
                <div className={`border ${b.color} rounded-2xl p-7 h-full`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`text-xs font-black ${b.badge}`}>{b.brand}</Badge>
                    <span className="text-white/30 text-xs">{b.role}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {b.points.map(p => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-white/55">
                        <CheckCircle2 className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* The journey timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="mb-10 text-center">
            <h2 className="text-2xl font-black text-white mb-2">Your Arrival, Minute by Minute</h2>
            <p className="text-white/30 text-sm">Typical same-day relocation scenario</p>
          </FadeUp>
          <div className="max-w-2xl mx-auto">
            {[
              { time: "D-3",       act: "Charter confirmed with 1FLT",                    note: "DeliWer is notified. Property confirmed. Ejari paperwork begins.",       icon: Plane,        color: "bg-amber-500 text-slate-950" },
              { time: "D-1",       act: "Ejari submitted to RERA Trustee Centre",         note: "DEWA activation request filed. Cleaning crew and movers scheduled.",     icon: Shield,       color: "bg-sky-500 text-white" },
              { time: "Airborne",  act: "1FLT charter en route to Dubai",                 note: "DeliWer receiving confirmation updates. Keys picked up. Apartment prepped.", icon: Wind,      color: "bg-violet-500 text-white" },
              { time: "Touchdown", act: "Wheels down at DXB / DWC",                       note: "Ejari certificate sent to your WhatsApp. DEWA live. Home ready.",        icon: MapPin,       color: "bg-emerald-500 text-white" },
              { time: "T+1 hr",   act: "You walk into your new home",                     note: "Clean, lit, water on, internet ready. Everything done. You just arrived.", icon: Crown,       color: "bg-amber-500 text-slate-950" },
            ].map((step, i) => (
              <FadeUp key={step.time} delay={i * 0.08}>
                <div className="flex gap-5 mb-0 last:mb-0">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                      <step.icon className="w-4.5 h-4.5" />
                    </div>
                    {i < 4 && <div className="w-0.5 flex-1 min-h-[32px] my-1 bg-white/8" />}
                  </div>
                  <div className="pb-7 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">{step.time}</span>
                    </div>
                    <p className="font-bold text-white text-sm">{step.act}</p>
                    <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{step.note}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-14 px-6 border-y border-white/6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-8">
            <h2 className="text-xl font-black text-white mb-2">Who This Is Built For</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { e: "👔", t: "Executives relocating to Dubai",      s: "C-suite moves, HR-coordinated" },
              { e: "🏢", t: "Company founders setting up UAE HQ",   s: "Free Zone company + apartment" },
              { e: "🌍", t: "HNWIs escaping conflict regions",      s: "Fast, discreet, complete" },
              { e: "🏠", t: "Property buyers taking possession",    s: "Off-plan completion, key handover" },
              { e: "🎓", t: "International students arriving",      s: "DIFC, DIAC, university admissions" },
              { e: "✈️", t: "Frequent flyers with Dubai base",      s: "Seasonal resident setup" },
            ].map(g => (
              <FadeUp key={g.t}>
                <div className="border border-white/6 rounded-xl p-4 flex items-start gap-3 hover:bg-white/3 transition-colors">
                  <span className="text-xl shrink-0">{g.e}</span>
                  <div>
                    <p className="font-semibold text-white text-xs leading-snug">{g.t}</p>
                    <p className="text-[11px] text-white/25 mt-0.5">{g.s}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/12 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Land. Walk In. Live.
            </h2>
            <p className="text-white/35 mb-6 text-sm leading-relaxed max-w-md mx-auto">
              Tell us your flight details and property address. We'll have everything ready before you clear customs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" /> WhatsApp Us Now
                </Button>
              </a>
              <a href="mailto:info@deliwer.com">
                <Button size="lg" variant="outline" className="border-white/12 text-white/55 hover:bg-white/4 px-8 h-12 w-full sm:w-auto">
                  info@deliwer.com
                </Button>
              </a>
            </div>
            <p className="text-[11px] text-white/20">
              DeliWer Relocation × 1FLT · Dubai · Serving all areas · 08:00–22:00 daily
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
