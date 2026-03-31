export interface AreaConfig {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  highlights: string[];
  popularPropertyTypes?: string[];
}

export const PROPERTY_TYPES: Record<string, { label: string; beds: string; estimatedRent: string; movers: string; ejari: string; setup: string }> = {
  studio: { label: "Studio", beds: "Studio", estimatedRent: "AED 35,000–60,000/yr", movers: "AED 800–1,200", ejari: "AED 320", setup: "AED 450–700" },
  "1br": { label: "1 Bedroom", beds: "1 Bedroom", estimatedRent: "AED 55,000–95,000/yr", movers: "AED 1,000–1,800", ejari: "AED 320", setup: "AED 500–900" },
  "2br": { label: "2 Bedroom", beds: "2 Bedroom", estimatedRent: "AED 85,000–160,000/yr", movers: "AED 1,400–2,500", ejari: "AED 320", setup: "AED 700–1,200" },
};

export const TOP_AREAS_FOR_VARIANTS = [
  "jvc", "dubai-marina", "business-bay", "downtown-dubai",
  "al-nahda", "jlt", "dubai-hills", "al-barsha", "international-city", "deira",
];

export const AREAS: AreaConfig[] = [
  {
    slug: "jvc",
    name: "Jumeirah Village Circle",
    shortName: "JVC",
    description: "One of Dubai's most popular affordable communities, known for studios and 1BR apartments.",
    highlights: ["Affordable rents", "Community living", "Close to Sheikh Zayed Road", "Family-friendly"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    description: "A vibrant waterfront community with high-rise living and a buzzing social scene.",
    highlights: ["Waterfront views", "Walk to the beach", "Metro access", "Restaurants & nightlife"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    description: "A central business and residential hub adjacent to Downtown Dubai.",
    highlights: ["Canal views", "Close to DIFC", "Metro connected", "Modern towers"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    description: "Iconic address home to Burj Khalifa, Dubai Mall, and premium apartments.",
    highlights: ["Burj Khalifa views", "Walking distance to Dubai Mall", "Premium address", "Metro connected"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "al-nahda",
    name: "Al Nahda",
    description: "A budget-friendly area straddling the Dubai–Sharjah border with good transport links.",
    highlights: ["Affordable rents", "Close to Sharjah", "Large apartments", "Community feel"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "al-barsha",
    name: "Al Barsha",
    description: "A well-established residential area close to Mall of the Emirates and the metro.",
    highlights: ["Mall of the Emirates nearby", "Metro access", "Quiet residential streets", "Schools nearby"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "deira",
    name: "Deira",
    description: "Old Dubai's commercial heart with affordable rents and strong transport connections.",
    highlights: ["Affordable rents", "Metro & RTA buses", "Gold & spice souks nearby", "Historic area"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "bur-dubai",
    name: "Bur Dubai",
    description: "Historic central district blending old and new with affordable family apartments.",
    highlights: ["Central location", "Affordable rents", "Metro access", "Diverse community"],
  },
  {
    slug: "dubai-silicon-oasis",
    name: "Dubai Silicon Oasis",
    shortName: "DSO",
    description: "A tech-focused free zone community with modern apartments and self-contained amenities.",
    highlights: ["Tech free zone", "Self-contained community", "Affordable rents", "Family-friendly"],
  },
  {
    slug: "international-city",
    name: "International City",
    description: "Dubai's most affordable community known for themed clusters and budget-friendly studios.",
    highlights: ["Lowest rents in Dubai", "Themed clusters", "Dragon Mart nearby", "Large expat community"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "discovery-gardens",
    name: "Discovery Gardens",
    description: "A large, well-planned affordable community with good metro access.",
    highlights: ["Affordable rents", "Metro connected", "Landscaped gardens", "Quiet community"],
  },
  {
    slug: "jlt",
    name: "Jumeirah Lake Towers",
    shortName: "JLT",
    description: "High-rise living around man-made lakes, popular with professionals.",
    highlights: ["Lake views", "Metro connected", "Restaurant cluster", "Affordable vs Marina"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "dubai-hills",
    name: "Dubai Hills Estate",
    description: "A premium master-planned community with golf course living and family amenities.",
    highlights: ["Golf course views", "Dubai Hills Mall", "Family-friendly", "Green spaces"],
    popularPropertyTypes: ["studio", "1br", "2br"],
  },
  {
    slug: "arabian-ranches",
    name: "Arabian Ranches",
    description: "A premium villa community known for spacious homes and a resort-like lifestyle.",
    highlights: ["Villa community", "Golf & equestrian", "Top schools nearby", "Family living"],
  },
  {
    slug: "motor-city",
    name: "Motor City",
    description: "A car-themed residential community offering affordable villas and townhouses.",
    highlights: ["Affordable villas", "Green spaces", "Community retail", "Quiet streets"],
  },
  {
    slug: "sports-city",
    name: "Dubai Sports City",
    description: "A community built around sporting facilities with affordable apartments.",
    highlights: ["Sporting venues", "Affordable rents", "Cricket stadium", "Family-friendly"],
  },
  {
    slug: "meydan",
    name: "Meydan",
    description: "An upscale community near the famous Meydan Racecourse with luxury living.",
    highlights: ["Racecourse nearby", "Premium apartments", "Close to Downtown", "Prestigious address"],
  },
  {
    slug: "al-furjan",
    name: "Al Furjan",
    description: "A growing community with modern villas and townhouses near Discovery Gardens metro.",
    highlights: ["Metro connected", "Villa community", "Modern homes", "Growing area"],
  },
  {
    slug: "jbr",
    name: "Jumeirah Beach Residence",
    shortName: "JBR",
    description: "Beachfront living with the famous The Walk and an active outdoor lifestyle.",
    highlights: ["Beachfront location", "The Walk promenade", "Restaurants & retail", "Water activities"],
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    description: "Dubai's iconic palm-shaped island with luxury apartments and villas.",
    highlights: ["Iconic address", "Beachfront", "Luxury hotels nearby", "Monorail access"],
  },
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    description: "A new waterfront district rising around the historic Dubai Creek.",
    highlights: ["Creek & skyline views", "New development", "Retail & F&B", "Future Creek Tower"],
  },
  {
    slug: "damac-hills",
    name: "DAMAC Hills",
    description: "A golf-community development with apartments, villas, and townhouses.",
    highlights: ["Golf course", "Green living", "DAMAC Mall", "Family community"],
  },
  {
    slug: "damac-hills-2",
    name: "DAMAC Hills 2",
    description: "An expanding affordable community by DAMAC with outdoor amenities.",
    highlights: ["Affordable villas", "Outdoor amenities", "Growing community", "Watertown & Malibu Beach"],
  },
  {
    slug: "town-square",
    name: "Town Square Dubai",
    description: "A large self-contained community centred around a family-friendly town square.",
    highlights: ["Family-oriented", "Town Square park", "Skate park", "Affordable rents"],
  },
  {
    slug: "remraam",
    name: "Remraam",
    description: "An affordable low-rise community with a suburban feel near Al Maktoum Airport.",
    highlights: ["Affordable rents", "Low-rise living", "Community pools", "Quiet environment"],
  },
  {
    slug: "mudon",
    name: "Mudon",
    description: "A premium villa community by Dubai Properties with sports facilities.",
    highlights: ["Villa living", "Sports courts", "Green community", "Family-friendly"],
  },
  {
    slug: "al-warqa",
    name: "Al Warqa",
    description: "An established residential area with affordable villas and apartments in east Dubai.",
    highlights: ["Affordable rents", "Spacious apartments", "Quiet residential", "East Dubai location"],
  },
  {
    slug: "al-qusais",
    name: "Al Qusais",
    description: "A budget-friendly residential hub in east Dubai popular with working families.",
    highlights: ["Affordable rents", "Metro connected", "Large apartments", "Well-established area"],
  },
  {
    slug: "al-satwa",
    name: "Al Satwa",
    description: "A vibrant old Dubai neighbourhood with affordable rents and great food scenes.",
    highlights: ["Affordable rents", "Central location", "Diverse dining", "Community feel"],
  },
  {
    slug: "karama",
    name: "Karama",
    description: "A classic Dubai neighbourhood known for affordable flats and great restaurants.",
    highlights: ["Affordable rents", "Karama market", "Great food scene", "Metro access"],
  },
  {
    slug: "muhaisnah",
    name: "Muhaisnah",
    description: "An affordable residential area in east Dubai popular with families.",
    highlights: ["Very affordable rents", "Spacious apartments", "Schools nearby", "Community feel"],
  },
  {
    slug: "al-rigga",
    name: "Al Rigga",
    description: "A central Deira neighbourhood with easy access to the metro and affordable flats.",
    highlights: ["Metro access", "Affordable rents", "Central Deira", "Shopping nearby"],
  },
  {
    slug: "al-mankhool",
    name: "Al Mankhool",
    description: "A Bur Dubai residential area with mid-range apartments and good connectivity.",
    highlights: ["Central location", "Bus & metro access", "Community vibe", "Well-maintained"],
  },
  {
    slug: "al-khaleej",
    name: "Al Khaleej",
    description: "A historic Deira neighbourhood close to the creek with affordable options.",
    highlights: ["Affordable rents", "Near Deira creek", "Heritage area", "Transport links"],
  },
  {
    slug: "umm-suqeim",
    name: "Umm Suqeim",
    description: "A sought-after beachside area home to Kite Beach and Jumeirah Beach Hotel.",
    highlights: ["Kite Beach", "Prestigious address", "Low-rise villas", "Family-friendly"],
  },
  {
    slug: "al-wasl",
    name: "Al Wasl",
    description: "A prime Jumeirah residential area with villas and close access to the beach.",
    highlights: ["Prime location", "Jumeirah villas", "Close to beach", "Quiet streets"],
  },
  {
    slug: "al-safa",
    name: "Al Safa",
    description: "A quiet residential area flanking Safa Park, popular with families.",
    highlights: ["Safa Park access", "Quiet streets", "Family-friendly", "Good schools nearby"],
  },
  {
    slug: "al-quoz",
    name: "Al Quoz",
    description: "A versatile area mixing warehouses, studios, and affordable apartments.",
    highlights: ["Affordable rents", "Art & creative scene", "Central location", "Mixed-use area"],
  },
  {
    slug: "dip",
    name: "Dubai Investment Park",
    shortName: "DIP",
    description: "A mixed-use community near Al Maktoum Airport with affordable living options.",
    highlights: ["Affordable rents", "Near Expo City", "Self-contained", "Industrial free zone"],
  },
  {
    slug: "jebel-ali",
    name: "Jebel Ali",
    description: "A major port area with affordable residential communities and free zone access.",
    highlights: ["Affordable rents", "Free zone workers", "Metro connected", "Large community"],
  },
  {
    slug: "al-barari",
    name: "Al Barari",
    description: "Dubai's most lush and green luxury villa community surrounded by botanical gardens.",
    highlights: ["Ultra-luxury villas", "Botanical gardens", "Exclusive community", "Nature living"],
  },
  {
    slug: "nad-al-sheba",
    name: "Nad Al Sheba",
    description: "A fast-growing community near Meydan Racecourse with modern villas.",
    highlights: ["Modern villas", "Near Meydan", "Growing community", "Good connectivity"],
  },
  {
    slug: "liwan",
    name: "Liwan",
    description: "An affordable freehold community in Dubailand with apartments and townhouses.",
    highlights: ["Affordable rents", "Freehold area", "Dubailand location", "Family community"],
  },
  {
    slug: "the-valley",
    name: "The Valley",
    description: "Emaar's nature-inspired community with townhouses and outdoor lifestyle amenities.",
    highlights: ["Nature lifestyle", "Emaar development", "Townhouses", "Community parks"],
  },
  {
    slug: "tilal-al-ghaf",
    name: "Tilal Al Ghaf",
    description: "A premium lakeside community by Majid Al Futtaim with crystal lagoons.",
    highlights: ["Crystal lagoon", "Premium villas", "Master-planned", "Resort lifestyle"],
  },
  {
    slug: "bluewaters-island",
    name: "Bluewaters Island",
    description: "An exclusive island community home to Ain Dubai and luxury residences.",
    highlights: ["Ain Dubai views", "Island living", "Premium address", "Retail & F&B"],
  },
  {
    slug: "city-walk",
    name: "City Walk",
    description: "A stylish urban community with open-air shopping and modern apartments.",
    highlights: ["Trendy address", "Open-air mall", "Central location", "Modern design"],
  },
  {
    slug: "dubai-production-city",
    name: "Dubai Production City",
    shortName: "IMPZ",
    description: "A media free zone community with affordable apartments near Studio City.",
    highlights: ["Affordable rents", "Media free zone", "Community living", "Close to Studio City"],
  },
  {
    slug: "dubai-studio-city",
    name: "Dubai Studio City",
    description: "A creative free zone community popular with media professionals.",
    highlights: ["Media & creative hub", "Affordable options", "Free zone benefits", "Community feel"],
  },
];

export function getAreaBySlug(slug: string): AreaConfig | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function getOtherAreas(currentSlug: string, count = 10): AreaConfig[] {
  return AREAS.filter((a) => a.slug !== currentSlug).slice(0, count);
}
