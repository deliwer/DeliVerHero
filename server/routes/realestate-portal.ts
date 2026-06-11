import { Router, type Request, type Response } from "express";
import { db } from "../db";
import { realEstateBrokerCircle, viewingRequests } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

// POST /api/realestate/apply  — broker inner-circle application + NDA acceptance
router.post("/apply", async (req: Request, res: Response) => {
  try {
    const { name, phone, email, reraNumber, brokerage, areasOfInterest, ndaAccepted } = req.body;
    if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });
    if (!ndaAccepted) return res.status(400).json({ error: "NDA acceptance is required" });

    const [row] = await db.insert(realEstateBrokerCircle).values({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      reraNumber: reraNumber?.trim() || null,
      brokerage: brokerage?.trim() || null,
      areasOfInterest: Array.isArray(areasOfInterest) ? areasOfInterest : [],
      ndaAccepted: true,
      ndaAcceptedAt: new Date(),
      status: "pending",
      ipAddress: req.ip || null,
    }).returning();

    console.log(`[RealEstate] Inner circle application: ${name} (${phone})`);
    res.status(201).json({ success: true, id: row.id });
  } catch (err: any) {
    console.error("[RealEstate] apply error:", err);
    res.status(500).json({ error: "Failed to submit application" });
  }
});

// POST /api/realestate/viewing-inquiry — tenant submits area-based viewing interest
router.post("/viewing-inquiry", async (req: Request, res: Response) => {
  try {
    const { requesterName, requesterPhone, area, message, preferredDate } = req.body;
    if (!requesterName || !requesterPhone || !area) {
      return res.status(400).json({ error: "Name, phone and area are required" });
    }

    const [row] = await db.insert(viewingRequests).values({
      listingId: `area-inquiry-${Date.now()}`,
      listingTitle: `Area Inquiry — ${area}`,
      listingArea: area,
      requesterName: requesterName.trim(),
      requesterPhone: requesterPhone.trim(),
      preferredDate: preferredDate || null,
      message: message?.trim() || null,
      status: "pending",
    }).returning();

    console.log(`[RealEstate] Viewing inquiry: ${requesterName} → ${area}`);
    res.status(201).json({ success: true, id: row.id });
  } catch (err: any) {
    console.error("[RealEstate] viewing-inquiry error:", err);
    res.status(500).json({ error: "Failed to submit viewing inquiry" });
  }
});

// GET /api/realestate/applications — admin: list inner-circle applications
router.get("/applications", async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(realEstateBrokerCircle).orderBy(desc(realEstateBrokerCircle.createdAt));
    res.json(rows);
  } catch (err: any) {
    console.error("[RealEstate] applications error:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// PATCH /api/realestate/applications/:id/status — admin: approve or reject
router.patch("/applications/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    await db.update(realEstateBrokerCircle)
      .set({ status, ...(status === "approved" ? { verifiedAt: new Date() } : {}) })
      .where(eq(realEstateBrokerCircle.id, id));
    res.json({ success: true });
  } catch (err: any) {
    console.error("[RealEstate] status update error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
