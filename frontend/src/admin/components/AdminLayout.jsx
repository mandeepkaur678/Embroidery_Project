import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const AdminLayout = ({ children, title, subtitle, actions }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex text-charcoal">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

          {/* Optional Page Header Title Row */}
          {(title || actions) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-beige/60">
              <div>
                {title && (
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-earth tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-muted mt-0.5 font-normal">
                    {subtitle}
                  </p>
                )}
              </div>

              {actions && (
                <div className="flex items-center gap-3 shrink-0">
                  {actions}
                </div>
              )}
            </div>
          )}

          {/* Children View Content */}
          <div className="animate-fadeIn">
            {children}
          </div>

        </main>
      </div>
    </div>
  );
};
