import { useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  UserCheck, 
  ShieldCheck,
  Zap,
  Hammer,
  ClipboardList,
  CalendarCheck,
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import homeConciergeBg from "@/assets/images/home-concierge-bg.jpg";

const WHATSAPP_NUMBER = "+971523946311";

export default function Residents() {
  const conciergeRef = useRef<HTMLDivElement>(null);

  const scrollToConcierge = () => {
    conciergeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <Helmet>
        <title>Dubai Home Concierge: Maintenance & Coordination | DeliWer</title>
        <meta name="description" content="Not movers. Your home concierge. We plan, coordinate, and manage everything around your move or daily home needs in Dubai." />
      </Helmet>

      {/* Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105"
          style={{ backgroundImage: `url(${homeConciergeBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Home Life in Dubai, <br />
              <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Coordinated.</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100/80 max-w-2xl mx-auto font-medium">
              We plan, coordinate, and manage everything around your move or daily home needs — so you don’t deal with multiple vendors.
            </p>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-4">
              Not movers. Not contractors. Your home concierge.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-900/40"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}`, '_blank')}
            >
              <MessageSquare className="mr-2 h-6 w-6" /> Get Started on WhatsApp
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/10 text-white hover:bg-white/5 h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl"
              onClick={scrollToConcierge}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Service Cards: The 3 Mental Models */}
      <section ref={conciergeRef} className="px-4 py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* CARD 1 — HOME MAINTENANCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                      <Hammer className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Fix Something <br />at Home</h3>
                      <p className="text-gray-400 font-bold text-sm mt-2">For everyday home issues that need fixing or servicing.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="flex gap-3 text-sm text-gray-300 font-bold items-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>AC, plumbing, electrical</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-300 font-bold items-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Small repairs & servicing</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-900/20"
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=Hi, I need help fixing something at home.`, '_blank')}
                  >
                    Book Maintenance <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 2 — MOVE-IN / MOVE-OUT CONCIERGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-slate-900 border-emerald-500/50 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden ring-4 ring-emerald-500/20 relative shadow-2xl shadow-emerald-500/10">
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                        <ClipboardList className="w-8 h-8" />
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                        Planning Layer
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Move Concierge <br />(In / Out)</h3>
                      <p className="text-gray-400 font-bold text-sm mt-2 leading-relaxed">
                        We coordinate everything around your move — before and after moving day. No trucks. No packing. Just orchestration.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {[
                      "Utility connections & disconnections",
                      "Home setup or clearance planning",
                      "Furniture or appliance coordination",
                      "Vendor scheduling & compliance",
                      "Single point of contact"
                    ].map((f, i) => (
                      <div key={i} className="flex gap-3 text-[11px] text-gray-200 font-black uppercase tracking-tight items-center">
                        <CalendarCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button 
                      className="w-full h-20 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 text-lg"
                      onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=Hi, I want to plan my move-in/out concierge.`, '_blank')}
                    >
                      Plan My Move <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                    <div className="text-center">
                      <Link href="/relocate">
                        <Button variant="link" className="text-emerald-500 text-[10px] font-black uppercase tracking-widest p-0 h-auto underline decoration-emerald-500/30 underline-offset-4">
                          Already have movers? We coordinate around them
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest text-center">
                    This is not a movers service. We manage the process.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 3 — RESIDENT SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Resident Support <br />Services</h3>
                      <p className="text-gray-400 font-bold text-sm mt-2">For residents already living in Dubai who need help managing their home.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="flex gap-3 text-sm text-gray-300 font-bold items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      <span>Setup changes & home upgrades</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-300 font-bold items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      <span>Exit or replacement support</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-900/20"
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=Hi, I'm a resident and need support.`, '_blank')}
                  >
                    See Resident Services <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Orchestration Value Prop */}
      <section className="px-4 py-24 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Not movers. <br />
              <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Orchestrators.</span>
            </h2>
            <p className="text-gray-400 font-bold text-lg max-w-2xl mx-auto">
              We are the coordination layer between you and the complexity of Dubai home services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Pick your need", desc: "Select Maintenance, Concierge or Support", icon: MessageSquare },
              { step: "02", title: "We coordinate", desc: "We schedule & coordinate all teams", icon: Clock },
              { step: "03", title: "We execute", desc: "We confirm completion & quality", icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className="relative space-y-6">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-emerald-500/20 relative">
                  <item.icon className="w-10 h-10 text-emerald-500" />
                  <span className="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl">{item.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-bold leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Detailed Trust Points */}
      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Designed for Real Homes in Dubai</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Dubai-wide coverage", desc: "Apartments & villas in all major residential areas." },
              { icon: UserCheck, title: "Single point of contact", desc: "No chasing multiple technicians or vendors. We handle them all." },
              { icon: Clock, title: "Fast assessments", desc: "Same-day or next-day scheduling for urgent home fixing." },
              { icon: ShieldCheck, title: "Relocation specialists", desc: "Move-In & Move-Out experts protecting your deposit and sanity." },
              { icon: ShieldCheck, title: "Responsible removal", desc: "Furniture and e-waste handled compliantly and ethically." },
              { icon: Zap, title: "Zero Lead Loss", desc: "Every request is logged and actioned within minutes." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-colors group">
                <item.icon className="w-8 h-8 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="space-y-2">
                  <h4 className="font-black uppercase text-sm text-white">{item.title}</h4>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed uppercase tracking-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="px-4 py-24 bg-emerald-950/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-[0.9]">Ready to simplify <br />your Dubai home?</h3>
            <p className="text-gray-400 font-bold max-w-xl mx-auto">Let our concierge handle the complexity. One message starts the orchestration.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-20 px-12 rounded-2xl group transition-all text-xl shadow-2xl shadow-emerald-900/40"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}`, '_blank')}
            >
              <MessageSquare className="mr-2 w-6 h-6" /> WhatsApp Concierge
            </Button>
            <Link href="/relocate">
              <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 h-20 px-12 rounded-2xl font-black uppercase tracking-widest flex gap-3 text-lg">
                Explore Relocation <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
