import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImpactStats } from '@/components/impact-stats';
import { 
  Globe, 
  Droplets, 
  Recycle, 
  TreePine, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Award,
  Target,
  MapPin,
  Calendar,
  CheckCircle,
  Star
} from 'lucide-react';

export default function Environmental() {
  const currentYear = new Date().getFullYear();

  const impactMetrics = [
    {
      title: "Plastic Bottles Prevented",
      value: "2,400,000+",
      description: "Single-use plastic bottles eliminated through AquaCafe systems",
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      trend: "+23% this month"
    },
    {
      title: "CO₂ Emissions Saved",
      value: "180 Tonnes",
      description: "Carbon footprint reduction from sustainable iPhone recycling",
      icon: <Globe className="w-8 h-8 text-hero-green-500" />,
      trend: "+15% this month"
    },
    {
      title: "E-waste Recycled",
      value: "12,847 Devices",
      description: "iPhones processed through certified recycling programs",
      icon: <Recycle className="w-8 h-8 text-amber-500" />,
      trend: "+31% this month"
    },
    {
      title: "Trees Equivalent Saved",
      value: "2,400 Trees",
      description: "Environmental impact equivalent in tree conservation",
      icon: <TreePine className="w-8 h-8 text-emerald-500" />,
      trend: "+18% this month"
    }
  ];

  const certifications = [
    {
      name: "Dubai Municipality Certification",
      description: "Official environmental compliance certification",
      issued: "July 2024",
      expires: "July 2027",
      status: "Active"
    },
    {
      name: "ISO 14001 Environmental Management",
      description: "International environmental management system standard",
      issued: "March 2024",
      expires: "March 2027",
      status: "Active"
    },
    {
      name: "UAE E-waste Processing License",
      description: "Authorized electronic waste processing and material recovery",
      issued: "January 2024",
      expires: "January 2025",
      status: "Renewal Pending"
    },
    {
      name: "Carbon Neutral Delivery Fleet",
      description: "100% electric vehicle delivery network certification",
      issued: "June 2024",
      expires: "December 2024",
      status: "Active"
    }
  ];

  const sustainabilityGoals = [
    {
      title: "10 Million Bottles by 2026",
      description: "Prevent 10 million plastic bottles through AquaCafe adoption",
      progress: 24,
      targetDate: "December 2026"
    },
    {
      title: "Carbon Neutral Operations",
      description: "Achieve net-zero carbon emissions across all DeliWer operations",
      progress: 67,
      targetDate: "June 2025"
    },
    {
      title: "50,000 Planet Heroes",
      description: "Build community of 50,000 active environmental advocates",
      progress: 26,
      targetDate: "March 2026"
    },
    {
      title: "GCC Expansion",
      description: "Expand sustainable trading to Saudi Arabia, Kuwait, and Oman",
      progress: 15,
      targetDate: "September 2025"
    }
  ];

  const partnerships = [
    {
      name: "Dubai Municipality",
      role: "Environmental Compliance & Certification",
      impact: "Regulatory oversight and sustainability standards",
      since: "2024"
    },
    {
      name: "Emirates Environmental Group",
      role: "Community Education & Outreach",
      impact: "Environmental awareness and education programs",
      since: "2024"
    },
    {
      name: "UAE University Research Center",
      role: "Impact Measurement & Analysis",
      impact: "Scientific validation of environmental benefits",
      since: "2024"
    },
    {
      name: "Apple Authorized Service Providers",
      role: "Device Authentication & Processing",
      impact: "Secure and certified iPhone processing standards",
      since: "2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-transparent">
                Environmental Impact
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Measuring and maximizing our positive environmental impact across Dubai's sustainable technology ecosystem
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Dubai Municipality Certified
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                ISO 14001 Certified
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Carbon Neutral Fleet
              </Badge>
            </div>
          </div>

          {/* Real-time Impact Stats */}
          <ImpactStats />

          {/* Detailed Impact Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="glass border-slate-600 group cursor-pointer hover:border-slate-500 transition-all duration-300" data-testid={`impact-metric-${index}`}>
                <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm text-center">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {metric.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{metric.value}</h3>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">{metric.title}</h4>
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-12 overflow-hidden">
                      {metric.description}
                    </p>
                  </div>
                  <div className="text-xs text-hero-green-500 font-medium">{metric.trend}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sustainability Goals */}
          <Card className="glass border-slate-600 mb-16">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Target className="w-8 h-8 text-hero-green-500 mr-3" />
                2025-2026 Sustainability Goals
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {sustainabilityGoals.map((goal, index) => (
                  <div key={index} className="space-y-4 group cursor-pointer" data-testid={`sustainability-goal-${index}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">{goal.title}</h3>
                        <div>
                          <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-12 overflow-hidden">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-dubai-blue-500/20 text-dubai-blue-500 border-dubai-blue-500/30 ml-4">
                        {goal.progress}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-400">Target: {goal.targetDate}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{width: `${goal.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications & Compliance */}
          <Card className="glass border-slate-600 mb-16">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Shield className="w-8 h-8 text-amber-500 mr-3" />
                Environmental Certifications
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                        <p className="text-sm text-gray-300">{cert.description}</p>
                      </div>
                      <Badge className={`${
                        cert.status === 'Active' 
                          ? 'bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30'
                          : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                      }`}>
                        {cert.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Issued: {cert.issued}</span>
                      <span>Expires: {cert.expires}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Partnerships */}
          <Card className="glass border-slate-600 mb-16">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Users className="w-8 h-8 text-dublin-blue-500 mr-3" />
                Strategic Environmental Partnerships
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {partnerships.map((partner, index) => (
                  <div key={index} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white">{partner.name}</h3>
                      <span className="text-xs text-gray-500">Since {partner.since}</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-hero-green-500">{partner.role}</span>
                    </div>
                    <p className="text-sm text-gray-300">{partner.impact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact Timeline */}
          <Card className="glass border-slate-600 mb-16">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Calendar className="w-8 h-8 text-purple-500 mr-3" />
                Environmental Impact Timeline
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    date: "January 2024",
                    title: "DeliWer Platform Launch",
                    description: "First iPhone-to-AquaCafe trade completed, establishing sustainable technology exchange model",
                    impact: "Foundation for 100% sustainable operations"
                  },
                  {
                    date: "March 2024",
                    title: "ISO 14001 Certification",
                    description: "Achieved international environmental management system certification",
                    impact: "Validated environmental processes and controls"
                  },
                  {
                    date: "June 2024",
                    title: "Carbon Neutral Fleet",
                    description: "Transitioned 100% delivery fleet to electric vehicles",
                    impact: "Eliminated 45 tonnes CO₂ annually from delivery operations"
                  },
                  {
                    date: "August 2024",
                    title: "1 Million Bottles Milestone",
                    description: "Reached 1 million plastic bottles prevented through AquaCafe systems",
                    impact: "Major environmental impact milestone achieved"
                  },
                  {
                    date: "Q4 2024",
                    title: "DeliWer Dawn Development",
                    description: "Advanced AI-powered eco-trading platform entering beta phase",
                    impact: "Next-generation sustainability technology platform"
                  }
                ].map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-4 h-4 bg-hero-green-500 rounded-full mt-2"></div>
                      {index < 4 && <div className="w-px h-16 bg-slate-600 ml-2 mt-2"></div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white">{event.title}</h3>
                        <span className="text-sm text-gray-400">{event.date}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{event.description}</p>
                      <div className="text-sm text-hero-green-500 font-medium">{event.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="glass border-slate-600">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join Our Environmental Mission</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Every iPhone trade, every AquaCafe system, every Planet Hero action contributes to Dubai's sustainable future. Be part of the environmental transformation.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-hero-green-500 mb-2">12,847</div>
                  <div className="text-gray-300">Active Planet Heroes</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-500 mb-2">2.4M</div>
                  <div className="text-gray-300">Bottles Prevented</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-amber-500 mb-2">180T</div>
                  <div className="text-gray-300">CO₂ Saved</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/aquacafe"
                  className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center"
                >
                  <Zap className="mr-2 w-6 h-6" />
                  Start Your Environmental Impact
                </a>
                <a 
                  href="/leaderboard"
                  className="border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center"
                >
                  <Users className="mr-2 w-6 h-6" />
                  Join Planet Heroes Community
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}