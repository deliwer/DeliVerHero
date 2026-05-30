/**
 * SmartChannelCTA — device-aware dual-channel contact button
 *
 * Mobile  → WhatsApp is primary (big), Telegram is backup (smaller)
 * Desktop → Telegram is primary (big), WhatsApp is backup (smaller)
 *
 * Rationale: WhatsApp mobile-to-mobile is instant; on desktop WA Web
 * is flaky and frequently has outages. Telegram desktop is rock-solid.
 * Both channels are always shown — the hierarchy just shifts.
 */

import { useState, useEffect } from "react";

const TG_URL = "https://t.me/+971523946311";
const WA_NUMBER = "971523906019";

const TelegramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return true;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

interface SmartChannelCTAProps {
  waMessage?: string;
  size?: "sm" | "md" | "lg";
  layout?: "row" | "stack";
  showBackupLabel?: boolean;
  testIdPrefix?: string;
}

export function SmartChannelCTA({
  waMessage = "Hi DeliWer! I need help with my apartment in Dubai.",
  size = "lg",
  layout = "row",
  showBackupLabel = true,
  testIdPrefix = "smart-cta",
}: SmartChannelCTAProps) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const sizeMap = {
    sm: { primary: "h-10 px-5 text-xs", secondary: "h-8 px-4 text-[10px]" },
    md: { primary: "h-12 px-6 text-sm", secondary: "h-9 px-4 text-xs" },
    lg: { primary: "h-14 px-8 text-sm", secondary: "h-10 px-5 text-xs" },
  };
  const sz = sizeMap[size];

  const layoutClass = layout === "row"
    ? "flex flex-wrap items-center gap-3"
    : "flex flex-col items-center gap-2";

  const PrimaryWA = (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`${testIdPrefix}-wa-primary`}
      className="relative group"
    >
      <button
        className={`inline-flex items-center gap-2 ${sz.primary} bg-[#25D366] hover:bg-[#1ebe5b] text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]`}
      >
        <WhatsAppIcon />
        WhatsApp
      </button>
    </a>
  );

  const PrimaryTG = (
    <a
      href={TG_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`${testIdPrefix}-tg-primary`}
      className="relative group"
    >
      <button
        className={`inline-flex items-center gap-2 ${sz.primary} bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-sky-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]`}
      >
        <TelegramIcon />
        Telegram
      </button>
    </a>
  );

  const BackupWA = (
    <div className="flex flex-col items-center gap-0.5">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`${testIdPrefix}-wa-backup`}
      >
        <button
          className={`inline-flex items-center gap-1.5 ${sz.secondary} bg-white/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 hover:border-[#25D366]/70 text-white font-black uppercase tracking-widest rounded-xl transition-all`}
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          WhatsApp
        </button>
      </a>
      {showBackupLabel && (
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
          backup channel
        </span>
      )}
    </div>
  );

  const BackupTG = (
    <div className="flex flex-col items-center gap-0.5">
      <a
        href={TG_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`${testIdPrefix}-tg-backup`}
      >
        <button
          className={`inline-flex items-center gap-1.5 ${sz.secondary} bg-white/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/40 hover:border-[#229ED9]/70 text-white font-black uppercase tracking-widest rounded-xl transition-all`}
        >
          <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
          Telegram
        </button>
      </a>
      {showBackupLabel && (
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
          if WA is down
        </span>
      )}
    </div>
  );

  return (
    <div className={layoutClass}>
      {isMobile ? (
        <>
          {PrimaryWA}
          {BackupTG}
        </>
      ) : (
        <>
          {PrimaryTG}
          {BackupWA}
        </>
      )}
    </div>
  );
}

/**
 * ChannelStatusBar — a slim inline notice under any CTA block
 * showing both channels are live with a pulsing status dot.
 */
export function ChannelStatusBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-x-5 gap-y-1.5 ${className}`}>
      <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
        WhatsApp · +971 52 390 6019
      </span>
      <span className="text-gray-700 hidden sm:inline">·</span>
      <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-[#229ED9] animate-pulse shrink-0" />
        Telegram · +971 52 394 6311
      </span>
      <span className="text-gray-700 hidden sm:inline">·</span>
      <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
        Botim · +971 52 394 6311
      </span>
    </div>
  );
}
