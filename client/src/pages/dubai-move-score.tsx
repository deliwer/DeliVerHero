import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowRight, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";

const AREAS = [
  "Dubai Marina", "JBR", "Downtown Dubai", "Business Bay", "JLT",
  "JVC", "Al Barsha", "Deira", "Bur Dubai", "Silicon Oasis",
  "Sports City", "Al Furjan", "Palm Jumeirah", "DIFC", "Other",
];
const APT_SIZES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];

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

function calcMoveScore(currentRent: number, renewalRent: number, area: string, aptSize: string, monthsToRenewal: number): { score: number; reasons: string[] } {
  const market = MARKET_RATES[area]?.[aptSize] ?? 90000;
  const pctOverMarket = market > 0 ? ((currentRent - market) / market) * 100 : 0;
  const renewalIncrease = currentRent > 0 ? ((renewalRent - currentRent) / currentRent) * 100 : 0;
  const reasons: string[] = [];
  let score = 0;

  // Factor 1: current rent vs market (max 40 pts)
  if (pctOverMarket > 30) { score += 40; reasons.push(`Your rent is ${pctOverMarket.toFixed(0)}% above nearby market rates.`); }
  else if (pctOverMarket > 15) { score += 28; reasons.push(`Your rent is ${pctOverMarket.toFixed(0)}% above the area average.`); }
  else if (pctOverMarket > 5) { score += 15; reasons.push(`Your rent is slightly above the market average.`); }
  else if (pctOverMarket < -10) { score += 5; reasons.push("Your rent is below market — you have a good deal."); }

  // Factor 2: renewal increase (max 35 pts)
  if (renewalIncrease > 15) { score += 35; reasons.push(`Renewal increase of ${renewalIncrease.toFixed(0)}% may exceed RERA limits.`); }
  else if (renewalIncrease > 8) { score += 22; reasons.push(`Renewal increase of ${renewalIncrease.toFixed(0)}% is significant.`); }
  else if (renewalIncrease > 3) { score += 10; reasons.push(`Renewal increase of ${renewalIncrease.toFixed(0)}% is moderate.`); }

  // Factor 3: months to renewal (max 15 pts)
  if (monthsToRenewal <= 2) { score += 15; reasons.push("Your lease expires very soon — plan now to avoid rushed decisions."); }
  else if (monthsToRenewal <= 4) { score += 8; reasons.push("Your lease renewal window is approaching."); }

  // Factor 4: area trend bonus
  const highMobilityAreas = ["Dubai Marina", "JBR", "Downtown Dubai", "DIFC", "Palm Jumeirah"];
  if (highMobilityAreas.includes(area)) { score += 10; reasons.push(`${area} has high tenant mobility — many are finding better value elsewhere.`); }

  return { score: Math.min(100, score), reasons };
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 70 ? "text-emerald-400" : score >= 45 ? "text-amber-400" : "text-blue-400";
  const label = score >= 70 ? "Move Recommended" : score >= 45 ? "Consider Moving" : "Stay & Negotiate";
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`text-8xl font-black tracking-tighter ${color}`} data-testid="score-value">{score}</div>
      <div className="text-sm text-gray-400 font-black uppercase tracking-widest">/100 Move Score</div>
      <Badge className={`${score >= 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : score >= 45 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"} px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full`}>
        {label}
      </Badge>
    </div>
  );
}

export default function DubaiMoveScore() {
  const [currentRent, setCurrentRent] = useState("");
  const [renewalRent, setRenewalRent] = useState("");
  const [area, setArea] = useState("");
  const [aptSize, setAptSize] = useState("");
  const [months, setMonths] = useState("3");
  const [result, setResult] = useState<{ score: number; reasons: string[] } | null>(null);

  const handleCalculate = () => {
    const c = parseFloat(currentRent) || 0;
    const r = parseFloat(renewalRent) || 0;
    if (c > 0 && area && aptSize) {
      setResult(calcMoveScore(c, r, area, aptSize, parseInt(months) || 3));
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi DeliWer — I used the Move Score tool.\nArea: ${area} | Apartment: ${aptSize}\nCurrent rent: AED ${parseFloat(currentRent).toLocaleString()}/yr\nRenewal offer: AED ${parseFloat(renewalRent).toLocaleString()}/yr\nMove Score: ${result?.score}/100\nPlease help me plan my move.`;
    window.open("https://wa.me/971523906019?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Move Score | Should I Move Apartment in Dubai? | DeliWer"
        description="Get your personalised Dubai Move Score. Enter your rent, area, and renewal details to see how likely you should consider moving to a better apartment."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/15 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              Move Intelligence Tool
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Dubai<br />
              <span className="text-amber-400">Move Score</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Answer five quick questions and get a personalised score telling you how strongly you should consider moving apartments in Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Inputs */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Your Situation</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Current Annual Rent (AED)</label>
                <input data-testid="input-current-rent" type="number" value={currentRent} onChange={(e) => { setCurrentRent(e.target.value); setResult(null); }} placeholder="e.g. 110000"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Renewal Offer from Landlord (AED/yr, if known)</label>
                <input data-testid="input-renewal-rent" type="number" value={renewalRent} onChange={(e) => { setRenewalRent(e.target.value); setResult(null); }} placeholder="e.g. 125000 (leave blank if no offer yet)"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Your Area in Dubai</label>
                <select data-testid="select-area" value={area} onChange={(e) => { setArea(e.target.value); setResult(null); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                  <option value="">Select area</option>
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Apartment Size</label>
                <select data-testid="select-apt-size" value={aptSize} onChange={(e) => { setAptSize(e.target.value); setResult(null); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                  <option value="">Select size</option>
                  {APT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Months Until Lease Renewal</label>
                <select data-testid="select-months" value={months} onChange={(e) => { setMonths(e.target.value); setResult(null); }}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                  {["1", "2", "3", "4", "5", "6", "9", "12"].map((m) => <option key={m} value={m}>{m} month{parseInt(m) !== 1 ? "s" : ""}</option>)}
                </select>
              </div>
            </div>
            <Button
              data-testid="button-get-score"
              onClick={handleCalculate}
              disabled={!currentRent || !area || !aptSize}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl h-14 text-base transition-all"
            >
              <Star className="w-5 h-5 mr-2" />
              Get My Move Score
            </Button>
          </div>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 space-y-8"
            >
              <ScoreGauge score={result.score} />

              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Why this score</p>
                {result.reasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>

              {result.score >= 45 && (
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <Button
                    data-testid="button-plan-move"
                    onClick={handleWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-14 text-base shadow-xl shadow-emerald-900/30 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Plan My Move With DeliWer
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/move-vs-renew-dubai">
                      <Button variant="outline" className="w-full border-white/20 text-gray-400 hover:text-white font-black rounded-2xl h-11 text-xs transition-all">
                        Move vs Renew Calc <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                    <Link href="/are-you-overpaying-rent-dubai">
                      <Button variant="outline" className="w-full border-white/20 text-gray-400 hover:text-white font-black rounded-2xl h-11 text-xs transition-all">
                        Check Overpayment <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {result.score < 45 && (
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <p className="text-gray-400 text-sm font-medium text-center">Your score suggests staying may be smarter right now. But check these tools:</p>
                  <div className="grid grid-cols-1 gap-3">
                    <Link href="/rent-increase-calculator-dubai">
                      <Button variant="outline" className="w-full border-white/20 text-gray-400 hover:text-white font-black rounded-2xl h-11 text-sm transition-all">
                        Check Legal Rent Increase Limit <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
