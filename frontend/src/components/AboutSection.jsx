import React from 'react';
import { Button } from './ui/Button';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-sage/10 relative overflow-hidden border-b border-beige/40">
      
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-beige/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Image Showcase */}
          <div className="lg:col-span-6 relative">
            
            {/* Stitched Border Frame Effect */}
            <div className="relative rounded-3xl overflow-hidden p-3 bg-white border border-beige shadow-warm-lg">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
                  alt="Craftsperson hands embroidering intricate floral pattern on natural linen fabric"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute bottom-8 right-8 bg-mocha text-cream p-4 rounded-2xl shadow-xl max-w-xs flex items-center space-x-3 border border-beige/40">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-sage-light" />
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-white">100% Authentic</div>
                  <div className="text-xs text-beige">Hand-stitched with love</div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Stitch Motif */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-dashed border-sage/60 rounded-bl-2xl pointer-events-none" />
          </div>

          {/* Right Column Brand Story Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Label */}
            <span className="text-xs font-bold uppercase tracking-widest text-mocha bg-beige/40 px-3.5 py-1.5 rounded-full border border-beige">
              OUR STORY
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-mocha tracking-tight leading-tight">
              Threads That Tell a Story
            </h2>

            {/* Story Paragraphs */}
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
              At <strong className="text-mocha font-semibold">Thread & Roots</strong>, we believe that true art takes time, patience, and heart. What started as a passion for preserving traditional needlework has grown into a studio dedicated to creating heirloom-quality embroidery pieces inspired by the beauty of nature.
            </p>

            <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
              We seamlessly combine time-honored stitching craftsmanship with modern aesthetic designs. Every thread is selected for its lustre and durability, ensuring that every canvas, hoop, and bag carries a sense of warmth and natural elegance.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Sustainably sourced fabrics",
                "Hand-drawn botanical patterns",
                "Custom color palettes",
                "Heirloom-grade thread longevity"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />
                  <span className="text-sm font-medium text-charcoal/85">{item}</span>
                </div>
              ))}
            </div>

            {/* Learn More Action Button */}
            <div className="pt-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-mocha hover:bg-mocha-dark text-cream shadow-warm-md group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
