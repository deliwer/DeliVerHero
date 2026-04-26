import { readFileSync } from "fs";
import { spawnSync } from "child_process";
import path from "path";

const APP_FILE = path.resolve(process.cwd(), "client/src/App.tsx");
const BASE_URL = process.env.SMOKE_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
const PAGE_TIMEOUT_MS = 10000;
const CONCURRENCY = Number(process.env.SMOKE_CONCURRENCY || 8);
const STATIC_ONLY = process.argv.includes("--static-only");

const ROUTE_RE = /<Route\s+path=["']([^"']+)["']/g;

function discoverRoutes(): string[] {
  const src = readFileSync(APP_FILE, "utf8");
  const routes = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = ROUTE_RE.exec(src)) !== null) {
    const p = m[1];
    if (!p || p === "*") continue;
    if (p.includes(":")) continue;
    routes.add(p);
  }
  return Array.from(routes).sort();
}

type RouteResult = { route: string; status: number | null; error?: string };

async function checkRoute(route: string): Promise<RouteResult> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), PAGE_TIMEOUT_MS);
  try {
    const resp = await fetch(`${BASE_URL}${route}`, {
      signal: ctrl.signal,
      redirect: "manual",
    });
    return { route, status: resp.status };
  } catch (err: any) {
    return { route, status: null, error: err?.message || String(err) };
  } finally {
    clearTimeout(t);
  }
}

async function runPool<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = [];
  let idx = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i]);
    }
  });
  await Promise.all(runners);
  return results;
}

type StaticIssue = { file: string; line: string; name: string };

function runStaticCheck(): { issues: StaticIssue[]; tscError?: string } {
  console.log("[smoke] Running static name-resolution check (tsc TS2304)...");
  const res = spawnSync("npx", ["tsc", "--noEmit"], {
    encoding: "utf8",
    timeout: 180_000,
  });
  const output = (res.stdout || "") + (res.stderr || "");
  const issues: StaticIssue[] = [];
  const re = /^(.+?)\((\d+,\d+)\): error TS2304: Cannot find name '([^']+)'/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(output)) !== null) {
    issues.push({ file: m[1], line: m[2], name: m[3] });
  }
  if (res.status === null) {
    return { issues, tscError: "tsc timed out after 180s" };
  }
  return { issues };
}

(async () => {
  console.log(`[smoke] Target: ${BASE_URL}`);

  const { issues, tscError } = runStaticCheck();
  if (tscError) console.log(`[smoke] tsc warning: ${tscError}`);
  if (issues.length === 0) {
    console.log("[smoke] Static check: no missing-name errors. ✓");
  } else {
    console.log(`[smoke] Static check: ${issues.length} missing-name error(s):`);
    for (const i of issues) {
      console.log(`   ✖ ${i.file}:${i.line}  Cannot find name '${i.name}'`);
    }
  }

  if (STATIC_ONLY) {
    console.log("[smoke] --static-only flag set, skipping HTTP route pings.");
    process.exit(issues.length > 0 ? 1 : 0);
  }

  const routes = discoverRoutes();
  console.log("");
  console.log(`[smoke] Pinging ${routes.length} static routes (concurrency=${CONCURRENCY})...`);
  const t0 = Date.now();
  const results = await runPool(routes, checkRoute, CONCURRENCY);
  const dur = ((Date.now() - t0) / 1000).toFixed(1);

  const httpFailed = results.filter((r) => r.error || (r.status !== null && r.status >= 500));
  const httpOk = results.length - httpFailed.length;

  console.log(`[smoke] HTTP done in ${dur}s — OK: ${httpOk}/${results.length}, Failed: ${httpFailed.length}`);

  if (httpFailed.length > 0) {
    console.log("");
    console.log("=== HTTP FAILURES ===");
    for (const f of httpFailed) {
      console.log(`✖ ${f.route}  status=${f.status ?? "n/a"}${f.error ? `  err=${f.error}` : ""}`);
    }
  }

  const failed = issues.length > 0 || httpFailed.length > 0;
  process.exit(failed ? 1 : 0);
})().catch((err) => {
  console.error("[smoke] Fatal:", err);
  process.exit(2);
});
