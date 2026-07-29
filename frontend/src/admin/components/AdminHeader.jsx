import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ onOpenMobileMenu }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 w-full bg-cream border-b border-beige/80 px-4 sm:px-6 py-3.5 shadow-warm-sm">
      <div className="flex items-center justify-between gap-4">

        {/* Left: Mobile Menu Trigger & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-earth hover:bg-beige/40 rounded-xl transition-colors"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search */}
          <div className="relative hidden sm:block w-64 md:w-80">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full pl-9 pr-3 py-1.5 bg-ivory border border-beige rounded-xl text-xs sm:text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
            />
          </div>
        </div>

        {/* Right: Store Link & Admin Info */}
        <div className="flex items-center gap-2.5 sm:gap-4">

          {/* View Customer Website Link */}
          <Link
            to="/shop"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sage/40 bg-sage/10 text-sage-dark text-xs font-semibold hover:bg-sage hover:text-cream transition-all duration-200"
            title="View Live Storefront"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Customer Store</span>
          </Link>

          {/* Notifications */}
          <button
            className="relative p-2 text-earth hover:bg-beige/40 rounded-full transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          </button>

          <div className="h-6 w-px bg-beige" />

          {/* Admin Avatar & Greeting */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-xs shadow-warm-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-earth line-clamp-1">
                {user?.name || 'Artful Stitches Admin'}
              </span>
              <span className="text-[10px] text-terracotta font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
