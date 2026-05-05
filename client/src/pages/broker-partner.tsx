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
  FileSignature, Lock, BarChart2, MousePointer, Wallet,
  ChevronRight, AlertCircle, Activity, MapPin, Calculator,
  Hash, Target,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp, logEvent } from "@/lib/referral";

function openWA(msg: string) { openWhatsApp(msg); }

// ── Static data ────────────────────────────────────────────────────────────

const CAREER_STEPS = [
  { step: "01", title: "Get Your Free Link", desc: "Enter your name, generate your unique referral link in seconds. No fees, no commitment.", color: "emerald", icon: Zap, locked: false },
  { step: "02", title: "Refer Clients & Earn", desc: "Share your link after viewings or lease signings. Earn AED 300–800 per move-in you refer.", color: "purple", icon: TrendingUp, locked: false },
  { step: "03", title: "Join the Inner Circle", desc: "Unlock deal flow, performance tracking, 50/50 commission splits and exclusive DAMAC inventory.", color: "amber", icon: Crown, locked: true },
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

const AREA_DATA: Record<string, { deals: number; avgComm: number; priority: string }> = {
  "Dubai Marina / JBR":      { deals: 9,  avgComm: 3200, priority: "HIGH" },
  "Downtown / Business Bay": { deals: 7,  avgComm: 3800, priority: "HIGH" },
  "JVC / JVT":               { deals: 12, avgComm: 2400, priority: "MEDIUM" },
  "Dubai Hills / MBR City":  { deals: 6,  avgComm: 4100, priority: "HIGH" },
  "Deira / Bur Dubai":       { deals: 11, avgComm: 1900, priority: "MEDIUM" },
  "Sharjah":                 { deals: 8,  avgComm: 1600, priority: "MEDIUM" },
  "Ajman":                   { deals: 5,  avgComm: 1200, priority: "LOW" },
};

const MOCK_OPPORTUNITIES = [
  { id: "LD-2026-0041", type: "2BR Apartment", area: "Dubai Marina", need: "Tenant Needed", commission: 3200, slots: 2, priority: "HIGH" },
  { id: "LD-2026-0038", type: "Studio", area: "JVC", need: "Move-In Package", commission: 1800, slots: 3, priority: "MEDIUM" },
  { id: "LD-2026-0035", type: "3BR Villa", area: "Dubai Hills", need: "Tenant + Services", commission: 5500, slots: 1, priority: "HIGH" },
  { id: "LD-2026-0033", type: "1BR Apartment", area: "Business Bay", need: "Ejari + Setup", commission: 2600, slots: 2, priority: "HIGH" },
  { id: "LD-2026-0029", type: "Retail Unit", area: "Deira", need: "Commercial Tenant", commission: 4800, slots: 1, priority: "MEDIUM" },
  { id: "LD-2026-0027", type: "2BR Apartment", area: "JBR", need: "Tenant Needed", commission: 3600, slots: 3, priority: "MEDIUM" },
];

const SCRIPTS = [
  {
    title: "After Property Viewing",
    scenario: "Send after the viewing when the client is interested",
    script: `Hi [Client Name], great speaking with you today! 🏠\n\nIf this is the one, here's how to sort everything fast:\n\nDeliWer handles Ejari, DEWA, movers and setup in one place — and I get notified the moment they're in.\n\n[YOUR REFERRAL LINK]\n\nThey'll contact you directly on WhatsApp. Makes the whole process stress-free.`,
  },
  {
    title: "After Lease Signing",
    scenario: "Send immediately after the tenancy contract is signed",
    script: `Hi [Tenant Name], congratulations on your new home! 🎉\n\nOne thing I always recommend — DeliWer handles everything you need after getting your keys: Ejari, DEWA setup, movers, and cleaning.\n\nHere's the link — they'll contact you directly:\n\n[YOUR REFERRAL LINK]\n\nThey respond fast on WhatsApp.`,
  },
  {
    title: "Secondary Market / Distress Sale",
    scenario: "Pitch a buyer on a below-market DAMAC distress unit",
    script: `Hi [Buyer Name], I have access to a vetted off-market DAMAC distress unit that fits your budget — priced below current market for fast movement.\n\nI can share the dossier (price, comparables, demand signal) once we're aligned on the area.\n\nReply YES and I'll send it across today.\n\n[YOUR REFERRAL LINK]`,
  },
  {
    title: "Broker-to-Broker Outreach",
    scenario: "Invite another RERA broker into the network",
    script: `Hi [Name], quick one — DeliWer Realty gives RERA brokers reserved community pools and below-market DAMAC distress inventory under NDA. 50/50 splits on routed leases & sales, plus the move-in service override on top.\n\nWant to look at the inner-circle deck? → [YOUR REFERRAL LINK]`,
  },
];

const PARTNER_TYPES = [
  "RERA Real Estate Broker", "Rental Agent", "Secondary Market / Resale Agent",
  "Property Manager", "Brokerage Team Lead", "Independent Agent", "Other",
];

// ── Helpers ────────────────────────────────────────────────────────────────

function cleanName(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function generateLeadId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `LD-${new Date().getFullYear()}-${n}`;
}

function formatAED(n: number) {
  return `AED ${n.toLocaleString()}`;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function QRCodeDisplay({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!url || !canvasRef.current) return;
    import("qrcode").then((QR) => {
      QR.toCanvas(canvasRef.current!, url, { width: 160, margin: 2, color: { dark: "#a855f7", light: "#0f172a" } }, (e) => { if (!e) setReady(true); });
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

/** Animated live-stat ticker for the hero */
function LiveStatBar() {
  const stats = [
    { value: "31", label: "Active Opportunities" },
    { value: "AED 148K", label: "Pipeline This Week" },
    { value: "14", label: "Brokers Closed Deals" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6" data-testid="hero-live-stats">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-300 font-black text-sm">{s.value}</span>
          <span className="text-gray-500 text-xs">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Scarcity badge color */
function priorityColor(p: string) {
  if (p === "HIGH") return "bg-red-500/15 text-red-400 border-red-500/25";
  if (p === "MEDIUM") return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  return "bg-slate-700/60 text-gray-400 border-white/10";
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function BrokerPartnerPage() {
  const [partnerName, setPartnerName] = useState("");
  const [generatedRef, setGeneratedRef] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [leadId, setLeadId] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appForm, setAppForm] = useState({ fullName: "", companyName: "", partnerType: "", email: "", phone: "" });

  // Calculator
  const [selectedArea, setSelectedArea] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const [claimedSlots, setClaimedSlots] = useState<Record<string, number>>({});

  const generatorRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const calcData = selectedArea ? AREA_DATA[selectedArea] : null;

  function handleGenerate() {
    if (!partnerName.trim()) {
      toast({ title: "Enter your name", description: "Type your name to generate your unique referral link." });
      return;
    }
    const ref = cleanName(partnerName);
    const lid = generateLeadId();
    const link = `https://www.deliwer.com/move-in?ref=${ref}`;
    setGeneratedRef(ref);
    setGeneratedLink(link);
    setLeadId(lid);
    setShowQR(false);
    logEvent({ ref, page: "/brokers", timestamp: new Date().toISOString(), action: "link_generated" });
    toast({ title: "Your link is ready!", description: `Lead ID ${lid} — share it after the next viewing.` });
  }

  function handleKeyDown(e: React.KeyboardEvent) { if (e.key === "Enter") handleGenerate(); }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Copied!", description: "Paste into WhatsApp right after the viewing." });
    setTimeout(() => setCopied(false), 2500);
  }

  function shareOnWhatsApp() {
    const msg = `My referral link ${leadId ? `(${leadId}) ` : ""}— I help clients complete their move-in (Ejari, movers, setup) fast: ${generatedLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    logEvent({ ref: generatedRef, page: "/brokers", timestamp: new Date().toISOString(), action: "whatsapp_click" });
  }

  function claimOpportunity(opp: typeof MOCK_OPPORTUNITIES[0]) {
    const remaining = Math.max(0, opp.slots - (claimedSlots[opp.id] || 0));
    if (remaining === 0) return;
    setClaimedSlots(prev => ({ ...prev, [opp.id]: (prev[opp.id] || 0) + 1 }));
    const msg = `Hi DeliWer — I'm a broker and I want to claim opportunity ${opp.id} (${opp.type} · ${opp.area}). My referral code: ${generatedRef || "pending"}`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
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
    const lid = generateLeadId();
    const link = `https://deliwer.com/?ref=${ref}`;
    try {
      await fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateCode: ref, event: "partner_signup", leadId: lid, ...appForm }),
      });
    } catch {}
    setGeneratedLink(link);
    setGeneratedRef(ref);
    setLeadId(lid);
    setSubmitted(true);
    toast({ title: "Welcome to the Network!", description: `Your Lead ID is ${lid}. We'll reach out within 24h.` });
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
      <section className="relative min-h-[580px] md:min-h-[640px] flex items-center pt-24 md:pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&q=80" alt="Dubai real estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-purple-950/60 to-slate-950/85" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6 bg-slate-950/55 backdrop-blur-sm rounded-3xl px-8 py-10 border border-white/5 shadow-2xl shadow-black/50">
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

          {/* ── Live stats ── */}
          <LiveStatBar />

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Button data-testid="button-hero-get-link" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-2xl shadow-emerald-900/40" onClick={() => scrollTo(generatorRef)}>
              <Zap className="w-5 h-5 mr-2" /> Get My Free Referral Link
            </Button>
            <Button data-testid="button-hero-inner-circle" size="lg" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 font-black rounded-2xl px-8 h-14 text-base" onClick={() => document.getElementById("inner-circle")?.scrollIntoView({ behavior: "smooth" })}>
              <Crown className="w-5 h-5 mr-2" /> Inner Circle
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
                emerald: "border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-400",
                purple:  "border-purple-500/40 bg-purple-500/[0.06] text-purple-400",
                amber:   "border-amber-500/40 bg-amber-500/[0.06] text-amber-400",
              };
              const iconBg: Record<string, string> = {
                emerald: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
                purple:  "bg-purple-500/15 border-purple-500/30 text-purple-300",
                amber:   "bg-amber-500/15 border-amber-500/30 text-amber-300",
              };
              return (
                <div key={s.step} data-testid={`step-career-${i}`} className={`relative rounded-2xl border p-6 space-y-4 ${colorMap[s.color]}`}>
                  {s.locked && <div className="absolute top-4 right-4"><Lock className="w-4 h-4 text-amber-400 opacity-60" /></div>}
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

      {/* ── EARNING CALCULATOR ───────────────────────────── */}
      <section className="py-14 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Earning Calculator</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">See Your Potential This Week</h2>
            <p className="text-gray-500 text-sm">Pick your area — see live deal volume and average commission.</p>
          </div>
          <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-purple-400" />
              </div>
              <Select value={selectedArea} onValueChange={(v) => { setSelectedArea(v); setShowCalc(true); }}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-11 flex-1 text-[#ffffff]" data-testid="select-area">
                  <SelectValue placeholder="Where do you operate?" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  {Object.keys(AREA_DATA).map(a => <SelectItem key={a} value={a} className="text-white">{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {showCalc && calcData ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Deals Available", value: String(calcData.deals), accent: "text-emerald-300" },
                    { label: "Avg Commission", value: formatAED(calcData.avgComm), accent: "text-purple-300" },
                    { label: "Potential / Week", value: formatAED(calcData.deals * calcData.avgComm), accent: "text-amber-300" },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-slate-800/60 rounded-xl p-3 border border-white/5">
                      <div className={`text-lg font-black ${s.accent}`}>{s.value}</div>
                      <div className="text-[10px] text-gray-500 font-semibold mt-0.5 uppercase tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${priorityColor(calcData.priority)}`}>
                  <Activity className="w-3 h-3" /> {calcData.priority} Demand · {selectedArea}
                </div>
                <Button data-testid="button-calc-unlock" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-11 text-sm" onClick={() => scrollTo(generatorRef)}>
                  <Zap className="w-4 h-4 mr-2" /> Unlock These Deals — Get My Link
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-700">
                <Calculator className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs">Select your area to see potential earnings</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK GENERATOR (THE HOOK) ──────────── */}
      <section ref={generatorRef} id="get-link" className="py-16 px-4 bg-slate-900/50 border-b border-white/5">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Start Here · Free · Instant</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Get Your Referral Link</h2>
            <p className="text-gray-500 text-sm">Enter your name. Your link + Lead ID are generated instantly.</p>
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
              {/* Lead ID badge */}
              <div className="flex items-center gap-3 bg-slate-800/60 border border-emerald-500/20 rounded-xl px-4 py-3">
                <Hash className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Lead ID</p>
                  <p className="text-emerald-300 font-black text-sm font-mono" data-testid="text-lead-id">{leadId}</p>
                </div>
                <Badge className="bg-emerald-500/15 border-emerald-500/25 text-emerald-400 text-[9px] font-black uppercase">Active</Badge>
              </div>

              {/* Referral link */}
              <div className="bg-slate-800/80 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                <div className="flex-1 text-sm text-emerald-300 font-mono break-all" data-testid="text-generated-link">{generatedLink}</div>
                <Button data-testid="button-broker-copy" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0 h-9" onClick={copyLink}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* WhatsApp tracking link */}
              <div className="bg-slate-800/40 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">WhatsApp Tracking Link</p>
                  <code className="text-green-300 text-xs font-mono">wa.me/971523946311?text={leadId}</code>
                </div>
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
              {showQR && <div className="flex justify-center py-2 animate-in fade-in duration-200"><QRCodeDisplay url={generatedLink} /></div>}
              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No fees · No minimums · Start sharing today</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-700">
              <QrCode className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Your link + Lead ID will appear here</p>
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
            <p className="text-gray-500 text-sm max-w-md mx-auto">Inner circle brokers see clicks, referrals and commissions in real time. Join to unlock your dashboard.</p>
          </div>

          {/* Missed opportunity alert */}
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3" data-testid="missed-opp-alert">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-300 text-xs font-semibold leading-relaxed">
              <span className="font-black">Without a dashboard:</span> brokers typically miss 2–3 commission opportunities per week because they can't see which referrals converted.
            </p>
          </div>

          {/* Blurred dashboard */}
          <div className="relative rounded-2xl border border-amber-500/25 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5 blur-[3px] select-none pointer-events-none" aria-hidden="true">
              {[
                { icon: MousePointer, label: "Link Clicks", value: "247", sub: "this month" },
                { icon: Users,        label: "Clients Referred", value: "18", sub: "move-ins booked" },
                { icon: CheckCircle2, label: "Deals Closed", value: "11", sub: "confirmed" },
                { icon: Wallet,       label: "Earned", value: "AED 6,600", sub: "pending payout" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900 p-5 text-center space-y-1">
                  <stat.icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-[10px] text-gray-600">{stat.sub}</div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-sm gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Lock className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-center space-y-1.5">
                <p className="font-black text-white text-base uppercase tracking-tight">Unlock Your Dashboard</p>
                <p className="text-gray-400 text-xs max-w-xs mx-auto">Join the Inner Circle to track clicks, referrals and commissions live.</p>
              </div>
              <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%E2%80%99m%20a%20broker%20and%20want%20to%20join%20the%20Inner%20Circle%20to%20unlock%20my%20performance%20dashboard." target="_blank" rel="noopener noreferrer">
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

      {/* ── LIVE OPPORTUNITY FEED ────────────────────────── */}
      <section className="py-14 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live · Updated Daily</p>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Open Opportunities</h2>
              <p className="text-gray-500 text-sm">Claim a lead via WhatsApp. First claim = your ownership lock.</p>
            </div>
            <Badge className="bg-red-500/15 border-red-500/25 text-red-400 text-xs font-black uppercase tracking-wide shrink-0">
              <AlertCircle className="w-3 h-3 mr-1.5" /> {MOCK_OPPORTUNITIES.filter(o => o.slots === 1).length} slots closing soon
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_OPPORTUNITIES.map((opp) => {
              const remaining = Math.max(0, opp.slots - (claimedSlots[opp.id] || 0));
              const isFull = remaining === 0;
              return (
                <div
                  key={opp.id}
                  data-testid={`opportunity-${opp.id}`}
                  className={`bg-slate-900 border rounded-2xl p-5 space-y-4 transition-colors ${isFull ? "border-slate-700/50 opacity-60" : "border-white/8 hover:border-emerald-500/25"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-tight">{opp.type}</p>
                      <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.area}</p>
                    </div>
                    <Badge className={`text-[9px] font-black uppercase border shrink-0 ${isFull ? "bg-slate-700/50 text-gray-500 border-white/10" : priorityColor(opp.priority)}`}>
                      {isFull ? "FULL" : opp.priority}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{opp.need}</span>
                      <span className="font-black text-emerald-300">{formatAED(opp.commission)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < remaining ? "bg-emerald-500" : "bg-slate-700"}`} />
                      ))}
                      <span className={`text-[10px] font-semibold ml-1 shrink-0 transition-colors ${isFull ? "text-red-400" : remaining === 1 ? "text-amber-400" : "text-gray-500"}`}>
                        {isFull ? "Claimed" : remaining === 1 ? "1 slot left!" : `${remaining} slots`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <code className="text-[10px] text-gray-600 font-mono">{opp.id}</code>
                    <Button
                      data-testid={`button-claim-${opp.id}`}
                      size="sm"
                      disabled={isFull}
                      className={`font-black rounded-xl h-8 px-4 text-xs transition-all ${isFull ? "bg-slate-700 text-gray-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                      onClick={() => claimOpportunity(opp)}
                    >
                      {isFull ? "All Claimed" : "Claim Lead →"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gated — more behind inner circle */}
          <div className="relative rounded-2xl border border-amber-500/15 bg-slate-900/40 p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between relative">
              <div className="text-center sm:text-left space-y-1">
                <p className="font-black text-white text-sm uppercase tracking-tight">+ 24 More Opportunities This Week</p>
                <p className="text-gray-500 text-xs">Inner Circle members get full deal flow — residential, commercial, DAMAC distress.</p>
              </div>
              <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%E2%80%99m%20a%20broker%20and%20want%20Inner%20Circle%20access%20to%20the%20full%20opportunity%20feed." target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Button data-testid="button-more-opps" className="bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl h-10 px-6 text-sm shadow-lg shadow-amber-900/30">
                  <Crown className="w-4 h-4 mr-2" /> Unlock Full Feed
                </Button>
              </a>
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Building2, title: "Reserved Deal Pool", desc: "Lock specific developers and communities. Capped seats per area so you're never competing with the crowd." },
              { icon: Sparkles,  title: "Daily Inventory Drops", desc: "Rental demand signals and distress sale alerts — sourced before they hit any portal." },
              { icon: BarChart2, title: "Live Performance Dashboard", desc: "See your clicks, referrals, closed deals and pending commissions in one place." },
              { icon: TrendingUp, title: "50/50 Commission + Override", desc: "Full split on every routed lease and sale, plus AED 300–800 move-in override on top." },
            ].map((b, i) => (
              <div key={b.title} data-testid={`inner-circle-benefit-${i}`} className="bg-slate-900/70 border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-colors flex gap-4">
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

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-black text-amber-300 uppercase tracking-widest">Three Short Agreements · Same-Day Onboarding</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: FileSignature, title: "Non-Circumvention", desc: "No bypassing DeliWer on clients routed through the network." },
                { icon: ShieldCheck,   title: "Confidentiality (NDA)", desc: "Inventory intelligence stays inside the network." },
                { icon: BadgeCheck,    title: "Non-Compete", desc: "Reserved community stays yours while you're active." },
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
            <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20Realty%20%E2%80%94%20I%E2%80%99m%20a%20RERA%20broker%20applying%20to%20the%20Inner%20Circle%20Track.%20Please%20share%20the%20NDA%20to%20get%20started." target="_blank" rel="noopener noreferrer">
              <Button data-testid="button-inner-circle-apply" size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-black h-13 px-10 text-sm rounded-2xl shadow-2xl shadow-amber-900/40">
                <Crown className="w-5 h-5 mr-2" /> Apply for Inner Circle · Sign NDA
              </Button>
            </a>
            <Link href="/realestate">
              <Button data-testid="button-realty-engine" size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 font-black h-13 px-8 text-sm rounded-2xl">
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
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Below-Market Resale Track</h2>
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
                <p className="text-gray-500 text-sm max-w-sm mx-auto">Fill in the basics. We'll generate your referral link + Lead ID and reach out on WhatsApp within 24 hours.</p>
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
                      Get My Referral Link + Lead ID <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No fees · No minimum referrals · Monthly payouts</p>
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
                <p className="text-gray-400 text-sm max-w-sm mx-auto">Your referral link and Lead ID are active. We'll reach out on WhatsApp within 24 hours.</p>
              </div>
              <Card className="bg-emerald-950/40 border-emerald-500/25 rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  {leadId && (
                    <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
                      <Hash className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Lead ID</p>
                        <p className="text-emerald-300 font-black font-mono" data-testid="text-success-lead-id">{leadId}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-4">
                    <code className="flex-1 text-emerald-300 text-sm font-mono break-all text-left">{generatedLink}</code>
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
                    <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%20just%20applied%20as%20a%20broker%20and%20want%20to%20learn%20about%20the%20Inner%20Circle." target="_blank" rel="noopener noreferrer" className="flex-1">
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
