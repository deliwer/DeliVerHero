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
  ShoppingCart, Gavel, Plus, TrendingUp, AlertCircle, MapPin, Warehouse, ChevronDown,
  ChevronRight, Boxes, Bell, Eye, Cpu,
  Award, Lock, ChevronUp, Layers, Truck, Activity, Radio, ExternalLink,
  Target, BarChart2, Smartphone, Weight, FileCheck, Anchor, Route,
  Bot, MessageSquare, Video, Network, Repeat, CreditCard, UserCheck,
  Send, Languages, BrainCircuit, TrendingDownIcon,
  X, Tag, Building, LayoutGrid
} from "lucide-react";
import { SiLinkedin, SiWhatsapp, SiTelegram } from "react-icons/si";
import ChainTrackAIAgent from "@/components/chaintrack-ai-agent";
import warehouseImage from "@assets/stock_images/modern_warehouse_ful_49a92694.jpg";
import cargoPlaneImage from "@assets/stock_images/hero_cargo_plane.jpg";
import dubaiHubImage from "@assets/stock_images/dubai_air_hub.jpg";
import electronicsImage from "@assets/stock_images/people_electronics_r_02ba73a8.jpg";


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

function CutoffTimer({ cutoffMs }: { cutoffMs: number }) {
  const [remaining, setRemaining] = useState(cutoffMs);
  useEffect(() => {
    setRemaining(cutoffMs);
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1000)), 1000);
    return () => clearInterval(id);
  }, [cutoffMs]);

  const totalH = Math.floor(remaining / 3_600_000);
  const mins   = Math.floor((remaining % 3_600_000) / 60_000);
  const days   = Math.floor(totalH / 24);
  const hours  = totalH % 24;

  const label = days > 0
    ? `${days}d ${hours}h left`
    : totalH > 0
    ? `${hours}h ${mins}m left`
    : mins > 0
    ? `${mins}m left`
    : "Cutoff passed";

  const color = days === 0 && totalH < 4
    ? "text-red-400 border-red-500/30 bg-red-500/10"
    : days === 0 && totalH < 24
    ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
    : "text-slate-400 border-slate-600/30 bg-slate-800/30";

  return (
    <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded border ${color}`}>
      <Clock className="w-2.5 h-2.5 shrink-0" />
      {label}
    </div>
  );
}

function BuyerNetworkForm() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", country: "", whatsapp: "", products: "", volume: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.whatsapp) {
      toast({ title: "Required fields missing", description: "Please fill in your name and WhatsApp number.", variant: "destructive" });
      return;
    }
    const msg = encodeURIComponent(
      `ChainTrack Buyer Network Registration\n\nName: ${form.name}\nCompany: ${form.company}\nCountry: ${form.country}\nWhatsApp: ${form.whatsapp}\nProducts: ${form.products}\nMonthly Volume: ${form.volume}`
    );
    window.open(`https://wa.me/971523906019?text=${msg}`, "_blank");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-[#0D1424] border border-emerald-500/30 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
        <div className="font-black text-white text-lg mb-2">Request Sent!</div>
        <p className="text-slate-400 text-sm">Our team will review your application and respond on WhatsApp within 24 hours.</p>
        <Button variant="ghost" className="mt-4 text-slate-500 text-xs" onClick={() => setSent(false)}>Submit another request</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-4" data-testid="form-buyer-network">
      <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Buyer Registration Form</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Full Name *</Label>
          <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" className="bg-[#070B14] border-[#1E293B] text-white text-sm h-9" data-testid="input-buyer-name" />
        </div>
        <div>
          <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Company</Label>
          <Input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Company name" className="bg-[#070B14] border-[#1E293B] text-white text-sm h-9" data-testid="input-buyer-company" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Country</Label>
          <Input value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} placeholder="e.g. Azerbaijan" className="bg-[#070B14] border-[#1E293B] text-white text-sm h-9" data-testid="input-buyer-country" />
        </div>
        <div>
          <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">WhatsApp *</Label>
          <Input value={form.whatsapp} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="+7 / +994 / +998..." className="bg-[#070B14] border-[#1E293B] text-white text-sm h-9" data-testid="input-buyer-whatsapp" />
        </div>
      </div>
      <div>
        <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Products Interested In</Label>
        <Input value={form.products} onChange={e => setForm(p => ({ ...p, products: e.target.value }))} placeholder="e.g. iPhone 15 Pro, Samsung S24, Mixed lots" className="bg-[#070B14] border-[#1E293B] text-white text-sm h-9" data-testid="input-buyer-products" />
      </div>
      <div>
        <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Monthly Volume (units)</Label>
        <Select value={form.volume} onValueChange={v => setForm(p => ({ ...p, volume: v }))}>
          <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-sm h-9" data-testid="select-buyer-volume">
            <SelectValue placeholder="Select volume range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under_50">Under 50 units</SelectItem>
            <SelectItem value="50_200">50 – 200 units</SelectItem>
            <SelectItem value="200_500">200 – 500 units</SelectItem>
            <SelectItem value="500_1000">500 – 1,000 units</SelectItem>
            <SelectItem value="1000_plus">1,000+ units</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs gap-2 py-5" data-testid="button-buyer-form-submit">
        <SiWhatsapp className="w-4 h-4" />
        Submit via WhatsApp
      </Button>
      <p className="text-center text-[10px] text-slate-600">Submitting opens WhatsApp with your details pre-filled. KYC review within 24 hours.</p>
    </form>
  );
}

