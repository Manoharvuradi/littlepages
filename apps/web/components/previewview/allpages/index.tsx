'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Page } from '..';
import { useRouter } from 'next/navigation';


type Props = {
  isExpanded: boolean;
  pages: Page[];
  bookId: number | null;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  onSelectPage?: (index: number) => void;
};

export default function AllPages({ isExpanded, pages, setPages, onSelectPage, bookId }: Props) {
  // Hover states
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);
  const [hoveredGap, setHoveredGap] = useState<number | null>(null);

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
const swapImages = () => {
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
  }

  setDragged(null);
  dragOver.current = null;
};

  // Add an empty container (two empty pages) after index
  const addContainerAt = (index: number) => {
    setPages((prev) => {
      const nextId = prev.reduce((m, p) => Math.max(m, p.id), 0) + 1;
      const newPages = [...prev];
      newPages.splice(index * 2 + 2, 0, { id: nextId, url: '', }, { id: nextId + 1, url: '' });
      return newPages;
    });
  };

  return (
    <div className="p-4">
      <div className="flex relative">
        {containers.map((container, cIndex) => (
          <div key={cIndex} className="relative flex items-center">
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
              {container.map((page, pIndex) => {
                const globalIndex = cIndex * 2 + pIndex;
                return (
                  <div
                    key={page?.id ?? `empty-${cIndex}-${pIndex}`}
                    draggable
                    onClick={() => onSelectPage?.(globalIndex)}
                    onDragStart={() => setDragged({ containerIndex: cIndex, pageIndex: pIndex })}
                    onDragEnter={() => (dragOver.current = { containerIndex: cIndex, pageIndex: pIndex })}
                    onDragEnd={swapImages}
                    className={`relative p-3 overflow-hidden bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-400 cursor-pointer
                      ${isExpanded ? 'transition-[width,height] duration-500 ease-in-out w-1/2 h-full' : 'w-[100px] h-[100px]'}`}
                  >
                    {page?.url ? (
                      <Image
                        src={page.url}
                        alt={`Page ${globalIndex + 1}`}
                        width={250}
                        height={350}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded">
                        Empty
                      </div>
                    )}
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
                    onClick={() => router.push(`/upload?container=${cIndex}&bookId=${bookId}`)}
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            {/* Between containers hover area */}
            {cIndex < containers.length - 1 && (
              <div
                className="relative w-6 h-full cursor-pointer"
                onMouseEnter={() => setHoveredGap(cIndex)}
                onMouseLeave={() => setHoveredGap(null)}
              >
                {hoveredGap === cIndex && (
                  <button
                    className="z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-green-700 transition-all duration-300"
                    onClick={() => addContainerAt(cIndex)}
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
  );
}