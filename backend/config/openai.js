const logger = require('../utils/logger');

const apiKey = process.env.OPENAI_API_KEY;
const hasApiKey = apiKey && apiKey !== 'your_openai_api_key_here';

if (!hasApiKey) {
  logger.warn('OpenAI API Key is not set or using default placeholder. AI agent operations will run in Mock/Simulation fallback mode.');
}

module.exports = {
  apiKey: hasApiKey ? apiKey : 'mock-api-key',
  isMockEnabled: !hasApiKey,
  model: 'gpt-4-turbo'
};
