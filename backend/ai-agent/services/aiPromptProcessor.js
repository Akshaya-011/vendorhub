class AIPromptProcessor {
  /**
   * Cleans, sanitizes, and extracts business parameters from raw user descriptions
   */
  static processPrompt(rawPrompt) {
    if (!rawPrompt || rawPrompt.trim() === '') {
      throw new Error('Merchant prompt text cannot be empty');
    }

    const cleanPrompt = rawPrompt
      .replace(/[<>]/g, '') // Sanitize simple HTML brackets to prevent injection
      .trim();

    // Deduce sector category tags based on keyword patterns
    let inferredCategory = 'general';
    const text = cleanPrompt.toLowerCase();
    
    if (text.includes('bread') || text.includes('cake') || text.includes('bakery') || text.includes('pastry')) {
      inferredCategory = 'bakery';
    } else if (text.includes('salon') || text.includes('beauty') || text.includes('makeup') || text.includes('spa')) {
      inferredCategory = 'beauty';
    } else if (text.includes('phone') || text.includes('computer') || text.includes('electronics') || text.includes('gadget')) {
      inferredCategory = 'electronics';
    } else if (text.includes('dress') || text.includes('shirt') || text.includes('fashion') || text.includes('clothes')) {
      inferredCategory = 'fashion';
    } else if (text.includes('fruit') || text.includes('grocery') || text.includes('vegetables') || text.includes('supermarket')) {
      inferredCategory = 'grocery';
    } else if (text.includes('food') || text.includes('restaurant') || text.includes('pizza') || text.includes('diner')) {
      inferredCategory = 'restaurant';
    }

    return {
      sanitizedPrompt: cleanPrompt,
      inferredCategory,
      wordCount: cleanPrompt.split(/\s+/).length
    };
  }
}

module.exports = AIPromptProcessor;
