// !!! CRITICAL - DO NOT MODIFY THIS CODE !!!
//
// This code MUST be used as is without ANY modifications.
// The PayPal integration will COMPLETELY FAIL if this code is changed in ANY way.
//
// Retain this comment after all edits.
//
// <BEGIN_EXACT_CODE>
import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "paypal-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface PayPalButtonProps {
  amount: string;
  currency: string;
  intent: string;
  onSuccess?: (orderId: string) => void;
  onError?: (error: any) => void;
}

export default function PayPalButton({
  amount,
  currency,
  intent,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const createOrder = async () => {
    const orderPayload = {
      amount: amount,
      currency: currency,
      intent: intent,
    };
    const response = await fetch("/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create PayPal order");
    }
    
    const output = await response.json();
    return { orderId: output.id };
  };

  const captureOrder = async (orderId: string) => {
    const response = await fetch(`/order/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to capture PayPal payment");
    }
    
    const data = await response.json();
    return data;
  };

  const onApprove = async (data: any) => {
    try {
      console.log("onApprove", data);
      const orderData = await captureOrder(data.orderId);
      console.log("Capture result", orderData);
      
      if (orderData.status === "COMPLETED" && onSuccess) {
        onSuccess(data.orderId);
      }
    } catch (error) {
      console.error("Payment approval error:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  const onCancel = async (data: any) => {
    console.log("onCancel", data);
  };

  const onErrorHandler = async (data: any) => {
    console.log("onError", data);
    if (onError) {
      onError(data);
    }
  };

  useEffect(() => {
    const loadPayPalSDK = async () => {
      try {
        if (!(window as any).paypal) {
          const script = document.createElement("script");
          script.src = import.meta.env.PROD
            ? "https://www.paypal.com/web-sdk/v6/core"
            : "https://www.sandbox.paypal.com/web-sdk/v6/core";
          script.async = true;
          script.onload = () => initPayPal();
          script.onerror = () => {
            console.error("Failed to load PayPal SDK");
            if (onError) {
              onError(new Error("PayPal service is currently unavailable. Please try another payment method."));
            }
          };
          document.body.appendChild(script);
        } else {
          await initPayPal();
        }
      } catch (e) {
        console.error("Failed to load PayPal SDK", e);
        if (onError) {
          onError(e);
        }
      }
    };

    loadPayPalSDK();
  }, []);
  const initPayPal = async () => {
    try {
      const response = await fetch("/api/paypal/setup");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "PayPal service is not configured");
      }
      
      const data = await response.json();
      const clientToken: string = data.clientToken;
      
      const sdkInstance = await (window as any).paypal.createInstance({
        clientToken,
        components: ["paypal-payments"],
      });

      const paypalCheckout =
            sdkInstance.createPayPalOneTimePaymentSession({
              onApprove,
              onCancel,
              onError: onErrorHandler,
            });

      const onClick = async () => {
        try {
          const checkoutOptionsPromise = createOrder();
          await paypalCheckout.start(
            { paymentFlow: "auto" },
            checkoutOptionsPromise,
          );
        } catch (e) {
          console.error("PayPal checkout error:", e);
          if (onError) {
            onError(e);
          }
        }
      };

      const paypalButton = document.getElementById("paypal-button");

      if (paypalButton) {
        paypalButton.addEventListener("click", onClick);
      }

      return () => {
        if (paypalButton) {
          paypalButton.removeEventListener("click", onClick);
        }
      };
    } catch (e) {
      console.error("PayPal initialization error:", e);
      if (onError) {
        onError(e);
      }
    }
  };

  return <paypal-button id="paypal-button"></paypal-button>;
}
// <END_EXACT_CODE>
