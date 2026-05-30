import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import qrCodeImage from "@assets/DeliWer_Debacci_QRCode_1768848760432.png";
import { 
  MessageSquare, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  AlertTriangle,
  Globe2,
  Lock,
  Handshake,
  Share2
} from "lucide-react";

export default function CampaignDeBacciPage() {
  const WHATSAPP_NUMBER = "+971523946311";
  const REF_CODE = "DEBACCI20";
  
  // Targeted WhatsApp messages for different scenarios
  const getWhatsAppLink = (type: 'direct' | 'referral' | 'consult') => {
    let text = "";
    switch(type) {
      case 'direct':
        text = `Hello DeliWer, I am a Debacci member interested in the Exit Concierge service. Referral Code: ${REF_CODE}`;
        break;
      case 'referral':
        text = `Hello DeliWer, I would like to refer a colleague/family member from the Debacci network for the Exit Concierge service. My Referral Code: ${REF_CODE}`;
        break;
      case 'consult':
        text = `Hello, I need a confidential consultation regarding a relocation/exit transition. Referral Code: ${REF_CODE}`;
        break;
    }
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="DeliWer × Debacci | Elite Exit Strategy"
        description="Lean, discrete relocation and exit coordination for the Debacci Noble Family network."
      />
      
      {/* Lean Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex justify-center items-center gap-6 mb-8 opacity-80 scale-90">
            <img src="/deliwer-logo.png" alt="DeliWer" className="h-10 w-auto" />
            <div className="h-8 w-px bg-white/20" />
            <div className="text-xl font-serif tracking-widest uppercase">De Bacci Noble Family</div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            Elite Exit <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Coordination.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lean methodology for high-stakes transitions. 
            Heritage-grade trust. Precision execution.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-10 h-16 text-lg shadow-xl transition-all"
              onClick={() => window.open(getWhatsAppLink('direct'), '_blank')}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Direct Support
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 font-black rounded-xl px-10 h-16 text-lg hover:bg-emerald-500/10 transition-all"
              onClick={() => window.open(getWhatsAppLink('referral'), '_blank')}
            >
              <Share2 className="mr-2 h-5 w-5" />
              Refer a Member
            </Button>
          </div>
        </div>
      </section>

      {/* Targeted Referral & Service Grid */}
      <section className="py-16 px-4 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* The Alliance - Compressed */}
            <div className="p-8 bg-slate-900 border border-white/5 rounded-3xl">
              <div className="flex items-center gap-3 text-amber-500 mb-6">
                <Handshake className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase tracking-tight">The Alliance</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Protecting Debacci members during jurisdictional exits, founder relocations, and investment repositioning. 
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-gray-500 mb-1 font-bold">Risk Management</p>
                  <p className="text-xs text-red-400 font-medium">Financial Leakage</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-gray-500 mb-1 font-bold">Operational</p>
                  <p className="text-xs text-emerald-400 font-medium">Full Execution</p>
                </div>
              </div>
            </div>

            {/* Elite Benefits - Compressed */}
            <div className="p-8 bg-emerald-950/20 border border-emerald-500/20 rounded-3xl">
              <div className="flex items-center gap-3 text-emerald-500 mb-6">
                <Zap className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase tracking-tight">Member Benefits</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "20% Flat Discount (Code: DEBACCI20)",
                  "Priority Concierge Handling",
                  "Full Administrative Closure",
                  "Confidential Deposit Recovery"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding & Referral Link Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Instant Onboarding</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm mb-1">Define Scope</h4>
                  <p className="text-gray-400 text-sm">WhatsApp us the member details or your own exit requirements.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm mb-1">Private Brief</h4>
                  <p className="text-gray-400 text-sm">A dedicated coordinator will conduct a confidential brief.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm mb-1">Execution</h4>
                  <p className="text-gray-400 text-sm">DeliWer handles all closures, handovers, and moves.</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/20 font-black rounded-xl h-16 mt-6"
                onClick={() => window.open(getWhatsAppLink('consult'), '_blank')}
              >
                Start Confidential Briefing
              </Button>
            </div>

            <div className="p-6 bg-slate-900 border border-white/5 rounded-[2.5rem] text-center">
              <p className="text-amber-500 font-serif italic mb-6">Scan for Immediate Link</p>
              <div className="bg-white p-3 inline-block rounded-2xl mb-4">
                <img 
                  src={qrCodeImage} 
                  alt="WhatsApp Referral Link" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              <p className="text-[10px] uppercase text-gray-500 tracking-widest font-black">Private Network Key</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lean Footer */}
      <footer className="py-12 px-4 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto opacity-60">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
          <p className="text-xs text-gray-400 leading-relaxed italic uppercase tracking-wider">
            DeliWer × Debacci Noble Family Alliance <br />
            Confidentiality Guaranteed | UAE & Global Reach
          </p>
        </div>
      </footer>
    </div>
  );
}
