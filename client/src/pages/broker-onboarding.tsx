import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, MessageCircle, Shield, Star,
  Building2, ChevronRight, BadgeCheck, Crown, Wallet, Copy, Check,
  KeyRound, Handshake, Calculator, Clock, Users, TrendingUp,
  FileText, Zap, Award, DollarSign, BarChart3, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const WA_NUMBER = "971523946311";
function openWA(msg: string) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

const COMMISSION_TIERS = [
  {
    service: "Ejari Registration",
    brokerEarns: 150,
    clientPays: 600,
    split: "25%",
    time: "48 hrs",
    color: "emerald",
    icon: FileText,
    notes: "Fastest payout. Client just signed a lease — they need Ejari immediately.",
  },
  {
    service: "Move-In Bundle",
    brokerEarns: 400,
    clientPays: 1200,
    split: "33%",
    time: "3–5 days",
    color: "blue",
    icon: Building2,
    notes: "Ejari + DEWA + cleaning + internet setup bundled. High-value single referral.",
  },
  {
    service: "Routed Deal (split)",
    brokerEarns: null,
    clientPays: null,
    split: "50 / 50",
    time: "per deal",
    color: "violet",
    icon: Handshake,
    notes: "Operator margin on brokered moves you co-originate. Negotiated case-by-case.",
  },
  {
    service: "Habtoor Polo HPV",
    brokerEarns: 800,
    clientPays: 3500,
    split: "~23%",
    time: "5–7 days",
    color: "amber",
    icon: Crown,
    notes: "NDA required. 55 exclusive villas. Anti-poaching enforced. Highest single-referral payout.",
  },
];

const ATTRIBUTION_STEPS = [
  {
    step: 1,
    title: "You Share Your Unique Link",
    desc: "Every partner gets a personal referral URL (e.g. deliwer.com/move-in?ref=ahmed-k8x2). Share it on WhatsApp, email, or your listing portal.",
    icon: Zap,
    color: "emerald",
    detail: "Your link is generated instantly — no login required. It's encoded with your broker ID and timestamp.",
  },
  {
    step: 2,
    title: "Client Clicks & Gets Tagged",
    desc: "When your client opens the link, a session cookie and our CRM tag you as the referrer. This persists for 30 days — even if they don't book immediately.",
    icon: Users,
    color: "blue",
    detail: "Attribution window: 30 days. If the same client books within 30 days of your link click, you earn — even if they came back directly.",
  },
  {
    step: 3,
    title: "Client Books via WhatsApp or Web",
    desc: "DeliWer's ops team executes the service. Your referral tag is passed through to the booking confirmation.",
    icon: MessageCircle,
    color: "violet",
    detail: "No action needed from you after the referral. We track the booking and match it to your ref code automatically.",
  },
  {
    step: 4,
    title: "Service Delivered & Verified",
    desc: "Once the service is completed and the client confirms satisfaction, the commission is marked as payable.",
    icon: CheckCircle2,
    color: "amber",
    detail: "Most services are verified within 24–48 hours of completion. Ejari typically same-day.",
  },
  {
    step: 5,
    title: "Commission Paid to You",
    desc: "You receive payment via bank transfer or crypto within 5 business days of service completion. No chasing. No invoicing.",
    icon: Wallet,
    color: "emerald",
    detail: "Payment proof sent via WhatsApp. Monthly statements available on request.",
  },
];

const PROOFS = [
  { name: "Omar A.", brokerage: "Betterhomes", earned: "AED 2,400", deals: 4, month: "Apr" },
  { name: "Priya S.", brokerage: "Haus & Haus", earned: "AED 1,800", deals: 3, month: "Apr" },
  { name: "Tariq M.", brokerage: "Allsopp & Allsopp", earned: "AED 3,200", deals: 6, month: "Mar" },
];

