import React from "react";

interface Step {
  name: string;
}

interface SideStepsProps {
  steps: Step[];
  currentStep: number;
}

const SideSteps: React.FC<SideStepsProps> = ({ steps, currentStep }) => {
  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Book Wizard</h2>
      <p className="text-sm text-gray-500 mb-6">
        Personalize your Art Book in {steps.length} Easy Steps
      </p>

      <nav className="space-y-4">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;

          return (
            <div key={idx} className="flex items-center space-x-3">
              {/* Circle with check or empty */}
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#128C7E] ${
                  isActive
                    ? "#128C7E"
                    : isCompleted
                    ? "#128C7E"
                    : "border-gray-300"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke={isActive ? "#128C7E" : isCompleted ? "#128C7E" : "#D1D5DB"}
                  className={`${
                    isActive || isCompleted ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              {/* Step label */}
              <span
                className={`text-sm ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideSteps;