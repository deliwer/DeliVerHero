import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, ArrowRight, Zap, Shield, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RelocationForFounders() {
  const whatsappLink = "https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20am%20a%20founder%20relocating%20to%20Dubai%20and%20need%20concierge%20support.";

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Relocation to Dubai for Founders | Concierge Support"
        description="High-level relocation concierge for founders moving to Dubai. We handle Ejari, DEWA, move-in packs, and business setup coordination."
      />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight"
          >
            Relocation to Dubai <br />
            <span className="text-emerald-500">for Founders</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            You focus on your business. We handle the 1,000 small tasks that come with moving to Dubai.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <MessageCircle className="w-8 h-8 mr-4 fill-current" />
            Start Your Relocation
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto space-y-12">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">The Founder's Relocation Problem</h2>
          <p className="text-lg text-gray-300">
            Moving a business and a life to Dubai simultaneously is a recipe for operational burnout. Between Ejari registration, DEWA activation, selecting the right move-in packages, and navigating local compliance, the "administrative friction" can stall your company's growth for months.
          </p>
          
          <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">Why DeliWer?</h2>
          <p className="text-lg text-gray-300">
            DeliWer isn't just a service provider; we are your operational back-office in Dubai. We sit on top of the vendors, contractors, and government portals to ensure your transition is seamless.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            {[
              { title: "Ejari & Utilities", desc: "Fast-tracked registration and activation." },
              { title: "Move-In Packs", desc: "Curated furniture and essential kits delivered." },
              { title: "Business Setup", desc: "Coordination with top licensing experts." },
              { title: "Personal Concierge", desc: "A dedicated point of contact on WhatsApp." }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-2xl p-6">
                <CardContent className="p-0 space-y-2">
                  <h3 className="font-black text-emerald-400 uppercase">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">The Roadmap to Dubai</h2>
          <p className="text-lg text-gray-300">
            Our founder-specific relocation checklist ensures you miss nothing:
          </p>
          <ul className="space-y-4">
            {[
              "Strategic area selection based on business requirements",
              "Ejari registration and move-in permit management",
              "Home setup (Curtains, AC, Deep Cleaning, Furniture)",
              "Nanny and staff recruitment coordination",
              "Schooling and family logistics support"
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <span className="font-bold text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <HelpCircle className="w-16 h-16 text-blue-500 mx-auto" />
          <h2 className="text-4xl font-black uppercase tracking-tighter">Founder FAQ</h2>
          <div className="grid gap-6 text-left">
            {[
              { q: "How fast can you set up my home?", a: "Typically within 48-72 hours of receiving keys." },
              { q: "Do you handle business licensing?", a: "We coordinate with vetted legal partners to ensure you get the right advice." },
              { q: "Can I manage everything via WhatsApp?", a: "Yes, you'll have a dedicated concierge group for all requests." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="font-black text-emerald-400 mb-2 uppercase text-sm">{faq.q}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <Button 
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
          onClick={() => window.open(whatsappLink, '_blank')}
        >
          Book Your Founder Relocation
        </Button>
      </section>
    </div>
  );
}
