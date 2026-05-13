import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Lock, Shield, CheckCircle2, XCircle, Clock, Play, Star,
  Calendar, Phone, MapPin, TrendingUp, MessageCircle, Eye,
  RefreshCw, LogOut, ChevronDown, ChevronUp, ThumbsUp,
  Building2, BarChart2, Users, AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ── Config ─────────────────────────────────────────────────────────────────────

const ADMIN_TOKEN = "deliwer-admin-2026";

function adminFetch(url: string, token: string) {
  return fetch(url, { headers: { "x-admin-token": token } }).then(r => {
    if (!r.ok) throw new Error("Unauthorized");
    return r.json();
  });
}

function adminMutate(method: string, url: string, token: string, body?: object) {
  return fetch(url, {
    method,
    headers: { "x-admin-token": token, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).then(r => {
    if (!r.ok) throw new Error("Request failed");
    return r.json();
  });
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function fmtDate(d?: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-AE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    filled: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    cancelled: "bg-gray-700/60 text-gray-400 border-white/10",
    verified: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    unverified: "bg-gray-700/60 text-gray-400 border-white/10",
  };
  const cls = map[status] || "bg-slate-700 text-gray-400 border-white/10";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wide ${cls}`}>
      {status}
    </span>
  );
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= value ? "text-amber-400 fill-current" : "text-gray-700"}`} />
      ))}
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────────

type Tab = "overview" | "listings" | "viewings" | "reviews";

// ── Main Component ─────────────────────────────────────────────────────────────

