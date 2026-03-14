import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

export default function EjariTransferDubaiPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Ejari Transfer Dubai | Moving Apartments Guide | DeliWer"
        description="Moving apartments in Dubai? Learn how to transfer or cancel-and-reregister your Ejari when moving to a new apartment. DeliWer coordinates the full process."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Ejari Transfer<br /><span className="text-blue-400">When Moving Apartments in Dubai</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Ejari cannot technically be "transferred" between properties — it must be cancelled for the old apartment and registered fresh for the new one. DeliWer coordinates both processes simultaneously.
          </p>
          <Button data-testid="button-ejari-transfer-cta" size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
            Coordinate My Ejari Transfer <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">How Ejari Transfer Works</h2>
          <div className="space-y-5">
            {[
              { title: "Cancel Old Ejari", desc: "Your existing Ejari must be officially cancelled at a RERA trustee center. Both tenant and landlord signatures are required." },
              { title: "Sign New Tenancy Contract", desc: "Once you have signed your new tenancy contract, you can proceed to register a fresh Ejari for the new property." },
              { title: "Register New Ejari", desc: "Submit the new tenancy contract, Emirates ID, landlord documents, and title deed for the new property to a trustee center." },
              { title: "Transfer DEWA", desc: "Close your old DEWA account (with refund of deposit) and open a new one for your new address. Ejari must come first." },
              { title: "Update Your Address", desc: "Notify relevant authorities and services of your new address once DEWA and Ejari are settled." },
            ].map((step, i) => (
              <div key={i} className="flex gap-5 items-start" data-testid={`transfer-step-${i}`}>
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-blue-400 font-black text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-black text-white uppercase text-sm mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Why DeliWer for Ejari Transfer</h2>
          {[
            { title: "Both Processes Coordinated Simultaneously", desc: "Old cancellation and new registration happen in parallel — no gap in tenancy status." },
            { title: "DEWA Transfer Handled", desc: "Closing old account and opening new one coordinated alongside Ejari." },
            { title: "One WhatsApp Contact", desc: "One coordinator manages both landlords, both trustee centers, and all paperwork." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start bg-slate-900 border border-slate-700 rounded-2xl p-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-white uppercase text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-950/20 border-t border-blue-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Coordinate Your Ejari Transfer</h2>
          <p className="text-gray-400 font-medium">One contact. Old cancellation + new registration handled together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-ejari-transfer-funnel" size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start My Ejari Transfer
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hello, I need help with Ejari transfer when moving apartments in Dubai."), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="move" />
    </div>
  );
}
