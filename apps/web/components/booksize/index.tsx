"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSelectedImages } from "../../context";
import { useRouter } from "next/navigation";
import { Props } from "../../utils";


type Option = {
  id: string;
  label: string;
  widthIn: number;
  heightIn: number;
  src: string; // relative to /public
  alt?: string;
};

const SCALE = 20; // pixels per inch — adjust to make cards bigger/smaller visually

const options: Option[] = [
  {
    id: "landscape",
    label: "11in x 8.5in Book",
    widthIn: 11,
    heightIn: 8.5,
    src: "/images/book-horizontal.png",
    alt: "11 x 8.5 book preview",
  },
  {
    id: "square",
    label: "8in x 8in Book",
    widthIn: 8,
    heightIn: 8,
    src: "/images/book-square.png",
    alt: "8 x 8 book preview",
  },
];

export default function BookSize({ formData, setFormData, onNext }: Props) {

  const { selectedImages } = useSelectedImages();
    const router = useRouter();
  
    useEffect(() => {
      if(selectedImages.length < 4 ){
        router.push('/photos');
      }
    },[selectedImages])

  const handleSelect = (id: string) => {
    setFormData({ 
      ...formData, 
      bookSize: id
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-8">Choose Book Size</h2>

      <div className="grid grid-cols-2 gap-2 mb-10 items-start">
        {options.map((opt) => {
          const isSelected = formData.bookSize === opt.id;
          const displayWidth = Math.round(opt.widthIn * SCALE);
          const displayHeight = Math.round(opt.heightIn * SCALE);

          return (
            <div
              key={opt.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelect(opt.id)}
            >
              {/* bordered image container */}
              <div
                className={`relative rounded-lg overflow-hidden flex items-center justify-center ${
                  isSelected
                    ? "border-2 border-indigo-500"
                    : "border border-gray-200"
                }`}
                style={{
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                }}
              >
                {/* radio/check overlay */}
                <div
                  className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>

                {/* Image */}
                <Image
                  src={opt.src}
                  alt={opt.alt || opt.label}
                  width={displayWidth}
                  height={displayHeight}
                  draggable={false}
                  className="object-cover"
                />
              </div>

              {/* label below image */}
              <div className="mt-3 text-center text-sm font-medium">
                {opt.label}
              </div>
            </div>
          );
        })}
      </div>

      <button
        disabled={!formData.bookSize}
        onClick={onNext}
        className={`mt-2 px-8 py-3 rounded-full font-semibold ${
          formData.bookSize
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}