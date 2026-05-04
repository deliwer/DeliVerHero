import { Router } from "express";
import { db } from "../db";
import {
  marketingReferrers, marketingLeads,
  insertMarketingReferrerSchema, insertMarketingLeadSchema,
} from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

const router = Router();

// Commission rules
const COMMISSION: Record<string, number> = {
  contacted: 100,
  closed: 500,
  new: 0,
};

// ── Generate unique DLW-XXXX code ──────────────────────────────────────────
async function generateRefCode(): Promise<string> {
  const existing = await db.select({ refCode: marketingReferrers.refCode }).from(marketingReferrers);
  const used = new Set(existing.map(r => r.refCode));
  for (let i = 0; i < 100; i++) {
    const num = Math.floor(Math.random() * 9000) + 1000;
    const code = `DLW-${num}`;
    if (!used.has(code)) return code;
  }
  throw new Error("Could not generate unique referral code");
}

// ── Admin auth middleware ───────────────────────────────────────────────────
router.post("/admin/verify", (req, res) => {
  const { password } = req.body;
  const adminPass = process.env.ADMIN_PASSWORD || "deliwer2024";
  if (password === adminPass) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false, error: "Incorrect password" });
  }
});

// ── Referrers ───────────────────────────────────────────────────────────────
router.get("/referrers", async (_req, res) => {
  try {
    const rows = await db.select().from(marketingReferrers).orderBy(desc(marketingReferrers.createdAt));
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/referrers", async (req, res) => {
  try {
    const refCode = await generateRefCode();
    const data = insertMarketingReferrerSchema.parse({ ...req.body, refCode });
    const [row] = await db.insert(marketingReferrers).values(data).returning();
    const waUrl = `https://wa.me/971523946311?text=${encodeURIComponent(`Hi, I am interested in the water solution. Code: ${refCode}`)}`;
    res.json({ referrer: row, waUrl });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/referrers/check/:code", async (req, res) => {
  try {
    const rows = await db.select().from(marketingReferrers).where(eq(marketingReferrers.refCode, req.params.code));
    res.json({ valid: rows.length > 0, referrer: rows[0] || null });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Leads ───────────────────────────────────────────────────────────────────
router.get("/leads", async (_req, res) => {
  try {
    const rows = await db.select().from(marketingLeads).orderBy(desc(marketingLeads.createdAt));
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/leads", async (req, res) => {
  try {
    // Validate referral code
    const refs = await db.select().from(marketingReferrers).where(eq(marketingReferrers.refCode, req.body.refCode));
    if (refs.length === 0) {
      return res.status(400).json({ error: "Invalid referral code. Please check and try again." });
    }
    const data = insertMarketingLeadSchema.parse({
      ...req.body,
      status: "new",
      commissionAmount: 0,
      payoutStatus: "pending",
    });
    const [row] = await db.insert(marketingLeads).values(data).returning();
    res.json(row);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/leads/:id/status", async (req, res) => {
  try {
    const { status, payoutStatus } = req.body;
    const commissionAmount = COMMISSION[status] ?? 0;
    const [row] = await db.update(marketingLeads)
      .set({ status, commissionAmount, ...(payoutStatus ? { payoutStatus } : {}) })
      .where(eq(marketingLeads.id, req.params.id))
      .returning();
    res.json(row);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/stats", async (_req, res) => {
  try {
    const leads = await db.select().from(marketingLeads);
    const referrers = await db.select().from(marketingReferrers);
    const total = leads.length;
    const closed = leads.filter(l => l.status === "closed").length;
    const contacted = leads.filter(l => l.status === "contacted").length;
    const totalCommission = leads.reduce((s, l) => s + l.commissionAmount, 0);
    const pendingPayout = leads.filter(l => l.payoutStatus === "pending" && l.commissionAmount > 0)
      .reduce((s, l) => s + l.commissionAmount, 0);
    res.json({ total, closed, contacted, totalCommission, pendingPayout, referrerCount: referrers.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/leads/export", async (_req, res) => {
  try {
    const rows = await db.select().from(marketingLeads).orderBy(desc(marketingLeads.createdAt));
    const headers = ["id", "ref_code", "client_name", "phone", "location", "type", "notes", "status", "commission_amount", "payout_status", "created_at"];
    const csv = [
      headers.join(","),
      ...rows.map(r => [
        r.id, r.refCode, `"${r.clientName}"`, r.phone,
        `"${r.location || ""}"`, r.type || "", `"${(r.notes || "").replace(/"/g, "'")}"`,
        r.status, r.commissionAmount, r.payoutStatus,
        r.createdAt?.toISOString() || "",
      ].join(",")),
    ].join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="marketing-leads.csv"');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Seed sample data ────────────────────────────────────────────────────────
async function seedMarketingData() {
  try {
    const existing = await db.select().from(marketingReferrers).limit(1);
    if (existing.length > 0) return;

    const [r1] = await db.insert(marketingReferrers).values({ name: "Khalid Al Rashid", phone: "+971501234567", role: "broker", refCode: "DLW-1001" }).returning();
    const [r2] = await db.insert(marketingReferrers).values({ name: "Sarah Johnson", phone: "+971509876543", role: "tenant", refCode: "DLW-1002" }).returning();

    await db.insert(marketingLeads).values([
      { refCode: "DLW-1001", clientName: "Mohammed Al Ali", phone: "+971551112233", location: "Downtown Dubai", type: "Apartment", notes: "Needs water filtration urgently", status: "closed", commissionAmount: 500, payoutStatus: "paid" },
      { refCode: "DLW-1001", clientName: "Priya Sharma", phone: "+971554445566", location: "JBR", type: "Villa", notes: "Interested in AC maintenance", status: "contacted", commissionAmount: 100, payoutStatus: "pending" },
      { refCode: "DLW-1002", clientName: "James Miller", phone: "+971557778899", location: "Dubai Marina", type: "Apartment", notes: "Moving in next month", status: "new", commissionAmount: 0, payoutStatus: "pending" },
    ]);

    console.log("[marketing-referral] Sample data seeded: DLW-1001, DLW-1002");
  } catch (err) {
    console.warn("[marketing-referral] Seed skipped:", err);
  }
}
seedMarketingData();

export default router;
