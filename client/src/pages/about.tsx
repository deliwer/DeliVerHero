import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, XCircle, MessageCircle, ArrowRight,
  Building2, Shield, Users, Zap, Heart, Globe,
} from "lucide-react";

const NOT_LIST = [
  "A real estate agency or brokerage",
  "A RERA-licensed property agent",
  "A landlord, property manager, or owner",
  "A party to any lease or tenancy agreement",
  "A mortgage, finance, or investment adviser",
  "A government or regulatory body",
];

const IS_LIST = [
  "An operational back-office for people moving in and out of Dubai homes",
  "A coordination platform — Ejari, DEWA, movers, cleaners, water, utilities",
  "A concierge service that activates after you sign your contract",
  "A partner network connecting residents to vetted, trusted vendors",
  "A broker-support layer that helps agents deliver a complete client experience",
];

const MODEL_STEPS = [
  {
    n: "01", title: "You sign your lease",
    desc: "DeliWer plays no role in property search, negotiation, or the tenancy agreement itself. That's between you, your broker, and your landlord.",
    icon: Building2, color: "text-gray-400", border: "border-white/10", bg: "bg-white/5",
  },
  {
    n: "02", title: "You contact DeliWer",
    desc: "Via WhatsApp, web, or a broker referral. We collect your property details, timeline, and what you need handled.",
    icon: MessageCircle, color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5",
  },
  {
    n: "03", title: "We coordinate everything",
    desc: "Ejari registration, DEWA setup, movers, cleaning, water filtration, and any other move-in service — scheduled, sequenced, and followed up.",
    icon: Zap, color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5",
  },
  {
    n: "04", title: "You move in, stress-free",
    desc: "All services confirmed, receipts shared, and your WhatsApp thread remains open for anything that comes up after handover.",
    icon: Heart, color: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/5",
  },
];

const REVENUE_ITEMS = [
  {
    label: "Vendor coordination fees",
    desc: "DeliWer earns a coordination margin from vetted service providers — movers, cleaners, utility activators. Tenants pay vendors directly at market rate.",
  },
  {
    label: "Partner referral commissions",
    desc: "Brokers and affiliates who refer clients earn a commission from DeliWer's coordination revenue — not from the tenant.",
  },
  {
    label: "Membership and concierge tiers",
    desc: "Optional premium tiers for residents who want priority scheduling, dedicated WhatsApp support, and bundled service packages.",
  },
];

