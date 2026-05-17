import { Router } from "express";

const router = Router();

export const CORRIDOR_INTEL: CorridorItem[] = [
  {
    id: "ci-001",
    category: "geopolitical",
    urgency: "critical",
    headline: "Strait of Hormuz Transit Insurance Surcharges Hit 340% Premium",
    summary: "Lloyd's and Marsh have raised war-risk surcharges on Hormuz-transiting vessels to 340% above standard rates following increased drone activity near the Omani coast. Insurers are advising re-routing via Oman's eastern coast or through Gawadar.",
    source: "Lloyd's Market Association",
    region: "Strait of Hormuz",
    tsLabel: "2 hours ago",
    tsOffset: 2,
    icon: "alert",
    link: null,
  },
  {
    id: "ci-002",
    category: "infrastructure",
    urgency: "update",
    headline: "Gawadar Port Berth 4 Expansion Completes Phase II — 100,000 DWT Capacity Confirmed",
    summary: "Gawadar Port Authority has confirmed Phase II of Berth 4 expansion is operational, raising the port's maximum vessel capacity to 100,000 DWT. This makes Gawadar the deepest-water port on the Arabian Sea with unobstructed Indian Ocean access.",
    source: "Gawadar Port Authority",
    region: "Gawadar, Pakistan",
    tsLabel: "6 hours ago",
    tsOffset: 6,
    icon: "anchor",
    link: null,
  },
  {
    id: "ci-003",
    category: "trade",
    urgency: "update",
    headline: "CPEC Free Zone Grants Zero-Duty Status to UAE Re-Export Cargo",
    summary: "Pakistan's Special Economic Zones Authority has extended zero-duty import treatment to all UAE-origin re-export cargo entering via Gawadar's CPEC Free Zone, effective immediately. The waiver covers electronics, machinery, and FMCG categories.",
    source: "SEZA Pakistan",
    region: "CPEC Free Zone, Gawadar",
    tsLabel: "14 hours ago",
    tsOffset: 14,
    icon: "trade",
    link: null,
  },
  {
    id: "ci-004",
    category: "rates",
    urgency: "watch",
    headline: "Dubai–Karachi Airfreight Spot Rate Falls 18% as Charter Capacity Opens",
    summary: "Spot airfreight rates on the Dubai-to-Karachi lane have declined 18% week-on-week as three additional B747F charter operators entered the DWC-GWD corridor. Analysts attribute the drop to IATA's newly published 'Corridors of Strategic Importance' designation for the Dubai–Gawadar arc.",
    source: "Xeneta Airfreight Index",
    region: "Dubai ↔ Gawadar",
    tsLabel: "Yesterday",
    tsOffset: 22,
    icon: "rates",
    link: null,
  },
  {
    id: "ci-005",
    category: "infrastructure",
    urgency: "update",
    headline: "Dubai South DWC Designates 120,000m² Bonded Zone for Gawadar Corridor Consolidation",
    summary: "Dubai South has formally designated a 120,000 square metre bonded consolidation zone at Al Maktoum International Airport specifically for cargo aggregating onto Gawadar-bound charter flights. The zone features customs pre-clearance, reefer storage, and direct apron access.",
    source: "Dubai South Authority",
    region: "Dubai World Central, UAE",
    tsLabel: "Yesterday",
    tsOffset: 26,
    icon: "plane",
    link: null,
  },
  {
    id: "ci-006",
    category: "geopolitical",
    urgency: "watch",
    headline: "INSTC Adds Gawadar as Official Western-Route Interchange Node",
    summary: "The International North–South Transport Corridor's governing body has officially added Gawadar Port as an interchange node on the corridor's western branch, connecting the port to rail networks running through Iran, Azerbaijan, and Russia's Caspian hub.",
    source: "INSTC Secretariat",
    region: "INSTC — Western Branch",
    tsLabel: "2 days ago",
    tsOffset: 48,
    icon: "route",
    link: null,
  },
  {
    id: "ci-007",
    category: "trade",
    urgency: "update",
    headline: "Chinese CPEC Investment Tranche Released: $4.2B for Gawadar Industrial Zone Phase III",
    summary: "Beijing has released a $4.2 billion CPEC investment tranche specifically for Gawadar Industrial Zone Phase III, covering a new container freight station, a logistics park, and 340MW of dedicated port power infrastructure.",
    source: "NDRC China / CPEC Authority",
    region: "Gawadar Industrial Zone",
    tsLabel: "3 days ago",
    tsOffset: 72,
    icon: "infra",
    link: null,
  },
  {
    id: "ci-008",
    category: "rates",
    urgency: "watch",
    headline: "Jebel Ali Throughput Down 31% YoY — Volumes Diverting to Oman and Pakistan",
    summary: "DP World's Q1 2026 report shows Jebel Ali container throughput declining 31% year-on-year, with port officials citing regional shipping disruptions. Independent analysis by Drewry identifies Salalah, Duqm, and Gawadar as primary diversion beneficiaries.",
    source: "DP World / Drewry Shipping",
    region: "Jebel Ali, UAE",
    tsLabel: "4 days ago",
    tsOffset: 96,
    icon: "alert",
    link: null,
  },
];

export interface CorridorItem {
  id: string;
  category: "geopolitical" | "infrastructure" | "trade" | "rates";
  urgency: "critical" | "update" | "watch";
  headline: string;
  summary: string;
  source: string;
  region: string;
  tsLabel: string;
  tsOffset: number;
  icon: string;
  link: string | null;
}

export const ROUTE_STATUS = [
  { id: "dwc-gwd-air", label: "DWC → GWD Air Charter", status: "operational", note: "Charter running 3x/week" },
  { id: "uae-gwd-sea", label: "UAE → GWD Sea Feeder", status: "operational", note: "Bi-weekly vessel departures" },
  { id: "hormuz-sea",  label: "Strait of Hormuz Sea Route", status: "disrupted", note: "War-risk surcharge active" },
  { id: "cpec-rail",   label: "CPEC Rail (GWD–XIN)", status: "operational", note: "Full service, 3-day transit" },
  { id: "instc-west",  label: "INSTC Western Branch", status: "limited", note: "Iran sanctions constraints" },
  { id: "jebel-ali",   label: "Jebel Ali Container Port", status: "disrupted", note: "31% throughput decline" },
];

export const FREIGHT_RATES = [
  { lane: "Dubai → Gawadar (Air)", rate: "AED 18.40/kg", change: -18, unit: "vs last week" },
  { lane: "UAE → Gawadar (FCL)", rate: "USD 1,240/TEU", change: -6, unit: "vs last month" },
  { lane: "Gawadar → Central Asia (Rail)", rate: "USD 890/TEU", change: +4, unit: "vs last month" },
  { lane: "Dubai → Karachi (Air Spot)", rate: "AED 14.20/kg", change: -12, unit: "vs last week" },
];

// GET /api/logistics/corridor-news
router.get("/corridor-news", (_req, res) => {
  res.json({
    items: CORRIDOR_INTEL,
    routeStatus: ROUTE_STATUS,
    freightRates: FREIGHT_RATES,
    generatedAt: new Date().toISOString(),
  });
});

export default router;
