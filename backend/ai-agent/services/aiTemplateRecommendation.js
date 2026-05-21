const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AITemplateRecommendation {
  /**
   * Recommend template categories based on merchant's industry details
   */
  static async recommend(businessDescription) {
    try {
      const promptPath = path.join(__dirname, '..', 'prompts', 'templatePrompt.txt');
      let systemInstruction = 'You are a template matching assistant.';

      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      const prompt = `Analyze: "${businessDescription}"\nSelect the single category that matches best.`;

      const result = await getCompletion(prompt, systemInstruction, true);
      return JSON.parse(result);
    } catch (error) {
      logger.error('AI Template Recommendation error: ', error);
      return { recommendedCategory: 'grocery', rationale: 'Fallback default choice' };
    }
  }
}

module.exports = AITemplateRecommendation;
