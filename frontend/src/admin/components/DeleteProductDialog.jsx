import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DeleteProductDialog = ({ isOpen, onClose, onConfirm, productName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-earth/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-cream border border-beige rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-warm-lg z-10 space-y-5 animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-earth">
              Delete Product
            </h3>
            <p className="text-xs text-muted">
              Confirm product deletion request.
            </p>
          </div>
        </div>

        <div className="bg-ivory border border-beige p-3.5 rounded-xl space-y-1 text-xs">
          <p className="text-earth font-medium">
            Are you sure you want to delete <span className="font-bold text-error">"{productName}"</span>?
          </p>
          <p className="text-muted">
            This action cannot be undone and will permanently remove this handcrafted item from the store catalog.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-earth border border-beige hover:bg-beige/40 transition-colors"
          >
            Cancel
          </button>

          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-error hover:bg-error/90 text-white text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-warm-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting...' : 'Delete Product'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
