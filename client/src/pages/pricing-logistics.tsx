import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2, Shield, Gavel, ClipboardCheck, Lock, DollarSign,
  Package, Truck, Plane, Ship, ArrowRight, MessageSquare,
  FileCheck, AlertTriangle, BarChart3, Layers, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WA = "https://wa.me/971523906019?text=Hi+ChainTrack+%E2%80%94+I%27d+like+a+pricing+breakdown+for+my+shipment.";

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >{children}</motion.div>
  );
}

const PLATFORM_FEES = [
  { tier: "On-Demand", price: "Free", fee: "0.50%", lots: "Standard", earlyAccess: "—", support: "Email", manager: "—", charter: "—", color: "border-[#1E293B]", badge: "" },
  { tier: "Starter", price: "$299/mo", fee: "0.30%", lots: "Priority +1h", earlyAccess: "1h", support: "WhatsApp", manager: "—", charter: "—", color: "border-cyan-500/30", badge: "" },
  { tier: "Growth", price: "$799/mo", fee: "0.25%", lots: "Priority +3h", earlyAccess: "3h", support: "Dedicated WA", manager: "Included", charter: "Coordination", color: "border-purple-500/40", badge: "POPULAR" },
  { tier: "Enterprise", price: "Custom", fee: "0.20%", lots: "Exclusive 24h", earlyAccess: "24h", support: "Ops Team", manager: "Dedicated", charter: "1FLT Included", color: "border-amber-500/40", badge: "BEST" },
];

const TRANSACTION_FEES = [
  { label: "Platform Transaction Fee", explorer: "0.50%", standard: "0.35%", priority: "0.25%", enterprise: "0.20%", note: "Applied to final lot value at settlement" },
  { label: "Bid Placement", explorer: "Free", standard: "Free", priority: "Free", enterprise: "Free", note: "No charge to submit bids" },
  { label: "Reverse Auction Submission", explorer: "Free", standard: "Free", priority: "Free", enterprise: "Free", note: "Submit target price, suppliers respond" },
  { label: "XLSX Lot Matching", explorer: "Free", standard: "Free", priority: "Free", enterprise: "Free", note: "Upload wishlist — matched against all feeds" },
  { label: "Wire Transfer Processing", explorer: "$25/txn", standard: "$15/txn", priority: "$10/txn", enterprise: "Waived", note: "International wire handling fee" },
];

