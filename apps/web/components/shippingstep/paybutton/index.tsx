"use client";
import Script from "next/script";

export default function PayButton({ amount, setFlowData, onNext }: { amount: number, setFlowData: any, onNext: () => void  }) {
  const payNow = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );
    const order = await res.json();
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_API_KEY,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Little Pages",

      handler: async function (response: any) {
        const verifyRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/verify`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const result = await verifyRes.json();
        if (result.status === 'success') {
          setFlowData((prev : any) => ({ ...prev, payment: result }));
          onNext(); // 👉 ONLY after payment success
        }
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={payNow}
        className="mt-8 w-full px-6 py-3 bg-[#009FFF] text-white font-semibold rounded-lg shadow hover:bg-[#0A65C7] transition"
      >
        Pay ₹{amount}
      </button>
    </>
  );
}