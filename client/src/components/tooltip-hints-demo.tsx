import { useTooltipHints } from "@/hooks/use-tooltip-hints";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Eye, Target, X } from "lucide-react";

export function TooltipHintsDemo() {
  const { 
    activeHints, 
    dismissAllHints, 
    resetHints, 
    addCustomHint, 
    isFirstVisit 
  } = useTooltipHints();

  const handleAddCustomHint = () => {
    addCustomHint({
      id: "custom-demo",
      title: "Custom Tooltip Demo",
      content: "This is a custom tooltip added dynamically! It demonstrates how you can create contextual hints on demand.",
      type: "info",
      target: "demo-tooltip-button",
      delay: 500,
      position: "top",
      priority: "high",
      showOnce: false
    });
  };

  const handleViewStats = () => {
    const impactStats = document.querySelector('[data-testid="impact-stats"]');
    if (impactStats) {
      impactStats.scrollIntoView({ behavior: 'smooth', block: 'center' });
      addCustomHint({
        id: "stats-focus",
        title: "Environmental Impact Focus",
        content: "These numbers represent real environmental impact! Every trade, every action by our Dubai Heroes contributes to these growing totals.",
        type: "achievement",
        target: "impact-stats",
        delay: 1000,
        position: "top",
        priority: "high",
        showOnce: false
      });
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <Card className="w-72 bg-slate-800/95 backdrop-blur-lg border-slate-600/70 shadow-2xl">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <h4 className="text-white font-semibold mb-2">Tooltip Hints System</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Active: {activeHints.length} hints</p>
              <p>First visit: {isFirstVisit ? "Yes" : "No"}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={handleAddCustomHint}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-8"
              data-testid="demo-tooltip-button"
            >
              <Eye className="w-3 h-3 mr-2" />
              Demo Custom Hint
            </Button>
            
            <Button
              onClick={handleViewStats}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-8"
            >
              <Target className="w-3 h-3 mr-2" />
              Highlight Impact
            </Button>
            
            <Button
              onClick={dismissAllHints}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:text-white text-sm h-8"
            >
              <X className="w-3 h-3 mr-2" />
              Dismiss All
            </Button>
            
            <Button
              onClick={resetHints}
              variant="outline"
              className="w-full border-orange-600 text-orange-400 hover:text-orange-300 text-sm h-8"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Reset System
            </Button>
          </div>
          
          <div className="text-xs text-gray-400 text-center mt-3 pt-3 border-t border-slate-600">
            Contextual tooltips help guide users through the DeliWer experience
          </div>
        </CardContent>
      </Card>
    </div>
  );
}