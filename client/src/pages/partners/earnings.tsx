import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const EARNINGS_TABLE = [
  { tenantCost: "AED 3,000", partnerRange: "AED 75 – 120", deliwerFee: "AED 300 – 450", tier: "Studio / Small 1BR" },
  { tenantCost: "AED 4,000", partnerRange: "AED 100 – 150", deliwerFee: "AED 400 – 600", tier: "1–2 Bedroom" },
  { tenantCost: "AED 5,000", partnerRange: "AED 130 – 180", deliwerFee: "AED 500 – 750", tier: "2–3 Bedroom" },
  { tenantCost: "AED 6,500", partnerRange: "AED 175 – 250", deliwerFee: "AED 650 – 975", tier: "Villa / Large Unit" },
];

const TIERS = [
  { type: "Influencers", pct: "20%", desc: "Content creators, bloggers, community admins", color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5" },
  { type: "Real Estate Agents", pct: "25%", desc: "Licensed agents, brokers, property consultants", color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
  { type: "Corporate Housing Partners", pct: "30%", desc: "HR teams, relocation companies, recruitment agencies", color: "text-purple-400 border-purple-500/20 bg-purple-500/5" },
  { type: "Strategic Partners", pct: "35%", desc: "Ecosystem partners, alliance members, logistics companies", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
];

export default function PartnersEarnings() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta
        title="Partner Earnings | How Much You Earn with DeliWer"
        description="See example partner earnings from DeliWer move-in referrals. Commissions come from vendor coordination revenue — tenants pay no extra."
      />
      <Navigation />
      <PartnerSubNav />

      <section className="py-16 px-4 max-w-3xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
            <DollarSign className="w-3.5 h-3.5" /> Partner Earnings
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            What You Earn
          </h1>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            Commissions come from vendor coordination revenue only. Tenant cost is unchanged — you earn from DeliWer's share, not from the tenant's pocket.
          </p>
        </div>

        {/* Earnings Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-white">Example Earnings</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Apartment Type</th>
                  <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Tenant Move Cost</th>
                  <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">DeliWer Fee</th>
                  <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest text-emerald-500">Your Earnings</th>
                </tr>
              </thead>
              <tbody>
                {EARNINGS_TABLE.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    data-testid={`row-earnings-${i}`}
                  >
                    <td className="p-4 text-gray-400 font-medium">{row.tier}</td>
                    <td className="p-4 text-white font-black">{row.tenantCost}</td>
                    <td className="p-4 text-gray-400 text-xs">{row.deliwerFee}</td>
                    <td className="p-4 text-emerald-400 font-black">{row.partnerRange}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            * Estimates based on 10–12% vendor coordination fee and typical commission tiers. Actual amounts depend on unit size and confirmed vendor pricing.
          </p>
        </div>

        {/* Key Principle */}
        <Card className="bg-emerald-950/30 border-emerald-500/20 rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Important</p>
            </div>
            <p className="text-white font-black text-sm uppercase tracking-tight">
              Commissions come from vendor coordination revenue and do not increase tenant cost.
            </p>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Vendors pay DeliWer an embedded coordination fee (10–15%) already included in their market pricing. Your commission is a share of that fee — the tenant never pays more.
            </p>
          </CardContent>
        </Card>

        {/* Commission Tiers */}
        <div className="space-y-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-white">Commission Tiers by Partner Type</h2>
          <div className="grid gap-3">
            {TIERS.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${tier.color}`}
                data-testid={`tier-${tier.type.toLowerCase().replace(/ /g,'-')}`}
              >
                <div className="text-2xl font-black w-16 shrink-0">{tier.pct}</div>
                <div>
                  <p className="font-black uppercase text-white text-sm tracking-tight">{tier.type}</p>
                  <p className="text-gray-500 text-xs font-medium">{tier.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Monthly Potential */}
        <Card className="bg-slate-900 border-white/10 rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Monthly Earning Potential
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "5 referrals/mo", value: "AED 500–900", sub: "Part-time sharing" },
                { label: "15 referrals/mo", value: "AED 1,500–2,700", sub: "Active partner" },
                { label: "30 referrals/mo", value: "AED 3,000–5,400", sub: "Power partner" },
              ].map((ex, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{ex.label}</p>
                  <p className="text-emerald-400 font-black text-lg">{ex.value}</p>
                  <p className="text-[10px] text-gray-600 font-bold">{ex.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center">
              No cap on referrals. No minimums required to start.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Link href="/partners/join">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-13 px-12 text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20" data-testid="button-join-from-earnings">
              Start Earning — Become a Partner
            </Button>
          </Link>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">No fees · No minimums · Monthly payouts</p>
        </div>
      </section>
    </div>
  );
}
