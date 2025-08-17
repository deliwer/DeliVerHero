import { useState, useEffect } from "react";
import { Dices, Sparkles, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ProgressCelebrationModal, sampleAchievements } from "@/components/progress-celebration-modal";
import { useProgressCelebration } from "@/hooks/use-progress-celebration";

interface SlotValue {
  icon: string;
  value: string;
  label: string;
  color: string;
}

const slotValues: SlotValue[] = [
  { icon: "🍼", value: "2400", label: "BTLS", color: "text-blue-400" },
  { icon: "💰", value: "AED", label: "1200", color: "text-amber-500" },
  { icon: "🌱", value: "1.2T", label: "CO₂", color: "text-hero-green-500" },
  { icon: "🏆", value: "LVL", label: "UP!", color: "text-purple-400" },
  { icon: "⚡", value: "2X", label: "PTS", color: "text-orange-500" },
  { icon: "🎁", value: "FREE", label: "KIT", color: "text-pink-400" }
];

interface ImpactSlotMachineProps {
  onJackpot?: () => void;
}

export function ImpactSlotMachine({ onJackpot }: ImpactSlotMachineProps) {
  const [spinning, setSpinning] = useState(false);
  const [currentValues, setCurrentValues] = useState([0, 1, 2, 3]);
  const [isJackpot, setIsJackpot] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  
  const { 
    isModalOpen, 
    celebrationData, 
    hideCelebration, 
    triggerTradeSuccessCelebration,
    triggerMilestoneCelebration 
  } = useProgressCelebration();

  const spin = () => {
    if (spinning) return;
    
    setSpinning(true);
    setIsJackpot(false);
    
    // Generate random final values
    const finalValues = [
      Math.floor(Math.random() * slotValues.length),
      Math.floor(Math.random() * slotValues.length),
      Math.floor(Math.random() * slotValues.length),
      Math.floor(Math.random() * slotValues.length)
    ];
    
    // Check for jackpot (all same or special combinations)
    const isJackpotSpin = finalValues.every(val => val === finalValues[0]) || 
                          (spinCount + 1) % 5 === 0; // Every 5th spin is special
    
    // Animate spinning effect
    let spinCounter = 0;
    const maxSpins = 20 + Math.floor(Math.random() * 10);
    
    const spinInterval = setInterval(() => {
      setCurrentValues([
        Math.floor(Math.random() * slotValues.length),
        Math.floor(Math.random() * slotValues.length),
        Math.floor(Math.random() * slotValues.length),
        Math.floor(Math.random() * slotValues.length)
      ]);
      
      spinCounter++;
      
      if (spinCounter >= maxSpins) {
        clearInterval(spinInterval);
        setCurrentValues(finalValues);
        setSpinning(false);
        
        if (isJackpotSpin) {
          setIsJackpot(true);
          onJackpot?.();
          
          // Trigger celebration modal for jackpot
          setTimeout(() => {
            triggerMilestoneCelebration("Environmental Impact Jackpot", 75);
          }, 1000);
        } else {
          // Trigger smaller celebration for regular spins
          setTimeout(() => {
            triggerTradeSuccessCelebration(1200, "iPhone 13 Pro");
          }, 500);
        }
        
        setSpinCount(prev => prev + 1);
      }
    }, 100);
  };

  return (
    <section className="py-12 px-4 bg-slate-900/95" data-testid="impact-slot-machine">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Interactive Impact Randomizer
          </h2>
          <p className="text-gray-400 text-lg">
            Spin to discover the environmental potential of your trades
          </p>
        </div>

        <Card className="glass border-slate-600">
          <CardContent className="p-8">
            {/* Current Impact Display */}
            <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-emerald-500/30" data-testid="impact-display">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {currentValues.slice(0, 3).map((valueIndex, slotIndex) => {
                  const slotValue = slotValues[valueIndex];
                  return (
                    <div 
                      key={slotIndex} 
                      className={`bg-slate-900 rounded-lg p-6 text-center border ${
                        spinning ? 'border-emerald-500 animate-pulse' : 'border-slate-600'
                      }`}
                      data-testid={`impact-${slotIndex}`}
                    >
                      <div className="text-3xl mb-2">{slotValue.icon}</div>
                      <div className={`text-xl font-bold ${slotValue.color} mb-1`}>
                        {slotValue.value}
                      </div>
                      <div className="text-sm text-gray-400">{slotValue.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-blue-600/20 rounded-xl p-6 border border-emerald-500/30">
                <div className="text-center mb-4">
                  <h3 className="text-white font-bold text-lg">Interactive Impact Simulation</h3>
                  <p className="text-gray-400 text-sm">Experience the randomized environmental benefits of your trades</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <Link href="/aquacafe" className="block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105" data-testid="button-boost-progress">
                      <Gift className="mr-2 w-5 h-5" />
                      Boost Your Impact
                    </Button>
                  </Link>
                  
                  <Button 
                    onClick={spin}
                    disabled={spinning}
                    variant="outline"
                    className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-bold py-3 rounded-lg transition-all"
                    data-testid="button-calculate"
                  >
                    {spinning ? (
                      <>
                        <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Dices className="mr-2 w-5 h-5" />
                        Calculate New Impact
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {isJackpot && (
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-bold text-center mb-4 animate-pulse">
                <span className="text-xl">🌟 MAXIMUM IMPACT ACHIEVED! 🌟</span>
                <div className="text-sm mt-1">Your trade contributes significantly to Dubai's 2030 goals</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Celebration Modal */}
      {celebrationData && (
        <ProgressCelebrationModal
          isOpen={isModalOpen}
          onClose={hideCelebration}
          achievements={celebrationData.achievements}
          progressChange={celebrationData.progressChange}
          impactStats={celebrationData.impactStats}
        />
      )}
    </section>
  );
}