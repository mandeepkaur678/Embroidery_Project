import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Search, Sparkles, Tag, AlertTriangle, Layers3, HeartHandshake, Star, ShoppingBag, Palette, TrendingUp, Gem, NotebookPen } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/shop/ProductCard';
import { getCategories, searchCategories } from '../services/categoryService';
import { fetchProducts } from '../services/productService';

const CategorySkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="animate-pulse rounded-[28px] border border-beige/70 bg-white/70 p-5 shadow-warm-sm">
        <div className="h-40 rounded-[20px] bg-beige/70" />
        <div className="mt-4 h-5 w-32 rounded-full bg-beige/70" />
        <div className="mt-3 h-4 w-full rounded-full bg-beige/70" />
        <div className="mt-2 h-4 w-4/5 rounded-full bg-beige/70" />
        <div className="mt-6 h-10 w-full rounded-full bg-beige/70" />
      </div>
    ))}
  </div>
);

export const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedSlug, setSelectedSlug] = useState(searchParams.get('category') || '');
  const [allCategories, setAllCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState('');
  const [productsError, setProductsError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      setLoading(true);
      setError('');
      try {
        const categories = await getCategories({ activeOnly: true });
        if (isMounted) setAllCategories(categories);
      } catch (err) {
        if (isMounted) setError(err.message || 'Unable to load categories right now.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setProductsLoading(true);
      setProductsError('');
      try {
        const response = await fetchProducts({ category: 'All Products', search: '', sort: 'featured' });
        if (isMounted) setCatalogProducts(response.products || []);
      } catch (err) {
        if (isMounted) setProductsError(err.message || 'Unable to load available products.');
      } finally {
        if (isMounted) setProductsLoading(false);
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const result = await searchCategories(query);
        setSuggestions(result.slice(0, 5));
      } catch {
        setSuggestions([]);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allCategories.filter((category) => {
      const matchesQuery = !normalizedQuery || `${category.name} ${category.description} ${category.slug}`.toLowerCase().includes(normalizedQuery);
      const matchesSelection = !selectedSlug || category.slug === selectedSlug;
      return matchesQuery && matchesSelection;
    });
  }, [allCategories, query, selectedSlug]);

  const featuredHighlights = [
    { label: 'Hand-finished pieces', value: '100% artisan made', icon: HeartHandshake },
    { label: 'New this week', value: 'Fresh arrivals every Friday', icon: TrendingUp },
    { label: 'Loved by clients', value: '4.9/5 average rating', icon: Star },
  ];

  const storyCards = [
    { title: 'Crafted for everyday rituals', body: 'Bring thoughtful texture and warmth into your wardrobe, gift wrapping, and home styling.', icon: NotebookPen },
    { title: 'Bespoke details welcome', body: 'Custom embroidery requests and made-to-order pieces are available for special occasions.', icon: Gem },
  ];

  const handleSelectSuggestion = (category) => {
    setQuery(category.name);
    setSelectedSlug(category.slug);
    setSearchParams({ category: category.slug, q: category.name });
    setSuggestions([]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setSelectedSlug('');
      setSearchParams({});
      return;
    }

    const categoryMatch = allCategories.find((category) =>
      `${category.name} ${category.description} ${category.slug}`.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (categoryMatch) {
      setSelectedSlug(categoryMatch.slug);
      setSearchParams({ category: categoryMatch.slug, q: trimmed });
    } else {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
      setSearchParams({ search: trimmed });
    }
  };

  const handleSelectTag = (slug) => {
    const nextSlug = selectedSlug === slug ? '' : slug;
    setSelectedSlug(nextSlug);
    setSearchParams(nextSlug ? { category: nextSlug } : {});
  };

  const handleExplore = (slug) => {
    navigate(`/shop?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Navbar cartCount={3} wishlistCount={2} />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav className="flex items-center gap-2 text-sm text-earth/70">
          <Link to="/" className="transition hover:text-terracotta">Home</Link>
          <span>/</span>
          <span className="font-medium text-earth">Categories</span>
        </nav>

        <section className="relative overflow-hidden rounded-[36px] border border-beige/70 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(248,241,228,0.95))] p-6 shadow-warm-md sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-15" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3 py-1 text-sm font-medium text-sage-dark">
                <Sparkles className="h-4 w-4" /> Curated embroidery collections
              </div>
              <div>
                <h1 className="font-serif text-4xl font-semibold text-earth sm:text-5xl">A beautifully crafted world of embroidered essentials.</h1>
                <p className="mt-3 text-lg leading-8 text-earth/70">Explore clothing, décor, bags and keepsakes in one immersive collection designed to feel timeless, personal and ready to gift.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/shop')}
                  className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark"
                >
                  Browse all products
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setQuery('')}
                  className="inline-flex items-center gap-2 rounded-full border border-beige bg-white/80 px-5 py-3 text-sm font-semibold text-earth transition hover:border-sage/40 hover:text-sage-dark"
                >
                  <Compass className="h-4 w-4" />
                  View all collections
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {featuredHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[20px] border border-beige/70 bg-white/75 p-3 shadow-sm backdrop-blur">
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-earth/50">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-earth">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full rounded-[28px] border border-beige/70 bg-white/85 p-3 shadow-warm-sm backdrop-blur">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-earth/50" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search collections or styles..."
                  className="w-full rounded-full border border-transparent bg-cream/80 py-3 pl-12 pr-4 text-sm text-earth outline-none ring-0 placeholder:text-earth/50"
                />
              </form>

              {suggestions.length > 0 && (
                <div className="mt-3 rounded-2xl border border-beige/70 bg-white p-2 shadow-sm">
                  {suggestions.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => handleSelectSuggestion(category)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-earth transition hover:bg-cream"
                    >
                      <span>{category.name}</span>
                      <span className="text-earth/50">{category.productCount || 0} items</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-[24px] border border-beige/70 bg-cream/70 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sage-dark">Available right now</p>
                <div className="mt-3 flex items-center justify-between text-sm text-earth/70">
                  <span>{allCategories.length} curated collections</span>
                  <span>{catalogProducts.length} products ready to explore</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-[24px] border border-beige/70 bg-white/70 p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sage-dark">Browse by mood</p>
                <p className="mt-1 text-sm text-earth/70">Choose a collection to explore the full range of embroidered styles and gifting ideas.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3 py-2 text-sm font-medium text-sage-dark">
                <Palette className="h-4 w-4" />
                Handpicked for timeless charm
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allCategories.map((category) => {
              const active = selectedSlug === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => handleSelectTag(category.slug)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-sage bg-sage text-white' : 'border-beige bg-white/70 text-earth hover:border-sage/40 hover:text-sage-dark'}`}
                >
                  <Tag className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-sm text-earth/70">
            <p>{visibleCategories.length} collection{visibleCategories.length === 1 ? '' : 's'} ready to explore</p>
            {(query || selectedSlug) && (
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedSlug('');
                  setSearchParams({});
                }}
                className="font-medium text-terracotta transition hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {loading ? (
          <CategorySkeleton />
        ) : error ? (
          <div className="rounded-[24px] border border-terracotta/20 bg-terracotta/10 p-8 text-center text-earth">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-terracotta" />
            <h2 className="text-xl font-semibold">We hit a snag loading the collections.</h2>
            <p className="mt-2 text-earth/70">{error}</p>
          </div>
        ) : visibleCategories.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-beige/80 bg-white/70 p-10 text-center text-earth">
            <Compass className="mx-auto mb-3 h-8 w-8 text-sage" />
            <h2 className="text-xl font-semibold">No collections match this search yet.</h2>
            <p className="mt-2 text-earth/70">Try a different keyword or clear the current selection to see all categories again.</p>
          </div>
        ) : (
          <section className="rounded-[32px] border border-beige/70 bg-white/80 p-6 shadow-warm-sm sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sage-dark">Collections ready to explore</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-earth">Pick a collection and step into the full experience.</h2>
                <p className="mt-3 text-base leading-7 text-earth/70">Each collection below is presented as a customer-facing discovery card so browsing feels effortless and inspiring.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-4 py-2 text-sm font-semibold text-sage-dark">
                <ShoppingBag className="h-4 w-4" />
                {visibleCategories.length} collections available
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              {visibleCategories[0] && (
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-[32px] border border-beige/70 bg-cream/70 shadow-warm-sm"
                >
                  <div className="relative h-[320px] overflow-hidden">
                    <img src={visibleCategories[0].image} alt={visibleCategories[0].name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                      <Layers3 className="h-4 w-4" />
                      {visibleCategories[0].productCount || 0} products
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                        <Sparkles className="h-4 w-4" />
                        Featured collection
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <div>
                      <h3 className="font-serif text-3xl font-semibold text-earth">{visibleCategories[0].name}</h3>
                      <p className="mt-2 text-sm leading-7 text-earth/70">{visibleCategories[0].description}</p>
                    </div>

                    <div className="rounded-[20px] border border-beige/70 bg-white/80 p-4 text-sm text-earth/70">
                      Perfect for gifting, styling, and statement décor — curated to feel effortless and elevated.
                    </div>

                    <div className="flex items-center justify-between border-t border-beige/70 pt-4">
                      <div className="flex items-center gap-2 text-sm text-earth/70">
                        <Compass className="h-4 w-4 text-sage" />
                        Ready for discovery
                      </div>
                      <button
                        onClick={() => handleExplore(visibleCategories[0].slug)}
                        className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white transition hover:bg-sage-dark"
                      >
                        Explore now
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {visibleCategories.slice(1).map((category, index) => (
                  <motion.article
                    key={category.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group overflow-hidden rounded-[24px] border border-beige/70 bg-white/80 shadow-sm"
                  >
                    <div className="flex h-full flex-col sm:flex-row">
                      <div className="h-40 sm:h-auto sm:w-36 overflow-hidden">
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-serif text-xl font-semibold text-earth">{category.name}</h3>
                          <span className="rounded-full bg-sage/10 px-2.5 py-1 text-xs font-semibold text-sage-dark">{category.productCount || 0} items</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-earth/70">{category.description}</p>
                        <button
                          onClick={() => handleExplore(category.slug)}
                          className="mt-4 inline-flex items-center gap-2 rounded-full border border-beige bg-cream/80 px-3 py-2 text-sm font-semibold text-earth transition hover:border-sage/40 hover:text-sage-dark"
                        >
                          Explore
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="rounded-[32px] border border-beige/70 bg-white/80 p-6 shadow-warm-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sage-dark">Available products</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-earth">Every piece in the collection is ready to bring home.</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-earth/70">This page now showcases the full catalog experience so visitors can browse the pieces and discover the beauty of each collection in one place.</p>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-4 py-2 text-sm font-semibold text-sage-dark transition hover:bg-sage/20"
            >
              Visit the shop
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {productsLoading ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-[24px] border border-beige/70 bg-cream/60" />
              ))}
            </div>
          ) : productsError ? (
            <div className="mt-8 rounded-[24px] border border-terracotta/20 bg-terracotta/10 p-5 text-sm text-earth/70">{productsError}</div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {catalogProducts.map((product) => (
                <ProductCard key={product._id || product.name} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {storyCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[24px] border border-beige/70 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(248,241,228,0.9))] p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 text-sage">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-earth">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-earth/70">{card.body}</p>
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
};
