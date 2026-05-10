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
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import jvcBuilding from "@assets/generated_images/modern_jvc_dubai_residential_building_exterior.png";
import jvcBoxes from "@assets/generated_images/jvc_dubai_apartment_move-in_boxes.png";
import cleaningImage from "@assets/generated_images/jvc_dubai_apartment_cleaning_service.png";
import maintenanceImage from "@assets/generated_images/jvc_dubai_ac_maintenance_service.png";
import { SiWhatsapp } from "react-icons/si";
import { BrokerCTABanner } from "@/components/broker-cta-banner";
import { BuildingSEOBlock } from "@/components/building-seo-block";
import { dubaiBuildings } from "@/data/dubai-buildings";

const PRICING_OPTIONS = [
  { id: "coordination-in", title: "Move-in coordination", price: 499, icon: Zap },
  { id: "coordination-out", title: "Move-out coordination", price: 499, icon: Home },
  { id: "cleaning", title: "Initial deep cleaning", price: 350, icon: Sparkles },
  { id: "water", title: "Drinking water setup", price: 299, icon: Droplets },
  { id: "maintenance", title: "Maintenance checks", price: 450, icon: Wrench },
  { id: "domestic", title: "Domestic help (1st day)", price: 150, icon: Home },
  { id: "docs", title: "Document services", price: 800, icon: Building2 },
];

const testimonials = [
  {
    quote: "DeliWer made my move into Binghatti Gate so much easier. The deep cleaning was spotless and the water setup was done before I even arrived.",
    author: "Sarah J.",
    location: "Binghatti Gate, JVC"
  },
  {
    quote: "I didn't have to worry about a thing. One WhatsApp message and my AC was serviced and domestic help was arranged for the first day.",
    author: "Michael R.",
    location: "Diamond Views, JVC"
  },
  {
    quote: "The price estimator was spot on. Highly recommend for anyone new to JVC who wants a stress-free move-in experience.",
    author: "Ahmed K.",
    location: "Signature Livings, JVC"
  }
];

function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group max-w-4xl mx-auto px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 px-4">
              <div className="bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white/10 text-center relative">
                <Quote className="w-12 h-12 text-emerald-500/20 absolute top-8 left-8" />
                <p className="text-xl md:text-2xl font-medium text-gray-200 mb-8 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-lg font-black text-white">{t.author}</div>
                  <div className="text-sm text-emerald-400 font-bold uppercase tracking-widest">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white hover:bg-white/10 rounded-full"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white hover:bg-white/10 rounded-full"
        onClick={scrollNext}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
    </div>
  );
}

