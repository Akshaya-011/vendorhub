const express = require('express');
const router = express.Router();
const { createWebsite, getWebsiteByVendor, updateWebsite, publishWebsite } = require('../controllers/websiteController');
const { protect } = require('../middleware/authMiddleware');
const { validateWebsiteCreate } = require('../middleware/validationMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

// Protected management operations
router.post('/create', protect, validateWebsiteCreate, createWebsite);
router.get('/:vendorId', protect, verifyVendorAccess, getWebsiteByVendor);
router.put('/update/:id', protect, updateWebsite);
router.post('/publish/:id', protect, publishWebsite);

module.exports = router;
