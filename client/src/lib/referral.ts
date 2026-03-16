const STORAGE_KEY = "deliwer_partner_ref";

export interface ReferralData {
  code: string;
  source: string;
  timestamp: string;
}

export function captureReferral(): ReferralData | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref") || params.get("partner") || params.get("agent");
  if (!code) return null;
  const data: ReferralData = {
    code,
    source: window.location.pathname,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
  return data;
}

export function getReferral(): ReferralData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      sessionStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReferralData;
  } catch (_) {
    return null;
  }
}

export function clearReferral(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
}

export function buildWhatsAppMessage(base: {
  intro: string;
  fields?: Record<string, string | undefined>;
}): string {
  const ref = getReferral();
  const parts: string[] = [base.intro];
  if (base.fields) {
    for (const [label, value] of Object.entries(base.fields)) {
      if (value && value.trim()) parts.push(`${label}: ${value.trim()}.`);
    }
  }
  if (ref?.code) parts.push(`Referral: ${ref.code}.`);
  parts.push(`Source: ${typeof window !== "undefined" ? window.location.pathname : "deliwer.com"}.`);
  parts.push(
    `Time: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })}.`
  );
  return parts.filter(Boolean).join("\n");
}

export function openWhatsApp(message: string): void {
  window.open(
    `https://wa.me/971523946311?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

export function openWhatsAppWithRef(base: {
  intro: string;
  fields?: Record<string, string | undefined>;
}): void {
  openWhatsApp(buildWhatsAppMessage(base));
}
