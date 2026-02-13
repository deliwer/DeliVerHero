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
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/5 flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {refName && (
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-sm font-bold animate-pulse">
              WELCOME PARTNER: {refName.toUpperCase()}
            </Badge>
          )}
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
            BROKER GROWTH ALLIANCE
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.95]">
            Close the Rental.<br />
            <span className="text-emerald-500 font-extrabold">We Handle the Move.</span><br />
            You Earn.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Join Dubai's leading post-closing alliance. We execute Ejari, utilities, and relocation while you focus on the next deal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-16 text-lg shadow-xl w-full sm:w-auto" onClick={handleWhatsApp} data-testid="button-partner-whatsapp">
              <MessageSquare className="w-6 h-6 mr-2" />
              WhatsApp to Join
            </Button>
            <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white font-bold px-8 h-16 text-base w-full sm:w-auto" onClick={() => window.open('https://instagram.com/vdeliwer', '_blank')}>
              Follow @vdeliwer
            </Button>
          </div>
        </div>
      </section>

      {/* Simplified Services & Earnings */}
      <section className="py-20 px-4 bg-slate-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black uppercase mb-8 border-l-4 border-emerald-500 pl-4">Operational Support</h2>
              <div className="space-y-4">
                {[
                  "Ejari Registration & Documentation",
                  "DEWA & Chiller Activation Assistance",
                  "Move-in Coordination & Inspection",
                  "Relocation Concierge Support"
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-bold text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase mb-8 border-l-4 border-blue-500 pl-4">Earning Potential</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Ejari", value: "AED 100+" },
                  { label: "Relocation", value: "15% Share" },
                  { label: "Concierge", value: "Flat Fee" },
                  { label: "Corporate", value: "Premium" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">{item.label}</div>
                    <div className="text-lg font-black text-emerald-400">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Protection */}
      <section className="py-20 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black uppercase mb-6 tracking-tight">Client Protection Promise</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            We are your operational back-office. We never market real estate to your clients or interfere with your primary deal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-bold uppercase tracking-wider text-gray-500">
            <div>Transparency First</div>
            <div>Zero Poaching</div>
            <div>Post-Closing Only</div>
          </div>
        </div>
      </section>

      {/* Simple Onboarding */}
      <section className="py-20 px-4 bg-emerald-600/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Join the Alliance</h2>
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 text-left">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black">1</div>
              <p className="text-gray-300 font-bold">Message us on WhatsApp</p>
            </div>
            <div className="flex items-center gap-4 text-left">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black">2</div>
              <p className="text-gray-300 font-bold">Get your unique referral link</p>
            </div>
            <div className="flex items-center gap-4 text-left">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black">3</div>
              <p className="text-gray-300 font-bold">Start earning per referral</p>
            </div>
          </div>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl group w-full" onClick={handleWhatsApp}>
            Join Now
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
          <p className="mt-6 text-gray-500 font-bold uppercase tracking-widest text-xs">No forms. No portals. Just speed.</p>
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