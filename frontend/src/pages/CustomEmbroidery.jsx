import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, Sparkles, Scissors, MessageCircleHeart } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';

export const CustomEmbroidery = () => {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Navbar cartCount={3} wishlistCount={2} />
      <main className="flex-grow">
        <section className="border-b border-beige/80 bg-[linear-gradient(135deg,rgba(250,248,243,0.95),rgba(245,241,232,0.9))]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
                  <PenTool className="h-3.5 w-3.5" />
                  Custom Embroidery
                </div>
                <h1 className="mt-6 text-4xl font-semibold leading-tight text-earth sm:text-5xl">
                  Bring Your Vision to Life in Thread
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-charcoal/80">
                  Whether you have a cherished motif, a special occasion in mind, or a design that needs a personal touch, we’d love to create something beautiful and meaningful for you.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/shop">
                    <Button variant="default" size="lg" className="w-full sm:w-auto">
                      Browse Collection
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="mailto:hello@artfulstitches.com">
                    <Button variant="outline" size="lg" className="w-full border-sage/50 text-sage-dark hover:bg-sage/10 sm:w-auto">
                      Email Our Studio
                    </Button>
                  </a>
                </div>
              </div>
              <div className="rounded-[32px] border border-beige/70 bg-white/80 p-4 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.2)]">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
                  alt="Custom embroidery design process"
                  className="h-[420px] w-full rounded-[24px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-beige/70 bg-white/70 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-earth">Share your inspiration</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/75">Tell us about your theme, colors, style, or a cherished memory you want turned into embroidery.</p>
            </div>
            <div className="rounded-[28px] border border-beige/70 bg-white/70 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                <Scissors className="h-6 w-6 rotate-45" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-earth">We shape the concept</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/75">We’ll guide the design direction, stitch styles, and finishing touches to make it feel personal and refined.</p>
            </div>
            <div className="rounded-[28px] border border-beige/70 bg-white/70 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                <MessageCircleHeart className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-earth">Your piece is created</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/75">Every custom order is stitched by hand with patience, care, and our signature artisanal detail.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
