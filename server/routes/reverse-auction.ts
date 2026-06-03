import { Router } from "express";
import { db } from "../db";
import { reverseAuctionEvents, reverseAuctionBids } from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

const router = Router();

// ── KT Corp real event seed (isDemo: false) ───────────────────────────────────
// supplierRef is confidential — never returned to the frontend
// Deadline: next Friday 18:00 Dubai time (UTC+4 = 14:00 UTC)
function nextFriday1800Dubai(): Date {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun, 5=Fri
  const daysUntilFriday = ((5 - day) + 7) % 7 || 7;
  const friday = new Date(now);
  friday.setUTCDate(now.getUTCDate() + daysUntilFriday);
  friday.setUTCHours(14, 0, 0, 0); // 18:00 Dubai = 14:00 UTC
  return friday;
}

async function seedRealEvent() {
  try {
    const existing = await db.select({ id: reverseAuctionEvents.id })
      .from(reverseAuctionEvents)
      .where(eq(reverseAuctionEvents.slug, "iphone17-pro-max-usa-jun2025"))
      .limit(1);

    if (existing.length > 0) return;

    await db.insert(reverseAuctionEvents).values({
      slug: "iphone17-pro-max-usa-jun2025",
      title: "USA iPhone 17 Pro Max — Reverse Bidding Event",
      campaignName: "USA iPhone 17 Pro Max Reverse Bidding Event",
      description: "Available USA inventory being allocated this week. Submit your quantity requirement and target purchase price. ChainTrack will aggregate demand and negotiate allocations with the supplier.",
      deadline: nextFriday1800Dubai(),
      supplierRef: "KTCORP-INV-2025-06",  // CONFIDENTIAL — never sent to frontend
      isDemo: false,
      stockItems: [
        { id: "silver",  model: "iPhone 17 Pro Max 256GB", color: "Desert Silver",  qty: 84, refPriceUsd: 1200, requested: 0 },
        { id: "blue",    model: "iPhone 17 Pro Max 256GB", color: "Deep Blue",       qty: 67, refPriceUsd: 1170, requested: 0 },
        { id: "orange",  model: "iPhone 17 Pro Max 256GB", color: "Cosmic Orange",   qty: 53, refPriceUsd: 1160, requested: 0 },
      ],
      status: "active",
      whatsapp: "+971523946311",
      telegram: "t.me/chaintracklogistics",
      metadata: { origin: "USA", condition: "New Sealed", hsCode: "8517.12" },
    });

    console.log("[ReverseAuction] KT Corp real event seeded — slug: iphone17-pro-max-usa-jun2025");
  } catch (err) {
    console.error("[ReverseAuction] Seed error:", err);
  }
}

seedRealEvent();

// ── Helper: strip confidential fields before sending to client ─────────────────
function sanitiseEvent(event: any) {
  const { supplierRef, ...safe } = event;
  return safe;
}

// ── GET /api/reverse-auction/events  — list active events ──────────────────────
router.get("/events", async (req, res) => {
  try {
    const events = await db.select()
      .from(reverseAuctionEvents)
      .where(eq(reverseAuctionEvents.status, "active"))
      .orderBy(desc(reverseAuctionEvents.createdAt));

    res.json(events.map(sanitiseEvent));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/reverse-auction/events/:slug ──────────────────────────────────────
router.get("/events/:slug", async (req, res) => {
  try {
    const [event] = await db.select()
      .from(reverseAuctionEvents)
      .where(eq(reverseAuctionEvents.slug, req.params.slug))
      .limit(1);

    if (!event) return res.status(404).json({ error: "Event not found" });

    // Aggregate demand per color from submitted bids
    const bids = await db.select({
      modelRequired: reverseAuctionBids.modelRequired,
      preferredColor: reverseAuctionBids.preferredColor,
      totalQty: sql<number>`SUM(${reverseAuctionBids.quantityRequired})`,
      bidCount: sql<number>`COUNT(*)`,
    })
      .from(reverseAuctionBids)
      .where(and(
        eq(reverseAuctionBids.eventId, event.id),
        eq(reverseAuctionBids.status, "submitted"),
      ))
      .groupBy(reverseAuctionBids.modelRequired, reverseAuctionBids.preferredColor);

    const demand: Record<string, { totalQty: number; bidCount: number }> = {};
    for (const b of bids) {
      const key = b.preferredColor || b.modelRequired;
      demand[key] = { totalQty: Number(b.totalQty), bidCount: Number(b.bidCount) };
    }

    res.json({ ...sanitiseEvent(event), demand });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/reverse-auction/bids  — submit a bid ─────────────────────────────
router.post("/bids", async (req, res) => {
  try {
    const {
      eventId, companyName, contactName, whatsapp, email,
      country, modelRequired, preferredColor, quantityRequired,
      targetUnitPriceUsd, destinationCountry, notes,
    } = req.body;

    if (!eventId || !companyName || !contactName || !whatsapp || !email ||
        !country || !modelRequired || !quantityRequired || !targetUnitPriceUsd || !destinationCountry) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify event exists and is still active
    const [event] = await db.select({ id: reverseAuctionEvents.id, status: reverseAuctionEvents.status, deadline: reverseAuctionEvents.deadline })
      .from(reverseAuctionEvents)
      .where(eq(reverseAuctionEvents.id, eventId))
      .limit(1);

    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.status !== "active") return res.status(400).json({ error: "Bidding is closed for this event" });
    if (new Date() > event.deadline) return res.status(400).json({ error: "Bidding deadline has passed" });

    const [bid] = await db.insert(reverseAuctionBids).values({
      eventId,
      companyName,
      contactName,
      whatsapp,
      email,
      country,
      modelRequired,
      preferredColor: preferredColor || null,
      quantityRequired: parseInt(quantityRequired),
      targetUnitPriceUsd: parseInt(targetUnitPriceUsd),
      destinationCountry,
      notes: notes || null,
      ipAddress: req.ip || req.headers["x-forwarded-for"] as string || null,
      status: "submitted",
    }).returning();

    res.json({ success: true, bidId: bid.id, message: "Bid submitted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to submit bid" });
  }
});

// ── GET /api/reverse-auction/bids/:eventId/demand  — public demand meter ──────
router.get("/bids/:eventId/demand", async (req, res) => {
  try {
    const rows = await db.select({
      preferredColor: reverseAuctionBids.preferredColor,
      modelRequired: reverseAuctionBids.modelRequired,
      totalQty: sql<number>`SUM(${reverseAuctionBids.quantityRequired})`,
      bidCount: sql<number>`COUNT(*)`,
    })
      .from(reverseAuctionBids)
      .where(and(
        eq(reverseAuctionBids.eventId, req.params.eventId),
        eq(reverseAuctionBids.status, "submitted"),
      ))
      .groupBy(reverseAuctionBids.preferredColor, reverseAuctionBids.modelRequired);

    res.json(rows.map(r => ({
      color: r.preferredColor || r.modelRequired,
      totalQty: Number(r.totalQty),
      bidCount: Number(r.bidCount),
    })));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/reverse-auction/admin/bids/:eventId  — internal use only ──────────
// This returns full bid details with no auth for internal admin use
// In production: add admin token check
router.get("/admin/bids/:eventId", async (req, res) => {
  try {
    const bids = await db.select()
      .from(reverseAuctionBids)
      .where(eq(reverseAuctionBids.eventId, req.params.eventId))
      .orderBy(desc(reverseAuctionBids.createdAt));

    res.json(bids);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
