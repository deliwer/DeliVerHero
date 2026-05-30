import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import { CheckCircle2, MessageCircle, ArrowRight, Truck, FileText, Zap, Sparkles } from "lucide-react";

export default function MoveApartmentDubaiPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Move Apartment Dubai | Relocation Coordination Services | DeliWer"
        description="Moving apartment in Dubai? DeliWer coordinates everything — movers, Ejari transfer, DEWA, cleaning, storage. Pay only market rates. One WhatsApp contact manages it all."
      />

      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Move Apartment — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Moving Apartment<br />
            <span className="text-emerald-400">in Dubai?</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you're upgrading, downsizing, or moving to a cheaper rent — DeliWer coordinates the full apartment move. Movers, Ejari, DEWA, cleaning, and more.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Truck, label: "Movers" },
              { icon: FileText, label: "Ejari Transfer" },
              { icon: Zap, label: "DEWA Switch" },
              { icon: Sparkles, label: "Cleaning" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-emerald-500/40 transition-all">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black uppercase text-white">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-move-apt-start" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl" onClick={() => setFunnelOpen(true)}>
              Start My Move Plan <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button data-testid="button-move-apt-whatsapp" size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-16" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi, I need help moving my apartment in Dubai."), "_blank")}>
              <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
            </Button>
          </div>
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Coordination from 399 AED · Movers from 800 AED · One contact manages everything</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Steps for Moving Apartment in Dubai</h2>
          {[
            { title: "Give 90-Day Notice", desc: "UAE tenancy law requires proper notice. Missing this can cost you money. DeliWer helps you track and action this on time." },
            { title: "Cancel Your Existing Ejari", desc: "Your Ejari must be cancelled at a registered trustee before you can move. We handle this so there's no gap or double registration." },
            { title: "Coordinate Your Movers", desc: "Vetted moving companies are coordinated based on your apartment size and move date — at market rates, not inflated quotes." },
            { title: "Transfer or Activate DEWA", desc: "Utilities are transferred or activated for your new apartment. Final bills handled for the old unit." },
            { title: "Clean Both Units", desc: "Old apartment cleaned for handover. New apartment cleaned before move-in. Deposit protected." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-7 h-7 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-400 font-black text-xs">{i + 1}</span>
              </div>
              <div>
                <h3 className="font-black text-white uppercase text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">One WhatsApp. Everything Done.</h2>
          <p className="text-gray-400 font-medium">Your coordinator confirms on WhatsApp within 10 minutes.</p>
          <Button data-testid="button-move-apt-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => setFunnelOpen(true)}>
            Start My Move Plan
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-within" />
    </div>
  );
}
