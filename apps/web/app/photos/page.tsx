'use client'


import React, { useEffect, useRef, useState } from 'react'
import WithSidebar from '../../components/sidebar';
import { addImage, getMyImages } from '../../server/images';
import { supabase } from '../../lib/supabaseClient';
import { getCurrentUser } from '../../server/user';
import UserUploads from '../../components/useruploads';
import { useRouter } from 'next/dist/client/components/navigation';
import { useSelectedImages } from '../../context';
import { PreviewItem } from '../../utils';


const PhotosPage = () => {
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<PreviewItem[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [selected, setSelected] = useState<boolean[]>([]);
    
    const { setSelectedImages } = useSelectedImages();
    const router = useRouter();

    useEffect(() =>{
      const fetchUser = async () => {
        const user = await getCurrentUser();
        setUserId(user?.sub ?? null);
      };
      fetchUser();
    }, [userId])

    useEffect(() => {
      const fetchImages = async () => {
        const images = await getMyImages();
        // Each image has `id` and `url`
        setPreviewUrls(
          images.map((img: any) => ({
            id: img.id,
            url: img.url,
            name: img.name,
            caption: img.caption,
            age: img.age
          }))
        );
      };

      if (userId) fetchImages();
    }, [userId]);

console.log(previewUrls)
    // Upload files to Supabase Storage
    const uploadFilesToSupabase = async (files: File[]) => {
      if (!userId) {
        return;
      }
      setDragActive(true);
      for (const file of files) {
        const filePath = `user-uploads/${userId}/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from('photos')
          .upload(filePath, file, { upsert: false });
        if (!error) {
          const { data } = supabase.storage.from('photos').getPublicUrl(filePath);
          await addImage(data.publicUrl, file.name, userId); // save metadata in backend
          setSelectedFiles(prev => [...prev, file]); // <-- add file to state
        }else{
          alert(`Failed to upload ${file.name}: ${error.message}`)
        }
      }
      setDragActive(false);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length > 0) {
        uploadFilesToSupabase(files);
      }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
      if (files.length > 0) {
        uploadFilesToSupabase(files);
      }
    };

    useEffect(() => {
      setSelected(new Array(previewUrls.length).fill(false));
    }, [previewUrls]);

    const handleButtonClick = () => {
      const images = previewUrls.filter((_, idx) => Boolean(selected[idx]));
      setSelectedImages(images);
      router.push("/books/create");
    };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Upload Your Photos</h1>
          <div
            onClick={() => handleButtonClick()}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Create Book
          </div>
      </div>
      <div className="mb-6">
          <div
            className={`w-24 h-24 border-2 border-dashed flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors relative ${dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-indigo-300 bg-white'}`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {dragActive && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-lg">
                  <svg className="animate-spin h-6 w-6 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-indigo-600 text-xs font-semibold">Uploading...</span>
              </div>
            )}
            <span className="text-indigo-600 text-3xl mb-1">+</span>
            <span className="text-xs text-gray-500 text-center">Click or Drag & Drop</span>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
      </div>
      <UserUploads 
        previewUrls={previewUrls}
        selected={selected}
        setSelected={setSelected}
      />     
    </div>
  )
}

export default WithSidebar(PhotosPage)
