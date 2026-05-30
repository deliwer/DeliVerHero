import { sendEmail } from './sendgrid-service';
import { storage } from './storage';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  source: string;
  serviceType: 'home-service' | 'housing' | 'relocate' | 'consultation' | 'business-setup' | 'enquiry';
  intent?: string;
  message?: string;
  metadata?: Record<string, any>;
  adminEmail?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

interface LeadResult {
  success: boolean;
  leadId?: string;
  emailSent: boolean;
  notificationSent: boolean;
  fallbackUsed: boolean;
  error?: string;
}

const ADMIN_EMAIL = 'info@deliwer.com';
const FALLBACK_EMAIL = 'corporate@deliwer.com';

export async function processLead(data: LeadData): Promise<LeadResult> {
  const result: LeadResult = {
    success: false,
    emailSent: false,
    notificationSent: false,
    fallbackUsed: false
  };

  try {
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    result.leadId = leadId;

    const timestamp = new Date().toISOString();
    console.log(`[LEAD] Processing lead ${leadId}: ${data.name} (${data.email}) - ${data.serviceType}`);

    const userEmailSent = await sendUserConfirmationEmail(data);
    result.emailSent = userEmailSent;

    if (!userEmailSent) {
      console.warn(`[LEAD] User confirmation email failed for ${leadId}, using fallback`);
      result.fallbackUsed = true;
      await logLeadToConsole(leadId, data, 'USER_EMAIL_FAILED');
    }

    const adminEmailSent = await sendAdminNotificationEmail(leadId, data, data.adminEmail);
    result.notificationSent = adminEmailSent;

    if (!adminEmailSent) {
      console.warn(`[LEAD] Admin notification email failed for ${leadId}, using fallback`);
      result.fallbackUsed = true;
      await logLeadToConsole(leadId, data, 'ADMIN_EMAIL_FAILED');
    }

    console.log(`[LEAD] Lead ${leadId} processed successfully. Email: ${result.emailSent}, Notification: ${result.notificationSent}`);
    result.success = true;

  } catch (error: any) {
    console.error(`[LEAD] Critical error processing lead:`, error);
    result.error = error.message;
    
    await logLeadToConsole(result.leadId || 'unknown', data, 'CRITICAL_ERROR');
  }

  return result;
}

async function sendUserConfirmationEmail(data: LeadData): Promise<boolean> {
  const serviceLabels: Record<string, string> = {
    'home-service': 'Home Service',
    'housing': 'Housing',
    'relocate': 'Relocation',
    'consultation': 'Relocation Consultation',
    'business-setup': 'Business Setup',
    'enquiry': 'General Enquiry'
  };

  const serviceName = serviceLabels[data.serviceType] || data.serviceType;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
      <div style="background: linear-gradient(135deg, #10b981, #0d9488); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${data.name}!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">We've received your ${serviceName} enquiry</p>
      </div>
      
      <div style="padding: 40px 20px; background: white;">
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out to DeliWer. Our team has received your enquiry and will contact you within 24 hours.
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
          <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Our advisor will review your requirements</li>
            <li>We'll prepare personalized recommendations</li>
            <li>You'll receive a call or WhatsApp within 24 hours</li>
          </ul>
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 30px 0;">
          <p style="color: #065f46; margin: 0; font-weight: bold;">Need immediate assistance?</p>
          <p style="color: #047857; margin: 5px 0 0 0;">
            WhatsApp: <a href="https://wa.me/971523906019" style="color: #047857;">+971 52 394 6311</a>
          </p>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://deliwer.com" 
             style="background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            Explore Our Services
          </a>
        </div>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This email was sent by DeliWer. 
          <a href="https://deliwer.com/privacy" style="color: #10b981;">Privacy Policy</a>
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: data.email,
    from: 'info@deliwer.com',
    subject: `Thank you for your ${serviceName} enquiry - DeliWer`,
    html
  });
}

async function sendAdminNotificationEmail(leadId: string, data: LeadData, overrideAdminEmail?: string): Promise<boolean> {
  const urgencyBadge =
    data.serviceType === 'housing' || data.serviceType === 'relocate' || data.serviceType === 'consultation' || data.serviceType === 'business-setup'
      ? '🔥 HIGH PRIORITY'
      : '📋 STANDARD';
  const recipientEmail = overrideAdminEmail || ADMIN_EMAIL;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1f2937; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Lead Alert ${urgencyBadge}</h1>
      </div>
      
      <div style="padding: 30px 20px; background: white;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Lead ID</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${leadId}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">
              <a href="mailto:${data.email}">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">
              ${data.phone ? `<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}">${data.phone}</a>` : 'Not provided'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Service</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${data.serviceType.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Source Page</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${data.source}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Intent</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${data.intent || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Timestamp</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}</td>
          </tr>
        </table>

        ${data.message ? `
        <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
          <strong style="color: #374151;">Message:</strong>
          <p style="color: #6b7280; margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        ` : ''}

        ${data.utmSource ? `
        <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
          <strong style="color: #92400e;">Campaign Tracking:</strong>
          <p style="color: #78350f; margin: 5px 0 0 0;">
            Source: ${data.utmSource || 'N/A'} | 
            Medium: ${data.utmMedium || 'N/A'} | 
            Campaign: ${data.utmCampaign || 'N/A'}
          </p>
        </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0 0 0;">
          <a href="https://wa.me/${data.phone?.replace(/[^0-9]/g, '') || ''}" 
             style="background: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px;">
            WhatsApp Lead
          </a>
          <a href="mailto:${data.email}" 
             style="background: #3b82f6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Email Lead
          </a>
        </div>
      </div>
    </div>
  `;

  const primarySent = await sendEmail({
    to: recipientEmail,
    from: 'info@deliwer.com',
    subject: `[NEW LEAD] ${data.serviceType.toUpperCase()} - ${data.name}`,
    html
  });

  if (!primarySent) {
    return sendEmail({
      to: FALLBACK_EMAIL,
      from: 'info@deliwer.com',
      subject: `[URGENT - PRIMARY FAILED] New Lead: ${data.name}`,
      html
    });
  }

  return primarySent;
}

async function logLeadToConsole(leadId: string, data: LeadData, errorType: string): Promise<void> {
  const logEntry = {
    timestamp: new Date().toISOString(),
    leadId,
    errorType,
    leadData: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceType: data.serviceType,
      source: data.source,
      intent: data.intent,
      message: data.message?.substring(0, 200)
    }
  };

  console.error(`[LEAD-FAILSAFE] ${JSON.stringify(logEntry)}`);
}

export function trackCTAEvent(eventName: string, metadata: Record<string, any>): void {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...metadata
  };
  console.log(`[CTA-TRACK] ${JSON.stringify(event)}`);
}
