import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2, XCircle, Server, Database, Clock,
  Cpu, Zap, RefreshCw, Calendar,
} from "lucide-react";

const ADMIN_TOKEN = "deliwer-admin-2026";

interface SystemStatus {
  deployedAt: string | null;
  uptimeSeconds: number;
  nodeVersion: string;
  environment: string;
  services: Record<string, boolean>;
  tableStats: Record<string, number>;
}

function fmt(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function fmtDate(iso: string | null) {
  if (!iso) return "Unknown";
  return new Date(iso).toLocaleString("en-AE", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZoneName: "short",
  });
}

const SERVICE_LABELS: Record<string, string> = {
  openai:    "OpenAI (AI Concierge)",
  anthropic: "Anthropic (Claude)",
  stripe:    "Stripe (Payments)",
  paypal:    "PayPal (Payments)",
  sendgrid:  "SendGrid (Email)",
  whatsapp:  "WhatsApp (Notifications)",
};

export default function SystemStatusPage() {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<SystemStatus>({
    queryKey: ["/api/admin/system-status"],
    queryFn: () =>
      fetch("/api/admin/system-status", {
        headers: { "x-admin-token": ADMIN_TOKEN },
      }).then(r => {
        if (!r.ok) throw new Error("Failed to fetch system status");
        return r.json();
      }),
    refetchInterval: 30_000,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Server className="w-6 h-6 text-amber-400" />
              System Status
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Live deployment and service health overview
            </p>
          </div>
          <button
            data-testid="button-refresh"
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 rounded-lg text-zinc-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
            {(error as Error).message}
          </div>
        )}

        {/* Deploy + Runtime row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            data-testid="card-deploy-time"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium uppercase tracking-wide">
              <Calendar className="w-4 h-4" />
              Last Deployed
            </div>
            <p className="text-white text-lg font-semibold">
              {isLoading ? <span className="text-zinc-600">Loading…</span> : fmtDate(data?.deployedAt ?? null)}
            </p>
            <p className="text-zinc-500 text-xs">
              Timestamp of <code className="text-zinc-400">dist/index.js</code>
            </p>
          </div>

          <div
            data-testid="card-uptime"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium uppercase tracking-wide">
              <Clock className="w-4 h-4" />
              Server Uptime
            </div>
            <p className="text-white text-lg font-semibold">
              {isLoading ? <span className="text-zinc-600">Loading…</span> : fmt(data?.uptimeSeconds ?? 0)}
            </p>
            <p className="text-zinc-500 text-xs">Since last process start</p>
          </div>

          <div
            data-testid="card-node-version"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium uppercase tracking-wide">
              <Cpu className="w-4 h-4" />
              Runtime
            </div>
            <p className="text-white text-lg font-semibold">
              {isLoading ? <span className="text-zinc-600">Loading…</span> : `Node.js ${data?.nodeVersion}`}
            </p>
            <p className="text-zinc-500 text-xs capitalize">
              Environment: <span className="text-zinc-300">{isLoading ? "—" : data?.environment}</span>
            </p>
          </div>

          <div
            data-testid="card-last-checked"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium uppercase tracking-wide">
              <Zap className="w-4 h-4" />
              Data Freshness
            </div>
            <p className="text-white text-lg font-semibold">
              {dataUpdatedAt ? fmtDate(new Date(dataUpdatedAt).toISOString()) : "—"}
            </p>
            <p className="text-zinc-500 text-xs">Auto-refreshes every 30 s</p>
          </div>
        </div>

        {/* Services */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Optional Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(SERVICE_LABELS).map(([key, label]) => {
              const active = data?.services[key] ?? false;
              return (
                <div
                  key={key}
                  data-testid={`status-service-${key}`}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                    isLoading
                      ? "border-zinc-700 bg-zinc-800/50"
                      : active
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-zinc-700 bg-zinc-800/30"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 rounded-full bg-zinc-700 animate-pulse" />
                  ) : active ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                  <span className={`text-sm ${active && !isLoading ? "text-white" : "text-zinc-500"}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* DB table stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            Database Tables
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-zinc-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {Object.entries(data?.tableStats ?? {}).map(([table, count]) => (
                <div
                  key={table}
                  data-testid={`stat-table-${table}`}
                  className="bg-zinc-800 rounded-xl px-3 py-3 text-center border border-zinc-700"
                >
                  <p className="text-white font-bold text-xl">{count.toLocaleString()}</p>
                  <p className="text-zinc-500 text-xs mt-1 truncate">{table}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
