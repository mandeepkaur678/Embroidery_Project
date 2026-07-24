import mongoose from 'mongoose';

/**
 * Middleware to validate MongoDB ObjectId parameters
 */
export const validateProductId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID format',
    });
  }
  next();
};

/**
 * Middleware to validate product data for creation and updates
 */
export const validateProductInput = (req, res, next) => {
  const { name, description, price, category, material, images, sizes, colors } = req.body;

  // Validation for POST (creation) requires all main fields
  if (req.method === 'POST') {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Product name is required and cannot be empty',
      });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Product description is required and cannot be empty',
      });
    }

    if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price is required and must be a non-negative number',
      });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Product category is required and cannot be empty',
      });
    }

    if (!material || typeof material !== 'string' || material.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Product material is required and cannot be empty',
      });
    }
  }

  // Type validation for optional/array fields on both POST and PUT
  if (images !== undefined && !Array.isArray(images)) {
    return res.status(400).json({
      success: false,
      message: 'Images must be an array of image URLs',
    });
  }

  if (sizes !== undefined && !Array.isArray(sizes)) {
    return res.status(400).json({
      success: false,
      message: 'Sizes must be an array of strings',
    });
  }

  if (colors !== undefined && !Array.isArray(colors)) {
    return res.status(400).json({
      success: false,
      message: 'Colors must be an array of strings',
    });
  }

  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({
      success: false,
      message: 'Price must be a non-negative number',
    });
  }

  next();
};
