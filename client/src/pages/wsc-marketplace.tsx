import { useState, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Download, Upload, ShoppingCart, CheckCircle2, Clock, X, LogIn,
  UserPlus, RefreshCw, Eye, EyeOff, FileSpreadsheet, Send, ChevronDown,
  Sparkles, Filter, Package, Building2, BarChart3, Star, Trash2, History
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

interface OfferLine {
  stockItemId: string;
  sku: string;
  manufacturer: string;
  model: string;
  grade: string;
  capacity: string;
  color: string;
  carrier: string;
  listPrice: number;
  offerQty: number;
  offerPrice: number;
}

interface Buyer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
  buyerTier: string;
  kycStatus: string;
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

const GRADE_COLORS: Record<string, string> = {
  "A-Stock": "bg-emerald-600/20 text-emerald-300 border-emerald-700/40",
  "A1-Stock": "bg-emerald-600/20 text-emerald-300 border-emerald-700/40",
  "A2-Stock": "bg-emerald-500/20 text-emerald-300 border-emerald-600/40",
  "B-Stock": "bg-sky-600/20 text-sky-300 border-sky-700/40",
  "B2-Stock": "bg-sky-600/20 text-sky-300 border-sky-700/40",
  "C-Stock": "bg-amber-600/20 text-amber-300 border-amber-700/40",
  "KFLB": "bg-orange-600/20 text-orange-300 border-orange-700/40",
  "PGL": "bg-red-600/20 text-red-300 border-red-700/40",
  "A2": "bg-emerald-600/20 text-emerald-300 border-emerald-700/40",
  "AP": "bg-purple-600/20 text-purple-300 border-purple-700/40",
  "S": "bg-yellow-600/20 text-yellow-300 border-yellow-700/40",
  "S1-B+": "bg-sky-500/20 text-sky-300 border-sky-600/40",
  "S1-B": "bg-blue-500/20 text-blue-300 border-blue-600/40",
  "S1-C": "bg-orange-500/20 text-orange-300 border-orange-600/40",
};

function GradePill({ grade }: { grade: string }) {
  const cls = GRADE_COLORS[grade] || "bg-slate-600/20 text-slate-300 border-slate-600/40";
  return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-bold border whitespace-nowrap ${cls}`}>{grade}</span>;
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
    onSuccess: (d) => { onSuccess(d.buyer, d.token); toast({ title: "Welcome!" }); },
    onError: (e: Error) => toast({ title: "Registration failed", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-lg">W</div>
            <div className="text-left">
              <div className="text-white font-black text-lg leading-none">WeSellCellular</div>
              <div className="text-blue-400 text-xs">buy.wesellcellular.com</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-2">Daily Stock Report — Buyer Portal</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Tabs value={mode} onValueChange={v => setMode(v as any)}>
            <TabsList className="w-full bg-slate-800 mb-5">
              <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={lf.handleSubmit(d => loginMut.mutate(d))} className="space-y-4">
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Email</Label>
                  <Input {...lf.register("email")} type="email" placeholder="you@company.com"
                    className="bg-slate-800 border-slate-700 text-white" data-testid="input-wsc-login-email" />
                </div>
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Password</Label>
                  <div className="relative">
                    <Input {...lf.register("password")} type={showPw ? "text" : "password"} placeholder="••••••••"
                      className="bg-slate-800 border-slate-700 text-white pr-10" data-testid="input-wsc-login-pw" />
                    <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loginMut.isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-wsc-login">
                  {loginMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={rf.handleSubmit(d => regMut.mutate(d))} className="space-y-3">
                {[
                  { name: "companyName" as const, label: "Company Name", placeholder: "ABC Mobile LLC" },
                  { name: "contactName" as const, label: "Contact Name", placeholder: "John Smith" },
                  { name: "email" as const, label: "Business Email", placeholder: "buyer@company.com" },
                  { name: "phone" as const, label: "Phone", placeholder: "+1 800 000 0000" },
                  { name: "country" as const, label: "Country", placeholder: "UAE" },
                ].map(f => (
                  <div key={f.name}>
                    <Label className="text-slate-300 text-xs mb-1 block">{f.label}</Label>
                    <Input {...rf.register(f.name)} placeholder={f.placeholder}
                      className="bg-slate-800 border-slate-700 text-white text-sm" data-testid={`input-wsc-reg-${f.name}`} />
                    {rf.formState.errors[f.name] && <p className="text-red-400 text-xs mt-0.5">{rf.formState.errors[f.name]?.message}</p>}
                  </div>
                ))}
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Password</Label>
                  <Input {...rf.register("password")} type="password" className="bg-slate-800 border-slate-700 text-white text-sm" data-testid="input-wsc-reg-pw" />
                  {rf.formState.errors.password && <p className="text-red-400 text-xs mt-0.5">{rf.formState.errors.password.message}</p>}
                </div>
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Confirm Password</Label>
                  <Input {...rf.register("confirmPassword")} type="password" className="bg-slate-800 border-slate-700 text-white text-sm" data-testid="input-wsc-reg-confirm" />
                  {rf.formState.errors.confirmPassword && <p className="text-red-400 text-xs mt-0.5">{rf.formState.errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" disabled={regMut.isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2" data-testid="button-wsc-register">
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

// ── Offer Cart Panel ──────────────────────────────────────────────────────────
function OfferCart({
  lines, onRemove, onSubmit, submitting,
}: {
  lines: OfferLine[]; onRemove: (sku: string) => void;
  onSubmit: () => void; submitting: boolean;
}) {
  const total = lines.reduce((s, l) => s + l.offerPrice * l.offerQty, 0);
  if (!lines.length) return null;
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-700 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold">{lines.length} offer{lines.length !== 1 ? "s" : ""} ready</span>
            <span className="text-slate-400 text-sm">· Total: <span className="text-blue-400 font-bold">{formatUSD(total)}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto max-w-md">
              {lines.slice(0, 3).map(l => (
                <div key={l.sku} className="flex items-center gap-1.5 bg-slate-800 rounded-lg px-2 py-1 shrink-0">
                  <span className="text-xs text-slate-300 font-mono">{l.sku}</span>
                  <span className="text-xs text-blue-400">{l.offerQty}u @ {formatUSD(l.offerPrice)}</span>
                  <button onClick={() => onRemove(l.sku)} className="text-slate-500 hover:text-red-400 ml-1"><X className="w-3 h-3" /></button>
                </div>
              ))}
              {lines.length > 3 && <span className="text-xs text-slate-400 shrink-0">+{lines.length - 3} more</span>}
            </div>
            <Button onClick={onSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-submit-offers">
              {submitting ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              Submit Offers
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Offer Success Modal ────────────────────────────────────────────────────────
function OfferSuccessModal({ session, onClose }: { session: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Offers Submitted!</h3>
        <p className="text-slate-400 text-sm mb-4">Your offer session has been received. The WeSellCellular team will review and respond within 2 business hours.</p>
        <div className="bg-slate-800 rounded-xl p-4 mb-5">
          <p className="text-xs text-slate-400 mb-1">Session Reference</p>
          <p className="text-blue-400 font-mono font-bold text-lg">{session.sessionRef}</p>
          <p className="text-xs text-slate-400 mt-2">{session.totalItems} item{session.totalItems !== 1 ? "s" : ""} · {formatUSD(session.totalValue)}</p>
        </div>
        <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-close-offer-success">Done</Button>
      </motion.div>
    </div>
  );
}

// ── Main WSC Marketplace ──────────────────────────────────────────────────────
export default function WscMarketplace() {
  const [buyer, setBuyer] = useState<Buyer | null>(getBuyer());
  const [tab, setTab] = useState<"stock" | "offers" | "upload">("stock");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterMfr, setFilterMfr] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [offerLines, setOfferLines] = useState<OfferLine[]>([]);
  const [inlineQty, setInlineQty] = useState<Record<string, string>>({});
  const [inlinePrice, setInlinePrice] = useState<Record<string, string>>({});
  const [successSession, setSuccessSession] = useState<any>(null);
  const [uploadParsed, setUploadParsed] = useState<any[]>([]);
  const uploadRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const qc = useQueryClient();

  const handleAuth = (b: Buyer, token: string) => { setAuth(token, b); setBuyer(b); };
  const handleLogout = () => { clearAuth(); setBuyer(null); };

  const params = new URLSearchParams({
    source: "WSC",
    ...(filterCat !== "all" ? { category: filterCat } : {}),
    ...(filterMfr !== "all" ? { manufacturer: filterMfr } : {}),
    ...(filterGrade !== "all" ? { grade: filterGrade } : {}),
    ...(onlyNew ? { newToday: "true" } : {}),
    ...(search ? { search } : {}),
    limit: "500",
  });

  const { data: stockData, isLoading } = useQuery({
    queryKey: ["/api/wsc/stock", params.toString()],
    queryFn: () => apiFetch(`/stock?${params}`),
    enabled: !!buyer,
    staleTime: 60000,
  });

  const { data: offerSessions = [] } = useQuery({
    queryKey: ["/api/wsc/offers"],
    queryFn: () => apiFetch("/offers"),
    enabled: !!buyer,
  });

  const items: StockItem[] = stockData?.items || [];

  const submitMut = useMutation({
    mutationFn: (data: any) => apiFetch("/offers", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (d) => {
      setSuccessSession(d);
      setOfferLines([]);
      setInlineQty({});
      setInlinePrice({});
      qc.invalidateQueries({ queryKey: ["/api/wsc/offers"] });
    },
    onError: (e: Error) => toast({ title: "Submit failed", description: e.message, variant: "destructive" }),
  });

  const parseMut = useMutation({
    mutationFn: (data: any) => apiFetch("/stock/parse-offers", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (d) => {
      setUploadParsed(d.parsed || []);
      toast({ title: `Parsed ${d.count} offer rows from spreadsheet` });
    },
    onError: (e: Error) => toast({ title: "Parse failed", description: e.message, variant: "destructive" }),
  });

  const handleAddToOffer = (item: StockItem) => {
    const qty = parseInt(inlineQty[item.sku] || "1");
    const price = parseFloat(inlinePrice[item.sku] || "");
    if (!qty || qty < 1) { toast({ title: "Enter a valid quantity", variant: "destructive" }); return; }
    if (!price || price <= 0) { toast({ title: "Enter your offer price", variant: "destructive" }); return; }
    if (qty > item.qtyAvailable) { toast({ title: `Only ${item.qtyAvailable} units available`, variant: "destructive" }); return; }

    const priceInCents = Math.round(price * 100);
    setOfferLines(prev => {
      const existing = prev.findIndex(l => l.sku === item.sku);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], offerQty: qty, offerPrice: priceInCents };
        return next;
      }
      return [...prev, {
        stockItemId: item.id, sku: item.sku, manufacturer: item.manufacturer,
        model: item.model, grade: item.grade, capacity: item.capacity || "",
        color: item.color || "", carrier: item.carrier || "",
        listPrice: item.listPrice, offerQty: qty, offerPrice: priceInCents,
      }];
    });
    toast({ title: "Added to offer", description: `${item.manufacturer} ${item.model} × ${qty}` });
  };

  const handleRemoveFromOffer = (sku: string) => {
    setOfferLines(prev => prev.filter(l => l.sku !== sku));
  };

  const handleSubmitOffers = () => {
    if (!offerLines.length) return;
    submitMut.mutate({ source: "WSC", items: offerLines });
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = `${API_BASE}/stock/download?source=WSC`;
    a.download = `Daily_Stock_report_-_WSC_-_${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const b64 = btoa(String.fromCharCode(...new Uint8Array(ev.target!.result as ArrayBuffer)));
      parseMut.mutate({ fileBase64: b64 });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmitUploadedOffers = () => {
    if (!uploadParsed.length) return;
    submitMut.mutate({ source: "WSC", items: uploadParsed.map((p: any) => ({ ...p, source: "WSC" })) });
  };

  const newTodayCount = items.filter(i => i.hasQtyAddedToday).length;
  const totalQty = items.reduce((s, i) => s + i.qtyAvailable, 0);

  const manufacturers = [...new Set(items.map(i => i.manufacturer))].sort();
  const grades = [...new Set(items.map(i => i.grade))].sort();

  if (!buyer) return <AuthGate onSuccess={handleAuth} />;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white" style={{ paddingBottom: offerLines.length ? 80 : 0 }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0f1a]/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-full px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">W</div>
            <div>
              <span className="text-white font-black text-sm">WeSellCellular</span>
              <span className="text-slate-400 text-xs ml-2">Daily Stock Report</span>
            </div>
            <span className="hidden sm:block text-xs text-slate-500 font-mono">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {newTodayCount > 0 && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 bg-emerald-900/20 border border-emerald-700/30 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> {newTodayCount} new today
              </span>
            )}
            {offerLines.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-900/20 border border-blue-700/30 px-2 py-1 rounded-full">
                <ShoppingCart className="w-3 h-3" /> {offerLines.length} in cart
              </span>
            )}
            <span className="text-xs text-slate-400 hidden sm:block">{buyer.companyName}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white text-xs" data-testid="button-wsc-logout">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-blue-950/20 border-b border-blue-900/30">
        <div className="max-w-full px-4 py-2 flex items-center gap-6 overflow-x-auto">
          {[
            { label: "Items Available", value: stockData?.total || 0, color: "text-blue-400" },
            { label: "Total Units", value: totalQty.toLocaleString(), color: "text-white" },
            { label: "New Today", value: newTodayCount, color: "text-emerald-400" },
            { label: "My Offers", value: (offerSessions as any[]).length, color: "text-purple-400" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 shrink-0">
              <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          ))}
          <div className="ml-auto flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={handleDownload}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-7" data-testid="button-download-xlsx">
              <Download className="w-3 h-3 mr-1" /> Download XLSX
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTab("upload")}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-7" data-testid="button-upload-xlsx">
              <Upload className="w-3 h-3 mr-1" /> Import Offers
            </Button>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="max-w-full px-4 pt-4">
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 max-w-md mb-5">
          {([
            { key: "stock", label: "Stock List", icon: FileSpreadsheet },
            { key: "upload", label: "Import Offers", icon: Upload },
            { key: "offers", label: `My Offers (${(offerSessions as any[]).length})`, icon: History },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all
                ${tab === t.key ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              data-testid={`tab-wsc-${t.key}`}>
              <t.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Stock List Tab ─────────────────────────────────────────── */}
        {tab === "stock" && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-52">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search model, brand, SKU…"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  data-testid="input-wsc-search" />
              </div>
              <Select value={filterCat} onValueChange={setFilterCat}>
                <SelectTrigger className="w-28 bg-slate-900 border-slate-700 text-slate-300 text-xs h-8" data-testid="select-wsc-cat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white text-xs">All Categories</SelectItem>
                  <SelectItem value="PHONES" className="text-white text-xs">Phones</SelectItem>
                  <SelectItem value="TABLETS" className="text-white text-xs">Tablets</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMfr} onValueChange={setFilterMfr}>
                <SelectTrigger className="w-28 bg-slate-900 border-slate-700 text-slate-300 text-xs h-8" data-testid="select-wsc-mfr">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white text-xs">All Brands</SelectItem>
                  {manufacturers.map(m => <SelectItem key={m} value={m} className="text-white text-xs">{m}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-28 bg-slate-900 border-slate-700 text-slate-300 text-xs h-8" data-testid="select-wsc-grade">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white text-xs">All Grades</SelectItem>
                  {grades.map(g => <SelectItem key={g} value={g} className="text-white text-xs">{g}</SelectItem>)}
                </SelectContent>
              </Select>
              <button onClick={() => setOnlyNew(p => !p)}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-all ${onlyNew ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-300" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}
                data-testid="button-wsc-filter-new">
                <Sparkles className="w-3 h-3" /> New Today
              </button>
            </div>

            {/* Spreadsheet Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 border-b border-slate-700">
                    {["Item #", "Category", "Manufacturer", "Model", "Grade", "Cap", "Carrier", "Color", "Lock", "Qty", "List Price", "New", "Offer Qty", "Offer Price", ""].map(h => (
                      <th key={h} className="px-2 py-2 text-left text-slate-300 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    [...Array(12)].map((_, i) => (
                      <tr key={i} className="border-b border-slate-800/50">
                        {[...Array(15)].map((_, j) => (
                          <td key={j} className="px-2 py-2"><div className="h-3 bg-slate-800 rounded animate-pulse" /></td>
                        ))}
                      </tr>
                    ))
                  ) : items.map(item => {
                    const inCart = offerLines.some(l => l.sku === item.sku);
                    return (
                      <tr key={item.id}
                        className={`border-b border-slate-800/50 transition-colors
                          ${item.hasQtyAddedToday ? "bg-emerald-950/20 hover:bg-emerald-950/30" : "hover:bg-slate-800/30"}
                          ${inCart ? "bg-blue-950/20" : ""}`}
                        data-testid={`row-stock-${item.sku}`}
                      >
                        <td className="px-2 py-1.5 font-mono text-slate-300">{item.sku}</td>
                        <td className="px-2 py-1.5 text-slate-400">{item.category}</td>
                        <td className="px-2 py-1.5 text-white font-medium">{item.manufacturer}</td>
                        <td className="px-2 py-1.5 text-white">{item.model}</td>
                        <td className="px-2 py-1.5"><GradePill grade={item.grade} /></td>
                        <td className="px-2 py-1.5 text-slate-300 whitespace-nowrap">{item.capacity}</td>
                        <td className="px-2 py-1.5 text-slate-300 whitespace-nowrap">{item.carrier}</td>
                        <td className="px-2 py-1.5 text-slate-300 whitespace-nowrap">{item.color}</td>
                        <td className="px-2 py-1.5 text-slate-400">{item.lockStatus}</td>
                        <td className="px-2 py-1.5 font-bold text-white text-center">{item.qtyAvailable}</td>
                        <td className="px-2 py-1.5 font-bold text-blue-400 whitespace-nowrap">{formatUSD(item.listPrice)}</td>
                        <td className="px-2 py-1.5 text-center">
                          {item.hasQtyAddedToday && <Sparkles className="w-3.5 h-3.5 text-emerald-400 mx-auto" />}
                        </td>
                        <td className="px-2 py-1.5">
                          <input type="number" min="1" max={item.qtyAvailable}
                            value={inlineQty[item.sku] || ""}
                            onChange={e => setInlineQty(p => ({ ...p, [item.sku]: e.target.value }))}
                            placeholder="Qty"
                            className="w-14 bg-slate-800 border border-slate-600 rounded px-1 py-0.5 text-white text-xs text-center focus:outline-none focus:border-blue-500"
                            data-testid={`input-offer-qty-${item.sku}`}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <div className="flex items-center">
                            <span className="text-slate-400 text-xs mr-0.5">$</span>
                            <input type="number" step="0.01" min="0"
                              value={inlinePrice[item.sku] || ""}
                              onChange={e => setInlinePrice(p => ({ ...p, [item.sku]: e.target.value }))}
                              placeholder="0.00"
                              className="w-16 bg-slate-800 border border-slate-600 rounded px-1 py-0.5 text-white text-xs focus:outline-none focus:border-blue-500"
                              data-testid={`input-offer-price-${item.sku}`}
                            />
                          </div>
                        </td>
                        <td className="px-2 py-1.5">
                          {inCart ? (
                            <button onClick={() => handleRemoveFromOffer(item.sku)}
                              className="text-red-400 hover:text-red-300 p-0.5" data-testid={`button-remove-offer-${item.sku}`}>
                              <X className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button onClick={() => handleAddToOffer(item)}
                              className="text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-800/40 rounded px-2 py-0.5 text-xs font-medium transition-all"
                              data-testid={`button-add-offer-${item.sku}`}>
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!isLoading && items.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No items match your filters.</p>
                </div>
              )}
            </div>

            {/* How it works info */}
            <div className="mt-6 bg-blue-950/20 border border-blue-900/30 rounded-xl p-4 flex gap-3">
              <FileSpreadsheet className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-300/80">
                <strong className="text-blue-300">How to place offers:</strong> Enter your desired quantity in "Offer Qty" and price in "Offer Price" for each item, then click Add.
                Or download the spreadsheet, fill in the offer columns, and use Import Offers to upload it back.
                Submit all your offers at once with the "Submit Offers" button.
              </div>
            </div>
          </div>
        )}

        {/* ── Import Offers Tab ──────────────────────────────────────── */}
        {tab === "upload" && (
          <div className="max-w-2xl space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Upload className="w-5 h-5 text-blue-400" /> Import Offers from Spreadsheet</h3>
              <p className="text-slate-400 text-sm mb-5">Download today's stock list, fill in the "New Offer Quantity" and "New Offer Price" columns, then upload here to submit your offers in bulk.</p>

              <div className="flex gap-3 mb-5">
                <Button variant="outline" onClick={handleDownload} className="border-slate-700 text-slate-300 hover:bg-slate-800" data-testid="button-download-for-import">
                  <Download className="w-4 h-4 mr-2" /> 1. Download Stock List
                </Button>
              </div>

              <div
                className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-600 transition-colors"
                onClick={() => uploadRef.current?.click()}
                data-testid="drop-zone-upload"
              >
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">2. Drop your completed spreadsheet here or <span className="text-blue-400">browse</span></p>
                <p className="text-slate-500 text-xs mt-1">Supports .xlsx files with "New Offer Quantity" and "New Offer Price" columns filled</p>
                <input ref={uploadRef} type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" data-testid="input-file-upload" />
              </div>

              {parseMut.isPending && (
                <div className="flex items-center gap-2 mt-4 text-slate-400 text-sm">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Parsing spreadsheet…
                </div>
              )}
            </div>

            {uploadParsed.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-emerald-950/30 border-b border-emerald-900/40 px-5 py-3 flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {uploadParsed.length} offer rows parsed
                  </span>
                  <Button onClick={handleSubmitUploadedOffers} disabled={submitMut.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7" data-testid="button-submit-imported-offers">
                    {submitMut.isPending ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <Send className="w-3 h-3 mr-1" />}
                    Submit {uploadParsed.length} Offers
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="bg-slate-800 border-b border-slate-700">
                      {["SKU", "Manufacturer", "Model", "Grade", "Cap", "Color", "List Price", "Offer Qty", "Offer Price"].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-slate-300">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {uploadParsed.map((p, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="px-3 py-1.5 font-mono text-slate-300">{p.sku}</td>
                          <td className="px-3 py-1.5 text-white">{p.manufacturer}</td>
                          <td className="px-3 py-1.5 text-white">{p.model}</td>
                          <td className="px-3 py-1.5"><GradePill grade={p.grade} /></td>
                          <td className="px-3 py-1.5 text-slate-300">{p.capacity}</td>
                          <td className="px-3 py-1.5 text-slate-300">{p.color}</td>
                          <td className="px-3 py-1.5 text-blue-400">{formatUSD(p.listPrice)}</td>
                          <td className="px-3 py-1.5 font-bold text-white">{p.offerQty}</td>
                          <td className="px-3 py-1.5 font-bold text-emerald-400">{formatUSD(p.offerPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── My Offers Tab ──────────────────────────────────────────── */}
        {tab === "offers" && (
          <div className="max-w-3xl space-y-3">
            {(offerSessions as any[]).length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No offers submitted yet.</p>
                <Button onClick={() => setTab("stock")} className="mt-4 bg-blue-600 hover:bg-blue-700">Browse Stock List</Button>
              </div>
            ) : (offerSessions as any[]).map((s: any) => (
              <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5" data-testid={`card-session-${s.id}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-blue-400 font-bold text-sm">{s.sessionRef}</p>
                    <p className="text-white font-semibold mt-1">{s.totalItems} items · {formatUSD(s.totalValue)}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(s.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize
                    ${s.status === "submitted" ? "bg-blue-900/30 text-blue-400 border-blue-700/40"
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

      {/* Floating offer cart */}
      <AnimatePresence>
        {offerLines.length > 0 && (
          <OfferCart lines={offerLines} onRemove={handleRemoveFromOffer} onSubmit={handleSubmitOffers} submitting={submitMut.isPending} />
        )}
      </AnimatePresence>

      {/* Success modal */}
      <AnimatePresence>
        {successSession && <OfferSuccessModal session={successSession} onClose={() => setSuccessSession(null)} />}
      </AnimatePresence>
    </div>
  );
}
