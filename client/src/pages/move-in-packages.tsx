import { SEOMeta } from "@/components/seo-meta";
import { 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Sparkles,
  Droplets,
  Wrench,
  Shield,
  Clock,
  Briefcase,
  Users,
  Home,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import jvcBuilding from "@assets/generated_images/modern_jvc_dubai_residential_building_exterior.png";

const PACKAGES = [
  {
    id: "essentials",
    title: "New Resident Essentials",
    price: 1499,
    tagline: "Moving to Dubai or just arrived?",
    description: "Most residents start with our New Resident Essentials Pack — covering the basics needed to settle in quickly and comfortably.",
    features: [
      "Deep move-in cleaning",
      "Drinking water setup",
      "Basic maintenance inspection",
      "WhatsApp coordination",
      "Priority scheduling"
    ],
    cta: "Start My Move-In",
    color: "emerald"
  },
  {
    id: "complete",
    title: "Move-In Complete",
    price: 2999,
    tagline: "MOVE-IN, DONE PROPERLY",
    description: "For families and long-term residents who want everything handled.",
    features: [
      "Local moving assistance",
      "Deep cleaning",
      "Water setup",
      "Maintenance fixes",
      "Light furniture assembly",
      "Dedicated move-in coordinator"
    ],
    cta: "Book Move-In Complete",
    color: "blue"
  },
  {
    title: "Short-Term Living Setup",
    price: 1999,
    tagline: "SHORT-TERM LIVING SUPPORT",
    note: "(excluding rent)",
    description: "Not ready for a long-term home? We coordinate short-term and serviced living, and handle the setup around it.",
    features: [
      "Stay coordination",
      "Cleaning & water setup",
      "Maintenance support",
      "Extension or relocation assistance"
    ],
    cta: "Arrange Short-Term Living",
    color: "amber"
  }
];

const ONGOING_SUPPORT = [
  {
    title: "Home Care Subscription",
    price: 299,
    unit: "/ month",
    tagline: "FOR RESIDENTS & COMMUNITIES",
    description: "Once you’re settled, DeliWer continues supporting your home.",
    features: [
      "Priority maintenance",
      "Discounted services",
      "WhatsApp ticketing",
      "Quarterly checkups"
    ],
    cta: "Start Home Care"
  },
  {
    title: "Business & Document Support",
    tagline: "FOR FOUNDERS & PROFESSIONALS",
    description: "For residents setting up businesses or managing documentation in Dubai.",
    features: [
      "Company setup guidance",
      "PRO & document coordination",
      "Visa & renewals support"
    ],
    cta: "Get Business Support"
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Professional setup services for your new Dubai residence.
          </p>
        </div>
      </section>

      {/* Main Packages */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <Card key={idx} id={pkg.id} className="bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover-elevate transition-all scroll-mt-24">
              <CardHeader className="p-10 pb-0">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">{pkg.tagline}</div>
                <CardTitle className="text-3xl font-black text-white mb-2">{pkg.title}</CardTitle>
                <div className="text-4xl font-black text-white mb-6 flex items-baseline gap-1">
                  <DirhamSymbol className="text-2xl" />{pkg.price.toLocaleString()}
                  {pkg.note && <span className="text-sm font-normal text-gray-500 ml-2">{pkg.note}</span>}
                </div>
                <p className="text-gray-400 leading-relaxed font-medium">{pkg.description}</p>
              </CardHeader>
              <CardContent className="p-10 flex-1 flex flex-col">
                <div className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-8 rounded-2xl font-black text-lg shadow-xl"
                  onClick={() => window.open("https://wa.me/971523946311", "_blank")}
                >
                  {pkg.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ongoing Support */}
      <section className="py-20 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center uppercase tracking-tighter">Ongoing Support</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {ONGOING_SUPPORT.map((item, idx) => (
              <Card key={idx} className="bg-slate-900 border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between hover-elevate transition-all">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-4">{item.tagline}</div>
                  <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                  {item.price && (
                    <div className="text-3xl font-black text-white mb-6">
                      <DirhamSymbol />{item.price}{item.unit}
                    </div>
                  )}
                  <p className="text-gray-400 mb-8 font-medium">{item.description}</p>
                  <div className="space-y-4 mb-10">
                    {item.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-gray-300">
                        <Star className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/10 text-white py-7 rounded-2xl font-black"
                  onClick={() => window.open("https://wa.me/971523946311", "_blank")}
                >
                  {item.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Card>
            ))}
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
