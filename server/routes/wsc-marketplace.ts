import { Router } from "express";
import { db } from "../db";
import { wscStockItems, wscOfferSessions, wscOfferItems, buyBuyers } from "@shared/schema";
import { eq, and, ilike, or, desc, sql, inArray } from "drizzle-orm";
import { createHash } from "crypto";
import * as XLSX from "xlsx";
import { readFileSync } from "fs";
import { join } from "path";

const router = Router();

function hashPassword(pw: string): string {
  return createHash("sha256").update(pw + "buy_chaintrack_salt_2026").digest("hex");
}

function genSessionRef(source: string): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  return `${source}/OFF/${ymd}/${String(Math.floor(Math.random()*999999)).padStart(6,'0')}`;
}

function getBuyerFromToken(token: string): { id: string; email: string } {
  const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
  return payload;
}

// ── Seed stock from JSON file ────────────────────────────────────────────────
async function seedStockIfEmpty() {
  try {
    const existing = await db.select({ id: wscStockItems.id }).from(wscStockItems).limit(1);
    if (existing.length > 0) return;
    const seedPath = join(process.cwd(), "server/wsc-seed-data.json");
    const rows: any[] = JSON.parse(readFileSync(seedPath, "utf8"));
    const today = new Date().toISOString().slice(0, 10);
    const chunks: any[][] = [];
    for (let i = 0; i < rows.length; i += 50) chunks.push(rows.slice(i, i + 50));
    for (const chunk of chunks) {
      await db.insert(wscStockItems).values(
        chunk.map(r => ({
          source: r.source,
          reportDate: today,
          sku: r.sku,
          warehouse: r.warehouse || "New York",
          category: r.category || "PHONES",
          manufacturer: r.manufacturer,
          model: r.model,
          grade: r.grade,
          capacity: r.capacity || null,
          carrier: r.carrier || null,
          color: r.color || null,
          lockStatus: r.lockStatus || null,
          modelNumber: r.modelNumber || null,
          qtyAvailable: r.qtyAvailable || 0,
          listPrice: Math.round((r.listPrice || 0) * 100), // store in cents
          hasQtyAddedToday: r.hasQtyAddedToday || false,
          status: "available",
        }))
      );
    }
    console.log(`[WSC] Seeded ${rows.length} stock items`);
  } catch (err) {
    console.error("[WSC] Seed error:", err);
  }
}

seedStockIfEmpty();

