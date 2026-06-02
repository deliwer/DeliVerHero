import { useState } from "react";
import { Link } from "wouter";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Package, Globe, Gavel, TrendingDown, CheckCircle,
  Star, ArrowRight, Shield, Zap, Users, ChevronRight, Truck, Building2, Banknote,
  FileCheck, AlertCircle, Phone, Plus, Trash2, ClipboardList, Send, CheckCircle2, X,
  MessageCircle, ExternalLink, MapPin, Plane,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import electronicsRetailImg from "@assets/stock_images/people_electronics_r_02ba73a8.jpg";
import dubaiAirHub from "@assets/stock_images/dubai_air_hub.jpg";
import { useToast } from "@/hooks/use-toast";

const WA_NUMBER = "971523906019";
const TELEGRAM = "https://t.me/+971523906019";
const WA_COMMUNITY = "https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

const IPHONE_MODELS = [
  "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Plus", "iPhone 17",
  "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
  "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
  "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini",
  "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini",
  "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
  "iPhone SE (3rd Gen)", "iPhone SE (2nd Gen)",
];

export default function BulkPurchasingPage() {
  const { toast } = useToast();

  // Quick inquiry form
  const [quick, setQuick] = useState({ model: "", storage: "", condition: "", qty: "", location: "", company: "" });

  // BOQ state
  type BoqLine = { id: string; model: string; storage: string; condition: string; qty: number; targetPrice: string };
  const [boqLines, setBoqLines] = useState<BoqLine[]>([]);
  const [boqDraft, setBoqDraft] = useState({ model: "", storage: "128GB", condition: "Excellent", qty: "50", targetPrice: "" });
  const [boqContact, setBoqContact] = useState({ company: "", whatsapp: "", location: "" });
  const [boqSubmitted, setBoqSubmitted] = useState(false);

  function addBoqLine() {
    if (!boqDraft.model || !boqDraft.storage || !boqDraft.condition || !boqDraft.qty) {
      toast({ title: "Fill model, storage, condition and quantity", variant: "destructive" });
      return;
    }
    setBoqLines(prev => [...prev, { ...boqDraft, qty: Number(boqDraft.qty), id: Date.now().toString() }]);
    setBoqDraft(d => ({ ...d, model: "", targetPrice: "" }));
  }

  function removeBoqLine(id: string) {
    setBoqLines(prev => prev.filter(l => l.id !== id));
  }

  function submitBoqViaWhatsApp() {
    if (boqLines.length === 0) { toast({ title: "Add at least one line item", variant: "destructive" }); return; }
    if (!boqContact.company || !boqContact.whatsapp) { toast({ title: "Company name and WhatsApp required", variant: "destructive" }); return; }
    const lineText = boqLines.map((l, i) =>
      `${i + 1}. ${l.model} · ${l.storage} · ${l.condition} · ${l.qty} units${l.targetPrice ? ` @ target $${l.targetPrice}/unit` : ""}`
    ).join("\n");
    const totalUnits = boqLines.reduce((s, l) => s + l.qty, 0);
    const msg = `[SOURCE: wholesale/boq-builder]\n*BULK PURCHASE — BILL OF QUANTITIES*\n\nCompany: ${boqContact.company}\nDelivery: ${boqContact.location || "TBD"}\n\nLINE ITEMS:\n${lineText}\n\nTotal: ${totalUnits.toLocaleString()} units\nContact WA: ${boqContact.whatsapp}`;
    window.open(waLink(msg), "_blank");
    setBoqSubmitted(true);
  }

  function submitQuickInquiry() {
    if (!quick.model || !quick.qty) { toast({ title: "Select a model and quantity", variant: "destructive" }); return; }
    const msg = `[SOURCE: wholesale/quick-inquiry]\n*BULK IPHONE INQUIRY*\n\nModel: ${quick.model}${quick.storage ? " · " + quick.storage : ""}\nCondition: ${quick.condition || "Best available"}\nQuantity: ${quick.qty} units\nDelivery to: ${quick.location || "TBD"}\nCompany: ${quick.company || "—"}`;
    window.open(waLink(msg), "_blank");
  }

  return (
    <>
      <SEOMeta
        title="Bulk iPhone Wholesale Dubai — Fixed Price & Reverse Auction | ChainTrack"
        description="Buy iPhones in bulk from Dubai's wholesale procurement hub. Fixed-price lots from 25 units, reverse auctions from 50 units. DAFZA escrow on every deal. Deira traders, CIS importers and regional distributors welcome."
        canonical="https://www.deliwer.com/wholesale"
        keywords="bulk iPhone wholesale Dubai, iPhone wholesale supplier UAE, iPhone reverse auction Dubai, DAFZA iPhone escrow, buy iPhones bulk UAE, iPhone wholesale Deira, CIS iPhone importer Dubai, BOQ iPhone procurement, bulk iPhone fixed price, iPhone B2B wholesale platform"
        webPageType="ServicePage"
        serviceSchema={{
          name: "ChainTrack Bulk iPhone Wholesale — Dubai",
          description: "B2B iPhone wholesale procurement platform in Dubai. Fixed-price wholesale lots from 25 units and reverse auction sourcing from 50 units. DAFZA escrow protection on every transaction. Serving Deira traders, CIS importers, and regional distributors.",
          area: "Dubai, UAE — Global supply corridors: USA, India, China, Europe, CIS",
        }}
        breadcrumbs={[
          { name: "Home", url: "https://www.deliwer.com/" },
          { name: "ChainTrack Marketplace", url: "https://www.deliwer.com/chaintrack" },
          { name: "Bulk iPhone Wholesale", url: "https://www.deliwer.com/wholesale" },
        ]}
        faqs={[
          {
            question: "What is the minimum order quantity for bulk iPhone wholesale in Dubai?",
            answer: "The minimum order quantity for fixed-price wholesale lots is 25 units. For reverse auction sourcing through ChainTrack, the minimum is 50 units. There is no maximum order cap — container loads and multi-thousand-unit BOQs are handled regularly.",
          },
          {
            question: "How does DAFZA escrow protect my payment?",
            answer: "All payments are held in a DAFZA (Dubai Airport Free Zone Authority) escrow account. Funds are only released to the supplier after you physically receive the goods and confirm that condition and grading match the invoice. If there is a discrepancy, the escrow is held pending resolution. This applies to every transaction on the platform.",
          },
          {
            question: "What is the difference between fixed-price wholesale and a reverse auction?",
            answer: "Fixed-price wholesale shows you the exact price per unit upfront — you confirm, pay, and goods ship within 48–72 hours. It is best for shop restocking and urgent orders of 25–100 units. Reverse auctions let you post your requirements and have verified global suppliers compete against each other to offer the lowest price — typically saving 15–35% versus listed prices. Best for orders of 100+ units where per-unit savings multiply.",
          },
          {
            question: "What is a Bill of Quantities (BOQ) and why should I submit one?",
            answer: "A BOQ is a structured list of every model, storage variant, condition grade and quantity you need. Submitting a BOQ rather than a vague inquiry signals serious buying intent to suppliers, who respond with 12–20% better pricing. It also triggers a formal procurement workflow and results in a signed pro-forma invoice with binding price and delivery terms — not a ballpark quote.",
          },
          {
            question: "How quickly can I receive goods after payment?",
            answer: "For fixed-price wholesale lots, goods are at DAFZA within 48–72 hours of payment confirmation. For CIS destinations — Baku, Almaty, Tashkent, Tbilisi — allow an additional 24–48 hours for air cargo transit. Reverse auction orders typically arrive within 72 hours to 5 days depending on supplier location and auction close time.",
          },
          {
            question: "Which countries do you ship bulk iPhones to?",
            answer: "We ship to 34+ countries. Primary corridors include the UAE and all six CIS markets: Azerbaijan (DXB–GYD, ~24h), Kazakhstan (DXB–ALA, ~36h), Uzbekistan (DXB–TAS, ~36h), Russia (DXB–SVO, ~48h), Georgia (DXB–TBS, ~24h), and Kyrgyzstan (DXB–FRU, ~48h). We also serve Pakistan, India, Africa and Southeast Asia.",
          },
          {
            question: "What payment methods are accepted for wholesale purchases?",
            answer: "Fixed-price wholesale accepts bank wire transfer, cash payment at DAFZA, and DAFZA escrow. Reverse auction orders require DAFZA escrow only — this provides full buyer protection for larger orders. Invoices are issued same day in USD.",
          },
          {
            question: "How do I start the bulk iPhone purchasing process?",
            answer: "For orders of 25–100 units, use the Quick WhatsApp Inquiry form on this page — select your model, storage, condition and quantity, then tap 'Send via WhatsApp'. For 100+ units or multi-model orders, use the BOQ Builder to list every SKU, then submit — it opens a pre-formatted WhatsApp message directly to our procurement team. Response within 1–4 business hours.",
          },
        ]}
      />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "ChainTrack Bulk iPhone Wholesale — Dubai",
        "serviceType": "B2B iPhone Wholesale Procurement Platform",
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
          { "@type": "Country", "name": "Azerbaijan" },
          { "@type": "Country", "name": "Kazakhstan" },
          { "@type": "Country", "name": "Uzbekistan" },
          { "@type": "Country", "name": "Russia" },
          { "@type": "Country", "name": "Georgia" },
          { "@type": "Country", "name": "Kyrgyzstan" },
        ],
        "offers": [
          {
            "@type": "Offer",
            "name": "Fixed-Price Wholesale Lots",
            "description": "Buy iPhones at displayed fixed prices. Minimum 25 units. DAFZA escrow accepted. Delivery 48–72 hours.",
            "priceCurrency": "USD",
          },
          {
            "@type": "Offer",
            "name": "Reverse Auction Sourcing",
            "description": "Post your BOQ and have 200+ verified global suppliers compete down on price. Average saving 15–35% vs listed prices. Minimum 50 units. DAFZA escrow required.",
            "priceCurrency": "USD",
          },
        ],
        "url": "https://www.deliwer.com/wholesale",
      })}</script>
    <div className="min-h-screen bg-[#070B14] text-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={electronicsRetailImg} alt="Electronics wholesale Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/88 to-[#070B14]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">B2B Wholesale Procurement · Dubai · DAFZA Escrow</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
              Bulk iPhone
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Wholesale — Dubai
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl">
              The procurement hub for Deira traders, CIS importers, and regional distributors. Fixed-price lots from 25 units. Reverse auctions from 50 units. One platform. Every deal protected by DAFZA escrow.
            </p>
            <div className="flex flex-wrap items-center gap-5 mb-10 text-sm text-slate-400">
              {["DAFZA escrow on every deal", "25 unit minimum", "48–72h delivery", "200+ verified suppliers"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {/* Hero path selector */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
              <a href="#quick-inquiry">
                <div className="group rounded-xl border-2 border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/70 transition-all p-5 cursor-pointer">
                  <Banknote className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="font-black text-white text-sm mb-0.5">25–100 units</div>
                  <div className="text-[11px] text-slate-400 mb-3">Fixed price · quick WhatsApp inquiry</div>
                  <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    Quick Inquiry <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
              <a href="#boq-builder">
                <div className="group rounded-xl border-2 border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all p-5 cursor-pointer">
                  <ClipboardList className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="font-black text-white text-sm mb-0.5">100+ units / multi-SKU</div>
                  <div className="text-[11px] text-slate-400 mb-3">BOQ builder · best price via auction</div>
                  <div className="flex items-center gap-1 text-cyan-400 text-[11px] font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    Build BOQ <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PIPELINE STEPPER ── */}
      <div className="bg-[#070B14] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest flex-wrap">
          <Link href="/chaintrack">
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">① Source on ChainTrack</span>
          </Link>
          <span className="text-slate-600 mx-1">→</span>
          <span className="text-white/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            ② Plan & Price — Bulk Purchasing
          </span>
          <span className="text-slate-600 mx-1">→</span>
          <Link href="/logistics">
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">③ Ship via Logistics</span>
          </Link>
        </div>
      </div>

      {/* ── HOW THE PROCESS WORKS ── */}
      <section className="py-16 px-4 bg-[#0A0F1E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2">One Unified Process</div>
            <h2 className="text-3xl font-black text-white mb-3">From Inquiry to Delivery — 4 Steps</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Whether you're buying 25 units on fixed price or running a 1,000-unit reverse auction — the process is the same. WhatsApp first, DAFZA escrow always.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-10">
            {[
              { n: "01", icon: MessageCircle, color: "amber", title: "Tell Us What You Need", desc: "Submit a quick inquiry (25–100 units) or build a full BOQ (100+ / multi-model). Every message is pre-formatted for our procurement team." },
              { n: "02", icon: FileCheck, color: "cyan", title: "Receive Verified Quote", desc: "We send a pro-forma invoice with fixed unit price, total, DAFZA escrow terms, and delivery timeline within 4 business hours." },
              { n: "03", icon: Shield, color: "emerald", title: "DAFZA Escrow Payment", desc: "Wire to DAFZA escrow. Funds held until you confirm receipt and grading match. Zero payment risk — standard on every deal." },
              { n: "04", icon: Truck, color: "purple", title: "Delivery to Your Hub", desc: "Goods shipped to your city or collected at DAFZA. For CIS markets: DXB air cargo to Baku, Almaty, Tashkent, Moscow, Tbilisi." },
            ].map((s) => {
              const colorMap: Record<string, string> = {
                amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
                cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
                emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
              };
              return (
                <div key={s.n} className={`rounded-2xl border p-5 ${colorMap[s.color]}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{s.n}</span>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <div className="font-black text-white text-sm mb-2">{s.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Explainer callout */}
          <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-white text-sm mb-1">Fixed Price or Reverse Auction — which is right for you?</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-amber-300">Fixed price</strong> — you see the price, you confirm, goods ship within 48–72h. Best for shop restocking (25–100 units), urgent orders, or when you have a firm budget.{" "}
                <strong className="text-cyan-300">Reverse auction</strong> — you post your BOQ and verified global suppliers compete down on price. Typically saves 15–35% vs listed. Best for 100+ units, container loads, or CIS import orders where every dollar per unit compounds.{" "}
                <Link href="/chaintrack"><span className="text-cyan-400 hover:text-cyan-300 cursor-pointer underline">Watch auction explainer →</span></Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK INQUIRY (25–100 units) ── */}
      <section className="py-16 px-4 bg-[#070B14]" id="quick-inquiry">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D1424] border border-amber-500/30 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#1E293B] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Banknote className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Path A · 25–100 Units · Fixed Price</div>
                <h2 className="text-xl font-black text-white mb-1">Quick WhatsApp Inquiry</h2>
                <p className="text-sm text-slate-400">Pick your model and quantity. Hitting "Send via WhatsApp" opens a pre-formatted message to our procurement team — your sourcing request, attributed and ready.</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">iPhone Model *</Label>
                  <Select value={quick.model} onValueChange={v => setQuick(q => ({ ...q, model: v }))}>
                    <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" data-testid="select-quick-model">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white max-h-60">
                      {IPHONE_MODELS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Storage</Label>
                  <Select value={quick.storage} onValueChange={v => setQuick(q => ({ ...q, storage: v }))}>
                    <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9">
                      <SelectValue placeholder="Any storage" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                      {["Any", "64GB", "128GB", "256GB", "512GB", "1TB"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Condition</Label>
                  <Select value={quick.condition} onValueChange={v => setQuick(q => ({ ...q, condition: v }))}>
                    <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9">
                      <SelectValue placeholder="Best available" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                      <SelectItem value="New (sealed)">New (sealed)</SelectItem>
                      <SelectItem value="Like New (A+)">Like New (A+ grade)</SelectItem>
                      <SelectItem value="Excellent (A)">Excellent (A grade)</SelectItem>
                      <SelectItem value="Good (B)">Good (B grade)</SelectItem>
                      <SelectItem value="Best available">Best available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Quantity (units) *</Label>
                  <Input
                    type="number" min="25"
                    value={quick.qty}
                    onChange={e => setQuick(q => ({ ...q, qty: e.target.value }))}
                    placeholder="e.g. 50"
                    className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9"
                    data-testid="input-quick-qty"
                  />
                </div>
                <div>
                  <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Delivery City / Country</Label>
                  <Input
                    value={quick.location}
                    onChange={e => setQuick(q => ({ ...q, location: e.target.value }))}
                    placeholder="Dubai, Baku, Almaty…"
                    className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9"
                  />
                </div>
                <div>
                  <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Company / Name</Label>
                  <Input
                    value={quick.company}
                    onChange={e => setQuick(q => ({ ...q, company: e.target.value }))}
                    placeholder="Optional"
                    className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  onClick={submitQuickInquiry}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest gap-2"
                  data-testid="button-quick-wa"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Send via WhatsApp
                </Button>
                <a href={`${TELEGRAM}?text=${encodeURIComponent("[SOURCE: wholesale/quick-inquiry-telegram]\nBulk iPhone inquiry from /wholesale")}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 font-bold uppercase tracking-widest text-xs gap-2" data-testid="button-quick-telegram">
                    <SiTelegram className="w-4 h-4" />
                    Telegram Instead
                  </Button>
                </a>
                <span className="text-[10px] text-slate-500">Response within 1–2 business hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOQ BUILDER (100+ / multi-SKU) ── */}
      <section className="py-16 px-4 bg-[#0A0F1E]" id="boq-builder">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Path B · 100+ Units / Multi-Model</div>
            <h2 className="text-3xl font-black text-white mb-3">Build Your Bill of Quantities</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Add every model, storage, condition and quantity you need. When you submit, we generate a pre-formatted WhatsApp message your procurement team can act on immediately — no vague inquiries, no back-and-forth.
            </p>
          </div>

          {/* Why BOQ */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: ClipboardList, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", title: "Structured demand = better pricing", desc: "Suppliers offer 12–20% better pricing to buyers with documented BOQs versus vague 'how much for iPhones?' inquiries." },
              { icon: TrendingDown, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", title: "Multi-SKU bundle pricing", desc: "When your BOQ spans multiple models, we negotiate the whole package. Bundle pricing unlocks what per-SKU pricing can't." },
              { icon: FileCheck, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", title: "Pro-forma invoice, not a ballpark", desc: "BOQ submission triggers a real procurement workflow. You receive a signed pro-forma invoice with binding price and delivery terms." },
            ].map((c, i) => (
              <div key={i} className={`rounded-xl border p-4 ${c.color}`}>
                <c.icon className="w-4 h-4 mb-2" />
                <div className="font-black text-white text-sm mb-1">{c.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>

          {boqSubmitted ? (
            <div className="bg-[#0D1424] border border-emerald-500/30 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">BOQ Sent via WhatsApp</h3>
              <p className="text-slate-400 text-sm mb-4 max-w-md mx-auto">
                Your {boqLines.length} line item{boqLines.length !== 1 ? "s" : ""} ({boqLines.reduce((s, l) => s + l.qty, 0).toLocaleString()} units total) have been sent to ChainTrack via WhatsApp. Expect a signed pro-forma invoice within <strong className="text-white">4 business hours</strong>.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                <a href={WA_COMMUNITY} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    Join Buyers Community
                  </Button>
                </a>
                <Link href="/chaintrack">
                  <Button variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                    <Gavel className="w-3.5 h-3.5" />
                    View Live Auctions
                  </Button>
                </Link>
              </div>
              <button
                className="text-xs text-slate-500 hover:text-slate-300 underline"
                onClick={() => { setBoqSubmitted(false); setBoqLines([]); setBoqContact({ company: "", whatsapp: "", location: "" }); }}
              >
                Submit another BOQ
              </button>
            </div>
          ) : (
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl overflow-hidden">

              {/* Step 1: Add line items */}
              <div className="p-6 border-b border-[#1E293B]">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-black text-black">1</div>
                  <span className="font-black text-white">Add SKUs to Your BOQ</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Model *</Label>
                    <Select value={boqDraft.model} onValueChange={v => setBoqDraft(d => ({ ...d, model: v }))}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" data-testid="select-boq-model">
                        <SelectValue placeholder="iPhone model" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white max-h-60">
                        {IPHONE_MODELS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Storage *</Label>
                    <Select value={boqDraft.storage} onValueChange={v => setBoqDraft(d => ({ ...d, storage: v }))}>
                      <SelectTrigger className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" data-testid="select-boq-storage">
                        <SelectValue />
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
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D1424] border-[#1E293B] text-white">
                        <SelectItem value="New">New (sealed)</SelectItem>
                        <SelectItem value="Like New">Like New (A+)</SelectItem>
                        <SelectItem value="Excellent">Excellent (A)</SelectItem>
                        <SelectItem value="Good">Good (B)</SelectItem>
                        <SelectItem value="Any">Any grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Qty *</Label>
                    <Input type="number" min="1" value={boqDraft.qty}
                      onChange={e => setBoqDraft(d => ({ ...d, qty: e.target.value }))}
                      className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" placeholder="50"
                      data-testid="input-boq-qty"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Target $/unit</Label>
                    <Input type="number" min="1" value={boqDraft.targetPrice}
                      onChange={e => setBoqDraft(d => ({ ...d, targetPrice: e.target.value }))}
                      className="bg-[#070B14] border-[#1E293B] text-white text-xs h-9" placeholder="Optional"
                      data-testid="input-boq-target-price"
                    />
                  </div>
                </div>
                <Button onClick={addBoqLine} className="bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-xs gap-2" data-testid="button-add-boq-line">
                  <Plus className="w-4 h-4" />
                  Add to BOQ
                </Button>
              </div>

              {/* Step 2: BOQ table */}
              <div className="p-6 border-b border-[#1E293B]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-black text-black">2</div>
                  <span className="font-black text-white">Your BOQ</span>
                  {boqLines.length > 0 && (
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {boqLines.reduce((sum, l) => sum + l.qty, 0).toLocaleString()} total units
                    </span>
                  )}
                </div>

                {boqLines.length === 0 ? (
                  <div className="border-2 border-dashed border-[#1E293B] rounded-xl p-8 text-center text-slate-600">
                    <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-bold">No items yet — add your first SKU above</p>
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden border border-[#1E293B]">
                    <div className="grid grid-cols-12 bg-[#070B14] px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-600">
                      <div className="col-span-4">Model</div>
                      <div className="col-span-2">Storage</div>
                      <div className="col-span-2">Condition</div>
                      <div className="col-span-2 text-right">Qty</div>
                      <div className="col-span-1 text-right">Target</div>
                      <div className="col-span-1" />
                    </div>
                    {boqLines.map((line, i) => (
                      <div key={line.id} className={`grid grid-cols-12 items-center px-4 py-3 text-xs border-t border-[#1E293B] ${i % 2 === 0 ? "bg-[#0D1424]" : "bg-[#070B14]"}`} data-testid={`boq-line-${i}`}>
                        <div className="col-span-4 font-bold text-white truncate">{line.model}</div>
                        <div className="col-span-2 text-slate-400">{line.storage}</div>
                        <div className="col-span-2">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                            line.condition === "New" ? "bg-emerald-500/20 text-emerald-400" :
                            line.condition === "Like New" ? "bg-cyan-500/20 text-cyan-400" :
                            line.condition === "Excellent" ? "bg-blue-500/20 text-blue-400" : "bg-slate-500/20 text-slate-400"
                          }`}>{line.condition}</span>
                        </div>
                        <div className="col-span-2 text-right font-black text-amber-400">{line.qty.toLocaleString()}</div>
                        <div className="col-span-1 text-right text-slate-500">{line.targetPrice ? `$${line.targetPrice}` : "—"}</div>
                        <div className="col-span-1 flex justify-end">
                          <button onClick={() => removeBoqLine(line.id)} className="text-slate-600 hover:text-red-400 transition-colors p-1" data-testid={`button-remove-boq-${i}`}>
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-12 items-center px-4 py-3 text-xs border-t border-amber-500/20 bg-amber-500/5">
                      <div className="col-span-8 font-black text-amber-400 uppercase tracking-widest text-[10px]">Total Demand</div>
                      <div className="col-span-2 text-right font-black text-amber-400 text-base">{boqLines.reduce((sum, l) => sum + l.qty, 0).toLocaleString()}</div>
                      <div className="col-span-2" />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Contact + submit via WhatsApp */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-black text-black">3</div>
                  <span className="font-black text-white">Your Contact Details — then send via WhatsApp</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Company / Shop Name *</Label>
                    <Input value={boqContact.company} onChange={e => setBoqContact(c => ({ ...c, company: e.target.value }))}
                      placeholder="Exphone Electronics LLC" className="bg-[#070B14] border-[#1E293B] text-white" data-testid="input-boq-company" />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Your WhatsApp Number *</Label>
                    <Input type="tel" value={boqContact.whatsapp} onChange={e => setBoqContact(c => ({ ...c, whatsapp: e.target.value }))}
                      placeholder="+971 5X XXX XXXX" className="bg-[#070B14] border-[#1E293B] text-white" data-testid="input-boq-whatsapp" />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 block">Delivery City / Country</Label>
                    <Input value={boqContact.location} onChange={e => setBoqContact(c => ({ ...c, location: e.target.value }))}
                      placeholder="Dubai · Baku · Almaty · Moscow…" className="bg-[#070B14] border-[#1E293B] text-white" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    onClick={submitBoqViaWhatsApp}
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest gap-2"
                    disabled={boqLines.length === 0}
                    data-testid="button-submit-boq"
                  >
                    <SiWhatsapp className="w-5 h-5" />
                    Send BOQ via WhatsApp
                  </Button>
                  <div className="text-xs text-slate-500 leading-relaxed">
                    Opens WhatsApp with your full BOQ pre-formatted.
                    Team responds with a signed pro-forma invoice within 4 business hours.
                    No commitment until you approve the quote.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── EXECUTE ON CHAINTRACK ── */}
      <section className="py-14 px-4 bg-[#070B14]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#0D1424] to-[#0a1020] border border-cyan-500/20 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Gavel className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Want Suppliers to Compete on Price?</div>
                <h2 className="text-xl font-black text-white mb-2">Go Live on ChainTrack — Reverse Auction</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Post your BOQ as a live reverse auction. 200+ verified suppliers from the US, India, Korea and China bid against each other — driving the price down. Average saving: 15–35% vs listed wholesale prices.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: Gavel, title: "142+ active lots right now", desc: "Browse live auction lots or post your own reverse bid.", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                { icon: TrendingDown, title: "15–35% below listed price", desc: "Suppliers undercut each other. You pick the winner at the floor.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { icon: Shield, title: "DAFZA escrow on every lot", desc: "Funds released only after grading confirmation. Zero risk.", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
              ].map((c, i) => (
                <div key={i} className={`rounded-xl border p-4 ${c.color}`}>
                  <c.icon className="w-4 h-4 mb-2" />
                  <div className="font-black text-white text-sm mb-1">{c.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{c.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/chaintrack">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-go-to-chaintrack">
                  <Gavel className="w-5 h-5" />
                  View Live Auctions on ChainTrack
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href={waLink("[SOURCE: wholesale/wa-first]\nHi ChainTrack — I want to learn about the reverse auction process for bulk iPhones.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black uppercase tracking-widest gap-2">
                  <SiWhatsapp className="w-4 h-4" />
                  Ask on WhatsApp First
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHONE FLIPPER / BROKER PROGRAMME ── */}
      <section className="py-16 px-4 bg-[#0A0F1E] border-t border-[#1E293B]" id="broker-programme">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4">
                <Star className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">500+ Units · High-Volume Buyers & Resellers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Phone Flipper &amp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Broker Programme</span>
              </h2>
              <p className="text-slate-400 max-w-xl leading-relaxed text-sm">
                If you're moving 500+ units per month — as a reseller, distributor, or buying-group organiser — you qualify for the ChainTrack Broker Programme. Dedicated account manager, priority lot allocation, tiered pricing, and a referral commission on every order you bring in.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href={waLink("[SOURCE: wholesale/broker-programme]\n*BROKER PROGRAMME APPLICATION*\n\nI move 500+ units/month and want to apply for the ChainTrack Phone Flipper / Broker Programme.\n\nCompany:\nMonthly volume (units):\nMarkets served:\nWhatsApp:")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-broker-apply-wa">
                  <SiWhatsapp className="w-5 h-5" />
                  Apply via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Volume tiers */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                tier: "Flipper",
                volume: "500–999 units/mo",
                color: "border-amber-500/40 bg-amber-500/5",
                badge: "text-amber-400 bg-amber-500/15 border-amber-500/30",
                perks: [
                  "Dedicated WhatsApp account manager",
                  "24h priority response on all inquiries",
                  "Fixed-price lots reserved before public listing",
                  "2% referral commission on referred orders",
                ],
              },
              {
                tier: "Broker",
                volume: "1,000–2,499 units/mo",
                color: "border-purple-500/40 bg-purple-500/5",
                badge: "text-purple-400 bg-purple-500/15 border-purple-500/30",
                highlight: true,
                perks: [
                  "Everything in Flipper tier",
                  "Monthly volume allocation guaranteed",
                  "Custom BOQ pricing — 8–15% below Flipper rate",
                  "4% referral commission + co-branding on quotes",
                ],
              },
              {
                tier: "Master Broker",
                volume: "2,500+ units/mo",
                color: "border-pink-500/40 bg-pink-500/5",
                badge: "text-pink-400 bg-pink-500/15 border-pink-500/30",
                perks: [
                  "Everything in Broker tier",
                  "Direct supplier introductions — remove intermediary",
                  "Container-load freight coordination included",
                  "6% commission + equity programme eligibility",
                ],
              },
            ].map((t) => (
              <div key={t.tier} className={`relative rounded-2xl border-2 p-6 ${t.color} ${t.highlight ? "ring-2 ring-purple-500/30" : ""}`}>
                {t.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-purple-600 text-white px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest mb-4 ${t.badge}`}>
                  <Star className="w-3 h-3" />
                  {t.tier}
                </div>
                <div className="font-black text-white text-lg mb-1">{t.tier} Tier</div>
                <div className="text-xs text-slate-500 mb-5">{t.volume}</div>
                <ul className="space-y-2.5">
                  {t.perks.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Programme benefits strip */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Zap, color: "text-amber-400", title: "Priority Allocation", desc: "First access to new lots before they're listed publicly. You see deals before the market does." },
              { icon: Banknote, color: "text-emerald-400", title: "Referral Commissions", desc: "Earn 2–6% on every order placed by buyers you refer. Paid per transaction, no minimums." },
              { icon: Users, color: "text-cyan-400", title: "Dedicated Manager", desc: "One WhatsApp contact who knows your buying profile and proactively sources what you move." },
              { icon: Globe, color: "text-purple-400", title: "CIS Export Support", desc: "Full customs docs, RODTEP exemptions, and freight to Baku, Almaty, Tashkent — handled for you." },
            ].map((b, i) => (
              <div key={i} className="bg-[#0D1424] border border-[#1E293B] rounded-xl p-4">
                <b.icon className={`w-5 h-5 mb-3 ${b.color}`} />
                <div className="font-black text-white text-sm mb-1.5">{b.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="bg-[#0D1424] border border-purple-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="font-black text-white mb-1">Ready to apply for the Broker Programme?</div>
              <p className="text-xs text-slate-400">Message us your monthly volume and the markets you serve. Onboarding takes 24–48 hours.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={waLink("[SOURCE: wholesale/broker-programme-cta]\n*BROKER PROGRAMME APPLICATION*\n\nCompany:\nMonthly volume (units):\nMarkets (e.g. CIS, Africa, South Asia):\nCurrent supplier(s):\nWhatsApp:")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-broker-cta-wa">
                  <SiWhatsapp className="w-4 h-4" />
                  Apply — WhatsApp
                </Button>
              </a>
              <a
                href={`https://t.me/chaintracklogistics?text=${encodeURIComponent("[SOURCE: wholesale/broker-programme-telegram]\nBROKER PROGRAMME APPLICATION\n\nCompany:\nMonthly volume (units):\nMarkets served:\nWhatsApp:")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-broker-cta-telegram">
                  <SiTelegram className="w-4 h-4" />
                  Telegram
                </Button>
              </a>
              <Link href="/phone-flippers">
                <Button variant="ghost" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-xs gap-1.5">
                  Full Broker Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── CIS MARKET LINKS ── */}
      <section className="py-14 px-4 bg-[#0A0F1E] border-t border-[#1E293B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">CIS & Regional Markets</div>
            <h2 className="text-2xl font-black text-white mb-2">Buying for Export? View Your Corridor</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Each market page has country-specific air routes, customs documentation requirements, import duties, and FAQs.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {[
              { flag: "🇦🇿", name: "Azerbaijan", sub: "Baku · GYD · 24h", slug: "/cis-azerbaijan" },
              { flag: "🇰🇿", name: "Kazakhstan", sub: "Almaty · ALA · 36h", slug: "/cis-kazakhstan" },
              { flag: "🇺🇿", name: "Uzbekistan", sub: "Tashkent · TAS · 36h", slug: "/cis-uzbekistan" },
              { flag: "🇷🇺", name: "Russia", sub: "Moscow · SVO · 48h", slug: "/cis-russia" },
              { flag: "🇬🇪", name: "Georgia", sub: "Tbilisi · TBS · 24h", slug: "/cis-georgia" },
              { flag: "🇰🇬", name: "Kyrgyzstan", sub: "Bishkek · FRU · 48h", slug: "/cis-kyrgyzstan" },
            ].map((m) => (
              <Link key={m.name} href={m.slug}>
                <div className="group rounded-xl border border-slate-700 hover:border-emerald-500/50 bg-[#0D1424] hover:bg-slate-800 transition-all p-4 text-center cursor-pointer">
                  <div className="text-2xl mb-1.5">{m.flag}</div>
                  <div className="font-black text-white text-xs mb-0.5 group-hover:text-emerald-300 transition-colors">{m.name}</div>
                  <div className="text-slate-600 text-[10px]">{m.sub}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/cis-electronics">
              <Button variant="outline" className="border-[#1E293B] text-slate-400 hover:text-white font-bold uppercase tracking-widest text-xs gap-2">
                <Globe className="w-4 h-4" />
                All CIS Electronics Markets
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-14 px-4 bg-[#070B14] border-t border-[#1E293B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Fixed Price vs Reverse Auction — Side by Side</h2>
            <p className="text-slate-400 text-sm">Pick the model that fits your business rhythm</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#1E293B]">
            <div className="grid grid-cols-3 bg-[#0D1424] border-b border-[#1E293B]">
              <div className="p-4 text-xs font-black uppercase tracking-widest text-slate-500">Factor</div>
              <div className="p-4 text-xs font-black uppercase tracking-widest text-amber-400 border-l border-[#1E293B]">Fixed Wholesale</div>
              <div className="p-4 text-xs font-black uppercase tracking-widest text-cyan-400 border-l border-[#1E293B]">Reverse Auction</div>
            </div>
            {[
              { factor: "Price certainty", wholesale: "Fixed — you know before you buy", auction: "Variable — competition drives it down" },
              { factor: "Typical savings", wholesale: "Listed fair market rate", auction: "15–35% below listed price" },
              { factor: "Speed to receive", wholesale: "48–72h from payment", auction: "72h–5 days (auction + logistics)" },
              { factor: "Min. order qty", wholesale: "25 or 50 pcs", auction: "50 units" },
              { factor: "Payment", wholesale: "Wire, cash, or escrow", auction: "DAFZA escrow only" },
              { factor: "Best for", wholesale: "Shop restocking, urgent orders, small importers", auction: "Container loads, CIS distributors, price-sensitive bulk" },
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
                <a href="#quick-inquiry">
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-[10px] gap-1.5 w-full">
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    Quick Inquiry
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

      {/* ── FINAL CTA ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={dubaiAirHub} alt="Dubai logistics hub" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/92 to-[#070B14]/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "142+", label: "Live lots right now", color: "text-amber-400" },
              { value: "34%", label: "Avg auction savings", color: "text-emerald-400" },
              { value: "48h", label: "Fixed-price delivery", color: "text-cyan-400" },
              { value: "200+", label: "Verified global suppliers", color: "text-purple-400" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0D1424]/80 border border-[#1E293B] rounded-xl p-5 text-center backdrop-blur-sm">
                <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-black text-white mb-3">Ready to Start Buying?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
              Message the team, submit a BOQ, or go straight to ChainTrack's live auction floor.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={waLink("[SOURCE: wholesale/final-cta]\nHi ChainTrack — I want to start buying iPhones in bulk.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest gap-2">
                  <SiWhatsapp className="w-5 h-5" />
                  Start on WhatsApp
                </Button>
              </a>
              <a href="#boq-builder">
                <Button size="lg" variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-black uppercase tracking-widest gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Build BOQ
                </Button>
              </a>
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black uppercase tracking-widest gap-2">
                  <Gavel className="w-5 h-5" />
                  View Live Auctions
                </Button>
              </Link>
              <a href={WA_COMMUNITY} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="ghost" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-xs gap-2">
                  <SiWhatsapp className="w-4 h-4" />
                  Buyers Community
                </Button>
              </a>
              <Link href="/fulfillment">
                <Button size="lg" variant="ghost" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-xs gap-2">
                  <Package className="w-4 h-4" />
                  Fulfillment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
