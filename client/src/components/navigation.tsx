import { Link, useLocation } from "wouter";
import { 
  Menu, X, ChevronDown, ShoppingCart, UserCircle, LogIn, UserPlus, 
  Settings, HelpCircle, Home, Plane, MessageSquare, Briefcase, Flame
} from "lucide-react";
import { useState, useEffect } from "react";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    const updateCartCount = () => {
      const count = shopifyCartService.getCartCount();
      setCartCount(count);
    };
    updateCartCount();
    const interval = setInterval(updateCartCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: "/residents", label: "Residents", id: "residents", icon: Home },
    { path: "/relocate", label: "Relocation", id: "relocation", icon: Plane },
    { path: "/partners", label: "Partners", id: "partners", icon: Briefcase },
    { path: "/contact", label: "Contact", id: "contact", icon: MessageSquare },
  ];

  return (
    <div className="w-full">
      {/* 1. Main Navigation Bar - Always Available (Fixed) */}
      <nav className="sticky top-0 z-[60] bg-slate-900/90 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo - Home Button */}
          <Link href="/" className="flex items-center gap-3 group order-1 mr-auto md:mr-0">
            <img src="/deliwer-logo.png" alt="DeliWer Logo" className="h-8 md:h-10 w-auto brightness-110 group-hover:scale-105 transition-transform" />
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            {navItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                    location === item.path 
                      ? "bg-emerald-500/10 text-emerald-400" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-gray-400 hover:text-white rounded-xl"
              onClick={() => window.location.href = '/cart'}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* RIGHT: Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white rounded-xl order-3 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* 2. Trust Strip Bar (Below Nav) - Scrollable, Website Wide */}
      <div className="bg-slate-950 border-b border-white/10 py-2.5 px-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex justify-start min-w-max">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </div>

      {/* 3. Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-4 space-y-2 z-[70] shadow-2xl">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm font-black uppercase tracking-widest h-12 rounded-xl ${
                  location === item.path 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
