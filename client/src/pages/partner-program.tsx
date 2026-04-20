import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, Zap, BadgeCheck, Clock, ArrowRight, MessageSquare,
  Link2, Smartphone, CheckCircle2, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

const TIERS = [
  { type: "Influencers & Sharers", pct: "20%", eg: "Community leaders, Telegram admins, bloggers", color: "border-yellow-500/30 bg-yellow-900/10", textColor: "text-yellow-300", earn: "AED 75–150/booking" },
  { type: "Real Estate Agents", pct: "25%", eg: "Licensed brokers, property consultants", color: "border-blue-500/30 bg-blue-900/10", textColor: "text-blue-300", earn: "AED 100–200/booking" },
  { type: "Relocation Partners", pct: "30%", eg: "Relocation companies, corporate HR teams", color: "border-purple-500/30 bg-purple-900/10", textColor: "text-purple-300", earn: "AED 120–250/booking" },
  { type: "Strategic Partners", pct: "35%", eg: "Alliance partners, logistics networks", color: "border-emerald-500/30 bg-emerald-900/10", textColor: "text-emerald-300", earn: "AED 150–300+/booking" },
];

const HOW_STEPS = [
  { icon: "🔗", title: "You get a unique link", desc: "Your URL contains your partner code. Example: deliwer.com/?ref=yourname." },
  { icon: "📢", title: "Share it anywhere", desc: "WhatsApp, LinkedIn, email, Telegram — every click is captured and stored." },
  { icon: "📱", title: "30-day attribution window", desc: "Your code is stored in the visitor's browser. Book within 30 days → you get credit." },
  { icon: "💬", title: "Auto-fills on booking", desc: "When they tap the WhatsApp button, your partner code pre-fills their message automatically." },
  { icon: "✅", title: "Conversion logged", desc: "DeliWer team sees your attribution on every booking. No guesswork, no disputes." },
  { icon: "💰", title: "Monthly payout", desc: "Your tier % × DeliWer's vendor fee per booking. Full breakdown with every transfer." },
];

