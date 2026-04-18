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
  Globe, Users, TrendingUp, DollarSign, CheckCircle2, ArrowRight, Network,
  Zap, Star, Crown, Shield, Smartphone, MessageCircle, MapPin, Building2,
  Droplets, ChevronDown, ChevronRight, Copy, Check, Home, Rocket, Award,
  RefreshCw, BarChart2, Target, Eye, Clock, Wifi, UserPlus, Layers,
  Play, XCircle
} from "lucide-react";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const TRACKS = [
  {
    id: "broker",
    label: "DeliWer Broker Partner",
    tagline: "Earn from every Dubai move-in referral",
    color: "emerald",
    gradient: "from-emerald-600 to-teal-600",
    accent: "emerald",
    icon: Building2,
    badge: "🏆 Most Popular",
    perks: [
      "AED 150–800+ per client referred",
      "Earn from tenants you already work with",
      "Zero tenant markup — you add real value",
      "Team override commissions on agents you recruit",
      "Monthly bank payouts, no delays",
      "100% online — share a link, done",
    ],
    cta: "Join as Broker Partner",
  },
  {
    id: "aquacafe",
    label: "AquaCafe Alliance",
    tagline: "Sell water systems globally. Earn forever.",
    color: "cyan",
    gradient: "from-cyan-600 to-blue-600",
    accent: "cyan",
    icon: Droplets,
    badge: "🌍 Global Income",
    perks: [
      "Kangen/ionic water systems sold worldwide",
      "DeliWer is your official sponsor — no extra cost",
      "Earn on every unit sold in your downline",
      "Homes in Dubai, London, Manila — any city",
      "No physical meetings needed — fully online",
      "Recurring income as your network grows",
    ],
    cta: "Join AquaCafe Alliance",
  },
];

const COMMISSION_LEVELS = [
  { level: "Starter", monthly: "AED 500–1,500", team: "0–2 people", color: "slate", req: "First 1–2 referrals" },
  { level: "Associate", monthly: "AED 2,000–5,000", team: "3–10 people", color: "emerald", req: "3 active referrals" },
  { level: "Leader", monthly: "AED 6,000–15,000", team: "11–30 people", color: "cyan", req: "10+ referrals or 2 team leaders" },
  { level: "Director", monthly: "AED 18,000–40,000", team: "31–100 people", color: "purple", req: "3 Leaders under you" },
  { level: "Global", monthly: "AED 50,000+", team: "100+ people", color: "amber", req: "5 Directors in network" },
];

const HOW_IT_WORKS = [
  { step: 1, icon: UserPlus, title: "Register Online", desc: "Fill out the form below — no physical presence, no paperwork, no signature required.", color: "emerald" },
  { step: 2, icon: Smartphone, title: "Get Your Digital ID", desc: "Receive your unique partner link and QR code instantly via WhatsApp.", color: "cyan" },
  { step: 3, icon: Network, title: "Build Your Network", desc: "Refer clients or recruit team members from anywhere in the world. They join under your sponsorship.", color: "purple" },
  { step: 4, icon: DollarSign, title: "Earn Globally", desc: "Every sale in your network earns you override commissions — automatically, every month.", color: "amber" },
];

const NETWORK_NODES = [
  { label: "You", level: 0, x: 50, earnings: "Direct: 35%" },
  { label: "Partner A", level: 1, x: 20, earnings: "Override: 10%" },
  { label: "Partner B", level: 1, x: 50, earnings: "Override: 10%" },
  { label: "Partner C", level: 1, x: 80, earnings: "Override: 10%" },
  { label: "Sub A1", level: 2, x: 10, earnings: "3rd: 5%" },
  { label: "Sub A2", level: 2, x: 30, earnings: "3rd: 5%" },
  { label: "Sub B1", level: 2, x: 45, earnings: "3rd: 5%" },
  { label: "Sub B2", level: 2, x: 60, earnings: "3rd: 5%" },
  { label: "Sub C1", level: 2, x: 75, earnings: "3rd: 5%" },
];

