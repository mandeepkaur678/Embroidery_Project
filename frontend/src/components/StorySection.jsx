import React from 'react';
import { Button } from './ui/Button';
import { Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';

export const StorySection = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-cream-card relative border-t border-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-dark bg-sage/15 px-3.5 py-1 rounded-full border border-sage/30">
            Our Origins
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-earth tracking-tight mt-3">
            The Story Behind Artful Stitches
          </h2>
          <div className="w-20 h-0.5 mx-auto stitch-border-dashed mt-4 opacity-70" />
        </div>

        {/* Two-Column Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Artisan Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-terracotta/10 rounded-[2.5rem] transform rotate-2" />
              
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-warm-lg">
                <img 
                  src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=900&auto=format&fit=crop" 
                  alt="Hands carefully stitching a botanical embroidery pattern"
                  className="w-full h-[420px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-104"
                />

                {/* Floating Quote Tag */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-beige shadow-warm-sm flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-terracotta" />
                  <span className="text-xs font-semibold text-earth">Stitched by Skilled Artisans</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Story Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-earth leading-snug">
              Stitched With Passion, <br className="hidden sm:inline" />
              <span className="text-terracotta italic">Created With Purpose</span>
            </h3>

            <div className="space-y-4 text-earth-muted text-base sm:text-lg leading-relaxed">
              <p>
                Artful Stitches was born from a love for handmade artistry and the timeless beauty of embroidery. Every design begins with an idea and comes to life through careful stitching, creative details, and a deep appreciation for craftsmanship.
              </p>
              <p>
                From delicate floral patterns to personalized creations, we believe that handmade pieces have a special way of telling stories, celebrating moments, and becoming part of the memories we cherish.
              </p>
            </div>

            {/* Decorative Stitch Line */}
            <div className="w-full h-0.5 stitch-border-dashed opacity-50 my-6" />

            {/* CTA Button */}
            <div className="pt-2">
              <Button variant="secondary" size="lg" className="shadow-warm-md">
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
