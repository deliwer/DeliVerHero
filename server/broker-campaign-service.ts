import { db } from './db';
import { brokerCampaigns, brokerCampaignEntries } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { sendEmail } from './sendgrid-service';

const BASE_URL = 'https://www.deliwer.com';
const DELAY_MS = 1500; // 1.5 seconds between sends (anti-spam)
const DAILY_LIMIT = 300;

export function generateRefCode(name: string, email: string): string {
  const emailPrefix = email.split('@')[0];
  const raw = emailPrefix.length > 3 ? emailPrefix : name;
  const clean = raw
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20);
  return clean || 'broker' + Math.random().toString(36).substring(2, 7);
}

export function generatePartnerLink(refCode: string): string {
  return `${BASE_URL}/broker-partner?ref=${refCode}&utm_source=brokerlist&utm_campaign=uae_recruit`;
}

function buildBrokerEmail(name: string, partnerLink: string): string {
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
      <p style="margin-top: 28px;">WhatsApp: <a href="https://wa.me/971523906019" style="color: #10b981;">+971 52 394 6311</a></p>
      <p style="color: #6b7280;">– DeliWer Team</p>
    </div>
    <div class="footer">
      <p>DeliWer · Dubai Airport Freezone · <a href="https://www.deliwer.com" style="color: #10b981;">deliwer.com</a></p>
      <p style="margin-top: 6px;">You received this because you are a licensed broker in the UAE.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runCampaign(campaignId: string): Promise<void> {
  try {
    await db.update(brokerCampaigns)
      .set({ status: 'running' })
      .where(eq(brokerCampaigns.id, campaignId));

    const entries = await db.select()
      .from(brokerCampaignEntries)
      .where(eq(brokerCampaignEntries.campaignId, campaignId));

    const pending = entries.filter((e) => e.status === 'pending').slice(0, DAILY_LIMIT);
    let sent = 0;
    let failed = 0;

    for (const entry of pending) {
      const campaign = await db.select()
        .from(brokerCampaigns)
        .where(eq(brokerCampaigns.id, campaignId))
        .limit(1);

      if (!campaign[0] || campaign[0].status === 'paused') {
        console.log(`[CAMPAIGN] Campaign ${campaignId} paused — stopping.`);
        break;
      }

      try {
        const html = buildBrokerEmail(entry.name, entry.partnerLink);
        const success = await sendEmail({
          to: entry.email,
          from: 'partners@deliwer.com',
          subject: 'Earn more from every tenant you already handle',
          html,
        });

        if (success) {
          await db.update(brokerCampaignEntries)
            .set({ status: 'sent', sentAt: new Date() })
            .where(eq(brokerCampaignEntries.id, entry.id));
          sent++;
        } else {
          await db.update(brokerCampaignEntries)
            .set({ status: 'failed', errorMessage: 'SendGrid delivery failed' })
            .where(eq(brokerCampaignEntries.id, entry.id));
          failed++;
        }
      } catch (err: any) {
        // Detect SendGrid daily sending limit — pause gracefully so entries stay pending
        const isRateLimit =
          err?.isRateLimit === true ||
          err?.code === 403 ||
          err?.response?.body?.errors?.some((e: any) =>
            /exceed|limit|forbidden/i.test(e?.message || '')
          );

        if (isRateLimit) {
          console.warn(`[CAMPAIGN] SendGrid daily limit reached after ${sent} sent. Pausing campaign.`);
          await db.update(brokerCampaigns)
            .set({ status: 'paused', sentCount: sent, failedCount: failed })
            .where(eq(brokerCampaigns.id, campaignId));
          return; // Exit loop — entries stay 'pending' for next run
        }

        await db.update(brokerCampaignEntries)
          .set({ status: 'failed', errorMessage: err.message || 'Unknown error' })
          .where(eq(brokerCampaignEntries.id, entry.id));
        failed++;
      }

      await db.update(brokerCampaigns)
        .set({ sentCount: sent, failedCount: failed })
        .where(eq(brokerCampaigns.id, campaignId));

      console.log(`[CAMPAIGN] ${campaignId} — sent ${sent}, failed ${failed}, next entry...`);
      await sleep(DELAY_MS);
    }

    await db.update(brokerCampaigns)
      .set({ status: 'completed', sentCount: sent, failedCount: failed, completedAt: new Date() })
      .where(eq(brokerCampaigns.id, campaignId));

    console.log(`[CAMPAIGN] ${campaignId} completed. Sent: ${sent}, Failed: ${failed}`);
  } catch (err: any) {
    console.error(`[CAMPAIGN] Fatal error for ${campaignId}:`, err);
    await db.update(brokerCampaigns)
      .set({ status: 'completed' })
      .where(eq(brokerCampaigns.id, campaignId));
  }
}
