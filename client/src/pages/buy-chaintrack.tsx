import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Package, Shield, Gavel, ShoppingCart, Search, Filter, Clock, CheckCircle2,
  TrendingDown, Globe, Award, Lock, AlertCircle, ChevronRight, Boxes,
  FileCheck, Truck, Star, Building2, LogIn, UserPlus, X, Eye, EyeOff,
  ArrowRight, BarChart3, Zap, Layers, CreditCard, RefreshCw, Download,
  MapPin, Phone, Mail, Hash, Calendar, Weight, Tag, ExternalLink, ChevronDown
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const API_BASE = "/api/buy";
const TOKEN_KEY = "buy_chaintrack_token";
const BUYER_KEY = "buy_chaintrack_buyer";

// ── Types ────────────────────────────────────────────────────────────────────
interface BuyLot {
  id: string;
  lotNumber: string;
  productName: string;
  productType: string;
  brand: string;
  model: string;
  grade: string;
  quantity: number;
  availableQty: number;
  unitPrice: number;
  lotPrice: number;
  currency: string;
  originCountry: string;
  supplierName: string;
  hsCode?: string;
  condition: string;
  batteryHealth?: number;
  functionalScore: number;
  cosmeticScore: number;
  inspectionStatus: string;
  inspectedBy?: string;
  inspectedAt?: string;
  clearanceStatus: string;
  exportReady: boolean;
  minOrderQty: number;
  lotType: string;
  auctionEndDate?: string;
  startingBid?: number;
  currentBid?: number;
  bidCount: number;
  tags: string[];
  defects: string[];
  incoterms: string[];
  status: string;
}

interface BuyBuyer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
  phone: string;
  country: string;
  buyerTier: string;
  kycStatus: string;
  totalOrders: number;
  totalSpend: number;
  createdAt: string;
}

interface BuyOrder {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: string;
  paymentStatus: string;
  shipmentStatus: string;
  escrowNumber?: string;
  destinationCountry: string;
  incoterm: string;
  estimatedDelivery?: string;
  createdAt: string;
}

// ── Auth helpers ──────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem(TOKEN_KEY); }
function getBuyer(): BuyBuyer | null {
  try { return JSON.parse(localStorage.getItem(BUYER_KEY) || "null"); } catch { return null; }
}
function setAuth(token: string, buyer: BuyBuyer) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(BUYER_KEY, JSON.stringify(buyer));
}
function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(BUYER_KEY);
}

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

// ── Helper components ─────────────────────────────────────────────────────────
function GradeBadge({ grade }: { grade: string }) {
  const cfg: Record<string, string> = {
    "A+": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    "A":  "bg-green-500/20 text-green-300 border-green-500/40",
    "B+": "bg-sky-500/20 text-sky-300 border-sky-500/40",
    "B":  "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "C":  "bg-amber-500/20 text-amber-300 border-amber-500/40",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${cfg[grade] || "bg-slate-700 text-slate-300 border-slate-600"}`}>
      Grade {grade}
    </span>
  );
}

function ClearanceBadge({ status }: { status: string }) {
  if (status === "cleared") return (
    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
      <CheckCircle2 className="w-3 h-3" /> Clearance Passed
    </span>
  );
  if (status === "held") return (
    <span className="inline-flex items-center gap-1 text-xs text-amber-400">
      <AlertCircle className="w-3 h-3" /> Held for Review
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
      <Clock className="w-3 h-3" /> Clearance Pending
    </span>
  );
}

function ScoreBar({ label, score, color = "bg-emerald-500" }: { label: string; score: number; color?: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-bold text-white">{score}%</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    function calc() {
      const diff = new Date(endDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("ENDED"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }
    calc();
    const i = setInterval(calc, 1000);
    return () => clearInterval(i);
  }, [endDate]);
  const ended = timeLeft === "ENDED";
  return (
    <span className={`font-mono text-sm font-bold ${ended ? "text-red-400" : "text-orange-400"}`}>
      {timeLeft}
    </span>
  );
}

