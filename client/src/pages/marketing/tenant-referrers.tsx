import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { Plus, Trash2, Copy, QrCode, ExternalLink, Users, ChevronLeft, X, Check, Link2 } from "lucide-react";
import { Link } from "wouter";

type Referrer = { id: string; name: string; whatsapp: string; refId: string; createdAt: string };

export default function MarketingTenantReferrers() {
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
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/marketing/tenant-leads">
            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black">Referrer Management</h1>
            <p className="text-gray-500 text-sm">Guards, brokers &amp; tenants — each gets a unique QR + link</p>
          </div>
          <button
            data-testid="button-add-referrer"
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-sm font-black transition"
          >
            <Plus className="w-4 h-4" /> Add Referrer
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-5 animate-in fade-in slide-in-from-top-2 duration-200">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> New Referrer
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">Name *</label>
                <input
                  type="text"
                  data-testid="input-referrer-name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ahmed (Building Guard)"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">WhatsApp *</label>
                <input
                  type="tel"
                  data-testid="input-referrer-whatsapp"
                  value={form.whatsapp}
                  onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                  placeholder="+971 50 000 0000"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 block">
                  Ref ID <span className="text-gray-600 normal-case font-normal">(auto if blank)</span>
                </label>
                <input
                  type="text"
                  data-testid="input-referrer-refid"
                  value={form.refId}
                  onChange={e => setForm(f => ({ ...f, refId: e.target.value.toUpperCase() }))}
                  placeholder="DXB123"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition">
                Cancel
              </button>
              <button
                data-testid="button-create-referrer"
                onClick={() => createMutation.mutate(form)}
                disabled={!form.name.trim() || !form.whatsapp.trim() || createMutation.isPending}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black rounded-lg text-sm font-black transition flex items-center gap-2"
              >
                {createMutation.isPending
                  ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  : <Check className="w-4 h-4" />}
                Create
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && referrers.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-3">
            <Users className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Add your first referrer</p>
              <p className="text-xs text-gray-500 mt-0.5">Each referrer (guard, broker, tenant) gets a personalised link and QR code. Leads they send are tagged with their ID automatically.</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        )}

        {/* Referrers list */}
        <div className="flex flex-col gap-2">
          {referrers.map(ref => (
            <div key={ref.id} data-testid={`referrer-card-${ref.id}`}
              className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 flex items-center gap-4 flex-wrap transition">
              <div className="w-9 h-9 bg-emerald-500/20 rounded-lg flex items-center justify-center font-black text-emerald-300 text-sm flex-shrink-0">
                {ref.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-white">{ref.name}</p>
                  <span className="font-mono text-[11px] font-black bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full">{ref.refId}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{ref.whatsapp}</p>
                <p className="text-[11px] text-gray-600 font-mono mt-0.5 truncate">
                  {typeof window !== "undefined" ? window.location.origin : ""}/capture?ref={ref.refId}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  data-testid={`button-copy-${ref.id}`}
                  onClick={() => copyLink(ref.refId)}
                  title="Copy referral link"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition ${copied === ref.refId ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}
                >
                  {copied === ref.refId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === ref.refId ? "Copied" : "Copy"}
                </button>
                <button
                  data-testid={`button-qr-${ref.id}`}
                  onClick={() => loadQr(ref.refId)}
                  title="View QR code"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:border-white/20 transition"
                >
                  <QrCode className="w-3.5 h-3.5" /> QR
                </button>
                <a
                  href={`/capture?ref=${ref.refId}`}
                  target="_blank" rel="noopener noreferrer"
                  data-testid={`button-preview-${ref.id}`}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  data-testid={`button-delete-${ref.id}`}
                  onClick={() => { if (confirm(`Delete referrer "${ref.name}"?`)) deleteMutation.mutate(ref.id); }}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setQrModal(null)}>
          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-white">QR Code</h3>
                <p className="text-xs text-gray-500 font-mono">{qrModal.refId}</p>
              </div>
              <button onClick={() => setQrModal(null)} className="p-1.5 rounded-lg hover:bg-white/10 transition">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex justify-center mb-4 p-4 bg-white rounded-xl">
              <img src={qrModal.qr} alt="QR Code" className="w-52 h-52" />
            </div>
            <p className="text-[11px] text-gray-600 text-center font-mono mb-4 break-all">{qrModal.url}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { navigator.clipboard.writeText(qrModal.url); setCopied("qr"); setTimeout(() => setCopied(null), 2000); }}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold text-gray-300 transition flex items-center justify-center gap-2"
              >
                {copied === "qr" ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
                {copied === "qr" ? "Copied!" : "Copy URL"}
              </button>
              <a
                href={qrModal.qr}
                download={`deliwer-ref-${qrModal.refId}.png`}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-black transition flex items-center justify-center gap-2"
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
