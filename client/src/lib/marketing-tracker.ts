const GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

const GOOGLE_SHEET_JSON_URL =
  "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:json&sheet=Leads";

export function initTracker() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  const utmSource = params.get("utm_source");
  const utmCampaign = params.get("utm_campaign");

  if (ref) localStorage.setItem("dw_ref", ref);
  if (utmSource) localStorage.setItem("dw_utm_source", utmSource);
  if (utmCampaign) localStorage.setItem("dw_utm_campaign", utmCampaign);
}

export function getTracking() {
  return {
    ref: localStorage.getItem("dw_ref") || "organic",
    utmSource: localStorage.getItem("dw_utm_source") || "",
    utmCampaign: localStorage.getItem("dw_utm_campaign") || "",
  };
}

export function getReferralLink(partnerName: string) {
  const slug = partnerName.trim().toLowerCase().replace(/\s+/g, "-");
  return `https://deliwer.com/?ref=${slug}`;
}

export function buildWhatsAppURL(
  intent: string,
  ref: string,
  name?: string
) {
  const message = encodeURIComponent(
    `Hi DeliWer,\nI want help with my move.\n\nSource: ${ref}\nIntent: ${intent}${name ? `\nName: ${name}` : ""}`
  );
  return `https://wa.me/971523906019?text=${message}`;
}

export interface LeadPayload {
  name: string;
  phone: string;
  intent: string;
  ref: string;
  utm_source: string;
  utm_campaign: string;
}

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch {
    return false;
  }
}

export async function fetchSheetData(): Promise<any[]> {
  try {
    const res = await fetch(GOOGLE_SHEET_JSON_URL);
    const text = await res.text();
    const json = JSON.parse(text.replace(/^.*?\(/, "").replace(/\);?\s*$/, ""));
    const rows = json.table.rows as any[];
    return rows.map((r: any) => ({
      timestamp: r.c[0]?.v ?? "",
      name: r.c[1]?.v ?? "",
      phone: r.c[2]?.v ?? "",
      intent: r.c[3]?.v ?? "",
      source: r.c[4]?.v ?? "organic",
      utmSource: r.c[5]?.v ?? "",
      utmCampaign: r.c[6]?.v ?? "",
      status: r.c[7]?.v ?? "New",
      revenue: r.c[8]?.v ?? 0,
      partnerShare: r.c[9]?.v ?? 0,
    }));
  } catch {
    return DEMO_LEADS;
  }
}

export const DEMO_LEADS = [
  { timestamp: "2026-03-20", name: "Ahmed Hassan", phone: "+971501234567", intent: "move", source: "ali-real-estate", utmSource: "broker", utmCampaign: "movein", status: "Closed", revenue: 1200, partnerShare: 420 },
  { timestamp: "2026-03-20", name: "Sara Malik", phone: "+971502345678", intent: "renew", source: "marina-brokers", utmSource: "broker", utmCampaign: "renew", status: "Contacted", revenue: 0, partnerShare: 0 },
  { timestamp: "2026-03-19", name: "Omar Khalid", phone: "+971503456789", intent: "move", source: "ali-real-estate", utmSource: "whatsapp", utmCampaign: "movein", status: "Closed", revenue: 900, partnerShare: 315 },
  { timestamp: "2026-03-19", name: "Priya Nair", phone: "+971504567890", intent: "exit", source: "jvc-agents", utmSource: "instagram", utmCampaign: "exit", status: "New", revenue: 0, partnerShare: 0 },
  { timestamp: "2026-03-18", name: "James Taylor", phone: "+971505678901", intent: "move", source: "marina-brokers", utmSource: "broker", utmCampaign: "movein", status: "Closed", revenue: 1500, partnerShare: 525 },
  { timestamp: "2026-03-18", name: "Fatima Al-Rashid", phone: "+971506789012", intent: "move", source: "ali-real-estate", utmSource: "broker", utmCampaign: "movein", status: "Contacted", revenue: 0, partnerShare: 0 },
  { timestamp: "2026-03-17", name: "Raj Patel", phone: "+971507890123", intent: "renew", source: "jvc-agents", utmSource: "google", utmCampaign: "renew", status: "Closed", revenue: 600, partnerShare: 210 },
  { timestamp: "2026-03-17", name: "Emma Wilson", phone: "+971508901234", intent: "move", source: "ali-real-estate", utmSource: "broker", utmCampaign: "movein", status: "New", revenue: 0, partnerShare: 0 },
  { timestamp: "2026-03-16", name: "Chen Wei", phone: "+971509012345", intent: "move", source: "marina-brokers", utmSource: "tiktok", utmCampaign: "viral", status: "Closed", revenue: 1100, partnerShare: 385 },
  { timestamp: "2026-03-16", name: "Aisha Mohammed", phone: "+971500123456", intent: "exit", source: "ali-real-estate", utmSource: "broker", utmCampaign: "exit", status: "Contacted", revenue: 0, partnerShare: 0 },
  { timestamp: "2026-03-15", name: "David Kim", phone: "+971501234560", intent: "move", source: "jvc-agents", utmSource: "whatsapp", utmCampaign: "movein", status: "Closed", revenue: 800, partnerShare: 280 },
  { timestamp: "2026-03-15", name: "Nour El-Din", phone: "+971502345670", intent: "move", source: "ali-real-estate", utmSource: "broker", utmCampaign: "movein", status: "New", revenue: 0, partnerShare: 0 },
];

export const DEMO_LEADERBOARD = [
  { name: "Ali Real Estate", leads: 18, closed: 7, earnings: 2450, badge: "🥇" },
  { name: "Marina Brokers", leads: 12, closed: 5, earnings: 1560, badge: "🥈" },
  { name: "JVC Agents", leads: 9, closed: 3, earnings: 840, badge: "🥉" },
  { name: "Downtown Realty", leads: 7, closed: 2, earnings: 560, badge: "⭐" },
  { name: "Palm Partners", leads: 5, closed: 1, earnings: 280, badge: "⭐" },
  { name: "Creek Brokers", leads: 4, closed: 1, earnings: 245, badge: "⭐" },
];
