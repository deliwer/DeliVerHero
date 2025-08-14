import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star } from "lucide-react";

export function StickyNeonHeadline() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show sticky headline after scrolling past hero section (approximately 600px)
      setIsVisible(currentScrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-hero-green-500/30"
          style={{
            background: `linear-gradient(135deg, 
              rgba(0, 0, 0, 0.95) 0%, 
              rgba(16, 185, 129, 0.1) 50%, 
              rgba(0, 0, 0, 0.95) 100%)`
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center text-center">
              <motion.div
                animate={{
                  textShadow: [
                    "0 0 5px #10b981, 0 0 10px #10b981, 0 0 15px #10b981",
                    "0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981",
                    "0 0 5px #10b981, 0 0 10px #10b981, 0 0 15px #10b981"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg md:text-xl font-bold text-white tracking-wide"
                style={{
                  color: "#10b981",
                  textShadow: "0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981"
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                  
                  <span className="hidden md:inline">
                    The Sustainability Game of Dubai — Complete Missions • Save Money • Save the Planet
                  </span>
                  
                  <span className="md:hidden">
                    Dubai's Sustainability Game — Complete Missions & Save the Planet
                  </span>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Star className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Neon border effect */}
          <motion.div
            animate={{
              boxShadow: [
                "inset 0 -1px 0 #10b981",
                "inset 0 -2px 0 #10b981, 0 1px 10px rgba(16, 185, 129, 0.3)",
                "inset 0 -1px 0 #10b981"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-hero-green-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}