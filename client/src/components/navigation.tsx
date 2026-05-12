import { Link, useLocation } from "wouter";
import {
  Menu, X, Home, Plane, LogOut, Star, ClipboardList, Building2, CalendarCheck,
  Package, RefreshCw, Truck, Crown, LayoutGrid, ShoppingBag, AlertTriangle, Handshake,
  Briefcase, Percent, MapPin, Users, DollarSign, BookOpen, Smartphone, Youtube
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { motion, AnimatePresence } from "framer-motion";
import { EmergencyBanner } from "@/components/emergency-banner";

import logoPng from "@assets/deliwer logo_1755631850889.png";

// ── Broker/ChainTrack side paths ─────────────────────────────────────────────
// Includes all /partners, /broker*, and original ChainTrack inventory paths.
// Any path that starts with one of these activates the Brokers/ChainTrack nav.
const CHAINTRACK_PATHS = [
  "/chaintrack", "/bulk-purchasing", "/bulk-tradein",
  "/fulfillment", "/membership-plans", "/corporate",
  "/cobone-corporate", "/account-management",
  "/partners", "/broker-onboard", "/broker-onboarding", "/brokers",
  "/partner-program", "/partner-dashboard", "/corporate-partner-portal",
  "/planet-hero-affiliates", "/affiliate-dashboard",
];

// ── Consumer side paths that show the DeliWer nav ────────────────────────────
// /realestate and /home-access are now folded into the Home Service consumer side.
const REALESTATE_PATHS: string[] = [];

// ── Consumer / Home Service nav items (DeliWer.com) ─────────────────────────
const deliwerNavItems = [
  { path: "/ejari-dubai",    label: "Ejari",        id: "ejari",        icon: Home },
  { path: "/relocate",       label: "Move-In",      id: "relocation",   icon: Plane },
  { path: "/exit-dubai",     label: "Move-Out",     id: "move-out",     icon: LogOut },
  { path: "/home-services",  label: "Home Service", id: "home-service", icon: Star },
  { path: "/errand",         label: "Errand",       id: "errand",       icon: ClipboardList },
  { path: "/setup",          label: "Setup",        id: "setup",        icon: Building2 },
  { path: "/earn",           label: "Earnings",     id: "earn",         icon: DollarSign },
  { path: "/consult",        label: "Consult",      id: "consult",      icon: CalendarCheck },
];

// ── Broker / ChainTrack nav items ────────────────────────────────────────────
// Primary: broker & partner pages. Secondary: Phone Flipping link to marketplace.
const brokerNavItems = [
  { path: "/broker-onboard",                          label: "Broker Portal",  id: "ct-broker",    icon: Briefcase,    external: false },
  { path: "/partners",                               label: "Partner Program", id: "ct-partners",  icon: Users,        external: false },
  { path: "/partner-program",                        label: "Career Path",     id: "ct-career",    icon: BookOpen,     external: false },
  { path: "/partner-dashboard",                      label: "Dashboard",       id: "ct-dashboard", icon: LayoutGrid,   external: false },
  { path: "https://www.youtube.com/@vdeliwer",       label: "Training",        id: "ct-training",  icon: Youtube,      external: true  },
  { path: "/chaintrack",                             label: "Phone Flipping",  id: "ct-flipper",   icon: Smartphone,   external: false },
];

// ── Phone Flipper sub-nav (original ChainTrack marketplace nav) ───────────────
// Shown when user is deep inside /chaintrack/* paths.
const chaintrackNavItems = [
  { path: "/chaintrack",       label: "Marketplace", id: "ct-marketplace", icon: LayoutGrid },
  { path: "/bulk-purchasing",  label: "Bulk Buy",    id: "ct-bulk",        icon: Package },
  { path: "/bulk-tradein",     label: "Trade-In",    id: "ct-tradein",     icon: RefreshCw },
  { path: "/fulfillment",      label: "Fulfillment", id: "ct-fulfillment", icon: Truck },
  { path: "/membership-plans", label: "Membership",  id: "ct-membership",  icon: Crown },
  { path: "/corporate",        label: "Corporate",   id: "ct-corporate",   icon: Building2 },
  { path: "/partners",         label: "← Brokers",  id: "ct-back",        icon: Users },
];

// Paths that are "deep" inside the ChainTrack phone marketplace
const DEEP_CHAINTRACK_PATHS = [
  "/chaintrack", "/bulk-purchasing", "/bulk-tradein",
  "/fulfillment", "/membership-plans", "/corporate",
  "/cobone-corporate", "/account-management",
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBrokerSide = CHAINTRACK_PATHS.some((p) => location.startsWith(p));
  const isDeepChaintrack = DEEP_CHAINTRACK_PATHS.some((p) => location.startsWith(p));

  // Nav items: deep ChainTrack marketplace paths get the phone-flipper nav;
  // all other broker-side paths get the broker-primary nav;
  // everything else gets the DeliWer consumer nav.
  const navItems = isDeepChaintrack
    ? chaintrackNavItems
    : isBrokerSide
      ? brokerNavItems
      : deliwerNavItems;

  const isActive = (itemPath: string) => location === itemPath.split("#")[0];

  const navigateToItem = (path: string, external?: boolean) => {
    setIsMobileMenuOpen(false);
    if (external) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }
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

  // Two-way switcher: Home Service (consumer) ↔ Brokers (B2B)
  const switchMode = (mode: "b2c" | "b2b") => {
    if (mode === "b2c") setLocation("/");
    else setLocation("/partners");
    setIsMobileMenuOpen(false);
  };

  const currentMode: "b2c" | "b2b" = isBrokerSide ? "b2b" : "b2c";

  return (
    <div id="main-nav" className="w-full fixed top-0 z-[100]">
      {/* Emergency banner — consumer side only */}
      {!isBrokerSide && <EmergencyBanner />}

      {/* ── Main Nav Bar ── */}
      <nav className={`backdrop-blur-md border-b px-4 py-3 transition-colors duration-300 ${
        isBrokerSide
          ? "bg-indigo-950/95 border-purple-500/20"
          : "bg-slate-900/95 border-white/5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LEFT: Logo */}
          <Link
            href={isBrokerSide ? "/partners" : "/"}
            className="flex items-center gap-3 group order-1 mr-auto md:mr-0"
          >
            <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={logoPng} alt="DeliWer Logo" className="h-8 w-auto object-contain" />
            </div>
            <span className={`font-black text-2xl tracking-tighter uppercase transition-colors ${
              isBrokerSide ? "text-purple-300" : "text-white"
            }`}>
              {isBrokerSide ? "ChainTrack" : "DeliWer"}
            </span>
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigateToItem(item.path, item.external)}
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  item.external
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : isActive(item.path)
                    ? isBrokerSide
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

            {/* ── 2-way Mode Switcher: Home Service ↔ Brokers ── */}
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
                  title="DeliWer — Home Services for residents"
                  data-testid="mode-b2c"
                >Home Service</button>
                <button
                  onClick={() => switchMode("b2b")}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                    currentMode === "b2b"
                      ? "bg-purple-500 text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  title="ChainTrack — Broker & Business Opportunity"
                  data-testid="mode-b2b"
                >Brokers</button>
              </div>
            </div>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Partner & Earn — gateway on consumer side; crossover link on broker side */}
            <Link href="/partners">
              <Button
                className={`relative font-black uppercase tracking-widest text-[10px] px-4 rounded-xl gap-1.5 transition-all ${
                  isBrokerSide
                    ? "bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 border border-purple-500/40"
                    : "bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/40"
                }`}
                data-testid="nav-partners-cta"
              >
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${isBrokerSide ? "bg-purple-400" : "bg-emerald-400"}`} />
                {isBrokerSide ? "Broker Hub" : "Partner & Earn"}
              </Button>
            </Link>

            <Button
              variant="outline"
              className={`font-black uppercase tracking-widest text-[10px] px-6 rounded-xl ${
                isBrokerSide
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

      {/* ── Trust Strip — consumer side only ── */}
      {!isBrokerSide && (
        <div className="bg-slate-950/90 backdrop-blur-sm border-b border-white/10 py-1 px-4 overflow-x-auto no-scrollbar relative z-50">
          <div className="max-w-7xl mx-auto flex justify-start min-w-max">
            <TrustStrip variant="dark" showContact={true} />
          </div>
        </div>
      )}

      {/* ── Mobile Nav Dropdown ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden absolute top-full left-0 right-0 border-b p-6 space-y-3 z-[70] shadow-2xl ${
              isBrokerSide
                ? "bg-indigo-950 border-purple-500/20"
                : "bg-slate-900 border-white/10"
            }`}
          >
            {/* 2-way mode switcher */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Switch view
              </div>
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl border border-emerald-500/40 bg-slate-900 ring-1 ring-emerald-500/20 shadow-[0_0_18px_-4px_rgba(16,185,129,0.45)]">
                <button
                  onClick={() => switchMode("b2c")}
                  className={`text-[10px] font-black uppercase tracking-widest h-11 rounded-lg transition-all ${
                    currentMode === "b2c" ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"
                  }`}
                  data-testid="mode-b2c-mobile"
                >
                  Home Service
                </button>
                <button
                  onClick={() => switchMode("b2b")}
                  className={`text-[10px] font-black uppercase tracking-widest h-11 rounded-lg transition-all ${
                    currentMode === "b2b" ? "bg-purple-500 text-white shadow-md" : "text-slate-300 hover:bg-slate-800"
                  }`}
                  data-testid="mode-b2b-mobile"
                >
                  Brokers
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigateToItem(item.path, item.external)}
                className={`w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl ${
                  item.external
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : isActive(item.path)
                    ? isBrokerSide
                      ? "bg-purple-500/15 text-purple-300"
                      : "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-400"
                }`}
                data-testid={`nav-mobile-${item.id}`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${item.external ? "text-red-500" : isBrokerSide ? "text-purple-500" : "text-emerald-500"}`} />
                {item.label}
              </Button>
            ))}

            <div className="w-full h-px bg-white/10" />

            {/* Partner & Earn — crossover gateway on both sides */}
            <Link href="/partners">
              <Button
                className={`w-full justify-between text-xs font-black uppercase tracking-widest h-14 rounded-xl border transition-all ${
                  isBrokerSide
                    ? "bg-purple-600/15 text-purple-300 border-purple-500/30 hover:bg-purple-600/25"
                    : "bg-emerald-600/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600/25"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-partner-earn"
              >
                <div className="flex items-center gap-3">
                  <Handshake className={`w-5 h-5 shrink-0 ${isBrokerSide ? "text-purple-400" : "text-emerald-400"}`} />
                  <div className="text-left">
                    <div>{isBrokerSide ? "Broker Hub" : "Partner & Earn"}</div>
                    <div className={`text-[9px] normal-case font-bold tracking-normal ${isBrokerSide ? "text-purple-500/70" : "text-emerald-500/70"}`}>
                      {isBrokerSide ? "Broker portal & business tools" : "AED 150–800+ per client"}
                    </div>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${isBrokerSide ? "bg-purple-400" : "bg-emerald-400"}`} />
              </Button>
            </Link>

            {!isBrokerSide && (
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
                isBrokerSide
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
