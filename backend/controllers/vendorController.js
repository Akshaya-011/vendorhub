const Vendor = require('../models/Vendor');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Fetch active merchant profile details
 */
const getProfile = asyncHandler(async (req, res) => {
  const vendor = req.vendor; // Pre-populated by verifyVendorAccess
  ApiResponse.success(res, 'Merchant profile retrieved successfully', vendor);
});

/**
 * Update merchant branding and domain details
 */
const updateProfile = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;
  const vendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
    new: true,
    runValidators: true
  });
  ApiResponse.success(res, 'Merchant profile updated successfully', vendor);
});

module.exports = {
  getProfile,
  updateProfile
};
