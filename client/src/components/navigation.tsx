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
    { path: "/", label: "Home", id: "home", icon: Home },
    { path: "/residents", label: "Residents", id: "residents", icon: Home },
    { path: "/relocate", label: "Relocation", id: "relocation", icon: Plane },
    { path: "/partners", label: "Partners", id: "partners", icon: Briefcase },
    { path: "/contact", label: "Contact", id: "contact", icon: MessageSquare },
  ];

  return (
    <nav className="px-4 py-3 border-b border-white/10 bg-slate-950/20 backdrop-blur-sm sticky top-0 z-[60]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-emerald-400 transition-colors">DeliWer</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <Button
                variant="ghost"
                className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  location === item.path 
                    ? "bg-white/10 text-emerald-400" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
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
            className="relative text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
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

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
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
    </nav>
  );
}
