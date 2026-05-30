import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

export default function ExitDubaiApartmentPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Exit Dubai Apartment | Move-Out Coordination | DeliWer"
        description="Exiting your Dubai apartment? DeliWer coordinates apartment clearance, cleaning, Ejari cancellation, DEWA closure, and key handover. Exit concierge from 900 AED."
      />

      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Apartment Exit — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Exiting Your<br />
            <span className="text-amber-400">Dubai Apartment?</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Clearance, cleaning, Ejari cancellation, DEWA closure, and key handover — all coordinated by one contact. Leave clean, compliant, and deposit-protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-exit-apt-start" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl" onClick={() => setFunnelOpen(true)}>
              Start Exit Coordination <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button data-testid="button-exit-apt-whatsapp" size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-16" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi, I need exit coordination for my Dubai apartment."), "_blank")}>
              <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
            </Button>
          </div>
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Exit Concierge from 900 AED · Response within 10 minutes</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">How to Exit a Dubai Tenancy Contract Correctly</h2>
          {[
            { title: "Give Proper Notice", desc: "UAE tenancy law requires a minimum 90-day notice period before contract expiry. Failing to do this can cost you your deposit. DeliWer helps you track and action this on time." },
            { title: "Ejari Cancellation", desc: "Your Ejari must be officially cancelled through a registered trustee. This is mandatory before you can exit your tenancy. We handle the filing and coordination." },
            { title: "DEWA Final Settlement", desc: "Your DEWA account must be closed and the final bill settled. DeliWer coordinates the request and refund of your security deposit." },
            { title: "Clean Handover", desc: "Landlords have the right to deduct cleaning and repair costs from your deposit. A professional handover coordinated by DeliWer protects your deposit." },
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

      <section className="py-20 px-4 bg-amber-950/20 border-t border-amber-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Stop Stressing. Start Packing.</h2>
          <p className="text-gray-400 font-medium">Your coordinator confirms everything on WhatsApp within 10 minutes.</p>
          <Button data-testid="button-exit-apt-cta" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => setFunnelOpen(true)}>
            Start Exit Coordination
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="leaving" />
    </div>
  );
}
