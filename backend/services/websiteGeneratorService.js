/**
 * Website Generator Service
 * High-level orchestration: combines AI generation + template selection
 * + persistence to produce a fully formed website document.
 */
const aiWebsiteGenerator = require('../ai-agent/services/aiWebsiteGenerator');
const aiTemplateRecommendation = require('../ai-agent/services/aiTemplateRecommendation');
const aiThemeGenerator = require('../ai-agent/services/aiThemeGenerator');
const Website = require('../models/Website');
const Template = require('../models/Template');
const logger = require('../utils/logger');

/**
 * Orchestrate full website generation pipeline.
 * @param {object} options
 * @param {string} options.vendorId - Vendor's MongoDB ObjectId
 * @param {string} options.businessName - Business name
 * @param {string} options.businessType - Type of business
 * @param {string} options.description - Business description
 * @param {string[]} [options.colorPreferences] - Preferred brand colors
 * @param {string} [options.style] - Preferred style (modern, minimal, bold)
 * @returns {Promise<object>} Created Website document
 */
async function generateFullWebsite({ vendorId, businessName, businessType, description, colorPreferences = [], style = 'modern' }) {
  try {
    logger.info(`Starting full website generation for vendor ${vendorId}`);

    // 1. Recommend a template
    const templateSuggestion = await aiTemplateRecommendation.recommendTemplate({
      businessType,
      style,
      description,
    });

    // 2. Generate theme colors
    const theme = await aiThemeGenerator.generateTheme({
      businessType,
      style,
      colorPreferences,
    });

    // 3. Generate website content/structure
    const websiteContent = await aiWebsiteGenerator.generateWebsite({
      businessName,
      businessType,
      description,
      style,
    });

    // 4. Find matching template (fall back to first available)
    let template = null;
    if (templateSuggestion?.templateId) {
      template = await Template.findById(templateSuggestion.templateId).lean();
    }
    if (!template) {
      template = await Template.findOne({ isActive: true }).lean();
    }

    // 5. Persist the website
    const website = await Website.create({
      vendor: vendorId,
      template: template?._id,
      name: businessName,
      businessType,
      description,
      content: websiteContent,
      theme: theme || {},
      status: 'draft',
      isPublished: false,
    });

    logger.info(`Website ${website._id} created for vendor ${vendorId}`);
    return website;
  } catch (err) {
    logger.error('websiteGeneratorService.generateFullWebsite error:', err);
    throw err;
  }
}

/**
 * Regenerate only the content sections of an existing website.
 * @param {string} websiteId - MongoDB ObjectId of the existing website
 * @param {object} updates - Partial overrides { businessName, description, style }
 * @returns {Promise<object>} Updated Website document
 */
async function regenerateContent(websiteId, updates) {
  const website = await Website.findById(websiteId);
  if (!website) throw new Error(`Website ${websiteId} not found`);

  const freshContent = await aiWebsiteGenerator.generateWebsite({
    businessName: updates.businessName || website.name,
    businessType: updates.businessType || website.businessType,
    description: updates.description || website.description,
    style: updates.style || 'modern',
  });

  website.content = freshContent;
  website.updatedAt = new Date();
  await website.save();

  logger.info(`Regenerated content for website ${websiteId}`);
  return website;
}

module.exports = { generateFullWebsite, regenerateContent };
