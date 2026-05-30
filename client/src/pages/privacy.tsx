import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck, FileText, Globe } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = "August 12, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Your data privacy and environmental impact transparency
          </p>
          <p className="text-sm text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-hero-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Commitment</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              At DeliWer, we're committed to protecting your privacy while creating transparency around environmental impact. This policy explains how we collect, use, and protect your information across our ecosystem of platforms including AquaCafe, EcoTrade, Recycling services, and the upcoming Dawn platform.
            </p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-dubai-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Device Trade Information</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• iPhone model, storage capacity, and condition assessment</li>
                  <li>• Device serial numbers for authenticity verification</li>
                  <li>• Trade valuation and environmental impact calculations</li>
                  <li>• Pickup and delivery address information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Planet Hero Profile</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Name and contact information for account creation</li>
                  <li>• Environmental impact points and achievement badges</li>
                  <li>• Community participation and leaderboard rankings</li>
                  <li>• Referral and partnership program participation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">AquaCafe System Usage</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Water filtration system installation and usage data</li>
                  <li>• Filter replacement scheduling and maintenance records</li>
                  <li>• Estimated plastic bottle prevention calculations</li>
                  <li>• Customer satisfaction and support interactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Usage */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-amber-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Service Delivery</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Processing iPhone trade-ins and valuations</li>
                  <li>• Coordinating AquaCafe system delivery and installation</li>
                  <li>• Providing customer support and technical assistance</li>
                  <li>• Managing partnership and delivery agent programs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Environmental Impact</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Calculating and displaying real-time impact statistics</li>
                  <li>• Creating personalized Planet Hero profiles and achievements</li>
                  <li>• Generating community leaderboards and challenges</li>
                  <li>• Producing environmental impact reports for Dubai Municipality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Data Security & Protection</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-hero-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-white">Encryption</h4>
                  <p className="text-gray-300 text-sm">All data is encrypted in transit and at rest using industry-standard AES-256 encryption</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-dubai-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-white">Access Controls</h4>
                  <p className="text-gray-300 text-sm">Strict role-based access controls limit data access to authorized personnel only</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-white">Regular Audits</h4>
                  <p className="text-gray-300 text-sm">Quarterly security audits and compliance reviews with Dubai Municipality standards</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-hero-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Your Data Rights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Access & Portability</h4>
                  <p className="text-gray-300 text-sm">Request a copy of all data we hold about you in a machine-readable format</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Correction & Updates</h4>
                  <p className="text-gray-300 text-sm">Update or correct any inaccurate information in your Planet Hero profile</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Deletion</h4>
                  <p className="text-gray-300 text-sm">Request deletion of your personal data (environmental impact stats may be retained anonymously)</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Opt-out</h4>
                  <p className="text-gray-300 text-sm">Withdraw consent for marketing communications while maintaining service access</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DeliWer Ecosystem Privacy */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">DeliWer Ecosystem Integration</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Your data may be shared across DeliWer ecosystem platforms to provide seamless service and environmental impact tracking:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Integrated Platforms</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>AquaCafe:</strong> Water system delivery and maintenance</li>
                  <li>• <strong>EcoTrade:</strong> iPhone trade-in processing</li>
                  <li>• <strong>Recycle:</strong> E-waste processing and material recovery</li>
                  <li>• <strong>Dawn:</strong> Future AI-powered trading platform</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Shared Data Benefits</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Unified Planet Hero scoring across all platforms</li>
                  <li>• Comprehensive environmental impact tracking</li>
                  <li>• Seamless partnership and referral programs</li>
                  <li>• Enhanced customer support and service delivery</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="glass border-slate-600">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Questions?</h2>
            <p className="text-gray-300 mb-6">
              Contact our Data Protection Officer for any privacy-related inquiries
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@deliwer.com"
                className="bg-hero-green-500 hover:bg-hero-green-600 text-black px-6 py-3 rounded-lg font-medium transition-colors"
              >
                privacy@deliwer.com
              </a>
              <a 
                href="tel:+971523946311"
                className="bg-dubai-blue-500 hover:bg-dubai-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                +971 52 394 6311
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}