const PILLARS = [
  {
    icon: Shield, title: "Regulatory clarity",
    desc: "We operate strictly post-deal. No RERA licence is required for coordination services — we do not act as agents, brokers, or property managers.",
    color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Users, title: "Resident-first model",
    desc: "Every product is designed to reduce friction for the resident. Fees come from vendor relationships — never from markups charged to tenants.",
    color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Globe, title: "WhatsApp-first delivery",
    desc: "Dubai runs on WhatsApp. Our entire concierge flow operates there — no apps to install, no portals to log into, no delays.",
    color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Building2, title: "Broker-aligned, not competing",
    desc: "DeliWer helps brokers deliver more value to clients after the deal closes. We are a post-transaction layer, not a competing channel for leads.",
    color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20",
  },
];

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta
        title="About DeliWer — What We Are (and What We're Not) | Dubai Move-In Concierge"
        description="DeliWer is a post-deal operational concierge for Dubai residents. We coordinate Ejari, DEWA, movers, and setup — we are not a real estate agency, broker, or landlord."
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-5">
          <Fade>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              About DeliWer
            </div>
          </Fade>
          <Fade delay={0.06}>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] text-white">
              We make moving into{" "}
              <span className="text-emerald-400" style={{ textShadow: "0 0 50px rgba(16,185,129,0.35)" }}>
                Dubai homes
              </span>{" "}
              effortless.
            </h1>
          </Fade>
          <Fade delay={0.1}>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl mx-auto">
              DeliWer is an operational concierge that activates after you sign your lease. We handle Ejari, DEWA, movers, cleaning, water, and everything in between — so your first days in your new home feel like home.
            </p>
          </Fade>
          <Fade delay={0.14}>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href="https://wa.me/971523906019?text=Hello DeliWer — I want to learn more about your services."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-about-wa"
              >
                <Button className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-black rounded-2xl h-12 px-8 text-sm">
                  <MessageCircle className="w-4 h-4 mr-2" /> Ask on WhatsApp
                </Button>
              </a>
              <Link href="/move-in" data-testid="btn-about-movein">
                <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/5 font-black rounded-2xl h-12 px-8 text-sm">
                  See Move-In Services <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── WHAT WE ARE / ARE NOT ── */}
      <section className="py-16 px-4 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          <Fade>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">What DeliWer is NOT</h2>
              </div>
              <div className="space-y-2.5">
                {NOT_LIST.map(item => (
                  <div key={item} className="flex items-start gap-3 p-3.5 bg-red-500/[0.04] border border-red-500/10 rounded-xl">
                    <XCircle className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={0.06}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">What DeliWer IS</h2>
              </div>
              <div className="space-y-2.5">
                {IS_LIST.map(item => (
                  <div key={item} className="flex items-start gap-3 p-3.5 bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── HOW THE MODEL WORKS ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <Fade>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[10px] font-black uppercase tracking-widest">
                How It Works
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white">
                Post-deal operations, step by step
              </h2>
              <p className="text-gray-500 font-medium max-w-lg mx-auto">
                DeliWer activates the moment you have a signed contract. Everything before that is between you, your broker, and your landlord.
              </p>
            </div>
          </Fade>

          <div className="space-y-4">
            {MODEL_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Fade key={s.n} delay={i * 0.07}>
                  <div className={`flex items-start gap-5 p-5 rounded-2xl border ${s.bg} ${s.border}`}>
                    <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${s.bg} ${s.border}`}>
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${s.color}`}>Step {s.n}</div>
                      <h3 className="text-white font-black text-base mb-1">{s.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="py-16 px-4 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto space-y-8">
          <Fade>
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white">Our operating principles</h2>
              <p className="text-gray-500 font-medium">The four things we will never compromise on.</p>
            </div>
          </Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Fade key={p.title} delay={i * 0.06}>
                  <div className={`flex items-start gap-4 p-5 rounded-2xl border ${p.bg}`}>
                    <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${p.bg}`}>
                      <Icon className={`w-5 h-5 ${p.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-black text-sm uppercase tracking-tight mb-1 ${p.color}`}>{p.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE MAKE MONEY ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Fade>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[10px] font-black uppercase tracking-widest">
                Business Model
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white">How DeliWer makes money</h2>
              <p className="text-gray-500 font-medium max-w-md mx-auto">
                Transparent by design. Tenants never pay a DeliWer markup — our revenue comes from vendor relationships.
              </p>
            </div>
          </Fade>
          <div className="space-y-3">
            {REVENUE_ITEMS.map((r, i) => (
              <Fade key={r.label} delay={i * 0.07}>
                <div className="flex items-start gap-4 p-5 bg-white/[0.025] border border-white/8 rounded-2xl">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                    <span className="text-emerald-400 font-black text-xs">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm mb-1">{r.label}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.22}>
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 text-center space-y-1">
              <p className="text-gray-400 text-sm font-bold">
                Tenants pay vendors directly —{" "}
                <span className="text-white">at market rate, with no DeliWer surcharge.</span>
              </p>
              <p className="text-gray-600 text-xs">Our coordination margin is settled between DeliWer and the vendor, not passed through to residents.</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── REGULATORY NOTE ── */}
      <section className="py-10 px-4 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto">
          <Fade>
            <div className="bg-slate-900 border border-blue-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                <h3 className="text-white font-black text-sm uppercase tracking-tight">Regulatory Position</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  DeliWer operates as a <strong className="text-white">coordination and concierge service</strong>, not a real estate brokerage. We do not require a RERA licence to provide move-in coordination, utility activation, or relocation support services.
                </p>
                <p>
                  All Ejari registrations are processed through <strong className="text-white">authorised RERA Appointed Trustee Centers</strong>. DeliWer facilitates the submission process on behalf of the resident — we do not issue or guarantee Ejari certificates independently.
                </p>
                <p>
                  DEWA connections are initiated through official DEWA channels. DeliWer assists with documentation and scheduling — the connection and billing relationship is directly between the resident and DEWA.
                </p>
                <p className="text-gray-600 text-xs pt-2 border-t border-white/5">
                  Regulatory or compliance questions: <a href="mailto:info@deliwer.com" className="text-blue-400 hover:underline">info@deliwer.com</a>
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <Fade>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white">
              Ready to make your move easier?
            </h2>
            <p className="text-gray-500 font-medium">
              Tell us your new address on WhatsApp and we'll take it from there.
            </p>
          </Fade>
          <Fade delay={0.08}>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href="https://wa.me/971523906019?text=Hello DeliWer — I just signed my lease and want help with my move-in."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-about-cta-wa"
              >
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-12 px-8 text-sm shadow-lg">
                  <MessageCircle className="w-4 h-4 mr-2" /> Start on WhatsApp
                </Button>
              </a>
              <Link href="/" data-testid="btn-about-home">
                <Button variant="outline" className="border-white/15 text-gray-400 hover:bg-white/5 font-black rounded-2xl h-12 px-8 text-sm">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
