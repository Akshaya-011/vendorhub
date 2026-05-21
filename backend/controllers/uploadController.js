const UploadService = require('../services/uploadService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Handle multi-part image uploads, outputting secure access URL keys
 */
const uploadImage = asyncHandler(async (req, res) => {
  const result = await UploadService.uploadFile(req.file, req.query.folder || 'general');
  ApiResponse.success(res, 'File uploaded and synchronized successfully', result);
});

module.exports = {
  uploadImage
};
