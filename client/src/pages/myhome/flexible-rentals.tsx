import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import {
  MessageCircle, Key, X, ChevronRight, Check, Copy, Users,
  Building2, Layers, Home, BedDouble, LayoutGrid, MapPin,
  Star, Zap, Shield, ArrowRight, TrendingUp, Heart, Filter,
  Train, Wifi, Coffee, ChevronDown, Play, Search,
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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// ── Constants ──────────────────────────────────────────────────────────────────

const WA_NUMBER = "971523946311";
const WA_NUMBER_2 = "971523906019";

const TYPE_PILLS: { label: string; value: PropertyType | "all"; icon: React.ReactNode }[] = [
  { label: "All Types", value: "all", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { label: "Shared Villa", value: "villa-share", icon: <Home className="w-3.5 h-3.5" /> },
  { label: "Private Room", value: "room", icon: <BedDouble className="w-3.5 h-3.5" /> },
  { label: "Studio", value: "studio", icon: <Building2 className="w-3.5 h-3.5" /> },
  { label: "Partition", value: "partition", icon: <Layers className="w-3.5 h-3.5" /> },
  { label: "Bed Space", value: "bedspace", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
];

const BUDGET_OPTIONS = [
  { label: "Under AED 1,000 / mo", emoji: "💪", sub: "Bed space or partition", wa: "My monthly budget is under AED 1,000. I'm looking for a bed space or partition room." },
  { label: "AED 1,000 – 2,000 / mo", emoji: "🏠", sub: "Private or partition room", wa: "My monthly budget is AED 1,000–2,000. I'm looking for a private or partition room." },
  { label: "AED 2,000 – 3,500 / mo", emoji: "⭐", sub: "Villa share or private room", wa: "My monthly budget is AED 2,000–3,500. I'm interested in a villa share or private room." },
  { label: "AED 3,500 – 5,000 / mo", emoji: "🏡", sub: "Studio or villa room", wa: "My monthly budget is AED 3,500–5,000. I'm looking for a studio or villa room." },
  { label: "AED 5,000+ / mo", emoji: "💎", sub: "Studio or full apartment", wa: "My monthly budget is AED 5,000+. I'm interested in a studio or full apartment." },
];

const DUBAI_AREAS = [
  "Al Nahda (Sharjah)", "Al Barsha", "Al Furjan", "Al Quoz", "Al Qusais", "Al Satwa",
  "Bur Dubai", "Business Bay", "Deira", "DIFC", "Discovery Gardens", "Downtown Dubai",
  "Dubai Marina", "Dubai Silicon Oasis", "International City", "Jumeirah",
  "Jumeirah Lake Towers (JLT)", "Jumeirah Village Circle (JVC)", "Karama",
  "Mirdif", "Motor City", "Muwaileh (Sharjah)", "Palm Jumeirah", "Sports City",
  "Studio City", "Tecom / Barsha Heights", "The Greens", "Other",
];

const COMMON_AMENITIES = [
  "WiFi", "AC", "DEWA Included", "Cleaning", "Parking", "Gym Access",
  "Pool", "Balcony", "Private Bathroom", "Shared Kitchen", "Bills Included",
  "Furnished", "Near Metro", "Security", "Laundry",
];

const LIFESTYLE_CATEGORIES = [
  { icon: "💎", label: "Executive Living", sub: "Premium shared villas & studios", filter: "villa-share", minPrice: 2500 },
  { icon: "💪", label: "Economy Living", sub: "Under AED 1,500/mo", filter: "bedspace", maxPrice: 1500 },
  { icon: "👨‍👩‍👧", label: "Family Sharing", sub: "Spacious, couples welcome", filter: "room", gender: "any" },
  { icon: "💑", label: "Couples Friendly", sub: "No restrictions", filter: "villa-share", gender: "couples" },
  { icon: "👩", label: "Ladies Only", sub: "Safe, verified spaces", filter: "partition", gender: "female" },
  { icon: "🚇", label: "Metro Access", sub: "Walk to station", filter: "all", metro: true },
  { icon: "🏢", label: "Monthly Studios", sub: "No annual contract", filter: "studio", noContract: true },
  { icon: "🌐", label: "Remote Workers", sub: "WiFi + workspace", filter: "studio", wifi: true },
];

const AREA_HUBS = [
  {
    name: "Al Nahda",
    emoji: "🏙️",
    region: "Sharjah → Dubai",
    tagline: "Economy Flex Hub",
    desc: "The #1 affordable corridor. Easy Dubai access via RTA.",
    priceFrom: 950,
    audience: ["Workers", "Couples", "New Arrivals"],
    anchor: ["Sahara Centre", "Lulu Hypermarket"],
    color: "from-blue-600/20 to-blue-900/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
  },
  {
    name: "Dubai Marina",
    emoji: "🌊",
    region: "JBR Strip",
    tagline: "Digital Nomad Premium",
    desc: "Waterfront living for remote professionals.",
    priceFrom: 2800,
    audience: ["Freelancers", "Remote Workers", "Expats"],
    anchor: ["Marina Mall", "JBR Beach"],
    color: "from-cyan-600/20 to-cyan-900/10",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
  },
  {
    name: "Deira",
    emoji: "🏪",
    region: "Old Dubai",
    tagline: "Budget Workforce Zone",
    desc: "Affordable, central, historic. Metro connected.",
    priceFrom: 700,
    audience: ["Workforce", "Budget Travellers"],
    anchor: ["Gold Souk", "Fish Market", "Metro"],
    color: "from-amber-600/20 to-amber-900/10",
    border: "border-amber-500/20 hover:border-amber-500/40",
  },
  {
    name: "International City",
    emoji: "🌍",
    region: "Dubai East",
    tagline: "Entry-Level Affordable",
    desc: "The most affordable beds in Dubai. Communities by nationality.",
    priceFrom: 500,
    audience: ["New Arrivals", "Budget Seekers"],
    anchor: ["Dragon Mart", "Local Markets"],
    color: "from-violet-600/20 to-violet-900/10",
    border: "border-violet-500/20 hover:border-violet-500/40",
  },
  {
    name: "JVC",
    emoji: "🌿",
    region: "New Dubai",
    tagline: "Young Professionals",
    desc: "Modern villas, green spaces, affordable studios.",
    priceFrom: 2200,
    audience: ["Young Professionals", "Couples"],
    anchor: ["Spinneys", "Five Hotels"],
    color: "from-emerald-600/20 to-emerald-900/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
  },
  {
    name: "Business Bay",
    emoji: "🏗️",
    region: "Downtown Adjacent",
    tagline: "Corporate Temp Living",
    desc: "Short-term stays near DIFC and Downtown.",
    priceFrom: 3500,
    audience: ["Corporate", "Entrepreneurs"],
    anchor: ["Canal Walk", "Bay Avenue Mall"],
    color: "from-rose-600/20 to-rose-900/10",
    border: "border-rose-500/20 hover:border-rose-500/40",
  },
  {
    name: "Bur Dubai",
    emoji: "🕌",
    region: "Heart of Dubai",
    tagline: "Family Shared Living",
    desc: "Cultural, diverse, affordable family zones.",
    priceFrom: 1200,
    audience: ["Families", "Workers", "New Arrivals"],
    anchor: ["Meena Bazaar", "Al Fahidi Metro"],
    color: "from-orange-600/20 to-orange-900/10",
    border: "border-orange-500/20 hover:border-orange-500/40",
  },
  {
    name: "Muwaileh",
    emoji: "🎓",
    region: "Sharjah University Zone",
    tagline: "Student & Family Economy",
    desc: "Near USH, affordable and family-friendly.",
    priceFrom: 800,
    audience: ["Students", "Families", "Economy Seekers"],
    anchor: ["City Centre Al Zahia", "USH Campus"],
    color: "from-indigo-600/20 to-indigo-900/10",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya M.",
    from: "India → Dubai Marina",
    text: "Moved in within 48 hours of arriving. No annual contract, no deposit nightmare. DeliWer saved me.",
    rating: 5,
    type: "Studio",
    price: "AED 4,200/mo",
    avatar: "🇮🇳",
  },
  {
    name: "Ahmed K.",
    from: "Egypt → JVC",
    text: "As a freelancer, I needed flexibility. Found a villa share with a home office vibe. Couldn't be happier.",
    rating: 5,
    type: "Villa Share",
    price: "AED 2,800/mo",
    avatar: "🇪🇬",
  },
  {
    name: "Maria & Juan",
    from: "Philippines → Al Barsha",
    text: "Couples friendly, couples verified. Moved in the same week we landed. The WhatsApp flow was instant.",
    rating: 5,
    type: "Private Room",
    price: "AED 3,500/mo",
    avatar: "🇵🇭",
  },
  {
    name: "Ravi S.",
    from: "India → Al Nahda",
    text: "I needed budget living near Dubai Metro. Found a partition under AED 1,100 — bills included. Unreal value.",
    rating: 5,
    type: "Partition Room",
    price: "AED 1,100/mo",
    avatar: "🇮🇳",
  },
];

const BROKER_STATS = [
  { label: "Active Brokers", value: "140+", icon: <Users className="w-4 h-4" /> },
  { label: "Listings Available", value: "320+", icon: <Building2 className="w-4 h-4" /> },
  { label: "Areas Covered", value: "24", icon: <MapPin className="w-4 h-4" /> },
  { label: "Avg. Fill Time", value: "< 5 days", icon: <Zap className="w-4 h-4" /> },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function openWA(number: string, text: string) {
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank");
}

function buildWAInquiry(listing: FlexibleListing | FlexListingDB, brokerRef: string): string {
  const msg = [
    "Hello DeliWer 👋",
    `I'm interested in: *${listing.title}*`,
    `📍 Area: ${listing.area}`,
    `💰 Price: AED ${listing.monthlyPrice.toLocaleString()}/mo`,
    "🗓️ I'd like to arrange a viewing or get more details.",
    brokerRef ? `Referred by: ${brokerRef}` : "",
  ].filter(Boolean).join("\n");
  return msg;
}

function buildBudgetWA(budgetMsg: string, brokerRef: string): string {
  return [
    "Hello DeliWer 👋",
    "",
    budgetMsg,
    "",
    "Please share available options. No annual contract preferred.",
    brokerRef ? `Referred by: ${brokerRef}` : "",
  ].filter(Boolean).join("\n");
}

// ── Types ──────────────────────────────────────────────────────────────────────

type Mode = "find" | "list";

interface FlexListingDB {
  id: string;
  title: string;
  area: string;
  community?: string;
  type: string;
  monthlyPrice: number;
  amenities: string[];
  billsIncluded: boolean;
  availableFrom: string;
  status: string;
  managerName: string;
  managerPhone: string;
  notes?: string;
  createdAt: string;
}

// ── Animated Counter ───────────────────────────────────────────────────────────

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-black text-white"
      >
        {value}
      </motion.p>
      <p className="text-gray-500 text-xs mt-0.5">{label}</p>
    </div>
  );
}

// ── Budget Quiz Sheet ──────────────────────────────────────────────────────────

function BudgetQuizSheet({ visible, onDismiss, brokerRef }: { visible: boolean; onDismiss: () => void; brokerRef: string }) {
  function pick(opt: typeof BUDGET_OPTIONS[0]) {
    logEvent({ ref: brokerRef || undefined, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "budget_quiz_complete" });
    onDismiss();
    openWA(WA_NUMBER, buildBudgetWA(opt.wa, brokerRef));
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onDismiss} />
          <motion.div key="sh" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0d14] border-t border-white/10 rounded-t-3xl px-5 pt-5 pb-10 max-w-lg mx-auto">
            <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-6" />
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white font-bold text-lg">What's your budget?</p>
                <p className="text-gray-500 text-sm mt-0.5">We'll WhatsApp you matching options instantly.</p>
              </div>
              <button onClick={onDismiss} className="text-gray-600 hover:text-gray-400 transition-colors p-1 -mr-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2.5">
              {BUDGET_OPTIONS.map((opt) => (
                <button key={opt.label} onClick={() => pick(opt)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-white/8 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-left transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <p className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors">{opt.label}</p>
                      <p className="text-gray-600 text-xs">{opt.sub}</p>
                    </div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-gray-600 group-hover:text-[#25D366] transition-colors shrink-0" />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-700 mt-5">Opens WhatsApp · No forms · No commitment</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Listing Card ───────────────────────────────────────────────────────────────

const TYPE_FALLBACK_IMAGES: Record<string, string> = {
  "villa-share": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  room: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=800&q=80",
  studio: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  partition: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
  bedspace: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
};

function ListingCard({ listing, brokerRef, isNew = false }: { listing: FlexibleListing | FlexListingDB; brokerRef: string; isNew?: boolean }) {
  const [imgErr, setImgErr] = useState(false);
  const [saved, setSaved] = useState(false);
  const isStatic = "whatsappNumber" in listing;
  const staticL = listing as FlexibleListing;
  const dbL = listing as FlexListingDB;
  const typeKey = listing.type as PropertyType;
  const typeLabel = PROPERTY_TYPE_LABELS[typeKey] || listing.type;
  const typeColor = TYPE_COLORS[typeKey] || TYPE_COLORS["room"];
  const imgSrc = imgErr || (!isStatic && !(listing as any).image)
    ? TYPE_FALLBACK_IMAGES[listing.type] || TYPE_FALLBACK_IMAGES["room"]
    : isStatic ? (imgErr ? TYPE_FALLBACK_IMAGES[listing.type] : staticL.image) : ((listing as any).image || TYPE_FALLBACK_IMAGES[listing.type]);
  const badge = isStatic ? staticL.badge : (isNew ? "New Listing" : null);
  const highlight = isStatic ? staticL.highlight : null;
  const gender = isStatic ? staticL.gender : null;
  const status = isStatic ? staticL.status : "available";

  function inquire() {
    logEvent({ ref: brokerRef || undefined, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "whatsapp_click" });
    const wa = isStatic ? staticL.whatsappNumber : WA_NUMBER;
    openWA(wa, buildWAInquiry(listing, brokerRef));
  }

  const genderBadge = gender === "female" ? "👩 Ladies Only" : gender === "couples" ? "💑 Couples OK" : gender === "male" ? "👨 Male Only" : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={`bg-[#0d1117] border rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 ${
        isNew ? "border-emerald-500/25 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
               : "border-white/8 hover:border-white/16 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-900 shrink-0">
        <img
          src={imgSrc}
          alt={listing.title}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border backdrop-blur-sm ${typeColor.badge}`}>
            {typeLabel}
          </span>
          {badge && (
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
              {badge}
            </span>
          )}
          {isNew && !badge && (
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
              ✦ New
            </span>
          )}
        </div>

        {/* Save + Status */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <button onClick={() => setSaved(!saved)}
            className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${
              saved ? "bg-red-500/30 border-red-500/40 text-red-400" : "bg-black/40 border-white/10 text-gray-400 hover:text-white"
            }`}>
            <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
          </button>
          {status === "limited" && (
            <span className="text-[9px] font-bold text-red-300 bg-red-500/25 border border-red-500/30 backdrop-blur-sm rounded-lg px-2 py-0.5">
              LAST ROOM
            </span>
          )}
        </div>

        {/* Gender badge */}
        {genderBadge && (
          <div className="absolute bottom-10 left-3">
            <span className="text-[10px] font-semibold text-white/80 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-0.5">
              {genderBadge}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-white font-black text-xl leading-none drop-shadow-lg">
              AED {listing.monthlyPrice.toLocaleString()}
            </span>
            <span className="text-gray-400 text-xs font-normal ml-1">/mo</span>
          </div>
          {listing.billsIncluded && (
            <span className="text-[10px] text-teal-400 font-bold bg-teal-500/15 border border-teal-500/25 rounded-md px-2 py-0.5">
              Bills incl.
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <MapPin className="w-3 h-3 text-gray-600 shrink-0" />
            <p className="text-xs text-gray-500 truncate">{listing.area}{isStatic && staticL.community ? ` · ${staticL.community}` : ""}</p>
          </div>
          <h3 className="text-white font-bold text-sm leading-snug">{listing.title}</h3>
          {highlight && (
            <p className="text-emerald-400 text-xs mt-1 font-medium">✓ {highlight}</p>
          )}
        </div>

        {/* Amenities */}
        {listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.amenities.slice(0, 4).map((a) => (
              <span key={a} className="text-[11px] text-gray-500 bg-white/4 border border-white/6 rounded-md px-2 py-0.5">{a}</span>
            ))}
            {listing.amenities.length > 4 && (
              <span className="text-[11px] text-gray-600 px-1">+{listing.amenities.length - 4} more</span>
            )}
          </div>
        )}

        {/* Availability + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div>
            <p className="text-[11px] text-gray-600">From {listing.availableFrom}</p>
            {isStatic && staticL.spotsLeft && (
              <p className="text-[10px] text-amber-400 font-semibold">{staticL.spotsLeft} spot{staticL.spotsLeft > 1 ? "s" : ""} left</p>
            )}
          </div>
          <button
            onClick={inquire}
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Host Form ──────────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, React.ReactNode> = {
  "villa-share": <Home className="w-4 h-4" />,
  room: <BedDouble className="w-4 h-4" />,
  studio: <Building2 className="w-4 h-4" />,
  partition: <Layers className="w-4 h-4" />,
  bedspace: <LayoutGrid className="w-4 h-4" />,
};

function HostForm({ brokerRef, onSuccess }: { brokerRef: string; onSuccess: () => void }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "", area: "", type: "room" as PropertyType,
    monthlyPrice: "", billsIncluded: false,
    availableFrom: "Immediate", managerName: "", managerPhone: "", notes: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toggleAmenity(a: string) {
    setSelectedAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const price = parseInt(form.monthlyPrice.replace(/\D/g, ""), 10);
      if (!form.title || !form.area || !form.managerName || !form.managerPhone || isNaN(price)) {
        throw new Error("Please fill in all required fields.");
      }
      return apiRequest("POST", "/api/flex-listings", {
        title: form.title, area: form.area, type: form.type, monthlyPrice: price,
        billsIncluded: form.billsIncluded, availableFrom: form.availableFrom || "Immediate",
        managerName: form.managerName, managerPhone: form.managerPhone,
        notes: form.notes || null, amenities: selectedAmenities,
        brokerRef: brokerRef || null, status: "pending",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/flex-listings"] });
      toast({ title: "Listing submitted! 🎉", description: "We'll review and activate it within 24 hours." });
      onSuccess();
      openWA(WA_NUMBER, `Hello DeliWer 👋\n\nI just submitted a flex listing:\n*${form.title}* in ${form.area} — AED ${form.monthlyPrice}/month.\n\nPlease confirm receipt and activate it.`);
    },
    onError: (err: Error) => {
      toast({ title: "Couldn't submit", description: err.message, variant: "destructive" });
    },
  });

  const inputCls = "w-full bg-black/30 border border-white/10 focus:border-white/25 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-700 outline-none transition-colors";
  const labelCls = "text-xs text-gray-500 font-semibold mb-1.5 block uppercase tracking-wide";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="bg-[#0d1117] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-lg">List Your Space</p>
          <p className="text-gray-500 text-sm mt-0.5">Get matched with tenants within 24–48 hours.</p>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${step === s ? "w-6 bg-emerald-400" : step > s ? "w-2 bg-emerald-600" : "w-2 bg-white/10"}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div>
            <label className={labelCls}>Listing Title *</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Private Room in 3BR Villa — Al Barsha" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Area / Neighbourhood *</label>
            <select value={form.area} onChange={(e) => set("area", e.target.value)} className={inputCls + " appearance-none cursor-pointer"}>
              <option value="">Select area…</option>
              {DUBAI_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Room Type *</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][]).map(([k, v]) => (
                <button key={k} type="button" onClick={() => set("type", k)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm border transition-all ${
                    form.type === k ? "bg-white text-slate-950 border-white font-bold" : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}>
                  {TYPE_ICONS[k]} {v}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => form.title && form.area ? setStep(2) : toast({ title: "Fill in required fields first", variant: "destructive" })}
            className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all">
            Continue →
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Monthly Price (AED) *</label>
              <input value={form.monthlyPrice} onChange={(e) => set("monthlyPrice", e.target.value)}
                placeholder="e.g. 2500" type="number" min="0" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Available From</label>
              <input value={form.availableFrom} onChange={(e) => set("availableFrom", e.target.value)}
                placeholder="Immediate / 1 Aug…" className={inputCls} />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-white/8 cursor-pointer" onClick={() => set("billsIncluded", !form.billsIncluded)}>
            <button type="button"
              className={`w-10 h-6 rounded-full border transition-all relative shrink-0 ${form.billsIncluded ? "bg-emerald-500 border-emerald-500" : "bg-white/5 border-white/15"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.billsIncluded ? "translate-x-4" : ""}`} />
            </button>
            <div>
              <p className="text-sm text-white font-medium">DEWA / utilities included</p>
              <p className="text-xs text-gray-600">Bills bundled into monthly price</p>
            </div>
          </div>
          <div>
            <label className={labelCls}>Amenities (tap to select)</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_AMENITIES.map((a) => (
                <button key={a} type="button" onClick={() => toggleAmenity(a)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                    selectedAmenities.includes(a) ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300" : "border-white/8 text-gray-600 hover:border-white/15 hover:text-gray-400"
                  }`}>
                  {selectedAmenities.includes(a) && <Check className="w-3 h-3 shrink-0" />}
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-white/10 text-gray-400 font-semibold py-3 rounded-xl hover:border-white/20 transition-all">
              ← Back
            </button>
            <button onClick={() => form.monthlyPrice ? setStep(3) : toast({ title: "Enter monthly price", variant: "destructive" })}
              className="flex-[2] bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all">
              Continue →
            </button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Your Name *</label>
              <input value={form.managerName} onChange={(e) => set("managerName", e.target.value)}
                placeholder="Ahmed Al Mansoori" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>WhatsApp Number *</label>
              <input value={form.managerPhone} onChange={(e) => set("managerPhone", e.target.value)}
                placeholder="+971 50 000 0000" type="tel" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Additional Notes</label>
            <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)}
              placeholder="Any specific rules, preferences, or details about the property…"
              rows={3} className={inputCls + " resize-none"} />
          </div>

          {/* Summary */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4 space-y-1.5">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Summary</p>
            <p className="text-white text-sm font-semibold">{form.title}</p>
            <p className="text-gray-400 text-sm">{form.area} · {PROPERTY_TYPE_LABELS[form.type]}</p>
            <p className="text-emerald-400 text-sm font-bold">AED {parseInt(form.monthlyPrice || "0").toLocaleString()}/mo{form.billsIncluded ? " (bills incl.)" : ""}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border border-white/10 text-gray-400 font-semibold py-3 rounded-xl hover:border-white/20 transition-all">
              ← Back
            </button>
            <button onClick={() => mutation.mutate()} disabled={mutation.isPending}
              className="flex-[2] bg-[#25D366] hover:bg-[#1fbd5a] active:scale-[0.98] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {mutation.isPending ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              ) : (
                <><MessageCircle className="w-4 h-4" /> Submit & WhatsApp</>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function FlexibleRentalsPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const brokerRef = params.get("ref") || "";

  const [mode, setMode] = useState<Mode>("find");
  const [activeType, setActiveType] = useState<PropertyType | "all">("all");
  const [activeArea, setActiveArea] = useState<string>("all");
  const [showBudgetQuiz, setShowBudgetQuiz] = useState(false);
  const [hostSuccess, setHostSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dbData } = useQuery<{ listings: FlexListingDB[] }>({
    queryKey: ["/api/flex-listings"],
    queryFn: () => fetch("/api/flex-listings?status=active").then((r) => r.json()),
    staleTime: 60_000,
  });

  const { data: statsData } = useQuery<{ active: number; filled: number; total: number }>({
    queryKey: ["/api/flex-listings/stats"],
    queryFn: () => fetch("/api/flex-listings/stats").then((r) => r.json()),
    staleTime: 120_000,
  });

  const dbListings: FlexListingDB[] = dbData?.listings || [];
  const allAreas = useMemo(() => {
    const areas = new Set(FLEXIBLE_LISTINGS.map((l) => l.area));
    dbListings.forEach((l) => areas.add(l.area));
    return ["all", ...Array.from(areas).sort()];
  }, [dbListings]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const staticFiltered = FLEXIBLE_LISTINGS.filter((l) => {
      if (activeType !== "all" && l.type !== activeType) return false;
      if (activeArea !== "all" && l.area !== activeArea) return false;
      if (q && !l.title.toLowerCase().includes(q) && !l.area.toLowerCase().includes(q)) return false;
      return true;
    });
    const dbFiltered = dbListings.filter((l) => {
      if (activeType !== "all" && l.type !== activeType) return false;
      if (activeArea !== "all" && l.area !== activeArea) return false;
      if (q && !l.title.toLowerCase().includes(q) && !l.area.toLowerCase().includes(q)) return false;
      return true;
    });
    return { static: staticFiltered, db: dbFiltered };
  }, [activeType, activeArea, searchQuery, dbListings]);

  const totalActive = statsData?.active ?? (FLEXIBLE_LISTINGS.length + dbListings.length);

  useEffect(() => {
    logEvent({ ref: brokerRef || undefined, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "page_view" });
  }, []);

  return (
    <div className="min-h-screen bg-[#060810] text-white font-sans">
      <SEOMeta
        title="Flexible Rentals Dubai & Sharjah | Rooms, Studios, Bed Spaces | Rentals by DeliWer"
        description="Find rooms, bed spaces, partitions, studios and shared villas in Dubai & Sharjah — no annual contracts. Instant WhatsApp connection. Flex living for real life."
      />
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-[#060810] to-[#060810]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Brand pill */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Rentals by DeliWer · Dubai & Sharjah
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-white mb-4">
              Flexible Living Across
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                Dubai & Sharjah.
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Rooms, bed spaces, partitions, studios and shared villas —{" "}
              <span className="text-white font-semibold">move in without annual contracts.</span>
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mb-8">
            <AnimatedStat value={`${totalActive}+`} label="Active listings" />
            <div className="w-px h-8 bg-white/10" />
            <AnimatedStat value="24" label="Areas covered" />
            <div className="w-px h-8 bg-white/10" />
            <AnimatedStat value="0" label="Annual contracts" />
            <div className="w-px h-8 bg-white/10" />
            <AnimatedStat value="< 48h" label="Avg. move-in" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={() => { setMode("find"); setShowBudgetQuiz(true); }}
              className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.45)] text-base"
            >
              <Search className="w-5 h-5" />
              Find a Space
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMode("list")}
              className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/12 active:scale-[0.98] text-white font-bold px-7 py-4 rounded-2xl transition-all text-base"
            >
              <Building2 className="w-5 h-5" />
              Fill My Property
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello DeliWer 👋\n\nI'd like to become a broker partner for Flex Living.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white/4 hover:bg-white/8 border border-white/8 active:scale-[0.98] text-gray-300 font-semibold px-7 py-4 rounded-2xl transition-all text-base"
            >
              <Users className="w-5 h-5" />
              Become a Broker
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-600">
            {["No annual contracts", "WhatsApp-first", "Verified properties", "Move in fast"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MODE TOGGLE ───────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#060810]/95 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex rounded-xl bg-white/5 border border-white/8 p-1 gap-1">
            {(["find", "list"] as Mode[]).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  mode === m ? "bg-white text-slate-950 shadow" : "text-gray-500 hover:text-gray-300"
                }`}>
                {m === "find" ? "🔍 Find a Space" : "🏠 List Your Space"}
              </button>
            ))}
          </div>

          {mode === "find" && (
            <button onClick={() => setShowBudgetQuiz(true)}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              <Filter className="w-3.5 h-3.5" />
              Budget Quiz
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* ── FIND MODE ────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {mode === "find" && (
            <motion.div key="find" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Search + Filters */}
              <div className="mb-8 space-y-4">
                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by area, room type, or amenity…"
                    className="w-full bg-white/5 border border-white/10 focus:border-white/25 rounded-2xl pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-gray-700 outline-none transition-colors"
                  />
                </div>

                {/* Type pills */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {TYPE_PILLS.map((p) => (
                    <button key={p.value} onClick={() => setActiveType(p.value)}
                      className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        activeType === p.value
                          ? "bg-white text-slate-950 border-white shadow"
                          : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300 bg-white/3"
                      }`}>
                      {p.icon} {p.label}
                    </button>
                  ))}
                </div>

                {/* Stats + budget quiz CTA */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-sm">
                    <span className="text-white font-bold">{filtered.static.length + filtered.db.length}</span> listings found
                    {activeType !== "all" && <span className="text-gray-600"> · {PROPERTY_TYPE_LABELS[activeType]}</span>}
                  </p>
                  <button onClick={() => setShowBudgetQuiz(true)}
                    className="sm:hidden flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Budget Match
                  </button>
                  <button onClick={() => setShowBudgetQuiz(true)}
                    className="hidden sm:flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Get matched by budget
                  </button>
                </div>
              </div>

              {/* Listings grid */}
              {filtered.static.length + filtered.db.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">🏠</p>
                  <p className="text-white font-bold text-lg mb-2">No listings match your filters</p>
                  <p className="text-gray-500 text-sm mb-6">Try different filters or let us match you on WhatsApp.</p>
                  <button onClick={() => setShowBudgetQuiz(true)}
                    className="bg-[#25D366] hover:bg-[#1fbd5a] text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 mx-auto">
                    <MessageCircle className="w-4 h-4" />
                    Find via WhatsApp
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.static.map((l) => <ListingCard key={l.id} listing={l} brokerRef={brokerRef} />)}
                  {filtered.db.map((l) => <ListingCard key={l.id} listing={l} brokerRef={brokerRef} isNew />)}
                </div>
              )}

              {/* WhatsApp CTA banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-10 bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              >
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-white font-bold text-lg sm:text-xl mb-1">Don't see what you need?</p>
                  <p className="text-gray-400 text-sm">Tell us your requirements and we'll match you within the hour.</p>
                </div>
                <button
                  onClick={() => setShowBudgetQuiz(true)}
                  className="shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Match Me on WhatsApp
                </button>
              </motion.div>

              {/* ── LIFESTYLE CATEGORIES ───────────────────────────────────────── */}
              <section className="mt-16">
                <div className="mb-6">
                  <h2 className="text-white font-black text-2xl sm:text-3xl mb-1">Browse by Lifestyle</h2>
                  <p className="text-gray-500 text-sm">Find accommodation that fits your life, not just your budget.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {LIFESTYLE_CATEGORIES.map((cat, i) => (
                    <motion.button
                      key={cat.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => {
                        if (cat.filter !== "all") setActiveType(cat.filter as PropertyType);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-2xl p-4 text-left transition-all group"
                    >
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <p className="text-white font-bold text-sm">{cat.label}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{cat.sub}</p>
                    </motion.button>
                  ))}
                </div>
              </section>

              {/* ── AREA EXPLORER ──────────────────────────────────────────────── */}
              <section className="mt-16">
                <div className="mb-6">
                  <h2 className="text-white font-black text-2xl sm:text-3xl mb-1">Explore by Area</h2>
                  <p className="text-gray-500 text-sm">Every neighbourhood has its own energy. Find yours.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {AREA_HUBS.map((area, i) => (
                    <motion.div
                      key={area.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => {
                        setActiveArea(area.name);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`cursor-pointer bg-gradient-to-br ${area.color} border ${area.border} rounded-2xl p-5 transition-all hover:scale-[1.02] active:scale-[0.99]`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{area.emoji}</span>
                        <span className="text-[10px] font-semibold text-gray-500 bg-white/5 rounded-lg px-2 py-0.5">{area.region}</span>
                      </div>
                      <h3 className="text-white font-black text-base mb-0.5">{area.name}</h3>
                      <p className="text-xs text-gray-500 font-semibold mb-2">{area.tagline}</p>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3">{area.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-bold text-sm">AED {area.priceFrom.toLocaleString()}+/mo</span>
                        <ArrowRight className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {area.audience.map((a) => (
                          <span key={a} className="text-[10px] text-gray-600 bg-white/5 rounded-md px-1.5 py-0.5">{a}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ── TENANT TESTIMONIALS ────────────────────────────────────────── */}
              <section className="mt-16">
                <div className="mb-6">
                  <h2 className="text-white font-black text-2xl sm:text-3xl mb-1">Real People. Real Moves.</h2>
                  <p className="text-gray-500 text-sm">Stories from people who found their place through DeliWer.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TESTIMONIALS.map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white/4 border border-white/8 rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{t.avatar}</span>
                          <div>
                            <p className="text-white font-semibold text-sm">{t.name}</p>
                            <p className="text-gray-600 text-xs">{t.from}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 text-[10px]">{t.type}</p>
                          <p className="text-emerald-400 text-xs font-bold">{t.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ── BROKER NETWORK ─────────────────────────────────────────────── */}
              <section className="mt-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-900/80 to-[#0a0d14] border border-white/10 rounded-3xl p-8 sm:p-10"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold mb-3">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Broker Network
                      </div>
                      <h2 className="text-white font-black text-2xl sm:text-3xl mb-1">Fill Empty Properties Fast</h2>
                      <p className="text-gray-400 text-sm max-w-xl">Property managers and brokers — list your inventory and get qualified tenant leads directly on WhatsApp. Zero platform commission for the first 90 days.</p>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello DeliWer 👋\n\nI'm a broker/property manager interested in joining your network to fill my properties.")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-2 bg-white text-slate-950 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all">
                      <Users className="w-4 h-4" />
                      Join as Broker
                    </a>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {BROKER_STATS.map((s) => (
                      <div key={s.label} className="bg-white/5 border border-white/8 rounded-2xl p-4 text-center">
                        <div className="flex justify-center mb-2 text-blue-400">{s.icon}</div>
                        <p className="text-white font-black text-xl">{s.value}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { icon: "📤", title: "Upload listings instantly", desc: "Submit rooms and spaces via WhatsApp or web form." },
                      { icon: "🎯", title: "Receive qualified leads", desc: "Tenants come pre-screened by budget, move-in date, and preference." },
                      { icon: "💰", title: "Earn commissions", desc: "Monthly referral commissions for every successful placement." },
                    ].map((f) => (
                      <div key={f.title} className="bg-white/4 border border-white/8 rounded-xl p-4">
                        <span className="text-xl block mb-2">{f.icon}</span>
                        <p className="text-white font-semibold text-sm mb-1">{f.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
              <section className="mt-16">
                <div className="text-center mb-8">
                  <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">Move In, Fast.</h2>
                  <p className="text-gray-500 text-sm">Three steps from browsing to keys in hand.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { step: "01", icon: "🔍", title: "Browse & Filter", desc: "Find by area, budget, type, or lifestyle preference. No sign-up required." },
                    { step: "02", icon: "💬", title: "WhatsApp Instantly", desc: "Connect with the property manager directly. No middlemen, no waiting." },
                    { step: "03", icon: "🔑", title: "Move In Fast", desc: "View, agree, move in. Many properties available within 24–48 hours." },
                  ].map((s, i) => (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative bg-white/4 border border-white/8 rounded-2xl p-6"
                    >
                      <span className="text-[10px] font-black text-gray-700 absolute top-5 right-5">{s.step}</span>
                      <span className="text-3xl block mb-3">{s.icon}</span>
                      <h3 className="text-white font-bold text-base mb-1.5">{s.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
              <section className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden bg-gradient-to-br from-emerald-900/50 via-teal-900/30 to-[#0d1117] border border-emerald-500/20 rounded-3xl p-8 sm:p-12 text-center"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
                  <div className="relative">
                    <p className="text-4xl mb-4">🏠</p>
                    <h2 className="text-white font-black text-2xl sm:text-3xl mb-3">
                      You Are Not Alone.<br />
                      <span className="text-emerald-400">Find Your Next Place Instantly.</span>
                    </h2>
                    <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                      Thousands of people arrive in Dubai every month. Flexible living is the new normal.
                      One WhatsApp message is all it takes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button onClick={() => setShowBudgetQuiz(true)}
                        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] text-base">
                        <MessageCircle className="w-5 h-5" />
                        Start on WhatsApp
                      </button>
                      <button onClick={() => setMode("list")}
                        className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/12 active:scale-95 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base">
                        <Building2 className="w-5 h-5" />
                        List a Property
                      </button>
                    </div>
                    <p className="text-gray-700 text-xs mt-6">
                      +971 52 394 6311 · +971 52 390 6019 · info@deliwer.com
                    </p>
                  </div>
                </motion.div>
              </section>
            </motion.div>
          )}

          {/* ── LIST MODE ────────────────────────────────────────────────────────── */}
          {mode === "list" && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              {hostSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-white font-black text-2xl mb-2">Listing Submitted!</h2>
                  <p className="text-gray-400 text-base mb-6">We'll review and activate it within 24 hours. Check WhatsApp for confirmation.</p>
                  <button onClick={() => { setHostSuccess(false); setMode("find"); }}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm underline underline-offset-4">
                    Browse listings →
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Broker value prop */}
                  <div className="mb-6 bg-white/4 border border-white/8 rounded-2xl p-5">
                    <p className="text-white font-bold mb-3">Why list with Rentals by DeliWer?</p>
                    <div className="space-y-2">
                      {[
                        { icon: "⚡", text: "Go live within 24 hours of approval" },
                        { icon: "📱", text: "Tenant inquiries direct to your WhatsApp" },
                        { icon: "🎯", text: "Pre-qualified tenants matched to your property" },
                        { icon: "🆓", text: "Free to list — no commission for first 90 days" },
                      ].map((b) => (
                        <div key={b.text} className="flex items-center gap-2.5 text-sm text-gray-400">
                          <span>{b.icon}</span> {b.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <HostForm brokerRef={brokerRef} onSuccess={() => setHostSuccess(true)} />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── STICKY WHATSAPP FAB ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-5 z-30 flex flex-col items-end gap-2"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <button
            onClick={() => openWA(WA_NUMBER, "Hello DeliWer 👋\n\nI need help finding a flexible accommodation in Dubai or Sharjah.")}
            className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-4 py-3 rounded-2xl shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm">Chat with us</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Budget Quiz */}
      <BudgetQuizSheet visible={showBudgetQuiz} onDismiss={() => setShowBudgetQuiz(false)} brokerRef={brokerRef} />
    </div>
  );
}
