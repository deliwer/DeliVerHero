import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Leaf, 
  Gift, 
  Sparkles,
  Target,
  Award,
  CheckCircle,
  X
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  points: number;
  isNew?: boolean;
}

interface ProgressCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  progressChange: {
    from: number;
    to: number;
    category: string;
  };
  impactStats: {
    bottlesPrevented: number;
    co2Saved: number;
    pointsEarned: number;
  };
}

export function ProgressCelebrationModal({ 
  isOpen, 
  onClose, 
  achievements, 
  progressChange,
  impactStats 
}: ProgressCelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(progressChange.from);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      
      // Animate progress bar
      const timer = setTimeout(() => {
        setAnimatedProgress(progressChange.to);
      }, 500);

      // Hide confetti after animation
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(confettiTimer);
      };
    }
  }, [isOpen, progressChange.to, progressChange.from]);

  const newAchievements = achievements.filter(achievement => achievement.isNew);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700" data-testid="celebration-modal">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles 
                  className={`w-4 h-4 ${
                    ['text-amber-500', 'text-emerald-500', 'text-blue-500', 'text-purple-500', 'text-pink-500'][Math.floor(Math.random() * 5)]
                  }`} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>

        <DialogHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <DialogTitle className="text-3xl font-bold text-white mb-2">
            Amazing Progress!
          </DialogTitle>
          <p className="text-gray-300 text-lg">
            Your environmental impact is making a real difference in Dubai
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Update */}
          <div className="bg-slate-800 rounded-xl p-6 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{progressChange.category} Progress</h3>
                <p className="text-gray-400 text-sm">Your contribution to Dubai's 2030 sustainability goals</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-500">{progressChange.to}%</div>
                <div className="text-xs text-gray-400">
                  +{progressChange.to - progressChange.from}% increase
                </div>
              </div>
            </div>
            
            <Progress 
              value={animatedProgress} 
              className="h-3 mb-4" 
              data-testid="progress-bar"
            />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-lg font-bold text-emerald-500">{impactStats.bottlesPrevented}</div>
                <div className="text-xs text-gray-400">Bottles Prevented</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-500">{impactStats.co2Saved}kg</div>
                <div className="text-xs text-gray-400">CO₂ Saved</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-lg font-bold text-amber-500">{impactStats.pointsEarned}</div>
                <div className="text-xs text-gray-400">Points Earned</div>
              </div>
            </div>
          </div>

          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6 border border-amber-500/30">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-amber-500 mr-2" />
                <h3 className="text-white font-bold text-lg">New Achievements Unlocked!</h3>
              </div>
              
              <div className="grid gap-3">
                {newAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center p-4 rounded-lg border ${achievement.bgColor} ${achievement.color.replace('text-', 'border-')}/30 animate-pulse`}
                    data-testid={`achievement-${achievement.id}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${achievement.bgColor}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-bold">{achievement.title}</h4>
                        <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 text-xs">
                          +{achievement.points} pts
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Achievements Progress */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <Star className="w-6 h-6 text-amber-500 mr-2" />
              Achievement Progress
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.slice(0, 8).map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    achievement.isNew 
                      ? `${achievement.bgColor} ${achievement.color.replace('text-', 'border-')}/50 animate-bounce` 
                      : 'bg-slate-700/30 border-slate-600'
                  }`}
                  data-testid={`badge-${achievement.id}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    achievement.isNew ? achievement.bgColor : 'bg-slate-600'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className={`text-xs font-medium ${achievement.isNew ? 'text-white' : 'text-gray-400'}`}>
                    {achievement.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3"
              data-testid="button-continue"
            >
              <Gift className="mr-2 w-5 h-5" />
              Continue Your Impact Journey
            </Button>
            <Button 
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-gray-300 hover:bg-slate-700"
              data-testid="button-share"
            >
              Share Achievement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Predefined achievements for easy use
export const sampleAchievements: Achievement[] = [
  {
    id: "first-trade",
    title: "First Trade",
    description: "Completed your first iPhone trade-in",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    color: "text-amber-500",
    bgColor: "bg-amber-500/20",
    points: 100,
    isNew: true
  },
  {
    id: "eco-warrior",
    title: "Eco Warrior",
    description: "Prevented 50+ plastic bottles from waste",
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    color: "text-emerald-500", 
    bgColor: "bg-emerald-500/20",
    points: 250,
    isNew: true
  },
  {
    id: "dubai-champion",
    title: "Dubai Champion",
    description: "Top 10% in Dubai environmental impact",
    icon: <Crown className="w-6 h-6 text-purple-500" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20", 
    points: 500
  },
  {
    id: "carbon-saver",
    title: "Carbon Saver",
    description: "Saved 5kg+ CO₂ from atmosphere",
    icon: <Target className="w-6 h-6 text-blue-500" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    points: 300
  },
  {
    id: "founding-hero",
    title: "Founding Hero",
    description: "One of the first 100 heroes",
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    color: "text-amber-500",
    bgColor: "bg-amber-500/20",
    points: 1000
  },
  {
    id: "impact-multiplier",
    title: "Impact Multiplier",
    description: "Achieved 2x points multiplier",
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    color: "text-pink-500",
    bgColor: "bg-pink-500/20",
    points: 200
  }
];