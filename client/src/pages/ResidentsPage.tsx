import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Droplets, Wind, Home, ShieldCheck } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ResidentsPage() {
  const [location] = useLocation();
  const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, [location]);

  const source = params.get("source");

  const getContent = () => {
    switch (source) {
      case "handover":
        return {
          headline: "Welcome, New Dubai Resident.",
          subheadline: "You’ve received your keys. Now let’s activate your home properly.",
          cta: "Activate My Home Today",
          subtext: "First 72 hours matter most.",
          whatsapp: "Hi DeliWer, I just received my apartment handover and want to activate my home."
        };
      case "relocation":
        return {
          headline: "Just Moved to Dubai?",
          subheadline: "Start your new life with clean water, healthy air, and essential setup.",
          cta: "Start My Setup",
          subtext: "Dubai water & air quality is different.",
          whatsapp: "Hi DeliWer, I just moved to Dubai and need home setup support."
        };
      case "ad":
        return {
          headline: "Dubai Apartment Handover Made Simple.",
          subheadline: "Professional activation services for your new home.",
          cta: "Book Activation Visit",
          subtext: "Eco-friendly, fast, and reliable.",
          whatsapp: "Hi DeliWer, I want to book home activation."
        };
      case "investor":
        return {
          headline: "Maximize Your Dubai Investment.",
          subheadline: "Ready your property for tenants with our premium activation package.",
          cta: "Prepare My Property",
          subtext: "Protect your asset from day one.",
          whatsapp: "Hi DeliWer, I'm an investor and want to prepare my property for handover."
        };
      default:
        return {
          headline: "Got Your Apartment Keys in Dubai?",
          subheadline: "The essential first step before you move in. Clean water, healthy air.",
          cta: "Activate My Home",
          subtext: "Trusted by 500+ residents.",
          whatsapp: "Hi DeliWer, I want to book home activation."
        };
    }
  };

  const content = getContent();
  const whatsappUrl = `https://wa.me/971523946311?text=${encodeURIComponent(content.whatsapp)}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation - Simple & Clean */}
      <nav className="border-b border-slate-100 py-4 px-6 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="font-black text-2xl tracking-tighter text-[#0f766e]">DELIWER</span>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => window.location.href = "/"}>
            Back to Home
          </Button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0f766e] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            Official Activation Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {content.subheadline}
          </p>
          <div className="pt-4 space-y-4">
            <Button 
              size="lg" 
              className="bg-[#0f766e] hover:bg-[#0d625b] text-white px-8 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-emerald-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto"
              onClick={() => window.location.href = "/relocate#activation"}
            >
              {content.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm font-medium text-emerald-600/80 italic">
              {content.subtext}
            </p>
          </div>
        </div>

        {/* How DeliWer Works */}
        <div className="py-12 border-t border-slate-100">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">How DeliWer Works</h2>
            <p className="text-slate-600 leading-relaxed">
              DeliWer exists to coordinate and plan — before problems turn into stress. 
              We work with movers, technicians, and service providers, but you only deal with us.
            </p>
          </div>
        </div>

        {/* Stage by Stage Breakdown */}
        <div className="space-y-24 pt-12">
          {/* 1. Home Setup */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0f766e] text-xs font-bold uppercase tracking-wider">
                Stage 1
              </div>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight">Home Setup</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Droplets className="text-[#0f766e]" size={18} />
                    Water Purity
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Pre-move water testing and high-performance filtration to ensure your family's safety from Day 1.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Wind className="text-[#0f766e]" size={18} />
                    Air Quality
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    AC sanitization and air quality monitoring to eliminate Dubai dust and allergens before you settle.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Home className="text-[#0f766e]" size={18} />
                    Essential Setup
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    From DEWA guidance to essential starter kits. We handle the friction so you can enjoy the keys.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-[2rem] aspect-square flex items-center justify-center p-12">
              <ShieldCheck size={120} className="text-emerald-200" />
            </div>
          </div>

          {/* 2. Move-in / Move-out */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0f766e] text-xs font-bold uppercase tracking-wider">
                Stage 2
              </div>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight">Move-in / Move-out</h2>
              <p className="text-slate-600 leading-relaxed">
                We manage the planning and vendor coordination around your move — before, during, and after moving day. 
                No trucks, no packing, just orchestration.
              </p>
              <ul className="space-y-3">
                {[
                  "Utility connections & disconnections",
                  "Home setup or clearance planning",
                  "Vendor scheduling & timelines",
                  "Furniture / appliance coordination",
                  "Single point of contact"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:order-1 bg-slate-50 rounded-[2rem] aspect-square flex items-center justify-center p-12">
              <Home size={120} className="text-emerald-200" />
            </div>
          </div>

          {/* 3. Life Concierge */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0f766e] text-xs font-bold uppercase tracking-wider">
                Stage 3
              </div>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight">Life Concierge</h2>
              <p className="text-slate-600 leading-relaxed">
                Life Concierge handles the things that don’t clearly fall under moving or maintenance. 
                If it needs outside help, coordination, or fast action — we manage it for you.
              </p>
              <Button 
                variant="outline" 
                className="border-[#0f766e] text-[#0f766e] hover:bg-emerald-50 rounded-xl"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Talk to Life Concierge
              </Button>
            </div>
            <div className="bg-slate-50 rounded-[2rem] aspect-square flex items-center justify-center p-12">
              <SiWhatsapp size={120} className="text-emerald-200" />
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#0f766e] rounded-[2.5rem] p-8 md:p-16 text-center text-white space-y-8 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Droplets size={200} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight relative z-10">
            Secure Your Dubai <br />Move-In Experience.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Button 
              size="lg" 
              className="bg-white text-[#0f766e] hover:bg-emerald-50 px-8 py-7 text-lg font-bold rounded-2xl transition-all"
              onClick={() => window.location.href = "/relocate#activation"}
            >
              See Activation Packages
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-7 text-lg font-bold rounded-2xl backdrop-blur-sm"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <SiWhatsapp className="mr-2 h-5 w-5" />
              Chat with Concierge
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-emerald-100/60 text-sm font-medium">
            <CheckCircle2 size={16} />
            No hidden fees. ECO-certified partners.
          </div>
        </div>
      </main>

      {/* Floating WhatsApp - Mobile Optimized */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 h-14 w-14 md:h-16 md:w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/40 transition-transform hover:scale-110 active:scale-95 z-50 group"
      >
        <SiWhatsapp size={32} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat with us
        </span>
      </a>

      <footer className="py-12 px-6 text-center text-slate-400 text-sm border-t border-slate-50">
        <p>© 2026 DeliWer. Built for sustainable Dubai living.</p>
      </footer>
    </div>
  );
}
