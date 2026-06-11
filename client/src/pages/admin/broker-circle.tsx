import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, Download, RefreshCw, CheckCircle2,
  XCircle, Clock, Phone, Mail, Building2,
  MapPin, ShieldCheck, ArrowLeft, Search,
  MessageCircle,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const ADMIN_TOKEN = "deliwer-admin-2026";

type BrokerApp = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  reraNumber: string | null;
  brokerage: string | null;
  areasOfInterest: string[] | null;
  ndaAccepted: boolean;
  ndaAcceptedAt: string | null;
  status: string;
  ipAddress: string | null;
  createdAt: string;
};

const STATUS_META: Record<string, { label: string; cls: string; icon: typeof CheckCircle2 }> = {
  pending:  { label: "Pending",  cls: "bg-amber-500/15 text-amber-300 border-amber-500/30",   icon: Clock },
  approved: { label: "Approved", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", icon: CheckCircle2 },
  rejected: { label: "Rejected", cls: "bg-red-500/15 text-red-300 border-red-500/30",         icon: XCircle },
};

function fmt(dt: string) {
  return new Date(dt).toLocaleString("en-AE", { timeZone: "Asia/Dubai", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function csvRow(a: BrokerApp) {
  return [
    a.name, a.phone, a.email ?? "", a.reraNumber ?? "", a.brokerage ?? "",
    (a.areasOfInterest ?? []).join("; "),
    a.ndaAccepted ? "Yes" : "No",
    a.status,
    fmt(a.createdAt),
    a.ipAddress ?? "",
  ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
}

function exportCsv(apps: BrokerApp[]) {
  const header = "Name,Phone,Email,RERA#,Brokerage,Areas of Interest,NDA Accepted,Status,Applied (Dubai),IP";
  const rows = apps.map(csvRow).join("\n");
  const blob = new Blob([header + "\n" + rows], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `broker-circle-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

export default function BrokerCircleAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: apps = [], isLoading, refetch } = useQuery<BrokerApp[]>({
    queryKey: ["/api/realestate/applications"],
    queryFn: () =>
      fetch("/api/realestate/applications", {
        headers: { "x-admin-token": ADMIN_TOKEN },
      }).then((r) => r.json()),
    enabled: authed,
    refetchInterval: 30_000,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/realestate/applications/${id}/status`, { status }),
    onSuccess: (_, { status }) => {
      qc.invalidateQueries({ queryKey: ["/api/realestate/applications"] });
      toast({ title: `Application ${status}`, description: "Status updated successfully." });
    },
    onError: () => toast({ title: "Error", description: "Failed to update status.", variant: "destructive" }),
  });

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4">
          <div className="text-center mb-6">
            <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <h1 className="text-xl font-bold">Inner Circle Admin</h1>
            <p className="text-sm text-slate-400">Enter admin password to continue</p>
          </div>
          <Input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && pw === ADMIN_TOKEN) setAuthed(true);
              else if (e.key === "Enter") toast({ title: "Wrong password", variant: "destructive" });
            }}
            className="bg-slate-900 border-slate-700 text-white h-11"
            data-testid="input-admin-pw"
          />
          <Button
            className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
            onClick={() => {
              if (pw === ADMIN_TOKEN) setAuthed(true);
              else toast({ title: "Wrong password", variant: "destructive" });
            }}
            data-testid="button-admin-login"
          >
            Unlock Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      (a.email ?? "").toLowerCase().includes(q) ||
      (a.reraNumber ?? "").toLowerCase().includes(q) ||
      (a.brokerage ?? "").toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/realestate">
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Broker Inner Circle — Applications
              </h1>
              <p className="text-[11px] text-slate-500">DeliWer Real Estate Portal · Admin</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs"
              onClick={() => refetch()}
              data-testid="button-refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs"
              onClick={() => exportCsv(filtered)}
              data-testid="button-export"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total",    value: counts.total,    cls: "border-slate-700",           Icon: Users },
            { label: "Pending",  value: counts.pending,  cls: "border-amber-500/30",        Icon: Clock },
            { label: "Approved", value: counts.approved, cls: "border-emerald-500/30",      Icon: CheckCircle2 },
            { label: "Rejected", value: counts.rejected, cls: "border-red-500/30",          Icon: XCircle },
          ].map(({ label, value, cls, Icon }) => (
            <div key={label} className={`rounded-xl border ${cls} bg-slate-900/50 p-4`} data-testid={`stat-${label.toLowerCase()}`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 font-medium">{label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, RERA, brokerage…"
              className="pl-9 bg-slate-900 border-slate-700 text-white h-9 text-sm"
              data-testid="input-search"
            />
          </div>
          <div className="flex gap-1">
            {["all", "pending", "approved", "rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === s
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent"
                }`}
                data-testid={`filter-${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Applications list */}
        {isLoading ? (
          <div className="text-center py-20 text-slate-500">Loading applications…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            {apps.length === 0 ? "No applications yet." : "No results match your filter."}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => {
              const meta = STATUS_META[app.status] ?? STATUS_META.pending;
              const StatusIcon = meta.icon;
              return (
                <div
                  key={app.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5"
                  data-testid={`card-app-${app.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Left: info */}
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white">{app.name}</span>
                        <Badge className={`text-[10px] border ${meta.cls} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" /> {meta.label}
                        </Badge>
                        {app.ndaAccepted && (
                          <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                            NDA ✓
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" /> {app.phone}
                        </span>
                        {app.email && (
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" /> {app.email}
                          </span>
                        )}
                        {app.reraNumber && (
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-mono text-amber-300 text-xs">{app.reraNumber}</span>
                          </span>
                        )}
                        {app.brokerage && (
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" /> {app.brokerage}
                          </span>
                        )}
                      </div>

                      {app.areasOfInterest && app.areasOfInterest.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
                          {app.areasOfInterest.map((a) => (
                            <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                              {a}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-[11px] text-slate-600">
                        Applied {fmt(app.createdAt)}
                        {app.ipAddress ? ` · IP: ${app.ipAddress}` : ""}
                      </p>
                    </div>

                    {/* Right: actions */}
                    <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                      {app.status !== "approved" && (
                        <Button
                          size="sm"
                          className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 text-xs"
                          disabled={statusMutation.isPending}
                          onClick={() => statusMutation.mutate({ id: app.id, status: "approved" })}
                          data-testid={`button-approve-${app.id}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </Button>
                      )}
                      {app.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-red-700/50 text-red-400 hover:bg-red-900/30 gap-1.5 text-xs"
                          disabled={statusMutation.isPending}
                          onClick={() => statusMutation.mutate({ id: app.id, status: "rejected" })}
                          data-testid={`button-reject-${app.id}`}
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </Button>
                      )}
                      {app.status !== "pending" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-slate-400 hover:text-white text-xs"
                          disabled={statusMutation.isPending}
                          onClick={() => statusMutation.mutate({ id: app.id, status: "pending" })}
                          data-testid={`button-pending-${app.id}`}
                        >
                          Reset
                        </Button>
                      )}
                      <a
                        href={`https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          app.status === "approved"
                            ? `Hi ${app.name}, your DeliWer Inner Circle application has been approved! 🎉 You can now access our unit inventory channel. Welcome aboard.`
                            : `Hi ${app.name}, thanks for applying to the DeliWer Inner Circle. We've reviewed your application and will be in touch shortly.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-wa-${app.id}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 gap-1.5 text-xs w-full"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
