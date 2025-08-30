import { Router } from 'express';
import { CampaignManagementService } from '../services/campaign-management';
import { 
  authenticateShopifyAdmin, 
  restrictCustomerDataAccess, 
  auditAdminAction,
  AdminRequest 
} from '../middleware/admin-auth';

const router = Router();
const campaignService = new CampaignManagementService();

// All routes require admin authentication
router.use(authenticateShopifyAdmin(['manage_campaigns']));

/**
 * Get all campaigns for the authenticated admin's shop
 * GET /api/admin/campaigns
 */
router.get('/', 
  auditAdminAction('view_campaigns'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const campaigns = await campaignService.getCampaigns(
        req.admin.shopDomain,
        req.admin.id
      );

      res.json({
        campaigns,
        total: campaigns.length,
        shop: req.admin.shopDomain
      });
    } catch (error: any) {
      console.error('Failed to fetch campaigns:', error);
      res.status(500).json({ 
        error: 'Failed to fetch campaigns',
        details: error.message 
      });
    }
  }
);

/**
 * Create a new email campaign
 * POST /api/admin/campaigns
 */
router.post('/',
  auditAdminAction('create_campaign'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const {
        name,
        subject,
        fromEmail,
        fromName,
        templateId,
        htmlContent,
        textContent,
        segmentIds,
        scheduledAt
      } = req.body;

      // Validate required fields
      if (!name || !subject || !fromEmail || !fromName || !segmentIds?.length) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          required: ['name', 'subject', 'fromEmail', 'fromName', 'segmentIds']
        });
      }

      // Ensure email content is provided
      if (!templateId && !htmlContent) {
        return res.status(400).json({ 
          error: 'Either templateId or htmlContent must be provided'
        });
      }

      const campaignData = {
        name,
        subject,
        fromEmail,
        fromName,
        templateId,
        htmlContent,
        textContent,
        segmentIds,
        status: (scheduledAt ? 'scheduled' : 'draft') as 'scheduled' | 'draft',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        shopDomain: req.admin.shopDomain,
        createdBy: req.admin.id
      };

      const campaign = await campaignService.createCampaign(campaignData, req.admin.id);

      res.status(201).json({
        success: true,
        campaign,
        message: 'Campaign created successfully'
      });
    } catch (error: any) {
      console.error('Failed to create campaign:', error);
      res.status(400).json({ 
        error: 'Failed to create campaign',
        details: error.message 
      });
    }
  }
);

/**
 * Send a campaign
 * POST /api/admin/campaigns/:id/send
 */
router.post('/:id/send',
  auditAdminAction('send_campaign'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const result = await campaignService.sendCampaign(
        req.params.id,
        req.admin.shopDomain,
        req.admin.id
      );

      res.json({
        success: true,
        result,
        message: `Campaign sent to ${result.sent} recipients`
      });
    } catch (error: any) {
      console.error('Failed to send campaign:', error);
      res.status(400).json({ 
        error: 'Failed to send campaign',
        details: error.message 
      });
    }
  }
);

/**
 * Delete a campaign
 * DELETE /api/admin/campaigns/:id
 */
router.delete('/:id',
  authenticateShopifyAdmin(['manage_campaigns']),
  auditAdminAction('delete_campaign'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const success = await campaignService.deleteCampaign(
        req.params.id,
        req.admin.shopDomain,
        req.admin.id
      );

      if (success) {
        res.json({
          success: true,
          message: 'Campaign deleted successfully'
        });
      } else {
        res.status(404).json({
          error: 'Campaign not found'
        });
      }
    } catch (error: any) {
      console.error('Failed to delete campaign:', error);
      res.status(400).json({ 
        error: 'Failed to delete campaign',
        details: error.message 
      });
    }
  }
);

/**
 * Get campaign analytics
 * GET /api/admin/campaigns/:id/analytics
 */
router.get('/:id/analytics',
  authenticateShopifyAdmin(['view_analytics']),
  auditAdminAction('view_campaign_analytics'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const analytics = await campaignService.getCampaignAnalytics(
        req.params.id,
        req.admin.shopDomain
      );

      res.json({
        campaignId: req.params.id,
        analytics,
        generatedAt: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Failed to fetch campaign analytics:', error);
      res.status(400).json({ 
        error: 'Failed to fetch campaign analytics',
        details: error.message 
      });
    }
  }
);

/**
 * Customer segment management routes
 */

/**
 * Get customer segments
 * GET /api/admin/segments
 */
router.get('/segments',
  restrictCustomerDataAccess(['campaign_targeting']),
  auditAdminAction('view_segments'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const segments = await campaignService.getCampaigns(req.admin.shopDomain, req.admin.id);
      res.json({ segments });
    } catch (error: any) {
      console.error('Failed to fetch segments:', error);
      res.status(500).json({ 
        error: 'Failed to fetch segments',
        details: error.message 
      });
    }
  }
);

/**
 * Create customer segment
 * POST /api/admin/segments
 */
router.post('/segments',
  restrictCustomerDataAccess(['campaign_targeting']),
  auditAdminAction('create_segment'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const { name, description, criteria } = req.body;

      if (!name || !criteria) {
        return res.status(400).json({ 
          error: 'Name and criteria are required'
        });
      }

      const segmentData = {
        name,
        description,
        criteria,
        shopDomain: req.admin.shopDomain,
        createdBy: req.admin.id
      };

      const segment = await campaignService.createCustomerSegment(segmentData, req.admin.id);

      res.status(201).json({
        success: true,
        segment,
        message: 'Customer segment created successfully'
      });
    } catch (error: any) {
      console.error('Failed to create segment:', error);
      res.status(400).json({ 
        error: 'Failed to create segment',
        details: error.message 
      });
    }
  }
);

/**
 * Get customers for a segment (campaign targeting only)
 * GET /api/admin/segments/:id/customers
 */
router.get('/segments/:id/customers',
  restrictCustomerDataAccess(['campaign_targeting']),
  auditAdminAction('view_segment_customers'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      // Set data operation header for audit
      req.headers['x-data-operation'] = 'campaign_targeting';

      const customers = await campaignService.getCustomersForCampaign(
        req.admin.shopDomain,
        req.params.id,
        req.admin.id
      );

      res.json({
        segmentId: req.params.id,
        customers,
        count: customers.length,
        dataUsage: 'campaign_targeting_only'
      });
    } catch (error: any) {
      console.error('Failed to fetch segment customers:', error);
      res.status(400).json({ 
        error: 'Failed to fetch segment customers',
        details: error.message 
      });
    }
  }
);

export default router;