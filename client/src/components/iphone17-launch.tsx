import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Smartphone, 
  Star, 
  Trophy, 
  Clock, 
  Zap, 
  Users, 
  Gift,
  Sparkles,
  ChevronRight,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import iPhone17ProMaxBlue from "@assets/generated_images/iPhone_17_Pro_Max_Blue_5527e769.png";
import iPhone17Pro from "@assets/generated_images/iPhone_17_Pro_Natural_102f756e.png";
import iPhone17Plus from "@assets/generated_images/iPhone_17_Plus_Black_07e48dac.png";
import iPhone17 from "@assets/generated_images/iPhone_17_White_c97e6eb6.png";

export function IPhone17Launch() {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 23,
    seconds: 45
  });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30">
      {/* Compact Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-hero-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Compact Hero Header with Immediate CTA */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-blue-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 mb-6 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-hero-green-300 mr-2" />
            <span className="text-hero-green-200 font-bold text-sm tracking-wide">FREE TO JOIN • HEROES COMMUNITY</span>
            <Sparkles className="w-4 h-4 text-hero-green-300 ml-2" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-hero-green-200 to-blue-200 bg-clip-text text-transparent">
              iPhone 17 Launch
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-200 font-bold">Start Earning Points Now</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join <strong className="text-hero-green-400">12,847 Planet Heroes</strong> collecting points for exclusive iPhone 17 preorder access. 
            <strong className="text-white"> Free to join, instant rewards!</strong>
          </p>

          {/* Immediate Action Buttons with GOAFFPRO Integration */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/#meet-deli" className="inline-block">
              <Button size="lg" className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8 py-3 text-lg shadow-xl transform hover:scale-105 transition-all">
                <Zap className="w-5 h-5 mr-2" />
                Start Trade-In Journey
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-hero-green-400 text-hero-green-200 hover:bg-hero-green-500/20 px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition-all"
              onClick={() => {
                const affiliateLink = `https://deliwer.com/community?ref=HERO${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
                const shareText = `🚀 Join 12,847 Planet Heroes collecting points for iPhone 17 preorder access! Free to join with instant rewards and Bakers Kitchen AED100 Kangen Water vouchers! ${affiliateLink}`;
                
                if (navigator.share) {
                  navigator.share({ title: 'Join Planet Heroes Community', text: shareText, url: affiliateLink });
                } else {
                  navigator.clipboard.writeText(shareText);
                  window.open('/community', '_blank');
                }
              }}
            >
              <Users className="w-5 h-5 mr-2" />
              Share & Join Heroes
            </Button>
          </div>
        </div>

        {/* iPhone 17 Models Showcase */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Meet the iPhone 17 Lineup
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "iPhone 17 Pro Max", image: iPhone17ProMaxBlue, price: "From AED 4,399", features: "6.9\" display, A19 Pro chip" },
              { name: "iPhone 17 Pro", image: iPhone17Pro, price: "From AED 3,699", features: "6.3\" display, A19 Pro chip" },
              { name: "iPhone 17 Plus", image: iPhone17Plus, price: "From AED 3,299", features: "6.7\" display, A19 chip" },
              { name: "iPhone 17", image: iPhone17, price: "From AED 2,999", features: "6.1\" display, A19 chip" }
            ].map((model, index) => (
              <Card key={index} className="glass overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-white/5 hover:scale-105 transition-transform duration-300" data-testid={`card-iphone17-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="p-6 text-center">
                  <div className="mb-4 flex items-center justify-center">
                    <img 
                      src={model.image} 
                      alt={model.name}
                      className="w-32 h-32 object-contain"
                      data-testid={`img-${model.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{model.name}</h4>
                  <p className="text-hero-green-400 font-bold text-sm mb-1">{model.price}</p>
                  <p className="text-gray-400 text-xs mb-4">{model.features}</p>
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Consolidated Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Quick Countdown */}
          <div className="glass rounded-2xl p-6 border border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400 mr-2" />
              Launch Countdown
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-3">
                  <div className="text-2xl font-black text-white">{timeLeft.days}</div>
                  <div className="text-xs text-gray-300">Days</div>
                </div>
              </div>
              <div>
                <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-3">
                  <div className="text-2xl font-black text-white">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-300">Hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Earn Points Fast */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Zap className="w-5 h-5 text-hero-green-500 mr-2" />
              Earn Points Fast
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 text-hero-green-500 mr-2" />
                  <span className="text-white">Trade iPhone</span>
                </div>
                <span className="font-bold text-hero-green-500">+150</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-white">Refer Friend</span>
                </div>
                <span className="font-bold text-blue-500">+100</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-amber-500 mr-2" />
                  <span className="text-white">Daily Mission</span>
                </div>
                <span className="font-bold text-amber-500">+50</span>
              </div>
            </div>
          </div>

          {/* Top 100 Rewards */}
          <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500 mr-2" />
              Top 100 Rewards
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-white">Priority iPhone 17 access</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Gift className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">+AED 2,500 bonus value</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">VIP Planet Hero status</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your Position & Final CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Position */}
          <div className="glass rounded-2xl p-6 border border-slate-600/50 bg-slate-800/30">
            <h3 className="text-lg font-bold text-white mb-4">Your Position: <span className="text-hero-green-400">#247</span> / 12,847</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Points to Top 100</span>
                <span className="text-white font-bold">420 points</span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-hero-green-500 to-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
              
              <p className="text-xs text-gray-500">65% to Top 100 • Join 47 heroes left!</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to Join Heroes?</h3>
            <p className="text-sm text-gray-300 mb-4">Free registration • Instant rewards • Community of champions</p>
            
            <Link href="/#meet-deli" className="block">
              <Button className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold py-3 shadow-lg transform hover:scale-105 transition-all">
                Start Your Trade-In Journey
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}