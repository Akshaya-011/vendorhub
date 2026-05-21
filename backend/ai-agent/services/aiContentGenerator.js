const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AIContentGenerator {
  /**
   * Write tailored headlines and paragraphs for active sections
   */
  static async generateContent(componentType, details) {
    try {
      const promptPath = path.join(__dirname, '..', 'prompts', 'contentPrompt.txt');
      let systemInstruction = 'You are a professional content writer.';

      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      const prompt = `Write high-converting, professional copy for a website component of type '${componentType}'. Context details: ${details}.`;

      const result = await getCompletion(prompt, systemInstruction, true);
      return JSON.parse(result);
    } catch (error) {
      logger.error('Content writing failed: ', error);
      return { content: `Premium high quality services. Sourced for your optimal satisfaction. Discover the ${componentType} collection today.` };
    }
  }
}

module.exports = AIContentGenerator;
