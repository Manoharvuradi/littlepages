'use client';

import React, { useEffect, useState } from 'react'
import { getBook } from '../../server/book';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import AllPages from './allpages';
import { getAllBookImages } from '../../server/images';

export type Page = {
  id: number;
  url: string;
  displayOptions?: {
    caption?: string | undefined;
    name?: string | undefined;
    age?: string | undefined;
    date?: string;
    tags?: string;
  }
};

const PreviewPage = () => {
  const params = useParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const [pages, setPages] = useState<Page[]>([]);
    const [bookId, setBookId] = useState<number | null>(null);

    useEffect(() => {
    const fetchBook = async () => {
      setBookId(Number(params.id));
      const data = await getBook(Number(params.id));

      const imageIds = data.bookImages.map((bi: any) => bi.imageId);

      const previewBookImages = await getAllBookImages(imageIds);
      setPages(previewBookImages);
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

    const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };


  return (
       <div className="flex h-screen bg-gray-50 pt-18">
      {/* Sidebar navigation (Book Size, Book Text Display, etc.) */}
      <aside className="w-48 bg-white border-r p-4 space-y-4">
        <button className="text-sm text-gray-700 font-semibold">Book Size</button>
        <button className="text-sm text-gray-700">Book Text Display</button>
      </aside>

      {/* Main content area */}
<main
        className="flex-1 flex flex-col items-center justify-between bg-white"
        style={{
          backgroundImage: "radial-gradient(#87CEEB 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Toolbar */}
        <div className="flex justify-center items-center space-x-4 py-4">
          <button className="px-3 py-1 border rounded" onClick={()=>{setIsDrawerOpen(!isDrawerOpen)}}>Text</button>
          <button className="px-3 py-1 border rounded">Image</button>
        </div>

        {/* Page Canvas */}
        <div className="flex-1 relative">
          <div className="relative bg-white shadow-lg p-6">
            {pages[currentPage]?.url ? (
              <Image
                src={pages[currentPage].url}
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

            <div className="mt-3 border-t text-center text-gray-500 text-sm py-2 cursor-pointer">
              {pages[currentPage]?.displayOptions?.caption || "ADD IMAGE TITLE"}
            </div>
          </div>

          {/* Arrows */}
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
            >
              ←
            </button>
          )}
          {currentPage < pages.length - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
            >
              →
            </button>
          )}
        </div>

        {/* Bottom Thumbnails / All Pages */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-white rounded-t-2xl z-40 transition-all duration-500 ease-in-out overflow-hidden shadow-xl
          ${isExpanded ? "h-[88%]" : "h-44"}`}
        >
          {/* Expand/Collapse Handle */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer py-3 border-b border-gray-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-gray-600 font-bold transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                ↑
              </span>
              <span className="text-gray-700 font-semibold text-sm">All Pages</span>
            </div>
          </div>

          {/* Thumbnails area (child receives pages + setter) */}
          <div className="w-full px-4 py-3">
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

      {/* Right drawer */}
      {isDrawerOpen && (
        <aside className="w-64 bg-white border-l p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Edit Text</h2>
            <button onClick={() => setIsDrawerOpen(false)}>✕</button>
          </div>

          <label className="block text-sm mb-2">Image Title</label>
          <input
            className="w-full border rounded p-2 mb-4"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <label className="block text-sm mb-2">Name</label>
          <input
            className="w-full border rounded p-2 mb-4"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <label className="block text-sm mb-2">Age/Grade</label>
          <input
            className="w-full border rounded p-2 mb-4"
            value={formData.ageGrade}
            onChange={(e) => handleChange("ageGrade", e.target.value)}
          />

          <label className="block text-sm mb-2">Date</label>
          <input
            type="date"
            className="w-full border rounded p-2 mb-4"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </aside>
      )}
    </div>
  )
}

export default PreviewPage
