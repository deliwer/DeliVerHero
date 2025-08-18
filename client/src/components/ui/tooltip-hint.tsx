import { useState, useEffect, useRef } from "react";
import { X, Info, Lightbulb, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TooltipHintProps {
  id: string;
  title: string;
  content: string;
  type?: "info" | "tip" | "achievement" | "action";
  position?: "top" | "bottom" | "left" | "right";
  target: string; // CSS selector or data-testid
  delay?: number;
  showOnce?: boolean;
  priority?: "low" | "medium" | "high";
  autoShow?: boolean; // Control whether to show automatically
  isVisible?: boolean; // External control of visibility
  onDismiss?: () => void;
  onAction?: () => void;
  actionText?: string;
}

const typeConfig = {
  info: {
    icon: Info,
    color: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    badgeColor: "bg-blue-500/20 text-blue-500"
  },
  tip: {
    icon: Lightbulb,
    color: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    badgeColor: "bg-amber-500/20 text-amber-500"
  },
  achievement: {
    icon: Target,
    color: "bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30",
    badgeColor: "bg-hero-green-500/20 text-hero-green-500"
  },
  action: {
    icon: Zap,
    color: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    badgeColor: "bg-purple-500/20 text-purple-500"
  }
};

export function TooltipHint({
  id,
  title,
  content,
  type = "info",
  position = "top",
  target,
  delay = 1000,
  showOnce = true,
  priority = "medium",
  autoShow = false, // Default to manual control
  isVisible: externalIsVisible,
  onDismiss,
  onAction,
  actionText
}: TooltipHintProps) {
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use external visibility control if provided, otherwise use internal state
  const isVisible = externalIsVisible !== undefined ? externalIsVisible : internalIsVisible;

  const config = typeConfig[type];
  const IconComponent = config.icon;

  useEffect(() => {
    // Check if this tooltip has been dismissed before
    if (showOnce && localStorage.getItem(`tooltip_dismissed_${id}`) === 'true') {
      return;
    }

    // Find target element
    const element = document.querySelector(`[data-testid="${target}"]`) as HTMLElement ||
                   document.querySelector(target) as HTMLElement;
    
    if (!element) {
      console.warn(`Tooltip target not found: ${target}`);
      return;
    }

    setTargetElement(element);

    // Only auto-show if autoShow is enabled
    if (autoShow) {
      timeoutRef.current = setTimeout(() => {
        setInternalIsVisible(true);
        calculatePosition(element);
      }, delay);
    }

    // Recalculate position on window resize
    const handleResize = () => {
      if (isVisible && element) {
        calculatePosition(element);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [id, target, delay, showOnce, autoShow, isVisible]);

  // Handle click outside to dismiss
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        handleDismiss();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleDismiss();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible]);

  const calculatePosition = (element: HTMLElement) => {
    if (!tooltipRef.current) return;

    const elementRect = element.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = elementRect.top + scrollY - tooltipRect.height - 12;
        left = elementRect.left + scrollX + (elementRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = elementRect.bottom + scrollY + 12;
        left = elementRect.left + scrollX + (elementRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = elementRect.top + scrollY + (elementRect.height - tooltipRect.height) / 2;
        left = elementRect.left + scrollX - tooltipRect.width - 12;
        break;
      case 'right':
        top = elementRect.top + scrollY + (elementRect.height - tooltipRect.height) / 2;
        left = elementRect.right + scrollX + 12;
        break;
    }

    // Keep tooltip within viewport
    const maxLeft = window.innerWidth - tooltipRect.width - 20;
    const maxTop = window.innerHeight - tooltipRect.height - 20;
    
    left = Math.max(20, Math.min(left, maxLeft));
    top = Math.max(20, Math.min(top, maxTop));

    setTooltipPosition({ top, left });
  };

  const handleDismiss = () => {
    if (externalIsVisible !== undefined) {
      // If externally controlled, call onDismiss to let parent handle
      onDismiss?.();
    } else {
      // If internally controlled, update internal state
      setInternalIsVisible(false);
    }
    
    if (showOnce) {
      localStorage.setItem(`tooltip_dismissed_${id}`, 'true');
    }
    onDismiss?.();
  };

  const handleAction = () => {
    onAction?.();
    handleDismiss();
  };

  if (!isVisible || !targetElement) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <div className="absolute inset-0 bg-black/20" />
        {/* Spotlight effect on target element */}
        <div
          className="absolute bg-white/10 rounded-lg border-2 border-white/30 shadow-lg animate-pulse"
          style={{
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 4,
            left: targetElement.getBoundingClientRect().left + window.pageXOffset - 4,
            width: targetElement.getBoundingClientRect().width + 8,
            height: targetElement.getBoundingClientRect().height + 8,
          }}
        />
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-auto"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
        data-testid={`tooltip-${id}`}
      >
        <Card className="w-80 bg-gradient-to-br from-slate-800/95 to-slate-900/98 backdrop-blur-lg border-slate-600/70 shadow-2xl">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${config.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{title}</h4>
                  <Badge variant="outline" className={`text-xs ${config.badgeColor} border-current`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white p-1 h-auto"
                data-testid={`tooltip-close-${id}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {content}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              {actionText && onAction && (
                <Button
                  onClick={handleAction}
                  className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white text-sm h-8"
                  data-testid={`tooltip-action-${id}`}
                >
                  {actionText}
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white text-sm h-8 ml-auto"
                data-testid={`tooltip-dismiss-${id}`}
              >
                Got it
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Arrow */}
        <div
          className={`absolute w-3 h-3 bg-slate-800 border border-slate-600 transform rotate-45 ${
            position === 'top' ? 'bottom-[-7px] left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'top-[-7px] left-1/2 -translate-x-1/2' :
            position === 'left' ? 'right-[-7px] top-1/2 -translate-y-1/2' :
            'left-[-7px] top-1/2 -translate-y-1/2'
          }`}
        />
      </div>
    </>
  );
}