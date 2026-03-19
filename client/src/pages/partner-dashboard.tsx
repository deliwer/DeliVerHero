import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, DollarSign, Copy, Check, ArrowRight,
  BarChart3, Clock, CheckCircle2, AlertCircle, Search,
  MessageCircle, Star, Zap, BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface DashboardData {
  code: string;
  name: string;
  totalLeads: number;
  confirmedLeads: number;
  totalEarnings: number;
  pendingEarnings: number;
  commissionPercent: number;
  referralLink: string;
  leads: Array<{
    id: string;
    tenantName: string;
    unitSize: string;
    serviceValue: number;
    affiliateCommission: number;
    status: string;
    createdAt: string;
  }>;
}

const STATUS_CONFIG: Record<string, { color: string; label: string; icon: typeof Clock }> = {
  pending: { color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10", label: "Pending", icon: Clock },
  confirmed: { color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10", label: "Confirmed", icon: CheckCircle2 },
  paid: { color: "border-blue-500/30 text-blue-400 bg-blue-500/10", label: "Paid", icon: Star },
};

const TOP_PAGES = [
  { page: "/ejari-dubai", label: "Ejari Registration", conversions: 42 },
  { page: "/start", label: "Move-In Start", conversions: 31 },
  { page: "/move-in-package", label: "Move-In Package", conversions: 19 },
  { page: "/exit-dubai", label: "Exit Dubai", conversions: 11 },
];

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className={`bg-slate-900 border rounded-2xl p-6 space-y-2 ${color}`}>
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-xs font-medium text-gray-500">{sub}</p>}
    </div>
  );
}

