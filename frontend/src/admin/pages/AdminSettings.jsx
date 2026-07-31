import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Store, Mail, Phone, MapPin, DollarSign, Truck, Percent, Share2, Save, RotateCcw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_SETTINGS = {
  storeName: 'Artful Stitches',
  logoUrl: 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=200',
  email: 'contact@artfulstitches.com',
  phone: '+91 98765 43210',
  address: '123 Artisan Crafts Lane, Creative District, Jaipur, Rajasthan 302001',
  currency: 'INR (₹)',
  shippingCharges: 50,
  freeShippingMinOrder: 1000,
  taxPercent: 5,
  instagramUrl: 'https://instagram.com/artfulstitches',
  facebookUrl: 'https://facebook.com/artfulstitches',
  pinterestUrl: 'https://pinterest.com/artfulstitches',
};

export const AdminSettings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('artful_store_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('artful_store_settings', JSON.stringify(settings));
      toast.success('Store settings saved successfully!', {
        description: 'Store configurations have been updated.'
      });
      setIsSaving(false);
    }, 600);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('artful_store_settings');
    toast.info('Store settings reset to defaults.');
  };

  return (
    <AdminLayout
      title="Store Settings"
      subtitle="Configure store branding, contact information, shipping rates, tax, and social links"
    >
      <form onSubmit={handleSave} className="max-w-4xl space-y-6">

        {/* Store Branding */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-sage" /> Store Branding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleChange('storeName', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Logo URL</label>
              <input
                type="url"
                value={settings.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-terracotta" /> Store Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Support Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Contact Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-earth uppercase tracking-wider">Physical Business Address</label>
            <textarea
              rows={3}
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40 resize-none"
            />
          </div>
        </div>

        {/* Financial & Shipping */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-gold" /> Currency, Shipping & Tax
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Shipping Fee (₹)</label>
              <input
                type="number"
                value={settings.shippingCharges}
                onChange={(e) => handleChange('shippingCharges', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Free Shipping Min Order (₹)</label>
              <input
                type="number"
                value={settings.freeShippingMinOrder}
                onChange={(e) => handleChange('freeShippingMinOrder', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">GST / Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxPercent}
                onChange={(e) => handleChange('taxPercent', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-peach" /> Social Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Instagram</label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Facebook</label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Pinterest</label>
              <input
                type="url"
                value={settings.pinterestUrl}
                onChange={(e) => handleChange('pinterestUrl', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving...</span></> : <><Save className="w-4 h-4" /><span>Save Settings</span></>}
          </button>
        </div>

      </form>
    </AdminLayout>
  );
};
