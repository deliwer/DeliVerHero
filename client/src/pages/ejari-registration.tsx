import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle, CheckCircle2, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { useEffect } from "react";

export default function EjariRegistration() {
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
    const message = `Hello DeliWer,\n\nI need help with Ejari Registration.\n\nReferral Partner: ${referral.partner || 'Direct'}\n\nPlease assist me.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Ejari Registration Dubai | Online Registration Help | DeliWer"
        description="Need help with Ejari registration in Dubai? DeliWer coordinates your registration through official channels. Quick, compliant, stress-free."
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
              Ejari <span className="text-emerald-500">Registration in Dubai</span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <AlertCircle className="w-7 h-7 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xl font-black text-white">
                    Without Ejari you cannot activate DEWA.
                  </p>
                  <p className="text-lg text-red-400 font-black">
                    Without DEWA you cannot move in.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                <p className="text-2xl font-black text-white">
                  DeliWer AquaCafe Move-In Welcome Service handles the <span className="text-emerald-400">entire activation process.</span>
                </p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl"
              onClick={handleWhatsApp}
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Start Ejari Registration
            </Button>

            <p className="text-sm text-gray-400">Response within 10 minutes • WhatsApp coordination</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">What We Handle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Document organization & verification",
              "Trustee center submission coordination",
              "Official RERA approval handling",
              "Ejari certificate collection",
              "DEWA pre-activation",
              "WhatsApp-based communication"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broker CTA Strip */}
      <section className="py-10 px-4 bg-purple-950/20 border-t border-purple-500/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0">
              <Handshake className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-black text-sm uppercase tracking-tight">Are you a real estate broker?</p>
              <p className="text-gray-500 text-xs">Refer clients after Ejari signing. Earn AED 300–800 per move-in — free to join, instant link.</p>
            </div>
          </div>
          <Link href="/broker-onboard" data-testid="button-ejari-reg-broker-cta">
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-6 h-10 text-xs shrink-0"
            >
              Get My Referral Link →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
