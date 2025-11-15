import React from 'react'

const MyBooks = () => {
const books: any = [];
  return (
<div className='min-h-screen p-6 bg-gray-100 flex flex-col'>
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">
      My Books 
      <span className="mx-2 text-gray-400">•</span>
      <span className="text-sm text-gray-500">{books.length} Books</span>
    </h1>
    <div className="flex items-center gap-3">
      <div
        // onClick={() => handleButtonClick()}
        className="px-4 py-2 bg-[#009FFF] text-white font-semibold rounded-lg shadow hover:bg-[#0A65C7] transition cursor-pointer"
      >
        Create Book
      </div>
    </div>
  </div>
  
  <h4 className='text-lg font-bold mb-4'>Saved Books</h4>
  
  <div className='flex-1 border bg-white border-gray-300 p-6'>
    {books.length === 0 ? (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        No Saved Books
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book: any) => (
          <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-3">{book.title}</h3>
              <div className="flex gap-2">
                <button 
                  // onClick={() => handleEditImage(book.id)}
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition"
                >
                  Edit Image
                </button>
                <button 
                  // onClick={() => handleDelete(book.id)}
                  className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  )
}

export default MyBooks
