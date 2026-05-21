const Template = require('../models/Template');

class TemplateService {
  /**
   * Get filtered marketplace template offerings
   */
  static async getAllTemplates(filters = {}) {
    const query = {};
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.isPremium !== undefined) {
      query.isPremium = filters.isPremium === 'true';
    }

    return await Template.find(query).sort({ usageCount: -1 });
  }

  /**
   * Fetch single marketplace template specs
   */
  static async getTemplateById(id) {
    const template = await Template.findById(id);
    if (!template) {
      const err = new Error('Template not found');
      err.statusCode = 404;
      throw err;
    }
    return template;
  }

  /**
   * Register a new pre-built marketplace theme template (Admin action)
   */
  static async createTemplate(templateData) {
    return await Template.create(templateData);
  }

  /**
   * AI-powered recommendation system to match templates with business sectors
   */
  static async getAIRecommendations(businessType) {
    const category = businessType.toLowerCase().trim();
    
    // Attempt match with exact template categories
    let recommended = await Template.find({ category }).limit(3);
    
    // Fallback search: return most popular default templates
    if (recommended.length === 0) {
      recommended = await Template.find().sort({ usageCount: -1 }).limit(3);
    }
    
    return recommended;
  }
}

module.exports = TemplateService;