export default function FlexRentalsAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [token, setToken] = useState(() => localStorage.getItem("flex_admin_token") || "");
  const [tokenInput, setTokenInput] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const authed = !!token;

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (tokenInput.trim() === ADMIN_TOKEN) {
      localStorage.setItem("flex_admin_token", tokenInput.trim());
      setToken(tokenInput.trim());
      toast({ title: "Access granted ✅" });
    } else {
      toast({ title: "Invalid token", variant: "destructive" });
    }
  }

  function logout() {
    localStorage.removeItem("flex_admin_token");
    setToken("");
  }

  // ── Queries ────────────────────────────────────────────────────────────────

  const statsQ = useQuery({
    queryKey: ["/api/flex-listings/admin/stats", token],
    queryFn: () => adminFetch("/api/flex-listings/admin/stats", token),
    enabled: authed,
    staleTime: 30_000,
  });

  const listingsQ = useQuery({
    queryKey: ["/api/flex-listings/admin/listings", token],
    queryFn: () => adminFetch("/api/flex-listings/admin/listings", token),
    enabled: authed && (tab === "listings" || tab === "overview"),
    staleTime: 15_000,
  });

  const viewingsQ = useQuery({
    queryKey: ["/api/flex-listings/admin/viewings", token],
    queryFn: () => adminFetch("/api/flex-listings/admin/viewings", token),
    enabled: authed && (tab === "viewings" || tab === "overview"),
    staleTime: 15_000,
  });

  const reviewsQ = useQuery({
    queryKey: ["/api/flex-listings/admin/reviews", token],
    queryFn: () => adminFetch("/api/flex-listings/admin/reviews", token),
    enabled: authed && tab === "reviews",
    staleTime: 15_000,
  });

  // ── Mutations ──────────────────────────────────────────────────────────────

  const listingStatusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminMutate("PATCH", `/api/flex-listings/${id}/status`, token, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/admin/listings"] });
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/admin/stats"] });
      toast({ title: "Listing updated ✅" });
    },
    onError: () => toast({ title: "Update failed", variant: "destructive" }),
  });

  const viewingStatusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminMutate("PATCH", `/api/flex-listings/viewing-requests/${id}/status`, token, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/admin/viewings"] });
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/admin/stats"] });
      toast({ title: "Viewing request updated ✅" });
    },
    onError: () => toast({ title: "Update failed", variant: "destructive" }),
  });

  const reviewVerifyMut = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      adminMutate("PATCH", `/api/flex-listings/reviews/${id}/verify`, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/admin/reviews"] });
      toast({ title: "Review verified ✅" });
    },
    onError: () => toast({ title: "Update failed", variant: "destructive" }),
  });

  // ── Login Gate ─────────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#060810] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-white font-black text-xl mb-1">Flex Rentals Admin</h1>
            <p className="text-gray-600 text-sm">Founder access only</p>
          </div>
          <form onSubmit={login} className="space-y-3">
            <input
              type="password"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              placeholder="Admin token"
              autoFocus
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-700 outline-none transition-colors"
            />
            <button type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold py-3 rounded-xl transition-all">
              Unlock
            </button>
          </form>
          <p className="text-center text-gray-800 text-xs mt-6">
            <a href="/marketing" className="hover:text-gray-600 transition-colors">← Back to Marketing Hub</a>
          </p>
        </div>
      </div>
    );
  }

  // ── Data ───────────────────────────────────────────────────────────────────

  const stats = statsQ.data || {};
  const allListings: any[] = listingsQ.data?.listings || [];
  const allViewings: any[] = viewingsQ.data?.requests || [];
  const allReviews: any[] = reviewsQ.data?.reviews || [];

  const pendingListings = allListings.filter(l => l.status === "pending");
  const pendingViewings = allViewings.filter(v => v.status === "pending");

  const inputCls = "bg-black/30 border border-white/8 rounded-lg px-3 py-1.5 text-white text-xs outline-none";

  // ── Tabs Config ────────────────────────────────────────────────────────────

  const TABS: { id: Tab; label: string; count?: number; dot?: boolean }[] = [
    { id: "overview", label: "Overview" },
    { id: "listings", label: "Listings", count: pendingListings.length, dot: pendingListings.length > 0 },
    { id: "viewings", label: "Viewings", count: pendingViewings.length, dot: pendingViewings.length > 0 },
    { id: "reviews", label: "Reviews", count: allReviews.length },
  ];

  return (
    <div className="min-h-screen bg-[#060810] text-white">
      {/* Header */}
      <div className="bg-[#0a0d14] border-b border-white/8 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Flex Rentals Admin</p>
              <p className="text-gray-600 text-[10px] mt-0.5">Founder Command · Private</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { statsQ.refetch(); listingsQ.refetch(); viewingsQ.refetch(); }}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 border border-white/8 hover:border-white/15 px-3 py-1.5 rounded-lg transition-all">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
            <a href="/marketing" className="text-xs text-gray-600 hover:text-gray-400 border border-white/8 hover:border-white/15 px-3 py-1.5 rounded-lg transition-all">
              Marketing Hub
            </a>
            <button onClick={logout}
              className="flex items-center gap-1.5 text-xs text-red-400 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-all">
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#0a0d14] border-b border-white/6">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto pb-px">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${tab === t.id ? "text-white border-emerald-400" : "text-gray-600 border-transparent hover:text-gray-400"}`}>
              {t.label}
              {t.dot && t.count! > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-[9px] font-black text-black flex items-center justify-center shrink-0">
                  {t.count}
                </span>
              )}
              {!t.dot && t.count !== undefined && t.count > 0 && (
                <span className="text-[9px] text-gray-600 font-normal">({t.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Pending Listings", value: stats.pendingListings ?? pendingListings.length, icon: <Clock className="w-4 h-4" />, color: "text-amber-400", alert: true },
                { label: "Active Listings", value: stats.activeListings ?? allListings.filter(l => l.status === "active").length, icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-400", alert: false },
                { label: "Pending Viewings", value: stats.pendingViewings ?? pendingViewings.length, icon: <Calendar className="w-4 h-4" />, color: "text-blue-400", alert: pendingViewings.length > 0 },
                { label: "Total Reviews", value: stats.totalReviews ?? allReviews.length, icon: <Star className="w-4 h-4" />, color: "text-purple-400", alert: false },
              ].map(s => (
                <div key={s.label} className={`bg-[#0a0d14] border rounded-xl p-4 ${s.alert && (typeof s.value === "number" && s.value > 0) ? "border-amber-500/25" : "border-white/8"}`}>
                  <div className={`${s.color} mb-2`}>{s.icon}</div>
                  <p className={`text-2xl font-black ${s.color}`}>{s.value ?? "—"}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Pending listings quick review */}
            {pendingListings.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-bold text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" /> Awaiting Approval ({pendingListings.length})
                  </p>
                  <button onClick={() => setTab("listings")} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all →</button>
                </div>
                <div className="space-y-2">
                  {pendingListings.slice(0, 3).map(l => (
                    <div key={l.id} className="bg-[#0a0d14] border border-amber-500/15 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{l.title}</p>
                        <p className="text-gray-500 text-xs">{l.area} · AED {l.monthlyPrice?.toLocaleString()}/mo · {l.managerName}</p>
                        {l.youtubeUrl && <p className="text-red-400 text-[10px] flex items-center gap-1 mt-0.5"><Play className="w-2.5 h-2.5 fill-current" /> Video tour included</p>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => listingStatusMut.mutate({ id: l.id, status: "active" })}
                          className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-500/25 transition-all">
                          <CheckCircle2 className="w-3 h-3" /> Approve
                        </button>
                        <button onClick={() => listingStatusMut.mutate({ id: l.id, status: "filled" })}
                          className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                          <XCircle className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending viewings quick review */}
            {pendingViewings.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-bold text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" /> Pending Viewings ({pendingViewings.length})
                  </p>
                  <button onClick={() => setTab("viewings")} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all →</button>
                </div>
                <div className="space-y-2">
                  {pendingViewings.slice(0, 3).map(v => (
                    <div key={v.id} className="bg-[#0a0d14] border border-blue-500/15 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm">{v.requesterName}</p>
                        <p className="text-gray-500 text-xs truncate">{v.listingTitle} · {v.preferredDate || "Flexible"}</p>
                        <a href={`https://wa.me/${v.requesterPhone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                          className="text-[#25D366] text-[11px] flex items-center gap-1 mt-0.5 hover:underline">
                          <MessageCircle className="w-3 h-3" /> {v.requesterPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => viewingStatusMut.mutate({ id: v.id, status: "confirmed" })}
                          className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-500/25 transition-all">
                          <CheckCircle2 className="w-3 h-3" /> Confirm
                        </button>
                        <button onClick={() => viewingStatusMut.mutate({ id: v.id, status: "cancelled" })}
                          className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                          <XCircle className="w-3 h-3" /> Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pendingListings.length === 0 && pendingViewings.length === 0 && (
              <div className="text-center py-12 bg-[#0a0d14] border border-white/6 rounded-2xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <p className="text-white font-bold text-sm">All clear!</p>
                <p className="text-gray-600 text-xs mt-1">No pending listings or viewings to action.</p>
              </div>
            )}
          </div>
        )}

        {/* ── LISTINGS ──────────────────────────────────────────────────── */}
        {tab === "listings" && (
          <div className="space-y-3">
            {listingsQ.isLoading ? (
              <div className="text-center py-12"><span className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin inline-block" /></div>
            ) : allListings.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No listings submitted yet.</div>
            ) : allListings.map(l => (
              <div key={l.id} className={`bg-[#0a0d14] border rounded-2xl overflow-hidden transition-all ${l.status === "pending" ? "border-amber-500/20" : "border-white/8"}`}>
                {/* Header row */}
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusPill status={l.status} />
                      <span className="text-[10px] text-gray-600 font-mono">{l.id.slice(0, 12)}…</span>
                      {l.youtubeUrl && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded px-1.5 py-0.5">
                          <Play className="w-2.5 h-2.5 fill-current" /> Video
                        </span>
                      )}
                    </div>
                    <p className="text-white font-bold text-sm">{l.title}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-gray-500 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{l.area}</span>
                      <span className="text-emerald-400 text-xs font-bold">AED {l.monthlyPrice?.toLocaleString()}/mo</span>
                      <span className="text-gray-500 text-xs">{l.type}</span>
                    </div>
                  </div>
                  <button onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}
                    className="text-gray-600 hover:text-gray-400 transition-colors p-1">
                    {expandedId === l.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded */}
                {expandedId === l.id && (
                  <div className="border-t border-white/6 p-4 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div><p className="text-gray-600 mb-0.5">Manager</p><p className="text-white font-medium">{l.managerName}</p></div>
                      <div><p className="text-gray-600 mb-0.5">Phone</p>
                        <a href={`https://wa.me/${l.managerPhone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />{l.managerPhone}
                        </a>
                      </div>
                      <div><p className="text-gray-600 mb-0.5">Available</p><p className="text-white font-medium">{l.availableFrom}</p></div>
                      <div><p className="text-gray-600 mb-0.5">Bills incl.</p><p className="text-white font-medium">{l.billsIncluded ? "Yes" : "No"}</p></div>
                      <div><p className="text-gray-600 mb-0.5">Submitted</p><p className="text-white font-medium">{fmtDate(l.createdAt)}</p></div>
                      {l.brokerRef && <div><p className="text-gray-600 mb-0.5">Broker Ref</p><p className="text-white font-medium">{l.brokerRef}</p></div>}
                    </div>

                    {l.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {l.amenities.map((a: string) => <span key={a} className="text-[10px] text-gray-500 bg-white/4 border border-white/6 rounded px-2 py-0.5">{a}</span>)}
                      </div>
                    )}

                    {l.notes && <p className="text-gray-400 text-xs bg-white/3 rounded-lg p-3 italic">"{l.notes}"</p>}

                    {l.youtubeUrl && (
                      <div className="flex items-center gap-2 bg-red-500/8 border border-red-500/15 rounded-lg p-3">
                        {extractYouTubeId(l.youtubeUrl) && (
                          <img src={`https://img.youtube.com/vi/${extractYouTubeId(l.youtubeUrl)}/default.jpg`} className="w-16 h-12 rounded object-cover shrink-0" alt="thumbnail" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-red-400 text-xs font-semibold">YouTube Video Tour</p>
                          <a href={l.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-[10px] hover:text-gray-300 truncate block transition-colors">{l.youtubeUrl}</a>
                        </div>
                        <a href={l.youtubeUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                          <Eye className="w-4 h-4 text-red-400 hover:text-red-300 transition-colors" />
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      {l.status !== "active" && (
                        <button onClick={() => listingStatusMut.mutate({ id: l.id, status: "active" })} disabled={listingStatusMut.isPending}
                          className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-500/25 active:scale-95 transition-all disabled:opacity-60">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Activate
                        </button>
                      )}
                      {l.status !== "filled" && (
                        <button onClick={() => listingStatusMut.mutate({ id: l.id, status: "filled" })} disabled={listingStatusMut.isPending}
                          className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-500/20 active:scale-95 transition-all disabled:opacity-60">
                          <XCircle className="w-3.5 h-3.5" /> Reject / Mark Filled
                        </button>
                      )}
                      {l.status !== "pending" && (
                        <button onClick={() => listingStatusMut.mutate({ id: l.id, status: "pending" })} disabled={listingStatusMut.isPending}
                          className="flex items-center gap-1.5 border border-white/10 text-gray-500 text-xs font-bold px-4 py-2 rounded-xl hover:border-white/20 hover:text-gray-300 active:scale-95 transition-all disabled:opacity-60">
                          <Clock className="w-3.5 h-3.5" /> Reset to Pending
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── VIEWINGS ──────────────────────────────────────────────────── */}
        {tab === "viewings" && (
          <div className="space-y-3">
            {viewingsQ.isLoading ? (
              <div className="text-center py-12"><span className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin inline-block" /></div>
            ) : allViewings.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No viewing requests yet.</div>
            ) : allViewings.map(v => (
              <div key={v.id} className={`bg-[#0a0d14] border rounded-2xl p-4 ${v.status === "pending" ? "border-blue-500/20" : "border-white/8"}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <StatusPill status={v.status} />
                      <span className="text-gray-600 text-[10px] font-mono">{v.id.slice(0, 10)}…</span>
                    </div>
                    <p className="text-white font-bold text-sm">{v.requesterName}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                      <a href={`https://wa.me/${v.requesterPhone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                        className="text-[#25D366] text-xs hover:underline flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> {v.requesterPhone}
                      </a>
                      <span className="text-gray-500 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{v.preferredDate || "Flexible"}</span>
                      <span className="text-gray-500 text-xs">{fmtDate(v.createdAt)}</span>
                    </div>
                  </div>
                  {v.status === "pending" && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => viewingStatusMut.mutate({ id: v.id, status: "confirmed" })} disabled={viewingStatusMut.isPending}
                        className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-500/25 active:scale-95 transition-all disabled:opacity-60">
                        <CheckCircle2 className="w-3 h-3" /> Confirm
                      </button>
                      <button onClick={() => viewingStatusMut.mutate({ id: v.id, status: "cancelled" })} disabled={viewingStatusMut.isPending}
                        className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 active:scale-95 transition-all disabled:opacity-60">
                        <XCircle className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Listing info */}
                <div className="bg-white/3 border border-white/6 rounded-xl p-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide font-semibold mb-1">Requested Property</p>
                  <p className="text-white text-sm font-semibold">{v.listingTitle}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{v.listingArea}</p>
                </div>

                {v.message && (
                  <div className="mt-2 bg-white/3 border border-white/6 rounded-xl p-3">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wide font-semibold mb-1">Message</p>
                    <p className="text-gray-300 text-sm italic">"{v.message}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── REVIEWS ───────────────────────────────────────────────────── */}
        {tab === "reviews" && (
          <div className="space-y-3">
            {reviewsQ.isLoading ? (
              <div className="text-center py-12"><span className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin inline-block" /></div>
            ) : allReviews.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No reviews yet.</div>
            ) : allReviews.map(r => (
              <div key={r.id} className="bg-[#0a0d14] border border-white/8 rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <StatusPill status={r.verified ? "verified" : "unverified"} />
                      <StarRating value={r.rating} />
                      <span className="text-gray-700 text-[10px] font-mono">listing: {r.listingId?.slice(0, 10)}…</span>
                    </div>
                    <p className="text-white font-bold text-sm">{r.reviewerName}</p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      {r.reviewerPhone && <p className="text-gray-500 text-xs">{r.reviewerPhone}</p>}
                      {r.stayType && <p className="text-gray-600 text-xs">· {r.stayType}</p>}
                      <p className="text-gray-700 text-xs">{fmtDate(r.createdAt)}</p>
                    </div>
                  </div>
                  {!r.verified && (
                    <button onClick={() => reviewVerifyMut.mutate({ id: r.id })} disabled={reviewVerifyMut.isPending}
                      className="shrink-0 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 active:scale-95 transition-all disabled:opacity-60">
                      <ThumbsUp className="w-3 h-3" /> Verify
                    </button>
                  )}
                </div>
                <div className="mt-3 bg-white/3 border border-white/6 rounded-xl p-3">
                  <p className="text-gray-300 text-sm leading-relaxed">"{r.reviewText}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
