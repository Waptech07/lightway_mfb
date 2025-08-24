import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: string) => void;
  generatePageNumbers: () => (number | string)[];
  rowsPerPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  generatePageNumbers,
  rowsPerPageOptions = [5, 10, 15, 20],
}) => {
  return (
    <div className="flex flex-wrap gap-y-4 justify-between items-center">
      {/* Navigation */}
      <div className="flex gap-4">
        <button
          title="navigate-left"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-12 h-9 py-2 px-[14px] rounded-lg border ${
            currentPage === 1
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#050C82] text-[#050C82] hover:text-white hover:bg-[#050C82] cursor-pointer"
          }`}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex flex-wrap items-center justify-center text-center gap-0.5">
          {generatePageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 text-sm font-medium rounded-lg p-3 cursor-pointer ${
                  currentPage === page
                    ? "bg-[#050C82] text-white"
                    : "text-black hover:bg-[#050C82] hover:text-white"
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 text-sm font-medium text-black rounded-lg p-3"
              >
                ...
              </span>
            )
          )}
        </div>

        <button
          title="navigate-right"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-12 h-9 py-2 px-[14px] rounded-lg border ${
            currentPage === totalPages
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#050C82] text-[#050C82] hover:text-white hover:bg-[#050C82] cursor-pointer"
          }`}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Rows Per Page Selector */}
      <div className="w-auto flex justify-center md:justify-end">
        <Select
          onValueChange={onRowsPerPageChange}
          value={`Show ${rowsPerPage} rows`}
        >
          <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white rounded-lg p-3 h-full w-full sm:w-auto">
            <SelectValue placeholder={`Show ${rowsPerPage} rows`} />
          </SelectTrigger>
          <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
            {rowsPerPageOptions.map((option) => (
              <SelectItem
                key={option}
                value={`Show ${option} rows`}
                className="text-white cursor-pointer"
              >
                Show {option} rows
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
