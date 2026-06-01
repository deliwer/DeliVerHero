import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Package, Globe, Filter, ShoppingCart, Gavel, TrendingDown, CheckCircle,
  Star, Sparkles, Clock, MapPin, Search, ArrowRight, Shield, DollarSign,
  Zap, Users, BarChart3, ChevronRight, Truck, Building2, Banknote,
  FileCheck, Timer, AlertCircle, Play, ExternalLink, Phone,
  Plus, Trash2, ClipboardList, Send, CheckCircle2, X
} from "lucide-react";
import { IPHONE_CATALOG, getLatestModels } from "@shared/iphone-catalog";
import iPhone17ProMaxBlue from "@assets/generated_images/iPhone_17_Pro_Max_Blue_5527e769.png";
import iPhone17Pro from "@assets/generated_images/iPhone_17_Pro_Natural_102f756e.png";
import iPhone17Plus from "@assets/generated_images/iPhone_17_Plus_Black_07e48dac.png";
import iPhone17 from "@assets/generated_images/iPhone_17_White_c97e6eb6.png";
import electronicsRetailImg from "@assets/stock_images/people_electronics_r_02ba73a8.jpg";
import electronicsRetail2 from "@assets/stock_images/people_electronics_r_a39cc14b.jpg";
import electronicsRetail3 from "@assets/stock_images/people_electronics_r_56b6c258.jpg";
import warehouseImg from "@assets/stock_images/modern_warehouse_ful_49a92694.jpg";
import smartphoneExchange from "@assets/stock_images/smartphone_exchange__8d89cbac.jpg";
import smartphoneExchange2 from "@assets/stock_images/smartphone_exchange__fed81eff.jpg";
import shippingPort from "@assets/stock_images/hero_shipping_port.jpg";
import brokerHandshake from "@assets/stock_images/broker_handshake_dubai.jpg";
import dubaiAirHub from "@assets/stock_images/dubai_air_hub.jpg";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChainTrackMarketplaceSection } from "@/components/chaintrack-marketplace-section";

