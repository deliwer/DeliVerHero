import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare, CheckCircle2, Droplet, Zap, Home, ArrowRight,
  Clock, DollarSign, ShieldCheck, Users, Truck, ClipboardList, Star
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";

const BUNDLE_SIZES = [
  { label: "Studio", range: "AED 2,800 – 3,600", icon: "🏢" },
  { label: "1 Bedroom", range: "AED 3,200 – 4,200", icon: "🛏" },
  { label: "2 Bedroom", range: "AED 3,800 – 5,200", icon: "🛏🛏" },
  { label: "3 Bedroom", range: "AED 4,500 – 6,000", icon: "🏡" },
];

const SERVICES = [
  { icon: Truck, title: "Movers Coordination", desc: "Vetted moving company scheduled to your date" },
  { icon: ClipboardList, title: "Ejari Registration", desc: "Guided through RERA-authorised trustee centers" },
  { icon: Zap, title: "DEWA Activation", desc: "Electricity, water meter & security deposit guidance" },
  { icon: Droplet, title: "Water Readiness", desc: "Water connection verified and shower filter installed" },
  { icon: Home, title: "Home Readiness Check", desc: "AC, ventilation, and utilities confirmed before arrival" },
  { icon: MessageSquare, title: "One WhatsApp Contact", desc: "Single point of coordination throughout your move" },
];