// ── Auth helper ──────────────────────────────────────────────────────────────
async function requireBuyer(req: any, res: any): Promise<{ id: string; email: string } | null> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) { res.status(401).json({ error: "Authentication required" }); return null; }
  try {
    return getBuyerFromToken(auth.slice(7));
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

// ── Stock routes ─────────────────────────────────────────────────────────────

router.get("/stock", async (req, res) => {
  try {
    const { source, category, manufacturer, grade, search, newToday, page, limit: lim } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const pageSize = Math.min(500, parseInt(lim as string) || 200);
    const offset = (pageNum - 1) * pageSize;

    const conditions: any[] = [eq(wscStockItems.status, "available"), sql`${wscStockItems.qtyAvailable} > 0`];
    if (source) conditions.push(eq(wscStockItems.source, source as string));
    if (category) conditions.push(ilike(wscStockItems.category, `%${category}%`));
    if (manufacturer) conditions.push(ilike(wscStockItems.manufacturer, `%${manufacturer}%`));
    if (grade) conditions.push(eq(wscStockItems.grade, grade as string));
    if (newToday === "true") conditions.push(eq(wscStockItems.hasQtyAddedToday, true));
    if (search) conditions.push(
      or(
        ilike(wscStockItems.model, `%${search}%`),
        ilike(wscStockItems.manufacturer, `%${search}%`),
        ilike(wscStockItems.sku, `%${search}%`),
      )!
    );

    const [items, countResult] = await Promise.all([
      db.select().from(wscStockItems).where(and(...conditions))
        .orderBy(desc(wscStockItems.hasQtyAddedToday), wscStockItems.manufacturer, wscStockItems.model)
        .limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(wscStockItems).where(and(...conditions)),
    ]);

    res.json({ items, total: Number(countResult[0].count), page: pageNum, pageSize });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stock/summary", async (req, res) => {
  try {
    const result = await db.select({
      source: wscStockItems.source,
      totalItems: sql<number>`count(*)`,
      totalQty: sql<number>`sum(${wscStockItems.qtyAvailable})`,
      newToday: sql<number>`sum(case when ${wscStockItems.hasQtyAddedToday} then 1 else 0 end)`,
    }).from(wscStockItems)
      .where(and(eq(wscStockItems.status, "available"), sql`${wscStockItems.qtyAvailable} > 0`))
      .groupBy(wscStockItems.source);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── XLSX Download ────────────────────────────────────────────────────────────
router.get("/stock/download", async (req, res) => {
  try {
    const { source } = req.query;
    const conditions: any[] = [eq(wscStockItems.status, "available"), sql`${wscStockItems.qtyAvailable} > 0`];
    if (source) conditions.push(eq(wscStockItems.source, source as string));

    const items = await db.select().from(wscStockItems)
      .where(and(...conditions))
      .orderBy(wscStockItems.manufacturer, wscStockItems.model)
      .limit(2000);

    const wsData = [
      ["Item #", "Warehouse", "Category", "Manufacturer", "Model", "Grade", "Capacity", "Carrier", "Color", "Lock Status", "Model Number", "Quantity Available", "List Price", "Has Qty Added Today", "New Offer Quantity", "New Offer Price"],
      ...items.map(i => [
        i.sku, i.warehouse, i.category, i.manufacturer, i.model, i.grade,
        i.capacity || "", i.carrier || "", i.color || "", i.lockStatus || "",
        i.modelNumber || "", i.qtyAvailable, (i.listPrice / 100).toFixed(2),
        i.hasQtyAddedToday ? "Yes" : "No", "", ""
      ])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws["!cols"] = [8,10,8,10,18,8,6,12,10,10,8,6,6,6,8,8].map(w => ({ wch: w }));
    XLSX.utils.book_append_sheet(wb, ws, "stock-list");

    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    const today = new Date().toISOString().slice(0, 10);
    const srcName = typeof source === "string" ? source : "ALL";
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=Daily_Stock_report_-_${srcName}_-_${today}.xlsx`);
    res.send(buf);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── XLSX Upload / Parse offers ────────────────────────────────────────────────
router.post("/stock/parse-offers", async (req, res) => {
  try {
    const buyer = await requireBuyer(req, res);
    if (!buyer) return;
    const { fileBase64 } = req.body;
    if (!fileBase64) return res.status(400).json({ error: "No file data" });

    const buf = Buffer.from(fileBase64, "base64");
    const wb = XLSX.read(buf, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

    const headers: string[] = rows[0] as string[];
    const idxItemNum = headers.findIndex(h => String(h).toLowerCase().includes("item"));
    const idxMfr = headers.findIndex(h => String(h).toLowerCase().includes("manufacturer") || String(h).toLowerCase() === "mfr");
    const idxModel = headers.findIndex(h => String(h).toLowerCase() === "model" || String(h).toLowerCase().includes("model"));
    const idxGrade = headers.findIndex(h => String(h).toLowerCase() === "grade");
    const idxCap = headers.findIndex(h => String(h).toLowerCase().includes("cap"));
    const idxColor = headers.findIndex(h => String(h).toLowerCase() === "color");
    const idxCarrier = headers.findIndex(h => String(h).toLowerCase() === "carrier");
    const idxListPrice = headers.findIndex(h => String(h).toLowerCase().includes("list price"));
    const idxOfferQty = headers.findIndex(h => String(h).toLowerCase().includes("offer quantity") || String(h).toLowerCase().includes("offer qty"));
    const idxOfferPrice = headers.findIndex(h => String(h).toLowerCase().includes("offer price"));

    const offers: any[] = [];
    for (const row of rows.slice(1)) {
      const offerQty = parseInt(String(row[idxOfferQty] || "0"));
      const offerPrice = parseFloat(String(row[idxOfferPrice] || "0").replace(/[^0-9.]/g, ""));
      if (!offerQty || !offerPrice) continue;

      offers.push({
        sku: String(row[idxItemNum] || ""),
        manufacturer: String(row[idxMfr] || ""),
        model: String(row[idxModel] || ""),
        grade: String(row[idxGrade] || ""),
        capacity: String(row[idxCap] || ""),
        color: String(row[idxColor] || ""),
        carrier: String(row[idxCarrier] || ""),
        listPrice: Math.round(parseFloat(String(row[idxListPrice] || "0")) * 100),
        offerQty,
        offerPrice: Math.round(offerPrice * 100),
      });
    }

    res.json({ parsed: offers, count: offers.length });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to parse file" });
  }
});

// ── Submit offers (JSON) ─────────────────────────────────────────────────────
router.post("/offers", async (req, res) => {
  try {
    const buyer = await requireBuyer(req, res);
    if (!buyer) return;

    const { source = "WSC", items, notes } = req.body;
    if (!items?.length) return res.status(400).json({ error: "No items in offer" });

    const totalValue = items.reduce((s: number, i: any) => s + (i.offerPrice * i.offerQty), 0);
    const sessionRef = genSessionRef(source);

    const [session] = await db.insert(wscOfferSessions).values({
      buyerId: buyer.id,
      source,
      sessionRef,
      totalItems: items.length,
      totalValue,
      status: "submitted",
      notes: notes || null,
      metadata: {},
    }).returning();

    // Resolve stock item IDs by SKU
    const skus = items.map((i: any) => i.sku).filter(Boolean);
    const stockRows = skus.length
      ? await db.select({ id: wscStockItems.id, sku: wscStockItems.sku }).from(wscStockItems)
          .where(inArray(wscStockItems.sku, skus))
      : [];
    const skuToId = new Map(stockRows.map(r => [r.sku, r.id]));

    await db.insert(wscOfferItems).values(
      items.map((i: any) => ({
        sessionId: session.id,
        stockItemId: skuToId.get(i.sku) || null,
        sku: i.sku || "",
        manufacturer: i.manufacturer || "",
        model: i.model || "",
        grade: i.grade || null,
        capacity: i.capacity || null,
        color: i.color || null,
        carrier: i.carrier || null,
        offerQty: i.offerQty,
        offerPrice: i.offerPrice,
        listPrice: i.listPrice || 0,
        status: "pending",
      }))
    );

    res.status(201).json({ ...session, itemCount: items.length });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to submit offers" });
  }
});

router.get("/offers", async (req, res) => {
  try {
    const buyer = await requireBuyer(req, res);
    if (!buyer) return;
    const sessions = await db.select().from(wscOfferSessions)
      .where(eq(wscOfferSessions.buyerId, buyer.id))
      .orderBy(desc(wscOfferSessions.createdAt));
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/offers/:id", async (req, res) => {
  try {
    const buyer = await requireBuyer(req, res);
    if (!buyer) return;
    const [session] = await db.select().from(wscOfferSessions)
      .where(and(eq(wscOfferSessions.id, req.params.id), eq(wscOfferSessions.buyerId, buyer.id)))
      .limit(1);
    if (!session) return res.status(404).json({ error: "Session not found" });
    const items = await db.select().from(wscOfferItems)
      .where(eq(wscOfferItems.sessionId, session.id));
    res.json({ ...session, items });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Reuse buy-chaintrack auth for WSC/KT Corp login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const [buyer] = await db.select().from(buyBuyers)
      .where(and(eq(buyBuyers.email, email.toLowerCase()), eq(buyBuyers.status, "active"))).limit(1);
    if (!buyer || buyer.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = Buffer.from(JSON.stringify({ id: buyer.id, email: buyer.email, ts: Date.now() })).toString("base64");
    const { passwordHash: _, ...safe } = buyer;
    res.json({ buyer: safe, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, companyName, contactName, phone, country } = req.body;
    if (!email || !password || !companyName || !contactName || !phone) return res.status(400).json({ error: "Missing required fields" });
    const existing = await db.select().from(buyBuyers).where(eq(buyBuyers.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) return res.status(409).json({ error: "Email already registered" });
    const [buyer] = await db.insert(buyBuyers).values({
      email: email.toLowerCase(), passwordHash: hashPassword(password),
      companyName, contactName, phone, country: country || "UAE",
      buyerTier: "standard", kycStatus: "pending", status: "active", metadata: {},
    }).returning();
    const token = Buffer.from(JSON.stringify({ id: buyer.id, email: buyer.email, ts: Date.now() })).toString("base64");
    const { passwordHash: _, ...safe } = buyer;
    res.json({ buyer: safe, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
