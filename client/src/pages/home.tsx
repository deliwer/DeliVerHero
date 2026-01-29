import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { 
  Zap, MessageSquare, CheckCircle2, Thermometer, Droplets, 
  AlertTriangle, Coins, ShieldCheck, Check, Home as HomeIcon,
  Wrench, Cpu, Layout, ArrowRight, LogOut, ClipboardList, CalendarCheck, UserCheck
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
  const handleWhatsApp = (serviceName: string) => {
    const text = `Hi DeliWer, I'm interested in ${serviceName}. Please let me know how to proceed!`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="DeliWer | Your Home, Coordinated."
        description="Planning, scheduling, and managing everything around your home and move in Dubai without you juggling vendors."
      />

      {/* Micro Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* 1. Homepage Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 text-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 opacity-20"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
              Your Home, <br />
              <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Coordinated.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed">
              Planning, scheduling, and managing everything around your home and move — without you juggling vendors.
            </p>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
              Not movers. Not contractors. Just a single point of contact for your home.
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3"
              onClick={() => {
                const text = "Hi DeliWer, I'm interested in starting a concierge service. Please let me know how to proceed!";
                window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
              }}
            >
              Start Your Concierge
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white/10 text-white hover:bg-white/5 font-black rounded-2xl px-12 h-20 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3"
              onClick={() => handleWhatsApp("General Inquiry")}
            >
              <MessageSquare className="w-6 h-6" /> WhatsApp Support
            </Button>
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* 2. Service Entry Cards */}
      <section id="service-cards" className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Concierge Model</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-xl italic font-serif">A single point of contact for home stress.</p>
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
            <Link href="/residents">
              <Card className="bg-slate-900 border-emerald-500/30 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col scale-105 shadow-2xl shadow-emerald-500/5 z-10 border-2">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <ClipboardList className="w-8 h-8" />
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase px-3 py-1">
                      Planning Layer
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Move Concierge</h3>
                  <p className="text-emerald-50 font-bold leading-relaxed">
                    We manage the planning and vendor coordination around your move — before, during, and after moving day.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {[
                      "Utility setup & timelines",
                      "Furniture coordination",
                      "Single point of contact"
                    ].map((f, i) => (
                      <div key={i} className="flex gap-2 text-xs font-black uppercase tracking-widest text-emerald-100 items-center">
                        <CalendarCheck className="w-4 h-4 text-emerald-400" />
                        {f}
                      </div>
                    ))}
                    <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-widest mt-4 italic">
                      "Not a movers service. We manage the process, not the truck."
                    </p>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20">
                      Plan My Move
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
                  <h3 className="text-2xl font-black uppercase tracking-tight">Resident Support</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">
                    For residents already living in Dubai who need help managing home setup, upgrades, or transitions.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Home setup changes
                    </div>
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Exit or replacement support
                    </div>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl">
                      View Support Services
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
