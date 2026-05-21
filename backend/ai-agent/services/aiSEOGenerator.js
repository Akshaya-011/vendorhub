const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AISEOGenerator {
  /**
   * Generates optimized meta title tags, descriptions, and organic target keywords
   */
  static async generate(businessName, description) {
    try {
      const promptPath = path.join(__dirname, '..', 'prompts', 'seoPrompt.txt');
      let systemInstruction = 'You are a search engine optimization expert.';

      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      const prompt = `Business: ${businessName}\nSummary: ${description}\nPlease compile the meta tags.`;

      const result = await getCompletion(prompt, systemInstruction, true);
      return JSON.parse(result);
    } catch (error) {
      logger.error('SEO tags generation error: ', error);
      return {
        metaTitle: `${businessName} | Organic Services & Quality Offerings`,
        metaDescription: `Welcome to the official homepage of ${businessName}. Discover premium solutions tailored to your unique requirements.`,
        keywords: [businessName.toLowerCase(), 'quality services', 'local business']
      };
    }
  }
}

module.exports = AISEOGenerator;
