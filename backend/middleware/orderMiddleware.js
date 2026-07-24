import mongoose from 'mongoose';

/**
 * Middleware to validate MongoDB ObjectId for order routes
 */
export const validateOrderId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Order ID format',
    });
  }
  next();
};

/**
 * Middleware to validate incoming order creation data (Shipping Address & COD payment)
 */
export const validateCreateOrderInput = (req, res, next) => {
  const { shippingAddress, paymentMethod } = req.body;

  // Reject non-COD payment methods
  if (!paymentMethod || typeof paymentMethod !== 'string' || paymentMethod.trim().toUpperCase() !== 'COD') {
    return res.status(400).json({
      success: false,
      message: 'Only Cash on Delivery (COD) payment method is currently supported',
    });
  }

  // Validate shipping address object presence
  if (!shippingAddress || typeof shippingAddress !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Shipping address object is required',
    });
  }

  const { fullName, phone, address, city, state, pincode } = shippingAddress;

  // Validate non-empty string required fields
  const requiredFields = { fullName, phone, address, city, state, pincode };

  for (const [key, val] of Object.entries(requiredFields)) {
    if (!val || typeof val !== 'string' || val.trim() === '') {
      return res.status(400).json({
        success: false,
        message: `Shipping address field '${key}' is required and cannot be empty`,
      });
    }
  }

  next();
};

/**
 * Middleware to validate order status update input (Admin)
 */
export const validateOrderStatusInput = (req, res, next) => {
  const { orderStatus } = req.body;
  const allowedStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!orderStatus || typeof orderStatus !== 'string' || !allowedStatuses.includes(orderStatus.trim())) {
    return res.status(400).json({
      success: false,
      message: `Invalid order status provided. Allowed statuses: ${allowedStatuses.join(', ')}`,
    });
  }

  next();
};
