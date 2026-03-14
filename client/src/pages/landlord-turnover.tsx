import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RelocationFunnel } from "@/components/relocation-funnel";
import {
  MessageCircle, CheckCircle2, Truck, FileText, Zap, Sparkles,
  Wrench, Key, Building2, Users, Star, ArrowRight
} from "lucide-react";

const SERVICES = [
  { icon: Truck, title: "Move-Out Clearance", desc: "Coordinate removal of tenant belongings and full apartment clearance." },
  { icon: Sparkles, title: "Deep Cleaning", desc: "Professional cleaning to handover or listing standard — ceiling to floor." },
  { icon: Wrench, title: "Maintenance Fixes", desc: "Coordinate snagging and minor maintenance before the next tenant arrives." },
  { icon: Zap, title: "Utility Readiness", desc: "DEWA transfer coordination for seamless transition to new tenant." },
  { icon: FileText, title: "Ejari Preparation", desc: "Support for Ejari cancellation and new tenancy registration." },
  { icon: Key, title: "Move-In Preparation", desc: "Get the apartment ready — water, filter, and inspection done." },
];

const TARGET_AUDIENCE = [
  {
    icon: Building2,
    title: "Property Investors",
    desc: "Reduce vacancy periods with fast, professional apartment turnovers between tenants.",
  },
  {
    icon: Users,
    title: "Property Managers",
    desc: "Offload tenant transition logistics — DeliWer coordinates all vendors on your behalf.",
  },
  {
    icon: Star,
    title: "Airbnb Operators",
    desc: "Keep your listing in top condition between guests with coordinated cleaning and maintenance.",
  },
];

export default function LandlordTurnoverPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  const handleWhatsApp = (msg?: string) => {
    const text = msg ?? "Hi DeliWer, I have a vacant apartment that needs turnover coordination — clearance, cleaning, maintenance, and move-in preparation for the next tenant.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Landlord Apartment Turnover Dubai | Tenant Transition Coordination | DeliWer"
        description="Vacant apartment? DeliWer coordinates move-out clearance, deep cleaning, maintenance fixes, utility readiness, and move-in preparation for property investors, managers, and Airbnb operators in Dubai."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Property Turnover — Dubai
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Vacant Apartment?<br />
            <span className="text-purple-400">Prepare It for the Next Tenant.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            DeliWer coordinates the full landlord turnover — clearance, cleaning, maintenance, utility readiness, and move-in preparation. One contact. Everything handled.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-landlord-start"
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl shadow-purple-900/30"
              onClick={() => setFunnelOpen(true)}
            >
              Start Turnover Coordination
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              data-testid="button-landlord-whatsapp"
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-16 text-lg"
              onClick={() => handleWhatsApp()}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center">Who This Is For</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TARGET_AUDIENCE.map((audience, i) => {
              const Icon = audience.icon;
              return (
                <Card key={i} className="bg-slate-900 border-slate-700 rounded-2xl p-6 space-y-4 hover:border-purple-500/40 transition-all">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-black text-white uppercase text-sm">{audience.title}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{audience.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              The Full Turnover Package
            </h2>
            <p className="text-gray-400 font-medium">Everything coordinated — from move-out clearance to move-in readiness.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-black uppercase text-white text-sm">{service.title}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{service.desc}</p>
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
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "Tell Us Your Situation", desc: "Share the apartment details, move-out date, and services needed via WhatsApp." },
              { step: "02", title: "We Coordinate All Vendors", desc: "DeliWer briefs movers, cleaners, maintenance teams, and utility coordinators." },
              { step: "03", title: "Everything Is Done", desc: "Apartment is cleared, cleaned, maintained, and ready for the next tenant." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start" data-testid={`step-landlord-${i}`}>
                <div className="text-3xl font-black text-purple-400/30 w-12 shrink-0">{item.step}</div>
                <div className="space-y-1">
                  <h3 className="font-black text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 border border-purple-500/20 rounded-3xl p-8 md:p-12 space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest">Typical Market Rates</p>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Transparent Pricing</h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                You pay only what vendors charge at market rates. DeliWer coordinates everything for a transparent flat fee — no hidden charges.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "DeliWer Coordination", price: "from 399 AED", note: "One contact for all vendors" },
                { label: "Deep Cleaning", price: "from 350 AED", note: "Based on apartment size" },
                { label: "Maintenance Fixes", price: "from 300 AED", note: "Based on scope of work" },
                { label: "Full Move-Out Clearance", price: "from 600 AED", note: "Clearance + cleaning combo" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800 rounded-2xl p-4 space-y-1" data-testid={`pricing-landlord-${i}`}>
                  <p className="font-black text-white text-sm uppercase">{item.label}</p>
                  <p className="text-purple-400 font-black text-lg">{item.price}</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{item.note}</p>
                </div>
              ))}
            </div>
            <Button
              data-testid="button-landlord-pricing-cta"
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl h-14 text-lg"
              onClick={() => setFunnelOpen(true)}
            >
              Start Turnover Coordination
            </Button>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4 bg-purple-950/10 border-t border-purple-500/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Trusted Across Dubai
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              DeliWer coordinates trusted relocation partners across Dubai, Sharjah and Ajman. Movers, cleaning companies, maintenance teams, and storage providers — all vetted and managed by one coordinator.
            </p>
            {[
              "Movers & clearance teams",
              "Cleaning companies",
              "Maintenance specialists",
              "Storage providers",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-gray-300 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-6 text-center">
            <h3 className="text-2xl font-black text-white uppercase">Ready to coordinate?</h3>
            <p className="text-gray-400 text-sm font-medium">Tell us about your apartment and we'll take it from there.</p>
            <Button
              data-testid="button-landlord-whatsapp-2"
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl h-12"
              onClick={() => handleWhatsApp()}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <RelocationFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="moving-in" />
    </div>
  );
}
