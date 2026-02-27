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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl w-full text-center space-y-8 relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Shield className="w-4 h-4" />
              Dubai Move-In Activation Partner
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] drop-shadow-2xl text-white uppercase">
              Moving to Dubai?<br />
              <span className="text-emerald-500">We Activate Your Home</span><br />
              in 24 Hours.
            </h1>
            
            <h2 className="text-lg md:text-xl text-gray-300 font-bold max-w-2xl mx-auto leading-tight uppercase tracking-tight opacity-90">
              From Ejari registration to DEWA activation and water setup — DeliWer coordinates your entire move-in so you don’t run around trustee centers.
            </h2>
          </motion.div>
          
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3 items-center justify-center group"
              onClick={() => window.open('https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20just%20signed%20my%20lease%20and%20need%20move-in%20activation%20support.', '_blank')}
            >
              <MessageCircle className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
              Start My Move-In on WhatsApp
            </Button>
            
            <Link href="/move-in-packages">
              <Button variant="ghost" className="text-emerald-400 font-black uppercase tracking-widest text-sm hover:text-emerald-300 transition-colors flex items-center gap-2 h-12">
                See Move-In Packages <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Dubai-wide | Fast response | Cash on visit
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — THE MOVE-IN JOURNEY */}
      <section className="py-24 px-6 bg-slate-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Your Move-In, Coordinated Step by Step</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Most residents handle these steps separately. DeliWer coordinates them together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-white/10 z-0" />
            {[
              { step: "Step 1", title: "Ejari Registration", desc: "We register your tenancy and handle documentation.", icon: ClipboardList },
              { step: "Step 2", title: "DEWA Activation", desc: "Electricity and water connection activated.", icon: Zap },
              { step: "Step 3", title: "Water & Readiness", desc: "Hydration setup and essential checks before your first night.", icon: Droplets },
              { step: "Step 4", title: "Move Coordination", desc: "Packing, timing, and activation guidance.", icon: Package },
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4 group">
                <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-all shadow-xl">
                  <item.icon className="w-10 h-10 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="space-y-2">
                  <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">{item.step}</span>
                  <h3 className="text-xl font-black uppercase text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — MOVE-IN PACKAGES */}
      <section className="py-24 px-6 bg-dubai-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Choose Your Move-In Level</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic Activation",
                price: "AED 199",
                features: ["Ejari registration coordination", "Documentation support"],
                msg: "Hi, I want the Basic Activation package for my new home."
              },
              {
                name: "Essentials Move-In",
                price: "AED 299",
                features: ["Ejari registration", "DEWA activation", "Move-in checklist coordination"],
                msg: "Hi, I want the Essentials Move-In package for my new home.",
                popular: true
              },
              {
                name: "Complete Move Concierge",
                price: "AED 399",
                features: ["Ejari registration", "DEWA activation", "Water readiness check", "Shower filter with installation", "Move coordination assistance"],
                msg: "Hi, I want the Complete Move Concierge package for my new home."
              }
            ].map((pkg, idx) => (
              <Card key={idx} className={`bg-slate-900/50 border-white/10 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col transition-all hover:scale-[1.02] ${pkg.popular ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/10' : ''}`}>
                {pkg.popular && <div className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest py-2 text-center">Most Popular</div>}
                <div className="p-8 flex-grow space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase text-white">{pkg.name}</h3>
                    <div className="text-4xl font-black text-emerald-500">{pkg.price}</div>
                  </div>
                  <ul className="space-y-4">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <Button 
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-sm"
                    onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent(pkg.msg)}`, '_blank')}
                  >
                    Book on WhatsApp
                  </Button>
                  <p className="text-center text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">Cash on visit or bank transfer</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — WHY DELIWER */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Why Residents<br /><span className="text-emerald-500">Choose DeliWer</span></h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                "One WhatsApp, full coordination",
                "No trustee center runs",
                "Faster activation timeline",
                "Transparent pricing",
                "Designed for new Dubai residents"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="font-bold text-gray-200">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-emerald-500/10 rounded-[3rem] p-12 border border-emerald-500/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/20 transition-all" />
             <div className="relative z-10 space-y-6">
               <Shield className="w-16 h-16 text-emerald-500" />
               <h3 className="text-3xl font-black uppercase text-white leading-tight">Stress-Free<br />Home Activation</h3>
               <p className="text-gray-400 font-medium leading-relaxed uppercase tracking-wide text-sm">
                 We take the chaos out of relocating. One partner. One point of contact. Everything handled properly.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Section 5 — WHO THIS IS FOR */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Built for Dubai Relocations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "New Residents", icon: UserCheck, desc: "First time renting in Dubai? We guide you step by step." },
              { title: "Busy Professionals", icon: Briefcase, desc: "No time to coordinate paperwork? We handle it." },
              { title: "Families Moving", icon: ArrowRight, desc: "Upgrade your home without the stress of transition." },
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all space-y-6 group">
                <item.icon className="w-12 h-12 text-emerald-500 group-hover:scale-110 transition-transform" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase text-white">{item.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">Frequently Asked</h2>
          <div className="space-y-6">
            {[
              { q: "What documents are needed for Ejari?", a: "Typically your Tenancy Contract (signed by both parties), Emirates ID (both sides), and Title Deed or Affection Plan." },
              { q: "How long does move-in activation take?", a: "We aim to coordinate all core activations within 24-48 hours of document submission." },
              { q: "Can DEWA be activated same day?", a: "Yes, once Ejari is registered, we can expedite the DEWA connection process." },
              { q: "Do I need to visit a trustee center?", a: "No. DeliWer coordinates everything digitally and handles any physical runs required." },
              { q: "How do I pay?", a: "We accept cash on visit or bank transfer for your convenience." },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-black uppercase text-emerald-400 text-sm">{faq.q}</h4>
                <p className="text-gray-300 text-sm font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — FINAL CTA */}
      <section className="py-24 px-6 text-center space-y-12 bg-emerald-600">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 leading-none">Got Your Lease?<br />Let’s Activate Your Home.</h2>
          <p className="text-xl text-emerald-950 font-bold uppercase tracking-wide">Stop the paperwork stress. Start your living journey today.</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Button 
            size="lg" 
            className="bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl px-16 h-24 text-3xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 group"
            onClick={() => window.open('https://wa.me/971523946311?text=Hi,%20I%20just%20signed%20my%20lease%20and%20need%20move-in%20activation%20support.', '_blank')}
          >
            <MessageCircle className="w-10 h-10 fill-current mr-4 group-hover:scale-110 transition-transform" />
            WhatsApp DeliWer Now
          </Button>
          <div className="text-slate-950 font-black text-2xl tracking-tighter">+971 52 394 6311</div>
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
