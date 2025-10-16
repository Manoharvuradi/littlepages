"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import { addImage } from "../../server/images";
import { getCurrentUser } from "../../server/user";
import { addImageToBook } from "../../server/bookimage";

export default function PreviewUploads() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerIndex = Number(searchParams.get("container"));

  const bookId = Number(searchParams.get("bookId"));

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🧠 Handle upload via file picker
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      await uploadFilesToSupabase(files);
    }
  };

  // 🧠 Handle upload via drag & drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
    if (files.length > 0) {
      await uploadFilesToSupabase(files);
    }
  };

  // 🧠 Function to trigger hidden input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 🧠 Core Supabase upload logic
  const uploadFilesToSupabase = async (files: File[]) => {
    const userId = await getCurrentUser();
    if (!userId) {
      alert("User not logged in");
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
            // ✅ sanitize file name: remove spaces and special chars
        const safeFileName = file.name
          .replace(/[^\w.-]+/g, "_") // replaces spaces, colons, etc with underscores
          .toLowerCase();

        const filePath = `user-uploads/${userId.sub}/${Date.now()}-${safeFileName}`;
        const { error } = await supabase.storage
          .from("photos")
          .upload(filePath, file, { upsert: false });

        if (error) throw error;

        const { data } = supabase.storage.from("photos").getPublicUrl(filePath);
        const publicUrl = data.publicUrl;

        const req = {
          bookId: bookId,
          fileUrl: publicUrl,
          userId: userId.sub,
          filename: file.name,
        }
        // Save to DB
        await addImageToBook(req);
      }

      // ✅ Redirect back to book page after upload
      router.push(`/books/${bookId}/bookeditor`);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
  <div
    className={`relative w-full max-w-lg h-80 sm:h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
      dragActive
        ? "border-indigo-600 bg-indigo-50 scale-[1.01]"
        : "border-indigo-300 bg-white"
    }`}
    onClick={handleUploadClick}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    {uploading && (
      <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-2xl">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600 mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span className="text-indigo-600 text-sm font-semibold">
          Uploading...
        </span>
      </div>
    )}

    {!uploading && (
      <>
        <span className="text-indigo-600 text-6xl mb-3">+</span>
        <span className="text-gray-600 text-lg font-medium text-center">
          Click or Drag & Drop to Upload
        </span>
        <span className="text-xs text-gray-400 mt-2">
          Supports PNG, JPG, JPEG
        </span>
      </>
    )}

    <input
      type="file"
      accept="image/*"
      multiple
      ref={fileInputRef}
      onChange={handleFileChange}
      className="hidden"
    />
  </div>
</div>
  );
}