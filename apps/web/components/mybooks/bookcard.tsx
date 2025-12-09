'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IBook } from '.';
import { showCoverPhoto } from '../../server/images';

type BookCardProps = {
  book: IBook;
  onPreview?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onPreview, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchCover = async () => {
      if (!book?.coverPhotoUrl) {
        setCoverUrl(null);
        return;
      }
      setLoading(true);
      try {
        const url = await showCoverPhoto(book.coverPhotoUrl);
        if (mounted) setCoverUrl(url?.url ?? null);
      } catch (err) {
        console.error('Failed to load cover photo', err);
        if (mounted) setCoverUrl(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCover();
    return () => {
      mounted = false;
    };
  }, [book.coverPhotoUrl]);

  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString()
    : '';
  return (
    <div className="p-2 rounded-lg border border-blue-50 relative w-full md:w-full">
      {/* Cover photo */}
      <div
        className="w-full  rounded-md overflow-hidden cursor-pointer"
        onClick={() => onPreview?.(book.id)}
      >
        {loading ? (
          <div className="flex items-center justify-center bg-gray-50">
            Loading...
          </div>
        ) : coverUrl ? (
          <div className='flex'>
              <Image
                src={coverUrl}
                alt={book.bookTitle || "Book cover image"}
                width={100}
                height={100}
                className="object-cover"
              />

              <div className="space-y-2 ml-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {book.bookTitle}
                  </h3>
                  <p className="text-xs text-red-500 bg-red-50 rounded-full p-1">DRAFT</p>
                </div>
                <div className='flex gap-6'>
                  <p className="text-xs text-gray-500">Size: <span className='text-black'>{"11in * 8.5in"}</span></p>
                  <p className="text-xs text-gray-500">Pages: <span className='text-black'>{20}</span></p>
                  <p className="text-xs text-gray-500">Date: <span className='text-black'>{formattedDate}</span></p>
                </div>
              </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No cover
          </div>
        )}
      </div>

      {/* Title + date */}
      

      {/* Three-dot menu */}
      <button
        onClick={() => setOpenMenu((s) => !s)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm4 2a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>

      {openMenu && (
        <div className="absolute right-3 top-12 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-40 z-20">
          <button
            onClick={() => {
              setOpenMenu(false);
              onPreview?.(book.id);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
          >
            Preview Book
          </button>

          <button
            onClick={() => {
              setOpenMenu(false);
              onDelete?.(book.id);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;