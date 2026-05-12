import { Router } from "express";
import { db } from "../db";
import { flexListings, insertFlexListingSchema } from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { z } from "zod";
import { storage } from "../storage";

const router = Router();

// ── GET /api/flex-listings ────────────────────────────────────────────────────
// Returns all active (or pending) listings for the public page
router.get("/", async (req, res) => {
  try {
    const statusFilter = (req.query.status as string) || undefined;
    let rows: any[] = [];
    try {
      const query = db
        .select()
        .from(flexListings)
        .orderBy(desc(flexListings.createdAt));
      if (statusFilter) {
        rows = await query.where(eq(flexListings.status, statusFilter));
      } else {
        rows = await query;
      }
    } catch {
      rows = await storage.getFlexListings(statusFilter);
    }
    res.json({ listings: rows });
  } catch (err) {
    console.error("flex-listings GET error:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

// ── GET /api/flex-listings/stats ─────────────────────────────────────────────
// Returns counts for the broker availability panel
router.get("/stats", async (req, res) => {
  try {
    let counts: Record<string, number> = {};
    try {
      const rows = await db
        .select({ status: flexListings.status, count: sql<number>`count(*)::int` })
        .from(flexListings)
        .groupBy(flexListings.status);
      for (const r of rows) counts[r.status] = r.count;
    } catch {
      const all = await storage.getFlexListings();
      for (const l of all) counts[l.status] = (counts[l.status] || 0) + 1;
    }
    const active = (counts["active"] || 0) + (counts["pending"] || 0);
    const filled = counts["filled"] || 0;
    res.json({ active, filled, total: active + filled, byStatus: counts });
  } catch (err) {
    console.error("flex-listings stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ── POST /api/flex-listings ───────────────────────────────────────────────────
// Manager submits a new listing
router.post("/", async (req, res) => {
  try {
    const data = insertFlexListingSchema.parse({
      ...req.body,
      status: "pending",
      amenities: Array.isArray(req.body.amenities) ? req.body.amenities : [],
    });
    let listing: any;
    try {
      const [row] = await db.insert(flexListings).values(data).returning();
      listing = row;
    } catch {
      listing = await storage.createFlexListing(data);
    }
    res.status(201).json({ listing });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", issues: err.errors });
    }
    console.error("flex-listings POST error:", err);
    res.status(500).json({ error: "Failed to save listing" });
  }
});

// ── PATCH /api/flex-listings/:id/status ──────────────────────────────────────
// Manager or admin marks a listing as active / filled / pending
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = z.object({ status: z.enum(["pending", "active", "filled"]) }).parse(req.body);
    let listing: any;
    try {
      const [row] = await db
        .update(flexListings)
        .set({ status })
        .where(eq(flexListings.id, id))
        .returning();
      listing = row;
    } catch {
      listing = await storage.updateFlexListingStatus(id, status);
    }
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json({ listing });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid status" });
    }
    console.error("flex-listings PATCH error:", err);
    res.status(500).json({ error: "Failed to update listing" });
  }
});

export default router;
