import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { 
  Home, Star, Zap, Heart, Trophy,
  Users, Droplets, Leaf, MapPin, Clock, Phone, Gift, 
  CheckCircle, ShoppingCart, Smartphone,
  Crown, Recycle,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DubaiWellnessJourney } from "@/components/dubai-wellness-journey";
import { shopifyCartService } from "@/lib/shopify-cart";
import aquacafeLogo from "@assets/AquaCafe_Logo_1756289482990.png";
import earnHeroBanner from "@assets/banner_1776801988936.jpg";
import bakersKitchenLogo from "@assets/BK_Logo_1756289175349.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";

export default function Earn() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const handleOrderStarterKit = async () => {
    setIsOrderLoading(true);
    try {
      const starterKitProduct = {
        id: "aquacafe-starter-kit",
        variantId: "aquacafe-starter-kit-loyalty-gateway",
        title: "AquaCafe Planet Hero Starter Kit - Loyalty Gateway",
        variant: "Standard",
        price: 99,
        quantity: 1,
        image: "/aquacafe_shower_main_1755270492134.jpg",
      };
      
      await shopifyCartService.addToCart(starterKitProduct);
      
      toast({
        title: "Added to Cart!",
        description: "AquaCafe Loyalty Starter Kit (AED 99) - Your gateway to sustainability rewards",
      });
      
      setLocation('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950">
      {/* ── Earn Submenu — sits in normal flow directly above the hero ── */}
      {/* Positioned right below the global nav (TopBanner + Navigation + Trust Strip)
          and above the hero. Not sticky, so the hero is fully visible and never hidden.
          Top padding compensates for the fixed global nav height. */}
      <nav className="relative z-30 w-full bg-slate-950/95 backdrop-blur border-y border-emerald-500/30 shadow-lg pt-[40px] sm:pt-[50px]" data-testid="earn-submenu">
        <div className="max-w-7xl mx-auto px-3 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'section-bundle', label: 'Bundle', icon: Gift },
              { id: 'section-tradein', label: 'Trade-In', icon: Smartphone },
              { id: 'section-partners', label: 'Partners', icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/60 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
                  data-testid={`submenu-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Consolidated Hero — Say No To Plastic + AquaCafe Loyalty Career Path */}
      {/* Hero now sits cleanly below the submenu — no negative margin, fully visible */}
      <section className="w-full relative overflow-hidden" data-testid="earn-hero-section">
        {/* Hero banner image (kept) */}
        <div className="relative w-full">
          <img
            src={earnHeroBanner}
            alt="Say No To Plastic — Dubai sustainability through AquaCafe by DeliWer"
            className="w-full h-[420px] sm:h-[520px] md:h-[600px] object-cover"
            data-testid="img-earn-hero-banner"
          />
          {/* Dark/teal overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/55 to-emerald-950/85" />

          {/* Hero content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur text-emerald-200 px-4 sm:px-5 py-2 rounded-full mb-5 border border-emerald-300/40 font-bold text-xs sm:text-sm uppercase tracking-widest">
                <Leaf className="w-4 h-4" />
                Say No To Plastic
                <Leaf className="w-4 h-4" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-5 leading-[1.05] drop-shadow-2xl">
                Say No To Plastic.
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">Lunch is on us.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-7 max-w-3xl mx-auto leading-relaxed drop-shadow">
                <strong className="text-white">AquaCafe by DeliWer</strong> is more than a deal — it's a{" "}
                <strong className="text-emerald-300">loyalty member network</strong> with a clear career path.
                Start with <strong className="text-amber-300">Kangen Water home services</strong> as your gateway,
                graduate into Move-in &amp; Setup home services, and earn lifetime rewards at every step.
              </p>

              {/* Career path strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto mb-7">
                <CareerStep n="1" label="Starter Kit" sub="AED 99 · Kangen Water" tone="emerald" icon={Droplets} />
                <CareerStep n="2" label="Home Services" sub="Move-in · Water Setup" tone="cyan" icon={Home} />
                <CareerStep n="3" label="Earn DXBs" sub="Trade-ins · Referrals" tone="blue" icon={Star} />
                <CareerStep n="4" label="Career Tier" sub="Voucher + Rewards" tone="amber" icon={Crown} />
              </div>

              {/* Primary + Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
                <a
                  href={`https://wa.me/971523946311?text=${encodeURIComponent(
                    "Hi DeliWer! I'd like to order the AquaCafe AED 99 Starter Kit and join the Loyalty Network — please get me started."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-wa-order-starter-kit"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe57] text-white px-7 py-4 rounded-full text-base sm:text-lg font-black shadow-2xl transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Order AED 99 Starter Kit on WhatsApp
                </a>
                <Button
                  size="lg"
                  onClick={handleOrderStarterKit}
                  disabled={isOrderLoading}
                  data-testid="button-order-starter-kit-hero"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur font-bold px-7 py-4 text-base sm:text-lg rounded-full disabled:opacity-50"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {isOrderLoading ? "Adding…" : "Add to Cart"}
                </Button>
              </div>

              <div className="text-xs sm:text-sm text-slate-300">
                Includes FREE Ionic Shower Filter · Membership Card · 1,000 Welcome DXBs ·{" "}
                <span className="text-amber-300 font-semibold">AED 1,000+ lifetime value</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ⭐ PROMOTED: AquaCafe Loyalty Bundle — standalone section directly below hero */}
      <section id="section-bundle" className="w-full py-12 px-4 bg-gradient-to-br from-slate-950 to-emerald-950/40 border-y border-emerald-500/20 scroll-mt-[200px]" data-testid="aquacafe-loyalty-bundle-section">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900/70 to-emerald-900/40 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-2xl" data-testid="loyalty-bundle-section">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full mb-3 border border-amber-400/40 text-xs sm:text-sm font-bold uppercase tracking-widest">
              <Gift className="w-4 h-4" />
              AquaCafe Loyalty Bundle · AED 1,000+ value
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              One AED 99 Kit. <span className="text-emerald-400">Three Lifetime Benefits.</span>
            </h3>
            <p className="text-gray-300 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
              Join the water track and unlock the referral system — every friend you bring earns you both rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-cyan-500/40 flex gap-3" data-testid="bundle-card-shower">
              <img src={showerFilterCollage} alt="Free Ionic Shower Filter" className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0" data-testid="image-shower-filter" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <Badge className="bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0">AED 399</Badge>
                </div>
                <h4 className="text-base font-bold text-white leading-tight">FREE Ionic Shower Filter</h4>
                <p className="text-xs text-gray-400 mt-1">Beauty & skincare filtration</p>
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-4 border border-blue-500/40 flex gap-3" data-testid="bundle-card-membership">
              <img src={membershipCard} alt="AquaCafe Membership Card" className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0" data-testid="image-membership-card" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Crown className="w-4 h-4 text-blue-400" />
                  <Badge className="bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0">AED 299</Badge>
                </div>
                <h4 className="text-base font-bold text-white leading-tight">Membership Card & Setup</h4>
                <p className="text-xs text-gray-400 mt-1">Pro install + lifetime support</p>
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-4 border border-amber-500/40 flex gap-3" data-testid="bundle-card-voucher">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Utensils className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <Badge className="bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0">Per referral</Badge>
                </div>
                <h4 className="text-base font-bold text-white leading-tight">AED 100 Chill &amp; Grill Voucher</h4>
                <p className="text-xs text-gray-400 mt-1">+ FREE filter for every friend</p>
              </div>
            </div>
          </div>

          {/* Unified 3-Step Loyalty Journey — Join · Earn · Redeem */}
          <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-5 border border-emerald-500/30 mb-6" data-testid="loyalty-journey-consolidated">
            <h4 className="text-sm sm:text-base font-bold text-white text-center mb-4 uppercase tracking-wider">
              Simple 3-Step Loyalty Journey
            </h4>
            <div className="grid md:grid-cols-3 gap-3 items-stretch">
              <div className="flex md:flex-col items-center md:text-center gap-3" data-testid="journey-step-join">
                <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-black text-blue-400">1</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white">Join</h5>
                  <p className="text-gray-400 text-xs mt-0.5">AED 99 kit · FREE filter · 1,000 DXBs</p>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:text-center gap-3 md:border-l md:border-r md:border-white/10 md:px-3" data-testid="journey-step-earn">
                <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-black text-emerald-400">2</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white">Earn</h5>
                  <p className="text-gray-400 text-xs mt-0.5">Trade-ins, referrals & purchases</p>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:text-center gap-3" data-testid="journey-step-redeem">
                <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-black text-amber-400">3</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white">Redeem</h5>
                  <p className="text-gray-400 text-xs mt-0.5">Vouchers · meals · iPhones · water</p>
                </div>
              </div>
            </div>
          </div>

          <WaterTrackJoinForm />
        </div>
      </section>
      {/* ⭐ Unified: iPhone Trade-In × Circular Economy Hub */}
      <section id="section-tradein" className="w-full py-16 px-4 bg-gradient-to-br from-blue-900/30 via-emerald-900/20 to-cyan-900/30 scroll-mt-[200px]" data-testid="circle-dubai-tradein">
        <div className="max-w-7xl mx-auto">
          {/* ── UNIFIED HERO: iPhone Trade-In × Circular Economy Hub ── */}
          <div className="text-center mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/60 via-slate-900/60 to-emerald-900/60 border-2 border-emerald-500/40 p-8 sm:p-12" data-testid="tradein-circular-hub-hero">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12)_0%,transparent_70%)]"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/50 text-xs sm:text-sm font-bold">
                  <Recycle className="w-4 h-4" />
                  INSPIRED BY THE CIRCLE DUBAI
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/50 text-xs sm:text-sm font-bold">
                  <Gift className="w-4 h-4" />
                  AQUACAFE LOYALTY GATEWAY
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                iPhone Trade-In × <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Flipping</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
                Dubai's unified sustainability platform — trade your old iPhone for up to <strong className="text-emerald-400">5,000 DXBs</strong>, unlock water filtration commerce, and earn continuous rewards through the AED 99 Starter Kit.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <Badge className="bg-amber-500/30 text-amber-300 px-4 py-2 text-base font-bold border border-amber-500/50">
                  <Crown className="w-4 h-4 mr-2" />
                  Lifetime Membership
                </Badge>
                <span className="text-2xl font-black text-white hidden sm:inline">→</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">AED 1,000+ Value</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  onClick={handleOrderStarterKit}
                  disabled={isOrderLoading}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black px-8 py-6 text-lg sm:text-xl shadow-2xl rounded-full border-2 border-white/20 disabled:opacity-50"
                  data-testid="button-order-starter-kit-hero"
                >
                  <Zap className="w-6 h-6 mr-2" />
                  {isOrderLoading ? "ADDING TO CART..." : "START JOURNEY · AED 99"}
                </Button>
                <Link
                  href="/exchange"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black px-8 py-6 text-lg sm:text-xl shadow-2xl rounded-full border-2 border-white/20"
                  data-testid="button-tradein-hero"
                >
                  <Smartphone className="w-6 h-6" />
                  TRADE IN iPHONE
                </Link>
              </div>
              <p className="text-gray-400 mt-3 text-xs sm:text-sm">
                Join thousands of Dubai residents building a sustainable future
              </p>
            </div>
          </div>

          {/* ── UNIFIED iPhone Trade-In Hub: Concepts + How-It-Works in ONE card ── */}
          <div className="bg-slate-800/50 rounded-2xl border border-blue-500/30 overflow-hidden" data-testid="tradein-hub-unified">
            {/* Concepts row */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-6">
              <div className="flex gap-3" data-testid="hub-concept-value">
                <Smartphone className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-sm">Check iPhone Value</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Instant valuation + DXB rewards.</p>
                  <Link
                    href="/exchange"
                    className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 text-xs font-bold mt-1"
                    data-testid="button-check-value"
                  >
                    Get Instant Quote →
                  </Link>
                </div>
              </div>

              <div className="flex gap-3 md:border-l md:border-r md:border-white/10 md:px-6" data-testid="hub-concept-impact">
                <Leaf className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-sm">Environmental Impact</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Prevents e-waste · recovers metals · powers the circular economy.</p>
                </div>
              </div>

              <div className="flex gap-3" data-testid="hub-concept-multipliers">
                <Zap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-sm">DXB Multipliers</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <Badge className="bg-blue-500/30 text-blue-300 px-2 py-0 text-[10px]">L2: 2X</Badge>
                    <Badge className="bg-purple-500/30 text-purple-300 px-2 py-0 text-[10px]">L3: 2.5X</Badge>
                    <Badge className="bg-amber-500/30 text-amber-300 px-2 py-0 text-[10px]">L4: 3X</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider with title */}
            <div className="bg-slate-900/40 border-t border-blue-500/20 px-5 sm:px-6 py-3 text-center">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                📱 How iPhone Trade-In Works
              </h4>
            </div>

            {/* How-it-works steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6">
              {[
                { n: 1, ring: 'bg-blue-500/20 border-blue-500/40', text: 'text-blue-400', title: 'Get Quote', desc: 'Select model & condition' },
                { n: 2, ring: 'bg-cyan-500/20 border-cyan-500/40', text: 'text-cyan-400', title: 'Ship or Drop-off', desc: 'Free pickup or visit us' },
                { n: 3, ring: 'bg-emerald-500/20 border-emerald-500/40', text: 'text-emerald-400', title: 'Verification', desc: 'We inspect your device' },
                { n: 4, ring: 'bg-purple-500/20 border-purple-500/40', text: 'text-purple-400', title: 'Get Rewarded', desc: 'Instant DXBs + credit' },
              ].map((s) => (
                <div key={s.n} className="flex md:flex-col items-center md:text-center gap-2.5">
                  <div className={`w-9 h-9 ${s.ring} border rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-sm font-black ${s.text}`}>{s.n}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-bold text-xs sm:text-sm">{s.title}</h5>
                    <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Partnership Section */}
      <section id="section-partners" className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 relative overflow-hidden scroll-mt-[200px]" data-testid="partnership-hero" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="flex flex-col items-center">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe by DeliWer Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Water Filtration
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-emerald-500">×</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Chill & Grill Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Healthy Dining
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Earn DXBs Through Our Partnership Network
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              AquaCafe + Chill & Grill: The perfect synergy of pure water and wholesome nutrition for earning rewards
            </p>
            
            <Link
              href="/aquacafe"
              className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 text-base font-bold rounded-xl shadow-lg transition-all"
              data-testid="button-join-partnership"
            >
              <ShoppingCart className="mr-3 w-5 h-5 inline" />
              Join Partnership Program
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">AquaCafe Rewards</h3>
                    <p className="text-cyan-600 text-sm font-semibold">Earn DXBs with every purchase</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Starter Kit: 1,000 DXBs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Filter refills: 200 DXBs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>System upgrade: 500 DXBs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Referrals: 500 DXBs each</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Chill & Grill Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Chill & Grill Perks</h3>
                    <p className="text-amber-600 text-sm font-semibold">Redeem DXBs for dining vouchers</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>AED 100 voucher</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Kangen Water demos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Special events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Member discounts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-200 shadow-lg inline-block">
              <div className="text-amber-600 font-bold text-base sm:text-lg mb-2">Visit Chill & Grill Clover Bay Tower, Business Bay</div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Clover Bay Tower, Business Bay Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Open Daily 9AM-11PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dubai Wellness Journey Passport */}
      <DubaiWellnessJourney 
        variant="aquacafe"
        showMembershipCTA={true}
        onMembershipSignup={() => {
          toast({
            title: "Unlock All Locations",
            description: "Get the AquaCafe starter kit to unlock exclusive access to all wellness locations!",
          });
          window.location.href = '/aquacafe';
        }}
      />
      {/* CTA Footer */}
      <footer className="w-full border-t border-emerald-200 mt-8 bg-gradient-to-r from-emerald-50 to-cyan-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Earning?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of Planet Heroes earning rewards while making Dubai more sustainable
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/exchange"
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-exchange"
              >
                <Smartphone className="inline w-5 h-5 mr-2" />
                Trade Your iPhone
              </Link>
              <Button
                onClick={handleOrderStarterKit}
                disabled={isOrderLoading}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg"
                data-testid="footer-cta-aquacafe"
              >
                <Droplets className="inline w-5 h-5 mr-2" />
                {isOrderLoading ? "Adding..." : "Get Starter Kit"}
              </Button>
              <Link
                href="/collect"
                className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-play"
              >
                <Trophy className="inline w-5 h-5 mr-2" />
                Play & Earn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const TONE_MAP: Record<string, { ring: string; bg: string; text: string; iconBg: string }> = {
  emerald: { ring: "ring-emerald-300/40", bg: "bg-emerald-500/15", text: "text-emerald-200", iconBg: "bg-emerald-500/30" },
  cyan:    { ring: "ring-cyan-300/40",    bg: "bg-cyan-500/15",    text: "text-cyan-200",    iconBg: "bg-cyan-500/30" },
  blue:    { ring: "ring-blue-300/40",    bg: "bg-blue-500/15",    text: "text-blue-200",    iconBg: "bg-blue-500/30" },
  amber:   { ring: "ring-amber-300/40",   bg: "bg-amber-500/15",   text: "text-amber-200",   iconBg: "bg-amber-500/30" },
};

function WaterTrackJoinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi DeliWer! I'd like to join the AquaCafe by DeliWer Water Track Loyalty Network.
%0A%0A*Name:* ${name || "—"}
%0A*Phone:* ${phone || "—"}
%0A*Area:* ${area || "—"}
%0A%0APlease send me the AED 99 Starter Kit (FREE Ionic Shower Filter + Membership Card + 1,000 Welcome DXBs) and activate my referral link.`;
    window.open(`https://wa.me/971523946311?text=${message}`, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="form-water-track-join"
      className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border border-emerald-400/40"
    >
      <div className="flex items-center gap-2 mb-3">
        <Phone className="w-4 h-4 text-emerald-300" />
        <div className="text-sm sm:text-base font-bold text-white">
          Join the Water Track — submit on WhatsApp
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-2 mb-3">
        <input
          type="text"
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="input-join-name"
          className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-400"
        />
        <input
          type="tel"
          required
          placeholder="WhatsApp number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          data-testid="input-join-phone"
          className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-400"
        />
        <input
          type="text"
          required
          placeholder="Area in Dubai"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          data-testid="input-join-area"
          className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>
      <button
        type="submit"
        data-testid="button-submit-join-water-track"
        className="w-full inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe57] text-white font-black px-6 py-3 rounded-full text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02]"
      >
        <Phone className="w-4 h-4 mr-2" />
        Submit & Open WhatsApp · AED 99
      </button>
      <p className="text-[11px] text-slate-400 mt-2 text-center">
        We'll confirm your starter kit, install slot, and referral link by WhatsApp.
      </p>
    </form>
  );
}

function CareerStep({
  n,
  label,
  sub,
  tone,
  icon: Icon,
}: {
  n: string;
  label: string;
  sub: string;
  tone: keyof typeof TONE_MAP;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const t = TONE_MAP[tone];
  return (
    <div className={`relative ${t.bg} backdrop-blur rounded-xl p-3 ring-1 ${t.ring} text-left`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className={`w-7 h-7 rounded-lg ${t.iconBg} flex items-center justify-center font-black text-white text-xs`}>
          {n}
        </div>
        <Icon className={`w-4 h-4 ${t.text}`} />
      </div>
      <div className="text-sm font-bold text-white leading-tight">{label}</div>
      <div className={`text-[11px] ${t.text} mt-0.5`}>{sub}</div>
    </div>
  );
}
