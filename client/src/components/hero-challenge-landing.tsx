import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useImageOptimization, useImageServiceWorker } from "@/hooks/use-image-optimization";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png";

interface HeroSpotCounterProps {
  initialCount?: number;
}

function HeroSpotCounter({ initialCount = 47 }: HeroSpotCounterProps) {
  const [spotsLeft, setSpotsLeft] = useState(initialCount);
  
  useEffect(() => {
    // Simulate spots being taken every 30-60 seconds
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        const newCount = Math.max(1, prev - Math.floor(Math.random() * 2));
        return newCount;
      });
    }, 45000 + Math.random() * 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2" data-testid="hero-spots-counter">
      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
      <span className="text-red-400 font-bold text-sm">
        Only {spotsLeft} Founding Hero spots left today
      </span>
    </div>
  );
}

interface CountdownTimerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function CountdownTimer({ hours = 23, minutes = 47, seconds = 32 }: CountdownTimerProps) {
  const [time, setTime] = useState({ hours, minutes, seconds });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              // Reset when reaches zero
              return { hours: 23, minutes: 47, seconds: 32 };
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (time: number) => time.toString().padStart(2, '0');
  
  return (
    <div className="flex items-center space-x-2 text-amber-500" data-testid="hero-countdown">
      <Timer className="w-4 h-4" />
      <span className="font-mono font-bold">
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
      </span>
      <span className="text-sm text-gray-400">until double points end</span>
    </div>
  );
}

function ComprehensiveCampaignSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // iPhone 17 Apple Event - Tuesday, September 9, 2025 at 10 AM PDT (6 PM GMT+4 Dubai)
    const eventDate = new Date('2025-09-09T18:00:00+04:00'); // 6 PM Dubai time
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30 mb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-hero-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Unified Header: Beyond Telcos + iPhone 17 Launch */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building className="w-8 h-8 text-emerald-400" />
            <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-blue-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-hero-green-300 mr-2" />
              <span className="text-hero-green-200 font-bold text-sm tracking-wide">APPLE EVENT • SEPTEMBER 9, 2025</span>
              <Sparkles className="w-4 h-4 text-hero-green-300 ml-2" />
            </div>
            <Handshake className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-hero-green-200 to-blue-200 bg-clip-text text-transparent">
              BEYOND ETISALAT & DU
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-200 font-bold">iPhone 17 Launch Campaign</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            World's first cross-category trade platform leveraging iPhone 17 launch limelight. Join <strong className="text-hero-green-400">12,847 Planet Heroes</strong> in media-ready sustainability campaign.
          </p>

          {/* Simplified Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/leaderboard" className="inline-block">
              <Button size="lg" className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8 py-3 text-lg shadow-xl transform hover:scale-105 transition-all">
                <Trophy className="w-5 h-5 mr-2" />
                Join Campaign FREE
              </Button>
            </Link>
            
            <button
              onClick={() => {
                const mediaKit = `https://deliwer.com/media-kit?story=iphone-water-trade`;
                const shareText = `📰 BREAKING: World's first iPhone-to-Water trade platform launches at GITEX 2025! DeliWer disrupts Etisalat/Du with cross-category trading. Media kit: ${mediaKit}`;
                
                if (navigator.share) {
                  navigator.share({ title: 'DeliWer Media Story', text: shareText, url: mediaKit });
                } else {
                  navigator.clipboard.writeText(shareText);
                }
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition-all rounded-lg"
              data-testid="button-media-kit"
            >
              <Users className="w-5 h-5 mr-2 inline" />
              Download Media Kit
            </button>
          </div>
        </div>

        {/* Cross-Category Advantage + Apple Event Integration */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Cross-Category Trade Leaders */}
          <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm">
            <div className="text-center mb-4">
              <Building className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">TELCO DISRUPTION</h3>
              <p className="text-gray-300 text-xs">Beyond Etisalat/Du limitations</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">vs Telcos</span>
                <span className="text-amber-400 font-bold">+Water Systems</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Global First</span>
                <span className="text-amber-400 font-bold">Cross-Category</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Media Story</span>
                <span className="text-amber-400 font-bold">iPhone→Water</span>
              </div>
            </div>
          </div>

          {/* Apple Event Countdown */}
          <div className="glass rounded-2xl p-6 border border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400 mr-2" />
              Apple Event
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-center mb-3">
              <div>
                <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-2">
                  <div className="text-xl font-black text-white">{timeLeft.days}</div>
                  <div className="text-xs text-gray-300">Days</div>
                </div>
              </div>
              <div>
                <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-2">
                  <div className="text-xl font-black text-white">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-300">Hours</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">Sep 9, 6PM Dubai</p>
          </div>

          {/* FREE Community Growth */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Gift className="w-5 h-5 text-hero-green-500 mr-2" />
              FREE Growth
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-white">Join Campaign</span>
                </div>
                <span className="font-bold text-blue-500">+25</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-white">Share Story</span>
                </div>
                <span className="font-bold text-purple-500">+50</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-amber-500 mr-2" />
                  <span className="text-white">Media Kit</span>
                </div>
                <span className="font-bold text-amber-500">+75</span>
              </div>
            </div>
          </div>

          {/* GITEX + Launch Benefits */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/30 bg-gradient-to-br from-hero-green-500/10 to-teal-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-hero-green-400 mr-2" />
              GITEX Launch
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-hero-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-white">iPhone 17 Priority</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Gift className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">AED 2,500 Bonus</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Crown className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">Media Coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community GTM Strategy */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Media Campaign Integration */}
          <div className="glass rounded-2xl p-6 border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="w-6 h-6 text-purple-400 mr-3" />
              Media Campaign & GTM Strategy
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <p className="text-white text-sm font-medium">Apple Event Limelight (Sep 9)</p>
                  <p className="text-gray-400 text-xs">Leverage global iPhone 17 launch attention</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-hero-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                <div>
                  <p className="text-white text-sm font-medium">GITEX 2025 Launch Campaign</p>
                  <p className="text-gray-400 text-xs">Cross-category disruption story at tech summit</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <p className="text-white text-sm font-medium">Community Viral Growth</p>
                  <p className="text-gray-400 text-xs">12,847 heroes sharing iPhone→Water story</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Traction & Benefits */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-blue-500/10">
            <h3 className="text-xl font-bold text-white mb-4">Ready for Launch Campaign?</h3>
            <div className="mb-4">
              <div className="text-sm text-gray-300 mb-2">Current campaign traction:</div>
              <div className="text-3xl font-bold text-hero-green-400">#12,847</div>
              <div className="text-xs text-gray-400">active community members</div>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">Join campaign • Collect media points • Get iPhone 17 priority</p>
            
            <Link href="/" className="block mb-3">
              <Button className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold py-3 shadow-lg transform hover:scale-105 transition-all">
                Start Trading Campaign
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <p className="text-xs text-gray-500 text-center">
              Cross-category advantage • Media-ready story • Free to join
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            🚀 iPhone 17 launch limelight • 🤝 Beyond telco limitations • 📈 GITEX 2025 media campaign • 🌍 Viral sustainability story
          </p>
        </div>
      </div>
    </section>
  );
}

