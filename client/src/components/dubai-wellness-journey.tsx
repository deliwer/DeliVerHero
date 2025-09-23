import { useState, useEffect } from "react";
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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

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

export function DubaiWellnessJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPerks, setShowPerks] = useState(false);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const completedSteps = journeySteps.filter(step => step.completed).length;
    setJourneyProgress((completedSteps / journeySteps.length) * 100);
  }, []);

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