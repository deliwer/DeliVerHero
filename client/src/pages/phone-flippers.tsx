import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Star, CheckCircle, ArrowRight, Shield, Zap, Users, Banknote,
  Globe, TrendingUp, ChevronRight, MessageCircle, Phone,
  ClipboardList, CheckCircle2, Sparkles, BarChart3, Package,
  Building2, Gavel, Lock, Plane,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import brokerHandshake from "@assets/stock_images/broker_handshake_dubai.jpg";
import dubaiAirHub from "@assets/stock_images/dubai_air_hub.jpg";
import { SEOMeta } from "@/components/seo-meta";

const WA_NUMBER = "971523906019";
const TELEGRAM_CHANNEL = "https://t.me/chaintracklogistics";
const TELEGRAM_COMMUNITY = "https://t.me/chaintracklogistics";

function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const TIERS = [
  {
    id: "flipper",
    label: "Flipper",
    volume: "500–999 units/mo",
    commission: 0.02,
    commissionLabel: "2%",
    color: "amber",
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
    badge: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    ring: "",
    perks: [
      "Dedicated WhatsApp account manager",
      "24h priority response on every inquiry",
      "Fixed-price lots reserved before public listing",
      "2% referral commission per referred order",
      "Branded quotation templates",
    ],
  },
  {
    id: "broker",
    label: "Broker",
    volume: "1,000–2,499 units/mo",
    commission: 0.04,
    commissionLabel: "4%",
    color: "purple",
    border: "border-purple-500/40",
    bg: "bg-purple-500/5",
    badge: "text-purple-400 bg-purple-500/15 border-purple-500/30",
    ring: "ring-2 ring-purple-500/30",
    highlight: true,
    perks: [
      "Everything in Flipper",
      "Monthly volume allocation guaranteed",
      "8–15% below Flipper pricing on BOQ orders",
      "4% referral commission + co-branded quotes",
      "Access to pre-auction lot previews",
    ],
  },
  {
    id: "master",
    label: "Master Broker",
    volume: "2,500+ units/mo",
    commission: 0.06,
    commissionLabel: "6%",
    color: "pink",
    border: "border-pink-500/40",
    bg: "bg-pink-500/5",
    badge: "text-pink-400 bg-pink-500/15 border-pink-500/30",
    ring: "",
    perks: [
      "Everything in Broker",
      "Direct supplier introductions — remove intermediary",
      "Container-load freight coordination included",
      "6% commission + equity programme eligibility",
      "Named on supplier NDA — full supply chain visibility",
    ],
  },
];

