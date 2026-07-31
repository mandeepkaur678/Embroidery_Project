import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrderApi } from '../services/orderService';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import {
  ShieldCheck,
  Truck,
  CheckCircle,
  Loader2,
  MapPin,
  Plus,
  ArrowRight,
  ShoppingBag,
  CreditCard,
} from 'lucide-react';

export const Checkout = () => {
  const { user, addAddress } = useAuth();
  const { cartItems, subtotal, shippingFee, total, clearCart, directBuyItem, clearDirectBuy } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDirectBuy = searchParams.get('direct') === 'true' || Boolean(directBuyItem);

  // Items to checkout
  const checkoutItems = isDirectBuy && directBuyItem ? [directBuyItem] : cartItems;

  const activeSubtotal = checkoutItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const activeShippingFee = activeSubtotal === 0 ? 0 : activeSubtotal >= 1000 ? 0 : 50;
  const activeTotal = activeSubtotal + activeShippingFee;

  // Selected Address State
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [useNewAddress, setUseNewAddress] = useState(false);

  // Address Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Select default address if available
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddr._id);
      setShippingAddress({
        fullName: defaultAddr.fullName,
        phone: defaultAddr.phone,
        address: defaultAddr.addressLine || defaultAddr.address || '',
        city: defaultAddr.city,
        state: defaultAddr.state,
        pincode: defaultAddr.postalCode || defaultAddr.pincode || '',
      });
    }
  }, [user]);

  const handleAddressSelect = (addr) => {
    setSelectedAddressId(addr._id);
    setUseNewAddress(false);
    setShippingAddress({
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.addressLine || addr.address || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.postalCode || addr.pincode || '',
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      toast.error('Please fill in all required shipping address fields');
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error('Your order has no items to purchase');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        shippingAddress: {
          fullName: shippingAddress.fullName.trim(),
          phone: shippingAddress.phone.trim(),
          address: shippingAddress.address.trim(),
          city: shippingAddress.city.trim(),
          state: shippingAddress.state.trim(),
          pincode: shippingAddress.pincode.trim(),
        },
        paymentMethod: 'COD',
      };

      const createdOrder = await createOrderApi(orderPayload);
      toast.success('🎉 Order Placed Successfully!', {
        description: `Order #${createdOrder._id?.substring(createdOrder._id.length - 8)?.toUpperCase()} confirmed via Cash on Delivery.`,
      });

      // Clear cart or direct buy state
      if (isDirectBuy) {
        clearDirectBuy();
      } else {
        await clearCart();
      }

      // Redirect to Profile Page Orders tab
      navigate('/profile');
    } catch (err) {
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream/40">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth mb-8">
          Checkout {isDirectBuy ? '(Direct Buy)' : ''}
        </h1>

        {checkoutItems.length === 0 ? (
          <div className="py-16 text-center bg-cream border border-beige rounded-3xl p-8 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-earth-muted/40 mx-auto mb-3" />
            <h2 className="font-serif text-xl font-bold text-earth mb-2">No Items to Checkout</h2>
            <Button onClick={() => navigate('/shop')} className="bg-sage text-cream rounded-xl">
              Return to Shop
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Shipping Address & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Saved Address Selector */}
              {user?.addresses && user.addresses.length > 0 && (
                <div className="bg-cream border border-beige/80 rounded-3xl p-6 shadow-warm-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-lg font-bold text-earth flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sage" /> Select Delivery Address
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setUseNewAddress(!useNewAddress);
                        if (!useNewAddress) {
                          setSelectedAddressId('');
                          setShippingAddress({
                            fullName: user?.name || '',
                            phone: user?.phone || '',
                            address: '',
                            city: '',
                            state: '',
                            pincode: '',
                          });
                        }
                      }}
                      className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
                    >
                      {useNewAddress ? 'Use Saved Address' : '+ Add New Address'}
                    </button>
                  </div>

                  {!useNewAddress && (
                    <div className="grid grid-cols-1 gap-3">
                      {user.addresses.map((addr) => (
                        <label
                          key={addr._id}
                          onClick={() => handleAddressSelect(addr)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                            selectedAddressId === addr._id
                              ? 'border-sage bg-sage/10 ring-2 ring-sage/30'
                              : 'border-beige/80 bg-cream hover:border-beige'
                          }`}
                        >
                          <input
                            type="radio"
                            name="savedAddress"
                            checked={selectedAddressId === addr._id}
                            onChange={() => handleAddressSelect(addr)}
                            className="mt-1 accent-sage"
                          />
                          <div className="text-xs space-y-1">
                            <span className="font-bold text-earth block">{addr.fullName}</span>
                            <p className="text-earth-muted">{addr.addressLine || addr.address}</p>
                            <p className="text-earth-muted">
                              {addr.city}, {addr.state} - {addr.postalCode || addr.pincode}
                            </p>
                            <p className="text-earth-muted font-medium">Phone: {addr.phone}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Shipping Address Inputs Form */}
              {(useNewAddress || !user?.addresses || user.addresses.length === 0) && (
                <div className="bg-cream border border-beige/80 rounded-3xl p-6 shadow-warm-xs space-y-4">
                  <h2 className="font-serif text-lg font-bold text-earth flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sage" /> Shipping Address Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-earth mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-earth mb-1">Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-earth mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="House / Flat No., Street, Area"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-earth mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-earth mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-earth mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.pincode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm text-earth"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-cream border border-beige/80 rounded-3xl p-6 shadow-warm-xs space-y-4">
                <h2 className="font-serif text-lg font-bold text-earth flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-sage" /> Payment Option
                </h2>

                <div className="p-4 rounded-2xl border border-sage bg-sage/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-cream font-bold text-xs">
                      COD
                    </div>
                    <div>
                      <p className="font-bold text-sm text-earth">Cash on Delivery (COD)</p>
                      <p className="text-xs text-earth-muted">Pay with cash when your package arrives.</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-sage" />
                </div>
              </div>
            </div>

            {/* Right Column: Order Items & Submit */}
            <div className="lg:col-span-5 bg-cream border border-beige/80 rounded-3xl p-6 shadow-warm-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-earth pb-4 border-b border-beige">
                Items ({checkoutItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {checkoutItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-beige shrink-0"
                      />
                      <div>
                        <p className="font-bold text-earth">{item.name}</p>
                        <p className="text-earth-muted">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-earth">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-beige text-xs">
                <div className="flex justify-between text-earth-muted">
                  <span>Subtotal</span>
                  <span>₹{activeSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-earth-muted">
                  <span>Shipping Fee</span>
                  <span>
                    {activeShippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${activeShippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-serif text-lg font-bold text-earth pt-3 border-t border-beige">
                  <span>Total Amount</span>
                  <span className="text-terracotta">₹{activeTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-sage hover:bg-sage-dark text-cream font-medium rounded-xl flex items-center justify-center gap-2 group shadow-warm-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cream" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Place Order (COD)</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
