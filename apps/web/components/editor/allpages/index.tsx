'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Page } from '..';
import { useRouter } from 'next/navigation';
import { updatePageOrder } from '../../../server/bookimage';
import UploadModal from '../previewuploads';


type Props = {
  isExpanded: boolean;
  pages: Page[];
  bookId: number | null;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  onSelectPage?: (index: number) => void;
  setBookImageId: React.Dispatch<React.SetStateAction<number | null>>;
  refetch: () => Promise<Page[]>;
};

export default function AllPages({ isExpanded, pages, setPages, onSelectPage, bookId, setBookImageId, refetch }: Props) {
  // Hover states
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);
  const [hoveredGap, setHoveredGap] = useState<number | null>(null);
  const [position, setPosition] = useState<{ containerIndex: number | null; insertPosition: number | null }>({
    containerIndex: null,
    insertPosition: null,
  });
  const [uploadModal, setUploadModal] = useState(false);

  const router = useRouter();

  // Dragging state (local)
  const [dragged, setDragged] = useState<{ containerIndex: number; pageIndex: number } | null>(null);
  const dragOver = useRef<{ containerIndex: number; pageIndex: number } | null>(null);

  // Split pages into containers (2 per container)
  const containers: (Page | undefined)[][] = [];
  for (let i = 0; i < pages.length; i += 2) {
    containers.push([pages[i], pages[i + 1]]);
  }

  // Swap images by updating parent pages state
  const swapImages = async() => {
    if (!dragged || !dragOver.current) return;

    const newPages = [...pages];
    const draggedIndex = dragged.containerIndex * 2 + dragged.pageIndex;
    const overIndex = dragOver.current.containerIndex * 2 + dragOver.current.pageIndex;

    if (newPages[draggedIndex] && newPages[overIndex]) {
      [newPages[draggedIndex], newPages[overIndex]] = [
        newPages[overIndex]!,
        newPages[draggedIndex]!,
      ];
      setPages(newPages);
      
      // prepare pageOrder updates
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
    // assume newly uploaded image appended to end
    const newPage = freshPages[freshPages.length - 1];
    const pagesWithoutNew = freshPages.slice(0, -1);

      // Insert the new page at the desired position (position.insertPosition)
      pagesWithoutNew.splice(position.insertPosition!, 0, newPage!);

      // Update the local state immediately
      setPages(pagesWithoutNew);

          // Prepare pageOrder updates for database
      const pageOrderUpdates = pagesWithoutNew.map((p, index) => ({
        id: p.id,
        pageOrder: index + 1,
      }));
      
      // Update page order in database
      await updatePageOrder(bookId, pageOrderUpdates);
      
      console.log(`Moved new image to position ${position.insertPosition}`);

    }catch(err){
      console.error("Failed to update page order:", err);
    }
  }


  return (
  <>
    <div  
      className={`p-4 ${!isExpanded ? 'overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth' : ''}`}
    >
      <div 
        className={`relative ${isExpanded ? 'grid grid-cols-3 gap-6 place-items-center':'flex'}`}
      >
        {containers.map((container, cIndex) => (
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
                // width: isExpanded ? '400px' : 'auto', // ✅ fixed width when expanded
            // height: isExpanded ? '500px' : 'auto', // ✅ fixed height when expanded
              }}
              onMouseEnter={() => setHoveredContainer(cIndex)}
              onMouseLeave={() => setHoveredContainer(null)}
            >
              {container.map((page, pIndex) => {
                const globalIndex = cIndex * 2 + pIndex;
                return (
                  <div
                    key={page?.id ?? `empty-${cIndex}-${pIndex}`}
                    draggable
                    onClick={() => {onSelectPage?.(globalIndex); setBookImageId(page?.id || null);}}
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
                    <div className={`text-center text-gray-500 text-[3px] ${isExpanded ? 'pt-2' : ''} cursor-pointer`}>
                        {page?.caption || "ADD IMAGE TITLE"}
                      </div>
                  </div>
                );
              })}

              {/* Center + button */}
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-full cursor-pointer"
                onMouseEnter={() => setHoveredContainer(cIndex)}
                onMouseLeave={() => setHoveredContainer(null)}
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30 pointer-events-none"></div>

                  {hoveredContainer === cIndex && (
                    <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-blue-500 transition-all duration-300 pointer-events-auto"
                      onClick={() => {
                        const i = cIndex * 2 + 1;
                        // insertInContainer(cIndex, insertPosition, bookId!);
                        setPosition({ containerIndex: cIndex, insertPosition: i });
                        setUploadModal(true);
                      }}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>

            {/* Between containers hover area */}
            {cIndex < containers.length - 1 && (
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
                      const i = (cIndex + 1) * 2;
                      setPosition({ containerIndex: cIndex, insertPosition: i });
                      setUploadModal(true);
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
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