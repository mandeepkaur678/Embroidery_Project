import React from 'react';
import { HandHeart, Sparkles, Palette, Star, Heart, ShieldCheck, Leaf, Flower2, BadgeCheck, MessageCircleHeart } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  AboutHero,
  OurStory,
  OurCraft,
  SpecialFeatures,
  CollectionsPreview,
  OurValues,
  CustomEmbroideryCTA,
  WhyChooseUs,
  AboutStats,
  AboutCTA,
} from '../components/about/AboutSections';

const craftFeatures = [
  {
    icon: HandHeart,
    title: 'Handcrafted with Care',
    description: 'Every piece is created with patience, attention, and a deep respect for the craft.',
  },
  {
    icon: Sparkles,
    title: 'Traditional Techniques',
    description: 'Inspired by heritage embroidery and timeless motifs that carry cultural warmth.',
  },
  {
    icon: Palette,
    title: 'Unique Designs',
    description: 'Each composition brings together texture, form, and artistic expression in a fresh way.',
  },
  {
    icon: Star,
    title: 'Made to Treasure',
    description: 'Beautiful handmade pieces designed to be enjoyed, gifted, and kept for years.',
  },
];

const specialFeatures = [
  { icon: HandHeart, title: 'Handmade Craftsmanship', description: 'Every stitch is thoughtfully made by hand with care.' },
  { icon: ShieldCheck, title: 'Quality Materials', description: 'We choose fabrics and threads that feel beautiful and lasting.' },
  { icon: Flower2, title: 'Unique Artistic Designs', description: 'Our patterns are inspired by nature, heritage, and contemporary style.' },
  { icon: BadgeCheck, title: 'Attention to Every Detail', description: 'From texture to finish, each detail is carefully considered.' },
];

const collections = [
  {
    title: 'Traditional Designs',
    description: 'Timeless florals, motifs, and cultural patterns rendered with elegance.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    href: '/shop?category=traditional',
  },
  {
    title: 'Heritage & Folk',
    description: 'Beautifully stitched pieces inspired by heritage and folk storytelling.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    href: '/shop?category=heritage',
  },
  {
    title: 'Floral Embroidery',
    description: 'Soft, romantic botanical compositions with a handmade finish.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    href: '/shop?category=floral',
  },
  {
    title: 'Embroidered Bags',
    description: 'Carry everyday essentials with artisanal charm and texture.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    href: '/shop?category=bags',
  },
  {
    title: 'Home Decor',
    description: 'Decorative embroidery pieces that bring warmth to modern interiors.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    href: '/shop?category=home-decor',
  },
  {
    title: 'Custom Embroidery',
    description: 'Personalized pieces created around your mood, story, or occasion.',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80',
    href: '/custom-embroidery',
  },
];

const values = [
  { icon: Sparkles, title: 'Craftsmanship', description: 'We celebrate the patience, skill, and creativity behind handmade work.' },
  { icon: Leaf, title: 'Tradition', description: 'We honor embroidery traditions while giving them a fresh contemporary expression.' },
  { icon: Palette, title: 'Creativity', description: 'We believe every design is an opportunity to create something meaningful and unique.' },
  { icon: ShieldCheck, title: 'Quality', description: 'We focus on thoughtful details and quality materials in every piece.' },
];

const benefits = [
  { icon: Heart, title: 'Handmade with Love', description: 'Every item is crafted slowly, carefully, and with intention.' },
  { icon: Sparkles, title: 'Unique Designs', description: 'Our collections are inspired by art, nature, and cultural storytelling.' },
  { icon: BadgeCheck, title: 'Quality Craftsmanship', description: 'We preserve beautiful finishes and durable details in every piece.' },
  { icon: MessageCircleHeart, title: 'Personalized Service', description: 'We’re here to help you find something meaningful and truly yours.' },
];

const stats = [
  { value: '100+', label: 'Handmade Creations' },
  { value: '50+', label: 'Unique Designs' },
  { value: '100%', label: 'Crafted with Care' },
  { value: 'Custom', label: 'Designs Available' },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Navbar cartCount={3} wishlistCount={2} />
      <main className="flex-grow">
        <AboutHero
          eyebrow="The Art of Handmade Embroidery"
          title="Stitched with Love, Crafted with Tradition"
          description="We believe every stitch tells a story. Our collection brings together traditional craftsmanship, timeless designs, and modern creativity to create beautiful handmade pieces that are made to be treasured."
          primaryHref="/shop"
          secondaryHref="#story"
          image="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
          alt="Close-up of handcrafted embroidery work"
        />
        <OurStory
          title="Our Story"
          description="Our journey began with a simple love for the beauty of handmade embroidery. Inspired by traditional patterns, delicate stitches, and the stories woven into every design, we created a space where timeless craftsmanship meets contemporary creativity."
          image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
          alt="Artisan working on intricate embroidery"
        />
        <OurCraft features={craftFeatures} />
        <SpecialFeatures features={specialFeatures} />
        <CollectionsPreview collections={collections} />
        <OurValues values={values} />
        <CustomEmbroideryCTA
          image="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
          alt="Custom embroidery project in progress"
        />
        <WhyChooseUs benefits={benefits} />
        <AboutStats stats={stats} />
        <AboutCTA
          title="Discover the Beauty of Handmade Embroidery"
          description="Explore our collection of thoughtfully crafted pieces and find something made especially for you."
          primaryHref="/shop"
          secondaryHref="/custom-embroidery"
        />
      </main>
      <Footer />
    </div>
  );
};