function HeroRequirementForm() {
  const [model, setModel] = useState("");
  const [grade, setGrade] = useState("");
  const [qty, setQty] = useState("");
  const [market, setMarket] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!model || !grade || !qty) return;
    const msg = `ChainTrack — Procurement Requirement\n\nModel: ${model}\nGrade: ${grade}\nQuantity: ${qty} units\nDestination: ${market || "Not specified"}\n\nPlease send me matching supplier offers.`;
    window.open(`https://wa.me/971523906019?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="mb-10 max-w-2xl">
      <div className="bg-[#0D1424] border border-cyan-500/30 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,209,255,0.04),transparent_70%)]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Submit Your Requirement</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block">Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9 font-bold" data-testid="select-req-model">
                    <SelectValue placeholder="iPhone model" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                    {["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12"].map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block">Grade</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9 font-bold" data-testid="select-req-grade">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                    <SelectItem value="A+">A+ — Pristine</SelectItem>
                    <SelectItem value="A">A — Excellent</SelectItem>
                    <SelectItem value="B">B — Good</SelectItem>
                    <SelectItem value="C">C — Fair</SelectItem>
                    <SelectItem value="A/B Mix">A/B Mix</SelectItem>
                    <SelectItem value="B/C Mix">B/C Mix</SelectItem>
                    <SelectItem value="Any">Any Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  placeholder="e.g. 500"
                  className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9 font-bold placeholder:text-slate-600"
                  data-testid="input-req-qty"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block">Destination</label>
                <Select value={market} onValueChange={setMarket}>
                  <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9 font-bold" data-testid="select-req-market">
                    <SelectValue placeholder="Market" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                    {["Russia", "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia", "Pakistan", "Bangladesh", "Nigeria", "Egypt", "Kenya", "Turkey", "Germany", "United Kingdom", "Other / Global"].map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!model || !grade || !qty}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black uppercase tracking-widest text-xs gap-2 h-10"
              data-testid="button-hero-req-submit"
            >
              {submitted ? (
                <><CheckCircle2 className="w-4 h-4" />Sent — check WhatsApp</>
              ) : (
                <><Send className="w-4 h-4" />Send Requirement via WhatsApp</>
              )}
            </Button>
          </form>
          <p className="text-[10px] text-slate-600 mt-2.5 text-center">
            Opens WhatsApp with your requirement pre-filled · We respond within 2 hours
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChainTrackPage() {
  const [openMarketBlocks, setOpenMarketBlocks] = useState<Record<string, boolean>>({});
  const [showDemandForm, setShowDemandForm] = useState(false);
  const [demandModel, setDemandModel] = useState("");
  const [demandQty, setDemandQty] = useState("");
  const [demandGrade, setDemandGrade] = useState("");
  const [demandPrice, setDemandPrice] = useState("");
  const [demandNotes, setDemandNotes] = useState("");
  const [demandSent, setDemandSent] = useState(false);

  const { data: demandData, refetch: refetchDemand } = useQuery<{ count: number; weekKey: string; cutoffMs: number }>({
    queryKey: ["/api/chaintrack/demand-count"],
    refetchInterval: 60_000,
  });

  const demandPingMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/chaintrack/demand-ping"),
    onSuccess: () => { refetchDemand(); },
  });


  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <SEOMeta
        title="ChainTrack — Live Reverse Auction & Sourcing Marketplace for Used iPhones | Dubai"
        description="ChainTrack is Dubai's B2B reverse auction and live sourcing platform for used iPhones. WSC & KTC feeds. Suppliers from US, China, India & Korea compete on price. DAFZA & Commercity escrow. 50+ markets: CIS, Europe, Africa & South Asia. XLSX inventory upload, live inspection videos."
        canonical="https://www.deliwer.com/chaintrack"
        keywords="used iPhone wholesale Dubai, reverse auction iPhones, buy used iPhones bulk Dubai, DAFZA electronics escrow, used iPhone export Dubai, CIS iPhone market, phone flipper Dubai, refurbished iPhone wholesale, ChainTrack marketplace, iPhone lots Dubai, bulk iPhone purchase, B2B phone marketplace, used iPhone Kazakhstan, used iPhone Russia, used iPhone Africa, iPhone wholesale supplier Dubai, reverse bid marketplace, phone flipper track, WSC Dubai, KTC electronics, live inspection videos iPhones, bulk bid upload xlsx, iPhone sourcing platform Dubai, electronics reverse auction UAE, wholesale iPhone Korea, iPhone import Dubai DAFZA, B2B electronics sourcing Dubai, iPhone auction CIS markets, refurbished iPhone Kazakhstan Russia, Dubai electronics re-export hub"
        faqs={[
          { question: "How does ChainTrack's reverse auction work for wholesale iPhones?", answer: "Buyers submit a requirement (model, grade, quantity) and ChainTrack broadcasts it to verified Dubai suppliers. Suppliers compete by submitting price bids in reverse. The buyer selects the winning offer and funds are held in DAFZA escrow until goods are inspected and confirmed. Average sourcing time is 24–72 hours." },
          { question: "What is the minimum order quantity on ChainTrack?", answer: "Reverse auction lots start at 50 units. Fixed-price wholesale lots are available from 25 units. Container load orders (500+ units) receive dedicated coordination support. Contact via WhatsApp +971 52 390 6019 or join the CIS Buyers Community." },
          { question: "Which markets does ChainTrack serve?", answer: "ChainTrack sources for buyers in 50+ markets including CIS (Azerbaijan, Kazakhstan, Uzbekistan, Russia, Georgia, Kyrgyzstan), Sub-Saharan Africa, South Asia, Eastern Europe, and the MENA region. Dubai's DAFZA and Commercity free zones handle all re-export documentation." },
          { question: "How does DAFZA escrow protect buyers on ChainTrack?", answer: "Payment is held by Dubai Airport Freezone Authority (DAFZA) and released to the supplier only after the buyer confirms receipt and grading match. This eliminates payment fraud risk entirely. All lots are inspected via live video before funds are released." },
          { question: "What grades of refurbished iPhones are available in Dubai wholesale?", answer: "ChainTrack offers Grade A+ (Like New, no cosmetic marks), Grade A (Excellent, minor marks), and Grade B (Good, visible wear, fully functional). All devices are CPO-certified from verified carrier feeds and meet UAE ESMA electronics standards." },
          { question: "Can I upload a bulk XLSX requirement to ChainTrack?", answer: "Yes. Buyers can upload an XLSX inventory requirement file listing multiple models, grades, and quantities in a single submission. ChainTrack broadcasts each line item to the supplier network simultaneously, compressing multi-SKU sourcing from weeks to hours." },
          { question: "How fast is air cargo from Dubai to CIS markets via ChainTrack Logistics?", answer: "Express air freight from Dubai DXB/DWC to Baku (GYD), Almaty (ALA), and Tashkent (TAS) averages 24–72 hours door-to-airport. The INSTC corridor has reduced transit time by up to 40% versus sea routing. Charter cargo is available for urgent and bulk shipments." },
          { question: "How do I become a phone flipper or broker partner on ChainTrack?", answer: "ChainTrack's Phone Flipper Track is a revenue-sharing broker programme — no upfront capital required. Apply via WhatsApp at +971 52 390 6019 or through the Brokers page. Partners earn a commission on every lot they coordinate. Local coordination roles are available in Azerbaijan and Kazakhstan." }
        ]}
        ogType="website"
        webPageType="ServicePage"
        dateModified="2026-05-30"
        serviceSchema={{
          name: "ChainTrack — Live Reverse Auction & iPhone Sourcing Marketplace Dubai",
          description: "Dubai's B2B reverse auction and live sourcing platform for used iPhones. Verified supplier network from US, China, India & Korea. DAFZA & Commercity escrow on every deal. Serving 50+ markets including all CIS countries. XLSX bulk upload, live inspection videos.",
          area: "Dubai, UAE — serving CIS, Africa, South Asia, Eastern Europe, MENA",
        }}
        breadcrumbs={[
          { name: "Home", url: "https://www.deliwer.com" },
          { name: "ChainTrack", url: "https://www.deliwer.com/chaintrack" }
        ]}
      />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "ChainTrack — Reverse Auction iPhone Sourcing Marketplace Dubai",
        "serviceType": "B2B Used iPhone Reverse Auction & Wholesale Sourcing Platform",
        "url": "https://www.deliwer.com/chaintrack",
        "provider": {
          "@type": "Organization",
          "name": "ChainTrack by DeliWer",
          "url": "https://www.deliwer.com/chaintrack",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Wholesale Procurement",
            "telephone": "+971523906019",
            "contactOption": "WhatsApp",
            "availableLanguage": ["English", "Arabic", "Russian"],
          },
        },
        "areaServed": [
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "China" },
          { "@type": "Country", "name": "South Korea" },
          { "@type": "Country", "name": "Azerbaijan" },
          { "@type": "Country", "name": "Kazakhstan" },
          { "@type": "Country", "name": "Uzbekistan" },
          { "@type": "Country", "name": "Russia" },
          { "@type": "Country", "name": "Georgia" },
          { "@type": "Country", "name": "Kyrgyzstan" },
          { "@type": "Country", "name": "Pakistan" },
          { "@type": "Country", "name": "Nigeria" },
          { "@type": "Country", "name": "Kenya" },
        ],
        "offers": [
          {
            "@type": "Offer",
            "name": "Reverse Auction Sourcing",
            "description": "Post your iPhone requirement and have 200+ verified global suppliers compete on price. Average saving 15–35% vs listed prices. Minimum 50 units. DAFZA escrow required. Results in 24–72 hours.",
            "priceCurrency": "USD",
          },
          {
            "@type": "Offer",
            "name": "Live Feed Lots (WSC & KTC)",
            "description": "Fixed-price inventory sourced live from WSC (Wholesale Supplier Community) and KTC (Korea Trade Centre) carrier feeds. Grade A+/A/B certified. XLSX bulk upload supported.",
            "priceCurrency": "USD",
          },
          {
            "@type": "Offer",
            "name": "Phone Flipper & Broker Track",
            "description": "Revenue-sharing programme for resellers, buying-group organisers and CIS distributors. 2–6% commission per coordinated order. No upfront capital required.",
            "priceCurrency": "USD",
          },
        ],
      })}</script>
      <LiveTicker />
      {/* ── Pipeline indicator ── */}
      <div className="bg-[#070B14] border-b border-[#1E293B]">
        <div className="container mx-auto max-w-7xl px-4 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest flex-wrap">
          <span className="text-white/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            ① Source on ChainTrack
          </span>
          <span className="text-slate-600 mx-1">→</span>
          <Link href="/wholesale">
            <span className="text-slate-500 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">② Plan &amp; Price on Bulk Purchasing</span>
          </Link>
          <span className="text-slate-600 mx-1">→</span>
          <Link href="/logistics">
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">③ Ship via Logistics</span>
          </Link>
        </div>
      </div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={electronicsImage} alt="" className="w-full h-full object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/70 via-[#070B14]/85 to-[#070B14]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,209,255,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_60%)]" />

        <div className="relative container mx-auto px-4 pt-14 pb-16 max-w-7xl">

          {/* Eyebrow badges */}
          <div className="flex items-center gap-3 mb-7 flex-wrap">
            <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Target className="w-3 h-3" />
              Demand-Driven Procurement
            </div>
            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Smartphone className="w-3 h-3" />
              iPhone 12 and Newer
            </div>
            <div className="flex items-center gap-2 bg-slate-700/40 border border-slate-600/40 text-slate-400 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              Dubai-based · No Inventory Owned
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black leading-[0.95] mb-6 tracking-tight max-w-4xl">
            <span className="text-white">Never Search Multiple</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">iPhone Suppliers</span>
            <br />
            <span className="text-white">Again.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Tell us the model, grade and quantity you need. ChainTrack continuously scans wholesale inventory and brings qualified supplier offers to you through reverse bidding — reducing procurement time, cost and uncertainty.
          </p>

          {/* Flow diagram: Traditional vs ChainTrack */}
          <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-3xl">
            {/* Traditional */}
            <div className="bg-[#0D1424] border border-red-500/20 rounded-2xl p-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-1.5">
                <X className="w-3 h-3" /> Traditional Model
              </div>
              <div className="flex flex-col gap-2">
                {["Buyer chases inventory", "Multiple supplier portals", "Monitor auctions constantly", "Compare grades & specs", "Miss lots due to timing"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-black text-red-400">{i + 1}</span>
                    </div>
                    <span className="text-[12px] text-slate-400">{step}</span>
                  </div>
                ))}
                <div className="mt-2 pt-3 border-t border-red-500/15 text-[11px] font-black text-red-400 uppercase tracking-wider">
                  = Procurement uncertainty
                </div>
              </div>
            </div>

            {/* ChainTrack */}
            <div className="bg-[#0D1424] border border-cyan-500/30 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,209,255,0.04),transparent_70%)]" />
              <div className="relative">
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" /> ChainTrack Model
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { step: "Submit your requirement", color: "cyan" },
                    { step: "ChainTrack scans sourcing network", color: "cyan" },
                    { step: "Suppliers compete via reverse bidding", color: "blue" },
                    { step: "You receive multiple qualified offers", color: "indigo" },
                    { step: "Choose best offer & arrange logistics", color: "indigo" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-black text-cyan-400">{i + 1}</span>
                      </div>
                      <span className="text-[12px] text-slate-200">{item.step}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-3 border-t border-cyan-500/20 text-[11px] font-black text-cyan-400 uppercase tracking-wider">
                    = The market comes to you
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-9 max-w-2xl">
            {[
              "Continuous access to iPhone 12 and newer",
              "Demand-driven — no more auction chasing",
              "Multiple supplier offers per requirement",
              "Reverse bidding improves pricing",
              "One request reaches multiple inventory sources",
              "Independent sourcing and logistics support",
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                {b}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20want%20to%20submit%20a%20procurement%20requirement" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs" data-testid="button-submit-requirement">
                <Send className="w-4 h-4" />
                Submit Requirement
              </Button>
            </a>
            <Link href="/wholesale">
              <Button size="lg" className="gap-2 bg-white text-slate-950 hover:bg-slate-100 font-black uppercase tracking-widest text-xs" data-testid="button-view-inventory">
                <Eye className="w-4 h-4" />
                View Available Inventory
              </Button>
            </Link>
            <a href="https://wa.me/971523906019" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="gap-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs" data-testid="button-whatsapp-chaintrack">
                <SiWhatsapp className="w-4 h-4" />
                +971 52 390 6019
              </Button>
            </a>
            <a href="https://t.me/chaintracklogistics" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="gap-2 text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 font-bold uppercase tracking-widest text-xs" data-testid="button-telegram-chaintrack-hero">
                <SiTelegram className="w-4 h-4" />
                Telegram
              </Button>
            </a>
            <a href="https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="gap-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs" data-testid="button-wa-community-hero">
                <SiWhatsapp className="w-4 h-4" />
                Buyers Community
              </Button>
            </a>
          </div>

          {/* Inline Submit Requirement form */}
          <HeroRequirementForm />

          {/* Trust statement */}
          <div className="flex items-start gap-3 mb-10 px-5 py-4 rounded-2xl bg-[#0D1424] border border-[#1E293B] max-w-2xl">
            <Network className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-slate-400 leading-relaxed">
              The same iPhone inventory exists across hundreds of suppliers, auctions and wholesalers.{" "}
              <span className="text-slate-200 font-semibold">ChainTrack removes the need to monitor them individually.</span>{" "}
              Submit your requirement once and receive competing supply offers from our sourcing network.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "15,000+", label: "Verified Trades", icon: CheckCircle2, color: "text-emerald-400" },
              { value: "$280M+", label: "GMV Processed", icon: DollarSign, color: "text-cyan-400" },
              { value: "420+", label: "Active Suppliers", icon: Building2, color: "text-blue-400" },
              { value: "50+", label: "Markets Served", icon: Globe, color: "text-purple-400" },
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

      {/* ── LIVE REVERSE AUCTION EVENT BANNER ── */}
      <section className="border-y border-blue-500/30 bg-gradient-to-r from-[#060D1F] via-[#0A1428] to-[#060D1F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/40 shrink-0">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Live Bidding Event</span>
            </div>
            <div>
              <div className="text-white font-black text-base md:text-lg leading-tight">
                USA iPhone 17 Pro Max — Reverse Bidding
              </div>
              <div className="text-slate-400 text-xs mt-0.5">
                204 units available · Desert Silver, Deep Blue, Cosmic Orange · Closes Friday 18:00 Dubai
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Link href="/buy/reverse-auction">
              <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] whitespace-nowrap" data-testid="button-live-auction-cta">
                <Gavel className="w-3.5 h-3.5" />
                Submit Reverse Bid
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href="/buy">
              <Button size="sm" variant="ghost" className="gap-2 text-slate-300 hover:text-white font-black uppercase tracking-widest text-[10px] whitespace-nowrap" data-testid="button-buy-portal-cta">
                <Eye className="w-3.5 h-3.5" />
                All Inventory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intent + Urgency strip ── */}
      <div className="border-y border-[#1E293B] bg-[#0A0F1E]">
        {/* Buyer / Seller / Wholesale funnel selector */}
        <div className="container mx-auto px-4 max-w-7xl py-5">
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-3">What brings you here today?</div>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20want%20to%20register%20as%20a%20buyer%20and%20bid%20on%20lots" target="_blank" rel="noopener noreferrer" className="group" data-testid="funnel-buyer">
              <div className="flex items-center gap-4 bg-cyan-500/8 border border-cyan-500/25 hover:border-cyan-500/50 rounded-2xl p-5 transition-all cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Gavel className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-sm">Bid on live auctions</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Register as buyer · bid on lots · DAFZA escrow</div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <Link href="/wholesale" className="group" data-testid="funnel-wholesale">
              <div className="flex items-center gap-4 bg-amber-500/8 border border-amber-500/25 hover:border-amber-500/50 rounded-2xl p-5 transition-all cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-sm">Buy at fixed wholesale price</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Browse inventory · submit BOQ · no auction wait</div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <div className="group cursor-pointer" data-testid="funnel-seller">
              <div className="flex items-center gap-4 bg-emerald-500/8 border border-emerald-500/25 hover:border-emerald-500/50 rounded-2xl p-5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-sm">List inventory for auction</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Submit a lot · graded &amp; photographed · best price</div>
                </div>
                <ListLotDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── How It Works ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Process</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How Remote Sourcing Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto">From browsing verified inventory to receiving your shipment — fully remote. No travel required.</p>
          </div>
          <div className="grid md:grid-cols-6 gap-3 items-start">
            {[
              { icon: LayoutGrid, step: "01", title: "Browse Available Inventory", desc: "Explore verified wholesale lots from US, China and India suppliers — model, grade, qty, price.", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
              { icon: Video, step: "02", title: "Request Live Inspection", desc: "Book a live video walk-through. Our Dubai team records cosmetic sampling, battery and IMEI checks.", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
              { icon: Gavel, step: "03", title: "Submit Reverse Bid", desc: "Name your price. Suppliers compete down — the lowest compliant bid wins the lot.", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
              { icon: UserCheck, step: "04", title: "Supplier Reviews Offer", desc: "The supplier accepts, counters, or passes. ChainTrack mediates and confirms final terms.", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
              { icon: Route, step: "05", title: "Arrange Export Logistics", desc: "ChainTrack coordinates DAFZA escrow, customs docs, and air charter or consolidated freight.", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
              { icon: Boxes, step: "06", title: "Receive Inventory", desc: "Lot delivered CIF to your country. Escrow released to supplier only on your delivery confirmation.", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 5 && <div className="hidden md:block absolute top-8 left-[calc(50%+36px)] right-0 h-px border-t border-dashed border-[#1E293B]" />}
                <div className={`rounded-2xl border p-4 ${step.bg}`}>
                  <div className="text-[10px] font-black text-slate-600 tracking-widest mb-2">{step.step}</div>
                  <step.icon className={`w-5 h-5 ${step.color} mb-2`} />
                  <h3 className="font-black text-white text-[12px] mb-1.5 leading-tight">{step.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
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
              <a href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20represent%20a%20grading%20facility%20and%20want%20to%20discuss%20a%20partnership." target="_blank" rel="noopener noreferrer">
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
              <a href="https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black uppercase tracking-widest gap-2 text-xs" data-testid="button-wa-community-partnership">
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  Join Buyers Community
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
      {/* ── Logistics Bridge ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0D1424] border border-cyan-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-black text-white text-lg mb-1">Lot secured. We handle the rest.</h3>
                <p className="text-slate-400 text-sm">DAFZA escrow · 1FLT air charter · 0% re-export duty · CIS & global delivery</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/logistics">
                <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs gap-2" data-testid="button-arrange-delivery">
                  <Truck className="w-3.5 h-3.5" />
                  Arrange Delivery →
                </Button>
              </Link>
              <a href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20won%20a%20lot%20and%20need%20logistics" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#1E293B] text-slate-400 hover:text-white font-black uppercase tracking-widest text-xs gap-2" data-testid="button-logistics-whatsapp">
                  <SiWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp
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
                  href="https://wa.me/971523906019?text=Hi%20ChainTrack!%20I%20just%20watched%20the%20buyer%20proof%20video%20and%20want%20to%20lock%20in%20my%20Growth-tier%20seat%20before%20it%20closes."
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
                  href="https://t.me/+971523906019"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-trust-cta-telegram"
                >
                  <Button variant="outline" className="w-full border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest text-xs gap-2">
                    <SiTelegram className="w-3.5 h-3.5" />
                    Message Hassan on Telegram
                  </Button>
                </a>
                <a
                  href="https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-trust-cta-wa-community"
                >
                  <Button variant="outline" className="w-full border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black uppercase tracking-widest text-xs gap-2">
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    Join Buyers Community
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
      {/* ── Membership tiers → moved to /pricing-logistics ── */}
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
              href="https://wa.me/971523906019?text=Hi%20ChainTrack!%20I%20saw%20the%20buyer%20reviews%20and%20want%20to%20start%20sourcing%20iPhones."
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
                <a href="https://wa.me/971523906019?text=Hi%20DeliWer!%20I%20want%20to%20join%20the%20*Phone%20Flipper%20Track*%20and%20start%20buying%2C%20flipping%20and%20earning%20on%20devices%20via%20ChainTrack." target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-phone-flipper-gateway-whatsapp">
                    <SiWhatsapp className="w-4 h-4" />
                    WhatsApp to Apply
                  </Button>
                </a>
                <a href="https://t.me/+971523906019" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-phone-flipper-gateway-telegram">
                    <SiTelegram className="w-4 h-4" />
                    Telegram to Apply
                  </Button>
                </a>
                <a href="https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-phone-flipper-gateway-wa-community">
                    <SiWhatsapp className="w-4 h-4" />
                    Join Community
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
      {/* ── Remote Inspection Services ── */}
      <section className="border-t border-[#1E293B] bg-[#070B14] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3">Verification Services</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Remote Inspection</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Every lot independently verified before your bid is final. Book any service or combine all three.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Video,
                title: "Live Video Inspection",
                color: "text-cyan-400",
                border: "border-cyan-500/30",
                bg: "bg-cyan-500/5",
                items: ["Cosmetic sampling (screen, body, ports)", "Battery verification & cycle count", "Functional testing walkthrough", "Packaging and accessories review"],
              },
              {
                icon: Smartphone,
                title: "IMEI Verification",
                color: "text-blue-400",
                border: "border-blue-500/30",
                bg: "bg-blue-500/5",
                items: ["Sample IMEI blacklist checks", "Activation lock / MDM status", "Carrier lock status confirmed", "Blacklist-clean guarantee issued"],
              },
              {
                icon: FileCheck,
                title: "Lot Verification",
                color: "text-emerald-400",
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/5",
                items: ["Physical quantity confirmation", "Grade consistency verification", "Photo documentation per unit", "Condition report issued to buyer"],
              },
            ].map((svc, i) => (
              <div key={i} className={`rounded-2xl border ${svc.border} ${svc.bg} p-6`} data-testid={`card-inspection-${i}`}>
                <div className={`w-10 h-10 rounded-xl ${svc.bg} border ${svc.border} flex items-center justify-center mb-4`}>
                  <svc.icon className={`w-5 h-5 ${svc.color}`} />
                </div>
                <h3 className="font-black text-white text-base mb-4">{svc.title}</h3>
                <ul className="space-y-2.5 mb-6">
                  {svc.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-[12px] text-slate-400">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${svc.color} shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/971523906019?text=ChainTrack%20-%20I%20want%20to%20book%20a%20${encodeURIComponent(svc.title)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className={`w-full font-black text-[10px] uppercase tracking-widest gap-1.5 ${svc.color === "text-cyan-400" ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950" : svc.color === "text-blue-400" ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`} data-testid={`button-book-inspection-${i}`}>
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    Book Inspection
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buyer Network Lead Capture ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Join the Network</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Buyer Network Registration</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Register as a verified buyer to access live auction lots, request inventory, and arrange export logistics. Buyers from Azerbaijan, Kazakhstan, Uzbekistan, Russia and all CIS markets welcome.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Shield, color: "text-emerald-400", title: "KYC-verified access only", desc: "All buyers are manually verified. No anonymous accounts." },
                  { icon: Lock, color: "text-cyan-400", title: "DAFZA escrow protection", desc: "Funds held by ChainTrack until delivery confirmed." },
                  { icon: Globe, color: "text-blue-400", title: "50+ markets supported", desc: "Full CIS, Europe, Africa and South Asia logistics coverage." },
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-[#0D1424] border border-[#1E293B] flex items-center justify-center shrink-0 mt-0.5`}>
                      <pt.icon className={`w-4 h-4 ${pt.color}`} />
                    </div>
                    <div>
                      <div className="font-black text-white text-sm">{pt.title}</div>
                      <div className="text-[11px] text-slate-500">{pt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <BuyerNetworkForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Export Logistics ── */}
      <section className="border-t border-[#1E293B] bg-[#0A0F1E] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">Logistics</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Export Logistics Routes</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Dubai is the zero-tariff re-export hub. Every route is documented, escrowed and insured.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                route: "USA → UAE → CIS",
                icon: Route,
                color: "text-cyan-400",
                border: "border-cyan-500/30",
                bg: "bg-cyan-500/5",
                steps: ["Source from US carrier / ITAD", "Air freight to DAFZA Dubai", "Re-export to Kazakhstan, Uzbekistan, Azerbaijan, Russia"],
                note: "Carrier unlocked · IMEI clean · 0% re-export duty",
              },
              {
                route: "USA → Direct Export",
                icon: Plane,
                color: "text-blue-400",
                border: "border-blue-500/30",
                bg: "bg-blue-500/5",
                steps: ["Source from US liquidator", "ChainTrack inspection at origin", "Direct air freight to buyer's country"],
                note: "Faster for Grade A+ lots · FOB / CIF terms available",
              },
              {
                route: "Supplier → Buyer",
                icon: Truck,
                color: "text-emerald-400",
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/5",
                steps: ["Supplier ships to DAFZA escrow warehouse", "ChainTrack grades and confirms lot", "Buyer approves → delivery arranged"],
                note: "DAFZA escrow · grade-confirmed release · door delivery",
              },
            ].map((route, i) => (
              <div key={i} className={`rounded-2xl border ${route.border} ${route.bg} p-6`} data-testid={`card-route-${i}`}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`w-9 h-9 rounded-lg ${route.bg} border ${route.border} flex items-center justify-center`}>
                    <route.icon className={`w-4.5 h-4.5 ${route.color}`} />
                  </div>
                  <div className="font-black text-white text-sm">{route.route}</div>
                </div>
                <ol className="space-y-2.5 mb-4">
                  {route.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className={`text-[9px] font-black w-4 h-4 rounded-full ${route.color} bg-[#0D1424] border border-[#1E293B] flex items-center justify-center shrink-0 mt-0.5`}>{j + 1}</span>
                      <span className="text-[12px] text-slate-400">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className={`text-[10px] font-bold ${route.color} border-t ${route.border} pt-3`}>{route.note}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0D1424] border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="font-black text-white">1FLT Air Charter · DWC Airport Dubai</div>
                <div className="text-[11px] text-slate-400">A320F dedicated electronics cargo · DAFZA to GYD Baku · ICT Tashkent · ALA Almaty · SVO Moscow</div>
              </div>
            </div>
            <a href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20need%20a%20logistics%20quote" target="_blank" rel="noopener noreferrer">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs gap-2 shrink-0" data-testid="button-logistics-quote">
                <Truck className="w-3.5 h-3.5" />
                Get Logistics Quote
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Content Hub ── */}
      <section className="border-t border-[#1E293B] bg-[#070B14] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">Resources</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Content Hub</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Market intelligence, inspection footage, and buying guides — all in one place for ChainTrack members.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: Video, title: "Inspection Videos", desc: "Live footage from DAFZA grading sessions. Watch real-time cosmetic and functional checks before bidding.", color: "text-cyan-400", bg: "bg-cyan-500/5 border-cyan-500/20", cta: "Watch Videos" },
              { icon: Eye, title: "Supplier Visits", desc: "On-site reports from verified supplier warehouses across US, China and India. Grade consistency reviews.", color: "text-blue-400", bg: "bg-blue-500/5 border-blue-500/20", cta: "View Reports" },
              { icon: BarChart2, title: "Market Reports", desc: "Weekly CIS and global smartphone market pricing intelligence. Demand trends by model and grade.", color: "text-purple-400", bg: "bg-purple-500/5 border-purple-500/20", cta: "Read Reports" },
              { icon: Gavel, title: "Auction Results", desc: "Historical reverse auction closing prices. See what lots cleared at — plan your bids with real data.", color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/20", cta: "See Results" },
              { icon: BrainCircuit, title: "Buying Guides", desc: "IMEI check protocols, grade comparison standards, CIS import duties, escrow mechanics explained.", color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/20", cta: "Read Guides" },
            ].map((item, i) => (
              <a key={i} href={`https://wa.me/971523906019?text=ChainTrack%20Content%20Hub%20-%20${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer" className="group" data-testid={`card-content-${i}`}>
                <div className={`rounded-2xl border ${item.bg} p-5 h-full flex flex-col hover:border-opacity-70 transition-all`}>
                  <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
                  <div className="font-black text-white text-sm mb-2">{item.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed flex-1">{item.desc}</p>
                  <div className={`mt-4 flex items-center gap-1 text-[10px] font-black ${item.color} group-hover:underline`}>
                    {item.cta} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-[10px] font-black text-purple-300 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              Full content access requires ChainTrack membership · WhatsApp to request access
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
          href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20want%20to%20register%20as%20a%20buyer%20and%20bid%20on%20lots"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <button className="w-full bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-[11px] rounded-xl py-3 flex items-center justify-center gap-2">
            <Gavel className="w-4 h-4" /> Register as Buyer
          </button>
        </a>
        <a
          href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20want%20to%20list%20a%20lot%20for%20auction"
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
