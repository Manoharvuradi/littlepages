import React, { useEffect, useRef, useState } from "react";
import { useSelectedImages } from "../../context";
import { useRouter } from "next/navigation";
import { Props } from "../../utils";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import { addImage } from "../../server/images";
import { getCurrentUser } from "../../server/user";

const CoverImage = ({ formData, setFormData, onNext }: Props) => {
  const { selectedImages } = useSelectedImages();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<"book" | "gallery">("book");
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImages.length < 10) router.push("/photos");
    const load = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user?.sub ?? null);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [selectedImages, router]);

  const uploadSingleFileToSupabase = async (file: File) => {
    if (!userId) return;

    setUploading(true);

    const safeFileName = file.name
      .replace(/[^\w.-]+/g, "_")
      .toLowerCase();

    const filePath = `user-uploads/${userId}/${Date.now()}-${safeFileName}`;

    const { error } = await supabase.storage
      .from("photos")
      .upload(filePath, file, { upsert: false });

    if (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("photos").getPublicUrl(filePath);

    const coverImage = await addImage(data.publicUrl, file.name, userId);

    setUploadedImage({
      id: coverImage.id,
      url: coverImage.url,
      caption: file.name,
    });

    setUploading(false);
  };

  const imagesToDisplay = activeButton === "book" ? selectedImages : (uploadedImage ? [uploadedImage] : []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await uploadSingleFileToSupabase(file);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    await uploadSingleFileToSupabase(file!);

    e.target.value = "";
  };

  return (
    <div className="flex-1 flex flex-col items-center h-full p-2 bg-gray-100 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center flex-shrink-0">Choose Cover Image</h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-4 justify-center flex-shrink-0">
        <button
          className={`mt-2 px-8 py-3 rounded-full transition ${
            activeButton === "book"
              ? "bg-[#009FFF] text-white"
              : "bg-white text-md text-gray-700 border border-gray-300 hover:bg-indigo-100"
          }`}
          onClick={() => setActiveButton("book")}
        >
          From Book
        </button>

        <button
          className={`mt-2 px-8 py-3 rounded-full transition ${
            activeButton === "gallery"
              ? "bg-[#009FFF] text-white"
              : "bg-white text-md text-gray-700 border border-gray-300 hover:bg-indigo-100"
          }`}
          onClick={() => setActiveButton("gallery")}
        >
          Gallery
        </button>
      </div>

      {/* Gallery Upload Area */}
      {activeButton === "gallery" && !uploadedImage && (
        <div
          className={`relative w-full max-w-2xl h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${
            dragActive
              ? "border-indigo-600 bg-indigo-50 scale-[1.01]"
              : "border-indigo-300 bg-gray-50"
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
            multiple={false}
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Scrollable Image Grid */}
      <div className="flex-1 w-full overflow-auto">
        {imagesToDisplay.length > 0 && (
          <div
            className="w-full max-w-5xl mx-auto grid gap-4 pb-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(140px, calc(50% - 8px)), 1fr))",
              gridAutoRows: "1fr",
            }}
          >
            {imagesToDisplay.map((img, idx) => {
              const isSelected = formData.coverPhotoUrl === img.id;
              return (
                <div
                  key={idx}
                  className="relative cursor-pointer group overflow-hidden rounded-lg aspect-square"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      coverPhotoUrl: img.id,
                    })
                  }
                >
                  <Image
                    src={img.url}
                    alt={img.caption || ""}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isSelected ? "opacity-90" : "group-hover:opacity-80"
                    }`}
                    width={300}
                    height={300}
                  />
                  <div
                    className={`absolute top-1 right-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "bg-[#009FFF] border-[#009FFF]"
                        : "bg-transparent border-white group-hover:bg-blue-200"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Change Image Button - Only for Gallery */}
        {activeButton === "gallery" && uploadedImage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setUploadedImage(null);
                setFormData({ ...formData, coverPhotoUrl: "" });
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Change Image
            </button>
          </div>
        )}
      </div>

      {/* Next Button - Sticky */}
      <button
        disabled={!formData.coverPhotoUrl}
        onClick={() => {
          setFormData({
            ...formData,
            images: selectedImages, // Always use selectedImages from book
          });
          onNext();
        }}
        className={`mt-6 px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex-shrink-0 ${
          formData.coverPhotoUrl
            ? "bg-[#009FFF] text-white hover:bg-[#007ACC]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default CoverImage;