import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, TrendingUp, Crown, Users } from "lucide-react";

interface BrokerCTABannerProps {
  variant?: "strip" | "card";
  context?: string;
}

export function BrokerCTABanner({ variant = "strip", context }: BrokerCTABannerProps) {
  if (variant === "card") {
    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 p-6 space-y-4"
        data-testid="broker-cta-card"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">31 Active Opportunities</p>
        </div>
        <div className="space-y-1">
          <p className="text-white font-black text-base uppercase tracking-tight leading-snug">
            RERA Broker? Add a Referral Income Stream.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {context || "Earn AED 300–800 per move-in you refer. Free to join, no targets — just share your link after viewings."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 font-semibold">
          {["AED 300–800 per referral", "50/50 lease splits", "Free to join", "DAMAC distress track"].map(t => (
            <span key={t} className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />{t}
            </span>
          ))}
        </div>
        <Link href="/brokers">
          <Button
            data-testid="button-broker-cta-card"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-10 text-sm"
          >
            <Zap className="w-4 h-4 mr-2" /> Get My Free Referral Link
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-950/50 via-slate-900/80 to-purple-950/30 border border-purple-500/20 rounded-2xl px-5 py-4"
      data-testid="broker-cta-strip"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-purple-400" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">31 Active Opportunities · AED 148K Pipeline</p>
          </div>
          <p className="text-white font-black text-sm uppercase tracking-tight truncate">
            {context || "RERA Broker? Earn AED 300–800 per move-in referral. Free to join."}
          </p>
        </div>
      </div>
      <Link href="/brokers" className="shrink-0 w-full sm:w-auto">
        <Button
          data-testid="button-broker-cta-strip"
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-9 px-5 text-xs whitespace-nowrap"
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" /> Get My Referral Link →
        </Button>
      </Link>
    </div>
  );
}
