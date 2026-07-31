import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart, buyNow } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const {
    _id,
    id,
    name,
    category,
    price,
    originalPrice,
    discountPercent,
    images = [],
    rating = 4.8,
    reviewsCount = 12,
    material,
  } = product;

  const pId = _id || id;
  const inWishlist = isInWishlist(pId);

  const imageUrl =
    (images && images[0]) ||
    product.image ||
    'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800';

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    buyNow(product, 1);
    navigate('/checkout?direct=true');
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
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'text-terracotta fill-terracotta' : 'group-hover:text-terracotta'
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Material Tag */}
          <div className="flex items-center justify-between text-[11px] font-medium text-muted mb-1">
            <span>{typeof category === 'object' ? category.name : category}</span>
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

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-beige/60 space-y-2">
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

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-sage/15 border border-sage/40 text-sage-dark hover:bg-sage hover:text-cream active:scale-95 transition-all duration-200 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-terracotta text-cream hover:bg-terracotta-dark active:scale-95 transition-all duration-200 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
