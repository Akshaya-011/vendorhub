const MarketingCampaign = require('../models/MarketingCampaign');

class MarketingService {
  /**
   * Save a newly generated AI marketing copy asset campaign
   */
  static async createCampaign(vendorId, campaignData) {
    const { campaignName, type, content, platform, scheduledAt } = campaignData;
    
    return await MarketingCampaign.create({
      vendorId,
      campaignName,
      type,
      content,
      platform: platform || 'Email',
      status: scheduledAt ? 'scheduled' : 'draft',
      scheduledAt: scheduledAt || null
    });
  }

  /**
   * Fetch all campaign listings for a specific merchant tenant
   */
  static async getCampaignsByVendor(vendorId) {
    return await MarketingCampaign.find({ vendorId }).sort({ createdAt: -1 });
  }

  /**
   * Trigger direct scheduling execution for campaigns
   */
  static async triggerCampaign(campaignId) {
    const campaign = await MarketingCampaign.findById(campaignId);
    if (!campaign) {
      const err = new Error('Marketing Campaign not found');
      err.statusCode = 404;
      throw err;
    }

    campaign.status = 'completed';
    campaign.sentAt = new Date();
    // Simulate campaign views and impressions clicks metrics
    campaign.metrics = {
      sentCount: 500,
      openCount: Math.round(150 + Math.random() * 200),
      clickCount: Math.round(30 + Math.random() * 80)
    };

    await campaign.save();
    return campaign;
  }
}

module.exports = MarketingService;
