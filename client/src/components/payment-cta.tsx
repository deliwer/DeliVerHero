import { SiPaypal } from "react-icons/si";
import { Building2, MessageCircle, CreditCard, ExternalLink } from "lucide-react";

const PAYPAL_EMAIL = "formatix@deliwer.com";
const PAYPAL_LINK = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&currency_code=AED&item_name=DeliWer+Services`;
const WHATSAPP_LINK = "https://wa.me/971523946311";

interface PaymentCTAProps {
  variant?: "banner" | "card" | "inline" | "footer";
  title?: string;
  subtitle?: string;
}

export function PaymentCTA({
  variant = "banner",
  title = "Ready to Pay for Your Services?",
  subtitle = "Agreed your services on WhatsApp? Pay securely via PayPal or request bank transfer details for remote orders.",
}: PaymentCTAProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-3 mt-4" data-testid="payment-cta-inline">
        <a
          href={PAYPAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-paypal-inline"
          className="inline-flex items-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
        >
          <SiPaypal className="w-4 h-4" />
          Pay via PayPal
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-bank-transfer-inline"
          className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-gray-300 hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
        >
          <Building2 className="w-4 h-4" />
          Request Bank Transfer
        </a>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="mt-8 p-5 bg-[#003087]/20 border border-[#0070BA]/30 rounded-xl" data-testid="payment-cta-footer">
        <div className="flex items-center gap-2 mb-3">
          <SiPaypal className="w-5 h-5 text-[#00B2FF]" />
          <span className="text-sm font-black text-white uppercase tracking-widest">Pay for Services</span>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Agreed services on WhatsApp? Send payment directly to <span className="text-[#00B2FF] font-semibold">{PAYPAL_EMAIL}</span> via PayPal, or ask us for bank transfer details.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={PAYPAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-paypal-footer"
            className="inline-flex items-center justify-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white px-4 py-2.5 rounded-lg font-bold text-xs transition-colors w-full"
          >
            <SiPaypal className="w-3.5 h-3.5" />
            Pay via PayPal — formatix@deliwer.com
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-bank-transfer-footer"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-gray-400 hover:text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors w-full"
          >
            <Building2 className="w-3.5 h-3.5" />
            Request Bank Transfer (remote orders)
          </a>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="bg-gradient-to-br from-[#003087]/30 to-[#001a52]/40 border border-[#0070BA]/30 rounded-2xl p-6" data-testid="payment-cta-card">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#0070BA]/20 rounded-xl flex-shrink-0">
            <SiPaypal className="w-7 h-7 text-[#00B2FF]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-paypal-card"
                className="inline-flex items-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
              >
                <SiPaypal className="w-4 h-4" />
                Pay via PayPal
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-bank-transfer-card"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Request Bank Transfer
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
              <CreditCard className="w-3 h-3" />
              Payments sent to: <span className="text-[#00B2FF] font-semibold">{PAYPAL_EMAIL}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#003087] via-[#0070BA] to-[#009cde] p-px" data-testid="payment-cta-banner">
      <div className="relative rounded-2xl bg-slate-950/90 px-6 py-8 md:px-10">
        <div className="absolute inset-0 rounded-2xl opacity-5 bg-[radial-gradient(ellipse_at_top_right,_#0070BA_0%,_transparent_60%)]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#0070BA]/20 rounded-xl border border-[#0070BA]/30">
              <SiPaypal className="w-8 h-8 text-[#00B2FF]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed">{subtitle}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={PAYPAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-paypal-banner"
              className="inline-flex items-center justify-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white px-6 py-3 rounded-xl font-black text-sm transition-colors whitespace-nowrap"
            >
              <SiPaypal className="w-4 h-4" />
              Pay via PayPal
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-bank-whatsapp-banner"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-black text-sm transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Ask for Bank Transfer
            </a>
          </div>
        </div>
        <p className="relative text-xs text-gray-500 mt-4 text-center md:text-left">
          PayPal payments accepted at <span className="text-[#00B2FF] font-semibold">{PAYPAL_EMAIL}</span> · Bank transfer available for remote/international orders
        </p>
      </div>
    </div>
  );
}
