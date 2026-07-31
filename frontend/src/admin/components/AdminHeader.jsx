import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ExternalLink, ShieldCheck, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export const AdminHeader = ({ onOpenMobileMenu, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Signed out from Admin Portal.');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-cream border-b border-beige/80 px-4 sm:px-6 py-3.5 shadow-warm-sm">
      <div className="flex items-center justify-between gap-4">

        {/* Left: Mobile Trigger, Page Title & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-earth hover:bg-beige/40 rounded-xl transition-colors cursor-pointer"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {title && (
            <span className="font-serif font-bold text-earth text-lg hidden sm:block">
              {title}
            </span>
          )}

          {/* Quick Search Bar */}
          <div className="relative hidden md:block w-60 lg:w-72">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search store..."
              className="w-full pl-9 pr-3 py-1.5 bg-ivory border border-beige rounded-xl text-xs text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
            />
          </div>
        </div>

        {/* Right: Notifications & Admin Profile Dropdown */}
        <div className="flex items-center gap-2.5 sm:gap-4" ref={dropdownRef}>

          {/* Storefront Link */}
          <Link
            to="/shop"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sage/40 bg-sage/10 text-sage-dark text-xs font-semibold hover:bg-sage hover:text-cream transition-all duration-200"
            title="View Live Storefront"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Store</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setDropdownOpen(false);
              }}
              className="relative p-2 text-earth hover:bg-beige/40 rounded-full transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-cream border border-beige rounded-2xl shadow-warm-md p-3 z-30 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-beige/60 pb-2 mb-2">
                  <span className="text-xs font-bold text-earth">Notifications</span>
                  <span className="text-[10px] bg-terracotta/10 text-terracotta px-1.5 py-0.5 rounded-full font-bold">2 new</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-ivory hover:bg-beige/30 transition-colors">
                    <p className="font-semibold text-earth">New COD Order #ORD-9821</p>
                    <p className="text-[10px] text-muted">Customer: Priya Sharma • ₹3,149</p>
                  </div>
                  <div className="p-2 rounded-xl bg-ivory hover:bg-beige/30 transition-colors">
                    <p className="font-semibold text-earth">New Inquiry Message</p>
                    <p className="text-[10px] text-muted">Subject: Custom Embroidery Inquiry</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-beige" />

          {/* Admin Avatar & Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-beige/40 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-xs shadow-warm-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-earth line-clamp-1">
                  {user?.name || 'Artful Stitches Admin'}
                </span>
                <span className="text-[10px] text-terracotta font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin</span>
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-earth/70 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-cream border border-beige rounded-2xl shadow-warm-md py-1.5 z-30 animate-fadeIn">
                <div className="px-3.5 py-2 border-b border-beige/60 mb-1">
                  <p className="text-xs font-bold text-earth">{user?.name || 'Admin User'}</p>
                  <p className="text-[10px] text-muted truncate">{user?.email || 'admin@artfulstitches.com'}</p>
                </div>

                <Link
                  to="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs text-earth hover:bg-beige/40 transition-colors"
                >
                  <User className="w-4 h-4 text-sage" />
                  <span>Admin Profile</span>
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs text-earth hover:bg-beige/40 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gold" />
                  <span>Store Settings</span>
                </Link>

                <div className="my-1 border-t border-beige/60" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose hover:bg-rose/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
