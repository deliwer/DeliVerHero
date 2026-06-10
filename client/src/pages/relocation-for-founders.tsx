import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle2, ArrowRight, Zap, Shield, Clock, Star, Building2, ChevronDown, ChevronUp, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { Helmet } from "react-helmet";

const WA_NUMBER = "971523906019";
function openWA(src = "founders_page") {
  try {
    const e = JSON.parse(localStorage.getItem("dw_events") || "[]");
    e.push({ t: "wa_click", src, ts: Date.now() });
    localStorage.setItem("dw_events", JSON.stringify(e.slice(-200)));
  } catch {}
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer, I'm a founder relocating to Dubai and need move-in concierge support after lease signing.")}`,
    "_blank"
  );
}

const FAQS = [
  {
    q: "How fast can DeliWer set up my Dubai home?",
    a: "Typically 48–72 hours from lease signing to a fully functional living space. Ejari is registered within 1–3 business days; DEWA activation is usually same-day once Ejari is done. We sequence everything to ensure your home is ready the moment you arrive.",
  },
  {
    q: "Can you manage my move-in before I land in Dubai?",
    a: "Yes. Many of our founder clients are still abroad when they sign their lease. We can prepare your home remotely — Ejari document submission, DEWA activation, apartment deep clean, and water filter installation — so everything is operational on arrival day.",
  },
  {
    q: "What is the cost of the founder relocation package?",
    a: "Our coordination fee starts at AED 399 for the Move-In Activation package. Vendor costs (movers, cleaning, Ejari, DEWA) are at normal market rates — we do not inflate prices. A full setup for a 1-bedroom is typically AED 3,500–4,500 all-in.",
  },
  {
    q: "Do you handle business setup or Golden Visa applications?",
    a: "We focus exclusively on the home setup journey — Ejari, DEWA, physical home services. For business licensing and Golden Visa, we refer you to vetted partners in Dubai's legal and business setup ecosystem.",
  },
  {
    q: "How does the WhatsApp concierge work?",
    a: "You send one message. We ask a few quick questions about your apartment, your move-in date, and what services you need. From there, your dedicated DeliWer coordinator manages all vendors and sends you status updates via WhatsApp — no dashboards, no forms, no chasing.",
  },
  {
    q: "What if I have specific home office requirements?",
    a: "Tell us during onboarding. We can coordinate internet setup consultation, ergonomic furniture assembly, and any specific tech setup you need for a founder-grade home office in Dubai.",
  },
];

