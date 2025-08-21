import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  Smartphone, 
  ArrowRight, 
  Clock, 
  Gamepad2, 
  Crown,
  Leaf,
  Calculator
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

interface TradeCalculationResult {
  tradeValue: number;
  points: number;
  co2Saved: number;
  bottlesPrevented: number;
}

const DEVICE_OPTIONS = [
  { model: "iPhone 15 Pro Max", baseValue: 3200 },
  { model: "iPhone 15 Pro", baseValue: 2800 },
  { model: "iPhone 15", baseValue: 2400 },
  { model: "iPhone 14 Pro Max", baseValue: 2600 },
  { model: "iPhone 14 Pro", baseValue: 2200 },
  { model: "iPhone 14", baseValue: 1800 },
  { model: "iPhone 13 Pro Max", baseValue: 2000 },
  { model: "iPhone 13 Pro", baseValue: 1700 },
  { model: "iPhone 13", baseValue: 1400 },
];

const CONDITION_OPTIONS = [
  { condition: "excellent", label: "Excellent", multiplier: 1.0 },
  { condition: "good", label: "Good", multiplier: 0.85 },
  { condition: "fair", label: "Fair", multiplier: 0.7 },
  { condition: "poor", label: "Poor", multiplier: 0.5 },
];

interface MeetDeliInteractiveProps {
  onInputFocus?: () => void;
}

function MeetDeliInteractive({ onInputFocus }: MeetDeliInteractiveProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("excellent");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
  const [calculationResult, setCalculationResult] = useState<TradeCalculationResult | null>(null);

  const calculationMutation = useMutation({
    mutationFn: async () => {
      const device = DEVICE_OPTIONS.find(d => d.model === selectedDevice);
      const condition = CONDITION_OPTIONS.find(c => c.condition === selectedCondition);
      
      if (!device || !condition) {
        throw new Error('Invalid device or condition selected');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tradeValue = Math.round(device.baseValue * condition.multiplier);
      const points = Math.round(tradeValue * 0.9);
      const co2Saved = Number((tradeValue * 0.0008).toFixed(1));
      const bottlesPrevented = Math.round(tradeValue * 0.17);

      return {
        tradeValue,
        points,
        co2Saved,
        bottlesPrevented
      };
    },
    onSuccess: (result) => {
      setCalculationResult(result);
      setCalculatedValue(result.tradeValue);
      setCalculatedPoints(result.points);
      setActiveStep(2);
    }
  });

  const handleCalculate = () => {
    if (!selectedDevice) return;
    calculationMutation.mutate();
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    }}>
      <div className="max-w-6xl mx-auto">
        {/* Step 1: Get Trade-in Offer */}
        <div className="text-center mb-12" id="step-1">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-purple-200 font-bold text-sm tracking-wide">STEP 1: EXCHANGE (ACTIVE)</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get Trade-in Offer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start your Planet Mission • Discover your iPhone's impact value
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-12 space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              activeStep >= 1 ? 'bg-purple-500 border-purple-500' : 'border-gray-500'
            }`}>
              <Smartphone className={`w-6 h-6 ${activeStep >= 1 ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <span className={`ml-3 font-semibold ${activeStep >= 1 ? 'text-purple-400' : 'text-gray-400'}`}>
              Exchange
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              calculatedValue ? 'text-hero-green-500' : 'text-gray-500'
            }`}>
              {calculatedValue ? <ArrowRight /> : <Clock />}
            </div>
            <span className={`ml-3 font-semibold ${calculatedValue ? 'text-hero-green-400' : 'text-gray-400'}`}>
              Collect Points
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activeStep === 3 ? 'text-purple-500' : calculatedValue ? 'text-hero-green-500' : 'text-gray-500'
            }`}>
              {calculatedValue ? <ArrowRight /> : <Clock />}
            </div>
            <span className={`font-semibold ${
              activeStep === 3 ? 'text-purple-400' : calculatedValue ? 'text-hero-green-400' : 'text-gray-400'
            }`}>
              {calculatedValue ? 'Unlock Rewards' : 'Complete Steps'}
            </span>
          </div>
        </div>

        {/* Trade Value Display */}
        {calculatedValue && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-hero-green-900/30 border border-hero-green-500/50 rounded-full px-6 py-3">
              <Trophy className="w-5 h-5 text-hero-green-400 mr-2" />
              <span className="text-hero-green-400 font-bold">Your Trade Value: AED {calculatedValue} + {calculatedPoints} Planet Points</span>
            </div>
          </div>
        )}

        {/* Device Selection Form */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3">Select Your iPhone Model</label>
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger className="bg-slate-700 text-white border-slate-500" data-testid="select-device">
                    <SelectValue placeholder="Choose iPhone Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICE_OPTIONS.map((device) => (
                      <SelectItem key={device.model} value={device.model}>
                        {device.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Device Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="bg-slate-700 text-white border-slate-500" data-testid="select-condition">
                    <SelectValue placeholder="Device Condition" />
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

              <Button
                onClick={handleCalculate}
                disabled={!selectedDevice || calculationMutation.isPending}
                className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-white py-4 text-lg font-bold transition-colors"
                data-testid="button-calculate"
              >
                {calculationMutation.isPending ? (
                  <>
                    <Calculator className="mr-2 w-5 h-5 animate-spin" />
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
        </div>

        {/* Results Display */}
        {calculationResult && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm rounded-2xl p-8 border border-hero-green-500/30 shadow-xl">
              <div className="space-y-6">
                {/* Environmental Impact */}
                <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Leaf className="w-6 h-6 text-emerald-500 mr-3" />
                      <span className="text-white font-bold text-lg">Environmental Impact</span>
                    </div>
                    <div className="text-emerald-500 font-bold text-xl">-{calculationResult.co2Saved} kg CO₂</div>
                  </div>
                  <div className="text-gray-300">
                    Equal to removing {calculationResult.bottlesPrevented} plastic bottles from waste
                  </div>
                </div>

                {/* Trade Value */}
                <div className="text-center p-6 bg-hero-green-500/10 rounded-xl border border-hero-green-500/30">
                  <div className="text-3xl font-bold text-hero-green-500 mb-2">AED {calculationResult.tradeValue}</div>
                  <div className="text-gray-300">Trade Value</div>
                </div>

                {/* Planet Points */}
                <div className="text-center p-6 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <div className="text-3xl font-bold text-amber-500 mb-2">+{calculationResult.points}</div>
                  <div className="text-gray-300">Planet Points Earned</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Neon "Enter the Game" CTA */}
        <div className="text-center mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-8 border-2 border-cyan-400/50 shadow-2xl">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  ENTER THE GAME
                </span>
              </h3>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join the Planet Points Challenge and compete for iPhone 17 • Sep 9 Launch
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('planet-points-challenge')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-black px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Gamepad2 className="w-8 h-8 mr-3" />
                    JOIN CHALLENGE
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setActiveStep(3);
                    document.getElementById('step-3')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-bold px-8 py-6 text-xl rounded-full backdrop-blur-sm transition-all"
                >
                  <Crown className="w-6 h-6 mr-2 inline" />
                  SKIP TO REDEEM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetDeliInteractive;