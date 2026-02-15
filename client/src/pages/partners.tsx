import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  HelpCircle,
  DollarSign
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { TrustStrip, PartnerStrip, OperationalBadges } from "@/components/trust-strip";

export default function PartnersPage() {
  const [location] = useLocation();
  const [refName, setRefName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setRefName(ref);
    }
  }, [location]);

  const whatsappNumber = "+971523946311";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}`;

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Broker Partner Program | Earn Commission on Every Move-In"
        description="Turn every rental into additional revenue. DeliWer handles Ejari, DEWA, and move-in for your clients while you earn 10% commission."
      />

      {/* Micro Trust Line */}
      <section className="px-4 py-3 border-b border-white/10 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {refName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 inline-block"
            >
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-sm font-bold animate-pulse">
                WELCOME PARTNER: {refName.toUpperCase()}
              </Badge>
            </motion.div>
          )}
          
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 font-black uppercase tracking-widest">
            BROKER DOMINATION MODE
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight drop-shadow-2xl">
            Earn Commission <br />
            <span className="text-emerald-500 underline decoration-emerald-500/20">on Every Move-In</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Turn every rental into additional revenue — without doing extra work.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-lg shadow-xl w-full sm:w-auto active-elevate-2 flex gap-3"
              onClick={() => window.open(`${whatsappLink}?text=Hi%20DeliWer,%20I’m%20a%20real%20estate%20broker%20in%20Dubai%20and%20want%20to%20join%20the%20partner%20program.`, '_blank')}
            >
              <SiWhatsapp className="w-6 h-6" />
              Join via WhatsApp
            </Button>
            <div className="text-sm font-medium text-gray-300">
              {whatsappNumber} | <a href="https://instagram.com/vdeliwer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">@vdeliwer</a>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-24 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter">The Opportunity</h2>
            <p className="text-xl text-emerald-400 font-bold italic">Every tenant needs:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                {["Ejari registration", "DEWA activation", "Move-in coordination", "Documentation handling"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="font-bold uppercase tracking-widest text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 font-medium leading-relaxed">Most brokers stop at contract signing. DeliWer handles everything after — and shares the upside.</p>
            </div>
            <Card className="bg-emerald-500/10 border-emerald-500/30 rounded-[2rem] p-8 text-center">
              <CardContent className="p-0 space-y-4">
                <DollarSign className="w-16 h-16 text-emerald-500 mx-auto drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                <p className="text-2xl font-black text-emerald-400 uppercase tracking-tighter italic">No operational burden.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-24 px-4 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">💰 How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "You Close the Lease", desc: "You introduce DeliWer to the tenant." },
              { step: "2", title: "We Handle Everything", desc: "We manage post-lease processes efficiently." },
              { step: "3", title: "You Earn Commission", desc: "Simple percentage per completed service." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group">
                <div className="h-20 w-20 rounded-2xl bg-emerald-500 text-black flex items-center justify-center font-black text-4xl shadow-xl group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-lg uppercase tracking-widest">{step.title}</h3>
                  <p className="text-sm text-gray-400 font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Brokers Join */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-16">Why Brokers Join</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Increases client satisfaction",
              "Adds post-closing value",
              "Builds repeat referrals",
              "Creates additional revenue stream",
              "Zero operational overhead"
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-emerald-500/50 transition-colors rounded-[1.5rem] group">
                <CardContent className="py-10 px-6 flex flex-col items-center text-center gap-4">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  <h3 className="font-black text-sm uppercase tracking-widest leading-tight">{item}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who It’s For */}
      <section className="py-24 px-4 bg-black/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Who It’s For</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Rental-focused brokers",
              "Marina / Downtown / JVC specialists",
              "Boutique agencies",
              "High-volume agents",
              "Founder relocation agents"
            ].map((tag, i) => (
              <Badge key={i} className="bg-white/5 text-gray-300 border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto space-y-12 text-center">
          <HelpCircle className="w-16 h-16 text-blue-500 mx-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h2 className="text-3xl font-black uppercase tracking-tighter">FAQ Section</h2>
          <div className="grid gap-6 text-left">
            {[
              { q: "Do I need to manage paperwork?", a: "No. We handle the process end-to-end." },
              { q: "Is there a minimum volume?", a: "No. Start with one tenant." },
              { q: "How are commissions paid?", a: "Per completed service cycle." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="font-black text-emerald-400 mb-2 uppercase text-xs tracking-widest">{faq.q}</h4>
                <p className="text-gray-400 text-sm font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-emerald-950/20 border-t border-emerald-500/20">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Ready to Add a Revenue Stream?</h2>
          <p className="text-lg text-gray-300 font-medium tracking-wide italic">Join the DeliWer Partner Program today.</p>
          <Button 
            size="lg" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-20 text-xl shadow-2xl active-elevate-2 flex gap-4"
            onClick={() => window.open(`${whatsappLink}?text=Hi%20DeliWer,%20I’m%20a%20real%20estate%20broker%20in%20Dubai%20and%20want%20to%20join%20the%20partner%20program.`, '_blank')}
          >
            <SiWhatsapp className="w-8 h-8" />
            Join via WhatsApp →
          </Button>
        </div>
      </section>

      {/* Endorsement Strip */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </section>

      <footer className="py-20 px-4 border-t border-white/5 text-center bg-slate-950/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <OperationalBadges variant="dark" />
          <p className="text-gray-500 text-xs italic max-w-xl mx-auto">
            DeliWer is an operational back-office for Dubai residents and brokers, focused on relocation, settlement, and daily living journeys.
          </p>
        </div>
      </footer>
    </div>
  );
}
