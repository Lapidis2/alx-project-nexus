"use client";

import React, { useState } from "react";
import Image from "next/image";
import nextIcon from "@/public/assets/images/next.svg";
import prevIcon from "@/public/assets/images/prev.svg";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const buttonStyles =
    "py-1 px-2 min-w-[30px] h-[30px] rounded-md cursor-pointer font-outfit font-medium text-sm md:text-base";

  const arrowStyle = (isDisabled: boolean) => ({
    opacity: isDisabled ? 0.3 : 1,
    cursor: isDisabled ? "default" : "pointer",
  });

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    } else {
      pages.push(renderPageButton(1));
      if (currentPage > 3) {
        pages.push(<span key="ellipsis-1">...</span>);
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderPageButton(i));
      }
      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis-2">...</span>);
      }
      pages.push(renderPageButton(totalPages));
    }
    return pages;
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className={`${buttonStyles} ${
        currentPage === page
          ? "bg-[#EDFBFF] text-[#37C9EE]"
          : "bg-transparent text-black"
      }`}
      onClick={() => handlePageClick(page)}
    >
      {page}
    </button>
  );

  return (
    <nav
      className="flex justify-center mt-4 mb-4 md:justify-end"
      aria-label="Pagination Navigation"
    >

      <Image
        src={prevIcon}
        alt="Previous page"
        onClick={() => currentPage !== 1 && handlePrevious()}
        style={arrowStyle(currentPage === 1)}
        className="cursor-pointer"
      />

   
      {renderPageNumbers()}

    
      <Image
        src={nextIcon}
        alt="Next page"
        onClick={() => currentPage !== totalPages && handleNext()}
        style={arrowStyle(currentPage === totalPages)}
        className="cursor-pointer"
      />
    </nav>
  );
};

export default Pagination;
