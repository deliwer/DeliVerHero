import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirhamSymbol } from "@/components/dirham-symbol";
import { 
  ArrowRight,
  Home,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip } from "@/components/trust-strip";
import relocateHero from "@/assets/images/relocate-hero.jpg";
import moveOutBg from "@/assets/images/move-out-bg.jpg";
import moveInBg from "@/assets/images/move-in-bg.jpg";

import { ConciergePricing } from "@/components/concierge-pricing";
import { Navigation } from "@/components/navigation";

export default function Relocate() {
  const [location] = useLocation();
  const activationRef = useRef<HTMLDivElement>(null);
  const relocationRef = useRef<HTMLDivElement>(null);
  const moveOutRef = useRef<HTMLDivElement>(null);

  const scrollToActivation = () => {
    activationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRelocation = () => {
    relocationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMoveOut = () => {
    moveOutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type");
    
    if (type === 'activation') {
      activationRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'relocation') {
      relocationRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.includes("#move-out-packs")) {
      moveOutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <Helmet>
        <title>Move-In Activation & Relocation Support | DeliWer Dubai</title>
        <meta name="description" content="Book Dubai Move-In Activation (AED 399) or full relocation support. Clear inclusions, no hidden costs. WhatsApp booking for guided home setup and move-in." />
      </Helmet>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${relocateHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mx-auto mb-4">
              <ShieldCheck className="w-4 h-4" /> 100% Home Service USP
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              Arrive in Dubai. <br />
              <span className="text-emerald-500">Ready to Live.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-bold uppercase tracking-tight">
              One unified orchestration layer for your relocation. <br />
              <span className="text-blue-400 italic font-serif lowercase tracking-normal">Ejari, DEWA & Home Setup handled without you leaving your place.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button 
              onClick={scrollToActivation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-emerald-900/40 group"
            >
              <div className="flex flex-col items-center gap-1">
                <span>01. Activation</span>
                <span className="text-[10px] opacity-60">Technical Move-In</span>
              </div>
            </Button>
            <Button 
              onClick={scrollToRelocation}
              className="bg-blue-600 hover:bg-blue-500 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-blue-900/40 group"
            >
              <div className="flex flex-col items-center gap-1">
                <span>02. Relocation</span>
                <span className="text-[10px] opacity-60">Full Support</span>
              </div>
            </Button>
            <Button 
              onClick={scrollToMoveOut}
              className="bg-slate-800 hover:bg-slate-700 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl border border-white/10 group"
            >
              <div className="flex flex-col items-center gap-1">
                <span>03. Move-Out</span>
                <span className="text-[10px] opacity-60">Deposit Protection</span>
              </div>
            </Button>
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* 3 Step Journey Explainer */}
      <section className="px-4 py-32 bg-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Your Dubai Journey</h2>
            <div className="h-1 w-24 bg-emerald-500 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { 
                step: "01", 
                title: "Arriving", 
                desc: "Technical setup before your furniture arrives. We handle the foundations.", 
                ref: activationRef,
                color: "text-emerald-500",
                bgColor: "bg-emerald-500"
              },
              { 
                step: "02", 
                title: "Settling", 
                desc: "Full relocation management for families and complex moves.", 
                ref: relocationRef,
                color: "text-blue-500",
                bgColor: "bg-blue-500"
              },
              { 
                step: "03", 
                title: "Departing", 
                desc: "Secure your deposit and manage your exit with total compliance.", 
                ref: moveOutRef,
                color: "text-red-500",
                bgColor: "bg-red-500"
              }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="space-y-8 group cursor-pointer p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                onClick={() => s.ref.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className={`text-7xl font-black ${s.color} opacity-20 group-hover:opacity-100 transition-all duration-500 leading-none`}>{s.step}</div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white">{s.title}</h3>
                  <p className="text-gray-400 font-bold leading-relaxed uppercase text-xs tracking-[0.2em]">{s.desc}</p>
                </div>
                <div className={`w-12 h-1 ${s.bgColor} group-hover:w-full transition-all duration-700`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Move-In Activation Section */}
      <section ref={activationRef} id="activation-section" className="relative px-4 py-24 border-y border-white/5 overflow-hidden">
        {/* Background Image with wash */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${moveInBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Move-In <span className="text-emerald-500">Activation.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-bold text-lg leading-tight uppercase tracking-tight">“Standard technical preparation before you move your furniture in.”</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto mb-20">
            <Card className="relative flex flex-col rounded-[2.5rem] border-emerald-500/50 bg-slate-900 scale-105 shadow-2xl shadow-emerald-500/10 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-emerald-500 text-slate-950">
                Standard Preparation
              </div>
              <CardHeader className="pt-10 pb-6 text-center">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter text-white">
                  Move-In Activation
                </CardTitle>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <DirhamSymbol className="w-6 h-6 text-emerald-500" />
                  <span className="text-5xl font-black text-white tracking-tighter">399</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-8 px-8">
                <p className="text-center text-gray-400 text-sm font-bold leading-tight">
                  Ideal for studio and 1–2 bedroom apartments within 7 days of move-in.
                </p>
                <div className="space-y-4">
                  {[
                    "60–90 minute activation visit",
                    "Shower filter supply + installation",
                    "AC filter clean (1 unit)",
                    "Water readiness check",
                    "Essentials setup guidance",
                    "WhatsApp follow-up support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 uppercase tracking-tight">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-auto">
                  <Button 
                    onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I want to book the Move-In Activation (AED 399) package.")}`, '_blank')}
                    className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl text-lg shadow-xl shadow-emerald-500/20"
                    data-testid="button-book-activation"
                  >
                    Book Activation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scope Clarity for 399 Package */}
          <div className="mt-20 max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-black uppercase text-emerald-500 mb-4">What’s Included (AED 399)</h3>
              <ul className="space-y-3 text-sm font-bold text-gray-300">
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 60–90 minute activation visit</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Shower filter supply + installation</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> AC filter clean (1 unit)</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Water readiness check</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Essentials setup guidance</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> WhatsApp follow-up support</li>
              </ul>
              <p className="mt-6 text-[11px] font-bold text-emerald-500/60 uppercase tracking-widest border-t border-white/5 pt-4">
                Ideal for studio & 1–2 bedroom apartments within 7 days of move-in.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-black uppercase text-red-500 mb-4">What’s Not Included</h3>
              <ul className="space-y-3 text-sm font-bold text-gray-400">
                <li className="flex gap-2 items-start"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Deep AC servicing</li>
                <li className="flex gap-2 items-start"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Gas refill</li>
                <li className="flex gap-2 items-start"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Full duct cleaning</li>
                <li className="flex gap-2 items-start"><AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Hardware beyond listed scope</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/5">
                <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest mb-3">Add-Ons Available</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Additional AC unit cleaning – AED X</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Extra shower filter – AED X</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Relocation Support Section */}
      <section ref={relocationRef} id="relocation-section" className="relative px-4 py-24 border-y border-white/5 bg-slate-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Full Relocation <span className="text-blue-500">Support.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-bold text-lg leading-tight uppercase tracking-tight">“End-to-end management for families and complex moves.”</p>
            <p className="text-blue-400/60 font-black uppercase text-xs tracking-[0.2em] mt-4">
              Ideal for families or tenants requiring multi-phase coordination and extended support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-4xl mx-auto">
            <Card className="relative flex flex-col rounded-[2.5rem] border-emerald-500/50 bg-slate-900 scale-105 shadow-2xl shadow-emerald-500/10 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-emerald-500 text-slate-950">
                Full Coordination
              </div>
              <CardHeader className="pt-10 pb-6 text-center">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter text-white">
                  Essential Relocation
                </CardTitle>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <DirhamSymbol className="w-6 h-6 text-emerald-500" />
                  <span className="text-5xl font-black text-white tracking-tighter">899</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-8 px-8">
                <p className="text-center text-gray-400 text-sm font-bold leading-tight">
                  Ideal for families or tenants needing multi-visit coordination.
                </p>
                <div className="space-y-4 text-left">
                  {[
                    "Vendor scheduling",
                    "Timeline management",
                    "Single point of contact",
                    "Post-move checklist"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 uppercase tracking-tight">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-auto">
                  <Button 
                    onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I want to book the Essential Relocation (AED 899) package.")}`, '_blank')}
                    className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl text-lg shadow-xl shadow-emerald-500/20"
                  >
                    Book Essential (WhatsApp)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative flex flex-col rounded-[2.5rem] border-white/10 bg-slate-900/50 hover:bg-slate-900">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-white/10 text-white">
                Total Peace of Mind
              </div>
              <CardHeader className="pt-10 pb-6 text-center">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter text-white">
                  Premium Relocation
                </CardTitle>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <DirhamSymbol className="w-6 h-6 text-gray-400" />
                  <span className="text-5xl font-black text-white tracking-tighter">2499</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-8 px-8">
                <p className="text-center text-gray-400 text-sm font-bold leading-tight">
                  Ideal for HNWIs or families requiring guaranteed deposit recovery.
                </p>
                <div className="space-y-4 text-left">
                  {[
                    "Security deposit recovery",
                    "Furniture removal prep",
                    "Deep cleaning coordination",
                    "Landlord handover"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 uppercase tracking-tight">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-gray-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-auto">
                  <Button 
                    onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I want to book the Premium Relocation (AED 2499) package.")}`, '_blank')}
                    className="w-full h-16 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest rounded-2xl text-lg shadow-xl transition-all"
                  >
                    Book Premium (WhatsApp)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Move-Out Section: The Smart Exit */}
      <section ref={moveOutRef} id="move-out-packs" className="relative px-4 py-24 border-y border-white/5 overflow-hidden">
        {/* Background Image with wash */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${moveOutBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mx-auto">
              <ShieldCheck className="w-4 h-4" /> Deposit Protection
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              The Smart <span className="text-blue-500">Exit.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-bold max-w-2xl mx-auto leading-tight">
              One unified solution to protect your deposit. We handle furniture, utilities, and landlord handover prep — so you don't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Furniture", status: "Resolved", icon: Home },
              { label: "Utilities", status: "Disconnected", icon: Zap },
              { label: "Compliance", status: "Guaranteed", icon: AlertTriangle }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 hover-elevate transition-all">
                <item.icon className="w-6 h-6 text-blue-500 mx-auto mb-3" />
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white font-black uppercase tracking-tight">{item.status}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 border-blue-500/30 rounded-[3rem] p-1 shadow-2xl shadow-blue-900/40 max-w-xl mx-auto group overflow-hidden">
            <CardContent className="p-10 space-y-8">
              <div className="text-center space-y-2">
                <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Initial Assessment Fee</p>
                <div className="flex items-center justify-center gap-2">
                  <DirhamSymbol className="w-8 h-8" />
                  <p className="text-6xl font-black tracking-tighter text-white">249</p>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/move-out-package">
                  <Button 
                    className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl shadow-xl shadow-blue-900/40 flex gap-3 group-hover:scale-[1.02] transition-transform"
                    data-testid="link-move-out-package"
                  >
                    Secure My Deposit <ArrowRight className="h-6 w-6" />
                  </Button>
                </Link>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Protect your record • Secure your refund
                </p>
              </div>
            </CardContent>
          </div>
        </div>
      </section>

      {/* Social Proof / FAQ Micro-Section */}
      <section className="px-4 py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white">Trusted by Expats in JLT, Marina & Downtown</h3>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
            <span className="font-black italic text-2xl uppercase">Handover Pro</span>
            <span className="font-black italic text-2xl uppercase">Relo-Expert</span>
            <span className="font-black italic text-2xl uppercase">Dubai-Safe</span>
          </div>
          <Link href="/residents">
            <Button variant="link" className="text-gray-500 hover:text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">
              Already settled? View Maintenance Services <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
