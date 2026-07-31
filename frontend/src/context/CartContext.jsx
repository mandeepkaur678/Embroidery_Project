import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import {
  getCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from '../services/cartService';

const LOCAL_CART_KEY = 'artful_guest_cart';

const loadLocalCart = () => {
  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveLocalCart = (items) => {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState(loadLocalCart);
  const [loading, setLoading] = useState(false);
  const [directBuyItem, setDirectBuyItem] = useState(null);

  // Sync cart from backend when authenticated
  const fetchBackendCart = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const cart = await getCartApi();
      if (cart && cart.items) {
        // Map backend cart items
        const mappedItems = cart.items.map((item) => ({
          _id: item.product?._id || item.product,
          productId: item.product?._id || item.product,
          name: item.product?.name || 'Handcrafted Embroidery',
          price: item.price || item.product?.price || 0,
          image:
            (item.product?.images && item.product?.images[0]) ||
            item.product?.image ||
            'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
          quantity: item.quantity,
        }));
        setCartItems(mappedItems);
      }
    } catch (err) {
      console.warn('Backend cart sync failed, using local cart:', err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBackendCart();
    } else {
      setCartItems(loadLocalCart());
    }
  }, [isAuthenticated, fetchBackendCart]);

  // Save to local storage when unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      saveLocalCart(cartItems);
    }
  }, [cartItems, isAuthenticated]);

  /** Add item to cart */
  const addToCart = useCallback(
    async (product, quantity = 1) => {
      const pId = product._id || product.id;
      if (isAuthenticated) {
        try {
          await addToCartApi(pId, quantity);
          await fetchBackendCart();
        } catch (err) {
          toast.error(err.message || 'Failed to add item to server cart');
        }
      } else {
        setCartItems((prev) => {
          const existingIndex = prev.findIndex((item) => item._id === pId || item.productId === pId);
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex].quantity += quantity;
            return updated;
          } else {
            const newItem = {
              _id: pId,
              productId: pId,
              name: product.name,
              price: product.price,
              image:
                (product.images && product.images[0]) ||
                product.image ||
                'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
              quantity,
            };
            return [...prev, newItem];
          }
        });
      }
      toast.success(`${product.name} added to cart!`);
    },
    [isAuthenticated, fetchBackendCart]
  );

  /** Update quantity */
  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity < 1) return;
      if (isAuthenticated) {
        try {
          await updateCartItemApi(productId, quantity);
          await fetchBackendCart();
        } catch (err) {
          toast.error(err.message || 'Failed to update quantity');
        }
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === productId || item.productId === productId ? { ...item, quantity } : item
          )
        );
      }
    },
    [isAuthenticated, fetchBackendCart]
  );

  /** Remove item */
  const removeFromCart = useCallback(
    async (productId) => {
      if (isAuthenticated) {
        try {
          await removeCartItemApi(productId);
          await fetchBackendCart();
        } catch (err) {
          toast.error(err.message || 'Failed to remove item');
        }
      } else {
        setCartItems((prev) => prev.filter((item) => item._id !== productId && item.productId !== productId));
      }
      toast.info('Item removed from cart');
    },
    [isAuthenticated, fetchBackendCart]
  );

  /** Clear entire cart */
  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await clearCartApi();
        setCartItems([]);
      } catch (err) {
        console.warn('Failed to clear backend cart:', err.message);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem(LOCAL_CART_KEY);
    }
  }, [isAuthenticated]);

  /** Set direct buy item ("Buy Now") */
  const buyNow = useCallback((product, quantity = 1) => {
    const pId = product._id || product.id;
    const item = {
      _id: pId,
      productId: pId,
      name: product.name,
      price: product.price,
      image:
        (product.images && product.images[0]) ||
        product.image ||
        'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      quantity,
    };
    setDirectBuyItem(item);
  }, []);

  const clearDirectBuy = useCallback(() => {
    setDirectBuyItem(null);
  }, []);

  // Total Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        shippingFee,
        total,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        directBuyItem,
        buyNow,
        clearDirectBuy,
        fetchBackendCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
