import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Wrench, ArrowRight, Home, LogOut, CheckCircle2, MessageSquare, Clock, MapPin, UserCheck, ShieldCheck, Zap, Droplets, Hammer } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import { SEOMeta } from "@/components/seo-meta";
import maintenanceHero from "@/assets/images/maintenance-hero.jpg";
import acMaintenanceHero from "@/assets/images/ac-maintenance-hero.jpg";

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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 opacity-30"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
              Your Home in Dubai.<br />
              <span className="text-emerald-500">Ready, Fixed, or Closed.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-bold">
              Professional maintenance, move-in setup, and secure exit packages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5 text-gray-400 font-bold uppercase tracking-widest text-xs h-12 rounded-xl"
              onClick={() => {
                const element = document.getElementById('maintenance-card');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              I already live here → Resident Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Focused Decision Flow */}
      <section className="px-4 py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Featured Card: Something Needs Fixing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 h-full"
            >
              <Card 
              id="maintenance-card"
              className="relative group min-h-[500px] border-emerald-500/30 overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl shadow-emerald-500/10"
            >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40"
                  style={{ backgroundImage: `url(${acMaintenanceHero})` }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                
                <CardContent className="relative z-20 p-10 md:p-14 flex flex-col h-full justify-end space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full mb-4">
                      <Zap className="w-3 h-3" /> Priority Service
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                      Something Needs <br /><span className="text-emerald-500">Fixing?</span>
                    </h3>
                    <p className="text-lg md:text-xl text-gray-200 font-bold max-w-xl leading-relaxed">
                      Urgent AC, plumbing, or electrical issues? Our certified technicians provide professional maintenance and repairs with fixed starting prices.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center gap-3 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" /> <span>AC Deep Cleaning</span>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" /> <span>Electrical & Plumbing</span>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" /> <span>Water Filtration</span>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" /> <span>Appliance Repair</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      onClick={() => window.open(getWhatsAppLink("Home Maintenance"), '_blank')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider h-16 px-10 rounded-2xl text-lg flex gap-3 shadow-xl shadow-emerald-900/40"
                    >
                      Book Maintenance <ArrowRight className="w-6 h-6" />
                    </Button>
                    <div className="flex items-center gap-2 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">Apartment & Villa Coverage</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Demoted Secondary Cards */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Moving In */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-emerald-500/30 transition-all duration-300 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Home className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">I’m Moving In</h4>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">Prepare home fully before unpacking. Assessment & setup within 24–48h.</p>
                    <Link href="/move-in-package">
                      <Button variant="link" className="p-0 h-auto text-emerald-500 font-black uppercase tracking-widest text-xs flex gap-2 group">
                        View Move-In Package <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Moving Out */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-all duration-300 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <LogOut className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">I’m Moving Out</h4>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">Removal, e-waste, and handover. Handle your exit compliantly.</p>
                    <Link href="/relocate#move-out-packs">
                      <Button variant="link" className="p-0 h-auto text-blue-500 font-black uppercase tracking-widest text-xs flex gap-2 group">
                        View Move-Out Package <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Micro-Flow Module */}
      <section className="px-4 py-16 border-t border-white/5 bg-slate-900/30">
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
                  <h3 className="text-lg font-black uppercase text-white tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-xs font-bold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trust / Proof Module */}
      <section className="px-4 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">Designed for Real Homes in Dubai</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { icon: MapPin, title: "Dubai-wide coverage", desc: "Apartments & villas in all areas" },
              { icon: UserCheck, title: "Single point of contact", desc: "No chasing multiple technicians" },
              { icon: Clock, title: "Fast assessments", desc: "Same-day or next-day scheduling" },
              { icon: ShieldCheck, title: "Relocation specialists", desc: "Move-In & Move-Out experts" },
              { icon: ShieldCheck, title: "Responsible removal", desc: "E-waste handled correctly" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                <item.icon className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-black uppercase text-xs text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-[10px] font-medium uppercase tracking-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer / Next Step */}
      <section className="px-4 py-24 bg-emerald-950/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-black uppercase text-white tracking-tight">Need international relocation or visa support?</h3>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">Our premium relocation hub handles global moves and Dubai business setup for investors and families.</p>
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
