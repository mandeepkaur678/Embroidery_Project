import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRight, Tag } from 'lucide-react';

const collections = [
  {
    id: 'floral',
    name: "Floral Embroidery",
    tagline: "Botanical & Meadow Art",
    description: "Delicate flowers, wildflowers, and botanical leaves stitched with vibrant natural silk & cotton threads.",
    itemCount: "24 Items",
    image: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=80",
    alt: "Floral embroidery hoop with wildflowers and botanical patterns"
  },
  {
    id: 'traditional',
    name: "Traditional Designs",
    tagline: "Heritage & Folk Techniques",
    description: "Time-honored stitching patterns and cultural motifs crafted with precision and deep artistic care.",
    itemCount: "18 Items",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
    alt: "Traditional hand embroidered fabric with heritage geometric pattern"
  },
  {
    id: 'modern',
    name: "Modern Embroidery",
    tagline: "Contemporary Wall & Wearable Art",
    description: "Minimalist line art, abstract shapes, and modern aesthetic hoops designed for contemporary spaces.",
    itemCount: "32 Items",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    alt: "Modern aesthetic hoop embroidery with minimalist botanical frame"
  }
];

export const CollectionSection = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="py-16 md:py-24 bg-cream border-b border-beige/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-sage bg-sage/10 px-3.5 py-1 rounded-full border border-sage/20">
              CURATED SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mocha tracking-tight">
              Explore Our Collections
            </h2>
            <p className="text-base text-charcoal/70 font-normal">
              Find handcrafted embroidery artwork designed to bring warmth, texture, and natural elegance into your home.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto border-[#6B4F3A] text-[#6B4F3A] hover:text-cream hover:bg-[#6B4F3A]">
            View All Collections
          </Button>
        </div>

        {/* 3 Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item) => (
            <Card
              key={item.id}
              className="group relative bg-white border border-beige/80 rounded-2xl overflow-hidden hover:shadow-warm-lg transition-all duration-500 flex flex-col justify-between"
            >
              {/* Card Image Container with Hover Overlay */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-cream-dark">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-mocha/85 via-mocha/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Badge Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold bg-cream/90 backdrop-blur-sm text-mocha px-3 py-1 rounded-full border border-beige shadow-sm">
                    <Tag className="w-3 h-3 text-sage" />
                    <span>{item.itemCount}</span>
                  </span>
                </div>

                {/* Overlay Text Content */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-cream">
                  <p className="text-xs font-medium uppercase tracking-wider text-beige mb-1 font-sans">
                    {item.tagline}
                  </p>
                  <h3 className="text-2xl font-bold font-serif text-white tracking-tight mb-1">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Card Body & Action */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-charcoal/75 leading-relaxed font-normal">
                  {item.description}
                </p>

                <Button
                  variant="secondary"
                  className="w-full justify-center group-hover:bg-mocha group-hover:text-cream transition-colors duration-300"
                  onClick={() => onSelectCollection?.(item.name)}
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