export default function RelocationForFounders() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta
        title="Relocation to Dubai for Founders | Post-Lease Move-In Concierge | DeliWer"
        description="The post-lease move-in concierge built for founders relocating to Dubai. Ejari, DEWA, home setup — all handled via WhatsApp while you focus on your startup. Serving the Dubai founder ecosystem."
      />
      <Helmet>
        <meta name="keywords" content="relocation to Dubai for founders, Dubai startup relocation, move to Dubai founder, Ejari Dubai, home setup Dubai, Golden Visa relocation concierge" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Founder Relocation to Dubai",
  "provider": { "@type": "LocalBusiness", "name": "DeliWer", "url": "https://www.deliwer.com" },
  "serviceType": "Post-Lease Relocation Concierge for Founders",
  "areaServed": { "@type": "City", "name": "Dubai" },
  "description": "Relocation concierge for tech founders moving to Dubai. We handle Ejari, DEWA, movers and home setup via WhatsApp so founders can focus on their startups."
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
    { "@type": "ListItem", "position": 2, "name": "Relocation to Dubai for Founders", "item": "https://www.deliwer.com/relocation-to-dubai-for-founders" }
  ]
}
        `}</script>
      </Helmet>
      <Navigation />

      {/* ── STICKY WHATSAPP ── */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer, I'm a founder relocating to Dubai and need move-in concierge support.")}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { try { const e = JSON.parse(localStorage.getItem("dw_events") || "[]"); e.push({ t: "wa_click", src: "founders_sticky", ts: Date.now() }); localStorage.setItem("dw_events", JSON.stringify(e.slice(-200))); } catch {} }}
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
              <Rocket className="w-3.5 h-3.5" /> Post-Lease Concierge for Dubai Founders
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92] text-white">
              Relocation to Dubai<br />for Founders &<br /><span className="text-emerald-400">Startup Builders</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
              You build the startup. We build the home. The only post-lease concierge designed for the speed of founders relocating to Dubai.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-lg shadow-2xl shadow-emerald-500/20" onClick={() => openWA("hero")}>
              <MessageSquare className="w-5 h-5 mr-2" /> Start via WhatsApp
            </Button>
            <Link href="/move-in-services-dubai">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-black rounded-2xl px-10 h-16 text-lg w-full sm:w-auto">
                See All Move-In Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-white/10">
            {[
              { icon: <Clock className="w-4 h-4 text-emerald-400" />, text: "48–72 hour setup" },
              { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: "Remote-friendly" },
              { icon: <Star className="w-4 h-4 text-emerald-400" />, text: "No vendor chaos" },
              { icon: <Zap className="w-4 h-4 text-emerald-400" />, text: "WhatsApp-first" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-medium">{item.icon} {item.text}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THE FOUNDER PROBLEM ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white text-center">The Founder Relocation Problem</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-400 font-medium leading-relaxed">
              Moving to Dubai as a founder is not just about the Golden Visa or the tax advantages. It is about the two weeks of administrative chaos that follows the moment you sign your lease. Ejari registration, DEWA activation, movers coordination, deep cleaning, AC sanitization, water filter installation, and building registration — this process can consume 40–60 hours of your most valuable resource: your time.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              For a founder in build mode, this is unacceptable. Every hour spent chasing a DEWA call center or rescheduling a cleaning crew is an hour not spent on customer acquisition, fundraising, or product development. The opportunity cost of a bad move-in experience in Dubai runs into the thousands — in both AED and momentum.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              DeliWer was built specifically for this problem. We operate as your operational back-office for the entire post-lease period. You hand us your lease date and apartment details. We build your move-in plan, manage every vendor, and keep you updated via WhatsApp — while you stay in execution mode on your startup.
            </p>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 shadow-xl" onClick={() => openWA("problem_cta")}>
              <MessageSquare className="w-5 h-5 mr-2" /> Get Your Move-In Plan
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHAT WE HANDLE ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">What DeliWer Handles for Founders</h2>
            <p className="text-gray-400 font-medium">The complete post-lease checklist — owned by us, reported to you.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Ejari registration & RERA submission",
              "DEWA electricity & water activation",
              "District Cooling (Empower) registration",
              "Deep apartment cleaning (pre-furniture)",
              "Vetted movers coordination & supervision",
              "AC filter cleaning & sanitization",
              "Shower & drinking water filter installation",
              "Building concierge & NOC coordination",
              "Home office setup consultation",
              "Vendor timeline sequencing & updates",
              "WhatsApp-only communication — no portals",
              "Final move-in completion report",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900 border border-white/8 rounded-2xl px-6 py-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-bold text-gray-200 text-sm uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA MID-PAGE ── */}
      <section className="py-14 px-4 bg-emerald-600/10 border-y border-emerald-500/20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Ready to Relocate Without the Chaos?</h2>
          <p className="text-gray-300 font-medium">Send one WhatsApp message. We'll respond with your personalised move-in plan within 2 hours.</p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-14 text-base shadow-xl" onClick={() => openWA("mid_cta")}>
            <MessageSquare className="w-5 h-5 mr-2" /> Message DeliWer on WhatsApp
          </Button>
        </div>
      </section>

      {/* ── WHY DUBAI FOR FOUNDERS ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white text-center">Why Founders Are Relocating to Dubai</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-400 font-medium leading-relaxed">
              Dubai has become one of the world's fastest-growing startup ecosystems. Zero personal income tax, a central timezone between Europe and Asia, world-class infrastructure, and the UAE Golden Visa programme for founders and investors have driven a surge in relocation from the UK, US, India, Europe, and the MENA region.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              The Dubai International Financial Centre (DIFC), Dubai Silicon Oasis, and the Mohammed Bin Rashid Innovation Fund (MBRIF) ecosystem provide funding access, regulatory sandboxes, and co-working infrastructure at global standards. For B2B SaaS, fintech, logistics, and deeptech founders, Dubai offers direct proximity to GCC enterprise buyers and sovereign wealth.
            </p>
            <p className="text-gray-400 font-medium leading-relaxed">
              The challenge is the operational friction of the move itself. Unlike Singapore or London, Dubai's home setup process involves a unique sequence of government registrations (Ejari, DEWA, Empower) that are not intuitive for first-time residents. DeliWer was built to remove that friction entirely — so founders can focus on what matters.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Zap className="w-6 h-6 text-emerald-400" />, title: "0% Personal Tax", desc: "Keep 100% of your income in the UAE." },
              { icon: <Building2 className="w-6 h-6 text-emerald-400" />, title: "Golden Visa", desc: "10-year residency for founders & investors." },
              { icon: <Star className="w-6 h-6 text-emerald-400" />, title: "GCC Market Access", desc: "Direct path to $1.5T GCC enterprise buyers." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-white/8 rounded-2xl p-6 space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto">{item.icon}</div>
                <h3 className="font-black text-white uppercase tracking-tight text-sm">{item.title}</h3>
                <p className="text-gray-500 font-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Founder Relocation FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-slate-950 border border-white/8 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
          <h2 className="text-xl font-black uppercase tracking-tighter text-gray-400">More Resources</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-black uppercase tracking-widest">
            <Link href="/ejari-dubai" className="text-emerald-400 hover:text-emerald-300 transition-colors">Ejari Registration Dubai →</Link>
            <Link href="/move-in-services-dubai" className="text-emerald-400 hover:text-emerald-300 transition-colors">Move-In Services Dubai →</Link>
            <Link href="/partners" className="text-emerald-400 hover:text-emerald-300 transition-colors">Broker Commission Programme →</Link>
            <Link href="/dewa-activation" className="text-emerald-400 hover:text-emerald-300 transition-colors">DEWA Activation →</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-4 bg-emerald-600/10 border-t border-emerald-500/20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
            Focus on Your Startup.<br /><span className="text-emerald-400">We'll Handle the Move.</span>
          </h2>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-14 h-16 text-lg shadow-2xl shadow-emerald-500/20" onClick={() => openWA("final_cta")}>
            <MessageSquare className="w-5 h-5 mr-2" /> Start Your Relocation on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
