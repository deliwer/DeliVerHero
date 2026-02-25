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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-4xl w-full text-center space-y-8 relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] drop-shadow-2xl text-white uppercase">
              Ejari Home<br />
              <span className="text-emerald-500">Service</span>
            </h1>
            
            <h2 className="text-lg md:text-xl text-gray-300 font-bold max-w-2xl mx-auto leading-tight uppercase tracking-tight opacity-90">
              The premium entry gateway to your new Dubai home. We handle the coordination from Ejari to Move-In.
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left max-w-3xl mx-auto">
            {[
              { label: "Ejari & Handover", icon: ClipboardList, desc: "Registration & key collection" },
              { label: "Move-In Planning", icon: Package, desc: "Utility sequencing & logistics" },
              { label: "Home Activation", icon: Zap, highlight: true, desc: "Ready to live in 48 hours" },
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`flex flex-col gap-2 p-5 rounded-2xl border transition-all group ${
                  item.highlight 
                    ? "bg-emerald-500/10 border-emerald-500/50 scale-105 shadow-lg shadow-emerald-500/10" 
                    : "bg-white/5 border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.highlight ? "text-emerald-400" : "text-emerald-500"} group-hover:scale-110 transition-transform`} />
                <span className="font-bold text-xs leading-tight text-white">{item.label}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</span>
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
            
            <Link href="/residents">
              <span className="text-emerald-400 font-black uppercase tracking-widest text-sm hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-2">
                View Resident Services <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Second Fold: Simplified & Essential */}
      <section className="py-20 px-6 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                One Gateway. <br />
                <span className="text-emerald-500">Zero Hassle.</span>
              </h2>
              <p className="text-lg text-gray-300 font-bold leading-relaxed uppercase tracking-wide">
                DeliWer transforms the fragmented Dubai move-in process into a single, structured journey. From Ejari registration to the moment you drink purified water from your tap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button 
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-10 h-16 text-lg uppercase tracking-widest w-full sm:w-auto"
                  onClick={() => window.open('https://wa.me/971523946311', '_blank')}
                >
                  Book My Move-In
                </Button>
                <Link href="/residents">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 font-black rounded-xl px-10 h-16 text-lg uppercase tracking-widest w-full sm:w-auto"
                  >
                    View All Stages
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Legally Secure", desc: "All Ejari & DEWA requirements handled correctly.", icon: CheckCircle2 },
                { title: "Fast Activation", desc: "Home readiness visit scheduled within 48 hours.", icon: Zap },
                { title: "WhatsApp Managed", desc: "One contact for your entire relocation.", icon: MessageCircle },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all group">
                  <benefit.icon className="w-6 h-6 text-emerald-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-white">{benefit.title}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <PartnerStrip />
          <div className="text-center">
            <Link href="/partners">
              <Button 
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest text-xs px-8 py-6 rounded-xl"
              >
                Become a Partner →
              </Button>
            </Link>
          </div>
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
