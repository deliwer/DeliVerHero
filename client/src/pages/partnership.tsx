import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Building2,
  Users,
  Smartphone,
  Droplet,
  Recycle,
  TrendingUp,
  Award,
  Globe,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Zap,
  Shield,
  Heart,
  Clock,
  Calculator,
  FileText,
  Upload,
  Send,
  Phone,
  Mail,
  MapPin,
  BarChart3
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company?: string;
  community?: string;
  phone: string;
  details: string;
  type: 'corporate' | 'community';
  deviceCount?: string;
  residentCount?: string;
}

export default function PartnershipPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'corporate' | 'community'>('corporate');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    details: '',
    type: 'corporate'
  });

  // Impact stats
  const impactStats = {
    devicesRecycled: 50000,
    litersWaterSaved: 1250000,
    co2Reduced: 375,
    corporateClients: 500,
    communities: 125,
    activeUsers: 12847
  };

  const submitInquiry = useMutation({
    mutationFn: (data: FormData) => apiRequest('/api/contact', 'POST', data),
    onSuccess: () => {
      toast({
        title: 'Partnership Request Submitted',
        description: 'Our team will contact you within 24 hours to discuss your partnership opportunity.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        details: '',
        type: activeTab
      });
    },
    onError: () => {
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      type: activeTab
    };
    submitInquiry.mutate(submissionData);
  };

  const corporateLeaderboard = [
    { rank: 1, company: 'Emirates Financial Services', devices: 1250, impact: '31,250 bottles prevented' },
    { rank: 2, company: 'Al Habtoor Group', devices: 890, impact: '22,250 bottles prevented' },
    { rank: 3, company: 'DAMAC Properties', devices: 675, impact: '16,875 bottles prevented' },
    { rank: 4, company: 'Majid Al Futtaim', devices: 540, impact: '13,500 bottles prevented' },
    { rank: 5, company: 'Dubai Municipality', devices: 425, impact: '10,625 bottles prevented' }
  ];

  const communityLeaderboard = [
    { rank: 1, community: 'Downtown Dubai Residents', residents: 2400, impact: '60,000 bottles prevented' },
    { rank: 2, community: 'Dubai Marina Community', residents: 1890, impact: '47,250 bottles prevented' },
    { rank: 3, community: 'Jumeirah Village Circle', residents: 1675, impact: '41,875 bottles prevented' },
    { rank: 4, community: 'Arabian Ranches', residents: 1340, impact: '33,500 bottles prevented' },
    { rank: 5, community: 'The Springs Community', residents: 1125, impact: '28,125 bottles prevented' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="text-center mb-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transform Your Impact
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Join the sustainable revolution with comprehensive device trade-in programs that maximize environmental impact while delivering exceptional value for corporations and communities.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => setActiveTab('corporate')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Building2 className="w-6 h-6 mr-2" />
                Corporate Pilot Program
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                onClick={() => setActiveTab('community')}
                className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Users className="w-6 h-6 mr-2" />
                Community CSR Pilot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Impact Counters */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{impactStats.devicesRecycled.toLocaleString()}+</p>
              <p className="text-gray-400 text-sm">Devices Recycled</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Droplet className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{(impactStats.litersWaterSaved / 1000000).toFixed(1)}M</p>
              <p className="text-gray-400 text-sm">Liters Water Saved</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Recycle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{impactStats.co2Reduced}T</p>
              <p className="text-gray-400 text-sm">CO₂ Reduced</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Building2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{impactStats.corporateClients}+</p>
              <p className="text-gray-400 text-sm">Corporate Partners</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{impactStats.communities}+</p>
              <p className="text-gray-400 text-sm">Communities</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{impactStats.activeUsers.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Active Users</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Tabs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'corporate' | 'community')}>
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
              <TabsTrigger value="corporate" className="text-base font-semibold">
                Corporate Flow
              </TabsTrigger>
              <TabsTrigger value="community" className="text-base font-semibold">
                Community Flow
              </TabsTrigger>
            </TabsList>

            <TabsContent value="corporate" className="space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">1. Submit Request</h3>
                    <p className="text-gray-400 text-sm">Provide device inventory and corporate information for bulk assessment</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Calculator className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">2. Get Quote</h3>
                    <p className="text-gray-400 text-sm">Receive detailed valuation and CSR impact report within 24 hours</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">3. Secure Pickup</h3>
                    <p className="text-gray-400 text-sm">Schedule secure device collection with enterprise-grade handling</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">4. Impact Credits</h3>
                    <p className="text-gray-400 text-sm">Receive payment plus employee engagement and ESG reporting</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">1. Community Signup</h3>
                    <p className="text-gray-400 text-sm">Register your residential community for the CSR pilot program</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">2. Starter Kit</h3>
                    <p className="text-gray-400 text-sm">Receive free AquaCafe starter kit and gamification platform access</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">3. Resident Engagement</h3>
                    <p className="text-gray-400 text-sm">Enable residents to trade devices for water filtration credits</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">4. Shared Rewards</h3>
                    <p className="text-gray-400 text-sm">Community leaderboard with collective impact and shared benefits</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Partnership Benefits</h2>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'corporate' | 'community')}>
            <TabsContent value="corporate" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                      ESG Reporting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Comprehensive sustainability reports for corporate responsibility goals with measurable impact metrics.</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calculator className="w-6 h-6 text-green-400" />
                      Bulk Credits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Volume-based pricing with enterprise discounts and flexible payment terms for large organizations.</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-400" />
                      Employee Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Gamified employee participation programs with personal impact tracking and team competitions.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="w-6 h-6 text-green-400" />
                      Free Starter Kit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Complimentary AquaCafe water filtration system for participating communities with full setup support.</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-blue-400" />
                      Community Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Competitive rankings with neighboring communities, fostering collective environmental responsibility.</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Heart className="w-6 h-6 text-purple-400" />
                      Shared Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Community-wide benefits including group discounts, shared facilities, and collective impact celebrations.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Leaderboard Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">CSR Impact Leaderboard</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  Top Corporate Partners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {corporateLeaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {entry.rank}
                        </Badge>
                        <div>
                          <p className="text-white font-medium">{entry.company}</p>
                          <p className="text-gray-400 text-sm">{entry.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{entry.devices}</p>
                        <p className="text-gray-400 text-sm">devices</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-400" />
                  Top Communities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityLeaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {entry.rank}
                        </Badge>
                        <div>
                          <p className="text-white font-medium">{entry.community}</p>
                          <p className="text-gray-400 text-sm">{entry.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{entry.residents}</p>
                        <p className="text-gray-400 text-sm">residents</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">
                {activeTab === 'corporate' ? 'Request Corporate Pilot' : 'Book Community Starter Kit'}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === 'corporate' 
                  ? 'Get started with our corporate device trade-in program'
                  : 'Join the community CSR pilot program'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Full Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {activeTab === 'corporate' ? (
                    <div>
                      <Label className="text-gray-300">Company Name *</Label>
                      <Input
                        value={formData.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label className="text-gray-300">Community Name *</Label>
                      <Input
                        value={formData.community || ''}
                        onChange={(e) => handleInputChange('community', e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  )}
                  <div>
                    <Label className="text-gray-300">Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {activeTab === 'corporate' ? (
                    <div>
                      <Label className="text-gray-300">Number of Devices</Label>
                      <Input
                        value={formData.deviceCount || ''}
                        onChange={(e) => handleInputChange('deviceCount', e.target.value)}
                        placeholder="e.g., 100-500"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label className="text-gray-300">Residents Count</Label>
                      <Input
                        value={formData.residentCount || ''}
                        onChange={(e) => handleInputChange('residentCount', e.target.value)}
                        placeholder="e.g., 500-1000"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  )}
                  <div className="flex items-end">
                    <div className="w-full space-y-2">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => window.open('/shop', '_blank')}
                        className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">
                    {activeTab === 'corporate' ? 'Partnership Goals' : 'Community Interests'}
                  </Label>
                  <Textarea
                    value={formData.details}
                    onChange={(e) => handleInputChange('details', e.target.value)}
                    placeholder={activeTab === 'corporate' 
                      ? 'Tell us about your corporate sustainability goals...'
                      : 'Describe your community and sustainability interests...'}
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit"
                    disabled={submitInquiry.isPending}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                  >
                    {submitInquiry.isPending ? "Submitting..." : 
                     activeTab === 'corporate' ? "Request Corporate Pilot" : "Book Community Starter Kit"}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => window.open('/redeem', '_blank')}
                    className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Redeem Points
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information Footer */}
        <div className="text-center">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <h3 className="text-white text-xl font-semibold mb-4">Ready to Get Started?</h3>
              <p className="text-gray-400 mb-6">Contact our partnership team for immediate assistance</p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>partnerships@delwer.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>+971 4 XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Badge variant="secondary" className="bg-green-600 text-white">
                  CSR Impact Certified • UAE Sustainability Partner
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}