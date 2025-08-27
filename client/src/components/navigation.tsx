import { Link, useLocation } from "wouter";
import { Users, Rocket, Menu, X, Building, Sparkles, ToggleLeft, ToggleRight, Briefcase } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Automatically detect B2B mode based on subdomain
  const isChainTrackDomain = window.location.hostname.includes('chaintrack');
  const [isB2BMode, setIsB2BMode] = useState(isChainTrackDomain);

  const consumerNavItems = [
    { path: "/aquacafe", label: "AquaCafe", id: "aquacafe" },
    { path: "/exchange", label: "Exchange", id: "exchange" },
    { path: "/collect", label: "Play", id: "play" },
    { path: "/redeem", label: "Redeem", id: "redeem" },
    { path: "/community", label: "Community", id: "community" },
    { path: "/partners", label: "Partners", id: "partners" },
  ];

  const b2bNavItems = [
    { path: "/corporate-dashboard", label: "Dashboard", id: "corporate-dashboard" },
    { path: "/bulk-tradein", label: "Bulk Trade-in", id: "bulk-tradein" },
    { path: "/corporate-quotes", label: "Get Quotes", id: "corporate-quotes" },
    { path: "/purchase-orders", label: "Purchase Orders", id: "purchase-orders" },
    { path: "/account-management", label: "Account", id: "account-management" },
  ];

  const navItems = isB2BMode ? b2bNavItems : consumerNavItems;

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center" data-testid="link-home">
              {isB2BMode ? (
                <div className="flex items-center space-x-2">
                  <div className="text-xl font-bold text-blue-400">ChainTrack</div>
                </div>
              ) : (
                <img 
                  src="/deliwer-logo.png" 
                  alt="DeliWer Logo" 
                  className="h-8 w-auto"
                />
              )}
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                // Special styling for partners link
                if (item.id === "partners") {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="relative group transition-all duration-300"
                      data-testid={`link-${item.id}`}
                    >
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-500/30 rounded-lg text-emerald-300 hover:text-white hover:from-emerald-600/30 hover:to-blue-600/30 hover:border-emerald-400/50 transition-all">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                        <Sparkles className="w-3 h-3 text-yellow-400" />
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
            {/* B2B/Consumer Toggle */}
            <div className="flex items-center space-x-3 mr-4">
              <button
                onClick={() => setIsB2BMode(!isB2BMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                  isB2BMode 
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' 
                    : 'bg-gray-700/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-gray-500'
                }`}
                data-testid="toggle-b2b-mode"
              >
                {isB2BMode ? (
                  <>
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-medium">B2B</span>
                    <ToggleRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Consumer</span>
                    <ToggleLeft className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Mobile Action Buttons - Compact */}
            <div className="flex md:hidden items-center space-x-2">
              <Link
                href={isB2BMode ? "/bulk-tradein" : "/products"}
                className={`${
                  isB2BMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-dubai-blue-600 hover:bg-dubai-blue-700'
                } text-white px-2 py-1.5 rounded-lg text-sm font-medium transition-colors`}
                data-testid="button-shop-all-mobile"
              >
                {isB2BMode ? (
                  <>
                    <Briefcase className="inline w-3 h-3 mr-1" />
                    Get Quote
                  </>
                ) : (
                  <>
                    <Rocket className="inline w-3 h-3 mr-1" />
                    Shop All
                  </>
                )}
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href={isB2BMode ? "/bulk-tradein" : "/products"}
                className={`${
                  isB2BMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-dubai-blue-600 hover:bg-dubai-blue-700'
                } text-white px-4 py-2 rounded-lg font-medium transition-colors`}
                data-testid="button-shop-all"
              >
                {isB2BMode ? (
                  <>
                    <Briefcase className="inline w-4 h-4 mr-2" />
                    Get Bulk Quote
                  </>
                ) : (
                  <>
                    <Rocket className="inline w-4 h-4 mr-2" />
                    Shop All
                  </>
                )}
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

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
