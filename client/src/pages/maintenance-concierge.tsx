import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wrench, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Hammer,
  Zap,
  Droplets,
  AlertTriangle
} from "lucide-react";
import { TrustStrip } from "@/components/trust-strip";
import { DirhamSymbol } from "@/components/dirham-symbol";
import maintenanceHero from "@/assets/images/maintenance-hero.jpg";

const WHATSAPP_NUMBER = "971523946311";

export default function MaintenanceConcierge() {
  const handleWhatsApp = (issue: string) => {
    const text = `Maintenance Concierge – ${issue}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const situations = [
    { title: "Something stopped working", icon: AlertTriangle, tag: "Emergency" },
    { title: "AC / Electrical issue", icon: Zap, tag: "Essential" },
    { title: "Plumbing concern", icon: Droplets, tag: "Immediate" },
    { title: "Preventive check", icon: CheckCircle2, tag: "Proactive" }
  ];

  const packages = [
    {
      name: "Assessment Visit",
      price: "199",
      desc: "On-site expert assessment to identify root causes and provide a fixed coordination quote.",
      features: ["Professional inspection", "Fault diagnosis", "Repair timeline & quote"]
    },
    {
      name: "Preventive Maintenance",
      price: "499",
      desc: "Seasonal checkup for AC, electrical, and plumbing to avoid emergency failures.",
      features: ["Full AC filter clean", "Electrical panel audit", "Leak & pressure check"]
    },
    {
      name: "Emergency Coordination",
      price: "Assessment-led",
      desc: "Priority management for critical home failures that need immediate orchestration.",
      features: ["Priority response", "Vetted emergency team", "Manager oversight"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <Helmet>
        <title>Maintenance Concierge | DeliWer Dubai</title>
        <meta name="description" content="Home Maintenance, Coordinated — Not Chased. One point of contact to assess, schedule, and manage trusted technicians." />
      </Helmet>

      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 text-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 scale-105"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Home Maintenance, <br />
              <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Coordinated.</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100/80 max-w-2xl mx-auto font-medium">
              One point of contact to assess, schedule, and manage trusted technicians.
            </p>
          </motion.div>

          <Button 
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl"
            onClick={() => handleWhatsApp("General Booking")}
          >
            Book Maintenance Concierge
          </Button>
        </div>
      </section>

      {/* Situations */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {situations.map((sit, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group rounded-3xl overflow-hidden" onClick={() => handleWhatsApp(sit.title)}>
              <CardContent className="p-8 space-y-4">
                <sit.icon className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-black uppercase tracking-tight text-white">{sit.title}</h3>
                <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{sit.tag}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Concierge Packs</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Fixed pricing for coordination & assessment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <Card key={i} className="bg-slate-900 border-white/10 rounded-[2.5rem] p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase text-white">{pkg.name}</h3>
                  <div className="flex items-center gap-1">
                    {pkg.price !== "Assessment-led" && <DirhamSymbol className="w-5 h-5 text-emerald-500" />}
                    <span className="text-4xl font-black text-white tracking-tighter">{pkg.price}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-bold leading-tight">{pkg.desc}</p>
                <div className="space-y-3">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex gap-2 items-center text-xs font-black uppercase text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
