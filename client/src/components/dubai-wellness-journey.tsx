import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  MapPin, 
  Footprints, 
  Bike, 
  Building, 
  Star, 
  Gift, 
  Crown, 
  ShoppingCart, 
  Trophy, 
  Droplets,
  Heart,
  Calendar,
  Clock,
  Users,
  Ticket,
  Camera,
  Coffee,
  Utensils,
  ChevronRight,
  CheckCircle,
  Award,
  Sparkles,
  Zap,
  QrCode,
  Share2,
  Smartphone,
  ChefHat,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { SocialSharingWidget } from "@/components/social-sharing-widget";

interface DubaiWellnessJourneyProps {
  variant?: 'home' | 'aquacafe' | 'full';
  showMembershipCTA?: boolean;
  onMembershipSignup?: () => void;
}

interface WellnessJourneyStep {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  completed: boolean;
  perks: string[];
}

interface LuxuryHotel {
  id: string;
  name: string;
  location: string;
  distance: string;
  amenities: string[];
  specialOffer: string;
  icon: React.ReactNode;
}

interface AquaShowPerk {
  id: string;
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  available: boolean;
}

const luxuryHotels: LuxuryHotel[] = [
  {
    id: "hilton-habtoor",
    name: "Hilton Dubai Al Habtoor City",
    location: "Al Habtoor City",
    distance: "2 min walk to track start",
    amenities: ["Spa & Wellness", "Fitness Center", "Pool", "Concierge"],
    specialOffer: "20% off wellness packages for journey participants",
    icon: <Building className="w-6 h-6 text-blue-600" />
  },
  {
    id: "jw-marquee", 
    name: "JW Marriott Marquis",
    location: "Business Bay",
    distance: "5 min walk to track",
    amenities: ["Premium Spa", "Rooftop Pool", "Health Club", "Luxury Suites"],
    specialOffer: "Complimentary wellness consultation + AquaCafe discount",
    icon: <Crown className="w-6 h-6 text-purple-600" />
  },
  {
    id: "oberoi-dubai",
    name: "The Oberoi Dubai",
    location: "Business Bay",
    distance: "3 min walk to track",
    amenities: ["Oberoi Spa", "Fitness Center", "Fine Dining", "Butler Service"],
    specialOffer: "Exclusive wellness journey package with La Perle tickets",
    icon: <Star className="w-6 h-6 text-amber-600" />
  },
  {
    id: "address-hotels",
    name: "Address Hotels + Resorts",
    location: "Multiple locations along track",
    distance: "Track accessible from all properties",
    amenities: ["Multiple spas", "Wellness centers", "Premium dining"],
    specialOffer: "Journey passport holders get VIP access",
    icon: <Heart className="w-6 h-6 text-red-600" />
  }
];

const aquaShowPerks: AquaShowPerk[] = [
  {
    id: "vip-tickets",
    title: "La Perle VIP Experience",
    description: "Premium tickets to Dubai's aquatic masterpiece",
    value: "AED 450 value",
    icon: <Ticket className="w-6 h-6 text-blue-500" />,
    available: true
  },
  {
    id: "backstage-tour",
    title: "Exclusive Backstage Tour",
    description: "Behind-the-scenes access to the aquatic theater",
    value: "AED 200 value",
    icon: <Camera className="w-6 h-6 text-purple-500" />,
    available: true
  },
  {
    id: "dining-package",
    title: "Pre-Show Wellness Dining",
    description: "Healthy cuisine at Al Habtoor's premium restaurants",
    value: "AED 300 value",
    icon: <Utensils className="w-6 h-6 text-emerald-500" />,
    available: true
  },
  {
    id: "photo-session",
    title: "Professional Wellness Photo Session",
    description: "Capture your journey with La Perle's stunning backdrop",
    value: "AED 150 value",
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    available: true
  }
];

