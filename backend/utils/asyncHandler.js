/**
 * Wraps express middleware/controllers to automatically pass any rejected promises
 * down to the global error handling middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