export default function StartPage() {
  const [location] = useLocation();
  const [selectedSize, setSelectedSize] = useState(0);

  // Referral tracking from URL parameters — stored to localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && !localStorage.getItem("deliwer_ref")) {
      localStorage.setItem(
        "deliwer_ref",
        JSON.stringify({
          partner: ref,
          agent: params.get("agent") || "",
          campaign: params.get("campaign") || "",
          timestamp: new Date().toISOString(),
        })
      );
    }
  }, [location]);

  const buildWhatsApp = (context = "") => {
    const raw = localStorage.getItem("deliwer_ref");
    const ref = raw ? JSON.parse(raw) : {};
    const aptLabel = BUNDLE_SIZES[selectedSize].label;
    const aptRange = BUNDLE_SIZES[selectedSize].range;
    const msg = [
      `Hi DeliWer, I want to start my move-in coordination.`,
      ``,
      `Apartment type: ${aptLabel}`,
      `Estimated vendor cost: ${aptRange}`,
      context ? `Request: ${context}` : "",
      ``,
      `Name:`,
      `Building / Area:`,
      `Move-in date:`,
      ref.partner ? `Referred by: ${ref.partner}` : "",
    ]
      .filter((l) => l !== undefined)
      .join("\n")
      .trim();

    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta
        title="Start Your Move-In | Dubai Move-In Coordination | DeliWer"
        description="DeliWer coordinates your entire Dubai move-in — movers, Ejari, DEWA, water setup — at no extra cost. You pay only vendor market rates. Start in minutes via WhatsApp."
      />
      <Navigation />

      {/* ─── Hero ─── */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-5">
              <Star className="w-3.5 h-3.5" /> Move-In Coordination
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
              Move Into Your New Home<br />
              <span className="text-emerald-400">Without the Setup Stress</span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
              DeliWer coordinates movers, Ejari, DEWA, and water setup — all in one WhatsApp conversation.
              You pay only what vendors normally charge. We coordinate everything.
            </p>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            {[
              { icon: ShieldCheck, text: "No hidden fees" },
              { icon: DollarSign, text: "Pay normal vendor prices" },
              { icon: Clock, text: "10 minutes to start" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
                <Icon className="w-4 h-4" /> {text}
              </div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Button
              size="lg"
              data-testid="button-hero-whatsapp"
              onClick={() => buildWhatsApp()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-16 px-12 rounded-2xl text-lg shadow-2xl shadow-emerald-900/40 w-full md:w-auto"
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Start My Move-In Plan
            </Button>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-3">
              Response within 10 minutes · WhatsApp support
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Psychological Price Comparison ─── */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Why DeliWer</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Same Cost. Zero Effort.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DIY column */}
            <Card className="bg-red-950/20 border-red-500/20 rounded-2xl">
              <CardContent className="p-7 space-y-5">
                <p className="text-red-400 font-black uppercase text-xs tracking-widest">Typical Move-In (DIY)</p>
                <ul className="space-y-2.5">
                  {[
                    "Find and call movers",
                    "Visit Ejari center in person",
                    "Navigate DEWA registration",
                    "Coordinate vendors separately",
                    "Follow up on every step",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                      <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black flex items-center justify-center shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-red-500/10 pt-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Time required</span>
                    <span className="text-red-400 font-black">6–12 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Typical cost</span>
                    <span className="text-white font-black">AED 3,250 – 4,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DeliWer column */}
            <Card className="bg-emerald-950/30 border-emerald-500/30 rounded-2xl relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">Recommended</div>
              <CardContent className="p-7 space-y-5">
                <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">With DeliWer</p>
                <ul className="space-y-2.5">
                  {[
                    "One WhatsApp request",
                    "All vendors coordinated for you",
                    "Ejari, DEWA, movers — handled",
                    "You get updates as it's done",
                    "Home ready when you arrive",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-200 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-emerald-500/15 pt-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Time required</span>
                    <span className="text-emerald-400 font-black">10 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Your cost</span>
                    <span className="text-emerald-400 font-black">Exactly the same</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-2">
            <Button
              data-testid="button-comparison-cta"
              onClick={() => buildWhatsApp("Start my move-in coordination")}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 px-10 rounded-xl shadow-xl shadow-emerald-900/30 text-sm uppercase tracking-widest"
            >
              Start Your Move-In Plan <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Apartment Cost Estimator ─── */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Estimate Your Costs</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              What's the typical cost?
            </h2>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-xl mx-auto">
              These are estimated vendor market rates — the same prices you'd pay booking movers, Ejari, and DEWA yourself.
              DeliWer coordination does not add to these costs.
            </p>
          </div>

          {/* Size selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BUNDLE_SIZES.map((size, i) => (
              <button
                key={i}
                data-testid={`button-size-${size.label.toLowerCase().replace(" ", "-")}`}
                onClick={() => setSelectedSize(i)}
                className={`p-4 rounded-2xl border text-center transition-all font-black text-sm ${
                  selectedSize === i
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/30"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/40 hover:text-white"
                }`}
              >
                <div className="text-2xl mb-1">{size.icon}</div>
                {size.label}
              </button>
            ))}
          </div>

          {/* Selected estimate card */}
          <motion.div
            key={selectedSize}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-emerald-950/30 border-emerald-500/25 rounded-2xl">
              <CardContent className="p-7 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Estimated vendor cost</p>
                    <p className="text-white font-black uppercase text-sm tracking-tight mt-0.5">{BUNDLE_SIZES[selectedSize].label}</p>
                  </div>
                  <p className="text-emerald-400 font-black text-2xl md:text-3xl" data-testid="text-cost-range">
                    {BUNDLE_SIZES[selectedSize].range}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {[
                    "Movers (local Dubai move)",
                    "Ejari registration fee",
                    "DEWA activation + security deposit",
                    "Shower filter installation",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">DeliWer coordination</p>
                  <p className="text-white font-black mt-1">Included at no extra charge</p>
                  <p className="text-gray-400 text-xs font-medium mt-1">
                    DeliWer's fee is paid by vendors — tenants always pay vendor market rates only.
                  </p>
                </div>

                <Button
                  data-testid="button-estimator-cta"
                  onClick={() => buildWhatsApp(`${BUNDLE_SIZES[selectedSize].label} apartment`)}
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 text-sm uppercase tracking-widest shadow-lg shadow-emerald-900/30"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Start Coordination for {BUNDLE_SIZES[selectedSize].label}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            * Estimates based on Dubai vendor market rates as of 2025. Actual costs may vary by building and vendor availability.
          </p>
        </div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">What DeliWer Coordinates</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Everything. One Request.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-500/15 shrink-0">
                  <service.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-tight mb-1">{service.title}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 px-4 bg-slate-900/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">How It Works</h2>
            <p className="text-gray-400 text-sm font-medium">From request to home-ready in days, not weeks.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Send a Message", desc: "WhatsApp your move details in 2 minutes" },
              { num: "2", title: "We Review", desc: "DeliWer assesses your unit and timeline" },
              { num: "3", title: "Vendors Coordinated", desc: "Ejari, DEWA, movers all scheduled" },
              { num: "4", title: "Home Ready", desc: "You arrive to a fully activated home" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto">
                  {step.num}
                </div>
                <h3 className="font-black text-white text-xs uppercase tracking-tight leading-snug">{step.title}</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Strip ─── */}
      <section className="py-10 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "No Hidden Fees", desc: "Tenants always pay vendor market rates only" },
              { icon: Users, title: "Vetted Vendors", desc: "All service providers are pre-screened" },
              { icon: MessageSquare, title: "One Contact", desc: "One WhatsApp number handles everything" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-3 p-5 bg-white/3 rounded-2xl border border-white/5">
                <Icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-tight">{title}</p>
                  <p className="text-gray-500 text-xs font-medium mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/20 to-slate-950 border-t border-emerald-500/10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Ready to Move In<br /><span className="text-emerald-400">Without the Stress?</span>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              Send one WhatsApp message and DeliWer handles everything.<br />
              You pay only what vendors charge — no markup, no hidden fees.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              size="lg"
              data-testid="button-final-whatsapp"
              onClick={() => buildWhatsApp()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-16 px-12 rounded-2xl text-lg shadow-2xl shadow-emerald-900/40"
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Start Coordination Now
            </Button>

            <Link href="/move-in-plan">
              <Button
                size="lg"
                variant="outline"
                data-testid="button-move-in-plan"
                className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black h-16 px-10 rounded-2xl text-lg"
              >
                Plan My Move-In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
            WhatsApp support · Response within 10 minutes · Dubai-based service
          </p>
        </div>
      </section>
    </div>
  );
}
