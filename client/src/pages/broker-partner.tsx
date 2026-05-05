import { useState, useRef, useEffect } from "react";
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
  Star, Building2, ChevronDown, ChevronUp, QrCode, Zap,
  Home, ArrowRight, Users, TrendingUp, Clock,
  Crown, Sparkles, Award, Layers, BadgeCheck, KeyRound,
  Handshake, FileSignature, Lock, BarChart2, MousePointer, Wallet,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp, logEvent } from "@/lib/referral";

const WA_NUMBER = "971523946311";
function openWA(msg: string) { openWhatsApp(msg); }

const CAREER_STEPS = [
  {
    step: "01",
    title: "Get Your Free Link",
    desc: "Enter your name, generate your unique referral link in seconds. No fees, no commitment.",
    color: "emerald",
    icon: Zap,
    locked: false,
  },
  {
    step: "02",
    title: "Refer Clients & Earn",
    desc: "Share your link after viewings or lease signings. Earn AED 300–800 per move-in you refer.",
    color: "purple",
    icon: TrendingUp,
    locked: false,
  },
  {
    step: "03",
    title: "Join the Inner Circle",
    desc: "Unlock deal flow, performance tracking, 50/50 commission splits and exclusive DAMAC inventory.",
    color: "amber",
    icon: Crown,
    locked: true,
  },
];

const EARN_HIGHLIGHTS = [
  { icon: Award, label: "Move-In Override", value: "AED 300–800", sub: "per closed lease referral" },
  { icon: TrendingUp, label: "Lease & Sale Splits", value: "50 / 50", sub: "on all routed deals" },
  { icon: Building2, label: "Distress Inventory", value: "Below Market", sub: "DAMAC secondary units" },
  { icon: ShieldCheck, label: "Monthly Payouts", value: "Tracked", sub: "statement per deal" },
];

const BROKER_TYPES = [
  { icon: Building2, label: "RERA-Licensed Brokers", desc: "Plug your pipeline into a vetted referral network." },
  { icon: KeyRound, label: "Resale & Distress Specialists", desc: "Exclusive below-market DAMAC inventory under NDA." },
  { icon: Home, label: "Rental Agents & PMs", desc: "Turn every lease into recurring referral income." },
];

const SCRIPTS = [
  {
    title: "After Property Viewing",
    scenario: "Send after the viewing when the client is interested",
    script: `Hi [Client Name], great speaking with you today! 🏠

If this is the one, here's how to sort everything fast:

DeliWer handles Ejari, DEWA, movers and setup in one place — and I get notified the moment they're in.

[YOUR REFERRAL LINK]

They'll contact you directly on WhatsApp. Makes the whole process stress-free.`,
  },
  {
    title: "After Lease Signing",
    scenario: "Send immediately after the tenancy contract is signed",
    script: `Hi [Tenant Name], congratulations on your new home! 🎉

One thing I always recommend — DeliWer handles everything you need after getting your keys: Ejari, DEWA setup, movers, and cleaning.

Here's the link — they'll contact you directly:

[YOUR REFERRAL LINK]

They respond fast on WhatsApp.`,
  },
  {
    title: "Secondary Market / Distress Sale",
    scenario: "Pitch a buyer on a below-market DAMAC distress unit",
    script: `Hi [Buyer Name], I have access to a vetted off-market DAMAC distress unit that fits your budget — priced below current market for fast movement.

I can share the dossier (price, comparables, demand signal) once we're aligned on the area.

Reply YES and I'll send it across today.

[YOUR REFERRAL LINK]`,
  },
  {
    title: "Broker-to-Broker Outreach",
    scenario: "Invite another RERA broker into the network",
    script: `Hi [Name], quick one — DeliWer Realty gives RERA brokers reserved community pools and below-market DAMAC distress inventory under NDA. 50/50 splits on routed leases & sales, plus the move-in service override on top.

Want to look at the inner-circle deck? → [YOUR REFERRAL LINK]`,
  },
];

