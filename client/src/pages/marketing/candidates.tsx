import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { UserPlus, Search, Filter, MessageSquare, ChevronDown, X, Pencil, Trash2, Check } from "lucide-react";

type Candidate = {
  id: string; name: string; mobile: string | null; whatsapp: string | null; email: string | null;
  linkedinUrl: string | null; country: string; city: string | null; industry: string | null;
  experience: string | null; source: string; partnerType: string; status: string;
  recruiterNotes: string | null; createdAt: string;
};

const STATUSES = ["applied","contacted","interview_scheduled","zoom_scheduled","zoom_completed","training_completed","activated","inactive","rejected"];
const STATUS_LABELS: Record<string,string> = {
  applied:"Applied", contacted:"Contacted", interview_scheduled:"Interview", zoom_scheduled:"Zoom Scheduled",
  zoom_completed:"Zoom Done", training_completed:"Trained", activated:"Activated", inactive:"Inactive", rejected:"Rejected"
};
const STATUS_COLORS: Record<string,string> = {
  applied:"bg-slate-700 text-slate-200", contacted:"bg-blue-900/60 text-blue-300",
  interview_scheduled:"bg-amber-900/60 text-amber-300", zoom_scheduled:"bg-purple-900/60 text-purple-300",
  zoom_completed:"bg-indigo-900/60 text-indigo-300", training_completed:"bg-cyan-900/60 text-cyan-300",
  activated:"bg-emerald-900/60 text-emerald-300", inactive:"bg-slate-800 text-slate-500",
  rejected:"bg-red-900/40 text-red-400"
};
const PARTNER_TYPES = ["UNVERIFIED_PARTNER","REAL_ESTATE_BROKER","FINANCE_BROKER","PHONE_FLIPPER","FREIGHT_BROKER","HOME_SERVICE_PARTNER","BUSINESS_INTRODUCER"];
const SOURCES = ["linkedin","referral","manual","campaign","telegram"];

