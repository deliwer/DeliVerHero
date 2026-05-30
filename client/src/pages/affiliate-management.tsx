import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Copy, Check, TrendingUp, Users, DollarSign, BarChart3, MessageSquare,
  ArrowRight, Zap, Shield, Globe, Building, UserCheck, Radio,
  ChevronRight, ExternalLink, Phone, Star, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { openTrackedWhatsApp } from "@/lib/lead-tracker";

// Simulated live market signals — pulse every 8 seconds
const BASE_SIGNALS = {
  leadsToday: 34,
  moveRequests: 19,
  exitRequests: 11,
  overpayingAlerts: 47,
  topArea: "JVC",
  demandSpike: "Business Bay",
};

function useLiveSignals() {
  const [signals, setSignals] = useState(BASE_SIGNALS);
  useEffect(() => {
    const id = setInterval(() => {
      setSignals(prev => ({
        leadsToday: prev.leadsToday + Math.floor(Math.random() * 3),
        moveRequests: prev.moveRequests + (Math.random() > 0.6 ? 1 : 0),
        exitRequests: prev.exitRequests + (Math.random() > 0.7 ? 1 : 0),
        overpayingAlerts: prev.overpayingAlerts + Math.floor(Math.random() * 2),
        topArea: ["JVC", "Marina", "Business Bay", "Downtown", "JLT"][Math.floor(Math.random() * 5)],
        demandSpike: ["Business Bay", "JVC", "Jumeirah", "Silicon Oasis", "DIFC"][Math.floor(Math.random() * 5)],
      }));
    }, 8000);
    return () => clearInterval(id);
  }, []);
  return signals;
}

const TIERS = [
  {
    label: "Strategic Partners",
    rate: "35%",
    color: "emerald",
    who: ["Real estate brokerages", "Typing centers", "Corporate relocation teams", "Building management"],
    why: "They bring direct tenant relationships, high-intent leads, and volume consistency.",
    cta: "Activate Partner Account",
    href: "https://wa.me/971523906019?text=Hi,%20I%20want%20to%20become%20a%20Strategic%20Partner%20(35%25%20tier).",
  },
  {
    label: "Broker / Agent Tier",
    rate: "20–25%",
    color: "blue",
    who: ["Individual brokers", "Leasing agents"],
    why: "Convert your tenant conversations into an additional income stream.",
    cta: "Get My Referral Link",
    href: "https://wa.me/971523906019?text=Hi,%20I%27m%20a%20broker%20and%20want%20a%20referral%20link.",
  },
  {
    label: "Influencer / Community",
    rate: "10–15%",
    color: "violet",
    who: ["Influencers", "WhatsApp group admins", "Community leaders"],
    why: "Help your audience save money and earn per qualified referral.",
    cta: "Join Community Network",
    href: "https://wa.me/971523906019?text=Hi,%20I%27m%20a%20community%20leader%20and%20want%20to%20refer%20tenants.",
  },
  {
    label: "General Referral",
    rate: "5–10%",
    color: "amber",
    who: ["Anyone with a network"],
    why: "Share a link. Earn when someone you know uses DeliWer.",
    cta: "Start Earning Now",
    href: "https://wa.me/971523906019?text=Hi,%20I%20want%20to%20refer%20people%20and%20earn.",
  },
];

const WHATSAPP_SCRIPTS = [
  {
    label: "Overpaying Check",
    text: "Check if you're overpaying rent in Dubai → deliwer.com/are-you-overpaying-rent-dubai",
    color: "emerald",
  },
  {
    label: "Before Renewal",
    text: "Before renewing your rent, compare your options → deliwer.com/move-vs-renew-dubai",
    color: "blue",
  },
  {
    label: "Leaving Dubai",
    text: "Leaving Dubai? This saves you time, money and your deposit → deliwer.com/exit-dubai",
    color: "violet",
  },
  {
    label: "New Tenant",
    text: "Just got keys to a new apartment in Dubai? Everything sorted in one request → deliwer.com/start",
    color: "amber",
  },
];

