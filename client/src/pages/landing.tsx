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
  Droplets,
  Flame,
  Home as HomeIcon,
  Key
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
      <Navigation />
      
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden text-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl w-full space-y-8 relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase">
              Move-In. Move-Out.<br />
              <span className="text-emerald-500">Relocate.</span><br />
              Done Right in Dubai.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 font-bold max-w-2xl mx-auto leading-tight uppercase tracking-tight opacity-90">
              DeliWer coordinates your apartment transition — from Ejari registration and DEWA activation to move-in readiness or clean move-out.
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/relocate">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2"
              >
                Start Move-In Concierge
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white font-black rounded-2xl px-10 h-16 text-xl transition-all w-full md:w-auto"
              onClick={() => window.open('https://wa.me/971523946311?text=Hi,%20I%20need%20move-out%20coordination.', '_blank')}
            >
              I’m Moving Out
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ROUTER BLOCK (CRITICAL UX) */}
      <section className="py-20 px-6 bg-slate-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">What Stage Are You In?</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Choose your situation to get started immediately.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-emerald-500/30 p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition-all group relative overflow-hidden ring-1 ring-emerald-500/20">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white leading-tight text-emerald-500">Move-In Concierge</h3>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-xs">Coordinate apartment activation: tenancy registration, utility activation, and move-in readiness.</p>
              </div>
              <Link href="/relocate">
                <Button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-[10px] h-12 shadow-lg shadow-emerald-900/40">
                  Start Move-In Concierge
                </Button>
              </Link>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-blue-500 rotate-45" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white leading-tight">Move-Out Support</h3>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-xs">Close utilities, tenancy record cancellation, handover coordination, and relocation logistics.</p>
              </div>
              <Link href="/exit">
                <Button className="w-full mt-8 border-white/10 hover:bg-white/5 text-white font-black rounded-xl uppercase tracking-widest text-[10px] h-12" variant="outline">
                  Plan Move-Out Support
                </Button>
              </Link>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-purple-500/50 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Key className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white leading-tight">Just Signed Your Lease?</h3>
                <p className="text-gray-400 font-medium uppercase tracking-wide text-xs">Activate your apartment immediately. Ideal for tenants brokered into a new lease.</p>
              </div>
              <Link href="/activate">
                <Button className="w-full mt-8 border-white/10 hover:bg-white/5 text-white font-black rounded-xl uppercase tracking-widest text-[10px] h-12" variant="outline">
                  Activate Apartment
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION — THE OPERATOR DIFFERENCE */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Why DeliWer is <span className="text-emerald-500">The Operator</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">We don't just facilitate; we operate your home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6">
              <h3 className="text-xl font-black uppercase text-white border-b border-white/10 pb-4">Real Estate Brokers</h3>
              <p className="text-gray-500 font-medium text-sm">Focus ends when the lease is signed. No technical support or utility coordination.</p>
              <div className="text-red-500/50 font-black uppercase text-[10px]">Relationship ends at signature</div>
            </div>
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-black uppercase text-emerald-500 border-b border-emerald-500/20 pb-4">DeliWer (Operator)</h3>
              <p className="text-gray-300 font-medium text-sm">Continuous technical and legal coordination. Ejari, DEWA, Water, and optimization handled in one place.</p>
              <div className="text-emerald-500 font-black uppercase text-[10px]">Your permanent home partner</div>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6">
              <h3 className="text-xl font-black uppercase text-white border-b border-white/10 pb-4">Contractors</h3>
              <p className="text-gray-500 font-medium text-sm">Transactional visits. High markup on parts. No understanding of Dubai's legal compliance (Ejari).</p>
              <div className="text-red-500/50 font-black uppercase text-[10px]">One-off job focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — MOVE-IN CONCIERGE PREVIEW */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Move-In Concierge — <span className="text-emerald-500">AED 399</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <ul className="space-y-6">
              {[
                "Ejari registration coordination",
                "DEWA activation",
                "Water readiness check",
                "Shower filter with installation",
                "Move coordination support"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="font-bold text-gray-200 uppercase tracking-wide text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-6">
              <Link href="/relocate">
                <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-20 text-2xl uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                  Activate My Home
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">One point of contact. Total peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MOVE-OUT SUPPORT */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Move-Out Support</h2>
          <div className="flex flex-wrap justify-center gap-4 text-emerald-400 font-black uppercase tracking-widest text-sm">
            <span>Utility closure coordination</span>
            <span className="text-white/20">•</span>
            <span>Handover checklist</span>
            <span className="text-white/20">•</span>
            <span>Exit guidance</span>
          </div>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 text-white font-black rounded-2xl px-12 h-16 text-xl"
            onClick={() => window.open('https://wa.me/971523946311?text=Hi,%20I%20need%20move-out%20coordination.', '_blank')}
          >
            Plan My Move-Out
          </Button>
        </div>
      </section>

      {/* Section 4 — WHY DELIWER */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Why Residents<br /><span className="text-emerald-500">Choose DeliWer</span></h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                "One WhatsApp for everything",
                "No trustee center stress",
                "Clear pricing",
                "Dubai-wide coordination",
                "Fast response"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="font-bold text-gray-200 uppercase tracking-wide text-sm">{point}</span>
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
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center text-white">Frequently Asked</h2>
          <div className="space-y-6">
            {[
              { q: "What documents are needed for Ejari?", a: "Typically your Tenancy Contract (signed by both parties), Emirates ID (both sides), and Title Deed or Affection Plan." },
              { q: "How long does move-in activation take?", a: "We aim to coordinate all core activations within 24-48 hours of document submission." },
              { q: "Can DEWA be activated same day?", a: "Yes, once Ejari is registered, we can expedite the DEWA connection process." },
              { q: "Do I need to visit a trustee center?", a: "No. DeliWer coordinates everything digitally and handles any physical runs required through authorized RERA Trustee Centers." },
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
      <section className="px-4 py-20 bg-slate-950">
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
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Signed Your Lease? Don’t Waste Days.</h2>
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
      <footer className="py-20 px-4 border-t border-white/5 text-center bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-8">
          <OperationalBadges variant="dark" />
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] max-w-xl mx-auto">
            DeliWer is an operational back-office for Dubai residents and brokers, focused on relocation, settlement, and daily living journeys.
          </p>
        </div>
      </footer>
    </div>
  );
}
