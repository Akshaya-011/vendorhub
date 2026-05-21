/**
 * AI Product Description Service
 * Generates compelling product descriptions using the content generator.
 */
const aiContentGenerator = require('../ai-agent/services/aiContentGenerator');

/**
 * Generate a product description from basic product info.
 * @param {object} productData - { name, category, features, targetAudience }
 * @returns {Promise<string>} Generated product description
 */
async function generateProductDescription(productData) {
  const { name, category, features = [], targetAudience = 'general shoppers' } = productData;

  const prompt = `Write a compelling, SEO-friendly product description for:
Product Name: ${name}
Category: ${category}
Key Features: ${features.join(', ')}
Target Audience: ${targetAudience}

Write 2-3 paragraphs, focus on benefits over features, and include a clear call-to-action.`;

  return aiContentGenerator.generateContent({ prompt, type: 'product_description' });
}

/**
 * Generate product tags/keywords.
 * @param {object} productData - { name, category, description }
 * @returns {Promise<string[]>} Array of relevant tags
 */
async function generateProductTags(productData) {
  const { name, category, description = '' } = productData;

  const prompt = `Generate 8-12 relevant SEO tags for this product:
Name: ${name}
Category: ${category}
Description: ${description}

Return only a comma-separated list of tags, no extra text.`;

  const result = await aiContentGenerator.generateContent({ prompt, type: 'tags' });
  return result.split(',').map(t => t.trim()).filter(Boolean);
}

module.exports = { generateProductDescription, generateProductTags };
