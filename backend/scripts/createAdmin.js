/**
 * scripts/createAdmin.js — Artful Stitches Admin Creation Script
 *
 * Usage:
 *   node scripts/createAdmin.js
 *
 * This script is safe to run multiple times.
 * If the admin already exists, it will NOT create a duplicate.
 *
 * Required .env variables:
 *   ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import User from '../models/User.js';

const createAdmin = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/embroidery_db';
  const ADMIN_NAME = process.env.ADMIN_NAME;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // Validate environment variables
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ Missing required environment variables: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD');
    console.error('   Please set them in your .env file before running this script.');
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists — prevent duplicate creation
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase().trim() });

    if (existingAdmin) {
      console.log('ℹ️  Admin already exists. No duplicate created.');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role:  ${existingAdmin.role}`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash the admin password securely — NEVER log plain-text password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Create admin — role is hardcoded to 'admin', never from request body
    const admin = await User.create({
      name: ADMIN_NAME.trim(),
      email: ADMIN_EMAIL.toLowerCase().trim(),
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin account created successfully!');
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role:  ${admin.role}`);
    console.log('   ⚠️  Keep your admin credentials safe. Never commit .env to Git.');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

createAdmin();
