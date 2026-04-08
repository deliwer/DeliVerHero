import { useState, useEffect, useRef } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2, MessageCircle, Copy, Check, ShieldCheck,
  Star, Building2, ChevronDown, ChevronUp, QrCode, Zap,
  Home, ArrowRight, Users, TrendingUp, Clock, Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp, logEvent } from "@/lib/referral";

const WA_NUMBER = "971523946311";

function openWA(msg: string) {
  openWhatsApp(msg);
}

const STEPS = [
  { n: "01", icon: Send,      title: "Share Your Link",          desc: "Send your personal referral link to clients after property viewing or lease signing." },
  { n: "02", icon: Home,      title: "DeliWer Handles Move-In",  desc: "Ejari, DEWA, movers, cleaning, internet — all coordinated in one place for your client." },
  { n: "03", icon: TrendingUp,title: "Your Client Is Fully Settled",desc: "Earn commission on completed services while your client gets a seamless move-in experience. No operational burden on your end." },
];

const EARNINGS = [
  { type: "Studio",    range: "AED 150 – 300",  color: "from-purple-600/20 to-purple-700/10", border: "border-purple-500/25" },
  { type: "1 Bedroom", range: "AED 300 – 600",  color: "from-emerald-600/20 to-emerald-700/10", border: "border-emerald-500/25" },
  { type: "Villa",     range: "AED 800+",        color: "from-amber-600/20 to-amber-700/10", border: "border-amber-500/25" },
];

const WHEN_TO_SEND = [
  { trigger: "After Property Viewing",    icon: Building2, tip: "Send while the excitement is fresh — 'Here's how to sort everything before you move in.'" },
  { trigger: "After Lease Signing",       icon: CheckCircle2, tip: "Perfect moment. Client is committed. Send immediately after they sign the tenancy contract." },
  { trigger: "When Client Asks 'What Next?'", icon: MessageCircle, tip: "Be the broker who has all the answers. Share the link and let DeliWer close the loop." },
];

const SCRIPTS = [
  {
    title: "After Property Viewing",
    scenario: "Send after the viewing when client is interested",
    script: `Hi [Tenant Name], great speaking with you today! 🏠

If this is the one, here's how to sort everything fast:

DeliWer handles Ejari, DEWA, movers and setup in one place.

[YOUR REFERRAL LINK]

They'll contact you directly on WhatsApp. Makes the whole process stress-free.`,
  },
  {
    title: "After Lease Signing",
    scenario: "Send immediately after tenant signs the tenancy contract",
    script: `Hi [Tenant Name], congratulations on your new home! 🎉

One thing I always recommend — DeliWer handles everything you need after getting your keys: Ejari, DEWA setup, movers, and cleaning.

Here's the link — they'll contact you directly:

[YOUR REFERRAL LINK]

They respond fast on WhatsApp. Makes the whole move-in stress-free.`,
  },
  {
    title: "Pre-Move-In Follow-Up",
    scenario: "Send 1–2 weeks before the tenant's move-in date",
    script: `Hi [Tenant Name], your move-in is coming up soon!

Have you sorted Ejari, DEWA, movers, and cleaning yet?

I have a trusted partner that coordinates everything in one go:

[YOUR REFERRAL LINK]

Let me know if you need anything else!`,
  },
  {
    title: "WhatsApp Outreach (Cold Broker)",
    scenario: "For brokers inviting other brokers into the network",
    script: `Hi [Name], quick one — we help your tenants complete move-in (Ejari, movers, setup) in one flow.

You close faster + earn per client.

Want your referral link? → [YOUR REFERRAL LINK]`,
  },
];

const TRUST = [
  { icon: Users,      label: "Serving tenants across Dubai" },
  { icon: ShieldCheck,label: "Partner network execution" },
  { icon: Clock,      label: "Fast response via WhatsApp" },
  { icon: Star,       label: "RERA Trustee Centre" },
];

