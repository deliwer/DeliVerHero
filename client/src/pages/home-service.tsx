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

import waterServiceImg from "@assets/stock_images/5-stage_water_purifi_4d73f45d.jpg";
import waterLifestyleImg from "@assets/stock_images/5-stage_water_purifi_b2e38594.jpg";
import waterPurifierImg from "@assets/stock_images/modern_water_filtrat_3b514222.jpg";
import homeServiceHeroImg from "@assets/stock_images/professional_service_2cfeb661.jpg";
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
        <title>Sustainable Home Services Dubai - Water, Solar, EV Charging & More | DeliWer</title>
        <meta name="description" content="Premium sustainable home services delivered to your door in Dubai. Professional water filtration, solar panel installation, EV charging, eco-friendly cleaning, device trade-in. Book your free consultation today - without leaving home." />
        <meta name="keywords" content="home services Dubai, water filtration UAE, solar panels Dubai, EV charging installation, eco-friendly cleaning, device trade-in Dubai, sustainable living Dubai, home automation, maintenance services UAE, water refill service, professional installation" />
        <meta property="og:title" content="Sustainable Home Services Dubai - Delivered to Your Door | DeliWer" />
        <meta property="og:description" content="Transform your home without leaving. Water filtration, solar panels, EV charging, eco-cleaning, device trade-in and errand services delivered professionally in Dubai." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="DeliWer" />
        <meta name="creator" content="DeliWer" />
        <link rel="canonical" href="https://deliwer.com/home-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sustainable Home Services in Dubai | DeliWer" />
        <meta name="twitter:description" content="Professional home services without leaving your home. Water, solar, EV charging, cleaning & more." />
        <meta name="twitter:creator" content="@deliwer" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "DeliWer Home Services",
          "description": "Premium sustainable home services in Dubai",
          "url": "https://deliwer.com/home-service",
          "areaServed": "Dubai",
          "serviceType": ["Water Filtration", "Solar Panel Installation", "EV Charging", "Eco-Cleaning", "Device Trade-in", "Errand Runner"],
          "telephone": "+971 50 xxx xxxx",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dubai",
            "addressCountry": "AE"
          }
        })}</script>
      </Helmet>
      {/* Hero Section - Home Service Convenience */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src={homeServiceHeroImg} 
          alt="Professional home service technician delivering convenient home maintenance services - without leaving home" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Droplets className="w-3 h-3 mr-1" />
                Launching Dec 25th - Christmas Special
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-home-service-title">
                Freedom LifeStyle.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300"> Without Leaving Home.</span>
              </h1>
              <p className="text-xl text-white/95 mb-4 max-w-xl font-semibold" data-testid="text-home-service-description">
                Professional home services delivered to your door. Water filtration, solar panels, EV charging, and more.
              </p>
              <p className="text-lg text-white/70 mb-8 max-w-xl">
                Designed for Dubai living. Built for busy families. Everything you need, delivered at home.
              </p>
              <div className="flex flex-wrap gap-4">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-book-consultation-home-service"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Book Free Consultation
                </CalendlyButton>
                <Link href="/launch">
                  <Button size="lg" variant="outline" className="bg-emerald-500/30 border-emerald-400/50 text-white backdrop-blur-sm hover:bg-emerald-500/40" data-testid="button-launch-promo">
                    <Gift className="w-4 h-4 mr-2" />
                    Launch Special Offer
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="ghost" className="text-white/90 hover:text-white" data-testid="button-home-nav">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trade-In Service Section - NEW */}
      <section className="py-0 px-0 relative" id="trade-in">
        <div className="relative overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
          <img 
            src={tradeInImg} 
            alt="Smartphone trade-in and recycling service" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-violet-500/30 rounded-full px-3 py-1.5 mb-3">
                <Smartphone className="w-4 h-4 text-violet-300" />
                <span className="text-xs text-violet-300 font-medium">Smart Trade-In Service</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="text-trade-in-title">
                Turn Old Devices into <span className="text-violet-300">Cash & Rewards</span>
              </h2>
              <p className="text-base text-white/90 mb-4 max-w-xl">
                Trade them in for instant cash, store credits, and Planet Points while contributing to a sustainable future.
              </p>
              <ul className="space-y-2 mb-4 text-sm text-white/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-300 flex-shrink-0" />
                  Instant AI-powered device valuation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-300 flex-shrink-0" />
                  Free pickup from your home
                </li>
                <li className="flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-violet-300 flex-shrink-0" />
                  <span><strong className="text-white">Eco-certified recycling</strong> for non-working devices</span>
                </li>
              </ul>
              <div className="bg-violet-500/20 backdrop-blur-sm border border-violet-500/30 rounded-lg p-3 mb-4 inline-block">
                <p className="text-xs text-violet-200 mb-0.5">Trade-In Bonus</p>
                <p className="text-xl font-bold text-violet-200">+20% Extra Value</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/exchange">
                  <Button size="lg" data-testid="button-trade-in-now">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Trade In Your Device
                  </Button>
                </Link>
                <CalendlyButton 
                  size="lg" 
                  variant="outline" 
                  data-testid="button-trade-in-consult"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get Quote
                </CalendlyButton>
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
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Kangen Water, everyday.</h2>
                <p className="text-lg text-white/90 mb-4 max-w-xl">
                  Advanced water ionization technology for healthier, premium-quality drinking water delivered directly to your home.
                </p>
                <div className="mb-4 max-w-xl">
                  <p className="text-sm text-white/80 mb-2 font-medium">Kangen Water Benefits:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>✓ Ionized & alkaline water for better hydration</li>
                    <li>✓ Removes impurities & chlorine</li>
                    <li>✓ Professional installation & maintenance</li>
                  </ul>
                  <a 
                    href="https://www.kangenwaterdubai.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-emerald-300 transition-colors text-sm mt-2 inline-block font-medium"
                    data-testid="link-kangen-details"
                  >
                    Learn more about Kangen Water →
                  </a>
                </div>
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
      {/* Water Service Details Section - ENHANCED PROMINENCE */}
      <section className="py-16 px-4 relative overflow-hidden" id="water-details" style={{ backgroundImage: `url(${waterPurifierImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white/10 dark:bg-white/5 p-8 rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 rounded-full px-4 py-2 mb-6 border border-emerald-400/50">
                <Droplets className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-semibold text-emerald-200">Premium Water Service Package</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-water-service-title">
                Pure Water. <span className="text-emerald-300">Without Effort.</span>
              </h2>
              <p className="text-lg text-white/90 mb-6 font-medium">
                Enjoy a continuous supply of clean, filtered drinking water at home — without the hassle. Professional installation, maintenance, and reliable refills included.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  Professional home installation & setup
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  Weekly refills & monthly maintenance
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  <span><strong className="text-white">Free premium shower filter</strong> with every demo</span>
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  24/7 customer support & emergency service
                </li>
              </ul>
              <Card className="bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 border-emerald-300/50 mb-6 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm font-medium text-emerald-200 mb-1">Limited Launch Offer</p>
                      <p className="text-3xl font-bold text-emerald-300">Demo: AED 99</p>
                      <p className="text-sm text-white/75">Includes free premium shower filter</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500 text-white border-emerald-400 text-xs font-bold px-3 py-1">
                      SAVE NOW
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  data-testid="button-speak-water-expert"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Book Installation Today
                </CalendlyButton>
                <Link href="/aquacafe">
                  <Button size="lg" variant="default" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0" data-testid="button-learn-more-water">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explore AquaCafe
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl">
                <img 
                  src={waterPurifierImg} 
                  alt="Advanced water purifier system - Kangen water ionization machine for home" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">Kangen Water System</p>
                  <p className="text-white/90 text-sm">Advanced ionization technology for premium water quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Errand Runner Section - MOVED UP (WAS AFTER CLEANING) */}
      <section className="py-16 px-4 relative overflow-hidden" id="errand-runner" style={{ backgroundImage: `url(${errandRunnerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/30 rounded-full px-4 py-2 mb-6 border border-orange-400/50">
                <Bike className="w-4 h-4 text-orange-300" />
                <span className="text-sm text-orange-200 font-medium">DeliWery Errand Runner</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-errand-runner-title">
                Anything DeliWered. <span className="text-orange-300">Wherever. Whenever.</span>
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Stuck in traffic? Forgot something important? Let us handle it. Our errand runners take care of your to-do list so you can focus on what matters.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-orange-300 flex-shrink-0" />
                  <span className="text-sm">Picking up dry cleaning</span>
                </div>
                <div className="flex items-center gap-2 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-orange-300 flex-shrink-0" />
                  <span className="text-sm">Paying bills</span>
                </div>
                <div className="flex items-center gap-2 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-orange-300 flex-shrink-0" />
                  <span className="text-sm">Delivering office items</span>
                </div>
                <div className="flex items-center gap-2 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-orange-300 flex-shrink-0" />
                  <span className="text-sm">Grocery & pharmacy runs</span>
                </div>
                <div className="flex items-center gap-2 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-orange-300 flex-shrink-0" />
                  <span className="text-sm">Last-minute gifts</span>
                </div>
                <div className="flex items-center gap-2 text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-orange-300 flex-shrink-0" />
                  <span className="text-sm">School & document drop-offs</span>
                </div>
              </div>
              <Card className="bg-gradient-to-r from-orange-500/25 to-amber-500/25 border-orange-300/50 mb-6 shadow-lg">
                <CardContent className="pt-6 pb-4">
                  <p className="text-sm text-orange-200 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-orange-300" />
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
      <section className="py-16 px-4 relative overflow-hidden" id="solar-service" style={{ backgroundImage: `url(${solarImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl">
                <img 
                  src={solarImg} 
                  alt="Solar panel installation on Dubai home rooftop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">Solar Energy Solutions</p>
                  <p className="text-white/90 text-sm">Harness Dubai's abundant sunshine</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-amber-500/30 rounded-full px-4 py-2 mb-6 border border-amber-400/50">
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="text-sm text-amber-200 font-medium">Solar Panel Installation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-solar-service-title">
                Power your home with <span className="text-amber-300">Dubai sunshine</span>
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Reduce your electricity bills by up to 80% with professional solar panel installation. DEWA-approved systems with government incentives.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
                  Free site assessment & custom design
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
                  DEWA Shams Dubai program eligible
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
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
      <section className="py-16 px-4 relative overflow-hidden" id="ev-charging" style={{ backgroundImage: `url(${evChargingImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/30 rounded-full px-4 py-2 mb-6 border border-green-400/50">
                <Zap className="w-4 h-4 text-green-300" />
                <span className="text-sm text-green-200 font-medium">EV Charging Installation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-ev-charging-title">
                Charge your EV at home. <span className="text-green-300">Effortlessly.</span>
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Professional home EV charging station installation. Wake up to a fully charged vehicle every morning without visiting public stations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                  Compatible with all EV brands
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                  Smart charging with app control
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
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
      <section className="py-16 px-4 relative overflow-hidden" id="eco-cleaning" style={{ backgroundImage: `url(${ecoCleaningImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl">
                <img 
                  src={ecoCleaningImg} 
                  alt="Eco-friendly home cleaning service with natural products" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">Green Cleaning Service</p>
                  <p className="text-white/90 text-sm">Safe for your family and the planet</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-teal-500/30 rounded-full px-4 py-2 mb-6 border border-teal-400/50">
                <Leaf className="w-4 h-4 text-teal-300" />
                <span className="text-sm text-teal-200 font-medium">Eco-Friendly Cleaning</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-eco-cleaning-title">
                A spotless home. <span className="text-teal-300">Zero harmful chemicals.</span>
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Professional cleaning using 100% eco-friendly, plant-based products. Safe for children, pets, and the environment.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0" />
                  Non-toxic, biodegradable products
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0" />
                  Trained & vetted cleaning teams
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0" />
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
      {/* Concierge & Home Essentials - Moved to /errand */}
      <section className="py-12 px-4 relative overflow-hidden" id="more-services" style={{ backgroundImage: `url(${errandRunnerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Looking for Concierge & Home Essentials?</h2>
          <p className="text-white/90 mb-6">
            We've moved our concierge services, grocery shopping, school runs, laundry, and more to our dedicated Errand Runner page for a better experience.
          </p>
          <Link href="/errand">
            <Button size="lg" data-testid="button-errand-concierge-redirect">
              <Bike className="w-4 h-4 mr-2" />
              Explore All Errand & Concierge Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      {/* Referral & Sharing Section - NEW */}
      <section className="py-16 px-4 relative overflow-hidden" id="referral" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.4) 100%), linear-gradient(to bottom, rgb(190,24,93), rgb(190,24,93))`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-pink-500/30 rounded-full px-4 py-2 mb-6 border border-pink-400/50">
              <Users className="w-4 h-4 text-pink-300" />
              <span className="text-sm text-pink-200 font-medium">Refer & Earn</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-referral-title">
              Share the love. <span className="text-pink-300">Earn rewards.</span>
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Invite friends to experience DeliWer's sustainable home services. You both earn rewards when they sign up!
            </p>
          </div>

          <Card className="mb-8 bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 backdrop-blur-md">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/30 flex items-center justify-center mx-auto mb-3 border border-pink-400/50">
                    <Share2 className="w-6 h-6 text-pink-300" />
                  </div>
                  <h3 className="font-semibold mb-1 text-white">Share Your Link</h3>
                  <p className="text-sm text-white/80">Send your unique referral link to friends</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/30 flex items-center justify-center mx-auto mb-3 border border-pink-400/50">
                    <Users className="w-6 h-6 text-pink-300" />
                  </div>
                  <h3 className="font-semibold mb-1 text-white">Friends Sign Up</h3>
                  <p className="text-sm text-white/80">They book a home service consultation</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/30 flex items-center justify-center mx-auto mb-3 border border-pink-400/50">
                    <Gift className="w-6 h-6 text-pink-300" />
                  </div>
                  <h3 className="font-semibold mb-1 text-white">Both Earn</h3>
                  <p className="text-sm text-white/80">Get AED 100 credit each + Planet Points</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/20">
                <p className="text-sm text-white/80 mb-2">Your Referral Link</p>
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
      <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.4) 100%), linear-gradient(to bottom, rgb(16,185,129), rgb(6,182,212))`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-emerald-400/50">
              <Plane className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200">From Home Service to Long-Term Living</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white" data-testid="text-relocation-bridge">
              Many of our members start with home services.
            </h2>
            <p className="text-white/90 mb-2">
              Some later choose to <strong className="text-white">build their lives in Dubai</strong>.
            </p>
            <p className="text-white/85 mb-8 max-w-2xl mx-auto">
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
