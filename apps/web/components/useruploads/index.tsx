import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ageInput, captionInput, dateInput, nameInput, PreviewItem } from "../../utils";
import Image from "next/image";
import InputField from "../../common/form/input";
import Button from "../../common/buttons/filledbuttons";
import { updateImageFormData } from "../../server/images";
import { ImageUpdateInput } from "@repo/types";
import SecondaryButton from "../../common/buttons/secondarybutton";
import { useSelectedImages } from "../../context";
import styles from "./useruploads.module.scss";

const UserUploads = ({ 
    previewUrls, 
}: { 
    previewUrls: PreviewItem[], 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [result, setResult] = useState({
    success: false,
    loading: false,
    error: false
  });
  const [formData, setFormData] = useState({ 
    name: "",
    caption: "",
    date: "",
    age: "",
  });

  const {selected, setSelected} = useSelectedImages();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult((prev) => ({
      ...prev, 
      loading: true
    }));
    const req: ImageUpdateInput = {
      id: imageId as string,
      // url: formData.url,
      // filename: formData.filename,
      displayOptions :{
        name: formData.name,
        age: formData.age,
        caption: formData.caption,
        date: new Date(formData.date as string),
      }
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
    }
  };

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
              {/* Rounded image wrapper */}
              <div className="relative rounded-md">
                <Image
                  src={img.url}
                  alt=""
                  className="!rounded-md w-40 h-32 object-cover cursor-pointer"
                  width={160}
                  height={128}
                />

                {/* Fixed height for text area */}
                <div className="">
                  <p className="text-sm font-semibold leading-tight">
                    {img.caption || <span className="invisible">placeholder</span>}
                  </p>
                  <div className="flex gap-2 text-xs text-[#B1B1B1] mt-0.5 metadata">
                    <span>{img.age || <span className="invisible">.</span>}</span>
                    <span>{img.name || <span className="invisible">.</span>}</span>
                  </div>
                </div>

                {/* Checkmark Overlay */}
                <div
                  className={`${styles.checkmark} group absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                    selected[idx]
                      ? "bg-blue-500 border-blue-500"
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
                    <img src="svg/check.svg" alt="selected" className="w-3.5 h-3.5" />
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
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Content */}
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className={`${styles.dialogPanel} relative w-full max-w-5xl mx-auto`}>
              {/* Toolbar */}
              <div
                className={`${styles.toolbar} absolute top-4 left-50 z-20 flex space-x-4 text-white`}
                style={{
                  top: "calc(-10% + 20px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <button className="hover:text-indigo-400">
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
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                </button>
                <button className="hover:text-indigo-400">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button className="hover:text-indigo-400">
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
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-indigo-400">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
              </div>

              <div
                className={`transition-transform duration-300 ease-in-out ${
                  drawerOpen ? "-translate-x-20" : "translate-x-0"
                }`}
              >
                <Swiper modules={[Navigation]} navigation initialSlide={startIndex}>
                  {previewUrls.map((img: any, idx: number) => (
                    <SwiperSlide key={idx}>
                      <div className={`${styles.swiperContainer} flex flex-col justify-center items-center p-8`}>
                        <Image
                          src={img.url}
                          alt=""
                          width={600}
                          height={400}
                          className="object-contain"
                        />
                        <button
                          onClick={() => {
                            setDrawerOpen(true);
                            setImageId(img.id);
                          }}
                          className={`${styles.editButton} mt-6 px-4 py-2 font-bold text-blue-600 flex gap-2`}
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
              </div>

              <div
                className={`${styles.drawer} fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[3000] ${
                  drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <form onSubmit={handleSave}>
                  <div className={`${styles.drawerHeader} flex justify-between items-center px-4 py-3 border-b`}>
                    <h3 className="text-lg font-semibold">Edit Labels</h3>
                  </div>

                  <div className={`${styles.drawerContent} p-4 space-y-4`}>
                    <div>
                      <InputField
                        input={nameInput}
                        handleChange={handleChange}
                        formValues={{ name: formData?.name }}
                        value={formData?.name}
                      />
                    </div>

                    <div>
                      <InputField
                        input={ageInput}
                        handleChange={handleChange}
                        formValues={{ age: formData?.age }}
                        value={formData?.age}
                      />
                    </div>

                    <div>
                      <InputField
                        input={captionInput}
                        handleChange={handleChange}
                        formValues={{ caption: formData?.caption }}
                        value={formData?.caption}
                      />
                    </div>

                    <div>
                      <InputField
                        input={dateInput}
                        handleChange={handleChange}
                        formValues={{ date: formData?.date }}
                        value={formData?.date}
                      />
                    </div>

                    <Button
                      type="submit"
                      className={`mt-2 w-full rounded-md ${
                        result.loading ? `bg-white border border-blue-500` : `bg-blue-500`
                      } px-14 py-2 text-white`}
                      text={"Save"}
                      loading={result.loading}
                    />

                    <SecondaryButton
                      text={"Close"}
                      className="mt-2 w-full rounded-md bg-white-500 px-14 py-2 text-blue-600"
                      onClick={() => setDrawerOpen(false)}
                    />

                    {result.success && (
                      <span className="text-green-600 font-bold text-sm mt-2">
                        Name updated successfully!
                      </span>
                    )}
                    {result.error && (
                      <span className="text-red-600 font-bold text-sm mt-2">
                        Something went wrong!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default UserUploads
