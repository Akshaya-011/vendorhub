const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, selectTemplate, getPublicStore } = require('../controllers/vendorController');
const { protect } = require('../middleware/authMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

router.get('/profile', protect, verifyVendorAccess, getProfile);
router.put('/profile', protect, verifyVendorAccess, updateProfile);

// Core template marketplace assignment routes
router.post('/select-template', selectTemplate);

// Public lookup storefront routes
router.get('/public/:subdomain', getPublicStore);

module.exports = router;

