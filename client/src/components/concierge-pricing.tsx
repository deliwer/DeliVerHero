import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  MessageSquare,
  Clock,
  ShieldCheck,
  TrendingDown,
  AlertTriangle,
  Users,
  Zap,
  ArrowRight,
  Info,
  BadgePercent,
} from "lucide-react";
import { Link } from "wouter";

const WHATSAPP_NUMBER = "971523946311";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ─────────────────────────────────────────────
   PRICING TIERS — single source of truth
───────────────────────────────────────────── */
const TIERS = [
  {
    id: "loyalty",
    name: "AquaCafe Loyalty",
    price: 99,
    color: "blue",
    badge: "Entry",
    route: "/aquacafe",
    routeLabel: "Learn more →",
    tagline: "Filtered water, delivered lifestyle.",
    forWho: "Residents who want healthier water without a big commitment.",
    deliwerFee: 99,
    vendorEstimate: null,
    features: [
      "Shower / tap filter subscription",
      "AquaCafe loyalty points",
      "Priority filter replacement",
      "WhatsApp support",
    ],
    whatsappMsg:
      "Hi DeliWer, I want to start the AquaCafe Loyalty plan at AED 99.",
    justification:
      "The lowest-friction way to experience DeliWer. Proves value before committing to larger coordination.",
  },
  {
    id: "ejari",
    name: "Ejari Renewal",
    price: 199,
    color: "purple",
    badge: "Compliance",
    route: "/ejari-dubai",
    routeLabel: "Learn more →",
    tagline: "Stay legal. Stay in your home.",
    forWho: "Settled residents whose Ejari is expiring — or first-time registrations.",
    deliwerFee: 199,
    vendorEstimate: null,
    features: [
      "Trustee Center coordination",
      "Document audit & checklist",
      "UAE Pass biometric support",
      "Fast-track processing",
      "Digital certificate delivery",
    ],
    whatsappMsg:
      "Hi DeliWer, I need Ejari renewal coordination at AED 199.",
    justification:
      "Without Ejari, tenants risk fines, lease void, and access issues. Paying AED 199 vs losing a day at a government center is the obvious choice.",
  },
  {
    id: "movein",
    name: "Move-In Welcome",
    price: 399,
    color: "emerald",
    badge: "Most Popular — Home Setup",
    route: "/relocate",
    routeLabel: "Plan my move →",
    tagline: "Move in ready. From day one.",
    forWho: "New tenants within the first 7 days of receiving apartment keys.",
    deliwerFee: 399,
    vendorEstimate: null,
    features: [
      "60–90 min activation visit",
      "Shower filter supply + install",
      "AC filter clean (1 unit)",
      "Water readiness check",
      "Essentials setup guidance",
      "WhatsApp follow-up support",
    ],
    whatsappMsg:
      "Hi DeliWer, I just received my keys and want the Move-In Welcome service at AED 399.",
    isMain: true,
    justification:
      "Most tenants discover water quality issues, missing filters, and unactivated utilities on Day 1. DeliWer handles it in one visit.",
  },
  {
    id: "deposit",
    name: "Deposit Protection",
    price: 499,
    color: "amber",
    badge: "Exit — Protect Your Money",
    route: "/exit-dubai",
    routeLabel: "Exit planning →",
    tagline: "Leave without losing your deposit.",
    forWho: "Tenants preparing to move out who want their security deposit returned in full.",
    deliwerFee: 499,
    vendorEstimate: null,
    features: [
      "Pre-exit property condition audit",
      "Cleaning coordination checklist",
      "Landlord handover prep guidance",
      "Ejari cancellation instructions",
      "DEWA closure coordination",
      "Key handover documentation",
    ],
    whatsappMsg:
      "Hi DeliWer, I want the Deposit Protection package at AED 499.",
    justification:
      "Dubai tenants lose an average of AED 3,500 in disputed deposits. AED 499 to protect a deposit worth AED 5,000–20,000 is an obvious financial decision.",
  },
  {
    id: "standard",
    name: "Standard Move Coordination",
    price: 899,
    color: "emerald",
    badge: "★ Best Value — Full Coordination",
    route: "/relocate",
    routeLabel: "Start coordination →",
    tagline: "One coordinator. Everything handled.",
    forWho: "Families or professionals who need full multi-vendor move-in management.",
    deliwerFee: 899,
    vendorEstimate: { label: "Typical vendor costs*", range: "AED 3,200–5,000" },
    features: [
      "Dedicated move coordinator",
      "Full move-in timeline management",
      "Vendor scheduling & follow-up",
      "Ejari & DEWA activation guidance",
      "Post-move quality checklist",
      "Priority response 7am–10pm",
    ],
    whatsappMsg:
      "Hi DeliWer, I want Standard Move Coordination at AED 899.",
    isMain: true,
    diyRisk:
      "Without coordination, 60% of Dubai move-ins experience a critical delay — costing tenants money and time.",
    saving: "Save AED 1,200+ vs. managing vendors yourself in time and error cost",
    justification:
      "AED 899 buys you a dedicated human who manages Ejari, DEWA, movers, and vendors — while you focus on your job and family.",
  },
  {
    id: "executive",
    name: "Executive Exit",
    price: 2499,
    color: "slate",
    badge: "Premium — Full Concierge Exit",
    route: "/exit-dubai",
    routeLabel: "See exit options →",
    tagline: "Exit Dubai without a single phone call.",
    forWho: "HNWIs, families, or professionals with complex exits needing guaranteed outcomes.",
    deliwerFee: 2499,
    vendorEstimate: { label: "Typical vendor costs*", range: "AED 2,000–6,000" },
    features: [
      "Dedicated account manager",
      "Full security deposit recovery strategy",
      "Furniture removal & disposal coordination",
      "Deep cleaning coordination",
      "Landlord handover negotiation",
      "Legal documentation support",
      "Ejari cancellation + DEWA closure",
    ],
    whatsappMsg:
      "Hi DeliWer, I want the Executive Exit package at AED 2,499.",
    diyRisk:
      "Average Dubai tenant loses AED 3,500+ in deposit disputes and unexpected exit costs.",
    saving: "Protect up to AED 20,000 in security deposit",
    justification:
      "For complex exits, the coordination risk is high. A dedicated manager eliminates every loose end and maximises deposit recovery.",
  },
];

