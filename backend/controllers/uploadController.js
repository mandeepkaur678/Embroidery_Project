import { processProductImage, processProfileImage } from '../utils/imageConverter.js';

/**
 * @desc    Upload & automatically convert a single image to optimized WebP format
 * @route   POST /api/upload/image
 * @access  Private
 */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const type = req.query.type || req.body.type || 'product'; // 'profile' or 'product'

    let result;
    if (type === 'profile') {
      result = await processProfileImage(req.file.buffer);
    } else {
      result = await processProductImage(req.file.buffer);
    }

    return res.status(200).json({
      success: true,
      message: `Image automatically converted to standard WebP format successfully`,
      data: {
        url: result.url,
        filename: result.filename,
        originalName: req.file.originalname,
        originalMimeType: req.file.mimetype,
        convertedFormat: 'image/webp',
      },
    });
  } catch (error) {
    console.error('Image processing error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing and converting image format',
    });
  }
};

/**
 * @desc    Upload & automatically convert multiple product images (up to 10) to WebP format
 * @route   POST /api/upload/images
 * @access  Private/Admin
 */
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided' });
    }

    const processedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await processProductImage(file.buffer);
        return {
          url: result.url,
          filename: result.filename,
          originalName: file.originalname,
          convertedFormat: 'image/webp',
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: `${processedImages.length} image(s) automatically converted to standard WebP format`,
      data: processedImages,
      urls: processedImages.map((f) => f.url),
    });
  } catch (error) {
    console.error('Multiple image processing error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing product images',
    });
  }
};
