import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Download, ShoppingCart, CheckCircle2, X, LogIn, UserPlus, RefreshCw,
  Eye, EyeOff, Send, Sparkles, Package, Shield, Globe, Building2, History,
  TrendingDown, Lock, Calendar, Layers, BarChart3, ChevronRight, Star, Zap, Clock
} from "lucide-react";

const API_BASE = "/api/wsc";
const TOKEN_KEY = "buy_chaintrack_token";
const BUYER_KEY = "buy_chaintrack_buyer";

interface StockItem {
  id: string;
  source: string;
  sku: string;
  warehouse?: string;
  category: string;
  manufacturer: string;
  model: string;
  grade: string;
  capacity?: string;
  carrier?: string;
  color?: string;
  lockStatus?: string;
  modelNumber?: string;
  qtyAvailable: number;
  listPrice: number;
  hasQtyAddedToday: boolean;
}

interface Buyer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
  buyerTier: string;
  kycStatus: string;
}

interface CartLine {
  stockItemId: string;
  sku: string;
  manufacturer: string;
  model: string;
  grade: string;
  capacity: string;
  color: string;
  carrier: string;
  source: string;
  listPrice: number;
  offerQty: number;
  offerPrice: number;
}

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function getBuyer(): Buyer | null { try { return JSON.parse(localStorage.getItem(BUYER_KEY) || "null"); } catch { return null; } }
function setAuth(token: string, buyer: Buyer) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(BUYER_KEY, JSON.stringify(buyer));
}
function clearAuth() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(BUYER_KEY); }

