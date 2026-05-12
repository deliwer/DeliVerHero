import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { ReferralLinkBar } from "@/components/referral-link-bar";
import {
  MessageCircle, Key, X, ChevronRight, Check, Copy, Users,
  Building2, Layers, Home, BedDouble, LayoutGrid,
} from "lucide-react";
import {
  FLEXIBLE_LISTINGS,
  PROPERTY_TYPE_LABELS,
  type PropertyType,
  type FlexibleListing,
} from "@/data/flexible-rentals";
import { logEvent } from "@/lib/referral";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const WA_NUMBER = "971523946311";

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

// ── Constants ─────────────────────────────────────────────────────────────────

const TYPE_PILLS: { label: string; value: PropertyType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Villa Room", value: "villa-share" },
  { label: "Private Room", value: "room" },
  { label: "Studio", value: "studio" },
  { label: "Partition", value: "partition" },
  { label: "Bed Space", value: "bedspace" },
];

const BUDGET_OPTIONS = [
  { label: "Under AED 1,000 / mo", wa: "My monthly budget is under AED 1,000. I'm looking for a bed space or partition room." },
  { label: "AED 1,000 – 2,000 / mo", wa: "My monthly budget is AED 1,000–2,000. I'm looking for a private or partition room." },
  { label: "AED 2,000 – 3,500 / mo", wa: "My monthly budget is AED 2,000–3,500. I'm interested in a villa share or private room." },
  { label: "AED 3,500 – 5,000 / mo", wa: "My monthly budget is AED 3,500–5,000. I'm looking for a studio or villa room." },
  { label: "AED 5,000+ / mo", wa: "My monthly budget is AED 5,000+. I'm interested in a studio or full apartment." },
];

const DUBAI_AREAS = [
  "Al Barsha", "Al Furjan", "Al Quoz", "Al Satwa", "Bur Dubai",
  "Business Bay", "Deira", "DIFC", "Discovery Gardens", "Downtown Dubai",
  "Dubai Marina", "Dubai Silicon Oasis", "International City",
  "Jumeirah", "Jumeirah Lake Towers (JLT)", "Jumeirah Village Circle (JVC)",
  "Karama", "Mirdif", "Motor City", "Palm Jumeirah", "Sports City",
  "Studio City", "Tecom / Barsha Heights", "The Greens", "Other",
];