const journeySteps: WellnessJourneyStep[] = [
  {
    id: "hotel-start",
    title: "Luxury Hotel Check-In",
    description: "Begin your wellness journey at participating luxury hotels",
    location: "Hilton, JW Marquee, Oberoi, or Address Hotels",
    duration: "30 mins",
    icon: <Building className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    completed: false,
    perks: ["Welcome wellness kit", "AquaCafe starter sample", "Journey passport activation"]
  },
  {
    id: "cycling-track",
    title: "Sheikh Zayed Road Cycling Track",
    description: "Premium cycling experience along Dubai's iconic skyline",
    location: "New dedicated track alongside Sheikh Zayed Road",
    duration: "45-60 mins",
    icon: <Bike className="w-6 h-6" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    completed: false,
    perks: ["Smart bike rental", "Health monitoring", "Hydration stations with filtered water"]
  },
  {
    id: "walking-track",
    title: "Wellness Walking Experience",
    description: "Scenic walking path with wellness checkpoints",
    location: "Parallel walking track with rest areas",
    duration: "30-45 mins",
    icon: <Footprints className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    completed: false,
    perks: ["Guided wellness stops", "Air quality monitoring", "Meditation pods"]
  },
  {
    id: "laperle-experience",
    title: "La Perle Aqua Show Experience",
    description: "World-class aquatic theater experience in Al Habtoor City",
    location: "La Perle by Dragone Theater, Al Habtoor City",
    duration: "90 mins show + VIP perks",
    icon: <Trophy className="w-6 h-6" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    completed: false,
    perks: ["VIP seating", "Backstage tour", "Photo opportunities", "Healthy refreshments"]
  },
  {
    id: "mazaya-shopping",
    title: "Mazaya Center Wellness Shopping",
    description: "Curated wellness shopping experience with special discounts",
    location: "Mazaya Center - Premium Wellness Floor",
    duration: "60 mins",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    completed: false,
    perks: ["20% wellness discounts", "Personal wellness consultant", "AquaCafe loyalty benefits"]
  },
  {
    id: "dubai-marathon",
    title: "Dubai Marathon Planet Heroes Challenge",
    description: "Join the annual Dubai Marathon as a Planet Hero ambassador representing wellness and sustainability",
    location: "Sheikh Zayed Road - Full Marathon Route",
    duration: "4-6 hours event + training period",
    icon: <Trophy className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    completed: false,
    perks: [
      "Exclusive Planet Hero T-shirt", 
      "Partner water stations support", 
      "2500 Planet Points reward",
      "Marathon finisher badge",
      "AED 200 wellness voucher",
      "Community ambassador status"
    ]
  }
];

