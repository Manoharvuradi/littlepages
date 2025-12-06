import React from "react";

interface Step { name: string; }
interface SideStepsProps { steps: Step[]; currentStep: number; }

const SideSteps: React.FC<SideStepsProps> = ({ steps, currentStep }) => {
  return (
    <aside className="">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Little Pages</h1>
        <hr className="my-4 text-gray-300" />
        <h2 className="text-lg font-bold mb-4 text-center">Book Wizard</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Personalize your Art Book in {steps.length} Easy Steps
        </p>

        <nav className="space-y-4">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <div key={idx} className="flex items-center space-x-3">
                <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2
                  ${isActive ? "border-[#009FFF] bg-[#009FFF]" : isCompleted ? "border-[#009FFF]" : "border-gray-300"}`}>
                  {(isActive || isCompleted) && (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} stroke="#fff">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${isActive ? "text-[#009FFF] font-semibold" : "text-gray-500"}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SideSteps;