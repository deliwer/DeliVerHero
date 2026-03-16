import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, MessageCircle, Info, CheckCircle2 } from "lucide-react";

const AREA_OPTIONS = [
  "Dubai Marina", "JBR", "Downtown Dubai", "Business Bay", "JLT",
  "JVC", "Al Barsha", "Deira", "Bur Dubai", "Silicon Oasis",
  "Sports City", "Al Furjan", "Palm Jumeirah", "DIFC", "Other",
];

const APARTMENT_TYPES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];

function getRERACap(percentBelowMarket: number): { cap: number; label: string; color: string } {
  if (percentBelowMarket <= 10) return { cap: 0, label: "No increase allowed", color: "text-emerald-400" };
  if (percentBelowMarket <= 20) return { cap: 5, label: "Max 5% increase", color: "text-blue-400" };
  if (percentBelowMarket <= 30) return { cap: 10, label: "Max 10% increase", color: "text-yellow-400" };
  if (percentBelowMarket <= 40) return { cap: 15, label: "Max 15% increase", color: "text-orange-400" };
  return { cap: 20, label: "Max 20% increase", color: "text-red-400" };
}

const MARKET_ESTIMATES: Record<string, Record<string, number>> = {
  "Dubai Marina": { Studio: 65000, "1 Bedroom": 95000, "2 Bedrooms": 140000, "3 Bedrooms": 195000, "4+ Bedrooms": 280000 },
  "JBR": { Studio: 72000, "1 Bedroom": 105000, "2 Bedrooms": 155000, "3 Bedrooms": 215000, "4+ Bedrooms": 310000 },
  "Downtown Dubai": { Studio: 80000, "1 Bedroom": 120000, "2 Bedrooms": 175000, "3 Bedrooms": 250000, "4+ Bedrooms": 350000 },
  "Business Bay": { Studio: 65000, "1 Bedroom": 95000, "2 Bedrooms": 140000, "3 Bedrooms": 200000, "4+ Bedrooms": 290000 },
  "JLT": { Studio: 50000, "1 Bedroom": 72000, "2 Bedrooms": 105000, "3 Bedrooms": 145000, "4+ Bedrooms": 200000 },
  "JVC": { Studio: 38000, "1 Bedroom": 55000, "2 Bedrooms": 80000, "3 Bedrooms": 110000, "4+ Bedrooms": 155000 },
  "Al Barsha": { Studio: 45000, "1 Bedroom": 65000, "2 Bedrooms": 90000, "3 Bedrooms": 125000, "4+ Bedrooms": 175000 },
  "Deira": { Studio: 30000, "1 Bedroom": 45000, "2 Bedrooms": 65000, "3 Bedrooms": 90000, "4+ Bedrooms": 130000 },
  "Bur Dubai": { Studio: 32000, "1 Bedroom": 48000, "2 Bedrooms": 70000, "3 Bedrooms": 95000, "4+ Bedrooms": 135000 },
  "Silicon Oasis": { Studio: 35000, "1 Bedroom": 50000, "2 Bedrooms": 72000, "3 Bedrooms": 100000, "4+ Bedrooms": 145000 },
  "Sports City": { Studio: 33000, "1 Bedroom": 48000, "2 Bedrooms": 68000, "3 Bedrooms": 95000, "4+ Bedrooms": 140000 },
  "Al Furjan": { Studio: 40000, "1 Bedroom": 58000, "2 Bedrooms": 85000, "3 Bedrooms": 120000, "4+ Bedrooms": 170000 },
  "Palm Jumeirah": { Studio: 95000, "1 Bedroom": 145000, "2 Bedrooms": 215000, "3 Bedrooms": 300000, "4+ Bedrooms": 450000 },
  "DIFC": { Studio: 85000, "1 Bedroom": 130000, "2 Bedrooms": 190000, "3 Bedrooms": 270000, "4+ Bedrooms": 380000 },
  "Other": { Studio: 42000, "1 Bedroom": 62000, "2 Bedrooms": 90000, "3 Bedrooms": 125000, "4+ Bedrooms": 180000 },
};

