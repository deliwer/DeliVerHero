import { db } from '../db';
import { brokerMaster, brokerAutomationLog } from '@shared/schema';
import { eq, and, lt, sql } from 'drizzle-orm';
import { sendEmail } from '../sendgrid-service';

const DELAY_MS = 1500;
const DAILY_FOLLOWUP_LIMIT = 300;
const BASE_URL = 'https://www.deliwer.com';

const TWO_DAYS_MS   = 2  * 24 * 60 * 60 * 1000;
const FIVE_DAYS_MS  = 5  * 24 * 60 * 60 * 1000;
const TEN_DAYS_MS   = 10 * 24 * 60 * 60 * 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildFollowUp1Email(name: string, partnerLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #10b981, #0d9488); padding: 28px; }
    .header h1 { color: white; margin: 0; font-size: 20px; font-weight: 700; }
    .body { padding: 36px 28px; }
    .body p { color: #374151; line-height: 1.7; font-size: 15px; }
    .cta-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px 24px; border-radius: 4px; margin: 28px 0; }
    .cta-box a { display: inline-block; background: #10b981; color: white; font-weight: 700; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-size: 15px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 20px 28px; text-align: center; }
    .footer p { color: #6b7280; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Just checking if you saw this</h1>
    </div>
    <div class="body">
      <p>Hi ${name},</p>
      <p>Just checking if you saw this — brokers are already earning from tenant moves.</p>
      <p>Try it with just 2 tenants this week. We handle everything after the deal — Ejari, DEWA, movers, cleaning.</p>
      <p><strong>You refer. We deliver. You earn up to 35%.</strong></p>
      <div class="cta-box">
        <p style="color: #065f46; font-weight: 700; margin: 0 0 4px 0;">Your partner link:</p>
        <p style="color: #047857; font-size: 13px; margin: 0 0 12px 0; word-break: break-all;">${partnerLink}</p>
        <a href="${partnerLink}">Get Started — 2 minutes</a>
      </div>
      <p>WhatsApp: <a href="https://wa.me/971523946311" style="color: #10b981;">+971 52 394 6311</a></p>
      <p style="color: #6b7280;">– DeliWer Team</p>
    </div>
    <div class="footer">
      <p>DeliWer · Dubai Airport Freezone · <a href="https://www.deliwer.com" style="color: #10b981;">deliwer.com</a></p>
      <p style="margin-top: 6px;">You received this because you are a licensed broker in the UAE.</p>
    </div>
  </div>
</body>
</html>`.trim();
}

function buildFollowUp2Email(name: string, partnerLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #0d9488, #065f46); padding: 28px; }
    .header h1 { color: white; margin: 0; font-size: 20px; font-weight: 700; }
    .body { padding: 36px 28px; }
    .body p { color: #374151; line-height: 1.7; font-size: 15px; }
    .cta-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px 24px; border-radius: 4px; margin: 28px 0; }
    .cta-box a { display: inline-block; background: #0d9488; color: white; font-weight: 700; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-size: 15px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 20px 28px; text-align: center; }
    .footer p { color: #6b7280; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Quick reminder — this works best right now</h1>
    </div>
    <div class="body">
      <p>Hi ${name},</p>
      <p>Quick reminder — this works best with tenants you're already handling.</p>
      <p>No extra work on your end. You make the intro, we handle all the logistics, and you earn a commission on every completed move.</p>
      <div class="cta-box">
        <p style="color: #065f46; font-weight: 700; margin: 0 0 4px 0;">Your personal partner link:</p>
        <p style="color: #047857; font-size: 13px; margin: 0 0 12px 0; word-break: break-all;">${partnerLink}</p>
        <a href="${partnerLink}">Use My Link Now</a>
      </div>
      <p>Questions? WhatsApp us: <a href="https://wa.me/971523946311" style="color: #10b981;">+971 52 394 6311</a></p>
      <p style="color: #6b7280;">– DeliWer Team</p>
    </div>
    <div class="footer">
      <p>DeliWer · Dubai Airport Freezone · <a href="https://www.deliwer.com" style="color: #10b981;">deliwer.com</a></p>
      <p style="margin-top: 6px;">You received this because you are a licensed broker in the UAE.</p>
    </div>
  </div>
</body>
</html>`.trim();
}

function buildFollowUp3Email(name: string, partnerLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #047857, #064e3b); padding: 28px; }
    .header h1 { color: white; margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; }
    .body { padding: 36px 28px; }
    .body p { color: #374151; line-height: 1.7; font-size: 15px; }
    .highlight { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 4px; margin: 20px 0; }
    .highlight p { color: #92400e; margin: 0; font-size: 14px; }
    .cta-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px 24px; border-radius: 4px; margin: 28px 0; }
    .cta-box a { display: inline-block; background: #047857; color: white; font-weight: 700; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-size: 15px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 20px 28px; text-align: center; }
    .footer p { color: #6b7280; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Last chance — your referral earnings are waiting</h1>
    </div>
    <div class="body">
      <p>Hi ${name},</p>
      <p>This is our final note to you about the DeliWer partner program.</p>
      <p>Over the past 10 days other brokers across Dubai have been earning commissions simply by forwarding a link to their tenants.</p>
      <div class="highlight">
        <p><strong>What you earn per referral:</strong> up to 35% commission on every completed move, Ejari, or DEWA activation — with zero paperwork on your end.</p>
      </div>
      <p>If you have even one tenant moving or renewing this month, your link is worth using today.</p>
      <div class="cta-box">
        <p style="color: #065f46; font-weight: 700; margin: 0 0 4px 0;">Your personal partner link:</p>
        <p style="color: #047857; font-size: 13px; margin: 0 0 12px 0; word-break: break-all;">${partnerLink}</p>
        <a href="${partnerLink}">Claim My Earnings Now</a>
      </div>
      <p>Still have questions? We're on WhatsApp: <a href="https://wa.me/971523946311" style="color: #10b981;">+971 52 394 6311</a></p>
      <p style="color: #6b7280;">– DeliWer Partnerships Team</p>
    </div>
    <div class="footer">
      <p>DeliWer · Dubai Airport Freezone · <a href="https://www.deliwer.com" style="color: #10b981;">deliwer.com</a></p>
      <p style="margin-top: 6px;">This is our final reminder. No further emails will be sent.</p>
    </div>
  </div>
</body>
</html>`.trim();
}

export interface FollowUpResult {
  fu1Sent: number;
  fu2Sent: number;
  fu3Sent: number;
  failed: number;
  logId: string;
}

export async function runFollowUpEngine(triggeredBy: 'followup' | 'manual_followup' = 'manual_followup'): Promise<FollowUpResult> {
  const [log] = await db.insert(brokerAutomationLog).values({
    runType: triggeredBy,
    status: 'running',
  }).returning();

  const now = new Date();
  const twoDaysAgo  = new Date(now.getTime() - TWO_DAYS_MS);
  const fiveDaysAgo = new Date(now.getTime() - FIVE_DAYS_MS);
  const tenDaysAgo  = new Date(now.getTime() - TEN_DAYS_MS);

  let fu1Sent = 0;
  let fu2Sent = 0;
  let fu3Sent = 0;
  let failed = 0;
  let totalSent = 0;

  // ── FU#1 — Day 2 ────────────────────────────────────────────────────────────
  const fu1Candidates = await db.select()
    .from(brokerMaster)
    .where(
      and(
        eq(brokerMaster.deleted, false),
        eq(brokerMaster.status, 'sent'),
        eq(brokerMaster.followUpCount, 0),
        lt(brokerMaster.firstContactedAt, twoDaysAgo)
      )
    );

  console.log(`[FOLLOWUP] FU#1 candidates: ${fu1Candidates.length}`);

  for (const broker of fu1Candidates) {
    if (totalSent >= DAILY_FOLLOWUP_LIMIT) break;
    if (!broker.refCode || !broker.partnerLink) continue;

    try {
      const html = buildFollowUp1Email(broker.name, broker.partnerLink);
      const success = await sendEmail({
        to: broker.email,
        from: 'partners@deliwer.com',
        subject: 'Just checking if you saw this — brokers are already earning',
        html,
      });

      if (success) {
        await db.update(brokerMaster).set({
          status: 'followed_up',
          followUpCount: 1,
          lastContactedAt: now,
          updatedAt: now,
        }).where(eq(brokerMaster.id, broker.id));
        fu1Sent++;
        totalSent++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }

    await sleep(DELAY_MS);
  }

  // ── FU#2 — Day 5 ────────────────────────────────────────────────────────────
  const fu2Candidates = await db.select()
    .from(brokerMaster)
    .where(
      and(
        eq(brokerMaster.deleted, false),
        eq(brokerMaster.status, 'followed_up'),
        eq(brokerMaster.followUpCount, 1),
        lt(brokerMaster.firstContactedAt, fiveDaysAgo)
      )
    );

  console.log(`[FOLLOWUP] FU#2 candidates: ${fu2Candidates.length}`);

  for (const broker of fu2Candidates) {
    if (totalSent >= DAILY_FOLLOWUP_LIMIT) break;
    if (!broker.partnerLink) continue;

    try {
      const html = buildFollowUp2Email(broker.name, broker.partnerLink);
      const success = await sendEmail({
        to: broker.email,
        from: 'partners@deliwer.com',
        subject: 'Quick reminder — your partner link is ready',
        html,
      });

      if (success) {
        await db.update(brokerMaster).set({
          followUpCount: 2,
          lastContactedAt: now,
          updatedAt: now,
        }).where(eq(brokerMaster.id, broker.id));
        fu2Sent++;
        totalSent++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }

    await sleep(DELAY_MS);
  }

  // ── FU#3 — Day 10 ───────────────────────────────────────────────────────────
  const fu3Candidates = await db.select()
    .from(brokerMaster)
    .where(
      and(
        eq(brokerMaster.deleted, false),
        eq(brokerMaster.status, 'followed_up'),
        eq(brokerMaster.followUpCount, 2),
        lt(brokerMaster.firstContactedAt, tenDaysAgo)
      )
    );

  console.log(`[FOLLOWUP] FU#3 candidates: ${fu3Candidates.length}`);

  for (const broker of fu3Candidates) {
    if (totalSent >= DAILY_FOLLOWUP_LIMIT) break;
    if (!broker.partnerLink) continue;

    try {
      const html = buildFollowUp3Email(broker.name, broker.partnerLink);
      const success = await sendEmail({
        to: broker.email,
        from: 'partners@deliwer.com',
        subject: 'Last chance — your referral earnings are waiting',
        html,
      });

      if (success) {
        await db.update(brokerMaster).set({
          followUpCount: 3,
          lastContactedAt: now,
          updatedAt: now,
        }).where(eq(brokerMaster.id, broker.id));
        fu3Sent++;
        totalSent++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }

    await sleep(DELAY_MS);
  }

  await db.update(brokerAutomationLog).set({
    status: 'completed',
    followUpsSent: fu1Sent + fu2Sent + fu3Sent,
    completedAt: new Date(),
  }).where(eq(brokerAutomationLog.id, log.id));

  console.log(`[FOLLOWUP] FU#1: ${fu1Sent}, FU#2: ${fu2Sent}, FU#3: ${fu3Sent}, Failed: ${failed}`);

  return { fu1Sent, fu2Sent, fu3Sent, failed, logId: log.id };
}
