import React, { useRef } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 100; 
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className="flex justify-center items-center mt-4 space-x-2"
      aria-label="Pagination Navigation"
    >
      
      <button
        className="p-2 bg-gray-100 rounded hover:bg-gray-200 hidden sm:block"
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
      >
        &#8249;
      </button>

 
      <div className="overflow-x-auto">
        <ul
          ref={scrollRef}
          className="inline-flex items-center space-x-1 bg-white rounded-lg p-2 shadow-sm min-w-max"
        >
      
          <li>
            <button
              className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              &lt;
            </button>
          </li>

          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={`px-3 py-1 rounded hover:bg-gray-100 ${
                  number === currentPage
                    ? "bg-blue-100 text-blue-500 font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => onPageChange(number)}
                aria-current={number === currentPage ? "page" : undefined}
              >
                {number}
              </button>
            </li>
          ))}

          
          <li>
            <button
              className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              &gt;
            </button>
          </li>
        </ul>
      </div>

   
      <button
        className="p-2 bg-gray-100 rounded hover:bg-gray-200 hidden sm:block"
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
      >
        &#8250;
      </button>
    </nav>
  );
};

export default Pagination;
