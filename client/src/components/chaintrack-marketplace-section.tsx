import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Package, Shield, Zap, Eye, Clock, Users, Gavel, RefreshCw, Filter,
  Timer, Award, Lock, ChevronDown, ChevronUp, Layers, Warehouse,
  Radio, Video, FileSpreadsheet, Tag, Rss, Globe, Search,
  PlayCircle, Upload, CheckCircle2
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

export const LIVE_LOTS = [
  { id: "CT-US-4821", model: "iPhone 15 Pro Max 256GB", origin: "🇺🇸 USA", qty: 500, grade: "A", currentBid: 489, startBid: 520, bids: 18, hoursLeft: 3, minutesLeft: 42, warehouse: "DAFZA", lotType: "ASIS" },
  { id: "CT-CN-7734", model: "iPhone 14 Pro 128GB", origin: "🇨🇳 China", qty: 1200, grade: "A/B", currentBid: 312, startBid: 350, bids: 31, hoursLeft: 11, minutesLeft: 17, warehouse: "Commercity", lotType: "Graded" },
  { id: "CT-IN-2291", model: "iPhone 13 Pro 256GB", origin: "🇮🇳 India", qty: 800, grade: "B", currentBid: 248, startBid: 280, bids: 24, hoursLeft: 1, minutesLeft: 58, warehouse: "DAFZA", lotType: "RODTEP" },
  { id: "CT-US-5519", model: "iPhone 16 Pro Max 512GB", origin: "🇺🇸 USA", qty: 250, grade: "A+", currentBid: 671, startBid: 710, bids: 9, hoursLeft: 22, minutesLeft: 5, warehouse: "DAFZA", lotType: "Charter" },
  { id: "CT-CN-8843", model: "iPhone 12 128GB Mix Lot", origin: "🇨🇳 China", qty: 3000, grade: "B/C", currentBid: 142, startBid: 170, bids: 47, hoursLeft: 0, minutesLeft: 28, warehouse: "Commercity", lotType: "ASIS" },
  { id: "CT-IN-3367", model: "iPhone 15 128GB", origin: "🇮🇳 India", qty: 600, grade: "A", currentBid: 341, startBid: 375, bids: 22, hoursLeft: 6, minutesLeft: 11, warehouse: "DAFZA", lotType: "RODTEP" },
  { id: "CT-US-9104", model: "iPhone 15 Pro 256GB", origin: "🇺🇸 USA", qty: 400, grade: "A", currentBid: 428, startBid: 465, bids: 15, hoursLeft: 14, minutesLeft: 33, warehouse: "DAFZA", lotType: "Graded" },
  { id: "CT-CN-6621", model: "iPhone 11 64GB Lot", origin: "🇨🇳 China", qty: 5000, grade: "C", currentBid: 89, startBid: 110, bids: 63, hoursLeft: 4, minutesLeft: 49, warehouse: "Commercity", lotType: "ASIS" },
];

const LOT_VIDEOS: Record<string, { videoId: string; title: string; duration: string }> = {
  "CT-US-4821": { videoId: "kLtcgg9gyPE", title: "iPhone 15 Pro Max 256GB — Inspection Walkthrough", duration: "4:12" },
  "CT-CN-7734": { videoId: "e2WQSD90rsc", title: "iPhone 14 Pro 128GB — Grade A/B Batch", duration: "6:03" },
  "CT-IN-2291": { videoId: "LXpOSUTH5sQ", title: "iPhone 13 Pro 256GB — RODTEP Certified", duration: "3:48" },
  "CT-US-5519": { videoId: "oozHndEpgIM", title: "iPhone 16 Pro Max 512GB — Grade A+ Lot", duration: "5:27" },
};

export const NA_FEED = [
  { ref: "CT-NA-4412", model: "iPhone 16 Pro Max 512GB", grade: "A/B", qty: 320, price: 618, region: "North America", updated: "12m ago", tag: "Graded", tier: "standard" },
  { ref: "CT-NA-3891", model: "iPhone 15 Pro 256GB", grade: "A", qty: 180, price: 412, region: "North America", updated: "34m ago", tag: "Graded", tier: "standard" },
  { ref: "CT-NA-2274", model: "iPhone 14 128GB Mix Lot", grade: "B", qty: 750, price: 263, region: "North America", updated: "1h ago", tag: "ASIS", tier: "standard" },
  { ref: "CT-NA-1103", model: "iPhone 13 Pro 256GB", grade: "A", qty: 400, price: 291, region: "North America", updated: "2h ago", tag: "Graded", tier: "standard" },
  { ref: "CT-NA-0987", model: "iPhone 12 64GB Lot", grade: "C", qty: 2200, price: 98, region: "North America", updated: "3h ago", tag: "ASIS", tier: "priority" },
  { ref: "CT-NA-0541", model: "iPhone 15 128GB", grade: "A", qty: 560, price: 348, region: "North America", updated: "4h ago", tag: "Graded", tier: "standard" },
];

export const EA_FEED = [
  { ref: "CT-EA-7821", model: "iPhone 16 256GB Dual SIM", grade: "A", qty: 800, price: 441, region: "East Asia", updated: "8m ago", tag: "Charter", tier: "priority" },
  { ref: "CT-EA-6634", model: "iPhone 15 Pro Max 256GB", grade: "A+", qty: 220, price: 589, region: "East Asia", updated: "25m ago", tag: "Graded", tier: "priority" },
  { ref: "CT-EA-5509", model: "iPhone 14 Plus 512GB", grade: "A", qty: 370, price: 319, region: "East Asia", updated: "50m ago", tag: "Graded", tier: "standard" },
  { ref: "CT-EA-4418", model: "iPhone 13 128GB A/B Mix", grade: "A/B", qty: 1400, price: 198, region: "East Asia", updated: "1h ago", tag: "ASIS", tier: "standard" },
  { ref: "CT-EA-3302", model: "iPhone 12 Mini 256GB", grade: "B", qty: 600, price: 142, region: "East Asia", updated: "2h ago", tag: "ASIS", tier: "standard" },
  { ref: "CT-EA-2187", model: "iPhone 11 64GB Lot", grade: "C", qty: 3000, price: 87, region: "East Asia", updated: "3h ago", tag: "ASIS", tier: "standard" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

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

function VideoInspectionDialog({ lotId, model }: { lotId: string; model: string }) {
  const [open, setOpen] = useState(false);
  const vid = LOT_VIDEOS[lotId];
  if (!vid) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5 border-[#1E293B] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 text-[10px] font-black uppercase tracking-widest w-full" data-testid={`button-video-${lotId}`}>
          <PlayCircle className="w-3.5 h-3.5" />
          Inspection Video
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D1424] border-[#1E293B] text-white max-w-2xl p-0 overflow-hidden" aria-describedby={undefined}>
        <DialogHeader className="sr-only">
          <DialogTitle>{vid.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${vid.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={vid.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Live Inspection Recording</span>
            <span className="ml-auto text-[10px] text-slate-500">{vid.duration}</span>
          </div>
          <div className="font-bold text-white text-sm">{vid.title}</div>
          <p className="text-[11px] text-slate-400 mt-1">Recorded at DAFZA / Commercity by our certified inspection team. All units tested per ChainTrack grading protocol before listing.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function XlsxUploadDialog() {
  const [open, setOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"inventory" | "bids">("inventory");
  const [fileName, setFileName] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [matched, setMatched] = useState<null | { lots: number; matches: number; value: string }>(null);
  const { toast } = useToast();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.name.endsWith(".xlsx") && !f.name.endsWith(".xls") && !f.name.endsWith(".csv")) {
      toast({ title: "Invalid file type", description: "Please upload an .xlsx, .xls, or .csv file.", variant: "destructive" });
      return;
    }
    setFileName(f.name);
    setMatched(null);
  }

  function handleProcess() {
    if (!fileName) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const lots = Math.floor(Math.random() * 40) + 10;
      const matches = Math.floor(lots * 0.7);
      const value = `$${(matches * 250 + Math.random() * 50000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      setMatched({ lots, matches, value });
    }, 1800);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 border border-[#1E293B] bg-[#0D1424] hover:bg-[#1E293B] text-slate-300 font-black uppercase tracking-widest text-xs" data-testid="button-xlsx-upload">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          Upload Inventory / Bids
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D1424] border-[#1E293B] text-white max-w-xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-black flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            Bulk Upload — Inventory or Bid Sheet
          </DialogTitle>
          <p className="text-slate-400 text-sm">Upload an Excel or CSV file to match inventory with live auctions or submit bulk bids.</p>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { type: "inventory" as const, label: "Supplier Inventory", desc: "List items for auction", icon: Package, color: "cyan" },
              { type: "bids" as const, label: "Buyer Bid Sheet", desc: "Submit bulk bids on lots", icon: Gavel, color: "amber" },
            ].map(opt => (
              <button
                key={opt.type}
                onClick={() => { setUploadType(opt.type); setFileName(null); setMatched(null); }}
                className={`p-3 rounded-xl border text-left transition-all ${uploadType === opt.type ? `bg-${opt.color}-500/10 border-${opt.color}-500/50` : "bg-[#070B14] border-[#1E293B]"}`}
                data-testid={`btn-upload-type-${opt.type}`}
              >
                <opt.icon className={`w-4 h-4 mb-1.5 ${uploadType === opt.type ? `text-${opt.color}-400` : "text-slate-500"}`} />
                <div className={`text-xs font-black ${uploadType === opt.type ? "text-white" : "text-slate-400"}`}>{opt.label}</div>
                <div className="text-[10px] text-slate-600">{opt.desc}</div>
              </button>
            ))}
          </div>
          <div className="bg-[#070B14] border border-[#1E293B] rounded-xl p-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Required Columns</div>
            {uploadType === "inventory" ? (
              <div className="flex flex-wrap gap-1.5">
                {["Model", "Qty", "Grade", "Origin", "Price/Unit", "Warehouse", "Notes"].map(col => (
                  <span key={col} className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">{col}</span>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {["Lot ID / Model", "Max Bid/Unit", "Min Qty", "Grade Accepted", "Delivery Dest"].map(col => (
                  <span key={col} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">{col}</span>
                ))}
              </div>
            )}
            <p className="text-[10px] text-slate-600 mt-2">
              <a href="https://wa.me/971523906019?text=ChainTrack%20-%20Send%20me%20the%20XLSX%20template" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">WhatsApp us</a> to receive the template file.
            </p>
          </div>
          <label className="block cursor-pointer" data-testid="label-file-upload">
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${fileName ? "border-emerald-500/50 bg-emerald-500/5" : "border-[#1E293B] hover:border-cyan-500/40 bg-[#070B14]"}`}>
              <Upload className={`w-8 h-8 mx-auto mb-2 ${fileName ? "text-emerald-400" : "text-slate-600"}`} />
              {fileName ? (
                <div>
                  <p className="font-bold text-emerald-400 text-sm">{fileName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">File selected · click to change</p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-slate-300 text-sm">Drop file here or click to browse</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">.xlsx · .xls · .csv supported</p>
                </div>
              )}
            </div>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFile} data-testid="input-file-upload" />
          </label>
          {matched && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">✓ Processing Complete</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-xl font-black text-white">{matched.lots}</div>
                  <div className="text-[10px] text-slate-500">Rows read</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-emerald-400">{matched.matches}</div>
                  <div className="text-[10px] text-slate-500">Live matches</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-cyan-400">{matched.value}</div>
                  <div className="text-[10px] text-slate-500">Est. value</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">ChainTrack ops will review matches and contact you within 2h via WhatsApp to confirm.</p>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-[#1E293B] text-slate-400" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              className={`flex-1 font-black text-slate-950 ${uploadType === "inventory" ? "bg-cyan-500 hover:bg-cyan-400" : "bg-amber-500 hover:bg-amber-400"}`}
              disabled={!fileName || processing}
              onClick={handleProcess}
              data-testid="button-process-upload"
            >
              {processing ? (
                <><RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />Processing...</>
              ) : matched ? (
                "Re-process File"
              ) : (
                "Match & Submit →"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type FeedItem = { ref: string; model: string; grade: string; qty: number; price: number; region: string; updated: string; tag: string; tier: string };

function FeedTable({ label, flag, accentClass, items, refreshedAgo, testPrefix }: {
  label: string; flag: string; accentClass: "blue" | "purple"; items: FeedItem[]; refreshedAgo: string; testPrefix: string;
}) {
  const accent = accentClass === "blue"
    ? { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", light: "text-blue-300", pulse: "bg-blue-400", price: "text-cyan-400", bid: "bg-cyan-500 hover:bg-cyan-400 text-slate-950" }
    : { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", light: "text-purple-300", pulse: "bg-purple-400", price: "text-purple-400", bid: "bg-purple-500 hover:bg-purple-400 text-white" };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-2 ${accent.bg} border ${accent.border} rounded-xl px-4 py-2`}>
          <Globe className={`w-4 h-4 ${accent.text}`} />
          <span className="font-black text-white text-sm">{flag} {label}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${accent.pulse} animate-pulse ml-1`} />
        </div>
        <span className="text-[10px] text-slate-500">{items.length} lots · refreshed {refreshedAgo}</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#1E293B]">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#070B14]">
              {["Ref", "Model", "Grade", "Qty", "Price/Unit", "Region", "Type", "Updated", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.ref} className="border-b border-[#1E293B] bg-[#0D1424] hover:bg-[#1a2540] transition-colors" data-testid={`feed-row-${testPrefix}-${i}`}>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono text-slate-500">{item.ref}</span>
                  {item.tier === "priority" && (
                    <span className="ml-1.5 text-[8px] font-black px-1 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-400 uppercase">Priority</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[13px] font-bold text-white">{item.model}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${
                    item.grade === "A+" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" :
                    item.grade === "A"  ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" :
                    item.grade === "A/B"? "text-blue-400 bg-blue-500/10 border-blue-500/30" :
                    item.grade === "B"  ? "text-blue-400 bg-blue-500/10 border-blue-500/30" :
                    "text-amber-400 bg-amber-500/10 border-amber-500/30"
                  }`}>{item.grade}</span>
                </td>
                <td className="px-4 py-3 text-[13px] font-bold text-white">{item.qty.toLocaleString()}</td>
                <td className={`px-4 py-3 text-[14px] font-black ${accent.price}`}>${item.price}</td>
                <td className="px-4 py-3 text-[11px] text-slate-400">{item.region}</td>
                <td className="px-4 py-3">
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-700/50 border border-slate-600/40 text-slate-300">{item.tag}</span>
                </td>
                <td className="px-4 py-3 text-[10px] text-slate-600">{item.updated}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <a href={`https://wa.me/971523906019?text=ChainTrack%20Feed%20Bid%20-%20Ref%20${encodeURIComponent(item.ref)}%20${encodeURIComponent(item.model)}%20Qty:${item.qty}%20%40%24${item.price}/unit`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className={`${accent.bid} font-black text-[9px] uppercase px-2 py-1 h-auto`} data-testid={`btn-${testPrefix}-bid-${i}`}>
                        Bid
                      </Button>
                    </a>
                    <a href={`https://wa.me/971523906019?text=ChainTrack%20Straight%20Buy%20-%20Ref%20${encodeURIComponent(item.ref)}%20${encodeURIComponent(item.model)}%20Qty:${item.qty}%20%40%24${item.price}/unit`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="border-[#1E293B] text-slate-400 text-[9px] uppercase px-2 py-1 h-auto" data-testid={`btn-${testPrefix}-buy-${i}`}>
                        Buy
                      </Button>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
          <div className="space-y-2">
            <BidDialog lot={lot} />
            <VideoInspectionDialog lotId={lot.id} model={lot.model} />
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("chaintrack-inspect", {
                  detail: { lotId: lot.id, model: lot.model }
                }));
              }}
              data-testid={`button-request-inspection-${lot.id}`}
              className="w-full flex items-center justify-center gap-1.5 border border-violet-500/30 bg-violet-500/8 hover:bg-violet-500/20 hover:border-violet-500/60 text-violet-300 text-[10px] font-black uppercase tracking-widest h-8 rounded-lg transition-all"
            >
              <Video className="w-3 h-3" />
              Request Live Inspection
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ── Main exported section ─────────────────────────────────────────────────────

export function ChainTrackMarketplaceSection() {
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
    <section className="container mx-auto px-4 pb-20 max-w-7xl" id="live-marketplace">

      {/* Section header */}
      <div className="flex items-center justify-between gap-4 mb-6 mt-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live Marketplace</span>
          </div>
          <h2 className="text-2xl font-black text-white">Live Auctions &amp; Supplier Feeds</h2>
          <p className="text-sm text-slate-400 mt-1">Real-time inventory from verified US, China &amp; India suppliers — bid, buy, or upload your wishlist.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search lots — iPhone 15 Pro Max, CT-US-4821..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0D1424] border border-[#1E293B] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-md text-sm outline-none"
            data-testid="input-search-lots"
          />
        </div>
        <XlsxUploadDialog />
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
                      <SelectItem value="Graded">Graded &amp; Tested</SelectItem>
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
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md text-muted-foreground border border-[#1E293B] p-1 w-max min-w-full bg-[#ffffff]">
            <TabsTrigger value="live" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap" data-testid="tab-live">
              <Radio className="w-3 h-3 mr-1 sm:mr-1.5 shrink-0" />
              <span>Live Auctions</span>
              <Badge className="ml-1 sm:ml-1.5 bg-red-500 text-white text-[9px] px-1 sm:px-1.5">{LIVE_LOTS.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="feeds" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap" data-testid="tab-feeds">
              <Rss className="w-3 h-3 mr-1 sm:mr-1.5 shrink-0" />
              <span>Supplier Feeds</span>
              <Badge className="ml-1 sm:ml-1.5 bg-emerald-600 text-white text-[9px] px-1 sm:px-1.5">Live</Badge>
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
          {/* ── Member-Only: US Carrier Auction Calendar ── */}
          <div className="mb-8 rounded-2xl border border-amber-500/20 bg-[#070B14] overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">Members Only</span>
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">Private · Not Public</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                <Clock className="w-3 h-3" />
                <span>All times Dubai (GST / UTC+4)</span>
              </div>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <h4 className="font-black text-white text-sm">US Source Auction Calendar</h4>
              </div>
              <p className="text-[11px] text-slate-400 mb-4">Weekly auction windows from major US carrier and ITAD liquidation channels — available to verified ChainTrack members.</p>
              <div className="overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0A0F1E] mb-4">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#1E293B]">
                      <th className="text-left px-4 py-2.5 text-slate-500 font-black uppercase tracking-widest">Day (GST)</th>
                      <th className="text-left px-4 py-2.5 text-slate-500 font-black uppercase tracking-widest">Window</th>
                      <th className="text-left px-4 py-2.5 text-slate-500 font-black uppercase tracking-widest">Source</th>
                      <th className="text-left px-4 py-2.5 text-slate-500 font-black uppercase tracking-widest">Lot Type</th>
                      <th className="text-left px-4 py-2.5 text-slate-500 font-black uppercase tracking-widest">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]">
                    {[
                      { day: "Monday", window: "10:00 – 14:00", source: "T-Mobile ITAD", lot: "iPhone 13–15 Series, Grade A/B", tier: "Standard", tierColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30" },
                      { day: "Tuesday", window: "09:00 – 13:00", source: "Verizon Liquidation", lot: "iPhone 14 Pro Max 256GB, Bulk Mix", tier: "Standard", tierColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30" },
                      { day: "Wednesday", window: "11:00 – 16:00", source: "AT&T Carrier De-fleet", lot: "iPhone 15 Pro, Grade A Premium", tier: "Priority", tierColor: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
                      { day: "Thursday", window: "08:00 – 12:00", source: "ITAD Consortium", lot: "Mixed iOS / Android, Insurance Return", tier: "Standard", tierColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30" },
                      { day: "Friday", window: "10:00 – 15:00", source: "US Carrier Pool (Private)", lot: "iPhone 15 Pro Max, Sealed Lots", tier: "Priority", tierColor: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
                      { day: "Saturday", window: "12:00 – 17:00", source: "AUCNET US", lot: "A-Grade Premium Lots — First-look", tier: "Priority", tierColor: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 font-black text-white">{row.day}</td>
                        <td className="px-4 py-3 text-slate-300">{row.window}</td>
                        <td className="px-4 py-3 text-slate-400">{row.source}</td>
                        <td className="px-4 py-3 text-slate-400">{row.lot}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${row.tierColor}`}>{row.tier}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                <div className="flex-1">
                  <p className="text-[11px] font-black text-white mb-0.5">Access the full auction calendar</p>
                  <p className="text-[10px] text-slate-400">Verified buyers receive weekly auction schedules, cut-off times, and live lot alerts direct via WhatsApp.</p>
                </div>
                <a
                  href="https://wa.me/971523906019?text=Hi+ChainTrack+%E2%80%94+I'd+like+to+access+the+US+Carrier+Auction+Calendar+as+a+verified+buyer."
                  target="_blank" rel="noopener noreferrer"
                >
                  <button className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-colors" data-testid="button-unlock-calendar">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Request Calendar Access
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Lot Grid */}
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

        <TabsContent value="feeds" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 px-5 py-4">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Members-Only Module</span>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">Private · Not Public</span>
                </div>
                <p className="text-[11px] text-amber-300/70 mt-1 leading-relaxed">
                  Supplier identities and product references are masked for trade secrecy. Pricing visibility and feed priority are governed by your membership tier. Do not reproduce or share feed data outside of ChainTrack.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { tier: "Explorer", badge: "bg-slate-700/60 border-slate-600/50 text-slate-300", icon: Eye, desc: "Browse model categories and region availability. Pricing masked.", cta: false },
                { tier: "Standard Member", badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300", icon: Rss, desc: "Full model listings, live pricing, and bid/buy access on Standard-tier lots.", cta: false },
                { tier: "Priority Member", badge: "bg-amber-500/10 border-amber-500/30 text-amber-300", icon: Zap, desc: "All Standard access plus Priority-tier lots, AUCNET & incoming feeds first-look.", cta: true },
              ].map((t, i) => (
                <div key={i} className={`rounded-xl border p-4 ${t.badge.includes("slate") ? "border-slate-600/40 bg-slate-800/30" : t.badge.includes("cyan") ? "border-cyan-500/20 bg-cyan-500/5" : "border-amber-500/20 bg-amber-500/5"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <t.icon className={`w-3.5 h-3.5 ${t.badge.includes("slate") ? "text-slate-400" : t.badge.includes("cyan") ? "text-cyan-400" : "text-amber-400"}`} />
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${t.badge}`}>{t.tier}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{t.desc}</p>
                  {t.cta && (
                    <a href="https://wa.me/971523906019?text=ChainTrack%20-%20I%20want%20to%20upgrade%20to%20Priority%20Membership" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="mt-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-black text-[9px] uppercase tracking-widest h-7 px-3" data-testid="button-upgrade-priority">
                        Request Access →
                      </Button>
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Feed — Updated continuously</span>
                </div>
                <h3 className="text-xl font-black text-white">Member Inventory Feeds</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Live availability from verified supplier networks across North America and East Asia. Prices in USD/unit. Supplier identities are not disclosed — enquire via ChainTrack only.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <XlsxUploadDialog />
              </div>
            </div>
            <FeedTable
              label="North America Feed"
              flag="🇺🇸"
              accentClass="blue"
              items={NA_FEED}
              refreshedAgo="8m ago"
              testPrefix="na"
            />
            <FeedTable
              label="East Asia Feed"
              flag="🇰🇷"
              accentClass="purple"
              items={EA_FEED}
              refreshedAgo="3m ago"
              testPrefix="ea"
            />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Coming Soon — Priority Members First-Look</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { region: "Japan / Auction Network", flag: "🇯🇵", desc: "High-grade auction-sourced lots. A+ dominant. Priority tier first-look.", color: "border-rose-500/20 bg-rose-500/5", badge: "text-rose-300 border-rose-500/30 bg-rose-500/10" },
                  { region: "South Asia Feed", flag: "🇮🇳", desc: "RODTEP-eligible lots, dual-SIM spec. CIS-optimised models. Launching Q3.", color: "border-orange-500/20 bg-orange-500/5", badge: "text-orange-300 border-orange-500/30 bg-orange-500/10" },
                  { region: "Europe Refurb Network", flag: "🇩🇪", desc: "Carrier de-fleet and insurance-return lots. High grade mix. Launching Q4.", color: "border-violet-500/20 bg-violet-500/5", badge: "text-violet-300 border-violet-500/30 bg-violet-500/10" },
                ].map((f, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${f.color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{f.flag}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${f.badge}`}>{f.region}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{f.desc}</p>
                    <div className="mt-2 flex items-center gap-1 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                      <Lock className="w-2.5 h-2.5" /> Priority access only
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Rss, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", title: "Live Inventory Feed", desc: "Verified supplier partners push updated stock levels directly into ChainTrack. Quantities and prices refresh continuously. Supplier identities remain confidential." },
                { icon: Gavel, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", title: "Bid or Buy Straight", desc: "Place a reverse auction bid to compete on price, or request a straight buy at the listed rate. ChainTrack coordinates grading and escrow either way." },
                { icon: FileSpreadsheet, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", title: "Upload Your Wishlist", desc: "Have a large order? Upload an XLSX with your model requirements and quantities — we match against all active feeds and live lots automatically." },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border p-4 ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                  <div className="font-black text-white text-sm mb-1">{item.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
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
  );
}
