import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const scrollToMoveOut = () => {
    moveOutRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <title>Move-In Concierge Dubai | Activate Apartment | DeliWer</title>
        <meta name="description" content="Activate your new home in Dubai. One service to handle tenancy registration, utilities, and move-in readiness. AED 399 complete concierge." />
      </Helmet>

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
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mx-auto mb-4">
              <ShieldCheck className="w-4 h-4" /> Dubai's Premium Concierge
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              Arrive. Settle. <br />
              <span className="text-emerald-500">Live Better.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-bold uppercase tracking-tight">
              One unified orchestration layer for your Dubai transition. <br />
              <span className="text-blue-400 italic font-serif lowercase tracking-normal">Ejari, DEWA & Home Setup handled without you leaving your place.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button 
              onClick={scrollToActivation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-emerald-900/40 group"
            >
              Move-In Concierge
            </Button>
            <Button 
              onClick={scrollToMoveOut}
              className="bg-slate-800 hover:bg-slate-700 text-white h-24 px-8 text-xl font-black uppercase tracking-widest rounded-3xl border border-white/10 group"
            >
              Move-Out Support
            </Button>
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* Move-In Packages Section */}
      <section ref={activationRef} id="activation-section" className="relative px-4 py-32 border-y border-white/5 overflow-hidden bg-slate-900/40">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">Activate Your New Home <span className="text-emerald-500">Dubai — AED 399</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-bold text-lg leading-tight uppercase tracking-tight">Technical Home Activation & Setup</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-5xl mx-auto">
            {/* Essentials Package */}
            <Card className="relative flex flex-col rounded-[2.5rem] border-white/10 bg-slate-900 overflow-hidden group hover:border-emerald-500/30 transition-all">
              <CardHeader className="pt-12 pb-8 text-center bg-white/5">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter text-white">
                  Essentials
                </CardTitle>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <DirhamSymbol className="w-6 h-6 text-emerald-500" />
                  <span className="text-6xl font-black text-white tracking-tighter">299</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-8 p-10">
                <div className="space-y-5">
                  {[
                    "Ejari registration coordination",
                    "DEWA activation support",
                    "Move-in checklist coordination",
                    "WhatsApp support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-200 uppercase tracking-tight">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi, I want the Essentials Move-In package.")}`, '_blank')}
                  className="w-full h-20 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest rounded-2xl text-xl shadow-xl transition-all"
                >
                  Book Essentials
                </Button>
              </CardContent>
            </Card>

            {/* Complete Concierge Package */}
            <Card className="relative flex flex-col rounded-[2.5rem] border-emerald-500/50 bg-slate-900 scale-105 shadow-2xl shadow-emerald-500/20 z-10 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500" />
              <div className="absolute top-4 right-4 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 shadow-lg">
                Most Popular
              </div>
              <CardHeader className="pt-12 pb-8 text-center bg-emerald-500/5">
                <CardTitle className="text-3xl font-black uppercase tracking-tighter text-white">
                  Complete
                </CardTitle>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <DirhamSymbol className="w-6 h-6 text-emerald-500" />
                  <span className="text-6xl font-black text-white tracking-tighter">399</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-8 p-10">
                <div className="space-y-5">
                  {[
                    "Tenancy registration coordination (Ejari)",
                    "Utility activation (DEWA)",
                    "Water readiness check",
                    "Shower filter installation",
                    "Move coordination support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-200 uppercase tracking-tight">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi, I just signed my lease and want the Move-In Concierge package.")}`, '_blank')}
                  className="w-full h-20 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl shadow-2xl transition-all active:scale-95"
                >
                  Activate My Home
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between bg-emerald-500/10 p-8 rounded-3xl border border-emerald-500/20">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-black uppercase text-white">Leaving an apartment instead?</h3>
              <p className="text-gray-400 font-medium text-sm">Coordinate utilities closure, cancellation & logistics.</p>
            </div>
            <Link href="/exit">
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
            <CardContent className="p-12 space-y-10">
              <div className="text-center space-y-2">
                <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Initial Coordination Fee</p>
                <div className="flex items-center justify-center gap-2">
                  <DirhamSymbol className="w-8 h-8" />
                  <p className="text-7xl font-black tracking-tighter text-white">249</p>
                </div>
              </div>

              <div className="space-y-6">
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
                <Button 
                  className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl shadow-xl shadow-blue-900/40 flex gap-3 group-hover:scale-[1.02] transition-transform"
                  onClick={() => window.open('https://wa.me/971523946311?text=Hi,%20I%20need%20move-out%20coordination.', '_blank')}
                >
                  Secure My Deposit <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
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
    </div>
  );
}
