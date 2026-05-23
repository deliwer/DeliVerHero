import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, TrendingDown, Shield, Zap, Building2, Globe, CheckCircle2,
  ArrowRight, Search, BarChart3, Plane, Clock, DollarSign, Users, Star,
  Gavel, Plus, TrendingUp, AlertCircle, MapPin, Warehouse, ChevronDown,
  ChevronRight, Boxes, RefreshCw, Filter, Bell, Eye, Timer, Cpu,
  Award, Lock, ChevronUp, Layers, Truck, Activity, Radio, ExternalLink,
  Target, BarChart2, Smartphone, Weight, FileCheck, Anchor, Route
} from "lucide-react";
import { SiLinkedin, SiWhatsapp } from "react-icons/si";
import warehouseImage from "@assets/stock_images/modern_warehouse_ful_49a92694.jpg";
import cargoPlaneImage from "@assets/stock_images/hero_cargo_plane.jpg";
import dubaiHubImage from "@assets/stock_images/dubai_air_hub.jpg";
import electronicsImage from "@assets/stock_images/people_electronics_r_02ba73a8.jpg";

const LIVE_LOTS = [
  { id: "CT-US-4821", model: "iPhone 15 Pro Max 256GB", origin: "🇺🇸 USA", qty: 500, grade: "A", currentBid: 489, startBid: 520, bids: 18, hoursLeft: 3, minutesLeft: 42, warehouse: "DAFZA", lotType: "ASIS" },
  { id: "CT-CN-7734", model: "iPhone 14 Pro 128GB", origin: "🇨🇳 China", qty: 1200, grade: "A/B", currentBid: 312, startBid: 350, bids: 31, hoursLeft: 11, minutesLeft: 17, warehouse: "Commercity", lotType: "Graded" },
  { id: "CT-IN-2291", model: "iPhone 13 Pro 256GB", origin: "🇮🇳 India", qty: 800, grade: "B", currentBid: 248, startBid: 280, bids: 24, hoursLeft: 1, minutesLeft: 58, warehouse: "DAFZA", lotType: "RODTEP" },
  { id: "CT-US-5519", model: "iPhone 16 Pro Max 512GB", origin: "🇺🇸 USA", qty: 250, grade: "A+", currentBid: 671, startBid: 710, bids: 9, hoursLeft: 22, minutesLeft: 5, warehouse: "DAFZA", lotType: "Charter" },
  { id: "CT-CN-8843", model: "iPhone 12 128GB Mix Lot", origin: "🇨🇳 China", qty: 3000, grade: "B/C", currentBid: 142, startBid: 170, bids: 47, hoursLeft: 0, minutesLeft: 28, warehouse: "Commercity", lotType: "ASIS" },
  { id: "CT-IN-3367", model: "iPhone 15 128GB", origin: "🇮🇳 India", qty: 600, grade: "A", currentBid: 341, startBid: 375, bids: 22, hoursLeft: 6, minutesLeft: 11, warehouse: "DAFZA", lotType: "RODTEP" },
  { id: "CT-US-9104", model: "iPhone 15 Pro 256GB", origin: "🇺🇸 USA", qty: 400, grade: "A", currentBid: 428, startBid: 465, bids: 15, hoursLeft: 14, minutesLeft: 33, warehouse: "DAFZA", lotType: "Graded" },
  { id: "CT-CN-6621", model: "iPhone 11 64GB Lot", origin: "🇨🇳 China", qty: 5000, grade: "C", currentBid: 89, startBid: 110, bids: 63, hoursLeft: 4, minutesLeft: 49, warehouse: "Commercity", lotType: "ASIS" },
];

const CIS_MARKETS = [
  { name: "Kazakhstan", flag: "🇰🇿", city: "Almaty", demand: 98, volume: "12k units/mo" },
  { name: "Uzbekistan", flag: "🇺🇿", city: "Tashkent", demand: 91, volume: "9k units/mo" },
  { name: "Azerbaijan", flag: "🇦🇿", city: "Baku", demand: 87, volume: "7k units/mo" },
  { name: "Georgia", flag: "🇬🇪", city: "Tbilisi", demand: 82, volume: "4k units/mo" },
  { name: "Kyrgyzstan", flag: "🇰🇬", city: "Bishkek", demand: 79, volume: "3k units/mo" },
  { name: "Tajikistan", flag: "🇹🇯", city: "Dushanbe", demand: 74, volume: "2k units/mo" },
];

