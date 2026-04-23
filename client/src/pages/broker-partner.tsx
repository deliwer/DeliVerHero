import { useState, useRef } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { DistressBrokerTrack } from "@/components/marketing/distress-broker-track";
import { PartnerSubNav } from "@/components/partner-subnav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2, MessageCircle, Copy, Check, ShieldCheck,
  Star, Building2, ChevronDown, ChevronUp, ChevronRight, QrCode, Zap,
  Home, ArrowRight, Users, TrendingUp, Clock, Send,
  Crown, Droplets, ChefHat, Network, Sparkles, Award,
  Target, Megaphone, GraduationCap, Coffee, Utensils,
  UserCheck, Layers, BadgeCheck,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp, logEvent } from "@/lib/referral";
import { useEffect } from "react";

const WA_NUMBER = "971523946311";

function openWA(msg: string) { openWhatsApp(msg); }

const WHO_CAN_JOIN = [
  { icon: Building2, label: "Real Estate Agents", desc: "Turn every lease signing into recurring income. You already know tenants — DeliWer closes the service loop.", highlight: true },
  { icon: Megaphone, label: "Influencers & Content Creators", desc: "Share the AquaCafe lifestyle. Earn per referral on every follower who joins your water wellness journey." },
  { icon: Users, label: "Corporate HR Teams", desc: "Help relocating employees settle in fast. Earn per company booking and team onboarding." },
  { icon: Home, label: "Building Concierges", desc: "You're the first contact for new residents. Your referral link earns you passive commission on every move-in." },
  { icon: Network, label: "Community Leaders", desc: "Build a downline team. Leaders earn override commissions across 3 levels of distributors." },
  { icon: GraduationCap, label: "Relocation Consultants", desc: "Add DeliWer to your service stack. We handle the operations; you earn the referral income." },
];

const LEVELS = [
  {
    tier: "Customer",
    code: "Level 0",
    refs: "Order for yourself first",
    income: "Personal benefits only",
    color: "from-slate-700/40 to-slate-800/20",
    border: "border-slate-600/30",
    badge: "bg-slate-700/40 text-slate-300 border-slate-500/30",
    icon: Coffee,
    desc: "Start by experiencing AquaCafe yourself. Get the AED 99 Starter Kit — includes ionic shower filter (AED 399 value) + Chill & Grill AED 99 dining voucher + 20% lifetime water discount.",
    cta: "Start as Customer",
    ctaLink: "/home-services",
  },
  {
    tier: "Independent Distributor",
    code: "Level 1",
    refs: "2 referred customers",
    income: "25% commission on personal sales",
    color: "from-emerald-700/30 to-emerald-800/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    icon: UserCheck,
    desc: "Refer just 2 customers to unlock your first distributor level. Start earning 25% on every sale you generate personally. Plus a 5% override on your referred customers.",
    cta: "Apply as Distributor",
    ctaLink: "#apply",
  },
  {
    tier: "Senior Distributor",
    code: "Level 2",
    refs: "10 active referred customers",
    income: "30% commission + 5% team override",
    color: "from-purple-700/30 to-purple-800/10",
    border: "border-purple-500/30",
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    icon: Layers,
    desc: "Grow your team to 10 active customers and unlock Senior status. Earn 30% on personal sales plus 5% override on your Independent Distributors' teams. Income range: AED 2,500–5,000/mo.",
    cta: "See Career Path",
    ctaLink: "/partners/career",
  },
  {
    tier: "Leader",
    code: "Level 3",
    refs: "20 active referred customers",
    income: "30% + 10% override on Senior teams",
    color: "from-amber-700/30 to-amber-800/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    icon: Crown,
    desc: "The top position. Lead a full team of Seniors and IDs. Earn 10% override on Senior teams, 5% on ID teams, plus full personal commission. Leadership income: AED 5,000–7,700+/mo.",
    cta: "See Leader Income",
    ctaLink: "/partners/career",
  },
];

const AQUACAFE_PERKS = [
  { icon: Droplets, label: "Ionic Shower Filter", value: "AED 399 FREE", color: "text-cyan-400" },
  { icon: Utensils, label: "Chill & Grill Voucher", value: "AED 99 dining credit", color: "text-orange-400" },
  { icon: TrendingUp, label: "Lifetime Water Discount", value: "20% off forever", color: "text-emerald-400" },
  { icon: Award, label: "Planet Hero Points", value: "500 pts on activation", color: "text-amber-400" },
];

