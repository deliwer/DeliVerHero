import { Switch, Route, Redirect } from "wouter";
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
import { BackToTop } from "@/components/back-to-top";
import { Suspense, useEffect, useState, lazy } from "react";
import { useLocation } from "wouter";

// Import core pages directly for faster initial load or if they are critical
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import MoveInServices from "@/pages/move-in-services";
import MoveInPackages from "@/pages/move-in-packages";
import MoveInPackagePage from "@/pages/move-in-package";
const MoveOutPackagePage = lazy(() => import("@/pages/move-out-package"));
const ActivatePage = lazy(() => import("@/pages/activate"));
const Relocate = lazy(() => import("@/pages/relocate"));
const Residents = lazy(() => import("@/pages/ResidentsPage"));
import MaintenanceConcierge from "@/pages/maintenance-concierge";
import ResidentSupportConcierge from "@/pages/resident-support-concierge";
import BusinessSetup from "@/pages/BusinessSetup";
import RealEstate from "@/pages/realestate";
import FinancePage from "@/pages/finance";
import MamzarBeach from "@/pages/mamzar";
import HomeAccess from "@/pages/home-access";
import InternationalRelocationPricing from "@/pages/relocate-pricing";
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
const MoveInSubpage = lazy(() => import("@/pages/residence/move-in"));
const MoveOutSubpage = lazy(() => import("@/pages/residence/move-out"));
const MoveInLanding = lazy(() => import("@/pages/move-in-landing"));
const StartPage = lazy(() => import("@/pages/start"));
const MoveInPlan = lazy(() => import("@/pages/move-in-plan"));
const EjariRegistration = lazy(() => import("@/pages/ejari-registration"));
const DewaActivation = lazy(() => import("@/pages/dewa-activation"));
const EjariRenewal = lazy(() => import("@/pages/ejari-renewal"));
const VirtualEjari = lazy(() => import("@/pages/virtual-ejari"));
const MoveToDubai = lazy(() => import("@/pages/move-to-dubai"));
const MarinaGateMoveIn = lazy(() => import("@/pages/marina-gate-move-in"));
const AffiliateManagement = lazy(() => import("@/pages/affiliate-management"));
const PartnerProgram = lazy(() => import("@/pages/partner-program"));
const CommunityToolkit = lazy(() => import("@/pages/community-toolkit"));
const CommunityPage = lazy(() => import("@/pages/community"));
const DeBacciWelcome = lazy(() => import("@/pages/partners/debacci-welcome"));
const EGLCWelcome = lazy(() => import("@/pages/partners/eglc-welcome"));
const MytablonWelcome = lazy(() => import("@/pages/partners/mytablon-welcome"));
const PartnersJoin = lazy(() => import("@/pages/partners/join"));
const JoinWelcome = lazy(() => import("@/pages/join"));
const PartnersHowItWorks = lazy(() => import("@/pages/partners/how-it-works"));
const PartnersEarnings = lazy(() => import("@/pages/partners/earnings"));
const PartnersResources = lazy(() => import("@/pages/partners/resources"));
const PartnersCareer = lazy(() => import("@/pages/partners/career"));
const ChainTrackPartners = lazy(() => import("@/pages/partners/chaintrack"));
const TenantMoveInChecklist = lazy(() => import("@/pages/tenant-move-in-checklist"));
const RelocationAlliance = lazy(() => import("@/pages/relocation-alliance"));
const BusinessSetupPage = lazy(() => import("@/pages/relocate/business-setup"));
const RelocatePlanning = lazy(() => import("@/pages/relocate/planning"));
const RelocateArrival = lazy(() => import("@/pages/relocate/arrival"));
const RelocateConcierge = lazy(() => import("@/pages/relocate/concierge"));
const RelocateExitSubpage = lazy(() => import("@/pages/relocate/exit"));
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
const HomeServices = lazy(() => import("@/pages/home-services"));
const RestaurantPartners = lazy(() => import("@/pages/restaurant-partners"));
const Products = lazy(() => import("@/pages/products"));
const IcelandicGlacialLandingPage = lazy(() => import("@/pages/icelandic-glacial"));
const Exchange = lazy(() => import("@/pages/exchange"));
const Earn = lazy(() => import("@/pages/earn"));
const TellAFriend = lazy(() => import("@/pages/taf"));
const Wellness = lazy(() => import("@/pages/wellness"));
const Collect = lazy(() => import("@/pages/collect"));
const Redeem = lazy(() => import("@/pages/redeem"));
const Play = lazy(() => import("@/pages/play"));
const Rewards = lazy(() => import("@/pages/rewards"));
const Partners = lazy(() => import("@/pages/partners"));
const Welcome = lazy(() => import("@/pages/welcome"));
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
const BuyChaintrackPage = lazy(() => import("@/pages/buy-chaintrack"));
const BuyDemoPage = lazy(() => import("@/pages/buy-demo"));
const FounderControlPage = lazy(() => import("@/pages/founder-control"));
const ReverseAuctionPage = lazy(() => import("@/pages/reverse-auction"));
const ReverseAuctionAdminPage = lazy(() => import("@/pages/admin/reverse-auction-admin"));
const MamzarAdminPage = lazy(() => import("@/pages/admin/mamzar-admin"));
const BrokerCircleAdmin = lazy(() => import("@/pages/admin/broker-circle"));
const WscMarketplacePage = lazy(() => import("@/pages/wsc-marketplace"));
const KtCorpMarketplacePage = lazy(() => import("@/pages/ktcorp-marketplace"));
const WscAdminPage = lazy(() => import("@/pages/wsc-admin"));
const ChainTrackLogisticsPage = lazy(() => import("@/pages/chaintrack-logistics"));
const PricingLogisticsPage = lazy(() => import("@/pages/pricing-logistics"));
const ChainTrackRoutePage = lazy(() => import("@/pages/chaintrack-route"));
const MarketingIntelPage = lazy(() => import("@/pages/marketing/intel"));
const IntelPostPage = lazy(() => import("@/pages/intel-post"));
const IntelIndexPage = lazy(() => import("@/pages/intel-index"));
const AirCharterPage = lazy(() => import("@/pages/air-charter"));
const PrivateJetPage = lazy(() => import("@/pages/private-jet"));
const DubaiRelocationGuide = lazy(() => import("@/pages/dubai-relocation-guide"));
const MiddleEastLogisticsHub = lazy(() => import("@/pages/middle-east-logistics-hub"));
const ChainTrackGradingPage = lazy(() => import("@/pages/chaintrack-grading"));
const ChainTrackSourcingPage = lazy(() => import("@/pages/chaintrack-sourcing"));
const FreightBrokerPage = lazy(() => import("@/pages/freight-broker"));
const LogisticsFunnelPage = lazy(() => import("@/pages/logistics-funnel"));
const FulfillmentByDeliWer = lazy(() => import("@/pages/fulfillment-by-deliwer"));
const BulkPurchasingPage = lazy(() => import("@/pages/bulk-purchasing"));
const MembershipPlansPage = lazy(() => import("@/pages/membership-plans"));
const RelocateExit = lazy(() => import("@/pages/relocate-exit"));
const RelocationForFounders = lazy(() => import("@/pages/relocation-for-founders"));
const RelocationChecklist = lazy(() => import("@/pages/relocation-checklist"));
const MoveInServicesDubai = lazy(() => import("@/pages/move-in-services-dubai"));
const SettlingInDubaiGuide = lazy(() => import("@/pages/settling-in-dubai-guide"));
const BrokerMoveInSupportDubai = lazy(() => import("@/pages/broker-move-in-support-dubai"));
const BrokerMasterDB = lazy(() => import("@/pages/broker-master-db"));
// AffiliateDashboardPage merged into PartnerDashboard — redirect handled below
const ExitDubaiPage = lazy(() => import("@/pages/exit-dubai"));
const MoveCheaperRentPage = lazy(() => import("@/pages/move-cheaper-rent"));
const LandlordTurnoverPage = lazy(() => import("@/pages/landlord-turnover"));
const SeoMoveInDubai = lazy(() => import("@/pages/seo-move-in-dubai"));
const MoveInAreaPage = lazy(() => import("@/pages/move-in-area"));
const SeoExitDubaiApartment = lazy(() => import("@/pages/seo-exit-dubai-apartment"));
const SeoMoveToCheaperRentDubai = lazy(() => import("@/pages/seo-move-to-cheaper-rent-dubai"));
const SeoDubaiRelocationConcierge = lazy(() => import("@/pages/seo-dubai-relocation-concierge"));
const SeoMoveApartmentDubai = lazy(() => import("@/pages/seo-move-apartment-dubai"));
const SetupPage = lazy(() => import("@/pages/setup"));
const TransactionSupportPage = lazy(() => import("@/pages/transaction-support"));

// Partner Distribution Pages
const TypingCenterPartner = lazy(() => import("@/pages/typing-center-partner"));
const BuildingPartner = lazy(() => import("@/pages/building-partner"));
const PartnerDashboard = lazy(() => import("@/pages/partner-dashboard"));
const PartnerGrowthKit = lazy(() => import("@/pages/partner-growth-kit"));
const ConciergePricingPage = lazy(() => import("@/pages/concierge-pricing-page"));

// Ejari Lead Engine Pages
const EjariCancellationDubai = lazy(() => import("@/pages/ejari-cancellation-dubai"));
const BrokerPartnerPage = lazy(() => import("@/pages/broker-partner"));
const BrokerOnboardPage = lazy(() => import("@/pages/broker-onboard"));
const PhoneFlippersPage = lazy(() => import("@/pages/phone-flippers"));
const CisElectronicsPage = lazy(() => import("@/pages/cis-electronics"));
const CisAzerbaijanPage = lazy(() => import("@/pages/cis-azerbaijan"));
const CisKazakhstanPage = lazy(() => import("@/pages/cis-kazakhstan"));
const CisUzbekistanPage = lazy(() => import("@/pages/cis-uzbekistan"));
const CisRussiaPage = lazy(() => import("@/pages/cis-russia"));
const CisGeorgiaPage = lazy(() => import("@/pages/cis-georgia"));
const CisKyrgyzstanPage = lazy(() => import("@/pages/cis-kyrgyzstan"));
const BrokerSuccessPage = lazy(() => import("@/pages/broker-success"));
const RefRedirectPage = lazy(() => import("@/pages/ref-redirect"));
const HowToRegisterEjari = lazy(() => import("@/pages/how-to-register-ejari"));
const EjariDocumentsRequired = lazy(() => import("@/pages/ejari-documents-required"));
const HowToCancelEjari = lazy(() => import("@/pages/how-to-cancel-ejari"));
const EjariTransferDubai = lazy(() => import("@/pages/ejari-transfer-dubai"));
const MovingApartmentDubaiGuide = lazy(() => import("@/pages/moving-apartment-dubai-guide"));
const MovingDubaiChecklist = lazy(() => import("@/pages/moving-dubai-checklist"));
const DubaiTenancyChecklist = lazy(() => import("@/pages/dubai-tenancy-checklist"));
const NewApartmentDubaiGuide = lazy(() => import("@/pages/new-apartment-dubai-guide"));

