import React, { useState } from "react";
import { X, BookOpen, ShoppingCart, ExternalLink } from "lucide-react";
import books from "./books.json"; // ✅ Import books.json

const BookTiles = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 font-serif text-center">
          <h1 className="text-4xl font-semibold">
            Books I Pretend to Have Read
          </h1>
          <p className="text-lg text-gray-600 mt-4 font-medium italic">
            A curated collection of books that make me sound intellectual at dinner parties (or not).
          </p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="break-inside-avoid bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform-gpu overflow-hidden"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={book.imageLink || "/api/placeholder/300/400"}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-t-2xl shadow-lg"
                />
              </div>
              <div className="p-6 bg-gradient-to-t from-gray-900/10 to-transparent">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-gray-600 mb-2 italic">
                  By {book.author}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {book.length} pages
                </div>
                <button
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  onClick={() => setSelectedBook(book)}
                >
                  <BookOpen className="w-4 h-4" />
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal with improved animation and transparency */}
        {selectedBook && (
          <div
            className="fixed inset-0 flex justify-center items-center p-4 z-50 backdrop-blur-sm bg-black/30 transition-all duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedBook(null);
            }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-4">
              <div className="p-8 relative">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className="flex gap-6">
                  <div className="w-1/3">
                    <img
                      src={selectedBook.imageLink || "/api/placeholder/300/400"}
                      alt={selectedBook.title}
                      className="w-full rounded-2xl shadow-lg"
                    />
                  </div>

                  <div className="w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedBook.title}
                    </h2>
                    <p className="text-gray-600 text-lg italic mb-2">
                      By {selectedBook.author}
                    </p>
                    <div className="flex items-center text-gray-500 mb-4">
                      <BookOpen className="w-5 h-5 mr-2" />
                      {selectedBook.length} pages
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedBook.about}
                    </p>
                    <a
                      href={selectedBook.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 gap-2 shadow-md hover:shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      View on Amazon
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTiles;