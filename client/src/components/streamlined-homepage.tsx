import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Smartphone, Crown, Gift, CheckCircle, ArrowRight, TrendingUp, Repeat, Droplets, Gamepad2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { Link } from "wouter";

export function StreamlinedHomepage() {
  const { data: stats } = useImpactStats();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section with DeliWer Logo */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* DeliWer Logo & Brand Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <img 
                src="/attached_assets/deliwer logo_1755631083918.png" 
                alt="DeliWer"
                className="h-16 md:h-24 mx-auto mb-6 drop-shadow-xl"
                loading="eager"
              />
              <div className="inline-flex items-center bg-hero-green-500/20 backdrop-blur-sm rounded-full px-6 py-2 border border-hero-green-500/50">
                <span className="text-hero-green-300 font-bold text-sm tracking-wide">🌍 DUBAI'S FIRST CIRCULAR EXCHANGE PLATFORM</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block text-white drop-shadow-lg">From iPhones to</span>
              <span className="block bg-gradient-to-r from-hero-green-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">Life Essentials</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Transform your old electronics into water systems, health products, and more. 
              <strong className="text-hero-green-400"> All at the convenience of your home.</strong>
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-black text-hero-green-400">{stats?.activeHeroes?.toLocaleString() || '12,847'}</div>
                <div className="text-gray-400 text-sm">Active Heroes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-400">AED 2M+</div>
                <div className="text-gray-400 text-sm">Total Value Exchanged</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-400">98.5%</div>
                <div className="text-gray-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Three-Step Visual Process */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                How It Works
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Simple. Fast. Sustainable. Transform your electronics in three easy steps.
              </p>
            </div>

            {/* Interactive Step Process */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              
              {/* Step 1: Trade */}
              <div 
                className={`relative cursor-pointer transition-all duration-500 ${currentStep === 1 ? 'scale-105 z-10' : 'hover:scale-102'}`}
                onClick={() => setCurrentStep(1)}
              >
                <div className={`glass rounded-3xl p-8 border-2 ${currentStep === 1 ? 'border-hero-green-500 bg-gradient-to-br from-hero-green-500/20 to-emerald-500/20' : 'border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10'} backdrop-blur-sm`}>
                  
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 1 ? 'bg-hero-green-500 text-black' : 'bg-blue-500 text-white'}`}>
                      1
                    </div>
                  </div>
                  
                  {/* Visual Icon */}
                  <div className="text-center mb-6 mt-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${currentStep === 1 ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
                      <Repeat className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">TRADE</h3>
                    <p className="text-gray-300 mb-4">Share your iPhone details and get instant valuation</p>
                  </div>

                  {/* Generated Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl mb-4 overflow-hidden border border-blue-500/30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative">
                          <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-3 animate-pulse" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-black">1</span>
                          </div>
                        </div>
                        <div className="text-blue-200 text-sm font-medium">Share iPhone Details</div>
                        <div className="text-blue-400/70 text-xs mt-1">Instant AI Valuation</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Value Examples */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-blue-500/20 rounded-lg p-2">
                      <span className="text-gray-300">iPhone 15</span>
                      <span className="text-blue-400 font-bold">AED 2,800</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-500/20 rounded-lg p-2">
                      <span className="text-gray-300">iPhone 16</span>
                      <span className="text-blue-400 font-bold">AED 3,500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Choose */}
              <div 
                className={`relative cursor-pointer transition-all duration-500 ${currentStep === 2 ? 'scale-105 z-10' : 'hover:scale-102'}`}
                onClick={() => setCurrentStep(2)}
              >
                <div className={`glass rounded-3xl p-8 border-2 ${currentStep === 2 ? 'border-hero-green-500 bg-gradient-to-br from-hero-green-500/20 to-emerald-500/20' : 'border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10'} backdrop-blur-sm`}>
                  
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 2 ? 'bg-hero-green-500 text-black' : 'bg-purple-500 text-white'}`}>
                      2
                    </div>
                  </div>
                  
                  {/* Visual Icon */}
                  <div className="text-center mb-6 mt-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${currentStep === 2 ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">CHOOSE</h3>
                    <p className="text-gray-300 mb-4">Select from water systems, health products, or tech upgrades</p>
                  </div>

                  {/* Generated Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl mb-4 overflow-hidden border border-purple-500/30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3)_0%,transparent_70%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-3">
                          <div className="relative">
                            <Droplets className="w-12 h-12 text-blue-400 animate-bounce" />
                          </div>
                          <div className="relative">
                            <Gift className="w-12 h-12 text-purple-400 animate-pulse" />
                          </div>
                        </div>
                        <div className="text-purple-200 text-sm font-medium">Choose Life Essentials</div>
                        <div className="text-purple-400/70 text-xs mt-1">Water • Health • Tech</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Categories */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-purple-500/20 rounded-lg p-2">
                      <span className="text-gray-300">💧 Water Systems</span>
                      <span className="text-purple-400 font-bold">AED 299+</span>
                    </div>
                    <div className="flex justify-between items-center bg-purple-500/20 rounded-lg p-2">
                      <span className="text-gray-300">🍃 Health Products</span>
                      <span className="text-purple-400 font-bold">AED 199+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Deliver */}
              <div 
                className={`relative cursor-pointer transition-all duration-500 ${currentStep === 3 ? 'scale-105 z-10' : 'hover:scale-102'}`}
                onClick={() => setCurrentStep(3)}
              >
                <div className={`glass rounded-3xl p-8 border-2 ${currentStep === 3 ? 'border-hero-green-500 bg-gradient-to-br from-hero-green-500/20 to-emerald-500/20' : 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10'} backdrop-blur-sm`}>
                  
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 3 ? 'bg-hero-green-500 text-black' : 'bg-amber-500 text-white'}`}>
                      3
                    </div>
                  </div>
                  
                  {/* Visual Icon */}
                  <div className="text-center mb-6 mt-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${currentStep === 3 ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}>
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">DELIVER</h3>
                    <p className="text-gray-300 mb-4">Get your products delivered while we collect your iPhone</p>
                  </div>

                  {/* Generated Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl mb-4 overflow-hidden border border-amber-500/30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.3)_0%,transparent_70%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative mb-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                            <Gift className="w-8 h-8 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-8 h-8 bg-hero-green-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="text-amber-200 text-sm font-medium">Home Delivery Service</div>
                        <div className="text-amber-400/70 text-xs mt-1">Same Day • Dubai Wide</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Benefits */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-2">
                      <span className="text-gray-300">🏠 Home Pickup</span>
                      <span className="text-amber-400 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-2">
                      <span className="text-gray-300">🚚 Same Day</span>
                      <span className="text-amber-400 font-bold">Dubai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <div className="text-center mb-16">
              <button
                onClick={() => {
                  const meetDeliSection = document.querySelector('[data-section="meet-deli"]');
                  if (meetDeliSection) {
                    meetDeliSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => {
                      const input = meetDeliSection.querySelector('input, textarea, select');
                      if (input) {
                        (input as HTMLElement).focus();
                      }
                    }, 500);
                  }
                }}
                className="relative group bg-gradient-to-r from-hero-green-500 to-emerald-500 hover:from-hero-green-400 hover:to-emerald-400 text-black font-black px-16 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-hero-green-400 to-emerald-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center">
                  <Play className="w-8 h-8 mr-3" />
                  START YOUR EXCHANGE
                </div>
              </button>
              
              <p className="text-gray-400 text-sm mt-4">
                💯 Free valuation • 🏠 Home convenience • ⚡ Instant quotes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Trade Assistant */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50" data-section="meet-deli">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
              Meet Deli • Your AI Assistant
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get instant iPhone valuation and personalized product recommendations
            </p>
          </div>
          <MeetDeliInteractive />
        </div>
      </section>

      {/* iPhone 17 Challenge Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
            <Trophy className="w-5 h-5 text-purple-300 mr-2" />
            <span className="text-purple-200 font-bold text-sm tracking-wide">SPECIAL CHALLENGE • SEPTEMBER 2025</span>
            <Trophy className="w-5 h-5 text-purple-300 ml-2" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-hero-green-400 bg-clip-text text-transparent">
              iPhone 17 Planet Points Challenge
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Trade your iPhone → Collect Planet Points → Minimize cash for iPhone 17 upgrade at Apple Event (Sep 9)
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">4,000</div>
              <div className="text-gray-400 text-sm">Points for iPhone 16</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-hero-green-400">AED 3,200</div>
              <div className="text-gray-400 text-sm">Maximum Store Credit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">AED 1,799</div>
              <div className="text-gray-400 text-sm">Cash Needed Only</div>
            </div>
          </div>
          
          <Link href="/leaderboard">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Join Challenge
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-white">
            Trusted by Dubai's Sustainability Heroes
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="glass rounded-2xl p-6 border border-hero-green-500/30">
              <div className="text-3xl font-black text-hero-green-400">{stats?.totalRewards?.toLocaleString() || '8,247'}</div>
              <div className="text-gray-400 text-sm">Total Rewards</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl font-black text-blue-400">{stats?.totalBottlesPrevented?.toLocaleString() || '156,892'}</div>
              <div className="text-gray-400 text-sm">Bottles Prevented</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-purple-500/30">
              <div className="text-3xl font-black text-purple-400">4.9/5</div>
              <div className="text-gray-400 text-sm">Customer Rating</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-amber-500/30">
              <div className="text-3xl font-black text-amber-400">24h</div>
              <div className="text-gray-400 text-sm">Average Delivery</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aquacafe">
              <Button size="lg" className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8 py-3 shadow-xl">
                <Droplets className="w-5 h-5 mr-2" />
                Shop AquaCafe
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}