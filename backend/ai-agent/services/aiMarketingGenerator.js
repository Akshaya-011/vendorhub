const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AIMarketingGenerator {
  /**
   * Write newsletters and ad copy
   */
  static async generate(businessName, description, targetAudience = 'general public') {
    try {
      const promptPath = path.join(__dirname, '..', 'prompts', 'marketingPrompt.txt');
      let systemInstruction = 'You are a conversion marketing copywriter.';

      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      const prompt = `Business: ${businessName}\nSummary: ${description}\nTarget Audience: ${targetAudience}\nCreate high CTR campaigns.`;

      const result = await getCompletion(prompt, systemInstruction, true);
      return JSON.parse(result);
    } catch (error) {
      logger.error('AI marketing copy generation error: ', error);
      return {
        subject: `Exclusive Deals & Updates from ${businessName}`,
        body: `Welcome to our custom subscription newsletter!\n\nAt ${businessName}, we are dedicated to offering you premier quality services and products directly to your doorstep. Browse our collections online today to capture our temporary discount codes!\n\nBest regards,\nCustomer Success Team`,
        adCopy: `Stunning designs, bespoke quality, and premium services. Welcome to the future of ${businessName}. Visit our store now to lock in grand opening deals!`
      };
    }
  }
}

module.exports = AIMarketingGenerator;
