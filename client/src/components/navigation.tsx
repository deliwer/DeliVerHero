import { Link, useLocation } from "wouter";
import { Users, Rocket } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Trade iPhone", id: "trade" },
    { path: "/products", label: "Shop", id: "products" },
    { path: "/aquacafe", label: "AquaCafe", id: "aquacafe" },
    { path: "/dubai-rewards", label: "Rewards", id: "rewards" },
    { path: "/impact-dashboard", label: "Impact", id: "impact" },
    { path: "/community", label: "Community", id: "community" },
    { path: "/partners", label: "Partners", id: "partners" },
    { path: "/delivery", label: "Delivery", id: "delivery" },
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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors ${
                    location === item.path
                      ? "text-hero-green-500"
                      : "text-gray-300 hover:text-white"
                  }`}
                  data-testid={`link-${item.id}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/leaderboard"
              className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              data-testid="button-join-heroes"
            >
              <Users className="inline w-4 h-4 mr-2" />
              Join Heroes
            </Link>
            <Link
              href="/"
              className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              data-testid="button-start-mission"
            >
              <Rocket className="inline w-4 h-4 mr-2" />
              Start Mission
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
