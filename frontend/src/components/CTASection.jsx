import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { ShoppingBag, Sparkles, Heart } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream border-b border-beige/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Full-width Mocha Banner Container */}
        <div className="relative rounded-3xl bg-[#6B4F3A] text-cream p-8 sm:p-12 lg:p-16 overflow-hidden shadow-warm-lg border border-beige/30 text-center">

          {/* Decorative Pattern Backdrop */}
          <div className="absolute inset-0 opacity-10 embroidery-pattern pointer-events-none" />

          {/* Subtle Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-beige/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sage/20 rounded-full blur-3xl pointer-events-none" />

          {/* Stitched Border Framing */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">

            {/* Top Accent Icon */}
            <div className="inline-flex items-center space-x-2 bg-sage/20 text-cream px-4 py-1.5 rounded-full border border-sage/40 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-beige" />
              <span>HANDCRAFTED WITH PRECISION</span>
              <Heart className="w-3.5 h-3.5 text-sage fill-sage" />
            </div>

            {/* Main CTA Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream tracking-tight leading-tight">
              Bring Handmade Beauty Into Your Everyday
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-cream/90 font-normal leading-relaxed max-w-2xl mx-auto">
              Explore our collection of thoughtfully crafted embroidery pieces and find something made especially for you.
            </p>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-sage hover:bg-sage-dark text-white font-semibold shadow-xl group px-8"
                >
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>Shop Now</span>
                </Button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-cream/50 text-cream hover:bg-cream hover:text-[#6B4F3A] font-medium"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Bottom Guarantee Note */}
            <p className="text-xs text-cream font-serif italic">
              ✦ Free shipping on orders over $75 &bull; Worldwide Delivery Available ✦
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
