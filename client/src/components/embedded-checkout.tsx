import { useState } from "react";
import { ShoppingCart, CreditCard, Truck, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface EmbeddedCheckoutProps {
  tradeValue: number;
  deviceModel: string;
  onClose?: () => void;
}

export function EmbeddedCheckout({ tradeValue, deviceModel, onClose }: EmbeddedCheckoutProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
    }
  };

  if (step === 'confirmation') {
    return (
      <Card className="p-6 bg-gradient-to-br from-hero-green-900 to-dubai-blue-900 border-hero-green-500/30">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-hero-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">🎉 Welcome to Planet Heroes!</h3>
          <p className="text-gray-300 mb-6">Your trade-in is confirmed and pickup scheduled!</p>
          
          <div className="glass rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Your Hero Impact:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">+2,400</div>
                <div className="text-gray-400">Planet Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hero-green-500">AED {tradeValue}</div>
                <div className="text-gray-400">Trade Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">12,500L</div>
                <div className="text-gray-400">Water Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">#18</div>
                <div className="text-gray-400">Dubai Rank</div>
              </div>
            </div>
          </div>

          <Button 
            onClick={onClose}
            className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-white font-bold py-3"
          >
            View My Hero Dashboard
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-800/95 border-slate-600">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2 text-dubai-blue-500" />
          Complete Your Hero Journey
        </h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400">
            ✕
          </Button>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between p-4 glass rounded-lg mb-4">
          <div>
            <p className="text-white font-semibold">{deviceModel} Trade-In</p>
            <p className="text-gray-400 text-sm">Premium AquaCafe Starter Kit</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-hero-green-500">AED {tradeValue}</p>
            <p className="text-xs text-gray-400">+ Free Delivery</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-1 text-hero-green-500" />
            Secure Payment
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 mr-1 text-hero-green-500" />
            Same-Day Pickup
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 'details' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-slate-700 text-white border-slate-600"
                required
              />
              <Input
                placeholder="Phone (+971...)"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-slate-700 text-white border-slate-600"
                required
              />
            </div>
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-slate-700 text-white border-slate-600"
              required
            />
            <Input
              placeholder="Dubai Address (for pickup)"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="bg-slate-700 text-white border-slate-600"
              required
            />
            <Button type="submit" className="w-full bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white font-bold py-3">
              Continue to Payment
            </Button>
          </>
        )}

        {step === 'payment' && (
          <>
            <div className="text-center mb-4">
              <CreditCard className="w-12 h-12 text-dubai-blue-500 mx-auto mb-2" />
              <p className="text-gray-300">Payment processing via Shopify Secure Checkout</p>
            </div>
            <Button type="submit" className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-white font-bold py-3">
              🚀 Complete Order - AED {tradeValue}
            </Button>
          </>
        )}
      </form>
    </Card>
  );
}