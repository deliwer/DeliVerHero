import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SEOMeta } from "@/components/seo-meta";
import { useToast } from "@/hooks/use-toast";
import {
  Smartphone, Tablet, Laptop, Package, Globe, Shield, ArrowRight,
  CheckCircle2, Zap, Users, Building2, Search, Filter, Star,
  TrendingUp, Clock, MapPin, Eye, Video, ChevronRight, Plus,
  Boxes, Truck, Award, Activity, Radio
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

const WHATSAPP_URL = "https://wa.me/971523906019?text=Hi%2C%20I%20want%20to%20source%20electronics%20from%20Dubai";
const TELEGRAM_URL = "https://t.me/chaintrack_sourcing";
const BOTIM_NUMBER = "tel:+971523906019";
const ZOOM_URL = "mailto:formatix@hotmail.com?subject=Zoom%20Meeting%20-%20ChainTrack%20Remote%20Sourcing%20Inspection&body=Hi%2C%20I%27d%20like%20to%20schedule%20a%20Zoom%20call%20to%20inspect%20a%20sourcing%20lot.";
const TEAMS_URL = "https://teams.microsoft.com/l/chat/0/0?users=formatix%40hotmail.com";

const CATEGORIES = [
  {
    id: "iphones",
    icon: Smartphone,
    label: "Used iPhones",
    sub: "iPhone 11–16 Pro Max · Grade A-C · Bulk lots",
    active: 48,
    color: "cyan",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  {
    id: "smartphones",
    icon: Smartphone,
    label: "Refurbished Smartphones",
    sub: "Samsung, Google, OnePlus · All grades",
    active: 23,
    color: "blue",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  {
    id: "tablets",
    icon: Tablet,
    label: "Tablets",
    sub: "iPad, Samsung Tab, Surface · Wi-Fi & Cellular",
    active: 11,
    color: "purple",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },
  {
    id: "laptops",
    icon: Laptop,
    label: "Laptops",
    sub: "MacBook, ThinkPad, Dell XPS · Enterprise lots",
    active: 14,
    color: "amber",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
  {
    id: "consumer",
    icon: Package,
    label: "Consumer Electronics",
    sub: "AirPods, Apple Watch, accessories · Mixed lots",
    active: 9,
    color: "emerald",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  {
    id: "bulk",
    icon: Boxes,
    label: "Bulk Sourcing Requests",
    sub: "Custom volume requests · Supplier aggregation",
    active: 6,
    color: "orange",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    text: "text-orange-400",
  },
];

const ACTIVE_REQUESTS = [
  { id: "SR-AZ-1041", product: "iPhone 15 Pro 128GB — Grade A", buyer: "Baku Importer", qty: "500 units", budget: "$420–450/unit", delivery: "CIF Baku", status: "Sourcing", age: "2h ago" },
  { id: "SR-KZ-0882", product: "iPhone 14 Pro Max 256GB — Mix A/B", buyer: "Almaty Trader", qty: "1,200 units", budget: "$290–320/unit", delivery: "CIF Almaty", status: "Grading", age: "5h ago" },
  { id: "SR-UZ-2271", product: "iPhone 13 128GB — Grade B", buyer: "Tashkent Wholesaler", qty: "800 units", budget: "$195–220/unit", delivery: "DAP Tashkent", status: "Matched", age: "11h ago" },
  { id: "SR-GE-3310", product: "MacBook Air M2 — Grade A", buyer: "Tbilisi Reseller", qty: "80 units", budget: "$750–820/unit", delivery: "EXW Dubai", status: "Inspection", age: "1d ago" },
  { id: "SR-PK-7701", product: "iPhone 12 64GB Mix Lot ASIS", buyer: "Karachi Flipper", qty: "3,000 units", budget: "$80–95/unit", delivery: "FOB Dubai", status: "Sourcing", age: "3h ago" },
];

const STATUS_COLORS: Record<string, string> = {
  Sourcing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Grading: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Matched: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Inspection: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const HOW_IT_WORKS = [
  { step: "01", title: "Submit Sourcing Request", desc: "Tell us what you need — product, quantity, grade, delivery destination. Our agents take it from there.", icon: Search },
  { step: "02", title: "Supplier Aggregation", desc: "We match your request against our supplier network across US, China, India, and UAE sources.", icon: Globe },
  { step: "03", title: "Inspection & Grading", desc: "Shortlisted lots go through certified grading at our Dubai free zone testing facilities.", icon: Eye },
  { step: "04", title: "Video Inspection", desc: "You receive a recorded video walkthrough of your exact lot before any payment is released.", icon: Video },
  { step: "05", title: "Logistics Coordination", desc: "We arrange charter cargo, sea freight, or express courier to your destination — CIF, DAP, or FOB.", icon: Truck },
  { step: "06", title: "Escrow & Release", desc: "Funds held at DAFZA escrow until delivery is confirmed. Zero inventory risk for buyers.", icon: Shield },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

function SourcingRequestDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    product: "", qty: "", grade: "", budget: "", destination: "", incoterm: "CIF", inspection: "yes", notes: ""
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs gap-2">
          <Plus className="w-4 h-4" /> Submit Sourcing Request
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D1424] border-[#1E293B] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-black">Remote Sourcing Request</DialogTitle>
          <p className="text-slate-400 text-sm">Our agents will aggregate suppliers, arrange grading, and coordinate logistics for you.</p>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Product / Device</Label>
            <Input placeholder="e.g. iPhone 15 Pro Max 256GB" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Quantity (units)</Label>
            <Input type="number" placeholder="500" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Grade Required</Label>
            <Select value={form.grade} onValueChange={v => setForm(f => ({ ...f, grade: v }))}>
              <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white">
                <SelectValue placeholder="Grade" />
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
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Target Budget / Unit (USD)</Label>
            <Input placeholder="e.g. $400–450" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Delivery Destination</Label>
            <Input placeholder="e.g. Baku, Azerbaijan" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Incoterm</Label>
            <Select value={form.incoterm} onValueChange={v => setForm(f => ({ ...f, incoterm: v }))}>
              <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                <SelectItem value="CIF">CIF — Cost, Insurance & Freight</SelectItem>
                <SelectItem value="DAP">DAP — Delivered At Place</SelectItem>
                <SelectItem value="FOB">FOB — Free On Board</SelectItem>
                <SelectItem value="EXW">EXW — Ex Works Dubai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Inspection Required?</Label>
            <Select value={form.inspection} onValueChange={v => setForm(f => ({ ...f, inspection: v }))}>
              <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                <SelectItem value="yes">Yes — Full certified grading</SelectItem>
                <SelectItem value="video">Video inspection only</SelectItem>
                <SelectItem value="no">No — ASIS lots only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Additional Requirements</Label>
            <Textarea placeholder="IMEI preferences, battery health %, timeline, payment terms, broker assistance needed..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="bg-[#070B14] border-[#1E293B] text-white resize-none" rows={3} />
          </div>
          <div className="col-span-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-300">
            <Shield className="w-3.5 h-3.5 inline mr-1.5" />
            ChainTrack agents will match your request within 24h. All sourced lots are subject to certified grading before payment release.
          </div>
          <div className="col-span-2 flex gap-3">
            <Button variant="outline" className="flex-1 border-[#1E293B] text-slate-400" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
              onClick={() => {
                toast({ title: "Request submitted!", description: "A ChainTrack agent will contact you within 24h via WhatsApp." });
                setOpen(false);
              }}
            >
              Submit Request →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ChainTrackSourcingPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050910] text-white">
      <SEOMeta
        title="Remote Electronics Sourcing Dubai | ChainTrack Marketplace"
        description="Source certified refurbished iPhones, tablets, and laptops from Dubai remotely. ChainTrack's broker-assisted marketplace delivers A/B/C graded electronics to CIS, Gulf, and African buyers with full inspection reports and logistics coordination."
        canonical="https://www.deliwer.com/chaintrack-sourcing"
        keywords="remote electronics sourcing Dubai, buy refurbished iPhone Dubai, ChainTrack marketplace, bulk electronics Dubai, CIS electronics supplier UAE, refurbished phones Dubai wholesale, B2B electronics Dubai, source electronics from Dubai, ChainTrack sourcing, refurbished MacBook Dubai"
        webPageType="CollectionPage"
        breadcrumbs={[{ name: "ChainTrack", url: "/chaintrack" }, { name: "Sourcing", url: "/chaintrack-sourcing" }]}
        faqs={[
          { question: "How does ChainTrack remote sourcing work?", answer: "You submit a sourcing request specifying the device model, grade preference, and quantity. ChainTrack's broker network locates matching inventory in Dubai's market, performs certified grading and inspection, then coordinates logistics to your destination country." },
          { question: "What countries does ChainTrack ship refurbished electronics to?", answer: "ChainTrack ships to CIS countries (Russia, Kazakhstan, Uzbekistan, Azerbaijan), Gulf states, and East Africa. Custom logistics corridors are available for other destinations — contact us to discuss your route." },
          { question: "Can I buy in bulk from ChainTrack?", answer: "Yes. ChainTrack specializes in volume lot sourcing for B2B buyers — typically 10 to 500+ devices per order. Bulk pricing, consolidated grading reports, and palletized shipping are all available." },
          { question: "How do I know the grades are accurate when sourcing remotely?", answer: "Every ChainTrack order includes a standardized grading report, photo documentation, battery health data, and video inspection walkthrough. IMEI verification is included for all smartphone purchases." },
        ]}
        serviceSchema={{ name: "ChainTrack Remote Electronics Sourcing", description: "ChainTrack's Dubai-based broker marketplace connects remote buyers in CIS, Gulf, and African markets with certified refurbished iPhones, tablets, and laptops — complete with grading reports and logistics." }}
      />

      {/* Breadcrumb nav */}
      <div className="border-b border-[#1E293B] bg-[#060A15]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <Link href="/chaintrack" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors font-bold">
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            ChainTrack Marketplace
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Also explore</span>
            <Link href="/chaintrack-grading" className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors font-bold">
              Grading Standards <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 border-b border-[#1E293B]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-cyan-900/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/30">
                <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live Requests</span>
              </div>
              <Badge className="bg-[#0D1424] border-[#1E293B] text-slate-400 uppercase tracking-widest text-[10px]">
                Zero Inventory Risk
              </Badge>
              <Badge className="bg-[#0D1424] border-[#1E293B] text-slate-400 uppercase tracking-widest text-[10px]">
                CIS & Global Delivery
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Remote Sourcing.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Broker-Assisted. Dubai-Verified.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
              Submit your sourcing request. ChainTrack agents aggregate suppliers, coordinate certified grading, arrange inspection videos, and handle cargo logistics — CIF to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <SourcingRequestDialog />
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                  <SiWhatsapp className="w-4 h-4" /> WhatsApp Agent
                </Button>
              </a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                  <SiTelegram className="w-4 h-4" /> Sourcing Feed
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black">Sourcing Categories</h2>
              <Button variant="outline" size="sm" className="border-[#1E293B] text-slate-400 gap-2">
                <Filter className="w-3.5 h-3.5" /> Filter
              </Button>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <FadeIn key={cat.id} delay={i * 0.06}>
                  <button
                    onClick={() => setActiveCategory(isActive ? null : cat.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 group ${
                      isActive ? `${cat.bg} ${cat.border}` : "bg-[#0D1424] border-[#1E293B] hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.border} border flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${cat.text}`} />
                      </div>
                      <Badge className={`${cat.bg} ${cat.text} border ${cat.border} text-[9px] uppercase tracking-wider`}>
                        {cat.active} active
                      </Badge>
                    </div>
                    <div className="text-sm font-black text-white mb-1">{cat.label}</div>
                    <div className="text-xs text-slate-500">{cat.sub}</div>
                    <div className={`mt-3 flex items-center gap-1 text-xs font-bold ${cat.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Browse requests <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grading cross-link callout */}
      <div className="border-b border-[#1E293B] bg-[#060A15] py-5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-black text-white">Every sourced lot gets certified before payment is released</div>
                <div className="text-[11px] text-slate-500">A+/A/B/C/ASIS grading · IMEI verification · battery health · video inspection</div>
              </div>
            </div>
            <Link href="/chaintrack-grading" className="shrink-0">
              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black uppercase tracking-widest text-[10px] gap-1.5">
                <Shield className="w-3 h-3" /> See Grading Standards <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Active Requests Feed */}
      <section className="py-16 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black mb-1">Live Sourcing Requests</h2>
                <p className="text-sm text-slate-500">Active buyer requests across CIS and global markets</p>
              </div>
              <SourcingRequestDialog />
            </div>
          </FadeIn>
          <div className="space-y-3">
            {ACTIVE_REQUESTS.map((req, i) => (
              <FadeIn key={req.id} delay={i * 0.06}>
                <Card className="bg-[#0D1424] border-[#1E293B] hover:border-cyan-500/20 transition-colors p-5">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4 min-w-0">
                      <div>
                        <div className="text-[10px] font-black text-slate-500 tracking-widest mb-1">{req.id}</div>
                        <div className="text-sm font-bold text-white mb-1">{req.product}</div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {req.buyer}</span>
                          <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {req.qty}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.delivery}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.age}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-black text-cyan-400">{req.budget}</div>
                        <div className="text-[10px] text-slate-500">per unit</div>
                      </div>
                      <Badge className={`text-[9px] uppercase tracking-wider border ${STATUS_COLORS[req.status]}`}>
                        {req.status}
                      </Badge>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-widest">
                          Fulfill →
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-4">How Remote Sourcing Works</h2>
              <p className="text-slate-400 max-w-xl mx-auto">From request submission to CIF delivery — fully broker-assisted with zero inventory risk.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={i} delay={i * 0.06}>
                  <Card className="bg-[#0D1424] border-[#1E293B] p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-black text-slate-600 tracking-widest">STEP {step.step}</span>
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-sm font-black text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-5">
          <FadeIn>
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/15 border border-cyan-500/20 rounded-3xl p-10 text-center">
              <h2 className="text-3xl font-black mb-4">Ready to Source Remotely?</h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
                Submit your sourcing request and a ChainTrack agent will aggregate suppliers, arrange grading, and coordinate logistics within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <SourcingRequestDialog />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <SiWhatsapp className="w-4 h-4" /> WhatsApp
                  </Button>
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <SiTelegram className="w-4 h-4" /> Telegram
                  </Button>
                </a>
                <a href={ZOOM_URL}>
                  <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <Video className="w-4 h-4" /> Zoom
                  </Button>
                </a>
                <a href={TEAMS_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <Eye className="w-4 h-4" /> Teams
                  </Button>
                </a>
                <a href={BOTIM_NUMBER}>
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <Clock className="w-4 h-4" /> Botim
                  </Button>
                </a>
              </div>
              <p className="text-[11px] text-slate-600 mt-3">Remote inspection: <span className="text-slate-500">Zoom / Teams → formatix@hotmail.com</span> · Botim backup: <span className="text-slate-500">+971 52 390 6019</span></p>
            </div>
          </FadeIn>
          {/* Page navigation row */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center border border-[#1E293B] rounded-2xl px-6 py-4 bg-[#0D1424]">
              <Link href="/chaintrack" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-bold">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Live Auctions
              </Link>
              <span className="text-[10px] text-slate-700 hidden sm:block">·</span>
              <Link href="/chaintrack-grading" className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-bold">
                <Shield className="w-3.5 h-3.5" /> How Grading Works <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
