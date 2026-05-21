const fs = require('fs');
const path = require('path');
const { getCompletion } = require('../utils/openaiClient');
const memoryManager = require('../memory/conversationMemory');
const logger = require('../../utils/logger');

class AIChatbotService {
  /**
   * Process dialogue responses, incorporating previous session histories
   */
  static async chat(sessionId, userMessage, businessProfile = 'General ecommerce store') {
    try {
      const promptPath = path.join(__dirname, '..', 'prompts', 'chatbotPrompt.txt');
      let systemInstruction = 'You are a professional assistant co-pilot.';

      if (fs.existsSync(promptPath)) {
        systemInstruction = fs.readFileSync(promptPath, 'utf8');
      }

      // Append business context rules
      systemInstruction += `\nBusiness Context Profile: "${businessProfile}"`;

      // Log input message into active history memory
      memoryManager.addMessage(sessionId, 'user', userMessage);

      // Fetch accumulated session dialogues list
      const dialogueHistory = memoryManager.getHistory(sessionId);
      
      // Structure the full prompt including dialogue history
      const prompt = `Dialogue history: ${JSON.stringify(dialogueHistory)}\nUser message: "${userMessage}"`;

      const responseText = await getCompletion(prompt, systemInstruction, false);

      // Save AI answer back into history memory
      memoryManager.addMessage(sessionId, 'assistant', responseText);

      return responseText;
    } catch (error) {
      logger.error('AI Chatbot execution failed: ', error);
      return "Hi there! I am currently operating in limited status mode but I'm here to help. How can I assist you with your builder layout adjustments?";
    }
  }
}

module.exports = AIChatbotService;
