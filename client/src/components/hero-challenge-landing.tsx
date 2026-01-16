import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils, ArrowDown, BarChart, X, User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Play, Copy, QrCode, Rocket, Calendar, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { AquaCafeTab } from "./aquacafe-tab";
import { HeroRegistrationModal, MissionSelectionModal } from "./hero-onboarding-modals";
import { TombolaWidget } from "./tombola-widget";
import { ImpactSlotMachine } from "./impact-slot-machine";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import { PlayTV } from "./play-tv";
import { InstantImpactUnlocks } from "./instant-impact-unlocks";
import { CalendlyButton } from "@/components/calendly-popup";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useImageOptimization, useImageServiceWorker } from "@/hooks/use-image-optimization";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Link } from "wouter";
import mobile_water_purification_hero from "@assets/mobile-water-purification-hero.jpg";
import k8MachineImage from "@assets/without_text_1756065010951.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import planetHeroesGaming from "@assets/generated_images/Planet_Heroes_environmental_gaming_7f7bf177.png";
import kangenWaterSystem from "@assets/generated_images/Kangen_K8_water_filtration_system_e7d8eaaa.png";
import pizzaBobaComboImage from "@assets/stock_images/pizza_and_boba_tea_d_a375dab3.jpg";

import Dubai_Creek_Apartment from "@assets/Dubai_Creek_Apartment.jpg";
import smartHomeLivingRoom from "@assets/stock_images/smart_home_living_ro_92fee3d3.jpg";
import homeServiceTechnician from "@assets/stock_images/professional_home_se_d1e6daec.jpg";

import Nicole_Oliver from "@assets/Nicole_Oliver.jpeg";
import relocationProfessionalImage from "@assets/stock_images/modern_professional__d33c9ad9.jpg";
import sayNoToPlasticImg from "@assets/IMG-20191119-WA0023_1768286821283.jpg";
import beautyFilterProof from "@assets/IMG-20210310-WA0681_1768287533319.jpg";

