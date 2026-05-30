import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  FileText,
  Key
} from "lucide-react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { PartnerStrip } from "@/components/trust-strip";

export default function ActivatePage() {
  const WHATSAPP_LINK = "https://wa.me/971523906019?text=Hi,%20I%20just%20signed%20a%20lease%20and%20want%20my%20apartment%20activated.";

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Just Signed Lease Dubai? Activate Apartment Fast | DeliWer"
        description="Just signed your Dubai lease? Activate your apartment without running between offices. Ejari registration, DEWA activation, and move-in readiness - AED 399."
      />
      <Navigation />
      
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-tight">
              Just Signed a Lease in Dubai? <br />
              <span className="text-emerald-500 text-5xl md:text-7xl">Activate Without Running Around</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold max-w-2xl mx-auto uppercase">
              Tenancy registration (Ejari), utilities activation (DEWA), and move-in readiness — all without leaving your apartment.
            </p>
          </motion.div>

          <div className="flex justify-center pt-8">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all active-elevate-2 group"
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            >
              <MessageCircle className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
              Activate Apartment
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-950/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Tenancy Registration", icon: FileText, desc: "Fast-track Ejari coordination with RERA approved centers." },
              { title: "Utility Activation", icon: Zap, desc: "DEWA and Empower/Chiller activation handled immediately." },
              { title: "Move-In Readiness", icon: CheckCircle2, desc: "Water readiness check and shower filter installation." }
            ].map((step, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-8 rounded-3xl space-y-4 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">{step.title}</h3>
                <p className="text-gray-400 font-medium text-sm">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-xs font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">Fixed Price</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">AquaCafe Move-In Welcome Service</h2>
          <p className="text-emerald-400 font-black text-2xl">Move-In Coordination Package – <span className="text-emerald-500">AED 399</span></p>
          <p className="text-gray-300 font-bold uppercase tracking-wide">Complete technical home activation for new tenants.</p>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 inline-block text-left">
            <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-sm mb-2">
              <Key className="w-5 h-5" />
              Perfect for Brokers & Property Managers
            </div>
            <p className="text-gray-400 text-xs font-medium max-w-xs">Recommend this to your tenants after they sign. DeliWer handles all technical activation while you focus on the next client.</p>
          </div>
          <Button 
            size="lg" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-20 text-2xl uppercase tracking-widest shadow-2xl"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            Start Activation Now
          </Button>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Response within 10 minutes</p>
        </div>
      </section>

      <PartnerStrip />
    </div>
  );
}
