"use client";

import React, { useState } from "react";
import { IFormData, Props } from "../../utils";
import { bookInput } from "../../server/book";
import { getCurrentUser } from "../../server/user";
import Button from "../../common/buttons/filledbuttons";
import { useRouter } from "next/navigation";

const TextDisplay = ({ formData, setFormData, onNext }: Props) => {

    const [result, setResult] = useState({
      success: false,
      loading: false,
      error: false
    });

    const router = useRouter();


  const handleGenerate = async () => {
       setResult((prev) => ({
      ...prev, 
      loading: true
    }));
    const user = await getCurrentUser();
    try{

      const req: IFormData = {
        images: formData.images,
        bookSize: formData.bookSize,
        coverPhotoUrl: formData.coverPhotoUrl,
        bookTitle: formData.bookTitle,
        userId: user.sub,
        displaySettings: {
          showCaption: true,
          showName: formData.displaySettings.showName,
          showDate: formData.displaySettings.showDate,
        }
      }

      const res = await bookInput(req);

      if(res.id == null){
        setResult((prev) => ({
          ...prev, 
          loading: false,
          error: true
        }));
      }else{
        setTimeout(() => {
          setResult((prev) => ({
            ...prev,
            loading: false,
            success: true
          }));
          router.push(`/books/${res.id}/bookeditor`);
        },  5000);
      }

    }catch(err){
      setTimeout(() => {
        setResult((prev) => ({
          ...prev,
          loading: false,
          error: true
        }))
      },
      3000)
    }finally{
      setTimeout(() => {
        setResult((prev) => ({
          ...prev,
          success: false, 
          error: false
        }));
      }, 3000);
    }
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
            onClick={() => setFormData({ ...formData, displaySettings: { ...formData.displaySettings, showCaption: !formData.displaySettings.showCaption } })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.displaySettings.showCaption ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.displaySettings.showCaption ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Name */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, displaySettings: { ...formData.displaySettings, showName: !formData.displaySettings.showName } })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.displaySettings.showName ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.displaySettings.showName ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, displaySettings: { ...formData.displaySettings, showDate: !formData.displaySettings.showDate } })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.displaySettings.showDate ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.displaySettings.showDate ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

      <Button 
        text={"Generate Book"}
        onClick={handleGenerate}
        loading={result.loading}
        className={`mt-2 font-semibold w-full rounded-md ${result.loading ? `bg-white border border-blue-500` : `bg-blue-500`} px-14 py-2 text-white`}
      />
      </div>

      {result.success && (
        <span className="text-green-600 font-bold text-sm mt-2">Book generated successfully!</span>
      )}
      {result.error && (
        <span className="text-red-600 font-bold text-sm mt-2">Something went wrong!</span>
      )}
    </div>
  );
};

export default TextDisplay;