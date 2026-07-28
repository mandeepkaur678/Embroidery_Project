import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

<<<<<<< HEAD
export const Sheet = ({ isOpen, onClose, children, title, position = 'right', className }) => {
=======
const Sheet = ({ isOpen, onClose, children, title = "Navigation Menu" }) => {
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
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

<<<<<<< HEAD
  const positionStyles = {
    right: "top-0 right-0 h-full w-full sm:w-96 translate-x-0",
    left: "top-0 left-0 h-full w-full sm:w-96 translate-x-0",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-earth/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={cn(
          "fixed bg-cream shadow-warm-lg transition-transform duration-300 ease-out flex flex-col p-6 border-l border-beige",
          positionStyles[position],
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-beige/80">
          {title ? (
            <h2 className="font-serif text-xl font-bold text-earth">{title}</h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="p-2 text-earth-muted hover:text-earth rounded-full hover:bg-beige/50 transition-colors"
=======
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
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

<<<<<<< HEAD
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
=======
        <div className="py-6 flex-1">
          {children}
        </div>

        <div className="pt-4 border-t border-beige/40 text-xs text-charcoal/60 text-center">
          <p>© 2026 Thread & Roots.</p>
          <p className="mt-1">Handcrafted with love & nature.</p>
        </div>
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

export { Sheet };
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
