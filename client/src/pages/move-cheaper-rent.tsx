import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import {
  MessageCircle, CheckCircle2, Truck, FileText, Zap, Sparkles,
  ArrowRight, TrendingDown, Home, DollarSign, Clock
} from "lucide-react";

const SERVICES = [
  { icon: Truck, label: "Movers Coordination" },
  { icon: FileText, label: "New Ejari Setup" },
  { icon: Zap, label: "Utility Transfer (DEWA)" },
  { icon: Sparkles, label: "Cleaning (old & new apartment)" },
];

const CONTENT_SECTIONS = [
  {
    title: "Why Dubai Rents Are Dropping",
    body: "Many areas across Dubai — JLT, Sports City, International City, Al Barsha — have seen rent corrections of 10–25% over recent years. As a tenant, you have the right to move to a better deal when your tenancy contract expires.",
  },
  {
    title: "How to Move Without Losing Your Deposit",
    body: "The key is a proper notice period, a clean handover, and Ejari cancellation done correctly. DeliWer coordinates all of this so you don't lose your deposit and your new place is ready on day one.",
  },
  {
    title: "Steps for Ejari Transfer",
    body: "You need to cancel your existing Ejari before registering a new one. We coordinate this process with your old and new landlords so there's no double billing, no missed steps, and no delays.",
  },
];

export default function MoveCheaperRentPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  const handleWhatsApp = (msg?: string) => {
    const text = msg ?? "Hi DeliWer, I am paying too much rent and want to move apartments in Dubai. I need full coordination — movers, Ejari transfer, utilities, and cleaning.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Move to Cheaper Rent Dubai | Relocation Coordination | DeliWer"
        description="Paying too much rent? Move without the stress. DeliWer coordinates movers, Ejari setup, utility transfer, and cleaning when you relocate within Dubai or UAE."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Move Smarter — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Paying Too Much Rent?<br />
            <span className="text-blue-400">Move Without the Stress.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Falling rents mean you can relocate to a better home for less. DeliWer coordinates movers, Ejari transfer, utility switch, and cleaning — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-cheaper-rent-start"
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl shadow-blue-900/30"
              onClick={() => setFunnelOpen(true)}
            >
              Check My Move Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              data-testid="button-cheaper-rent-whatsapp"
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
            Coordination from 399 AED · Movers from 800 AED · Response within 10 minutes
          </p>
        </div>
      </section>

      {/* Stats / Value Props */}
      <section className="py-16 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: TrendingDown, value: "10–25%", label: "Rent drops in many areas" },
            { icon: Home, value: "1 Contact", label: "Manages everything" },
            { icon: DollarSign, value: "399 AED", label: "Coordination from" },
            { icon: Clock, value: "10 min", label: "Response time" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center space-y-2" data-testid={`stat-cheaper-${i}`}>
                <Icon className="w-6 h-6 text-blue-400 mx-auto" />
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services included */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Everything Coordinated
            </h2>
            <p className="text-gray-400 font-medium">One WhatsApp contact — all vendors managed for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="flex items-center gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="font-black text-white text-sm uppercase">{service.label}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content / SEO sections */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">
            What You Need to Know
          </h2>
          <div className="space-y-6">
            {CONTENT_SECTIONS.map((section, i) => (
              <Card key={i} className="bg-slate-900 border-slate-700 rounded-2xl p-6 space-y-3">
                <h3 className="font-black text-white uppercase tracking-tight text-lg">{section.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed text-sm">{section.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 border border-blue-500/20 rounded-3xl p-8 md:p-12 space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Typical Costs</p>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                Transparent Pricing
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                You pay only what movers and utilities normally cost. DeliWer coordination is at a flat, transparent fee — no hidden charges.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "DeliWer Coordination", price: "from 399 AED", note: "One contact for everything" },
                { label: "Movers", price: "from 800 AED", note: "Market rate, vetted suppliers" },
                { label: "Ejari Transfer", price: "from 350 AED", note: "Old cancellation + new setup" },
                { label: "Cleaning (both units)", price: "from 500 AED", note: "Old + new apartment" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800 rounded-2xl p-4 space-y-1" data-testid={`pricing-move-${i}`}>
                  <p className="font-black text-white text-sm uppercase">{item.label}</p>
                  <p className="text-blue-400 font-black text-lg">{item.price}</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{item.note}</p>
                </div>
              ))}
            </div>
            <Button
              data-testid="button-cheaper-pricing-cta"
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl h-14 text-lg"
              onClick={() => setFunnelOpen(true)}
            >
              Check My Move Plan
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-blue-950/20 border-t border-blue-500/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            Ready to Make the Move?
          </h2>
          <p className="text-gray-400 font-medium">Tell us your situation and we coordinate everything.</p>
          <Button
            data-testid="button-cheaper-final-cta"
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl"
            onClick={() => setFunnelOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Check My Move Plan
          </Button>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-within" />
    </div>
  );
}
