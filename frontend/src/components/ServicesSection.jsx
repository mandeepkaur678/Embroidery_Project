import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';

import { Scissors, Heart, Flower2, Gift, ArrowUpRight } from 'lucide-react';


const services = [
  {
    id: 1,

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
  }

];

export const ServicesSection = () => {
  return (
    <>
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
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                </Card>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};
