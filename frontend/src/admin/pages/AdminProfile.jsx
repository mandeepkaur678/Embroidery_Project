import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Phone, User } from 'lucide-react';

export const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <AdminLayout title="Admin Profile" subtitle="Your Artful Stitches admin account information">
      <div className="max-w-xl space-y-5">
        <div className="bg-cream border border-beige rounded-2xl p-6 shadow-warm-sm space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-2xl shadow-warm-md">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-earth">{user?.name}</h2>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta bg-terracotta/10 border border-terracotta/30 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrator
              </span>
            </div>
          </div>
          <hr className="border-beige" />
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-sage shrink-0" />
              <span className="text-charcoal">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="w-4 h-4 text-sage shrink-0" />
              <span className="text-charcoal">Role: <strong className="text-earth">Admin</strong></span>
            </div>
          </div>
        </div>
        <div className="bg-ivory border border-beige rounded-2xl p-5 text-xs text-muted text-center">
          To update your admin profile or change your password, please contact the system administrator.
        </div>
      </div>
    </AdminLayout>
  );
};
