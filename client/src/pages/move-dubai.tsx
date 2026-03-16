import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Home, ArrowLeftRight, LogOut, Calculator, TrendingDown, FileText,
  ArrowRight, MessageCircle, CheckCircle2, Star
} from "lucide-react";

const SCENARIOS = [
  {
    icon: Home,
    color: "emerald",
    badge: "Moving In",
    title: "Move Into New Apartment",
    desc: "Starting fresh in a new Dubai home. We coordinate Ejari, DEWA, movers, cleaning, and water readiness.",
    href: "/ejari-dubai",
    cta: "Start Move-In Plan",
    testId: "scenario-move-in",
  },
  {
    icon: TrendingDown,
    color: "blue",
    badge: "Save on Rent",
    title: "Move to Cheaper Rent",
    desc: "Paying too much? Dubai's rental market has shifted. We coordinate your move to a better deal.",
    href: "/move-cheaper-rent",
    cta: "Plan My Move",
    testId: "scenario-cheaper-rent",
  },
  {
    icon: ArrowLeftRight,
    color: "violet",
    badge: "Compare Options",
    title: "Compare Move vs Renew",
    desc: "Should you move or renew? Use our calculator to see which option saves you more money.",
    href: "/move-vs-renew-dubai",
    cta: "Run the Numbers",
    testId: "scenario-compare",
  },
  {
    icon: LogOut,
    color: "amber",
    badge: "Exit Service",
    title: "Leaving Dubai",
    desc: "Exit cleanly. Ejari cancellation, DEWA closure, movers, clearance, and key handover — coordinated.",
    href: "/exit-dubai",
    cta: "Start Exit Coordination",
    testId: "scenario-exit",
  },
];

const INTELLIGENCE_TOOLS = [
  { label: "Are You Overpaying Rent?", href: "/are-you-overpaying-rent-dubai", icon: Calculator, desc: "See how your rent compares to the market" },
  { label: "Rent Increase Calculator", href: "/rent-increase-calculator-dubai", icon: FileText, desc: "Check your landlord's legal increase limit" },
  { label: "Dubai Rent Comparison", href: "/dubai-rent-comparison", icon: TrendingDown, desc: "Compare rents across areas in Dubai" },
  { label: "Dubai Move Score", href: "/dubai-move-score", icon: Star, desc: "Get a personalised score: move or stay?" },
  { label: "Dubai Moving Trends", href: "/dubai-moving-trends", icon: ArrowRight, desc: "Where are tenants moving right now?" },
];

const colorMap: Record<string, string> = {
  emerald: "border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/10 text-emerald-400",
  blue: "border-blue-500/30 hover:border-blue-500 bg-blue-500/10 text-blue-400",
  violet: "border-violet-500/30 hover:border-violet-500 bg-violet-500/10 text-violet-400",
  amber: "border-amber-500/30 hover:border-amber-500 bg-amber-500/10 text-amber-400",
};
const btnColorMap: Record<string, string> = {
  emerald: "bg-emerald-600 hover:bg-emerald-500",
  blue: "bg-blue-600 hover:bg-blue-500",
  violet: "bg-violet-600 hover:bg-violet-500",
  amber: "bg-amber-600 hover:bg-amber-500",
};

export default function MoveDubai() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/971523946311?text=" +
        encodeURIComponent(
          "Hi DeliWer — I need help planning my move in Dubai. Please help me get started."
        ),
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Planning a Move in Dubai? | DeliWer Relocation Hub"
        description="Choose your relocation scenario: move into a new apartment, move to cheaper rent, compare move vs renew, or leave Dubai. DeliWer coordinates everything."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
              Dubai Relocation Intelligence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
              Planning a Move<br />
              <span className="text-emerald-400">in Dubai?</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Choose your situation. DeliWer coordinates everything — from Ejari registration and DEWA to movers, cleaning, and exit concierge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Scenarios */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-gray-500 font-black uppercase tracking-widest mb-10">Select your relocation scenario</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCENARIOS.map((s) => {
              const Icon = s.icon;
              const colors = colorMap[s.color];
              const btnColor = btnColorMap[s.color];
              return (
                <motion.div
                  key={s.testId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  data-testid={`card-${s.testId}`}
                  className={`group border-2 ${colors.split(" ")[0]} ${colors.split(" ")[1]} rounded-3xl p-8 space-y-5 transition-all bg-slate-900`}
                >
                  <div className={`w-14 h-14 ${colors.split(" ")[2]} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${colors.split(" ")[3]}`} />
                  </div>
                  <div>
                    <span className={`text-xs font-black uppercase tracking-widest ${colors.split(" ")[3]}`}>{s.badge}</span>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white mt-1">{s.title}</h2>
                    <p className="text-gray-400 text-sm font-medium mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                  <Link href={s.href}>
                    <Button
                      data-testid={`button-${s.testId}`}
                      className={`${btnColor} text-white font-black rounded-2xl px-6 h-11 text-sm transition-all`}
                    >
                      {s.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Relocation Intelligence Tools */}
      <section className="py-16 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs text-emerald-400 font-black uppercase tracking-widest">Free tools</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Relocation Intelligence</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">Use our free tools to understand Dubai's rental market before you decide.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTELLIGENCE_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <div
                    data-testid={`tool-link-${tool.href.replace(/\//g, "").replace(/-/g, "_")}`}
                    className="group flex items-start gap-4 p-5 bg-slate-800 border border-white/10 hover:border-emerald-500/40 rounded-2xl transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-all">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{tool.label}</p>
                      <p className="text-gray-500 text-xs font-medium mt-0.5">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs text-gray-600 font-black uppercase tracking-widest">Trusted relocation partners across Dubai, Sharjah & Ajman</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            {["Movers", "Cleaning Companies", "Maintenance Teams", "Storage Providers"].map((cat) => (
              <div key={cat} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {cat}
              </div>
            ))}
          </div>
          <Button
            onClick={handleWhatsApp}
            data-testid="button-whatsapp-hub"
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-xl shadow-emerald-900/30 transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
