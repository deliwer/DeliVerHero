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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
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
    <nav className="px-4 py-3 border-b border-white/10 bg-slate-950/20 backdrop-blur-sm sticky top-0 z-[60]">
      <div className="max-w-4xl mx-auto">
        <TrustStrip variant="dark" showContact={true} />
      </div>
    </nav>
  );
}
