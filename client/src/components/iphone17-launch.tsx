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
    <section className="py-32 px-4 relative overflow-hidden border-y-4 border-gradient-to-r from-purple-500 via-blue-500 to-purple-500">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-slate-900/60"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent"></div>
      
      {/* Animated Border Effect */}
      <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl animate-border-glow"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-400/50 rounded-full px-8 py-4 mb-8 shadow-2xl backdrop-blur-sm animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-purple-300 mr-3 animate-spin-slow" />
            <span className="text-purple-200 font-bold text-lg tracking-wider">EXCLUSIVE LAUNCH EVENT</span>
            <Sparkles className="w-6 h-6 text-purple-300 ml-3 animate-spin-slow" />
          </div>
          
          <h2 className="text-8xl md:text-9xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl text-glow">
              iPhone 17 
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-gray-200 font-bold animate-pulse">Launch Day is Coming</span>
          </h2>
          
          <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
            Get ready for the ultimate trade-in experience. Collect planet points now and secure your spot 
            as one of the top 100 leaders to unlock exclusive preorder access.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Launch Details */}
          <div className="space-y-8">
            
            {/* Enhanced Countdown Timer */}
            <div className="glass rounded-3xl p-10 border-2 border-purple-500/50 shadow-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-md">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-400 mr-4 animate-pulse" />
                Launch Countdown
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-2 border-purple-400/50 rounded-2xl p-6 mb-3 shadow-xl animate-pulse-glow">
                      <div className="text-4xl md:text-5xl font-black text-white text-glow">{item.value.toString().padStart(2, '0')}</div>
                    </div>
                    <div className="text-base font-semibold text-gray-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Planet Points Collection */}
            <div className="glass rounded-3xl p-10 border-2 border-hero-green-500/50 shadow-2xl bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 backdrop-blur-md">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                <Zap className="w-8 h-8 text-hero-green-500 mr-4 animate-pulse" />
                Collect Planet Points Now
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center">
                    <Smartphone className="w-5 h-5 text-hero-green-500 mr-3" />
                    <span className="text-white">Trade any iPhone</span>
                  </div>
                  <span className="font-bold text-hero-green-500">+150 Points</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-white">Refer a friend</span>
                  </div>
                  <span className="font-bold text-blue-500">+100 Points</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-amber-500 mr-3" />
                    <span className="text-white">Daily challenges</span>
                  </div>
                  <span className="font-bold text-amber-500">+50 Points</span>
                </div>
              </div>
              
              <Button className="w-full mt-8 bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold text-lg py-4 shadow-xl transform hover:scale-105 transition-all animate-pulse-glow">
                Start Collecting Points
                <ChevronRight className="w-5 h-5 ml-3" />
              </Button>
            </div>
          </div>

          {/* Right Column: Top 100 Leaders Benefits */}
          <div className="space-y-8">
            
            {/* Enhanced Top 100 Benefits */}
            <div className="glass rounded-3xl p-10 border-2 border-amber-500/50 shadow-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-md relative overflow-hidden animate-pulse-glow">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500/20 to-transparent w-32 h-32 rounded-bl-3xl"></div>
              
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-500 mr-4 animate-pulse" />
                Top 100 Leaders Exclusive
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <Star className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Priority Preorder Access</h4>
                    <p className="text-gray-300 text-sm">Be among the first to secure your iPhone 17 before public release</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Gift className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Launch Day Bonuses</h4>
                    <p className="text-gray-300 text-sm">Exclusive trade-in values up to AED 2,500 higher than standard rates</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Sparkles className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">VIP Hero Status</h4>
                    <p className="text-gray-300 text-sm">Permanent Planet Hero Elite badge and lifetime benefits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Leaderboard Position */}
            <div className="glass rounded-2xl p-8 border border-slate-600">
              <h3 className="text-xl font-bold text-white mb-6">Your Launch Position</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-2">#247</div>
                <p className="text-gray-400">Current ranking out of 12,847 heroes</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Points needed for Top 100</span>
                  <span className="text-white font-bold">420 points</span>
                </div>
                
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-hero-green-500 to-blue-500 h-3 rounded-full" style={{width: '65%'}}></div>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  65% of the way to Top 100 status
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <Link href="/community">
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-800 bg-[#043059]">
                    View Full Leaderboard
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="glass rounded-3xl p-12 border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-blue-500/20 shadow-2xl animate-pulse-glow">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 text-glow">Ready to Secure Your Spot?</h3>
            <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              Join thousands of Planet Heroes racing to the top 100. Start trading iPhones, 
              earning points, and building your environmental impact today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-12 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all animate-pulse-glow">
                Trade iPhone Now
                <Smartphone className="w-6 h-6 ml-3" />
              </Button>
              
              <Link href="/community">
                <Button size="lg" variant="outline" className="border-2 border-purple-400 text-purple-200 hover:bg-purple-500/20 px-12 py-4 text-xl font-bold shadow-xl transform hover:scale-105 transition-all">
                  Join Community
                  <Users className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}