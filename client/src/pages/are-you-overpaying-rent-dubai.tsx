import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, MessageCircle, TrendingDown, AlertCircle } from "lucide-react";

const AREA_OPTIONS = [
  "Dubai Marina", "JBR", "Downtown Dubai", "Business Bay", "JLT",
  "JVC", "Al Barsha", "Deira", "Bur Dubai", "Silicon Oasis",
  "Sports City", "Al Furjan", "Palm Jumeirah", "DIFC", "Other",
];
const APARTMENT_TYPES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];
const BUILDING_TYPES = ["Standard", "Mid-range", "Luxury / High-end"];

const MARKET_RATES: Record<string, Record<string, number>> = {
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

const BUILDING_MULTIPLIERS: Record<string, number> = { "Standard": 1, "Mid-range": 1.15, "Luxury / High-end": 1.4 };

export default function AreYouOverpayingRentDubai() {
  const [currentRent, setCurrentRent] = useState("");
  const [area, setArea] = useState("");
  const [aptType, setAptType] = useState("");
  const [buildingType, setBuildingType] = useState("Standard");
  const [calculated, setCalculated] = useState(false);

  const current = parseFloat(currentRent) || 0;
  const baseMarket = area && aptType ? MARKET_RATES[area]?.[aptType] ?? 90000 : 90000;
  const marketEst = Math.round(baseMarket * (BUILDING_MULTIPLIERS[buildingType] ?? 1));
  const diff = current - marketEst;
  const pctOver = marketEst > 0 ? ((diff / marketEst) * 100) : 0;
  const isOverpaying = diff > 5000;

  const handleWhatsApp = () => {
    const msg = `Hi DeliWer — I used the Overpayment Detector.\nArea: ${area} | Apartment: ${aptType} | Building: ${buildingType}\nMy current rent: AED ${current.toLocaleString()}/yr\nEstimated market average: AED ${marketEst.toLocaleString()}/yr\n${isOverpaying ? `I appear to be overpaying by AED ${diff.toLocaleString()}/yr.\n` : ""}Please help me plan a move to a better apartment.`;
    window.open("https://wa.me/971523906019?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Are You Overpaying Rent in Dubai? | Free Rent Check | DeliWer"
        description="Enter your current rent, area, and apartment type to see how your rent compares to the Dubai market. Find out if you're overpaying and explore moving options."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950/15 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              Free Rent Check
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Are You Overpaying<br />
              <span className="text-red-400">Rent in Dubai?</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Compare your current rent to what others are paying in the same area and apartment type. Know your number.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Inputs */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Your Apartment Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Your Current Annual Rent (AED)</label>
                <input
                  data-testid="input-current-rent"
                  type="number"
                  value={currentRent}
                  onChange={(e) => { setCurrentRent(e.target.value); setCalculated(false); }}
                  placeholder="e.g. 120000"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Dubai Area</label>
                <select data-testid="select-area" value={area} onChange={(e) => { setArea(e.target.value); setCalculated(false); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-red-500 transition-colors appearance-none">
                  <option value="">Select your area</option>
                  {AREA_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Apartment Type</label>
                <select data-testid="select-apt-type" value={aptType} onChange={(e) => { setAptType(e.target.value); setCalculated(false); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-red-500 transition-colors appearance-none">
                  <option value="">Select type</option>
                  {APARTMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Building Type</label>
                <select data-testid="select-building-type" value={buildingType} onChange={(e) => { setBuildingType(e.target.value); setCalculated(false); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-red-500 transition-colors appearance-none">
                  {BUILDING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <Button
              data-testid="button-check"
              onClick={() => { if (current > 0 && area && aptType) setCalculated(true); }}
              disabled={!currentRent || !area || !aptType}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl h-14 text-base transition-all"
            >
              <Search className="w-5 h-5 mr-2" />
              Check My Rent
            </Button>
          </div>

          {/* Results */}
          {calculated && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl p-8 space-y-6 border-2 ${isOverpaying ? "bg-red-950/30 border-red-500/40" : "bg-emerald-950/30 border-emerald-500/30"}`}
            >
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 text-center">Your Rent Analysis</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/5 rounded-2xl px-6 py-4">
                  <span className="text-gray-400 text-sm font-bold">Average rent in your area</span>
                  <span className="text-white text-lg font-black">AED {marketEst.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 rounded-2xl px-6 py-4">
                  <span className="text-gray-400 text-sm font-bold">Your rent</span>
                  <span className="text-white text-lg font-black">AED {current.toLocaleString()}</span>
                </div>
                <div className={`flex items-center justify-between rounded-2xl px-6 py-5 ${isOverpaying ? "bg-red-500/15 border border-red-500/30" : "bg-emerald-500/10 border border-emerald-500/20"}`}>
                  <span className="font-black text-sm uppercase tracking-tight">{isOverpaying ? "Estimated overpayment" : "You're within market range"}</span>
                  <span data-testid="result-overpayment" className={`text-2xl font-black ${isOverpaying ? "text-red-400" : "text-emerald-400"}`}>
                    {isOverpaying ? `AED ${diff.toLocaleString()}` : `Within ${Math.abs(pctOver).toFixed(0)}%`}
                  </span>
                </div>
              </div>

              {isOverpaying && (
                <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-200 font-medium leading-relaxed">
                    You may be paying <strong>AED {diff.toLocaleString()} more per year</strong> ({pctOver.toFixed(0)}% above market) than comparable tenants in {area}. Moving to a similar apartment could recover this cost.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  data-testid="button-plan-move"
                  onClick={handleWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-14 text-base shadow-xl shadow-emerald-900/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Plan My Move With DeliWer
                </Button>
                <Link href="/move-vs-renew-dubai">
                  <Button
                    data-testid="button-calculator"
                    variant="outline"
                    className="w-full border-white/20 text-gray-300 hover:border-emerald-500/40 hover:text-white font-black rounded-2xl h-12 text-sm transition-all"
                  >
                    Run Move vs Renew Calculator <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Context */}
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-black uppercase tracking-tighter text-white">Why Many Dubai Tenants Overpay</h3>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Many tenants signed leases during peak rental periods in 2021–2022 and have stayed, while newer tenants in the same building or area are paying significantly less. Dubai's rental market has corrected in many areas — but only new tenants benefit automatically.
            </p>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              If your rent is significantly above market, your landlord may still be able to increase it slightly under RERA rules — or you may be able to negotiate using the RERA index as leverage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
