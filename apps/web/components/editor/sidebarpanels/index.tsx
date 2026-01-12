import { useEffect, useState } from "react";
import Image from "next/image";
import { Option } from "../../booksize";
import { updateBookSize, updateDisplaySettings } from "../../../server/book";

const options: Option[] = [
  {
    id: "landscape",
    label: "11in x 8.5in",
    widthIn: 11,
    heightIn: 8.5,
    src: "/images/finalbooksize.png",
    alt: "11 x 8.5 book preview",
  },
  {
    id: "square",
    label: "8in x 8in",
    widthIn: 8,
    heightIn: 8,
    src: "/images/finalbooksize.png",
    alt: "8 x 8 book preview",
  },
];

const SCALE = 20;
export default function SidebarWithPopup({
  displaySettings,
  bookSize,
  bookId,
  setSidebarOpen
}: {
  displaySettings: any
  bookSize: string;
  bookId: number;
  setSidebarOpen: (open: boolean) => void;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookSizeChange, setBookSizeChange] = useState<string>("");
  const [textDisplayPopupOpen, setTextDisplayPopupOpen] = useState(false);

  const [localDisplaySettings, setLocalDisplaySettings] = useState({
    showCaption: displaySettings?.showCaption,
    showName: displaySettings?.showName,
    showDate: displaySettings?.showDate,
    showAge: displaySettings?.showAge,
  });


  const handleSelect = (id: string) => {
    setBookSizeChange(id);
  };

  useEffect(()=>{
    setBookSizeChange(bookSize);
    if(isPopupOpen || textDisplayPopupOpen){
      setSidebarOpen(true);
    }else{
      setSidebarOpen(false);
    }
  }, [bookSize, isPopupOpen, textDisplayPopupOpen]);

  // Add the handleChange function
const handleDisplaySettingChange = (setting: 'showCaption' | 'showName' | 'showDate') => {
  setLocalDisplaySettings(prev => ({
    ...prev,
    [setting]: !prev[setting]
  }));
};


  const handleBookSize = async () => {
    try{
      await updateBookSize(bookId!, bookSizeChange);
    }catch(err){
      console.error("Error updating book size:", err);
    }
    setIsPopupOpen(false);
  }

  const handleSaveDisplaySettings = async () => {
    try{
      // Assuming you have an API function to update display settings
      // await updateDisplaySettings(bookId!, localDisplaySettings);
      await updateDisplaySettings(bookId!, localDisplaySettings);
    }catch(err){
      console.error("Error updating display settings:", err);
    }
    setTextDisplayPopupOpen(false);
  }

  return (
    <div className={`flex bg-gray-50`}>
      <aside className="w-24 bg-blue-100 p-4 flex flex-col items-center gap-6 lg:min-h-screen">
        {/* Book Size */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex flex-col items-center text-gray-700 hover:text-indigo-600 hover:bg-blue-50 p-3 rounded-xl transition cursor-pointer w-full"
        >
          <img src="/svg/booksize.svg" alt="selected" className="w-8.5 h-6.5" />
          <span className="text-[11px] font-medium text-center leading-tight">
            Book Size
          </span>
        </button>

        <button
          onClick={() => setTextDisplayPopupOpen(true)}
          className="flex flex-col items-center text-gray-700 hover:text-indigo-600 hover:bg-blue-50 p-3 rounded-xl transition cursor-pointer w-full"
        >
          <img src="/svg/textdisplay.svg" alt="" className="w-8.5 h-6.5" />
          <span className="text-[11px] font-medium text-center leading-tight">
            Book Text Display
          </span>
        </button>
      </aside>

      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
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
                const isSelected = bookSizeChange === opt.id;
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

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleBookSize}
                className={` mt-2 px-18 py-2 rounded-md font-semibold ${
                  bookSizeChange
                    ? "bg-[#009FFF] text-white hover:bg-[#009FFF]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {textDisplayPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setTextDisplayPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
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
                  onClick={() => handleDisplaySettingChange('showCaption')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    localDisplaySettings.showCaption ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      localDisplaySettings.showCaption ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <button
                  type="button"
                  onClick={() => handleDisplaySettingChange('showName')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    localDisplaySettings.showName ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      localDisplaySettings.showName ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Date</span>
                <button
                  type="button"
                  onClick={() => handleDisplaySettingChange('showDate')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    localDisplaySettings.showDate ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      localDisplaySettings.showDate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveDisplaySettings}
                className={` mt-2 px-18 py-2 rounded-md font-semibold ${
                  bookSizeChange
                    ? "bg-[#009FFF] text-white hover:bg-[#009FFF]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}