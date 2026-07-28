import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Heart, Eye, ArrowRight, Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Floral Embroidery Hoop",
    price: 48.00,
    rating: 4.9,
    tag: "Best Seller",
    description: "Hand-stitched wild garden florals on organic unbleached linen with a natural wooden hoop.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Handcrafted Floral Tote",
    price: 65.00,
    rating: 5.0,
    tag: "Artisan Pick",
    description: "Durable canvas tote bag adorned with intricate botanical embroidery details.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Personalized Embroidered Pouch",
    price: 34.00,
    rating: 4.8,
    tag: "Customizable",
    description: "Custom zippered linen pouch personalized with elegant hand-embroidered initials.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Botanical Embroidery Frame",
    price: 52.00,
    rating: 4.9,
    tag: "Wall Art",
    description: "Framed textile wall art featuring handcrafted monstera & fern threadwork.",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"
  }
];

export const FeaturedProducts = ({ onAddToCart }) => {
  const [wishlist, setWishlist] = useState([1, 3]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(itemId => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
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
            const isFavorite = wishlist.includes(product.id);
            return (
              <Card 
                key={product.id}
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
                      onClick={() => toggleWishlist(product.id)}
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
                      ${product.price.toFixed(2)}
                    </div>
                  </CardContent>
                </div>

                {/* Card Footer Button */}
                <CardFooter className="p-5 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center border-sage/60 text-sage-dark hover:bg-sage hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    <span>View Product</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* View All Products CTA Button */}
        <div className="mt-14 text-center">
          <Button variant="primary" size="lg" className="shadow-warm-md hover:scale-102">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};
