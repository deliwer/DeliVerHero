import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { DistressBrokerTrack } from "@/components/marketing/distress-broker-track";
import { BrokerCTABanner } from "@/components/broker-cta-banner";
import { Link } from "wouter";
import {
  CheckCircle2, MessageCircle, ArrowRight, Users, Building2,
  FileText, Home, Layers, ShieldCheck, Clock, Briefcase, Star, Zap,
} from "lucide-react";

const WA_NUMBER = "971523946311";
const WA_MSG = encodeURIComponent(
  "I've finalized or am close to finalizing a property and need help with the move and setup"
);

function openWA() {
  window.open(`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`, "_blank");
}

const PROFESSIONALS = [
  { icon: Briefcase, label: "Real estate brokers" },
  { icon: Building2, label: "Developers" },
  { icon: Home, label: "Landlords" },
  { icon: Users, label: "Corporate relocation teams" },
];

const VALUE_POINTS = [
  {
    icon: Clock,
    title: "Faster client readiness after agreement",
    desc: "Clients move in on schedule — no delays, no dropped handoffs between providers.",
  },
  {
    icon: ShieldCheck,
    title: "Reduced drop-offs due to execution delays",
    desc: "The period between signing and moving is where most friction happens. We eliminate it.",
  },
  {
    icon: Layers,
    title: "Structured move-in coordination",
    desc: "Ejari, DEWA, movers, cleaning, internet — handled in a single flow, not scattered across vendors.",
  },
  {
    icon: Star,
    title: "Enhanced client experience without additional workload",
    desc: "Your client is taken care of after the deal. You get the credit without the operational burden.",
  },
];

const JOURNEY_STEPS = [
  {
    num: "01",
    label: "Client chooses property",
    sub: "Any source — broker, developer, self-found",
    active: false,
  },
  {
    num: "02",
    label: "Agreement / confirmation",
    sub: "Tenancy contract signed or purchase confirmed",
    active: false,
  },
  {
    num: "03",
    label: "DeliWer activates",
    sub: "This is where we enter the picture",
    active: true,
  },
  {
    num: "04",
    label: "Moving, Ejari, setup",
    sub: "Movers, DEWA, Ejari, cleaning, internet — coordinated",
    active: true,
  },
  {
    num: "05",
    label: "Client fully settled",
    sub: "Home ready. Zero gaps. Full handoff complete.",
    active: true,
  },
];

