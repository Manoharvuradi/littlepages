"use client";
import React, { useState } from "react";
import { createBookSteps, IFormData } from "../../utils";
import SideSteps from "./steps";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";

const MyPhotoBook = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IFormData>({
    images: [{ id: "", url: "", displayOptions: { name: "", age: "", caption: "", date: "", tags: "" } }],
    userId: null as any,
    bookSize: null,
    coverPhotoUrl: null,
    bookTitle: "",
    displaySettings: { showCaption: false, showName: false, showDate: false, showAge: false },
  });

  const router = useRouter();
  const StepComponent: any = createBookSteps[currentStep]?.component;

  const handleNext = () => currentStep < createBookSteps.length - 1 && setCurrentStep(s => s + 1);
  const handleBack = () => currentStep > 0 && setCurrentStep(s => s - 1);
  const handleCancel = () => router.push("/photos");

  return (
    <div className="flex h-screen overflow-hidden p-3 bg-gray-100">
      <div className={`${styles.steps} w-64 bg-white shadow-md p-6 flex flex-col overflow-auto `}>
        <SideSteps steps={createBookSteps} currentStep={currentStep} />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="p-1 ml-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <span className="font-semibold text-gray-600">{'< Back'}</span>
            </button>
          ) : <div />}
          <div className="flex gap-1">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className={`rounded-md transition-colors duration-300 ${
                  index <= currentStep ? 'bg-[#009FFF] h-1 w-2' : 'bg-gray-300 h-1 w-1 '
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleCancel}
            className="hover:bg-gray-200 rounded-full p-0.5 transition-all duration-300 flex items-center justify-center"
          >
            <img src="/svg/cancel.svg" alt="Close Menu" className="w-6 h-6 text-black hover:text-gray-600 focus:outline-none transition-colors" />
          </button>
        </div>

        <div className="flex-1 rounded-lg overflow-auto">
          <StepComponent formData={formData} setFormData={setFormData} onNext={handleNext} />
        </div>
      </main>
    </div>
  );
};

export default MyPhotoBook;