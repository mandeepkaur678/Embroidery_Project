import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  Leaf,
  AlertCircle,
  MessageCircle,
  Tag,
  IndianRupee
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getDashboardStats, getAdminProducts, getAdminOrders } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ title, value, icon: Icon, color, trend, linkTo }) => (
  <div className="bg-cream border border-beige rounded-2xl p-5 shadow-warm-sm hover:shadow-warm-md transition-all duration-200 group">
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
        <p className="text-2.5xl sm:text-3xl font-bold text-earth font-serif">{value}</p>
        {trend && (
          <p className="text-[11px] text-sage flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    {linkTo && (
      <Link
        to={linkTo}
        className="mt-4 text-xs text-sage font-semibold flex items-center gap-1 group-hover:text-terracotta transition-colors"
      >
        <span>Manage</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </Link>
    )}
  </div>
);

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashStats, products, orders] = await Promise.all([
          getDashboardStats(),
          getAdminProducts(),
          getAdminOrders(),
        ]);
        setStats(dashStats);
        setRecentOrders(orders.slice(0, 5));
        setRecentProducts(products.slice(0, 5));
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const statusColors = {
    Pending: 'bg-warning/10 text-warning border-warning/30',
    Confirmed: 'bg-sage/10 text-sage border-sage/30',
    Processing: 'bg-gold/10 text-gold border-gold/30',
    Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
    Delivered: 'bg-success/10 text-success border-success/30',
    Cancelled: 'bg-error/10 text-error border-error/30',
  };

  return (
    <AdminLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}`}
      subtitle="Here's what's happening at your Artful Stitches store today."
      actions={
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      }
    >
      {/* 7 Required Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <StatCard
          title="Total Products"
          value={loading ? '–' : stats.totalProducts}
          icon={Package}
          color="bg-sage/10 text-sage"
          linkTo="/admin/products"
        />
        <StatCard
          title="Categories"
          value={loading ? '–' : stats.totalCategories}
          icon={Tag}
          color="bg-gold/10 text-gold"
          linkTo="/admin/categories"
        />
        <StatCard
          title="Total Orders"
          value={loading ? '–' : stats.totalOrders}
          icon={ShoppingBag}
          color="bg-terracotta/10 text-terracotta"
          linkTo="/admin/orders"
        />
        <StatCard
          title="Pending Orders"
          value={loading ? '–' : stats.pendingOrders}
          icon={Clock}
          color="bg-warning/10 text-warning"
          linkTo="/admin/orders"
        />
        <StatCard
          title="Completed"
          value={loading ? '–' : stats.completedOrders}
          icon={CheckCircle}
          color="bg-success/10 text-success"
          linkTo="/admin/orders"
        />
        <StatCard
          title="Registered Users"
          value={loading ? '–' : stats.totalUsers}
          icon={Users}
          color="bg-blue-100 text-blue-700"
          linkTo="/admin/users"
        />
        <StatCard
          title="Revenue"
          value={loading ? '–' : `₹${stats.revenue?.toLocaleString()}`}
          icon={IndianRupee}
          color="bg-emerald-100 text-emerald-800"
          linkTo="/admin/orders"
        />
      </div>

      {/* Lower Grid: Recent Orders + Recent Products */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

        {/* Recent Orders Table */}
        <div className="bg-cream border border-beige rounded-2xl shadow-warm-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-beige flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-earth flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-terracotta" />
              Recent Orders
            </h2>
            <Link to="/admin/orders" className="text-xs text-sage font-semibold hover:text-terracotta flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 bg-beige/40 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="p-6 text-center text-xs text-muted">No orders found.</p>
          ) : (
            <div className="divide-y divide-beige/60">
              {recentOrders.map(order => (
                <div key={order._id} className="flex items-center justify-between px-5 py-3 hover:bg-ivory transition-colors">
                  <div>
                    <p className="text-xs font-bold text-earth">{order._id}</p>
                    <p className="text-[11px] text-muted">{order.customerName || order.user?.name || 'Customer'}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-xs font-semibold text-earth">₹{order.totalAmount?.toLocaleString()}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[order.orderStatus || order.status] || 'bg-beige text-earth border-beige'}`}>
                      {order.orderStatus || order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Products Grid */}
        <div className="bg-cream border border-beige rounded-2xl shadow-warm-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-beige flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-earth flex items-center gap-2">
              <Leaf className="w-4 h-4 text-sage" />
              Latest Products
            </h2>
            <Link to="/admin/products" className="text-xs text-sage font-semibold hover:text-terracotta flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 bg-beige/40 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentProducts.length === 0 ? (
            <p className="p-6 text-center text-xs text-muted">No products found.</p>
          ) : (
            <div className="divide-y divide-beige/60">
              {recentProducts.map(product => (
                <div key={product._id} className="flex items-center gap-3 px-5 py-3 hover:bg-ivory transition-colors">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=200'}
                    alt={product.name}
                    className="w-10 h-10 rounded-xl object-cover bg-beige shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-earth truncate">{product.name}</p>
                    <p className="text-[11px] text-muted">{typeof product.category === 'object' ? product.category?.name : product.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-earth">₹{product.price?.toLocaleString()}</p>
                    <p className={`text-[10px] font-medium ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick Actions Panel */}
      <div className="bg-ivory border border-beige rounded-2xl p-5 sm:p-6 mt-6">
        <h2 className="font-serif text-lg font-bold text-earth mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gold" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Add Product', to: '/admin/products/add', icon: Package, color: 'bg-sage/10 text-sage border-sage/30' },
            { label: 'View Orders', to: '/admin/orders', icon: ShoppingBag, color: 'bg-terracotta/10 text-terracotta border-terracotta/30' },
            { label: 'Messages', to: '/admin/contact', icon: MessageCircle, color: 'bg-gold/10 text-gold border-gold/30' },
            { label: 'Manage Users', to: '/admin/users', icon: Users, color: 'bg-sage/10 text-sage border-sage/30' },
            { label: 'Categories', to: '/admin/categories', icon: Tag, color: 'bg-peach/10 text-peach border-peach/30' },
          ].map(action => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.to}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center hover:shadow-warm-sm transition-all duration-200 hover:-translate-y-0.5 ${action.color}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-bold">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
