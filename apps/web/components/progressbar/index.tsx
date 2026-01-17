import React from 'react';

const steps = ['Address', 'Shipping', 'Review'];

export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => {
        const isCompleted = index + 1 < step;
        const isActive = index + 1 === step;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted
                  ? 'bg-green-600 text-white'
                  : isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <p className="mt-2 text-xs text-gray-600">{label}</p>
          </div>
        );
      })}
    </div>
  );
}