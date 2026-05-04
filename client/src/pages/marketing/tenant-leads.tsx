import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { Users, TrendingUp, Star, Download, Filter, CheckCircle, Phone, Clock, MapPin, ChevronDown, ExternalLink, QrCode } from "lucide-react";

type Lead = {
  id: string; name: string; phone: string; intent: string;
  servicesNeeded: string[]; propertyType: string | null;
  location: string | null; budget: string | null; timeline: string | null;
  referrerId: string | null; status: string; score: number;
  createdAt: string;
};

const STATUS_DARK: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  contacted: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  converted: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

const INTENT_LABELS: Record<string, string> = {
  "move-in": "Just Moved In", upgrade: "Upgrading", moving: "Looking to Move",
};

export default function MarketingTenantLeads() {
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

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Tenant Capture</h1>
            <p className="text-gray-500 text-sm mt-0.5">Lead pipeline from QR &amp; referral flows</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/marketing/tenant-referrers"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-bold transition"
              data-testid="button-manage-referrers"
            >
              <QrCode className="w-4 h-4" /> Referrers
            </a>
            <a
              href="/capture"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-bold transition"
              data-testid="button-preview-capture"
            >
              <ExternalLink className="w-4 h-4" /> Preview Form
            </a>
            <a
              href="/api/tenant-capture/leads/export"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-sm font-bold transition"
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4" /> Export CSV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Leads", value: total, icon: "👥", color: "text-white" },
            { label: "High Intent", value: highIntent, icon: "🔥", color: "text-emerald-400" },
            { label: "Converted", value: converted, icon: "✅", color: "text-purple-400" },
            { label: "Avg Score", value: avgScore, icon: "⭐", color: "text-amber-400" },
          ].map(s => (
            <div key={s.label} data-testid={`stat-${s.label.toLowerCase().replace(/ /g, "-")}`}
              className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs font-medium mt-0.5 text-white/70">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Share strip */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-300">📲 Capture link ready to share</p>
            <p className="text-xs text-emerald-500/80 font-mono mt-0.5">{typeof window !== "undefined" ? window.location.origin : "https://deliwer.com"}/capture</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/capture`)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black rounded-lg transition"
            data-testid="button-copy-capture-link"
          >
            Copy Link
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-wrap gap-3 items-center">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {[
            { value: filterIntent, set: setFilterIntent, placeholder: "All Intents", options: [["move-in","Just Moved In"],["upgrade","Upgrading"],["moving","Looking to Move"]] },
            { value: filterService, set: setFilterService, placeholder: "All Services", options: [["water","Water"],["ac","AC"],["cleaning","Cleaning"],["appliances","Appliances"],["property","Property"]] },
            { value: filterStatus, set: setFilterStatus, placeholder: "All Statuses", options: [["new","New"],["contacted","Contacted"],["converted","Converted"]] },
          ].map((f, i) => (
            <select key={i} value={f.value} onChange={e => f.set(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 outline-none focus:border-emerald-500/50 transition">
              <option value="">{f.placeholder}</option>
              {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          ))}
          <select value={filterReferrer} onChange={e => setFilterReferrer(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 outline-none focus:border-emerald-500/50 transition">
            <option value="">All Referrers</option>
            {referrers.map(r => <option key={r!} value={r!}>{r}</option>)}
          </select>
          {(filterIntent || filterReferrer || filterService || filterStatus) && (
            <button onClick={() => { setFilterIntent(""); setFilterReferrer(""); setFilterService(""); setFilterStatus(""); }}
              className="text-xs text-gray-500 hover:text-white transition">Clear</button>
          )}
          <span className="ml-auto text-xs text-gray-600">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Leads */}
        {isLoading ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center text-gray-500">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No leads yet</p>
            <p className="text-sm mt-1">
              Share <a href="/capture" target="_blank" className="text-emerald-400 hover:underline">/capture</a> or generate referral QR codes to start collecting
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(lead => (
              <div key={lead.id} data-testid={`lead-card-${lead.id}`}
                className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 transition">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center font-black text-white text-sm flex-shrink-0">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-white">{lead.name}</p>
                        {lead.score >= 40 && (
                          <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">🔥 HIGH INTENT</span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_DARK[lead.status]}`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                        {lead.location && <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.location}</span>}
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{lead.timeline || "—"}</span>
                        {lead.referrerId && <span className="text-xs text-emerald-400 font-bold">ref: {lead.referrerId}</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[10px] font-bold bg-white/5 text-gray-300 border border-white/10 px-2 py-0.5 rounded-full">
                          {INTENT_LABELS[lead.intent] || lead.intent}
                        </span>
                        {(lead.servicesNeeded || []).map(s => (
                          <span key={s} className="text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-1">
                      <p className="text-xs text-gray-600">{new Date(lead.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs font-bold text-gray-500">Score: {lead.score}</p>
                    </div>
                    <div className="relative">
                      <select
                        data-testid={`status-select-${lead.id}`}
                        value={lead.status}
                        onChange={e => statusMutation.mutate({ id: lead.id, status: e.target.value })}
                        className="appearance-none pl-3 pr-7 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-200 outline-none focus:border-emerald-500/50 cursor-pointer transition"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, this is DeliWer — following up on your home setup request. How can we help?`)}`}
                      target="_blank" rel="noopener noreferrer"
                      data-testid={`button-wa-${lead.id}`}
                      className="px-3 py-1.5 bg-[#25D366]/90 hover:bg-[#25D366] text-black rounded-lg text-xs font-black transition flex items-center gap-1"
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
