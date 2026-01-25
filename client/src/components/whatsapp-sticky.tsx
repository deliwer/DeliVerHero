import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppSticky() {
  const phoneNumber = "+971523946311";
  const message = "Hi DeliWer, I'm interested in your services. Can you help me?";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => window.open(whatsappUrl, "_blank")}
        size="icon"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        data-testid="button-whatsapp-sticky"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </Button>
    </div>
  );
}
