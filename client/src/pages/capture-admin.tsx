import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Users, TrendingUp, Star, Download, Filter, CheckCircle, Phone, Clock, MapPin, ChevronDown } from "lucide-react";

type Lead = {
  id: string; name: string; phone: string; intent: string;
  servicesNeeded: string[]; propertyType: string | null;
  location: string | null; budget: string | null; timeline: string | null;
  referrerId: string | null; status: string; score: number;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const INTENT_LABELS: Record<string, string> = {
  "move-in": "Just Moved In", upgrade: "Upgrading", moving: "Looking to Move",
};

export default function CaptureAdmin() {
  const [filterIntent, setFilterIntent] = useState("");
  const [filterReferrer, setFilterReferrer] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/tenant-capture/leads"],
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/tenant-capture/leads/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/tenant-capture/leads"] }),
  });

  const filtered = leads.filter(l => {
    if (filterIntent && l.intent !== filterIntent) return false;
    if (filterReferrer && l.referrerId !== filterReferrer) return false;
    if (filterService && !(l.servicesNeeded || []).includes(filterService)) return false;
    if (filterStatus && l.status !== filterStatus) return false;
    return true;
  });

  const referrers = [...new Set(leads.map(l => l.referrerId).filter(Boolean))];
  const total = leads.length;
  const highIntent = leads.filter(l => l.score >= 40).length;
  const converted = leads.filter(l => l.status === "converted").length;
  const avgScore = total ? Math.round(leads.reduce((s, l) => s + l.score, 0) / total) : 0;

  const exportCsv = () => {
    window.open("/api/tenant-capture/leads/export", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Tenant Leads</h1>
            <p className="text-gray-500 text-sm mt-0.5">DeliWer Capture System · Admin Dashboard</p>
          </div>
          <div className="flex gap-2">
            <a href="/capture-referrers" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              Manage Referrers
            </a>
            <button
              data-testid="button-export-csv"
              onClick={exportCsv}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Leads", value: total, icon: Users, color: "text-blue-600 bg-blue-50" },
            { label: "High Intent", value: highIntent, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
            { label: "Converted", value: converted, icon: CheckCircle, color: "text-purple-600 bg-purple-50" },
            { label: "Avg Score", value: avgScore, icon: Star, color: "text-amber-600 bg-amber-50" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} data-testid={`stat-${s.label.toLowerCase().replace(/ /g, "-")}`} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3 items-center">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <select data-testid="filter-intent" value={filterIntent} onChange={e => setFilterIntent(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-emerald-400">
            <option value="">All Intents</option>
            <option value="move-in">Just Moved In</option>
            <option value="upgrade">Upgrading</option>
            <option value="moving">Looking to Move</option>
          </select>
          <select data-testid="filter-referrer" value={filterReferrer} onChange={e => setFilterReferrer(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-emerald-400">
            <option value="">All Referrers</option>
            {referrers.map(r => <option key={r!} value={r!}>{r}</option>)}
          </select>
          <select data-testid="filter-service" value={filterService} onChange={e => setFilterService(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-emerald-400">
            <option value="">All Services</option>
            <option value="water">Water / Filtration</option>
            <option value="ac">AC / Maintenance</option>
            <option value="cleaning">Cleaning</option>
            <option value="appliances">Appliances</option>
            <option value="property">Property Search</option>
          </select>
          <select data-testid="filter-status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-emerald-400">
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
          {(filterIntent || filterReferrer || filterService || filterStatus) && (
            <button onClick={() => { setFilterIntent(""); setFilterReferrer(""); setFilterService(""); setFilterStatus(""); }}
              className="text-xs text-gray-400 hover:text-gray-700 transition">Clear</button>
          )}
          <span className="ml-auto text-xs text-gray-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Lead Table */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No leads yet</p>
            <p className="text-sm mt-1">Share <a href="/capture" className="text-emerald-500 hover:underline">/capture</a> to start collecting</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(lead => (
              <div key={lead.id} data-testid={`lead-card-${lead.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-600 text-sm flex-shrink-0">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900">{lead.name}</p>
                        {lead.score >= 40 && (
                          <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">🔥 HIGH INTENT</span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[lead.status]}`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                        {lead.location && <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.location}</span>}
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{lead.timeline || "—"}</span>
                        {lead.referrerId && <span className="text-xs text-emerald-600 font-bold">ref: {lead.referrerId}</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {INTENT_LABELS[lead.intent] || lead.intent}
                        </span>
                        {(lead.servicesNeeded || []).map(s => (
                          <span key={s} className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-2">
                      <p className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs font-bold text-gray-500">Score: {lead.score}</p>
                    </div>
                    <div className="relative">
                      <select
                        data-testid={`status-select-${lead.id}`}
                        value={lead.status}
                        onChange={e => statusMutation.mutate({ id: lead.id, status: e.target.value })}
                        className="appearance-none pl-3 pr-7 py-2 rounded-xl border border-gray-200 text-xs font-bold bg-white outline-none focus:border-emerald-400 cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, this is DeliWer — following up on your home setup request. How can we help?`)}`}
                      target="_blank" rel="noopener noreferrer"
                      data-testid={`button-wa-${lead.id}`}
                      className="px-3 py-2 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> WA
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
