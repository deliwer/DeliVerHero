import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight, MessageCircle, MapPin, Users, BarChart2, AlertCircle } from "lucide-react";

const MIGRATION_ROUTES = [
  { from: "Dubai Marina", to: "JVC", reason: "Rent savings 40%+", volume: 88, color: "emerald" },
  { from: "Downtown Dubai", to: "Business Bay", reason: "Same lifestyle, lower rent", volume: 74, color: "blue" },
  { from: "JBR", to: "JLT", reason: "Metro access, 30% cheaper", volume: 68, color: "violet" },
  { from: "Dubai (Any)", to: "Sharjah", reason: "50–60% rent reduction", volume: 92, color: "amber" },
  { from: "DIFC", to: "Business Bay", reason: "Walkable, 20–30% cheaper", volume: 55, color: "teal" },
  { from: "Al Barsha", to: "Al Furjan", reason: "New buildings, lower rent", volume: 62, color: "pink" },
];

const TREND_INSIGHTS = [
  {
    icon: TrendingDown,
    title: "Rent correction in premium areas",
    body: "Dubai Marina, JBR, and Downtown saw average rent increases of 15–20% in 2021–2022. Many leases signed at peak prices are now above current market rates as supply has increased.",
  },
  {
    icon: Users,
    title: "JVC and Sharjah absorbing demand",
    body: "JVC has become the most searched area for budget-conscious tenants moving from Marina and JLT. Sharjah continues to attract families relocating from Dubai due to a 50–60% rent difference.",
  },
  {
    icon: MapPin,
    title: "Metro corridors driving relocation",
    body: "Tenants are increasingly choosing areas along the Red and Green metro lines, enabling a commute to business districts while paying significantly lower rent.",
  },
  {
    icon: AlertCircle,
    title: "Rent increase notices triggering decisions",
    body: "Landlords in premium towers are applying 10–20% increases where RERA rules allow. This has triggered a wave of relocation decisions as tenants reassess the cost-benefit of staying.",
  },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export default function DubaiMovingTrends() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/971523946311?text=" +
        encodeURIComponent("Hi DeliWer — I'd like to discuss my relocation options in Dubai based on current moving trends. Please help."),
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Moving Trends 2025 | Where Are Tenants Relocating? | DeliWer"
        description="Discover where Dubai tenants are moving in 2025. Popular relocation routes, areas with high mobility, and rent-driven migration patterns across Dubai and Sharjah."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/15 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              2025 Relocation Intelligence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Dubai Moving<br />
              <span className="text-emerald-400">Trends 2025</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Where are Dubai tenants moving right now — and why? Rent-driven relocation patterns shaping the market in 2025.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Migration Routes */}
      <section className="pb-14 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs text-emerald-400 font-black uppercase tracking-widest">Most active relocation routes</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Where Tenants Are Moving</h2>
          </div>

          <div className="space-y-3">
            {MIGRATION_ROUTES.map((route, i) => {
              const colorClass = colorMap[route.color] ?? colorMap["emerald"];
              const [textColor, bgColor, borderColor] = colorClass.split(" ");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 space-y-3"
                  data-testid={`route-${i}`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 font-black text-sm">
                      <span className="text-white">{route.from}</span>
                      <ArrowRight className={`w-4 h-4 ${textColor}`} />
                      <span className={textColor}>{route.to}</span>
                    </div>
                    <Badge className={`${bgColor} ${textColor} ${borderColor} text-xs`}>{route.reason}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-medium">Demand Index</span>
                      <span className={`${textColor} font-black`}>{route.volume}/100</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bgColor.replace("/10", "")} rounded-full transition-all`}
                        style={{ width: `${route.volume}%`, background: "currentColor" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-xs text-gray-600 font-medium text-center">Demand index based on DeliWer coordination data and market search trends. For informational purposes.</p>
        </div>
      </section>

      {/* Key Trend Insights */}
      <section className="py-14 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs text-emerald-400 font-black uppercase tracking-widest">Market intelligence</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Key Trends Driving Relocation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TREND_INSIGHTS.map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-slate-900 border border-white/10 rounded-3xl p-7 space-y-4">
                <div className="w-11 h-11 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter text-white">{title}</h3>
                  <p className="text-gray-400 text-sm font-medium mt-2 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Relocation Routes Summary */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">High-Mobility Areas in 2025</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { area: "JVC", note: "Highest inbound demand" },
              { area: "Sharjah", note: "Budget migration leader" },
              { area: "Business Bay", note: "Downtown alternative" },
              { area: "Al Furjan", note: "Families relocating" },
              { area: "Silicon Oasis", note: "Tech workers" },
              { area: "JLT", note: "Marina overflow" },
            ].map(({ area, note }) => (
              <div key={area} className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-center space-y-1">
                <p className="font-black text-white text-sm">{area}</p>
                <p className="text-xs text-emerald-400 font-medium">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Join the Smart Movers</h2>
          <p className="text-gray-400 font-medium">DeliWer coordinates your relocation from start to finish — movers, Ejari, DEWA, and cleaning.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-start-move"
              onClick={handleWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Plan My Move
            </Button>
            <Link href="/dubai-move-score">
              <Button variant="outline" className="border-white/20 text-gray-400 hover:text-white font-black rounded-2xl px-8 h-14 text-sm transition-all">
                Get My Move Score <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
