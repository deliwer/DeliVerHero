import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import {
  TrendingUp, DollarSign, Users, CheckCircle2, MessageSquare, ArrowRight,
  ShieldCheck, Zap, Clock, BadgeCheck, HelpCircle, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

const faqs = [
  {
    q: "How exactly does attribution work?",
    a: "When a client clicks your unique referral link (e.g., deliwer.com/?ref=yourname), their browser stores your partner code in localStorage. When they book via WhatsApp, your code auto-populates the booking message. DeliWer's team sees your attribution on every booking — no grey area."
  },
  {
    q: "How much do I earn per referral?",
    a: "Your commission depends on your partner tier. Influencers and community sharers earn 20% of DeliWer's embedded coordination fee. Real estate agents earn 25%. Corporate relocation partners earn 30%. Strategic partners earn 35%. Earnings range from AED 75 to AED 250+ per booking depending on apartment size and your tier."
  },
  {
    q: "What if the client books directly without my link?",
    a: "If a client visited through your link within the past 30 days, your attribution stays active. For clients who go direct, you can also share a custom WhatsApp intro message that explicitly mentions your name — we honor manual attribution from partner intros."
  },
  {
    q: "When and how do I get paid?",
    a: "Commission is calculated at the end of each calendar month and transferred via bank transfer or any UAE payment method you prefer. You'll receive a full breakdown showing every booking and conversion attributed to you."
  },
  {
    q: "Does the tenant pay more because of my referral?",
    a: "No. Tenants always pay only normal vendor market rates. DeliWer's coordination fee is embedded in vendor contracts — not added to the tenant's bill. Your commission comes from DeliWer's share of the vendor fee, not from the tenant."
  },
  {
    q: "Is there a minimum number of referrals to start earning?",
    a: "Zero minimums. Your first referral earns commission based on your partner tier. There's no probation period or ramp-up required."
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
        <ChevronDown className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
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
            <p className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TIERS = [
  { type: "Influencers", pct: "20%", eg: "Community leaders, bloggers, Telegram admins", color: "border-yellow-500/30 bg-yellow-900/10", textColor: "text-yellow-300" },
  { type: "Real Estate Agents", pct: "25%", eg: "Licensed brokers, property consultants", color: "border-blue-500/30 bg-blue-900/10", textColor: "text-blue-300" },
  { type: "Relocation Partners", pct: "30%", eg: "Relocation companies, corporate HR teams", color: "border-purple-500/30 bg-purple-900/10", textColor: "text-purple-300" },
  { type: "Strategic Partners", pct: "35%", eg: "Alliance partners, logistics networks", color: "border-emerald-500/30 bg-emerald-900/10", textColor: "text-emerald-300" },
];

const SCENARIOS = [
  { label: "Casual sharer", referrals: 5, conversions: 1, earningsRange: "AED 75–120", note: "One WhatsApp group share" },
  { label: "Active partner", referrals: 25, conversions: 5, earningsRange: "AED 375–600", note: "Regular posts in your network" },
  { label: "Network partner", referrals: 100, conversions: 20, earningsRange: "AED 1,500–2,400", note: "Broker, agent, or community leader" },
];

export default function PartnerProgram() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Partner Program | Earn Commission on Move-In Referrals | DeliWer Dubai"
        description="Join DeliWer's partner program and earn from every move-in referral. Commission tiers from 20–35%. Tenants pay vendor market rates only — you earn from DeliWer's coordination fee."
      />
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative py-36 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block mb-6">
              <span className="bg-emerald-500/20 border border-emerald-500/40 rounded-full px-5 py-2 text-emerald-300 text-xs font-black uppercase tracking-widest">
                DeliWer Partner Program
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black uppercase leading-tight mb-6">
              Refer Tenants.<br />
              <span className="text-emerald-400">Earn Commission.</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Every tenant you send to DeliWer earns you a percentage of the coordination fee we receive from vendors.
              Tenants pay only normal vendor rates. You earn. Everyone wins.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partners/join">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg" data-testid="button-hero-get-link">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get My Referral Link
                </Button>
              </Link>
              <a href="https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%27m%20interested%20in%20the%20partner%20program">
                <Button size="lg" variant="outline" className="border-white/20 text-gray-300 hover:text-white font-black h-14 px-12 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Ask a Question
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10 text-sm text-gray-400"
          >
            {[
              { icon: ShieldCheck, label: "No tenant markup" },
              { icon: Zap, label: "Instant attribution" },
              { icon: BadgeCheck, label: "No minimums" },
              { icon: Clock, label: "Monthly payouts" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── KEY PRINCIPLE ─── */}
      <section className="py-12 px-4 bg-emerald-950/20 border-y border-emerald-500/15">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <ShieldCheck className="w-12 h-12 text-emerald-400 shrink-0" />
            <div>
              <p className="text-white font-black text-lg uppercase tracking-tight">Tenants never pay extra.</p>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mt-1">
                Vendors pay DeliWer a coordination fee (10–20%) embedded in their market pricing.
                Your commission is a share of that fee — the tenant's total is identical whether or not there is a referral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMISSION TIERS ─── */}
      <section className="py-24 px-4 bg-white/[0.03] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black uppercase mb-4">Commission by Partner Type</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Your earnings depend on your partner category. Higher-impact partners earn more per referral.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {TIERS.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className={`${tier.color} border p-7 h-full`}>
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-black text-white uppercase tracking-tight text-lg">{tier.type}</p>
                    <p className={`text-4xl font-black ${tier.textColor}`}>{tier.pct}</p>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">{tier.eg}</p>
                  <div className="mt-4 bg-black/20 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Example per booking</p>
                    <p className={`font-black text-sm mt-0.5 ${tier.textColor}`}>AED 75–250+ depending on apartment size</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Earnings scenarios */}
          <h3 className="text-2xl font-black text-center mb-8 uppercase tracking-tight">Monthly Earning Scenarios</h3>
          <div className="space-y-4">
            {SCENARIOS.map(({ label, referrals, conversions, earningsRange, note }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl px-8 py-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-center"
                data-testid={`row-scenario-${i}`}
              >
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase mb-1">Partner</p>
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
                  <p className="text-xl font-black text-yellow-400">{earningsRange}</p>
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

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase mb-4">How the Tracking Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Zero technical knowledge required. Here's exactly what happens from share to payout.</p>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", icon: "🔗", title: "You get a unique partner link", desc: "Your URL contains your partner code. Example: deliwer.com/?ref=yourname. Share it anywhere.", color: "border-emerald-500/20" },
              { step: "02", icon: "📢", title: "Share it wherever your audience lives", desc: "WhatsApp communities, LinkedIn posts, email newsletters, Telegram groups, broker networks. Every click is captured.", color: "border-blue-500/20" },
              { step: "03", icon: "📲", title: "Visitor code stored in localStorage", desc: "Your referral code is stored in their browser. If they book within 30 days, you get credit — even if they close the tab.", color: "border-purple-500/20" },
              { step: "04", icon: "💬", title: "They book via WhatsApp", desc: "The booking button auto-fills your partner code into their WhatsApp message. Attribution is transparent and permanent.", color: "border-cyan-500/20" },
              { step: "05", icon: "✅", title: "Conversion logged immediately", desc: "DeliWer's team sees your attribution on every booking. No guesswork, no disputes.", color: "border-yellow-500/20" },
              { step: "06", icon: "💰", title: "Monthly payout — automatic", desc: "End of each month: your tier percentage × DeliWer's vendor coordination fee per booking. Full breakdown with every transfer.", color: "border-emerald-500/20" },
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

      {/* ─── WHY PARTNERS STAY ─── */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase mb-4">Why Partners Stay</h2>
            <p className="text-gray-400 max-w-xl mx-auto">These aren't features. They're the reasons our partners renew — and refer other partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "You don't sell — you help", icon: Users, desc: "DeliWer is something tenants genuinely need. You're not pushing a product, you're solving a real problem for people in your network." },
              { title: "Attribution you can trust", icon: ShieldCheck, desc: "Your name is embedded in every booking message. DeliWer's team sees exactly who referred each client. No algorithm, no ambiguity." },
              { title: "Zero upfront investment", icon: DollarSign, desc: "No joining fee. No monthly commitment. You get a link, share it, earn. Everything else is handled by DeliWer." },
              { title: "Earnings scale with your network", icon: TrendingUp, desc: "Whether you have 100 followers or 100,000, the math is the same. A single WhatsApp group share can generate multiple bookings." },
              { title: "Real demand, no manufactured urgency", icon: Zap, desc: "Dubai has high apartment turnover. Every new lease signed is a potential DeliWer booking. Demand is structural, not seasonal." },
              { title: "Team sub-codes available", icon: BadgeCheck, desc: "Agencies can create unique sub-links for each team member. Each tracked separately, commissions pooled monthly to your organization." },
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

      {/* ─── GUARANTEE ─── */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-950/30 to-slate-950 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/60 border-emerald-500/40 p-10 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black uppercase mb-4">The DeliWer Partner Guarantee</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              If your attributed booking is completed and paid, you get paid. Every time. No exceptions, no discretionary decisions.
              Your commission tier is contractually defined.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partners/join">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg" data-testid="button-guarantee-get-link">
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

      {/* ─── FAQ ─── */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black uppercase mb-3">Every Question Answered</h2>
            <p className="text-gray-400">If yours isn't here, WhatsApp us — response within 10 minutes.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ─── BROKER SPOTLIGHT ─── */}
      <section className="py-12 px-4 bg-purple-950/20 border-y border-purple-500/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-1">For Real Estate Brokers</span>
            <p className="text-white font-black text-lg uppercase tracking-tight leading-tight">Generate Your Referral Link Instantly</p>
            <p className="text-gray-500 text-sm mt-1">Enter your name → get a personal link → earn AED 150–800+ per client.</p>
          </div>
          <Link href="/broker-partner" data-testid="button-partner-program-broker-cta">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-8 h-12 text-sm shrink-0">
              Broker Referral Link →
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-950 to-black border-t border-emerald-500/20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Clock className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-5xl font-black uppercase mb-4">Takes 60 Seconds to Start</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Generate your link. Share it once. Your first commission could land this week.
            </p>
            <Link href="/partners/join">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-16 text-xl mb-6" data-testid="button-final-get-link">
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
