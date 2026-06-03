import { Link, useLocation } from "wouter";
import {
  Menu, X, Home, Plane, LogOut, Star, ClipboardList, Building2, CalendarCheck,
  Package, RefreshCw, Truck, Crown, LayoutGrid, ShoppingBag, AlertTriangle, Handshake,
  Briefcase, Percent, MapPin, Users, DollarSign, BookOpen, Smartphone, Youtube, Key,
  Settings, BarChart3, Mail, Database, UserCheck, Megaphone, Shield, Anchor, Route, Zap
} from "lucide-react";
import { LogisticsCTABar } from "@/components/logistics-cta-bar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { motion, AnimatePresence } from "framer-motion";
import { EmergencyBanner } from "@/components/emergency-banner";

import logoPng from "@assets/deliwer logo_1755631850889.png";

// ── Broker/ChainTrack side paths ─────────────────────────────────────────────
const CHAINTRACK_PATHS = [
  "/chaintrack", "/wholesale", "/bulk-purchasing", "/bulk-tradein",
  "/buy/reverse-auction", "/buy/chaintrack", "/buy/wsc", "/buy/ktcorp",
  "/cis-electronics", "/cis-azerbaijan", "/cis-kazakhstan", "/cis-uzbekistan",
  "/cis-russia", "/cis-georgia", "/cis-kyrgyzstan",
  "/fulfillment", "/membership-plans", "/corporate",
  "/cobone-corporate", "/account-management",
  "/partners", "/broker-onboard", "/broker-onboarding", "/brokers",
  "/partner-program", "/partner-dashboard", "/corporate-partner-portal",
  "/planet-hero-affiliates", "/affiliate-dashboard",
  "/logistics", "/freight-broker",
  "/phone-flippers",
];

// ── Management / Admin paths — live under the Partners (broker) side ──────────
const MANAGEMENT_PATHS = [
  "/marketing",
  "/admin",
  "/operations",
  "/sendgrid-dashboard",
  "/capture-admin",
  "/habtoor-admin",
  "/investor-dashboard",
  "/corporate-dashboard",
  "/broker-master-db",
  "/email-campaigns",
  "/mission-control-saqi-kawthar",
  "/admin/reverse-auction",
];

// ── Consumer side paths (unused placeholder kept for future expansion) ────────
const REALESTATE_PATHS: string[] = [];

// ── Consumer / Home Service nav items (DeliWer.com) ─────────────────────────
const deliwerNavItems = [
  { path: "/flexible-rentals", label: "Flex Living",     id: "flex-living",    icon: Key },
  { path: "/ejari",            label: "Ejari",           id: "ejari",          icon: Building2 },
  { path: "/relocate",         label: "Move-In",         id: "relocation",     icon: Plane },
  { path: "/exit-dubai",       label: "Move-Out",        id: "move-out",       icon: LogOut },
  { path: "/home-services",    label: "Home Service",    id: "home-service",   icon: Star },
  { path: "/errand",           label: "Errand",          id: "errand",         icon: ClipboardList },
  { path: "/private-jet",      label: "Private Jet",     id: "private-jet",    icon: Crown },
];

// ── Broker / Partner nav items ────────────────────────────────────────────────
const brokerNavItems = [
  { path: "/logistics",                              label: "Corridor",        id: "ct-logistics", icon: Anchor,       external: false },
  { path: "/broker-onboard",                         label: "Broker Portal",   id: "ct-broker",    icon: Briefcase,    external: false },
  { path: "/partners",                               label: "Partner Program", id: "ct-partners",  icon: Users,        external: false },
  { path: "/freight-broker",                         label: "Freight Hub",     id: "ct-freight",   icon: Route,        external: false },
  { path: "/partner-dashboard",                      label: "Dashboard",       id: "ct-dashboard", icon: LayoutGrid,   external: false },
  { path: "https://www.youtube.com/@vdeliwer",       label: "Training",        id: "ct-training",  icon: Youtube,      external: true  },
];

