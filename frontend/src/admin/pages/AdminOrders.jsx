import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, RefreshCw, Filter } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminOrders, updateOrderStatus } from '../../services/adminService';
import { toast } from 'sonner';

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusStyle = {
  Pending: 'bg-warning/10 text-warning border-warning/30',
  Confirmed: 'bg-sage/10 text-sage border-sage/30',
  Processing: 'bg-gold/10 text-gold border-gold/30',
  Shipped: 'bg-blue-100 text-blue-600 border-blue-200',
  Delivered: 'bg-success/10 text-success border-success/30',
  Cancelled: 'bg-error/10 text-error border-error/30',
};

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getAdminOrders();
      setOrders(data);
      setFiltered(data);
    } catch {
      toast.error('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  useEffect(() => {
    let list = [...orders];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        o._id?.toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') {
      list = list.filter(o => o.status === statusFilter);
    }
    setFiltered(list);
  }, [searchQuery, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`Order ${orderId} marked as "${newStatus}".`);
    } catch {
      toast.error('Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <AdminLayout
      title="Order Management"
      subtitle={`${orders.length} total orders — ₹${totalRevenue.toLocaleString()} revenue delivered`}
      actions={
        <button onClick={loadOrders} className="p-2.5 border border-beige bg-cream rounded-xl text-muted hover:text-sage transition-colors" title="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
      }
    >
      {/* Status summary row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {ORDER_STATUSES.map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(prev => prev === status ? 'All' : status)}
              className={`rounded-xl p-2.5 text-center border transition-all ${statusFilter === status ? statusStyle[status] + ' ring-2 ring-offset-1 ring-sage/30' : 'bg-cream border-beige hover:bg-ivory'}`}
            >
              <div className="text-lg font-bold text-earth">{count}</div>
              <div className="text-[10px] font-semibold text-muted leading-tight">{status}</div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-cream border border-beige rounded-2xl p-4 shadow-warm-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-ivory border border-beige rounded-xl px-3 py-2 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
          >
            <option value="All">All Statuses</option>
            {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-cream border border-beige rounded-2xl shadow-warm-sm overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-ivory border-b border-beige text-[11px] font-bold uppercase tracking-wider text-muted">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2 text-center">Amount</div>
          <div className="col-span-2 text-center">Date</div>
          <div className="col-span-3 text-center">Status</div>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-beige/40 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-14 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 text-sage mx-auto" />
            <p className="font-serif text-xl font-bold text-earth">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-beige/60">
            {filtered.map((order) => (
              <div key={order._id} className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-3 items-start md:items-center px-5 py-4 hover:bg-ivory transition-colors">
                <div className="col-span-2">
                  <span className="text-xs font-bold text-sage font-mono">{order._id}</span>
                  <p className="text-[11px] text-muted">{order.itemsCount} item{order.itemsCount > 1 ? 's' : ''}</p>
                </div>

                <div className="col-span-3">
                  <p className="text-xs font-bold text-earth">{order.customerName}</p>
                  <p className="text-[11px] text-muted truncate">{order.email}</p>
                </div>

                <div className="col-span-2 md:text-center">
                  <p className="text-sm font-bold text-earth">₹{order.totalAmount?.toLocaleString()}</p>
                </div>

                <div className="col-span-2 md:text-center">
                  <p className="text-xs text-muted">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '–'}
                  </p>
                </div>

                <div className="col-span-3 md:text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={updatingId === order._id}
                    className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage/40 transition-all ${statusStyle[order.status] || 'bg-beige text-earth border-beige'} ${updatingId === order._id ? 'opacity-50' : ''}`}
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
