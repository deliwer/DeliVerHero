import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { 
  Home, Rocket, Target, Trophy, Star, Zap, Shield, Award, Heart, 
  Users, Droplets, Leaf, MapPin, Clock, Phone, ChefHat, Gift, 
  CheckCircle, ShoppingCart, Building2, Smartphone, Camera, 
  Footprints, Bike, TreePine, Ship, Crown, Navigation 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TombolaWidget } from "@/components/tombola-widget";
import { CouponsPanel } from "@/components/coupons-panel";
import { DubaiWellnessJourney } from "@/components/dubai-wellness-journey";
import { StarsSponsorshipSection } from "@/components/stars-sponsorship-section";
import { RewardComparison } from "@/components/reward-comparison";
import aquacafeLogo from "@assets/AquaCafe_Logo_1756289482990.png";
import bakersKitchenLogo from "@assets/BK_Logo_1756289175349.jpg";

export default function Earn() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-emerald-50 to-cyan-50">
      {/* Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-emerald-800 hover:text-emerald-600 transition-colors" data-testid="link-back-home">
          <Home className="w-5 h-5" />
          <span className="font-semibold">DeliWer</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/aquacafe" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors" data-testid="link-aquacafe">
            AquaCafe Shop
          </Link>
          <Link href="/collect" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition-colors" data-testid="link-play">
            Play
          </Link>
        </div>
      </div>
      
      {/* Earn Hero Section */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-blue-500/10 relative overflow-hidden" data-testid="earn-hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          {/* Title */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl animate-pulse">
            <Trophy className="w-6 h-6 mr-3" />
            🏆 EARN REWARDS 🏆
            <Trophy className="w-6 h-6 ml-3" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600 animate-pulse drop-shadow-2xl">
              Complete Missions & Activities
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold">
            <span className="text-emerald-600 drop-shadow-lg">Trade iPhones</span> • 
            <span className="text-blue-600 drop-shadow-lg">Complete Challenges</span> • 
            <span className="text-amber-600 drop-shadow-lg">Earn Rewards</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join AquaCafe Loyalty, earn Planet Impact Credits (PICs), complete missions, and redeem rewards. Every action counts towards Dubai's sustainability goals.
          </p>
          
          {/* Mission Categories */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {/* Trade-ins */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-blue-600 text-4xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Device Trade-ins</h3>
              <p className="text-gray-600 text-sm mb-4">Trade your iPhone and earn up to 5,000 PICs</p>
              <Link 
                href="/exchange"
                className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 text-sm rounded-lg transition-all"
                data-testid="button-trade-device"
              >
                Start Trade-in
              </Link>
            </div>
            
            {/* Eco Activities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-emerald-600 text-4xl mb-3">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Eco Activities</h3>
              <p className="text-gray-600 text-sm mb-4">Complete daily missions and sustainability challenges</p>
              <Button 
                onClick={() => {
                  const element = document.querySelector('[data-testid="missions-hub"]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 text-sm rounded-lg"
                data-testid="button-eco-missions"
              >
                View Missions
              </Button>
            </div>
            
            {/* Referrals */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-amber-600 text-4xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Referral Rewards</h3>
              <p className="text-gray-600 text-sm mb-4">Invite friends and earn AED 100 + 500 PICs</p>
              <Link 
                href="/aquacafe"
                className="inline-block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 text-sm rounded-lg transition-all"
                data-testid="button-referral-rewards"
              >
                Get Referral Code
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Buy PICs Instantly - Fund Sustainability Projects */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white" data-testid="buy-pics-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30 mb-4">
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="font-bold text-sm">MONETIZE SUSTAINABILITY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Buy PICs to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Fund Impact</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
              Purchase Planet Impact Credits directly to support clean water access, e-waste recycling, and environmental awareness campaigns. 
              <strong className="text-emerald-400"> 100 PICs = $10 value</strong>
            </p>
          </div>
          <StarsSponsorshipSection />
        </div>
      </section>

      {/* AquaCafe Loyalty Membership Tiers - Reward Type Selection */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-slate-800 to-slate-900" data-testid="membership-tiers-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full border border-cyan-500/30 mb-4">
              <Trophy className="w-4 h-4 flex-shrink-0" />
              <span className="font-bold text-sm">AQUACAFE LOYALTY GATEWAY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join AquaCafe & <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Start Earning</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
              Become an AquaCafe member to unlock multipliers, exclusive perks, and accelerated PIC earning. 
              Choose how you want to receive value from your iPhone trade-ins and purchases.
            </p>
          </div>
          <RewardComparison />
        </div>
      </section>

      {/* AquaCafe Heroes Tombola - Win Prizes While Earning */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 relative overflow-hidden" data-testid="tombola-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Droplets className="w-8 h-8 text-cyan-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Win Rewards While You Earn
              </h2>
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              🌊 <strong>Every spin saves our planet!</strong> Win exclusive AquaCafe prizes, digital coupons, and bonus Planet Points while supporting clean water initiatives.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Zero Plastic Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Clean Energy Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Hero Impact Certified</span>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <TombolaWidget heroId="founder-1" theme="aquacafe" size="full" />
            </div>
            <div className="flex justify-center">
              <CouponsPanel heroId="founder-1" theme="aquacafe" showTitle={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Missions Hub - Activities to Earn PICs */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-blue-50 to-emerald-50" data-testid="missions-hub">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              🎯 Earn More PICs - Missions Hub
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete missions to earn Planet Impact Credits (PICs). Trade iPhones, refer friends, share on social media, and participate in sustainability challenges. Every action contributes to Dubai's circular economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* iPhone Trade-in Mission */}
            <Card className="bg-white border-blue-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">iPhone Trade-in</h3>
                    <p className="text-sm text-blue-600 font-bold">Up to 5,000 PICs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Trade your old iPhone and get instant PICs plus credit toward AquaCafe water systems
                </p>
                <Link 
                  href="/exchange"
                  className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-all"
                  data-testid="button-mission-tradein"
                >
                  Start Trade-in
                </Link>
              </CardContent>
            </Card>

            {/* Join AquaCafe Mission */}
            <Card className="bg-white border-emerald-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">AquaCafe Membership</h3>
                    <p className="text-sm text-emerald-600 font-bold">1,000 PICs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Get the AED 99 Starter Kit and become a Planet Hero Level 2 member with instant PICs
                </p>
                <Link 
                  href="/aquacafe"
                  className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-all"
                  data-testid="button-mission-membership"
                >
                  Join Now
                </Link>
              </CardContent>
            </Card>

            {/* Referral Mission */}
            <Card className="bg-white border-amber-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Referral Bonus</h3>
                    <p className="text-sm text-amber-600 font-bold">500 PICs + AED 100</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Refer a friend to AquaCafe and both get AED 100 Chill & Grill voucher + 500 PICs
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Referral Code",
                      description: "Your unique referral code: HERO" + Math.random().toString(36).substr(2, 6).toUpperCase()
                    });
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  data-testid="button-mission-referral"
                >
                  Get Referral Code
                </Button>
              </CardContent>
            </Card>

            {/* Daily Check-in */}
            <Card className="bg-white border-purple-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Daily Check-in</h3>
                    <p className="text-sm text-purple-600 font-bold">50 PICs/Day</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Log in daily to collect 50 PICs and maintain your streak
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Daily Reward Claimed!",
                      description: "+50 PICs earned! Come back tomorrow for more!"
                    });
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  data-testid="button-mission-checkin"
                >
                  Claim Daily Reward
                </Button>
              </CardContent>
            </Card>

            {/* Eco Challenge */}
            <Card className="bg-white border-green-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Plastic-Free Week</h3>
                    <p className="text-sm text-green-600">1,000 Points</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete the 7-day plastic-free challenge and document your journey
                </p>
                <Link 
                  href="/collect"
                  className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-all"
                  data-testid="button-mission-challenge"
                >
                  Start Challenge
                </Link>
              </CardContent>
            </Card>

            {/* Community Event */}
            <Card className="bg-white border-pink-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Community Event</h3>
                    <p className="text-sm text-pink-600">750 Points</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Attend Baker's Kitchen sustainability workshop and Kangen Water demo
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Event Registered",
                      description: "See you at Baker's Kitchen Mazaya Center!"
                    });
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  data-testid="button-mission-event"
                >
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 relative overflow-hidden" data-testid="partnership-hero" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="flex flex-col items-center">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe by DeliWer Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Water Filtration
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-emerald-500">×</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Baker's Kitchen UAE Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Healthy Dining
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Earn Points Through Our Partnership Network
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              AquaCafe + Baker's Kitchen: The perfect synergy of pure water and wholesome nutrition for earning rewards
            </p>
            
            <Link
              href="/aquacafe"
              className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 text-base font-bold rounded-xl shadow-lg transition-all"
              data-testid="button-join-partnership"
            >
              <ShoppingCart className="mr-3 w-5 h-5 inline" />
              Join Partnership Program
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">AquaCafe Rewards</h3>
                    <p className="text-cyan-600 text-sm font-semibold">Earn points with every purchase</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Starter Kit: 1,000 pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Filter refills: 200 pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>System upgrade: 500 pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Referrals: 500 pts each</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Baker's Kitchen Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Baker's Kitchen Perks</h3>
                    <p className="text-amber-600 text-sm font-semibold">Redeem points for dining vouchers</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>AED 100 voucher</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Kangen Water demos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Special events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Member discounts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-200 shadow-lg inline-block">
              <div className="text-amber-600 font-bold text-base sm:text-lg mb-2">Visit Baker's Kitchen Mazaya Center</div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Mazaya Center, Business Bay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Open Daily 9AM-11PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Wellness Journey Passport */}
      <DubaiWellnessJourney 
        variant="aquacafe"
        showMembershipCTA={true}
        onMembershipSignup={() => {
          toast({
            title: "Unlock All Locations",
            description: "Get the AquaCafe starter kit to unlock exclusive access to all wellness locations!",
          });
          window.location.href = '/aquacafe';
        }}
      />

      {/* CTA Footer */}
      <footer className="w-full border-t border-emerald-200 mt-8 bg-gradient-to-r from-emerald-50 to-cyan-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Earning?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of Planet Heroes earning rewards while making Dubai more sustainable
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/exchange"
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-exchange"
              >
                <Smartphone className="inline w-5 h-5 mr-2" />
                Trade Your iPhone
              </Link>
              <Link
                href="/aquacafe"
                className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-aquacafe"
              >
                <Droplets className="inline w-5 h-5 mr-2" />
                Get Starter Kit
              </Link>
              <Link
                href="/collect"
                className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-play"
              >
                <Trophy className="inline w-5 h-5 mr-2" />
                Play & Earn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