// Progress flow step indicator component
function ProgressIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const stepConfig = {
    1: { icon: Home, label: "Home", description: "Seamless Move-In" },
    2: { icon: Droplets, label: "Home Service", description: "Everyday Support" },
    3: { icon: ShoppingBag, label: "Loyalty", description: "Exclusive Perks" }
  };

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-hero-green-500/10 text-hero-green-400 px-5 py-2 rounded-full border border-hero-green-500/20 backdrop-blur-sm">
          <Target className="w-4 h-4" />
          <span className="font-bold text-[10px] tracking-[0.2em] uppercase">The DeliWer Journey</span>
        </div>
      </div>
      
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -translate-y-1/2 z-0"></div>
          
          <motion.div 
            className="absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-hero-green-500 via-blue-500 to-amber-500 -translate-y-1/2 z-0"
            initial={{ width: "0%" }}
            animate={{ width: currentStep === 1 ? "10%" : currentStep === 2 ? "50%" : "100%" }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />

          {[1, 2, 3].map((step) => {
            const { icon: StepIcon, label, description } = stepConfig[step as keyof typeof stepConfig];
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;

            return (
              <div key={step} className="relative z-10 flex flex-col items-center text-center">
                <motion.div 
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border backdrop-blur-md ${
                    isActive 
                      ? 'bg-white/10 border-white/30 shadow-lg' 
                      : isCompleted 
                        ? 'bg-hero-green-500/10 border-hero-green-500/30 text-hero-green-400'
                        : 'bg-gray-950 border-gray-800 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  ) : (
                    <StepIcon className={`w-6 h-6 sm:w-7 sm:h-7 ${isActive ? 'text-white' : ''}`} />
                  )}
                </motion.div>
                <div className="mt-4">
                  <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {label}
                  </div>
                  <div className={`text-[9px] mt-1 text-gray-400 hidden sm:block ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Phase 1: Home Setup component
function PhaseOneSetup() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4" data-section="step-1">
      <ProgressIndicator currentStep={1} />
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
          Home Setup
        </h2>
        <p className="text-xl md:text-2xl font-bold text-emerald-400 mb-12 italic">
          Keys Received. Stress Removed.
        </p>
        
        <div className="max-w-3xl mx-auto text-left space-y-10 bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
          
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-emerald-400" />
              </div>
              Residence in Dubai
            </h4>
            <div className="space-y-4 text-lg">
              <p className="text-gray-300 leading-relaxed">
                The most stressful moment of living in Dubai is not finding a home. It’s everything that comes <span className="text-white font-bold">after</span> you get the keys.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                  <h5 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <X className="w-3 h-3" /> The Fragmented Risk
                  </h5>
                  <p className="text-gray-400 text-sm">Movers, random truckers, and brokers often provide broken, uncoordinated services with no accountability and hidden costs.</p>
                </div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <h5 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> The DeliWer Journey
                  </h5>
                  <p className="text-gray-300 text-sm">One orchestrated experience. We coordinate every professional vendor, ensuring a seamless move-in with zero fragmentation.</p>
                </div>
              </div>

              <p className="text-emerald-400 font-black text-xl pt-4">
                This is where DeliWer starts.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              How DeliWer Works
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>One WhatsApp conversation — no apps, no portals</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>One DeliWer coordinator — fully accountable</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Vetted local partners — cleaning, water, maintenance</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>We stay responsible until everything is complete</span>
              </li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <p className="text-white font-bold text-lg mb-6">
              You tell us what you need. We execute. You move in calmly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/residence/move-in-services">
                <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-full px-8 py-6">
                  View Move-In Services
                </Button>
              </Link>
              <Link href="/residence/move-in-landing">
                <Button variant="outline" className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-full px-8 py-6">
                  View Move-In Packages
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-emerald-400 font-bold text-sm">Free consultation</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Speak to a real coordinator before spending anything</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Phase 2: Living Support Section
function PhaseTwoSupport() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleBuyNow = async (productId: string, productName: string, price: number) => {
    try {
      await shopifyCartService.addToCart({
        id: productId,
        variantId: productId,
        title: productName,
        variant: "Default",
        price: price,
        image: "/aquacafe_shower_main_1755270492134.jpg",
        quantity: 1
      });

      toast({
        title: "Added to Cart",
        description: `${productName} has been added to your cart.`
      });

      window.location.href = "/cart";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 mb-16 relative overflow-hidden rounded-3xl"
      data-section="step-2"
    >
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={2} />
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
            Living Support
          </h2>
          <p className="text-xl md:text-2xl font-bold text-cyan-400 mb-12 italic">
            Your Home, Running Smoothly
          </p>

          <div className="max-w-3xl mx-auto text-left space-y-10 bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-3xl">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-cyan-400" />
                </div>
                Everyday Living Support
              </h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Most services disappear after move-in. <span className="text-cyan-400 font-bold">DeliWer stays.</span>
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold text-white mb-6">Orchestration vs. Fragmentation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 font-bold block">Professional Orchestration</span>
                    <Badge variant="outline" className="text-[8px] bg-cyan-500/10 border-cyan-500/20 text-cyan-400">DeliWer</Badge>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">Coordinated deep cleaning, DEWA and chiller setup guidance by verified professionals. One point of contact, total accountability.</p>
                </div>
                <div className="space-y-2 opacity-60">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 font-bold block">Random Support</span>
                    <Badge variant="outline" className="text-[8px] bg-red-500/10 border-red-500/20 text-red-400">Risk</Badge>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">Unverified truckers and fragmented brokers often lead to property damage, delays, and higher unexpected costs.</p>
                </div>
                <div className="space-y-2 group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 font-bold block">Health-First Continuity</span>
                    <Badge variant="outline" className="text-[8px] bg-cyan-500/10 border-cyan-500/20 text-cyan-400">Certified</Badge>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">Immediate installation of certified shower filters and alkaline RO systems by trained technicians, not general handymen.</p>
                </div>
                <div className="space-y-2 group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 font-bold block">Preventive Maintenance</span>
                    <Badge variant="outline" className="text-[8px] bg-cyan-500/10 border-cyan-500/20 text-cyan-400">Proactive</Badge>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">Scheduled AC servicing and plumbing to avoid emergencies before they happen, managed by your dedicated coordinator.</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/residence/move-in-services">
                  <Button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full px-8 py-6">
                    View Home Services
                  </Button>
                </Link>
                <Link href="/aquacafe">
                  <Button variant="outline" className="w-full sm:w-auto border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded-full px-8 py-6">
                    View Essentials
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-500 text-xs italic">One coordinated support system for your household — starting in JVC, expanding citywide.</p>
              
              <button
                className="mt-8 text-cyan-400 font-bold text-sm flex items-center gap-2 mx-auto hover:text-cyan-300 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Hide Detailed Options" : "Show Premium Water Solutions"}
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="glass rounded-2xl p-8 border border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-4">
                  <Droplets className="w-5 h-5" />
                  <span className="font-bold inline-flex items-center gap-1">PREMIUM WATER SYSTEMS</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Choose Your Water Solution</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-400/30">
                  <h4 className="text-xl font-bold text-white mb-3">Kangen K8 Machine</h4>
                  <div className="text-2xl font-bold text-blue-400 mb-4"><DirhamSymbol size={18} /> 19,250</div>
                  <Button
                    onClick={() => handleBuyNow("kangen-k8-machine", "Kangen K8 Machine", 19250)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4"
                  >
                    Order Now
                  </Button>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-400/30">
                  <h4 className="text-xl font-bold text-white mb-3">AquaCafe Starter Kit</h4>
                  <div className="text-2xl font-bold text-cyan-400 mb-4"><DirhamSymbol size={18} /> 99</div>
                  <Button
                    onClick={() => handleBuyNow("aquacafe-starter-kit", "AquaCafe Starter Kit", 99)}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

// Phase 3: Essentials & Loyalty Section
function PhaseThreeLoyalty() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 mb-16 relative overflow-hidden rounded-3xl"
      data-section="membership-benefits"
    >
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={3} />
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
            Essentials & Loyalty
          </h2>
          <p className="text-xl md:text-2xl font-bold text-amber-400 mb-12 italic">
            Daily Essentials, Real Savings
          </p>

          <div className="max-w-3xl mx-auto text-left space-y-10 bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-3xl">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-amber-400" />
                </div>
                Daily Essentials & Loyalty
              </h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Once your home is running smoothly, DeliWer helps you <span className="text-white font-bold">spend less every month</span>, not more.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold text-white mb-6">What You Get</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span>Daily savings on drinking water</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span>Sustainable household replenishment</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span>Loyalty rewards for responsible choices</span>
                </li>
              </ul>
              <p className="mt-6 text-white font-bold text-lg text-center">Your everyday consumption starts working in your favor.</p>
            </div>

            <div className="text-center pt-8 border-t border-white/10">
              <Link href="/aquacafe">
                <Button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full px-8 py-6 text-lg">
                  Join AquaCafe Loyalty
                </Button>
              </Link>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-6 h-6 text-amber-400" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold text-center">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold text-center">Member Pricing</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Leaf className="w-6 h-6 text-amber-400" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold text-center">Impact Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Closing Anchor Component
function ClosingAnchor() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-8">
        <Handshake className="w-5 h-5 text-hero-green-400" />
        <span className="text-white font-bold tracking-widest uppercase text-xs">ONE SIMPLE PROMISE</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
        One contact. One coordinator.<br />One less thing to worry about in Dubai.
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        DeliWer exists so residents don’t have to manage Dubai alone.
      </p>
      <div className="mt-12">
        <Button 
          size="lg" 
          className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold rounded-full px-12 py-8 text-xl shadow-2xl"
          onClick={() => window.open('https://wa.me/yourwhatsappnumber', '_blank')}
        >
          Message our Coordinator
        </Button>
      </div>
    </div>
  );
}

export function HeroChallengeLanding() {
  const [showHeroRegistration, setShowHeroRegistration] = useState(false);
  const [showMissionSelection, setShowMissionSelection] = useState(false);
  const [registeredHero, setRegisteredHero] = useState<any>(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" data-testid="hero-challenge-landing">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3)_0% ,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
      </div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-hero-green-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-32 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-float-delayed"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-amber-500/10 rounded-full blur-lg animate-bounce-slow"></div>
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-hero-green-900/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-dubai-blue-900/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 3-Way Path Selector - Start Your Journey */}
        <div className="flex justify-center my-16">
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            <div className="absolute inset-0 bg-hero-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Path 1: Home */}
            <button
              onClick={() => {
                const step1Section = document.querySelector('[data-section="step-1"]');
                if (step1Section) step1Section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center cursor-pointer group transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Home"
              data-testid="button-scroll-step-1"
            >
              <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/10 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5 transition-all">
                <Home className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="mt-4 text-center">
                <div className="text-[10px] text-white font-black tracking-widest uppercase">Home</div>
              </div>
            </button>

            {/* Path 2: Home Service */}
            <button
              onClick={() => {
                const step2Section = document.querySelector('[data-section="step-2"]');
                if (step2Section) step2Section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center cursor-pointer group transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Home Service"
              data-testid="button-scroll-step-2"
            >
              <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5 transition-all">
                <Droplets className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="mt-4 text-center">
                <div className="text-[10px] text-white font-black tracking-widest uppercase">Home Service</div>
              </div>
            </button>

            {/* Path 3: Loyalty */}
            <button
              onClick={() => {
                const loyaltySection = document.querySelector('[data-section="membership-benefits"]');
                if (loyaltySection) loyaltySection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center cursor-pointer group transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Loyalty"
              data-testid="button-scroll-membership"
            >
              <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/10 group-hover:border-amber-500/40 group-hover:bg-amber-500/5 transition-all">
                <ShoppingBag className="w-7 h-7 text-amber-400" />
              </div>
              <div className="mt-4 text-center">
                <div className="text-[10px] text-white font-black tracking-widest uppercase">Loyalty</div>
              </div>
            </button>
          </div>
        </div>

        {/* 3-Step Progressive Flow with Storytelling Version */}
        <PhaseOneSetup />

        {/* Flow Connector 1→2 */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => {
            const step2Section = document.querySelector('[data-section="step-2"]');
            if (step2Section) step2Section.scrollIntoView({ behavior: 'smooth' });
          }}>
            <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500/50 via-blue-500/50 to-cyan-500/50 group-hover:h-24 transition-all duration-700"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-150"></div>
              <div className="w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <ArrowDown className="w-5 h-5 text-blue-400 group-hover:translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <PhaseTwoSupport />

        {/* Flow Connector 2→3 */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => {
            const membershipSection = document.querySelector('[data-section="membership-benefits"]');
            if (membershipSection) membershipSection.scrollIntoView({ behavior: 'smooth' });
          }}>
            <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-amber-500/50 group-hover:h-24 transition-all duration-700"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-150"></div>
              <div className="w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                <ArrowDown className="w-5 h-5 text-amber-400 group-hover:translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <PhaseThreeLoyalty />

        <ClosingAnchor />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 border-t border-white/5">
        <MeetDeliInteractive />
      </div>

      <HeroRegistrationModal 
        open={showHeroRegistration}
        onClose={() => setShowHeroRegistration(false)}
        onSuccess={(hero) => {
          setRegisteredHero(hero);
          setShowHeroRegistration(false);
          setShowMissionSelection(true);
        }}
      />

      <MissionSelectionModal 
        open={showMissionSelection}
        onClose={() => setShowMissionSelection(false)}
        hero={registeredHero}
        onMissionSelect={(mission) => {
          setShowMissionSelection(false);
          window.location.href = `/dashboard?mission=${mission.id}`;
        }}
      />
    </div>
  );
}
