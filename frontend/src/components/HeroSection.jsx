import React from 'react';
import { Button } from './ui/Button';
import { Sparkles, ArrowRight, Heart, Feather } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-cream py-12 md:py-20 lg:py-24 border-b border-beige/40 subtle-grid-bg">
      {/* Decorative Floating Thread Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-sage/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-beige/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-sage-dark text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <Heart className="w-3.5 h-3.5 text-sage fill-sage/40" />
              <span>HANDCRAFTED WITH LOVE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-mocha tracking-tight leading-[1.15]">
              Crafted by Hands, <br className="hidden sm:inline" />
              <span className="text-sage font-italic italic font-normal">Inspired by Nature</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover beautifully handcrafted embroidery pieces created with traditional techniques, natural inspiration, and timeless craftsmanship.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button 
                variant="default" 
                size="lg" 
                className="w-full sm:w-auto group shadow-warm-md"
                onClick={() => {
                  const element = document.getElementById('collections');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-mocha/30 text-mocha hover:bg-beige-subtle"
                onClick={() => {
                  const element = document.getElementById('about');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Our Story</span>
              </Button>
            </div>

            {/* Social Trust Badges */}
            <div className="pt-8 border-t border-beige/40 flex items-center justify-center lg:justify-start space-x-6 text-xs text-charcoal/70">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-sage" />
                <span>100% Cotton & Linen Threads</span>
              </div>
              <div className="h-4 w-px bg-beige/60" />
              <div className="flex items-center space-x-2">
                <Feather className="w-4 h-4 text-mocha" />
                <span>Eco-Friendly Packaging</span>
              </div>
            </div>
          </div>

          {/* Right Column Showcase Image with Embroidery Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Outer Decorative Hoop Ring */}
            <div className="relative w-full max-w-md aspect-square rounded-full p-4 border-4 border-dashed border-beige bg-cream-dark/60 shadow-warm-lg flex items-center justify-center">
              
              {/* Inner Main Image Container */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner relative group">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"
                  alt="Handmade floral embroidery hoop with intricate natural thread work on cream fabric"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mocha/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating Leaf / Craft Badge 1 */}
              <div className="absolute -top-3 -right-3 bg-white px-4 py-2 rounded-2xl shadow-warm-md border border-beige/60 flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-sage animate-ping" />
                <span className="text-xs font-semibold text-mocha font-serif">100% Hand-Stitched</span>
              </div>

              {/* Floating Craft Badge 2 */}
              <div className="absolute -bottom-4 -left-2 bg-cream-light px-4 py-2.5 rounded-2xl shadow-warm-md border border-beige/60 flex items-center space-x-2">
                <span className="text-sm">🌿</span>
                <span className="text-xs font-medium text-charcoal">Botanical & Floral Art</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
