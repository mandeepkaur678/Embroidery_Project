
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Compass, Flower2, Heart, Leaf, Palette, Sparkles, Star, Scissors, Gem, HandHeart, Shirt, Home, Briefcase, PenTool, MessageCircleHeart } from 'lucide-react';
import { Button } from '../ui/Button';

const sectionShell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
const cardBase = 'group rounded-[28px] border border-beige/70 bg-white/70 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-24px_rgba(0,0,0,0.24)]';

export const AboutHero = ({ eyebrow, title, description, primaryHref, secondaryHref, image, alt }) => {
  return (
    <section className="relative overflow-hidden border-b border-beige/80 bg-[linear-gradient(135deg,rgba(250,248,243,0.95),rgba(245,241,232,0.9))]">
      <div className={`${sectionShell} py-16 sm:py-20 lg:py-24`}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-cream px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-earth sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-charcoal/80">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={primaryHref}>
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  Explore Our Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to={secondaryHref}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-sage/50 text-sage-dark hover:bg-sage/10">
                  Discover Our Story
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-charcoal/70">
              <span className="flex items-center gap-2 rounded-full border border-beige/70 bg-white/70 px-3 py-2">
                <Heart className="h-4 w-4 text-terracotta" /> Handmade with heart
              </span>
              <span className="flex items-center gap-2 rounded-full border border-beige/70 bg-white/70 px-3 py-2">
                <Leaf className="h-4 w-4 text-sage" /> Thoughtfully crafted pieces
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-[32px] border border-sage/20 bg-sage/10" />
            <img
              src={image}
              alt={alt}
              className="relative h-[420px] w-full rounded-[32px] border border-beige/70 object-cover shadow-[0_32px_90px_-36px_rgba(0,0,0,0.35)]"
            />
            <div className="absolute bottom-4 right-4 rounded-full border border-white/80 bg-white/80 p-3 shadow-lg backdrop-blur">
              <Scissors className="h-5 w-5 rotate-45 text-terracotta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const OurStory = ({ title, description, image, alt }) => {
  return (
    <section id="story" className={`${sectionShell} py-20 sm:py-24`}>
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
            <Compass className="h-3.5 w-3.5" />
            Our Story
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-earth sm:text-4xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-charcoal/80">{description}</p>
          <div className="mt-8 rounded-[24px] border border-beige/70 bg-cream/70 p-6 text-sm leading-7 text-charcoal/80">
            <p>
              Each piece is created with patience, reverence for tradition, and a sincere desire to make everyday objects feel meaningful.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-[32px] border border-beige/70 bg-white/70 p-3 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.2)]">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="h-[420px] w-full rounded-[24px] object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const OurCraft = ({ features }) => {
  return (
    <section id="craft" className="bg-[linear-gradient(180deg,rgba(245,241,232,0.8),rgba(250,248,243,0.95))] py-20 sm:py-24">
      <div className={`${sectionShell}`}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
            <Palette className="h-3.5 w-3.5" />
            The Art Behind Every Stitch
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">The Art Behind Every Stitch</h2>
          <p className="mt-4 text-lg leading-8 text-charcoal/75">
            We blend heritage techniques with contemporary elegance to create pieces that feel both timeless and personal.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className={`${cardBase} flex h-full flex-col`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-earth">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/75">{feature.description}</p>
                <div className="mt-auto pt-5 text-xs uppercase tracking-[0.2em] text-terracotta">0{index + 1}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const SpecialFeatures = ({ features }) => {
  return (
    <section className={`${sectionShell} py-20 sm:py-24`}>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-beige/70 bg-sage/10 p-8 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
            <BadgeCheck className="h-3.5 w-3.5" />
            What Makes Us Special
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">What Makes Our Embroidery Special</h2>
          <p className="mt-4 text-lg leading-8 text-charcoal/75">
            The beauty of our work lies in how every thread, texture, and detail comes together into something intentional and enduring.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={`${cardBase} flex items-start gap-4`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-charcoal/70">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const CollectionsPreview = ({ collections }) => {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className={`${sectionShell}`}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
            <Flower2 className="h-3.5 w-3.5" />
            Explore Our Collections
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">Explore Our Collections</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[28px] border border-beige/70 bg-white/80 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.24)]">
              <img src={item.image} alt={item.title} loading="lazy" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-earth">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.description}</p>
                <Link to={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition hover:gap-3">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const OurValues = ({ values }) => {
  return (
    <section className={`${sectionShell} py-20 sm:py-24`}>
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
          <Gem className="h-3.5 w-3.5" />
          What We Believe In
        </div>
        <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">What We Believe In</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className={`${cardBase}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-earth">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const CustomEmbroideryCTA = ({ image, alt }) => {
  return (
    <section id="custom-embroidery" className={`${sectionShell} py-20 sm:py-24`}>
      <div className="grid items-center gap-8 overflow-hidden rounded-[36px] border border-beige/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(245,241,232,0.95))] p-6 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.2)] sm:p-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
            <PenTool className="h-3.5 w-3.5" />
            Custom Embroidery
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">Have a Design in Mind?</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-charcoal/75">
            We welcome personal stories, heirloom motifs, and bespoke ideas. Share your inspiration and we’ll help turn it into something beautifully stitched.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/custom-embroidery">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Request Custom Design
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full border-sage/50 text-sage-dark hover:bg-sage/10 sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
        <img src={image} alt={alt} loading="lazy" className="h-[320px] w-full rounded-[28px] border border-beige/70 object-cover" />
      </div>
    </section>
  );
};

export const WhyChooseUs = ({ benefits }) => {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(250,248,243,0.95),rgba(245,241,232,0.8))] py-20 sm:py-24">
      <div className={`${sectionShell}`}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
            <Heart className="h-3.5 w-3.5" />
            Why Choose Us?
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">Why Choose Us?</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className={`${cardBase}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-earth">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const AboutStats = ({ stats }) => {
  return (
    <section className={`${sectionShell} py-20 sm:py-24`}>
      <div className="overflow-hidden rounded-[36px] border border-beige/70 bg-[#2C332A] p-8 sm:p-10 lg:p-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-white/10 bg-white/10 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-semibold text-beige sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-cream/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AboutCTA = ({ title, description, primaryHref, secondaryHref }) => {
  return (
    <section className="pb-20 sm:pb-24">
      <div className={`${sectionShell}`}>
        <div className="rounded-[36px] border border-beige/70 bg-white/80 p-8 text-center shadow-[0_24px_80px_-28px_rgba(0,0,0,0.2)] sm:p-10 lg:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
              <MessageCircleHeart className="h-3.5 w-3.5" />
              Discover More
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-earth sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-8 text-charcoal/75">{description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to={primaryHref}>
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to={secondaryHref}>
                <Button variant="outline" size="lg" className="w-full border-sage/50 text-sage-dark hover:bg-sage/10 sm:w-auto">
                  Explore Custom Embroidery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
