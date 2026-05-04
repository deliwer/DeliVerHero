import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, Trash2, Copy, QrCode, ExternalLink, Users, ChevronLeft, X, Check } from "lucide-react";

type Referrer = { id: string; name: string; whatsapp: string; refId: string; createdAt: string };

export default function CaptureReferrers() {
  const [showForm, setShowForm] = useState(false);
  const [qrModal, setQrModal] = useState<{ refId: string; qr: string; url: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", whatsapp: "", refId: "" });

  const { data: referrers = [], isLoading } = useQuery<Referrer[]>({
    queryKey: ["/api/tenant-capture/referrers"],
  });

  const createMutation = useMutation({
    mutationFn: (body: typeof form) => apiRequest("POST", "/api/tenant-capture/referrers", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenant-capture/referrers"] });
      setShowForm(false);
      setForm({ name: "", whatsapp: "", refId: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/tenant-capture/referrers/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/tenant-capture/referrers"] }),
  });

  const loadQr = async (refId: string) => {
    const res = await fetch(`/api/tenant-capture/referrers/${refId}/qr`);
    const data = await res.json();
    setQrModal({ refId, ...data });
  };

  const copyLink = (refId: string) => {
    const url = `${window.location.origin}/capture?ref=${refId}`;
    navigator.clipboard.writeText(url);
    setCopied(refId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <a href="/capture-admin" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </a>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900">Referrer Management</h1>
            <p className="text-gray-500 text-sm">Create and manage referral links for guards, brokers & tenants</p>
          </div>
          <button
            data-testid="button-add-referrer"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition"
          >
            <Plus className="w-4 h-4" /> Add Referrer
          </button>
        </div>

        {/* Add Referrer Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-emerald-200 p-5 mb-5 animate-in fade-in slide-in-from-top-2 duration-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" /> New Referrer
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Name *</label>
                <input
                  type="text"
                  data-testid="input-referrer-name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ahmed (Building Guard)"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">WhatsApp Number *</label>
                <input
                  type="tel"
                  data-testid="input-referrer-whatsapp"
                  value={form.whatsapp}
                  onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                  placeholder="+971 50 000 0000"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                  Ref ID <span className="text-gray-400 font-normal normal-case">(auto if blank)</span>
                </label>
                <input
                  type="text"
                  data-testid="input-referrer-refid"
                  value={form.refId}
                  onChange={e => setForm(f => ({ ...f, refId: e.target.value.toUpperCase() }))}
                  placeholder="DXB123"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-400 font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                data-testid="button-create-referrer"
                onClick={() => createMutation.mutate(form)}
                disabled={!form.name.trim() || !form.whatsapp.trim() || createMutation.isPending}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-xl text-sm font-bold transition flex items-center gap-2"
              >
                {createMutation.isPending ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                Create Referrer
              </button>
            </div>
          </div>
        )}

        {/* Sample note */}
        {referrers.length === 0 && !isLoading && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-800">Get started with a referrer</p>
              <p className="text-xs text-blue-600 mt-0.5">Add building guards, brokers or existing tenants. Each gets a unique QR code and referral link to share.</p>
            </div>
          </div>
        )}

        {/* Referrers list */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {referrers.map(ref => (
              <div key={ref.id} data-testid={`referrer-card-${ref.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 flex-wrap hover:shadow-sm transition">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center font-black text-emerald-700 text-sm flex-shrink-0">
                  {ref.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <span className="font-mono text-[11px] font-black bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ref.refId}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{ref.whatsapp}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">
                    {window.location.origin}/capture?ref={ref.refId}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    data-testid={`button-copy-${ref.id}`}
                    onClick={() => copyLink(ref.refId)}
                    title="Copy referral link"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition ${copied === ref.refId ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"}`}
                  >
                    {copied === ref.refId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === ref.refId ? "Copied" : "Copy"}
                  </button>
                  <button
                    data-testid={`button-qr-${ref.id}`}
                    onClick={() => loadQr(ref.refId)}
                    title="View QR code"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-gray-400 transition bg-white"
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR
                  </button>
                  <a
                    href={`/capture?ref=${ref.refId}`}
                    target="_blank" rel="noopener noreferrer"
                    data-testid={`button-preview-${ref.id}`}
                    title="Preview link"
                    className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400 transition bg-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    data-testid={`button-delete-${ref.id}`}
                    onClick={() => { if (confirm(`Delete referrer "${ref.name}"?`)) deleteMutation.mutate(ref.id); }}
                    className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition bg-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setQrModal(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900">QR Code — {qrModal.refId}</h3>
              <button onClick={() => setQrModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <img src={qrModal.qr} alt="QR Code" className="w-56 h-56 rounded-xl border border-gray-100" />
            </div>
            <p className="text-xs text-gray-500 text-center font-mono mb-4 break-all">{qrModal.url}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { navigator.clipboard.writeText(qrModal.url); setCopied("qr"); setTimeout(() => setCopied(null), 2000); }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                {copied === "qr" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied === "qr" ? "Copied!" : "Copy URL"}
              </button>
              <a
                href={qrModal.qr}
                download={`deliwer-ref-${qrModal.refId}.png`}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" /> Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
