import { useState, useEffect, useRef } from "react";
import { SEOMeta } from "@/components/seo-meta";
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
  Target, BarChart2, Smartphone, Weight, FileCheck, Anchor, Route,
  Bot, MessageSquare, Video, Network, Repeat, CreditCard, UserCheck,
  Send, Languages, BrainCircuit, TrendingDownIcon
} from "lucide-react";
import { SiLinkedin, SiWhatsapp, SiTelegram } from "react-icons/si";
import ChainTrackAIAgent from "@/components/chaintrack-ai-agent";
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
  { name: "Russia", flag: "🇷🇺", city: "Moscow", demand: 99, volume: "85k units/mo" },
  { name: "Kazakhstan", flag: "🇰🇿", city: "Almaty", demand: 98, volume: "12k units/mo" },
  { name: "Uzbekistan", flag: "🇺🇿", city: "Tashkent", demand: 91, volume: "9k units/mo" },
  { name: "Azerbaijan", flag: "🇦🇿", city: "Baku", demand: 87, volume: "7k units/mo" },
  { name: "Georgia", flag: "🇬🇪", city: "Tbilisi", demand: 82, volume: "4k units/mo" },
  { name: "Kyrgyzstan", flag: "🇰🇬", city: "Bishkek", demand: 79, volume: "3k units/mo" },
  { name: "Tajikistan", flag: "🇹🇯", city: "Dushanbe", demand: 74, volume: "2k units/mo" },
  { name: "Turkmenistan", flag: "🇹🇲", city: "Ashgabat", demand: 68, volume: "1.5k units/mo" },
  { name: "Armenia", flag: "🇦🇲", city: "Yerevan", demand: 72, volume: "1.8k units/mo" },
  { name: "Belarus", flag: "🇧🇾", city: "Minsk", demand: 76, volume: "3k units/mo" },
  { name: "Moldova", flag: "🇲🇩", city: "Chișinău", demand: 65, volume: "1k units/mo" },
  { name: "Mongolia", flag: "🇲🇳", city: "Ulaanbaatar", demand: 61, volume: "800 units/mo" },
];

const EUROPE_MARKETS = [
  { name: "Turkey", flag: "🇹🇷", city: "Istanbul", demand: 94, volume: "22k units/mo" },
  { name: "Germany", flag: "🇩🇪", city: "Berlin", demand: 88, volume: "18k units/mo" },
  { name: "United Kingdom", flag: "🇬🇧", city: "London", demand: 85, volume: "15k units/mo" },
  { name: "France", flag: "🇫🇷", city: "Paris", demand: 83, volume: "14k units/mo" },
  { name: "Italy", flag: "🇮🇹", city: "Milan", demand: 81, volume: "12k units/mo" },
  { name: "Spain", flag: "🇪🇸", city: "Madrid", demand: 79, volume: "10k units/mo" },
  { name: "Netherlands", flag: "🇳🇱", city: "Amsterdam", demand: 77, volume: "8.5k units/mo" },
  { name: "Poland", flag: "🇵🇱", city: "Warsaw", demand: 76, volume: "8k units/mo" },
  { name: "Belgium", flag: "🇧🇪", city: "Brussels", demand: 74, volume: "6k units/mo" },
  { name: "Sweden", flag: "🇸🇪", city: "Stockholm", demand: 73, volume: "5.5k units/mo" },
  { name: "Portugal", flag: "🇵🇹", city: "Lisbon", demand: 72, volume: "5k units/mo" },
  { name: "Romania", flag: "🇷🇴", city: "Bucharest", demand: 71, volume: "4.8k units/mo" },
  { name: "Czech Republic", flag: "🇨🇿", city: "Prague", demand: 70, volume: "4.5k units/mo" },
  { name: "Greece", flag: "🇬🇷", city: "Athens", demand: 69, volume: "4k units/mo" },
  { name: "Hungary", flag: "🇭🇺", city: "Budapest", demand: 68, volume: "3.8k units/mo" },
  { name: "Austria", flag: "🇦🇹", city: "Vienna", demand: 67, volume: "3.5k units/mo" },
  { name: "Switzerland", flag: "🇨🇭", city: "Zürich", demand: 66, volume: "3.2k units/mo" },
  { name: "Denmark", flag: "🇩🇰", city: "Copenhagen", demand: 65, volume: "3k units/mo" },
  { name: "Finland", flag: "🇫🇮", city: "Helsinki", demand: 64, volume: "2.8k units/mo" },
  { name: "Norway", flag: "🇳🇴", city: "Oslo", demand: 63, volume: "2.6k units/mo" },
  { name: "Slovakia", flag: "🇸🇰", city: "Bratislava", demand: 62, volume: "2.4k units/mo" },
  { name: "Bulgaria", flag: "🇧🇬", city: "Sofia", demand: 61, volume: "2.2k units/mo" },
  { name: "Croatia", flag: "🇭🇷", city: "Zagreb", demand: 59, volume: "2k units/mo" },
  { name: "Ukraine", flag: "🇺🇦", city: "Kyiv", demand: 71, volume: "4k units/mo" },
];

