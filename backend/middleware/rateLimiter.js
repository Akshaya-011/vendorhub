const rateLimit = require('express-rate-limit');
const ApiResponse = require('../utils/apiResponse');

// General rate limiter for APIs
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    ApiResponse.error(
      res, 
      'Too many requests from this IP address. Please try again after 15 minutes.', 
      429
    );
  }
});

// Stricter rate limiter for sensitive authentication attempts
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    ApiResponse.error(
      res, 
      'Too many authentication attempts. Please try again after an hour.', 
      429
    );
  }
});

module.exports = {
  apiLimiter,
  authLimiter
};
