const AuthService = require('../services/authService');
const EmailService = require('../services/emailService');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const crypto = require('crypto');

/**
 * Handle new merchant / vendor registration
 */
const register = asyncHandler(async (req, res) => {
  const result = await AuthService.registerUser(req.body);
  
  // Send email verification link in the background
  try {
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const user = await User.findById(result.user.id);
    user.verificationToken = verificationToken;
    await user.save();
    
    const appUrl = process.env.CLIENT_URL || `http://localhost:${process.env.PORT || 5000}`;
    const verifyUrl = `${appUrl}/verify-email?token=${verificationToken}`;
    
    await EmailService.sendVerificationEmail(result.user.email, result.user.name, verifyUrl);
  } catch (err) {
    // Log failure but do not halt registration response
  }

  ApiResponse.created(res, 'Merchant registration successful. Welcome email dispatched.', result);
});

/**
 * Standard email credentials login check
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUser(email, password);
  ApiResponse.success(res, 'Authentication successful', result);
});

/**
 * Google OAuth SSO registration and sign-in
 */
const googleAuth = asyncHandler(async (req, res) => {
  const result = await AuthService.googleLogin(req.body);
  ApiResponse.success(res, 'Google authentication successful', result);
});

/**
 * Password reset requesting link generator
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return ApiResponse.error(res, 'No registered user found with that email address', 404);
  }

  // Generate Reset Token hash
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes active window
  await user.save();

  const appUrl = process.env.CLIENT_URL || `http://localhost:${process.env.PORT || 5000}`;
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  await EmailService.sendPasswordResetEmail(user.email, user.name, resetUrl);

  ApiResponse.success(res, 'Password recovery instructions dispatched successfully');
});

/**
 * Resets passwords utilizing the verification token
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return ApiResponse.error(res, 'Invalid or expired password reset token signature', 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  ApiResponse.success(res, 'Password updated successfully. You can now log in.');
});

module.exports = {
  register,
  login,
  googleAuth,
  forgotPassword,
  resetPassword
};