const PARTNER_TYPES = [
  "RERA Real Estate Broker",
  "Rental Agent",
  "Secondary Market / Resale Agent",
  "Property Manager",
  "Brokerage Team Lead",
  "Independent Agent",
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
      <p className="text-[10px] text-gray-600 font-medium">Scan to share</p>
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
  const [appForm, setAppForm] = useState({ fullName: "", companyName: "", partnerType: "", email: "", phone: "" });
  const generatorRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  function handleGenerate() {
    if (!partnerName.trim()) {
      toast({ title: "Enter your name", description: "Type your name to generate your unique referral link." });
      return;
    }
    const ref = cleanName(partnerName);
    const link = `https://www.deliwer.com/move-in?ref=${ref}`;
    setGeneratedRef(ref);
    setGeneratedLink(link);
    setShowQR(false);
    logEvent({ ref, page: "/brokers", timestamp: new Date().toISOString(), action: "link_generated" });
    toast({ title: "Your link is ready!", description: "Copy and share it with clients after viewings." });
  }

  function handleKeyDown(e: React.KeyboardEvent) { if (e.key === "Enter") handleGenerate(); }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Copied!", description: "Paste this into your WhatsApp after the next viewing." });
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
    toast({ title: "Script copied!", description: "Replace [Client Name] and paste into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  }

  function scrollTo(ref: React.RefObject<HTMLDivElement>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleAppSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!appForm.fullName || !appForm.email || !appForm.partnerType) {
      toast({ title: "Please fill required fields", variant: "destructive" });
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
    toast({ title: "Welcome to the Broker Network!", description: "Your referral link is active." });
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 md:pb-0">
      <SEOMeta
        title="Brokers — Real Estate Referral Career | DeliWer"
        description="RERA brokers and rental agents: join DeliWer's broker referral network. Earn AED 300–800 per move-in, 50/50 commission splits, and exclusive DAMAC distress inventory."
      />
      <Navigation />
      <PartnerSubNav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&q=80" alt="Dubai real estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/97 via-purple-950/80 to-slate-950/96" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
          <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            DeliWer Broker Program
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Refer Once.<br />
            <span className="text-purple-400">Get Paid Every Time.</span>
          </h1>
          <p className="text-base text-gray-300 max-w-md mx-auto leading-relaxed">
            Add a referral income stream to your existing broker business. Free to start, no targets, no minimums — just share your link after viewings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-testid="button-hero-get-link" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-13 text-base shadow-2xl shadow-emerald-900/40" onClick={() => scrollTo(generatorRef)}>
              <Zap className="w-5 h-5 mr-2" /> Get My Free Referral Link
            </Button>
            <Button data-testid="button-hero-inner-circle" size="lg" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 font-black rounded-2xl px-8 h-13 text-base" onClick={() => document.getElementById("inner-circle")?.scrollIntoView({ behavior: "smooth" })}>
              <Crown className="w-5 h-5 mr-2" /> Inner Circle
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1">
            {[
              { icon: ShieldCheck, label: "RERA Trustee Centre" },
              { icon: Clock, label: "24h WhatsApp Response" },
              { icon: Star, label: "Active Broker Network" },
              { icon: Users, label: "Serving Tenants Across Dubai" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-STEP CAREER PATH ───────────────────────────── */}
      <section className="py-14 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Your Career Path</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-10">3 Steps. Go At Your Own Pace.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {CAREER_STEPS.map((s, i) => {
              const Icon = s.icon;
              const colorMap: Record<string, string> = {
                emerald: "border-emerald-500/40 bg-emerald-500/8 text-emerald-400",
                purple: "border-purple-500/40 bg-purple-500/8 text-purple-400",
                amber: "border-amber-500/40 bg-amber-500/8 text-amber-400",
              };
              const iconBg: Record<string, string> = {
                emerald: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
                purple: "bg-purple-500/15 border-purple-500/30 text-purple-300",
                amber: "bg-amber-500/15 border-amber-500/30 text-amber-300",
              };
              return (
                <div
                  key={s.step}
                  data-testid={`step-career-${i}`}
                  className={`relative rounded-2xl border p-6 space-y-4 ${colorMap[s.color]}`}
                >
                  {s.locked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-4 h-4 text-amber-400 opacity-60" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg[s.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Step {s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base uppercase tracking-tight mb-1">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  {i < CAREER_STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK GENERATOR (THE HOOK) ──────────── */}
      <section ref={generatorRef} id="get-link" className="py-16 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Start Here · Free</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Get Your Referral Link</h2>
            <p className="text-gray-500 text-sm">Enter your name. Your link is ready instantly.</p>
          </div>

          <div className="flex gap-3">
            <Input
              data-testid="input-broker-name"
              value={partnerName}
              onChange={e => setPartnerName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your name (e.g. Ahmed Al Mansoori)"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-600 rounded-xl h-13 flex-1 text-sm"
            />
            <Button data-testid="button-broker-generate" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-13 px-6 shrink-0" onClick={handleGenerate}>
              Generate
            </Button>
          </div>

          {generatedLink ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-slate-800/80 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                <div className="flex-1 text-sm text-emerald-300 font-mono break-all">{generatedLink}</div>
                <Button data-testid="button-broker-copy" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0 h-9" onClick={copyLink}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button data-testid="button-broker-copy-link" className="bg-slate-700 hover:bg-slate-600 text-white font-black rounded-xl h-11 text-sm" onClick={copyLink}>
                  {copied ? <><Check className="w-4 h-4 mr-2" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy Link</>}
                </Button>
                <Button data-testid="button-broker-share-whatsapp" className="bg-green-600 hover:bg-green-500 text-white font-black rounded-xl h-11 text-sm" onClick={shareOnWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Share via WhatsApp
                </Button>
              </div>
              <button
                data-testid="button-broker-toggle-qr"
                className="flex items-center gap-2 text-gray-500 hover:text-emerald-400 text-xs font-semibold transition-colors mx-auto"
                onClick={() => setShowQR(v => !v)}
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR ? "Hide QR Code" : "Show QR Code for in-person sharing"}
                {showQR ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showQR && (
                <div className="flex justify-center py-2 animate-in fade-in duration-200">
                  <QRCodeDisplay url={generatedLink} />
                </div>
              )}
              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No fees · No minimums · Start sharing today</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-700">
              <QrCode className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Your link will appear here</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PERFORMANCE TRACKING (INNER CIRCLE TEASER) ───── */}
      <section className="py-14 px-4 bg-slate-900/30 border-b border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">Inner Circle Members Only</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Track Every Deal You Close</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Inner circle brokers see their clicks, referrals and commissions in real time. Join to unlock your dashboard.</p>
          </div>

          {/* Blurred dashboard preview */}
          <div className="relative rounded-2xl border border-amber-500/25 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5 blur-[3px] select-none pointer-events-none" aria-hidden="true">
              {[
                { icon: MousePointer, label: "Link Clicks", value: "247", sub: "this month" },
                { icon: Users, label: "Clients Referred", value: "18", sub: "move-ins booked" },
                { icon: CheckCircle2, label: "Deals Closed", value: "11", sub: "confirmed" },
                { icon: Wallet, label: "Earned", value: "AED 6,600", sub: "pending payout" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900 p-5 text-center space-y-1">
                  <stat.icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-[10px] text-gray-600">{stat.sub}</div>
                </div>
              ))}
            </div>
            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Lock className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-center space-y-1.5">
                <p className="font-black text-white text-base uppercase tracking-tight">Unlock Your Dashboard</p>
                <p className="text-gray-400 text-xs max-w-xs mx-auto">Join the Inner Circle to track clicks, referrals and commissions live.</p>
              </div>
              <a
                href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%E2%80%99m%20a%20broker%20and%20want%20to%20join%20the%20Inner%20Circle%20to%20unlock%20my%20performance%20dashboard."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button data-testid="button-unlock-dashboard" className="bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl h-10 px-6 text-sm shadow-lg shadow-amber-900/40">
                  <Crown className="w-4 h-4 mr-2" /> Apply for Inner Circle
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU EARN ────────────────────────────────── */}
      <section id="what-you-earn" className="py-14 px-4 border-b border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">What You Earn</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-8">Real Income, Stacked Per Deal.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EARN_HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                data-testid={`highlight-${h.label.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 space-y-3 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <h.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="text-xl font-black text-white">{h.value}</div>
                <div>
                  <p className="font-black text-white text-xs uppercase tracking-tight">{h.label}</p>
                  <p className="text-emerald-400 text-[10px] font-semibold mt-0.5">{h.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">
            Full commission details and payouts unlocked in the Inner Circle
          </p>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ──────────────────────────────── */}
      <section className="py-14 px-4 bg-slate-900/30 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Who Can Join</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-8">Built for Dubai's Real Estate Closers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BROKER_TYPES.map((item) => (
              <div
                key={item.label}
                data-testid={`who-join-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded-2xl border border-purple-500/20 bg-slate-900 p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-tight mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNER CIRCLE (GATED) ─────────────────────────── */}
      <section id="inner-circle" className="relative py-20 px-4 border-b border-amber-500/20 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(251,191,36,0.07),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">Realty Inner Circle</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
              Where Real Growth <span className="text-amber-400">Actually Happens.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              The referral link is step one. Inner Circle members get deal flow, vetted inventory, live tracking, and shared commission — all under a simple NDA.
            </p>
          </div>

          {/* 4 benefits, clean */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Building2, title: "Reserved Deal Pool", desc: "Lock specific developers and communities. Capped seats per area so you're never competing with the crowd." },
              { icon: Sparkles, title: "Daily Inventory Drops", desc: "Rental demand signals and distress sale alerts — sourced before they hit any portal." },
              { icon: BarChart2, title: "Live Performance Dashboard", desc: "See your clicks, referrals, closed deals and pending commissions in one place." },
              { icon: TrendingUp, title: "50/50 Commission + Override", desc: "Full split on every routed lease and sale, plus AED 300–800 move-in override on top." },
            ].map((b, i) => (
              <div
                key={b.title}
                data-testid={`inner-circle-benefit-${i}`}
                className="bg-slate-900/70 border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-colors flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight mb-1">{b.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust architecture — simplified */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-black text-amber-300 uppercase tracking-widest">Three Short Agreements · Same-Day Onboarding</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: FileSignature, title: "Non-Circumvention", desc: "No bypassing DeliWer on clients routed through the network." },
                { icon: ShieldCheck, title: "Confidentiality (NDA)", desc: "Inventory intelligence stays inside the network." },
                { icon: BadgeCheck, title: "Non-Compete", desc: "Reserved community stays yours while you're active." },
              ].map((t, i) => (
                <div key={t.title} data-testid={`nda-term-${i}`} className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
                  <t.icon className="w-4 h-4 text-amber-300 mb-2" />
                  <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1">{t.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer%20Realty%20%E2%80%94%20I%E2%80%99m%20a%20RERA%20broker%20applying%20to%20the%20Inner%20Circle%20Track.%20Please%20share%20the%20NDA%20to%20get%20started."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                data-testid="button-inner-circle-apply"
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-black h-13 px-10 text-sm rounded-2xl shadow-2xl shadow-amber-900/40"
              >
                <Crown className="w-5 h-5 mr-2" />
                Apply for Inner Circle · Sign NDA
              </Button>
            </a>
            <Link href="/realestate">
              <Button
                data-testid="button-realty-engine"
                size="lg"
                variant="outline"
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 font-black h-13 px-8 text-sm rounded-2xl"
              >
                <Building2 className="w-4 h-4 mr-2" /> Realty Intelligence Engine
              </Button>
            </Link>
          </div>
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
            Active RERA brokers only · Capped seats · Same-day onboarding
          </p>
        </div>
      </section>

      {/* ── DAMAC DISTRESS INVENTORY ─────────────────────── */}
      <section id="damac" className="py-14 px-4 border-b border-white/5 bg-gradient-to-br from-slate-950 via-amber-950/10 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
          <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest">
            Secondary Market · DAMAC Distress Inventory
          </Badge>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
            Below-Market Resale Track
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Resale specialists get access to vetted DAMAC distress inventory — higher per-deal commissions, active buyer lists, fast movement.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <DistressBrokerTrack />
        </div>
      </section>

      {/* ── COPY-PASTE SCRIPTS ────────────────────────────── */}
      <section id="scripts" className="py-14 px-4 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="text-center space-y-2 mb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Ready to Send</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Copy-Paste Scripts</h2>
            <p className="text-gray-500 text-sm">Generate your link above, then paste it into any script below.</p>
          </div>
          {SCRIPTS.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/25 transition-colors">
              <button
                data-testid={`button-script-toggle-${i}`}
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedScript(expandedScript === i ? null : i)}
              >
                <div>
                  <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">{s.scenario}</div>
                </div>
                {expandedScript === i
                  ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
              </button>
              {expandedScript === i && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                    <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                      {s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE")}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <Button data-testid={`button-copy-script-${i}`} size="sm" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-4 h-8 text-xs" onClick={() => copyScript(i, s.script)}>
                      {copiedScript === i ? <><Check className="w-3 h-3 mr-1" />Copied!</> : <><Copy className="w-3 h-3 mr-1" />Copy</>}
                    </Button>
                    <Button data-testid={`button-send-script-wa-${i}`} size="sm" className="bg-green-700 hover:bg-green-600 text-white font-black rounded-xl px-4 h-8 text-xs" onClick={() => {
                      const msg = s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE").replace(/\[Tenant Name\]|\[Client Name\]|\[Buyer Name\]|\[Name\]/g, "");
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

      {/* ── PARTNER APPLICATION FORM ─────────────────────── */}
      <section ref={applyRef} id="apply" className="py-14 px-4 border-b border-white/5 bg-slate-900/40">
        <div className="max-w-lg mx-auto">
          {!submitted ? (
            <div className="space-y-7">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <BadgeCheck className="w-3.5 h-3.5" /> Join the Network
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Apply as a Broker</h2>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">Fill in the basics. We'll generate your referral link and reach out on WhatsApp within 24 hours.</p>
              </div>
              <Card className="bg-white/5 border-white/8 rounded-2xl">
                <CardContent className="p-6">
                  <form onSubmit={handleAppSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Full Name *</Label>
                        <Input data-testid="input-full-name" placeholder="Your name" value={appForm.fullName} onChange={e => setAppForm(p => ({ ...p, fullName: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Brokerage</Label>
                        <Input data-testid="input-company-name" placeholder="Company (optional)" value={appForm.companyName} onChange={e => setAppForm(p => ({ ...p, companyName: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Broker Type *</Label>
                      <Select value={appForm.partnerType} onValueChange={v => setAppForm(p => ({ ...p, partnerType: v }))}>
                        <SelectTrigger className="bg-slate-900 border-white/10 text-white h-11" data-testid="select-partner-type">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          {PARTNER_TYPES.map(t => <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Email *</Label>
                        <Input data-testid="input-email" type="email" placeholder="you@example.com" value={appForm.email} onChange={e => setAppForm(p => ({ ...p, email: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Phone</Label>
                        <Input data-testid="input-phone" placeholder="+971 50 000 0000" value={appForm.phone} onChange={e => setAppForm(p => ({ ...p, phone: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <Button type="submit" data-testid="button-submit-partner" size="lg" className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20 text-sm">
                      Get My Referral Link <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                      No fees · No minimum referrals · Monthly payouts
                    </p>
                  </form>
                </CardContent>
              </Card>
              <div className="flex justify-center">
                <Button data-testid="button-broker-join-wa" variant="outline" className="border-white/10 text-gray-400 hover:bg-white/5 font-black rounded-xl h-11 text-xs uppercase tracking-widest" onClick={handleJoinWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Prefer WhatsApp? Join directly
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-7 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-slate-950" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Welcome to the Network!</h2>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">Your referral link is active. We'll reach out on WhatsApp within 24 hours to onboard you personally.</p>
              </div>
              <Card className="bg-emerald-950/40 border-emerald-500/25 rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Referral Link</p>
                  <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-4">
                    <code className="flex-1 text-emerald-300 text-sm font-mono break-all text-left" data-testid="text-generated-link">{generatedLink}</code>
                    <Button onClick={copyLink} size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0" data-testid="button-copy-generated-link">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/realestate" className="flex-1">
                      <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl h-10 text-xs">
                        <Building2 className="w-4 h-4 mr-2" /> Realty Engine
                      </Button>
                    </Link>
                    <a
                      href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%20just%20applied%20as%20a%20broker%20and%20want%20to%20learn%20about%20the%20Inner%20Circle."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-xl h-10 text-xs">
                        <Crown className="w-4 h-4 mr-2" /> Inner Circle
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gradient-to-r from-emerald-950/30 via-slate-900/80 to-purple-950/30">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Ready to Close Your First Deal?</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Start with your free referral link — no forms, no wait. Or apply to the broker network for the full career track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-testid="button-final-get-link" size="lg" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-12 text-sm shadow-2xl" onClick={() => scrollTo(generatorRef)}>
              <Zap className="w-4 h-4 mr-2" /> Get My Free Link
            </Button>
            <Button data-testid="button-final-apply" size="lg" variant="outline" className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-black rounded-2xl h-12 text-sm" onClick={() => scrollTo(applyRef)}>
              <BadgeCheck className="w-4 h-4 mr-2" /> Apply as a Broker
            </Button>
            <Button data-testid="button-final-wa" size="lg" variant="outline" className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 font-black rounded-2xl h-12 text-sm" onClick={handleJoinWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE BAR ─────────────────────────────── */}
      <div data-testid="sticky-mobile-bar" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <Button data-testid="button-sticky-get-link" size="lg" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 text-sm shadow-2xl" onClick={() => scrollTo(generatorRef)}>
          <Zap className="w-4 h-4 mr-2" /> Get My Link
        </Button>
        <Button data-testid="button-sticky-inner-circle" size="lg" className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl h-12 text-sm" onClick={() => document.getElementById("inner-circle")?.scrollIntoView({ behavior: "smooth" })}>
          <Crown className="w-4 h-4 mr-2" /> Inner Circle
        </Button>
      </div>
    </div>
  );
}
