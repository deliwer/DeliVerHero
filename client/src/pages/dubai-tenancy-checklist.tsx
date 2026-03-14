import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from "lucide-react";

const MOVE_IN_CHECKLIST = [
  "Signed tenancy contract (Ejari-compliant)",
  "Ejari registration completed",
  "DEWA account activated",
  "Security deposit receipt from landlord",
  "Building access card / keys received",
  "Property inspection done (document any existing damage)",
  "Water filter installed",
  "Air conditioning checked and cleaned",
  "Internet/telecom service connected",
];

const MOVE_OUT_CHECKLIST = [
  "90-day written notice given to landlord",
  "All outstanding rent and bills paid",
  "Apartment cleaned professionally",
  "Minor damages repaired",
  "Ejari cancellation filed",
  "DEWA account closed and final bill paid",
  "Internet and telecom cancelled",
  "Keys returned with signed receipt",
  "Deposit refund requested and tracked",
];

export default function DubaiTenancyChecklistPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [scenario, setScenario] = useState<"register" | "cancel">("register");

  const open = (s: "register" | "cancel") => { setScenario(s); setFunnelOpen(true); };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Tenancy Checklist | Move-In & Move-Out Guide | DeliWer"
        description="Complete Dubai tenancy checklist for both move-in and move-out. Ejari, DEWA, deposits, and everything you need to know as a tenant in Dubai."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Dubai Tenancy<br /><span className="text-emerald-400">Checklist</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Everything you need to check when moving into or out of a Dubai apartment. From Ejari to deposits — the complete tenant guide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-tenancy-move-in" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => open("register")}>
              Moving In <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button data-testid="button-tenancy-move-out" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => open("cancel")}>
              Moving Out <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-emerald-400">Move-In Checklist</h2>
            <div className="space-y-2">
              {MOVE_IN_CHECKLIST.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-900 border border-emerald-500/10 rounded-xl px-4 py-3" data-testid={`move-in-item-${i}`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button data-testid="button-tenancy-ci-cta" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-12" onClick={() => open("register")}>
              Coordinate My Move-In
            </Button>
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-amber-400">Move-Out Checklist</h2>
            <div className="space-y-2">
              {MOVE_OUT_CHECKLIST.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-900 border border-amber-500/10 rounded-xl px-4 py-3" data-testid={`move-out-item-${i}`}>
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button data-testid="button-tenancy-co-cta" size="lg" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl h-12" onClick={() => open("cancel")}>
              Coordinate My Exit
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">DeliWer Handles Both Sides</h2>
          <p className="text-gray-400 font-medium">Move-in or move-out — one coordinator handles Ejari, utilities, movers, and cleaning.</p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-14 text-lg" onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hello, I need help with my Dubai tenancy — Ejari and relocation coordination."), "_blank")}>
            <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
          </Button>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario={scenario} />
    </div>
  );
}
