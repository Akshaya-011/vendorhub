const Vendor = require('../models/Vendor');
const Website = require('../models/Website');
const User = require('../models/User');
const Payment = require('../models/Payment');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Fetch all registered merchants listing
 */
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate('ownerId', 'name email');
  ApiResponse.success(res, 'Vendors list successfully fetched', vendors);
});

/**
 * Fetch all visual website profiles
 */
const getWebsites = asyncHandler(async (req, res) => {
  const websites = await Website.find().populate('vendorId', 'businessName subdomain');
  ApiResponse.success(res, 'Websites list successfully fetched', websites);
});

/**
 * Load administrative dashboard metrics (SaaS aggregates)
 */
const getAdminAnalytics = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const vendorsCount = await Vendor.countDocuments();
  const sitesCount = await Website.countDocuments({ published: true });
  
  const payments = await Payment.find({ status: 'captured' });
  const totalSaaSSales = payments.reduce((acc, curr) => acc + curr.amount, 0);

  ApiResponse.success(res, 'Admin overview metrics generated', {
    totalUsers: usersCount,
    totalMerchants: vendorsCount,
    activeSites: sitesCount,
    totalPlatformBillingSales: totalSaaSSales
  });
});

module.exports = {
  getVendors,
  getWebsites,
  getAdminAnalytics
};
