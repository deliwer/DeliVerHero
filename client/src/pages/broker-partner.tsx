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
  Handshake, FileSignature,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp, logEvent } from "@/lib/referral";

const WA_NUMBER = "971523946311";

function openWA(msg: string) { openWhatsApp(msg); }

const WHO_CAN_JOIN = [
  { icon: Building2, label: "RERA-Licensed Brokers", desc: "Active rental and sales agents — plug your existing pipeline into a vetted referral network and stack commissions on every closed deal.", highlight: true },
  { icon: KeyRound, label: "Secondary Market Specialists", desc: "Resale and distressed-unit closers — get exclusive access to off-market DAMAC distress inventory and shared 50/50 splits." },
  { icon: Home, label: "Rental Agents", desc: "Lease specialists — earn on the lease itself plus the AED 300–800 move-in service override on every signed contract." },
  { icon: Users, label: "Property Managers", desc: "Building managers and PMs — turn every renewal and new tenant into recurring referral income." },
  { icon: Handshake, label: "Independent Agents", desc: "Solo brokers without a big firm behind you — use the DeliWer Realty intelligence pack to close deals faster." },
  { icon: Layers, label: "Brokerage Teams", desc: "Whole teams welcome — onboard your agents under one master account with team-level reporting." },
];

const REAL_ESTATE_HIGHLIGHTS = [
  { icon: TrendingUp, label: "Lease & Sale Commissions", value: "50/50 split on routed deals" },
  { icon: Crown, label: "DAMAC Distress Inventory", value: "Below-market secondary units" },
  { icon: Award, label: "Move-In Service Override", value: "AED 300–800 per closed lease" },
  { icon: ShieldCheck, label: "Reserved Community Pool", value: "Capped seats per area" },
];

const SCRIPTS = [
  {
    title: "After Property Viewing",
    scenario: "Send after the viewing when the client is interested",
    script: `Hi [Client Name], great speaking with you today! \u{1F3E0}

If this is the one, here's how to sort everything fast:

DeliWer handles Ejari, DEWA, movers and setup in one place — and I get notified the moment they're in.

[YOUR REFERRAL LINK]

They'll contact you directly on WhatsApp. Makes the whole process stress-free.`,
  },
  {
    title: "After Lease Signing",
    scenario: "Send immediately after the tenancy contract is signed",
    script: `Hi [Tenant Name], congratulations on your new home! \u{1F389}

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

Want to look at the inner-circle deck? \u2192 [YOUR REFERRAL LINK]`,
  },
];

