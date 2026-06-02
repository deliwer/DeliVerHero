import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Download, ShoppingCart, CheckCircle2, X, LogIn, UserPlus, RefreshCw,
  Eye, EyeOff, Send, Sparkles, Package, Shield, Globe, Building2, History,
  TrendingDown, Lock, Calendar, BarChart3, ChevronRight, Zap, SlidersHorizontal,
  ChevronDown, ChevronUp, Filter
} from "lucide-react";

const API_BASE = "/api/wsc";
const TOKEN_KEY = "buy_chaintrack_token";
const BUYER_KEY = "buy_chaintrack_buyer";

// ── Types ──────────────────────────────────────────────────────────────────────
interface StockItem {
  id: string; source: string; sku: string; warehouse?: string;
  category: string; manufacturer: string; model: string; grade: string;
  capacity?: string; carrier?: string; color?: string; lockStatus?: string;
  modelNumber?: string; qtyAvailable: number; listPrice: number; hasQtyAddedToday: boolean;
}
interface Buyer {
  id: string; email: string; companyName: string;
  contactName: string; buyerTier: string; kycStatus: string;
}
interface CartLine {
  stockItemId: string; sku: string; manufacturer: string; model: string;
  grade: string; capacity: string; color: string; carrier: string;
  source: string; listPrice: number; offerQty: number; offerPrice: number;
}

