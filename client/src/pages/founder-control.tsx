import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Lock, Gavel, Package, Users, BarChart3, Mail, Database,
  Settings, BellRing, Megaphone, LayoutGrid, UserCheck, Building2, Globe,
  TrendingUp, ShoppingCart, FileCheck, Truck, ChevronRight,
  Layers, Zap, Eye, Map, Star, Radio, AlertCircle, Plus, X,
  CheckCircle2, XCircle, Archive, RefreshCw, Edit2, Save, ChevronDown
} from "lucide-react";
import { useLocation } from "wouter";

const SESSION_KEY = "dw_founder_auth";
const ADMIN_SECRET = "deliwer-admin-2026";

const adminFetch = (path: string, opts: RequestInit = {}) =>
  fetch(`/api/buy/admin${path}`, {
    ...opts,
    headers: { "x-admin-secret": ADMIN_SECRET, "content-type": "application/json", ...(opts.headers || {}) },
  }).then(r => r.json());

// ── DeliWer Admin Links ────────────────────────────────────────────────────────
const DELIWER_LINKS = [
  { href: "/marketing",              label: "Marketing Hub",       icon: Megaphone,   color: "violet",  desc: "Campaign dashboard & funnels" },
  { href: "/marketing/tenant-leads", label: "Tenant Leads",        icon: TrendingUp,  color: "purple",  desc: "Lead pipeline & capture" },
  { href: "/partner-dashboard",      label: "Partner Dashboard",   icon: LayoutGrid,  color: "indigo",  desc: "Broker & affiliate metrics" },
  { href: "/admin/brokers",          label: "Broker Admin",        icon: UserCheck,   color: "blue",    desc: "RERA broker management" },
  { href: "/broker-master-db",       label: "Broker Master DB",    icon: Database,    color: "sky",     desc: "Full broker record store" },
  { href: "/sendgrid-dashboard",     label: "Email Campaigns",     icon: Mail,        color: "cyan",    desc: "SendGrid sequences & stats" },
  { href: "/habtoor-admin",          label: "Habtoor Admin",       icon: Building2,   color: "amber",   desc: "Al Habtoor inventory & NDA" },
  { href: "/admin/alerts",           label: "Alert System",        icon: BellRing,    color: "orange",  desc: "Missed calls & notifications" },
  { href: "/capture-admin",          label: "Capture Admin",       icon: Radio,       color: "emerald", desc: "Visitor capture & sniffers" },
  { href: "/operations",             label: "Operations",          icon: Settings,    color: "slate",   desc: "Internal ops & scheduling" },
  { href: "/investor-dashboard",     label: "Investor Dashboard",  icon: BarChart3,   color: "violet",  desc: "Metrics & financial summary" },
  { href: "/mission-control-saqi-kawthar", label: "Mission Control", icon: Star,      color: "amber",   desc: "Saqi Al-Kawthar mission ops" },
  { href: "/admin/flex-rentals",     label: "Flex Admin",          icon: Map,         color: "blue",    desc: "Flex living inventory" },
  { href: "/admin/mamzar",           label: "Mamzar Admin",        icon: Eye,         color: "purple",  desc: "Mamzar Alef Linar EOI" },
] as const;

const CHAINTRACK_LINKS = [
  { href: "/admin/reverse-auction",  label: "Auction Admin",       icon: Gavel,       color: "orange",  desc: "Live reverse auction control" },
  { href: "/admin/wsc",             label: "WSC Admin",            icon: Package,     color: "blue",    desc: "WeSellCellular supplier feed" },
  { href: "/buy",                   label: "Buy Portal",           icon: ShoppingCart,color: "emerald", desc: "buy.chaintrack.com buyer mgmt" },
  { href: "/buy/demo",              label: "Demo Portal",          icon: Zap,         color: "amber",   desc: "No-auth sandbox walkthrough" },
  { href: "/buy/reverse-auction",   label: "Live Auction Page",    icon: TrendingUp,  color: "cyan",    desc: "Active buyer-facing auction" },
  { href: "/chaintrack",            label: "ChainTrack Info",      icon: Globe,       color: "sky",     desc: "Public marketing page" },
  { href: "/chaintrack-grading",    label: "Grading Page",         icon: FileCheck,   color: "purple",  desc: "Grading infrastructure page" },
  { href: "/chaintrack-sourcing",   label: "Sourcing Page",        icon: Layers,      color: "violet",  desc: "Remote sourcing marketplace" },
  { href: "/freight-broker",        label: "Freight Broker",       icon: Truck,       color: "indigo",  desc: "Logistics broker network" },
  { href: "/partners",              label: "Partners Page",        icon: Users,       color: "emerald", desc: "Broker & flipper programme" },
] as const;

