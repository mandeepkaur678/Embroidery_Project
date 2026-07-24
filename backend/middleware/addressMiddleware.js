import mongoose from 'mongoose';

/**
 * Middleware to validate MongoDB ObjectId for address routes
 */
export const validateAddressId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid address ID format',
    });
  }
  next();
};

/**
 * Middleware to validate address creation input data
 */
export const validateAddressInput = (req, res, next) => {
  const { fullName, phone, addressLine, city, state, pincode, country } = req.body;

  // On POST creation, require all main address fields
  if (req.method === 'POST') {
    const requiredFields = { fullName, phone, addressLine, city, state, pincode };

    for (const [key, val] of Object.entries(requiredFields)) {
      if (!val || typeof val !== 'string' || val.trim() === '') {
        return res.status(400).json({
          success: false,
          message: `Address field '${key}' is required and cannot be empty`,
        });
      }
    }
  }

  // On PUT update, if fields are provided, ensure they are non-empty strings
  if (req.method === 'PUT') {
    const fieldsToValidate = { fullName, phone, addressLine, city, state, pincode, country };

    for (const [key, val] of Object.entries(fieldsToValidate)) {
      if (val !== undefined && (typeof val !== 'string' || val.trim() === '')) {
        return res.status(400).json({
          success: false,
          message: `Address field '${key}' cannot be an empty string`,
        });
      }
    }
  }

  next();
};
