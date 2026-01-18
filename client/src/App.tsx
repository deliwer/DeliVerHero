import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopBanner } from "@/components/top-banner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { StickyNeonHeadline } from "@/components/sticky-neon-headline";
import { TooltipManager } from "@/components/tooltip-manager";
import { ImagePerformanceMonitor } from "@/components/image-performance-monitor";
import { FloatingErrandTips } from "@/components/floating-errand-tips";
import { Suspense, useEffect, lazy } from "react";
import { useLocation } from "wouter";

// Import core pages directly for faster initial load or if they are critical
import Home from "@/pages/home";
import MoveInServices from "@/pages/move-in-services";
import MoveInPackages from "@/pages/move-in-packages";
import Relocate from "@/pages/relocate";
import BusinessSetup from "@/pages/business-setup";
import InternationalRelocationPricing from "@/pages/relocate-pricing";
import HomeService from "@/pages/home-service";
import Residence from "@/pages/residence";
import FindAPlace from "@/pages/residence/find-a-place";
import ErrandPage from "@/pages/errand";
import HomeServiceLaunch from "@/pages/home-service-launch";
import NotFound from "@/pages/not-found";

// Loader component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// B2B Corporate Pages (using direct imports to avoid lazy loading issues with non-default exports)
import { BulkTradeInPage } from "@/pages/bulk-tradein";
import { CorporateDashboardPage } from "@/pages/corporate-dashboard";
import { CorporateQuotesPage } from "@/pages/corporate-quotes";
import { PurchaseOrdersPage } from "@/pages/purchase-orders";
import { AccountManagementPage } from "@/pages/account-management";

