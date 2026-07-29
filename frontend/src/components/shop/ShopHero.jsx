import React from 'react';
import { Sparkles, Scissors } from 'lucide-react';

export const ShopHero = () => {
  return (
    <section className="relative overflow-hidden bg-ivory py-14 sm:py-16 md:py-20 border-b border-beige/80">
      {/* Decorative Warm Background Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none subtle-grid-bg" />

      {/* Decorative Organic Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Small Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream border border-beige text-xs font-semibold uppercase tracking-wider text-sage shadow-warm-sm mb-5">
          <Scissors className="w-3.5 h-3.5 text-gold rotate-45" />
          <span>Handcrafted Collection</span>
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-earth mb-4">
          Shop Our Collection
        </h1>

        {/* Decorative Stitch Divider Line */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="w-12 h-px bg-sand" />
          <div className="w-2 h-2 rounded-full bg-sage" />
          <div className="w-16 h-[2px] stitch-border-dashed" />
          <div className="w-2 h-2 rounded-full bg-terracotta" />
          <div className="w-12 h-px bg-sand" />
        </div>

        {/* Supporting Text */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-charcoal/90 leading-relaxed font-normal">
          Discover beautiful embroidery pieces, handcrafted with love and care using natural linen and organic cotton threads.
        </p>

        {/* Subtle Category Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
          {['100% Handmade', 'Botanical Motifs', 'Custom Orders', 'Free Shipping over ₹999'].map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-cream/80 border border-beige text-muted flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
