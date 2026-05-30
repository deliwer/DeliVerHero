import { Router, Request, Response } from "express";
import { db } from "../db";
import {
  habtoorInventory, brokerNdaAcceptance, propertyLeadClaims,
  dealClosureReports, virtualTourRequests, brokerBlacklist,
  insertBrokerNdaSchema, insertPropertyLeadClaimSchema,
  insertDealClosureSchema, insertVirtualTourRequestSchema,
} from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

const router = Router();

// ── Inventory seed data (HPV unit numbers stored only, never returned in API) ─────────────────

const INVENTORY_SEED = [
  { serialNo: 1,  hpvUnit: 89,  unitType: "4BR", salePrice: 5650000,  buaSqft: 3082, areaSqft: 3681,    structureType: "Semi Detached", status: "Vacant", views: "Community" },
  { serialNo: 2,  hpvUnit: 97,  unitType: "4BR", salePrice: 5700000,  buaSqft: 3082, areaSqft: 3834,    structureType: "Semi Detached", status: "Vacant", views: "Community" },
  { serialNo: 3,  hpvUnit: 101, unitType: "4BR", salePrice: 5850000,  buaSqft: 3082, areaSqft: 4053,    structureType: "Semi Detached", status: "Vacant", views: "Community" },
  { serialNo: 4,  hpvUnit: 107, unitType: "4BR", salePrice: 5900000,  buaSqft: 3082, areaSqft: 3418,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field 2" },
  { serialNo: 5,  hpvUnit: 80,  unitType: "4BR", salePrice: 6000000,  buaSqft: 3082, areaSqft: 3763,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 1" },
  { serialNo: 6,  hpvUnit: 81,  unitType: "4BR", salePrice: 6000000,  buaSqft: 3082, areaSqft: 3750,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field 1" },
  { serialNo: 7,  hpvUnit: 82,  unitType: "4BR", salePrice: 6000000,  buaSqft: 3082, areaSqft: 3770,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field 1" },
  { serialNo: 8,  hpvUnit: 109, unitType: "4BR", salePrice: 6100000,  buaSqft: 3082, areaSqft: 4314,    structureType: "Semi Detached", status: "Vacant", views: "Community" },
  { serialNo: 9,  hpvUnit: 111, unitType: "4BR", salePrice: 6200000,  buaSqft: 3082, areaSqft: 4436,    structureType: "Semi Detached", status: "Rented", views: "Community" },
  { serialNo: 10, hpvUnit: 112, unitType: "4BR", salePrice: 6200000,  buaSqft: 3082, areaSqft: 4513,    structureType: "Semi Detached", status: "Rented", views: "Community" },
  { serialNo: 11, hpvUnit: 103, unitType: "4BR", salePrice: 6200000,  buaSqft: 3082, areaSqft: 3422,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field 2" },
  { serialNo: 12, hpvUnit: 104, unitType: "4BR", salePrice: 6200000,  buaSqft: 3082, areaSqft: 3430,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 13, hpvUnit: 79,  unitType: "4BR", salePrice: 6300000,  buaSqft: 3082, areaSqft: 4278,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 1" },
  { serialNo: 14, hpvUnit: 83,  unitType: "4BR", salePrice: 6300000,  buaSqft: 3082, areaSqft: 4155,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field 1" },
  { serialNo: 15, hpvUnit: 65,  unitType: "4BR", salePrice: 6400000,  buaSqft: 3082, areaSqft: 3796,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 1" },
  { serialNo: 16, hpvUnit: 72,  unitType: "4BR", salePrice: 6400000,  buaSqft: 3082, areaSqft: 3774,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field 1" },
  { serialNo: 17, hpvUnit: 78,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4276,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 1" },
  { serialNo: 18, hpvUnit: 85,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4156,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 19, hpvUnit: 86,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4156,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 20, hpvUnit: 87,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4157,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 21, hpvUnit: 91,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4167,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 22, hpvUnit: 95,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4165,    structureType: "Semi Detached", status: "Vacant", views: "Polo Field" },
  { serialNo: 23, hpvUnit: 96,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4161,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 24, hpvUnit: 99,  unitType: "4BR", salePrice: 6700000,  buaSqft: 3082, areaSqft: 4156,    structureType: "Semi Detached", status: "Rented", views: "Polo Field 2" },
  { serialNo: 25, hpvUnit: 3,   unitType: "5BR", salePrice: 12900000, buaSqft: 4811, areaSqft: 6525,    structureType: "Villa",         status: "Vacant", views: "Polo Field 3" },
  { serialNo: 26, hpvUnit: 6,   unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6524,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 27, hpvUnit: 9,   unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6533,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 28, hpvUnit: 12,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6533,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 29, hpvUnit: 15,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6538,    structureType: "Villa",         status: "Vacant", views: "Polo Field 3" },
  { serialNo: 30, hpvUnit: 18,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6533,    structureType: "Villa",         status: "Vacant", views: "Polo Field 3" },
  { serialNo: 31, hpvUnit: 21,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6531,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 32, hpvUnit: 24,  unitType: "5BR", salePrice: 14900000, buaSqft: 4811, areaSqft: 7290,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 33, hpvUnit: 27,  unitType: "5BR", salePrice: 14900000, buaSqft: 4811, areaSqft: 7348,    structureType: "Villa",         status: "Vacant", views: "Polo Field 3" },
  { serialNo: 34, hpvUnit: 30,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6540,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 35, hpvUnit: 33,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6529,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 36, hpvUnit: 36,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6536,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 37, hpvUnit: 39,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6535,    structureType: "Villa",         status: "Vacant", views: "Polo Field 3" },
  { serialNo: 38, hpvUnit: 42,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6541,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 39, hpvUnit: 45,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6520,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 40, hpvUnit: 46,  unitType: "5BR", salePrice: 13900000, buaSqft: 4811, areaSqft: 6533,    structureType: "Villa",         status: "Rented", views: "Polo Field 3" },
  { serialNo: 41, hpvUnit: 117, unitType: "5BR", salePrice: 12900000, buaSqft: 4763, areaSqft: 7033,    structureType: "Villa",         status: "Rented", views: "Community" },
  { serialNo: 42, hpvUnit: 118, unitType: "5BR", salePrice: 12900000, buaSqft: 4763, areaSqft: 7190,    structureType: "Villa",         status: "Rented", views: "Community" },
  { serialNo: 43, hpvUnit: 119, unitType: "5BR", salePrice: 12900000, buaSqft: 4763, areaSqft: 7371,    structureType: "Villa",         status: "Rented", views: "Community" },
  { serialNo: 44, hpvUnit: 120, unitType: "5BR", salePrice: 12900000, buaSqft: 4763, areaSqft: 7573,    structureType: "Villa",         status: "Vacant", views: "Community" },
  { serialNo: 45, hpvUnit: 121, unitType: "6BR", salePrice: 26000000, buaSqft: 10468, areaSqft: 13204,  structureType: "Villa",         status: "Vacant", views: "Stick & Ball Field" },
  { serialNo: 46, hpvUnit: 122, unitType: "6BR", salePrice: 26000000, buaSqft: 10468, areaSqft: 13204,  structureType: "Villa",         status: "Rented", views: "Stick & Ball Field" },
  { serialNo: 47, hpvUnit: 123, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6381,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 48, hpvUnit: 124, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6388,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 49, hpvUnit: 125, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6417,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 50, hpvUnit: 126, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6438,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 51, hpvUnit: 127, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6425,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 52, hpvUnit: 128, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6431,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 53, hpvUnit: 129, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6415,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 54, hpvUnit: 130, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6391,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
  { serialNo: 55, hpvUnit: 131, unitType: "4BR", salePrice: 16999999, buaSqft: 6512, areaSqft: 6408,    structureType: "Villa",         status: "Hotel",  views: "Stable View" },
];

// Seed inventory once on startup
let seeded = false;
async function seedInventory() {
  if (seeded) return;
  seeded = true;
  try {
    const existing = await db.select({ id: habtoorInventory.id }).from(habtoorInventory).limit(1);
    if (existing.length > 0) return;
    await db.insert(habtoorInventory).values(INVENTORY_SEED);
    console.log("[Habtoor] Inventory seeded — 55 properties");
  } catch (err) {
    console.error("[Habtoor] Seed error:", err);
    seeded = false;
  }
}
seedInventory();

// ── Helper: mask property for public API (never expose HPV unit number) ──────────────────────
function maskProperty(p: typeof habtoorInventory.$inferSelect) {
  const { hpvUnit: _hpv, ...safe } = p as any;
  return safe;
}

// ── GET /api/habtoor/inventory ────────────────────────────────────────────────────────────────
router.get("/inventory", async (req: Request, res: Response) => {
  try {
    await seedInventory();
    const props = await db
      .select()
      .from(habtoorInventory)
      .where(eq(habtoorInventory.isActive, true))
      .orderBy(habtoorInventory.serialNo);
    res.json(props.map(maskProperty));
  } catch (err) {
    console.error("[Habtoor] inventory error:", err);
    res.status(500).json({ error: "Failed to load inventory" });
  }
});

// ── POST /api/habtoor/nda ─────────────────────────────────────────────────────────────────────
router.post("/nda", async (req: Request, res: Response) => {
  try {
    const schema = insertBrokerNdaSchema.extend({
      brokerPhone: z.string().min(7),
      brokerName: z.string().min(2),
    });
    const data = schema.parse(req.body);

    // Check blacklist
    const blacklisted = await db
      .select()
      .from(brokerBlacklist)
      .where(eq(brokerBlacklist.brokerPhone, data.brokerPhone))
      .limit(1);
    if (blacklisted.length > 0) {
      return res.status(403).json({ error: "ACCESS_DENIED", message: "This number has been restricted from the DeliWer network." });
    }

    // Upsert NDA (re-accept allowed)
    const [record] = await db
      .insert(brokerNdaAcceptance)
      .values({
        ...data,
        ipAddress: (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "",
        userAgent: req.headers["user-agent"] || "",
      })
      .returning();

    res.json({ success: true, ndaId: record.id, acceptedAt: record.acceptedAt });
  } catch (err: any) {
    if (err?.name === "ZodError") return res.status(400).json({ error: "Validation failed", details: err.errors });
    console.error("[Habtoor] NDA error:", err);
    res.status(500).json({ error: "Failed to record NDA acceptance" });
  }
});

// ── GET /api/habtoor/nda-status?phone=xxx ────────────────────────────────────────────────────
router.get("/nda-status", async (req: Request, res: Response) => {
  const phone = req.query.phone as string;
  if (!phone) return res.status(400).json({ error: "phone required" });

  // Check blacklist first
  const blacklisted = await db
    .select()
    .from(brokerBlacklist)
    .where(eq(brokerBlacklist.brokerPhone, phone))
    .limit(1);
  if (blacklisted.length > 0) {
    return res.json({ accepted: false, blacklisted: true, reason: blacklisted[0].reason });
  }

  const nda = await db
    .select()
    .from(brokerNdaAcceptance)
    .where(eq(brokerNdaAcceptance.brokerPhone, phone))
    .orderBy(desc(brokerNdaAcceptance.acceptedAt))
    .limit(1);

  res.json({ accepted: nda.length > 0, ndaId: nda[0]?.id || null, acceptedAt: nda[0]?.acceptedAt || null });
});

// ── POST /api/habtoor/claim ───────────────────────────────────────────────────────────────────
router.post("/claim", async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      propertyId: z.string().min(1),
      brokerPhone: z.string().min(7),
      brokerName: z.string().min(2),
      brokerEmail: z.string().optional(),
      reraLicense: z.string().optional(),
      brokerage: z.string().optional(),
      clientName: z.string().optional(),
      clientPhone: z.string().optional(),
      clientNationality: z.string().optional(),
      clientBudget: z.string().optional(),
      claimNotes: z.string().optional(),
    });
    const data = schema.parse(req.body);

    // Verify NDA accepted
    const nda = await db
      .select()
      .from(brokerNdaAcceptance)
      .where(eq(brokerNdaAcceptance.brokerPhone, data.brokerPhone))
      .limit(1);
    if (nda.length === 0) {
      return res.status(403).json({ error: "NDA_REQUIRED", message: "You must accept the NDA/NCA before claiming leads." });
    }

    // Check blacklist
    const blacklisted = await db
      .select()
      .from(brokerBlacklist)
      .where(eq(brokerBlacklist.brokerPhone, data.brokerPhone))
      .limit(1);
    if (blacklisted.length > 0) {
      return res.status(403).json({ error: "ACCESS_DENIED" });
    }

    // Verify property exists
    const prop = await db
      .select()
      .from(habtoorInventory)
      .where(and(eq(habtoorInventory.id, data.propertyId), eq(habtoorInventory.isActive, true)))
      .limit(1);
    if (prop.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Generate audit ref code
    const refCode = `DLW-HPV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    // Set expiry: 60 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 60);

    const [claim] = await db
      .insert(propertyLeadClaims)
      .values({
        ...data,
        deliwerRefCode: refCode,
        expiresAt,
        ipAddress: (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "",
      })
      .returning();

    // Increment claims counter
    await db
      .update(habtoorInventory)
      .set({ claimsCount: prop[0].claimsCount + 1 })
      .where(eq(habtoorInventory.id, data.propertyId));

    res.json({
      success: true,
      claimId: claim.id,
      deliwerRefCode: refCode,
      expiresAt,
      property: maskProperty(prop[0]),
    });
  } catch (err: any) {
    if (err?.name === "ZodError") return res.status(400).json({ error: "Validation failed", details: err.errors });
    console.error("[Habtoor] claim error:", err);
    res.status(500).json({ error: "Failed to create claim" });
  }
});

// ── GET /api/habtoor/my-claims?phone=xxx ─────────────────────────────────────────────────────
router.get("/my-claims", async (req: Request, res: Response) => {
  const phone = req.query.phone as string;
  if (!phone) return res.status(400).json({ error: "phone required" });

  const claims = await db
    .select()
    .from(propertyLeadClaims)
    .where(eq(propertyLeadClaims.brokerPhone, phone))
    .orderBy(desc(propertyLeadClaims.claimedAt))
    .limit(50);

  // Fetch matching properties (masked)
  const enriched = await Promise.all(
    claims.map(async (c) => {
      const [prop] = await db
        .select()
        .from(habtoorInventory)
        .where(eq(habtoorInventory.id, c.propertyId))
        .limit(1);
      return { ...c, property: prop ? maskProperty(prop) : null };
    })
  );

  res.json(enriched);
});

// ── POST /api/habtoor/deal-report ─────────────────────────────────────────────────────────────
router.post("/deal-report", async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      claimId: z.string().min(1),
      propertyId: z.string().min(1),
      brokerPhone: z.string().min(7),
      brokerName: z.string().min(2),
      closingPrice: z.number().optional(),
      tenantName: z.string().optional(),
      tenantPhone: z.string().optional(),
      tenantEmail: z.string().optional(),
      tenantNationality: z.string().optional(),
      reraTransactionNo: z.string().optional(),
      closingChannel: z.string().optional().default("deliwer"),
      deliwerCommissionAed: z.number().optional(),
      brokerCommissionAed: z.number().optional(),
      notes: z.string().optional(),
    });
    const data = schema.parse(req.body);

    // Verify claim belongs to broker
    const [claim] = await db
      .select()
      .from(propertyLeadClaims)
      .where(and(eq(propertyLeadClaims.id, data.claimId), eq(propertyLeadClaims.brokerPhone, data.brokerPhone)))
      .limit(1);
    if (!claim) {
      return res.status(403).json({ error: "Claim not found or does not belong to you" });
    }

    const [report] = await db
      .insert(dealClosureReports)
      .values(data)
      .returning();

    // Update claim status
    await db
      .update(propertyLeadClaims)
      .set({ status: "closed", closedAt: new Date() })
      .where(eq(propertyLeadClaims.id, data.claimId));

    res.json({ success: true, reportId: report.id, verificationStatus: report.verificationStatus });
  } catch (err: any) {
    if (err?.name === "ZodError") return res.status(400).json({ error: "Validation failed", details: err.errors });
    console.error("[Habtoor] deal-report error:", err);
    res.status(500).json({ error: "Failed to submit deal report" });
  }
});

// ── POST /api/habtoor/vr-request ──────────────────────────────────────────────────────────────
router.post("/vr-request", async (req: Request, res: Response) => {
  try {
    const schema = insertVirtualTourRequestSchema.extend({
      propertyId: z.string().min(1),
      brokerPhone: z.string().min(7),
      brokerName: z.string().min(2),
    });
    const data = schema.parse(req.body);

    // Verify NDA accepted
    const nda = await db
      .select()
      .from(brokerNdaAcceptance)
      .where(eq(brokerNdaAcceptance.brokerPhone, data.brokerPhone))
      .limit(1);
    if (nda.length === 0) {
      return res.status(403).json({ error: "NDA_REQUIRED" });
    }

    const [request] = await db
      .insert(virtualTourRequests)
      .values(data)
      .returning();

    // Fetch property for WhatsApp context (masked)
    const [prop] = await db
      .select()
      .from(habtoorInventory)
      .where(eq(habtoorInventory.id, data.propertyId))
      .limit(1);

    res.json({
      success: true,
      requestId: request.id,
      property: prop ? maskProperty(prop) : null,
      whatsappUrl: `https://wa.me/971523906019?text=${encodeURIComponent(
        `VR Tour Request — Ref: ${request.id.slice(0, 8).toUpperCase()}\nBroker: ${data.brokerName} (${data.brokerPhone})\nProperty: ${prop?.unitType || ""} ${prop?.structureType || ""} | ${prop?.views || ""} | AED ${prop?.salePrice?.toLocaleString() || ""}\nTour Type: ${data.tourType}\nPreferred: ${data.preferredDate || "Flexible"} ${data.preferredTime || ""}\nClient: ${data.clientName || "TBC"}`
      )}`,
    });
  } catch (err: any) {
    if (err?.name === "ZodError") return res.status(400).json({ error: "Validation failed", details: err.errors });
    console.error("[Habtoor] vr-request error:", err);
    res.status(500).json({ error: "Failed to submit VR request" });
  }
});

// ── GET /api/habtoor/blacklist-check?phone=xxx ────────────────────────────────────────────────
router.get("/blacklist-check", async (req: Request, res: Response) => {
  const phone = req.query.phone as string;
  if (!phone) return res.status(400).json({ error: "phone required" });
  const result = await db
    .select()
    .from(brokerBlacklist)
    .where(eq(brokerBlacklist.brokerPhone, phone))
    .limit(1);
  res.json({ blacklisted: result.length > 0, reason: result[0]?.reason || null });
});

// ── Admin middleware ──────────────────────────────────────────────────────────────────────────
function adminOnly(req: Request, res: Response, next: () => void) {
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token !== process.env.ADMIN_SECRET && token !== "deliwer-admin-2026") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ── GET /api/habtoor/admin/stats ──────────────────────────────────────────────────────────────
router.get("/admin/stats", adminOnly, async (_req: Request, res: Response) => {
  try {
    const [props, ndas, claims, deals, tours, blacklisted] = await Promise.all([
      db.select().from(habtoorInventory),
      db.select().from(brokerNdaAcceptance),
      db.select().from(propertyLeadClaims),
      db.select().from(dealClosureReports),
      db.select().from(virtualTourRequests),
      db.select().from(brokerBlacklist),
    ]);
    const activeClaims = claims.filter(c => c.status === "active");
    const closedDeals = deals.filter(d => d.verificationStatus !== "fraud");
    const totalRevenue = closedDeals.reduce((sum, d) => sum + (d.deliwerCommissionAed || 0), 0);
    res.json({
      inventory: { total: props.length, vacant: props.filter(p => p.status === "Vacant").length, rented: props.filter(p => p.status === "Rented").length, hotel: props.filter(p => p.status === "Hotel").length },
      brokers: { nda: ndas.length, blacklisted: blacklisted.length },
      claims: { total: claims.length, active: activeClaims.length, closed: claims.filter(c => c.status === "closed").length },
      deals: { total: deals.length, verified: deals.filter(d => d.verificationStatus === "verified").length, pending: deals.filter(d => d.verificationStatus === "pending").length },
      tours: { total: tours.length, pending: tours.filter(t => t.status === "pending").length, live: tours.filter(t => t.tourType === "live").length },
      revenue: { deliwerCommissionAed: totalRevenue },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load stats" });
  }
});

// ── GET /api/habtoor/admin/claims ─────────────────────────────────────────────────────────────
router.get("/admin/claims", adminOnly, async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    let rows = await db.select().from(propertyLeadClaims).orderBy(desc(propertyLeadClaims.claimedAt)).limit(200);
    if (status) rows = rows.filter(r => r.status === status);
    const enriched = await Promise.all(rows.map(async (c) => {
      const [prop] = await db.select().from(habtoorInventory).where(eq(habtoorInventory.id, c.propertyId)).limit(1);
      return { ...c, property: prop ? maskProperty(prop) : null };
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: "Failed to load claims" });
  }
});

// ── GET /api/habtoor/admin/deal-reports ───────────────────────────────────────────────────────
router.get("/admin/deal-reports", adminOnly, async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(dealClosureReports).orderBy(desc(dealClosureReports.reportedAt)).limit(200);
    const enriched = await Promise.all(rows.map(async (d) => {
      const [prop] = await db.select().from(habtoorInventory).where(eq(habtoorInventory.id, d.propertyId)).limit(1);
      return { ...d, property: prop ? maskProperty(prop) : null };
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: "Failed to load deal reports" });
  }
});

// ── GET /api/habtoor/admin/vr-requests ────────────────────────────────────────────────────────
router.get("/admin/vr-requests", adminOnly, async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(virtualTourRequests).orderBy(desc(virtualTourRequests.requestedAt)).limit(200);
    const enriched = await Promise.all(rows.map(async (t) => {
      const [prop] = await db.select().from(habtoorInventory).where(eq(habtoorInventory.id, t.propertyId)).limit(1);
      return { ...t, property: prop ? maskProperty(prop) : null };
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: "Failed to load VR requests" });
  }
});

// ── GET /api/habtoor/admin/ndas ───────────────────────────────────────────────────────────────
router.get("/admin/ndas", adminOnly, async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(brokerNdaAcceptance).orderBy(desc(brokerNdaAcceptance.acceptedAt)).limit(200);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to load NDAs" });
  }
});

// ── GET /api/habtoor/admin/blacklist ──────────────────────────────────────────────────────────
router.get("/admin/blacklist", adminOnly, async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(brokerBlacklist).orderBy(desc(brokerBlacklist.blacklistedAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to load blacklist" });
  }
});

// ── PATCH /api/habtoor/admin/claims/:id — update status ──────────────────────────────────────
router.patch("/admin/claims/:id", adminOnly, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["active","closed","expired","disputed","blacklisted"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  await db.update(propertyLeadClaims).set({ status }).where(eq(propertyLeadClaims.id, id));
  res.json({ success: true });
});

// ── PATCH /api/habtoor/admin/deal-reports/:id — verify/dispute ───────────────────────────────
router.patch("/admin/deal-reports/:id", adminOnly, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { verificationStatus } = req.body;
  if (!["pending","verified","disputed","fraud"].includes(verificationStatus)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  await db.update(dealClosureReports).set({ verificationStatus }).where(eq(dealClosureReports.id, id));
  res.json({ success: true });
});

// ── DELETE /api/habtoor/admin/blacklist/:phone ────────────────────────────────────────────────
router.delete("/admin/blacklist/:phone", adminOnly, async (req: Request, res: Response) => {
  const phone = decodeURIComponent(req.params.phone);
  await db.delete(brokerBlacklist).where(eq(brokerBlacklist.brokerPhone, phone));
  res.json({ success: true, message: `Broker ${phone} removed from blacklist` });
});

// ── POST /api/habtoor/blacklist (admin only — simple token guard) ─────────────────────────────
router.post("/blacklist", async (req: Request, res: Response) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_SECRET && token !== "deliwer-admin-2026") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { brokerPhone, brokerName, brokerEmail, reraLicense, reason, evidenceNotes } = req.body;
  if (!brokerPhone || !reason) return res.status(400).json({ error: "brokerPhone and reason required" });

  await db
    .insert(brokerBlacklist)
    .values({ brokerPhone, brokerName, brokerEmail, reraLicense, reason, evidenceNotes, addedBy: "admin" })
    .onConflictDoUpdate({ target: brokerBlacklist.brokerPhone, set: { reason, evidenceNotes, blacklistedAt: new Date() } });

  res.json({ success: true, message: `Broker ${brokerPhone} blacklisted for: ${reason}` });
});

export default router;
