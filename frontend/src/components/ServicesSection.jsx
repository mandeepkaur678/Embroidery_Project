import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
<<<<<<< HEAD
import { Scissors, Heart, Flower2, Gift, ArrowUpRight } from 'lucide-react';
=======
import { Heart, Sparkles, Leaf, ShieldCheck } from 'lucide-react';
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481

const services = [
  {
    id: 1,
<<<<<<< HEAD
    title: "Custom Embroidery",
    description: "Turn your ideas into unique embroidered designs created especially for you.",
    icon: Scissors,
    tag: "Tailored"
  },
  {
    id: 2,
    title: "Personalized Designs",
    description: "Add a personal touch with custom names, initials, patterns, and meaningful details.",
    icon: Heart,
    tag: "Bespoke"
  },
  {
    id: 3,
    title: "Handcrafted Collections",
    description: "Explore our curated collection of beautifully handmade embroidery pieces.",
    icon: Flower2,
    tag: "Curated"
  },
  {
    id: 4,
    title: "Gift & Special Orders",
    description: "Create thoughtful handmade gifts for birthdays, celebrations, weddings, and special moments.",
    icon: Gift,
    tag: "Keepsake"
=======
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
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
  }
];

export const ServicesSection = () => {
  return (
<<<<<<< HEAD
    <section id="services" className="py-16 md:py-24 bg-cream-card relative border-t border-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sage/15 text-sage-dark text-xs font-semibold tracking-wider uppercase">
            <span>Our Offerings</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-earth tracking-tight">
            What We Create
          </h2>
          
          <p className="text-earth-muted text-base sm:text-lg font-normal leading-relaxed">
            Thoughtfully crafted embroidery services designed to bring your ideas to life.
          </p>

          <div className="w-24 h-0.5 mx-auto stitch-border-dashed mt-6 opacity-60" />
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id}
                className="group relative bg-white/90 border-beige hover:border-sage transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-md flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pt-8 pb-3">
                    {/* Sage Green Icon Container */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-13 h-13 rounded-2xl bg-sage/15 border border-sage/30 flex items-center justify-center text-sage-dark group-hover:bg-sage group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <IconComponent className="w-6 h-6 transition-transform group-hover:rotate-6" />
                      </div>
                      
                      <span className="text-[11px] font-semibold text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {service.tag}
                      </span>
                    </div>

                    {/* Service Title */}
                    <CardTitle className="text-xl font-bold text-earth group-hover:text-sage-dark transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <CardDescription className="text-earth-muted text-sm leading-relaxed font-normal">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </div>

                {/* Card Link Arrow */}
                <div className="px-6 pb-6 pt-0 flex items-center text-xs font-semibold text-sage-dark group-hover:text-terracotta transition-colors">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
=======
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
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
