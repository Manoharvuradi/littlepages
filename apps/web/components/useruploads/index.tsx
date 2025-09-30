import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PreviewItem } from "../../utils";
import Image from "next/image";

const UserUploads = ({ 
    previewUrls, 
    selected, 
    setSelected 
}: { 
    previewUrls: PreviewItem[], 
    selected: boolean[], 
    setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", tag: "" });

    const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    setDrawerOpen(false);
  };

  return (
    <>
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {previewUrls.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden shadow cursor-pointer"
              onClick={() => { setStartIndex(idx); setIsOpen(true); }}
            >
              <Image
                src={img.url}
                alt={``}
                className="w-full h-40 object-cover"
                width={200}
                height={200}
              />

              {/* Checkmark Overlay */}
              <div
                className={`absolute top-2 right-2 w-6 h-6 rounded-sm border-2 flex items-center justify-center ${
                  selected[idx] ? "bg-[#128C7E] border-[#128C7E]" : "bg-white border-[#128C7E]"
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // 🚀 prevent opening lightbox
                  setSelected((prev) => {
                    const updated = [...prev];
                    updated[idx] = !updated[idx]; // toggle check
                    return updated;
                  });
                }}
              >
                {selected[idx] &&  (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[2000]"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Content */}
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="relative w-full max-w-5xl mx-auto">
              {/* Toolbar */}
              <div
                className="absolute top-4 left-50 z-20 flex space-x-4 text-white"
                style={{
                  top: "calc(-10% + 20px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {/* buttons here */}
                <div className="absolute top-4 left-50 z-20 flex space-x-4 text-white" style={{ top: 'calc(-10% + 20px)', left: '50%', transform: 'translateX(-50%)' }}>
                          <button className="hover:text-indigo-400">
                              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                          </button>
                          <button className="hover:text-indigo-400">
                              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                          </button>
                          <button className="hover:text-indigo-400">
                              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                          <button onClick={() => setIsOpen(false)} className="hover:text-indigo-400">
                              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                          </button>

                      </div>
              </div>

              {/* Swiper for slides */}
              <Swiper modules={[Navigation]} navigation initialSlide={startIndex}>
                {previewUrls.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col justify-center items-center p-8">
                      <Image
                        src={img.url}
                        alt=""
                        width={600}
                        height={400}
                        className="object-contain"
                      />
                      <button
                        onClick={() => setDrawerOpen(true)}
                        className="mt-6 px-4 py-2 font-bold text-blue-600 flex gap-2"
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
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        Edit Label
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* 👇 Drawer must live INSIDE Dialog.Panel */}
              <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[3000] ${
                  drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h3 className="text-lg font-semibold">Edit Labels</h3>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tag
                    </label>
                    <input
                      type="text"
                      name="tag"
                      value={formData.tag}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Enter tag"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full mt-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UserUploads
