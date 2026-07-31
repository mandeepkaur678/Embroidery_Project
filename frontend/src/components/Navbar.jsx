import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  LogOut,
  Sparkles,
  Scissors,
  ShieldCheck,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Sheet } from './ui/Sheet';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = () => {
    logout();
    toast.success('You have been signed out.', { description: 'See you soon at Artful Stitches!' });
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const trimmed = searchQuery.trim();
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-cream transition-all duration-300 border-b border-beige/80 ${isScrolled ? 'shadow-warm-md bg-cream/95 backdrop-blur-md py-3' : 'py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left side: Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-102 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-sage/15 border border-sage/40 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-cream transition-all duration-300">
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
            </Link>

            {/* Center Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.href ||
                  (link.href === '/shop' && location.pathname.startsWith('/shop')) ||
                  (link.href === '/categories' && location.pathname.startsWith('/categories')) ||
                  (link.href === '/about' && location.pathname.startsWith('/about'));

                return link.href.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 group text-earth hover:text-terracotta"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-terracotta transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 group ${isActive ? 'text-sage font-semibold' : 'text-earth hover:text-terracotta'
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-terracotta transition-all duration-300 origin-left ${isActive ? 'scale-x-100 bg-sage' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side Actions */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-earth hover:text-terracotta hover:bg-beige/40 rounded-full transition-all duration-200"
                aria-label="Search collection"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
{user?.role !== 'admin' && (
  <Link
    to={isAuthenticated ? '/profile' : '/login'}
    className="relative p-2 text-earth hover:text-terracotta hover:bg-beige/40 rounded-full transition-all duration-200"
    aria-label="Wishlist"
    title="My Wishlist"
  >
    <Heart className="w-5 h-5" />
    {wishlistCount > 0 && (
      <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta text-cream text-[10px] font-bold rounded-full flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </Link>
)}

              {/* Shopping Cart Link */}
{user?.role !== 'admin' && (
  <Link
    to="/cart"
    className="relative p-2 text-earth hover:text-sage hover:bg-beige/40 rounded-full transition-all duration-200 group"
    aria-label="Shopping Cart"
    title="Cart"
  >
    <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
    {cartCount > 0 && (
      <span className="px-1 absolute top-1 right-1 w-4.5 h-4.5 bg-sage text-cream text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
        {cartCount}
      </span>
    )}
  </Link>
)}

              {/* Auth Actions */}
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'admin' ? '/admin/dashboard' : '/profile'}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage/10 border border-sage/30 hover:bg-sage/20 transition-all duration-200 group"
                    title={user?.role === 'admin' ? 'Admin Dashboard' : 'My Profile & Orders'}
                  >
                    <div className="w-7 h-7 rounded-full bg-sage flex items-center justify-center text-cream text-xs font-bold shrink-0 overflow-hidden">
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        user?.name?.charAt(0)?.toUpperCase() || 'U'
                      )}
                    </div>
                    <span className="text-sm font-medium text-earth group-hover:text-sage-dark transition-colors max-w-[100px] truncate">
                      {user?.role === 'admin' ? 'Admin' : (user?.name?.split(' ')[0] || '')}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    aria-label="Sign Out"
                    className="p-2 text-muted hover:text-terracotta hover:bg-beige/40 rounded-full transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="ml-1 border-sage text-sage-dark hover:bg-sage hover:text-cream">
                      Sign In
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button variant="default" size="sm" className="bg-sage hover:bg-sage-dark text-cream transition-colors duration-200">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <Link to="/cart" className="relative p-2 text-earth hover:text-sage" aria-label="Shopping Cart">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-sage text-cream text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

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

        {/* Search Bar Overlay */}
        {searchOpen && (
          <div className="border-t border-beige/60 bg-cream px-4 py-3 shadow-inner-warm animate-fadeIn">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search floral hoops, embroidered kurta, tote bags, custom gifts... (Press Enter)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-transparent text-sm text-earth placeholder-muted focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-muted hover:text-terracotta px-2 py-1"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Artful Stitches">
        <div className="flex flex-col space-y-6 pt-2">
          {user?.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-terracotta text-cream text-sm font-bold shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          )}

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href === '/shop' && location.pathname.startsWith('/shop')) ||
                (link.href === '/categories' && location.pathname.startsWith('/categories')) ||
                (link.href === '/about' && location.pathname.startsWith('/about'));
              return link.href.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium py-2.5 px-3.5 rounded-xl transition-colors text-earth hover:bg-beige/40 hover:text-terracotta"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2.5 px-3.5 rounded-xl transition-colors ${isActive
                      ? 'bg-sage/15 text-sage font-semibold'
                      : 'text-earth hover:bg-beige/40 hover:text-terracotta'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <hr className="border-beige" />

          <div className="flex flex-col space-y-3">
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="default" className="w-full justify-center gap-2 bg-sage hover:bg-sage-dark text-cream">
                <ShoppingBag className="w-4 h-4" /> View Cart ({cartCount})
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center gap-2 border-sage text-sage-dark hover:bg-sage hover:text-cream">
                    <User className="w-4 h-4" /> My Profile, Wishlist & Orders
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-terracotta text-terracotta text-sm font-medium hover:bg-terracotta hover:text-cream transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({user?.name?.split(' ')[0]})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center gap-2 border-sage text-sage-dark hover:bg-sage hover:text-cream">
                    <User className="w-4 h-4" /> Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full justify-center gap-2 bg-sage hover:bg-sage-dark text-cream">
                    <User className="w-4 h-4" /> Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="pt-6 text-center text-xs text-muted flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Handcrafted Embroidery Boutique</span>
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default Navbar;
