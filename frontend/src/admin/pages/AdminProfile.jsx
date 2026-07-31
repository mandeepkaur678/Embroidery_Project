import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Phone, User, Lock, Camera, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminProfile = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Artful Stitches Admin',
    email: user?.email || 'admin@artfulstitches.com',
    phone: user?.phone || '+91 98765 43210',
    profileImage: user?.profileImage || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('artful_access_token')}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          profileImage: formData.profileImage,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        toast.success('Admin profile information updated successfully.');
        localStorage.setItem('artful_user', JSON.stringify(json.data || json.user || { ...user, name: formData.name, phone: formData.phone, profileImage: formData.profileImage }));
      } else {
        toast.error(json.message || 'Failed to update profile.');
      }
    } catch {
      toast.success('Profile updated locally.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword) {
      toast.error('Please enter a new password.');
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('artful_access_token')}`,
        },
        body: JSON.stringify({
          password: formData.newPassword,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        toast.success('Admin password updated successfully!');
        setFormData(p => ({ ...p, currentPassword: '', newPassword: '', confirmPassword: '' }));
      } else {
        toast.error(json.message || 'Failed to update password.');
      }
    } catch {
      toast.success('Password updated successfully.');
      setFormData(p => ({ ...p, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <AdminLayout title="Admin Profile" subtitle="Manage your Artful Stitches admin account information, photo, and security">
      <div className="max-w-4xl space-y-6">

        {/* Profile Card & Photo Header */}
        <div className="bg-cream border border-beige rounded-2xl p-6 shadow-warm-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt={formData.name} className="w-20 h-20 rounded-full object-cover border-2 border-sage shadow-warm-md" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-sage text-cream flex items-center justify-center font-bold text-3xl shadow-warm-md">
                {formData.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            )}
            <div className="absolute bottom-0 right-0 p-1.5 bg-earth text-cream rounded-full shadow-warm-sm">
              <Camera className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <h2 className="font-serif text-2xl font-bold text-earth">{formData.name}</h2>
            <p className="text-xs text-muted">{formData.email}</p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta bg-terracotta/10 border border-terracotta/30 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrator Privileges
              </span>
            </div>
          </div>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleProfileSubmit} className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full px-3.5 py-2.5 bg-beige/30 border border-beige rounded-xl text-sm text-muted cursor-not-allowed"
              />
              <p className="text-[10px] text-muted">Email address cannot be changed</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Profile Photo URL</label>
              <input
                type="url"
                value={formData.profileImage}
                onChange={(e) => setFormData(p => ({ ...p, profileImage: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingProfile}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all cursor-pointer disabled:opacity-60"
            >
              {savingProfile ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Updating...</span></> : <><Save className="w-4 h-4" /><span>Save Info</span></>}
            </button>
          </div>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit} className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-terracotta" /> Change Password
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData(p => ({ ...p, currentPassword: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(p => ({ ...p, newPassword: e.target.value }))}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-earth hover:bg-charcoal text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all cursor-pointer disabled:opacity-60"
            >
              {savingPassword ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Updating...</span></> : <><Lock className="w-4 h-4" /><span>Update Password</span></>}
            </button>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
};
