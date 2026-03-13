import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, Home, Wrench, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function MoveInServices() {
  const whatsappLink = "https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20need%20move-in%20services%20support.";

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Move-In Services Dubai | Home Setup Concierge"
        description="Professional move-in services in Dubai. We handle Ejari, DEWA, cleaning, maintenance, and furniture assembly while you settle in."
      />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight"
          >
            Dubai Move-In <br />
            <span className="text-emerald-500">Services</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            From the keys to the coffee machine. We manage the entire home setup process.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Administrative Setup", 
              icon: Shield,
              items: ["Ejari Registration", "DEWA Activation", "Building Permits", "District Cooling"]
            },
            { 
              title: "Home Readiness", 
              icon: Wrench,
              items: ["Deep Cleaning", "AC Sanitization", "Pest Control", "Minor Maintenance"]
            },
            { 
              title: "Settling Logistics", 
              icon: Home,
              items: ["Furniture Assembly", "Curtain Hanging", "Internet Setup", "Pantry Stocking"]
            }
          ].map((cat, i) => (
            <Card key={i} className="bg-white/5 border-white/10 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex gap-3 items-center text-gray-400 font-bold text-sm uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-black/40 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter">One Point of Contact</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Stop juggling ten different contractors. Our AquaCafe Move-In Welcome Service manages all vendors via a single WhatsApp group, ensuring your home is ready when you arrive.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            Get a Quote via WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
