import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { BookOpen, Plus, Pencil, Trash2, Copy, Check, X, ChevronDown } from "lucide-react";

type BnosTemplate = {
  id: string; category: string; name: string; subject: string | null;
  body: string; variables: string[]; isDefault: boolean; createdAt: string;
};

const CATEGORIES = ["recruitment","interview","zoom_invite","activation","finance_intro","follow_up","reactivation","lead_distribution"];
const CAT_LABELS: Record<string,string> = {
  recruitment:"Recruitment", interview:"Interview", zoom_invite:"Zoom Invite",
  activation:"Activation", finance_intro:"Finance Intro", follow_up:"Follow Up",
  reactivation:"Reactivation", lead_distribution:"Lead Distribution"
};
const CAT_COLORS: Record<string,string> = {
  recruitment:"emerald", interview:"blue", zoom_invite:"purple", activation:"green",
  finance_intro:"amber", follow_up:"cyan", reactivation:"rose", lead_distribution:"indigo"
};

const EMPTY = { category:"recruitment", name:"", subject:"", body:"", variables:[] as string[], isDefault:false };

export default function TemplatesPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("");
  const [copied, setCopied] = useState("");
  const [varInput, setVarInput] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: templates = [], isLoading } = useQuery<BnosTemplate[]>({ queryKey: ["/api/bnos/templates"] });

  const seedMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/bnos/templates/seed"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/bnos/templates"] }),
  });

  useEffect(() => { if (templates.length === 0 && !isLoading) seedMutation.mutate(); }, [templates.length, isLoading]);

  const createMutation = useMutation({
    mutationFn: (d: typeof EMPTY) => apiRequest("POST", "/api/bnos/templates", d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/templates"] }); setShowForm(false); setForm({ ...EMPTY }); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof EMPTY> }) => apiRequest("PATCH", `/api/bnos/templates/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/templates"] }); setEditId(null); setShowForm(false); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/bnos/templates/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/bnos/templates"] }),
  });

  const copyBody = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(id); setTimeout(() => setCopied(""), 2000); });
  };

  const addVar = () => {
    const v = varInput.trim();
    if (v && !form.variables.includes(v)) { setForm(f => ({ ...f, variables: [...f.variables, v] })); }
    setVarInput("");
  };

  const startEdit = (t: BnosTemplate) => {
    setEditId(t.id); setForm({ category:t.category, name:t.name, subject:t.subject||"", body:t.body, variables:t.variables||[], isDefault:t.isDefault });
    setShowForm(true);
  };

  const filtered = templates.filter(t => !filterCat || t.category === filterCat);

  // Highlight {Variable} syntax in body
  const highlightVars = (text: string) =>
    text.replace(/\{(\w+)\}/g, '<span class="text-amber-400 font-black">{$1}</span>');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2"><BookOpen className="w-6 h-6 text-purple-400" /> Message Templates</h1>
            <p className="text-slate-400 text-sm mt-1">Editable templates for all broker communication categories</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => seedMutation.mutate()} disabled={seedMutation.isPending}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-black text-sm transition-colors text-slate-300"
              data-testid="btn-seed">
              {seedMutation.isPending ? "Seeding…" : "Load Defaults"}
            </button>
            <button onClick={() => { setEditId(null); setForm({ ...EMPTY }); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-sm transition-colors"
              data-testid="btn-add-template">
              <Plus className="w-4 h-4" /> New Template
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterCat("")} className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${!filterCat ? "bg-purple-900/50 text-purple-300 border-purple-700/50" : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"}`}>All</button>
          {CATEGORIES.map(cat => {
            const cnt = templates.filter(t => t.category === cat).length;
            if (cnt === 0) return null;
            const c = CAT_COLORS[cat];
            return (
              <button key={cat} onClick={() => setFilterCat(filterCat === cat ? "" : cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${filterCat === cat ? `bg-${c}-900/50 text-${c}-300 border-${c}-700/50` : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"}`}
                data-testid={`filter-cat-${cat}`}>
                {CAT_LABELS[cat]} · {cnt}
              </button>
            );
          })}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-purple-400">{editId ? "Edit Template" : "New Template"}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" data-testid="select-tpl-category">
                  {CATEGORIES.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Template Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Initial Outreach"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" data-testid="input-tpl-name" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Subject (optional)</label>
                <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Email subject line"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" data-testid="input-tpl-subject" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Body * <span className="text-amber-400/70 normal-case text-[10px]">Use {"{VariableName}"} for dynamic fields</span></label>
                <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  rows={8} placeholder="Message body…"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none font-mono"
                  data-testid="textarea-tpl-body" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Variables</label>
                <div className="flex gap-2 mb-2">
                  <input value={varInput} onChange={e => setVarInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addVar()}
                    placeholder="e.g. BrokerName" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
                  <button onClick={addVar} className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-sm font-black transition-colors">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.variables.map(v => (
                    <span key={v} className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-900/40 border border-amber-700/40 rounded-lg text-xs text-amber-300">
                      {"{"}
                      {v}
                      {"}"}
                      <button onClick={() => setForm(f => ({ ...f, variables: f.variables.filter(x => x !== v) }))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { if (!form.name || !form.body) return; editId ? updateMutation.mutate({ id: editId, data: form }) : createMutation.mutate(form); }}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-sm transition-colors disabled:opacity-50"
                data-testid="btn-save-template">
                <Check className="w-4 h-4" /> {editId ? "Save Changes" : "Create Template"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-black text-sm transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {/* Template Cards */}
        {isLoading ? (
          <div className="text-center py-16 text-slate-500">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(t => {
              const c = CAT_COLORS[t.category] || "purple";
              return (
                <div key={t.id} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all" data-testid={`card-template-${t.id}`}>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-${c}-900/50 text-${c}-400 mb-2`}>{CAT_LABELS[t.category]}</span>
                        <div className="font-black text-white">{t.name}</div>
                        {t.subject && <div className="text-xs text-slate-400 mt-0.5">{t.subject}</div>}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button onClick={() => copyBody(t.body, t.id)}
                          className={`p-2 rounded-lg border transition-all ${copied === t.id ? "bg-emerald-900/40 border-emerald-700/50 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`}
                          title="Copy body" data-testid={`btn-copy-${t.id}`}>
                          {copied === t.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => startEdit(t)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all" data-testid={`btn-edit-tpl-${t.id}`}><Pencil className="w-3.5 h-3.5" /></button>
                        {!t.isDefault && <button onClick={() => { if (confirm("Delete template?")) deleteMutation.mutate(t.id); }} className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-all" data-testid={`btn-del-tpl-${t.id}`}><Trash2 className="w-3.5 h-3.5" /></button>}
                      </div>
                    </div>
                    {t.variables?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {t.variables.map(v => <span key={v} className="px-2 py-0.5 bg-amber-900/30 text-amber-400 rounded text-[10px] font-black">{"{" + v + "}"}</span>)}
                      </div>
                    )}
                    <button onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors" data-testid={`btn-expand-${t.id}`}>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedId === t.id ? "rotate-180" : ""}`} />
                      {expandedId === t.id ? "Hide" : "Preview"}
                    </button>
                    {expandedId === t.id && (
                      <div className="mt-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 font-mono whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: highlightVars(t.body) }} />
                    )}
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
