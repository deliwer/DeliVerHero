import { Card, CardContent } from '@/components/ui/card';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react';

export default function Terms() {
  const lastUpdated = "August 12, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            DeliWer Ecosystem Platform Agreement
          </p>
          <p className="text-sm text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-hero-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Agreement Overview</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              These Terms of Service govern your use of the DeliWer ecosystem, including AquaCafe water filtration systems, iPhone trade-in services, e-waste recycling programs, and community features. By using any DeliWer platform, you agree to these terms.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-amber-200 text-sm">
                Please read these terms carefully. They include important information about your rights and responsibilities as a Planet Hero.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Services Overview */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-dubai-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">DeliWer Ecosystem Services</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-hero-green-500 mr-2" />
                  Core Services
                </h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• iPhone trade-in and valuation services</li>
                  <li>• AquaCafe water filtration system delivery and installation</li>
                  <li>• Planet Hero community platform and leaderboards</li>
                  <li>• Environmental impact tracking and reporting</li>
                  <li>• Partnership and delivery agent programs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-amber-500 mr-2" />
                  Upcoming Features
                </h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• DeliWer Dawn AI-powered trading platform</li>
                  <li>• Advanced recycling material recovery services</li>
                  <li>• Corporate sustainability partnership programs</li>
                  <li>• Token-based rewards and governance system</li>
                  <li>• Regional expansion across UAE and GCC</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* iPhone Trade-in Terms */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">iPhone Trade-In Terms</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Device Requirements</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Device must be authentic Apple iPhone (iPhone 6 or newer)</li>
                  <li>• Must power on and complete basic functionality tests</li>
                  <li>• Find My iPhone must be disabled before trade-in</li>
                  <li>• Device should be factory reset with personal data removed</li>
                  <li>• Physical damage may affect trade-in value but doesn't disqualify</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Valuation Process</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Initial valuation provided via our AI assessment tool</li>
                  <li>• Final valuation determined upon physical device inspection</li>
                  <li>• You have the right to decline final valuation and receive device back</li>
                  <li>• Trade-in credit applied towards AquaCafe system purchase only</li>
                  <li>• Environmental impact points awarded regardless of device condition</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Data Security</h3>
                <div className="bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg p-4">
                  <p className="text-hero-green-200 text-sm">
                    We perform secure data wiping on all devices using DOD 5220.22-M standards. However, you are responsible for removing personal data before trade-in. DeliWer is not liable for any data remaining on devices.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AquaCafe Terms */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">AquaCafe System Terms</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Product Warranty</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• 5-year warranty on filtration system components</li>
                  <li>• 1-year warranty on electronic components</li>
                  <li>• 30-day money-back guarantee (return shipping included)</li>
                  <li>• Free annual maintenance and system health checks</li>
                  <li>• Replacement parts available for 10 years minimum</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Installation & Maintenance</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Professional installation included in all packages</li>
                  <li>• Installation scheduled within 48 hours of delivery</li>
                  <li>• Filter replacement reminders sent automatically</li>
                  <li>• 24/7 technical support via WhatsApp and phone</li>
                  <li>• Emergency repair service within 4 hours in Dubai</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planet Hero Community */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-amber-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Planet Hero Community Guidelines</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Acceptable Use</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Share authentic environmental achievements and progress</li>
                  <li>• Participate constructively in community challenges and events</li>
                  <li>• Respect other Planet Heroes and maintain positive interactions</li>
                  <li>• Provide helpful feedback and support to fellow community members</li>
                  <li>• Follow all local environmental regulations and best practices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Prohibited Activities</h3>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Falsifying environmental impact data or achievements</li>
                  <li>• Harassment, bullying, or discrimination of any kind</li>
                  <li>• Spam, promotional content, or commercial solicitation</li>
                  <li>• Sharing personal information of other community members</li>
                  <li>• Attempting to manipulate leaderboard rankings artificially</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Point System & Rewards</h3>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-200 text-sm">
                    Planet Hero points are earned through verified environmental actions. Points have no monetary value but unlock exclusive rewards, community features, and recognition. DeliWer reserves the right to adjust point values and reward structures with 30 days notice.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partnership Programs */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-hero-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Partnership Program Terms</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Delivery Agent Program</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Must have valid UAE driving license and vehicle insurance</li>
                  <li>• Complete DeliWer training and certification program</li>
                  <li>• Maintain 4.5+ star customer rating</li>
                  <li>• Weekly payment schedule with performance bonuses</li>
                  <li>• 30-day notice required for program termination</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Eco-Recycling Partner</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Valid e-waste processing license from Dubai Municipality</li>
                  <li>• Compliance with environmental regulations and audits</li>
                  <li>• Secure data destruction capabilities and certification</li>
                  <li>• Monthly processing quotas and quality standards</li>
                  <li>• Revenue sharing based on material recovery rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="glass border-slate-600 mb-8">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                DeliWer provides services "as is" and makes no warranties beyond those explicitly stated. Our liability is limited to the value of services purchased.
              </p>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-200 text-sm">
                  <strong>Important:</strong> We are not liable for consequential damages, lost profits, or indirect damages arising from service use. Environmental impact calculations are estimates based on industry standards and actual results may vary.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Dispute Resolution */}
        <Card className="glass border-slate-600">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Questions or Disputes?</h2>
            <p className="text-gray-300 mb-6">
              Contact our legal team for terms clarification or dispute resolution
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:legal@deliwer.com"
                  className="bg-hero-green-500 hover:bg-hero-green-600 text-black px-6 py-3 rounded-lg font-medium transition-colors"
                >admin@deliwer.com</a>
                <a 
                  href="tel:+971523946311"
                  className="bg-dubai-blue-500 hover:bg-dubai-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  +971 52 394 6311
                </a>
              </div>
              
              <p className="text-sm text-gray-400">
                All disputes subject to Dubai Courts jurisdiction under UAE law
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}