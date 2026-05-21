const { getCompletion } = require('../utils/openaiClient');
const logger = require('../../utils/logger');

class AIThemeGenerator {
  /**
   * Generates premium brand styling guidelines from color requests or logos
   */
  static async generate(businessName, styleDescription) {
    try {
      const systemInstruction = 'You are a professional brand designer. Generate premium Hex color specifications matched with google typography fonts.';
      
      const prompt = `
        Business Name: ${businessName}
        Style/Mood: ${styleDescription}
        
        Generate:
        1. primaryColor (hex)
        2. secondaryColor (hex)
        3. accentColor (hex)
        4. backgroundColor (hex)
        5. textColor (hex)
        6. headingFont (typography)
        7. bodyFont (typography)

        Return in strict JSON.
      `;

      const result = await getCompletion(prompt, systemInstruction, true);
      return JSON.parse(result);
    } catch (error) {
      logger.error('Theme generation failed: ', error);
      return {
        primaryColor: '#3B82F6',
        secondaryColor: '#1E293B',
        accentColor: '#F59E0B',
        backgroundColor: '#FFFFFF',
        textColor: '#0F172A',
        headingFont: 'Outfit',
        bodyFont: 'Inter'
      };
    }
  }
}

module.exports = AIThemeGenerator;
