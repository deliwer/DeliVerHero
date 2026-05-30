/**
 * SEO Ping Service — DeliWer
 *
 * Submits sitemaps and high-value URLs to search engines periodically.
 *
 * Channels:
 *  1. IndexNow — POST to Bing, Yandex, and IndexNow.org aggregator.
 *     A single submission pushes to ALL participating engines (Bing, Yandex,
 *     Seznam, Naver, Yep, …). Google does not yet participate in IndexNow
 *     but discovers via Googlebot crawling the public sitemap.
 *
 *  NOTE: Legacy sitemap-ping endpoints are all deprecated / returning 404/410:
 *   - Google ping  (removed 2023)
 *   - Bing ping    (returns 410)
 *   - Yandex ping  (blocked from hosting envs)
 *  IndexNow is the correct modern replacement.
 *
 * Frequency: weekly cron (configured in server/index.ts) + manual API trigger
 * Manual:    POST /api/admin/seo-ping  { headers: { x-admin-secret: <secret> } }
 * Status:    GET  /api/admin/seo-ping/status?secret=<secret>
 */

const BASE_URL = "https://www.deliwer.com";

// ── IndexNow key ──────────────────────────────────────────────────────────────
// Key verification file served from public/ at:
//   https://www.deliwer.com/deliwer2026seopingkey.txt
export const INDEXNOW_KEY = "deliwer2026seopingkey";

// ── High-value URLs for IndexNow instant indexing ────────────────────────────
const INDEX_NOW_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/chaintrack`,
  `${BASE_URL}/chaintrack-sourcing`,
  `${BASE_URL}/chaintrack-grading`,
  `${BASE_URL}/ejari-dubai`,
  `${BASE_URL}/ejari-registration`,
  `${BASE_URL}/ejari-renewal`,
  `${BASE_URL}/move-in-package`,
  `${BASE_URL}/move-out-package`,
  `${BASE_URL}/move-to-dubai`,
  `${BASE_URL}/exit-dubai`,
  `${BASE_URL}/aquacafe`,
  `${BASE_URL}/relocate-pricing`,
  `${BASE_URL}/realestate`,
  `${BASE_URL}/errand`,
  `${BASE_URL}/bulk-tradein`,
];

// ── Result types ──────────────────────────────────────────────────────────────
export interface PingResult {
  engine: string;
  type: "indexnow";
  url: string;
  status: number | "error";
  ok: boolean;
  message: string;
  timestamp: string;
}

let lastRunAt: string | null = null;
let lastResults: PingResult[] = [];

function now(): string {
  return new Date().toISOString();
}

async function postJson(url: string, payload: object): Promise<{ status: number; body: string }> {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const body = await res.text().catch(() => "");
    return { status: res.status, body };
  } catch (err: any) {
    return { status: 0, body: err?.message || "network error" };
  } finally {
    clearTimeout(timeout);
  }
}

// ── IndexNow submission — Bing + IndexNow.org + Yandex ───────────────────────
async function submitIndexNow(): Promise<PingResult[]> {
  const payload = {
    host: "www.deliwer.com",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: INDEX_NOW_URLS,
  };

  const hosts: Array<{ engine: string; endpoint: string }> = [
    { engine: "Bing / IndexNow", endpoint: "https://www.bing.com/indexnow" },
    { engine: "IndexNow.org (aggregator)", endpoint: "https://api.indexnow.org/indexnow" },
    { engine: "Yandex / IndexNow", endpoint: "https://yandex.com/indexnow" },
  ];

  const results: PingResult[] = await Promise.all(
    hosts.map(async ({ engine, endpoint }) => {
      const { status, body } = await postJson(endpoint, payload);
      // 200 or 202 = accepted
      const ok = status === 200 || status === 202;
      return {
        engine,
        type: "indexnow" as const,
        url: endpoint,
        status,
        ok,
        message: ok
          ? `✓ ${INDEX_NOW_URLS.length} URLs accepted by ${engine}`
          : `✗ HTTP ${status} — ${body.slice(0, 100)}`,
        timestamp: now(),
      };
    })
  );

  return results;
}

// ── Main exported function ────────────────────────────────────────────────────
export async function runSeoPing(): Promise<{
  ok: boolean;
  runAt: string;
  summary: { total: number; succeeded: number; failed: number };
  results: PingResult[];
}> {
  console.log("[SEO] Starting weekly SEO / IndexNow ping cycle…");
  const runAt = now();

  const results = await submitIndexNow();

  const succeeded = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;

  console.log(`[SEO] Ping complete — ${succeeded}/${results.length} engines accepted`);
  results.forEach(r => console.log(`[SEO]   ${r.message}`));

  lastRunAt = runAt;
  lastResults = results;

  return {
    ok: succeeded > 0,          // pass if at least one engine accepted
    runAt,
    summary: { total: results.length, succeeded, failed },
    results,
  };
}

export function getLastPingReport() {
  return { lastRunAt, results: lastResults };
}
