import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { DollarSign, Plus, Download, X, Check, Pencil, Trash2, Filter } from "lucide-react";

type FinanceReferral = {
  id: string; brokerName: string; brokerMobile: string | null; brokerEmail: string | null;
  clientName: string; clientMobile: string; clientEmail: string | null;
  fundingType: string; fundingRequirement: string | null; country: string;
  status: string; notes: string | null; createdAt: string;
};

const FUNDING_TYPES = ["property_finance","business_finance","working_capital","trade_finance","sme_finance","consumer_finance"];
const FUNDING_LABELS: Record<string,string> = { property_finance:"Property Finance", business_finance:"Business Finance", working_capital:"Working Capital", trade_finance:"Trade Finance", sme_finance:"SME Finance", consumer_finance:"Consumer Finance" };
const STATUSES = ["new","submitted","review","client_contacted","documents_pending","approved","funded","closed"];
const STATUS_LABELS: Record<string,string> = { new:"New", submitted:"Submitted", review:"Under Review", client_contacted:"Client Contacted", documents_pending:"Docs Pending", approved:"Approved", funded:"Funded", closed:"Closed" };
const STATUS_COLORS: Record<string,string> = {
  new:"bg-slate-700 text-slate-200", submitted:"bg-blue-900/60 text-blue-300", review:"bg-amber-900/60 text-amber-300",
  client_contacted:"bg-purple-900/60 text-purple-300", documents_pending:"bg-orange-900/60 text-orange-300",
  approved:"bg-cyan-900/60 text-cyan-300", funded:"bg-emerald-900/60 text-emerald-300", closed:"bg-slate-800 text-slate-500"
};
const FUNDING_COLORS: Record<string,string> = {
  property_finance:"text-blue-400", business_finance:"text-emerald-400", working_capital:"text-amber-400",
  trade_finance:"text-purple-400", sme_finance:"text-cyan-400", consumer_finance:"text-rose-400"
};

const EMPTY = { brokerName:"", brokerMobile:"", brokerEmail:"", clientName:"", clientMobile:"", clientEmail:"", fundingType:"property_finance", fundingRequirement:"", country:"UAE", status:"new", notes:"" };

