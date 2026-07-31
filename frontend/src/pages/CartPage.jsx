import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from 'lucide-react';

export const CartPage = () => {
  const { cartItems, cartCount, subtotal, shippingFee, total, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 1000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-cream/40">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-terracotta mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOUR SELECTIONS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth">
              Shopping Cart ({cartCount})
            </h1>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-dark hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-16 text-center bg-cream border border-beige rounded-3xl p-8 max-w-2xl mx-auto shadow-warm-xs">
            <ShoppingBag className="w-16 h-16 text-earth-muted/40 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-earth mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-earth-muted mb-6">
              Looks like you haven't added any handcrafted embroidery pieces yet.
            </p>
            <Button
              onClick={() => navigate('/shop')}
              className="bg-sage hover:bg-sage-dark text-cream rounded-xl py-3 px-8"
            >
              Explore Collection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Bar */}
              <div className="bg-cream border border-beige/80 rounded-2xl p-4 shadow-warm-xs">
                <div className="flex items-center justify-between text-xs font-semibold text-earth mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-sage" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700 font-bold">🎉 You qualify for FREE Shipping!</span>
                    ) : (
                      <span>
                        Add <strong className="text-terracotta">₹{remainingForFreeShipping}</strong> more for{' '}
                        <strong>FREE Shipping</strong>!
                      </span>
                    )}
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-beige/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-cream border border-beige/80 rounded-3xl p-4 sm:p-6 shadow-warm-xs divide-y divide-beige/60">
                {cartItems.map((item) => (
                  <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover border border-beige shrink-0"
                      />
                      <div>
                        <h3 className="font-serif text-base font-bold text-earth">{item.name}</h3>
                        <p className="text-xs text-earth-muted mt-0.5">Price: ₹{item.price}</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 mt-2 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-beige rounded-xl overflow-hidden bg-cream">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 text-earth hover:bg-beige/60 disabled:opacity-30 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3.5 text-xs font-bold text-earth">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 text-earth hover:bg-beige/60 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal per item */}
                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-terracotta">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-between items-center text-xs">
                <button
                  onClick={clearCart}
                  className="text-earth-muted hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-cream border border-beige/80 rounded-3xl p-6 shadow-warm-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-earth pb-4 border-b border-beige">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-earth-muted">
                  <span>Subtotal</span>
                  <span className="font-medium text-earth">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-earth-muted">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-earth">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-beige flex justify-between font-serif text-xl font-bold text-earth">
                  <span>Total</span>
                  <span className="text-terracotta">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-sage hover:bg-sage-dark text-cream font-medium rounded-xl flex items-center justify-center gap-2 group shadow-warm-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="pt-4 border-t border-beige/60 text-center space-y-2 text-xs text-earth-muted">
                <div className="flex items-center justify-center gap-1.5 text-sage-dark font-medium">
                  <ShieldCheck className="w-4 h-4 text-sage" />
                  <span>100% Secure Checkout with COD</span>
                </div>
                <p>Handcrafted & Packed with Care</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
