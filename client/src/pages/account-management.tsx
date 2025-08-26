import { useState } from "react";
import { 
  Building2, 
  Users, 
  Settings, 
  CreditCard, 
  Shield, 
  Bell,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export function AccountManagementPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: "Emirates Financial Services LLC",
    industry: "financial",
    website: "https://emiratesfinancial.ae",
    address: "DIFC, Gate Village 5, Level 12, Dubai, UAE",
    phone: "+971 4 XXX XXXX",
    email: "procurement@emiratesfinancial.ae",
    vatNumber: "100123456700003",
    tradeNumber: "CN-1234567"
  });

  const [authorizedUsers, setAuthorizedUsers] = useState([
    {
      id: 1,
      name: "Ahmad Al-Maktoum",
      email: "ahmad.maktoum@emiratesfinancial.ae",
      role: "Admin",
      department: "Procurement",
      lastLogin: "2025-01-21",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@emiratesfinancial.ae", 
      role: "Manager",
      department: "IT",
      lastLogin: "2025-01-20",
      status: "active"
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      email: "mohammed.hassan@emiratesfinancial.ae",
      role: "User",
      department: "Operations",
      lastLogin: "2025-01-18",
      status: "pending"
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "bank_transfer",
      name: "Emirates NBD Business Account",
      details: "Account ending in ****1234",
      isDefault: true,
      status: "verified"
    },
    {
      id: 2,
      type: "credit_card",
      name: "Corporate Credit Card",
      details: "Visa ending in ****5678",
      isDefault: false,
      status: "verified"
    }
  ]);

  const [notifications, setNotifications] = useState({
    emailQuotes: true,
    emailPurchaseOrders: true,
    emailPayments: true,
    smsUrgent: false,
    slackIntegration: false,
    webhookEvents: true
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: "sk_live_1234567890abcdef",
    webhookUrl: "https://emiratesfinancial.ae/webhooks/chaintrack",
    environment: "production"
  });

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin": return "bg-red-600/20 text-red-300 border-red-500/30";
      case "manager": return "bg-blue-600/20 text-blue-300 border-blue-500/30";
      case "user": return "bg-green-600/20 text-green-300 border-green-500/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-600/20 text-green-300 border-green-500/30";
      case "pending": return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
      case "suspended": return "bg-red-600/20 text-red-300 border-red-500/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Account Management
            </h1>
            <p className="text-gray-300">
              Manage your corporate account settings and authorized users
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Account
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="company" className="data-[state=active]:bg-blue-600">
              Company Info
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
              Authorized Users
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600">
              Billing & Payments
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-blue-600">
              API & Integrations
            </TabsTrigger>
          </TabsList>

          {/* Company Information Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Update your company details and business information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Company Name</Label>
                    <Input
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Industry</Label>
                    <Select value={companyInfo.industry} onValueChange={(value) => setCompanyInfo({ ...companyInfo, industry: value })}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Services</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Website</Label>
                    <Input
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Phone Number</Label>
                    <Input
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Business Address</Label>
                  <Textarea
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">VAT Number</Label>
                    <Input
                      value={companyInfo.vatNumber}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, vatNumber: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Trade License Number</Label>
                    <Input
                      value={companyInfo.tradeNumber}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, tradeNumber: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authorized Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Authorized Users
                    </CardTitle>
                    <CardDescription>
                      Manage users who can access your corporate account
                    </CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {authorizedUsers.map((user) => (
                    <div key={user.id} className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-medium">{user.name}</h3>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Email</p>
                              <p className="text-white">{user.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Department</p>
                              <p className="text-white">{user.department}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Last Login</p>
                              <p className="text-white">{user.lastLogin}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing & Payments Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your payment methods and billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-medium">{method.name}</h3>
                          <p className="text-gray-400 text-sm">{method.details}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {method.isDefault && (
                              <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                                Default
                              </Badge>
                            )}
                            <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                              {method.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-dashed">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Quote Updates</p>
                        <p className="text-gray-400 text-sm">Get notified when quotes are approved or declined</p>
                      </div>
                      <Switch
                        checked={notifications.emailQuotes}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailQuotes: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Purchase Order Updates</p>
                        <p className="text-gray-400 text-sm">Updates on PO status and processing</p>
                      </div>
                      <Switch
                        checked={notifications.emailPurchaseOrders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailPurchaseOrders: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Payment Notifications</p>
                        <p className="text-gray-400 text-sm">Payment confirmations and reminders</p>
                      </div>
                      <Switch
                        checked={notifications.emailPayments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailPayments: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Integrations</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">SMS for Urgent Updates</p>
                        <p className="text-gray-400 text-sm">Critical alerts via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsUrgent}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, smsUrgent: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Slack Integration</p>
                        <p className="text-gray-400 text-sm">Send updates to your Slack channel</p>
                      </div>
                      <Switch
                        checked={notifications.slackIntegration}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, slackIntegration: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Webhook Events</p>
                        <p className="text-gray-400 text-sm">Real-time updates to your systems</p>
                      </div>
                      <Switch
                        checked={notifications.webhookEvents}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, webhookEvents: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API & Integrations Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  API & Integrations
                </CardTitle>
                <CardDescription>
                  Configure API access and system integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">API Key</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value={apiSettings.apiKey}
                      readOnly
                      className="bg-slate-700 border-slate-600"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Webhook URL</Label>
                  <Input
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                    placeholder="https://your-domain.com/webhooks/chaintrack"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Environment</Label>
                  <Select value={apiSettings.environment} onValueChange={(value) => setApiSettings({ ...apiSettings, environment: value })}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Webhook Events</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">quote.created</span>
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">quote.approved</span>
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">purchase_order.created</span>
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">payment.completed</span>
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Enabled</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save API Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}