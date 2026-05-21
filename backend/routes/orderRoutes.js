const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

// Guest customers place orders publicly
router.post('/', createOrder);

// Vendors access and ship orders securely
router.get('/', protect, verifyVendorAccess, getOrders);
router.put('/status/:id', protect, verifyVendorAccess, updateOrderStatus);

module.exports = router;
