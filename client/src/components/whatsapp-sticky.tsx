import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

export function WhatsAppSticky() {
  const handleWhatsAppClick = () => {
    const currentClicks = parseInt(localStorage.getItem("wa_clicks") || "0");
    localStorage.setItem("wa_clicks", (currentClicks + 1).toString());
    const searchParams = new URLSearchParams(window.location.search);
    const source = searchParams.get("source") || "";
    const intro = source === "broker"
      ? "Hi DeliWer, I'm a broker and need move-in/move-out support for my clients."
      : "Hi DeliWer, I need help with my apartment.";
    openWhatsApp(buildWhatsAppMessage({ intro }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        size="icon"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        data-testid="button-whatsapp-sticky"
        title="Book on WhatsApp - Response within 10 minutes"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </Button>
    </div>
  );
}
