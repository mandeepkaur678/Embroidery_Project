/**
 * uploadService.js
 * Service for uploading images to the backend.
 * Supports any image type (PNG, JPG, WebP, GIF, AVIF, SVG, HEIC, BMP, etc.)
 * Automatically converted on the server to standardized WebP format!
 */

const TOKEN_KEY = 'artful_access_token';

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Upload a single image file to the backend.
 * Automatically converts image to WebP format on server.
 * @param {File} file - The image File object
 * @param {'profile' | 'product'} [type='product'] - Image type for optimization
 * @returns {Promise<string>} - The public URL of the converted WebP image
 */
export const uploadImageFile = async (file, type = 'product') => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`/api/upload/image?type=${type}`, {
    method: 'POST',
    headers: getAuthHeaders(), // NO Content-Type — browser sets boundary
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Image upload failed');
  }
  return json.data.url; // e.g. "/uploads/avatar-123456789.webp" or "/uploads/product-123456789.webp"
};

/**
 * Upload multiple product image files to the backend.
 * Automatically converts all images to WebP format on server.
 * @param {File[]} files - Array of image File objects
 * @returns {Promise<string[]>} - Array of public WebP URLs
 */
export const uploadImageFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  const res = await fetch('/api/upload/images', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Image upload failed');
  }
  return json.urls; // e.g. ["/uploads/product-1.webp", "/uploads/product-2.webp"]
};
