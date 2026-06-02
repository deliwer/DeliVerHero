import { sendEmail } from "../sendgrid-service";

const FROM = "buy@wesellcellular.com";
const ADMIN_EMAIL = process.env.WSC_ADMIN_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "trade@deliwer.com";
const ADMIN_PANEL_URL = process.env.REPLIT_DEV_DOMAIN
  ? `https://${process.env.REPLIT_DEV_DOMAIN}/admin/wsc`
  : "https://deliwer.com/admin/wsc";

function fmt(cents: number) {
  return `$${((cents || 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function sourceLabel(source: string) {
  const map: Record<string, string> = {
    WSC: "WeSellCellular",
    ITOCHU: "Itochu Sourced",
    SUPPLIERDIRECT: "Supplier Direct",
  };
  return map[source] || source;
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    accepted: "#10b981",
    rejected: "#ef4444",
    counter: "#8b5cf6",
    processing: "#f59e0b",
    submitted: "#3b82f6",
    pending: "#94a3b8",
  };
  return map[status] || "#94a3b8";
}

// ── Buyer: Offer Submission Confirmation ──────────────────────────────────────
export async function sendBuyerOfferConfirmation(session: {
  sessionRef: string;
  source: string;
  totalItems: number;
  totalValue: number;
  notes?: string | null;
  createdAt?: Date | string;
}, buyer: {
  email: string;
  companyName: string;
  contactName: string;
}) {
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#1e293b 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #3b82f6;">
      <div style="width:48px;height:48px;background:linear-gradient(135deg,#2563eb,#4f46e5);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <span style="color:white;font-weight:900;font-size:22px;">W</span>
      </div>
      <h1 style="margin:0;color:white;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Offer Session Received</h1>
      <p style="margin:8px 0 0;color:#93c5fd;font-size:14px;">WeSellCellular Wholesale Portal</p>
    </div>

    <!-- Body -->
    <div style="background:#0f172a;border:1px solid #1e293b;border-top:none;border-radius:0 0 16px 16px;padding:32px;">
      <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Hi ${buyer.contactName},</p>
      <p style="color:#e2e8f0;font-size:15px;margin:0 0 24px;line-height:1.6;">
        Your offer session has been received and is now under review. Our team will respond within <strong style="color:white;">1 business day</strong>.
      </p>

      <!-- Session card -->
      <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:24px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Session Reference</p>
            <p style="margin:0;font-size:18px;font-weight:800;color:#60a5fa;font-family:monospace;">${session.sessionRef}</p>
          </div>
          <div style="background:#1d4ed8;color:white;padding:6px 14px;border-radius:9999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
            Submitted
          </div>
        </div>
        <hr style="border:none;border-top:1px solid #334155;margin:20px 0;">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
          <div>
            <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Source</p>
            <p style="margin:0;font-size:14px;color:#e2e8f0;font-weight:600;">${sourceLabel(session.source)}</p>
          </div>
          <div>
            <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Items</p>
            <p style="margin:0;font-size:14px;color:#e2e8f0;font-weight:600;">${session.totalItems} SKUs</p>
          </div>
          <div>
            <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Total Offered</p>
            <p style="margin:0;font-size:14px;color:#60a5fa;font-weight:700;">${fmt(session.totalValue)}</p>
          </div>
        </div>
        ${session.notes ? `
        <hr style="border:none;border-top:1px solid #334155;margin:20px 0;">
        <div>
          <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Your Notes</p>
          <p style="margin:0;font-size:13px;color:#94a3b8;font-style:italic;">${session.notes}</p>
        </div>
        ` : ""}
      </div>

      <!-- What's next -->
      <div style="background:#0f2a1f;border:1px solid #166534;border-radius:10px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:13px;color:#86efac;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">What happens next</p>
        <ol style="margin:0;padding-left:20px;color:#94a3b8;font-size:13px;line-height:2;">
          <li>Our team reviews each offer line — typically within <strong style="color:#e2e8f0;">24 hours</strong></li>
          <li>Lines will be <strong style="color:#10b981;">accepted</strong>, <strong style="color:#ef4444;">rejected</strong>, or <strong style="color:#8b5cf6;">countered</strong> with a new price</li>
          <li>You'll receive an email notification when the review is complete</li>
        </ol>
      </div>

      <p style="color:#64748b;font-size:12px;margin:0;line-height:1.6;">
        Questions? Reply to this email or WhatsApp us at <a href="https://wa.me/971523946311" style="color:#3b82f6;">+971 52 390 6019</a><br>
        Company: ${buyer.companyName}
      </p>
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#1e293b;font-size:11px;margin:16px 0 0;">
      WeSellCellular Wholesale · Powered by ChainTrack
    </p>
  </div>
</body>
</html>`;

  const result = await sendEmail({
    to: buyer.email,
    from: FROM,
    subject: `Offer Session Confirmed — ${session.sessionRef}`,
    html,
    text: `Hi ${buyer.contactName},\n\nYour offer session has been received.\n\nRef: ${session.sessionRef}\nSource: ${sourceLabel(session.source)}\nItems: ${session.totalItems}\nTotal: ${fmt(session.totalValue)}\n\nOur team will review and respond within 1 business day.\n\nWeSellCellular Wholesale`,
  });

  if (result) {
    console.log(`[WSC Email] Buyer confirmation sent → ${buyer.email} for ${session.sessionRef}`);
  }
  return result;
}