export function DubaiWellnessJourney({ 
  variant = 'full', 
  showMembershipCTA = true,
  onMembershipSignup 
}: DubaiWellnessJourneyProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showPerks, setShowPerks] = useState(false);
  const [journeyProgress, setJourneyProgress] = useState(0);
  
  // Passport-related states
  const [wellnessPassportActive, setWellnessPassportActive] = useState(false);
  const [passportStep, setPassportStep] = useState(0);
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

  useEffect(() => {
    const completedSteps = journeySteps.filter(step => step.completed).length;
    setJourneyProgress((completedSteps / journeySteps.length) * 100);
  }, []);

  // Auto-hydrate passport on mount if we have stored data
  useEffect(() => {
    if (currentPassport) {
      setWellnessPassportActive(true);
      setPassportStep(currentPassport.currentStep || 0);
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
      setPassportStep(passport.currentStep || 1);
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
      setPassportStep(passport.currentStep || 1);
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
      setPassportStep(updatedPassport.currentStep || 2);
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

  const handleStartJourney = () => {
    toast({
      title: "Wellness Journey Activated!",
      description: "Your Dubai Wellness Journey passport has been created. Check your phone for QR code.",
    });
  };

  const handleStepComplete = (stepId: string) => {
    const stepIndex = journeySteps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      journeySteps[stepIndex].completed = true;
      const newProgress = ((stepIndex + 1) / journeySteps.length) * 100;
      setJourneyProgress(newProgress);
      
      if (stepIndex === journeySteps.length - 1) {
        toast({
          title: "Journey Complete! 🎉",
          description: "You've earned all Aqua Show perks and wellness benefits!",
        });
      }
    }
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
      completed: passportStep >= 1
    },
    {
      id: 2,
      title: "Visit Baker's Kitchen",
      description: "Show QR code for free Kangen Water tasting + set menu",
      icon: ChefHat,
      location: "Mazaya Center",
      points: 100,
      completed: passportStep >= 2
    },
    {
      id: 3,
      title: "Wellness Walk & Shop",
      description: "Healthy stroll through Mazaya Center with exclusive discounts",
      icon: Navigation,
      location: "Mazaya Center",
      points: 75,
      completed: passportStep >= 3
    },
    {
      id: 4,
      title: "Join AquaCafe Loyalty",
      description: "Complete journey by becoming AquaCafe member",
      icon: Trophy,
      location: "Online",
      points: 200,
      completed: passportStep >= 4
    }
  ];

  // Render different variants
  if (variant === 'aquacafe') {
    return (
      <section className="w-full py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden">
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
                          {passportStep >= 3 ? 'Complete Your Journey - Join AquaCafe Loyalty' : 'Ready to Join AquaCafe?'}
                        </h4>
                        <p className="text-emerald-700 text-sm mb-4 text-center">
                          {passportStep >= 3 
                            ? 'You\'ve made great progress! Complete your wellness journey with AquaCafe membership.'
                            : 'Start your wellness journey and get instant access to exclusive benefits and rewards.'
                          }
                        </p>
                        <Button
                          onClick={onMembershipSignup}
                          className="w-full bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg"
                          data-testid="button-complete-journey-membership"
                        >
                          {passportStep >= 3 ? 'Get AED 99 Starter Kit & Complete Journey' : 'Get AED 99 Starter Kit & Begin Journey'}
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
                        : passportStep === step.id - 1
                        ? 'border-purple-300 bg-purple-50 shadow-lg animate-pulse'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? 'bg-emerald-500 text-white'
                              : passportStep === step.id - 1
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

  // Default full journey view
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Droplets className="w-10 h-10 text-cyan-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Dubai Wellness Journey
            </h2>
            <MapPin className="w-10 h-10 text-emerald-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            The world's first luxury hotel-to-wellness track experience. Cycle or walk along Sheikh Zayed Road, 
            earn exclusive <strong>La Perle Aqua Show perks</strong>, and complete your journey at Mazaya Center.
          </p>
          
          {/* Journey Progress */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Journey Progress</span>
              <span className="text-sm font-medium text-gray-600">{Math.round(journeyProgress)}% Complete</span>
            </div>
            <Progress value={journeyProgress} className="h-3 bg-gray-200" />
            <p className="text-sm text-gray-500 mt-2">
              Complete all steps to unlock exclusive Aqua Show VIP experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleStartJourney}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
              data-testid="button-start-wellness-journey"
            >
              <Zap className="mr-2 w-5 h-5" />
              Start Your Wellness Journey
            </Button>
            <Button 
              onClick={() => setShowPerks(!showPerks)}
              variant="outline"
              className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-8 py-3 text-lg"
              data-testid="button-view-aqua-perks"
            >
              <Gift className="mr-2 w-5 h-5" />
              View Aqua Show Perks
            </Button>
          </div>
        </div>

        {/* Aqua Show Perks Section */}
        {showPerks && (
          <div className="mb-12 p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl border border-cyan-200">
            <h3 className="text-2xl font-bold text-center text-cyan-800 mb-6">
              🎭 Exclusive La Perle Aqua Show Perks
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aquaShowPerks.map((perk) => (
                <Card key={perk.id} className="border-cyan-200 hover:border-cyan-400 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{perk.icon}</div>
                    <h4 className="font-bold text-gray-800 mb-2">{perk.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{perk.description}</p>
                    <Badge className="bg-cyan-100 text-cyan-800 border-cyan-300">
                      {perk.value}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-lg font-semibold text-cyan-800">
                Total Value: <span className="text-2xl">AED 1,100+</span> in exclusive perks!
              </p>
            </div>
          </div>
        )}

        {/* Luxury Hotels Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🏨 Participating Luxury Hotels
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryHotels.map((hotel) => (
              <Card key={hotel.id} className="border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {hotel.icon}
                    <h4 className="font-bold text-gray-800">{hotel.name}</h4>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {hotel.location}
                    </p>
                    <p className="text-sm text-emerald-600 font-medium">
                      <Footprints className="w-4 h-4 inline mr-1" />
                      {hotel.distance}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      🎁 {hotel.specialOffer}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Steps */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🗺️ Your Wellness Journey Path
          </h3>
          <div className="space-y-6">
            {journeySteps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`border-2 transition-all cursor-pointer ${
                  activeStep === index 
                    ? 'border-cyan-400 shadow-lg scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${step.completed ? 'bg-green-50 border-green-300' : ''}`}
                onClick={() => setActiveStep(index)}
                data-testid={`journey-step-${step.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Step Number & Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${step.bgColor} ${step.color}`}>
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <span className="font-bold text-lg">{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        {step.icon}
                        <h4 className="text-xl font-bold text-gray-800">{step.title}</h4>
                        {step.completed && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{step.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{step.duration}</span>
                        </div>
                      </div>

                      {/* Step Perks */}
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Included Perks:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.perks.map((perk) => (
                            <Badge key={perk} variant="outline" className="text-xs">
                              {perk}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      {!step.completed && (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStepComplete(step.id);
                          }}
                          className={`mt-4 bg-gradient-to-r ${
                            index === 0 
                              ? 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                              : index === 3
                              ? 'from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                              : 'from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                          } text-white`}
                          data-testid={`button-complete-${step.id}`}
                        >
                          {index === 0 ? 'Check In' : 
                           index === 3 ? 'Book Aqua Show' :
                           index === 4 ? 'Start Shopping' : 'Begin Activity'}
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Dubai Wellness Journey?</h3>
          <p className="text-lg mb-6 opacity-90">
            Start at any participating luxury hotel and unlock exclusive La Perle Aqua Show experiences!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aquacafe">
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-3 text-lg">
                <Droplets className="mr-2 w-5 h-5" />
                Get AquaCafe Passport
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-3 text-lg"
              data-testid="button-book-hotels"
            >
              <Building className="mr-2 w-5 h-5" />
              Book Hotel Partner
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
}