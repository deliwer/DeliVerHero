import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Zap, 
  LogOut,
  MessageCircle,
  CheckCircle2,
  Shield,
  FileText,
  Truck,
  Droplets,
  Clock,
  Star,
  Home,
  ArrowRight,
  Calculator,
  TrendingDown,
  TrendingUp,
  Search,
  BarChart3,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import { useEffect, useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { RelocationFunnel, FunnelScenario } from "@/components/relocation-funnel";

const HERO_LIFESTYLE_IMG = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80";

const lifestyleImages = {
  moveIn: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80",
  moveOut: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  brokers: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
  tenants: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  landlords: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  process: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  justGotKeys: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  finalCTA: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
};

const BUNDLE_SERVICES = [
  { icon: <Truck className="w-4 h-4" />, label: "Movers coordination" },
  { icon: <FileText className="w-4 h-4" />, label: "Ejari registration" },
  { icon: <Zap className="w-4 h-4" />, label: "DEWA activation support" },
  { icon: <Shield className="w-4 h-4" />, label: "Water / air readiness check" },
  { icon: <Droplets className="w-4 h-4" />, label: "Welcome shower filter & installation" },
  { icon: <Clock className="w-4 h-4" />, label: "Move-in vendor scheduling" },
];

export default function LandingPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [funnelScenario, setFunnelScenario] = useState<FunnelScenario | undefined>(undefined);

  const openFunnel = (scenario?: FunnelScenario) => {
    setFunnelScenario(scenario);
    setFunnelOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Move-In Services Dubai | Water, Ejari & Home Setup | DeliWer"
        description="Move into your Dubai home stress-free. DeliWer handles water setup, Ejari registration, DEWA activation, and move-in readiness. Pay only normal vendor rates — no extra charges."
      />
      <Navigation />

      {/* ============================================
          MAIN HERO — Are You Overpaying Rent?
         ============================================ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_LIFESTYLE_IMG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Dubai Relocation · One WhatsApp Away
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] text-white uppercase">
              Are You{" "}
              <span className="text-emerald-400" style={{ textShadow: "0 0 40px rgba(16,185,129,0.45)" }}>
                Overpaying
              </span>
              <br />Rent in Dubai?
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto leading-relaxed">
              Moving soon? We handle everything — Ejari, DEWA, movers, cleaning. One message away.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20help%20with%20my%20move."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-main-hero"
            >
              <Button className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-base rounded-2xl shadow-2xl shadow-emerald-900/50 transition-all">
                <MessageCircle className="w-6 h-6 mr-3" /> Start Your Move
              </Button>
            </a>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">No signup · No account · 24h WhatsApp response</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto w-full"
          >
            <button
              data-testid="funnel-btn-moving-in"
              onClick={() => openFunnel("moving-in")}
              className="group flex flex-col items-center gap-3 p-5 bg-white/10 backdrop-blur-sm border-2 border-emerald-500/30 hover:border-emerald-500 rounded-2xl transition-all text-left"
            >
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <Home className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-white uppercase text-xs tracking-tight">Moving Into a New Home</div>
                <div className="text-[10px] text-gray-400 font-medium">Ejari, DEWA, movers & setup</div>
              </div>
              <ArrowRight className="w-3 h-3 text-emerald-400 ml-auto" />
            </button>

            <button
              data-testid="funnel-btn-moving-within"
              onClick={() => openFunnel("moving-within")}
              className="group flex flex-col items-center gap-3 p-5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-500 rounded-2xl transition-all text-left"
            >
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <TrendingDown className="w-5 h-5 text-blue-400" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-white uppercase text-xs tracking-tight">Move to Cheaper Rent</div>
                <div className="text-[10px] text-gray-400 font-medium">Full relocation coordination</div>
              </div>
              <ArrowRight className="w-3 h-3 text-blue-400 ml-auto" />
            </button>

            <button
              data-testid="funnel-btn-leaving"
              onClick={() => openFunnel("leaving")}
              className="group flex flex-col items-center gap-3 p-5 bg-white/10 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-500 rounded-2xl transition-all text-left"
            >
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                <LogOut className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-0.5">
                <div className="font-black text-white uppercase text-xs tracking-tight">Leaving Dubai</div>
                <div className="text-[10px] text-gray-400 font-medium">Exit concierge from 900 AED</div>
              </div>
              <ArrowRight className="w-3 h-3 text-amber-400 ml-auto" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          DUBAI RENTAL INTELLIGENCE — Comparison Hub
         ============================================ */}
      <section className="relative py-20 px-4 border-b border-white/5 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto space-y-14 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              <BarChart3 className="w-3 h-3" /> Dubai Rental Intelligence
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Is Your Rent Still<br className="hidden sm:block" /> <span className="text-violet-400">Competitive?</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto font-medium">
              Dubai's rental market shifted 18–35% in 2024. Most tenants renewing blindly are overpaying. DeliWer analyses your contract, benchmarks your district, and coordinates your next move — at zero markup.
            </p>
          </motion.div>

          {/* Market Trend Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Avg rent increase 2024", value: "+26%", sub: "Dubai-wide RERA data", icon: <TrendingUp className="w-4 h-4" />, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
              { label: "Tenants who moved saved", value: "18 K AED", sub: "avg annual saving vs renewing", icon: <TrendingDown className="w-4 h-4" />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "Cheaper districts available", value: "14+", sub: "within 15 min of Downtown", icon: <MapPin className="w-4 h-4" />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "DeliWer coordination fee", value: "0 AED", sub: "you pay vendors directly", icon: <Calculator className="w-4 h-4" />, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl border p-4 space-y-2 ${s.bg}`} data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-").slice(0, 20)}`}>
                <div className={s.color}>{s.icon}</div>
                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-xs font-bold text-white/80 leading-tight">{s.label}</div>
                <div className="text-[10px] text-gray-600">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Move vs Renew Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-red-400">If You Renew Blind</div>
                  <div className="text-white font-bold text-sm">Staying in same unit</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Landlord can raise rent", value: "Up to 20%", bad: true },
                  { label: "RERA index check skipped", value: "Most tenants never check", bad: true },
                  { label: "Moving costs avoided", value: "Saved ~3,500 AED", bad: false },
                  { label: "Opportunity cost", value: "6–22K AED/year overpaid", bad: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400 text-sm">{row.label}</span>
                    <span className={`text-xs font-bold ${row.bad ? "text-red-400" : "text-emerald-400"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-violet-400">If You Move Smart</div>
                  <div className="text-white font-bold text-sm">With DeliWer coordination</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "RERA benchmark check", value: "Free with DeliWer", good: true },
                  { label: "District opportunity scan", value: "14+ cheaper areas", good: true },
                  { label: "Full move coordinated", value: "One WhatsApp message", good: true },
                  { label: "Typical net annual saving", value: "12,000–22,000 AED", good: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-violet-500/10 pb-2">
                    <span className="text-gray-400 text-sm">{row.label}</span>
                    <span className="text-xs font-bold text-violet-300">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* District Comparison Table */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">2025 Avg Annual Rents</p>
                <h3 className="font-black text-white text-sm">Popular Districts — 1BR Comparison</h3>
              </div>
              <span className="text-[10px] text-gray-600 font-bold uppercase">Source: RERA / DLD</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">District</th>
                    <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Avg Rent / yr</th>
                    <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">YoY Change</th>
                    <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { area: "Downtown Dubai", rent: "115,000 AED", change: "+28%", badge: "Overpriced", badgeColor: "bg-red-500/15 text-red-400 border-red-500/25" },
                    { area: "Dubai Marina", rent: "98,000 AED", change: "+22%", badge: "High Demand", badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
                    { area: "JVC", rent: "58,000 AED", change: "+9%", badge: "Best Value", badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
                    { area: "Al Furjan", rent: "65,000 AED", change: "+11%", badge: "Growing", badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
                    { area: "Mirdif", rent: "52,000 AED", change: "+7%", badge: "Stable", badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/25" },
                    { area: "Business Bay", rent: "88,000 AED", change: "+19%", badge: "Watch", badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
                  ].map((row, i) => (
                    <tr key={row.area} className="border-b border-white/5 hover:bg-white/3 transition-colors" data-testid={`district-row-${i}`}>
                      <td className="px-5 py-3 font-semibold text-white flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-600 shrink-0" />{row.area}
                      </td>
                      <td className="px-5 py-3 font-bold text-white">{row.rent}</td>
                      <td className="px-5 py-3 text-red-400 font-semibold">{row.change}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${row.badgeColor}`}>{row.badge}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-violet-600/20 via-violet-500/10 to-transparent border border-violet-500/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Get Your Free Rental Analysis</h3>
              <p className="text-gray-400 text-sm max-w-sm">Tell us your current rent and district — DeliWer's coordinator benchmarks it against RERA and finds your cheapest legal move in 24h.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/971523946311?text=Hello%20DeliWer,%20I%20want%20a%20free%20rental%20analysis%20for%20my%20apartment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-lg shadow-violet-900/30"
                data-testid="cta-rental-analysis"
              >
                <MessageCircle className="w-4 h-4" /> Analyse My Rent
              </a>
              <Link href="/move-vs-renew-dubai">
                <Button variant="outline" className="border-violet-500/40 text-violet-400 hover:bg-violet-500/10 font-black rounded-2xl px-6 h-11 text-sm transition-all w-full" data-testid="cta-move-vs-renew">
                  <Calculator className="w-4 h-4 mr-2" /> Move vs Renew Calculator
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-600 font-black uppercase tracking-widest">
            Trusted by tenants across Dubai, Sharjah & Ajman · RERA-informed benchmarking · Coordinator confirms within 10 minutes
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED — concise services strip */}
      <section className="py-14 px-6 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">One coordinator. Everything sorted.</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">What DeliWer handles for you</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🏠", label: "Move In", href: "/move-in-package", testid: "tile-move-in" },
              { icon: "📄", label: "Ejari", href: "/ejari-registration", testid: "tile-ejari" },
              { icon: "⚡", label: "DEWA", href: "/dewa-activation", testid: "tile-dewa" },
              { icon: "🚪", label: "Move Out", href: "/move-out-package", testid: "tile-move-out" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-2 py-4 px-3 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 rounded-2xl transition-all"
                data-testid={item.testid}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tight text-gray-400 group-hover:text-emerald-400 transition-colors">{item.label}</span>
                <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {BUNDLE_SERVICES.map((service, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:border-emerald-500/40 transition-colors">
                <span className="text-emerald-400 shrink-0">{service.icon}</span>
                <span className="text-gray-300 font-medium text-sm">{service.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/start">
              <Button
                data-testid="button-bundle-start"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-xl shadow-emerald-900/30 transition-all"
              >
                Start My Move-In Plan
              </Button>
            </Link>
            <Link href="/concierge-pricing">
              <Button variant="outline" className="border-white/20 text-gray-400 hover:text-white hover:border-white/40 font-black rounded-2xl px-8 h-14 text-sm transition-all">
                View Pricing →
              </Button>
            </Link>
          </div>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No hidden fees · You pay vendors directly at market rates</p>
        </div>
      </section>

      {/* JUST GOT KEYS - HIGH-INTENT TRIGGER */}
      <section className="py-20 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
              <img src={lifestyleImages.justGotKeys} alt="New apartment keys" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">High Priority</div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Just Received Your Apartment Keys?</h3>
                <p className="text-gray-300 font-bold text-lg">Most new residents discover the same problems on day one:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    "No drinking water ready",
                    "No shower filter installed",
                    "Utilities not activated"
                  ].map((issue, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                        <span className="text-red-400 text-xs font-black">!</span>
                      </div>
                      <span className="text-gray-200 font-medium">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-emerald-500/20 pt-6">
                <p className="text-gray-300 font-bold mb-4">Let DeliWer prepare your home so your first night is stress-free.</p>
                <Button 
                  size="lg" 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-16 text-lg shadow-2xl transition-all group"
                  onClick={() => window.open('https://wa.me/971523946311?text=Hello%20DeliWer,%20I%20just%20received%20my%20apartment%20keys%20and%20need%20home%20setup', '_blank')}
                  data-testid="button-just-got-keys"
                >
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  WhatsApp: I Just Got My Keys
                </Button>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest text-center mt-3">Response within 10 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Ejari Registration Assistance From Home</h2>
            <p className="text-gray-400 font-medium text-lg">
              DeliWer simplifies the process by helping tenants complete Ejari registration easily from the comfort of their home.
            </p>
            <div className="space-y-4">
              {[
                "Guidance on required documents",
                "Support completing online process",
                "Convenient assistance from home",
                "Faster move-in progress"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span className="text-white font-bold uppercase text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            <Link href="/ejari-dubai">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl transition-all w-full md:w-auto mt-4" data-testid="button-ejari-solution">
                Start Your Ejari Registration
              </Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden border border-white/10">
            <img src={lifestyleImages.process} alt="Ejari process assistance" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 px-6 text-center space-y-8 bg-emerald-600 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={lifestyleImages.finalCTA} alt="Happy resident in home" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-600/80 to-emerald-600" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950">Ready to move in stress-free?</h2>
          <p className="text-lg text-emerald-950 font-bold uppercase italic">Pay only vendor rates. DeliWer handles everything else.</p>
        </div>
        <Link href="/start">
          <Button 
            size="lg" 
            className="relative z-10 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl transition-all active-elevate-2 group"
            data-testid="button-final-cta"
          >
            <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Start Your Move-In Plan
          </Button>
        </Link>
      </section>

      {/* DISTRIBUTION PARTNERS */}
      <section className="py-14 px-4 bg-slate-900 text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Distribution Partners</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Property Managers & Brokers</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1">
                {["Reduce admin overhead", "Happier tenants", "Faster apartment turnaround"].map((item, i) => (
                  <span key={i} className="text-gray-400 text-sm font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />{item}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/partners" className="shrink-0">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-8 h-12 text-sm shadow-xl">
                Partner With DeliWer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM PARTNERS */}
      <section className="py-10 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0 space-y-1">
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Ecosystem Partners</p>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Service delivery network</p>
            </div>
            <div className="flex-1 border-l border-white/10 pl-6 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm">TC</div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/50">Trustee Centers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm">SGM</div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/50">Smart Global Movers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-4 border-t border-white/5 text-center bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-8">
          <OperationalBadges variant="dark" />
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] max-w-xl mx-auto">
            DeliWer is an operational back-office for Dubai residents and brokers, focused on relocation, settlement, and daily living journeys.
          </p>
        </div>
      </footer>

      <RelocationFunnel
        open={funnelOpen}
        onClose={() => setFunnelOpen(false)}
        initialScenario={funnelScenario}
      />
    </div>
  );
}
