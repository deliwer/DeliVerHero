import { useTooltipHints } from "@/hooks/use-tooltip-hints";
import { TooltipHint } from "@/components/ui/tooltip-hint";

export function TooltipHintsManager() {
  const { activeHints, dismissHint } = useTooltipHints();

  return (
    <>
      {activeHints.map((hint, index) => (
        <TooltipHint
          key={hint.id}
          {...hint}
          // Stagger delays to avoid multiple tooltips at once
          delay={(hint.delay || 1000) + (index * 2000)}
          onDismiss={() => dismissHint(hint.id)}
        />
      ))}
    </>
  );
}