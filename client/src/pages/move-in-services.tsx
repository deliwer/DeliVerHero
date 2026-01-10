import { useState } from "react";
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
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import heroImage from "@assets/generated_images/happy_family_in_modern_dubai_luxury_apartment.png";
import cleaningImage from "@assets/generated_images/dubai_urban_community_services_background.png";
import maintenanceImage from "@assets/generated_images/peaceful_and_safe_dubai_environment_encouraging_relocation.png";

const PRICING_OPTIONS = [
  { id: "coordination", title: "Move-in coordination", price: 499, icon: Zap },
  { id: "cleaning", title: "Initial deep cleaning", price: 350, icon: Sparkles },
  { id: "water", title: "Drinking water setup", price: 299, icon: Droplets },
  { id: "maintenance", title: "Maintenance checks", price: 450, icon: Wrench },
  { id: "domestic", title: "Domestic help (1st day)", price: 150, icon: Home },
  { id: "docs", title: "Document services", price: 800, icon: Building2 },
];

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
            data-testid="button-get-quote-calculator"
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
    { icon: Sparkles, title: "Initial deep cleaning" },
    { icon: Droplets, title: "Drinking water setup" },
    { icon: Wrench, title: "Maintenance checks (AC, plumbing, electrical)" },
    { icon: Home, title: "Optional domestic help" },
    { icon: Building2, title: "Company setup & document services (if required)" },
  ];

  const communities = ["JVC / JVT", "Business Bay", "Dubai Marina / JLT", "Barsha Heights"];

  const steps = [
    { number: "1", title: "Contact us on WhatsApp", description: "Reach out via our official support line." },
    { number: "2", title: "Choose what you need", description: "Select individual services or a complete bundle." },
    { number: "3", title: "We coordinate the setup", description: "Sit back while we handle the practical work." },
  ];

  const proofPoints = [
    "Regular move-ins coordinated across active communities",
    "Repeat usage from residents",
    "Referrals within buildings",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans leading-relaxed">
      <SEOMeta
        title="Move-In Support for Dubai Residences | DeliWer"
        description="Keys received? We handle the rest. DeliWer helps residents set up their home immediately after handover without agents or multiple vendors."
        keywords="move-in services Dubai, apartment setup Dubai, Dubai home services, residential coordination Dubai"
      />

      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:py-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-slate-950"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Move-In Support for Dubai Residences
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-emerald-400 mb-8 drop-shadow-lg">
            Keys received? We handle the rest.
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
            DeliWer helps residents set up their home immediately after handover — without agents, listings, or multiple vendors.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all w-full sm:w-auto" data-testid="button-setup-residence-main">
              Set Up My Residence
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Clear Boundary Statement */}
      <section className="py-16 px-6 bg-slate-950 border-y border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-6 font-bold text-sm uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Clear Boundary
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Not a real estate agency.</h2>
          <p className="text-gray-300 text-lg">
            No property listings. No commissions. No agent calls. DeliWer coordinates the <strong>practical work that starts after you get the keys</strong>.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center uppercase tracking-tighter">What we set up during move‑in</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {setupServices.map((service, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all hover-elevate">
                <div className="bg-emerald-500/20 p-4 rounded-2xl">
                  <service.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-lg font-bold text-white leading-tight">{service.title}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 italic mb-20">
            You can start with one service or bundle everything.
          </p>

          <PricingCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-[#14b491] text-white rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-emerald-500/20">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-emerald-500/10 rounded-[2.5rem] border border-emerald-500/20 text-center max-w-2xl mx-auto">
            <p className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-3">
              <MessageSquare className="w-6 h-6" /> One point of contact. No chasing vendors.
            </p>
          </div>
        </div>
      </section>

      {/* Where this is active */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `url(${maintenanceImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter">Where this is active</h2>
          <p className="text-gray-300 text-lg mb-10">Currently supporting move‑ins in:</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {communities.map((c) => (
              <Badge key={c} variant="secondary" className="bg-white/10 border-white/10 text-white px-8 py-3 rounded-full text-lg font-bold shadow-2xl backdrop-blur-md">
                <MapPin className="w-5 h-5 mr-3 text-emerald-400" /> {c}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-black">
            Local coordination only. No city‑wide overclaims.
          </p>
        </div>
      </section>

      {/* Why residents use DeliWer */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter">Why residents use DeliWer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "One WhatsApp contact", icon: MessageSquare },
              { title: "Fixed scope, clear pricing", icon: ClipboardCheck },
              { title: "Local operators", icon: Building2 },
              { title: "No sales pressure", icon: Shield }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="bg-white/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:bg-white/10 transition-all group-hover:border-emerald-500/30">
                  <item.icon className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-lg leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 mt-16 italic text-lg">
            Most residents start during move-in and continue for ongoing services.
          </p>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center uppercase tracking-tighter">Proof of Service</h2>
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
                style={{ backgroundImage: `url(${cleaningImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="text-[10px] uppercase font-black text-white relative z-10 tracking-widest">Cleaning in Progress JVC</span>
              </div>
              <div 
                className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 flex items-end p-6 relative group"
                style={{ backgroundImage: `url(${maintenanceImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="text-[10px] uppercase font-black text-white relative z-10 tracking-widest">Maintenance Visit Marina</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 p-12 md:p-20 rounded-[4rem] border border-emerald-500/20 shadow-2xl backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Ready to simplify your move-in?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              DeliWer works with vetted local service partners to ensure consistent delivery across communities.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-10 text-2xl font-black rounded-[2rem] shadow-2xl transition-all w-full sm:w-auto" data-testid="button-setup-residence-final">
              Set Up My Residence
              <ArrowRight className="ml-3 w-8 h-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Reliability */}
      <section className="py-16 bg-slate-950 border-t border-white/5 text-slate-500 text-center text-xs uppercase tracking-[0.3em] font-black">
        DeliWer Reliability Guarantee • Vetted Local Partners • No Commissions
      </section>
    </div>
  );
}
