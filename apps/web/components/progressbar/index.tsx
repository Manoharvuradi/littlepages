import React from 'react';

// Updated steps to include 'Review' in the middle
const steps = ['Address', 'Review', 'Payment'];

export default function ProgressBar({ step }: { step: number }) {
  // Logic remains the same, just utilizing the new labels
  return (
    <div className="flex justify-between mb-8 max-w-2xl mx-auto w-full">
      {steps.map((label, index) => {
        // Since step 1 is Address, 2 is Review, 3 is Payment
        const currentStepIndex = index + 1;
        
        const isCompleted = currentStepIndex < step;
        const isActive = currentStepIndex === step;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            {/* Connector Line */}
            {index !== 0 && (
                 <div className={`absolute top-4 right-[50%] w-full h-[2px] -z-10 ${
                     isCompleted || isActive ? 'bg-indigo-600' : 'bg-gray-200'
                 }`} style={{ right: '50%' }}></div>
            )}
            
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10 ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                  ? 'bg-[#102371] text-white ring-4 ring-indigo-100'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                currentStepIndex
              )}
            </div>
            <p className={`mt-2 text-xs font-medium ${isActive ? 'text-[#102371]' : 'text-gray-500'}`}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}