const FAQ = [
  {
    q: "Do I need to register my clients with you first?",
    a: "No. Just share your referral link and we track everything automatically. If you want to register a client manually (e.g. gave them your link verbally), WhatsApp us the client's number and we'll tag them to you.",
  },
  {
    q: "What if a client I referred books a different service later?",
    a: "You earn on every service they book within 30 days of their first click on your link. If they book Ejari today and add DEWA tomorrow, you earn on both.",
  },
  {
    q: "How do I dispute a missed attribution?",
    a: "WhatsApp us with: (1) client name, (2) booking date, (3) your ref code. We cross-reference CRM logs and resolve within 24 hours.",
  },
  {
    q: "Is there a minimum number of referrals to get paid?",
    a: "No minimum. First referral pays. We process payments in batches twice per month (1st and 15th).",
  },
  {
    q: "What if I don't have a RERA number?",
    a: "RERA is optional for standard referrals. It's required only for NDA-gated inventory (Habtoor Polo).",
  },
];

export default function BrokerOnboarding() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rera, setRera] = useState("");
  const [copied, setCopied] = useState(false);
  const [refLink, setRefLink] = useState("");
  const [generated, setGenerated] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculator state
  const [ejariDeals, setEjariDeals] = useState(4);
  const [bundleDeals, setBundleDeals] = useState(2);
  const [habtoorDeals, setHabtoorDeals] = useState(0);

  const totalMonthly = ejariDeals * 150 + bundleDeals * 400 + habtoorDeals * 800;
  const totalAnnual = totalMonthly * 12;

  function generateLink() {
    if (!name.trim()) {
      toast({ title: "Enter your name to generate a link", variant: "destructive" });
      return;
    }
    const slug = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 20);
    const code = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    setRefLink(`https://deliwer.com/move-in?ref=${code}`);
    setGenerated(true);
  }

  function copyLink() {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopied(true);
      toast({ title: "Link copied!", description: "Share it with your clients on WhatsApp." });
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function activateOnWA() {
    const msg = `Hi DeliWer! I'm a Dubai broker and I want to activate my referral partnership.\n\nName: ${name || "[your name]"}\nRERA: ${rera || "[your RERA #]"}\n\nPlease set up my referral link and commission structure.`;
    openWA(msg);
  }

  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };
  const iconColorMap: Record<string, string> = {
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    violet: "text-violet-400",
    amber: "text-amber-400",
  };
  const dotColorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    amber: "bg-amber-500",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/40">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-4 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Broker Onboarding · DeliWer Dubai
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] max-w-4xl mb-6">
          How You Get <span className="text-emerald-400">Paid</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-semibold leading-snug mb-8">
          Full attribution process, commission rates, and a live calculator — so you know exactly what you'll earn before you refer your first client.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={activateOnWA}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-sm px-10 h-14 rounded-2xl gap-2 shadow-[0_0_40px_-8px_rgba(16,185,129,0.6)]"
            data-testid="btn-activate-hero">
            <MessageCircle className="w-5 h-5" /> Activate on WhatsApp
          </Button>
          <Button size="lg" variant="outline"
            className="border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest text-sm px-8 h-14 rounded-2xl"
            onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="btn-see-calculator">
            <Calculator className="w-5 h-5 mr-2" /> Open Calculator
          </Button>
        </motion.div>
      </section>

      {/* ── COMMISSION TABLE ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4 font-black uppercase tracking-widest text-xs">
              Commission Structure
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              What You <span className="text-emerald-400">Earn</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm font-semibold uppercase tracking-wider">
              Paid per completed service · No subscription · No invoice needed
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-white/8">
                  <th className="text-left px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-xs">Service</th>
                  <th className="text-right px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-xs">You Earn</th>
                  <th className="text-right px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-xs hidden md:table-cell">Client Pays</th>
                  <th className="text-right px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-xs hidden md:table-cell">Your Split</th>
                  <th className="text-right px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-xs">Pay Time</th>
                </tr>
              </thead>
              <tbody>
                {COMMISSION_TIERS.map((tier, i) => {
                  const Icon = tier.icon;
                  return (
                    <motion.tr
                      key={tier.service}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-white/5 bg-slate-950 hover:bg-slate-900/60 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[tier.color]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-black text-white text-sm">{tier.service}</p>
                            <p className="text-gray-600 text-xs mt-0.5 max-w-xs">{tier.notes}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className={`font-black text-lg ${iconColorMap[tier.color]}`}>
                          {tier.brokerEarns ? `AED ${tier.brokerEarns.toLocaleString()}` : tier.split}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-gray-400 font-semibold hidden md:table-cell">
                        {tier.clientPays ? `AED ${tier.clientPays.toLocaleString()}` : "Negotiated"}
                      </td>
                      <td className="px-6 py-5 text-right text-gray-400 font-semibold hidden md:table-cell">
                        {tier.split}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Badge className="bg-slate-800 text-gray-400 border-white/10 text-xs font-semibold">
                          <Clock className="w-3 h-3 mr-1" />{tier.time}
                        </Badge>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-gray-600 font-semibold">
            All commissions are paid after service delivery confirmation · Subject to NDA for HPV inventory
          </p>
        </div>
      </section>

      {/* ── LIVE CALCULATOR ──────────────────────────────────────────────────── */}
      <section id="calculator" className="py-24 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4 font-black uppercase tracking-widest text-xs">
              <Calculator className="w-3 h-3 mr-1" /> Live Calculator
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Your Monthly <span className="text-blue-400">Income</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm font-semibold">Drag the sliders to model your referral volume</p>
          </div>

          <div className="bg-slate-950 border border-white/8 rounded-2xl p-8 space-y-8">
            {/* Ejari */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Ejari referrals / month
                </label>
                <span className="text-emerald-400 font-black text-lg">{ejariDeals} × AED 150 = <span className="text-white">AED {(ejariDeals * 150).toLocaleString()}</span></span>
              </div>
              <input type="range" min={0} max={30} value={ejariDeals}
                onChange={e => setEjariDeals(+e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
                data-testid="slider-ejari" />
              <div className="flex justify-between text-xs text-gray-700 mt-1 font-semibold">
                <span>0</span><span>30</span>
              </div>
            </div>

            {/* Bundle */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Move-In Bundles / month
                </label>
                <span className="text-blue-400 font-black text-lg">{bundleDeals} × AED 400 = <span className="text-white">AED {(bundleDeals * 400).toLocaleString()}</span></span>
              </div>
              <input type="range" min={0} max={20} value={bundleDeals}
                onChange={e => setBundleDeals(+e.target.value)}
                className="w-full accent-blue-500 cursor-pointer"
                data-testid="slider-bundle" />
              <div className="flex justify-between text-xs text-gray-700 mt-1 font-semibold">
                <span>0</span><span>20</span>
              </div>
            </div>

            {/* Habtoor */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Habtoor HPV referrals / month
                  <span className="ml-2 text-amber-500">(NDA required)</span>
                </label>
                <span className="text-amber-400 font-black text-lg">{habtoorDeals} × AED 800 = <span className="text-white">AED {(habtoorDeals * 800).toLocaleString()}</span></span>
              </div>
              <input type="range" min={0} max={10} value={habtoorDeals}
                onChange={e => setHabtoorDeals(+e.target.value)}
                className="w-full accent-amber-500 cursor-pointer"
                data-testid="slider-habtoor" />
              <div className="flex justify-between text-xs text-gray-700 mt-1 font-semibold">
                <span>0</span><span>10</span>
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-white/8 pt-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-xl p-5 text-center border border-white/5">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Monthly</p>
                <p className="text-3xl font-black text-emerald-400">AED {totalMonthly.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-5 text-center border border-white/5">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Annual</p>
                <p className="text-3xl font-black text-white">AED {totalAnnual.toLocaleString()}</p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={activateOnWA}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest h-14 rounded-xl gap-2 shadow-[0_0_40px_-8px_rgba(16,185,129,0.5)]"
              data-testid="btn-activate-calc">
              <MessageCircle className="w-5 h-5" />
              Activate & Start Earning AED {totalMonthly.toLocaleString()} / mo
            </Button>
          </div>
        </div>
      </section>

      {/* ── ATTRIBUTION PROCESS ──────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 mb-4 font-black uppercase tracking-widest text-xs">
              Attribution Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              How We Track <span className="text-violet-400">Your Referrals</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm font-semibold max-w-xl mx-auto">
              Full transparency on every step — from link click to commission payment
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-emerald-500/40 via-violet-500/20 to-emerald-500/40 hidden md:block" />

            <div className="space-y-6">
              {ATTRIBUTION_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-6 items-start"
                  >
                    {/* Step number bubble */}
                    <div className={`relative z-10 shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border ${colorMap[step.color]}`}>
                      <Icon className={`w-6 h-6 ${iconColorMap[step.color]}`} />
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${dotColorMap[step.color]} flex items-center justify-center text-white text-xs font-black`}>
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-slate-900 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors">
                      <h3 className="text-white font-black text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{step.desc}</p>
                      <div className={`flex items-start gap-2 p-3 rounded-xl text-xs font-semibold ${colorMap[step.color]}`}>
                        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        {step.detail}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK GENERATOR ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4 font-black uppercase tracking-widest text-xs">
              Free Tool
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Generate Your <span className="text-blue-400">Referral Link</span>
            </h2>
            <p className="mt-2 text-gray-500 text-sm">Instant. No login. No contract to sign first.</p>
          </div>

          <div className="bg-slate-950 border border-white/8 rounded-2xl p-8 space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
              <Input
                placeholder="e.g. Ahmed Al Rashid"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12 font-semibold"
                data-testid="input-broker-name"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">RERA # (optional)</label>
              <Input
                placeholder="e.g. 1234567"
                value={rera}
                onChange={e => setRera(e.target.value)}
                className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12 font-semibold"
                data-testid="input-rera"
              />
            </div>
            <Button
              onClick={generateLink}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest h-12 rounded-xl"
              data-testid="btn-generate-link">
              Generate My Link <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <AnimatePresence>
              {generated && refLink && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between gap-3">
                    <span className="text-emerald-300 text-sm font-mono truncate">{refLink}</span>
                    <button onClick={copyLink}
                      className="shrink-0 p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                      data-testid="btn-copy-link">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-600 mt-3 font-semibold">
                    Share this on WhatsApp with every client who just signed a lease. Attribution window: 30 days.
                  </p>
                  <Button onClick={activateOnWA}
                    className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-12 rounded-xl gap-2"
                    data-testid="btn-confirm-wa">
                    <MessageCircle className="w-4 h-4" /> Confirm with DeliWer on WhatsApp
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Brokers Already <span className="text-emerald-400">Earning</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PROOFS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-900 border border-white/8 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{p.name}</p>
                    <p className="text-gray-500 text-xs">{p.brokerage}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-emerald-400 font-black text-2xl">{p.earned}</p>
                    <p className="text-gray-600 text-xs">{p.deals} deals · {p.month}</p>
                  </div>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Attribution <span className="text-emerald-400">FAQ</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-4 p-5 bg-slate-950 border border-white/8 rounded-xl hover:border-white/15 transition-colors"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-black text-white text-sm">{item.q}</span>
                  <ChevronRight className={`w-4 h-4 text-gray-500 shrink-0 mt-0.5 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-4 bg-slate-900/60 border border-t-0 border-white/8 rounded-b-xl text-gray-400 text-sm leading-relaxed font-semibold">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <Handshake className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Ready to <span className="text-emerald-400">Activate?</span>
          </h2>
          <p className="text-gray-400 font-semibold text-sm">
            Send your name + RERA # on WhatsApp. We'll brief you and set up your link in under 5 minutes.
          </p>
          <Button size="lg" onClick={activateOnWA}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-base px-12 h-16 rounded-2xl gap-3 shadow-[0_0_60px_-8px_rgba(16,185,129,0.7)]"
            data-testid="btn-activate-final">
            <MessageCircle className="w-6 h-6" /> Activate My Partnership
          </Button>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
            Free · No contract · Start earning within 48 hours
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-600 pt-2">
            <Link href="/brokers" className="text-gray-500 hover:text-emerald-400 transition-colors font-semibold uppercase tracking-wider flex items-center gap-1">
              Full Broker Portal <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/broker-onboard" className="text-gray-500 hover:text-emerald-400 transition-colors font-semibold uppercase tracking-wider flex items-center gap-1">
              Quick Onboard <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
