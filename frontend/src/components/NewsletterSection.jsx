import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-20 bg-sage relative overflow-hidden text-cream">
      {/* Decorative Thread Pattern Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 border-4 border-dashed border-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 border-4 border-dashed border-white/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-cream text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-beige" />
          <span>Join Our Creative Community</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Let's Create Something Beautiful Together
        </h2>

        {/* Description */}
        <p className="text-cream/90 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Stay inspired with new embroidery designs, handcrafted collections, and creative stories from Artful Stitches.
        </p>

        {/* Form Container */}
        {subscribed ? (
          <div className="bg-white/15 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-lg mx-auto flex items-center justify-center gap-3 text-white animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 text-beige shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              Thank you for subscribing! Welcome to the Artful Stitches family.
            </span>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
          >
            <div className="relative w-full">
              <Mail className="w-5 h-5 text-earth-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-cream text-earth placeholder-earth-muted text-sm shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-beige"
              />
            </div>
            
            <Button 
              type="submit"
              variant="secondary" 
              size="lg"
              className="w-full sm:w-auto shrink-0 py-3.5 px-8 shadow-warm-md hover:bg-terracotta-dark"
            >
              Subscribe
            </Button>
          </form>
        )}

        <div className="mt-6 text-xs text-cream/70">
          No spam, ever. Unsubscribe anytime with one click.
        </div>

      </div>
    </section>
  );
};
