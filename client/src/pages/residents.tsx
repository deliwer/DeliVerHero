import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Wrench, ArrowRight, Home, LogOut, CheckCircle2, MessageSquare, Clock, MapPin, UserCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import { SEOMeta } from "@/components/seo-meta";
import maintenanceHero from "@/assets/images/maintenance-hero.jpg";

const WHATSAPP_NUMBER = "+971523946311";
const getWhatsAppLink = (service: string) => {
  const text = `Hi, I need help with my home regarding: ${service}`;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
};

export default function ResidentsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="Residents | Home Services, Move-In & Move-Out Dubai"
        description="Professional home maintenance, move-in setup, and secure exit packages for Dubai residents. Apartments and villas covered."
      />

      {/* Micro Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* 1. Hero Section (Above the Fold) */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 opacity-30"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
              Your Home in Dubai.<br />
              Ready, Fixed, or Closed — <span className="text-emerald-500">Without the Stress.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-bold">
              Move-In setup • Ongoing fixes • Smooth Move-Out • Apartments & Villas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            <Link href="/relocate#move-in-packs">
              <Button 
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider rounded-xl h-20 px-12 text-xl shadow-2xl shadow-emerald-900/40 w-full md:w-auto flex gap-3"
              >
                <Home className="w-6 h-6" /> I’m Moving In
              </Button>
            </Link>
            <Link href="/relocate#move-out-pack">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-xl h-20 px-12 text-xl shadow-2xl shadow-blue-900/40 w-full md:w-auto flex gap-3"
              >
                <LogOut className="w-6 h-6" /> I’m Moving Out
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/contact">
              <button className="text-gray-400 hover:text-emerald-400 text-sm font-bold uppercase tracking-widest transition-colors">
                I already live here → Resident Services
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. 3-Tile Decision Flow */}
      <section className="px-4 py-24 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tile 1: Moving In */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 h-full rounded-[2.5rem] overflow-hidden group">
                <CardContent className="p-10 flex flex-col h-full space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Home className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">I’m Moving In</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">Prepare home fully before unpacking. AC deep cleaning, painting, and essential setup.</p>
                  </div>
                  <div className="space-y-4">
                    <Link href="/relocate#move-in-packs">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-14 rounded-xl gap-2">
                        View Move-In Package <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.2em] text-center">Assessment & setup within 24–48h</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tile 2: Fixing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="h-full"
            >
              <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 h-full rounded-[2.5rem] overflow-hidden group">
                <CardContent className="p-10 flex flex-col h-full space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <Wrench className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">Something Needs Fixing</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">AC, plumbing, electrical. Urgent repairs and ongoing maintenance by experts.</p>
                  </div>
                  <div className="space-y-4">
                    <Button 
                      onClick={() => window.open(getWhatsAppLink("Home Maintenance"), '_blank')}
                      className="w-full bg-white text-slate-950 hover:bg-gray-100 font-black uppercase tracking-widest h-14 rounded-xl gap-2"
                    >
                      Book Maintenance <ArrowRight className="w-5 h-5" />
                    </Button>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">Apartment & villa coverage</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tile 3: Moving Out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <Card className="bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full rounded-[2.5rem] overflow-hidden group">
                <CardContent className="p-10 flex flex-col h-full space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <LogOut className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">I’m Moving Out</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">Removal, e-waste, handover. We ensure you get your deposit back without the stress.</p>
                  </div>
                  <div className="space-y-4">
                    <Link href="/relocate#move-out-pack">
                      <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest h-14 rounded-xl gap-2">
                        View Move-Out Package <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.2em] text-center">Old items handled compliantly</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Micro-Flow Module */}
      <section className="px-4 py-24 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Pick your need", desc: "Select Move-In, Move-Out or Fixing", icon: MessageSquare },
              { step: "02", title: "We coordinate", desc: "We schedule & coordinate all teams", icon: Clock },
              { step: "03", title: "We execute", desc: "We confirm completion & quality", icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className="relative space-y-6 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/20">
                  <item.icon className="w-10 h-10 text-emerald-500" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 font-black text-xs px-2 py-1 rounded-lg">{item.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-bold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trust / Proof Module */}
      <section className="px-4 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Designed for Real Homes in Dubai</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { icon: MapPin, title: "Dubai-wide coverage", desc: "Apartments & villas in all areas" },
              { icon: UserCheck, title: "Single point of contact", desc: "No chasing multiple technicians" },
              { icon: Clock, title: "Fast assessments", desc: "Same-day or next-day scheduling" },
              { icon: ShieldCheck, title: "Relocation specialists", desc: "Move-In & Move-Out experts" },
              { icon: ShieldCheck, title: "Responsible removal", desc: "E-waste handled correctly" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                <item.icon className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-black uppercase text-sm text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm font-black uppercase tracking-widest pt-8 border-t border-white/5">
            Supporting residents, landlords, and relocating families across Dubai.
          </p>
        </div>
      </section>

      {/* 5. Footer / Next Step */}
      <section className="px-4 py-24 bg-emerald-950/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-black uppercase text-white tracking-tight">Need international relocation or visa support?</h3>
            <p className="text-gray-400 font-medium">Our premium relocation hub handles global moves and Dubai business setup.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link href="/relocate">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-16 px-12 rounded-xl group transition-all">
                Explore Relocation Services <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest h-16 px-12 rounded-xl flex gap-3"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}`, '_blank')}
            >
              <MessageSquare className="w-6 h-6" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
