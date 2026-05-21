const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const verifyVendorAccess = require('../middleware/vendorMiddleware');

// Scope product changes to specific authenticated vendor owners
router.post('/', protect, verifyVendorAccess, createProduct);
router.get('/', protect, verifyVendorAccess, getProducts);
router.get('/:id', getProductById); // Public view allowed
router.put('/:id', protect, verifyVendorAccess, updateProduct);
router.delete('/:id', protect, verifyVendorAccess, deleteProduct);

module.exports = router;
