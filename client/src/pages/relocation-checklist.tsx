import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, FileText, ListChecks, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function RelocationChecklist() {
  const whatsappLink = "https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20need%20the%20Dubai%20Relocation%20Checklist.";

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Dubai Relocation Checklist 2026 | Ultimate Guide"
        description="The ultimate 2026 Dubai relocation checklist. Everything you need to know about Ejari, DEWA, move-in permits, and settling into your new home."
      />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight"
          >
            Dubai Relocation <br />
            <span className="text-emerald-500">Checklist 2026</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Moving to Dubai? Don't miss a step. This is the definitive guide to getting settled without the stress.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="prose prose-invert max-w-none space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500 flex items-center gap-3">
              <Calendar className="w-8 h-8" /> Phase 1: Pre-Arrival
            </h2>
            <ul className="space-y-4 list-none p-0">
              {[
                "Secure your residency visa or work permit",
                "Gather all attested documents (Marriage/Birth certificates)",
                "Research residential areas (Marina, Downtown, JVC)",
                "Set up a local bank account (can often be started remotely)"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="font-bold text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-600/10 p-8 rounded-3xl border border-emerald-500/20 text-center space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">Need a Personalized Checklist?</h3>
            <p className="text-gray-300">Message our concierge for a custom roadmap based on your family size and area.</p>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-14 px-8"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Get Custom Checklist via WhatsApp
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500 flex items-center gap-3">
              <FileText className="w-8 h-8" /> Phase 2: Post-Keys (The Chaos Phase)
            </h2>
            <p className="text-lg text-gray-300">Once you have your keys, the real work starts. This is where most expats get overwhelmed.</p>
            <ul className="space-y-4 list-none p-0">
              {[
                "Register your tenancy with Ejari (Dubai Land Department)",
                "Activate DEWA (Electricity & Water)",
                "Apply for Move-In Permits from building management",
                "Set up Home Insurance",
                "Coordinate internet and TV installation (Etisalat/du)"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="font-bold text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500 flex items-center gap-3">
              <ListChecks className="w-8 h-8" /> Phase 3: Settling In
            </h2>
            <ul className="space-y-4 list-none p-0">
              {[
                "Furniture delivery and assembly",
                "Deep cleaning and pest control before move-in",
                "AC duct cleaning (Highly recommended in Dubai)",
                "Registering with local district cooling (if applicable)"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="font-bold text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <Button 
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
          onClick={() => window.open(whatsappLink, '_blank')}
        >
          <MessageCircle className="w-8 h-8 mr-4 fill-current" />
          WhatsApp Support 24/7
        </Button>
      </section>
    </div>
  );
}
