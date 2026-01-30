'use client'

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getBook } from '../../../../server/book';
import { getCurrentUser } from '../../../../server/user';
import { showCoverPhoto } from '../../../../server/images';
import { useSelectedImages } from '../../../../context';

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
    const { setCoverPagePicture } = useSelectedImages();

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
        setCoverPagePicture(url?.url);
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
        mobile: { width: 350, height: 150 },
        tablet: { width: 450, height: 225 },
        desktop: { width: 700, height: 350 },
      }
    : {
        mobile: { width: 330, height: 550 },
        tablet: { width: 800, height: 300 },
        desktop: { width: 900, height: 550 },
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

// @media (min-width: 319px) {
//   .book {
//     width: 400px;
//     height: 150px;
//   }

//   .text-container {
//     gap: 1px;
//     padding-top: 2px !important;
//   }
// }

// @media (min-width: 319px) {

//   .book {
//     width: 300px;
//     height: 130px;
//   }
//   .translate-x-custom-xs {
//     transform: translateX(1.5rem); /* 40px */
//   }
// }

// @media (min-width: 320px) {
//   .book {
//     min-width: 100%;
//     min-width: 100px;
//     min-height: 550px;
//   }


// }

/* Extra small devices (< 360px) */
@media (max-width: 359px) {
  .book {
    width: 280px;
    height: 420px;
  }
}

/* Small mobile devices (360px - 480px) */
@media (min-width: 360px) and (max-width: 480px) {
  .book {
    width: ${bookDimensions.mobile.width}px;
    height: ${bookDimensions.mobile.height}px;
  }
}

/* Large mobile devices (481px - 640px) */
@media (min-width: 481px) and (max-width: 640px) {
  .book {
    width: 400px;
    height: 200px;
  }
}

/* Small tablets (641px - 768px) */
@media (min-width: 641px) and (max-width: 768px) {
  .book {
    width: 560px;
    height: 280px;
  }
}

/* Tablets (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .book {
    width: ${bookDimensions.tablet.width}px;
    height: ${bookDimensions.tablet.height}px;
  }
}

/* Desktop (1025px - 1280px) */
@media (min-width: 1025px) and (max-width: 1280px) {
  .book {
    width: ${bookDimensions.desktop.width}px;
    height: ${bookDimensions.desktop.height}px;
  }
}

/* Large desktop (1281px+) */
@media (min-width: 1281px) {
  .book {
    width: ${bookDimensions.desktop.width}px;
    height: ${bookDimensions.desktop.height}px;
  }
}

  // .translate-x-custom-xs {
  //   transform: translateX(1.0rem); /* 24px */
  // }

// @media (min-width: 481px) and (max-width: 640px) {
//   .book {
//     width: 500px;
//     height: 180px;
//   }

//   .text-container {
//     gap: 2px;
//     padding-top: 4px !important;
//   }
// }

// @media (min-width: 641px) and (max-width: 768px) {
//   .book {
//     width: 600px;
//     height: 240px;
//   }
// }

// @media (min-width: 769px) and (max-width: 1024px) {
//   .book {
//     width: ${bookDimensions.tablet.width}px;
//     height: ${bookDimensions.tablet.height}px;
//   }
// }

// @media (min-width: 1025px) {
//   .book {
//     width: ${bookDimensions.desktop.width}px;
//     height: ${bookDimensions.desktop.height}px;
//   }
// }

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
    onClick={() => router.push(`/books/${bookId}/bookeditor`)}
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
    onClick={() => router.push(`/books/${bookId}/checkout`)}
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
          coverOpen ? "translate-x-custom-xs  2xl:translate-x-60" : "-translate-x-10"
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
      
      // If cover is open but no pages flipped, show "1" (first page alone)
      if (flippedCount === 0) {
        if (bookLength === 0) {
          return "";
        }
        return "1";
      }
      
      // Calculate current page numbers (starting from page 2 after first flip)
      const leftPage = (flippedCount * 2);
      const rightPage = leftPage + 1;
      
      // Check if we're viewing empty final pages (beyond bookLength)
      if (leftPage > bookLength) {
        return ""; // No page number for empty pages
      }
      
      // If left page is within bookLength but right page exceeds it
      if (leftPage <= bookLength && rightPage > bookLength) {
        return `${leftPage}`; // Show only left page number
      }
      
      // Both pages are within bookLength
      return `${leftPage}-${rightPage}`;
    })()}
  </p>
</div>
      </div>
    </>
  );
};

export default PreviewBook;


        {/* Right Side: Order Summary */}
        {/* <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6 self-start sticky top-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-800">
              Order Summary
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-200 to-gray-300">
                {coverPagePicture && <Image
                  src={coverPagePicture!}
                  alt="Book Thumbnail"
                  fill
                  className="object-cover"
                />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Art Book</p>
                <p className="text-sm text-gray-600">
                  Quantity: {quantity} {quantity > 1 ? 'Items' : 'Item'}
                </p>
                <p className="text-sm font-medium text-indigo-600 mt-1">
                  ${pricePerBook.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="mb-4">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors group">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium text-green-700 text-sm">Add Promo Code</span>
              </div>
              <svg className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">₹{(pricePerBook * quantity).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span>Estimated Tax</span>
              <span className="font-semibold">₹0.00</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-gray-900">₹{total}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 font-medium">Secure</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 font-medium">Fast Ship</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 font-medium">Quality</span>
            </div>
          </div>
        </div> */}