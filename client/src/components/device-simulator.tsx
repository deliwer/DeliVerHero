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
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          <span className="text-hero-green-500">Trade-in Your iPhone</span> with Planet Impact Calculator
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Submit your device and contribute to Dubai's environmental missions. Get instant trade value plus make real environmental impact.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Device Selection Side */}
        <div className="flex flex-col items-center">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-center mb-8 w-full max-w-lg">
            {/* Device Selection */}
            <div className="text-center" data-testid="device-selection">
              <div className="bg-slate-700 rounded-xl p-6 mb-4 hover:bg-slate-600 transition-colors">
                <Smartphone className="w-12 h-12 text-white mx-auto mb-4" />
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger className="bg-slate-600 text-white border-slate-500 mb-3" data-testid="select-device">
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
              <p className="text-gray-400">Select Your Device</p>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ArrowRight className="w-8 h-8 text-hero-green-500 animate-pulse" />
              </div>
              <Button
                onClick={handleCalculate}
                disabled={calculationMutation.isPending}
                className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                data-testid="button-calculate"
              >
                {calculationMutation.isPending ? (
                  <>
                    <Rocket className="mr-2 w-5 h-5 animate-spin" />
                    CALCULATING...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 w-5 h-5" />
                    CALCULATE IMPACT
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Mission Contribution Message */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/30 text-center mb-6">
            <p className="text-emerald-400 font-medium">
              🌍 Every trade-in contributes to Dubai's 2030 sustainability missions
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

      {/* Main CTA and Journey Options */}
      <div className="space-y-4">
        {/* Primary CTA - Trade & Shop */}
        <Link href="/aquacafe" className="block w-full">
          <Button className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white py-4 font-bold rounded-xl text-lg shadow-lg border-2 border-hero-green-400 transform hover:scale-[1.02] transition-all">
            <ShoppingCart className="mr-3 w-6 h-6" />
            TRADE & SHOP AQUACAFE PRODUCTS
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
        
        {/* Secondary Options */}
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
              Join Planet Heroes
            </Button>
          </Link>
        </div>
        
        {/* Value Proposition */}
        <div className="text-center pt-3 px-4">
          <p className="text-gray-300 text-sm mb-2">
            <span className="text-hero-green-400 font-bold">Why trade with us?</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-emerald-400">
            <span>✓ Instant AED value</span>
            <span>✓ Environmental impact</span>
            <span>✓ Premium water systems</span>
            <span>✓ Dubai mission contribution</span>
          </div>
        </div>
      </div>
    </div>
  );
}
