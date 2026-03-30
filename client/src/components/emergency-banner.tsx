import { useState, useEffect } from "react";
import { Link } from "wouter";
import { AlertTriangle, X, Radio, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "deliwer_emergency_banner_dismissed";

export function EmergencyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full bg-gradient-to-r from-red-950 via-amber-950 to-red-950 border-b border-red-800/60 overflow-hidden z-[110] relative"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-red-400 hidden sm:block">
                Preparedness
              </span>
            </div>

            <div className="flex-1 flex items-center gap-3 min-w-0 overflow-hidden">
              <p className="text-amber-200 text-[11px] font-medium truncate">
                UAE residents: Register your emergency exit plan and join the crisis readiness network — free.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link href="/wartime-readiness">
                <button
                  className="text-[10px] font-black uppercase tracking-widest bg-amber-500/25 hover:bg-amber-500/40 border border-amber-500/50 text-amber-300 px-3 py-1 rounded-md transition-colors whitespace-nowrap"
                  data-testid="banner-wartime-link"
                >
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3 h-3" />
                    Readiness
                  </span>
                </button>
              </Link>
              <Link href="/emergency-exit">
                <button
                  className="text-[10px] font-black uppercase tracking-widest bg-red-500/25 hover:bg-red-500/40 border border-red-500/50 text-red-300 px-3 py-1 rounded-md transition-colors whitespace-nowrap"
                  data-testid="banner-exit-link"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    Exit Plan
                  </span>
                </button>
              </Link>
              <button
                onClick={dismiss}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                aria-label="Dismiss"
                data-testid="banner-dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
