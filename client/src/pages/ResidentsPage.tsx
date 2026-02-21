import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Droplets, Wind, Home, ShieldCheck } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Navigation } from "@/components/navigation";
import homeSetupImg from "@/assets/images/home-setup.jpg";
import moveInImg from "@/assets/images/move-in.jpg";
import conciergeImg from "@/assets/images/concierge.jpg";

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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest animate-pulse">
            <ShieldCheck size={14} />
            Official Activation Partner
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            {content.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-tight font-medium">
            {content.subheadline}
          </p>
          <div className="pt-4 space-y-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-8 text-xl font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.05] active:scale-[0.95] w-full md:w-auto"
              onClick={() => window.location.href = "/relocate#activation"}
            >
              {content.cta}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">
              {content.subtext}
            </p>
          </div>
        </div>

        {/* How DeliWer Works */}
        <div className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm rounded-[3rem] px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">How DeliWer Works</h2>
            <p className="text-gray-400 text-lg md:text-xl leading-snug font-medium">
              DeliWer exists to coordinate and plan — before problems turn into stress. 
              We work with movers, technicians, and service providers, but you only deal with us.
            </p>
          </div>
        </div>

        {/* Stage by Stage Breakdown */}
        <div className="space-y-32">
          {/* 1. Home Setup */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
                Stage 1
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Home Setup</h2>
              <div className="space-y-8">
                <div className="space-y-3 group">
                  <h4 className="font-black text-white text-xl uppercase tracking-tight flex items-center gap-3 group-hover:text-emerald-400 transition-colors">
                    <Droplets className="text-emerald-500" size={24} />
                    Water Purity
                  </h4>
                  <p className="text-gray-400 leading-snug font-medium">
                    Pre-move water testing and high-performance filtration to ensure your family's safety from Day 1.
                  </p>
                </div>
                <div className="space-y-3 group">
                  <h4 className="font-black text-white text-xl uppercase tracking-tight flex items-center gap-3 group-hover:text-emerald-400 transition-colors">
                    <Wind className="text-emerald-500" size={24} />
                    Air Quality
                  </h4>
                  <p className="text-gray-400 leading-snug font-medium">
                    AC sanitization and air quality monitoring to eliminate Dubai dust and allergens before you settle.
                  </p>
                </div>
                <div className="space-y-3 group">
                  <h4 className="font-black text-white text-xl uppercase tracking-tight flex items-center gap-3 group-hover:text-emerald-400 transition-colors">
                    <Home className="text-emerald-500" size={24} />
                    Essential Setup
                  </h4>
                  <p className="text-gray-400 leading-snug font-medium">
                    From DEWA guidance to essential starter kits. We handle the friction so you can enjoy the keys.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-square shadow-2xl shadow-emerald-500/10">
                <img src={homeSetupImg} alt="Home Setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* 2. Move-in / Move-out */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="md:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
                Stage 2
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Move-in / Move-out</h2>
              <p className="text-gray-400 text-lg md:text-xl leading-snug font-medium">
                We manage the planning and vendor coordination around your move — before, during, and after moving day. 
                No trucks, no packing, just orchestration.
              </p>
              <ul className="space-y-4">
                {[
                  "Utility connections & disconnections",
                  "Home setup or clearance planning",
                  "Vendor scheduling & timelines",
                  "Furniture / appliance coordination",
                  "Single point of contact"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-base font-black uppercase tracking-tight text-white group cursor-default">
                    <CheckCircle2 size={20} className="text-emerald-500 transition-transform group-hover:scale-125" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:order-1 relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-square shadow-2xl shadow-emerald-500/10">
                <img src={moveInImg} alt="Move In" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* 3. Life Concierge */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
                Stage 3
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Life Concierge</h2>
              <p className="text-gray-400 text-lg md:text-xl leading-snug font-medium">
                Life Concierge handles the things that don’t clearly fall under moving or maintenance. 
                If it needs outside help, coordination, or fast action — we manage it for you.
              </p>
              <Button 
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-8 py-6 text-lg font-black uppercase tracking-widest rounded-2xl backdrop-blur-md transition-all"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <SiWhatsapp className="mr-3 h-5 w-5 text-emerald-500" />
                Talk to Life Concierge
              </Button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-square shadow-2xl shadow-emerald-500/10">
                <img src={conciergeImg} alt="Life Concierge" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-24 text-center text-white space-y-10 shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Droplets size={300} />
          </div>
          <h2 className="text-4xl md:text-7xl font-black leading-[0.9] uppercase tracking-tighter italic relative z-10">
            Secure Your Dubai <br />Move-In Experience.
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10">
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-10 py-8 text-xl font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
              onClick={() => window.location.href = "/relocate#activation"}
            >
              See Activation Packages
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-10 py-8 text-xl font-black uppercase tracking-widest rounded-2xl backdrop-blur-sm"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <SiWhatsapp className="mr-3 h-6 w-6" />
              Chat with Concierge
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 text-emerald-100/60 text-sm font-black uppercase tracking-widest">
            <CheckCircle2 size={18} />
            No hidden fees. ECO-certified partners.
          </div>
        </div>
      </main>

      {/* Floating WhatsApp - Mobile Optimized */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 h-16 w-16 md:h-20 md:w-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-110 active:scale-95 z-50 group border-4 border-white/10 backdrop-blur-md"
      >
        <SiWhatsapp size={36} />
        <span className="absolute right-full mr-6 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap translate-x-4 group-hover:translate-x-0">
          Chat with us
        </span>
      </a>

      <footer className="py-16 px-6 text-center text-gray-500 text-xs font-black uppercase tracking-[0.2em] border-t border-white/5 bg-slate-950">
        <p>© 2026 DeliWer. Built for sustainable Dubai living.</p>
      </footer>
    </div>
  );
}
