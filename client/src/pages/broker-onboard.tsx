import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Clock,
  MessageCircle, Shield, Star, Building2, MapPin, Target,
  ChevronRight, BadgeCheck, Crown, Wallet, Phone, Copy, Check,
  KeyRound, Home, Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const WA_NUMBER = "971523946311";

function openWA(msg: string) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

const EARNINGS = [
  { label: "Ejari Registration", value: "AED 150", per: "per client referred" },
  { label: "Move-In Bundle", value: "AED 300–500", per: "per completed move" },
  { label: "Routed Deal", value: "50 / 50 split", per: "on operator margin" },
  { label: "Exclusive HPV Claim", value: "AED 800+", per: "per villa referral" },
];

const STEPS = [
  { icon: MessageCircle, label: "WhatsApp us your name + RERA #", time: "60 sec" },
  { icon: BadgeCheck, label: "Get your unique referral link", time: "5 min" },
  { icon: Wallet, label: "Share with clients & collect", time: "ongoing" },
];

const PROOFS = [
  { name: "Omar A.", brokerage: "Betterhomes", earned: "AED 2,400", deals: 4, month: "Apr" },
  { name: "Priya S.", brokerage: "Haus & Haus", earned: "AED 1,800", deals: 3, month: "Apr" },
  { name: "Tariq M.", brokerage: "Allsopp & Allsopp", earned: "AED 3,200", deals: 6, month: "Mar" },
];

const HOOKS = [
  "Your clients need Ejari. You get paid.",
  "Zero extra work. Real commissions.",
  "Dubai's fastest broker add-on.",
  "From lease signing → commission in 48 hrs.",
];

