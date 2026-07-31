import React from 'react';
import { ProductCard } from './ProductCard';
import { SortDropdown } from './SortDropdown';
import { SlidersHorizontal, PackageSearch, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export const ProductGrid = ({
  products = [],
  totalCount = 0,
  page = 1,
  pageSize = 8,
  loading = false,
  error = null,
  sortValue,
  onSortChange,
  onOpenMobileFilters,
  onResetFilters,
  onAddToCart,
  onSelectProduct,
  onRetry
}) => {
  // Calculation for product count display
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="space-y-6">

      {/* Product Grid Top Header */}
      <div className="bg-cream border border-beige rounded-2xl px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-warm-sm">

        {/* Left: Product Count Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <p className="text-xs sm:text-sm font-medium text-earth">
            Showing <span className="font-bold text-sage">{startItem}–{endItem}</span> of{' '}
            <span className="font-bold text-earth">{totalCount}</span> handcrafted products
          </p>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-beige bg-ivory text-xs font-semibold text-earth hover:bg-beige/40 transition-colors shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sage" />
            <span>Filters</span>
          </button>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="w-full sm:w-auto flex justify-end">
          <SortDropdown value={sortValue} onChange={onSortChange} />
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: pageSize }).map((_, idx) => (
            <div
              key={idx}
              className="bg-cream border border-beige/60 rounded-2xl p-4 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-[4/3] bg-beige rounded-xl" />
              <div className="h-4 bg-beige rounded-md w-1/3" />
              <div className="h-5 bg-beige rounded-md w-3/4" />
              <div className="h-4 bg-beige rounded-md w-1/2" />
              <div className="pt-2 flex items-center justify-between border-t border-beige/40">
                <div className="h-6 bg-beige rounded-md w-1/3" />
                <div className="h-8 bg-beige rounded-xl w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-cream border border-beige rounded-2xl p-10 text-center max-w-lg mx-auto space-y-4 shadow-warm-sm">
          <div className="w-14 h-14 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-earth">
            We couldn't load our collection.
          </h3>
          <p className="text-sm text-muted max-w-xs mx-auto">
            {error || 'An unexpected error occurred while fetching products.'}
          </p>
          <Button
            onClick={onRetry}
            className="bg-terracotta hover:bg-terracotta-dark text-white gap-2 mt-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="bg-cream border border-beige rounded-2xl p-10 sm:p-14 text-center max-w-md mx-auto space-y-4 shadow-warm-sm my-6">
          <div className="w-16 h-16 rounded-full bg-sage/10 text-sage flex items-center justify-center mx-auto">
            <PackageSearch className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-earth">
              No handcrafted pieces found.
            </h3>
            <p className="text-sm text-muted">
              Try adjusting your filters to discover more beautiful creations.
            </p>
          </div>
          <Button
            onClick={onResetFilters}
            className="bg-sage hover:bg-sage-dark text-cream font-medium text-xs px-6 py-2.5 rounded-full mt-3"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Active Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}

    </div>
  );
};
