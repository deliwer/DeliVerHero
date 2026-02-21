import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Droplets, Wind, Home, ShieldCheck, Clock, MessageSquare, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Navigation } from "@/components/navigation";
import { Helmet } from "react-helmet";
import homeSetupImg from "@/assets/images/home-setup.jpg";
import moveInImg from "@/assets/images/move-in.jpg";
import conciergeImg from "@/assets/images/concierge.jpg";

export default function ResidentsPage() {
  const [location] = useLocation();
  const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, [location]);

  const stage = params.get("stage");

  const getContent = () => {
    if (stage === "ejari") {
      return {
        headline: "Ejari Completed? Here’s What Every Dubai Tenant Does Next.",
        subheadline: "Before DEWA activation and unpacking chaos, activate your apartment properly.",
        cta: "Start Move-In Activation (AED 399)",
        whatsapp: "Hi DeliWer, I just completed Ejari and want to prepare my apartment before moving in."
      };
    } else if (stage === "handover") {
      return {
        headline: "Got Your Keys? Activate Your Home the Right Way.",
        subheadline: "The standard preparation visit before you settle into your new apartment.",
        cta: "Start Move-In Activation (AED 399)",
        whatsapp: "Hi DeliWer, I just received my keys and want to activate my home."
      };
    }
    return {
      headline: "Moving Into a New Apartment in Dubai?",
      subheadline: "The standard preparation visit before you settle into your new apartment.",
      cta: "Start Move-In Activation (AED 399)",
      whatsapp: "Hi DeliWer, I want to book a move-in activation visit."
    };
  };

  const content = getContent();
  const whatsappUrl = `https://wa.me/971523946311?text=${encodeURIComponent(content.whatsapp)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      <Helmet>
        <title>Move-In Activation After Ejari in Dubai | DeliWer</title>
        <meta name="description" content="Completed Ejari in Dubai? Book DeliWer’s Move-In Activation visit before settling in. Water, air, essentials setup. Cash on visit." />
      </Helmet>

      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
            <ShieldCheck size={14} />
            Standard Dubai Procedure
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            {content.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-tight font-medium">
            {content.subheadline}
          </p>
          <div className="pt-4 flex flex-col items-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-8 text-xl font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.05] active:scale-[0.95] w-full md:w-auto"
              onClick={() => window.location.href = "/relocate#activation"}
              data-testid="button-hero-activation"
            >
              {content.cta}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              variant="link"
              className="text-emerald-400 font-black uppercase tracking-widest hover:text-emerald-300"
              onClick={() => window.location.href = "/relocate"}
              data-testid="link-all-packages"
            >
              👉 View All Relocation Packages
            </Button>
          </div>
        </div>

        {/* Normalization Section */}
        <div className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm rounded-[3rem] px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
                The First 72 Hours Decide Everything.
              </h2>
              <p className="text-emerald-400 font-bold uppercase tracking-widest">
                Don't settle in until you activate.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: <Droplets className="text-emerald-500" />, text: "Water quality differences in Dubai" },
                { icon: <Wind className="text-emerald-500" />, text: "AC systems rarely cleaned before move-in" },
                { icon: <ShieldCheck className="text-emerald-500" />, text: "Shower filtration overlooked" },
                { icon: <Zap className="text-emerald-500" />, text: "Vendor overload" },
                { icon: <MessageSquare className="text-emerald-500" />, text: "No single trusted contact" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  {item.icon}
                  <span className="font-bold text-gray-200">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <p className="text-xl md:text-2xl font-black text-white uppercase italic underline decoration-emerald-500 underline-offset-8">
                Most tenants now begin with a Move-In Activation visit.
              </p>
            </div>
          </div>
        </div>

        {/* Activation Detail Section */}
        <div id="activation" className="grid md:grid-cols-2 gap-16 items-center bg-emerald-950/20 border border-emerald-500/20 rounded-[3rem] p-8 md:p-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
              Standard Move-In
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
              Dubai Move-In Activation — AED 399
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-snug font-medium italic">
              "This is the standard preparation visit before you settle into your new apartment."
            </p>
            <ul className="space-y-4">
              {[
                "Water readiness check",
                "Shower filter installation",
                "Basic AC filter clean",
                "Essentials setup guidance",
                "Direct WhatsApp support"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-black uppercase tracking-tight text-white">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-6 pt-4">
              <p className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={16} /> Cash or transfer on visit. No online payment required.
              </p>
              <Button 
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-8 text-xl font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all w-full"
                onClick={() => window.location.href = "/relocate#activation"}
                data-testid="button-book-activation"
              >
                👉 Book Activation Now
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-50 transition-opacity"></div>
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-square shadow-2xl">
              <img src={homeSetupImg} alt="Activation Visit" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Journey Flow */}
        <div className="space-y-16 py-12">
          <h2 className="text-center text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
            Your Journey With DeliWer
          </h2>
          
          <div className="relative max-w-5xl mx-auto px-4 overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex items-center justify-between min-w-[800px] relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
              
              {[
                "Ejari", "Activation", "Water Service", "Ongoing Support", "Sustainable Living"
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-4 bg-slate-950 px-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-black text-white shadow-lg shadow-emerald-500/20">
                    {i + 1}
                  </div>
                  <span className="font-black uppercase tracking-widest text-xs text-white whitespace-nowrap">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center space-y-8">
            <p className="text-gray-400 font-bold uppercase tracking-widest italic">
              DeliWer stays with you beyond move-in.
            </p>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-black uppercase tracking-widest rounded-2xl"
              onClick={() => window.location.href = "/relocate"}
              data-testid="link-explore-plans"
            >
              Explore Resident & Relocation Plans
            </Button>
          </div>
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-12 border-t border-white/10">
          {[
            { label: "Dubai Focused", sub: "Local Expertise" },
            { label: "WhatsApp First", sub: "Instant Support" },
            { label: "Founder Led", sub: "Direct Accountability" },
            { label: "Sustainable", sub: "Water Expertise" }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="text-xl font-black text-white uppercase tracking-tighter italic">{item.label}</div>
              <div className="text-xs font-black text-emerald-500 uppercase tracking-widest">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="text-center pb-12">
          <p className="text-gray-500 text-sm font-black uppercase tracking-widest italic">
            Designed for tenants who want to move in the right way.
          </p>
        </div>
      </main>

      {/* Floating WhatsApp */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 h-16 w-16 md:h-20 md:w-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-110 active:scale-95 z-50 group border-4 border-white/10 backdrop-blur-md"
        data-testid="button-whatsapp-floating"
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
