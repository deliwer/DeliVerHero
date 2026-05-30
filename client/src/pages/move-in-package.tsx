import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, MessageSquare, ArrowRight, Home, ShieldCheck, Clock, MapPin, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import { SEOMeta } from "@/components/seo-meta";

const WHATSAPP_NUMBER = "+971523906019";
const getWhatsAppLink = (service: string) => {
  const text = `Hi, I'm interested in the Move-In Package regarding: ${service}`;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
};

export default function MoveInPackagePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <SEOMeta
        title="Move-In Package Dubai | Home Setup & Activation | DeliWer"
        description="Get your Dubai apartment fully ready before you unpack. DeliWer's move-in package covers AC servicing, water filtration, deep cleaning, DEWA activation, and internet setup — coordinated end-to-end via WhatsApp."
        canonical="https://www.deliwer.com/move-in-package"
        keywords="move in package Dubai, apartment setup Dubai, home setup Dubai, DEWA setup Dubai, AC service Dubai, water filter Dubai, deep cleaning Dubai, apartment activation Dubai, DeliWer move-in package, home ready Dubai"
        webPageType="ServicePage"
        breadcrumbs={[{ name: "Move-In Package", url: "/move-in-package" }]}
        faqs={[
          { question: "What is included in DeliWer's move-in package?", answer: "DeliWer's move-in package covers DEWA electricity and water activation, AC servicing and filter cleaning, water filtration system installation, professional deep cleaning, internet setup coordination, and optional assembly services." },
          { question: "How soon can my apartment be ready after I get the keys?", answer: "Most move-in setups are completed within 2–4 business days of key collection, depending on DEWA processing time. AC and cleaning services can often be arranged same-day or next-day." },
          { question: "Do you offer move-in packages for furnished apartments?", answer: "Yes — DeliWer's move-in package works for both furnished and unfurnished apartments. For furnished units we focus on cleaning, AC service, and utility activation. For unfurnished units we can include assembly and water filtration installation." },
          { question: "Can I book a move-in package for a specific Dubai area?", answer: "DeliWer covers all major Dubai areas including JVC, Dubai Marina, Business Bay, Downtown, Al Barsha, Al Nahda, Deira, JLT, Dubai Hills, Palm Jumeirah, and more." },
        ]}
        serviceSchema={{ name: "Dubai Move-In Package", description: "DeliWer's move-in package covers DEWA activation, AC servicing, water filtration, deep cleaning, and internet setup for new Dubai apartments. Coordinated via WhatsApp.", price: "AED 320" }}
      />

      <section className="px-4 py-3 border-b border-white/10 bg-black/40 sticky top-0 z-[60] backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Your Home Fully Ready — <span className="text-emerald-500">Before You Unpack</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-bold max-w-2xl mx-auto">
              Move-In setup, AC, water, essentials, and minor fixes coordinated end-to-end.
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider rounded-xl h-20 px-12 text-xl shadow-2xl shadow-emerald-900/40 w-full md:w-auto flex gap-3"
              onClick={() => window.open(getWhatsAppLink("Move-In Assessment"), '_blank')}
            >
              Book Move-In Assessment <ArrowRight className="w-6 h-6" />
            </Button>
            <Link href="/relocate#move-in-packs">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest h-20 px-12 rounded-xl w-full md:w-auto"
              >
                View Package Details
              </Button>
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-emerald-500/60 text-xs font-black uppercase tracking-widest italic"
          >
            Assessment within 24 hours
          </motion.p>
        </div>
      </section>

      <section id="move-in-packs" className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">Package Features</h2>
            <div className="space-y-4">
              {[
                "AC inspection & basic servicing",
                "Water setup / filter installation",
                "Home essentials starter pack",
                "Minor fixes & coordination",
                "One point of contact — no chasing vendors"
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 items-center group hover:border-emerald-500/30 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="font-bold text-gray-200">{feature}</span>
                  <div className="ml-auto px-2 py-1 bg-white/5 rounded text-[8px] font-black uppercase text-gray-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Apt & Villa
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-slate-900 border-emerald-500/20 rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-10 space-y-8">
              <h3 className="text-xl font-black uppercase tracking-tight text-white border-b border-white/5 pb-4 text-center">Operational Proof</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-black text-white uppercase text-sm">Assessment</p>
                    <p className="text-gray-400 text-xs font-medium">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-black text-white uppercase text-sm">Setup Timeline</p>
                    <p className="text-gray-400 text-xs font-medium">Completed in 1–2 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-black text-white uppercase text-sm">Service Area</p>
                    <p className="text-gray-400 text-xs font-medium">Apartments & villas across Dubai</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-24 border-t border-white/5 bg-slate-900/30">
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

      <section className="px-4 py-24 bg-emerald-950/20 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tight">Need international relocation or visa support?</h3>
          <Link href="/relocate">
            <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 font-black uppercase h-14 px-10 rounded-xl">
              Relocation & Visa Support →
            </Button>
          </Link>
          <div className="pt-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
            WhatsApp Contact: +971 52 390 6019
          </div>
        </div>
      </section>
    </div>
  );
}
