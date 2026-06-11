import { Router } from "express";
import { db } from "../db";
import {
  partnerCandidates, insertPartnerCandidateSchema,
  zoomSessions, insertZoomSessionSchema,
  financeReferrals, insertFinanceReferralSchema,
  bnosTemplates, insertBnosTemplateSchema,
  commissionConfig, insertCommissionConfigSchema,
  brokerMaster,
} from "@shared/schema";
import { eq, desc, count, and, gte, sql } from "drizzle-orm";

const router = Router();

// ── Stats ─────────────────────────────────────────────────────────────────────
router.get("/stats", async (_req, res) => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);

    const [[totalCandidates], [todayCandidates], [weekCandidates],
           [pendingZoom], [activated], [totalBrokers],
           [totalReferrals], [openReferrals], [fundedReferrals]] = await Promise.all([
      db.select({ count: count() }).from(partnerCandidates),
      db.select({ count: count() }).from(partnerCandidates).where(gte(partnerCandidates.createdAt, today)),
      db.select({ count: count() }).from(partnerCandidates).where(gte(partnerCandidates.createdAt, weekAgo)),
      db.select({ count: count() }).from(partnerCandidates).where(eq(partnerCandidates.status, "zoom_scheduled")),
      db.select({ count: count() }).from(partnerCandidates).where(eq(partnerCandidates.status, "activated")),
      db.select({ count: count() }).from(brokerMaster).where(eq(brokerMaster.deleted, false)),
      db.select({ count: count() }).from(financeReferrals),
      db.select({ count: count() }).from(financeReferrals).where(
        sql`status NOT IN ('funded','closed')`
      ),
      db.select({ count: count() }).from(financeReferrals).where(eq(financeReferrals.status, "funded")),
    ]);

    const pipeline = await db.select({ status: partnerCandidates.status, cnt: count() })
      .from(partnerCandidates).groupBy(partnerCandidates.status);

    res.json({
      recruitment: {
        total: totalCandidates.count,
        today: todayCandidates.count,
        thisWeek: weekCandidates.count,
        pendingZoom: pendingZoom.count,
        activated: activated.count,
        pipeline,
      },
      brokers: { total: totalBrokers.count },
      finance: {
        total: totalReferrals.count,
        open: openReferrals.count,
        funded: fundedReferrals.count,
      },
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── Partner Candidates ────────────────────────────────────────────────────────
router.get("/candidates", async (req, res) => {
  try {
    const { status, type, search } = req.query as Record<string, string>;
    let q = db.select().from(partnerCandidates).orderBy(desc(partnerCandidates.createdAt));
    const rows = await q;
    let filtered = rows;
    if (status) filtered = filtered.filter(r => r.status === status);
    if (type) filtered = filtered.filter(r => r.partnerType === type);
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(s) ||
        (r.email || "").toLowerCase().includes(s) ||
        (r.mobile || "").includes(s) ||
        (r.linkedinUrl || "").toLowerCase().includes(s)
      );
    }
    res.json(filtered);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.post("/candidates", async (req, res) => {
  try {
    const parsed = insertPartnerCandidateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [row] = await db.insert(partnerCandidates).values(parsed.data).returning();
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.patch("/candidates/:id", async (req, res) => {
  try {
    const [row] = await db.update(partnerCandidates)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(partnerCandidates.id, req.params.id))
      .returning();
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.delete("/candidates/:id", async (req, res) => {
  try {
    await db.delete(partnerCandidates).where(eq(partnerCandidates.id, req.params.id));
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ── Zoom Sessions ─────────────────────────────────────────────────────────────
router.get("/zoom", async (_req, res) => {
  try {
    const rows = await db.select().from(zoomSessions).orderBy(desc(zoomSessions.zoomDate));
    res.json(rows);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/zoom/candidate/:candidateId", async (req, res) => {
  try {
    const rows = await db.select().from(zoomSessions)
      .where(eq(zoomSessions.candidateId, req.params.candidateId))
      .orderBy(desc(zoomSessions.zoomDate));
    res.json(rows);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.post("/zoom", async (req, res) => {
  try {
    const parsed = insertZoomSessionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [row] = await db.insert(zoomSessions).values(parsed.data).returning();
    // Update candidate status to zoom_scheduled
    await db.update(partnerCandidates)
      .set({ status: "zoom_scheduled", updatedAt: new Date() })
      .where(and(
        eq(partnerCandidates.id, parsed.data.candidateId),
        sql`status NOT IN ('zoom_completed','training_completed','activated')`
      ));
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.patch("/zoom/:id", async (req, res) => {
  try {
    const [row] = await db.update(zoomSessions)
      .set(req.body)
      .where(eq(zoomSessions.id, req.params.id))
      .returning();
    if (!row) return res.status(404).json({ error: "Not found" });
    // Auto-advance candidate status on completion
    if (req.body.attendanceStatus === "attended") {
      await db.update(partnerCandidates)
        .set({ status: "zoom_completed", updatedAt: new Date() })
        .where(eq(partnerCandidates.id, row.candidateId));
    }
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ── Finance Referrals ─────────────────────────────────────────────────────────
router.get("/finance-referrals", async (req, res) => {
  try {
    const { status, type } = req.query as Record<string, string>;
    let rows = await db.select().from(financeReferrals).orderBy(desc(financeReferrals.createdAt));
    if (status) rows = rows.filter(r => r.status === status);
    if (type) rows = rows.filter(r => r.fundingType === type);
    res.json(rows);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.post("/finance-referrals", async (req, res) => {
  try {
    const parsed = insertFinanceReferralSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [row] = await db.insert(financeReferrals).values(parsed.data).returning();
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.patch("/finance-referrals/:id", async (req, res) => {
  try {
    const [row] = await db.update(financeReferrals)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(financeReferrals.id, req.params.id))
      .returning();
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.delete("/finance-referrals/:id", async (req, res) => {
  try {
    await db.delete(financeReferrals).where(eq(financeReferrals.id, req.params.id));
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ── Message Templates ─────────────────────────────────────────────────────────
const DEFAULT_TEMPLATES = [
  { category: "recruitment", name: "LinkedIn Outreach", subject: "Opportunity at DeliWer",
    body: "Hi {Name},\n\nWe came across your profile on LinkedIn and believe your background in {Industry} would be a great fit for the DeliWer Partner Network.\n\nWe are actively recruiting partners across Real Estate, Finance and Business Development in Dubai.\n\nWould you be open to a quick call this week?\n\nBest regards,\nDeliWer Recruitment Team\n+971523946311",
    variables: ["Name","Industry"], isDefault: true },
  { category: "interview", name: "Interview Invitation", subject: "Interview Invitation – DeliWer Partner Network",
    body: "Hi {Name},\n\nThank you for your interest in joining the DeliWer Broker Network.\n\nWe would like to invite you for a brief interview on {Date} at {Time}.\n\nPlease confirm your availability by replying to this message or via WhatsApp: +971523946311\n\nWarm regards,\nDeliWer Team",
    variables: ["Name","Date","Time"], isDefault: true },
  { category: "zoom_invite", name: "Zoom Onboarding Invite", subject: "Your DeliWer Onboarding Session",
    body: "Hi {Name},\n\nWelcome to the DeliWer Partner Network onboarding process.\n\nYour Zoom session is scheduled for:\nDate: {Date}\nTime: {Time}\nLink: {ZoomLink}\n\nPlease join 2 minutes early.\n\nFor support: +971523946311\n\nDeliWer Team",
    variables: ["Name","Date","Time","ZoomLink"], isDefault: true },
  { category: "activation", name: "Partner Activation", subject: "You Are Now Activated – DeliWer Partner Network",
    body: "Hello {Name},\n\nWelcome to the DeliWer Broker Network.\n\nYou are now activated to introduce customers seeking financing and business opportunities.\n\nOpportunities include:\n• Property Finance\n• SME Finance\n• Working Capital\n• Trade Finance\n• Consumer Finance\n• Business Expansion Funding\n\nFor activation support:\nWhatsApp: +971523906019\n\nMarketing: https://deliwer.com/marketing\nFinance: https://deliwer.com/finance\n\nWe look forward to working with you.\nDeliWer Team",
    variables: ["Name"], isDefault: true },
  { category: "finance_intro", name: "Finance Introduction", subject: "Finance Opportunity Introduction",
    body: "Hi {BrokerName},\n\nI would like to introduce a client who is seeking {FundingType} financing.\n\nClient: {ClientName}\nRequirement: {FundingAmount}\nContact: {ClientMobile}\n\nPlease review and advise on next steps.\n\nThank you,\nDeliWer Finance\n+971523906019",
    variables: ["BrokerName","FundingType","ClientName","FundingAmount","ClientMobile"], isDefault: true },
  { category: "follow_up", name: "Follow-Up Message", subject: "Following Up – DeliWer Partner Network",
    body: "Hi {Name},\n\nI wanted to follow up regarding your application to join the DeliWer Partner Network.\n\nWe have a number of active opportunities that match your profile.\n\nAre you still interested? Please reply or contact us on WhatsApp:\n+971523946311\n\nDeliWer Recruitment",
    variables: ["Name"], isDefault: true },
  { category: "reactivation", name: "Broker Reactivation", subject: "We Miss You – DeliWer Partner Network",
    body: "Hi {Name},\n\nWe noticed it has been a while since your last activity with the DeliWer Broker Network.\n\nWe have exciting new opportunities available for active partners.\n\nTo reactivate your account please contact us:\nWhatsApp: +971523906019\n\nDeliWer Team",
    variables: ["Name"], isDefault: true },
  { category: "lead_distribution", name: "Lead Distribution", subject: "New Lead For You – DeliWer",
    body: "Hi {BrokerName},\n\nWe have a new lead that matches your profile.\n\nClient Interest: {ServiceType}\nArea: {Area}\nBudget: {Budget}\n\nPlease contact the client at your earliest convenience and update us with the outcome.\n\nDeliWer Marketing\n+971523946311",
    variables: ["BrokerName","ServiceType","Area","Budget"], isDefault: true },
];

router.post("/templates/seed", async (_req, res) => {
  try {
    const existing = await db.select({ count: count() }).from(bnosTemplates).where(eq(bnosTemplates.isDefault, true));
    if (existing[0].count > 0) return res.json({ seeded: 0, message: "Already seeded" });
    const rows = await db.insert(bnosTemplates).values(DEFAULT_TEMPLATES).returning();
    res.json({ seeded: rows.length });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/templates", async (_req, res) => {
  try {
    const rows = await db.select().from(bnosTemplates).orderBy(bnosTemplates.category, bnosTemplates.name);
    res.json(rows);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.post("/templates", async (req, res) => {
  try {
    const parsed = insertBnosTemplateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [row] = await db.insert(bnosTemplates).values(parsed.data).returning();
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.patch("/templates/:id", async (req, res) => {
  try {
    const [row] = await db.update(bnosTemplates)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(bnosTemplates.id, req.params.id))
      .returning();
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.delete("/templates/:id", async (req, res) => {
  try {
    await db.delete(bnosTemplates).where(eq(bnosTemplates.id, req.params.id));
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ── Commission Config ─────────────────────────────────────────────────────────
router.get("/commission", async (_req, res) => {
  try {
    const rows = await db.select().from(commissionConfig).orderBy(commissionConfig.partnerType);
    res.json(rows);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.put("/commission/:partnerType", async (req, res) => {
  try {
    const existing = await db.select().from(commissionConfig)
      .where(eq(commissionConfig.partnerType, req.params.partnerType));
    let row;
    if (existing.length > 0) {
      [row] = await db.update(commissionConfig)
        .set({ ...req.body, updatedAt: new Date() })
        .where(eq(commissionConfig.partnerType, req.params.partnerType))
        .returning();
    } else {
      const parsed = insertCommissionConfigSchema.safeParse({ ...req.body, partnerType: req.params.partnerType });
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      [row] = await db.insert(commissionConfig).values(parsed.data).returning();
    }
    res.json(row);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
