import { Router } from 'express';
import { 
  authenticateShopifyAdmin, 
  auditAdminAction,
  AdminRequest 
} from '../middleware/admin-auth';

const router = Router();

// Admin role definitions
const ADMIN_ROLES = {
  owner: {
    name: 'Store Owner',
    description: 'Full access to all store features and admin management',
    permissions: [
      'manage_campaigns',
      'manage_admins', 
      'view_analytics',
      'manage_roles',
      'access_customer_data',
      'manage_integrations'
    ]
  },
  admin: {
    name: 'Store Admin',
    description: 'Campaign management and analytics access',
    permissions: [
      'manage_campaigns',
      'view_analytics', 
      'access_customer_data'
    ]
  },
  staff: {
    name: 'Staff Member',
    description: 'View-only access to analytics',
    permissions: [
      'view_analytics'
    ]
  }
};

// Mock admin database (in production, use proper database)
const adminDatabase = new Map<string, {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'staff';
  shopDomain: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}>();

/**
 * Get all available roles and their permissions
 * GET /api/admin/roles
 */
router.get('/',
  authenticateShopifyAdmin(['manage_roles']),
  auditAdminAction('view_roles'),
  async (req: AdminRequest, res) => {
    try {
      res.json({
        roles: ADMIN_ROLES,
        currentAdmin: {
          role: req.admin?.role,
          permissions: req.admin?.permissions
        }
      });
    } catch (error: any) {
      console.error('Failed to fetch roles:', error);
      res.status(500).json({ 
        error: 'Failed to fetch roles',
        details: error.message 
      });
    }
  }
);

/**
 * Get all admins for the current shop
 * GET /api/admin/roles/admins
 */
router.get('/admins',
  authenticateShopifyAdmin(['manage_admins']),
  auditAdminAction('view_admins'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      // Get all admins for this shop
      const shopAdmins = Array.from(adminDatabase.values())
        .filter(admin => admin.shopDomain === req.admin.shopDomain && admin.isActive);

      res.json({
        admins: shopAdmins.map(admin => ({
          id: admin.id,
          email: admin.email,
          role: admin.role,
          roleName: ADMIN_ROLES[admin.role].name,
          permissions: ADMIN_ROLES[admin.role].permissions,
          createdAt: admin.createdAt,
          createdBy: admin.createdBy
        })),
        total: shopAdmins.length,
        shop: req.admin.shopDomain
      });
    } catch (error: any) {
      console.error('Failed to fetch admins:', error);
      res.status(500).json({ 
        error: 'Failed to fetch admins',
        details: error.message 
      });
    }
  }
);

/**
 * Add a new admin to the shop
 * POST /api/admin/roles/admins
 */