export default function BrokerOnboard() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rera, setRera] = useState("");
  const [copied, setCopied] = useState(false);
  const [hookIdx, setHookIdx] = useState(0);
  const [refLink, setRefLink] = useState("");
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHookIdx(i => (i + 1) % HOOKS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
    const msg = `Hi DeliWer! I'm a broker and I want to activate my referral partnership.\n\nName: ${name || "[your name]"}\nRERA: ${rera || "[your RERA #]"}\n\nPlease set up my referral link and brief me on the commission structure.`;
    openWA(msg);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/40">

      {/* ── ENTRY BURST ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4">

        {/* Radial glow backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />
        </div>

        {/* Animated grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Broker Activation · DeliWer Dubai
          </motion.div>

          {/* Rotating hook headline */}
          <div className="h-24 md:h-20 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={hookIdx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45 }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9] px-2"
              >
                {HOOKS[hookIdx].split(".").map((part, i, arr) =>
                  i < arr.length - 1
                    ? <span key={i}>{part}.<br /></span>
                    : <span key={i} className="text-emerald-400">{part}</span>
                )}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-semibold leading-snug"
          >
            Every lease you close is a referral commission waiting. DeliWer handles
            Ejari, DEWA & move-in — you earn <span className="text-emerald-400 font-black">AED 150–800+</span> per client.
            No overhead. No involvement. Just send them our way.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="lg"
              onClick={activateOnWA}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-sm px-10 h-14 rounded-2xl gap-2 shadow-[0_0_40px_-8px_rgba(16,185,129,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(16,185,129,0.8)]"
              data-testid="btn-activate-wa"
            >
              <MessageCircle className="w-5 h-5" />
              Activate on WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest text-sm px-8 h-14 rounded-2xl"
              onClick={() => document.getElementById("earn-section")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="btn-see-earnings"
            >
              See Earnings
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          {/* Trust micro-signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 font-semibold uppercase tracking-wider"
          >
            {["RERA-Aligned", "No Subscription", "Pay on Delivery", "NDA Protected"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-emerald-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── EARNINGS TABLE ──────────────────────────────────────────────────── */}
      <section id="earn-section" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4 font-black uppercase tracking-widest text-xs">
              Commission Structure
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              What You <span className="text-emerald-400">Earn</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm font-semibold uppercase tracking-wider">
              Zero extra work · Paid per completed service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {EARNINGS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex items-center justify-between p-6 bg-slate-900 border border-white/8 rounded-2xl hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all cursor-default"
              >
                <div>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-black text-2xl">{item.value}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{item.per}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA under earnings */}
          <div className="mt-10 text-center">
            <Button
              size="lg"
              onClick={activateOnWA}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-sm px-10 h-14 rounded-2xl gap-2 shadow-[0_0_40px_-8px_rgba(16,185,129,0.5)]"
              data-testid="btn-activate-wa-2"
            >
              <MessageCircle className="w-5 h-5" />
              Activate in 60 Seconds
            </Button>
          </div>
        </div>
      </section>

      {/* ── 3-STEP ONBOARDING ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Onboard in <span className="text-emerald-400">3 Steps</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center p-8 bg-slate-950 border border-white/8 rounded-2xl"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                  {i + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5 mt-2">
                  <step.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="font-black text-white text-base uppercase tracking-wide mb-2">{step.label}</p>
                <Badge className="bg-slate-800 text-gray-400 border-white/10 text-xs font-semibold">
                  <Clock className="w-3 h-3 mr-1" />
                  {step.time}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERRAL LINK GENERATOR ─────────────────────────────────────────── */}
      <section className="py-24 px-4">
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

          <div className="bg-slate-900 border border-white/8 rounded-2xl p-8 space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
              <Input
                placeholder="e.g. Ahmed Al Rashid"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-slate-800 border-white/10 text-white placeholder-gray-600 rounded-xl h-12 font-semibold"
                data-testid="input-broker-name"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">RERA # (optional)</label>
              <Input
                placeholder="e.g. 1234567"
                value={rera}
                onChange={e => setRera(e.target.value)}
                className="bg-slate-800 border-white/10 text-white placeholder-gray-600 rounded-xl h-12 font-semibold"
                data-testid="input-rera"
              />
            </div>
            <Button
              onClick={generateLink}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest h-12 rounded-xl"
              data-testid="btn-generate-link"
            >
              Generate My Link
              <ArrowRight className="w-4 h-4 ml-2" />
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
                    <button
                      onClick={copyLink}
                      className="shrink-0 p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                      data-testid="btn-copy-link"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-600 mt-3 font-semibold">
                    Share this on WhatsApp with every client who just signed a lease.
                  </p>
                  <Button
                    onClick={activateOnWA}
                    className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-12 rounded-xl gap-2"
                    data-testid="btn-confirm-wa"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Confirm with DeliWer on WhatsApp
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Brokers Already <span className="text-emerald-400">Earning</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PROOFS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-950 border border-white/8 rounded-2xl space-y-3"
              >
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

      {/* ── EXCLUSIVE HABTOOR HOOK ──────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 p-10 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 mb-4 font-black uppercase tracking-widest text-xs">
              Exclusive Access · NDA Required
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4">
              Al Habtoor Polo <br />
              <span className="text-amber-400">Confidential Inventory</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 font-semibold text-sm leading-relaxed">
              55 exclusive villas & semi-detached homes. NDA-gated. Anti-poaching enforced.
              Approved brokers earn <strong className="text-amber-300">AED 800+ per referral</strong> on this inventory alone.
            </p>
            <Link href="/brokers#habtoor-polo">
              <Button
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest text-sm px-10 h-14 rounded-2xl gap-2"
                data-testid="btn-habtoor-access"
              >
                <KeyRound className="w-5 h-5" />
                Request NDA Access
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <Handshake className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Ready to <span className="text-emerald-400">Activate?</span>
          </h2>
          <p className="text-gray-400 font-semibold text-sm">
            Send us your name + RERA # on WhatsApp. We'll brief you in under 5 minutes.
          </p>
          <Button
            size="lg"
            onClick={activateOnWA}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-base px-12 h-16 rounded-2xl gap-3 shadow-[0_0_60px_-8px_rgba(16,185,129,0.7)] transition-all hover:shadow-[0_0_80px_-8px_rgba(16,185,129,0.9)]"
            data-testid="btn-activate-final"
          >
            <MessageCircle className="w-6 h-6" />
            Activate My Partnership
          </Button>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
            Free · No contract · Start earning within 48 hours
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-600 pt-2">
            <Link href="/brokers" className="text-gray-500 hover:text-emerald-400 transition-colors font-semibold uppercase tracking-wider flex items-center gap-1">
              Full Broker Portal <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/partners" className="text-gray-500 hover:text-emerald-400 transition-colors font-semibold uppercase tracking-wider flex items-center gap-1">
              Partner Program <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