export default function FinanceCrmPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data: referrals = [], isLoading } = useQuery<FinanceReferral[]>({ queryKey: ["/api/bnos/finance-referrals"] });

  const createMutation = useMutation({
    mutationFn: (d: typeof EMPTY) => apiRequest("POST", "/api/bnos/finance-referrals", d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/finance-referrals"] }); queryClient.invalidateQueries({ queryKey: ["/api/bnos/stats"] }); setShowForm(false); setForm({ ...EMPTY }); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof EMPTY> }) => apiRequest("PATCH", `/api/bnos/finance-referrals/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/finance-referrals"] }); setEditId(null); setShowForm(false); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/bnos/finance-referrals/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/finance-referrals"] }); queryClient.invalidateQueries({ queryKey: ["/api/bnos/stats"] }); },
  });

  const filtered = referrals.filter(r => (!filterStatus || r.status === filterStatus) && (!filterType || r.fundingType === filterType));

  const exportCsv = () => {
    const headers = ["ID","Broker Name","Broker Mobile","Client Name","Client Mobile","Funding Type","Requirement","Country","Status","Date"];
    const rows = filtered.map(r => [r.id, r.brokerName, r.brokerMobile||"", r.clientName, r.clientMobile, FUNDING_LABELS[r.fundingType]||r.fundingType, r.fundingRequirement||"", r.country, r.status, r.createdAt.slice(0,10)]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = `finance-referrals-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  };

  const startEdit = (r: FinanceReferral) => {
    setEditId(r.id);
    setForm({ brokerName:r.brokerName, brokerMobile:r.brokerMobile||"", brokerEmail:r.brokerEmail||"", clientName:r.clientName, clientMobile:r.clientMobile, clientEmail:r.clientEmail||"", fundingType:r.fundingType, fundingRequirement:r.fundingRequirement||"", country:r.country, status:r.status, notes:r.notes||"" });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2"><DollarSign className="w-6 h-6 text-amber-400" /> Finance Referral CRM</h1>
            <p className="text-slate-400 text-sm mt-1">Track client finance referrals from broker to funded status</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-black text-sm transition-colors" data-testid="btn-export-csv">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button onClick={() => { setEditId(null); setForm({ ...EMPTY }); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 rounded-xl font-black text-sm transition-colors"
              data-testid="btn-add-referral">
              <Plus className="w-4 h-4" /> Add Referral
            </button>
          </div>
        </div>

        {/* Status pipeline */}
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => {
            const cnt = referrals.filter(r => r.status === s).length;
            if (cnt === 0) return null;
            return (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${filterStatus === s ? STATUS_COLORS[s] + " border-current" : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"}`}
                data-testid={`filter-status-${s}`}>
                {STATUS_LABELS[s]} · {cnt}
              </button>
            );
          })}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-amber-400">{editId ? "Edit Referral" : "New Finance Referral"}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3 text-xs font-black uppercase tracking-widest text-amber-400/70">Broker Details</div>
              {[{ k:"brokerName", l:"Broker Name *", p:"Full name" },{ k:"brokerMobile", l:"Broker Mobile", p:"+971 50 xxx" },{ k:"brokerEmail", l:"Broker Email", p:"broker@email.com" }].map(({ k, l, p }) => (
                <div key={k}>
                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">{l}</label>
                  <input value={(form as any)[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={p}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500" data-testid={`input-ref-${k}`} />
                </div>
              ))}
              <div className="md:col-span-2 lg:col-span-3 text-xs font-black uppercase tracking-widest text-amber-400/70 pt-2">Client Details</div>
              {[{ k:"clientName", l:"Client Name *", p:"Full name" },{ k:"clientMobile", l:"Client Mobile *", p:"+971 50 xxx" },{ k:"clientEmail", l:"Client Email", p:"client@email.com" },{ k:"fundingRequirement", l:"Funding Requirement", p:"AED 2,000,000" }].map(({ k, l, p }) => (
                <div key={k}>
                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">{l}</label>
                  <input value={(form as any)[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={p}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500" data-testid={`input-ref-${k}`} />
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Funding Type *</label>
                <select value={form.fundingType} onChange={e => setForm(f => ({ ...f, fundingType: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500" data-testid="select-ref-fundingType">
                  {FUNDING_TYPES.map(t => <option key={t} value={t}>{FUNDING_LABELS[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500" data-testid="select-ref-status">
                  {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Country</label>
                <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500">
                  {["UAE","KSA","UK","India","Pakistan","Other"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2} placeholder="Additional notes…"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 resize-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { if (!form.brokerName || !form.clientName || !form.clientMobile) return; editId ? updateMutation.mutate({ id: editId, data: form }) : createMutation.mutate(form); }}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 rounded-xl font-black text-sm transition-colors disabled:opacity-50"
                data-testid="btn-save-referral">
                <Check className="w-4 h-4" /> {editId ? "Save Changes" : "Add Referral"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-black text-sm transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-16 text-slate-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
            <DollarSign className="w-8 h-8 mx-auto mb-3 text-slate-700" />
            <p className="font-black">No referrals yet</p>
            <p className="text-sm mt-1">Add your first finance referral above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left py-3 px-4">Broker</th>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Funding</th>
                  <th className="text-left py-3 px-4">Requirement</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-b border-slate-800/60 hover:bg-slate-900/40 transition-colors" data-testid={`row-referral-${r.id}`}>
                    <td className="py-3 px-4">
                      <div className="font-black">{r.brokerName}</div>
                      <div className="text-xs text-slate-500">{r.brokerMobile || r.brokerEmail || "—"}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-black">{r.clientName}</div>
                      <div className="text-xs text-slate-500">{r.clientMobile}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-black text-xs ${FUNDING_COLORS[r.fundingType] || "text-slate-300"}`}>{FUNDING_LABELS[r.fundingType] || r.fundingType}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{r.fundingRequirement || "—"}</td>
                    <td className="py-3 px-4">
                      <select value={r.status} onChange={e => updateMutation.mutate({ id: r.id, data: { status: e.target.value } })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[r.status]}`}
                        data-testid={`select-status-referral-${r.id}`}>
                        {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500">{r.createdAt.slice(0,10)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => startEdit(r)} className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all" data-testid={`btn-edit-referral-${r.id}`}><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { if (confirm("Delete this referral?")) deleteMutation.mutate(r.id); }} className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-all" data-testid={`btn-delete-referral-${r.id}`}><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
