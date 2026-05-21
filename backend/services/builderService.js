const BuilderState = require('../models/BuilderState');
const Website = require('../models/Website');

class BuilderService {
  /**
   * Save the current visual canvas arrangement layout
   */
  static async saveBuilderState(userId, stateData) {
    const { vendorId, layout, sections, components } = stateData;

    let builderState = await BuilderState.findOne({ vendorId });

    if (builderState) {
      builderState.layout = layout || builderState.layout;
      builderState.sections = sections || builderState.sections;
      builderState.components = components || builderState.components;
      builderState.lastSavedBy = userId;
      await builderState.save();
    } else {
      builderState = await BuilderState.create({
        vendorId,
        layout: layout || {},
        sections: sections || [],
        components: components || {},
        lastSavedBy: userId
      });
    }

    // Auto-update the active draft workspace within Website schema so it's ready for publishing
    const website = await Website.findOne({ vendorId });
    if (website) {
      website.draft = {
        pages: website.pages.map(page => {
          if (page.slug === 'home') {
            // Apply updated sections directly to homepage draft
            page.sections = sections || page.sections;
          }
          return page;
        }),
        theme: website.theme
      };
      await website.save();
    }

    return builderState;
  }

  /**
   * Load visual canvas status details
   */
  static async getBuilderState(vendorId) {
    const builderState = await BuilderState.findOne({ vendorId });
    if (!builderState) {
      const err = new Error('No canvas builder states found for this Vendor account');
      err.statusCode = 404;
      throw err;
    }
    return builderState;
  }
}

module.exports = BuilderService;
