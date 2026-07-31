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

const parseNumberField = (value) => {
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
};

const parseArrayField = (value) => {
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return value;
};

/**
 * Middleware to validate product data for creation and updates
 */
export const validateProductInput = (req, res, next) => {
  let { name, description, price, discountPrice, category, material, images, sizes, colors, stock } = req.body;

  price = parseNumberField(price);
  discountPrice = parseNumberField(discountPrice);
  stock = parseNumberField(stock);
  sizes = parseArrayField(sizes);
  colors = parseArrayField(colors);

  req.body.price = price;
  req.body.discountPrice = discountPrice;
  req.body.stock = stock;
  req.body.sizes = sizes;
  req.body.colors = colors;

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
        message: 'Category is required',
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
  if (images !== undefined && images !== null && !Array.isArray(images)) {
    return res.status(400).json({
      success: false,
      message: 'Images must be an array of image URLs',
    });
  }

  if (sizes !== undefined && sizes !== null && !Array.isArray(sizes)) {
    return res.status(400).json({
      success: false,
      message: 'Sizes must be an array of strings',
    });
  }

  if (colors !== undefined && colors !== null && !Array.isArray(colors)) {
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

  if (discountPrice !== undefined && discountPrice !== null && (typeof discountPrice !== 'number' || discountPrice < 0)) {
    return res.status(400).json({
      success: false,
      message: 'Discount price must be a non-negative number',
    });
  }

  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    return res.status(400).json({
      success: false,
      message: 'Stock must be a non-negative number',
    });
  }

  next();
};