const INSPECTION_FEES = [
  { service: "Basic Visual Inspection", description: "Cosmetic grade check, screen, body, buttons — per unit", cost: "$2.50 / unit", min: "$150", turnaround: "24h", badge: "bg-slate-700/50 text-slate-300 border-slate-600/40" },
  { service: "Full Functional Test", description: "Touchscreen, Face ID / fingerprint, cellular, Wi-Fi, battery health ≥ 80%", cost: "$4.00 / unit", min: "$200", turnaround: "48h", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
  { service: "IMEI Verification & Blacklist Check", description: "Global IMEI registry cross-check — GSM Arena, GSMA, CarrierBlock", cost: "$1.00 / unit", min: "$50", turnaround: "Same day", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
  { service: "Grade Certification Report", description: "Written grade cert (A/B/C) per unit with photo evidence — required for customs", cost: "$1.50 / unit", min: "$75", turnaround: "48h", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
  { service: "Bulk Pre-Shipment Inspection", description: "Full-lot inspection at DAFZA warehouse before dispatch — up to 500 units", cost: "$350 flat", min: "—", turnaround: "48h", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  { service: "Priority Inspection (Rush)", description: "Same-day inspection for time-sensitive auctions — surcharge on top of base", cost: "+$1.50 / unit", min: "$200", turnaround: "Same day", badge: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
];

const ESCROW_FEES = [
  { service: "Standard Escrow Hold", description: "Funds held in escrow from bid acceptance to delivery confirmation", cost: "0.15% of lot value", min: "$75", max: "$2,500 cap", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
  { service: "Express Escrow Release", description: "Expedited release within 2 hours of delivery confirmation (vs standard 24h)", cost: "$50 flat", min: "—", max: "—", badge: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  { service: "Dispute Mediation", description: "ChainTrack arbitration if grade or quantity dispute — covers both parties", cost: "$150 flat", min: "—", max: "Refunded if buyer wins", badge: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
  { service: "Escrow Extension (per 7 days)", description: "Extend hold period for delayed freight or customs clearance", cost: "$25 / week", min: "—", max: "—", badge: "bg-slate-700/50 text-slate-300 border-slate-600/40" },
  { service: "Multi-Lot Batch Escrow", description: "Single escrow account covering up to 5 simultaneous lots — reduced admin", cost: "0.10% of combined value", min: "$100", max: "$3,000 cap", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
];

const FREIGHT_FEES = [
  { route: "DXB → CIS (Baku / Almaty / Tashkent)", mode: "Air", transit: "2–5 days", rate: "From $3.20/kg", min: "50kg min", note: "DAFZA-cleared, zero re-export duty" },
  { route: "DXB → Karachi", mode: "Air", transit: "1–2 days", rate: "From $2.80/kg", min: "50kg min", note: "CPEC-bonded option available" },
  { route: "Jebel Ali → CIS", mode: "Sea (FCL/LCL)", transit: "12–18 days", rate: "From $420/CBM (LCL)", min: "1 CBM", note: "LCL consolidation included" },
  { route: "Dubai → Gawadar (CPEC FZ)", mode: "Sea", transit: "4–6 days", rate: "From $280/CBM", min: "1 CBM", note: "CPEC Free Zone bonded" },
  { route: "DXB → Moscow / St. Petersburg", mode: "Air", transit: "3–5 days", rate: "From $4.10/kg", min: "50kg min", note: "Compliance documentation included" },
  { route: "DXB → Overland INSTC Rail", mode: "Rail", transit: "8–16 days", rate: "From $1.80/kg", min: "100kg min", note: "Iran / Russia INSTC corridor" },
];

const OTHER_FEES = [
  { fee: "DAFZA Customs Clearance", cost: "AED 350 flat", note: "Per lot — includes documentation and release" },
  { fee: "Re-export Documentation", cost: "AED 150 flat", note: "Certificate of Origin + trade compliance pack" },
  { fee: "IMEI Unlocking (per unit)", cost: "$8.00 / unit", note: "Carrier unlock for CIS / Pakistan market compatibility" },
  { fee: "Lot Photography (per unit)", cost: "$0.50 / unit", note: "Min 4 images per unit for buyer confirmation" },
  { fee: "Repackaging / Relabelling", cost: "$1.20 / unit", note: "New outer box, barcode, destination market label" },
  { fee: "Storage at DAFZA (per week)", cost: "AED 80 / pallet", note: "After 3 free days post-clearance" },
  { fee: "Charter Booking Coordination", cost: "2% of charter cost", note: "Min $250 — applies to 1FLT and spot charter" },
  { fee: "Account Activation (one-time)", cost: "Free", note: "No setup fee — KYC verification required" },
];

export default function PricingLogisticsPage() {
  return (
    <div className="min-h-screen bg-[#080b10] text-white">
      <Helmet>
        <title>ChainTrack Logistics Pricing — Fees, Inspection & Escrow | DeliWer</title>
        <meta name="description" content="Full pricing breakdown for ChainTrack Logistics — platform fees, inspection fees, escrow charges, freight rates, and membership tiers." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-6 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/25 gap-1.5 mb-6 text-xs">
              <DollarSign className="w-3.5 h-3.5" /> Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Every Fee.<br />
              <span className="text-amber-400">No Surprises.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-8">
              Full breakdown of platform fees, inspection charges, escrow costs, freight rates, and membership tiers — everything you pay to move electronics through the ChainTrack corridor.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 w-full sm:w-auto" data-testid="button-hero-wa">
                  <MessageSquare className="w-5 h-5" /> Get a Custom Quote
                </Button>
              </a>
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" className="border-white/15 text-white/70 hover:bg-white/5 px-8 gap-2 h-12 w-full sm:w-auto">
                  View Live Auctions <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── MEMBERSHIP TIERS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Membership</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Buyer Membership Tiers</h2>
            <p className="text-white/40 text-sm max-w-xl">Lower fees, priority access to new lots, and dedicated support for high-volume buyers.</p>
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-5">
            {PLATFORM_FEES.map((tier, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className={`bg-[#0D1424] border ${tier.color} rounded-2xl p-6 relative h-full flex flex-col`} data-testid={`card-tier-${tier.tier.toLowerCase().replace(/\s/g, '-')}`}>
                  {tier.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${tier.badge === "POPULAR" ? "bg-purple-500 text-white" : "bg-amber-500 text-slate-950"}`}>
                      {tier.badge}
                    </div>
                  )}
                  <div className="font-black text-white text-lg mb-1">{tier.tier}</div>
                  <div className="text-2xl font-black text-cyan-400 mb-1">{tier.price}</div>
                  <div className="text-[11px] text-slate-500 mb-4">Platform fee: <span className="text-slate-300 font-bold">{tier.fee}</span></div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {[
                      `Lot access: ${tier.lots}`,
                      `Early access: ${tier.earlyAccess}`,
                      `Support: ${tier.support}`,
                      `Account manager: ${tier.manager}`,
                      `Air charter: ${tier.charter}`,
                    ].map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${f.includes("—") ? "text-slate-700" : "text-emerald-400"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={WA} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#0A0F1E] hover:bg-[#1E293B] text-slate-300 border border-[#1E293B] font-black text-xs uppercase tracking-widest" data-testid={`button-tier-${tier.tier.toLowerCase().replace(/\s/g, '-')}`}>
                      {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSACTION FEES ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Transaction Fees</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Platform & Transaction Charges</h2>
            <p className="text-white/40 text-sm">Fees applied at settlement — no hidden charges added after the fact.</p>
          </FadeUp>
          <FadeUp>
            <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0A0F1E]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-5 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Fee Item</th>
                    <th className="text-center px-4 py-3.5 text-slate-300 font-black text-[10px] uppercase tracking-widest">Explorer</th>
                    <th className="text-center px-4 py-3.5 text-cyan-300 font-black text-[10px] uppercase tracking-widest">Standard</th>
                    <th className="text-center px-4 py-3.5 text-amber-300 font-black text-[10px] uppercase tracking-widest">Priority</th>
                    <th className="text-center px-4 py-3.5 text-purple-300 font-black text-[10px] uppercase tracking-widest">Enterprise</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {TRANSACTION_FEES.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-semibold text-white text-sm">{row.label}</td>
                      <td className="px-4 py-4 text-center text-slate-300 text-sm">{row.explorer}</td>
                      <td className="px-4 py-4 text-center text-cyan-300 font-semibold text-sm">{row.standard}</td>
                      <td className="px-4 py-4 text-center text-amber-300 font-semibold text-sm">{row.priority}</td>
                      <td className="px-4 py-4 text-center text-purple-300 font-semibold text-sm">{row.enterprise}</td>
                      <td className="px-4 py-4 text-white/35 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── INSPECTION FEES ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-white/8 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Inspection Fees</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Pre-Shipment Inspection Charges</h2>
            <p className="text-white/40 text-sm max-w-xl">All inspections performed at DAFZA-accredited facility. Grading follows ITAD A/B/C standards. Reports issued in English and Arabic.</p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-4">
            {INSPECTION_FEES.map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="border border-white/8 rounded-2xl p-5 bg-[#0D1424] h-full flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${item.badge} mb-2 inline-block`}>{item.service}</span>
                      <p className="text-sm text-white/60 leading-relaxed mt-1">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-white">{item.cost}</div>
                      {item.min !== "—" && <div className="text-[10px] text-white/30">Min: {item.min}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/6">
                    <FileCheck className="w-3.5 h-3.5 text-white/25 shrink-0" />
                    <span className="text-[11px] text-white/30">Turnaround: <span className="text-white/50 font-semibold">{item.turnaround}</span></span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESCROW FEES ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Escrow</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Escrow & Settlement Charges</h2>
            <p className="text-white/40 text-sm max-w-xl">Funds held by ChainTrack until delivery is confirmed and grading disputes resolved. Protects both buyer and seller on every transaction.</p>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ESCROW_FEES.map((item, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="border border-white/8 rounded-2xl p-5 bg-[#0D1424] h-full flex flex-col gap-3">
                  <div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${item.badge} mb-3 inline-block`}>{item.service}</span>
                    <p className="text-xs text-white/50 leading-relaxed mt-2">{item.description}</p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-white/6 flex items-end justify-between gap-2">
                    <span className="text-lg font-black text-white">{item.cost}</span>
                    <div className="text-right">
                      {item.min !== "—" && <div className="text-[10px] text-white/30">Min: {item.min}</div>}
                      {item.max !== "—" && <div className="text-[10px] text-white/30">{item.max}</div>}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREIGHT RATES ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-white/8 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">Freight</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Indicative Freight Rates</h2>
            <p className="text-white/40 text-sm max-w-xl">Rates are indicative — final quotes depend on volume, incoterms, and hazmat classification. WhatsApp for a live rate within 1 hour.</p>
          </FadeUp>
          <FadeUp>
            <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0A0F1E]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-5 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Route</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Mode</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Transit</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Rate (From)</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Min</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {FREIGHT_FEES.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-semibold text-white text-xs">{row.route}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                          row.mode === "Air" ? "text-sky-300 bg-sky-500/10 border-sky-500/30" :
                          row.mode === "Rail" ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/30" :
                          "text-blue-300 bg-blue-500/10 border-blue-500/30"
                        }`}>{row.mode}</span>
                      </td>
                      <td className="px-4 py-4 text-white/50 text-xs">{row.transit}</td>
                      <td className="px-4 py-4 text-amber-300 font-black text-sm">{row.rate}</td>
                      <td className="px-4 py-4 text-white/35 text-xs">{row.min}</td>
                      <td className="px-4 py-4 text-white/35 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── OTHER FEES ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Additional Charges</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Ancillary & Handling Fees</h2>
            <p className="text-white/40 text-sm">Optional services charged only when used — no bundling.</p>
          </FadeUp>
          <FadeUp>
            <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0A0F1E]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-5 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Service</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Cost</th>
                    <th className="text-left px-4 py-3.5 text-white/30 font-black text-[10px] uppercase tracking-widest">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {OTHER_FEES.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-semibold text-white text-sm">{row.fee}</td>
                      <td className="px-4 py-4 font-black text-amber-300 text-sm">{row.cost}</td>
                      <td className="px-4 py-4 text-white/35 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TRUST INDICATORS ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-white/8 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", title: "Escrow Protected", desc: "Every transaction held in escrow until delivery and grade confirmed. Zero risk of non-delivery." },
                { icon: FileCheck, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", title: "DAFZA Certified", desc: "All inspections at accredited DAFZA facility. Grade certificates valid for customs in 40+ markets." },
                { icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", title: "No Hidden Fees", desc: "All charges listed above are exhaustive. If it's not on this page, we don't charge it." },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl border p-5 flex flex-col gap-3 ${item.color.split(" ").slice(1).join(" ")}`}>
                  <item.icon className={`w-5 h-5 ${item.color.split(" ")[0]}`} />
                  <div>
                    <div className="font-black text-white text-sm mb-1">{item.title}</div>
                    <p className="text-[11px] text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-3xl font-black text-white mb-4">Ready to Move Your First Lot?</h2>
            <p className="text-white/40 mb-8 leading-relaxed">
              WhatsApp our team for a full quote — route, inspection, escrow, and freight — within one hour.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-10 gap-2 h-12 text-base" data-testid="button-cta-final">
                <MessageSquare className="w-5 h-5" /> WhatsApp for a Quote
              </Button>
            </a>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
