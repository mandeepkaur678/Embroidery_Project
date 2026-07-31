import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { ensureCategoriesSeeded } from './utils/seedCategories.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ==========================================
// Core Middleware
// ==========================================
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ==========================================
// Static File Serving — uploaded images
// ==========================================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
// API Routes
// ==========================================

// Auth routes (register, login, me)
app.use('/api/auth', authRoutes);

// User routes (profile, addresses, admin user management)
app.use('/api/users', userRoutes);

// Dashboard routes (admin stats)
app.use('/api/dashboard', dashboardRoutes);

// Product routes (public GET, admin POST/PUT/DELETE)
app.use('/api/products', productRoutes);

// Category routes (public GET, admin POST/PUT/DELETE)
app.use('/api/categories', categoryRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

// Order routes (customer orders, admin order management)
app.use('/api/orders', orderRoutes);

// Address routes
app.use('/api/addresses', addressRoutes);

// Contact routes
app.use('/api/contact', contactRoutes);

// Upload routes (image/images)
app.use('/api/upload', uploadRoutes);

// ==========================================
// Base Route
// ==========================================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Artful Stitches API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      dashboard: '/api/dashboard',
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart',
      orders: '/api/orders',
      addresses: '/api/addresses',
      contact: '/api/contact',
    },
  });
});

// ==========================================
// Error Handling Middleware
// ==========================================
app.use(notFound);
app.use(errorHandler);

// ==========================================
// Database Connection & Server Start
// ==========================================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/embroidery_db';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully');
    await ensureCategoriesSeeded();
    app.listen(PORT, () => {
      console.log(`🚀 Artful Stitches API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
