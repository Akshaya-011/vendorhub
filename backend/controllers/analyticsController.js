const AnalyticsService = require('../services/analyticsService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Fetch performance stats for a merchant vendor
 */
const getVendorAnalytics = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const days = req.query.days || 30;

  const result = await AnalyticsService.getVendorAnalytics(id, days);
  ApiResponse.success(res, 'Analytics performance stats generated successfully', result);
});

/**
 * Fetch platform overview figures (Admin only)
 */
const getPlatformAnalytics = asyncHandler(async (req, res) => {
  const result = await AnalyticsService.getPlatformAnalytics();
  ApiResponse.success(res, 'Platform aggregates summary loaded', result);
});

module.exports = {
  getVendorAnalytics,
  getPlatformAnalytics
};
