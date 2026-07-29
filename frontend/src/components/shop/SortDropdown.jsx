import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="shop-sort" className="text-xs font-semibold text-earth flex items-center gap-1.5 whitespace-nowrap">
        <ArrowUpDown className="w-3.5 h-3.5 text-sage" />
        <span>Sort By:</span>
      </label>
      <select
        id="shop-sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-cream border border-beige rounded-xl px-3 py-1.5 text-xs sm:text-sm font-medium text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer shadow-warm-sm hover:border-sand transition-all"
      >
        <option value="featured">Featured Collection</option>
        <option value="newest">Newest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
};
