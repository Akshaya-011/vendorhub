const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AIBusinessAssistant {
  /**
   * Generates actionable merchant suggestions for business growth
   */
  static async suggestBusinessTactics(businessName, businessType, challenges = 'traffic generation') {
    try {
      const systemInstruction = 'You are a veteran venture capitalist and SaaS business mentor. Provide highly practical business tips.';
      
      const prompt = `
        Business Name: ${businessName}
        Sector: ${businessType}
        Active Hurdle: ${challenges}
        
        Generate:
        - 3 key growth tactics to optimize sales conversion rates.
        - Target pricing strategy modifications.
      `;

      const result = await getCompletion(prompt, systemInstruction, false);
      return {
        businessName,
        tacticAdvice: result,
        generatedAt: new Date()
      };
    } catch (error) {
      logger.error('AI business assistant advice generation failed: ', error);
      return {
        businessName,
        tacticAdvice: 'Enhance your merchant offerings by setting competitive price tiers and launching loyalty email campaigns.',
        generatedAt: new Date()
      };
    }
  }
}

module.exports = AIBusinessAssistant;
