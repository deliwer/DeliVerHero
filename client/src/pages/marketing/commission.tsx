import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { TrendingUp, Check, Pencil, X } from "lucide-react";

type CommissionConfig = {
  id: string; partnerType: string; commissionType: string;
  commissionPct: number | null; flatFeeAed: number | null; notes: string | null;
};

const PARTNER_TYPES = [
  { key:"REAL_ESTATE_BROKER", label:"Real Estate Broker", desc:"Property sales, rentals & mortgage referrals", color:"blue" },
  { key:"FINANCE_BROKER", label:"Finance Broker", desc:"Mortgage & business finance referrals", color:"amber" },
  { key:"PHONE_FLIPPER", label:"Phone Flipper", desc:"Device sourcing & trade-in referrals (ChainTrack)", color:"purple" },
  { key:"FREIGHT_BROKER", label:"Freight Broker", desc:"Logistics & import/export (ChainTrack Logistics)", color:"cyan" },
  { key:"HOME_SERVICE_PARTNER", label:"Home Service Partner", desc:"Maintenance, cleaning & moving", color:"green" },
  { key:"BUSINESS_INTRODUCER", label:"Business Introducer", desc:"General business opportunity referrals", color:"rose" },
  { key:"UNVERIFIED_PARTNER", label:"Unverified Partner", desc:"Candidates pending verification", color:"slate" },
];

const EMPTY = { commissionType:"percentage", commissionPct:"", flatFeeAed:"", notes:"" };

export default function CommissionPage() {
  const [editType, setEditType] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });

  const { data: configs = [], isLoading } = useQuery<CommissionConfig[]>({ queryKey: ["/api/bnos/commission"] });

  const saveMutation = useMutation({
    mutationFn: ({ partnerType, data }: { partnerType: string; data: any }) => apiRequest("PUT", `/api/bnos/commission/${partnerType}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/commission"] }); setEditType(null); },
  });

  const getConfig = (key: string) => configs.find(c => c.partnerType === key);

  const startEdit = (key: string) => {
    const c = getConfig(key);
    setEditType(key);
    setForm({ commissionType: c?.commissionType || "percentage", commissionPct: c?.commissionPct?.toString() || "", flatFeeAed: c?.flatFeeAed?.toString() || "", notes: c?.notes || "" });
  };

  const handleSave = () => {
    if (!editType) return;
    saveMutation.mutate({ partnerType: editType, data: {
      commissionType: form.commissionType,
      commissionPct: form.commissionPct ? parseInt(form.commissionPct) : null,
      flatFeeAed: form.flatFeeAed ? parseInt(form.flatFeeAed) : null,
      notes: form.notes || null,
    }});
  };

  const formatRate = (c: CommissionConfig) => {
    if (c.commissionType === "percentage" && c.commissionPct) return `${c.commissionPct / 100}%`;
    if (c.commissionType === "flat_fee" && c.flatFeeAed) return `AED ${c.flatFeeAed.toLocaleString()}`;
    if (c.commissionType === "tiered") return "Tiered";
    return "—";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2"><TrendingUp className="w-6 h-6 text-rose-400" /> Commission Configuration</h1>
          <p className="text-slate-400 text-sm mt-1">Set commission rates by partner type · System tracks only · No payment processing</p>
        </div>

        <div className="bg-amber-900/15 border border-amber-700/30 rounded-xl px-4 py-3 text-xs text-amber-400/80">
          The system tracks commissions and referrals only. No payments are processed through this platform.
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-slate-500">Loading…</div>
        ) : (
          <div className="space-y-3">
            {PARTNER_TYPES.map(({ key, label, desc, color }) => {
              const c = getConfig(key);
              const isEditing = editType === key;
              return (
                <div key={key} className={`bg-slate-900/60 border ${isEditing ? "border-rose-500/30" : "border-slate-800"} rounded-xl overflow-hidden transition-all`} data-testid={`row-commission-${key}`}>
                  <div className="p-4 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-48">
                      <div className="font-black text-white">{label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                    </div>
                    {c && !isEditing && (
                      <div className="text-right">
                        <div className={`text-lg font-black text-${color}-400`}>{formatRate(c)}</div>
                        <div className="text-xs text-slate-500 capitalize">{c.commissionType.replace("_"," ")}</div>
                      </div>
                    )}
                    {!isEditing && (
                      <button onClick={() => startEdit(key)} className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg text-sm font-black text-slate-400 hover:text-white transition-all" data-testid={`btn-edit-commission-${key}`}>
                        <Pencil className="w-3.5 h-3.5" /> {c ? "Edit" : "Set Rate"}
                      </button>
                    )}
                    {isEditing && <button onClick={() => setEditType(null)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>}
                  </div>

                  {isEditing && (
                    <div className="border-t border-slate-800 p-4 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Type</label>
                          <select value={form.commissionType} onChange={e => setForm(f => ({ ...f, commissionType: e.target.value }))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500" data-testid={`select-comm-type-${key}`}>
                            <option value="percentage">Percentage</option>
                            <option value="flat_fee">Flat Fee (AED)</option>
                            <option value="tiered">Tiered</option>
                          </select>
                        </div>
                        {form.commissionType === "percentage" && (
                          <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Rate (basis pts · 1000 = 10%)</label>
                            <input type="number" value={form.commissionPct} onChange={e => setForm(f => ({ ...f, commissionPct: e.target.value }))} placeholder="e.g. 1000"
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500" data-testid={`input-comm-pct-${key}`} />
                          </div>
                        )}
                        {form.commissionType === "flat_fee" && (
                          <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Flat Fee (AED)</label>
                            <input type="number" value={form.flatFeeAed} onChange={e => setForm(f => ({ ...f, flatFeeAed: e.target.value }))} placeholder="e.g. 500"
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500" data-testid={`input-comm-flat-${key}`} />
                          </div>
                        )}
                        <div className="lg:col-span-2">
                          <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Notes</label>
                          <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="e.g. 10% on disbursed mortgage"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500" data-testid={`input-comm-notes-${key}`} />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button onClick={handleSave} disabled={saveMutation.isPending}
                          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl font-black text-sm transition-colors disabled:opacity-50"
                          data-testid={`btn-save-commission-${key}`}>
                          <Check className="w-4 h-4" /> Save
                        </button>
                        <button onClick={() => setEditType(null)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-black text-sm transition-colors">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