const SCRIPTS = [
  {
    title: "After Property Viewing",
    scenario: "Send after the viewing when client is interested",
    script: `Hi [Tenant Name], great speaking with you today! \u{1F3E0}

If this is the one, here's how to sort everything fast:

DeliWer handles Ejari, DEWA, movers and setup in one place.

[YOUR REFERRAL LINK]

They'll contact you directly on WhatsApp. Makes the whole process stress-free.`,
  },
  {
    title: "After Lease Signing",
    scenario: "Send immediately after tenant signs the tenancy contract",
    script: `Hi [Tenant Name], congratulations on your new home! \u{1F389}

One thing I always recommend — DeliWer handles everything you need after getting your keys: Ejari, DEWA setup, movers, and cleaning.

Here's the link — they'll contact you directly:

[YOUR REFERRAL LINK]

They respond fast on WhatsApp. Makes the whole move-in stress-free.`,
  },
  {
    title: "AquaCafe Introduction",
    scenario: "Introduce your settled tenant to water wellness + Chill & Grill",
    script: `Hi [Tenant Name], now that you're settled in — here's something I recommend to all my clients in Dubai:

AquaCafe by DeliWer. AED 99 for an ionic shower filter + Chill & Grill dining voucher + 20% lifetime water discount.

It's the starter deal most expats miss: [YOUR REFERRAL LINK]

Worth it for the Chill & Grill voucher alone honestly!`,
  },
  {
    title: "WhatsApp Outreach (Broker to Broker)",
    scenario: "For brokers inviting other brokers into the network",
    script: `Hi [Name], quick one — we help your tenants complete move-in (Ejari, movers, setup) in one flow.

You close faster + earn per client.

Want your referral link? \u2192 [YOUR REFERRAL LINK]`,
  },
];

const TRUST = [
  { icon: Users, label: "Serving tenants across Dubai" },
  { icon: ShieldCheck, label: "Partner network execution" },
  { icon: Clock, label: "Fast response via WhatsApp" },
  { icon: Star, label: "RERA Trustee Centre" },
];

const PARTNER_TYPES = [
  "Real Estate Agent",
  "Relocation Company",
  "Property Manager",
  "Influencer / Content Creator",
  "Corporate HR Team",
  "Building Concierge",
  "Community Leader",
  "Other",
];

function cleanName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function QRCodeDisplay({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url || !canvasRef.current) return;
    import("qrcode").then((QRCode) => {
      QRCode.toCanvas(canvasRef.current!, url, { width: 160, margin: 2, color: { dark: "#a855f7", light: "#0f172a" } }, (err) => {
        if (!err) setReady(true);
      });
    }).catch(() => {});
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className={`rounded-xl border border-purple-500/30 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`} style={{ width: 160, height: 160 }} />
      {!ready && <div className="w-40 h-40 rounded-xl border border-purple-500/30 bg-slate-800 animate-pulse" />}
      <p className="text-[10px] text-gray-600 font-medium">QR Code</p>
    </div>
  );
}

