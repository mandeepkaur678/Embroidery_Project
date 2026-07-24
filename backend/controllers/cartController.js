import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

/**
 * @desc    Get logged-in user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    return res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      cart,
    });
  } catch (error) {
    console.error('Get Cart Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving cart',
    });
  }
};

/**
 * @desc    Add product to logged-in user's cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate productId presence and format
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid Product ID is required',
      });
    }

    const qty = Number(quantity) || 1;
    if (qty < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number (at least 1)',
      });
    }

    // Retrieve product from DB to get authoritative price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart for user if none exists
      cart = new Cart({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity: qty,
            price: product.price,
          },
        ],
      });
    } else {
      // Check if product is already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Increase quantity for existing item
        cart.items[itemIndex].quantity += qty;
      } else {
        // Add new item with current product price
        cart.items.push({
          product: productId,
          quantity: qty,
          price: product.price,
        });
      }
    }

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cart,
    });
  } catch (error) {
    console.error('Add To Cart Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error adding item to cart',
    });
  }
};

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:productId
 * @access  Private
 */
const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid Product ID is required',
      });
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number (at least 1)',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    item.quantity = qty;

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      cart,
    });
  } catch (error) {
    console.error('Update Cart Item Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating cart item',
    });
  }
};

/**
 * @desc    Remove an item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid Product ID is required',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({
      success: true,
      message: 'Cart item removed successfully',
      cart,
    });
  } catch (error) {
    console.error('Remove Cart Item Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error removing cart item',
    });
  }
};

/**
 * @desc    Clear all items from cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    } else {
      cart.items = [];
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error clearing cart',
    });
  }
};

export {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
