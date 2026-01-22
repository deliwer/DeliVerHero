import { Link, useLocation } from "wouter";
import { 
  Users, Rocket, Menu, X, Building, Sparkles, ToggleLeft, ToggleRight, 
  Briefcase, ShoppingCart, UserCircle, ChevronDown, LogIn, UserPlus, 
  Settings, HelpCircle, Star, Trophy, TrendingDown, LayoutDashboard, FileText, Package, Globe, Plane, Home, MessageSquare, Recycle, ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { shopifyCartService } from "@/lib/shopify-cart";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";


export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Automatically detect B2B mode based on subdomain
  const isChainTrackDomain = typeof window !== 'undefined' && window.location.hostname.includes('chaintrack');
  const [isB2BMode, setIsB2BMode] = useState(isChainTrackDomain);

  // Update cart count whenever navigation component mounts or updates
  useEffect(() => {
    const updateCartCount = () => {
      const count = shopifyCartService.getCartCount();
      setCartCount(count);
    };

    updateCartCount();

    // Poll for cart updates every 2 seconds when component is mounted
    const interval = setInterval(updateCartCount, 2000);

    return () => clearInterval(interval);
  }, []);

  // Hide nav on exit concierge page - MOVED AFTER ALL HOOKS
  const isExitPage = location === "/relocate/exit";

  if (isExitPage) {
    return (
      <nav className="bg-slate-950/90 backdrop-blur-sm border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/relocate/exit" className="flex items-center hover:opacity-80 transition-opacity" data-testid="link-home">
              <img 
                src="/deliwer-logo.png" 
                alt="DeliWer Logo" 
                className="h-10 w-auto brightness-110 hover:brightness-125 transition-all"
              />
            </Link>
            <Button 
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full"
              onClick={() => window.open("https://wa.me/971523946311?text=I%20need%20to%20start%20my%20exit%20concierge%20process", '_blank')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  const consumerNavItems = [
    { path: "/", label: "Home", id: "home" },
    { path: "/ewaste", label: "Recycle", id: "recycle", icon: Recycle },
    { path: "/residence", label: "Residence in Dubai", id: "move-in-services" },
    { path: "/relocation", label: "Relocate", id: "relocation", featured: true },
    { path: "/home-service", label: "Home Service", id: "home-service" },
    { path: "/contact", label: "Support", id: "support" },
    { path: "/partners", label: "Partners", id: "partners" },
  ];

  const b2bNavItems = [
    { path: "/fulfillment", label: "Fulfillment by DeliWer", id: "fulfillment", featured: true },
    { path: "/chaintrack", label: "Reverse Bidding", id: "chaintrack" },
    { path: "/relocate/business-setup", label: "Relocate Capital", id: "relocate" },
    { path: "/corporate", label: "Corporate Trade-in", id: "corporate-tradein" },
    { path: "/corporate-partner-portal", label: "Partner Portal", id: "partner-portal" },
    { path: "/investor-dashboard", label: "Investors", id: "investors" },
  ];

  const navItems = consumerNavItems;

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" data-testid="link-home">
              <div className="flex items-center">
                <img 
                  src="/deliwer-logo.png" 
                  alt="DeliWer Logo" 
                  className="h-10 w-auto brightness-110 hover:brightness-125 transition-all"
                />
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                
                // Special styling for featured Relocation button (Consumer)
                if (item.id === "relocation" && item.featured) {
                  return (
                    <Link
                      key={item.path}
                      href="/relocate"
                      className="relative group transition-all duration-300"
                      data-testid={`link-${item.id}`}
                    >
                      <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600/40 to-orange-600/40 border-2 border-amber-500/70 rounded-lg text-white hover:from-amber-600/50 hover:to-orange-600/50 hover:border-amber-400/90 transition-all duration-300 shadow-xl hover:shadow-amber-500/40 animate-pulse hover:animate-none">
                        <span className="font-bold text-lg">Relocation in/out Dubai</span>
                        <Plane className="w-4 h-4 text-yellow-300 animate-bounce" />
                      </div>
                    </Link>
                  );
                }

                // Special styling for Move-In Services
                if (item.id === "move-in-services") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="relative group transition-all duration-300"
                      data-testid={`link-${item.id}`}
                    >
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg text-blue-300 hover:text-white hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-400/50 transition-all">
                        <Home className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="transition-colors text-gray-300 hover:text-white flex items-center gap-2"
                    data-testid={`link-${item.id}`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Planet Points Widget removed from main navigation */}
              
              <Link
                href="/cart"
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  data-testid="button-user-menu"
                >
                  <UserCircle className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                        data-testid="dropdown-login"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-3" />
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                        data-testid="dropdown-signup"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 mr-3" />
                        Sign Up
                      </Link>
                      
                      {/* B2B specific dropdown items removed */}
                      
                      <div className="border-t border-slate-700 my-1"></div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                        data-testid="dropdown-profile"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        My Account
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                        data-testid="dropdown-help"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <HelpCircle className="w-4 h-4 mr-3" />
                        Help & Support
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/chaintrack"
                className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                data-testid="button-shop-all"
              >
                <Rocket className="inline w-4 h-4 mr-2" />
                Shop Sustainable
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700">
              {navItems.map((item) => {
                // Special styling for featured Relocation button (Consumer)
                if (item.id === "relocation" && item.featured) {
                  return (
                    <Link
                      key={item.path}
                      href="/relocate"
                      className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between px-3 py-3 bg-gradient-to-r from-amber-600/40 to-orange-600/40 border-2 border-amber-500/70 rounded-lg text-white shadow-xl">
                        <div className="flex items-center gap-2">
                          <Plane className="w-5 h-5 text-yellow-300" />
                          <span className="font-bold">Relocation in/out Dubai</span>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                }

                // Special styling for Move-In Services
                if (item.id === "move-in-services") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg text-blue-300">
                        <Home className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
                    data-testid={`link-mobile-${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Add Shop all link to mobile menu removed - now in main nav items */}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}