function formatUSD(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// ── Auth Modal ────────────────────────────────────────────────────────────────
const registerSchema = z.object({
  companyName: z.string().min(2, "Company name required"),
  contactName: z.string().min(2, "Contact name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  country: z.string().min(2, "Country required"),
  tradeLicense: z.string().optional(),
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function AuthModal({ onSuccess }: { onSuccess: (buyer: BuyBuyer, token: string) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const regForm = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) });

  const loginMut = useMutation({
    mutationFn: (data: z.infer<typeof loginSchema>) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (d) => { onSuccess(d.buyer, d.token); toast({ title: "Welcome back!", description: d.buyer.companyName }); },
    onError: (e: Error) => toast({ title: "Login failed", description: e.message, variant: "destructive" }),
  });

  const regMut = useMutation({
    mutationFn: (data: z.infer<typeof registerSchema>) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (d) => { onSuccess(d.buyer, d.token); toast({ title: "Account created!", description: "KYC review will be completed within 24h." }); },
    onError: (e: Error) => toast({ title: "Registration failed", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-xl leading-none">buy.chaintrack</div>
              <div className="text-orange-400 text-xs font-mono tracking-wider">.com</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm">Verified Wholesale Buyer Portal</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Tabs value={mode} onValueChange={v => setMode(v as any)}>
            <TabsList className="w-full bg-slate-800 mb-6">
              <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <UserPlus className="w-4 h-4 mr-2" /> Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(d => loginMut.mutate(d))} className="space-y-4">
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Company Email</Label>
                  <Input {...loginForm.register("email")} type="email" placeholder="you@company.com"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" data-testid="input-login-email" />
                  {loginForm.formState.errors.email && <p className="text-red-400 text-xs mt-1">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Password</Label>
                  <div className="relative">
                    <Input {...loginForm.register("password")} type={showPw ? "text" : "password"} placeholder="••••••••"
                      className="bg-slate-800 border-slate-700 text-white pr-10" data-testid="input-login-password" />
                    <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loginMut.isPending} className="w-full bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-login-submit">
                  {loginMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={regForm.handleSubmit(d => regMut.mutate(d))} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Company Name *</Label>
                    <Input {...regForm.register("companyName")} placeholder="ABC Trading LLC"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm" data-testid="input-reg-company" />
                    {regForm.formState.errors.companyName && <p className="text-red-400 text-xs mt-0.5">{regForm.formState.errors.companyName.message}</p>}
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Contact Name *</Label>
                    <Input {...regForm.register("contactName")} placeholder="John Smith"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm" data-testid="input-reg-contact" />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Business Email *</Label>
                  <Input {...regForm.register("email")} type="email" placeholder="procurement@company.com"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" data-testid="input-reg-email" />
                  {regForm.formState.errors.email && <p className="text-red-400 text-xs mt-0.5">{regForm.formState.errors.email.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Phone *</Label>
                    <Input {...regForm.register("phone")} placeholder="+971 50 000 0000"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm" data-testid="input-reg-phone" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Country *</Label>
                    <Input {...regForm.register("country")} placeholder="UAE"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm" data-testid="input-reg-country" />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300 text-xs mb-1 block">Trade License No.</Label>
                  <Input {...regForm.register("tradeLicense")} placeholder="TL-2024-XXXXX"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" data-testid="input-reg-trade-license" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Password *</Label>
                    <Input {...regForm.register("password")} type="password" placeholder="Min. 8 chars"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm" data-testid="input-reg-password" />
                    {regForm.formState.errors.password && <p className="text-red-400 text-xs mt-0.5">{regForm.formState.errors.password.message}</p>}
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Confirm *</Label>
                    <Input {...regForm.register("confirmPassword")} type="password" placeholder="Repeat"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm" data-testid="input-reg-confirm-pw" />
                    {regForm.formState.errors.confirmPassword && <p className="text-red-400 text-xs mt-0.5">{regForm.formState.errors.confirmPassword.message}</p>}
                  </div>
                </div>
                <Button type="submit" disabled={regMut.isPending} className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2" data-testid="button-reg-submit">
                  {regMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                  Create Buyer Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
            <Shield className="w-4 h-4 text-slate-500 shrink-0" />
            <p className="text-xs text-slate-500">All buyers undergo KYC verification. Transactions protected by escrow.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Lot Detail Modal ──────────────────────────────────────────────────────────
const orderSchema = z.object({
  quantity: z.number().min(1),
  incoterm: z.string().min(1),
  destinationCountry: z.string().min(2),
  notes: z.string().optional(),
});

function LotDetailModal({ lot, onClose, buyer }: { lot: BuyLot; onClose: () => void; buyer: BuyBuyer }) {
  const [tab, setTab] = useState<"details" | "inspection" | "order">("details");
  const { toast } = useToast();
  const qc = useQueryClient();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: { quantity: lot.minOrderQty, incoterm: lot.incoterms[0] || "FOB", destinationCountry: buyer.country },
  });

  const watchQty = form.watch("quantity");
  const unitPrice = lot.lotType === "supplier_feed" ? lot.unitPrice : (lot.currentBid || lot.startingBid || 0);
  const total = (watchQty || 0) * unitPrice;

  const orderMut = useMutation({
    mutationFn: (data: z.infer<typeof orderSchema>) =>
      apiFetch("/orders", { method: "POST", body: JSON.stringify({ lotId: lot.id, ...data }) }),
    onSuccess: () => {
      toast({ title: "Order Confirmed!", description: "Escrow reference generated. Check My Orders for details." });
      qc.invalidateQueries({ queryKey: ["/api/buy/orders"] });
      qc.invalidateQueries({ queryKey: ["/api/buy/lots"] });
      onClose();
    },
    onError: (e: Error) => toast({ title: "Order failed", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400">{lot.lotNumber}</span>
              <GradeBadge grade={lot.grade} />
              {lot.exportReady && (
                <span className="text-xs bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded">Export Ready</span>
              )}
            </div>
            <h2 className="text-white font-bold text-lg leading-tight">{lot.productName}</h2>
            <p className="text-slate-400 text-sm mt-0.5">{lot.supplierName} · {lot.originCountry}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1" data-testid="button-close-lot-modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab nav */}
        <div className="flex border-b border-slate-700 bg-slate-850">
          {(["details", "inspection", "order"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                tab === t ? "text-orange-400 border-b-2 border-orange-500" : "text-slate-400 hover:text-slate-200"
              }`}
              data-testid={`tab-lot-${t}`}
            >
              {t === "details" ? "Lot Details" : t === "inspection" ? "Inspection Report" : "Place Order"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === "details" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Available Units</p>
                  <p className="text-2xl font-bold text-white">{lot.availableQty.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">of {lot.quantity.toLocaleString()} total</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    {lot.lotType === "reverse_bid" ? "Current Best Bid" : "Unit Price"}
                  </p>
                  <p className="text-2xl font-bold text-orange-400">
                    {lot.lotType === "reverse_bid"
                      ? formatUSD(lot.currentBid || lot.startingBid || 0)
                      : formatUSD(lot.unitPrice)}
                  </p>
                  <p className="text-xs text-slate-500">{lot.currency} per unit</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  ["Brand / Model", `${lot.brand} ${lot.model}`],
                  ["Product Type", lot.productType.replace("_", " ")],
                  ["Condition", lot.condition.replace("_", " ")],
                  ["HS Code", lot.hsCode || "—"],
                  ["Min. Order Qty", `${lot.minOrderQty} units`],
                  ...(lot.lotType === "reverse_bid" && lot.auctionEndDate ? [["Auction Ends", new Date(lot.auctionEndDate).toLocaleString()]] : []),
                  ["Origin Country", lot.originCountry],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-2 border-b border-slate-800">
                    <span className="text-slate-400">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>

              {lot.defects.length > 0 && (
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4">
                  <p className="text-amber-400 text-xs font-bold mb-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> KNOWN DEFECTS / NOTES
                  </p>
                  <ul className="space-y-1">
                    {lot.defects.map((d, i) => <li key={i} className="text-amber-300 text-xs">· {d}</li>)}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-xs text-slate-400 mb-2">Supported Incoterms</p>
                <div className="flex flex-wrap gap-2">
                  {lot.incoterms.map(t => (
                    <span key={t} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded-md">{t}</span>
                  ))}
                </div>
              </div>

              {lot.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {lot.tags.map(t => (
                    <span key={t} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "inspection" && (
            <div className="space-y-5">
              <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-emerald-300 font-semibold">Inspection Completed</p>
                  <p className="text-emerald-400/70 text-xs">{lot.inspectedBy}</p>
                  {lot.inspectedAt && <p className="text-slate-400 text-xs mt-0.5">{new Date(lot.inspectedAt).toLocaleDateString("en-GB")}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <ScoreBar label="Functional Score" score={lot.functionalScore} color="bg-emerald-500" />
                <ScoreBar label="Cosmetic Score" score={lot.cosmeticScore} color="bg-sky-500" />
                {lot.batteryHealth && <ScoreBar label="Battery Health" score={lot.batteryHealth} color="bg-orange-500" />}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "KYC / AML", value: "Passed", color: "text-emerald-400" },
                  { label: "Customs HS", value: lot.hsCode || "Verified", color: "text-sky-400" },
                  { label: "Export Clearance", value: lot.clearanceStatus === "cleared" ? "Cleared" : "Pending", color: lot.clearanceStatus === "cleared" ? "text-emerald-400" : "text-amber-400" },
                ].map(item => (
                  <div key={item.label} className="bg-slate-800 rounded-xl p-3">
                    <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Inspection Summary</p>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lot Condition</span>
                  <span className="text-white capitalize">{lot.condition.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Export Ready</span>
                  <span className={lot.exportReady ? "text-emerald-400" : "text-amber-400"}>{lot.exportReady ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Clearance Status</span>
                  <ClearanceBadge status={lot.clearanceStatus} />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certified By</span>
                  <span className="text-white text-xs">{lot.inspectedBy || "ChainTrack"}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-500">Full inspection certificate available upon order confirmation.</p>
              </div>
            </div>
          )}

          {tab === "order" && (
            <form onSubmit={form.handleSubmit(d => orderMut.mutate(d))} className="space-y-5">
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Order Configuration</p>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Quantity (min: {lot.minOrderQty})</Label>
                    <Input
                      type="number"
                      min={lot.minOrderQty}
                      max={lot.availableQty}
                      {...form.register("quantity", { valueAsNumber: true })}
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-order-quantity"
                    />
                    {form.formState.errors.quantity && <p className="text-red-400 text-xs mt-1">{form.formState.errors.quantity.message}</p>}
                  </div>

                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Incoterm</Label>
                    <Select onValueChange={v => form.setValue("incoterm", v)} defaultValue={lot.incoterms[0] || "FOB"}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white" data-testid="select-incoterm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {["FOB Dubai", "CIF", "EXW Dubai", "DDP", "CIF Buyer's Port"].map(i => (
                          <SelectItem key={i} value={i} className="text-white hover:bg-slate-700">{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Destination Country</Label>
                    <Input
                      {...form.register("destinationCountry")}
                      placeholder="e.g. Kazakhstan"
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-destination"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 text-xs mb-1 block">Notes (optional)</Label>
                    <Input
                      {...form.register("notes")}
                      placeholder="Special packaging, labeling requirements..."
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-order-notes"
                    />
                  </div>
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-orange-950/30 border border-orange-700/30 rounded-xl p-4 space-y-2">
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Order Summary</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{(watchQty || 0).toLocaleString()} units × {formatUSD(unitPrice)}</span>
                  <span className="text-white font-bold text-lg">{formatUSD(total)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Escrow Protected</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Funds held in escrow</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Est. Delivery</span>
                  <span>~21 days after payment</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={orderMut.isPending || !lot.availableQty}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-bold"
                data-testid="button-place-order"
              >
                {orderMut.isPending ? (
                  <><RefreshCw className="w-4 h-4 animate-spin mr-2" /> Processing…</>
                ) : (
                  <><ShoppingCart className="w-5 h-5 mr-2" /> Confirm Order — {formatUSD(total)}</>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                By placing this order, funds will be held in ChainTrack escrow pending shipment confirmation.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Bid Modal ─────────────────────────────────────────────────────────────────
const bidSchema = z.object({
  bidAmount: z.number().min(1, "Enter a bid amount"),
  quantity: z.number().min(1),
});

function BidModal({ lot, onClose }: { lot: BuyLot; onClose: () => void }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const currentBest = lot.currentBid || lot.startingBid || 0;

  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: { bidAmount: Math.floor(currentBest * 0.97) / 100, quantity: lot.minOrderQty },
  });

  const bidMut = useMutation({
    mutationFn: (data: z.infer<typeof bidSchema>) =>
      apiFetch("/bids", { method: "POST", body: JSON.stringify({ lotId: lot.id, bidAmount: Math.round(data.bidAmount * 100), quantity: data.quantity }) }),
    onSuccess: () => {
      toast({ title: "Bid Submitted!", description: "You are now the leading bidder. You'll be notified if outbid." });
      qc.invalidateQueries({ queryKey: ["/api/buy/lots"] });
      onClose();
    },
    onError: (e: Error) => toast({ title: "Bid failed", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-bold">Place Reverse Bid</h3>
            <p className="text-slate-400 text-sm">{lot.lotNumber}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white" data-testid="button-close-bid-modal"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Starting Price</span>
            <span className="text-white">{formatUSD(lot.startingBid || 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Current Best Bid</span>
            <span className="text-orange-400 font-bold">{formatUSD(currentBest)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Bids So Far</span>
            <span className="text-white">{lot.bidCount}</span>
          </div>
          {lot.auctionEndDate && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Time Remaining</span>
              <CountdownTimer endDate={lot.auctionEndDate} />
            </div>
          )}
        </div>

        <form onSubmit={form.handleSubmit(d => bidMut.mutate(d))} className="space-y-4">
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Your Bid Amount (USD) — must be below {formatUSD(currentBest)}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <Input
                type="number"
                step="100"
                {...form.register("bidAmount", { valueAsNumber: true })}
                className="bg-slate-800 border-slate-700 text-white pl-7"
                data-testid="input-bid-amount"
              />
            </div>
            {form.formState.errors.bidAmount && <p className="text-red-400 text-xs mt-1">{form.formState.errors.bidAmount.message}</p>}
          </div>
          <div>
            <Label className="text-slate-300 text-xs mb-1 block">Quantity (min: {lot.minOrderQty})</Label>
            <Input type="number" min={lot.minOrderQty} {...form.register("quantity", { valueAsNumber: true })}
              className="bg-slate-800 border-slate-700 text-white" data-testid="input-bid-quantity" />
          </div>

          <Button type="submit" disabled={bidMut.isPending} className="w-full bg-purple-600 hover:bg-purple-700 text-white" data-testid="button-submit-bid">
            {bidMut.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Gavel className="w-4 h-4 mr-2" />}
            Submit Bid
          </Button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-3">
          In reverse bidding, the LOWEST qualified bid wins. Bid below the current best to compete.
        </p>
      </motion.div>
    </div>
  );
}

// ── Lot Card ──────────────────────────────────────────────────────────────────
function LotCard({ lot, onSelect, onBid }: {
  lot: BuyLot;
  onSelect: () => void;
  onBid: () => void;
}) {
  const isAuction = lot.lotType === "reverse_bid";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`bg-slate-900 border rounded-xl overflow-hidden cursor-pointer transition-colors
        ${isAuction ? "border-purple-700/50 hover:border-purple-600" : "border-slate-700 hover:border-orange-600/60"}`}
      data-testid={`card-lot-${lot.id}`}
    >
      {/* Lot type banner */}
      <div className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between
        ${isAuction ? "bg-purple-900/60 text-purple-300" : "bg-slate-800 text-slate-400"}`}>
        <span className="flex items-center gap-1.5">
          {isAuction ? <><Gavel className="w-3 h-3" /> Reverse Bid Auction</> : <><Package className="w-3 h-3" /> Supplier Feed</>}
        </span>
        {isAuction && lot.auctionEndDate && <CountdownTimer endDate={lot.auctionEndDate} />}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="text-xs font-mono text-slate-500">{lot.lotNumber}</span>
              <GradeBadge grade={lot.grade} />
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{lot.productName}</h3>
            <p className="text-slate-400 text-xs mt-0.5">{lot.supplierName} · {lot.originCountry}</p>
          </div>
          <div className="text-right shrink-0">
            {isAuction ? (
              <div>
                <p className="text-purple-300 font-bold text-lg">{formatUSD(lot.currentBid || lot.startingBid || 0)}</p>
                <p className="text-xs text-slate-500">{lot.bidCount} bids</p>
              </div>
            ) : (
              <div>
                <p className="text-orange-400 font-bold text-lg">{formatUSD(lot.unitPrice)}</p>
                <p className="text-xs text-slate-500">per unit</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1"><Boxes className="w-3 h-3" /> {lot.availableQty.toLocaleString()} units</span>
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {lot.condition.replace("_", " ")}</span>
          {lot.batteryHealth && <span>🔋 {lot.batteryHealth}%</span>}
        </div>

        <div className="flex items-center justify-between">
          <ClearanceBadge status={lot.clearanceStatus} />
          <div className="flex gap-2">
            {isAuction ? (
              <Button size="sm" onClick={e => { e.stopPropagation(); onBid(); }}
                className="bg-purple-600 hover:bg-purple-700 text-white h-7 px-3 text-xs" data-testid={`button-bid-${lot.id}`}>
                <Gavel className="w-3 h-3 mr-1" /> Bid
              </Button>
            ) : null}
            <Button size="sm" onClick={onSelect}
              className={`text-white h-7 px-3 text-xs ${isAuction ? "bg-slate-700 hover:bg-slate-600" : "bg-orange-500 hover:bg-orange-600"}`}
              data-testid={`button-view-lot-${lot.id}`}>
              {isAuction ? <><Eye className="w-3 h-3 mr-1" /> View</> : <><ShoppingCart className="w-3 h-3 mr-1" /> Order</>}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Buyer Portal ──────────────────────────────────────────────────────────
export default function BuyChaintrackPage() {
  const [buyer, setBuyer] = useState<BuyBuyer | null>(getBuyer());
  const [selectedLot, setSelectedLot] = useState<BuyLot | null>(null);
  const [bidLot, setBidLot] = useState<BuyLot | null>(null);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterBrand, setFilterBrand] = useState("all");
  const [tab, setTab] = useState<"marketplace" | "reverse_bids" | "orders" | "account">("marketplace");
  const { toast } = useToast();

  const handleAuth = (b: BuyBuyer, token: string) => {
    setAuth(token, b);
    setBuyer(b);
  };
  const handleLogout = () => { clearAuth(); setBuyer(null); };

  const { data: lots = [], isLoading: lotsLoading, refetch: refetchLots } = useQuery<BuyLot[]>({
    queryKey: ["/api/buy/lots"],
    queryFn: () => apiFetch("/lots"),
    refetchInterval: 30000,
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<BuyOrder[]>({
    queryKey: ["/api/buy/orders"],
    queryFn: () => apiFetch("/orders"),
    enabled: !!buyer,
  });

  const feedLots = lots.filter(l => l.lotType === "supplier_feed");
  const auctionLots = lots.filter(l => l.lotType === "reverse_bid");

  const filteredFeed = feedLots.filter(l => {
    const matchSearch = !search || l.productName.toLowerCase().includes(search.toLowerCase()) ||
      l.brand.toLowerCase().includes(search.toLowerCase()) || l.model.toLowerCase().includes(search.toLowerCase());
    const matchGrade = filterGrade === "all" || l.grade === filterGrade;
    const matchBrand = filterBrand === "all" || l.brand === filterBrand;
    return matchSearch && matchGrade && matchBrand;
  });

  const filteredAuctions = auctionLots.filter(l => {
    const matchSearch = !search || l.productName.toLowerCase().includes(search.toLowerCase()) || l.brand.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const brands = [...new Set(lots.map(l => l.brand))];

  const statusColor: Record<string, string> = {
    confirmed: "text-emerald-400", shipped: "text-sky-400", delivered: "text-emerald-400",
    pending: "text-amber-400", cancelled: "text-red-400",
  };
  const payStatusColor: Record<string, string> = {
    pending: "text-amber-400", escrow_funded: "text-sky-400", released: "text-emerald-400", refunded: "text-slate-400",
  };

  if (!buyer) {
    return <AuthModal onSuccess={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#080c14]/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-sm">buy</span>
                <span className="text-slate-400 text-sm">.chaintrack.com</span>
              </div>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-xs text-slate-400 hidden sm:block">Verified Wholesale Buyer Portal</span>
          </div>
          <div className="flex items-center gap-3">
            {buyer.kycStatus === "pending" && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-amber-400 bg-amber-900/20 border border-amber-700/30 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" /> KYC Pending
              </span>
            )}
            {buyer.kycStatus === "approved" && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Verified Buyer
              </span>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white leading-none">{buyer.companyName}</p>
              <p className="text-xs text-slate-400 capitalize">{buyer.buyerTier} tier</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white text-xs" data-testid="button-logout">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-6 overflow-x-auto">
          {[
            { label: "Active Lots", value: lots.length, icon: Package, color: "text-orange-400" },
            { label: "Auctions Live", value: auctionLots.length, icon: Gavel, color: "text-purple-400" },
            { label: "My Orders", value: orders.length, icon: ShoppingCart, color: "text-sky-400" },
            { label: "Verified Suppliers", value: 18, icon: Shield, color: "text-emerald-400" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 shrink-0">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab navigation */}
        <div className="flex gap-1 mb-6 bg-slate-900 border border-slate-800 rounded-xl p-1">
          {([
            { key: "marketplace", label: "Supplier Feeds", icon: Package },
            { key: "reverse_bids", label: "Reverse Bids", icon: Gavel },
            { key: "orders", label: `My Orders${orders.length ? ` (${orders.length})` : ""}`, icon: ShoppingCart },
            { key: "account", label: "Account", icon: Shield },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all
                ${tab === t.key
                  ? t.key === "reverse_bids" ? "bg-purple-600 text-white" : "bg-orange-500 text-white"
                  : "text-slate-400 hover:text-slate-200"
                }`}
              data-testid={`tab-${t.key}`}
            >
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Marketplace Tab ─────────────────────────────────────────── */}
        {tab === "marketplace" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search lots, brands, models…"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                  data-testid="input-lot-search"
                />
              </div>
              <Select value={filterBrand} onValueChange={setFilterBrand}>
                <SelectTrigger className="w-40 bg-slate-900 border-slate-700 text-slate-300 text-sm" data-testid="select-brand-filter">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white">All Brands</SelectItem>
                  {brands.filter(b => feedLots.some(l => l.brand === b)).map(b => (
                    <SelectItem key={b} value={b} className="text-white">{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-36 bg-slate-900 border-slate-700 text-slate-300 text-sm" data-testid="select-grade-filter">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {["all", "A+", "A", "B+", "B", "C"].map(g => (
                    <SelectItem key={g} value={g} className="text-white">{g === "all" ? "All Grades" : `Grade ${g}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {lotsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-52 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredFeed.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No lots match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFeed.map(lot => (
                  <LotCard
                    key={lot.id}
                    lot={lot}
                    onSelect={() => setSelectedLot(lot)}
                    onBid={() => setBidLot(lot)}
                  />
                ))}
              </div>
            )}

            {/* Info strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: FileCheck, title: "Inspection Certified", desc: "Every lot graded and cleared by our Dubai-based certified inspectors before listing." },
                { icon: Lock, title: "Escrow Protection", desc: "Full payment held in ChainTrack escrow and released only after confirmed delivery." },
                { icon: Truck, title: "Export-Ready Logistics", desc: "FOB, CIF and DDP options across CIS, Africa, Europe from Dubai Free Zone." },
              ].map(item => (
                <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3">
                  <item.icon className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Reverse Bids Tab ────────────────────────────────────────── */}
        {tab === "reverse_bids" && (
          <div>
            <div className="mb-5 bg-purple-950/30 border border-purple-700/30 rounded-xl p-4 flex gap-3">
              <Gavel className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-purple-300 font-semibold text-sm">How Reverse Bidding Works</p>
                <p className="text-purple-400/70 text-xs mt-1">Suppliers post large lots. Verified buyers compete by bidding <strong>lower</strong>. The lowest qualified bid wins the lot. All escrow-protected.</p>
              </div>
            </div>

            {lotsLoading ? (
              <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-52 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />)}</div>
            ) : filteredAuctions.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Gavel className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No active reverse bid auctions right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredAuctions.map(lot => (
                  <motion.div
                    key={lot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 border border-purple-700/40 rounded-xl overflow-hidden"
                    data-testid={`card-auction-${lot.id}`}
                  >
                    <div className="bg-purple-950/60 border-b border-purple-800/40 px-5 py-3 flex justify-between items-center">
                      <div>
                        <span className="text-purple-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <Gavel className="w-3 h-3" /> Reverse Auction · {lot.lotNumber}
                        </span>
                        <p className="text-white font-semibold mt-0.5">{lot.productName}</p>
                      </div>
                      <GradeBadge grade={lot.grade} />
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                        <div className="bg-slate-800 rounded-lg p-3">
                          <p className="text-slate-400 text-xs">Starting</p>
                          <p className="text-white font-bold">{formatUSD(lot.startingBid || 0)}</p>
                        </div>
                        <div className="bg-purple-900/40 border border-purple-700/30 rounded-lg p-3">
                          <p className="text-purple-300 text-xs">Best Bid</p>
                          <p className="text-purple-300 font-bold">{formatUSD(lot.currentBid || lot.startingBid || 0)}</p>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-3">
                          <p className="text-slate-400 text-xs">Bids</p>
                          <p className="text-white font-bold">{lot.bidCount}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Boxes className="w-4 h-4" /> {lot.quantity.toLocaleString()} units
                          <span className="text-slate-600">·</span>
                          <Globe className="w-4 h-4" /> {lot.originCountry}
                        </div>
                        {lot.auctionEndDate && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-orange-400" />
                            <CountdownTimer endDate={lot.auctionEndDate} />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedLot(lot)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                          data-testid={`button-view-auction-${lot.id}`}
                        >
                          <Eye className="w-3 h-3 mr-1" /> View Details
                        </Button>
                        <Button
                          onClick={() => setBidLot(lot)}
                          size="sm"
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs"
                          data-testid={`button-place-bid-${lot.id}`}
                        >
                          <Gavel className="w-3 h-3 mr-1" /> Place Bid
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── My Orders Tab ───────────────────────────────────────────── */}
        {tab === "orders" && (
          <div>
            {ordersLoading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-slate-900 rounded-xl animate-pulse" />)}</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                <p className="text-slate-400 font-medium">No orders yet</p>
                <p className="text-slate-500 text-sm mt-1">Browse the marketplace and place your first wholesale order.</p>
                <Button onClick={() => setTab("marketplace")} className="mt-4 bg-orange-500 hover:bg-orange-600" data-testid="button-browse-marketplace">
                  Browse Marketplace
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                    data-testid={`card-order-${order.id}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-mono text-slate-400">{order.orderNumber}</span>
                          <span className={`text-xs font-bold capitalize ${statusColor[order.status] || "text-slate-400"}`}>
                            {order.status.replace("_", " ")}
                          </span>
                          <span className={`text-xs capitalize ${payStatusColor[order.paymentStatus] || "text-slate-400"}`}>
                            · {order.paymentStatus.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-white font-semibold">{order.productName}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                          <span>{order.quantity.toLocaleString()} units</span>
                          <span>{order.incoterm}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.destinationCountry}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-bold text-xl">{formatUSD(order.totalAmount)}</p>
                        <p className="text-xs text-slate-500">{order.currency}</p>
                        {order.escrowNumber && (
                          <p className="text-xs font-mono text-slate-400 mt-1">{order.escrowNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Order timeline */}
                    <div className="mt-4 flex items-center gap-1 overflow-x-auto">
                      {[
                        { key: "confirmed", label: "Confirmed" },
                        { key: "in_inspection", label: "Inspection" },
                        { key: "cleared", label: "Cleared" },
                        { key: "shipped", label: "Shipped" },
                        { key: "delivered", label: "Delivered" },
                      ].map((step, i, arr) => {
                        const statuses = ["confirmed", "in_inspection", "cleared", "shipped", "delivered"];
                        const currentIdx = statuses.indexOf(order.status);
                        const stepIdx = statuses.indexOf(step.key);
                        const done = stepIdx <= currentIdx;
                        const active = stepIdx === currentIdx;
                        return (
                          <div key={step.key} className="flex items-center gap-1 shrink-0">
                            <div className={`flex flex-col items-center`}>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs
                                ${active ? "bg-orange-500 text-white ring-2 ring-orange-400/40" : done ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-500"}`}>
                                {done && !active ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                              </div>
                              <span className={`text-xs mt-0.5 whitespace-nowrap ${active ? "text-orange-400" : done ? "text-emerald-400" : "text-slate-500"}`}>
                                {step.label}
                              </span>
                            </div>
                            {i < arr.length - 1 && (
                              <div className={`h-px w-6 mb-4 ${stepIdx < currentIdx ? "bg-emerald-600" : "bg-slate-700"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {order.estimatedDelivery && (
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Est. delivery: {order.estimatedDelivery}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Account Tab ─────────────────────────────────────────────── */}
        {tab === "account" && (
          <div className="max-w-2xl space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Buyer Profile</h3>
                <div className={`text-xs px-2 py-1 rounded-full border ${
                  buyer.kycStatus === "approved"
                    ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/40"
                    : "bg-amber-900/30 text-amber-400 border-amber-700/40"
                }`}>
                  KYC: {buyer.kycStatus.replace("_", " ")}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ["Company", buyer.companyName],
                  ["Contact", buyer.contactName],
                  ["Email", buyer.email],
                  ["Phone", buyer.phone],
                  ["Country", buyer.country],
                  ["Buyer Tier", buyer.buyerTier.charAt(0).toUpperCase() + buyer.buyerTier.slice(1)],
                  ["Total Orders", buyer.totalOrders.toString()],
                  ["Total Spend", formatUSD(buyer.totalSpend)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-slate-400 text-xs">{k}</p>
                    <p className="text-white font-medium">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {buyer.kycStatus === "pending" && (
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-300 font-semibold">KYC Verification Pending</p>
                    <p className="text-amber-400/70 text-sm mt-1">
                      Your account is under review. Typically completed within 24 business hours. 
                      You can browse all lots but order placement requires KYC approval for amounts over $50,000.
                    </p>
                    <a
                      href="https://wa.me/971523946311?text=ChainTrack%20Buy%20KYC%20Verification"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-lg"
                      data-testid="link-kyc-whatsapp"
                    >
                      <SiWhatsapp className="w-3.5 h-3.5" /> Expedite via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" /> Platform Protections
              </h4>
              <div className="space-y-3">
                {[
                  { icon: Lock, title: "Escrow-Secured Payments", desc: "Funds released only after shipment confirmation." },
                  { icon: FileCheck, title: "Certified Inspection Reports", desc: "Every lot graded by ChainTrack-certified inspectors." },
                  { icon: CheckCircle2, title: "AML / Sanctions Screening", desc: "All suppliers screened against OFAC and global watchlists." },
                  { icon: Globe, title: "Export Clearance Verified", desc: "HS code, customs duty and export licence checked." },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <item.icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://wa.me/971523946311?text=ChainTrack%20Buy%20Support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-700/30 border border-green-700/40 text-green-400 hover:bg-green-700/50 rounded-xl py-3 text-sm font-medium transition-colors"
                data-testid="link-support-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4" /> WhatsApp Support
              </a>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                data-testid="button-logout-account"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Lot Detail Modal */}
      <AnimatePresence>
        {selectedLot && (
          <LotDetailModal
            lot={selectedLot}
            buyer={buyer}
            onClose={() => setSelectedLot(null)}
          />
        )}
      </AnimatePresence>

      {/* Bid Modal */}
      <AnimatePresence>
        {bidLot && (
          <BidModal lot={bidLot} onClose={() => setBidLot(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
