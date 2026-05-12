import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReferralLinkBar } from "@/components/referral-link-bar";
import {
  MessageCircle, Home, MapPin, Users, Wifi, Car, Dumbbell,
  CheckCircle2, Filter, Search, Zap, ArrowRight, Shield,
  Wrench, Sparkles, Building2, Star, ChevronRight, Copy, Check,
  DollarSign, TrendingDown, Share2, ExternalLink,
} from "lucide-react";
import {
  FLEXIBLE_LISTINGS,
  PROPERTY_TYPE_LABELS,
  TYPE_COLORS,
  STATUS_CONFIG,
  type PropertyType,
  type FlexibleListing,
} from "@/data/flexible-rentals";
import { logEvent } from "@/lib/referral";

const WA_NUMBER = "971523946311";

const ALL_AREAS = Array.from(new Set(FLEXIBLE_LISTINGS.map((l) => l.area))).sort();
const ALL_TYPES: PropertyType[] = ["villa-share", "partition", "room", "bedspace", "studio"];

function buildWAInquiry(listing: FlexibleListing, brokerRef: string): string {
  const lines = [
    `Hello DeliWer 👋`,
    `I am interested in Flexible Rental Property ID ${listing.id} in ${listing.area}.`,
    ``,
    `Property: ${listing.title}`,
    `Area: ${listing.area}, ${listing.community}`,
    `Monthly Price: AED ${listing.monthlyPrice.toLocaleString()}`,
    `Available: ${listing.availableFrom}`,
  ];
  if (brokerRef) lines.push(`Referred by: ${brokerRef}`);
  lines.push(`Source: deliwer.com/myhome/flexible-rentals`);
  return lines.join("\n");
}

