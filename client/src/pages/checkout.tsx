
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { shopifyAuthService } from "@/lib/shopify-auth";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Loader2, CreditCard, User, MapPin } from "lucide-react";

interface CheckoutItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CheckoutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    city: "Dubai",
    country: "United Arab Emirates",
    zip: "",
    phone: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      const items = await shopifyCartService.getCartItems();
      setCartItems(items);
      
      // Pre-fill with user data if logged in
      const user = shopifyAuthService.getCurrentUser();
      if (user) {
        setCheckoutData(prev => ({
          ...prev,
          email: user.email,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
        }));
      }
    } catch (error) {
      console.error("Failed to load checkout data:", error);
      toast({
        title: "Error",
        description: "Failed to load checkout information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (!checkoutData.email || !checkoutData.firstName) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Create checkout session
      const checkoutUrl = await shopifyCartService.createCheckout(cartItems);
      
      // Create customer if not logged in
      if (!shopifyAuthService.isAuthenticated()) {
        await shopifyAuthService.createShopifyCustomer({
          customer: {
            email: checkoutData.email,
            first_name: checkoutData.firstName,
            last_name: checkoutData.lastName,
            phone: checkoutData.phone,
            addresses: [{
              address1: checkoutData.address1,
              city: checkoutData.city,
              country: checkoutData.country,
              zip: checkoutData.zip,
            }],
            metafields: [
              {
                namespace: "deliwer",
                key: "checkout_source",
                value: "deliwer_app"
              }
            ]
          }
        });
      }

      // Redirect to Shopify checkout
      if (checkoutUrl.startsWith('http')) {
        window.location.href = checkoutUrl;
      } else {
        // Internal checkout completion
        toast({
          title: "Order placed!",
          description: "Your order has been successfully placed.",
        });
        
        await shopifyCartService.clearCart();
        setLocation("/");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <Button onClick={() => setLocation("/products")} className="bg-emerald-600 hover:bg-emerald-700">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={checkoutData.email}
                    onChange={handleInputChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={checkoutData.firstName}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={checkoutData.lastName}
                      onChange={handleInputChange}
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
                    value={checkoutData.phone}
                    onChange={handleInputChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address1" className="text-gray-300">Street Address</Label>
                  <Input
                    id="address1"
                    name="address1"
                    value={checkoutData.address1}
                    onChange={handleInputChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Sheikh Zayed Road"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={checkoutData.city}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-gray-300">Postal Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={checkoutData.zip}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="00000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-gray-300">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={checkoutData.country}
                    onChange={handleInputChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>
          </div>

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
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-medium">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-emerald-400">AED {calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Complete Order
                      </>
                    )}
                  </Button>
                  
                  <p className="text-gray-400 text-xs text-center">
                    Secure checkout powered by Shopify
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
