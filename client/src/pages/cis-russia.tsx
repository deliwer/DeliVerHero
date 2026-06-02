import CisCountryPage, { CountryPageConfig } from "./cis-country-page";
import { Plane, Package, Shield, Zap, Globe, TrendingUp } from "lucide-react";

const config: CountryPageConfig = {
  country: "Russia",
  flag: "🇷🇺",
  capital: "Moscow",
  airport: "Sheremetyevo / Pulkovo",
  airportCode: "SVO / LED",
  slug: "cis-russia",
  currency: "RUB",
  region: "Eastern Europe / Eurasia · CIS",
  transitTime: "48–96 hours",
  tagline: "Parallel Import Channel — Dubai to Russia",
  heroDesc: "Russia's parallel import legalisation (2022) opened a major channel for refurbished iPhone imports from Dubai. ChainTrack connects Russian buyers with verified Grade A/B CPO lots from DAFZA — fully documented, escrow-protected, and air cargo-ready.",
  customNote: "Parallel import of electronics is legal in Russia since April 2022 (Decree No. 506). Dubai is a primary compliant sourcing corridor.",
  stats: [
    { value: "Legal", label: "Parallel import decree signed April 2022 — electronics included", color: "text-sky-400" },
    { value: "100M+", label: "Smartphone users in Russia — largest CIS market by volume", color: "text-emerald-400" },
    { value: "Dubai", label: "Top 3 parallel import corridor for electronics into Russia", color: "text-violet-400" },
    { value: "48–96h", label: "Dubai DXB → Moscow SVO / St. Petersburg LED air transit", color: "text-amber-400" },
  ],
  highlights: [
    { icon: Globe, title: "Parallel Import — Compliant Channel", desc: "Since April 2022 (Russian Government Decree No. 506), parallel import of electronics including iPhones is legally permitted. Dubai is one of the approved sourcing corridors." },
    { icon: TrendingUp, title: "Largest CIS Electronics Market", desc: "Russia has 100M+ smartphone users. Demand for Grade A refurbished iPhones surged after direct brand withdrawals in 2022, creating a sustained high-volume import opportunity." },
    { icon: Plane, title: "Air Cargo via SVO and LED", desc: "Express air freight from Dubai DXB to Moscow Sheremetyevo (SVO) and St. Petersburg Pulkovo (LED) averages 48–96 hours. Georgia (TBS) and Armenia (EVN) transit options also available." },
    { icon: Package, title: "DAFZA-Documented Lots", desc: "All ChainTrack lots ship with full DAFZA commercial invoices, certificates of origin, and packing lists — the documentation chain required for Russian customs compliance." },
    { icon: Shield, title: "DAFZA Escrow Protection", desc: "Funds held by DAFZA free zone authority until buyer confirms receipt and grading. Eliminates payment fraud risk on large Russian wholesale orders." },
    { icon: Zap, title: "High-Volume Container Support", desc: "Container load orders (500+ units) for Russian buyers receive dedicated freight coordination, multi-model XLSX sourcing, and direct supplier liaison." },
  ],
  faqs: [
    {
      question: "Is it legal to import iPhones from Dubai into Russia?",
      answer: "Yes. Russian Government Decree No. 506 (signed April 2022) legalised parallel imports of a broad range of electronics, including Apple products. Dubai is one of the primary compliant sourcing corridors. Devices must be accompanied by full export documentation (commercial invoice, certificate of origin, packing list) — all provided by ChainTrack via DAFZA. Always verify current regulatory requirements with a licensed Russian customs broker.",
    },
    {
      question: "How does ChainTrack source iPhones for Russia buyers?",
      answer: "Russian buyers submit a lot requirement via WhatsApp (+971 52 390 6019) or the CIS Electronics form. ChainTrack broadcasts the requirement to verified Dubai suppliers who bid in reverse. The buyer selects the winning bid, DAFZA holds payment in escrow, and the lot is inspected via live video before shipping. Air cargo to Moscow SVO or St. Petersburg LED averages 48–96 hours.",
    },
    {
      question: "Can I route Dubai electronics shipments through Georgia or Armenia to Russia?",
      answer: "Yes. For buyers who prefer transit routing, ChainTrack can coordinate Dubai–Tbilisi (TBS) or Dubai–Yerevan (EVN) cargo, with onward land transport to Russia. This route is popular for buyers managing regulatory complexity. Contact the team via WhatsApp for routing options on your specific lot.",
    },
    {
      question: "What documentation does Russia customs require for parallel-imported iPhones?",
      answer: "Russian customs requires: commercial invoice (DAFZA-issued), packing list, certificate of origin, and customs declaration. For electronics, a declaration of conformity (for certain categories) may also be required. ChainTrack provides all DAFZA export documentation. Work with a licensed Russian customs broker (таможенный брокер) for in-country clearance.",
    },
    {
      question: "What iPhone models move fastest in the Russian market?",
      answer: "iPhone 14 Pro Max, iPhone 13 Pro, iPhone 15, and iPhone 12 remain the highest-demand models in Russia's resale market. Grade A refurbished devices priced at RUB 40,000–75,000 have the best velocity. UAE-origin documented devices command a premium over unofficial grey market imports.",
    },
    {
      question: "Is there a ChainTrack community for Russian buyers?",
      answer: "Yes. Join the CIS Buyers WhatsApp Community at https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG. The Telegram channel at https://t.me/chaintracklogistics posts live auction alerts, lot updates, and corridor intelligence.",
    },
  ],
  seoTitle: "Buy iPhones Wholesale from Dubai to Russia | Parallel Import | ChainTrack",
  seoDesc: "Source Grade A/B refurbished iPhones from Dubai to Moscow and St. Petersburg via legal parallel import channel. DAFZA escrow, 48–96h air cargo, full customs documentation. ChainTrack wholesale.",
  seoKeywords: "parallel import iPhone Russia, Dubai to Moscow electronics, refurbished iPhone Russia wholesale, used iPhone Russia import, Dubai Russia parallel import, ChainTrack Russia, SVO air cargo iPhone, iPhone bulk Moscow, Grade A iPhone Russia, parallel import decree 506 iPhone Dubai",
  canonical: "https://www.deliwer.com/cis-russia",
};

export default function CisRussiaPage() {
  return <CisCountryPage config={config} />;
}
