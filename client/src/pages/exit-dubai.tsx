import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import {
  MessageCircle, CheckCircle2, Truck, FileText, Zap, Sparkles,
  Package, Key, Shield, Clock, ArrowRight
} from "lucide-react";

const SERVICES = [
  { icon: Truck, title: "Movers Coordination", desc: "Vetted moving companies coordinated for your exit. From 800 AED depending on apartment size." },
  { icon: Package, title: "Storage Solutions", desc: "Short-term and long-term storage for furniture and belongings while you transition." },
  { icon: Sparkles, title: "Apartment Clearance", desc: "Full clearance and cleaning to maximize your deposit recovery from the landlord." },
  { icon: FileText, title: "Ejari Cancellation", desc: "Official termination of your tenancy record — handled correctly and on time." },
  { icon: Zap, title: "DEWA Closure", desc: "Final utility settlement and account closure, including bill reconciliation." },
  { icon: Key, title: "Key Handover Support", desc: "Guidance and coordination for a clean landlord walkthrough and key handover." },
];

const TRUST_POINTS = [
  "UAE-experienced coordination team",
  "WhatsApp-first, fast response",
  "Verified partner network",
  "Process-driven exits — no loose ends",
];

export default function ExitDubaiPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  const handleWhatsApp = (msg?: string) => {
    const text = msg ?? "I need exit concierge coordination. I am leaving Dubai and need help with movers, Ejari cancellation, DEWA closure, and apartment clearance.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Exit Dubai Concierge | Leave Dubai Without the Chaos | DeliWer"
        description="Leaving Dubai? DeliWer coordinates your full exit: Ejari cancellation, DEWA closure, movers, apartment deep clean, furniture removal, and key handover. Deposit protection guaranteed. Exit packages from AED 900."
        canonical="https://www.deliwer.com/exit-dubai"
        keywords="exit Dubai, leaving Dubai checklist, Ejari cancellation Dubai, DEWA closure Dubai, move out Dubai, Dubai exit concierge, deposit refund Dubai, apartment handover Dubai, Dubai move out package, DeliWer exit Dubai"
        webPageType="ServicePage"
        breadcrumbs={[{ name: "Exit Dubai", url: "/exit-dubai" }]}
        faqs={[
          { question: "How do I cancel Ejari when leaving Dubai?", answer: "To cancel Ejari in Dubai you must submit a cancellation request through a RERA-authorized Trustee Center with the original Ejari certificate and proof of tenancy termination. DeliWer handles this entire process on your behalf." },
          { question: "How long before I leave should I start the exit process?", answer: "Ideally 2–3 weeks before your departure. Ejari cancellation, DEWA closure, apartment cleaning, and final inspection all take time. DeliWer can compress this to 5–7 business days with the right coordination." },
          { question: "Will DeliWer help me get my deposit back?", answer: "Yes. DeliWer's exit concierge includes a deposit-protection deep clean, punch-list inspection, and documentation to maximize your chances of a full deposit refund from your landlord." },
          { question: "What does DeliWer's exit concierge package include?", answer: "The exit package covers: Ejari cancellation coordination, DEWA final meter reading and closure, movers, deep cleaning, furniture disposal or donation, e-waste collection, and key handover paperwork. Packages from AED 900." },
        ]}
        serviceSchema={{ name: "Dubai Exit Concierge Service", description: "DeliWer coordinates the complete Dubai apartment exit: Ejari cancellation, DEWA closure, movers, deep cleaning, furniture removal, and key handover. Deposit protection included.", price: "AED 900" }}
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Exit Concierge — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Leaving Dubai Quickly?<br />
            <span className="text-amber-400">We Handle the Exit.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            From movers to Ejari cancellation, DEWA closure, and key handover — DeliWer coordinates everything so you leave clean, compliant, and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-exit-dubai-start"
              size="lg"
              className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl shadow-amber-900/30"
              onClick={() => setFunnelOpen(true)}
            >
              Start Exit Coordination
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              data-testid="button-exit-dubai-whatsapp"
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
            Exit Concierge from 900 AED depending on complexity · Response within 10 minutes
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              What We Coordinate
            </h2>
            <p className="text-gray-400 font-medium">One contact. Everything handled.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Card key={i} className="bg-slate-900 border-slate-700 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-all">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-black uppercase text-white text-sm">{service.title}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{service.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 md:p-12 space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest">Pricing Concept</p>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                Pay Only What You Need
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                No rigid packages. We coordinate based on your actual situation. Vendors quote directly — DeliWer coordinates at a transparent coordination fee.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Exit Concierge (coordination)", price: "from 900 AED", note: "Depends on complexity" },
                { label: "Movers (market rate)", price: "from 800 AED", note: "Based on apartment size" },
                { label: "Apartment Clearance", price: "from 400 AED", note: "Studio to villa" },
                { label: "Cleaning Service", price: "from 350 AED", note: "Standard handover clean" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800 rounded-2xl p-4 space-y-1" data-testid={`pricing-item-${i}`}>
                  <p className="font-black text-white text-sm uppercase">{item.label}</p>
                  <p className="text-amber-400 font-black text-lg">{item.price}</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{item.note}</p>
                </div>
              ))}
            </div>
            <Button
              data-testid="button-exit-pricing-start"
              size="lg"
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl h-14 text-lg"
              onClick={() => setFunnelOpen(true)}
            >
              Start Exit Coordination
            </Button>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Why DeliWer for Your Exit
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              Most Dubai exits fail because of missed steps, poor handover, and unmanaged admin. DeliWer acts as your single accountable exit partner.
            </p>
            <div className="space-y-3">
              {TRUST_POINTS.map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-gray-200 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Shield, title: "Deposit Protection", desc: "We coordinate the clearance and handover process to maximize your deposit refund." },
              { icon: Clock, title: "Fast Response", desc: "Coordinator confirms your request within 10 minutes on WhatsApp." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-sm uppercase mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-xs font-medium">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Property Managers */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            Property Managers & Brokers
          </h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto">
            Coordinate tenant exits without the admin headache. Get apartments ready for the next tenant faster with DeliWer's exit coordination.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Reduce Admin", desc: "DeliWer manages the full exit while you focus on your next deal." },
              { title: "Happy Tenants", desc: "Professional handover process means better references." },
              { title: "Faster Turnaround", desc: "Apartments ready for re-listing sooner." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-2 text-left">
                <h3 className="font-black text-amber-400 text-xs uppercase tracking-widest">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button
            data-testid="button-exit-partner"
            size="lg"
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-2xl px-10 h-14 font-black"
            onClick={() => handleWhatsApp("Hi DeliWer, I am a property manager/broker interested in partnering for tenant exit coordination.")}
          >
            Partner With DeliWer
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-amber-950/20 border-t border-amber-500/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            Stop Stressing. Start Packing.
          </h2>
          <p className="text-gray-400 font-medium">We handle the admin while you plan your next chapter.</p>
          <Button
            data-testid="button-exit-final-cta"
            size="lg"
            className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl"
            onClick={() => setFunnelOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Exit Coordination
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="leaving" />
    </div>
  );
}
