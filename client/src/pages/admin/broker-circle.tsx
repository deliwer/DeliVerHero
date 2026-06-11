import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, Download, RefreshCw, CheckCircle2,
  XCircle, Clock, Phone, Mail, Building2,
  MapPin, ShieldCheck, ArrowLeft, Search,
  MessageCircle, Eye, CalendarDays, FileText,
  Home,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const ADMIN_TOKEN = "deliwer-admin-2026";

// ── Types ──────────────────────────────────────────────────────────────────────
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

type ViewingInquiry = {
  id: string;
  listingId: string;
  listingTitle: string;
  listingArea: string;
  requesterName: string;
  requesterPhone: string;
  preferredDate: string | null;
  message: string | null;
  status: string;
  brokerRef: string | null;
  createdAt: string;
};

// ── Shared helpers ─────────────────────────────────────────────────────────────
const APP_STATUS: Record<string, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  pending:  { label: "Pending",  cls: "bg-amber-500/15 text-amber-300 border-amber-500/30",      Icon: Clock },
  approved: { label: "Approved", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", Icon: CheckCircle2 },
  rejected: { label: "Rejected", cls: "bg-red-500/15 text-red-300 border-red-500/30",            Icon: XCircle },
};

const INQ_STATUS: Record<string, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  pending:   { label: "New",        cls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",         Icon: Clock },
  contacted: { label: "Contacted",  cls: "bg-amber-500/15 text-amber-300 border-amber-500/30",      Icon: MessageCircle },
  scheduled: { label: "Scheduled",  cls: "bg-violet-500/15 text-violet-300 border-violet-500/30",   Icon: CalendarDays },
  completed: { label: "Completed",  cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",Icon: CheckCircle2 },
  cancelled: { label: "Cancelled",  cls: "bg-red-500/15 text-red-300 border-red-500/30",            Icon: XCircle },
};

function fmt(dt: string) {
  return new Date(dt).toLocaleString("en-AE", {
    timeZone: "Asia/Dubai", day: "2-digit", month: "short",
    year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

// ── CSV helpers ────────────────────────────────────────────────────────────────
function csvEsc(v: string) { return `"${v.replace(/"/g, '""')}"`; }

function exportBrokerCsv(apps: BrokerApp[]) {
  const header = "Name,Phone,Email,RERA#,Brokerage,Areas of Interest,NDA Accepted,Status,Applied (Dubai),IP";
  const rows = apps.map((a) =>
    [
      a.name, a.phone, a.email ?? "", a.reraNumber ?? "", a.brokerage ?? "",
      (a.areasOfInterest ?? []).join("; "),
      a.ndaAccepted ? "Yes" : "No", a.status,
      fmt(a.createdAt), a.ipAddress ?? "",
    ].map(String).map(csvEsc).join(",")
  ).join("\n");
  dl(`broker-circle-${today()}.csv`, header + "\n" + rows);
}

function exportInquiryCsv(rows: ViewingInquiry[]) {
  const header = "Name,Phone,Area,Preferred Date,Message,Status,Broker Ref,Submitted (Dubai)";
  const body = rows.map((r) =>
    [
      r.requesterName, r.requesterPhone, r.listingArea,
      r.preferredDate ?? "", r.message ?? "", r.status,
      r.brokerRef ?? "", fmt(r.createdAt),
    ].map(String).map(csvEsc).join(",")
  ).join("\n");
  dl(`viewing-inquiries-${today()}.csv`, header + "\n" + body);
}

function today() { return new Date().toISOString().slice(0, 10); }
function dl(name: string, content: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
  a.download = name;
  a.click();
}

// ── Lock screen ────────────────────────────────────────────────────────────────
function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const { toast } = useToast();
  const [pw, setPw] = useState("");
  const attempt = () => {
    if (pw === ADMIN_TOKEN) { onUnlock(); }
    else { toast({ title: "Wrong password", variant: "destructive" }); }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center mb-6">
          <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto mb-2" />
          <h1 className="text-xl font-bold">Real Estate Admin</h1>
          <p className="text-sm text-slate-400">Enter admin password to continue</p>
        </div>
        <Input
          type="password"
          placeholder="Admin password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          className="bg-slate-900 border-slate-700 text-white h-11"
          data-testid="input-admin-pw"
          autoFocus
        />
        <Button
          className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
          onClick={attempt}
          data-testid="button-admin-login"
        >
          Unlock Dashboard
        </Button>
      </div>
    </div>
  );
}

// ── Broker Applications tab ────────────────────────────────────────────────────
function BrokerAppsTab() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: apps = [], isLoading, refetch } = useQuery<BrokerApp[]>({
    queryKey: ["/api/realestate/applications"],
    queryFn: () =>
      fetch("/api/realestate/applications", { headers: { "x-admin-token": ADMIN_TOKEN } })
        .then((r) => r.json()),
    refetchInterval: 30_000,
  });

  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/realestate/applications/${id}/status`, { status }),
    onSuccess: (_, { status }) => {
      qc.invalidateQueries({ queryKey: ["/api/realestate/applications"] });
      toast({ title: `Application ${status}`, description: "Status updated." });
    },
    onError: () => toast({ title: "Error", description: "Update failed.", variant: "destructive" }),
  });

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    return (
      (!q || a.name.toLowerCase().includes(q) || a.phone.includes(q) ||
        (a.email ?? "").toLowerCase().includes(q) ||
        (a.reraNumber ?? "").toLowerCase().includes(q) ||
        (a.brokerage ?? "").toLowerCase().includes(q)) &&
      (statusFilter === "all" || a.status === statusFilter)
    );
  });

  const counts = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            { label: "Total",    value: counts.total,    cls: "border-slate-700",      Icon: Users },
            { label: "Pending",  value: counts.pending,  cls: "border-amber-500/30",   Icon: Clock },
            { label: "Approved", value: counts.approved, cls: "border-emerald-500/30", Icon: CheckCircle2 },
            { label: "Rejected", value: counts.rejected, cls: "border-red-500/30",     Icon: XCircle },
          ] as const
        ).map(({ label, value, cls, Icon }) => (
          <div key={label} className={`rounded-xl border ${cls} bg-slate-900/50 p-4`} data-testid={`app-stat-${label.toLowerCase()}`}>
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">{label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, RERA, brokerage…"
            className="pl-9 bg-slate-900 border-slate-700 text-white h-9 text-sm"
            data-testid="input-app-search"
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
              data-testid={`app-filter-${s}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs h-9" onClick={() => refetch()} data-testid="button-app-refresh">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs h-9" onClick={() => exportBrokerCsv(filtered)} data-testid="button-app-export">
            <Download className="w-3.5 h-3.5" /> CSV
          </Button>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <p className="text-center py-20 text-slate-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-20 text-slate-500">
          {apps.length === 0 ? "No applications yet." : "No results match your filter."}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const m = APP_STATUS[app.status] ?? APP_STATUS.pending;
            const SI = m.Icon;
            return (
              <div key={app.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5" data-testid={`card-app-${app.id}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white">{app.name}</span>
                      <Badge className={`text-[10px] border ${m.cls} flex items-center gap-1`}>
                        <SI className="w-3 h-3" /> {m.label}
                      </Badge>
                      {app.ndaAccepted && (
                        <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">NDA ✓</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{app.phone}</span>
                      {app.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{app.email}</span>}
                      {app.reraNumber && (
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span className="font-mono text-amber-300 text-xs">{app.reraNumber}</span>
                        </span>
                      )}
                      {app.brokerage && <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{app.brokerage}</span>}
                    </div>
                    {app.areasOfInterest && app.areasOfInterest.length > 0 && (
                      <div className="flex flex-wrap gap-1 items-center">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        {app.areasOfInterest.map((a) => (
                          <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{a}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-[11px] text-slate-600">Applied {fmt(app.createdAt)}{app.ipAddress ? ` · IP: ${app.ipAddress}` : ""}</p>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    {app.status !== "approved" && (
                      <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 text-xs" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: app.id, status: "approved" })} data-testid={`button-approve-${app.id}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </Button>
                    )}
                    {app.status !== "rejected" && (
                      <Button size="sm" variant="outline" className="h-8 border-red-700/50 text-red-400 hover:bg-red-900/30 gap-1.5 text-xs" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: app.id, status: "rejected" })} data-testid={`button-reject-${app.id}`}>
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </Button>
                    )}
                    {app.status !== "pending" && (
                      <Button size="sm" variant="ghost" className="h-8 text-slate-400 hover:text-white text-xs" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: app.id, status: "pending" })} data-testid={`button-reset-${app.id}`}>
                        Reset
                      </Button>
                    )}
                    <a
                      href={`https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        app.status === "approved"
                          ? `Hi ${app.name}, your DeliWer Inner Circle application has been approved! 🎉 Welcome aboard — you now have access to our unit inventory channel.`
                          : `Hi ${app.name}, thanks for applying to the DeliWer Inner Circle. We've received your application and will be in touch shortly.`
                      )}`}
                      target="_blank" rel="noopener noreferrer"
                      data-testid={`link-wa-${app.id}`}
                    >
                      <Button size="sm" variant="outline" className="h-8 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 gap-1.5 text-xs w-full">
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
  );
}

// ── Viewing Inquiries tab ──────────────────────────────────────────────────────
function ViewingInquiriesTab() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: allViewings = [], isLoading, refetch } = useQuery<ViewingInquiry[]>({
    queryKey: ["/api/flex-listings/admin/viewings"],
    queryFn: () =>
      fetch("/api/flex-listings/admin/viewings", { headers: { "x-admin-token": ADMIN_TOKEN } })
        .then((r) => r.json())
        .then((d) => (Array.isArray(d) ? d : (d.requests ?? d.viewings ?? []))),
    refetchInterval: 30_000,
  });

  // Only show realestate-portal submissions (listingId starts with "area-inquiry-")
  const inquiries = allViewings.filter((v) => v.listingId.startsWith("area-inquiry-"));

  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      fetch(`/api/flex-listings/viewing-requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": ADMIN_TOKEN },
        body: JSON.stringify({ status }),
      }),
    onSuccess: (_, { status }) => {
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/admin/viewings"] });
      toast({ title: `Marked as ${status}`, description: "Viewing inquiry updated." });
    },
    onError: () => toast({ title: "Error", description: "Update failed.", variant: "destructive" }),
  });

  const filtered = inquiries.filter((v) => {
    const q = search.toLowerCase();
    return (
      (!q || v.requesterName.toLowerCase().includes(q) || v.requesterPhone.includes(q) || v.listingArea.toLowerCase().includes(q)) &&
      (statusFilter === "all" || v.status === statusFilter)
    );
  });

  const counts = {
    total: inquiries.length,
    new: inquiries.filter((v) => v.status === "pending").length,
    contacted: inquiries.filter((v) => v.status === "contacted").length,
    scheduled: inquiries.filter((v) => v.status === "scheduled").length,
    completed: inquiries.filter((v) => v.status === "completed").length,
  };

  const NEXT_STATUS: Record<string, string> = {
    pending: "contacted",
    contacted: "scheduled",
    scheduled: "completed",
    completed: "pending",
    cancelled: "pending",
  };

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(
          [
            { label: "Total",     value: counts.total,     cls: "border-slate-700",      Icon: Home },
            { label: "New",       value: counts.new,       cls: "border-cyan-500/30",    Icon: Clock },
            { label: "Contacted", value: counts.contacted, cls: "border-amber-500/30",   Icon: MessageCircle },
            { label: "Scheduled", value: counts.scheduled, cls: "border-violet-500/30",  Icon: CalendarDays },
            { label: "Completed", value: counts.completed, cls: "border-emerald-500/30", Icon: CheckCircle2 },
          ] as const
        ).map(({ label, value, cls, Icon }) => (
          <div key={label} className={`rounded-xl border ${cls} bg-slate-900/50 p-4`} data-testid={`inq-stat-${label.toLowerCase()}`}>
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">{label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, area…"
            className="pl-9 bg-slate-900 border-slate-700 text-white h-9 text-sm"
            data-testid="input-inq-search"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["all", "pending", "contacted", "scheduled", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === s
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent"
              }`}
              data-testid={`inq-filter-${s}`}
            >
              {s === "pending" ? "new" : s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs h-9" onClick={() => refetch()} data-testid="button-inq-refresh">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs h-9" onClick={() => exportInquiryCsv(filtered)} data-testid="button-inq-export">
            <Download className="w-3.5 h-3.5" /> CSV
          </Button>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <p className="text-center py-20 text-slate-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-20 text-slate-500">
          {inquiries.length === 0 ? "No viewing inquiries yet." : "No results match your filter."}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => {
            const m = INQ_STATUS[inq.status] ?? INQ_STATUS.pending;
            const SI = m.Icon;
            const isExpanded = expandedId === inq.id;
            const nextStatus = NEXT_STATUS[inq.status] ?? "contacted";
            const nextLabel = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);
            return (
              <div key={inq.id} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden" data-testid={`card-inq-${inq.id}`}>
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Left */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white">{inq.requesterName}</span>
                      <Badge className={`text-[10px] border ${m.cls} flex items-center gap-1`}>
                        <SI className="w-3 h-3" /> {m.label}
                      </Badge>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                        <MapPin className="w-2.5 h-2.5 inline mr-1" />{inq.listingArea}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{inq.requesterPhone}</span>
                      {inq.preferredDate && (
                        <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-violet-400" />{inq.preferredDate}</span>
                      )}
                      {inq.brokerRef && (
                        <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />Broker: {inq.brokerRef}</span>
                      )}
                    </div>
                    {inq.message && (
                      <div className="flex items-start gap-1.5">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : inq.id)}
                          className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                          data-testid={`button-expand-${inq.id}`}
                        >
                          <FileText className="w-3 h-3" />
                          {isExpanded ? "Hide message" : "Show message"}
                        </button>
                      </div>
                    )}
                    {isExpanded && inq.message && (
                      <div className="rounded-lg bg-slate-800/60 border border-slate-700 px-3 py-2 text-sm text-slate-300 leading-relaxed">
                        {inq.message}
                      </div>
                    )}
                    <p className="text-[11px] text-slate-600">Submitted {fmt(inq.createdAt)}</p>
                  </div>

                  {/* Right: actions */}
                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="h-8 bg-cyan-700 hover:bg-cyan-600 text-white gap-1.5 text-xs"
                      disabled={statusMut.isPending || inq.status === "completed"}
                      onClick={() => statusMut.mutate({ id: inq.id, status: nextStatus })}
                      data-testid={`button-advance-${inq.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" /> → {nextLabel}
                    </Button>
                    {inq.status !== "cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-red-700/50 text-red-400 hover:bg-red-900/30 gap-1.5 text-xs"
                        disabled={statusMut.isPending}
                        onClick={() => statusMut.mutate({ id: inq.id, status: "cancelled" })}
                        data-testid={`button-cancel-${inq.id}`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </Button>
                    )}
                    <a
                      href={`https://wa.me/${inq.requesterPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hi ${inq.requesterName}, thanks for your viewing inquiry for ${inq.listingArea}. We'd love to arrange a viewing for you — are you available ${inq.preferredDate ? `on ${inq.preferredDate}` : "this week"}?`
                      )}`}
                      target="_blank" rel="noopener noreferrer"
                      data-testid={`link-wa-inq-${inq.id}`}
                    >
                      <Button size="sm" variant="outline" className="h-8 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 gap-1.5 text-xs w-full">
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
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function BrokerCircleAdmin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("dw_re_admin") === "1");
  const [activeTab, setActiveTab] = useState<"apps" | "inquiries">("apps");

  const handleUnlock = () => {
    sessionStorage.setItem("dw_re_admin", "1");
    setAuthed(true);
  };

  if (!authed) return <LockScreen onUnlock={handleUnlock} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/realestate">
            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white gap-1.5 shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-white text-sm flex items-center gap-2 truncate">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              Real Estate Portal — Admin
            </h1>
            <p className="text-[11px] text-slate-500">DeliWer Inner Circle &amp; Viewing Inquiries</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 pb-2">
          <button
            onClick={() => setActiveTab("apps")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "apps"
                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            data-testid="tab-apps"
          >
            <ShieldCheck className="w-4 h-4" /> Broker Applications
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "inquiries"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            data-testid="tab-inquiries"
          >
            <Eye className="w-4 h-4" /> Viewing Inquiries
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "apps" ? <BrokerAppsTab /> : <ViewingInquiriesTab />}
      </div>
    </div>
  );
}
