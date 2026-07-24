import Product from '../models/Product.js';

/**
 * @desc    Get all products (with optional filtering by category or search keyword)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const query = {};

    // Filter by category if provided
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Search keyword in name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

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
    const product = await Product.findById(req.params.id);

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
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, sizes, colors, material } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: images || [],
      sizes: sizes || [],
      colors: colors || [],
      material,
    });

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
 * @desc    Update a product by ID
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

    const { name, description, price, category, images, sizes, colors, material } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (images !== undefined) product.images = images;
    if (sizes !== undefined) product.sizes = sizes;
    if (colors !== undefined) product.colors = colors;
    if (material !== undefined) product.material = material;

    const updatedProduct = await product.save();

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
 * @desc    Delete a product by ID
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
