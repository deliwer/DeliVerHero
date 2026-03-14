import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, ArrowRight, MessageCircle, Home, Zap, Droplets, Sparkles, Wrench, FileText } from "lucide-react";

const SETUP_STEPS = [
  { icon: FileText, title: "Register Ejari First", desc: "Your first task after signing the tenancy contract. Without Ejari you cannot activate DEWA or legally move in." },
  { icon: Zap, title: "Activate DEWA", desc: "Electricity and water services activated using your Ejari certificate. Security deposit required (AED 2,000–4,000)." },
  { icon: Sparkles, title: "Deep Clean Before Moving In", desc: "Even new apartments need cleaning. Get a professional pre-move clean — especially kitchen, bathrooms, and AC vents." },
  { icon: Droplets, title: "Install a Water Filter", desc: "Dubai tap water passes through old pipes. A welcome shower filter (AquaCafe standard) protects your health from day one." },
  { icon: Wrench, title: "Maintenance Inspection", desc: "Check all appliances, air conditioning, plumbing, and fixtures before moving furniture in. Document any issues." },
  { icon: Home, title: "Home Setup & Move-In", desc: "Coordinate movers, furniture delivery, and internet connection. DeliWer manages the timeline so nothing clashes." },
];

export default function NewApartmentDubaiGuidePage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="New Apartment Dubai Guide | Setup Checklist & Tips | DeliWer"
        description="Just got a new apartment in Dubai? Complete setup guide covering Ejari, DEWA, cleaning, water filter, maintenance inspection, and move-in coordination. DeliWer handles everything."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            New Apartment Setup — Dubai
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Just Got a New Apartment<br /><span className="text-emerald-400">in Dubai?</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Congratulations! Here is everything you need to do before and after moving in — from Ejari registration to water filters and maintenance. DeliWer coordinates it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-new-apt-start" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start My Move-In Setup <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hello, I just got a new apartment in Dubai and need help setting it up."), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">New Apartment Setup Guide</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {SETUP_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3 hover:border-emerald-500/30 transition-all" data-testid={`setup-step-${i}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Step {i + 1}</div>
                  </div>
                  <h3 className="font-black text-white uppercase text-sm">{step.title}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Why DeliWer for Your New Apartment</h2>
          {[
            { title: "One Contact for Everything", desc: "Ejari, DEWA, movers, cleaning, water filter — coordinated by one WhatsApp contact. No juggling vendors." },
            { title: "Pay Only Market Rates", desc: "You pay what vendors charge at market rates. DeliWer coordination is transparent and flat — no markup." },
            { title: "10-Minute Response", desc: "A coordinator confirms your request within 10 minutes on WhatsApp and begins scheduling everything." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start bg-slate-900 border border-slate-700 rounded-2xl p-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-black text-white uppercase text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Ready to Set Up Your New Home?</h2>
          <p className="text-gray-400 font-medium">Coordinator confirms on WhatsApp within 10 minutes.</p>
          <Button data-testid="button-new-apt-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-xl" onClick={() => setFunnelOpen(true)}>
            Start My Move-In Setup
          </Button>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="register" />
    </div>
  );
}
