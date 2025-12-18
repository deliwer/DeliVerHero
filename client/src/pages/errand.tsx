import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { Helmet } from "react-helmet";
import { SocialSharingWidget } from "@/components/social-sharing-widget";
import { 
  Bike, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Gift,
  Clock,
  MapPin,
  Zap,
  Users,
  Share2,
  Copy,
  Check,
  Home,
  ShoppingBag,
  Package,
  Wrench,
  Scissors,
  MessageCircle,
  Phone
} from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import errandRunnerImg from "@assets/stock_images/errand_delivery_serv_6f2364e8.jpg";
import busyLifeImg from "@assets/stock_images/city_rush_hour_shopp_8fe525d9.jpg";

export default function ErrandPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = useMemo(() => "ERRAND" + Math.random().toString(36).substr(2, 6).toUpperCase(), []);
  const referralLink = useMemo(() => `https://deliwer.com/errand?ref=${referralCode}`, [referralCode]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Referral Link Copied!",
      description: "Share with friends and earn rewards for each sign-up.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Errand Runner Service Dubai | Time-Saving Delivery & Concierge | DeliWer</title>
        <meta name="description" content="Professional errand runner service in Dubai saves busy professionals hours daily. Same-day delivery, bill payments, grocery runs, dry cleaning pickup, document delivery. Book your first errand today - only AED 29!" />
        <meta name="keywords" content="errand runner Dubai, time-saving service, personal delivery service, concierge service UAE, same-day delivery, busy professionals, bill payment service, grocery delivery Dubai, convenience service" />
        <meta property="og:title" content="Errand Runner Service Dubai - Save Hours Every Week | DeliWer" />
        <meta property="og:description" content="Get your errands done fast. Anything DeliWered. Wherever. Whenever. Focus on what matters while we handle the rest." />
        <meta property="og:type" content="website" />
        <meta name="author" content="DeliWer" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://deliwer.com/errand" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Errand Runner Service Dubai - Save Hours Every Week | DeliWer" />
        <meta name="twitter:description" content="Professional errand runners handle your to-do list. AED 29 first errand. Same-day delivery in Dubai." />
      </Helmet>

      {/* Hero Section - Full Background Image */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src={errandRunnerImg} 
          alt="Errand runner lifestyle - Your time is valuable" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Bike className="w-3 h-3 mr-1" />
                DeliWer Errand Runner - Save Hours Daily
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-errand-hero-title">
                Stop Wasting Your Time.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300"> Start Saving Hours.</span>
              </h1>
              <p className="text-xl text-white/95 mb-4 max-w-xl font-semibold" data-testid="text-errand-hero-description">
                Stuck in Dubai traffic? Buried in errands? Our trusted runners handle your entire to-do list so you reclaim your time and focus on what truly matters.
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                2-4 hour turnaround. Professional, vetted runners. Tracking every step. Just AED 29 for your first errand.
              </p>
              <div className="flex flex-wrap gap-4">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-book-errand"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Request Your First Errand
                </CalendlyButton>
                <Link href="/home-service">
                  <Button size="lg" variant="outline" className="bg-orange-500/20 border-orange-400/30 text-white backdrop-blur-sm" data-testid="button-explore-home-services">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore More Services
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="ghost" className="text-white/80 hover:text-white" data-testid="button-home-nav-errand">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Section */}
      <section className="py-16 px-4" id="errand">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white/40 dark:bg-slate-900/40 p-8 rounded-2xl border border-orange-200 dark:border-orange-900/30 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" data-testid="text-errand-main-title">
                Anything DeliWered. <span className="text-orange-600 dark:text-orange-400">Wherever. Whenever.</span>
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 font-medium">
                Stop spending hours on repetitive errands. From urgent bill payments to grocery runs, our professional runners handle life's small but consuming tasks — giving you back 5+ hours per week.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Book on-demand or schedule for later</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-Time Tracking</h3>
                    <p className="text-sm text-muted-foreground">Track your errand every step of the way</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Vetted Runners</h3>
                    <p className="text-sm text-muted-foreground">Professional, background-checked team members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Payment Proof</h3>
                    <p className="text-sm text-muted-foreground">Get photos and receipts for every transaction</p>
                  </div>
                </div>
              </div>

              <Card className="bg-orange-500/5 border-orange-500/20 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">First Errand Special</p>
                      <p className="text-2xl font-bold text-orange-500">AED 29</p>
                      <p className="text-sm text-muted-foreground">Was AED 49</p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                      Limited Time
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <CalendlyButton 
                size="lg" 
                data-testid="button-request-errand-main"
              >
                <Bike className="w-4 h-4 mr-2" />
                Request Your Errand Now
              </CalendlyButton>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl">
                <img 
                  src={busyLifeImg} 
                  alt="Busy Dubai lifestyle - professionals saving time with errand services, urban convenience" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">Your Time Matters</p>
                  <p className="text-white/90 text-sm">Focus on what truly matters — we handle the rest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" data-testid="text-errand-services">
              What Can We Deliver For You?
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium">
              Anything portable and legal. From daily essentials to urgent deliveries — see how many hours our runners can save you each week:
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Shopping & Pickup</h3>
                <p className="text-sm text-muted-foreground">Grocery, pharmacy, gifts, returns</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Bill Payments</h3>
                <p className="text-sm text-muted-foreground">Utility bills, fees, deposits</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Dry Cleaning & Delivery</h3>
                <p className="text-sm text-muted-foreground">Drop-off, pickup, delivery</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Document Delivery</h3>
                <p className="text-sm text-muted-foreground">Office, school, government offices</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Last-Minute Gifts</h3>
                <p className="text-sm text-muted-foreground">Same-day gift delivery</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">School Runs</h3>
                <p className="text-sm text-muted-foreground">Safe & reliable pickup service</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start Context Tip */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50/40 dark:from-orange-900/20 to-red-50/40 dark:to-red-900/20 border border-orange-200/50 dark:border-orange-900/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Ready to Reclaim Your Time?</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    Start your first errand in just 2 minutes. We handle the rest while you focus on what truly matters.
                  </p>
                  <CalendlyButton 
                    size="sm"
                    data-testid="button-quick-start-errand-tip"
                    className="text-sm"
                  >
                    Book Your First Errand
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </CalendlyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral & Affiliate Marketing Section - PROMINENT */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-900/10 via-rose-900/5 to-red-900/10" id="referral">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-400 font-medium">Earn Together Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-referral-errand-title">
              Refer Friends. <span className="text-pink-400">Earn Rewards.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your unique referral link and get rewarded every time a friend books an errand!
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
                  <p className="text-sm text-muted-foreground">Invite friends via your unique code</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Friends Book</h3>
                  <p className="text-sm text-muted-foreground">They request their first errand</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">You Both Earn</h3>
                  <p className="text-sm text-muted-foreground">Get AED 50 credit + Planet Points</p>
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
                    data-testid="button-copy-errand-referral"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <SocialSharingWidget 
                  content={{
                    type: 'trade',
                    title: 'DeliWer Errand Runner',
                    description: 'Save 5+ hours weekly! Get your errands done fast. Same-day delivery, bill payments, grocery runs in Dubai. Earn AED 50 + Planet Points when your friends join!',
                    value: 50,
                    url: referralLink
                  }}
                />
              </div>
              
              <div className="border-t border-border/30 pt-6">
                <p className="text-sm text-muted-foreground mb-4 font-medium text-center">Share your referral code directly:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <a 
                    href={`https://wa.me/?text=Save hours with DeliWer Errand Runner! I'm earning AED 50 + Planet Points with each friend. Join me: ${referralLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-500 hover:bg-green-600/30 transition-colors text-sm font-medium"
                    data-testid="link-share-whatsapp-errand"
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    Share on WhatsApp
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-500 hover:bg-blue-600/30 transition-colors text-sm font-medium"
                    data-testid="link-share-facebook-errand"
                  >
                    <SiFacebook className="w-4 h-4" />
                    Share on Facebook
                  </a>
                  <a 
                    href={`https://instagram.com/?url=${referralLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-lg text-pink-500 hover:bg-pink-600/30 transition-colors text-sm font-medium"
                    data-testid="link-share-instagram-errand"
                  >
                    <SiInstagram className="w-4 h-4" />
                    Share on Instagram
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Unlimited referrals. Unlimited rewards. Share the love!
            </p>
            <Link href="/home-service">
              <Button variant="outline" data-testid="button-explore-all-services">
                Explore All DeliWer Home Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-sell to Home Services */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-900/20 via-emerald-900/10 to-blue-900/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-foreground/80">Everything You Need at Home</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-cross-sell-title">
              Need more than errands?
            </h2>
            <p className="text-muted-foreground mb-2">
              DeliWer's home services include <strong className="text-foreground">water filtration, solar panels, EV charging, eco-cleaning, and more.</strong>
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              One platform. All your home needs covered.
            </p>
            <Link href="/home-service">
              <Button size="lg" data-testid="button-home-services-bridge">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover All Home Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Concierge Section - MOVED FROM HOME SERVICE */}
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
            
            {/* Inline Context Tip */}
            <div className="mt-6 inline-block px-4 py-2 bg-purple-100/40 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-900/30 rounded-full">
              <p className="text-xs font-medium text-purple-700 dark:text-purple-300">💡 Pro Tip: Bundle 3+ errands for 15% savings</p>
            </div>
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

      {/* Home Essentials Section - MOVED FROM HOME SERVICE */}
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
            
            {/* Inline Context Tip */}
            <div className="mt-6 inline-block px-4 py-2 bg-teal-100/40 dark:bg-teal-900/20 border border-teal-200/50 dark:border-teal-900/30 rounded-full">
              <p className="text-xs font-medium text-teal-700 dark:text-teal-300">🚀 New: WhatsApp direct booking available</p>
            </div>
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

      {/* WhatsApp Multi-Agent Viral Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-teal-900/20" id="whatsapp-agents">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-500/10 rounded-full px-4 py-2 mb-6">
              <SiWhatsapp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Chat With Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-whatsapp-title">
              Connect Instantly via <span className="text-green-400">WhatsApp</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team is ready to help you with errands, concierge services, and home essentials. Tap to chat!
            </p>
            
            {/* Inline Context Tip */}
            <div className="mt-6 inline-block px-4 py-2 bg-green-100/40 dark:bg-green-900/20 border border-green-200/50 dark:border-green-900/30 rounded-full">
              <p className="text-xs font-medium text-green-700 dark:text-green-300">⚡ Average response time: 2 minutes</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <Card className="hover-elevate border-green-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                    <SiWhatsapp className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hassan Jawad</h3>
                    <p className="text-sm text-muted-foreground">Senior Concierge Specialist</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/971523946311" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                    data-testid="link-whatsapp-hassan-1"
                  >
                    <Phone className="w-4 h-4" />
                    +971 52 394 6311
                  </a>
                  <a 
                    href="https://wa.me/971523906019" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                    data-testid="link-whatsapp-hassan-2"
                  >
                    <Phone className="w-4 h-4" />
                    +971 52 390 6019
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate border-green-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                    <SiWhatsapp className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Rubab Hassan</h3>
                    <p className="text-sm text-muted-foreground">Home Essentials Expert</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/971567148381" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                    data-testid="link-whatsapp-rubab-1"
                  >
                    <Phone className="w-4 h-4" />
                    +971 56 714 8381
                  </a>
                  <a 
                    href="https://wa.me/971504547110" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                    data-testid="link-whatsapp-rubab-2"
                  >
                    <Phone className="w-4 h-4" />
                    +971 50 454 7110
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Follow us for updates, offers, and launch news!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://facebook.com/deliwer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-5 h-5" />
                @deliwer
              </a>
              <a 
                href="https://instagram.com/vdeliwer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-lg text-pink-400 hover:bg-pink-600/30 transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
                @vdeliwer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            
            {/* Floating Context Tip */}
            <div className="inline-block px-5 py-3 bg-gradient-to-r from-blue-100/60 dark:from-blue-900/30 to-indigo-100/60 dark:to-indigo-900/30 border border-blue-200/60 dark:border-blue-900/50 rounded-lg backdrop-blur-sm mb-8">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <span className="font-semibold">💬 Still have questions?</span> Our team is here to help on WhatsApp
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you complete an errand?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Most errands are completed within 2-4 hours. For urgent requests, we offer express service within 1 hour.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is payment secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes! All payments are processed securely through our platform. You'll receive photos and receipts for every transaction.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What areas of Dubai do you service?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We service all major areas of Dubai and surrounding emirates. Check availability in your area when booking.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Footer with Context Tip */}
      <section className="py-12 px-4 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-bold mb-2">Ready to get your first errand done?</h3>
          
          {/* Subtle Achievement Trigger */}
          <p className="text-sm text-muted-foreground mb-6 font-medium">
            Join 5,000+ Dubai professionals saving hours daily with DeliWer
          </p>
          
          <CalendlyButton 
            size="lg" 
            data-testid="button-final-cta-errand"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Book Now - AED 29 First Errand
          </CalendlyButton>
          
          {/* Alternative Path Context Tip */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground mb-3">Prefer to chat first?</p>
            <div className="flex justify-center gap-3">
              <a 
                href="https://wa.me/971523946311" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
                data-testid="link-whatsapp-footer-hassan"
              >
                Chat with Hassan
              </a>
              <span className="text-border/50">•</span>
              <a 
                href="https://wa.me/971567148381" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
                data-testid="link-whatsapp-footer-rubab"
              >
                Chat with Rubab
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
