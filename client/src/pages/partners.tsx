import { Handshake, Briefcase, Store, Phone, Mail, Users, TrendingUp, DollarSign, Target, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PartnerFormData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  location: string;
  experience: string;
}

export default function Partners() {
  const [isAffiliate, setIsAffiliate] = useState(true);
  const [formData, setFormData] = useState<PartnerFormData>({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    location: "",
    experience: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PartnerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted!",
      description: "We'll contact you within 24 hours to discuss your partnership opportunity.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessType: "",
      location: "",
      experience: ""
    });
    setIsSubmitting(false);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4" data-testid="page-title">
            <Handshake className="inline w-8 h-8 text-amber-500 mr-3" />
            JOIN THE PLANET HERO ALLIANCE
          </h1>
          <p className="text-gray-300 text-lg">Become a certified partner and start earning immediately from AED 99 AquaCafe sales</p>
        </div>

        {/* Partnership Program Selection */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-2xl p-2 inline-flex">
            <button
              onClick={() => setIsAffiliate(true)}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                isAffiliate
                  ? "bg-amber-500 text-black"
                  : "text-gray-300 hover:text-white"
              }`}
              data-testid="button-ambassador-program"
            >
              <Briefcase className="inline w-5 h-5 mr-2" />
              Ambassador Program
            </button>
            <button
              onClick={() => setIsAffiliate(false)}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                !isAffiliate
                  ? "bg-hero-green-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              data-testid="button-champion-program"
            >
              <Store className="inline w-5 h-5 mr-2" />
              Champions
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Program Details */}
          <div className="glass rounded-2xl p-8 border border-slate-600" data-testid="program-details">
            {isAffiliate ? (
              <>
                {/* Ambassador Program */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Ambassador Agent Program</h2>
                  <p className="text-gray-400">Build your own community network and earn commission on every trade-in</p>
                </div>

                <div className="space-y-4 mb-8" data-testid="ambassador-benefits">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Earn <strong className="text-amber-500">35%</strong> commission on every iPhone trade-in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Access to exclusive AquaCafe pricing & inventory</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Marketing support & training materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Build your own community network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">AI marketing automation tools & Ambassador dashboard</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-6" data-testid="ambassador-earnings">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Your potential monthly earnings:</div>
                    <div className="text-3xl font-bold text-amber-500 mb-2">AED 3,465+</div>
                    <div className="text-sm text-gray-400">Based on 10 sales/month at AED 99 each (35% commission)</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Champions Program */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Store className="w-8 h-8 text-hero-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Champion Collection Partner</h2>
                  <p className="text-gray-400">Become a certified AquaCafe collection point and reward customers</p>
                </div>

                <div className="space-y-4 mb-8" data-testid="champion-benefits">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Become a certified AquaCafe collection point</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Earn <strong className="text-hero-green-500">AED 25</strong> reward for every successful trade-in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Increase foot traffic & customer engagement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Priority access to new product launches & exclusive Champion pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">Co-branded marketing materials & Champion certification badge</span>
                  </div>
                </div>

                <div className="bg-hero-green-500/10 border border-hero-green-500/30 rounded-xl p-6 mb-6" data-testid="champion-benefits-stats">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Average partner benefits:</div>
                    <div className="text-3xl font-bold text-hero-green-500 mb-2">+65% Revenue</div>
                    <div className="text-sm text-gray-400">Average monthly earnings: AED 2,500+ from rewards</div>
                  </div>
                </div>
              </>
            )}

            {/* Success Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8" data-testid="success-metrics">
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <Target className="w-6 h-6 text-dubai-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">250+</div>
                <div className="text-xs text-gray-400">Active Partners</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-hero-green-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">95%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">24hrs</div>
                <div className="text-xs text-gray-400">Avg Setup</div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="glass rounded-2xl p-8 border border-slate-600" data-testid="application-form">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Apply to Become a {isAffiliate ? "Ambassador Agent" : "Champion"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none"
                  placeholder="Enter your email address"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none"
                  placeholder="+971 XX XXX XXXX"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  {isAffiliate ? "Business Type" : "Champion Type"} *
                </label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none"
                  data-testid="select-business-type"
                >
                  <option value="">Select type</option>
                  {isAffiliate ? (
                    <>
                      <option value="individual">Individual Entrepreneur</option>
                      <option value="small-business">Small Business Owner</option>
                      <option value="marketing-agency">Marketing Agency</option>
                      <option value="social-influencer">Social Media Influencer</option>
                      <option value="online-business">Online Business</option>
                    </>
                  ) : (
                    <>
                      <option value="casual-dining">Casual Dining</option>
                      <option value="quick-service">Quick Service Restaurant</option>
                      <option value="cafe">Café/Coffee Shop</option>
                      <option value="fine-dining">Fine Dining</option>
                      <option value="food-court">Food Court</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Location (Dubai Area) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none"
                  placeholder="e.g., Dubai Marina, Downtown, JLT"
                  data-testid="input-location"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Relevant Experience
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none h-24 resize-none"
                  placeholder={isAffiliate 
                    ? "Tell us about your sales/marketing experience..."
                    : "Tell us about your champion network and customer base..."
                  }
                  data-testid="textarea-experience"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isAffiliate
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                    : "bg-gradient-to-r from-hero-green-500 to-hero-green-600 hover:from-hero-green-600 hover:to-hero-green-700 text-white"
                }`}
                data-testid="button-submit-application"
              >
                {isSubmitting ? (
                  "Submitting Application..."
                ) : (
                  <>
                    <Users className="mr-2 w-5 h-5" />
                    {isAffiliate ? "BECOME AN AMBASSADOR" : "BECOME A CHAMPION"}
                  </>
                )}
              </Button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-400">
              <p>Applications are typically reviewed within 24-48 hours</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16" data-testid="contact-section">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to start earning immediately?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+971523946311" 
              className="glass hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4 mr-2" />
              +971 52 394 6311
            </a>
            <a 
              href="mailto:partners@deliwer.com" 
              className="glass hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
              data-testid="link-email"
            >
              <Mail className="w-4 h-4 mr-2" />
              partners@deliwer.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 glass rounded-2xl p-8 border border-slate-600" data-testid="faq-section">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">How quickly can I start earning?</h4>
              <p className="text-gray-300 text-sm mb-4">Most partners start earning within 48 hours of approval. Our onboarding process is streamlined for immediate activation.</p>
              
              <h4 className="text-lg font-semibold text-white mb-2">What support do you provide?</h4>
              <p className="text-gray-300 text-sm mb-4">24/7 partner support, marketing materials, training resources, and dedicated account management.</p>
              
              <h4 className="text-lg font-semibold text-white mb-2">What territories are available?</h4>
              <p className="text-gray-300 text-sm mb-4">We cover all Dubai emirates with expansion plans for UAE, Saudi Arabia, and Oman in 2025.</p>
              
              <h4 className="text-lg font-semibold text-white mb-2">Do I need experience?</h4>
              <p className="text-gray-300 text-sm mb-4">No prior experience required. We provide comprehensive training and ongoing support for all partners.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Are there any upfront costs?</h4>
              <p className="text-gray-300 text-sm mb-4">No upfront fees! Our partnership programs are completely free to join with no hidden costs.</p>
              
              <h4 className="text-lg font-semibold text-white mb-2">How are commissions paid?</h4>
              <p className="text-gray-300 text-sm mb-4">Weekly payouts via bank transfer or digital wallet. Minimum payout threshold is AED 100.</p>
              
              <h4 className="text-lg font-semibold text-white mb-2">What about environmental compliance?</h4>
              <p className="text-gray-300 text-sm mb-4">All partners receive environmental certification and training to ensure compliance with Dubai Municipality standards.</p>
              
              <h4 className="text-lg font-semibold text-white mb-2">Can I work with competitors?</h4>
              <p className="text-gray-300 text-sm mb-4">Non-compete agreements vary by partnership type. Details provided during the application process.</p>
            </div>
          </div>
        </div>

        {/* Eco-Trade Partners Wholesale Program */}
        <div className="mt-16 glass rounded-2xl p-8 border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5" data-testid="ecotrade-wholesale-program">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Eco-Trade Partners: Wholesale Program</h2>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              ACCEPTING REGISTRATIONS
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center p-6 bg-slate-700/30 rounded-xl border border-purple-500/20">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">AI Sourcing Access</h3>
              <p className="text-gray-400 text-sm">Advanced AI algorithms help you source premium refurbished electronics with quality scoring and price optimization</p>
            </div>
            
            <div className="text-center p-6 bg-slate-700/30 rounded-xl border border-hero-green-500/20">
              <DollarSign className="w-8 h-8 text-hero-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Wholesale Rates</h3>
              <p className="text-gray-400 text-sm">Access exclusive wholesale pricing tiers with volume discounts up to 40% off retail prices for bulk orders</p>
            </div>
            
            <div className="text-center p-6 bg-slate-700/30 rounded-xl border border-dubai-blue-500/20">
              <Gift className="w-8 h-8 text-dubai-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Trade Incentives</h3>
              <p className="text-gray-400 text-sm">Earn 5-15% commission on every successful trade plus priority access to high-demand refurbished electronics</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Register your electronics retail or wholesale business to access our AI-powered sourcing platform and exclusive trade rates
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-3 font-bold" data-testid="button-wholesale-inquiry">
              <Users className="mr-2 w-5 h-5" />
              Register Wholesale Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
