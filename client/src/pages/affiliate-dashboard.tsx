import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, TrendingUp, Users, DollarSign, Copy, CheckCircle2,
  MessageSquare, ArrowRight, Star, Clock
} from "lucide-react";

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

const STATUS_COLORS: Record<string, string> = {
  pending: "border-yellow-500/30 text-yellow-400",
  confirmed: "border-emerald-500/30 text-emerald-400",
  paid: "border-blue-500/30 text-blue-400",
};

export default function AffiliateDashboard() {
  const [code, setCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: ["/api/affiliate/dashboard", enteredCode],
    enabled: !!enteredCode,
  });

  const handleCopy = () => {
    if (data?.referralLink) {
      navigator.clipboard.writeText(data.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta
        title="Partner / Affiliate Dashboard | DeliWer Dubai"
        description="Track your referral earnings and leads from the DeliWer Move-In Bundle affiliate program."
      />
      <Navigation />

      <section className="py-20 px-4 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
            <Star className="w-3.5 h-3.5" /> Partner Earnings Dashboard
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Your Affiliate <span className="text-emerald-400">Dashboard</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
            Earn 30% of DeliWer's coordination fee for every tenant you refer who books the Starter Move-In Bundle.
            Tenants pay no extra — your commission comes from the vendor-embedded fee.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: <Users className="w-5 h-5 text-emerald-400" />, title: "Refer a Tenant", desc: "Share your unique link with tenants moving into Dubai." },
            { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, title: "DeliWer Coordinates", desc: "We handle movers, Ejari, DEWA & water filter at vendor market rates." },
            { icon: <DollarSign className="w-5 h-5 text-emerald-400" />, title: "You Earn 30%", desc: "You receive 30% of DeliWer's embedded fee after vendor payout." },
          ].map((step, i) => (
            <Card key={i} className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                <p className="text-white font-black text-sm uppercase tracking-tight">{step.title}</p>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Entry */}
        {!enteredCode && (
          <Card className="bg-white/5 border-white/10 rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-lg font-black uppercase text-white tracking-tight">Enter Your Partner Code</h2>
              <p className="text-gray-500 text-sm">Your partner code was provided when you joined the DeliWer affiliate program.</p>
              <div className="flex gap-3">
                <input
                  data-testid="input-affiliate-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. PARTNER01"
                  className="flex-1 h-12 bg-slate-900 border border-white/15 rounded-xl px-4 text-white font-black uppercase tracking-widest focus:outline-none focus:border-emerald-500 text-sm"
                />
                <Button
                  data-testid="button-view-dashboard"
                  onClick={() => setEnteredCode(code.trim())}
                  disabled={!code.trim()}
                  className="h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl px-6"
                >
                  View Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                Don't have a code? <a href="https://wa.me/971523906019?text=Hi+DeliWer%2C+I%27d+like+to+join+the+affiliate+program" target="_blank" rel="noreferrer" className="text-emerald-500 hover:underline">Join the program on WhatsApp</a>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Content */}
        {enteredCode && isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {enteredCode && isError && (
          <Card className="bg-red-950/30 border-red-500/20 rounded-2xl">
            <CardContent className="p-6 text-center space-y-2">
              <p className="text-red-400 font-black uppercase">Invalid or unrecognized partner code.</p>
              <Button variant="outline" onClick={() => setEnteredCode("")} className="border-white/20 text-gray-300 hover:bg-white/10 rounded-xl">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {data && !isLoading && (
          <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Leads", value: data.totalLeads, color: "text-white" },
                { label: "Confirmed", value: data.confirmedLeads, color: "text-emerald-400" },
                { label: "Total Earned (AED)", value: data.totalEarnings.toLocaleString(), color: "text-emerald-400" },
                { label: "Pending (AED)", value: data.pendingEarnings.toLocaleString(), color: "text-yellow-400" },
              ].map((stat, i) => (
                <Card key={i} className="bg-white/5 border-white/10 rounded-2xl">
                  <CardContent className="p-5 space-y-1">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.color}`} data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}>{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Referral Link */}
            <Card className="bg-emerald-950/30 border-emerald-500/20 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Your Referral Link</p>
                <div className="flex gap-3 items-center">
                  <code className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono truncate" data-testid="text-referral-link">
                    {data.referralLink}
                  </code>
                  <Button
                    data-testid="button-copy-link"
                    onClick={handleCopy}
                    variant="outline"
                    className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 rounded-xl h-11 px-4 font-black shrink-0"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? " Copied!" : " Copy"}
                  </Button>
                </div>
                <p className="text-[10px] text-gray-500 font-bold">Share this link with tenants moving to Dubai. You earn {data.commissionPercent}% of the DeliWer fee when they book.</p>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <div className="space-y-3">
              <h3 className="text-lg font-black uppercase text-white tracking-tight">Your Referred Leads</h3>
              {data.leads.length === 0 ? (
                <Card className="bg-white/5 border-white/10 rounded-2xl">
                  <CardContent className="p-8 text-center space-y-3">
                    <Clock className="w-8 h-8 text-gray-600 mx-auto" />
                    <p className="text-gray-500 font-black uppercase text-sm tracking-tight">No leads yet — share your referral link to start earning.</p>
                    <Button
                      onClick={() => window.open(`https://wa.me/971523906019?text=Hi+DeliWer%2C+I+want+to+share+my+referral+link+${data.referralLink}`, '_blank')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-10 px-5 uppercase tracking-widest text-xs"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" /> Share via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {data.leads.map((lead) => (
                    <Card key={lead.id} className="bg-white/5 border-white/10 rounded-2xl">
                      <CardContent className="p-5 flex flex-wrap items-center gap-4 justify-between">
                        <div>
                          <p className="text-white font-black text-sm uppercase tracking-tight">{lead.tenantName}</p>
                          <p className="text-gray-500 text-xs">{lead.unitSize} · AED {lead.serviceValue?.toLocaleString()}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-emerald-400 font-black text-sm">+AED {lead.affiliateCommission?.toLocaleString()}</p>
                          <Badge variant="outline" className={`text-[10px] font-black uppercase ${STATUS_COLORS[lead.status] ?? "text-gray-400"}`}>
                            {lead.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setEnteredCode("")}
              className="border-white/15 text-gray-400 hover:bg-white/5 rounded-xl font-black uppercase text-xs tracking-widest"
            >
              Switch Partner Code
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
