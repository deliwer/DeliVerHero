import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";

export function DelayedContextPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("deliwer_context_popup_seen");
    
    if (hasSeenPopup) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("deliwer_context_popup_seen", "true");
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-300"
      data-testid="popup-context-tip"
    >
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl p-5 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          data-testid="button-dismiss-popup"
        >
          <X className="w-4 h-4" />
        </button>
        
        <p className="text-white text-sm mb-4 pr-6">
          Many visitors start with smart home services and later explore relocation or investment options in Dubai.
        </p>
        
        <Link href="/relocate">
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-500"
            onClick={handleDismiss}
            data-testid="button-speak-advisor-popup"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Speak to an Advisor
          </Button>
        </Link>
      </div>
    </div>
  );
}
