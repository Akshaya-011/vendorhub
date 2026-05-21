const Website = require('../models/Website');
const Vendor = require('../models/Vendor');
const Template = require('../models/Template');
const Theme = require('../models/Theme');
const BuilderState = require('../models/BuilderState');
const { slugify } = require('../utils/helpers');

class WebsiteService {
  /**
   * Initialize a new website tenancy for a vendor business
   */
  static async createWebsite(userId, data) {
    const { businessName, businessType, templateId } = data;

    // Check if vendor subdomain already exists
    const subdomain = slugify(businessName);
    const existingVendor = await Vendor.findOne({ subdomain });
    
    let finalSubdomain = subdomain;
    if (existingVendor) {
      finalSubdomain = `${subdomain}-${Math.floor(Math.random() * 1000)}`;
    }

    // Create Vendor tenant
    const vendor = await Vendor.create({
      businessName,
      businessType,
      ownerId: userId,
      subdomain: finalSubdomain,
      templateId: templateId || null
    });

    let layoutData = [];
    let themeConfig = {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E293B',
      backgroundColor: '#FFFFFF',
      textColor: '#0F172A',
      fontFamily: 'Inter'
    };

    // If templateId is provided, seed the base layouts
    if (templateId) {
      const template = await Template.findById(templateId);
      if (template) {
        layoutData = template.layoutData;
        themeConfig = template.themeConfig;
        
        // Increment template marketplace usage counter
        template.usageCount += 1;
        await template.save();
      }
    }

    // Seed default home page sections if no template is chosen
    if (layoutData.length === 0) {
      layoutData = [
        {
          id: 'hero-1',
          name: 'Hero Showcase',
          type: 'hero',
          components: [
            { id: 'h-title', type: 'text', content: `Welcome to ${businessName}` },
            { id: 'h-desc', type: 'text', content: 'Crafted dynamically by the AI website orchestrator.' }
          ]
        }
      ];
    }

    // Create global Website model entry
    const website = await Website.create({
      vendorId: vendor._id,
      pages: [
        {
          title: 'Home',
          slug: 'home',
          sections: layoutData,
          seo: {
            title: `${businessName} - Home`,
            description: `Welcome to the official website of ${businessName}`
          }
        }
      ],
      theme: themeConfig,
      seoSettings: {
        metaTitle: businessName,
        metaDescription: `Discover the best quality from ${businessName}`
      }
    });

    // Initialize builder canvas state
    await BuilderState.create({
      vendorId: vendor._id,
      layout: {},
      sections: layoutData,
      components: {},
      lastSavedBy: userId
    });

    // Create default theme settings record
    await Theme.create({
      vendorId: vendor._id,
      name: `${businessName} Brand Theme`,
      brandColors: {
        primary: themeConfig.primaryColor,
        secondary: themeConfig.secondaryColor,
        accent: '#F59E0B',
        background: themeConfig.backgroundColor,
        text: themeConfig.textColor
      }
    });

    return { vendor, website };
  }

  /**
   * Get website data by vendorId
   */
  static async getWebsiteByVendor(vendorId) {
    const website = await Website.findOne({ vendorId }).populate('vendorId');
    if (!website) {
      const err = new Error('Website not found for this Vendor');
      err.statusCode = 404;
      throw err;
    }
    return website;
  }

  /**
   * Update active website details
   */
  static async updateWebsite(id, websiteData) {
    const website = await Website.findByIdAndUpdate(id, websiteData, {
      new: true,
      runValidators: true
    });
    if (!website) {
      const err = new Error('Website not found');
      err.statusCode = 404;
      throw err;
    }
    return website;
  }

  /**
   * Publish draft revisions live to public DNS routing
   */
  static async publishWebsite(id) {
    const website = await Website.findById(id);
    if (!website) {
      const err = new Error('Website not found');
      err.statusCode = 404;
      throw err;
    }

    // Merge any draft changes to the main live page structures
    if (website.draft && website.draft.pages) {
      website.pages = website.draft.pages;
      if (website.draft.theme) {
        website.theme = website.draft.theme;
      }
    }

    website.published = true;
    await website.save();

    // Mark vendor status as published
    await Vendor.findByIdAndUpdate(website.vendorId, { published: true });

    return website;
  }
}

module.exports = WebsiteService;
