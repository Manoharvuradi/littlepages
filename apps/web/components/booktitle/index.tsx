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
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Label */}
      <label
        htmlFor="book-title"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        BOOK TITLE
      </label>

      {/* Input */}
      <input
        id="book-title"
        type="text"
        placeholder="BOOK TITLE"
        value={title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
      />

      {/* Next Button */}
      <button
        disabled={!title.trim()}
        onClick={onNext}
        className={`mt-6 w-full py-2 rounded-lg font-semibold ${
          title.trim()
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}