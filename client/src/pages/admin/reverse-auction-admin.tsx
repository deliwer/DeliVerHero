import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Download, RefreshCw, ChevronRight, CheckCircle2,
  XCircle, Clock, Eye, AlertCircle, Gavel,
  ArrowLeft, Users, DollarSign, Package, Globe,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

const EVENT_SLUG = "iphone17-pro-max-usa-jun2025";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: any }> = {
  submitted: { label: "Submitted",  color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/30",  Icon: Clock },
  reviewed:  { label: "Reviewed",   color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",    Icon: Eye },
  allocated: { label: "Allocated",  color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/30", Icon: CheckCircle2 },
  rejected:  { label: "Rejected",   color: "text-red-400",    bg: "bg-red-500/10 border-red-500/30",      Icon: XCircle },
};

interface AuctionEvent {
  id: string;
  slug: string;
  title: string;
  deadline: string;
  stockItems: { id: string; color: string; qty: number; refPriceUsd: number }[];
  status: string;
  whatsapp: string;
}

interface Bid {
  id: string;
  eventId: string;
  companyName: string;
  contactName: string;
  whatsapp: string;
  email: string;
  country: string;
  modelRequired: string;
  preferredColor: string | null;
  quantityRequired: number;
  targetUnitPriceUsd: number;
  destinationCountry: string;
  notes: string | null;
  ipAddress: string | null;
  status: string;
  createdAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.submitted;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${cfg.bg} ${cfg.color}`}>
      <cfg.Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function exportCSV(bids: Bid[], eventTitle: string) {
  const headers = [
    "Company", "Contact", "WhatsApp", "Email", "Country",
    "Model", "Color", "Qty", "Target USD/Unit", "Total Value USD",
    "Destination", "Notes", "Status", "Submitted At",
  ];
  const rows = bids.map(b => [
    b.companyName, b.contactName, b.whatsapp, b.email, b.country,
    b.modelRequired, b.preferredColor || "", b.quantityRequired,
    b.targetUnitPriceUsd, b.quantityRequired * b.targetUnitPriceUsd,
    b.destinationCountry, (b.notes || "").replace(/,/g, ";"),
    b.status, new Date(b.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Dubai" }),
  ]);

  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chaintrack-reverse-bids-${eventTitle.replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReverseAuctionAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [filter, setFilter] = useState<string>("all");
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);

  // Load event details
  const { data: event } = useQuery<AuctionEvent>({
    queryKey: ["/api/reverse-auction/events", EVENT_SLUG],
    queryFn: async () => {
      const res = await fetch(`/api/reverse-auction/events/${EVENT_SLUG}`);
      if (!res.ok) throw new Error("Event not found");
      return res.json();
    },
  });

  // Load bids
  const { data: bids = [], isLoading, refetch } = useQuery<Bid[]>({
    queryKey: ["/api/reverse-auction/admin/bids", event?.id],
    queryFn: async () => {
      if (!event?.id) return [];
      const res = await fetch(`/api/reverse-auction/admin/bids/${event.id}`);
      if (!res.ok) throw new Error("Failed to load bids");
      return res.json();
    },
    enabled: !!event?.id,
    refetchInterval: 60000,
  });

  // Update bid status
  const updateBidStatus = useMutation({
    mutationFn: async ({ bidId, status }: { bidId: string; status: string }) => {
      const res = await fetch(`/api/reverse-auction/admin/bids/${bidId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update bid");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/reverse-auction/admin/bids", event?.id] });
      toast({ title: "Bid status updated" });
      setSelectedBid(null);
    },
    onError: (err: any) => {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    },
  });

  // Close event
  const closeEvent = useMutation({
    mutationFn: async (status: string) => {
      const res = await fetch(`/api/reverse-auction/admin/events/${event!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update event");
      return res.json();
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["/api/reverse-auction/events", EVENT_SLUG] });
      toast({ title: `Event marked as ${data.status}` });
    },
  });

  const filteredBids = filter === "all" ? bids : bids.filter(b => b.status === filter);
  const totalQtyBid = bids.reduce((s, b) => s + b.quantityRequired, 0);
  const totalValueBid = bids.reduce((s, b) => s + b.quantityRequired * b.targetUnitPriceUsd, 0);
  const avgPrice = bids.length ? Math.round(bids.reduce((s, b) => s + b.targetUnitPriceUsd, 0) / bids.length) : 0;
  const stockItems = (event?.stockItems || []) as { id: string; color: string; qty: number; refPriceUsd: number }[];
  const totalAvailable = stockItems.reduce((s, i) => s + i.qty, 0);

  const deadline = event ? new Date(event.deadline) : null;
  const deadlinePassed = deadline ? new Date() > deadline : false;

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#080C17" }}>

      {/* ── Header ── */}
      <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link href="/buy/reverse-auction">
            <button className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Reverse Auction Portal
            </button>
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-blue-400" />
            <span className="text-white font-bold text-sm">Reverse Auction Admin</span>
          </div>
          {event && (
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
              event.status === "active"
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                : event.status === "closed"
                ? "text-slate-400 bg-slate-700/40 border-slate-600/40"
                : "text-red-400 bg-red-500/10 border-red-500/30"
            }`}>
              {event.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => refetch()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-all">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
          <button onClick={() => bids.length && exportCSV(bids, event?.title || "auction")}
            disabled={bids.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: bids.length ? "#2563EB" : "#1E2A3A" }}>
            <Download className="w-3 h-3" /> Export CSV ({bids.length})
          </button>
          {event?.status === "active" && (
            <button
              onClick={() => closeEvent.mutate("closed")}
              disabled={closeEvent.isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-all">
              Close Bidding
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Event Info ── */}
        {event && (
          <div className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div className="text-white font-bold text-base mb-1">{event.title}</div>
              <div className="text-slate-400 text-xs flex items-center gap-3 flex-wrap">
                <span>Slug: <code className="text-slate-300">{event.slug}</code></span>
                <span className="text-slate-600">·</span>
                <span>
                  Deadline: {deadline?.toLocaleString("en-GB", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" })} Dubai
                  {deadlinePassed && <span className="ml-2 text-amber-400 font-semibold">(deadline passed)</span>}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {stockItems.map(i => (
                <div key={i.id} className="text-center px-3 py-2 rounded-lg text-xs"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-white font-bold">{i.qty}</div>
                  <div className="text-slate-500 text-[10px]">{i.color.split(" ").pop()}</div>
                </div>
              ))}
              <div className="text-center px-3 py-2 rounded-lg text-xs"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-blue-400 font-bold">{totalAvailable}</div>
                <div className="text-slate-500 text-[10px]">Total</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bids", value: bids.length, Icon: Users, color: "text-blue-400" },
            { label: "Units Requested", value: totalQtyBid.toLocaleString(), Icon: Package, color: "text-cyan-400" },
            { label: "Avg Target Price", value: avgPrice ? `$${avgPrice.toLocaleString()}` : "—", Icon: DollarSign, color: "text-emerald-400" },
            { label: "Total Bid Value", value: totalValueBid ? `$${(totalValueBid / 1000).toFixed(0)}k` : "—", Icon: Globe, color: "text-purple-400" },
          ].map(({ label, value, Icon, color }) => (
            <div key={label} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Icon className={`w-5 h-5 ${color} mb-2`} />
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-wide mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Demand by Colour ── */}
        {stockItems.length > 0 && bids.length > 0 && (
          <div className="rounded-xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-white font-semibold text-sm mb-4">Demand vs Supply by Colour</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stockItems.map(item => {
                const requested = bids
                  .filter(b => b.preferredColor === item.color || b.modelRequired.includes("Any"))
                  .reduce((s, b) => s + b.quantityRequired, 0);
                const pct = Math.min(100, Math.round((requested / item.qty) * 100));
                const oversubscribed = requested > item.qty;
                return (
                  <div key={item.id}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300">{item.color}</span>
                      <span className={oversubscribed ? "text-red-400 font-semibold" : "text-slate-400"}>
                        {requested} requested / {item.qty} available
                        {oversubscribed && " ⚡ Over-subscribed"}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: oversubscribed ? "#EF4444" : "#3B82F6" }} />
                    </div>
                    <div className="text-slate-500 text-[10px] mt-1">Ref: ${item.refPriceUsd.toLocaleString()} · {pct}% covered</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Status filter tabs ── */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {["all", "submitted", "reviewed", "allocated", "rejected"].map(s => {
            const count = s === "all" ? bids.length : bids.filter(b => b.status === s).length;
            return (
              <button key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  filter === s
                    ? "text-white border-blue-500/60 bg-blue-500/15"
                    : "text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300"
                }`}>
                {s === "all" ? "All" : STATUS_CONFIG[s]?.label} ({count})
              </button>
            );
          })}
        </div>

        {/* ── Bids table ── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredBids.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <div className="text-sm">{filter === "all" ? "No bids submitted yet" : `No ${filter} bids`}</div>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500"
              style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="col-span-3">Company / Contact</div>
              <div className="col-span-2">Model · Colour</div>
              <div className="col-span-1 text-right">Qty</div>
              <div className="col-span-1 text-right">$/Unit</div>
              <div className="col-span-1 text-right">Total</div>
              <div className="col-span-1">Destination</div>
              <div className="col-span-1">Submitted</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Rows */}
            {filteredBids.map((bid, i) => (
              <div key={bid.id}
                className="grid grid-cols-12 gap-2 px-4 py-3.5 items-center transition-colors hover:bg-white/[0.02] cursor-pointer"
                style={{ borderBottom: i < filteredBids.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onClick={() => setSelectedBid(bid)}>
                <div className="col-span-3 min-w-0">
                  <div className="text-white font-semibold text-xs truncate">{bid.companyName}</div>
                  <div className="text-slate-500 text-[10px] truncate">{bid.contactName} · {bid.country}</div>
                  <a href={`https://wa.me/${bid.whatsapp.replace(/\D/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-emerald-400 text-[10px] hover:text-emerald-300 flex items-center gap-1 mt-0.5">
                    <SiWhatsapp className="w-2.5 h-2.5" /> {bid.whatsapp}
                  </a>
                </div>
                <div className="col-span-2 min-w-0">
                  <div className="text-slate-200 text-[11px] leading-snug truncate">{bid.modelRequired.replace("iPhone 17 Pro Max 256GB — ", "")}</div>
                  {bid.preferredColor && <div className="text-slate-500 text-[10px]">{bid.preferredColor}</div>}
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-white font-bold text-xs">{bid.quantityRequired.toLocaleString()}</span>
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-cyan-400 font-bold text-xs">${bid.targetUnitPriceUsd.toLocaleString()}</span>
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-slate-300 text-xs">${(bid.quantityRequired * bid.targetUnitPriceUsd).toLocaleString()}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-slate-400 text-[11px]">{bid.destinationCountry}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-slate-500 text-[10px]">
                    {new Date(bid.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Dubai", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="col-span-1">
                  <StatusBadge status={bid.status} />
                </div>
                <div className="col-span-1" onClick={e => e.stopPropagation()}>
                  <div className="flex flex-col gap-1">
                    {bid.status !== "allocated" && (
                      <button
                        onClick={() => updateBidStatus.mutate({ bidId: bid.id, status: "allocated" })}
                        className="text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors">
                        Allocate
                      </button>
                    )}
                    {bid.status !== "rejected" && (
                      <button
                        onClick={() => updateBidStatus.mutate({ bidId: bid.id, status: "rejected" })}
                        className="text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors">
                        Reject
                      </button>
                    )}
                    {bid.status !== "reviewed" && bid.status !== "allocated" && (
                      <button
                        onClick={() => updateBidStatus.mutate({ bidId: bid.id, status: "reviewed" })}
                        className="text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Bid Detail Slide-over ── */}
      {selectedBid && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setSelectedBid(null)}>
          <div className="flex-1" />
          <div className="w-full max-w-md h-full overflow-y-auto shadow-2xl"
            style={{ background: "#0D1525", borderLeft: "1px solid rgba(255,255,255,0.1)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-white font-bold">Bid Detail</div>
                <button onClick={() => setSelectedBid(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Company", value: selectedBid.companyName },
                  { label: "Contact", value: selectedBid.contactName },
                  { label: "WhatsApp", value: selectedBid.whatsapp, link: `https://wa.me/${selectedBid.whatsapp.replace(/\D/g, "")}` },
                  { label: "Email", value: selectedBid.email },
                  { label: "Country", value: selectedBid.country },
                  { label: "Model", value: selectedBid.modelRequired },
                  { label: "Colour Preference", value: selectedBid.preferredColor || "Any" },
                  { label: "Quantity", value: `${selectedBid.quantityRequired.toLocaleString()} units` },
                  { label: "Target Price", value: `$${selectedBid.targetUnitPriceUsd.toLocaleString()} / unit` },
                  { label: "Total Bid Value", value: `$${(selectedBid.quantityRequired * selectedBid.targetUnitPriceUsd).toLocaleString()}` },
                  { label: "Destination", value: selectedBid.destinationCountry },
                  { label: "Notes", value: selectedBid.notes || "—" },
                  { label: "IP Address", value: selectedBid.ipAddress || "—" },
                  { label: "Submitted", value: new Date(selectedBid.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" }) + " Dubai" },
                  { label: "Status", value: <StatusBadge status={selectedBid.status} /> },
                ].map(({ label, value, link }) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-slate-500 text-xs uppercase tracking-wide shrink-0 w-28">{label}</div>
                    <div className="text-right text-xs text-slate-200">
                      {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 justify-end">
                          <SiWhatsapp className="w-3 h-3" /> {value as string}
                        </a>
                      ) : (
                        typeof value === "string" ? value : value
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status actions */}
              <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-3">Update Status</div>
                <div className="flex flex-col gap-2">
                  {["reviewed", "allocated", "rejected"].map(s => (
                    <button key={s}
                      onClick={() => updateBidStatus.mutate({ bidId: selectedBid.id, status: s })}
                      disabled={selectedBid.status === s || updateBidStatus.isPending}
                      className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                        s === "allocated" ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : s === "rejected" ? "bg-red-900/60 hover:bg-red-800/60 text-red-300"
                        : "bg-blue-900/60 hover:bg-blue-800/60 text-blue-300"
                      }`}>
                      {selectedBid.status === s ? `✓ ${STATUS_CONFIG[s].label}` : `Mark as ${STATUS_CONFIG[s].label}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp shortcut */}
              <div className="mt-4">
                <a href={`https://wa.me/${selectedBid.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${selectedBid.contactName}, this is ChainTrack regarding your bid for ${selectedBid.quantityRequired} units of ${selectedBid.modelRequired}. We have reviewed your submission and would like to discuss the allocation.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white text-sm font-semibold"
                  style={{ background: "#25D366" }}>
                  <SiWhatsapp className="w-4 h-4" /> Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
