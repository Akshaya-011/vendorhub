const TemplateService = require('../services/templateService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Fetch marketplace template offerings
 */
const getAllTemplates = asyncHandler(async (req, res) => {
  const templates = await TemplateService.getAllTemplates(req.query);
  ApiResponse.success(res, 'Templates catalog retrieved successfully', templates);
});

/**
 * Fetch single template configuration specs
 */
const getTemplateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const template = await TemplateService.getTemplateById(id);
  ApiResponse.success(res, 'Template detail configuration retrieved', template);
});

/**
 * Create a new template catalog entry (Admin action)
 */
const createTemplate = asyncHandler(async (req, res) => {
  const template = await TemplateService.createTemplate(req.body);
  ApiResponse.created(res, 'New visual template successfully added to catalog', template);
});

module.exports = {
  getAllTemplates,
  getTemplateById,
  createTemplate
};
