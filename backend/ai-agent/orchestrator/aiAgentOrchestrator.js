const AIHistory = require('../../models/AIHistory');
const AIPromptProcessor = require('../services/aiPromptProcessor');
const AIWebsiteGenerator = require('../services/aiWebsiteGenerator');
const AISEOGenerator = require('../services/aiSEOGenerator');
const AIMarketingGenerator = require('../services/aiMarketingGenerator');
const AIChatbotService = require('../services/aiChatbotService');
const logger = require('../../utils/logger');

class AIAgentOrchestrator {
  /**
   * Universal orchestration router directing prompts to specific AI generation executors
   */
  static async orchestrate(userId, vendorId, requestType, payload) {
    logger.info(`AI Orchestrator - Received request of type '${requestType}' from User ${userId}`);
    
    let aiResponse = null;
    let tokensAudited = 150; // estimate default token cost weight

    // Process and sanitize incoming prompt parameters
    const { sanitizedPrompt } = AIPromptProcessor.processPrompt(payload.prompt || 'Generate premium store');

    switch (requestType) {
      case 'website':
        aiResponse = await AIWebsiteGenerator.generate(payload.businessName || 'My Brand', sanitizedPrompt);
        tokensAudited = 850;
        break;
        
      case 'seo':
        aiResponse = await AISEOGenerator.generate(payload.businessName || 'My Brand', sanitizedPrompt);
        tokensAudited = 200;
        break;

      case 'marketing':
        aiResponse = await AIMarketingGenerator.generate(payload.businessName || 'My Brand', sanitizedPrompt, payload.audience);
        tokensAudited = 400;
        break;

      case 'chatbot':
        aiResponse = await AIChatbotService.chat(payload.sessionId || 'session-default', sanitizedPrompt, payload.businessProfile);
        tokensAudited = 150;
        break;

      default:
        throw new Error(`Unsupported AI orchestration task request: '${requestType}'`);
    }

    // Save prompt consumption audit record to Mongoose Database model
    await AIHistory.create({
      userId,
      vendorId: vendorId || null,
      prompt: payload.prompt,
      response: typeof aiResponse === 'object' ? JSON.stringify(aiResponse) : aiResponse,
      type: requestType,
      tokensUsed: tokensAudited
    });

    logger.success(`AI Orchestrator - Completed job of type '${requestType}'. Audited tokens: ${tokensAudited}`);
    return aiResponse;
  }
}

module.exports = AIAgentOrchestrator;
