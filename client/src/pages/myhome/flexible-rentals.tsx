import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReferralLinkBar } from "@/components/referral-link-bar";
import {
  MessageCircle, Home, MapPin, Users, Wifi, CheckCircle2,
  Filter, Search, Zap, ArrowRight, Shield, Flame,
  Wrench, Sparkles, Building2, Star, Copy, Check,
  DollarSign, TrendingDown, Share2, Clock, Key,
  ChevronRight, ChevronDown, AlertCircle, HandCoins,
  Banknote, Bed, Bath, LayoutList, HelpCircle, Phone,
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

const BUDGET_RANGES = [
  { label: "AED 500–1,000", min: 500, max: 1000, icon: "💰" },
  { label: "AED 1,000–2,000", min: 1000, max: 2000, icon: "💼" },
  { label: "AED 2,000–3,500", min: 2000, max: 3500, icon: "🏠" },
  { label: "AED 3,500–5,000", min: 3500, max: 5000, icon: "✨" },
  { label: "AED 5,000+", min: 5000, max: 99999, icon: "👑" },
];

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
  lines.push(`Source: deliwer.com/flexible-rentals`);
  return lines.join("\n");
}

function buildTenantWA(budget: string, type: string, area: string, brokerRef: string): string {
  return [
    `Hello DeliWer 👋`,
    ``,
    `I'm looking for flexible accommodation in Dubai and I need help finding the right place.`,
    ``,
    `My Budget: ${budget || "Open to discuss"}`,
    `Looking For: ${type || "Any type"}`,
    `Preferred Area: ${area || "Open to any area"}`,
    ``,
    `Please send me available options. No annual contract preferred.`,
    brokerRef ? `\nReferred by: ${brokerRef}` : "",
  ].filter(Boolean).join("\n");
}

function buildHostWA(spaceType: string, area: string, price: string, brokerRef: string): string {
  return [
    `Hello DeliWer 👋`,
    ``,
    `I have a space to share / list for flexible rental in Dubai.`,
    ``,
    `Space Type: ${spaceType || "Not specified"}`,
    `Location: ${area || "Not specified"}`,
    `Monthly Price (asking): AED ${price || "Open to discuss"}`,
    ``,
    `Please help me list this and find verified tenants. I want to list without a long-term contract.`,
    brokerRef ? `\nReferral via: ${brokerRef}` : "",
  ].filter(Boolean).join("\n");
}

