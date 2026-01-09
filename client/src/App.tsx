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
import { useEffect, lazy } from "react";
import { useLocation } from "wouter";
import Home from "@/pages/home";
import MoveInLanding from "@/pages/move-in-landing";
import MoveInServices from "@/pages/move-in-services";
import Relocate from "@/pages/relocate";
import BusinessSetup from "@/pages/business-setup";
import InternationalRelocationPricing from "@/pages/relocate-pricing";
import RelocateCommunity from "@/pages/relocate-community";
import HomeService from "@/pages/home-service";
import Housing from "@/pages/housing";
import ErrandPage from "@/pages/errand";
import HomeServiceLaunch from "@/pages/home-service-launch";

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
        <Route path="/move-in-landing" component={MoveInLanding} />
        <Route path="/move-in-services" component={MoveInServices} />
        <Route path="/relocate" component={Relocate} />
        <Route path="/relocate/move-in-services" component={MoveInServices} />
        <Route path="/relocate/business-setup" component={BusinessSetup} />
        <Route path="/relocate/pricing" component={InternationalRelocationPricing} />
        <Route path="/relocate-community" component={RelocateCommunity} />
        <Route path="/home-service" component={HomeService} />
        <Route path="/errand" component={ErrandPage} />
        <Route path="/launch" component={HomeServiceLaunch} />
        <Route path="/housing" component={Housing} />
        <Route path="/privacy" component={lazy(() => import("./pages/privacy"))} />
        <Route path="/terms" component={lazy(() => import("./pages/terms"))} />
        <Route path="/environmental" component={lazy(() => import("./pages/environmental"))} />
        <Route path="/dubai-rewards" component={lazy(() => import("./pages/dubai-rewards"))} />
        <Route path="/missions" component={lazy(() => import("./pages/missions"))} />
        <Route path="/cart" component={lazy(() => import("./pages/cart"))} />
        <Route path="/checkout" component={lazy(() => import("./pages/checkout"))} />
        <Route path="/order-success" component={lazy(() => import("./pages/order-success"))} />
        <Route path="/profile" component={lazy(() => import("./pages/profile"))} />
        <Route path="/account" component={lazy(() => import("./pages/account-consolidated"))} />
        <Route path="/contact" component={lazy(() => import("./pages/contact"))} />
        <Route path="/about" component={lazy(() => import("./pages/about"))} />
        <Route path="/invest" component={lazy(() => import("./pages/invest"))} />
        <Route path="/ewaste" component={lazy(() => import("./pages/ewaste"))} />
        <Route path="/signup" component={lazy(() => import("./pages/signup"))} />
        <Route path="/login" component={lazy(() => import("./pages/login"))} />
        <Route path="/email-campaigns" component={lazy(() => import("./pages/email-campaigns"))} />
        <Route path="/explore" component={lazy(() => import("./pages/explore"))} />
        <Route path="/leaderboard" component={lazy(() => import("./pages/leaderboard"))} />
        <Route path="/impact-dashboard" component={lazy(() => import("./pages/impact-dashboard"))} />
        <Route path="/aquacafe" component={lazy(() => import("./pages/aquacafe-enhanced"))} />
        <Route path="/aquacafe-alliance" component={lazy(() => import("./pages/aquacafe-alliance"))} />
        <Route path="/products" component={lazy(() => import("./pages/products"))} />
        <Route path="/exchange" component={lazy(() => import("./pages/exchange"))} />
        <Route path="/earn" component={lazy(() => import("./pages/earn"))} />
        <Route path="/collect" component={lazy(() => import("./pages/collect"))} />
        <Route path="/redeem" component={lazy(() => import("./pages/redeem"))} />
        <Route path="/play" component={lazy(() => import("./pages/play"))} />
        <Route path="/rewards" component={lazy(() => import("./pages/rewards"))} />
        <Route path="/partners" component={lazy(() => import("./pages/partners"))} />
        <Route path="/dashboard" component={lazy(() => import("./pages/hero-dashboard"))} />
        <Route path="/investor-dashboard" component={lazy(() => import("./pages/investor-dashboard"))} />
        <Route path="/corporate-partner-portal" component={lazy(() => import("./pages/corporate-partner-portal"))} />
        <Route path="/impact-methodology" component={lazy(() => import("./pages/impact-methodology"))} />
        <Route path="/planet-hero" component={lazy(() => import("./pages/planet-hero"))} />
        <Route path="/planet-hero-missions" component={lazy(() => import("./pages/planet-hero-missions"))} />
        <Route path="/planet-hero-affiliates" component={lazy(() => import("./pages/planet-hero-affiliates"))} />
        <Route path="/planet-hero-manual" component={lazy(() => import("./pages/planet-hero-manual"))} />
        <Route path="/mission-control-saqi-kawthar" component={lazy(() => import("./pages/mission-control-saqi-kawthar"))} />
        <Route path="/restaurant-rewards" component={lazy(() => import("./pages/restaurant-rewards"))} />
        <Route path="/metaverse-gaming" component={lazy(() => import("./pages/metaverse-gaming-hub"))} />
        <Route path="/bulk-tradein" component={lazy(() => import("./pages/bulk-tradein"))} />
        <Route path="/corporate-dashboard" component={lazy(() => import("./pages/corporate-dashboard"))} />
        <Route path="/corporate-quotes" component={lazy(() => import("./pages/corporate-quotes"))} />
        <Route path="/purchase-orders" component={lazy(() => import("./pages/purchase-orders"))} />
        <Route path="/account-management" component={lazy(() => import("./pages/account-management"))} />
        <Route path="/cobone-corporate" component={lazy(() => import("./pages/corporate-combined"))} />
        <Route path="/chaintrack" component={lazy(() => import("./pages/chaintrack"))} />
        <Route path="/fulfillment" component={lazy(() => import("./pages/fulfillment-by-deliwer"))} />
        <Route path="/bulk-purchasing" component={lazy(() => import("./pages/bulk-purchasing"))} />
        <Route path="/membership-plans" component={lazy(() => import("./pages/membership-plans"))} />
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