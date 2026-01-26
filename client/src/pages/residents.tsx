import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Wrench, Recycle, ArrowRight, MessageCircle, DollarSign, Users, CheckCircle, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import maintenanceHero from "@/assets/images/maintenance-hero.jpg";
import { SEOMeta } from "@/components/seo-meta";

const WHATSAPP_NUMBER = "+971523946311";
const getWhatsAppLink = (service: string) => {
  const text = `Hi, I need help with my home regarding: ${service}`;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
};

const actionTiles = [
  {
    id: "maintenance",
    title: "Something Needs Fixing",
    description: "AC, plumbing, electrical, or urgent repairs handled by professional teams. Fixed starting prices and guaranteed quality.",
    icon: Wrench,
    color: "emerald",
    href: getWhatsAppLink("Home Maintenance / Fixing"),
    cta: "Book Maintenance",
    featured: true,
    price: "From AED 150"
  },
  {
    id: "move-in",
    title: "I’m Moving In",
    description: "Everything your home needs from day one: AC check, deep cleaning, and home readiness.",
    icon: CheckCircle,
    color: "blue",
    href: "/relocate#move-in-packs",
    cta: "View Move-In Package"
  },
  {
    id: "move-out",
    title: "I’m Moving Out",
    description: "Removal and compliance handled end-to-end. Appliance removal included.",
    icon: Recycle,
    color: "amber",
    href: "/relocate#move-out-pack",
    cta: "View Move-Out Package",
    trustLine: "Compliant disposal included in move-out services."
  }
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    button: "bg-emerald-600 hover:bg-emerald-500"
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
    button: "bg-blue-600 hover:bg-blue-500"
  },
  amber: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
    button: "bg-amber-600 hover:bg-amber-500"
  }
};

export default function ResidentsPage() {
  const scrollToTiles = () => {
    document.getElementById('action-tiles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="Home Maintenance & Repair Services Dubai | DeliWer"
        description="Professional home maintenance for Dubai residents. AC repair, plumbing, electrical, and urgent fixes. Fixed starting prices and WhatsApp support."
      />
      {/* Micro Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl py-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9] text-white drop-shadow-2xl">
              Professional Home <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Maintenance</span> Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-lg">
              AC Repair • Plumbing • Electrical • Emergency Fixes <br />
              <span className="text-sm uppercase tracking-[0.2em] text-emerald-400/80">Expert Technicians • Fixed Starting Prices • WhatsApp Booking</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider rounded-xl h-16 px-12 text-lg shadow-2xl shadow-emerald-900/40"
              onClick={scrollToTiles}
            >Book Maintenance & Upgrades Now</Button>
          </motion.div>
        </div>
      </section>
      {/* 3 Situation-Based Decision Tiles */}
      <section id="action-tiles" className="px-4 py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Reliable Ongoing Care for Your Dubai Home</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">From minor repairs to major upgrades, we ensure your living space stays in perfect condition throughout your stay.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actionTiles.map((tile, index) => {
              const colors = colorClasses[tile.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={tile.featured ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <Card className={`bg-white/5 border-white/10 hover-elevate transition-all duration-300 group overflow-hidden relative h-full rounded-[2rem] ${tile.featured ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/10' : ''}`}>
                    <CardContent className="p-8 flex flex-col space-y-6 h-full relative">
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} shrink-0`}>
                        <tile.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">{tile.title}</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">{tile.description}</p>
                        {tile.price && <p className="text-emerald-500 text-sm font-black uppercase tracking-widest">{tile.price}</p>}
                      </div>
                      <div className="space-y-4">
                        <Link href={tile.href}>
                          <Button 
                            className={`w-full ${colors.button} text-white font-black uppercase tracking-widest h-14 rounded-xl gap-2`}
                            onClick={(e) => {
                              if (tile.href.startsWith('http')) {
                                e.preventDefault();
                                window.open(tile.href, '_blank');
                              }
                            }}
                          >
                            {tile.cta} <ArrowRight className="w-5 h-5" />
                          </Button>
                        </Link>
                        {tile.trustLine && (
                          <p className="text-[10px] text-gray-500 uppercase font-black text-center tracking-widest leading-tight px-4">
                            {tile.trustLine}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Trust Section */}
      <section className="px-4 py-24 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-16">
            Why Residents Choose DeliWer
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: BuildingSign, label: "Rental-Ready", desc: "Designed for Dubai rentals" },
              { icon: DollarSign, label: "Fixed Packages", desc: "No surprises, clear pricing" },
              { icon: Users, label: "One Team", desc: "From move-in to move-out" }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                  <item.icon className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">{item.label}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer CTA */}
      <section className="px-4 py-16 text-center border-t border-white/5 bg-emerald-950/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl font-black uppercase text-white tracking-tight">Need international relocation or visa support?</h3>
          <Link href="/relocate">
            <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest h-14 px-12 rounded-xl group transition-all">
              Explore Relocation Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const BuildingSign = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M8 10h.01" />
    <path d="M16 10h.01" />
    <path d="M8 14h.01" />
    <path d="M16 14h.01" />
  </svg>
);
