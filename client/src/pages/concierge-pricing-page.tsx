import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { ConciergePricing } from "@/components/concierge-pricing";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function ConciergePricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Concierge Pricing | Move-In Coordination Plans | DeliWer Dubai"
        description="Transparent, flat-fee concierge pricing for Dubai move-in coordination. Ejari registration, DEWA activation, movers, cleaning — see all plans and what's included."
      />
      <Navigation />

      <section className="pt-32 pb-6 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Plans & Pricing</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Transparent Concierge<br />
            <span className="text-emerald-400">Pricing for Dubai Moves</span>
          </h1>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            Choose the coordination level that fits your move. All plans include a dedicated coordinator. You pay vendors directly at market rates — no hidden fees.
          </p>
        </div>
      </section>

      <ConciergePricing category="move" />

      <section className="py-12 px-4 border-t border-white/5 text-center space-y-4">
        <p className="text-gray-500 text-sm font-medium">Not sure which plan? Start with a WhatsApp message and we'll guide you.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20to%20discuss%20the%20concierge%20pricing%20options." target="_blank" rel="noopener noreferrer">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-12">
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to a Coordinator
            </Button>
          </a>
          <Link href="/start">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-black rounded-xl px-8 h-12">
              Start My Move-In Plan
            </Button>
          </Link>
        </div>
        <div className="pt-2">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