// ── Auth helpers ───────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem(TOKEN_KEY); }
function getBuyer(): Buyer | null { try { return JSON.parse(localStorage.getItem(BUYER_KEY) || "null"); } catch { return null; } }
function setAuth(token: string, buyer: Buyer) { localStorage.setItem(TOKEN_KEY, token); localStorage.setItem(BUYER_KEY, JSON.stringify(buyer)); }
function clearAuth() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(BUYER_KEY); }
async function apiFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...((opts.headers as object) || {}) },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function fmt(cents: number) {
  return `$${((cents || 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Grade config ───────────────────────────────────────────────────────────────
// Covers all grades found across WSC, Itochu, SupplierDirect sources
const GRADE_CFG: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  // Itochu-style OBL grades
  "A+":        { label: "A+",      bg: "bg-emerald-600", text: "text-white", border: "border-emerald-500", dot: "bg-emerald-400" },
  "A":         { label: "A",       bg: "bg-emerald-700", text: "text-white", border: "border-emerald-600", dot: "bg-emerald-500" },
  "A-":        { label: "A−",      bg: "bg-teal-700",    text: "text-white", border: "border-teal-600",    dot: "bg-teal-400" },
  "B+":        { label: "B+",      bg: "bg-sky-700",     text: "text-white", border: "border-sky-600",     dot: "bg-sky-400" },
  "B":         { label: "B",       bg: "bg-blue-700",    text: "text-white", border: "border-blue-600",    dot: "bg-blue-400" },
  "B-":        { label: "B−",      bg: "bg-blue-800",    text: "text-white", border: "border-blue-700",    dot: "bg-blue-500" },
  "C":         { label: "C",       bg: "bg-amber-700",   text: "text-white", border: "border-amber-600",   dot: "bg-amber-400" },
  "C+":        { label: "C+",      bg: "bg-amber-600",   text: "text-white", border: "border-amber-500",   dot: "bg-amber-400" },
  // WSC grade codes
  "PGL":       { label: "PGL",     bg: "bg-violet-700",  text: "text-white", border: "border-violet-600",  dot: "bg-violet-400" },
  "PGA":       { label: "PGA",     bg: "bg-emerald-700", text: "text-white", border: "border-emerald-600", dot: "bg-emerald-500" },
  "PGB":       { label: "PGB",     bg: "bg-sky-700",     text: "text-white", border: "border-sky-600",     dot: "bg-sky-400" },
  "PGC":       { label: "PGC",     bg: "bg-amber-700",   text: "text-white", border: "border-amber-600",   dot: "bg-amber-400" },
  // Legacy/Itochu full names
  "A-Stock":   { label: "A",       bg: "bg-emerald-700", text: "text-white", border: "border-emerald-600", dot: "bg-emerald-500" },
  "A1-Stock":  { label: "A1",      bg: "bg-emerald-600", text: "text-white", border: "border-emerald-500", dot: "bg-emerald-400" },
  "A2-Stock":  { label: "A2",      bg: "bg-teal-700",    text: "text-white", border: "border-teal-600",    dot: "bg-teal-400" },
  "A2":        { label: "A2",      bg: "bg-teal-700",    text: "text-white", border: "border-teal-600",    dot: "bg-teal-400" },
  "AP":        { label: "A+",      bg: "bg-emerald-600", text: "text-white", border: "border-emerald-500", dot: "bg-emerald-400" },
  "S":         { label: "S",       bg: "bg-yellow-600",  text: "text-white", border: "border-yellow-500",  dot: "bg-yellow-400" },
  "B-Stock":   { label: "B",       bg: "bg-blue-700",    text: "text-white", border: "border-blue-600",    dot: "bg-blue-400" },
  "B2-Stock":  { label: "B2",      bg: "bg-blue-800",    text: "text-white", border: "border-blue-700",    dot: "bg-blue-500" },
  "C-Stock":   { label: "C",       bg: "bg-amber-700",   text: "text-white", border: "border-amber-600",   dot: "bg-amber-400" },
  "KFLB":      { label: "KFLB",    bg: "bg-orange-700",  text: "text-white", border: "border-orange-600",  dot: "bg-orange-400" },
  "S1-B+":     { label: "S1 B+",   bg: "bg-sky-700",     text: "text-white", border: "border-sky-600",     dot: "bg-sky-400" },
  "S1-B":      { label: "S1 B",    bg: "bg-blue-700",    text: "text-white", border: "border-blue-600",    dot: "bg-blue-400" },
  "S1-C":      { label: "S1 C",    bg: "bg-amber-700",   text: "text-white", border: "border-amber-600",   dot: "bg-amber-400" },
};
const defaultGrade = { label: "—", bg: "bg-slate-700", text: "text-white", border: "border-slate-600", dot: "bg-slate-500" };

function gradeOf(g: string) {
  return GRADE_CFG[g] || defaultGrade;
}

// ── Warehouse group mapping (source → numeric id like reference URL) ──────────
const WAREHOUSE_GROUPS = [
  { id: "all",           label: "All Sources",       source: null },
  { id: "261",           label: "WeSellCellular",    source: "WSC" },
  { id: "262",           label: "Itochu Sourced",    source: "ITOCHU" },
  { id: "263",           label: "Supplier Direct",   source: "SUPPLIERDIRECT" },
];

// ── Auction Calendar ──────────────────────────────────────────────────────────
const AUCTION_CALENDAR = [
  { day: "Monday",    window: "10:00 – 14:00", source: "T-Mobile ITAD",           lotType: "iPhone 13–15 Series, Grade A/B",         access: "Standard" },
  { day: "Tuesday",   window: "09:00 – 13:00", source: "Verizon Liquidation",      lotType: "iPhone 14 Pro Max 256GB, Bulk Mix",      access: "Standard" },
  { day: "Wednesday", window: "11:00 – 16:00", source: "AT&T Carrier De-fleet",    lotType: "iPhone 15 Pro, Grade A Premium",         access: "Priority" },
  { day: "Thursday",  window: "08:00 – 12:00", source: "ITAD Consortium",          lotType: "Mixed iOS / Android, Insurance Return",  access: "Standard" },
  { day: "Friday",    window: "10:00 – 15:00", source: "US Carrier Pool (Private)", lotType: "iPhone 15 Pro Max, Sealed Lots",        access: "Priority" },
  { day: "Saturday",  window: "12:00 – 17:00", source: "AUCNET US",                lotType: "A-Grade Premium Lots — First-look",      access: "Priority" },
];

// ── Auth schemas ───────────────────────────────────────────────────────────────
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const registerSchema = z.object({
  companyName: z.string().min(2), contactName: z.string().min(2),
  email: z.string().email(), phone: z.string().min(7),
  country: z.string().min(2), password: z.string().min(8),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

// ── Auth Gate ─────────────────────────────────────────────────────────────────
function AuthGate({ onSuccess }: { onSuccess: (buyer: Buyer, token: string) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const { toast } = useToast();
  const lf = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const rf = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema), defaultValues: { companyName: "", contactName: "", email: "", phone: "", country: "UAE", password: "", confirmPassword: "" } });
  const loginMut = useMutation({
    mutationFn: (d: z.infer<typeof loginSchema>) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify(d) }),
    onSuccess: d => onSuccess(d.buyer, d.token),
    onError: (e: Error) => toast({ title: "Login failed", description: e.message, variant: "destructive" }),
  });
  const regMut = useMutation({
    mutationFn: (d: z.infer<typeof registerSchema>) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(d) }),
    onSuccess: d => onSuccess(d.buyer, d.token),
    onError: (e: Error) => toast({ title: "Registration failed", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-[#060b16] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center font-black text-white text-sm">KT</div>
            <div className="text-left">
              <div className="text-white font-black text-lg leading-none">KT Corp</div>
              <div className="text-indigo-400 text-xs">buy.ktcorpworldwide.com</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-2">Global Wholesale Marketplace</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Tabs value={mode} onValueChange={v => setMode(v as any)}>
            <TabsList className="w-full bg-slate-800 mb-5">
              <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={lf.handleSubmit(d => loginMut.mutate(d))} className="space-y-4">
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Email</Label>
                  <Input {...lf.register("email")} type="email" className="bg-slate-800 border-slate-700 text-white" data-testid="input-kt-login-email" />
                </div>
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Password</Label>
                  <div className="relative">
                    <Input {...lf.register("password")} type={showPw ? "text" : "password"}
                      className="bg-slate-800 border-slate-700 text-white pr-10" data-testid="input-kt-login-pw" />
                    <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loginMut.isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" data-testid="button-kt-login">
                  {loginMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />} Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={rf.handleSubmit(d => regMut.mutate(d))} className="space-y-3">
                {([["companyName","Company Name","ABC Trading LLC"],["contactName","Contact Name","Jane Doe"],["email","Business Email","trade@company.com"],["phone","Phone","+1 800 000 0000"],["country","Country","UAE"]] as const).map(([n,l,p]) => (
                  <div key={n}>
                    <Label className="text-slate-300 text-xs mb-1 block">{l}</Label>
                    <Input {...rf.register(n)} placeholder={p} className="bg-slate-800 border-slate-700 text-white text-sm" data-testid={`input-kt-reg-${n}`} />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Password</Label>
                    <Input {...rf.register("password")} type="password" className="bg-slate-800 border-slate-700 text-white text-sm" data-testid="input-kt-reg-pw" />
                    {rf.formState.errors.password && <p className="text-red-400 text-xs mt-0.5">{rf.formState.errors.password.message}</p>}
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Confirm</Label>
                    <Input {...rf.register("confirmPassword")} type="password" className="bg-slate-800 border-slate-700 text-white text-sm" data-testid="input-kt-reg-confirm" />
                    {rf.formState.errors.confirmPassword && <p className="text-red-400 text-xs mt-0.5">{rf.formState.errors.confirmPassword.message}</p>}
                  </div>
                </div>
                <Button type="submit" disabled={regMut.isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2" data-testid="button-kt-register">
                  {regMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />} Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

// ── Offer Modal ────────────────────────────────────────────────────────────────
function OfferModal({ item, onClose, onSubmit }: { item: StockItem; onClose: () => void; onSubmit: (l: CartLine) => void }) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState((item.listPrice / 100 * 0.97).toFixed(2));
  const { toast } = useToast();
  const gcfg = gradeOf(item.grade);

  const handleAdd = () => {
    const q = parseInt(String(qty));
    const p = parseFloat(price);
    if (!q || q < 1 || q > item.qtyAvailable) { toast({ title: "Invalid quantity", variant: "destructive" }); return; }
    if (!p || p <= 0) { toast({ title: "Enter your offer price", variant: "destructive" }); return; }
    onSubmit({ stockItemId: item.id, sku: item.sku, manufacturer: item.manufacturer, model: item.model, grade: item.grade, capacity: item.capacity || "", color: item.color || "", carrier: item.carrier || "", source: item.source, listPrice: item.listPrice, offerQty: q, offerPrice: Math.round(p * 100) });
    onClose();
  };

  const saving = Math.max(0, item.listPrice - Math.round(parseFloat(price || "0") * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl ${gcfg.bg} flex items-center justify-center shrink-0`}>
              <span className={`text-lg font-black ${gcfg.text} leading-none`}>{gcfg.label}</span>
            </div>
            <div>
              <p className="text-white font-bold">{item.manufacturer} {item.model}</p>
              <p className="text-slate-400 text-sm">{item.capacity} · {item.color} · {item.carrier}</p>
              <p className="text-xs font-mono text-slate-500">{item.sku}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-4 grid grid-cols-3 gap-2 text-center">
          <div><p className="text-xs text-slate-500 mb-0.5">List Price</p><p className="text-white font-bold">{fmt(item.listPrice)}</p></div>
          <div><p className="text-xs text-slate-500 mb-0.5">Available</p><p className="text-white font-bold">{item.qtyAvailable}</p></div>
          <div><p className="text-xs text-slate-500 mb-0.5">Lock</p><p className="text-white font-bold text-xs">{item.lockStatus || "—"}</p></div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Quantity (max {item.qtyAvailable})</Label>
            <Input type="number" min={1} max={item.qtyAvailable} value={qty} onChange={e => setQty(parseInt(e.target.value) || 1)}
              className="bg-slate-800 border-slate-700 text-white" data-testid="input-kt-offer-qty" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Your Offer Price (USD per unit)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <Input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white pl-7" data-testid="input-kt-offer-price" />
            </div>
            {saving > 0 && <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Saving {fmt(saving)} vs list · {((saving / item.listPrice) * 100).toFixed(1)}% below</p>}
          </div>
        </div>

        <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-3 mb-4 flex justify-between text-sm">
          <span className="text-slate-400">Total Offer</span>
          <span className="text-indigo-300 font-bold">{fmt(Math.round(parseFloat(price || "0") * 100) * qty)}</span>
        </div>

        <Button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" data-testid="button-kt-add-offer">
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Offer Cart
        </Button>
      </motion.div>
    </div>
  );
}