export default function TransactionSupportPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 md:pb-0">
      <SEOMeta
        title="Transaction Support — From Agreement to Move-In | DeliWer Dubai"
        description="DeliWer activates after your property deal is done. Ejari registration, DEWA activation, movers, internet & cleaning — fully coordinated for brokers, landlords & tenants in Dubai."
      />
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-32 md:pt-44 pb-24 md:pb-36 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&h=900&fit=crop&q=80"
            alt="Dubai apartment move-in"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/97 via-slate-900/80 to-slate-950/96" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-7">
          <div className="absolute inset-x-0 -inset-y-12 -z-10 bg-slate-950/60 blur-2xl rounded-3xl pointer-events-none" />

          <Badge
            data-testid="badge-transaction-support"
            className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full"
          >
            Transaction Support
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase drop-shadow-2xl">
            From Agreement<br />
            <span className="text-emerald-400">to Move-In</span> — Handled
          </h1>

          <p className="text-lg text-gray-200 font-medium max-w-xl mx-auto leading-relaxed bg-slate-950/40 rounded-2xl px-5 py-4 backdrop-blur-sm border border-white/5">
            DeliWer works alongside your broker, developer, or landlord to ensure everything after the deal is executed seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              data-testid="button-hero-start-move-plan"
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl px-10 h-14 text-base shadow-2xl"
              onClick={openWA}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start My Move Plan
            </Button>
            <Link href="/broker-partner" data-testid="button-hero-broker-partner">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 font-black rounded-2xl px-8 h-14 text-base"
              >
                <Zap className="w-5 h-5 mr-2 text-purple-400" />
                Broker / Partner?
              </Button>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1">
            {[
              { icon: CheckCircle2, label: "move-in services Dubai" },
              { icon: CheckCircle2, label: "Ejari and moving Dubai" },
              { icon: CheckCircle2, label: "Verified partner network" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAMAC Distress Deals — Broker Track */}
      <section className="px-4 pb-2">
        <div className="max-w-6xl mx-auto">
          <DistressBrokerTrack />
        </div>
      </section>

      {/* ── FROM PAPER TO REALITY ─────────────────────────── */}
      <section className="py-16 px-4 border-y border-white/5 bg-slate-900/40">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">The Gap No One Talks About</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
            From Paper to Reality —<br />
            <span className="text-emerald-400">Without Gaps</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
            In Dubai, transactions move fast — but execution often doesn't. DeliWer ensures there is no gap between agreement and actual move-in.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
            {[
              { label: "Ejari registration", icon: FileText },
              { label: "DEWA activation", icon: Layers },
              { label: "Movers & setup", icon: Home },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 bg-slate-900 border border-white/5 rounded-xl px-4 py-3">
                <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK WITH PROFESSIONALS ───────────────── */}
      <section className="py-20 px-4 border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Professional Coordination</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white text-center mb-4">
            How We Work With Professionals
          </h2>
          <p className="text-center text-gray-400 text-sm mb-10 max-w-lg mx-auto">
            We coordinate with professionals across the property ecosystem. Our role is simple: ensure the client transitions from agreement to living without friction.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {PROFESSIONALS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                data-testid={`professional-card-${label.replace(/\s/g, "-").toLowerCase()}`}
                className="flex items-center gap-3 bg-slate-900 border border-white/5 rounded-2xl px-5 py-4 hover:border-emerald-500/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-white text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>

          {/* Soft Capella mention */}
          <div className="bg-slate-900/70 border border-white/8 rounded-2xl p-6 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Working Alongside Trusted Market Professionals</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              In select cases, DeliWer collaborates with established firms such as Capella Properties to ensure alignment between transaction timelines and move-in execution.
            </p>
            <p className="text-[11px] text-slate-600">
              DeliWer does not participate in property transactions — we enhance what happens after.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLIENT JOURNEY FLOW ───────────────────────────── */}
      <section className="py-20 px-4 border-b border-white/5 bg-slate-900/30">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Client Journey Flow</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white text-center mb-10">
            Where DeliWer Fits In
          </h2>

          <div className="relative space-y-0">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.num}
                data-testid={`journey-step-${step.num}`}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {/* Vertical connector line */}
                {i < JOURNEY_STEPS.length - 1 && (
                  <div
                    className={`absolute left-[18px] top-10 bottom-0 w-px ${
                      step.active ? "bg-emerald-500/40" : "bg-slate-700"
                    }`}
                  />
                )}

                {/* Step dot */}
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                  step.active
                    ? "bg-emerald-500/15 border-emerald-500/50"
                    : "bg-slate-800 border-slate-700"
                }`}>
                  {step.active
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    : <span className="text-[10px] font-black text-slate-500">{step.num}</span>
                  }
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className={`font-black text-sm uppercase tracking-tight ${step.active ? "text-white" : "text-slate-500"}`}>
                      {step.label}
                    </p>
                    {step.num === "03" && (
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
                        DeliWer Starts Here
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-slate-600 mt-8">
            DeliWer starts after Step 2 — not part of deal-making.
          </p>
        </div>
      </section>

      {/* ── WHY PROFESSIONALS WORK WITH DELIVERWER ────────── */}
      <section className="py-20 px-4 border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Value Proposition</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white text-center mb-10">
            Why Professionals Work With DeliWer
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUE_POINTS.map((vp, i) => (
              <div
                key={i}
                data-testid={`value-point-${i}`}
                className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <vp.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="font-black text-white text-sm uppercase tracking-tight mb-2">{vp.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR BROKERS & PARTNERS ────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-950/50 via-slate-950 to-purple-950/30 border-y border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-purple-300 text-[10px] font-black uppercase tracking-widest">For Real Estate Professionals</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-tight">
                Are you a broker or property professional?
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Share DeliWer with your clients the moment the tenancy is signed. We handle everything after the deal — and you earn on every completed service.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 font-semibold justify-center md:justify-start">
                {["Studio: AED 150–300", "1BR: AED 300–600", "Villa: AED 800+", "Free to join"].map(t => (
                  <span key={t} className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link href="/broker-onboard" data-testid="cta-ts-broker-partner">
                <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-8 h-12 text-sm shadow-xl shadow-purple-900/30 transition-all">
                  <Zap className="w-4 h-4 mr-2" /> Generate My Referral Link
                </Button>
              </Link>
              <Link href="/partners" data-testid="cta-ts-partner-overview">
                <Button variant="outline" className="w-full md:w-auto border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-black rounded-2xl px-8 h-11 text-sm">
                  <ArrowRight className="w-4 h-4 mr-2" /> Partner Program Overview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <ArrowRight className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Ready to Move In?</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
            Tell us where you are in your property journey and we'll activate the right move-in coordination for you.
          </p>
          <Button
            data-testid="button-cta-start-move-plan"
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl px-10 h-14 text-base shadow-2xl w-full"
            onClick={openWA}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start My Move Plan
          </Button>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2">
            {[
              "Relocation support Dubai",
              "After property purchase support Dubai",
              "Tenant setup Dubai",
            ].map((label) => (
              <span key={label} className="text-slate-600 text-[11px] font-semibold">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROKER CTA STRIP ──────────────────────────────── */}
      <section className="py-10 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <BrokerCTABanner context="RERA Broker? Refer your clients after agreement — earn AED 300–800 per move-in, free to join." />
        </div>
      </section>

      {/* ── STICKY MOBILE BAR ─────────────────────────────── */}
      <div
        data-testid="sticky-mobile-cta"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 p-3"
      >
        <Button
          data-testid="button-sticky-start-move-plan"
          size="lg"
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl h-12 text-sm shadow-2xl"
          onClick={openWA}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Start My Move Plan
        </Button>
      </div>
    </div>
  );
}
