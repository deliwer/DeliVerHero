import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  TrendingDown,
  AlertTriangle,
  Users,
  Zap,
  Clock,
  ArrowRight,
  Info,
  BadgePercent,
  Star,
  Droplets,
} from "lucide-react";
import { Link } from "wouter";

const WHATSAPP_NUMBER = "971523906019";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ─────────────────────────────────────────────
   UPGRADE PLANS — 5 tiers (AquaCafe 99 is the foundation included in all)
───────────────────────────────────────────── */
const UPGRADE_PLANS = [
  {
    id: "ejari",
    name: "Ejari Renewal",
    price: 199,
    badge: "Compliance",
    color: "purple",
    tagline: "Stay legal. Stay in your home.",
    forWho: "Settled residents whose Ejari is expiring or needs first-time registration.",
    features: [
      "Trustee Center coordination",
      "Document audit & checklist",
      "UAE Pass biometric support",
      "Fast-track processing",
      "Digital certificate delivery",
    ],
    route: "/ejari-dubai",
    routeLabel: "Learn more →",
    whatsappMsg: "Hi DeliWer, I want the Ejari Renewal package at AED 199.",
    justification: "Without Ejari, tenants risk fines, lease void, and access issues. AED 199 vs losing a day at a government centre.",
    vendorEstimate: null,
    diyRisk: null,
    saving: null,
    isBest: false,
  },
  {
    id: "movein",
    name: "Move-In Welcome",
    price: 399,
    badge: "Home Setup",
    color: "teal",
    tagline: "Move in ready. From day one.",
    forWho: "New tenants within the first 7 days of receiving apartment keys.",
    features: [
      "60–90 min activation visit",
      "Shower filter supply + install",
      "AC filter clean (1 unit)",
      "Water readiness check",
      "Essentials setup guidance",
      "WhatsApp follow-up support",
    ],
    route: "/relocate",
    routeLabel: "Plan my move →",
    whatsappMsg: "Hi DeliWer, I just received my keys and want the Move-In Welcome service at AED 399.",
    justification: "Most tenants discover water quality issues, missing filters, and unactivated utilities on Day 1. DeliWer handles it in one visit.",
    vendorEstimate: null,
    diyRisk: null,
    saving: null,
    isBest: false,
  },
  {
    id: "deposit",
    name: "Deposit Protection",
    price: 499,
    badge: "Exit — Protect Your Money",
    color: "amber",
    tagline: "Leave without losing your deposit.",
    forWho: "Tenants preparing to move out who want their security deposit returned in full.",
    features: [
      "Pre-exit property condition audit",
      "Cleaning coordination checklist",
      "Landlord handover prep guidance",
      "Ejari cancellation instructions",
      "DEWA closure coordination",
      "Key handover documentation",
    ],
    route: "/exit-dubai",
    routeLabel: "Exit planning →",
    whatsappMsg: "Hi DeliWer, I want the Deposit Protection package at AED 499.",
    justification: "Dubai tenants lose an average of AED 3,500 in disputed deposits. AED 499 to protect a deposit worth AED 5,000–20,000 is an obvious financial decision.",
    vendorEstimate: null,
    diyRisk: null,
    saving: null,
    isBest: false,
  },
  {
    id: "standard",
    name: "Standard Move Coordination",
    price: 899,
    badge: "★ Best Value",
    color: "emerald",
    tagline: "One coordinator. Everything handled.",
    forWho: "Families or professionals who need full multi-vendor move-in management.",
    features: [
      "Dedicated move coordinator",
      "Full move-in timeline management",
      "Vendor scheduling & follow-up",
      "Ejari & DEWA activation guidance",
      "Post-move quality checklist",
      "Priority response 7am–10pm",
    ],
    route: "/relocate",
    routeLabel: "Start coordination →",
    whatsappMsg: "Hi DeliWer, I want Standard Move Coordination at AED 899.",
    justification: "AED 899 buys you a dedicated human who manages Ejari, DEWA, movers, and vendors — while you focus on your job and family.",
    vendorEstimate: { label: "Typical vendor costs*", range: "AED 3,200–5,000" },
    diyRisk: "Without coordination, 60% of Dubai move-ins experience a critical delay — costing tenants money and time.",
    saving: "Save AED 1,200+ vs managing vendors yourself",
    isBest: true,
  },
  {
    id: "executive",
    name: "Executive Exit",
    price: 2499,
    badge: "Premium Concierge",
    color: "slate",
    tagline: "Exit Dubai without a single phone call.",
    forWho: "HNWIs, families, or professionals with complex exits needing guaranteed outcomes.",
    features: [
      "Dedicated account manager",
      "Full security deposit recovery strategy",
      "Furniture removal & disposal coordination",
      "Deep cleaning coordination",
      "Landlord handover negotiation",
      "Legal documentation support",
      "Ejari cancellation + DEWA closure",
    ],
    route: "/exit-dubai",
    routeLabel: "See exit options →",
    whatsappMsg: "Hi DeliWer, I want the Executive Exit package at AED 2,499.",
    justification: "For complex exits, a dedicated manager eliminates every loose end and maximises deposit recovery.",
    vendorEstimate: { label: "Typical vendor costs*", range: "AED 2,000–6,000" },
    diyRisk: "Average Dubai tenant loses AED 3,500+ in deposit disputes and unexpected exit costs.",
    saving: "Protect up to AED 20,000 in security deposit",
    isBest: false,
  },
];

