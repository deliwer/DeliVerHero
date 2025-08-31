import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Lock } from "lucide-react";
import { CartItem } from "@/types/cart";

interface StripeCheckoutProps {
  cartItems: CartItem[];
  onPaymentSuccess: (orderId: string) => void;
  onBack: () => void;
}

interface CheckoutFormProps extends StripeCheckoutProps {
  stripePromise: Promise<any>;
}

interface PaymentFormProps {
  cartItems: CartItem[];
  onPaymentSuccess: (orderId: string) => void;
  onBack: () => void;
}

const PaymentForm = ({ cartItems, onPaymentSuccess, onBack }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    city: "Dubai",
    country: "AE",
    zip: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "Dubai",
    country: "AE",
    zip: "",
  });

  const { toast } = useToast();

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 25;
    return subtotal + shipping;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 500 ? 0 : 25;
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!cartItems.length) return;

      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: calculateTotal(),
            currency: "aed",
            cartItems,
            billingDetails,
            shippingDetails: sameAsShipping ? billingDetails : shippingDetails,
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (error: any) {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Payment Error",
          description: error.message || "Failed to initialize payment",
          variant: "destructive",
        });
      }
    };

    createPaymentIntent();
  }, [cartItems, billingDetails, shippingDetails, sameAsShipping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: 'billing' | 'shipping') => {
    const { name, value } = e.target;
    
    if (section === 'billing') {
      setBillingDetails(prev => ({ ...prev, [name]: value }));
    } else {
      setShippingDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);

    try {
      const finalShippingDetails = sameAsShipping ? billingDetails : shippingDetails;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${billingDetails.firstName} ${billingDetails.lastName}`.trim(),
            email: billingDetails.email,
            phone: billingDetails.phone,
            address: {
              line1: billingDetails.address1,
              city: billingDetails.city,
              country: billingDetails.country,
              postal_code: billingDetails.zip,
            },
          },
        },
        shipping: {
          name: `${finalShippingDetails.firstName} ${finalShippingDetails.lastName}`.trim(),
          address: {
            line1: finalShippingDetails.address1,
            city: finalShippingDetails.city,
            country: finalShippingDetails.country,
            postal_code: finalShippingDetails.zip,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Confirm payment with backend
        const confirmResponse = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            orderData: {
              billingDetails,
              shippingDetails: finalShippingDetails,
              cartItems,
            },
          }),
        });

        const confirmData = await confirmResponse.json();
        
        if (confirmData.success) {
          toast({
            title: "Payment Successful!",
            description: `Order ${confirmData.orderId} has been placed successfully.`,
          });
          onPaymentSuccess(confirmData.orderId);
        } else {
          throw new Error(confirmData.error || "Failed to confirm order");
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred during payment processing",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            ← Back to Checkout
          </Button>
          <h1 className="text-3xl font-bold text-white">Secure Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Billing Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) => handleInputChange(e, 'billing')}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={billingDetails.firstName}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={billingDetails.lastName}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={billingDetails.phone}
                    onChange={(e) => handleInputChange(e, 'billing')}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div>
                  <Label htmlFor="address1" className="text-gray-300">Street Address *</Label>
                  <Input
                    id="address1"
                    name="address1"
                    value={billingDetails.address1}
                    onChange={(e) => handleInputChange(e, 'billing')}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Sheikh Zayed Road"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={billingDetails.city}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-gray-300">Postal Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={billingDetails.zip}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="00000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="sameAsShipping" className="text-gray-300">
                    Same as billing address
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ship-firstName" className="text-gray-300">First Name *</Label>
                        <Input
                          id="ship-firstName"
                          name="firstName"
                          value={shippingDetails.firstName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ship-lastName" className="text-gray-300">Last Name *</Label>
                        <Input
                          id="ship-lastName"
                          name="lastName"
                          value={shippingDetails.lastName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ship-address1" className="text-gray-300">Street Address *</Label>
                      <Input
                        id="ship-address1"
                        name="address1"
                        value={shippingDetails.address1}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ship-city" className="text-gray-300">City *</Label>
                        <Input
                          id="ship-city"
                          name="city"
                          value={shippingDetails.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ship-zip" className="text-gray-300">Postal Code</Label>
                        <Input
                          id="ship-zip"
                          name="zip"
                          value={shippingDetails.zip}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700 border border-slate-600 rounded-md p-4">
                  <CardElement options={cardElementOptions} />
                </div>
                <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Your payment information is encrypted and secure
                </p>
              </CardContent>
            </Card>
          </form>

          {/* Order Summary */}
          <div>
            <Card className="bg-slate-800 border-slate-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{item.title}</h4>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-white font-medium">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>AED {calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>
                        {calculateShipping() === 0 ? (
                          <span className="text-emerald-400">Free</span>
                        ) : (
                          `AED ${calculateShipping().toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {calculateShipping() > 0 && (
                      <p className="text-xs text-gray-400">
                        Free shipping on orders over AED 500
                      </p>
                    )}
                  </div>
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-emerald-400">AED {calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!stripe || isProcessing || !clientSecret}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Pay AED {calculateTotal().toFixed(2)}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-gray-400 text-xs text-center">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({ stripePromise, cartItems, onPaymentSuccess, onBack }: CheckoutFormProps) => {
  const [elementsOptions, setElementsOptions] = useState<StripeElementsOptions | null>(null);
  
  useEffect(() => {
    const initializeElements = async () => {
      try {
        const response = await fetch('/api/stripe-config');
        const { publishableKey } = await response.json();
        
        setElementsOptions({
          appearance: {
            theme: 'night',
            variables: {
              colorPrimary: '#10b981',
              colorBackground: '#1e293b',
              colorText: '#ffffff',
              colorDanger: '#ef4444',
              fontFamily: 'system-ui, sans-serif',
              borderRadius: '8px',
            },
          },
        });
      } catch (error) {
        console.error('Error initializing Stripe Elements:', error);
      }
    };

    initializeElements();
  }, []);

  if (!elementsOptions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <PaymentForm cartItems={cartItems} onPaymentSuccess={onPaymentSuccess} onBack={onBack} />
    </Elements>
  );
};

export function StripeCheckout({ cartItems, onPaymentSuccess, onBack }: StripeCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await fetch('/api/stripe-config');
        const { publishableKey } = await response.json();
        if (publishableKey) {
          setStripePromise(loadStripe(publishableKey));
        }
      } catch (error) {
        console.error('Error loading Stripe config:', error);
      }
    };
    
    initializeStripe();
  }, []);

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <CheckoutForm 
      stripePromise={stripePromise}
      cartItems={cartItems}
      onPaymentSuccess={onPaymentSuccess}
      onBack={onBack}
    />
  );
}