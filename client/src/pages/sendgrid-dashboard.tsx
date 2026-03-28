import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Mail, Send, Eye, MousePointer, AlertTriangle, ShieldAlert,
  RefreshCw, Play, CheckCircle2, XCircle, Loader2, TrendingUp,
  BarChart3, Clock, Zap, Users
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  loading,
}: {
  icon: any;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  loading?: boolean;
}) {
  return (
    <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid={`stat-card-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-slate-400 font-medium">{label}</span>
        </div>
        {loading ? (
          <div className="h-8 w-20 bg-slate-800 animate-pulse rounded" />
        ) : (
          <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        )}
        {sub && !loading && (
          <div className="text-xs text-slate-500 mt-1">{sub}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default function SendGridDashboard() {
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useQuery<any>({
    queryKey: ["/api/sendgrid/stats"],
    refetchInterval: 60000,
  });

  const { data: automationStatus, isLoading: automationLoading, refetch: refetchAutomation } = useQuery<any>({
    queryKey: ["/api/marketing/automation/status"],
    refetchInterval: 10000,
  });

  const dailyMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sendgrid/trigger-daily"),
    onSuccess: (data: any) => {
      toast({ title: "Campaign Triggered", description: data.message });
      setTimeout(() => { refetchStats(); refetchAutomation(); }, 3000);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message || "Failed to trigger campaign", variant: "destructive" });
    },
  });

  const followupMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sendgrid/trigger-followup"),
    onSuccess: (data: any) => {
      toast({ title: "Follow-ups Triggered", description: data.message });
      setTimeout(() => { refetchStats(); refetchAutomation(); }, 3000);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message || "Failed to trigger follow-ups", variant: "destructive" });
    },
  });

  const isConfigured = stats?.configured !== false;
  const rates = stats?.rates || {};
  const totals = stats?.totals || {};
  const dailyChart = stats?.dailyChart || [];

  const formattedChart = dailyChart.map((d: any) => ({
    ...d,
    date: d.date ? new Date(d.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : d.date,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white" data-testid="page-title">SendGrid Email Dashboard</h1>
            </div>
            <p className="text-slate-400 text-sm ml-12">
              webmaster@chaintrack.com · Live stats from SendGrid API · Last 30 days
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={isConfigured
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-red-500/20 text-red-400 border-red-500/40"}
              data-testid="status-api-key"
            >
              {isConfigured ? <><CheckCircle2 className="w-3 h-3 mr-1" />API Connected</> : <><XCircle className="w-3 h-3 mr-1" />API Key Missing</>}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={() => { refetchStats(); refetchAutomation(); }}
              data-testid="button-refresh"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* API Key Warning */}
        {!isConfigured && (
          <Card className="bg-red-950/40 border-red-500/40" data-testid="card-api-warning">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-semibold">SendGrid API Key Not Configured</p>
                <p className="text-red-400/80 text-sm mt-1">
                  All emails are being simulated — nothing is reaching SendGrid. Set the <code className="bg-red-900/50 px-1 rounded">SENDGRID_API_KEY</code> secret in the Replit Secrets panel to enable live sending. Your SendGrid account is <strong>webmaster@chaintrack.com</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards — matching SendGrid dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            icon={Send}
            label="Requests"
            value={statsLoading ? "—" : totals.requests?.toLocaleString() ?? "0"}
            sub="Emails queued"
            color="bg-blue-600"
            loading={statsLoading}
          />
          <StatCard
            icon={CheckCircle2}
            label="Delivered"
            value={statsLoading ? "—" : `${rates.deliveredRate ?? "0.00"}%`}
            sub={`${totals.delivered?.toLocaleString() ?? 0} emails`}
            color="bg-emerald-600"
            loading={statsLoading}
          />
          <StatCard
            icon={Eye}
            label="Opened"
            value={statsLoading ? "—" : `${rates.openRate ?? "0.00"}%`}
            sub={`${totals.unique_opens?.toLocaleString() ?? 0} unique`}
            color="bg-violet-600"
            loading={statsLoading}
          />
          <StatCard
            icon={MousePointer}
            label="Clicked"
            value={statsLoading ? "—" : `${rates.clickRate ?? "0.00"}%`}
            sub={`${totals.unique_clicks?.toLocaleString() ?? 0} unique`}
            color="bg-amber-600"
            loading={statsLoading}
          />
          <StatCard
            icon={AlertTriangle}
            label="Bounces"
            value={statsLoading ? "—" : `${rates.bounceRate ?? "0.00"}%`}
            sub={`${totals.bounces?.toLocaleString() ?? 0} total`}
            color="bg-orange-600"
            loading={statsLoading}
          />
          <StatCard
            icon={ShieldAlert}
            label="Spam Reports"
            value={statsLoading ? "—" : `${rates.spamRate ?? "0.00"}%`}
            sub={`${totals.spam_reports?.toLocaleString() ?? 0} total`}
            color="bg-red-700"
            loading={statsLoading}
          />
        </div>

        {/* Daily Chart */}
        <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid="card-daily-chart">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Daily Email Activity (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="h-52 bg-slate-800/50 animate-pulse rounded-lg" />
            ) : formattedChart.length === 0 ? (
              <div className="h-52 flex items-center justify-center text-slate-500 text-sm">
                {isConfigured ? "No data for this period" : "Connect your SendGrid API key to see chart data"}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={formattedChart} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gDelivered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gOpens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    labelStyle={{ color: "#94a3b8" }}
                    itemStyle={{ color: "#e2e8f0" }}
                  />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="requests" name="Requests" stroke="#3b82f6" fill="url(#gRequests)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="delivered" name="Delivered" stroke="#10b981" fill="url(#gDelivered)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="opens" name="Opens" stroke="#8b5cf6" fill="url(#gOpens)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Automation Controls + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Campaign Controls */}
          <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid="card-campaign-controls">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Zap className="w-4 h-4 text-amber-400" />
                Campaign Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Daily Broker Campaign */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/40">
                <div>
                  <p className="text-white font-semibold text-sm">Daily Broker Campaign</p>
                  <p className="text-slate-400 text-xs mt-0.5">Up to 300 emails/day · partners@deliwer.com</p>
                  <p className="text-slate-500 text-xs">Runs automatically every 24h · Subject: "Earn more from every tenant"</p>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                  onClick={() => dailyMutation.mutate()}
                  disabled={dailyMutation.isPending || automationStatus?.isDailyRunning}
                  data-testid="button-trigger-daily"
                >
                  {dailyMutation.isPending || automationStatus?.isDailyRunning ? (
                    <><Loader2 className="w-4 h-4 mr-1 animate-spin" />Running</>
                  ) : (
                    <><Play className="w-4 h-4 mr-1" />Send Now</>
                  )}
                </Button>
              </div>

              {/* Follow-up Sequences */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/40">
                <div>
                  <p className="text-white font-semibold text-sm">Follow-up Sequences</p>
                  <p className="text-slate-400 text-xs mt-0.5">Day 2 · Day 5 · Day 10 re-engagement</p>
                  <p className="text-slate-500 text-xs">Runs automatically every 6h · partners@deliwer.com</p>
                </div>
                <Button
                  size="sm"
                  className="bg-violet-600 hover:bg-violet-700 text-white shrink-0"
                  onClick={() => followupMutation.mutate()}
                  disabled={followupMutation.isPending || automationStatus?.isFollowUpRunning}
                  data-testid="button-trigger-followup"
                >
                  {followupMutation.isPending || automationStatus?.isFollowUpRunning ? (
                    <><Loader2 className="w-4 h-4 mr-1 animate-spin" />Running</>
                  ) : (
                    <><Send className="w-4 h-4 mr-1" />Run Now</>
                  )}
                </Button>
              </div>

              <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg">
                <p className="text-amber-400 text-xs font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Emails only send when SENDGRID_API_KEY is configured
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Automation Status */}
          <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid="card-automation-status">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Automation Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {automationLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 bg-slate-800 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: "Total in Master", value: automationStatus?.totalInMaster ?? 0, icon: Users, color: "text-blue-400" },
                    { label: "Emails Sent (All Time)", value: automationStatus?.sentTotal ?? 0, icon: Send, color: "text-emerald-400" },
                    { label: "Follow-ups Sent", value: automationStatus?.followedUpTotal ?? 0, icon: Mail, color: "text-violet-400" },
                    { label: "Converted to Partner", value: automationStatus?.convertedTotal ?? 0, icon: CheckCircle2, color: "text-amber-400" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-700/30">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-slate-300 text-sm">{label}</span>
                      </div>
                      <span className="text-white font-bold" data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
                        {value?.toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { label: "Pending FU#1", value: automationStatus?.pendingFollowUp1 ?? 0, color: "text-sky-400" },
                      { label: "Pending FU#2", value: automationStatus?.pendingFollowUp2 ?? 0, color: "text-indigo-400" },
                      { label: "Pending FU#3", value: automationStatus?.pendingFollowUp3 ?? 0, color: "text-purple-400" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="text-center p-2 rounded-lg bg-slate-800/40 border border-slate-700/30">
                        <div className={`text-lg font-bold ${color}`}>{value}</div>
                        <div className="text-slate-500 text-xs">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-500 text-xs">
                      Last daily run: {automationStatus?.lastDailyRun
                        ? new Date(automationStatus.lastDailyRun).toLocaleString()
                        : "Never (server just started)"}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-slate-900/60 border-slate-700/40" data-testid="card-instructions">
          <CardContent className="p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              How to Connect SendGrid (webmaster@chaintrack.com)
            </h3>
            <ol className="space-y-2 text-sm text-slate-400">
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">1.</span> Log into SendGrid → Settings → API Keys → Create API Key</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">2.</span> Choose "Full Access" or at minimum "Mail Send" + "Stats" permissions</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">3.</span> Copy the key (starts with <code className="bg-slate-800 px-1 rounded">SG.</code>)</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">4.</span> In Replit → Secrets panel → Add <code className="bg-slate-800 px-1 rounded">SENDGRID_API_KEY</code> = your key</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">5.</span> Restart the app — all campaigns will start sending automatically every 24 hours</li>
            </ol>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
