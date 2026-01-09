import { SEOMeta } from "@/components/seo-meta";
import { 
  CheckCircle, 
  Zap, 
  Users, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  Building2, 
  HelpCircle, 
  Globe, 
  DollarSign, 
  Home,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MoveInServices() {
  const steps = [
    {
      number: "1",
      title: "Pre-Move Coordination",
      description: "We coordinate with your landlord, utilities, and service providers 2 weeks before move-in."
    },
    {
      number: "2",
      title: "Move-In Day Activation",
      description: "All utilities are active, essentials are in place, and your apartment is livable before you arrive."
    },
    {
      number: "3",
      title: "Post-Move Support",
      description: "30 days of concierge support for any issues or adjustments needed."
    }
  ];

  const problems = [
    "Water and electricity aren't activated on move-in day",
    "No furniture delivery coordination",
    "Internet is not connected",
    "Landlord handover is disorganized",
    "You can't find essential service providers",
    "No one coordinates between multiple services"
  ];

  const solutions = [
    "Pre-move coordination with utilities",
    "Furniture delivery scheduled before arrival",
    "Internet installed and tested",
    "Professional landlord handover process",
    "Vetted local service providers",
    "Single point of contact for everything"
  ];

  const audiences = [
    {
      title: "Corporate Relocations",
      description: "Companies relocating employees to Dubai with zero downtime"
    },
    {
      title: "International Expats",
      description: "New arrivals from around the world unfamiliar with local systems"
    },
    {
      title: "Free-Zone Professionals",
      description: "Business owners and entrepreneurs needing rapid setup"
    },
    {
      title: "Families Moving Within UAE",
      description: "Local relocations within Dubai, Sharjah, or Abu Dhabi"
    }
  ];

  const faqItems = [
    {
      q: "What exactly is move-in services?",
      a: "Move-in services coordinate all aspects of apartment activation for your arrival: utilities, internet, furniture, appliances, and landlord handover. One service. One point of contact."
    },
    {
      q: "How far in advance do I need to book?",
      a: "Ideally 2-3 weeks before move-in. We coordinate with utilities and landlords, which requires lead time."
    },
    {
      q: "Do you handle furnished apartments?",
      a: "Yes. Whether furnished, unfurnished, or semi-furnished, we ensure all essential services and systems are operational on Day One."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar / Support Menu */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-r border-slate-800 p-6 space-y-8 sticky top-0 h-screen">
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settlement Support</h3>
          <nav className="space-y-2">
            <Link href="/relocate/move-in-services" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Move-In Services</span>
            </Link>
            <Link href="/relocate/business-setup" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Company Setup</span>
            </Link>
            <Link href="/relocate/pricing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Pricing Plans</span>
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Navigation</h3>
          <nav className="space-y-2">
            <Link href="/relocate" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Relocate Home</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home Page</span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto space-y-4 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 text-slate-400">
            <Phone className="w-4 h-4" />
            <span className="text-sm">+971 4 250 1500</span>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <SEOMeta
          title="Move-In Services Dubai - Day One Activation for Apartments"
          description="Make your apartment livable on Day One without coordination. Professional move-in services covering utilities, internet, furniture, and landlord handover in Dubai, Sharjah, and Abu Dhabi."
          keywords="move-in services Dubai, apartment activation, utilities setup Dubai, relocation services, furniture delivery coordination, internet installation, landlord handover"
        />

        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Make Your Apartment Livable on Day One
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Water, utilities, and essentials ready on your move-in day — without coordination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-activate-movein">
                Activate My Move-In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-learn-more-movein">
                Learn How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 px-4 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              What Breaks on Move-In Day
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {problems.map((problem, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              What We Activate
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {solutions.map((solution, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <div className="text-4xl font-bold text-blue-500 mb-4">{step.number}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Who This Is For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {audiences.map((audience, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <Users className="w-6 h-6 text-blue-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{audience.title}</h3>
                  <p className="text-gray-400">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-3">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Activate Your Move-In?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Contact us to discuss your move-in needs and get a custom quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-activate-final">
                Activate Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href="tel:+97142501500">
                <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
