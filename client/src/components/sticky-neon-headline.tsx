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