import React from 'react';

interface OrderSuccessProps {
    flowData: any;
    setFlowData: (data: any) => void;
    onBack: () => void;
}

export default function OrderSuccess({ flowData, setFlowData, onBack }: OrderSuccessProps) {
  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center px-4 py-12">
      {/* Celebration Background Element */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-50 to-transparent -z-10" />

      <div className="w-full max-w-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 relative">
        
        {/* Success Icon Section */}
        <div className="text-center relative">
          <div className="w-24 h-24 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-6 relative">
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-75"></div>
            <div className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-black text-[#102371] tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-md mx-auto">
            Woohoo! Your masterpiece is officially on its way to becoming a real book. ✨
          </p>
        </div>

        {/* Order ID Badge */}
        <div className="flex justify-center mt-8">
          <div className="bg-indigo-50 px-6 py-2 rounded-full border border-indigo-100 flex items-center gap-3">
             <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Order Number</span>
             <span className="font-mono text-indigo-900 font-bold">{flowData?.orderNumber || "ORD-7721"}</span>
          </div>
        </div>

        {/* Main Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-12">
          
          {/* Left: Summary */}
          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold uppercase">
                  {flowData?.payment?.status || 'Paid'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per book</span>
                <span className=" px-2 py-0.5 rounded-md text-xs font-bold uppercase">
                  {flowData?.pricePerBook}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Paid</span>
                <span className="font-bold text-gray-900">₹{flowData?.total}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                 <p className="text-[10px] text-gray-400 truncate">Transaction ID: {flowData?.payment?.paymentId}</p>
              </div>
            </div>
          </div>

          {/* Right: Shipping */}
          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Delivery To</h3>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-bold text-gray-900">{flowData?.address?.name}</p>
              <p className="truncate">{flowData?.address?.street}</p>
              <p>{flowData?.address?.city}, {flowData?.address?.zip}</p>
              <p className="mt-2 text-indigo-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2} strokeLinecap="round" /></svg>
                Arriving in ~7 days
              </p>
            </div>
          </div>
        </div>

        {/* Steps forward */}
        <div className="mt-12 space-y-4">
          <button
            onClick={() => (window.location.href = "/orders")}
            className="w-full py-4 bg-[#102371] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#1a2d6b] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            Track Your Order
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>

          <button
            onClick={() => (window.location.href = "/books")}
            className="w-full py-4 bg-white text-gray-600 font-bold rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            Create Another Book
          </button>
        </div>

        {/* Support Footer */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Need help? Contact our support team at <span className="text-indigo-500 font-medium">support@yourbrand.com</span>
        </p>

      </div>
    </div>
  );
}