'use client';

import React, { useEffect, useState } from 'react';
import BookCard from './bookcard';
import { useRouter } from 'next/navigation';
import { getCurrentUser, showUserBooks } from '../../server/user';

export interface IBook {
  id: number;
  bookTitle: string;
  coverPhotoUrl: string;
  createdAt: string; // from backend ISO string
}

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getCurrentUser();
        if (!user?.sub) {
          if (mounted) setBooks([]);
          return;
        }
        const res = await showUserBooks(user.sub);
        // normalize data if needed (map backend fields -> IBook)
        if (mounted) setBooks(res || []);
      } catch (err: any) {
        console.error('Failed to fetch books', err);
        if (mounted) setError(err?.message || 'Failed to fetch books');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBooks();
    return () => {
      mounted = false;
    };
  }, []); // run once on mount

  const handleDeleteBook = async (id: number) => {
    // placeholder: call your delete API, then remove from state
    // await deleteBookApi(id);
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const handlePreview = (id: number) => {
    // navigate to preview page
    router.push(`/books/${id}/bookeditor`);
  };

  return (
<div className="min-h-screen p-6 flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">
      My Books 
      <span className="mx-2 text-gray-400">•</span>
      <span className="text-sm text-gray-500">{books.length} Books</span>
    </h1>
  </div>

  <h4 className="text-lg font-bold mb-4">Saved Books</h4>

  {/* Content */}
  <div className="flex-1 p-6">
    {loading ? (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Loading...
      </div>
    ) : error ? (
      <div className="flex items-center justify-center h-full text-red-500 text-lg">
        {error}
      </div>
    ) : books.length === 0 ? (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        No Saved Books
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        {books.map((bk) => (
          <BookCard
            key={bk.id}
            book={bk}
            onPreview={handlePreview}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default MyBooks;