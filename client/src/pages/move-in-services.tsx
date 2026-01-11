import { useState, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { SEOMeta } from "@/components/seo-meta";
import { 
  CheckCircle2, 
  Zap, 
  Shield, 
  MapPin, 
  ArrowRight, 
  MessageSquare,
  Droplets,
  Home,
  Wrench,
  Sparkles,
  ClipboardCheck,
  Building2,
  Plus,
  Minus,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import jvcBuilding from "@assets/generated_images/modern_jvc_dubai_residential_building_exterior.png";
import jvcBoxes from "@assets/generated_images/jvc_dubai_apartment_move-in_boxes.png";
import cleaningImage from "@assets/generated_images/jvc_dubai_apartment_cleaning_service.png";
import maintenanceImage from "@assets/generated_images/jvc_dubai_ac_maintenance_service.png";
import { SiWhatsapp } from "react-icons/si";

const PRICING_PACKS = [
  {
    id: "starter",
    title: "MOVE-IN STARTER",
    price: "1,250",
    description: "Best for studios & 1-beds",
    features: [
      "Initial move-in cleaning",
      "Drinking water setup",
      "Basic maintenance check",
      "Building access coordination"
    ],
    footer: "*Moving not included*",
    color: "emerald"
  },
  {
    id: "family",
    title: "FAMILY MOVE-IN",
    price: "2,250",
    description: "Best for 2–3 bedroom homes",
    features: [
      "Deep cleaning",
      "Water + consumables setup",
      "Maintenance & minor fixes",
      "Move-in day coordination",
      "Vendor scheduling"
    ],
    color: "blue"
  },
  {
    id: "full",
    title: "FULL MOVE-IN",
    price: "Custom",
    description: "For villas & full setups",
    features: [
      "Everything above",
      "Furniture placement coordination",
      "Internet & utilities assistance",
      "Ongoing support for first 7 days"
    ],
    cta: "Talk to us on WhatsApp",
    color: "purple"
  }
];

export default function MoveInServices() {
  const steps = [
    { number: "1", title: "Keys received in JVC", description: "You've got your new home keys in JVC." },
    { number: "2", title: "Message DeliWer on WhatsApp", description: "Quick message to our community-specific support line." },
    { number: "3", title: "Setup coordinated within 24–48 hours", description: "Everything handled while you relax." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans leading-relaxed">
      <SEOMeta
        title="JVC Move-In Support | DeliWer"
        description="Just moved into JVC? We handle the setup. From cleaning to water to maintenance — coordinated after you get the keys."
        keywords="move-in services JVC, apartment setup Jumeirah Village Circle, JVC home services, JVC move-in coordination"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:py-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${jvcBuilding})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl uppercase">
            Your home, ready from Day One
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
            Move-in services for new homes in Dubai — cleaning, water, maintenance & setup after you get the keys.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all w-full sm:w-auto" 
              onClick={() => window.open("https://wa.me/971523946311", "_blank")}
            >
              Start my move-in
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white px-10 py-8 text-xl font-bold rounded-2xl backdrop-blur-md w-full sm:w-auto"
              onClick={() => window.open("https://wa.me/971523946311", "_blank")}
            >
              <SiWhatsapp className="mr-2 w-6 h-6" />
              WhatsApp Support
            </Button>
          </div>
          <p className="mt-8 text-slate-400 text-sm font-bold uppercase tracking-widest">
            Not a real estate agency. Not a moving company.
          </p>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center uppercase tracking-tighter">
            The hardest part of moving isn't the truck
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              "Apartment isn’t clean",
              "Water not delivered",
              "AC or lights not working",
              "Building access confusion",
              "Too many vendors to call"
            ].map((pain, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 bg-slate-950 rounded-2xl border border-white/5 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">!</div>
                <span className="text-lg font-bold text-gray-300">{pain}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-400 uppercase italic">
              DeliWer handles everything after keys are handed over.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Packs */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center uppercase tracking-tighter">Move-In Pricing</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {PRICING_PACKS.map((pkg) => (
              <Card key={pkg.id} className="bg-slate-900 border-white/10 rounded-[3rem] overflow-hidden flex flex-col hover-elevate transition-all">
                <CardHeader className="p-10 pb-0">
                  <div className={`text-xs font-black uppercase tracking-[0.2em] mb-4 text-${pkg.color}-400`}>{pkg.id} pack</div>
                  <CardTitle className="text-3xl font-black text-white mb-2">{pkg.title}</CardTitle>
                  <div className="text-4xl font-black text-white mb-6 flex items-baseline gap-1">
                    {pkg.price !== "Custom" && <DirhamSymbol className="text-2xl" />}
                    {pkg.price === "Custom" ? pkg.price : `From ${pkg.price}`}
                  </div>
                  <p className="text-gray-400 font-bold">{pkg.description}</p>
                </CardHeader>
                <CardContent className="p-10 flex-1 flex flex-col">
                  <div className="space-y-4 mb-10 flex-1">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className={`w-5 h-5 text-${pkg.color}-500 shrink-0`} />
                        <span className="font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                  {pkg.footer && <p className="text-xs text-slate-500 italic mb-6 text-center">{pkg.footer}</p>}
                  <Button 
                    className={`w-full bg-${pkg.color}-600 hover:bg-${pkg.color}-500 text-white py-8 rounded-2xl font-black text-lg shadow-xl`}
                    onClick={() => window.open("https://wa.me/971523946311", "_blank")}
                  >
                    {pkg.cta || `Start ${pkg.title.split(' ')[0]} Pack`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center p-12 bg-slate-900 rounded-[3rem] border border-white/5 max-w-3xl mx-auto shadow-2xl">
            <div className="space-y-4 text-xl font-black text-white uppercase tracking-tight">
              <p>We don’t charge commissions.</p>
              <p>We don’t lock you into vendors.</p>
              <p className="text-emerald-400">We manage your move-in so you don’t have to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="relative p-10 rounded-[2.5rem] bg-slate-900 border border-white/10 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <footer className="py-24 px-6 text-center bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase">Just received your keys?</h2>
          <p className="text-xl text-gray-400 mb-12">We'll take it from here.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-8 text-xl font-black rounded-2xl" onClick={() => window.open("https://wa.me/971523946311", "_blank")}>
              Start move-in
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white px-12 py-8 text-xl font-black rounded-2xl" onClick={() => window.open("https://wa.me/971523946311", "_blank")}>
              WhatsApp now
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