export function HeroChallengeLanding() {
  const { data: stats } = useImpactStats();
  const { isRegistered } = useImageServiceWorker();
  
  return (
    <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
      {/* iPhone Water Circular Exchange Background */}
      <div className="absolute inset-0">
        {/* Main Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/attached_assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        
        {/* Overlay pattern with original colors */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-hero-green-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-amber-500/10 rounded-full blur-lg animate-bounce-slow"></div>
        
        {/* Subtle brand accent gradients without dark overlay */}
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-hero-green-900/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-dubai-blue-900/10 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Simplified Header Text */}
        <div className="text-center mb-8" data-testid="challenge-header">
          {/* Simplified Badge */}
          <div className="inline-flex items-center bg-hero-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-hero-green-500/50">
            <span className="text-hero-green-300 font-bold text-sm tracking-wide">🔄 WORLD'S FIRST SUSTAINABILITY GAME</span>
          </div>
          
          {/* Powerful, Direct Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto" data-testid="hero-challenge-title">
            <span className="block text-white drop-shadow-lg font-extrabold">From iPhones to Water,</span>
            <span className="block from-hero-green-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg font-bold bg-[#3787eb] text-[50px]">a Circular Exchange</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Dubai's revolutionary platform turning electronics into life essentials. Beyond Etisalat & Du.
          </p>
        </div>

        {/* Hero Image with Overlaid Benefits */}
        <div className="text-center mb-12">
          <div className="relative max-w-6xl mx-auto">
            {/* Hero Image Background */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-hero-green-500/50 shadow-2xl">
              <img
                src="/iPhone_water_circular_exchange_e4541c3c.png"
                alt="iPhone Water Circular Exchange - Transform your iPhone into premium water systems"
                className="w-full h-auto"
                style={{ minHeight: '500px', maxHeight: '700px', objectFit: 'cover' }}
                loading="eager"
                data-testid="hero-main-image"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.currentTarget.src = '/attached_assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png';
                }}
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/50 to-slate-900/80"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                
                {/* Key Stats */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                  <HeroSpotCounter />
                  <CountdownTimer />
                </div>
                
                
                
                {/* Clear Main CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-10 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                    onClick={() => {
                      const meetDeliSection = document.querySelector('[data-section="meet-deli"]');
                      if (meetDeliSection) {
                        meetDeliSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Focus on the input after scrolling
                        setTimeout(() => {
                          const input = meetDeliSection.querySelector('input, textarea, select');
                          if (input) {
                            (input as HTMLElement).focus();
                          }
                        }, 500);
                      }
                    }}
                    data-testid="button-get-trade-value"
                  >
                    <Smartphone className="mr-3 w-6 h-6" />
                    Get My Trade Value
                  </Button>
                  <Link href="/leaderboard">
                    <Button 
                      size="lg"
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-xl font-bold transition-all rounded-full backdrop-blur-sm bg-slate-900/20"
                    >
                      <Trophy className="mr-3 w-6 h-6" />
                      Join Heroes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Deli - Interactive Trade Assistant */}
        <div className="mb-16">
          <MeetDeliInteractive />
        </div>

        {/* Comprehensive Campaign Section */}
        <ComprehensiveCampaignSection />


        {/* How to Participate - Planet Heroes Rewards */}
        <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10 mb-12" data-testid="how-to-participate-section">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">HOW TO PARTICIPATE</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Join {stats?.activeHeroes?.toLocaleString() || '12,847'} sustainability leaders making real environmental impact across Dubai
            </p>
          </div>

          {/* Three-Step Process */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Exchange</h3>
              <p className="text-gray-300 mb-4">Trade your old iPhone for instant Planet Points and exclusive rewards</p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Get Started</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Collect</h3>
              <p className="text-gray-300 mb-4">Earn Planet Points through eco-missions and sustainability actions</p>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Keep Growing</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Redeem</h3>
              <p className="text-gray-300 mb-4">Use points for exclusive products and partner ecosystem rewards</p>
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Unlock Rewards</span>
              </div>
            </div>
          </div>
          
          {/* Prominent Neon-Style CTA for Starter Kit */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 p-8 border-2 border-cyan-400/50 shadow-2xl mb-8">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-xl animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center bg-cyan-500/30 border border-cyan-400/50 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-cyan-300 mr-2 animate-pulse" />
                <span className="text-cyan-200 font-bold text-sm tracking-wide">LIMITED TIME - STARTER KIT</span>
                <Sparkles className="w-5 h-5 text-cyan-300 ml-2 animate-pulse" />
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  AED 1,000+ VALUE
                </span>
              </h3>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Planet Hero Starter Kit with FREE AquaCafe Shower Filter + Exclusive Partner Benefits
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    window.open('/aquacafe?starter=true&ref=NEON', '_blank');
                  }}
                  className="relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-black px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  data-testid="button-neon-starter-kit"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Gift className="w-8 h-8 mr-3" />
                    SHOP AQUACAFE NOW
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    const shareText = `🔥 Get the Planet Hero AED1000+ Starter Kit! FREE AquaCafe Shower Filter + Partner Benefits! Limited time: https://deliwer.com/aquacafe?starter=true`;
                    if (navigator.share) {
                      navigator.share({ title: 'Planet Hero Starter Kit', text: shareText });
                    } else {
                      navigator.clipboard.writeText(shareText);
                    }
                  }}
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold px-8 py-6 text-xl rounded-full backdrop-blur-sm transition-all"
                  data-testid="button-share-starter-kit"
                >
                  <Users className="w-6 h-6 mr-2 inline" />
                  Share Deal
                </button>
              </div>
              
              <div className="mt-6 text-cyan-300 text-sm">
                🎁 Includes: AED 399 Shower Filter + Premium Demo + Partner Vouchers
              </div>
            </div>
          </div>

          {/* Founding Hero Benefits */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="flex items-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <Zap className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Lifetime Double Points</h3>
                <p className="text-gray-400 text-xs">All future trades earn 2x points forever</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-hero-green-500/10 rounded-lg border border-hero-green-500/30">
              <Star className="w-6 h-6 text-hero-green-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Priority Access</h3>
                <p className="text-gray-400 text-xs">First access to limited edition rewards</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-dubai-blue-500/10 rounded-lg border border-dubai-blue-500/30">
              <Trophy className="w-6 h-6 text-dubai-blue-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Exclusive Founding Badge</h3>
                <p className="text-gray-400 text-xs">Permanent status on all profiles</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-900/30 border border-emerald-500/50 rounded-full px-6 py-3 mb-4">
              <Crown className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-emerald-400 font-bold">Join Dubai's Environmental Leaders Today</span>
            </div>
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-400 font-bold text-sm">Founding Hero Program Expires in 6 days</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            🔒 Secure • ⚡ Instant • 🌍 Environmental Impact Guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}


