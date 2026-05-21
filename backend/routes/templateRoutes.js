const express = require('express');
const router = express.Router();
const { getAllTemplates, getTemplateById, createTemplate } = require('../controllers/templateController');
const { protect } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Public lookups are permitted
router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);

// Admin-only template creation endpoints
router.post('/create', protect, adminOnly, createTemplate);

module.exports = router;