const FAQS = [
  { q: "Do I need to be based in Dubai?", a: "No. You can join and operate from anywhere in the world. Dubai customers are targeted through your digital link — you never need to be there in person." },
  { q: "How do I get paid?", a: "Monthly bank transfer or PayPal. You track earnings in your partner dashboard in real time." },
  { q: "What is the AquaCafe Alliance vs Enagic?", a: "DeliWer is an official Enagic sponsor. When you join the AquaCafe Alliance, you become an independent distributor under our network, benefiting from Enagic's global 8-point compensation without any extra registration fee." },
  { q: "Is this an MLM?", a: "Yes, it follows a network marketing structure similar to Enagic — you earn direct commissions plus overrides on your team's sales. There are no monthly fees, no inventory to hold." },
  { q: "How quickly can I start?", a: "The moment your form is submitted, our team activates your ID within the same business day. Your link goes live and you can share it immediately." },
  { q: "Can I do both tracks simultaneously?", a: "Absolutely. Many partners earn from DeliWer move-in referrals AND the AquaCafe water system distributor program simultaneously." },
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function NetworkTree() {
  const colors: Record<number, string> = { 0: "#10b981", 1: "#06b6d4", 2: "#8b5cf6" };
  return (
    <div className="relative w-full h-56 select-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Level 0 → Level 1 */}
        {[20, 50, 80].map((x) => (
          <line key={x} x1="50" y1="12" x2={x} y2="42" stroke="#1e293b" strokeWidth="0.8" />
        ))}
        {/* Level 1 → Level 2 */}
        {[[20, 10], [20, 30], [50, 45], [50, 60], [80, 75]].map(([x1, x2], i) => (
          <line key={i} x1={x1} y1="42" x2={x2} y2="72" stroke="#1e293b" strokeWidth="0.5" />
        ))}
      </svg>
      {NETWORK_NODES.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute flex flex-col items-center"
          style={{ left: `${node.x}%`, top: node.level === 0 ? "0%" : node.level === 1 ? "38%" : "68%", transform: "translateX(-50%)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-lg border-2"
            style={{ background: colors[node.level], borderColor: colors[node.level] + "80" }}
          >
            {node.level === 0 ? <Crown className="w-4 h-4" /> : <Users className="w-3 h-3" />}
          </div>
          <span className="text-[8px] text-gray-400 font-semibold mt-0.5 whitespace-nowrap">{node.label}</span>
          <span className="text-[7px] text-emerald-400 font-black">{node.earnings}</span>
        </motion.div>
      ))}
    </div>
  );
}

function IncomeSlider() {
  const [referrals, setReferrals] = useState(5);
  const [teamSize, setTeamSize] = useState(10);
  const directEarning = referrals * 350;
  const teamEarning = teamSize * 150;
  const total = directEarning + teamEarning;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-6">
      <h3 className="text-xl font-black text-white uppercase tracking-tight">Income Estimator</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400 font-semibold">Your Monthly Referrals</span>
            <span className="text-emerald-400 font-black">{referrals}</span>
          </div>
          <input type="range" min={1} max={50} value={referrals} onChange={e => setReferrals(Number(e.target.value))} className="w-full accent-emerald-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400 font-semibold">Team Size (people you recruit)</span>
            <span className="text-cyan-400 font-black">{teamSize}</span>
          </div>
          <input type="range" min={0} max={100} value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} className="w-full accent-cyan-500" />
        </div>
      </div>
      <div className="border-t border-slate-700 pt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Direct Referral Income</span>
          <span className="text-emerald-400 font-black">AED {directEarning.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Team Override Income</span>
          <span className="text-cyan-400 font-black">AED {teamEarning.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-slate-700 pt-3">
          <span className="text-white font-black text-lg">Est. Monthly Total</span>
          <span className="text-3xl font-black text-white">AED {total.toLocaleString()}</span>
        </div>
        <p className="text-[10px] text-gray-600 text-center">Estimates based on average service basket. Actual earnings vary.</p>
      </div>
    </div>
  );
}

function JoinFunnel({ defaultTrack }: { defaultTrack?: string }) {
  const [step, setStep] = useState(1);
  const [track, setTrack] = useState(defaultTrack || "");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", country: "", role: "" });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const ROLES_BROKER = ["Real Estate Broker", "Property Manager", "Leasing Agent", "Building Manager", "Typing Center", "Other"];
  const ROLES_AQUACAFE = ["Health & Wellness Seller", "Online Marketer", "Social Media Influencer", "Side Income Seeker", "Existing Enagic Distributor", "Other"];

  const isValid = form.name && form.whatsapp && (step < 2 || (form.email && form.country && form.role));

  const handleSubmit = () => {
    const isAquacafe = track === "aquacafe";
    const enagicNote = isAquacafe
      ? `\n\n*Enagic Sponsor Details:*\nSponsor: Rubab Hassan\nID: 3A #37000000659\nPlease register at: https://www.enagic.com using my Sponsor ID above.`
      : "";
    const intro = isAquacafe
      ? `Hi DeliWer! I want to join the *AquaCafe Alliance* as an Enagic Independent Distributor under Sponsor ID 3A #37000000659 (Rubab Hassan).${enagicNote}`
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

  const refLink = form.name ? `deliwer.com/join?ref=${form.name.toLowerCase().replace(/\s+/g, "")}&track=${track}` : "deliwer.com/join?ref=yourname";

  const copyLink = async () => {
    await navigator.clipboard.writeText("https://" + refLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share it anywhere to start earning." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose track */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center space-y-2 mb-8">
                <div className="text-emerald-400 text-xs font-black uppercase tracking-widest">Step 1 of 3</div>
                <h3 className="text-2xl font-black text-white">Choose Your Path</h3>
                <p className="text-gray-400 text-sm">Both are free to join. You can do both simultaneously.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {TRACKS.map(t => (
                  <button
                    key={t.id}
                    data-testid={`button-track-${t.id}`}
                    onClick={() => setTrack(t.id)}
                    className={`relative rounded-2xl p-5 border-2 text-left transition-all duration-200 ${
                      track === t.id
                        ? t.id === "broker"
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <div className={`absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full ${t.id === "broker" ? "bg-emerald-500/20 text-emerald-300" : "bg-cyan-500/20 text-cyan-300"}`}>
                      {t.badge}
                    </div>
                    <t.icon className={`w-7 h-7 mb-3 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`} />
                    <div className="font-black text-white text-sm mb-1">{t.label}</div>
                    <div className="text-gray-400 text-xs leading-relaxed">{t.tagline}</div>
                    {track === t.id && (
                      <CheckCircle2 className={`w-5 h-5 absolute bottom-4 right-4 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`} />
                    )}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Name *</Label>
                  <Input
                    data-testid="input-funnel-name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full name"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp *</Label>
                  <Input
                    data-testid="input-funnel-whatsapp"
                    value={form.whatsapp}
                    onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                    placeholder="+971 / any country"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
              </div>
              <Button
                data-testid="button-funnel-next-step1"
                onClick={() => setStep(2)}
                disabled={!track || !form.name || !form.whatsapp}
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black h-14 text-lg rounded-2xl"
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center space-y-2 mb-8">
                <div className="text-emerald-400 text-xs font-black uppercase tracking-widest">Step 2 of 3</div>
                <h3 className="text-2xl font-black text-white">Complete Your Profile</h3>
                <p className="text-gray-400 text-sm">So we can activate your account and partner link</p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address *</Label>
                  <Input
                    data-testid="input-funnel-email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    type="email"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Country *</Label>
                    <Input
                      data-testid="input-funnel-country"
                      value={form.country}
                      onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                      placeholder="UAE, UK, Philippines..."
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                    />
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
                {/* Preview link */}
                <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your partner link preview</p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-sm flex-1 truncate">{refLink}</span>
                    <button onClick={copyLink} className="text-gray-400 hover:text-white transition-colors">
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  data-testid="button-funnel-back"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="border-slate-600 text-gray-400 hover:bg-slate-800 rounded-2xl h-12 px-6"
                >
                  Back
                </Button>
                <Button
                  data-testid="button-funnel-submit"
                  onClick={handleSubmit}
                  disabled={!form.email || !form.country || !form.role}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black h-12 text-base rounded-2xl"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Submit via WhatsApp
                </Button>
              </div>
              <p className="text-[10px] text-gray-600 text-center mt-3">
                Submitting opens WhatsApp — no signature or physical docs required.
              </p>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2">You're In The Network!</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our team will activate your partner ID and send you your personalized link on WhatsApp within the same business day.
                </p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 border border-emerald-500/30">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your link will be</p>
                <span className="text-emerald-400 font-mono text-sm">{refLink}</span>
              </div>
              <div className="flex gap-3 justify-center">
                <a href="https://wa.me/971523946311" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-500 text-white font-black rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Team
                  </Button>
                </a>
                <Button
                  data-testid="button-funnel-restart"
                  onClick={() => { setStep(1); setTrack(""); setForm({ name: "", email: "", whatsapp: "", country: "", role: "" }); }}
                  variant="outline"
                  className="border-slate-600 text-gray-400 rounded-xl"
                >
                  Start Over
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button
        data-testid={`button-faq-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
        className="w-full flex justify-between items-center py-5 text-left gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-white font-bold text-sm leading-relaxed">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
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

  const scrollToFunnel = (track?: string) => {
    if (track) setSelectedTrack(track);
    funnelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta
        title="Business Opportunity — DeliWer Partner & AquaCafe Alliance | Earn Globally from Dubai"
        description="Join DeliWer's dual income network. Earn as a Dubai broker referral partner or become an AquaCafe Alliance global distributor. 100% online. No physical presence needed."
      />
      <Navigation />

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&h=900&fit=crop"
            alt="Global business team"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        </div>
        {/* Animated background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 rounded-full px-5 py-2 mb-8">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-black text-xs uppercase tracking-widest">Global Business Opportunity</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Build Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Global Income
              </span>{" "}
              From Dubai
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed mb-4">
              Two parallel income systems. One online platform. Earn from real estate referrals and water system network marketing — from anywhere in the world.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-semibold mb-12">
              {["100% Online — No Physical Presence", "No Inventory", "No Monthly Fees", "Earn Globally"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                data-testid="button-hero-broker-cta"
                onClick={() => scrollToFunnel("broker")}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-emerald-500/20"
              >
                <Building2 className="w-5 h-5 mr-2" /> Join as Broker Partner
              </Button>
              <Button
                data-testid="button-hero-aquacafe-cta"
                onClick={() => scrollToFunnel("aquacafe")}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-cyan-500/20"
              >
                <Droplets className="w-5 h-5 mr-2" /> Join AquaCafe Alliance
              </Button>
            </div>

            <div className="mt-16 flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-gray-600 cursor-pointer"
                onClick={() => scrollToFunnel()}
              >
                <ChevronDown className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ──────────────────────────────────────── */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Active Partners", value: "2,400+", icon: Users, color: "emerald" },
            { label: "Countries Reached", value: "38", icon: Globe, color: "cyan" },
            { label: "Avg Monthly Earn", value: "AED 6,200", icon: DollarSign, color: "purple" },
            { label: "Setup Time", value: "< 24 hrs", icon: Zap, color: "amber" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1"
            >
              <s.icon className={`w-6 h-6 mx-auto text-${s.color}-400 mb-2`} />
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TWO TRACKS ─────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-slate-800 text-gray-400 border-slate-700 mb-4">Two Parallel Income Systems</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Choose Your Track —{" "}
              <span className="text-emerald-400">Or Both</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Most top earners run both simultaneously. Start with one, expand when ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TRACKS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl border overflow-hidden ${
                  t.id === "broker"
                    ? "border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900"
                    : "border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900"
                }`}
              >
                <div className={`absolute top-0 right-0 text-xs font-black px-4 py-2 rounded-bl-xl ${t.id === "broker" ? "bg-emerald-500 text-white" : "bg-cyan-500 text-slate-900"}`}>
                  {t.badge}
                </div>
                <div className="p-8">
                  <t.icon className={`w-12 h-12 mb-4 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`} />
                  <h3 className="text-2xl font-black text-white mb-1">{t.label}</h3>
                  <p className={`text-sm font-semibold mb-6 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`}>{t.tagline}</p>
                  <ul className="space-y-3 mb-8">
                    {t.perks.map(p => (
                      <li key={p} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${t.id === "broker" ? "text-emerald-400" : "text-cyan-400"}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button
                    data-testid={`button-track-cta-${t.id}`}
                    onClick={() => scrollToFunnel(t.id)}
                    className={`w-full font-black h-12 rounded-2xl ${
                      t.id === "broker"
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : "bg-cyan-600 hover:bg-cyan-500 text-white"
                    }`}
                  >
                    {t.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-slate-800 text-gray-400 border-slate-700 mb-4">Zero Paperwork. Zero Physical Meetings.</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              From Sign-Up to{" "}
              <span className="text-emerald-400">Earning</span>{" "}
              in 24 Hours
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"
              >
                {i < HOW_IT_WORKS.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 hidden md:block z-10" />
                )}
                <div className={`w-14 h-14 rounded-2xl bg-${step.color}-500/15 border border-${step.color}-500/30 flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className={`w-7 h-7 text-${step.color}-400`} />
                </div>
                <div className={`text-xs font-black uppercase tracking-widest text-${step.color}-400 mb-2`}>Step {step.step}</div>
                <h3 className="text-base font-black text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NETWORK VISUALIZATION + INCOME ────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-slate-800 text-gray-400 border-slate-700 mb-4">Network Marketing Engine</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Your Network{" "}
              <span className="text-emerald-400">Earns While You Sleep</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Every person you bring in can recruit their own team. You earn override commissions on every level — like Enagic's 8-point system, adapted for DeliWer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Network Tree */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">Your Commission Tree</h3>
              <NetworkTree />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { color: "bg-emerald-500", label: "You", pct: "35%" },
                  { color: "bg-cyan-500", label: "Level 1", pct: "10%" },
                  { color: "bg-purple-500", label: "Level 2+", pct: "5%" },
                ].map(l => (
                  <div key={l.label} className="space-y-1">
                    <div className={`w-3 h-3 rounded-full ${l.color} mx-auto`} />
                    <div className="text-[10px] text-gray-500 font-semibold">{l.label}</div>
                    <div className="text-sm text-white font-black">{l.pct}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Income Estimator */}
            <IncomeSlider />
          </div>
        </div>
      </section>

      {/* ─── COMMISSION LEVELS ──────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-slate-800 text-gray-400 border-slate-700 mb-4">Career Path</Badge>
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Five Levels of{" "}
              <span className="text-emerald-400">Earning Power</span>
            </h2>
          </div>
          <div className="space-y-3">
            {COMMISSION_LEVELS.map((lvl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-lg ${
                    i === 4 ? "text-amber-400" : i === 3 ? "text-purple-400" : i === 2 ? "text-cyan-400" : i === 1 ? "text-emerald-400" : "text-gray-400"
                  }`}>
                    {i === 4 ? <Crown className="w-5 h-5" /> : i === 3 ? <Award className="w-5 h-5" /> : i === 2 ? <Star className="w-5 h-5" /> : i === 1 ? <TrendingUp className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-black text-white">{lvl.level}</div>
                    <div className="text-xs text-gray-500">{lvl.req}</div>
                  </div>
                </div>
                <div className="flex gap-8 sm:text-right">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Est. Monthly</div>
                    <div className={`font-black text-sm ${i === 4 ? "text-amber-400" : i >= 3 ? "text-purple-400" : "text-emerald-400"}`}>{lvl.monthly}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Team Size</div>
                    <div className="font-black text-white text-sm">{lvl.team}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENAGIC / AQUACAFE ALLIANCE DEEP SECTION ────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 mb-4">AquaCafe × Enagic Alliance</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              Become a{" "}
              <span className="text-cyan-400">Global Distributor</span>{" "}
              Under DeliWer's Sponsorship
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Enagic has powered the world's most successful direct-sales water system for over 50 years. Join under our official sponsor ID — 100% online, from any country.
            </p>
          </div>

          {/* ── SPONSOR CARD + DEMO ─── */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Sponsor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 rounded-3xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-cyan-700 to-blue-700 px-6 py-3 flex items-center gap-3">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white font-black text-xs uppercase tracking-widest">Your Enagic Sponsor</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl shrink-0">
                    👩‍💼
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">Rubab Hassan</div>
                    <div className="text-cyan-400 font-black text-sm">Enagic Independent Distributor</div>
                    <div className="text-gray-400 text-xs mt-0.5">Dubai, UAE</div>
                  </div>
                </div>
                <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Sponsor ID</span>
                    <span className="text-cyan-300 font-black text-sm tracking-widest">3A #37000000659</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Rank</span>
                    <span className="text-white font-bold text-sm">3A — Senior Distributor</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Contact</span>
                    <a href="https://wa.me/971523946311" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold text-sm hover:text-emerald-300">
                      +971 52 394 6311
                    </a>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  When registering on Enagic's website, enter this Sponsor ID to join directly under the DeliWer AquaCafe network and access our full marketing system.
                </p>
                <a
                  href="https://www.enagic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-enagic-register"
                >
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black h-11 rounded-xl">
                    Register on Enagic.com <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Kangen Water Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-500/30 rounded-3xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-3 flex items-center gap-3">
                <Droplets className="w-4 h-4 text-white" />
                <span className="text-white font-black text-xs uppercase tracking-widest">Kangen Water Demo</span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-black text-white">See the Science. Share the Demo.</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Use this interactive online demo to show prospects exactly how Kangen Water works — ionisation, pH levels, ORP, and the health difference. Share the link with anyone, anywhere.
                </p>
                <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your Demo Link</div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-blue-300 font-mono text-sm break-all">formatix.kangendemo.com</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    "Send to prospects before your pitch",
                    "Works on mobile — perfect for WhatsApp sharing",
                    "No login required for viewers",
                    "Converts cold leads into warm buyers",
                  ].map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <a
                  href="http://formatix.kangendemo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-kangen-demo"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black h-11 rounded-xl">
                    <Play className="w-4 h-4 mr-2" /> Open Kangen Water Demo
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── ENAGIC REGISTRATION STEPS ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-cyan-500/20 rounded-3xl overflow-hidden mb-12"
          >
            <div className="bg-gradient-to-r from-cyan-800/60 to-blue-800/60 border-b border-cyan-500/20 px-8 py-5">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">How to Register as an Enagic Distributor Under DeliWer</h3>
              <p className="text-cyan-300/70 text-sm mt-1">EWS Backoffice Registration — Step by Step</p>
            </div>
            <div className="p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: 1,
                    title: "Go to Enagic.com",
                    desc: 'Visit enagic.com and click the "Register" or "Login" tab on the EWS Backoffice to begin your distributor registration.',
                    color: "cyan",
                    icon: Globe,
                  },
                  {
                    step: 2,
                    title: "Enter Sponsor Details",
                    desc: "Input your Sponsor ID exactly as shown:\n\nSponsor: Rubab Hassan\nID: 3A #37000000659\n\nMatch the fields as registered in the Enagic system.",
                    color: "blue",
                    icon: UserPlus,
                    highlight: true,
                  },
                  {
                    step: 3,
                    title: "Validate Your Identity",
                    desc: "Choose phone (4-digit passcode via SMS/voice) or email (click link). English phone validation is available. Check spam if email doesn't arrive.",
                    color: "indigo",
                    icon: Shield,
                  },
                  {
                    step: 4,
                    title: "Activate & Start Earning",
                    desc: "Complete registration as instructed. Your EWS Free Edition account activates. You're now in the DeliWer AquaCafe network and can recruit your own team.",
                    color: "purple",
                    icon: Zap,
                  },
                ].map((s, i) => (
                  <div key={i} className={`relative rounded-2xl p-5 border ${s.highlight ? "border-cyan-500/50 bg-cyan-950/30" : "border-slate-800 bg-slate-800/30"}`}>
                    {s.highlight && (
                      <div className="absolute -top-2 left-4 bg-cyan-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Key Step
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl bg-${s.color}-500/15 border border-${s.color}-500/30 flex items-center justify-center mb-3`}>
                      <s.icon className={`w-5 h-5 text-${s.color}-400`} />
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest text-${s.color}-400 mb-1`}>Step {s.step}</div>
                    <div className="font-black text-white text-sm mb-2">{s.title}</div>
                    <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">{s.desc}</p>
                    {s.highlight && (
                      <div className="mt-3 bg-slate-900 rounded-xl p-3 border border-cyan-500/20">
                        <div className="text-[9px] font-black uppercase text-gray-600 mb-1">Use Exactly</div>
                        <div className="text-cyan-300 font-black text-xs">Rubab Hassan</div>
                        <div className="text-cyan-400 font-mono text-xs">3A #37000000659</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://www.enagic.com" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black h-12 px-8 rounded-xl">
                    Start Enagic Registration <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://wa.me/971523946311?text=Hi%20Rubab!%20I%20want%20to%20join%20the%20AquaCafe%20Alliance%20under%20your%20Enagic%20ID%203A%20%2337000000659.%20Please%20guide%20me%20through%20the%20registration." target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-black h-12 px-8 rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Rubab for Help
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── WHY JOIN THROUGH DELIWER + GLOBAL PINS ─── */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
                <h3 className="font-black text-white uppercase tracking-tight">Why Join Through DeliWer?</h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { point: "No upfront purchase required to get your sponsor ID", icon: Check },
                  { point: "DeliWer routes Dubai-based leads directly to your link", icon: Check },
                  { point: "Full marketing support — templates, funnels, campaigns", icon: Check },
                  { point: "Combined earning: DeliWer referrals + Enagic overrides", icon: Check },
                  { point: "Arabic & English support team 24/7 via WhatsApp", icon: Check },
                  { point: "Join from Philippines, India, UK, EU — any country", icon: Check },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{item.point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Active Alliance Members In</h3>
              <div className="flex flex-wrap gap-2">
                {["🇦🇪 Dubai", "🇬🇧 London", "🇵🇭 Manila", "🇮🇳 Mumbai", "🇩🇪 Berlin", "🇨🇦 Toronto", "🇦🇺 Sydney", "🇸🇬 Singapore", "🇿🇦 Johannesburg", "🇺🇸 New York", "🇯🇵 Tokyo", "🇧🇷 São Paulo"].map(city => (
                  <span key={city} className="bg-slate-800 text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-700">{city}</span>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <Button
                  data-testid="button-aquacafe-join"
                  onClick={() => scrollToFunnel("aquacafe")}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black h-12 rounded-xl"
                >
                  <Droplets className="w-5 h-5 mr-2" /> Join AquaCafe Alliance Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BROKER FOCUS SECTION ───────────────────────────── */}
      <section id="broker-focus" className="py-24 px-4 bg-gradient-to-b from-slate-900/60 to-slate-950 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 mb-4">For Real Estate Brokers</Badge>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Your Clients Already Need This.{" "}
              <span className="text-emerald-400">You Just Haven't Charged Yet.</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Every signed lease is a DeliWer opportunity. Share your link after the handover — DeliWer handles Ejari, DEWA, movers, cleaning. You earn 20–35% of the service basket automatically.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Studio / 1BR", earn: "AED 150–320", color: "emerald", desc: "Standard move-in package" },
              { type: "2BR / 3BR", earn: "AED 400–650", color: "teal", desc: "Full setup + DEWA + cleaning" },
              { type: "Villa / Penthouse", earn: "AED 800–2,000+", color: "cyan", desc: "Premium concierge bundle" },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"
              >
                <div className="text-sm text-gray-500 font-semibold mb-2">{tier.type}</div>
                <div className={`text-3xl font-black text-${tier.color}-400 mb-1`}>{tier.earn}</div>
                <div className="text-xs text-gray-600">{tier.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-black text-white mb-4">Plus: Build Your Broker Team</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Refer other brokers to DeliWer and earn an <strong className="text-emerald-400">override commission</strong> on every deal they close. The more brokers in your team, the more passive income you generate — without lifting a finger.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {["Recruit 1 broker → 10% override on their referrals", "Recruit 5 brokers → Leader bonus + 12% override", "Recruit 10+ brokers → Director rank + unlimited network income"].map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black text-emerald-400 mb-2">35%</div>
                <div className="text-gray-400 font-semibold mb-1">Max Direct Commission</div>
                <div className="text-gray-600 text-sm">On every completed service referral</div>
                <Button
                  data-testid="button-broker-join-section"
                  onClick={() => scrollToFunnel("broker")}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black h-12 px-8 rounded-2xl"
                >
                  Get My Broker Link <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DUAL-TRACK CTA STRIP ───────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900/80 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Two Paths. One Platform.</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Ready to Start? Choose Your Track
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Broker Partner CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              className="relative bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 flex flex-col gap-5"
            >
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                🏆 Most Popular
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Broker Partner</h3>
                  <p className="text-emerald-400 text-sm font-semibold">Real estate referral commissions</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">AED 800+</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Per Referral</div>
                </div>
                <div className="text-center border-x border-slate-700">
                  <div className="text-2xl font-black text-emerald-400">35%</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Commission</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">24h</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Payout</div>
                </div>
              </div>
              <ul className="space-y-2">
                {["Earn from clients you already work with", "Team override on agents you recruit", "100% online — share a link, done", "Monthly bank payouts, no delays"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button
                  data-testid="button-cta-strip-broker-learn"
                  onClick={() => {
                    document.getElementById("broker-focus")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="outline"
                  className="flex-1 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black h-11 rounded-xl"
                >
                  How It Works
                </Button>
                <Button
                  data-testid="button-cta-strip-broker-join"
                  onClick={() => scrollToFunnel("broker")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black h-11 rounded-xl"
                >
                  Get My Partner Link <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>

            {/* AquaCafe Alliance CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              className="relative bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 flex flex-col gap-5"
            >
              <div className="absolute top-4 right-4 bg-cyan-500 text-slate-900 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                🌊 Global Reach
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                  <Droplets className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">AquaCafe Alliance</h3>
                  <p className="text-cyan-400 text-sm font-semibold">Enagic water system distribution</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
                <div className="text-center">
                  <div className="text-2xl font-black text-cyan-400">8pt</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Pay System</div>
                </div>
                <div className="text-center border-x border-slate-700">
                  <div className="text-2xl font-black text-cyan-400">190</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-cyan-400">∞</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Downline</div>
                </div>
              </div>
              <div className="bg-slate-900/60 rounded-2xl p-3 border border-cyan-500/20 flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-white">Sponsor: Rubab Hassan · 3A #37000000659</div>
                  <div className="text-[10px] text-gray-500">DeliWer Enagic Sponsor — Dubai, UAE</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href="http://formatix.kangendemo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  data-testid="link-cta-strip-kangen-demo"
                >
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-black h-11 rounded-xl"
                  >
                    <Play className="w-4 h-4 mr-1" /> Watch Kangen Demo
                  </Button>
                </a>
                <Button
                  data-testid="button-cta-strip-aquacafe-join"
                  onClick={() => scrollToFunnel("aquacafe")}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black h-11 rounded-xl"
                >
                  Join the Alliance <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── JOIN FUNNEL ─────────────────────────────────────── */}
      <section ref={funnelRef} className="py-24 px-4" id="join">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 mb-4">Start in 3 Minutes</Badge>
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Register{" "}
              <span className="text-emerald-400">100% Online</span>
            </h2>
            <p className="text-gray-400 mt-3">No physical forms. No in-person visit. Your ID is activated within the same business day.</p>
          </div>
          <JoinFunnel defaultTrack={selectedTrack} />
        </div>
      </section>

      {/* ─── TESTIMONIAL-STYLE TRUST SIGNALS ────────────────── */}
      <section className="py-16 px-4 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { quote: "I closed a villa deal on Friday and shared the DeliWer link on Sunday. By Monday I had AED 1,200 sitting in my account.", name: "Ahmed K.", role: "Broker, JVC Dubai" },
              { quote: "I'm in Manila and I've built a downline of 12 people selling Kangen water systems to Dubai residents. I haven't been to Dubai once.", name: "Maria L.", role: "AquaCafe Alliance, Philippines" },
              { quote: "Running both tracks. Broker referrals for steady cash, AquaCafe for the big monthly multiplier. Best side income I've ever had.", name: "Tariq M.", role: "Team Leader, Dubai & London" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <div className="text-white font-black text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Common{" "}
              <span className="text-emerald-400">Questions</span>
            </h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-cyan-950/30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Your Global Income{" "}
            <span className="text-emerald-400">Starts Today</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join 2,400+ partners earning from Dubai real estate referrals and water system network marketing — all from the comfort of wherever you are in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-final-cta-broker"
              onClick={() => scrollToFunnel("broker")}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-emerald-500/20"
            >
              <Building2 className="w-5 h-5 mr-2" /> Broker Partner
            </Button>
            <Button
              data-testid="button-final-cta-aquacafe"
              onClick={() => scrollToFunnel("aquacafe")}
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-cyan-500/20"
            >
              <Droplets className="w-5 h-5 mr-2" /> AquaCafe Alliance
            </Button>
            <a href="https://wa.me/971523946311" target="_blank" rel="noopener noreferrer">
              <Button
                data-testid="button-final-cta-whatsapp"
                size="lg"
                variant="outline"
                className="border-green-500/40 text-green-400 hover:bg-green-500/10 font-black h-16 px-8 text-lg rounded-2xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Ask Us First
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="border-t border-slate-900 py-8 px-4 text-center">
        <p className="text-xs text-gray-700 max-w-2xl mx-auto">
          DeliWer LLC · Dubai Airport Freezone · partners@deliwer.com · Earnings are estimates based on average performance and do not constitute a guarantee. Network marketing involves risk.
        </p>
      </div>
    </div>
  );
}
