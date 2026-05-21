const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');
const ApiResponse = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  // Check Authorization header for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, jwtConfig.secret);

      // Get user from token and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return ApiResponse.error(res, 'Not authorized, user not found in registry', 401);
      }

      next();
    } catch (error) {
      return ApiResponse.error(res, 'Not authorized, invalid or expired token signature', 401);
    }
  }

  if (!token) {
    return ApiResponse.error(res, 'Not authorized, missing bearer token credentials', 401);
  }
};

module.exports = { protect };
