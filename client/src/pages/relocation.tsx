import { SEOMeta } from "@/components/seo-meta";
import { CheckCircle, Globe, Users, Briefcase, Home, ArrowRight, FileText, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

import relocationHero from "@assets/stock_images/relocation_hero.jpg";

export default function Relocation() {
  const [activeTab, setActiveTab] = useState("local");

  const localServices = [
    "Pre-move apartment activation",
    "Utilities coordination (DEWA, Etisalat/du)",
    "Internet setup and testing",
    "Furniture delivery coordination",
    "Moving company scheduling",
    "Landlord handover support",
    " 30-day concierge support"
  ];

  const internationalServices = [
    "All local services (above)",
    "Visa processing coordination",
    "Opening bank accounts",
    "Setting up mobile numbers",
    "Healthcare registration",
    "Driver's license processes",
    "School/University enrollment",
    "Spousal visa support"
  ];

  const relocationSteps = [
    {
      title: "Assessment",
      description: "Tell us about your move. We assess your needs and timeline.",
      duration: "15 minutes"
    },
    {
      title: "Planning",
      description: "We create a custom relocation plan covering all logistics.",
      duration: "1-2 weeks"
    },
    {
      title: "Coordination",
      description: "We coordinate all service providers and prepare for move-in.",
      duration: "2-4 weeks"
    },
    {
      title: "Activation",
      description: "Move-in day arrives. Your apartment is fully operational.",
      duration: "Day 1"
    },
    {
      title: "Support",
      description: "30 days of concierge support for any issues or adjustments.",
      duration: "30 days"
    }
  ];

  const whyChoose = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Execution-First",
      description: "We prioritize getting you settled over complex documentation."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Local Expertise",
      description: "Our team knows Dubai's systems, landlords, and service providers."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Day One Ready",
      description: "Your apartment is livable and operational before you arrive."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Corporate Friendly",
      description: "We handle employee relocations with HR coordination."
    }
  ];

  return (
    <div>
      <SEOMeta
        title="Relocation Services Dubai - Local & International Moving Support"
        description="Complete relocation support for Dubai and UAE. From apartment activation and utilities to visa coordination and legal documentation. Serving expats, families, and corporate relocations."
        keywords="relocation Dubai, moving services UAE, expat relocation, corporate relocation, international moving, visa support, apartment activation, move-in services"
      />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${relocationHero})` }}
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Relocation Made Simple
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From moving day to settling in — we handle business setup, housing, visas, and lifestyle support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" data-testid="button-start-relocation">
              Start Relocation Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-chat-relocation">
              Chat With Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Local vs International Tabs */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Choose Your Relocation Type
          </h2>
          
          <div className="flex gap-4 mb-12 justify-center">
            <button
              onClick={() => setActiveTab("local")}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === "local"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
              data-testid="tab-local-relocation"
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Local Relocation
            </button>
            <button
              onClick={() => setActiveTab("international")}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === "international"
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
              data-testid="tab-international-relocation"
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              International Relocation
            </button>
          </div>

          {/* Services List */}
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6">
              {activeTab === "local" ? "Local Relocation Services" : "International Relocation Services"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {(activeTab === "local" ? localServices : internationalServices).map((service, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{service}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700">
              <Button size="lg" className={activeTab === "local" ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-600 hover:bg-amber-700"} data-testid={`button-activate-${activeTab}`}>
                Activate {activeTab === "local" ? "Local" : "International"} Move-In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Relocation Process */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            The Relocation Process
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {relocationSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 h-full">
                  <div className="text-sm text-gray-400 mb-2">{step.duration}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {idx < relocationSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why Choose DeliWer Relocation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="text-blue-400 mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Flexible Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">Local Relocation</h3>
              <p className="text-gray-300 mb-6">Within Dubai, Sharjah, Abu Dhabi</p>
              <div className="text-3xl font-bold text-blue-400 mb-6">Custom Quote</div>
              <Button size="lg" variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-600/10" data-testid="button-quote-local">
                Request Quote
              </Button>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">International Relocation</h3>
              <p className="text-gray-300 mb-6">Relocating from abroad to UAE</p>
              <div className="text-3xl font-bold text-amber-400 mb-6">Custom Quote</div>
              <Button size="lg" variant="outline" className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-600/10" data-testid="button-quote-international">
                Request Quote
              </Button>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every relocation is unique. We assess your specific needs and provide a custom quote covering all services.
          </p>
        </div>
      </section>

      {/* Success Stories / Social Proof */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Recent Relocations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                company: "Tech Startup",
                testimony: "Moved from London. DeliWer made the entire process stress-free. My apartment was ready on Day 1."
              },
              {
                name: "Ahmed K.",
                company: "Corporate Executive",
                testimony: "Our company's employee relocations are now handled entirely by DeliWer. Zero complaints from any transferred staff."
              },
              {
                name: "Fatima A.",
                company: "Family of 4",
                testimony: "Coming from Cairo with my family. Everything was arranged perfectly. Highly recommend."
              }
            ].map((story, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <p className="text-gray-300 mb-4 italic">"{story.testimony}"</p>
                <div className="border-t border-slate-600 pt-4">
                  <p className="font-bold text-white">{story.name}</p>
                  <p className="text-sm text-gray-400">{story.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-600/20 via-slate-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Relocate?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Start your relocation journey today. Our team is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/residence/move-in-services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-move-in-cta-relocation">
                Explore Move-In Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-contact-relocation">
              <FileText className="w-4 h-4 mr-2" />
              Get Custom Assessment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
