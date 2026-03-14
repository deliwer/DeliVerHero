import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import { CheckCircle2, MessageCircle, ArrowRight, Truck, FileText, Zap, Droplets } from "lucide-react";

export default function MoveInDubaiPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Move In Dubai | Home Setup Coordination | DeliWer"
        description="Moving in Dubai? DeliWer coordinates movers, Ejari registration, DEWA activation, cleaning, and water setup. Stress-free move-in services across Dubai."
      />

      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Move-In Services — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Move Into Your<br />
            <span className="text-emerald-400">Dubai Home</span><br />
            Without the Chaos
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            DeliWer coordinates movers, Ejari registration, DEWA activation, cleaning services, and water readiness — all from one WhatsApp contact.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Truck, label: "Movers" },
              { icon: FileText, label: "Ejari" },
              { icon: Zap, label: "DEWA" },
              { icon: Droplets, label: "Water Setup" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black uppercase text-white">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-move-in-dubai-start"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl"
              onClick={() => setFunnelOpen(true)}
            >
              Start My Move-In Plan <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              data-testid="button-move-in-dubai-whatsapp"
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-16"
              onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hi, I need move-in coordination in Dubai."), "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">
            Why DeliWer for Your Dubai Move-In
          </h2>
          {[
            { title: "One Contact for Everything", desc: "Stop juggling multiple vendors. One WhatsApp coordinator manages movers, utilities, cleaning, and water setup — all scheduled and confirmed for you." },
            { title: "Pay Only Market Rates", desc: "You pay exactly what movers and utilities normally cost. DeliWer coordination has a transparent flat fee with no hidden charges." },
            { title: "Trusted Partner Network", desc: "Vetted movers, cleaning companies, Ejari trustee services, and DEWA coordination — across Dubai, Sharjah and Ajman." },
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

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Ready to Move In?</h2>
          <p className="text-gray-400 font-medium">Tell us your situation — coordinator confirms on WhatsApp within 10 minutes.</p>
          <Button data-testid="button-move-in-dubai-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => setFunnelOpen(true)}>
            Start Your Move-In Plan
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-in" />
    </div>
  );
}
