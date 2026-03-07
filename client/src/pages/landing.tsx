import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Zap, 
  LogOut,
  Key,
  MessageCircle,
  CheckCircle2,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import { useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";

import heroBg from "@assets/generated_images/empty_dubai_apartment_interior_with_keys..png";

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Dubai Move-In & Relocation Concierge | DeliWer"
        description="DeliWer handles everything after the lease is signed. Ejari, DEWA, and full move-in setup for founders and brokers."
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
              I'm Moving Out
            </Button>
          </div>
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
            <Card className="bg-white/5 border-emerald-500/30 p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition-all group relative overflow-hidden ring-1 ring-emerald-500/20">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-emerald-500">Move-In Concierge</h3>
                <p className="text-gray-400 font-medium text-sm">Activate your new apartment with tenancy registration, utilities setup, and move-in readiness.</p>
              </div>
              <Link href="/relocate">
                <Button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm h-12 shadow-lg shadow-emerald-900/40">
                  Start Move-In
                </Button>
              </Link>
            </Card>

            {/* Move-Out Card */}
            <Card className="bg-white/5 border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">Move-Out Support</h3>
                <p className="text-gray-400 font-medium text-sm">Coordinate utilities closure, tenancy cancellation, and apartment handover.</p>
              </div>
              <Link href="/exit">
                <Button className="w-full mt-8 border-white/10 hover:bg-white/5 text-white font-black rounded-xl text-sm h-12" variant="outline">
                  Plan Move-Out
                </Button>
              </Link>
            </Card>

            {/* Just Signed Lease Card */}
            <Card className="bg-white/5 border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-purple-500/50 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Key className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">Just Signed a Lease?</h3>
                <p className="text-gray-400 font-medium text-sm">For brokers and tenants: activate your apartment immediately after signing.</p>
              </div>
              <Link href="/activate">
                <Button className="w-full mt-8 border-white/10 hover:bg-white/5 text-white font-black rounded-xl text-sm h-12" variant="outline">
                  Activate Now
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* BRIEF BENEFITS */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: MessageCircle, title: "One WhatsApp", desc: "Entire coordination on one chat" },
              { icon: CheckCircle2, title: "Clear Pricing", desc: "AED 399 complete move-in service" },
              { icon: Shield, title: "Verified Services", desc: "Ejari, DEWA, and home setup" }
            ].map((benefit, i) => (
              <div key={i} className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <benefit.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-black uppercase text-white text-sm">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center space-y-8 bg-emerald-600">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950">Ready to Activate Your Home?</h2>
          <p className="text-lg text-emerald-950 font-bold">Let DeliWer handle the rest while you settle in.</p>
        </div>
        <Button 
          size="lg" 
          className="bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl transition-all active-elevate-2 group"
          onClick={() => window.open('https://wa.me/971523946311?text=Hi,%20I%20need%20help%20with%20my%20apartment%20activation.', '_blank')}
        >
          <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
          Start on WhatsApp
        </Button>
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
