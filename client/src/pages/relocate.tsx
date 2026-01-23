import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight,
  MessageCircle,
  Plane,
  Shield,
  Home,
  Droplets,
  Check,
  Star,
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiLifestyle from "@assets/stock_images/luxury_dubai_lifesty_e9f4e72e.jpg";
import relocationHero from "../assets/stock_images/relocation_hero.jpg";

export default function Relocate() {
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const relocationServices = [
    {
      icon: Plane,
      title: "Moving & Shipping",
      description: "Global door-to-door relocation with full tracking and customs handling.",
      features: ["International Shipping", "Professional Packing", "Insurance Coverage"]
    },
    {
      icon: Home,
      title: "Home & Life Setup",
      description: "Finding your perfect home and settling your family with ease.",
      features: ["Property Search", "School Enrollment", "Healthcare Registration"]
    },
    {
      icon: Droplets,
      title: "Utilities & Essentials",
      description: "Immediate activation of critical services before you arrive.",
      features: ["Water & Electricity", "High-speed Internet", "Home Automation"]
    },
    {
      icon: Shield,
      title: "One Point of Accountability",
      description: "One team, one timeline, total transparency for your move.",
      features: ["Dedicated Manager", "Fixed Pricing", "24/7 Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dubai Relocation Services | Home Setup & Moving | DeliWer</title>
        <meta name="description" content="Moving to Dubai? We handle the entire relocation. International shipping, home setup, utilities, and lifestyle support." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            Relocate to Dubai <br />
            <span className="text-emerald-400">Move Into a Home That’s Ready From Day One.</span>
          </h1>
          <p className="text-2xl text-white/95 mb-12 max-w-2xl font-medium leading-relaxed">Cooling, water, and home readiness managed for expats — especially during summer.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 h-16 text-xl rounded-full shadow-2xl transition-transform hover:scale-105"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >Choose Your Relocation Pack</Button>
            <Link href="/residence">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/40 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 font-bold h-16 px-10 rounded-full text-xl"
              >
                Find a Residence
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Simplified Services Overview with Background */}
      <section className="relative py-32 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {relocationServices.map((service, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center mb-8 transition-colors group-hover:bg-emerald-500/40 backdrop-blur-md border border-white/10">
                  <service.icon className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-emerald-50/90 text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Packs Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Choose Your Relocation Pack</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent, fixed-price packages designed to get you settled without the stress.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Essential Move-In",
                price: "299",
                description: "Basic home readiness and coordination.",
                features: [
                  "Move-in coordination",
                  "Basic home readiness check",
                  "Utility checklist",
                  "Issue reporting & follow-up"
                ]
              },
              {
                name: "Summer Ready Home",
                price: "599",
                recommended: true,
                description: "Complete cooling and water setup for Dubai's heat.",
                features: [
                  "Everything in Essential",
                  "AC inspection & basic service",
                  "Cooling efficiency check",
                  "Drinking water starter delivery",
                  "Leak & water pressure check",
                  "Minor fix coordination"
                ]
              },
              {
                name: "Full Relocation Comfort",
                price: "1,199",
                description: "The ultimate white-glove relocation experience.",
                features: [
                  "Everything in Summer Ready",
                  "Deep cleaning",
                  "AC AMC (initial visit)",
                  "Water subscription setup",
                  "Trade-in / recycle coordination",
                  "Dedicated relocation manager"
                ]
              }
            ].map((pack, i) => (
              <Card 
                key={i} 
                className={`relative p-8 flex flex-col h-full transition-all hover:shadow-2xl border-2 ${
                  pack.recommended 
                    ? "border-emerald-500 shadow-xl scale-105 z-10 bg-emerald-50/30 dark:bg-emerald-950/10" 
                    : "border-slate-100 dark:border-slate-800"
                }`}
              >
                {pack.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <p className="text-muted-foreground text-sm h-10">{pack.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-muted-foreground uppercase">From</span>
                    <span className="text-4xl font-black text-emerald-600">AED {pack.price}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">Apartment & Townhouse: Fixed Price</p>
                    <p className="text-xs text-emerald-600 font-medium">Villa: Custom Quote</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-relaxed">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-0.5 shrink-0 h-5 w-5 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => window.open(`https://wa.me/971501234567?text=Hi, I am interested in the ${pack.name} relocation pack. Please let me know the next steps. Source: Relocation`, '_blank')}
                  className={`w-full h-14 text-lg font-black rounded-xl ${
                    pack.recommended 
                      ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none" 
                      : "variant-outline border-2"
                  }`}
                  data-testid={`button-select-pack-${pack.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Select Pack
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* High Impact Visual - Exit Concierge */}
      <section className="relative py-40 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582653280643-e79c79219b19?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            LEAVING DUBAI?
          </h2>
          <p className="text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Secure your deposit. We handle the cleaning, utility closures, and landlord handovers so you can leave with peace of mind.
          </p>
          <Link href="/exit">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-black rounded-full px-16 h-20 text-2xl shadow-2xl">
              Exit Concierge
              <ArrowRight className="ml-2 w-8 h-8" />
            </Button>
          </Link>
        </div>
      </section>
      {/* 4-Step Journey with Background */}
      <section className="relative py-32 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-black text-center mb-24">The Easy 4-Step Move</h2>
          <div className="grid md:grid-cols-4 gap-16 relative">
            {[
              { step: "01", title: "Plan", desc: "Expert strategy call." },
              { step: "02", title: "Price", desc: "Fixed-cost roadmap." },
              { step: "03", title: "Move", desc: "We manage everything." },
              { step: "04", title: "Live", desc: "Arrive home ready." }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-7xl font-black text-emerald-400/20 mb-6">{s.step}</div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-emerald-50/80 text-lg">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* WhatsApp Enquiry Section */}
      <section id="lead-form" ref={formRef} className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Card className="p-8 md:p-12 shadow-3xl border-emerald-100 dark:border-emerald-900/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-16 -mt-16" />
            <div className="text-center mb-10 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                <MessageCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">Instant Relocation Enquiry</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Skip the forms. Message our relocation experts directly on WhatsApp for an immediate response.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 max-w-lg mx-auto relative z-10">
              <Button 
                onClick={() => window.open('https://wa.me/971501234567?text=Hi, I am interested in relocation services to Dubai. Please let me know the process.', '_blank')}
                className="bg-emerald-600 hover:bg-emerald-700 h-20 text-2xl font-black rounded-full shadow-xl transition-all hover:scale-105 group"
              >
                <MessageCircle className="mr-3 w-8 h-8 group-hover:animate-bounce" />
                Chat via WhatsApp
              </Button>
              <p className="text-sm text-muted-foreground italic">
                Our team usually responds within 15 minutes during Dubai business hours.
              </p>
            </div>
          </Card>
        </div>
      </section>
      {/* Visa Divider */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need UAE Visa or Golden Visa Support?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">While relocation handles your move, our Visa Services handle your legal residency and 10-year Golden Visa pathways.</p>
          <Link href="/relocate/visa">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-10 h-14 rounded-full">
              Explore Visa Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
