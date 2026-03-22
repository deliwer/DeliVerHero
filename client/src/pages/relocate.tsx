import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Home,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip } from "@/components/trust-strip";
import relocateHero from "@/assets/images/relocate-hero.jpg";
import moveOutBg from "@/assets/images/move-out-bg.jpg";
import moveInBg from "@/assets/images/move-in-bg.jpg";

import { Navigation } from "@/components/navigation";

export default function Relocate() {
  const [location] = useLocation();
  const activationRef = useRef<HTMLDivElement>(null);
  const moveOutRef = useRef<HTMLDivElement>(null);

  const scrollToActivation = () => {
    activationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type");
    
    if (type === 'activation' || type === 'relocation') {
      activationRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.includes("#move-out-packs")) {
      moveOutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <Helmet>
        <title>Move-In Coordination Dubai | Ejari, DEWA & Movers Bundled | DeliWer</title>
        <meta name="description" content="DeliWer coordinates your full Dubai move-in — Ejari, DEWA, movers, and water filter — at normal vendor market rates. WhatsApp to start in 60 seconds." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-24">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${relocateHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mx-auto mb-4">
              <ShieldCheck className="w-4 h-4" /> Dubai's Trusted Relocation Partner
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              Arrive. Settle. <br />
              <span className="text-emerald-500">Live Better.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-bold uppercase tracking-tight">
              One unified orchestration layer for your Dubai transition. <br />
              <span className="text-blue-400 italic font-serif lowercase tracking-normal">Ejari, DEWA & Home Setup handled without you leaving your place.</span>
            </p>
            <p className="text-base text-gray-400 max-w-2xl mx-auto font-medium normal-case tracking-normal mt-2 italic">
              Moving into a new home involves many steps. DeliWer coordinates Ejari, DEWA, movers, and home readiness in one request — so your transition is smooth without the admin headache.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button 
              onClick={scrollToActivation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-emerald-900/40 group"
              data-testid="button-hero-movein"
            >
              Plan My Move-In
            </Button>
            <Link href="/exit-dubai">
              <Button 
                className="bg-slate-800 hover:bg-slate-700 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl border border-white/10 group w-full"
                data-testid="button-hero-moveout"
              >
                Move-Out Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Move-In Packages Section */}
      <section ref={activationRef} id="activation-section" className="relative px-4 py-32 border-y border-white/5 overflow-hidden bg-slate-900/40">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">Move-In <span className="text-emerald-500">Coordination</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-bold text-lg leading-tight uppercase tracking-tight">Ejari · DEWA · Movers · Water Filter — handled in one WhatsApp</p>
          </div>

          {/* DIY vs DeliWer Comparison */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DIY column */}
              <Card className="bg-slate-900/60 border-white/10 p-8 rounded-[2rem]">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">The DIY Route</p>
                <div className="space-y-4">
                  {[
                    { label: "Book Ejari appointment", note: "Queue at typing center, 1–2 hrs" },
                    { label: "Activate DEWA separately", note: "App + docs + follow-up calls" },
                    { label: "Find & book movers", note: "Compare quotes, chase vendors" },
                    { label: "Water filter research & install", note: "Extra errand + technician" },
                    { label: "Coordinate everything yourself", note: "While still working full-time" },
                  ].map(({ label, note }, i) => (
                    <div key={i} className="flex gap-3">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-200 font-bold text-sm">{label}</p>
                        <p className="text-gray-500 text-xs">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-wide">Same vendor prices. Far more time &amp; stress.</p>
                </div>
              </Card>

              {/* DeliWer column */}
              <Card className="bg-emerald-900/20 border-emerald-500/40 p-8 rounded-[2rem] shadow-xl shadow-emerald-900/20">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-400">The DeliWer Way</p>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-full px-3 py-1">Recommended</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "One WhatsApp message", note: "Tell us your move-in date + apartment type" },
                    { label: "We coordinate Ejari", note: "Handled by our team, tracked to completion" },
                    { label: "We activate DEWA", note: "Paperwork and follow-up done for you" },
                    { label: "We book vetted movers", note: "From our trusted partner network" },
                    { label: "Water filter installed on move-in day", note: "Shower-ready from Day 1" },
                  ].map(({ label, note }, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold text-sm">{label}</p>
                        <p className="text-emerald-300/60 text-xs">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-3">
                  <p className="text-emerald-300 text-sm font-black uppercase tracking-wide">You pay only normal vendor market rates.</p>
                  <p className="text-gray-400 text-xs leading-relaxed">DeliWer earns a coordination fee from vendors — not added to your bill. Your total is the same or less than booking each vendor yourself.</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Cost ranges by apartment type */}
          <div className="max-w-5xl mx-auto mb-10">
            <p className="text-center text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Typical Vendor Cost Ranges (Movers + Ejari + DEWA + Water Filter)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { size: "Studio", range: "AED 2,800–3,600" },
                { size: "1 BR", range: "AED 3,200–4,200" },
                { size: "2 BR", range: "AED 3,800–5,200" },
                { size: "3 BR", range: "AED 4,500–6,000" },
              ].map(({ size, range }, i) => (
                <div key={i} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 text-center" data-testid={`card-cost-${i}`}>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{size}</p>
                  <p className="text-emerald-400 font-black text-lg leading-tight">{range}</p>
                  <p className="text-gray-600 text-[10px] mt-1 uppercase tracking-wide">vendor market rate</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-xs mt-4 font-medium">Prices vary by location and providers. DeliWer adds no markup — you pay the vendor directly or through DeliWer at the same rate.</p>
          </div>

          {/* Main CTA */}
          <div className="max-w-xl mx-auto text-center">
            <Button
              onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I just signed my lease and want help coordinating my move-in (Ejari, DEWA, movers, and water filter).")}`, '_blank')}
              className="w-full h-20 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl shadow-2xl transition-all active:scale-95"
              data-testid="button-activate-home"
            >
              Start My Move-In Coordination
            </Button>
            <p className="text-gray-500 text-xs mt-3 font-medium">Reply within 10 minutes · No deposit required to start</p>
          </div>

          <div className="mt-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between bg-emerald-500/10 p-8 rounded-3xl border border-emerald-500/20">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-black uppercase text-white">Leaving an apartment instead?</h3>
              <p className="text-gray-400 font-medium text-sm">Coordinate utilities closure, cancellation & logistics.</p>
            </div>
            <Link href="/exit-dubai">
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest px-8">
                See Move-Out Support →
              </Button>
            </Link>
          </div>

          <div className="mt-32 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 space-y-6">
              <h3 className="text-2xl font-black uppercase text-emerald-500">What's Included</h3>
              <ul className="grid grid-cols-1 gap-4 text-sm font-bold text-gray-300 uppercase tracking-tight">
                <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 60–90 min visit</li>
                <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Shower filter installation</li>
                <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> AC filter clean (1 unit)</li>
                <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Water readiness check</li>
                <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> WhatsApp coordination</li>
              </ul>
            </div>
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 space-y-6 opacity-80">
              <h3 className="text-2xl font-black uppercase text-red-500">Not Included</h3>
              <ul className="grid grid-cols-1 gap-4 text-sm font-bold text-gray-400 uppercase tracking-tight">
                <li className="flex gap-3 items-center"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Deep AC servicing</li>
                <li className="flex gap-3 items-center"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Gas refill / repair</li>
                <li className="flex gap-3 items-center"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Duct cleaning</li>
                <li className="flex gap-3 items-center"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Major hardware</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* No Upfront Planning Cost */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
            Transparent Coordination
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            No Upfront Planning Cost
          </h2>
          <div className="text-gray-300 text-base leading-relaxed space-y-3 text-left bg-white/5 rounded-3xl p-8 border border-white/10">
            <p>DeliWer first helps residents plan their move-in coordination.</p>
            <p>Once planning is complete, residents only pay for the services they select — such as movers, storage, or relocation logistics.</p>
            <p>The coordination support is integrated within the relocation ecosystem rather than requiring a planning fee.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-sm font-bold uppercase tracking-widest text-emerald-400">
            {["1. Tell us about your move", "2. We plan & coordinate", "3. You choose & confirm"].map((s, i) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl py-3 px-4">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Relocation Coordination Network */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-black uppercase tracking-widest">
              Partner Network
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Relocation Coordination Network
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              DeliWer works with trusted relocation and logistics partners to support different moving requirements. Depending on the needs of the resident, coordination may include:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Home movers",
              "Packing services",
              "Temporary storage",
              "Relocation logistics",
              "International moving support",
              "Move-in readiness coordination"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-200 font-semibold text-sm uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-3">
            <p className="text-white font-black uppercase text-xs tracking-widest mb-3">Partner Examples</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              DeliWer coordinates with established relocation partners including <span className="text-gray-200 font-semibold">SGM</span>, <span className="text-gray-200 font-semibold">GLG</span>, <span className="text-gray-200 font-semibold">Al Reza Group</span>, and <span className="text-gray-200 font-semibold">ARO Overseas</span> depending on move requirements. Partners may vary based on the specific needs of each resident.
            </p>
          </div>
        </div>
      </section>

      {/* A Trusted Partner During Your Move */}
      <section className="py-20 px-4 bg-emerald-950/20 border-y border-emerald-500/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            A Trusted Partner During Your Move
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed italic">
            Relocating can involve multiple providers and unexpected tasks.
          </p>
          <p className="text-gray-400 leading-relaxed">
            DeliWer helps residents coordinate these services so the transition into their new home is more organized and less stressful.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-8 h-14 text-base uppercase tracking-widest"
              onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I need help planning my move-in coordination.")}`, '_blank')}
              data-testid="button-plan-movein"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Plan Your Move-In
            </Button>
            <Button
              variant="outline"
              className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-2xl px-8 h-14 text-base uppercase tracking-widest"
              onClick={scrollToActivation}
              data-testid="button-request-coordination"
            >
              Request Move-In Coordination
            </Button>
          </div>
        </div>
      </section>

      {/* Move-Out Section */}
      <section ref={moveOutRef} id="move-out-packs" className="relative px-4 py-32 border-y border-white/5 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${moveOutBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mx-auto">
              <ShieldCheck className="w-4 h-4" /> Deposit Protection
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              The Smart <span className="text-blue-500">Exit.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-bold max-w-2xl mx-auto leading-tight">
              One unified solution to protect your deposit. We handle utilities, checklists, and handover prep — so you don't have to.
            </p>
          </div>

          <Card className="bg-slate-950 border-blue-500/30 rounded-[3rem] p-1 shadow-2xl shadow-blue-900/40 max-w-xl mx-auto group overflow-hidden">
            <CardContent className="p-12 space-y-8">
              <ul className="space-y-4 text-left">
                {[
                  "Utility closure coordination",
                  "Move-out documentation check",
                  "Handover readiness audit",
                  "Landlord exit coordination"
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300 uppercase tracking-tight">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/exit-dubai" className="block">
                <Button 
                  className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl shadow-xl shadow-blue-900/40 flex gap-3 group-hover:scale-[1.02] transition-transform"
                >
                  See Exit Options <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-4 py-32 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white opacity-60">Trusted by Expats Across Dubai</h3>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30 font-black italic text-2xl uppercase tracking-tighter">
            <span>JLT</span>
            <span>Marina</span>
            <span>Downtown</span>
            <span>Business Bay</span>
          </div>
          <Link href="/residents">
            <Button variant="link" className="text-gray-500 hover:text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">
              Already settled? View Maintenance Services <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Partner Network */}
      <div className="bg-slate-950 border-t border-white/5 px-4">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </div>
    </div>
  );
}
