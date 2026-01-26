import { Link, useLocation } from "wouter";
import { 
  Menu, X, ChevronDown, ShoppingCart, UserCircle, LogIn, UserPlus, 
  Settings, HelpCircle, Home, Plane, MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Button } from "@/components/ui/button";


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
    { path: "/contact", label: "Contact", id: "contact", icon: MessageSquare },
  ];

  return (
    <nav className="bg-slate-950/90 backdrop-blur-sm border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" data-testid="link-home">
              <img 
                src="/deliwer-logo.png" 
                alt="DeliWer Logo" 
                className="h-10 w-auto brightness-110"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px] ${
                    location === item.path ? "text-emerald-400" : "text-gray-400 hover:text-white"
                  }`}
                  data-testid={`link-${item.id}`}
                >
                  {item.icon && <item.icon className="w-3 h-3" />}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/cart"
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  data-testid="button-user-menu"
                >
                  <UserCircle className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/5 rounded-2xl shadow-2xl z-50 py-2">
                    <Link
                      href="/login"
                      className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold text-sm"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LogIn className="w-4 h-4 mr-3" /> Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold text-sm"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <UserPlus className="w-4 h-4 mr-3" /> Sign Up
                    </Link>
                    <div className="border-t border-white/5 my-2"></div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold text-sm"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" /> My Account
                    </Link>
                  </div>
                )}
              </div>
              
              <Button 
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-xl"
                onClick={() => window.open("https://wa.me/971523946311", '_blank')}
              >
                WhatsApp
              </Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/5">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-3 py-4 rounded-xl text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
            <div className="pt-4">
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase h-14 rounded-xl"
                onClick={() => window.open("https://wa.me/971523946311", '_blank')}
              >
                WhatsApp Support
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
