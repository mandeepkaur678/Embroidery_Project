import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { Heart, Sparkles, Leaf, ShieldCheck } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Heart,
    title: "Handmade Craftsmanship",
    description: "Every embroidery piece is carefully crafted by skilled hands with attention to every stitch."
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Premium Quality",
    description: "We use carefully selected materials and quality threads to create pieces made to last."
  },
  {
    id: 3,
    icon: Leaf,
    title: "Nature Inspired",
    description: "Our designs take inspiration from flowers, leaves, and the natural beauty around us."
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Safe & Secure Shopping",
    description: "Enjoy a smooth and secure shopping experience from browsing to checkout."
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream-light border-b border-beige/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sage bg-sage/10 px-3.5 py-1 rounded-full border border-sage/20">
            OUR PROMISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mocha tracking-tight">
            Why Choose Thread & Roots?
          </h2>
          <p className="text-base sm:text-lg text-charcoal/70 font-normal leading-relaxed">
            Every piece is thoughtfully crafted to bring the beauty of handmade embroidery into your everyday life.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="group border-beige bg-white hover:border-sage transition-all duration-300 hover:shadow-warm-md"
              >
                <CardHeader className="pt-8 pb-4">
                  <div className="w-14 h-14 rounded-2xl bg-cream border border-beige/60 flex items-center justify-center text-mocha group-hover:bg-sage group-hover:text-white group-hover:border-sage transition-all duration-300 shadow-sm mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-mocha group-hover:text-sage-dark transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <CardDescription className="text-sm text-charcoal/75 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
