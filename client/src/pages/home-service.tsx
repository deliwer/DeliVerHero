import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { 
  Home, 
  MessageCircle, 
  Thermometer, 
  Droplets,
  Check,
  Zap,
  User,
  Building,
  Calendar,
  Sparkles,
  AlertTriangle,
  Coins,
  ShieldCheck
} from "lucide-react";
import { useState, useMemo } from "react";
import waterLifestyleImg from "@assets/without_text_1756065010951.jpg";
import homeServiceHeroImg from "@assets/stock_images/professional_service_2cfeb661.jpg";

export default function HomeService() {
  const handleWhatsApp = (serviceName: string) => {
    const text = `Hi DeliWer, I'm interested in the ${serviceName} assessment for my home. I want to avoid hidden costs and make sure my home is summer-ready!`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const audience = [
    { icon: User, text: "New Expats" },
    { icon: Building, text: "Rental Apartments & Townhouses" },
    { icon: Calendar, text: "Summer Move-ins" },
    { icon: Sparkles, text: "Relocations via agents" }
  ];

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
      icon: Home,
      items: ["Appliance efficiency check", "Emergency support access", "Maintenance handover summary"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Dubai Everyday Living Organiser | Home Services | DeliWer</title>
        <meta name="description" content="Dubai Everyday Living Organiser: Your partner in avoiding hidden home costs. Expert cooling, water, and essential home readiness for new expats." />
      </Helmet>

      {/* 🔴 HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${homeServiceHeroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6 px-4 py-1.5 rounded-full uppercase tracking-widest font-black text-xs">
            Dubai Everyday Living Organiser
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            Stop Paying for <br /><span className="text-emerald-400">Hidden Inefficiency</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Hidden chiller costs and appliance drains can double your bills. We inspect, optimize, and organize your home before you move in.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-16 text-lg transition-all hover:scale-105"
              onClick={() => handleWhatsApp("Summer Ready Assessment")}
            >
              Book Summer Ready Assessment
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-md text-white border-white/20 font-black rounded-full px-12 h-16 text-lg hover:bg-white/20 transition-all"
              onClick={() => handleWhatsApp("General Inquiry")}
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              WhatsApp Inquiry
            </Button>
          </div>
        </div>
      </section>

      {/* 🟠 HIDDEN RISKS SECTION */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-slate-900 dark:text-white">The Risks You Don't See</h2>
            <p className="text-lg text-slate-500 font-medium">Before choosing an apartment or townhouse, understand the hidden factors that drive high bills.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {hiddenRisks.map((risk, i) => (
              <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-4">
                <div className="bg-amber-500/10 w-12 h-12 flex items-center justify-center rounded-xl">
                  <risk.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{risk.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟡 WHO THIS IS FOR */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Perfect For:</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {audience.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                <div className="bg-emerald-500/10 p-3 rounded-2xl">
                  <item.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <span className="font-black text-sm uppercase tracking-tight text-slate-600 dark:text-slate-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 THE CORE OFFER */}
      <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Move-In Summer Ready Pack</h2>
            <p className="text-xl text-slate-500 font-bold italic">“Detect hidden costs, optimize efficiency, and save with our bundle pack.”</p>
          </div>

          <Card className="border-0 shadow-2xl rounded-[3rem] overflow-hidden bg-slate-50 dark:bg-slate-900">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter">Bundle Pack Inclusions</h3>
                  <div className="space-y-10 text-slate-950 dark:text-white">
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
                            <li key={j} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-center text-center space-y-8">
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

      {/* 🔵 TRUST / LIVING IMAGE SECTION */}
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

      {/* Footer Disclaimer */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-white/5 text-center text-white">
        <div className="container mx-auto">
          <p className="text-emerald-500 font-black text-xs uppercase tracking-widest mb-6">
            Dubai Everyday Living Organiser
          </p>
          <p className="text-slate-500 text-[10px] font-medium max-w-2xl mx-auto uppercase tracking-tighter">
            © {new Date().getFullYear()} DeliWer Home Operations. All services are performed by licensed professionals according to UAE safety and building regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
