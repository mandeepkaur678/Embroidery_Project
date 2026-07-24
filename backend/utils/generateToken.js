import jwt from 'jsonwebtoken';

/**
 * Generate short-lived Access Token for authenticated user requests
 * @param {string} id - User MongoDB ObjectId
 * @param {string} role - User role ('user' | 'admin')
 * @returns {string} Signed JWT Access Token
 */
const generateAccessToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'default_access_secret_key_change_in_production',
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE || '1d',
    }
  );
};

/**
 * Generate long-lived Refresh Token for issuing new access tokens
 * @param {string} id - User MongoDB ObjectId
 * @returns {string} Signed JWT Refresh Token
 */
const generateRefreshToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key_change_in_production',
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    }
  );
};

export {
  generateAccessToken,
  generateRefreshToken,
};
