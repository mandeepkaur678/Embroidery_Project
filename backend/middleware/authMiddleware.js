import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware
 * Protects endpoints by verifying JWT Access Token from Authorization header.
 *
 * SECURITY:
 * - Role is always fetched fresh from the database (never trusted from JWT payload)
 * - Deactivated accounts are rejected with 403
 * - Missing or invalid tokens return 401
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature and expiry
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_access_secret_key_change_in_production'
      );

      // Fetch fresh user from DB — NEVER trust role from JWT payload
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      // Reject deactivated accounts
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Your account has been deactivated. Please contact support.',
        });
      }

      // Attach user to request — role comes from DB, never from JWT or request body
      req.user = {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,        // <-- from database, not from token
        isActive: user.isActive,
        phone: user.phone,
        profileImage: user.profileImage,
        addresses: user.addresses,
      };

      next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }
};

export { protect };
