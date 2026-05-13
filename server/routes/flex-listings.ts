import { Router } from "express";
import { db } from "../db";
import {
  flexListings, insertFlexListingSchema,
  flexListingReviews, insertFlexListingReviewSchema,
  viewingRequests, insertViewingRequestSchema,
} from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { z } from "zod";
import { storage } from "../storage";

const router = Router();

// ── GET /api/flex-listings ────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const statusFilter = (req.query.status as string) || undefined;
    let rows: any[] = [];
    try {
      const query = db.select().from(flexListings).orderBy(desc(flexListings.createdAt));
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

// ── GET /api/flex-listings/stats ──────────────────────────────────────────────
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

// ── GET /api/flex-listings/viewing-requests ───────────────────────────────────
// Admin: get all viewing requests
router.get("/viewing-requests", async (req, res) => {
  try {
    const status = (req.query.status as string) || undefined;
    let rows: any[] = [];
    try {
      const query = db.select().from(viewingRequests).orderBy(desc(viewingRequests.createdAt));
      if (status) {
        rows = await query.where(eq(viewingRequests.status, status));
      } else {
        rows = await query;
      }
    } catch {
      rows = await storage.getViewingRequests(status);
    }
    res.json({ requests: rows });
  } catch (err) {
    console.error("viewing-requests GET error:", err);
    res.status(500).json({ error: "Failed to fetch viewing requests" });
  }
});

// ── POST /api/flex-listings/viewing-request ───────────────────────────────────
router.post("/viewing-request", async (req, res) => {
  try {
    const data = insertViewingRequestSchema.parse({
      ...req.body,
      status: "pending",
    });
    let record: any;
    try {
      const [row] = await db.insert(viewingRequests).values(data).returning();
      record = row;
    } catch {
      record = await storage.createViewingRequest(data);
    }
    res.status(201).json({ request: record });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", issues: err.errors });
    }
    console.error("viewing-request POST error:", err);
    res.status(500).json({ error: "Failed to save viewing request" });
  }
});

// ── POST /api/flex-listings ───────────────────────────────────────────────────
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

// ── GET /api/flex-listings/:id/reviews ───────────────────────────────────────
router.get("/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    let rows: any[] = [];
    try {
      rows = await db
        .select()
        .from(flexListingReviews)
        .where(eq(flexListingReviews.listingId, id))
        .orderBy(desc(flexListingReviews.createdAt));
    } catch {
      rows = await storage.getFlexListingReviews(id);
    }
    res.json({ reviews: rows });
  } catch (err) {
    console.error("flex-reviews GET error:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ── POST /api/flex-listings/:id/reviews ──────────────────────────────────────
router.post("/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const data = insertFlexListingReviewSchema.parse({
      ...req.body,
      listingId: id,
      verified: !!(req.body.reviewerPhone),
    });
    let review: any;
    try {
      const [row] = await db.insert(flexListingReviews).values(data).returning();
      review = row;
    } catch {
      review = await storage.createFlexListingReview(data);
    }
    res.status(201).json({ review });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", issues: err.errors });
    }
    console.error("flex-reviews POST error:", err);
    res.status(500).json({ error: "Failed to save review" });
  }
});

// ── PATCH /api/flex-listings/:id/status ──────────────────────────────────────
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
