// Re-export the upload middleware for backwards-compatible imports
// Primary upload configuration lives in middleware/uploadMiddleware.js
const upload = require('../middleware/uploadMiddleware');

module.exports = upload;
