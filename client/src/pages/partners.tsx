import { useState, useRef } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { Link } from "wouter";
import {
  Globe, Users, DollarSign, CheckCircle2, ArrowRight,
  Zap, Shield, Smartphone, MessageCircle, Building2,
  Droplets, ChevronDown, Copy, Check,
  Lock
} from "lucide-react";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const WA_NUMBER = "971523946311";

// ─────────────────────────────────────────────
// Sub-navigation
// ─────────────────────────────────────────────
function PartnersSubMenu({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const items = [
    { label: "Broker Partner", id: "broker-focus" },
    { label: "Home Services Partner", id: "alliance" },
    { label: "Earn Calculator", id: "calculator" },
    { label: "Join Now", id: "join" },
  ];
  return (
    <div className="sticky top-[140px] z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-2">
          <nav className="flex items-center overflow-x-auto no-scrollbar flex-1 min-w-0">
            {items.map((item) => (
              <button
                key={item.id}
                data-testid={`submenu-${item.id}`}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-4 h-16 text-xs font-black uppercase tracking-widest text-gray-300 hover:text-emerald-400 hover:bg-white/5 transition-all whitespace-nowrap border-b-2 border-transparent hover:border-emerald-500"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <a
            href="/marketing"
            data-testid="link-admin"
            className="w-12 h-12 rounded-xl flex items-center justify-center hover:text-emerald-300 hover:bg-emerald-500/25 transition-all shrink-0 ml-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
            aria-label="Marketing Center"
            title="Marketing Center"
          >
            <Lock className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Income Slider
// ─────────────────────────────────────────────
function IncomeSlider() {
  const [referrals, setReferrals] = useState(5);
  const [teamSize, setTeamSize] = useState(10);
  const directEarning = referrals * 350;
  const teamEarning = teamSize * 150;
  const total = directEarning + teamEarning;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-6">
      <h3 className="text-xl font-black text-white uppercase tracking-tight">Income Estimator</h3>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400 font-semibold">Your Monthly Referrals</span>
            <span className="text-emerald-400 font-black text-lg">{referrals}</span>
          </div>
          <input type="range" min={1} max={50} value={referrals} onChange={e => setReferrals(Number(e.target.value))} className="w-full accent-emerald-500" data-testid="slider-referrals" />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>1</span><span>50</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400 font-semibold">Team You've Recruited</span>
            <span className="text-cyan-400 font-black text-lg">{teamSize}</span>
          </div>
          <input type="range" min={0} max={100} value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} className="w-full accent-cyan-500" data-testid="slider-team" />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>0</span><span>100 people</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 pt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Broker Referral Income</span>
          <span className="text-emerald-400 font-black">AED {directEarning.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Team Override Income</span>
          <span className="text-cyan-400 font-black">AED {teamEarning.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-slate-700 pt-3">
          <span className="text-white font-black text-lg">Monthly Total</span>
          <span className="text-3xl font-black text-white">AED {total.toLocaleString()}</span>
        </div>
        <p className="text-[10px] text-gray-600 text-center">Based on average service basket. Actual results vary.</p>
      </div>
      <Link href="/earn">
        <Button data-testid="button-calculator-cta" className="w-full bg-emerald-600 hover:bg-emerald-500 font-black h-12 rounded-2xl">
          Start Earning This → <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
// Join Funnel (3-step form)
// ─────────────────────────────────────────────
const TRACKS = [
  { id: "broker", label: "DeliWer Broker Partner", tagline: "Earn from Dubai move-in referrals", icon: Building2, badge: "🏆 Most Popular", color: "emerald" },
  { id: "aquacafe", label: "Home Services", tagline: "Sell water systems globally", icon: Droplets, badge: "🌍 Global Income", color: "cyan" },
];

function JoinFunnel({ defaultTrack }: { defaultTrack?: string }) {
  const [step, setStep] = useState(1);
  const [track, setTrack] = useState(defaultTrack || "");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", country: "", role: "" });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const ROLES_BROKER = ["Real Estate Broker", "Property Manager", "Leasing Agent", "Building Manager", "Typing Center", "Other"];
  const ROLES_AQUACAFE = ["Health & Wellness Seller", "Online Marketer", "Social Media Influencer", "Side Income Seeker", "Existing Enagic Distributor", "Other"];

  const origin = typeof window !== "undefined" ? window.location.origin : "https://deliwer.com";
  const refCode = form.name ? form.name.toLowerCase().replace(/[^a-z0-9]+/g, "") : "";
  const refLink = refCode
    ? `${origin}/join?ref=${refCode}&refName=${encodeURIComponent(form.name.trim())}${track ? `&track=${track}` : ""}`
    : `${origin}/join?ref=yourname`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share it anywhere to start earning." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    const isAquacafe = track === "aquacafe";
    const intro = isAquacafe
      ? `Hi DeliWer! I want to join the *AquaCafe Alliance* as an Enagic Independent Distributor under Sponsor ID 3A #37000000659 (Rubab Hassan).`
      : `Hi DeliWer! I want to join as a *Broker Partner* and start earning from Dubai move-in referrals.`;
    const msg = buildWhatsAppMessage({
      intro,
      fields: {
        Name: form.name,
        Email: form.email,
        WhatsApp: form.whatsapp,
        Country: form.country,
        Role: form.role,
        Track: track === "broker" ? "DeliWer Broker Partner" : "AquaCafe Alliance (Enagic)",
      },
    });
    openWhatsApp(msg);
    setStep(3);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden">
      <div className="h-1 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center space-y-1 mb-7">
                <div className="text-emerald-400 text-xs font-black uppercase tracking-widest">Step 1 of 3</div>
                <h3 className="text-2xl font-black text-white">Choose Your Path</h3>
                <p className="text-gray-500 text-sm">Both are free. Most earners run both.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {TRACKS.map(t => (
                  <button
                    key={t.id}
                    data-testid={`button-track-${t.id}`}
                    onClick={() => setTrack(t.id)}
                    className={`relative rounded-2xl p-5 border-2 text-left transition-all ${
                      track === t.id
                        ? t.id === "broker" ? "border-emerald-500 bg-emerald-500/10" : "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <span className={`absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full ${t.id === "broker" ? "bg-emerald-500/20 text-emerald-300" : "bg-cyan-500/20 text-cyan-300"}`}>
                      {t.badge}
                    </span>
                    <t.icon className={`w-7 h-7 mb-3 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`} />
                    <div className="font-black text-white text-sm mb-1">{t.label}</div>
                    <div className="text-gray-400 text-xs">{t.tagline}</div>
                    {track === t.id && <CheckCircle2 className={`w-5 h-5 absolute bottom-4 right-4 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`} />}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Name *</Label>
                  <Input data-testid="input-funnel-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp *</Label>
                  <Input data-testid="input-funnel-whatsapp" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="+971 / any country" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
              </div>
              <Button data-testid="button-funnel-next-step1" onClick={() => setStep(2)} disabled={!track || !form.name || !form.whatsapp} size="lg" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-black h-14 text-lg rounded-2xl">
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center space-y-1 mb-7">
                <div className="text-emerald-400 text-xs font-black uppercase tracking-widest">Step 2 of 3</div>
                <h3 className="text-2xl font-black text-white">Complete Your Profile</h3>
                <p className="text-gray-500 text-sm">We activate your account within the same business day</p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address *</Label>
                  <Input data-testid="input-funnel-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Country *</Label>
                    <Input data-testid="input-funnel-country" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="UAE, UK, Philippines..." className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Role *</Label>
                    <Select value={form.role} onValueChange={v => setForm(f => ({ ...f, role: v }))}>
                      <SelectTrigger data-testid="select-funnel-role" className="bg-slate-800 border-slate-600 text-white rounded-xl h-11">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 text-white">
                        {(track === "broker" ? ROLES_BROKER : ROLES_AQUACAFE).map(r => (
                          <SelectItem key={r} value={r} className="hover:bg-slate-700 focus:bg-slate-700">{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your partner link preview</p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-sm flex-1 truncate">{refLink}</span>
                    <button onClick={copyLink} className="text-gray-400 hover:text-white">
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button data-testid="button-funnel-back" onClick={() => setStep(1)} variant="outline" className="border-slate-600 text-gray-400 hover:bg-slate-800 rounded-2xl h-12 px-6">Back</Button>
                <Button data-testid="button-funnel-submit" onClick={handleSubmit} disabled={!form.email || !form.country || !form.role} size="lg" className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-black h-12 rounded-2xl">
                  <MessageCircle className="w-4 h-4 mr-2" /> Submit via WhatsApp
                </Button>
              </div>
              <p className="text-[10px] text-gray-600 text-center mt-3">Opens WhatsApp — no paperwork, no physical presence needed</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2">You're In The Network!</h3>
                <p className="text-gray-400">Your partner link will be activated and sent to your WhatsApp within the same business day.</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 border border-emerald-500/30">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your link will be</p>
                <span className="text-emerald-400 font-mono text-sm">{refLink}</span>
              </div>
              <div className="flex gap-3 justify-center">
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-500 font-black rounded-xl"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Team</Button>
                </a>
                <Button data-testid="button-funnel-restart" onClick={() => { setStep(1); setTrack(""); setForm({ name: "", email: "", whatsapp: "", country: "", role: "" }); }} variant="outline" className="border-slate-600 text-gray-400 rounded-xl">Start Over</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
const FAQS = [
  { q: "Do I need to be in Dubai?", a: "No. Join and operate from anywhere. Dubai customers are reached through your digital link. No physical presence required, ever." },
  { q: "How do I get paid?", a: "Monthly bank transfer or PayPal. Commission is calculated at month end — percentage of DeliWer's vendor coordination fee per confirmed booking." },
  { q: "Do tenants pay extra because of my referral?", a: "Never. Vendors pay DeliWer a coordination fee embedded in their standard pricing. Your commission comes from DeliWer's share — the tenant's total is identical." },
  { q: "What is the Home Services track (AquaCafe / Kangen Alliance)?", a: "DeliWer is an official Enagic sponsor. When you join the Home Services track, you become an independent distributor under our network, earning Enagic's global 8-point commission on water systems sold worldwide." },
  { q: "Can I do both the broker track and Kangen simultaneously?", a: "Yes — and most top earners do. Broker referrals get you immediate Dubai income; Kangen builds compounding worldwide income over time." },
  { q: "How quickly can I start earning?", a: "Same business day. Submit your form → receive your partner link via WhatsApp → share it with your first tenant. First commission unlocked immediately." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button data-testid={`button-faq-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`} className="w-full flex justify-between items-center py-5 text-left gap-4" onClick={() => setOpen(o => !o)}>
        <span className="text-white font-bold text-sm leading-relaxed">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="text-gray-400 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function PartnersPage() {
  const funnelRef = useRef<HTMLDivElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  const scrollToJoin = (track?: string) => {
    if (track) setSelectedTrack(track);
    funnelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta
        title="Partner & Earn — DeliWer Dubai | Broker Career Path + Home Services"
        description="Turn every Dubai tenant referral into income. Broker partners earn AED 150–800 per move-in. Home Services distributors build worldwide passive income via Kangen/Enagic. 100% online, start today."
      />
      <Navigation />
      <PartnersSubMenu onScrollTo={(id) => { const el = document.getElementById(id); el?.scrollIntoView({ behavior: "smooth" }); }} />

      {/* ─── HERO ─── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 rounded-full px-5 py-2 mb-8">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-black text-xs uppercase tracking-widest">Join the DeliWer Network — Step 1</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Partner Path.
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
              Two simple ways to start: become a <span className="text-emerald-400 font-bold">Broker Partner</span> earning from Dubai move-ins, or a <span className="text-cyan-400 font-bold">Home Services Partner</span> selling water systems worldwide. Pick the one that fits — both are free to join.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: Shield, label: "No upfront cost" },
                { icon: Users, label: "Tenants pay the same" },
                { icon: Zap, label: "Start same day" },
                { icon: Globe, label: "Work from anywhere" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-2 text-sm text-gray-300">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                data-testid="button-hero-broker-cta"
                onClick={() => scrollToJoin("broker")}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 px-10 text-base rounded-2xl shadow-lg shadow-emerald-500/20"
              >
                <Building2 className="w-5 h-5 mr-2" /> Join as Broker Partner
              </Button>
              <Button
                data-testid="button-hero-alliance-cta"
                onClick={() => scrollToJoin("aquacafe")}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-black h-14 px-10 text-base rounded-2xl shadow-lg shadow-cyan-500/20"
              >
                <Droplets className="w-5 h-5 mr-2" /> Join Home Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 py-7 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Active Partners", value: "2,400+", color: "text-emerald-400" },
            { label: "Countries", value: "38", color: "text-cyan-400" },
            { label: "Avg Monthly Earn", value: "AED 6,200", color: "text-purple-400" },
            { label: "Activation Time", value: "< 24 hrs", color: "text-amber-400" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CHOOSE YOUR PATH (BASIC INTRO) ─── */}
      <section id="choose-path" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 mb-4">Step 1 · Pick Your Track</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Two Simple Paths.{" "}
              <span className="text-emerald-400">One Network.</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Start with the path that fits you today. You can always add the other later — most top earners run both.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Broker Partner intro card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-emerald-500/30 bg-emerald-950/20 rounded-3xl p-7 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
                <Building2 className="w-7 h-7 text-emerald-400" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 self-start mb-3">🏆 Most Popular Start</Badge>
              <h3 className="text-2xl font-black text-white mb-2">Broker Partner</h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Already work with tenants? Share one link after each lease. We handle Ejari, DEWA, movers, setup — you earn per confirmed booking.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "AED 150–800 per move-in referral",
                  "Zero extra work — share one link",
                  "Monthly bank payouts",
                ].map(p => (
                  <div key={p} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Button
                  data-testid="button-choose-broker"
                  onClick={() => scrollToJoin("broker")}
                  className="bg-emerald-600 hover:bg-emerald-500 font-black h-12 rounded-2xl"
                >
                  <Building2 className="w-4 h-4 mr-2" /> Start as Broker Partner
                </Button>
                <Link href="/brokers">
                  <Button
                    data-testid="button-choose-broker-learn"
                    variant="outline"
                    className="w-full border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black h-11 rounded-2xl"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Home Services Partner intro card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border border-cyan-500/30 bg-cyan-950/20 rounded-3xl p-7 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-5">
                <Droplets className="w-7 h-7 text-cyan-400" />
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 self-start mb-3">🌍 Global Income</Badge>
              <h3 className="text-2xl font-black text-white mb-2">Home Services Partner</h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Sell wellness water systems and home setup kits worldwide under DeliWer's official Enagic sponsorship — start with the AED 99 AquaCafe kit.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "AED 50 bonus + 25% on water orders",
                  "Sell from any country, any time",
                  "Official Enagic sponsor included",
                ].map(p => (
                  <div key={p} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Button
                  data-testid="button-choose-aquacafe"
                  onClick={() => scrollToJoin("aquacafe")}
                  className="bg-cyan-600 hover:bg-cyan-500 font-black h-12 rounded-2xl"
                >
                  <Droplets className="w-4 h-4 mr-2" /> Start as Home Services Partner
                </Button>
                <Link href="/home-services">
                  <Button
                    data-testid="button-choose-aquacafe-learn"
                    variant="outline"
                    className="w-full border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black h-11 rounded-2xl"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Want to see the full growth ladder — Independent Distributor, Network Leader, Global Director?{" "}
              <Link href="/partners/career">
                <span className="text-emerald-400 font-bold hover:text-emerald-300 cursor-pointer underline-offset-4 hover:underline" data-testid="link-full-career-path">
                  Explore the Career Path →
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── BROKER FOCUS SECTION ─── */}
      <section id="broker-focus" className="py-20 px-4 bg-emerald-950/20 border-y border-emerald-500/15">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 mb-5">For Real Estate Brokers</Badge>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
                You Already Work With Tenants.<br />
                <span className="text-emerald-400">You're Leaving AED on the Table.</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                After every lease signing, your tenant still needs Ejari, DEWA activation, movers, and setup. DeliWer handles all of it. You send one WhatsApp message — and earn.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "AED 150–800+ per confirmed booking",
                  "Zero extra work — share one link",
                  "Tenants pay normal vendor rates only",
                  "Monthly bank payouts, full breakdown",
                  "Copy-paste message scripts included",
                  "Team sub-codes — your whole office earns",
                ].map(point => (
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/brokers">
                  <Button data-testid="button-broker-focus-cta" className="bg-emerald-600 hover:bg-emerald-500 font-black h-12 px-8 rounded-2xl">
                    <Building2 className="w-4 h-4 mr-2" /> Get My Broker Link
                  </Button>
                </Link>
                <Link href="/partner-program">
                  <Button data-testid="button-broker-learn-more" variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black h-12 px-8 rounded-2xl">
                    How Attribution Works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Income card */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-900 border border-slate-700 rounded-3xl p-7 space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Your First Month — Realistic</p>
              {[
                { type: "Casual Broker", action: "1 tenant per month", earn: "AED 150–300", note: "Share once after signing" },
                { type: "Active Broker", action: "5 tenants per month", earn: "AED 750–1,500", note: "Regular WhatsApp share" },
                { type: "Power Broker", action: "15 tenants per month", earn: "AED 2,250–4,500", note: "Full team + sub-codes" },
              ].map(({ type, action, earn, note }, i) => (
                <div key={i} className={`rounded-2xl p-4 border ${i === 2 ? "border-emerald-500/40 bg-emerald-950/30" : "border-slate-800 bg-slate-800/50"}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-black text-white text-sm">{type}</span>
                    <span className="text-emerald-400 font-black text-sm">{earn}</span>
                  </div>
                  <div className="text-xs text-gray-500">{action} · {note}</div>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-700">
                <Link href="/brokers">
                  <Button data-testid="button-broker-income-cta" className="w-full bg-emerald-600 hover:bg-emerald-500 font-black rounded-2xl h-11">
                    Start Earning → <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── KANGEN ALLIANCE SECTION ─── */}
      <section id="alliance" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Income card */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 rounded-3xl p-7 space-y-5 order-2 md:order-1">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">Enagic Sponsor Details</p>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-2xl shrink-0">👩‍💼</div>
                <div>
                  <div className="text-xl font-black text-white">Rubab Hassan</div>
                  <div className="text-cyan-400 font-bold text-sm">Enagic Independent Distributor · 3A Rank</div>
                  <div className="text-gray-400 text-xs mt-0.5">Sponsor ID: 3A #37000000659</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Entry", desc: "AED 99 AquaCafe Starter Kit", earn: "AED 50 bonus" },
                  { label: "Distributor", desc: "Sell ionic water systems", earn: "25–35% commission" },
                  { label: "Leader", desc: "Build worldwide downline", earn: "AED 5,000–50,000+/mo" },
                ].map(({ label, desc, earn }, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700">
                    <div>
                      <span className="text-xs font-black text-cyan-400 uppercase tracking-wide">{label}</span>
                      <div className="text-sm text-gray-300">{desc}</div>
                    </div>
                    <span className="text-sm font-black text-white ml-4 shrink-0">{earn}</span>
                  </div>
                ))}
              </div>
              <Link href="/home-services">
                <Button data-testid="button-alliance-cta-card" className="w-full bg-cyan-600 hover:bg-cyan-500 font-black rounded-2xl h-11">
                  <Droplets className="w-4 h-4 mr-2" /> Join Home Services
                </Button>
              </Link>
            </motion.div>

            <div className="order-1 md:order-2">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 mb-5">Home Services · AquaCafe × Kangen</Badge>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
                The Water Business<br />
                <span className="text-cyan-400">That Scales Worldwide.</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Enagic has powered the world's leading ionic water system for 50+ years. DeliWer is your official sponsor — no extra fees, no separate registration. Join our network, sell globally.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Kangen/Enagic water systems — AED 1,299–2,299 commission per unit",
                  "DeliWer is your official sponsor — Rubab Hassan, ID 3A #37000000659",
                  "Sell from any country — Dubai, London, Manila, anywhere",
                  "Build a downline — earn overrides on every level forever",
                  "No monthly fees, no inventory to hold",
                ].map(point => (
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/home-services">
                  <Button data-testid="button-alliance-main-cta" className="bg-cyan-600 hover:bg-cyan-500 font-black h-12 px-8 rounded-2xl">
                    <Droplets className="w-4 h-4 mr-2" /> See Home Services
                  </Button>
                </Link>
                <Link href="/partners/career">
                  <Button data-testid="button-alliance-career-cta" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black h-12 px-8 rounded-2xl">
                    Full Career Path
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INCOME CALCULATOR ─── */}
      <section id="calculator" className="py-20 px-4 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-slate-800 text-gray-400 border-slate-700 mb-4">Income Estimator</Badge>
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              See Your{" "}
              <span className="text-emerald-400">Monthly Potential</span>
            </h2>
          </div>
          <div className="max-w-lg mx-auto">
            <IncomeSlider />
          </div>
        </div>
      </section>

      {/* ─── JOIN FORM ─── */}
      <section id="join" className="py-24 px-4" ref={funnelRef}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="bg-slate-800 text-gray-400 border-slate-700 mb-5">Free to Join · Activate Today</Badge>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
                Ready to{" "}
                <span className="text-emerald-400">Start Earning?</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Fill out the form — our team activates your partner link via WhatsApp within the same business day. No paperwork, no meetings, no upfront cost.
              </p>

              {/* What happens next */}
              <div className="space-y-4">
                {[
                  { icon: Zap, color: "emerald", title: "Same-day activation", desc: "Partner link sent to your WhatsApp within hours" },
                  { icon: Smartphone, color: "cyan", title: "Digital ID + QR code", desc: "Share anywhere — social, WhatsApp, email, in person" },
                  { icon: DollarSign, color: "purple", title: "First commission within days", desc: "As soon as your first referral converts" },
                ].map(({ icon: Icon, color, title, desc }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-${color}-500/15 border border-${color}-500/30`}>
                      <Icon className={`w-5 h-5 text-${color}-400`} />
                    </div>
                    <div>
                      <div className="font-black text-white text-sm">{title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Or message us directly</p>
                <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20DeliWer!%20I%20want%20to%20join%20as%20a%20partner.`} target="_blank" rel="noopener noreferrer">
                  <Button data-testid="button-whatsapp-direct" className="bg-green-600 hover:bg-green-500 font-black w-full h-11 rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp: +971 52 394 6311
                  </Button>
                </a>
              </div>
            </div>

            <JoinFunnel defaultTrack={selectedTrack} />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-10 text-center">Common Questions</h2>
          <div>
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20DeliWer%2C%20I%20have%20a%20question%20about%20the%20partner%20program.`} target="_blank" rel="noopener noreferrer">
              <Button data-testid="button-faq-whatsapp" variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800 font-black rounded-xl">
                <MessageCircle className="w-4 h-4 mr-2" /> Ask Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
