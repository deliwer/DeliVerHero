import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  QrCode, Share2, Sparkles, Trophy, Gift, CheckCircle, 
  Smartphone, ChefHat, Navigation, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SocialSharingWidget } from "@/components/social-sharing-widget";

interface DubaiWellnessJourneyProps {
  variant?: 'home' | 'aquacafe';
  showMembershipCTA?: boolean;
  onMembershipSignup?: () => void;
}

export function DubaiWellnessJourneyPassport({ 
  variant = 'aquacafe', 
  showMembershipCTA = true,
  onMembershipSignup 
}: DubaiWellnessJourneyProps) {
  const [wellnessPassportActive, setWellnessPassportActive] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wellness-phone') || '';
    }
    return '';
  });
  const [currentPassport, setCurrentPassport] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wellness-passport');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // Auto-hydrate on mount if we have stored data
  useEffect(() => {
    if (currentPassport) {
      setWellnessPassportActive(true);
      setJourneyStep(currentPassport.currentStep || 0);
      if (currentPassport.id && phoneNumber) {
        generateQRCode(currentPassport.id, phoneNumber);
      }
    }
  }, []);

  // Query existing passport by phone on mount
  const existingPassportQuery = useQuery({
    queryKey: ['/api/wellness-passports/by-phone', phoneNumber],
    queryFn: async () => {
      if (!phoneNumber) return null;
      return apiRequest('/api/wellness-passports/by-phone', 'POST', { phone: phoneNumber });
    },
    enabled: !!phoneNumber,
    retry: false,
  });

  // Handle existing passport data from API
  useEffect(() => {
    if (existingPassportQuery.data) {
      const passport = existingPassportQuery.data as any;
      setCurrentPassport(passport);
      setWellnessPassportActive(true);
      setJourneyStep(passport.currentStep || 1);
      localStorage.setItem('wellness-passport', JSON.stringify(passport));
      if (passport.id) {
        generateQRCode(passport.id, phoneNumber);
      }
    }
  }, [existingPassportQuery.data, phoneNumber]);

  // Create wellness passport mutation
  const createPassportMutation = useMutation({
    mutationFn: async (phone: string) => {
      return apiRequest('/api/wellness-passports', 'POST', { phone });
    },
    onSuccess: (passport: any) => {
      setCurrentPassport(passport);
      setWellnessPassportActive(true);
      setJourneyStep(passport.currentStep || 1);
      localStorage.setItem('wellness-phone', phoneNumber);
      localStorage.setItem('wellness-passport', JSON.stringify(passport));
      generateQRCode(passport.id, phoneNumber);
      toast({
        title: "🎉 Wellness Passport Activated!",
        description: "Your passport is ready! Share on social media to complete activation.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Activation Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    }
  });

  // Generate QR code mutation  
  const generateQRMutation = useMutation({
    mutationFn: async ({ passportId, phone }: { passportId: string, phone: string }) => {
      return apiRequest(`/api/wellness-passports/${passportId}/qr`, 'POST', { phone });
    },
    onSuccess: (qrData: any) => {
      setQrCodeUrl(qrData.qrCode);
    },
    onError: (error: any) => {
      console.error('QR generation failed:', error);
    }
  });

  // Record social share mutation
  const recordShareMutation = useMutation({
    mutationFn: async (passportId: string) => {
      return apiRequest(`/api/wellness-passports/${passportId}/share`, 'POST', {});
    },
    onSuccess: (updatedPassport: any) => {
      setCurrentPassport(updatedPassport);
      setJourneyStep(updatedPassport.currentStep || 2);
      localStorage.setItem('wellness-passport', JSON.stringify(updatedPassport));
      toast({
        title: "Social Share Recorded!",
        description: `You've earned ${updatedPassport.pointsEarned || 50} points! Next: visit Baker's Kitchen.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Share Recording Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    }
  });

  const generateQRCode = (passportId: string, phone: string) => {
    generateQRMutation.mutate({ passportId, phone });
  };

  const handleActivateWellnessPassport = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number to receive your Wellness Passport QR code",
        variant: "destructive"
      });
      return;
    }
    createPassportMutation.mutate(phoneNumber);
  };

  const generateShareableContent = () => {
    const referralCode = `WELLNESS${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    return {
      type: 'achievement' as const,
      title: 'AquaCafe Wellness Passport Activated',
      description: `Just activated my Wellness Passport for free Kangen Water + healthy meal at Baker's Kitchen!`,
      value: 150,
      url: `https://deliwer.com/aquacafe?ref=${referralCode}&passport=active`
    };
  };

  const wellnessJourneySteps = [
    {
      id: 1,
      title: "Activate Wellness Passport",
      description: "Enter phone number and share on social media",
      icon: Smartphone,
      location: "Online",
      points: 50,
      completed: journeyStep >= 1
    },
    {
      id: 2,
      title: "Visit Baker's Kitchen",
      description: "Show QR code for free Kangen Water tasting + set menu",
      icon: ChefHat,
      location: "Mazaya Center",
      points: 100,
      completed: journeyStep >= 2
    },
    {
      id: 3,
      title: "Wellness Walk & Shop",
      description: "Healthy stroll through Mazaya Center with exclusive discounts",
      icon: Navigation,
      location: "Mazaya Center",
      points: 75,
      completed: journeyStep >= 3
    },
    {
      id: 4,
      title: "Join AquaCafe Loyalty",
      description: "Complete journey by becoming AquaCafe member",
      icon: Trophy,
      location: "Online",
      points: 200,
      completed: journeyStep >= 4
    }
  ];

  const containerClass = variant === 'home' 
    ? "w-full py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden"
    : "w-full py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden";

  return (
    <section className={containerClass}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-amber-500/5"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl animate-pulse">
            <QrCode className="w-6 h-6 mr-3" />
            🎁 FREE Wellness Passport Experience 🎁
            <QrCode className="w-6 h-6 ml-3" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-6">
            Your Gateway to Dubai's First Wellness Journey
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Experience the perfect blend of healthy dining and sustainable living. Share your wellness moment and unlock exclusive benefits!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Wellness Passport Activation */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Sparkles className="w-8 h-8" />
                  Activate Your FREE Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-100 to-amber-100 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Gift className="w-6 h-6 text-purple-600" />
                      What You Get FREE:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold">Kangen Water Tasting (worth AED 25)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold">Healthy Set Menu (worth AED 89)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold">Wellness Walk Guide (worth AED 35)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold">Mazaya Center Discounts (up to 20% off)</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white text-center font-bold">
                      Total Value: AED 149+ • Your Cost: FREE!
                    </div>
                  </div>

                  {!wellnessPassportActive ? (
                    <div className="space-y-4">
                      <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                          <Share2 className="w-5 h-5" />
                          Simple Activation:
                        </h4>
                        <ol className="text-sm text-amber-700 space-y-2">
                          <li>1. Enter your phone number below</li>
                          <li>2. Share your wellness moment on social media</li>
                          <li>3. Use hashtags: #WellnessWalkDubai #AquaCafeJourney</li>
                          <li>4. Show QR code at Baker's Kitchen for FREE experience!</li>
                        </ol>
                      </div>
                      
                      <div className="space-y-3">
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="text-lg p-4 border-2 border-purple-300 focus:border-purple-500"
                          data-testid="input-phone-wellness-passport"
                        />
                        <Button
                          onClick={handleActivateWellnessPassport}
                          className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                          data-testid="button-activate-wellness-passport"
                        >
                          <QrCode className="w-6 h-6 mr-3" />
                          Activate FREE Wellness Passport
                          <Sparkles className="w-6 h-6 ml-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-emerald-100 to-cyan-100 border-2 border-emerald-300 rounded-xl p-6 text-center">
                        {qrCodeUrl ? (
                          <div className="mb-4">
                            <img 
                              src={qrCodeUrl} 
                              alt="Wellness Passport QR Code" 
                              className="w-32 h-32 mx-auto mb-2 border-2 border-emerald-300 rounded-lg"
                              data-testid="img-wellness-passport-qr"
                            />
                            <p className="text-sm text-emerald-600">Scan at Baker's Kitchen</p>
                          </div>
                        ) : (
                          <QrCode className="w-20 h-20 mx-auto mb-4 text-emerald-600" />
                        )}
                        <h3 className="text-xl font-bold text-emerald-800 mb-2">Wellness Passport Activated!</h3>
                        <p className="text-emerald-700 mb-4">
                          {currentPassport ? `ID: ${currentPassport.referralCode}` : `QR code sent to ${phoneNumber}`}
                        </p>
                        <Badge className="bg-emerald-500 text-white px-4 py-2 text-sm">
                          Valid for 7 days
                        </Badge>
                      </div>
                      
                      <div className="bg-purple-100 rounded-lg p-4">
                        <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                          <Share2 className="w-5 h-5" />
                          Share to Complete Activation:
                        </h4>
                        <SocialSharingWidget 
                          content={generateShareableContent()} 
                          onShare={() => {
                            if (currentPassport?.id) {
                              recordShareMutation.mutate(currentPassport.id);
                            } else {
                              toast({
                                title: "Passport Required",
                                description: "Please activate your wellness passport first",
                                variant: "destructive"
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Membership Signup CTA Integration */}
                  {showMembershipCTA && onMembershipSignup && (
                    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-6 border-2 border-emerald-200">
                      <h4 className="text-lg font-bold text-emerald-800 mb-3 text-center">
                        {journeyStep >= 3 ? 'Complete Your Journey - Join AquaCafe Loyalty' : 'Ready to Join AquaCafe?'}
                      </h4>
                      <p className="text-emerald-700 text-sm mb-4 text-center">
                        {journeyStep >= 3 
                          ? 'You\'ve made great progress! Complete your wellness journey with AquaCafe membership.'
                          : 'Start your wellness journey and get instant access to exclusive benefits and rewards.'
                        }
                      </p>
                      <Button
                        onClick={onMembershipSignup}
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg"
                        data-testid="button-complete-journey-membership"
                      >
                        {journeyStep >= 3 ? 'Get AED 99 Starter Kit & Complete Journey' : 'Get AED 99 Starter Kit & Begin Journey'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Wellness Journey Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Wellness Journey Map</h3>
            
            <div className="space-y-4">
              {wellnessJourneySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={step.id} className={`border-2 transition-all duration-300 ${
                    step.completed 
                      ? 'border-emerald-300 bg-emerald-50 shadow-lg'
                      : journeyStep === step.id - 1
                      ? 'border-purple-300 bg-purple-50 shadow-lg animate-pulse'
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-emerald-500 text-white'
                            : journeyStep === step.id - 1
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-800">{step.title}</h4>
                            <Badge variant={step.completed ? 'default' : 'secondary'} className="bg-amber-500 text-white">
                              +{step.points} pts
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{step.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 border-2 border-amber-300 text-center">
              <Trophy className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-amber-800 mb-2">Complete Journey Bonus</h4>
              <p className="text-amber-700 text-sm mb-3">Finish all 4 steps and unlock AquaCafe Loyalty membership with exclusive partner benefits!</p>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">
                Total: 425 Wellness Points + Lifetime Benefits
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}