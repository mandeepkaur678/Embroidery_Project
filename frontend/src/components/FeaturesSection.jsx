import React from 'react';
import { Sparkles, Heart, ShieldCheck, Feather } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Feather,
    title: "Handcrafted With Care",
    description: "Every piece is thoughtfully created with meticulous attention to detail and slow artisanal effort."
  },
  {
    id: 2,
    icon: Heart,
    title: "Unique & Personal",
    description: "Our designs are made to feel personal, meaningful, and special for you and your loved ones."
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Quality Materials",
    description: "We carefully select organic linen, premium cotton threads, and natural hoops for lasting results."
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Made With Love",
    description: "Every stitch carries creativity, passion, and the spirit of authentic handmade artistry."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Image Collage / Craft Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backing Card Decorative Border */}
              <div className="absolute inset-0 bg-beige/50 rounded-3xl transform -rotate-2" />

              {/* Main Collage Image */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-warm-lg">
                <img 
                  src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=900&auto=format&fit=crop" 
                  alt="Embroidery threads, needles, and floral fabric art"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 hover:scale-103"
                />
                
                {/* Embedded Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-beige shadow-warm-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">Artisan Guarantee</span>
                    <h4 className="font-serif font-bold text-earth text-sm sm:text-base">100% Hand-stitched Assurance</h4>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-bold text-xs">
                    ★ 5.0
                  </div>
                </div>
              </div>

              {/* Floating Thread Line Graphic Accent */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 border-2 border-dashed border-sage/40 rounded-full pointer-events-none" />

            </div>
          </div>

          {/* RIGHT SIDE: 4 Feature Items */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Header */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full border border-terracotta/20">
                Craft Excellence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-earth tracking-tight">
                Why Choose Artful Stitches?
              </h2>
              <p className="text-earth-muted text-base sm:text-lg">
                We believe in slow craft philosophy—creating timeless pieces that bring warmth, texture, and emotion into your daily space.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6 pt-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.id}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-beige/60 hover:bg-white hover:border-sage/50 transition-all duration-300 hover:shadow-warm-sm group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sage/15 border border-sage/30 flex items-center justify-center text-sage-dark group-hover:bg-sage group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-earth group-hover:text-sage-dark transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-earth-muted text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