const EMPTY_FORM = { name:"", mobile:"", whatsapp:"", email:"", linkedinUrl:"", country:"UAE", city:"", industry:"", experience:"", source:"linkedin", partnerType:"UNVERIFIED_PARTNER", status:"applied", recruiterNotes:"" };

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const { data: candidates = [], isLoading } = useQuery<Candidate[]>({ queryKey: ["/api/bnos/candidates"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof EMPTY_FORM) => apiRequest("POST", "/api/bnos/candidates", data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/candidates"] }); queryClient.invalidateQueries({ queryKey: ["/api/bnos/stats"] }); setShowForm(false); setForm({ ...EMPTY_FORM }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof EMPTY_FORM> }) => apiRequest("PATCH", `/api/bnos/candidates/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/candidates"] }); setEditId(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/bnos/candidates/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/candidates"] }); queryClient.invalidateQueries({ queryKey: ["/api/bnos/stats"] }); },
  });

  const filtered = candidates.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || (c.email||"").toLowerCase().includes(search.toLowerCase()) || (c.mobile||"").includes(search);
    const matchStatus = !filterStatus || c.status === filterStatus;
    const matchType = !filterType || c.partnerType === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const waLink = (c: Candidate) => {
    const num = (c.whatsapp || c.mobile || "").replace(/[^0-9]/g,"");
    const msg = encodeURIComponent(`Hi ${c.name}, we are following up regarding your application to join the DeliWer Partner Network. Please confirm your availability for an onboarding call. DeliWer Team +971523946311`);
    return `https://wa.me/${num}?text=${msg}`;
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editId) { updateMutation.mutate({ id: editId, data: form }); } else { createMutation.mutate(form); }
  };

  const startEdit = (c: Candidate) => {
    setEditId(c.id);
    setForm({ name:c.name, mobile:c.mobile||"", whatsapp:c.whatsapp||"", email:c.email||"", linkedinUrl:c.linkedinUrl||"",
      country:c.country, city:c.city||"", industry:c.industry||"", experience:c.experience||"",
      source:c.source, partnerType:c.partnerType, status:c.status, recruiterNotes:c.recruiterNotes||"" });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2"><UserPlus className="w-6 h-6 text-emerald-400" /> Partner Candidates</h1>
            <p className="text-slate-400 text-sm mt-1">LinkedIn applicants, recruits and prospects across all partner types</p>
          </div>
          <button onClick={() => { setEditId(null); setForm({ ...EMPTY_FORM }); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-black text-sm transition-colors"
            data-testid="btn-add-candidate">
            <UserPlus className="w-4 h-4" /> Add Candidate
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-emerald-400">{editId ? "Edit Candidate" : "Add New Candidate"}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key:"name", label:"Full Name *", placeholder:"John Smith" },
                { key:"mobile", label:"Mobile", placeholder:"+971 50 xxx xxxx" },
                { key:"whatsapp", label:"WhatsApp", placeholder:"+971 50 xxx xxxx" },
                { key:"email", label:"Email", placeholder:"john@example.com" },
                { key:"linkedinUrl", label:"LinkedIn URL", placeholder:"https://linkedin.com/in/..." },
                { key:"city", label:"City", placeholder:"Dubai" },
                { key:"industry", label:"Industry", placeholder:"Real Estate" },
                { key:"experience", label:"Experience", placeholder:"5 years" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">{label}</label>
                  <input value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    data-testid={`input-candidate-${key}`} />
                </div>
              ))}
              {[
                { key:"source", label:"Source", options: SOURCES },
                { key:"partnerType", label:"Partner Type", options: PARTNER_TYPES },
                { key:"status", label:"Status", options: STATUSES.map(s => ({ value:s, label:STATUS_LABELS[s] })) },
                { key:"country", label:"Country", options: ["UAE","KSA","UK","India","Pakistan","Philippines","Other"] },
              ].map(({ key, label, options }) => (
                <div key={key}>
                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">{label}</label>
                  <select value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    data-testid={`select-candidate-${key}`}>
                    {options.map((o: any) => typeof o === "string"
                      ? <option key={o} value={o}>{o}</option>
                      : <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              ))}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Recruiter Notes</label>
                <textarea value={form.recruiterNotes} onChange={e => setForm(f => ({ ...f, recruiterNotes: e.target.value }))}
                  rows={3} placeholder="Internal notes..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  data-testid="input-candidate-notes" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-black text-sm transition-colors disabled:opacity-50"
                data-testid="btn-save-candidate">
                <Check className="w-4 h-4" /> {editId ? "Save Changes" : "Add Candidate"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-black text-sm transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone…"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
              data-testid="input-search-candidates" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            data-testid="select-filter-status">
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            data-testid="select-filter-type">
            <option value="">All Types</option>
            {PARTNER_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g," ")}</option>)}
          </select>
        </div>

        {/* Pipeline counts */}
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => {
            const cnt = candidates.filter(c => c.status === s).length;
            if (cnt === 0) return null;
            return (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${filterStatus === s ? STATUS_COLORS[s] + " border-current" : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"}`}>
                {STATUS_LABELS[s]} · {cnt}
              </button>
            );
          })}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-16 text-slate-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
            <UserPlus className="w-8 h-8 mx-auto mb-3 text-slate-700" />
            <p className="font-black">No candidates yet</p>
            <p className="text-sm mt-1">Add LinkedIn applicants to start your pipeline</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(c => (
              <div key={c.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-4 flex-wrap hover:border-slate-700 transition-all"
                data-testid={`row-candidate-${c.id}`}>
                <div className="flex-1 min-w-48">
                  <div className="font-black text-white">{c.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.email || c.mobile || "—"}</div>
                  {c.linkedinUrl && <a href={c.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-0.5 block truncate max-w-xs">LinkedIn ↗</a>}
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${STATUS_COLORS[c.status] || "bg-slate-700 text-slate-200"}`}>{STATUS_LABELS[c.status] || c.status}</span>
                  <span className="text-[10px] text-slate-500 text-center">{c.partnerType.replace(/_/g," ")}</span>
                </div>
                <div className="text-xs text-slate-500">{c.source} · {c.country}</div>
                <div className="flex items-center gap-2 ml-auto">
                  {/* Quick status update */}
                  <select value={c.status}
                    onChange={e => updateMutation.mutate({ id: c.id, data: { status: e.target.value } })}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-500"
                    data-testid={`select-status-${c.id}`}>
                    {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                  {(c.whatsapp || c.mobile) && (
                    <a href={waLink(c)} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-700/40 hover:border-emerald-500 text-emerald-400 transition-all"
                      title="Send WhatsApp" data-testid={`btn-wa-${c.id}`}>
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  )}
                  <button onClick={() => startEdit(c)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all" data-testid={`btn-edit-${c.id}`}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => { if (confirm("Delete this candidate?")) deleteMutation.mutate(c.id); }}
                    className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-all"
                    data-testid={`btn-delete-${c.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
