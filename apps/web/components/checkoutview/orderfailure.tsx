import React from 'react';

interface OrderFailureProps {
    errorDetails?: string;
    onRetry: () => void;
    onSupport: () => void;
}

export default function OrderFailure({ errorDetails, onRetry, onSupport }: OrderFailureProps) {
  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center px-4 py-12">
      {/* Background Warning Tint */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-50 to-transparent -z-10" />

      <div className="w-full max-w-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 border border-red-50 relative">
        
        {/* Error Icon Section */}
        <div className="text-center relative">
          <div className="w-24 h-24 bg-red-50 rounded-full mx-auto flex items-center justify-center mb-6 relative">
            {/* Soft pulsing red ring */}
            <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse opacity-75"></div>
            <div className="relative w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-black text-[#102371] tracking-tight">
            Payment Failed
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-md mx-auto">
            Don't worry, no money was deducted. There was a temporary issue processing your transaction.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="mt-10 bg-red-50/50 p-6 rounded-3xl border border-red-100">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Reason for failure</h3>
          <p className="text-sm text-red-800 font-medium leading-relaxed">
            {errorDetails || "The transaction was declined by the bank. Please check your card details or try a different payment method."}
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3">
             <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold text-xs">1</div>
             <p className="text-xs text-gray-500">Check your internet connection and bank balance.</p>
          </div>
          <div className="flex items-start gap-3 p-3">
             <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold text-xs">2</div>
             <p className="text-xs text-gray-500">Ensure your card is enabled for online transactions.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
          <button
            onClick={onRetry}
            className="w-full py-4 bg-[#102371] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#1a2d6b] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            Try Payment Again
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button
            onClick={onSupport}
            className="w-full py-4 bg-white text-gray-600 font-bold rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            Talk to Support
          </button>
        </div>

        {/* Back Link */}
        <button 
          onClick={() => window.history.back()}
          className="mt-8 w-full text-center text-gray-400 text-sm hover:text-gray-600 transition-colors"
        >
          Go back to Address Details
        </button>

      </div>
    </div>
  );
}