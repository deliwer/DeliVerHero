import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceSimulator } from "@/components/device-simulator";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CreditCard, Gift, Recycle, Star, TrendingUp } from "lucide-react";

export default function Exchange() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
            <Recycle className="w-5 h-5" />
            <span className="font-medium">iPhone Trade-In Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Exchange Your iPhone
            <span className="block text-hero-green-400">Get Instant Value</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Turn your old iPhone into store credit or sustainable products. Get competitive valuations and contribute to environmental sustainability through our innovative trade-in program.
          </p>
        </div>

        {/* Exchange Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CreditCard className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
              <CardTitle className="text-white">Store Credit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center">
                Receive instant store credit that can be used across our entire product ecosystem including AquaCafe water systems.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Gift className="w-12 h-12 text-dubai-blue-500 mx-auto mb-4" />
              <CardTitle className="text-white">Product Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center">
                Exchange directly for sustainable products, tech upgrades, or water purification systems at discounted rates.
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
                Play for Planet Points with every trade that unlock exclusive rewards and advance your sustainability journey.
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
                  <h4 className="font-semibold text-white mb-2">FREE Installation</h4>
                  <p className="text-gray-300 text-sm">AED 299 value included with every starter kit membership</p>
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
              Get Your Trade Value
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Use our advanced evaluation system to get an instant quote for your iPhone. Our AI-powered assessment considers model, condition, and current market value.
            </p>
          </div>
          
          {/* Device Simulator Component */}
          <div className="max-w-4xl mx-auto">
            <DeviceSimulator />
          </div>
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