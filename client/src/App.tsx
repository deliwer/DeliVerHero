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
import { useEffect, lazy } from "react";
import { useLocation } from "wouter";
import Home from "@/pages/home";
import Leaderboard from "@/pages/leaderboard";
import ImpactDashboard from "@/pages/impact-dashboard";
import AquaCafe from "@/pages/aquacafe-enhanced";
import AquaCafeAlliance from "@/pages/aquacafe-alliance";
import Products from "@/pages/products";
import Exchange from "@/pages/exchange";
import Earn from "@/pages/earn";
import Collect from "@/pages/collect";
import Redeem from "@/pages/redeem";
import Play from "@/pages/play";
import Rewards from "@/pages/rewards";
import Partners from "@/pages/partners";
import Community from "@/pages/community";
import MissionControlSaqiKawthar from "@/pages/mission-control-saqi-kawthar";
import RestaurantRewards from "@/pages/restaurant-rewards";
import MetaverseGamingHub from "@/pages/metaverse-gaming-hub";
import CartPage from "@/pages/cart";
import SignupPage from "@/pages/signup";
import LoginPage from "@/pages/login";

// B2B Corporate Pages
import { BulkTradeInPage } from "@/pages/bulk-tradein";
import { CorporateDashboardPage } from "@/pages/corporate-dashboard";
import { CorporateQuotesPage } from "@/pages/corporate-quotes";
import { PurchaseOrdersPage } from "@/pages/purchase-orders";
import { AccountManagementPage } from "@/pages/account-management";
import CoboneCorporate from "@/pages/cobone-corporate";
import CorporateCombined from "@/pages/corporate-combined";
import AccountConsolidated from "@/pages/account-consolidated";
import ChainTrackPage from "@/pages/chaintrack";
import FulfillmentByDeliWer from "@/pages/fulfillment-by-deliwer";
import MembershipPlansPage from "@/pages/membership-plans";
import BulkPurchasingPage from "@/pages/bulk-purchasing";

import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Environmental from "@/pages/environmental";
import DubaiRewards from "@/pages/dubai-rewards";
import Missions from "@/pages/missions";

import NotFound from "@/pages/not-found";
import ContactPage from "@/pages/contact";
import ProfilePage from "@/pages/profile";
import HeroDashboard from "@/pages/hero-dashboard";
import IcelandicGlacialLandingPage from "@/pages/icelandic-glacial";
import InvestorDashboard from "@/pages/investor-dashboard";
import CorporatePartnerPortal from "@/pages/corporate-partner-portal";
import ImpactMethodology from "@/pages/impact-methodology";

// Planet Hero Gateway Pages
import PlanetHero from "@/pages/planet-hero";
import PlanetHeroMissions from "@/pages/planet-hero-missions";
import PlanetHeroAffiliates from "@/pages/planet-hero-affiliates";
import PlanetHeroManual from "@/pages/planet-hero-manual";

// Relocate Membership Portal
import Relocate from "@/pages/relocate";
import RelocateCommunity from "@/pages/relocate-community";

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
      <Switch>
        <Route path="/" component={Home} />
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

        {/* Relocate Membership Portal */}
        <Route path="/relocate" component={Relocate} />
        <Route path="/relocate-community" component={RelocateCommunity} />

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
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/email-campaigns" component={lazy(() => import("./pages/email-campaigns"))} />

        <Route component={NotFound} />
    </Switch>
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
        </div>
        <Toaster />
        <TooltipManager />
        <ImagePerformanceMonitor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;