const PARTNERS = [
  { name: "DeBacci Capital", ref: "debacci", clicks: 247, conversions: 18, revenue: 7182, commission: 1436 },
  { name: "EGLC", ref: "eglc", clicks: 156, conversions: 12, revenue: 4788, commission: 958 },
  { name: "MyTablon", ref: "mytablon", clicks: 89, conversions: 7, revenue: 2793, commission: 559 },
];

const colorMap: Record<string, string> = {
  emerald: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  blue: "border-blue-500/40 bg-blue-500/5 text-blue-400",
  violet: "border-violet-500/40 bg-violet-500/5 text-violet-400",
  amber: "border-amber-500/40 bg-amber-500/5 text-amber-400",
};
const badgeMap: Record<string, string> = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};
const btnMap: Record<string, string> = {
  emerald: "bg-emerald-600 hover:bg-emerald-500",
  blue: "bg-blue-600 hover:bg-blue-500",
  violet: "bg-violet-600 hover:bg-violet-500",
  amber: "bg-amber-600 hover:bg-amber-500",
};

export default function AffiliateManagement() {
  const { toast } = useToast();
  const signals = useLiveSignals();
  const [copied, setCopied] = useState<string | null>(null);
  const [refCode, setRefCode] = useState("");
  const [refLookup, setRefLookup] = useState<typeof PARTNERS[0] | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(null), 2000);
  };

  const lookupPartner = () => {
    const found = PARTNERS.find(p => p.ref.toLowerCase() === refCode.trim().toLowerCase());
    setRefLookup(found || null);
    if (!found) toast({ title: "Code not found", description: "Check your referral code and try again.", variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white" data-testid="command-center-page">
      <SEOMeta
        title="Command Center | DeliWer Affiliate & Partner Network"
        description="DeliWer's partner command center. Earn by helping people move smarter across Dubai. Live market signals, tiered affiliate commissions, and WhatsApp tools."
      />
      <Navigation />

      {/* HERO */}
      <section className="pt-40 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase tracking-widest text-[10px] font-black px-4 py-1.5">
            Relocation Intelligence + Income Generation Network
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Earn by Helping<br />
            <span className="text-emerald-500">People Move</span><br />
            Smarter.
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            In uncertain times, people need coordination, clarity, and support.
            DeliWer helps you provide all three — while creating an additional income stream from your existing network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/971523906019?text=Hi,%20I%20want%20to%20become%20a%20DeliWer%20partner." target="_blank">
              <Button className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 font-black uppercase tracking-widest text-base rounded-2xl">
                Activate Your Network <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link href="/marketing/dashboard">
              <Button variant="outline" className="h-14 px-8 border-white/10 text-gray-300 hover:bg-white/5 font-black uppercase tracking-widest text-base rounded-2xl">
                Founder Dashboard <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE MARKET SIGNALS */}
      <section className="py-16 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Live Market Signals</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">Live relocation demand across Dubai, Sharjah, and surrounding areas</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Radio className="w-4 h-4 animate-pulse" />
              Live
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Leads Today", value: signals.leadsToday, icon: Activity, color: "text-emerald-400" },
              { label: "Move Requests", value: signals.moveRequests, icon: TrendingUp, color: "text-blue-400" },
              { label: "Exit Requests", value: signals.exitRequests, icon: ArrowRight, color: "text-violet-400" },
              { label: "Overpaying Alerts", value: signals.overpayingAlerts, icon: Zap, color: "text-amber-400" },
              { label: "Top Area", value: signals.topArea, icon: Globe, color: "text-cyan-400" },
              { label: "Demand Spike", value: signals.demandSpike, icon: Star, color: "text-rose-400" },
            ].map((s, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 text-center"
                data-testid={`signal-${s.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <s.icon className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATE ECONOMY EXPLAINED */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black uppercase tracking-tighter">The Affiliate Economy</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Anyone can earn by referring tenants who need help with moving apartments,
              registering Ejari, leaving Dubai, or reducing rent.
              No new customers needed — just your existing relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Users, label: "Your existing contacts", desc: "Tenants, brokers, building managers — people you already know." },
              { icon: MessageSquare, label: "A WhatsApp message", desc: "Share a pre-written script. Takes 30 seconds." },
              { icon: DollarSign, label: "Earn per conversion", desc: "5% to 35% commission on every coordinated move." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-3">
                <item.icon className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-black uppercase text-sm tracking-widest text-white">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERED INCENTIVE STRUCTURE */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Earning Tiers</h2>
            <p className="text-gray-400">Higher volume and relationship depth = higher commission.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border rounded-3xl p-8 space-y-5 ${colorMap[tier.color]}`}
                data-testid={`tier-${tier.color}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{tier.label}</p>
                    <p className={`text-5xl font-black`}>{tier.rate}</p>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-50 mt-1">commission</p>
                  </div>
                  <Badge className={`border ${badgeMap[tier.color]} font-black uppercase tracking-widest text-[10px]`}>
                    {i === 0 ? "Top Tier" : i === 1 ? "Popular" : i === 2 ? "Community" : "Open"}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {tier.who.map((w, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70 font-medium">
                      <ChevronRight className="w-4 h-4 shrink-0 opacity-50" />
                      {w}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-white/50 italic">{tier.why}</p>
                <Button
                  className={`w-full h-12 font-black uppercase tracking-widest text-white rounded-xl ${btnMap[tier.color]}`}
                  onClick={() => openTrackedWhatsApp(`Partner inquiry: ${tier.label}`)}
                  data-testid={`tier-cta-${tier.color}`}
                >
                  {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER ACTIVATION — WhatsApp Scripts */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Activate Your Network</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Copy these pre-written scripts and send directly to your contacts.
              Every link is trackable. Every referral is attributed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {WHATSAPP_SCRIPTS.map((script, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-6 space-y-4 ${colorMap[script.color]}`}
                data-testid={`script-${i}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">{script.label}</p>
                  <MessageSquare className="w-4 h-4 opacity-40" />
                </div>
                <p className="text-sm text-white/80 font-medium leading-relaxed italic">
                  "{script.text}"
                </p>
                <Button
                  variant="outline"
                  className={`w-full border-current font-black uppercase tracking-widest text-xs h-10 gap-2`}
                  onClick={() => copy(script.text, `script-${i}`)}
                  data-testid={`copy-script-${i}`}
                >
                  {copied === `script-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === `script-${i}` ? "Copied!" : "Copy Script"}
                </Button>
              </div>
            ))}
          </div>

          {/* Referral Link Generator */}
          <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-black uppercase tracking-tight">Your Referral Links</h3>
            </div>
            <p className="text-gray-400 text-sm">Every link includes <code className="text-emerald-400">?ref=yourcode</code> — captured, persisted, and attributed automatically across all pages.</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { label: "Move-In", path: "/start?ref=yourcode" },
                { label: "Ejari", path: "/ejari-dubai?ref=yourcode" },
                { label: "Exit Dubai", path: "/exit-dubai?ref=yourcode" },
                { label: "Overpaying Check", path: "/are-you-overpaying-rent-dubai?ref=yourcode" },
              ].map((link, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-900/60 border border-white/10 rounded-xl p-3">
                  <span className="text-xs text-emerald-400 font-black uppercase tracking-widest w-24 shrink-0">{link.label}</span>
                  <span className="text-xs text-gray-400 flex-1 truncate font-mono">deliwer.com{link.path}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0 h-7 px-2 text-gray-400 hover:text-white"
                    onClick={() => copy(`https://deliwer.com${link.path}`, `link-${i}`)}
                    data-testid={`copy-link-${i}`}
                  >
                    {copied === `link-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PERFORMANCE DASHBOARD */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Performance Dashboard</h2>
              <p className="text-gray-400 text-sm">Partner stats, conversion rates, and estimated commissions.</p>
            </div>
            <div className="flex gap-2 max-w-xs w-full">
              <Input
                placeholder="Enter referral code"
                value={refCode}
                onChange={e => setRefCode(e.target.value)}
                className="bg-slate-800 border-white/10 text-white placeholder:text-gray-500 rounded-xl"
                data-testid="input-ref-code"
              />
              <Button onClick={lookupPartner} className="bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold px-4" data-testid="button-lookup">
                Look Up
              </Button>
            </div>
          </div>

          {refLookup && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl"
              data-testid="ref-lookup-result"
            >
              {[
                { label: "Partner", value: refLookup.name },
                { label: "Clicks", value: refLookup.clicks },
                { label: "Conversions", value: refLookup.conversions },
                { label: "Est. Commission", value: `AED ${refLookup.commission.toLocaleString()}` },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black text-emerald-400">{item.value}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Partner</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Clicks</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Conversions</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Revenue</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PARTNERS.map((p, i) => (
                  <tr key={i} className="group" data-testid={`partner-row-${i}`}>
                    <td className="py-4 font-bold text-white">{p.name}</td>
                    <td className="py-4 text-gray-400">{p.clicks}</td>
                    <td className="py-4">
                      <span className="text-emerald-400 font-bold">{p.conversions}</span>
                    </td>
                    <td className="py-4 text-gray-300">AED {p.revenue.toLocaleString()}</td>
                    <td className="py-4">
                      <span className="font-black text-emerald-400">AED {p.commission.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DISTRIBUTION ENGINE */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase tracking-tighter">The Distribution Engine</h2>
              <p className="text-gray-300 leading-relaxed">
                Partners do not need to find new customers. They use their existing tenant databases,
                WhatsApp contacts, and CRM pipelines. This is a <strong className="text-white">monetization layer
                on top of existing relationships</strong>.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Building, text: "Existing tenant databases" },
                  { icon: MessageSquare, text: "WhatsApp broadcast lists" },
                  { icon: Users, text: "CRM pipelines and leads" },
                  { icon: Globe, text: "Social and community reach" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                    <item.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              {[
                { label: "Auto-track", desc: "Every click and referral captured automatically" },
                { label: "Auto-report", desc: "Live stats in your dashboard, no manual work" },
                { label: "Auto-attribute", desc: "All leads linked to your referral code" },
                { label: "Auto-scale", desc: "No operations needed — the system grows with you" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black uppercase text-sm tracking-tight text-white">{item.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CONVERSION ENGINE */}
      <section className="py-16 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter">WhatsApp Conversion Engine</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            All leads convert via WhatsApp. Zero friction, instant response, highest conversion of any channel in the UAE market.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Open Rate", value: "84%", color: "text-emerald-400" },
              { label: "Response Rate", value: "12.5%", color: "text-blue-400" },
              { label: "WhatsApp vs Email CTR", value: "5×", color: "text-violet-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl py-6">
                <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          <a href="https://wa.me/971523906019?text=Hi,%20I%27d%20like%20to%20learn%20more%20about%20partnering%20with%20DeliWer." target="_blank">
            <Button className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 font-black uppercase tracking-widest text-lg rounded-2xl">
              <MessageSquare className="mr-3 h-6 w-6" />
              Talk to the Team on WhatsApp
            </Button>
          </a>
        </div>
      </section>

      {/* WHATSAPP CLOSING SCRIPTS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">High Conversion</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter">WhatsApp Sales Scripts</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Use these exact scripts in sequence. Copy, paste, and close. Each one moves the lead one step forward.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: "01",
                label: "First Response",
                timing: "Within 2 minutes",
                color: "emerald",
                script: `Hi 👋 thanks for reaching out to DeliWer.\n\nI see you're planning a [move / Ejari / exit].\n\nJust to understand better so we can coordinate everything smoothly:\n\n• When is your move date?\n• From which area to which area?\n• Any furniture or special requirements?\n\nWe'll handle everything end-to-end for you.`,
              },
              {
                step: "02",
                label: "Qualification",
                timing: "After first reply",
                color: "blue",
                script: `Got it — based on your requirement, we can coordinate:\n\n• Movers\n• Cleaning\n• Utility setup / closure\n• Full relocation support\n\nYou won't need to deal with multiple vendors — we handle it all.`,
              },
              {
                step: "03",
                label: "Price Framing",
                timing: "Before quoting",
                color: "violet",
                script: `Our coordination is structured so you don't pay upfront.\n\nWe align everything with the service providers and include our coordination within the overall move cost.\n\nThis way you get full support without additional stress.`,
              },
              {
                step: "04",
                label: "Close",
                timing: "Standard close",
                color: "amber",
                script: `I'll proceed to line up the best options for your move.\n\nCan you confirm:\n\n• Exact move date\n• Building access timing\n• Contact number\n\nOnce confirmed, we'll take it forward immediately.`,
              },
              {
                step: "05",
                label: "Urgency Close",
                timing: "For tight timelines",
                color: "rose",
                script: `Since timelines are tight, it's best we secure availability today.\n\nI'll prioritize your request and lock the best options now.`,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="grid md:grid-cols-[140px_1fr] gap-6 p-6 bg-slate-800/60 border border-white/10 rounded-2xl"
                data-testid={`closing-script-${i}`}
              >
                <div className="space-y-1">
                  <p className={`text-3xl font-black text-${item.color}-500/40`}>{item.step}</p>
                  <p className="font-black uppercase text-xs tracking-widest text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.timing}</p>
                </div>
                <div className="space-y-3">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{item.script}</pre>
                  <Button
                    variant="outline"
                    className="border-white/10 text-gray-400 hover:text-white font-black uppercase tracking-widest text-xs h-9 gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(item.script);
                      toast({ title: `Script ${item.step} copied` });
                    }}
                    data-testid={`copy-closing-${i}`}
                  >
                    <Copy className="w-3 h-3" /> Copy Script
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE SHEETS SETUP */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">One-Time Setup</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Connect Google Sheets</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              All leads, traffic, and partner stats flow automatically into your Command Center spreadsheet.
              Set this up once — the system runs itself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 1 — Create Sheet */}
            <div className="space-y-4 p-6 bg-blue-950/20 border border-blue-500/20 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-blue-500/40">01</span>
                <h3 className="font-black uppercase tracking-tight text-white">Create the Spreadsheet</h3>
              </div>
              <p className="text-gray-400 text-sm">Create a Google Sheet named <strong className="text-white">DeliWer Command Center</strong> with these 4 sheets:</p>
              <div className="space-y-2">
                {[
                  { name: "LEADS", cols: "Timestamp | Name | Phone | Scenario | From Area | To Area | Move Date | Referral Code | Source Page | Estimated Value | Status" },
                  { name: "PARTNERS", cols: "Partner Name | Type | Referral Code | WhatsApp | Commission % | Total Leads | Total Revenue" },
                  { name: "TRAFFIC", cols: "Timestamp | Page | Referral Code | UTM Source | UTM Campaign | Device | City" },
                  { name: "DASHBOARD", cols: "Formulas auto-populate from LEADS and TRAFFIC sheets" },
                ].map((sheet, i) => (
                  <div key={i} className="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                    <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">{sheet.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono leading-relaxed">{sheet.cols}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2 — Apps Script */}
            <div className="space-y-4 p-6 bg-blue-950/20 border border-blue-500/20 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-blue-500/40">02</span>
                <h3 className="font-black uppercase tracking-tight text-white">Deploy the Webhook</h3>
              </div>
              <p className="text-gray-400 text-sm">Go to <strong className="text-white">Extensions → Apps Script</strong> and paste this code:</p>
              <div className="relative">
                <pre className="text-[10px] text-emerald-300 bg-slate-950 rounded-xl p-4 overflow-x-auto leading-relaxed font-mono border border-white/5">{`function doPost(e) {
  var sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("LEADS");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.scenario || "",
    data.from || "",
    data.to || "",
    data.date || "",
    data.ref || "",
    data.page || "",
    data.value || "",
    "New"
  ]);
  return ContentService
    .createTextOutput("Success");
}`}</pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-500 hover:text-white h-7 px-2"
                  onClick={() => {
                    navigator.clipboard.writeText(`function doPost(e) {\n  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("LEADS");\n  var data = JSON.parse(e.postData.contents);\n  sheet.appendRow([new Date(), data.name || "", data.phone || "", data.scenario || "", data.from || "", data.to || "", data.date || "", data.ref || "", data.page || "", data.value || "", "New"]);\n  return ContentService.createTextOutput("Success");\n}`);
                    toast({ title: "Script copied" });
                  }}
                  data-testid="copy-apps-script"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <ol className="space-y-2 text-xs text-gray-400 list-decimal list-inside">
                <li>Click <strong className="text-white">Deploy → New Deployment → Web App</strong></li>
                <li>Set access to <strong className="text-white">Anyone</strong></li>
                <li>Copy the webhook URL</li>
                <li>Add it to your environment as <code className="text-emerald-400">VITE_SHEETS_WEBHOOK_URL</code></li>
              </ol>
            </div>

            {/* DASHBOARD Formulas */}
            <div className="md:col-span-2 p-6 bg-slate-800/60 border border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-blue-500/40">03</span>
                <h3 className="font-black uppercase tracking-tight text-white">DASHBOARD Sheet Formulas</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { label: "Total Leads Today", formula: `=COUNTIF(LEADS!A:A, TODAY())` },
                  { label: "Top Scenario", formula: `=QUERY(LEADS!D:D, "select D, count(D) group by D order by count(D) desc limit 1")` },
                  { label: "Top Partner", formula: `=QUERY(LEADS!H:H, "select H, count(H) group by H order by count(H) desc limit 1")` },
                ].map((f, i) => (
                  <div key={i} className="p-4 bg-slate-900/60 rounded-xl border border-white/5 space-y-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{f.label}</p>
                    <pre className="text-[10px] text-emerald-300 font-mono whitespace-pre-wrap">{f.formula}</pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-gray-600 hover:text-white text-[10px]"
                      onClick={() => { navigator.clipboard.writeText(f.formula); toast({ title: "Formula copied" }); }}
                    >
                      <Copy className="w-2.5 h-2.5 mr-1" /> Copy
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL POSITIONING + FINAL MESSAGE */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Stability Engine</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              Not Everyone Needs<br />
              <span className="text-emerald-500">To Leave.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: Shield, title: "Tenants get clarity", desc: "Better relocation decisions, not panic-driven exits." },
              { icon: DollarSign, title: "Partners earn more", desc: "An income layer on top of existing relationships." },
              { icon: Globe, title: "Networks support each other", desc: "Coordination at scale, without capital." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                <item.icon className="w-7 h-7 text-emerald-400" />
                <p className="font-black uppercase text-sm tracking-tight text-white">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <blockquote className="text-2xl font-black text-white/80 leading-relaxed italic border-l-4 border-emerald-500 pl-8 text-left">
            "Not everyone needs to leave. Some just need better coordination, better decisions,
            and better opportunities. DeliWer connects all three."
          </blockquote>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 font-black uppercase tracking-widest rounded-2xl"
              onClick={() => openTrackedWhatsApp("Activate network - final CTA")}
              data-testid="button-final-cta"
            >
              Activate My Network <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/relocate">
              <Button variant="outline" className="h-14 px-8 border-white/10 text-gray-300 hover:bg-white/5 font-black uppercase tracking-widest rounded-2xl">
                See What We Coordinate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
