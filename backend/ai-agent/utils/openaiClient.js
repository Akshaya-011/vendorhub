const { OpenAI } = require('openai');
const openaiConfig = require('../../config/openai');
const logger = require('../../utils/logger');

let openai = null;

if (!openaiConfig.isMockEnabled) {
  try {
    openai = new OpenAI({
      apiKey: openaiConfig.apiKey
    });
  } catch (error) {
    logger.error('Failed to configure OpenAI client instance: ', error);
  }
}

/**
 * Execute chat completion call with optional mock response simulation fallback
 */
const getCompletion = async (prompt, systemInstruction = 'You are a helpful AI assistant.', isJson = false) => {
  if (openaiConfig.isMockEnabled || !openai) {
    logger.debug(`Simulating AI Agent completion for system instruction: "${systemInstruction.substring(0, 50)}..."`);
    // Return mock fallback immediately
    return simulateMockCompletion(prompt, systemInstruction, isJson);
  }

  try {
    const response = await openai.chat.completions.create({
      model: openaiConfig.model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ],
      response_format: isJson ? { type: 'json_object' } : undefined,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error('OpenAI Chat Completion API execution failure: ', error);
    // If real OpenAI fails (e.g. rate limit, balance), fall back to mock so application doesn't crash
    return simulateMockCompletion(prompt, systemInstruction, isJson);
  }
};

/**
 * Returns premium mock JSON/Text templates matching specific prompt types
 */
const simulateMockCompletion = (prompt, systemInstruction, isJson) => {
  if (!isJson) {
    return `This is a premium AI-generated response from VendorHub AI business assistant. Prompt: "${prompt.substring(0, 100)}..."`;
  }

  // If JSON is requested, parse the prompt to return highly realistic layouts
  const query = prompt.toLowerCase();
  
  if (query.includes('website') || query.includes('page') || query.includes('layout')) {
    return JSON.stringify({
      theme: {
        primaryColor: '#8B5CF6', // violet
        secondaryColor: '#1F2937',
        backgroundColor: '#F9FAFB',
        textColor: '#111827',
        fontFamily: 'Outfit'
      },
      pages: [
        {
          title: 'Home',
          slug: 'home',
          sections: [
            {
              id: 'hero-ai',
              name: 'Dynamic AI Hero Banner',
              type: 'hero',
              components: [
                { id: 't1', type: 'text', content: 'Crafting Futures Exquisitely' },
                { id: 't2', type: 'text', content: 'Empowered with premium AI systems, tailored for maximum conversions.' },
                { id: 'b1', type: 'button', content: 'Explore Collection' }
              ]
            },
            {
              id: 'features-ai',
              name: 'Signature Services Grid',
              type: 'features',
              components: [
                { id: 'f1', type: 'text', content: 'Premium Selection' },
                { id: 'f2', type: 'text', content: 'Sourced from organic providers for supreme satisfaction.' }
              ]
            }
          ]
        }
      ]
    });
  }

  if (query.includes('seo') || query.includes('keywords')) {
    return JSON.stringify({
      metaTitle: 'Premium AI SEO Optimized Hub',
      metaDescription: 'Step into the future of digital SaaS solutions with our premium, conversion-optimized multi-vendor store templates.',
      keywords: ['ai site builder', 'multi-vendor ecommerce', 'no-code template builder', 'saas tools']
    });
  }

  if (query.includes('marketing') || query.includes('campaign') || query.includes('ad')) {
    return JSON.stringify({
      subject: 'Ignite Your Digital Ventures - Exclusive Platform Offer Inside!',
      body: 'Hello and welcome!\n\nWe are extremely thrilled to present you with a tailored AI SEO & marketing suite to accelerate your e-commerce operations. Sign up today to secure your custom domains and dynamic payment channels!\n\nBest wishes,\nThe Merchant Team',
      adCopy: 'Launch your stunning enterprise-ready stores in 60 seconds. Powered by VendorHub AI. Claim your free site today!'
    });
  }

  return JSON.stringify({
    message: 'Simulated AI completion successfully executed.',
    status: 'success'
  });
};

module.exports = {
  getCompletion,
  clientInstance: openai
};
