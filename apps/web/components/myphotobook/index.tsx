"use client";
import React, { useState } from "react";
import { createBookSteps, IFormData } from "../../utils";
import SideSteps from "./steps";
import { useRouter } from "next/navigation";

const MyPhotoBook = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IFormData>({
    images: [{ id: "", url: "", displayOptions: { name: "", age: "", caption: "", date: "", tags: "" } }],
    userId: null as any,
    bookSize: null,
    coverPhotoUrl: null,
    bookTitle: "",
    displaySettings: { showCaption: false, showName: false, showDate: false },
  });

  const router = useRouter();
  const StepComponent: any = createBookSteps[currentStep]?.component;

  const handleNext = () => currentStep < createBookSteps.length - 1 && setCurrentStep(s => s + 1);
  const handleBack = () => currentStep > 0 && setCurrentStep(s => s - 1);
  const handleCancel = () => router.push("/photos");

  return (
    <div className="flex h-screen overflow-hidden p-6 bg-gray-100">
      {/* Sidebar */}
      <SideSteps steps={createBookSteps} currentStep={currentStep} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Top Navigation (Back + Cancel) */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors duration-300"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={handleCancel}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition-all duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Step Component */}
        <div className="flex-1 rounded-lg overflow-auto">
          <StepComponent formData={formData} setFormData={setFormData} onNext={handleNext} />
        </div>
      </main>
    </div>
  );
};

export default MyPhotoBook;