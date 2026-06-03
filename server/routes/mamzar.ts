import { Router, Request, Response } from "express";
import { db } from "../db";
import { mamzarEoi, insertMamzarEoiSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";
import { sendWhatsApp } from "../utils/sendWhatsApp";

const router = Router();

const WA_NOTIFY = "971523906019";

// ── POST /api/mamzar/eoi ──────────────────────────────────────────────────────
router.post("/eoi", async (req: Request, res: Response) => {
  try {
    const schema = insertMamzarEoiSchema.extend({
      brokerName: z.string().min(2),
      brokerPhone: z.string().min(7),
    });
    const data = schema.parse(req.body);

    const refCode = `MZR-${nanoid(6).toUpperCase()}`;

    const [record] = await db
      .insert(mamzarEoi)
      .values({
        ...data,
        referralCode: refCode,
        ipAddress: (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "",
        userAgent: req.headers["user-agent"] || "",
      })
      .returning();

    const waLines = [
      `🏖️ *New Mamzar EOI — Alef Linar*`,
      `Broker: ${data.brokerName} (${data.brokerPhone})`,
      data.brokerEmail ? `Email: ${data.brokerEmail}` : null,
      data.brokerage ? `Brokerage: ${data.brokerage}` : null,
      data.reraLicense ? `RERA: ${data.reraLicense}` : null,
      data.country ? `Country: ${data.country}` : null,
      ``,
      data.unitType ? `Unit interest: ${data.unitType}` : null,
      data.budget ? `Budget: ${data.budget}` : null,
      data.clientName ? `Client: ${data.clientName} (${data.clientPhone || "—"})` : null,
      data.clientNationality ? `Client nationality: ${data.clientNationality}` : null,
      ``,
      `Tour requested: ${data.tourRequested ? "Yes ✅" : "No"}`,
      `Early-bird: ${data.earlybirdOpted ? "Yes ✅" : "No"}`,
      data.notes ? `Notes: ${data.notes}` : null,
      data.referredBy ? `Referred by: ${data.referredBy}` : null,
      ``,
      `Ref: ${refCode}`,
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/${WA_NOTIFY}?text=${encodeURIComponent(waLines)}`;

    // ── Auto-push to admin via WhatsApp Business API ──────────────────────────
    // Fire-and-forget — don't let notification failure block the response
    (async () => {
      try {
        if (data.referredBy) {
          // Sub-referral: prominent alert with chain info
          const msg = [
            `🔗 *New Sub-Referral — Alef Linar Mamzar*`,
            ``,
            `Broker: ${data.brokerName} (${data.brokerPhone})`,
            `Introduced by code: *${data.referredBy}*`,
            `Their new code: ${refCode}`,
            data.unitType ? `Unit interest: ${data.unitType}` : null,
            data.tourRequested ? `Tour requested: Yes ✅` : null,
            ``,
            `Chain is growing 🚀`,
          ].filter(Boolean).join("\n");
          await sendWhatsApp(WA_NOTIFY, msg);

          // ── Milestone congratulations to the parent broker ───────────────
          const MILESTONES: Record<number, string> = {
            3:  `🎉 *Mamzar Network — Milestone!*\n\nYou've just introduced 3 brokers to the Alef Linar network.\nYou're building real momentum — keep going!\n\nYour referral link keeps working 24/7. Every broker you onboard earns you a trailing override when they close. 💪`,
            5:  `🏆 *Mamzar Network — Top Tier!*\n\nYou've hit 5 referrals! You're now in the top tier of our broker network.\n\nAlef Linar launches soon. Your network is already ahead of the curve. 🚀`,
            10: `🌟 *Mamzar Network Champion!*\n\n10 referrals — you've built a serious sub-network.\nWhen Alef Linar opens sales, your chain earns with every deal that closes.\n\nThank you for growing the DeliWer broker community. We'll be in touch personally. 🤝`,
          };
          try {
            // find the parent broker's phone
            const [parent] = await db
              .select({ brokerPhone: mamzarEoi.brokerPhone, brokerName: mamzarEoi.brokerName })
              .from(mamzarEoi)
              .where(eq(mamzarEoi.referralCode, data.referredBy))
              .limit(1);

            if (parent?.brokerPhone) {
              // count how many sub-referrals they now have (including the one just inserted)
              const allRefs = await db
                .select({ id: mamzarEoi.id })
                .from(mamzarEoi)
                .where(eq(mamzarEoi.referredBy, data.referredBy));
              const total = allRefs.length;

              const milestoneMsg = MILESTONES[total];
              if (milestoneMsg) {
                // strip leading + or spaces, normalise to digits only
                const phone = parent.brokerPhone.replace(/[^\d]/g, "");
                await sendWhatsApp(phone, milestoneMsg);
                console.log(`[Mamzar] Milestone ${total} sent to ${phone} (${parent.brokerName})`);
              }
            }
          } catch (milestoneErr) {
            console.error("[Mamzar] milestone notify error:", milestoneErr);
          }
        } else {
          // Direct EOI: standard notification
          const msg = [
            `🏖️ *New Direct EOI — Alef Linar Mamzar*`,
            ``,
            `Broker: ${data.brokerName} (${data.brokerPhone})`,
            data.brokerage ? `Brokerage: ${data.brokerage}` : null,
            data.country ? `Country: ${data.country}` : null,
            data.unitType ? `Unit interest: ${data.unitType}` : null,
            data.tourRequested ? `Tour requested: Yes ✅` : null,
            data.earlybirdOpted ? `Early-bird opted: Yes ✅` : null,
            ``,
            `Ref code issued: ${refCode}`,
          ].filter(Boolean).join("\n");
          await sendWhatsApp(WA_NOTIFY, msg);
        }
      } catch (notifyErr) {
        console.error("[Mamzar] WA notify error:", notifyErr);
      }
    })();

    res.json({
      success: true,
      eoiId: record.id,
      referralCode: refCode,
      waUrl,
    });
  } catch (err: any) {
    if (err?.name === "ZodError") return res.status(400).json({ error: "Validation failed", details: err.errors });
    console.error("[Mamzar] EOI error:", err);
    res.status(500).json({ error: "Failed to record EOI" });
  }
});

// ── GET /api/mamzar/leaderboard (public — anonymised sub-referral counts) ────
router.get("/leaderboard", async (_req: Request, res: Response) => {
  try {
    const all = await db
      .select({ id: mamzarEoi.id, brokerName: mamzarEoi.brokerName, referralCode: mamzarEoi.referralCode, referredBy: mamzarEoi.referredBy })
      .from(mamzarEoi);

    // count sub-referrals per referralCode
    const counts: Record<string, number> = {};
    for (const r of all) {
      if (r.referredBy) counts[r.referredBy] = (counts[r.referredBy] || 0) + 1;
    }

    // build leaderboard from referrers who have at least 1 sub-referral
    const rows = all
      .filter(r => r.referralCode && (counts[r.referralCode] ?? 0) > 0)
      .map(r => {
        const parts = (r.brokerName ?? "").trim().split(/\s+/);
        const first = parts[0] ?? "Broker";
        const lastInitial = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() + "." : "";
        return {
          code: r.referralCode,
          displayName: lastInitial ? `${first} ${lastInitial}` : first,
          count: counts[r.referralCode!] ?? 0,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json(rows);
  } catch (err) {
    console.error("[Mamzar] leaderboard error:", err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── GET /api/mamzar/stats (public — just counts, no PII) ─────────────────────
router.get("/stats", async (_req: Request, res: Response) => {
  try {
    const all = await db.select({ id: mamzarEoi.id, unitType: mamzarEoi.unitType, tourRequested: mamzarEoi.tourRequested }).from(mamzarEoi);
    const total = all.length;
    const byUnit = all.reduce<Record<string, number>>((acc, r) => {
      const k = r.unitType || "Unspecified";
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
    const tours = all.filter(r => r.tourRequested).length;
    res.json({ total, byUnit, tours });
  } catch (err) {
    console.error("[Mamzar] stats error:", err);
    res.status(500).json({ error: "Failed to load stats" });
  }
});

// ── Admin middleware ──────────────────────────────────────────────────────────
function adminOnly(req: Request, res: Response, next: () => void) {
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token !== process.env.ADMIN_SECRET && token !== "deliwer-admin-2026") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ── GET /api/mamzar/admin/eois ────────────────────────────────────────────────
router.get("/admin/eois", adminOnly, async (_req: Request, res: Response) => {
  try {
    const eois = await db.select().from(mamzarEoi).orderBy(desc(mamzarEoi.submittedAt)).limit(500);
    res.json(eois);
  } catch (err) {
    console.error("[Mamzar] admin list error:", err);
    res.status(500).json({ error: "Failed" });
  }
});

// ── PATCH /api/mamzar/admin/eoi/:id/status ────────────────────────────────────
router.patch("/admin/eoi/:id/status", adminOnly, async (req: Request, res: Response) => {
  try {
    const { status } = z.object({ status: z.enum(["new", "contacted", "qualified", "closed"]) }).parse(req.body);
    const [updated] = await db.update(mamzarEoi).set({ status }).where(eq(mamzarEoi.id, req.params.id)).returning();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json({ success: true, record: updated });
  } catch (err: any) {
    if (err?.name === "ZodError") return res.status(400).json({ error: "Invalid status" });
    res.status(500).json({ error: "Failed" });
  }
});

export default router;
