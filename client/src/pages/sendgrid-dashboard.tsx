import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Mail, Send, Eye, MousePointer, AlertTriangle, ShieldAlert,
  RefreshCw, Play, CheckCircle2, XCircle, Loader2, TrendingUp,
  BarChart3, Clock, Zap, Users, Pause, Database, PauseCircle,
  ArrowRight, Info,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

function StatCard({
  icon: Icon, label, value, sub, color, loading,
}: {
  icon: any; label: string; value: string | number;
  sub?: string; color: string; loading?: boolean;
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; label: string }> = {
    running:   { color: "bg-blue-500/20 text-blue-400 border-blue-500/40",     label: "Running"   },
    completed: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40", label: "Completed" },
    paused:    { color: "bg-amber-500/20 text-amber-400 border-amber-500/40",   label: "Paused"    },
    idle:      { color: "bg-slate-500/20 text-slate-400 border-slate-500/40",   label: "Idle"      },
  };
  const s = map[status] ?? map.idle;
  return <Badge className={`text-xs ${s.color}`}>{s.label}</Badge>;
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

  const { data: campaigns, isLoading: campaignsLoading, refetch: refetchCampaigns } = useQuery<any[]>({
    queryKey: ["/api/marketing/broker-campaigns"],
    refetchInterval: 8000,
  });

  const refetchAll = () => { refetchStats(); refetchAutomation(); refetchCampaigns(); };

  const startMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/marketing/broker-campaign/${id}/start`),
    onSuccess: () => {
      toast({ title: "Campaign started", description: "Next batch of 300 emails is sending." });
      setTimeout(refetchAll, 2000);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const pauseMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/marketing/broker-campaign/${id}/pause`),
    onSuccess: () => {
      toast({ title: "Campaign paused" });
      setTimeout(refetchAll, 1000);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const dailyMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sendgrid/trigger-daily"),
    onSuccess: (data: any) => {
      toast({ title: "Campaign Triggered", description: data.message });
      setTimeout(refetchAll, 3000);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message || "Failed", variant: "destructive" }),
  });

  const followupMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sendgrid/trigger-followup"),
    onSuccess: (data: any) => {
      toast({ title: "Follow-ups Triggered", description: data.message });
      setTimeout(refetchAll, 3000);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message || "Failed", variant: "destructive" }),
  });

  const isConfigured = stats?.configured !== false;
  const rates = stats?.rates || {};
  const totals = stats?.totals || {};
  const dailyChart = stats?.dailyChart || [];

  const formattedChart = dailyChart.map((d: any) => ({
    ...d,
    date: d.date
      ? new Date(d.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      : d.date,
  }));

  const latestCampaign = campaigns?.[0];
  const sentPct = latestCampaign
    ? Math.min(100, Math.round(((latestCampaign.sentCount ?? 0) / Math.max(latestCampaign.totalBrokers, 1)) * 100))
    : 0;

  const isLatestRunning = latestCampaign?.status === "running";
  const isLatestPaused  = latestCampaign?.status === "paused";
  const isPausedByLimit = isLatestPaused; // paused = hit daily limit or manually paused

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white" data-testid="page-title">
                SendGrid Email Dashboard
              </h1>
            </div>
            <p className="text-slate-400 text-sm ml-12">
              partners@deliwer.com · Live broker recruitment · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={isConfigured
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-red-500/20 text-red-400 border-red-500/40"}
              data-testid="status-api-key"
            >
              {isConfigured
                ? <><CheckCircle2 className="w-3 h-3 mr-1" />API Connected</>
                : <><XCircle className="w-3 h-3 mr-1" />API Key Missing</>}
            </Badge>
            <Button
              variant="outline" size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={refetchAll}
              data-testid="button-refresh"
            >
              <RefreshCw className="w-4 h-4 mr-2" />Refresh
            </Button>
          </div>
        </div>

        {/* ── API Key warning (only if missing) ──────────────── */}
        {!isConfigured && (
          <Card className="bg-red-950/40 border-red-500/40" data-testid="card-api-warning">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-semibold">SendGrid API Key Not Configured</p>
                <p className="text-red-400/80 text-sm mt-1">
                  All emails are being simulated. Set <code className="bg-red-900/50 px-1 rounded">SENDGRID_API_KEY</code> in Replit Secrets to enable live delivery.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Daily limit notice (when paused) ───────────────── */}
        {isPausedByLimit && isConfigured && (
          <Card className="bg-amber-950/40 border-amber-500/30" data-testid="card-rate-limit">
            <CardContent className="p-4 flex items-start gap-3">
              <PauseCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-300 font-semibold">Daily Sending Limit Reached</p>
                <p className="text-amber-400/80 text-sm mt-1">
                  SendGrid paused this campaign after today's quota. All unprocessed entries remain <strong>pending</strong> — resume tomorrow or upgrade your SendGrid plan for a higher daily cap.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-500 text-white shrink-0"
                onClick={() => startMutation.mutate(latestCampaign.id)}
                disabled={startMutation.isPending}
                data-testid="button-resume-from-limit"
              >
                {startMutation.isPending
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <><Play className="w-4 h-4 mr-1" />Resume</>}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Active Campaign Progress ────────────────────────── */}
        {latestCampaign && (
          <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid="card-active-campaign">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2 text-base">
                  <Send className="w-4 h-4 text-blue-400" />
                  Active Campaign
                </CardTitle>
                <StatusBadge status={latestCampaign.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-white font-semibold text-sm" data-testid="text-campaign-name">
                  {latestCampaign.name}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  ID: {latestCampaign.id}
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{latestCampaign.sentCount?.toLocaleString()} sent</span>
                  <span>{sentPct}%</span>
                  <span>{latestCampaign.totalBrokers?.toLocaleString()} total</span>
                </div>
                <Progress value={sentPct} className="h-2 bg-slate-800" />
                <div className="flex gap-4 text-xs pt-0.5">
                  <span className="text-emerald-400">
                    ✓ {latestCampaign.sentCount?.toLocaleString()} sent
                  </span>
                  <span className="text-red-400">
                    ✕ {latestCampaign.failedCount?.toLocaleString()} failed
                  </span>
                  <span className="text-slate-500">
                    ◷ {(latestCampaign.totalBrokers - latestCampaign.sentCount - latestCampaign.failedCount)?.toLocaleString()} pending
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2 pt-1">
                {(isLatestPaused || latestCampaign.status === "idle" || latestCampaign.status === "completed") && (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white"
                    onClick={() => startMutation.mutate(latestCampaign.id)}
                    disabled={startMutation.isPending}
                    data-testid="button-campaign-start"
                  >
                    {startMutation.isPending
                      ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" />Starting…</>
                      : <><Play className="w-4 h-4 mr-1" />Send Next Batch (300)</>}
                  </Button>
                )}
                {isLatestRunning && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                    onClick={() => pauseMutation.mutate(latestCampaign.id)}
                    disabled={pauseMutation.isPending}
                    data-testid="button-campaign-pause"
                  >
                    <Pause className="w-4 h-4 mr-1" />Pause
                  </Button>
                )}
                {isLatestRunning && (
                  <div className="flex items-center gap-1.5 text-xs text-blue-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Sending at 1 email / 1.5s…</span>
                  </div>
                )}
              </div>

              {latestCampaign.completedAt && latestCampaign.status === "completed" && (
                <p className="text-xs text-slate-500">
                  Last completed: {new Date(latestCampaign.completedAt).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Broker Master + SendGrid Delivery Stats ─────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            icon={Database}
            label="Master DB"
            value={automationLoading ? "—" : (automationStatus?.totalInMaster ?? 0).toLocaleString()}
            sub="Licensed brokers"
            color="bg-purple-600"
            loading={automationLoading}
          />
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

        {/* ── Daily Chart ─────────────────────────────────────── */}
        <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid="card-daily-chart">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Daily Email Activity — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="h-52 bg-slate-800/50 animate-pulse rounded-lg" />
            ) : formattedChart.length === 0 ? (
              <div className="h-52 flex items-center justify-center text-slate-500 text-sm">
                {isConfigured
                  ? "No data for this period yet — check back after first sends"
                  : "Connect your SendGrid API key to see chart data"}
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
                  <Area type="monotone" dataKey="requests"  name="Requests"  stroke="#3b82f6" fill="url(#gRequests)"  strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="delivered" name="Delivered" stroke="#10b981" fill="url(#gDelivered)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="opens"     name="Opens"     stroke="#8b5cf6" fill="url(#gOpens)"     strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* ── Controls + Status ───────────────────────────────── */}
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
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/40">
                <div>
                  <p className="text-white font-semibold text-sm">Daily Broker Campaign</p>
                  <p className="text-slate-400 text-xs mt-0.5">Up to 300 emails/day · partners@deliwer.com</p>
                  <p className="text-slate-500 text-xs">Runs every 24h · "Earn more from every tenant"</p>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                  onClick={() => dailyMutation.mutate()}
                  disabled={dailyMutation.isPending || automationStatus?.isDailyRunning}
                  data-testid="button-trigger-daily"
                >
                  {dailyMutation.isPending || automationStatus?.isDailyRunning
                    ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" />Running</>
                    : <><Play className="w-4 h-4 mr-1" />Send Now</>}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/40">
                <div>
                  <p className="text-white font-semibold text-sm">Follow-up Sequences</p>
                  <p className="text-slate-400 text-xs mt-0.5">Day 2 · Day 5 · Day 10 re-engagement</p>
                  <p className="text-slate-500 text-xs">Runs every 6h · partners@deliwer.com</p>
                </div>
                <Button
                  size="sm"
                  className="bg-violet-600 hover:bg-violet-700 text-white shrink-0"
                  onClick={() => followupMutation.mutate()}
                  disabled={followupMutation.isPending || automationStatus?.isFollowUpRunning}
                  data-testid="button-trigger-followup"
                >
                  {followupMutation.isPending || automationStatus?.isFollowUpRunning
                    ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" />Running</>
                    : <><Send className="w-4 h-4 mr-1" />Run Now</>}
                </Button>
              </div>

              {/* All campaigns list */}
              {campaigns && campaigns.length > 1 && (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">All Campaigns</p>
                  {campaigns.slice(0, 5).map((c: any) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700/20">
                      <div className="min-w-0">
                        <p className="text-slate-300 text-xs font-medium truncate max-w-[200px]">{c.name}</p>
                        <p className="text-slate-600 text-xs">{c.sentCount?.toLocaleString()} sent · {c.failedCount} failed</p>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Automation Status */}
          <Card className="bg-slate-900/80 border-slate-700/60 shadow-lg" data-testid="card-automation-status">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Broker Master Status
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
                    { label: "Total in Master DB",   value: automationStatus?.totalInMaster ?? 0,   icon: Database,      color: "text-purple-400" },
                    { label: "Emails Sent (All Time)", value: automationStatus?.sentTotal ?? 0,      icon: Send,          color: "text-emerald-400" },
                    { label: "Follow-ups Sent",       value: automationStatus?.followedUpTotal ?? 0, icon: Mail,          color: "text-violet-400"  },
                    { label: "Converted to Partner",  value: automationStatus?.convertedTotal ?? 0,  icon: CheckCircle2,  color: "text-amber-400"   },
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
                      { label: "Pending FU#1", value: automationStatus?.pendingFollowUp1 ?? 0, color: "text-sky-400"    },
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
                      Last daily run:{" "}
                      {automationStatus?.lastDailyRun
                        ? new Date(automationStatus.lastDailyRun).toLocaleString()
                        : "Not yet run this session"}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Info strip ──────────────────────────────────────── */}
        <Card className="bg-slate-900/50 border-slate-700/30" data-testid="card-info">
          <CardContent className="p-5 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-1.5">
              <p className="text-slate-300 font-semibold text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                Daily Limit & Plan
              </p>
              <p className="text-slate-500 text-sm">
                SendGrid free plans cap at ~100 emails/day. Each campaign run sends up to 300 entries — the runner pauses automatically when the cap is hit and resumes where it left off. Upgrade to Essentials (50k/mo) or Pro to increase throughput.
              </p>
            </div>
            <div className="flex-1 space-y-1.5">
              <p className="text-slate-300 font-semibold text-sm flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                Campaign Lifecycle
              </p>
              <p className="text-slate-500 text-sm">
                Broker master holds <strong className="text-slate-300">{(automationStatus?.totalInMaster ?? 0).toLocaleString()}</strong> licensed RERA brokers. Each daily run processes the next 300 pending entries. Follow-up sequences re-engage contacts at Day 2, 5, and 10.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
