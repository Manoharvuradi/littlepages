'use client';

import React, { use, useEffect, useRef, useState } from 'react'
import { getBook, replaceCoverImage, updateBookTitle } from '../../server/book';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import AllPages from './allpages';
import SidebarWithPopup from './sidebarpanels';
import InputField from '../../common/form/input';
import { deleteBookImage, updateBookImage, updateBookImageDescription } from '../../server/bookimage';
import Modal from '../model';
import RotatingImage from './cropandrotate';
import { supabase } from '../../lib/supabaseClient';
import { getCurrentUser } from '../../server/user';
import { showCoverPhoto } from '../../server/images';
import BookTitle from '../booktitle';

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

  const [isDrawer, setIsDrawer] = useState({
    isTextDrawer: false,
    isImageDrawer: false,
    isCropRotate: false,
    isReplaceImage: false,
  });
  const [bookImageId, setBookImageId] = useState<number | null>(null);
  const [data, setData] = useState({} as any);
  const [pages, setPages] = useState<Page[]>([]);
  const [bookId, setBookId] = useState<number | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>();
  const [coverPage, setCoverPage] = useState<boolean>(false); 
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setBookId(Number(params.id));
      const user = await getCurrentUser();
      setUserId(user?.sub ?? null);
      const res: any = await getBook(Number(params.id), user?.sub);
      setCoverPhotoId(res.coverPhotoUrl);
      const url = await showCoverPhoto(res.coverPhotoUrl);
      setCoverPhoto(url?.url)
      setData(res);
      setPages(res.bookImages);
    };
    fetchBook();
  }, [params.id]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    ageGrade: "",
    date: "",
    bookTitle: "",
  });


  useEffect(() => {
    if (pages.length > 0 && pages[currentPage]) {
      setFormData({
        title: pages[currentPage]?.caption || "",
        name: pages[currentPage]?.name || "",
        ageGrade: pages[currentPage]?.age || "",
        date: pages[currentPage]?.date || "",
        bookTitle: data?.bookTitle || "",
      });
    }
  }, [pages, currentPage]);

  const refetch = async (): Promise<Page[]> => {
    if (!bookId) return [];
    const user = await getCurrentUser();
    const res: any = await getBook(bookId, user?.sub);
    setData(res);
    setPages(res.bookImages);
    return res.bookImages; // ✅ return data for caller
  };

  const handleChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === bookImageId ? { ...page, [name]: value } : page
      )
    );

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        await updateBookImageDescription(bookImageId!, { [name]: value });
        refetch();
      } catch (err) {
        console.error(err);
      }
      }, 500);
  };

  const handleBookTitleChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        await updateBookTitle(data.id!, value );
        refetch();
      } catch (err) {
        console.error(err);
      }
      }, 500);
  }


  const onCrop = () => {
    console.log("Crop/Rotate clicked");
  }

  const onReplaceImage = async (file: File) => {
    if (!userId) return;

  const safeFileName = file.name.replace(/[^\w.-]+/g, "_").toLowerCase();
  const filePath = `user-uploads/${userId}/${Date.now()}-${safeFileName}`;

  // 1. Upload new image
  const { error } = await supabase.storage
    .from("photos")
    .upload(filePath, file, { upsert: false });

  if (error) {
    alert("Failed to upload replacement image");
    return;
  }

  // 2. Get public URL
  const { data } = supabase.storage.from("photos").getPublicUrl(filePath);

  // 3. Update DB record
  await replaceCoverImage(coverPhotoId!, data.publicUrl);

  // 4. Refresh UI
  await refetch();
};

  const onDownload = async () => {
    try {
      const imageUrl = pages[currentPage]?.image?.url;
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
      let filename = urlParts[urlParts.length - 1] || "download.jpg";
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

  const onRemove = async () => {
    const req = {
      bookImageId: bookImageId,
    }
    const res = await deleteBookImage(req.bookImageId!);
    if (res.error) {
      console.error("❌ Error deleting image:", res.error);
      return;
    }
    await refetch();
  }

  const onSave = async (editedImageBlobUrl: string) => {

    if (!bookImageId || !bookId) {
      console.warn("⚠️ Missing book ID or image ID — cannot save");
      return;
    }

    try {
      // Step 1: Fetch blob from blob URL
      const response = await fetch(editedImageBlobUrl);
      const blob = await response.blob();

      // Step 2: Convert blob to File
      const file = new File([blob], `edited-${Date.now()}.jpg`, { type: blob.type });

      // Step 3: Get user ID
      const userId = await getCurrentUser();
      if (!userId) throw new Error("User not logged in");

      // Step 4: Prepare file path
      const safeFileName = file.name.replace(/[^\w.-]+/g, "_").toLowerCase();
      const filePath = `user-uploads/${userId.sub}/${Date.now()}-${safeFileName}`;

      // Step 5: Upload to Supabase
      const { error } = await supabase.storage.from("photos").upload(filePath, file, { upsert: false });
      if (error) throw error;

      // Step 6: Get public URL
      const { data } = supabase.storage.from("photos").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      // Step 7: Update DB with the new URL
      const res = await updateBookImage(bookImageId, { fileUrl: publicUrl });
      if (!res || res.error) throw new Error("Failed to update book image");


      // Step 8: Refetch updated data
      await refetch();

    } catch (error) {
      console.error(" Error saving edited image:", error);
    } finally {
      // Step 9: Close editor modal
      setIsDrawer((prev) => ({ ...prev, isCropRotate: false }));
    }
  };

  return (

<div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
  <nav 
    className="w-full fixed top-0 left-0 z-50 bg-white shadow px-6 py-2 flex items-center justify-between"
  >
    <div>
      <span className='font-semibold text-gray-600'>&lt; My Books </span> / <span className="text-xs font-semibold text-gray-400">{data.bookTitle || "Untitled"}</span>
    </div>

    <span className="hidden lg:block text-sm font-semibold text-gray-600">
      Editor
    </span>

    <button
      onClick={() => router.push(`/books/${bookId}/previewbook`)}
      className="flex px-4 py-2 bg-[#009FFF] rounded-lg hover:bg-blue-700 transition trasition-300"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      <span className='text-white font-semibold text-sm ml-2'>Preview Book</span>
    </button>
  </nav>
  
  <div className="flex flex-1 pt-[53px] overflow-hidden">
    <div className='hidden lg:block'>
      <SidebarWithPopup
        displaySettings={data?.displaySettings}
        bookSize={data?.bookSize}
      />
    </div>
    
    <Modal
      isOpen={isDrawer.isCropRotate && !!bookImageId}
      onClose={() =>
        setIsDrawer({ ...isDrawer, isCropRotate: false })
      }
    >
      <RotatingImage
        imageUrl={pages[currentPage]?.image?.url || ''}
        onClose={() =>
          setIsDrawer({ ...isDrawer, isCropRotate: false })
        }
        onSave={(editedImageUrl) => onSave(editedImageUrl)}
      />
    </Modal>
    
    <main
      className="flex-1 relative bg-[#F5F9FA] overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(#C5DFF7 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className={`py-4 flex flex-col items-center transition-all duration-500 ease-in-out ${
          isDrawer.isTextDrawer || isDrawer.isImageDrawer ? "lg:-translate-x-1/12" : "translate-x-0"
        } ${isExpanded ? 'blur-sm' : ''}`}
      >
        <div className="flex space-x-4 justify-center mb-4">
          <button
            className={`px-3 py-1 border rounded flex cursor-pointer transform hover:scale-105 transition duration-150 shadow-md ${isDrawer.isTextDrawer ? "border-blue-400 bg-blue-100" : "border-blue-100 hover:border-blue-200"}`}
            onClick={() => {
              setIsDrawer({...isDrawer,isImageDrawer: false, isTextDrawer: !isDrawer.isTextDrawer})
              setBookImageId(
                coverPage
                  ? data?.coverPhotoUrl ?? null
                  : pages[currentPage]?.id ?? null
              );
            }}
          >
            <div className='mt-0.5'>
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TextFieldsIcon" fill={isDrawer.isTextDrawer ? `#009FFF` : ``}><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></svg>
            </div>
            <span 
              className={`font-semibold text-sm ml-1 ${isDrawer.isTextDrawer ? "text-[#009FFF]" : "text-gray-700"}`}
            >
              Text
            </span>
          </button>
          <button
            className={`px-3 py-1 border rounded flex cursor-pointer transform hover:scale-105 transition duration-150 shadow-md ${isDrawer.isImageDrawer ? "border-blue-400 bg-blue-100" : "border-blue-100 hover:border-blue-200"}`}
            onClick={() => {
              setIsDrawer({...isDrawer, isImageDrawer: !isDrawer.isImageDrawer, isTextDrawer: false})
              setBookImageId(
                coverPage
                  ? data?.coverPhotoUrl ?? null
                  : pages[currentPage]?.id ?? null
              );
            }}
          >
            <div className='mt-0.5'>
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ImageOutlinedIcon" fill={isDrawer.isImageDrawer ? `#009FFF` : ``}><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z"></path>
              </svg>
            </div>
            <span className={`font-semibold text-sm ml-1 ${isDrawer.isImageDrawer ? "text-[#009FFF]" : "text-gray-700"}`}>Image</span>
          </button>
        </div>

        <div 
          className="shadow-xl relative overflow-hidden transform transition-transform duration-500 ease-in-out"
          // onClick={() => onReplaceImage()}
          >
          <div className={`relative bg-white ${coverPage ? 'p-0' : 'p-4'}`}>
            <div
              className={`text-center text-gray-500 text-sm cursor-pointer transition-all duration-200 ease-in-out border ${
                isDrawer.isImageDrawer ? "border-[#009FFF]" : "border-transparent hover:border-[#009FFF]"
              }`}
              onClick={() => {
                setIsDrawer({
                  ...isDrawer,
                  isTextDrawer: false,
                  isImageDrawer: !isDrawer.isImageDrawer,
                });
                setBookImageId(
                  coverPage
                    ? data?.coverPhotoUrl ?? null
                    : pages[currentPage]?.id ?? null
                );
              }}
            >
              {coverPage ? (
                <Image
                  src={coverPhoto || ""}
                  alt="cover photo"
                  width={360}
                  height={270}
                  className="object-contain max-w-full max-h-full"
                />
              ) : pages[currentPage]?.image?.url ? (
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
            </div>

            <div
              className={`${coverPage ? 'absolute bottom-10 left-0 right-0 py-1' : 'p-1'}  text-center bg-white cursor-pointer border ${
            isDrawer.isTextDrawer
              ? "border-[#009FFF]"
              : "border-transparent hover:border-[#009FFF]"
          }`}
              onClick={() =>{
                setIsDrawer({
                  ...isDrawer,
                  isImageDrawer: false,
                  isTextDrawer: !isDrawer.isTextDrawer,
                })
                setBookImageId(
                  coverPage
                    ? data?.coverPhotoUrl ?? null
                    : pages[currentPage]?.id ?? null
                );
              }}
            >
              {coverPage ? (<>
                <span className="text-[12px] font-semibold">
                  {data.bookTitle || "ADD COVER TITLE"}
                </span>
              </>) :(<div className="flex flex-col items-center justify-center leading-none space-y-0.5">
                <span className="text-[10px]">
                  {pages[currentPage]?.caption || "ADD IMAGE TITLE"}
                </span>
                <div className="flex items-center justify-center gap-[2px] leading-none">
                  <span className="text-[10px]">
                    {pages[currentPage]?.name || "ADD NAME"}
                  </span>
                  <span className="text-[10px]">
                    {pages[currentPage]?.age || "ADD AGE"}
                  </span>
                </div>
              </div>)}
            </div>
          </div>
        </div>
        
        <div className='hidden lg:block'>
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className='absolute bg-white p-2 rounded-full left-70 top-1/2 shadow-md'
            >
              ←
            </button>
          )}
          {currentPage < pages.length - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="absolute bg-white p-2 rounded-full right-70 top-1/2 shadow-md"
            >
              →
            </button>
          )}
        </div>
      </div>
      
      <div
        className={`${isDrawer.isTextDrawer || isDrawer.isImageDrawer || isDrawer.isCropRotate
  ? "opacity-0 -translate-y-3 pointer-events-none duration-500 ease-in-out"
  : "opacity-100 translate-y-0 pointer-events-auto duration-500 ease-in-out"}
          absolute bottom-0 left-0 w-full bg-white z-50 
          transition-all duration-500 ease-in-out shadow-2xl
          ${isExpanded ? "h-[95%]" : "h-34"}
        `}
      >
        <div
          className="hidden lg:flex absolute -top-6 left-1/2 -translate-x-1/2
            w-32 h-7 bg-white rounded-t-full
            items-center justify-center
            cursor-pointer z-10
          "
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 99% 99%,99% 99%, 0% 99%)",
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

        <div className="relative z-10 w-full px-4 py-3 h-full overflow-y-auto">
          <AllPages
            isExpanded={isExpanded}
            pages={pages}
            setPages={setPages}
            bookId={bookId}
            onSelectPage={(index) => setCurrentPage(index)}
            setBookImageId={setBookImageId}
            refetch={refetch}
            coverPhotoUrl={coverPhoto ?? ""}
            setCoverPage={setCoverPage}
          />
        </div>
      </div>
    </main>
    
    <aside
      className={`fixed right-0 top-[53px] h-[calc(100vh-53px)] w-full lg:w-72 bg-white p-6 transform transition-transform duration-500 ease-in-out z-40
      ${isDrawer.isTextDrawer ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center mb-4 mx-auto">
        <h2 className="text-sm font-semibold">Edit Text</h2>
        <button className='cursor-pointer' onClick={() => setIsDrawer({...isDrawer, isTextDrawer: false})}>✕</button>
      </div>

        { coverPage != true ?(
          <div>
          <InputField
            input={{
              label: "Image Title",
              type: "text",
              name: "caption",
              liveCountMax: 50,
              value: formData.title || '',
            }}
            handleChange={handleChange}
            formValues={formData}
            tailwindClass=''
            liveCount={true}
          />

          <InputField
            input={{
              label: "Name",
              type: "text",
              name: "name",
              liveCountMax: 25,
              value: formData.name || '',
            }}
            handleChange={handleChange}
            formValues={formData}
            liveCount={true}
          />

          <InputField
            input={{
              label: "Age/Grade",
              type: "text",
              name: "age",
              liveCountMax: 25,
              value: formData.ageGrade || '',
            }}
            handleChange={handleChange}
            formValues={formData}
            liveCount={true}
          />

          <InputField
            input={{
              label: "Date",
              type: "date",
              name: "date",
              value: formData.date || '',
            }}
            handleChange={handleChange}
            formValues={formData}
          />
        </div>):(
          <div>
            <InputField
              input={{
                label: "Book Title",
                type: "text",
                name: "bookTitle",
                liveCountMax: 15,
                value: data.bookTitle || '',
              }}
              handleChange={handleBookTitleChange}
              formValues={formData}
              tailwindClass=''
              liveCount={true}
            />
          </div>
        )}
      
    </aside>
    
    <aside
      className={`fixed right-0 top-[53px] h-[calc(100vh-53px)] p-6 w-full lg:w-72 bg-white transform transition-transform duration-500 ease-in-out z-40
      ${isDrawer.isImageDrawer ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center mb-6 pb-3">
        <h2 className="text-center text-sm font-semibold text-gray-800">Edit Image</h2>
        <button
          onClick={() => setIsDrawer({...isDrawer, isImageDrawer: false})}
          className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-60px)]">
        <div className="space-y-4">
          <button
            className="text-sm w-full px-4 py-2 bg-[#F5F9FA] border border-gray-100 text-gray-800 font-medium rounded-lg hover:bg-blue-100 transform transition-transform duration-500 ease-in-out cursor-pointer"
            onClick={()=>{
              setIsDrawer({...isDrawer, isReplaceImage: true})
            }}
          >
            <div className="flex items-center justify-center">
              <svg className="h-6 w-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CachedIcon"><path d="m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></svg>
              <span className='ml-2'>Replace Image</span>
            </div>
          </button>

          <button
            className="text-sm w-full border border-gray-100 px-4 py-2 bg-[#F5F9FA] font-medium rounded-lg transition cursor-pointer hover:bg-blue-100"
            onClick={() => setIsDrawer({...isDrawer, isImageDrawer:false ,isCropRotate: true})}
          >
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CropRotateIcon"><path d="M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0c.51 6.16 5.66 11 11.95 11 .23 0 .44-.02.66-.03L8.8 20.15l-1.33 1.34zM12.05 0c-.23 0-.44.02-.66.04l3.81 3.81 1.33-1.33C19.8 4.07 22.14 7.24 22.5 11H24c-.51-6.16-5.66-11-11.95-11zM16 14h2V8c0-1.11-.9-2-2-2h-6v2h6v6zm-8 2V4H6v2H4v2h2v8c0 1.1.89 2 2 2h8v2h2v-2h2v-2H8z"></path></svg>
              <span className='ml-2'>Crop / Rotate</span>
            </div>
          </button>

          <button
            className="text-sm w-full border border-gray-100 px-4 py-2 bg-[#F5F9FA] font-medium rounded-lg transition cursor-pointer hover:bg-blue-100"
            onClick={onDownload}
          >
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DownloadIcon"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
              <span className='ml-2'>Download</span>
            </div>
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
