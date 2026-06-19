import { Router } from "express";
import { db } from "../db";
import { snaggingRequests, snaggingBrokerReferrals, snaggingDeveloperLeads } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { sendWhatsApp } from "../utils/sendWhatsApp";

const router = Router();

// ── Calculate lead score for a snagging request ───────────────────────────────
function calcLeadScore(data: any): number {
  let score = 20; // base: inspection booked
  if (data.serviceType === "move-in-readiness") score += 30;
  else if (data.serviceType === "premium") score += 15;
  else if (data.serviceType === "remote") score += 10;
  if (data.source === "broker") score += 10;
  if (data.preferredDate) score += 5;
  return score;
}

// ── POST /api/snagging/request ─────────────────────────────────────────────────
router.post("/request", async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.phone || !data.email || !data.serviceType) {
      return res.status(400).json({ error: "name, phone, email and serviceType are required" });
    }

    const leadScore = calcLeadScore(data);
    const tags = ["snagging", "handover", "property-owner", "high-intent"];
    if (data.serviceType === "move-in-readiness") tags.push("move-in");

    const [request] = await db.insert(snaggingRequests).values({
      ...data,
      leadScore,
      crmTags: tags,
    }).returning();

    // WhatsApp notify (non-blocking)
    const msg = `🏠 *New Snagging Request*\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.serviceType}\nArea: ${data.communityArea || "TBD"}\nDate: ${data.preferredDate || "Flexible"}\nScore: ${leadScore}`;
    sendWhatsApp(process.env.ADMIN_WHATSAPP || "+971504547110", msg).catch(() => {});

    res.status(201).json({ success: true, id: request.id, leadScore });
  } catch (err) {
    console.error("[SNAGGING] request error:", err);
    res.status(500).json({ error: "Failed to submit snagging request" });
  }
});

// ── POST /api/snagging/broker-referral ────────────────────────────────────────
router.post("/broker-referral", async (req, res) => {
  try {
    const data = req.body;
    if (!data.brokerName || !data.brokerPhone || !data.clientName || !data.clientPhone) {
      return res.status(400).json({ error: "brokerName, brokerPhone, clientName, clientPhone required" });
    }

    // Also create a snagging request from the broker referral
    const leadScore = calcLeadScore({ ...data, source: "broker" }) + 10;
    const [snagReq] = await db.insert(snaggingRequests).values({
      name: data.clientName,
      email: data.clientEmail || "",
      phone: data.clientPhone,
      communityArea: data.communityArea,
      serviceType: data.serviceType || "basic",
      source: "broker",
      leadScore,
      crmTags: ["snagging", "broker-referral", "handover", "high-intent"],
    }).returning();

    const [referral] = await db.insert(snaggingBrokerReferrals).values({
      ...data,
      snaggingRequestId: snagReq.id,
    }).returning();

    const msg = `🤝 *Broker Snagging Referral*\nBroker: ${data.brokerName} (${data.brokerPhone})\nClient: ${data.clientName}\nArea: ${data.communityArea || "TBD"}`;
    sendWhatsApp(process.env.ADMIN_WHATSAPP || "+971504547110", msg).catch(() => {});

    res.status(201).json({ success: true, referralId: referral.id, requestId: snagReq.id });
  } catch (err) {
    console.error("[SNAGGING] broker-referral error:", err);
    res.status(500).json({ error: "Failed to submit broker referral" });
  }
});

// ── POST /api/snagging/developer-enquiry ──────────────────────────────────────
router.post("/developer-enquiry", async (req, res) => {
  try {
    const data = req.body;
    if (!data.developerName || !data.projectName || !data.contactPerson || !data.email || !data.mobile) {
      return res.status(400).json({ error: "developerName, projectName, contactPerson, email, mobile required" });
    }

    const [lead] = await db.insert(snaggingDeveloperLeads).values(data).returning();

    const msg = `🏗️ *Developer Snagging Enquiry*\nDeveloper: ${data.developerName}\nProject: ${data.projectName}\nUnits: ${data.numberOfUnits || "TBD"}\nHandover: ${data.expectedHandoverDate || "TBD"}\nContact: ${data.contactPerson} — ${data.mobile}`;
    sendWhatsApp(process.env.ADMIN_WHATSAPP || "+971504547110", msg).catch(() => {});

    res.status(201).json({ success: true, id: lead.id });
  } catch (err) {
    console.error("[SNAGGING] developer-enquiry error:", err);
    res.status(500).json({ error: "Failed to submit developer enquiry" });
  }
});

// ── GET /api/snagging/requests (admin) ────────────────────────────────────────
router.get("/requests", async (req, res) => {
  try {
    const requests = await db.select().from(snaggingRequests).orderBy(desc(snaggingRequests.createdAt)).limit(200);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// ── GET /api/snagging/broker-referrals (admin) ────────────────────────────────
router.get("/broker-referrals", async (req, res) => {
  try {
    const referrals = await db.select().from(snaggingBrokerReferrals).orderBy(desc(snaggingBrokerReferrals.createdAt)).limit(200);
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch referrals" });
  }
});

// ── GET /api/snagging/developer-leads (admin) ─────────────────────────────────
router.get("/developer-leads", async (req, res) => {
  try {
    const leads = await db.select().from(snaggingDeveloperLeads).orderBy(desc(snaggingDeveloperLeads.createdAt)).limit(200);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch developer leads" });
  }
});

// ── PATCH /api/snagging/requests/:id/status (admin) ───────────────────────────
router.patch("/requests/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "scheduled", "in-progress", "completed", "converted"];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: "Invalid status" });

    let extraScore = 0;
    if (status === "completed") extraScore = 30;
    if (status === "converted") extraScore = 50;

    const [updated] = await db.update(snaggingRequests)
      .set({
        status,
        leadScore: extraScore > 0
          ? (db.select({ s: snaggingRequests.leadScore }).from(snaggingRequests).where(eq(snaggingRequests.id, id)) as any)
          : undefined,
        updatedAt: new Date(),
      })
      .where(eq(snaggingRequests.id, id))
      .returning();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ── GET /api/snagging/stats (admin dashboard widgets) ────────────────────────
router.get("/stats", async (req, res) => {
  try {
    const requests = await db.select().from(snaggingRequests);
    const referrals = await db.select().from(snaggingBrokerReferrals);
    const developerLeads = await db.select().from(snaggingDeveloperLeads);

    const stats = {
      totalLeads: requests.length,
      brokerLeads: requests.filter(r => r.source === "broker").length,
      developerLeads: developerLeads.length,
      completedInspections: requests.filter(r => r.status === "completed" || r.status === "converted").length,
      serviceConversions: requests.filter(r => r.status === "converted").length,
      pendingRequests: requests.filter(r => r.status === "pending").length,
      scheduledRequests: requests.filter(r => r.status === "scheduled").length,
      brokerReferralsTotal: referrals.length,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
