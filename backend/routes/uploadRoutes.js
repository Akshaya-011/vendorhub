const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Accept a single image field from multi-part forms
router.post('/image', protect, upload.single('image'), uploadImage);

module.exports = router;
