import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { useEffect } from "react";

export default function MarinaGateMoveIn() {
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
    const message = `Hello DeliWer,\n\nI'm moving into Marina Gate and need move-in activation.\n\nReferral Partner: ${referral.partner || 'Direct'}\n\nPlease assist me.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Moving into Marina Gate Dubai | Move-In Services | DeliWer"
        description="Moving into Marina Gate? DeliWer activates your apartment in hours. Ejari, DEWA, water setup before your arrival. AED 399."
      />
      <Navigation />

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 w-fit mx-auto">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="font-black uppercase text-xs text-blue-400">Marina Gate Specialists</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
              Moving into <span className="text-blue-400">Marina Gate?</span>
            </h1>

            <p className="text-2xl text-gray-300 font-bold max-w-3xl mx-auto">
              Activate your apartment before your first night.
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-start gap-4 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-lg font-black text-white mb-2">
                    First Night Without Water?
                  </p>
                  <p className="text-gray-300">
                    Marina Gate moves happen fast. DeliWer ensures everything is ready when you arrive.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xl font-black text-white mb-2">
                    Same-Day Activation
                  </p>
                  <p className="text-gray-300">
                    Ejari → DEWA → Water → Home Ready. All handled by our team.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl"
              onClick={handleWhatsApp}
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Activate My Marina Gate Unit
            </Button>

            <p className="text-sm text-gray-400">AED 399 • Same-day coordination • WhatsApp support</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Marina Gate Move-In Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Book", desc: "Contact us via WhatsApp" },
              { num: "2", title: "Assess", desc: "We inspect your unit" },
              { num: "3", title: "Activate", desc: "Ejari + DEWA + Water" },
              { num: "4", title: "Ready", desc: "Welcome home!" }
            ].map((step) => (
              <div key={step.num} className="text-center bg-slate-900 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-black text-blue-500 mb-2">{step.num}</div>
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
