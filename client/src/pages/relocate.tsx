import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { 
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Zap,
  Star,
  Shield,
  Snowflake,
  Droplets,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Relocate() {
  const formRef = useRef<HTMLDivElement>(null);
  
  const packs = [
    {
      id: "essential",
      name: "Pack 1: Essential Move-In",
      price: "299",
      description: "You moved in. We make sure basics are functional.",
      icon: Zap,
      features: [
        "Move-in coordination",
        "Basic home readiness check",
        "Utility checklist",
        "Issue reporting & follow-up",
        "WhatsApp support"
      ],
      cta: "Select Pack",
      whatsapp: "Hi, I am interested in the Essential Move-In pack (AED 299)."
    },
    {
      id: "summer",
      name: "Pack 2: Summer Ready Home",
      price: "599",
      description: "Your home is ready to survive Dubai summer.",
      icon: Snowflake,
      recommended: true,
      features: [
        "Everything in Essential",
        "AC inspection & basic service",
        "Cooling efficiency check",
        "Drinking water starter delivery",
        "Leak & water pressure check",
        "Minor fix coordination"
      ],
      cta: "Select Recommended",
      whatsapp: "Hi, I am interested in the Summer Ready Home pack (AED 599)."
    },
    {
      id: "comfort",
      name: "Pack 3: Full Relocation Comfort",
      price: "1,199",
      description: "We manage your home, not just your move.",
      icon: Package,
      features: [
        "Everything in Summer Ready",
        "Deep cleaning",
        "AC AMC (initial visit)",
        "Water subscription setup",
        "Trade-in / recycle coordination",
        "Dedicated relocation manager"
      ],
      cta: "Select Pack",
      whatsapp: "Hi, I am interested in the Full Relocation Comfort pack (AED 1,199)."
    }
  ];

  const handleWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/971523946311?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Relocate to Dubai | Summer-Ready Home Relocation | DeliWer</title>
        <meta name="description" content="Move into a home that's ready from day one. Cooling, water, and home readiness managed for expats — especially during Dubai summer." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-1 text-sm font-bold rounded-full">
            RELOCATE TO DUBAI
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Move Into a Home That’s <br />
            <span className="text-emerald-400">Ready From Day One.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Cooling, water, and home readiness managed for expats — especially during Dubai summer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 px-8 rounded-full shadow-lg transition-all hover:scale-105"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Choose Your Relocation Pack
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white backdrop-blur-md bg-white/5 hover:bg-white/10 font-bold h-14 px-8 rounded-full"
              onClick={() => handleWhatsApp("Hi, I'm interested in relocating to Dubai and need some help.")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp +971523946311
            </Button>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "International", sub: "Relocations (GLG / SGM)" },
              { label: "Local", sub: "Move-ins" },
              { label: "Rental", sub: "Apartments & Townhouses" },
              { label: "Summer", sub: "Arrivals" }
            ].map((item, i) => (
              <div key={i} className="p-4">
                <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{item.label}</div>
                <div className="text-muted-foreground text-sm font-medium">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packs */}
      <section id="packs" ref={formRef} className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Choose Your Readiness Level</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fixed pricing for Apartments & Townhouses. Villas available via custom quote.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack) => (
              <Card 
                key={pack.id} 
                className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-2xl ${
                  pack.recommended ? 'border-emerald-500 shadow-xl scale-105 z-10' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {pack.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-emerald-500 text-white px-4 py-1 font-bold rounded-full">
                      RECOMMENDED
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    pack.recommended ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <pack.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-black mb-2">{pack.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-sm font-bold text-muted-foreground">From AED</span>
                    <span className="text-4xl font-black">{pack.price}</span>
                  </div>
                  <p className="text-muted-foreground font-medium">{pack.description}</p>
                </CardHeader>
                <CardContent className="flex-1 pb-8">
                  <ul className="space-y-4">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full h-14 text-lg font-black rounded-xl transition-all ${
                      pack.recommended 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-slate-900 dark:bg-white dark:text-slate-900'
                    }`}
                    onClick={() => handleWhatsApp(pack.whatsapp)}
                  >
                    {pack.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Badge variant="outline" className="px-6 py-2 text-sm font-bold border-dashed border-slate-300 rounded-full">
              Villa? Contact us for a custom quote
            </Badge>
          </div>
        </div>
      </section>

      {/* Why DeliWer */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                Why Relocators <br />
                <span className="text-emerald-500">Trust DeliWer</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "One Accountable Operator", desc: "No juggling 10 different vendors. We manage them all." },
                  { title: "No Vendor Chasing", desc: "We are on-site to ensure work is completed to standard." },
                  { title: "Dubai Summer–Aware", desc: "We know what fails when it's 45°C. We prevent it." },
                  { title: "Trusted Partners", desc: "Built for GLG, SGM, and high-impact relocations." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[40px] -rotate-3 scale-105" />
              <img 
                src="https://images.unsplash.com/photo-1582653280643-e79c79219b19?auto=format&fit=crop&q=80" 
                alt="Dubai Living" 
                className="relative z-10 rounded-[40px] shadow-2xl grayscale-[0.2]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subtle After Move-in */}
      <section className="py-12 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl font-bold flex items-center justify-center gap-3">
            <Star className="w-6 h-6 fill-white" />
            Staying longer? We support you through summer, upgrades, and move-out.
          </p>
        </div>
      </section>

      {/* WhatsApp Enquiry Section */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Need a custom roadmap?</h2>
          <p className="text-slate-400 text-xl mb-10 leading-relaxed">
            Message our relocation experts directly for an immediate response during Dubai business hours.
          </p>
          <Button 
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 h-16 px-12 text-xl font-black rounded-full shadow-2xl transition-all hover:scale-105"
            onClick={() => handleWhatsApp("Hi, I need a custom relocation roadmap for Dubai.")}
          >
            <MessageCircle className="mr-3 w-6 h-6" />
            Chat via WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