const COLOR_MAP: Record<string, { accent: string; badge: string; check: string; ring: string; cta: string }> = {
  purple:  { accent: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",   check: "text-purple-400",  ring: "border-white/10 hover:border-purple-500/30",  cta: "bg-white/5 hover:bg-white/10 text-white border border-white/10" },
  teal:    { accent: "text-teal-400",    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20",          check: "text-teal-400",    ring: "border-white/10 hover:border-teal-500/30",    cta: "bg-white/5 hover:bg-white/10 text-white border border-white/10" },
  amber:   { accent: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",       check: "text-amber-400",   ring: "border-white/10 hover:border-amber-500/30",   cta: "bg-white/5 hover:bg-white/10 text-white border border-white/10" },
  emerald: { accent: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", check: "text-emerald-400", ring: "border-emerald-500/60 shadow-emerald-500/15 shadow-2xl scale-[1.03]", cta: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30 shadow-lg" },
  slate:   { accent: "text-gray-300",    badge: "bg-white/10 text-gray-300 border-white/20",                check: "text-gray-400",   ring: "border-white/10 hover:border-white/20",       cta: "bg-white/5 hover:bg-white/10 text-white border border-white/10" },
};

/* ─────────────────────────────────────────────
   FOUNDATION BLOCK — AquaCafe 99
───────────────────────────────────────────── */
function FoundationBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto px-4 mb-10"
    >
      <div className="relative bg-gradient-to-r from-blue-900/40 to-cyan-900/30 border border-blue-500/30 rounded-3xl p-6 md:p-8 overflow-hidden">
        {/* decorative glow */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          {/* icon + label */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Droplets className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-widest">Foundation · Included in every plan</p>
              <h3 className="text-white font-black text-xl md:text-2xl tracking-tight">AquaCafe Loyalty</h3>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-blue-300/70 text-xs font-black uppercase">AED</span>
                <span className="text-3xl font-black text-white tracking-tight">99</span>
                <span className="text-blue-300/50 text-xs self-end pb-0.5">/ standalone</span>
              </div>
            </div>
          </div>

          {/* features */}
          <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-4">
            {[
              "Shower / tap filter subscription",
              "AquaCafe loyalty points",
              "Priority filter replacement",
              "WhatsApp support",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                <span className="text-gray-300 text-xs font-medium">{f}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 shrink-0 min-w-[200px]">
            <a
              href={wa("Hi DeliWer, I want to start the AquaCafe Loyalty plan at AED 99.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-pricing-loyalty"
            >
              <Button className="w-full h-10 bg-blue-500 hover:bg-blue-400 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-blue-500/20 shadow-lg">
                <MessageSquare className="w-3.5 h-3.5 mr-2" />
                Start for AED 99
              </Button>
            </a>
            <Link href="/aquacafe">
              <Button variant="ghost" className="w-full h-9 text-blue-400 hover:text-blue-300 font-bold text-xs rounded-xl">
                Learn about AquaCafe →
              </Button>
            </Link>
          </div>
        </div>

        {/* upgrade callout */}
        <div className="relative mt-5 pt-5 border-t border-blue-500/20 flex flex-wrap items-center gap-3">
          <Star className="w-4 h-4 text-blue-400 shrink-0" />
          <p className="text-blue-300/80 text-xs font-medium">
            <span className="text-white font-bold">AquaCafe Loyalty is included free</span> in every upgrade plan below.
            Start at AED 99 today — upgrade to any plan anytime within the year.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   UPGRADE PLAN CARD
───────────────────────────────────────────── */
function PlanCard({ plan, index }: { plan: typeof UPGRADE_PLANS[0]; index: number }) {
  const c = COLOR_MAP[plan.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      viewport={{ once: true }}
      className={`relative flex flex-col bg-slate-900 border rounded-3xl overflow-hidden transition-all duration-300 ${c.ring}`}
    >
      {/* Best Value ribbon */}
      {plan.isBest && (
        <>
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            Best Value
          </div>
        </>
      )}

      {/* Header */}
      <div className="px-6 pt-6 pb-0 space-y-3">
        {/* badge row */}
        <div className="flex items-center justify-between gap-2 flex-wrap pr-20">
          <span className={`text-[10px] font-black uppercase tracking-widest border rounded-full px-3 py-1 ${c.badge}`}>
            {plan.badge}
          </span>
          {plan.route && (
            <Link href={plan.route} className={`text-[10px] font-bold underline underline-offset-2 ${c.accent} hover:opacity-70 transition-opacity`}>
              {plan.routeLabel}
            </Link>
          )}
        </div>

        {/* name */}
        <h3 className="text-white font-black text-lg uppercase tracking-tighter leading-tight">{plan.name}</h3>
        <p className={`text-xs font-bold italic ${c.accent}`}>{plan.tagline}</p>

        {/* price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-gray-500 text-xs font-black uppercase">AED</span>
          <span className={`text-5xl font-black tracking-tighter ${plan.isBest ? "text-white" : "text-gray-200"}`}>
            {plan.price.toLocaleString()}
          </span>
          <span className="text-gray-500 text-xs self-end pb-1">DeliWer fee</span>
        </div>

        {plan.vendorEstimate && (
          <p className="text-blue-400 text-xs font-bold">
            + {plan.vendorEstimate.range} <span className="text-gray-600 font-normal">{plan.vendorEstimate.label} (paid direct)</span>
          </p>
        )}
        {plan.saving && (
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wide">{plan.saving}</span>
          </div>
        )}
      </div>

      {/* For who */}
      <div className="px-6 py-3 border-t border-white/5 mt-3">
        <p className="text-gray-500 text-xs leading-relaxed">
          <span className="text-gray-400 font-bold">For: </span>{plan.forWho}
        </p>
      </div>

      {/* Features */}
      <div className="px-6 pb-4 flex-1 space-y-2">
        {/* AquaCafe base always first */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-blue-500/20">
          <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-blue-300 text-xs font-bold">AquaCafe Loyalty (AED 99) — included free</span>
        </div>
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-sm font-medium text-gray-300">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.check}`} />
            <span>{f}</span>
          </div>
        ))}
      </div>

      {/* DIY risk */}
      {plan.diyRisk && (
        <div className="mx-6 mb-4 bg-red-500/5 border border-red-500/15 rounded-2xl px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-300/80 font-medium leading-relaxed">{plan.diyRisk}</p>
          </div>
        </div>
      )}

      {/* Justification */}
      <div className="mx-6 mb-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
        <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">{plan.justification}</p>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <a
          href={wa(plan.whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`button-pricing-${plan.id}`}
        >
          <Button className={`w-full h-12 font-black uppercase tracking-widest rounded-2xl text-sm transition-all ${c.cta}`}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Book via WhatsApp
          </Button>
        </a>
        <p className="text-center text-[10px] text-gray-600 font-medium mt-2">
          Response within 10 min · No deposit required to start
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   COST TRANSPARENCY EXPLAINER
───────────────────────────────────────────── */
function TransparencyBanner() {
  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">How DeliWer pricing works</p>
            <h3 className="text-white font-black text-xl md:text-2xl leading-tight">
              You pay DeliWer for coordination only.
            </h3>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-2xl">
              All vendor costs — movers, cleaning, Ejari government fees, DEWA deposits — are paid
              separately, directly to vendors, at <span className="text-white font-bold">transparent market rates</span>.
              DeliWer adds no markup. Our partner network often delivers lower quotes than going direct.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "DeliWer fee", desc: "Coordination only — what we charge" },
            { label: "Vendor costs", desc: "Movers, cleaning, fees — market rate, paid direct" },
            { label: "Total expected spend", desc: "DeliWer fee + vendor estimate — shown clearly" },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <p className="text-white font-black text-sm uppercase tracking-wide">{item.label}</p>
              <p className="text-gray-400 text-xs font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DIY vs DELIWER COMPARISON
───────────────────────────────────────────── */
function DIYComparison() {
  return (
    <div className="max-w-4xl mx-auto my-20 px-4">
      <div className="text-center mb-10 space-y-2">
        <p className="text-amber-400 font-black text-xs uppercase tracking-widest">The real cost of going alone</p>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
          DIY always costs more than you think
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 md:p-8 space-y-4">
          <p className="text-red-400 font-black uppercase text-xs tracking-widest mb-4">The DIY route</p>
          {[
            { issue: "Movers quote variance", detail: "Without a network, tenants pay 20–40% above market. Add AED 400–900." },
            { issue: "Ejari queue time", detail: "Half a day lost at a typing center. Lost wages: AED 200–500." },
            { issue: "DEWA mistakes & reactivation", detail: "Wrong submission delays connection by 3–5 days. Re-activation fee: AED 130–300." },
            { issue: "Cleaning disputes", detail: "No documentation = landlord wins. Deposit loss: AED 1,500–5,000." },
            { issue: "Vendor no-shows", detail: "No accountability. Average: 1–2 reschedules per service." },
          ].map((row, i) => (
            <div key={i} className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-200 font-bold text-sm">{row.issue}</p>
                <p className="text-gray-500 text-xs">{row.detail}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-red-500/20 pt-4">
            <p className="text-red-300 font-black text-sm uppercase">Hidden cost: AED 2,200–7,700 extra on average</p>
          </div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-3xl p-6 md:p-8 space-y-4">
          <p className="text-emerald-400 font-black uppercase text-xs tracking-widest mb-4">The DeliWer way</p>
          {[
            { benefit: "Network pricing on movers", detail: "Volume rates through SGM & partners. Same or lower than market." },
            { benefit: "Ejari handled remotely", detail: "No queues. We coordinate with Trustee Centers. Done in 1–2 business days." },
            { benefit: "DEWA activation guaranteed", detail: "Our team follows up until active. Zero reactivation fees." },
            { benefit: "Cleaning with documentation", detail: "Pre and post photos for every job. Full deposit protection." },
            { benefit: "Vendors are accountable to us", detail: "We manage them. No no-shows, no chasing, no surprises." },
          ].map((row, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold text-sm">{row.benefit}</p>
                <p className="text-gray-400 text-xs">{row.detail}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-emerald-500/20 pt-4">
            <p className="text-emerald-300 font-black text-sm uppercase">You pay only DeliWer's coordination fee + vendor market rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AFFILIATE CLARITY SECTION
───────────────────────────────────────────── */
function AffiliateNote() {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <BadgePercent className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
          <div className="space-y-4">
            <div>
              <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-1">For Affiliates & Distribution Partners</p>
              <h3 className="text-white font-black text-lg md:text-xl">
                Commission is earned on the DeliWer fee only — never on vendor costs.
              </h3>
            </div>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">
              When you refer a client, your commission is calculated exclusively on DeliWer's
              coordination fee. Vendor costs (movers, cleaning, Ejari, DEWA) flow directly from the
              client to the vendor and are never part of the commissionable amount.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { label: "AED 899 package", base: "AED 899", example: "10% = AED 89.90" },
                { label: "AED 399 package", base: "AED 399", example: "10% = AED 39.90" },
                { label: "AED 2,499 package", base: "AED 2,499", example: "10% = AED 249.90" },
              ].map((ex, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-4 space-y-1">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{ex.label}</p>
                  <p className="text-white font-black text-sm">Commission base: {ex.base}</p>
                  <p className="text-emerald-400 text-xs font-bold">{ex.example}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs font-medium">
              Actual commission rates are agreed separately per affiliate agreement. These examples use 10% for illustration only.
            </p>
            <a
              href={wa("Hi DeliWer, I am interested in joining the affiliate / distribution partner programme.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl px-6 h-10 text-xs uppercase tracking-widest mt-2">
                Apply to Partner Programme <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export function ConciergePricing({ category }: { category?: string }) {
  return (
    <div className="py-8">
      <TransparencyBanner />

      {/* Foundation — AquaCafe 99 */}
      <FoundationBlock />

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest whitespace-nowrap">
            Upgrade plans — AquaCafe Loyalty included in all
          </p>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </div>

      {/* Plan cards grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {UPGRADE_PLANS.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>

      {/* Trust footer */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-center px-4">
        {[
          { icon: ShieldCheck, text: "No hidden fees" },
          { icon: Zap,         text: "Response in 10 min" },
          { icon: Users,       text: "Vetted partner network" },
          { icon: Clock,       text: "Market-rate vendors" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <item.icon className="w-4 h-4 text-emerald-500/50" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <DIYComparison />
      <AffiliateNote />

      <p className="text-center text-gray-600 text-[10px] font-medium max-w-xl mx-auto px-4 pb-8">
        * Vendor cost estimates are indicative only and vary by apartment size, location, and provider.
        DeliWer does not markup vendor services — all vendor payments are made directly at market rate.
        Affiliates earn commission exclusively on the DeliWer coordination fee.
      </p>
    </div>
  );
}
