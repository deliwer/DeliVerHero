import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceSimulator } from "@/components/device-simulator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, CreditCard, Gift, Recycle, Star, TrendingUp, Package, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Exchange() {
  const { toast } = useToast();
  const [sellFormData, setSellFormData] = useState({
    deviceType: "",
    model: "",
    condition: "",
    storage: "",
    expectedPrice: "",
    description: "",
    contactEmail: "",
    contactPhone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/trade-in/sell-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sellFormData)
      });

      if (!response.ok) throw new Error('Failed to submit');

      const data = await response.json();
      
      toast({
        title: "Trade-in Request Submitted!",
        description: `AI Deli evaluated your ${sellFormData.model} and offered AED ${data.aiPricing?.offerPriceAED}. We'll contact you within 24 hours.`,
      });

      setSellFormData({
        deviceType: "",
        model: "",
        condition: "",
        storage: "",
        expectedPrice: "",
        description: "",
        contactEmail: "",
        contactPhone: ""
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to submit your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Trade-In Banner Integration */}
        <div className="mb-16">
          <TradeInBanner />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
            <Recycle className="w-5 h-5" />
            <span className="font-medium">iPhone Trade-In Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Earn from Your iPhone
            <span className="block text-hero-green-400">Turn Tech into Cash & Rewards</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Unlock hidden value in your old iPhone by earning real money, store credits, and Planet Points. Transform your unused technology into environmental action and sustainable rewards.
          </p>
        </div>

        {/* Exchange Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CreditCard className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
              <CardTitle className="text-white">Instant Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center">
                Earn immediate value as store credit or cash equivalent that unlocks our entire ecosystem including AquaCafe water systems.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Gift className="w-12 h-12 text-dubai-blue-500 mx-auto mb-4" />
              <CardTitle className="text-white">Smart Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center">
                Earn bonus value by choosing sustainable products, tech upgrades, or water purification systems at member-exclusive rates.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-white">Planet Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center">
                Earn Planet Points with every device trade-in that multiply your rewards and unlock exclusive sustainability perks.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Starter Kit Membership CTA */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-3xl p-8 border border-cyan-500/30">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                🎯 Smart Move: Start with Membership
              </h3>
              <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                Before trading in your iPhone, join our loyalty program with the AED 99 Starter Kit. 
                Get immediate value while preparing for your future trade-ins with exclusive member benefits.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Higher Trade Values</h4>
                  <p className="text-gray-300 text-sm">Members get priority pricing and bonus credits on all trades</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Discounted Installation</h4>
                  <p className="text-gray-300 text-sm">Reduced from AED 299 for loyalty members</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Planet Points</h4>
                  <p className="text-gray-300 text-sm">Earn rewards with every trade and environmental action</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/aquacafe"
                  className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition-all transform hover:scale-105"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Get Starter Kit - AED 99
                </a>
                <a
                  href="/partners"
                  className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold transition-all transform hover:scale-105"
                >
                  <Recycle className="w-5 h-5 mr-2" />
                  Explore Trade Partnerships
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Value Calculator */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Calculate Your Earnings
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover how much you can earn from your iPhone with our instant evaluation. Our AI-powered system maximizes your earning potential based on model, condition, and real-time market demand.
            </p>
          </div>
          
          {/* Device Simulator Component */}
          <div className="max-w-4xl mx-auto">
            <DeviceSimulator />
          </div>
        </div>

        {/* Sell Your Device Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-dubai-blue-500/20 text-dubai-blue-400 px-4 py-2 rounded-full mb-6">
              <Package className="w-5 h-5" />
              <span className="font-medium">List Your Device</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Sell Your Device to DeliWer
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Ready to sell? Submit your device details and our AI Deli pricing engine will provide you with a competitive offer based on real-time market data.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm" data-testid="card-sell-device">
            <CardHeader>
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-hero-green-500" />
                <div>
                  <CardTitle className="text-white text-2xl">Trade-in Form</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">AI-powered pricing for maximum value</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSellSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deviceType" className="text-white">Device Type</Label>
                    <Select
                      value={sellFormData.deviceType}
                      onValueChange={(value) => setSellFormData({...sellFormData, deviceType: value})}
                    >
                      <SelectTrigger 
                        id="deviceType" 
                        className="bg-slate-900/50 border-slate-600 text-white"
                        data-testid="select-device-type"
                      >
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iphone">iPhone</SelectItem>
                        <SelectItem value="ipad">iPad</SelectItem>
                        <SelectItem value="macbook">MacBook</SelectItem>
                        <SelectItem value="watch">Apple Watch</SelectItem>
                        <SelectItem value="airpods">AirPods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-white">Model</Label>
                    <Input
                      id="model"
                      value={sellFormData.model}
                      onChange={(e) => setSellFormData({...sellFormData, model: e.target.value})}
                      placeholder="e.g., iPhone 15 Pro Max"
                      className="bg-slate-900/50 border-slate-600 text-white"
                      data-testid="input-model"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition" className="text-white">Condition</Label>
                    <Select
                      value={sellFormData.condition}
                      onValueChange={(value) => setSellFormData({...sellFormData, condition: value})}
                    >
                      <SelectTrigger 
                        id="condition" 
                        className="bg-slate-900/50 border-slate-600 text-white"
                        data-testid="select-condition"
                      >
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent - Like new, no scratches</SelectItem>
                        <SelectItem value="good">Good - Minor wear, fully functional</SelectItem>
                        <SelectItem value="fair">Fair - Visible wear, works perfectly</SelectItem>
                        <SelectItem value="poor">Poor - Heavy wear, some issues</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storage" className="text-white">Storage Capacity</Label>
                    <Select
                      value={sellFormData.storage}
                      onValueChange={(value) => setSellFormData({...sellFormData, storage: value})}
                    >
                      <SelectTrigger 
                        id="storage" 
                        className="bg-slate-900/50 border-slate-600 text-white"
                        data-testid="select-storage"
                      >
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="64gb">64GB</SelectItem>
                        <SelectItem value="128gb">128GB</SelectItem>
                        <SelectItem value="256gb">256GB</SelectItem>
                        <SelectItem value="512gb">512GB</SelectItem>
                        <SelectItem value="1tb">1TB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-white">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={sellFormData.contactEmail}
                      onChange={(e) => setSellFormData({...sellFormData, contactEmail: e.target.value})}
                      placeholder="your@email.com"
                      className="bg-slate-900/50 border-slate-600 text-white"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-white">Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={sellFormData.contactPhone}
                      onChange={(e) => setSellFormData({...sellFormData, contactPhone: e.target.value})}
                      placeholder="+971 50 123 4567"
                      className="bg-slate-900/50 border-slate-600 text-white"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedPrice" className="text-white">Expected Price (Optional)</Label>
                  <Input
                    id="expectedPrice"
                    type="number"
                    value={sellFormData.expectedPrice}
                    onChange={(e) => setSellFormData({...sellFormData, expectedPrice: e.target.value})}
                    placeholder="Your expected price in AED"
                    className="bg-slate-900/50 border-slate-600 text-white"
                    data-testid="input-expected-price"
                  />
                  <p className="text-sm text-gray-400">Our AI will provide market-based pricing regardless of your expectation</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={sellFormData.description}
                    onChange={(e) => setSellFormData({...sellFormData, description: e.target.value})}
                    placeholder="Any additional information about your device (accessories included, warranty status, etc.)"
                    className="bg-slate-900/50 border-slate-600 text-white min-h-[100px]"
                    data-testid="textarea-description"
                  />
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold text-white mb-1">What happens next?</p>
                      <ul className="space-y-1">
                        <li>• AI Deli analyzes current market prices for your device</li>
                        <li>• You'll receive a competitive offer within 24 hours</li>
                        <li>• Accept the offer and ship your device with free packaging</li>
                        <li>• Get paid within 24 hours of verification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-hero-green-600 to-emerald-600 hover:from-hero-green-700 hover:to-emerald-700 text-white py-6 text-lg font-semibold"
                  data-testid="button-submit-sell"
                >
                  {isSubmitting ? (
                    "Evaluating..."
                  ) : (
                    <>
                      <Package className="w-5 h-5 mr-2" />
                      Submit for AI Pricing Evaluation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-300">Simple, transparent, and fast trade-in process</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-hero-green-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Evaluate</h3>
              <p className="text-gray-400">Select your iPhone model and condition using our evaluation tool above</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-dubai-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dubai-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Option</h3>
              <p className="text-gray-400">Select store credit, product exchange, or combination of both</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ship Device</h3>
              <p className="text-gray-400">Send your iPhone using our free shipping label and secure packaging</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Get Value</h3>
              <p className="text-gray-400">Receive your store credit or products within 24 hours of device verification</p>
            </div>
          </div>
        </div>

        {/* Value Guarantee */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600 mb-12">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-8 h-8 text-hero-green-500 mr-3" />
            <h3 className="text-2xl font-bold text-white">Value Guarantee</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Competitive Pricing</h4>
              <p className="text-gray-400">
                Our AI-powered evaluation system ensures you get the best possible value for your device based on real-time market data.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Price Protection</h4>
              <p className="text-gray-400">
                Your quoted price is locked for 30 days, protecting you from market fluctuations during the trade-in process.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge variant="secondary" className="bg-hero-green-500/20 text-hero-green-400">
              Free Shipping
            </Badge>
            <Badge variant="secondary" className="bg-dubai-blue-500/20 text-dubai-blue-400">
              Instant Quotes
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              30-Day Price Lock
            </Badge>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
              24hr Processing
            </Badge>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-hero-green-500/10 border border-hero-green-500/30 rounded-2xl p-8">
            <Smartphone className="w-16 h-16 text-hero-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join the Sustainability Revolution?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start with our AED 99 Starter Kit to unlock the complete ecosystem. Then explore partnerships for individual, corporate, or community trade-in programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/aquacafe"
                className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Starter Kit - AED 99
              </a>
              <a 
                href="/partners"
                className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Trade Partnerships
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}