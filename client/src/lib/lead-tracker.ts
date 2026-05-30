import { getReferral } from "./referral";

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined;

export interface LeadPayload {
  name?: string;
  phone?: string;
  scenario: string;
  from?: string;
  to?: string;
  date?: string;
  value?: string;
}

export function sendLeadToSheets(payload: LeadPayload): void {
  if (!WEBHOOK_URL) return;
  const ref = getReferral();
  const body = {
    ...payload,
    ref: ref?.code || "direct",
    page: typeof window !== "undefined" ? window.location.pathname : "",
  };
  try {
    fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (_) {}
}

export function trackPageView(): void {
  if (!WEBHOOK_URL) return;
  const ref = getReferral();
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  try {
    fetch(WEBHOOK_URL.replace("/LEADS", "/TRAFFIC"), {
      method: "POST",
      body: JSON.stringify({
        sheet: "TRAFFIC",
        page: typeof window !== "undefined" ? window.location.pathname : "",
        ref: ref?.code || params.get("ref") || "direct",
        utmSource: params.get("utm_source") || "",
        utmCampaign: params.get("utm_campaign") || "",
        device: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "",
      }),
    });
  } catch (_) {}
}

export function buildTrackedWhatsAppUrl(scenario: string, extra?: Record<string, string>): string {
  const ref = getReferral();
  const parts = [`Relocation request via deliwer.com`];
  parts.push(`Scenario: ${scenario}`);
  if (extra?.from) parts.push(`From: ${extra.from}`);
  if (extra?.to) parts.push(`To: ${extra.to}`);
  if (extra?.date) parts.push(`Date: ${extra.date}`);
  parts.push(`Referral: ${ref?.code || "direct"}`);
  parts.push(`Page: ${typeof window !== "undefined" ? window.location.pathname : ""}`);
  return `https://wa.me/971523906019?text=${encodeURIComponent(parts.join("\n"))}`;
}

export function openTrackedWhatsApp(scenario: string, extra?: Record<string, string>): void {
  sendLeadToSheets({ scenario, ...extra });
  window.open(buildTrackedWhatsAppUrl(scenario, extra), "_blank");
}
