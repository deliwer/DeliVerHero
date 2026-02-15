import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, MapPin, Compass, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SettlingInDubaiGuide() {
  const whatsappLink = "https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20just%20arrived%20in%20Dubai%20and%20need%20help%20settling%20in.";

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Settling in Dubai Guide | Expat Living 2026"
        description="The ultimate guide to settling in Dubai. Learn about the best neighborhoods, essential services, and how to navigate life as a new expat."
      />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight"
          >
            Settling In <br />
            <span className="text-emerald-500">Dubai Guide</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Welcome to the city of the future. Here is everything you need to know about making Dubai your home.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <MessageCircle className="w-8 h-8 mr-4 fill-current" />
            Get Local Advice
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto space-y-12">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">Choosing Your Neighborhood</h2>
          <p className="text-lg text-gray-300">
            Dubai is a collection of distinct hubs. Your choice depends on your lifestyle:
          </p>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-white/5 border-white/10 p-6 rounded-2xl">
              <h3 className="font-black text-emerald-400 uppercase flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Dubai Marina
              </h3>
              <p className="text-gray-400 text-sm">Perfect for high-rise living and beach access. Ideal for singles and young couples.</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6 rounded-2xl">
              <h3 className="font-black text-emerald-400 uppercase flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Jumeirah Village Circle (JVC)
              </h3>
              <p className="text-gray-400 text-sm">Family-friendly, community feel, and more value for space. Great for young families.</p>
            </Card>
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">Essential Services Setup</h2>
          <p className="text-lg text-gray-300">
            Navigating the administrative landscape is the first challenge. You'll need to coordinate:
          </p>
          <ul className="space-y-4">
            {[
              "Emirates ID application and biometric registration",
              "Opening a local bank account (HSBC, Emirates NBD, etc.)",
              "Registering for a local SIM card (du, Etisalat, or Virgin)",
              "Converting your home country driving license"
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <span className="font-bold text-gray-200">{item}</span>
              </li>
            ))}
          </ul>

          <div className="my-12 p-8 bg-emerald-600/10 border border-emerald-500/20 rounded-3xl text-center">
            <h3 className="text-2xl font-black uppercase mb-4">Feeling Overwhelmed?</h3>
            <p className="text-gray-300 mb-6">Our concierge can handle the paperwork while you explore the city.</p>
            <Button onClick={() => window.open(whatsappLink, '_blank')} className="bg-emerald-600 font-black px-8 rounded-xl h-14">
              Book a Setup Session
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Expat FAQ</h2>
          <div className="grid gap-6 text-left">
            {[
              { q: "Is Dubai expensive?", a: "It can be, but there are options for every budget. Housing and schooling are the largest expenses." },
              { q: "Do I need to speak Arabic?", a: "English is the primary language for business and daily life in Dubai." },
              { q: "How do I find a community?", a: "Join local interest groups on Facebook or attend networking events in hubs like DIFC." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="font-black text-emerald-400 mb-2 uppercase text-sm">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
