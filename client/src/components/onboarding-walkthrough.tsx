import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Smartphone, Droplets, Star, Gift, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface OnboardingWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (heroData: any) => void;
}

const phoneModels = [
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 15 Plus",
  "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 14 Plus",
  "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",
  "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini",
  "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11"
];

const phoneConditions = [
  { value: "excellent", label: "Excellent", multiplier: 1.0, description: "Like new, no damage" },
  { value: "good", label: "Good", multiplier: 0.85, description: "Minor wear, fully functional" },
  { value: "fair", label: "Fair", multiplier: 0.65, description: "Visible wear, works well" },
  { value: "poor", label: "Poor", multiplier: 0.45, description: "Heavy wear, basic function" }
];

const steps = [
  {
    id: "welcome",
    title: "Welcome to DeliWer!",
    subtitle: "Dubai's first sustainability game",
    icon: Star,
    content: "Welcome to Dubai's first sustainability game! Complete real-world eco-missions — like upgrading tech or purifying water at home — to earn rewards, level up, and make the planet proud."
  },
  {
    id: "profile",
    title: "Create Your Hero Profile",
    subtitle: "Tell us about yourself",
    icon: Star,
    content: "Let's set up your profile to start your environmental journey."
  },
  {
    id: "phone",
    title: "Your iPhone Details",
    subtitle: "What device are you trading?",
    icon: Smartphone,
    content: "Select your iPhone model and condition to see your mission rewards and environmental impact."
  },
  {
    id: "impact",
    title: "Environmental Impact",
    subtitle: "See your potential impact",
    icon: Droplets,
    content: "See your mission impact! Discover how completing this sustainability challenge helps prevent plastic bottles and reduces CO2 emissions."
  },
  {
    id: "pickup",
    title: "Pickup & Delivery",
    subtitle: "Schedule your trade-in",
    icon: MapPin,
    content: "Choose how you'd like to complete your sustainability mission - we'll handle the pickup and delivery!"
  },
  {
    id: "complete",
    title: "Welcome, Hero!",
    subtitle: "You're all set",
    icon: CheckCircle,
    content: "Congratulations! You've joined the DeliWer community."
  }
];

