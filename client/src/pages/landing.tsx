import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  MessageCircle, 
  Shield, 
  CheckCircle2, 
  Zap, 
  Briefcase,
  ClipboardList,
  UserCheck,
  Package,
  Droplets
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PartnerStrip, TestimonialCarousel, OperationalBadges } from "@/components/trust-strip";
import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";

import heroBg from "@assets/generated_images/empty_dubai_apartment_interior_with_keys..png";

export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("deliwer_popup_shown");
    if (!popupShown) {
      // Logic for automatic popup could go here
    }
  }, []);

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Dubai Move-In & Relocation Concierge | DeliWer"
        description="DeliWer handles everything after the lease is signed. Ejari, DEWA, and full move-in setup for founders and brokers."
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl w-full text-center space-y-10 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] drop-shadow-2xl text-white uppercase">
              Ejari Home<br />
              <span className="text-emerald-500">Service</span>
            </h1>
            
            <h2 className="text-lg md:text-xl text-gray-300 font-bold max-w-2xl mx-auto leading-tight uppercase tracking-tight opacity-90">
              The premium entry gateway to your new Dubai home. From Ejari to Handover, Move-In, and Activation.
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-left max-w-4xl mx-auto">
            {[
              { step: 1, label: "Ejari Setup", icon: ClipboardList },
              { step: 2, label: "Handover", icon: UserCheck },
              { step: 3, label: "Move-In", icon: Package },
              { step: 4, label: "Activation", icon: Zap, highlight: true },
              { step: 5, label: "Water Setup", icon: Droplets },
            ].map((item) => (
              <div 
                key={item.step}
                className={`flex flex-col gap-2 p-4 rounded-2xl border transition-all group ${
                  item.highlight 
                    ? "bg-emerald-500/10 border-emerald-500/50 scale-105 shadow-lg shadow-emerald-500/10" 
                    : "bg-white/5 border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.highlight ? "text-emerald-400" : "text-emerald-500"} group-hover:scale-110 transition-transform`} />
                <span className="font-bold text-[9px] uppercase tracking-widest text-emerald-400/80">Step {item.step}</span>
                <span className="font-bold text-xs leading-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 pt-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3 items-center justify-center"
              onClick={() => window.open('https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20just%20signed%20a%20lease%20in%20Dubai%20and%20need%20move-in%20support.', '_blank')}
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              Start on WhatsApp
            </Button>
            
            <Link href="/partners">
              <span className="text-emerald-400 font-black uppercase tracking-widest text-sm hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-2">
                For Brokers: Earn Commission <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section id="the-journey" className="py-24 px-6 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">The Complete Dubai Move-In Journey</h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
            {/* Step 1: Ejari */}
            <div className="flex-1 space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mx-auto group-hover:scale-110 transition-transform">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">1. Ejari Setup</h3>
              <p className="text-sm text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Lease registration & planning</p>
            </div>

            {/* Step 2: Handover */}
            <div className="flex-1 space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mx-auto group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">2. Handover</h3>
              <p className="text-sm text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Key collection & utility sequence</p>
            </div>

            {/* Step 3: Move-In */}
            <div className="flex-1 space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mx-auto group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">3. Move-In</h3>
              <p className="text-sm text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Logistics & settling essentials</p>
            </div>

            {/* Step 4: Activation */}
            <div className="flex-1 space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-emerald-500/20">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-emerald-400 underline decoration-2 underline-offset-8">4. Activation</h3>
              <p className="text-sm text-gray-100 font-black leading-relaxed uppercase tracking-widest">The critical home readiness visit</p>
            </div>

            {/* Step 5: Water Upsell */}
            <div className="flex-1 space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 mx-auto group-hover:scale-110 transition-transform">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">5. Water Setup</h3>
              <p className="text-sm text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Premium filtration & purity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero-like Action Section */}
      <section className="py-24 bg-slate-950 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                One Gateway. <br />
                <span className="text-emerald-500">Zero Hassle.</span>
              </h2>
              <p className="text-xl text-gray-300 font-bold leading-relaxed uppercase tracking-wide">
                DeliWer transforms the fragmented Dubai move-in process into a single, structured journey. From Ejari registration to the moment you drink purified water from your tap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-10 h-16 text-lg uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/20"
                  onClick={() => window.open('https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20just%20signed%20a%20lease%20in%20Dubai%20and%20need%20move-in%20support.', '_blank')}
                >
                  Book My Move-In
                </Button>
                <Link href="/residents">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 font-black rounded-xl px-10 h-16 text-lg uppercase tracking-widest"
                  >
                    View All Stages
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/5 border-white/10 p-6 space-y-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <h4 className="font-black uppercase tracking-tight">Legally Secure</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">All Ejari & DEWA requirements handled correctly.</p>
              </Card>
              <Card className="bg-white/5 border-white/10 p-6 space-y-4">
                <Zap className="w-8 h-8 text-emerald-500" />
                <h4 className="font-black uppercase tracking-tight">Fast Activation</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Home readiness visit scheduled within 48 hours.</p>
              </Card>
              <Card className="bg-white/5 border-white/10 p-6 space-y-4">
                <MessageCircle className="w-8 h-8 text-emerald-500" />
                <h4 className="font-black uppercase tracking-tight">WhatsApp Managed</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">One contact for your entire relocation.</p>
              </Card>
              <Card className="bg-white/5 border-white/10 p-6 space-y-4">
                <Shield className="w-8 h-8 text-emerald-500" />
                <h4 className="font-black uppercase tracking-tight">100% Guaranteed</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Your apartment ready before you arrive.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 relative z-10 px-4">
        <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-slate-900/30 transition-all group">
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">Founders</h3>
            <p className="text-sm text-gray-400 font-medium leading-snug">We handle Ejari, DEWA, and move-in setup so you can focus on building.</p>
          </div>

          <div className="bg-slate-900/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-slate-900/30 transition-all group">
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">Brokers</h3>
            <p className="text-sm text-gray-400 font-medium leading-snug">Earn 10% commission on every referral. We become your post-rental infrastructure.</p>
          </div>
        </div>
      </section>
      {/* Partner Strip */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </section>
      {/* Final Conversion Section */}
      <section className="w-full py-24 relative z-10 text-center space-y-10 bg-black/20 backdrop-blur-sm border-y border-white/5 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Signed Your Lease? Don’t Waste Days.</h2>
          <p className="text-xl text-gray-300 font-medium">Let us handle the next steps while you focus on settling in.</p>
        </div>
        <Button 
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-16 h-20 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2"
          onClick={() => window.open('https://wa.me/971523946311', '_blank')}
        >
          Start on WhatsApp →
        </Button>
      </section>
      {/* Testimonials */}
      <section className="px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
          <TestimonialCarousel variant="dark" limit={3} />
        </div>
      </section>
      <footer className="py-20 px-4 border-t border-white/5 text-center bg-slate-950/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <OperationalBadges variant="dark" />
          <p className="text-gray-500 text-xs italic max-w-xl mx-auto">
            DeliWer is an operational back-office for Dubai residents and brokers, focused on relocation, settlement, and daily living journeys.
          </p>
        </div>
      </footer>
    </div>
  );
}
