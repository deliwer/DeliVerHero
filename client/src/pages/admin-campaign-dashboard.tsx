import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Mail, Users, BarChart3, Settings, Shield, Send, Eye, Trash2, Plus, Lock } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent' | 'cancelled';
  segmentIds: string[];
  scheduledAt?: string;
  createdAt: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  criteria: any;
}

interface AdminRole {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'staff';
  roleName: string;
  permissions: string[];
  createdAt: string;
}

/**
 * Admin Campaign Dashboard
 * Only accessible to verified Shopify store admins
 * Separated from internal store messaging system
 */
export default function AdminCampaignDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [admins, setAdmins] = useState<AdminRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminRole | null>(null);

  // Mock admin authentication state (in production, integrate with Shopify Admin API)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated Shopify admin
    const token = localStorage.getItem('shopify_admin_token');
    const shopDomain = localStorage.getItem('shopify_shop_domain');
    
    if (token && shopDomain) {
      setAdminToken(token);
      setIsAuthenticated(true);
      loadDashboardData(token, shopDomain);
    } else {
      setError('Admin authentication required. Please log in through Shopify.');
      setIsLoading(false);
    }
  }, []);

  const loadDashboardData = async (token: string, shopDomain: string) => {
    try {
      setIsLoading(true);
      
      // Load campaigns, segments, and admin data
      await Promise.all([
        loadCampaigns(token, shopDomain),
        loadSegments(token, shopDomain),
        loadAdmins(token, shopDomain)
      ]);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCampaigns = async (token: string, shopDomain: string) => {
    const response = await fetch('/api/admin/campaigns', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Shopify-Shop-Domain': shopDomain,
        'X-Shopify-Session': 'admin_session'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load campaigns');
    }

    const data = await response.json();
    setCampaigns(data.campaigns || []);
  };

  const loadSegments = async (token: string, shopDomain: string) => {
    const response = await fetch('/api/admin/campaigns/segments', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Shopify-Shop-Domain': shopDomain,
        'X-Shopify-Session': 'admin_session'
      }
    });

    if (response.ok) {
      const data = await response.json();
      setSegments(data.segments || []);
    }
  };

  const loadAdmins = async (token: string, shopDomain: string) => {
    const response = await fetch('/api/admin/roles/admins', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Shopify-Shop-Domain': shopDomain,
        'X-Shopify-Session': 'admin_session'
      }
    });

    if (response.ok) {
      const data = await response.json();
      setAdmins(data.admins || []);
    }
  };

  const handleCreateCampaign = async (campaignData: any) => {
    if (!adminToken) return;

    const response = await fetch('/api/admin/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
        'X-Shopify-Shop-Domain': localStorage.getItem('shopify_shop_domain') || '',
        'X-Shopify-Session': 'admin_session'
      },
      body: JSON.stringify(campaignData)
    });

    if (response.ok) {
      loadCampaigns(adminToken, localStorage.getItem('shopify_shop_domain') || '');
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    if (!adminToken) return;

    const response = await fetch(`/api/admin/campaigns/${campaignId}/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'X-Shopify-Shop-Domain': localStorage.getItem('shopify_shop_domain') || '',
        'X-Shopify-Session': 'admin_session'
      }
    });

    if (response.ok) {
      loadCampaigns(adminToken, localStorage.getItem('shopify_shop_domain') || '');
    }
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      draft: 'secondary',
      scheduled: 'outline',
      sent: 'default',
      cancelled: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className=\"flex items-center justify-center min-h-screen bg-gray-50\">
        <Card className=\"w-full max-w-md\">
          <CardHeader className=\"text-center\">
            <Shield className=\"w-12 h-12 mx-auto mb-4 text-blue-600\" />
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              This campaign management system is only accessible to verified Shopify store admins.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className=\"space-y-4 text-sm text-gray-600\">
              <div className=\"flex items-center gap-2\">
                <Lock className=\"w-4 h-4\" />
                <span>Secured with Shopify Admin authentication</span>
              </div>
              <div className=\"flex items-center gap-2\">
                <Mail className=\"w-4 h-4\" />
                <span>Separate from internal store messaging</span>
              </div>
              <div className=\"flex items-center gap-2\">
                <Users className=\"w-4 h-4\" />
                <span>Campaign-only customer data access</span>
              </div>
            </div>
            <Button 
              className=\"w-full mt-6\" 
              onClick={() => {
                // Redirect to Shopify admin login
                window.location.href = '/shopify/auth/verify';
              }}
            >
              Authenticate with Shopify
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className=\"flex items-center justify-center min-h-screen\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto\"></div>
          <p className=\"mt-4 text-gray-600\">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"flex items-center justify-center min-h-screen\">
        <Card className=\"w-full max-w-md\">
          <CardHeader>
            <CardTitle className=\"text-red-600\">Access Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className=\"text-gray-600\">{error}</p>
            <Button 
              className=\"w-full mt-4\" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50 p-4\">
      <div className=\"max-w-7xl mx-auto\">
        <div className=\"mb-8\">
          <h1 className=\"text-3xl font-bold text-gray-900\">SendGrid Campaign Management</h1>
          <p className=\"text-gray-600 mt-2\">
            Secure email campaign management for Shopify store admins
          </p>
          <div className=\"flex items-center gap-2 mt-2\">
            <Badge variant=\"outline\">Admin Only</Badge>
            <Badge variant=\"outline\">Campaign Data Access</Badge>
            <Badge variant=\"outline\">Separated from Store Messaging</Badge>
          </div>
        </div>

        <Tabs defaultValue=\"campaigns\" className=\"space-y-6\">
          <TabsList className=\"grid w-full grid-cols-4\">
            <TabsTrigger value=\"campaigns\" className=\"flex items-center gap-2\">
              <Mail className=\"w-4 h-4\" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value=\"segments\" className=\"flex items-center gap-2\">
              <Users className=\"w-4 h-4\" />
              Segments
            </TabsTrigger>
            <TabsTrigger value=\"analytics\" className=\"flex items-center gap-2\">
              <BarChart3 className=\"w-4 h-4\" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value=\"admins\" className=\"flex items-center gap-2\">
              <Settings className=\"w-4 h-4\" />
              Admin Roles
            </TabsTrigger>
          </TabsList>

          <TabsContent value=\"campaigns\" className=\"space-y-6\">
            <div className=\"flex justify-between items-center\">
              <h2 className=\"text-xl font-semibold\">Email Campaigns</h2>
              <Button onClick={() => {/* Open create campaign modal */}}>
                <Plus className=\"w-4 h-4 mr-2\" />
                Create Campaign
              </Button>
            </div>

            <div className=\"grid gap-4\">
              {campaigns.length === 0 ? (
                <Card>
                  <CardContent className=\"pt-6\">
                    <div className=\"text-center text-gray-500\">
                      <Mail className=\"w-12 h-12 mx-auto mb-4 opacity-50\" />
                      <p>No campaigns created yet</p>
                      <p className=\"text-sm\">Create your first email campaign to get started</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                campaigns.map(campaign => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className=\"flex justify-between items-start\">
                        <div>
                          <CardTitle className=\"text-lg\">{campaign.name}</CardTitle>
                          <CardDescription>{campaign.subject}</CardDescription>
                        </div>
                        <div className=\"flex items-center gap-2\">
                          {getStatusBadge(campaign.status)}
                          <Button variant=\"outline\" size=\"sm\">
                            <Eye className=\"w-4 h-4\" />
                          </Button>
                          {campaign.status === 'draft' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size=\"sm\">
                                  <Send className=\"w-4 h-4 mr-2\" />
                                  Send
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Send Campaign</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will send the campaign to all targeted customer segments. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleSendCampaign(campaign.id)}>
                                    Send Campaign
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className=\"flex items-center justify-between text-sm text-gray-600\">
                        <span>Segments: {campaign.segmentIds.length}</span>
                        <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value=\"segments\" className=\"space-y-6\">
            <div className=\"flex justify-between items-center\">
              <div>
                <h2 className=\"text-xl font-semibold\">Customer Segments</h2>
                <p className=\"text-gray-600 text-sm\">Campaign targeting only - no order management data</p>
              </div>
              <Button>
                <Plus className=\"w-4 h-4 mr-2\" />
                Create Segment
              </Button>
            </div>

            <div className=\"grid gap-4\">
              {segments.map(segment => (
                <Card key={segment.id}>
                  <CardHeader>
                    <div className=\"flex justify-between items-start\">
                      <div>
                        <CardTitle className=\"text-lg\">{segment.name}</CardTitle>
                        <CardDescription>{segment.description}</CardDescription>
                      </div>
                      <Badge variant=\"outline\">{segment.customerCount} customers</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value=\"analytics\" className=\"space-y-6\">
            <h2 className=\"text-xl font-semibold\">Campaign Analytics</h2>
            <Card>
              <CardContent className=\"pt-6\">
                <div className=\"text-center text-gray-500\">
                  <BarChart3 className=\"w-12 h-12 mx-auto mb-4 opacity-50\" />
                  <p>Analytics will appear here after sending campaigns</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value=\"admins\" className=\"space-y-6\">
            <div className=\"flex justify-between items-center\">
              <div>
                <h2 className=\"text-xl font-semibold\">Admin Role Management</h2>
                <p className=\"text-gray-600 text-sm\">Manage admin access and permissions for campaign management</p>
              </div>
              <Button>
                <Plus className=\"w-4 h-4 mr-2\" />
                Add Admin
              </Button>
            </div>

            <div className=\"grid gap-4\">
              {admins.map(admin => (
                <Card key={admin.id}>
                  <CardHeader>
                    <div className=\"flex justify-between items-start\">
                      <div>
                        <CardTitle className=\"text-lg\">{admin.email}</CardTitle>
                        <CardDescription>{admin.roleName}</CardDescription>
                      </div>
                      <div className=\"flex items-center gap-2\">
                        <Badge variant={admin.role === 'owner' ? 'default' : 'secondary'}>
                          {admin.role}
                        </Badge>
                        {admin.role !== 'owner' && (
                          <Button variant=\"outline\" size=\"sm\">
                            <Trash2 className=\"w-4 h-4\" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className=\"flex flex-wrap gap-1\">
                      {admin.permissions.map(permission => (
                        <Badge key={permission} variant=\"outline\" className=\"text-xs\">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}