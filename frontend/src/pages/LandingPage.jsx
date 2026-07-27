import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { CollectionSection } from '../components/CollectionSection';
import { AboutSection } from '../components/AboutSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Sample Cart Data for interactive drawer
const initialCartItems = [
  {
    id: 1,
    name: "Wildflower Meadow Hoop",
    price: 48.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Earthy Linen Tote Bag",
    price: 36.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Botanical Monstera Wall Art",
    price: 52.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80"
  }
];

export const LandingPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast("Item removed from cart");
  };

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSelectCollection = (collectionName) => {
    showToast(`Exploring ${collectionName} collection!`);
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans flex flex-col selection:bg-beige selection:text-mocha">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-mocha text-cream px-5 py-3 rounded-2xl shadow-2xl border border-beige/40 flex items-center space-x-3 animate-in slide-in-from-bottom-5 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* 1. Navbar */}
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Services / Why Choose Us Section */}
        <ServicesSection />

        {/* 4. Featured Collections Section */}
        <CollectionSection onSelectCollection={handleSelectCollection} />

        {/* 5. About / Brand Story Section */}
        <AboutSection />

        {/* 6. Call To Action Section */}
        <CTASection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Interactive Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />
          <div className="relative z-50 w-full max-w-md h-full bg-cream p-6 shadow-2xl flex flex-col justify-between border-l border-beige/40">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-beige/40">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-mocha" />
                <h3 className="font-serif text-xl font-bold text-mocha">Your Basket</h3>
                <span className="text-xs bg-sage/20 text-sage-dark px-2.5 py-0.5 rounded-full font-bold">
                  {cartCount} items
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-mocha hover:text-sage rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Item List */}
            <div className="py-4 flex-1 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-charcoal/60">
                  <p className="font-serif text-lg">Your cart is empty.</p>
                  <p className="text-xs mt-1">Discover handcrafted embroidery pieces!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-white rounded-xl border border-beige/60 shadow-warm-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-beige" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-mocha font-serif">{item.name}</h4>
                      <p className="text-xs text-charcoal/60">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-sage-dark">${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="p-1.5 text-charcoal/40 hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            <div className="pt-4 border-t border-beige/40 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-mocha">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-charcoal/60">Taxes and shipping calculated at checkout.</p>
              <Button variant="default" className="w-full justify-center shadow-lg" onClick={() => alert("Proceeding to checkout...")}>
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
