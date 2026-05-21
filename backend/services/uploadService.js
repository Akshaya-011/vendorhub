const cloudinaryConfig = require('../config/cloudinary');
const fs = require('fs');
const logger = require('../utils/logger');

class UploadService {
  /**
   * Push a file to Cloudinary CDN or fallback to local uploads directory url
   */
  static async uploadFile(file, folderName = 'general') {
    if (!file) {
      throw new Error('Please select a file to upload');
    }

    // Fallback: If Cloudinary keys are mock/missing, return the local asset endpoint URL
    if (cloudinaryConfig.isMockEnabled) {
      logger.info(`Simulated: Asset upload successful. Saving '${file.filename}' to local folder.`);
      
      // Determine folder based on field name or folderName param
      const appUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 5000}`;
      const filePath = `/uploads/${file.fieldname || folderName}/${file.filename}`;
      
      return {
        url: `${appUrl}${filePath}`,
        publicId: file.filename,
        storage: 'local'
      };
    }

    try {
      // Direct integration with Cloudinary
      const result = await cloudinaryConfig.cloudinary.uploader.upload(file.path, {
        folder: `vendorhub/${folderName}`,
        use_filename: true,
        unique_filename: true
      });

      // Cleanup local temp hold file since it has been securely synced to Cloudinary CDN
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return {
        url: result.secure_url,
        publicId: result.public_id,
        storage: 'cloudinary'
      };
    } catch (error) {
      logger.error('Cloudinary synchronization failure: ', error);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }
}

module.exports = UploadService;
