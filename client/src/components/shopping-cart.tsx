import { useState, useEffect } from "react";
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, Star, Package, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { shopifyCartService } from "@/lib/shopify-cart";
import { StripeCheckout } from "@/components/stripe-checkout";

import { CartItem } from "@/types/cart";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [orderId, setOrderId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadCartItems();
      setCheckoutStep('cart'); // Reset to cart view when opening
    }
  }, [isOpen]);

  const loadCartItems = async () => {
    setIsLoading(true);
    try {
      const items = await shopifyCartService.getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeItem(itemId);
      return;
    }

    try {
      await shopifyCartService.updateCartItem(itemId, newQuantity);
      setCartItems(items => 
        items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await shopifyCartService.removeCartItem(itemId);
      setCartItems(items => items.filter(item => item.id !== itemId));
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const proceedToCheckout = () => {
    setCheckoutStep('payment');
  };

  const handlePaymentSuccess = (newOrderId: string) => {
    setOrderId(newOrderId);
    setCheckoutStep('success');
    // Clear cart after successful payment
    setCartItems([]);
    shopifyCartService.clearCart();

    toast({
      title: "Payment Successful! 🎉",
      description: "Your order has been confirmed. Welcome to Planet Heroes!",
    });
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const handleCloseCart = () => {
    setCheckoutStep('cart');
    onClose();
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25; // Free shipping over AED 500
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-slate-900 w-full max-w-md h-full overflow-y-auto">
        <Card className="h-full bg-slate-900 border-0 rounded-none">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                {checkoutStep === 'payment' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToCart}
                    className="text-gray-400 hover:text-white mr-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                {checkoutStep === 'cart' && <ShoppingCartIcon className="w-5 h-5" />}
                {checkoutStep === 'payment' && "Secure Payment"}
                {checkoutStep === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                {checkoutStep === 'cart' && `Shopping Cart (${cartItems.length})`}
                {checkoutStep === 'success' && "Order Complete!"}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseCart}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* Payment Step - Show Stripe Checkout */}
            {checkoutStep === 'payment' && (
              <div className="p-4">
                <StripeCheckout
                  cartItems={cartItems}
                  onPaymentSuccess={handlePaymentSuccess}
                  onBack={handleBackToCart}
                />
              </div>
            )}

            {/* Success Step - Show Order Confirmation */}
            {checkoutStep === 'success' && (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">🎉 Welcome to Planet Heroes!</h3>
                  <p className="text-gray-400 mb-4">Order #{orderId} confirmed!</p>
                  <div className="bg-slate-800 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-amber-400">+2,400</div>
                        <div className="text-gray-400">Planet Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-400">AED {total}</div>
                        <div className="text-gray-400">Order Total</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleCloseCart}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}

            {/* Cart Step - Show Shopping Cart */}
            {checkoutStep === 'cart' && (
              <>
                {isLoading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Loading cart...</p>
                    </div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <ShoppingCartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Your cart is empty</p>
                      <Button
                        onClick={handleCloseCart}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 p-4 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-slate-800 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />

                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm line-clamp-2">
                              {item.title}
                            </h4>
                            {item.variant && (
                              <p className="text-gray-400 text-xs">{item.variant}</p>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-emerald-400 font-bold">
                                AED {item.price.toFixed(2)}
                              </span>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-6 w-6 p-0 border-slate-600"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>

                                <span className="text-white text-sm w-8 text-center">
                                  {item.quantity}
                                </span>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-6 w-6 p-0 border-slate-600"
                                  disabled={!item.available}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>

                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeItem(item.id)}
                                  className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            {!item.available && (
                              <Badge variant="destructive" className="mt-1 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-700 p-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-300">
                          <span>Subtotal</span>
                          <span>AED {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Shipping</span>
                          <span>
                            {shipping === 0 ? (
                              <span className="text-emerald-400">Free</span>
                            ) : (
                              `AED ${shipping.toFixed(2)}`
                            )}
                          </span>
                        </div>
                        {shipping > 0 && (
                          <p className="text-xs text-gray-400">
                            Free shipping on orders over AED 500
                          </p>
                        )}
                        <div className="flex justify-between text-white font-bold text-lg border-t border-slate-700 pt-2">
                          <span>Total</span>
                          <span>AED {total.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button
                        onClick={proceedToCheckout}
                        disabled={isCheckingOut || cartItems.some(item => !item.available)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium"
                      >
                        {isCheckingOut ? (
                          "Processing..."
                        ) : (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Secure Checkout
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                        <span>🔒 Secure Payment</span>
                        <span>🚚 Fast Delivery</span>
                        <span>♻️ Eco-Friendly</span>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}