const TICKER_ITEMS = [
  "🔴 LIVE: CT-CN-8843 iPhone 12 Mix — new bid $142 · 47 bids",
  "✅ CLOSED: CT-US-3301 iPhone 15 Pro Max — won at $481 by Almaty buyer",
  "🟡 ENDING SOON: CT-IN-2291 iPhone 13 Pro — 1h 58m left",
  "🔴 LIVE: CT-US-4821 iPhone 15 Pro Max — 18 suppliers competing",
  "🚀 NEW LOT: CT-CN-9912 iPhone 16 128GB · 2000 units · Listing in 30min",
  "✅ ESCROW RELEASED: CT-DXB-7701 — $248,000 wired to Tashkent buyer",
  "🛩️ CHARTER: 1FLT A320F departing DWC → GYD (Baku) — 3 lots onboard",
];

const GRADES = [
  { grade: "A+", label: "Pristine", desc: "99%+ screen, no scratches, original parts", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
  { grade: "A", label: "Excellent", desc: "Minor micro-scratches, fully functional", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/30" },
  { grade: "B", label: "Good", desc: "Light wear, no cracks, all functions intact", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  { grade: "C", label: "Fair", desc: "Visible wear, minor screen marks, functional", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30" },
  { grade: "ASIS", label: "As-Is", desc: "Uninspected lots, for experienced buyers", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
];

function LiveTicker() {
  const [offset, setOffset] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(p => p - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0A0F1E] border-b border-[#1a2540] overflow-hidden h-8 flex items-center relative z-10">
      <div className="shrink-0 px-3 bg-red-600 h-full flex items-center gap-1.5">
        <Radio className="w-3 h-3 text-white animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white">LIVE</span>
      </div>
      <div className="overflow-hidden flex-1" ref={tickerRef}>
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ transform: `translateX(${offset % (TICKER_ITEMS.join("   ·   ").length * 8)}px)`, transition: "none" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-[11px] text-slate-300 font-medium">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CountdownBadge({ hoursLeft, minutesLeft }: { hoursLeft: number; minutesLeft: number }) {
  const isUrgent = hoursLeft === 0;
  const isEndingSoon = hoursLeft < 3;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
      isUrgent ? "bg-red-500/20 text-red-400 border border-red-500/40" :
      isEndingSoon ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
      "bg-slate-700/60 text-slate-300 border border-slate-600/40"
    }`}>
      <Timer className="w-2.5 h-2.5" />
      {isUrgent ? `${minutesLeft}m` : `${hoursLeft}h ${minutesLeft}m`}
    </span>
  );
}

function BidDialog({ lot }: { lot: typeof LIVE_LOTS[0] }) {
  const [bidPrice, setBidPrice] = useState(String(lot.currentBid - 5));
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] uppercase tracking-widest"
          data-testid={`button-bid-${lot.id}`}
        >
          <Gavel className="w-3.5 h-3.5 mr-1" />
          Place Bid
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D1424] border-[#1E293B] text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-black">
            Bid on Lot {lot.id}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-[#070B14] rounded-xl p-4 border border-[#1E293B]">
            <div className="text-sm font-bold text-white mb-1">{lot.model}</div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>{lot.origin}</span>
              <span>·</span>
              <span>{lot.qty.toLocaleString()} units</span>
              <span>·</span>
              <span>Grade {lot.grade}</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-cyan-400">${lot.currentBid}</span>
              <span className="text-xs text-slate-500">current best bid</span>
              <span className="ml-auto text-xs text-slate-400">{lot.bids} suppliers bidding</span>
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">
              Your Bid Price (per unit, USD)
            </Label>
            <Input
              type="number"
              value={bidPrice}
              onChange={e => setBidPrice(e.target.value)}
              className="bg-[#070B14] border-[#1E293B] text-white text-lg font-bold"
              data-testid="input-bid-price"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Lower bid wins — this is a reverse auction. Beat ${lot.currentBid - 1} to lead.
            </p>
          </div>

          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">
              Notes to Buyer (optional)
            </Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Lead time, payment terms, certifications..."
              className="bg-[#070B14] border-[#1E293B] text-white resize-none"
              rows={2}
              data-testid="input-bid-notes"
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-300">
            <Shield className="w-3.5 h-3.5 inline mr-1.5" />
            All bids are escrowed at DAFZA. Funds held by ChainTrack until delivery confirmed.
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-[#1E293B] text-slate-400"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
              onClick={() => {
                toast({ title: "Bid submitted!", description: `$${bidPrice}/unit on ${lot.id}. You'll be notified if outbid.` });
                setOpen(false);
              }}
              data-testid="button-submit-bid"
            >
              Submit Bid →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ListLotDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    model: "", qty: "", grade: "", origin: "", startPrice: "", endDate: "", warehouse: "dafza", notes: ""
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest text-xs" data-testid="button-list-lot">
          <Plus className="w-4 h-4" />
          List a Lot
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D1424] border-[#1E293B] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-black">List Your Lot for Reverse Auction</DialogTitle>
          <p className="text-slate-400 text-sm">Suppliers from US, China & India — let buyers compete for your inventory</p>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Device / Lot Description</Label>
            <Input placeholder="e.g. iPhone 15 Pro Max 256GB" value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" data-testid="input-lot-model" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Quantity (units)</Label>
            <Input type="number" placeholder="500" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" data-testid="input-lot-qty" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Grade</Label>
            <Select value={form.grade} onValueChange={v => setForm(f => ({ ...f, grade: v }))}>
              <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white" data-testid="select-lot-grade">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                <SelectItem value="a-plus">A+ (Pristine)</SelectItem>
                <SelectItem value="a">A (Excellent)</SelectItem>
                <SelectItem value="a-b">A/B Mix</SelectItem>
                <SelectItem value="b">B (Good)</SelectItem>
                <SelectItem value="c">C (Fair)</SelectItem>
                <SelectItem value="asis">ASIS (Uninspected)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Source Country</Label>
            <Select value={form.origin} onValueChange={v => setForm(f => ({ ...f, origin: v }))}>
              <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white" data-testid="select-lot-origin">
                <SelectValue placeholder="Origin" />
              </SelectTrigger>
              <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                <SelectItem value="us">🇺🇸 United States</SelectItem>
                <SelectItem value="cn">🇨🇳 China</SelectItem>
                <SelectItem value="in">🇮🇳 India (RODTEP)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Starting Price / Unit (USD)</Label>
            <Input type="number" placeholder="500" value={form.startPrice} onChange={e => setForm(f => ({ ...f, startPrice: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" data-testid="input-lot-price" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Auction Duration</Label>
            <Select value={form.endDate} onValueChange={v => setForm(f => ({ ...f, endDate: v }))}>
              <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white" data-testid="select-lot-duration">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="48h">48 Hours</SelectItem>
                <SelectItem value="72h">72 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Warehouse / Escrow Location</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "dafza", label: "DAFZA", sub: "Dubai Airport Freezone" },
                { value: "commercity", label: "Commercity", sub: "Dubai South Freezone" },
              ].map(w => (
                <button
                  key={w.value}
                  onClick={() => setForm(f => ({ ...f, warehouse: w.value }))}
                  className={`p-3 rounded-xl border text-left transition-all ${form.warehouse === w.value ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" : "bg-[#070B14] border-[#1E293B] text-slate-400"}`}
                  data-testid={`button-warehouse-${w.value}`}
                >
                  <div className="font-bold text-sm">{w.label}</div>
                  <div className="text-[10px] opacity-70">{w.sub}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Additional Notes</Label>
            <Textarea placeholder="IMEI range, battery health %, certifications, photos available, payment terms..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white resize-none" rows={3} data-testid="input-lot-notes" />
          </div>
          <div className="col-span-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-xs text-cyan-300">
            <Layers className="w-3.5 h-3.5 inline mr-1.5" />
            ChainTrack will arrange grading, photography, IMEI verification, and DAFZA/Commercity escrow before the auction goes live.
          </div>
          <div className="col-span-2 flex gap-3">
            <Button variant="outline" className="flex-1 border-[#1E293B] text-slate-400" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black" onClick={() => {
              toast({ title: "Lot submitted!", description: "ChainTrack team will contact you within 24h to arrange grading & listing." });
              setOpen(false);
            }} data-testid="button-submit-lot">Submit Lot →</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AuctionCard({ lot, index }: { lot: typeof LIVE_LOTS[0]; index: number }) {
  const savings = Math.round((1 - lot.currentBid / lot.startBid) * 100);
  const isEndingSoon = lot.hoursLeft < 3;
  const isUrgent = lot.hoursLeft === 0;

  const lotTypeBadge = {
    "ASIS": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "Graded": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "RODTEP": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Charter": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  }[lot.lotType] || "bg-slate-700 text-slate-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`bg-[#0D1424] border-[#1E293B] hover:border-cyan-500/40 transition-all duration-300 overflow-hidden group ${isUrgent ? "border-red-500/40" : ""}`}>
        <div className={`h-0.5 w-full ${isUrgent ? "bg-gradient-to-r from-red-500 to-orange-500" : isEndingSoon ? "bg-gradient-to-r from-amber-500 to-orange-400" : "bg-gradient-to-r from-cyan-500/50 to-blue-500/50"}`} />
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-black text-slate-500 tracking-widest">{lot.id}</span>
                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${lotTypeBadge}`}>{lot.lotType}</span>
                {isUrgent && <span className="text-[9px] font-black text-red-400 uppercase tracking-wider animate-pulse">● Ending</span>}
              </div>
              <h3 className="text-[15px] font-black text-white leading-tight truncate" data-testid={`text-lot-model-${lot.id}`}>{lot.model}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-slate-400">{lot.origin}</span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400">{lot.qty.toLocaleString()} units</span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400">
                  <span className={`font-bold ${
                    lot.grade === "A+" ? "text-emerald-400" :
                    lot.grade === "A" ? "text-cyan-400" :
                    lot.grade === "B" ? "text-blue-400" :
                    lot.grade === "A/B" ? "text-cyan-300" : "text-amber-400"
                  }`}>Grade {lot.grade}</span>
                </span>
              </div>
            </div>
            <div className="text-right ml-3 shrink-0">
              <div className="text-[10px] text-slate-500 mb-0.5">Best Bid</div>
              <div className="text-2xl font-black text-cyan-400" data-testid={`text-bid-${lot.id}`}>${lot.currentBid}</div>
              <div className="text-[10px] text-slate-500 line-through">${lot.startBid}</div>
              <div className="text-[10px] text-emerald-400 font-bold">−{savings}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Users className="w-3 h-3 text-purple-400" />
                <span className="font-bold text-purple-300">{lot.bids}</span> suppliers
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Warehouse className="w-3 h-3 text-slate-500" />
                {lot.warehouse}
              </div>
            </div>
            <CountdownBadge hoursLeft={lot.hoursLeft} minutesLeft={lot.minutesLeft} />
          </div>

          <div className="w-full bg-[#070B14] rounded-full h-1 mb-3">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ width: `${Math.min(100, (lot.bids / 70) * 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <BidDialog lot={lot} />
            <Button size="sm" variant="outline" className="border-[#1E293B] text-slate-400 hover:text-white text-[11px] font-bold uppercase tracking-widest" data-testid={`button-view-${lot.id}`}>
              <Eye className="w-3.5 h-3.5 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function ChainTrackPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterOrigin, setFilterOrigin] = useState("all");
  const [filterLotType, setFilterLotType] = useState("all");
  const [filterWarehouse, setFilterWarehouse] = useState("all");
  const [activeTab, setActiveTab] = useState("live");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLots = LIVE_LOTS.filter(lot => {
    if (searchQuery && !lot.model.toLowerCase().includes(searchQuery.toLowerCase()) && !lot.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterGrade !== "all" && !lot.grade.toLowerCase().includes(filterGrade.toLowerCase())) return false;
    if (filterOrigin !== "all" && !lot.origin.toLowerCase().includes(filterOrigin.toLowerCase())) return false;
    if (filterLotType !== "all" && lot.lotType !== filterLotType) return false;
    if (filterWarehouse !== "all" && lot.warehouse !== filterWarehouse) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <LiveTicker />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={cargoPlaneImage} alt="" className="w-full h-full object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/60 via-[#070B14]/80 to-[#070B14]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,209,255,0.08),transparent_60%)]" />

        <div className="relative container mx-auto px-4 pt-14 pb-16 max-w-7xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Radio className="w-3 h-3 animate-pulse" />
              Live Auctions
            </div>
            <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              US · China · India → CIS & Central Asia
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 tracking-tight">
            <span className="text-white">World's #1</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Reverse Auction</span>
            <br />
            <span className="text-white">for Used iPhones</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
            Retailers bypass wholesalers. Exporters list lots. Suppliers compete on price.
            Dubai DAFZA & Commercity escrow. 1FLT charter logistics for bulk volumes.
            Built for CIS & Central Asian retail channels.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <ListLotDialog />
            <Button size="lg" variant="outline" className="gap-2 border-[#1E293B] text-slate-300 hover:text-white hover:border-slate-600 font-bold uppercase tracking-widest text-xs" data-testid="button-register-buyer">
              <Shield className="w-4 h-4" />
              Register as Buyer
            </Button>
            <a href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20want%20to%20list%20a%20lot" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="gap-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs" data-testid="button-whatsapp-chaintrack">
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "15,000+", label: "Verified Trades", icon: CheckCircle2, color: "text-emerald-400" },
              { value: "$280M+", label: "GMV Processed", icon: DollarSign, color: "text-cyan-400" },
              { value: "420+", label: "Active Suppliers", icon: Building2, color: "text-blue-400" },
              { value: "6", label: "CIS Markets", icon: Globe, color: "text-purple-400" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-4">
                <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                <div className={`text-2xl font-black ${s.color}`} data-testid={`stat-${i}`}>{s.value}</div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main marketplace ── */}
      <section className="container mx-auto px-4 pb-20 max-w-7xl">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search lots — iPhone 15 Pro Max, CT-US-4821..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#0D1424] border-[#1E293B] text-white placeholder:text-slate-600 focus:border-cyan-500/50"
              data-testid="input-search-lots"
            />
          </div>
          <Button
            variant="outline"
            className={`gap-2 border-[#1E293B] text-slate-400 hover:text-white shrink-0 ${showFilters ? "border-cyan-500/50 text-cyan-400" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
            data-testid="button-toggle-filters"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </Button>
          <Button variant="outline" className="gap-2 border-[#1E293B] text-slate-400 hover:text-white shrink-0" data-testid="button-refresh">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Origin</Label>
                    <Select value={filterOrigin} onValueChange={setFilterOrigin}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-sm" data-testid="filter-origin">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="all">All Origins</SelectItem>
                        <SelectItem value="usa">🇺🇸 USA</SelectItem>
                        <SelectItem value="china">🇨🇳 China</SelectItem>
                        <SelectItem value="india">🇮🇳 India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Grade</Label>
                    <Select value={filterGrade} onValueChange={setFilterGrade}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-sm" data-testid="filter-grade">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="a+">A+ Pristine</SelectItem>
                        <SelectItem value="a">A Excellent</SelectItem>
                        <SelectItem value="b">B Good</SelectItem>
                        <SelectItem value="c">C Fair</SelectItem>
                        <SelectItem value="asis">ASIS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Lot Type</Label>
                    <Select value={filterLotType} onValueChange={setFilterLotType}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-sm" data-testid="filter-lot-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Graded">Graded & Tested</SelectItem>
                        <SelectItem value="ASIS">ASIS Auction</SelectItem>
                        <SelectItem value="RODTEP">RODTEP (India)</SelectItem>
                        <SelectItem value="Charter">Charter Eligible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Warehouse</Label>
                    <Select value={filterWarehouse} onValueChange={setFilterWarehouse}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-sm" data-testid="filter-warehouse">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="all">All Warehouses</SelectItem>
                        <SelectItem value="DAFZA">DAFZA</SelectItem>
                        <SelectItem value="Commercity">Commercity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-[#0D1424] border border-[#1E293B] p-1">
            <TabsTrigger value="live" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-xs uppercase tracking-widest" data-testid="tab-live">
              <Radio className="w-3 h-3 mr-1.5" />
              Live Auctions <Badge className="ml-1.5 bg-red-500 text-white text-[9px] px-1.5">{LIVE_LOTS.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="closing" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-xs uppercase tracking-widest" data-testid="tab-closing">
              <Timer className="w-3 h-3 mr-1.5" />
              Closing Soon
            </TabsTrigger>
            <TabsTrigger value="won" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-xs uppercase tracking-widest" data-testid="tab-won">
              <Award className="w-3 h-3 mr-1.5" />
              Recently Closed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-6">
            {filteredLots.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-bold">No lots match your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredLots.map((lot, i) => (
                  <AuctionCard key={lot.id} lot={lot} index={i} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="closing" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {LIVE_LOTS.filter(l => l.hoursLeft < 3).map((lot, i) => (
                <AuctionCard key={lot.id} lot={lot} index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="won" className="mt-6">
            <div className="space-y-3">
              {[
                { id: "CT-US-3301", model: "iPhone 15 Pro Max 256GB", qty: 500, winPrice: 481, buyer: "Almaty Retail Co.", date: "2h ago" },
                { id: "CT-IN-1182", model: "iPhone 14 128GB", qty: 1000, winPrice: 287, buyer: "Tashkent Electronics LLC", date: "5h ago" },
                { id: "CT-CN-5517", model: "iPhone 12 Mix Lot", qty: 2000, winPrice: 138, buyer: "Bishkek Tech Trade", date: "11h ago" },
              ].map((w, i) => (
                <div key={i} className="flex items-center justify-between bg-[#0D1424] border border-[#1E293B] rounded-xl p-4">
                  <div>
                    <div className="text-[10px] text-slate-500 font-black tracking-widest mb-0.5">{w.id}</div>
                    <div className="font-bold text-white text-sm">{w.model}</div>
                    <div className="text-xs text-slate-400">{w.qty.toLocaleString()} units · Won by {w.buyer}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400">${w.winPrice}/unit</div>
                    <div className="text-[10px] text-slate-500">{w.date}</div>
                    <Badge className="mt-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[9px]">Sold</Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Process</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How Reverse Auctions Work</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Suppliers compete by bidding down. The lowest price wins — you save versus traditional wholesale every time.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4 items-start">
            {[
              { icon: Plus, step: "01", title: "Buyer Posts Lot Request", desc: "Retailer or exporter specifies model, quantity, grade, and target price.", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
              { icon: Gavel, step: "02", title: "Suppliers Compete", desc: "Verified suppliers from US, China & India submit competitive bids — price drives down.", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
              { icon: FileCheck, step: "03", title: "ChainTrack Grades", desc: "Our Dubai team inspects, photographs, and grades every lot before release.", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
              { icon: Warehouse, step: "04", title: "DAFZA Escrow", desc: "Lot moves into DAFZA or Commercity warehouse. Funds held in escrow until delivery.", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
              { icon: Plane, step: "05", title: "1FLT Delivers", desc: "Charter or consolidated air freight to CIS & Central Asian retail channels.", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 4 && <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-0 h-px border-t border-dashed border-[#1E293B]" />}
                <div className={`rounded-2xl border p-5 ${step.bg}`}>
                  <div className="text-[10px] font-black text-slate-600 tracking-widest mb-3">{step.step}</div>
                  <step.icon className={`w-6 h-6 ${step.color} mb-3`} />
                  <h3 className="font-black text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-[12px] text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Source Countries ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Supply Origins</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Three Major Source Markets</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Every lot is traced to its origin market. Unique advantages per country.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                flag: "🇺🇸", country: "United States", volume: "40%", items: ["Factory unlocked devices", "Carrier-grade refurb lots", "A+ & A grade dominant", "Charter eligible (1FLT A320F)", "T-Mobile, AT&T, Verizon stock"],
                color: "border-blue-500/40 bg-blue-500/5", accent: "text-blue-400", badge: "bg-blue-500/20 text-blue-300"
              },
              {
                flag: "🇨🇳", country: "China", volume: "35%", items: ["Largest volume lots (1k–10k units)", "Competitive pricing", "B/C grade & ASIS mix lots", "Fast turnover bulk supply", "OEM refurb certified available"],
                color: "border-red-500/40 bg-red-500/5", accent: "text-red-400", badge: "bg-red-500/20 text-red-300"
              },
              {
                flag: "🇮🇳", country: "India", volume: "25%", items: ["RODTEP 2% export rebate", "GST refund eligible", "Dual-SIM specs for CIS markets", "India-specific frequency bands", "Growing premium refurb sector"],
                color: "border-orange-500/40 bg-orange-500/5", accent: "text-orange-400", badge: "bg-orange-500/20 text-orange-300"
              },
            ].map((s, i) => (
              <Card key={i} className={`bg-[#0D1424] border ${s.color} p-6`} data-testid={`card-source-${i}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{s.flag}</span>
                    <div>
                      <div className="font-black text-white text-lg">{s.country}</div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${s.accent}`}>{s.volume} of supply</div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-[12px] text-slate-400">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${s.accent} shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIS & Central Asia Markets ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">Target Markets</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">CIS & Central Asia Retail Channels</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                The fastest-growing used iPhone markets globally. Dubai serves as the ideal re-export hub — zero tariffs at DAFZA, direct air connections, and ChainTrack's established retail network across 6 countries.
              </p>
              <div className="space-y-3">
                {CIS_MARKETS.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#0D1424] border border-[#1E293B] rounded-xl p-3">
                    <span className="text-2xl">{m.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-sm">{m.name}</span>
                        <span className="text-[10px] text-slate-500 font-bold">{m.volume}</span>
                      </div>
                      <div className="w-full bg-[#070B14] rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${m.demand}%` }} />
                      </div>
                    </div>
                    <span className="text-[11px] font-black text-purple-400 w-8 text-right">{m.demand}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={dubaiHubImage} alt="Dubai air freight hub" className="rounded-2xl w-full object-cover h-[400px] opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#0D1424]/90 backdrop-blur-sm border border-[#1E293B] rounded-xl p-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Dubai Re-Export Hub</div>
                  <div className="font-black text-white text-sm">DAFZA · Commercity · DWC Airport</div>
                  <div className="text-[11px] text-slate-400 mt-1">0% duty, escrow protection, same-day clearance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grading Standards ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3">Quality Assurance</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">ChainTrack Grading Standards</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Every lot is independently inspected, photographed, and graded by our Dubai team before auction goes live.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4 mb-10">
            {GRADES.map((g, i) => (
              <Card key={i} className={`bg-[#0D1424] border ${g.bg} p-5 text-center`} data-testid={`card-grade-${g.grade}`}>
                <div className={`text-3xl font-black ${g.color} mb-2`}>{g.grade}</div>
                <div className="font-black text-white text-sm mb-2">{g.label}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{g.desc}</div>
              </Card>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Smartphone, title: "IMEI Verification", desc: "Every device checked against blacklists. Clean IMEI guaranteed or full refund." },
              { icon: Weight, title: "Battery Health Report", desc: "Battery capacity %, cycle count, and original/replaced status disclosed." },
              { icon: FileCheck, title: "Photo Documentation", desc: "360° photos + video inspection available for lots above 100 units." },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="font-black text-white text-sm mb-1">{s.title}</div>
                  <div className="text-[12px] text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Logistics & Escrow ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* DAFZA/Commercity */}
            <Card className="bg-[#0D1424] border-[#1E293B] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <Warehouse className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">DAFZA & Commercity Escrow</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Dubai Freezone Warehousing</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                All lots are held in bonded Dubai freezone warehouses under ChainTrack's escrow. Funds are released only after buyer confirms receipt and grade compliance.
              </p>
              <div className="space-y-3">
                {[
                  "Zero-duty re-export from Dubai freeones",
                  "Bonded warehouse — no UAE import duty",
                  "SWIFT escrow — funds held by ChainTrack",
                  "Same-day customs clearance at DAFZA",
                  "Integrated with /logistics for shipment tracking",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/chaintrack-logistics">
                <Button className="mt-6 w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-black uppercase tracking-widest text-xs" data-testid="button-view-logistics">
                  Track Shipments →
                </Button>
              </Link>
            </Card>

            {/* 1FLT Charter */}
            <Card className="bg-[#0D1424] border-[#1E293B] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">1FLT Charter Logistics</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">iFLT.com · Integrated Supply Chain</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                For high-value or bulk lots, ChainTrack integrates with <strong className="text-blue-300">1FLT Aviation DMCC</strong> (Jumeirah Lake Towers, Dubai) for dedicated air charter. Airbus A320F freighter — up to 21.4T payload, 1,850 NM range.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "A320F Capacity", value: "21.4T / 158m³" },
                  { label: "Route Range", value: "Up to 1,850 NM" },
                  { label: "Key Routes", value: "DXB → GYD, ALA, TAS" },
                  { label: "Min. Lot Value", value: "$250,000 USD" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#070B14] border border-[#1E293B] rounded-xl p-3">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{s.label}</div>
                    <div className="text-sm font-black text-blue-300">{s.value}</div>
                  </div>
                ))}
              </div>
              <a href="mailto:charters@1flt.com" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-black uppercase tracking-widest text-xs" data-testid="button-charter-1flt">
                  <Plane className="w-3.5 h-3.5 mr-1.5" />
                  Contact 1FLT — charters@1flt.com
                </Button>
              </a>
            </Card>

          </div>

          {/* iFLT.com supply chain banner */}
          <div className="mt-8 bg-gradient-to-r from-[#0D1424] via-[#0D1930] to-[#0D1424] border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Route className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="font-black text-white">iFLT.com Integrated Supply Chain</div>
                <div className="text-[12px] text-slate-400 mt-0.5">End-to-end visibility from source factory to CIS retail shelf. IATA partner · AWB stockholder · DG certified · 24/7 ops</div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href="https://1flt.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-black text-xs uppercase tracking-widest gap-2" data-testid="button-iflt">
                  <ExternalLink className="w-3.5 h-3.5" />
                  iFLT.com
                </Button>
              </a>
              <a href="mailto:info@1flt.com">
                <Button className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs uppercase tracking-widest" data-testid="button-contact-iflt">
                  Get Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership tiers ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">Access</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Buyer Membership Tiers</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Lower fees, priority access to new lots, and dedicated account managers for high-volume buyers.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { name: "On-Demand", price: "Free", fee: "0.5%", lots: "Standard", features: ["Bid on all public lots", "Standard lot access", "Email support"], color: "border-[#1E293B]", badge: "" },
              { name: "Starter", price: "$299/mo", fee: "0.3%", lots: "Priority 1h", features: ["Early lot access (1h)", "Dedicated WhatsApp support", "Monthly market report"], color: "border-blue-500/30", badge: "" },
              { name: "Growth", price: "$799/mo", fee: "0.25%", lots: "Priority 3h", features: ["Early access (3h)", "Exclusive lot previews", "Account manager", "Charter coordination"], color: "border-purple-500/40", badge: "POPULAR" },
              { name: "Enterprise", price: "Custom", fee: "0.2%", lots: "Exclusive 24h", features: ["24h exclusive preview", "Custom lots sourced", "Dedicated ops team", "1FLT charter included"], color: "border-amber-500/40", badge: "BEST" },
            ].map((tier, i) => (
              <Card key={i} className={`bg-[#0D1424] border ${tier.color} p-6 relative`} data-testid={`card-tier-${tier.name.toLowerCase()}`}>
                {tier.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${tier.badge === "POPULAR" ? "bg-purple-500 text-white" : "bg-amber-500 text-slate-950"}`}>
                    {tier.badge}
                  </div>
                )}
                <div className="font-black text-white text-lg mb-1">{tier.name}</div>
                <div className="text-2xl font-black text-cyan-400 mb-1">{tier.price}</div>
                <div className="text-[11px] text-slate-500 mb-4">Platform fee: <span className="text-slate-300 font-bold">{tier.fee}</span></div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#0A0F1E] hover:bg-[#1E293B] text-slate-300 border border-[#1E293B] font-black text-xs uppercase tracking-widest" data-testid={`button-tier-${tier.name.toLowerCase()}`}>
                  {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA footer ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-4">Join ChainTrack</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Bid?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Verified buyers and suppliers only. KYC/AML required. Escrow protection on every deal.
            Operate from Dubai — sell to the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Button size="lg" className="gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest" data-testid="button-cta-buyer">
              <Shield className="w-5 h-5" />
              Register as Buyer
            </Button>
            <ListLotDialog />
            <a href="https://wa.me/971523946311?text=ChainTrack%20enquiry" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 border-[#1E293B] text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 font-bold uppercase tracking-widest" data-testid="button-cta-whatsapp">
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" />KYC/AML Verified</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan-400" />DAFZA Escrow</span>
            <span className="flex items-center gap-1.5"><Plane className="w-3.5 h-3.5 text-cyan-400" />1FLT Charter</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-400" />CIS & Central Asia</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-cyan-400" />15,000+ Trades</span>
          </div>
          <div className="mt-10 pt-8 border-t border-[#1E293B] flex items-center justify-center gap-6 text-[11px] text-slate-500">
            <span>chaintrack.com</span>
            <span>·</span>
            <a href="mailto:b2b@deliwer.com" className="hover:text-slate-300 transition-colors">b2b@deliwer.com</a>
            <span>·</span>
            <a href="https://linkedin.com/company/chaintrack" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
              <SiLinkedin className="w-3.5 h-3.5" />LinkedIn
            </a>
            <span>·</span>
            <Link href="/chaintrack-logistics">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Logistics →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
