import { readFileSync, existsSync, statSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Works on Vercel (api/ dir) and locally (both use project-root relative paths)
const JSON_PATH =
  resolve(__dirname, "../server/data/rera_brokers.json") ||
  join(process.cwd(), "server/data/rera_brokers.json");

let _cache = null;
let _cacheTime = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function loadBrokers() {
  const now = Date.now();
  if (_cache && now - _cacheTime < CACHE_TTL_MS) return _cache;
  if (!existsSync(JSON_PATH)) return [];
  _cache = JSON.parse(readFileSync(JSON_PATH, "utf8"));
  _cacheTime = now;
  return _cache;
}

function getStats() {
  try {
    const stat = statSync(JSON_PATH);
    const brokers = loadBrokers();
    return {
      exists: true,
      totalBrokers: brokers.length,
      fileSizeKB: Math.round(stat.size / 1024),
      lastModified: stat.mtime,
      source: "RERA_Brokers.xls — Dubai Land Department",
      description: "Licensed real estate brokers registered with RERA Dubai",
    };
  } catch {
    return { exists: false, totalBrokers: 0, fileSizeKB: 0 };
  }
}

function toBrokersCsv(brokers) {
  const header = "Name,License,Company,Email,Phone";
  const rows = brokers.map((b) => {
    const esc = (v) => `"${(v || "").replace(/"/g, '""')}"`;
    return [esc(b.name), esc(b.license), esc(b.company), esc(b.email), esc(b.phone)].join(",");
  });
  return [header, ...rows].join("\n");
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, page, limit, search, company, format } = req.query || {};

  try {
    // --- Stats ---
    if (action === "stats") {
      return res.status(200).json(getStats());
    }

    const brokers = loadBrokers();

    // --- CSV / email list download ---
    if (action === "csv" || format === "csv") {
      let list = brokers;
      if (search) {
        const q = search.toLowerCase();
        list = brokers.filter(
          (b) =>
            b.name?.toLowerCase().includes(q) ||
            b.email?.toLowerCase().includes(q) ||
            b.company?.toLowerCase().includes(q)
        );
      }
      const csv = toBrokersCsv(list);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="RERA_Brokers_${list.length}.csv"`);
      return res.status(200).send(csv);
    }

    // --- Paginated + searchable list ---
    const pageNum = Math.max(1, parseInt(page || "1", 10));
    const limitNum = Math.min(500, Math.max(1, parseInt(limit || "100", 10)));
    const offset = (pageNum - 1) * limitNum;

    let filtered = brokers;

    if (search) {
      const q = search.toLowerCase();
      filtered = brokers.filter(
        (b) =>
          b.name?.toLowerCase().includes(q) ||
          b.email?.toLowerCase().includes(q) ||
          b.company?.toLowerCase().includes(q)
      );
    }

    if (company) {
      const q = company.toLowerCase();
      filtered = filtered.filter((b) => b.company?.toLowerCase().includes(q));
    }

    const total = filtered.length;
    const slice = filtered.slice(offset, offset + limitNum);

    return res.status(200).json({
      brokers: slice,
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
      stats: {
        totalInFile: brokers.length,
        source: "RERA_Brokers.xls — Dubai Land Department",
      },
    });
  } catch (err) {
    console.error("[rera-brokers] Error:", err.message);
    return res.status(500).json({ error: "Failed to load broker data", message: err.message });
  }
}
