"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSelectedImages } from "../../context";
import { useRouter } from "next/navigation";
import { Props } from "../../utils";
import styles from "./index.module.scss";


export type Option = {
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
    src: "/images/finalbooksize.png",
    alt: "11 x 8.5 book preview",
  },
  {
    id: "square",
    label: "8in x 8in Book",
    widthIn: 8,
    heightIn: 8,
    src: "/images/finalbooksize.png",
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
    <div className="flex flex-col items-center w-full bg-gray-100">
      <h2 className="text-2xl font-semibold mb-8">Choose Book Size</h2>

<div className={`${styles.bookSizes} gap-4 mb-10 items-start`}>

  {options.map((opt) => {
    const isSelected = formData.bookSize === opt.id;
    const displayWidth = Math.round(opt.widthIn * SCALE);
    const displayHeight = Math.round(opt.heightIn * SCALE);

    return (
      <div
        key={opt.id}
        className="flex flex-col items-center cursor-pointer transition-transform hover:scale-[1.02]"
        onClick={() => handleSelect(opt.id)}
      >
        <div
          className={`relative rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200
            ${isSelected ? "border-3 border-[#009FFF] shadow-xl" : "hover:shadow-lg"}
          `}
          style={{
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
          }}
        >
          {/* Floating checkbox */}
          <div
            className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${isSelected ? "bg-[#009FFF] border-[#009FFF]" : "bg-transparent border-white"}
            `}
          >
            {isSelected && (
              <img src="/svg/check.svg" alt="selected" className="w-3.5 h-3.5" />
            )}
          </div>

          {/* IMAGE */}
          <Image
            src={opt.src}
            alt={opt.alt || opt.label}
            width={displayWidth}
            height={displayHeight}
            draggable={false}
            className="object-cover w-full h-full"
          />
        </div>

        {/* LABEL */}
        <div className="mt-3 text-center text-sm font-medium text-gray-700">
          {opt.label}
        </div>
      </div>
    );
  })}

</div>

      <button
        disabled={!formData.bookSize}
        onClick={onNext}
        className={`${styles.nextButton} mt-2 px-18 py-3 rounded-md font-semibold ${
          formData.bookSize
            ? "bg-[#009FFF] text-white hover:bg-[#009FFF]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}