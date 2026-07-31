import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'sonner';

export const ProductDetailModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, buyNow } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const {
    _id,
    id,
    name,
    description,
    category,
    price,
    originalPrice,
    discountPercent,
    images = [],
    rating = 4.9,
    reviewsCount = 18,
    stock = 10,
    sizes = [],
    colors = [],
    material = 'Handcrafted Linen & Thread',
    isActive = true,
    status = 'Active',
  } = product;

  const pId = _id || id;
  const inWishlist = isInWishlist(pId);
  const isAvailable = isActive !== false && status !== 'Inactive' && stock > 0;

  // Selected image gallery state
  const imageList = Array.isArray(images) && images.length > 0
    ? images
    : [product.image || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800'];

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [selectedSize, setSelectedSize] = useState(Array.isArray(sizes) && sizes.length > 0 ? sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState(Array.isArray(colors) && colors.length > 0 ? colors[0] : '');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add products to your cart');
      onClose();
      navigate('/login');
      return;
    }
    if (!isAvailable) {
      toast.error('This item is currently unavailable');
      return;
    }
    addToCart({ ...product, selectedSize, selectedColor }, quantity);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase products');
      onClose();
      navigate('/login');
      return;
    }
    if (!isAvailable) {
      toast.error('This item is currently unavailable');
      return;
    }
    const success = buyNow({ ...product, selectedSize, selectedColor }, quantity);
    if (success !== false) {
      onClose();
      navigate('/checkout?direct=true');
    }
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage your wishlist');
      onClose();
      navigate('/login');
      return;
    }
    toggleWishlist(product);
  };

  const categoryName = typeof category === 'object' ? category?.name : category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-earth/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Overlay backdrop */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative bg-cream border border-beige rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-warm-lg z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-2xl bg-ivory border border-beige text-earth hover:text-terracotta hover:border-terracotta/40 transition-all cursor-pointer shadow-warm-sm z-20"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-3">
            {/* Main Featured Image */}
            <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-ivory border border-beige shadow-inner-sm">
              <img
                src={selectedImage}
                alt={name}
                className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              />

              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full shadow-warm-sm">
                  {discountPercent}% OFF
                </div>
              )}

              <button
                onClick={handleWishlistToggle}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
                  inWishlist
                    ? 'bg-terracotta text-white shadow-warm-sm'
                    : 'bg-cream/90 text-earth hover:text-terracotta border border-beige/60'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {imageList.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {imageList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === imgUrl
                        ? 'border-sage ring-2 ring-sage/30 scale-105'
                        : 'border-beige opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="md:col-span-6 space-y-5">
            {/* Header Info */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-sage bg-sage/10 px-2.5 py-0.5 rounded-full border border-sage/20">
                  {categoryName || 'Embroidery Art'}
                </span>
                {material && (
                  <span className="text-muted bg-beige/50 px-2 py-0.5 rounded-md font-medium">
                    {material}
                  </span>
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth leading-tight">
                {name}
              </h2>

              {/* Rating & Stock Badge */}
              <div className="flex items-center gap-3 text-xs pt-1">
                <div className="flex items-center gap-1 text-gold font-bold">
                  <Star className="w-4 h-4 fill-gold" />
                  <span className="text-earth">{rating}</span>
                  <span className="text-muted font-normal">({reviewsCount} reviews)</span>
                </div>

                <span className="text-beige-dark">•</span>

                <div className="flex items-center gap-1 font-bold">
                  {stock > 0 ? (
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      In Stock ({stock})
                    </span>
                  ) : (
                    <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 p-3.5 bg-ivory border border-beige/80 rounded-2xl">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-earth">
                ₹{price?.toLocaleString()}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-muted line-through font-medium">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-earth/80 leading-relaxed">
              {description}
            </p>

            {/* Sizes Selector */}
            {Array.isArray(sizes) && sizes.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-earth">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-sage text-cream border-sage shadow-warm-sm'
                          : 'bg-ivory text-earth border-beige hover:border-sage/40'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selector */}
            {Array.isArray(colors) && colors.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-earth">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-earth text-cream border-earth shadow-warm-sm'
                          : 'bg-ivory text-earth border-beige hover:border-earth/40'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 pt-1">
              <label className="text-xs font-bold uppercase tracking-wider text-earth">
                Quantity
              </label>
              <div className="flex items-center border border-beige bg-ivory rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 rounded-lg hover:bg-beige/50 text-earth transition-colors cursor-pointer"
                  title="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-earth">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(stock || 99, q + 1))}
                  className="p-1 rounded-lg hover:bg-beige/50 text-earth transition-colors cursor-pointer"
                  title="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="py-3 rounded-2xl bg-sage/15 border border-sage/40 text-sage-dark hover:bg-sage hover:text-cream active:scale-95 transition-all duration-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className="py-3 rounded-2xl bg-terracotta text-cream hover:bg-terracotta-dark active:scale-95 transition-all duration-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-warm-sm disabled:opacity-50 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Guarantee / Features list */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-beige/60 text-[11px] text-muted font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                <span>100% Handcrafted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sage shrink-0" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-sage shrink-0" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
