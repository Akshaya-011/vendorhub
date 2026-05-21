const cloudinary = require('cloudinary').v2;
const logger = require('../utils/logger');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isConfigured = cloudName && apiKey && apiSecret;

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });
  logger.info('Cloudinary configured successfully.');
} else {
  logger.warn('Cloudinary credentials missing. File uploads will default to local /uploads/ storage directory.');
}

module.exports = {
  cloudinary: isConfigured ? cloudinary : null,
  isMockEnabled: !isConfigured
};
