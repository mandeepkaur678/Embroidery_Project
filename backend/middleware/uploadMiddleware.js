import multer from 'multer';

// Memory storage — holds incoming uploaded files in memory buffer for instant processing with sharp
const storage = multer.memoryStorage();

// Accept any image MIME type
const fileFilter = (_req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are accepted (PNG, JPG, WebP, GIF, AVIF, SVG, etc.)'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB per file limit
    files: 10, // max 10 images per request
  },
});

/**
 * Single image upload (field name: "image")
 */
export const uploadSingle = upload.single('image');

/**
 * Multiple images upload (field name: "images", up to 10)
 */
export const uploadMultiple = upload.array('images', 10);
