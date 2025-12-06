import React, { useEffect, useState } from "react";
import { useSelectedImages } from "../../context";
import { useRouter } from "next/navigation";
import { Props } from "../../utils";
import Image from "next/image";

const CoverImage = ({ formData, setFormData, onNext }: Props) => {
  const { selectedImages } = useSelectedImages();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<"book" | "gallery">("book");
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  useEffect(() => {
    if (selectedImages.length < 4) router.push("/photos");
  }, [selectedImages, router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file, idx) => ({
      id: `uploaded-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const imagesToDisplay = activeButton === "book" ? selectedImages : uploadedImages;

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-center">Choose Cover Image</h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-4 justify-center">
        <button
          className={`mt-2 px-8 py-3 rounded-full transition ${
            activeButton === "book"
              ? "bg-[#009FFF] text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-100"
          }`}
          onClick={() => setActiveButton("book")}
        >
          From Book
        </button>

        <button
          className={`mt-2 px-8 py-3 rounded-full transition ${
            activeButton === "gallery"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-100"
          }`}
          onClick={() => setActiveButton("gallery")}
        >
          Gallery
        </button>
      </div>

      {/* Gallery Upload Input */}
      {activeButton === "gallery" && (
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="mb-4 w-full max-w-[600px] p-2 border border-gray-300 rounded-lg"
        />
      )}

<div className="flex-1 w-full overflow-auto">
  {imagesToDisplay.length > 0 && (
    <div
      className="w-full max-w-5xl mx-auto grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
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
</div>

      {/* Next Button */}
      <button
        disabled={!formData.coverPhotoUrl}
        onClick={() => {
          setFormData({
            ...formData,
            images: imagesToDisplay,
          });
          onNext();
        }}
        className={`mt-6 px-8 py-3 rounded-full font-semibold transition-colors duration-200 ${
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