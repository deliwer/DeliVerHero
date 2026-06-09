import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Shield, RefreshCw, Download, TrendingUp, Users, DollarSign, Calendar,
  AlertTriangle, CheckCircle2, Mail, MapPin,
} from "lucide-react";

const ADMIN_TOKEN = "deliwer-admin-2026";

function adminFetch(url: string) {
  return fetch(url, { headers: { "x-admin-token": ADMIN_TOKEN } }).then(r => {
    if (!r.ok) throw new Error("Unauthorized");
    return r.json();
  });
}

function fmtDate(d?: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-AE", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtAED(n?: number | null) {
  if (!n && n !== 0) return "—";
  return `AED ${n.toLocaleString()}`;
}

type Lead = {
  id: string;
  email: string;
  district: string;
  monthlyRent: number;
  overpayEstimate?: number | null;
  createdAt: string;
};

function exportCSV(leads: Lead[]) {
  const header = ["Email", "District", "Monthly Rent (AED)", "Overpay Estimate (AED)", "Monthly Overpay / Year", "Submitted"];
  const rows = leads.map(l => [
    l.email,
    l.district,
    l.monthlyRent,
    l.overpayEstimate ?? "",
    l.overpayEstimate ? Math.round(l.overpayEstimate * 12 / 1000) + "K/yr" : "",
    fmtDate(l.createdAt),
  ]);
  const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `rent-analysis-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

export default function RentAnalysisLeadsAdmin() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  const { data: leads = [], isLoading, refetch } = useQuery<Lead[]>({
    queryKey: ["/api/admin/rent-analysis-leads"],
    queryFn: () => adminFetch("/api/admin/rent-analysis-leads"),
    enabled: unlocked,
    refetchInterval: 60_000,
  });

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-8 space-y-5">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-violet-400" />
            <h1 className="text-white font-black text-lg tracking-tight">Rent Analysis Leads</h1>
          </div>
          <p className="text-gray-400 text-sm">Enter admin password to continue.</p>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                if (pw === ADMIN_TOKEN) setUnlocked(true);
                else setPwError(true);
              }
            }}
            placeholder="Admin password"
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50"
            data-testid="input-admin-pw"
          />
          {pwError && <p className="text-red-400 text-xs font-bold">Incorrect password.</p>}
          <button
            onClick={() => {
              if (pw === ADMIN_TOKEN) setUnlocked(true);
              else setPwError(true);
            }}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black text-sm rounded-xl py-2.5 transition-colors"
            data-testid="btn-admin-unlock"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  const filtered = leads.filter(l => {
    const matchSearch = !search ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.district.toLowerCase().includes(search.toLowerCase());
    const matchDistrict = districtFilter === "all" || l.district === districtFilter;
    return matchSearch && matchDistrict;
  });

  const overpayLeads = leads.filter(l => (l.overpayEstimate ?? 0) > 0);
  const avgOverpay = overpayLeads.length
    ? Math.round(overpayLeads.reduce((sum, l) => sum + (l.overpayEstimate ?? 0), 0) / overpayLeads.length)
    : 0;
  const avgRent = leads.length
    ? Math.round(leads.reduce((sum, l) => sum + l.monthlyRent, 0) / leads.length)
    : 0;

  const districts = Array.from(new Set(leads.map(l => l.district))).sort();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-violet-400 shrink-0" />
            <h1 className="font-black text-white tracking-tight">Rent Analysis Leads</h1>
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-2 py-0.5">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-white border border-white/10 rounded-xl px-3 py-1.5 transition-colors"
              data-testid="btn-refresh"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
            <button
              onClick={() => exportCSV(filtered)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-xl px-3 py-1.5 transition-colors"
              data-testid="btn-export-csv"
            >
              <Download className="w-3 h-3" /> Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Leads", value: leads.length, icon: <Users className="w-4 h-4" />, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            { label: "Overpaying", value: overpayLeads.length, icon: <AlertTriangle className="w-4 h-4" />, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
            { label: "Avg Overpay / mo", value: avgOverpay ? `AED ${avgOverpay.toLocaleString()}` : "—", icon: <TrendingUp className="w-4 h-4" />, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
            { label: "Avg Rent / mo", value: avgRent ? `AED ${avgRent.toLocaleString()}` : "—", icon: <DollarSign className="w-4 h-4" />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          ].map(k => (
            <div key={k.label} className={`rounded-xl border p-4 ${k.bg}`}>
              <div className={`${k.color} mb-2`}>{k.icon}</div>
              <div className={`text-xl font-black ${k.color}`}>{k.value}</div>
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search email or district…"
            className="flex-1 min-w-48 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500/40"
            data-testid="input-search"
          />
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-violet-500/40"
            data-testid="select-district-filter"
          >
            <option value="all">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-16 text-gray-500 font-bold">Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-bold">
            {leads.length === 0 ? "No leads submitted yet." : "No leads match your search."}
          </div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-800/60">
                    <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Email</th>
                    <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">District</th>
                    <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Monthly Rent</th>
                    <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Overpay / mo</th>
                    <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Overpay / yr</th>
                    <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</th>
                    <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => {
                    const isOverpaying = (lead.overpayEstimate ?? 0) > 0;
                    return (
                      <tr
                        key={lead.id}
                        className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}`}
                        data-testid={`row-lead-${lead.id}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-gray-500 shrink-0" />
                            <span className="text-white font-medium text-xs">{lead.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                            <span className="text-gray-300 text-xs">{lead.district}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-white font-bold text-xs">{fmtAED(lead.monthlyRent)}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {isOverpaying ? (
                            <span className="text-red-400 font-bold text-xs">{fmtAED(lead.overpayEstimate)}</span>
                          ) : (
                            <span className="text-gray-500 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {isOverpaying ? (
                            <span className="text-red-400 font-bold text-xs">
                              AED {Math.round((lead.overpayEstimate ?? 0) * 12 / 1000)}K
                            </span>
                          ) : (
                            <span className="text-gray-500 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isOverpaying ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-red-500/10 text-red-400 border-red-500/25 uppercase tracking-wide">
                              <AlertTriangle className="w-2.5 h-2.5" /> Overpaying
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-emerald-500/10 text-emerald-400 border-emerald-500/25 uppercase tracking-wide">
                              <CheckCircle2 className="w-2.5 h-2.5" /> On Market
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-gray-600 shrink-0" />
                            <span className="text-gray-400 text-xs whitespace-nowrap">{fmtDate(lead.createdAt)}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {filtered.length} of {leads.length} leads
              </span>
              {overpayLeads.length > 0 && (
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  {overpayLeads.length} overpaying · potential AED {Math.round(overpayLeads.reduce((s, l) => s + (l.overpayEstimate ?? 0) * 12, 0) / 1000)}K annual savings on the table
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
