import { runBrokerFetch } from './broker-fetch-service';
import { runFollowUpEngine } from './broker-followup-service';
import { db } from '../db';
import { brokerMaster, brokerAutomationLog } from '@shared/schema';
import { eq, desc, sql, and, lt } from 'drizzle-orm';
import { generateRefCode, generatePartnerLink } from '../broker-campaign-service';
import { sendEmail } from '../sendgrid-service';

const DELAY_MS = 1500;
const DAILY_EMAIL_LIMIT = 300;

export interface AutomationStatus {
  isRunning: boolean;
  lastDailyRun?: Date;
  lastFollowUpRun?: Date;
  totalInMaster: number;
  newToday: number;
  sentTotal: number;
  followedUpTotal: number;
  convertedTotal: number;
  pendingFollowUp1: number;
  pendingFollowUp2: number;
  pendingFollowUp3: number;
  recentLogs: any[];
}

let dailyRunning = false;
let followUpRunning = false;

export function isDailyRunning() { return dailyRunning; }
export function isFollowUpRunning() { return followUpRunning; }

export async function runDailyAutomation(): Promise<void> {
  if (dailyRunning) {
    console.log('[AUTOMATION] Daily cycle already running — skipping');
    return;
  }

  dailyRunning = true;
  console.log('[AUTOMATION] Starting daily broker automation cycle');

  try {
    const fetchResult = await runBrokerFetch('daily');
    console.log(`[AUTOMATION] Fetch complete: ${fetchResult.newBrokers} new brokers`);

    const newBrokers = await db.select()
      .from(brokerMaster)
      .where(and(eq(brokerMaster.status, 'new'), eq(brokerMaster.deleted, false)));

    if (newBrokers.length === 0) {
      console.log('[AUTOMATION] No new brokers to email');
      return;
    }

    const toSend = newBrokers.slice(0, DAILY_EMAIL_LIMIT);
    let sent = 0;
    let failed = 0;
    const now = new Date();

    for (const broker of toSend) {
      if (!broker.refCode || !broker.partnerLink) continue;

      try {
        const html = buildInitialEmail(broker.name, broker.partnerLink);
        const success = await sendEmail({
          to: broker.email,
          from: 'partners@deliwer.com',
          subject: 'Earn more from every tenant you already handle',
          html,
        });

        if (success) {
          await db.update(brokerMaster).set({
            status: 'sent',
            firstContactedAt: now,
            lastContactedAt: now,
            updatedAt: now,
          }).where(eq(brokerMaster.id, broker.id));
          sent++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }

      await sleep(DELAY_MS);
    }

    console.log(`[AUTOMATION] Daily emails: sent=${sent}, failed=${failed}`);
  } catch (err: any) {
    console.error('[AUTOMATION] Daily cycle error:', err);
  } finally {
    dailyRunning = false;
  }
}

export async function runFollowUpAutomation(): Promise<void> {
  if (followUpRunning) {
    console.log('[AUTOMATION] Follow-up cycle already running — skipping');
    return;
  }

  followUpRunning = true;
  try {
    await runFollowUpEngine('followup');
  } finally {
    followUpRunning = false;
  }
}

export async function getAutomationStatus(): Promise<AutomationStatus> {
  const notDeleted = eq(brokerMaster.deleted, false);

  const counts = await db.select({
    status: brokerMaster.status,
    count: sql<number>`count(*)`,
  }).from(brokerMaster).where(notDeleted).groupBy(brokerMaster.status);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newTodayRes = await db.select({ count: sql<number>`count(*)` })
    .from(brokerMaster)
    .where(and(notDeleted, sql`${brokerMaster.createdAt} >= ${today}`));

  const twoDaysAgo  = new Date(Date.now() - 2  * 24 * 60 * 60 * 1000);
  const fiveDaysAgo = new Date(Date.now() - 5  * 24 * 60 * 60 * 1000);
  const tenDaysAgo  = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

  const pendingFu1Res = await db.select({ count: sql<number>`count(*)` })
    .from(brokerMaster)
    .where(and(
      notDeleted,
      eq(brokerMaster.status, 'sent'),
      eq(brokerMaster.followUpCount, 0),
      lt(brokerMaster.firstContactedAt, twoDaysAgo)
    ));

  const pendingFu2Res = await db.select({ count: sql<number>`count(*)` })
    .from(brokerMaster)
    .where(and(
      notDeleted,
      eq(brokerMaster.status, 'followed_up'),
      eq(brokerMaster.followUpCount, 1),
      lt(brokerMaster.firstContactedAt, fiveDaysAgo)
    ));

  const pendingFu3Res = await db.select({ count: sql<number>`count(*)` })
    .from(brokerMaster)
    .where(and(
      notDeleted,
      eq(brokerMaster.status, 'followed_up'),
      eq(brokerMaster.followUpCount, 2),
      lt(brokerMaster.firstContactedAt, tenDaysAgo)
    ));

  const recentLogs = await db.select()
    .from(brokerAutomationLog)
    .orderBy(desc(brokerAutomationLog.startedAt))
    .limit(10);

  const totalInMaster = counts.reduce((s, c) => s + Number(c.count), 0);
  const get = (status: string) => Number(counts.find((c) => c.status === status)?.count || 0);

  const lastDaily = recentLogs.find((l) => l.runType === 'daily');
  const lastFollowUp = recentLogs.find((l) => l.runType === 'followup');

  return {
    isRunning: dailyRunning || followUpRunning,
    lastDailyRun: lastDaily?.completedAt || undefined,
    lastFollowUpRun: lastFollowUp?.completedAt || undefined,
    totalInMaster,
    newToday: Number(newTodayRes[0]?.count || 0),
    sentTotal: get('sent'),
    followedUpTotal: get('followed_up'),
    convertedTotal: get('converted'),
    pendingFollowUp1: Number(pendingFu1Res[0]?.count || 0),
    pendingFollowUp2: Number(pendingFu2Res[0]?.count || 0),
    pendingFollowUp3: Number(pendingFu3Res[0]?.count || 0),
    recentLogs,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildInitialEmail(name: string, partnerLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #10b981, #0d9488); padding: 36px 28px; }
    .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 700; line-height: 1.3; }
    .body { padding: 36px 28px; }
    .body p { color: #374151; line-height: 1.7; font-size: 15px; }
    .bullets { list-style: none; padding: 0; margin: 20px 0; }
    .bullets li { padding: 6px 0; color: #374151; font-size: 15px; }
    .bullets li::before { content: "→ "; color: #10b981; font-weight: 700; }
    .cta-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px 24px; border-radius: 4px; margin: 28px 0; }
    .cta-box a { display: inline-block; background: #10b981; color: white; font-weight: 700; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-size: 15px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 20px 28px; text-align: center; }
    .footer p { color: #6b7280; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Earn more from every tenant you already handle</h1>
    </div>
    <div class="body">
      <p>Hi ${name},</p>
      <p>You're already working with tenants who are:</p>
      <ul class="bullets">
        <li>renewing</li>
        <li>moving</li>
        <li>negotiating rent</li>
      </ul>
      <p>DeliWer helps you earn from those same conversations.</p>
      <p>We handle everything after the deal:</p>
      <ul class="bullets">
        <li>moving & movers coordination</li>
        <li>Ejari registration & DEWA activation</li>
        <li>setup, cleaning & concierge</li>
      </ul>
      <p><strong>You earn up to 35% per referral.</strong></p>
      <div class="cta-box">
        <p style="color: #065f46; font-weight: 700; margin: 0 0 4px 0;">Your personal partner link:</p>
        <p style="color: #047857; font-size: 13px; margin: 0 0 12px 0; word-break: break-all;">${partnerLink}</p>
        <a href="${partnerLink}">Start Here — It's Free</a>
      </div>
      <p>Try it with just 2 tenants this week.</p>
      <p style="margin-top: 28px;">WhatsApp: <a href="https://wa.me/971523906019" style="color: #10b981;">+971 52 390 6019</a></p>
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
