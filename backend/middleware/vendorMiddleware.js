const Vendor = require('../models/Vendor');
const ApiResponse = require('../utils/apiResponse');
const { ROLES } = require('../utils/constants');

/**
 * Middleware to verify that the logged-in user has authorization to manage the specified vendor
 */
const verifyVendorAccess = async (req, res, next) => {
  try {
    if (!req.user) {
      return ApiResponse.error(res, 'Session user missing', 401);
    }

    // Admins bypass tenant ownership validations
    if (req.user.role === ROLES.ADMIN) {
      return next();
    }

    // Must be vendor or admin
    if (req.user.role !== ROLES.VENDOR) {
      return ApiResponse.error(res, 'Access denied, resource restricted to Vendors', 403);
    }

    // Extract vendor ID from route params, query, or custom header
    const vendorId = req.params.vendorId || req.params.id || req.query.vendorId || req.headers['x-vendor-id'];

    if (!vendorId) {
      // If no vendorId is provided, we check if they own AT LEAST one vendor
      const ownedVendor = await Vendor.findOne({ ownerId: req.user._id });
      if (!ownedVendor) {
        return ApiResponse.error(res, 'Access denied, no registered Vendor account found under this session', 403);
      }
      req.vendor = ownedVendor;
      return next();
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return ApiResponse.error(res, 'Vendor record not found', 404);
    }

    // Enforce matching ownerId ownership constraints
    if (vendor.ownerId.toString() !== req.user._id.toString()) {
      return ApiResponse.error(res, 'Unauthorized access to other Vendor tenancy', 403);
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    return ApiResponse.error(res, `Vendor access validation error: ${error.message}`, 500);
  }
};

module.exports = verifyVendorAccess;
