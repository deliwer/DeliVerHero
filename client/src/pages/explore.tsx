import { SEOMeta } from "@/components/seo-meta";
import { ArrowRight, ShoppingCart, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Explore() {
  const futureServices = [
    {
      title: "Shopping",
      description: "Marketplace for daily essentials, available after move-in activation",
      status: "Coming Soon",
      icon: <ShoppingCart className="w-8 h-8" />
    },
    {
      title: "Entrepreneur Program",
      description: "Business registration, licensing, and support for new ventures in Dubai",
      status: "Coming Soon",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Community Integrations",
      description: "Connect with local communities, events, and networking opportunities",
      status: "Coming Soon",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Partner Network",
      description: "Exclusive partnerships with local service providers and businesses",
      status: "Coming Soon",
      icon: <Sparkles className="w-8 h-8" />
    }
  ];

  return (
    <div>
      <SEOMeta
        title="Explore DeliWer - Future Services & Opportunities"
        description="Discover what's coming next at DeliWer. Shopping, entrepreneurship programs, community integrations, and exclusive partnerships — all built around your relocation and settlement."
        keywords="DeliWer future services, shopping platform, entrepreneur program Dubai, community network, business opportunities"
      />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600/20 via-slate-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore DeliWer's Future
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            More services are coming. All designed to support your relocation and help you build your life in Dubai.
          </p>
        </div>
      </section>

      {/* Future Services Grid */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            What's Next
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {futureServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-8 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="text-purple-400 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full">
                  <span className="text-sm text-purple-300 font-semibold">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Building This */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why We're Building This
          </h2>
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <p className="text-lg text-gray-300 mb-6">
              Relocation is just the beginning. Once your apartment is live, you need to:
            </p>
            <ul className="space-y-4 mb-6 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">•</span>
                Shop for daily essentials and household items
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">•</span>
                Register a business if you're an entrepreneur
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">•</span>
                Find community and belonging in a new place
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">•</span>
                Access trusted local partners and networks
              </li>
            </ul>
            <p className="text-gray-400">
              We're building these services to create a complete ecosystem around your relocation. Not all at once — but as you settle in and need them.
            </p>
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Early Access</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Be the first to know when new services launch. Sign up for updates.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700 max-w-lg mx-auto">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                data-testid="input-email-explore"
              />
              <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-signup-early-access">
                Notify Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Back to Main */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">
            Begin your relocation journey today with our core move-in services.
          </p>
          <Link href="/move-in-services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-back-to-movein">
              Activate Move-In Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
