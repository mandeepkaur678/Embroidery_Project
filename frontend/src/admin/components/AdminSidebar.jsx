import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Tag,
  ShoppingBag,
  Users,
  User,
  Settings,
  LogOut,
  Scissors,
  X,
  Sparkles,
  ChevronDown,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export const AdminSidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isProductsActive = location.pathname.startsWith('/admin/products') || location.pathname === '/admin/categories';
  const [productsOpen, setProductsOpen] = useState(isProductsActive);

  const handleLogout = () => {
    logout();
    toast.success('Signed out from Admin Portal.');
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#2A3128] text-cream border-r border-earth/30 select-none">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-beige/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-sage/20 border border-beige/30 flex items-center justify-center text-gold">
            <Scissors className="w-4.5 h-4.5 rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-cream tracking-tight">
              Artful Stitches
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold -mt-1">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-cream/70 hover:text-cream rounded-lg hover:bg-white/10"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-cream/50 font-bold">
          Management
        </div>

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
              ? 'bg-sage text-cream shadow-warm-sm font-semibold'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`
          }
        >
          <LayoutDashboard className="w-4.5 h-4.5 shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        {/* Products Collapsible Section */}
        <div>
          <button
            type="button"
            onClick={() => setProductsOpen(!productsOpen)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isProductsActive
              ? 'text-cream font-semibold bg-white/5'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4.5 h-4.5 shrink-0" />
              <span>Products</span>
            </div>
            {productsOpen ? (
              <ChevronDown className="w-4 h-4 opacity-70" />
            ) : (
              <ChevronRight className="w-4 h-4 opacity-70" />
            )}
          </button>

          {productsOpen && (
            <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
              <NavLink
                to="/admin/products"
                end
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive
                    ? 'bg-sage/40 text-cream font-semibold'
                    : 'text-cream/70 hover:text-cream hover:bg-white/5'
                  }`
                }
              >
                <Package className="w-3.5 h-3.5" />
                <span>All Products</span>
              </NavLink>

              <NavLink
                to="/admin/products/add"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive
                    ? 'bg-sage/40 text-cream font-semibold'
                    : 'text-cream/70 hover:text-cream hover:bg-white/5'
                  }`
                }
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </NavLink>

              <NavLink
                to="/admin/categories"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive
                    ? 'bg-sage/40 text-cream font-semibold'
                    : 'text-cream/70 hover:text-cream hover:bg-white/5'
                  }`
                }
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Categories</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Orders */}
        <NavLink
          to="/admin/orders"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
              ? 'bg-sage text-cream shadow-warm-sm font-semibold'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`
          }
        >
          <ShoppingBag className="w-4.5 h-4.5 shrink-0" />
          <span>Orders</span>
        </NavLink>

        {/* Messages */}
        <NavLink
          to="/admin/contact"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
              ? 'bg-sage text-cream shadow-warm-sm font-semibold'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`
          }
        >
          <MessageCircle className="w-4.5 h-4.5 shrink-0" />
          <span>Messages</span>
        </NavLink>

        {/* Users */}
        <NavLink
          to="/admin/users"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
              ? 'bg-sage text-cream shadow-warm-sm font-semibold'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`
          }
        >
          <Users className="w-4.5 h-4.5 shrink-0" />
          <span>Users</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/admin/profile"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
              ? 'bg-sage text-cream shadow-warm-sm font-semibold'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`
          }
        >
          <User className="w-4.5 h-4.5 shrink-0" />
          <span>Profile</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin/settings"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
              ? 'bg-sage text-cream shadow-warm-sm font-semibold'
              : 'text-cream/80 hover:bg-white/10 hover:text-cream'
            }`
          }
        >
          <Settings className="w-4.5 h-4.5 shrink-0" />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-4 border-t border-beige/10 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose hover:bg-rose/10 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Logout</span>
        </button>

        <div className="text-[11px] text-cream/50 text-center flex items-center justify-center gap-1 pt-1">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Artful Stitches Admin</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-earth/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-xs h-full z-10 animate-fadeIn">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
