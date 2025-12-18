import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { Helmet } from "react-helmet";
import { SocialSharingWidget } from "@/components/social-sharing-widget";
import { 
  Droplets, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Gift,
  Plane,
  Globe,
  Bike,
  ShoppingBag,
  Scissors,
  Wrench,
  Package,
  Clock,
  MessageCircle,
  Smartphone,
  Recycle,
  Sun,
  Zap,
  Leaf,
  Share2,
  Users,
  Copy,
  Check
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

import waterServiceImg from "@assets/stock_images/modern_home_water_fi_3a6f205c.jpg";
import waterLifestyleImg from "@assets/stock_images/people_at_home_drink_21a6f771.jpg";
import tradeInImg from "@assets/stock_images/smartphone_trade-in__f695fa93.jpg";
import solarImg from "@assets/stock_images/solar_panels_home_ro_58dd081a.jpg";
import evChargingImg from "@assets/stock_images/electric_vehicle_ev__8c191f69.jpg";
import ecoCleaningImg from "@assets/stock_images/eco-friendly_cleanin_0650dea4.jpg";
import errandRunnerImg from "@assets/stock_images/errand_delivery_serv_6f2364e8.jpg";

export default function HomeService() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = useMemo(() => "DELIWER" + Math.random().toString(36).substr(2, 6).toUpperCase(), []);
  const referralLink = useMemo(() => `https://deliwer.com/home-service?ref=${referralCode}`, [referralCode]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Referral Link Copied!",
      description: "Share with friends to earn rewards when they sign up.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sustainable Home Services Dubai | Water, Solar, EV Charging, Eco-Cleaning | DeliWer</title>
        <meta name="description" content="Premium sustainable home services in Dubai. Water filtration, solar panel installation, EV charging stations, eco-friendly cleaning, device trade-in. Book your free consultation today." />
        <meta name="keywords" content="sustainable home services Dubai, water filtration UAE, solar panels Dubai, EV charging installation, eco-friendly cleaning, device trade-in Dubai, green home services" />
        <meta property="og:title" content="Sustainable Home Services Dubai | DeliWer" />
        <meta property="og:description" content="Transform your home with sustainable services. Water, solar, EV charging, eco-cleaning and more." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://deliwer.com/home-service" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Home className="w-3 h-3 mr-1" />
              DeliWer Home Service
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-home-service-title">
              Everything you need.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Without leaving home.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto" data-testid="text-home-service-description">
              We keep you fed. We keep your water clean. We give you your time back.
            </p>
            <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
              Designed for Dubai living. Built for busy lives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CalendlyButton 
                size="lg" 
                data-testid="button-book-consultation-home-service"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Book a Free Home Service Consultation
              </CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-In Service Section - NEW */}
      <section className="py-16 px-4 bg-gradient-to-br from-violet-900/10 via-purple-900/5 to-indigo-900/10" id="trade-in">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 rounded-full px-4 py-2 mb-6">
                <Smartphone className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-400 font-medium">Smart Trade-In Service</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-trade-in-title">
                Turn Old Devices into <span className="text-violet-400">Cash & Rewards</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Don't let your old electronics gather dust. Trade them in for instant cash, store credits, and Planet Points while contributing to a sustainable future.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
                  Instant AI-powered device valuation
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
                  Free pickup from your home
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Recycle className="w-5 h-5 text-violet-500 flex-shrink-0" />
                  <span><strong className="text-foreground">Eco-certified recycling</strong> for non-working devices</span>
                </li>
              </ul>
              <Card className="bg-violet-500/5 border-violet-500/20 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Trade-In Bonus</p>
                      <p className="text-2xl font-bold text-violet-500">+20% Extra Value</p>
                      <p className="text-sm text-muted-foreground">When you choose store credit</p>
                    </div>
                    <Badge variant="secondary" className="bg-violet-500/20 text-violet-400">
                      Limited Offer
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-3">
                <Link href="/exchange">
                  <Button size="lg" data-testid="button-trade-in-now">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Trade In Your Device
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <CalendlyButton 
                  size="lg" 
                  variant="outline" 
                  data-testid="button-trade-in-consult"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get a Free Quote
                </CalendlyButton>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={tradeInImg} 
                  alt="Smartphone trade-in and recycling service" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Responsible Device Recycling</p>
                  <p className="text-white/80 text-sm">Certified e-waste processing in UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Water Service Hero Section - FEATURED */}
      <section className="py-0 px-0 relative" id="water-service">
        <div className="h-96 md:h-[500px] lg:h-[600px] relative overflow-hidden">
          <img 
            src={waterLifestyleImg} 
            alt="Family enjoying clean water at home - lifestyle image" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <Droplets className="w-3 h-3 mr-1" />
                  Featured: Water Service
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Clean water, everyday.
                </h2>
                <p className="text-lg text-white/90 mb-6 max-w-xl">
                  Professional installation with reliable refills and maintenance included.
                </p>
                <div className="flex flex-wrap gap-3">
                  <CalendlyButton 
                    size="lg" 
                    data-testid="button-water-hero-consultation"
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    Schedule a Demo - AED 99
                  </CalendlyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Water Service Details Section */}
      <section className="py-16 px-4" id="water-details">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">Water Service Package</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-water-service-title">
                Clean water. Calm living.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Enjoy a continuous supply of clean, filtered drinking water at home — without the hassle.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  Home water service setup
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  Reliable refills & maintenance
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Gift className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span><strong className="text-foreground">Free shower filter</strong> with every demo</span>
                </li>
              </ul>
              <Card className="bg-emerald-500/5 border-emerald-500/20 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Special Offer</p>
                      <p className="text-2xl font-bold text-emerald-500">Demo for AED 99</p>
                      <p className="text-sm text-muted-foreground">Includes free shower filter</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                      Limited Time
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-speak-water-expert"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Book Installation
                </CalendlyButton>
                <Link href="/aquacafe">
                  <Button size="lg" variant="outline" data-testid="button-learn-more-water">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={waterServiceImg} 
                  alt="Modern home water filtration system in Dubai" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Premium Water Filtration</p>
                  <p className="text-white/80 text-sm">Clean water shouldn't require effort</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Errand Runner Section - MOVED UP (WAS AFTER CLEANING) */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-900/10 via-red-900/5 to-pink-900/10" id="errand-runner">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 rounded-full px-4 py-2 mb-6">
                <Bike className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-medium">DeliWery Errand Runner</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-errand-runner-title">
                Anything DeliWered. Wherever. Whenever.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Stuck in traffic? Forgot something important? Let us handle it. Our errand runners take care of your to-do list so you can focus on what matters.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Picking up dry cleaning</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Paying bills</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Delivering office items</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Grocery & pharmacy runs</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Last-minute gifts</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">School & document drop-offs</span>
                </div>
              </div>
              <Card className="bg-amber-500/5 border-amber-500/20 mb-6">
                <CardContent className="pt-6 pb-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-500" />
                    First errand: AED 29 (Was AED 49)
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-3">
                <Link href="/errand">
                  <Button size="lg" data-testid="button-errand-page">
                    <Bike className="w-4 h-4 mr-2" />
                    Explore Errand Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <CalendlyButton 
                  size="lg" 
                  variant="outline" 
                  data-testid="button-talk-advisor"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Talk to an Advisor
                </CalendlyButton>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={errandRunnerImg} 
                  alt="Delivery courier on bike running errands in Dubai" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Fast Errand Service</p>
                  <p className="text-white/80 text-sm">Your personal helper in Dubai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Panel Installation Section - NEW */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-900/10 via-yellow-900/5 to-orange-900/10" id="solar-service">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={solarImg} 
                  alt="Solar panel installation on Dubai home rooftop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Solar Energy Solutions</p>
                  <p className="text-white/80 text-sm">Harness Dubai's abundant sunshine</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 rounded-full px-4 py-2 mb-6">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400 font-medium">Solar Panel Installation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-solar-service-title">
                Power your home with <span className="text-amber-400">Dubai sunshine</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Reduce your electricity bills by up to 80% with professional solar panel installation. DEWA-approved systems with government incentives.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  Free site assessment & custom design
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  DEWA Shams Dubai program eligible
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  25-year performance warranty
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-solar-consultation"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Get Free Solar Assessment
                </CalendlyButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EV Charging Station Section - NEW */}
      <section className="py-16 px-4" id="ev-charging">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">EV Charging Installation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-ev-charging-title">
                Charge your EV at home. <span className="text-green-400">Effortlessly.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Professional home EV charging station installation. Wake up to a fully charged vehicle every morning without visiting public stations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Compatible with all EV brands
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Smart charging with app control
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  DEWA-approved installation
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-ev-consultation"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Schedule EV Charger Installation
                </CalendlyButton>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={evChargingImg} 
                  alt="Electric vehicle charging at home station" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Home EV Charging</p>
                  <p className="text-white/80 text-sm">Never queue at charging stations again</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eco-Cleaning Section - NEW */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-900/10 via-cyan-900/5 to-emerald-900/10" id="eco-cleaning">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={ecoCleaningImg} 
                  alt="Eco-friendly home cleaning service with natural products" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Green Cleaning Service</p>
                  <p className="text-white/80 text-sm">Safe for your family and the planet</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 rounded-full px-4 py-2 mb-6">
                <Leaf className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-teal-400 font-medium">Eco-Friendly Cleaning</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-eco-cleaning-title">
                A spotless home. <span className="text-teal-400">Zero harmful chemicals.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Professional cleaning using 100% eco-friendly, plant-based products. Safe for children, pets, and the environment.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  Non-toxic, biodegradable products
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  Trained & vetted cleaning teams
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  Flexible scheduling & subscriptions
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-eco-cleaning-book"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Book Eco-Cleaning Service
                </CalendlyButton>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Concierge Section */}
      <section className="py-16 px-4 bg-muted/30" id="concierge">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 mb-6">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">Concierge & Everyday Help</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-concierge-title">
              A helping hand, on demand.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Send someone else to handle life's small but time-consuming tasks. Think of it as your personal helper in the city.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="text-center hover-elevate">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Grocery Shopping</h3>
                <p className="text-sm text-muted-foreground">We shop, you relax</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-elevate">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">School Runs</h3>
                <p className="text-sm text-muted-foreground">Safe & reliable pickup</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-elevate">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Contract Delivery</h3>
                <p className="text-sm text-muted-foreground">Important docs handled</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <CalendlyButton 
              size="lg" 
              data-testid="button-book-concierge"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Book a Concierge Consultation
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* Home Essentials Section */}
      <section className="py-16 px-4" id="home-essentials">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 rounded-full px-4 py-2 mb-6">
              <Home className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-400 font-medium">Home Essentials & Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-home-essentials-title">
              Your home, taken care of.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We connect you with trusted services for daily living. All coordinated — so you don't have to chase multiple providers.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Laundry & Dry Cleaning</h3>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Pharmacy Delivery</h3>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Wrench className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Home Maintenance</h3>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Scissors className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Mobile Salon</h3>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <CalendlyButton 
              size="lg" 
              variant="outline"
              data-testid="button-discuss-home-support"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discuss Home Support Options
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* Referral & Sharing Section - NEW */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-900/10 via-rose-900/5 to-red-900/10" id="referral">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-400 font-medium">Refer & Earn</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-referral-title">
              Share the love. <span className="text-pink-400">Earn rewards.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Invite friends to experience DeliWer's sustainable home services. You both earn rewards when they sign up!
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Share Your Link</h3>
                  <p className="text-sm text-muted-foreground">Send your unique referral link to friends</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Friends Sign Up</h3>
                  <p className="text-sm text-muted-foreground">They book a home service consultation</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Both Earn</h3>
                  <p className="text-sm text-muted-foreground">Get AED 100 credit each + Planet Points</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background rounded px-3 py-2 text-sm overflow-hidden text-ellipsis">
                    {referralLink}
                  </code>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={handleCopyReferral}
                    data-testid="button-copy-referral"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <SocialSharingWidget 
                  content={{
                    type: 'trade',
                    title: 'DeliWer Home Services',
                    description: 'Sustainable home services in Dubai - water, solar, EV charging and more!',
                    value: 100,
                    url: referralLink
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Unlimited referrals. Unlimited rewards. Help us build a sustainable Dubai!
            </p>
          </div>
        </div>
      </section>

      {/* Relocation Bridge CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Plane className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-foreground/80">From Home Service to Long-Term Living</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-relocation-bridge">
              Many of our members start with home services.
            </h2>
            <p className="text-muted-foreground mb-2">
              Some later choose to <strong className="text-foreground">build their lives in Dubai</strong>.
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you're thinking long-term — housing, relocation, or investment — we can guide you.
            </p>
            <Link href="/relocate">
              <Button size="lg" data-testid="button-relocate-bridge">
                <Globe className="w-4 h-4 mr-2" />
                Explore Living & Relocation Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Note */}
      <section className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs text-muted-foreground">
            All services comply with UAE laws and company policies. Requests must be portable and legal.
          </p>
        </div>
      </section>
    </div>
  );
}
