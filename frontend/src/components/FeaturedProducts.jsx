import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Heart, ShoppingBag, Zap, ArrowRight, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
  {
    _id: 'featured-1',
    name: 'Floral Embroidery Hoop',
    price: 480,
    rating: 4.9,
    tag: 'Best Seller',
    description: 'Hand-stitched wild garden florals on organic unbleached linen with a natural wooden hoop.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
  },
  {
    _id: 'featured-2',
    name: 'Handcrafted Floral Tote',
    price: 650,
    rating: 5.0,
    tag: 'Artisan Pick',
    description: 'Durable canvas tote bag adorned with intricate botanical embroidery details.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
  },
  {
    _id: 'featured-3',
    name: 'Personalized Embroidered Pouch',
    price: 340,
    rating: 4.8,
    tag: 'Customizable',
    description: 'Custom zippered linen pouch personalized with elegant hand-embroidered initials.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop',
  },
  {
    _id: 'featured-4',
    name: 'Botanical Embroidery Frame',
    price: 520,
    rating: 4.9,
    tag: 'Wall Art',
    description: 'Framed textile wall art featuring handcrafted monstera & fern threadwork.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop',
  },
];

export const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState(['featured-1', 'featured-3']);
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleBuyNow = (product) => {
    buyNow(product, 1);
    navigate('/checkout?direct=true');
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full border border-terracotta/20">
            Featured Collection
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-earth tracking-tight">
            Made For You
          </h2>

          <p className="text-earth-muted text-base sm:text-lg font-normal leading-relaxed">
            Explore handcrafted pieces created to add warmth, beauty, and personality to your everyday moments.
          </p>

          <div className="w-24 h-0.5 mx-auto stitch-border-dashed mt-6 opacity-60" />
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => {
            const isFavorite = wishlist.includes(product._id);
            return (
              <Card
                key={product._id}
                className="group overflow-hidden bg-white/90 border-beige/80 hover:border-sage transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-md flex flex-col justify-between"
              >
                <div>
                  {/* Product Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-beige/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-sage-dark border border-beige/60">
                      {product.tag}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                        isFavorite
                          ? 'bg-terracotta text-white shadow-warm-sm'
                          : 'bg-white/80 text-earth-muted hover:text-terracotta hover:bg-white'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Card Info Content */}
                  <CardContent className="p-5 pt-4">
                    <div className="flex items-center justify-between text-xs text-earth-muted mb-1.5">
                      <div className="flex items-center gap-1 text-amber-600 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                      <span className="font-serif italic text-sage-dark">Artisan Craft</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-earth group-hover:text-sage-dark transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-earth-muted leading-relaxed mt-1.5 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-3 text-xl font-bold font-serif text-earth">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </CardContent>
                </div>

                {/* Card Footer Buttons */}
                <CardFooter className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(product, 1)}
                    className="w-full justify-center border-sage/60 text-sage-dark hover:bg-sage hover:text-white transition-colors text-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                    <span>Add</span>
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleBuyNow(product)}
                    className="w-full justify-center bg-terracotta hover:bg-terracotta-dark text-white transition-colors text-xs"
                  >
                    <Zap className="w-3.5 h-3.5 mr-1" />
                    <span>Buy Now</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* View All Products CTA Button */}
        <div className="mt-14 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/shop')}
            className="shadow-warm-md hover:scale-102 bg-sage hover:bg-sage-dark text-cream"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
