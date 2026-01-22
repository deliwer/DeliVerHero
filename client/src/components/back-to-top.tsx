import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <Button
        size="icon"
        onClick={scrollToTop}
        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg transition-all hover-elevate active-elevate-2"
        data-testid="button-back-to-top"
      >
        <ChevronUp className="w-6 h-6" />
      </Button>
    </div>
  );
}