export default function BrokerPartnerPage() {
  const [partnerName, setPartnerName] = useState("");
  const [generatedRef, setGeneratedRef] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appForm, setAppForm] = useState({ fullName: "", companyName: "", partnerType: "", email: "", phone: "", website: "" });
  const generatorRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  function handleGenerate() {
    if (!partnerName.trim()) {
      toast({ title: "Enter your name", description: "Type your name or company to generate your unique link." });
      return;
    }
    const ref = cleanName(partnerName);
    const link = `https://www.deliwer.com/move-in?ref=${ref}`;
    setGeneratedRef(ref);
    setGeneratedLink(link);
    setShowQR(true);
    logEvent({ ref, page: "/brokers", timestamp: new Date().toISOString(), action: "link_generated" });
    toast({ title: "Your referral link is ready!", description: "Copy it and start sharing with clients." });
  }

  function handleKeyDown(e: React.KeyboardEvent) { if (e.key === "Enter") handleGenerate(); }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share this with your tenants to earn commission." });
    setTimeout(() => setCopied(false), 2500);
  }

  function shareOnWhatsApp() {
    const msg = `I help my clients complete their move-in (Ejari, movers, setup) in one place. Start here: ${generatedLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    logEvent({ ref: generatedRef, page: "/brokers", timestamp: new Date().toISOString(), action: "whatsapp_click" });
  }

  function handleJoinWhatsApp() {
    openWA(buildWhatsAppMessage({
      intro: "Hi DeliWer, I'm a real estate broker interested in the partner referral program.",
      fields: { Name: appForm.fullName || partnerName || undefined },
    }));
  }

  async function copyScript(idx: number, text: string) {
    const link = generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE";
    await navigator.clipboard.writeText(text.replace(/\[YOUR REFERRAL LINK\]/g, link));
    setCopiedScript(idx);
    toast({ title: "Script copied!", description: "Replace [Tenant Name] and paste into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  }

  function scrollToGenerator() { generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }
  function scrollToApply() { applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  async function handleAppSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!appForm.fullName || !appForm.email || !appForm.partnerType) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    const ref = cleanName(appForm.companyName || appForm.fullName);
    const link = `https://deliwer.com/?ref=${ref}`;
    try {
      await fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateCode: ref, event: "partner_signup", ...appForm }),
      });
    } catch {}
    setGeneratedLink(link);
    setGeneratedRef(ref);
    setSubmitted(true);
    toast({ title: "Welcome to the Partner Network!", description: "Your referral link is ready." });
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 md:pb-0">
      <SEOMeta
        title="Join as a Distributor | DeliWer Partner Program Dubai"
        description="Real estate brokers, influencers, and community leaders: join DeliWer as a distributor. Start with the AquaCafe AED 99 deal, refer 2 customers, and climb to AED 7,700+/mo as a Leader."
      />
      <Navigation />
      <PartnerSubNav />

      {/* ── HERO (promoted to top) ────────────────────────── */}
      <section id="hero" className="relative pt-40 md:pt-48 pb-20 md:pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&q=80" alt="Dubai real estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/97 via-purple-950/75 to-slate-950/95" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-7">
          <div className="absolute inset-x-0 -inset-y-12 -z-10 bg-slate-950/70 blur-2xl rounded-3xl pointer-events-none" />
          <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
            DeliWer Distributor Program
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase drop-shadow-2xl">
            Build Your Income<br />
            <span className="text-purple-400">One Referral at a Time.</span>
          </h1>
          <p className="text-lg text-gray-200 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-lg bg-slate-950/40 rounded-2xl px-5 py-3 backdrop-blur-sm border border-white/5">
            Start as a customer with the AED 99 AquaCafe deal. Refer 2 friends to become an Independent Distributor. Scale to Leader at 20 referrals and earn AED 7,700+/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-testid="button-broker-apply-hero" size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-lg shadow-2xl" onClick={scrollToApply}>
              <Zap className="w-5 h-5 mr-2" /> Apply Now — Free
            </Button>
            <Link href="/home-services">
              <Button data-testid="button-broker-aquacafe-hero" size="lg" variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 font-black rounded-2xl px-8 h-14 text-base">
                <Droplets className="w-5 h-5 mr-2" /> Start with AquaCafe AED 99
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2" data-testid="hero-trust-strip">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIFIED BROKER SUB-NAV (anchor jumps + career path link) ── */}
      <div className="bg-slate-900/95 backdrop-blur border-y border-emerald-500/15" data-testid="broker-anchor-nav">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex gap-1 flex-1">
            {[
              { id: "who", label: "Who Can Join" },
              { id: "aquacafe", label: "AquaCafe Gateway" },
              { id: "ladder", label: "4-Level Ladder" },
              { id: "earn", label: "Earnings" },
              { id: "apply", label: "Apply" },
              { id: "scripts", label: "Scripts" },
              { id: "damac", label: "Career Path · Real Estate" },
              { id: "funnel", label: "Career Path · Home Services" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-4 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-gray-400 hover:text-emerald-400 border-b-2 border-transparent hover:border-emerald-500 transition-all"
                data-testid={`anchor-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <Link href="/partners/career" className="shrink-0">
            <Button data-testid="button-broker-career-path-banner" size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl text-[10px] uppercase tracking-widest h-8 px-3 whitespace-nowrap">
              Full Career Path →
            </Button>
          </Link>
        </div>
      </div>

      {/* ── WHO CAN JOIN ─────────────────────────────────── */}
      <section id="who" className="py-16 px-4 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Who Can Join</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-3">Built for Dubai's Connector Economy</h2>
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            If you meet people who move to Dubai, rent apartments, or care about wellness — you already have a network. We give it an income engine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO_CAN_JOIN.map((item) => (
              <div
                key={item.label}
                data-testid={`who-join-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`rounded-2xl border p-5 flex gap-4 ${item.highlight ? "border-purple-500/40 bg-purple-950/30" : "border-white/8 bg-slate-900"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.highlight ? "bg-purple-500/20 border border-purple-500/30" : "bg-slate-800 border border-white/10"}`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? "text-purple-400" : "text-gray-400"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-black text-white text-sm uppercase tracking-tight">{item.label}</p>
                    {item.highlight && <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[9px] px-1.5 py-0">Main Target</Badge>}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AQUACAFE GATEWAY ─────────────────────────────── */}
      <section id="aquacafe" className="py-16 px-4 border-y border-cyan-500/15 bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Step 1: The Gateway Deal</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
                Start as a Customer First.<br />
                <span className="text-cyan-400">The AquaCafe AED 99 Deal.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Before you distribute, you experience. The AED 99 AquaCafe Starter Kit is your entry point into the DeliWer ecosystem — and the deal you'll recommend to every tenant, friend, and follower.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {AQUACAFE_PERKS.map((p) => (
                  <div key={p.label} className="flex items-center gap-3 bg-slate-900 border border-white/8 rounded-xl p-3">
                    <p.icon className={`w-5 h-5 shrink-0 ${p.color}`} />
                    <div>
                      <p className="text-white text-xs font-black">{p.label}</p>
                      <p className="text-gray-500 text-[10px]">{p.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-orange-950/30 border border-orange-500/25 rounded-2xl p-4 flex gap-3 items-start">
                <Utensils className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-orange-300 font-black text-sm">Chill &amp; Grill AED 99 Dining Voucher</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Every AquaCafe member gets an AED 99 Chill &amp; Grill restaurant voucher — valid for any friend referral. When your referred customer joins, they get the same deal. That's your conversation starter.
                  </p>
                </div>
              </div>
              <Link href="/home-services">
                <Button data-testid="button-aquacafe-gateway-cta" size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl h-13 px-8 shadow-xl shadow-cyan-900/40">
                  <Droplets className="w-4 h-4 mr-2" /> Get the AED 99 Starter Kit
                </Button>
              </Link>
            </div>
            <div className="shrink-0 flex flex-col gap-3 text-center lg:text-left">
              <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 space-y-3">
                <div className="text-6xl font-black text-cyan-400">AED 99</div>
                <div className="text-white font-black text-lg uppercase tracking-tight">AquaCafe Starter Kit</div>
                <div className="space-y-2 text-left mt-4">
                  {["Ionic Shower Filter (AED 399 value)", "Chill & Grill AED 99 voucher", "20% lifetime water discount", "500 Planet Hero activation points", "Distributor eligibility unlocked"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-[10px] text-gray-600 font-semibold uppercase tracking-widest">One-time activation · No monthly fee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-LEVEL DISTRIBUTOR LADDER ───────────────────── */}
      <section id="ladder" className="py-16 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Distribution Ladder</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-3">Your Path from Customer to Leader</h2>
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Each level unlocks higher commissions and team override income. You climb by helping others climb.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LEVELS.map((lvl, i) => (
              <div key={lvl.tier} data-testid={`level-card-${i}`} className={`rounded-2xl border ${lvl.border} bg-gradient-to-br ${lvl.color} p-6 space-y-4`}>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`${lvl.badge} border text-[10px] font-black uppercase tracking-widest mb-2`}>{lvl.code}</Badge>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">{lvl.tier}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-semibold">{lvl.refs}</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <lvl.icon className="w-5 h-5 text-white/60" />
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl px-3 py-2 text-xs text-gray-300 font-semibold border border-white/8">
                  {lvl.income}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{lvl.desc}</p>
                {lvl.ctaLink === "#apply" ? (
                  <Button size="sm" onClick={scrollToApply} data-testid={`button-level-cta-${i}`} className="bg-white/10 hover:bg-white/15 text-white font-black rounded-xl h-9 text-xs border border-white/15 w-full">
                    {lvl.cta} <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                ) : (
                  <Link href={lvl.ctaLink}>
                    <Button size="sm" data-testid={`button-level-cta-${i}`} className="bg-white/10 hover:bg-white/15 text-white font-black rounded-xl h-9 text-xs border border-white/15 w-full">
                      {lvl.cta} <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/partners/career">
              <Button data-testid="button-full-career-path" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-2xl px-8 h-12">
                <Crown className="w-4 h-4 mr-2" /> Full Career Path
              </Button>
            </Link>
            <Link href="/partners">
              <Button data-testid="button-unified-partner-hub" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-8 h-12">
                <ArrowRight className="w-4 h-4 mr-2" /> Partner Hub & Join Form
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP BRIDGE ─────────────────────────────── */}
      <section className="py-10 px-4 bg-gradient-to-r from-cyan-950/30 via-slate-900/80 to-cyan-950/30 border-y border-cyan-500/15">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-600" />
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-1">Next Step in Your Career Path</p>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">Broker Partner → AquaCafe Distributor</h3>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed max-w-xl">
              Once your tenants are settled, introduce them to the AED 99 AquaCafe Starter Kit. You earn a bonus on every activation — and when they refer friends, you earn overrides.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link href="/home-services">
              <Button data-testid="button-broker-next-step-aquacafe" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl h-11 px-6">
                <Droplets className="w-4 h-4 mr-2" /> AquaCafe AED 99
              </Button>
            </Link>
            <Link href="/partners">
              <Button data-testid="button-broker-next-step-career" variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800 font-black rounded-2xl h-11 px-6">
                Full Career Path
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EARN / GAMIFICATION CTA ──────────────────────── */}
      <section id="earn" className="py-12 px-4 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-amber-950/40 border-b border-amber-500/15">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0 mx-auto md:mx-0">
            <Award className="w-7 h-7 text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-1">Planet Heroes Gamification</p>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">Every Referral Earns Points.</h3>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed max-w-xl">
              Bronze to Elite — track your Planet Hero rank, claim rewards, and see your earning leaderboard in real time. Points convert to vouchers, upgrades, and team bonuses.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/earn">
              <Button data-testid="button-earn-gamification-cta" size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl h-12 px-8 shadow-xl shadow-amber-900/40">
                <TrendingUp className="w-4 h-4 mr-2" /> See Your Earnings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK GENERATOR ──────────────────────── */}
      <section ref={generatorRef} className="py-16 px-4 bg-slate-900/50 border-b border-white/5">
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400">Instant Link Generator</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center">Get Your Referral Link</h2>
          <div className="flex gap-3">
            <Input
              data-testid="input-broker-name"
              value={partnerName}
              onChange={e => setPartnerName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your name (e.g. Ahmed Al Mansoori)"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12 flex-1"
            />
            <Button data-testid="button-broker-generate" size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-12 px-6 shrink-0" onClick={handleGenerate}>
              Generate
            </Button>
          </div>
          {generatedLink ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1 text-sm text-purple-300 font-mono break-all">{generatedLink}</div>
                <Button data-testid="button-broker-copy" size="sm" className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg shrink-0" onClick={copyLink}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button data-testid="button-broker-copy-link" className="bg-slate-700 hover:bg-slate-600 text-white font-black rounded-xl h-11" onClick={copyLink}>
                  {copied ? <><Check className="w-4 h-4 mr-2" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy Link</>}
                </Button>
                <Button data-testid="button-broker-share-whatsapp" className="bg-green-600 hover:bg-green-500 text-white font-black rounded-xl h-11" onClick={shareOnWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Share on WhatsApp
                </Button>
              </div>
              <button data-testid="button-broker-toggle-qr" className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-xs font-semibold transition-colors mx-auto" onClick={() => setShowQR(v => !v)}>
                <QrCode className="w-3.5 h-3.5" />
                {showQR ? "Hide QR Code" : "Show QR Code"}
                {showQR ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showQR && (
                <div className="flex justify-center py-2 animate-in fade-in duration-200">
                  <QRCodeDisplay url={generatedLink} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-600">
              <QrCode className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Enter your name above to generate your unique referral link</p>
            </div>
          )}
        </div>
      </section>

      {/* ── COPY-PASTE SCRIPTS ────────────────────────────── */}
      <section id="scripts" className="py-16 px-4 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-xl mx-auto space-y-4">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Copy-Paste Scripts</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-6">Ready-to-Send Messages</h2>
          {SCRIPTS.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-colors">
              <button
                data-testid={`button-broker-script-toggle-${i}`}
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedScript(expandedScript === i ? null : i)}
              >
                <div>
                  <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{s.scenario}</div>
                </div>
                {expandedScript === i ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
              </button>
              {expandedScript === i && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                    <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                      {s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE")}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <Button data-testid={`button-broker-copy-script-${i}`} size="sm" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-4 h-8 text-xs" onClick={() => copyScript(i, s.script)}>
                      {copiedScript === i ? <><Check className="w-3 h-3 mr-1" />Copied!</> : <><Copy className="w-3 h-3 mr-1" />Copy Script</>}
                    </Button>
                    <Button data-testid={`button-broker-send-script-wa-${i}`} size="sm" className="bg-green-700 hover:bg-green-600 text-white font-black rounded-xl px-4 h-8 text-xs" onClick={() => {
                      const msg = s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE").replace(/\[Tenant Name\]/g, "");
                      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                    }}>
                      <MessageCircle className="w-3 h-3 mr-1" /> Send on WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── REALTY INNER CIRCLE · NDA-GATED INTELLIGENCE ── */}
      <section id="realty-inner-circle" className="relative py-20 px-4 border-b border-amber-500/30 bg-gradient-to-b from-slate-950 via-amber-950/15 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.08),transparent_55%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 rounded-full px-5 py-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">DeliWer Realty · Inner Circle Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
              Where Inventory Meets <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">Trusted Closers.</span>
            </h2>
            <p className="text-gray-300 font-medium max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              The broker funnel now extends into <Link href="/realestate" className="text-amber-300 underline decoration-amber-500/40 underline-offset-4">DeliWer Realty</Link> — a closed,
              capped-seat network where exclusive members receive vetted rental and distress-sale intelligence under
              <strong className="text-white"> NCA + NDA + Non-Compete</strong>, then close deals and share commissions.
            </p>
          </div>

          {/* 4-up benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Building2, title: "Reserved Developer & Community Pool", desc: "Lock specific developers (Emaar, DAMAC, Nakheel, Sobha, Aldar, Meraas) and communities (Downtown, Marina, JVC, Dubai Hills, Palm). Capped seats per area." },
              { icon: Sparkles, title: "Exclusive Inventory Intelligence", desc: "Daily WhatsApp drops on rental demand by community + distress sale alerts — sourced and vetted before they hit any portal." },
              { icon: Layers, title: "Co-Branded Closing Dossier", desc: "Use the DeliWer Realty intelligence pack in client meetings: demand signal, comparable rents, move-in stack, AquaCafe perks — all in one." },
              { icon: TrendingUp, title: "50/50 Commission Share + Move-In Override", desc: "Standard 50/50 split on every routed lease & sale, plus the full AED 300–800 move-in service override on top. Paid monthly with statement." },
            ].map((b, i) => (
              <div
                key={b.title}
                data-testid={`broker-realty-benefit-${i}`}
                className="bg-slate-900/70 border border-amber-500/25 rounded-2xl p-6 hover:border-amber-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="text-base md:text-lg font-black text-white mb-2 uppercase tracking-tight">{b.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* NDA architecture */}
          <div className="bg-slate-950/80 border border-amber-500/40 rounded-3xl p-7 md:p-9" data-testid="broker-realty-nda">
            <div className="text-center mb-7">
              <Badge className="bg-emerald-500/15 border-emerald-500/30 text-emerald-300 mb-3 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3 mr-1.5" /> Trust Architecture · Closed by Design
              </Badge>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                Three Short Agreements · Same-Day Onboarding
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "NCA · Non-Circumvention", desc: "No bypassing DeliWer Realty on any tenant, buyer, landlord or developer routed through the network." },
                { title: "NDA · Confidentiality", desc: "Inventory dossiers, pricing intelligence and demand signals stay inside the network. Sharing externally = revocation." },
                { title: "Non-Compete · Reserved Areas", desc: "While active, you don't source or close inventory in your reserved community pool through competing platforms." },
              ].map((t, i) => (
                <div
                  key={t.title}
                  data-testid={`broker-realty-nda-term-${i}`}
                  className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-5"
                >
                  <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{t.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Apply CTA strip */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-2">
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%20Realty%20%E2%80%94%20I%E2%80%99m%20a%20RERA%20broker%20applying%20to%20the%20Inner%20Circle%20Track.%20Please%20share%20the%20NCA%20%2F%20NDA%20%2F%20Non-Compete%20to%20get%20started."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                data-testid="button-broker-realty-apply"
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-black h-14 px-10 text-base rounded-2xl shadow-2xl shadow-amber-900/40"
              >
                <Crown className="w-5 h-5 mr-2" />
                Apply for Inner Circle · Sign NDA
              </Button>
            </a>
            <Link href="/realestate">
              <Button
                data-testid="button-broker-realty-learn"
                size="lg"
                variant="outline"
                className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black h-14 px-8 text-base rounded-2xl"
              >
                <Building2 className="w-4 h-4 mr-2" />
                See the Realty Intelligence Engine
              </Button>
            </Link>
          </div>
          <p className="text-center text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
            Active RERA brokers only · Capped seats per community · Same-day NDA onboarding
          </p>
        </div>
      </section>

      {/* ── PARTNER APPLICATION FORM ─────────────────────── */}
      <section ref={applyRef} id="apply" className="py-16 px-4 border-b border-white/5 bg-slate-900/40">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <BadgeCheck className="w-3.5 h-3.5" /> Partner Application
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Apply as a Distributor</h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                  Fill in your details. We'll generate your referral link instantly and a DeliWer team member will contact you on WhatsApp within 24 hours.
                </p>
              </div>
              <Card className="bg-white/5 border-white/10 rounded-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleAppSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Full Name *</Label>
                        <Input data-testid="input-full-name" placeholder="e.g. Sarah Al Maktoum" value={appForm.fullName} onChange={e => setAppForm(p => ({ ...p, fullName: e.target.value }))} className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Company Name</Label>
                        <Input data-testid="input-company-name" placeholder="e.g. Emaar Properties" value={appForm.companyName} onChange={e => setAppForm(p => ({ ...p, companyName: e.target.value }))} className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Partner Type *</Label>
                      <Select value={appForm.partnerType} onValueChange={v => setAppForm(p => ({ ...p, partnerType: v }))}>
                        <SelectTrigger className="bg-slate-900 border-white/15 text-white h-11" data-testid="select-partner-type">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/15 text-white">
                          {PARTNER_TYPES.map(t => <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Email *</Label>
                        <Input data-testid="input-email" type="email" placeholder="you@example.com" value={appForm.email} onChange={e => setAppForm(p => ({ ...p, email: e.target.value }))} className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Phone</Label>
                        <Input data-testid="input-phone" placeholder="+971 50 000 0000" value={appForm.phone} onChange={e => setAppForm(p => ({ ...p, phone: e.target.value }))} className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Instagram / LinkedIn / Website</Label>
                      <Input data-testid="input-website" placeholder="https://yoursite.com or @yourhandle" value={appForm.website} onChange={e => setAppForm(p => ({ ...p, website: e.target.value }))} className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11" />
                    </div>
                    <Button type="submit" data-testid="button-submit-partner" size="lg" className="w-full h-13 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20 text-sm">
                      Generate My Referral Link <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                      No fees · No minimum referrals · Monthly payouts
                    </p>
                  </form>
                </CardContent>
              </Card>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button data-testid="button-broker-join-wa" variant="outline" className="border-white/15 text-gray-300 hover:bg-white/5 font-black rounded-xl h-11 text-xs uppercase tracking-widest" onClick={handleJoinWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Prefer WhatsApp? Join directly
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-slate-950" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Welcome to the Partner Network!</h2>
              <p className="text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
                Your referral link is active. A DeliWer team member will reach out on WhatsApp within 24 hours to onboard you personally.
              </p>
              <Card className="bg-emerald-950/40 border-emerald-500/30 rounded-2xl">
                <CardContent className="p-8 space-y-5">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Referral Link</p>
                  <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-4">
                    <code className="flex-1 text-emerald-300 text-sm font-mono break-all text-left" data-testid="text-generated-link">{generatedLink}</code>
                    <Button onClick={copyLink} size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0" data-testid="button-copy-generated-link">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/home-services" className="flex-1">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl h-11 text-xs">
                        <Droplets className="w-4 h-4 mr-2" /> Activate AquaCafe AED 99
                      </Button>
                    </Link>
                    <Link href="/earn" className="flex-1">
                      <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-xl h-11 text-xs">
                        <Award className="w-4 h-4 mr-2" /> View Your Earnings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* ── CAREER PATH · TRACK B → HOME SERVICES (AquaCafe / Kangen) ── */}
      <section id="funnel" className="py-16 px-4 border-b border-white/5 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-black uppercase tracking-widest">Career Path · Track B · Home Services</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            Brokers → <span className="text-cyan-400">Home Services Track</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Every tenant you settle becomes an AquaCafe prospect. The AED 99 deal is your hook — Chill &amp; Grill dining voucher, ionic shower filter, water wellness. Once they're in, they refer their friends. Your override income grows automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home-services">
              <Button data-testid="button-aquacafe-alliance-funnel" size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl h-14 px-10 shadow-xl shadow-cyan-900/40">
                <Droplets className="w-5 h-5 mr-2" /> Explore Home Services
              </Button>
            </Link>
            <Link href="/partners/career">
              <Button data-testid="button-career-funnel" size="lg" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-2xl h-14 px-10">
                <Crown className="w-5 h-5 mr-2" /> Full Career Income Path
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAREER PATH · TRACK A → REAL ESTATE / DAMAC DISTRESS ── */}
      <section id="damac" className="py-16 px-4 border-b border-white/5 bg-gradient-to-br from-slate-950 via-amber-950/15 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Career Path · Choose Your Track (or Take Both)</span>
          </div>
          <p className="text-gray-500 text-xs max-w-xl mx-auto leading-relaxed">
            Every DeliWer broker plugs into the same Career Path. Pick the track that matches your network — or run both in parallel for stacked income.
          </p>
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Career Path · Track A · Real Estate</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            Brokers → <span className="text-amber-400">Real Estate Track</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Already closing leases or sales? Plug straight into our distress-driven DAMAC inventory. Higher per-deal commissions on below-market units priced for fast movement. Run this alongside the Home Services track for stacked income.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <DistressBrokerTrack />
        </div>
      </section>

      {/* ── CAREER PATH BANNER ─────────────────────────────── */}
      <section className="py-10 px-4 bg-gradient-to-r from-amber-950/50 via-slate-900/80 to-amber-950/50 border-b border-amber-500/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 rounded-full px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Breakthrough Partner Career</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-tight">
              Turn Every Tenant Into<br className="hidden md:block" /> A Long-Term Income Stream.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Go beyond the referral fee. Introduce your settled tenants to the AquaCafe deal, Kangen Water home setup, and Planet Heroes network — then earn override commissions as they build their own teams. Leader income: AED 5,000+/month.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-gray-500 font-semibold pt-1 justify-center md:justify-start">
              {[
                { icon: Droplets, label: "AquaCafe AED 99 deal for tenants" },
                { icon: Utensils, label: "Chill & Grill dining perks" },
                { icon: Crown, label: "Leader: AED 5,000+/mo" },
                { icon: Network, label: "Kangen Water distributor training" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="w-3 h-3 text-amber-400 shrink-0" /> {label}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <Link href="/partners/career" data-testid="button-broker-career-path-cta">
              <Button size="lg" className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl h-13 px-8 text-sm shadow-xl shadow-amber-900/40">
                <Crown className="w-4 h-4 mr-2" /> See the Full Career Path
              </Button>
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20DeliWer%2C%20I%20want%20to%20learn%20about%20building%20a%20team%20through%20the%20career%20path%20program.`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" data-testid="button-broker-career-wa" className="w-full md:w-auto border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-2xl h-11 px-7 text-sm">
                <MessageCircle className="w-4 h-4 mr-2" /> Ask on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
            <ArrowRight className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Ready to Start?</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">Apply above, or jump straight into the AquaCafe deal as your first move as a distributor.</p>
          <div className="flex flex-col gap-3">
            <Button data-testid="button-broker-apply-final" size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-2xl w-full" onClick={scrollToApply}>
              <Zap className="w-5 h-5 mr-2" /> Apply as a Distributor
            </Button>
            <Link href="/home-services">
              <Button data-testid="button-broker-aquacafe-final" size="lg" className="bg-cyan-700 hover:bg-cyan-600 text-white font-black rounded-2xl px-10 h-12 text-sm w-full">
                <Droplets className="w-4 h-4 mr-2" /> Start with AquaCafe AED 99
              </Button>
            </Link>
            <Button data-testid="button-broker-final-wa" size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 font-black rounded-2xl px-10 h-12 text-sm w-full" onClick={handleJoinWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" /> Join via WhatsApp
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Icon className="w-3 h-3 text-purple-400 shrink-0" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE BAR ─────────────────────────────── */}
      <div data-testid="sticky-mobile-bar" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <Button data-testid="button-sticky-apply" size="lg" className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-12 text-sm shadow-2xl" onClick={scrollToApply}>
          <Zap className="w-4 h-4 mr-2" /> Apply Now
        </Button>
        <Link href="/home-services" className="flex-1">
          <Button size="lg" className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-black rounded-xl h-12 text-sm">
            <Droplets className="w-4 h-4 mr-2" /> AED 99 Deal
          </Button>
        </Link>
      </div>
    </div>
  );
}
