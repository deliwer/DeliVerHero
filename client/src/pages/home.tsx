import { Navigation } from "@/components/navigation";
import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { 
  Zap, MessageSquare, CheckCircle2, Thermometer, Droplets, 
  AlertTriangle, Coins, ShieldCheck, Check, Home as HomeIcon,
  Wrench, Cpu, Layout, ArrowRight, LogOut, ClipboardList, CalendarCheck, UserCheck,
  Package, Settings, MoveHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrustStrip, PartnerStrip } from "@/components/trust-strip";
import { motion } from "framer-motion";

import maintenanceHero from "@/assets/images/maintenance-hero.jpg";
import waterLifestyleImg from "@/assets/images/water-lifestyle.jpg";

export default function Home() {
  const handleWhatsApp = (serviceName?: string) => {
    const text = serviceName 
      ? `Hi DeliWer, I just signed a lease in Dubai and need move-in support for ${serviceName}`
      : "Hi DeliWer, I just signed a lease in Dubai and need move-in support";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <SEOMeta 
        title="Moving into Dubai? We handle everything after the keys | DeliWer"
        description="Home setup, relocation support, fixes, furniture, disposal & daily living handled by one team on WhatsApp."
      />

      <Navigation />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 text-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 opacity-30"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] drop-shadow-2xl text-white uppercase">
              Moving Into a New <br />
              Apartment in <span className="text-emerald-500">Dubai?</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-300 font-bold max-w-3xl mx-auto leading-tight uppercase tracking-tight">
              Start with a structured Move-In Planning Session — <br />
              <span className="text-blue-400 italic font-serif lowercase tracking-normal">from Ejari to home activation.</span>
            </h2>
          </motion.div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Link href="/residents?stage=ejari">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-[2rem] px-8 h-20 text-xl shadow-2xl transition-all w-full active-elevate-2 flex gap-4 items-center justify-center"
                >
                  Start Move-In Planning <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link href="/residents?stage=handover">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 font-black rounded-[2rem] px-8 h-20 text-xl shadow-2xl transition-all w-full active-elevate-2 flex gap-4 items-center justify-center"
                >
                  I Already Have My Keys
                </Button>
              </Link>
            </div>
          </div>

          {/* Journey Indicator */}
          <div className="pt-12 flex items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm">1</span>
              <span className="text-emerald-500 font-black uppercase tracking-widest text-sm">Plan</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-black text-sm">2</span>
              <span className="font-black uppercase tracking-widest text-sm">Activate</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-black text-sm">3</span>
              <span className="font-black uppercase tracking-widest text-sm">Settle</span>
            </div>
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* 2. Service Entry Cards */}
      <section id="service-cards" className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mx-auto">
              <ShieldCheck className="w-4 h-4" /> 100% Home Service Solution
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Concierge Model</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-xl italic font-serif">Process your Ejari, DEWA & Move-In without ever leaving your home or office.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CARD 1 — HOME MAINTENANCE */}
            <Link href="/residents">
              <Card className="bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Wrench className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Fix Something at Home</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">
                    For issues or repairs around your home. We coordinate trusted service partners on your behalf.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      AC, plumbing, electrical
                    </div>
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Minor repairs & servicing
                    </div>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl">
                      Book Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* CARD 2 — RESIDENT CONCIERGE */}
            <Link href="/relocate">
              <Card className="bg-slate-900 border-emerald-500/30 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col scale-105 shadow-2xl shadow-emerald-500/5 z-10 border-2">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <ClipboardList className="w-8 h-8" />
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase px-3 py-1">
                      Journey Layer
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Relocation Support</h3>
                  <p className="text-emerald-50 font-bold leading-relaxed">
                    We manage the foundations of your move. From technical activation to family relocation support.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {[
                      "Move-In Activation (AED 399)",
                      "Full Relocation Coordination",
                      "Move-Out Deposit Protection"
                    ].map((f, i) => (
                      <div key={i} className="flex gap-2 text-xs font-black uppercase tracking-widest text-emerald-100 items-center">
                        <CalendarCheck className="w-4 h-4 text-emerald-400" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20">
                      Explore Relocation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* CARD 3 — RESIDENT SUPPORT SERVICES */}
            <Link href="/residents">
              <Card className="bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Resident Privileges</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">
                    Exclusive access to Dubai's top venues and priority concierge scheduling for our long-term residents.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Partner F&B Vouchers
                    </div>
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Priority Maintenance
                    </div>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl">
                      View Privileges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Living Image Section */}
      <section className="relative py-24 md:py-32 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${waterLifestyleImg})` }}
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase leading-tight">
            Dubai Living, <span className="text-emerald-400">Organized.</span>
          </h2>
          <p className="text-xl text-slate-200 font-medium mb-12 italic font-serif">
            One team, one point of contact, zero stress. We coordinate the foundations of your home so you can focus on living.
          </p>
          <Button 
            size="lg"
            className="bg-emerald-600 text-white font-black rounded-full px-12 h-16 text-lg hover:bg-emerald-500 transition-all active-elevate-2 shadow-2xl shadow-emerald-900/40"
            onClick={() => handleWhatsApp("General Consultation")}
          >
            WhatsApp Support
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-16 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <img src="/deliwer-logo.png" alt="DeliWer Logo" className="h-12 w-auto brightness-110" />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="https://wa.me/971523946311" className="text-emerald-400 font-black uppercase tracking-widest text-sm hover:underline">WhatsApp Support</a>
            <a href="mailto:service@deliwer.com" className="text-gray-400 font-bold hover:text-white">service@deliwer.com</a>
            <span className="text-gray-600 text-sm font-bold uppercase tracking-tight">Dubai, United Arab Emirates</span>
          </div>
          <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 DELIWER HOME SERVICES. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
