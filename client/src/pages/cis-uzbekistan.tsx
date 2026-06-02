import CisCountryPage, { CountryPageConfig } from "./cis-country-page";
import { Plane, Package, Shield, Zap, Globe, TrendingUp } from "lucide-react";

const config: CountryPageConfig = {
  country: "Uzbekistan",
  flag: "🇺🇿",
  capital: "Tashkent",
  airport: "Tashkent International (Islam Karimov)",
  airportCode: "TAS",
  slug: "cis-uzbekistan",
  currency: "UZS",
  region: "Central Asia · CIS",
  transitTime: "36–72 hours",
  tagline: "Central Asia's Fastest-Growing Electronics Import Market",
  heroDesc: "Uzbekistan's expanding middle class and liberalising import environment are driving rapid growth in demand for refurbished iPhones. Source Grade A/B lots from Dubai directly to Tashkent via ChainTrack's verified supplier network and DAFZA escrow.",
  stats: [
    { value: "35M+", label: "Population — fastest-growing Central Asian economy", color: "text-sky-400" },
    { value: "Rising", label: "Import liberalisation easing electronics duties 2023–2025", color: "text-emerald-400" },
    { value: "TAS", label: "Tashkent Islam Karimov — direct Dubai air cargo gateway", color: "text-violet-400" },
    { value: "36h", label: "Express Dubai DXB → Tashkent TAS air transit", color: "text-amber-400" },
  ],
  highlights: [
    { icon: TrendingUp, title: "Fastest-Growing CIS Economy", desc: "Uzbekistan's GDP grew 5.7% in 2023 (World Bank). Rising middle-class purchasing power is accelerating demand for premium refurbished devices." },
    { icon: Globe, title: "Import Liberalisation", desc: "Uzbekistan has progressively eased electronics import duties and simplified customs procedures since 2022, opening the market to legal wholesale imports via Dubai." },
    { icon: Plane, title: "Dubai–Tashkent Air Corridor", desc: "Direct air freight from Dubai DXB to Tashkent TAS averages 36–72 hours. CPEC and INSTC road-air combinations are available for larger shipments." },
    { icon: Package, title: "Mixed-SKU Lot Flexibility", desc: "ChainTrack supports XLSX bulk requirement uploads for Uzbekistan buyers — source multiple iPhone models and grades in a single auction cycle." },
    { icon: Shield, title: "Fully Documented Export", desc: "DAFZA-issued commercial invoice, certificate of origin, and packing list support Uzbekistan customs clearance and EAEU re-export procedures." },
    { icon: Zap, title: "Reseller & Broker Partnerships", desc: "Tashkent-based resellers can join ChainTrack's broker programme. Commission-based with no upfront capital. WhatsApp onboarding available." },
  ],
  faqs: [
    {
      question: "Can I legally import refurbished iPhones from Dubai to Uzbekistan?",
      answer: "Yes. Uzbekistan allows the legal import of used and refurbished electronics, and import procedures have been progressively simplified since 2022. Devices must be accompanied by a commercial invoice, certificate of conformity, and packing list. DAFZA-issued documentation from ChainTrack meets Uzbekistan customs requirements. Always verify current duty rates with a licensed Uzbek customs broker, as regulations evolve.",
    },
    {
      question: "How long does air cargo take from Dubai to Tashkent?",
      answer: "Express air freight from Dubai DXB to Tashkent TAS (Islam Karimov International) averages 36–72 hours door-to-airport. Charter cargo options are available for large or urgent shipments. Combined air-road routing via Azerbaijan or Kazakhstan is also available for certain shipment sizes.",
    },
    {
      question: "What is the minimum order for Uzbekistan buyers on ChainTrack?",
      answer: "Reverse auction lots start at 50 units. Fixed-price wholesale lots from the CIS Electronics programme start at 25 units. For pallet or container loads (500+ units), contact the ChainTrack team directly via WhatsApp at +971 52 390 6019 for dedicated coordination.",
    },
    {
      question: "Which iPhones are most in demand in Uzbekistan?",
      answer: "iPhone 13, iPhone 12 Pro Max, and iPhone 14 are the highest-demand refurbished models in Uzbekistan. Grade A devices in the UZS 3,500,000–5,500,000 range (≈ USD 280–440) sell fastest. Tashkent's growing tech-savvy youth demographic drives strong sustained demand.",
    },
    {
      question: "How do Uzbekistan buyers join ChainTrack?",
      answer: "Message the ChainTrack team on WhatsApp at +971 52 390 6019 or join the CIS Buyers Community at https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG. Submit your first lot requirement through the form at deliwer.com/cis-electronics. The Telegram channel at https://t.me/chaintracklogistics provides live auction alerts.",
    },
  ],
  seoTitle: "Buy Refurbished iPhones from Dubai to Uzbekistan | ChainTrack by DeliWer",
  seoDesc: "Source wholesale refurbished iPhones from Dubai to Tashkent, Uzbekistan. 36–72h air cargo to TAS, DAFZA escrow, Grade A/B CPO lots. ChainTrack reverse auction — minimum 25 units.",
  seoKeywords: "refurbished iPhone Uzbekistan, Dubai to Tashkent electronics, wholesale iPhone Tashkent, used iPhone Uzbekistan import, ChainTrack Uzbekistan, TAS air cargo iPhone, DAFZA Uzbekistan, iPhone bulk Tashkent, Grade A iPhone Uzbekistan, CIS electronics Tashkent",
  canonical: "https://www.deliwer.com/cis-uzbekistan",
};

export default function CisUzbekistanPage() {
  return <CisCountryPage config={config} />;
}