type ColorKey = "violet"|"purple"|"indigo"|"blue"|"sky"|"cyan"|"amber"|"orange"|"emerald"|"slate";
const COLOR: Record<ColorKey, { card: string; icon: string }> = {
  violet:  { card: "border-violet-500/25 hover:border-violet-500/50 hover:bg-violet-500/5",  icon: "text-violet-400" },
  purple:  { card: "border-purple-500/25 hover:border-purple-500/50 hover:bg-purple-500/5",  icon: "text-purple-400" },
  indigo:  { card: "border-indigo-500/25 hover:border-indigo-500/50 hover:bg-indigo-500/5",  icon: "text-indigo-400" },
  blue:    { card: "border-blue-500/25 hover:border-blue-500/50 hover:bg-blue-500/5",         icon: "text-blue-400" },
  sky:     { card: "border-sky-500/25 hover:border-sky-500/50 hover:bg-sky-500/5",            icon: "text-sky-400" },
  cyan:    { card: "border-cyan-500/25 hover:border-cyan-500/50 hover:bg-cyan-500/5",         icon: "text-cyan-400" },
  amber:   { card: "border-amber-500/25 hover:border-amber-500/50 hover:bg-amber-500/5",      icon: "text-amber-400" },
  orange:  { card: "border-orange-500/25 hover:border-orange-500/50 hover:bg-orange-500/5",   icon: "text-orange-400" },
  emerald: { card: "border-emerald-500/25 hover:border-emerald-500/50 hover:bg-emerald-500/5", icon: "text-emerald-400" },
  slate:   { card: "border-slate-500/25 hover:border-slate-500/50 hover:bg-slate-500/5",      icon: "text-slate-400" },
};