export function OnboardingWalkthrough({ isOpen, onClose, onComplete }: OnboardingWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneModel: "",
    phoneCondition: "",
    pickupAddress: "",
    tradeValue: 0,
    bottlesPrevented: 0,
    co2Saved: 0,
    points: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const calculateImpact = (phoneModel: string, condition: string) => {
    const baseValues: Record<string, number> = {
      "iPhone 15 Pro Max": 1500, "iPhone 15 Pro": 1400, "iPhone 15": 1200, "iPhone 15 Plus": 1300,
      "iPhone 14 Pro Max": 1300, "iPhone 14 Pro": 1200, "iPhone 14": 1000, "iPhone 14 Plus": 1100,
      "iPhone 13 Pro Max": 1100, "iPhone 13 Pro": 1000, "iPhone 13": 850, "iPhone 13 mini": 800,
      "iPhone 12 Pro Max": 900, "iPhone 12 Pro": 800, "iPhone 12": 700, "iPhone 12 mini": 650,
      "iPhone 11 Pro Max": 700, "iPhone 11 Pro": 600, "iPhone 11": 500
    };

    const conditionData = phoneConditions.find(c => c.value === condition);
    const baseValue = baseValues[phoneModel] || 500;
    const tradeValue = Math.floor(baseValue * (conditionData?.multiplier || 0.5));
    const bottlesPrevented = Math.floor(tradeValue / 0.5);
    const co2Saved = Math.floor(bottlesPrevented * 0.5);
    const points = 100 + Math.floor(tradeValue / 10);

    return { tradeValue, bottlesPrevented, co2Saved, points };
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
    onClose();
  };

  const updateFormData = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    
    if ((field === "phoneModel" || field === "phoneCondition") && newFormData.phoneModel && newFormData.phoneCondition) {
      const impact = calculateImpact(newFormData.phoneModel, newFormData.phoneCondition);
      Object.assign(newFormData, impact);
    }
    
    setFormData(newFormData);
  };

  const isStepValid = () => {
    switch (currentStepData.id) {
      case "welcome":
        return true;
      case "profile":
        return formData.name.trim() && formData.email.trim();
      case "phone":
        return formData.phoneModel && formData.phoneCondition;
      case "impact":
        return true;
      case "pickup":
        return formData.pickupAddress.trim();
      case "complete":
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (formData.phoneModel && formData.phoneCondition) {
      const impact = calculateImpact(formData.phoneModel, formData.phoneCondition);
      setFormData(prev => ({ ...prev, ...impact }));
    }
  }, [formData.phoneModel, formData.phoneCondition]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-2xl bg-white dark:bg-gray-900">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentStepData.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                data-testid="button-close-onboarding"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" data-testid="progress-onboarding" />
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px]"
              >
                {currentStepData.id === "welcome" && (
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <Droplets className="w-12 h-12 text-white" />
                    </motion.div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {currentStepData.content}
                    </p>
                    <div className="flex justify-center gap-4">
                      <Badge variant="secondary" className="text-sm">🌱 Eco-Friendly</Badge>
                      <Badge variant="secondary" className="text-sm">💧 Clean Water</Badge>
                      <Badge variant="secondary" className="text-sm">⭐ Hero Points</Badge>
                    </div>
                  </div>
                )}

                {currentStepData.id === "profile" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {currentStepData.content}
                    </p>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          data-testid="input-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStepData.id === "phone" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {currentStepData.content}
                    </p>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneModel">iPhone Model</Label>
                        <Select value={formData.phoneModel} onValueChange={(value) => updateFormData("phoneModel", value)}>
                          <SelectTrigger data-testid="select-phone-model">
                            <SelectValue placeholder="Select your iPhone model" />
                          </SelectTrigger>
                          <SelectContent>
                            {phoneModels.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneCondition">Phone Condition</Label>
                        <Select value={formData.phoneCondition} onValueChange={(value) => updateFormData("phoneCondition", value)}>
                          <SelectTrigger data-testid="select-phone-condition">
                            <SelectValue placeholder="Select phone condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {phoneConditions.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}>
                                <div className="flex flex-col">
                                  <span>{condition.label}</span>
                                  <span className="text-xs text-gray-500">{condition.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStepData.id === "impact" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {currentStepData.content}
                    </p>
                    {formData.tradeValue > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-lg"
                        >
                          <div className="text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: "spring" }}
                              className="text-3xl font-bold text-emerald-600 dark:text-emerald-400"
                            >
                              AED {formData.tradeValue}
                            </motion.div>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300">Trade Value</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg"
                        >
                          <div className="text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4, type: "spring" }}
                              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
                            >
                              {formData.bottlesPrevented.toLocaleString()}
                            </motion.div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Bottles Prevented</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg"
                        >
                          <div className="text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                              className="text-3xl font-bold text-amber-600 dark:text-amber-400"
                            >
                              {formData.co2Saved}g
                            </motion.div>
                            <p className="text-sm text-amber-700 dark:text-amber-300">CO₂ Saved</p>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg"
                        >
                          <div className="text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.6, type: "spring" }}
                              className="text-3xl font-bold text-purple-600 dark:text-purple-400"
                            >
                              {formData.points}
                            </motion.div>
                            <p className="text-sm text-purple-700 dark:text-purple-300">Hero Points</p>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}

                {currentStepData.id === "pickup" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {currentStepData.content}
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress">Pickup Address</Label>
                        <Input
                          id="pickupAddress"
                          placeholder="Enter your Dubai address"
                          value={formData.pickupAddress}
                          onChange={(e) => updateFormData("pickupAddress", e.target.value)}
                          data-testid="input-pickup-address"
                        />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Pickup Options</h4>
                        <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                          <li>📱 Free pickup within 24 hours</li>
                          <li>🚚 Eco-friendly delivery vehicles</li>
                          <li>📍 All Dubai zones covered</li>
                          <li>⏰ Flexible scheduling available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentStepData.id === "complete" && (
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome to the game, {formData.name}! 🎉
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        You're now ready to complete eco-missions and level up!
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">Your Hero Status:</h4>
                      <div className="flex justify-center items-center gap-4">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          ⭐ Bronze Hero
                        </Badge>
                        <Badge variant="outline" className="text-lg px-4 py-2">
                          {formData.points} Points
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
                data-testid="button-previous"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid() || isAnimating}
                  className="flex items-center gap-2"
                  data-testid="button-next"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
                  data-testid="button-complete"
                >
                  Complete Setup
                  <Gift className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}