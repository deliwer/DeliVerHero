import { SEOMeta } from "@/components/seo-meta";
import { 
  CheckCircle2, 
  ArrowRight, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import jvcBuilding from "@assets/generated_images/modern_jvc_dubai_residential_building_exterior.png";

const PACKAGES = [
  {
    id: "starter",
    title: "Move-In Starter",
    price: 1250,
    tagline: "Best for studios & 1-beds",
    description: "Essential home readiness so you can walk in and start living.",
    features: [
      "Initial move-in cleaning",
      "Drinking water setup",
      "Basic maintenance check",
      "Building access coordination",
      "Moving not included"
    ],
    cta: "Start Starter Pack",
    color: "emerald"
  },
  {
    id: "family",
    title: "Family Move-In",
    price: 2250,
    tagline: "Best for 2–3 bedroom homes",
    description: "Complete coordination for growing households and larger spaces.",
    features: [
      "Deep cleaning",
      "Water + consumables setup",
      "Maintenance & minor fixes",
      "Move-in day coordination",
      "Vendor scheduling"
    ],
    cta: "Start Family Pack",
    color: "blue"
  },
  {
    id: "full",
    title: "Full Move-In",
    price: "Custom",
    tagline: "For villas & full setups",
    description: "Our most popular choice for high-end residential setups and relocations.",
    features: [
      "Everything in Family Pack",
      "Furniture placement coordination",
      "Internet & utilities assistance",
      "Ongoing support for first 7 days",
      "Zero-stress management"
    ],
    cta: "Talk to us on WhatsApp",
    color: "purple"
  }
];

export default function MoveInPackages() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans leading-relaxed">
      <SEOMeta
        title="Move-In Packages | DeliWer Dubai"
        description="Comprehensive move-in packages for Dubai residents. From essentials to complete relocation support."
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:py-32 overflow-hidden flex items-center justify-center">
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
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
            Move-In Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium italic">
            DeliWer is built for people who actually live in Dubai. Not for listings. Not for commissions. Not for luxury theater.
          </p>
        </div>
      </section>

      {/* Main Packages */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <Card key={idx} id={pkg.id} className="bg-slate-900 border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover-elevate transition-all scroll-mt-24">
              <CardHeader className="p-10 pb-0">
                <div className={`text-xs font-black uppercase tracking-[0.2em] mb-4 text-${pkg.color}-400`}>{pkg.tagline}</div>
                <CardTitle className="text-3xl font-black text-white mb-2">{pkg.title}</CardTitle>
                <div className="text-4xl font-black text-white mb-6 flex items-baseline gap-1">
                  {typeof pkg.price === 'number' ? (
                    <>
                      <span className="text-sm font-medium text-gray-500 mr-2 uppercase tracking-wider">From</span>
                      <DirhamSymbol className="text-2xl" />{pkg.price.toLocaleString()}
                    </>
                  ) : (
                    <span className="text-3xl uppercase tracking-tighter">{pkg.price}</span>
                  )}
                </div>
                <p className="text-gray-400 leading-relaxed font-medium">{pkg.description}</p>
              </CardHeader>
              <CardContent className="p-10 flex-1 flex flex-col">
                <div className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className={`w-5 h-5 text-${pkg.color}-500 shrink-0`} />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full bg-${pkg.color}-600 hover:bg-${pkg.color}-500 text-white py-8 rounded-2xl font-black text-lg shadow-xl`}
                  onClick={() => window.open("https://wa.me/971523946311", "_blank")}
                >
                  {pkg.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust Microcopy */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="space-y-4 text-gray-400 font-medium uppercase tracking-[0.2em] text-sm md:text-base">
            <p>We don’t charge commissions.</p>
            <p>We don’t lock you into vendors.</p>
            <p className="text-white font-bold">We manage your move-in so you don’t have to.</p>
          </div>
        </div>
      </section>

      {/* Footer Reliability */}
      <section className="py-16 bg-slate-950 text-slate-500 text-center text-xs uppercase tracking-[0.3em] font-black">
        DeliWer Community Focus • Vetted Local Partners • Transparent Pricing
      </section>
    </div>
  );
}
