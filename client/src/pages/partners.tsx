import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  MessageSquare,
  Wrench,
  Home as HomeIcon,
  MoveHorizontal
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { TrustStrip, PartnerStrip, OperationalBadges } from "@/components/trust-strip";

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

  const whatsappNumber = "+971523946311";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}`;

  const handleWhatsApp = () => {
    const refText = refName ? ` (Referred by ${refName})` : "";
    window.open(`${whatsappLink}?text=Hi,%20interested%20in%20the%20Broker%20Growth%20Alliance${encodeURIComponent(refText)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Broker Growth Alliance | DeliWer Dubai"
        description="Close the Rental. We Handle the Move. You Earn. Join the leading post-closing alliance for Dubai real estate brokers."
      />

      {/* Micro Trust Line */}
      <section className="px-4 py-3 border-b border-white/10 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {refName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 inline-block"
            >
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-sm font-bold animate-pulse">
                WELCOME PARTNER: {refName.toUpperCase()}
              </Badge>
            </motion.div>
          )}
          
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
            BROKER GROWTH ALLIANCE
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight drop-shadow-2xl">
            Close the Rental.<br />
            <span className="text-emerald-500 underline decoration-emerald-500/20">We Handle the Move.</span><br />
            You Earn.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            After you secure the deal, DeliWer handles Ejari, move-in coordination, and relocation services — while you earn referral commission.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-16 text-lg shadow-xl w-full sm:w-auto active-elevate-2 flex gap-3"
              onClick={handleWhatsApp}
              data-testid="button-partner-whatsapp"
            >
              <SiWhatsapp className="w-6 h-6" />
              Join via WhatsApp
            </Button>
            <div className="text-sm font-medium text-gray-300">
              {whatsappNumber} | <a href="https://instagram.com/vdeliwer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">@vdeliwer</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — The Broker Reality */}
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-12 text-center tracking-tighter">The Broker Reality</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl font-bold text-emerald-100">After closing a rental, you still deal with:</p>
              <div className="space-y-4">
                {[
                  "Ejari documentation chaos",
                  "DEWA coordination confusion",
                  "Tenant follow-ups",
                  "Move-in scheduling stress",
                  "Corporate relocation paperwork"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-red-500/10 border-red-500/30 rounded-[2rem] p-8">
              <CardContent className="p-0 space-y-4">
                <p className="text-2xl font-black text-red-400 uppercase tracking-tighter italic">This slows you down.</p>
                <p className="text-lg text-red-200 font-medium">And your next deal suffers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2 — What DeliWer Handles */}
      <section className="py-20 px-4">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">We step in after deal closing only.</h2>
            <p className="text-gray-300 font-medium text-lg uppercase tracking-widest">You stay focused on closing.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Ejari Registration Support", icon: CheckCircle2 },
              { title: "DEWA Assistance", icon: Zap },
              { title: "Move-In Concierge", icon: HomeIcon },
              { title: "Relocation & Corporate Setup", icon: MoveHorizontal },
              { title: "Inspection & Maintenance Coordination", icon: ShieldCheck }
            ].map((service, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-emerald-500/50 transition-colors rounded-[1.5rem] group hover-elevate">
                <CardContent className="pt-8 pb-8 px-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-tighter leading-tight">{service.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Commission Model */}
      <section className="py-24 px-4 bg-emerald-950/50 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Transparent Commission Model</h2>
            <p className="text-emerald-400 font-black uppercase tracking-widest text-sm">Commission confirmation shared weekly via WhatsApp</p>
          </div>
          <div className="grid gap-4">
            {[
              { item: "Ejari referral", value: "Fixed commission" },
              { item: "Move-in package", value: "Flat share" },
              { item: "Relocation concierge", value: "Percentage share" },
              { item: "Corporate relocation", value: "Premium commission" }
            ].map((tier, i) => (
              <div key={i} className="flex justify-between items-center p-6 rounded-2xl bg-black/20 border border-white/5 hover:border-emerald-500/30 transition-colors">
                <span className="font-black uppercase tracking-tight text-lg">{tier.item}</span>
                <span className="font-black text-emerald-400 text-lg uppercase tracking-widest">{tier.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-emerald-200/60 italic font-medium">First referral payout prioritized to build trust.</p>
        </div>
      </section>

      {/* Section 4 — Client Protection */}
      <section className="py-24 px-4 bg-black/40 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Client Protection Promise</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
              We operate strictly post-closing. We never market real estate to your clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            {[
              "No Property Listings",
              "No Real Estate Marketing",
              "No Listing Collection",
              "No Competition with Brokers"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm uppercase tracking-wider text-gray-200">{item}</span>
              </div>
            ))}
          </div>
          <div className="pt-6 font-black text-emerald-500 text-2xl uppercase tracking-tighter italic">
            Your client remains your client.
          </div>
        </div>
      </section>

      {/* Section 5 — How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">Simple. Trackable. Transparent.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { step: "1", text: "Close rental" },
              { step: "2", text: "Share your referral link" },
              { step: "3", text: "Client contacts DeliWer" },
              { step: "4", text: "We log referral transparently" },
              { step: "5", text: "You receive commission" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500 text-black flex items-center justify-center font-black text-2xl shadow-xl group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <p className="font-black text-xs uppercase tracking-widest text-gray-300 leading-tight h-10 flex items-center">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Get Your Link */}
      <section className="py-24 px-4 bg-black/40 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Get Your Personal Referral Link</h2>
            <p className="text-xl text-gray-300 font-medium">Message us on WhatsApp to start earning immediately.</p>
          </div>
          
          <Card className="bg-emerald-950/30 border-emerald-500/30 rounded-[3rem] p-10 md:p-16 overflow-hidden relative group">
            <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10 space-y-10">
              <div className="text-xl md:text-3xl font-mono font-bold tracking-tighter text-emerald-400 break-all">
                deliwer.com/welcome?ref=yourname
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-20 text-xl shadow-2xl active-elevate-2 flex gap-4"
                onClick={handleWhatsApp}
              >
                <SiWhatsapp className="w-8 h-8" />
                Message +971523946311
              </Button>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                <a href="https://instagram.com/vdeliwer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Follow @vdeliwer</a>
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                <span>Weekly Referral Updates</span>
              </div>
            </div>
          </Card>
          
          <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">Manual + Transparent + Fast Payout</p>
        </div>
      </section>

      {/* Endorsement Strip */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </section>

      <footer className="py-20 px-4 border-t border-white/5 text-center bg-slate-950/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <OperationalBadges variant="dark" />
          <p className="text-gray-500 text-xs italic max-w-xl mx-auto">
            DeliWer is an operational back-office for Dubai residents and brokers, focused on relocation, settlement, and daily living journeys.
          </p>
        </div>
      </footer>
    </div>
  );
}