router.post('/admins',
  authenticateShopifyAdmin(['manage_admins']),
  auditAdminAction('create_admin'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const { email, role } = req.body;

      // Validate input
      if (!email || !role) {
        return res.status(400).json({ 
          error: 'Email and role are required'
        });
      }

      if (!ADMIN_ROLES[role as keyof typeof ADMIN_ROLES]) {
        return res.status(400).json({ 
          error: 'Invalid role',
          validRoles: Object.keys(ADMIN_ROLES)
        });
      }

      // Only owners can create other owners
      if (role === 'owner' && req.admin.role !== 'owner') {
        return res.status(403).json({ 
          error: 'Only store owners can assign owner role'
        });
      }

      // Check if admin already exists
      const existingAdmin = Array.from(adminDatabase.values())
        .find(admin => 
          admin.email === email && 
          admin.shopDomain === req.admin.shopDomain && 
          admin.isActive
        );

      if (existingAdmin) {
        return res.status(409).json({ 
          error: 'Admin with this email already exists'
        });
      }

      // Create new admin
      const newAdmin = {
        id: `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        role: role as 'owner' | 'admin' | 'staff',
        shopDomain: req.admin.shopDomain,
        createdBy: req.admin.id,
        createdAt: new Date(),
        isActive: true
      };

      adminDatabase.set(newAdmin.id, newAdmin);

      res.status(201).json({
        success: true,
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          role: newAdmin.role,
          roleName: ADMIN_ROLES[newAdmin.role].name,
          permissions: ADMIN_ROLES[newAdmin.role].permissions,
          createdAt: newAdmin.createdAt
        },
        message: 'Admin added successfully'
      });
    } catch (error: any) {
      console.error('Failed to create admin:', error);
      res.status(400).json({ 
        error: 'Failed to create admin',
        details: error.message 
      });
    }
  }
);

/**
 * Update admin role
 * PATCH /api/admin/roles/admins/:id
 */
router.patch('/admins/:id',
  authenticateShopifyAdmin(['manage_admins']),
  auditAdminAction('update_admin_role'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const { role } = req.body;
      const adminId = req.params.id;

      // Validate role
      if (!role || !ADMIN_ROLES[role as keyof typeof ADMIN_ROLES]) {
        return res.status(400).json({ 
          error: 'Invalid role',
          validRoles: Object.keys(ADMIN_ROLES)
        });
      }

      // Get target admin
      const targetAdmin = adminDatabase.get(adminId);
      
      if (!targetAdmin || targetAdmin.shopDomain !== req.admin.shopDomain || !targetAdmin.isActive) {
        return res.status(404).json({ 
          error: 'Admin not found'
        });
      }

      // Only owners can change owner roles
      if ((role === 'owner' || targetAdmin.role === 'owner') && req.admin.role !== 'owner') {
        return res.status(403).json({ 
          error: 'Only store owners can manage owner roles'
        });
      }

      // Prevent self-demotion of the last owner
      if (targetAdmin.id === req.admin.id && targetAdmin.role === 'owner' && role !== 'owner') {
        const ownerCount = Array.from(adminDatabase.values())
          .filter(admin => 
            admin.shopDomain === req.admin.shopDomain && 
            admin.role === 'owner' && 
            admin.isActive
          ).length;

        if (ownerCount <= 1) {
          return res.status(400).json({ 
            error: 'Cannot demote the last owner. Add another owner first.'
          });
        }
      }

      // Update role
      targetAdmin.role = role as 'owner' | 'admin' | 'staff';
      adminDatabase.set(adminId, targetAdmin);

      res.json({
        success: true,
        admin: {
          id: targetAdmin.id,
          email: targetAdmin.email,
          role: targetAdmin.role,
          roleName: ADMIN_ROLES[targetAdmin.role].name,
          permissions: ADMIN_ROLES[targetAdmin.role].permissions
        },
        message: 'Admin role updated successfully'
      });
    } catch (error: any) {
      console.error('Failed to update admin role:', error);
      res.status(400).json({ 
        error: 'Failed to update admin role',
        details: error.message 
      });
    }
  }
);

/**
 * Remove admin access
 * DELETE /api/admin/roles/admins/:id
 */
router.delete('/admins/:id',
  authenticateShopifyAdmin(['manage_admins']),
  auditAdminAction('remove_admin'),
  async (req: AdminRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }

      const adminId = req.params.id;
      const targetAdmin = adminDatabase.get(adminId);
      
      if (!targetAdmin || targetAdmin.shopDomain !== req.admin.shopDomain || !targetAdmin.isActive) {
        return res.status(404).json({ 
          error: 'Admin not found'
        });
      }

      // Prevent removal of the last owner
      if (targetAdmin.role === 'owner') {
        const ownerCount = Array.from(adminDatabase.values())
          .filter(admin => 
            admin.shopDomain === req.admin.shopDomain && 
            admin.role === 'owner' && 
            admin.isActive
          ).length;

        if (ownerCount <= 1) {
          return res.status(400).json({ 
            error: 'Cannot remove the last owner'
          });
        }
      }

      // Only owners can remove other owners
      if (targetAdmin.role === 'owner' && req.admin.role !== 'owner') {
        return res.status(403).json({ 
          error: 'Only store owners can remove other owners'
        });
      }

      // Deactivate admin instead of deleting
      targetAdmin.isActive = false;
      adminDatabase.set(adminId, targetAdmin);

      res.json({
        success: true,
        message: 'Admin access removed successfully'
      });
    } catch (error: any) {
      console.error('Failed to remove admin:', error);
      res.status(400).json({ 
        error: 'Failed to remove admin',
        details: error.message 
      });
    }
  }
);

export default router;