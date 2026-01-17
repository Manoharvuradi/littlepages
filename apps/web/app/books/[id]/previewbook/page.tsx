'use client'

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getBook } from '../../../../server/book';
import { getCurrentUser } from '../../../../server/user';
import { showCoverPhoto } from '../../../../server/images';

interface BookImage {
  id: number;
  url: string;
  name: string;
  caption: string;
  age: string | null;
}

interface Book {
  id: number;
  caption: string | null;
  name: string | null;
  age: string | null;
  image: {
    url: string;
  };
}

interface BookData {
  bookTitle?: string;
  coverPhotoUrl: string;
  bookImages?: Book[];
}

const PreviewBook = () => {
  const params = useParams();
  const [bookId, setBookId] = useState<number | null>(null);
  const [pages, setPages] = useState<BookImage[]>([]);
  const [coverOpen, setCoverOpen] = useState(false);
  const [pagesFlipped, setPagesFlipped] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [coverPhoto, setCoverPhoto] = useState<string | null>();
  const [bookTitle, setBookTitle] = useState<string>("");
  const [textAlign] = useState<string>("center");
  const [bookLength, setBookLength] = useState<number>(0);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        setBookId(Number(params.id));
        const user = await getCurrentUser();
        const data: BookData = await getBook(Number(params.id), user?.sub);

        // Fetch cover photo URL
        const url = await showCoverPhoto(data.coverPhotoUrl);
        setCoverPhoto(url?.url);
        
        // Set book title
        setBookTitle(data?.bookTitle || "");
        setBookLength(data?.bookImages ? data.bookImages.length : 0);
        
        const transformed = data?.bookImages?.map((item: Book) => ({
          id: item.id,
          url: item.image?.url || "",
          name: item.name || "",
          caption: item.caption || "",
          age: item.age || null
        })) || [];
        
        // Add final pages based on array length
        const finalPages = [...transformed];
        
        if (finalPages.length % 2 === 0) {
          // Even length - add both images
          finalPages.push({
            id: finalPages.length + 1,
            url: "/images/finalpage.png",
            name: "",
            caption: "",
            age: null
          });
          finalPages.push({
            id: finalPages.length + 2,
            url: "/images/endcover.png",
            name: "",
            caption: "",
            age: null
          });
        } else {
          // Odd length - add only endcover
          finalPages.push({
            id: finalPages.length + 1,
            url: "/images/endcover.png",
            name: "",
            caption: "",
            age: null
          });
        }
        
        setPages(finalPages);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  const togglePage = (pageIndex: number) => {
    setPagesFlipped(prev => ({ ...prev, [pageIndex]: !prev[pageIndex] }));
  };


let bookSize: string = "rectangle";

const bookDimensions =
  bookSize === "square"
    ? {
        mobile: { width: 300, height: 150 },
        tablet: { width: 450, height: 225 },
        desktop: { width: 700, height: 350 },
      }
    : {
        mobile: { width: 390, height: 150 },
        tablet: { width: 800, height: 300 },
        desktop: { width: 900, height: 350 },
      };

  // Calculate total number of pages dynamically
  const totalPages = pages.length > 0 ? Math.floor(pages.length / 2) : 0;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading book...</p>
      </div>
    );
  }

  // Show error state if no cover photo
  if (!coverPhoto) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">No cover photo available for this book.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .book {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: box-shadow 0.6s ease-in-out;
        }

        @media (max-width: 640px) {
          .book {
            width: ${bookDimensions.mobile.width}px;
            height: ${bookDimensions.mobile.height}px;
          }

          .text-container {
            gap: 2px;
            padding-top: 4px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .book {
            width: ${bookDimensions.tablet.width}px;
            height: ${bookDimensions.tablet.height}px;
          }
        }
        @media (min-width: 1025px) {
          .book {
            width: ${bookDimensions.desktop.width}px;
            height: ${bookDimensions.desktop.height}px;
          }
        }

        .pages, .pages > div {
          position: absolute;
          transform-style: preserve-3d;
        }

        .pages > div {
          transform-origin: left center;
          transition: transform 1s ease;
          box-shadow: inset 0 -1px 2px rgba(50, 50, 50, 0.1),
                      inset -1px 0 1px rgba(150, 150, 150, 0.2);
          border-radius: 0 5px 5px 0;
        }

        .front, .back {
          padding: 1rem;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background: white;
          display: flex;
          flex-direction: column;
        }
        
        .image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .text-container {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 4px;
          padding-top: 8px;
        }

        .back {
          transform: rotateY(180deg);
        }

        .page::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
          background: rgba(150,150,150,0.4);
          box-shadow: 0 0 4px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .last-page {
          box-shadow: inset 0 -1px 2px rgba(50, 50, 50, 0.1),
                      inset -1px 0 1px rgba(150, 150, 150, 0.2),
                      2px 0 5px rgba(0, 0, 0, 0.2) !important;
        }

        .cover-front {
          padding: 0 !important;
        }

        .cover-back {
          padding: 0 !important;
        }
      `}</style>

  <nav 
    className="w-full fixed top-0 left-0 z-50 bg-white shadow px-6 py-2 flex items-center justify-between"
  >
    <div>
      <span className='font-semibold text-gray-600'>&lt; My Books </span> / <span className="text-xs font-semibold text-gray-400">{bookTitle || "Untitled"}</span>
    </div>

    <span className="hidden lg:block text-sm font-semibold text-gray-600">
      Preview
    </span>

    <div className="flex items-center gap-4">
  {/* Back to Editor */}
  <button
    onClick={() => router.push(`/books/${bookId}/previewbook`)}
    className="
      flex items-center
      text-[#009FFF] text-sm font-semibold
      px-3 py-2
      rounded-md
      transition-all duration-500 ease-in-out
      hover:text-[#0A65C7]
      active:scale-95
    "
  >
    Back to Editor
  </button>

  {/* Preview Book */}
  <button
    onClick={() => router.push(`/books/${bookId}/bookeditor`)}
    className="
      flex items-center gap-2
      px-4 py-2
      bg-[#009FFF]
      text-white text-sm font-semibold
      rounded-lg
      shadow-md
      transition-all duration-500 ease-in-out
      hover:bg-[#0A65C7] hover:shadow-lg
      active:scale-95
    "
  >
    Approve
  </button>
</div>
  </nav>
      <div
        className={`w-full h-full min-h-screen bg-[#F5F9FA] overflow-hidden`}
      >
        <div className="mt-20 mb-6 ">
          <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-center">
            {bookTitle || "Untitled Book"}
          </h1>
          <div className='text-center mt-2'>
            <span className="text-sm text-gray-500 font-medium">
              {bookLength} pages
            </span>
          </div>
        </div>
        <div className={` transition-transform duration-700 ease-in-out ${
          coverOpen ? "translate-x-40" : "-translate-x-10"
        }`}>
          {(() => {
            const flippedPagesCount = Object.values(pagesFlipped).filter(Boolean).length;
            const isBookOpen = coverOpen && flippedPagesCount < totalPages;

            return (
              <div
                className="book relative"
                style={{
                  boxShadow: isBookOpen ? "0 10px 25px rgba(0,0,0,0.25)" : "none",
                }}
              >
                <div className="pages w-[50%] h-[98%] absolute top-[1%] right-0 z-20">
                  {/* Cover */}
                  <div
                    className="cover w-full h-full cursor-pointer z-50"
                    style={{
                      transform: coverOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
                      zIndex: coverOpen ? 1 : 100,
                      transition: "transform 0.7s ease-in-out",
                    }}
                    onClick={() => setCoverOpen(!coverOpen)}
                  >
                    <div className="front cover-front relative">
                      <img
                        src={coverPhoto || ""}
                        alt="Book Cover"
                        className="w-full h-full object-cover rounded-r-[5px]"
                      />
                      <div
                        className="absolute bottom-10 left-0 right-0 py-1 text-center bg-white cursor-pointer"
                      >
                        <span
                          className={`block text-[12px] font-semibold
                            ${textAlign === "left"
                              ? "text-left pl-2"
                              : textAlign === "center"
                              ? "text-center"
                              : "text-right pr-2"}
                          `}
                        >
                          {bookTitle || "ADD COVER TITLE"}
                        </span>
                      </div>
                    </div>
                    <div className="back cover-back">
                      <img
                        src="/images/finalpage.png"
                        alt="Back Cover"
                        className="w-full h-full object-cover rounded-l-[5px]"
                      />
                    </div>
                  </div>

                  {/* Pages */}
                  {Array.from({ length: totalPages }, (_, i) => {
                    const frontImg = pages[i * 2];
                    const backImg = pages[1 + i * 2] || pages[i * 2];
                    const zIndexFront = totalPages - i;
                    const isLastPage = i === totalPages - 1;
                    
                    return (
                      <div
                        key={i}
                        className={`page w-full h-full cursor-pointer ${isLastPage ? 'last-page' : ''}`}
                        style={{
                          transform: pagesFlipped[i]
                            ? "rotateY(-180deg)"
                            : "rotateY(0deg)",
                          zIndex: pagesFlipped[i] ? i + 1 : zIndexFront,
                          marginTop: "0px",
                          transition: "transform 0.7s ease-in-out",
                        }}
                        onClick={() => togglePage(i)}
                      >
                        <div className="front">
                          <div className="image-container">
                            <img
                              src={frontImg?.url || ""}
                              alt={frontImg?.caption || `Page ${i + 1} front`}
                              title={frontImg?.name || ""}
                              className="w-full h-full object-contain rounded-r-[5px]"
                            />
                          </div>
                          {frontImg?.url !== "/images/finalpage.png" && frontImg?.url !== "/images/endcover.png" && (
                            <div className="text-container">
                              <span className="lg:text-[10px] text-[5px] font-semibold">
                                {frontImg?.caption || "ADD IMAGE TITLE"}
                              </span>
                              <span className="lg:text-[10px] text-[5px] text-gray-600">
                                {frontImg?.name || "ADD NAME"} <span className='lg:text-[10px] text-[5px] text-gray-600'>{frontImg?.age}</span>
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="back">
                          <div className="image-container">
                            <img
                              src={backImg?.url || ""}
                              alt={backImg?.caption || `Page ${i + 1} back`}
                              title={backImg?.name || ""}
                              className="w-full h-full object-contain rounded-l-[5px]"
                            />
                          </div>
                          {backImg?.url !== "/images/finalpage.png" && backImg?.url !== "/images/endcover.png" && (
                            <div className="text-container">
                              <span className="lg:text-[10px] text-[5px] font-semibold">
                                {backImg?.caption || "ADD IMAGE TITLE"}
                              </span>
                              <span className="lg:text-[10px] text-[5px] text-gray-600">
                                {backImg?.name || "ADD NAME"} <span className='lg:text-[10px] text-[5px] text-gray-600'>{backImg?.age}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

<div className="mt-6">
        <p className="text-lg md:text-xl font-semibold text-center">
          {(() => {
            const flippedCount = Object.values(pagesFlipped).filter(Boolean).length;
            
            // If cover is not open, show "Cover"
            if (!coverOpen) {
              return "Cover";
            }
            
            // If cover is open but no pages flipped, show "1" (first page)
            if (flippedCount === 0) {
              return totalPages > 0 ? "1" : "1";
            }
            
            // Calculate current page numbers (starting from 1)
            const leftPage = 1 + (flippedCount * 2);
            const rightPage = leftPage + 1;
            
            // Calculate total content pages (excluding cover)
            const totalContentPages = totalPages * 2;
            
            // If we're at the last spread and right page exceeds total, show only left page
            if (rightPage > totalContentPages) {
              return `${leftPage}`;
            }
            
            // Show both pages
            return `${leftPage}-${rightPage}`;
          })()}
        </p>
      </div>
      </div>
    </>
  );
};

export default PreviewBook;