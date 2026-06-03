import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, Download, RefreshCw, ChevronRight, GitBranch,
  Phone, Mail, Globe2, Home, Video, CalendarClock, ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const ADMIN_TOKEN = "deliwer-admin-2026";

type Eoi = {
  id: string;
  brokerName: string;
  brokerPhone: string;
  brokerEmail?: string;
  brokerage?: string;
  reraLicense?: string;
  country?: string;
  unitType?: string;
  budget?: string;
  tourRequested: boolean;
  earlybirdOpted: boolean;
  notes?: string;
  referralCode?: string;
  referredBy?: string;
  status: string;
  submittedAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  new:       "bg-blue-500/15 text-blue-300 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  qualified: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  closed:    "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

function csvRow(e: Eoi) {
  return [
    e.brokerName, e.brokerPhone, e.brokerEmail ?? "",
    e.brokerage ?? "", e.reraLicense ?? "", e.country ?? "",
    e.unitType ?? "", e.budget ?? "",
    e.tourRequested ? "Yes" : "No",
    e.earlybirdOpted ? "Yes" : "No",
    e.referralCode ?? "", e.referredBy ?? "",
    e.status,
    new Date(e.submittedAt).toLocaleString("en-AE", { timeZone: "Asia/Dubai" }),
    e.notes ?? "",
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
}

function exportCsv(eois: Eoi[]) {
  const header = "Name,Phone,Email,Brokerage,RERA,Country,Unit Interest,Budget,Tour Requested,Early Bird,Ref Code,Referred By,Status,Submitted (Dubai),Notes";
  const rows = eois.map(csvRow).join("\n");
  const blob = new Blob([header + "\n" + rows], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `mamzar-eois-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

export default function MamzarAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [view, setView] = useState<"table" | "tree">("table");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: eois = [], isLoading, refetch } = useQuery<Eoi[]>({
    queryKey: ["/api/mamzar/admin/eois"],
    queryFn: async () => {
      const res = await fetch("/api/mamzar/admin/eois", {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/mamzar/admin/eoi/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": ADMIN_TOKEN },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/mamzar/admin/eois"] });
      toast({ title: "Status updated" });
    },
  });

  const selected = eois.find(e => e.id === selectedId) ?? null;

  const byCode = Object.fromEntries(eois.map(e => [e.referralCode ?? "", e]));

  const roots = eois.filter(e => !e.referredBy);
  const referred = eois.filter(e => !!e.referredBy);
  const childrenOf = (code: string) => referred.filter(e => e.referredBy === code);

  const stats = {
    total: eois.length,
    tours: eois.filter(e => e.tourRequested).length,
    referred: referred.length,
    new: eois.filter(e => e.status === "new").length,
  };

  function TreeNode({ eoi, depth = 0 }: { eoi: Eoi; depth?: number }) {
    const kids = childrenOf(eoi.referralCode ?? "");
    return (
      <div style={{ marginLeft: depth * 20 }}>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-1 cursor-pointer transition ${selectedId === eoi.id ? "border-cyan-500/50 bg-cyan-950/20" : "border-slate-800 bg-slate-900/40 hover:border-slate-700"}`}
          onClick={() => setSelectedId(selectedId === eoi.id ? null : eoi.id)}
        >
          {depth > 0 && <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-white text-sm">{eoi.brokerName}</span>
            <span className="text-slate-500 text-xs ml-2">{eoi.brokerPhone}</span>
            {eoi.unitType && <span className="text-slate-600 text-xs ml-2">· {eoi.unitType}</span>}
          </div>
          <code className="text-[10px] text-cyan-400 bg-cyan-950/30 border border-cyan-800/30 px-2 py-0.5 rounded font-mono">{eoi.referralCode}</code>
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${STATUS_COLORS[eoi.status] ?? STATUS_COLORS.new}`}>{eoi.status}</span>
          {kids.length > 0 && (
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2 py-0.5 rounded">+{kids.length}</span>
          )}
        </div>
        {kids.map(k => <TreeNode key={k.id} eoi={k} depth={depth + 1} />)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/mamzar">
            <button className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition">
              <ArrowLeft className="w-4 h-4" /> Mamzar Page
            </button>
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="font-black text-white text-sm">Mamzar EOI Admin</span>
          </div>
          <span className="bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
            Pre-Launch
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs" onClick={() => setView(v => v === "table" ? "tree" : "table")}>
            <GitBranch className="w-3.5 h-3.5" />
            {view === "table" ? "Referral Tree" : "Table View"}
          </Button>
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5 text-xs" onClick={() => refetch()}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black gap-1.5 text-xs" onClick={() => exportCsv(eois)}>
            <Download className="w-3.5 h-3.5" /> Export CSV ({eois.length})
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800/40 border-b border-slate-800">
        {[
          { label: "Total EOIs", value: stats.total, color: "text-white" },
          { label: "Tours Requested", value: stats.tours, color: "text-fuchsia-300" },
          { label: "Via Referral", value: stats.referred, color: "text-cyan-300" },
          { label: "Awaiting Contact", value: stats.new, color: "text-amber-300" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-950 px-6 py-5 text-center">
            <div className={`text-3xl font-black tabular-nums ${color}`}>{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex h-[calc(100vh-11rem)]">
        {/* Main panel */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-slate-500 text-center py-20">Loading…</div>
          ) : eois.length === 0 ? (
            <div className="text-center py-20 text-slate-600">No EOIs registered yet.</div>
          ) : view === "tree" ? (
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-4">Referral Tree — indented rows were introduced by their parent</p>
              {roots.map(e => <TreeNode key={e.id} eoi={e} />)}
              {referred.filter(e => !byCode[e.referredBy ?? ""]).map(e => (
                <div key={e.id} className="ml-4">
                  <p className="text-[10px] text-slate-600 mb-1">Referred by unknown code: {e.referredBy}</p>
                  <TreeNode eoi={e} />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60">
                    {["Broker", "Phone", "Unit", "Tour", "Ref Code", "Referred By", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {eois.map(e => (
                    <tr
                      key={e.id}
                      className={`border-b border-slate-800/60 hover:bg-slate-900/40 cursor-pointer transition ${selectedId === e.id ? "bg-cyan-950/10" : ""}`}
                      onClick={() => setSelectedId(selectedId === e.id ? null : e.id)}
                    >
                      <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{e.brokerName}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{e.brokerPhone}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{e.unitType ?? "—"}</td>
                      <td className="px-4 py-3">
                        {e.tourRequested ? <span className="text-fuchsia-400 font-bold text-xs">✓ Tour</span> : <span className="text-slate-600 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-[10px] text-cyan-400 bg-cyan-950/30 border border-cyan-800/30 px-2 py-0.5 rounded font-mono">
                          {e.referralCode ?? "—"}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        {e.referredBy ? (
                          <div className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3 text-emerald-400" />
                            <code className="text-[10px] text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2 py-0.5 rounded font-mono">
                              {e.referredBy}
                            </code>
                          </div>
                        ) : <span className="text-slate-700 text-xs">Direct</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${STATUS_COLORS[e.status] ?? STATUS_COLORS.new}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1" onClick={ev => ev.stopPropagation()}>
                          {["new", "contacted", "qualified", "closed"].filter(s => s !== e.status).map(s => (
                            <button
                              key={s}
                              className="text-[10px] font-bold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-2 py-0.5 rounded transition capitalize"
                              onClick={() => updateStatus.mutate({ id: e.id, status: s })}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail slide-over */}
        {selected && (
          <div className="w-80 border-l border-slate-800 bg-slate-900/60 overflow-y-auto p-5 shrink-0">
            <div className="flex items-center justify-between mb-5">
              <span className="font-black text-white text-sm">{selected.brokerName}</span>
              <button onClick={() => setSelectedId(null)} className="text-slate-500 hover:text-white transition text-lg leading-none">×</button>
            </div>

            <div className="space-y-4 text-sm">
              <Row icon={Phone} label="Phone" value={selected.brokerPhone} />
              {selected.brokerEmail && <Row icon={Mail} label="Email" value={selected.brokerEmail} />}
              {selected.country && <Row icon={Globe2} label="Country" value={selected.country} />}
              {selected.unitType && <Row icon={Home} label="Unit interest" value={selected.unitType} />}
              {selected.brokerage && <Row icon={Users} label="Brokerage" value={selected.brokerage} />}
              {selected.tourRequested && <Row icon={Video} label="Tour" value="Requested ✓" />}
              {selected.earlybirdOpted && <Row icon={CalendarClock} label="Early Bird" value="Opted in ✓" />}
              {selected.notes && <Row icon={ChevronRight} label="Notes" value={selected.notes} />}

              <div className="pt-3 border-t border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Referral Chain</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-xs">Their code</span>
                    <code className="text-[10px] text-cyan-400 font-mono">{selected.referralCode ?? "—"}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-xs">Referred by</span>
                    {selected.referredBy ? (
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3 text-emerald-400" />
                        <code className="text-[10px] text-emerald-400 font-mono">{selected.referredBy}</code>
                      </div>
                    ) : <span className="text-xs text-slate-600">Direct</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-xs">Sub-referrals</span>
                    <span className="text-xs font-bold text-white">{childrenOf(selected.referralCode ?? "").length}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["new", "contacted", "qualified", "closed"] as const).map(s => (
                    <button
                      key={s}
                      className={`text-xs font-bold py-2 rounded-lg border transition capitalize ${selected.status === s ? STATUS_COLORS[s] : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"}`}
                      onClick={() => updateStatus.mutate({ id: selected.id, status: s })}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <a
                  href={`https://wa.me/${selected.brokerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${selected.brokerName} — following up on your EOI for Alef Linar Mamzar Beach (ref: ${selected.referralCode}). Let's schedule your founder tour.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> WhatsApp Broker
                  </Button>
                </a>
              </div>

              <p className="text-[10px] text-slate-600 text-center">
                Submitted {new Date(selected.submittedAt).toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">{label}</p>
        <p className="text-slate-300 text-xs">{value}</p>
      </div>
    </div>
  );
}
