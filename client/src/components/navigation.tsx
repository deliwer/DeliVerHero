import { Link, useLocation } from "wouter";
import {
  Menu, X, Home, Plane, LogOut, Star, ClipboardList, Building2, CalendarCheck,
  Package, RefreshCw, Truck, Crown, LayoutGrid, ShoppingBag, AlertTriangle, Handshake
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

const deliwerNavItems = [
  { path: "/ejari-dubai",    label: "Ejari",    id: "ejari",       icon: Home },
  { path: "/relocate",       label: "Move-In",  id: "relocation",  icon: Plane },
  { path: "/exit-dubai",     label: "Move-Out", id: "move-out",    icon: LogOut },
  { path: "/setup",          label: "Setup",    id: "setup",       icon: Building2 },
  { path: "/consult",        label: "Consult",  id: "consult",     icon: CalendarCheck },
  { path: "/aquacafe",       label: "AquaCafe", id: "aquacafe",    icon: Star },
  { path: "/errand",         label: "Errand",   id: "errand",      icon: ClipboardList },
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
  const navItems = isChaintrack ? chaintrackNavItems : deliwerNavItems;

  const isActive = (itemPath: string) => location === itemPath;

  const handleChaintrackToggle = () => {
    if (isChaintrack) {
      setLocation("/");
    } else {
      setLocation("/chaintrack");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div id="main-nav" className="w-full fixed top-0 z-[100]">
      {/* 0. Emergency Preparedness Banner */}
      <EmergencyBanner />

      {/* 1. Main Navigation Bar */}
      <nav className={`backdrop-blur-md border-b px-4 py-3 transition-colors duration-300 ${
        isChaintrack
          ? "bg-indigo-950/95 border-purple-500/20"
          : "bg-slate-900/95 border-white/5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link href={isChaintrack ? "/chaintrack" : "/"} className="flex items-center gap-3 group order-1 mr-auto md:mr-0">
            <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={logoPng} alt="DeliWer Logo" className="h-8 w-auto object-contain" />
            </div>
            <span className={`font-black text-2xl tracking-tighter uppercase transition-colors ${isChaintrack ? "text-purple-300" : "text-white"}`}>
              {isChaintrack ? "ChainTrack" : "DeliWer"}
            </span>
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            {navItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                    isActive(item.path)
                      ? isChaintrack
                        ? "bg-purple-500/15 text-purple-300"
                        : "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* B2B / DeliWer toggle switch */}
            <button
              onClick={handleChaintrackToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 group ${
                isChaintrack
                  ? "border-purple-400/60 bg-purple-500/20 hover:bg-purple-500/30"
                  : "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60 hover:bg-purple-500/15"
              }`}
              title={isChaintrack ? "Switch to DeliWer" : "Switch to ChainTrack B2B Wholesale"}
              data-testid="button-chaintrack-toggle"
            >
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isChaintrack ? "text-slate-400" : "text-slate-500"}`}>
                B2C
              </span>
              {/* Toggle pill */}
              <div className={`relative w-10 h-5 rounded-full border flex items-center px-0.5 transition-colors duration-200 ${
                isChaintrack ? "bg-purple-600 border-purple-400" : "bg-slate-700 border-slate-600"
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                  isChaintrack ? "translate-x-5" : "translate-x-0"
                }`} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isChaintrack ? "text-purple-300" : "text-purple-400 group-hover:text-purple-300"}`}>
                B2B
              </span>
            </button>

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

      {/* 2. Trust Strip Bar */}
      <div className="bg-slate-950/90 backdrop-blur-sm border-b border-white/10 py-2 px-4 overflow-x-auto no-scrollbar relative z-50">
        <div className="max-w-7xl mx-auto flex justify-start min-w-max">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </div>

      {/* 3. Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden absolute top-full left-0 right-0 border-b p-6 space-y-3 z-[70] shadow-2xl ${
              isChaintrack ? "bg-indigo-950 border-purple-500/20" : "bg-slate-900 border-white/10"
            }`}
          >
            {/* B2B toggle row */}
            <button
              onClick={handleChaintrackToggle}
              className={`w-full flex items-center justify-between px-5 h-14 rounded-xl border transition-all ${
                isChaintrack
                  ? "border-purple-400/50 bg-purple-500/15"
                  : "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10"
              }`}
              data-testid="button-chaintrack-toggle-mobile"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isChaintrack ? "bg-purple-400" : "bg-slate-500"}`} />
                <span className="text-xs font-black uppercase tracking-widest text-purple-400">
                  {isChaintrack ? "ChainTrack B2B — Active" : "ChainTrack B2B Wholesale"}
                </span>
              </div>
              <div className={`relative w-10 h-5 rounded-full border flex items-center px-0.5 transition-colors duration-200 ${
                isChaintrack ? "bg-purple-600 border-purple-400" : "bg-slate-700 border-slate-600"
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                  isChaintrack ? "translate-x-5" : "translate-x-0"
                }`} />
              </div>
            </button>

            <div className="w-full h-px bg-white/10" />

            {navItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl ${
                    isActive(item.path)
                      ? isChaintrack
                        ? "bg-purple-500/15 text-purple-300"
                        : "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isChaintrack ? "text-purple-500" : "text-emerald-500"}`} />
                  {item.label}
                </Button>
              </Link>
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
