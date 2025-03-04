import React, { useState, useRef } from "react";
import { X, BookOpen, ShoppingCart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import books from "./books.json";

const BookTiles = ({ isDarkMode }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderBookGrid = (startIndex, endIndex, scrollRef) => (
    <div className="relative group">
      {/* Left Scroll Button */}
      <button 
        onClick={() => scroll(scrollRef, 'left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md transition-all duration-300 ${
          isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Scroll Button */}
      <button 
        onClick={() => scroll(scrollRef, 'right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md transition-all duration-300 ${
          isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4 scroll-smooth"
      >
        {books.slice(startIndex, endIndex).map((book, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-48 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform-gpu overflow-hidden ${
              isDarkMode ? 'bg-black border-white' : 'bg-white border-black'
            }`}
          >
            <div className="w-48 aspect-[3/5] relative">
              <img
                src={book.imageLink || "/api/placeholder/300/400"}
                alt={book.title}
                className="w-full h-full object-cover rounded-t-2xl shadow-lg"
              />
            </div>
            <div className="p-4">
              <h2 className={`text-[18px] font-semibold mb-2 line-clamp-2 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {book.title}
              </h2>
              <p className={`text-[16px] mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                By {book.author}
              </p>
              <div className={`flex items-center text-sm mb-4 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                <BookOpen className="w-4 h-4 mr-2" />
                {book.length} pages
              </div>
              <button
                className={`w-full px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                  isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}
                onClick={() => setSelectedBook(book)}
              >
                <BookOpen className="w-4 h-4" />
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl">
            Books I Pretend to Have Read
          </h1>
          <p className="text-lg mt-4 font-medium italic">
            A curated collection of books that make me sound intellectual at dinner parties (or not).
          </p>
        </div>

        {/* First Row of Books */}
        <div className="mb-8">
          {renderBookGrid(0, Math.floor(books.length / 2), scrollRef1)}
        </div>

        {/* Second Row of Books */}
        <div>
          {renderBookGrid(Math.floor(books.length / 2), books.length, scrollRef2)}
        </div>

        {/* Modal */}
        {selectedBook && (
          <div
            className="fixed inset-0 flex justify-center items-center p-4 z-50 bg-black/50 transition-all duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedBook(null);
            }}
          >
            <div className={`rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 bg-opacity-95 backdrop-blur-md ${
              isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              <div className="p-8 relative">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-opacity-80 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
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
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedBook.title}
                    </h2>
                    <p className="text-lg italic mb-2">
                      By {selectedBook.author}
                    </p>
                    <div className="flex items-center mb-4">
                      <BookOpen className="w-5 h-5 mr-2" />
                      {selectedBook.length} pages
                    </div>
                    <p className="leading-relaxed mb-6">
                      {selectedBook.about}
                    </p>
                    <a
                      href={selectedBook.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors duration-200 gap-2 shadow-md hover:shadow-lg ${
                        isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                      }`}
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
