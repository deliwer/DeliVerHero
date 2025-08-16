import { Link, useLocation } from "wouter";
import { Users, Rocket, Menu, X, Building, Sparkles } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Trade iPhone", id: "trade" },
    { path: "/products", label: "Shop", id: "products" },
    { path: "/aquacafe", label: "Shop AquaCafe", id: "aquacafe" },
    { path: "/sponsorships", label: "Sponsor Missions", id: "sponsorships" },
    { path: "/impact-dashboard", label: "Impact & Rewards", id: "impact" },
    { path: "/community", label: "Community", id: "community" },
    { path: "/partners", label: "Champions & Ambassadors", id: "partners" },
  ];

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center" data-testid="link-home">
              <span className="text-2xl font-bold text-white">DeliWer</span>
              <span className="ml-2 bg-hero-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                HEROES
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                // Special styling for sponsorship link
                if (item.id === "sponsorships") {
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
            {/* Mobile Action Buttons - Compact */}
            <div className="flex md:hidden items-center space-x-2">
              <Link
                href="/leaderboard"
                className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-2 py-1.5 rounded-lg text-sm font-medium transition-colors"
                data-testid="button-join-heroes-mobile"
              >
                <Users className="inline w-3 h-3 mr-1" />
                Join
              </Link>
              <Link
                href="/aquacafe"
                className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white px-2 py-1.5 rounded-lg text-sm font-medium transition-colors"
                data-testid="button-start-mission-mobile"
              >
                <Rocket className="inline w-3 h-3 mr-1" />
                Start
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/leaderboard"
                className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                data-testid="button-join-heroes"
              >
                <Users className="inline w-4 h-4 mr-2" />
                Join Heroes
              </Link>
              <Link
                href="/aquacafe"
                className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                data-testid="button-start-mission"
              >
                <Rocket className="inline w-4 h-4 mr-2" />
                Start Mission
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
                // Special styling for sponsorship link in mobile
                if (item.id === "sponsorships") {
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

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
