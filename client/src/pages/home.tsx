import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { 
  Zap, MessageSquare, CheckCircle2, Thermometer, Droplets, 
  AlertTriangle, Coins, ShieldCheck, Check, Home as HomeIcon,
  Wrench, Cpu, Layout, ArrowRight, LogOut
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
        title="DeliWer | Home Life in Dubai, Simplified."
        description="Professional home maintenance, smart home upgrades, and relocation packages in Dubai. Fixed pricing, expert technicians, and WhatsApp support."
      />

      {/* Micro Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section - Elite Concierge & Risk Mitigation Focus */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 opacity-30"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
              Your Home in Dubai.<br />
              Ready, Fixed, or Closed — <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Without the Stress.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
              Move-In setup • Ongoing fixes • Smooth Move-Out • Apartments & Villas
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link href="/residents">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3"
              >
                <HomeIcon className="w-6 h-6" /> I’m Moving In
              </Button>
            </Link>
            <Link href="/residents">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-12 h-20 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2 flex gap-3"
              >
                <LogOut className="w-6 h-6" /> I’m Moving Out
              </Button>
            </Link>
          </div>

          <div className="pt-4">
            <Link href="/residents/support">
              <button className="text-gray-400 hover:text-emerald-400 text-sm font-bold uppercase tracking-widest transition-colors">
                I already live here → Resident Services
              </button>
            </Link>
          </div>

          <div className="pt-8 text-emerald-500/60 text-xs font-black uppercase tracking-widest">
            Assessment within 24–48 hours • Apartments & Villas • Fast, coordinated setup
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* Core Services Section */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Everything Your Home Needs</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">From minor fixes to major relocations, we handle the complexity so you don't have to.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Home Maintenance",
                desc: "AC, plumbing, and electrical. Fixed starting prices and guaranteed quality.",
                icon: Wrench,
                color: "emerald",
                link: "/residents"
              },
              {
                title: "Smart Home",
                desc: "Thermostats, lighting, and security. Control your home from anywhere.",
                icon: Cpu,
                color: "blue",
                link: "/residents"
              },
              {
                title: "Secure Relocation",
                desc: "Move-in readiness and deposit-protected exit packages.",
                icon: ShieldCheck,
                color: "emerald",
                link: "/relocate"
              }
            ].map((service, i) => (
              <Link key={i} href={service.link}>
                <Card className="bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer">
                  <CardContent className="p-10 space-y-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${service.color}-500/20 flex items-center justify-center text-${service.color}-400`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">{service.desc}</p>
                    <div className={`text-${service.color}-400 font-black uppercase tracking-widest text-xs flex items-center gap-2`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
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
          <p className="text-xl text-slate-200 font-medium mb-12">
            One team, one bill, zero stress. We handle the foundations of your home so you can focus on living your Dubai life.
          </p>
          <Button 
            size="lg"
            className="bg-emerald-600 text-white font-black rounded-full px-12 h-16 text-lg hover:bg-emerald-500 transition-all active-elevate-2"
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