function PropertyCard({ listing, brokerRef }: { listing: FlexibleListing; brokerRef: string }) {
  const typeStyle = TYPE_COLORS[listing.type];
  const statusStyle = STATUS_CONFIG[listing.status];

  function inquire() {
    const msg = buildWAInquiry(listing, brokerRef);
    logEvent({
      ref: brokerRef || undefined,
      page: `/myhome/flexible-rentals`,
      timestamp: new Date().toISOString(),
      action: "whatsapp_click",
    });
    window.open(`https://wa.me/${listing.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.2)] transition-all group flex flex-col"
    >
      {/* Card Header */}
      <div className="px-5 pt-5 pb-4 space-y-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge className={`${typeStyle.badge} border text-[10px] font-black uppercase tracking-wider px-2 py-0.5`}>
              {PROPERTY_TYPE_LABELS[listing.type]}
            </Badge>
            <Badge className={`${statusStyle.color} border text-[10px] font-black uppercase tracking-wider px-2 py-0.5`}>
              {statusStyle.label}
            </Badge>
            {listing.badge && (
              <Badge className="bg-white/5 border-white/10 text-gray-300 text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                {listing.badge}
              </Badge>
            )}
          </div>
          <span className="shrink-0 text-[10px] font-black text-gray-600 uppercase tracking-widest">
            {listing.id}
          </span>
        </div>

        <div>
          <h3 className="text-white font-black text-base leading-snug group-hover:text-emerald-300 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
            <p className="text-gray-500 text-xs font-semibold">
              {listing.area} · {listing.community}
            </p>
          </div>
          {listing.highlight && (
            <p className="text-emerald-400 text-[11px] font-bold mt-1 flex items-center gap-1">
              <Star className="w-3 h-3" /> {listing.highlight}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-black text-white">
            AED {listing.monthlyPrice.toLocaleString()}
          </span>
          <span className="text-gray-500 text-xs font-semibold">/month</span>
          {listing.capacity > 1 && (
            <span className="ml-auto flex items-center gap-1 text-gray-500 text-xs font-semibold">
              <Users className="w-3 h-3" /> {listing.capacity} capacity
            </span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.slice(0, 5).map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700/50 rounded-lg px-2 py-1 text-[10px] font-semibold text-gray-400"
            >
              {a}
            </span>
          ))}
          {listing.amenities.length > 5 && (
            <span className="inline-flex items-center bg-slate-800 border border-slate-700/50 rounded-lg px-2 py-1 text-[10px] font-semibold text-gray-600">
              +{listing.amenities.length - 5} more
            </span>
          )}
        </div>

        {/* Services */}
        {listing.services && listing.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {listing.services.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-blue-500/8 border border-blue-500/20 rounded-lg px-2 py-1 text-[10px] font-semibold text-blue-400"
              >
                <Wrench className="w-2.5 h-2.5" /> {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
            Available: {listing.availableFrom}
          </span>
          {brokerRef && (
            <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider">
              via {brokerRef}
            </span>
          )}
        </div>
        <button
          onClick={inquire}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-sm py-3 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_-6px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_-6px_rgba(37,211,102,0.6)]"
          data-testid={`inquire-${listing.id}`}
        >
          <MessageCircle className="w-4 h-4" />
          Inquire on WhatsApp
        </button>
      </div>
    </motion.div>
  );
}

export default function FlexibleRentalsPage() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  const brokerRef = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return (
      params.get("ref") ||
      params.get("broker") ||
      params.get("partner") ||
      localStorage.getItem("deliwer_ref") ||
      ""
    );
  }, []);

  useEffect(() => {
    if (brokerRef) {
      logEvent({
        ref: brokerRef,
        page: "/myhome/flexible-rentals",
        timestamp: new Date().toISOString(),
        action: "page_visit",
      });
    }
  }, [brokerRef]);

  const filtered = useMemo(() => {
    return FLEXIBLE_LISTINGS.filter((l) => {
      if (selectedType !== "all" && l.type !== selectedType) return false;
      if (selectedArea !== "all" && l.area !== selectedArea) return false;
      if (l.monthlyPrice > maxPrice) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !l.title.toLowerCase().includes(q) &&
          !l.area.toLowerCase().includes(q) &&
          !l.community.toLowerCase().includes(q) &&
          !l.amenities.some((a) => a.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [selectedType, selectedArea, maxPrice, searchQuery]);

  function openGeneralWA() {
    const msg = `Hello DeliWer 👋\n\nI'm looking for flexible / shared accommodation in Dubai.\n\nPlease help me find the right option based on my budget and preferences.${brokerRef ? `\n\nReferred by: ${brokerRef}` : ""}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Flexible Rentals Dubai | Shared Villas, Partition Rooms, Bed Spaces | DeliWer"
        description="Affordable flexible rentals in Dubai — shared villas, partition rooms, bed spaces, studios. Cost-sharing housing solutions for professionals, couples, and workforce teams. Inquire via WhatsApp."
      />
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-1.5" /> OnDemand Leasing · Dubai
            </Badge>
            <Badge className="bg-red-500/10 border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              <TrendingDown className="w-3 h-3 mr-1.5" /> Austerity-Smart Housing
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            Flexible Rentals<br />
            <span className="text-emerald-400">Dubai</span>
          </h1>

          <p className="text-lg text-gray-400 font-semibold max-w-2xl mx-auto leading-relaxed">
            Shared villas, partition rooms, bed spaces & flexible studios. Cost-smart housing for professionals,
            couples, and corporate teams. No annual lock-in. Inquire directly via WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-black uppercase tracking-wider text-gray-500 pt-2">
            {[
              "No Long Leases",
              "Bills Included Options",
              "WhatsApp Inquiry",
              "Broker Attribution",
              "Same-Day Response",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={openGeneralWA}
              className="bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest h-13 px-8 rounded-2xl gap-2 shadow-[0_0_40px_-8px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="w-5 h-5" /> Find My Place on WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
              className="border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest h-13 px-8 rounded-2xl gap-2"
            >
              <Filter className="w-4 h-4" /> Browse All Listings
            </Button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Active Listings", value: `${FLEXIBLE_LISTINGS.length}+` },
            { label: "Starting From", value: "AED 550/mo" },
            { label: "Areas Covered", value: `${ALL_AREAS.length}+` },
            { label: "Avg. Response", value: "< 2 hrs" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROPERTY TYPE PILLS ───────────────────────────────────────────── */}
      <section className="pt-10 pb-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest border transition-all ${
                selectedType === "all"
                  ? "bg-white text-slate-950 border-white"
                  : "border-white/15 text-gray-500 hover:border-white/30 hover:text-white"
              }`}
            >
              All Types
            </button>
            {ALL_TYPES.map((t) => {
              const style = TYPE_COLORS[t];
              const active = selectedType === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(active ? "all" : t)}
                  className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest border transition-all ${
                    active ? style.badge + " border" : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}
                >
                  {PROPERTY_TYPE_LABELS[t]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTER ──────────────────────────────────────────────── */}
      <section className="pb-6 px-4">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by area, community, or amenity…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-white/10 focus:border-emerald-500/40 text-white placeholder:text-gray-600 h-11 rounded-xl"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 h-11 rounded-xl border font-black text-xs uppercase tracking-widest transition-all ${
                showFilters
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                  : "border-white/15 text-gray-500 hover:border-white/30 hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Area</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm font-semibold"
                  >
                    <option value="all">All Areas</option>
                    {ALL_AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Max Price: AED {maxPrice.toLocaleString()}/mo
                  </label>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(+e.target.value)}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-semibold">
                    <span>AED 500</span><span>AED 10,000</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setSelectedType("all"); setSelectedArea("all"); setMaxPrice(10000); setSearchQuery(""); }}
                className="text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-widest font-bold transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── LISTINGS GRID ────────────────────────────────────────────────── */}
      <section id="listings" className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-black text-gray-500 uppercase tracking-widest">
              {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
            </p>
            {brokerRef && (
              <Badge className="bg-violet-500/10 border-violet-500/25 text-violet-400 text-[10px] font-black uppercase tracking-widest">
                Partner ref: {brokerRef}
              </Badge>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Search className="w-10 h-10 text-gray-700 mx-auto" />
              <p className="text-gray-500 font-black uppercase tracking-widest text-sm">
                No listings match your filters
              </p>
              <button
                onClick={() => { setSelectedType("all"); setSelectedArea("all"); setMaxPrice(10000); setSearchQuery(""); }}
                className="text-emerald-400 hover:text-emerald-300 font-black uppercase tracking-wider text-xs transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} brokerRef={brokerRef} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BROKER REFERRAL BAR ───────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center space-y-1 mb-6">
            <Badge className="bg-violet-500/10 border-violet-500/25 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              <Share2 className="w-3 h-3 mr-1.5" /> Broker & Partner Attribution
            </Badge>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
              Share Listings & Earn Commissions
            </h2>
            <p className="text-gray-500 text-sm font-semibold">
              Generate your referral link — append it to any listing URL. Earn on every successful placement.
            </p>
          </div>
          <ReferralLinkBar label="Your Flexible Rentals Partner Link" />
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">How to share with attribution</p>
            <p className="text-gray-400 text-sm font-medium">
              Add your referral code to any listing WhatsApp message. Example:
            </p>
            <div className="bg-slate-950 rounded-xl px-4 py-3 font-mono text-xs text-emerald-400 break-all">
              https://deliwer.com/myhome/flexible-rentals?ref=yourcode
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / POSITIONING ──────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <Badge className="bg-amber-500/10 border-amber-500/25 text-amber-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                Why Flexible Living?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
                Smart Housing<br />
                <span className="text-emerald-400">For Tough Times</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                In a shifting economy, locking into 12-month leases is a risk. Flexible rentals let you
                reduce costs, stay mobile, and optimize your living situation — whether you're a new arrival,
                transitioning jobs, or scaling a workforce.
              </p>
              <div className="space-y-3">
                {[
                  { icon: DollarSign, label: "Cost Reduction", desc: "Save 20–60% vs full apartment leases" },
                  { icon: TrendingDown, label: "No Annual Commitment", desc: "Month-to-month with proper notice periods" },
                  { icon: Users, label: "Shared Economy", desc: "Better utilization of vacant spaces citywide" },
                  { icon: Building2, label: "Extra Income for Owners", desc: "Property owners earn from idle rooms" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm">{label}</p>
                      <p className="text-gray-500 text-xs font-semibold">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Who This Is For
                </p>
                {[
                  { label: "New Dubai Arrivals", desc: "Find accommodation while hunting for long-term", icon: "🛬" },
                  { label: "Professionals on Transfer", desc: "Short-term stays without year-long commitment", icon: "💼" },
                  { label: "Property Owners", desc: "Earn from spare rooms or vacant properties", icon: "🏠" },
                  { label: "Corporate HR Teams", desc: "Workforce accommodation for new hires", icon: "🏢" },
                  { label: "Brokers & Agents", desc: "Offer clients a bridge option, earn commissions", icon: "🤝" },
                ].map(({ label, desc, icon }) => (
                  <div key={label} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                    <span className="text-lg shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-white font-black text-sm">{label}</p>
                      <p className="text-gray-500 text-xs font-semibold">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={openGeneralWA}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                List Your Property on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ECOSYSTEM ───────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
              Partner Services Available
            </h2>
            <p className="text-gray-500 text-sm font-semibold mt-1">
              DeliWer's technical & management network supports every flexible rental
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Partition Fitting", icon: "🔧" },
              { label: "AC Servicing", icon: "❄️" },
              { label: "Furniture & Appliances", icon: "🛋️" },
              { label: "WiFi Setup", icon: "📶" },
              { label: "Cleaning Services", icon: "🧹" },
              { label: "Ejari Support", icon: "📋" },
              { label: "DEWA Activation", icon: "⚡" },
              { label: "Property Management", icon: "🏢" },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-slate-900 border border-slate-700/40 rounded-xl px-4 py-3 hover:border-emerald-500/25 transition-colors"
              >
                <span className="text-xl shrink-0">{icon}</span>
                <p className="text-white font-bold text-xs leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            Ready to Find Your<br />
            <span className="text-emerald-400">Flexible Home in Dubai?</span>
          </h2>
          <p className="text-gray-400 font-semibold leading-relaxed">
            WhatsApp us your requirements — budget, area, move-in date — and we'll match you with the best
            available option within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={openGeneralWA}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_40px_-8px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp My Requirements
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl transition-all"
            >
              <Filter className="w-4 h-4" /> Browse Listings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
