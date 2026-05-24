import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package, TruckIcon, CheckCircle, DollarSign, Globe, Zap, Shield,
  ArrowRight, Star, Clock, BarChart3, Users, Sparkles, Smartphone,
  Building2, Banknote, Phone, ChevronRight, Warehouse, FileCheck,
  Timer, Gavel, TrendingDown, AlertCircle, MapPin, Play, ExternalLink
} from "lucide-react";
import { getLatestModels, getModelsBySeries, type iPhoneModel } from "@shared/iphone-catalog";
import iPhone17ProMaxBlue from "@assets/generated_images/iPhone_17_Pro_Max_Blue_5527e769.png";
import iPhone17Pro from "@assets/generated_images/iPhone_17_Pro_Natural_102f756e.png";
import iPhone17Plus from "@assets/generated_images/iPhone_17_Plus_Black_07e48dac.png";
import iPhone17 from "@assets/generated_images/iPhone_17_White_c97e6eb6.png";
import logisticsWarehouseImg from "@assets/stock_images/modern_logistics_war_f64b7709.jpg";
import warehouseImg from "@assets/stock_images/modern_warehouse_ful_49a92694.jpg";
import cargoPlaneImg from "@assets/stock_images/hero_cargo_plane.jpg";
import shippingPortImg from "@assets/stock_images/hero_shipping_port.jpg";
import brokerHandshakeImg from "@assets/stock_images/broker_handshake_dubai.jpg";
import dubaiAirHubImg from "@assets/stock_images/dubai_air_hub.jpg";
import electronicsImg from "@assets/stock_images/people_electronics_r_56b6c258.jpg";
import smartphoneTradeImg from "@assets/stock_images/smartphone_trade-in__bd93d09e.jpg";