const COMMON_AMENITIES = [
  "WiFi", "AC", "DEWA Included", "Cleaning", "Parking", "Gym Access",
  "Pool", "Balcony", "Private Bathroom", "Shared Kitchen", "Bills Included",
  "Furnished", "Near Metro",
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function buildWAInquiry(listing: FlexibleListing | FlexListingDB, brokerRef: string): string {
  const isDB = "managerName" in listing;
  return [
    "Hello DeliWer 👋",
    `I'm interested in ${listing.title} in ${listing.area}.`,
    `Monthly Price: AED ${listing.monthlyPrice.toLocaleString()}`,
    isDB ? "" : "",
    brokerRef ? `Referred by: ${brokerRef}` : "",
  ].filter(Boolean).join("\n");
}

function buildBudgetWA(budgetMsg: string, brokerRef: string): string {
  return [
    "Hello DeliWer 👋",
    "",
    budgetMsg,
    "",
    "Please send me available options. No annual contract preferred.",
    brokerRef ? `Referred by: ${brokerRef}` : "",
  ].filter(Boolean).join("\n");
}

function openWA(number: string, text: string) {
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank");
}

// ── Budget Quiz Sheet ──────────────────────────────────────────────────────────

function BudgetQuizSheet({
  visible, onDismiss, brokerRef,
}: { visible: boolean; onDismiss: () => void; brokerRef: string }) {
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onDismiss} />
          <motion.div key="sh" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-white/10 rounded-t-3xl px-5 pt-5 pb-8 max-w-lg mx-auto">
            <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-6" />
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-white font-semibold text-base">What's your monthly budget?</p>
                <p className="text-gray-500 text-sm mt-0.5">We'll send matching options on WhatsApp.</p>
              </div>
              <button onClick={onDismiss} data-testid="button-quiz-dismiss"
                className="text-gray-600 hover:text-gray-400 transition-colors p-1 -mr-1 mt-0.5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {BUDGET_OPTIONS.map((opt) => (
                <button key={opt.label} onClick={() => pick(opt)}
                  data-testid={`button-budget-${opt.label.replace(/\s+/g, "-")}`}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-white/8 hover:border-white/20 hover:bg-white/5 text-left transition-colors group">
                  <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{opt.label}</span>
                  <MessageCircle className="w-4 h-4 text-gray-600 group-hover:text-[#25D366] transition-colors shrink-0" />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-700 mt-4">Opens WhatsApp · No forms · No commitment</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Shared card image placeholder per type ─────────────────────────────────────

const TYPE_FALLBACK_IMAGES: Record<string, string> = {
  "villa-share": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  room: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=800&q=80",
  studio: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  partition: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
  bedspace: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
};

// ── Static Listing Card ────────────────────────────────────────────────────────

function StaticListingCard({ listing, brokerRef }: { listing: FlexibleListing; brokerRef: string }) {
  const [imgErr, setImgErr] = useState(false);

  function inquire() {
    logEvent({ ref: brokerRef || undefined, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "whatsapp_click" });
    openWA(listing.whatsappNumber, buildWAInquiry(listing, brokerRef));
  }

  const imgSrc = imgErr ? TYPE_FALLBACK_IMAGES[listing.type] : listing.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900/60 border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-white/16 transition-colors group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-800 shrink-0">
        <img
          src={imgSrc}
          alt={listing.title}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-[10px] font-semibold text-white bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-1">
            {PROPERTY_TYPE_LABELS[listing.type]}
          </span>
          {listing.badge && (
            <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
              {listing.badge}
            </span>
          )}
        </div>
        {listing.status === "limited" && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-semibold text-red-300 bg-red-500/20 border border-red-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
              Last rooms
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-lg leading-none drop-shadow-lg">
            AED {listing.monthlyPrice.toLocaleString()}
            <span className="text-gray-300 text-xs font-normal ml-1">/mo</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{listing.area} · {listing.community}</p>
          <h3 className="text-white font-semibold text-sm leading-snug">{listing.title}</h3>
          {listing.highlight && (
            <p className="text-emerald-400 text-xs mt-1">{listing.highlight}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.slice(0, 4).map((a) => (
            <span key={a} className="text-[11px] text-gray-500 bg-white/5 rounded-md px-2 py-0.5">{a}</span>
          ))}
          {listing.amenities.length > 4 && (
            <span className="text-[11px] text-gray-600 px-1">+{listing.amenities.length - 4}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            {listing.billsIncluded && (
              <span className="text-[10px] text-teal-400 font-medium bg-teal-500/10 rounded-md px-2 py-0.5">Bills incl.</span>
            )}
            <span className="text-[11px] text-gray-600">From {listing.availableFrom}</span>
          </div>
          <button
            onClick={inquire}
            data-testid={`button-inquire-${listing.id}`}
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Inquire
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── DB Listing Card ────────────────────────────────────────────────────────────

function DBListingCard({ listing, brokerRef }: { listing: FlexListingDB; brokerRef: string }) {
  const [imgErr, setImgErr] = useState(false);

  function inquire() {
    openWA(WA_NUMBER, buildWAInquiry(listing, brokerRef));
  }

  const typeLabel = PROPERTY_TYPE_LABELS[listing.type as PropertyType] || listing.type;
  const fallbackImg = TYPE_FALLBACK_IMAGES[listing.type] || TYPE_FALLBACK_IMAGES["room"];
  const imgSrc = imgErr || !("image" in listing && (listing as any).image)
    ? fallbackImg
    : (listing as any).image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-500/35 transition-colors group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-800 shrink-0">
        <img
          src={imgSrc}
          alt={listing.title}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-[10px] font-semibold text-white bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-1">
            {typeLabel}
          </span>
          <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
            New listing
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-lg leading-none drop-shadow-lg">
            AED {listing.monthlyPrice.toLocaleString()}
            <span className="text-gray-300 text-xs font-normal ml-1">/mo</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{listing.area}{listing.community ? ` · ${listing.community}` : ""}</p>
          <h3 className="text-white font-semibold text-sm leading-snug">{listing.title}</h3>
        </div>

        {listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.amenities.slice(0, 4).map((a) => (
              <span key={a} className="text-[11px] text-gray-500 bg-white/5 rounded-md px-2 py-0.5">{a}</span>
            ))}
            {listing.amenities.length > 4 && (
              <span className="text-[11px] text-gray-600 px-1">+{listing.amenities.length - 4}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            {listing.billsIncluded && (
              <span className="text-[10px] text-teal-400 font-medium bg-teal-500/10 rounded-md px-2 py-0.5">Bills incl.</span>
            )}
            <span className="text-[11px] text-gray-600">From {listing.availableFrom}</span>
          </div>
          <button
            onClick={inquire}
            data-testid={`button-inquire-db-${listing.id}`}
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Inquire
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Host Submission Form ───────────────────────────────────────────────────────

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

  const [form, setForm] = useState({
    title: "",
    area: "",
    type: "room" as PropertyType,
    monthlyPrice: "",
    billsIncluded: false,
    availableFrom: "Immediate",
    managerName: "",
    managerPhone: "",
    notes: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toggleAmenity(a: string) {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const price = parseInt(form.monthlyPrice.replace(/\D/g, ""), 10);
      if (!form.title || !form.area || !form.managerName || !form.managerPhone || isNaN(price)) {
        throw new Error("Please fill in all required fields.");
      }
      return apiRequest("POST", "/api/flex-listings", {
        title: form.title,
        area: form.area,
        type: form.type,
        monthlyPrice: price,
        billsIncluded: form.billsIncluded,
        availableFrom: form.availableFrom || "Immediate",
        managerName: form.managerName,
        managerPhone: form.managerPhone,
        notes: form.notes || null,
        amenities: selectedAmenities,
        brokerRef: brokerRef || null,
        status: "pending",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/flex-listings"] });
      qc.invalidateQueries({ queryKey: ["/api/flex-listings/stats"] });
      toast({ title: "Listing submitted!", description: "We'll review and activate it within 24 hours." });
      onSuccess();
      // Also open WhatsApp so they can follow up
      openWA(WA_NUMBER, `Hello DeliWer 👋\n\nI just submitted a flex listing:\n${form.title} in ${form.area} — AED ${form.monthlyPrice}/month.\n\nPlease confirm receipt and activate it.`);
    },
    onError: (err: Error) => {
      toast({ title: "Couldn't submit", description: err.message, variant: "destructive" });
    },
  });

  const inputCls = "w-full bg-slate-950/60 border border-white/10 focus:border-white/25 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-700 outline-none transition-colors";
  const labelCls = "text-xs text-gray-500 font-medium mb-1.5 block";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
      className="bg-slate-900/50 border border-white/8 rounded-3xl p-6 md:p-8 space-y-6">
      <div>
        <p className="text-white font-semibold text-base">List your space</p>
        <p className="text-gray-500 text-sm mt-0.5">We'll review and match tenants to you — within 24 hours.</p>
      </div>

      {/* Title */}
      <div>
        <label className={labelCls}>Listing title *</label>
        <input value={form.title} onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Private Room in 3BR Villa — Al Barsha"
          className={inputCls} data-testid="input-listing-title" />
      </div>

      {/* Area */}
      <div>
        <label className={labelCls}>Area / Neighbourhood *</label>
        <select value={form.area} onChange={(e) => set("area", e.target.value)}
          className={inputCls + " appearance-none"} data-testid="select-listing-area">
          <option value="">Select area…</option>
          {DUBAI_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className={labelCls}>Room type *</label>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][]).map(([k, v]) => (
            <button key={k} type="button" onClick={() => set("type", k)}
              data-testid={`type-pill-${k}`}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm border transition-colors ${
                form.type === k
                  ? "bg-white text-slate-950 border-white font-semibold"
                  : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}>
              {TYPE_ICONS[k]} {v}
            </button>
          ))}
        </div>
      </div>

      {/* Price + bills */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Monthly price (AED) *</label>
          <input value={form.monthlyPrice} onChange={(e) => set("monthlyPrice", e.target.value)}
            placeholder="e.g. 2500" type="number" min="0"
            className={inputCls} data-testid="input-listing-price" />
        </div>
        <div>
          <label className={labelCls}>Available from</label>
          <input value={form.availableFrom} onChange={(e) => set("availableFrom", e.target.value)}
            placeholder="Immediate / 1 Aug / …"
            className={inputCls} data-testid="input-listing-available" />
        </div>
      </div>

      {/* Bills toggle */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set("billsIncluded", !form.billsIncluded)}
          data-testid="toggle-bills-included"
          className={`w-10 h-6 rounded-full border transition-colors relative shrink-0 ${
            form.billsIncluded ? "bg-emerald-500 border-emerald-500" : "bg-white/5 border-white/15"
          }`}>
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.billsIncluded ? "translate-x-4" : ""}`} />
        </button>
        <span className="text-sm text-gray-400">DEWA / utilities included in price</span>
      </div>

      {/* Amenities */}
      <div>
        <label className={labelCls}>Amenities (tap to select)</label>
        <div className="flex flex-wrap gap-2">
          {COMMON_AMENITIES.map((a) => (
            <button key={a} type="button" onClick={() => toggleAmenity(a)}
              data-testid={`amenity-${a.replace(/\s+/g, "-")}`}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                selectedAmenities.includes(a)
                  ? "bg-white/10 border-white/25 text-white"
                  : "border-white/8 text-gray-600 hover:border-white/15 hover:text-gray-400"
              }`}>
              {selectedAmenities.includes(a) && <Check className="w-3 h-3 shrink-0" />}
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Manager info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Your name *</label>
          <input value={form.managerName} onChange={(e) => set("managerName", e.target.value)}
            placeholder="Ahmed Al Rashid" className={inputCls} data-testid="input-manager-name" />
        </div>
        <div>
          <label className={labelCls}>WhatsApp number *</label>
          <input value={form.managerPhone} onChange={(e) => set("managerPhone", e.target.value)}
            placeholder="+971 50 xxx xxxx" className={inputCls} data-testid="input-manager-phone" />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelCls}>Additional notes (optional)</label>
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)}
          placeholder="Gender preference, min stay, access details…"
          rows={3} className={inputCls + " resize-none"} data-testid="textarea-notes" />
      </div>

      {/* Submit */}
      <button onClick={() => mutation.mutate()} disabled={mutation.isPending}
        data-testid="button-submit-listing"
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-slate-950 font-semibold py-3.5 rounded-2xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        {mutation.isPending ? "Submitting…" : "Submit listing"}
        {!mutation.isPending && <ChevronRight className="w-4 h-4" />}
      </button>

      <p className="text-center text-xs text-gray-700">
        We'll review within 24 h · No fee to list · Earn faster turnover
      </p>
    </motion.div>
  );
}

// ── Broker Panel ───────────────────────────────────────────────────────────────

function BrokerPanel({ staticCount }: { staticCount: number }) {
  const { data } = useQuery<{ active: number; filled: number; total: number }>({
    queryKey: ["/api/flex-listings/stats"],
    staleTime: 60_000,
  });

  const liveActive = (data?.active ?? 0) + staticCount;
  const filledCount = data?.filled ?? 0;

  return (
    <section className="py-16 px-4 border-t border-white/5">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-widest">
            Broker Availability Panel
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Stay connected to the inventory
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            Flex rentals move fast — monthly, no guarantees. Share your link
            actively to maintain a reliable income stream from every placement.
          </p>
        </div>

        {/* Live count bar */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-5 text-center space-y-1">
            <p className="text-3xl font-bold text-white">{liveActive}</p>
            <p className="text-xs text-gray-500">Active listings right now</p>
          </div>
          <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-5 text-center space-y-1">
            <p className="text-3xl font-bold text-emerald-400">AED 150–800</p>
            <p className="text-xs text-gray-500">Per confirmed placement</p>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-gray-600 mb-3 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {filledCount > 0
              ? `${filledCount} room${filledCount > 1 ? "s" : ""} filled this period — keep sharing to stay in the loop`
              : "Share your link now — rooms move within days of listing"}
          </p>
          <ReferralLinkBar
            label="Your Flex Living Referral Link"
            compact
          />
        </div>

        <p className="text-center text-xs text-gray-700">
          No exclusivity · Earn on every confirmed move-in · 30-day attribution window
        </p>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function FlexibleRentalsPage() {
  const [mode, setMode] = useState<Mode>("find");
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
  const [quizVisible, setQuizVisible] = useState(false);
  const [hostSuccess, setHostSuccess] = useState(false);

  const brokerRef = useMemo(() => {
    if (typeof window === "undefined") return "";
    const p = new URLSearchParams(window.location.search);
    return p.get("ref") || p.get("broker") || p.get("partner") || localStorage.getItem("deliwer_ref") || "";
  }, []);

  // Auto quiz after 8 s (only in find mode, once per session)
  useEffect(() => {
    if (mode !== "find") return;
    if (sessionStorage.getItem("flex_quiz_shown")) return;
    const t = setTimeout(() => {
      setQuizVisible(true);
      sessionStorage.setItem("flex_quiz_shown", "1");
    }, 8000);
    return () => clearTimeout(t);
  }, [mode]);

  useEffect(() => {
    if (brokerRef) logEvent({ ref: brokerRef, page: "/flexible-rentals", timestamp: new Date().toISOString(), action: "page_visit" });
  }, [brokerRef]);

  // DB listings
  const { data: dbData } = useQuery<{ listings: FlexListingDB[] }>({
    queryKey: ["/api/flex-listings"],
    staleTime: 30_000,
  });
  const dbListings = useMemo(() => (dbData?.listings ?? []).filter((l) => l.status === "active"), [dbData]);

  // Static listings filtered
  const staticFiltered = useMemo(() =>
    selectedType === "all" ? FLEXIBLE_LISTINGS : FLEXIBLE_LISTINGS.filter((l) => l.type === selectedType),
    [selectedType]
  );
  const dbFiltered = useMemo(() =>
    selectedType === "all" ? dbListings : dbListings.filter((l) => l.type === selectedType),
    [dbListings, selectedType]
  );

  function openQuiz() { setQuizVisible(true); }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Flex Living Dubai | Rooms, Villas & Studios | No Annual Contract | DeliWer"
        description="Find flexible monthly accommodation in Dubai — rooms, shared villas, studios, bed spaces. No annual contract. Move in this week via WhatsApp."
      />
      <Navigation />

      <BudgetQuizSheet visible={quizVisible} onDismiss={() => setQuizVisible(false)} brokerRef={brokerRef} />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80"
            alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
          <p className="text-emerald-400 text-sm font-medium tracking-wide">Flex Living · Dubai</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            A place to stay.<br />
            <span className="text-gray-400 font-normal">No annual contract required.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            Rooms, shared villas, studios and bed spaces — from AED 550/month.
            Month-to-month. Move in this week.
          </p>
        </div>
      </section>

      {/* ── DUAL MODE TOGGLE ── */}
      <section className="px-4 pb-10">
        <div className="max-w-xl mx-auto">
          <div className="flex gap-2 bg-slate-900/60 border border-white/8 rounded-2xl p-1.5">
            <button
              onClick={() => { setMode("find"); setHostSuccess(false); }}
              data-testid="mode-find"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
                mode === "find" ? "bg-white text-slate-950" : "text-gray-500 hover:text-gray-300"
              }`}>
              <MessageCircle className="w-4 h-4" />
              I need a place
            </button>
            <button
              onClick={() => { setMode("list"); setQuizVisible(false); }}
              data-testid="mode-list"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
                mode === "list" ? "bg-white text-slate-950" : "text-gray-500 hover:text-gray-300"
              }`}>
              <Key className="w-4 h-4" />
              I have a space
            </button>
          </div>
        </div>
      </section>

      {/* ── FIND MODE: how it works + quiz CTA ── */}
      <AnimatePresence mode="wait">
        {mode === "find" && (
          <motion.div key="find-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="pb-12 px-4">
              <div className="max-w-3xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {[
                    { n: "1", title: "Tell us your budget", desc: "WhatsApp us your budget, type, and preferred area. Takes 30 seconds." },
                    { n: "2", title: "We send you options", desc: "Within 2 hours we share 2–3 matching places with photos and prices." },
                    { n: "3", title: "Move in", desc: "Confirm, pay first month, and move in. No Ejari, no cheques, no agency fees." },
                  ].map((s) => (
                    <div key={s.n} className="space-y-3">
                      <span className="text-3xl font-bold text-slate-800">{s.n}</span>
                      <h3 className="text-white font-semibold">{s.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button onClick={openQuiz} data-testid="button-find-place-wa"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Find my place on WhatsApp
                  </button>
                  <p className="text-xs text-gray-600 mt-3">Response within 2 hours · No upfront commitment</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── LIST MODE: host form ── */}
        {mode === "list" && (
          <motion.div key="list-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="pb-12 px-4">
              <div className="max-w-2xl mx-auto">
                {hostSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-950/40 border border-emerald-500/25 rounded-3xl p-10 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-white font-semibold text-lg">Listing submitted!</p>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                      We'll review your listing and activate it within 24 hours.
                      WhatsApp is open — message us to speed things up.
                    </p>
                    <button onClick={() => { setHostSuccess(false); setMode("find"); }}
                      data-testid="button-submit-another"
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline">
                      Submit another listing
                    </button>
                  </motion.div>
                ) : (
                  <HostForm brokerRef={brokerRef} onSuccess={() => setHostSuccess(true)} />
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LISTINGS ── */}
      <section id="listings" className="py-10 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-7">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-gray-500 text-sm font-medium">
              {dbListings.length + FLEXIBLE_LISTINGS.length} listings · updated live
            </p>
            <div className="flex flex-wrap gap-2">
              {TYPE_PILLS.map((pill) => (
                <button key={pill.value} onClick={() => setSelectedType(pill.value)}
                  data-testid={`filter-${pill.value}`}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    selectedType === pill.value
                      ? "bg-white text-slate-950 border-white"
                      : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}>
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* DB listings first — highlighted as "New" */}
          {dbFiltered.length > 0 && (
            <div>
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-4">
                Recently listed by managers
              </p>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {dbFiltered.map((l) => (
                  <DBListingCard key={l.id} listing={l} brokerRef={brokerRef} />
                ))}
              </div>
            </div>
          )}

          {/* Static catalogue */}
          <div>
            {dbFiltered.length > 0 && (
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-widest mb-4">
                DeliWer catalogue
              </p>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {staticFiltered.map((l) => (
                <StaticListingCard key={l.id} listing={l} brokerRef={brokerRef} />
              ))}
            </div>
          </div>

          {staticFiltered.length === 0 && dbFiltered.length === 0 && (
            <p className="text-center text-gray-600 py-16">No listings in this category right now.</p>
          )}
        </div>
      </section>

      {/* ── BROKER PANEL ── */}
      <BrokerPanel staticCount={FLEXIBLE_LISTINGS.length} />

      {/* ── BOTTOM CTA (find mode only) ── */}
      {mode === "find" && (
        <section className="py-16 px-4">
          <div className="max-w-xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-semibold text-white">Not sure what you need?</h2>
            <p className="text-gray-500 leading-relaxed">
              Tell us your budget and we'll find the right fit — no forms, no long process.
            </p>
            <button onClick={openQuiz} data-testid="button-bottom-quiz"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              What's your budget?
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
