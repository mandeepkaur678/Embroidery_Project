import React from 'react';
import { Leaf, Truck, PackageCheck, ShieldCheck, Headphones } from 'lucide-react';

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Leaf,
      title: 'Handcrafted with Love',
      description: 'Every piece is handmade with care.',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹999.',
    },
    {
      icon: PackageCheck,
      title: 'Easy Returns',
      description: 'Simple and hassle-free returns.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Safe and secure payment options.',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: "We're here to help you anytime.",
    },
  ];

  return (
    <section className="py-12 bg-ivory border-t border-beige/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream border border-beige rounded-2xl p-6 sm:p-8 shadow-warm-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-beige/80">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`flex flex-col items-center text-center space-y-2.5 ${idx > 0 ? 'pt-5 sm:pt-0 lg:pl-4' : ''
                    }`}
                >
                  <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center transition-transform hover:scale-110 duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-earth">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-muted max-w-[200px] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
