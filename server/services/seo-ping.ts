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
const PLANET_HEROES_BASE = "https://planetheroes.deliwer.com";

// ── IndexNow key ──────────────────────────────────────────────────────────────
// Key verification file served from public/ at:
//   https://www.deliwer.com/deliwer2026seopingkey.txt
//   https://planetheroes.deliwer.com/deliwer2026seopingkey.txt  (same server)
export const INDEXNOW_KEY = "deliwer2026seopingkey";

// ── Planet Heroes high-value URLs for IndexNow ───────────────────────────────
const PLANET_HEROES_URLS = [
  `${PLANET_HEROES_BASE}/community`,
  `${PLANET_HEROES_BASE}/`,
  `${PLANET_HEROES_BASE}/league`,
  `${PLANET_HEROES_BASE}/leaderboard`,
  `${PLANET_HEROES_BASE}/play`,
  `${PLANET_HEROES_BASE}/earn`,
  `${PLANET_HEROES_BASE}/rewards`,
  `${PLANET_HEROES_BASE}/exchange`,
  `${PLANET_HEROES_BASE}/environmental`,
  `${PLANET_HEROES_BASE}/aquacafe`,
  `${PLANET_HEROES_BASE}/wellness`,
  `${PLANET_HEROES_BASE}/invest`,
  `${PLANET_HEROES_BASE}/planet-hero`,
  `${PLANET_HEROES_BASE}/planet-hero-missions`,
  `${PLANET_HEROES_BASE}/impact-dashboard`,
  `${PLANET_HEROES_BASE}/collect`,
  `${PLANET_HEROES_BASE}/redeem`,
];

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

// Planet Heroes separate tracking
let phLastRunAt: string | null = null;
let phLastResults: PingResult[] = [];

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

// ── IndexNow submission helper ────────────────────────────────────────────────
async function submitToIndexNow(
  host: string,
  keyLocation: string,
  urlList: string[],
  label: string
): Promise<PingResult[]> {
  const payload = { host, key: INDEXNOW_KEY, keyLocation, urlList };

  const engines: Array<{ engine: string; endpoint: string }> = [
    { engine: `Bing / IndexNow (${label})`,         endpoint: "https://www.bing.com/indexnow" },
    { engine: `IndexNow.org aggregator (${label})`, endpoint: "https://api.indexnow.org/indexnow" },
    { engine: `Yandex / IndexNow (${label})`,       endpoint: "https://yandex.com/indexnow" },
  ];

  return Promise.all(
    engines.map(async ({ engine, endpoint }) => {
      const { status, body } = await postJson(endpoint, payload);
      const ok = status === 200 || status === 202;
      return {
        engine,
        type: "indexnow" as const,
        url: endpoint,
        status,
        ok,
        message: ok
          ? `✓ ${urlList.length} URLs accepted by ${engine}`
          : `✗ HTTP ${status} — ${body.slice(0, 100)}`,
        timestamp: now(),
      };
    })
  );
}

// ── IndexNow submission — deliwer.com ─────────────────────────────────────────
async function submitIndexNow(): Promise<PingResult[]> {
  return submitToIndexNow(
    "www.deliwer.com",
    `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    INDEX_NOW_URLS,
    "deliwer.com"
  );
}

// ── IndexNow submission — planetheroes.deliwer.com ────────────────────────────
export async function submitPlanetHeroesIndexNow(): Promise<PingResult[]> {
  const results = await submitToIndexNow(
    "planetheroes.deliwer.com",
    `${PLANET_HEROES_BASE}/${INDEXNOW_KEY}.txt`,
    PLANET_HEROES_URLS,
    "planetheroes"
  );
  // Persist so getLastPingReport always has fresh Planet Heroes data
  phLastRunAt = now();
  phLastResults = results;
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

  // Run deliwer.com + planetheroes.deliwer.com submissions in parallel
  const [deliwerResults, planetHeroesResults] = await Promise.all([
    submitIndexNow(),
    submitPlanetHeroesIndexNow(),
  ]);
  const results = [...deliwerResults, ...planetHeroesResults];

  const succeeded = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;

  console.log(`[SEO] Ping complete — ${succeeded}/${results.length} engines accepted`);
  results.forEach(r => console.log(`[SEO]   ${r.message}`));

  lastRunAt = runAt;
  lastResults = deliwerResults;
  // planetHeroesResults already persisted inside submitPlanetHeroesIndexNow()

  return {
    ok: succeeded > 0,
    runAt,
    summary: { total: results.length, succeeded, failed },
    results,
  };
}

// ── Status report — structured per-domain breakdown ───────────────────────────
export function getLastPingReport() {
  const deliwerOk   = lastResults.filter(r => r.ok).length;
  const deliwerFail = lastResults.filter(r => !r.ok).length;
  const phOk        = phLastResults.filter(r => r.ok).length;
  const phFail      = phLastResults.filter(r => !r.ok).length;

  return {
    lastRunAt,
    summary: {
      deliwer: {
        domain: "www.deliwer.com",
        sitemap: "https://www.deliwer.com/sitemap.xml",
        urlCount: INDEX_NOW_URLS.length,
        lastRunAt,
        succeeded: deliwerOk,
        failed: deliwerFail,
        ok: deliwerOk > 0,
      },
      planetHeroes: {
        domain: "planetheroes.deliwer.com",
        sitemap: "https://planetheroes.deliwer.com/sitemap-planetheroes.xml",
        urlCount: PLANET_HEROES_URLS.length,
        lastRunAt: phLastRunAt,
        succeeded: phOk,
        failed: phFail,
        ok: phOk > 0,
      },
    },
    results: {
      deliwer: lastResults,
      planetHeroes: phLastResults,
    },
  };
}
