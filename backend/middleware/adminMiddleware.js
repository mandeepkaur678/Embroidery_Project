/**
 * Admin Authorization Middleware
 * Restricts route access strictly to users with role === 'admin'.
 *
 * Must be used AFTER authMiddleware (protect) so that req.user is populated.
 *
 * SECURITY: Role is checked from req.user which is populated from the DATABASE
 * in authMiddleware — never from req.body or JWT payload.
 *
 * Usage:
 *   router.post('/', protect, admin, createProduct);
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
};

export { admin };
