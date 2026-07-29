import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';

// Route Guards
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Unauthorized } from './pages/Unauthorized';

// Admin Pages
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminProducts } from './admin/pages/AdminProducts';
import { AddProduct } from './admin/pages/AddProduct';
import { EditProduct } from './admin/pages/EditProduct';
import { AdminCategories } from './admin/pages/AdminCategories';
import { AdminOrders } from './admin/pages/AdminOrders';
import { AdminUsers } from './admin/pages/AdminUsers';
import { AdminProfile } from './admin/pages/AdminProfile';
import { AdminSettings } from './admin/pages/AdminSettings';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            {/* ================================================
              PUBLIC ROUTES – accessible to everyone
            ================================================ */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Shop />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* ================================================
              USER PROTECTED ROUTES – logged-in users only
            ================================================ */}
            <Route path="/profile" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/addresses" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />

            {/* ================================================
              ADMIN PROTECTED ROUTES – admin role only
              AdminRoute checks: isAuthenticated && role === 'admin'
              Non-admins are redirected to /unauthorized
            ================================================ */}
            <Route
              path="/admin/dashboard"
              element={<AdminRoute><AdminDashboard /></AdminRoute>}
            />
            <Route
              path="/admin/products"
              element={<AdminRoute><AdminProducts /></AdminRoute>}
            />
            <Route
              path="/admin/products/add"
              element={<AdminRoute><AddProduct /></AdminRoute>}
            />
            <Route
              path="/admin/products/edit/:id"
              element={<AdminRoute><EditProduct /></AdminRoute>}
            />
            <Route
              path="/admin/categories"
              element={<AdminRoute><AdminCategories /></AdminRoute>}
            />
            <Route
              path="/admin/orders"
              element={<AdminRoute><AdminOrders /></AdminRoute>}
            />
            <Route
              path="/admin/users"
              element={<AdminRoute><AdminUsers /></AdminRoute>}
            />
            <Route
              path="/admin/profile"
              element={<AdminRoute><AdminProfile /></AdminRoute>}
            />
            <Route
              path="/admin/settings"
              element={<AdminRoute><AdminSettings /></AdminRoute>}
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<LandingPage />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
