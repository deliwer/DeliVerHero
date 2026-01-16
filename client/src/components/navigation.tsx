import { Link, useLocation } from "wouter";
import { 
  Users, Rocket, Menu, X, Building, Sparkles, ToggleLeft, ToggleRight, 
  Briefcase, ShoppingCart, UserCircle, ChevronDown, LogIn, UserPlus, 
  Settings, HelpCircle, Star, Trophy, TrendingDown, LayoutDashboard, FileText, Package, Globe, Plane, Home 
} from "lucide-react";
import { useState, useEffect } from "react";
import { shopifyCartService } from "@/lib/shopify-cart";
import { useQuery } from "@tanstack/react-query";


export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Automatically detect B2B mode based on subdomain
  const isChainTrackDomain = window.location.hostname.includes('chaintrack');
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

  const consumerNavItems = [
    { path: "/residence", label: "Move-In Services", id: "move-in-services" },
    { path: "/relocation", label: "Relocation", id: "relocation", featured: true },
    { path: "/relocate/visa", label: "Visa Services", id: "visa-services" },
    { path: "/contact", label: "Contact", id: "support" },
  ];

  const b2bNavItems = [
    { path: "/fulfillment", label: "Fulfillment by DeliWer", id: "fulfillment", featured: true },
    { path: "/chaintrack", label: "Reverse Bidding", id: "chaintrack" },
    { path: "/relocate/business-setup", label: "Business Setup", id: "business-setup" },
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
            <div className="hidden md:flex space-x-6">
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
                        <span className="font-bold text-lg">Relocation into Dubai</span>
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
                    className="transition-colors text-gray-300 hover:text-white text-center"
                    data-testid={`link-${item.id}`}
                  >
                    {item.label}
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
                href="/products"
                className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                data-testid="button-shop-all"
              >
                <Rocket className="inline w-4 h-4 mr-2" />
                Shop All
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
                // Special styling for featured Fulfillment by DeliWer in mobile
                if (item.id === "fulfillment" && item.featured) {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border-2 border-blue-500/60 rounded-lg text-white shadow-lg">
                        <span className="font-bold">{item.label}</span>
                        <Package className="w-4 h-4 text-green-400 ml-auto" />
                      </div>
                    </Link>
                  );
                }
                
                // Special styling for ChainTrack/Reverse Bidding in mobile
                if (item.id === "chaintrack") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                        <TrendingDown className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                }
                
                // Special styling for home-service link in mobile
                if (item.id === "home-service") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 border border-teal-500/30 rounded-lg text-teal-300">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                }
                
                // Special styling for housing link in mobile
                if (item.id === "housing") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-lg text-blue-300">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                }
                
                // Special styling for partners link in mobile
                if (item.id === "partners") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      data-testid={`link-mobile-${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-500/30 rounded-lg text-emerald-300">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                        <Sparkles className="w-3 h-3 text-yellow-400 ml-auto" />
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                    data-testid={`link-mobile-${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Add Shop all link to mobile menu only */}
              <Link
                href="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                data-testid="link-mobile-shop-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop all
              </Link>
              
              <Link 
                href="/email-campaigns" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                data-testid="link-mobile-email-campaigns"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Email Campaigns
              </Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}