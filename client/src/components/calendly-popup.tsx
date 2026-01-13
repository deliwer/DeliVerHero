import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { trackCTA } from "@/lib/analytics";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/admin-deliwer";

export function useCalendlyScript() {
  useEffect(() => {
    const scriptId = "calendly-widget-script";
    const linkId = "calendly-widget-css";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }

    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);
}

export function openCalendlyPopup(eventType?: string) {
  const url = eventType ? `${CALENDLY_URL}/${eventType}` : CALENDLY_URL;
  
  trackCTA({
    ctaName: 'book_consultation',
    page: window.location.pathname,
    destination: 'calendly'
  });
  
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url });
  } else {
    window.open(url, "_blank");
  }
}

interface CalendlyButtonProps {
  children?: React.ReactNode;
  eventType?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  "data-testid"?: string;
}

import { Link } from "wouter";

// ... existing code ...

export function CalendlyButton({
  children,
  eventType,
  className,
  variant = "default",
  size = "default",
  "data-testid": testId,
}: CalendlyButtonProps) {
  useCalendlyScript();

  if (children && typeof children === 'object' && 'props' in children && children.props.children === ' → View move-in services') {
    return (
      <Link href="/move-in-services" className="flex-1">
        <Button
          variant={variant}
          size={size}
          className={className}
          data-testid={testId || "button-move-in-services-link"}
        >
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openCalendlyPopup(eventType)}
      data-testid={testId || "button-calendly-booking"}
    >
      {children || (
        <>
          <Calendar className="w-4 h-4 mr-2" />
          Book a Consultation
        </>
      )}
    </Button>
  );
}

interface CalendlyTriggerProps {
  children: React.ReactNode;
  eventType?: string;
  className?: string;
  "data-testid"?: string;
}

export function CalendlyTrigger({
  children,
  eventType,
  className,
  "data-testid": testId,
}: CalendlyTriggerProps) {
  useCalendlyScript();

  return (
    <div
      className={className}
      onClick={() => openCalendlyPopup(eventType)}
      style={{ cursor: "pointer" }}
      data-testid={testId || "trigger-calendly-booking"}
    >
      {children}
    </div>
  );
}
