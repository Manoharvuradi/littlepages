"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getCurrentUser } from "../../server/user";
import { addImageToBook } from "../../server/bookimage";

type UploadModalProps = {
  bookId?: number | null;
  position?: { containerIndex: number | null; insertPosition: number | null };
  setUploadModal: (value: boolean) => void;
  onUploadComplete: () => void;
  imageid?: string | null;
};

export default function UploadModal({ bookId, position, setUploadModal, onUploadComplete, imageid }: UploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      await uploadFilesToSupabase(files);
    }
  };

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFilesToSupabase = async (files: File[]) => {
    const userId = await getCurrentUser();
    if (!userId) {
      alert("User not logged in");
      return;
    }
    setUploading(true);
    try {
      for (const file of files) {
        const safeFileName = file.name
          .replace(/[^\w.-]+/g, "_")
          .toLowerCase();

        const filePath = `${process.env.NEXT_PUBLIC_S3_PATH}/${userId.sub}/${Date.now()}-${safeFileName}`;
        const { error } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
          .upload(filePath, file, { upsert: false });

        if (error) throw error;

        const { data } = supabase.storage.from(process.env.NEXT_PUBLIC_S3_BUCKET!).getPublicUrl(filePath);
        const publicUrl = data.publicUrl;

        const req = {
          bookId: bookId!,
          fileUrl: publicUrl,
          userId: userId.sub,
          filename: file.name,
        }
        await addImageToBook(req);
      }

      onUploadComplete();
      setUploadModal(false);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ 
        zIndex: 99999,
        position: 'fixed',
        margin: 0,
        transform: 'none'
      }}
    >
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        {/* Close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Image</h2>
          <button
            onClick={() => setUploadModal(false)}
            disabled={uploading}
            className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Upload area */}
        <div
          className={`relative w-full h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive
              ? "border-indigo-600 bg-indigo-50 scale-[1.01]"
              : "border-indigo-300 bg-gray-50"
          }`}
          onClick={!uploading ? handleUploadClick : undefined}
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
            multiple={false}
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  );
}