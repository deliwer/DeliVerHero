import { sendWhatsApp } from "../../utils/sendWhatsApp";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Header validation for security
  const authHeader = req.headers.authorization;
  const INTERNAL_CRON_SECRET = process.env.INTERNAL_CRON_SECRET;

  if (INTERNAL_CRON_SECRET && authHeader !== `Bearer ${INTERNAL_CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const BASE_URL = process.env.BASE_URL || "https://deliwer.com";
  const FOUNDER_NUMBERS = (process.env.FOUNDER_NUMBERS || "").split(",").filter(Boolean);

  const campaign = "movein_week";
  const utmLink = `${BASE_URL}/?utm_source=broker&utm_medium=whatsapp&utm_campaign=${campaign}&utm_content=founder`;

  const message = `🚀 DELIWER DAILY OUTREACH TASK

Campaign: Move-In Water + Free Shower Filter

Today’s Action:
Send 25 WhatsApp messages to brokers.

Copy & Send:

Hi [Name] 👋
We’re prioritising Move-In water setup this week.

Please share this link with tenants moving:
${utmLink}

Every booking earns commission automatically.

Reply DONE when completed.`;

  const results = await Promise.all(
    FOUNDER_NUMBERS.map((number) => sendWhatsApp(number.trim(), message))
  );

  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.length - successCount;

  console.log(`Daily trigger completed. Success: ${successCount}, Failures: ${failureCount}`);

  return res.status(200).json({
    status: "sent",
    successCount,
    failureCount,
  });
}
