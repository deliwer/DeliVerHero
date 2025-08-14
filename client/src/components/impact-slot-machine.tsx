import { useState, useEffect } from "react";
import { Dices, Sparkles, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-16 px-4 bg-slate-900/95" data-testid="impact-slot-machine">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            🎰 SPIN YOUR IMPACT & SAVE DUBAI
          </h2>
          <p className="text-gray-300 text-lg">
            Interactive tools to visualize your environmental superpowers
          </p>
        </div>

        <Card className="glass border-slate-600 overflow-hidden">
          <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                <Dices className="w-6 h-6 text-amber-500 mr-2" />
                IMPACT SLOT MACHINE
              </h3>
              
              {isJackpot && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-lg mb-4 animate-pulse">
                  🎊 JACKPOT: All benefits unlocked!
                </div>
              )}
            </div>

            {/* Slot Machine Display */}
            <div className="bg-slate-800 rounded-2xl p-8 mb-8 border-2 border-amber-500/50" data-testid="slot-display">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {currentValues.map((valueIndex, slotIndex) => {
                  const slotValue = slotValues[valueIndex];
                  return (
                    <div 
                      key={slotIndex} 
                      className={`bg-slate-900 rounded-xl p-6 text-center border-2 ${
                        spinning ? 'border-amber-500 animate-pulse' : 'border-slate-600'
                      } ${isJackpot ? 'animate-bounce border-amber-500' : ''}`}
                      data-testid={`slot-${slotIndex}`}
                    >
                      <div className="text-4xl mb-2">{slotValue.icon}</div>
                      <div className={`text-2xl font-bold ${slotValue.color} mb-1`}>
                        {slotValue.value}
                      </div>
                      <div className="text-sm text-gray-400">{slotValue.label}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={spin}
                  disabled={spinning}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-8 py-3 rounded-xl font-bold text-lg transform hover:scale-105 transition-all"
                  data-testid="button-spin"
                >
                  {spinning ? (
                    <>
                      <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                      SPINNING...
                    </>
                  ) : (
                    <>
                      <Dices className="mr-2 w-5 h-5" />
                      🎰 SPIN FOR IMPACT
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Current Impact Display */}
            <div className="text-center" data-testid="current-impact">
              <p className="text-gray-300 mb-4">Your current spin shows:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentValues.map((valueIndex, index) => {
                  const slotValue = slotValues[valueIndex];
                  let impactText = "";
                  
                  switch(slotValue.label) {
                    case "BTLS":
                      impactText = `${slotValue.value} bottles prevented`;
                      break;
                    case "1200":
                      impactText = `AED ${slotValue.value} trade value`;
                      break;
                    case "CO₂":
                      impactText = `${slotValue.value} CO₂ saved`;
                      break;
                    case "UP!":
                      impactText = "Level up achieved!";
                      break;
                    case "PTS":
                      impactText = "Double points bonus";
                      break;
                    case "KIT":
                      impactText = "Free filter upgrade";
                      break;
                    default:
                      impactText = "Environmental benefit";
                  }
                  
                  return (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl mb-1">{slotValue.icon}</div>
                      <div className={`text-sm font-bold ${slotValue.color}`}>
                        {impactText}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planet Rescue Progress */}
        <Card className="glass border-slate-600 mt-8" data-testid="planet-rescue-progress">
          <CardContent className="p-8 bg-gradient-to-bl from-slate-800/85 to-slate-900/90 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-hero-green-500 mr-2" />
              🌍 PLANET RESCUE PROGRESS
            </h3>
            
            <div className="text-center mb-6">
              <div className="text-lg text-gray-300 mb-2">DUBAI 2030 ENVIRONMENTAL GOALS</div>
              <div className="text-3xl font-bold text-hero-green-500 mb-4">60% Complete</div>
              
              <div className="w-full bg-slate-700 rounded-full h-4 mb-6">
                <div className="from-hero-green-500 to-hero-green-600 h-4 rounded-full text-[#2463eb] bg-[#36d399]" style={{width: '60%'}}></div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                <span className="text-gray-300">YOUR ORDER CONTRIBUTION:</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Clean water goal</div>
                  <div className="text-lg font-bold text-blue-400">+0.003%</div>
                </div>
                
                <div className="text-center p-4 bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Carbon reduction</div>
                  <div className="text-lg font-bold text-hero-green-500">+0.002%</div>
                </div>
                
                <div className="text-center p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Plastic elimination</div>
                  <div className="text-lg font-bold text-amber-500">+0.001%</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-gradient-to-r from-hero-green-500 to-hero-green-600 hover:from-hero-green-600 hover:to-hero-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all" data-testid="button-boost-progress">
                <Gift className="mr-2 w-5 h-5" />
                🚀 BOOST PROGRESS: ORDER AQUACAFE NOW
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}