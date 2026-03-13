import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Lock,
  BadgeCheck,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

const faqs = [
  {
    q: "How exactly does attribution work?",
    a: "When a client clicks your unique referral link (e.g., deliwer.com/start?ref=debacci&agent=yourname), their browser stores your partner code for 30 days. When they book via WhatsApp, your code auto-populates the booking message. DeliWer's team sees your attribution on every booking — no grey area."
  },
  {
    q: "What if the client books directly without my link?",
    a: "If a client visited through your link within the past 30 days, your cookie stays active. For clients who go direct, you can also share a custom WhatsApp intro message that explicitly mentions your name — we honor manual attribution from partner intros."
  },
  {
    q: "When and how do I get paid?",
    a: "Commission is calculated at the end of each calendar month and transferred via bank transfer or any UAE payment method you prefer. You'll receive a breakdown showing every booking and conversion attributed to you."
  },
  {
    q: "Is there a minimum number of referrals to start earning?",
    a: "Zero minimums. Your first referral earns AED 79.80. There's no tier lock, no probation period, and no ramp-up required."
  },
  {
    q: "What if a client cancels after I referred them?",
    a: "Commission is only counted on completed, paid bookings. If a booking is cancelled before service delivery, that conversion is not counted. Completed services are never reversed."
  },
  {
    q: "Can I promote DeliWer to clients outside Dubai?",
    a: "Yes — especially expats arriving in Dubai, corporate relocation teams, and international movers planning their UAE transition. DeliWer exclusively serves Dubai, but your audience can be global."
  },
  {
    q: "Can my whole team earn commissions, not just me?",
    a: "Yes. Each team member gets their own unique agent sub-code under your partner code. Example: ?ref=debacci&agent=sarah and ?ref=debacci&agent=ahmed — each agent tracked separately, commissions pooled to your organization monthly."
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
        <p className="font-black text-white pr-8">{q}</p>
        <ChevronDown
          className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
              {a}
            </p>
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
        title="Partner Program | Earn 20% Commission | DeliWer Dubai"
        description="Join DeliWer's partner program and earn AED 79.80 per Move-In Concierge booking you refer. Zero minimums. Real-time tracking. Monthly payouts."
      />
      <Navigation />

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative py-32 px-4 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block mb-6">
              <span className="bg-emerald-500/20 border border-emerald-500/40 rounded-full px-5 py-2 text-emerald-300 text-xs font-black uppercase tracking-widest">
                Dubai's #1 Home-Activation Referral Program
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black uppercase leading-tight mb-6">
              Refer Once.<br />
              <span className="text-emerald-400">Get Paid Forever.</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Every tenant you send to DeliWer earns you <strong className="text-white">AED 79.80</strong>. 
              No admin. No chasing. Tracking is automatic — from click to payout.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partners">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get My Referral Link
                </Button>
              </Link>
              <a href="https://wa.me/971523946311?text=Hi%2C%20I%27m%20interested%20in%20becoming%20a%20DeliWer%20partner">
                <Button size="lg" variant="outline" className="border-white/20 text-gray-300 hover:text-white font-black h-14 px-12 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Ask a Question
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10 text-sm text-gray-400"
          >
            {[
              { icon: ShieldCheck, label: "Guaranteed payouts" },
              { icon: Zap, label: "Instant attribution" },
              { icon: Lock, label: "30-day cookie window" },
              { icon: BadgeCheck, label: "No minimums" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PARTNER ECONOMICS ────────────────────────── */}
      <section className="py-24 px-4 bg-white/[0.03] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase mb-4">The Math Is Simple</h2>
            <p className="text-gray-400 max-w-xl mx-auto">One service. One price. One commission rate. Nothing to memorize.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Move-In Concierge Price", value: "AED 399", sub: "per booking", color: "border-emerald-500/50 bg-emerald-900/20", valueColor: "text-emerald-300", icon: DollarSign },
              { label: "Your Commission Rate", value: "20%", sub: "on every booking", color: "border-blue-500/50 bg-blue-900/20", valueColor: "text-blue-300", icon: TrendingUp },
              { label: "You Earn Per Referral", value: "AED 79.80", sub: "paid monthly", color: "border-yellow-500/50 bg-yellow-900/20", valueColor: "text-yellow-300", icon: DollarSign },
            ].map(({ label, value, sub, color, valueColor, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`${color} border p-8 text-center h-full`}>
                  <Icon className="w-10 h-10 mx-auto mb-4 opacity-60" />
                  <p className="text-gray-300 text-sm font-bold mb-2">{label}</p>
                  <p className={`text-5xl font-black ${valueColor} mb-1`}>{value}</p>
                  <p className="text-gray-500 text-sm">{sub}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Earnings Scenarios */}
          <h3 className="text-2xl font-black text-center mb-8">What Could You Earn This Month?</h3>
          <div className="space-y-4">
            {[
              { label: "Casual sharer", referrals: 5, conversions: 1, earnings: "AED 79.80", note: "One WhatsApp group share" },
              { label: "Active promoter", referrals: 25, conversions: 5, earnings: "AED 399", note: "Posting regularly in your network" },
              { label: "Network partner", referrals: 100, conversions: 20, earnings: "AED 1,596", note: "Broker, agent, or community leader" },
            ].map(({ label, referrals, conversions, earnings, note }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl px-8 py-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-center"
              >
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-1">Tier</p>
                  <p className="font-black text-white">{label}</p>
                  <p className="text-xs text-gray-500 mt-1">{note}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-1">Referrals</p>
                  <p className="text-2xl font-black text-white">{referrals}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-1">Conversions</p>
                  <p className="text-2xl font-black text-emerald-400">{conversions}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-1">You Earn</p>
                  <p className="text-2xl font-black text-yellow-400">{earnings}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-black text-gray-500 uppercase mb-1">Per Month</p>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase mb-4">How the Tracking Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Zero technical knowledge required. Here's exactly what happens from share to payout.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: "01",
                icon: "🔗",
                title: "You get a unique partner link",
                desc: "Your URL contains your partner code and agent name. Example: deliwer.com/start?ref=debacci&agent=john",
                color: "border-emerald-500/20"
              },
              {
                step: "02",
                icon: "📢",
                title: "Share it wherever your audience lives",
                desc: "WhatsApp communities, LinkedIn posts, email newsletters, Telegram groups, broker networks. Every click is captured.",
                color: "border-blue-500/20"
              },
              {
                step: "03",
                icon: "📲",
                title: "Visitor is cookie-tagged for 30 days",
                desc: "Your code is stored in their browser. If they come back within 30 days, you still get credit — even if they close the tab.",
                color: "border-purple-500/20"
              },
              {
                step: "04",
                icon: "💬",
                title: "They book via WhatsApp",
                desc: "The booking button auto-fills your partner code into their WhatsApp message to +971523946311. Attribution is transparent and permanent.",
                color: "border-cyan-500/20"
              },
              {
                step: "05",
                icon: "✅",
                title: "Conversion logged immediately",
                desc: "DeliWer's team sees your attribution on every booking. Your dashboard updates in real-time. No guesswork.",
                color: "border-yellow-500/20"
              },
              {
                step: "06",
                icon: "💰",
                title: "Monthly payout — automatic",
                desc: "End of each month: AED 399 × 20% = AED 79.80 per booking paid to you. Full breakdown sent with every transfer.",
                color: "border-emerald-500/20"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className={`flex gap-6 bg-slate-900/50 border ${item.color} rounded-xl p-6 items-start`}
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-xs font-black text-gray-600">STEP {item.step}</span>
                    <h4 className="font-black text-white text-lg">{item.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE PROOF: DEBACCI EXAMPLE ──────────────── */}
      <section className="py-24 px-4 bg-emerald-950/20 border-t border-emerald-500/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-3">Real Partner. Real Numbers.</h2>
            <p className="text-gray-400">DeBacci Capital — referral data from a live partner account.</p>
          </div>

          <Card className="bg-slate-900/70 border-emerald-500/30 p-8">
            <div className="flex items-center gap-3 mb-8">
              <BadgeCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-black text-white">DeBacci Capital Partnership</h3>
              <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-1 font-bold">ACTIVE PARTNER</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Link Shared", value: "deliwer.com/start?ref=debacci&agent=john", isCode: true, color: "border-emerald-500/20" },
                { label: "Total Clicks", value: "247", color: "border-blue-500/20", valueColor: "text-blue-300" },
                { label: "Conversions", value: "18", color: "border-emerald-500/20", valueColor: "text-emerald-300" },
                { label: "Revenue Generated", value: "AED 7,182", sub: "18 × AED 399", color: "border-yellow-500/20", valueColor: "text-yellow-300" },
                { label: "Partner Commission (20%)", value: "AED 1,436.40", sub: "paid to DeBacci", color: "border-green-500/20", valueColor: "text-green-300" },
                { label: "Conversion Rate", value: "7.3%", sub: "18 ÷ 247 clicks", color: "border-purple-500/20", valueColor: "text-purple-300" },
              ].map(({ label, value, sub, isCode, color, valueColor }, i) => (
                <div key={i} className={`bg-slate-950/60 border ${color} rounded-lg p-4`}>
                  <p className="text-gray-500 text-xs font-bold uppercase mb-2">{label}</p>
                  {isCode ? (
                    <code className="text-xs text-emerald-300 font-mono break-all leading-relaxed">{value}</code>
                  ) : (
                    <>
                      <p className={`text-2xl font-black ${valueColor || "text-white"}`}>{value}</p>
                      {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-5">
              <p className="text-emerald-100 text-sm leading-relaxed">
                <strong>Every metric above is visible in real-time on your dashboard.</strong> No waiting for a monthly report to know how you're doing — you see your clicks, conversions, and earnings update live.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── WHY PARTNERS STAY ────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase mb-4">Why Partners Stay</h2>
            <p className="text-gray-400 max-w-xl mx-auto">These aren't features. They're the reasons our partners renew — and refer other partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "You don't sell — you share",
                icon: Users,
                desc: "DeliWer is something tenants genuinely need. You're not pushing a product, you're solving a real problem for people in your network. That's why conversion rates stay high."
              },
              {
                title: "Attribution you can trust",
                icon: ShieldCheck,
                desc: "Your name is embedded in every booking message. The DeliWer team sees exactly who referred each client. No algorithm. No ambiguity. Just clear, transparent attribution."
              },
              {
                title: "Zero upfront investment",
                icon: DollarSign,
                desc: "No joining fee. No monthly commitment. No training course. You get a link, you share it, you earn. Everything else is handled by DeliWer."
              },
              {
                title: "Earnings scale with your network",
                icon: TrendingUp,
                desc: "Whether you have 100 followers or 100,000, the math is the same. Share once in the right WhatsApp group and a single message can generate multiple bookings."
              },
              {
                title: "Real demand, no manufactured urgency",
                icon: Zap,
                desc: "Dubai has 3.5 million residents with high apartment turnover. Every new lease signed is a potential DeliWer booking. The demand is structural, not seasonal."
              },
              {
                title: "Team sub-codes available",
                icon: BadgeCheck,
                desc: "Agencies and brokerages can create unique sub-links for each team member. Each tracked separately, commissions pooled monthly to your organization."
              },
            ].map(({ title, icon: Icon, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-5 bg-slate-900/40 border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all"
              >
                <Icon className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-white text-lg mb-2">{title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GUARANTEE ────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-950/30 to-slate-950 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/60 border-emerald-500/40 p-10 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black uppercase mb-4">The DeliWer Partner Guarantee</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              If your attributed booking is completed and paid, you get paid. Every time. No exceptions, no discretionary decisions. 20% is contractually yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partners">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Generate My Link Now
                </Button>
              </Link>
              <a href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%27d%20like%20to%20become%20a%20partner">
                <Button size="lg" variant="outline" className="border-white/20 text-gray-300 hover:text-white font-black h-14 px-12 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Talk to a Human First
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black uppercase mb-3">Every Question Answered</h2>
            <p className="text-gray-400">If yours isn't here, WhatsApp us — response within 10 minutes.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────── */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-950 to-black border-t border-emerald-500/20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Clock className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-5xl font-black uppercase mb-4">Takes 60 Seconds to Start</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Generate your link. Share it once. Your first AED 79.80 could land this week.
            </p>

            <Link href="/partners">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-16 text-xl mb-6">
                <ArrowRight className="w-6 h-6 mr-3" />
                Get My Partner Link
              </Button>
            </Link>

            <p className="text-sm text-gray-600 block">
              Zero fees. Zero minimums. DeBacci Capital, EGLC, MyTablon, and dozens more already earning monthly.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
