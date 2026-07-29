import React, { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { toast } from 'sonner';

export const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted = false }) => {
  const [inWishlist, setInWishlist] = useState(isWishlisted);

  const {
    name,
    category,
    price,
    originalPrice,
    discountPercent,
    images = [],
    rating = 4.8,
    reviewsCount = 12,
    material
  } = product;

  const imageUrl = images[0] || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800';

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const nextState = !inWishlist;
    setInWishlist(nextState);
    if (onToggleWishlist) onToggleWishlist(product, nextState);

    if (nextState) {
      toast.success('Added to Wishlist', {
        description: `${name} saved to your favorites.`
      });
    } else {
      toast.info('Removed from Wishlist');
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
    toast.success('Added to your basket!', {
      description: `${name} has been added to your shopping cart.`
    });
  };

  return (
    <div className="group bg-cream border border-beige/80 rounded-2xl p-3.5 sm:p-4 hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between h-full relative">

      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-ivory mb-3.5">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-sage text-cream text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full shadow-warm-sm">
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={`Add ${name} to wishlist`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-md border border-beige/60 flex items-center justify-center text-earth hover:text-terracotta transition-all duration-200 shadow-warm-sm active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${inWishlist ? 'text-terracotta fill-terracotta' : 'group-hover:text-terracotta'
              }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Material Tag */}
          <div className="flex items-center justify-between text-[11px] font-medium text-muted mb-1">
            <span>{category}</span>
            {material && <span className="text-[10px] bg-beige/50 px-2 py-0.5 rounded-md">{material}</span>}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-earth line-clamp-1 group-hover:text-sage transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-muted">
            <div className="flex items-center text-gold">
              <Star className="w-3.5 h-3.5 fill-gold" />
            </div>
            <span className="font-semibold text-earth">{rating}</span>
            <span>({reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-beige/60 flex items-center justify-between gap-2">
          {/* Price Display */}
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-earth">
              ₹{price?.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            className="bg-sage text-cream hover:bg-sage-dark active:scale-95 transition-all duration-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-warm-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  );
};
