import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { MeetDeliInteractive } from '@/components/meet-deli-interactive';
import {
  Building2,
  Users,
  Smartphone,
  Droplet,
  Recycle,
  TrendingUp,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Zap,
  Shield,
  Heart,
  MessageCircle,
  Bot,
  ShoppingCart,
  Handshake,
  Globe,
  Crown,
  Sparkles,
  Rocket
} from 'lucide-react';

interface PartnerInquiry {
  email: string;
  partnerType: string;
  message: string;
}

export default function Partners() {
  const { toast } = useToast();
  const [inquiry, setInquiry] = useState<PartnerInquiry>({
    email: '',
    partnerType: '',
    message: ''
  });
  const [showAIChat, setShowAIChat] = useState(false);

  // Impact stats for partners
  const impactStats = {
    partnersActive: 750,
    devicesProcessed: 125000,
    waterSystemsDeployed: 45000,
    co2ReductionTons: 525,
    communitiesServed: 180,
    corporateClients: 400
  };

  const partnershipMutation = useMutation({
    mutationFn: (data: PartnerInquiry) => apiRequest('/api/partnerships', 'POST', data),
    onSuccess: () => {
      toast({
        title: 'Partnership Inquiry Submitted',
        description: 'Deli will analyze your requirements and contact you within 24 hours with a customized partnership plan.',
      });
      setInquiry({ email: '', partnerType: '', message: '' });
    },
    onError: () => {
      toast({
        title: 'Submission Failed',
        description: 'Please try the AI chat or contact us directly.',
        variant: 'destructive',
      });
    },
  });

  const handleQuickSubmit = (type: string) => {
    if (!inquiry.email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email to get started.',
        variant: 'destructive',
      });
      return;
    }
    
    partnershipMutation.mutate({
      ...inquiry,
      partnerType: type,
      message: inquiry.message || `Interested in ${type} partnership program. Please contact me with details.`
    });
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full mb-6">
            <Handshake className="w-5 h-5" />
            <span className="font-medium">Partnership Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join Dubai's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Sustainability Revolution</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Whether you're a corporation, community, or social organization - our AI-powered platform makes partnership onboarding seamless. 
            All partners start with our AED 99 Starter Kit to unlock the complete DeliWer ecosystem.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-emerald-500/30">
              <div className="text-2xl font-bold text-emerald-400">{impactStats.partnersActive}+</div>
              <div className="text-sm text-gray-300">Active Partners</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{(impactStats.devicesProcessed / 1000).toFixed(0)}K+</div>
              <div className="text-sm text-gray-300">Devices Processed</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/30 md:col-span-1 col-span-2">
              <div className="text-2xl font-bold text-purple-400">AED {(impactStats.waterSystemsDeployed * 99 / 1000).toFixed(0)}K+</div>
              <div className="text-sm text-gray-300">Partner Value Created</div>
            </div>
          </div>
        </div>

        {/* AI-First Quick Start */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-cyan-500/30 p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                🤖 AI-Powered Partnership Onboarding
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Deli, our AI concierge, handles 90% of the partnership process. No complex forms, no lengthy questionnaires. 
                Just tell Deli what you need, and we'll create a customized partnership plan in minutes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">What Deli Handles:</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Partnership type assessment
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Custom onboarding plan creation
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Starter kit customization
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Shopify integration setup
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">You Get:</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      Instant partnership approval
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      Custom dashboard access
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      Dedicated support channel
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      Real-time impact tracking
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowAIChat(true)}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start AI Partnership Chat
                </Button>
                <Button
                  onClick={() => document.getElementById('quick-form')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Partnership Form
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Partnership Types */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Partnership Type</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              All partnership types lead to the same unified onboarding: Start with the AED 99 Starter Kit, then unlock advanced features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Corporate Partnership */}
            <Card className="bg-slate-800/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-white text-xl">Corporate Partners</CardTitle>
                <CardDescription className="text-gray-300">
                  Enterprise ESG programs, employee engagement, bulk device trade-ins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <Trophy className="w-4 h-4 text-emerald-400 mr-2" />
                    ESG impact reporting
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Users className="w-4 h-4 text-emerald-400 mr-2" />
                    Employee engagement programs
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Target className="w-4 h-4 text-emerald-400 mr-2" />
                    Bulk processing discounts
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Award className="w-4 h-4 text-emerald-400 mr-2" />
                    Corporate dashboard access
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickSubmit('corporate')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={partnershipMutation.isPending}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Start Corporate Partnership
                </Button>
              </CardContent>
            </Card>

            {/* Community Partnership */}
            <Card className="bg-slate-800/50 border-blue-500/30 hover:border-blue-400/50 transition-all group transform scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">Community Partners</CardTitle>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Most Popular</Badge>
                <CardDescription className="text-gray-300">
                  Residential communities, building management, collective sustainability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <Globe className="w-4 h-4 text-blue-400 mr-2" />
                    Community leaderboards
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Heart className="w-4 h-4 text-blue-400 mr-2" />
                    Shared sustainability goals
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
                    Collective rewards program
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Shield className="w-4 h-4 text-blue-400 mr-2" />
                    Group membership benefits
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickSubmit('community')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={partnershipMutation.isPending}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Start Community Partnership
                </Button>
              </CardContent>
            </Card>

            {/* CSR/Sponsorship Partnership */}
            <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-purple-400" />
                </div>
                <CardTitle className="text-white text-xl">CSR & Sponsorship</CardTitle>
                <CardDescription className="text-gray-300">
                  Mission sponsorship, environmental CSR, sustainability campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <Rocket className="w-4 h-4 text-purple-400 mr-2" />
                    Mission sponsorship opportunities
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                    Brand visibility campaigns
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Target className="w-4 h-4 text-purple-400 mr-2" />
                    Custom CSR programs
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Trophy className="w-4 h-4 text-purple-400 mr-2" />
                    Sustainability certificates
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickSubmit('csr')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={partnershipMutation.isPending}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Start CSR Partnership
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Partnership Form */}
        <div id="quick-form" className="mb-16">
          <Card className="bg-slate-800/50 border-slate-600 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Quick Partnership Inquiry</CardTitle>
              <CardDescription className="text-gray-300">
                Just provide your email and let Deli handle the rest via AI-powered onboarding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Email Address (Required)
                  </label>
                  <Input
                    type="email"
                    value={inquiry.email}
                    onChange={(e) => setInquiry(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@company.com"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Additional Details (Optional)
                  </label>
                  <Input
                    value={inquiry.message}
                    onChange={(e) => setInquiry(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your organization, goals, or specific requirements..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-4">
                  Deli will analyze your requirements and create a custom partnership plan within 24 hours
                </p>
                <Button
                  onClick={() => handleQuickSubmit('general')}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 font-semibold"
                  disabled={partnershipMutation.isPending || !inquiry.email}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  {partnershipMutation.isPending ? 'Submitting...' : 'Start AI Partnership Process'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Integration */}
        {showAIChat && (
          <div className="mb-16">
            <Card className="bg-slate-800/90 border-cyan-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Bot className="w-6 h-6 text-cyan-400 mr-2" />
                    Deli AI Partnership Concierge
                  </CardTitle>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAIChat(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
                <CardDescription className="text-gray-300">
                  Chat with Deli to explore partnership opportunities and get instant guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MeetDeliInteractive />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Unified Starter Kit CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30 p-8">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                🚀 All Partnerships Start with AED 99 Starter Kit
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Whether you're joining as a corporate partner, community leader, or CSR sponsor - everyone starts with our 
                loyalty membership through the Starter Kit. This unlocks your personalized partnership dashboard and benefits.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Starter Kit Includes:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Droplet className="w-4 h-4 text-green-400 mr-2" />
                      5-Stage Water Filtration System
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      FREE Installation (AED 299 value)
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-green-400 mr-2" />
                      Partnership Dashboard Access
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Trophy className="w-4 h-4 text-green-400 mr-2" />
                      Loyalty Membership Benefits
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Partnership Benefits:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Building2 className="w-4 h-4 text-blue-400 mr-2" />
                      Custom onboarding workflow
                    </div>
                    <div className="flex items-center text-gray-300">
                      <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
                      Real-time impact tracking
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Handshake className="w-4 h-4 text-blue-400 mr-2" />
                      Dedicated partner support
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Award className="w-4 h-4 text-blue-400 mr-2" />
                      Co-marketing opportunities
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/aquacafe'}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-bold"
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  Get Partner Starter Kit - AED 99
                </Button>
                <Button
                  onClick={() => setShowAIChat(true)}
                  variant="outline"
                  className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 text-lg font-bold"
                >
                  <Bot className="w-6 h-6 mr-3" />
                  Chat with Deli First
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}