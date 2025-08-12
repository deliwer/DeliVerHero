import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopBanner } from "@/components/top-banner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Leaderboard from "@/pages/leaderboard";
import ImpactDashboard from "@/pages/impact-dashboard";
import AquaCafe from "@/pages/aquacafe";
import Partners from "@/pages/partners";
import Delivery from "@/pages/delivery";
import Community from "@/pages/community";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Environmental from "@/pages/environmental";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/impact" component={ImpactDashboard} />
      <Route path="/aquacafe" component={AquaCafe} />
      <Route path="/partners" component={Partners} />
      <Route path="/delivery" component={Delivery} />
      <Route path="/community" component={Community} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/environmental" component={Environmental} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-dubai-gradient">
          <TopBanner />
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
