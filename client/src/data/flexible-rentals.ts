export type PropertyType = "villa-share" | "partition" | "room" | "bedspace" | "studio";
export type AvailStatus = "available" | "limited" | "enquire";

export interface ServiceTag {
  label: string;
  color: string;
}

export interface FlexibleListing {
  id: string;
  title: string;
  area: string;
  community: string;
  type: PropertyType;
  monthlyPrice: number;
  capacity: number;
  amenities: string[];
  services?: string[];
  brokerRef?: string;
  whatsappNumber: string;
  availableFrom: string;
  status: AvailStatus;
  badge?: string;
  beds?: number;
  baths?: number;
  highlight?: string;
}

export const FLEXIBLE_LISTINGS: FlexibleListing[] = [
  {
    id: "FR-101",
    title: "Private Room in 4BR Luxury Villa",
    area: "Dubai Marina",
    community: "Marina Walk",
    type: "villa-share",
    monthlyPrice: 3200,
    capacity: 1,
    amenities: ["Private AC", "En-suite Bathroom", "Pool Access", "Gym", "Parking", "WiFi", "24hr Security"],
    services: ["Cleaning", "Maintenance"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    badge: "Premium",
    beds: 1,
    baths: 1,
    highlight: "Pool & gym included",
  },
  {
    id: "FR-102",
    title: "Furnished Partition Room — All Bills Included",
    area: "Al Nahda",
    community: "Al Nahda 2",
    type: "partition",
    monthlyPrice: 1100,
    capacity: 1,
    amenities: ["AC", "Shared Kitchen", "WiFi", "DEWA Included", "Security", "Laundry"],
    services: ["Partition Fitting", "WiFi Setup", "Cleaning"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    beds: 1,
    baths: 1,
    highlight: "All bills included",
  },
  {
    id: "FR-103",
    title: "Executive Bed Space in Modern 2BR Flat",
    area: "International City",
    community: "Spain Cluster",
    type: "bedspace",
    monthlyPrice: 550,
    capacity: 1,
    amenities: ["AC", "Shared Kitchen", "WiFi", "Locker", "DEWA Included", "Metro Nearby"],
    whatsappNumber: "971523946311",
    availableFrom: "15 July",
    status: "limited",
    badge: "Value Pick",
    highlight: "Lowest cost per night",
  },
  {
    id: "FR-104",
    title: "Shared Villa — Private Bedroom + Balcony",
    area: "Jumeirah Village Circle",
    community: "JVC District 16",
    type: "villa-share",
    monthlyPrice: 2800,
    capacity: 1,
    amenities: ["Private AC", "Shared Pool", "Garden View", "Parking", "WiFi", "Maid Weekly"],
    services: ["Cleaning", "Furnishing", "Maintenance"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    beds: 1,
    baths: 1,
    highlight: "Garden & pool access",
  },
  {
    id: "FR-105",
    title: "Furnished Studio — No Long-Term Contract",
    area: "Business Bay",
    community: "Executive Towers",
    type: "studio",
    monthlyPrice: 4500,
    capacity: 2,
    amenities: ["Full Kitchen", "Private Bathroom", "Pool & Gym", "Concierge", "WiFi", "Parking", "Balcony"],
    services: ["Furnishing", "WiFi Setup", "Cleaning"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    badge: "Flexible Lease",
    beds: 1,
    baths: 1,
    highlight: "Monthly, no annual lock-in",
  },
  {
    id: "FR-106",
    title: "Workforce Accommodation Block — 4 Beds",
    area: "Al Quoz",
    community: "Al Quoz Industrial 3",
    type: "room",
    monthlyPrice: 600,
    capacity: 4,
    amenities: ["AC", "Shared Kitchen", "Laundry", "Security", "WiFi", "Parking"],
    services: ["Maintenance", "AC Servicing", "Government Documentation Support"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    badge: "Corporate Block",
    beds: 4,
    baths: 2,
    highlight: "Ideal for company housing",
  },
  {
    id: "FR-107",
    title: "Partition Room — Metro Walkable",
    area: "Discovery Gardens",
    community: "Zen Cluster",
    type: "partition",
    monthlyPrice: 950,
    capacity: 1,
    amenities: ["AC", "Shared Kitchen", "WiFi", "DEWA Split", "Metro Access", "Supermarket Nearby"],
    services: ["Partition Fitting", "Cleaning"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    highlight: "5-min walk to metro",
  },
  {
    id: "FR-108",
    title: "Private Room — Short-Stay Welcome",
    area: "Deira",
    community: "Al Rigga",
    type: "room",
    monthlyPrice: 1400,
    capacity: 1,
    amenities: ["AC", "En-suite Bathroom", "Shared Living Area", "WiFi", "Metro 3 min", "24hr Security"],
    services: ["Cleaning", "Furnishing"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    badge: "Short Stay OK",
    beds: 1,
    baths: 1,
    highlight: "Min 1 month, no annual needed",
  },
  {
    id: "FR-109",
    title: "Shared 3BR Apartment — 1 Room Available",
    area: "Jumeirah Lake Towers",
    community: "Cluster Y",
    type: "villa-share",
    monthlyPrice: 2600,
    capacity: 1,
    amenities: ["Private AC", "En-suite Bathroom", "Lake View", "Gym", "Parking", "WiFi"],
    services: ["Cleaning", "Maintenance"],
    whatsappNumber: "971523946311",
    availableFrom: "1 August",
    status: "enquire",
    badge: "Lake View",
    beds: 1,
    baths: 1,
    highlight: "Lake view from bedroom",
  },
  {
    id: "FR-110",
    title: "Co-Living Studio — Flexible Monthly Stay",
    area: "Al Barsha",
    community: "Al Barsha 1",
    type: "studio",
    monthlyPrice: 3800,
    capacity: 1,
    amenities: ["Full Kitchen", "Private Bathroom", "WiFi", "Housekeeping", "Netflix", "Gym Access"],
    services: ["Furnishing", "Cleaning", "WiFi Setup"],
    whatsappNumber: "971523946311",
    availableFrom: "Immediate",
    status: "available",
    badge: "All-Inclusive",
    beds: 1,
    baths: 1,
    highlight: "Netflix & housekeeping included",
  },
];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  "villa-share": "Shared Villa",
  partition: "Partition Room",
  room: "Private Room",
  bedspace: "Bed Space",
  studio: "Studio",
};

export const TYPE_COLORS: Record<PropertyType, { badge: string; dot: string }> = {
  "villa-share": { badge: "text-amber-400 bg-amber-500/10 border-amber-500/25", dot: "bg-amber-500" },
  partition: { badge: "text-blue-400 bg-blue-500/10 border-blue-500/25", dot: "bg-blue-500" },
  room: { badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", dot: "bg-emerald-500" },
  bedspace: { badge: "text-violet-400 bg-violet-500/10 border-violet-500/25", dot: "bg-violet-500" },
  studio: { badge: "text-rose-400 bg-rose-500/10 border-rose-500/25", dot: "bg-rose-500" },
};

export const STATUS_CONFIG: Record<AvailStatus, { label: string; color: string }> = {
  available: { label: "Available Now", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
  limited: { label: "Last Rooms", color: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
  enquire: { label: "Enquire", color: "text-blue-400 bg-blue-500/10 border-blue-500/25" },
};

export const SERVICE_TAG_COLORS: Record<string, string> = {
  "Partition Fitting": "text-slate-300 bg-slate-700/50 border-slate-600/30",
  Maintenance: "text-slate-300 bg-slate-700/50 border-slate-600/30",
  Furnishing: "text-slate-300 bg-slate-700/50 border-slate-600/30",
  "AC Servicing": "text-slate-300 bg-slate-700/50 border-slate-600/30",
  "WiFi Setup": "text-slate-300 bg-slate-700/50 border-slate-600/30",
  Cleaning: "text-slate-300 bg-slate-700/50 border-slate-600/30",
  "Government Documentation Support": "text-slate-300 bg-slate-700/50 border-slate-600/30",
};