// ── Management / Admin nav items — shown when inside admin/marketing paths ────
const managementNavItems = [
  { path: "/marketing",           label: "Marketing Hub",  id: "mgmt-marketing",  icon: Megaphone,  external: false },
  { path: "/partner-dashboard",   label: "Partner Dash",   id: "mgmt-partner",    icon: LayoutGrid, external: false },
  { path: "/admin/brokers",       label: "Broker Admin",   id: "mgmt-brokers",    icon: UserCheck,  external: false },
  { path: "/admin/flex-rentals",  label: "Flex Admin",     id: "mgmt-flex",       icon: Settings,   external: false },
  { path: "/sendgrid-dashboard",  label: "Email Campaigns",id: "mgmt-email",      icon: Mail,       external: false },
  { path: "/broker-master-db",    label: "Broker DB",      id: "mgmt-db",         icon: Database,   external: false },
];

// ── ChainTrack deep-nav (phone marketplace only) ─────────────────────────────
const chaintrackNavItems = [
  { path: "/logistics",        label: "Logistics",      id: "ct-logistics",   icon: Anchor },
  { path: "/chaintrack",       label: "Marketplace",    id: "ct-marketplace", icon: LayoutGrid },
  { path: "/wholesale",        label: "Bulk Buy",       id: "ct-bulk",        icon: Package },
  { path: "/cis-electronics",  label: "CIS Electronics",id: "ct-electronics", icon: Smartphone },
  { path: "/fulfillment",      label: "Fulfillment",    id: "ct-fulfillment", icon: Truck },
  { path: "/corporate",        label: "Corporate",      id: "ct-corporate",   icon: Building2 },
  { path: "/phone-flippers",   label: "Flippers",       id: "ct-flippers",    icon: Star },
];

// ── Dedicated ChainTrack Logistics nav (broker-side only) ────────────────────
const LOGISTICS_PATHS = ["/logistics", "/freight-broker", "/logistics-funnel", "/air-charter", "/pricing-logistics"];

const logisticsNavItems = [
  { path: "/chaintrack",         label: "Marketplace",     id: "lg-marketplace",  icon: LayoutGrid },
  { path: "/air-charter",        label: "Air Charter",     id: "lg-air-charter",  icon: Plane },
  { path: "/freight-broker",     label: "Freight Hub",     id: "lg-freight",      icon: Route },
  { path: "/pricing-logistics",  label: "Pricing",         id: "lg-pricing",      icon: DollarSign },
  { path: "/logistics-funnel",   label: "Join Network",    id: "lg-funnel",       icon: Zap },
  { path: "/partners",           label: "Partners",        id: "lg-partners",     icon: Users },
];

