import React, { useEffect } from "react";
import { useSelectedImages } from "../../context";
import { useRouter } from "next/navigation";
import { Props } from "../../utils";
import Image from "next/image";

const CoverImage = ({ formData, setFormData, onNext }: Props) => {
  const { selectedImages } = useSelectedImages();
  const router = useRouter();

  useEffect(() => {
    if (selectedImages.length < 4) {
      router.push("/photos");
    }
  }, [selectedImages, router]);

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-8">Choose Cover Image</h2>

      <div className="flex gap-4">
        <button className="mt-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
          From Book
        </button>

        <button className="mt-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
          Gallery
        </button>
      </div>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {selectedImages.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={img.url}
                alt={img.caption || ""}
                className="w-full h-40 object-cover"
                width={200}
                height={200}
              />

              <div>
                <p className="text-lg font-semibold">{img.caption}</p>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">{img.age}</span>
                  <span className="text-sm text-gray-500">{img.name}</span>
                </div>
              </div>

              {/* ✅ Fixed: Only one can be selected */}
              <div
                className={`absolute top-2 right-2 w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-colors duration-200 ${
                  formData.coverPhotoUrl === img.id
                    ? "bg-[#128C7E] border-[#128C7E]"
                    : "bg-white border-[#128C7E]"
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    coverPhotoUrl: img.id, // only one selected
                  })
                }
              >
                {formData.coverPhotoUrl === img.id && (
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
          ))}
        </div>
      )}

      <button
        disabled={!formData.coverPhotoUrl}
        onClick={() => {
          setFormData({
            ...formData,
            images: [...selectedImages],
          });
          onNext(); // ✅ actually call the function
        }}
        className={`mt-6 px-8 py-3 rounded-full font-semibold transition-colors duration-200 ${
          formData.coverPhotoUrl
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default CoverImage;