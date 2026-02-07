'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import WithSidebar from '../../components/sidebar';
import { addImage, getMyImages } from '../../server/images';
import { supabase } from '../../lib/supabaseClient';
import { getCurrentUser } from '../../server/user';
import UserUploads from '../../components/useruploads';
import { useRouter } from 'next/dist/client/components/navigation';
import { useSelectedImages } from '../../context';
import { PreviewItem } from '../../utils';
import StaticNavbar from '../../common/staticnavbar/staticnavbar';
import styles from "./photos.module.scss";  // ✅ ADD SCSS

const PhotosPage = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<PreviewItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const { selected, setSelected, setSelectedImages } = useSelectedImages();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserId(user?.sub ?? null);
    };
    fetchUser();
  }, []);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    if (!userId) return;
    const images = await getMyImages();
    setPreviewUrls(
      images?.map((img: any) => ({
        id: img.id,
        url: img.url,
        name: img?.displayOptions?.name,
        caption: img?.displayOptions?.caption,
        age: img?.displayOptions?.age,
      }))
    );
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId) fetchImages();
  }, [userId, fetchImages]);

  const uploadFilesToSupabase = async (files: File[]) => {
    if (!userId) return;
    setDragActive(true);

    for (const file of files) {
      const safeFileName = file.name.replace(/[^\w.-]+/g, "_").toLowerCase();
      const filePath = `${process.env.NEXT_PUBLIC_S3_PATH}/${userId}/${Date.now()}-${safeFileName}`;

      const { error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
        .upload(filePath, file, { upsert: false });

      if (!error) {
        const { data } = supabase.storage.from(process.env.NEXT_PUBLIC_S3_BUCKET!).getPublicUrl(filePath);
        await addImage(data.publicUrl, file.name, userId);
        await fetchImages();
        setSelectedFiles(prev => [...prev, file]);
      }
    }

    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) uploadFilesToSupabase(files);
  };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
      if (files.length > 0) {
        uploadFilesToSupabase(files);
      }
  };

    useEffect(() => {
      setSelected(new Array(previewUrls.length).fill(false));
    }, [previewUrls]);

    const handleButtonClick = () => {
      if (selected.filter(Boolean).length < 10) {
        setShowPopup(true);
        return;
      }
      const images = previewUrls.filter((_, idx) => Boolean(selected[idx]));
      setSelectedImages(images);
      router.push("/books/create");
    };

  // ✅ Navbar color and layout change when selection exists
  return (
    <div className={`p-6 bg-blue-50/50 ${styles.photosPage}`}>
      <div className={`flex items-center justify-between my-3 ${styles.headerRow}`}>
        <h1 className="text-2xl font-bold">
          My Photos
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{previewUrls.length} Images</span>
        </h1>
        <div className={`flex flex-end gap-3 ${styles.actionsRow}`}>
          <button
            onClick={() => {
              const allSelected = selected.every(Boolean);
              if (allSelected) {
                setSelected(previewUrls.map(() => false)); // Deselect all
              } else {
                setSelected(previewUrls.map(() => true)); // Select all visible
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition
              ${selected.every(Boolean)
                ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            {selected.every(Boolean) ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth={2}
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Deselect All
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" strokeWidth={2}
                    stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Select Visible
              </>
            )}
          </button>
          <div
            onClick={() => handleButtonClick()}
            className="px-4 py-2 bg-[#009FFF] text-white font-semibold rounded-lg shadow hover:bg-[#0A65C7] cursor-pointer transition"
          >
            Create Book
          </div>
        </div>
      </div>
      <div className={`mb-6 bg-white border border-gray-200 min-h-[100vh] p-6 ${styles.uploadSection}`}>
        <div className={`gap-4 space-y-4 ${styles.uploadGrid}`}>
          <div
            className={`w-42 h-32 border-2 border-dashed flex flex-col items-center justify-center rounded-lg cursor-pointer transition relative ${styles.uploadBox}
              ${dragActive ? styles.dragActive : ""}`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {dragActive && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-lg">
                <svg
                  className="animate-spin h-6 w-6 text-indigo-600 mb-2"
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
              <span className="text-indigo-600 text-xs font-semibold">Uploading...</span>
              </div>
            )}
            <span className="text-indigo-600 text-3xl mb-1">+</span>
            <span className="text-xs text-blue-500 text-center z-1">
              Click or Drag & Drop
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <UserUploads 
            previewUrls={previewUrls}
            fetchImages={fetchImages}
            loading={loading}
          />
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-blue-400/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full  max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Select More Images
            </h2>
            <p className="text-gray-600 mb-4">
              You must select at least 20 images to proceed.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#009FFF] text-white px-4 py-2 rounded-md hover:bg-[#0A65C7] cursor-pointer transition-colors"
            >
              OK, Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WithSidebar(PhotosPage)