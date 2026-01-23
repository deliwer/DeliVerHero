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
  Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";
import waterLifestyleImg from "@assets/without_text_1756065010951.jpg";

export default function HomeService() {
  const handleWhatsApp = (serviceName: string) => {
    const text = `Hi DeliWer, I'm interested in the ${serviceName} for my home. I want to make sure my home is summer-ready and avoid any summer shocks!`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const audience = [
    { icon: User, text: "New Expats" },
    { icon: Building, text: "Rental Apartments & Townhouses" },
    { icon: Calendar, text: "Summer Move-ins" },
    { icon: Sparkles, text: "Relocations via agents" }
  ];

  const coreOffer = [
    {
      title: "Cooling Readiness",
      icon: Thermometer,
      items: ["AC Inspection", "Basic AC Servicing", "Airflow & Cooling Efficiency Check", "Early Fault Detection"]
    },
    {
      title: "Water Readiness",
      icon: Droplets,
      items: ["Drinking Water Starter Delivery", "Tap / Leak Quick Check", "Water Pressure & Wastage Scan"]
    },
    {
      title: "Home Readiness",
      icon: Home,
      items: ["Minor Fixes Coordination", "Emergency Support Access", "Maintenance Handover Summary"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Dubai Summer Ready Home | DeliWer</title>
        <meta name="description" content="Move into a Dubai home that's summer-ready from day one. Cooling, water, and essential readiness inspected, fixed, and supported by DeliWer." />
      </Helmet>

      {/* 🔴 HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${waterLifestyleImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6 px-4 py-1.5 rounded-full uppercase tracking-widest font-black text-xs">
            The Dubai Survival Guide
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            Move Into a Dubai Home That’s <br /><span className="text-emerald-400">Summer-Ready From Day One</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Cooling, water, and essential home readiness — inspected, fixed, and supported by DeliWer.
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

      {/* 🟠 WHO THIS IS FOR */}
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

      {/* 🟡 THE CORE OFFER */}
      <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Move-In Summer Ready Pack</h2>
            <p className="text-xl text-slate-500 font-bold italic">“Before your first night, we make sure your home can survive Dubai summer.”</p>
          </div>

          <Card className="border-0 shadow-2xl rounded-[3rem] overflow-hidden bg-slate-50 dark:bg-slate-900">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter">What’s Inside (Survival Only)</h3>
                  <div className="space-y-10">
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
                    Get Summer Ready
                  </Button>
                  <p className="text-xs text-slate-500 font-medium italic">Same day or next day service available.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* REPEATABILITY / TRUST */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="text-lg text-slate-500 font-bold uppercase tracking-widest mb-4">Why DeliWer?</p>
          <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter uppercase leading-tight">
            One Accountable Operator. <br /><span className="text-emerald-500">Zero Summer Shocks.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <h4 className="font-black uppercase text-sm">No Contracts</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">One-time assessment. No long-term commitment required to start.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black uppercase text-sm">Immediate Fixes</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">We don't just inspect. We coordinate minor fixes on the spot.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black uppercase text-sm">Expert Network</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Instant access to Dubai's best maintenance professionals if needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-white/5 text-center text-white">
        <div className="container mx-auto">
          <p className="text-emerald-500 font-black text-xs uppercase tracking-widest mb-6">
            Supported by Dubai Municipality & DEWA Guidelines
          </p>
          <p className="text-slate-500 text-[10px] font-medium max-w-2xl mx-auto uppercase tracking-tighter">
            © {new Date().getFullYear()} DeliWer Home Operations. All services are performed by licensed professionals according to UAE safety and building regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
