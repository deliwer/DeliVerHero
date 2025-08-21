import { Star, Bot, MapPin, Timer, UserPlus, Recycle, Droplets } from "lucide-react";
import heroImage from "@assets/mobile-water-purification-hero_1755786909344.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { OnboardingWalkthrough } from "./onboarding-walkthrough";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
    <section className="relative py-20 px-4 overflow-hidden min-h-screen">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        {/* Additional gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dubai-blue-900/30 to-hero-green-900/30"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col justify-center min-h-screen">
        {/* Mission Header */}
        <div className="text-center mb-16" data-testid="mission-header">
          <div className="inline-flex items-center glass-light rounded-full px-6 py-3 mb-8 border border-hero-green-500/50 backdrop-blur-md">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-white font-medium">LAUNCHING AT GITEX 2025</span>
          </div>
          
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              From iPhones to Water,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hero-green-400 to-dubai-blue-400">
                a Circular Exchange
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-hero-green-400 mb-6 font-bold">
              Saving Emissions • Reuse ↔ Reflow • Save Money & Planet
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Dubai's electronics trade hub meets water scarcity innovation. Transform your iPhone into premium water systems while reducing e-waste and supporting circular economy.
            </p>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="glass-light rounded-2xl p-6 border border-amber-500/50 backdrop-blur-md">
              <div className="text-amber-400 font-bold text-2xl mb-2">Reuse</div>
              <div className="text-white text-lg font-semibold mb-2">iPhone Refurbishment</div>
              <div className="text-gray-300 text-sm">Dubai Airport Freezone electronics expertise</div>
            </div>
            <div className="glass-light rounded-2xl p-6 border border-hero-green-500/50 backdrop-blur-md">
              <div className="text-hero-green-400 font-bold text-3xl mb-2">↔</div>
              <div className="text-white text-lg font-semibold mb-2">Circular Exchange</div>
              <div className="text-gray-300 text-sm">Sustainable value transformation</div>
            </div>
            <div className="glass-light rounded-2xl p-6 border border-dubai-blue-500/50 backdrop-blur-md">
              <div className="text-dubai-blue-400 font-bold text-2xl mb-2">Reflow</div>
              <div className="text-white text-lg font-semibold mb-2">Clean Water Systems</div>
              <div className="text-gray-300 text-sm">Advanced filtration for Dubai homes</div>
            </div>
          </div>
          
          {/* Main CTA Section */}
          <div className="text-center mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Primary CTA */}
              <Button 
                onClick={startOnboarding}
                className="h-20 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-2xl border-2 border-amber-400/50 backdrop-blur-md transform hover:scale-105 transition-all duration-300"
                disabled={createHeroMutation.isPending}
                data-testid="button-start-trade-onboarding"
              >
                <Recycle className="w-6 h-6 mr-3" />
                Trade iPhone for Water + Cash
              </Button>
              
              {/* Secondary CTA */}
              <Button 
                onClick={startOnboarding}
                className="h-20 bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-2xl border-2 border-hero-green-400/50 backdrop-blur-md transform hover:scale-105 transition-all duration-300"
                disabled={createHeroMutation.isPending}
                data-testid="button-start-rewards-onboarding"
              >
                <Droplets className="w-6 h-6 mr-3" />
                Get AquaCafe Water System
              </Button>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-lg">
                <span className="text-hero-green-400 font-bold">Circular Innovation:</span> Electronics expertise → Water sustainability solutions
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Content Section */}
        <div className="glass-light rounded-3xl p-8 mb-8 border border-amber-500/30 max-w-5xl mx-auto bg-gradient-to-r from-amber-500/5 to-orange-500/5 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-amber-500/20 border border-amber-500/50 rounded-full px-6 py-3 mb-6">
              <span className="text-amber-400 font-bold text-lg">🚀 GITEX 2025 EXCLUSIVE LAUNCH</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dubai's Circular Economy Innovation
            </h3>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Leverage Dubai Airport Freezone electronics hub + address water scarcity through sustainable tech-to-water exchange
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* iPhone Trade Value */}
            <div 
              className={`glass rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                selectedPath === 'trade' 
                  ? 'border-amber-500 bg-amber-500/10' 
                  : 'border-slate-600 hover:border-amber-500/50'
              }`}
              onClick={() => setSelectedPath('trade')}
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <Recycle className="w-5 h-5 text-amber-500 mr-2" />
                📱 iPhone → 💰 Cash + 💧 Water
              </h3>
              <p className="text-gray-300 mb-4">Dubai Airport Freezone electronics expertise meets water innovation. Sustainable refurbishment creates value for life essentials.</p>
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 mb-4">
                <div className="text-amber-400 font-bold">iPhone 15 Pro Max: Up to AED 1,500</div>
                <div className="text-amber-400 font-bold">iPhone 14 Pro: Up to AED 1,200</div>
                <div className="text-amber-400 font-bold">iPhone 13: Up to AED 900</div>
              </div>
              <div className="text-amber-500 font-semibold">⚡ Dubai's first tech-to-water circular exchange</div>
            </div>

            {/* Water System Value */}
            <div 
              className={`glass rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                selectedPath === 'rewards' 
                  ? 'border-hero-green-500 bg-hero-green-500/10' 
                  : 'border-slate-600 hover:border-hero-green-500/50'
              }`}
              onClick={() => setSelectedPath('rewards')}
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <Droplets className="w-5 h-5 text-hero-green-500 mr-2" />
                💧 AquaCafe Water Systems
              </h3>
              <p className="text-gray-300 mb-4">Address Dubai's water scarcity with advanced filtration. Transform tech trade into home health solutions.</p>
              <div className="bg-hero-green-500/20 border border-hero-green-500/30 rounded-lg p-3 mb-4">
                <div className="text-hero-green-400 font-bold">🚿 Shower Filter: AED 299 value</div>
                <div className="text-hero-green-400 font-bold">🥤 Drinking System: AED 799 value</div>
                <div className="text-hero-green-400 font-bold">🏠 Whole Home: AED 1,999 value</div>
              </div>
              <div className="text-hero-green-500 font-semibold">🏆 Solving water scarcity through tech reuse</div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-8">
            {selectedPath === 'trade' && (
              <div className="space-y-4">
                <Button 
                  onClick={startOnboarding}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-xl"
                  disabled={createHeroMutation.isPending}
                  data-testid="button-start-trade-onboarding-secondary"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  📱 Trade iPhone for Water + Cash
                </Button>
                <div className="text-center text-gray-300">
                  <span className="text-amber-400 font-bold">Circular Innovation:</span> Electronics expertise → Water sustainability solutions
                </div>
                {hasCompletedOnboarding && (
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Skip to iPhone Calculator
                    </Button>
                  </Link>
                )}
              </div>
            )}
            {selectedPath === 'rewards' && (
              <div className="space-y-4">
                <Button 
                  onClick={startOnboarding}
                  className="w-full bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-4 rounded-xl font-bold text-xl"
                  disabled={createHeroMutation.isPending}
                  data-testid="button-start-rewards-onboarding-secondary"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  💧 Get AquaCafe Water System
                </Button>
                <div className="text-center text-gray-300">
                  <span className="text-hero-green-400 font-bold">Sustainability Impact:</span> Reducing e-waste while improving water quality
                </div>
                {hasCompletedOnboarding && (
                  <Link href="/leaderboard">
                    <Button variant="outline" className="w-full">
                      View Impact Leaderboard
                    </Button>
                  </Link>
                )}
              </div>
            )}
            {!selectedPath && (
              <div className="text-center">
                <div className="text-gray-300 mb-4 font-medium">
                  Choose your iPhone trade option above to continue →
                </div>
                <Button
                  onClick={startOnboarding}
                  className="bg-gradient-to-r from-amber-500 to-hero-green-500 hover:from-amber-600 hover:to-hero-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg"
                  data-testid="button-start-general-onboarding"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Start iPhone for Water Trade
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

      {/* Onboarding Walkthrough */}
      <OnboardingWalkthrough 
        isOpen={isOnboardingOpen}
        onClose={closeOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </section>
  );
}