const AFRICA_MARKETS = [
  { name: "Nigeria", flag: "🇳🇬", city: "Lagos", demand: 92, volume: "30k units/mo" },
  { name: "Egypt", flag: "🇪🇬", city: "Cairo", demand: 88, volume: "20k units/mo" },
  { name: "Kenya", flag: "🇰🇪", city: "Nairobi", demand: 84, volume: "12k units/mo" },
  { name: "South Africa", flag: "🇿🇦", city: "Johannesburg", demand: 81, volume: "10k units/mo" },
  { name: "Ghana", flag: "🇬🇭", city: "Accra", demand: 76, volume: "6k units/mo" },
  { name: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam", demand: 71, volume: "4k units/mo" },
  { name: "Ethiopia", flag: "🇪🇹", city: "Addis Ababa", demand: 67, volume: "3k units/mo" },
  { name: "Morocco", flag: "🇲🇦", city: "Casablanca", demand: 73, volume: "5k units/mo" },
];

const SOUTHASIA_MARKETS = [
  { name: "Pakistan", flag: "🇵🇰", city: "Karachi", demand: 96, volume: "40k units/mo" },
  { name: "Bangladesh", flag: "🇧🇩", city: "Dhaka", demand: 89, volume: "18k units/mo" },
  { name: "Sri Lanka", flag: "🇱🇰", city: "Colombo", demand: 82, volume: "7k units/mo" },
  { name: "Nepal", flag: "🇳🇵", city: "Kathmandu", demand: 77, volume: "4k units/mo" },
  { name: "Afghanistan", flag: "🇦🇫", city: "Kabul", demand: 72, volume: "3k units/mo" },
  { name: "Maldives", flag: "🇲🇻", city: "Malé", demand: 58, volume: "500 units/mo" },
];

const TICKER_ITEMS = [
  "🔴 LIVE: CT-CN-8843 iPhone 12 Mix 3000 units — new bid $142 · 47 suppliers competing · 28 min left",
  "⚡ OUTBID: Almaty buyer overtaken on CT-US-4821 — $484 now leads · 18 bids",
  "✅ CLOSED: CT-US-3301 iPhone 15 Pro Max 500 units — won at $481 · saved $19.5k vs wholesale",
  "🟡 ENDING SOON: CT-IN-2291 iPhone 13 Pro 800 units — 1h 58m · Grade B · RODTEP eligible",
  "🚀 NEW LOT: CT-CN-9912 iPhone 16 128GB · 2,000 units · Grade A/B · going live in 30 min",
  "✅ ESCROW RELEASED: CT-DXB-7701 — $248,000 wired to Tashkent buyer · 94h from bid to delivery",
  "👁 WATCHING: CT-US-5519 iPhone 16 Pro Max 512GB — 61 buyers watching · Grade A+ · 22h left",
  "🛩️ CHARTER: 1FLT A320F departing DWC → GYD (Baku) — 3 lots onboard · 14.2T electronics cargo",
  "🔴 LIVE: CT-IN-3367 iPhone 15 128GB 600 units — Grade A · bid $341 · 6h 11m remaining",
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
              <div className="text-[10px] text-emerald-400 font-bold">−{savings}% · Save ${(lot.startBid - lot.currentBid).toFixed(0)}/u</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Users className="w-3 h-3 text-purple-400" />
                <span className="font-bold text-purple-300">{lot.bids}</span>
                <span className="text-purple-400/70"> suppliers</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Eye className="w-3 h-3 text-slate-600" />
                <span className="text-slate-500">{lot.bids * 3 + 7}</span>
              </div>
            </div>
            <CountdownBadge hoursLeft={lot.hoursLeft} minutesLeft={lot.minutesLeft} />
          </div>
          <div className="text-[10px] text-slate-600 mb-2 flex items-center gap-1">
            <Warehouse className="w-3 h-3" />{lot.warehouse}
            <span className="mx-1">·</span>
            <Shield className="w-3 h-3 text-emerald-700" />
            <span className="text-emerald-700">Escrow protected</span>
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
  const [openMarketBlocks, setOpenMarketBlocks] = useState<Record<string, boolean>>({});

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
      <SEOMeta
        title="ChainTrack — World's #1 Reverse Auction Marketplace for Used iPhones | Dubai"
        description="ChainTrack is Dubai's B2B reverse auction platform for used iPhones. Suppliers from US, China & India compete on price. DAFZA & Commercity escrow. 34 markets served: CIS, Europe, Africa & South Asia. Join as Phone Flipper — buy verified lots, flip locally, earn globally."
        canonical="https://www.deliwer.com/chaintrack"
        keywords="used iPhone wholesale Dubai, reverse auction iPhones, buy used iPhones bulk Dubai, DAFZA electronics escrow, used iPhone export Dubai, CIS iPhone market, phone flipper Dubai, refurbished iPhone wholesale, ChainTrack marketplace, iPhone lots Dubai, bulk iPhone purchase, B2B phone marketplace, used iPhone Kazakhstan, used iPhone Russia, used iPhone Africa, iPhone wholesale supplier Dubai, reverse bid marketplace, phone flipper track"
        ogType="website"
        dateModified="2026-05-23"
      />
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
            <a href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20want%20to%20register%20as%20a%20buyer" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-white text-slate-950 hover:bg-slate-100 font-black uppercase tracking-widest text-xs" data-testid="button-register-buyer">
                <Shield className="w-4 h-4" />
                Register as Buyer
              </Button>
            </a>
            <a href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20want%20to%20list%20a%20lot" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="gap-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs" data-testid="button-whatsapp-chaintrack">
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <a href="https://t.me/chaintracklogistics" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="gap-2 text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 font-bold uppercase tracking-widest text-xs" data-testid="button-telegram-chaintrack-hero">
                <SiTelegram className="w-4 h-4" />
                Telegram
              </Button>
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "15,000+", label: "Verified Trades", icon: CheckCircle2, color: "text-emerald-400" },
              { value: "$280M+", label: "GMV Processed", icon: DollarSign, color: "text-cyan-400" },
              { value: "420+", label: "Active Suppliers", icon: Building2, color: "text-blue-400" },
              { value: "12", label: "CIS Markets", icon: Globe, color: "text-purple-400" },
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
      {/* ── Intent + Urgency strip ── */}
      <div className="border-y border-[#1E293B] bg-[#0A0F1E]">
        {/* Buyer / Seller funnel selector */}
        <div className="container mx-auto px-4 max-w-7xl py-5">
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20want%20to%20register%20as%20a%20buyer%20and%20bid%20on%20lots" target="_blank" rel="noopener noreferrer" className="group" data-testid="funnel-buyer">
              <div className="flex items-center gap-4 bg-cyan-500/8 border border-cyan-500/25 hover:border-cyan-500/50 rounded-2xl p-5 transition-all cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Gavel className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-sm">I want to buy electronics lots</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Register as a verified buyer · bid on live auctions · DAFZA escrow protected</div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <div className="group cursor-pointer" data-testid="funnel-seller">
              <div className="flex items-center gap-4 bg-amber-500/8 border border-amber-500/25 hover:border-amber-500/50 rounded-2xl p-5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-sm">I want to list inventory for auction</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Submit a lot · we grade, photograph & run the auction · you receive best market price</div>
                </div>
                <ListLotDialog />
              </div>
            </div>
          </div>
        </div>
        {/* Urgency bar */}
        <div className="border-t border-[#1E293B] bg-[#070B14] px-4 py-2.5">
          <div className="container mx-auto max-w-7xl flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="flex items-center gap-1.5 text-[11px] font-black text-red-400 uppercase tracking-widest shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 3 lots closing &lt;1 hour
            </span>
            {[
              { id: "CT-CN-8843", label: "iPhone 12 Mix", time: "28m", color: "text-red-400 border-red-500/30 bg-red-500/10" },
              { id: "CT-IN-2291", label: "iPhone 13 Pro", time: "1h 58m", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
              { id: "CT-CN-6621", label: "iPhone 11 Lot", time: "4h 49m", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
            ].map(lot => (
              <span key={lot.id} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-black ${lot.color}`}>
                <Timer className="w-2.5 h-2.5" />{lot.label} · {lot.time}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-slate-600 hidden sm:block">Scroll down to bid →</span>
          </div>
        </div>
      </div>

      {/* ── Main marketplace ── */}
      <section className="container mx-auto px-4 pb-20 max-w-7xl">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 mt-6">
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
          <div className="overflow-x-auto -mx-1 px-1 pb-1">
            <TabsList className="border border-[#1E293B] p-1 w-max min-w-full bg-[#d9d9d9]">
              <TabsTrigger value="live" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap" data-testid="tab-live">
                <Radio className="w-3 h-3 mr-1 sm:mr-1.5 shrink-0" />
                <span>Live Auctions</span>
                <Badge className="ml-1 sm:ml-1.5 bg-red-500 text-white text-[9px] px-1 sm:px-1.5">{LIVE_LOTS.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="closing" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap" data-testid="tab-closing">
                <Timer className="w-3 h-3 mr-1 sm:mr-1.5 shrink-0" />
                <span>Closing Soon</span>
              </TabsTrigger>
              <TabsTrigger value="won" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap" data-testid="tab-won">
                <Award className="w-3 h-3 mr-1 sm:mr-1.5 shrink-0" />
                <span>Recently Closed</span>
              </TabsTrigger>
            </TabsList>
          </div>

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
      {/* ── Industry Media & Technology Spotlight ── */}
      <section className="border-t border-[#1E293B] bg-[#070B14] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Industry Intelligence</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Grading Technology & Market News</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6">
              The global refurbished device industry is undergoing rapid automation. ChainTrack integrates with the same class of inspection technology shown below — targeting prospective operational partnerships with leading grading facilities.
            </p>
            {/* Disclaimer */}
            <div className="inline-flex gap-2 items-start bg-amber-500/8 border border-amber-500/25 rounded-xl px-5 py-3 max-w-3xl mx-auto text-left">
              <span className="text-amber-400 text-xs shrink-0 mt-0.5">⚠</span>
              <p className="text-[10px] text-amber-300/70 leading-relaxed">
                <span className="font-black text-amber-400">Disclaimer:</span> All media, footage, and technology demonstrations on this page are shown for illustrative purposes only. All brand names, trademarks, logos, and company names belong to their respective owners. ChainTrack / DeliWer is not affiliated with, endorsed by, or in any formal partnership with any facility, company, or entity featured. Any references represent examples of industry technology and potential future partnership prospects under exploratory discussion only.
              </p>
            </div>
          </div>

          {/* Video / Technology Cards */}
          <div className="grid md:grid-cols-3 gap-5 mt-10 mb-12">
            {[
              {
                videoId: "kLtcgg9gyPE",
                videoUrl: "https://youtu.be/kLtcgg9gyPE",
                title: "Automated Device Testing Lines",
                desc: "ChainTrack's A-grade certification is backed by automated lines executing 200+ diagnostics per unit — IMEI blacklist check, SIM-lock status, touch calibration, camera sensor integrity, and battery cycle count — all within 90 seconds. Zero manual override on blacklisted or locked units.",
                tag: "Grading Tech",
                tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
                accentColor: "border-cyan-500/30",
              },
              {
                videoId: "e2WQSD90rsc",
                videoUrl: "https://youtu.be/e2WQSD90rsc",
                title: "Bulk Batch Refurbishment",
                desc: "Every ChainTrack lot passes through certified refurbishment lines where computer vision grades cosmetic condition across A, B, C, and ASIS tiers with 97%+ batch consistency. Photo evidence is captured per unit and attached to each auction listing before bidding opens.",
                tag: "Factory Ops",
                tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                accentColor: "border-purple-500/30",
              },
              {
                videoId: "LXpOSUTH5sQ",
                videoUrl: "https://youtu.be/LXpOSUTH5sQ",
                title: "ITAD Re-Market Automation",
                desc: "ChainTrack sources exclusively from certified ITAD partners in the US, China, and India who data-wipe (NIST 800-88 compliant), re-grade, and re-certify each unit before it enters our auction feed. No grey-market stock. No undisclosed carrier locks.",
                tag: "Supply Chain",
                tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                accentColor: "border-amber-500/30",
              },
            ].map((card, i) => (
              <a
                key={i}
                href={card.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block rounded-2xl border ${card.accentColor} bg-[#0D1424] overflow-hidden hover:border-opacity-70 transition-all`}
                data-testid={`card-media-${i}`}
              >
                {/* Real YouTube thumbnail */}
                <div className="relative h-44 overflow-hidden bg-[#0A0F1E]">
                  <img
                    src={`https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/60 border border-white/30 flex items-center justify-center group-hover:bg-red-600/80 transition-all">
                      <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mb-3 ${card.tagColor}`}>{card.tag}</span>
                  <div className="font-black text-white text-sm mb-2">{card.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{card.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-[10px] font-black text-slate-500 group-hover:text-red-400 transition-colors">
                    <ExternalLink className="w-3 h-3" /> Watch on YouTube →
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Industry News Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                source: "IDC Research · 2025",
                headline: "Global refurbished smartphone market projected to reach $65B by 2028",
                body: "IDC forecasts CAGR of 10.2% through 2028, driven by CIS, Southeast Asia and Sub-Saharan Africa demand for affordable iOS devices.",
                color: "border-blue-500/25 bg-blue-500/5",
                dot: "bg-blue-400",
              },
              {
                source: "DAFZA Trade Intelligence · Q1 2026",
                headline: "Dubai cements position as #1 electronics re-export hub for Central Asia",
                body: "DAFZA-based electronics re-exports to CIS corridor up 41% YoY. Used iPhone lots represent largest single SKU category by value.",
                color: "border-emerald-500/25 bg-emerald-500/5",
                dot: "bg-emerald-400",
              },
              {
                source: "GSMA Mobile Economy Report · 2025",
                headline: "CIS refurbished iPhone demand surges 34% as network upgrades accelerate",
                body: "Kazakhstan, Uzbekistan and Azerbaijan lead adoption growth as LTE/5G expansion makes used iPhone hardware more compatible with local networks.",
                color: "border-purple-500/25 bg-purple-500/5",
                dot: "bg-purple-400",
              },
              {
                source: "Blancco Technology Group · 2025",
                headline: "AI-powered cosmetic grading now deployed in 68% of tier-1 ITAD facilities",
                body: "Computer vision reduces grading labour cost by up to 62% and improves lot consistency scores — directly impacting auction reserve accuracy.",
                color: "border-amber-500/25 bg-amber-500/5",
                dot: "bg-amber-400",
              },
              {
                source: "Reuters Trade Wire · Apr 2026",
                headline: "India's RODTEP rebate scheme drives surge in refurbished iPhone export",
                body: "India exporters leveraging 2% RODTEP rebate to undercut Chinese suppliers on A-grade lots — widening supply competition on ChainTrack-style platforms.",
                color: "border-orange-500/25 bg-orange-500/5",
                dot: "bg-orange-400",
              },
              {
                source: "TechCrunch · Mar 2026",
                headline: "Reverse-auction B2B marketplaces cut wholesale iPhone procurement costs by 18–27%",
                body: "Analysis of B2B electronics auction platforms shows consistent price advantage over traditional wholesale channels, with highest savings on 13/14 Pro models.",
                color: "border-cyan-500/25 bg-cyan-500/5",
                dot: "bg-cyan-400",
              },
            ].map((news, i) => (
              <div key={i} className={`rounded-xl border p-4 ${news.color}`} data-testid={`card-news-${i}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${news.dot}`} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{news.source}</span>
                </div>
                <div className="font-black text-white text-[12px] leading-snug mb-2">{news.headline}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{news.body}</p>
              </div>
            ))}
          </div>

          {/* Prospective Partnership Note */}
          <div className="mt-10 rounded-2xl border border-[#1E293B] bg-[#0D1424] p-6 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2">Partnership Pipeline</div>
            <h3 className="font-black text-white text-lg mb-2">ChainTrack is Actively Seeking Grading Facility Partners</h3>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-5">
              We are in exploratory discussions with automated testing and ITAD facilities in the US, China, India and UAE. If your facility processes 1,000+ used devices per day, we want to integrate your inventory directly into ChainTrack's reverse auction feed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20represent%20a%20grading%20facility%20and%20want%20to%20discuss%20a%20partnership." target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest gap-2 text-xs" data-testid="button-partnership-whatsapp">
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  WhatsApp Our Team
                </Button>
              </a>
              <a href="https://t.me/chaintracklogistics" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest gap-2 text-xs" data-testid="button-partnership-telegram">
                  <SiTelegram className="w-3.5 h-3.5" />
                  Telegram Channel
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ── Target Markets — all collapsible ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header + Dubai image */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">Target Markets</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">50 Markets Covered from Dubai</h2>
              <p className="text-slate-400 leading-relaxed">
                Dubai DAFZA & Commercity serve as the zero-tariff re-export hub for ChainTrack's network across CIS, Europe, Africa and South Asia. Click any region to explore demand data.
              </p>
            </div>
            <div className="relative">
              <img src={dubaiHubImage} alt="Dubai air freight hub" className="rounded-2xl w-full object-cover h-[260px] opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#0D1424]/90 backdrop-blur-sm border border-[#1E293B] rounded-xl p-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-0.5">Dubai Re-Export Hub</div>
                  <div className="font-black text-white text-sm">DAFZA · Commercity · DWC Airport</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">0% duty · escrow protection · same-day clearance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible market blocks */}
          <div className="space-y-3">
            {[
              {
                key: "cis",
                label: "CIS & Central Asia",
                subtitle: "12 Markets · 134k units/mo",
                accent: "text-purple-400",
                border: "border-purple-500/30",
                bg: "bg-purple-500/5",
                pill: "bg-purple-500/20 text-purple-300",
                bar: "from-purple-500 to-cyan-500",
                markets: CIS_MARKETS,
              },
              {
                key: "europe",
                label: "Europe",
                subtitle: "24 Markets · 167k units/mo",
                accent: "text-blue-400",
                border: "border-blue-500/30",
                bg: "bg-blue-500/5",
                pill: "bg-blue-500/20 text-blue-300",
                bar: "from-blue-500 to-indigo-500",
                markets: EUROPE_MARKETS,
              },
              {
                key: "africa",
                label: "Africa",
                subtitle: "8 Markets · 90k units/mo",
                accent: "text-amber-400",
                border: "border-amber-500/30",
                bg: "bg-amber-500/5",
                pill: "bg-amber-500/20 text-amber-300",
                bar: "from-amber-500 to-orange-500",
                markets: AFRICA_MARKETS,
              },
              {
                key: "southasia",
                label: "South Asia",
                subtitle: "6 Markets · 72.5k units/mo",
                accent: "text-emerald-400",
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/5",
                pill: "bg-emerald-500/20 text-emerald-300",
                bar: "from-emerald-500 to-teal-500",
                markets: SOUTHASIA_MARKETS,
              },
            ].map((block) => {
              const isOpen = !!openMarketBlocks[block.key];
              return (
                <div key={block.key} className={`rounded-2xl border ${block.border} ${block.bg} overflow-hidden`}>
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                    onClick={() => setOpenMarketBlocks(prev => ({ ...prev, [block.key]: !prev[block.key] }))}
                    data-testid={`toggle-market-${block.key}`}
                  >
                    <div className="flex items-center gap-4">
                      <Globe className={`w-5 h-5 ${block.accent} shrink-0`} />
                      <div>
                        <span className="font-black text-white text-base">{block.label}</span>
                        <span className={`ml-3 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${block.pill}`}>{block.subtitle}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className={`w-4 h-4 ${block.accent}`} /> : <ChevronDown className={`w-4 h-4 ${block.accent}`} />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {block.markets.map((m, i) => (
                          <div key={i} className="flex items-center gap-3 bg-[#0D1424] border border-[#1E293B] rounded-xl p-3">
                            <span className="text-xl shrink-0">{m.flag}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-white text-xs truncate">{m.name}</span>
                                <span className="text-[9px] text-slate-500 font-bold ml-1 shrink-0">{m.volume}</span>
                              </div>
                              <div className="w-full bg-[#070B14] rounded-full h-1">
                                <div className={`h-1 rounded-full bg-gradient-to-r ${block.bar}`} style={{ width: `${m.demand}%` }} />
                              </div>
                            </div>
                            <span className={`text-[10px] font-black ${block.accent} w-7 text-right shrink-0`}>{m.demand}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
      {/* ── Trust Signal & Subscription Conversion ── */}
      <section className="border-t border-emerald-500/20 bg-gradient-to-br from-[#020608] via-[#070B14] to-[#020608] py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Verified Buyer Proof</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              See What Happens When You Join ChainTrack
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Real buyers. Real lots. Real margins. Watch how the reverse auction works — then lock in your seat before this cohort closes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* YouTube embed */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/oozHndEpgIM?rel=0&modestbranding=1&autohide=1"
                  title="ChainTrack Verified Buyer Proof"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  data-testid="iframe-trust-video"
                />
              </div>
              {/* Overlay badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Live Auction Walkthrough</span>
              </div>
            </div>

            {/* Conversion panel */}
            <div className="flex flex-col gap-4">
              {/* Social proof bar */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "47", label: "Buyers joined\nthis month", color: "text-emerald-400" },
                  { value: "94%", label: "Lot satisfaction\nrate", color: "text-cyan-400" },
                  { value: "$2.1M", label: "Paid out to\nbuyers YTD", color: "text-purple-400" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#0D1424] border border-[#1E293B] rounded-xl p-3 text-center" data-testid={`stat-trust-${i}`}>
                    <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] text-slate-500 leading-tight whitespace-pre-line mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Scarcity block */}
              <div className="bg-[#0D1424] border border-amber-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">Cohort Access — Limited Seats</span>
                </div>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  ChainTrack controls lot access by membership tier to protect price integrity. This cohort is capped at <strong className="text-white">12 Growth-tier seats</strong> per quarter. Once filled, the waitlist opens — no exceptions.
                </p>
                {/* Seat progress bar */}
                <div className="mb-1 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Seats filled</span>
                  <span className="text-amber-400">9 / 12 taken</span>
                </div>
                <div className="w-full bg-[#070B14] rounded-full h-2 mb-4">
                  <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all" style={{ width: "75%" }} />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-amber-300/70">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>3 seats remaining at Growth pricing. Starter tier stays open, Growth closes when full.</span>
                </div>
              </div>

              {/* Trust checklist */}
              <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">What you get on day one</div>
                <div className="space-y-2.5">
                  {[
                    { text: "Access to live reverse-auction lot feed — updated daily", color: "text-emerald-400" },
                    { text: "IMEI-clean guarantee with full refund protection", color: "text-emerald-400" },
                    { text: "Dubai DAFZA escrow — funds only released on grade confirmation", color: "text-emerald-400" },
                    { text: "Dedicated WhatsApp support + lot advisors", color: "text-emerald-400" },
                    { text: "Priority access 1–24h before public buyers", color: "text-cyan-400" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-slate-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${item.color} shrink-0 mt-0.5`} />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://wa.me/971523946311?text=Hi%20ChainTrack!%20I%20just%20watched%20the%20buyer%20proof%20video%20and%20want%20to%20lock%20in%20my%20Growth-tier%20seat%20before%20it%20closes."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-trust-cta-primary"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-sm gap-2 py-6 shadow-lg shadow-emerald-500/20">
                    <SiWhatsapp className="w-4 h-4" />
                    Lock In My Buyer Seat — WhatsApp Now
                  </Button>
                </a>
                <a
                  href="https://t.me/+971523946311"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-trust-cta-telegram"
                >
                  <Button variant="outline" className="w-full border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest text-xs gap-2">
                    <SiTelegram className="w-3.5 h-3.5" />
                    Message Hassan on Telegram
                  </Button>
                </a>
                <p className="text-center text-[10px] text-slate-600">
                  No commitment. Cancel anytime. Escrow protects every transaction.
                </p>
              </div>
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
      {/* ── Real Customer Reviews ── */}
      <section className="py-20 bg-[#0A0F1E] border-t border-[#1E293B]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3">Verified Buyers</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Real Traders. Real Results.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              From Deira electronics shops to regional distributors — hear from buyers who moved from middlemen to ChainTrack direct sourcing.
            </p>
          </div>

          {/* Featured video review - Exphone */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-14">
            <div className="relative rounded-2xl overflow-hidden bg-[#0D1424] border border-amber-500/30 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/VcbttEBINQY"
                title="Exphone Retailer Review - Deira Dubai"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video-exphone-review"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 mb-5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Featured Buyer Review</span>
              </div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg font-bold text-white leading-relaxed mb-5 italic">
                "Before ChainTrack, we were buying iPhones from 3–4 middlemen in Deira and still not getting consistent grades. Now we source directly from DAFZA-graded lots — same price, better quality, full IMEI documentation."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="font-black text-white">Exphone Electronics</div>
                  <div className="text-xs text-slate-500">Deira, Dubai · Retail & Wholesale · 200+ units/month on ChainTrack</div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider">Monthly volume</div>
                  <div className="text-sm font-black text-emerald-400">200+ units</div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider">Avg savings vs middlemen</div>
                  <div className="text-sm font-black text-cyan-400">AED 120/unit</div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider">On ChainTrack since</div>
                  <div className="text-sm font-black text-amber-400">2024</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional reviews grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Al Noor Mobile Trading",
                location: "Karama, Dubai",
                volume: "80 units/month",
                review: "The reverse auction saved us 28% on our last iPhone 15 Pro Max order. Suppliers came down from $420 to $301 per unit. That margin difference funded our new shop expansion.",
                stars: 5,
                tag: "Reverse Auction Buyer",
                tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
              },
              {
                name: "Bright Star Electronics",
                location: "Sharjah · Exporting to Pakistan",
                volume: "500+ units/month",
                review: "We used to fly to China every quarter for stock. ChainTrack eliminated that entirely. RODTEP-exempt Indian supply with DAFZA re-export docs — our Pakistani buyers love the pricing now.",
                stars: 5,
                tag: "Export Distributor",
                tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
              },
              {
                name: "Gulf Gadgets LLC",
                location: "Abu Dhabi",
                volume: "150 units/month",
                review: "We moved from fixed-price to reverse auctions after the third order. The IMEI documentation alone is worth it — zero customs issues at any of our destination markets.",
                stars: 5,
                tag: "Wholesale Buyer",
                tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
              },
            ].map((review, i) => (
              <div key={i} className="bg-[#0D1424] border border-[#1E293B] hover:border-amber-500/20 transition-all rounded-2xl p-5" data-testid={`card-review-${i}`}>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5 italic">"{review.review}"</p>
                <div className="border-t border-[#1E293B] pt-4">
                  <div className="font-black text-white text-sm">{review.name}</div>
                  <div className="text-[10px] text-slate-500 mb-2">{review.location} · {review.volume} on ChainTrack</div>
                  <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border w-fit ${review.tagColor}`}>{review.tag}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below reviews */}
          <div className="text-center mt-12">
            <a
              href="https://wa.me/971523946311?text=Hi%20ChainTrack!%20I%20saw%20the%20buyer%20reviews%20and%20want%20to%20start%20sourcing%20iPhones."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-reviews-cta"
            >
              <Button className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2 px-8 py-5">
                <SiWhatsapp className="w-4 h-4" />
                Join These Buyers — WhatsApp Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
      {/* ── Phone Flipper Track Gateway ── */}
      <section className="border-t border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-[#0A0F1E] to-violet-950/30 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-5">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">Remote Work · Worldwide</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Join the <span className="text-purple-400">Phone Flipper</span> Track
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The main onboarding track for ChainTrack. Buy verified lots at reverse-auction prices, flip to local retail channels, and earn. 100% remote — operate from anywhere in the world.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { earn: "Starter Flipper", action: "Buy 5 units/month", income: "AED 500–1,500", note: "Weekend side hustle" },
                  { earn: "Active Flipper", action: "Buy 25 units/month", income: "AED 2,500–7,500", note: "Part-time operation" },
                  { earn: "Pro Flipper", action: "Buy 100+ units/month", income: "AED 10,000–30,000+", note: "Full-time business" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#0D1424] border border-purple-500/20 rounded-xl px-4 py-3">
                    <div>
                      <div className="text-xs font-black text-white">{row.earn}</div>
                      <div className="text-[11px] text-slate-500">{row.action} · {row.note}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-purple-300">{row.income}</div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wider">monthly</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/partners#phone-flipper-track">
                  <Button className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-phone-flipper-gateway-main">
                    <Smartphone className="w-4 h-4" />
                    Join Phone Flipper Track
                  </Button>
                </Link>
                <a href="https://wa.me/971523946311?text=Hi%20DeliWer!%20I%20want%20to%20join%20the%20*Phone%20Flipper%20Track*%20and%20start%20buying%2C%20flipping%20and%20earning%20on%20devices%20via%20ChainTrack." target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-phone-flipper-gateway-whatsapp">
                    <SiWhatsapp className="w-4 h-4" />
                    WhatsApp to Apply
                  </Button>
                </a>
                <a href="https://t.me/+971523946311" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-phone-flipper-gateway-telegram">
                    <SiTelegram className="w-4 h-4" />
                    Telegram to Apply
                  </Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, title: "Worldwide", desc: "Operate from any country. Buy lots on ChainTrack, sell locally.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
                { icon: Shield, title: "Verified Lots", desc: "Every device IMEI-checked, graded and escrowed before you bid.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                { icon: TrendingDown, title: "Reverse Auction", desc: "Suppliers compete down. You win at the lowest price available.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                { icon: Zap, title: "Fast Onboarding", desc: "Apply via WhatsApp. KYC in 24h. First lot within 72h.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                { icon: Users, title: "Flipper Network", desc: "Join a community of active flippers across 30+ countries.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                { icon: Award, title: "Tier Rewards", desc: "Volume bonuses, priority lot access, and dedicated ops at scale.", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
              ].map((card, i) => (
                <div key={i} className={`rounded-2xl border p-4 ${card.bg}`}>
                  <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
                  <div className="font-black text-white text-sm mb-1">{card.title}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── Platform Navigation Hub ── */}
      <section className="border-t border-[#1E293B] py-16 bg-[#060A15]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Platform</div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Explore ChainTrack</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">Three focused pages. One sourcing infrastructure. Navigate to the section that fits your role.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1 — Live Auction */}
            <div className="group bg-[#0D1424] border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-6 transition-all flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Gavel className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-1">You are here</div>
              <h3 className="text-base font-black text-white mb-2">Reverse Auction Marketplace</h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
                Suppliers from US, China and India compete on price. Buyers bid down and win verified lots with DAFZA escrow protection.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Live Lots", "Place Bids", "DAFZA Escrow", "Charter Cargo"].map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">{t}</span>
                ))}
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-4 flex items-center gap-1.5 text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Scroll to live auctions <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Card 2 — Grading */}
            <Link href="/chaintrack-grading" className="group bg-[#0D1424] border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-6 transition-all flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-1">Deep dive</div>
              <h3 className="text-base font-black text-white mb-2">Certified Grading Infrastructure</h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
                How every lot gets A+/A/B/C/ASIS certified before auction opens. 5-stage automated testing, IMEI checks, battery health, video inspection.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["5-Stage Process", "IMEI Verified", "Battery Test", "Video Proof"].map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-black text-amber-400 group-hover:text-amber-300 transition-colors">
                View Grading Standards <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
            {/* Card 3 — Remote Sourcing */}
            <Link href="/chaintrack-sourcing" className="group bg-[#0D1424] border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-6 transition-all flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">For importers</div>
              <h3 className="text-base font-black text-white mb-2">Remote Sourcing Marketplace</h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
                Don't see your product in the live auctions? Submit a sourcing request. Agents aggregate suppliers, arrange grading, and coordinate CIF logistics.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Custom Requests", "CIF Delivery", "Broker-Assisted", "Zero Inventory"].map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-black text-blue-400 group-hover:text-blue-300 transition-colors">
                Submit Sourcing Request <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* AI Agent Widget */}
      <ChainTrackAIAgent />

      {/* ── Sticky mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[#1E293B] bg-[#070B14]/95 backdrop-blur-md p-3 flex gap-3" data-testid="sticky-mobile-cta">
        <a
          href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20want%20to%20register%20as%20a%20buyer%20and%20bid%20on%20lots"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <button className="w-full bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-[11px] rounded-xl py-3 flex items-center justify-center gap-2">
            <Gavel className="w-4 h-4" /> Register as Buyer
          </button>
        </a>
        <a
          href="https://wa.me/971523946311?text=ChainTrack%20-%20I%20want%20to%20list%20a%20lot%20for%20auction"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <button className="w-full bg-amber-500 text-slate-950 font-black uppercase tracking-widest text-[11px] rounded-xl py-3 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> List a Lot
          </button>
        </a>
      </div>
    </div>
  );
}
