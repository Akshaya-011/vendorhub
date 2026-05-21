const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AIWebsiteGenerator {
  /**
   * Generates a fully structured web design layout JSON from business details
   */
  static async generate(businessName, businessDescription) {
    try {
      // Read prompts from prompt txt files
      const promptPath = path.join(__dirname, '..', 'prompts', 'websitePrompt.txt');
      let systemInstruction = 'You are a web builder assistant.';
      
      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      const prompt = `Business Name: ${businessName}\nDescription: ${businessDescription}\nPlease design a website with colors, a homepage, and at least 3 high-impact sections.`;

      const result = await getCompletion(prompt, systemInstruction, true);
      
      // Attempt parse check
      return JSON.parse(result);
    } catch (error) {
      logger.error('AI website generation error: ', error);
      throw new Error(`AI Website generation failed: ${error.message}`);
    }
  }
}

module.exports = AIWebsiteGenerator;
