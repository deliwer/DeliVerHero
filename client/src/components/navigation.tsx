import { Link, useLocation } from "wouter";
import {
  Menu, X, Home, Plane, LogOut, Star, ClipboardList, Building2, CalendarCheck,
  Package, RefreshCw, Truck, Crown, LayoutGrid, ShoppingBag, AlertTriangle, Handshake,
  Flame, KeyRound, Briefcase, Percent, MapPin
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { motion, AnimatePresence } from "framer-motion";
import { EmergencyBanner } from "@/components/emergency-banner";

import logoPng from "@assets/deliwer logo_1755631850889.png";

const CHAINTRACK_PATHS = [
  "/chaintrack", "/bulk-purchasing", "/bulk-tradein",
  "/fulfillment", "/membership-plans", "/corporate",
  "/cobone-corporate", "/account-management",
];

const REALESTATE_PATHS = ["/finance", "/realestate", "/real-estate", "/damac"];

const deliwerNavItems = [
  { path: "/ejari-dubai",    label: "Ejari",    id: "ejari",       icon: Home },
  { path: "/relocate",       label: "Move-In",  id: "relocation",  icon: Plane },
  { path: "/exit-dubai",     label: "Move-Out", id: "move-out",    icon: LogOut },
  { path: "/setup",          label: "Setup",    id: "setup",       icon: Building2 },
  { path: "/consult",        label: "Consult",  id: "consult",     icon: CalendarCheck },
  { path: "/aquacafe",       label: "AquaCafe", id: "aquacafe",    icon: Star },
  { path: "/errand",         label: "Errand",   id: "errand",      icon: ClipboardList },
];

const realestateNavItems = [
  { path: "/finance#eligibility",    label: "Eligibility",   id: "fin-eligibility", icon: KeyRound },
  { path: "/finance#payment-plans",  label: "Payment Plans", id: "fin-plans",       icon: Building2 },
  { path: "/finance#calculator",     label: "Calculator",    id: "fin-calc",        icon: Percent },
  { path: "/finance#concierge",      label: "Concierge",     id: "fin-concierge",   icon: Briefcase },
  { path: "/finance#partners",       label: "Partners",      id: "fin-partners",    icon: Handshake },
];

const chaintrackNavItems = [
  { path: "/chaintrack",       label: "Marketplace", id: "ct-marketplace", icon: LayoutGrid },
  { path: "/bulk-purchasing",  label: "Bulk Buy",    id: "ct-bulk",        icon: Package },
  { path: "/bulk-tradein",     label: "Trade-In",    id: "ct-tradein",     icon: RefreshCw },
  { path: "/fulfillment",      label: "Fulfillment", id: "ct-fulfillment", icon: Truck },
  { path: "/membership-plans", label: "Membership",  id: "ct-membership",  icon: Crown },
  { path: "/corporate",        label: "Corporate",   id: "ct-corporate",   icon: Building2 },
  { path: "/chaintrack",       label: "Browse",      id: "ct-browse",      icon: ShoppingBag },
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isChaintrack = CHAINTRACK_PATHS.some((p) => location.startsWith(p));
  const isRealEstate = REALESTATE_PATHS.some((p) => location.startsWith(p));
  const navItems = isChaintrack
    ? chaintrackNavItems
    : isRealEstate
      ? realestateNavItems
      : deliwerNavItems;

  const isActive = (itemPath: string) => location === itemPath.split("#")[0];

  const navigateToItem = (path: string) => {
    setIsMobileMenuOpen(false);
    const [base, hash] = path.split("#");
    if (hash && location === base) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    setLocation(path);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  const switchMode = (mode: "b2c" | "realty" | "b2b") => {
    if (mode === "b2c") setLocation("/");
    else if (mode === "realty") setLocation("/finance");
    else setLocation("/chaintrack");
    setIsMobileMenuOpen(false);
  };

  const currentMode: "b2c" | "realty" | "b2b" = isChaintrack
    ? "b2b"
    : isRealEstate
      ? "realty"
      : "b2c";

  return (
    <div id="main-nav" className="w-full fixed top-0 z-[100]">
      {/* 0. Emergency Preparedness Banner — hidden on Realty for focus */}
      {!isRealEstate && <EmergencyBanner />}
      {/* 1. Main Navigation Bar */}
      <nav className={`backdrop-blur-md border-b px-4 py-3 transition-colors duration-300 ${
        isChaintrack
          ? "bg-indigo-950/95 border-purple-500/20"
          : isRealEstate
            ? "bg-slate-950/95 border-amber-500/20"
            : "bg-slate-900/95 border-white/5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link href={isChaintrack ? "/chaintrack" : isRealEstate ? "/finance" : "/"} className="flex items-center gap-3 group order-1 mr-auto md:mr-0">
            <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={logoPng} alt="DeliWer Logo" className="h-8 w-auto object-contain" />
            </div>
            <span className={`font-black text-2xl tracking-tighter uppercase transition-colors ${
              isChaintrack ? "text-purple-300" : isRealEstate ? "text-emerald-300" : "text-white"
            }`}>
              {isChaintrack ? "ChainTrack" : isRealEstate ? "DeliWer Finance" : "DeliWer"}
            </span>
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigateToItem(item.path)}
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  isActive(item.path)
                    ? isChaintrack
                      ? "bg-purple-500/15 text-purple-300"
                      : "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-400 hover:text-white"
                }`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </Button>
            ))}

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* 3-way mode switcher: B2C / Realty / B2B — HIGHLIGHTED */}
            <div className="relative flex items-center gap-1.5">
              <span className="hidden lg:inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-300/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Switch
              </span>
              <div
                className="flex items-center gap-0.5 p-1 rounded-xl border border-emerald-500/40 bg-slate-900 shadow-[0_0_0_1px_rgba(16,185,129,0.15),0_0_18px_-4px_rgba(16,185,129,0.45)] ring-1 ring-emerald-500/20"
                data-testid="mode-switcher"
              >
                <button
                  onClick={() => switchMode("b2c")}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                    currentMode === "b2c"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  title="DeliWer B2C Services"
                  data-testid="mode-b2c"
                >
                  Services
                </button>
                <button
                  onClick={() => switchMode("realty")}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                    currentMode === "realty"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  title="DeliWer Finance — Mortgages, Payment Plans & Move-In"
                  data-testid="mode-finance"
                >Buy/Lease</button>
                <button
                  onClick={() => switchMode("b2b")}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                    currentMode === "b2b"
                      ? "bg-purple-500 text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  title="ChainTrack B2B Wholesale"
                  data-testid="mode-b2b"
                >Shop</button>
              </div>
            </div>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {!isChaintrack && (
              <Link href="/partners">
                <Button
                  className="relative bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 font-black uppercase tracking-widest text-[10px] px-4 rounded-xl gap-1.5 transition-all"
                  data-testid="nav-partners-cta"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Partner &amp; Earn
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              className={`font-black uppercase tracking-widest text-[10px] px-6 rounded-xl ${
                isChaintrack
                  ? "border-purple-500/40 text-purple-400 hover:bg-purple-500/10"
                  : "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
              }`}
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
      {/* 2. Trust Strip Bar — hidden on Realty for focus */}
      {!isRealEstate && (
        <div className="bg-slate-950/90 backdrop-blur-sm border-b border-white/10 py-2 px-4 overflow-x-auto no-scrollbar relative z-50">
          <div className="max-w-7xl mx-auto flex justify-start min-w-max">
            <TrustStrip variant="dark" showContact={true} />
          </div>
        </div>
      )}
      {/* 3. Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden absolute top-full left-0 right-0 border-b p-6 space-y-3 z-[70] shadow-2xl ${
              isChaintrack
                ? "bg-indigo-950 border-purple-500/20"
                : isRealEstate
                  ? "bg-slate-950 border-amber-500/20"
                  : "bg-slate-900 border-white/10"
            }`}
          >
            {/* 3-way mode switcher — HIGHLIGHTED */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Switch view
              </div>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl border border-emerald-500/40 bg-slate-900 ring-1 ring-emerald-500/20 shadow-[0_0_18px_-4px_rgba(16,185,129,0.45)]">
                <button
                  onClick={() => switchMode("b2c")}
                  className={`text-[10px] font-black uppercase tracking-widest h-11 rounded-lg transition-all ${
                    currentMode === "b2c" ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"
                  }`}
                  data-testid="mode-b2c-mobile"
                >
                  Services
                </button>
                <button
                  onClick={() => switchMode("realty")}
                  className={`text-[10px] font-black uppercase tracking-widest h-11 rounded-lg transition-all ${
                    currentMode === "realty" ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"
                  }`}
                  data-testid="mode-finance-mobile"
                >
                  Finance
                </button>
                <button
                  onClick={() => switchMode("b2b")}
                  className={`text-[10px] font-black uppercase tracking-widest h-11 rounded-lg transition-all ${
                    currentMode === "b2b" ? "bg-purple-500 text-white shadow-md" : "text-slate-300 hover:bg-slate-800"
                  }`}
                  data-testid="mode-b2b-mobile"
                >
                  Trade
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigateToItem(item.path)}
                className={`w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl ${
                  isActive(item.path)
                    ? isChaintrack
                      ? "bg-purple-500/15 text-purple-300"
                      : "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-400"
                }`}
                data-testid={`nav-mobile-${item.id}`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isChaintrack ? "text-purple-500" : "text-emerald-500"}`} />
                {item.label}
              </Button>
            ))}

            {!isChaintrack && (
              <div className="w-full h-px bg-white/10" />
            )}
            {!isChaintrack && (
              <Link href="/partners">
                <Button
                  className="w-full justify-between text-xs font-black uppercase tracking-widest h-14 rounded-xl bg-emerald-600/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/25 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-partner-earn"
                >
                  <div className="flex items-center gap-3">
                    <Handshake className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-left">
                      <div>Partner &amp; Earn</div>
                      <div className="text-[9px] text-emerald-500/70 normal-case font-bold tracking-normal">AED 150–800+ per client</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </Button>
              </Link>
            )}
            {!isChaintrack && (
              <Link href="/wartime-readiness">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs font-black uppercase tracking-widest h-12 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-900/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-emergency"
                >
                  <AlertTriangle className="w-5 h-5 mr-3 text-red-500" />
                  Emergency Preparedness
                </Button>
              </Link>
            )}
            <Button
              className={`w-full h-14 font-black rounded-xl uppercase tracking-widest text-xs ${
                isChaintrack
                  ? "bg-purple-700 hover:bg-purple-600 text-white"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
              onClick={() => {
                window.open('https://wa.me/971523946311', '_blank');
                setIsMobileMenuOpen(false);
              }}
            >
              Chat on WhatsApp
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