function PricingCalculator() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const total = PRICING_OPTIONS
    .filter(opt => selected.includes(opt.id))
    .reduce((sum, opt) => sum + opt.price, 0);

  const discount = selected.length >= 3 ? total * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-slate-900 border-white/10 shadow-2xl rounded-3xl overflow-hidden" data-testid="pricing-calculator">
      <CardHeader className="bg-slate-950 text-white p-8 border-b border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6 text-emerald-400" />
          <CardTitle className="text-2xl font-black">Move-In Price Estimator</CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Select the services you need to see your personalized estimate.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-wider text-xs px-2">Available Services</h3>
            {PRICING_OPTIONS.map((option) => (
              <div 
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                  selected.includes(option.id) 
                    ? "border-emerald-500 bg-emerald-500/10" 
                    : "border-white/5 bg-white/5 hover:border-white/20"
                }`}
                onClick={() => toggleOption(option.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selected.includes(option.id) ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <Label className="font-bold text-white cursor-pointer">{option.title}</Label>
                </div>
                <div className="text-slate-300 font-medium text-sm">
                  <DirhamSymbol />{option.price}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 rounded-3xl p-8 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-400 mb-6 uppercase tracking-wider text-xs px-2">Your Summary</h3>
              <div className="space-y-3 mb-6">
                {selected.length === 0 ? (
                  <p className="text-slate-500 italic text-sm text-center py-8">No services selected</p>
                ) : (
                  PRICING_OPTIONS.filter(opt => selected.includes(opt.id)).map(opt => (
                    <div key={opt.id} className="flex justify-between text-sm text-slate-300">
                      <span>{opt.title}</span>
                      <span><DirhamSymbol />{opt.price}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold text-sm">
                  <span>Multi-service Discount (10%)</span>
                  <span>-<DirhamSymbol />{Math.round(discount)}</span>
                </div>
              )}
              <div className="flex justify-between items-end">
                <span className="font-black text-white text-xl uppercase tracking-tighter">Total Estimate</span>
                <span className="text-3xl font-black text-[#14b491]" style={{ textShadow: '0 0 20px rgba(20, 180, 145, 0.3)' }}>
                  <DirhamSymbol />{Math.round(finalTotal)}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 italic text-center">
                *Final price may vary based on property size and specific requirements.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            disabled={selected.length === 0}
            size="lg" 
            className="w-full bg-[#14b491] hover:bg-[#14b491]/90 text-white py-6 rounded-2xl font-black text-lg shadow-xl"
            onClick={() => window.open("https://wa.me/971523946311", "_blank")}
          >
            Get Final Quote on WhatsApp
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MoveInServices() {
  const setupServices = [
    { icon: Zap, title: "Move-in coordination" },
    { icon: Home, title: "Move-out coordination" },
    { icon: Sparkles, title: "Initial deep cleaning" },
    { icon: Droplets, title: "Drinking water setup" },
    { icon: Wrench, title: "AC & maintenance checks" },
    { icon: Home, title: "Optional domestic help" },
  ];

  const steps = [
    { number: "1", title: "Keys received in JVC", description: "You've got your new home keys in JVC." },
    { number: "2", title: "Message DeliWer on WhatsApp", description: "Quick message to our community-specific support line." },
    { number: "3", title: "Setup coordinated within 24–48 hours", description: "Everything handled while you relax." },
  ];

  const proofPoints = [
    "Currently supporting move-ins within JVC and nearby buildings.",
    "Most requests come from building referrals.",
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
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Just moved into JVC? We handle the setup.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
            From cleaning to water to maintenance — coordinated after you get the keys.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all w-full sm:w-auto" 
              onClick={() => window.open("https://wa.me/971523946311", "_blank")}
            >
              <SiWhatsapp className="mr-2 w-6 h-6" />
              Set up my JVC residence
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
      {/* Problems Section - Replacement for Section 2 */}
      <section className="relative py-24 px-6 overflow-hidden bg-slate-900/50">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center uppercase tracking-tighter">
            What usually goes wrong after move-in
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
              <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6">Common frustrations</p>
              <ul className="space-y-6">
                {[
                  "Calling multiple vendors",
                  "Unclear building rules",
                  "Delays and no-shows",
                  "No single person responsible"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col justify-center space-y-8 p-4">
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Most new residents face the same issues.
                </p>
                <p className="text-xl text-emerald-400 font-black">
                  DeliWer removes this coordination headache.
                </p>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-slate-400 uppercase tracking-widest font-black">
                  Supporting residents moving into JVC apartments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            backgroundImage: `url(${cleaningImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center uppercase tracking-tighter">What JVC residents typically need</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {setupServices.map((service, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all hover-elevate">
                <div className="bg-emerald-500/20 p-4 rounded-2xl">
                  <service.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-lg font-bold text-white leading-tight">{service.title}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 italic mb-20">
            Familiar problems only. Short and efficient.
          </p>

          <PricingCalculator />
        </div>
      </section>
      {/* How it works */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            backgroundImage: `url(${maintenanceImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/60"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter">How it works </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="relative p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/10 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-[#14b491] text-white rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-emerald-500/20">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-emerald-500/10 backdrop-blur-sm rounded-[2.5rem] border border-emerald-500/20 text-center max-w-2xl mx-auto">
            <p className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-3">
              <MessageSquare className="w-6 h-6" /> One coordinator until completion.
            </p>
          </div>
        </div>
      </section>
      {/* Local Proof Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            backgroundImage: `url(${maintenanceImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/60"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter">Local Service</h2>
          <p className="text-gray-300 text-lg mb-10">Currently supporting move‑ins within JVC and nearby buildings.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="bg-white/10 border-white/10 text-white px-8 py-3 rounded-full text-lg font-bold shadow-2xl backdrop-blur-md">
              <MapPin className="w-5 h-5 mr-3 text-emerald-400" /> JVC (Jumeirah Village Circle)
            </Badge>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-black">
            Most requests come from building referrals.
          </p>
        </div>
      </section>
      {/* Visual Proof Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            backgroundImage: `url(${jvcBuilding})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/60"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center uppercase tracking-tighter">our clients</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              {proofPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-5 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <p className="text-lg font-bold text-gray-200">{point}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div 
                className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 flex items-end p-6 relative group"
                style={{ backgroundImage: `url(${jvcBoxes})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="text-[10px] uppercase font-black text-white relative z-10 tracking-widest">Move-in support in JVC</span>
              </div>
              <div 
                className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 flex items-end p-6 relative group"
                style={{ backgroundImage: `url(${jvcBuilding})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="text-[10px] uppercase font-black text-white relative z-10 tracking-widest">JVC Residence Setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            backgroundImage: `url(${jvcBuilding})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter">What JVC residents say</h2>
          <TestimonialsCarousel />
        </div>
      </section>
      {/* Final CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{
            backgroundImage: `url(${jvcBuilding})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-emerald-600/40 to-blue-600/40 p-12 md:p-20 rounded-[4rem] border border-emerald-500/30 shadow-2xl backdrop-blur-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Just moved in?</h2>
            <div className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              <p>Tell us where you’re living and what you need help with.<br />We’ll guide you step by step.</p>
            </div>
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-10 text-2xl font-black rounded-[2rem] shadow-2xl transition-all w-full sm:w-auto" 
              onClick={() => window.open("https://wa.me/971523946311", "_blank")}
            >
              <SiWhatsapp className="mr-3 w-8 h-8" />
              <div className="flex flex-col items-start">
                <span className="text-sm uppercase tracking-widest opacity-80">Chat on WhatsApp</span>
                <span>+971 523 946 311</span>
              </div>
              <ArrowRight className="ml-3 w-8 h-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Hyperlocal Building-Level SEO Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-4">Move-In Services Across Dubai Communities</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Whether you're settling into Dubai Marina, Downtown, Business Bay, or JVC—DeliWer's concierge services ensure your new home is ready on day one.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {dubaiBuildings.map((building, idx) => (
              <BuildingSEOBlock 
                key={idx}
                building={building.name}
                community={building.community}
                ref={building.ref}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Don't see your building? Contact us via WhatsApp and we'll customize a solution for your community.
            </p>
          </div>
        </div>
      </section>

      {/* Broker CTA */}
      <section className="py-10 px-4 bg-slate-900/40 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <BrokerCTABanner context="Real estate broker? Refer your clients after lease signing and earn AED 150–800 per move-in — no subscription, instant link." />
        </div>
      </section>

      {/* Footer Reliability */}
      <section className="py-16 bg-slate-950 border-t border-white/5 text-slate-500 text-center text-xs uppercase tracking-[0.3em] font-black">
        DeliWer JVC Community Focus • Vetted Local Partners • No Commissions
      </section>
    </div>
  );
}
