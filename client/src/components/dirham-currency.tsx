import dirhamSvg from "@assets/Dirham Currency Symbol - Black.svg";

interface DirhamCurrencyProps {
  amount: number | string;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export function DirhamCurrency({ amount, className = "", iconSize = "md" }: DirhamCurrencyProps) {
  const iconSizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <img src={dirhamSvg} alt="Dirham" className={`${iconSizeMap[iconSize]} inline`} />
      <span>{typeof amount === "number" ? amount.toFixed(2) : amount}</span>
    </span>
  );
}
