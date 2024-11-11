import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };
  const count = Math.ceil(totalPages);

  const getPageNumbers = () => {
    if (count <= 5) {
      return range(1, count);
    }

    if (currentPage < 4) {
      return [...range(1, 3), "...", count - 1, count];
    }

    if (currentPage > count - 3) {
      return [1, 2, "...", ...range(count - 2, count)];
    }

    return [
      1,
      2,

      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",

      count,
    ];
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
      <Button
        variant="outline"
        className={`w-full border-gray-300 p-2 sm:w-28 ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-100 text-gray-500"
            : ""
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft />
        Previous
      </Button>
      <div className="flex flex-wrap items-center justify-center space-x-1 sm:space-x-2">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                className={`h-10 w-10 rounded-md px-3 py-1 ${
                  page === currentPage
                    ? "bg-gray-200 text-black"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      <Button
        variant="outline"
        className={`w-full border-gray-300 p-2 sm:w-28 ${
          currentPage === count
            ? "cursor-not-allowed border-gray-200 bg-white text-gray-500"
            : ""
        }`}
        onClick={() => currentPage < count && onPageChange(currentPage + 1)}
        disabled={currentPage === count}
      >
        Next
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
