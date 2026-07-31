import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getMyOrdersApi, cancelOrderApi } from '../services/orderService';
import { uploadImageFile } from '../services/uploadService';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import {
  User,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Plus,
  Trash2,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Heart,
  Camera,
  FileText,
  Loader2,
  RefreshCw,
  ArrowRight,
  Upload,
  Edit2,
} from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, addAddress, updateAddress, deleteAddress, logout } = useAuth();
  const { cartItems, cartCount, subtotal, shippingFee, total, addToCart, updateQuantity, removeFromCart } =
    useCart();
  const { wishlistItems, wishlistCount, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // Admins should use the dedicated Admin Portal — redirect away from customer profile
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'cart' | 'addresses' | 'account'

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderFilter, setOrderFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // null = adding, object = editing
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
  });
  const [addressSubmitting, setAddressSubmitting] = useState(false);

  // Profile Edit State
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [editProfileForm, setEditProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    password: '',
    profileImage: user?.profileImage || '',
  });
  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || '');
      setEditProfileForm((prev) => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        profileImage: user.profileImage || '',
      }));
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const data = await getMyOrdersApi();
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders: ' + err.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      setCancellingId(orderId);
      await cancelOrderApi(orderId);
      toast.success('Order cancelled successfully');
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: 'Cancelled' } : null));
      }
    } catch (err) {
      toast.error(err.message || 'Failed to cancel order');
    } finally {
      setCancellingId(null);
    }
  };

  // Image Upload Handler — uses server upload API (stores file, returns URL)
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    // Show immediate local preview
    const localPreview = URL.createObjectURL(file);
    setProfileImage(localPreview);

    try {
      setProfileSubmitting(true);
      // Upload to server — returns a permanent /uploads/...webp URL converted by Sharp
      const serverUrl = await uploadImageFile(file, 'profile');
      setProfileImage(serverUrl);
      setEditProfileForm((prev) => ({ ...prev, profileImage: serverUrl }));
      await updateProfile({ profileImage: serverUrl });
      toast.success('Profile picture updated!');
    } catch (err) {
      // Fallback to base64 if upload API unavailable
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Url = event.target?.result;
        if (typeof base64Url === 'string') {
          setProfileImage(base64Url);
          setEditProfileForm((prev) => ({ ...prev, profileImage: base64Url }));
          try {
            await updateProfile({ profileImage: base64Url });
            toast.success('Profile picture updated!');
          } catch (saveErr) {
            toast.error('Failed to save profile picture: ' + saveErr.message);
          }
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setProfileSubmitting(false);
      URL.revokeObjectURL(localPreview);
    }
  };

  const resetAddressForm = () => ({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
  });

  const openAddAddress = () => {
    setEditingAddress(null);
    setAddressForm(resetAddressForm());
    setShowAddressModal(true);
  };

  const openEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      fullName: addr.fullName || '',
      phone: addr.phone || '',
      addressLine: addr.addressLine || addr.address || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.postalCode || addr.pincode || '',
      isDefault: addr.isDefault || false,
    });
    setShowAddressModal(true);
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddressSubmitting(true);
      if (editingAddress) {
        // Update existing address
        await updateAddress(editingAddress._id, addressForm);
        toast.success('Address updated successfully!');
      } else {
        // Add new address
        await addAddress(addressForm);
        toast.success('Shipping address added successfully!');
      }
      setShowAddressModal(false);
      setEditingAddress(null);
      setAddressForm(resetAddressForm());
    } catch (err) {
      toast.error(err.message || 'Failed to save address');
    } finally {
      setAddressSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await deleteAddress(addressId);
      toast.success('Address removed');
    } catch (err) {
      toast.error(err.message || 'Failed to delete address');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setProfileSubmitting(true);
      const payload = {
        name: editProfileForm.name,
        phone: editProfileForm.phone,
        profileImage: profileImage,
      };
      if (editProfileForm.password) {
        payload.password = editProfileForm.password;
      }
      await updateProfile(payload);
      toast.success('Profile details updated successfully');
      setEditProfileForm((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setProfileSubmitting(false);
    }
  };

  const filteredOrders =
    orderFilter === 'All'
      ? orders
      : orders.filter((o) => o.orderStatus?.toLowerCase() === orderFilter.toLowerCase());

  const getStatusBadge = (status) => {
    const s = status || 'Pending';
    switch (s) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Truck className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case 'Confirmed':
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream/40">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Header Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-earth-dark via-earth to-sage-dark text-cream p-6 sm:p-8 shadow-warm-lg mb-8">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Profile Picture with Camera Edit Overlay */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-cream/15 backdrop-blur-md border-2 border-cream/40 overflow-hidden flex items-center justify-center text-cream font-serif text-3xl font-bold shadow-inner shrink-0">
                  {profileImage ? (
                    <img src={profileImage} alt={user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 rounded-xl bg-terracotta text-cream shadow-warm-sm hover:scale-110 active:scale-95 transition-transform"
                  title="Upload / Change Profile Picture"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {user?.name || 'Valued Customer'}
                  </h1>
                  {user?.role === 'admin' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-terracotta text-cream">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                  )}
                </div>
                <p className="text-cream/80 text-sm flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5" /> {user?.email}
                </p>
                <div className="flex items-center gap-4 text-xs text-cream/70 mt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cream/80" /> Member since{' '}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })
                      : '2026'}
                  </span>
                  {user?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-cream/80" /> {user.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-cream/40 text-cream hover:bg-cream/20 bg-transparent text-xs rounded-xl"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" /> Edit Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchOrders}
                className="border-cream/30 text-cream hover:bg-cream/20 bg-transparent text-xs rounded-xl"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Sync Data
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-beige mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders'
                ? 'border-sage text-sage-dark bg-sage/5'
                : 'border-transparent text-earth-muted hover:text-earth'
              }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'wishlist'
                ? 'border-sage text-sage-dark bg-sage/5'
                : 'border-transparent text-earth-muted hover:text-earth'
              }`}
          >
            <Heart className="w-4 h-4" />
            <span>My Wishlist ({wishlistCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'cart'
                ? 'border-sage text-sage-dark bg-sage/5'
                : 'border-transparent text-earth-muted hover:text-earth'
              }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Cart ({cartCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'addresses'
                ? 'border-sage text-sage-dark bg-sage/5'
                : 'border-transparent text-earth-muted hover:text-earth'
              }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({user?.addresses?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'account'
                ? 'border-sage text-sage-dark bg-sage/5'
                : 'border-transparent text-earth-muted hover:text-earth'
              }`}
          >
            <User className="w-4 h-4" />
            <span>Account Details & Security</span>
          </button>
        </div>

        {/* TAB 1: MY ORDERS & PURCHASING HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${orderFilter === st
                        ? 'bg-sage text-cream shadow-xs'
                        : 'bg-beige/60 text-earth hover:bg-beige'
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <span className="text-xs text-earth-muted">
                Showing {filteredOrders.length} of {orders.length} orders
              </span>
            </div>

            {ordersLoading ? (
              <div className="py-16 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-sage mx-auto mb-3" />
                <p className="text-sm text-earth-muted">Fetching your purchasing history...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-16 text-center bg-cream/70 rounded-3xl border border-beige p-8">
                <ShoppingBag className="w-12 h-12 text-earth-muted/50 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-earth mb-1">
                  No {orderFilter !== 'All' ? orderFilter : ''} orders found
                </h3>
                <p className="text-sm text-earth-muted max-w-md mx-auto mb-6">
                  {orderFilter === 'All'
                    ? "You haven't placed any embroidery orders yet. Explore our handcrafted collection!"
                    : `You have no orders matching status '${orderFilter}'.`}
                </p>
                <Button
                  onClick={() => navigate('/shop')}
                  className="bg-sage hover:bg-sage-dark text-cream rounded-xl"
                >
                  Browse Shop & Place Order
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-cream border border-beige/80 rounded-2xl p-5 sm:p-6 shadow-warm-xs hover:shadow-warm-sm transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-beige/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-earth-dark uppercase tracking-wider">
                            Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                          </span>
                          {getStatusBadge(order.orderStatus)}
                        </div>
                        <p className="text-xs text-earth-muted mt-1">
                          Placed on{' '}
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-earth-muted">Total Amount</p>
                          <p className="font-serif text-lg font-bold text-terracotta">
                            ₹{order.totalAmount?.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-xl bg-beige/40 hover:bg-beige text-earth text-xs font-semibold flex items-center gap-1"
                          title="View Invoice & Details"
                        >
                          <FileText className="w-4 h-4 text-sage-dark" />
                          <span className="hidden sm:inline">Invoice</span>
                        </button>
                      </div>
                    </div>

                    <div className="py-4 space-y-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                item.image ||
                                'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
                              }
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover border border-beige/80 shrink-0"
                            />
                            <div>
                              <p className="text-sm font-semibold text-earth">{item.name}</p>
                              <p className="text-xs text-earth-muted">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-earth">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-beige/60 flex flex-wrap items-center justify-between gap-3 text-xs text-earth-muted">
                      <div>
                        <span>Payment: </span>
                        <span className="font-semibold text-earth">
                          {order.paymentMethod || 'COD'} ({order.paymentStatus})
                        </span>
                      </div>

                      {['Pending', 'Confirmed'].includes(order.orderStatus) && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={cancellingId === order._id}
                          onClick={() => handleCancelOrder(order._id)}
                          className="border-rose-300 text-rose-700 hover:bg-rose-50 text-xs py-1 h-8"
                        >
                          {cancellingId === order._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                          )}
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-earth">My Saved Wishlist</h2>
                <p className="text-xs text-earth-muted">
                  Keep track of handcrafted items you love and move them to cart anytime.
                </p>
              </div>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="py-16 text-center bg-cream/70 rounded-3xl border border-beige p-8">
                <Heart className="w-12 h-12 text-earth-muted/50 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-earth mb-1">Your Wishlist is Empty</h3>
                <p className="text-xs text-earth-muted mb-4">
                  Browse products and click the heart icon to save items here.
                </p>
                <Button onClick={() => navigate('/shop')} className="bg-sage text-cream text-xs rounded-xl">
                  Explore Shop
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlistItems.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="bg-cream border border-beige rounded-2xl p-4 flex flex-col justify-between shadow-warm-xs hover:shadow-warm-sm transition-all"
                  >
                    <div>
                      <img
                        src={
                          (product.images && product.images[0]) ||
                          product.image ||
                          'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
                        }
                        alt={product.name}
                        className="w-full aspect-[4/3] object-cover rounded-xl border border-beige/60 mb-3"
                      />
                      <h3 className="font-serif text-base font-bold text-earth line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="font-serif text-lg font-bold text-terracotta mt-1">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-beige/60 flex items-center gap-2 mt-3">
                      <Button
                        onClick={() => {
                          addToCart(product, 1);
                          removeFromWishlist(product._id || product.id);
                        }}
                        className="flex-1 bg-sage hover:bg-sage-dark text-cream text-xs rounded-xl py-2 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </Button>

                      <button
                        onClick={() => removeFromWishlist(product._id || product.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY CART ITEMS */}
        {activeTab === 'cart' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-earth">Active Cart Items</h2>
                <p className="text-xs text-earth-muted">
                  Review items ready for order placement.
                </p>
              </div>

              {cartItems.length > 0 && (
                <Button
                  onClick={() => navigate('/checkout')}
                  className="bg-sage hover:bg-sage-dark text-cream text-xs flex items-center gap-1 rounded-xl"
                >
                  <span>Checkout Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="py-16 text-center bg-cream/70 rounded-3xl border border-beige p-8">
                <ShoppingBag className="w-12 h-12 text-earth-muted/50 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-earth mb-1">Your Cart is Empty</h3>
                <p className="text-xs text-earth-muted mb-4">
                  Add handcrafted items to your basket to proceed.
                </p>
                <Button onClick={() => navigate('/shop')} className="bg-sage text-cream text-xs rounded-xl">
                  Shop Now
                </Button>
              </div>
            ) : (
              <div className="bg-cream border border-beige rounded-3xl p-6 shadow-warm-xs space-y-4">
                <div className="divide-y divide-beige/60">
                  {cartItems.map((item) => (
                    <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border border-beige shrink-0"
                        />
                        <div>
                          <p className="font-bold text-earth text-sm">{item.name}</p>
                          <p className="text-xs text-earth-muted">Unit Price: ₹{item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-beige rounded-xl bg-cream">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="px-2 py-1 text-xs text-earth"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="px-2 py-1 text-xs text-earth"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif font-bold text-terracotta text-sm min-w-[80px] text-right">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-beige flex items-center justify-between">
                  <div className="text-xs text-earth-muted">
                    <span>Subtotal: </span>
                    <strong className="text-earth">₹{subtotal}</strong> | Shipping:{' '}
                    <strong className="text-earth">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</strong>
                  </div>

                  <Button
                    onClick={() => navigate('/checkout')}
                    className="bg-sage hover:bg-sage-dark text-cream rounded-xl text-xs py-2 px-6"
                  >
                    Proceed to Checkout (₹{total})
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-earth">Saved Shipping Addresses</h2>
                <p className="text-xs text-earth-muted">
                  Manage your delivery addresses for seamless checkout.
                </p>
              </div>
              <Button
                onClick={openAddAddress}
                className="bg-sage hover:bg-sage-dark text-cream text-xs flex items-center gap-1.5 rounded-xl"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </Button>
            </div>

            {user?.addresses?.length === 0 || !user?.addresses ? (
              <div className="py-12 text-center bg-cream/70 rounded-3xl border border-beige p-8">
                <MapPin className="w-10 h-10 text-earth-muted/50 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-earth mb-1">No Addresses Saved</h3>
                <p className="text-xs text-earth-muted mb-4">
                  Add a delivery address so you can quickly place orders.
                </p>
                <Button
                  onClick={openAddAddress}
                  className="bg-sage hover:bg-sage-dark text-cream text-xs rounded-xl"
                >
                  + Add Address Now
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className={`p-5 rounded-2xl border transition-all ${addr.isDefault
                        ? 'border-sage bg-sage/5 shadow-warm-xs'
                        : 'border-beige/80 bg-cream hover:border-beige'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-earth">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sage text-cream">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditAddress(addr)}
                          className="p-1.5 text-earth-muted hover:text-sage rounded-lg transition-colors"
                          title="Edit Address"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="p-1.5 text-earth-muted hover:text-rose-600 rounded-lg transition-colors"
                          title="Delete Address"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-earth-muted leading-relaxed">
                      {addr.addressLine || addr.address}
                    </p>
                    <p className="text-xs text-earth-muted">
                      {addr.city}, {addr.state} - {addr.postalCode || addr.pincode}
                    </p>
                    <p className="text-xs text-earth-muted font-medium mt-2 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-sage" /> {addr.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACCOUNT DETAILS & SECURITY */}
        {activeTab === 'account' && (
          <div className="max-w-2xl bg-cream border border-beige/80 rounded-3xl p-6 sm:p-8 shadow-warm-xs animate-fadeIn">
            <h2 className="font-serif text-xl font-bold text-earth mb-1">Personal Details & Photo</h2>
            <p className="text-xs text-earth-muted mb-6">
              Update your profile photo, contact info, and password.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Profile Photo Upload Field */}
              <div>
                <label className="block text-xs font-semibold text-earth mb-1">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-beige/60 overflow-hidden border border-beige shrink-0 flex items-center justify-center font-bold text-earth text-xl">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <div className="space-y-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-sage text-sage-dark text-xs rounded-xl"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1" /> Select New Photo
                    </Button>
                    <p className="text-[11px] text-earth-muted">Supports PNG, JPG or WebP (max 5MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth mb-1">Full Name</label>
                <input
                  type="text"
                  value={editProfileForm.name}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth mb-1">Email Address (Read Only)</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-beige bg-beige/40 text-sm text-earth-muted cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter contact number"
                  value={editProfileForm.phone}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth mb-1">New Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={editProfileForm.password}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={profileSubmitting}
                  className="bg-sage hover:bg-sage-dark text-cream rounded-xl"
                >
                  {profileSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={logout}
                  className="border-terracotta text-terracotta hover:bg-terracotta hover:text-cream rounded-xl"
                >
                  Sign Out Account
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ORDER INVOICE MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-earth-dark/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-cream border border-beige max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-warm-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-beige">
                <div>
                  <h3 className="font-serif text-xl font-bold text-earth">Order Invoice</h3>
                  <p className="text-xs text-earth-muted">ID: #{selectedOrder._id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-full hover:bg-beige text-earth-muted hover:text-earth"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs">
                <div className="flex justify-between items-center bg-beige/30 p-3 rounded-xl">
                  <div>
                    <span className="text-earth-muted block">Status</span>
                    {getStatusBadge(selectedOrder.orderStatus)}
                  </div>
                  <div className="text-right">
                    <span className="text-earth-muted block">Date</span>
                    <span className="font-semibold text-earth">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="border border-beige/60 p-3 rounded-xl">
                  <span className="font-bold text-earth block mb-1">Shipping Address</span>
                  <p className="font-medium text-earth">{selectedOrder.shippingAddress?.fullName}</p>
                  <p className="text-earth-muted">{selectedOrder.shippingAddress?.address}</p>
                  <p className="text-earth-muted">
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} -{' '}
                    {selectedOrder.shippingAddress?.pincode}
                  </p>
                  <p className="text-earth-muted font-medium mt-1">
                    Phone: {selectedOrder.shippingAddress?.phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-earth block">Purchased Items</span>
                  {selectedOrder.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-beige/40">
                      <div>
                        <p className="font-semibold text-earth">{it.name}</p>
                        <p className="text-earth-muted">
                          Qty: {it.quantity} × ₹{it.price}
                        </p>
                      </div>
                      <span className="font-bold text-earth">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-beige">
                  <div className="flex justify-between text-earth-muted">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-earth-muted">
                    <span>Shipping Fee</span>
                    <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `₹${selectedOrder.shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-bold text-terracotta pt-2 border-t border-beige">
                    <span>Total Paid (COD)</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-beige flex justify-end">
                <Button onClick={() => setSelectedOrder(null)} className="bg-sage text-cream rounded-xl text-xs">
                  Close Invoice
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ADD ADDRESS MODAL */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 bg-earth-dark/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-cream border border-beige max-w-md w-full rounded-3xl p-6 shadow-warm-xl">
              <div className="flex items-center justify-between pb-3 border-b border-beige">
                <h3 className="font-serif text-lg font-bold text-earth">
                  {editingAddress ? 'Edit Shipping Address' : 'Add Shipping Address'}
                </h3>
                <button
                  onClick={() => { setShowAddressModal(false); setEditingAddress(null); setAddressForm(resetAddressForm()); }}
                  className="p-1 rounded-full hover:bg-beige text-earth-muted"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddAddressSubmit} className="space-y-3 pt-4 text-xs">
                <div>
                  <label className="block font-semibold text-earth mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    placeholder="Recipient's full name"
                    className="w-full px-3 py-2 rounded-xl border border-beige bg-cream text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-earth mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 rounded-xl border border-beige bg-cream text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-earth mb-1">Street Address / House No.</label>
                  <input
                    type="text"
                    required
                    value={addressForm.addressLine}
                    onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
                    placeholder="Flat, House no., Building, Street"
                    className="w-full px-3 py-2 rounded-xl border border-beige bg-cream text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-earth mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-beige bg-cream text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-earth mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-beige bg-cream text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-earth mb-1">Pincode / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-beige bg-cream text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={addressSubmitting}
                    className="w-full bg-sage hover:bg-sage-dark text-cream rounded-xl py-2.5"
                  >
                    {addressSubmitting
                      ? 'Saving...'
                      : editingAddress
                        ? 'Update Address'
                        : 'Save Address'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