const TRUST = [
  { icon: Users, label: "Serving tenants across Dubai" },
  { icon: ShieldCheck, label: "RERA Trustee Centre" },
  { icon: Clock, label: "Fast response via WhatsApp" },
  { icon: Star, label: "Active broker network" },
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
    toast({ title: "Script copied!", description: "Replace [Client Name] and paste into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  }

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
    toast({ title: "Welcome to the Broker Network!", description: "Your referral link is ready." });
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 md:pb-0">
      <SEOMeta
        title="Brokers — Real Estate Referral Career | DeliWer"
        description="RERA brokers and secondary market specialists: join DeliWer's broker network for rental deals and below-market DAMAC distress inventory. 50/50 commission share + AED 300–800 move-in override per closed deal."
      />
      <Navigation />
      <PartnerSubNav />

      {/* ── HERO ────────────────────────── */}
      <section id="hero" className="relative pt-40 md:pt-48 pb-20 md:pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&q=80" alt="Dubai real estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/97 via-purple-950/75 to-slate-950/95" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-7">
          <div className="absolute inset-x-0 -inset-y-12 -z-10 bg-slate-950/70 blur-2xl rounded-3xl pointer-events-none" />
          <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
            DeliWer Brokers · Real Estate Referral Career
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase drop-shadow-2xl">
            Rental & Secondary<br />
            <span className="text-purple-400">Market Deals — Closed.</span>
          </h1>
          <p className="text-lg text-gray-200 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-lg bg-slate-950/40 rounded-2xl px-5 py-3 backdrop-blur-sm border border-white/5">
            For RERA-licensed brokers, rental agents and secondary market specialists who want to participate in Dubai's broker referral network as a real career — not a side hustle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-testid="button-broker-apply-hero" size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-lg shadow-2xl" onClick={scrollToApply}>
              <Zap className="w-5 h-5 mr-2" /> Apply as a Broker
            </Button>
            <a href={`#realty-inner-circle`} onClick={(e) => { e.preventDefault(); document.getElementById("realty-inner-circle")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
              <Button data-testid="button-broker-realty-hero" size="lg" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 font-black rounded-2xl px-8 h-14 text-base">
                <Crown className="w-5 h-5 mr-2" /> Realty Inner Circle
              </Button>
            </a>
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

      {/* ── UNIFIED BROKER SUB-NAV ── */}
      <div className="bg-slate-900/95 backdrop-blur border-y border-emerald-500/15" data-testid="broker-anchor-nav">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex gap-1 flex-1">
            {[
              { id: "who", label: "Who Can Join" },
              { id: "highlights", label: "What You Earn" },
              { id: "realty-inner-circle", label: "Realty Inner Circle" },
              { id: "damac", label: "DAMAC Distress Track" },
              { id: "apply", label: "Apply" },
              { id: "scripts", label: "Scripts" },
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
          <Link href="/career" className="shrink-0">
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
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-3">Built for Dubai's Real Estate Closers</h2>
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            If you close leases or sales in Dubai — or want to — the broker track gives your pipeline an income engine that compounds with every deal.
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

      {/* ── WHAT YOU EARN — REAL ESTATE HIGHLIGHTS ── */}
      <section id="highlights" className="py-16 px-4 border-b border-white/5 bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">What You Earn</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-3">Real Estate Revenue, Stacked.</h2>
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Every routed deal pays you in two ways — your share of the lease/sale commission, plus the move-in service override on top.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REAL_ESTATE_HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                data-testid={`highlight-${h.label.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <h.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-tight">{h.label}</p>
                  <p className="text-emerald-400 text-xs font-bold mt-1">{h.value}</p>
                </div>
              </div>
            ))}
          </div>
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
              The broker track extends into <Link href="/realestate" className="text-amber-300 underline decoration-amber-500/40 underline-offset-4">DeliWer Realty</Link> — a closed,
              capped-seat network where members receive vetted rental and distress-sale intelligence under
              <strong className="text-white"> NCA + NDA + Non-Compete</strong>, then close deals and share commissions.
            </p>
          </div>

          {/* 4-up benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Building2, title: "Reserved Developer & Community Pool", desc: "Lock specific developers (Emaar, DAMAC, Nakheel, Sobha, Aldar, Meraas) and communities (Downtown, Marina, JVC, Dubai Hills, Palm). Capped seats per area." },
              { icon: Sparkles, title: "Exclusive Inventory Intelligence", desc: "Daily WhatsApp drops on rental demand by community + distress sale alerts — sourced and vetted before they hit any portal." },
              { icon: Layers, title: "Co-Branded Closing Dossier", desc: "Use the DeliWer Realty intelligence pack in client meetings: demand signal, comparable rents, move-in stack — all in one." },
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
                { icon: FileSignature, title: "NCA · Non-Circumvention", desc: "No bypassing DeliWer Realty on any tenant, buyer, landlord or developer routed through the network." },
                { icon: ShieldCheck, title: "NDA · Confidentiality", desc: "Inventory dossiers, pricing intelligence and demand signals stay inside the network. Sharing externally = revocation." },
                { icon: BadgeCheck, title: "Non-Compete · Reserved Areas", desc: "While active, you don't source or close inventory in your reserved community pool through competing platforms." },
              ].map((t, i) => (
                <div
                  key={t.title}
                  data-testid={`broker-realty-nda-term-${i}`}
                  className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-5"
                >
                  <t.icon className="w-5 h-5 text-amber-300 mb-2" />
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

      {/* ── DAMAC DISTRESS / SECONDARY MARKET TRACK ── */}
      <section id="damac" className="py-16 px-4 border-b border-white/5 bg-gradient-to-br from-slate-950 via-amber-950/15 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Secondary Market · DAMAC Distress Inventory</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            Brokers → <span className="text-amber-400">Below-Market Resale Track</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Plug straight into our distress-driven DAMAC inventory. Higher per-deal commissions on below-market secondary units priced for fast movement — perfect for resale specialists with active buyer lists.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <DistressBrokerTrack />
        </div>
      </section>

      {/* ── PARTNER APPLICATION FORM ─────────────────────── */}
      <section ref={applyRef} id="apply" className="py-16 px-4 border-b border-white/5 bg-slate-900/40">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <BadgeCheck className="w-3.5 h-3.5" /> Broker Application
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Apply as a Broker</h2>
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
                        <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Brokerage Name</Label>
                        <Input data-testid="input-company-name" placeholder="e.g. Emaar Properties" value={appForm.companyName} onChange={e => setAppForm(p => ({ ...p, companyName: e.target.value }))} className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Broker Type *</Label>
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
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Welcome to the Broker Network!</h2>
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
                    <Link href="/realestate" className="flex-1">
                      <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl h-11 text-xs">
                        <Building2 className="w-4 h-4 mr-2" /> Realty Intelligence Engine
                      </Button>
                    </Link>
                    <Link href="/career" className="flex-1">
                      <Button variant="outline" className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl h-11 text-xs">
                        <Crown className="w-4 h-4 mr-2" /> See Full Career Path
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
                      const msg = s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE").replace(/\[Tenant Name\]/g, "").replace(/\[Client Name\]/g, "").replace(/\[Buyer Name\]/g, "").replace(/\[Name\]/g, "");
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

      {/* ── BRIDGE TO FULL CAREER PATH ──────────────────── */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-emerald-950/40 border-b border-emerald-500/15">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mx-auto md:mx-0">
            <Crown className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">Looking for the Full Picture?</p>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">Complete Career Growth Path</h3>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed max-w-xl">
              Distributor levels, team override income, leadership ranks, fast-start playbook and the full DeliWer earning ladder live on the dedicated career page.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/career">
              <Button data-testid="button-bridge-to-career" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-12 px-8 shadow-xl shadow-emerald-900/40">
                <ArrowRight className="w-4 h-4 mr-2" /> See Full Career Path
              </Button>
            </Link>
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
          <p className="text-gray-500 text-sm max-w-xs mx-auto">Apply above and start routing rental and resale deals through the broker network.</p>
          <div className="flex flex-col gap-3">
            <Button data-testid="button-broker-apply-final" size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-2xl w-full" onClick={scrollToApply}>
              <Zap className="w-5 h-5 mr-2" /> Apply as a Broker
            </Button>
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
        <Link href="/career" className="flex-1">
          <Button size="lg" variant="outline" className="w-full border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black rounded-xl h-12 text-sm">
            <Crown className="w-4 h-4 mr-2" /> Career Path
          </Button>
        </Link>
      </div>
    </div>
  );
}
