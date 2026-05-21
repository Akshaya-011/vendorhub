const AIAgentOrchestrator = require('../ai-agent/orchestrator/aiAgentOrchestrator');
const SubscriptionService = require('../services/subscriptionService');
const AIHistory = require('../models/AIHistory');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * AI-driven layout schema generator endpoint
 */
const generateWebsite = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { vendorId, businessName, prompt } = req.body;

  // Verify plan limitation usage bounds
  if (vendorId) {
    const usageCount = await AIHistory.countDocuments({ vendorId, type: 'website' });
    const isLimitOk = await SubscriptionService.checkAILimitations(vendorId, usageCount);
    if (!isLimitOk) {
      return ApiResponse.error(res, 'AI generations limit exceeded for your active billing tier plan. Please upgrade to a higher tier.', 403);
    }
  }

  const generatedLayout = await AIAgentOrchestrator.orchestrate(userId, vendorId, 'website', {
    businessName,
    prompt
  });

  ApiResponse.success(res, 'AI Website structure generated successfully', generatedLayout);
});

/**
 * AI SEO keywords and description tags optimizer endpoint
 */
const generateSEO = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { vendorId, businessName, prompt } = req.body;

  const generatedSEO = await AIAgentOrchestrator.orchestrate(userId, vendorId, 'seo', {
    businessName,
    prompt
  });

  ApiResponse.success(res, 'AI SEO meta tags generated successfully', generatedSEO);
});

/**
 * Dynamic content and sloganeering writer endpoint
 */
const generateContent = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { vendorId, componentType, prompt } = req.body;

  const AIAgentOrchestratorModule = require('../ai-agent/orchestrator/aiAgentOrchestrator');
  const result = await AIAgentOrchestratorModule.orchestrate(userId, vendorId, 'chatbot', {
    prompt: `Write custom component copywriting content for a ${componentType} based on: ${prompt}`
  });

  ApiResponse.success(res, 'AI Component copy successfully generated', { content: result });
});

/**
 * AI Copilot support dialog chat endpoint
 */
const chatbot = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { vendorId, prompt, sessionId, businessProfile } = req.body;

  const responseText = await AIAgentOrchestrator.orchestrate(userId, vendorId, 'chatbot', {
    prompt,
    sessionId,
    businessProfile
  });

  ApiResponse.success(res, 'Chat response processed successfully', { message: responseText });
});

/**
 * AI marketing newsletters and social ad copywriter endpoint
 */
const generateMarketing = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { vendorId, businessName, prompt, audience } = req.body;

  const generatedMarketing = await AIAgentOrchestrator.orchestrate(userId, vendorId, 'marketing', {
    businessName,
    prompt,
    audience
  });

  ApiResponse.success(res, 'AI Marketing assets generated successfully', generatedMarketing);
});

module.exports = {
  generateWebsite,
  generateSEO,
  generateContent,
  chatbot,
  generateMarketing
};
