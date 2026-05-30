import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { RelocationFunnel } from "@/components/relocation-funnel";
import { CheckCircle2, ArrowRight, MessageCircle, Truck, FileText, Zap, Sparkles } from "lucide-react";

const CHECKLIST = [
  { phase: "6–8 Weeks Before", items: ["Give formal 90-day written notice to landlord", "Start searching for new apartment", "Request Ejari cancellation process briefing"] },
  { phase: "4–6 Weeks Before", items: ["Sign new tenancy contract", "Initiate Ejari registration for new apartment", "Book movers — good movers book out early"] },
  { phase: "2–4 Weeks Before", items: ["Coordinate DEWA transfer (close old, open new)", "Arrange move-out cleaning for old apartment", "Arrange deep clean of new apartment before move"] },
  { phase: "Moving Week", items: ["Confirm mover schedule and building access times", "Pack and label boxes by room", "Do walk-through of old apartment with landlord"] },
  { phase: "After Moving", items: ["Complete Ejari cancellation for old apartment", "Receive Ejari certificate for new apartment", "Collect DEWA deposit refund from old address"] },
];

export default function MovingApartmentDubaiGuidePage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Moving Apartment Dubai Guide | Complete Checklist | DeliWer"
        description="Complete guide to moving apartments in Dubai. Step-by-step checklist covering notice period, Ejari transfer, DEWA, movers, and deposit recovery."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Moving Apartment<br /><span className="text-emerald-400">in Dubai — Complete Guide</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Moving apartments in Dubai involves more than just packing boxes. Ejari, DEWA, notice periods, and deposit protection — here is the complete timeline and checklist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-moving-guide-start" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start My Move Plan <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hello, I need help coordinating my apartment move in Dubai."), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Moving Checklist Timeline</h2>
          <div className="space-y-8">
            {CHECKLIST.map((phase, i) => (
              <div key={i} data-testid={`moving-phase-${i}`}>
                <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-3">{phase.phase}</div>
                <div className="space-y-3">
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-gray-300 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">What DeliWer Coordinates for You</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: FileText, label: "Ejari Cancellation & New Registration" },
              { icon: Truck, label: "Movers Coordination" },
              { icon: Zap, label: "DEWA Transfer" },
              { icon: Sparkles, label: "Cleaning (Old & New Apartment)" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-4 bg-slate-900 border border-emerald-500/20 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-black text-white text-sm uppercase">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Skip the Hassle. Let Us Coordinate.</h2>
          <p className="text-gray-400 font-medium">One contact manages your entire apartment move — Ejari, utilities, movers, and cleaning.</p>
          <Button data-testid="button-moving-guide-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => setFunnelOpen(true)}>
            Start My Move Plan
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-within" />
    </div>
  );
}