// ── Cart Bar ───────────────────────────────────────────────────────────────────
function CartBar({ lines, onRemove, onSubmit, submitting }: { lines: CartLine[]; onRemove: (sku: string) => void; onSubmit: () => void; submitting: boolean }) {
  const total = lines.reduce((s, l) => s + l.offerPrice * l.offerQty, 0);
  if (!lines.length) return null;
  return (
    <motion.div initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-indigo-950 border-t border-indigo-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-semibold">{lines.length} offers</span>
          <span className="text-indigo-300 font-bold">{fmt(total)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-1.5">
            {lines.slice(0, 2).map(l => (
              <div key={l.sku} className="flex items-center gap-1 bg-indigo-900/60 rounded px-2 py-1 text-xs">
                <span className="text-slate-300">{l.manufacturer} {l.model.split(" ").slice(-2).join(" ")}</span>
                <button onClick={() => onRemove(l.sku)} className="text-indigo-400 hover:text-red-400 ml-1"><X className="w-3 h-3" /></button>
              </div>
            ))}
            {lines.length > 2 && <span className="text-xs text-indigo-400">+{lines.length - 2}</span>}
          </div>
          <Button onClick={onSubmit} disabled={submitting} className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold" data-testid="button-kt-submit-cart">
            {submitting ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />} Submit Offers
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Filter Sidebar ─────────────────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-800 pb-3 mb-3">
      <button className="w-full flex items-center justify-between py-1.5 text-left" onClick={() => setOpen(p => !p)}>
        <span className="text-slate-200 text-xs font-semibold uppercase tracking-wider">{title}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

function CheckItem({ label, checked, onChange, dot, count }: { label: string; checked: boolean; onChange: () => void; dot?: string; count?: number }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer py-0.5 group">
      <input type="checkbox" checked={checked} onChange={onChange}
        className="w-3.5 h-3.5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-0" />
      {dot && <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />}
      <span className="text-xs text-slate-300 group-hover:text-white flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-slate-500">{count}</span>}
    </label>
  );
}

// ── Stock List Row ─────────────────────────────────────────────────────────────
function StockRow({ item, onOffer, inCart }: { item: StockItem; onOffer: () => void; inCart: boolean }) {
  const gcfg = gradeOf(item.grade);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 bg-slate-900 border rounded-xl px-3 py-3 hover:border-indigo-700/50 transition-colors
        ${item.hasQtyAddedToday ? "border-emerald-800/40 bg-emerald-950/5" : "border-slate-800"}
        ${inCart ? "border-indigo-700/60 bg-indigo-950/10" : ""}`}
      data-testid={`row-kt-${item.sku}`}
    >
      {/* Grade badge — dominant visual matching reference */}
      <div className={`w-16 h-16 rounded-xl ${gcfg.bg} border ${gcfg.border} flex flex-col items-center justify-center shrink-0`}>
        <span className={`text-sm font-black ${gcfg.text} leading-none`}>{gcfg.label}</span>
        <span className={`text-[9px] ${gcfg.text} opacity-70 mt-0.5 uppercase tracking-wide`}>{item.source === "ITOCHU" ? "OBL" : item.source === "SUPPLIERDIRECT" ? "SD" : "WSC"}</span>
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-white font-bold text-sm truncate">{item.manufacturer} {item.model}</p>
          {item.hasQtyAddedToday && <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 shrink-0"><Sparkles className="w-2.5 h-2.5" />New</span>}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {item.capacity && <span className="text-xs text-slate-400">{item.capacity}</span>}
          {item.carrier && item.carrier !== "Unlocked" && <span className="text-xs text-slate-500">{item.carrier}</span>}
          {item.carrier === "Unlocked" && <span className="text-xs text-emerald-400/70">Unlocked</span>}
          {item.color && <span className="text-xs text-slate-500">{item.color}</span>}
          {item.lockStatus && item.lockStatus !== "Unlocked" && <span className="text-xs text-amber-500/80">{item.lockStatus}</span>}
        </div>
        <p className="text-[10px] font-mono text-slate-600 mt-0.5">{item.sku}</p>
      </div>

      {/* Qty */}
      <div className="text-center shrink-0 w-12 hidden sm:block">
        <p className="text-xs text-slate-500 mb-0.5">Qty</p>
        <p className="text-white font-bold">{item.qtyAvailable}</p>
      </div>

      {/* Price */}
      <div className="text-right shrink-0 w-20">
        <p className="text-xs text-slate-500 mb-0.5">List</p>
        <p className="text-indigo-400 font-black text-base leading-none">{fmt(item.listPrice)}</p>
        <p className="text-[10px] text-slate-600 mt-0.5">/unit</p>
      </div>

      {/* Make Offer */}
      <Button size="sm" onClick={onOffer}
        className={`shrink-0 text-xs h-9 px-3 ${inCart ? "bg-emerald-700 hover:bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
        data-testid={`button-kt-offer-${item.sku}`}>
        {inCart ? <><CheckCircle2 className="w-3 h-3 mr-1" /> In Cart</> : "Make Offer"}
      </Button>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function KtCorpMarketplace() {
  const [buyer, setBuyer] = useState<Buyer | null>(getBuyer());
  const [warehouseGroup, setWarehouseGroup] = useState("all");
  const [search, setSearch] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "qty_desc" | "model_asc">("model_asc");

  // Multi-select filter state
  const [selGrades, setSelGrades] = useState<Set<string>>(new Set());
  const [selMfrs, setSelMfrs] = useState<Set<string>>(new Set());
  const [selStorages, setSelStorages] = useState<Set<string>>(new Set());
  const [selCarriers, setSelCarriers] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [cart, setCart] = useState<CartLine[]>([]);
  const [offerItem, setOfferItem] = useState<StockItem | null>(null);
  const [successSession, setSuccessSession] = useState<any>(null);
  const [mainTab, setMainTab] = useState<"marketplace" | "calendar" | "history">("marketplace");
  const { toast } = useToast();
  const qc = useQueryClient();

  const handleAuth = (b: Buyer, token: string) => { setAuth(token, b); setBuyer(b); };
  const handleLogout = () => { clearAuth(); setBuyer(null); };

  // Map warehouseGroup to source param
  const activeSource = WAREHOUSE_GROUPS.find(g => g.id === warehouseGroup)?.source || null;

  const params = new URLSearchParams({
    ...(activeSource ? { source: activeSource } : {}),
    ...(search ? { search } : {}),
    limit: "500",
  });

  const { data: stockData, isLoading } = useQuery({
    queryKey: ["/api/wsc/stock/kt", params.toString()],
    queryFn: () => apiFetch(`/stock?${params}`),
    enabled: !!buyer,
    staleTime: 60000,
  });

  const { data: summaryData = [] } = useQuery({
    queryKey: ["/api/wsc/stock/summary"],
    queryFn: () => apiFetch("/stock/summary"),
    enabled: !!buyer,
  });

  const { data: offerSessions = [] } = useQuery({
    queryKey: ["/api/wsc/offers/kt"],
    queryFn: () => apiFetch("/offers"),
    enabled: !!buyer,
  });

  const submitMut = useMutation({
    mutationFn: (data: any) => apiFetch("/offers", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: d => { setSuccessSession(d); setCart([]); qc.invalidateQueries({ queryKey: ["/api/wsc/offers/kt"] }); },
    onError: (e: Error) => toast({ title: "Submit failed", description: e.message, variant: "destructive" }),
  });

  const allItems: StockItem[] = stockData?.items || [];

  // Build facet options from loaded items
  const gradeOptions = useMemo(() => {
    const map = new Map<string, number>();
    allItems.forEach(i => map.set(i.grade, (map.get(i.grade) || 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [allItems]);

  const mfrOptions = useMemo(() => {
    const map = new Map<string, number>();
    allItems.forEach(i => map.set(i.manufacturer, (map.get(i.manufacturer) || 0) + 1));
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [allItems]);

  const storageOptions = useMemo(() => {
    const map = new Map<string, number>();
    allItems.forEach(i => { if (i.capacity) map.set(i.capacity, (map.get(i.capacity) || 0) + 1); });
    return [...map.entries()].sort((a, b) => {
      const numA = parseInt(a[0]); const numB = parseInt(b[0]);
      return isNaN(numA) || isNaN(numB) ? a[0].localeCompare(b[0]) : numA - numB;
    });
  }, [allItems]);

  const carrierOptions = useMemo(() => {
    const map = new Map<string, number>();
    allItems.forEach(i => { if (i.carrier) map.set(i.carrier, (map.get(i.carrier) || 0) + 1); });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [allItems]);

  // Apply client-side filters + sort
  const filteredItems = useMemo(() => {
    let items = allItems;
    if (selGrades.size > 0) items = items.filter(i => selGrades.has(i.grade));
    if (selMfrs.size > 0) items = items.filter(i => selMfrs.has(i.manufacturer));
    if (selStorages.size > 0) items = items.filter(i => i.capacity && selStorages.has(i.capacity));
    if (selCarriers.size > 0) items = items.filter(i => i.carrier && selCarriers.has(i.carrier));
    if (onlyNew) items = items.filter(i => i.hasQtyAddedToday);

    items = [...items].sort((a, b) => {
      if (sortBy === "price_asc") return a.listPrice - b.listPrice;
      if (sortBy === "price_desc") return b.listPrice - a.listPrice;
      if (sortBy === "qty_desc") return b.qtyAvailable - a.qtyAvailable;
      return `${a.manufacturer} ${a.model}`.localeCompare(`${b.manufacturer} ${b.model}`);
    });
    return items;
  }, [allItems, selGrades, selMfrs, selStorages, selCarriers, onlyNew, sortBy]);

  const cartSkus = new Set(cart.map(l => l.sku));
  const activeFilterCount = selGrades.size + selMfrs.size + selStorages.size + selCarriers.size + (onlyNew ? 1 : 0);

  const addToCart = (line: CartLine) => {
    setCart(prev => { const idx = prev.findIndex(l => l.sku === line.sku); if (idx >= 0) { const n = [...prev]; n[idx] = line; return n; } return [...prev, line]; });
    toast({ title: "Added to cart", description: `${line.manufacturer} ${line.model}` });
  };
  const removeFromCart = (sku: string) => setCart(prev => prev.filter(l => l.sku !== sku));
  const handleSubmit = () => {
    if (!cart.length) return;
    submitMut.mutate({ source: cart[0].source, items: cart });
  };

  const clearFilters = () => { setSelGrades(new Set()); setSelMfrs(new Set()); setSelStorages(new Set()); setSelCarriers(new Set()); setOnlyNew(false); };

  if (!buyer) return <AuthGate onSuccess={handleAuth} />;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const totalSummary = (summaryData as any[]).reduce((acc, s) => ({
    items: acc.items + Number(s.totalItems),
    qty: acc.qty + Number(s.totalQty),
    newToday: acc.newToday + Number(s.newToday),
  }), { items: 0, qty: 0, newToday: 0 });

  return (
    <div className="min-h-screen bg-[#060b16] text-white" style={{ paddingBottom: cart.length ? 76 : 0 }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#060b16]/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-full px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center font-black text-white text-sm">KT</div>
            <div>
              <span className="text-white font-black">KT Corp</span>
              <span className="text-slate-400 text-sm ml-1.5 hidden sm:inline">Worldwide</span>
            </div>
            {/* Warehouse group selector in header */}
            <div className="hidden sm:flex gap-1 ml-2 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {WAREHOUSE_GROUPS.map(g => (
                <button key={g.id} onClick={() => setWarehouseGroup(g.id)}
                  className={`text-xs px-2.5 py-1 rounded transition-all font-medium
                    ${warehouseGroup === g.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                  data-testid={`filter-wg-${g.id}`}>
                  {g.id === "all" ? "All" : g.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden md:block">{buyer.companyName}</span>
            {cart.length > 0 && <span className="text-xs bg-indigo-900/40 border border-indigo-700/40 text-indigo-300 px-2 py-1 rounded-full">{cart.length} in cart</span>}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white text-xs" data-testid="button-kt-logout">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <div className="bg-indigo-950/20 border-b border-indigo-900/20">
        <div className="max-w-full px-4 py-2 flex items-center gap-6 overflow-x-auto">
          {[
            { label: "SKUs", value: totalSummary.items.toLocaleString(), color: "text-indigo-400" },
            { label: "Total Units", value: totalSummary.qty.toLocaleString(), color: "text-white" },
            { label: "New Today", value: totalSummary.newToday, color: "text-emerald-400" },
            { label: "Showing", value: filteredItems.length.toLocaleString(), color: "text-slate-200" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1.5 shrink-0">
              <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          ))}
          <div className="ml-auto flex gap-2 shrink-0">
            <button onClick={() => { const a = document.createElement("a"); a.href = `/api/wsc/stock/download${activeSource ? `?source=${activeSource}` : ""}`; a.download = `KTCorp_Stock_${new Date().toISOString().slice(0,10)}.xlsx`; a.click(); }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-1.5 transition-colors"
              data-testid="button-kt-download">
              <Download className="w-3 h-3" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* ── Main tab nav ───────────────────────────────────────────────────── */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-full px-4 flex gap-0">
          {([
            { key: "marketplace", label: "Stock List", icon: Package },
            { key: "calendar",    label: "Auction Calendar", icon: Calendar },
            { key: "history",     label: `My Offers${(offerSessions as any[]).length ? ` (${(offerSessions as any[]).length})` : ""}`, icon: History },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setMainTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all
                ${mainTab === t.key ? "border-indigo-500 text-indigo-400" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              data-testid={`tab-kt-${t.key}`}>
              <t.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Marketplace ────────────────────────────────────────────────────── */}
      {mainTab === "marketplace" && (
        <div className="flex max-w-full">
          {/* Filter sidebar */}
          <aside className={`shrink-0 transition-all duration-200 ${sidebarOpen ? "w-56" : "w-0 overflow-hidden"} border-r border-slate-800 bg-[#080d18] min-h-[calc(100vh-112px)]`}>
            <div className="p-4 space-y-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" /> Filters
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-[10px] text-indigo-400 hover:text-white" data-testid="button-clear-filters">
                    Clear all ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Warehouse (mobile) */}
              <FilterSection title="Source" defaultOpen={true}>
                {WAREHOUSE_GROUPS.map(g => (
                  <label key={g.id} className="flex items-center gap-2 cursor-pointer py-0.5 group">
                    <input type="radio" name="wg" checked={warehouseGroup === g.id} onChange={() => setWarehouseGroup(g.id)}
                      className="w-3.5 h-3.5 border-slate-600 bg-slate-800 text-indigo-500 focus:ring-0" />
                    <span className="text-xs text-slate-300 group-hover:text-white">{g.label}</span>
                  </label>
                ))}
              </FilterSection>

              {/* New Today */}
              <FilterSection title="Availability" defaultOpen={true}>
                <CheckItem label="New Today Only" checked={onlyNew} onChange={() => setOnlyNew(p => !p)} dot="bg-emerald-400" />
              </FilterSection>

              {/* Grade */}
              <FilterSection title="Grade" defaultOpen={true}>
                {gradeOptions.map(([grade, count]) => {
                  const gcfg = gradeOf(grade);
                  return (
                    <CheckItem key={grade} label={grade} count={count}
                      checked={selGrades.has(grade)}
                      onChange={() => setSelGrades(prev => { const n = new Set(prev); n.has(grade) ? n.delete(grade) : n.add(grade); return n; })}
                      dot={gcfg.dot} />
                  );
                })}
              </FilterSection>

              {/* Manufacturer */}
              <FilterSection title="Brand" defaultOpen={false}>
                {mfrOptions.map(([mfr, count]) => (
                  <CheckItem key={mfr} label={mfr} count={count}
                    checked={selMfrs.has(mfr)}
                    onChange={() => setSelMfrs(prev => { const n = new Set(prev); n.has(mfr) ? n.delete(mfr) : n.add(mfr); return n; })} />
                ))}
              </FilterSection>

              {/* Storage */}
              {storageOptions.length > 0 && (
                <FilterSection title="Storage" defaultOpen={false}>
                  {storageOptions.map(([cap, count]) => (
                    <CheckItem key={cap} label={cap} count={count}
                      checked={selStorages.has(cap)}
                      onChange={() => setSelStorages(prev => { const n = new Set(prev); n.has(cap) ? n.delete(cap) : n.add(cap); return n; })} />
                  ))}
                </FilterSection>
              )}

              {/* Carrier */}
              {carrierOptions.length > 0 && (
                <FilterSection title="Carrier" defaultOpen={false}>
                  {carrierOptions.slice(0, 10).map(([carrier, count]) => (
                    <CheckItem key={carrier} label={carrier} count={count}
                      checked={selCarriers.has(carrier)}
                      onChange={() => setSelCarriers(prev => { const n = new Set(prev); n.has(carrier) ? n.delete(carrier) : n.add(carrier); return n; })} />
                  ))}
                </FilterSection>
              )}
            </div>
          </aside>

          {/* Stock list */}
          <div className="flex-1 min-w-0 px-4 py-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button onClick={() => setSidebarOpen(p => !p)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg px-2.5 py-1.5 transition-colors"
                data-testid="button-toggle-sidebar">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:block">{sidebarOpen ? "Hide" : "Filters"}</span>
                {activeFilterCount > 0 && <span className="bg-indigo-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{activeFilterCount}</span>}
              </button>

              <div className="relative flex-1 min-w-40">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search model, SKU, brand…"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  data-testid="input-kt-search" />
              </div>

              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                data-testid="select-kt-sort">
                <option value="model_asc">Sort: Model A→Z</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="qty_desc">Qty: Most First</option>
              </select>

              <span className="text-xs text-slate-500 ml-1">{filteredItems.length.toLocaleString()} items</span>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[...selGrades].map(g => (
                  <span key={g} className="flex items-center gap-1 text-[10px] bg-indigo-900/30 border border-indigo-700/40 text-indigo-300 px-2 py-0.5 rounded-full">
                    Grade: {g}
                    <button onClick={() => setSelGrades(p => { const n = new Set(p); n.delete(g); return n; })}><X className="w-2.5 h-2.5" /></button>
                  </span>
                ))}
                {[...selMfrs].map(m => (
                  <span key={m} className="flex items-center gap-1 text-[10px] bg-indigo-900/30 border border-indigo-700/40 text-indigo-300 px-2 py-0.5 rounded-full">
                    {m} <button onClick={() => setSelMfrs(p => { const n = new Set(p); n.delete(m); return n; })}><X className="w-2.5 h-2.5" /></button>
                  </span>
                ))}
                {[...selStorages].map(s => (
                  <span key={s} className="flex items-center gap-1 text-[10px] bg-indigo-900/30 border border-indigo-700/40 text-indigo-300 px-2 py-0.5 rounded-full">
                    {s} <button onClick={() => setSelStorages(p => { const n = new Set(p); n.delete(s); return n; })}><X className="w-2.5 h-2.5" /></button>
                  </span>
                ))}
                {[...selCarriers].map(c => (
                  <span key={c} className="flex items-center gap-1 text-[10px] bg-indigo-900/30 border border-indigo-700/40 text-indigo-300 px-2 py-0.5 rounded-full">
                    {c} <button onClick={() => setSelCarriers(p => { const n = new Set(p); n.delete(c); return n; })}><X className="w-2.5 h-2.5" /></button>
                  </span>
                ))}
                {onlyNew && (
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-900/30 border border-emerald-700/40 text-emerald-300 px-2 py-0.5 rounded-full">
                    New Today <button onClick={() => setOnlyNew(false)}><X className="w-2.5 h-2.5" /></button>
                  </span>
                )}
              </div>
            )}

            {/* List */}
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => <div key={i} className="h-20 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />)}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No items match your filters.</p>
                {activeFilterCount > 0 && <button onClick={clearFilters} className="mt-3 text-indigo-400 text-sm hover:text-indigo-300">Clear all filters</button>}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map(item => (
                  <StockRow key={item.id} item={item} inCart={cartSkus.has(item.sku)} onOffer={() => setOfferItem(item)} />
                ))}
              </div>
            )}

            {stockData?.total > allItems.length && (
              <p className="text-center text-xs text-slate-500 mt-4">Showing first {allItems.length} of {stockData.total} items. Use search or source filters to narrow down.</p>
            )}
          </div>
        </div>
      )}

      {/* ── Auction Calendar ────────────────────────────────────────────────── */}
      {mainTab === "calendar" && (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-indigo-950/50 border-b border-indigo-900/40 px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400 font-bold uppercase">Members Only</span>
                <span className="text-xs text-slate-500 border border-slate-700 rounded px-1.5 py-0.5 ml-1">Private · Not Public</span>
              </div>
              <h3 className="text-white font-bold text-lg">US Source Auction Calendar</h3>
              <p className="text-slate-400 text-sm">Weekly auction windows from major US carrier and ITAD liquidation channels.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-800 bg-slate-800/50">
                  {["Day (GST)","Window","Source","Lot Type","Access"].map(h => <th key={h} className="px-5 py-3 text-left text-slate-300 font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>
                  {AUCTION_CALENDAR.map(row => {
                    const isToday = row.day === today;
                    return (
                      <tr key={row.day} className={`border-b border-slate-800/50 ${isToday ? "bg-indigo-950/30" : "hover:bg-slate-800/30"}`} data-testid={`row-calendar-${row.day.toLowerCase()}`}>
                        <td className="px-5 py-3"><span className={`font-bold ${isToday ? "text-indigo-400" : "text-white"}`}>{row.day}{isToday && <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded">Today</span>}</span></td>
                        <td className="px-5 py-3 font-mono text-slate-300 text-xs">{row.window}</td>
                        <td className="px-5 py-3 text-slate-200">{row.source}</td>
                        <td className="px-5 py-3 text-slate-300 text-xs">{row.lotType}</td>
                        <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded font-medium border ${row.access === "Priority" ? "bg-amber-900/30 text-amber-400 border-amber-700/40" : "bg-slate-800 text-slate-400 border-slate-700"}`}>{row.access}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-800 px-5 py-4 flex items-center justify-between">
              <p className="text-xs text-slate-400">Verified buyers receive weekly auction schedules and live lot alerts via WhatsApp.</p>
              <a href="https://wa.me/971523946311?text=KT+Corp+Calendar+Access" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-2 rounded-lg"
                data-testid="link-kt-calendar-wa">Request Calendar Access</a>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Verified Buyer Network", desc: "KYC-screened buyers only. All transactions escrow-protected." },
              { icon: Zap,    title: "Real-Time Lot Alerts",   desc: "Get WhatsApp and email alerts when matching lots drop." },
              { icon: Globe,  title: "Global Delivery",        desc: "FOB, CIF, DDP from US and Dubai to 120+ countries." },
            ].map(item => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3">
                <item.icon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div><p className="text-white text-sm font-semibold">{item.title}</p><p className="text-slate-400 text-xs mt-1">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── My Offers ────────────────────────────────────────────────────────── */}
      {mainTab === "history" && (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-3">
          {(offerSessions as any[]).length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No offers submitted yet.</p>
              <Button onClick={() => setMainTab("marketplace")} className="mt-4 bg-indigo-600 hover:bg-indigo-700">Browse Stock List</Button>
            </div>
          ) : (offerSessions as any[]).map((s: any) => (
            <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5" data-testid={`card-kt-session-${s.id}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-indigo-400 font-bold text-sm">{s.sessionRef}</p>
                  <p className="text-white font-semibold mt-1">{s.totalItems} items · {fmt(s.totalValue)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(s.createdAt).toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize
                  ${s.status === "submitted" ? "bg-indigo-900/30 text-indigo-400 border-indigo-700/40"
                  : s.status === "accepted" ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/40"
                  : "bg-slate-800 text-slate-400 border-slate-700"}`}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {offerItem && <OfferModal item={offerItem} onClose={() => setOfferItem(null)} onSubmit={addToCart} />}
      </AnimatePresence>
      <AnimatePresence>
        {cart.length > 0 && <CartBar lines={cart} onRemove={removeFromCart} onSubmit={handleSubmit} submitting={submitMut.isPending} />}
      </AnimatePresence>
      <AnimatePresence>
        {successSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Offers Submitted!</h3>
              <div className="bg-slate-800 rounded-xl p-4 mb-5">
                <p className="font-mono text-indigo-400 font-bold">{successSession.sessionRef}</p>
                <p className="text-xs text-slate-400 mt-1">{successSession.totalItems} items · {fmt(successSession.totalValue)}</p>
              </div>
              <Button onClick={() => setSuccessSession(null)} className="w-full bg-indigo-600 hover:bg-indigo-700" data-testid="button-kt-close-success">Done</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
