const MarketingService = require('../services/marketingService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Register a newly compiled AI marketing copywriting asset campaign
 */
const createCampaign = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;
  const campaign = await MarketingService.createCampaign(vendorId, req.body);
  ApiResponse.created(res, 'Marketing copy campaign created successfully', campaign);
});

/**
 * Fetch campaign history metrics
 */
const getCampaignsByVendor = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;
  const campaigns = await MarketingService.getCampaignsByVendor(vendorId);
  ApiResponse.success(res, 'Campaign lists loaded successfully', campaigns);
});

/**
 * Dispatch scheduled campaign executions immediately
 */
const triggerCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await MarketingService.triggerCampaign(id);
  ApiResponse.success(res, 'Marketing campaign copy successfully executed and dispatched', campaign);
});

module.exports = {
  createCampaign,
  getCampaignsByVendor,
  triggerCampaign
};
