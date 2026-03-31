const REF_KEY = "deliwer_ref";
const SOURCE_KEY = "deliwer_source";
const SESSION_KEY = "deliwer_session_id";

export interface ReferralData {
  code: string;
  source: string;
  timestamp: string;
  sessionId: string;
}

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function setCookie(name: string, value: string, days = 30): void {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (_) {}
}

function getCookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  } catch (_) {
    return null;
  }
}

export function captureReferral(): ReferralData | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref") || params.get("partner") || params.get("agent");
  if (!code) return null;

  const sessionId = generateSessionId();
  const source = window.location.pathname;

  const data: ReferralData = {
    code,
    source,
    timestamp: new Date().toISOString(),
    sessionId,
  };

  const raw = JSON.stringify(data);
  try {
    localStorage.setItem(REF_KEY, code);
    localStorage.setItem(SOURCE_KEY, source);
    localStorage.setItem(SESSION_KEY, sessionId);
    sessionStorage.setItem(REF_KEY, code);
    sessionStorage.setItem(SOURCE_KEY, source);
    sessionStorage.setItem(SESSION_KEY, sessionId);
    setCookie(REF_KEY, code);
    setCookie(SOURCE_KEY, source);
    setCookie(SESSION_KEY, sessionId);
  } catch (_) {}

  logEvent({ ref: code, page: source, timestamp: data.timestamp, action: "page_visit" });

  return data;
}

export function getReferral(): ReferralData | null {
  if (typeof window === "undefined") return null;
  try {
    const code =
      sessionStorage.getItem(REF_KEY) ||
      localStorage.getItem(REF_KEY) ||
      getCookie(REF_KEY);
    if (!code) return null;
    const source =
      sessionStorage.getItem(SOURCE_KEY) ||
      localStorage.getItem(SOURCE_KEY) ||
      getCookie(SOURCE_KEY) ||
      "";
    const sessionId =
      sessionStorage.getItem(SESSION_KEY) ||
      localStorage.getItem(SESSION_KEY) ||
      getCookie(SESSION_KEY) ||
      "";
    return { code, source, timestamp: new Date().toISOString(), sessionId };
  } catch (_) {
    return null;
  }
}

export function clearReferral(): void {
  try {
    [REF_KEY, SOURCE_KEY, SESSION_KEY].forEach((k) => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  } catch (_) {}
}

export interface LogPayload {
  ref?: string;
  page: string;
  timestamp: string;
  action: "page_visit" | "whatsapp_click" | "link_generated";
}

export function logEvent(payload: LogPayload): void {
  console.log("[DBE]", payload);
  try {
    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
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
  if (ref?.code) parts.push(`Ref: ${ref.code}.`);
  parts.push(`Source: ${typeof window !== "undefined" ? window.location.pathname : "deliwer.com"}.`);
  parts.push(
    `Time: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })}.`
  );
  return parts.filter(Boolean).join("\n");
}

export function openWhatsApp(message: string): void {
  logEvent({
    ref: getReferral()?.code,
    page: typeof window !== "undefined" ? window.location.pathname : "/",
    timestamp: new Date().toISOString(),
    action: "whatsapp_click",
  });
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
