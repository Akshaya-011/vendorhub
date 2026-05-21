const express = require('express');
const router = express.Router();
const { saveState, getStateByVendor } = require('../controllers/builderController');
const { protect } = require('../middleware/authMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

router.post('/save', protect, saveState);
router.get('/:vendorId', protect, verifyVendorAccess, getStateByVendor);

module.exports = router;
