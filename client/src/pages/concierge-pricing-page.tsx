import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { ConciergePricing } from "@/components/concierge-pricing";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80";

export default function ConciergePricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Concierge Pricing | All DeliWer Plans | Dubai Move-In & Exit"
        description="All DeliWer coordination packages in one place — from AED 99 (AquaCafe Loyalty) to AED 2,499 (Executive Exit). Transparent fees. Vendor costs are separate and market-rate. Affiliates earn on DeliWer fee only."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/80 to-slate-950" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
            Concierge Packages
          </div>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            All Plans · Full Transparency · One Place
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            What DeliWer charges.<br />
            <span className="text-emerald-400">Nothing hidden.</span>
          </h1>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            Six coordination packages — from a AED 99 filter loyalty plan to a AED 2,499 executive exit.
            Every price below is DeliWer's coordination fee only.
            Vendor costs are separate, transparent, and paid directly at market rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="https://wa.me/971523906019?text=Hi%20DeliWer%2C%20I%20want%20to%20discuss%20which%20package%20suits%20my%20situation."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-12 text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask a coordinator
              </Button>
            </a>
            <Link href="/start">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-black rounded-xl px-8 h-12 text-sm">
                Start my move-in plan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing component — all 6 tiers */}
      <ConciergePricing />

      {/* Footer nav */}
      <section className="py-10 px-4 border-t border-white/5 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </section>
    </div>
  );
}
