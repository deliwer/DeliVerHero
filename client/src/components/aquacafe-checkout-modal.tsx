import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, MessageCircle, Shield, Truck } from "lucide-react";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.warn('VITE_STRIPE_PUBLIC_KEY not configured - payment functionality will be limited');
}

const stripePromise = stripePublicKey 
  ? loadStripe(stripePublicKey)
  : null;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    features: string[];
  };
}

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  area: string;
  address: string;
  notes: string;
}

function CheckoutForm({ 
  product, 
  customerDetails,
  onSuccess 
}: { 
  product: CheckoutModalProps['product'];
  customerDetails: CustomerDetails;
  onSuccess: (contributionId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast({
          title: "Validation Error",
          description: submitError.message,
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          receipt_email: customerDetails.email,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        try {
          const contributionResponse = await apiRequest("POST", "/api/water-filtration/contributions", {
            projectId: product.id,
            projectName: product.name,
            contributorName: customerDetails.name,
            contributorEmail: customerDetails.email,
            contributorPhone: customerDetails.phone,
            amountPaid: product.price,
            currency: 'AED',
            picsAwarded: Math.floor(product.price),
            paymentMethod: 'stripe',
            paymentId: paymentIntent.id,
            status: 'completed',
            metadata: {
              area: customerDetails.area,
              address: customerDetails.address,
              notes: customerDetails.notes
            }
          });

          if (!contributionResponse.ok) {
            console.error("Failed to record contribution - manual reconciliation needed");
          } else {
            const contribution = await contributionResponse.json();
            onSuccess(contribution.id);
            return;
          }
        } catch (contributionError) {
          console.error("Contribution recording error:", contributionError);
        }
        
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="w-4 h-4" />
        <span>Secured by Stripe - Your payment info is encrypted</span>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || isProcessing}
        data-testid="button-submit-payment"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay AED ${product.price.toFixed(2)}`
        )}
      </Button>
    </form>
  );
}

export function AquaCafeCheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    area: 'Dubai Marina',
    address: '',
    notes: ''
  });

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.email || !customerDetails.address) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!stripePublicKey) {
      toast({
        title: "Payment System Unavailable",
        description: "Stripe is not configured. Please contact support or use WhatsApp to place your order.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: product.price,
        currency: "aed",
        billingDetails: {
          email: customerDetails.email,
          firstName: customerDetails.name.split(' ')[0],
          lastName: customerDetails.name.split(' ').slice(1).join(' '),
          phone: customerDetails.phone,
          address1: customerDetails.address,
          city: customerDetails.area,
          country: "AE",
        },
        cartItems: [{
          id: product.id,
          title: product.name,
          quantity: 1,
          price: product.price,
        }]
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || "Payment initialization failed");
      }

      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep('payment');
      } else {
        throw new Error("Invalid response from payment service");
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to initialize checkout. Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${product.name} (AED ${product.price}). I'd like to schedule installation in Dubai.`;
    const whatsappUrl = `https://wa.me/971523906019?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSuccess = (contributionId: string) => {
    const picsAwarded = Math.floor(product.price);
    toast({
      title: "Payment Successful!",
      description: `Thank you for your order! You earned ${picsAwarded} Dubai Carbon Tokens (DXBs). We'll contact you shortly for installation.`,
    });
    onClose();
    setStep('details');
    setClientSecret(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 'details' ? 'Order Details' : 'Complete Payment'}
          </DialogTitle>
        </DialogHeader>

        {step === 'details' ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                AED {product.price.toFixed(2)}
              </p>
              <ul className="space-y-1 text-sm">
                {product.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                  data-testid="input-customer-name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    required
                    data-testid="input-customer-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    data-testid="input-customer-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Dubai Area *</Label>
                <Select
                  value={customerDetails.area}
                  onValueChange={(value) => setCustomerDetails({ ...customerDetails, area: value })}
                >
                  <SelectTrigger id="area" data-testid="select-dubai-area">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                    <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                    <SelectItem value="Jumeirah Beach Residence (JBR)">Jumeirah Beach Residence (JBR)</SelectItem>
                    <SelectItem value="Palm Jumeirah">Palm Jumeirah</SelectItem>
                    <SelectItem value="Business Bay">Business Bay</SelectItem>
                    <SelectItem value="Dubai Internet City">Dubai Internet City</SelectItem>
                    <SelectItem value="Dubai Media City">Dubai Media City</SelectItem>
                    <SelectItem value="Jumeirah">Jumeirah</SelectItem>
                    <SelectItem value="Al Barsha">Al Barsha</SelectItem>
                    <SelectItem value="Motor City">Motor City</SelectItem>
                    <SelectItem value="Sports City">Sports City</SelectItem>
                    <SelectItem value="Dubai Silicon Oasis">Dubai Silicon Oasis</SelectItem>
                    <SelectItem value="International City">International City</SelectItem>
                    <SelectItem value="Discovery Gardens">Discovery Gardens</SelectItem>
                    <SelectItem value="Arabian Ranches">Arabian Ranches</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  placeholder="Building name, apartment number, street"
                  required
                  data-testid="input-customer-address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Installation Notes (Optional)</Label>
                <Input
                  id="notes"
                  value={customerDetails.notes}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                  placeholder="Any special requirements or preferred installation time"
                  data-testid="input-installation-notes"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  Discounted installation for loyalty members across Dubai
                </span>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                  data-testid="button-proceed-payment"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="flex-1"
                  data-testid="button-whatsapp-contact"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Order Summary</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('details')}
                  data-testid="button-edit-details"
                >
                  Edit Details
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{customerDetails.name}</p>
              <p className="text-sm text-muted-foreground">{customerDetails.email}</p>
              <p className="text-sm text-muted-foreground">{customerDetails.area}</p>
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    AED {product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  product={product} 
                  customerDetails={customerDetails}
                  onSuccess={handleSuccess}
                />
              </Elements>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
