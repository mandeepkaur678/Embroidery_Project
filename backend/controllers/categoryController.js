import mongoose from 'mongoose';
import Category from '../models/Category.js';

const slugify = (text) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const buildUniqueSlug = async (name, currentId = null) => {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const query = { slug };
    if (currentId) query._id = { $ne: currentId };
    const existing = await Category.findOne(query);
    if (!existing) break;
    slug = `${baseSlug}-${suffix++}`;
  }

  return slug;
};

/**
 * @desc    Get all active categories
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === 'true') {
      filter.isActive = true;
    }

    const categories = await Category.find(filter).sort({ displayOrder: 1, name: 1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error('Get Categories Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving categories',
    });
  }
};

/**
 * @desc    Search categories by name or description
 * @route   GET /api/categories/search
 * @access  Public
 */
const searchCategories = async (req, res) => {
  try {
    const query = req.query.q || '';
    const trimmed = query.trim();

    if (!trimmed) {
      return res.status(200).json({ success: true, data: [] });
    }

    const regex = new RegExp(trimmed, 'i');
    const categories = await Category.find({
      $or: [
        { name: regex },
        { description: regex },
        { slug: regex },
      ],
      isActive: true,
    }).sort({ displayOrder: 1, name: 1 }).limit(8);

    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Search Categories Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error searching categories' });
  }
};

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    let category;

    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Get Category By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving category',
    });
  }
};

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
const createCategory = async (req, res) => {
  try {
    const { name, description, image, featured, displayOrder, isActive } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category description is required',
      });
    }

    if (!image || typeof image !== 'string' || image.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category image is required',
      });
    }

    const existing = await Category.findOne({ name: { $regex: `^${name.trim()}$`, $options: 'i' } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A category with this name already exists',
      });
    }

    const slug = await buildUniqueSlug(name);

    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description.trim(),
      image: image.trim(),
      featured: Boolean(featured),
      displayOrder: Number(displayOrder || 0),
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Create Category Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating category',
    });
  }
};

/**
 * @desc    Update a category by ID
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format',
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const { name, description, image, featured, displayOrder, isActive } = req.body;

    if (name !== undefined) {
      category.name = name.trim();
      category.slug = await buildUniqueSlug(name, category._id);
    }
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (featured !== undefined) category.featured = Boolean(featured);
    if (displayOrder !== undefined) category.displayOrder = Number(displayOrder || 0);
    if (isActive !== undefined) category.isActive = isActive;

    const updated = await category.save();

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update Category Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating category',
    });
  }
};

/**
 * @desc    Delete a category by ID
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format',
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete Category Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting category',
    });
  }
};

export { getCategories, searchCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
