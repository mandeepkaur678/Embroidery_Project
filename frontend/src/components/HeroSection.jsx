import React from 'react';
import { Button } from './ui/Button';
import { Heart, Sparkles, ArrowRight, Compass } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-cream pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle Background Decorative Organic Blobs */}
      <div className="absolute top-10 left-[-5%] w-72 h-72 rounded-full bg-beige/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 right-[-5%] w-96 h-96 rounded-full bg-olive/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-7 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-sage-dark text-xs sm:text-sm font-medium animate-fadeIn">
              <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
              <span>Handcrafted With Love</span>
            </div>

            {/* Large Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-earth tracking-tight leading-[1.12]">
              Where Every Stitch <br className="hidden sm:inline" />
              <span className="text-sage-dark italic font-normal relative inline-block">
                Tells a Story
                {/* Decorative underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-terracotta/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-earth-muted text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              Discover timeless embroidery crafted by hand, where delicate threads, thoughtful designs, and artistic details come together to create something truly special.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a href="#products" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-warm-md hover:scale-102">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              
              <a href="#story" className="w-full sm:w-auto">
                <Button variant="outlineTerracotta" size="lg" className="w-full sm:w-auto">
                  <Compass className="w-4 h-4 mr-1.5 text-terracotta" />
                  <span>Discover Our Story</span>
                </Button>
              </a>
            </div>

            {/* Trust / Brand Statement */}
            <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-earth-light font-medium tracking-wide">
              <span className="text-sage-dark font-semibold">Handcrafted</span>
              <span className="text-terracotta">•</span>
              <span className="text-sage-dark font-semibold">Thoughtfully Designed</span>
              <span className="text-terracotta">•</span>
              <span className="text-sage-dark font-semibold">Made With Love</span>
            </div>

          </div>

          {/* RIGHT SIDE: Large Embroidery Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Background Blob Frame */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Organic Soft Backing */}
              <div className="absolute inset-0 bg-beige/60 rounded-[2.5rem] transform rotate-3 scale-98 transition-transform duration-500 hover:rotate-1" />
              
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-warm-lg bg-cream group">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
                  alt="Artisan floral embroidery hoop handcrafted with natural thread"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth/20 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Decorative Badge */}
              <div className="absolute -bottom-5 -left-5 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-beige shadow-warm-md flex items-center gap-3 animate-float-slow">
                <div className="w-11 h-11 rounded-xl bg-terracotta/15 flex items-center justify-center text-terracotta">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-earth-muted font-medium">100% Artisan</div>
                  <div className="font-serif font-bold text-earth text-sm sm:text-base">Handmade with Love</div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-sage text-white px-3.5 py-2 rounded-full text-xs font-semibold shadow-warm-sm flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Custom Embroidery</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
