import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, CheckCircle } from "lucide-react";
import { SiStripe, SiPaypal } from "react-icons/si";

interface PaymentMethod {
  id: string;
  name: string;
  icon: typeof CreditCard;
  logo: typeof SiStripe;
  description: string;
  popular?: boolean;
}

interface PaymentMethodSelectorProps {
  onSelect: (method: string) => void;
  selectedMethod: string;
}

export function PaymentMethodSelector({ onSelect, selectedMethod }: PaymentMethodSelectorProps) {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "stripe",
      name: "Credit/Debit Card",
      icon: CreditCard,
      logo: SiStripe,
      description: "Pay securely with Visa, Mastercard, or Amex",
      popular: true
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      logo: SiPaypal,
      description: "Fast and secure checkout with PayPal"
    }
  ];

  return (
    <div className="space-y-4" data-testid="payment-method-selector">
      <h3 className="text-lg font-bold text-white mb-4">Select Payment Method</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-2 border-emerald-500 bg-emerald-500/10'
                : 'border-2 border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
            onClick={() => onSelect(method.id)}
            data-testid={`payment-method-${method.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedMethod === method.id
                      ? 'bg-emerald-500'
                      : 'bg-slate-700'
                  }`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-white">{method.name}</h4>
                      {method.popular && (
                        <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{method.description}</p>
                    
                    <div className="mt-2">
                      <method.logo className="w-16 h-auto text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {selectedMethod === method.id && (
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
        <CheckCircle className="w-4 h-4 text-emerald-500" />
        <span>Secure payment processing with industry-leading encryption</span>
      </div>
    </div>
  );
}
