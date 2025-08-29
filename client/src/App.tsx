import { Switch, Route } from "wouter";
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
import AquaCafe from "@/pages/aquacafe";
import AquaCafeAlliance from "@/pages/aquacafe-alliance";
import Products from "@/pages/products";
import Exchange from "@/pages/exchange";
import Collect from "@/pages/collect";
import Redeem from "@/pages/redeem";
import Partners from "@/pages/partners";
import Community from "@/pages/community";
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

import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Environmental from "@/pages/environmental";
import DubaiRewards from "@/pages/dubai-rewards";

import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Immediately scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/impact-dashboard" component={ImpactDashboard} />
      <Route path="/aquacafe" component={AquaCafe} />
      <Route path="/aquacafe-alliance" component={AquaCafeAlliance} />
      <Route path="/products/aquacafe" component={AquaCafeAlliance} />
      <Route path="/products" component={Products} />
      <Route path="/exchange" component={Exchange} />
      <Route path="/collect" component={Collect} />
      <Route path="/redeem" component={Redeem} />
      <Route path="/partners" component={Partners} />
      <Route path="/community" component={Community} />

      {/* B2B Corporate Routes */}
      <Route path="/bulk-tradein" component={BulkTradeInPage} />
      <Route path="/corporate-dashboard" component={CorporateDashboardPage} />
      <Route path="/corporate-quotes" component={CorporateQuotesPage} />
      <Route path="/purchase-orders" component={PurchaseOrdersPage} />
      <Route path="/account-management" component={AccountManagementPage} />
      <Route path="/cobone-corporate" component={CoboneCorporate} />

      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/environmental" component={Environmental} />
      <Route path="/dubai-rewards" component={DubaiRewards} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={lazy(() => import("./pages/checkout"))} />
      <Route path="/order-success" component={lazy(() => import("./pages/order-success"))} />
      <Route path="/profile" component={lazy(() => import("./pages/profile"))} />
      <Route path="/contact" component={lazy(() => import("./pages/contact"))} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />

      <Route component={NotFound} />
    </Switch>
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