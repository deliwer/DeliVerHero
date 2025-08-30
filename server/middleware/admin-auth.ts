import { Request, Response, NextFunction } from 'express';

// Extended request interface for admin context
export interface AdminRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: 'owner' | 'admin' | 'staff';
    shopDomain: string;
    permissions: string[];
  };
}

// Admin role permissions mapping
const ADMIN_PERMISSIONS = {
  owner: [
    'manage_campaigns',
    'manage_admins', 
    'view_analytics',
    'manage_roles',
    'access_customer_data',
    'manage_integrations'
  ],
  admin: [
    'manage_campaigns',
    'view_analytics', 
    'access_customer_data'
  ],
  staff: [
    'view_analytics'
  ]
};

/**
 * Middleware to authenticate and authorize Shopify store admins
 * This ensures only verified Shopify admins can access campaign management
 */
export function authenticateShopifyAdmin(requiredPermissions: string[] = []) {
  return async (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const shopifySession = req.headers['x-shopify-session'];
      const shopDomain = req.headers['x-shopify-shop-domain'] as string;

      // Verify Shopify session exists
      if (!authHeader || !shopifySession || !shopDomain) {
        return res.status(401).json({ 
          error: 'Unauthorized: Valid Shopify admin session required',
          code: 'INVALID_ADMIN_SESSION'
        });
      }

      // Extract admin token
      const token = authHeader.replace('Bearer ', '');
      
      // Verify admin token with Shopify (in production, validate with Shopify API)
      const adminData = await verifyShopifyAdminToken(token, shopDomain, shopifySession as string);
      
      if (!adminData) {
        return res.status(401).json({ 
          error: 'Unauthorized: Invalid admin credentials',
          code: 'INVALID_ADMIN_TOKEN'
        });
      }

      // Check if admin has required permissions
      const adminPermissions = ADMIN_PERMISSIONS[adminData.role] || [];
      const hasRequiredPermissions = requiredPermissions.every(permission => 
        adminPermissions.includes(permission)
      );

      if (!hasRequiredPermissions) {
        return res.status(403).json({ 
          error: 'Forbidden: Insufficient permissions for this action',
          code: 'INSUFFICIENT_PERMISSIONS',
          required: requiredPermissions,
          granted: adminPermissions
        });
      }

      // Attach admin context to request
      req.admin = {
        id: adminData.id,
        email: adminData.email,
        role: adminData.role,
        shopDomain: shopDomain,
        permissions: adminPermissions
      };

      next();
    } catch (error) {
      console.error('Admin authentication error:', error);
      res.status(500).json({ 
        error: 'Authentication service error',
        code: 'AUTH_SERVICE_ERROR'
      });
    }
  };
}

/**
 * Verify Shopify admin token and session
 * In production, this should validate with Shopify's Admin API
 */
async function verifyShopifyAdminToken(
  token: string, 
  shopDomain: string, 
  sessionId: string
): Promise<{
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'staff';
} | null> {
  try {
    // For development - mock admin verification
    // In production, validate with Shopify Admin API:
    // const response = await fetch(`https://${shopDomain}.myshopify.com/admin/api/2024-01/users/current.json`, {
    //   headers: { 'X-Shopify-Access-Token': token }
    // });

    // Mock admin data for development
    if (token.includes('admin_token')) {
      return {
        id: 'admin_123',
        email: 'admin@' + shopDomain,
        role: token.includes('owner') ? 'owner' : token.includes('staff') ? 'staff' : 'admin'
      };
    }

    return null;
  } catch (error) {
    console.error('Shopify admin verification failed:', error);
    return null;
  }
}

/**
 * Middleware to ensure the admin has access to customer data for campaigns only
 * This restricts access to customer data for email campaigns, not order management
 */
export function restrictCustomerDataAccess(allowedOperations: string[] = ['campaign_targeting']) {
  return (req: AdminRequest, res: Response, next: NextFunction) => {
    const operation = req.headers['x-data-operation'] as string;
    
    if (operation && !allowedOperations.includes(operation)) {
      return res.status(403).json({
        error: 'Forbidden: Customer data access restricted to campaign operations only',
        code: 'RESTRICTED_DATA_ACCESS',
        allowed_operations: allowedOperations
      });
    }

    next();
  };
}

/**
 * Middleware to log admin actions for audit purposes
 */
export function auditAdminAction(action: string) {
  return (req: AdminRequest, res: Response, next: NextFunction) => {
    console.log(`Admin Action: ${action}`, {
      adminId: req.admin?.id,
      adminEmail: req.admin?.email,
      shopDomain: req.admin?.shopDomain,
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    next();
  };
}