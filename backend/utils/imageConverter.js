import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Converts image buffer to optimized WebP format for products.
 * Max dimensions: 1200x1200px (aspect ratio preserved).
 * @param {Buffer} inputBuffer 
 * @returns {Promise<{ filename: string, filepath: string, url: string }>}
 */
export const processProductImage = async (inputBuffer) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `product-${uniqueSuffix}.webp`;
  const filepath = path.join(uploadsDir, filename);

  await sharp(inputBuffer)
    .resize(1200, 1200, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toFormat('webp', { quality: 82 })
    .toFile(filepath);

  return {
    filename,
    filepath,
    url: `/uploads/${filename}`,
  };
};

/**
 * Converts image buffer to optimized WebP format for profile avatars.
 * Dimensions: 600x600px square crop (fit: cover).
 * @param {Buffer} inputBuffer 
 * @returns {Promise<{ filename: string, filepath: string, url: string }>}
 */
export const processProfileImage = async (inputBuffer) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `avatar-${uniqueSuffix}.webp`;
  const filepath = path.join(uploadsDir, filename);

  await sharp(inputBuffer)
    .resize(600, 600, {
      fit: 'cover',
      position: 'center',
    })
    .toFormat('webp', { quality: 80 })
    .toFile(filepath);

  return {
    filename,
    filepath,
    url: `/uploads/${filename}`,
  };
};

/**
 * Converts base64 image string (if user/admin uploads raw base64) to optimized WebP file on disk.
 * Returns the hosted URL or original string if not a base64 image.
 * @param {string} inputStr 
 * @param {'product' | 'profile'} type 
 * @returns {Promise<string>}
 */
export const convertBase64ToWebP = async (inputStr, type = 'product') => {
  if (typeof inputStr !== 'string' || !inputStr.startsWith('data:image/')) {
    return inputStr; // Return as is if already URL or empty
  }

  try {
    const base64Data = inputStr.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    if (type === 'profile') {
      const result = await processProfileImage(buffer);
      return result.url;
    } else {
      const result = await processProductImage(buffer);
      return result.url;
    }
  } catch (err) {
    console.error('Error converting base64 image:', err);
    return inputStr;
  }
};
