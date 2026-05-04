import { Router } from "express";
import { db } from "../db";
import { tenantLeads, tenantReferrers, insertTenantLeadSchema, insertTenantReferrerSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import QRCode from "qrcode";
import { nanoid } from "nanoid";

const router = Router();

router.post("/leads", async (req, res) => {
  try {
    const data = insertTenantLeadSchema.parse(req.body);
    let score = 0;
    if (data.timeline === "immediate") score += 40;
    else if (data.timeline === "1-month") score += 20;
    if ((data.servicesNeeded || []).includes("property")) score += 30;
    if ((data.servicesNeeded || []).length > 2) score += 10;

    const [lead] = await db.insert(tenantLeads).values({ ...data, score }).returning();

    let waNumber = "971523946311";
    if (data.referrerId) {
      const refs = await db.select().from(tenantReferrers).where(eq(tenantReferrers.refId, data.referrerId));
      if (refs[0]?.whatsapp) waNumber = refs[0].whatsapp.replace(/\D/g, "");
    }

    const services = (data.servicesNeeded || []).join(", ") || "General enquiry";
    const message = `Hi, I just submitted my home setup request:\n\nName: ${data.name}\nLocation: ${data.location || "Not specified"}\nNeed: ${services}\nTimeline: ${data.timeline || "Not specified"}\n\nPlease assist.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    res.json({ lead, waUrl });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/leads", async (req, res) => {
  try {
    const leads = await db.select().from(tenantLeads).orderBy(desc(tenantLeads.createdAt));
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/leads/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const [lead] = await db.update(tenantLeads).set({ status }).where(eq(tenantLeads.id, req.params.id)).returning();
    res.json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/leads/export", async (req, res) => {
  try {
    const leads = await db.select().from(tenantLeads).orderBy(desc(tenantLeads.createdAt));
    const headers = ["id", "name", "phone", "intent", "services", "property_type", "location", "budget", "timeline", "referrer_id", "status", "score", "created_at"];
    const rows = leads.map(l => [
      l.id, `"${l.name}"`, l.phone, l.intent,
      `"${(l.servicesNeeded || []).join("|")}"`,
      l.propertyType || "", `"${l.location || ""}"`, l.budget || "",
      l.timeline || "", l.referrerId || "", l.status, l.score,
      l.createdAt?.toISOString() || "",
    ].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="tenant-leads.csv"');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/referrers", async (req, res) => {
  try {
    const refs = await db.select().from(tenantReferrers).orderBy(desc(tenantReferrers.createdAt));
    res.json(refs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/referrers", async (req, res) => {
  try {
    const data = insertTenantReferrerSchema.parse({
      ...req.body,
      refId: req.body.refId || `DXB${nanoid(4).toUpperCase()}`,
    });
    const [ref] = await db.insert(tenantReferrers).values(data).returning();
    res.json(ref);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/referrers/:id", async (req, res) => {
  try {
    await db.delete(tenantReferrers).where(eq(tenantReferrers.id, req.params.id));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/referrers/:refId/qr", async (req, res) => {
  try {
    const domain = process.env.REPLIT_DEV_DOMAIN || "deliwer.com";
    const url = `https://${domain}/capture?ref=${req.params.refId}`;
    const qr = await QRCode.toDataURL(url, { width: 300, margin: 2 });
    res.json({ qr, url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Seed sample referrer on startup ──────────────────────────────────────────
async function seedSampleReferrer() {
  try {
    const existing = await db.select().from(tenantReferrers).limit(1);
    if (existing.length === 0) {
      await db.insert(tenantReferrers).values({
        name: "DeliWer Demo (Building Guard)",
        whatsapp: "+971523946311",
        refId: "DEMO01",
      });
      console.log("[tenant-capture] Sample referrer seeded: DEMO01");
    }
  } catch (err) {
    console.warn("[tenant-capture] Could not seed sample referrer:", err);
  }
}
seedSampleReferrer();

export default router;