export default function RentIncreaseCalculatorDubai() {
  const [currentRent, setCurrentRent] = useState("");
  const [area, setArea] = useState("");
  const [aptType, setAptType] = useState("");
  const [calculated, setCalculated] = useState(false);

  const current = parseFloat(currentRent) || 0;
  const marketEst = area && aptType ? MARKET_ESTIMATES[area]?.[aptType] ?? 90000 : 90000;
  const pctBelowMarket = marketEst > 0 ? Math.max(0, ((marketEst - current) / marketEst) * 100) : 0;
  const cap = getRERACap(pctBelowMarket);
  const maxIncrease = (current * cap.cap) / 100;

  const handleCalculate = () => {
    if (current > 0 && area && aptType) setCalculated(true);
  };

  const handleWhatsApp = () => {
    const msg = `Hi DeliWer — I used the Rent Increase Calculator.\nArea: ${area} | Apartment: ${aptType}\nCurrent rent: AED ${current.toLocaleString()}/yr\nEstimated market: AED ${marketEst.toLocaleString()}/yr\nRera cap: ${cap.label}\nI'd like to explore moving instead.`;
    window.open("https://wa.me/971523946311?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Rent Increase Calculator 2025 | RERA Legal Increase Limit | DeliWer"
        description="Calculate the maximum legal rent increase your landlord can apply in Dubai under RERA's rent index rules. Free rent increase calculator for Dubai tenants."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              RERA Rent Index 2025
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Dubai Rent<br />
              <span className="text-blue-400">Increase Calculator</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Under Dubai's RERA rent index, your landlord can only increase your rent within specific limits. Check how much they can legally charge you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Your Tenancy Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Current Annual Rent (AED)</label>
                <input
                  data-testid="input-current-rent"
                  type="number"
                  value={currentRent}
                  onChange={(e) => { setCurrentRent(e.target.value); setCalculated(false); }}
                  placeholder="e.g. 90000"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Dubai Area</label>
                <select
                  data-testid="select-area"
                  value={area}
                  onChange={(e) => { setArea(e.target.value); setCalculated(false); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-bold focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="">Select your area</option>
                  {AREA_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Apartment Type</label>
                <select
                  data-testid="select-apt-type"
                  value={aptType}
                  onChange={(e) => { setAptType(e.target.value); setCalculated(false); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-bold focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="">Select apartment type</option>
                  {APARTMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <Button
              data-testid="button-calculate"
              onClick={handleCalculate}
              disabled={!currentRent || !area || !aptType}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl h-14 text-base transition-all"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Check Increase Limit
            </Button>
          </div>

          {calculated && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900 border border-blue-500/30 rounded-3xl p-8 space-y-6"
            >
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 text-center">Your Result</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Estimated Market Rent</p>
                  <p className="text-2xl font-black text-white">AED {marketEst.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{aptType} in {area}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Your Rent vs Market</p>
                  <p className="text-2xl font-black text-white">{pctBelowMarket.toFixed(0)}%</p>
                  <p className="text-xs text-gray-500 mt-1">below market</p>
                </div>
                <div className="col-span-2 bg-blue-950/40 border border-blue-500/30 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">RERA Legal Cap</p>
                  <p data-testid="result-rera-cap" className={`text-3xl font-black uppercase tracking-tighter ${cap.color}`}>{cap.label}</p>
                  {cap.cap > 0 && (
                    <p className="text-gray-300 font-bold text-sm">
                      Maximum increase: AED {maxIncrease.toLocaleString()} /year
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <p className="text-gray-400 text-sm font-medium text-center">Is moving a better option?</p>
                <Link href="/move-vs-renew-dubai">
                  <Button
                    data-testid="button-compare-moving"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-12 text-sm transition-all"
                  >
                    Compare Moving Instead <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button
                  data-testid="button-whatsapp-rent"
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full border-white/20 text-gray-300 hover:border-blue-500/40 hover:text-white font-black rounded-2xl h-12 text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discuss My Options on WhatsApp
                </Button>
              </div>
            </motion.div>
          )}

          {/* RERA Rules Explainer */}
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-black uppercase tracking-tighter text-white">Dubai RERA Rent Increase Rules</h3>
            </div>
            <div className="space-y-3">
              {[
                { pct: "0–10% below market", cap: "No increase allowed" },
                { pct: "11–20% below market", cap: "Maximum 5% increase" },
                { pct: "21–30% below market", cap: "Maximum 10% increase" },
                { pct: "31–40% below market", cap: "Maximum 15% increase" },
                { pct: "Over 40% below market", cap: "Maximum 20% increase" },
              ].map((row) => (
                <div key={row.pct} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-gray-400 text-sm font-medium">{row.pct}</span>
                  <span className="text-white text-sm font-black">{row.cap}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Source: Dubai Land Department RERA Decree No. 43 of 2013. Market rates are estimates based on available data. Verify using the official RERA rent index at dubailand.gov.ae.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
