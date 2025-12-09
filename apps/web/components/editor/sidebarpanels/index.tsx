import { useState } from "react";
import Image from "next/image";
import { Option } from "../../booksize";

const options: Option[] = [
  {
    id: "landscape",
    label: "11in x 8.5in",
    widthIn: 11,
    heightIn: 8.5,
    src: "/images/book-horizontal.png",
    alt: "11 x 8.5 book preview",
  },
  {
    id: "square",
    label: "8in x 8in",
    widthIn: 8,
    heightIn: 8,
    src: "/images/book-square.png",
    alt: "8 x 8 book preview",
  },
];

const SCALE = 20;
export default function SidebarWithPopup({
  displaySettings,
  bookSize,
  className
}: {
  // displaySettings?: {
  //   showCaption: boolean;
  //   showName: boolean;
  //   showDate: boolean;
  // } | undefined;
  displaySettings: any
  bookSize?: string;
  className?: string;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookSizeChange, setBookSizeChange] = useState<string | null>(null);
  const [textDisplayPopupOpen, setTextDisplayPopupOpen] = useState(false);

  const handleSelect = (id: string) => {
    setBookSizeChange(id);
  };

  return (
    <div className={`flex bg-gray-50 ${className}`}>
      <aside className="w-24 bg-blue-100 p-4 flex flex-col items-center gap-6 lg:min-h-screen">
        {/* Book Size */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex flex-col items-center text-gray-700 hover:text-indigo-600 hover:bg-blue-50 p-3 rounded-xl transition cursor-pointer w-full"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span className="text-[11px] font-medium text-center leading-tight">
            Book Size
          </span>
        </button>

        <button
          onClick={() => setTextDisplayPopupOpen(true)}
          className="flex flex-col items-center text-gray-700 hover:text-indigo-600 hover:bg-blue-50 p-3 rounded-xl transition cursor-pointer w-full"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1"
          >
            <line x1="21" y1="10" x2="7" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="21" y1="18" x2="7" y2="18"></line>
          </svg>
          <span className="text-[11px] font-medium text-center leading-tight">
            Book Text Display
          </span>
        </button>
      </aside>

      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsPopupOpen(false)} // click outside closes popup
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Choose Book Size</h2>

            <div className="grid grid-cols-2 gap-2 mb-10 items-start">
              {options.map((opt) => {
                const isSelected = bookSize === opt.id;
                const displayWidth = Math.round(opt.widthIn * SCALE);
                const displayHeight = Math.round(opt.heightIn * SCALE);

                return (
                  <div
                    key={opt.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleSelect(opt.id)}
                  >
                    <div
                      className={`relative rounded-lg flex items-center justify-center ${
                        isSelected
                          ? "border-2 border-indigo-500"
                          : "border border-gray-200"
                      }`}
                      style={{
                        width: `${displayWidth}px`,
                        height: `${displayHeight}px`,
                      }}
                    >
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

                      <Image
                        src={opt.src}
                        alt={opt.alt || opt.label}
                        width={displayWidth}
                        height={displayHeight}
                        draggable={false}
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-3 text-center text-sm font-medium">
                      {opt.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {textDisplayPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setTextDisplayPopupOpen(false)} // click outside closes popup
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <button
              onClick={() => setTextDisplayPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Text Display Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Image Title</span>
                <button
                  type="button"
                  // onClick={() => setFormData({ ...formData, displaySettings: { ...formData.displaySettings, showCaption: !formData.displaySettings.showCaption } })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    displaySettings.showCaption ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      displaySettings.showCaption ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
      
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <button
                  type="button"
                  // onClick={() => setFormData({ ...formData, displaySettings: { ...formData.displaySettings, showName: !formData.displaySettings.showName } })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    displaySettings.showName ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      displaySettings.showName ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
      
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Date</span>
                <button
                  type="button"
                  // onClick={() => setFormData({ ...formData, displaySettings: { ...formData.displaySettings, showDate: !formData.displaySettings.showDate } })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    displaySettings.showDate ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      displaySettings.showDate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}