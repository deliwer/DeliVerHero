import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { RelocationFunnel } from "@/components/relocation-funnel";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

const CHECKLIST_ITEMS = [
  { category: "Legal & Tenancy", items: ["Give 90-day written notice to landlord", "Confirm contract end date", "Request Ejari cancellation", "Sign new tenancy contract if moving within UAE"] },
  { category: "Utilities", items: ["Schedule DEWA closure for old apartment", "Open DEWA account for new apartment (requires Ejari)", "Transfer internet and telecom services"] },
  { category: "Moving Day", items: ["Book vetted movers (minimum 2–3 weeks ahead)", "Arrange elevator booking with building management", "Pack room by room with labeled boxes"] },
  { category: "Home Setup", items: ["Deep clean new apartment before moving in", "Install water filter (first thing for fresh water)", "Air quality check in new unit", "Test all appliances and fixtures"] },
  { category: "Admin", items: ["Update Emirates ID address (if required)", "Notify bank of new address", "Update delivery addresses", "Notify children's schools if applicable"] },
];

export default function MovingDubaiChecklistPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Moving Dubai Checklist | Complete Relocation Checklist 2024 | DeliWer"
        description="Complete moving checklist for Dubai residents. Everything you need to do when moving apartments in Dubai — legal, utilities, movers, home setup, and admin."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Moving Dubai<br /><span className="text-emerald-400">Complete Checklist</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Everything you need to do when moving in Dubai — from tenancy notice to home setup. Save this checklist and let DeliWer coordinate the logistics.
          </p>
          <Button data-testid="button-dubai-checklist-start" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
            Let DeliWer Coordinate My Move <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Your Moving Checklist</h2>
          <div className="space-y-8">
            {CHECKLIST_ITEMS.map((cat, i) => (
              <div key={i} data-testid={`checklist-cat-${i}`}>
                <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-3">{cat.category}</div>
                <div className="space-y-2">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 hover:border-emerald-500/30 transition-all">
                      <div className="w-5 h-5 border-2 border-emerald-500/30 rounded flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-gray-300 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">DeliWer Handles the Hard Parts</h2>
          <p className="text-gray-400 font-medium">Ejari, DEWA, movers, cleaning — all coordinated by one contact. You focus on settling in.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-dubai-checklist-funnel" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start My Move Plan
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hello, I need help coordinating my move in Dubai."), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-within" />
    </div>
  );
}
