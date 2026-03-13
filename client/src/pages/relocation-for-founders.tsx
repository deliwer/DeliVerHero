import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RelocationForFounders() {
  const handleWhatsApp = () => {
    const text = "Hi DeliWer, I'm a founder relocating to Dubai and need AquaCafe Move-In Welcome support.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="Relocation to Dubai for Founders | Post-Lease Concierge | DeliWer"
        description="The ultimate AquaCafe Move-In Welcome Service for tech founders relocating to Dubai. We handle Ejari, DEWA, and home setup while you build your startup."
      />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight"
          >
            Relocation to Dubai <br />
            <span className="text-emerald-500">For Tech Founders</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            You build the startup. We build the home. The only post-lease concierge designed for the speed of founders.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 font-black h-20 px-12 rounded-2xl text-xl shadow-2xl active-elevate-2 flex gap-3 mx-auto"
            onClick={handleWhatsApp}
          >
            <MessageSquare className="w-6 h-6 fill-current" />
            Start via WhatsApp
          </Button>
        </div>
      </section>

      {/* Core Content */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert lg:prose-xl">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-emerald-400">The Founder's Relocation Problem</h2>
          <p>
            Moving to Dubai as a founder isn't just about the Golden Visa. It's about the 2 weeks of administrative chaos that follows lease signing. Ejari, DEWA, Empower, internet installation, and furniture coordination can consume 50+ hours of your time—time that should be spent on customer acquisition and product development.
          </p>
          
          <h3 className="text-2xl font-bold">DeliWer is your Operational Back-Office</h3>
          <p>
            We don't just "help" with the move. We own the process. Once you sign your lease, you hand the keys (metaphorically or literally) to your DeliWer concierge. We coordinate every vendor via a single WhatsApp group.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            {[
              "0-Capital Setup Advice",
              "Ejari & DEWA in 24h",
              "Founder-Grade Home Office Setup",
              "Concierge-Level Troubleshooting"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <span className="font-bold uppercase tracking-widest text-sm">{item}</span>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tighter text-emerald-400">WhatsApp-First Execution</h2>
          <p>
            No dashboards. No complex forms. Everything happens on WhatsApp. Your dedicated DeliWer associate handles the friction of Dubai bureaucracy while you focus on your mission.
          </p>
          
          <div className="mt-12 text-center not-prose">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-10 rounded-2xl w-full md:w-auto"
              onClick={handleWhatsApp}
            >
              Consult a Relocation Expert
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12">Founder FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "How fast can you set up a home?", a: "Typically 48-72 hours from lease signing to fully functional living space." },
              { q: "Do you handle business setup?", a: "We focus on the living journey. We refer you to our vetted partners for licensing." },
              { q: "Cost?", a: "Transparent concierge fees based on the complexity of your home setup." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h4 className="font-black text-emerald-400 mb-2 uppercase text-xs tracking-widest">{faq.q}</h4>
                <p className="text-gray-400 font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