function PropertyCard({ listing, brokerRef }: { listing: FlexibleListing; brokerRef: string }) {
  const typeStyle = TYPE_COLORS[listing.type];
  const statusStyle = STATUS_CONFIG[listing.status];

  function inquire() {
    const msg = buildWAInquiry(listing, brokerRef);
    logEvent({ ref: brokerRef || undefined, page: `/flexible-rentals`, timestamp: new Date().toISOString(), action: "whatsapp_click" });
    window.open(`https://wa.me/${listing.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.2)] transition-all group flex flex-col"
    >
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
          <span className="shrink-0 text-[10px] font-black text-gray-700 uppercase tracking-widest">{listing.id}</span>
        </div>

        <div>
          <h3 className="text-white font-black text-base leading-snug group-hover:text-emerald-300 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
            <p className="text-gray-500 text-xs font-semibold">{listing.area} · {listing.community}</p>
          </div>
          {listing.highlight && (
            <p className="text-emerald-400 text-[11px] font-bold mt-1 flex items-center gap-1">
              <Star className="w-3 h-3" /> {listing.highlight}
            </p>
          )}
        </div>

        <div className="flex items-end gap-2">
          <div>
            <span className="text-2xl font-black text-white">AED {listing.monthlyPrice.toLocaleString()}</span>
            <span className="text-gray-500 text-xs font-semibold ml-1">/month</span>
          </div>
          {listing.billsIncluded && (
            <span className="text-[10px] font-black text-teal-400 bg-teal-500/10 border border-teal-500/25 rounded-lg px-2 py-0.5 mb-0.5">Bills Incl.</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-600">
          {listing.beds && <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {listing.beds} bed</span>}
          {listing.baths && <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {listing.baths} bath</span>}
          {listing.capacity > 1 && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {listing.capacity} max</span>}
          {listing.gender && listing.gender !== "any" && (
            <span className="ml-auto text-violet-500 uppercase tracking-wider font-black">{listing.gender === "couples" ? "Couples OK" : listing.gender + " only"}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.slice(0, 5).map((a) => (
            <span key={a} className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700/50 rounded-lg px-2 py-1 text-[10px] font-semibold text-gray-400">{a}</span>
          ))}
          {listing.amenities.length > 5 && (
            <span className="inline-flex items-center bg-slate-800 border border-slate-700/50 rounded-lg px-2 py-1 text-[10px] font-semibold text-gray-600">+{listing.amenities.length - 5} more</span>
          )}
        </div>

        {listing.services && listing.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.services.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 bg-blue-500/8 border border-blue-500/20 rounded-lg px-2 py-1 text-[10px] font-semibold text-blue-400">
                <Wrench className="w-2.5 h-2.5" /> {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Available: {listing.availableFrom}</span>
          {listing.spotsLeft && listing.spotsLeft <= 2 && (
            <span className="text-[10px] font-black text-amber-400 flex items-center gap-1">
              <Flame className="w-3 h-3" /> Only {listing.spotsLeft} left
            </span>
          )}
        </div>
        <button
          onClick={inquire}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-sm py-3 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_-6px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_-6px_rgba(37,211,102,0.6)]"
        >
          <MessageCircle className="w-4 h-4" /> Inquire on WhatsApp
        </button>
      </div>
    </motion.div>
  );
}

function TenantFunnel({ brokerRef }: { brokerRef: string }) {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");

  function launch() {
    const msg = buildTenantWA(budget, type, area, brokerRef);
    logEvent({ ref: brokerRef || undefined, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "tenant_funnel_complete" });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const steps = [
    {
      label: "What's your monthly budget?",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUDGET_RANGES.map((b) => (
            <button
              key={b.label}
              onClick={() => { setBudget(b.label); setStep(1); }}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl border text-left transition-all font-black text-sm uppercase tracking-wider ${
                budget === b.label
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                  : "border-slate-700 text-gray-400 hover:border-emerald-500/30 hover:text-white bg-slate-800/50"
              }`}
            >
              <span className="text-xl">{b.icon}</span>
              <span>{b.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "What type of accommodation?",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALL_TYPES.map((t) => {
            const style = TYPE_COLORS[t];
            return (
              <button
                key={t}
                onClick={() => { setType(PROPERTY_TYPE_LABELS[t]); setStep(2); }}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl border text-left transition-all font-black text-sm uppercase tracking-wider ${
                  type === PROPERTY_TYPE_LABELS[t]
                    ? `${style.badge} border`
                    : "border-slate-700 text-gray-400 hover:border-white/20 hover:text-white bg-slate-800/50"
                }`}
              >
                <Home className="w-4 h-4 shrink-0" />
                {PROPERTY_TYPE_LABELS[t]}
              </button>
            );
          })}
          <button
            onClick={() => { setType("Any type"); setStep(2); }}
            className="flex items-center gap-3 px-4 py-4 rounded-xl border border-slate-700 text-gray-500 hover:border-white/20 hover:text-white bg-slate-800/50 text-left font-black text-sm uppercase tracking-wider transition-all"
          >
            <HelpCircle className="w-4 h-4 shrink-0" /> Not sure yet
          </button>
        </div>
      ),
    },
    {
      label: "Preferred area in Dubai?",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_AREAS.map((a) => (
              <button
                key={a}
                onClick={() => { setArea(a); setStep(3); }}
                className={`px-3 py-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all text-center ${
                  area === a
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : "border-slate-700 text-gray-500 hover:border-white/20 hover:text-white bg-slate-800/50"
                }`}
              >
                {a}
              </button>
            ))}
            <button
              onClick={() => { setArea("Open to any area"); setStep(3); }}
              className="px-3 py-3 rounded-xl border border-slate-700 text-gray-500 hover:border-white/20 hover:text-white bg-slate-800/50 text-xs font-black uppercase tracking-wider transition-all text-center col-span-2 sm:col-span-1"
            >
              Any Area
            </button>
          </div>
        </div>
      ),
    },
    {
      label: "Ready — sending you to WhatsApp",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-2xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 font-semibold">Budget</span><span className="text-white font-black">{budget}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 font-semibold">Type</span><span className="text-white font-black">{type}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 font-semibold">Area</span><span className="text-white font-black">{area}</span></div>
          </div>
          <button
            onClick={launch}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-base py-4 rounded-2xl transition-all shadow-[0_0_40px_-8px_rgba(37,211,102,0.5)] hover:shadow-[0_0_50px_-8px_rgba(37,211,102,0.7)] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" /> Find My Place on WhatsApp
          </button>
          <p className="text-center text-xs text-gray-600 font-semibold">
            Response within 2 hours · No commitment required
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-6 space-y-5 shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)]">
      <div className="flex items-center gap-2 mb-1">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-emerald-500" : "bg-slate-700"}`}
          />
        ))}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Step {step + 1} of {steps.length}</p>
        <h3 className="text-lg font-black text-white">{steps[step].label}</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {steps[step].content}
        </motion.div>
      </AnimatePresence>
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="text-xs text-gray-600 hover:text-gray-400 font-bold uppercase tracking-widest transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

function HostFunnel({ brokerRef }: { brokerRef: string }) {
  const [spaceType, setSpaceType] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");

  const spaceTypes = ["Room in Villa", "Partition Room", "Entire Studio", "Bed Space", "Full Apartment", "Corporate Block"];

  function launch() {
    const msg = buildHostWA(spaceType, area, price, brokerRef);
    logEvent({ ref: brokerRef || undefined, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "host_funnel_launch" });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div className="bg-slate-900 border border-violet-500/20 rounded-3xl p-6 space-y-5 shadow-[0_0_60px_-15px_rgba(139,92,246,0.2)]">
      <div className="space-y-1">
        <Badge className="bg-violet-500/10 border-violet-500/25 text-violet-400 text-[10px] font-black uppercase tracking-widest px-3 py-1">
          <Key className="w-3 h-3 mr-1.5" /> List Your Space
        </Badge>
        <h3 className="text-lg font-black text-white">Have a room or villa to share?</h3>
        <p className="text-gray-500 text-sm font-medium">We match you with verified tenants. No listing fees.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Space Type</label>
          <div className="grid grid-cols-2 gap-2">
            {spaceTypes.map((t) => (
              <button
                key={t}
                onClick={() => setSpaceType(t)}
                className={`px-3 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all text-left ${
                  spaceType === t
                    ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                    : "border-slate-700 text-gray-500 hover:border-white/20 hover:text-gray-300 bg-slate-800/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Area / Location</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-violet-500/50"
          >
            <option value="">Select area…</option>
            {ALL_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
            <option value="Other">Other / Not listed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Monthly Asking Price (AED)</label>
          <Input
            placeholder="e.g. 2500"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-violet-500/50"
          />
        </div>

        <button
          onClick={launch}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_30px_-8px_rgba(139,92,246,0.4)]"
        >
          <MessageCircle className="w-4 h-4" /> List My Space on WhatsApp
        </button>
        <p className="text-center text-xs text-gray-600 font-semibold">
          We handle tenant vetting · No contract required · Free listing
        </p>
      </div>
    </div>
  );
}

export default function FlexibleRentalsPage() {
  const [activeMode, setActiveMode] = useState<"tenant" | "host" | null>(null);
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
      logEvent({ ref: brokerRef, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "page_visit" });
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
    const msg = `Hello DeliWer 👋\n\nI'm looking for flexible accommodation in Dubai — no annual contract.\n\nPlease help me find the right option.${brokerRef ? `\n\nReferred by: ${brokerRef}` : ""}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const availableNow = FLEXIBLE_LISTINGS.filter((l) => l.status === "available").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Flexible Rentals Dubai | Shared Villas, Rooms, Bed Spaces | DeliWer"
        description="Affordable flexible rentals in Dubai — no annual contract. Shared villas, partition rooms, private rooms, bed spaces, studios. Inquire directly via WhatsApp."
      />
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-10 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/5 rounded-full blur-[130px]" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-violet-500/4 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              <Zap className="w-3 h-3 mr-1.5" /> OnDemand · No Contract
            </Badge>
            <Badge className="bg-amber-500/10 border-amber-500/25 text-amber-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              <Flame className="w-3 h-3 mr-1.5" /> {availableNow} Available Now
            </Badge>
            {brokerRef && (
              <Badge className="bg-violet-500/10 border-violet-500/25 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                Partner Ref: {brokerRef}
              </Badge>
            )}
          </div>

          <h1 className="text-center text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.88] text-white mb-4">
            Flexible<br />
            <span className="text-emerald-400">Rentals</span><br />
            <span className="text-3xl md:text-5xl text-gray-500">Dubai</span>
          </h1>

          <p className="text-center text-lg text-gray-400 font-semibold max-w-2xl mx-auto leading-relaxed mb-6">
            Shared villas · partition rooms · bed spaces · studios.<br />
            <span className="text-white font-black">No annual contract. Move in this week.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-black uppercase tracking-wider text-gray-600 mb-10">
            {["No Annual Lock-in", "Bills Included Options", "Same-Day Response", "Broker Attribution", "Verified Listings"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </div>

          {/* ── DUAL MODE SELECTOR ── */}
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">
              Who are you?
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setActiveMode(activeMode === "tenant" ? null : "tenant")}
                className={`group relative flex flex-col items-center justify-center gap-3 py-8 px-6 rounded-3xl border-2 transition-all ${
                  activeMode === "tenant"
                    ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_60px_-15px_rgba(16,185,129,0.4)]"
                    : "border-slate-700 hover:border-emerald-500/40 hover:bg-slate-800/50"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeMode === "tenant" ? "bg-emerald-500" : "bg-slate-800 group-hover:bg-emerald-500/20"}`}>
                  <Search className={`w-7 h-7 ${activeMode === "tenant" ? "text-white" : "text-gray-500 group-hover:text-emerald-400"}`} />
                </div>
                <div className="text-center">
                  <p className="font-black text-lg uppercase tracking-tight text-white">I Need a Place</p>
                  <p className="text-gray-500 text-sm font-semibold mt-1">Find rooms, villas, or studios</p>
                </div>
                {activeMode === "tenant" && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setActiveMode(activeMode === "host" ? null : "host")}
                className={`group relative flex flex-col items-center justify-center gap-3 py-8 px-6 rounded-3xl border-2 transition-all ${
                  activeMode === "host"
                    ? "border-violet-500 bg-violet-500/10 shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)]"
                    : "border-slate-700 hover:border-violet-500/40 hover:bg-slate-800/50"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeMode === "host" ? "bg-violet-500" : "bg-slate-800 group-hover:bg-violet-500/20"}`}>
                  <Key className={`w-7 h-7 ${activeMode === "host" ? "text-white" : "text-gray-500 group-hover:text-violet-400"}`} />
                </div>
                <div className="text-center">
                  <p className="font-black text-lg uppercase tracking-tight text-white">I Have a Space</p>
                  <p className="text-gray-500 text-sm font-semibold mt-1">List your room, villa, or flat</p>
                </div>
                {activeMode === "host" && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-400" />
                  </div>
                )}
              </button>
            </div>

            <AnimatePresence>
              {activeMode === "tenant" && (
                <motion.div
                  key="tenant"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TenantFunnel brokerRef={brokerRef} />
                </motion.div>
              )}
              {activeMode === "host" && (
                <motion.div
                  key="host"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <HostFunnel brokerRef={brokerRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {!activeMode && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <button
                  onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-500 hover:text-emerald-400 text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-1.5 mx-auto"
                >
                  <LayoutList className="w-4 h-4" /> Or just browse all listings
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Active Listings", value: `${FLEXIBLE_LISTINGS.length}+` },
            { label: "Available Now", value: `${availableNow}` },
            { label: "Starting From", value: "AED 550/mo" },
            { label: "Areas Covered", value: `${ALL_AREAS.length}+` },
            { label: "Avg. Response", value: "< 2 hrs" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 mb-3">
              How It Works
            </Badge>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Move in under 48 hours</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: Search, title: "Tell us what you need", desc: "Use the finder above or message us on WhatsApp. Budget, type, area — that's all we need.", color: "emerald" },
              { step: "02", icon: MessageCircle, title: "We match & confirm", desc: "We send you 2–3 matching options within 2 hours. View, ask questions, choose — all on WhatsApp.", color: "blue" },
              { step: "03", icon: Key, title: "Move in — no contract", desc: "Month-to-month. Pay first month + deposit (if any). No Ejari, no annual lease, no agency fees.", color: "violet" },
            ].map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-slate-700">{s.step}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${s.color}-500/10 border border-${s.color}-500/25`}>
                    <s.icon className={`w-5 h-5 text-${s.color}-400`} />
                  </div>
                </div>
                <h3 className="font-black text-white uppercase tracking-tight">{s.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS ──────────────────────────────────────────────── */}
      <section id="listings" className="pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex-1">Live Listings</h2>
            <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {availableNow} Available Now
            </Badge>
          </div>

          {/* Type pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest border transition-all ${
                selectedType === "all" ? "bg-white text-slate-950 border-white" : "border-white/15 text-gray-500 hover:border-white/30 hover:text-white"
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
                    active ? `${style.badge} border` : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}
                >
                  {PROPERTY_TYPE_LABELS[t]}
                </button>
              );
            })}
          </div>

          {/* Search + filter bar */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by area, community, amenity…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-white/10 focus:border-emerald-500/40 text-white placeholder:text-gray-600 h-11 rounded-xl"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 h-11 rounded-xl border font-black text-xs uppercase tracking-widest transition-all ${
                showFilters ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "border-white/15 text-gray-500 hover:border-white/30 hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-4 mb-4"
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
                      {ALL_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Max Price: AED {maxPrice.toLocaleString()}/mo
                    </label>
                    <input
                      type="range" min={500} max={10000} step={100}
                      value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}
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
          </AnimatePresence>

          <div className="flex items-center justify-between mb-5">
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
              <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No listings match your filters</p>
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

      {/* ── URGENCY CTA BREAK ─────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-emerald-500 rounded-3xl p-8 text-center shadow-[0_0_80px_-15px_rgba(16,185,129,0.5)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%,rgba(0,0,0,0.1)_100%)]" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Flame className="w-5 h-5 text-emerald-900" />
                <span className="text-emerald-900 font-black uppercase tracking-widest text-xs">{availableNow} spots available right now</span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-950">
                Don't lose your spot.<br />Inquire in 30 seconds.
              </h2>
              <p className="text-emerald-900 font-semibold text-sm">
                High-demand areas like Dubai Marina, JVC, and Business Bay fill within 48 hours.
              </p>
              <button
                onClick={openGeneralWA}
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" /> Find My Place Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY NO CONTRACT ───────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-amber-500/10 border-amber-500/25 text-amber-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                The Survival Hack
              </Badge>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-tight">
                Why no contract<br />
                <span className="text-emerald-400">is the smartest move</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                Annual leases cost you AED 10,000–40,000 upfront plus 3–4 cheques.
                With flexible rentals, you pay one month at a time — and you're never trapped.
              </p>
              <div className="space-y-3">
                {[
                  { icon: TrendingDown, label: "Save 20–60% vs full apartment leases", color: "emerald" },
                  { icon: Clock, label: "Move in within 48 hours — sometimes same day", color: "blue" },
                  { icon: Shield, label: "No cheques, no Ejari risk, no agency fees", color: "violet" },
                  { icon: Banknote, label: "Pay monthly — stay as long as you need", color: "amber" },
                  { icon: HandCoins, label: "Bills included options available", color: "teal" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-${item.color}-500/10 border border-${item.color}-500/20 shrink-0`}>
                      <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                    </div>
                    <p className="text-sm font-semibold text-gray-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Cost Comparison</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-gray-400 font-semibold text-sm">Annual lease (1BR, JVC)</span>
                    <span className="text-red-400 font-black">AED 55,000+/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-gray-400 font-semibold text-sm">Flexible room (JVC villa)</span>
                    <span className="text-emerald-400 font-black">AED 2,800/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-gray-400 font-semibold text-sm">Partition room (Al Nahda)</span>
                    <span className="text-emerald-400 font-black">AED 1,100/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400 font-semibold text-sm">Bed space (Int'l City)</span>
                    <span className="text-emerald-400 font-black">AED 550/mo</span>
                  </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4 text-center">
                  <p className="text-emerald-400 font-black text-lg">Save up to AED 3,000+/mo</p>
                  <p className="text-gray-500 text-xs font-semibold">vs traditional annual lease</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR HOSTS / LANDLORDS ─────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <Badge className="bg-violet-500/10 border-violet-500/25 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                <Key className="w-3 h-3 mr-1.5" /> For Landlords & Hosts
              </Badge>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-tight">
                Fill your rooms.<br />
                <span className="text-violet-400">Earn every month.</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                Got a spare room, partition, or villa? We handle tenant matching, vetting, and WhatsApp coordination.
                You just confirm and collect.
              </p>
              <div className="space-y-3">
                {[
                  "Free listing — no upfront cost",
                  "Verified tenants only — we pre-screen",
                  "You set the price and rules",
                  "We handle inquiries and coordination",
                  "Brokers earn commission on every placement",
                ].map((p) => (
                  <div key={p} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                    <p className="text-sm font-semibold text-gray-300">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <HostFunnel brokerRef={brokerRef} />
          </div>
        </div>
      </section>

      {/* ── BROKER REFERRAL BAR ───────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Badge className="bg-violet-500/10 border-violet-500/25 text-violet-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              <Share2 className="w-3 h-3 mr-1.5" /> Broker & Partner Attribution
            </Badge>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Share Listings · Earn Commission</h2>
            <p className="text-gray-500 text-sm font-semibold max-w-md mx-auto">
              Generate your referral link. Share with anyone looking for a room in Dubai.
              Earn on every confirmed placement.
            </p>
          </div>
          <ReferralLinkBar label="Your Flexible Rentals Partner Link" />
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Per bed space placement", value: "AED 150+" },
              { label: "Per room placement", value: "AED 300+" },
              { label: "Per villa room placement", value: "AED 500+" },
            ].map((c) => (
              <div key={c.label} className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-emerald-400 font-black text-lg">{c.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-0.5">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            Ready to move in<br />
            <span className="text-emerald-400">this week?</span>
          </h2>
          <p className="text-gray-500 font-medium">
            WhatsApp us now. Tell us your budget and preferred area.
            We'll send you matching options within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openGeneralWA}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_40px_-8px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="w-5 h-5" /> Find My Place on WhatsApp
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello DeliWer 👋\n\nI have a space to list for flexible rental in Dubai. Please help me find tenants.")}`, "_blank")}
              className="flex items-center justify-center gap-2 border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl transition-all"
            >
              <Key className="w-5 h-5" /> List My Space
            </button>
          </div>
          <p className="text-xs text-gray-700 font-semibold uppercase tracking-widest">
            No commitment · No annual contract · Same-day response
          </p>
        </div>
      </section>

      {/* ── STICKY BOTTOM BAR (mobile) ────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex gap-3">
        <button
          onClick={openGeneralWA}
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl transition-all"
        >
          <MessageCircle className="w-4 h-4" /> Find a Place
        </button>
        <button
          onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello DeliWer 👋\n\nI have a space to list for flexible rental in Dubai. Please help me find tenants.")}`, "_blank")}
          className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl transition-all"
        >
          <Key className="w-4 h-4" /> List a Space
        </button>
      </div>
      <div className="h-16 md:hidden" />
    </div>
  );
}
