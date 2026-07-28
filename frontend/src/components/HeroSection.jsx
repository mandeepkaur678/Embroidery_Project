import React from 'react';
import { Button } from './ui/Button';
<<<<<<< HEAD
import { Heart, Sparkles, ArrowRight, Compass } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-cream pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle Background Decorative Organic Blobs */}
      <div className="absolute top-10 left-[-5%] w-72 h-72 rounded-full bg-beige/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 right-[-5%] w-96 h-96 rounded-full bg-olive/15 blur-3xl pointer-events-none" />
=======
import { Sparkles, ArrowRight, Heart, Feather } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-cream py-12 md:py-20 lg:py-24 border-b border-beige/40 subtle-grid-bg">
      {/* Decorative Floating Thread Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-sage/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-beige/20 rounded-full blur-3xl pointer-events-none" />
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
<<<<<<< HEAD
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

=======
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
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
