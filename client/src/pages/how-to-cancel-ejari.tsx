import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from "lucide-react";

const STEPS = [
  { title: "Give 90-Day Written Notice", desc: "UAE tenancy law requires at least 90 days notice before your contract expiry date. Send a formal notice to your landlord via registered mail or email." },
  { title: "Clear All Outstanding Dues", desc: "Pay any outstanding rent, utility bills, or other dues. Unpaid amounts can block your Ejari cancellation and delay your DEWA refund." },
  { title: "Coordinate Apartment Handover", desc: "The apartment must be returned in the condition it was received. Arrange professional cleaning, and fix any damages to maximize your deposit recovery." },
  { title: "Get Ejari Cancellation Signed", desc: "Both tenant and landlord must attend or authorize a RERA trustee center to file the official Ejari cancellation." },
  { title: "Close DEWA Account", desc: "Request a final meter reading and close your DEWA account. Your security deposit (typically AED 2,000–4,000) is refunded within a few weeks." },
  { title: "Complete Key Handover", desc: "Return all keys (including building access cards, parking remotes) and get a signed receipt from the landlord." },
];

const PROBLEMS = [
  { title: "Landlord Ignoring Cancellation Request", desc: "Landlords sometimes delay to avoid the refund obligation. DeliWer mediates and escalates where needed." },
  { title: "Deposit Deduction Disputes", desc: "Common deductions include cleaning, painting, and repair costs. A properly coordinated handover minimizes this risk." },
  { title: "DEWA Account Not Closed Properly", desc: "Unclosed DEWA accounts accumulate charges. DeliWer coordinates the proper closure request and refund tracking." },
];

export default function HowToCancelEjariPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="How to Cancel Ejari in Dubai | Step-by-Step Guide | DeliWer"
        description="Complete guide to cancelling Ejari in Dubai. Learn the steps, common problems, and how DeliWer coordinates the entire exit process for you."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            How to Cancel<br /><span className="text-amber-400">Ejari in Dubai</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Ejari cancellation is mandatory when leaving a Dubai apartment. Skipping steps can cost you your deposit and create legal complications. Here's exactly how it works.
          </p>
          <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-300 text-sm font-bold">Uncancelled Ejari can block future UAE tenancies.</span>
          </div>
          <Button data-testid="button-cancel-ejari-cta" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
            Start Exit Coordination <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Step-by-Step: Ejari Cancellation</h2>
          <div className="space-y-5">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5 items-start" data-testid={`cancel-step-${i}`}>
                <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-amber-400 font-black text-sm">{i + 1}</span>
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
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Common Problems</h2>
          <div className="space-y-4">
            {PROBLEMS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-slate-900 border border-slate-700 rounded-2xl p-5">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-black text-white uppercase text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-amber-950/20 border-t border-amber-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Let DeliWer Handle Your Exit</h2>
          <p className="text-gray-400 font-medium">We coordinate the entire cancellation process — so you leave clean and deposit-protected.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-cancel-ejari-funnel" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start Exit Coordination
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hello, I need help with Ejari cancellation in Dubai."), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="cancel" />
    </div>
  );
}
