"use client";
import React, { useState, } from "react";
import { createBookSteps } from "../../utils";
import Steps from "./steps";
import SideSteps from "./steps";


const MyPhotoBook = () => {
  const [bookCreationSteps, setBookCreationSteps] = useState(createBookSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    bookSize: null,
    coverPageURL: null,
    editedImages: [
      {
        imageName: "",
        imageUrl: "",
        imageDescription: "",
      },
    ],
  });

  const StepComponent: any = createBookSteps[currentStep]?.component;

  const handleNext = () => {
    if (currentStep < createBookSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <div className="flex pt-18">
      <SideSteps steps={createBookSteps} currentStep={currentStep} />
      {/* Main content goes here */}
      <main className="flex-1 p-12">

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg ${
              currentStep === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === createBookSteps.length - 1}
            className={`px-6 py-2 rounded-lg ${
              currentStep === createBookSteps.length - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          <StepComponent formData={formData} setFormData={setFormData} />
        </div>
      </main>
    </div>
  );
};

export default MyPhotoBook;