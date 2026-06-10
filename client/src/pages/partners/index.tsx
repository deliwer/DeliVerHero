import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquare, CheckCircle2, ArrowRight, Users, Wallet, Handshake, ChevronDown, ChevronUp, Building2, Star, Zap } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Helmet } from "react-helmet";

const WA_NUMBER = "971523906019";
function openBrokerWA() {
  try {
    const e = JSON.parse(localStorage.getItem("dw_events") || "[]");
    e.push({ t: "wa_click", src: "partners_page", ts: Date.now() });
    localStorage.setItem("dw_events", JSON.stringify(e.slice(-200)));
    const visits = JSON.parse(localStorage.getItem("dw_partners_visits") || "[]");
    visits.push(Date.now());
    localStorage.setItem("dw_partners_visits", JSON.stringify(visits.slice(-100)));
  } catch {}
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer, I'm a real estate broker in Dubai and I'd like to join the referral programme to earn commission on move-in jobs.")}`,
    "_blank"
  );
}

const FAQS = [
  {
    q: "How much commission do I earn?",
    a: "Brokers earn 10% commission on every completed move-in job they refer. The average move-in package is AED 3,500–4,500, meaning you earn AED 350–450 per referral with zero extra work.",
  },
  {
    q: "How do I refer a client?",
    a: "Simply send us your client's contact via WhatsApp once they sign their lease. We take it from there — Ejari, DEWA, movers, cleaning — and report back to you when the job is done.",
  },
  {
    q: "How and when do I get paid?",
    a: "Commission is paid within 7 days of job completion via bank transfer or cash. No complicated paperwork — just a WhatsApp confirmation and a bank account.",
  },
  {
    q: "Do my clients pay extra for the referral?",
    a: "No. Your clients pay the same market rate as any other DeliWer customer. Your commission comes from our side — your client relationship stays intact.",
  },
  {
    q: "Can I refer more than one client at a time?",
    a: "Absolutely. There is no cap on referrals. The more leases you close, the more commission you earn. Our top broker partners refer 10–20 clients per month.",
  },
];

export default function PartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta
        title="Earn 10% Commission on Every Move-In | Broker Partner Programme | DeliWer Dubai"
        description="Real estate brokers in Dubai: earn 10% referral commission on every move-in job. Close the lease, refer to DeliWer, get paid. No extra work required."
      />
      <Helmet>
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${FAQS.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(",")}
  ]
}
        `}</script>
      </Helmet>
      <Navigation />

      {/* ── STICKY WHATSAPP ── */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer, I'm a broker and want to join the referral programme.")}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { try { const e = JSON.parse(localStorage.getItem("dw_events") || "[]"); e.push({ t: "wa_click", src: "partners_sticky", ts: Date.now() }); localStorage.setItem("dw_events", JSON.stringify(e.slice(-200))); } catch {} }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-full px-6 py-4 shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95 text-sm"
        aria-label="Join via WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline">Join via WhatsApp</span>
      </a>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/8 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" /> Broker Referral Programme · Dubai
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92] text-white">
              Earn 10% Commission<br />on Every Move-In<br /><span className="text-emerald-400">You Close</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
              You close the lease. We handle the move-in. You get paid. No extra work, no client risk.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-lg shadow-2xl shadow-emerald-500/20"
              onClick={openBrokerWA}
            >
              <MessageSquare className="w-5 h-5 mr-2" /> Join the Programme
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-black rounded-2xl px-10 h-16 text-lg w-full sm:w-auto">
                See Move-In Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-white/10">
            {[
              { icon: <Wallet className="w-4 h-4 text-emerald-400" />, text: "AED 350–450 per referral" },
              { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, text: "Paid within 7 days" },
              { icon: <Users className="w-4 h-4 text-emerald-400" />, text: "Unlimited referrals" },
              { icon: <Zap className="w-4 h-4 text-emerald-400" />, text: "WhatsApp-only workflow" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-medium">{item.icon} {item.text}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3-STEP PROCESS ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">How It Works</h2>
            <p className="text-gray-400 font-medium">Three steps. Zero friction.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: <Building2 className="w-8 h-8 text-emerald-400" />,
                title: "Close the Lease",
                desc: "Do what you do best — close the deal and hand over the keys to your client.",
              },
              {
                step: "02",
                icon: <Handshake className="w-8 h-8 text-emerald-400" />,
                title: "Refer to DeliWer",
                desc: "Send us your client's number on WhatsApp. We take over the entire move-in process.",
              },
              {
                step: "03",
                icon: <Wallet className="w-8 h-8 text-emerald-400" />,
                title: "Earn Commission",
                desc: "Get paid 10% of the job value within 7 days of completion. Every time. No cap.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-5 hover:border-emerald-500/30 transition-all"
              >
                <div className="text-5xl font-black text-emerald-500/20 leading-none">{s.step}</div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">{s.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">{s.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-lg shadow-xl"
              onClick={openBrokerWA}
            >
              <MessageSquare className="w-5 h-5 mr-2" /> Start Earning — Message Us Now
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHAT YOUR CLIENTS GET ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">What Your Clients Receive</h2>
            <p className="text-gray-400 font-medium">The complete post-lease move-in package — at normal market rates.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Ejari registration coordination",
              "DEWA electricity & water activation",
              "Vetted movers booking & management",
              "Deep cleaning before furniture arrival",
              "AC filter & water filter setup",
              "Single WhatsApp point of contact",
              "Vendor timing coordination",
              "Full move-in completion report",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900 border border-white/8 rounded-2xl px-6 py-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-bold text-gray-200 text-sm uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-sm font-medium">Your clients also benefit from our resources:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-black text-emerald-400 uppercase tracking-widest">
              <Link href="/ejari-dubai" className="hover:text-emerald-300 transition-colors">Ejari Guide →</Link>
              <Link href="/move-in-services-dubai" className="hover:text-emerald-300 transition-colors">Move-In Services →</Link>
              <Link href="/relocation-to-dubai-for-founders" className="hover:text-emerald-300 transition-colors">Founder Relocation →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA MID-PAGE ── */}
      <section className="py-14 px-4 bg-emerald-600/10 border-y border-emerald-500/20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Ready to Start Earning?</h2>
          <p className="text-gray-300 font-medium">Message us on WhatsApp and we'll set you up with your referral link in under 5 minutes.</p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-14 text-base shadow-xl"
            onClick={openBrokerWA}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> Message DeliWer on WhatsApp
          </Button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Broker FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between px-7 py-5">
                  <h3 className="font-black text-white text-sm md:text-base uppercase tracking-tight pr-4">{faq.q}</h3>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                </div>
                {openFaq === i && (
                  <div className="px-7 pb-6">
                    <p className="text-gray-400 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            Start Referring Today.<br /><span className="text-emerald-400">Start Earning Tomorrow.</span>
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-xl mx-auto leading-relaxed">
            Join Dubai's fastest-growing real estate referral network. One WhatsApp message is all it takes.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-14 h-16 text-lg shadow-2xl shadow-emerald-500/20"
            onClick={openBrokerWA}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> Join the Broker Programme
          </Button>
          <p className="text-gray-600 text-sm font-medium">
            Questions? <Link href="/" className="text-emerald-500 hover:underline">See how DeliWer works</Link> · <Link href="/ejari-dubai" className="text-emerald-500 hover:underline">Ejari Guide</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
