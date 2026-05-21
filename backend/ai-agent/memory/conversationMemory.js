const logger = require('../../utils/logger');

class ConversationMemory {
  constructor() {
    this.sessions = new Map();
  }

  /**
   * Add a message context block to session thread
   */
  addMessage(sessionId, role, content) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, []);
    }

    const thread = this.sessions.get(sessionId);
    thread.push({ role, content, timestamp: new Date() });

    // Limit memory scope to last 20 messages to prevent token budget blowouts
    if (thread.length > 20) {
      thread.shift();
    }
    
    logger.debug(`Thread [${sessionId}] - added message from '${role}'. Total messages: ${thread.length}`);
  }

  /**
   * Fetch thread dialogue history formatted for OpenAI messages structure
   */
  getHistory(sessionId) {
    if (!this.sessions.has(sessionId)) {
      return [];
    }
    
    return this.sessions.get(sessionId).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  /**
   * Clear session logs
   */
  clearSession(sessionId) {
    this.sessions.delete(sessionId);
    logger.info(`Memory thread session ${sessionId} cleared successfully.`);
  }
}

// Instantiate global singleton memory
const memoryManager = new ConversationMemory();

module.exports = memoryManager;
