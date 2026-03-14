import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from "lucide-react";

const STEPS = [
  { title: "Sign the Tenancy Contract", desc: "Both tenant and landlord must sign the official Ejari-compliant tenancy contract before registration can begin." },
  { title: "Gather Required Documents", desc: "You need: tenant Emirates ID, landlord passport/Emirates ID, signed tenancy contract, and title deed of the property." },
  { title: "Visit or Coordinate with a RERA Trustee Center", desc: "Ejari registration must be done through an official RERA-approved trustee center. DeliWer coordinates this so you don't have to physically visit." },
  { title: "Pay the Registration Fee", desc: "The Ejari fee is a standard government charge. DeliWer coordinates the payment process as part of the service." },
  { title: "Receive Ejari Certificate", desc: "Once approved, you receive an official Ejari certificate — mandatory before activating DEWA and moving in." },
];

const PAIN_POINTS = [
  { title: "Long Queues at Trustee Centers", desc: "Government offices have long wait times. DeliWer coordinates the submission remotely, saving hours of your time." },
  { title: "Confusing Paperwork", desc: "Missing or incorrect documents cause rejections. DeliWer reviews your documents before submission to prevent delays." },
  { title: "Landlord Coordination", desc: "Getting landlords to provide required documents promptly is frustrating. DeliWer follows up on your behalf." },
  { title: "DEWA Activation Delays", desc: "Without Ejari you can't activate DEWA. Every day of delay means a day without electricity or water in your new home." },
];

export default function HowToRegisterEjariPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="How to Register Ejari in Dubai | Step-by-Step Guide | DeliWer"
        description="Complete step-by-step guide to Ejari registration in Dubai. Learn what documents you need, how the process works, and how DeliWer can coordinate it all for you."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            How to Register<br /><span className="text-emerald-400">Ejari in Dubai</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Ejari is mandatory for every tenancy contract in Dubai. Without it, you cannot activate DEWA or legally move in. Here is exactly how the process works — and how DeliWer can handle it for you.
          </p>
          <Button data-testid="button-how-to-ejari-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
            Start Ejari Setup <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Step-by-Step: Ejari Registration</h2>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5 items-start" data-testid={`register-step-${i}`}>
                <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-400 font-black text-sm">{i + 1}</span>
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
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Common Problems Tenants Face</h2>
          <div className="space-y-4">
            {PAIN_POINTS.map((item, i) => (
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

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Let DeliWer Handle Your Ejari</h2>
          <p className="text-gray-400 font-medium">Skip the queues. Submit your documents via WhatsApp and we coordinate the rest.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-how-to-ejari-funnel" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start Ejari Setup
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hello, I need help with Ejari registration in Dubai."), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="register" />
    </div>
  );
}
