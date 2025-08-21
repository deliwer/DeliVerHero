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

  return null;
}

export default MeetDeliInteractive;