// Relocation Intelligence Platform Pages
const MoveDubai = lazy(() => import("@/pages/move-dubai"));
const MoveVsRenewDubai = lazy(() => import("@/pages/move-vs-renew-dubai"));
const RentIncreaseCalculatorDubai = lazy(() => import("@/pages/rent-increase-calculator-dubai"));
const AreYouOverpayingRentDubai = lazy(() => import("@/pages/are-you-overpaying-rent-dubai"));
const DubaiRentComparison = lazy(() => import("@/pages/dubai-rent-comparison"));
const DubaiMovingTrends = lazy(() => import("@/pages/dubai-moving-trends"));
const DubaiMoveScore = lazy(() => import("@/pages/dubai-move-score"));
const DubaiRentIncreaseRules = lazy(() => import("@/pages/dubai-rent-increase-rules"));
const TenancyRenewalDubaiGuide = lazy(() => import("@/pages/tenancy-renewal-dubai-guide"));

import MarketingHub from "@/pages/marketing/index";
import MarketingDashboardPage from "@/pages/marketing/dashboard";
import MarketingLeaderboard from "@/pages/marketing/leaderboard";
import MarketingPartners from "@/pages/marketing/partners";
import MarketingControl from "@/pages/marketing/control";
import MarketingLegacy from "@/pages/marketing/legacy";
import MarketingRecruit from "@/pages/marketing/recruit";
import MarketingSocial from "@/pages/marketing/social";
const MarketingAttribution = lazy(() => import("@/pages/marketing/attribution"));
const BnosDashboard = lazy(() => import("@/pages/marketing/bnos"));
const BnosCandidates = lazy(() => import("@/pages/marketing/candidates"));
const BnosZoomOnboarding = lazy(() => import("@/pages/marketing/zoom-onboarding"));
const BnosFinanceCrm = lazy(() => import("@/pages/marketing/finance-crm"));
const BnosTemplates = lazy(() => import("@/pages/marketing/templates"));
const BnosWhatsAppGen = lazy(() => import("@/pages/marketing/whatsapp-gen"));
const BnosCommission = lazy(() => import("@/pages/marketing/commission"));
const LegacyFounderDashboard = lazy(() => import("@/pages/MarketingDashboard"));
const SendGridDashboard = lazy(() => import("@/pages/sendgrid-dashboard"));
const EmergencyExitPage = lazy(() => import("@/pages/emergency-exit"));
const WartimeReadinessPage = lazy(() => import("@/pages/wartime-readiness"));
const AdminAlertsPage = lazy(() => import("@/pages/admin-alerts"));
const AdminBrokerMasterPage = lazy(() => import("@/pages/admin-broker-master"));
const FlexRentalsAdminPage = lazy(() => import("@/pages/admin/flex-rentals-admin"));
const RentAnalysisLeadsAdmin = lazy(() => import("@/pages/admin/rent-analysis-leads-admin"));
const CapturePage = lazy(() => import("@/pages/capture"));
const CaptureAdmin = lazy(() => import("@/pages/capture-admin"));
const MissedCallAdmin = lazy(() => import("@/pages/missed-call-admin"));
const HabtoorAdmin = lazy(() => import("@/pages/partner-dashboard"));
const CaptureReferrers = lazy(() => import("@/pages/capture-referrers"));
const MarketingTenantLeads = lazy(() => import("@/pages/marketing/tenant-leads"));
const MarketingTenantReferrers = lazy(() => import("@/pages/marketing/tenant-referrers"));
const ReferralEngine = lazy(() => import("@/pages/marketing/referral-engine"));
const LeaguePage = lazy(() => import("@/pages/league"));