const FAQS = [
  { q: "What if the client books directly without my link?", a: "If a client visited through your link within the past 30 days, your attribution stays active. For clients who go direct, you can also share a custom WhatsApp intro that mentions your name — we honor manual attribution from partner intros." },
  { q: "When and how do I get paid?", a: "Commission is calculated at the end of each calendar month and transferred via bank transfer or UAE payment method of your choice. You get a full breakdown showing every booking attributed to you." },
  { q: "Can my whole team earn commissions?", a: "Yes. Each team member gets their own sub-code under your partner code. Example: ?ref=debacci&agent=sarah — each tracked separately, commissions pooled to your organization monthly." },
  { q: "Is there a minimum to start earning?", a: "Zero minimums. Your first referral earns commission based on your tier. No probation period." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
        <p className="font-bold text-white pr-8 text-sm">{q}</p>
        <ChevronDown className={`w-4 h-4 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PartnerProgram() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="How Partner Attribution Works | DeliWer Dubai Commission Program"
        description="Understand how DeliWer tracks referrals, calculates commissions (20–35%), and pays out monthly. Tenants pay the same — your commission comes from DeliWer's vendor coordination fee."
      />
      <Navigation />

      {/* ─── REDIRECT BANNER ─── */}
      <div className="bg-emerald-600 text-white py-3 px-4 text-center">
        <p className="text-sm font-bold">
          Ready to join? <Link href="/partners" className="underline font-black hover:text-emerald-200">See the full career path and join at /partners →</Link>
        </p>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 mb-6">How Commissions Work</Badge>
            <h1 className="text-5xl md:text-6xl font-black uppercase leading-tight mb-5">
              Transparent.<br />
              <span className="text-emerald-400">Simple. Monthly.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Your commission is a percentage of DeliWer's vendor coordination fee. Tenants always pay normal market rates — you earn from our side, never theirs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon: ShieldCheck, label: "No tenant markup ever" },
                { icon: Zap, label: "Instant link attribution" },
                { icon: BadgeCheck, label: "Zero minimum referrals" },
                { icon: Clock, label: "Monthly payouts" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-300 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-2">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partners">
                <Button data-testid="button-hero-join" size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-13 px-10 text-base rounded-2xl">
                  <ArrowRight className="w-4 h-4 mr-2" /> See Full Career Path
                </Button>
              </Link>
              <Link href="/brokers">
                <Button data-testid="button-hero-broker" size="lg" variant="outline" className="border-white/20 text-gray-300 hover:text-white font-black h-13 px-10 text-base rounded-2xl">
                  <MessageSquare className="w-4 h-4 mr-2" /> Broker Partner Path
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── KEY PRINCIPLE ─── */}
      <section className="py-8 px-4 bg-emerald-950/20 border-y border-emerald-500/15">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <ShieldCheck className="w-12 h-12 text-emerald-400 shrink-0" />
          <div>
            <p className="text-white font-black text-base uppercase tracking-tight">The 100% ethical model</p>
            <p className="text-gray-400 text-sm leading-relaxed mt-1">
              Vendors pay DeliWer a coordination fee (10–20%) embedded in their standard market pricing. Your commission is a share of that fee. The tenant's total is identical whether or not there is a referral.
            </p>
          </div>
        </div>
      </section>

      {/* ─── COMMISSION TIERS ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-3">Commission by Partner Type</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">Higher-impact partners earn more per referral. Upgrade your tier by referring volume or joining a higher-trust category.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {TIERS.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                <div className={`${tier.color} border rounded-2xl p-6 h-full`}>
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-black text-white uppercase tracking-tight">{tier.type}</p>
                    <p className={`text-3xl font-black ${tier.textColor}`}>{tier.pct}</p>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{tier.eg}</p>
                  <div className="bg-black/20 rounded-xl px-3 py-2">
                    <p className={`font-black text-sm ${tier.textColor}`}>{tier.earn}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Earning scenarios */}
          <h3 className="text-2xl font-black uppercase tracking-tight text-center mb-6">Monthly Earning Scenarios</h3>
          <div className="space-y-3">
            {[
              { label: "Casual sharer", referrals: 5, conversions: 1, earn: "AED 75–120", note: "One WhatsApp group share" },
              { label: "Active partner", referrals: 25, conversions: 5, earn: "AED 375–600", note: "Regular posts in your network" },
              { label: "Network partner", referrals: 100, conversions: 20, earn: "AED 1,500–2,400", note: "Broker, agent, or community leader" },
            ].map(({ label, referrals, conversions, earn, note }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-slate-900/60 border border-white/10 rounded-xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 items-center"
                data-testid={`row-scenario-${i}`}
              >
                <div>
                  <p className="font-black text-white text-sm">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{note}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-0.5">Referrals</p>
                  <p className="text-xl font-black text-white">{referrals}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-0.5">Conversions</p>
                  <p className="text-xl font-black text-emerald-400">{conversions}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-0.5">You Earn</p>
                  <p className="text-lg font-black text-yellow-400">{earn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW TRACKING WORKS ─── */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-3">From Share to Payout</h2>
            <p className="text-gray-400 text-sm">Zero technical knowledge required. Here's exactly what happens.</p>
          </div>
          <div className="space-y-3">
            {HOW_STEPS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}
                className="flex gap-5 bg-slate-900/50 border border-white/8 rounded-xl p-5 items-start"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-xs font-black text-gray-600">STEP {i + 1}</span>
                    <h4 className="font-black text-white">{item.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center">Questions</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 px-4 border-t border-slate-800 bg-emerald-950/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-3">Ready to Start?</h2>
          <p className="text-gray-400 mb-8">See the full career path — from broker referral partner all the way to Kangen global director.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partners">
              <Button data-testid="button-bottom-career-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-13 px-10 text-base rounded-2xl">
                See Full Career Path <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/brokers">
              <Button data-testid="button-bottom-broker-cta" size="lg" variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black h-13 px-10 text-base rounded-2xl">
                Get My Broker Link
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
