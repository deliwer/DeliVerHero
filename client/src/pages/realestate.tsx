import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  TrendingDown,
  Handshake,
  Zap,
  CheckCircle2,
  ArrowRight,
  Phone,
  Lock,
  Sparkles,
  Building2,
} from "lucide-react";

const WA_LINK =
  "https://wa.me/971523946311?text=Hi%2C%20I%E2%80%99m%20a%20Dubai%20broker.%20Interested%20in%20accessing%20below-market%20DAMAC%20inventory%20through%20DeliWer.%20Please%20share%20details.";

export default function RealEstate() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Dubai Brokers: Access Below-Market DAMAC Units | DeliWer</title>
        <meta
          name="description"
          content="Join a limited group of Dubai brokers accessing distress-driven DAMAC inventory. Close faster and earn more per deal with DeliWer."
        />
        <meta
          property="og:title"
          content="Dubai Brokers: Access Below-Market DAMAC Units | DeliWer"
        />
        <meta
          property="og:description"
          content="Priority access to distress-driven DAMAC inventory + earn more per transaction with DeliWer move-in services."
        />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <Badge
            className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-5"
            data-testid="badge-broker-access"
          >
            <Crown className="w-3.5 h-3.5 mr-1.5" /> For Active Dubai Brokers
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Access{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Below-Market DAMAC Units
            </span>{" "}
            + Close Deals Faster
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-7 leading-relaxed max-w-3xl mx-auto">
            For a limited group of active Dubai brokers. Get priority access to{" "}
            <strong className="text-white">distress-driven inventory</strong> +{" "}
            <strong className="text-white">earn more per transaction</strong>.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/broker-partner">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-hero-request-access"
              >
                Request Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10"
                data-testid="button-hero-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Now
              </Button>
            </a>
          </div>

          <p
            className="text-xs text-slate-400 mt-5 flex items-center justify-center gap-1.5"
            data-testid="text-trust-line"
          >
            <Lock className="w-3.5 h-3.5" />
            Limited broker onboarding • Priority access
          </p>

          <div className="mt-8 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 rounded-full px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4" />
            Earn <strong className="text-white">AED 300–800 extra per deal</strong>{" "}
            via DeliWer move-in services
          </div>
        </div>
      </section>

      {/* SECTION 2: POSITIONING */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-5" data-testid="heading-positioning">
          Not another listing source
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-3">
          This is not a portal or open inventory list.
        </p>
        <p className="text-lg text-slate-300 leading-relaxed">
          We work with a small pool of brokers to route serious buyers into{" "}
          <strong className="text-white">below-market</strong> opportunities and help{" "}
          <strong className="text-white">close deals faster</strong>.
        </p>
      </section>

      {/* SECTION 3: VALUE STACK */}
      <section className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-value-stack">
              What you unlock
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: TrendingDown,
                text: (
                  <>
                    <strong className="text-white">Distress-driven DAMAC inventory</strong>{" "}
                    (below market)
                  </>
                ),
              },
              {
                icon: Zap,
                text: (
                  <>
                    <strong className="text-white">Faster deal closures</strong> with move-in
                    support (utilities, essentials handled)
                  </>
                ),
              },
              {
                icon: Sparkles,
                text: (
                  <>
                    <strong className="text-white">Additional commission layer</strong> via
                    DeliWer services
                  </>
                ),
              },
              {
                icon: Handshake,
                text: <>Buyer routing (when available)</>,
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-slate-950/60 border-slate-800 hover-elevate"
                data-testid={`card-value-${i}`}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <p className="text-slate-300 leading-relaxed pt-2">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/broker-partner">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-value-request-access"
              >
                Request Access <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY IT WORKS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-why-it-works">
            Why brokers are using this
          </h2>
        </div>
        <p className="text-lg text-slate-300 leading-relaxed text-center mb-8">
          In a slower market, <strong className="text-white">speed wins deals</strong>.
        </p>
        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            "Remove friction at closing",
            "Offer a ready-to-move-in advantage to buyers",
            "Monetize beyond just commission",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 bg-slate-900/60 border border-slate-800 rounded-lg p-4"
              data-testid={`item-why-${t.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SCARCITY */}
      <section className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="bg-red-500/15 text-red-300 border-red-500/30 mb-4">
            <Lock className="w-3.5 h-3.5 mr-1.5" /> Limited Spots
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-5" data-testid="heading-scarcity">
            Limited access
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            We're onboarding a small number of active brokers to keep deal flow
            high-quality.
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto">
            {["Not open to everyone", "Priority given to brokers closing monthly deals"].map(
              (t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 bg-slate-950/60 border border-amber-500/20 rounded-lg p-4"
                  data-testid={`item-scarcity-${t.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
                  <span className="text-slate-200">{t}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-process">
            How it works
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "1", title: "Request access", desc: "Quick application — under 2 minutes." },
            {
              n: "2",
              title: "Get added to priority broker pool",
              desc: "Onboarded with deal flow & support.",
            },
            {
              n: "3",
              title: "Receive opportunities + close faster",
              desc: "Distress inventory + move-in support.",
            },
          ].map((s) => (
            <Card
              key={s.n}
              className="bg-slate-900/60 border-slate-800 hover-elevate"
              data-testid={`card-step-${s.n}`}
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center mb-3">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/broker-partner">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
              data-testid="button-process-request-access"
            >
              Request Access <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="border-t border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2
            className="text-3xl sm:text-5xl font-bold mb-6"
            data-testid="heading-final-cta"
          >
            Get Access Before Slots Fill
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Limited broker onboarding window. Priority for brokers closing monthly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/broker-partner">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-final-request-access"
              >
                Request Access <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10"
                data-testid="button-final-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-amber-300" />
          DeliWer Real Estate · DAMAC Preferred Partner
        </div>
        <div>realestate.deliwer.com · Dubai, UAE</div>
      </footer>

      {/* Sticky WhatsApp Button (mobile + desktop) */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-sticky-whatsapp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-3 rounded-full shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
