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
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-slate-900"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium">EXCLUSIVE LAUNCH EVENT</span>
            <Sparkles className="w-5 h-5 text-purple-400 ml-2" />
          </div>
          
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              iPhone 17 
            </span>
            <br />
            <span className="text-3xl text-gray-300">Launch Day is Coming</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get ready for the ultimate trade-in experience. Collect planet points now and secure your spot 
            as one of the top 100 leaders to unlock exclusive preorder access.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Launch Details */}
          <div className="space-y-8">
            
            {/* Countdown Timer */}
            <div className="glass rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 text-purple-400 mr-3" />
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
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-4 mb-2">
                      <div className="text-3xl font-bold text-white">{item.value.toString().padStart(2, '0')}</div>
                    </div>
                    <div className="text-sm text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planet Points Collection */}
            <div className="glass rounded-2xl p-8 border border-hero-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 text-hero-green-500 mr-3" />
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
              
              <Button className="w-full mt-6 bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold">
                Start Collecting Points
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column: Top 100 Leaders Benefits */}
          <div className="space-y-8">
            
            {/* Top 100 Benefits */}
            <div className="glass rounded-2xl p-8 border border-amber-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500/20 to-transparent w-32 h-32 rounded-bl-3xl"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-6 h-6 text-amber-500 mr-3" />
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

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Spot?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of Planet Heroes racing to the top 100. Start trading iPhones, 
              earning points, and building your environmental impact today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8">
                Trade iPhone Now
                <Smartphone className="w-5 h-5 ml-2" />
              </Button>
              
              <Link href="/community">
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8">
                  Join Community
                  <Users className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}