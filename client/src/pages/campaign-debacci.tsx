import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
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
  Shield,
  Building,
  Sparkles,
  ChevronRight,
  Globe
} from "lucide-react";
import { useEffect } from "react";

export default function CampaignDeBacciPage() {
  const WHATSAPP_NUMBER = "+971523946311";
  const CEO_NUMBER = "+971523906019";
  const REF_CODE = "DEBACCI20";
  
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(`Hello DeliWer, I am interested in the Exit Concierge service. Referral Code: ${REF_CODE}`)}`;

  useEffect(() => {
    // Hide top navigation and footer if needed, though they are usually in App.tsx
    // For this specific page, we'll use a local layout that doesn't include them if possible.
    // However, App.tsx wraps everything. We can use CSS to hide them.
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const stickyHeader = document.querySelector('[class*="sticky"]');
    
    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (stickyHeader) (stickyHeader as HTMLElement).style.display = 'none';

    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
      if (stickyHeader) (stickyHeader as HTMLElement).style.display = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="DeliWer Exit Concierge | Exclusive DeBacci Community Offer"
        description="Leaving Dubai? Exit cleanly and confidently with DeliWer's exclusive Exit Concierge for DeBacci community members. 20% discount included."
      />

      {/* 🔥 HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex justify-center items-center gap-6 mb-12">
            <img src="/deliwer-logo.png" alt="DeliWer" className="h-10 w-auto brightness-110" />
            <div className="h-8 w-px bg-white/20" />
            <div className="text-xl font-serif tracking-[0.2em] uppercase text-white/60">De Bacci Group</div>
          </div>

          <Badge className="mb-8 bg-amber-500 text-black border-none py-2 px-6 rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            Exclusive: 20% Community Discount
          </Badge>

          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 leading-[0.85] text-white">
            Leaving Dubai? <br />
            <span className="text-emerald-500">Exit Cleanly.</span> <br />
            Exit Confidently.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            An exclusive Exit Concierge service by DeliWer for <span className="text-amber-500">DeBacci Community</span> members leaving Dubai for their next chapter.
          </p>

          <Button 
            size="lg" 
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full px-12 h-20 text-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 group"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            <MessageSquare className="mr-3 h-8 w-8 fill-slate-950" />
            Claim My 20% Discount
          </Button>
          
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gray-500 font-bold">Use code: {REF_CODE}</p>
        </div>
      </section>

      {/* 🧠 WHY THIS SERVICE SOLVES */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Why Leaving Dubai Is Risky Without Support</h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "Security deposits delayed or lost",
              "DEWA & internet left open → surprise bills",
              "Landlord handovers mishandled",
              "Too many vendors, zero accountability",
              "Time pressure before departure"
            ].map((pain, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-slate-950/50 rounded-2xl border border-white/5 group hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">{pain}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center">
            <p className="text-2xl font-black text-emerald-400">👉 DeliWer replaces all of this with one exit partner.</p>
          </div>
        </div>
      </section>

      {/* 🧰 WHAT DELIWER HANDLES */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">What DeliWer Handles</h2>
            <p className="text-gray-400 uppercase tracking-widest font-bold">Your Core Offer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Property */}
            <div className="bg-slate-900/50 rounded-[2.5rem] p-10 border border-white/5 hover-elevate transition-all">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
                <Building className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-6 leading-tight">Deposit & Property Handover</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-emerald-500" />
                  Move-out cleaning coordination
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-emerald-500" />
                  Landlord / agent handover support
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-emerald-500" />
                  Deposit recovery focus
                </li>
              </ul>
            </div>

            {/* Utilities */}
            <div className="bg-slate-900/50 rounded-[2.5rem] p-10 border border-white/5 hover-elevate transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-6 leading-tight">Utility & Account Closures</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                  DEWA
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                  Internet / telecom
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                  Final bill settlements
                </li>
              </ul>
            </div>

            {/* Global */}
            <div className="bg-slate-900/50 rounded-[2.5rem] p-10 border border-white/5 hover-elevate transition-all">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-6 leading-tight">Next-Destination Support</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-amber-500" />
                  Introductions to trusted global movers
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-medium">
                  <ChevronRight className="w-5 h-5 text-amber-500" />
                  US, UK, EU, Singapore & more
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 👥 WHO THIS IS FOR */}
      <section className="py-24 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-12 tracking-tighter">This service is ideal if you are:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "A professional relocating out of Dubai",
              "A founder closing one chapter, opening another",
              "An employee on a global move",
              "A family wrapping up a lease & utilities"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 text-left font-bold text-gray-300">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <p className="mt-12 text-2xl font-serif italic text-amber-500">If time, money, and peace of mind matter — this is for you.</p>
        </div>
      </section>

      {/* 🎁 DEBACCI COMMUNITY DISCOUNT */}
      <section className="py-24 px-4 bg-emerald-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-slate-900 p-12 rounded-[3rem] border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full -mr-16 -mt-16" />
              
              <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter">Debacci Community Benefit</h2>
              <div className="space-y-6 mb-12">
                {[
                  "20% off DeliWer Exit Concierge",
                  "Priority handling",
                  "Confidential coordination"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-slate-900" />
                    </div>
                    <span className="text-xl font-bold text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500/60">How to Redeem</h3>
                <div className="space-y-4">
                  {[
                    "Click “Claim My 20% Discount”",
                    "Chat with DeliWer on WhatsApp",
                    "Mention code DEBACCI20",
                    "Discount applied instantly"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 text-gray-400 font-medium">
                      <span className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-xs font-bold">{i+1}</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="bg-white p-8 inline-block rounded-[2.5rem] shadow-[0_0_50px_rgba(255,255,255,0.1)] mb-8 transform hover:rotate-2 transition-transform duration-500">
                <img 
                  src={qrCodeImage} 
                  alt="Scan to Claim" 
                  className="w-64 h-64 object-contain"
                />
                <p className="mt-4 text-slate-950 font-black text-xl italic font-serif">Scan to Claim</p>
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Ready to Start?</h3>
              <p className="text-xl text-gray-400 mb-8 max-w-md">Our team handles the stress. You focus on what's next.</p>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full px-12 h-16 text-xl transition-all w-full"
                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
              >
                Claim My 20% Discount
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 🤝 TRUST & DELIVERY */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Users, label: "UAE-based Team" },
              { icon: Shield, label: "Single Point Accountable" },
              { icon: Lock, label: "Confidential Handling" },
              { icon: Star, label: "Trusted Partners" }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-emerald-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-16 border-t border-white/5">
            <p className="text-gray-500 italic font-serif text-lg mb-2">Shared by Debacci as a community benefit.</p>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">Service delivery managed by DeliWer.</p>
          </div>
        </div>
      </section>

      {/* 🔁 FINAL CTA */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full transform translate-y-1/2" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-none">
            Don’t Leave Dubai <br />
            With Loose Ends
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full px-16 h-24 text-3xl shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            >
              <MessageSquare className="mr-4 h-10 w-10 fill-slate-950" />
              Claim My 20% Discount
            </Button>
            <p className="text-lg font-black text-emerald-500 uppercase tracking-[0.3em]">Use code: {REF_CODE}</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <Button 
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full h-16 text-lg shadow-2xl"
          onClick={() => window.open(WHATSAPP_LINK, '_blank')}
        >
          Claim 20% Discount
        </Button>
      </div>
    </div>
  );
}

function X(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
