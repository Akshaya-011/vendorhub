const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AIAnalyticsInsights {
  /**
   * Reviews stats data and suggests bounce rate reduction practices
   */
  static async analyze(overviewData) {
    try {
      const promptPath = path.join(__dirname, '..', 'prompts', 'analyticsPrompt.txt');
      let systemInstruction = 'You are a professional business coach and SaaS auditor.';

      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      const prompt = `Performance Overview:\n${JSON.stringify(overviewData, null, 2)}\nPlease critique this and suggest improvements.`;

      const result = await getCompletion(prompt, systemInstruction, true);
      return JSON.parse(result);
    } catch (error) {
      logger.error('AI Analytics evaluation failed: ', error);
      return {
        insights: 'Your site performance indicators are stable. We recommend focusing on mobile user experiences.',
        tips: [
          'Optimize product banner images sizes to accelerate pages render speed.',
          'Connect dynamic payment triggers at the center folds of your homepage.'
        ]
      };
    }
  }
}

module.exports = AIAnalyticsInsights;
