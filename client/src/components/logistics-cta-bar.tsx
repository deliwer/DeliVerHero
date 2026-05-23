import { Link } from "wouter";
import { Anchor, ArrowRight, Smartphone } from "lucide-react";

interface LogisticsCTABarProps {
  variant?: "banner" | "strip" | "chaintrack";
}

export function LogisticsCTABar({ variant = "strip" }: LogisticsCTABarProps) {
  if (variant === "chaintrack") {
    return (
      <Link href="/partners#phone-flipper-track" data-testid="chaintrack-cta-banner">
        <div className="relative overflow-hidden flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-purple-700/90 via-violet-700/90 to-purple-700/90 backdrop-blur-sm border-b border-purple-500/40 hover:from-purple-600/90 hover:via-violet-600/90 hover:to-purple-600/90 transition-all cursor-pointer group">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)",
            }}
          />
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-white">
              ChainTrack Marketplace
            </span>
            <span className="text-purple-200 text-[11px] font-semibold hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-purple-100">
              Buy, Flip &amp; Earn on Used iPhones — Join as Phone Flipper
            </span>
          </div>
          <span className="relative z-10 ml-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-widest shrink-0 flex items-center gap-1 group-hover:bg-white/30 transition-colors">
            Apply Now <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "banner") {
    return (
      <Link href="/logistics-funnel" data-testid="logistics-cta-banner">
        <div className="relative overflow-hidden flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-amber-600/90 backdrop-blur-sm border-b border-amber-500/40 hover:from-amber-500/90 hover:via-orange-500/90 hover:to-amber-500/90 transition-all cursor-pointer group">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)",
            }}
          />
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
              <Anchor className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-white">
              ChainTrack Logistics
            </span>
            <span className="text-amber-200 text-[11px] font-semibold hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-amber-100">
              Dubai ↔ Gawadar Corridor Now Open — Join as Freight Broker
            </span>
          </div>
          <span className="relative z-10 ml-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-widest shrink-0 flex items-center gap-1 group-hover:bg-white/30 transition-colors">
            Apply Now <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/logistics-funnel" data-testid="logistics-cta-strip">
      <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/25 bg-gradient-to-r from-amber-500/8 via-orange-500/5 to-transparent hover:border-amber-500/40 hover:from-amber-500/12 transition-all cursor-pointer group mx-4 my-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20 flex-shrink-0">
            <Anchor className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-amber-300 uppercase tracking-wider leading-none">ChainTrack Logistics</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Dubai ↔ Gawadar · Earn per CBM</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-400 group-hover:text-amber-300 transition-colors">
          <span className="text-[10px] font-black uppercase tracking-wider hidden sm:block">Join Now</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
