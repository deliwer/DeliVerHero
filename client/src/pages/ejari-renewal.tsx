import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle, CheckCircle2, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { useEffect } from "react";

export default function EjariRenewal() {
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
    const message = `Hello DeliWer,\n\nI need help with Ejari Renewal.\n\nReferral Partner: ${referral.partner || 'Direct'}\n\nPlease assist me.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta
        title="Ejari Renewal Dubai | Renew Tenancy Contract Fast | DeliWer"
        description="Ejari must be renewed every year your Dubai tenancy contract is renewed. DeliWer coordinates the renewal through RERA-authorized Trustee Centers — documents checked, submitted, and delivered. No queue, no hassle."
        canonical="https://www.deliwer.com/ejari-renewal"
        keywords="Ejari renewal Dubai, renew Ejari Dubai, Ejari expired Dubai, Ejari renewal fee, tenancy renewal Dubai, RERA contract renewal Dubai, how to renew Ejari Dubai, Ejari renewal documents, DeliWer Ejari renewal"
        webPageType="ServicePage"
        breadcrumbs={[{ name: "Ejari Renewal", url: "/ejari-renewal" }]}
        faqs={[
          { question: "When must I renew my Ejari in Dubai?", answer: "Ejari must be renewed whenever your tenancy contract is renewed, typically annually. You should initiate renewal within 30 days of signing the new contract to avoid DEWA-related complications." },
          { question: "What documents do I need to renew Ejari?", answer: "You need the renewed tenancy contract, your Emirates ID, the landlord's Emirates ID or passport, and the original or previous Ejari certificate. DeliWer will verify your documents before submission." },
          { question: "How much does Ejari renewal cost in Dubai?", answer: "The RERA Ejari renewal fee is AED 220 (including VAT), the same as the initial registration fee. DeliWer's coordination service is charged separately — message us on WhatsApp for pricing." },
          { question: "What happens if I don't renew my Ejari on time?", answer: "An expired Ejari can cause issues with DEWA, prevent you from obtaining new utility connections, and may complicate visa renewals. Renewing promptly after signing a new contract is strongly advised." },
        ]}
        serviceSchema={{ name: "Ejari Renewal Dubai", description: "DeliWer coordinates annual Ejari renewal for Dubai tenants through RERA-authorized Trustee Centers. Documents verified, submitted, and the updated Ejari certificate delivered digitally.", price: "AED 220" }}
      />
      <Navigation />

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
              Ejari <span className="text-purple-400">Renewal</span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <AlertCircle className="w-7 h-7 text-red-500 flex-shrink-0" />
                <p className="text-xl font-black text-white">
                  Your Ejari expires in 12 months. Don't wait until the last minute.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                <p className="text-2xl font-black text-white">
                  We renew it before it expires. <span className="text-emerald-400">Stress-free.</span>
                </p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl"
              onClick={handleWhatsApp}
            >
              <RotateCw className="w-6 h-6 mr-3" />
              Renew My Ejari
            </Button>

            <p className="text-sm text-gray-400">WhatsApp coordination • Official process</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
