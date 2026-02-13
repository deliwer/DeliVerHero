import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CheckCircle, 
  MessageSquare,
  Zap,
  Building,
  Target,
  Briefcase,
  Globe,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight
} from "lucide-react";
import { useLocation } from "wouter";
import { contactInfo } from "@/lib/contact-info";
import { TrustStrip } from "@/components/trust-strip";

export default function PartnersPage() {
  const [location] = useLocation();
  const [refName, setRefName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setRefName(ref);
    }
  }, [location]);

  const handleWhatsApp = () => {
    const refText = refName ? ` (Referred by ${refName})` : "";
    window.open(`${contactInfo.ctas.whatsappBase}${contactInfo.company.whatsapp}?text=I%20am%20interested%20in%20the%20Broker%20Growth%20Alliance${refText}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Broker Growth Alliance | DeliWer Dubai"
        description="Close the Rental. We Handle the Move. You Earn. Join the leading post-closing alliance for Dubai real estate brokers."
      />

      <section className="px-4 py-3 border-b border-white/10 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5 flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582653280603-eb5ad4972820?q=80&w=2070" 
            alt="Dubai Real Estate" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {refName && (
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-sm font-bold animate-pulse">
              WELCOME PARTNER: {refName.toUpperCase()}
            </Badge>
          )}
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
            BROKER GROWTH ALLIANCE
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            Close the Rental.<br />
            <span className="text-emerald-500">We Handle the Rest.</span><br />
            You Earn.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            After you secure the deal, DeliWer completes Ejari, DEWA, move-in setup, and relocation support — while you earn referral commissions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-16 text-lg shadow-xl w-full sm:w-auto" onClick={handleWhatsApp} data-testid="button-partner-whatsapp">
              <MessageSquare className="w-6 h-6 mr-2" />
              WhatsApp to Join Alliance
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white font-black rounded-full px-12 h-16 text-lg w-full sm:w-auto" onClick={() => window.open('https://instagram.com/vdeliwer', '_blank')}>
              Follow @vdeliwer
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Post-Closing Chaos?</h2>
            <p className="text-gray-400 text-lg">Brokers lose hours on operational friction. We reclaim them for you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Ejari Deadlines", desc: "No more chasing appointments or document follow-ups." },
              { icon: Zap, title: "Utility Delays", desc: "We ensure DEWA and home internet are live before move-in." },
              { icon: Users, title: "Tenant Stress", desc: "We handle the 100+ questions new expats ask after the deal." }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.07] transition-all">
                <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center">After You Close, We Handle:</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Ejari Registration & Documentation",
              "DEWA & Chiller Activation Assistance",
              "Move-in Coordination & Inspection",
              "Maintenance & Handover Coordination",
              "Relocation Concierge (SIM, Nol, Banking)",
              "Corporate Tenant Onboarding Support"
            ].map((service, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                <span className="text-lg font-bold text-gray-200">{service}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-2xl font-black text-emerald-500 uppercase italic">You stay focused on closing the next deal.</p>
          </div>
        </div>
      </section>

      {/* Commission Section */}
      <section className="py-20 px-4 bg-emerald-600/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Earn Per Successful Referral</h2>
            <p className="text-gray-400 text-lg">Clear margins. No hidden fees. Paid on execution.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Ejari Referral", value: "AED 100+" },
              { label: "Relocation Pkg", value: "10-15% Share" },
              { label: "Move-in Concierge", value: "Flat Fee" },
              { label: "Corporate Move", value: "Premium Share" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-emerald-500/20 p-6 rounded-2xl text-center">
                <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-4" />
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">{item.label}</h4>
                <div className="text-2xl font-black text-emerald-400">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Protection Promise */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-950 border-blue-500/30 p-10 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-32 h-32 text-blue-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-blue-500" />
              Client Protection Promise
            </h2>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <span className="text-gray-300 font-bold">We never market real estate to your client.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <span className="text-gray-300 font-bold">We never interfere with your primary deal.</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <span className="text-gray-300 font-bold">We serve only post-closing operations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <span className="text-gray-300 font-bold">All communication remains transparent.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">How to Join</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "WhatsApp Us", desc: "Message +971523946311 to express interest." },
              { step: "02", title: "Get Your Link", desc: "We issue your unique trackable referral link instantly." },
              { step: "03", title: "Earn On Autopilot", desc: "Refer clients after closing. We serve, you get paid." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-white/5 absolute -top-10 -left-4 z-0">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 uppercase">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl group" onClick={handleWhatsApp}>
              Join the Alliance
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <p className="mt-6 text-gray-500 font-bold uppercase tracking-widest text-sm">No portal. No forms. Just Speed.</p>
          </div>
        </div>
      </section>

      <footer className="py-16 px-4 border-t border-white/5 text-center bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Operational Back Office for Post-Deal Chaos</p>
          <div className="flex justify-center gap-8">
            <a href="https://wa.me/971523946311" className="text-gray-500 hover:text-emerald-500 font-bold">WHATSAPP</a>
            <a href="https://instagram.com/vdeliwer" className="text-gray-500 hover:text-emerald-500 font-bold">INSTAGRAM</a>
          </div>
          <p className="text-gray-600 text-xs italic">
            DeliWer is a UAE-based coordination platform focused on relocation, exit, and settlement journeys.
          </p>
        </div>
      </footer>
    </div>
  );
}