export default function PhoneFlippersPage() {
  const [calcUnits, setCalcUnits] = useState("1000");
  const [calcPrice, setCalcPrice] = useState("380");
  const [calcTier, setCalcTier] = useState("broker");

  const selectedTier = TIERS.find(t => t.id === calcTier) || TIERS[1];
  const units = Math.max(0, Number(calcUnits) || 0);
  const price = Math.max(0, Number(calcPrice) || 0);
  const orderValue = units * price;
  const monthlyCommission = orderValue * selectedTier.commission;
  const annualCommission = monthlyCommission * 12;

  const comparisons = TIERS.map(t => ({
    label: t.label,
    monthly: orderValue * t.commission,
    rate: t.commissionLabel,
    color: t.color,
    active: t.id === calcTier,
  }));

  return (
    <>
      <SEOMeta
        title="Phone Flipper & Broker Programme — ChainTrack Dubai"
        description="Move 500+ iPhones per month? Join ChainTrack's Phone Flipper & Broker Programme — priority lot access, dedicated account manager, and 2–6% referral commission per order."
        canonical="https://deliwer.com/phone-flippers"
      />
      <div className="min-h-screen bg-[#070B14] text-white">

        {/* ── HERO ── */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={brokerHandshake} alt="ChainTrack Phone Flipper Programme" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/88 to-[#070B14]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-6">
                <Star className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">500+ Units/Month · High-Volume Resellers & Distributors</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
                Phone Flipper &amp;
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Broker Programme
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl">
                If you move 500+ iPhones per month — as a reseller, buying-group organiser, or CIS distributor — you qualify for priority lot access, a dedicated account manager, and a 2–6% commission on every order you refer to ChainTrack.
              </p>
              <div className="flex flex-wrap items-center gap-5 mb-10 text-sm text-slate-400">
                {[
                  "Priority lot access before public listing",
                  "2–6% referral commission per order",
                  "Dedicated account manager on WhatsApp",
                  "Onboarding within 24 hours",
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink("[SOURCE: phone-flippers/hero]\n*BROKER PROGRAMME APPLICATION*\n\nI move 500+ units/month and want to apply.\n\nCompany:\nMonthly volume (units):\nMarkets served:\nWhatsApp:")}
                  target="_blank" rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-hero-apply">
                    <SiWhatsapp className="w-5 h-5" />
                    Apply Now — WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#earnings-calculator">
                  <Button size="lg" variant="outline" className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-black uppercase tracking-widest gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Calculate Earnings
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── PIPELINE CRUMB ── */}
        <div className="bg-[#070B14] border-b border-[#1E293B]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest flex-wrap">
            <Link href="/wholesale">
              <span className="text-slate-500 hover:text-amber-400 transition-colors cursor-pointer">Wholesale Hub</span>
            </Link>
            <span className="text-slate-600 mx-1">→</span>
            <span className="text-white/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Phone Flipper & Broker Programme
            </span>
            <span className="text-slate-600 mx-1">→</span>
            <Link href="/chaintrack">
              <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">Live Auctions on ChainTrack</span>
            </Link>
          </div>
        </div>

        {/* ── TIER CARDS ── */}
        <section className="py-16 px-4 bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Three Tiers · One Programme</div>
              <h2 className="text-3xl font-black text-white mb-3">Pick Your Tier — Grow Into the Next</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Tiers are assigned based on your trailing 3-month average. Most Flippers graduate to Broker within 60 days.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {TIERS.map((t) => (
                <div key={t.id} className={`relative rounded-2xl border-2 p-6 ${t.border} ${t.bg} ${t.ring}`}>
                  {t.highlight && (
                    <div className="absolute -top-3 left-6">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-purple-600 text-white px-3 py-1 rounded-full">Most Popular</span>
                    </div>
                  )}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest mb-4 ${t.badge}`}>
                    <Star className="w-3 h-3" />
                    {t.label}
                  </div>
                  <div className="font-black text-white text-xl mb-0.5">{t.label}</div>
                  <div className="text-xs text-slate-500 mb-1">{t.volume}</div>
                  <div className={`text-3xl font-black mb-5 ${
                    t.color === "amber" ? "text-amber-400" : t.color === "purple" ? "text-purple-400" : "text-pink-400"
                  }`}>{t.commissionLabel} commission</div>
                  <ul className="space-y-2.5 mb-6">
                    {t.perks.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`[SOURCE: phone-flippers/tier-${t.id}]\n*BROKER PROGRAMME — ${t.label.toUpperCase()} TIER APPLICATION*\n\nCompany:\nMonthly volume (units):\nMarkets served:\nWhatsApp:`)}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Button
                      className={`w-full font-black uppercase tracking-widest gap-2 text-xs ${
                        t.color === "purple" ? "bg-purple-600 hover:bg-purple-500 text-white" :
                        t.color === "pink" ? "bg-pink-600 hover:bg-pink-500 text-white" :
                        "bg-amber-500 hover:bg-amber-400 text-black"
                      }`}
                      data-testid={`button-apply-${t.id}`}
                    >
                      <SiWhatsapp className="w-3.5 h-3.5" />
                      Apply — {t.label}
                    </Button>
                  </a>
                </div>
              ))}
            </div>

            {/* Tier progression note */}
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-xl p-4 flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-white">Tier progression is automatic.</strong> Your account manager reviews your trailing 3-month volume every calendar quarter. Tier upgrades unlock immediately — no re-application needed. Downgrade protection: one quarter below threshold before tier adjustment.
              </p>
            </div>
          </div>
        </section>

        {/* ── EARNINGS CALCULATOR ── */}
        <section className="py-16 px-4 bg-[#070B14]" id="earnings-calculator">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2">Referral Commission Calculator</div>
              <h2 className="text-3xl font-black text-white mb-3">How Much Can You Earn?</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Enter your expected monthly volume and average unit price. We'll show what each tier earns you in referral commissions.
              </p>
            </div>

            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl overflow-hidden">
              {/* Inputs */}
              <div className="p-6 border-b border-[#1E293B]">
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2 block">Units / Month</Label>
                    <Input
                      type="number" min="0"
                      value={calcUnits}
                      onChange={e => setCalcUnits(e.target.value)}
                      className="bg-[#070B14] border-[#1E293B] text-white text-lg font-black h-12"
                      placeholder="1000"
                      data-testid="input-calc-units"
                    />
                    <p className="text-[10px] text-slate-600 mt-1">e.g. 1000 units/month</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2 block">Avg Price / Unit (USD)</Label>
                    <Input
                      type="number" min="0"
                      value={calcPrice}
                      onChange={e => setCalcPrice(e.target.value)}
                      className="bg-[#070B14] border-[#1E293B] text-white text-lg font-black h-12"
                      placeholder="380"
                      data-testid="input-calc-price"
                    />
                    <p className="text-[10px] text-slate-600 mt-1">e.g. $380 avg per unit</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2 block">Your Tier</Label>
                    <Select value={calcTier} onValueChange={setCalcTier}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white h-12" data-testid="select-calc-tier">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="flipper">Flipper — 2%</SelectItem>
                        <SelectItem value="broker">Broker — 4%</SelectItem>
                        <SelectItem value="master">Master Broker — 6%</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-slate-600 mt-1">Select your expected tier</p>
                  </div>
                </div>
              </div>

              {/* Result — selected tier */}
              <div className="p-6 border-b border-[#1E293B]">
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#070B14] rounded-xl p-5 text-center border border-[#1E293B]">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Order Value / Month</div>
                    <div className="text-2xl font-black text-white">${orderValue.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{units.toLocaleString()} units × ${price}/unit</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-xl p-5 text-center border border-purple-500/30">
                    <div className="text-[9px] font-black uppercase tracking-widest text-purple-400 mb-1">Monthly Commission</div>
                    <div className="text-3xl font-black text-purple-300">${monthlyCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <div className="text-[10px] text-purple-500 mt-0.5">{selectedTier.commissionLabel} of order value</div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-5 text-center border border-emerald-500/30">
                    <div className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">Annual Commission</div>
                    <div className="text-3xl font-black text-emerald-300">${annualCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <div className="text-[10px] text-emerald-500 mt-0.5">× 12 months</div>
                  </div>
                </div>
              </div>

              {/* Tier comparison */}
              <div className="p-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Compare Across All Tiers</div>
                <div className="space-y-3">
                  {comparisons.map((c) => {
                    const barPct = annualCommission > 0 ? Math.round((c.monthly / (orderValue * 0.06)) * 100) : 0;
                    const colorClass = c.color === "amber" ? "bg-amber-500" : c.color === "purple" ? "bg-purple-500" : "bg-pink-500";
                    const textClass = c.color === "amber" ? "text-amber-400" : c.color === "purple" ? "text-purple-400" : "text-pink-400";
                    return (
                      <div key={c.label} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${c.active ? "bg-[#070B14] border border-[#1E293B]" : "opacity-60"}`}>
                        <div className="w-24 shrink-0">
                          <div className={`text-[10px] font-black uppercase tracking-widest ${textClass}`}>{c.label}</div>
                          <div className="text-[9px] text-slate-600">{c.rate} commission</div>
                        </div>
                        <div className="flex-1 bg-[#1E293B] rounded-full h-2">
                          <div className={`h-2 rounded-full transition-all duration-500 ${colorClass}`} style={{ width: `${barPct}%` }} />
                        </div>
                        <div className={`text-sm font-black w-20 text-right ${textClass}`}>
                          ${c.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-600 mt-4">
                  * Commissions are on the value of orders you refer to ChainTrack that complete settlement. Paid monthly to your account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ONBOARDING FLOW ── */}
        <section className="py-16 px-4 bg-[#0A0F1E] border-t border-[#1E293B]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Onboarding Process</div>
              <h2 className="text-2xl font-black text-white mb-3">From Application to Active Broker in 24 Hours</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">No lengthy contracts. No setup fees. WhatsApp-first onboarding — same process whether you're in Dubai, Baku, or Moscow.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {[
                {
                  n: "01", icon: SiWhatsapp, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                  title: "Apply via WhatsApp",
                  desc: "Send your company name, monthly volume, and markets you serve. The pre-filled application message is already formatted — just tap send.",
                  time: "2 min",
                },
                {
                  n: "02", icon: CheckCircle2, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
                  title: "Volume Verification",
                  desc: "Our team checks your trading history and assigns your tier. No documentation required for Flipper tier — just a 5-minute WhatsApp call.",
                  time: "Same day",
                },
                {
                  n: "03", icon: Users, color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
                  title: "Dedicated Manager Assigned",
                  desc: "You're introduced to your account manager on WhatsApp. They send your referral attribution ID, priority lot access, and the broker resource pack.",
                  time: "Within 24h",
                },
                {
                  n: "04", icon: Banknote, color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
                  title: "First Commission Paid",
                  desc: "Commissions are tracked per order ID. Monthly payout via bank wire or USDT. Minimum payout threshold: $200. No cap on monthly earnings.",
                  time: "End of first month",
                },
              ].map((s) => (
                <div key={s.n} className={`rounded-2xl border p-5 ${s.color}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{s.n}</span>
                    <s.icon className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded-full ml-auto">{s.time}</span>
                  </div>
                  <div className="font-black text-white text-sm mb-1.5">{s.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Programme rules */}
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Programme Rules</div>
                <ul className="space-y-2">
                  {[
                    "No exclusivity required — source from other suppliers",
                    "Commission paid on ChainTrack orders you originate",
                    "Referrals tracked by your attribution ID in WA messages",
                    "No cap on monthly earnings at any tier",
                    "Commission paid on settled, confirmed orders only",
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">What You Get Immediately</div>
                <ul className="space-y-2">
                  {[
                    "Your unique referral attribution ID",
                    "Priority WhatsApp group: pre-market lot previews",
                    "Broker resource pack: scripts, BOQ templates, pitch deck",
                    "Access to Telegram broker community (200+ active members)",
                    "Monthly lot allocation guarantee (Broker tier and above)",
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TELEGRAM COMMUNITY ── */}
        <section className="py-14 px-4 bg-[#070B14] border-t border-[#1E293B]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sky-900/30 to-[#0a0f1e] border border-sky-500/25 rounded-2xl overflow-hidden">
              <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <SiTelegram className="w-8 h-8 text-sky-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Broker Community · Telegram</div>
                  <h2 className="text-2xl font-black text-white mb-2">Join the Active Broker Network</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    200+ active Phone Flippers and Brokers share live lot alerts, sourcing tips, CIS market intel, and daily auction highlights. Pre-market lot notifications go to this channel 30 minutes before public listing — approved brokers only.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={TELEGRAM_COMMUNITY} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-sky-600 hover:bg-sky-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-telegram-community">
                        <SiTelegram className="w-4 h-4" />
                        Join Broker Telegram
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                    <a href={waLink("[SOURCE: phone-flippers/telegram-wa]\nI want to join the ChainTrack Broker Programme and the Telegram community.")} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black uppercase tracking-widest gap-2">
                        <SiWhatsapp className="w-4 h-4" />
                        Apply First via WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* What the channel posts */}
              <div className="border-t border-sky-500/15 px-8 md:px-10 py-5 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Zap, title: "Pre-market lot alerts", desc: "30 min before public listing — first access for brokers only" },
                  { icon: Globe, title: "CIS market intel", desc: "Import duty changes, customs updates, airport corridor news" },
                  { icon: BarChart3, title: "Price & demand reports", desc: "Weekly supply/demand analysis from our procurement desk" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <f.icon className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-black text-white text-xs mb-0.5">{f.title}</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BENEFITS STRIP ── */}
        <section className="py-14 px-4 bg-[#0A0F1E] border-t border-[#1E293B]">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Zap, color: "text-amber-400", title: "Priority Lot Access", desc: "Fixed-price lots reserved before public listing. Broker channel gets pre-market alerts 30 min early." },
                { icon: Banknote, color: "text-emerald-400", title: "2–6% Per Order", desc: "Commission on the full order value of every deal you originate. Paid monthly. No ceiling." },
                { icon: Users, color: "text-cyan-400", title: "Dedicated Manager", desc: "One WhatsApp contact who knows your markets and proactively finds what you sell." },
                { icon: Globe, color: "text-purple-400", title: "CIS Corridor Support", desc: "RODTEP exemptions, air cargo coordination, and customs docs for Baku, Almaty, Tashkent — handled." },
              ].map((b, i) => (
                <div key={i} className="bg-[#0D1424] border border-[#1E293B] rounded-xl p-5">
                  <b.icon className={`w-5 h-5 mb-3 ${b.color}`} />
                  <div className="font-black text-white text-sm mb-1.5">{b.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <img src={dubaiAirHub} alt="Dubai logistics hub" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/93 to-[#070B14]/80" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-5">
              <Star className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">Applications Open · 24h Onboarding</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Ready to Start Earning?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Send your application on WhatsApp. Your account manager onboards you within 24 hours and your attribution ID goes live immediately.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={waLink("[SOURCE: phone-flippers/final-cta]\n*BROKER PROGRAMME APPLICATION*\n\nCompany:\nMonthly volume (units):\nMarkets served (e.g. Dubai, CIS, Africa):\nCurrent supplier(s):\nPreferred tier (Flipper / Broker / Master):\nWhatsApp:")}
                target="_blank" rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-final-apply-wa">
                  <SiWhatsapp className="w-5 h-5" />
                  Apply — WhatsApp
                </Button>
              </a>
              <a href={`${TELEGRAM_COMMUNITY}?text=${encodeURIComponent("[SOURCE: phone-flippers/final-cta-telegram]\nBROKER PROGRAMME APPLICATION\n\nCompany:\nMonthly volume:\nMarkets:")}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest gap-2">
                  <SiTelegram className="w-5 h-5" />
                  Apply — Telegram
                </Button>
              </a>
              <Link href="/wholesale">
                <Button size="lg" variant="ghost" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest gap-1.5">
                  <Package className="w-4 h-4" />
                  Back to Wholesale Hub
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