// ── Admin: New Offer Alert ────────────────────────────────────────────────────
export async function sendAdminNewOfferAlert(session: {
  sessionRef: string;
  source: string;
  totalItems: number;
  totalValue: number;
  notes?: string | null;
  id: string;
}, buyer: {
  email: string;
  companyName: string;
  contactName: string;
  phone?: string;
  country?: string;
  kycStatus?: string;
}) {
  const reviewLink = `${ADMIN_PANEL_URL}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">
    <!-- Alert header -->
    <div style="background:linear-gradient(135deg,#1c3350 0%,#1e293b 100%);border-radius:16px 16px 0 0;padding:28px 32px;border-left:4px solid #f59e0b;">
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:28px;">🔔</span>
        <div>
          <h1 style="margin:0;color:white;font-size:18px;font-weight:800;">New Offer Session</h1>
          <p style="margin:4px 0 0;color:#fbbf24;font-size:13px;font-weight:600;">Requires review — WSC Admin Panel</p>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#0f172a;border:1px solid #1e293b;border-top:none;border-radius:0 0 16px 16px;padding:28px 32px;">
      <!-- Session details -->
      <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:22px;margin-bottom:20px;">
        <p style="margin:0 0 12px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Session Details</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;width:40%;">Reference</td>
            <td style="padding:6px 0;color:#60a5fa;font-size:13px;font-weight:700;font-family:monospace;">${session.sessionRef}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;">Source</td>
            <td style="padding:6px 0;color:#e2e8f0;font-size:13px;font-weight:600;">${sourceLabel(session.source)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;">Items</td>
            <td style="padding:6px 0;color:#e2e8f0;font-size:13px;font-weight:600;">${session.totalItems} SKUs</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;">Total Offered</td>
            <td style="padding:6px 0;color:#34d399;font-size:15px;font-weight:800;">${fmt(session.totalValue)}</td>
          </tr>
          ${session.notes ? `
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;vertical-align:top;">Notes</td>
            <td style="padding:6px 0;color:#94a3b8;font-size:13px;font-style:italic;">${session.notes}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      <!-- Buyer details -->
      <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:22px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Buyer</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:13px;width:40%;">Company</td>
            <td style="padding:5px 0;color:#e2e8f0;font-size:13px;font-weight:700;">${buyer.companyName}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:13px;">Contact</td>
            <td style="padding:5px 0;color:#e2e8f0;font-size:13px;">${buyer.contactName}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:13px;">Email</td>
            <td style="padding:5px 0;font-size:13px;"><a href="mailto:${buyer.email}" style="color:#60a5fa;">${buyer.email}</a></td>
          </tr>
          ${buyer.phone ? `
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:13px;">Phone</td>
            <td style="padding:5px 0;color:#e2e8f0;font-size:13px;">${buyer.phone}</td>
          </tr>
          ` : ""}
          ${buyer.country ? `
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:13px;">Country</td>
            <td style="padding:5px 0;color:#e2e8f0;font-size:13px;">${buyer.country}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:13px;">KYC Status</td>
            <td style="padding:5px 0;font-size:13px;">
              <span style="background:${buyer.kycStatus === 'verified' ? '#166534' : '#78350f'};color:${buyer.kycStatus === 'verified' ? '#86efac' : '#fde68a'};padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:700;text-transform:uppercase;">
                ${buyer.kycStatus || 'pending'}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="${reviewLink}" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#4f46e5);color:white;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:14px;font-weight:800;letter-spacing:0.5px;">
          Review in Admin Panel →
        </a>
      </div>

      <p style="text-align:center;color:#334155;font-size:11px;margin:20px 0 0;">
        WSC Seller Operations · ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} Dubai Time
      </p>
    </div>
  </div>
</body>
</html>`;

  const result = await sendEmail({
    to: ADMIN_EMAIL,
    from: FROM,
    subject: `🔔 New Offer: ${session.sessionRef} — ${session.totalItems} items · ${fmt(session.totalValue)}`,
    html,
    text: `New offer session submitted.\n\nRef: ${session.sessionRef}\nBuyer: ${buyer.companyName} (${buyer.email})\nItems: ${session.totalItems}\nTotal: ${fmt(session.totalValue)}\n\nReview: ${reviewLink}`,
  });

  if (result) {
    console.log(`[WSC Email] Admin alert sent → ${ADMIN_EMAIL} for ${session.sessionRef}`);
  }
  return result;
}

// ── Buyer: Session Review Update ──────────────────────────────────────────────
export async function sendBuyerSessionUpdateNotification(session: {
  sessionRef: string;
  source: string;
  totalItems: number;
  totalValue: number;
  status: string;
}, buyer: {
  email: string;
  companyName: string;
  contactName: string;
}, summary: {
  accepted: number;
  rejected: number;
  countered: number;
  pending: number;
}) {
  const actionVerb = session.status === "accepted" ? "Accepted" : session.status === "rejected" ? "Rejected" : "Reviewed";
  const color = statusColor(session.status);

  const lineRows = [
    summary.accepted > 0 ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">✓ Accepted</td><td style="padding:6px 0;color:#10b981;font-size:13px;font-weight:700;">${summary.accepted} lines</td></tr>` : "",
    summary.countered > 0 ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">↔ Countered</td><td style="padding:6px 0;color:#8b5cf6;font-size:13px;font-weight:700;">${summary.countered} lines (new prices offered)</td></tr>` : "",
    summary.rejected > 0 ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">✗ Rejected</td><td style="padding:6px 0;color:#ef4444;font-size:13px;font-weight:700;">${summary.rejected} lines</td></tr>` : "",
    summary.pending > 0 ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">⏳ Pending</td><td style="padding:6px 0;color:#94a3b8;font-size:13px;font-weight:700;">${summary.pending} lines</td></tr>` : "",
  ].filter(Boolean).join("");

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#1e293b 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid ${color};">
      <div style="width:48px;height:48px;background:linear-gradient(135deg,#2563eb,#4f46e5);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <span style="color:white;font-weight:900;font-size:22px;">W</span>
      </div>
      <h1 style="margin:0;color:white;font-size:22px;font-weight:800;">Offer Session ${actionVerb}</h1>
      <p style="margin:8px 0 0;font-size:13px;color:#93c5fd;">WeSellCellular Wholesale Portal</p>
    </div>

    <!-- Body -->
    <div style="background:#0f172a;border:1px solid #1e293b;border-top:none;border-radius:0 0 16px 16px;padding:32px;">
      <p style="color:#94a3b8;font-size:14px;margin:0 0 16px;">Hi ${buyer.contactName},</p>
      <p style="color:#e2e8f0;font-size:15px;margin:0 0 24px;line-height:1.6;">
        Your offer session <strong style="color:#60a5fa;font-family:monospace;">${session.sessionRef}</strong> has been reviewed. Here's the breakdown:
      </p>

      <!-- Session status card -->
      <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:22px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <span style="font-size:14px;font-weight:700;color:#e2e8f0;">${session.sessionRef}</span>
          <span style="background:${color}22;color:${color};border:1px solid ${color}44;padding:4px 14px;border-radius:9999px;font-size:12px;font-weight:700;text-transform:uppercase;">
            ${session.status}
          </span>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${lineRows}
        </table>
      </div>

      ${summary.countered > 0 ? `
      <div style="background:#1a0e2e;border:1px solid #4c1d95;border-radius:10px;padding:16px;margin-bottom:20px;">
        <p style="margin:0 0 8px;font-size:13px;color:#c4b5fd;font-weight:700;">↔ Counter Offers</p>
        <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
          ${summary.countered} line${summary.countered !== 1 ? "s" : ""} received counter-offer pricing. Please log in to the portal to review and accept or reject the new prices.
        </p>
      </div>
      ` : ""}

      ${summary.accepted > 0 ? `
      <div style="background:#0f2a1f;border:1px solid #166534;border-radius:10px;padding:16px;margin-bottom:20px;">
        <p style="margin:0 0 8px;font-size:13px;color:#86efac;font-weight:700;">Next Steps for Accepted Lines</p>
        <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
          Our team will be in touch within 24 hours to arrange payment and shipping details for the ${summary.accepted} accepted line${summary.accepted !== 1 ? "s" : ""}.
        </p>
      </div>
      ` : ""}

      <p style="color:#64748b;font-size:12px;margin:0;line-height:1.6;">
        Questions? Reply to this email or WhatsApp <a href="https://wa.me/971523946311" style="color:#3b82f6;">+971 52 390 6019</a><br>
        Company: ${buyer.companyName}
      </p>
    </div>

    <p style="text-align:center;color:#1e293b;font-size:11px;margin:16px 0 0;">WeSellCellular Wholesale · Powered by ChainTrack</p>
  </div>
</body>
</html>`;

  const result = await sendEmail({
    to: buyer.email,
    from: FROM,
    subject: `Offer Session ${actionVerb} — ${session.sessionRef}`,
    html,
    text: `Hi ${buyer.contactName},\n\nYour offer session ${session.sessionRef} has been ${actionVerb.toLowerCase()}.\n\nAccepted: ${summary.accepted} | Countered: ${summary.countered} | Rejected: ${summary.rejected}\n\nWeSellCellular Wholesale`,
  });

  if (result) {
    console.log(`[WSC Email] Buyer update sent → ${buyer.email} for ${session.sessionRef} (${session.status})`);
  }
  return result;
}
