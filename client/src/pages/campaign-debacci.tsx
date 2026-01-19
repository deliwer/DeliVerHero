import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import qrCodeImage from "@assets/DeliWer_Debacci_QRCode_1768848760432.png";
import { 
  MessageSquare, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Plane, 
  ArrowRight,
  Target,
  BarChart3,
  Users
} from "lucide-react";
import { useLocation } from "wouter";

export default function CampaignDeBacciPage() {
  const WHATSAPP_NUMBER = "+971523946311";
  const CEO_NUMBER = "+971523906019";
  const REF_CODE = "DEBACCI20";
  
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(`Hello DeliWer, I am interested in the Exit Concierge service. Referral Code: ${REF_CODE}`)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="DeBacci Group Exclusive Partner Offer | DeliWer Exit Concierge"
        description="Exclusive 20% off DeliWer Exit Concierge for DeBacci Group network members. Professional Dubai exit management."
      />

      {/* Hero Section with DeBacci Branding */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="flex justify-center items-center gap-8 mb-12">
            <img src="/deliwer-logo.png" alt="DeliWer" className="h-12 w-auto brightness-110" />
            <div className="h-12 w-px bg-white/20" />
            <div className="text-2xl font-serif tracking-widest uppercase">De Bacci Group</div>
          </div>

          <Badge className="mb-6 bg-amber-500 text-black border-none py-2 px-6 rounded-full text-sm font-black animate-pulse uppercase tracking-widest">
            Exclusive Partner Offer
          </Badge>

          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
            Your Dubai Exit, <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Redefined.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The exclusive white-glove concierge for the DeBacci Group network. Hand over your keys—we handle the professional close-out of your UAE chapter.
          </p>

          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="text-6xl md:text-8xl font-black text-amber-500 mb-2">20% OFF</div>
                <div className="text-xl font-bold uppercase tracking-widest text-white/70">Exclusive DeBacci Network Rate</div>
                <div className="mt-8 py-4 px-8 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">Redeem with Code</p>
                  <p className="text-2xl font-black text-emerald-500">{REF_CODE}</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all w-full md:w-auto"
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            >
              <MessageSquare className="mr-3 h-6 w-6" />
              Claim My Exclusive Discount
            </Button>
          </div>
        </div>
      </section>

      {/* Campaign Details */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Zero Stress. <br />Total Recovery.</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                For DeBacci Group founders and executives, time is the most valuable asset. Our specialized team handles every administrative and logistical detail of your relocation.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Maximum Deposit Recovery", desc: "Professional apartment handover and deep cleaning to ensure your security deposit returns to you." },
                  { title: "White-Glove Utility Closure", desc: "End-to-end settlement of DEWA, Du/Etisalat, and Empower without you lifting a finger." },
                  { title: "Verified Global Relocation", desc: "Seamless door-to-door moving services through our audited network of international logistics partners." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1" />
                    <div>
                      <h4 className="font-bold text-white uppercase text-lg">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80" 
                alt="Dubai Marina" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-center">
                <p className="text-3xl font-serif italic mb-4 text-amber-500">Scan to Claim</p>
                <div className="bg-white p-4 inline-block rounded-3xl shadow-2xl">
                  <img 
                    src={qrCodeImage} 
                    alt="Scan to Claim" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Tracking Info */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <Target className="w-16 h-16 text-emerald-500 mx-auto mb-8" />
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Partner Syndication Active</h2>
          <p className="text-xl text-gray-400 mb-8">
            This exclusive rate is secured via the DeBacci Group syndicated network. Each referral is manually verified and tracked via WhatsApp to ensure priority handling for the network's elite members.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 font-bold">
            <BarChart3 className="w-5 h-5" />
            Verified DeBacci Referral: {REF_CODE}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 text-center">
        <h3 className="text-2xl font-bold uppercase mb-8">Need Immediate Assistance?</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
          <div className="space-y-2">
            <p className="text-gray-500 uppercase tracking-widest text-sm">Fastest Response</p>
            <p className="text-2xl font-black text-emerald-500">{WHATSAPP_NUMBER}</p>
          </div>
          <div className="h-px w-12 bg-white/10 md:h-12 md:w-px self-center" />
          <div className="space-y-2">
            <p className="text-gray-500 uppercase tracking-widest text-sm">CEO Support Line</p>
            <p className="text-2xl font-black text-white">{CEO_NUMBER}</p>
          </div>
        </div>
        <Button 
          size="lg" 
          className="bg-white hover:bg-gray-200 text-black font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all"
          onClick={() => window.open(WHATSAPP_LINK, '_blank')}
        >
          Talk to a DeliWer Coordinator
        </Button>
      </section>
    </div>
  );
}
