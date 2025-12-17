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
// Note: Home page hints disabled for cleaner UX - tooltips only shown on specific feature pages
const defaultHints: TooltipHint[] = [
  {
    id: "aquacafe-packages",
    title: "Hero Water Systems",
    content: "Use your iPhone trade credit towards premium AquaCafe water filtration. Join our Loyalty Program with AED 99 Starter Kit (FREE installation) or Hero Minimal at AED 1299.",
    type: "tip",
    target: "aquacafe-packages",
    delay: 30000,
    position: "top",
    priority: "high",
    conditions: {
      page: ["/aquacafe"]
    }
  },
  {
    id: "ai-concierge-help",
    title: "Need Help? Ask Our AI",
    content: "Our AI Concierge can help you calculate trade values, find the best AquaCafe package, or answer any questions about your hero journey.",
    type: "info",
    target: "ai-concierge",
    delay: 30000,
    position: "left",
    priority: "low",
    conditions: {
      page: ["/earn", "/products"]
    }
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