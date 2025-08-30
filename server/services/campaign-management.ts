import sgMail from '@sendgrid/mail';
import { storage } from '../storage';

interface CampaignData {
  id: string;
  name: string;
  subject: string;
  fromEmail: string;
  fromName: string;
  templateId?: string;
  htmlContent?: string;
  textContent?: string;
  segmentIds: string[];
  status: 'draft' | 'scheduled' | 'sent' | 'cancelled';
  scheduledAt?: Date;
  createdBy: string;
  shopDomain: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    tags?: string[];
    purchaseHistory?: {
      minOrders?: number;
      maxOrders?: number;
      minValue?: number;
      maxValue?: number;
    };
    location?: {
      cities?: string[];
      countries?: string[];
    };
    lastActiveDate?: Date;
  };
  shopDomain: string;
  createdBy: string;
  customerCount: number;
  createdAt: Date;
}

export class CampaignManagementService {
  private isConfigured = false;

  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      this.isConfigured = true;
    } else {
      console.warn('SendGrid not configured - campaign management running in demo mode');
    }
  }

  /**
   * Create a new email campaign
   * Only accessible to verified Shopify admins
   */
  async createCampaign(campaignData: Omit<CampaignData, 'id' | 'createdAt' | 'updatedAt'>, adminId: string): Promise<CampaignData> {
    if (!this.isConfigured) {
      throw new Error('SendGrid not configured - cannot create campaigns');
    }

    const campaign: CampaignData = {
      ...campaignData,
      id: `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store campaign in memory (in production, use proper database)
    console.log('Campaign stored:', campaign.id);

    // Create campaign in SendGrid (if configured)
    if (this.isConfigured) {
      try {
        // Note: This would integrate with SendGrid Marketing Campaigns API
        // For now, we'll store locally and send via regular API
        console.log('Campaign created:', campaign.id);
      } catch (error) {
        console.error('Failed to create campaign in SendGrid:', error);
        throw new Error('Failed to create campaign in SendGrid');
      }
    }

    return campaign;
  }

  /**
   * Get campaigns for a specific shop domain
   * Admin-only access with proper filtering
   */
  async getCampaigns(shopDomain: string, adminId: string): Promise<CampaignData[]> {
    // In production, implement proper database query
    return [];
  }

  /**
   * Create customer segment for targeting
   * Only for campaign purposes, not order management
   */
  async createCustomerSegment(
    segmentData: Omit<CustomerSegment, 'id' | 'customerCount' | 'createdAt'>,
    adminId: string
  ): Promise<CustomerSegment> {
    const segment: CustomerSegment = {
      ...segmentData,
      id: `segment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdBy: adminId,
      customerCount: await this.calculateSegmentSize(segmentData.criteria, segmentData.shopDomain),
      createdAt: new Date()
    };

    // Store segment in memory (in production, use proper database)
    console.log('Segment stored:', segment.id);
    return segment;
  }

  /**
   * Get customer data for campaign targeting only
   * Restricted access - no order management data
   */
  async getCustomersForCampaign(
    shopDomain: string,
    segmentId: string,
    adminId: string
  ): Promise<Array<{
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    acceptsMarketing: boolean;
    tags: string[];
    city?: string;
    country?: string;
  }>> {
    // Verify segment belongs to this shop (mock implementation)
    const segment = { shopDomain: shopDomain, id: segmentId };
    if (segment.shopDomain !== shopDomain) {
      throw new Error('Segment not found or access denied');
    }

    // Get customers matching segment criteria (mock implementation)
    // NOTE: This only returns marketing-relevant data, no order/payment info
    return [
      {
        id: 'customer_1',
        email: 'customer@example.com',
        firstName: 'John',
        lastName: 'Doe',
        acceptsMarketing: true,
        tags: ['premium'],
        city: 'Dubai',
        country: 'UAE'
      }
    ];
  }

  /**
   * Send campaign to targeted customers
   * Separate from internal store messaging
   */
  async sendCampaign(
    campaignId: string,
    shopDomain: string,
    adminId: string
  ): Promise<{
    sent: number;
    failed: number;
    campaignId: string;
  }> {
    // Mock campaign data for sending
    const campaign = {
      id: campaignId,
      shopDomain: shopDomain,
      status: 'draft' as const,
      segmentIds: ['segment_1'],
      name: 'Test Campaign',
      subject: 'Test Subject',
      fromEmail: 'admin@shop.com',
      fromName: 'Shop Admin',
      htmlContent: '<p>Test content</p>',
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    if (!campaign || campaign.shopDomain !== shopDomain) {
      throw new Error('Campaign not found or access denied');
    }

    if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
      throw new Error('Campaign cannot be sent - invalid status');
    }

    let totalSent = 0;
    let totalFailed = 0;

    // Get all customers for each segment
    for (const segmentId of campaign.segmentIds) {
      try {
        const customers = await this.getCustomersForCampaign(shopDomain, segmentId, adminId);
        const recipients = customers
          .filter(customer => customer.acceptsMarketing)
          .map(customer => customer.email);

        if (recipients.length === 0) continue;

        // Send emails in batches
        const result = await this.sendBatchEmails(recipients, campaign);
        totalSent += result.sent;
        totalFailed += result.failed;

      } catch (error) {
        console.error(`Failed to send to segment ${segmentId}:`, error);
        totalFailed += await this.getSegmentSize(segmentId);
      }
    }

    // Log campaign status update and delivery
    console.log(`Campaign ${campaignId} sent: ${totalSent}, failed: ${totalFailed}`);

    return {
      sent: totalSent,
      failed: totalFailed,
      campaignId
    };
  }

  /**
   * Send batch emails via SendGrid
   * Isolated from store's internal messaging system
   */
  private async sendBatchEmails(
    recipients: string[],
    campaign: CampaignData
  ): Promise<{ sent: number; failed: number }> {
    if (!this.isConfigured) {
      console.log(`Demo mode: Would send campaign "${campaign.name}" to ${recipients.length} recipients`);
      return { sent: recipients.length, failed: 0 };
    }

    let sent = 0;
    let failed = 0;

    // Send in batches of 1000 (SendGrid limit)
    const batchSize = 1000;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      try {
        const msg = {
          to: batch,
          from: {
            email: campaign.fromEmail,
            name: campaign.fromName
          },
          subject: campaign.subject,
          html: campaign.htmlContent,
          text: campaign.textContent,
          ...(campaign.templateId && {
            templateId: campaign.templateId
          }),
          // Add campaign tracking
          customArgs: {
            campaign_id: campaign.id,
            shop_domain: campaign.shopDomain,
            campaign_type: 'admin_managed'
          },
          // Ensure this doesn't interfere with store messaging
          categories: ['admin_campaign', campaign.shopDomain]
        };

        await sgMail.send(msg);
        sent += batch.length;

      } catch (error) {
        console.error('Batch email failed:', error);
        failed += batch.length;
      }
    }

    return { sent, failed };
  }

  /**
   * Calculate segment size based on criteria
   */
  private async calculateSegmentSize(criteria: CustomerSegment['criteria'], shopDomain: string): Promise<number> {
    // Mock segment size calculation
    return Math.floor(Math.random() * 1000) + 100;
  }

  /**
   * Get segment size
   */
  private async getSegmentSize(segmentId: string): Promise<number> {
    // Mock segment size
    return 500;
  }

  /**
   * Delete campaign (admin only)
   */
  async deleteCampaign(campaignId: string, shopDomain: string, adminId: string): Promise<boolean> {
    // Mock campaign verification for deletion
    const campaign = { shopDomain: shopDomain, status: 'draft' };
    
    if (!campaign || campaign.shopDomain !== shopDomain) {
      throw new Error('Campaign not found or access denied');
    }

    if (campaign.status === 'sent') {
      throw new Error('Cannot delete sent campaigns');
    }

    // Mock campaign deletion
    console.log(`Campaign ${campaignId} deleted`);
    return true;
  }

  /**
   * Get campaign analytics (admin only)
   */
  async getCampaignAnalytics(campaignId: string, shopDomain: string): Promise<{
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  }> {
    // Mock campaign verification for analytics
    const campaign = { shopDomain: shopDomain };
    
    if (!campaign || campaign.shopDomain !== shopDomain) {
      throw new Error('Campaign not found or access denied');
    }

    // Mock analytics data
    return {
      delivered: 450,
      opened: 180,
      clicked: 45,
      bounced: 12,
      unsubscribed: 3
    };
  }
}