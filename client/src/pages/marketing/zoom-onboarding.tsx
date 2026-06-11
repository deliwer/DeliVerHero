import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { Video, Plus, Check, X, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";

type Candidate = { id: string; name: string; status: string; partnerType: string; };
type ZoomSession = {
  id: string; candidateId: string; zoomDate: string; zoomLink: string | null;
  attendanceStatus: string; trainingTopics: string[]; notes: string | null;
  activationRecommendation: boolean; trainingType: string; brokerCategory: string | null; createdAt: string;
};

const ATTENDANCE = ["scheduled","attended","missed","rescheduled"];
const ATTENDANCE_COLORS: Record<string,string> = {
  scheduled:"bg-amber-900/50 text-amber-300", attended:"bg-emerald-900/50 text-emerald-300",
  missed:"bg-red-900/40 text-red-400", rescheduled:"bg-blue-900/50 text-blue-300"
};
const TRAINING_TOPICS = ["DeliWer Platform","Finance Opportunities","Customer Acquisition","Referral Process","Commission Structure","Client Qualification","Funding Opportunities"];
const PARTNER_TYPES = ["UNVERIFIED_PARTNER","REAL_ESTATE_BROKER","FINANCE_BROKER","PHONE_FLIPPER","FREIGHT_BROKER","HOME_SERVICE_PARTNER","BUSINESS_INTRODUCER"];

const EMPTY_FORM = { candidateId:"", zoomDate:"", zoomLink:"", attendanceStatus:"scheduled", trainingTopics:[] as string[], notes:"", activationRecommendation:false, trainingType:"general", brokerCategory:"" };

export default function ZoomOnboardingPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: candidates = [] } = useQuery<Candidate[]>({ queryKey: ["/api/bnos/candidates"] });
  const { data: sessions = [], isLoading } = useQuery<ZoomSession[]>({ queryKey: ["/api/bnos/zoom"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof EMPTY_FORM) => apiRequest("POST", "/api/bnos/zoom", data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/zoom"] }); queryClient.invalidateQueries({ queryKey: ["/api/bnos/candidates"] }); setShowForm(false); setForm({ ...EMPTY_FORM }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof EMPTY_FORM> }) => apiRequest("PATCH", `/api/bnos/zoom/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/bnos/zoom"] }); queryClient.invalidateQueries({ queryKey: ["/api/bnos/candidates"] }); setEditId(null); setShowForm(false); },
  });

  const getCandidateName = (id: string) => candidates.find(c => c.id === id)?.name || id;

  const toggleTopic = (topic: string) =>
    setForm(f => ({ ...f, trainingTopics: f.trainingTopics.includes(topic) ? f.trainingTopics.filter(t => t !== topic) : [...f.trainingTopics, topic] }));

  const handleSubmit = () => {
    if (!form.candidateId || !form.zoomDate) return;
    if (editId) { updateMutation.mutate({ id: editId, data: form }); }
    else { createMutation.mutate(form); }
  };

  const startEdit = (s: ZoomSession) => {
    setEditId(s.id);
    setForm({ candidateId: s.candidateId, zoomDate: s.zoomDate.slice(0,16), zoomLink: s.zoomLink||"", attendanceStatus: s.attendanceStatus, trainingTopics: s.trainingTopics||[], notes: s.notes||"", activationRecommendation: s.activationRecommendation, trainingType: s.trainingType, brokerCategory: s.brokerCategory||"" });
    setShowForm(true);
  };

  const eligibleCandidates = candidates.filter(c => !["activated","rejected"].includes(c.status));

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2"><Video className="w-6 h-6 text-blue-400" /> Zoom Onboarding</h1>
            <p className="text-slate-400 text-sm mt-1">Schedule and track onboarding sessions for partner candidates</p>
          </div>
          <button onClick={() => { setEditId(null); setForm({ ...EMPTY_FORM }); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm transition-colors"
            data-testid="btn-schedule-zoom">
            <Plus className="w-4 h-4" /> Schedule Session
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-blue-400">{editId ? "Edit Session" : "Schedule Zoom Session"}</h2>
              <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Candidate *</label>
                <select value={form.candidateId} onChange={e => setForm(f => ({ ...f, candidateId: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  data-testid="select-zoom-candidate">
                  <option value="">Select candidate…</option>
                  {eligibleCandidates.map(c => <option key={c.id} value={c.id}>{c.name} · {c.partnerType.replace(/_/g," ")}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Zoom Date & Time *</label>
                <input type="datetime-local" value={form.zoomDate} onChange={e => setForm(f => ({ ...f, zoomDate: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  data-testid="input-zoom-date" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Zoom Link</label>
                <input value={form.zoomLink} onChange={e => setForm(f => ({ ...f, zoomLink: e.target.value }))}
                  placeholder="https://zoom.us/j/..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  data-testid="input-zoom-link" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Attendance Status</label>
                <select value={form.attendanceStatus} onChange={e => setForm(f => ({ ...f, attendanceStatus: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  data-testid="select-attendance-status">
                  {ATTENDANCE.map(a => <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Training Type</label>
                <select value={form.trainingType} onChange={e => setForm(f => ({ ...f, trainingType: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {["general","real_estate","finance","phone_flipper","freight","home_service"].map(t => <option key={t} value={t}>{t.replace(/_/g," ")}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Broker Category</label>
                <select value={form.brokerCategory} onChange={e => setForm(f => ({ ...f, brokerCategory: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Select…</option>
                  {PARTNER_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g," ")}</option>)}
                </select>
              </div>
            </div>
            {/* Training Topics */}
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Training Topics Covered</label>
              <div className="flex flex-wrap gap-2">
                {TRAINING_TOPICS.map(topic => (
                  <button key={topic} onClick={() => toggleTopic(topic)} type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${form.trainingTopics.includes(topic) ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`}
                    data-testid={`btn-topic-${topic.replace(/ /g,"-").toLowerCase()}`}>
                    {form.trainingTopics.includes(topic) && <Check className="w-3 h-3 inline mr-1" />}{topic}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3} placeholder="Session notes, observations…"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setForm(f => ({ ...f, activationRecommendation: !f.activationRecommendation }))} type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black border transition-all ${form.activationRecommendation ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                data-testid="btn-activation-recommendation">
                <CheckCircle2 className="w-4 h-4" /> Recommend for Activation
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm transition-colors disabled:opacity-50"
                data-testid="btn-save-zoom">
                <Check className="w-4 h-4" /> {editId ? "Update Session" : "Schedule Session"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-black text-sm transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {/* Sessions List */}
        {isLoading ? (
          <div className="text-center py-16 text-slate-500">Loading…</div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
            <Video className="w-8 h-8 mx-auto mb-3 text-slate-700" />
            <p className="font-black">No sessions scheduled yet</p>
            <p className="text-sm mt-1">Schedule your first Zoom onboarding session above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden" data-testid={`row-zoom-${s.id}`}>
                <div className="p-4 flex items-center gap-4 flex-wrap cursor-pointer hover:bg-slate-900/80 transition-all" onClick={() => setExpandedSession(expandedSession === s.id ? null : s.id)}>
                  <div className="flex-1 min-w-48">
                    <div className="font-black">{getCandidateName(s.candidateId)}</div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(s.zoomDate).toLocaleString("en-GB", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${ATTENDANCE_COLORS[s.attendanceStatus] || "bg-slate-700 text-slate-300"}`}>
                    {s.attendanceStatus.charAt(0).toUpperCase() + s.attendanceStatus.slice(1)}
                  </span>
                  {s.activationRecommendation && <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-900/50 text-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Activate</span>}
                  <div className="flex gap-2 ml-auto">
                    {s.zoomLink && <a href={s.zoomLink} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-blue-900/40 border border-blue-700/40 text-blue-300 rounded-lg hover:border-blue-500 transition-all" onClick={e => e.stopPropagation()}>Join Zoom ↗</a>}
                    <button onClick={(e) => { e.stopPropagation(); startEdit(s); }} className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all"><Video className="w-4 h-4" /></button>
                  </div>
                </div>
                {expandedSession === s.id && (
                  <div className="border-t border-slate-800 p-4 bg-slate-950/40">
                    {s.trainingTopics?.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Topics Covered</div>
                        <div className="flex flex-wrap gap-2">{s.trainingTopics.map(t => <span key={t} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">{t}</span>)}</div>
                      </div>
                    )}
                    {s.notes && <p className="text-sm text-slate-400">{s.notes}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
