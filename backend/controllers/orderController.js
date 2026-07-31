import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

/**
 * @desc    Create a new COD order from user's cart
 * @route   POST /api/orders
 * @access  Private (Customer)
 */
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Reject non-COD payment methods strictly
    if (!paymentMethod || paymentMethod.toUpperCase() !== 'COD') {
      return res.status(400).json({
        success: false,
        message: 'Only Cash on Delivery (COD) payment method is currently supported',
      });
    }

    // Validate shipping address
    if (!shippingAddress || typeof shippingAddress !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required',
      });
    }

    const { fullName, phone, address, city, state, pincode } = shippingAddress;

    if (
      !fullName || typeof fullName !== 'string' || fullName.trim() === '' ||
      !phone || typeof phone !== 'string' || phone.trim() === '' ||
      !address || typeof address !== 'string' || address.trim() === '' ||
      !city || typeof city !== 'string' || city.trim() === '' ||
      !state || typeof state !== 'string' || state.trim() === '' ||
      !pincode || typeof pincode !== 'string' || pincode.trim() === ''
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required shipping address fields (fullName, phone, address, city, state, pincode)',
      });
    }

    // Retrieve user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty. Please add products before placing an order',
      });
    }

    // Verify each product exists and build order items array using cart-stored prices
    const orderItems = [];
    for (const item of cart.items) {
      if (!item.product) {
        return res.status(404).json({
          success: false,
          message: 'One or more items in your cart are no longer available',
        });
      }

      orderItems.push({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images && item.product.images.length > 0 ? item.product.images[0] : '',
        quantity: item.quantity,
        price: item.price, // Lock in price stored in cart
      });
    }

    // Calculate subtotal
    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Backend Shipping Fee Rule: Free shipping for subtotal >= ₹1000, else ₹50
    const shippingFee = subtotal >= 1000 ? 0 : 50;

    // Calculate total amount
    const totalAmount = subtotal + shippingFee;

    // Create Order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
      },
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
    });

    // Clear cart after successful order creation
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
      data: order,
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating order',
    });
  }
};

/**
 * @desc    Get logged-in user's order history
 * @route   GET /api/orders/my-orders
 * @access  Private (Customer)
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', '-password')
      .populate('items.product');

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
      data: orders,
    });
  } catch (error) {
    console.error('Get My Orders Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving your orders',
    });
  }
};

/**
 * @desc    Get order details by ID
 * @route   GET /api/orders/:id
 * @access  Private (Customer or Admin)
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Order ID format',
      });
    }

    const order = await Order.findById(id)
      .populate('user', '-password')
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Ensure user can only view their own order (unless admin)
    const isOwner = order.user && order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to view this order',
      });
    }

    return res.status(200).json({
      success: true,
      order,
      data: order,
    });
  } catch (error) {
    console.error('Get Order By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving order',
    });
  }
};

/**
 * @desc    Cancel an order (Pending or Confirmed status only)
 * @route   PUT /api/orders/:id/cancel
 * @access  Private (Customer)
 */
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Order ID format',
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check ownership
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only cancel your own orders',
      });
    }

    // Allow cancellation only when status is 'Pending' or 'Confirmed'
    if (!['Pending', 'Confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled as it is already '${order.orderStatus}'`,
      });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order,
      data: order,
    });
  } catch (error) {
    console.error('Cancel Order Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error cancelling order',
    });
  }
};

/**
 * @desc    Get all orders across all users (Admin only)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', '-password')
      .populate('items.product');

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
      data: orders,
    });
  } catch (error) {
    console.error('Get All Orders Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving all orders',
    });
  }
};

/**
 * @desc    Update order status (Admin only)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, status } = req.body;
    const newStatus = orderStatus || status;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Order ID format',
      });
    }

    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!newStatus || !validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.orderStatus = newStatus;

    // Automatically set paymentStatus = 'Paid' when order is delivered for COD
    if (newStatus === 'Delivered') {
      order.paymentStatus = 'Paid';
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
      data: order,
    });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating order status',
    });
  }
};

/**
 * @desc    Delete an order by ID (Admin only)
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Order ID format',
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    await order.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Delete Order Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting order',
    });
  }
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
