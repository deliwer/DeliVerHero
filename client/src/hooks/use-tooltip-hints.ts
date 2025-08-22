import { useState, useEffect } from "react";

export interface TooltipHint {
  id: string;
  title: string;
  content: string;
  type?: "info" | "tip" | "achievement" | "action";
  position?: "top" | "bottom" | "left" | "right";
  target: string;
  delay?: number;
  showOnce?: boolean;
  priority?: "low" | "medium" | "high";
  conditions?: {
    page?: string[];
    userLevel?: string[];
    firstTime?: boolean;
    elementVisible?: boolean;
  };
  actionText?: string;
  onAction?: () => void;
}

// Predefined tooltip hints for the DeliWer platform
const defaultHints: TooltipHint[] = [
  {
    id: "iphone-calculator-intro",
    title: "Check Your iPhone Value",
    content: "Select your iPhone model and condition to see how much it's worth. Our AI calculator gives you instant, accurate valuations.",
    type: "tip",
    target: "device-simulator",
    delay: 10000,
    position: "right",
    priority: "high",
    conditions: {
      page: ["/", "/home"],
      firstTime: true
    },
    actionText: "Try Calculator",
    onAction: () => {
      const element = document.querySelector('[data-testid="device-simulator"]');
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
  {
    id: "start-mission-cta",
    title: "Ready to Be a Hero?",
    content: "Click 'Start Mission' to begin your environmental journey. You'll earn points, save the planet, and get premium water systems.",
    type: "action",
    target: "button-start-mission",
    delay: 5000,
    position: "bottom",
    priority: "high",
    conditions: {
      page: ["/", "/home"]
    },
    actionText: "Start Now"
  },
  {
    id: "leaderboard-intro",
    title: "Join the Heroes",
    content: "See Dubai's top environmental heroes! Every iPhone trade, referral, and eco-action earns you points and moves you up the rankings.",
    type: "achievement",
    target: "leaderboard",
    delay: 8000,
    position: "left",
    priority: "medium",
    conditions: {
      page: ["/", "/home"]
    }
  },
  {
    id: "impact-stats-meaning",
    title: "Real Environmental Impact",
    content: "These numbers show the actual environmental impact of our Dubai Heroes community. Your actions contribute to these growing totals!",
    type: "info",
    target: "stat-bottles",
    delay: 10000,
    position: "top",
    priority: "medium",
    conditions: {
      page: ["/", "/home"]
    }
  },
  {
    id: "aquacafe-packages",
    title: "Hero Water Systems",
    content: "Use your iPhone trade credit towards premium AquaCafe water filtration. Hero packages start at AED 999 with your device trade-in.",
    type: "tip",
    target: "aquacafe-packages",
    delay: 3000,
    position: "top",
    priority: "high",
    conditions: {
      page: ["/aquacafe"]
    }
  },
  {
    id: "mobile-navigation",
    title: "Easy Navigation",
    content: "Tap the menu button to explore all DeliWer features: Community, Delivery tracking, Impact dashboard, and more!",
    type: "tip",
    target: "button-mobile-menu",
    delay: 1500,
    position: "bottom",
    priority: "medium",
    conditions: {
      firstTime: true
    }
  },
  {
    id: "ai-concierge-help",
    title: "Need Help? Ask Our AI",
    content: "Our AI Concierge can help you calculate trade values, find the best AquaCafe package, or answer any questions about your hero journey.",
    type: "info",
    target: "ai-concierge",
    delay: 15000,
    position: "left",
    priority: "low"
  }
];

export function useTooltipHints() {
  const [activeHints, setActiveHints] = useState<TooltipHint[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("");
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Track current page
    setCurrentPage(window.location.pathname);
    
    // Check if first visit
    const hasVisited = localStorage.getItem('deliwer_has_visited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('deliwer_has_visited', 'true');
    }

    // Filter and activate relevant hints
    const relevantHints = defaultHints.filter(hint => {
      const conditions = hint.conditions || {};
      
      // Check page conditions
      if (conditions.page && !conditions.page.includes(window.location.pathname)) {
        return false;
      }
      
      // Check first time condition
      if (conditions.firstTime && !isFirstVisit) {
        return false;
      }
      
      // Check if hint was already dismissed
      if (hint.showOnce !== false && localStorage.getItem(`tooltip_dismissed_${hint.id}`) === 'true') {
        return false;
      }
      
      return true;
    });

    // Sort by priority and set active hints
    const sortedHints = relevantHints.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium'];
    });

    setActiveHints(sortedHints);
  }, [currentPage, isFirstVisit]);

  const dismissHint = (hintId: string) => {
    setActiveHints(prev => prev.filter(hint => hint.id !== hintId));
  };

  const dismissAllHints = () => {
    activeHints.forEach(hint => {
      localStorage.setItem(`tooltip_dismissed_${hint.id}`, 'true');
    });
    setActiveHints([]);
  };

  const resetHints = () => {
    defaultHints.forEach(hint => {
      localStorage.removeItem(`tooltip_dismissed_${hint.id}`);
    });
    localStorage.removeItem('deliwer_has_visited');
    window.location.reload();
  };

  const addCustomHint = (hint: TooltipHint) => {
    setActiveHints(prev => [...prev, hint]);
  };

  return {
    activeHints,
    dismissHint,
    dismissAllHints,
    resetHints,
    addCustomHint,
    isFirstVisit
  };
}