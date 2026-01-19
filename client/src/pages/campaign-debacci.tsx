import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Plane, 
  ArrowRight,
  Shield,
  Clock,
  ExternalLink
} from "lucide-react";
import { useEffect } from "react";

export default function CampaignDeBacci() {
  // UTM source tracking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source');
    if (source) {
      console.log(`Campaign source: ${source}`);
    }
  }, []);

  const whatsappLink = "https://wa.me/971523946311?text=I%20saw%20DeliWer%20on%20DeBacci%20and%20need%20help%20with%20my%20Dubai%20exit";

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80" 
            alt="Dubai Skyline"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium animate-pulse">
            <ShieldCheck className="w-4 h-4" />
            Priority Exit Concierge
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Leaving Dubai Soon? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Don’t Lose Your Deposit or Weeks on Admin.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            DeliWer Exit Concierge helps professionals, founders, and families close their Dubai chapter <span className="text-white font-semibold">cleanly, compliantly, and stress-free.</span>
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-lg px-8 py-7 rounded-full shadow-2xl shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <MessageSquare className="w-6 h-6 mr-3 fill-current" />
              Chat on WhatsApp – Priority Support
            </Button>
            <p className="text-slate-500 text-sm italic flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              This page is shared by trusted partners.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partners Share Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Partners Share DeliWer Exit Concierge</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Dubai exits are chaotic, time-sensitive, and risky",
                "Deposits get delayed or lost",
                "Utilities remain open, causing liabilities",
                "People leave without closure or documentation"
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-colors group">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-slate-300 font-medium">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
              <p className="text-emerald-400 font-bold text-xl">DeliWer fixes this in one coordinated service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Offer Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What We Take Off Your Plate</h2>
          <p className="text-slate-400">Complete end-to-end management for a smooth departure.</p>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900 border-white/5 hover:border-emerald-500/50 transition-all hover:-translate-y-2 group">
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Deposit & Handover Protection</h3>
                <ul className="space-y-3 text-slate-400 text-left">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Final cleaning coordination</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Landlord handover support</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Deposit recovery focus</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-white/5 hover:border-cyan-500/50 transition-all hover:-translate-y-2 group">
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Utility & Account Closures</h3>
                <ul className="space-y-3 text-slate-400 text-left">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> DEWA settlements</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Internet / Telecom closure</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Final bill clearances</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-white/5 hover:border-indigo-500/50 transition-all hover:-translate-y-2 group">
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plane className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Next-Destination Support</h3>
                <ul className="space-y-3 text-slate-400 text-left">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Introductions to global movers</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Support for US, UK, EU, SG & more</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Seamless coordination</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">This Service Is Ideal For:</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Professionals exiting Dubai",
                "Founders relocating to a new market",
                "Employees on global mobility plans",
                "Families wrapping up leases & utilities"
              ].map((tag, idx) => (
                <div key={idx} className="px-6 py-3 rounded-full bg-slate-800 border border-white/10 text-slate-300 font-medium hover:bg-slate-700 transition-colors">
                  {tag}
                </div>
              ))}
            </div>
            <p className="mt-12 text-xl text-slate-400">
              If time matters and mistakes are costly — <span className="text-white font-bold underline decoration-emerald-500 underline-offset-4">this is for you.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Why Partners Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-500">UAE-Based</div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Coordination Team</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-500">Confidential</div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Handling</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-indigo-500">Single Point</div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Of Accountability</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-500">Built for Dubai</div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Exit Specifics</p>
            </div>
          </div>
          <div className="mt-16 text-center text-slate-500 italic">
            DeliWer works with trusted logistics and service partners for execution.
          </div>
        </div>
      </section>

      {/* Referral Context Section */}
      <section className="py-24 bg-emerald-600/5 border-y border-emerald-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold text-emerald-400">Shared by Our Partner Network</h2>
            <p className="text-slate-300 leading-relaxed">
              This page is shared by trusted partners such as <span className="text-white font-bold">Debacci</span> to help their community exit Dubai smoothly.
            </p>
            <p className="text-slate-400 text-sm">
              Service delivery and coordination are handled by <span className="font-semibold text-slate-300">DeliWer</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600/20 blur-[120px] rounded-full translate-y-1/2" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12">Don’t Leave Dubai With Loose Ends</h2>
          <div className="flex flex-col items-center gap-8">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xl px-12 py-8 rounded-full shadow-2xl shadow-emerald-600/30 transition-all hover:scale-110 active:scale-95 group"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <MessageSquare className="w-8 h-8 mr-4 fill-current" />
              Chat on WhatsApp Now
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-400">
              <a href="mailto:service@deliwer.com" className="hover:text-white transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" /> service@deliwer.com
              </a>
              <a href="/relocate/exit" className="hover:text-white transition-colors flex items-center gap-2 underline underline-offset-4">
                <ExternalLink className="w-4 h-4" /> View Service Details
              </a>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Available 24/7
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp for Mobile */}
      <div className="fixed bottom-6 right-6 z-[100] md:hidden">
        <button 
          onClick={() => window.open(whatsappLink, '_blank')}
          className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 active:scale-90 transition-transform"
        >
          <MessageSquare className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}