function Router() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Domain-based routing for ChainTrack - handles both www.chaintrack.com and chaintrack.com
    const hostname = window.location.hostname;
    if ((hostname === 'logistics.chaintrack.com' || hostname === 'www.logistics.chaintrack.com') && location === '/') {
      setLocation('/logistics');
      return;
    }
    if ((hostname === 'chaintrack.chaintrack.com' || hostname === 'www.chaintrack.com' || hostname === 'chaintrack.com') && location === '/') {
      setLocation('/chaintrack');
      return;
    }
    if ((hostname === 'buy.chaintrack.com' || hostname === 'www.buy.chaintrack.com') && location === '/') {
      setLocation('/buy');
      return;
    }
    // All ChainTrack routes are chaintrack-side only — redirect deliwer.com visitors
    if (hostname === 'deliwer.com' || hostname === 'www.deliwer.com') {
      // /buy/* → buy.chaintrack.com
      if (location.startsWith('/buy')) {
        window.location.href = `https://buy.chaintrack.com${location}`;
        return;
      }
      // Auction & buy admin → buy.chaintrack.com
      if (location.startsWith('/admin/wsc') || location.startsWith('/admin/reverse-auction')) {
        window.location.href = `https://buy.chaintrack.com${location}`;
        return;
      }
      // ChainTrack info & SEO routes → chaintrack.com
      const chaintrackPaths = [
        '/chaintrack', '/chaintrack-grading', '/chaintrack-sourcing',
        '/grading', '/sourcing', '/freight-broker', '/intel',
        '/dubai-to-', '/refurbished-iphone-sourcing-dubai',
        '/dubai-cis-', '/dubai-charter-',
      ];
      if (chaintrackPaths.some(p => location === p || location.startsWith(p + '/') || location.startsWith(p + '?'))) {
        window.location.href = `https://chaintrack.com${location}`;
        return;
      }
    }
    if ((hostname === 'buy.wesellcellular.com' || hostname === 'www.buy.wesellcellular.com') && location === '/') {
      setLocation('/buy/wsc');
      return;
    }
    if ((hostname === 'buy.ktcorpworldwide.com' || hostname === 'www.buy.ktcorpworldwide.com') && location === '/') {
      setLocation('/buy/ktcorp');
      return;
    }

    // Domain-based routing for realestate.deliwer.com → Alef Linar Mamzar funnel
    if ((hostname === 'realestate.deliwer.com' || hostname === 'www.realestate.deliwer.com') && location === '/') {
      setLocation('/mamzar');
      return;
    }

    // Domain-based routing for brokers.deliwer.com → dedicated broker portal
    if ((hostname === 'brokers.deliwer.com' || hostname === 'www.brokers.deliwer.com') && location === '/') {
      setLocation('/broker-onboard');
      return;
    }

    // Domain-based routing for rentals.deliwer.com → Flex Living rentals portal
    if ((hostname === 'rentals.deliwer.com' || hostname === 'www.rentals.deliwer.com') && location === '/') {
      setLocation('/flexible-rentals');
      return;
    }

    // Domain-based routing for earn.deliwer.com → affiliate/influencer earn page
    if ((hostname === 'earn.deliwer.com' || hostname === 'www.earn.deliwer.com') && location === '/') {
      setLocation('/earn');
      return;
    }

    // Domain-based routing for move.deliwer.com → move-in services portal
    if ((hostname === 'move.deliwer.com' || hostname === 'www.move.deliwer.com') && location === '/') {
      setLocation('/move-in-services');
      return;
    }

    // Domain-based routing for ejari.deliwer.com → Ejari registration portal
    if ((hostname === 'ejari.deliwer.com' || hostname === 'www.ejari.deliwer.com') && location === '/') {
      setLocation('/ejari-registration');
      return;
    }

    // Domain-based routing for water.deliwer.com → AquaCafe water filter portal
    if ((hostname === 'water.deliwer.com' || hostname === 'www.water.deliwer.com') && location === '/') {
      setLocation('/aquacafe');
      return;
    }

    // Domain-based routing for planetheroes.deliwer.com → Planet Heroes community
    if ((hostname === 'planetheroes.deliwer.com' || hostname === 'www.planetheroes.deliwer.com') && location === '/') {
      setLocation('/community');
      return;
    }
    
    // Global referral capture — store ?ref= param from any page visit
    import("@/lib/referral").then(({ captureReferral }) => captureReferral());

    // Immediately scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location, setLocation]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/marketing" component={MarketingHub} />
        <Route path="/marketing/dashboard" component={MarketingDashboardPage} />
        <Route path="/marketing/leaderboard" component={MarketingLeaderboard} />
        <Route path="/marketing/partners" component={MarketingPartners} />
        <Route path="/marketing/control" component={MarketingControl} />
        <Route path="/marketing/recruit" component={MarketingRecruit} />
        <Route path="/marketing/intel" component={MarketingIntelPage} />
        <Route path="/marketing/social" component={MarketingSocial} />
        <Route path="/marketing/attribution" component={MarketingAttribution} />
        <Route path="/marketing/bnos" component={BnosDashboard} />
        <Route path="/marketing/candidates" component={BnosCandidates} />
        <Route path="/marketing/zoom-onboarding" component={BnosZoomOnboarding} />
        <Route path="/marketing/finance-crm" component={BnosFinanceCrm} />
        <Route path="/marketing/templates" component={BnosTemplates} />
        <Route path="/marketing/whatsapp-gen" component={BnosWhatsAppGen} />
        <Route path="/marketing/commission" component={BnosCommission} />
        <Route path="/marketing/tenant-leads" component={MarketingTenantLeads} />
        <Route path="/marketing/tenant-referrers" component={MarketingTenantReferrers} />
        <Route path="/marketing/referral-engine" component={ReferralEngine} />
        <Route path="/league" component={LeaguePage} />
        <Route path="/errand" component={ErrandPage} />
        <Route path="/marketing/legacy" component={MarketingLegacy} />
        <Route path="/marketing/legacy/affiliate-management" component={AffiliateManagement} />
        <Route path="/marketing/legacy/founder-dashboard" component={LegacyFounderDashboard} />
        <Route path="/marketing/founder-dashboard" component={LegacyFounderDashboard} />
        <Route path="/sendgrid-dashboard" component={SendGridDashboard} />
        <Route path="/emergency-exit" component={EmergencyExitPage} />
        <Route path="/wartime-readiness" component={WartimeReadinessPage} />
        <Route path="/admin/alerts" component={AdminAlertsPage} />
        <Route path="/admin/brokers" component={AdminBrokerMasterPage} />
        <Route path="/admin/flex-rentals" component={FlexRentalsAdminPage} />
        <Route path="/admin/rent-leads" component={RentAnalysisLeadsAdmin} />
        <Route path="/capture" component={CapturePage} />
        <Route path="/capture-admin" component={CaptureAdmin} />
        <Route path="/admin/missed-calls" component={MissedCallAdmin} />
        <Route path="/habtoor-admin" component={HabtoorAdmin} />
        <Route path="/capture-referrers" component={CaptureReferrers} />
        <Route path="/affiliate-dashboard"><Redirect to="/partner-dashboard" /></Route>
        <Route path="/home-access" component={HomeAccess} />
        <Route path="/finance" component={FinancePage} />
        <Route path="/mamzar" component={MamzarBeach} />
        <Route path="/mamzar-beach" component={MamzarBeach} />
        <Route path="/linar" component={MamzarBeach} />
        <Route path="/realestate" component={RealEstate} />
        <Route path="/real-estate" component={RealEstate} />
        <Route path="/damac" component={RealEstate} />
        <Route path="/" component={Landing} />
        <Route path="/start" component={StartPage} />
        <Route path="/launch" component={StartPage} />
        <Route path="/move-in-plan" component={MoveInPlan} />
        <Route path="/partner-program" component={PartnerProgram} />
        <Route path="/community-toolkit" component={CommunityToolkit} />
        <Route path="/debacci" component={DeBacciWelcome} />
        <Route path="/eglc" component={EGLCWelcome} />
        <Route path="/mytablon" component={MytablonWelcome} />
        <Route path="/tenant-move-in-checklist" component={TenantMoveInChecklist} />
        <Route path="/relocation-alliance" component={RelocationAlliance} />
        <Route path="/ejari-registration" component={EjariRegistration} />
        <Route path="/ejari-renewal" component={EjariRenewal} />
        <Route path="/virtual-ejari">
          {() => { window.location.replace("/ejari"); return null; }}
        </Route>
        <Route path="/ejari-commercial">
          {() => { window.location.replace("/ejari"); return null; }}
        </Route>
        <Route path="/ejari-for-business">
          {() => { window.location.replace("/ejari"); return null; }}
        </Route>
        <Route path="/dewa-activation" component={DewaActivation} />
        <Route path="/move-to-dubai" component={MoveToDubai} />
        <Route path="/marina-gate-move-in" component={MarinaGateMoveIn} />
        <Route path="/relocate" component={Relocate} />
        <Route path="/exit">
          {() => { window.location.replace("/exit-dubai"); return null; }}
        </Route>
        <Route path="/activate" component={ActivatePage} />
        <Route path="/move-in-packages">
          <Redirect to="/relocate" />
        </Route>
        <Route path="/move-in-services">
          <Redirect to="/relocate" />
        </Route>
        <Route path="/move-in">
          <Redirect to="/relocate" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/relocate/business-setup" component={BusinessSetupPage} />
        <Route path="/business-setup" component={BusinessSetup} />
        <Route path="/relocate/planning" component={RelocatePlanning} />
        <Route path="/relocate/arrival" component={RelocateArrival} />
        <Route path="/relocate/concierge" component={RelocateConcierge} />
        <Route path="/relocate/exit" component={RelocateExitSubpage} />
        <Route path="/relocate-exit" component={RelocateExit} />
        <Route path="/relocate-community" component={RelocateCommunity} />
        <Route path="/relocate-pricing" component={InternationalRelocationPricing} />

        {/* Residents Page */}
        <Route path="/residents" component={Residents} />
        <Route path="/maintenance-concierge" component={MaintenanceConcierge} />
        <Route path="/resident-support-concierge" component={ResidentSupportConcierge} />
        <Route path="/move-in-package" component={MoveInPackagePage} />
        <Route path="/move-out-package" component={MoveOutPackagePage} />
        <Route path="/residents/support" component={ContactPage} />
        <Route path="/residence">
          <Redirect to="/residents" />
        </Route>
        <Route path="/residence/:rest*">
          {(params: { rest?: string }) => <Redirect to={`/residents${params.rest ? '/' + params.rest : ''}`} />}
        </Route>

        {/* My Home — Flexible Rentals Module */}
        <Route path="/myhome/flexible-rentals" component={lazy(() => import("./pages/myhome/flexible-rentals"))} />
        <Route path="/myhome/shared-living" component={lazy(() => import("./pages/myhome/flexible-rentals"))} />
        <Route path="/myhome/subletting" component={lazy(() => import("./pages/myhome/flexible-rentals"))} />
        <Route path="/flexible-rentals" component={lazy(() => import("./pages/myhome/flexible-rentals"))} />
        <Route path="/flex-living" component={lazy(() => import("./pages/myhome/flexible-rentals"))} />

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
        <Route path="/reviews" component={lazy(() => import("./pages/reviews"))} />
        <Route path="/invest" component={InvestPage} />
        <Route path="/ewaste" component={EWastePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/email-campaigns" component={lazy(() => import("./pages/email-campaigns"))} />

          {/* Ecosystem Pages */}
          <Route path="/explore" component={Explore} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/community" component={CommunityPage} />
          <Route path="/impact-dashboard" component={ImpactDashboard} />
          <Route path="/home-service/aquacafe" component={AquaCafe} />
          <Route path="/aquacafe" component={AquaCafe} />
          <Route path="/home-services" component={HomeServices} />
          <Route path="/aquacafe-alliance" component={AquaCafeAlliance} />
          <Route path="/restaurant-partners" component={RestaurantPartners} />
          <Route path="/products/aquacafe" component={AquaCafeAlliance} />
          <Route path="/products" component={Products} />
        <Route path="/products/icelandic-glacial" component={IcelandicGlacialLandingPage} />
        <Route path="/icelandic-glacial" component={IcelandicGlacialLandingPage} />
        <Route path="/exchange" component={Exchange} />
        <Route path="/taf" component={TellAFriend} />
        <Route path="/earn" component={Earn} />
        <Route path="/wellness" component={Wellness} />
        <Route path="/collect" component={Collect} />
        <Route path="/redeem" component={Redeem} />
        <Route path="/play" component={Play} />
        <Route path="/rewards" component={Rewards} />
        <Route path="/partners/chaintrack" component={ChainTrackPartners} />
        <Route path="/partners/career" component={PartnersCareer} />
        <Route path="/career"><Redirect to="/partners/career" /></Route>
        <Route path="/partners/join"><Redirect to="/brokers" /></Route>
        <Route path="/join" component={JoinWelcome} />
        <Route path="/welcome" component={JoinWelcome} />
        <Route path="/invite" component={JoinWelcome} />
        <Route path="/r/:code">
          {(params) => <Redirect to={`/join?ref=${encodeURIComponent(params.code || "")}`} />}
        </Route>
        <Route path="/partners/how-it-works" component={PartnersHowItWorks} />
        <Route path="/partners/earnings" component={PartnersEarnings} />
        <Route path="/partners/resources" component={PartnersResources} />
        <Route path="/partners" component={Partners} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/ejari-dubai">
          {() => { window.location.replace("/ejari"); return null; }}
        </Route>
        <Route path="/ejari" component={lazy(() => import("./pages/ejari"))} />
        <Route path="/relocation-for-founders" component={RelocationForFounders} />
        <Route path="/dashboard" component={HeroDashboard} />
        <Route path="/investor-dashboard" component={InvestorDashboard} />
        <Route path="/corporate-partner-portal" component={CorporatePartnerPortal} />
        <Route path="/impact-methodology" component={ImpactMethodology} />
        
        {/* Planet Hero Gateway (legacy — preserved) */}
        <Route path="/planet-hero" component={PlanetHero} />
        <Route path="/planet-hero-missions" component={PlanetHeroMissions} />
        <Route path="/planet-hero-affiliates" component={PlanetHeroAffiliates} />
        <Route path="/planet-hero-manual" component={PlanetHeroManual} />

        <Route path="/environmental" component={Environmental} />
        <Route path="/leaderboard" component={Leaderboard} />
        
        
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
        
        {/* ChainTrack Logistics — Dubai/Gawadar Corridor */}
        <Route path="/logistics-funnel" component={LogisticsFunnelPage} />
        <Route path="/logistics" component={ChainTrackLogisticsPage} />
        <Route path="/pricing-logistics" component={PricingLogisticsPage} />
        <Route path="/air-charter" component={AirCharterPage} />

        {/* DeliWer Private Jet — 1FLT collaboration */}
        <Route path="/private-jet" component={PrivateJetPage} />

        {/* SEO Pillar Pages */}
        <Route path="/dubai-relocation-guide" component={DubaiRelocationGuide} />
        <Route path="/middle-east-logistics-hub" component={MiddleEastLogisticsHub} />

        {/* ChainTrack Freight Broker Network */}
        <Route path="/freight-broker" component={FreightBrokerPage} />

        {/* ChainTrack B2B Wholesale Inventory */}
        <Route path="/chaintrack" component={ChainTrackPage} />

        {/* ChainTrack Reverse Auction Portal — buy.chaintrack.com/reverse-auction */}
        <Route path="/buy/reverse-auction" component={ReverseAuctionPage} />
        {/* ChainTrack Buy Demo — public, no auth required */}
        <Route path="/buy/demo" component={BuyDemoPage} />
        {/* Unified Founder Control Room — gated by PrivateGate */}
        <Route path="/founder" component={FounderControlPage} />
        {/* ChainTrack Buy Module — buy.chaintrack.com */}
        <Route path="/buy" component={BuyChaintrackPage} />
        {/* WeSellCellular Buyer Portal — buy.wesellcellular.com */}
        <Route path="/buy/wsc" component={WscMarketplacePage} />
        {/* KT Corp Worldwide Buyer Portal — buy.ktcorpworldwide.com */}
        <Route path="/buy/ktcorp" component={KtCorpMarketplacePage} />
        {/* WSC + KT Corp Seller Admin Panel */}
        <Route path="/admin/wsc" component={WscAdminPage} />
        <Route path="/admin/reverse-auction" component={ReverseAuctionAdminPage} />
        <Route path="/admin/mamzar" component={MamzarAdminPage} />
        <Route path="/admin/broker-circle" component={BrokerCircleAdmin} />

        {/* ChainTrack Certified Grading Infrastructure */}
        <Route path="/chaintrack-grading" component={ChainTrackGradingPage} />
        <Route path="/grading" component={ChainTrackGradingPage} />

        {/* ChainTrack Remote Sourcing Marketplace */}
        <Route path="/chaintrack-sourcing" component={ChainTrackSourcingPage} />
        <Route path="/sourcing" component={ChainTrackSourcingPage} />

        {/* ChainTrack Programmatic SEO — Long-tail regional route pages */}
        <Route path="/dubai-to-baku-electronics-logistics" component={ChainTrackRoutePage} />
        <Route path="/dubai-to-almaty-electronics-cargo" component={ChainTrackRoutePage} />
        <Route path="/dubai-to-tashkent-electronics-logistics" component={ChainTrackRoutePage} />
        <Route path="/dubai-to-moscow-electronics-logistics" component={ChainTrackRoutePage} />
        <Route path="/dubai-to-gawadar-logistics" component={ChainTrackRoutePage} />
        <Route path="/refurbished-iphone-sourcing-dubai" component={ChainTrackRoutePage} />
        <Route path="/dubai-cis-electronics-logistics" component={ChainTrackRoutePage} />
        <Route path="/dubai-charter-cargo-cis" component={ChainTrackRoutePage} />
        <Route path="/intel" component={IntelIndexPage} />
        <Route path="/intel/:slug" component={IntelPostPage} />

        {/* /chaintrack-logistics → scroll to Phone Flipper onboarding on /partners */}
        <Route path="/chaintrack-logistics" component={() => {
          useEffect(() => {
            window.location.replace("/partners#phone-flipper-track");
          }, []);
          return null;
        }} />

        {/* Fulfillment by DeliWer */}
        <Route path="/fulfillment" component={FulfillmentByDeliWer} />

        {/* Bulk Purchasing — canonical slug /wholesale, legacy redirect kept */}
        <Route path="/wholesale" component={BulkPurchasingPage} />
        <Route path="/bulk-purchasing"><Redirect to="/wholesale" /></Route>

        {/* Membership Plans */}
        <Route path="/membership-plans" component={MembershipPlansPage} />
        <Route path="/relocation-to-dubai-for-founders" component={RelocationForFounders} />
        <Route path="/dubai-relocation-checklist" component={RelocationChecklist} />
        <Route path="/move-in-services-dubai" component={MoveInServicesDubai} />
        <Route path="/settling-in-dubai-guide" component={SettlingInDubaiGuide} />
        <Route path="/broker-move-in-support-dubai" component={BrokerMoveInSupportDubai} />
        <Route path="/broker-master-db" component={BrokerMasterDB} />

        {/* Relocation Concierge Funnel Pages */}
        <Route path="/exit-dubai" component={ExitDubaiPage} />
        <Route path="/move-cheaper-rent" component={MoveCheaperRentPage} />
        <Route path="/landlord-turnover" component={LandlordTurnoverPage} />

        {/* Move-In Area SEO Pages — /move-in/:area and /move-in/:area/:propertyType */}
        <Route path="/move-in/:area/:propertyType" component={MoveInAreaPage} />
        <Route path="/move-in/:area" component={MoveInAreaPage} />

        {/* SEO Landing Pages */}
        <Route path="/move-in-dubai" component={SeoMoveInDubai} />
        <Route path="/exit-dubai-apartment" component={SeoExitDubaiApartment} />
        <Route path="/move-to-cheaper-rent-dubai" component={SeoMoveToCheaperRentDubai} />
        <Route path="/dubai-relocation-concierge" component={SeoDubaiRelocationConcierge} />
        <Route path="/move-apartment-dubai" component={SeoMoveApartmentDubai} />
        <Route path="/setup" component={SetupPage} />
        <Route path="/transaction-support" component={TransactionSupportPage} />
        <Route path="/consult" component={lazy(() => import("@/pages/consult"))} />

        {/* Partner Distribution Network */}
        <Route path="/typing-center-partner" component={TypingCenterPartner} />
        <Route path="/building-partner" component={BuildingPartner} />
        <Route path="/partner-dashboard" component={PartnerDashboard} />
        <Route path="/partner-growth-kit" component={PartnerGrowthKit} />
        <Route path="/concierge-pricing" component={ConciergePricingPage} />
        <Route path="/concierge" component={ConciergePricingPage} />

        {/* /move catch-all — partner referral links use /move?ref=code */}
        <Route path="/move">
          {() => {
            const params = new URLSearchParams(window.location.search);
            const ref = params.get("ref");
            const dest = ref ? `/ejari-dubai?ref=${ref}` : "/ejari-dubai";
            window.location.replace(dest);
            return null;
          }}
        </Route>

        {/* Ejari Lead Engine */}
        <Route path="/ejari-cancellation-dubai" component={EjariCancellationDubai} />
        <Route path="/broker-partner" component={BrokerPartnerPage} />
        <Route path="/brokers" component={BrokerPartnerPage} />
        <Route path="/broker-onboard" component={BrokerOnboardPage} />
        <Route path="/broker-onboarding" component={BrokerOnboardPage} />
        <Route path="/phone-flippers" component={PhoneFlippersPage} />
        <Route path="/cis-electronics" component={CisElectronicsPage} />
        <Route path="/cis-azerbaijan" component={CisAzerbaijanPage} />
        <Route path="/cis-kazakhstan" component={CisKazakhstanPage} />
        <Route path="/cis-uzbekistan" component={CisUzbekistanPage} />
        <Route path="/cis-russia" component={CisRussiaPage} />
        <Route path="/cis-georgia" component={CisGeorgiaPage} />
        <Route path="/cis-kyrgyzstan" component={CisKyrgyzstanPage} />
        <Route path="/join-as-broker" component={BrokerOnboardPage} />
        <Route path="/broker-earn" component={BrokerOnboardPage} />
        <Route path="/broker-success" component={BrokerSuccessPage} />
        <Route path="/ref/:code" component={RefRedirectPage} />
        <Route path="/how-to-register-ejari" component={HowToRegisterEjari} />
        <Route path="/ejari-documents-required" component={EjariDocumentsRequired} />
        <Route path="/how-to-cancel-ejari" component={HowToCancelEjari} />
        <Route path="/ejari-transfer-dubai" component={EjariTransferDubai} />
        <Route path="/moving-apartment-dubai-guide" component={MovingApartmentDubaiGuide} />
        <Route path="/moving-dubai-checklist" component={MovingDubaiChecklist} />
        <Route path="/dubai-tenancy-checklist" component={DubaiTenancyChecklist} />
        <Route path="/new-apartment-dubai-guide" component={NewApartmentDubaiGuide} />

        {/* Relocation Intelligence Platform */}
        <Route path="/move-dubai" component={MoveDubai} />
        <Route path="/move-vs-renew-dubai" component={MoveVsRenewDubai} />
        <Route path="/rent-increase-calculator-dubai" component={RentIncreaseCalculatorDubai} />
        <Route path="/are-you-overpaying-rent-dubai" component={AreYouOverpayingRentDubai} />
        <Route path="/dubai-rent-comparison" component={DubaiRentComparison} />
        <Route path="/dubai-moving-trends" component={DubaiMovingTrends} />
        <Route path="/dubai-move-score" component={DubaiMoveScore} />
        <Route path="/dubai-rent-increase-rules" component={DubaiRentIncreaseRules} />
        <Route path="/tenancy-renewal-dubai-guide" component={TenancyRenewalDubaiGuide} />

        {/* Convenience URL aliases */}
        <Route path="/leave-dubai">
          {() => { window.location.replace("/exit-dubai"); return null; }}
        </Route>
        <Route path="/move-cheaper-rent-dubai">
          {() => { window.location.replace("/move-cheaper-rent"); return null; }}
        </Route>
        <Route path="/moving-apartment-dubai">
          {() => { window.location.replace("/moving-apartment-dubai-guide"); return null; }}
        </Route>

        <Route component={NotFound} />
        </Switch>
      </Suspense>
  );
}

import { WhatsAppSticky } from "@/components/whatsapp-sticky";
import { PrivateGate } from "@/components/private-gate";

function MainShell({ children }: { children: React.ReactNode }) {
  const [navHeight, setNavHeight] = useState(140);

  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const update = () => setNavHeight(nav.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main style={{ paddingTop: navHeight }}>
      <PrivateGate>{children}</PrivateGate>
    </main>
  );
}

const MAMZAR_PATHS = ["/mamzar", "/mamzar-beach", "/linar"];
const STANDALONE_PATHS = ["/community"];

function AppChrome() {
  const [location] = useLocation();
  const isMamzar = MAMZAR_PATHS.some(p => location === p || location.startsWith(p + "/"));
  const isStandalone = STANDALONE_PATHS.some(p => location === p || location.startsWith(p + "/"));

  if (isMamzar || isStandalone) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Router />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <StickyNeonHeadline />
      <Navigation />
      <MainShell>
        <Router />
      </MainShell>
      <Footer />
      <WhatsAppSticky />
      <FloatingErrandTips />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppChrome />
        <Toaster />
        <TooltipManager />
        <ImagePerformanceMonitor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
