const WebsiteService = require('../services/websiteService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Initialize website tenancy
 */
const createWebsite = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await WebsiteService.createWebsite(userId, req.body);
  ApiResponse.created(res, 'SaaS Website and Vendor profile initialized successfully', result);
});

/**
 * Get website config for a vendor
 */
const getWebsiteByVendor = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;
  const website = await WebsiteService.getWebsiteByVendor(vendorId);
  ApiResponse.success(res, 'Website configurations retrieved', website);
});

/**
 * Update active pages layout settings
 */
const updateWebsite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const website = await WebsiteService.updateWebsite(id, req.body);
  ApiResponse.success(res, 'Website content updated successfully', website);
});

/**
 * Publish all canvas drafts to live views
 */
const publishWebsite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const website = await WebsiteService.publishWebsite(id);
  ApiResponse.success(res, 'Website changes successfully published live', website);
});

module.exports = {
  createWebsite,
  getWebsiteByVendor,
  updateWebsite,
  publishWebsite
};
