import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';


export const Sheet = ({ isOpen, onClose, children, title, position = 'right', className }) => {

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

            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
};


