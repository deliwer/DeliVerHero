import { useState } from "react";
import { Smartphone, ArrowRight, Rocket, Calculator, Leaf, ShoppingCart, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEVICE_OPTIONS, CONDITION_OPTIONS, type TradeCalculation } from "@/types/hero";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

interface DeviceSimulatorProps {
  onCalculation?: (result: TradeCalculation) => void;
}

export function DeviceSimulator({ onCalculation }: DeviceSimulatorProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>("iPhone 13 Pro");
  const [selectedCondition, setSelectedCondition] = useState<string>("excellent");
  const [result, setResult] = useState<TradeCalculation | null>(null);

  const calculationMutation = useMutation({
    mutationFn: async ({ phoneModel, condition }: { phoneModel: string; condition: string }) => {
      const response = await apiRequest("POST", "/api/calculate-trade-value", {
        phoneModel,
        condition,
      });
      return await response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      onCalculation?.(data);
    },
  });

  const handleCalculate = () => {
    calculationMutation.mutate({
      phoneModel: selectedDevice,
      condition: selectedCondition,
    });
  };

  return (
    <div className="glass rounded-2xl p-8 border border-slate-600" data-testid="device-simulator">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-hero-green-500 mr-2" />
          YOUR DEVICE → PLANET IMPACT CALCULATOR
        </h2>
        <p className="text-gray-300 text-center">Select your device and get real-time trade valuation with environmental impact</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Device Selection Side */}
        <div>
          <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
            {/* Device Selection */}
            <div className="text-center" data-testid="device-selection">
              <div className="bg-slate-700 rounded-xl p-4 mb-4 hover:bg-slate-600 transition-colors">
                <Smartphone className="w-10 h-10 text-white mx-auto mb-3" />
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger className="bg-slate-600 text-white border-slate-500" data-testid="select-device">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICE_OPTIONS.map((device) => (
                      <SelectItem key={device.model} value={device.model}>
                        {device.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-3">
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="bg-slate-600 text-white border-slate-500" data-testid="select-condition">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITION_OPTIONS.map((condition) => (
                        <SelectItem key={condition.condition} value={condition.condition}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Your Device</p>
            </div>

            {/* Arrow & Action */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-hero-green-500 animate-pulse" />
              </div>
              <Button
                onClick={handleCalculate}
                disabled={calculationMutation.isPending}
                className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                data-testid="button-calculate"
              >
                {calculationMutation.isPending ? "CALCULATING..." : (
                  <>CALCULATE <Rocket className="ml-1 w-4 h-4" /></>
                )}
              </Button>
            </div>

            {/* Quick Impact Display */}
            <div className="bg-gradient-to-br from-hero-green-500 to-hero-green-600 rounded-xl p-4 text-white text-center" data-testid="impact-display">
              {result ? (
                <>
                  <div className="text-xs font-medium mb-1">+{result.points} Points</div>
                  <div className="text-sm font-bold mb-1">+AED {result.tradeValue}</div>
                  <div className="text-xs">+{Math.floor(result.bottlesPrevented / 200)} Months Protection</div>
                </>
              ) : (
                <>
                  <div className="text-xs font-medium mb-1">+2,400 Points</div>
                  <div className="text-sm font-bold mb-1">+AED 1,200</div>
                  <div className="text-xs">+18 Months Protection</div>
                </>
              )}
            </div>
          </div>

          {/* Power-up Banner */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 text-center">
            <p className="text-white font-bold text-sm" data-testid="text-powerup">
              🔥 POWER-UP: Order now = DOUBLE POINTS!
            </p>
          </div>
        </div>

        {/* Detailed Calculation Results */}
        <div>
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm rounded-2xl p-6 border border-hero-green-500/30 shadow-xl">
            <div className="space-y-4">
              {/* Device Info Display */}
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mr-4">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{selectedDevice}</div>
                    <div className="text-gray-400 text-sm">{CONDITION_OPTIONS.find(c => c.condition === selectedCondition)?.label || "Excellent Condition"}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-hero-green-500">AED {result?.tradeValue || 1200}</div>
                  <div className="text-gray-400 text-sm">Trade Value</div>
                </div>
              </div>

              {/* Impact Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <div className="text-xl font-bold text-amber-500">+{result?.points || 2400}</div>
                  <div className="text-gray-300 text-sm">Planet Points</div>
                </div>
                <div className="text-center p-4 bg-hero-green-500/10 rounded-xl border border-hero-green-500/30">
                  <div className="text-xl font-bold text-hero-green-500">{result ? Math.floor(result.bottlesPrevented / 200) : 18} Months</div>
                  <div className="text-gray-300 text-sm">Water Protection</div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Leaf className="w-5 h-5 text-emerald-500 mr-2" />
                    <span className="text-white font-medium">Environmental Impact</span>
                  </div>
                  <div className="text-emerald-500 font-bold">-{result ? (result.co2Saved || 2.4) : 2.4} kg CO₂</div>
                </div>
                <div className="mt-2 text-gray-300 text-sm">
                  Equal to removing {result?.bottlesPrevented || 520} plastic bottles from waste
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Journey Options */}
      <div className="space-y-3">
        <Link href="/aquacafe" className="block w-full">
          <Button className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white py-3 font-bold rounded-xl">
            <ShoppingCart className="mr-2 w-5 h-5" />
            TRADE & SHOP AQUACAFE PRODUCTS
          </Button>
        </Link>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/aquacafe" className="block">
            <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-2.5 rounded-lg font-medium">
              <Star className="mr-2 w-4 h-4" />
              Buy Starter Kit Only
            </Button>
          </Link>
          
          <Link href="/leaderboard" className="block">
            <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2.5 rounded-lg font-medium">
              <Trophy className="mr-2 w-4 h-4" />
              Join Heroes & Collect Points
            </Button>
          </Link>
        </div>
        
        <div className="text-center pt-2">
          <p className="text-xs text-gray-400 mb-1">Choose Your Hero Journey:</p>
          <p className="text-xs text-emerald-400">✓ Trade iPhone + Buy Products • ✓ Buy Starter Kit & Share • ✓ Join Heroes & Earn Points</p>
        </div>
      </div>
    </div>
  );
}