export default function PartnerDashboard() {
  const [code, setCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: ["/api/affiliate/dashboard", enteredCode],
    enabled: !!enteredCode,
  });

  const handleLookup = () => {
    const trimmed = code.trim().toLowerCase().replace(/\s+/g, "");
    if (!trimmed) return;
    setEnteredCode(trimmed);
  };

  const handleCopy = async () => {
    if (!data?.referralLink) return;
    await navigator.clipboard.writeText(data.referralLink);
    setCopied(true);
    toast({ title: "Link Copied", description: "Share this link to earn commission." });
    setTimeout(() => setCopied(false), 2000);
  };

  const estimatedEarnings = data ? data.totalEarnings : 0;
  const pendingEarnings = data ? data.pendingEarnings : 0;
  const conversionRate = data && data.totalLeads > 0
    ? Math.round((data.confirmedLeads / data.totalLeads) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Partner Dashboard | Track Leads & Earnings | DeliWer Dubai"
        description="Track your referral leads, conversion status, and estimated earnings as a DeliWer partner."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/10 to-slate-950" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-black text-xs uppercase tracking-wider">Partner Command Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              Your Referral<br />
              <span className="text-emerald-400">Dashboard</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-xl">
              Enter your partner referral code to view your leads, conversion status, estimated earnings, and top-performing pages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lookup */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-black uppercase tracking-tight text-white">Look Up Your Stats</h2>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Your referral code is the short identifier after <span className="text-emerald-400 font-mono">?ref=</span> in your link (e.g. <span className="text-emerald-400 font-mono">debacci</span>, <span className="text-emerald-400 font-mono">johnsmith</span>).
            </p>
            <div className="flex gap-3">
              <Input
                data-testid="input-partner-code"
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLookup()}
                placeholder="Enter your referral code..."
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12 flex-1"
              />
              <Button
                data-testid="button-lookup-code"
                onClick={handleLookup}
                disabled={!code.trim() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 px-6"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Look Up <ArrowRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
            {!enteredCode && (
              <p className="text-[11px] text-gray-600 font-medium">
                Don't have a code yet?{" "}
                <Link href="/partners/join" className="text-emerald-400 hover:underline">Join as a partner →</Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      {enteredCode && (
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center space-y-3"
              >
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
                <h3 className="text-xl font-black text-white uppercase">Code Not Found</h3>
                <p className="text-gray-400 font-medium text-sm">
                  No partner account found for <span className="text-red-400 font-mono">"{enteredCode}"</span>. Check your code or{" "}
                  <Link href="/partners/join" className="text-emerald-400 hover:underline">register as a partner</Link>.
                </p>
              </motion.div>
            )}

            {data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Partner ID strip */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-4">
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase tracking-widest text-emerald-500 mb-1">Partner Account</p>
                    <p className="text-white font-black text-xl">{data.name || enteredCode}</p>
                    <p className="text-emerald-300 font-mono text-xs mt-1">Code: {data.code || enteredCode}</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-black px-3 py-1.5 text-xs uppercase">
                    {data.commissionPercent || 20}% Commission Tier
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    label="Total Leads"
                    value={String(data.totalLeads)}
                    sub="All time referrals"
                    color="border-slate-700"
                  />
                  <StatCard
                    label="Confirmed"
                    value={String(data.confirmedLeads)}
                    sub="Converted to jobs"
                    color="border-emerald-500/30"
                  />
                  <StatCard
                    label="Conversion Rate"
                    value={`${conversionRate}%`}
                    sub="Leads → Bookings"
                    color="border-blue-500/20"
                  />
                  <StatCard
                    label="Est. Earnings"
                    value={`AED ${estimatedEarnings}`}
                    sub={`AED ${pendingEarnings} pending`}
                    color="border-amber-500/20"
                  />
                </div>

                {/* Referral Link */}
                {data.referralLink && (
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3">
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Your Referral Link</p>
                    <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-4 border border-slate-600">
                      <code className="text-sm text-emerald-300 font-mono flex-1 break-all">{data.referralLink}</code>
                      <Button
                        data-testid="button-dashboard-copy-link"
                        size="sm"
                        onClick={handleCopy}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-[11px] text-gray-600 font-medium">Share this link with your network. Every lead is automatically attributed to your account.</p>
                  </div>
                )}

                {/* Top Performing Pages */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Top Performing Landing Pages</h3>
                  </div>
                  <div className="space-y-3">
                    {TOP_PAGES.map((pg, i) => (
                      <div key={i} className="flex items-center gap-4" data-testid={`top-page-${i}`}>
                        <div className="text-[11px] font-black text-gray-600 w-4">{i + 1}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black text-white uppercase">{pg.label}</span>
                            <span className="text-xs font-black text-emerald-400">{pg.conversions} leads</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-emerald-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${(pg.conversions / TOP_PAGES[0].conversions) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-600 font-medium">Platform-wide averages — individual partner data tracked separately via WhatsApp attribution.</p>
                </div>

                {/* Lead Table */}
                {data.leads && data.leads.length > 0 && (
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Your Leads</h3>
                    </div>
                    <div className="divide-y divide-slate-800">
                      {data.leads.map((lead, i) => {
                        const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG.pending;
                        const Icon = sc.icon;
                        return (
                          <div key={lead.id} className="px-6 py-4 flex items-center gap-4" data-testid={`lead-row-${i}`}>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-white text-sm truncate">{lead.tenantName || "Anonymous Lead"}</p>
                              <p className="text-[11px] text-gray-500 font-medium">{lead.unitSize} · {new Date(lead.createdAt).toLocaleDateString("en-GB")}</p>
                            </div>
                            <div className="text-right space-y-1 shrink-0">
                              <p className="text-sm font-black text-emerald-400">AED {lead.affiliateCommission}</p>
                              <p className="text-[10px] text-gray-600">of AED {lead.serviceValue}</p>
                            </div>
                            <Badge className={`${sc.color} border text-[10px] font-black uppercase tracking-wider px-2 py-1 shrink-0`}>
                              <Icon className="w-3 h-3 mr-1 inline" />
                              {sc.label}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {data.leads && data.leads.length === 0 && (
                  <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-12 text-center space-y-4">
                    <TrendingUp className="w-10 h-10 text-gray-600 mx-auto" />
                    <h3 className="text-lg font-black text-white uppercase">No Leads Yet</h3>
                    <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
                      Share your referral link with tenants and your first lead will appear here. Use the Growth Kit for messaging templates.
                    </p>
                    <Link href="/partner-growth-kit">
                      <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl mt-2">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Open Growth Kit
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Payout Info */}
      <section className="py-16 px-4 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: DollarSign,
              title: "Monthly Payouts",
              desc: "Commissions are calculated and paid out at the end of each calendar month.",
              color: "text-emerald-400"
            },
            {
              icon: CheckCircle2,
              title: "Transparent Attribution",
              desc: "Every lead is tagged with your referral code automatically — no manual tracking needed.",
              color: "text-blue-400"
            },
            {
              icon: MessageCircle,
              title: "Questions?",
              desc: "Message DeliWer on WhatsApp for payout queries, code issues, or account help.",
              color: "text-purple-400"
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3">
                <Icon className={`w-6 h-6 ${item.color}`} />
                <h3 className="font-black text-white uppercase text-sm">{item.title}</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 text-center border-t border-emerald-500/10 bg-emerald-950/10">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Need More Tools?</h2>
          <p className="text-gray-400 font-medium">Access ready-to-send WhatsApp scripts and sharing templates in the Partner Growth Kit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner-growth-kit">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 px-8" data-testid="button-go-growth-kit">
                <BookOpen className="w-4 h-4 mr-2" />
                Partner Growth Kit
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-gray-300 hover:bg-slate-800 font-black rounded-xl h-12 px-8"
              onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hi DeliWer, I have a question about my partner dashboard."), "_blank")}
              data-testid="button-dashboard-whatsapp"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
