import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import { CheckCircle2, MessageCircle, ArrowRight, TrendingDown } from "lucide-react";

export default function MoveToCheaperRentDubaiPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Move to Cheaper Rent Dubai | Tenant Relocation Coordination | DeliWer"
        description="Moving to cheaper rent in Dubai? DeliWer coordinates movers, Ejari transfer, DEWA utility switch, and cleaning when you relocate within Dubai or UAE. Coordination from 399 AED."
      />

      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Rent Reduction Move — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Move to<br />
            <span className="text-blue-400">Cheaper Rent</span><br />
            in Dubai
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Dubai rents are falling in many areas. Move to a better home for less — DeliWer handles the full move coordination so you don't have to.
          </p>
          <div className="flex items-center justify-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl px-6 py-3 max-w-sm mx-auto">
            <TrendingDown className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-black text-sm uppercase tracking-tight">10–25% rent drops in key Dubai areas</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-cheaper-rent-dubai-start" size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl" onClick={() => setFunnelOpen(true)}>
              Check My Move Plan <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button data-testid="button-cheaper-rent-dubai-wa" size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-16" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi, I want to move to a cheaper rent apartment in Dubai. I need coordination support."), "_blank")}>
              <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Why Rents Are Dropping in Dubai</h2>
          {[
            { title: "Oversupply in Many Communities", desc: "Areas like JLT, Sports City, International City, Al Barsha, and Discovery Gardens have seen significant rent corrections. Tenants who move now can lock in better rates." },
            { title: "Your Rights as a Tenant", desc: "When your tenancy contract expires, you have the right to move without penalty if proper notice is given. DeliWer helps you time the move correctly." },
            { title: "How to Move Without Losing Your Deposit", desc: "A proper handover — coordinated by DeliWer — ensures your old apartment is cleaned, repaired, and handed back professionally. Protecting your deposit." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-black text-white uppercase text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-950/20 border-t border-blue-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Ready to Save on Rent?</h2>
          <p className="text-gray-400 font-medium">DeliWer coordinates the full move — one contact, everything handled.</p>
          <Button data-testid="button-cheaper-rent-dubai-cta" size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => setFunnelOpen(true)}>
            Check My Move Plan
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-within" />
    </div>
  );
}
