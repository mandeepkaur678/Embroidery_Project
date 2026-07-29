import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Settings, ShieldCheck, Bell, Globe } from 'lucide-react';

export const AdminSettings = () => (
  <AdminLayout title="Settings" subtitle="Artful Stitches admin settings and configurations">
    <div className="max-w-2xl space-y-5">
      {[
        { icon: ShieldCheck, title: 'Security', description: 'Manage admin access controls and authentication.', color: 'bg-sage/10 text-sage' },
        { icon: Bell, title: 'Notifications', description: 'Configure order and inventory alert notifications.', color: 'bg-gold/10 text-gold' },
        { icon: Globe, title: 'Store Settings', description: 'Update store currency, language, and regional settings.', color: 'bg-terracotta/10 text-terracotta' },
        { icon: Settings, title: 'Advanced', description: 'Developer and advanced configuration options.', color: 'bg-muted/10 text-muted' },
      ].map((setting) => {
        const Icon = setting.icon;
        return (
          <div key={setting.title} className="bg-cream border border-beige rounded-2xl p-5 shadow-warm-sm flex items-center gap-4 hover:shadow-warm-md transition-all cursor-pointer group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${setting.color}`}>
              <Icon className="w-5.5 h-5.5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-earth group-hover:text-sage transition-colors">{setting.title}</p>
              <p className="text-xs text-muted">{setting.description}</p>
            </div>
          </div>
        );
      })}
      <div className="bg-ivory border border-beige rounded-2xl p-5 text-xs text-muted text-center">
        Full settings configuration will be available in the next release. Contact your developer for customisations.
      </div>
    </div>
  </AdminLayout>
);
