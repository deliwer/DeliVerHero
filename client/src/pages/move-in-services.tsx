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
import settlementImage from "@assets/generated_images/dubai_urban_community_services_background.png";

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
    <Card className="w-full max-w-4xl mx-auto bg-white border-slate-200 shadow-xl rounded-3xl overflow-hidden" data-testid="pricing-calculator">
      <CardHeader className="bg-slate-900 text-white p-8">
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
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Available Services</h3>
            {PRICING_OPTIONS.map((option) => (
              <div 
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                  selected.includes(option.id) 
                    ? "border-emerald-500 bg-emerald-50/50" 
                    : "border-slate-100 bg-white hover:border-slate-300"
                }`}
                onClick={() => toggleOption(option.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selected.includes(option.id) ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <Label className="font-bold text-slate-800 cursor-pointer">{option.title}</Label>
                </div>
                <div className="text-slate-600 font-medium text-sm">
                  <DirhamSymbol amount={option.price} iconSize="sm" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Your Summary</h3>
              <div className="space-y-3 mb-6">
                {selected.length === 0 ? (
                  <p className="text-slate-400 italic text-sm text-center py-8">No services selected</p>
                ) : (
                  PRICING_OPTIONS.filter(opt => selected.includes(opt.id)).map(opt => (
                    <div key={opt.id} className="flex justify-between text-sm text-slate-600">
                      <span>{opt.title}</span>
                      <span><DirhamSymbol amount={opt.price} iconSize="xs" /></span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-4">
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold text-sm">
                  <span>Multi-service Discount (10%)</span>
                  <span>-<DirhamSymbol amount={Math.round(discount)} iconSize="xs" /></span>
                </div>
              )}
              <div className="flex justify-between items-end">
                <span className="font-black text-slate-900 text-xl uppercase tracking-tighter">Total Estimate</span>
                <span className="text-3xl font-black text-blue-600">
                  <DirhamSymbol amount={Math.round(finalTotal)} />
                </span>
              </div>
              <p className="text-[10px] text-slate-400 italic text-center">
                *Final price may vary based on property size and specific requirements.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            disabled={selected.length === 0}
            size="lg" 
            className="w-full bg-slate-900 text-white hover:bg-slate-800 py-6 rounded-2xl font-black text-lg shadow-xl"
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
    <div className="min-h-screen bg-white text-slate-900 font-sans leading-relaxed">
      <SEOMeta
        title="Move-In Support for Dubai Residences | DeliWer"
        description="Keys received? We handle the rest. DeliWer helps residents set up their home immediately after handover without agents or multiple vendors."
        keywords="move-in services Dubai, apartment setup Dubai, Dubai home services, residential coordination Dubai"
      />

      {/* Hero Section */}
      <section className="py-16 px-6 lg:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Move-In Support for Dubai Residences
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Keys received? We handle the rest.
          </p>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            DeliWer helps residents set up their home immediately after handover — without agents, listings, or multiple vendors.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-7 text-xl font-bold rounded-2xl shadow-xl transition-all w-full sm:w-auto" data-testid="button-setup-residence-main">
              Set Up My Residence
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Clear Boundary Statement */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6 font-bold text-sm uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Clear Boundary
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Not a real estate agency.</h2>
          <p className="text-slate-600">
            No property listings. No commissions. No agent calls. DeliWer coordinates the <strong>practical work that starts after you get the keys</strong>.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">What we set up during move‑in</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {setupServices.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-800">{service.title}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 italic mb-16">
            You can start with one service or bundle everything.
          </p>

          <PricingCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center max-w-2xl mx-auto">
            <p className="font-bold text-blue-900 flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" /> One point of contact. No chasing vendors.
            </p>
          </div>
        </div>
      </section>

      {/* Where this is active */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Where this is active</h2>
          <p className="text-slate-600 mb-8">Currently supporting move‑ins in:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {communities.map((c) => (
              <Badge key={c} variant="secondary" className="bg-white border-slate-200 text-slate-700 px-6 py-2 rounded-full text-base font-semibold shadow-sm">
                <MapPin className="w-4 h-4 mr-2 text-emerald-500" /> {c}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
            Local coordination only. No city‑wide overclaims.
          </p>
        </div>
      </section>

      {/* Why residents use DeliWer */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why residents use DeliWer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "One WhatsApp contact", icon: MessageSquare },
              { title: "Fixed scope, clear pricing", icon: ClipboardCheck },
              { title: "Local operators", icon: Building2 },
              { title: "No sales pressure", icon: Shield }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <item.icon className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-12 italic">
            Most residents start during move-in and continue for ongoing services.
          </p>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Proof of Service</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {proofPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="font-medium text-slate-700">{point}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center text-center p-4">
                <span className="text-[10px] uppercase font-bold text-slate-500">Cleaning in Progress JVC</span>
              </div>
              <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center text-center p-4">
                <span className="text-[10px] uppercase font-bold text-slate-500">Maintenance Visit Marina</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Ready to simplify your move-in?</h2>
            <p className="text-lg text-slate-600 mb-10">
              DeliWer works with vetted local service partners to ensure consistent delivery across communities.
            </p>
            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-12 py-8 text-2xl font-black rounded-3xl shadow-2xl transition-all w-full sm:w-auto" data-testid="button-setup-residence-final">
              Set Up My Residence
              <ArrowRight className="ml-2 w-8 h-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Reliability */}
      <section className="py-12 bg-slate-900 text-white/50 text-center text-xs uppercase tracking-widest font-bold">
        DeliWer Reliability Guarantee • Vetted Local Partners • No Commissions
      </section>
    </div>
  );
}
