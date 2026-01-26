import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Wrench, Droplets, Zap, Recycle, ArrowRight, MessageCircle, Shield, DollarSign, Users, CheckCircle, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import residentsHero from "@/assets/images/residents-hero.jpg";
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
    description: "AC, plumbing, electrical, or emergency repairs",
    icon: Wrench,
    color: "emerald",
    href: getWhatsAppLink("Home Maintenance / Fixing"),
    cta: "Book Maintenance",
    price: "From AED 150"
  },
  {
    id: "water",
    title: "I Need Water or Essentials",
    description: "Water delivery, household supplies, and everyday needs",
    icon: Droplets,
    color: "blue",
    href: getWhatsAppLink("Water & Essentials Delivery"),
    cta: "Order Essentials",
    price: "Fixed Delivery Rates"
  },
  {
    id: "upgrade",
    title: "I Want to Improve or Reduce Bills",
    description: "Interior fitouts, smart home systems, or energy saving",
    icon: Zap,
    color: "amber",
    href: getWhatsAppLink("Home Improvements / Bill Reduction"),
    cta: "Upgrade My Home",
    price: "Custom Assessment"
  },
  {
    id: "replace",
    title: "I’m Replacing Something at Home",
    description: "Upgrade appliances or furniture with responsible removal",
    icon: Recycle,
    color: "green",
    href: "/ewaste",
    cta: "Replace & Upgrade",
    price: "Includes E-Waste Handling",
    trustLine: "Old items are removed and handled compliantly as part of the service."
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
  },
  green: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
    button: "bg-green-600 hover:bg-green-500"
  }
};

export default function ResidentsPage() {
  const scrollToTiles = () => {
    document.getElementById('action-tiles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="Home Services for Dubai Residents | DeliWer"
        description="Everything your Dubai home needs. Maintenance, water delivery, upgrades, and responsible removal. Fixed pricing and WhatsApp support."
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
          style={{ backgroundImage: `url(${residentsHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl py-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9] text-white drop-shadow-2xl">
              Everything Your Dubai Home Needs — <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Without the Hassle</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-lg">
              Fixed starting prices • WhatsApp support • Apartments & Villas
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
            >
              Get Help With My Home
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Situation-Based Decision Tiles */}
      <section id="action-tiles" className="px-4 py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {actionTiles.map((tile, index) => {
              const colors = colorClasses[tile.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className={`bg-white/5 border-white/10 hover-elevate transition-all duration-300 group overflow-hidden relative h-full rounded-[2rem]`}>
                    <CardContent className="p-8 flex flex-col space-y-6 h-full relative">
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} shrink-0`}>
                        <tile.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">{tile.title}</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">{tile.description}</p>
                        <p className="text-emerald-500 text-sm font-black uppercase tracking-widest">{tile.price}</p>
                      </div>
                      <div className="space-y-4">
                        <Button 
                          className={`w-full ${colors.button} text-white font-black uppercase tracking-widest h-14 rounded-xl gap-2`}
                          onClick={() => window.open(tile.href, tile.href.startsWith('http') ? '_blank' : '_self')}
                        >
                          {tile.cta} <ArrowRight className="w-5 h-5" />
                        </Button>
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

      {/* Resident-Specific Proof Section */}
      <section className="px-4 py-24 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white text-center mb-16">
            Why Residents Choose DeliWer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", loc: "Dubai Marina", text: "Finally a service that just works. No endless back and forth, fixed price, and they handled everything." },
              { name: "Ahmed K.", loc: "Downtown Dubai", text: "The trade-in service is a game changer. Replaced my old fridge and they took it away same day." },
              { name: "Jessica M.", loc: "JVC Resident", text: "Super responsive via WhatsApp. Had my AC fixed within 2 hours of booking. Highly recommend." }
            ].map((t, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-8 rounded-2xl space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <CheckCircle key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" />)}
                </div>
                <p className="text-gray-300 italic text-sm leading-relaxed">"{t.text}"</p>
                <div>
                  <div className="text-white font-black uppercase text-xs">{t.name}</div>
                  <div className="text-emerald-500 text-[10px] uppercase font-bold tracking-widest">{t.loc}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Micro-Flow Section */}
      <section className="px-4 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Smartphone, label: "Pick", desc: "Select the service you need" },
              { icon: MessageCircle, label: "Confirm", desc: "Quick verification via WhatsApp" },
              { icon: CheckCircle, label: "Resolve", desc: "Service completed as promised" }
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-emerald-500/20">
                  <step.icon className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">{step.label}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-16 text-center border-t border-white/5 bg-emerald-950/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl font-black uppercase text-white tracking-tight">Need Relocation or Move-Out Help?</h3>
          <p className="text-gray-400 font-medium">We offer end-to-end exit management and international moves.</p>
          <Link href="/relocate">
            <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest h-14 px-12 rounded-xl group transition-all">
              Switch to Relocation Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
