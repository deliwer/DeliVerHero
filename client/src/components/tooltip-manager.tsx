import React, { useState, useEffect } from "react";
import { HelpCircle, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipHint } from "@/components/ui/tooltip-hint";
import { useTooltipHints } from "@/hooks/use-tooltip-hints";

export function TooltipManager() {
  const { activeHints, dismissHint, dismissAllHints, resetHints } = useTooltipHints();
  const [showTooltipMenu, setShowTooltipMenu] = useState(false);
  const [visibleTooltips, setVisibleTooltips] = useState<Set<string>>(new Set());

  // Show tooltip menu when there are active hints
  useEffect(() => {
    setShowTooltipMenu(activeHints.length > 0);
  }, [activeHints.length]);

  const handleToggleTooltip = (hintId: string) => {
    setVisibleTooltips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hintId)) {
        newSet.delete(hintId);
      } else {
        newSet.add(hintId);
      }
      return newSet;
    });
  };

  const handleDismissTooltip = (hintId: string) => {
    setVisibleTooltips(prev => {
      const newSet = new Set(prev);
      newSet.delete(hintId);
      return newSet;
    });
    dismissHint(hintId);
  };

  const handleDismissAll = () => {
    setVisibleTooltips(new Set());
    dismissAllHints();
    setShowTooltipMenu(false);
  };

  const handleClickOutsideMenu = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setShowTooltipMenu(false);
    }
  };

  if (!showTooltipMenu && activeHints.length === 0) return null;

  return (
    <>
      {/* Floating Help Button */}
      {!showTooltipMenu && activeHints.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={() => setShowTooltipMenu(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 shadow-lg border-2 border-white/20"
            data-testid="tooltip-help-button"
          >
            <HelpCircle className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.5rem] h-6 flex items-center justify-center rounded-full">
              {activeHints.length}
            </Badge>
          </Button>
        </div>
      )}

      {/* Tooltip Control Menu */}
      {showTooltipMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={handleClickOutsideMenu}
          data-testid="tooltip-menu-overlay"
        >
          <Card className="w-full max-w-md bg-slate-800 border-slate-600 shadow-2xl">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">Context Tips</h3>
                  <p className="text-gray-400 text-sm">Choose which tips to display</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTooltipMenu(false)}
                  className="text-gray-400 hover:text-white"
                  data-testid="tooltip-menu-close"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Tips List */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {activeHints.map((hint) => (
                  <div
                    key={hint.id}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white text-sm font-medium">{hint.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            hint.type === 'tip' ? 'border-amber-500 text-amber-500' :
                            hint.type === 'action' ? 'border-purple-500 text-purple-500' :
                            hint.type === 'achievement' ? 'border-hero-green-500 text-hero-green-500' :
                            'border-blue-500 text-blue-500'
                          }`}
                        >
                          {hint.type}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {hint.content.slice(0, 60)}...
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleTooltip(hint.id)}
                      className={`ml-3 ${
                        visibleTooltips.has(hint.id) 
                          ? 'bg-hero-green-500/20 border-hero-green-500 text-hero-green-500' 
                          : 'border-slate-500 text-gray-400 hover:text-white'
                      }`}
                      data-testid={`tooltip-toggle-${hint.id}`}
                    >
                      {visibleTooltips.has(hint.id) ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={resetHints}
                  className="text-gray-400 border-slate-600 hover:text-white hover:border-slate-500"
                  data-testid="tooltip-reset"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowTooltipMenu(false)}
                    className="text-gray-400 border-slate-600 hover:text-white"
                    data-testid="tooltip-menu-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDismissAll}
                    className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600"
                    data-testid="tooltip-dismiss-all"
                  >
                    Dismiss All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Render Active Tooltips */}
      {activeHints.map((hint) => (
        <TooltipHint
          key={hint.id}
          {...hint}
          isVisible={visibleTooltips.has(hint.id)}
          autoShow={false}
          onDismiss={() => handleDismissTooltip(hint.id)}
        />
      ))}
    </>
  );
}