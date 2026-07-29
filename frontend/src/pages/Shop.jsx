import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ShopHero } from '../components/shop/ShopHero';
import { ProductFilters } from '../components/shop/ProductFilters';
import { ProductGrid } from '../components/shop/ProductGrid';
import { ShopPagination } from '../components/shop/ShopPagination';
import { BenefitsSection } from '../components/shop/BenefitsSection';
import { Footer } from '../components/Footer';
import { Sheet } from '../components/ui/Sheet';
import { fetchProducts } from '../services/productService';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Filter States
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All Products'
  );
  const [priceRange, setPriceRange] = useState(
    Number(searchParams.get('maxPrice')) || 5000
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get('color') || ''
  );
  const [sortValue, setSortValue] = useState(
    searchParams.get('sort') || 'featured'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // Pagination & Loading States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [products, setProducts] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile Filter Sheet Drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize state from URL search params on mount or param changes
  useEffect(() => {
    const qSearch = searchParams.get('search') || '';
    const qCategory = searchParams.get('category') || 'All Products';
    setSearchQuery(qSearch);
    if (qCategory) setSelectedCategory(qCategory);
  }, [searchParams]);

  // Load products when filters or pagination change
  const loadProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts({
        category: selectedCategory,
        search: searchQuery,
        sort: sortValue,
        minPrice: 0,
        maxPrice: priceRange,
        color: selectedColor,
      });

      setProducts(res.products);
      setTotalProductsCount(res.total);
    } catch (err) {
      console.error('Failed to load shop products:', err);
      setError(err.message || 'Unable to fetch collection.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, sortValue, priceRange, selectedColor]);

  useEffect(() => {
    loadProductsData();
  }, [loadProductsData]);

  // Reset page to 1 when filters change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceChange = (maxVal) => {
    setPriceRange(maxVal);
    setCurrentPage(1);
  };

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSortValue(sortOption);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Products');
    setPriceRange(5000);
    setSelectedColor('');
    setSortValue('featured');
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Pagination slicing for current page view
  const totalPages = Math.ceil(products.length / pageSize) || 1;
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      {/* 1. Header Navigation */}
      <Navbar cartCount={3} wishlistCount={2} />

      {/* 2. Shop Hero Section */}
      <ShopHero />

      {/* 3. Main Shop Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">

        {/* Search Query Active Notification */}
        {searchQuery && (
          <div className="mb-6 bg-ivory border border-beige rounded-2xl px-5 py-3 flex items-center justify-between shadow-warm-sm">
            <p className="text-sm text-earth">
              Showing search results for: <span className="font-bold text-sage">"{searchQuery}"</span>
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="text-xs text-terracotta hover:underline font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Desktop Filter Sidebar (25% / 3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              priceRange={priceRange}
              onChangePriceRange={handlePriceChange}
              selectedColor={selectedColor}
              onSelectColor={handleColorChange}
              onResetFilters={handleResetFilters}
              totalResultsCount={totalProductsCount}
            />
          </aside>

          {/* Main Product Section (75% / 9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            {/* Product Grid Header + Cards */}
            <ProductGrid
              products={paginatedProducts}
              totalCount={products.length}
              page={currentPage}
              pageSize={pageSize}
              loading={loading}
              error={error}
              sortValue={sortValue}
              onSortChange={handleSortChange}
              onOpenMobileFilters={() => setMobileFilterOpen(true)}
              onResetFilters={handleResetFilters}
              onRetry={loadProductsData}
            />

            {/* Pagination Controls */}
            {!loading && !error && products.length > 0 && (
              <ShopPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
              />
            )}
          </div>

        </div>
      </main>

      {/* Mobile / Tablet Filter Drawer Modal */}
      <Sheet
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Products"
        position="left"
      >
        <div className="pt-2">
          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              handleCategoryChange(cat);
              setMobileFilterOpen(false);
            }}
            priceRange={priceRange}
            onChangePriceRange={handlePriceChange}
            selectedColor={selectedColor}
            onSelectColor={(c) => {
              handleColorChange(c);
              setMobileFilterOpen(false);
            }}
            onResetFilters={() => {
              handleResetFilters();
              setMobileFilterOpen(false);
            }}
            totalResultsCount={totalProductsCount}
          />
        </div>
      </Sheet>

      {/* 4. Trust & Benefits Section */}
      <BenefitsSection />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};
