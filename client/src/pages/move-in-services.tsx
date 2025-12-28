import { SEOMeta } from "@/components/seo-meta";
import { CheckCircle, Zap, Users, Clock, AlertCircle, ArrowRight, Phone, Mail } from "lucide-react";
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
      a: "Ideally 2-3 weeks before move-in. We coordinate with utilities and landlords, which requires lead time. Emergency activations (7-14 days) are available at premium rates."
    },
    {
      q: "Do you handle furnished apartments?",
      a: "Yes. Whether furnished, unfurnished, or semi-furnished, we ensure all essential services and systems are operational on Day One."
    },
    {
      q: "What if something goes wrong on move-in day?",
      a: "We provide 24/7 support for the first 30 days. Our concierge team is available by phone or app for any issues."
    },
    {
      q: "Do you work outside Dubai?",
      a: "Yes. We serve Dubai, Sharjah, Ajman, and Abu Dhabi. Regional rates and timelines vary by emirate."
    },
    {
      q: "How much does this cost?",
      a: "Pricing depends on apartment size, location, and service complexity. Request an activation quote for a custom estimate."
    }
  ];

  return (
    <div>
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

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Simple Pricing</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Pricing depends on apartment size, location, and service complexity. Every activation is custom-quoted.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-request-quote-movein">
            Request Activation Quote
          </Button>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What We Deliberately Don't Do
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Trust is built on clarity. Here's what's outside our scope:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Real estate brokerage or rental negotiations",
              "Interior design or decoration",
              "Visa processing or legal documentation",
              "Moving company logistics",
              "Appliance sales (we coordinate your purchases)",
              "Long-term property management"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <p className="text-gray-300">{item}</p>
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
            <a href="tel:+971800000000">
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
