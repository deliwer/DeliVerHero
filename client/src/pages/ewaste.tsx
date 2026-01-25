import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Recycle, 
  Globe, 
  Shield, 
  ArrowRight,
  Droplets,
  Cpu,
  Smartphone,
  TrendingUp,
  Building2,
  Users2,
  Truck,
  Leaf,
  ShoppingBag,
  Gift,
  LayoutGrid,
  ArrowUpRight,
  Target,
  CalendarCheck,
  Sofa,
  Tv,
  RefrigeratorIcon,
  WashingMachine,
  Coins,
  BadgePercent,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  Timer
} from "lucide-react";
import { Link } from "wouter";
import ewasteHeroImg from "@/assets/images/ewaste-hero.jpg";
import planetHeroesImg from "@/assets/images/planet-heroes.jpg";
import furnitureBgImg from "@/assets/images/furniture-bg.jpg";
import electronicsBgImg from "@/assets/images/electronics-bg.jpg";

export default function EWastePage() {
  const whatsappPickupMessage = (type: string, area: string) => {
    const message = `Hi DeliWer, I'd like to schedule a FREE pickup for my ${type} items.

Area Type: ${area}
Item Details: [Please describe your items]

I'm interested in:
- Trade-in value/cash payment
- AquaCafe bundle discount
- Filter exchange rewards

Please confirm pickup availability.`;
    return `https://wa.me/971523946311?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Hero Section - Trade-In Focus */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 scale-105"
          style={{ backgroundImage: `url(${ewasteHeroImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl py-24">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            <span className="text-white">Your Trash.</span><br />
            <span className="bg-gradient-to-r from-[#FFC845] via-emerald-400 to-[#FFC845] bg-clip-text text-transparent">Our Treasure.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
            Turn old furniture and electronics into cash. Free pickup across Dubai.
          </p>

          {/* Main CTA Cards with Background Images */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Furniture Collection */}
            <a 
              href={whatsappPickupMessage("Furniture", "Municipality/Freehold")}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              data-testid="card-furniture-pickup"
            >
              <div className="relative h-72 rounded-3xl overflow-hidden cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${furnitureBgImg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFC845]/20 flex items-center justify-center">
                      <Sofa className="w-5 h-5 text-[#FFC845]" />
                    </div>
                    <span className="px-3 py-1 bg-[#FFC845]/20 text-[#FFC845] text-xs font-bold rounded-full">Up to AED 500</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Furniture</h3>
                  <Button className="w-full bg-[#FFC845] hover:bg-[#e6b43d] text-slate-950 font-bold h-12 rounded-xl gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Schedule Pickup
                  </Button>
                </div>
              </div>
            </a>

            {/* Electronics Collection */}
            <a 
              href={whatsappPickupMessage("Electronics", "Municipality/Freehold")}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              data-testid="card-electronics-pickup"
            >
              <div className="relative h-72 rounded-3xl overflow-hidden cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${electronicsBgImg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Tv className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Up to AED 300</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Electronics</h3>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Schedule Pickup
                  </Button>
                </div>
              </div>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFC845]" />
              <span>All Dubai</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-400" />
              <span>24-48hr Pickup</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32 space-y-32">
        
        {/* Trade-In Rewards Section - THE MAIN USP */}
        <div className="relative">
          <div className="absolute -inset-20 bg-gradient-to-r from-[#FFC845]/10 via-emerald-500/10 to-blue-500/10 blur-[100px] rounded-full opacity-50" />
          
          <div className="relative text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFC845]/20 to-emerald-500/20 border border-[#FFC845]/30 rounded-full text-[#FFC845] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <Award className="w-4 h-4" />
              Exclusive Rewards Program
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              Trade In.<br /><span className="text-emerald-400">Cash Out.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose how you want to be rewarded for your contribution to Dubai's circular economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Instant Cash */}
            <Card className="bg-slate-900/60 border border-[#FFC845]/20 hover:border-[#FFC845]/40 p-8 rounded-3xl transition-all group" data-testid="reward-cash">
              <div className="w-16 h-16 rounded-2xl bg-[#FFC845]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Coins className="w-8 h-8 text-[#FFC845]" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">Instant Cash</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get paid on the spot when we collect. Working items fetch premium prices.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Working Appliances</span>
                  <span className="text-[#FFC845] font-bold">Up to AED 500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Furniture (Good)</span>
                  <span className="text-[#FFC845] font-bold">Up to AED 400</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Electronics</span>
                  <span className="text-[#FFC845] font-bold">Up to AED 300</span>
                </div>
              </div>
            </Card>

            {/* AquaCafe Credits */}
            <Card className="bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/40 p-8 rounded-3xl transition-all group relative overflow-hidden" data-testid="reward-aquacafe">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Best Value</span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">AquaCafe Bundle</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Trade in items for credits toward AquaCafe water systems. Get 150% value boost!
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">AquaCafe Starter</span>
                  <span className="text-emerald-400 font-bold">50% off setup</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monthly Filters</span>
                  <span className="text-emerald-400 font-bold">3 months free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Trade-in Bonus</span>
                  <span className="text-emerald-400 font-bold">+50% value</span>
                </div>
              </div>
            </Card>

            {/* Filter Exchange */}
            <Card className="bg-slate-900/60 border border-blue-500/20 hover:border-blue-500/40 p-8 rounded-3xl transition-all group" data-testid="reward-filters">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Recycle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">Filter Rewards</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Earn filter credits for every item collected. Never pay for replacements again.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Per Working Item</span>
                  <span className="text-blue-400 font-bold">2 filter credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Per Recycled Item</span>
                  <span className="text-blue-400 font-bold">1 filter credit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Referral Bonus</span>
                  <span className="text-blue-400 font-bold">+3 credits each</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Collection Areas */}
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 p-10 rounded-3xl" data-testid="area-municipality">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">Municipality Areas</h3>
                <p className="text-gray-500 text-sm">Deira, Bur Dubai, Karama, Satwa</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We coordinate with Dubai Municipality for compliant collection and proper resource recovery certification.
            </p>
            <a 
              href={whatsappPickupMessage("Furniture/Electronics", "Municipality Area")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-municipality-pickup"
            >
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl gap-2">
                <MessageCircle className="w-5 h-5" />
                Schedule Municipality Pickup
              </Button>
            </a>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 p-10 rounded-3xl" data-testid="area-freehold">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#FFC845]/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-[#FFC845]" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">Freehold Communities</h3>
                <p className="text-gray-500 text-sm">Marina, JBR, Downtown, JLT, Springs</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Private collection service for freehold communities. Building management coordination included.
            </p>
            <a 
              href={whatsappPickupMessage("Furniture/Electronics", "Freehold Community")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-freehold-pickup"
            >
              <Button className="w-full bg-[#FFC845] hover:bg-[#e6b43d] text-slate-950 font-bold h-12 rounded-xl gap-2">
                <MessageCircle className="w-5 h-5" />
                Schedule Freehold Pickup
              </Button>
            </a>
          </Card>
        </div>

        {/* What We Accept */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12 text-white">
            What We <span className="text-emerald-400">Collect</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Sofa, label: "Sofas & Chairs", value: "Up to AED 400" },
              { icon: Tv, label: "TVs & Monitors", value: "Up to AED 200" },
              { icon: RefrigeratorIcon, label: "Fridges & ACs", value: "Up to AED 500" },
              { icon: WashingMachine, label: "Washers & Dryers", value: "Up to AED 350" },
              { icon: Smartphone, label: "Phones & Tablets", value: "Up to AED 300" },
              { icon: Cpu, label: "Computers", value: "Up to AED 250" },
              { icon: LayoutGrid, label: "Office Furniture", value: "Up to AED 450" },
              { icon: Gift, label: "Home Appliances", value: "Up to AED 150" }
            ].map((item, i) => (
              <Card key={i} className="bg-slate-900/40 border border-white/5 hover:border-white/20 p-6 rounded-2xl transition-all group" data-testid={`item-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                <item.icon className="w-8 h-8 text-gray-500 group-hover:text-emerald-400 transition-colors mx-auto mb-3" />
                <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                <div className="text-xs text-[#FFC845]">{item.value}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* AquaCafe Cross-Sell */}
        <div className="relative">
          <div className="absolute -inset-10 bg-emerald-500/10 blur-[100px] rounded-full" />
          
          <Card className="relative bg-gradient-to-br from-emerald-900/40 to-slate-900/60 border border-emerald-500/30 p-12 rounded-[3rem] overflow-hidden" data-testid="section-aquacafe-bundle">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
                  <Sparkles className="w-4 h-4" />
                  Bundle & Save
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                  Trade In +<br /><span className="text-emerald-400">AquaCafe</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Combine your trade-in value with our AquaCafe water system. Get premium atmospheric water generation with massive savings.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>50% off AquaCafe setup with any trade-in</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>3 months free filter replacements</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Priority pickup scheduling</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href={whatsappPickupMessage("Trade-in for AquaCafe Bundle", "Any Area")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-aquacafe-bundle"
                  >
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider h-14 px-8 rounded-2xl gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Get Bundle Deal
                    </Button>
                  </a>
                  <Link href="/aquacafe">
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-bold h-14 px-8 rounded-2xl">
                      Learn About AquaCafe
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-black text-emerald-400 mb-2">AED 999</div>
                    <div className="text-gray-500 line-through text-lg">AED 1,999</div>
                    <div className="text-[#FFC845] font-bold mt-2">With Trade-In Bundle</div>
                  </div>
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">AquaCafe Unit</span>
                      <span className="text-white font-bold">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Installation</span>
                      <span className="text-emerald-400 font-bold">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">3 Month Filters</span>
                      <span className="text-emerald-400 font-bold">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trade-in Credit</span>
                      <span className="text-[#FFC845] font-bold">+50% bonus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="pt-20 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Our Impact So Far</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Items Collected", val: "15k+", color: "text-emerald-400" },
              { label: "Cash Paid Out", val: "AED 2.1M", color: "text-[#FFC845]" },
              { label: "Happy Homes", val: "8.5k+", color: "text-blue-400" },
              { label: "Landfill Diverted", val: "340 tons", color: "text-purple-400" }
            ].map((s, i) => (
              <div key={i} className="space-y-2 text-center" data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className={`text-4xl md:text-5xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
            Ready to <span className="text-[#FFC845]">Get Paid</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Schedule your free pickup now. We'll collect your items, assess their value, and reward you on the spot.
          </p>
          <a 
            href={whatsappPickupMessage("Furniture and Electronics", "To be confirmed")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-final-cta"
          >
            <Button size="lg" className="bg-[#FFC845] hover:bg-[#e6b43d] text-slate-950 font-black uppercase tracking-widest rounded-full px-16 h-16 text-base gap-3">
              <MessageCircle className="w-6 h-6" />
              Schedule Free Pickup
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
