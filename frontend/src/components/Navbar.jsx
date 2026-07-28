
import React, { useState, useEffect } from 'react';

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  Scissors
} from 'lucide-react';
import { Button } from './ui/Button';
import { Sheet } from './ui/Sheet';

export const Navbar = ({ cartCount = 3, wishlistCount = 2, onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Shop', href: '#products' },
    { name: 'Categories', href: '#services' },
    { name: 'About Us', href: '#story' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-cream transition-all duration-300 border-b border-beige/80 ${isScrolled ? 'shadow-warm-md bg-cream/95 backdrop-blur-md py-3' : 'py-4.5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Left side: Brand Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-102 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-sage/15 border border-sage/40 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all duration-300">
                <Scissors className="w-4.5 h-4.5 rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-earth group-hover:text-sage-dark transition-colors">
                  Artful Stitches
                </span>
                <span className="text-[10px] uppercase tracking-widest text-terracotta font-medium -mt-1">
                  Handcrafted Embroidery
                </span>
              </div>
            </a>

            {/* Center/Right Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveLink(link.name)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 group ${isActive ? 'text-sage font-semibold' : 'text-earth hover:text-terracotta'
                      }`}
                  >
                    {link.name}
                    {/* Smooth Underline Hover Effect */}
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-terracotta transition-all duration-300 origin-left ${isActive ? 'scale-x-100 bg-sage' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right side Actions */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-earth hover:text-terracotta hover:bg-beige/40 rounded-full transition-all duration-200"
                aria-label="Search"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <a
                href="#products"
                className="relative p-2 text-earth hover:text-terracotta hover:bg-beige/40 rounded-full transition-all duration-200"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </a>

              {/* Shopping Cart */}
              <a
                href="#products"
                className="relative p-2 text-earth hover:text-sage hover:bg-beige/40 rounded-full transition-all duration-200 group"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className=" px-1 absolute top-1 right-1 w-4.5 h-4.5 bg-sage text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-subtle shadow-xs">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* User Profile / Account */}
              <button
                className="p-2 text-earth hover:text-terracotta hover:bg-beige/40 rounded-full transition-all duration-200"
                aria-label="Account"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Login Button */}
              <Button variant="outline" size="sm" className="ml-1 border-sage/60 text-sage-dark hover:bg-sage">
                Sign In
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <a
                href="#products"
                className="relative p-2 text-earth hover:text-sage"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-sage text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-earth hover:bg-beige/50 rounded-lg transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>


          </div>
        </div>

        {/* Interactive Search Bar Overlay */}
        {searchOpen && (
          <div className="border-t border-beige/60 bg-cream/98 px-4 py-3 shadow-inner-warm animate-fadeIn">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-earth-muted" />
              <input
                type="text"
                placeholder="Search floral hoops, embroidered tote bags, custom gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-earth placeholder-earth-muted focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-earth-muted hover:text-terracotta px-2 py-1"
              >
                Close
              </button>

            </div>

          </div>
        )}
      </header>


      {/* Mobile Navigation Drawer */}
      <Sheet
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Artful Stitches"
      >
        <div className="flex flex-col space-y-6 pt-2">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`text-base font-medium py-2 px-3 rounded-xl transition-colors ${activeLink === link.name
                  ? 'bg-sage/15 text-sage-dark font-semibold'
                  : 'text-earth hover:bg-beige/40 hover:text-terracotta'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <hr className="border-beige" />

          {/* Mobile Actions */}
          <div className="flex flex-col space-y-3">
            <Button variant="default" className="w-full justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> View Cart ({cartCount})
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2 border-sage text-sage-dark">
              <User className="w-4 h-4" /> Sign In / Account
            </Button>
          </div>

          {/* Subtle Craft Motto */}
          <div className="pt-8 text-center text-xs text-earth-muted flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Handcrafted with Care & Passion</span>
          </div>

        </div>
      </Sheet>
    </>
  );
};