export default function FulfillmentByDeliWer() {
  const [activeTab, setActiveTab] = useState<"seller" | "buyer">("seller");

  return (
    <div className="min-h-screen bg-[#070B14] text-white">

      {/* ── HERO with real image overlay ── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={logisticsWarehouseImg} alt="ChainTrack fulfillment warehouse" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/88 to-[#070B14]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Powered by ChainTrack Global Network</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Fulfillment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                by DeliWer
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed max-w-2xl">
              The complete backend for traditional wholesale traders entering the digital supply chain. We handle sourcing, grading, storage, and worldwide shipping — so you focus on selling.
            </p>
            <div className="flex items-center gap-6 mb-10 text-sm">
              <div className="flex items-center gap-1.5 text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>No inventory risk</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>DAFZA bonded warehouse</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>48h average dispatch</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-join-reseller">
                  <Users className="w-5 h-5" />
                  Join as Reseller
                </Button>
              </Link>
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-browse-inventory">
                  <Package className="w-5 h-5" />
                  Browse Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Floating trust stats */}
        <div className="absolute bottom-8 right-8 hidden lg:grid grid-cols-2 gap-3">
          {[
            { value: "200+", label: "Verified Suppliers", color: "text-emerald-400" },
            { value: "50+", label: "Countries Served", color: "text-cyan-400" },
            { value: "10K+", label: "Orders Fulfilled", color: "text-purple-400" },
            { value: "48h", label: "Avg Dispatch Time", color: "text-amber-400" },
          ].map((s, i) => (
            <div key={i} className="bg-[#0D1424]/90 border border-[#1E293B] rounded-xl px-4 py-3 text-center backdrop-blur-sm" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCUREMENT MODEL GATEWAYS ── */}
      <section className="py-16 px-4 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3">Choose Your Procurement Gateway</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How Do You Want to Source?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              DeliWer Fulfillment plugs into both procurement models. Whether you prefer fixed wholesale prices or want suppliers to compete for your business — we fulfill the order the same way.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Gateway 1: Fixed Wholesale */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 group" data-testid="card-gateway-wholesale">
              <div className="absolute inset-0">
                <img src={electronicsImg} alt="Fixed price wholesale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/85 to-[#070B14]/50" />
              </div>
              <div className="relative z-10 p-8 min-h-[320px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 mb-4 w-fit">
                  <Banknote className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Gateway 1 · Fixed Price</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Straight Wholesale Purchase</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Browse our live inventory. See the price. Buy it. We pack and ship within 48 hours. Best for shop owners who need stock fast without bidding complexity.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { label: "Min Order", value: "10 units" },
                    { label: "Price Type", value: "Fixed listed" },
                    { label: "Speed", value: "48–72h dispatch" },
                    { label: "Best For", value: "Retail restocking" },
                  ].map((d, i) => (
                    <div key={i} className="bg-[#070B14]/80 rounded-lg px-3 py-2">
                      <div className="text-[9px] text-slate-600 uppercase tracking-wider">{d.label}</div>
                      <div className="text-xs font-black text-amber-300">{d.value}</div>
                    </div>
                  ))}
                </div>
                <Link href="/bulk-purchasing">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2 w-fit" data-testid="button-gateway-wholesale">
                    <Package className="w-4 h-4" />
                    Browse Fixed-Price Lots
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Gateway 2: Reverse Auction */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 group" data-testid="card-gateway-auction">
              <div className="absolute inset-0">
                <img src={shippingPortImg} alt="Reverse auction procurement" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/85 to-[#070B14]/50" />
              </div>
              <div className="relative z-10 p-8 min-h-[320px] flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 mb-4 w-fit">
                  <Gavel className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">Gateway 2 · Reverse Auction</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Supplier Competition Auction</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Post your requirement. Global suppliers bid down their prices to win your order. DeliWer fulfills whichever supplier wins — same quality guarantee either way.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { label: "Min Order", value: "50 units" },
                    { label: "Savings", value: "15–35% below list" },
                    { label: "Timeline", value: "Auction + 72h ship" },
                    { label: "Best For", value: "Volume importers" },
                  ].map((d, i) => (
                    <div key={i} className="bg-[#070B14]/80 rounded-lg px-3 py-2">
                      <div className="text-[9px] text-slate-600 uppercase tracking-wider">{d.label}</div>
                      <div className="text-xs font-black text-cyan-300">{d.value}</div>
                    </div>
                  ))}
                </div>
                <Link href="/chaintrack">
                  <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest gap-2 w-fit" data-testid="button-gateway-auction">
                    <Gavel className="w-4 h-4" />
                    Submit Reverse Auction
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Model comparison callout */}
          <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <AlertCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-black text-white mb-2">Either way, DeliWer handles all fulfillment</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Whether you buy at a fixed wholesale price or win a reverse auction, the fulfillment process is identical: IMEI verification → physical grading → DAFZA bonded storage → global shipping with tracking. The procurement model only affects how you got the price — not the quality of what you receive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW FULFILLMENT WORKS ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={warehouseImg} alt="DeliWer warehouse operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/90 to-[#070B14]/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">The Fulfillment Flow</div>
            <h2 className="text-4xl font-black text-white mb-4" data-testid="text-how-it-works-title">What Happens After You Buy</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              From the moment your order confirms to delivery at your door or warehouse — here's every step.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                step: "01",
                icon: FileCheck,
                title: "Order Confirmed",
                desc: "Escrow payment received. ChainTrack notifies the winning supplier. Pickup coordinated within 24 hours.",
                time: "0–24h",
                color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                testid: "card-step-1"
              },
              {
                step: "02",
                icon: Shield,
                title: "IMEI & Grade Inspection",
                desc: "Every device physically inspected at our DAFZA facility. IMEI checked against blacklists. Graded per ChainTrack standards. Full photo report sent.",
                time: "24–48h",
                color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
                testid: "card-step-2"
              },
              {
                step: "03",
                icon: Warehouse,
                title: "Bonded Storage",
                desc: "Goods stored in DAFZA bonded warehouse. You can collect at DAFZA, or we arrange global shipping. No customs duty until goods leave the freezone.",
                time: "Ready in 48–72h",
                color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                testid: "card-step-3"
              },
              {
                step: "04",
                icon: TruckIcon,
                title: "Global Shipping",
                desc: "DHL, FedEx, or freight consolidation to your destination. Door-to-door or port-to-port. Live tracking link sent with every shipment.",
                time: "48h–7 days",
                color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                testid: "card-step-4"
              },
              {
                step: "05",
                icon: CheckCircle,
                title: "Delivery & Escrow Release",
                desc: "You confirm receipt of goods. Escrow releases payment to supplier. Grade dispute? We hold payment until resolved in your favour.",
                time: "On delivery",
                color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                testid: "card-step-5"
              },
              {
                step: "06",
                icon: BarChart3,
                title: "Order Analytics",
                desc: "Full order history, supplier scorecards, and delivery performance reports in your dashboard. Use data to optimise next order.",
                time: "Always-on",
                color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
                testid: "card-step-6"
              },
            ].map((s) => (
              <div key={s.step} className={`rounded-2xl border p-5 ${s.color}`} data-testid={s.testid}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Step {s.step} · {s.time}</div>
                <h4 className="font-black text-white text-sm mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="text-center">
            <Link href="/signup">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest gap-2" data-testid="button-join-reseller">
                <Users className="w-5 h-5" />
                Start Selling — Join as Reseller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRADITIONAL WHOLESALE FUNNEL ── */}
      <section className="py-16 px-4 bg-[#070B14]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-3">For Traditional Channel Traders</div>
            <h2 className="text-3xl font-black text-white mb-4">The Deira Trader's Upgrade to Global Supply</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              If you've been buying phones from middlemen in Deira, Dragon Mart, or direct from importers — ChainTrack Fulfillment cuts every layer between you and the source.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                img: electronicsImg,
                title: "Electronics Retailers",
                loc: "Deira, Dragon Mart, Karama",
                desc: "Stop paying retail-plus to middlemen. Get the same stock they're selling you — direct from DAFZA, graded and documented.",
                saving: "Save AED 80–150/unit vs middlemen",
                cta: "Start Buying Direct",
                href: "/bulk-purchasing",
                color: "border-amber-500/30",
              },
              {
                img: brokerHandshakeImg,
                title: "Regional Distributors",
                loc: "Pakistan · Africa · CIS Countries",
                desc: "Bulk source for your region. We handle export docs, duty exemption (RODTEP), and consolidate multiple models into one shipment.",
                saving: "Container loads from AED 250/unit",
                cta: "Explore Export Options",
                href: "/chaintrack",
                color: "border-blue-500/30",
              },
              {
                img: smartphoneTradeImg,
                title: "Phone Flippers",
                loc: "Online · Local Markets · Worldwide",
                desc: "Buy reverse auction lots at 15–35% below retail. Flip locally or online. Full IMEI clean documentation for every unit.",
                saving: "Avg 28% margin per unit flipped",
                cta: "Join Flipper Track",
                href: "/partners#phone-flipper-track",
                color: "border-emerald-500/30",
              },
            ].map((card, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden border ${card.color} group`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{card.loc}</div>
                  </div>
                </div>
                <div className="p-5 bg-[#0D1424]">
                  <h4 className="font-black text-white text-base mb-2">{card.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{card.desc}</p>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-4">
                    <div className="text-[10px] font-black text-emerald-400">{card.saving}</div>
                  </div>
                  <Link href={card.href}>
                    <Button className="w-full bg-[#070B14] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 hover:text-white font-black uppercase tracking-widest text-xs gap-2">
                      {card.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVENTORY CATALOG ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={cargoPlaneImg} alt="Global freight by air" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/92 to-[#070B14]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-5" data-testid="badge-new-lineup">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">New: iPhone 17 Lineup Available</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4" data-testid="text-catalog-title">Browse Available Inventory</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm" data-testid="text-catalog-subtitle">
              Access verified iPhone inventory from global suppliers. Real-time pricing and availability.
            </p>
          </div>

          {/* iPhone 17 Featured */}
          <div className="mb-12 bg-[#0D1424]/90 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white mb-2">iPhone 17 Series — Now Available</h3>
              <p className="text-slate-400 text-sm">Pre-order for GITEX 2025 launch. Priority access for verified resellers.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "iPhone 17 Pro Max", image: iPhone17ProMaxBlue, storage: "Up to 2TB", price: "From $485/unit (bulk 50+)" },
                { name: "iPhone 17 Pro", image: iPhone17Pro, storage: "Up to 1TB", price: "From $425/unit (bulk 50+)" },
                { name: "iPhone 17 Plus", image: iPhone17Plus, storage: "Up to 512GB", price: "From $385/unit (bulk 50+)" },
                { name: "iPhone 17", image: iPhone17, storage: "Up to 512GB", price: "From $345/unit (bulk 50+)" },
              ].map((model, idx) => (
                <div key={idx} className="bg-[#070B14] rounded-xl p-4 border border-[#1E293B] hover:border-emerald-500/30 transition-all" data-testid={`card-catalog-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex justify-center mb-4">
                    <img src={model.image} alt={model.name} className="w-24 h-24 object-contain" data-testid={`img-catalog-${model.name.toLowerCase().replace(/\s+/g, '-')}`} />
                  </div>
                  <div className="text-center">
                    <div className="font-black text-white text-sm mb-1">{model.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{model.storage}</div>
                    <div className="text-emerald-400 font-black text-xs mb-3">{model.price}</div>
                    <div className="flex gap-2">
                      <Link href="/chaintrack" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-[#1E293B] text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest" data-testid={`button-browse-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          Auction
                        </Button>
                      </Link>
                      <Link href="/bulk-purchasing" className="flex-1">
                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest" data-testid={`button-quote-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          Buy
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/bulk-purchasing">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest gap-2" data-testid="button-request-bulk-quote">
                  <Package className="w-5 h-5" />
                  Request Bulk Quote
                </Button>
              </Link>
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-black uppercase tracking-widest gap-2" data-testid="button-browse-all-inventory">
                  <Smartphone className="w-5 h-5" />
                  Browse All Auctions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESELLER PRICING TIERS ── */}
      <section className="py-20 px-4 bg-[#0A0F1E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">Reseller Pricing</div>
            <h2 className="text-4xl font-black text-white mb-4" data-testid="text-pricing-title">Transparent Markup Tiers</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm" data-testid="text-pricing-subtitle">
              No hidden fees. Simple platform markup based on your monthly order volume.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                markup: "1%",
                orders: "Up to 50 orders/month",
                desc: "Perfect for getting started",
                features: ["Full inventory access", "Quality inspection included", "Standard support", "Bank transfer payment"],
                cta: "Get Started",
                style: "border-[#1E293B] bg-[#0D1424]",
                ctaStyle: "border-[#1E293B] text-slate-300",
                testid: "card-tier-starter"
              },
              {
                name: "Growth",
                markup: "0.5%",
                orders: "50–500 orders/month",
                desc: "For scaling businesses",
                features: ["Priority inventory access", "API integration", "Priority support", "Custom branding options", "NET 7 payment terms"],
                cta: "Start Growing",
                style: "border-emerald-500/40 bg-[#0D1424] shadow-lg shadow-emerald-500/10",
                ctaStyle: "bg-emerald-600 hover:bg-emerald-500 text-white border-0",
                popular: true,
                testid: "card-tier-growth"
              },
              {
                name: "Enterprise",
                markup: "Custom",
                orders: "500+ orders/month",
                desc: "For high-volume operations",
                features: ["Dedicated account manager", "White-label fulfillment", "NET 15 payment terms", "Custom integrations", "1 charter/quarter included"],
                cta: "Contact Sales",
                style: "border-[#1E293B] bg-[#0D1424]",
                ctaStyle: "border-[#1E293B] text-slate-300",
                testid: "card-tier-enterprise"
              },
            ].map((tier) => (
              <div key={tier.name} className={`rounded-2xl border p-6 relative ${tier.style}`} data-testid={tier.testid}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-emerald-500 text-white">Most Popular</div>
                )}
                <div className="mb-5">
                  <div className="font-black text-white text-lg mb-0.5">{tier.name}</div>
                  <div className="text-xs text-slate-500">{tier.desc}</div>
                </div>
                <div className="mb-5">
                  <span className="text-4xl font-black text-white">{tier.markup}</span>
                  <span className="text-slate-500 text-sm ml-1">markup/order</span>
                  <div className="text-xs text-slate-500 mt-1">{tier.orders}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full font-black uppercase tracking-widest text-xs border ${tier.ctaStyle}`}>
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / SHIPPING VISUAL ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={dubaiAirHubImg} alt="Dubai global logistics hub" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/90 to-[#070B14]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Ready to Scale?</div>
          <h2 className="text-4xl font-black text-white mb-4" data-testid="text-cta-title">
            Join 200+ Verified Resellers<br />Fulfilling Globally
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm" data-testid="text-cta-subtitle">
            Whether you're restocking a Deira shop or distributing containers across Africa — DeliWer Fulfillment scales with you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest gap-2 min-h-12" data-testid="button-cta-join">
                <Users className="w-5 h-5" />
                Join as Reseller
              </Button>
            </Link>
            <a
              href="https://wa.me/971523946311?text=Hi%20DeliWer!%20I%20want%20to%20learn%20about%20Fulfillment%20by%20DeliWer."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-black uppercase tracking-widest gap-2 min-h-12">
                <Phone className="w-5 h-5" />
                WhatsApp to Start
              </Button>
            </a>
            <Link href="/bulk-purchasing">
              <Button size="lg" variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-black uppercase tracking-widest gap-2 min-h-12" data-testid="button-cta-learn-more">
                <Package className="w-5 h-5" />
                Browse Wholesale Lots
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-600 mt-6" data-testid="text-cta-approval">
            24-hour KYC approval · No setup fees · Cancel anytime · DAFZA escrow on every transaction
          </p>
        </div>
      </section>
    </div>
  );
}