const COLOR_MAP: Record<string, { accent: string; badge: string; check: string; ring: string }> = {
  blue:    { accent: "text-blue-400",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",    check: "text-blue-400",    ring: "border-blue-500/40" },
  purple:  { accent: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", check: "text-purple-400", ring: "border-purple-500/40" },
  emerald: { accent: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", check: "text-emerald-400", ring: "border-emerald-500/50 shadow-emerald-500/10 shadow-xl" },
  amber:   { accent: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   check: "text-amber-400",   ring: "border-amber-500/40" },
  slate:   { accent: "text-gray-300",    badge: "bg-white/10 text-gray-300 border-white/20",            check: "text-gray-400",    ring: "border-white/20" },
};

/* ─────────────────────────────────────────────
   COST TRANSPARENCY EXPLAINER
───────────────────────────────────────────── */
function TransparencyBanner() {
  return (
    <div className="max-w-4xl mx-auto mb-16 px-4">
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">
              How DeliWer pricing works
            </p>
            <h3 className="text-white font-black text-xl md:text-2xl leading-tight">
              You pay DeliWer for coordination only.
            </h3>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-2xl">
              All vendor costs — movers, cleaning, Ejari government fees, DEWA deposits — are paid
              separately, directly to vendors, at <span className="text-white font-bold">transparent market rates</span>.
              DeliWer adds no markup on vendor services. Our partner network often delivers
              lower vendor quotes than going direct, because of volume relationships.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "DeliWer fee", desc: "Coordination only — what we charge", color: "emerald" },
            { label: "Vendor costs", desc: "Movers, cleaning, fees — market rate, paid direct", color: "blue" },
            { label: "Total expected spend", desc: "DeliWer fee + vendor estimate — shown clearly", color: "amber" },
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
        {/* DIY */}
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
            <p className="text-red-300 font-black text-sm uppercase">
              Hidden cost: AED 2,200–7,700 extra on average
            </p>
          </div>
        </div>

        {/* DeliWer */}
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
            <p className="text-emerald-300 font-black text-sm uppercase">
              You pay only DeliWer's coordination fee + vendor market rate
            </p>
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
              <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-1">
                For Affiliates & Distribution Partners
              </p>
              <h3 className="text-white font-black text-lg md:text-xl">
                Commission is earned on the DeliWer fee only — never on vendor costs.
              </h3>
            </div>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">
              When you refer a client, your commission is calculated exclusively on DeliWer's
              coordination fee — the price shown on each package. Vendor costs (movers, cleaning,
              Ejari government fees, DEWA) flow directly from the client to the vendor. These are
              never part of the commissionable amount.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { label: "AED 899 package", commissionBase: "AED 899", example: "10% = AED 89.90" },
                { label: "AED 399 package", commissionBase: "AED 399", example: "10% = AED 39.90" },
                { label: "AED 2,499 package", commissionBase: "AED 2,499", example: "10% = AED 249.90" },
              ].map((ex, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-4 space-y-1">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{ex.label}</p>
                  <p className="text-white font-black text-sm">Commission base: {ex.commissionBase}</p>
                  <p className="text-emerald-400 text-xs font-bold">{ex.example}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs font-medium">
              Actual commission rates are agreed separately per affiliate agreement.
              These examples use 10% for illustration only.
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
   SINGLE TIER CARD
───────────────────────────────────────────── */
function TierCard({ tier, index }: { tier: typeof TIERS[0]; index: number }) {
  const c = COLOR_MAP[tier.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`relative flex flex-col bg-slate-900 border rounded-3xl overflow-hidden transition-all duration-300 ${
        tier.isMain ? `${c.ring} scale-[1.02]` : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* top accent bar */}
      {tier.isMain && <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />}

      {/* badge */}
      <div className="px-6 pt-6 flex items-center justify-between gap-2 flex-wrap">
        <span className={`text-[10px] font-black uppercase tracking-widest border rounded-full px-3 py-1 ${c.badge}`}>
          {tier.badge}
        </span>
        {tier.route && (
          <Link href={tier.route} className={`text-[10px] font-bold underline underline-offset-2 ${c.accent} hover:opacity-70 transition-opacity`}>
            {tier.routeLabel}
          </Link>
        )}
      </div>

      {/* name + price */}
      <div className="px-6 pt-4 pb-2 space-y-1">
        <h3 className="text-white font-black text-xl uppercase tracking-tighter">{tier.name}</h3>
        <p className={`text-xs font-bold italic ${c.accent}`}>{tier.tagline}</p>
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-gray-500 text-xs font-black uppercase">AED</span>
          <span className={`text-5xl font-black tracking-tighter ${tier.isMain ? "text-white" : "text-gray-200"}`}>
            {tier.price.toLocaleString()}
          </span>
          <span className="text-gray-500 text-xs font-medium self-end pb-1">DeliWer fee only</span>
        </div>
        {tier.vendorEstimate && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-gray-500 text-xs">+</span>
            <span className="text-blue-400 text-xs font-bold">{tier.vendorEstimate.label}: {tier.vendorEstimate.range}</span>
            <span className="text-gray-600 text-[10px]">(paid to vendors)</span>
          </div>
        )}
        {tier.saving && (
          <div className="flex items-center gap-1.5 pt-1">
            <TrendingDown className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wide">{tier.saving}</span>
          </div>
        )}
      </div>

      {/* who it's for */}
      <div className="px-6 pb-4">
        <p className="text-gray-500 text-xs font-medium border-t border-white/5 pt-3 leading-relaxed">
          <span className="text-gray-400 font-bold">For: </span>{tier.forWho}
        </p>
      </div>

      {/* features */}
      <div className="px-6 pb-4 flex-1 space-y-2">
        {tier.features.map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-sm font-medium text-gray-300">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.check}`} />
            <span>{f}</span>
          </div>
        ))}
      </div>

      {/* justification */}
      <div className="mx-6 mb-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
        <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
          {tier.justification}
        </p>
      </div>

      {/* DIY risk warning */}
      {tier.diyRisk && (
        <div className="mx-6 mb-4 bg-red-500/5 border border-red-500/15 rounded-2xl px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-300/80 font-medium leading-relaxed">{tier.diyRisk}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="px-6 pb-6">
        <a
          href={wa(tier.whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`button-pricing-${tier.id}`}
        >
          <Button
            className={`w-full h-12 font-black uppercase tracking-widest rounded-2xl text-sm shadow-xl transition-all ${
              tier.isMain
                ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30"
                : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
            }`}
          >
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
   MAIN EXPORT
───────────────────────────────────────────── */
export function ConciergePricing({ category }: { category?: string }) {
  const [activeGroup, setActiveGroup] = useState<"all" | "movein" | "exit" | "ongoing">("all");

  const groups = [
    { key: "all",     label: "All Services" },
    { key: "movein",  label: "Moving In" },
    { key: "exit",    label: "Moving Out" },
    { key: "ongoing", label: "Ongoing" },
  ] as const;

  const groupFilter: Record<string, string[]> = {
    all:     ["loyalty", "ejari", "movein", "deposit", "standard", "executive"],
    movein:  ["ejari", "movein", "standard"],
    exit:    ["deposit", "executive"],
    ongoing: ["loyalty", "ejari"],
  };

  const visible = TIERS.filter(t => groupFilter[activeGroup].includes(t.id));

  return (
    <div className="py-8">
      <TransparencyBanner />

      {/* Group filter tabs */}
      <div className="flex justify-center gap-2 flex-wrap px-4 mb-12">
        {groups.map(g => (
          <button
            key={g.key}
            onClick={() => setActiveGroup(g.key)}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
              activeGroup === g.key
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {visible.map((tier, i) => (
          <TierCard key={tier.id} tier={tier} index={i} />
        ))}
      </div>

      {/* Trust footer */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-center px-4">
        {[
          { icon: ShieldCheck, text: "No hidden fees" },
          { icon: Zap,        text: "Response in 10 min" },
          { icon: Users,      text: "Vetted partner network" },
          { icon: Clock,      text: "Market-rate vendors" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <item.icon className="w-4 h-4 text-emerald-500/50" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <DIYComparison />
      <AffiliateNote />

      {/* Vendor cost footnote */}
      <p className="text-center text-gray-600 text-[10px] font-medium max-w-xl mx-auto px-4 pb-8">
        * Vendor cost estimates are indicative only and vary by apartment size, location, and provider.
        DeliWer does not markup vendor services — all vendor payments are made directly at market rate.
        Affiliates earn commission exclusively on the DeliWer coordination fee.
      </p>
    </div>
  );
}
