import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Zap, Users, TrendingUp, Award, BarChart3, BookOpen, MessageCircle, CheckCircle2, ArrowRight, Link2, Share2, BarChart2, Wallet, RefreshCw, Network, DollarSign, Handshake, Crown, Star, Rocket, UserCheck, ChevronDown, Shield, Globe, Sparkles, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";
import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { Link } from "wouter";

const PARTNER_TYPES_LIST = [
  "Real Estate Broker",
  "Ejari Typing Center",
  "Building Security / Concierge",
  "Moving Company",
  "Influencer / Content Creator",
  "Corporate Relocation Team",
  "Other",
];

function PartnerRegisterForm() {
  const [form, setForm] = useState({ name: "", company: "", type: "", whatsapp: "", city: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    openWhatsApp(buildWhatsAppMessage({
      intro: "Hello DeliWer, I'd like to join the partner referral network.",
      fields: {
        Name: form.name || undefined,
        Company: form.company || undefined,
        "Partner type": form.type || undefined,
        WhatsApp: form.whatsapp || undefined,
        City: form.city || undefined,
      },
    }));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-10 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-2xl font-black text-white uppercase">Application Received!</h3>
        <p className="text-gray-300 font-medium leading-relaxed">
          Our team will activate your referral code and contact you on WhatsApp within the day.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Name</Label>
          <Input
            data-testid="input-partners-name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Your full name"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Company</Label>
          <Input
            data-testid="input-partners-company"
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="Company / agency name"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Partner Type</Label>
        <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
          <SelectTrigger data-testid="select-partners-type" className="bg-slate-800 border-slate-600 text-white rounded-xl h-11">
            <SelectValue placeholder="Select partner type..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600 text-white">
            {PARTNER_TYPES_LIST.map(t => (
              <SelectItem key={t} value={t} className="hover:bg-slate-700 focus:bg-slate-700">{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">WhatsApp</Label>
          <Input
            data-testid="input-partners-whatsapp"
            value={form.whatsapp}
            onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
            placeholder="+971 50 000 0000"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">City</Label>
          <Input
            data-testid="input-partners-city"
            value={form.city}
            onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
            placeholder="e.g. Dubai, Sharjah"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
          />
        </div>
      </div>
      <Button
        data-testid="button-partners-register-submit"
        size="lg"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-14 text-lg"
        onClick={handleSubmit}
        disabled={!form.name && !form.company}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Join the Partner Network
      </Button>
      <p className="text-[11px] text-gray-600 text-center font-medium">
        Clicking above opens WhatsApp to send your registration details to DeliWer.
      </p>
    </div>
  );
}

export default function PartnersPage() {
  const [partnerName, setPartnerName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [campaign, setCampaign] = useState("whatsapp");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Generate referral link
  const generateLink = () => {
    if (!partnerName) return "";
    const ref = partnerName.toLowerCase().replace(/\s+/g, "");
    const agent = agentName ? agentName.toLowerCase().replace(/\s+/g, "") : "";
    
    let link = `${window.location.origin}/start?ref=${ref}`;
    if (agent) link += `&agent=${agent}`;
    if (campaign) link += `&campaign=${campaign}`;
    
    return link;
  };

  const generatedLink = generateLink();

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Your referral link is ready to share.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Partner with DeliWer | Referral Program | Dubai Move-In Services"
        description="Join DeliWer's partner network and earn 20% commission. Generate your unique referral link and start earning today."
      />
      <Navigation />
      <PartnerSubNav />
      {/* Hero Section with Lifestyle Image */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Founder-only secret trigger — absolute inside hero, above the overlay */}
        <Link href="/marketing/recruit" data-testid="link-founder-recruit-secret" className="absolute top-6 right-6 z-20">
          <span className="hover:text-emerald-400 transition-colors duration-300 select-none opacity-50 hover:opacity-90 text-[48px] text-[#d33434] bg-[#4f0035]">
            ⬡
          </span>
        </Link>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop" 
            alt="Professional networking and lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10 px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-block">
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-full px-6 py-3 backdrop-blur-sm">
                <p className="text-emerald-300 font-black text-sm uppercase tracking-wider">Partner Network</p>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
              Partner With <span className="text-emerald-400">DeliWer</span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
              Help tenants move in stress-free and earn from every successful referral.
              Partners receive a percentage of coordination revenue generated from vendor services.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 justify-center pt-4"
            >
              <div className="flex items-center justify-center gap-3 text-emerald-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold">No tenant markup</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold">Monthly payouts</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold">Instant referral link</span>
              </div>
            </motion.div>

            <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/partners/join">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 px-12 text-lg shadow-2xl" data-testid="button-hero-become-partner">
                  Become a Partner
                </Button>
              </Link>
              <Link href="/transaction-support">
                <Button size="lg" variant="outline" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black h-14 px-10 text-lg">
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── BROKER SPOTLIGHT BANNER ─────────────────────── */}
      <section className="py-10 px-4 bg-gradient-to-r from-purple-950/60 via-slate-950 to-purple-950/40 border-y border-purple-500/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Left: label + copy */}
          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">For Real Estate Brokers</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white leading-tight">
              Close More Deals. Earn AED 150–800+ Per Client.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Generate your personal referral link in seconds — share it after lease signing and DeliWer handles the entire move-in. You earn on every completed service, automatically.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-gray-500 font-semibold pt-1 justify-center md:justify-start">
              {["Studio: AED 150–300", "1BR: AED 300–600", "Villa: AED 800+", "Free to join"].map(t => (
                <span key={t} className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <Link href="/broker-partner" data-testid="button-partners-broker-cta-primary">
              <Button
                size="lg"
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-8 h-13 text-sm shadow-xl shadow-purple-900/40 transition-all"
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate My Referral Link
              </Button>
            </Link>
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I'm%20a%20real%20estate%20broker%20and%20want%20to%20join%20the%20partner%20program."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-partners-broker-cta-wa"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full md:w-auto border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-black rounded-2xl px-7 h-11 text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── NETWORK HIERARCHY ─────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 space-y-16">

          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">Planet Heroes Network</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              Build Your Leadership Team.<br />
              <span className="text-amber-400">Earn on Every Level.</span>
            </h2>
            <p className="text-gray-400 font-medium max-w-3xl mx-auto text-lg leading-relaxed">
              Join as a Customer, grow into an Independent Distributor, lead a team as a Senior Distributor,
              and build empires as a Leader — every tier earns commission on DeliWer's move-in and sustainability services,
              compounded through your entire network.
            </p>
          </div>

          {/* Hierarchy Pyramid Visual */}
          <div className="space-y-4">

            {/* LEADER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              data-testid="tier-leader"
              className="relative"
            >
              <div className="bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-amber-950/60 border border-amber-500/40 rounded-3xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon + Label */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-900/50">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] font-black uppercase tracking-widest mb-1">Tier 1 · Elite</Badge>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-amber-300">Leader</h3>
                    </div>
                  </div>
                  {/* Commission rates */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Own Referral Rate", value: "30%", sub: "of coordination fee" },
                      { label: "Team Override", value: "+10%", sub: "on Senior Distributors" },
                      { label: "Deep Override", value: "+5%", sub: "on Ind. Distributors" },
                      { label: "Avg Monthly", value: "AED 5,000+", sub: "at full team strength" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 text-center">
                        <div className="text-xl md:text-2xl font-black text-amber-300">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-400/70 mt-0.5">{stat.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Requirements */}
                <div className="mt-5 pt-5 border-t border-amber-500/20 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="text-[11px] text-amber-400/80 font-black uppercase tracking-widest">Requirements:</div>
                  {["5+ Senior Distributors in team", "Planet Hero: Gold Status", "Lifetime AquaCafe activation", "30-day active referral streak"].map(r => (
                    <div key={r} className="flex items-center gap-1.5 text-[12px] text-gray-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              {/* Connector arrow down */}
              <div className="flex justify-center mt-1 mb-1">
                <ChevronDown className="w-6 h-6 text-amber-500/40" />
              </div>
            </motion.div>

            {/* SENIOR DISTRIBUTOR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-testid="tier-senior-distributor"
              className="relative"
            >
              <div className="bg-gradient-to-r from-purple-950/60 via-purple-900/40 to-purple-950/60 border border-purple-500/40 rounded-3xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-900/50">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-[10px] font-black uppercase tracking-widest mb-1">Tier 2 · Advanced</Badge>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-purple-300">Senior Distributor</h3>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Own Referral Rate", value: "30%", sub: "of coordination fee" },
                      { label: "Team Override", value: "+5%", sub: "on Ind. Distributors" },
                      { label: "Bonus Threshold", value: "3 IDs", sub: "to unlock override" },
                      { label: "Avg Monthly", value: "AED 1,500+", sub: "active team earning" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-3 text-center">
                        <div className="text-xl md:text-2xl font-black text-purple-300">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-purple-400/70 mt-0.5">{stat.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-purple-500/20 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="text-[11px] text-purple-400/80 font-black uppercase tracking-widest">Requirements:</div>
                  {["3+ Independent Distributors in team", "Planet Hero: Silver Status", "AquaCafe activated", "90-day active status"].map(r => (
                    <div key={r} className="flex items-center gap-1.5 text-[12px] text-gray-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-1 mb-1">
                <ChevronDown className="w-6 h-6 text-purple-500/40" />
              </div>
            </motion.div>

            {/* INDEPENDENT DISTRIBUTOR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-testid="tier-independent-distributor"
              className="relative"
            >
              <div className="bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-emerald-950/60 border border-emerald-500/40 rounded-3xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-900/50">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px] font-black uppercase tracking-widest mb-1">Tier 3 · Active</Badge>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-emerald-300">Independent Distributor</h3>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Own Referral Rate", value: "25%", sub: "of coordination fee" },
                      { label: "Upgrade Bonus", value: "30%", sub: "after 5 conversions" },
                      { label: "Per Referral", value: "AED 150+", sub: "Studio / 1BR rate" },
                      { label: "Planet Points", value: "500 pts", sub: "per conversion" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 text-center">
                        <div className="text-xl md:text-2xl font-black text-emerald-300">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400/70 mt-0.5">{stat.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-emerald-500/20 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="text-[11px] text-emerald-400/80 font-black uppercase tracking-widest">Requirements:</div>
                  {["AquaCafe Starter Kit activated (AED 99)", "Planet Hero: Bronze Status", "1+ successful referral within 30 days", "WhatsApp group with 10+ contacts"].map(r => (
                    <div key={r} className="flex items-center gap-1.5 text-[12px] text-gray-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-1 mb-1">
                <ChevronDown className="w-6 h-6 text-emerald-500/40" />
              </div>
            </motion.div>

            {/* CUSTOMER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              data-testid="tier-customer"
            >
              <div className="bg-gradient-to-r from-slate-800/60 via-slate-800/40 to-slate-800/60 border border-slate-600/50 rounded-3xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-xl shadow-slate-900/50">
                      <UserCheck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-slate-600/40 text-slate-300 border-slate-500/40 text-[10px] font-black uppercase tracking-widest mb-1">Tier 4 · Entry</Badge>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-200">Customer</h3>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Referral Credit", value: "15%", sub: "on referred sales" },
                      { label: "Upgrade Path", value: "3 refs", sub: "to Ind. Distributor" },
                      { label: "AquaCafe Deal", value: "AED 99", sub: "Starter Kit entry" },
                      { label: "Planet Points", value: "100 pts", sub: "per successful ref" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-slate-700/40 border border-slate-600/30 rounded-2xl p-3 text-center">
                        <div className="text-xl md:text-2xl font-black text-slate-200">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400/80 mt-0.5">{stat.label}</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-600/30 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="text-[11px] text-slate-400/80 font-black uppercase tracking-widest">How to start:</div>
                  {["Use DeliWer move-in services", "Share your unique referral link", "3 conversions → auto-upgrade to Ind. Distributor", "Earn Planet Points for every green action"].map(r => (
                    <div key={r} className="flex items-center gap-1.5 text-[12px] text-gray-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* AquaCafe Activation Deal Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            data-testid="aquacafe-activation-banner"
            className="bg-gradient-to-r from-cyan-950/70 via-teal-900/50 to-cyan-950/70 border border-cyan-500/40 rounded-3xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center md:text-left flex-1 space-y-3">
                <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-[11px] font-black uppercase tracking-widest">AquaCafe Leadership Activation</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
                  Start Your Team With<br />
                  <span className="text-cyan-400">The AquaCafe Deal</span>
                </h3>
                <p className="text-gray-300 font-medium leading-relaxed max-w-xl">
                  The AED 99 AquaCafe Starter Kit is the gateway into the Planet Heroes network.
                  Every team member you onboard through this deal activates your commission chain —
                  earn on move-in services, water products, sustainability missions, and every referral your team makes.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {[
                    { icon: Shield, label: "FREE Ionic Shower Filter (AED 399 value)" },
                    { icon: Globe, label: "AED 100 Chill & Grill Voucher" },
                    { icon: TrendingUp, label: "20% lifetime discount on water products" },
                    { icon: Star, label: "Instant Planet Hero Bronze status" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-3 py-2">
                      <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[12px] text-gray-200 font-semibold">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="text-center bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
                  <div className="text-5xl font-black text-cyan-300">AED 99</div>
                  <div className="text-[11px] text-cyan-500/70 font-black uppercase tracking-widest mt-1">Starter Kit</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Total value: AED 499+</div>
                </div>
                <Link href="/aquacafe-alliance">
                  <Button data-testid="button-aquacafe-activate" size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl h-14 px-10 text-base shadow-2xl shadow-cyan-900/50 w-full">
                    <Rocket className="w-5 h-5 mr-2" />
                    Activate My Team Deal
                  </Button>
                </Link>
                <a
                  href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%20want%20to%20build%20a%20leadership%20team%20starting%20with%20the%20AquaCafe%20deal."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button data-testid="button-aquacafe-wa" variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 font-black rounded-2xl px-8 h-11 text-sm w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Gamification / Planet Hero Points Explainer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                color: "amber",
                title: "Earn Planet Points",
                desc: "Every referral, move-in booking, sustainability action and AquaCafe activation earns Planet Points. Points unlock higher hero tiers and exclusive rewards.",
                points: ["500 pts — referral conversion", "200 pts — AquaCafe activation", "100 pts — sustainability mission", "1,000 pts — team member onboarded"],
              },
              {
                icon: Crown,
                color: "purple",
                title: "Climb the Hero Tiers",
                desc: "Planet Points drive your hero ranking from Bronze → Silver → Gold → Elite. Higher tiers unlock better commission overrides and exclusive leadership deals.",
                points: ["Bronze Hero: 0–999 pts", "Silver Hero: 1,000–4,999 pts", "Gold Hero: 5,000–14,999 pts", "Elite Hero: 15,000+ pts"],
              },
              {
                icon: Network,
                color: "emerald",
                title: "Network Multipliers",
                desc: "Your earnings multiply with every layer of your team. Leaders with active downlines earn passively as their distributors convert — the deeper your network, the bigger your monthly payouts.",
                points: ["Direct referral: 25–30%", "Senior team override: +5%", "Leader team override: +10%", "Full team: AED 5,000+/mo"],
              },
            ].map(({ icon: Icon, color, title, desc, points }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                data-testid={`card-gamification-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`bg-${color}-950/40 border border-${color}-500/30 rounded-2xl p-6 space-y-4`}
              >
                <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-white">{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                <ul className="space-y-1.5">
                  {points.map(pt => (
                    <li key={pt} className="flex items-center gap-2 text-[12px] text-gray-300 font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400 shrink-0`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Link href="/partners/join">
              <Button data-testid="button-network-join-cta" size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-black h-14 px-12 text-lg shadow-2xl shadow-amber-900/40 rounded-2xl">
                <Crown className="w-5 h-5 mr-2" />
                Join the Leadership Network
              </Button>
            </Link>
            <Link href="/planet-hero">
              <Button data-testid="button-network-planet-hero-cta" size="lg" variant="outline" className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-black h-14 px-10 text-lg rounded-2xl">
                <Star className="w-5 h-5 mr-2" />
                Explore Planet Heroes
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Partner Journey Flow */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">The Partner Journey</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">From First Share to Monthly Earnings</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">Eight steps. All of them powered by relationships you already have.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "01", icon: Users, label: "Discover DeliWer", desc: "Understand the platform and which partner tier fits your network." },
              { num: "02", icon: BarChart2, label: "Understand Earnings", desc: "See exactly how much you earn per lead, per conversion, and per tier." },
              { num: "03", icon: Link2, label: "Get Your Referral Link", desc: "Receive your unique deliwer.com?ref=yourcode in minutes via WhatsApp." },
              { num: "04", icon: Share2, label: "Share with Your Network", desc: "Use your existing conversations — tenants, CRM, WhatsApp groups, in-person." },
              { num: "05", icon: MessageCircle, label: "Generate Leads", desc: "Every click on your link that converts to a WhatsApp inquiry is tracked to you." },
              { num: "06", icon: BarChart3, label: "Track Performance", desc: "Check your partner dashboard anytime — leads, conversions, status." },
              { num: "07", icon: Wallet, label: "Receive Earnings", desc: "Monthly payouts. Transparent ledger. No hidden deductions." },
              { num: "08", icon: RefreshCw, label: "Scale Your Activity", desc: "More referrals = more earnings. Your network is your greatest asset." },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="relative bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-400/20">{step.num}</span>
                    <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-white text-xs uppercase tracking-tight mb-1">{step.label}</div>
                    <p className="text-gray-500 text-[11px] font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-8 py-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-black uppercase tracking-wide text-sm">You already have the relationships. DeliWer helps you unlock their value.</span>
            </div>
          </div>
        </div>
      </section>
      {/* Who Can Partner */}
      <section className="py-16 px-4 bg-slate-900 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-emerald-400 font-black uppercase tracking-widest text-xs">Partner Types</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Who Can Partner</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Real estate agents",
              "Relocation companies",
              "Property managers",
              "Influencers",
              "Corporate HR teams",
              "Building concierges",
              "Dubai bloggers",
              "Community leaders",
            ].map((type, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-xs font-black uppercase tracking-widest">
                <Users className="w-3 h-3" /> {type}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── HOW IT WORKS (Full) ── */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
              How It Works
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">Four Simple Steps</h2>
            <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">You refer. We coordinate. Vendors pay us. You earn. Tenants pay zero extra.</p>
          </div>

          <div className="space-y-5">
            {[
              {
                num: "1", color: "emerald",
                title: "Share Your Referral Link",
                desc: "After signing up, you receive a unique link (e.g. deliwer.com/?ref=yourname). Share it via WhatsApp, email, Instagram, or LinkedIn with anyone moving into a Dubai apartment.",
                details: ["Unique URL tracks every click", "Referral code stored in browser for 30 days", "Works on mobile and desktop"],
              },
              {
                num: "2", color: "blue",
                title: "Tenant Books Move-In Coordination",
                desc: "When your referred tenant visits DeliWer and submits a move-in request, your referral code is automatically attached. They confirm via WhatsApp — zero friction.",
                details: ["Tenant pays only normal vendor rates", "No extra charges from DeliWer", "Your code auto-populates in their request"],
              },
              {
                num: "3", color: "purple",
                title: "DeliWer Manages Vendors & Services",
                desc: "DeliWer coordinates all services: movers, Ejari registration, DEWA activation, and setup. Vendors complete the work and pay DeliWer an embedded coordination fee (10–15%).",
                details: ["Vetted, insured vendors", "One WhatsApp contact for everything", "Full coordination — tenant does nothing"],
              },
              {
                num: "4", color: "yellow",
                title: "You Earn Commission",
                desc: "After the job is confirmed complete, your commission is calculated from DeliWer's coordination fee share. Commissions are paid monthly — no minimums.",
                details: ["Paid from vendor coordination revenue only", "Tenant cost is never increased", "Monthly payout, no minimums"],
              },
            ].map((step, i) => {
              const colBg: Record<string, string> = {
                emerald: "bg-emerald-500 text-slate-950",
                blue: "bg-blue-500 text-slate-950",
                purple: "bg-purple-500 text-slate-950",
                yellow: "bg-yellow-500 text-slate-950",
              };
              const colBorder: Record<string, string> = {
                emerald: "border-emerald-500/20",
                blue: "border-blue-500/20",
                purple: "border-purple-500/20",
                yellow: "border-yellow-500/20",
              };
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className={`bg-white/5 border ${colBorder[step.color]} rounded-2xl p-6 md:p-8 flex gap-5 items-start`}>
                    <div className={`w-10 h-10 rounded-xl font-black text-xl flex items-center justify-center shrink-0 ${colBg[step.color]}`}>{step.num}</div>
                    <div className="space-y-3 flex-1">
                      <h3 className="text-base font-black uppercase tracking-tight text-white">{step.title}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed text-sm">{step.desc}</p>
                      <div className="space-y-1.5 pt-1">
                        {step.details.map((d, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {i < 3 && <div className="flex justify-center my-2"><ArrowRight className="w-5 h-5 text-emerald-500 rotate-90" /></div>}
                </motion.div>
              );
            })}
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-2">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Key Principle</p>
            <p className="text-white font-black text-lg uppercase tracking-tight">Tenants never pay extra.</p>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-lg mx-auto">
              Your commission comes exclusively from DeliWer's embedded coordination fee, which vendors include in their standard pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/partners/join">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 px-10 text-sm uppercase tracking-widest w-full sm:w-auto" data-testid="button-join-from-hiw">
                Become a Partner
              </Button>
            </Link>
            <Link href="/partners/earnings">
              <Button variant="outline" size="lg" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 rounded-xl h-12 px-10 text-sm font-black uppercase tracking-widest w-full sm:w-auto">
                See Earnings Examples →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRANSACTION SUPPORT CTA ── */}
      <section className="py-14 px-4 bg-slate-900 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-950 border border-emerald-500/25 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Transaction Support
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Your client just signed. What's next?</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                DeliWer activates after the deal. Ejari, DEWA, movers, internet — coordinated in one flow. Share this with your clients the moment the tenancy is signed.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/transaction-support" data-testid="cta-partners-transaction-support">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-8 h-11 text-sm shadow-lg transition-all w-full">
                  <ArrowRight className="w-4 h-4 mr-2" /> Transaction Support Page
                </Button>
              </Link>
              <a
                href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20my%20client%20just%20signed%20their%20tenancy.%20Can%20you%20start%20the%20move-in%20coordination?"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-partners-transaction-wa"
              >
                <Button variant="outline" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl px-8 h-11 text-sm w-full">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Directly
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Link Generator Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950/50 to-slate-900/30 border-t border-emerald-500/20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-900/60 border-emerald-500/50 p-8 backdrop-blur-sm shadow-2xl">
            <h2 className="text-3xl font-black uppercase mb-2 text-white">Generate Your Referral Link</h2>
            <p className="text-gray-300 text-sm mb-8">Create a unique link tailored to your network. One link, unlimited earnings.</p>
            
            <div className="space-y-6">
              {/* Partner Name */}
              <div>
                <Label className="text-sm font-black uppercase text-emerald-400 mb-2 block">Partner Name *</Label>
                <Input
                  placeholder="e.g., DeBacci Capital, MyTablon"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="bg-slate-950 border-white/20 text-white placeholder:text-gray-500 h-12"
                  data-testid="input-partner-name"
                />
                <p className="text-xs text-gray-500 mt-2">This will be used to track your referrals</p>
              </div>

              {/* Agent Name */}
              <div>
                <Label className="text-sm font-black uppercase text-emerald-400 mb-2 block">Agent Name (Optional)</Label>
                <Input
                  placeholder="e.g., John Smith"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-slate-950 border-white/20 text-white placeholder:text-gray-500 h-12"
                  data-testid="input-agent-name"
                />
                <p className="text-xs text-gray-500 mt-2">Identify the specific agent making the referral</p>
              </div>

              {/* Campaign */}
              <div>
                <Label className="text-sm font-black uppercase text-emerald-400 mb-2 block">Campaign</Label>
                <Select value={campaign} onValueChange={setCampaign}>
                  <SelectTrigger className="bg-slate-950 border-white/20 text-white h-12" data-testid="select-campaign">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20 text-white">
                    <SelectItem value="whatsapp" className="text-white bg-slate-900">WhatsApp Community</SelectItem>
                    <SelectItem value="telegram" className="text-white bg-slate-900">Telegram Group</SelectItem>
                    <SelectItem value="linkedin" className="text-white bg-slate-900">LinkedIn</SelectItem>
                    <SelectItem value="email" className="text-white bg-slate-900">Email</SelectItem>
                    <SelectItem value="personal" className="text-white bg-slate-900">Personal Network</SelectItem>
                    <SelectItem value="building" className="text-white bg-slate-900">Building Network</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">How you'll be sharing this link</p>
              </div>

              {/* Generated Link Display */}
              {generatedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6"
                >
                  <p className="text-xs font-black uppercase text-emerald-400 mb-3">Your Referral Link</p>
                  <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-4 border border-white/10">
                    <code className="text-sm text-gray-300 flex-1 break-all font-mono">{generatedLink}</code>
                    <Button
                      size="sm"
                      onClick={copyToClipboard}
                      className={`flex-shrink-0 transition-all ${
                        copied 
                          ? "bg-emerald-600 hover:bg-emerald-600" 
                          : "bg-emerald-600 hover:bg-emerald-500"
                      }`}
                      data-testid="button-copy-link"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {!partnerName && (
                <div className="bg-gray-500/10 border border-gray-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-400">Enter your partner name to generate your unique referral link</p>
                </div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Generate", desc: "Create your unique referral link above" },
              { num: "2", title: "Share", desc: "Send to your WhatsApp, email, or social network" },
              { num: "3", title: "Earn", desc: "Get 20% commission on every successful booking" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-black text-emerald-500 mb-2">{step.num}</div>
                <h3 className="font-black uppercase text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 4-Tier Commission Structure */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-3">Revenue Share Structure</p>
            <h2 className="text-5xl font-black uppercase mb-4">Commission Tiers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">Revenue share reflects the value you bring. The closer you are to the tenant, the more you earn.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tier: "Strategic Partners",
                share: "35%",
                color: "border-emerald-500/50 bg-emerald-950/30",
                accentColor: "text-emerald-400",
                badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                who: ["Real estate brokerages", "Ejari typing centers", "Corporate relocation companies", "Building management"],
                why: "They replace marketing cost entirely and bring high-intent tenants directly.",
                cta: "Enquire as Strategic Partner",
                ctaHref: "/partners/join",
              },
              {
                tier: "Distribution Partners",
                share: "20–25%",
                color: "border-blue-500/40 bg-blue-950/20",
                accentColor: "text-blue-400",
                badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                who: ["Individual brokers", "Leasing agents", "Building staff", "Small relocation agents"],
                why: "They contribute localized lead generation through direct conversations with tenants.",
                cta: "Join as Distribution Partner",
                ctaHref: "/broker-partner",
              },
              {
                tier: "Influencers & Community",
                share: "10–15%",
                color: "border-purple-500/30 bg-purple-950/20",
                accentColor: "text-purple-400",
                badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                who: ["Social media influencers", "WhatsApp group admins", "Community leaders", "Dubai bloggers"],
                why: "They provide reach and trust. Lower conversion intent but high volume.",
                cta: "Join as Community Partner",
                ctaHref: "/partners/join",
              },
              {
                tier: "General Referrals",
                share: "5–10%",
                color: "border-slate-600/50 bg-slate-900/30",
                accentColor: "text-gray-400",
                badgeColor: "bg-slate-700/50 text-gray-300 border-slate-600/50",
                who: ["Any registered user", "Existing customers", "Personal network"],
                why: "Anyone can refer and earn. Simple, no commitment required.",
                cta: "Generate Your Link",
                ctaHref: "/partners",
              },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`border rounded-2xl p-7 space-y-5 ${tier.color}`}
                data-testid={`commission-tier-${i}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${tier.accentColor}`}>Tier {i + 1}</p>
                    <h3 className="text-xl font-black text-white uppercase leading-tight">{tier.tier}</h3>
                  </div>
                  <div className={`border rounded-xl px-4 py-2 text-center shrink-0 ${tier.badgeColor}`}>
                    <p className="text-2xl font-black">{tier.share}</p>
                    <p className="text-[10px] font-black uppercase tracking-wider opacity-70">Revenue Share</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {tier.who.map((w, j) => (
                    <div key={j} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                      <div className={`w-1.5 h-1.5 rounded-full ${tier.accentColor.replace("text-", "bg-")}`} />
                      {w}
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-gray-500 text-xs font-medium italic leading-relaxed">{tier.why}</p>
                </div>

                <Link href={tier.ctaHref}>
                  <button
                    className={`w-full text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${tier.badgeColor} hover:opacity-80`}
                    data-testid={`button-tier-cta-${i}`}
                  >
                    {tier.cta} →
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Benefits strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: TrendingUp, title: "Unlimited Earnings", desc: "No cap on referrals or commissions. The more you refer, the more you earn." },
              { icon: Users, title: "High Conversion", desc: "WhatsApp-native funnel converts at 30%+. Built for the way people actually communicate in Dubai." },
              { icon: Zap, title: "Instant Tracking", desc: "Real-time referral attribution via URL params stored in your browser. Every lead is traced back to you." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/20">
                    <benefit.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-white mb-1">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Commission Tracking & Tools Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-emerald-500/10 to-transparent border-t border-emerald-500/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-4 text-center">Transparency & Tools for Success</h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Real-time commission tracking and ready-to-use marketing templates to maximize your earning potential and confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Commission Tracking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-full">
                <Link href="/partner-program">
                  <Card className="bg-emerald-900/40 border-emerald-500/50 p-8 hover:border-emerald-500 transition-all h-full cursor-pointer block">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/30">
                        <BarChart3 className="h-6 w-6 text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-emerald-300">Commission Tracking</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">
                      See real-time earnings, conversion rates, and detailed partner economics. Track every referral and watch your commission grow.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-emerald-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Real-time referral tracking</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>AED 79.80 per successful booking</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Monthly payouts, zero hidden fees</span>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 font-black">
                      Explore Commission Program →
                    </Button>
                  </Card>
                </Link>
              </div>
            </motion.div>

            {/* Community Toolkit Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full">
                <Link href="/community-toolkit">
                  <Card className="bg-blue-900/40 border-blue-500/50 p-8 hover:border-blue-500 transition-all h-full cursor-pointer block">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/30">
                        <BookOpen className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-blue-300">Marketing Toolkit</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Copy-paste templates for WhatsApp, email, LinkedIn, and building groups. Start promoting immediately with tested messaging.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>WhatsApp & Telegram templates</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>LinkedIn & email messages</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>Pro tips for maximum conversions</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 font-black">
                      View Templates & Tips →
                    </Button>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Ecosystem Partners Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950 border-t border-purple-500/20">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 rounded-full px-4 py-1.5 mb-5">
              <Handshake className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-purple-400 font-black text-[10px] uppercase tracking-widest">Ecosystem Partnerships</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
              Your Brand. Their Move.<br />
              <span className="text-purple-400">Everyone Wins.</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-medium">
              DeliWer integrates into your existing client journey — relocation, property, logistics, or community — adding a seamless service layer your clients already need.
            </p>
          </motion.div>

          {/* Partner logos / social proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/60 border border-white/8 rounded-2xl p-6 mb-10"
          >
            <p className="text-center text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">Current Ecosystem Partners</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Capella Properties", service: "Real Estate Partner", icon: "🏢", tag: "Tenant Referrals", border: "border-green-500/30 hover:border-green-500/70", badge: "bg-green-500/10 text-green-400" },
                { name: "Global Logistics Group", service: "Logistics & Relocation", icon: "🚢", tag: "Arrival Activation", border: "border-orange-500/30 hover:border-orange-500/70", badge: "bg-orange-500/10 text-orange-400" },
                { name: "Alreza Group", service: "Business Setup", icon: "💼", tag: "Expat Onboarding", border: "border-blue-500/30 hover:border-blue-500/70", badge: "bg-blue-500/10 text-blue-400" },
                { name: "DeBacci Capital", service: "Referral Network", icon: "🤝", tag: "Commission Sharing", border: "border-yellow-500/30 hover:border-yellow-500/70", badge: "bg-yellow-500/10 text-yellow-400" },
                { name: "MyTablon", service: "Community Management", icon: "🏘️", tag: "Building Communities", border: "border-red-500/30 hover:border-red-500/70", badge: "bg-red-500/10 text-red-400" },
              ].map((partner, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`bg-slate-950/60 border ${partner.border} rounded-xl p-4 transition-all group cursor-default`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{partner.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-black text-white text-sm leading-tight mb-1 group-hover:text-white transition-colors">{partner.name}</h3>
                      <p className="text-gray-500 text-xs mb-2">{partner.service}</p>
                      <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${partner.badge}`}>{partner.tag}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Open slot CTA */}
              <motion.a
                href="https://wa.me/971523946311?text=Hi+DeliWer%2C+I%27m+interested+in+an+ecosystem+partnership"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
                className="bg-emerald-500/5 border-2 border-dashed border-emerald-500/40 hover:border-emerald-500/80 hover:bg-emerald-500/10 rounded-xl p-4 transition-all group flex items-center gap-3 cursor-pointer"
                data-testid="ecosystem-open-slot-cta"
              >
                <span className="text-2xl shrink-0">➕</span>
                <div>
                  <h3 className="font-black text-emerald-400 text-sm leading-tight mb-1 group-hover:text-emerald-300 transition-colors">Your Company</h3>
                  <p className="text-gray-500 text-xs mb-2">Open partnership slot</p>
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Apply via WhatsApp →</span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Partnership opportunity types — actionable */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-center text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">How Partnerships Work</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: "🏡",
                  title: "Tenant Referrals",
                  color: "border-purple-500/30 bg-purple-950/10",
                  titleColor: "text-purple-300",
                  desc: "Your client signed a lease. You introduce DeliWer. We handle Ejari, DEWA, and move-in. You earn AED 150–800+ per activation — zero extra work.",
                  earn: "AED 150–800+ per client",
                  earnColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
                  cta: "Start Referring →",
                  href: "#partners-register-form",
                },
                {
                  icon: "🚛",
                  title: "Logistics Integration",
                  color: "border-orange-500/30 bg-orange-950/10",
                  titleColor: "text-orange-300",
                  desc: "Coordinate home-ready timelines with your cargo and shipping schedule. We ensure the apartment is fully activated before your client's shipment arrives.",
                  earn: "Co-branded service offering",
                  earnColor: "bg-orange-500/10 text-orange-300 border-orange-500/20",
                  cta: "Discuss Integration →",
                  href: "https://wa.me/971523946311?text=Hi+DeliWer%2C+logistics+integration",
                },
                {
                  icon: "🏷️",
                  title: "White-Label Services",
                  color: "border-blue-500/30 bg-blue-950/10",
                  titleColor: "text-blue-300",
                  desc: "Offer DeliWer's full move-in coordination — including AquaCafe Welcome Kits — under your own brand. Strengthen your client experience without building ops.",
                  earn: "Custom revenue split",
                  earnColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
                  cta: "Explore White-Label →",
                  href: "https://wa.me/971523946311?text=Hi+DeliWer%2C+white-label+interest",
                },
              ].map((opp, i) => (
                <div key={i} className={`border ${opp.color} rounded-2xl p-6 space-y-4 flex flex-col`}>
                  <div className="text-3xl">{opp.icon}</div>
                  <div>
                    <h4 className={`font-black uppercase tracking-tight text-base mb-2 ${opp.titleColor}`}>{opp.title}</h4>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">{opp.desc}</p>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 self-start border rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${opp.earnColor}`}>
                    <DollarSign className="w-3 h-3 shrink-0" />
                    {opp.earn}
                  </div>
                  <div className="mt-auto pt-2">
                    <a href={opp.href} onClick={opp.href.startsWith('#') ? undefined : undefined}>
                      <Button size="sm" className={`w-full font-black text-xs uppercase tracking-widest h-9 ${opp.titleColor === 'text-purple-300' ? 'bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30' : opp.titleColor === 'text-orange-300' ? 'bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 border border-orange-500/30' : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30'}`} data-testid={`ecosystem-cta-${i}`}>
                        {opp.cta}
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* High-visibility CTA band */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-emerald-950/40 border border-purple-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Ready to Integrate?</h3>
              <p className="text-gray-400 font-medium text-sm max-w-md">
                Message us on WhatsApp and we'll build a custom partnership structure that fits your business model within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="https://wa.me/971523946311?text=Hi+DeliWer%2C+I%27m+interested+in+an+ecosystem+partnership" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-12 px-8 text-sm uppercase tracking-widest gap-2 whitespace-nowrap" data-testid="ecosystem-whatsapp-cta">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </Button>
              </a>
              <Link href="/relocation-alliance">
                <Button size="lg" variant="outline" className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-black h-12 px-8 text-sm uppercase tracking-widest whitespace-nowrap" data-testid="ecosystem-alliance-cta">
                  Alliance Program →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Partner Examples Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-emerald-500/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-black uppercase mb-4">Perfect for Every Network</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">Whether you're an influencer, broker, or community leader—earn with DeliWer</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Community Influencers", examples: ["WhatsApp Communities", "Telegram Groups", "LinkedIn Influencers"] },
              { title: "Real Estate Networks", examples: ["Real Estate Agents", "Relocation Consultants", "Property Managers"] },
              { title: "Building Partners", examples: ["Building Security", "Concierge Desks", "Tenant Groups"] },
              { title: "Corporate Partners", examples: ["HR Relocation Teams", "Corporate Movers", "Recruitment Agencies"] },
              { title: "Airbnb & Hosts", examples: ["Property Owners", "Airbnb Hosts", "Short-term Rentals"] },
              { title: "Content Creators", examples: ["Dubai Bloggers", "YouTube Channels", "Instagram Accounts"] }
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-black text-white mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.examples.map((ex, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Partner Registration Form */}
      <section id="partners-register-form" className="py-24 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Join the Network</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
              Earn Commission Referring Tenants Who Are Moving
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              Fill in your details and we'll activate your referral code and contact you on WhatsApp.
            </p>
          </div>

          <PartnerRegisterForm />
        </div>
      </section>
      {/* No Capital Growth + Network Effect */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 border-y border-emerald-500/10">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Strategic Positioning */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Strategic Principle</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              DeliWer Does Not<br /><span className="text-emerald-400">Acquire Customers Directly</span>
            </h2>
            <p className="text-gray-300 font-medium text-lg leading-relaxed">
              DeliWer acquires <strong className="text-white">partners who already own customer relationships.</strong><br />
              Partners are not selling DeliWer. Partners are enhancing their existing conversations and earning additional income.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Partners Bring Demand",
                desc: "Every strategic partner is a distribution channel. Brokerages, typing centers, building staff — they all interact with tenants before DeliWer ever does.",
                accent: "border-emerald-500/30 bg-emerald-950/20",
                textColor: "text-emerald-300",
              },
              {
                title: "DeliWer Coordinates Execution",
                desc: "Once a lead is received, DeliWer handles everything: Ejari, DEWA, movers, cleaning, water filter. Partners do zero operational work.",
                accent: "border-blue-500/30 bg-blue-950/20",
                textColor: "text-blue-300",
              },
              {
                title: "Revenue Is Shared Transparently",
                desc: "Partners see exactly what they earn per lead, how leads convert, and when payouts are processed. No black boxes. No hidden deductions.",
                accent: "border-purple-500/30 bg-purple-950/20",
                textColor: "text-purple-300",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`border ${pillar.accent} rounded-2xl p-7 space-y-3`}
              >
                <h3 className={`font-black uppercase tracking-tight text-lg ${pillar.textColor}`}>{pillar.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Network Effect */}
          <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-10 space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
                <Network className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Network Effect</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Growth That Compounds</h3>
              <p className="text-gray-400 font-medium text-sm max-w-xl mx-auto">As more partners join, the system doesn't just grow — it accelerates.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "More partners join", color: "bg-emerald-500/20 border-emerald-500/20", text: "text-emerald-300" },
                { label: "More leads are generated", color: "bg-blue-500/20 border-blue-500/20", text: "text-blue-300" },
                { label: "Better data is collected", color: "bg-purple-500/20 border-purple-500/20", text: "text-purple-300" },
                { label: "Higher conversions achieved", color: "bg-orange-500/20 border-orange-500/20", text: "text-orange-300" },
              ].map((effect, i) => (
                <div key={i} className={`border ${effect.color} rounded-xl p-4 text-center space-y-2`}>
                  <div className={`text-2xl font-black ${effect.text}`}>0{i + 1}</div>
                  <p className={`text-xs font-black uppercase tracking-tight ${effect.text}`}>{effect.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-xs font-medium">Growth comes from partner distribution, organic sharing, and referral incentives. Not paid ads.</p>
            </div>
          </div>

          {/* Motivation Loop */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">The Partner Motivation Loop</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                "Generate a Lead",
                "Lead Converts",
                "You Earn",
                "You See Earnings",
                "You Share More",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 text-emerald-300 font-black text-xs uppercase tracking-wide">{step}</div>
                  {i < 4 && <ArrowRight className="w-4 h-4 text-emerald-500/40 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-950 to-black border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4">
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-full px-6 py-2">
                <p className="text-emerald-300 font-black text-xs uppercase tracking-wider">Limited Slots</p>
              </div>
            </div>
            
            <h2 className="text-5xl font-black uppercase mb-6">Start Earning Today</h2>
            <p className="text-xl text-gray-300 font-medium mb-8 max-w-2xl mx-auto">
              Generate your unique referral link, share it with your network, and earn AED 79.80 per successful booking. Track everything in real-time.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/partners/join">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 px-12 text-lg" data-testid="button-final-become-partner">
                  Become a Partner
                </Button>
              </Link>
              <a href="https://wa.me/971523946311?text=Hi+DeliWer%2C+I%27d+like+to+learn+about+the+partner+program">
                <Button size="lg" variant="outline" className="border-emerald-500/50 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 font-black h-14 px-12 text-lg">
                  Have Questions?
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Join DeBacci Capital, EGLC, MyTablon, and other leading networks earning thousands monthly.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