// Paths that are "deep" inside the ChainTrack phone marketplace (NOT logistics)
const DEEP_CHAINTRACK_PATHS = [
  "/chaintrack", "/wholesale", "/bulk-purchasing", "/bulk-tradein",
  "/buy/reverse-auction", "/buy/chaintrack", "/buy/wsc", "/buy/ktcorp",
  "/cis-electronics", "/cis-azerbaijan", "/cis-kazakhstan", "/cis-uzbekistan",
  "/cis-russia", "/cis-georgia", "/cis-kyrgyzstan",
  "/fulfillment", "/membership-plans", "/corporate",
  "/cobone-corporate", "/phone-flippers",
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isManagementSide = MANAGEMENT_PATHS.some((p) => location === p || location.startsWith(p + "/"));
  const isLogisticsSide = LOGISTICS_PATHS.some((p) => location.startsWith(p));
  const isBrokerSide = isManagementSide || isLogisticsSide || CHAINTRACK_PATHS.some((p) => location.startsWith(p));
  const isDeepChaintrack = !isLogisticsSide && DEEP_CHAINTRACK_PATHS.some((p) => location.startsWith(p));

  // Nav items: management → admin; logistics-side → dedicated logistics nav;
  // deep ChainTrack marketplace → marketplace nav; other broker-side → broker nav; consumer → deliwer nav.
  const navItems = isManagementSide
    ? managementNavItems
    : isLogisticsSide
      ? logisticsNavItems
      : isDeepChaintrack
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

  // Two-way switcher: Home Service (consumer) ↔ ChainTrack Logistics (B2B)
  const switchMode = (mode: "b2c" | "b2b") => {
    if (mode === "b2c") setLocation("/");
    else setLocation("/logistics");
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
          ? "bg-amber-950/95 border-amber-500/20"
          : "bg-slate-900/95 border-white/5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LEFT: Logo */}
          <Link
            href={isDeepChaintrack ? "/chaintrack" : isLogisticsSide || isBrokerSide ? "/logistics" : "/"}
            className="flex items-center gap-3 group order-1 mr-auto md:mr-0"
          >
            <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={logoPng} alt="DeliWer Logo" className="h-8 w-auto object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              {isBrokerSide && !isManagementSide ? (
                <span className="font-black text-xl tracking-tighter uppercase text-amber-400">ChainTrack Logistics</span>
              ) : (
                <span className={`font-black text-2xl tracking-tighter uppercase transition-colors ${
                  isManagementSide ? "text-amber-300" : "text-white"
                }`}>
                  {isManagementSide ? "ChainTrack" : "DeliWer Relocations"}
                </span>
              )}
              {isManagementSide && (
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-500/60">
                  Partner Admin
                </span>
              )}
              {isBrokerSide && !isManagementSide && (
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-500/60">
                  Air Charter · Trade Corridor
                </span>
              )}
            </div>
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            {navItems.map((item) => {
              const isLogisticsPrimary =
                (item.id === "ct-logistics" && isBrokerSide && !isLogisticsSide) ||
                (item.id === "lg-electronics" && isLogisticsSide && !isActive(item.path));
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => navigateToItem(item.path, (item as any).external)}
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                    (item as any).external
                      ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      : isLogisticsPrimary
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_-2px_rgba(245,158,11,0.4)] hover:bg-amber-500/30 hover:text-amber-200"
                      : isActive(item.path)
                      ? isBrokerSide
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {isLogisticsPrimary && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-1.5 shrink-0" />
                  )}
                  {item.label}
                </Button>
              );
            })}

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* ── 2-way Mode Switcher: Home Service ↔ Brokers ── */}
            <div className="relative flex items-center gap-1.5">
              <span className="hidden lg:inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-300/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                View
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
                >Relocations</button>
                <button
                  onClick={() => switchMode("b2b")}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                    currentMode === "b2b"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  title="ChainTrack Logistics — Dubai Gateway to the Middle East"
                  data-testid="mode-b2b"
                >Logistics</button>
              </div>
            </div>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Partner & Earn / Broker Hub / Admin CTA */}
            {isManagementSide ? (
              <Link href="/partners">
                <Button
                  className="relative font-black uppercase tracking-widest text-[10px] px-4 rounded-xl gap-1.5 transition-all bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 border border-purple-500/40"
                  data-testid="nav-admin-back-partners"
                >
                  <Shield className="w-3 h-3" />
                  Partner Hub
                </Button>
              </Link>
            ) : isLogisticsSide ? (
              <Link href="/logistics-funnel">
                <Button
                  className="relative font-black uppercase tracking-widest text-[10px] px-4 rounded-xl gap-1.5 transition-all bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40"
                  data-testid="nav-logistics-join"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  Join Network
                </Button>
              </Link>
            ) : (
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
            )}

            <Button
              variant="ghost"
              size="icon"
              className={`rounded-xl shrink-0 ${
                isBrokerSide
                  ? "text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                  : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
              }`}
              title="WhatsApp"
              onClick={() => window.open('https://wa.me/971523906019', '_blank')}
              data-testid="nav-whatsapp"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-xl shrink-0"
              title="Telegram"
              onClick={() => window.open('https://t.me/+971523946311', '_blank')}
              data-testid="nav-telegram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
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
      {/* ── ChainTrack Logistics corridor bar — all broker/chaintrack pages ── */}
      {isBrokerSide && !isManagementSide && (
        <div className="flex items-center justify-center gap-3 py-2 px-4 bg-amber-950/90 backdrop-blur-sm border-b border-amber-500/20 relative z-50">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
            ChainTrack Logistics
          </span>
          <span className="hidden sm:inline text-amber-600/60 text-[11px]">·</span>
          <span className="hidden sm:inline text-[11px] font-bold text-amber-100/50">
            Dubai Gateway · Jebel Ali Alternative · CPEC &amp; INSTC Corridors
          </span>
          <span className="hidden sm:inline text-amber-600/60 text-[11px]">·</span>
          <a href="/logistics-funnel" className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors">
            Join as Freight Broker →
          </a>
        </div>
      )}
      {/* ── Management breadcrumb bar — admin/marketing paths only ── */}
      {isManagementSide && (
        <div className="flex items-center gap-2 py-1.5 px-4 bg-purple-950/80 backdrop-blur-sm border-b border-purple-500/20 relative z-50">
          <Shield className="w-3 h-3 text-purple-400/60 shrink-0" />
          <span className="text-[9px] font-black uppercase tracking-widest text-purple-400/60">
            Partner Admin
          </span>
          <span className="text-purple-500/30 text-[10px]">·</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-purple-300/40">
            Private · Not Indexed
          </span>
        </div>
      )}
      {/* ── Flex Living Announcement Bar — consumer side only ── */}
      {!isBrokerSide && (
        <a
          href="/flexible-rentals"
          data-testid="bar-flex-living-announcement"
          className="flex items-center justify-center gap-3 py-2 px-4 bg-emerald-700/95 backdrop-blur-sm border-b border-emerald-500/30 hover:bg-emerald-600/95 transition-colors relative z-50 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest text-white">
            Flex Living
          </span>
          <span className="hidden sm:inline text-emerald-300 text-[11px] font-semibold">·</span>
          <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-emerald-100">
            Rooms &amp; Villas from AED 550/mo · No Annual Contract · Move In This Week
          </span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-widest shrink-0 group-hover:bg-white/30 transition-colors">
            Browse Rooms →
          </span>
        </a>
      )}
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
                ? "bg-amber-950 border-amber-500/20"
                : "bg-slate-900 border-white/10"
            }`}
          >
            {/* ChainTrack Logistics label for mobile — all broker pages */}
            {isBrokerSide && !isManagementSide && (
              <div className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Anchor className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-300">ChainTrack Logistics</p>
                  <p className="text-[9px] text-amber-500/60">Dubai Gateway · Gawadar Corridor</p>
                </div>
              </div>
            )}

            {/* 2-way mode switcher */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                View
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

            {/* Management section label for mobile */}
            {isManagementSide && (
              <div className="flex items-center gap-2 py-1">
                <Shield className="w-3.5 h-3.5 text-purple-400/60" />
                <span className="text-[9px] font-black uppercase tracking-widest text-purple-400/60">
                  Partner Admin
                </span>
              </div>
            )}

            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigateToItem(item.path, (item as any).external)}
                className={`w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl ${
                  (item as any).external
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : isActive(item.path)
                    ? isBrokerSide
                      ? "bg-amber-500/15 text-amber-300"
                      : "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-400"
                }`}
                data-testid={`nav-mobile-${item.id}`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${(item as any).external ? "text-red-500" : isBrokerSide ? "text-amber-500" : "text-emerald-500"}`} />
                {item.label}
              </Button>
            ))}

            <div className="w-full h-px bg-white/10" />

            {/* Partner & Earn / Broker Hub / Join Logistics Network — crossover gateway */}
            <Link href={isLogisticsSide ? "/logistics-funnel" : "/partners"}>
              <Button
                className={`w-full justify-between text-xs font-black uppercase tracking-widest h-14 rounded-xl border transition-all ${
                  isLogisticsSide
                    ? "bg-amber-600/15 text-amber-300 border-amber-500/30 hover:bg-amber-600/25"
                    : isBrokerSide
                      ? "bg-purple-600/15 text-purple-300 border-purple-500/30 hover:bg-purple-600/25"
                      : "bg-emerald-600/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600/25"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-partner-earn"
              >
                <div className="flex items-center gap-3">
                  {isLogisticsSide
                    ? <Anchor className="w-5 h-5 shrink-0 text-amber-400" />
                    : <Handshake className={`w-5 h-5 shrink-0 ${isBrokerSide ? "text-purple-400" : "text-emerald-400"}`} />
                  }
                  <div className="text-left">
                    <div>{isLogisticsSide ? "Join Freight Network" : isBrokerSide ? "Broker Hub" : "Partner & Earn"}</div>
                    <div className={`text-[9px] normal-case font-bold tracking-normal ${isLogisticsSide ? "text-amber-500/70" : isBrokerSide ? "text-purple-500/70" : "text-emerald-500/70"}`}>
                      {isLogisticsSide ? "Dubai ↔ Gawadar · Earn per CBM" : isBrokerSide ? "Broker portal & business tools" : "AED 150–800+ per client"}
                    </div>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${isLogisticsSide ? "bg-amber-400" : isBrokerSide ? "bg-purple-400" : "bg-emerald-400"}`} />
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
                  ? "bg-amber-600 hover:bg-amber-500 text-slate-950"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
              onClick={() => {
                window.open('https://wa.me/971523906019', '_blank');
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
