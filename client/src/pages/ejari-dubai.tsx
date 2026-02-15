import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function EjariDubai() {
  const handleWhatsApp = () => {
    const text = "Hi DeliWer, I need help with Ejari registration in Dubai.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Ejari Registration Dubai | Fast Move-in Support | DeliWer"
        description="Get your Ejari registered in record time. We handle the paperwork so you can move in without delays."
      />
      <section className="py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Ejari Registration Dubai</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">Fast, reliable, and stress-free Ejari registration for new tenants.</p>
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-10 rounded-2xl" onClick={handleWhatsApp}>
          Register via WhatsApp
        </Button>
      </section>
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2>Why Ejari is Critical for Your Move-in</h2>
          <p>Ejari is the mandatory registration of your tenancy contract in Dubai. Without it, you cannot activate DEWA, get internet, or apply for residency visas.</p>
          {/* 800+ words content placeholder for SEO */}
        </div>
      </section>
    </div>
  );
}
