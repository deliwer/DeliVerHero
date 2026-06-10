import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, Home, Wrench, Shield, ArrowRight, Clock, Star, Zap, Droplets, Truck, Users, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { Helmet } from "react-helmet";

const WA_NUMBER = "971523906019";
function openWA(src = "move_in_services") {
  try {
    const e = JSON.parse(localStorage.getItem("dw_events") || "[]");
    e.push({ t: "wa_click", src, ts: Date.now() });
    localStorage.setItem("dw_events", JSON.stringify(e.slice(-200)));
  } catch {}
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer, I just signed a lease in Dubai and need move-in services support.")}`,
    "_blank"
  );
}

const FAQS = [
  {
    q: "What move-in services do you cover in Dubai?",
    a: "DeliWer covers the complete post-lease setup: Ejari registration, DEWA electricity & water activation, vetted movers coordination, deep apartment cleaning, AC filter sanitization, shower filter installation, and internet setup guidance — all via one WhatsApp conversation.",
  },
  {
    q: "How long does a full move-in take with DeliWer?",
    a: "Most tenants are fully moved in and operational within 48–72 hours of lease signing. Ejari typically takes 1–3 business days; DEWA can be same-day. We sequence everything to minimize your wait.",
  },
  {
    q: "What is the cost of move-in services in Dubai?",
    a: "You pay normal market vendor rates — DeliWer does not inflate prices. Our coordination fee starts at AED 399 for the Move-In Activation package. Full vendor costs for a 1-bedroom are typically AED 3,500–4,500 all-in.",
  },
  {
    q: "Do I need to be present for all services?",
    a: "No. For many services — like Ejari document submission and DEWA online activation — we can coordinate remotely. For physical services like cleaning and moving, we manage the vendors on your behalf and keep you updated via WhatsApp.",
  },
  {
    q: "Can you help with move-in even if I'm relocating from abroad?",
    a: "Yes. Many of our clients are international relocators who haven't arrived in Dubai yet. We can prepare everything before you land — including Ejari readiness, apartment deep clean, and utility activation — so your home is ready when you arrive.",
  },
  {
    q: "Do you work with real estate brokers?",
    a: "Absolutely. Brokers can refer their clients to DeliWer and earn a 10% commission on every completed move-in job. See our broker partner programme for details.",
  },
];

