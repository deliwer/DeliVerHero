import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { SiWhatsapp as WhatsAppIcon } from "react-icons/si";
import { Gift, Clock, MapPin, Zap, Users } from "lucide-react";

export function FloatingErrandTips() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Only show on /errand page or other service pages
  const isRelevantPage = location === "/errand" || location === "/home-service" || location === "/residence";

  useEffect(() => {
    // Rotate tips every 8 seconds only if open
    if (isOpen && !hasInteracted) {
      const timer = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isOpen, hasInteracted]);

  const tips = [
    {
      title: "Shopping & Pickup",
      description: "Grocery, pharmacy, gifts, returns",
      icon: Gift,
      color: "orange",
      targetPage: "/errand",
      targetSection: "errand",
      action: "Browse Services",
      isWhatsApp: false,
    },
    {
      title: "Bill Payments",
      description: "Utility bills, fees, deposits",
      icon: Clock,
      color: "orange",
      targetPage: "/errand",
      targetSection: "errand",
      action: "Learn More",
      isWhatsApp: false,
    },
    {
      title: "Quick Delivery",
      description: "Same-day delivery, last-minute gifts",
      icon: MapPin,
      color: "orange",
      targetPage: "/errand",
      targetSection: "home-essentials",
      action: "Get Started",
      isWhatsApp: false,
    },
    {
      title: "Pro Tip",
      description: "Bundle 3+ errands for 15% savings",
      icon: Zap,
      color: "purple",
      targetPage: "/errand",
      targetSection: "concierge",
      action: "Learn More",
      isWhatsApp: false,
    },
    {
      title: "WhatsApp Booking",
      description: "Direct booking available - average 2 min response",
      icon: WhatsAppIcon,
      color: "green",
      targetPage: "/errand",
      targetSection: "whatsapp-agents",
      action: "Chat Now",
      isWhatsApp: true,
    },
  ];

  const currentTip = tips[currentTipIndex];
  const CurrentIcon = currentTip.icon;

  const navigateToSection = () => {
    setHasInteracted(true);
    
    // Try to find section on current page first
    const sectionSelector = `#${currentTip.targetSection}`;
    const element = document.querySelector(sectionSelector);
    
    if (element && location === currentTip.targetPage) {
      // Section exists on current page - scroll to it
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setHasInteracted(false), 3000);
    } else {
      // Navigate to target page with section anchor
      // Using window.location.href will navigate and browser auto-scrolls to anchor
      window.location.href = `${currentTip.targetPage}#${currentTip.targetSection}`;
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/971523946311", "_blank");
  };

  if (!isRelevantPage || !isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-xs">
      <Card className="shadow-lg border-orange-200/50 dark:border-orange-900/30 overflow-hidden">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${
            currentTip.color === "orange"
              ? "from-orange-500/10 to-orange-500/5"
              : currentTip.color === "purple"
                ? "from-purple-500/10 to-purple-500/5"
                : "from-green-500/10 to-green-500/5"
          } px-4 py-3 border-b border-border/30 flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full ${
                currentTip.color === "orange"
                  ? "bg-orange-500/20"
                  : currentTip.color === "purple"
                    ? "bg-purple-500/20"
                    : "bg-green-500/20"
              } flex items-center justify-center flex-shrink-0`}
            >
              <CurrentIcon
                className={`w-4 h-4 ${
                  currentTip.color === "orange"
                    ? "text-orange-500"
                    : currentTip.color === "purple"
                      ? "text-purple-500"
                      : "text-green-500"
                }`}
              />
            </div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              {currentTip.title}
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-close-errand-tips"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            {currentTip.description}
          </p>

          <div className="flex gap-2 mb-3">
            {currentTip.isWhatsApp ? (
              <Button
                size="sm"
                className="flex-1 text-xs h-8"
                variant="default"
                onClick={openWhatsApp}
                data-testid="button-whatsapp-popup"
              >
                <WhatsAppIcon className="w-3 h-3 mr-1" />
                {currentTip.action}
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1 text-xs h-8"
                variant="default"
                onClick={navigateToSection}
                data-testid={`button-navigate-${currentTip.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {currentTip.action}
              </Button>
            )}
          </div>

          {/* Tip Navigation */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/30">
            <div className="flex gap-1">
              {tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTipIndex(index);
                    setHasInteracted(true);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentTipIndex
                      ? "bg-orange-500"
                      : "bg-border/50 hover:bg-border"
                  }`}
                  data-testid={`button-tip-${index}`}
                />
              ))}
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => {
                  setCurrentTipIndex(
                    (prev) => (prev - 1 + tips.length) % tips.length
                  );
                  setHasInteracted(true);
                }}
                className="p-1 hover:bg-muted rounded transition-colors"
                data-testid="button-prev-tip"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  setCurrentTipIndex((prev) => (prev + 1) % tips.length);
                  setHasInteracted(true);
                }}
                className="p-1 hover:bg-muted rounded transition-colors"
                data-testid="button-next-tip"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Subtle Info Text */}
      <p className="text-xs text-muted-foreground mt-2 text-right px-2">
        💡 Service Tips
      </p>
    </div>
  );
}
