import { Link, useLocation } from "wouter";
import { 
  Menu, X, Home, Plane, LogOut, Star, ClipboardList, Building2, CalendarCheck
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { motion, AnimatePresence } from "framer-motion";

import logoPng from "@assets/deliwer logo_1755631850889.png";

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isChaintrack = location.startsWith("/chaintrack");

  const navItems = [
    { path: "/ejari-dubai", label: "Ejari", id: "ejari", icon: Home },
    { path: "/relocate", label: "Move-In", id: "relocation", icon: Plane },
    { path: "/exit-dubai", label: "Move-Out", id: "move-out", icon: LogOut },
    { path: "/setup", label: "Setup", id: "setup", icon: Building2 },
    { path: "/consult", label: "Consult", id: "consult", icon: CalendarCheck },
    { path: "/aquacafe", label: "AquaCafe", id: "aquacafe", icon: Star },
    { path: "/errand", label: "Errand", id: "errand", icon: ClipboardList },
  ];

  const isActive = (itemPath: string) => location === itemPath;

  const handleChaintrackToggle = () => {
    if (isChaintrack) {
      setLocation("/");
    } else {
      setLocation("/chaintrack");
    }
  };

  return (
    <div className="w-full fixed top-0 z-[100]">
      {/* 1. Main Navigation Bar */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-3 group order-1 mr-auto md:mr-0">
            <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={logoPng} alt="DeliWer Logo" className="h-8 w-auto object-contain" />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter uppercase">DeliWer</span>
          </Link>

          {/* CENTER: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 order-2 mx-auto">
            {navItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                    isActive(item.path)
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* ChainTrack B2B toggle */}
            <button
              onClick={handleChaintrackToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all group ${
                isChaintrack
                  ? "border-purple-500/70 bg-purple-500/20 hover:bg-purple-500/25"
                  : "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60 hover:bg-purple-500/15"
              }`}
              title={isChaintrack ? "Exit ChainTrack B2B" : "Enter ChainTrack B2B Wholesale"}
              data-testid="button-chaintrack-toggle"
            >
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isChaintrack ? "text-purple-300" : "text-purple-400 group-hover:text-purple-300"}`}>
                B2B
              </span>
              {/* Toggle pill */}
              <div className={`relative w-8 h-4 rounded-full border flex items-center transition-colors ${isChaintrack ? "bg-purple-600 border-purple-400" : "bg-slate-700 border-slate-600"}`}>
                <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200 ${isChaintrack ? "translate-x-[18px]" : "translate-x-0.5"}`} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isChaintrack ? "text-purple-300" : "text-purple-400 group-hover:text-purple-300"}`}>
                Chain<span className="text-purple-300">track</span>
              </span>
            </button>

            <div className="w-px h-4 bg-white/10 mx-2" />
            <Button
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-black uppercase tracking-widest text-[10px] px-6 rounded-xl"
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
            className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 space-y-3 z-[70] shadow-2xl"
          >
            {navItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-xs font-black uppercase tracking-widest h-14 rounded-xl ${
                    isActive(item.path)
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3 text-emerald-500" /> {item.label}
                </Button>
              </Link>
            ))}

            {/* ChainTrack B2B toggle — mobile */}
            <button
              onClick={() => {
                handleChaintrackToggle();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-5 h-14 rounded-xl border transition-all ${
                isChaintrack
                  ? "border-purple-500/60 bg-purple-500/15"
                  : "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10"
              }`}
              data-testid="button-chaintrack-toggle-mobile"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isChaintrack ? "bg-purple-400" : "bg-purple-500 animate-pulse"}`} />
                <span className="text-xs font-black uppercase tracking-widest text-purple-400">
                  {isChaintrack ? "Exit ChainTrack B2B" : "ChainTrack B2B"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{isChaintrack ? "ON" : "OFF"}</span>
                <div className={`relative w-10 h-5 rounded-full border flex items-center px-0.5 transition-colors ${isChaintrack ? "bg-purple-600 border-purple-400" : "bg-slate-700 border-slate-600"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${isChaintrack ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>
            </button>

            <Button
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-xs"
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
