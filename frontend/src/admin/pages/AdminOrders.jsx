import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, RefreshCw, Filter, Eye, Trash2, X, CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminOrders, updateOrderStatus, deleteAdminOrder } from '../../services/adminService';
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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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
        (o.customerName || o.user?.name || o.shippingAddress?.fullName)?.toLowerCase().includes(q) ||
        (o.email || o.user?.email)?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') {
      list = list.filter(o => (o.orderStatus || o.status) === statusFilter);
    }
    setFiltered(list);
  }, [searchQuery, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus, status: newStatus, paymentStatus: newStatus === 'Delivered' ? 'Paid' : o.paymentStatus } : o));
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, orderStatus: newStatus, status: newStatus, paymentStatus: newStatus === 'Delivered' ? 'Paid' : prev.paymentStatus }));
      }
      toast.success(`Order #${orderId} status updated to "${newStatus}".`);
    } catch {
      toast.error('Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteAdminOrder(orderId);
      setOrders(prev => prev.filter(o => o._id !== orderId));
      if (selectedOrder && selectedOrder._id === orderId) setSelectedOrder(null);
      toast.success('Order deleted successfully.');
    } catch {
      toast.error('Failed to delete order.');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const totalRevenue = orders
    .filter(o => (o.orderStatus || o.status) === 'Delivered')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <AdminLayout
      title="Order Management"
      subtitle={`${orders.length} total orders — ₹${totalRevenue.toLocaleString()} revenue delivered`}
      actions={
        <button onClick={loadOrders} className="p-2.5 border border-beige bg-cream rounded-xl text-muted hover:text-sage transition-colors cursor-pointer" title="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
      }
    >
      {/* Status summary cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {ORDER_STATUSES.map(status => {
          const count = orders.filter(o => (o.orderStatus || o.status) === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(prev => prev === status ? 'All' : status)}
              className={`rounded-xl p-2.5 text-center border transition-all cursor-pointer ${statusFilter === status ? statusStyle[status] + ' ring-2 ring-offset-1 ring-sage/30' : 'bg-cream border-beige hover:bg-ivory'}`}
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
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-beige rounded-xl text-xs sm:text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-ivory border border-beige rounded-xl px-3 py-2 text-xs sm:text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
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
          <div className="col-span-2 text-center">Payment</div>
          <div className="col-span-2 text-center">Amount</div>
          <div className="col-span-2 text-center">Order Status</div>
          <div className="col-span-1 text-center">Actions</div>
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
            {filtered.map((order) => {
              const currentStatus = order.orderStatus || order.status || 'Pending';
              const customer = order.customerName || order.user?.name || order.shippingAddress?.fullName || 'Customer';
              const email = order.email || order.user?.email || 'N/A';
              const paymentMethod = order.paymentMethod || 'COD';
              const paymentStatus = order.paymentStatus || 'Pending';

              return (
                <div key={order._id} className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-3 items-start md:items-center px-5 py-4 hover:bg-ivory transition-colors">
                  <div className="col-span-2">
                    <span className="text-xs font-bold text-sage font-mono">{order._id}</span>
                    <p className="text-[10px] text-muted">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                    </p>
                  </div>

                  <div className="col-span-3">
                    <p className="text-xs font-bold text-earth">{customer}</p>
                    <p className="text-[11px] text-muted truncate">{email}</p>
                  </div>

                  <div className="col-span-2 md:text-center">
                    <span className="text-[11px] font-semibold text-earth bg-beige/50 px-2 py-0.5 rounded-md border border-beige">
                      {paymentMethod} ({paymentStatus})
                    </span>
                  </div>

                  <div className="col-span-2 md:text-center">
                    <p className="text-sm font-bold text-earth">₹{order.totalAmount?.toLocaleString()}</p>
                  </div>

                  <div className="col-span-2 md:text-center">
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage/40 transition-all ${statusStyle[currentStatus] || 'bg-beige text-earth border-beige'} ${updatingId === order._id ? 'opacity-50' : ''}`}
                    >
                      {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="col-span-1 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 text-muted hover:text-sage hover:bg-sage/10 rounded-lg transition-colors cursor-pointer"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {deleteConfirm === order._id ? (
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="px-2 py-0.5 text-[10px] font-bold text-white bg-rose rounded-md"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(order._id)}
                        className="p-1.5 text-muted hover:text-rose hover:bg-rose/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Complete Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-cream border border-beige rounded-2xl max-w-2xl w-full p-6 shadow-warm-md relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border border-beige text-earth hover:bg-beige/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider">
              <span>ORDER DETAILS #{selectedOrder._id}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-beige/60 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-earth">
                  Order from {selectedOrder.customerName || selectedOrder.user?.name || selectedOrder.shippingAddress?.fullName || 'Customer'}
                </h3>
                <p className="text-xs text-muted">Placed on {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('en-IN') : 'Recent'}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyle[selectedOrder.orderStatus || selectedOrder.status]}`}>
                  {selectedOrder.orderStatus || selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Shipping & Payment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-ivory border border-beige rounded-xl space-y-1.5">
                <p className="font-bold text-earth flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sage" /> Shipping Address
                </p>
                <p className="font-semibold text-earth">{selectedOrder.shippingAddress?.fullName || selectedOrder.customerName || 'N/A'}</p>
                <p className="text-muted">{selectedOrder.shippingAddress?.addressLine || selectedOrder.shippingAddress?.address || 'Street address'}</p>
                <p className="text-muted">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode || selectedOrder.shippingAddress?.postalCode}</p>
                <p className="text-muted">Phone: {selectedOrder.shippingAddress?.phone || selectedOrder.user?.phone || 'N/A'}</p>
              </div>

              <div className="p-4 bg-ivory border border-beige rounded-xl space-y-1.5">
                <p className="font-bold text-earth flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-gold" /> Payment Information
                </p>
                <p className="text-earth">Method: <strong>{selectedOrder.paymentMethod || 'Cash on Delivery (COD)'}</strong></p>
                <p className="text-earth">Payment Status: <strong className="text-sage">{selectedOrder.paymentStatus || 'Pending'}</strong></p>
                <p className="text-earth">Total Amount: <strong className="text-earth text-sm">₹{selectedOrder.totalAmount?.toLocaleString()}</strong></p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-earth text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-terracotta" /> Items ({selectedOrder.items?.length || selectedOrder.itemsCount || 1})
              </h4>

              <div className="divide-y divide-beige/60 border border-beige rounded-xl bg-ivory overflow-hidden">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                      <img src={item.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=150'} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-beige shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-earth truncate">{item.name || item.product?.name}</p>
                        <p className="text-[11px] text-muted">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                      <p className="text-xs font-bold text-earth">₹{(item.quantity * item.price)?.toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-muted">Item details available in database record.</div>
                )}
              </div>
            </div>

            {/* Status Quick Updater */}
            <div className="pt-3 border-t border-beige/60 flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-earth">Update Status:</span>
              <div className="flex gap-2 overflow-x-auto py-1">
                {ORDER_STATUSES.map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedOrder._id, st)}
                    className={`px-3 py-1 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${ (selectedOrder.orderStatus || selectedOrder.status) === st ? statusStyle[st] : 'bg-ivory border-beige text-earth hover:bg-beige/40' }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
