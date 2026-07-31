import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const WISHLIST_KEY = 'artful_wishlist_items';

const loadWishlist = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(loadWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
    } catch (err) {
      console.warn('Failed to save wishlist:', err.message);
    }
  }, [wishlistItems]);

  const isInWishlist = useCallback(
    (productId) => {
      const pId = productId?._id || productId?.id || productId;
      return wishlistItems.some((item) => (item._id || item.id) === pId);
    },
    [wishlistItems]
  );

  const addToWishlist = useCallback((product) => {
    const pId = product._id || product.id;
    setWishlistItems((prev) => {
      if (prev.some((item) => (item._id || item.id) === pId)) return prev;
      toast.success('Added to Wishlist', { description: `${product.name} saved to favorites.` });
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    const pId = productId?._id || productId?.id || productId;
    setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== pId));
    toast.info('Removed from Wishlist');
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      const pId = product._id || product.id;
      if (isInWishlist(pId)) {
        removeFromWishlist(pId);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
};
