const express = require('express');
const router = express.Router();
const { createCampaign, getCampaignsByVendor, triggerCampaign } = require('../controllers/marketingController');
const { protect } = require('../middleware/authMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

router.post('/', protect, verifyVendorAccess, createCampaign);
router.get('/', protect, verifyVendorAccess, getCampaignsByVendor);
router.post('/trigger/:id', protect, verifyVendorAccess, triggerCampaign);

module.exports = router;
