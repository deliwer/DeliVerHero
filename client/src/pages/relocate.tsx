import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DirhamSymbol } from "@/components/dirham-symbol";
import { 
  ArrowRight,
  Home,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip, PartnerStrip } from "@/components/trust-strip";
import relocateHero from "@/assets/images/relocate-hero.jpg";
import moveOutBg from "@/assets/images/move-out-bg.jpg";
import moveInBg from "@/assets/images/move-in-bg.jpg";

import { ConciergePricing } from "@/components/concierge-pricing";

export default function Relocate() {
  const [location] = useLocation();
  const moveInRef = useRef<HTMLDivElement>(null);
  const moveOutRef = useRef<HTMLDivElement>(null);

  const scrollToMoveIn = () => {
    moveInRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMoveOut = () => {
    moveOutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.includes("#move-out-packs")) {
      scrollToMoveOut();
    } else if (location.includes("#move-in-packs")) {
      scrollToMoveIn();
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <Helmet>
        <title>Dubai Relocation: Move-In & Secure Exit Packs | DeliWer</title>
        <meta name="description" content="Moving to or from Dubai? Secure your home readiness or protect your deposit with our fixed-price relocation and exit packages." />
      </Helmet>

      {/* Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40 sticky top-0 z-[60] backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${relocateHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Moving into Dubai? <br />
              <span className="text-blue-500 italic font-serif lowercase tracking-normal">Don’t arrive confused or overpay.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto font-medium">
              We manage the move-in support, home setup, utilities, and furniture orchestration.
            </p>
            <div className="mt-8">
              <Button 
                onClick={() => window.open('https://wa.me/971523946311', '_blank')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white h-20 px-12 text-xl font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-900/40"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToMoveIn}
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-900/40"
            >
              <Home className="mr-2 h-6 w-6" /> I'm Moving In
            </Button>
            <Button 
              onClick={scrollToMoveOut}
              className="bg-blue-600 hover:bg-blue-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40"
            >
              <LogOut className="mr-2 h-6 w-6" /> I'm Moving Out
            </Button>
            <Button 
              onClick={() => window.open('https://wa.me/971523946311?text=URGENT:%20I%20need%20express%20relocation%20support.', '_blank')}
              className="bg-red-600 hover:bg-red-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-red-900/40"
            >
              <AlertTriangle className="mr-2 h-6 w-6" /> Express Exit
            </Button>
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* How DeliWer Works Explainer Block (Part 3) */}
      <section className="px-4 py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">How DeliWer Works</h2>
          <p className="text-gray-400 font-bold text-lg leading-tight uppercase tracking-tight">
            DeliWer exists to coordinate and plan — before problems turn into stress. We work with movers, technicians, and service providers, but you only deal with us.
          </p>
        </div>
      </section>

      {/* Move Concierge Pricing Section */}
      <section ref={moveInRef} id="move-in-packs" className="relative px-4 py-24 border-y border-white/5 overflow-hidden">
        {/* Background Image with wash */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${moveInBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Move Concierge <span className="text-emerald-500">Packages.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-bold text-lg leading-tight uppercase tracking-tight">“We manage timelines, vendors, and handovers — not the trucks themselves.”</p>
          </div>

          <ConciergePricing category="move" />
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
