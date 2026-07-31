import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { convertBase64ToWebP } from '../utils/imageConverter.js';

const slugify = (text) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const resolveCategory = async (categoryInput) => {
  if (!categoryInput) return null;

  const inputStr = String(categoryInput).trim();

  // 1. If valid ObjectId, check if category exists in MongoDB
  if (mongoose.Types.ObjectId.isValid(inputStr)) {
    const existingById = await Category.findById(inputStr);
    if (existingById) return existingById._id;
  }

  // 2. Search by name or slug in MongoDB
  const escapedInput = inputStr.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  let categoryDoc = await Category.findOne({
    $or: [
      { name: { $regex: `^${escapedInput}$`, $options: 'i' } },
      { slug: inputStr.toLowerCase() },
    ],
  });

  if (categoryDoc) {
    return categoryDoc._id;
  }

  // 3. Map mock category IDs to real names
  const nameMap = {
    'cat_1': 'Embroidered Clothing',
    'cat_2': 'Home Decor',
    'cat_3': 'Bags & Pouches',
    'cat_4': 'Accessories',
    'cat_5': 'Custom Embroidery',
  };

  const categoryName = nameMap[inputStr] || inputStr;
  const escapedName = categoryName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

  categoryDoc = await Category.findOne({
    name: { $regex: `^${escapedName}$`, $options: 'i' },
  });

  if (categoryDoc) {
    return categoryDoc._id;
  }

  // 4. Auto-create category in MongoDB if not found so product creation never fails
  const baseSlug = slugify(categoryName);
  const newCat = await Category.create({
    name: categoryName,
    slug: baseSlug,
    description: `${categoryName} handcrafted items`,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    isActive: true,
  });

  return newCat._id;
};

/**
 * @desc    Get all products (with optional filtering by category or search keyword)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const query = {};

    // Filter by category slug, name or ObjectId if provided
    if (category && category !== 'All Products' && category !== 'all') {
      let resolvedCategory = null;

      if (mongoose.Types.ObjectId.isValid(category)) {
        resolvedCategory = category;
      } else {
        const categoryDoc = await Category.findOne({
          $or: [
            { slug: category },
            { name: { $regex: `^${category.trim()}$`, $options: 'i' } },
          ],
        });
        if (categoryDoc) resolvedCategory = categoryDoc._id;
      }

      if (resolvedCategory) {
        query.category = resolvedCategory;
      }
    }

    // Search keyword in name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query)
      .populate('category', 'name description image')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving products',
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name description image');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get Product By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving product',
    });
  }
};

/**
 * @desc    Create a new product (Admin only)
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, category, images, stock, sizes, colors, material, featured, isFeatured, status } = req.body;

    const categoryId = await resolveCategory(category);
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category provided. Please provide a valid category id or name.',
      });
    }

    // Support both 'featured' and 'isFeatured' field names from admin UI
    const featuredFlag = featured === true || featured === 'true' || isFeatured === true;
    // Support 'status' field from admin UI: Active = visible, anything else = hidden
    const activeFlag = !status || status === 'Active' || status === 'active';

    // Convert any base64 images into standard WebP files on disk
    let finalImages = Array.isArray(images) ? images : [];
    finalImages = await Promise.all(finalImages.map((img) => convertBase64ToWebP(img, 'product')));

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice: discountPrice || null,
      category: categoryId,
      images: finalImages,
      stock: typeof stock === 'number' ? stock : Number(stock) || 0,
      sizes: Array.isArray(sizes) ? sizes : (typeof sizes === 'string' ? sizes.split(',').map((item) => item.trim()).filter(Boolean) : []),
      colors: Array.isArray(colors) ? colors : (typeof colors === 'string' ? colors.split(',').map((item) => item.trim()).filter(Boolean) : []),
      material,
      isFeatured: featuredFlag,
      isActive: activeFlag,
    });

    // Populate category after creation
    await product.populate('category', 'name description image');

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating product',
    });
  }
};

/**
 * @desc    Update a product by ID (Admin only)
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const { name, description, price, discountPrice, category, images, stock, sizes, colors, material, featured, isFeatured, status } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (category !== undefined) {
      const categoryId = await resolveCategory(category);
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category provided. Please provide a valid category id or name.',
        });
      }
      product.category = categoryId;
    }
    if (images !== undefined) {
      let finalImages = Array.isArray(images) ? images : [];
      finalImages = await Promise.all(finalImages.map((img) => convertBase64ToWebP(img, 'product')));
      product.images = finalImages;
    }
    if (stock !== undefined) product.stock = typeof stock === 'number' ? stock : Number(stock) || product.stock;
    if (sizes !== undefined) {
      product.sizes = Array.isArray(sizes)
        ? sizes
        : (typeof sizes === 'string' ? sizes.split(',').map((item) => item.trim()).filter(Boolean) : []);
    }
    if (colors !== undefined) {
      product.colors = Array.isArray(colors)
        ? colors
        : (typeof colors === 'string' ? colors.split(',').map((item) => item.trim()).filter(Boolean) : []);
    }
    if (material !== undefined) product.material = material;
    // Handle featured and isActive fields from admin UI
    if (featured !== undefined || isFeatured !== undefined) {
      product.isFeatured = featured === true || featured === 'true' || isFeatured === true;
    }
    if (status !== undefined) {
      product.isActive = !status || status === 'Active' || status === 'active';
    }

    const updatedProduct = await product.save();
    await updatedProduct.populate('category', 'name description image');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating product',
    });
  }
};

/**
 * @desc    Delete a product by ID (Admin only)
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting product',
    });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