function LinkCard({ href, label, icon: Icon, color, desc }: { href: string; label: string; icon: any; color: ColorKey; desc: string }) {
  const c = COLOR[color] ?? COLOR.slate;
  return (
    <a href={href} data-testid={`founder-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={`group flex flex-col gap-2 rounded-xl border bg-white/[0.02] p-3.5 transition-all cursor-pointer ${c.card}`}>
      <Icon className={`w-4 h-4 ${c.icon} shrink-0`} />
      <div className="font-black text-white text-xs leading-tight">{label}</div>
      <div className="text-[10px] text-slate-500 leading-snug group-hover:text-slate-400 transition-colors">{desc}</div>
      <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-slate-400 transition-colors ml-auto -mt-1" />
    </a>
  );
}

// ── Auction Desk ──────────────────────────────────────────────────────────────

const GRADES = ["A", "A+", "B", "C", "ASIS"];
const ORIGINS = ["USA", "China", "India", "Korea", "UAE", "UK", "Germany"];
const TIERS = ["standard", "verified", "premium", "vip"];
const KYC_STATUSES = ["pending", "in_review", "approved", "rejected"];

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
      {sub && <div className="text-[10px] text-slate-600 mt-0.5">{sub}</div>}
    </div>
  );
}

type Lot = {
  id: string; lotNumber: string; productName: string; brand: string; model: string;
  grade: string; lotType: string; quantity: number; availableQty: number;
  unitPrice: number; startingBid?: number; currentBid?: number;
  status: string; originCountry: string; supplierName: string;
  bidCount: number; auctionEndDate?: string;
};
type Buyer = {
  id: string; email: string; companyName: string; contactName: string;
  country: string; buyerTier: string; kycStatus: string; status: string;
  totalOrders: number; totalSpend: number; createdAt: string;
  metadata?: { isDemoAccount?: boolean };
};
type Bid = {
  id: string; lotId: string; buyerId: string; bidAmount: number; quantity: number;
  status: string; createdAt: string; lotNumber?: string; productName?: string;
  buyerCompany?: string; buyerCountry?: string;
};

const EMPTY_LOT_FORM = {
  productName: "", brand: "Apple", model: "", grade: "A", lotType: "supplier_feed",
  quantity: "", unitPriceDollars: "", startingBidDollars: "", originCountry: "USA",
  supplierName: "", minOrderQty: "25", auctionEndDate: "",
};

function LotManager() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_LOT_FORM });
  const [editId, setEditId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const { data: lots = [], isLoading } = useQuery<Lot[]>({
    queryKey: ["/api/buy/admin/lots"],
    queryFn: () => adminFetch("/lots"),
    refetchInterval: 15000,
  });

  const createMut = useMutation({
    mutationFn: (d: typeof form) => adminFetch("/lots", { method: "POST", body: JSON.stringify(d) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/buy/admin/lots"] }); qc.invalidateQueries({ queryKey: ["/api/buy/admin/stats"] }); setShowForm(false); setForm({ ...EMPTY_LOT_FORM }); },
  });
  const patchMut = useMutation({
    mutationFn: ({ id, ...body }: any) => adminFetch(`/lots/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/buy/admin/lots"] }); setEditId(null); },
  });
  const archiveMut = useMutation({
    mutationFn: (id: string) => adminFetch(`/lots/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/buy/admin/lots"] }),
  });

  const statusBadge = (s: string) => ({
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    archived: "bg-slate-500/15 text-slate-400 border-slate-500/30",
    sold: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  }[s] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30");

  const typeBadge = (t: string) => t === "reverse_bid"
    ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
    : "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-black text-white">{lots.length} lots total · {lots.filter(l => l.status === "active").length} active</div>
        <button onClick={() => setShowForm(v => !v)} data-testid="button-new-lot"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-xs font-black uppercase tracking-widest transition-all">
          {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          {showForm ? "Cancel" : "New Lot"}
        </button>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-5">
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-orange-400 mb-4">Create New Lot</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {[
                  { key: "productName", label: "Product Name *", placeholder: "iPhone 15 Pro Max 256GB Natural Titanium" },
                  { key: "model", label: "Model *", placeholder: "iPhone 15 Pro Max 256GB" },
                  { key: "brand", label: "Brand", placeholder: "Apple" },
                  { key: "supplierName", label: "Supplier Name *", placeholder: "US Tech Liquidators LLC" },
                  { key: "quantity", label: "Quantity *", placeholder: "200", type: "number" },
                  { key: "minOrderQty", label: "Min. Order Qty", placeholder: "25", type: "number" },
                  { key: "unitPriceDollars", label: "Unit Price (USD) *", placeholder: "450.00", type: "number" },
                  { key: "startingBidDollars", label: "Bid Ceiling (USD, auction only)", placeholder: "480.00", type: "number" },
                  { key: "auctionEndDate", label: "Auction End (date, optional)", placeholder: "", type: "date" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</div>
                    <input type={type || "text"} placeholder={placeholder} value={(form as any)[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50" />
                  </div>
                ))}
                {/* Selects */}
                {[
                  { key: "grade", label: "Grade *", opts: GRADES },
                  { key: "lotType", label: "Lot Type *", opts: ["supplier_feed", "reverse_bid"] },
                  { key: "originCountry", label: "Origin Country *", opts: ORIGINS },
                ].map(({ key, label, opts }) => (
                  <div key={key}>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</div>
                    <select value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-orange-500/50">
                      {opts.map(o => <option key={o} value={o} style={{ background: "#0D1525" }}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button onClick={() => createMut.mutate(form)} disabled={createMut.isPending}
                data-testid="button-submit-new-lot"
                className="mt-4 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2">
                {createMut.isPending ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Creating…</> : <><Save className="w-3.5 h-3.5" /> Create Lot</>}
              </button>
              {createMut.isError && <p className="text-red-400 text-xs mt-2">{String((createMut.error as any)?.message)}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lots table */}
      {isLoading ? (
        <div className="text-center py-8 text-slate-500 text-sm">Loading lots…</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest">
                <th className="text-left px-3 py-2.5">Lot #</th>
                <th className="text-left px-3 py-2.5">Product</th>
                <th className="text-left px-3 py-2.5">Type</th>
                <th className="text-left px-3 py-2.5">Grade</th>
                <th className="text-right px-3 py-2.5">Avail.</th>
                <th className="text-right px-3 py-2.5">Price</th>
                <th className="text-right px-3 py-2.5">Bids</th>
                <th className="text-left px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {lots.map((lot) => (
                <tr key={lot.id} className="border-b border-slate-800/60 hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-2.5 font-mono text-slate-400">{lot.lotNumber}</td>
                  <td className="px-3 py-2.5">
                    <div className="text-white font-medium max-w-[180px] truncate">{lot.productName}</div>
                    <div className="text-slate-600 text-[10px]">{lot.originCountry} · {lot.supplierName}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${typeBadge(lot.lotType)}`}>
                      {lot.lotType === "reverse_bid" ? "Auction" : "Feed"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-300">{lot.grade}</td>
                  <td className="px-3 py-2.5 text-right">
                    {editId === lot.id ? (
                      <input type="number" value={editQty} onChange={e => setEditQty(e.target.value)}
                        className="w-16 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-white text-xs text-right focus:outline-none" />
                    ) : (
                      <span className={lot.availableQty < 10 ? "text-red-400 font-bold" : "text-slate-300"}>{lot.availableQty}</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    {editId === lot.id ? (
                      <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)}
                        placeholder={(lot.unitPrice / 100).toFixed(0)}
                        className="w-20 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-white text-xs text-right focus:outline-none" />
                    ) : (
                      <span className="text-white font-mono">
                        ${((lot.lotType === "reverse_bid" ? (lot.currentBid || lot.startingBid || 0) : lot.unitPrice) / 100).toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right text-slate-400">{lot.bidCount || 0}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${statusBadge(lot.status)}`}>
                      {lot.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1 justify-end">
                      {editId === lot.id ? (
                        <>
                          <button onClick={() => patchMut.mutate({
                            id: lot.id,
                            ...(editQty ? { availableQty: editQty } : {}),
                            ...(editPrice ? { unitPriceDollars: parseFloat(editPrice) } : {}),
                          })}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-all">
                            Save
                          </button>
                          <button onClick={() => setEditId(null)} className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-[10px]">✕</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditId(lot.id); setEditQty(String(lot.availableQty)); setEditPrice((lot.unitPrice / 100).toFixed(0)); }}
                            data-testid={`button-edit-lot-${lot.id}`}
                            className="p-1 rounded hover:bg-slate-700 text-slate-500 hover:text-white transition-all" title="Edit qty/price">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {lot.status === "active" ? (
                            <button onClick={() => patchMut.mutate({ id: lot.id, status: "archived" })}
                              data-testid={`button-archive-lot-${lot.id}`}
                              className="p-1 rounded hover:bg-red-900/40 text-slate-600 hover:text-red-400 transition-all" title="Archive lot">
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button onClick={() => patchMut.mutate({ id: lot.id, status: "active" })}
                              data-testid={`button-activate-lot-${lot.id}`}
                              className="p-1 rounded hover:bg-emerald-900/40 text-slate-600 hover:text-emerald-400 transition-all" title="Re-activate">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function BuyerRegistry() {
  const qc = useQueryClient();
  const { data: buyers = [], isLoading } = useQuery<Buyer[]>({
    queryKey: ["/api/buy/admin/buyers"],
    queryFn: () => adminFetch("/buyers"),
  });
  const patchMut = useMutation({
    mutationFn: ({ id, ...body }: any) => adminFetch(`/buyers/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/buy/admin/buyers"] }); qc.invalidateQueries({ queryKey: ["/api/buy/admin/stats"] }); },
  });

  const kycColor = (s: string) => ({
    approved: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    pending: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    in_review: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    rejected: "text-red-400 bg-red-500/10 border-red-500/25",
  }[s] ?? "text-slate-400 bg-slate-500/10 border-slate-500/25");

  const tierColor = (t: string) => ({
    premium: "text-purple-400", vip: "text-amber-400",
    verified: "text-emerald-400", standard: "text-slate-400",
  }[t] ?? "text-slate-400");

  if (isLoading) return <div className="text-center py-8 text-slate-500 text-sm">Loading buyers…</div>;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest">
            <th className="text-left px-3 py-2.5">Company</th>
            <th className="text-left px-3 py-2.5">Email</th>
            <th className="text-left px-3 py-2.5">Country</th>
            <th className="text-left px-3 py-2.5">Tier</th>
            <th className="text-left px-3 py-2.5">KYC</th>
            <th className="text-right px-3 py-2.5">Orders</th>
            <th className="text-right px-3 py-2.5">Spend</th>
            <th className="px-3 py-2.5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((b) => {
            const isDemo = b.metadata?.isDemoAccount;
            return (
              <tr key={b.id} className={`border-b border-slate-800/60 hover:bg-white/[0.02] transition-colors ${isDemo ? "opacity-60" : ""}`}>
                <td className="px-3 py-2.5">
                  <div className="text-white font-medium flex items-center gap-1.5">
                    {b.companyName}
                    {isDemo && <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1 rounded-full">DEMO</span>}
                  </div>
                  <div className="text-slate-600 text-[10px]">{b.contactName}</div>
                </td>
                <td className="px-3 py-2.5 font-mono text-slate-400">{b.email}</td>
                <td className="px-3 py-2.5 text-slate-400">{b.country}</td>
                <td className="px-3 py-2.5">
                  <select value={b.buyerTier} disabled={isDemo}
                    onChange={e => patchMut.mutate({ id: b.id, buyerTier: e.target.value })}
                    className={`bg-transparent border-none text-xs font-bold focus:outline-none cursor-pointer ${tierColor(b.buyerTier)}`}>
                    {TIERS.map(t => <option key={t} value={t} style={{ background: "#0D1525", color: "#fff" }}>{t}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2.5">
                  <select value={b.kycStatus} disabled={isDemo}
                    onChange={e => patchMut.mutate({ id: b.id, kycStatus: e.target.value })}
                    className={`text-[10px] font-black uppercase tracking-wide rounded-full px-2 py-0.5 border cursor-pointer focus:outline-none ${kycColor(b.kycStatus)}`}
                    style={{ background: "transparent" }}>
                    {KYC_STATUSES.map(s => <option key={s} value={s} style={{ background: "#0D1525", color: "#fff" }}>{s}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2.5 text-right text-slate-400">{b.totalOrders}</td>
                <td className="px-3 py-2.5 text-right font-mono text-slate-400">
                  ${(b.totalSpend / 100).toLocaleString()}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1 justify-end">
                    {b.status === "active" ? (
                      <button onClick={() => !isDemo && patchMut.mutate({ id: b.id, status: "suspended" })} disabled={isDemo}
                        className="p-1 rounded hover:bg-red-900/30 text-slate-600 hover:text-red-400 transition-all disabled:opacity-30" title="Suspend">
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button onClick={() => patchMut.mutate({ id: b.id, status: "active" })}
                        className="p-1 rounded hover:bg-emerald-900/30 text-slate-600 hover:text-emerald-400 transition-all" title="Re-activate">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BidBoard() {
  const { data: bids = [], isLoading } = useQuery<Bid[]>({
    queryKey: ["/api/buy/admin/bids"],
    queryFn: () => adminFetch("/bids"),
    refetchInterval: 20000,
  });

  const statusColor = (s: string) => ({
    active: "text-emerald-400", outbid: "text-amber-400",
    won: "text-blue-400", cancelled: "text-red-400",
  }[s] ?? "text-slate-400");

  if (isLoading) return <div className="text-center py-8 text-slate-500 text-sm">Loading bids…</div>;

  if (!bids.length) return (
    <div className="text-center py-12 text-slate-500">
      <Gavel className="w-8 h-8 mx-auto mb-3 opacity-30" />
      <div className="text-sm">No bids submitted yet</div>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest">
            <th className="text-left px-3 py-2.5">Lot</th>
            <th className="text-left px-3 py-2.5">Buyer</th>
            <th className="text-right px-3 py-2.5">Bid Price</th>
            <th className="text-right px-3 py-2.5">Qty</th>
            <th className="text-right px-3 py-2.5">Total</th>
            <th className="text-left px-3 py-2.5">Status</th>
            <th className="text-left px-3 py-2.5">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id} className="border-b border-slate-800/60 hover:bg-white/[0.02] transition-colors">
              <td className="px-3 py-2.5">
                <div className="text-white font-medium font-mono">{bid.lotNumber || "—"}</div>
                <div className="text-slate-600 text-[10px] max-w-[140px] truncate">{bid.productName}</div>
              </td>
              <td className="px-3 py-2.5">
                <div className="text-slate-300">{bid.buyerCompany || "—"}</div>
                <div className="text-slate-600 text-[10px]">{bid.buyerCountry}</div>
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-white font-bold">
                ${(bid.bidAmount / 100).toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right text-slate-300">{bid.quantity}</td>
              <td className="px-3 py-2.5 text-right font-mono text-slate-400">
                ${((bid.bidAmount / 100) * bid.quantity).toLocaleString()}
              </td>
              <td className="px-3 py-2.5">
                <span className={`font-bold uppercase text-[10px] ${statusColor(bid.status)}`}>{bid.status}</span>
              </td>
              <td className="px-3 py-2.5 text-slate-500">
                {bid.createdAt ? new Date(bid.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuctionDesk() {
  const [desk, setDesk] = useState<"lots" | "buyers" | "bids">("lots");

  const { data: stats } = useQuery({
    queryKey: ["/api/buy/admin/stats"],
    queryFn: () => adminFetch("/stats"),
    refetchInterval: 30000,
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
          <Gavel className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <div className="text-[9px] font-black uppercase tracking-widest text-orange-400/60 mb-0.5">Supply Side Management</div>
          <h1 className="text-white font-black text-xl">Auction Control Desk</h1>
          <p className="text-slate-500 text-xs">Lot inventory · Buyer registry · Live bid board</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Active Lots" value={stats?.activeLots ?? "—"} sub={`${stats?.auctionLots ?? 0} auctions`} color="border-orange-500/25 bg-orange-500/5" />
        <StatCard label="Registered Buyers" value={stats?.totalBuyers ?? "—"} sub={`${stats?.verifiedBuyers ?? 0} verified`} color="border-blue-500/25 bg-blue-500/5" />
        <StatCard label="Total Bids" value={stats?.totalBids ?? "—"} sub={`${stats?.totalDemandUnits ?? 0} units pooled`} color="border-purple-500/25 bg-purple-500/5" />
        <StatCard label="Orders" value={stats?.totalOrders ?? "—"} sub={`$${((stats?.totalRevenue ?? 0) / 100).toLocaleString()} GMV`} color="border-emerald-500/25 bg-emerald-500/5" />
      </div>

      {/* Beta reminder */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 flex items-center gap-2 mb-5">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-[11px] text-amber-300/80">
          <strong className="text-amber-400">Beta phase:</strong> Creating/editing lots here updates the live database immediately. Prices and quantities are applied to the buyer-facing portal in real time.
        </span>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 mb-4 p-1 rounded-xl border border-white/6 bg-white/2 w-fit">
        {(["lots", "buyers", "bids"] as const).map(t => (
          <button key={t} onClick={() => setDesk(t)} data-testid={`desk-tab-${t}`}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              desk === t ? "bg-slate-700 text-white" : "text-white/30 hover:text-white/60"
            }`}>
            {t === "lots" ? `📦 Lots` : t === "buyers" ? `👥 Buyers` : `⚡ Bids`}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={desk} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          {desk === "lots" && <LotManager />}
          {desk === "buyers" && <BuyerRegistry />}
          {desk === "bids" && <BidBoard />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FounderControlPage() {
  const [, navigate] = useLocation();
  const [section, setSection] = useState<"deliwer" | "chaintrack" | "auction">("deliwer");

  const lock = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/");
  };

  const TABS = [
    { id: "deliwer",    label: "🟠 DeliWer" },
    { id: "chaintrack", label: "🔗 ChainTrack" },
    { id: "auction",    label: "🎯 Auction Desk" },
  ] as const;

  return (
    <div className="min-h-screen text-white" style={{ background: "#04060f" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/6" style={{ background: "rgba(4,6,15,0.96)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Founder</span>
              <div className="text-white font-black text-sm leading-tight -mt-0.5">Control Room</div>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl border border-white/8 bg-white/3 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setSection(t.id)} data-testid={`tab-${t.id}`}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  section === t.id ? "bg-orange-500/80 text-white" : "text-white/30 hover:text-white/60"
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Session Active</span>
            </div>
            <button onClick={lock} data-testid="button-lock-founder"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-900/40 text-red-500/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/8 transition-all text-[9px] font-black uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Lock
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {section === "deliwer" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <span className="text-xl">🟠</span>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-orange-400/60 mb-0.5">DeliWer Relocations</div>
                    <h1 className="text-white font-black text-xl">DeliWer Admin</h1>
                    <p className="text-slate-500 text-xs">Marketing · Brokers · Operations · Investor</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {DELIWER_LINKS.map(l => <LinkCard key={l.href} href={l.href} label={l.label} icon={l.icon} color={l.color as ColorKey} desc={l.desc} />)}
                </div>
                <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4">
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">Session Info</div>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div><span className="text-slate-600">Password:</span> <span className="text-slate-400 font-mono">deliwer-admin-2026</span></div>
                    <div><span className="text-slate-600">Session key:</span> <span className="text-slate-400 font-mono">dw_founder_auth</span></div>
                    <div><span className="text-slate-600">Scope:</span> <span className="text-slate-400">/marketing, /admin, /operations, /founder</span></div>
                  </div>
                </div>
              </div>
            )}

            {section === "chaintrack" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <span className="text-xl">🔗</span>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-orange-400/60 mb-0.5">ChainTrack B2B Platform</div>
                    <h1 className="text-white font-black text-xl">ChainTrack Admin</h1>
                    <p className="text-slate-500 text-xs">Reverse Auction · Buyer Portal · Supplier Feeds</p>
                  </div>
                </div>
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 flex items-start gap-2.5 mb-5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-300/80 leading-relaxed">
                    <strong className="text-amber-400">Beta / Pre-production phase.</strong> Buyer authentication and payment rails are active in sandbox mode.
                    The demo portal (<code className="font-mono bg-amber-900/30 px-1 rounded">/buy/demo</code>) is fully public — no sign-in required.
                    For supply-side lot management, use the <button onClick={() => setSection("auction")} className="underline text-amber-400">🎯 Auction Desk</button> tab.
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {CHAINTRACK_LINKS.map(l => <LinkCard key={l.href} href={l.href} label={l.label} icon={l.icon} color={l.color as ColorKey} desc={l.desc} />)}
                </div>
                <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-3">Demo Buyer Credentials</div>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div><span className="text-slate-600">Email:</span> <span className="text-blue-300 font-mono">demo@chaintrack.com</span></div>
                    <div><span className="text-slate-600">Password:</span> <span className="text-blue-300 font-mono">Demo@ChainTrack2026</span></div>
                    <div><span className="text-slate-600">Tier:</span> <span className="text-emerald-400 font-semibold">Verified · KYC approved</span></div>
                  </div>
                </div>
              </div>
            )}

            {section === "auction" && <AuctionDesk />}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
