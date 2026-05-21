const express = require('express');
const router = express.Router();
const { register, login, googleAuth, forgotPassword, resetPassword } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

// Rate limiting and validation applied strictly to authentication entry points
router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.post('/google', googleAuth);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);

module.exports = router;
