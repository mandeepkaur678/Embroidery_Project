import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { StorySection } from '../components/StorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { NewsletterSection } from '../components/NewsletterSection';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-cream text-earth flex flex-col font-sans selection:bg-beige selection:text-earth">
      {/* Top Navbar */}
      <Navbar 
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <StorySection />
        <FeaturedProducts onAddToCart={handleAddToCart} />
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
