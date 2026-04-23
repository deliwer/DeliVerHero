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
import { Suspense, useEffect, lazy } from "react";
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
const MoveToDubai = lazy(() => import("@/pages/move-to-dubai"));
const MarinaGateMoveIn = lazy(() => import("@/pages/marina-gate-move-in"));
const AffiliateManagement = lazy(() => import("@/pages/affiliate-management"));
const PartnerProgram = lazy(() => import("@/pages/partner-program"));
const CommunityToolkit = lazy(() => import("@/pages/community-toolkit"));
const DeBacciWelcome = lazy(() => import("@/pages/partners/debacci-welcome"));
const EGLCWelcome = lazy(() => import("@/pages/partners/eglc-welcome"));
const MytablonWelcome = lazy(() => import("@/pages/partners/mytablon-welcome"));
const PartnersJoin = lazy(() => import("@/pages/partners/join"));
const JoinWelcome = lazy(() => import("@/pages/join"));
const PartnersHowItWorks = lazy(() => import("@/pages/partners/how-it-works"));
const PartnersEarnings = lazy(() => import("@/pages/partners/earnings"));
const PartnersResources = lazy(() => import("@/pages/partners/resources"));
const PartnersCareer = lazy(() => import("@/pages/partners/career"));
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
const RestaurantPartners = lazy(() => import("@/pages/restaurant-partners"));
const Products = lazy(() => import("@/pages/products"));
const IcelandicGlacialLandingPage = lazy(() => import("@/pages/icelandic-glacial"));
const Exchange = lazy(() => import("@/pages/exchange"));
const Earn = lazy(() => import("@/pages/earn"));
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
const AffiliateDashboardPage = lazy(() => import("@/pages/affiliate-dashboard"));
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
const LegacyFounderDashboard = lazy(() => import("@/pages/MarketingDashboard"));
const SendGridDashboard = lazy(() => import("@/pages/sendgrid-dashboard"));
const EmergencyExitPage = lazy(() => import("@/pages/emergency-exit"));
const WartimeReadinessPage = lazy(() => import("@/pages/wartime-readiness"));
const AdminAlertsPage = lazy(() => import("@/pages/admin-alerts"));

function Router() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Domain-based routing for ChainTrack - handles both www.chaintrack.com and chaintrack.com
    const hostname = window.location.hostname;
    if ((hostname === 'www.chaintrack.com' || hostname === 'chaintrack.com') && location === '/') {
      setLocation('/chaintrack');
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
        <Route path="/marketing/social" component={MarketingSocial} />
        <Route path="/marketing/attribution" component={MarketingAttribution} />
        <Route path="/errand" component={ErrandPage} />
        <Route path="/marketing/legacy" component={MarketingLegacy} />
        <Route path="/marketing/legacy/affiliate-management" component={AffiliateManagement} />
        <Route path="/marketing/legacy/founder-dashboard" component={LegacyFounderDashboard} />
        <Route path="/marketing/founder-dashboard" component={LegacyFounderDashboard} />
        <Route path="/sendgrid-dashboard" component={SendGridDashboard} />
        <Route path="/emergency-exit" component={EmergencyExitPage} />
        <Route path="/wartime-readiness" component={WartimeReadinessPage} />
        <Route path="/admin/alerts" component={AdminAlertsPage} />
        <Route path="/affiliate-dashboard" component={AffiliateDashboardPage} />
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
          <Route path="/community" component={Leaderboard} />
          <Route path="/impact-dashboard" component={ImpactDashboard} />
          <Route path="/home-service/aquacafe" component={AquaCafe} />
          <Route path="/aquacafe" component={AquaCafe} />
          <Route path="/home-services" component={AquaCafeAlliance} />
          <Route path="/aquacafe-alliance" component={AquaCafeAlliance} />
          <Route path="/restaurant-partners" component={RestaurantPartners} />
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
        <Route path="/partners/career" component={PartnersCareer} />
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
        <Route path="/ejari-dubai" component={lazy(() => import("./pages/ejari-dubai"))} />
        <Route path="/ejari" component={lazy(() => import("./pages/ejari-dubai"))} />
        <Route path="/relocation-for-founders" component={RelocationForFounders} />
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-dubai-gradient">
          <StickyNeonHeadline />
          <Navigation />
          <main className="pt-[100px]">
            <Router />
          </main>
          <Footer />
          <WhatsAppSticky />
          <FloatingErrandTips />
          <BackToTop />
        </div>
        <Toaster />
        <TooltipManager />
        <ImagePerformanceMonitor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