function cleanName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
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
      <canvas
        ref={canvasRef}
        className={`rounded-xl border border-purple-500/30 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        style={{ width: 160, height: 160 }}
      />
      {!ready && (
        <div className="w-40 h-40 rounded-xl border border-purple-500/30 bg-slate-800 animate-pulse" />
      )}
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
  const generatorRef = useRef<HTMLDivElement>(null);
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
    logEvent({ ref, page: "/broker-partner", timestamp: new Date().toISOString(), action: "link_generated" });
    toast({ title: "Your referral link is ready!", description: "Copy it and start sharing with clients." });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleGenerate();
  }

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
    logEvent({ ref: generatedRef, page: "/broker-partner", timestamp: new Date().toISOString(), action: "whatsapp_click" });
  }

  function handleJoinWhatsApp() {
    openWA(buildWhatsAppMessage({
      intro: "Hi DeliWer, I'm a real estate broker interested in the partner referral program.",
      fields: { Name: partnerName || undefined },
    }));
  }

  async function copyScript(idx: number, text: string) {
    const link = generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE";
    await navigator.clipboard.writeText(text.replace(/\[YOUR REFERRAL LINK\]/g, link));
    setCopiedScript(idx);
    toast({ title: "Script copied!", description: "Replace [Tenant Name] and paste into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  }

  function scrollToGenerator() {
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 md:pb-0">
      <SEOMeta
        title="Professional Partner Program | Complete Client Experience | DeliWer Dubai"
        description="DeliWer enhances what happens after the property deal. Brokers, developers, and landlords partner with DeliWer to deliver a complete, frictionless client experience — without additional operational workload."
      />

      <Navigation />
      <PartnerSubNav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&q=80"
            alt="Dubai real estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/97 via-purple-950/75 to-slate-950/95" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-7">
          {/* Text readability scrim */}
          <div className="absolute inset-x-0 -inset-y-12 -z-10 bg-slate-950/70 blur-2xl rounded-3xl pointer-events-none" />

          <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
            Professional Partner Program
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase drop-shadow-2xl">
            Deliver a Complete<br />
            <span className="text-purple-400">Client Experience.</span>
          </h1>

          <p className="text-lg text-gray-200 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-lg bg-slate-950/40 rounded-2xl px-5 py-3 backdrop-blur-sm border border-white/5">
            DeliWer does not participate in property transactions — we enhance what happens after. Help your clients move in without operational burden on your end.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              data-testid="button-broker-generate-hero"
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-lg shadow-2xl"
              onClick={scrollToGenerator}
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate My Referral Link
            </Button>
            <Button
              data-testid="button-broker-join-wa"
              size="lg"
              variant="outline"
              className="border-white/15 text-white hover:bg-white/5 font-black rounded-2xl px-8 h-14 text-base"
              onClick={handleJoinWhatsApp}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join via WhatsApp
            </Button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2" data-testid="hero-trust-strip">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">How It Works</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-10">Three Steps to a Complete Experience</h2>
          <div className="space-y-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-black text-purple-400/50 tracking-widest">{s.n}</span>
                    <p className="font-black text-white uppercase tracking-tight text-sm">{s.title}</p>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARNINGS EXAMPLES ─────────────────────────────── */}
      <section className="py-14 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Earnings Examples</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-8">What You Earn Per Referral</h2>
          <div className="grid grid-cols-3 gap-4">
            {EARNINGS.map((e) => (
              <div
                key={e.type}
                data-testid={`earning-card-${e.type.replace(/\s/g, "-").toLowerCase()}`}
                className={`rounded-2xl border ${e.border} bg-gradient-to-b ${e.color} p-5 text-center`}
              >
                <div className="text-xl md:text-2xl font-black text-white leading-none mb-2">{e.range}</div>
                <div className="text-[11px] text-gray-400 font-semibold">{e.type}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-gray-600 mt-4">
            Commission based on completed services. Exact rates confirmed on WhatsApp.
          </p>
        </div>
      </section>

      {/* ── LINK GENERATOR ────────────────────────────────── */}
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
            <Button
              data-testid="button-broker-generate"
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-12 px-6 shrink-0"
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </div>

          {generatedLink ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Link display */}
              <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1 text-sm text-purple-300 font-mono break-all">{generatedLink}</div>
                <Button
                  data-testid="button-broker-copy"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg shrink-0"
                  onClick={copyLink}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  data-testid="button-broker-copy-link"
                  className="bg-slate-700 hover:bg-slate-600 text-white font-black rounded-xl h-11"
                  onClick={copyLink}
                >
                  {copied ? <><Check className="w-4 h-4 mr-2" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy Link</>}
                </Button>
                <Button
                  data-testid="button-broker-share-whatsapp"
                  className="bg-green-600 hover:bg-green-500 text-white font-black rounded-xl h-11"
                  onClick={shareOnWhatsApp}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </Button>
              </div>

              {/* QR Code toggle */}
              <button
                data-testid="button-broker-toggle-qr"
                className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-xs font-semibold transition-colors mx-auto"
                onClick={() => setShowQR(v => !v)}
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR ? "Hide QR Code" : "Show QR Code"}
                {showQR ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showQR && (
                <div className="flex justify-center py-2 animate-in fade-in duration-200">
                  <QRCodeDisplay url={generatedLink} />
                </div>
              )}

              {/* WhatsApp share message preview */}
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest mb-2">Your WhatsApp Share Message</p>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  "I help my clients complete their move-in (Ejari, movers, setup) in one place. Start here: {generatedLink}"
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-600">
              <QrCode className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Enter your name above to generate your unique referral link</p>
            </div>
          )}
        </div>
      </section>

      {/* ── WHEN TO SEND ──────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Activation Instructions</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-8">When to Send Your Link</h2>
          <div className="space-y-4">
            {WHEN_TO_SEND.map((item, i) => (
              <div
                key={i}
                data-testid={`when-to-send-${i}`}
                className="flex gap-4 bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-tight mb-1">{item.trigger}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCRIPTS ───────────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-white/5 bg-slate-900/20">
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
                    <Button
                      data-testid={`button-broker-copy-script-${i}`}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-4 h-8 text-xs"
                      onClick={() => copyScript(i, s.script)}
                    >
                      {copiedScript === i ? <><Check className="w-3 h-3 mr-1" />Copied!</> : <><Copy className="w-3 h-3 mr-1" />Copy Script</>}
                    </Button>
                    <Button
                      data-testid={`button-broker-send-script-wa-${i}`}
                      size="sm"
                      className="bg-green-700 hover:bg-green-600 text-white font-black rounded-xl px-4 h-8 text-xs"
                      onClick={() => {
                        const msg = s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE").replace(/\[Tenant Name\]/g, "");
                        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                      }}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Send on WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── EMAIL SCRIPTS INFO ────────────────────────────── */}
      <section className="py-14 px-4 border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Outreach Templates</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-8">Email Subject Lines That Work</h2>
          <div className="space-y-3">
            {[
              { subject: "Close Deals Faster (Without Extra Work)", num: "01" },
              { subject: "Earn Extra Per Client (No Effort)", num: "02" },
              { subject: "Your Clients Are Already Asking 'What Next?'", num: "03" },
            ].map((e) => (
              <div key={e.num} className="flex gap-4 items-center bg-slate-900 border border-white/5 rounded-xl px-5 py-4">
                <span className="text-purple-400/40 font-black text-lg w-8 shrink-0">{e.num}</span>
                <p className="text-white text-sm font-semibold">"{e.subject}"</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-gray-600 mt-4">
            Include your referral link and a CTA to generate theirs.{" "}
            <button
              data-testid="button-broker-email-wa"
              className="text-purple-400 underline underline-offset-2"
              onClick={handleJoinWhatsApp}
            >
              Request email templates via WhatsApp →
            </button>
          </p>
        </div>
      </section>

      {/* ── RETENTION LOOP ────────────────────────────────── */}
      <section className="py-14 px-4 border-b border-white/5 bg-slate-900/30">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Retention Loop</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">After Every Conversion</h2>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-6 text-left max-w-lg mx-auto">
            <p className="text-gray-400 text-sm leading-relaxed italic">
              "Your client completed move-in. You earned AED X. Send your next client here: 
              <span className="text-emerald-400 font-mono"> [YOUR REFERRAL LINK]</span>"
            </p>
          </div>
          <p className="text-gray-600 text-[11px]">
            We notify you on WhatsApp after each successful move-in coordination.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
            <ArrowRight className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Partner With DeliWer</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Professionals partner instantly. Generate your referral link above or connect via WhatsApp in minutes.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              data-testid="button-broker-generate-cta"
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-2xl w-full"
              onClick={scrollToGenerator}
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate My Referral Link
            </Button>
            <Button
              data-testid="button-broker-final-wa"
              size="lg"
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 font-black rounded-2xl px-10 h-12 text-sm w-full"
              onClick={handleJoinWhatsApp}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join the Partner Program via WhatsApp
            </Button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Icon className="w-3 h-3 text-purple-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE BAR ─────────────────────────────── */}
      <div
        data-testid="sticky-mobile-bar"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 p-3"
      >
        <Button
          data-testid="button-sticky-start-move-in"
          size="lg"
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-12 text-sm shadow-2xl"
          onClick={scrollToGenerator}
        >
          <Zap className="w-4 h-4 mr-2" />
          Generate My Referral Link
        </Button>
      </div>
    </div>
  );
}
