import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dices, Sparkles, Gift, Star, Clock, Ticket, Award, Zap, Target, Gamepad2, Trophy, Rocket, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProgressCelebrationModal } from "@/components/progress-celebration-modal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { TombolaPrize, HeroSpinCount } from "@shared/schema";

interface TombolaWidgetProps {
  heroId: string;
  theme?: "aquacafe" | "metaverse" | "default";
  size?: "compact" | "full";
}

interface SlotValue {
  icon: string;
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

export function TombolaWidget({ heroId, theme = "default", size = "full" }: TombolaWidgetProps) {
  const [spinning, setSpinning] = useState(false);
  const [currentPrizeIndices, setCurrentPrizeIndices] = useState([0, 1, 2]);
  const [showResults, setShowResults] = useState(false);
  const [spinResult, setSpinResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Fetch tombola prizes
  const { data: prizes = [], isLoading: prizesLoading } = useQuery({
    queryKey: ['/api/tombola/prizes'],
    enabled: !!heroId,
  });

  // Fetch spin eligibility
  const { data: canSpinData, isLoading: eligibilityLoading } = useQuery({
    queryKey: ['/api/tombola/can-spin', heroId],
    enabled: !!heroId,
  });

  // Fetch hero spin count
  const { data: spinCount } = useQuery<HeroSpinCount>({
    queryKey: ['/api/tombola/spin-count', heroId],
    enabled: !!heroId,
  });

  // Spin mutation
  const spinMutation = useMutation({
    mutationFn: async (spinType: string = "free") => {
      const response = await fetch('/api/tombola/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroId, spinType }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Spin failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSpinResult(data);
      setShowResults(true);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['/api/tombola/can-spin', heroId] });
      queryClient.invalidateQueries({ queryKey: ['/api/tombola/spin-count', heroId] });
      queryClient.invalidateQueries({ queryKey: ['/api/tombola/history', heroId] });
      queryClient.invalidateQueries({ queryKey: ['/api/coupons/issued', heroId] });
      
      // Show celebration modal for winning spins
      if (data.prize) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 2000);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Spin Failed",
        description: error.message || "Unable to spin the tombola right now",
        variant: "destructive",
      });
    },
  });

  // Convert prizes to slot values
  const slotValues: SlotValue[] = (prizes as TombolaPrize[]).map((prize: TombolaPrize) => ({
    icon: getPrizeIcon(prize.type),
    name: prize.name,
    subtitle: getPrizeSubtitle(prize),
    color: getPrizeColor(prize.type),
    bgColor: getPrizeBgColor(prize.type),
  }));

  // Add default slots if no prizes
  if (slotValues.length === 0) {
    slotValues.push(
      { icon: "🎁", name: "Prize", subtitle: "Loading...", color: "text-gray-400", bgColor: "bg-gray-600/20" },
      { icon: "🏆", name: "Reward", subtitle: "Loading...", color: "text-gray-400", bgColor: "bg-gray-600/20" },
      { icon: "⭐", name: "Bonus", subtitle: "Loading...", color: "text-gray-400", bgColor: "bg-gray-600/20" }
    );
  }

  const handleSpin = () => {
    if (!(canSpinData as any)?.canSpin) {
      toast({
        title: "Cannot Spin",
        description: (canSpinData as any)?.reason || "You cannot spin right now",
        variant: "destructive",
      });
      return;
    }

    setSpinning(true);
    setShowResults(false);
    setSpinResult(null);

    // Animate spinning effect
    let spinCounter = 0;
    const maxSpins = 25 + Math.floor(Math.random() * 15);
    
    const spinInterval = setInterval(() => {
      setCurrentPrizeIndices([
        Math.floor(Math.random() * slotValues.length),
        Math.floor(Math.random() * slotValues.length),
        Math.floor(Math.random() * slotValues.length),
      ]);
      
      spinCounter++;
      
      if (spinCounter >= maxSpins) {
        clearInterval(spinInterval);
        // Execute the actual spin API call
        spinMutation.mutate("free");
        setSpinning(false);
      }
    }, 80);
  };

  const isCompact = size === "compact";
  const isAquaCafe = theme === "aquacafe";
  const isMetaverse = theme === "metaverse";

  if (prizesLoading || eligibilityLoading) {
    return (
      <Card className={`${isMetaverse ? 'glass border-purple-500/50 bg-gradient-to-br from-purple-950/70 to-blue-950/70' : isAquaCafe ? 'glass border-cyan-500/30' : 'glass border-slate-600'}`}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className={`h-6 ${isMetaverse ? 'bg-purple-700' : 'bg-slate-700'} rounded`}></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-20 ${isMetaverse ? 'bg-purple-700' : 'bg-slate-700'} rounded`}></div>
              ))}
            </div>
            <div className={`h-10 ${isMetaverse ? 'bg-purple-700' : 'bg-slate-700'} rounded`}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`${
        isMetaverse ? 'glass border-purple-500/50 bg-gradient-to-br from-purple-950/70 to-indigo-950/70 relative overflow-hidden' :
        isAquaCafe ? 'glass border-cyan-500/30 bg-gradient-to-br from-cyan-950/50 to-blue-950/50' : 
        'glass border-slate-600'
      }`} data-testid="tombola-widget">
        {/* Metaverse Background Effects */}
        {isMetaverse && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-8 left-6 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
          </div>
        )}
        
        <CardHeader className={isCompact ? "pb-4" : "pb-6"}>
          <CardTitle className={`text-center relative z-10 ${
            isMetaverse ? 'text-purple-100' : 
            isAquaCafe ? 'text-cyan-100' : 
            'text-white'
          } ${isCompact ? 'text-lg' : 'text-2xl'}`}>
            <div className="flex items-center justify-center gap-2">
              {isMetaverse ? (
                <>
                  <Atom className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} text-purple-400 animate-spin`} />
                  🌌 Metaverse F&B Tombola 🚀
                  <Rocket className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} text-purple-400`} />
                </>
              ) : (
                <>
                  <Ticket className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} ${isAquaCafe ? 'text-cyan-400' : 'text-emerald-400'}`} />
                  AquaCafe Heroes Tombola
                  <Star className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} ${isAquaCafe ? 'text-cyan-400' : 'text-emerald-400'}`} />
                </>
              )}
            </div>
          </CardTitle>
          {!isCompact && (
            <p className={`text-center ${
              isMetaverse ? 'text-purple-200' : 
              isAquaCafe ? 'text-cyan-200' : 
              'text-gray-300'
            } text-sm`}>
              {isMetaverse ? 
                "🎮 Spin the cosmic wheel for premium restaurant rewards!" : 
                "Spin for sustainability prizes and digital rewards!"
              }
            </p>
          )}
        </CardHeader>

        <CardContent className={`${isCompact ? "p-4" : "p-6"} relative z-10`}>
          {/* Prize Display */}
          <div className={`${
            isMetaverse ? 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/40' :
            isAquaCafe ? 'bg-cyan-900/30 border-cyan-500/30' : 
            'bg-slate-800 border-slate-600'
          } rounded-xl p-4 mb-6 border ${isMetaverse ? 'shadow-lg shadow-purple-500/20' : ''}`} data-testid="prize-display">
            <div className="grid grid-cols-3 gap-3">
              {currentPrizeIndices.map((prizeIndex, slotIndex) => {
                const slotValue = slotValues[prizeIndex] || slotValues[0];
                return (
                  <div 
                    key={slotIndex} 
                    className={`${
                      isMetaverse ? 'bg-gradient-to-br from-purple-950/60 to-indigo-950/60 border-purple-500/40' :
                      isAquaCafe ? 'bg-cyan-950/50 border-cyan-500/30' : 
                      'bg-slate-900 border-slate-600'
                    } rounded-lg ${isCompact ? 'p-3' : 'p-4'} text-center border ${
                      spinning ? `${
                        isMetaverse ? 'border-purple-400 shadow-lg shadow-purple-500/30' :
                        isAquaCafe ? 'border-cyan-400' : 
                        'border-emerald-500'
                      } animate-pulse` : ''
                    } ${isMetaverse ? 'transform transition-all hover:scale-105' : ''}`}
                    data-testid={`prize-slot-${slotIndex}`}
                  >
                    <div className={`${isCompact ? 'text-xl' : 'text-3xl'} mb-2 ${spinning && isMetaverse ? 'animate-bounce' : ''}`}>{slotValue.icon}</div>
                    <div className={`${isCompact ? 'text-sm' : 'text-base'} font-bold ${slotValue.color} mb-1`}>
                      {slotValue.name}
                    </div>
                    <div className={`text-xs ${
                      isMetaverse ? 'text-purple-300' :
                      isAquaCafe ? 'text-cyan-300' : 
                      'text-gray-400'
                    }`}>{slotValue.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spin Results */}
          {showResults && spinResult && (
            <div className={`${spinResult.prize ? (
              isMetaverse ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400 shadow-lg shadow-purple-500/30' :
              isAquaCafe ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400' : 
              'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400'
            ) : (
              isMetaverse ? 'bg-purple-800/30 border-purple-600/50' :
              isAquaCafe ? 'bg-cyan-800/30 border-cyan-600/50' : 
              'bg-slate-700/50 border-slate-500'
            )} border rounded-lg p-4 mb-4 text-center`} data-testid="spin-results">
              {spinResult.prize ? (
                <div>
                  <div className={`${
                    isMetaverse ? 'text-purple-400' :
                    isAquaCafe ? 'text-cyan-400' : 
                    'text-emerald-400'
                  } font-bold text-lg mb-2`}>
                    {isMetaverse ? '🚀 Cosmic Win! 🌟' : '🎉 Congratulations! 🎉'}
                  </div>
                  <div className={`${
                    isMetaverse ? 'text-purple-100' :
                    isAquaCafe ? 'text-cyan-100' : 
                    'text-white'
                  } font-semibold`}>
                    You won: {spinResult.prize.name}
                  </div>
                  {spinResult.coupon && (
                    <div className={`${
                      isMetaverse ? 'text-purple-200' :
                      isAquaCafe ? 'text-cyan-200' : 
                      'text-gray-300'
                    } text-sm mt-1`}>
                      {isMetaverse ? '🎫 Digital voucher beamed to your wallet!' : 'Digital coupon added to your wallet!'}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`${
                  isMetaverse ? 'text-purple-200' :
                  isAquaCafe ? 'text-cyan-200' : 
                  'text-gray-300'
                }`}>
                  {isMetaverse ? 'Orbit complete! Try another spin! 🛸' : 'Try again! Every spin helps the environment 🌱'}
                </div>
              )}
            </div>
          )}

          {/* Spin Status and Button */}
          <div className="space-y-3">
            {/* Spin Counter and Progress */}
            {spinCount && (
              <div className="flex justify-between items-center text-sm">
                <span className={`${
                  isMetaverse ? 'text-purple-300' :
                  isAquaCafe ? 'text-cyan-300' : 
                  'text-gray-300'
                }`}>
                  {isMetaverse ? '🎮 Daily Spins: ' : 'Daily Spins: '}{spinCount.dailySpinsUsed}/5
                </span>
                <span className={`${
                  isMetaverse ? 'text-purple-300' :
                  isAquaCafe ? 'text-cyan-300' : 
                  'text-gray-300'
                }`}>
                  {isMetaverse ? '🏆 Total: ' : 'Total: '}{spinCount.totalSpins}
                </span>
              </div>
            )}

            {spinCount && (
              <Progress 
                value={(spinCount.dailySpinsUsed / 5) * 100} 
                className={`h-2 ${
                  isMetaverse ? 'bg-purple-900/50' :
                  isAquaCafe ? 'bg-cyan-900/50' : 
                  'bg-slate-700'
                }`}
              />
            )}

            {/* Spin Button */}
            <Button 
              onClick={handleSpin}
              disabled={spinning || spinMutation.isPending || !(canSpinData as any)?.canSpin}
              className={`w-full ${
                isMetaverse 
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 shadow-lg shadow-purple-500/30' 
                  : isAquaCafe 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
              } text-white font-bold ${isCompact ? 'py-2' : 'py-3'} rounded-lg transition-all transform hover:scale-105 ${
                isMetaverse ? 'hover:shadow-xl hover:shadow-purple-500/40' : ''
              }`}
              data-testid="button-spin"
            >
              {spinning || spinMutation.isPending ? (
                <>
                  {isMetaverse ? (
                    <Atom className={`mr-2 ${isCompact ? 'w-4 h-4' : 'w-5 h-5'} animate-spin`} />
                  ) : (
                    <Sparkles className={`mr-2 ${isCompact ? 'w-4 h-4' : 'w-5 h-5'} animate-spin`} />
                  )}
                  {isMetaverse ? 'Launching...' : 'Spinning...'}
                </>
              ) : !(canSpinData as any)?.canSpin ? (
                <>
                  <Clock className={`mr-2 ${isCompact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  {(canSpinData as any)?.reason || "Cannot Spin"}
                </>
              ) : (
                <>
                  {isMetaverse ? (
                    <Target className={`mr-2 ${isCompact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  ) : (
                    <Dices className={`mr-2 ${isCompact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  )}
                  {isMetaverse ? '🚀 Launch for F&B Rewards!' : 'Spin for Prizes!'}
                </>
              )}
            </Button>

            {/* Next spin countdown */}
            {!(canSpinData as any)?.canSpin && (canSpinData as any)?.timeUntilNextSpin && (
              <div className={`text-center text-xs ${
                isMetaverse ? 'text-purple-400' :
                isAquaCafe ? 'text-cyan-400' : 
                'text-gray-400'
              }`}>
                {isMetaverse ? '⏰ Next launch in: ' : 'Next spin in: '}{formatTimeUntilNext((canSpinData as any).timeUntilNextSpin)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Celebration Modal */}
      {isModalOpen && spinResult?.prize && (
        <ProgressCelebrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          achievements={[{
            id: 'tombola-win',
            title: 'Tombola Winner!',
            description: `You won: ${spinResult.prize.name}`,
            icon: <Award className="w-6 h-6" />,
            color: isAquaCafe ? 'text-cyan-400' : 'text-emerald-400',
            bgColor: isAquaCafe ? 'bg-cyan-500/20' : 'bg-emerald-500/20',
            points: spinResult.prize.pointsReward || 0,
            isNew: true,
          }]}
          progressChange={{
            from: 0,
            to: 100,
            category: 'Sustainability Game',
          }}
          impactStats={{
            bottlesPrevented: 0,
            co2Saved: 0,
            pointsEarned: spinResult.prize.pointsReward || 0,
          }}
        />
      )}
    </>
  );
}

// Helper functions
function getPrizeIcon(type: string): string {
  switch (type.toLowerCase()) {
    case 'restaurant_voucher': return '🍽️';
    case 'premium_dining': return '👨‍🍳';
    case 'cocktail_special': return '🍸';
    case 'dessert_deluxe': return '🍰';
    case 'chef_experience': return '⭐';
    case 'digital_coupon': return '🎫';
    case 'points': return '⚡';
    case 'physical_item': return '🎁';
    case 'experience': return '🌟';
    case 'discount': return '💰';
    case 'sustainability': return '🌱';
    default: return '🏆';
  }
}

function getPrizeSubtitle(prize: TombolaPrize): string {
  if (prize.type === 'points') return `${prize.pointsReward} pts`;
  if (prize.type === 'digital_coupon') return 'Digital';
  if (prize.type === 'discount') return 'Special offer';
  return prize.description.substring(0, 20) + '...';
}

function getPrizeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'digital_coupon': return 'text-purple-400';
    case 'points': return 'text-amber-400';
    case 'physical_item': return 'text-pink-400';
    case 'experience': return 'text-cyan-400';
    case 'discount': return 'text-green-400';
    case 'sustainability': return 'text-emerald-400';
    default: return 'text-blue-400';
  }
}

function getPrizeBgColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'digital_coupon': return 'bg-purple-500/20';
    case 'points': return 'bg-amber-500/20';
    case 'physical_item': return 'bg-pink-500/20';
    case 'experience': return 'bg-cyan-500/20';
    case 'discount': return 'bg-green-500/20';
    case 'sustainability': return 'bg-emerald-500/20';
    default: return 'bg-blue-500/20';
  }
}

function formatTimeUntilNext(timeMs: number): string {
  const hours = Math.floor(timeMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}