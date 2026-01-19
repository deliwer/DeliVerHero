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
  Users,
  AlertTriangle,
  ClipboardCheck,
  Globe2,
  Lock,
  Clock,
  Star
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
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all w-full md:w-auto"
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            >
              <MessageSquare className="mr-3 h-6 w-6" />
              Claim My 20% Exit Concierge Discount
            </Button>

            <div className="relative group mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">Redeem with Code</p>
                <p className="text-2xl font-black text-emerald-500">{REF_CODE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN ALIGNMENT */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Why Leaving Dubai Is Risky <br />Without Support</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Security deposits delayed or lost",
              "DEWA & internet left open → surprise bills",
              "Landlord handovers mishandled",
              "Too many vendors, zero accountability",
              "Time pressure before departure"
            ].map((pain, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-slate-950 border border-white/5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <p className="text-gray-300 font-medium">{pain}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-block px-8 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <p className="text-xl font-bold text-emerald-400 italic">
                👉 DeliWer replaces all of this with one exit partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE OFFER */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter">What DeliWer Handles</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Deposit & Property</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-4">
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Move-out cleaning coordination</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Landlord / agent handover support</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Deposit recovery focus</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <ClipboardCheck className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Utility Closures</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-4">
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> DEWA settlement</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Internet / telecom cancellation</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Final bill settlements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Globe2 className="w-6 h-6 text-amber-500" />
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Next-Destination</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-4">
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full" /> Introductions to global movers</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full" /> US, UK, EU, Singapore & more</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full" /> Seamless door-to-door moving</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SELF-QUALIFICATION */}
      <section className="py-24 px-4 bg-emerald-950/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Users className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Who This Is For</h2>
            <p className="text-xl text-gray-400 mt-4">This service is ideal if you are:</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: "Relocating Professional", desc: "Moving out of Dubai for your next career move." },
              { label: "Exiting Founder", desc: "Closing one chapter to open another internationally." },
              { label: "Global Corporate", desc: "Employee on a structured global relocation move." },
              { label: "Expiring Lease", desc: "Family wrapping up a lease and final utilities." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-900 border border-white/5 rounded-3xl">
                <h4 className="text-xl font-bold text-white mb-2">{item.label}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-2xl font-serif italic text-amber-500 mt-16">
            If time, money, and peace of mind matter — this is for you.
          </p>
        </div>
      </section>

      {/* DEBACCI BENEFIT */}
      <section className="py-24 px-4 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Debacci Community <br />Benefit</h2>
              <p className="text-xl text-gray-400 mb-12">
                As a Debacci community member, you receive exclusive priority handling and discounted rates.
              </p>
              
              <div className="space-y-4 mb-12">
                {[
                  "20% off DeliWer Exit Concierge",
                  "Priority handling",
                  "Confidential coordination"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-lg font-bold text-emerald-400">
                    <CheckCircle className="w-6 h-6 shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                <h4 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  How to Redeem
                </h4>
                <div className="space-y-4">
                  {[
                    "Click \"Claim My 20% Discount\"",
                    "Chat with DeliWer on WhatsApp",
                    "Mention code DEBACCI20",
                    "Discount applied instantly"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-black text-amber-500 shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-300 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80" 
                alt="Dubai Marina" 
                className="w-full h-[600px] object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <p className="text-3xl font-serif italic mb-8 text-amber-500">Scan to Claim</p>
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

      {/* TRUST & DELIVERY */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Globe2, label: "UAE-based Team" },
              { icon: ClipboardCheck, label: "Single Accountability" },
              { icon: Lock, label: "Confidential Handling" },
              { icon: Star, label: "Trusted Partners" }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <item.icon className="w-8 h-8 text-gray-500 mx-auto" />
                <p className="font-bold uppercase tracking-tighter text-sm">{item.label}</p>
              </div>
            ))}
          </div>
          
          <div className="p-8 bg-slate-900 border border-white/5 rounded-3xl mb-16">
            <p className="text-gray-400 leading-relaxed italic">
              "Shared by Debacci as a community benefit. <br />
              Service delivery managed by DeliWer."
            </p>
          </div>

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
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            Claim My 20% Exit Concierge Discount
          </Button>
        </div>
      </section>
    </div>
  );
}