// Lazy load non-critical pages
const MoveInLanding = lazy(() => import("@/pages/move-in-landing"));
const RelocateCommunity = lazy(() => import("@/pages/relocate-community"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const Environmental = lazy(() => import("@/pages/environmental"));
const DubaiRewards = lazy(() => import("@/pages/dubai-rewards"));
const Missions = lazy(() => import("@/pages/missions"));
const CartPage = lazy(() => import("@/pages/cart"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const AccountConsolidated = lazy(() => import("@/pages/account-consolidated"));
const ContactPage = lazy(() => import("@/pages/contact"));
const AboutPage = lazy(() => import("@/pages/about"));
const InvestPage = lazy(() => import("@/pages/invest"));
const EWastePage = lazy(() => import("@/pages/ewaste"));
const SignupPage = lazy(() => import("@/pages/signup"));
const LoginPage = lazy(() => import("@/pages/login"));
const Explore = lazy(() => import("@/pages/explore"));
const Leaderboard = lazy(() => import("@/pages/leaderboard"));
const ImpactDashboard = lazy(() => import("@/pages/impact-dashboard"));
const AquaCafe = lazy(() => import("@/pages/aquacafe-enhanced"));
const AquaCafeAlliance = lazy(() => import("@/pages/aquacafe-alliance"));
const Products = lazy(() => import("@/pages/products"));
const IcelandicGlacialLandingPage = lazy(() => import("@/pages/icelandic-glacial"));
const Exchange = lazy(() => import("@/pages/exchange"));
const Earn = lazy(() => import("@/pages/earn"));
const Collect = lazy(() => import("@/pages/collect"));
const Redeem = lazy(() => import("@/pages/redeem"));
const Play = lazy(() => import("@/pages/play"));
const Rewards = lazy(() => import("@/pages/rewards"));
const Partners = lazy(() => import("@/pages/partners"));
const HeroDashboard = lazy(() => import("@/pages/hero-dashboard"));
const InvestorDashboard = lazy(() => import("@/pages/investor-dashboard"));
const CorporatePartnerPortal = lazy(() => import("@/pages/corporate-partner-portal"));
const ImpactMethodology = lazy(() => import("@/pages/impact-methodology"));
const PlanetHero = lazy(() => import("@/pages/planet-hero"));
const PlanetHeroMissions = lazy(() => import("@/pages/planet-hero-missions"));
const PlanetHeroAffiliates = lazy(() => import("@/pages/planet-hero-affiliates"));
const PlanetHeroManual = lazy(() => import("@/pages/planet-hero-manual"));
const MissionControlSaqiKawthar = lazy(() => import("@/pages/mission-control-saqi-kawthar"));
const RestaurantRewards = lazy(() => import("@/pages/restaurant-rewards"));
const MetaverseGamingHub = lazy(() => import("@/pages/metaverse-gaming-hub"));
const CorporateCombined = lazy(() => import("@/pages/corporate-combined"));
const ChainTrackPage = lazy(() => import("@/pages/chaintrack"));
const FulfillmentByDeliWer = lazy(() => import("@/pages/fulfillment-by-deliwer"));
const BulkPurchasingPage = lazy(() => import("@/pages/bulk-purchasing"));
const MembershipPlansPage = lazy(() => import("@/pages/membership-plans"));
const RelocateExit = lazy(() => import("@/pages/relocate-exit"));

function Router() {
  const [location, setLocation] = useLocation();
  const basePath = import.meta.env.VITE_BASE_PATH || "";

  useEffect(() => {
    // Domain-based routing for ChainTrack - handles both www.chaintrack.com and chaintrack.com
    const hostname = window.location.hostname;
    if ((hostname === 'www.chaintrack.com' || hostname === 'chaintrack.com') && location === '/') {
      setLocation('/chaintrack');
      return;
    }
    
    // Immediately scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location, setLocation]);

  return (
    <WouterRouter base={basePath}>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/move-in-landing" component={MoveInLanding} />
          <Route path="/move-in-services" component={MoveInServices} />
          <Route path="/residence/move-in-packages" component={MoveInPackages} />
          
          {/* Relocate Membership Portal */}
          <Route path="/relocate" component={Relocate} />
          <Route path="/relocate/visa" component={lazy(() => import("@/pages/relocate-visa"))} />
          <Route path="/visa" component={lazy(() => import("@/pages/relocate-visa"))} />
          <Route path="/relocate/business-setup" component={BusinessSetup} />
          <Route path="/residence/move-in-services" component={MoveInServices} />
          <Route path="/relocate/pricing" component={InternationalRelocationPricing} />
          <Route path="/relocate-community" component={RelocateCommunity} />
          <Route path="/relocate/exit" component={RelocateExit} />
          <Route path="/exit" component={RelocateExit} />
          <Route path="/relocation" component={Relocate} />
          <Route path="/business-setup" component={BusinessSetup} />
          <Route path="/move-in-services" component={MoveInServices} />

        {/* Home Service - Unified AquaCafe + Trade-in */}
        <Route path="/home-service" component={HomeService} />

        {/* Errand Runner Service */}
        <Route path="/errand" component={ErrandPage} />

        {/* Home Service Launch Campaign */}
        <Route path="/launch" component={HomeServiceLaunch} />

        {/* Housing - Rent, Buy, Invest */}
        <Route path="/residence" component={Residence} />
        <Route path="/residence/find-a-place" component={FindAPlace} />

        {/* Core Site Pages */}
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/environmental" component={Environmental} />
        <Route path="/dubai-rewards" component={DubaiRewards} />
        <Route path="/missions" component={Missions} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={lazy(() => import("./pages/checkout"))} />
        <Route path="/order-success" component={lazy(() => import("./pages/order-success"))} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/account" component={AccountConsolidated} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/invest" component={InvestPage} />
        <Route path="/ewaste" component={EWastePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/email-campaigns" component={lazy(() => import("./pages/email-campaigns"))} />

        {/* Ecosystem Pages */}
        <Route path="/explore" component={Explore} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/community" component={Leaderboard} />
        <Route path="/impact-dashboard" component={ImpactDashboard} />
        <Route path="/aquacafe" component={AquaCafe} />
        <Route path="/aquacafe-alliance" component={AquaCafeAlliance} />
        <Route path="/products/aquacafe" component={AquaCafeAlliance} />
        <Route path="/products" component={Products} />
        <Route path="/products/icelandic-glacial" component={IcelandicGlacialLandingPage} />
        <Route path="/icelandic-glacial" component={IcelandicGlacialLandingPage} />
        <Route path="/exchange" component={Exchange} />
        <Route path="/earn" component={Earn} />
        <Route path="/collect" component={Collect} />
        <Route path="/redeem" component={Redeem} />
        <Route path="/play" component={Play} />
        <Route path="/rewards" component={Rewards} />
        <Route path="/partners" component={Partners} />
        <Route path="/dashboard" component={HeroDashboard} />
        <Route path="/investor-dashboard" component={InvestorDashboard} />
        <Route path="/corporate-partner-portal" component={CorporatePartnerPortal} />
        <Route path="/impact-methodology" component={ImpactMethodology} />
        
        {/* Planet Hero Gateway */}
        <Route path="/planet-hero" component={PlanetHero} />
        <Route path="/planet-hero-missions" component={PlanetHeroMissions} />
        <Route path="/planet-hero-affiliates" component={PlanetHeroAffiliates} />
        <Route path="/planet-hero-manual" component={PlanetHeroManual} />
        
        {/* Saqi Kawthar Project Mission */}
        <Route path="/mission-control-saqi-kawthar" component={MissionControlSaqiKawthar} />
        <Route path="/restaurant-rewards" component={RestaurantRewards} />
        
        {/* Metaverse Gaming Hub */}
        <Route path="/metaverse-gaming" component={MetaverseGamingHub} />
        <Route path="/gaming-hub" component={MetaverseGamingHub} />

        {/* B2B Corporate Routes */}
        <Route path="/bulk-tradein" component={BulkTradeInPage} />
        <Route path="/corporate-dashboard" component={CorporateDashboardPage} />
        <Route path="/corporate-quotes" component={CorporateQuotesPage} />
        <Route path="/purchase-orders" component={PurchaseOrdersPage} />
        <Route path="/account-management" component={AccountManagementPage} />
        <Route path="/cobone-corporate" component={CorporateCombined} />
        <Route path="/corporate" component={CorporateCombined} />
        <Route path="/partnership" component={Partners} />
        
        {/* ChainTrack B2B Wholesale Inventory */}
        <Route path="/chaintrack" component={ChainTrackPage} />

        {/* Fulfillment by DeliWer */}
        <Route path="/fulfillment" component={FulfillmentByDeliWer} />

        {/* Bulk Purchasing */}
        <Route path="/bulk-purchasing" component={BulkPurchasingPage} />

        {/* Membership Plans */}
        <Route path="/membership-plans" component={MembershipPlansPage} />

        <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-dubai-gradient">
          <StickyNeonHeadline />
          <TopBanner />
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
          <FloatingErrandTips />
        </div>
        <Toaster />
        <TooltipManager />
        <ImagePerformanceMonitor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
