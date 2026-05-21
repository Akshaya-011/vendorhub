const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const cloudinaryConfig = require('../config/cloudinary');

// Target folder directories configuration
const uploadDirBase = path.join(__dirname, '..', 'uploads');
const subDirs = ['logos', 'banners', 'templates', 'products', 'marketing'];

// Ensure target upload directories exist on launch
subDirs.forEach((subDir) => {
  const dirPath = path.join(uploadDirBase, subDir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logger.debug(`Created local upload storage directory: ${dirPath}`);
  }
});

// Configure Multer storage engine
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine subdirectory based on field name or folder query params
    let subFolder = 'products';
    if (file.fieldname === 'logo') subFolder = 'logos';
    if (file.fieldname === 'banner') subFolder = 'banners';
    if (file.fieldname === 'template') subFolder = 'templates';
    if (file.fieldname === 'marketing') subFolder = 'marketing';
    
    cb(null, path.join(uploadDirBase, subFolder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
  }
});

// File filter validation to only accept standard images
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only standard image files are allowed!'), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file limit
  }
});

module.exports = upload;
