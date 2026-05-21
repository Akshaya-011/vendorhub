const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/vendorController');
const { protect } = require('../middleware/authMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

router.get('/profile', protect, verifyVendorAccess, getProfile);
router.put('/profile', protect, verifyVendorAccess, updateProfile);

module.exports = router;
