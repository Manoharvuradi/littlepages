'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getBook } from '../../../../server/book';
import { Page } from '../../../../components/editor';

const PreivewBook = () => {
      const params = useParams();
          const [bookId, setBookId] = useState<number | null>(null);
              const [pages, setPages] = useState<Page[]>([]);
  // images = [coverFront, coverBack, page1Front, page1Back, page2Front, page2Back, ...]
  const [coverOpen, setCoverOpen] = useState(false);
  const [pagesFlipped, setPagesFlipped] = useState({});

  useEffect(() => {
        const fetchBook = async () => {
          setBookId(Number(params.id));
          const data = await getBook(Number(params.id));
          setPages(data.bookImages);
        };
        fetchBook();
      }, [params.id]);

  const togglePage = (pageIndex) => {
    setPagesFlipped(prev => ({ ...prev, [pageIndex]: !prev[pageIndex] }));
  };

  // Calculate total number of pages dynamically
  const totalPages = (pages?.length - 2) / 2; // minus cover, divide by 2 for front/back

  return (
    <>
      <style>{`
        .book {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .pages, .pages > div {
          position: absolute;
          
          transform-style: preserve-3d;
        }
        .pages > div {
          transform-origin: left center;
          transition: transform 1s ease;
          box-shadow: inset 0 -1px 2px rgba(50, 50, 50, 0.1), inset -1px 0 1px rgba(150, 150, 150, 0.2);
          border-radius: 0 5px 5px 0;
        }
        .front, .back {
        padding: 1rem;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background: white;
        }
        .back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center flex-col p-4">
        <div className="book relative w-[700px] h-[350px]">
          <div className="pages w-[50%] h-[98%] absolute top-[1%] right-0 z-20">
            {/* Cover */}
            <div
              className={`cover w-full h-full cursor-pointer z-50`}
              style={{ transform: coverOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)', zIndex: coverOpen ? 1 : 100 }}
              onClick={() => setCoverOpen(!coverOpen)}
            >
              <div className="front">
                <img
                  src={pages[0]?.image.url}
                  alt="Cover Front"
                  className="w-full h-full object-cover rounded-r-[5px]"
                />
              </div>
              <div className="back">
                <img
                  src={pages[1]?.image.url}
                  alt="Cover Back"
                  className="w-full h-full object-cover rounded-l-[5px]"
                />
              </div>
            </div>

            {/* Pages */}
            {Array.from({ length: totalPages }, (_, i) => {
              const frontImg = pages[2 + i * 2]?.image.url;
              const backImg = pages[3 + i * 2]?.image.url;
              const zIndexFront = totalPages - i;
              return (
                <div
                  key={i}
                  className={`page w-full h-full cursor-pointer`}
                  style={{
                    transform: pagesFlipped[i] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    zIndex: pagesFlipped[i] ? i + 1 : zIndexFront,
                    marginTop: '0px',
                  }}
                  onClick={() => togglePage(i)}
                >
                  <div className="front">
                    <img
                      src={frontImg}
                      alt={`Page ${i + 1} Front`}
                      className="w-full h-full object-cover rounded-r-[5px]"
                    />
                  </div>
                  <div className="back">
                    <img
                      src={backImg}
                      alt={`Page ${i + 1} Back`}
                      className="w-full h-full object-cover rounded-l-[5px]"
                    />
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </>
  );
};

export default PreivewBook;