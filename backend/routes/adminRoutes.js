const express = require('express');
const router = express.Router();
const { getVendors, getWebsites, getAdminAnalytics } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Apply admin clearance block universally across all these endpoints
router.use(protect);
router.use(adminOnly);

router.get('/vendors', getVendors);
router.get('/websites', getWebsites);
router.get('/analytics', getAdminAnalytics);

module.exports = router;
