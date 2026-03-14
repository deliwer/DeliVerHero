import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel, FunnelScenario } from "@/components/relocation-funnel";
import { CheckCircle2, MessageCircle, Home, ArrowLeftRight, LogOut, ArrowRight } from "lucide-react";

export default function DubaiRelocationConciergePage() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [scenario, setScenario] = useState<FunnelScenario | undefined>(undefined);

  const open = (s: FunnelScenario) => { setScenario(s); setFunnelOpen(true); };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Relocation Concierge | Move, Arrive, or Exit UAE | DeliWer"
        description="DeliWer is Dubai's relocation concierge platform. Move into a new home, relocate within UAE, or exit Dubai — all coordinated by one trusted contact. Movers, Ejari, DEWA, cleaning, storage and more."
      />

      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Dubai Relocation Concierge
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Move, Arrive, or Exit Dubai<br />
            <span className="text-emerald-400">Without the Chaos.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            DeliWer coordinates movers, Ejari, DEWA, cleaning, storage, water readiness, and more — all from one WhatsApp contact.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Home, label: "Moving Into a New Home", color: "emerald", scenario: "moving-in" as FunnelScenario },
              { icon: ArrowLeftRight, label: "Moving to Cheaper Rent", color: "blue", scenario: "moving-within" as FunnelScenario },
              { icon: LogOut, label: "Leaving Dubai", color: "amber", scenario: "leaving" as FunnelScenario },
            ].map((item, i) => {
              const Icon = item.icon;
              const colorMap: Record<string, string> = {
                emerald: "border-emerald-500/30 hover:border-emerald-500 text-emerald-400",
                blue: "border-blue-500/30 hover:border-blue-500 text-blue-400",
                amber: "border-amber-500/30 hover:border-amber-500 text-amber-400",
              };
              return (
                <button
                  key={i}
                  data-testid={`concierge-scenario-${item.scenario}`}
                  onClick={() => open(item.scenario)}
                  className={`bg-slate-900 border-2 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all ${colorMap[item.color]}`}
                >
                  <Icon className="w-7 h-7" />
                  <span className="font-black text-white text-xs uppercase tracking-tight text-center">{item.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">What DeliWer Coordinates</h2>
          {[
            { title: "Movers", desc: "Vetted moving companies coordinated for any scenario — move-in, within UAE, or international." },
            { title: "Ejari Registration & Cancellation", desc: "Official tenancy record management done correctly and on time." },
            { title: "DEWA Activation & Closure", desc: "Utilities activated for new tenants and closed for departing ones." },
            { title: "Cleaning & Maintenance", desc: "Move-in and move-out cleaning, maintenance snagging, and handover preparation." },
            { title: "Storage Solutions", desc: "Short and long-term storage for furniture and belongings during transitions." },
            { title: "Water & Air Readiness", desc: "Welcome filter installation and air quality check for new homes." },
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

      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Trusted Relocation Partners Across Dubai, Sharjah & Ajman</h2>
          <p className="text-gray-400 font-medium">DeliWer works with vetted movers, cleaning companies, maintenance teams, and storage providers across the UAE.</p>
          <Button data-testid="button-concierge-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => { setScenario(undefined); setFunnelOpen(true); }}>
            <MessageCircle className="w-5 h-5 mr-2" /> Start Your Relocation
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario={scenario} />
    </div>
  );
}
