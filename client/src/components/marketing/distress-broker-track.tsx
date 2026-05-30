import { Link } from "wouter";
import { ArrowRight, Crown, TrendingDown, Lock, Sparkles } from "lucide-react";

const WA_LINK =
  "https://wa.me/971523906019?text=Hi%2C%20I%E2%80%99m%20a%20Dubai%20broker.%20Interested%20in%20accessing%20below-market%20DAMAC%20distress%20inventory%20through%20DeliWer.%20Please%20share%20details.";

export function DistressBrokerTrack({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";
  return (
    <section
      data-testid="section-distress-broker-track"
      className={`relative overflow-hidden border rounded-3xl ${
        isLight
          ? "bg-amber-50 border-amber-300"
          : "bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border-amber-500/40"
      } ${className}`}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative grid lg:grid-cols-3 gap-6 items-center p-6 sm:p-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Crown className="w-3 h-3" /> DAMAC Preferred Partner
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-300 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Lock className="w-3 h-3" /> Limited Slots
            </span>
          </div>
          <h3
            className={`font-black text-xl sm:text-2xl mb-2 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            DAMAC Distress Deals — Broker-Only Access Track
          </h3>
          <p
            className={`text-sm leading-relaxed mb-4 ${
              isLight ? "text-slate-700" : "text-slate-300"
            }`}
          >
            A limited number of qualified Dubai brokers can request access to{" "}
            <strong className={isLight ? "text-slate-900" : "text-white"}>
              below-market DAMAC inventory
            </strong>
            {" "}— villas, apartments, townhouses and Business Bay commercial. Close
            faster, earn AED 25k+ per close and stack DeliWer's move-in commission on top.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { v: "120+", l: "Live distress units" },
              { v: "70%", l: "Top broker split" },
              { v: "25k+", l: "AED per close" },
            ].map((s) => (
              <div
                key={s.l}
                className={`rounded-xl p-3 text-center border ${
                  isLight
                    ? "bg-white border-amber-200"
                    : "bg-slate-950/60 border-amber-500/20"
                }`}
              >
                <div className="text-xl font-black text-amber-300">{s.v}</div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    isLight ? "text-slate-500" : "text-gray-500"
                  }`}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/realestate#request-access"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2.5 rounded-lg text-xs transition-all"
              data-testid="link-distress-request-access"
            >
              Request Broker Access <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold px-4 py-2.5 rounded-lg text-xs transition-all"
              data-testid="link-distress-whatsapp"
            >
              💬 WhatsApp Recruiter
            </a>
            <Link
              href="/realestate"
              className={`inline-flex items-center gap-1.5 font-bold px-4 py-2.5 rounded-lg text-xs transition-all border ${
                isLight
                  ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  : "bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700"
              }`}
              data-testid="link-distress-learn-more"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div
            className={`rounded-2xl p-4 border ${
              isLight
                ? "bg-white border-amber-200"
                : "bg-slate-950/70 border-amber-500/20"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-amber-300 font-black mb-3 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Inventory Snapshot
            </div>
            {[
              { name: "DAMAC Hills 2 Villas", count: 38, tag: "-22%" },
              { name: "DAMAC Lagoons TH", count: 27, tag: "-18%" },
              { name: "Bay by Cavalli", count: 19, tag: "Excl." },
              { name: "Business Bay Comm.", count: 41, tag: "Lease" },
            ].map((row) => (
              <div
                key={row.name}
                className={`flex items-center justify-between py-2 border-b last:border-b-0 ${
                  isLight ? "border-slate-200" : "border-slate-800"
                }`}
              >
                <div>
                  <div
                    className={`text-xs font-semibold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {row.name}
                  </div>
                  <div
                    className={`text-[10px] ${
                      isLight ? "text-slate-500" : "text-gray-600"
                    }`}
                  >
                    {row.count} units live
                  </div>
                </div>
                <span className="text-[10px] font-black text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-full px-2 py-0.5">
                  {row.tag}
                </span>
              </div>
            ))}
            <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-emerald-300">
              <Sparkles className="w-3 h-3" /> Pre-portal access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
