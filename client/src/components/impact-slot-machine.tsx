import { useState, useEffect } from "react";
import { Dices, Sparkles, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

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
        }
        
        setSpinCount(prev => prev + 1);
      }
    }, 100);
  };

  return (
    <section className="py-12 px-4 bg-slate-900/95" data-testid="impact-slot-machine">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            🎰 Spin for Impact
          </h2>
          <p className="text-gray-400 text-sm">
            See your environmental superpowers
          </p>
        </div>

        <Card className="glass border-slate-600">
          <CardContent className="p-6">
            {isJackpot && (
              <div className="bg-amber-500 text-black px-4 py-2 rounded-lg font-bold text-center mb-4 animate-pulse">
                🎊 JACKPOT!
              </div>
            )}

            <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-amber-500/30" data-testid="slot-display">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {currentValues.slice(0, 3).map((valueIndex, slotIndex) => {
                  const slotValue = slotValues[valueIndex];
                  return (
                    <div 
                      key={slotIndex} 
                      className={`bg-slate-900 rounded-lg p-4 text-center border ${
                        spinning ? 'border-amber-500 animate-pulse' : 'border-slate-600'
                      }`}
                      data-testid={`slot-${slotIndex}`}
                    >
                      <div className="text-2xl mb-1">{slotValue.icon}</div>
                      <div className={`text-lg font-bold ${slotValue.color}`}>
                        {slotValue.value}
                      </div>
                      <div className="text-xs text-gray-400">{slotValue.label}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={spin}
                  disabled={spinning}
                  className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-lg font-bold transform hover:scale-105 transition-all"
                  data-testid="button-spin"
                >
                  {spinning ? (
                    <>
                      <Sparkles className="mr-2 w-4 h-4 animate-spin" />
                      Spinning...
                    </>
                  ) : (
                    <>
                      <Dices className="mr-2 w-4 h-4" />
                      Spin
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simple Progress */}
        <div className="text-center mt-6">
          <div className="glass rounded-xl p-4 border border-slate-600 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Dubai 2030 Progress</span>
              <span className="text-hero-green-500 font-bold">60%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div className="bg-hero-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
          
          <Link href="/aquacafe">
            <Button className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-6 py-2 rounded-lg transition-all" data-testid="button-boost-progress">
              <Gift className="mr-2 w-4 h-4" />
              Boost Progress
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}