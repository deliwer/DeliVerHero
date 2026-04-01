import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not set - email functionality will be disabled");
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email functionality disabled - would have sent email to:', params.to, 'with subject:', params.subject);
    return true; // Return success for development
  }

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

    // Re-throw rate-limit / account-limit errors so callers can pause gracefully
    const body = error?.response?.body;
    const isRateLimit =
      error?.code === 403 ||
      (Array.isArray(body?.errors) &&
        body.errors.some((e: any) => /exceed|limit/i.test(e?.message || '')));
    if (isRateLimit) {
      const rateLimitError: any = new Error('SendGrid daily sending limit reached');
      rateLimitError.isRateLimit = true;
      throw rateLimitError;
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

export async function sendRelocateOnboardingEmail(
  name: string,
  email: string,
  timeline: string,
  audienceType: string
): Promise<boolean> {
  const subject = `Your Personalized Dubai Relocation Roadmap + 25% Holiday Offer`;
  const isConsumer = audienceType === "consumer";
  
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Welcome to DeliWer</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px;">Your Dubai Relocation Journey Starts Now</p>
      </div>
      
      <div style="padding: 40px 20px; background: white;">
        <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${name},</h2>
        
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          Thank you for your interest in relocating to Dubai! We've received your assessment and are preparing your personalized roadmap based on your timeline of <strong>${timeline}</strong>.
        </p>

        <div style="background: #ecfdf5; border-left: 4px solid #16a34a; padding: 20px; margin: 30px 0;">
          <h3 style="color: #047857; margin-top: 0;">🎉 Christmas Holiday Offer (Limited Time)</h3>
          <p style="color: #065f46; line-height: 1.6; margin: 0;">
            <strong>25% OFF</strong> your relocation consulting package (valued at $2,500-$5,000+ savings)
          </p>
          <p style="color: #065f46; font-size: 13px; margin: 10px 0 0 0;">
            ⏰ Valid through December 31, 2025 | Only 3 spots available
          </p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
          <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Our relocation specialist reviews your assessment (within 24 hours)</li>
            <li>Receive your customized roadmap via email</li>
            <li>Schedule a free 30-minute strategy call via Calendly</li>
            <li>Get matched with vetted partners (real estate, business setup, visa services)</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://calendly.com/deliwer/consultation" 
             style="background: #16a34a; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
            Schedule Your Strategy Call Now
          </a>
        </div>

        <div style="background: #fff3cd; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; text-align: center; margin: 30px 0;">
          <p style="color: #92400e; margin: 0; font-weight: bold;">
            ⚡ Why Choose DeliWer?
          </p>
          <p style="color: #92400e; font-size: 14px; margin: 10px 0 0 0;">
            Partner-verified model (zero payment risk) • Money-back guarantee • 24/7 WhatsApp support • Trusted by 500+ families & founders
          </p>
        </div>

        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
          Questions? Reply to this email or contact our team at service@deliwer.com<br />
          <strong>Phone:</strong> +971 4 250 1500
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This email was sent by DeliWer Relocation Services. 
          <a href="#" style="color: #16a34a;">Unsubscribe</a> | 
          <a href="#" style="color: #16a34a;">Update Preferences</a>
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    from: 'service@deliwer.com',
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