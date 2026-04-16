import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Crown, Trophy, Rocket, UserCheck, CheckCircle2, MessageCircle,
  ArrowRight, Zap, Star, Droplets, Gift, Home, Users, TrendingUp,
  Shield, Utensils, ChefHat, Smartphone, Network, DollarSign,
  Clock, Sparkles, Copy, Check, Building2, Play, Award, Globe
} from "lucide-react";

function cleanName(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

const FAST_START_STEPS = [
  {
    day: "Day 1",
    title: "Share Your Link With Your Next Tenant",
    desc: "You just closed a lease. Before you leave, WhatsApp your tenant one line: 'Here\u2019s how to sort your move-in in one go \u2014 Ejari, DEWA, movers, setup.' That\u2019s it. You\u2019ve just triggered a commission.",
    earn: "AED 150–800",
    earnLabel: "per move-in",
    color: "emerald",
    icon: Home,
    cta: { label: "Get Your Broker Link", href: "/brokers" },
  },
  {
    day: "Day 2–7",
    title: "Offer the AED 99 AquaCafe Deal",
    desc: "Once your tenant confirms the move-in, introduce them to the AquaCafe Starter Kit. They get a FREE ionic shower filter (AED 399 value), a AED 100 Chill & Grill dining voucher, and lifetime water discounts. You earn a bonus on every activation.",
    earn: "AED 50 bonus",
    earnLabel: "+ restaurant perks",
    color: "cyan",
    icon: Droplets,
    cta: { label: "See AquaCafe Deal", href: "/aquacafe-alliance" },
  },
  {
    day: "Day 7–30",
    title: "Introduce Your Tenant as an Independent Distributor",
    desc: "Your settled tenant loves the service. Show them they can now earn by referring their neighbors, colleagues and building contacts — same as you did. When they convert 3 referrals, you earn an override commission on everything they generate.",
    earn: "+5% override",
    earnLabel: "on their referrals",
    color: "purple",
    icon: Users,
    cta: { label: "See Network Tiers", href: "/partners" },
  },
  {
    day: "Month 2–3",
    title: "Unlock Kangen Water Home Setup Income",
    desc: "Every new home needs a water solution. As a trained Independent Distributor, you can introduce Kangen/Enagic ionized water systems as a premium home upgrade — earning Enagic distributor commission on each unit sold (AED 1,299–2,299 systems).",
    earn: "Enagic rates",
    earnLabel: "per water system",
    color: "blue",
    icon: Droplets,
    cta: { label: "Learn About Water Setup", href: "#kangen-training" },
  },
];

const CAREER_TIERS = [
  {
    tier: "Customer",
    badge: "Entry · Free",
    icon: UserCheck,
    color: "slate",
    gradient: "from-slate-800/60 to-slate-800/30",
    border: "border-slate-600/40",
    timeline: "Start immediately",
    income: "AED 0–500/mo",
    how: "Use DeliWer services, refer friends organically, earn 15% referral credit.",
    unlocks: ["Your personal referral link", "AquaCafe Starter Kit access", "Chill & Grill dining voucher", "100 Planet Points per referral"],
    upgrade: "Make 3 referrals → auto-upgrade",
  },
  {
    tier: "Independent Distributor",
    badge: "Tier 3 · Active",
    icon: Rocket,
    color: "emerald",
    gradient: "from-emerald-950/60 to-emerald-900/30",
    border: "border-emerald-500/40",
    timeline: "Within 30 days",
    income: "AED 500–2,000/mo",
    how: "Actively refer tenants and introduce others to the AquaCafe deal and DeliWer services.",
    unlocks: ["25–30% commission on referrals", "AquaCafe distributor training", "Kangen Water demo access", "Chill & Grill partner dining", "Bronze Planet Hero status", "500 Planet Points per conversion"],
    upgrade: "3+ Ind. Distributors in team → Senior",
  },
  {
    tier: "Senior Distributor",
    badge: "Tier 2 · Advanced",
    icon: Trophy,
    color: "purple",
    gradient: "from-purple-950/60 to-purple-900/30",
    border: "border-purple-500/40",
    timeline: "3–6 months",
    income: "AED 2,000–5,000/mo",
    how: "Build and support a team of Independent Distributors. Your income multiplies through your team's activity.",
    unlocks: ["30% own referral rate", "+5% override on ID team earnings", "Silver Planet Hero status", "AquaCafe full distributor access", "Enagic upline bonus activation", "Priority WhatsApp support"],
    upgrade: "5+ Senior Distributors → Leader",
  },
  {
    tier: "Leader",
    badge: "Tier 1 · Elite",
    icon: Crown,
    color: "amber",
    gradient: "from-amber-950/60 to-amber-900/30",
    border: "border-amber-500/40",
    timeline: "6–12 months",
    income: "AED 5,000+/mo",
    how: "Lead a full network. Your team works across brokers, tenants, water systems, and restaurant activations while you earn multi-layer overrides.",
    unlocks: ["30% own rate + 10% + 5% overrides", "Gold/Elite Planet Hero status", "Full Kangen/Enagic upline income", "Exclusive leadership events access", "AED 5,000+/mo passive potential", "Co-branding with DeliWer"],
    upgrade: "You've built a passive income machine.",
  },
];

const KANGEN_STEPS = [
  {
    step: "01",
    title: "Learn the Science",
    desc: "Understand ionized alkaline water, ORP (antioxidant potential), and how Kangen systems differ from standard filters. Free training resources provided via DeliWer partner portal.",
    icon: Droplets,
  },
  {
    step: "02",
    title: "Demo at Every Move-In",
    desc: "Every tenant you settle is a water conversation. Show them the AquaCafe shower filter first (low barrier, AED 99 kit), then upsell to the full Kangen under-sink or counter-top system.",
    icon: Home,
  },
  {
    step: "03",
    title: "Register as Enagic Distributor",
    desc: "Join the Enagic Independent Distributor network through the DeliWer partner pathway. Earn Enagic's 8-point commission structure on every machine sale (AED 1,299–4,500+).",
    icon: Award,
  },
  {
    step: "04",
    title: "Build Your Water Team",
    desc: "Every broker you bring in who activates a Kangen sale becomes part of your Enagic downline. As a Leader, your network earns Enagic upline bonuses on top of DeliWer commissions.",
    icon: Network,
  },
];

const RESTAURANT_PERKS = [
  {
    partner: "Chill & Grill",
    location: "Mazaya Centre, Dubai",
    perk: "FREE meal tasting on every AquaCafe activation",
    bonus: "AED 100 Chill & Grill voucher included in AED 99 kit",
    icon: ChefHat,
    detail: "Chef at Chill & Grill's partnership: every new AquaCafe member gets a complimentary tasting session and can redeem the AED 100 voucher for pizza or boba tea.",
  },
  {
    partner: "AquaCafe Partner Network",
    location: "Dubai-wide",
    perk: "20% lifetime discount on water products",
    bonus: "Members earn DXB Carbon Tokens redeemable for dining",
    icon: Utensils,
    detail: "Every purchase earns Dubai Carbon Tokens. Tokens convert to dining credits, tech rewards (iPhones), and exclusive partner benefits across the AquaCafe restaurant network.",
  },
  {
    partner: "Planet Heroes Rewards",
    location: "Digital + Physical",
    perk: "Redeem points for premium dining, gadgets & retreats",
    bonus: "Elite Heroes unlock curated experience packages",
    icon: Gift,
    detail: "Planet Points from referrals and activations unlock a full rewards catalogue: restaurant experiences, iPhone trade-in credits, wellness retreats, and AquaCafe premium upgrades.",
  },
];

export default function PartnerCareerPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [refLink, setRefLink] = useState("");
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    if (!name.trim()) {
      toast({ title: "Enter your name", description: "We'll create your personal link in seconds." });
      return;
    }
    const ref = cleanName(name);
    setRefLink(`https://www.deliwer.com/move-in?ref=${ref}`);
  }

  async function handleCopy() {
    if (!refLink) return;
    await navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share with your tenants right now to start earning." });
    setTimeout(() => setCopied(false), 2500);
  }

  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    blue: "text-blue-400",
    amber: "text-amber-400",
    slate: "text-slate-300",
  };

  const bgMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    cyan: "bg-cyan-500/10 border-cyan-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    blue: "bg-blue-500/10 border-blue-500/20",
    amber: "bg-amber-500/10 border-amber-500/20",
    slate: "bg-slate-700/40 border-slate-600/30",
  };

  const dotMap: Record<string, string> = {
    emerald: "bg-emerald-400",
    cyan: "bg-cyan-400",
    purple: "bg-purple-400",
    blue: "bg-blue-400",
    amber: "bg-amber-400",
    slate: "bg-slate-400",
  };

  const btnMap: Record<string, string> = {
    emerald: "bg-emerald-600 hover:bg-emerald-500",
    cyan: "bg-cyan-600 hover:bg-cyan-500",
    purple: "bg-purple-600 hover:bg-purple-500",
    blue: "bg-blue-600 hover:bg-blue-500",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta
        title="Partner Career Path | Earn from Day 1 | DeliWer Dubai"
        description="Start earning from your first tenant referral. Build a team through the DeliWer, AquaCafe and Kangen Enagic network to create multi-stream passive income in Dubai."
      />
      <Navigation />
      <PartnerSubNav />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=900&fit=crop"
            alt="Team building career"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-7 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">Breakthrough Partner Program</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Your First<br />
              <span className="text-emerald-400">Commission</span><br />
              Today.
            </h1>
            <p className="text-xl text-gray-200 font-medium leading-relaxed max-w-2xl">
              You already have tenants. Every lease you close is an untapped income stream.
              Start earning from your existing relationships in minutes — then build a team
              that earns for you around the clock through DeliWer, AquaCafe, and Kangen Water.
            </p>

            {/* Instant link generator in hero */}
            <div className="bg-slate-900/80 backdrop-blur border border-emerald-500/30 rounded-2xl p-5 max-w-xl space-y-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Generate Your Referral Link — Free, Instant</p>
              <div className="flex gap-3">
                <Input
                  data-testid="input-career-name"
                  placeholder="Your name or company"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleGenerate()}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11 flex-1"
                />
                <Button
                  data-testid="button-career-generate"
                  onClick={handleGenerate}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-11 px-6 shrink-0"
                >
                  Get Link
                </Button>
              </div>
              {refLink && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-slate-800 border border-emerald-500/30 rounded-xl p-3"
                >
                  <span className="text-emerald-300 text-sm font-mono flex-1 truncate">{refLink}</span>
                  <button
                    data-testid="button-career-copy-link"
                    onClick={handleCopy}
                    className="shrink-0 text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </motion.div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20to%20join%20the%20partner%20career%20program%20and%20start%20earning%20from%20my%20tenants."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  data-testid="button-career-hero-wa"
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-13 px-10 text-base rounded-2xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start on WhatsApp
                </Button>
              </a>
              <Link href="#fast-start">
                <Button
                  data-testid="button-career-hero-scroll"
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black h-13 px-8 text-base rounded-2xl"
                >
                  <Play className="w-4 h-4 mr-2" />
                  See How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROOF STRIP ──────────────────────────────────── */}
      <div className="bg-slate-900/60 border-y border-white/5 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3">
          {[
            { label: "Earn from Day 1", icon: Zap },
            { label: "No upfront fees", icon: Shield },
            { label: "Existing tenants = instant income", icon: Home },
            { label: "Restaurant perks included", icon: ChefHat },
            { label: "Monthly cash payouts", icon: DollarSign },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-300 font-semibold">
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── FAST START: QUICK WINS ───────────────────────── */}
      <section id="fast-start" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-5 py-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest">Zero to Earning — No Long Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              Start With Who<br />
              <span className="text-emerald-400">You Already Know.</span>
            </h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              Every broker, agent, and community contact has existing tenant relationships.
              That's your starting capital — no cold outreach, no waiting.
              Here's the 4-step path from your first share to building a team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAST_START_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-testid={`card-fast-start-${i}`}
                  className={`bg-gradient-to-br ${step.color === "emerald" ? "from-emerald-950/50 to-slate-900" : step.color === "cyan" ? "from-cyan-950/50 to-slate-900" : step.color === "purple" ? "from-purple-950/50 to-slate-900" : "from-blue-950/50 to-slate-900"} border ${step.color === "emerald" ? "border-emerald-500/30" : step.color === "cyan" ? "border-cyan-500/30" : step.color === "purple" ? "border-purple-500/30" : "border-blue-500/30"} rounded-3xl p-7 space-y-5 relative overflow-hidden`}
                >
                  {/* Step number watermark */}
                  <div className={`absolute top-4 right-5 text-7xl font-black opacity-5 ${colorMap[step.color]}`}>{i + 1}</div>

                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${bgMap[step.color]} border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${colorMap[step.color]}`} />
                    </div>
                    <div>
                      <Badge className={`${bgMap[step.color]} border ${colorMap[step.color]} text-[10px] font-black uppercase tracking-widest mb-1`}>{step.day}</Badge>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-[15px]">{step.desc}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <div className={`text-2xl font-black ${colorMap[step.color]}`}>{step.earn}</div>
                      <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{step.earnLabel}</div>
                    </div>
                    <Link href={step.cta.href}>
                      <Button
                        data-testid={`button-fast-start-cta-${i}`}
                        size="sm"
                        className={`${btnMap[step.color] || "bg-slate-600 hover:bg-slate-500"} text-white font-black rounded-xl px-5 h-10 text-sm`}
                      >
                        {step.cta.label}
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AQUACAFE GATEWAY DEAL ──────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-teal-950/40 border-y border-cyan-500/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/30 rounded-full px-5 py-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-[11px] font-black uppercase tracking-widest">The Gateway Deal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              AED 99 Converts Your Tenant<br />
              <span className="text-cyan-400">Into a Network Partner.</span>
            </h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              The AquaCafe Starter Kit is the perfect offer to every tenant after move-in.
              It costs less than a dinner, delivers AED 499+ in value, and hooks them into the
              earning ecosystem — which means ongoing override income for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESTAURANT_PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.partner}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-testid={`card-restaurant-perk-${i}`}
                  className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-cyan-400/70 mb-1">{perk.location}</div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-white">{perk.partner}</h4>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3">
                    <div className="text-sm font-black text-cyan-300">{perk.perk}</div>
                    <div className="text-xs text-cyan-400/60 mt-1">{perk.bonus}</div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{perk.detail}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Value stack visual */}
          <div className="bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white">
                  What Your Tenant Gets<br />
                  <span className="text-cyan-400">For AED 99</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { item: "FREE Ionic Shower Filter", value: "AED 399 value" },
                    { item: "Chill & Grill Dining Voucher", value: "AED 100 value" },
                    { item: "Lifetime 20% water product discount", value: "Ongoing savings" },
                    { item: "Bronze Planet Hero Status", value: "Instant upgrade" },
                    { item: "Access to Kangen Water demos", value: "Free training sessions" },
                    { item: "DXB Carbon Tokens (1,000 pts)", value: "Redeemable rewards" },
                  ].map(({ item, value }) => (
                    <div key={item} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-gray-200 text-sm font-medium">{item}</span>
                      </div>
                      <span className="text-cyan-300 text-xs font-black whitespace-nowrap">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-5">
                <div className="text-center bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8">
                  <div className="text-6xl font-black text-cyan-300">AED 99</div>
                  <div className="text-xs text-cyan-500/70 font-black uppercase tracking-widest mt-2">Total Investment</div>
                  <div className="text-gray-500 text-xs mt-1">Total value: AED 499+</div>
                </div>
                <Link href="/aquacafe-alliance">
                  <Button
                    data-testid="button-career-aquacafe-cta"
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl h-14 px-10 text-base shadow-xl shadow-cyan-900/40 w-full"
                  >
                    <Droplets className="w-5 h-5 mr-2" />
                    Activate the Deal
                  </Button>
                </Link>
                <a
                  href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20to%20offer%20my%20tenants%20the%20AED%2099%20AquaCafe%20deal%20and%20earn%20as%20a%20partner."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    data-testid="button-career-aquacafe-wa"
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 font-black rounded-2xl px-8 h-11 text-sm w-full"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER LADDER ────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">Career Ladder</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              Four Tiers. One Path.<br />
              <span className="text-amber-400">Unlimited Ceiling.</span>
            </h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              Each tier builds on the last. You don't need to start at the top —
              you just need to start. The system promotes you automatically when you hit the milestones.
            </p>
          </div>

          <div className="space-y-5">
            {CAREER_TIERS.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  data-testid={`card-career-tier-${tier.tier.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`bg-gradient-to-r ${tier.gradient} border ${tier.border} rounded-3xl p-6 md:p-8`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Tier identity */}
                    <div className="flex items-start gap-4 lg:w-64 shrink-0">
                      <div className={`w-14 h-14 rounded-2xl ${bgMap[tier.color]} border flex items-center justify-center shrink-0`}>
                        <Icon className={`w-7 h-7 ${colorMap[tier.color]}`} />
                      </div>
                      <div>
                        <Badge className={`${bgMap[tier.color]} border ${colorMap[tier.color]} text-[10px] font-black uppercase tracking-widest mb-1`}>{tier.badge}</Badge>
                        <h3 className={`text-xl font-black uppercase tracking-tighter ${colorMap[tier.color]}`}>{tier.tier}</h3>
                        <div className="flex flex-col gap-0.5 mt-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-[11px] text-gray-500 font-semibold">{tier.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3 h-3 text-gray-500" />
                            <span className={`text-[13px] font-black ${colorMap[tier.color]}`}>{tier.income}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center: How + unlocks */}
                    <div className="flex-1 space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed">{tier.how}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tier.unlocks.map(u => (
                          <div key={u} className="flex items-center gap-2 text-[12px] text-gray-300 font-medium">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotMap[tier.color]}`} />
                            {u}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: upgrade path */}
                    <div className="lg:w-56 shrink-0">
                      <div className={`${bgMap[tier.color]} border rounded-2xl p-4 h-full flex flex-col justify-between gap-3`}>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Upgrade Path</div>
                          <p className={`text-sm font-bold ${colorMap[tier.color]}`}>{tier.upgrade}</p>
                        </div>
                        {i < CAREER_TIERS.length - 1 && (
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
                            <ArrowRight className="w-3 h-3" />
                            Next: {CAREER_TIERS[i + 1].tier}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KANGEN / ENAGIC TRAINING ─────────────────────── */}
      <section id="kangen-training" className="py-24 px-4 bg-gradient-to-r from-blue-950/40 via-slate-950 to-blue-950/40 border-y border-blue-500/20">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-5 py-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-[11px] font-black uppercase tracking-widest">Kangen Enagic Distributor Track</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                Every Home<br />
                Needs<br />
                <span className="text-blue-400">Healthy Water.</span>
              </h2>
              <p className="text-gray-300 font-medium leading-relaxed text-lg">
                Kangen Water by Enagic is a globally recognised ionized alkaline water system —
                the same technology used in hospitals and health-conscious homes across Japan and the UAE.
                As an Independent Distributor in the DeliWer network, you get trained to introduce these
                systems at every home setup, creating a second income stream from every tenant move-in.
              </p>
              <div className="space-y-3">
                {[
                  "Enagic 8-point commission structure on every machine",
                  "Systems range from AED 1,299 (entry) to AED 4,500+ (premium)",
                  "ORP -450mV water — scientifically documented antioxidant properties",
                  "Every AquaCafe member gets a complimentary demo session",
                  "Upline income as your team grows their Enagic sales",
                ].map(point => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20to%20learn%20about%20becoming%20a%20Kangen%20Enagic%20distributor%20through%20the%20partner%20network."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  data-testid="button-career-kangen-wa"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl h-13 px-10 text-base"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Kangen Training
                </Button>
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tight text-white">The 4-Step Distributor Path</h3>
              {KANGEN_STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    data-testid={`card-kangen-step-${i}`}
                    className="flex gap-4 bg-blue-950/40 border border-blue-500/25 rounded-2xl p-5"
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-black text-blue-400/60">{s.step}</span>
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-white text-base">{s.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed mt-1">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMBINED INCOME CALCULATOR VISUAL ──────────── */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-5 py-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest">Income Stack — What This Looks Like in Practice</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              Multiple Streams.<br />
              <span className="text-emerald-400">One Relationship.</span>
            </h2>
          </div>

          {/* Income scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                scenario: "Broker — Month 1",
                label: "Just started",
                color: "emerald",
                streams: [
                  { source: "3× move-in referrals (1BR avg)", amount: "AED 900" },
                  { source: "3× AquaCafe kit activations", amount: "AED 150" },
                  { source: "Planet Hero bonus (Bronze)", amount: "AED 50" },
                ],
                total: "AED 1,100",
                note: "Using existing clients from your current pipeline",
              },
              {
                scenario: "Ind. Distributor — Month 3",
                label: "Growing team",
                color: "purple",
                streams: [
                  { source: "8× move-in referrals (own)", amount: "AED 2,400" },
                  { source: "Team override (3 distributors)", amount: "AED 450" },
                  { source: "2× Kangen system sales", amount: "AED 800" },
                  { source: "AquaCafe activations × team", amount: "AED 200" },
                ],
                total: "AED 3,850",
                note: "Team doing the work, you earning the override",
              },
              {
                scenario: "Leader — Month 9",
                label: "Full team active",
                color: "amber",
                streams: [
                  { source: "Own referrals (10×)", amount: "AED 3,000" },
                  { source: "Senior team overrides (5×)", amount: "AED 1,500" },
                  { source: "Ind. Distributor deep override", amount: "AED 1,200" },
                  { source: "Enagic upline bonuses", amount: "AED 2,000" },
                ],
                total: "AED 7,700+",
                note: "Multi-stream passive income running through your network",
              },
            ].map((scenario, i) => (
              <motion.div
                key={scenario.scenario}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-testid={`card-income-scenario-${i}`}
                className={`${bgMap[scenario.color]} border rounded-2xl p-6 space-y-5`}
              >
                <div>
                  <Badge className={`${bgMap[scenario.color]} border ${colorMap[scenario.color]} text-[10px] font-black uppercase tracking-widest mb-1`}>{scenario.label}</Badge>
                  <h4 className={`text-lg font-black uppercase tracking-tight ${colorMap[scenario.color]}`}>{scenario.scenario}</h4>
                </div>
                <div className="space-y-2.5">
                  {scenario.streams.map(stream => (
                    <div key={stream.source} className="flex items-center justify-between gap-3">
                      <span className="text-gray-400 text-xs font-medium leading-tight flex-1">{stream.source}</span>
                      <span className={`text-sm font-black whitespace-nowrap ${colorMap[scenario.color]}`}>{stream.amount}</span>
                    </div>
                  ))}
                </div>
                <div className={`border-t ${bgMap[scenario.color].includes("emerald") ? "border-emerald-500/20" : bgMap[scenario.color].includes("purple") ? "border-purple-500/20" : "border-amber-500/20"} pt-4 flex items-center justify-between`}>
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">Monthly Total</span>
                  <span className={`text-2xl font-black ${colorMap[scenario.color]}`}>{scenario.total}</span>
                </div>
                <p className="text-[11px] text-gray-500 italic">{scenario.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-900/40 to-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">Join the Leadership Network</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
            Your Team.<br />
            <span className="text-amber-400">Your Commission.</span><br />
            Start Now.
          </h2>
          <p className="text-gray-300 font-medium leading-relaxed text-xl max-w-2xl mx-auto">
            Don't wait for the perfect moment. Your next tenant is your first step.
            Join on WhatsApp, get your link, and share it today.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20to%20join%20the%20Planet%20Heroes%20partner%20career%20program%20and%20start%20building%20my%20team."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                data-testid="button-career-final-cta"
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-black h-16 px-14 text-lg shadow-2xl shadow-amber-900/40 rounded-2xl"
              >
                <Crown className="w-5 h-5 mr-2" />
                Join the Network on WhatsApp
              </Button>
            </a>
            <Link href="/brokers">
              <Button
                data-testid="button-career-broker-cta"
                size="lg"
                variant="outline"
                className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-black h-16 px-10 text-lg rounded-2xl"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Broker Referral Tools
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center pt-2 text-[12px] text-gray-500 font-semibold uppercase tracking-wider">
            {["No fees to join", "Instant referral link", "Monthly cash payouts", "Upgrade automatically", "Restaurant perks included"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
