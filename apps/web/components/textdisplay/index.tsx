"use client";

import React, { useState } from "react";
import { Props } from "../../utils";

const TextDisplay = ({ formData, setFormData, onNext }: Props) => {
  const [showImageTitle, setShowImageTitle] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showAgeGrade, setShowAgeGrade] = useState(false);
  const [showDate, setShowDate] = useState(false);

    const canGenerate = showImageTitle || showName;

  const handleGenerate = () => {
    // Replace with your logic
    console.log("Generating book with:", {
      showImageTitle,
      showName,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">
        What text do you want to display on the pages?
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">
        You can add text and activate these options in Book Editor later on
      </p>

      {/* Options */}
      <div className="space-y-4">
        {/* Image title */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Image Title</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, displayOptions: { ...formData.displayOptions, showCaption: !formData.displayOptions.showCaption } })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.displayOptions.showCaption ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.displayOptions.showCaption ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Name */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, displayOptions: { ...formData.displayOptions, showName: !formData.displayOptions.showName } })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.displayOptions.showName ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.displayOptions.showName ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Age/Grade</span>
          <button
            type="button"
            onClick={() => setShowAgeGrade(!showAgeGrade)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              showAgeGrade ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                showAgeGrade ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div> */}

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, displayOptions: { ...formData.displayOptions, showDate: !formData.displayOptions.showDate } })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.displayOptions.showDate ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.displayOptions.showDate ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className={`w-full py-2 rounded-lg font-semibold ${
          canGenerate
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Generate Book
      </button>
      </div>
    </div>
  );
};

export default TextDisplay;