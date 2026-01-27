import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Zap,
  Plane,
  Home,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import { SEOMeta } from "@/components/seo-meta";

const WHATSAPP_NUMBER = "+971523946311";
const getWhatsAppLink = (service: string) => {
  const text = `Hi, I'm interested in the Move-Out Package: ${service}`;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
};

export default function MoveOutPackagePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
      <SEOMeta 
        title="Move-Out Package | Dubai Home Exit & Handover"
        description="Leave clean, disconnect right, and avoid penalties. Furniture removal, appliances, and utility disconnections fully coordinated."
      />

      {/* Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Leave Clean. Disconnect Right. <br />
              <span className="text-blue-500">Avoid Penalties.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-bold max-w-2xl mx-auto leading-tight">
              Furniture removal, old electronics handling, utility disconnections, and handover support — coordinated end-to-end.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-xl h-20 px-12 text-xl shadow-2xl shadow-blue-900/40 w-full md:w-auto flex gap-3"
              onClick={() => window.open(getWhatsAppLink("Plan My Move-Out"), '_blank')}
            >
              Plan My Move-Out <ArrowRight className="w-6 h-6" />
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-blue-500/60 text-xs font-black uppercase tracking-widest italic"
          >
            Fast assessment • Apartments & villas
          </motion.p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Moving out in Dubai isn't just about packing.</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Miss any of these, and it costs time, money, or deposit.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Furniture no longer needed",
              "Old appliances or electronics left behind",
              "Utilities that must be disconnected correctly",
              "Landlord handover timelines and penalties"
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 items-center">
                <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="font-bold text-white uppercase text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
             <p className="text-lg text-white font-bold italic">Landlords often claim deposits for minor maintenance or improper closing of accounts. We remove the risk.</p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">What's Included</h2>
            <div className="space-y-4">
              {[
                { text: "Furniture removal or trade-off", icon: Home },
                { text: "Old appliances & electronics handled responsibly", icon: Zap },
                { text: "AC, water, and utility disconnections", icon: CheckCircle2 },
                { text: "Clearance coordination for landlord handover", icon: Shield },
                { text: "One point of contact — no chasing vendors", icon: Clock }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 items-center group hover:border-blue-500/30 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-500 shrink-0" />
                  <span className="font-bold text-gray-200">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase italic">
              * Electronics and furniture are not marketed as services — they are resolved as part of move-out readiness.
            </p>
          </div>
          <Card className="bg-slate-900 border-blue-500/20 rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-10 space-y-8">
              <h3 className="text-xl font-black uppercase tracking-tight text-white border-b border-white/5 pb-4 text-center">Operational Proof</h3>
              <div className="space-y-6">
                {[
                  { title: "Fast assessment timelines", desc: "Same-day or next-day scheduling", icon: Clock },
                  { title: "Dubai-wide coverage", desc: "Apartments & villas in all areas", icon: MapPin },
                  { title: "Responsible handling", desc: "Coordinated removal of old items", icon: Shield },
                  { title: "Compliance Aware", desc: "Experience with landlord & building requirements", icon: CheckCircle2 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-black text-white uppercase text-sm">{item.title}</p>
                      <p className="text-gray-400 text-xs font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "1. Tell us your date", desc: "Share your move-out timeline" },
              { title: "2. We Assess", desc: "We identify what needs clearing or disconnecting" },
              { title: "3. We Coordinate", desc: "Removal, disconnections, and handover handled" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <h4 className="font-black uppercase text-lg text-white">{item.title}</h4>
                <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm font-black uppercase tracking-widest pt-8 border-t border-white/5">
            No fragmented bookings. No compliance confusion.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-24 bg-blue-950/20 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Plan My Move-Out</h3>
            <p className="text-blue-500/60 text-sm font-black uppercase tracking-widest">We'll confirm scope and next steps quickly.</p>
          </div>
          
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-xl h-20 px-12 text-xl shadow-2xl shadow-blue-900/40 w-full md:w-auto"
            onClick={() => window.open(getWhatsAppLink("Plan My Move-Out"), '_blank')}
          >
            Get Started Now <ArrowRight className="ml-2 h-6 w-6" />
          </Button>

          <div className="space-y-4 pt-12 border-t border-white/5">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest max-w-md mx-auto">
              Closing a flat, villa, or office? Items that can't be taken can be cleared as part of the move-out process.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}