import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { 
  Zap, MessageSquare, CheckCircle2, Thermometer, Droplets, 
  AlertTriangle, Coins, ShieldCheck, Check, Home as HomeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import relocationHeroPng from "@/assets/images/relocation-hero.jpg";
import nightmarePng from "@/assets/images/nightmare-scenario.jpg";
import expertSupportPng from "@/assets/images/expert-support.jpg";
import waterLifestyleImg from "@/assets/images/water-lifestyle.jpg";
import { DirhamCurrency } from "@/components/dirham-currency";

function HomeServiceIntegration() {
  const handleWhatsApp = (serviceName: string) => {
    const text = `Hi DeliWer, I'm interested in the ${serviceName} assessment for my home. I want to avoid hidden costs and make sure my home is summer-ready!`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const hiddenRisks = [
    { 
      title: "Chiller Inefficiency", 
      description: "Old chiller systems can consume 40% more electricity, leading to shock bills in summer.",
      icon: Zap
    },
    { 
      title: "Appliance Drain", 
      description: "Hidden energy leaks in poorly maintained ACs and appliances are invisible until the bill arrives.",
      icon: AlertTriangle
    },
    { 
      title: "Water Wastage", 
      description: "Undetected micro-leaks and inefficient flow regulators literally flush money away.",
      icon: Droplets
    }
  ];

  const coreOffer = [
    {
      title: "Cooling Readiness",
      icon: Thermometer,
      items: ["Chiller & AC efficiency audit", "Basic AC servicing", "Airflow & cooling efficiency check", "Early fault detection"]
    },
    {
      title: "Water Readiness",
      icon: Droplets,
      items: ["Drinking water starter delivery", "Tap / leak quick check", "Water pressure & wastage scan"]
    },
    {
      title: "Home Readiness",
      icon: HomeIcon,
      items: ["Appliance efficiency check", "Emergency support access", "Maintenance handover summary"]
    }
  ];

  return (
    <>
      {/* HIDDEN RISKS SECTION */}
      <section className="py-24 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">The Risks You Don't See</h2>
            <p className="text-lg text-slate-400 font-medium">Before choosing an apartment or townhouse, understand the hidden factors that drive high bills.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {hiddenRisks.map((risk, i) => (
              <div key={i} className="p-8 bg-slate-900 rounded-[2rem] border border-white/5 space-y-4 hover:border-emerald-500/30 transition-colors">
                <div className="bg-amber-500/10 w-12 h-12 flex items-center justify-center rounded-xl">
                  <risk.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">{risk.title}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE CORE OFFER */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-white">Move-In Summer Ready Pack</h2>
            <p className="text-xl text-emerald-400 font-bold italic">“Detect hidden costs, optimize efficiency, and save with our bundle pack.”</p>
          </div>

          <Card className="border-0 shadow-2xl rounded-[3rem] overflow-hidden bg-slate-900 border-white/5">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter text-white">Bundle Pack Inclusions</h3>
                  <div className="space-y-10 text-white">
                    {coreOffer.map((section, i) => (
                      <div key={i} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-500/10 p-2 rounded-xl">
                            <section.icon className="w-5 h-5 text-emerald-500" />
                          </div>
                          <h4 className="font-black uppercase text-lg">{section.title}</h4>
                        </div>
                        <ul className="space-y-2 ml-10">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-slate-400 font-medium">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-center text-center space-y-8 border-l border-white/5">
                  <div className="space-y-2">
                    <span className="text-slate-400 uppercase font-black tracking-widest text-xs">Summer Ready Assessment Pack</span>
                    <div className="text-5xl md:text-7xl font-black">AED 399</div>
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                      <Coins className="w-4 h-4" />
                      Save 30% with this Bundle
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-8 py-6 border-y border-white/10">
                    <div className="text-center">
                      <div className="text-[10px] uppercase font-black text-slate-500 mb-1">Time</div>
                      <div className="font-bold">2–4 Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase font-black text-slate-500 mb-1">Property</div>
                      <div className="font-bold">Apt • T-House</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black h-16 text-xl rounded-2xl transition-all hover:scale-[1.02]"
                    onClick={() => handleWhatsApp("Summer Ready Pack Booking")}
                  >
                    Protect Your Home
                  </Button>
                  <p className="text-xs text-slate-500 font-medium italic">Avoid surprise bills. Get organized from Day One.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TRUST / LIVING IMAGE SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${waterLifestyleImg})` }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase leading-tight">
            Dubai Living, <span className="text-emerald-400">Organised.</span>
          </h2>
          <p className="text-xl text-slate-200 font-medium mb-12">
            The Chiller system, appliance health, and water efficiency are the foundation of your monthly costs. Don't leave it to chance. Let the Everyday Living Organiser handle the inspection before you commit.
          </p>
          <Button 
            size="lg"
            className="bg-white text-slate-950 font-black rounded-full px-12 h-16 text-lg hover:bg-slate-100 transition-all"
            onClick={() => handleWhatsApp("Consultation")}
          >
            WhatsApp Consultation
          </Button>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check if user has seen onboarding before
  useEffect(() => {
    const seenOnboarding = localStorage.getItem('hero-onboarding-completed');
    // Always mark as seen to prevent automatic onboarding display
    setHasSeenOnboarding(true);
    // Set onboarding as completed if not already
    if (!seenOnboarding) {
      localStorage.setItem('hero-onboarding-completed', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section - Elite Concierge & Risk Mitigation Focus */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${relocationHeroPng})` }}
        />
        <div className="absolute inset-0 z-0 bg-[#0A3D62]/60 backdrop-blur-[0.5px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block px-4 py-1 bg-[#FFC845] text-[#0A3D62] font-black text-sm uppercase tracking-[0.3em] rounded-full">
            Elite Concierge & Risk Mitigation
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white leading-[0.9] drop-shadow-2xl">
            Resident Hub<br />
            <span className="text-emerald-400">Everything for Your Dubai Life.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">Access premium home services, community missions, and exclusive rewards tailored for Dubai residents.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full px-16 h-24 text-2xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] transition-all w-full md:w-auto active-elevate-2 animate-pulse" 
              onClick={() => {
                document.getElementById('summer-ready')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Zap className="w-8 h-8 mr-3" />
              Get Summer Ready
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-full px-12 h-24 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2" 
              onClick={() => window.open('https://wa.me/971523946311?text=I%20want%20to%20avoid%20relocation%20mishandling%20and%20exit%20traps', '_blank')}
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              WhatsApp Help
            </Button>
          </div>
        </div>
      </section>

      <div id="summer-ready">
        <HomeServiceIntegration />
      </div>

      {/* Nightmare vs Success Section */}
      <section className="relative py-32 px-4 overflow-hidden bg-slate-950">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Nightmare Side */}
            <div className="relative group p-8 rounded-3xl bg-red-950/5 border border-red-500/10 backdrop-blur-xl">
               <div className="mb-8">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">The Nightmare</h2>
                  <p className="text-red-200/60">One small oversight at arrival can lead to legal blocks, frozen deposits, and travel bans at exit.</p>
               </div>
               <div className="space-y-4">
                  {[
                    { title: "JURISDICTION MISALIGNMENT", desc: "Contracts that don't protect your move-out rights." },
                    { title: "Utility Liability", desc: "Accumulated bills hidden in unclosed accounts." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-red-950/10 border border-red-500/20 rounded-xl">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</h3>
                        <p className="text-gray-400 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                  <img src={nightmarePng} alt="Nightmare scenario" className="rounded-2xl border border-white/5 shadow-2xl h-48 w-full object-cover" />
               </div>
            </div>

            {/* Success Side */}
            <div className="relative group p-8 rounded-3xl bg-emerald-950/5 border border-emerald-500/10 backdrop-blur-xl">
               <div className="mb-8">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">The Success</h2>
                  <p className="text-emerald-100/60">Emerging without pitfalls. Our local experts handle the complexity from Day 1.</p>
               </div>
               <div className="space-y-4">
                  {[
                    { title: "Proactive Audits", desc: "Digital liability tracking and contract protection." },
                    { title: "Express Clearance", desc: "Direct landlord mediation and deposit recovery." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</h3>
                        <p className="text-gray-400 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 group-hover:scale-[1.02] transition-all">
                  <img src={expertSupportPng} alt="Expert support" className="rounded-2xl border border-white/5 shadow-2xl h-48 w-full object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Support */}
      <section className="py-32 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-12">Immediate Professional Support</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#0A3D62] p-8 rounded-[2rem] border border-white/10">
              <p className="text-blue-200 text-sm uppercase font-bold tracking-widest mb-2">WhatsApp (Fastest Help)</p>
              <a href="https://wa.me/971523946311" className="text-3xl font-black text-white hover:text-[#FFC845] transition-colors tracking-tight">+971 52 394 6311</a>
            </div>
            <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/10">
              <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-2">CEO Direct Line</p>
              <a href="tel:+971523906019" className="text-3xl font-black text-white hover:text-[#FFC845] transition-colors tracking-tight">+971 52 390 6019</a>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="py-12 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <a href="https://wa.me/971523946311" className="text-[#FFC845] font-bold hover:underline">WhatsApp</a>
            <a href="mailto:service@deliwer.com" className="text-gray-400 hover:text-white">service@deliwer.com</a>
            <span className="text-gray-600 text-sm">Dubai, United Arab Emirates</span>
          </div>
          <Link href="/relocate/exit" className="text-emerald-500 font-black uppercase tracking-widest text-sm hover:underline">
            Relocation & Exit Concierge →
          </Link>
        </div>
      </footer>
      {/* Sticky Components */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button 
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full h-16 w-16 p-0 shadow-2xl animate-bounce ml-auto"
          onClick={() => window.open('https://wa.me/971523946311', '_blank')}
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>
      <SEOMeta
        title="DeliWer | Dubai Resident Hub - Everything for Your Dubai Life"
        description="Access premium home services, community missions, and exclusive rewards tailored for Dubai residents. Move-in summer ready pack and elite concierge support."
        keywords="Dubai resident hub, home services Dubai, summer ready pack, Dubai living, elite concierge Dubai"
      />
    </div>
  );
}
