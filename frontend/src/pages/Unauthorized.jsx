import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-ivory border border-beige rounded-2xl p-8 sm:p-12 text-center max-w-md w-full shadow-warm-md space-y-5">
        <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-earth">
            Access Restricted
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            You do not have permission to access this page. Admin privileges are required to manage products, users, categories, and orders.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button className="bg-sage hover:bg-sage-dark text-cream font-medium px-6 py-2.5 rounded-full inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
