import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Zap, 
  LogOut,
  Key,
  MessageCircle,
  CheckCircle2,
  Shield,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import { useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";

import heroBg from "@assets/generated_images/empty_dubai_apartment_interior_with_keys..png";

// Lifestyle images for cards and sections
const lifestyleImages = {
  moveIn: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  moveOut: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=800&q=80",
  brokers: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
  tenants: "https://images.unsplash.com/photo-1554995207-c18fa93d128d?w=800&q=80",
  landlords: "https://images.unsplash.com/photo-1512918766671-ed6a99be0211?w=800&q=80",
  process: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  justGotKeys: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  finalCTA: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
};

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Move-In Services Dubai | Water, Ejari & Home Setup | DeliWer"
        description="Move into your Dubai home stress-free. DeliWer handles water setup, Ejari registration, DEWA activation, and move-in readiness. AED 399 complete concierge."
      />
      <Navigation />
      
      {/* HERO */}
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase text-center drop-shadow-2xl">
              Start Your Move-In Journey<br />
              <span className="text-emerald-500">With Ejari Registration</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white font-bold max-w-2xl mx-auto leading-tight uppercase tracking-tight text-center drop-shadow-lg">
              Before you can activate utilities or move into your new home in Dubai, you must first obtain your Ejari certificate.
              <br /><br />
              <span className="text-emerald-400">DeliWer helps tenants complete Ejari registration easily with online and home service support.</span>
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/ejari-dubai">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 group border-2 border-emerald-400/20"
              >
                <Zap className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform" />
                Start Ejari Home Service
              </Button>
            </Link>
          </div>
          <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-sm text-center mt-6 drop-shadow-md bg-black/20 py-2 rounded-full inline-block px-8 mx-auto">The first step toward a move-in ready home.</p>
        </div>
      </section>

      {/* ROUTER BLOCK */}
      <section className="py-20 px-6 bg-slate-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">What Do You Need Help With?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Move-In Card */}
            <Card className="bg-white/5 border-emerald-500/30 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition-all group relative overflow-hidden ring-1 ring-emerald-500/20">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <img src={lifestyleImages.moveIn} alt="Move-in preparation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-emerald-500">Move-In Concierge</h3>
                <p className="text-gray-400 font-medium text-sm">Activate your new apartment with tenancy registration, utilities setup, and move-in readiness.</p>
              </div>
              <Link href="/relocate" className="px-8 pb-8">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm h-12 shadow-lg shadow-emerald-900/40">
                  Start Move-In
                </Button>
              </Link>
            </Card>

            {/* Move-Out Card */}
            <Card className="bg-white/5 border-white/10 rounded-3xl flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <img src={lifestyleImages.moveOut} alt="Move-out preparation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">Move-Out Support</h3>
                <p className="text-gray-400 font-medium text-sm">Coordinate utilities closure, tenancy cancellation, and apartment handover.</p>
              </div>
              <Link href="/exit" className="px-8 pb-8">
                <Button className="w-full border-white/10 hover:bg-white/5 text-white font-black rounded-xl text-sm h-12" variant="outline">
                  Plan Move-Out
                </Button>
              </Link>
            </Card>

            {/* Just Signed Lease Card */}
            <Card className="bg-white/5 border-white/10 rounded-3xl flex flex-col justify-between hover:border-purple-500/50 transition-all group relative overflow-hidden">
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <img src={lifestyleImages.brokers} alt="Broker partnership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Key className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">Just Signed a Lease?</h3>
                <p className="text-gray-400 font-medium text-sm">For brokers and tenants: activate your apartment immediately after signing.</p>
              </div>
              <Link href="/activate" className="px-8 pb-8">
                <Button className="w-full border-white/10 hover:bg-white/5 text-white font-black rounded-xl text-sm h-12" variant="outline">
                  Activate Now
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* JUST GOT KEYS - HIGH-INTENT TRIGGER */}
      <section className="py-20 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
              <img src={lifestyleImages.justGotKeys} alt="New apartment keys" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">High Priority</div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Just Received Your Apartment Keys?</h3>
                <p className="text-gray-300 font-bold text-lg">Most new residents discover the same problems on day one:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[
                  "No drinking water ready",
                  "No shower filter installed",
                  "Utilities not activated"
                ].map((issue, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-red-400 text-xs font-black">!</span>
                    </div>
                    <span className="text-gray-200 font-medium">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-emerald-500/20 pt-6">
              <p className="text-gray-300 font-bold mb-4">Let DeliWer prepare your home so your first night is stress-free.</p>
              <Button 
                size="lg" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-16 text-lg shadow-2xl transition-all group"
                onClick={() => window.open('https://wa.me/971523946311?text=Hello%20DeliWer,%20I%20just%20received%20my%20apartment%20keys%20and%20need%20home%20setup', '_blank')}
              >
                <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                WhatsApp: I Just Got My Keys
              </Button>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest text-center mt-3">Response within 10 minutes</p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">The Real Frustration of Ejari</h2>
            <div className="h-1 w-24 bg-emerald-500 mx-auto" />
            <p className="text-gray-300 font-bold text-xl max-w-3xl mx-auto leading-relaxed">
              Ejari registration often requires understanding complex documentation, coordinating with landlords or busy agents, navigating confusing online portals, or spending hours visiting trustee centers.
            </p>
            <div className="bg-emerald-500/10 border-2 border-emerald-500/20 p-8 rounded-[2rem] transform hover:scale-[1.02] transition-transform">
              <p className="text-emerald-400 font-black uppercase text-2xl tracking-tighter">Without an Ejari certificate, you cannot activate utilities or move into your new home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Ejari Registration Assistance From Home</h2>
            <p className="text-gray-400 font-medium text-lg">
              DeliWer simplifies the process by helping tenants complete Ejari registration easily from the comfort of their home.
            </p>
            <div className="space-y-4">
              {[
                "Guidance on required documents",
                "Support completing online process",
                "Convenient assistance from home",
                "Faster move-in progress"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span className="text-white font-bold uppercase text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            <Link href="/ejari-dubai">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl transition-all w-full md:w-auto mt-4">
                Start Your Ejari Registration
              </Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden border border-white/10">
            <img src={lifestyleImages.process} alt="Ejari process assistance" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* PROCESS VISUALIZATION */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Your Move-In Journey</h2>
            <p className="text-emerald-500 font-black uppercase tracking-widest text-sm">DeliWer simplifies Step 1 for a faster move-in</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "Step 1", title: "Register Ejari", icon: FileText, highlight: true },
              { step: "Step 2", title: "Activate Utilities", icon: Zap },
              { step: "Step 3", title: "Prepare Your Home", icon: Key },
              { step: "Step 4", title: "Move In Comfortably", icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className={`text-center space-y-4 p-6 rounded-3xl transition-all ${item.highlight ? 'bg-emerald-500/10 border border-emerald-500/30 ring-1 ring-emerald-500/20' : 'bg-white/5 border border-white/10'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 ${item.highlight ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className={`font-black uppercase text-xs tracking-widest ${item.highlight ? 'text-emerald-500' : 'text-gray-500'}`}>{item.step}</span>
                  <h3 className="font-black uppercase text-white text-sm">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIEF BENEFITS */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: MessageCircle, title: "Convenience from Home", desc: "No need to visit service centers" },
              { icon: FileText, title: "Reduced Paperwork", desc: "Clear guidance on requirements" },
              { icon: Zap, title: "Faster Completion", desc: "Skip the move-in delays" },
              { icon: Shield, title: "Smoother Transition", desc: "Professional coordination" }
            ].map((benefit, i) => (
              <div key={i} className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <benefit.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-black uppercase text-white text-sm tracking-tight">{benefit.title}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 px-6 text-center space-y-8 bg-emerald-600 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={lifestyleImages.finalCTA} alt="Happy resident in home" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-600/80 to-emerald-600" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950">Need your Ejari certificate before moving in?</h2>
          <p className="text-lg text-emerald-950 font-bold uppercase italic">Start your Ejari Home Service with DeliWer today.</p>
        </div>
        <Link href="/ejari-dubai">
          <Button 
            size="lg" 
            className="relative z-10 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl transition-all active-elevate-2 group"
          >
            <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Start Ejari Home Service
          </Button>
        </Link>
      </section>

      {/* Partner Strip */}
      <section className="px-4 py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-6">
          <PartnerStrip />
          <div className="text-center">
            <Link href="/partners">
              <Button 
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase text-xs px-6 py-3 rounded-xl"
              >
                Become a Partner →
              </Button>
            </Link>
          </div>
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
