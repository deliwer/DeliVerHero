/**
 * SEO Weekly Digest — DeliWer
 *
 * Every Monday at 06:00 UAE (02:00 UTC):
 *   1. Runs a fresh IndexNow submission for both domains.
 *   2. Sends a branded HTML email to the founder via SendGrid.
 *   3. Sends a concise WhatsApp text to the founder's number.
 *
 * Manual trigger: POST /api/admin/seo-digest  { x-admin-secret: <secret> }
 */

import { sendEmail } from "../sendgrid-service";
import { runSeoPing, getLastPingReport, type PingResult } from "./seo-ping";

const FOUNDER_EMAIL   = "info@deliwer.com";
const FOUNDER_WHATSAPP = "+971523946311";
const FROM_EMAIL      = "info@deliwer.com";
const FROM_NAME       = "DeliWer SEO";

// ── WhatsApp send (mirrors whatsapp-agent pattern) ────────────────────────────
async function sendWhatsApp(to: string, text: string): Promise<boolean> {
  if (!process.env.WHATSAPP_TOKEN || !process.env.PHONE_NUMBER_ID) {
    console.log(`[SEO-DIGEST] [SIMULATED WHATSAPP] To: ${to}\n${text}`);
    return true;
  }
  try {
    const url = `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace("+", ""),
        type: "text",
        text: { body: text },
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[SEO-DIGEST] WhatsApp send error:", err);
    return false;
  }
}

// ── Format helpers ────────────────────────────────────────────────────────────
function fmtDate(ts: string | null): string {
  if (!ts) return "Never";
  return new Date(ts).toLocaleString("en-AE", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false,
    timeZone: "Asia/Dubai",
  }) + " UAE";
}

function statusBadge(ok: boolean | undefined): string {
  if (ok === true)  return `<span style="color:#10b981;font-weight:700">✓ OK</span>`;
  if (ok === false) return `<span style="color:#ef4444;font-weight:700">✗ FAILED</span>`;
  return `<span style="color:#6b7280">— No data</span>`;
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildHtmlEmail(report: ReturnType<typeof getLastPingReport>, pingResults: PingResult[]): string {
  const dw = report.summary.deliwer;
  const ph = report.summary.planetHeroes;
  const runAt = report.lastRunAt ? fmtDate(report.lastRunAt) : "Just now";

  const engineRows = (results: PingResult[]) =>
    results.map(r => `
      <tr>
        <td style="padding:6px 12px;color:#9ca3af;font-size:13px">${r.engine.replace(/ \(.*?\)/, "")}</td>
        <td style="padding:6px 12px;text-align:right;font-weight:700;color:${r.ok ? "#10b981" : "#ef4444"};font-size:13px">
          ${r.ok ? `✓ HTTP ${r.status}` : `✗ HTTP ${r.status}`}
        </td>
      </tr>`).join("");

  const domainCard = (
    icon: string, domain: string, sitemap: string,
    data: typeof dw, results: PingResult[]
  ) => `
    <div style="background:#111827;border:1px solid ${data.ok ? "#065f46" : "#7f1d1d"};border-radius:12px;padding:20px;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div style="font-size:15px;font-weight:700;color:#f9fafb">${icon} ${domain}</div>
        <div>${statusBadge(data.ok)}</div>
      </div>
      <div style="display:flex;gap:16px;margin-bottom:14px">
        ${[
          { label: "Succeeded", value: data.succeeded, color: "#10b981" },
          { label: "Failed",    value: data.failed,    color: "#ef4444" },
          { label: "URLs",      value: data.urlCount,  color: "#f9fafb" },
        ].map(s => `
          <div style="flex:1;background:#1f2937;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:22px;font-weight:900;color:${s.color}">${s.value ?? "—"}</div>
            <div style="font-size:11px;color:#6b7280;margin-top:2px">${s.label}</div>
          </div>`).join("")}
      </div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:10px">Last run: ${fmtDate(data.lastRunAt ?? null)}</div>
      <a href="${sitemap}" style="font-size:12px;color:#60a5fa;text-decoration:none">${sitemap}</a>
      ${results.length ? `
        <table style="width:100%;margin-top:14px;border-top:1px solid #1f2937;padding-top:10px">
          ${engineRows(results)}
        </table>` : ""}
    </div>`;

  const deliwerResults  = report.results.deliwer   ?? [];
  const phResults       = report.results.planetHeroes ?? [];

  const totalOk   = [...deliwerResults, ...phResults].filter(r => r.ok).length;
  const totalFail = [...deliwerResults, ...phResults].filter(r => !r.ok).length;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#030712;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:11px;letter-spacing:3px;color:#10b981;font-weight:700;margin-bottom:8px">WEEKLY REPORT</div>
      <div style="font-size:28px;font-weight:900;color:#f9fafb">🔍 SEO Ping Digest</div>
      <div style="font-size:13px;color:#6b7280;margin-top:6px">${runAt}</div>
    </div>

    <!-- Summary banner -->
    <div style="background:${totalFail === 0 ? "#064e3b" : "#450a0a"};border:1px solid ${totalFail === 0 ? "#10b981" : "#ef4444"};border-radius:12px;padding:16px 20px;text-align:center;margin-bottom:24px">
      <div style="font-size:20px;font-weight:900;color:${totalFail === 0 ? "#10b981" : "#ef4444"}">
        ${totalFail === 0 ? "✓ All engines accepted" : `✗ ${totalFail} engine(s) failed`}
      </div>
      <div style="font-size:13px;color:#9ca3af;margin-top:4px">
        ${totalOk} accepted · ${totalFail} failed · ${(dw.urlCount ?? 0) + (ph.urlCount ?? 0)} total URLs submitted
      </div>
    </div>

    <!-- Domain cards -->
    ${domainCard("🌐", "deliwer.com", "https://www.deliwer.com/sitemap.xml", dw, deliwerResults)}
    ${domainCard("🦸", "planetheroes.deliwer.com", "https://planetheroes.deliwer.com/sitemap-planetheroes.xml", ph, phResults)}

    <!-- Engine coverage legend -->
    <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px 20px;margin-top:4px">
      <div style="font-size:11px;color:#6b7280;font-weight:700;letter-spacing:1px;margin-bottom:10px">ENGINE COVERAGE</div>
      <div style="font-size:12px;color:#9ca3af;line-height:2">
        🔵 Bing &nbsp;·&nbsp; 🔗 IndexNow.org → DuckDuckGo, Naver, Seznam, Yep &nbsp;·&nbsp;
        🟡 Yandex &nbsp;·&nbsp; 🔴 Google (crawls sitemap on next Googlebot visit)
      </div>
    </div>

    <!-- Admin actions -->
    <div style="text-align:center;margin-top:24px;padding-top:20px;border-top:1px solid #1f2937">
      <a href="https://www.deliwer.com/marketing/control" style="display:inline-block;background:#10b981;color:#000;font-weight:700;font-size:13px;padding:10px 24px;border-radius:8px;text-decoration:none;margin-right:10px">
        Open SEO Dashboard
      </a>
      <div style="font-size:11px;color:#374151;margin-top:14px">
        DeliWer · Auto-sent every Monday 06:00 UAE · <a href="https://www.deliwer.com" style="color:#374151">deliwer.com</a>
      </div>
    </div>

  </div>
</body>
</html>`;
}

// ── WhatsApp text version ─────────────────────────────────────────────────────
function buildWhatsAppText(report: ReturnType<typeof getLastPingReport>): string {
  const dw = report.summary.deliwer;
  const ph = report.summary.planetHeroes;

  const dwLine = `  🌐 deliwer.com — ${dw.ok ? "✓ OK" : "✗ FAILED"} (${dw.succeeded}/${dw.succeeded + dw.failed} engines, ${dw.urlCount} URLs)`;
  const phLine = `  🦸 planetheroes.deliwer.com — ${ph.ok ? "✓ OK" : "✗ FAILED"} (${ph.succeeded}/${ph.succeeded + ph.failed} engines, ${ph.urlCount} URLs)`;

  const allOk = dw.ok && ph.ok;

  return `🔍 *SEO Weekly Digest — DeliWer*
${new Date().toLocaleDateString("en-AE", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dubai" })}

*IndexNow Submission:*
${dwLine}
${phLine}

*Status:* ${allOk ? "✅ All engines accepted — no action needed." : "⚠️ Some engines failed — check the SEO dashboard."}

*Sitemaps:*
• deliwer.com/sitemap.xml
• planetheroes.deliwer.com/sitemap-planetheroes.xml

Open dashboard: https://www.deliwer.com/marketing/control`;
}

// ── Main exported function ────────────────────────────────────────────────────
export interface DigestResult {
  ok: boolean;
  runAt: string;
  pingOk: boolean;
  emailSent: boolean;
  whatsappSent: boolean;
  report: ReturnType<typeof getLastPingReport>;
}

export async function runSeoDigest(): Promise<DigestResult> {
  const runAt = new Date().toISOString();
  console.log("[SEO-DIGEST] Starting weekly SEO digest…");

  // 1. Fresh ping for both domains
  let pingOk = false;
  let pingResults: PingResult[] = [];
  try {
    const pingRun = await runSeoPing();
    pingOk = pingRun.ok;
    pingResults = pingRun.results;
    console.log(`[SEO-DIGEST] Ping — ${pingRun.summary.succeeded}/${pingRun.summary.total} engines accepted`);
  } catch (err) {
    console.error("[SEO-DIGEST] Ping error:", err);
  }

  // 2. Pull the stored per-domain report (updated by runSeoPing)
  const report = getLastPingReport();

  // 3. Send HTML email
  let emailSent = false;
  try {
    emailSent = await sendEmail({
      to: FOUNDER_EMAIL,
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      subject: `🔍 SEO Weekly Digest — ${new Date().toLocaleDateString("en-AE", { weekday: "long", day: "numeric", month: "short", timeZone: "Asia/Dubai" })}`,
      html: buildHtmlEmail(report, pingResults),
      text: buildWhatsAppText(report),
    });
    console.log(`[SEO-DIGEST] Email ${emailSent ? "sent" : "failed/simulated"} → ${FOUNDER_EMAIL}`);
  } catch (err) {
    console.error("[SEO-DIGEST] Email error:", err);
  }

  // 4. Send WhatsApp message
  let whatsappSent = false;
  try {
    whatsappSent = await sendWhatsApp(FOUNDER_WHATSAPP, buildWhatsAppText(report));
    console.log(`[SEO-DIGEST] WhatsApp ${whatsappSent ? "sent" : "failed"} → ${FOUNDER_WHATSAPP}`);
  } catch (err) {
    console.error("[SEO-DIGEST] WhatsApp error:", err);
  }

  return { ok: emailSent || whatsappSent, runAt, pingOk, emailSent, whatsappSent, report };
}
