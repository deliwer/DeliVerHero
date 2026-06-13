import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";

export function FindAHomeBanner() {
  return (
    <section className="py-5 px-4 bg-emerald-950/50 border-y border-emerald-500/20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-black text-white text-sm uppercase tracking-tight">Still searching for your Dubai home?</p>
            <p className="text-emerald-400/80 text-xs font-semibold mt-0.5">Browse live projects on the map · Free viewing coordination · No broker fee to you</p>
          </div>
        </div>
        <Link href="/realestate">
          <button
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl px-6 h-10 whitespace-nowrap shrink-0 transition-colors"
            data-testid="cta-find-a-home-banner"
          >
            <MapPin className="w-4 h-4" /> Find a Home <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
}
