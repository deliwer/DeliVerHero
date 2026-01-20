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
  Star,
  Info,
  ChevronRight,
  Handshake
} from "lucide-react";
import { useLocation } from "wouter";

export default function CampaignDeBacciPage() {
  const WHATSAPP_NUMBER = "+971523946311";
  const CEO_NUMBER = "+971523906019";
  const REF_CODE = "DEBACCI20";
  
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(`Hello DeliWer, I am interested in the Exit Concierge service. Referral Code: ${REF_CODE}`)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="DeliWer × Debacci Noble Family Community | A Trusted Alliance"
        description="A trusted alliance for global mobility, capital & continuity. Exclusive Exit Concierge support for Debacci Community members."
      />
      
      {/* Hero Section with DeBacci Branding */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="flex justify-center items-center gap-8 mb-12">
            <img src="/deliwer-logo.png" alt="DeliWer" className="h-12 w-auto brightness-110" />
            <div className="h-12 w-px bg-white/20" />
            <div className="text-2xl font-serif tracking-widest uppercase">De Bacci Noble Family</div>
          </div>

          <Badge className="mb-6 bg-amber-500 text-black border-none py-2 px-6 rounded-full text-sm font-black animate-pulse uppercase tracking-widest">
            A Trusted Alliance
          </Badge>

          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
            Global Mobility, <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Capital & Continuity.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            DeliWer and the Debacci Noble Family Community come together through a relationship rooted in heritage, trust, discretion, and international reach.
          </p>

          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all w-full md:w-auto"
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            >
              <MessageSquare className="mr-3 h-6 w-6" />
              Request Confidential Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* JOINT INTRODUCTION */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-amber-500 mb-4">
                <Handshake className="w-8 h-8" />
                <h2 className="text-3xl font-black uppercase tracking-tighter">Joint Introduction</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Debacci represents a European-origin noble family network with deep aristocratic, Christian values and long-standing connections across investors, founders, family offices, and global institutions. DeliWer is a Dubai-born platform designed to support life transitions — relocation, exit, and settlement — with precision and accountability.
              </p>
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem]">
                <p className="text-xl font-bold text-emerald-400 italic leading-relaxed">
                  "This alliance exists to protect people during moments of change: when founders relocate, families exit jurisdictions, or investors reposition globally."
                </p>
              </div>
            </div>
            
            <div className="grid gap-6">
              <Card className="bg-white/5 border-white/10 rounded-[2rem]">
                <CardHeader>
                  <CardTitle className="text-white uppercase flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    About Debacci Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400 space-y-4">
                  <p>An international network grounded in European aristocratic heritage, Christian ethical foundations, and multi-generational capital stewardship.</p>
                  <a href="https://debacciofficial.org/about/" target="_blank" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 font-bold uppercase text-sm">
                    Heritage & Mission <ChevronRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 rounded-[2rem]">
                <CardHeader>
                  <CardTitle className="text-white uppercase flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-blue-500" />
                    About DeliWer
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400 space-y-4">
                  <p>A UAE-based coordination platform focused on relocation, exit, and settlement journeys through trusted partnerships, not marketplaces.</p>
                  <a href="https://www.deliwer.com/exit" target="_blank" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 font-bold uppercase text-sm">
                    Exit Concierge <ChevronRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS ALLIANCE */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">Why This Alliance Exists</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-slate-900 border border-white/5 rounded-3xl">
              <h3 className="text-amber-500 font-black uppercase mb-4 tracking-widest text-sm">The Risk</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Financial leakage (lost deposits, penalties)</li>
                <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Administrative exposure & time drain</li>
                <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /> Reputational and compliance risk</li>
              </ul>
            </div>
            <div className="p-8 bg-emerald-900/20 border border-emerald-500/20 rounded-3xl">
              <h3 className="text-emerald-500 font-black uppercase mb-4 tracking-widest text-sm">The Solution</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> Debacci acts as a trusted introducer</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> DeliWer assumes full operational responsibility</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> Preserving trust while delivering results</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE PROMOTION & SERVICES */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Services & Distribution</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
              Debacci supports strategic online promotion through its community channels, ensuring DeliWer services reach those who need them most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-white uppercase">Private Channels</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Shared privately via WhatsApp and closed groups, maintaining the discretion expected by community members.
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-white uppercase">Contextual Support</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Introduced specifically when members are relocating or exiting, providing support exactly when it's needed.
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-white uppercase">Direct Execution</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                All client communication and execution is handled directly by DeliWer, separate from Debacci operational involvement.
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="https://debaccicapital.com/online-promotion/" 
              target="_blank"
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-black uppercase tracking-widest text-sm"
            >
              View Promotion Framework <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CORE OFFER - EXIT CONCIERGE */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Exit Concierge Benefits</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Priority Handling</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-4">
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Concierge-grade support</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Priority response times</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Dedicated coordinator</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Full Discretion</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-4">
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Confidential coordination</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Private member handling</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Non-public advertisement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Exclusive Rates</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-4">
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full" /> 20% Discount for members</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full" /> Code: {REF_CODE}</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full" /> Instant application</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FOR MEMBERS */}
      <section className="py-24 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Onboarding for <br />Debacci Members</h2>
              <p className="text-xl text-gray-400 mb-12">
                If you are a member of the Debacci Noble Family Community planning to leave Dubai or managing an investment transition:
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  "Planning to leave Dubai",
                  "Managing executive/founder relocation",
                  "Supporting family/investment transition"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-slate-950 border border-white/5 rounded-2xl">
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                    <p className="text-gray-300 font-bold">{item}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-xl">
                <h4 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-500" />
                  Requesting Your Consultation
                </h4>
                <div className="space-y-4">
                  {[
                    "Prepare your referral code: " + REF_CODE,
                    "Click the button to open WhatsApp",
                    "Send the pre-filled message",
                    "A coordinator will reach out for a private brief"
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
                <p className="mt-8 text-sm uppercase tracking-widest text-gray-400">Exclusive Priority Link</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MUTUAL ENDORSEMENT */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-12" />
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Mutual Endorsement</h2>
          <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] mb-16 space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed italic">
              "DeliWer acknowledges Debacci as a trusted international community partner. Debacci recognizes DeliWer as a reliable coordination platform for Dubai exit and relocation support."
            </p>
            <p className="text-lg text-emerald-500 font-bold uppercase tracking-widest">
              This alliance is built on trust, discretion, and long-term alignment.
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            Request Confidential Consultation
          </Button>
          
          <p className="mt-12 text-gray-500 text-sm uppercase tracking-[0.2em]">
            This page is intended for private community reference and strategic collaboration.
          </p>
        </div>
      </section>
    </div>
  );
}
