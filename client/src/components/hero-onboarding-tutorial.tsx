import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Smartphone, Calculator, Trophy, Users, Zap, Target, CheckCircle, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  highlight?: string;
  tips?: string[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to DeliWer Heroes!",
    description: "Transform your old iPhone into environmental superpowers while getting premium water filtration for your family.",
    icon: <Star className="w-8 h-8 text-amber-500" />,
    tips: [
      "Trade your iPhone for instant AED credit",
      "Earn Planet Points for every action",
      "Join 12,000+ Dubai Heroes making a difference"
    ]
  },
  {
    id: "calculator",
    title: "Check Your iPhone Value",
    description: "Our AI-powered calculator gives you instant trade-in value based on your device model and condition.",
    icon: <Calculator className="w-8 h-8 text-hero-green-500" />,
    action: "Try the calculator below",
    highlight: "device-simulator",
    tips: [
      "Select your iPhone model",
      "Choose the condition honestly",
      "Get instant AED valuation"
    ]
  },
  {
    id: "impact",
    title: "See Your Environmental Impact",
    description: "Every trade prevents plastic waste, saves CO₂, and protects Dubai's environment for future generations.",
    icon: <Leaf className="w-8 h-8 text-emerald-500" />,
    tips: [
      "Each iPhone saves 2.4kg CO₂",
      "Prevents 500+ plastic bottles",
      "Contributes to cleaner Dubai"
    ]
  },
  {
    id: "points",
    title: "Earn Planet Points",
    description: "Level up your Hero status with every action. Trade devices, refer friends, and complete challenges to climb the leaderboard.",
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    tips: [
      "+2,400 points per iPhone trade",
      "+1,000 points per referral",
      "+500 points for daily challenges"
    ]
  },
  {
    id: "aquacafe",
    title: "Choose Your AquaCafe Package",
    description: "Use your trade credit towards premium water filtration systems. Starter Kit packages start at AED 99 after discount.",
    icon: <Target className="w-8 h-8 text-dubai-blue-500" />,
    action: "Explore AquaCafe packages",
    highlight: "aquacafe-packages",
    tips: [
      "Starter Kit: AED 99",
      "Hero Premium: AED 1,499", 
      "Hero Elite: AED 2,299"
    ]
  },
  {
    id: "community",
    title: "Join the Heroes Community",
    description: "Connect with fellow Planet Heroes, share achievements, and compete on the Dubai leaderboard.",
    icon: <Users className="w-8 h-8 text-purple-500" />,
    action: "View leaderboard",
    highlight: "leaderboard",
    tips: [
      "Climb the Hero rankings",
      "Unlock exclusive badges",
      "Access VIP events and rewards"
    ]
  },
  {
    id: "complete",
    title: "You're Ready to Be a Hero!",
    description: "Start your environmental mission today. Every iPhone trade makes Dubai cleaner and earns you amazing rewards.",
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    action: "Start your first trade",
    tips: [
      "Complete your first trade for bonus points",
      "Share with friends for referral rewards",
      "Track your impact on the dashboard"
    ]
  }
];

interface HeroOnboardingTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function HeroOnboardingTutorial({ onComplete, onSkip }: HeroOnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [highlightElement, setHighlightElement] = useState<string | null>(null);

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (step.highlight) {
      setHighlightElement(step.highlight);
      // Add highlight class to the target element
      const element = document.querySelector(`[data-testid="${step.highlight}"]`);
      if (element) {
        element.classList.add('onboarding-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightElement(null);
      // Remove highlight from all elements
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
      });
    }

    return () => {
      // Cleanup highlights when component unmounts
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
      });
    };
  }, [step.highlight]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleSkip();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Tutorial Modal with Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        data-testid="tutorial-backdrop"
      >
        <Card 
          className="w-full max-w-2xl bg-gradient-to-br from-slate-800/95 to-slate-900/98 backdrop-blur-lg border-slate-600/70 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          data-testid="tutorial-modal"
        >
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-hero-green-500/20 to-dubai-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  {step.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-400 text-sm">Step {currentStep + 1} of {onboardingSteps.length}</span>
                    <Badge className="ml-3 bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30">
                      Hero Tutorial
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Tutorial Progress</span>
                <span className="text-gray-400 text-sm">{Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                {step.description}
              </p>

              {step.action && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-amber-500 mr-2" />
                    <span className="text-amber-500 font-medium">{step.action}</span>
                  </div>
                </div>
              )}

              {step.tips && (
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center">
                    <CheckCircle className="w-4 h-4 text-hero-green-500 mr-2" />
                    Key Benefits:
                  </h4>
                  <div className="grid gap-2">
                    {step.tips.map((tip, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-hero-green-500 rounded-full mr-3 flex-shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstStep}
                className="border-slate-600 text-gray-300 hover:text-white disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index <= currentStep 
                        ? 'bg-hero-green-500' 
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white"
              >
                {isLastStep ? (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    Start Hero Journey
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip Option */}
            <div className="text-center mt-6">
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Skip tutorial and explore on my own
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}