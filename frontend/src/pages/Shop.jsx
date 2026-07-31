import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ShopHero } from '../components/shop/ShopHero';
import { ProductFilters } from '../components/shop/ProductFilters';
import { ProductGrid } from '../components/shop/ProductGrid';
import { ShopPagination } from '../components/shop/ShopPagination';
import { BenefitsSection } from '../components/shop/BenefitsSection';
import { Footer } from '../components/Footer';
import { Sheet } from '../components/ui/Sheet';
import { ProductDetailModal } from '../components/shop/ProductDetailModal';
import { fetchProducts } from '../services/productService';
import { MOCK_CATEGORIES } from '../data/mockProducts';

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
  const [searchInputValue, setSearchInputValue] = useState(
    searchParams.get('search') || ''
  );

  // Pagination & Loading States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [products, setProducts] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile Filter Sheet Drawer & Product Modal State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const searchDebounceRef = useRef(null);

  // Synchronize state from URL search params on mount or param changes
  useEffect(() => {
    const qSearch = searchParams.get('search') || '';
    const qCategory = searchParams.get('category') || 'All Products';
    setSearchQuery(qSearch);
    setSearchInputValue(qSearch);
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
  const updateUrlParams = (nextCategory = selectedCategory, nextSearch = searchQuery) => {
    const nextParams = {};

    if (nextSearch.trim()) {
      nextParams.search = nextSearch.trim();
    }

    if (nextCategory && nextCategory !== 'All Products') {
      nextParams.category = nextCategory;
    }

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrlParams(category, searchQuery);
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

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInputValue(value);

    // Debounce: fire search 400ms after user stops typing
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      setSearchQuery(trimmed);
      setCurrentPage(1);
      updateUrlParams(selectedCategory, trimmed);
    }, 400);
  };

  const handleSearchSubmit = (event) => {
    if (event?.type === 'keydown' && event.key !== 'Enter') return;
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    const trimmed = searchInputValue.trim();
    setSearchQuery(trimmed);
    setCurrentPage(1);
    updateUrlParams(selectedCategory, trimmed);
  };

  const handleClearSearch = () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    setSearchInputValue('');
    setSearchQuery('');
    setCurrentPage(1);
    updateUrlParams(selectedCategory, '');
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Products');
    setPriceRange(5000);
    setSelectedColor('');
    setSortValue('featured');
    setSearchQuery('');
    setSearchInputValue('');
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
              Showing results for: <span className="font-bold text-sage">"{searchQuery}"</span>
            </p>
            <button
              onClick={handleClearSearch}
              className="text-xs text-terracotta hover:underline font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="mb-8 rounded-[28px] border border-beige/70 bg-white/80 p-4 shadow-warm-sm sm:p-5">
          <div className="flex flex-col gap-4">
            {/* Search the Collection - top */}
            <div>
              <div className="flex flex-row items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sage mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search the collection</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-beige bg-cream px-3 py-2.5 shadow-inner-sm">
                <Search className="w-4 h-4 text-sage shrink-0" />
                <input
                  type="text"
                  value={searchInputValue}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchSubmit}
                  placeholder="Search floral hoops, embroidered bags, custom keepsakes..."
                  className="w-full bg-transparent text-sm text-earth placeholder:text-charcoal/50 focus:outline-none"
                />
                {searchInputValue && (
                  <button
                    onClick={handleClearSearch}
                    className="p-0.5 text-earth/50 hover:text-terracotta transition-colors shrink-0"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleSearchSubmit}
                  className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1.5 text-xs font-semibold text-cream transition hover:bg-sage-dark shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category Tags - below search */}
            <div className="flex flex-wrap gap-2">
              {MOCK_CATEGORIES.filter((category) => category !== 'All Products').map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${active
                      ? 'border-sage bg-sage text-cream shadow-warm-sm'
                      : 'border-beige bg-cream text-earth hover:border-sage/40 hover:text-sage-dark'
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

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
              onSelectProduct={(p) => setSelectedProductModal(p)}
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

      {/* Product Details Popup Modal */}
      {selectedProductModal && (
        <ProductDetailModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
        />
      )}

      {/* 4. Trust & Benefits Section */}
      <BenefitsSection />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};
