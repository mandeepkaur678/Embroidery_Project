import mongoose from 'mongoose';
import Address from '../models/address.js';

/**
 * @desc    Create a new address for the logged-in user
 * @route   POST /api/addresses
 * @access  Private
 */
const createAddress = async (req, res) => {
  try {
    const { fullName, phone, addressLine, city, state, pincode, country } = req.body;

    // Validate required fields
    if (
      !fullName || typeof fullName !== 'string' || fullName.trim() === '' ||
      !phone || typeof phone !== 'string' || phone.trim() === '' ||
      !addressLine || typeof addressLine !== 'string' || addressLine.trim() === '' ||
      !city || typeof city !== 'string' || city.trim() === '' ||
      !state || typeof state !== 'string' || state.trim() === '' ||
      !pincode || typeof pincode !== 'string' || pincode.trim() === ''
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: fullName, phone, addressLine, city, state, pincode',
      });
    }

    // Automatically bind the logged-in user's ID from req.user._id
    const address = await Address.create({
      user: req.user._id,
      fullName: fullName.trim(),
      phone: phone.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      country: country ? country.trim() : 'India',
    });

    return res.status(201).json({
      success: true,
      message: 'Address created successfully',
      data: address,
    });
  } catch (error) {
    console.error('Create Address Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

/**
 * @desc    Get all addresses for the logged-in user
 * @route   GET /api/addresses
 * @access  Private
 */
const getUserAddresses = async (req, res) => {
  try {
    // Restrict query strictly to the logged-in user's ID
    const addresses = await Address.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Addresses retrieved successfully',
      data: addresses,
    });
  } catch (error) {
    console.error('Get User Addresses Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

/**
 * @desc    Get a single address by ID (must belong to logged-in user)
 * @route   GET /api/addresses/:id
 * @access  Private
 */
const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid address ID format',
      });
    }

    // Ensure the address belongs strictly to the authenticated user
    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error('Get Address By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

/**
 * @desc    Update an address (must belong to logged-in user)
 * @route   PUT /api/addresses/:id
 * @access  Private
 */
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid address ID format',
      });
    }

    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    const { fullName, phone, addressLine, city, state, pincode, country } = req.body;

    // Update fields if provided
    if (fullName !== undefined) address.fullName = fullName.trim();
    if (phone !== undefined) address.phone = phone.trim();
    if (addressLine !== undefined) address.addressLine = addressLine.trim();
    if (city !== undefined) address.city = city.trim();
    if (state !== undefined) address.state = state.trim();
    if (pincode !== undefined) address.pincode = pincode.trim();
    if (country !== undefined) address.country = country.trim();

    // Prevent changing ownership user ID
    // address.user remains req.user._id

    const updatedAddress = await address.save();

    return res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: updatedAddress,
    });
  } catch (error) {
    console.error('Update Address Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

/**
 * @desc    Delete an address (must belong to logged-in user)
 * @route   DELETE /api/addresses/:id
 * @access  Private
 */
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid address ID format',
      });
    }

    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    await address.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Delete Address Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
