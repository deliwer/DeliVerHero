import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { useEffect } from "react";

export default function DewaActivation() {
  const [location] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referral = {
      partner: params.get("ref"),
      agent: params.get("agent"),
      campaign: params.get("campaign"),
      timestamp: new Date().toISOString()
    };
    if(referral.partner && !localStorage.getItem("deliwer_ref")){
      localStorage.setItem("deliwer_ref", JSON.stringify(referral));
    }
  }, [location]);

  const handleWhatsApp = () => {
    const referralData = localStorage.getItem("deliwer_ref");
    const referral = referralData ? JSON.parse(referralData) : {};
    const message = `Hello DeliWer,\n\nI need help with DEWA activation.\n\nReferral Partner: ${referral.partner || 'Direct'}\n\nPlease assist me.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="DEWA Activation Dubai | Electricity Setup | DeliWer"
        description="Get DEWA electricity activated quickly. DeliWer coordinates meter registration and setup. AED 399 included in AquaCafe Move-In Welcome Service."
      />
      <Navigation />

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
              DEWA <span className="text-yellow-400">Activation</span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-start gap-4 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-lg font-black text-white mb-2">
                    No DEWA = No Electricity
                  </p>
                  <p className="text-gray-300">
                    DEWA activation can take days if you handle it alone. We coordinate the entire process.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-start gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xl font-black text-white mb-2">
                    Electricity Ready Before You Arrive
                  </p>
                  <p className="text-gray-300 text-lg">
                    DeliWer handles meter registration, connection, and testing. Just move in.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-yellow-600 hover:bg-yellow-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl"
              onClick={handleWhatsApp}
            >
              <Zap className="w-6 h-6 mr-3" />
              Activate DEWA Now
            </Button>

            <p className="text-sm text-gray-400">Part of AquaCafe Move-In Welcome Service (AED 399)</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">DEWA Setup Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Meter Verify", desc: "Check building meter" },
              { num: "2", title: "Docs Submit", desc: "Prepare Ejari & ID" },
              { num: "3", title: "DEWA Register", desc: "Official connection" },
              { num: "4", title: "Testing", desc: "Verify everything" }
            ].map((step) => (
              <div key={step.num} className="text-center bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-black text-yellow-500 mb-2">{step.num}</div>
                <h3 className="font-black text-white mb-1">{step.title}</h3>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
