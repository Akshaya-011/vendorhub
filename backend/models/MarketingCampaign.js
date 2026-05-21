const mongoose = require('mongoose');

const marketingCampaignSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      index: true
    },
    campaignName: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['email', 'social_ad', 'ad_copy', 'blog_post'],
      required: true
    },
    content: {
      type: String, // Dynamic generated copy or raw text details
      required: true
    },
    platform: {
      type: String, // e.g. "Facebook", "Instagram", "Google Ads", "Mailchimp"
      default: 'Email'
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'active', 'completed'],
      default: 'draft'
    },
    metrics: {
      sentCount: { type: Number, default: 0 },
      openCount: { type: Number, default: 0 },
      clickCount: { type: Number, default: 0 }
    },
    scheduledAt: Date,
    sentAt: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MarketingCampaign', marketingCampaignSchema);
