
import React, { useState } from 'react';
import { Plus, Send, Eye, Users, Mail, Calendar, BarChart3, Target, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const campaignSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  targetAudience: z.enum(['corporate', 'consumer', 'all']),
  industry: z.string().optional(),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  targetAudience: string;
  industry?: string;
  status: string;
  totalRecipients: number;
  emailsSent: number;
  opensCount: number;
  clicksCount: number;
  createdAt: string;
  sentAt?: string;
}

export function EmailCampaignManager() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  });

  // Fetch campaigns
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['/api/email/campaigns'],
    queryFn: () => apiRequest('/api/email/campaigns', 'GET'),
  });

  // Fetch subscribers count
  const { data: subscribersData } = useQuery({
    queryKey: ['/api/email/subscribers'],
    queryFn: () => apiRequest('/api/email/subscribers', 'GET'),
  });

  // Create campaign mutation
  const createCampaignMutation = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      return apiRequest('/api/email/campaigns', 'POST', data);
    },
    onSuccess: () => {
      toast({
        title: "Campaign Created!",
        description: "Your email campaign has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/email/campaigns'] });
      setIsCreateOpen(false);
      reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Send campaign mutation
  const sendCampaignMutation = useMutation({
    mutationFn: async (campaignId: string) => {
      return apiRequest(`/api/email/campaigns/${campaignId}/send`, 'POST');
    },
    onSuccess: (data) => {
      toast({
        title: "Campaign Sent!",
        description: `Email sent to ${data.emailsSent} recipients.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/email/campaigns'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send campaign. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Test email mutation
  const testEmailMutation = useMutation({
    mutationFn: async (testEmail: string) => {
      return apiRequest('/api/email/test-campaign', 'POST', { testEmail });
    },
    onSuccess: () => {
      toast({
        title: "Test Email Sent!",
        description: "Check your inbox for the test email.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send test email.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CampaignFormData) => {
    createCampaignMutation.mutate(data);
  };

  const handleSendCampaign = (campaignId: string) => {
    sendCampaignMutation.mutate(campaignId);
  };

  const handleTestEmail = () => {
    const testEmail = prompt('Enter test email address:');
    if (testEmail) {
      testEmailMutation.mutate(testEmail);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const corporateEmailTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #2563eb, #10b981); padding: 40px 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Transform Old iPhones into Clean Water</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">DeliWer Corporate CSR Program</p>
  </div>
  
  <div style="padding: 40px 20px; background: white;">
    <h2 style="color: #1f2937;">Dear {{companyName}},</h2>
    
    <p style="color: #4b5563; line-height: 1.6;">
      Join leading UAE corporations in the most innovative CSR program of 2025. 
      Convert your company's old iPhones into clean water systems for your employees.
    </p>

    <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0;">
      <h3 style="color: #1e40af; margin-top: 0;">Corporate Benefits</h3>
      <ul style="color: #1e40af;">
        <li>Instant device inventory valuation</li>
        <li>Employee wellness with AquaCafe systems</li>
        <li>CSR recognition and media coverage</li>
        <li>Environmental impact tracking</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="https://deliwer.com/cobone-corporate" 
         style="background: #2563eb; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px;">
        Get Your Corporate Quote
      </a>
    </div>
  </div>
</div>`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Email Campaign Manager</h1>
          <p className="text-gray-400">Create and manage your email marketing campaigns</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={handleTestEmail}
            variant="outline"
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
            disabled={testEmailMutation.isPending}
          >
            {testEmailMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Send Test Email
          </Button>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Email Campaign</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Campaign Name</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Q1 Corporate Outreach"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience" className="text-gray-300">Target Audience</Label>
                    <Select onValueChange={(value) => setValue('targetAudience', value as any)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate Leads</SelectItem>
                        <SelectItem value="consumer">Individual Consumers</SelectItem>
                        <SelectItem value="all">All Subscribers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Email Subject</Label>
                  <Input
                    id="subject"
                    {...register('subject')}
                    placeholder="Transform Your CSR Impact with DeliWer"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-300">Industry Filter (Optional)</Label>
                  <Select onValueChange={(value) => setValue('industry', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-300">Email Content (HTML)</Label>
                  <Textarea
                    id="content"
                    {...register('content')}
                    placeholder="Enter your HTML email content..."
                    value={watch('content') || corporateEmailTemplate}
                    onChange={(e) => setValue('content', e.target.value)}
                    rows={12}
                    className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
                  />
                  {errors.content && (
                    <p className="text-red-400 text-sm">{errors.content.message}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    className="border-slate-600 text-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createCampaignMutation.isPending}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600"
                  >
                    {createCampaignMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Campaign
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-gray-400">Total Campaigns</p>
                <p className="text-xl font-bold text-white">{campaigns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Subscribers</p>
                <p className="text-xl font-bold text-white">{subscribersData?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Emails Sent</p>
                <p className="text-xl font-bold text-white">
                  {campaigns.reduce((sum: number, c: Campaign) => sum + c.emailsSent, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Open Rate</p>
                <p className="text-xl font-bold text-white">
                  {campaigns.length > 0 
                    ? Math.round((campaigns.reduce((sum: number, c: Campaign) => sum + c.opensCount, 0) / 
                        campaigns.reduce((sum: number, c: Campaign) => sum + c.emailsSent, 1)) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Email Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No campaigns yet. Create your first campaign to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign: Campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{campaign.name}</h3>
                      <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{campaign.subject}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Target: {campaign.targetAudience}</span>
                      <span>Recipients: {campaign.totalRecipients}</span>
                      <span>Sent: {campaign.emailsSent}</span>
                      <span>Opens: {campaign.opensCount}</span>
                      <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setPreviewOpen(true);
                      }}
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>

                    {campaign.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => handleSendCampaign(campaign.id)}
                        disabled={sendCampaignMutation.isPending}
                        className="bg-gradient-to-r from-emerald-600 to-blue-600"
                      >
                        {sendCampaignMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-1" />
                        )}
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Campaign Preview</DialogTitle>
          </DialogHeader>
          
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Subject Line:</h3>
                <p className="text-gray-300">{selectedCampaign.subject}</p>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: selectedCampaign.content }} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
