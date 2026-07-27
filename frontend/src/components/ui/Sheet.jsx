import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sheet = ({ isOpen, onClose, children, title = "Navigation Menu" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div 
        className={cn(
          "relative z-50 w-full max-w-xs h-full bg-cream p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between border-l border-beige/40 overflow-y-auto"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between pb-4 border-b border-beige/40">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sage"></span>
            <h2 className="text-lg font-serif font-bold text-mocha">Thread & Roots</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-mocha hover:text-sage hover:bg-beige-subtle rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 flex-1">
          {children}
        </div>

        <div className="pt-4 border-t border-beige/40 text-xs text-charcoal/60 text-center">
          <p>© 2026 Thread & Roots.</p>
          <p className="mt-1">Handcrafted with love & nature.</p>
        </div>
      </div>
    </div>
  );
};

export { Sheet };
