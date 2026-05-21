const express = require('express');
const router = express.Router();
const { generateWebsite, generateSEO, generateContent, chatbot, generateMarketing } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-website', protect, generateWebsite);
router.post('/generate-seo', protect, generateSEO);
router.post('/generate-content', protect, generateContent);
router.post('/chatbot', protect, chatbot);
router.post('/generate-marketing', protect, generateMarketing);

module.exports = router;
