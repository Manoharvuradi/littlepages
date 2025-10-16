import React from 'react';

const steps = ['Address', 'Shipping', 'Confirmation', 'Review'];

export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index + 1 <= step
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index + 1}
          </div>
          <p className="mt-2 text-xs text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  );
}