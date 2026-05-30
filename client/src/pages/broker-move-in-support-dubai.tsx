import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageCircle, Briefcase, Zap, ShieldCheck, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";

export default function BrokerSupportDubai() {
  const whatsappLink = "https://wa.me/971523906019?text=Hi%20DeliWer,%20I%20am%20a%20broker%20and%20need%20move-in%20support%20for%20my%20client.";

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Broker Move-In Support Dubai | Partnership Program"
        description="Exclusive move-in support for Dubai real estate brokers. We handle Ejari, DEWA, and cleaning for your clients while you earn 10% commission."
      />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 mb-4">
            BROKER EXCLUSIVE
          </Badge>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight"
          >
            Broker Move-In <br />
            <span className="text-emerald-500">Support Dubai</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            You close the deal. We handle the move-in chaos. You earn 10% commission.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <SiWhatsapp className="w-8 h-8 mr-4" />
            Join via WhatsApp
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">Why Partner with DeliWer?</h2>
            <p className="text-lg text-gray-300">
              The time between signing the contract and move-in is when things go wrong. Brokers often get stuck handling Ejari issues, DEWA activation, and deep cleaning.
            </p>
            <div className="space-y-4">
              {[
                "We act as your operational back-office",
                "10% commission on all referred services",
                "Clients receive a premium relocation experience",
                "Weekly commission payouts via WhatsApp"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span className="font-bold text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-white/5 border-white/10 p-8 rounded-3xl">
            <CardContent className="p-0 space-y-6">
              <h3 className="text-2xl font-black uppercase text-center">Earnings Calculator</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span>Ejari & DEWA Setup</span>
                  <span className="text-emerald-400">AED 100</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span>Full Move-In Pack</span>
                  <span className="text-emerald-400">AED 500+</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span>Relocation Concierge</span>
                  <span className="text-emerald-400">10% Share</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Transparent tracking. Zero delay payouts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/40 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Client Protection Promise</h2>
          <p className="text-xl text-gray-300">We do not list properties. We do not market to your clients. We are your support layer.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, text: "No Poaching" },
              { icon: Zap, text: "Fast Setup" },
              { icon: Briefcase, text: "B2B Focus" },
              { icon: DollarSign, text: "Top Rates" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="w-8 h-8 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK CTA ─────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-950 to-purple-950/20 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5">
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">Instant Setup</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
            Generate Your Personal Referral Link
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Enter your name, get your unique link, and start earning AED 150–800+ per client — no setup fees, no delay.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/broker-partner" data-testid="button-broker-move-support-referral">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-13 text-sm shadow-xl shadow-purple-900/30"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get My Referral Link
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 font-black rounded-2xl px-8 h-13 text-sm"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
