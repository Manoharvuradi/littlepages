import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ageInput, captionInput, dateInput, nameInput, PreviewItem } from "../../utils";
import Image from "next/image";
import InputField from "../../common/form/input";
import Button from "../../common/buttons/filledbuttons";
import { deleteImage, updateImageFormData } from "../../server/images";
import { ImageUpdateInput } from "@repo/types";
import SecondaryButton from "../../common/buttons/secondarybutton";
import { useSelectedImages } from "../../context";
import styles from "./useruploads.module.scss";
import UploadModal from "../editor/previewuploads";

export interface FormItem {
  id: string;
  name: string;
  caption: string;
  age: string;
  date: string;
}

const UserUploads = ({ 
    previewUrls, 
    fetchImages,
    loading
}: { 
    previewUrls: PreviewItem[], 
    fetchImages: () => Promise<void>,
    loading: Boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [result, setResult] = useState({
    success: false,
    loading: false,
    error: false
  });
  const [formData, setFormData] = useState<FormItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);

useEffect(() => {
  setFormData(
    previewUrls.map((url) => ({
      id: url.id,                 // ✅ REQUIRED
      name: url.name ?? "",
      caption: url.caption ?? "",
      age: url.age ?? "",
      date: url.date ?? "",
    }))
  );
}, [previewUrls]);


  const {selected, setSelected} = useSelectedImages();

const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormData((prev) => {
    const updated = [...prev];
    const currentItem = updated[selectedIndex];
    
    // Guard against undefined
    if (currentItem) {
      updated[selectedIndex] = {
        ...currentItem,
        [name]: value
      };
    }
    
    return updated;
  });
};

    const onDownload = async (image: string) => {
    try {
      const imageUrl = image;
      if (!imageUrl) {
        console.warn("No image URL to download");
        return;
      }
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image for download");
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      // Try to extract a filename from URL or fallback
      const urlParts = imageUrl.split("/");
      let filename =
        urlParts[urlParts.length - 1] ||
        `image-${Date.now()}.jpg`;
      if (!filename.includes(".")) filename += ".jpg";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult((prev) => ({
      ...prev, 
      loading: true
    }));
    const currentForm = formData[selectedIndex];
    const currentImage = previewUrls[selectedIndex];

    if (!currentImage || !currentForm) return;

    const req: ImageUpdateInput = {
      id: currentImage.id,
      displayOptions: {
        name: currentForm.name,
        age: currentForm.age,
        caption: currentForm.caption,
        date: currentForm.date ? new Date(currentForm.date) : undefined,
      },
    };
    // Here you can handle the form submission, e.g., send data to the server
    try{
      const response = await updateImageFormData(req);
      if(!response){
        setResult((prev) => ({
          ...prev, 
          loading: false,
          error: true
        }));
      }else{
        setTimeout(() => {
          setResult((prev) => ({
            ...prev,
            loading: false,
            success: true
          }));
        },  3000);
      }
    }catch(err){
      setResult((prev) => ({
        ...prev, 
        loading: false,
        error: true
      }))
    }finally{
      // Reset success and error after 5 seconds
      setTimeout(() => {
        setResult((prev) => ({
          ...prev,
          success: false, 
          error: false
        }));
      }, 5000);
      await fetchImages();
    }
  };

  const handleUploadComplete = async() => {
    console.log("Upload complete, refresh images if needed.");
  }

  const handleDeleteImage = async(imageId: string) => {
    try{
      await deleteImage(imageId);
      await fetchImages();
    }catch(err){
      console.error("Error deleting image:", err);
    }
  };

  if(loading){
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        </div>
      </div>
    )
  }


  return (
    <>
      {previewUrls.length > 0 && (
        <div className={`${styles.imageGrid} grid grid-cols-2 gap-4`}>
          {previewUrls.map((img: any, idx: number) => (
            <div
              key={idx}
              className={`${styles.imageCard} relative`}
              onClick={() => {
                setStartIndex(idx);
                setIsOpen(true);
              }}
            >
              <div className="relative rounded-md">
                <Image
                  src={img.url}
                  alt=""
                  className="!rounded-md w-40 h-32 object-cover cursor-pointer"
                  width={160}
                  height={128}
                />

                <div className="">
                  <p className="text-sm text-black leading-tight truncate">
                    {img.caption && (img.caption.length > 20 ? img.caption.substring(0, 20) + '...' : img.caption)}
                  </p>
                  <div className="flex gap-2 text-xs text-[#B1B1B1] mt-0.5 metadata">
                    <span>{img.age}</span>
                    <span>
                      {img.name && (img.name.length > 15 ? img.name.substring(0, 15) + '...' : img.name)}
                    </span>
                  </div>
                </div>

                <div
                  className={`${styles.checkmark} group absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                    selected[idx]
                      ? "bg-[#009FFF] border-[#009FFF]"
                      : "border-white hover:bg-white hover:border-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected((prev: boolean[]) => {
                      const updated = [...prev];
                      updated[idx] = !updated[idx];
                      return updated;
                    });
                  }}
                >
                  {selected[idx] ? (
                    <img src="/svg/check.svg" alt="selected" className="w-3.5 h-3.5" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="transparent"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-black transition-colors duration-200"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className={`${styles.dialogPanel} relative w-full max-w-5xl mx-auto h-full flex flex-col`}>
              <div className="flex-1 relative">
                <div
                  className={`h-full transition-transform duration-300 ease-in-out ${
                    drawerOpen ? "-translate-x-20" : "translate-x-0"
                  }`}
                >
                  <Swiper 
                    modules={[Navigation]} 
                    navigation 
                    initialSlide={startIndex}
                    className="h-full"
                    onSlideChange={(swiper) => {
                      setSelectedIndex(swiper.activeIndex);
                    }}
                  >
                    {previewUrls.map((img: any, idx: number) => (
                      <SwiperSlide key={idx}>
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
                          {/* <button 
                            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                            onClick={() => {
                              setImageId(img.id);
                              setUploadModal(true);
                              setIsOpen(false);
                            }}
                          >
                            <img src="/svg/replace.svg" alt="Replace" className="w-6 h-6" />
                          </button> */}
                          <button 
                            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                            onClick={() => {
                              onDownload(img.url);
                            }}
                          >
                            <img src="/svg/download.svg" alt="Download" className="w-6 h-6" />
                          </button>
                          <button 
                            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                            onClick={() =>handleDeleteImage(img.id)}
                          >
                            <img src="/svg/delete.svg" alt="Delete" className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => setIsOpen(false)} 
                            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                          >
                            <img src="/svg/xcircle.svg" alt="Close" className="w-6 h-6" />
                          </button>
                        </div>

                        <div className={`${styles.swiperContainer} flex flex-col justify-center items-center h-full p-8`}>
                          <Image
                            src={img.url}
                            alt=""
                            width={400}
                            height={200}
                            className="object-contain max-h-[70vh]"
                          />
                          <button
                            onClick={() => {
                              setDrawerOpen(true);
                              setImageId(img.id);
                            }}
                            className={`${styles.editButton} cursor-pointer mt-6 px-4 py-2 bg-[#009FFF] hover:bg-[#0A65C7]  rounded-lg font-semibold text-white flex items-center gap-2 transition-all duration-300 shadow-lg`}
                          >
                            <img src="/svg/edit.svg" alt="Edit" className="w-5 h-5" />
                            <span className="text-xs">Edit Label</span>
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div
                className={`${styles.drawer} fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-[3000] ${
                  drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <form onSubmit={handleSave}>
                  <div className={`${styles.drawerHeader} flex justify-between items-center px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50`}>
                    <h3 className="text-lg font-semibold text-gray-900">Edit Labels</h3>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className={`${styles.drawerContent} p-4 space-y-4 overflow-y-auto h-[calc(100%-80px)]`}>
                    <div>
                     <InputField
                      input={nameInput}
                      handleChange={handleChange}
                      // value={formData[selectedIndex]?.name || ""}
                      formValues={{ name: formData[selectedIndex]?.name }}
                    />
                    </div>

                    <div>
                      <InputField
                        input={ageInput}
                        handleChange={handleChange}
                        formValues={{ age: formData[selectedIndex]?.age }}
                        // value={formData?.age}
                      />
                    </div>

                    <div>
                      <InputField
                        input={captionInput}
                        handleChange={handleChange}
                        formValues={{ caption: formData[selectedIndex]?.caption }}
                        // value={formData?.caption}
                      />
                    </div>

                    <div>
                      <InputField
                        input={dateInput}
                        handleChange={handleChange}
                        formValues={{ date: formData[selectedIndex]?.date }}
                        // value={formData?.date}
                      />
                    </div>

                    <Button
                      type="submit"
                      className={`mt-4 w-full rounded-lg ${
                        result.loading ? `bg-white border-2 border-blue-500` : `bg-blue-600 hover:bg-blue-700`
                      } px-6 py-3 text-white font-semibold transition-colors shadow-md`}
                      text={"Save"}
                      loading={result.loading}
                    />

                    <SecondaryButton
                      text={"Close"}
                      className="w-full rounded-lg bg-white border-2 border-gray-300 hover:border-gray-400 px-6 py-3 text-gray-700 font-semibold transition-colors"
                      onClick={() => setDrawerOpen(false)}
                    />

                    {result.success && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-green-700 font-medium text-sm">
                          ✓ Name updated successfully!
                        </span>
                      </div>
                    )}
                    {result.error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <span className="text-red-700 font-medium text-sm">
                          ✗ Something went wrong!
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {uploadModal && 
        <UploadModal 
          imageid={imageId}
          setUploadModal={setUploadModal}
          onUploadComplete={handleUploadComplete}
        />
      }
    </>
  );
}

export default UserUploads
