'use client';

import React, { useEffect, useState } from 'react'
import { getBook } from '../../server/book';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import AllPages from './allpages';
import SidebarWithPopup from './sidebarpanels';
import InputField from '../../common/form/input';

export type Page = {
  id: number;
  image: {
    url: string;
  };
  caption?: string | undefined;
  name?: string | undefined;
  age?: string | undefined;
  date?: string;
  tags?: string;
  pageOrder?: number;
};

const BookEditor = () => {
  const params = useParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);

  const [data, setData] = useState({} as any);

  const [pages, setPages] = useState<Page[]>([]);
  const [bookId, setBookId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      setBookId(Number(params.id));
      const res: any = await getBook(Number(params.id));
      setData(res);
      setPages(res.bookImages);
    };
    fetchBook();
  }, [params.id]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    ageGrade: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onCrop = () => {
    console.log("Crop/Rotate clicked");
  }

  const onReplaceImage = () => {
    console.log("Replace Image clicked");
  }

  const onDownload = () => {
    console.log("Download clicked");
  }

  const onRemove = () => {
    console.log("Remove clicked");
  }


  return (

    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <nav 
        className="w-full fixed top-0 left-0 z-50 bg-white shadow px-6 py-2 flex items-center justify-between"
      >
        <div>
          <span className='font-semibold text-gray-600'>&lt; My Books </span> / <span className="text-xs font-semibold text-gray-400">{data.bookTitle || "Untitled"}</span>
        </div>

        <span className=" text-sm font-semibold text-gray-600">
          Editor
        </span>

        <button
          onClick={() => router.push(`/books/${bookId}/previewbook`)}
          className=" flex px-4 py-2 bg-[#009FFF] rounded-lg hover:bg-blue-700 transition trasition-300"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <span className='text-white font-semibold text-sm ml-2'>Preview Book</span>
        </button>
      </nav>
      <div className="flex flex-1 pt-[53px] overflow-hidden">
        <SidebarWithPopup
          displaySettings={data?.displaySettings }
          bookSize={data?.bookSize}
        />
        <main
          className="flex-1 flex flex-col items-center justify-between relative bg-[#F5F9FA] overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#C5DFF7 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div
            className={`space-x-4 py-4 transition-transform duration-500 ease-in-out ${isDrawerOpen || isImageDrawerOpen ? "-translate-x-1/4" : "translate-x-0"}`}
          >
            <div className="flex space-x-4 justify-center mb-4">
              <button
                className={`px-3 py-1 border  rounded flex  cursor-pointer transform hover:scale-105 transition duration-150 shadow-md ${isDrawerOpen ? "border-blue-200 bg-blue-100" : "border-blue-100 hover:border-blue-200"}`}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <div className='mt-0.5'>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TextFieldsIcon"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></svg>
                </div>
                <span 
                  className={`font-semibold text-sm ml-1 ${isDrawerOpen ? "text-[#009FFF]" : "text-gray-700"}`}
                >
                  Text
                </span>
              </button>
              <button
                className={`px-3 py-1 border rounded flex cursor-pointer transform hover:scale-105 transition duration-150 shadow-md ${isImageDrawerOpen ? "border-blue-400 bg-blue-200" : "border-blue-100 hover:border-blue-200"}`}
                onClick={() => setIsImageDrawerOpen(!isImageDrawerOpen)}
              >
                <div 
                  className='mt-0.5'
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ImageOutlinedIcon"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z"></path>
                  </svg>
                </div>
                <span className="text-gray-700 font-semibold text-sm ml-1">Image</span>
              </button>
            </div>

            <div
              className={`shadow-xl flex-1 relative overflow-hidden transform transition-transform duration-500 ease-in-out`}
            >
              <div className="relative bg-white p-6">
                {pages[currentPage]?.image?.url ? (
                  <Image
                    src={pages[currentPage].image?.url}
                    alt="Page"
                    width={360}
                    height={270}
                    className="object-contain w-[360px] h-[270px]"
                  />
                ) : (
                  <div className="w-[360px] h-[270px] bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                <div 
                  className=" text-center text-gray-500 text-sm pt-2 pb-3 cursor-pointer"
                >
                  {pages[currentPage]?.caption || "ADD IMAGE TITLE"}
                </div>
              </div>
            </div>
            {/* <div
              className={`shadow-xl flex-1 relative overflow-hidden transform transition-transform duration-500 ease-in-out `}
            >
              <div className="relative bg-white p-6">
                {pages[currentPage]?.image?.url ? (
                  <Image
                    src={pages[currentPage].image?.url}
                    alt="Page"
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-[400px] h-[300px] bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                <div 
                  className="mt-3 border-t text-center text-gray-500 text-sm py-2 cursor-pointer"
                >
                  {pages[currentPage]?.caption || "ADD IMAGE TITLE"}
                </div>
              </div>

            </div> */}

            <div>

              {currentPage > 0 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="absolute top-1/2 transform -translate-x-23 bg-white rounded-full p-2 shadow"
                >
                  ←
                </button>
              )}
              {currentPage < pages.length - 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="absolute top-1/2 transform translate-x-115 bg-white rounded-full p-2 shadow"
                >
                  →
                </button>
              )}
            </div>

            </div>
          <div
            className={`
              absolute bottom-0 left-0 w-full bg-white z-40 
              transition-all duration-500 ease-in-out shadow-2xl
              ${isExpanded ? "h-[95%]" : "h-34"}
            `}
          >
            {/* CLICKABLE NOTCH */}
            <div
              className="
                absolute -top-6 left-1/2 -translate-x-1/2
                w-32 h-7 bg-white rounded-t-full
                flex items-center justify-center
                cursor-pointer z-10
              "
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                clipPath: "polygon(10% 0%, 90% 0%, 99% 99%,99% 99%, 0% 99%)", // bottom corners taper
              }}
            >
              <span
                className={`
                  text-gray-100 font-bold transition-transform duration-300
                  ${isExpanded ? "rotate-180" : ""}
                `}
              >
                <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="text-[#009FFF]" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.41 12.91L12 8.33L16.59 12.91L18 11.5L12 5.5L6 11.5L7.41 12.91Z"></path><path d="M7.41 17.91L12 13.33L16.59 17.91L18 16.5L12 10.5L6 16.5L7.41 17.91Z"></path></g></svg>
              </span>
              <div className="relative z-0 flex flex-col items-center justify-center py-3 border-b border-gray-200">
              <span className="text-[#009FFF] font-semibold text-sm mr-2">All Pages</span>
            </div>
            </div>

            {/* TEXT LABEL (no clicking needed here now) */}
            

            {/* Thumbnails */}
            <div className="relative z-10 w-full px-4 py-3 h-full overflow-y-auto">
              <AllPages
                isExpanded={isExpanded}
                pages={pages}
                setPages={setPages}
                bookId={bookId}
                onSelectPage={(index) => setCurrentPage(index)}
              />
            </div>
          </div>
        </main>
        <aside
          className={`fixed right-0 h-115 w-72 bg-white p-6 transform transition-transform duration-500 ease-in-out z-50
          ${isDrawerOpen ? "translate-x-0 " : "translate-x-full "}`}
        >
          <div className="flex justify-between items-center mb-4 mx-auto">
            <h2 className="text-sm font-semibold">Edit Text</h2>
            <button className='cursor-pointer' onClick={() => setIsDrawerOpen(false)}>✕</button>
          </div>

          <InputField
            input={{
              label: "Image Title",
              type: "text",
              name: "title",
            }}
            handleChange={handleChange}
            formValues={formData}
            tailwindClass=''
          />

          <InputField
            input={{
              label: "Name",
              type: "text",
              name: "name",
            }}
            handleChange={handleChange}
            formValues={formData}
          />

          <InputField
            input={{
              label: "Age/Grade",
              type: "text",
              name: "ageGrade",
            }}
            handleChange={handleChange}
            formValues={formData}
          />

          <InputField
            input={{
              label: "Date",
              type: "date",
              name: "date",
            }}
            handleChange={handleChange}
            formValues={formData}
          />
        </aside>
        <aside
          className={`fixed right-0 h-115  p-6 w-72 bg-white transform transition-transform duration-500 ease-in-out z-50
          ${isImageDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-6 pb-3">
            <h2 className="text-center text-sm font-semibold text-gray-800">Edit Image</h2>
            <button
              onClick={() => setIsImageDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col justify-between h-[calc(100%-60px)]">
            <div className="space-y-4">

            <button
              className="text-sm w-full px-4 py-2 bg-[#F5F9FA] border border-gray-100 text-gray-800 font-medium rounded-lg hover:bg-blue-100 transform transition-transform  duration-500 ease-in-out cursor-pointer"
              onClick={onReplaceImage}
            >
              Replace Image
            </button>

            <button
              className="text-sm w-full border border-gray-100 px-4 py-2 bg-[#F5F9FA] font-medium rounded-lg transition cursor-pointer hover:bg-blue-100"
              onClick={onCrop}
            >
              Crop / Rotate
            </button>

            <button
              className="text-sm w-full border border-gray-100 px-4 py-2 bg-[#F5F9FA] font-medium rounded-lg transition cursor-pointer hover:bg-blue-100"
              onClick={onDownload}
            >
              Download
            </button>
            </div>
            <button
              className="text-sm text-red-500 font-medium cursor-pointer"
              onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default BookEditor
