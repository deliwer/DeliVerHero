import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin, Plane, Home, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { useEffect } from "react";

export default function MoveToDubai() {
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
    const message = `Hello DeliWer,\n\nI'm planning to move to Dubai. I need a complete move-in setup.\n\nReferral Partner: ${referral.partner || 'Direct'}\n\nPlease help me.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Moving to Dubai | Complete Move-In Checklist | DeliWer"
        description="Plan your move to Dubai. DeliWer handles Ejari, DEWA, water setup, and home readiness. Your complete move-in solution."
      />
      <Navigation />

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
              Moving to <span className="text-emerald-500">Dubai?</span>
            </h1>

            <p className="text-2xl text-gray-300 font-bold max-w-3xl mx-auto">
              Your complete move-in checklist in one solution.
            </p>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Plane, title: "Pre-Arrival", desc: "Plan & prepare" },
                { icon: Home, title: "Activation", desc: "Ejari & DEWA" },
                { icon: CheckCircle2, title: "Move-In Ready", desc: "Home ready" }
              ].map((step, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <step.icon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-black text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl"
              onClick={handleWhatsApp}
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Start Move-In Planning
            </Button>

            <p className="text-sm text-gray-400">WhatsApp consultation • AED 399 Move-In Concierge</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Move-In Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Secure Tenancy Contract",
              "Book Move-In Concierge",
              "Register with Ejari",
              "Activate DEWA electricity",
              "Connect water supply",
              "Test AC & cooling",
              "Internet installation",
              "Furniture delivery"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
