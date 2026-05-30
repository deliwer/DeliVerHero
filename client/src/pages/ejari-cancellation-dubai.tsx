import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, MessageCircle, ArrowRight, AlertCircle, FileText, Zap, Key, Truck, Sparkles } from "lucide-react";

const PROBLEMS = [
  { title: "Landlord Not Responding", desc: "Getting your landlord to sign off on cancellation can be frustrating. DeliWer mediates and follows up on your behalf." },
  { title: "Deposit Recovery Issues", desc: "Unclear handover processes lead to deposit deductions. We coordinate a professional handover to protect your money." },
  { title: "DEWA Closure Confusion", desc: "Final bills, refunds, and account closure — all handled and tracked by your coordinator." },
  { title: "Apartment Clearance", desc: "Coordinating movers, clearance, and cleaning while managing paperwork is overwhelming. We handle the logistics." },
];

const SERVICES = [
  { icon: FileText, label: "Ejari Cancellation Filing" },
  { icon: Zap, label: "DEWA Account Closure" },
  { icon: Sparkles, label: "Move-Out Cleaning" },
  { icon: Truck, label: "Movers & Clearance" },
  { icon: Key, label: "Key Handover Support" },
];

export default function EjariCancellationDubaiPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  const handleWhatsApp = (msg?: string) => {
    const text = msg ?? "Hello, I need to cancel my Ejari in Dubai and need help with the exit coordination process.";
    window.open(`https://wa.me/971523906019?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Cancel Ejari Dubai | Ejari Cancellation Coordination | DeliWer"
        description="Need to cancel your Ejari in Dubai? DeliWer coordinates the full exit process — Ejari cancellation, DEWA closure, apartment clearance, and deposit recovery support."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Ejari Cancellation — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Cancel Ejari<br />
            <span className="text-amber-400">Before Leaving Dubai</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            DeliWer coordinates the entire Ejari cancellation and exit process — from landlord coordination to DEWA closure, clearance, and deposit recovery.
          </p>

          {/* Warning box */}
          <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 max-w-xl mx-auto">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-red-300 font-bold text-sm text-left">
              Uncancelled Ejari can block future tenancies and create legal complications in UAE.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-ejari-cancel-start"
              size="lg"
              className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl shadow-amber-900/30"
              onClick={() => setFunnelOpen(true)}
            >
              Start Exit Coordination
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              data-testid="button-ejari-cancel-whatsapp"
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-16 text-lg"
              onClick={() => handleWhatsApp()}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">
            Exit Concierge from 900 AED · Response within 10 minutes
          </p>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Common Tenant Exit Problems
            </h2>
            <p className="text-gray-400 font-medium">DeliWer solves all of these — so you don't have to.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PROBLEMS.map((item, i) => (
              <Card key={i} className="bg-slate-900 border-slate-700 rounded-2xl p-6 space-y-3 hover:border-amber-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <h3 className="font-black text-white uppercase text-sm">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              The DeliWer Exit Concierge Handles
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="flex items-center gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="font-black text-white text-sm uppercase">{service.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">
            How Ejari Cancellation Works
          </h2>
          <div className="space-y-5">
            {[
              { step: "01", title: "Give 90-Day Notice", desc: "UAE law requires a minimum 90-day notice period. Missing this can result in financial penalties." },
              { step: "02", title: "Coordinate Apartment Clearance", desc: "Movers, cleaning, and maintenance fixes organized so your apartment passes landlord inspection." },
              { step: "03", title: "File Ejari Cancellation", desc: "Official Ejari termination filed through a registered RERA trustee center — done correctly and on time." },
              { step: "04", title: "Close DEWA Account", desc: "Final electricity and water bill settled. Security deposit refund tracked and followed up." },
              { step: "05", title: "Key Handover", desc: "Professional handover meeting coordinated — documented and signed off by all parties." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start" data-testid={`ejari-cancel-step-${i}`}>
                <div className="text-3xl font-black text-amber-400/30 w-12 shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Why DeliWer for Your Exit</h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              Most Dubai exits fail due to missed steps, poor handover coordination, and unmanaged admin. DeliWer acts as your single accountable exit partner.
            </p>
            {[
              "Single coordinator for entire exit",
              "WhatsApp-first, fast response",
              "Vetted partner network in UAE",
              "Deposit-protection process",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-gray-200 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 space-y-6 text-center">
            <h3 className="text-2xl font-black text-white uppercase">Ready to start your exit?</h3>
            <p className="text-gray-400 text-sm font-medium">Tell us your situation and we'll coordinate everything.</p>
            <Button
              data-testid="button-ejari-cancel-cta-2"
              size="lg"
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl h-14 text-lg"
              onClick={() => setFunnelOpen(true)}
            >
              Start Exit Coordination
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full text-gray-400 hover:text-white rounded-2xl h-12"
              onClick={() => handleWhatsApp()}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-amber-950/20 border-t border-amber-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Stop Stressing. Start Packing.</h2>
          <p className="text-gray-400 font-medium">Your coordinator confirms everything on WhatsApp within 10 minutes.</p>
          <Button
            data-testid="button-ejari-cancel-final"
            size="lg"
            className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl"
            onClick={() => setFunnelOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Exit Coordination
          </Button>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="cancel" />
    </div>
  );
}
