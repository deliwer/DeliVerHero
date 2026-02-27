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
    { path: "/ejari-dubai", label: "Ejari", id: "ejari", icon: Flame },
    { path: "/relocate", label: "Relocation", id: "relocation", icon: Plane },
    { path: "/partners", label: "Partners", id: "partners", icon: Briefcase },
    { path: "/contact", label: "Contact", id: "contact", icon: MessageSquare },
  ];

  return (
    <div className="w-full fixed top-0 z-[100]">
      {/* 1. Main Navigation Bar - Always Available (Fixed) */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo - Home Button */}
          <Link href="/" className="flex items-center gap-3 group order-1 mr-auto md:mr-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-emerald-500/20">
              <span className="text-slate-950 font-black text-xl">D</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tighter uppercase">DeliWer</span>
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            <Link href="/ejari-dubai">
              <Button
                variant="ghost"
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  location === "/ejari-dubai" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Ejari
              </Button>
            </Link>
            <Link href="/relocate">
              <Button
                variant="ghost"
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  location === "/relocate" && !window.location.search.includes('type=move-out')
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Move-In
              </Button>
            </Link>
            <Link href="/relocate?type=move-out">
              <Button
                variant="ghost"
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  window.location.search.includes('type=move-out')
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Move-Out
              </Button>
            </Link>
            <div className="w-px h-4 bg-white/10 mx-2" />
            <Button 
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest text-[10px] px-6 rounded-xl"
              onClick={() => window.open('https://wa.me/971523946311', '_blank')}
            >
              WhatsApp Support
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

      {/* 2. Trust Strip Bar - Scrollable, Website Wide */}
      <div className="bg-slate-950/90 backdrop-blur-sm border-b border-white/10 py-2 px-4 overflow-x-auto no-scrollbar relative z-50">
        <div className="max-w-7xl mx-auto flex justify-start min-w-max">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </div>

      {/* 3. Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 space-y-3 z-[70] shadow-2xl">
          <Link href="/ejari-dubai">
            <Button variant="ghost" className="w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
              <Flame className="w-5 h-5 mr-3 text-emerald-500" /> Ejari Registration
            </Button>
          </Link>
          <Link href="/relocate">
            <Button variant="ghost" className="w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
              <Plane className="w-5 h-5 mr-3 text-emerald-500" /> Move-In Concierge
            </Button>
          </Link>
          <Link href="/relocate?type=move-out">
            <Button variant="ghost" className="w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
              <LogOut className="w-5 h-5 mr-3 text-emerald-500" /> Move-Out Support
            </Button>
          </Link>
          <Button 
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-xs"
            onClick={() => {
              window.open('https://wa.me/971523946311', '_blank');
              setIsMobileMenuOpen(false);
            }}
          >
            Chat on WhatsApp
          </Button>
        </div>
      )}
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
