"use client";

import React, { useState } from "react";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
};

export default function BookTitle({ formData, setFormData, onNext }: Props) {
  const [title, setTitle] = useState(formData.bookTitle || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const upper = e.target.value.toUpperCase();
    setTitle(upper);
    setFormData({ ...formData, bookTitle: upper });
  };

  return (
<div className="w-full max-w-md mx-auto p-4 min-h-[85vh] flex flex-col overflow-hidden">
  {/* Header */}
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold">TITLE YOUR BOOK</h1>
  </div>

    <label
      htmlFor="book-title"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      BOOK TITLE
    </label>

  <input
    id="book-title"
    type="text"
    placeholder="BOOK TITLE"
    value={title}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FFF] uppercase"
  />

  {/* Button pinned to bottom */}
  <button
    disabled={!title.trim()}
    onClick={onNext}
    className={`mt-auto w-full py-3 rounded-lg font-semibold ${
      title.trim()
        ? "bg-[#009FFF] text-white hover:bg-[#0085d6]"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
  >
    Next
  </button>
</div>
  );
}