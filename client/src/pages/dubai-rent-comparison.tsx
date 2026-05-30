import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { TrendingDown, MessageCircle, ArrowRight, BarChart2 } from "lucide-react";

const AREA_DATA = [
  { area: "Palm Jumeirah", studio: 95000, one: 145000, two: 215000, three: 300000 },
  { area: "Downtown Dubai", studio: 80000, one: 120000, two: 175000, three: 250000 },
  { area: "DIFC", studio: 85000, one: 130000, two: 190000, three: 270000 },
  { area: "Dubai Marina", studio: 65000, one: 95000, two: 140000, three: 195000 },
  { area: "JBR", studio: 72000, one: 105000, two: 155000, three: 215000 },
  { area: "Business Bay", studio: 65000, one: 95000, two: 140000, three: 200000 },
  { area: "JLT", studio: 50000, one: 72000, two: 105000, three: 145000 },
  { area: "Al Barsha", studio: 45000, one: 65000, two: 90000, three: 125000 },
  { area: "Al Furjan", studio: 40000, one: 58000, two: 85000, three: 120000 },
  { area: "JVC", studio: 38000, one: 55000, two: 80000, three: 110000 },
  { area: "Sports City", studio: 33000, one: 48000, two: 68000, three: 95000 },
  { area: "Silicon Oasis", studio: 35000, one: 50000, two: 72000, three: 100000 },
  { area: "Bur Dubai", studio: 32000, one: 48000, two: 70000, three: 95000 },
  { area: "Deira", studio: 30000, one: 45000, two: 65000, three: 90000 },
];

const COMPARISONS = [
  {
    from: "Dubai Marina",
    to: "JVC",
    type: "1 Bedroom",
    fromRent: 95000,
    toRent: 55000,
    saving: 40000,
    desc: "Same size apartment, half the distance from the city. Many Marina tenants are making this move.",
  },
  {
    from: "Downtown Dubai",
    to: "Business Bay",
    type: "2 Bedrooms",
    fromRent: 175000,
    toRent: 140000,
    saving: 35000,
    desc: "Business Bay offers similar lifestyle and proximity to Downtown at meaningfully lower rents.",
  },
  {
    from: "Dubai",
    to: "Sharjah",
    type: "2 Bedrooms",
    fromRent: 105000,
    toRent: 52000,
    saving: 53000,
    desc: "Tenants commuting to Dubai from Sharjah can save significantly — popular among families and professionals.",
  },
  {
    from: "JBR",
    to: "JLT",
    type: "1 Bedroom",
    fromRent: 105000,
    toRent: 72000,
    saving: 33000,
    desc: "JLT is walkable, metro-connected and just minutes from JBR — at significantly lower rental rates.",
  },
];

const MAX_RENT = 300000;

export default function DubaiRentComparison() {
  const handleWhatsApp = (from?: string, to?: string, saving?: number) => {
    const msg = from
      ? `Hi DeliWer — I'm considering moving from ${from} to ${to} to save approximately AED ${saving?.toLocaleString()} per year. Please help me coordinate the move.`
      : "Hi DeliWer — I'd like to explore moving to a cheaper area in Dubai. Please help me plan my move.";
    window.open("https://wa.me/971523906019?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Rent Comparison 2025 | Compare Rents Across Dubai Areas | DeliWer"
        description="Compare average rents across Dubai areas including Marina, JVC, Downtown, Business Bay, JLT, and Sharjah. Find where you can save the most on rent."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              2025 Market Data
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Dubai Rent<br />
              <span className="text-teal-400">Comparison</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Compare average annual rents across Dubai's most popular residential areas. See where your money goes further.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="pb-14 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs text-teal-400 font-black uppercase tracking-widest">Top relocation routes</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Common Moves in Dubai</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMPARISONS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-900 border border-white/10 hover:border-teal-500/30 rounded-3xl p-6 space-y-4 transition-all"
                data-testid={`comparison-card-${i}`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-white text-sm">{c.from}</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                  <span className="font-black text-teal-400 text-sm">{c.to}</span>
                  <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-xs ml-auto">{c.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{c.from}</p>
                    <p className="text-lg font-black text-white">AED {c.fromRent.toLocaleString()}</p>
                  </div>
                  <div className="bg-teal-500/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{c.to}</p>
                    <p className="text-lg font-black text-teal-400">AED {c.toRent.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Annual Saving</span>
                  <span className="text-xl font-black text-emerald-400">AED {c.saving.toLocaleString()}</span>
                </div>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{c.desc}</p>
                <Button
                  data-testid={`button-move-${i}`}
                  onClick={() => handleWhatsApp(c.from, c.to, c.saving)}
                  className="w-full bg-teal-700 hover:bg-teal-600 text-white font-black rounded-2xl h-10 text-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Coordinate This Move
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Area Table */}
      <section className="py-14 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs text-teal-400 font-black uppercase tracking-widest">Estimated annual rents (AED)</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Dubai Area Rent Table</h2>
          </div>

          {/* Visual Bar Chart */}
          <div className="space-y-3">
            {AREA_DATA.map((row) => (
              <div key={row.area} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 space-y-2" data-testid={`area-row-${row.area.replace(/\s/g, "_")}`}>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">{row.area}</span>
                  <span className="text-xs text-gray-500 font-black uppercase tracking-widest">1BR: AED {row.one.toLocaleString()}</span>
                </div>
                <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all"
                    style={{ width: `${(row.one / MAX_RENT) * 100}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-gray-500 font-medium flex-wrap">
                  <span>Studio: AED {row.studio.toLocaleString()}</span>
                  <span>2BR: AED {row.two.toLocaleString()}</span>
                  <span>3BR: AED {row.three.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 font-medium text-center">Estimates based on 2024–2025 Dubai market data. Actual rents vary by building, floor, and specific location.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Ready to Make Your Move?</h2>
          <p className="text-gray-400 font-medium">DeliWer coordinates movers, Ejari transfer, DEWA, and cleaning — so your move is stress-free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-start-move"
              onClick={() => handleWhatsApp()}
              className="bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Plan My Move
            </Button>
            <Link href="/are-you-overpaying-rent-dubai">
              <Button variant="outline" className="border-white/20 text-gray-400 hover:text-white font-black rounded-2xl px-8 h-14 text-sm transition-all">
                Check If I'm Overpaying <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
