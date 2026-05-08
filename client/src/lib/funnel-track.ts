const SESSION_KEY = "dw_funnel_sid";

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "anon";
  }
}

function getUtmSource(): string | undefined {
  try {
    const p = new URLSearchParams(window.location.search);
    return p.get("utm_source") || p.get("path") || undefined;
  } catch {
    return undefined;
  }
}

export function trackFunnel(event: string, meta?: { page?: string; stage?: string }): void {
  try {
    const payload = {
      event,
      page: meta?.page ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
      stage: meta?.stage,
      utmSource: getUtmSource(),
      sessionId: getSessionId(),
    };
    fetch("/api/broker/funnel-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
