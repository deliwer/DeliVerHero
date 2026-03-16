import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, MessageCircle, TrendingDown, Home, CheckCircle2 } from "lucide-react";

function calcSavings(currentRent: number, renewalRent: number, movingCost: number) {
  const annualRentalSaving = currentRent - renewalRent;
  const netFirstYear = annualRentalSaving - movingCost;
  const netSecondYear = annualRentalSaving * 2 - movingCost;
  return { annualRentalSaving, netFirstYear, netSecondYear };
}

export default function MoveVsRenewDubai() {
  const [currentRent, setCurrentRent] = useState("");
  const [renewalRent, setRenewalRent] = useState("");
  const [movingCost, setMovingCost] = useState("5000");
  const [calculated, setCalculated] = useState(false);

  const current = parseFloat(currentRent) || 0;
  const renewal = parseFloat(renewalRent) || 0;
  const moving = parseFloat(movingCost) || 5000;
  const result = calcSavings(current, renewal, moving);
  const shouldMove = result.netFirstYear > 0;

  const handleCalculate = () => {
    if (current > 0 && renewal > 0) setCalculated(true);
  };

  const handleWhatsApp = () => {
    const msg = `Hi DeliWer — I used the Move vs Renew calculator.\nCurrent rent: AED ${current.toLocaleString()}/yr\nRenewal rent: AED ${renewal.toLocaleString()}/yr\nEstimated moving cost: AED ${moving.toLocaleString()}\nResult: Moving could save AED ${result.netFirstYear.toLocaleString()} in year one.\nPlease help me coordinate my move.`;
    window.open("https://wa.me/971523946311?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Move vs Renew Calculator Dubai | Should I Move or Renew My Lease? | DeliWer"
        description="Calculate whether moving to a new apartment or renewing your lease saves you more money in Dubai. Free Move vs Renew calculator."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              Free Calculator
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Move vs Renew<br />
              <span className="text-violet-400">Calculator Dubai</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Enter your current rent, your renewal offer, and estimated moving costs to see which option saves you more money.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Your Numbers</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  Current Annual Rent (AED)
                </label>
                <input
                  data-testid="input-current-rent"
                  type="number"
                  value={currentRent}
                  onChange={(e) => { setCurrentRent(e.target.value); setCalculated(false); }}
                  placeholder="e.g. 120000"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  Landlord's Renewal Offer (AED / year)
                </label>
                <input
                  data-testid="input-renewal-rent"
                  type="number"
                  value={renewalRent}
                  onChange={(e) => { setRenewalRent(e.target.value); setCalculated(false); }}
                  placeholder="e.g. 105000"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  Estimated Moving Cost (AED)
                </label>
                <input
                  data-testid="input-moving-cost"
                  type="number"
                  value={movingCost}
                  onChange={(e) => { setMovingCost(e.target.value); setCalculated(false); }}
                  placeholder="e.g. 5000"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <p className="text-xs text-gray-600 mt-1.5 font-medium">Includes movers, Ejari, DEWA, cleaning. DeliWer coordination helps keep this low.</p>
              </div>
            </div>

            <Button
              data-testid="button-calculate"
              onClick={handleCalculate}
              disabled={!currentRent || !renewalRent}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl h-14 text-base transition-all"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate
            </Button>
          </div>

          {/* Results */}
          {calculated && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl p-8 space-y-6 border-2 ${
                shouldMove
                  ? "bg-emerald-950/40 border-emerald-500/40"
                  : "bg-amber-950/30 border-amber-500/30"
              }`}
            >
              <div className="text-center space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Your Result</p>
                <h3 className={`text-4xl font-black uppercase tracking-tighter ${shouldMove ? "text-emerald-400" : "text-amber-400"}`}>
                  {shouldMove ? "Moving Saves You Money" : "Renewing May Be Smarter"}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Annual Rental Saving</p>
                  <p className={`text-2xl font-black ${result.annualRentalSaving > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {result.annualRentalSaving > 0 ? "+" : ""}AED {Math.abs(result.annualRentalSaving).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Net Saving — Year 1</p>
                  <p data-testid="result-net-year1" className={`text-2xl font-black ${result.netFirstYear >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {result.netFirstYear >= 0 ? "+" : ""}AED {Math.abs(result.netFirstYear).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 text-center col-span-2">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Cumulative Saving — Year 2</p>
                  <p className={`text-3xl font-black ${result.netSecondYear >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {result.netSecondYear >= 0 ? "+" : ""}AED {Math.abs(result.netSecondYear).toLocaleString()}
                  </p>
                </div>
              </div>

              {shouldMove && (
                <div className="space-y-3">
                  <Button
                    data-testid="button-coordinate-move"
                    onClick={handleWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-14 text-base shadow-xl shadow-emerald-900/30 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Coordinate My Move on WhatsApp
                  </Button>
                  <p className="text-center text-xs text-gray-500 font-bold uppercase tracking-widest">DeliWer coordinates movers · Ejari · DEWA · Cleaning</p>
                </div>
              )}

              {!shouldMove && (
                <div className="space-y-3">
                  <Link href="/are-you-overpaying-rent-dubai">
                    <Button
                      data-testid="button-check-overpaying"
                      variant="outline"
                      className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-2xl h-14 text-sm transition-all"
                    >
                      Check If You're Overpaying Rent <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Explanation */}
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-5">
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">How This Works</h3>
            <div className="space-y-4">
              {[
                { icon: TrendingDown, title: "Annual Rental Saving", body: "The difference between your current rent and the cheaper alternative you've found in Dubai." },
                { icon: Home, title: "Moving Cost", body: "Typically includes movers (AED 1,500–4,000), Ejari fees, DEWA transfer, and cleaning. DeliWer helps keep this low." },
                { icon: CheckCircle2, title: "Net Saving", body: "After deducting moving costs from rental savings. In year 2, the full annual saving applies with no moving costs." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-9 h-9 bg-violet-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{title}</p>
                    <p className="text-gray-400 text-xs font-medium mt-0.5 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
