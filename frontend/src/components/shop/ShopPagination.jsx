import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ShopPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-6 pb-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="w-9 h-9 rounded-full bg-cream border border-beige flex items-center justify-center text-earth hover:bg-beige/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-warm-sm"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 ${isActive
                  ? 'bg-sage text-cream shadow-warm-sm scale-105'
                  : 'bg-cream border border-beige text-earth hover:bg-sage-soft/20 hover:border-sage/40'
                }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="w-9 h-9 rounded-full bg-cream border border-beige flex items-center justify-center text-earth hover:bg-beige/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-warm-sm"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
