import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserCheck, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Home, 
  Settings,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { TrustStrip } from "@/components/trust-strip";
import homeConciergeBg from "@/assets/images/home-concierge-bg.jpg";

const WHATSAPP_NUMBER = "971523946311";

export default function ResidentSupportConcierge() {
  const handleWhatsApp = (context: string) => {
    const text = `Resident Support Concierge – ${context}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const situations = [
    { title: "New home settling", icon: Home },
    { title: "Ongoing household help", icon: UserCheck },
    { title: "Installations & upgrades", icon: Plus },
    { title: "Regular coordination needs", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
      <Helmet>
        <title>Resident Support Concierge | DeliWer Dubai</title>
        <meta name="description" content="Resident Support, Handled for You. For busy professionals who don’t want to manage vendors or follow-ups." />
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
          style={{ backgroundImage: `url(${homeConciergeBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Resident Support, <br />
              <span className="text-blue-500 italic font-serif lowercase tracking-normal">Handled for You.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto font-medium">
              For busy professionals who don’t want to manage vendors or follow-ups.
            </p>
          </motion.div>

          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl"
            onClick={() => handleWhatsApp("Activation")}
          >
            Activate Resident Support
          </Button>
        </div>
      </section>

      {/* Situations */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {situations.map((sit, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group rounded-3xl overflow-hidden" onClick={() => handleWhatsApp(sit.title)}>
              <CardContent className="p-8 space-y-4">
                <sit.icon className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-black uppercase tracking-tight text-white">{sit.title}</h3>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors ml-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tiers/Packs */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Support Tiers</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Monthly Support", desc: "Ongoing orchestration of all home maintenance and lifestyle vendors." },
              { name: "One-time Coordination", desc: "Project-based management for specific upgrades or transitions." },
              { name: "Priority Resident Care", desc: "Dedicated home manager for premium, zero-friction living." }
            ].map((pkg, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 bg-white/5 border border-white/5 rounded-3xl gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-black uppercase text-white">{pkg.name}</h4>
                  <p className="text-gray-400 text-sm font-bold">{pkg.desc}</p>
                </div>
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 rounded-xl uppercase font-black tracking-widest px-8" onClick={() => handleWhatsApp(pkg.name)}>
                  Inquire
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
