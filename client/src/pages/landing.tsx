import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  MessageCircle, 
  Shield, 
  CheckCircle2, 
  Zap, 
  Briefcase 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrustStrip, PartnerStrip, TestimonialCarousel, OperationalBadges } from "@/components/trust-strip";
import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";

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
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Dubai Move-In & Relocation Concierge | DeliWer"
        description="DeliWer handles everything after the lease is signed. Ejari, DEWA, and full move-in setup for founders and brokers."
      />

      {/* Micro Trust Line */}
      <section className="px-4 py-3 border-b border-white/10 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] drop-shadow-2xl">
              Dubai Move-In & Relocation Concierge<br />
              <span className="text-emerald-500 font-extrabold">for Founders and Real Estate Brokers</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>From Ejari to DEWA to full move-in setup — DeliWer handles everything after the lease is signed.</p>
              <p className="text-lg text-emerald-100 font-bold uppercase tracking-widest">No delays. No confusion. No running between typing centers.</p>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Zap className="w-8 h-8 text-emerald-500 shrink-0" />
              <span className="font-bold text-sm leading-tight">Complete Ejari & utilities setup in record time</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Briefcase className="w-8 h-8 text-emerald-500 shrink-0" />
              <span className="font-bold text-sm leading-tight">Dedicated support for brokers & relocation clients</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <MessageCircle className="w-8 h-8 text-emerald-500 shrink-0" />
              <span className="font-bold text-sm leading-tight">One WhatsApp. Everything handled.</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3 items-center justify-center sticky bottom-8 z-50 md:relative md:bottom-0"
              onClick={() => window.open('https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20just%20signed%20a%20lease%20in%20Dubai%20and%20need%20move-in%20support.', '_blank')}
            >
              <MessageCircle className="w-8 h-8 fill-current" />
              Start on WhatsApp Now
            </Button>
            
            <Link href="/partners">
              <span className="text-emerald-400 font-black uppercase tracking-widest text-sm hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-2">
                For Brokers: Earn Commission <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Clarity Section: Who We Serve */}
      <section className="py-24 relative z-10 px-4">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:border-emerald-500/30 transition-all">
            <CardContent className="p-0 space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">For Founders & Professionals</h3>
              <p className="text-lg text-emerald-100 font-bold leading-tight italic">You’ve secured the property. Now you need:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Ejari registration", "DEWA connection", "Move-in coordination", "Post-lease documentation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-black pt-4 border-t border-white/5">We execute fast so you can focus on business.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:border-blue-500/30 transition-all">
            <CardContent className="p-0 space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">For Real Estate Brokers</h3>
              <p className="text-lg text-blue-100 font-bold leading-tight italic">Close faster. Offer more value. Earn recurring commission.</p>
              <p className="text-gray-300 font-medium leading-relaxed">DeliWer becomes your post-rental infrastructure partner. No extra work for you.</p>
              <div className="pt-6 border-t border-white/5">
                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="font-black uppercase tracking-widest text-sm mb-2">🔒 Trust Promise</h4>
                <ul className="space-y-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <li>• Local UAE process knowledge</li>
                  <li>• Fast coordination across government & utility systems</li>
                  <li>• Clear communication</li>
                  <li>• Built for speed, not bureaucracy</li>
                </ul>
              </div>
            </CardContent>
          </Card>
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
