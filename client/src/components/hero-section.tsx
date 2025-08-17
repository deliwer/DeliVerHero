import { Star, Bot, MapPin, Timer, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { OnboardingWalkthrough } from "./onboarding-walkthrough";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/mobile-water-purification-hero_1755470561445.jpg";

export function HeroSection() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const { isOnboardingOpen, hasCompletedOnboarding, startOnboarding, completeOnboarding, closeOnboarding } = useOnboarding();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createHeroMutation = useMutation({
    mutationFn: (heroData: any) => apiRequest("/api/heroes", "POST", heroData),
    onSuccess: (hero: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/heroes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/heroes/leaderboard"] });
      toast({
        title: "Welcome to DeliWer!",
        description: `Your hero profile has been created successfully. You're now a ${hero.level}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create hero profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleOnboardingComplete = (heroData: any) => {
    const heroPayload = {
      name: heroData.name,
      email: heroData.email,
      phoneModel: heroData.phoneModel,
      phoneCondition: heroData.phoneCondition,
      tradeValue: heroData.tradeValue,
    };
    
    createHeroMutation.mutate(heroPayload);
    completeOnboarding();
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'center right',
            filter: 'brightness(0.8) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dubai-blue-900/90 via-dubai-blue-900/60 to-dubai-blue-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-hero-green-500/20 rounded-full blur-xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-500/20 rounded-full blur-xl animate-bounce-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mission Header */}
        <div className="text-center mb-12" data-testid="mission-header">
          <div className="inline-flex items-center glass-light rounded-full px-6 py-3 mb-6 border border-hero-green-500/30">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-white font-medium">DELIWER</span>
          </div>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              AquaCafe the sustainability game of Dubai — complete missions, save money, save the planet -- Become The Planet Hero
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
              The worlds first sustainability game where you complete real-world eco-missions — like upgrading tech or purifying water at home — to earn rewards, level up, and make the planet proud
            </h2>
          </div>
          
          {/* AI-First Welcome Widget */}
          <div className="glass-light rounded-2xl p-8 mb-8 border border-dubai-blue-500/30 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-dubai-blue-500 to-hero-green-500 rounded-full flex items-center justify-center mr-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 text-hero-green-500 mr-2" />
                  Welcome from Dubai
                </p>
                <p className="text-lg text-gray-300">Ready to upgrade your tech or purify water at home? Choose your first eco-mission!</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Trade-In Path */}
              <div 
                className={`glass rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                  selectedPath === 'trade' 
                    ? 'border-amber-500 bg-amber-500/10' 
                    : 'border-slate-600 hover:border-amber-500/50'
                }`}
                onClick={() => setSelectedPath('trade')}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Timer className="w-5 h-5 text-amber-500 mr-2" />
                  Tech Upgrade Mission
                </h3>
                <p className="text-gray-300 mb-4">Trade your old iPhone for premium water systems while earning rewards</p>
                <div className="text-amber-500 font-semibold">⚡ Real-world tech upgrade mission</div>
              </div>

              {/* Gamified Path */}
              <div 
                className={`glass rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                  selectedPath === 'rewards' 
                    ? 'border-hero-green-500 bg-hero-green-500/10' 
                    : 'border-slate-600 hover:border-hero-green-500/50'
                }`}
                onClick={() => setSelectedPath('rewards')}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Star className="w-5 h-5 text-hero-green-500 mr-2" />
                  Water Purification Mission
                </h3>
                <p className="text-gray-300 mb-4">Get premium water filtration systems delivered to your home</p>
                <div className="text-hero-green-500 font-semibold">🏆 Real-world water purification mission</div>
              </div>
            </div>

            {/* Dynamic CTA based on selection */}
            <div className="mt-8">
              {selectedPath === 'trade' && (
                <div className="space-y-4">
                  <Button 
                    onClick={startOnboarding}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg"
                    disabled={createHeroMutation.isPending}
                    data-testid="button-start-trade-onboarding"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    🚀 START TECH UPGRADE
                  </Button>
                  {hasCompletedOnboarding && (
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Skip to Calculator
                      </Button>
                    </Link>
                  )}
                </div>
              )}
              {selectedPath === 'rewards' && (
                <div className="space-y-4">
                  <Button 
                    onClick={startOnboarding}
                    className="w-full bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg"
                    disabled={createHeroMutation.isPending}
                    data-testid="button-start-rewards-onboarding"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    🏆 START WATER PURIFICATION
                  </Button>
                  {hasCompletedOnboarding && (
                    <Link href="/leaderboard">
                      <Button variant="outline" className="w-full">
                        View Leaderboard
                      </Button>
                    </Link>
                  )}
                </div>
              )}
              {!selectedPath && (
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    Choose your path above to continue →
                  </div>
                  <Button
                    onClick={startOnboarding}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    data-testid="button-start-general-onboarding"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Get Started with Onboarding
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Urgency Timer */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              Only 47 Founding Hero spots left today
            </div>
            <div>•</div>
            <div>23:47:31 until double points end</div>
          </div>
        </div>
      </div>

      {/* Onboarding Walkthrough */}
      <OnboardingWalkthrough 
        isOpen={isOnboardingOpen}
        onClose={closeOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </section>
  );
}
