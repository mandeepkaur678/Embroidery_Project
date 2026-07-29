import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Flower2,
  Mail,
  Phone,
  MapPin,
  Heart,
  Scissors
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-[#2C332A] text-cream pt-16 pb-8 border-t border-earth/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-beige/20">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <NavLink to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center border border-beige/40 group-hover:bg-sage transition-colors">
                <Scissors className="w-5 h-5 text-cream rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                  Artful Stitches
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold font-medium -mt-1">
                  Handcrafted Boutique
                </span>
              </div>
            </NavLink>

            <p className="text-sm text-cream/80 leading-relaxed font-normal">
              Handcrafted embroidery inspired by nature. We craft timeless, hand-stitched art pieces, clothing, and home decor with organic threads, botanical themes, and traditional care.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-sage flex items-center justify-center text-cream transition-colors duration-300 border border-beige/30"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-sage flex items-center justify-center text-cream transition-colors duration-300 border border-beige/30"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.815V8z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-sage flex items-center justify-center text-cream transition-colors duration-300 border border-beige/30"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C24.007 5.367 18.624 0 12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-beige tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop Collection', path: '/shop' },
                { name: 'Categories', path: '/#services' },
                { name: 'About Us', path: '/#story' },
                { name: 'Contact', path: '/#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-cream/80 hover:text-gold transition-colors flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-beige tracking-wide">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Shipping & Delivery',
                'Returns & Refunds',
                'Privacy Policy',
                'Terms & Conditions',
                'Custom Order Inquiries'
              ].map((item) => (
                <li key={item}>
                  <a href="#support" className="text-cream/80 hover:text-gold transition-colors flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-beige tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <span>124 Botanical Way, Artisan Village, New Delhi, India 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sage shrink-0" />
                <a href="mailto:hello@artfulstitches.com" className="hover:text-beige transition-colors">
                  hello@artfulstitches.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sage shrink-0" />
                <a href="tel:+919876543210" className="hover:text-beige transition-colors">
                  +91 (987) 654-3210
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© 2026 Artful Stitches. All Rights Reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
            <span>&amp; organic thread for embroidery lovers worldwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
