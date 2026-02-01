'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Page } from '..';
import { useRouter } from 'next/navigation';
import { updatePageOrder } from '../../../server/bookimage';
import UploadModal from '../previewuploads';

interface Props  {
  isExpanded: boolean;
  pages: Page[];
  bookId: number | null;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  onSelectPage?: (index: number) => void;
  setBookImageId: React.Dispatch<React.SetStateAction<number | null>>;
  refetch: () => Promise<Page[]>;
  coverPhotoUrl: string;
  setCoverPage: any;
  showCaption?: boolean;
  showName?: boolean;
  showAge?: boolean;
};

export default function AllPages({ isExpanded, pages, setPages, onSelectPage, bookId, setBookImageId, refetch, coverPhotoUrl, setCoverPage, showCaption, showName, showAge }: Props) {
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);
  const [hoveredGap, setHoveredGap] = useState<number | null>(null);
  const [position, setPosition] = useState<{ containerIndex: number | null; insertPosition: number | null }>({
    containerIndex: null,
    insertPosition: null,
  });
  const [uploadModal, setUploadModal] = useState(false);

  const router = useRouter();

  const [dragged, setDragged] = useState<{ containerIndex: number; pageIndex: number } | null>(null);
  const dragOver = useRef<{ containerIndex: number; pageIndex: number } | null>(null);

  // Build containers with inside cover logic
  const containers: ((Page | undefined) | 'inside-cover')[][] = [];
  const isEvenPages = pages.length % 2 === 0;
  
  if (pages.length === 0) {
    // Empty state
    containers.push(['inside-cover', 'inside-cover']);
  } else if (pages.length === 1) {
    // Only one page: [inside-cover, pages[0]]
    containers.push(['inside-cover', pages[0]]);
  } else {
    // First container: [inside-cover, pages[0]]
    containers.push(['inside-cover', pages[0]]);
    
    // Middle containers: normal pairs starting from pages[1]
    for (let i = 1; i < pages.length - 1; i += 2) {
      containers.push([pages[i], pages[i + 1]]);
    }
    
    // Last container depends on even/odd
    if (isEvenPages) {
      // Even: [pages[last], inside-cover]
      containers.push([pages[pages.length - 1], 'inside-cover']);
    } else {
      // Odd: last page is already in middle containers, no special last container needed
      // The last page pair is already added in the loop above
    }
  }

  const swapImages = async() => {
    if (!dragged || !dragOver.current) return;

    // Get actual page indices (accounting for inside covers)
    const getActualPageIndex = (containerIndex: number, pageIndex: number) => {
      const item = containers[containerIndex]?.[pageIndex];
      
      if (item === 'inside-cover') {
        return null; // Inside cover position
      }
      
      // Calculate actual index in pages array
      if (containerIndex === 0) {
        return pageIndex === 0 ? null : 0; // First container: [inside-cover, pages[0]]
      }
      
      // For other containers, calculate based on position
      let actualIndex = 0;
      for (let i = 0; i < containerIndex; i++) {
        for (let j = 0; j < containers[i]!.length; j++) {
          if (containers[i]![j] !== 'inside-cover') {
            actualIndex++;
          }
        }
      }
      for (let j = 0; j < pageIndex; j++) {
        if (containers[containerIndex]![j] !== 'inside-cover') {
          actualIndex++;
        }
      }
      
      return actualIndex;
    };

    const actualDraggedIndex = getActualPageIndex(dragged.containerIndex, dragged.pageIndex);
    const actualOverIndex = getActualPageIndex(dragOver.current.containerIndex, dragOver.current.pageIndex);

    // Prevent swapping with inside cover positions
    if (actualDraggedIndex === null || actualOverIndex === null) {
      setDragged(null);
      dragOver.current = null;
      return;
    }

    const newPages = [...pages];
    if (newPages[actualDraggedIndex] && newPages[actualOverIndex]) {
      [newPages[actualDraggedIndex], newPages[actualOverIndex]] = [
        newPages[actualOverIndex]!,
        newPages[actualDraggedIndex]!,
      ];
      setPages(newPages);
      
      const pageOrderUpdates = newPages.map((p, index) => ({
        id: p.id,
        pageOrder: index + 1,
      }));

      try{
        if (bookId) {
          await updatePageOrder(bookId, pageOrderUpdates);
        }
      }catch(err){
        console.error("Failed to update page order:", err);
      }
    }

    setDragged(null);
    dragOver.current = null;
  };

  const handleUploadComplete = async() => {
    if (!position || !bookId) return;
    
    try{
      const freshPages = refetch ? await refetch() : [];
      if (!Array.isArray(freshPages) || freshPages.length === 0) return;
      
      const newPage = freshPages[freshPages.length - 1];
      const pagesWithoutNew = freshPages.slice(0, -1);

      pagesWithoutNew.splice(position.insertPosition!, 0, newPage!);
      setPages(pagesWithoutNew);

      const pageOrderUpdates = pagesWithoutNew.map((p, index) => ({
        id: p.id,
        pageOrder: index + 1,
      }));
      
      await updatePageOrder(bookId, pageOrderUpdates);

    }catch(err){
      console.error("Failed to update page order:", err);
    }
  }

  const handleCoverPhoto = async() => {

  }

  return (
    <>
    <div className="p-4">
      {/* Cover Photo - Separate Row */}
      

      {/* Pages Container */}
      <div className={`${!isExpanded ? 'overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth flex' : ''}`}>
        
        {coverPhotoUrl && (
          <div 
            onClick={() => {setCoverPage(true);}}
            className={`mb-6 ${isExpanded ? '' : 'flex'}`}
          >
            <Image 
              src={coverPhotoUrl}
              alt='coverphoto'
              width={isExpanded ? 200 : 100}
              height={isExpanded ? 200 : 100}
              className={`${isExpanded ? 'w-[185px] h-[144px]' : 'w-[100px] h-[100px]'} object-cover rounded shadow-md`}
            />
          </div>
        )}
        <div 
          className={`relative ${isExpanded ? 'grid lg:grid-cols-3 md:grid-cols-2 gap-6 place-items-center':'flex'}`}
        >
          {containers.map((container, cIndex) => {
            const isFirstContainer = cIndex === 0;
            const isLastContainer = cIndex === containers.length - 1;
            
            return (
              <div 
                key={cIndex} 
                className="relative flex bg-white transition-all duration-300"
              >
                {/* Container */}
                <div
                  className={`relative flex bg-white overflow-hidden transition-all duration-300 ${
                    hoveredContainer === cIndex ? 'shadow-2xl gap-4' : 'shadow-lg gap-0'
                  }`}
                  style={{
                    marginRight: hoveredGap === cIndex ? '1rem' : '0',
                    marginLeft: hoveredGap === cIndex - 1 ? '1rem' : '0',
                  }}
                  onMouseEnter={() => setHoveredContainer(cIndex)}
                  onMouseLeave={() => setHoveredContainer(null)}
                >
                  {container.map((item, pIndex) => {
                    const globalIndex = cIndex * 2 + pIndex - 1;
                    
                    // Check if this is an "inside cover" position
                    if (item === 'inside-cover') {
                      return (
                        <div
                          key={`inside-cover-${cIndex}-${pIndex}`}
                          className={`relative overflow-hidden bg-white border border-gray-300 flex items-center justify-center
                            ${isExpanded ? 'transition-[width,height] duration-500 ease-in-out w-[185px] h-[144px] px-3 pt-3 pb-5' : 'w-[100px] h-[100px] px-2 pt-2 pb-3'}`}
                        >
                          <span className={`text-gray-400 font-medium text-center ${isExpanded ? 'text-xs' : 'text-[8px]'}`}>
                            Inside Cover
                          </span>
                        </div>
                      );
                    }

                    // Regular page rendering
                    const page = item as Page | undefined;
                    return (
                      <div
                        key={page?.id ?? `empty-${cIndex}-${pIndex}`}
                        draggable
                        onClick={() => {onSelectPage?.(globalIndex); setBookImageId(page?.id || null); setCoverPage(false);}}
                        onDragStart={() => setDragged({ containerIndex: cIndex, pageIndex: pIndex })}
                        onDragEnter={() => (dragOver.current = { containerIndex: cIndex, pageIndex: pIndex })}
                        onDragEnd={swapImages}
                        className={`relative  overflow-hidden bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-400 cursor-pointer
                          ${isExpanded ? 'transition-[width,height] duration-500 ease-in-out w-[185px] h-[144px] px-3 pt-3 pb-5' : 'w-[100px] h-[100px] px-2 pt-2 pb-3'}`}
                      >
                        {page?.image?.url ? (
                          <Image
                            src={page.image?.url}
                            alt={`Page ${globalIndex + 1}`}
                            width={100}
                            height={100}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded">
                            Empty
                          </div>
                        )}
                        {showCaption &&<div className={`text-center text-gray-500 text-[3px] ${isExpanded ? 'pt-2' : ''} cursor-pointer`}>
                            {page?.caption || "ADD IMAGE TITLE"}
                          </div>}
                      </div>
                    );
                  })}
                  {!isExpanded && <div className='space-y-2 w-5 h-5'></div>}
                  {/* Center + button */}
                  {isExpanded &&
                  <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-full cursor-pointer"
                    onMouseEnter={() => setHoveredContainer(cIndex)}
                    onMouseLeave={() => setHoveredContainer(null)}
                  >
                    {hoveredContainer === cIndex && (
                      <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-blue-500 transition-all duration-300 pointer-events-auto"
                        onClick={() => {
                          // Calculate actual insert position accounting for inside covers
                          let insertPosition;
                          if (isFirstContainer) {
                            insertPosition = 0; // Insert at position 0 (after inside cover, before pages[0])
                          } else if (isLastContainer && isEvenPages) {
                            insertPosition = pages.length - 1; // Insert before last position (before inside cover)
                          } else {
                            insertPosition = (cIndex - 1) * 2 + 2; // Middle containers
                          }
                          setPosition({ containerIndex: cIndex, insertPosition });
                          setUploadModal(true);
                        }}
                      >
                        +
                      </button>
                    )}
                  </div>}
                </div>

                {/* Between containers hover area */}
                {cIndex < containers.length - 1 && isExpanded &&  (
                  <div
                    className={`cursor-pointer ${
                      isExpanded 
                        ? 'absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-full z-10' 
                        : 'relative w-6 h-full'
                    }`}
                    onMouseEnter={() => setHoveredGap(cIndex)}
                    onMouseLeave={() => setHoveredGap(null)}
                  >
                    {hoveredGap === cIndex && (
                      <button
                        className="z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-green-700 transition-all duration-300"
                        onClick={() => {
                          // Calculate insert position for between containers
                          let insertPosition;
                          if (cIndex === 0) {
                            insertPosition = 1; // Between first and second container
                          } else {
                            insertPosition = cIndex * 2;
                          }
                          setPosition({ containerIndex: cIndex, insertPosition });
                          setUploadModal(true);
                        }}
                      >
                        +
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    {uploadModal && 
      <UploadModal 
        bookId={bookId} 
        position={position} 
        setUploadModal={setUploadModal}
        onUploadComplete={handleUploadComplete}
      />
    }
  </>
  );
}