async function apiFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((opts.headers as object) || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function formatUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

const SOURCE_CONFIG = {
  WSC: { label: "WeSellCellular", color: "bg-blue-600/20 text-blue-300 border-blue-600/40", dot: "bg-blue-500" },
  ITOCHU: { label: "Itochu Sourced", color: "bg-purple-600/20 text-purple-300 border-purple-600/40", dot: "bg-purple-500" },
  SUPPLIERDIRECT: { label: "Supplier Direct", color: "bg-emerald-600/20 text-emerald-300 border-emerald-600/40", dot: "bg-emerald-500" },
};

const GRADE_COLORS: Record<string, string> = {
  "A-Stock": "text-emerald-400", "A1-Stock": "text-emerald-400", "A2-Stock": "text-emerald-400",
  "A2": "text-emerald-400", "AP": "text-purple-400", "S": "text-yellow-400",
  "B-Stock": "text-sky-400", "B2-Stock": "text-sky-400",
  "C-Stock": "text-amber-400", "KFLB": "text-orange-400",
  "S1-B+": "text-sky-400", "S1-B": "text-blue-400", "S1-C": "text-orange-400",
};

// US Source Auction Calendar data
const AUCTION_CALENDAR = [
  { day: "Monday", window: "10:00 – 14:00", source: "T-Mobile ITAD", lotType: "iPhone 13–15 Series, Grade A/B", access: "Standard" },
  { day: "Tuesday", window: "09:00 – 13:00", source: "Verizon Liquidation", lotType: "iPhone 14 Pro Max 256GB, Bulk Mix", access: "Standard" },
  { day: "Wednesday", window: "11:00 – 16:00", source: "AT&T Carrier De-fleet", lotType: "iPhone 15 Pro, Grade A Premium", access: "Priority" },
  { day: "Thursday", window: "08:00 – 12:00", source: "ITAD Consortium", lotType: "Mixed iOS / Android, Insurance Return", access: "Standard" },
  { day: "Friday", window: "10:00 – 15:00", source: "US Carrier Pool (Private)", lotType: "iPhone 15 Pro Max, Sealed Lots", access: "Priority" },
  { day: "Saturday", window: "12:00 – 17:00", source: "AUCNET US", lotType: "A-Grade Premium Lots — First-look", access: "Priority" },
];

function SourceBadge({ source }: { source: string }) {
  const cfg = SOURCE_CONFIG[source as keyof typeof SOURCE_CONFIG];
  if (!cfg) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Auth Gate ─────────────────────────────────────────────────────────────────
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const registerSchema = z.object({
  companyName: z.string().min(2), contactName: z.string().min(2),
  email: z.string().email(), phone: z.string().min(7),
  country: z.string().min(2), password: z.string().min(8),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

function AuthGate({ onSuccess }: { onSuccess: (buyer: Buyer, token: string) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const { toast } = useToast();
  const lf = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const rf = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) });

  const loginMut = useMutation({
    mutationFn: (d: z.infer<typeof loginSchema>) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify(d) }),
    onSuccess: (d) => { onSuccess(d.buyer, d.token); },
    onError: (e: Error) => toast({ title: "Login failed", description: e.message, variant: "destructive" }),
  });
  const regMut = useMutation({
    mutationFn: (d: z.infer<typeof registerSchema>) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(d) }),
    onSuccess: (d) => { onSuccess(d.buyer, d.token); },
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
                  {loginMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={rf.handleSubmit(d => regMut.mutate(d))} className="space-y-3">
                {[
                  ["companyName", "Company Name", "ABC Trading LLC"],
                  ["contactName", "Contact Name", "Jane Doe"],
                  ["email", "Business Email", "trade@company.com"],
                  ["phone", "Phone", "+1 800 000 0000"],
                  ["country", "Country", "UAE"],
                ].map(([name, label, ph]) => (
                  <div key={name}>
                    <Label className="text-slate-300 text-xs mb-1 block">{label}</Label>
                    <Input {...rf.register(name as any)} placeholder={ph}
                      className="bg-slate-800 border-slate-700 text-white text-sm" data-testid={`input-kt-reg-${name}`} />
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
                  {regMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                  Create Account
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
function OfferModal({ item, onClose, onSubmit }: {
  item: StockItem; onClose: () => void;
  onSubmit: (line: CartLine) => void;
}) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState((item.listPrice / 100 * 0.97).toFixed(2));
  const { toast } = useToast();

  const handleAdd = () => {
    const q = parseInt(String(qty));
    const p = parseFloat(price);
    if (!q || q < 1 || q > item.qtyAvailable) { toast({ title: "Invalid quantity", variant: "destructive" }); return; }
    if (!p || p <= 0) { toast({ title: "Enter your offer price", variant: "destructive" }); return; }
    onSubmit({
      stockItemId: item.id, sku: item.sku, manufacturer: item.manufacturer,
      model: item.model, grade: item.grade, capacity: item.capacity || "",
      color: item.color || "", carrier: item.carrier || "",
      source: item.source, listPrice: item.listPrice,
      offerQty: q, offerPrice: Math.round(p * 100),
    });
    onClose();
  };

  const saving = Math.max(0, item.listPrice - Math.round(parseFloat(price || "0") * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <SourceBadge source={item.source} />
            <h3 className="text-white font-bold mt-2">{item.manufacturer} {item.model}</h3>
            <p className="text-slate-400 text-sm">{item.grade} · {item.capacity} · {item.color}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">List Price</span>
            <span className="text-white font-bold">{formatUSD(item.listPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Available Qty</span>
            <span className="text-white">{item.qtyAvailable}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Lock Status</span>
            <span className="text-white">{item.lockStatus}</span>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Quantity (max {item.qtyAvailable})</Label>
            <Input type="number" min={1} max={item.qtyAvailable} value={qty}
              onChange={e => setQty(parseInt(e.target.value) || 1)}
              className="bg-slate-800 border-slate-700 text-white" data-testid="input-kt-offer-qty" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Your Offer Price (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <Input type="number" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white pl-7" data-testid="input-kt-offer-price" />
            </div>
            {saving > 0 && (
              <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Saving {formatUSD(saving)} vs list · {((saving / item.listPrice) * 100).toFixed(1)}% below
              </p>
            )}
          </div>
        </div>

        <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-3 mb-4 flex justify-between text-sm">
          <span className="text-slate-400">Total Offer</span>
          <span className="text-indigo-400 font-bold">{formatUSD(Math.round(parseFloat(price || "0") * 100) * qty)}</span>
        </div>

        <Button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" data-testid="button-kt-add-offer">
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Offer Cart
        </Button>
      </motion.div>
    </div>
  );
}

// ── Stock Card ─────────────────────────────────────────────────────────────────
function StockCard({ item, onOffer }: { item: StockItem; onOffer: () => void }) {
  const gradeColor = GRADE_COLORS[item.grade] || "text-slate-400";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-slate-900 border border-slate-800 hover:border-indigo-700/50 rounded-xl overflow-hidden transition-colors cursor-pointer"
      data-testid={`card-kt-${item.sku}`}
    >
      {/* Source + New badge */}
      <div className="px-3 pt-3 pb-0 flex items-center justify-between">
        <SourceBadge source={item.source} />
        {item.hasQtyAddedToday && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <Sparkles className="w-3 h-3" /> New
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="mb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-white font-bold text-sm leading-snug">{item.manufacturer} {item.model}</p>
              <p className="text-slate-400 text-xs mt-0.5">{item.capacity} · {item.color} · {item.carrier}</p>
            </div>
            <span className={`text-sm font-bold ${gradeColor} shrink-0`}>{item.grade}</span>
          </div>
          <p className="text-xs font-mono text-slate-500 mt-1">{item.sku}</p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">List Price</p>
            <p className="text-indigo-400 font-black text-xl leading-none">{formatUSD(item.listPrice)}</p>
            <p className="text-xs text-slate-500 mt-0.5">{item.qtyAvailable} units</p>
          </div>
          <Button size="sm" onClick={onOffer} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8"
            data-testid={`button-kt-offer-${item.sku}`}>
            Make Offer
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Offer Cart Bar ─────────────────────────────────────────────────────────────
function CartBar({ lines, onRemove, onSubmit, submitting }: {
  lines: CartLine[]; onRemove: (sku: string) => void;
  onSubmit: () => void; submitting: boolean;
}) {
  const total = lines.reduce((s, l) => s + l.offerPrice * l.offerQty, 0);
  if (!lines.length) return null;
  return (
    <motion.div initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-indigo-950 border-t border-indigo-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-semibold">{lines.length} offers</span>
          <span className="text-indigo-300 font-bold">{formatUSD(total)}</span>
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
            {submitting ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
            Submit Offers
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main KT Corp Marketplace ──────────────────────────────────────────────────
export default function KtCorpMarketplace() {
  const [buyer, setBuyer] = useState<Buyer | null>(getBuyer());
  const [activeSource, setActiveSource] = useState("all");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterMfr, setFilterMfr] = useState("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [offerItem, setOfferItem] = useState<StockItem | null>(null);
  const [successSession, setSuccessSession] = useState<any>(null);
  const [mainTab, setMainTab] = useState<"marketplace" | "calendar" | "history">("marketplace");
  const { toast } = useToast();
  const qc = useQueryClient();

  const handleAuth = (b: Buyer, token: string) => { setAuth(token, b); setBuyer(b); };
  const handleLogout = () => { clearAuth(); setBuyer(null); };

  const params = new URLSearchParams({
    ...(activeSource !== "all" ? { source: activeSource } : {}),
    ...(filterCat !== "all" ? { category: filterCat } : {}),
    ...(filterMfr !== "all" ? { manufacturer: filterMfr } : {}),
    ...(onlyNew ? { newToday: "true" } : {}),
    ...(search ? { search } : {}),
    limit: "300",
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
    onSuccess: (d) => {
      setSuccessSession(d);
      setCart([]);
      qc.invalidateQueries({ queryKey: ["/api/wsc/offers/kt"] });
    },
    onError: (e: Error) => toast({ title: "Submit failed", description: e.message, variant: "destructive" }),
  });

  const items: StockItem[] = stockData?.items || [];
  const manufacturers = [...new Set(items.map(i => i.manufacturer))].sort();

  const totalSummary = (summaryData as any[]).reduce((acc, s) => ({
    items: acc.items + Number(s.totalItems),
    qty: acc.qty + Number(s.totalQty),
    newToday: acc.newToday + Number(s.newToday),
  }), { items: 0, qty: 0, newToday: 0 });

  const addToCart = (line: CartLine) => {
    setCart(prev => {
      const idx = prev.findIndex(l => l.sku === line.sku);
      if (idx >= 0) { const n = [...prev]; n[idx] = line; return n; }
      return [...prev, line];
    });
    toast({ title: `Added to cart`, description: `${line.manufacturer} ${line.model}` });
  };

  const removeFromCart = (sku: string) => setCart(prev => prev.filter(l => l.sku !== sku));

  const handleSubmit = () => {
    if (!cart.length) return;
    const source = cart.length > 0 ? cart[0].source : "ITOCHU";
    submitMut.mutate({ source, items: cart });
  };

  if (!buyer) return <AuthGate onSuccess={handleAuth} />;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-[#060b16] text-white" style={{ paddingBottom: cart.length ? 76 : 0 }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#060b16]/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center font-black text-white text-sm">KT</div>
            <div>
              <span className="text-white font-black">KT Corp</span>
              <span className="text-slate-400 text-sm ml-1.5 hidden sm:inline">Worldwide</span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">· Global Wholesale Marketplace</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:block">{buyer.companyName}</span>
            {cart.length > 0 && (
              <span className="text-xs bg-indigo-900/40 border border-indigo-700/40 text-indigo-300 px-2 py-1 rounded-full">
                {cart.length} in cart
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white text-xs" data-testid="button-kt-logout">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="bg-indigo-950/30 border-b border-indigo-900/30">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-6 overflow-x-auto">
          {[
            { label: "Total SKUs", value: totalSummary.items.toLocaleString(), color: "text-indigo-400" },
            { label: "Total Units", value: totalSummary.qty.toLocaleString(), color: "text-white" },
            { label: "New Today", value: totalSummary.newToday, color: "text-emerald-400" },
            { label: "Sources Live", value: 3, color: "text-purple-400" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 shrink-0">
              <span className={`font-bold ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          ))}
          <div className="ml-auto shrink-0">
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/wsc/stock/download`;
                a.download = `KTCorp_Stock_${new Date().toISOString().slice(0,10)}.xlsx`;
                a.click();
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-1.5 transition-colors"
              data-testid="button-kt-download"
            >
              <Download className="w-3 h-3" /> Export All
            </button>
          </div>
        </div>
      </div>

      {/* Source tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        {/* Main navigation */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 max-w-lg mb-5">
          {([
            { key: "marketplace", label: "Marketplace", icon: Package },
            { key: "calendar", label: "Auction Calendar", icon: Calendar },
            { key: "history", label: `My Offers${(offerSessions as any[]).length ? ` (${(offerSessions as any[]).length})` : ""}`, icon: History },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setMainTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all
                ${mainTab === t.key ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              data-testid={`tab-kt-${t.key}`}>
              <t.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Marketplace ────────────────────────────────────────────── */}
        {mainTab === "marketplace" && (
          <div>
            {/* Source filter pills */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {[
                { key: "all", label: "All Sources" },
                { key: "WSC", label: "WeSellCellular" },
                { key: "ITOCHU", label: "Itochu Sourced" },
                { key: "SUPPLIERDIRECT", label: "Supplier Direct" },
              ].map(s => (
                <button key={s.key} onClick={() => setActiveSource(s.key)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-all font-medium
                    ${activeSource === s.key ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}
                  data-testid={`pill-source-${s.key}`}>
                  {s.label}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="relative flex-1 min-w-52">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search model, brand…"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  data-testid="input-kt-search" />
              </div>
              <Select value={filterCat} onValueChange={setFilterCat}>
                <SelectTrigger className="w-28 bg-slate-900 border-slate-700 text-slate-300 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white text-xs">All Types</SelectItem>
                  <SelectItem value="PHONES" className="text-white text-xs">Phones</SelectItem>
                  <SelectItem value="TABLETS" className="text-white text-xs">Tablets</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMfr} onValueChange={setFilterMfr}>
                <SelectTrigger className="w-28 bg-slate-900 border-slate-700 text-slate-300 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white text-xs">All Brands</SelectItem>
                  {manufacturers.map(m => <SelectItem key={m} value={m} className="text-white text-xs">{m}</SelectItem>)}
                </SelectContent>
              </Select>
              <button onClick={() => setOnlyNew(p => !p)}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-all ${onlyNew ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-300" : "border-slate-700 text-slate-400"}`}
                data-testid="button-kt-filter-new">
                <Sparkles className="w-3 h-3" /> New
              </button>
            </div>

            {/* Source summary cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {(summaryData as any[]).map((s: any) => {
                const cfg = SOURCE_CONFIG[s.source as keyof typeof SOURCE_CONFIG];
                if (!cfg) return null;
                return (
                  <button key={s.source} onClick={() => setActiveSource(s.source)}
                    className={`bg-slate-900 border rounded-xl p-3 text-left transition-all
                      ${activeSource === s.source ? "border-indigo-600 bg-indigo-950/20" : "border-slate-800 hover:border-slate-700"}`}
                    data-testid={`card-source-${s.source}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className="text-xs text-slate-300 font-medium truncate">{cfg.label}</span>
                    </div>
                    <p className="text-white font-bold text-lg">{Number(s.totalItems).toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{Number(s.totalQty).toLocaleString()} units</p>
                    {Number(s.newToday) > 0 && (
                      <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> {s.newToday} new
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Card grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-40 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No items match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {items.map(item => (
                  <StockCard key={item.id} item={item} onOffer={() => setOfferItem(item)} />
                ))}
              </div>
            )}
            {stockData?.total > items.length && (
              <p className="text-center text-xs text-slate-500 mt-4">Showing {items.length} of {stockData.total} items. Use filters to narrow down.</p>
            )}
          </div>
        )}

        {/* ── Auction Calendar Tab ────────────────────────────────────── */}
        {mainTab === "calendar" && (
          <div className="max-w-4xl space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="bg-indigo-950/50 border-b border-indigo-900/40 px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-amber-400 font-bold uppercase">Members Only</span>
                  <span className="text-xs text-slate-500 border border-slate-700 rounded px-1.5 py-0.5 ml-1">Private · Not Public</span>
                </div>
                <h3 className="text-white font-bold text-lg">US Source Auction Calendar</h3>
                <p className="text-slate-400 text-sm">Weekly auction windows from major US carrier and ITAD liquidation channels — available to verified KT Corp members.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-800/50">
                      <th className="px-5 py-3 text-left text-slate-300 font-semibold">Day (GST)</th>
                      <th className="px-5 py-3 text-left text-slate-300 font-semibold">Window</th>
                      <th className="px-5 py-3 text-left text-slate-300 font-semibold">Source</th>
                      <th className="px-5 py-3 text-left text-slate-300 font-semibold">Lot Type</th>
                      <th className="px-5 py-3 text-left text-slate-300 font-semibold">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AUCTION_CALENDAR.map((row, i) => {
                      const isToday = row.day === today;
                      return (
                        <tr key={row.day}
                          className={`border-b border-slate-800/50 ${isToday ? "bg-indigo-950/30" : "hover:bg-slate-800/30"}`}
                          data-testid={`row-calendar-${row.day.toLowerCase()}`}>
                          <td className="px-5 py-3">
                            <span className={`font-bold ${isToday ? "text-indigo-400" : "text-white"}`}>
                              {row.day}
                              {isToday && <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded">Today</span>}
                            </span>
                          </td>
                          <td className="px-5 py-3 font-mono text-slate-300 text-xs">{row.window}</td>
                          <td className="px-5 py-3 text-slate-200">{row.source}</td>
                          <td className="px-5 py-3 text-slate-300 text-xs">{row.lotType}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded font-medium border
                              ${row.access === "Priority" ? "bg-amber-900/30 text-amber-400 border-amber-700/40" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
                              {row.access}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-800 px-5 py-4 flex items-center justify-between">
                <p className="text-xs text-slate-400">Verified buyers receive weekly auction schedules, cut-off times, and live lot alerts via WhatsApp.</p>
                <a href="https://wa.me/971523946311?text=KT+Corp+Calendar+Access"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-2 rounded-lg"
                  data-testid="link-kt-calendar-wa">
                  <span>Request Calendar Access</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: "Verified Buyer Network", desc: "KYC-screened buyers only. All transactions escrow-protected." },
                { icon: Zap, title: "Real-Time Lot Alerts", desc: "Get WhatsApp and email alerts when matching lots drop." },
                { icon: Globe, title: "Global Delivery", desc: "FOB, CIF, DDP from US and Dubai to 120+ countries." },
              ].map(item => (
                <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3">
                  <item.icon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── My Offers Tab ──────────────────────────────────────────── */}
        {mainTab === "history" && (
          <div className="max-w-3xl space-y-3">
            {(offerSessions as any[]).length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No offers submitted yet.</p>
                <Button onClick={() => setMainTab("marketplace")} className="mt-4 bg-indigo-600 hover:bg-indigo-700">Browse Marketplace</Button>
              </div>
            ) : (offerSessions as any[]).map((s: any) => (
              <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5" data-testid={`card-kt-session-${s.id}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-indigo-400 font-bold text-sm">{s.sessionRef}</p>
                    <p className="text-white font-semibold mt-1">{s.totalItems} items · {formatUSD(s.totalValue)}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      <SourceBadge source={s.source} />
                      <span className="ml-2">{new Date(s.createdAt).toLocaleString()}</span>
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize
                    ${s.status === "submitted" ? "bg-indigo-900/30 text-indigo-400 border-indigo-700/40"
                    : s.status === "accepted" ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/40"
                    : "bg-slate-800 text-slate-400 border-slate-700"}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Offer detail modal */}
      <AnimatePresence>
        {offerItem && <OfferModal item={offerItem} onClose={() => setOfferItem(null)} onSubmit={addToCart} />}
      </AnimatePresence>

      {/* Cart bar */}
      <AnimatePresence>
        {cart.length > 0 && <CartBar lines={cart} onRemove={removeFromCart} onSubmit={handleSubmit} submitting={submitMut.isPending} />}
      </AnimatePresence>

      {/* Success modal */}
      <AnimatePresence>
        {successSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Offers Submitted!</h3>
              <div className="bg-slate-800 rounded-xl p-4 mb-5">
                <p className="font-mono text-indigo-400 font-bold">{successSession.sessionRef}</p>
                <p className="text-xs text-slate-400 mt-1">{successSession.totalItems} items · {formatUSD(successSession.totalValue)}</p>
              </div>
              <Button onClick={() => setSuccessSession(null)} className="w-full bg-indigo-600 hover:bg-indigo-700" data-testid="button-kt-close-success">Done</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
