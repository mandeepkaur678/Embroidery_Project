import React from 'react';
import { SlidersHorizontal, Check, RotateCcw } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_COLORS } from '../../data/mockProducts';

export const ProductFilters = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onChangePriceRange,
  selectedColor,
  onSelectColor,
  onResetFilters,
  totalResultsCount
}) => {

  return (
    <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-7">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-beige">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h2 className="font-serif text-xl font-bold text-earth">Filters</h2>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs font-medium text-muted hover:text-terracotta transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-beige/40"
          title="Clear all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-earth/80">
          Categories
        </h3>
        <div className="space-y-1.5">
          {MOCK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${isSelected
                  ? 'bg-sage text-cream shadow-warm-sm font-semibold'
                  : 'text-charcoal hover:bg-beige/40 border border-transparent hover:border-beige'
                  }`}
              >
                <span>{cat}</span>
                <span
                  className={`w-2 h-2 rounded-full transition-transform duration-200 ${isSelected ? 'bg-cream scale-125' : 'bg-sand group-hover:bg-sage/50'
                    }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-beige" />

      {/* 2. Price Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-earth/80">
            Max Price
          </h3>
          <span className="text-xs font-semibold text-sage bg-sage/10 px-2 py-0.5 rounded-md">
            ₹{priceRange.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="300"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => onChangePriceRange(Number(e.target.value))}
            className="w-full h-2 bg-beige rounded-lg appearance-none cursor-pointer accent-sage"
          />
          <div className="flex items-center justify-between text-[11px] text-muted font-medium">
            <span>₹300</span>
            <span>₹2,500</span>
            <span>₹5,000+</span>
          </div>
        </div>
      </div>

      <hr className="border-beige" />

      {/* 3. Color Filter */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-earth/80">
          Filter by Color
        </h3>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {MOCK_COLORS.map((c) => {
            const isSelected = selectedColor.toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.name}
                onClick={() => onSelectColor(isSelected ? '' : c.name)}
                title={c.name}
                aria-label={`Filter by ${c.name}`}
                className={`relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center border ${isSelected
                  ? 'ring-2 ring-sage ring-offset-2 scale-110 shadow-warm-sm'
                  : 'border-beige hover:scale-105'
                  }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <Check className="w-4 h-4 text-white drop-shadow-sm stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
        {selectedColor && (
          <p className="text-xs text-sage font-medium flex items-center gap-1 pt-1">
            Active: <span className="font-semibold text-earth">{selectedColor}</span>
            <button
              onClick={() => onSelectColor('')}
              className="text-[10px] text-terracotta hover:underline ml-auto"
            >
              Clear color
            </button>
          </p>
        )}
      </div>

      {/* Footer Helper */}
      <div className="pt-2 text-center text-xs text-muted">
        <span>Showing tailored handcrafted items</span>
      </div>

    </div>
  );
};
