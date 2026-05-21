const BuilderService = require('../services/builderService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Save current drag-and-drop workspace layout
 */
const saveState = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const builderState = await BuilderService.saveBuilderState(userId, req.body);
  ApiResponse.success(res, 'Builder layout canvas saved successfully', builderState);
});

/**
 * Fetch visual builder parameters
 */
const getStateByVendor = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;
  const builderState = await BuilderService.getBuilderState(vendorId);
  ApiResponse.success(res, 'Builder layout state retrieved successfully', builderState);
});

module.exports = {
  saveState,
  getStateByVendor
};
