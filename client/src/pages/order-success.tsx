
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Gift } from "lucide-react";

export default function OrderSuccessPage() {
  const [, setLocation] = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get order details from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    
    if (orderId) {
      setOrderDetails({
        id: orderId,
        total: urlParams.get('total') || '99.00',
        email: urlParams.get('email') || 'customer@example.com'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="bg-slate-800 border-slate-700 text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Order Confirmed!
            </CardTitle>
            <p className="text-gray-400">
              Thank you for joining the DeliWer Planet Heroes community
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderDetails && (
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Order Details</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Order ID: #{orderDetails.id}</p>
                  <p>Total: AED {orderDetails.total}</p>
                  <p>Confirmation sent to: {orderDetails.email}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Package className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-white font-medium">Processing</h4>
                <p className="text-gray-400 text-sm">Order being prepared</p>
              </div>
              <div className="text-center p-4">
                <Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-medium">Shipping</h4>
                <p className="text-gray-400 text-sm">2-3 business days</p>
              </div>
              <div className="text-center p-4">
                <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-white font-medium">Planet Points</h4>
                <p className="text-gray-400 text-sm">1000 points earned</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setLocation("/impact-dashboard")}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                View Your Impact Dashboard
              </Button>
              <Button
                onClick={() => setLocation("/products")}
                variant="outline"
                className="w-full border-slate-600 text-gray-300 hover:bg-slate-700"
              >
                Continue Shopping
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Questions about your order?{" "}
                <button
                  onClick={() => setLocation("/contact")}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Contact Support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
