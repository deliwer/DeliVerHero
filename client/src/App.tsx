import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopBanner } from "@/components/top-banner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { StickyNeonHeadline } from "@/components/sticky-neon-headline";
import { TooltipHintsManager } from "@/components/tooltip-hints-manager";
import { useEffect } from "react";
import { useLocation } from "wouter";
import Home from "@/pages/home";
import Leaderboard from "@/pages/leaderboard";
import ImpactDashboard from "@/pages/impact-dashboard";
import AquaCafe from "@/pages/aquacafe";
import Partners from "@/pages/partners";
import Community from "@/pages/community";
import SocialChallenges from "@/pages/social-challenges";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Environmental from "@/pages/environmental";
import DubaiRewards from "@/pages/dubai-rewards";
import Sponsorships from "@/pages/sponsorships";
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
      <Route path="/partners" component={Partners} />
      <Route path="/community" component={Community} />
      <Route path="/social-challenges" component={SocialChallenges} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/environmental" component={Environmental} />
      <Route path="/dubai-rewards" component={ImpactDashboard} />
      <Route path="/sponsorships" component={Sponsorships} />
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
        <TooltipHintsManager />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