export default function MoveInServicesDubai() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta
        title="Move-In Services Dubai | Post-Lease Home Setup Concierge | DeliWer"
        description="Complete move-in services in Dubai after lease signing. Ejari, DEWA, movers, cleaning & utilities — all coordinated via WhatsApp. Serving Dubai founders, expats & tenants."
      />
      <Helmet>
        <meta name="keywords" content="move-in services Dubai, Dubai apartment setup, Ejari registration, DEWA activation, relocation concierge Dubai, home setup after lease" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Move-In Services Dubai",
  "provider": { "@type": "LocalBusiness", "name": "DeliWer", "url": "https://www.deliwer.com" },
  "serviceType": "Post-Lease Move-In Coordination",
  "areaServed": { "@type": "City", "name": "Dubai" },
  "description": "Complete move-in services in Dubai after lease signing. Ejari, DEWA, movers, cleaning and utilities all coordinated via WhatsApp.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "AED", "description": "Move-In Activation Package" }
}
        `}</script>
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${FAQS.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(",")}
  ]
}
        `}</script>
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.deliwer.com" },
    { "@type": "ListItem", "position": 2, "name": "Move-In Services Dubai", "item": "https://www.deliwer.com/move-in-services-dubai" }
  ]
}
        `}</script>
      </Helmet>
      <Navigation />

      {/* ── STICKY WHATSAPP ── */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer, I just signed a lease in Dubai and need move-in services support.")}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { try { const e = JSON.parse(localStorage.getItem("dw_events") || "[]"); e.push({ t: "wa_click", src: "move_in_sticky", ts: Date.now() }); localStorage.setItem("dw_events", JSON.stringify(e.slice(-200))); } catch {} }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-full px-6 py-4 shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95 text-sm"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/8 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" /> Move-In Concierge · Dubai
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92] text-white">
              Dubai Move-In Services<br /><span className="text-emerald-400">After Lease Signing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Ejari. DEWA. Movers. Cleaning. All coordinated for you — via one WhatsApp message. Zero vendor chaos.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-lg shadow-2xl shadow-emerald-500/20" onClick={() => openWA("hero")}>
              <MessageSquare className="w-5 h-5 mr-2" /> Start on WhatsApp
            </Button>
            <Link href="/partners">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-black rounded-2xl px-10 h-16 text-lg w-full sm:w-auto">
                Brokers — Earn Commission <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-white/10">
            {[
              { icon: <Clock className="w-4 h-4 text-emerald-400" />, text: "48–72 hour turnaround" },
              { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: "Verified vendors only" },
              { icon: <Star className="w-4 h-4 text-emerald-400" />, text: "No hidden fees" },
              { icon: <Zap className="w-4 h-4 text-emerald-400" />, text: "WhatsApp-first" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-medium">{item.icon} {item.text}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              After you sign a lease in Dubai, this lands on your plate
            </h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">Without a concierge, most tenants spend 20+ hours coordinating these tasks across different providers.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Shield className="w-5 h-5" />, label: "Ejari Registration", note: "Documents, trustee booking, submission" },
              { icon: <Zap className="w-5 h-5" />, label: "DEWA Activation", note: "Electricity & water — requires Ejari first" },
              { icon: <Truck className="w-5 h-5" />, label: "Vetted Movers", note: "Quoting, scheduling, trusting the right crew" },
              { icon: <Home className="w-5 h-5" />, label: "Deep Cleaning", note: "Before furniture — critical for move-in" },
              { icon: <Droplets className="w-5 h-5" />, label: "Water Filter Setup", note: "Shower & drinking water filtration" },
              { icon: <Wrench className="w-5 h-5" />, label: "AC Sanitization", note: "Filters, coil cleaning, health check" },
              { icon: <Building2 className="w-5 h-5" />, label: "District Cooling", note: "Empower or chilled water registration" },
              { icon: <Users className="w-5 h-5" />, label: "Vendor Coordination", note: "Sequencing all services in the right order" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700/60 rounded-2xl p-4 space-y-2 hover:border-red-500/20 transition-all">
                <div className="text-red-400/70">{item.icon}</div>
                <div className="font-black text-white text-xs uppercase tracking-tight">{item.label}</div>
                <div className="text-gray-600 text-[10px] font-medium leading-relaxed">{item.note}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-8 py-5">
              <p className="text-emerald-300 font-black text-lg md:text-xl">DeliWer handles all of it — from one WhatsApp message.</p>
              <p className="text-gray-400 text-sm font-medium mt-1">You pay only normal vendor market rates. We coordinate everything.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Complete Move-In Services</h2>
            <p className="text-gray-400 font-medium">From the moment you sign, to the moment your home is fully operational.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Administrative Setup",
                icon: <Shield className="w-8 h-8" />,
                items: ["Ejari Registration (RERA)", "DEWA Electricity & Water", "District Cooling (Empower)", "Building NOC Coordination", "Tenancy Document Filing"],
              },
              {
                title: "Home Readiness",
                icon: <Wrench className="w-8 h-8" />,
                items: ["Full Deep Cleaning", "AC Filter Sanitization", "Shower Filter Installation", "Water Quality Assessment", "Pest Control Coordination"],
              },
              {
                title: "Settling Logistics",
                icon: <Truck className="w-8 h-8" />,
                items: ["Vetted Movers Booking", "Furniture Assembly", "Curtain & Blind Hanging", "Internet Setup Guidance", "Handover Snagging Report"],
              },
            ].map((cat, i) => (
              <Card key={i} className="bg-slate-900 border border-white/8 rounded-3xl p-8 hover:border-emerald-500/30 transition-colors">
                <CardContent className="p-0 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">{cat.icon}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">{cat.title}</h3>
                  <ul className="space-y-2.5">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex gap-3 items-center text-gray-400 font-bold text-sm uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section className="py-14 px-4 bg-emerald-600/10 border-y border-emerald-500/20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Ready to Start Your Move-In?</h2>
          <p className="text-gray-300 font-medium">Send us one WhatsApp message. We'll ask you a few quick questions and get everything moving.</p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-14 text-base shadow-xl" onClick={() => openWA("mid_cta")}>
            <MessageSquare className="w-5 h-5 mr-2" /> Message DeliWer on WhatsApp
          </Button>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">How DeliWer Move-In Works</h2>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "You Sign the Lease", desc: "The moment your tenancy contract is signed, message DeliWer on WhatsApp. Include your move-in date and apartment size." },
              { step: "02", title: "We Build Your Move-In Plan", desc: "Within 2 hours, your DeliWer coordinator sends you a full move-in plan: Ejari timeline, DEWA activation steps, cleaning schedule, and mover quotes." },
              { step: "03", title: "We Execute Everything", desc: "We manage every vendor — confirmation calls, rescheduling, quality checks. You receive WhatsApp updates at every stage, not vendor chaos." },
              { step: "04", title: "Your Home is Ready", desc: "Utilities on. Home clean. Boxes unpacked. We send you the final completion report and you're free to live your Dubai life." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-6 bg-slate-900 border border-white/8 rounded-2xl px-7 py-6 hover:border-emerald-500/20 transition-colors">
                <div className="text-3xl font-black text-emerald-500/30 leading-none shrink-0 w-10">{s.step}</div>
                <div className="space-y-1">
                  <h3 className="font-black text-white uppercase tracking-tight">{s.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DUBAI MOVE-IN IS HARD ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white text-center">Why Dubai Move-In Is More Complex Than You Think</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-400 font-medium leading-relaxed">
              Moving into a new apartment in Dubai is not like moving in most other cities. The UAE has specific regulatory requirements that must be completed in a precise sequence. Skip Ejari and you cannot activate DEWA. Skip DEWA and you have no electricity or water. Get the vendor sequencing wrong and your move-in date slips by a week.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              Ejari — the government tenancy registration system run by RERA (Real Estate Regulatory Agency) — is the legal prerequisite for everything else. It requires specific documents: the signed tenancy contract, tenant Emirates ID, landlord passport copy or Emirates ID, and the property title deed. Missing one delays your entire move-in.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              Once Ejari is registered, DEWA (Dubai Electricity and Water Authority) activation can proceed. This is typically a 24–48 hour process once the Ejari reference number is submitted. District Cooling (Empower) operates separately and requires its own registration if applicable to your building.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              On the physical side, deep cleaning must happen before movers arrive, and movers must finish before furniture assembly begins. Coordination across 4–6 different vendors — each with their own scheduling constraints — is where most Dubai tenants lose days of their lives.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              DeliWer was built specifically to solve this. We operate as your operational back-office for the entire post-lease period, managing vendor timelines, document submissions, and quality checks — entirely via WhatsApp.
            </p>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 shadow-xl" onClick={() => openWA("content_cta")}>
              <MessageSquare className="w-5 h-5 mr-2" /> Start Your Move-In on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between px-7 py-5">
                  <h3 className="font-black text-white text-sm md:text-base uppercase tracking-tight pr-4">{faq.q}</h3>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                </div>
                {openFaq === i && (
                  <div className="px-7 pb-6"><p className="text-gray-400 font-medium leading-relaxed">{faq.a}</p></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section className="py-14 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tighter text-gray-400">Also Useful</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-black uppercase tracking-widest">
            <Link href="/ejari-dubai" className="text-emerald-400 hover:text-emerald-300 transition-colors">Ejari Registration Dubai →</Link>
            <Link href="/relocation-to-dubai-for-founders" className="text-emerald-400 hover:text-emerald-300 transition-colors">Founder Relocation Dubai →</Link>
            <Link href="/partners" className="text-emerald-400 hover:text-emerald-300 transition-colors">Broker Commission Programme →</Link>
            <Link href="/dewa-activation" className="text-emerald-400 hover:text-emerald-300 transition-colors">DEWA Activation →</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-4 bg-emerald-600/10 border-t border-emerald-500/20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">One Message. Complete Move-In.</h2>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-14 h-16 text-lg shadow-2xl shadow-emerald-500/20" onClick={() => openWA("final_cta")}>
            <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp DeliWer Now
          </Button>
        </div>
      </section>
    </div>
  );
}
