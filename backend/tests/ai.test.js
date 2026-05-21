/**
 * AI Module Tests
 */
const assert = require('assert');
const AIPromptProcessor = require('../ai-agent/services/aiPromptProcessor');

console.log('AI tests loaded – use "npm test" to run the full integration suite.');

module.exports = {
  testPromptProcessorSanitization: () => {
    const result = AIPromptProcessor.processPrompt('I sell <b>cakes</b> and pastries');
    assert.strictEqual(result.sanitizedPrompt, 'I sell cakes and pastries');
    assert.strictEqual(result.inferredCategory, 'bakery');
    console.log('  ✅ Prompt processor sanitization works');
    return true;
  },

  testPromptProcessorCategoryDetection: () => {
    const fashion = AIPromptProcessor.processPrompt('We sell designer dresses and shirts');
    assert.strictEqual(fashion.inferredCategory, 'fashion');

    const electronics = AIPromptProcessor.processPrompt('Gaming computers and phone accessories');
    assert.strictEqual(electronics.inferredCategory, 'electronics');

    const restaurant = AIPromptProcessor.processPrompt('Italian pizza restaurant with dine-in');
    assert.strictEqual(restaurant.inferredCategory, 'restaurant');

    console.log('  ✅ Category detection works for fashion, electronics, restaurant');
    return true;
  },

  testPromptProcessorRejectsEmpty: () => {
    try {
      AIPromptProcessor.processPrompt('');
      assert.fail('Should have thrown');
    } catch (e) {
      assert(e.message.includes('empty'));
      console.log('  ✅ Empty prompt rejection works');
    }
    return true;
  }
};

// Auto-run if executed directly
if (require.main === module) {
  console.log('\n🔹 AI Prompt Processor Unit Tests\n');
  const tests = module.exports;
  Object.keys(tests).forEach((name) => {
    try { tests[name](); } catch (e) { console.error(`  ❌ ${name}: ${e.message}`); }
  });
}
