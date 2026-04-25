import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import { DubaiWellnessJourney } from "@/components/dubai-wellness-journey";

export default function Wellness() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Dubai Wellness Journey · DeliWer</title>
        <meta
          name="description"
          content="Walk, cycle and eat your way through Dubai's first wellness passport experience. Hotel-to-track perks, La Perle Aqua Show rewards and AquaCafe loyalty benefits."
        />
        <meta property="og:title" content="Dubai Wellness Journey · DeliWer" />
        <meta
          property="og:description"
          content="Earn Planet Points and unlock La Perle Aqua Show perks while living more sustainably in Dubai."
        />
        <link rel="canonical" href="https://deliwer.com/wellness" />
      </Helmet>

      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-950 to-cyan-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-4">
              <Leaf className="w-3.5 h-3.5 mr-1.5" /> Wellness Passport
            </Badge>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4"
              data-testid="heading-wellness-hero"
            >
              Dubai's first{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                hotel-to-wellness
              </span>{" "}
              passport
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mb-6">
              Walk, cycle and eat your way through verified wellness checkpoints —
              earn Planet Points, unlock La Perle Aqua Show perks and finish at
              AquaCafe in Business Bay.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#wellness-journey">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 px-6"
                  data-testid="button-wellness-start"
                >
                  Start the Journey <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/taf">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/40 bg-transparent text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 font-bold h-12 px-6"
                  data-testid="button-wellness-tell-friend"
                >
                  <Sparkles className="w-5 h-5 mr-2" /> Tell a Friend
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="wellness-journey">
        <DubaiWellnessJourney />
      </div>
    </div>
  );
}
