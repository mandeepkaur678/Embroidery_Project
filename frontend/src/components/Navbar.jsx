<<<<<<< HEAD
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
        className={`sticky top-0 z-40 w-full bg-cream transition-all duration-300 border-b border-beige/80 ${
          isScrolled ? 'shadow-warm-md bg-cream/95 backdrop-blur-md py-3' : 'py-4.5'
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
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 group ${
                      isActive ? 'text-sage font-semibold' : 'text-earth hover:text-terracotta'
                    }`}
                  >
                    {link.name}
                    {/* Smooth Underline Hover Effect */}
                    <span 
                      className={`absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-terracotta transition-all duration-300 origin-left ${
                        isActive ? 'scale-x-100 bg-sage' : 'scale-x-0 group-hover:scale-x-100'
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
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-sage text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-subtle shadow-xs">
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
=======
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, Flower2, X } from 'lucide-react';
import { Sheet } from './ui/Sheet';
import { Button } from './ui/Button';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = ({ cartCount = 3, onOpenSearch, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for "${searchQuery}" in Thread & Roots collection...`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md border-b border-beige/60 shadow-warm-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-lg text-mocha hover:text-sage hover:bg-beige-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-sage"
                aria-label="Open Navigation Menu"
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

<<<<<<< HEAD
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
=======
            {/* Brand Logo & Name */}
            <NavLink 
              to="/" 
              className="flex items-center space-x-2.5 group py-2"
            >
              <div className="w-10 h-10 rounded-full bg-mocha/10 flex items-center justify-center border border-beige/80 group-hover:bg-mocha group-hover:text-cream transition-all duration-300">
                <Flower2 className="w-6 h-6 text-mocha group-hover:text-cream transition-colors duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-mocha group-hover:text-sage-dark transition-colors duration-300">
                  Thread & Roots
                </span>
                <span className="text-[10px] tracking-widest text-sage uppercase font-medium -mt-1">
                  Handcrafted Embroidery
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors py-2 duration-300 ${
                      isActive 
                        ? 'text-mocha font-semibold' 
                        : 'text-charcoal/80 hover:text-sage'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-sage transform origin-left transition-transform duration-300 rounded-full ${
                          isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full text-mocha hover:text-sage hover:bg-beige-subtle transition-all duration-200 focus:outline-none"
                title="Search Products"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User / Profile Icon */}
              <button
                type="button"
                className="p-2.5 rounded-full text-mocha hover:text-sage hover:bg-beige-subtle transition-all duration-200 focus:outline-none hidden sm:inline-flex"
                title="Account Profile"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Cart Icon with Badge */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full text-mocha hover:text-sage hover:bg-beige-subtle transition-all duration-200 focus:outline-none"
                title="Shopping Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-sage text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Quick Shop CTA on desktop */}
              <div className="hidden xl:block ml-2">
                <Button variant="default" size="sm" onClick={() => window.location.href='#collections'}>
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar Overlay */}
        {searchOpen && (
          <div className="border-t border-beige/40 bg-cream-light py-3 px-4 shadow-inner animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha/60" />
                <input
                  type="text"
                  placeholder="Search floral hoops, tote bags, traditional patterns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-beige/80 rounded-full text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:ring-2 focus:ring-sage"
                  autoFocus
                />
              </div>
              <Button type="submit" variant="secondary" size="sm">
                Search
              </Button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-charcoal/60 hover:text-mocha"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
          </div>
        )}
      </header>

<<<<<<< HEAD
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
                className={`text-base font-medium py-2 px-3 rounded-xl transition-colors ${
                  activeLink === link.name
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
=======
      {/* Mobile Drawer Navigation (shadcn Sheet style) */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="flex flex-col space-y-4">
          <div className="text-xs uppercase font-semibold text-sage tracking-wider px-2 pt-2">
            Navigation Menu
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-mocha text-cream font-semibold'
                    : 'text-charcoal hover:bg-beige-subtle hover:text-mocha'
                }`
              }
            >
              <span>{item.name}</span>
              <span className="text-xs opacity-60">→</span>
            </NavLink>
          ))}
          
          <div className="pt-6 border-t border-beige/40 flex flex-col gap-3">
            <Button variant="default" className="w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
              Shop Collection
            </Button>
            <Button variant="outline" className="w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
              My Account
            </Button>
          </div>
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
        </div>
      </Sheet>
    </>
  );
};
