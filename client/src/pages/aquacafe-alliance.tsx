import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { shopifyCartService } from "@/lib/shopify-cart";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, 
  Home, Users, Rocket, Target, Eye, Droplets, Leaf, MapPin, Clock, 
  Phone, ChefHat, Utensils, Coffee, Quote, QrCode, Share2, Camera,
  Smartphone, Navigation, TrendingUp, Sparkles, Trophy, Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SocialSharingWidget } from "@/components/social-sharing-widget";

// Import assets
import aquacafeDesign from "@assets/Final_Design_DeliWer_AquaCafe_1755000844134.png";
import aquacafeTradeIn from "@assets/without_text_1756065010951.jpg";
import deliwerLogo from "@assets/deliwer logo_1755631850889.png";
import aquacafeCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755485915603.png";
import washingFace from "@assets/washing-face-01 (1)_1756065010952.jpg";
import bannerAquaCafe from "@assets/Banner_AquaCafe_1755270492134.jpg";

export default function AquaCafeAlliance() {
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [location] = useLocation();
  const [, setLocation2] = useLocation();
  const { toast } = useToast();

  // Extract variant from URL params
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const variant = urlParams.get('variant') || 'hero-minimal';

  const handleOrderNow = async () => {
    setIsOrderLoading(true);
    
    try {
      // Define plan details based on variant
      const planDetails = {
        'hero-minimal': {
          name: 'AquaCafe Hero Minimal - PLANET HERO ENTRY',
          price: 1299
        },
        'hero-premium': {
          name: 'AquaCafe Hero Premium',
          price: 1499
        },
        'hero-elite': {
          name: 'AquaCafe Hero Elite',
          price: 2299
        }
      };

      const plan = planDetails[variant as keyof typeof planDetails] || planDetails['hero-minimal'];

      // Add to cart using our cart service
      const aquacafeProduct = {
        id: `aquacafe-${variant}`,
        variantId: `gid://shopify/ProductVariant/aquacafe-${variant}`,
        title: plan.name,
        variant: variant,
        price: plan.price,
        image: "🌊",
        quantity: 1,
      };

      await shopifyCartService.addToCart(aquacafeProduct);
      
      toast({
        title: "Added to Cart!",
        description: `${plan.name} added to your cart`,
      });

      // Navigate to our Stripe checkout
      setLocation2('/checkout');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

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
  const queryClient = useQueryClient();

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
      // Update localStorage with fresh data
      localStorage.setItem('wellness-passport', JSON.stringify(passport));
      // Generate QR if passport exists
      if (passport.id) {
        generateQRCode(passport.id, phoneNumber);
      }
    }
  }, [existingPassportQuery.data, phoneNumber]);

  const handleExperienceAlliance = () => {
    window.open('https://maps.google.com/maps?q=Baker\'s+Kitchen+Mazaya+Center+Dubai', '_blank');
    toast({
      title: "Opening Maps",
      description: "Directing you to Chill & Grill location",
    });
  };

  // Create wellness passport mutation
  const createPassportMutation = useMutation({
    mutationFn: async (phone: string) => {
      return apiRequest('/api/wellness-passports', 'POST', { phone });
    },
    onSuccess: (passport: any) => {
      setCurrentPassport(passport);
      setWellnessPassportActive(true);
      setJourneyStep(passport.currentStep || 1);
      // Store in localStorage for persistence
      localStorage.setItem('wellness-phone', phoneNumber);
      localStorage.setItem('wellness-passport', JSON.stringify(passport));
      // Generate QR code for the passport
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
      // Update localStorage with latest passport data
      localStorage.setItem('wellness-passport', JSON.stringify(updatedPassport));
      toast({
        title: "Social Share Recorded!",
        description: `You've earned ${updatedPassport.pointsEarned || 50} points! Next: visit Chill & Grill.`,
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
      description: `Just activated my Wellness Passport for free Kangen Water + healthy meal at Chill & Grill!`,
      value: 150,
      url: `https://deliwer.com/aquacafe-alliance?ref=${referralCode}&passport=active`
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
      title: "Visit Chill & Grill",
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

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Navigation Bar */}
      <div className="w-full max-w-none mx-0 px-4 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <Link href="/" className="flex items-center gap-2 text-emerald-800 hover:text-emerald-600 transition-colors">
          <Home className="w-5 h-5" />
          <span className="font-semibold">DeliWer</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/products" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors">
            Shop All
          </Link>
          <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">
            Start Earning
          </Link>
        </div>
      </div>
      {/* Hero Section */}
      <section className="w-full py-12 sm:py-20 px-4 bg-gradient-to-br from-emerald-500/10 via-white to-amber-500/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Partnership Branding */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                {/* Partnership Logos */}
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    AquaCafe by DeliWer
                  </div>
                  <span className="text-3xl font-bold text-emerald-600">+</span>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    Chill & Grill
                  </div>
                </div>
                
                {/* Hero Headline */}
                <div className="mb-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Healthy Water
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
                    Meets Healthy Food
                  </h1>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl">
                Introducing a first-of-its-kind alliance in Dubai — AquaCafe by DeliWer partners with Chill & Grill, 
                serving revitalized Kangen Water with wholesome meals. Together, we empower families to live healthier and more sustainably.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={handleExperienceAlliance}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg transition-all"
                >
                  <Heart className="mr-3 w-6 h-6" />
                  Experience the Alliance
                </Button>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Mazaya Center, Business Bay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Open Daily 9AM-11PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lifestyle Image */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                <img 
                  src="https://static.wixstatic.com/media/74367b_9f4b70ed3be04cd89f9fd7dab4f3fec5~mv2.jpeg/v1/fill/w_1500,h_749,al_t,q_85,enc_avif,quality_auto/74367b_9f4b70ed3be04cd89f9fd7dab4f3fec5~mv2.jpeg" 
                  alt="Chill & Grill - Healthy Food & Wellness by Chill & Grill Chef" 
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="text-center mt-4">
                  <div className="text-lg font-bold text-gray-800 mb-2">Real Partnership, Real Results</div>
                  <div className="text-gray-600">Pure water with wholesome meals at Chill & Grill</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Journey - Now Available on AquaCafe Page */}
      <section className="w-full py-8 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-amber-500/5"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl">
            <QrCode className="w-6 h-6 mr-3" />
            🎁 Wellness Passport Now Available 🎁
            <QrCode className="w-6 h-6 ml-3" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-6">
            Dubai Wellness Journey Activated
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
            The complete Dubai Wellness Journey experience is now available on our AquaCafe page! 
            Get your FREE Wellness Passport and start your journey to better health and sustainability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aquacafe">
              <Button className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105">
                <QrCode className="w-6 h-6 mr-3" />
                Start Wellness Journey
              </Button>
            </Link>
            <Button
              onClick={handleOrderNow}
              disabled={isOrderLoading}
              className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
            >
              {isOrderLoading ? 'Processing...' : '🛒 Join Loyalty Program'}
            </Button>
          </div>
        </div>
      </section>

      {/* Our Shared Mission Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why AquaCafe + Chill & Grill?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              When water meets food, true wellness begins. This partnership is built on shared values:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AquaCafe Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pure Hydration</h3>
                  <p className="text-cyan-600 font-semibold">Plastic-Free | Premium Water</p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Fresh, honest food crafted daily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Plastic-free, revitalized hydration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Advanced Kangen Water technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>7-stage premium filtration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Chill & Grill Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Wholesome Meals</h3>
                  <p className="text-amber-600 font-semibold">Fresh Bread Daily | Serving Kangen Water</p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Fresh, wholesome meals daily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Kangen Water served with every meal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Premium location in Mazaya Center</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Commitment to health & sustainability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Message from #ChillAndGrill */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Dr. Sven's Photo */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Chef at Chill & Grill</h4>
                <p className="text-amber-600 font-semibold">Founder, Chill & Grill</p>
              </div>
              
              {/* Quote */}
              <div className="md:col-span-2">
                <Quote className="w-8 h-8 text-amber-500 mb-4" />
                <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                  "Healthy food deserves healthy water. That's why at Chill & Grill, we proudly serve AquaCafe Kangen Water — 
                  for our guests, for our community, for a healthier Dubai."
                </blockquote>
                <div className="text-right">
                  <span className="text-amber-600 font-bold">– Chef at Chill & Grill</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Offer Section */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl">
              <Gift className="w-6 h-6 mr-3" />
              AED 1299 Hero Minimal + Referral Rewards at Chill & Grill
              <Gift className="w-6 h-6 ml-3" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Referral System Benefits */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-600" />
                  Refer Friends & Earn Together
                </h3>
                <p className="text-gray-700 mb-6">
                  Join our exclusive referral program and earn Chill & Grill vouchers when your friends become AquaCafe members!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <span className="text-gray-700">Order your AED 99 starter kit and become a member</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <span className="text-gray-700">Share your referral code with friends & family</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <span className="text-gray-700">Earn AED 100 Chill & Grill vouchers per successful referral</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl text-white text-center">
                  <strong>🎁 Double Rewards:</strong> You get vouchers + your friends get 20% off their first order!
                </div>
              </div>
            </div>

            {/* Right: Product Showcase */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <img 
                  src={aquacafeTradeIn} 
                  alt="AquaCafe Starter Kit" 
                  className="w-full h-64 object-cover rounded-2xl shadow-md mb-6"
                />
                
                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-6 border border-emerald-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800 mb-3">Partnership Exclusive Benefits</div>
                    
                    {/* Membership Starter Kit CTA */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white">
                      <div className="text-lg font-bold mb-2">🚀 Start Your Membership Journey</div>
                      <div className="text-2xl font-bold mb-2">AED 99 Starter Kit</div>
                      <div className="text-sm mb-3">Your gateway to exclusive rewards, referral bonuses & Dr Sven's network</div>
                      <Button 
                        onClick={handleOrderNow}
                        disabled={isOrderLoading}
                        className="bg-white text-emerald-600 hover:bg-gray-100 font-bold px-6 py-2 rounded-full text-sm"
                      >
                        {isOrderLoading ? 'Processing...' : '🛒 Join Now & Start Referring'}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Join Kangen Network</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        <span>Chill & Grill Referral Reward</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                        <span>Kangen Water Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500" />
                        <span>Premium Installation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sustainability Commitment */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              #SayNoToPlastic, SayYesToHealth
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Join AquaCafe and Chill & Grill in creating a sustainable future for Dubai
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">🌱 Plastic-Free</h3>
              <p className="text-emerald-100">Eliminate single-use plastic bottles with our advanced filtration systems</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">🥖 Healthy Dining</h3>
              <p className="text-emerald-100">Pure water and nutritious meals for optimal health and wellness</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">🌍 Dubai 2030 Sustainability</h3>
              <p className="text-emerald-100">Supporting Dubai's sustainable development goals through partnership</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="text-xl font-bold mb-3">#ChillAndGrill #HealthyDubai #DeliWer</h4>
              <p className="text-emerald-100">
                Together, we're making Dubai healthier, one meal and one drop at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA: Membership + Referral Program */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🎆 Join the Alliance & Start Earning 🎆
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
              Become an AquaCafe member today and unlock exclusive access to Dr Chill & Grill Chef's referral network. 
              Every friend you refer earns you rewards at Chill & Grill!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Membership Benefits */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-300" />
                Membership Benefits
              </h3>
              <div className="space-y-3 text-white/90">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>Instant access to referral program</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>AED 100 Chill & Grill vouchers per referral</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>20% discount on all future AquaCafe products</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>Priority access to Dr Sven's special events</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>Exclusive wellness tips from Chill & Grill</span>
                </div>
                <div className="flex items-center gap-3 mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-cyan-400/30">
                  <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                  <span className="text-cyan-100 font-semibold">🌊 COMING SOON: Exclusive Aqua Show Experience</span>
                </div>
                <div className="text-xs text-cyan-200 mt-2 ml-8">
                  💎 Platinum partners get priority access to Dubai's most extraordinary aquatic entertainment venue featuring breathtaking performances and immersive experiences
                </div>
              </div>
            </div>
            
            {/* Referral Rewards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Gift className="w-8 h-8 text-pink-300" />
                Referral Rewards
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-gray-800">AED 100 Voucher</div>
                  <div className="text-sm text-gray-700">Per successful referral at Chill & Grill</div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-white">500 Planet Points</div>
                  <div className="text-sm text-white/90">Bonus points for each friend who joins</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-white">20% Friend Discount</div>
                  <div className="text-sm text-white/90">Your friends save on their first order</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/30">
              <h3 className="text-3xl font-bold text-white mb-4">🚀 Start Your Membership Journey</h3>
              <div className="text-6xl font-bold text-yellow-300 mb-2">AED 99</div>
              <div className="text-xl text-white/90 mb-6">One-time starter kit + lifetime membership benefits</div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button 
                  onClick={handleOrderNow}
                  disabled={isOrderLoading}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 hover:from-yellow-500 hover:to-orange-600 text-xl px-10 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {isOrderLoading ? (
                    <>
                      <div className="animate-spin w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6 mr-3" />
                      Join Alliance & Start Referring
                    </>
                  )}
                </Button>
                
                <Link href="/contact">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 text-xl px-10 py-4 rounded-full font-bold">
                    <Phone className="w-6 h-6 mr-3" />
                    Questions? Contact Us
                  </Button>
                </Link>
              </div>
              
              <div className="text-sm text-white/80">
                ✨ Join today and start earning rewards tomorrow! ✨
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logos */}
            <div className="text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                  AquaCafe by DeliWer
                </div>
                <span className="text-2xl">+</span>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                  Chill & Grill
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div className="text-center">
              <h4 className="text-lg font-bold mb-3">Visit Chill & Grill</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mazaya Center, Business Bay</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Open Daily 9AM-11PM</span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="text-center md:text-right">
              <div className="space-y-2">
                <Link href="/contact" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                  Contact Us
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-400 hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DeliWer & Chill & Grill. All rights reserved.</p>
            <p className="mt-2 text-sm">#ChillAndGrill #HealthyDubai #DeliWer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}