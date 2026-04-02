import { SEOMeta } from "@/components/seo-meta";
import { CheckCircle, Zap, ArrowRight, Plane, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PaymentCTA } from "@/components/payment-cta";

export default function MoveInLanding() {
  return (
    <div>
      <SEOMeta
        title="DeliWer - Move In. Everything Works."
        description="Make your apartment livable on Day One. Move-In Services for Dubai, Sharjah, and Abu Dhabi. Utilities, furniture, internet — all coordinated. No stress."
        keywords="move in services, apartment setup Dubai, utilities activation, relocation, move-in day"
      />

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <Home className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/80">Your apartment setup solution</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Move in.<br />Everything works.
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Water, utilities, and essentials ready on Day One. Without coordination.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link href="/residence/move-in-services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" data-testid="button-activate-hero">
                Activate My Move-In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/relocation">
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 px-8" data-testid="button-explore-relocation">
                <Plane className="w-4 h-4 mr-2" />
                Planning to Move?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            What Breaks on Move-In Day
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "Water isn't activated",
              "Electricity fails to connect",
              "Internet isn't installed",
              "Furniture can't be delivered",
              "No one coordinates between services",
              "Landlord doesn't hand over properly"
            ].map((problem, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">✕</span>
                <p className="text-gray-300">{problem}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">We Activate All Of It</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Pre-move coordination",
                "Utilities activated on time",
                "Internet installed & tested",
                "Furniture delivery scheduled",
                "Landlord handover managed",
                "30-day concierge support"
              ].map((solution, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Three Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Request Activation",
                desc: "Tell us your move-in date and apartment details"
              },
              {
                num: "2",
                title: "We Coordinate",
                desc: "We handle utilities, furniture, internet, everything"
              },
              {
                num: "3",
                title: "Move In Stress-Free",
                desc: "Your apartment is ready. Live your life."
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            For Expats. For Families. For Everyone Relocating.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "International Expats",
                desc: "New to Dubai? Unfamiliar with local systems? We handle everything."
              },
              {
                title: "Corporate Relocations",
                desc: "Your company moves employees. We ensure zero downtime, immediate productivity."
              },
              {
                title: "Families Moving",
                desc: "Moving within UAE with kids? We coordinate so you can focus on settling."
              },
              {
                title: "Entrepreneurs & Business Owners",
                desc: "Free-zone professionals needing rapid, professional setup."
              }
            ].map((audience, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">{audience.title}</h3>
                <p className="text-gray-400 text-sm">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Transparent */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Simple, Transparent Pricing
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-12 border border-slate-700 mb-8">
            <p className="text-gray-300 mb-4">
              Your cost depends on:
            </p>
            <ul className="text-gray-400 space-y-2 max-w-md mx-auto mb-8">
              <li>• Apartment size & location</li>
              <li>• Services needed</li>
              <li>• Move-in timeline</li>
              <li>• Region (Dubai, Sharjah, Abu Dhabi)</li>
            </ul>
            <p className="text-gray-300">
              We'll give you a custom quote. No surprises.
            </p>
          </div>

          <Link href="/residence/move-in-services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-request-quote-hero">
              Request Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What We Don't Do
          </h2>
          
          <p className="text-gray-300 text-center mb-8 text-lg">
            Trust is built on clarity. Here's what's outside our scope:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Real estate brokerage",
              "Interior design",
              "Visa processing",
              "Legal paperwork",
              "Moving companies",
              "Property management"
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 text-center">
                <p className="text-gray-400 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* Payment CTA */}
      <section className="py-10 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <PaymentCTA
            variant="banner"
            title="Pay for Your Move-In Services"
            subtitle="Agreed your move-in package on WhatsApp? Pay securely via PayPal or request bank transfer for remote orders."
          />
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Activate Your Move-In?
          </h2>
          
          <p className="text-gray-300 mb-12 text-lg">
            One trusted partner. Complete coordination. Your apartment ready on Day One.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/residence/move-in-services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" data-testid="button-activate-final-hero">
                Activate Now
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/relocation">
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 px-8" data-testid="button-learn-relocation-final">
                Explore All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
