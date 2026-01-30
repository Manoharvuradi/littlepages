"use client";
import Script from "next/script";
import { useState } from "react";
import OrderFailure from "../../checkoutview/orderfailure";
import { on } from "events";

export default function PayButton({ 
  amount, 
  setFlowData, 
  onNext 
}: { 
  amount: number; 
  setFlowData: any; 
  onNext: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const payNow = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Create Razorpay order
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to create order');
      }

      const order = await res.json();

      // Step 2: Open Razorpay checkout
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_API_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Little Pages",
        description: "Book Purchase",
        image: "/images/Image-Photoroom.png", // Add your logo here

        handler: async function (response: any) {
          try {
            // Step 3: Verify payment and create order in DB
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/payment/verify`,
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ response, amount }),
              }
            );

            if (!verifyRes.ok) {
              throw new Error('Payment verification failed');
            }

            const result = await verifyRes.json();
            if (result.status === 'success') {
              // Payment successful - order created in DB
              setFlowData((prev: any) => ({ 
                ...prev, 
                payment: result,
                orderId: result.orderId,
                orderNumber: result.orderNumber
              }));
              onNext(); // Move to next step
            } else {
              setFlowData((prev: any) => ({ 
                ...prev, 
                payment: result,
                orderId: result.orderId,
                orderNumber: result.orderNumber
              }));
              onNext(); // Move to next step
              throw new Error('Payment verification failed');
            }
          } catch (err: any) {
            console.error('Verification error:', err);
            setError(err.message || 'Payment verification failed');
            alert('Payment verification failed. Please contact support.');
          }
        },

        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log('Payment cancelled by user');
          }
        },

        theme: {
          color: "#009FFF"
        }
      };

      const razor = new (window as any).Razorpay(options);
      razor.on('payment.failed', function (response: any) {
        setFlowData((prev: any) => ({
          ...prev, 
          payment: response,
          orderId: null,
          orderNumber: null
        }))
        setError('Payment failed. Please try again.');
        onNext(); // Move to next step
        setLoading(false);
      });
      razor.open();
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
        // <OrderFailure errorDetails={error} onRetry={payNow} onSupport={() => {}} />
      )}
      <button 
        onClick={payNow}
        disabled={loading}
        className="mt-8 w-full px-6 py-3 bg-[#009FFF] text-white font-semibold rounded-lg shadow hover:bg-[#0A65C7] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </>
  );
}