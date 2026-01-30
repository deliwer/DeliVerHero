import dirhamSvg from "@/assets/images/dirham-symbol.svg";

export function DirhamSymbol({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <img 
      src={dirhamSvg} 
      alt="Official Dirham Symbol" 
      className={`${className} brightness-0 invert`} 
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
}
