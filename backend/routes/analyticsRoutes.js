const express = require('express');
const router = express.Router();
const { getVendorAnalytics, getPlatformAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

router.get('/vendor/:id', protect, verifyVendorAccess, getVendorAnalytics);
router.get('/platform', protect, adminOnly, getPlatformAnalytics);

module.exports = router;
