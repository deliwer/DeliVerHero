import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: any;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const msg: any = {
      to: params.to,
      from: params.from || 'noreply@deliwer.com',
      subject: params.subject,
    };

    if (params.templateId) {
      msg.templateId = params.templateId;
      msg.dynamicTemplateData = params.dynamicTemplateData || {};
    } else {
      if (params.text) msg.text = params.text;
      if (params.html) msg.html = params.html;
    }

    await sgMail.send(msg);
    console.log('Email sent successfully to:', params.to);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.response) {
      console.error('SendGrid error body:', error.response.body);
    }
    return false;
  }
}

export async function sendBulkEmail(
  recipients: string[],
  params: Omit<EmailParams, 'to'>
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  // SendGrid allows up to 1000 recipients per request
  const batchSize = 1000;
  const batches = [];
  
  for (let i = 0; i < recipients.length; i += batchSize) {
    batches.push(recipients.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    try {
      await sendEmail({
        ...params,
        to: batch
      });
      sent += batch.length;
    } catch (error) {
      console.error('Batch email failed:', error);
      failed += batch.length;
    }
  }

  return { sent, failed };
}

export async function sendCorporateWelcomeEmail(email: string, companyName: string): Promise<boolean> {
  const subject = `Welcome to Cobone x DeliWer Corporate CSR Program`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2563eb, #10b981); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to the Future of Corporate CSR</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Cobone x DeliWer Partnership</p>
      </div>
      
      <div style="padding: 40px 20px; background: white;">
        <h2 style="color: #1f2937; margin-bottom: 20px;">Dear ${companyName} Team,</h2>
        
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          Thank you for your interest in our revolutionary Corporate CSR Trade-In Program. We're excited to help ${companyName} 
          turn old iPhones into clean water systems while building your company's sustainability credentials.
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
          <ul style="color: #4b5563; line-height: 1.8;">
            <li>Our B2B team will contact you within 24 hours</li>
            <li>We'll assess your device inventory and provide a custom quote</li>
            <li>Schedule pickup and conversion to AquaCafe water systems</li>
            <li>Receive CSR certificates and co-branded recognition</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://deliwer.com/cobone-corporate" 
             style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            View Your Corporate Dashboard
          </a>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
          Questions? Reply to this email or call us at +971 4 123 4567
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This email was sent by DeliWer Corporate Team. 
          <a href="#" style="color: #2563eb;">Unsubscribe</a> | 
          <a href="#" style="color: #2563eb;">Update Preferences</a>
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    from: 'corporate@deliwer.com',
    subject,
    html
  });
}

export async function sendCorporateCampaignEmail(
  email: string,
  companyName: string,
  campaignData: any
): Promise<boolean> {
  const subject = `Exclusive Corporate Offer: Transform Your CSR Impact with Cobone x DeliWer`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2563eb, #10b981); padding: 40px 20px; text-align: center;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 20px;">
          <span style="color: white; font-size: 24px; font-weight: bold;">Cobone</span>
          <span style="color: rgba(255,255,255,0.7); font-size: 20px;">×</span>
          <span style="color: white; font-size: 24px; font-weight: bold;">DeliWer</span>
        </div>
        <h1 style="color: white; margin: 0; font-size: 28px;">Transform Old iPhones into Clean Water</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Exclusive Corporate CSR Program</p>
      </div>
      
      <div style="padding: 40px 20px; background: white;">
        <h2 style="color: #1f2937; margin-bottom: 20px;">Dear ${companyName},</h2>
        
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          Join leading UAE corporations in the most innovative CSR program of 2025. Convert your company's old iPhones 
          into clean water systems for your employees while earning sustainability recognition.
        </p>

        <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">🏆 Limited-Time Corporate Benefits</h3>
          <ul style="color: #1e40af; line-height: 1.8; margin: 0;">
            <li>Instant valuation of corporate device inventory</li>
            <li>Employee wellness perks with AquaCafe water systems</li>
            <li>Co-branded CSR recognition on Cobone platform</li>
            <li>Media coverage and positive PR exposure</li>
          </ul>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
          <h3 style="color: #15803d; margin-top: 0;">📊 Live Impact So Far</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
            <div>
              <div style="font-size: 24px; font-weight: bold; color: #15803d;">1,000+</div>
              <div style="color: #16a34a; font-size: 14px;">Devices Traded</div>
            </div>
            <div>
              <div style="font-size: 24px; font-weight: bold; color: #15803d;">50,000L</div>
              <div style="color: #16a34a; font-size: 14px;">Water Purified</div>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://deliwer.com/cobone-corporate" 
             style="background: #2563eb; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
            Get Your Corporate Quote
          </a>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center; margin: 30px 0;">
          <p style="color: #92400e; margin: 0; font-weight: bold;">
            ⏰ Early Bird Offer: First 20 companies get 25% bonus trade value
          </p>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
          Questions? Reply to this email or schedule a consultation at corporate@deliwer.com
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This email was sent by DeliWer Corporate Team. 
          <a href="#unsubscribe" style="color: #2563eb;">Unsubscribe</a> | 
          <a href="#preferences" style="color: #2563eb;">Update Preferences</a>
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    from: 'corporate@deliwer.com',
    subject,
    html
  });
}