export default function BulkPurchasingPage() {
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [activeProcurement, setActiveProcurement] = useState<"wholesale" | "auction" | null>(null);
  const { toast } = useToast();

  // BOQ state
  type BoqLine = { id: string; model: string; storage: string; condition: string; qty: number; targetPrice: string };
  const [boqLines, setBoqLines] = useState<BoqLine[]>([]);
  const [boqDraft, setBoqDraft] = useState({ model: "", storage: "", condition: "", qty: "10", targetPrice: "" });
  const [boqContact, setBoqContact] = useState({ company: "", whatsapp: "", email: "", location: "" });
  const [boqSubmitted, setBoqSubmitted] = useState(false);

  function addBoqLine() {
    if (!boqDraft.model || !boqDraft.storage || !boqDraft.condition || !boqDraft.qty) {
      toast({ title: "Fill in all required fields", description: "Model, storage, condition and quantity are required.", variant: "destructive" });
      return;
    }
    setBoqLines(prev => [...prev, { ...boqDraft, id: Date.now().toString() }]);
    setBoqDraft(d => ({ ...d, model: "", targetPrice: "" }));
  }

  function removeBoqLine(id: string) {
    setBoqLines(prev => prev.filter(l => l.id !== id));
  }

  function submitBoq() {
    if (boqLines.length === 0) {
      toast({ title: "Add at least one line item", description: "Your BOQ is empty.", variant: "destructive" });
      return;
    }
    if (!boqContact.company || !boqContact.whatsapp) {
      toast({ title: "Contact details required", description: "Company name and WhatsApp number are required.", variant: "destructive" });
      return;
    }
    setBoqSubmitted(true);
    toast({ title: "BOQ Submitted!", description: "Our procurement team will send your formal quote within 4 business hours." });
  }

  const iphone17Models = getLatestModels();

  const mockInventory = [
    { id: "1", model: "iPhone 17 Pro Max", storage: "256GB", color: "Blue Titanium", condition: "New", quantity: 150, pricePerUnit: 485, region: "USA", grade: "A+", image: iPhone17ProMaxBlue },
    { id: "2", model: "iPhone 17 Pro", storage: "256GB", color: "Natural Titanium", condition: "New", quantity: 200, pricePerUnit: 425, region: "UAE", grade: "A+", image: iPhone17Pro },
    { id: "3", model: "iPhone 17 Plus", storage: "128GB", color: "Black", condition: "Like New", quantity: 100, pricePerUnit: 365, region: "Japan", grade: "A", image: iPhone17Plus },
    { id: "4", model: "iPhone 17", storage: "128GB", color: "White", condition: "New", quantity: 180, pricePerUnit: 345, region: "China", grade: "A+", image: iPhone17 },
    { id: "5", model: "iPhone 16 Pro Max", storage: "512GB", color: "Black Titanium", condition: "Like New", quantity: 80, pricePerUnit: 450, region: "USA", grade: "A" },
    { id: "6", model: "iPhone 15 Pro Max", storage: "256GB", color: "Natural Titanium", condition: "Refurbished", quantity: 120, pricePerUnit: 380, region: "Europe", grade: "B+" },
  ];

  const filteredInventory = mockInventory.filter((item) => {
    if (selectedModel !== "all" && !item.model.includes(selectedModel)) return false;
    if (selectedCondition !== "all" && item.condition !== selectedCondition) return false;
    if (selectedRegion !== "all" && item.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070B14] text-white">

      {/* ── HERO with real image overlay ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={electronicsRetailImg} alt="Electronics wholesale market" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-[#070B14]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">B2B Wholesale Procurement · Dubai</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Bulk iPhone
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Wholesale Purchasing
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed max-w-2xl">
              The procurement platform for traditional channel buyers — Deira traders, souq retailers, and regional distributors. Two models. Fixed price or reverse auction. You choose.
            </p>
            <div className="flex items-center gap-4 mb-10 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>No minimum barrier for registered buyers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>DAFZA escrow on every deal</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2"
                onClick={() => setActiveProcurement("wholesale")}
                data-testid="button-hero-wholesale"
              >
                <Banknote className="w-5 h-5" />
                Buy at Fixed Price
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black uppercase tracking-widest gap-2"
                onClick={() => setActiveProcurement("auction")}
                data-testid="button-hero-auction"
              >
                <Gavel className="w-5 h-5" />
                Submit Reverse Auction
              </Button>
            </div>
          </div>
        </div>
        {/* Floating stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-4">
          {[
            { label: "Lots Live Today", value: "142", color: "text-cyan-400" },
            { label: "Avg Savings vs Retail", value: "34%", color: "text-emerald-400" },
            { label: "Countries Served", value: "34+", color: "text-amber-400" },
          ].map((s, i) => (
            <div key={i} className="bg-[#0D1424]/90 border border-[#1E293B] rounded-xl px-4 py-3 text-center backdrop-blur-sm">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BUYER FUNNEL STEPPER ── */}
      <div className="bg-[#070B14] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest flex-wrap">
          <Link href="/chaintrack">
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">① Source on ChainTrack</span>
          </Link>
          <span className="text-slate-600 mx-1">→</span>
          <span className="text-white/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            ② Plan &amp; Price — Bulk Purchasing
          </span>
          <span className="text-slate-600 mx-1">→</span>
          <Link href="/logistics">
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">③ Ship via Logistics</span>
          </Link>
        </div>
      </div>

      {/* ── PROCUREMENT MODEL GATEWAY ── */}
      <section className="py-16 px-4 bg-[#0A0F1E]" id="procurement-gateway">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3">Choose Your Procurement Model</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Two Ways to Buy. One Platform.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Traditional Deira-style cash buyers get fixed-price wholesale. Tech-savvy bulk importers unlock reverse auctions where suppliers compete for your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Model 1: Straight Wholesale */}
            <div
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeProcurement === "wholesale" ? "border-amber-500 shadow-lg shadow-amber-500/20" : "border-[#1E293B] hover:border-amber-500/40"}`}
              onClick={() => setActiveProcurement("wholesale")}
              data-testid="card-procurement-wholesale"
            >
              <div className="absolute inset-0">
                <img src={smartphoneExchange} alt="Wholesale purchase" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/80 to-[#070B14]/40" />
              </div>
              <div className="relative z-10 p-8 min-h-[360px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 mb-4 w-fit">
                  <Banknote className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Model 1 · Traditional Wholesale</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Straight Wholesale<br />Fixed Price Purchase</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Browse verified lots at displayed prices. See the unit cost, click buy, pay by wire or escrow — units are yours. No bidding, no waiting. The traditional Deira way, but with global supply.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Price shown = price you pay. No surprises.",
                    "25 or 50 pcs MOQ — cash, wire or escrow accepted",
                    "Goods at DAFZA within 48–72h of payment",
                    "Perfect for: shop owners, souq traders, small importers",
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
                <Button
                  className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2 w-fit"
                  data-testid="button-start-wholesale"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Browse Fixed-Price Lots
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              {activeProcurement === "wholesale" && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
              )}
            </div>

            {/* Model 2: Reverse Auction */}
            <div
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeProcurement === "auction" ? "border-cyan-500 shadow-lg shadow-cyan-500/20" : "border-[#1E293B] hover:border-cyan-500/40"}`}
              onClick={() => setActiveProcurement("auction")}
              data-testid="card-procurement-auction"
            >
              <div className="absolute inset-0">
                <img src={electronicsRetail2} alt="Reverse auction" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/80 to-[#070B14]/40" />
              </div>
              <div className="relative z-10 p-8 min-h-[360px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 mb-4 w-fit">
                  <Gavel className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">Model 2 · Reverse Auction</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Reverse Auction<br />Suppliers Compete Down</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Post what you want to buy. Verified global suppliers then compete to offer you the lowest price. The longer the auction runs, the lower the price drops. You win at the floor.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "You name the model, qty, and target price",
                    "Multiple verified suppliers bid against each other",
                    "You pick the winner — guaranteed best market price",
                    "Perfect for: importers buying 100+ units at a time",
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest gap-2 w-fit"
                  data-testid="button-start-auction"
                >
                  <Gavel className="w-4 h-4" />
                  Submit Auction Request
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              {activeProcurement === "auction" && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Key difference callout */}
          <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-black text-white mb-2">What's the real difference?</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-amber-300">Fixed-price wholesale</strong> is fast and predictable — you see the price, you buy. Best for regular stock replenishment and small shops.&nbsp;
                  <strong className="text-cyan-300">Reverse auctions</strong> take 24–72 hours but typically save 15–35% vs listed prices because suppliers actively undercut each other. Best for large bulk orders where savings multiply per unit. Watch the explainer below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE MARKETPLACE: Auctions & Supplier Feeds ── */}
      <ChainTrackMarketplaceSection />

      {/* ── VIDEO EXPLAINER: Reverse Auction ── */}
      <section className="py-16 px-4 bg-[#070B14]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Video Explainer</div>
            <h2 className="text-3xl font-black text-white mb-4">See How Reverse Auctions Work</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Watch this real-world breakdown of how buyers post requests and suppliers compete for the best price — exactly what happens on ChainTrack.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Video embed */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0D1424] border border-[#1E293B] aspect-video">
              <iframe
                src="https://www.youtube.com/embed/EEqupgrtNX0"
                title="How Reverse Auctions Work"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video-reverse-auction"
              />
            </div>
            {/* Steps */}
            <div className="space-y-4">
              {[
                { step: "01", title: "You post your requirement", desc: "Specify model, storage, condition, quantity and your target unit price. Takes 2 minutes.", icon: FileCheck, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                { step: "02", title: "Suppliers bid against each other", desc: "Verified global suppliers (US, India, China, UAE) each submit their best offer. They compete down — not up.", icon: TrendingDown, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                { step: "03", title: "You pick the winner", desc: "Review all bids side by side. Choose price, supplier rating, or delivery speed. You're always in control.", icon: Gavel, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { step: "04", title: "Escrow protects your money", desc: "Payment held in DAFZA escrow. Released to supplier only after you confirm receipt and grading.", icon: Shield, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`p-2 rounded-xl border shrink-0 ${s.color}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Step {s.step}</div>
                    <div className="font-black text-white text-sm mb-1">{s.title}</div>
                    <div className="text-xs text-slate-400">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRADITIONAL BUYER FUNNEL ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={warehouseImg} alt="Warehouse operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/90 to-[#070B14]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 mb-5">
              <Building2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-300">For Traditional Channel Buyers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Built for Deira Traders &amp; Souq Retailers</h2>
            <p className="text-slate-300 max-w-2xl leading-relaxed">
              You've been buying iPhones the hard way — calling middlemen, flying to China, dealing with quality issues. ChainTrack gives traditional traders the tools that global importers have been using for years.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: Banknote,
                title: "Cash & Wire Buyers",
                desc: "Pay by bank transfer or cash-in-DAFZA. No credit card required. Invoices issued same day.",
                tag: "Traditional Payment",
                color: "border-amber-500/30 bg-amber-500/5",
                badge: "amber",
              },
              {
                icon: Building2,
                title: "Deira Shop Owners",
                desc: "Stock your shelves weekly. Pick models by model number, colour, storage — exactly how you'd call a supplier, but verified.",
                tag: "Retail Replenishment",
                color: "border-orange-500/30 bg-orange-500/5",
                badge: "orange",
              },
              {
                icon: Globe,
                title: "Regional Distributors",
                desc: "Buying for Pakistan, Africa or CIS? We handle customs docs, RODTEP exemptions, and freight to your hub.",
                tag: "Export Wholesale",
                color: "border-blue-500/30 bg-blue-500/5",
                badge: "blue",
              },
              {
                icon: Users,
                title: "Group Buyers",
                desc: "Running a buying group or collective? Pool orders to hit volume tiers and unlock better unit prices for everyone.",
                tag: "Collective Buying",
                color: "border-emerald-500/30 bg-emerald-500/5",
                badge: "emerald",
              },
            ].map((card, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${card.color}`} data-testid={`card-buyer-type-${i}`}>
                <card.icon className={`w-6 h-6 mb-3 ${card.badge === "amber" ? "text-amber-400" : card.badge === "orange" ? "text-orange-400" : card.badge === "blue" ? "text-blue-400" : "text-emerald-400"}`} />
                <div className="font-black text-white text-sm mb-2">{card.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed mb-3">{card.desc}</div>
                <div className={`text-[9px] font-black uppercase tracking-widest ${card.badge === "amber" ? "text-amber-500" : card.badge === "orange" ? "text-orange-500" : card.badge === "blue" ? "text-blue-500" : "text-emerald-500"}`}>{card.tag}</div>
              </div>
            ))}
          </div>

          {/* Traditional buyer journey */}
          <div className="bg-[#0D1424]/90 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-black text-white mb-6 text-center">Your Journey from Inquiry to Delivery</h3>
            <div className="flex flex-col md:flex-row items-stretch gap-0">
              {[
                { step: "WhatsApp Inquiry", desc: "Message us what you want: model, qty, condition. Our team responds within 1 hour during business hours.", icon: Phone, time: "~1 hour" },
                { step: "Verified Quote", desc: "We send a formal quote with unit price, total, payment terms, and delivery timeline. No hidden charges.", icon: FileCheck, time: "Same day" },
                { step: "Escrow Payment", desc: "Wire payment to DAFZA escrow account. Funds held safely until you confirm receiving the goods.", icon: Banknote, time: "24-48 hours" },
                { step: "Grading & Inspection", desc: "Every device physically inspected at our DAFZA facility. Detailed condition report sent with photos.", icon: Shield, time: "24-48 hours" },
                { step: "Delivery to You", desc: "Goods shipped to your location or collected at DAFZA. Real-time tracking from warehouse to door.", icon: Truck, time: "48-72 hours" },
              ].map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                  {i < 4 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-5 h-5 text-slate-600" />
                    </div>
                  )}
                  <div className="w-10 h-10 rounded-full bg-[#070B14] border border-amber-500/30 flex items-center justify-center mb-3">
                    <s.icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-black text-white text-xs mb-1">{s.step}</div>
                  <div className="text-[10px] text-slate-500 leading-relaxed mb-2 px-2">{s.desc}</div>
                  <div className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{s.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INVENTORY BROWSER ── */}
      <section className="py-16 px-4 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">Live Inventory</div>
            <h2 className="text-3xl font-black text-white mb-4">Browse Fixed-Price Wholesale Lots</h2>
            <p className="text-slate-400 text-sm">Verified, graded, and ready to ship. Prices locked for 24 hours.</p>
          </div>

          {/* Filters */}
          <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1.5 block">Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white" data-testid="select-model-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                    <SelectItem value="all">All Models</SelectItem>
                    <SelectItem value="iPhone 17">iPhone 17 Series</SelectItem>
                    <SelectItem value="iPhone 16">iPhone 16 Series</SelectItem>
                    <SelectItem value="iPhone 15">iPhone 15 Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1.5 block">Condition</Label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white" data-testid="select-condition-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Refurbished">Refurbished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1.5 block">Source Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white" data-testid="select-region-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UAE">UAE</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full border-[#1E293B] text-slate-400 hover:text-white"
                  onClick={() => { setSelectedModel("all"); setSelectedCondition("all"); setSelectedRegion("all"); }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Inventory Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((item) => (
              <div key={item.id} className="bg-[#0D1424] border border-[#1E293B] hover:border-amber-500/30 transition-all rounded-2xl overflow-hidden" data-testid={`card-inventory-${item.id}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="font-black text-white text-base mb-0.5">{item.model}</div>
                      <div className="text-xs text-slate-500">{item.storage} · {item.color}</div>
                    </div>
                    {item.image && <img src={item.image} alt={item.model} className="w-14 h-14 object-contain" />}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Condition</span>
                      <span className="font-bold text-white">{item.condition}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Grade</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span className="font-bold text-amber-300">{item.grade}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Origin</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span className="text-slate-300">{item.region}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Available</span>
                      <span className="font-bold text-emerald-400">{item.quantity} units</span>
                    </div>
                  </div>
                  <div className="border-t border-[#1E293B] pt-4">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-slate-500">Fixed wholesale price</span>
                      <span className="text-2xl font-black text-amber-400">${item.pricePerUnit}</span>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest" data-testid={`button-request-quote-${item.id}`}>
                            Request Quote
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0D1424] border-[#1E293B] text-white">
                          <DialogHeader>
                            <DialogTitle className="text-white">Request Wholesale Quote</DialogTitle>
                            <DialogDescription className="text-slate-400">
                              Get a formal quote for {item.model} with payment terms and delivery schedule
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div>
                              <Label className="text-slate-300 text-xs">Quantity (min 25 units)</Label>
                              <Input id="quote-quantity" type="number" placeholder="e.g. 50" min="25" className="bg-[#070B14] border-[#1E293B] text-white mt-1.5" data-testid="input-quote-quantity" />
                            </div>
                            <div>
                              <Label className="text-slate-300 text-xs">Company / Shop Name</Label>
                              <Input id="quote-company" placeholder="Exphone Electronics LLC" className="bg-[#070B14] border-[#1E293B] text-white mt-1.5" data-testid="input-quote-company" />
                            </div>
                            <div>
                              <Label className="text-slate-300 text-xs">WhatsApp Number</Label>
                              <Input id="quote-phone" type="tel" placeholder="+971 5X XXX XXXX" className="bg-[#070B14] border-[#1E293B] text-white mt-1.5" />
                            </div>
                            <div>
                              <Label className="text-slate-300 text-xs">Email (for formal invoice)</Label>
                              <Input id="quote-email" type="email" placeholder="your@company.com" className="bg-[#070B14] border-[#1E293B] text-white mt-1.5" data-testid="input-quote-email" />
                            </div>
                            <Button
                              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest"
                              onClick={() => {
                                toast({ title: "Quote Requested", description: "Our team will WhatsApp you a formal quote within 2 hours." });
                                setShowQuoteDialog(false);
                              }}
                              data-testid="button-submit-quote"
                            >
                              Submit — Get Quote in 2 Hours
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Link href="/chaintrack">
                        <Button variant="outline" className="border-[#1E293B] text-slate-400 hover:text-white text-xs" data-testid={`button-view-details-${item.id}`}>
                          Auction
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredInventory.length === 0 && (
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-16 text-center text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-bold mb-1">No inventory matches your filters</p>
              <p className="text-sm">Try broader filters or submit a reverse auction for what you need</p>
            </div>
          )}
        </div>
      </section>

      {/* ── LIVE NOW ON CHAINTRACK TEASER ── */}
      <section className="py-12 px-4 bg-[#070B14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live on ChainTrack Right Now</span>
              </div>
              <h2 className="text-xl font-black text-white">Active Auction Lots — Bid &amp; Save 15–35%</h2>
              <p className="text-[11px] text-slate-500 mt-1">These are live lots on ChainTrack you can bid on today. Auctions close within hours.</p>
            </div>
            <Link href="/chaintrack">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-xs gap-2 shrink-0" data-testid="button-view-all-live-lots">
                <Gavel className="w-4 h-4" />
                View All Live Lots
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: "CT-US-4821", model: "iPhone 15 Pro Max 256GB", origin: "🇺🇸 USA", qty: 500, grade: "A", currentBid: 489, hoursLeft: 3, minutesLeft: 42, gradeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
              { id: "CT-US-5519", model: "iPhone 16 Pro Max 512GB", origin: "🇺🇸 USA", qty: 250, grade: "A+", currentBid: 671, hoursLeft: 22, minutesLeft: 5, gradeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
              { id: "CT-IN-3367", model: "iPhone 15 128GB", origin: "🇮🇳 India", qty: 600, grade: "A", currentBid: 341, hoursLeft: 6, minutesLeft: 11, gradeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
            ].map((lot) => (
              <div key={lot.id} className="bg-[#0D1424] border border-[#1E293B] hover:border-cyan-500/30 transition-all rounded-2xl p-5" data-testid={`teaser-lot-${lot.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[9px] font-mono text-slate-600 mb-1">{lot.id}</div>
                    <div className="font-black text-white text-sm leading-tight">{lot.model}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{lot.origin} · {lot.qty.toLocaleString()} units</div>
                  </div>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${lot.gradeColor}`}>{lot.grade}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">Current Bid</div>
                    <div className="text-2xl font-black text-cyan-400">${lot.currentBid}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">Closes In</div>
                    <div className={`text-sm font-black ${lot.hoursLeft < 4 ? "text-red-400" : "text-amber-400"}`}>
                      {lot.hoursLeft > 0 ? `${lot.hoursLeft}h ${lot.minutesLeft}m` : `${lot.minutesLeft}m`}
                    </div>
                  </div>
                </div>
                <Link href="/chaintrack">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-xs gap-2" data-testid={`button-bid-teaser-${lot.id}`}>
                    <Gavel className="w-3.5 h-3.5" />
                    Bid on ChainTrack
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOQ — BILL OF QUANTITIES ── */}
      <section className="py-16 px-4 bg-[#070B14]" id="boq">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-5">
              <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Step 1 Before Requesting a Quote</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Submit Your Bill of Quantities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Don't just ask for a price and disappear. A BOQ tells our procurement team <strong className="text-white">exactly what you need</strong> — every model, storage, condition, and quantity — so we can source it precisely and send you a binding quote, not a ballpark.
            </p>
          </div>

          {/* Why BOQ callout */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: ClipboardList, title: "Structured demand, not vague inquiry", desc: "A BOQ commits you to specific SKUs. Suppliers take committed buyers seriously and offer better pricing.", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
              { icon: TrendingDown, title: "Better prices through volume bundling", desc: "When your BOQ spans multiple models, we negotiate as a single package — unlocking bundle pricing unavailable per-SKU.", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
              { icon: FileCheck, title: "Formal binding quote, not a WhatsApp number", desc: "BOQ submission triggers a real procurement workflow. You receive a signed pro-forma invoice with payment terms.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${c.color}`}>
                <c.icon className="w-5 h-5 mb-3" />
                <div className="font-black text-white text-sm mb-1.5">{c.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>

          {boqSubmitted ? (
            /* ── Success state ── */
            <div className="bg-[#0D1424] border border-emerald-500/30 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">BOQ Received — Thank You</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Our procurement team is reviewing your {boqLines.length} line item{boqLines.length !== 1 ? "s" : ""}. Expect a signed pro-forma invoice on WhatsApp within <strong className="text-white">4 business hours</strong>.
              </p>
              <div className="bg-[#070B14] border border-[#1E293B] rounded-xl p-4 max-w-sm mx-auto mb-6 text-left">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-3">Your BOQ summary</div>
                {boqLines.map((l, i) => (
                  <div key={l.id} className="flex items-center justify-between text-xs text-slate-400 py-1 border-b border-[#1E293B] last:border-0">
                    <span>{l.model} · {l.storage} · {l.condition}</span>
                    <span className="font-black text-white ml-2">{l.qty} units</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="border-[#1E293B] text-slate-400 hover:text-white"
                onClick={() => { setBoqSubmitted(false); setBoqLines([]); setBoqContact({ company: "", whatsapp: "", email: "", location: "" }); }}
              >
                Submit Another BOQ
              </Button>
            </div>
          ) : (
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl overflow-hidden">

              {/* Line item builder */}
              <div className="p-6 border-b border-[#1E293B]">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">1</div>
                  <span className="font-black text-white">Build Your Demand List — Add Each SKU</span>
                </div>

                {/* Draft row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Model *</Label>
                    <Select value={boqDraft.model} onValueChange={v => setBoqDraft(d => ({ ...d, model: v }))}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" data-testid="select-boq-model">
                        <SelectValue placeholder="iPhone model" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white max-h-60">
                        {[
                          "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Plus", "iPhone 17",
                          "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
                          "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
                          "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
                          "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini",
                          "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini",
                          "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
                          "iPhone SE (3rd Gen)", "iPhone SE (2nd Gen)",
                        ].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Storage *</Label>
                    <Select value={boqDraft.storage} onValueChange={v => setBoqDraft(d => ({ ...d, storage: v }))}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" data-testid="select-boq-storage">
                        <SelectValue placeholder="Storage" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        {["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Condition *</Label>
                    <Select value={boqDraft.condition} onValueChange={v => setBoqDraft(d => ({ ...d, condition: v }))}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" data-testid="select-boq-condition">
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="New">New (sealed)</SelectItem>
                        <SelectItem value="Like New">Like New (A+ grade)</SelectItem>
                        <SelectItem value="Excellent">Excellent (A grade)</SelectItem>
                        <SelectItem value="Good">Good (B grade)</SelectItem>
                        <SelectItem value="Refurbished">Refurbished (any grade)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Qty (units) *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={boqDraft.qty}
                      onChange={e => setBoqDraft(d => ({ ...d, qty: e.target.value }))}
                      className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9"
                      placeholder="e.g. 50"
                      data-testid="input-boq-qty"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Target $/unit</Label>
                    <Input
                      type="number"
                      min="1"
                      value={boqDraft.targetPrice}
                      onChange={e => setBoqDraft(d => ({ ...d, targetPrice: e.target.value }))}
                      className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9"
                      placeholder="Optional"
                      data-testid="input-boq-target-price"
                    />
                  </div>
                </div>

                <Button
                  onClick={addBoqLine}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs gap-2"
                  data-testid="button-add-boq-line"
                >
                  <Plus className="w-4 h-4" />
                  Add to BOQ
                </Button>
              </div>

              {/* BOQ table */}
              <div className="p-6 border-b border-[#1E293B]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">2</div>
                    <span className="font-black text-white">Your BOQ — {boqLines.length} line item{boqLines.length !== 1 ? "s" : ""}</span>
                    {boqLines.length > 0 && (
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {boqLines.reduce((sum, l) => sum + Number(l.qty), 0).toLocaleString()} total units
                      </span>
                    )}
                  </div>
                </div>

                {boqLines.length === 0 ? (
                  <div className="border-2 border-dashed border-[#1E293B] rounded-xl p-8 text-center text-slate-600">
                    <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-bold">No items yet</p>
                    <p className="text-xs mt-1">Add your first SKU above — you can add as many models as you need</p>
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden border border-[#1E293B]">
                    {/* Table header */}
                    <div className="grid grid-cols-12 bg-[#070B14] px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-600">
                      <div className="col-span-4">Model</div>
                      <div className="col-span-2">Storage</div>
                      <div className="col-span-2">Condition</div>
                      <div className="col-span-2 text-right">Qty</div>
                      <div className="col-span-1 text-right">Target</div>
                      <div className="col-span-1"></div>
                    </div>
                    {boqLines.map((line, i) => (
                      <div
                        key={line.id}
                        className={`grid grid-cols-12 items-center px-4 py-3 text-xs border-t border-[#1E293B] ${i % 2 === 0 ? "bg-[#0D1424]" : "bg-[#070B14]"}`}
                        data-testid={`boq-line-${i}`}
                      >
                        <div className="col-span-4 font-bold text-white truncate">{line.model}</div>
                        <div className="col-span-2 text-slate-400">{line.storage}</div>
                        <div className="col-span-2">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                            line.condition === "New" ? "bg-emerald-500/20 text-emerald-400" :
                            line.condition === "Like New" ? "bg-cyan-500/20 text-cyan-400" :
                            line.condition === "Excellent" ? "bg-blue-500/20 text-blue-400" :
                            "bg-slate-500/20 text-slate-400"
                          }`}>{line.condition}</span>
                        </div>
                        <div className="col-span-2 text-right font-black text-amber-400">{Number(line.qty).toLocaleString()}</div>
                        <div className="col-span-1 text-right text-slate-500">{line.targetPrice ? `$${line.targetPrice}` : "—"}</div>
                        <div className="col-span-1 flex justify-end">
                          <button
                            onClick={() => removeBoqLine(line.id)}
                            className="text-slate-600 hover:text-red-400 transition-colors p-1"
                            data-testid={`button-remove-boq-${i}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Totals row */}
                    <div className="grid grid-cols-12 items-center px-4 py-3 text-xs border-t border-amber-500/20 bg-amber-500/5">
                      <div className="col-span-8 font-black text-amber-400 uppercase tracking-widest text-[10px]">Total Demand</div>
                      <div className="col-span-2 text-right font-black text-amber-400 text-base">
                        {boqLines.reduce((sum, l) => sum + Number(l.qty), 0).toLocaleString()}
                      </div>
                      <div className="col-span-2"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact details + submit */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">3</div>
                  <span className="font-black text-white">Your Business Details</span>
                  <span className="text-xs text-slate-500">— so we can send the formal quote</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Company / Shop Name *</Label>
                    <Input
                      value={boqContact.company}
                      onChange={e => setBoqContact(c => ({ ...c, company: e.target.value }))}
                      placeholder="Exphone Electronics LLC"
                      className="bg-[#070B14] border-[#1E293B] text-white"
                      data-testid="input-boq-company"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">WhatsApp Number *</Label>
                    <Input
                      type="tel"
                      value={boqContact.whatsapp}
                      onChange={e => setBoqContact(c => ({ ...c, whatsapp: e.target.value }))}
                      placeholder="+971 5X XXX XXXX"
                      className="bg-[#070B14] border-[#1E293B] text-white"
                      data-testid="input-boq-whatsapp"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Email (for pro-forma invoice)</Label>
                    <Input
                      type="email"
                      value={boqContact.email}
                      onChange={e => setBoqContact(c => ({ ...c, email: e.target.value }))}
                      placeholder="buyer@company.com"
                      className="bg-[#070B14] border-[#1E293B] text-white"
                      data-testid="input-boq-email"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Delivery Location</Label>
                    <Input
                      value={boqContact.location}
                      onChange={e => setBoqContact(c => ({ ...c, location: e.target.value }))}
                      placeholder="City, Country (e.g. Dubai, UAE)"
                      className="bg-[#070B14] border-[#1E293B] text-white"
                      data-testid="input-boq-location"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button
                    onClick={submitBoq}
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2"
                    data-testid="button-submit-boq"
                    disabled={boqLines.length === 0}
                  >
                    <Send className="w-5 h-5" />
                    Submit BOQ — Get Formal Quote
                  </Button>
                  <div className="text-xs text-slate-500 leading-relaxed max-w-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
                    Pro-forma invoice within 4 business hours ·
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline mx-1" />
                    No commitment until you approve
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── EXECUTE ON CHAINTRACK BRIDGE ── */}
      <section className="py-16 px-4 bg-[#070B14]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#0D1424] to-[#0a1020] border border-cyan-500/20 rounded-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Gavel className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Step 2 of Your Buyer Journey</div>
                  <h2 className="text-2xl font-black text-white mb-2">Ready to Execute? Go to ChainTrack</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    You've planned your order above. Now take it live — browse real-time auction lots, submit reverse bids with suppliers competing down on price, or register as a verified buyer.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-7">
                {[
                  { icon: Gavel, title: "Bid on live lots", desc: "142+ active lots. Suppliers from US, India, China & Korea. Auctions close in hours.", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                  { icon: TrendingDown, title: "Post a reverse auction", desc: "Can't find what you need? Post your BOQ as a reverse auction — suppliers compete to beat your target price.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                  { icon: Shield, title: "DAFZA escrow on every deal", desc: "Funds held until you confirm receipt and grading. No payment risk, ever.", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                ].map((c, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${c.color}`}>
                    <c.icon className="w-5 h-5 mb-2" />
                    <div className="font-black text-white text-sm mb-1">{c.title}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/chaintrack" className="flex-1">
                  <Button size="lg" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-go-to-chaintrack">
                    <Gavel className="w-5 h-5" />
                    Go to ChainTrack — View Live Auctions
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/971523906019?text=Hi%20ChainTrack!%20I%20want%20to%20submit%20a%20bulk%20purchase%20request."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black uppercase tracking-widest gap-2 w-full sm:w-auto">
                    <Phone className="w-4 h-4" />
                    WhatsApp First
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-16 px-4 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-4">Wholesale vs Reverse Auction — Side by Side</h2>
            <p className="text-slate-400 text-sm">Pick the model that fits your business rhythm</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#1E293B]">
            <div className="grid grid-cols-3 bg-[#0D1424] border-b border-[#1E293B]">
              <div className="p-4 text-xs font-black uppercase tracking-widest text-slate-500">Factor</div>
              <div className="p-4 text-xs font-black uppercase tracking-widest text-amber-400 border-l border-[#1E293B]">Fixed Wholesale</div>
              <div className="p-4 text-xs font-black uppercase tracking-widest text-cyan-400 border-l border-[#1E293B]">Reverse Auction</div>
            </div>
            {[
              { factor: "Price certainty", wholesale: "✓ Fixed — you know before you buy", auction: "Variable — competition drives it down" },
              { factor: "Potential savings", wholesale: "Listed price — fair market rate", auction: "15–35% below listed price" },
              { factor: "Speed to receive", wholesale: "48–72h from payment", auction: "72h–5 days (auction + logistics)" },
              { factor: "Min. order qty", wholesale: "25 or 50 pcs", auction: "50 units" },
              { factor: "Ideal for", wholesale: "Shop restocking, urgent orders", auction: "Container loads, large imports" },
              { factor: "Payment method", wholesale: "Wire, cash, escrow", auction: "Escrow only (buyer protection)" },
              { factor: "Supplier transparency", wholesale: "Anonymous until purchase", auction: "Multiple suppliers, rated profiles" },
              { factor: "Best buyer type", wholesale: "Deira retailers, small shops", auction: "Importers, distributors, flippers" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-[#1E293B] ${i % 2 === 0 ? "bg-[#070B14]" : "bg-[#0D1424]"}`}>
                <div className="p-4 text-xs text-slate-400 font-bold">{row.factor}</div>
                <div className="p-4 text-xs text-slate-300 border-l border-[#1E293B]">{row.wholesale}</div>
                <div className="p-4 text-xs text-slate-300 border-l border-[#1E293B]">{row.auction}</div>
              </div>
            ))}
            <div className="grid grid-cols-3 bg-[#0D1424] border-t-2 border-[#1E293B]">
              <div className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center">Get Started</div>
              <div className="p-4 border-l border-[#1E293B]">
                <a href="#procurement-gateway">
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-[10px] gap-1.5 w-full">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Browse Fixed Lots
                  </Button>
                </a>
              </div>
              <div className="p-4 border-l border-[#1E293B]">
                <Link href="/chaintrack">
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-[10px] gap-1.5 w-full">
                    <Gavel className="w-3.5 h-3.5" />
                    Bid on ChainTrack
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / TRUST ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={dubaiAirHub} alt="Dubai logistics hub" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/92 to-[#070B14]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 mb-14">
            {[
              { value: "142+", label: "Live lots right now", color: "text-amber-400" },
              { value: "34%", label: "Avg savings in auctions", color: "text-emerald-400" },
              { value: "48h", label: "Avg fixed-price delivery", color: "text-cyan-400" },
              { value: "200+", label: "Verified global suppliers", color: "text-purple-400" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0D1424]/80 border border-[#1E293B] rounded-xl p-5 text-center backdrop-blur-sm">
                <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Start Buying?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join 200+ verified buyers sourcing from the world's best iPhone supply through ChainTrack.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/971523906019?text=Hi%20ChainTrack!%20I%20want%20to%20start%20buying%20iPhones%20in%20bulk."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2">
                  <Phone className="w-5 h-5" />
                  Start on WhatsApp
                </Button>
              </a>
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black uppercase tracking-widest gap-2">
                  <Gavel className="w-5 h-5" />
                  View Live Auctions
                </Button>
              </Link>
              <Link href="/fulfillment">
                <Button size="lg" variant="outline" className="border-[#1E293B] text-slate-300 hover:bg-[#1E293B] font-black uppercase tracking-widest gap-2">
                  <Package className="w-5 h-5" />
                  Fulfillment Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
